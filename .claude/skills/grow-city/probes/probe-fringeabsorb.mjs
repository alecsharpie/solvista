#!/usr/bin/env node
/* probe-fringeabsorb.mjs — CAN THE CORE ABSORB WHAT THE RIM GIVES BACK?
 *
 * Cue (ai), the ledger's #1: the city has no fringe. 233 built the belt, and it
 * died in a BOX — strong enough to read as country => `developed` -5.7..-9.3% =>
 * the census core gate HARD-FAILS; weak enough to pass => seed-fragile.
 *
 * 233's named way through: HOLD THE RIM **AND WIDEN THE CORE** IN ONE LAP, so
 * `developed` stays flat and the gate opens. That rests on ONE unverified claim:
 *
 *     that the interior contains enough newly-eligible land to absorb the lots
 *     the belt holds back.
 *
 * If it does not, the pair is DEAD BEFORE A LINE IS WRITTEN (the dead-code law).
 * So measure it FIRST, on pure world data, on HEAD:
 *
 *   A. the budget slack               (233: used 1153 / cap 1382 => NOT binding;
 *                                      the PREDICATE is what stops the city)
 *   B. what a candidate belt HOLDS    (developed cells inside the warped mask)
 *   C. what widening the parcel rule's road radius 2->3 (INTERIOR ONLY) ADMITS
 *      = open cells with NO road within 2 but a road within 3.
 *
 * (C) is a LOWER BOUND on absorption: it is the standing supply in the finished
 * 2035 city, and the real rule sees a running supply across 60 years of ticks.
 * So C >= B with room to spare is the green light; C ~ 0 is the kill.
 *
 * Pure world data: no canvas, no clock, no Math.random to stub, no noise floor.
 *
 *   node probe-fringeabsorb.mjs
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(join(HERE, '../../../../solvista.html')).href;

const SEEDS = [7, 42, 1234, 99, 2024, 555];
/* candidate belts: [depth, warp]. 233's law: the WARP MUST EXCEED THE DEPTH, or
   `rural` clamps to 1 at rim 0 and the city can never touch the plate's edge --
   an agent caught exactly that. So warp > depth in every candidate here. */
const BELTS = [[5, 7], [6, 8], [7, 10], [8, 12]];

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
await p.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await p.goto(PAGE);
await p.waitForFunction(() => typeof window.__warp === 'function');

const out = await p.evaluate(({ SEEDS, BELTS }) => {
  /* the candidate belt field, written here exactly as it would ship, so the
     sweep grades the real thing. Smooth value noise, bilinear over a coarse
     lattice of hashCell -- the artifact has only white noise per cell. */
  const vn = (fx, fy, s) => {
    const x0 = Math.floor(fx), y0 = Math.floor(fy), tx = fx - x0, ty = fy - y0;
    const sx = tx * tx * (3 - 2 * tx), sy = ty * ty * (3 - 2 * ty);
    const h = (a, b2) => hashCell(a, b2, s);
    const a = h(x0, y0) + (h(x0 + 1, y0) - h(x0, y0)) * sx;
    const c2 = h(x0, y0 + 1) + (h(x0 + 1, y0 + 1) - h(x0, y0 + 1)) * sx;
    return a + (c2 - a) * sy;
  };
  const ruralAt = (x, y, D, W) => {
    const rim = HEXR - hexDist(x, y, CTRX, CTRY);
    const w = (vn(x * 0.13, y * 0.13, seedNum ^ 0x5A17) - 0.5) * 2 * W;
    return Math.max(0, Math.min(1, 1 - (rim + w) / D));
  };

  const res = [];
  for (const seed of SEEDS) {
    playing = false;
    genWorld(seed);
    __warp(61);                                   /* -> 2035 */
    const budget = ks(31 + (year - 1974) * 15);

    const row = { seed, budget, used: devBudgetUsed, belts: [], admit: {} };

    /* B. what each candidate belt would HOLD (developed cells inside it) */
    for (const [D, W] of BELTS) {
      let held = 0, beltLand = 0, beltDev = 0, touchRim = 0, rim0 = 0;
      for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
        if (!inB(x, y)) continue;
        const c = cells[idx(x, y)];
        if (c.t === T.WATER) continue;
        const r = ruralAt(x, y, D, W);
        const rim = HEXR - hexDist(x, y, CTRX, CTRY);
        if (rim <= 2) { rim0++; if (r < 0.5) touchRim++; }   /* can the city still reach the edge? */
        if (r > 0.5) { beltLand++; if (DEV.has(c.t)) { beltDev++; held++; } }
      }
      row.belts.push({
        D, W, beltLand, beltDev,
        /* 233's failure mode: an unwarped ring can never vanish, so the city
           never touches the void. The share of the OUTER ring the belt leaves
           free is the direct test that the warp exceeds the depth. */
        rimFreePct: rim0 ? 100 * touchRim / rim0 : 0,
      });
    }

    /* C. what the widened interior predicate would ADMIT.
       An open cell with no ROAD within 2 (so HEAD's rule cannot see it) but a
       ROAD within r (so the widened rule can). Interior only = outside the
       deepest belt, so the two halves never fight over the same cell. */
    for (const r of [3, 4]) {
      let admit = 0;
      for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
        if (!inB(x, y)) continue;
        const c = cells[idx(x, y)];
        if (!(c.t === T.EMPTY || c.t === T.MEADOW) || c.corr) continue;
        const rim = HEXR - hexDist(x, y, CTRX, CTRY);
        if (rim <= 8) continue;                    /* interior only */
        if (countAround(x, y, 2, n => n.t === T.ROAD) > 0) continue;  /* HEAD already has it */
        if (countAround(x, y, r, n => n.t === T.ROAD) > 0) admit++;
      }
      row.admit[r] = admit;
    }
    res.push(row);
  }
  return res;
}, { SEEDS, BELTS });

