#!/usr/bin/env node
/* probe-seagold.mjs — does the open sea catch a WARM sheen ONLY at golden hour?
 *
 * PATCH = working tree, BASE = git HEAD. The only change is a draw-only,
 * GWARM-gated block in the T.WATER case: a warm shimmer wash (tinted toward
 * skyBot) laid over open water when the low sky is warm. Diffing PATCH vs BASE
 * over the open-water cells' screen boxes at a frozen frame isolates the sheen.
 *   TARGET  = open WATER (!riv): change present at DUSK/DAWN (GWARM~0.4-0.6),
 *             ~0 at NOON and NIGHT (GWARM=0, no draw).
 *   CONTROL = land (RES/FOREST): ~0 at every frame (WATER case is the only edit).
 * Every mover cleared + clock frozen (tramwire law) so nothing drifts into a box;
 * rebuilt in-page + STARS cleared + Math.random stubbed (163 law) so the frame is
 * reproducible. And because a diff of PATCH vs HEAD at the SAME frame differs only
 * by my code, the ambient golden-hour tint (which noon/night lack) is NOT counted
 * as signal — only the sheen is.
 *
 *   node probe-seagold.mjs
 */
import { homedir, tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { writeFileSync, existsSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const CAND = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html'), resolve(HERE, '../../../solvista.html')];
const ROOT = CAND.find(existsSync);
const REPO = dirname(ROOT);
const HEADSRC = execFileSync('git', ['-C', REPO, 'show', 'HEAD:solvista.html']).toString();
const BASE = join(tmpdir(), 'solvista-seagold-base.html');
writeFileSync(BASE, HEADSRC);

const SEEDS = [7, 42, 1234];
const WARP = 61;
const FRAMES = [['dusk', 0.65], ['dawn', 0.05], ['noon', 0.47], ['night', 0.90]];
const R = 8;                    /* half-box over each water hex */
const THR = 10;                 /* per-pixel euclidean RGB change that counts */
const WAVET = 12.3;

async function sample(page, fileUrl, seed, t) {
  await page.goto(`${fileUrl}?seed=${seed}`);
  await page.waitForTimeout(200);
  return page.evaluate(({ R, WAVET, seed, warp, t }) => {
    genWorld(seed); __warp(warp); __setTime(t);
    STARS.length = 0; Math.random = () => 0.5;
    playing = false; waveT = WAVET;
    for (const a of [vehicles, bikes, trams, trucks, peds, boats, ferries, freighters,
      birds, shuttles, dogs, kites, surfers, dolphins, whales, herons, kayaks, joggers,
      deer, clouds, balloons, copters]) a.length = 0;
    render();
    const dpr = cvs.width / cvs.clientWidth, g = ctx;
    const sea = [], land = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)]; if (!c) continue;
      if (c.t === T.WATER && !c.riv) sea.push([x, y]);
      else if (c.t === T.RES || c.t === T.FOREST || c.t === T.MID) land.push([x, y]);
    }
    const box = list => list.map(([x, y]) => { const [cx, cy] = ctr(x, y); return [cx * scale + offX, cy * scale + offY]; })
      .filter(([sx, sy]) => sx > 50 && sx < innerWidth - 50 && sy > 50 && sy < innerHeight - 50)
      .slice(0, 400)
      .map(([sx, sy]) => Array.from(g.getImageData(Math.round(sx * dpr) - R, Math.round(sy * dpr) - R, R * 2 + 1, R * 2 + 1).data));
    const gw = (typeof GWARM === 'undefined') ? -1 : GWARM;
    return { SEA: box(sea), LAND: box(land), lit: LITAMT, gwarm: gw, ns: sea.length };
  }, { R, WAVET, seed, warp: WARP, t });
}

function changed(a, b) {
  let px = 0, hit = 0;
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) {
    const A = a[i], B = b[i];
    for (let p = 0; p < A.length; p += 4) {
      const dr = A[p] - B[p], dg = A[p + 1] - B[p + 1], db = A[p + 2] - B[p + 2];
      px++;
      if (Math.sqrt(dr * dr + dg * dg + db * db) > THR) hit++;
    }
  }
  return { frac: px ? hit / px : 0 };
}

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
const uPATCH = pathToFileURL(ROOT).href, uBASE = pathToFileURL(BASE).href;

console.log('\nGOLDEN-HOUR SEA SHEEN — PATCH vs HEAD over open-water cells');
console.log('changed-pixel fraction (per-pixel |dRGB| > ' + THR + '), warp 61\n');
console.log('  seed  frame    SEA sheen    LAND ctl(=0)   GWARM   LITAMT');
console.log('  ' + '-'.repeat(60));

for (const seed of SEEDS) {
  for (const [fname, t] of FRAMES) {
    const pa = await sample(p, uPATCH, seed, t);
    const bs = await sample(p, uBASE, seed, t);
    const sea = changed(pa.SEA, bs.SEA);
    const land = changed(pa.LAND, bs.LAND);
    console.log(`  ${seed}  ${fname.padEnd(7)}  ${(sea.frac * 100).toFixed(2).padStart(6)}%      ` +
      `${(land.frac * 100).toFixed(2).padStart(5)}%       ${pa.gwarm.toFixed(2)}    ${pa.lit.toFixed(2)}`);
  }
}
await b.close();
console.log('\nPASS = SEA sheen present at DUSK/DAWN (GWARM>0), ~0 at NOON/NIGHT (GWARM=0), LAND control ~0 all frames.');
