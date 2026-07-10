#!/usr/bin/env node
/* Iter 128 probe: WHERE do the cable cars sit at page load? (cue (n), banked by iter 121)
 *
 * Iter 121 measured -- but deliberately did NOT fix -- that both cabins on every
 * line, every seed, sit within ONE SPAN of the start tower at page load, because
 * stepGond's growth rescale (`cb.p = cb.p<.5?cb.p*k:1-(1-cb.p)*k`, k=(L-1)/L,
 * applied once per span) telescopes p -> 0, pinning each cabin to the cell it held
 * when the line was one span long. Consequence: no cabin is ever seen riding OVER
 * the city in any screenshot without `&step=`. This instrument grades the fix:
 * re-spread the cabins once L reaches g.target.
 *
 * The one number that matters is each cabin's PHYSICAL fraction along its line,
 * t in [0,1] (0 = start tower, 1 = far tower), read at load with NO stepping.
 * gondPos folds the round-trip p into t via a triangle wave: t = p<.5? 2p : 2-2p.
 *   - Before: both cabins have t within 1/(L-1) of 0 (parked at the anchor).
 *   - After:  the two cabins are spread (t ~ 0.30 and 0.70), on opposite legs.
 * CONTROL that must NOT move: the line geometry itself -- span count and the
 * hash of the path -- proving the fix only re-placed cabins, moved no cable.
 *
 * Freeze `playing` immediately and never call __step: the whole point is the
 * load state. Run against whatever solvista.html is on disk (A/B two live builds).
 */
import { homedir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
import { existsSync } from 'node:fs';
// works whether the probe sits at the repo root (scratch) or in probes/ (promoted)
const ROOT = [resolve(HERE, '../../../..'), HERE].find(d => existsSync(join(d, 'solvista.html'))) || HERE;
const FILE = process.env.FILE || 'solvista.html';
const PAGE = pathToFileURL(FILE.startsWith('/') ? FILE : join(ROOT, FILE)).href;

const SEEDS = [7, 42, 1234];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
page.on('pageerror', e => errs.push(String(e)));

const rows = [];
for (const seed of SEEDS) {
  await page.goto(`${PAGE}?seed=${seed}&warp=61&t=0.35`, { waitUntil: 'load' });
  await page.waitForTimeout(600);
  await page.evaluate(() => { playing = false; });

  const r = await page.evaluate(() => {
    const live = gonds.filter(g => g.path && g.path.length > 1);
    const tOf = p => (p < 0.5 ? p * 2 : 2 - p * 2);         // round-trip p -> physical fraction
    // stable hash of the path polyline, to prove geometry is untouched
    const pathHash = g => { let h = 2166136261 >>> 0;
      for (const [x, y] of g.path) { h = (h ^ x) >>> 0; h = Math.imul(h, 16777619) >>> 0;
        h = (h ^ y) >>> 0; h = Math.imul(h, 16777619) >>> 0; } return h; };
    return live.map(g => ({
      spans: g.path.length - 1,
      hash: pathHash(g),
      t: g.cabins.map(cb => tOf(cb.p)),
      p: g.cabins.map(cb => cb.p),
      // "parked" = every cabin within one span of a terminal (t near 0 or 1)
      near: g.cabins.every(cb => { const t = tOf(cb.p); return Math.min(t, 1 - t) <= 1 / (g.path.length - 1); }),
    }));
  });
  r.forEach((x, li) => rows.push({ seed, line: li + 1, ...x }));
}
await browser.close();

const f = (v, d = 3) => v.toFixed(d);
console.log(`\nFILE=${FILE}   (page load, no stepping)\n`);
console.log('seed  line  spans   t(cabins)          p(cabins)          parked-at-terminal?');
let parked = 0, spanSum = 0;
for (const r of rows) {
  if (r.near) parked++;
  console.log(
    `${String(r.seed).padStart(4)}  ${String(r.line).padStart(4)}  ${String(r.spans).padStart(5)}   ` +
    `[${r.t.map(v => f(v)).join(', ')}]   [${r.p.map(v => f(v)).join(', ')}]   ${r.near ? 'YES  <-- parked' : 'no'}`);
}
// spread = how far apart the two cabins are, physically, at load. 0 = stacked at anchor.
const spreads = rows.filter(r => r.t.length === 2).map(r => Math.abs(r.t[0] - r.t[1]));
const meanSpread = spreads.reduce((a, b) => a + b, 0) / spreads.length;
console.log(`\nlines parked within one span of a terminal at load: ${parked}/${rows.length}  <-- this is cue (n)`);
console.log(`mean physical spread between the two cabins: ${f(meanSpread)}  (0 = stacked, ~0.4+ = riding the line)`);
console.log(`path hashes (geometry control): ${rows.map(r => r.hash).join(' ')}`);
if (errs.length) { console.log('PAGE ERRORS:', errs); process.exit(1); }
