#!/usr/bin/env node
/* probe-whitecap.mjs — does the open swell grow DAY-ONLY whitecaps, and only
 * BEYOND the coastal shelf?
 *
 * PATCH = working tree, BASE = git HEAD. The only change is a draw-only,
 * hashCell-gated block in the T.WATER case: sparse foam caps on open water
 * (rDeep>SHELF1), gated LITAMT<0.6 so they fade out by dusk. Diffing PATCH vs
 * BASE over screen boxes at a frozen frame isolates the caps.
 *   TARGET = open WATER (!riv, rDeep>SHELF1): change present by DAY, ~0 at NIGHT.
 *   SHELF  = shallow water (rDeep<=SHELF1, the surf/shelf zone): ~0 — caps are
 *            offshore only (proves the depth gate).
 *   LAND   = RES/FOREST/MID: ~0 at every frame (the WATER case is the only edit).
 * Every mover cleared + clock frozen (tramwire law), rebuilt in-page + STARS
 * cleared + Math.random stubbed (163 law) so the frame is reproducible and a
 * PATCH-vs-HEAD diff at the SAME frame differs only by my code.
 *
 *   node probe-whitecap.mjs
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
const BASE = join(tmpdir(), 'solvista-whitecap-base.html');
writeFileSync(BASE, HEADSRC);

const SEEDS = [7, 42, 1234];
const WARP = 61;
const FRAMES = [['day', 0.35], ['noon', 0.47], ['dusk', 0.72], ['night', 0.90]];
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
    const sea = [], shelf = [], land = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)]; if (!c) continue;
      if (c.t === T.WATER && !c.riv) { (rDeep[idx(x, y)] > SHELF1 ? sea : shelf).push([x, y]); }
      else if (c.t === T.RES || c.t === T.FOREST || c.t === T.MID) land.push([x, y]);
    }
    const box = list => list.map(([x, y]) => { const [cx, cy] = ctr(x, y); return [cx * scale + offX, cy * scale + offY]; })
      .filter(([sx, sy]) => sx > 50 && sx < innerWidth - 50 && sy > 50 && sy < innerHeight - 50)
      .slice(0, 500)
      .map(([sx, sy]) => Array.from(g.getImageData(Math.round(sx * dpr) - R, Math.round(sy * dpr) - R, R * 2 + 1, R * 2 + 1).data));
    return { SEA: box(sea), SHELF: box(shelf), LAND: box(land), lit: LITAMT, ns: sea.length };
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

console.log('\nWIND-DRIVEN WHITECAPS — PATCH vs HEAD over water cells');
console.log('changed-pixel fraction (per-pixel |dRGB| > ' + THR + '), warp 61\n');
console.log('  seed  frame    SEA caps    SHELF ctl(=0)   LAND ctl(=0)   LITAMT   nSea');
console.log('  ' + '-'.repeat(68));

for (const seed of SEEDS) {
  for (const [fname, t] of FRAMES) {
    const pa = await sample(p, uPATCH, seed, t);
    const bs = await sample(p, uBASE, seed, t);
    const sea = changed(pa.SEA, bs.SEA);
    const shelf = changed(pa.SHELF, bs.SHELF);
    const land = changed(pa.LAND, bs.LAND);
    console.log(`  ${seed}  ${fname.padEnd(7)}  ${(sea.frac * 100).toFixed(2).padStart(6)}%     ` +
      `${(shelf.frac * 100).toFixed(2).padStart(5)}%          ${(land.frac * 100).toFixed(2).padStart(5)}%        ${pa.lit.toFixed(2)}    ${pa.ns}`);
  }
}
await b.close();
console.log('\nPASS = SEA caps present by DAY/NOON (LITAMT<0.6), ~0 at NIGHT (gate off); SHELF & LAND controls ~0 all frames.');
