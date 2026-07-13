#!/usr/bin/env node
/* probe-goldenhue.mjs — does golden hour collapse the land into one hue?
 *
 * Iter 217's step-back: both agents, blind, on two seeds, independently said the
 * golden-hour frame flattens the whole landmass into a single "dusty taupe-mauve
 * / greyed-taupe" mass -- "roads, roofs and ground desaturate to one hue and the
 * district boundaries vanish", "parks stop reading as parks (greens go
 * olive-brown)".
 *
 * That is a COLOUR complaint, and 214's law is explicit: when the complaint
 * contains a colour word, measure COLOUR (hue + chroma), not luminance -- a
 * greyscale instrument cannot represent "mauve", and 214 burned an iteration
 * learning it. 214 also gives the shape of the bug to look for: the light is
 * applied as a flat per-channel multiply `base[i]*TINT[i]`, which on a saturated
 * surface is not a tint at all but a HUE ROTATION, and it collapsed the night
 * sand onto the road (44 RGB units apart at hue ~308, where they sat 116 apart
 * by day).
 *
 * Method: freeze the clock, render the SAME frozen world at day (t=0.30) and
 * golden (t=0.68), sample every instance of each tile type at its centre, and
 * report per-light mean hue / chroma / luminance -- plus the PAIRWISE RGB
 * SEPARATION between the tile types whose identity the agents said was lost.
 * If those separations collapse from day to golden, the agents are right and the
 * mechanism is 214's, one light over.
 *
 *   node probe-goldenhue.mjs
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
/* SRC=<path> grades an arbitrary build (e.g. HEAD materialized to /tmp) WITHOUT ever
   overwriting the artifact — 197's corrupted-control-file landmine is a probe that
   /bin/cp's HEAD over solvista.html and is killed before it restores. Default: the
   working tree, resolved relative to the probe (never an absolute path). */
const PAGE = pathToFileURL(process.env.SRC || join(HERE, '../../../../solvista.html')).href;

const SEEDS = [7, 42, 1234];
const WARP = 61;
const LIGHTS = [['day', 0.30], ['golden', 0.68], ['night', 0.92]];
const KINDS = ['PARK', 'FOREST', 'ROAD', 'RES', 'MID', 'TOWER', 'COM', 'FARM', 'BEACH', 'WATER'];
/* the pairs whose distinctness the agents said golden hour destroys.
   BEACH vs ROAD is 214'S OWN HEADLINE PAIR -- "the sand and the asphalt literally become the
   same colour" -- and this probe never carried it, which is a hole: it is the exact collapse
   the whole wash ladder exists to prevent, and it is the GUARD any change to the sand's night
   luminance must clear (iter 251 dims the night sand to satisfy 222's ordering invariant, and
   the way to get that wrong is to dim it back into the asphalt). A GUARD, never the score -- 221. */
const PAIRS = [['PARK', 'ROAD'], ['PARK', 'RES'], ['RES', 'ROAD'], ['FARM', 'ROAD'], ['FOREST', 'MID'], ['BEACH', 'ROAD']];

const rgb2hc = ([r, g, bb]) => {
  const mx = Math.max(r, g, bb), mn = Math.min(r, g, bb), c = mx - mn;
  let h = 0;
  if (c > 0) {
    if (mx === r) h = 60 * (((g - bb) / c) % 6);
    else if (mx === g) h = 60 * ((bb - r) / c + 2);
    else h = 60 * ((r - g) / c + 4);
  }
  if (h < 0) h += 360;
  return { h, c, l: 0.299 * r + 0.587 * g + 0.114 * bb };
};
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
await p.addInitScript(() => {           /* 213: stub the PRNG before the page's script */
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});

const acc = {}; /* light -> kind -> [rgb] */
for (const [name] of LIGHTS) { acc[name] = {}; for (const k of KINDS) acc[name][k] = []; }

