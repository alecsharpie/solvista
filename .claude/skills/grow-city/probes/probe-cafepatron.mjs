#!/usr/bin/env node
/* probe-cafepatron.mjs — do the park café tables grow DAY-ONLY seated patrons,
 * and only on the café-edge PARK cells (adjacent to shops)?
 *
 * PATCH = working tree, BASE = git HEAD. The only change is a draw-only,
 * hashCell-gated block inside the T.PARK café/kiosk case (the cell is adjacent
 * to COM/MARKET/CIVIC): seated figures either side of each parasol, gated
 * LITAMT<0.5 so the terrace empties after dark. Diffing PATCH vs BASE over
 * screen boxes at a frozen frame isolates the patrons.
 *   TARGET = café-edge PARK (adjacent to shops): change present by DAY, ~0 NIGHT.
 *   PARKC  = PARK cells NOT adjacent to shops: ~0 — no café draw there.
 *   ROAD   = ~0 at every frame (the café block is the only edit).
 * Every mover cleared + clock frozen + rebuilt in-page + STARS cleared +
 * Math.random stubbed (163 law) so a PATCH-vs-HEAD diff at the SAME frame
 * differs only by my code.
 *
 *   node probe-cafepatron.mjs
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
const BASE = join(tmpdir(), 'solvista-cafepatron-base.html');
writeFileSync(BASE, HEADSRC);

const SEEDS = [7, 42, 1234];
const WARP = 61;
const FRAMES = [['day', 0.30], ['night', 0.90]];
const R = 9;                    /* half-box over each café tile (tables sit above centre) */
const THR = 12;                 /* per-pixel euclidean RGB change that counts */

async function sample(page, fileUrl, seed, t) {
  await page.goto(`${fileUrl}?seed=${seed}`);
  await page.waitForTimeout(200);
  return page.evaluate(({ R, seed, warp, t }) => {
    genWorld(seed); __warp(warp); __setTime(t);
    STARS.length = 0; Math.random = () => 0.5;
    playing = false;
    for (const a of [vehicles, bikes, trams, trucks, peds, boats, ferries, freighters,
      birds, shuttles, dogs, kites, surfers, dolphins, whales, herons, kayaks, joggers,
      deer, clouds, balloons, copters]) a.length = 0;
    render();
    const dpr = cvs.width / cvs.clientWidth, g = ctx;
    const isCafe = (x, y) => countAround(x, y, 1, n => n.t === T.COM || n.t === T.MARKET || n.t === T.CIVIC) > 0;
    const cafe = [], parkc = [], road = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)]; if (!c) continue;
      if (c.t === T.PARK) { (isCafe(x, y) ? cafe : parkc).push([x, y]); }
      else if (c.t === T.ROAD && !c.bridge) road.push([x, y]);
    }
    const box = list => list.map(([x, y]) => { const [cx, cy] = ctr(x, y); return [cx * scale + offX, cy * scale + offY]; })
      .filter(([sx, sy]) => sx > 50 && sx < innerWidth - 50 && sy > 50 && sy < innerHeight - 50)
      .slice(0, 500)
      .map(([sx, sy]) => Array.from(g.getImageData(Math.round(sx * dpr) - R, Math.round(sy * dpr) - R, R * 2 + 1, R * 2 + 1).data));
    return { CAFE: box(cafe), PARKC: box(parkc), ROAD: box(road), lit: LITAMT, nc: cafe.length };
  }, { R, seed, warp: WARP, t });
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

console.log('\nCAFE-TABLE PATRONS — PATCH vs HEAD over PARK cells');
console.log('changed-pixel fraction (per-pixel |dRGB| > ' + THR + '), warp 61\n');
console.log('  seed  frame    CAFE patrons   PARKC ctl(=0)   ROAD ctl(=0)   LITAMT   nCafe');
console.log('  ' + '-'.repeat(70));

for (const seed of SEEDS) {
  for (const [fname, t] of FRAMES) {
    const pa = await sample(p, uPATCH, seed, t);
    const bs = await sample(p, uBASE, seed, t);
    const cafe = changed(pa.CAFE, bs.CAFE);
    const parkc = changed(pa.PARKC, bs.PARKC);
    const road = changed(pa.ROAD, bs.ROAD);
    console.log(`  ${seed}  ${fname.padEnd(7)}  ${(cafe.frac * 100).toFixed(2).padStart(6)}%       ` +
      `${(parkc.frac * 100).toFixed(2).padStart(5)}%          ${(road.frac * 100).toFixed(2).padStart(5)}%        ${pa.lit.toFixed(2)}    ${pa.nc}`);
  }
}
await b.close();
console.log('\nPASS = CAFE patrons present by DAY (LITAMT<0.5), ~0 at NIGHT (gate off); PARKC & ROAD controls ~0 all frames.');
