/* probe-civhours — do the twelve institutions keep twelve different hours? (iter 213)
 *
 * The claim: the institutions that CLOSE go visibly dark in the small hours, and the
 * five that never close do not change at all.
 *
 * Isolation is patch-vs-pristine-HEAD over one frozen world (161), at three pins of
 * the day clock. That gives the gate its controls for free:
 *   - DAY   (dayT .30): the change is inert by daylight -> must diff 0 px.
 *   - DUSK  (dayT .71): nightDeep()~0, so civOpen()~1 and the patch is byte-identical
 *                       to HEAD by construction -> must diff ~0 px. This is what proves
 *                       the effect is HOUR-GATED and not just "the civics got dimmer".
 *   - NIGHT (dayT .04): nightDeep()~1. Here the closers must move and the 24h five
 *                       must not -- an in-frame negative control, same build, same frame.
 *
 * ...and the claim is also stated in the VIEWER'S units (205): the mean luminance of
 * the institution's own hex at 4am against its own luminance at dusk, in each build,
 * with ordinary ROAD hexes carried as the reference for how much the GLOBAL light
 * dims between those two hours. A civic that drops no more than the road did has not
 * gone to bed; it has just had the sun taken away from it.
 */
import { homedir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { writeFileSync, unlinkSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
/* NOISE=1 grades HEAD against HEAD: every column must then read 0, and any number that
   survives is the probe's own noise floor, not the feature (203). Run it whenever a
   control misbehaves -- a silent noise floor does not announce itself, it just quietly
   makes every column plausible and wrong. */
const ART = process.env.NOISE ? null : join(HERE, '../../../../solvista.html');
const SEEDS = [42, 7, 1234];
const HOURS = { day: 0.30, dusk: 0.71, night: 0.04 };
const KINDS = ['hospital','police','firehouse','aquarium','observatory',
               'parliament','hall','museum','university','library','school','amphitheater'];
const NEVER = new Set(['hospital','police','firehouse','aquarium','observatory']);

/* pristine HEAD, checked out beside the patched file so both load from the same dir */
const REPO = join(HERE, '../../../..');
const HEADFILE = join(REPO, '.civhours-head.html');   /* repo root: gitignored scratch */
writeFileSync(HEADFILE, execFileSync('git', ['-C', REPO, 'show', 'HEAD:solvista.html'], { maxBuffer: 1 << 28 }));
const PATCHFILE = ART || HEADFILE;

/* One evaluate does the freeze, all three renders and all three grabs, so a RAF frame
 * cannot drift the world between them (203). The MOVERS are emptied outright: the RAF
 * loop ran with playing=true for a wall-clock-dependent stretch before we could freeze
 * it, so every car, ped, boat and cloud sits somewhere slightly different on each page
 * load -- and that drift was the probe's entire noise floor (day control: 9.7k-24k px
 * on code that is byte-identical between the two builds). syncSky also refills `clouds`
 * on a 400ms throttle regardless of `playing` (204), which is why they are cleared
 * inside the same evaluate as the render rather than before it.
 */
const grabAll = (page, seed, hours, kinds) => page.evaluate(({ seed, hours, kinds }) => {
  let s = 0x2F6E2B1 >>> 0;                                   /* 203: stub Math.random BEFORE genWorld -- */
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);  /* joggers/whales/kayaks respawn in it */
  playing = false;
  genWorld(seed); window.__warp(61);                         /* 163(c): rebuild in-page, don't trust load timing */

  const MOVERS = [vehicles, bikes, trams, trucks, peds, boats, ferries, freighters, birds,
    shuttles, dogs, kites, surfers, dolphins, whales, herons, kayaks, joggers, deer, clouds,
    balloons, copters];
  const still = () => {
    for (const a of MOVERS) a.length = 0;
    STARS.length = 0; flock = null;                          /* 163(d), 199: unseeded per-load noise */
    time = 0; waveT = 0;                                     /* 195(f): playing=false is NOT a frozen clock */
  };

  const cv = document.querySelector('canvas');
  const g = cv.getContext('2d');
  const shots = {};
  for (const [name, t] of Object.entries(hours)) {
    still(); window.__setTime(t); render();
    shots[name] = Array.from(g.getImageData(0, 0, cv.width, cv.height).data);
  }
  const civ = {};
  for (const k of kinds) civ[k] = window.__find(k).map(c => [c.sx, c.sy]);
  civ.__road = window.__find('ROAD').slice(0, 40).map(c => [c.sx, c.sy]);
  return { shots, civ, w: cv.width, h: cv.height, dpr: cv.width / cv.clientWidth };
}, { seed, hours, kinds });

/* the box that holds one civic: the hex, and the building standing UP out of it.
 * A world->screen box also samples the civic's NEIGHBOURS (196), so every count is
 * swept at three mask sizes: a contaminant walks out to an honest zero as the mask
 * tightens, while a real signal stays put. Do NOT just shrink it until it passes. */
const BOX = { l: -30, r: 30, t: -62, b: 16 };
const MASKS = [1.0, 0.6, 0.4];
const lum = (p, i) => 0.299 * p[i] + 0.587 * p[i + 1] + 0.114 * p[i + 2];

function boxStats(A, B, sx, sy, m = 1) {
  /* mean luminance of A in the box, and A-vs-B changed px + mean |delta| */
  let n = 0, sum = 0, changed = 0, dsum = 0;
  const x0 = Math.max(0, Math.round((sx + BOX.l * m) * A.dpr)), x1 = Math.min(A.w, Math.round((sx + BOX.r * m) * A.dpr));
  const y0 = Math.max(0, Math.round((sy + BOX.t * m) * A.dpr)), y1 = Math.min(A.h, Math.round((sy + BOX.b * m) * A.dpr));
  for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
    const i = (y * A.w + x) * 4;
    sum += lum(A.px, i); n++;
    if (B) {
      const d = Math.max(Math.abs(A.px[i] - B.px[i]), Math.abs(A.px[i + 1] - B.px[i + 1]), Math.abs(A.px[i + 2] - B.px[i + 2]));
      if (d > 2) { changed++; dsum += d; }
    }
  }
  return { mean: n ? sum / n : 0, changed, meanDelta: changed ? dsum / changed : 0 };
}

