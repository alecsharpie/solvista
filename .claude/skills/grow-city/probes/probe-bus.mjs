#!/usr/bin/env node
/* probe-bus — the headway probe for iteration 111 (People & activity x Connect).
 *
 * The queue at a shelter is only worth building if a bus ever comes to take it
 * away. `stepVehicle` sets `v.wait` when a bus (14% of the fleet) lands on a
 * `c.stop` hex. This measures, per seed, how often that actually happens:
 *
 *   buses       how many buses are in the fleet
 *   stops       how many stop hexes exist
 *   arrivals    bus arrivals at any stop per sim-minute (city-wide)
 *   served      stops that saw >=1 bus during the window
 *   headway     mean sim-seconds between arrivals AT A GIVEN SERVED STOP
 *
 * The last number is the design constant: the shelter's queue must refill in
 * appreciably less than one headway, or every shelter reads permanently full and
 * the bus takes away nothing.
 *
 * Fixed step count, never wall time (iter 103/104's law).
 *
 *   node probe-bus.mjs [seeds...]      (default 7 42 1234)
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
const STEPS = 36000;          // @ dt=1/30 -> 1200 sim-seconds = 20 sim-minutes

const browser = await chromium.launch();
const rows = [];
for (const seed of SEEDS) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const errs = [];
  page.on('pageerror', e => errs.push(String(e)));
  await page.goto(`${PAGE}?seed=${seed}&warp=61`, { waitUntil: 'load' });
  await page.waitForTimeout(600);

  const r = await page.evaluate(({ STEPS }) => {
    const dt = 1 / 30;
    let stops = 0;
    for (let i = 0; i < G * G; i++) { const c = cells[i]; if (c && c.t === T.ROAD && c.stop) stops++; }
    const buses = vehicles.filter(v => v.kind === 'bus');

    /* an arrival is the edge where stepVehicle sets v.wait on a stop hex */
    const prevWait = new Map(buses.map(v => [v, v.wait || 0]));
    const lastAt = new Map();          // stop idx -> sim-time of previous arrival
    const gaps = [];                   // per-stop inter-arrival gaps
    const served = new Set();
    let arrivals = 0, t = 0;

    for (let i = 0; i < STEPS; i++) {
      for (const v of buses) stepVehicle(v, dt);
      t += dt;
      for (const v of buses) {
        const w = v.wait || 0, pw = prevWait.get(v);
        if (w > 0 && pw <= 0) {        // rising edge: it just pulled in
          const k = idx(v.x, v.y);
          arrivals++; served.add(k);
          if (lastAt.has(k)) gaps.push(t - lastAt.get(k));
          lastAt.set(k, t);
        }
        prevWait.set(v, w);
      }
    }
    const mean = a => a.length ? a.reduce((s, x) => s + x, 0) / a.length : 0;

    /* the shelter clock, sampled off the LIVE rule (never re-derived here --
       iter 110's law). Requires stopQueue to exist; on pristine HEAD it does not,
       and these come back null so the probe still reports headway. */
    let waiters = null, emptyFrac = null, boardFrac = null, spread = null;
    if (typeof stopQueue === 'function') {
      const stopXY = [];
      for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
        const c = cells[idx(x, y)]; if (c && c.t === T.ROAD && c.stop) stopXY.push([x, y, c]);
      }
      let wSum = 0, empty = 0, board = 0, n = 0;
      const perStop = stopXY.map(() => 0);
      for (let i = 0; i < 9000; i++) {          // 300 more sim-seconds, sampled every 10
        for (const v of buses) stepVehicle(v, dt);
        time += dt;                              // stopQueue reads the global clock
        if (i % 10) continue;
        stopXY.forEach(([x, y, c], k) => {
          const { q, bl } = stopQueue(c, x, y);
          wSum += q; perStop[k] += q; if (bl) board++; else if (!q) empty++;
        });
        n++;
      }
      const tot = n * stopXY.length;
      waiters = wSum / tot; emptyFrac = empty / tot; boardFrac = board / tot;
      const per = perStop.map(s => s / n);
      spread = Math.sqrt(mean(per.map(v => (v - mean(per)) ** 2)));
    }
    return {
      buses: buses.length, stops, arrivals, served: served.size,
      simMin: t / 60, headway: mean(gaps), gapsN: gaps.length,
      medHeadway: gaps.length ? gaps.slice().sort((a, b) => a - b)[gaps.length >> 1] : 0,
      waiters, emptyFrac, boardFrac, spread,
    };
  }, { STEPS });

  if (errs.length) { console.error(`seed ${seed}: PAGE ERROR`, errs[0]); process.exitCode = 1; }
  rows.push([seed, r]);
  await page.close();
}
await browser.close();

console.log('seed   buses  stops  served       arrivals/min  headway(s)  median(s)');
for (const [seed, r] of rows) {
  console.log(
    String(seed).padEnd(6) +
    String(r.buses).padEnd(7) +
    String(r.stops).padEnd(7) +
    `${r.served} (${r.stops ? (100 * r.served / r.stops).toFixed(0) : '--'}%)`.padEnd(13) +
    (r.arrivals / r.simMin).toFixed(2).padEnd(14) +
    (r.headway ? r.headway.toFixed(1) : '--').padEnd(12) +
    (r.medHeadway ? r.medHeadway.toFixed(1) : '--'));
}
if (rows[0][1].waiters !== null) {
  console.log('\nshelter clock (live stopQueue, 300 sim-s):  old rule = 1.50 waiters, always, everywhere');
  console.log('seed   mean waiters  empty  boarding  per-stop spread');
  for (const [seed, r] of rows) console.log(
    String(seed).padEnd(6) + r.waiters.toFixed(2).padEnd(14) +
    `${(100 * r.emptyFrac).toFixed(1)}%`.padEnd(7) +
    `${(100 * r.boardFrac).toFixed(1)}%`.padEnd(10) + r.spread.toFixed(2));
}
