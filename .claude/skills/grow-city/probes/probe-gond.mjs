#!/usr/bin/env node
/* Iter 121 probe: does a cable car behave like a cable car? (cue (h), banked by iter 112)
 *
 * Iter 112 proved the monorail's `p += k*dt` made GROUND speed proportional to loop
 * length, and measured -- but did not fix -- the same defect on the gondola. This is
 * the instrument that grades it. Same shape as probe-train.mjs: freeze `playing`,
 * drive sim time with __step() (deterministic, s=1, no rAF), sample `cb.p`.
 *
 * `cb.p` in [0,1) is a ROUND TRIP over a ping-pong line, so one p-unit = 2*(L-1) spans.
 *
 * Per line, five questions no screenshot and no census can answer:
 *   1. CRUISE GROUND SPEED (spans/sec) -- proportional to line length before the fix,
 *      near-constant across lines after it. This is the headline: the SPREAD across
 *      lines, not any one line's value.
 *   2. Round-trip time, and how much of it is spent standing.
 *   3. Do the cabins DWELL at the terminals, and only at the terminals?
 *   4. Is the easing sane -- i.e. does the cabin actually reach cruise speed mid-span
 *      rather than crawling on its floor value the whole way (112's divergent-ramp trap)?
 *   5. Do the two cabins on a line drift together over a long run? (a dwell is a time
 *      delay; if it is applied per-cabin it must not let them merge)
 *
 * Run it against whatever solvista.html is on disk -- A/B two live builds, never a stash.
 */
import { homedir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '../../..');
const PAGE = pathToFileURL(join(ROOT, process.env.FILE || 'solvista.html')).href;

const SEEDS = [7, 42, 1234];
const DUR = +(process.env.DUR || 300), DT = 0.05;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
page.on('pageerror', e => errs.push(String(e)));

const rows = [];
for (const seed of SEEDS) {
  await page.goto(`${PAGE}?seed=${seed}&warp=61&t=0.35`, { waitUntil: 'load' });
  await page.waitForTimeout(600);
  await page.evaluate(() => { playing = false; });

  const r = await page.evaluate(({ DUR, DT }) => {
    const live = gonds.filter(g => g.path && g.path.length > 1);
    const st = live.map(g => ({
      spans: g.path.length - 1,
      h: g.h,
      cabs: g.cabins.length,
      prev: g.cabins.map(cb => cb.p),
      spd: g.cabins.map(() => []),   // ground speed samples, spans/sec
      turns: [],                     // sim-times at which a cabin crossed a terminal
      standT: 0, moveT: 0,
      atTermStand: 0, midStand: 0,   // standing samples at a terminal vs mid-line
      minSep: Infinity,              // closest the two cabins ever come, in spans
      sepFirst: null, sepLast: null, // cabin separation early vs late (drift check)
    }));
    // p-distance to the nearer of the two terminals (p=0 and p=0.5)
    const termD = p => { const h = ((p % 0.5) + 0.5) % 0.5; return Math.min(h, 0.5 - h); };
    // position along the path in spans (0..spans), from the round-trip parameter
    const fOf = (p, spans) => (p < 0.5 ? p * 2 : 2 - p * 2) * spans;

    for (let t = 0; t < DUR; t += DT) {
      window.__step(DT);
      live.forEach((g, i) => {
        const s = st[i], spans = s.spans;
        g.cabins.forEach((cb, ci) => {
          let d = cb.p - s.prev[ci];
          if (d < -0.5) d += 1;                      // wrapped past p=1
          const moved = Math.abs(d) * 2 * spans;     // spans travelled this sample
          const v = moved / DT;
          if (moved > 1e-7) { s.moveT += DT; s.spd[ci].push(v); }
          else {
            s.standT += DT;
            if (termD(cb.p) < 1e-6) s.atTermStand += DT; else s.midStand += DT;
          }
          // terminal crossings: p passes 0 or 0.5
          const a = Math.floor(s.prev[ci] / 0.5), b = Math.floor(cb.p / 0.5);
          if (b !== a || d < -0.5) s.turns.push(t);
          s.prev[ci] = cb.p;
        });
        if (g.cabins.length === 2) {
          const sep = Math.abs(fOf(g.cabins[0].p, spans) - fOf(g.cabins[1].p, spans));
          if (sep < s.minSep) s.minSep = sep;
          if (t < 20) s.sepFirst = sep;
          if (t > DUR - 20 && s.sepLast === null) s.sepLast = sep;
        }
      });
    }
    return st.map(s => {
      const all = s.spd.flat().sort((a, b) => a - b);
      const q = f => all.length ? all[Math.min(all.length - 1, Math.floor(f * all.length))] : 0;
      // a round trip = 2 terminal crossings, per cabin
      const perCab = s.turns.length / s.cabs;
      return {
        spans: s.spans, cabs: s.cabs,
        cruise: q(0.90),                       // spans/sec at cruise
        floor: q(0.02),
        mean: all.length ? all.reduce((a, b) => a + b, 0) / all.length : 0,
        roundTrip: perCab > 0.5 ? (DUR / (perCab / 2)) : NaN,
        standPct: 100 * s.standT / (s.standT + s.moveT),
        standAtTerm: s.atTermStand, standMid: s.midStand,
        minSep: s.minSep === Infinity ? NaN : s.minSep,
        sepFirst: s.sepFirst, sepLast: s.sepLast,
      };
    });
  }, { DUR, DT });

  r.forEach((x, li) => rows.push({ seed, line: li + 1, ...x }));
}
await browser.close();

const f = (v, d = 2) => (Number.isFinite(v) ? v.toFixed(d) : '  --');
console.log(`\nFILE=${process.env.FILE || 'solvista.html'}   ${DUR}s sim, dt=${DT}\n`);
console.log('seed  line  spans  cruise  floor   mean   roundTrip  stand%  standTerm/Mid   minSep  sep(early->late)');
for (const r of rows)
  console.log(
    `${String(r.seed).padStart(4)}  ${String(r.line).padStart(4)}  ${String(r.spans).padStart(5)}  ` +
    `${f(r.cruise)}    ${f(r.floor)}   ${f(r.mean)}   ${f(r.roundTrip, 1).padStart(7)}s   ` +
    `${f(r.standPct, 1).padStart(5)}%   ${f(r.standAtTerm, 1)}/${f(r.standMid, 1)}   ` +
    `${f(r.minSep)}    ${f(r.sepFirst)} -> ${f(r.sepLast)}`);

const cr = rows.map(r => r.cruise);
const lo = Math.min(...cr), hi = Math.max(...cr);
console.log(`\nCRUISE SPEED across ${rows.length} lines: ${lo.toFixed(3)} .. ${hi.toFixed(3)} spans/s` +
  `  (spread ${(hi / lo).toFixed(2)}x)   <-- this is cue (h)`);
const midStand = rows.reduce((a, r) => a + r.standMid, 0);
console.log(`standing anywhere but a terminal: ${midStand.toFixed(1)} sim-seconds (must be 0)`);
if (errs.length) { console.log('PAGE ERRORS:', errs); process.exit(1); }