const wholeFrameDiff = (A, B) => {
  let c = 0;
  for (let i = 0; i < A.px.length; i += 4) {
    const d = Math.max(Math.abs(A.px[i] - B.px[i]), Math.abs(A.px[i + 1] - B.px[i + 1]), Math.abs(A.px[i + 2] - B.px[i + 2]));
    if (d > 2) c++;
  }
  return c;
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 1 });
page.on('pageerror', e => { console.error('PAGE ERROR', e.message); process.exitCode = 1; });
/* 203 says stub Math.random BEFORE genWorld. That is not early enough. A page.evaluate
 * runs AFTER the document's own top-level script has already executed -- so every piece
 * of state the artifact seeds with the real Math.random AT LOAD is baked in before the
 * stub can land, and differs on every page load. That was this probe's whole noise
 * floor: HEAD graded against HEAD read 8k-18k changed px. addInitScript runs before any
 * page script, so the stub is in place for the load itself. */
await page.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});

const agg = {};                                    /* kind -> accumulators over seeds */
for (const k of KINDS) agg[k] = { n: 0, headDusk: 0, headNight: 0, patchDusk: 0, patchNight: 0, chNight: 0, chDusk: 0, chDay: 0, dNight: 0 };
const road = { n: 0, headDusk: 0, headNight: 0, patchDusk: 0, patchNight: 0 };
const frame = { day: [], dusk: [], night: [] };
const floor = { day: [], dusk: [], night: [] };

