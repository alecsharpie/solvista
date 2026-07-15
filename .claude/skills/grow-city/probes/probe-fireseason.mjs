#!/usr/bin/env node
/* probe-fireseason.mjs — does the "dry-season lightning" actually pick the dry season?
 *
 * The claim is about the CALENDAR (TEMPORAL, 134): every other gate here is frozen.
 * The forest spark is `hashCell(x,y,seedNum^0xF12E^TICKN) < FIRESPK*fireSeason()`,
 * evaluated once per forest hex per tick. HEAD's fireSeason() does not exist and the
 * threshold is a flat FIRESPK, so HEAD's ignition rate is CONSTANT across the year —
 * that is the defect, stated (236), needing no threshold.
 *
 * PART A — the EXPECTED ignition rate per season, read from the artifact's OWN
 * hashCell / FIRESPK / fireSeason over the artifact's OWN frozen forest set, sampled
 * across TICKN. Deterministic, no pixels, no noise floor, instant. It mirrors only
 * the `<` and the salt; every value in the comparison is the page's own.
 * BUILD-AGNOSTIC (262): fireSeason() is read if present, else 1, so ONE file grades
 * HEAD (flat) and the patch (peaked) — SRC=<path> points at pristine HEAD.
 *
 * PART B — a light confirmation that the REAL tick() concentrates fire in the dry
 * season: it drives the artifact's own tick() (never a re-implementation) at the dry
 * peak vs the wet trough and counts real forest ignitions.
 *
 * THE MUST-HOLD COLUMN (245/98): the lever is CENTRED on seasonCool()'s mean (0.5),
 * so the ANNUAL MEAN of fireSeason() is EXACTLY 1 and the whole-year ignition total is
 * held — the dry season burns more only because the wet season burns exactly as much
 * less. Part A prints the year-mean rate; it must match HEAD's flat rate.
 *
 * Pinned ~2015: post-2000 (no logging => forest host stable) and pre-2030 (forest
 * spark live). All ignitions are the FOREST spark; the timber spark is year<2006.
 *
 *   node probe-fireseason.mjs                       # the patch
 *   SRC=/tmp/head.html node probe-fireseason.mjs    # pristine HEAD
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = process.env.SRC || join(HERE, '../../../../solvista.html');
const PAGE = pathToFileURL(SRC).href;

const SEEDS = [7, 42, 1234];
const PHASES = [0.02, 0.12, 0.25, 0.37, 0.50, 0.62, 0.75, 0.87]; /* wet thaw … DRY PEAK … autumn */
const SAMPLES = 400;      /* TICKN samples per phase for the expected-rate estimate */
const BTICKS = 1200;      /* real-tick() confirmation budget */

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
await p.addInitScript(() => {                       /* 213: stub the PRNG before the page's script */
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await p.goto(`${PAGE}?seed=7&warp=1`);
await p.waitForTimeout(200);

const rows = [];
for (const seed of SEEDS) {
  const r = await p.evaluate(({ seed, PHASES, SAMPLES, BTICKS }) => {
    playing = false;
    const fs = () => (typeof fireSeason === 'function' ? fireSeason() : 1);

    // ---- Part A: expected ignitions/tick per season, from the artifact's own predicate
    genWorld(seed); __warp(41);                    // ~2015
    const base = Math.floor(year);
    const forest = HEXI.filter(i => cells[i].t === T.FOREST);
    const perPhase = {};
    for (const ph of PHASES) {
      __setYear(base + ph);
      const seasonFs = fs();
      let hits = 0;
      for (let tk = 0; tk < SAMPLES; tk++) {
        const salt = (seedNum ^ 0xF12E ^ tk) >>> 0;
        for (const i of forest) {
          const x = i % G, y = (i / G) | 0;
          if (hashCell(x, y, salt) < FIRESPK * seasonFs) hits++;
        }
      }
      perPhase[ph] = { fs: +seasonFs.toFixed(3), rate: +(hits / SAMPLES).toFixed(3) };
    }

    // ---- Part B: real tick() at dry peak vs wet trough (drives the actual rule)
    const runReal = (ph) => {
      genWorld(seed); __warp(41);
      const by = Math.floor(year) + ph; __setYear(by);
      const prev = new Int8Array(cells.length);
      let ign = 0;
      for (let t = 0; t < BTICKS; t++) {
        for (let i = 0; i < cells.length; i++) prev[i] = cells[i].fire;
        tick(); __setYear(by);
        for (const i of HEXI) { const c = cells[i]; if (c.fire === 4 && prev[i] === 0 && c.t === T.FOREST) ign++; }
      }
      return ign;
    };
    const realDry = runReal(0.62), realWet = runReal(0.12);

    return { forest: forest.length, perPhase, realDry, realWet };
  }, { seed, PHASES, SAMPLES, BTICKS });
  rows.push({ seed, ...r });
}
await b.close();

const pad = (s, n) => String(s).padStart(n);
console.log(`\n  source: ${SRC}`);
console.log(`  Part A: expected forest ignitions/tick per season (artifact's own hashCell·FIRESPK·fireSeason)`);
console.log(`  Part B: real tick() forest ignitions over ${BTICKS} ticks, dry peak vs wet trough\n`);

console.log('  A. fireSeason() multiplier by season:');
console.log('  seed |' + PHASES.map(ph => pad(ph.toFixed(2), 7)).join('') + '   year-mean');
for (const r of rows) {
  const fss = PHASES.map(ph => r.perPhase[ph].fs);
  const mean = (fss.reduce((a, v) => a + v, 0) / fss.length).toFixed(3);
  console.log('  ' + pad(r.seed, 4) + ' |' + fss.map(v => pad(v.toFixed(2), 7)).join('') + pad(mean, 12));
}

console.log('\n  A. expected ignitions/tick by season (x1000):');
console.log('  seed |' + PHASES.map(ph => pad(ph.toFixed(2), 7)).join('') + ' |  dry/wet   year-mean(x1000)');
for (const r of rows) {
  const rr = PHASES.map(ph => r.perPhase[ph].rate * 1000);
  const dry = r.perPhase[0.62].rate, wet = r.perPhase[0.12].rate;
  const ratio = wet > 0 ? (dry / wet).toFixed(2) : (dry > 0 ? '∞' : '—');
  const mean = (rr.reduce((a, v) => a + v, 0) / rr.length).toFixed(2);
  console.log('  ' + pad(r.seed, 4) + ' |' + rr.map(v => pad(v.toFixed(2), 7)).join('') + ' |' + pad(ratio, 8) + pad(mean, 12));
}

console.log('\n  B. REAL tick() forest ignitions (drives the actual rule):');
console.log('  seed |  dry peak (0.62)   wet trough (0.12)   dry/wet');
for (const r of rows) {
  const ratio = r.realWet > 0 ? (r.realDry / r.realWet).toFixed(2) : (r.realDry > 0 ? '∞' : '—');
  console.log('  ' + pad(r.seed, 4) + ' |' + pad(r.realDry, 15) + pad(r.realWet, 19) + pad(ratio, 11));
}
console.log('');
