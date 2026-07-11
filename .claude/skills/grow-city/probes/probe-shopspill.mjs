#!/usr/bin/env node
/* probe-shopspill.mjs — do lit shopfronts spill warm light onto the pavement ONLY at night?
 *
 * PATCH = working tree, BASE = git HEAD. The only change is a draw-only, LITAMT>0.4-gated
 * warm ground pool in front of COM storefronts with v>0.5. Diffing PATCH vs BASE over the
 * COM cells' screen boxes at a frozen frame isolates the spill.
 *   TARGET  = COM cells v>0.5 : change present at NIGHT, ~0 by DAY (LITAMT<0.4, no draw).
 *   CONTROL = COM cells v<=0.5: ~0 at BOTH — the gate excludes them, so the draw never runs
 *             (this control also tests the gate, not just the day/night split).
 * Every mover cleared + clock frozen (tramwire law) so a car/ped can't drift into a box;
 * rebuilt in-page + STARS cleared + Math.random stubbed (163 law) so night is reproducible.
 *
 *   node probe-shopspill.mjs
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
const BASE = join(tmpdir(), 'solvista-shopspill-base.html');
writeFileSync(BASE, HEADSRC);

const SEEDS = [7, 42, 1234];
const WARP = 61;
const FRAMES = [['night', 0.90], ['day', 0.35]];
const R = 16;                   /* half-box: the pool sits below+forward of the hex centre */
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
    const lit = [], dim = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)]; if (!c || c.t !== T.COM) continue;
      (c.v > 0.5 ? lit : dim).push([x, y]);
    }
    const box = list => list.map(([x, y]) => { const [cx, cy] = ctr(x, y); return [cx * scale + offX, cy * scale + offY]; })
      .filter(([sx, sy]) => sx > 50 && sx < innerWidth - 50 && sy > 50 && sy < innerHeight - 50)
      .slice(0, 300)
      .map(([sx, sy]) => Array.from(g.getImageData(Math.round(sx * dpr) - R, Math.round(sy * dpr) - R, R * 2 + 1, R * 2 + 1).data));
    return { LIT: box(lit), DIM: box(dim), lit: LITAMT, nl: lit.length };
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
  return { frac: px ? hit / px : 0, hexes: n };
}

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
const uPATCH = pathToFileURL(ROOT).href, uBASE = pathToFileURL(BASE).href;

console.log('\nSHOPFRONT PAVEMENT SPILL — PATCH vs HEAD over COM cells');
console.log('changed-pixel fraction (per-pixel |dRGB| > ' + THR + '), warp 61\n');
console.log('  seed  frame    COM v>0.5      COM v<=0.5 ctl(=0)   nLit   LITAMT');
console.log('  ' + '-'.repeat(64));

for (const seed of SEEDS) {
  for (const [fname, t] of FRAMES) {
    const pa = await sample(p, uPATCH, seed, t);
    const bs = await sample(p, uBASE, seed, t);
    const litc = changed(pa.LIT, bs.LIT);
    const dimc = changed(pa.DIM, bs.DIM);
    console.log(`  ${seed}  ${fname.padEnd(7)}  ${(litc.frac * 100).toFixed(2).padStart(6)}%        ` +
      `${(dimc.frac * 100).toFixed(2).padStart(5)}%          ${String(pa.nl).padStart(3)}    ${pa.lit.toFixed(2)}`);
  }
}
await b.close();
console.log('\nPASS = COM v>0.5 spills warm at NIGHT, ~0 by DAY (LITAMT<0.4, no draw), v<=0.5 control ~0 both frames.');
