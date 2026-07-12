#!/usr/bin/env node
/* Shape probe for the community-garden rule (solvista.html ~L1498).
 *
 * The rule reads:
 *   year>=2008 && RES && countAround(x,y,1, RES)>=3 && no GARDEN within 2 && rng()<0.05
 *
 * Census says GARDEN = 6 hexes across the whole 9-cell seed x era matrix, and the
 * rule is year-gated to 2008+, so that is ~2 per city at the 2035 era and ZERO
 * everywhere else. Question (iter 107's move): which conjunct starves it?
 *
 * Counts, per seed, how many live cells survive each successive conjunct -- and
 * does it at several YEARS, because the suspicion is that the dense-RES pool the
 * rule wants is eaten by the upgrade pass (RES -> MID/COM/TOWER) exactly as the
 * rule switches on. Read-only page.evaluate: no rng() draws, nothing perturbed.
 *
 *   node probe-gardenhost.mjs [seed ...]
 */
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
/* resolve the artifact relative to THIS file, never an absolute path -- this probe
   is born at the repo root and gets git mv'd into probes/, so accept both depths */
const ROOT = ['.', '../../../..'].map(u => resolve(HERE, u, 'solvista.html')).find(existsSync)
  || resolve(HERE, 'solvista.html');
const PAGE = pathToFileURL(ROOT).href;

const seeds = process.argv.slice(2).filter(a => !a.startsWith('-')).map(Number);
const SEEDS = seeds.length ? seeds : [7, 42, 1234, 5, 99, 3];
const YEARS = [2008, 2015, 2025, 2035];

const b = await chromium.launch();
console.log('page:', PAGE);
console.log('');
console.log('  seed  year |  RES   RES w/ >=3 RES nbrs (the rule\'s host)  |  GARDEN  | expected');
console.log('  -----------+-----------------------------------------------+----------+---------');

const summary = [];
for (const seed of SEEDS) {
  for (const yr of YEARS) {
    const p = await b.newPage();
    p.on('pageerror', e => console.error('PAGEERROR', seed, String(e)));
    await p.goto(`${PAGE}?seed=${seed}&warp=${yr - 1974}&t=0.35`);
    await p.waitForTimeout(400);
    const r = await p.evaluate(() => {
      /* bare names: top-level consts are lexical, not on window (iter 96) */
      const live = HEXI.map(i => [i % G, (i / G) | 0, cells[i]]);
      const res = live.filter(([, , c]) => c.t === T.RES);
      /* the rule's actual host predicate */
      const host = res.filter(([x, y]) => countAround(x, y, 1, n => n.t === T.RES) >= 3);
      const gardens = live.filter(([, , c]) => c.t === T.GARDEN).length;
      /* what the pool WOULD be if the rule accepted any RES with >=2, >=1 nbrs */
      const h2 = res.filter(([x, y]) => countAround(x, y, 1, n => n.t === T.RES) >= 2).length;
      const h1 = res.filter(([x, y]) => countAround(x, y, 1, n => n.t === T.RES) >= 1).length;
      /* THE COMMENT'S HOST: the vacant lot *between* the houses. The rule says
         "between the houses" and then converts a HOUSE. Does the gap exist? */
      const empty = live.filter(([, , c]) => c.t === T.EMPTY);
      const road = (x, y) => countAround(x, y, 1, n => n.t === T.ROAD) >= 1;
      const e3 = empty.filter(([x, y]) => countAround(x, y, 1, n => n.t === T.RES) >= 3).length;
      const e2 = empty.filter(([x, y]) => countAround(x, y, 1, n => n.t === T.RES) >= 2).length;
      /* and with a road touching it, since a garden wants a way in */
      const e2r = empty.filter(([x, y]) => countAround(x, y, 1, n => n.t === T.RES) >= 2 && road(x, y)).length;
      /* THE HONEST PREDICATE: a garden wants to be surrounded by HOMES, and in this
         city homes are RES *and MID* (the upgrade pass turns houses into mid-rise
         flats -- still housing). "RES" is a definition the upgrade pass invalidates. */
      const home = n => n.t === T.RES || n.t === T.MID;
      const m3 = res.filter(([x, y]) => countAround(x, y, 1, home) >= 3).length;
      const m4 = res.filter(([x, y]) => countAround(x, y, 1, home) >= 4).length;
      const mid = live.filter(([, , c]) => c.t === T.MID).length;
      return { live: live.length, res: res.length, host: host.length, h2, h1, gardens,
               empty: empty.length, e3, e2, e2r, mid, m3, m4, year: Math.floor(year) };
    });
    await p.close();
    /* expected placements from 2008 to this year, given a static host pool:
       ticks = (yr-2008)/0.075 ; attempts/tick = ks(6) ~ 8 ; P(hit) = host/live ; x 0.05 */
    const ticks = Math.max(0, (r.year - 2008) / 0.075);
    const exp = ticks * 8 * (r.host / r.live) * 0.05;
    summary.push({ seed, yr, ...r, exp });
    console.log(
      `  ${String(seed).padStart(4)}  ${r.year} | ${String(r.res).padStart(4)}   ` +
      `${String(r.host).padStart(4)} (>=2: ${String(r.h2).padStart(4)}  >=1: ${String(r.h1).padStart(4)})        ` +
      `|  ${String(r.gardens).padStart(4)}   |  ${exp.toFixed(1)}` +
      `   || EMPTY ${String(r.empty).padStart(4)}  gap>=3RES ${String(r.e3).padStart(3)}` +
      `  gap>=2RES ${String(r.e2).padStart(3)}  (+road ${String(r.e2r).padStart(3)})`);
  }
  console.log('  -----------+-----------------------------------------------+----------+---------');
}
await b.close();