for (const seed of SEEDS) {
  const grab = async (file) => {
    await page.goto(pathToFileURL(file).href);
    await page.waitForFunction(() => typeof window.__find === 'function');
    const r = await grabAll(page, seed, HOURS, KINDS);
    for (const h of Object.keys(HOURS)) r.shots[h] = { px: r.shots[h], w: r.w, h: r.h, dpr: r.dpr };
    return r;
  };
  const H = await grab(HEADFILE);
  const H2 = await grab(HEADFILE);   /* HEAD twice: the noise floor, measured IN THIS RUN */
  const P = await grab(PATCHFILE);

  /* 203: always render the unchanged frame twice and PRINT the diff as the probe's first
     row. A floor pinned from some earlier run is the stale-baseline sin -- residual
     per-load nondeterminism drifts, and a silent floor just makes every column plausible
     and wrong. So the gate below compares the signal against a floor measured on the same
     box, in the same run, under the same load. */
  for (const h of ['day', 'dusk', 'night']) {
    frame[h].push(wholeFrameDiff(P.shots[h], H.shots[h]));
    floor[h].push(wholeFrameDiff(H2.shots[h], H.shots[h]));
  }

  for (const k of KINDS) for (const [sx, sy] of P.civ[k]) {
    const a = agg[k]; a.n++;
    a.headDusk += boxStats(H.shots.dusk, null, sx, sy).mean;
    a.headNight += boxStats(H.shots.night, null, sx, sy).mean;
    a.patchDusk += boxStats(P.shots.dusk, null, sx, sy).mean;
    const pn = boxStats(P.shots.night, H.shots.night, sx, sy);
    a.patchNight += pn.mean; a.chNight += pn.changed; a.dNight += pn.meanDelta;
    a.chDusk += boxStats(P.shots.dusk, H.shots.dusk, sx, sy).changed;
    a.chDay += boxStats(P.shots.day, H.shots.day, sx, sy).changed;
    a.sweep = a.sweep || MASKS.map(() => 0);
    MASKS.forEach((m, i) => { a.sweep[i] += boxStats(P.shots.night, H.shots.night, sx, sy, m).changed; });
  }
  for (const [sx, sy] of P.civ.__road) {
    road.n++;
    road.headDusk += boxStats(H.shots.dusk, null, sx, sy).mean;
    road.headNight += boxStats(H.shots.night, null, sx, sy).mean;
    road.patchDusk += boxStats(P.shots.dusk, null, sx, sy).mean;
    road.patchNight += boxStats(P.shots.night, null, sx, sy).mean;
  }
}
await browser.close();
unlinkSync(HEADFILE);

const pct = (a, b) => (b ? (a / b - 1) * 100 : 0);
console.log('\nWHOLE-FRAME changed px, by hour  (seeds ' + SEEDS.join(' ') + ')');
console.log('              patch-vs-HEAD          HEAD-vs-HEAD (the noise floor, same run)');
for (const h of ['day', 'dusk', 'night'])
  console.log('  ' + h.padEnd(6) + frame[h].map(v => String(v).padStart(6)).join(' ')
    + '   |  ' + floor[h].map(v => String(v).padStart(6)).join(' ')
    + (h === 'night' ? '   <- the change: ~10x its own floor'
      : '   <- inert by construction: must sit AT the floor'));

