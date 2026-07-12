/* iter 230 — does the traffic keep hours, and does the CAB'S SHARE climb as it does?
 *
 * Part A (no pixels, so no noise floor at all): the visible fleet per CLASS across the clock,
 *   and the statistic the feature is actually about — the taxi's share of the CARS STILL ON
 *   THE STREET. The city is built ONCE per seed and only the HOUR is swept, so the fleet is
 *   held fixed and the share is a pure function of the clock (nothing else can move it).
 *   CONTROL: daylight. nightAmt() is 0 all day BY CONSTRUCTION, so every class must read
 *   100% visible at day, on every seed — 199's free dead-regime control.
 * Part B (pixels): the hidden traffic must actually stop RENDERING, not merely test hidden.
 *   Isolated WITHIN one page by mutating the DATA (see below) — NOT patch-vs-HEAD, which
 *   cannot see this feature at all (its noise floor is the same size as the signal).
 *
 * ⚠ Math.random is stubbed in addInitScript (213) AND re-seeded inside the freeze: the stub
 *   is a SHARED stream (204) and the RAF loop eats draws from it (stepVehicle steers on
 *   Math.random) at a wall-clock-dependent rate, so two loads reach genWorld at different
 *   stream positions and spawn different fleets. Even so, a CROSS-LOAD diff of this artifact
 *   never gets below a few thousand px — something in the pre-freeze RAF frames survives
 *   genWorld — which is exactly why Part B stays inside one page, where the floor is 0.
 */
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'path';
import { homedir } from 'os';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = join(HERE, '../../../../solvista.html');

const SEEDS = [42, 7, 1234];
const PINS = [['day    ', 0.30], ['dusk   ', 0.74], ['evening', 0.86], ['late   ', 0.98], ['3am    ', 0.04]];
const WARP = 61;
const CLASSES = ['car', 'taxi', 'bus', 'bike', 'tram', 'truck'];

const browser = await chromium.launch();
async function open(src) {
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.addInitScript(() => {
    let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  });
  await page.goto(pathToFileURL(src).href);
  await page.waitForTimeout(400);
  return page;
}

/* ---------- A: sweep the HOUR over ONE fixed city ---------- */
const sweep = (page, seed, pins) => page.evaluate(([seed, pins, warp]) => {
  let s = 0x51F3A9C >>> 0;                     // re-seed: the RAF loop has eaten an unknown
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  playing = false; STARS.length = 0; flock = null;
  genWorld(seed); __warp(warp);                // built ONCE — the fleet is now fixed
  const all = [...vehicles, ...bikes, ...trams, ...trucks];
  const cls = v => v.taxi ? 'taxi' : v.kind;
  const rows = [];
  for (const [name, t] of pins) {
    __setTime(t); time = 0; waveT = 0;
    render();                                  // refreshes LITAMT, which nightAmt() reads
    const tot = {}, vis = {};
    for (const v of all) {
      const k = cls(v);
      tot[k] = (tot[k] || 0) + 1;
      if (!vehHidden(v)) vis[k] = (vis[k] || 0) + 1;
    }
    const vc = vis.car || 0, vt = vis.taxi || 0;
    rows.push({ name, tot, vis, na: nightAmt(),
                share: (vc + vt) ? vt / (vc + vt) : 0,
                onStreet: Object.values(vis).reduce((a, b) => a + b, 0) });
  }
  return rows;
}, [seed, pins, WARP]);

