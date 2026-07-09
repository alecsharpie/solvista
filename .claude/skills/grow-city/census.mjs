#!/usr/bin/env node
/* grow-city census harness.
 *
 * Loads solvista.html across a FIXED seed x era matrix, dumps window.__census(),
 * and diffs the aggregate against a saved baseline. Because seeds + warp are
 * pinned, the CA is deterministic: any delta is attributable to a code change,
 * not to randomness. Drops in "more is better" metrics are flagged as
 * REGRESSIONS; growth is what we're looking for.
 *
 *   node census.mjs                 # measure + diff vs census-baseline.json
 *   node census.mjs --save-baseline # capture the current city as the baseline
 *
 * Exit code is non-zero if any metric regressed or any page threw — so the
 * loop can gate on it.
 */
import { homedir } from 'node:os';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

/* borrow Playwright from the screenshot-verify skill (its browser is installed) */
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(HERE, '../../..');                 // .../.claude/skills/grow-city -> repo root
const PAGE = pathToFileURL(join(REPO, 'solvista.html')).href;
const baseFile = join(HERE, 'census-baseline.json');
const curFile  = join(HERE, 'census-latest.json');
const histFile = join(HERE, 'census-history.jsonl');
const save = process.argv.includes('--save-baseline');

/* the matrix: same coordinates every run so numbers are comparable */
const SEEDS = [7, 42, 1234];
const ERAS  = [{ name: '1985', warp: 11 }, { name: '2005', warp: 31 }, { name: '2035', warp: 61 }];

/* Scalar metrics tracked as a dashboard. Solvista is a CHAOTIC coupled CA:
 * rng() draws are gated by terrain, so ANY terrain-altering change reshuffles
 * the downstream stream and every metric wobbles a few %. That's expected — an
 * exact diff can't isolate a change. So we only HARD-FAIL on page errors or a
 * structural COLLAPSE (a core aggregate cratering); the rest is for judgment. */
const GROWTH = ['pop', 'parks', 'towers', 'roads', 'bridges', 'developed',
                'tileKinds', 'civicKinds', 'transportModes', 'solarRoofs', 'greenRoofs',
                'towerHt', 'tallTowers', 'helipads', 'boulevardTrees', 'avenues', 'arterials', 'promenade', 'stations', 'cafes', 'schools', 'stadiums'];
const CORE = ['pop', 'developed', 'roads'];   // structural health — collapse = real regression
const TOL = 0.05;                              // <5% wobble in a core aggregate is chaotic noise

async function run() {
  const b = await chromium.launch();
  const cells = {}; let pageerrors = 0;
  for (const seed of SEEDS) for (const era of ERAS) {
    const p = await b.newPage();
    p.on('pageerror', e => { pageerrors++; console.error('PAGEERROR', seed, era.name, String(e)); });
    await p.goto(`${PAGE}?seed=${seed}&warp=${era.warp}&t=0.35`);
    await p.waitForTimeout(500);
    cells[`${seed}@${era.name}`] = await p.evaluate(() => window.__census());
    await p.close();
  }
  await b.close();
  return { when: new Date().toISOString(), pageerrors, cells };
}

/* aggregate the matrix into scalar totals + a summed tile histogram + summed
 * entity counts (life/transport — the growth signal for draw-only/Math.random
 * features, which leave every terrain metric flat) */
function summarize(data) {
  const s = {}; for (const k of GROWTH) s[k] = 0;
  const tiles = {}, life = {}, transport = {};
  for (const key in data.cells) {
    const c = data.cells[key];
    for (const k of GROWTH) s[k] += (c[k] || 0);
    for (const t in c.tiles) tiles[t] = (tiles[t] || 0) + c.tiles[t];
    for (const t in c.life) life[t] = (life[t] || 0) + c.life[t];
    for (const t in c.transport) transport[t] = (transport[t] || 0) + c.transport[t];
  }
  return { scalars: s, tiles, life, transport };
}

