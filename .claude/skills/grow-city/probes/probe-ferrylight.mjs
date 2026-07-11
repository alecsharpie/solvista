#!/usr/bin/env node
/* probe-ferrylight.mjs — does the harbour ferry light up ONLY at night?
 *
 * PATCH = working tree, BASE = git HEAD. The only change is a draw-only, LITAMT>0.35
 * gated block at the end of drawFerry: warm cabin windows + white masthead +
 * red/green nav lights + a wash on the water. Diffing PATCH vs BASE over each
 * ferry's screen box at a FROZEN frame isolates the lights (161's whole-frame diff
 * law: identical code save the edit, so every differing pixel IS the edit).
 *   TARGET  = ferry boxes at NIGHT: lights present.
 *   CONTROL1 = ferry boxes by DAY: ~0 (LITAMT<0.35, block never runs).
 *   CONTROL2 = BOAT boxes at NIGHT: ~0 (fishing boats got no lights; proves the
 *              edit touched ferries only, not all harbour craft).
 * Math.random STUBBED *before* genWorld so ferry `fr` (Math.random-spawned) is
 * identical across the two loads; STARS cleared, clock frozen, land movers cleared
 * (163 laws) so night is reproducible and nothing drifts into a box.
 *
 *   node probe-ferrylight.mjs
 */
import { homedir, tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { writeFileSync, existsSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const CAND = [resolve(HERE, 'solvista.html'), resolve(HERE, '../../../../solvista.html'), resolve(HERE, '../../../solvista.html')];
const ROOT = CAND.find(existsSync);
const REPO = dirname(ROOT);
const HEADSRC = execFileSync('git', ['-C', REPO, 'show', 'HEAD:solvista.html']).toString();
const BASE = join(tmpdir(), 'solvista-ferry-base.html');
writeFileSync(BASE, HEADSRC);

const SEEDS = [7, 42, 1234];
const WARP = 61;
const FRAMES = [['night', 0.90], ['day', 0.35]];
const R = 16;                   /* half-box: hull cx+-7, lights cy-5.8..+3.4 */
const THR = 14;                 /* per-pixel euclidean RGB change that counts */
const WAVET = 12.3;

async function sample(page, fileUrl, seed, t) {
  await page.goto(`${fileUrl}?seed=${seed}`);
  await page.waitForTimeout(200);
  return page.evaluate(({ R, WAVET, seed, warp, t }) => {
    Math.random = () => 0.5;                 /* BEFORE genWorld: deterministic ferry fr */
    genWorld(seed); __warp(warp); __setTime(t);
    STARS.length = 0;
    playing = false; waveT = WAVET;
    for (const a of [vehicles, bikes, trams, trucks, peds, freighters, birds,
      shuttles, dogs, kites, surfers, dolphins, whales, herons, kayaks, joggers,
      deer, clouds, balloons, copters]) a.length = 0;   /* keep ferries + boats */
    render();
    const dpr = cvs.width / cvs.clientWidth, g = ctx;
    const box = list => list
      .map(([wx, wy]) => [wx * scale + offX, wy * scale + offY])
      .filter(([sx, sy]) => sx > 50 && sx < innerWidth - 50 && sy > 50 && sy < innerHeight - 50)
      .map(([sx, sy]) => Array.from(g.getImageData(Math.round(sx * dpr) - R * dpr, Math.round(sy * dpr) - R * dpr, R * 2 * dpr + 1, R * 2 * dpr + 1).data));
    const fw = ferries.map(f => pxc(seaXFr(f.y, f.fr), f.y));
    const bw = boats.map(b => pxc(b.x, b.y));
    return { FERRY: box(fw), BOAT: box(bw), lit: LITAMT, nf: ferries.length, nb: boats.length };
  }, { R, WAVET, seed, warp: WARP, t });
}

function changed(a, b) {
  let px = 0, hit = 0;
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) {
    const A = a[i], B = b[i], m = Math.min(A.length, B.length);
    for (let p = 0; p < m; p += 4) {
      const dr = A[p] - B[p], dg = A[p + 1] - B[p + 1], db = A[p + 2] - B[p + 2];
      px++;
      if (Math.sqrt(dr * dr + dg * dg + db * db) > THR) hit++;
    }
  }
  return { frac: px ? hit / px : 0, n };
}

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
const uPATCH = pathToFileURL(ROOT).href, uBASE = pathToFileURL(BASE).href;

console.log('\nFERRY NIGHT LIGHTS — PATCH vs HEAD over each ferry/boat screen box');
console.log('changed-pixel fraction (per-pixel |dRGB| > ' + THR + '), warp 61\n');
console.log('  seed  frame    FERRY lights   BOAT ctl(=0)   nFerry  LITAMT');
console.log('  ' + '-'.repeat(60));

for (const seed of SEEDS) {
  for (const [fname, t] of FRAMES) {
    const pa = await sample(p, uPATCH, seed, t);
    const bs = await sample(p, uBASE, seed, t);
    const fr = changed(pa.FERRY, bs.FERRY);
    const bo = changed(pa.BOAT, bs.BOAT);
    console.log(`  ${seed}  ${fname.padEnd(7)}  ${(fr.frac * 100).toFixed(2).padStart(6)}%       ` +
      `${(bo.frac * 100).toFixed(2).padStart(5)}%        ${String(pa.nf).padStart(2)}      ${pa.lit.toFixed(2)}`);
  }
}
await b.close();
console.log('\nPASS = FERRY lights light at NIGHT, ~0 by DAY (block never runs), BOAT control ~0 both frames.');
