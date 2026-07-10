#!/usr/bin/env node
/* Shape probe for cue (e): "the towers are strung along the top edge rather
 * than massing into one skyline."  Centroid-free, so it reads the same on HEAD
 * and on a candidate — the honest before/after test for a massing claim, the
 * way a union-find patch count is the honest test of a Connect claim (iter 88).
 *
 *   node probe-core.mjs [seed ...]
 *
 * Reports, per seed at 2035:
 *   towers   how many (guard: a "massing" win that costs towers costs pop)
 *   spread   mean pairwise hex distance between towers. LOWER = more massed.
 *   peak     max towers within 4 hexes of any one tower. HIGHER = a real core.
 *   core%    share of towers within 8 hexes of that densest disc.
 *   tallest  height of the tallest tower, and its distance from the disc centre
 *            (a skyline peaks AT the core, not out on the rim).
 */
import { homedir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(join(resolve(HERE, '../../..'), 'solvista.html')).href;

const seeds = process.argv.slice(2).filter(a => !a.startsWith('-')).map(Number);
const SEEDS = seeds.length ? seeds : [7, 42, 1234];

const b = await chromium.launch();
const rows = [];
for (const seed of SEEDS) {
  const p = await b.newPage();
  p.on('pageerror', e => console.error('PAGEERROR', seed, String(e)));
  await p.goto(`${PAGE}?seed=${seed}&warp=61&t=0.35`);
  await p.waitForTimeout(400);
  rows.push(await p.evaluate(() => {
    /* bare names: top-level const/let live in the lexical env, not on window */
    const ts = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cellAt(x, y);
      if (c && c.t === T.TOWER) ts.push({ x, y, h: c.h });
    }
    const n = ts.length;
    if (n < 2) return { n, spread: 0, peak: 0, coreShare: 0, tallest: 0, tallD: 0, discD: 0, hNear: 0, hFar: 0 };

    let sum = 0, pairs = 0;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
      sum += hexDist(ts[i].x, ts[i].y, ts[j].x, ts[j].y); pairs++;
    }
    const spread = sum / pairs;

    /* densest radius-4 disc, centred on a tower */
    let peak = 0, best = ts[0];
    for (const a of ts) {
      let k = 0;
      for (const c of ts) if (hexDist(a.x, a.y, c.x, c.y) <= 4) k++;
      if (k > peak) { peak = k; best = a; }
    }
    const coreShare = ts.filter(c => hexDist(best.x, best.y, c.x, c.y) <= 8).length / n;

    let tall = ts[0];
    for (const c of ts) if (c.h > tall.h) tall = c;

    /* Anchor on the CBD, not on the densest disc. Disc-relative stats are
       self-referential: they cannot see a city whose tall spot and dense spot
       are in DIFFERENT places, which is exactly the failure mode of shaping
       height without shaping siting (seed 42). */
    const near = ts.filter(c => hexDist(CBDX, CBDY, c.x, c.y) <= 8);
    const far = ts.filter(c => hexDist(CBDX, CBDY, c.x, c.y) > 8);
    const mean = a => a.length ? a.reduce((s, c) => s + c.h, 0) / a.length : 0;
    return {
      n, spread, peak, coreShare,
      tallest: tall.h,
      tallD: hexDist(CBDX, CBDY, tall.x, tall.y),   /* is the skyline peak downtown? */
      discD: hexDist(CBDX, CBDY, best.x, best.y),   /* is the densest cluster downtown? */
      hNear: mean(near), hFar: mean(far),
    };
  }));
  await p.close();
}
await b.close();

console.log('seed   towers  spread   peak  core%   tallest  tallD  discD   hNear   hFar  ratio');
let a = { n: 0, spread: 0, peak: 0, coreShare: 0, tallD: 0, discD: 0, hNear: 0, hFar: 0 };
SEEDS.forEach((s, i) => {
  const r = rows[i];
  for (const k in a) a[k] += r[k] / SEEDS.length;
  console.log(
    String(s).padEnd(6),
    String(r.n).padStart(5),
    r.spread.toFixed(2).padStart(8),
    String(r.peak).padStart(6),
    (100 * r.coreShare).toFixed(0).padStart(5) + '%',
    r.tallest.toFixed(0).padStart(8),
    String(r.tallD).padStart(6),
    String(r.discD).padStart(6),
    r.hNear.toFixed(1).padStart(7),
    r.hFar.toFixed(1).padStart(6),
    (r.hNear / Math.max(r.hFar, 1e-6)).toFixed(2).padStart(6));
});
console.log('mean  ', a.n.toFixed(1).padStart(5), a.spread.toFixed(2).padStart(8),
  a.peak.toFixed(1).padStart(6), (100 * a.coreShare).toFixed(0).padStart(5) + '%',
  ''.padStart(8), a.tallD.toFixed(1).padStart(6), a.discD.toFixed(1).padStart(6),
  a.hNear.toFixed(1).padStart(7), a.hFar.toFixed(1).padStart(6),
  (a.hNear / Math.max(a.hFar, 1e-6)).toFixed(2).padStart(6));
