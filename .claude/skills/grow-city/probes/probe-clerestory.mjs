#!/usr/bin/env node
/* probe-clerestory.mjs — does iter 173's north-light glazing land on the sawtooth
 * warehouse monitors, and NOWHERE else?
 *
 * The change adds two glass BANDS to the front face of each sawtooth monitor on a
 * NON-LOFT IND warehouse (drawBuilding, T.IND else-branch). It is draw-only, so the
 * iter-161 law applies: diff PATCH (working tree) vs BASE (git HEAD) over each host
 * hex and EVERY differing pixel IS the clerestory, by construction — no fragile
 * world->screen box for the band itself.
 *
 *   HOST    = non-loft IND cells (c.t===T.IND && !c.loft), sampled in-page
 *   CONTROL = ROAD cells, which the change never touches -> must diff ~0
 * The band is glass-grey by day and mixes toward warm with the scene `lit`, so it
 * registers a diff DAY AND NIGHT (unlike a night-only glow); the night diff should
 * be no smaller than the day one. LOFT IND (converted brick lofts) are a second
 * control: they take the loft branch, so they must NOT move either.
 * Every mover is cleared (tramwire law) and the clock frozen (freeze-for-a-diff law).
 *
 *   node probe-clerestory.mjs
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
const BASE = join(tmpdir(), 'solvista-clerestory-base.html');
writeFileSync(BASE, HEADSRC);

const SEEDS = [7, 42, 1234];
const WARP = 61;
const FRAMES = [['day', 0.35], ['night', 0.90]];
const RX = 26, RT = 60, RB = 8;   /* sample box: wide, tall upward to catch the roof monitors */
const THR = 12;                   /* per-pixel euclidean RGB change that counts */

async function sample(page, fileUrl, seed, t) {
  await page.goto(`${fileUrl}?seed=${seed}&warp=${WARP}&t=${t}`);
  await page.waitForTimeout(400);
  return page.evaluate(({ RX, RT, RB, WARP, TOD }) => {
    /* rebuild the city in-page so the RAF's wall-clock-dependent extra tick()s
       between load and freeze can't make PATCH and BASE diverge (iter-163(c));
       genWorld resets dayT=0.30, so re-pin the time-of-day the frame asked for.
       NB: the param is TOD, not T — T is the global tile-type enum in the page */
    genWorld(seedNum); __warp(WARP); __setTime(TOD);
    playing = false; if (typeof waveT !== 'undefined') waveT = 12.3;
    for (const a of [vehicles, bikes, trams, trucks, peds, boats, ferries, freighters,
      birds, shuttles, dogs, kites, surfers, dolphins, whales, herons, kayaks, joggers,
      deer, clouds, balloons, copters]) if (a) a.length = 0;
    render();
    const dpr = cvs.width / cvs.clientWidth, g = ctx;
    const ware = [], loft = [], road = [], ind = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)]; if (!c) continue;
      if (c.t === T.IND) { (c.loft ? loft : ware).push([x, y]); ind.push([x, y]); }
    }
    /* ROAD control must not OVERLAP a warehouse's tall roof box — the harbour road
       hugs the IND cluster, so a road cell within a few hexes of any IND has a
       neighbouring monitor bleeding into its (60px-tall) sample. Exclude them. */
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)]; if (!c || c.t !== T.ROAD) continue;
      if (ind.every(([ix, iy]) => Math.abs(ix - x) + Math.abs(iy - y) > 5)) road.push([x, y]);
    }
    const box = list => list.map(([x, y]) => { const [cx, cy] = ctr(x, y); return [cx * scale + offX, cy * scale + offY]; })
      .filter(([sx, sy]) => sx > 60 && sx < innerWidth - 60 && sy > 90 && sy < innerHeight - 30)
      .slice(0, 300)
      .map(([sx, sy]) => Array.from(g.getImageData(Math.round(sx * dpr) - RX, Math.round(sy * dpr) - RT, RX * 2 + 1, RT + RB + 1).data));
    return { WARE: box(ware), LOFT: box(loft), ROAD: box(road), lit: LITAMT, nw: ware.length, nl: loft.length };
  }, { RX, RT, RB, WARP, TOD: t });
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

console.log('\nWAREHOUSE CLERESTORY — PATCH(working) vs BASE(HEAD) over each host hex (iter-161 diff law)');
console.log('changed-pixel fraction (per-pixel |dRGB| > ' + THR + '), seeds 7/42/1234, warp 61\n');
console.log('  seed  frame    WARE(sawtooth)   LOFT ctl(=0)   ROAD ctl(=0)   nWare  LITAMT');
console.log('  ' + '-'.repeat(76));

let ok = true;
for (const seed of SEEDS) {
  for (const [fname, t] of FRAMES) {
    const pa = await sample(p, uPATCH, seed, t);
    const bs = await sample(p, uBASE, seed, t);
    const ware = changed(pa.WARE, bs.WARE);
    const loftc = changed(pa.LOFT, bs.LOFT), roadc = changed(pa.ROAD, bs.ROAD);
    if (ware.frac <= 0) ok = false;
    if (loftc.frac > 0.002 || roadc.frac > 0.002) ok = false;
    console.log(`  ${seed}  ${fname.padEnd(7)}  ${(ware.frac * 100).toFixed(3).padStart(7)}%        ` +
      `${(loftc.frac * 100).toFixed(3).padStart(6)}%       ${(roadc.frac * 100).toFixed(3).padStart(6)}%      ${String(pa.nw).padStart(3)}   ${pa.lit.toFixed(2)}`);
  }
}
await b.close();
console.log('\nPASS = WARE moves DAY AND NIGHT (>0), LOFT & ROAD controls ~0 (untouched branches).');
console.log(ok ? 'VERDICT: PASS' : 'VERDICT: FAIL');
process.exit(ok ? 0 : 1);
