/* probe-kelpsweep — the two-ledger sweep for the SHIPPED kelp rule.
 *
 * Runs the artifact's own tick() with the real pass in place, pinning KELPP/KELPG/
 * KELPS per variant (top-level `let` bindings are visible to page.evaluate).
 * Pure world data: no render, no clock, no noise floor, nothing to stub.
 *
 * LEDGER 1 -- THE EFFECT (206): is the bed ALIVE and is it on the SEABED?
 *   grow     bed at 1985 -> bed at 2035. HEAD reads +0% on every seed: it stamps the
 *            bed on tick 1 and never fires again. A CONSTANT by construction, so it
 *            is a baseline nobody had to design (236).
 *   turn     cells that changed state between 1985 and 2035 (the bed's churn). HEAD: 0.
 *   shelf%   share of the bed standing on the Coastal shelf (rDeep >= SHELF0). HEAD: 0.0%.
 *   depth    the bed's mean depth. HEAD: 1.000, flat, every seed, every era.
 *
 * LEDGER 2 -- THE COST (233): does the coast go dark, or does a seed starve?
 *   THE BAR IS THE INCUMBENT, NOT A CONSTANT I CHOSE (226): HEAD ships 8-36 kelp
 *   (mean 17.7). Gate on the WORST seed -- kelp is this loop's most notorious
 *   regression ("kelp lined the entire coast dark for ~13 iterations"), and the
 *   eligible pool is up to 206 cells, so a rule allowed to converge would put weed
 *   on a third of the ocean. STARVING is the twin failure: a bed of 0 on any seed.
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = join(HERE, '../../../../solvista.html');

const SEEDS = [42, 7, 1234, 99, 2024, 555];
const HEADK = { 42: 10, 7: 17, 1234: 8, 99: 9, 2024: 26, 555: 36 };   /* measured */

/* [KELPP thinning, KELPG recruit, KELPS scour] */
/* KELPP is HELD at HEAD's own 0.62: it is the substrate a spreading bed must
   travel over, and below the ~0.5 percolation threshold the ground breaks into
   islands the bed cannot cross. Size comes from LIGHT and SCOUR instead. */
const VARIANTS = [
  [0.62, 0.020, 0.030, 6],
  [0.62, 0.020, 0.060, 6],
  [0.62, 0.020, 0.030, 4],
  [0.62, 0.020, 0.060, 4],
  [0.62, 0.014, 0.090, 5],
  [0.62, 0.020, 0.120, 6],
];

const b = await chromium.launch();
const p = await b.newPage();
await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await p.goto(pathToFileURL(ART).href);
await p.waitForTimeout(400);

for (const [P, Gr, S, LIT] of VARIANTS) {
  const rows = [];
  for (const seed of SEEDS) {
    const r = await p.evaluate(([seed, P, Gr, S, LIT]) => {
      playing = false;
      KELPP = P; KELPG = Gr; KELPS = S; KELPLIT = LIT;
      genWorld(seed);
      const snap = () => { const s = new Set(); for (const i of HEXI) if (cells[i].t === T.KELP) s.add(i); return s; };

      let k85 = null;
      for (let n = 1; n <= 800; n++) {
        year += 0.075;
        tick();
        if (k85 === null && year >= 1985) k85 = snap();
      }
      const k35 = snap();

      /* churn: cells that are kelp in one era and not the other */
      let turn = 0;
      for (const i of k85) if (!k35.has(i)) turn++;
      for (const i of k35) if (!k85.has(i)) turn++;

      let deep = 0, shelf = 0, sea = 0;
      for (const i of k35) { deep += rDeep[i]; if (rDeep[i] >= SHELF0) shelf++; }
      for (const i of HEXI) { const c = cells[i]; if ((c.t === T.WATER && !c.riv) || c.t === T.KELP) sea++; }
      const n = k35.size || 1;
      return { k85: k85.size, k35: k35.size, turn, depth: deep / n,
               shelfPct: 100 * shelf / n, sea };
    }, [seed, P, Gr, S, LIT]);
    rows.push({ seed, ...r });
  }

  const worst = Math.max(...rows.map(r => r.k35));
  const starve = Math.min(...rows.map(r => r.k35));
  const mean = rows.reduce((a, r) => a + r.k35, 0) / rows.length;
  console.log('\nKELPP=' + P + ' KELPG=' + Gr + ' KELPS=' + S + ' KELPLIT=' + LIT +
    '   | EFFECT: 1985->2035  turn  shelf%  depth | COST: kelp (HEAD)  sea%');
  for (const r of rows) {
    console.log('  seed ' + String(r.seed).padEnd(6) +
      (r.k85 + '->' + r.k35).padStart(12) + String(r.turn).padStart(7) +
      (r.shelfPct.toFixed(0) + '%').padStart(8) + r.depth.toFixed(2).padStart(7) +
      '   ' + String(r.k35).padStart(5) + (' (' + HEADK[r.seed] + ')').padEnd(7) +
      (100 * r.k35 / r.sea).toFixed(1) + '%');
  }
  console.log('  => mean ' + mean.toFixed(1) + ' (HEAD 17.7)   worst ' + worst +
    ' (HEAD 36)   min ' + starve +
    (worst > 45 ? '   <-- DARK' : '') + (starve === 0 ? '   <-- STARVED' : ''));
}

await b.close();
