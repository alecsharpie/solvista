#!/usr/bin/env node
/* probe-smokelean.mjs — DOES THE FIRE SMOKE LEAN DOWNWIND? (iter 333)
 *
 * The seam. Every gusting thing over the coast rides WINDA — the trees sway (windForce
 * in canopy()), the flags flap, the clouds/balloons/kites drift +x on windDrift(). But
 * the FIRE smoke did not: the wildfire plume (drawFire, 4 puffs, fillStyle rgba(74,68,62,
 * 0.55)) and the ember scars of a fresh burn (the smoking BURNT tile, 2 puffs, rgba(140,
 * 134,124,0.45)) positioned each puff at `cx + Math.sin(time*..)*k` — a symmetric wobble
 * on a CLOCK term with no wind in it. Smoke is the un-enumerated member of the wind's
 * reader category (280: the reader list is a changelog, not a spec — grep the MECHANISM,
 * windForce, for who does not read it).
 *
 * THE FIX. smokeLean(rise) = rise*windForce(): a downwind (+x) lean growing with the puff's
 * own RISE, in the same +x the clouds drift, so the whole sky leans together. At
 * windForce()==0 (a dead calm) the lean is 0 and the plume is HEAD's straight column
 * byte-for-byte (an exact fixed point, 245).
 *
 * This grades the SHIPPED draw in ONE build, no source swap, no cross-build floor (230):
 * it hooks ctx.arc and picks the smoke puffs out by their fillStyle signature (deterministic,
 * no pixel diff, NO NOISE FLOOR AT ALL). It renders the SAME frozen frame (same seed, same
 * time, same placed fire) at GALE and at CALM, so the base wobble cancels and dx = x_gale -
 * x_calm IS smokeLean(rise). Chromium canonicalises fillStyle on read (273), so match the
 * spaced form; the glow arc is a CanvasGradient (not a string) and drops out for free.
 *
 * WHAT MUST BE TRUE:
 *  - GALE: every puff dx > 0 (leans downwind), and dx grows with rise (a plume bends over
 *    as it climbs — dx ~= rise = (r-2.4)/0.42 for the plume, (r-1.6)/0.30 for the ember).
 *  - FIXED POINT (245): CALM (windForce 0) == smokeLean stubbed to 0, to the pixel — the
 *    calm plume is HEAD's straight column. This is the must-not-move control (250).
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const { chromium } = await import(
  join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.mjs')
);

const SRC = process.env.SRC || join(HERE, '../../../../solvista.html');
const PAGE = pathToFileURL(SRC).href;
const SEEDS = [7, 42, 1234];

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
await p.addInitScript(() => {                       /* 213: stub the PRNG before the page's script */
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});

console.log(`SRC = ${SRC}\n`);

const rows = [];
for (const seed of SEEDS) {
  await p.goto(`${PAGE}?seed=${seed}`);
  await p.waitForTimeout(200);

  const r = await p.evaluate((seed) => {
    playing = false;
    genWorld(seed);
    __warp(46);                                     /* -> ~2020, still year<2030, forests present */

    /* place ONE wildfire (a burning forest) and ONE fresh ember (a smoking BURNT lot) */
    let fireHex = null, emberHex = null;
    for (const i of HEXI) { if (cells[i].t === T.FOREST) { cells[i].fire = 4; fireHex = i; break; } }
    for (const i of HEXI) {
      if (i === fireHex) continue;
      if (DEV.has(cells[i].t)) { cells[i].t = T.BURNT; cells[i].age = 0; cells[i].fire = 0; emberHex = i; break; }
    }
    time = 5.0; waveT = 5.0;                         /* frozen clock, so `sm` is deterministic */

    const cap = [];
    const oa = ctx.arc.bind(ctx);
    ctx.arc = function (x, y, rr, ...a) {
      const fs = ctx.fillStyle;
      if (typeof fs === 'string') {
        if (fs.includes('74, 68, 62')) cap.push({ x, r: rr, kind: 'plume' });
        else if (fs.includes('140, 134, 124')) cap.push({ x, r: rr, kind: 'ember' });
      }
      return oa(x, y, rr, ...a);
    };
    const grab = (w) => { cap.length = 0; __setWind(w); render(); return cap.map((q) => ({ ...q })); };

    const calm = grab(0.25);                         /* windForce 0 -> lean must be 0 */
    const gale = grab(1.0);                          /* windForce 1 -> full lean */

    /* the fixed-point control: stub smokeLean to 0 and render at gale — must equal CALM */
    const realLean = window.smokeLean;
    window.smokeLean = () => 0;
    const stub = grab(1.0);
    window.smokeLean = realLean;
    ctx.arc = oa;

    return { fireHex, emberHex, calm, gale, stub, force0: windForce.call ? null : null };
  }, seed);

  rows.push({ seed, ...r });
}
await b.close();

const f = (n) => (n >= 0 ? ' ' : '') + n.toFixed(2);
let allPos = true, fixedOK = true;

for (const r of rows) {
  console.log(`SEED ${r.seed}  (fire@${r.fireHex}, ember@${r.emberHex})`);
  console.log('  kind  |  rise  calm.x   gale.x    dx (=lean)   expected(=rise)');
  console.log('  ------+-----------------------------------------------------');
  for (let k = 0; k < r.gale.length; k++) {
    const g = r.gale[k], c = r.calm[k], s = r.stub[k];
    const rise = g.kind === 'plume' ? (g.r - 2.4) / 0.42 : (g.r - 1.6) / 0.30;
    const dx = g.x - c.x;
    if (dx <= 0.0001) allPos = false;
    if (Math.abs(c.x - s.x) > 0.001) fixedOK = false;   /* calm must equal smokeLean=0 */
    console.log(
      `  ${g.kind.padEnd(5)} | ${rise.toFixed(2).padStart(5)} ${c.x.toFixed(2).padStart(7)} ` +
      `${g.x.toFixed(2).padStart(8)}   ${f(dx).padStart(8)}      ${rise.toFixed(2).padStart(6)}`
    );
  }
  console.log('');
}

console.log('VERDICT');
console.log(`  GALE leans every puff downwind (dx>0):     ${allPos ? 'YES' : '*** NO ***'}`);
console.log(`  FIXED POINT (calm == smokeLean-stubbed-0):  ${fixedOK ? 'EXACT (0 px)' : '*** DRIFTED ***'}`);
console.log(`  dx grows with rise (higher puff leans more): read the table — dx ~= rise column`);
console.log(`\n  ${allPos && fixedOK ? 'SMOKELEAN: PASS' : 'SMOKELEAN: FAIL'}`);