console.log('=== A. the visible fleet across the clock — ONE city per seed, only the HOUR moves ===');
console.log('   seed  hour     nightAmt    car    taxi    bus   bike   tram  truck | on street | CAB SHARE of the cars still out');
const dayFail = [], byHour = {};
for (const seed of SEEDS) {
  const page = await open(ART);
  for (const r of await sweep(page, seed, PINS)) {
    const g = k => `${String(r.vis[k] || 0).padStart(2)}/${String(r.tot[k] || 0).padStart(2)}`;
    console.log(`  ${String(seed).padStart(5)}  ${r.name}  ${r.na.toFixed(2).padStart(6)}   ` +
      CLASSES.map(g).join('  ') + ` |    ${String(r.onStreet).padStart(2)}     |  ${(r.share * 100).toFixed(1).padStart(5)}%`);
    (byHour[r.name] ||= []).push(r.share);
    if (r.name.trim() === 'day')
      for (const k of Object.keys(r.tot)) if ((r.vis[k] || 0) !== r.tot[k]) dayFail.push(`${seed}/${k}`);
  }
  await page.close();
}
const mean = a => a.reduce((x, y) => x + y, 0) / a.length;
console.log(dayFail.length
  ? `  ✗ DAY CONTROL BROKEN: ${dayFail.join(', ')}`
  : '  ✓ DAY CONTROL: every class 100% visible on every seed (nightAmt=0 all day ⇒ inert by construction)');
console.log(`  → cab share of visible cars: day ${(mean(byHour['day    ']) * 100).toFixed(1)}%  →  3am ${(mean(byHour['3am    ']) * 100).toFixed(1)}%  (mean over ${SEEDS.length} seeds)`);

/* ---------- B: it actually stops RENDERING (isolated WITHIN one page) ----------
   NOT a patch-vs-HEAD diff. Two page loads of the SAME file drift by a few thousand px
   through genWorld (something in the RAF frames before the freeze accumulates), and ~45
   hidden vehicles are worth about the same — so a cross-load diff cannot see this feature
   at all: its DAY control (provably inert code!) read 11,721 px against a 7,034 px floor.
   Within ONE page, two renders of one frozen world are byte-identical (measured: 0 px), so
   isolate the feature by MUTATING THE DATA instead: render the night as shipped, then clear
   every vehicle's hour (v.out = undefined ⇒ nobody keeps one) and render the same frozen
   world again. The difference IS the traffic that went home, at a floor of exactly 0, off
   the final composited canvas — so whatever the city draws on top is occlusion-checked free.
   CONTROL: the identical pair at DAY must be 0 px, because nothing was hidden to begin with. */
const traffic = (page, seed, t) => page.evaluate(([seed, t, warp]) => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  playing = false; STARS.length = 0; flock = null;
  genWorld(seed); __warp(warp);
  __setTime(t); time = 0; waveT = 0;
  const c = document.querySelector('canvas'), g = c.getContext('2d');
  const grab = () => g.getImageData(0, 0, c.width, c.height).data;
  render(); const A = new Uint8ClampedArray(grab());          // as shipped: some have gone in
  const all = [...vehicles, ...bikes, ...trams, ...trucks];
  const gone = all.filter(v => vehHidden(v)).length;
  for (const v of all) v.out = undefined;                     // ...and now nobody keeps an hour
  render(); const B = grab();                                 // same world, same hour, full fleet
  let n = 0;
  for (let i = 0; i < A.length; i += 4) if (A[i] !== B[i] || A[i + 1] !== B[i + 1] || A[i + 2] !== B[i + 2]) n++;
  return { px: n, gone, fleet: all.length };
}, [seed, t, WARP]);

console.log('\n=== B. does the draw actually drop them? (isolated in-page — floor is exactly 0) ===');
console.log('   seed  hour     vehicles in   ink of the traffic that went home');
for (const seed of SEEDS) {
  const page = await open(ART);
  for (const [name, t] of [PINS[0], PINS[4]]) {
    const r = await traffic(page, seed, t);
    const note = name.trim() === 'day' ? (r.px === 0 && r.gone === 0 ? '  ✓ control: 0 hidden, 0 px' : '  ✗ CONTROL BROKEN') : '';
    console.log(`  ${String(seed).padStart(5)}  ${name}  ${String(r.gone).padStart(3)}/${String(r.fleet).padStart(2)}      ${String(r.px).padStart(6)} px${note}`);
  }
  await page.close();
}

await browser.close();

