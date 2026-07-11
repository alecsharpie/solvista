#!/usr/bin/env node
/* probe-fetecrowd.mjs — do festival-goers appear on fete streets ONLY by day?
 *
 * PATCH = working tree, BASE = git HEAD. The only change is a draw-only crowd on
 * c.fete ROAD cells, day-faded (faa=clamp((0.82-LITAMT)/0.28,0,1)). Diffing PATCH
 * vs BASE over the fete cells' screen boxes at a frozen frame isolates the crowd.
 *   TARGET  = fete cells: change present by DAY, ~0 by NIGHT (faa->0, byte-identical).
 *   CONTROL = non-fete ROAD cells: ~0 at both (nothing there changed).
 * Every mover cleared (tramwire law) so a strolling ped can't drift into a box.
 *
 *   node probe-fetecrowd.mjs
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
const BASE = join(tmpdir(), 'solvista-fete-base.html');
writeFileSync(BASE, HEADSRC);

const SEEDS = [7, 42, 1234];
const WARP = 61;
const FRAMES = [['day', 0.35], ['night', 0.90]];
const R = 12;                   /* half-box: crowd scatters ~6px around the cell centre + figure height */
const THR = 14;                 /* per-pixel euclidean RGB change that counts */
const WAVET = 12.3;

async function sample(page, fileUrl, seed, t) {
  await page.goto(`${fileUrl}?seed=${seed}`);
  await page.waitForTimeout(200);
  return page.evaluate(({ R, WAVET, seed, warp, t }) => {
    /* 163 law: the RAF loop runs a variable number of tick()s between load and freeze,
       so the LOADED developed city differs run to run. Rebuild it in-page for a
       byte-identical city, then freeze. STARS is an unseeded Math.random field (per
       load); clear it and stub Math.random so the night frame is reproducible too. */
    genWorld(seed); __warp(warp); __setTime(t);
    STARS.length = 0; Math.random = () => 0.5;
    playing = false; waveT = WAVET;
    for (const a of [vehicles, bikes, trams, trucks, peds, boats, ferries, freighters,
      birds, shuttles, dogs, kites, surfers, dolphins, whales, herons, kayaks, joggers,
      deer, clouds, balloons, copters]) a.length = 0;
    render();
    const dpr = cvs.width / cvs.clientWidth, g = ctx;
    const fete = [], road = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)]; if (!c || c.t !== T.ROAD) continue;
      (c.fete ? fete : road).push([x, y]);
    }
    const box = list => list.map(([x, y]) => { const [cx, cy] = ctr(x, y); return [cx * scale + offX, cy * scale + offY]; })
      .filter(([sx, sy]) => sx > 50 && sx < innerWidth - 50 && sy > 50 && sy < innerHeight - 50)
      .slice(0, 300)
      .map(([sx, sy]) => Array.from(g.getImageData(Math.round(sx * dpr) - R, Math.round(sy * dpr) - R, R * 2 + 1, R * 2 + 1).data));
    return { FETE: box(fete), ROAD: box(road), lit: LITAMT, nf: fete.length };
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
  return { frac: px ? hit / px : 0, hexes: n };
}

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
const uPATCH = pathToFileURL(ROOT).href, uBASE = pathToFileURL(BASE).href;

console.log('\nFESTIVAL CROWD — PATCH vs HEAD over c.fete ROAD cells');
console.log('changed-pixel fraction (per-pixel |dRGB| > ' + THR + '), warp 61\n');
console.log('  seed  frame    FETE crowd    ROAD ctl(=0)   nFete   LITAMT');
console.log('  ' + '-'.repeat(60));

for (const seed of SEEDS) {
  for (const [fname, t] of FRAMES) {
    const pa = await sample(p, uPATCH, seed, t);
    const bs = await sample(p, uBASE, seed, t);
    const fete = changed(pa.FETE, bs.FETE);
    const roadc = changed(pa.ROAD, bs.ROAD);
    console.log(`  ${seed}  ${fname.padEnd(7)}  ${(fete.frac * 100).toFixed(2).padStart(6)}%       ` +
      `${(roadc.frac * 100).toFixed(2).padStart(5)}%        ${String(pa.nf).padStart(3)}    ${pa.lit.toFixed(2)}`);
  }
}
await b.close();
console.log('\nPASS = FETE crowd moves in DAY, ~0 at NIGHT (faa->0, byte-identical), ROAD control ~0 both frames.');
