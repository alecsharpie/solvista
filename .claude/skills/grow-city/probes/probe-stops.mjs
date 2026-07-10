#!/usr/bin/env node
/* probe-stops — the reachability probe for iteration 111 (People & activity x Connect).
 *
 * The question that must be answered BEFORE designing: the shelters at `c.stop`
 * road hexes currently paint 1-2 *fake* stick figures. If real residents replace
 * them, can residents actually GET there? A ped may stand on a road hex only if
 * `pedRoad(x,y) && hexDist(x,y,p.hx,p.hy) <= PEDLEASH` -- so a stop that no
 * resident's anchor can reach would end up EMPTIER than the fakes it replaced.
 *
 * Reported per seed (era 2035):
 *   stops        how many `c.stop` road hexes exist
 *   nearOpen     stops within PEDLEASH of ANY strollable cell   (structural ceiling:
 *                could a resident anchored in the right place ever stand here?)
 *   nearAnchor   stops within PEDLEASH of a LIVE ped's anchor   (the real ceiling:
 *                given where the 130 residents actually spawned)
 *   occupied     stops with >=1 ped standing on them, time-averaged over the
 *                sampled steps (the null: what the blind walk already delivers)
 *   pedsOnStop   mean number of peds standing on any stop hex
 *
 * Method follows probe-buzz: one page load, fixed step count (never wall time),
 * so machine load cannot skew the reading.
 *
 *   node probe-stops.mjs [seeds...]      (default 7 42 1234)
 */
import { homedir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(HERE, '../../..');
const PAGE = pathToFileURL(join(REPO, 'solvista.html')).href;

const seeds = process.argv.slice(2).filter(a => /^\d+$/.test(a)).map(Number);
const SEEDS = seeds.length ? seeds : [7, 42, 1234];
const BURN = 6000, SAMP = 9000, EVERY = 10;   // steps @ dt=1/30 -> 200s burn-in, 300s sampled

const browser = await chromium.launch();
const rows = [];
for (const seed of SEEDS) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const errs = [];
  page.on('pageerror', e => errs.push(String(e)));
  await page.goto(`${PAGE}?seed=${seed}&warp=61`, { waitUntil: 'load' });
  await page.waitForTimeout(600);

  const r = await page.evaluate(({ BURN, SAMP, EVERY }) => {
    const dt = 1 / 30;
    const stops = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)];
      if (c && c.t === T.ROAD && c.stop) stops.push([x, y]);
    }

    /* structural ceiling: is there ANY strollable cell within a leash of this stop? */
    const nearOpen = stops.filter(([sx, sy]) => {
      for (let dy = -PEDLEASH; dy <= PEDLEASH; dy++) for (let dx = -PEDLEASH; dx <= PEDLEASH; dx++) {
        const x = sx + dx, y = sy + dy;
        if (hexDist(x, y, sx, sy) <= PEDLEASH && strollable(x, y)) return true;
      }
      return false;
    }).length;

    /* real ceiling: is a live resident's ANCHOR within a leash of this stop?
       swept over candidate reach radii -- how far must the tether stretch before
       most shelters have somebody who could plausibly walk to them? */
    const anchorAt = {};
    for (const R of [2, 3, 4, 5]) anchorAt[R] = stops.filter(([sx, sy]) =>
      peds.some(p => hexDist(sx, sy, p.hx, p.hy) <= R)).length;
    const nearAnchor = anchorAt[PEDLEASH];

    const stopSet = new Set(stops.map(([x, y]) => idx(x, y)));
    for (let i = 0; i < BURN; i++) for (const p of peds) stepPed(p, dt);

    let occSum = 0, pedSum = 0, n = 0;
    for (let i = 0; i < SAMP; i++) {
      for (const p of peds) stepPed(p, dt);
      if (i % EVERY) continue;
      const seen = new Set();
      let onStop = 0;
      for (const p of peds) { const k = idx(p.x, p.y); if (stopSet.has(k)) { onStop++; seen.add(k); } }
      occSum += seen.size; pedSum += onStop; n++;
    }
    return { anchorAt, stops: stops.length, nearOpen, nearAnchor, occupied: occSum / n, pedsOnStop: pedSum / n, peds: peds.length };
  }, { BURN, SAMP, EVERY });

  if (errs.length) { console.error(`seed ${seed}: PAGE ERROR`, errs[0]); process.exitCode = 1; }
  rows.push([seed, r]);
  await page.close();
}
await browser.close();

const pct = (a, b) => b ? `${(100 * a / b).toFixed(1)}%` : '--';
console.log('seed   peds  stops  nearOpen      nearAnchor     occupied      pedsOnStop');
for (const [seed, r] of rows) {
  console.log(
    String(seed).padEnd(6) +
    String(r.peds).padEnd(6) +
    String(r.stops).padEnd(7) +
    `${r.nearOpen} (${pct(r.nearOpen, r.stops)})`.padEnd(14) +
    `${r.nearAnchor} (${pct(r.nearAnchor, r.stops)})`.padEnd(15) +
    `${r.occupied.toFixed(2)} (${pct(r.occupied, r.stops)})`.padEnd(14) +
    r.pedsOnStop.toFixed(2));
}
console.log('\nstops with an anchor within radius R:');
console.log('seed   R=2      R=3      R=4      R=5');
for (const [seed, r] of rows) {
  console.log(String(seed).padEnd(6) +
    [2,3,4,5].map(R => `${r.anchorAt[R]} (${pct(r.anchorAt[R], r.stops)})`.padEnd(9)).join(''));
}
