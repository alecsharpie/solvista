#!/usr/bin/env node
/* probe-autumnfall.mjs — does the autumn leaf litter actually appear on the forest
 * floor, ONLY in autumn, and ONLY on forest?
 *
 * Sibling of probe-woodbloom (iter 156). Same confound and same cure: the canopy
 * PALETTE also ambers in autumn (applySeason), so a plain season diff moves FOREST
 * pixels even with no litter. To isolate the new draw, diff PATCHED (working tree)
 * vs PRISTINE (git HEAD) at the SAME frozen autumn frame — the only difference
 * between the two builds is the leaf-litter block. Controls: ROAD hexes must not
 * move (change confined to forest), and the SAME diff at a SUMMER frame must be ~0
 * (autumnFall()=0 -> the block draws nothing -> byte-identical).
 *
 *   node probe-autumnfall.mjs
 */
import { homedir, tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '../../../../solvista.html'); /* patched working tree (probe lives in probes/) */
const PRIST = join(tmpdir(), 'solvista-pristine-autumnfall.html');
writeFileSync(PRIST, execSync('git show HEAD:solvista.html', { cwd: HERE, maxBuffer: 1 << 26 }));

const SEEDS = [7, 42];
const WARP = 61;
const FRAMES = [['autumn', 2035.87], ['summer', 2035.62]];
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
const autumnOf = y => { const s = ((y % 1) + 1) % 1; return Math.max(0, Math.min(1, 1 - Math.abs(s - 0.87) / 0.14)); };

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

console.log('\nAUTUMN LEAF LITTER — patched vs pristine HEAD, same frozen frame');
console.log('changed-pixel fraction (per-pixel |dRGB| > ' + THR + '), seeds 7/42, warp 61, t=0.30\n');
console.log('  seed  frame    autumnFall    FOREST changed   ROAD control(=0)   forest/road hexes');
console.log('  ' + '-'.repeat(82));

for (const seed of SEEDS) {
  for (const [fname, year] of FRAMES) {
    const pa = await sample(p, PATCHED, seed, year);
    const pr = await sample(p, PRISTINE, seed, year);
    const f = changed(pa.FOREST, pr.FOREST), r = changed(pa.ROAD, pr.ROAD);
    console.log(`  ${seed}   ${fname.padEnd(7)}  ${autumnOf(year).toFixed(3).padStart(7)}      ` +
      `${(f.frac * 100).toFixed(2).padStart(6)}%          ${(r.frac * 100).toFixed(2).padStart(5)}%` +
      `            ${f.hexes}/${r.hexes}`);
  }
}
await b.close();
console.log('\nPASS = FOREST moves in AUTUMN (litter appears), ~0 in SUMMER (byte-identical),');
console.log('       ROAD ~0 in both (change confined to the forest floor).');