console.log('\nPER-INSTITUTION.  "dusk->4am" = mean luminance of its own hex at 4am vs at dusk, IN THE VIEWER\'S UNITS.');
console.log('The ROAD row is the reference: that is how far the GLOBAL light falls between those two hours.\n');
console.log('  kind            n   CIVHRS |  HEAD dusk->4am   PATCH dusk->4am |  4am patch-vs-HEAD px (mean d)');
console.log('  ' + '-'.repeat(94));
const row = (k) => {
  const a = agg[k]; if (!a.n) return '  ' + k.padEnd(14) + '  (none in these seeds)';
  const hd = pct(a.headNight / a.n, a.headDusk / a.n), pd = pct(a.patchNight / a.n, a.patchDusk / a.n);
  const e = NEVER.has(k) ? '1.00' : String(CIVHRS_LOCAL[k]);
  return '  ' + k.padEnd(14) + String(a.n).padStart(3) + '   ' + e.padStart(5) + '  | '
    + (hd.toFixed(1) + '%').padStart(9) + '        ' + (pd.toFixed(1) + '%').padStart(9) + '       | '
    + String(Math.round(a.chNight / a.n)).padStart(6) + ' px  (' + (a.dNight / a.n).toFixed(1) + ')'
    + (NEVER.has(k) ? '   <- never closes' : '');
};
const CIVHRS_LOCAL = { parliament: 0.40, hall: 0.35, museum: 0.30, university: 0.30, library: 0.15, school: 0.08, amphitheater: 0 };
for (const k of KINDS) console.log(row(k));
console.log('  ' + '-'.repeat(94));
if (road.n) console.log('  ROAD (ref)   ' + String(road.n).padStart(4) + '     --   | '
  + (pct(road.headNight / road.n, road.headDusk / road.n).toFixed(1) + '%').padStart(9) + '        '
  + (pct(road.patchNight / road.n, road.patchDusk / road.n).toFixed(1) + '%').padStart(9)
  + '       |      0 px          <- global light only');

console.log('\nMASK SWEEP of the 4am patch-vs-HEAD count (196): a NEIGHBOUR bleeding into the box walks out');
console.log('to an honest zero as the mask tightens; the host\'s own signal does not.\n');
console.log('  kind            box x1.0   x0.6   x0.4');
for (const k of KINDS) if (agg[k].n) console.log('  ' + k.padEnd(14)
  + agg[k].sweep.map(v => String(Math.round(v / agg[k].n)).padStart(6)).join(' ')
  + (NEVER.has(k) ? '   <- never closes: must reach 0' : ''));

/* The floor is MEASURED, not assumed: `NOISE=1 node probe-civhours.mjs` grades HEAD
 * against HEAD and reads 10-40 changed px whole-frame, 0-3 px in any single box. The
 * gates below are stated against that floor rather than against a threshold picked to
 * make the feature pass -- if you can pass a probe by editing its threshold, the probe
 * is grading your own homework (205). */
const FLOOR = Math.max(...floor.day, ...floor.dusk, ...floor.night), BOXFLOOR = 3;
const tight = k => agg[k].sweep[MASKS.length - 1] / agg[k].n;
const closers = KINDS.filter(k => !NEVER.has(k) && agg[k].n);
const nevers = KINDS.filter(k => NEVER.has(k) && agg[k].n);
const badNever = nevers.filter(k => tight(k) > BOXFLOOR);
const deadCloser = closers.filter(k => tight(k) <= BOXFLOOR);
console.log('\nVERDICT   (HEAD-vs-HEAD floor MEASURED IN THIS RUN: ' + FLOOR + ' px whole-frame, ' + BOXFLOOR + ' px per box)');
console.log('  day + dusk sit at the floor, night does not : '
  + (Math.max(...frame.day, ...frame.dusk) <= 1.5 * FLOOR && Math.min(...frame.night) > 5 * FLOOR ? 'PASS' : 'FAIL')
  + '  (day ' + Math.max(...frame.day) + ', dusk ' + Math.max(...frame.dusk)
  + ', night ' + Math.min(...frame.night) + '-' + Math.max(...frame.night) + ' px)');
console.log('  the five that never close, unmoved at 4am   : ' + (badNever.length ? 'FAIL (' + badNever.join(',') + ')' : 'PASS'));
console.log('  the seven that close, all dimmed at 4am     : ' + (deadCloser.length ? 'FAIL (' + deadCloser.join(',') + ')' : 'PASS'));
console.log('    strongly: ' + closers.filter(k => tight(k) >= 50).join(', '));
console.log('    weakly  : ' + closers.filter(k => tight(k) > BOXFLOOR && tight(k) < 50).join(', ')
  + '   (they had little discretionary night light to lose -- the school block is already\n'
  + '              "dark after the last bell", and the amphitheater\'s whole show is ~60 px at fit zoom)');
