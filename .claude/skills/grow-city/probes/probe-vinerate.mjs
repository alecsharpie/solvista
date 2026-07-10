#!/usr/bin/env node
/* probe-vinerate — does the seasonal vineyard STROBE in live play? (iter 139)
 *
 * `year` is the fast DEVELOPMENT clock (~1 yr / 6 s at speed 1, iter 134), not a
 * wall calendar. vinePhase() flips dormant->bud->veraison->ripe on `year`, so in
 * live play the grapes cycle. Iter 134 REVERTED a HUD readout that flipped words
 * on this clock at ~0.7 Hz. The static probe (probe-vine) and frozen screenshots
 * are BLIND to cadence (134's law: a claim about motion needs a temporal probe).
 *
 * But the ORCHARD already reads `year` the same way (orchardPhase, shipped iter 57,
 * tooltipped 129) and the FARMs cycle color hard every 6 s — the diorama is a
 * seasonal time-lapse. So the question is not "does it flip?" (it must, like its
 * neighbours) but "does it flip WORSE than the accepted orchard?" This runs the
 * live clock and counts phase transitions/sec for BOTH, so the orchard is the
 * control: vineyard rate must be ~= orchard rate, not harsher.
 *
 *   node probe-vinerate.mjs
 */
import { homedir } from 'node:os';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join_(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
function join_(...a){ return a.join('/'); }
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..');
const PAGE = pathToFileURL(resolve(REPO, 'solvista.html')).href;

const SEEDS = [42, 7];
const DUR = 12000, DT = 50;   /* 12 s ~ 2 full year-cycles at speed 1, sampled 20 Hz */

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });

for (const seed of SEEDS) {
  await p.goto(`${PAGE}?seed=${seed}&warp=61`);
  await p.waitForTimeout(400);
  const res = await p.evaluate(async ({ DUR, DT }) => {
    playing = true; speed = 1;
    const s = [];
    const t0 = performance.now();
    while (performance.now() - t0 < DUR) {
      s.push({ t: performance.now() - t0, v: vinePhase(), o: orchardPhase(), year });
      await new Promise(r => setTimeout(r, DT));
    }
    return s;
  }, { DUR, DT });

  let vFlip = 0, oFlip = 0;
  for (let i = 1; i < res.length; i++) {
    if (res[i].v !== res[i - 1].v) vFlip++;
    if (res[i].o !== res[i - 1].o) oFlip++;
  }
  const secs = (res[res.length - 1].t - res[0].t) / 1000;
  const dYr = res[res.length - 1].year - res[0].year;
  console.log(`\nseed ${seed}: ${secs.toFixed(1)}s real, year advanced ${dYr.toFixed(2)} (${(dYr / secs).toFixed(3)} yr/s)`);
  console.log(`  VINEYARD phase flips: ${vFlip}  (${(vFlip / secs).toFixed(2)} Hz)`);
  console.log(`  ORCHARD  phase flips: ${oFlip}  (${(oFlip / secs).toFixed(2)} Hz)  <- accepted-reference control`);
}
await b.close();
console.log('\n(Vineyard rate must be ~= orchard rate: it participates in the same seasonal time-lapse,');
console.log(' it must not flicker HARDER than the orchard that has shipped on this clock since iter 57.)');
