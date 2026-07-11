#!/usr/bin/env node
/* probe-woodbloom.mjs — does the spring wildflower understory actually appear on
 * the forest floor, ONLY in spring, and ONLY on forest?
 *
 * The confound: between spring and summer the canopy PALETTE also shifts
 * (applySeason greens the canopy in spring, golds the grass in the dry peak), so
 * a plain season diff moves FOREST pixels even with no flowers. To isolate the
 * new draw, diff PATCHED (working tree) vs PRISTINE (git HEAD) at the SAME frozen
 * spring frame — the only difference between the two builds is the wildflower
 * block. Controls: ROAD hexes must not move (change confined to forest), and the
 * SAME diff at a SUMMER frame must be ~0 (springBloom()=0 → the block draws
 * nothing → byte-identical).
 *
 *   node probe-woodbloom.mjs
 */
import { homedir, tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, 'solvista.html');            /* patched working tree */
const PRIST = join(tmpdir(), 'solvista-pristine-woodbloom.html');
writeFileSync(PRIST, execSync('git show HEAD:solvista.html', { cwd: HERE, maxBuffer: 1 << 26 }));

const SEEDS = [7, 42];
const WARP = 61;
const FRAMES = [['spring', 2035.28], ['summer', 2035.62]];
const R = 3;                    /* half-box: 7x7 = 49 px per hex */
const THR = 18;                 /* per-pixel euclidean RGB change that counts */

async function sample(page, fileUrl, seed, year) {
  await page.goto(`${fileUrl}?seed=${seed}&warp=${WARP}&t=0.30`);
  await page.waitForTimeout(400);
  return page.evaluate(({ R, year }) => {
    playing = false;
    /* clear EVERY mover: they spawn via Math.random and differ between the two
       page loads, putting a drift noise floor on the ROAD control (tramwire law) */
    for (const a of [vehicles, bikes, trams, trucks, peds, boats, ferries, freighters,
      birds, shuttles, dogs, kites, surfers, dolphins, whales, herons, kayaks, joggers,
      deer, clouds, balloons, copters]) a.length = 0;
    window.__setYear(year);
    render();
    const dpr = cvs.width / cvs.clientWidth, g = ctx;
    const grab = k => window.__find(k)
      .filter(s => s.sx > 50 && s.sx < innerWidth - 50 && s.sy > 50 && s.sy < innerHeight - 50)
      .slice(0, 300)
      .map(s => Array.from(g.getImageData(Math.round(s.sx * dpr) - R, Math.round(s.sy * dpr) - R,
        R * 2 + 1, R * 2 + 1).data));
    return { FOREST: grab('FOREST'), ROAD: grab('ROAD') };
  }, { R, year });
}
const springOf = y => { const s = ((y % 1) + 1) % 1; return Math.max(0, Math.min(1, 1 - Math.abs(s - 0.28) / 0.17)); };

/* changed-pixel fraction between two aligned box sets (same seed/frame/geometry) */
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
const PATCHED = pathToFileURL(ROOT).href, PRISTINE = pathToFileURL(PRIST).href;

console.log('\nSPRING WILDFLOWER UNDERSTORY — patched vs pristine HEAD, same frozen frame');
console.log('changed-pixel fraction (per-pixel |dRGB| > ' + THR + '), seeds 7/42, warp 61, t=0.30\n');
console.log('  seed  frame    springBloom   FOREST changed   ROAD control(=0)   forest/road hexes');
console.log('  ' + '-'.repeat(82));

for (const seed of SEEDS) {
  for (const [fname, year] of FRAMES) {
    const pa = await sample(p, PATCHED, seed, year);
    const pr = await sample(p, PRISTINE, seed, year);
    const f = changed(pa.FOREST, pr.FOREST), r = changed(pa.ROAD, pr.ROAD);
    console.log(`  ${seed}   ${fname.padEnd(7)}  ${springOf(year).toFixed(3).padStart(7)}      ` +
      `${(f.frac * 100).toFixed(2).padStart(6)}%          ${(r.frac * 100).toFixed(2).padStart(5)}%` +
      `            ${f.hexes}/${r.hexes}`);
  }
}
await b.close();
console.log('\nPASS = FOREST moves in SPRING (flowers appear), ~0 in SUMMER (byte-identical),');
console.log('       ROAD ~0 in both (change confined to the forest floor).');
