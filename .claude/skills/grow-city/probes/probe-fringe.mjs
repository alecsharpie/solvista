#!/usr/bin/env node
/* probe-fringe.mjs — DOES THE CITY HAVE A FRINGE, or does it run to the rim?
 *
 * Iter 232's step-back. Both visual agents, blind, on two different seeds,
 * independently reported the same thing, unprompted:
 *
 *   seed 42: "the far (upper) edge of the city terminates in an abrupt flat line
 *             of buildings with no suburban fade — the city ends rather than
 *             trails off."
 *   seed  7: "the city has no hinterland left. Building density runs edge-to-edge
 *             right up to the dune line; there's no fringe, no thinning, no hills
 *             or open country. Compounding has filled every hex."
 *
 * Per 212's law an aside two agents reach independently, on different seeds,
 * outranks either one's verdict — and per 108/120 a FAIL (or an aside) is a cue
 * to MEASURE, never to redesign on their say-so.
 *
 * The claim is about DENSITY vs DISTANCE-FROM-THE-RIM, so it is answerable from
 * pure world data: no canvas, no clock, no Math.random to stub, no noise floor.
 * (The cheapest probe class in the harness — probe-skyline's method.)
 *
 * The plate is a HEXAGON of HEXR=33 rings about CTRX/CTRY (NOT the CBD — the CBD
 * is the city's centre, the plate's centre is a different point). So define
 *
 *     rim = HEXR - hexDist(x, y, CTRX, CTRY)        rim 0 = the outermost ring
 *
 * and report, per rim band, the share of LIVE LAND that is DEVELOPED, plus the
 * tile mix. A city with a hinterland thins toward the rim: developed share falls
 * and FOREST/MEADOW/FARM rise. A city with no fringe stays developed to the last
 * hex, and the diorama's edge is then a wall of buildings against the void.
 *
 * WATER is excluded from the denominator throughout — a rim band that is mostly
 * sea is not "undeveloped countryside", and counting it as such would manufacture
 * a fringe that is not there (the seaward rim would always look green).
 *
 *   node probe-fringe.mjs
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(join(HERE, 'solvista.html')).href;

const SEEDS = [7, 42, 1234, 99, 2024, 555];
const WARP = 61;
/* bands of distance INWARD from the plate rim */
const BANDS = [[0, 2], [3, 5], [6, 8], [9, 12], [13, 17], [18, 33]];

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
await p.addInitScript(() => {                       /* 213: stub before the page's own script */
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});

const rows = [];
for (const seed of SEEDS) {
  await p.goto(`${PAGE}?seed=${seed}&warp=${WARP}&t=0.30`);
  await p.waitForTimeout(300);

  const r = await p.evaluate(({ BANDS, seed, WARP }) => {
    playing = false;
    genWorld(seed);                                 /* 163(c): byte-identical world */
    __warp(WARP);

    const bandOf = d => BANDS.findIndex(([lo, hi]) => d >= lo && d <= hi);
    const bins = BANDS.map(() => ({ land: 0, dev: 0, wild: 0, water: 0 }));
    /* "wild" = the hinterland tiles a fringe would be made of */
    const WILD = new Set([T.FOREST, T.MEADOW, T.FARM, T.FIELD, T.ORCHARD,
                          T.VINEYARD, T.REDWOOD, T.EMPTY]);

    for (const i of HEXI) {
      const x = i % G, y = (i / G) | 0;
      const c = cells[i]; if (!c) continue;
      const rim = HEXR - hexDist(x, y, CTRX, CTRY);
      const bi = bandOf(rim); if (bi < 0) continue;
      const B = bins[bi];
      if (WETSET.has(c.t)) { B.water++; continue; } /* sea is not countryside */
      B.land++;
      if (DEV.has(c.t)) B.dev++;
      else if (WILD.has(c.t)) B.wild++;
    }
    return { bins, cbd: [CBDX, CBDY], ctr: [CTRX, CTRY], hexr: HEXR };
  }, { BANDS, seed, WARP });

  rows.push({ seed, ...r });
}
await b.close();

console.log('\nDOES THE CITY HAVE A FRINGE?  developed share of LAND, by distance INWARD from the plate rim');
console.log('pure world data (no render); genWorld + warp 61; sea excluded from the denominator');
console.log(`seeds ${SEEDS.join('/')}\n`);

const label = i => { const [lo, hi] = BANDS[i]; return i === 0 ? `rim ${lo}-${hi}` : `${lo}-${hi}`; };

/* per-seed developed share, then the mean */
const hdr = BANDS.map((_, i) => label(i).padStart(9)).join('');
console.log('  DEVELOPED % OF LAND');
console.log('  seed    ' + hdr);
console.log('  ' + '-'.repeat(10 + 9 * BANDS.length));
const meanDev = BANDS.map(() => []);
for (const r of rows) {
  const cells = r.bins.map((B, i) => {
    const pct = B.land ? (100 * B.dev / B.land) : NaN;
    if (!isNaN(pct)) meanDev[i].push(pct);
    return (isNaN(pct) ? '   --' : pct.toFixed(1)).padStart(9);
  }).join('');
  console.log(`  ${String(r.seed).padEnd(8)}${cells}`);
}
const mean = a => a.length ? a.reduce((x, y) => x + y, 0) / a.length : NaN;
console.log('  ' + '-'.repeat(10 + 9 * BANDS.length));
console.log('  MEAN    ' + meanDev.map(a => mean(a).toFixed(1).padStart(9)).join(''));

console.log('\n  WILD (forest/meadow/farm/orchard/vineyard/redwood/empty) % OF LAND');
console.log('  seed    ' + hdr);
console.log('  ' + '-'.repeat(10 + 9 * BANDS.length));
const meanWild = BANDS.map(() => []);
for (const r of rows) {
  const cells = r.bins.map((B, i) => {
    const pct = B.land ? (100 * B.wild / B.land) : NaN;
    if (!isNaN(pct)) meanWild[i].push(pct);
    return (isNaN(pct) ? '   --' : pct.toFixed(1)).padStart(9);
  }).join('');
  console.log(`  ${String(r.seed).padEnd(8)}${cells}`);
}
console.log('  ' + '-'.repeat(10 + 9 * BANDS.length));
console.log('  MEAN    ' + meanWild.map(a => mean(a).toFixed(1).padStart(9)).join(''));

const rimDev = mean(meanDev[0]), coreDev = mean(meanDev[meanDev.length - 1]);
console.log(`\n  VERDICT: developed share at the RIM = ${rimDev.toFixed(1)}%  vs  deep interior = ${coreDev.toFixed(1)}%`);
console.log(`           taper = ${(coreDev - rimDev).toFixed(1)} points.`);
console.log('           A city with a hinterland thins toward the rim (large positive taper,');
console.log('           WILD rising to meet it). A city with no fringe stays built to the last hex.\n');
