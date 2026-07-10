#!/usr/bin/env node
/* Iter 112 probe: what does a monorail line actually look like, in the numbers
 * the train would need to stop at its stations?
 *
 *  - path length L, and how long one lap takes at the flat rate (0.014 p/s)
 *  - m.stops.size            (candidate stops -- what the TOOLTIP reports)
 *  - real, DRAWN stations    (stops whose neighborhood has >=3 DEV cells)
 *  - gaps between real stations, in spans and in seconds of travel
 *
 * The gap distribution is what sets the braking distance and the dwell: a dwell
 * that is long next to a short gap means a train that is never moving.
 */
import { homedir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(join(resolve(HERE, '../../..'), 'solvista.html')).href;

const SEEDS = [7, 42, 1234];
const RATE = 0.014; // p per sim-second, the current flat train speed

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

for (const seed of SEEDS) {
  await page.goto(`${PAGE}?seed=${seed}&warp=61&t=0.35`, { waitUntil: 'load' });
  await page.waitForTimeout(700);

  const r = await page.evaluate(() => {
    // mirror the draw predicate exactly: a stop is a station only if its
    // neighborhood is busy (>=3 DEV cells around it)
    const real = (m) => m.path
      .map(([x, y], i) => [i, x, y])
      .filter(([i, x, y]) => m.stops.has(i) && countAround(x, y, 1, n => DEV.has(n.t)) >= 3)
      .map(([i]) => i);

    return monos.filter(m => m.closed).map((m, li) => {
      const st = real(m);
      const L = m.path.length;
      const gaps = st.map((v, k) => {
        const nx = st[(k + 1) % st.length];
        return ((nx - v) + L) % L || L;
      });
      return { li, L, stops: m.stops.size, stations: st.length, gaps, trains: m.trains.length };
    });
  });

  console.log(`\n=== seed ${seed} — ${r.length} closed line(s) ===`);
  for (const m of r) {
    const lap = 1 / RATE;                       // sim-seconds for one lap
    const secPerSpan = lap / m.L;
    const gs = m.gaps.slice().sort((a, b) => a - b);
    const med = gs[gs.length >> 1] ?? 0;
    console.log(
      `  line ${m.li}: L=${m.L} spans, lap=${lap.toFixed(0)}s (${secPerSpan.toFixed(2)}s/span), trains=${m.trains}\n` +
      `    stops.size=${m.stops} (tooltip says this)   REAL drawn stations=${m.stations}` +
      `   -> tooltip overstates by ${m.stops - m.stations} (${(100 * (m.stops - m.stations) / m.stops).toFixed(0)}%)\n` +
      `    station gaps (spans): min=${gs[0]} med=${med} max=${gs[gs.length - 1]}` +
      `   =>  min gap = ${(gs[0] * secPerSpan).toFixed(1)}s of travel, med = ${(med * secPerSpan).toFixed(1)}s`
    );
  }
}

await browser.close();
