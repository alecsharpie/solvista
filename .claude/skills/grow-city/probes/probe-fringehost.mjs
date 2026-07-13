#!/usr/bin/env node
/* probe-fringehost.mjs — WHAT ACTUALLY LIMITS DEVELOPMENT AT THE RIM?
 *
 * Cue (ai): the city has no fringe — rim 0-2 is 46.5% developed vs 41.3% deep
 * interior (probe-fringe, 232). The taper is INVERTED.
 *
 * Before designing a fix, 218's law: print the roll's CONVERSION RATE, and 219's
 * tell: does the success branch remove the cell from its own eligible pool?
 *
 * The parcel rule (L1572):
 *     for i < ks(480): [x,y,c] = rc()
 *       if ((EMPTY|MEADOW) && !corr && roads-within-2 > 0)
 *          p = 0.22 + 0.06*dev + (greenNear?0.12:0) + 0.24*(c.val-0.5)
 *          if (rng() < p) -> COM or RES ; devBudgetUsed++
 *   ...the whole loop gated by `if (devBudgetUsed < budget)`,
 *      budget = ks(31 + (year-1974)*15), devBudgetUsed reset ONLY in genWorld.
 *
 * So there are THREE candidate limiters, and which one binds decides the entire
 * shape of the fix:
 *
 *   (1) THE BUDGET is binding  -> development is a COMPETITION for a global cap.
 *       Then a PURE-ADDITION core preference (m = 1 + B*core, 219's mandated
 *       shape) makes the core win the race and the rim is left wild -- and the
 *       pop is PRESERVED, because the budget still gets spent, just inland.
 *       Cue (ai)'s trap (1) ("a rim cut is a pop cut") would then NOT apply.
 *
 *   (2) THE ROLL is saturated (~100% of eligible cells convert) -> p is a DEAD
 *       lever (218) and only the PREDICATE can steer the rule.
 *
 *   (3) THE PREDICATE is binding (no road within 2) -> the rim is dense because
 *       ROADS run to the rim, and the fix belongs in the road/corridor pass.
 *
 * Pure world data: no canvas, no clock, no Math.random to stub, no noise floor.
 * (probe-skyline's class — the cheapest in the harness.)
 *
 *   node probe-fringehost.mjs
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(join(HERE, '../../../../solvista.html')).href;

const SEEDS = [7, 42, 1234, 99, 2024, 555];
const BANDS = [[0, 2], [3, 5], [6, 8], [9, 12], [13, 17], [18, 33]];

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
await p.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await p.goto(PAGE);
await p.waitForFunction(() => typeof window.__warp === 'function');

const out = await p.evaluate(({ SEEDS, BANDS }) => {
  const res = [];
  for (const seed of SEEDS) {
    playing = false;
    genWorld(seed);
    __warp(61);                       /* -> 2035 */

    const budget = ks(31 + (year - 1974) * 15);
    /* per-rim-band tallies */
    const band = BANDS.map(() => ({ land: 0, dev: 0, wild: 0, road: 0, elig: 0, nearRoad: 0 }));
    const bi = d => BANDS.findIndex(([a, z]) => d >= a && d <= z);
    const WILD = new Set([T.EMPTY, T.MEADOW, T.FOREST, T.FARM, T.REDWOOD, T.ORCHARD, T.VINEYARD, T.ROCK, T.BURNT]);

    let elig = 0, devTot = 0, landTot = 0;
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      if (!inB(x, y)) continue;
      const c = cells[idx(x, y)];
      if (c.t === T.WATER) continue;               /* sea excluded from the denominator */
      const rim = HEXR - hexDist(x, y, CTRX, CTRY);
      const k = bi(rim); if (k < 0) continue;
      band[k].land++; landTot++;
      if (DEV.has(c.t)) { band[k].dev++; devTot++; }
      if (WILD.has(c.t)) band[k].wild++;
      if (c.t === T.ROAD) band[k].road++;
      /* the parcel rule's OWN predicate, evaluated on the finished city:
         a cell that STILL satisfies it is eligible-but-unconverted */
      const open = (c.t === T.EMPTY || c.t === T.MEADOW) && !c.corr;
      if (open) {
        const nr = countAround(x, y, 2, n => n.t === T.ROAD) > 0;
        if (nr) { band[k].elig++; elig++; }
        if (nr) band[k].nearRoad++;
      }
    }
    res.push({
      seed, year: Math.round(year), budget, used: devBudgetUsed,
      binding: devBudgetUsed >= budget,
      elig, devTot, landTot,
      band: band.map((v, i) => ({
        rim: BANDS[i].join('-'), land: v.land,
        devPct: v.land ? 100 * v.dev / v.land : 0,
        wildPct: v.land ? 100 * v.wild / v.land : 0,
        roadPct: v.land ? 100 * v.road / v.land : 0,
        eligPct: v.land ? 100 * v.elig / v.land : 0,
      })),
    });
  }
  return res;
}, { SEEDS, BANDS });

console.log('\n=== A. IS THE BUDGET BINDING? (2035) ===');
console.log('  seed   budget    used   binding?   eligible-but-unconverted   developed');
for (const r of out) {
  console.log(`  ${String(r.seed).padStart(4)}  ${String(r.budget).padStart(7)} ${String(r.used).padStart(7)}   ` +
    `${r.binding ? 'YES  (cap reached)' : 'no   (cap SLACK) '}  ${String(r.elig).padStart(8)}` +
    `                 ${String(r.devTot).padStart(6)}`);
}

console.log('\n=== B. CONVERSION RATE OF THE PARCEL ROLL (218) ===');
console.log('  converted / (converted + still-eligible)  — ~100% => p is a DEAD lever');
for (const r of out) {
  const cr = 100 * r.devTot / (r.devTot + r.elig);
  console.log(`  seed ${String(r.seed).padStart(4)}:  ${cr.toFixed(1)}%   (${r.devTot} converted, ${r.elig} still eligible)`);
}

console.log('\n=== C. WHAT IS AT THE RIM? (mean over seeds, land only, sea excluded) ===');
console.log('  rim band   land    developed    wild     ROAD    eligible-unconverted');
for (let i = 0; i < BANDS.length; i++) {
  const m = k => out.reduce((s, r) => s + r.band[i][k], 0) / out.length;
  console.log(`  ${BANDS[i].join('-').padEnd(8)} ${m('land').toFixed(0).padStart(5)}` +
    `      ${m('devPct').toFixed(1).padStart(5)}%  ${m('wildPct').toFixed(1).padStart(5)}%` +
    `  ${m('roadPct').toFixed(1).padStart(5)}%          ${m('eligPct').toFixed(1).padStart(5)}%`);
}
console.log('\n  (rim 0-2 = the outermost ring of the plate; 18-33 = the deep interior)\n');

await b.close();