for (const seed of SEEDS) {
  await p.goto(`${PAGE}?seed=${seed}&warp=${WARP}&t=0.30`);
  await p.waitForTimeout(400);

  const res = await p.evaluate(({ KINDS, LIGHTS, seed, WARP }) => {
    playing = false;                     /* both clocks stop */
    genWorld(seed); __warp(WARP);        /* 163: byte-identical world */
    STARS.length = 0; flock = null;      /* 163(d) / 199 */
    __setYear(2035.62);                  /* pin the calendar OFF winter (202) */

    const dpr = cvs.width / cvs.clientWidth;
    const sites = {};
    for (const k of KINDS) sites[k] = window.__find(k)
      .filter(s => s.sx > 60 && s.sx < innerWidth - 60 && s.sy > 60 && s.sy < innerHeight - 60)
      .slice(0, 300);

    /* THE HEX'S OWN BOX, NOT ITS CENTRE PIXEL (iter 251, closing 238's defect in THIS probe).
       This probe sampled getImageData(sx, sy, 1, 1) -- ONE pixel, at the hex centre -- for its
       whole life. For a flat surface (sand, asphalt) that is fine. For a BUILDING it is a
       catastrophe: the centre pixel of a mid-rise lands on its ROOF, so the "night luminance"
       of every lit building type was measured WITHOUT EVER SAMPLING A LIT WINDOW. That is what
       made the ordering invariant below claim, for 29 iterations, that the beach out-glows the
       lit city -- it was comparing the beach's sand to a building's roof. */
    let hexW = 0;
    for (const k of KINDS) {
      const m = new Map(sites[k].map(s => [s.x + ',' + s.y, s]));
      for (const s of sites[k]) {
        const n = m.get((s.x + 1) + ',' + s.y);
        if (n) { hexW = Math.abs(n.sx - s.sx); break; }
      }
      if (hexW) break;
    }
    const R = Math.max(2, Math.round(hexW * 0.42 * dpr));   /* inside the hex, clear of neighbours */
    const W = cvs.width, H = cvs.height;

    const out = { hexW, box: {} };
    for (const [nm, t] of LIGHTS) {
      __setTime(t);
      lastSky = 0; render();             /* 204: force the sky, frozen clock won't */
      const img = ctx.getImageData(0, 0, W, H).data;
      out.box[nm] = {};
      for (const k of KINDS) {
        out.box[nm][k] = sites[k].map(s => {
          const cx = Math.round(s.sx * dpr), cy = Math.round(s.sy * dpr);
          let r = 0, g = 0, bl = 0, n = 0; const lums = [];
          for (let yy = Math.max(0, cy - R); yy <= Math.min(H - 1, cy + R); yy++)
            for (let xx = Math.max(0, cx - R); xx <= Math.min(W - 1, cx + R); xx++) {
              const i = (yy * W + xx) * 4;
              r += img[i]; g += img[i + 1]; bl += img[i + 2]; n++;
              lums.push(img[i] * 0.30 + img[i + 1] * 0.59 + img[i + 2] * 0.11);
            }
          if (!n) return [0, 0, 0, 0];
          /* the MEAN colour of the hex (its identity) ...and the ENVELOPE of its light.
             224: for anything the eye reads as "bright", the viewer's statistic is the
             EXTREME, not the mean -- a building reads as LIT because of its windows, not
             because its hex average is high. p90 is what a lit pane does to a facade. */
          lums.sort((p, q) => p - q);
          return [r / n, g / n, bl / n, lums[Math.floor(lums.length * 0.90)]];
        });
      }
    }
    return out;
  }, { KINDS, LIGHTS, seed, WARP });

  for (const [nm] of LIGHTS) for (const k of KINDS) acc[nm][k].push(...res.box[nm][k]);
  if (seed === SEEDS[0]) console.log(`\n(area sample: hex is ${res.hexW.toFixed(1)}px on screen; each instance read over its own box, not one centre pixel — iter 251)`);
}
await b.close();