const at35 = summary.filter(s => s.yr === 2035);
const mean = (a) => a.reduce((x, y) => x + y, 0) / a.length;
console.log('');
console.log('AT 2035, across ' + at35.length + ' seeds:');
console.log('  mean RES                       = ' + mean(at35.map(s => s.res)).toFixed(0));
console.log('  mean HOST (RES, >=3 RES nbrs)  = ' + mean(at35.map(s => s.host)).toFixed(1) +
  '   <-- the pool the rule draws from');
console.log('  mean GARDEN actually placed    = ' + mean(at35.map(s => s.gardens)).toFixed(1));
console.log('  host as share of live plate    = ' + (100 * mean(at35.map(s => s.host / s.live))).toFixed(2) + '%');
console.log('');
console.log('TRAJECTORY of the host pool (mean over seeds):');
for (const yr of YEARS) {
  const g = summary.filter(s => s.yr === yr);
  console.log(`  ${yr}:  RES ${String(Math.round(mean(g.map(s => s.res)))).padStart(4)}   ` +
    `host(RES,>=3) ${String(mean(g.map(s => s.host)).toFixed(1)).padStart(6)}   ` +
    `garden ${mean(g.map(s => s.gardens)).toFixed(1)}   ` +
    `|| THE GAP: empty>=2RES ${mean(g.map(s => s.e2)).toFixed(1)}  (+road ${mean(g.map(s => s.e2r)).toFixed(1)})`);
}
console.log('');
console.log('THE FIX: count HOMES (RES|MID), not just houses -- the upgrade pass turns a');
console.log('dense house into a mid-rise, so "RES nbrs" deletes its own pool as it matures.');
console.log('');
console.log('  year |  RES,>=3 RES nbrs (NOW)  ->  RES,>=3 HOME nbrs (FIX)   [x]');
for (const yr of YEARS) {
  const g = summary.filter(s => s.yr === yr);
  const now = mean(g.map(s => s.host)), fix = mean(g.map(s => s.m3));
  console.log(`  ${yr} |        ${String(now.toFixed(1)).padStart(5)}          ->        ${String(fix.toFixed(1)).padStart(5)}` +
    `            [${(fix / Math.max(now, 0.01)).toFixed(1)}x]   (>=4 homes: ${mean(g.map(s => s.m4)).toFixed(1)})`);
}
console.log('');
console.log('  per-seed host at 2035 (the zero-garden seeds are the tell):');
for (const s of at35) console.log(`    seed ${String(s.seed).padStart(4)}:  RES>=3RES ${String(s.host).padStart(3)}` +
  `  ->  RES>=3HOME ${String(s.m3).padStart(3)}   (gardens now: ${s.gardens})`);