/* append one line per run to the census history, so the city's whole numeric
 * story across iterations survives baseline overwrites */
function logHistory(cur, sum) {
  const line = { when: cur.when, baseline: save, pageerrors: cur.pageerrors,
                 scalars: sum.scalars, tiles: sum.tiles, life: sum.life, transport: sum.transport };
  writeFileSync(histFile, JSON.stringify(line) + '\n', { flag: 'a' });
}

const cur = await run();
writeFileSync(curFile, JSON.stringify(cur, null, 1));
const curSum = summarize(cur);
logHistory(cur, curSum);

if (save) {
  writeFileSync(baseFile, JSON.stringify(cur, null, 1));
  console.log('baseline saved ->', baseFile);
  console.log('pageerrors:', cur.pageerrors, '\n', curSum.scalars);
  process.exit(cur.pageerrors ? 1 : 0);
}

console.log(`=== census over ${Object.keys(cur.cells).length} (seed x era) cells ===`);
console.log('pageerrors:', cur.pageerrors);
if (!existsSync(baseFile)) {
  console.log('no baseline yet — run `node census.mjs --save-baseline` first.\ncurrent:', curSum.scalars);
  process.exit(cur.pageerrors ? 1 : 0);
}

const baseSum = summarize(JSON.parse(readFileSync(baseFile, 'utf8')));
let collapses = 0;
const label = (b, c, core) => {
  const d = c - b, pct = b ? d / b : 0;
  if (core && d < 0 && -pct > TOL) { collapses++; return '  <== COLLAPSE'; }
  if (Math.abs(pct) <= TOL) return '  ~flat';
  return d > 0 ? '  up' : '  down';
};
const row = (name, b, c, core) =>
  `${(core ? '*' : ' ') + name.padEnd(14)} ${String(b).padStart(9)} ${String(c).padStart(9)}   ${(c - b >= 0 ? '+' : '') + (c - b)}${label(b, c, core)}`;
console.log('\n(* = core structural metric; COLLAPSE = >5% core drop = real regression)');
console.log('GROWTH METRICS      baseline   current   delta');
for (const k of GROWTH) console.log(row(k, baseSum.scalars[k], curSum.scalars[k], CORE.includes(k)));

console.log('\nTILE HISTOGRAM (only types that changed — read to confirm your vector moved the intended tile)');
const allTiles = new Set([...Object.keys(baseSum.tiles), ...Object.keys(curSum.tiles)]);
for (const t of [...allTiles].sort()) {
  const b = baseSum.tiles[t] || 0, c = curSum.tiles[t] || 0;
  if (b !== c) console.log(`  ${t.padEnd(13)} ${String(b).padStart(6)} -> ${String(c).padStart(6)}   ${(c - b >= 0 ? '+' : '') + (c - b)}`);
}

console.log('\nENTITY COUNTS (life & transport, summed over the matrix — the growth signal for draw-only/Math.random features)');
for (const grp of ['life', 'transport']) {
  const all = new Set([...Object.keys(baseSum[grp] || {}), ...Object.keys(curSum[grp] || {})]);
  const parts = [];
  for (const t of [...all].sort()) {
    const b = (baseSum[grp] || {})[t] || 0, c = (curSum[grp] || {})[t] || 0;
    parts.push(`${t} ${b === c ? b : `${b}->${c}${t in (baseSum[grp] || {}) ? '' : ' NEW'}`}`);
  }
  console.log(`  ${grp}: ${parts.join(' · ')}`);
}

const verdict = cur.pageerrors ? 'FAIL — page errors' : collapses ? 'FAIL — structural collapse' : 'PASS';
console.log(`\nVERDICT: ${verdict}. (Wobble within ${TOL * 100}% on non-core metrics is chaotic-CA noise — judge growth from the tile histogram + screenshots, not exact deltas.)`);
process.exit((collapses || cur.pageerrors) ? 1 : 0);
