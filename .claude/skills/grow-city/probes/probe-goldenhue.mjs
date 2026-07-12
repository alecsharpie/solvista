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
const PAGE = pathToFileURL(join(HERE, '../../../../solvista.html')).href;

const SEEDS = [7, 42, 1234];
const WARP = 61;
const LIGHTS = [['day', 0.30], ['golden', 0.68], ['night', 0.92]];
const KINDS = ['PARK', 'FOREST', 'ROAD', 'RES', 'MID', 'TOWER', 'COM', 'FARM', 'BEACH', 'WATER'];
/* the pairs whose distinctness the agents said golden hour destroys */
const PAIRS = [['PARK', 'ROAD'], ['PARK', 'RES'], ['RES', 'ROAD'], ['FARM', 'ROAD'], ['FOREST', 'MID']];

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

    const out = {};
    for (const [nm, t] of LIGHTS) {
      __setTime(t);
      lastSky = 0; render();             /* 204: force the sky, frozen clock won't */
      out[nm] = {};
      for (const k of KINDS) {
        out[nm][k] = sites[k].map(s => {
          const d = ctx.getImageData(Math.round(s.sx * dpr), Math.round(s.sy * dpr), 1, 1).data;
          return [d[0], d[1], d[2]];
        });
      }
    }
    return out;
  }, { KINDS, LIGHTS, seed, WARP });

  for (const [nm] of LIGHTS) for (const k of KINDS) acc[nm][k].push(...res[nm][k]);
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
