/* probe-beachseason — does the BEACH answer the CALENDAR?
 *
 * THREE parts, because the first honest attempt at this probe failed its own control
 * and the failure is worth encoding:
 *
 * PART A — THE TREATMENT (in-page, floor exactly 0).
 *   Nothing else in the city reads beachPhase(), so I can suppress the DECISION rather
 *   than the draw (230): render the SAME frozen world twice, once with beachPhase forced
 *   to 1 (the dry-peak crowd) and once forced to BEACHMIN (mid-winter), and the changed
 *   pixels ARE the furniture the season packs away. Both renders live in ONE page, so
 *   the floor is exactly 0 and occlusion is checked for free.
 *   ⇒ Because nothing else reads the predicate, ROAD and FARM must come back EXACTLY 0.
 *      That is a far stronger control than "small": it is arithmetic, not tolerance.
 *
 * PART B — THE FIXED POINT (245), which this design gets for free.
 *   beachPhase()===1 exactly at the dry peak, so the patch must render BYTE-IDENTICAL to
 *   HEAD there. Compared by HASHING the beach mask, so it is build-agnostic: no
 *   cross-build pixel diff, hence no cross-build floor to argue about (230's trap).
 *
 * PART C — THE END-TO-END SEASONAL RESPONSE (196), with the mask SWEPT.
 *   ⚠ My first cut boxed R=13 device px around each hex centre and the NEGATIVE CONTROL
 *   MOVED: ROAD read 47,904 changed px. Roads are not seasonal — the boxes were swallowing
 *   the adjacent grass and trees. That is 196's contaminant, and 196's remedy is to SWEEP
 *   the mask, not to shrink it until it passes: if the contaminant walks out to an honest
 *   zero as the mask tightens while the treatment holds, the residual WAS rim bleed.
 *
 * ⚠ CONTAMINANT (245): rainFront() is keyed to `year`, so sweeping the season also sweeps
 * the WEATHER — rain shafts and cloud shade would land ink on the beach mask and
 * masquerade as the sand answering. `clouds` is cleared for that reason, not for tidiness.
 * ⚠ The furniture slides with the TIDE (wetReach), so the tide is pinned, or the ensemble
 * walks up the sand between pins and the diff is measuring the moon.
 */
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { homedir } from 'node:os';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;

const HERE = dirname(fileURLToPath(import.meta.url));
const ART = process.env.SRC || join(HERE, '../../../../solvista.html');

const SEEDS = [42, 7, 1234];
const PINS = { winter: 0.02, spring: 0.30, drypeak: 0.62, autumn: 0.87 };
const BASE_YEAR = 2035;
const RADII = [13, 8, 5];

const freeze = (seed) => {
  playing = false;
  genWorld(seed);
  __warp(61);
  STARS.length = 0;
  flock = null;
  clouds.length = 0;                       // rainFront() is keyed to `year` — see header
  for (const [g] of ENTINFO) { const a = g(); if (Array.isArray(a)) a.length = 0; }
  time = 1000; waveT = 500;
  __setTide(0.59);                         // neutral: the furniture must not walk with the tide
  __setTime(0.30);                         // full day, so the furniture is at full alpha
};

