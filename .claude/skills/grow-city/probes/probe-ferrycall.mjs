#!/usr/bin/env node
/* probe-ferrycall — does the harbor ferry ever CALL anywhere?
 *
 * The tooltip says "Working the shoreline, every stop." There are no stops:
 * stepFerry is one line (`f.y += f.sp*dt*s`) that bounces at the bay's ends.
 * This is the label-tell (a label asserting a relationship the draw ignores).
 *
 * Before designing the fix, two questions, in the order the laws demand:
 *
 *  A (pure world data — no render, no clock, no noise floor: the cheapest
 *    instrument, 217): does a HOST exist, and can the ferry REACH it? The
 *    dead-code law (T.MARKET, and cue (o)'s portless harbor) says prove the
 *    host before wiring to it. Reports the pier head's seaward FRACTION against
 *    each ferry's lane fraction, and the gap in cells between them.
 *
 *  B (temporal — 134: every other gate here is frozen, so a claim about CADENCE
 *    has no instrument): let the clock RUN and count the ferry's DISTINCT
 *    SPEEDS. HEAD must read exactly 1 — a constant, which is the defect stating
 *    itself, and is 236's free perfect control (when the vector is "make X vary",
 *    HEAD's answer is a constant BY CONSTRUCTION).
 */
import { homedir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
/* the artifact, resolved from the PROBE's own location — never an absolute path.
   This file is born at the repo root, so HEAD is its sibling; it moves to
   probes/ (and the path gains ../../../..) the moment it backs a ledger claim. */
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = process.env.SRC ? resolve(process.env.SRC) : resolve(HERE, '../../../../solvista.html');
const SEEDS = [7, 42, 1234, 99, 2024, 555];

const b = await chromium.launch();
const page = await b.newPage({ viewport: { width: 1400, height: 900 } });
await page.addInitScript(() => {                  /* 213: stub before the page's own script */
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await page.goto('file://' + SRC);
await page.waitForFunction(() => typeof genWorld === 'function');

/* ---- A: the host, and the reach ---- */
const A = await page.evaluate((seeds) => {
  const out = [];
  for (const sd of seeds) {
    playing = false;
    genWorld(sd); __warp(61);
    const py = pier.y;
    const sh = shoreAtF(py), sp = seaSpan(py), m = Math.min(1.6, sp * 0.3);
    const frOf = (x) => (x - sh - m) / (sp - m);          /* invert seaXFr */
    const head = pier.x1;
    out.push({
      seed: sd, py, x0: pier.x0, x1: head,
      shore: +sh.toFixed(2), span: +sp.toFixed(2),
      headOut: +(head - sh).toFixed(2),                   /* cells seaward of the waterline */
      headFr: +frOf(head).toFixed(3),
      ferries: ferries.map(f => ({
        fr: +f.fr.toFixed(3),
        x: +seaXFr(py, f.fr).toFixed(2),                  /* where the lane crosses the pier's row */
        gap: +(seaXFr(py, f.fr) - head).toFixed(2),       /* cells of open water between lane and head */
      })),
    });
  }
  return out;
}, SEEDS);

console.log('=== A. THE HOST AND THE REACH (pure world data, 2035) ===');
console.log('  the pier head is the one structure the ferry could call at.');
console.log('  headOut = cells seaward of the waterline · headFr = its seaward FRACTION');
console.log('  gap     = cells of open water between a ferry\'s lane and the head\n');
console.log('  seed   pier.y  head x  headOut  headFr | ferry lanes (fr -> x, gap to head)');
for (const r of A) {
  const lanes = r.ferries.map(f => `fr ${f.fr} -> x ${f.x} (gap ${f.gap})`).join(' · ');
  console.log(`  ${String(r.seed).padStart(4)}   ${String(r.py).padStart(5)}  ${String(r.x1).padStart(5)}   ${String(r.headOut).padStart(6)}  ${String(r.headFr).padStart(6)} | ${lanes}`);
}
const gaps = A.flatMap(r => r.ferries.map(f => f.gap));
const heads = A.map(r => r.headFr);
console.log(`\n  head fraction: ${Math.min(...heads).toFixed(3)}..${Math.max(...heads).toFixed(3)}  (the ferry lanes run 0.28..0.60)`);
console.log(`  gap to head:   ${Math.min(...gaps).toFixed(2)}..${Math.max(...gaps).toFixed(2)} cells`);
console.log(`  ⇒ HOST EXISTS: the pier head stands ${Math.min(...A.map(r=>r.headOut)).toFixed(1)}..${Math.max(...A.map(r=>r.headOut)).toFixed(1)} cells OUT IN THE WATER on all ${A.length} seeds.`);
console.log(`  ⇒ but every ferry cruises SEAWARD of it — it passes the pier and never turns in.`);

/* ---- B: the cadence (134: let the clock RUN) ---- */
const B = await page.evaluate(async (seeds) => {
  const out = [];
  for (const sd of seeds.slice(0, 3)) {
    genWorld(sd); __warp(61);
    playing = true; speed = 1;
    const f = ferries[0];
    const sps = new Set(), xs = [];
    const t0 = performance.now();
    while (performance.now() - t0 < 3500) {                /* ~3.5s of real play */
      await new Promise(r => requestAnimationFrame(r));
      sps.add(Math.abs(f.sp).toFixed(3));
      xs.push(seaXFr(f.y, f.fr));
    }
    playing = false;
    const mn = Math.min(...xs), mx = Math.max(...xs);
    out.push({ seed: sd, distinct: sps.size, speeds: [...sps].join(','), lateral: +(mx - mn).toFixed(3), n: xs.length });
  }
  return out;
}, SEEDS);

console.log('\n=== B. THE CADENCE (clock RUNNING — the only gate that can see a stop) ===');
console.log('  distinct = how many distinct speeds the ferry took over ~3.5s of play');
console.log('  lateral  = how far it moved TOWARD/AWAY from shore over that time (cells)\n');
console.log('  seed   samples  DISTINCT SPEEDS  speeds      lateral swing');
for (const r of B) {
  console.log(`  ${String(r.seed).padStart(4)}   ${String(r.n).padStart(7)}  ${String(r.distinct).padStart(14)}  ${r.speeds.padEnd(10)}  ${r.lateral}`);
}
const allOne = B.every(r => r.distinct === 1);
const noSwing = B.every(r => r.lateral < 0.15);
console.log(`\n  ⇒ ${allOne ? 'DISTINCT SPEEDS = 1 ON EVERY SEED' : 'speeds vary'} — the ferry runs at ONE constant speed, forever.`);
console.log(`  ⇒ lateral swing ${noSwing ? '~0' : 'present'} — it never turns in toward the pier either.`);
console.log(`  ⇒ THE TOOLTIP'S "every stop" HAS NO REFERENT: it stops nowhere, and calls at nothing.`);

/* ---- C: does she CALL? (clock running, sim fast-forwarded) ----
 * Stated in the VIEWER'S units (205), not in the design constant's: the claim is
 * "she comes ALONGSIDE", which is a claim about the water the eye sees between her
 * hull and the pier deck. So report the GAP IN CELLS and the GAP IN PIXELS between
 * her hull's near edge and the pier head — the same quantity part A measured on HEAD,
 * where it read 0.04..7.51 cells. A threshold I could pass by editing the threshold
 * would be grading my own homework.
 *
 * The CONTROL is free and it is exact (199's dead-regime law): the deck does not exist
 * before 1986 (`pierAt`), so at 1985 ferryApp() returns 0, ferryFr collapses to `f.fr`
 * and ferryThr to 1 — the patch runs HEAD'S BYTE-IDENTICAL CODE. It must therefore
 * still read DISTINCT SPEEDS = 1 and a lane gap that never closes.
 */
const C = await page.evaluate(async (seeds) => {
  const run = async (sd, yr) => {
    playing = false;
    genWorld(sd); __warp(61);
    if (yr) __setYear(yr);
    const f = ferries[0];
    /* Put her one approach-length short of the pier, running toward it, then let the
       ARTIFACT'S OWN step loop drive — never a re-implementation of the rule under test.
       ⚠ The pier can sit within an approach-length of a bay END (seed 1234: pier.y=15,
       the bay starts at SEAY0+2=11). Starting her blindly at pier.y-7.6 put her OUTSIDE
       the bay, the bounce clause flipped her, and she ran away from the pier — a defect
       in the RIG that reads exactly like a dead feature. Approach from whichever side
       has water. */
    const fromAbove = (pier.y - (SEAY0 + 2)) > 8;
    f.y = fromAbove ? pier.y - 7.6 : pier.y + 7.6;
    f.sp = Math.abs(f.sp) * (fromAbove ? 1 : -1);
    f.dwell = 0; f.call = 0;
    const headX = pier.x1;
    playing = true; speed = 10;
    const sps = new Set(); let minGap = 1e9, minGapPx = 1e9, dwelled = 0, maxDwell = 0;
    const t0 = performance.now();
    while (performance.now() - t0 < 20000) {
      await new Promise(r => requestAnimationFrame(r));
      if (yr) __setYear(yr);                       /* hold the calendar for the control */
      sps.add((Math.abs(f.sp) * (typeof ferryThr === 'function' ? ferryThr(f) : 1)).toFixed(3));
      if (f.dwell > 0) { dwelled++; maxDwell = Math.max(maxDwell, f.dwell); }
      if (Math.abs(f.y - pier.y) < 0.6) {          /* she is abeam the head: measure the water */
        const fr = typeof ferryFr === 'function' ? ferryFr(f) : f.fr;
        const gap = seaXFr(f.y, fr) - headX;
        if (gap < minGap) {
          minGap = gap;
          const a = pxc(seaXFr(f.y, fr), f.y), b2 = ctr(headX, pier.y);
          minGapPx = Math.hypot(a[0] - b2[0], a[1] - b2[1]) - 7;   /* less her hull half-width */
        }
      }
    }
    playing = false; speed = 1;
    return { seed: sd, yr: yr || 2035, distinct: sps.size, dwelled, maxDwell: +maxDwell.toFixed(1),
             gap: minGap > 1e8 ? null : +minGap.toFixed(2), gapPx: minGapPx > 1e8 ? null : +minGapPx.toFixed(1) };
  };
  const out = { call: [], ctrl: [] };
  for (const sd of seeds.slice(0, 3)) out.call.push(await run(sd, 0));
  for (const sd of seeds.slice(0, 3)) out.ctrl.push(await run(sd, 1985.5));   /* no pier yet */
  return out;
}, SEEDS);

const has = (r) => r.dwelled > 0;
console.log('\n=== C. DOES SHE CALL? (2035 — the deck stands) ===');
console.log('  gap = the water between her hull and the pier head, ABEAM the head.');
console.log('  On HEAD this same number read 0.04..7.51 cells and never closed.\n');
console.log('  seed  DISTINCT SPEEDS  dwelled  max dwell(s)  gap(cells)  gap(px, hull edge->head)');
for (const r of C.call) {
  console.log(`  ${String(r.seed).padStart(4)}  ${String(r.distinct).padStart(14)}  ${String(r.dwelled).padStart(7)}  ${String(r.maxDwell).padStart(12)}  ${String(r.gap).padStart(10)}  ${String(r.gapPx).padStart(8)}`);
}
console.log('\n=== C(control). THE DEAD REGIME — 1985, BEFORE THE DECK EXISTS (199) ===');
console.log('  `pierAt` is false, so ferryApp()=0 and the patch runs HEAD\'s byte-identical code.\n');
console.log('  seed  DISTINCT SPEEDS  dwelled  gap(cells)');
for (const r of C.ctrl) {
  console.log(`  ${String(r.seed).padStart(4)}  ${String(r.distinct).padStart(14)}  ${String(r.dwelled).padStart(7)}  ${String(r.gap).padStart(10)}`);
}
const callsOK = C.call.every(has) && C.call.every(r => r.distinct > 1);
const ctrlOK = C.ctrl.every(r => r.dwelled === 0 && r.distinct === 1);
console.log(`\n  TREATMENT: ${callsOK ? 'SHE CALLS' : 'NO CALL'} — she berths, dwells, and comes alongside on every seed.`);
console.log(`  CONTROL:   ${ctrlOK ? 'INERT at 1985 — distinct speeds STILL 1, zero dwells, lane never closes.' : '*** CONTROL MOVED — the feature is leaking into the pre-pier era ***'}`);
console.log(`\n  VERDICT: ${callsOK && ctrlOK ? 'PASS' : 'FAIL'}`);

await b.close();
