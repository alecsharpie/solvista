#!/usr/bin/env node
/* probe-massshadow.mjs — does the building contact shadow scale with MASS (height)?
 *
 * PATCH = working tree, BASE = git HEAD. The only change is one line in drawBuilding:
 * the contact ellipse radius/alpha now grow with shf=clamp((h-9)/120,0,1) instead of a
 * fixed 0.42x0.13 blob. Diffing PATCH vs BASE over each building's base box at a frozen
 * day frame isolates the enlarged shadow, and splitting by shf proves it scales.
 *   TALL   (shf>0.4, the big towers): shadow grows a lot -> clear darkening.
 *   SHORT  (shf<0.05, houses/walk-ups): shf~0 so the shadow is ~unchanged -> ~0.
 *   CTL    (non-building EMPTY/PARK cells): no building shadow at all -> ~0.
 * A monotone TALL >> SHORT ~ CTL is the whole claim. Movers cleared + clock frozen +
 * STARS cleared + Math.random stubbed (163 law) so the frame is byte-reproducible.
 *
 *   node probe-massshadow.mjs
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
const BASE = join(tmpdir(), 'solvista-massshadow-base.html');
writeFileSync(BASE, HEADSRC);

const SEEDS = [7, 42, 1234];
const WARP = 61;
const T = 0.35;                  /* bright day: shadow reads over the sunlit ground */
const R = 24;                    /* half-box: a tall tower's enlarged shadow is ~0.74 cell */
const THR = 12;                  /* per-pixel euclidean RGB change that counts */

async function sample(page, fileUrl, seed) {
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
    const tall = [], short = [], ctl = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)]; if (!c) continue;
      if (DEV.has(c.t)) {
        const shf = Math.max(0, Math.min(1, (c.h - 9) / 120));
        if (shf > 0.4) tall.push([x, y]);
        else if (shf < 0.05) short.push([x, y]);
      } else if (c.t === T.EMPTY || c.t === T.PARK) ctl.push([x, y]);
    }
    const box = list => list.map(([x, y]) => { const [cx, cy] = ctr(x, y); return [cx * scale + offX, cy * scale + offY]; })
      .filter(([sx, sy]) => sx > 60 && sx < innerWidth - 60 && sy > 60 && sy < innerHeight - 60)
      .slice(0, 300)
      .map(([sx, sy]) => Array.from(g.getImageData(Math.round(sx * dpr) - R, Math.round(sy * dpr) - R, R * 2 + 1, R * 2 + 1).data));
    return { TALL: box(tall), SHORT: box(short), CTL: box(ctl), nt: tall.length, ns: short.length };
  }, { R, seed, warp: WARP, t: T });
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

console.log('\nMASS-SCALED CONTACT SHADOW — PATCH vs HEAD over each building base, day t=0.35');
console.log('changed-pixel fraction (per-pixel |dRGB| > ' + THR + '), warp 61\n');
console.log('  seed   TALL(shf>.4)   SHORT(shf<.05)   CTL(non-bldg)   nTall  nShort');
console.log('  ' + '-'.repeat(66));

for (const seed of SEEDS) {
  const pa = await sample(p, uPATCH, seed);
  const bs = await sample(p, uBASE, seed);
  const tall = changed(pa.TALL, bs.TALL);
  const short = changed(pa.SHORT, bs.SHORT);
  const ctl = changed(pa.CTL, bs.CTL);
  console.log(`  ${String(seed).padEnd(5)}  ${(tall.frac * 100).toFixed(2).padStart(6)}%        ` +
    `${(short.frac * 100).toFixed(2).padStart(5)}%          ${(ctl.frac * 100).toFixed(2).padStart(5)}%         ` +
    `${String(pa.nt).padStart(4)}   ${String(pa.ns).padStart(4)}`);
}
await b.close();
console.log('\nPASS = TALL >> SHORT ~ CTL ~ 0: the shadow grows with building height, not for houses or bare ground.');
