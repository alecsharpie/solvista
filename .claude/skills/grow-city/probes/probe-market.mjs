#!/usr/bin/env node
/* Shape probe for the market-square rule (solvista.html L1106).
 *
 * The rule reads:
 *   COM && countAround(x,y,1, COM)>=3 && greenNear(x,y,2) && no MARKET within 4 && rng()<0.3
 *
 * Question: which conjunct starves it? Counts, per seed at 2035, how many live
 * cells survive each successive conjunct. Read-only page.evaluate — no rng()
 * draws, nothing perturbed.
 *
 *   node probe-market.mjs [seed ...]
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(join(resolve(HERE, '../../..'), 'solvista.html')).href;

const seeds = process.argv.slice(2).filter(a => !a.startsWith('-')).map(Number);
const SEEDS = seeds.length ? seeds : [7, 42, 1234, 5, 99, 3];

const b = await chromium.launch();
const rows = [];
for (const seed of SEEDS) {
  const p = await b.newPage();
  p.on('pageerror', e => console.error('PAGEERROR', seed, String(e)));
  await p.goto(`${PAGE}?seed=${seed}&warp=61&t=0.35`);
  await p.waitForTimeout(500);
  rows.push(await p.evaluate((seed) => {
    /* bare names: top-level consts are lexical, not on window (iter 96) */
    const live = HEXI.map(i => [i % G, (i / G) | 0, cells[i]]);
    const com = live.filter(([, , c]) => c.t === T.COM);
    const c3 = com.filter(([x, y]) => countAround(x, y, 1, n => n.t === T.COM) >= 3);
    const grn = c3.filter(([x, y]) => greenNear(x, y, 2));
    const free = grn.filter(([x, y]) => countAround(x, y, 4, n => n.t === T.MARKET) === 0);
    /* how far does a dense COM knot actually sit from the nearest green? */
    const dists = c3.map(([x, y]) => {
      for (let r = 1; r <= 8; r++) if (greenNear(x, y, r)) return r;
      return 99;
    });
    const hist = {};
    for (const d of dists) hist[d] = (hist[d] || 0) + 1;
    return {
      seed,
      live: live.length,
      COM: com.length,
      com3: c3.length,
      green2: grn.length,
      free4: free.length,
      MARKET: live.filter(([, , c]) => c.t === T.MARKET).length,
      IND: live.filter(([, , c]) => c.t === T.IND).length,
      greenDistHist: hist,
    };
  }, seed));
  await p.close();
}
await b.close();

console.log('\nmarket-square rule, survivors per conjunct (2035):\n');
console.log('seed    COM  >=3COM  +green2  +free4   MARKET  IND');
for (const r of rows) {
  console.log(
    String(r.seed).padEnd(6),
    String(r.COM).padStart(4),
    String(r.com3).padStart(6),
    String(r.green2).padStart(8),
    String(r.free4).padStart(7),
    String(r.MARKET).padStart(8),
    String(r.IND).padStart(4));
}
console.log('\ndistance from a >=3-COM knot to its nearest green (hexes):');
for (const r of rows) console.log(' seed', String(r.seed).padStart(4), JSON.stringify(r.greenDistHist));
console.log();
