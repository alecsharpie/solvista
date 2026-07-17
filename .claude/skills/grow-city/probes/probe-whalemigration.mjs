#!/usr/bin/env node
/* probe-whalemigration.mjs — DO THE GRAY WHALES ANSWER THE MIGRATION CALENDAR?
 *
 * `drawWhale` (L9026) opened with no season gate at all: two whales are Math.random-
 * spawned once in genWorld and drawn on EVERY frame of the artifact's life, all year
 * round, while the tooltip calls them "Gray whale ... a slow cruise up the bay." A gray
 * whale is a MIGRANT: it runs the California coast south through winter and north again
 * through spring, then feeds far to the north from June and is gone. The resident dolphins
 * (rightly) roll through year-round; the whales, wrongly, did too.
 *
 * This is the 286/271/249 pattern (make an entity answer an existing signal), in the
 * neglected Water domain. The fix gates the DRAW on whaleSeason() > w.ph/7 (a per-whale
 * threshold off the phase the whale already carries — zero new random draws, so the
 * seeded stream and every other entity are byte-identical, 286). A hidden whale returns
 * before stamp(), so it is not hoverable either.
 *
 * PART A — TEMPORAL (134): season sweep, NO PIXELS, so no noise floor at all. Counts the
 *   whales the SHIPPED predicate makes eligible (whaleSeason() > w.ph/7 — the real rule,
 *   not a re-implementation, 249). HEAD has no whaleSeason ⇒ all whales eligible in every
 *   season ⇒ `DISTINCT COUNTS = 1`, the defect stated with no threshold invented (236).
 *   THE MUST-NOT-MOVE CONTROL (250) IS THE DOLPHINS: resident, no season gate, so their
 *   drawn count must be FLAT across the calendar. A count going DOWN needs one held UP.
 *
 * PART B — THE REAL DRAW PATH (205, not my own units): render the frozen frame at a sweep
 *   of surface-arc phases (waveT) and count the whales the frame actually STAMPS. Union
 *   over the arc samples = the whales that surface AND are in season = seasonal presence
 *   measured through drawWhale itself. Dolphins counted the same way as the control.
 *
 * Whales/dolphins are Math.random-spawned, so the PRNG is stubbed in addInitScript (213)
 * and flooded (?flood=) so the counts are statistically meaningful.
 */
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = existsSync(join(HERE, 'solvista.html')) ? join(HERE, 'solvista.html')
                                                     : join(HERE, '../../../../solvista.html');
const SRC = process.env.SRC || ROOT;
const PAGE = pathToFileURL(SRC).href + '?flood=whales:40,dolphins:40';

const SEEDS = [7, 42, 1234];
const WARP = 61;                 /* 2035 */
const SEASONS = [['winter ', 2035.02], ['spring ', 2035.28], ['l.sprg ', 2035.40],
                 ['summer ', 2035.62], ['autumn ', 2035.87], ['e.wint ', 2035.94]];

console.log(`\nartifact: ${SRC}\n`);

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
await p.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await p.goto(PAGE);
await p.waitForFunction(() => typeof window.__warp === 'function');

/* ─── PART A ── temporal: does the offing empty in summer? ─────────────────────── */
console.log('PART A — season sweep, eligible whales (SHIPPED predicate), no pixels.  2035');
console.log('         whales ON / 40  |  dolphins ON (MUST NOT MOVE: resident, year-round)');

const A = [];
for (const seed of SEEDS) {
  const r = await p.evaluate(({ seed, warp, seasons }) => {
    playing = false;
    genWorld(seed); __warp(warp);
    const hasNew = typeof whaleSeason === 'function';
    /* build-agnostic: the patch's OWN predicate if it exists, else HEAD's (no gate). */
    const whaleOn = w => hasNew ? (whaleSeason() > w.ph / 7) : true;
    const rows = [];
    for (const [name, yr] of seasons) {
      __setYear(yr);
      rows.push({ name, wh: whales.filter(whaleOn).length, dol: dolphins.length, ws: hasNew ? Math.round(whaleSeason() * 100) / 100 : 1 });
    }
    return { hasNew, whales: whales.length, dolphins: dolphins.length, rows,
      distinct: new Set(rows.map(r => r.wh)).size };
  }, { seed, warp: WARP, seasons: SEASONS });
  A.push({ seed, ...r });
  const cells = r.rows.map(x => `${x.name.trim()} ${String(x.wh).padStart(2)}`).join(' | ');
  console.log(`  seed ${String(seed).padStart(4)}  ${cells}   DISTINCT ${r.distinct}  (dolphins ${r.dolphins}, flat)`);
}
console.log(`  build: ${A[0].hasNew ? 'PATCH (whaleSeason present)' : 'HEAD (no gate — DISTINCT should be 1)'}`);

/* ─── PART B ── the real draw path: whales the frame actually STAMPS ────────────── */
console.log('\nPART B — through drawWhale itself: whales STAMPED across the surface-arc, per season');
console.log('         (union over 24 arc phases = surface AND in-season)  |  dolphins STAMPED (control)');
for (const seed of [7, 42]) {
  const r = await p.evaluate(({ seed, warp, seasons }) => {
    playing = false;
    genWorld(seed); __warp(warp); __setTime(0.42);           /* daylight, whales visible */
    const drawnUnion = (arr, yr) => {
      __setYear(yr);
      const seen = new Set();
      for (let k = 0; k < 24; k++) {
        waveT = k * 0.9;
        for (const e of arr) e._sf = -999;
        render();
        for (let i = 0; i < arr.length; i++) if (arr[i]._sf !== -999) seen.add(i);
      }
      return seen.size;
    };
    return seasons.map(([name, yr]) => ({ name, wh: drawnUnion(whales, yr), dol: drawnUnion(dolphins, yr) }));
  }, { seed, warp: WARP, seasons: SEASONS });
  const cells = r.map(x => `${x.name.trim()} ${String(x.wh).padStart(2)}/${x.dol}`).join(' | ');
  console.log(`  seed ${String(seed).padStart(4)}  ${cells}   (whale/dolphin drawn)`);
}

await b.close();