const meanRGB = a => a.length ? [0, 1, 2].map(i => a.reduce((s, p) => s + p[i], 0) / a.length) : [0, 0, 0];

console.log('\nGOLDEN-HOUR HUE COLLAPSE?   mean rendered colour per tile type, 3 seeds');
console.log('clock frozen, world rebuilt in-page, calendar pinned 2035.62\n');
console.log('  tile        |        DAY  hue chr lum |     GOLDEN  hue chr lum |      NIGHT  hue chr lum');
console.log('  ------------------------------------------------------------------------------------------');
const M = {};
for (const k of KINDS) {
  M[k] = {};
  let line = `  ${k.padEnd(11)} |`;
  for (const [nm] of LIGHTS) {
    const m = meanRGB(acc[nm][k]); M[k][nm] = m;
    const { h, c, l } = rgb2hc(m);
    line += ` ${String(Math.round(h)).padStart(3)}deg ${String(Math.round(c)).padStart(3)} ${String(Math.round(l)).padStart(3)} |`;
  }
  console.log(line);
}

console.log('\nPAIRWISE SEPARATION (RGB euclidean between the two tile types\' mean colour)');
console.log('the agents\' claim: at golden hour these collapse toward each other\n');
console.log('  pair                  DAY   GOLDEN    NIGHT     golden vs day');
console.log('  ----------------------------------------------------------------');
for (const [a, bb] of PAIRS) {
  const d = dist(M[a][ 'day'], M[bb]['day']);
  const g = dist(M[a]['golden'], M[bb]['golden']);
  const n = dist(M[a][ 'night'], M[bb]['night']);
  const pct = d > 0 ? (100 * (g - d) / d) : 0;
  const tag = pct < -35 ? '  <-- COLLAPSED' : '';
  console.log(`  ${(a + ' vs ' + bb).padEnd(18)} ${d.toFixed(0).padStart(5)}  ${g.toFixed(0).padStart(6)}  ${n.toFixed(0).padStart(6)}     ${(pct >= 0 ? '+' : '') + pct.toFixed(0)}%${tag}`);
}
console.log('\nREAD: a tile type keeps its identity only if it stays SEPARATED from its neighbours.');
console.log('      214: a flat per-channel multiply on a saturated surface is a HUE ROTATION, not a tint.');
console.log('      221: separation is a GUARD, never the SCORE -- it can reward the very bug you are fixing.');

/* THE INVARIANT THAT SPANS THE SET (iter 222's law, asserted here at 223).
   The col()/sandCol() night-wash ladder applies ONE shared mechanism (washRGB) to a series of
   surfaces, one lap per surface, and each lap is gated -- correctly, per 221 -- on ITS OWN
   surface's distance from ITS OWN daylight hue. No per-surface gate can therefore SEE a
   cross-surface ORDERING, and for three laps running none did: each rung handed its surface
   ~10% night luminance as a side-effect of correcting its hue, until the unlit sand had climbed
   past the lit mid-rises and two agents called the shoreline "lit at noon". State the invariant
   in the viewer's units and check it every lap: AFTER DARK, THE CITY'S LIT SURFACES ARE THE
   BRIGHT ONES. Anything the sun has stopped falling on must sit below them. */
const LIT   = ['TOWER', 'COM', 'MID'];        /* lit windows after dark */
const UNLIT = ['BEACH', 'PARK', 'FOREST', 'FARM', 'ROAD', 'WATER'];   /* ground; nothing lights these */
const lumOf = k => rgb2hc(M[k]['night']).l;                       /* the hex's MEAN colour */
const envOf = k => { const a = acc['night'][k]; return a.length ? a.reduce((s, p) => s + p[3], 0) / a.length : 0; };

