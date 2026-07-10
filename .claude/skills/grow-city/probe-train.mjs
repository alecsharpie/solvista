#!/usr/bin/env node
/* Iter 112 probe: does the train actually behave like a train?
 *
 * Drives sim time with __step() (deterministic, s=1, no rAF), sampling every 0.1s.
 * Asks five questions the screenshots cannot answer:
 *   1. GROUND SPEED (spans/sec) per line -- was proportional to loop length, should
 *      now be near-constant across lines (capped on stubby loops).
 *   2. Does a train STAND, and for how long / what fraction of its lap?
 *   3. When standing, is its MIDDLE CAR actually at a platform? (should be ~0 spans)
 *   4. Do two trains on a line ever overlap? (min separation, in spans)
 *   5. Does a platform's crowd actually cycle, or is it pinned full?
 */
import { homedir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(join(resolve(HERE, '../../..'), 'solvista.html')).href;

const SEEDS = [7, 42, 1234];
const DUR = 240, DT = 0.1;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
page.on('pageerror', e => errs.push(String(e)));

for (const seed of SEEDS) {
  await page.goto(`${PAGE}?seed=${seed}&warp=61&t=0.35`, { waitUntil: 'load' });
  await page.waitForTimeout(600);
  await page.evaluate(() => { playing = false; });

  const r = await page.evaluate(({ DUR, DT }) => {
    const L = monos.map(m => m.path.length);
    const S = monos.map(m => (m.sta ? [...m.sta] : []));
    const lines = monos.map((m, li) => ({
      li, L: m.path.length, closed: m.closed, stations: S[li].length,
      trains: m.trains.length,
      moved: 0, movingTime: 0, standTime: 0, stands: 0,
      offPlatform: [],      // spans between a standing train's middle car and nearest platform
      minSep: Infinity,     // closest two trains ever come, in spans
      qSeen: new Set(),     // crowd sizes observed at a sample station
    }));
    // a sample station per line, to watch its crowd cycle
    const watch = monos.map((m, li) => S[li].length ? m.path[S[li][0]] : null);

    const prev = monos.map(m => m.trains.map(t => t.p));
    for (let k = 0; k < DUR / DT; k++) {
      window.__step(DT);
      monos.forEach((m, li) => {
        if (!m.closed) return;
        const R = lines[li], Ln = m.path.length;
        m.trains.forEach((t, ti) => {
          let d = ((t.p - prev[li][ti]) % 1 + 1) % 1; if (d > 0.5) d -= 1;
          const spans = Math.abs(d) * Ln;
          R.moved += spans;
          if (t.dw > 0) {
            R.standTime += DT;
            // middle car sits at p - gapP; how far is that from the nearest platform?
            const mid = ((t.p - m.gapP) % 1 + 1) % 1;
            let best = 1;
            for (const i of m.sta) { const a = Math.min(((i / Ln - mid) % 1 + 1) % 1, ((mid - i / Ln) % 1 + 1) % 1); if (a < best) best = a; }
            R.offPlatform.push(best * Ln);
          } else R.movingTime += DT;
          prev[li][ti] = t.p;
        });
        // arrivals: count dwell starts
        // train separation
        if (m.trains.length > 1) {
          for (let a = 0; a < m.trains.length; a++) for (let b = a + 1; b < m.trains.length; b++) {
            const d = Math.abs(m.trains[a].p - m.trains[b].p);
            R.minSep = Math.min(R.minSep, Math.min(d, 1 - d) * Ln);
          }
        }
        const w = watch[li];
        if (w) { const c = cells[idx(w[0], w[1])]; const cap = 3; R.qSeen.add(railQueue(c, cap).q); }
        /* iter 98's law: hold the mean. The OLD draw painted `cap` riders always, so
           `cap` IS the old mean. Compare it to the new time-average over every station. */
        for (const i of S[li]) {
          const [sx, sy] = m.path[i], c = cells[idx(sx, sy)];
          const cap = 1 + (hashCell(sx, sy, seedNum ^ 0x9A55) * 2.4 | 0) - (LITAMT > 0.6 ? 1 : 0);
          R.qSum = (R.qSum || 0) + railQueue(c, cap).q;
          R.capSum = (R.capSum || 0) + cap;
        }
      });
    }
    return lines.map(R => ({
      ...R,
      qSeen: [...R.qSeen].sort(),
      offPlatform: R.offPlatform.length ? Math.max(...R.offPlatform) : null,
      minSep: R.minSep === Infinity ? null : R.minSep,
    }));
  }, { DUR, DT });

  console.log(`\n=== seed ${seed} ===`);
  for (const m of r) {
    if (!m.closed) { console.log(`  line ${m.li}: L=${m.L} (still growing, no trains)`); continue; }
    // standTime/movingTime were accumulated once PER TRAIN per sample, so divide them
    // back out by the train count to get per-train seconds
    const mt = m.movingTime / m.trains, st = m.standTime / m.trains;
    const gs = mt ? m.moved / m.trains / mt : 0;                       // spans/sec while moving
    const lap = m.moved ? (m.L / (m.moved / m.trains / DUR)) : 0;      // sim-seconds per lap
    const standPct = 100 * st / (st + mt);
    const meanOf = v => (m.stations && v) ? (v / (DUR / DT) / m.stations).toFixed(2) : '0';
    console.log(
      `  line ${m.li}: L=${String(m.L).padStart(3)} spans, ${m.stations} stations, ${m.trains} trains\n` +
      `      ground speed while moving : ${gs.toFixed(3)} spans/s     lap ${lap.toFixed(0)}s\n` +
      `      standing                  : ${standPct.toFixed(1)}% of the time\n` +
      `      worst middle-car offset   : ${m.offPlatform === null ? 'n/a (never stood)' : m.offPlatform.toFixed(4) + ' spans from a platform'}\n` +
      `      closest two trains ever   : ${m.minSep === null ? 'n/a (1 train)' : m.minSep.toFixed(2) + ' spans'}\n` +
      `      platform crowd sizes seen : [${m.qSeen.join(', ')}]\n` +
      `      mean riders/platform      : ${meanOf(m.qSum)} (was ${meanOf(m.capSum)}, the flat cap)`
    );
  }
}
console.log(`\npage errors: ${errs.length}${errs.length ? '\n  ' + errs.join('\n  ') : ''}`);
await browser.close();
