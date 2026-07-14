/* probe-school — WHY does the school rule under-deliver?
 *
 * CIVICDESC.school promises "The district opens another with every few thousand
 * residents", and the rule says `stats.pop > 3500*(schools+1)`. The census reads
 * schools=1 at pop 16-21k on 3 seeds in 3, and 4-5 at pop 31-46k.
 *
 * Pure world data: no render, no clock, no pixels, no noise floor, nothing to stub.
 * Reports, per seed x era:
 *   - the DEMAND the rule's own gate computes (how many schools it thinks it owes)
 *   - the ELIGIBLE POOL, decomposed clause by clause, so the limiter NAMES ITSELF
 *   - the 60-try lottery's hit probability against that pool
 * POSITIVE CONTROL (248): the UNIVERSITY, a correct sibling demand-rule in the same
 * tick(), scored the same way -- it delivers 2 of 3, so if its pool reads dead the
 * PROBE is broken, not the city.
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = process.env.SRC || join(HERE, '../../../../solvista.html');

const SEEDS = [7, 42, 1234];
const ERAS = [1995, 2005, 2015, 2035];

const b = await chromium.launch();
const page = await b.newPage();
await page.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await page.goto('file://' + SRC);
await page.waitForFunction(() => typeof window.__warp === 'function');

const rows = [];
for (const seed of SEEDS) {
  for (const era of ERAS) {
    const r = await page.evaluate(({ seed, era }) => {
      playing = false;
      genWorld(seed);
      __warp(era - 1974);
      recount();

      const isSchool = c => c.t === T.CIVIC && c.kind === 'school';
      const nSchool = cells.filter(isSchool).length;
      const nUni = cells.filter(c => c.t === T.CIVIC && c.kind === 'university').length;

      /* the rule's own clauses, decomposed. Walk the LIVE plate (HEXI), and
         restrict to the box the rule actually samples: x in [2, SHOREX-1]. */
      let host = 0, hostRoad = 0, hostRoadFree = 0;
      let boxLive = 0;
      for (const i of HEXI) {
        const x = i % G, y = (i / G) | 0;
        if (x < 2 || x >= SHOREX - 1 || y < 2 || y >= G - 2) continue;
        boxLive++;
        const c = cells[i];
        if (!(c.t === T.EMPTY || c.t === T.RES)) continue;
        host++;
        if (!roadNear(x, y)) continue;
        hostRoad++;
        if (countAround(x, y, 4, n => n.t === T.CIVIC && n.kind === 'school') !== 0) continue;
        hostRoadFree++;
      }

      /* the box the lottery samples, in CELLS (incl. void it will retry past) */
      const boxCells = (SHOREX - 1 - 2) * (G - 2 - 2);

      /* university's pool, scored by ITS OWN clauses -- the positive control */
      let uPool = 0;
      for (let i = 0; i < G * G; i++) {
        const x = i % G, y = (i / G) | 0, c = cells[i];
        if (!c) continue;
        if (!(c.t === T.EMPTY || c.t === T.RES)) continue;
        if (!roadNear(x, y)) continue;
        if (!(c.val > 0.5)) continue;
        if (countAround(x, y, 5, n => n.t === T.CIVIC && n.kind === 'university') !== 0) continue;
        uPool++;
      }

      return { pop: stats.pop, nSchool, nUni, host, hostRoad, hostRoadFree,
               boxLive, boxCells, uPool,
               res: cells.filter(c => c.t === T.RES).length,
               mid: cells.filter(c => c.t === T.MID).length,
               empty: cells.filter(c => c.t === T.EMPTY).length };
    }, { seed, era });
    rows.push({ seed, era, ...r });
  }
}
await b.close();

const f = (n, w) => String(n).padStart(w);
console.log('\n=== A. THE SCHOOL RULE: demand vs delivery ===');
console.log('  (owed = pop/3500, the rule\'s own gate. Every era, every seed.)\n');
console.log('  seed  era      pop  owed  built   SHORT');
for (const r of rows) {
  const owed = Math.floor(r.pop / 3500);
  const short = owed - r.nSchool;
  console.log(`  ${f(r.seed,4)} ${f(r.era,5)} ${f(r.pop,8)} ${f(owed,5)} ${f(r.nSchool,6)} ${f(short > 0 ? '-' + short : 'ok', 7)}`);
}

console.log('\n=== B. WHICH CLAUSE STARVES IT? the pool, decomposed ===');
console.log('  (the rule takes 60 uniform tries in a box of `boxCells`;');
console.log('   `hit%` = 1-(1-pool/boxCells)^60 = its chance of placing on a tick it fires)\n');
console.log('  seed  era   EMPTY|RES  +roadNear  +not-within-4   pool/box    hit%');
for (const r of rows) {
  const p = r.hostRoadFree / r.boxCells;
  const hit = (1 - Math.pow(1 - p, 60)) * 100;
  console.log(`  ${f(r.seed,4)} ${f(r.era,5)} ${f(r.host,11)} ${f(r.hostRoad,10)} ${f(r.hostRoadFree,15)} ${f((p*100).toFixed(2)+'%',10)} ${f(hit.toFixed(1)+'%',7)}`);
}

console.log('\n=== C. THE HOST, over time (206: what does RES BECOME?) ===');
console.log('  seed  era    EMPTY     RES     MID');
for (const r of rows)
  console.log(`  ${f(r.seed,4)} ${f(r.era,5)} ${f(r.empty,8)} ${f(r.res,7)} ${f(r.mid,7)}`);

console.log('\n=== D. POSITIVE CONTROL (248): the UNIVERSITY, same tick(), delivers 2 of 3 ===');
console.log('  (it scans the WHOLE grid deterministically instead of a 60-try lottery)\n');
console.log('  seed  era      pop  owed  built   pool');
for (const r of rows) {
  if (r.era < 2015) continue;
  const owed = Math.floor(r.pop / 14000);
  console.log(`  ${f(r.seed,4)} ${f(r.era,5)} ${f(r.pop,8)} ${f(owed,5)} ${f(r.nUni,6)} ${f(r.uPool,6)}`);
}
console.log('');
