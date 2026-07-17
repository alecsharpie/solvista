#!/usr/bin/env node
/* probe-frozencol — the FROZEN CENSUS COLUMN, one command (282/287's #1 seam law).
 *
 * "A tile flat across the eras is terrain or a DEAD RULE (check which); a ZERO
 *  row is LOUDER than a flat one" (287 found SOLARF = 0 in all 9 cells for 180
 *  laps this way; 282 found the kelp bed stamped on tick 1 and never moving).
 *
 * census.mjs only prints types that CHANGED vs a baseline, and only SUMMED over
 * the whole matrix, so a type that is dead-flat in every era is invisible to it.
 * This dumps the full per-era tile histogram (summed over the seed set) so a
 * flat or zero row jumps out. Pure world data via __census().tiles — no pixels,
 * no clock beyond warp, nothing to stub.
 *
 *   node probes/probe-frozencol.mjs            # seeds 7,42,1234 (census matrix)
 *   SEEDS=7,99 node probes/probe-frozencol.mjs
 *
 * A FLAT row is a seam: read the tile's tick() pass and decide terrain vs dead
 * rule. A ZERO row is a louder seam (a fully-drawn, labelled tile that never
 * gets built). Neither is a verdict — it is where to LOOK.
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));               /* .../grow-city/probes */
const PAGE = pathToFileURL(join(HERE, '../../../../solvista.html')).href;
const SEEDS = (process.env.SEEDS ? process.env.SEEDS.split(',') : ['7','42','1234']).map(Number);
const ERAS = [{n:'1985',w:11},{n:'2005',w:31},{n:'2035',w:61}];     /* census.mjs's own matrix */

const b = await chromium.launch();
const agg = {};                                                    /* type -> era -> summed count */
for (const s of SEEDS) {
  for (const e of ERAS) {
    const p = await b.newPage();
    await p.goto(PAGE + `?seed=${s}&warp=${e.w}`, { waitUntil: 'load' });
    await p.waitForTimeout(300);
    const t = await p.evaluate(() => window.__census().tiles);
    for (const k in t) (agg[k] = agg[k] || {})[e.n] = (agg[k][e.n] || 0) + t[k];
    await p.close();
  }
}
await b.close();

console.log(`seeds ${SEEDS.join(',')}  |  summed per era`);
console.log('TYPE         1985   2005   2035   note');
for (const k of Object.keys(agg)) {
  const r = agg[k], a = r['1985']||0, c = r['2005']||0, d = r['2035']||0;
  let note = '';
  if (a + c + d === 0) note = 'ZERO  <- fully absent: dead rule or never-built (LOUDEST seam)';
  else if (a === c && c === d) note = 'FLAT  <- terrain, or a dead rule (read its tick() pass)';
  console.log(`${k.padEnd(11)} ${String(a).padStart(6)} ${String(c).padStart(6)} ${String(d).padStart(6)}   ${note}`);
}