/* ...AND IT MUST BE SCORED ON THE ENVELOPE, NOT THE MEAN (iter 251).
   The invariant above is right, and for 29 iterations it was measured with the wrong statistic.
   A building reads as LIT because of its WINDOWS -- a handful of 200+ pixels against a dark
   wall -- not because its hex AVERAGE is high. Averaging throws away exactly the information
   that makes it read as lit, so a flat pale surface (sand: uniform, mean == envelope) can
   "out-brighten" a lit high-variance one on the MEAN while looking obviously dimmer to any eye.
   That is precisely what happened: on the mean, BEACH 96 >= MID 95 = FAIL, and the prescribed
   fix (dim the sand) costs BEACH<->ROAD 24 -> 18, walking the sand back toward 214's asphalt to
   buy a number no viewer can see. Two blind agents, two seeds, crossed A/B, measured the frame
   themselves and said the opposite: the shoreline is "a quiet dark ribbon" at ~90 against a frame
   max of 237-244 from the tower windows. THE EYE READS THE EXTREME (224). So the score is the
   p90 -- what the lit panes actually put on the facade -- and the mean is kept as a diagnostic. */
const ranked = [...LIT, ...UNLIT].sort((a, bb) => envOf(bb) - envOf(a));
console.log('\nNIGHT ORDERING INVARIANT: no UNLIT surface may out-brighten the LIT ones');
console.log('(222\'s law -- scored on the ENVELOPE (p90) since 251, because the EYE READS THE EXTREME)\n');
console.log('  night p90 luminance (the light a surface actually shows), brightest first:');
console.log('    ' + ranked.map(k => `${LIT.includes(k) ? '*' : ' '}${k} ${Math.round(envOf(k))}`).join('  '));
console.log('    (* = lit)');
console.log('  ...and the same surfaces by MEAN (the DIAGNOSTIC -- a lit building averages its dark wall in):');
console.log('    ' + [...LIT, ...UNLIT].sort((a, bb) => lumOf(bb) - lumOf(a))
  .map(k => `${LIT.includes(k) ? '*' : ' '}${k} ${Math.round(lumOf(k))}`).join('  '));

const litMin   = Math.min(...LIT.map(envOf));
const litLo    = LIT.find(k => envOf(k) === litMin);
const breaches = UNLIT.filter(k => envOf(k) >= litMin);
console.log(`\n  dimmest LIT surface: ${litLo} ${Math.round(litMin)}  (by envelope)`);
if (breaches.length) {
  for (const k of breaches)
    console.log(`  BREACH: ${k} ${Math.round(envOf(k))} >= ${litLo} ${Math.round(litMin)}  -- an unlit surface out-glows the lit city`);
  console.log('\nVERDICT: FAIL -- the night ground out-glows the lit city');
} else {
  const head = Math.min(...UNLIT.map(k => litMin - envOf(k)));
  console.log(`  brightest UNLIT surface clears it by ${head.toFixed(0)} -- ordering holds`);
  console.log('\nVERDICT: PASS -- the lit city is the bright thing after dark');
}

/* ...and the GUARD the invariant must not be bought at the expense of: each washed surface's
   night hue must stay near its own DAYLIGHT hue (214/220/221's gate, in each rung's own units).
   A uniform rescale of a gain triple cannot rotate a colour, so these must not move. */
console.log('\nGUARD -- each washed surface\'s night hue vs its OWN daylight hue (214/220/221 must not regress)');
for (const k of ['BEACH', 'RES', 'PARK', 'FOREST']) {
  const dh = Math.abs(rgb2hc(M[k]['night']).h - rgb2hc(M[k]['day']).h);
  const off = Math.min(dh, 360 - dh);
  console.log(`  ${k.padEnd(7)} day ${String(Math.round(rgb2hc(M[k]['day']).h)).padStart(3)}deg -> night ${String(Math.round(rgb2hc(M[k]['night']).h)).padStart(3)}deg   ${off.toFixed(0).padStart(3)}deg off its daylight self${off > 60 ? '   <-- ROTATED' : ''}`);
}
process.exit(breaches.length ? 1 : 0);