const run = async (page, seed) => page.evaluate(({ seed, PINS, BASE_YEAR, RADII, freezeSrc }) => {
  eval('(' + freezeSrc + ')')(seed);

  const dpr = window.devicePixelRatio || 1;
  const cvs = document.querySelector('canvas');
  const ctx = cvs.getContext('2d');
  const W = cvs.width, H = cvs.height;
  const HAS_PHASE = typeof beachPhase === 'function';   // HEAD does not have it

  const maskOf = (kind, R) => {
    const m = new Uint8Array(W * H);
    for (const h of __find(kind)) {
      const cx = Math.round(h.sx * dpr), cy = Math.round(h.sy * dpr);
      for (let y = Math.max(0, cy - R); y < Math.min(H, cy + R); y++)
        for (let x = Math.max(0, cx - R); x < Math.min(W, cx + R); x++) m[y * W + x] = 1;
    }
    return m;
  };
  const grab = () => ctx.getImageData(0, 0, W, H).data;
  const diff = (A, B, m) => {
    let n = 0;
    for (let i = 0, p = 0; i < A.length; i += 4, p++) {
      if (!m[p]) continue;
      if (Math.abs(A[i] - B[i]) + Math.abs(A[i + 1] - B[i + 1]) + Math.abs(A[i + 2] - B[i + 2]) > 8) n++;
    }
    return n;
  };
  const out = { seed, HAS_PHASE, A: {}, C: {} };

  /* ---- PART A: suppress the DECISION. Only meaningful on the patch. ---- */
  __setYear(BASE_YEAR + PINS.drypeak);
  if (HAS_PHASE) {
    const real = beachPhase;
    beachPhase = () => 1;          render(); const summer = grab();
    beachPhase = () => BEACHMIN;   render(); const winter = grab();
    beachPhase = () => 1;          render(); const summer2 = grab();   // honest zero (203)
    beachPhase = real;
    /* The controls must be DISJOINT from the beach. The coast highway runs alongside
       the sand, so a ROAD box overlaps BEACH hexes and catches the furniture itself —
       which is mask bleed, not roads answering the calendar. Subtracting the beach
       mask makes that falsifiable: if the explanation is right, ROAD\BEACH is EXACTLY 0. */
    const mB = maskOf('BEACH', 13);
    const less = (m) => { const o = m.slice(); for (let i = 0; i < o.length; i++) if (mB[i]) o[i] = 0; return o; };
    out.A = {
      floor: diff(summer, summer2, mB),
      BEACH: diff(summer, winter, mB),
      ROAD:  diff(summer, winter, less(maskOf('ROAD', 13))),   // must be EXACTLY 0
      FARM:  diff(summer, winter, less(maskOf('FARM', 13))),   // must be EXACTLY 0
      ROADraw: diff(summer, winter, maskOf('ROAD', 13)),       // the bleed, for the record
    };
  }

  /* ---- PART B: the dry-peak beach, hashed. Build-agnostic ⇒ no cross-build floor. ---- */
  __setYear(BASE_YEAR + PINS.drypeak); render();
  const D = grab(), mB = maskOf('BEACH', 13);
  let h = 0;
  for (let i = 0, p = 0; i < D.length; i += 4, p++)
    if (mB[p]) h = (Math.imul(h, 31) + D[i] + D[i + 1] * 7 + D[i + 2] * 13) >>> 0;
  out.peakHash = h;

  /* ---- PART C: end-to-end year sweep, mask SWEPT (196). ---- */
  const frames = {};
  for (const k in PINS) { __setYear(BASE_YEAR + PINS[k]); render(); frames[k] = grab(); }
  for (const R of RADII) {
    out.C[R] = {};
    for (const k of ['BEACH', 'ROAD']) {
      const m = maskOf(k, R);
      const area = m.reduce((a, b) => a + b, 0);
      out.C[R][k] = { area, winter: diff(frames.winter, frames.drypeak, m) };
    }
  }
  return out;
}, { seed, PINS, BASE_YEAR, RADII, freezeSrc: freeze.toString() });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
await page.addInitScript(() => {                 // 213: before the page's own script
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await page.goto('file://' + ART);
await page.waitForTimeout(700);

const res = [];
for (const seed of SEEDS) res.push(await run(page, seed));
await browser.close();

console.log(`\n  artifact: ${ART}`);
const has = res[0].HAS_PHASE;
console.log(`  beachPhase present: ${has ? 'YES (patch)' : 'NO  (pristine HEAD)'}\n`);

if (has) {
  console.log('  PART A — the furniture the season packs away  (one page, one world, only beachPhase moves)');
  console.log('  ' + '-'.repeat(70));
  console.log('  seed |  BEACH px  | ROAD\\BEACH  FARM\\BEACH  (disjoint — must be EXACTLY 0) | floor | (ROAD raw = bleed)');
  console.log('  ' + '-'.repeat(70));
  for (const r of res)
    console.log(`  ${String(r.seed).padStart(4)} | ${String(r.A.BEACH).padStart(9)}  | ` +
      `${String(r.A.ROAD).padStart(9)} ${String(r.A.FARM).padStart(10)}` +
      `${(r.A.ROAD === 0 && r.A.FARM === 0) ? '     ✓ exactly 0        ' : '     ✗ A CONTROL MOVED  '}` +
      ` | ${String(r.A.floor).padStart(4)}  | ${String(r.A.ROADraw).padStart(5)}`);
  console.log('  ' + '-'.repeat(70) + '\n');
}

console.log('  PART C — end-to-end: winter vs dry peak, MASK SWEPT (196: does the contaminant walk out?)');
console.log('  ' + '-'.repeat(74));
console.log('  seed |  R  |  BEACH changed / area        |  ROAD changed / area   (neg. control)');
console.log('  ' + '-'.repeat(74));
for (const r of res) {
  for (const R of RADII) {
    const b = r.C[R].BEACH, d = r.C[R].ROAD;
    console.log(`  ${String(r.seed).padStart(4)} | ${String(R).padStart(2)}  | ` +
      `${String(b.winter).padStart(6)} / ${String(b.area).padStart(6)}  (${(100 * b.winter / b.area).toFixed(1).padStart(4)}%)  | ` +
      `${String(d.winter).padStart(6)} / ${String(d.area).padStart(6)}  (${(100 * d.winter / d.area).toFixed(1).padStart(4)}%)`);
  }
  console.log('  ' + '-'.repeat(74));
}
console.log('\n  PART B — dry-peak beach hash (compare across builds; EQUAL ⇒ byte-identical fixed point)');
for (const r of res) console.log(`    seed ${String(r.seed).padStart(4)}   ${r.peakHash}`);
console.log('');