console.log('\n=== A. IS THE BUDGET BINDING ON HEAD? (2035) ===');
console.log('  seed    used /  budget    slack   binding?');
for (const r of out) {
  console.log(`  ${String(r.seed).padStart(4)}   ${String(r.used).padStart(5)} / ${String(r.budget).padStart(6)}   ` +
    `${String(r.budget - r.used).padStart(6)}   ${r.used >= r.budget ? 'YES' : 'no  (SLACK => the PREDICATE stops the city)'}`);
}

console.log('\n=== B. WHAT EACH CANDIDATE BELT HOLDS (developed cells inside the mask) ===');
console.log('  depth warp |  ' + out.map(r => String(r.seed).padStart(6)).join(' ') + '  |   mean   rim-free%');
for (let i = 0; i < BELTS.length; i++) {
  const held = out.map(r => r.belts[i].beltDev);
  const mean = held.reduce((a, b2) => a + b2, 0) / held.length;
  const rf = out.reduce((s, r) => s + r.belts[i].rimFreePct, 0) / out.length;
  console.log(`  ${String(BELTS[i][0]).padStart(5)} ${String(BELTS[i][1]).padStart(4)} |  ` +
    held.map(h => String(h).padStart(6)).join(' ') + `  | ${mean.toFixed(0).padStart(6)}   ${rf.toFixed(0).padStart(6)}%`);
}
console.log('  (rim-free% = share of the OUTERMOST ring the belt does NOT cover.');
console.log('   233: it must be well above 0, or the city can never touch the plate edge.)');

console.log('\n=== C. WHAT THE WIDENED INTERIOR PREDICATE ADMITS (the absorption) ===');
console.log('  open cells, no ROAD within 2, but a ROAD within r  (interior, rim>8)');
console.log('  seed   |  r=3    r=4');
for (const r of out) {
  console.log(`  ${String(r.seed).padStart(4)}   |  ${String(r.admit[3]).padStart(4)}   ${String(r.admit[4]).padStart(4)}`);
}
const m3 = out.reduce((s, r) => s + r.admit[3], 0) / out.length;
const m4 = out.reduce((s, r) => s + r.admit[4], 0) / out.length;
console.log(`  mean   |  ${m3.toFixed(0).padStart(4)}   ${m4.toFixed(0).padStart(4)}`);

console.log('\n=== VERDICT ===');
for (let i = 0; i < BELTS.length; i++) {
  const mean = out.map(r => r.belts[i].beltDev).reduce((a, b2) => a + b2, 0) / out.length;
  const ok3 = m3 >= mean, ok4 = m4 >= mean;
  console.log(`  belt ${BELTS[i][0]}/${BELTS[i][1]}: holds ~${mean.toFixed(0)}  vs  admits ${m3.toFixed(0)} (r=3) / ${m4.toFixed(0)} (r=4)` +
    `   => ${ok3 ? 'r=3 ABSORBS' : ok4 ? 'needs r=4' : 'NOT ABSORBED — pair is dead at this depth'}`);
}
console.log('');
await b.close();
