#!/usr/bin/env node
/* probe-gulls.mjs — do shorebirds stand on the damp margin of the beach ONLY by
 * day, and ONLY on beach hexes that face open water (the tideline)?
 *
 * The change draws a small group of gulls on beach cells with a water-facing edge,
 * gated to LITAMT<0.58 (day) and hashCell-placed. To isolate the new glyphs from
 * the beach's own look (tide margin, umbrellas, palms — identical between builds),
 * diff PATCHED (working tree) vs PRISTINE (git HEAD) at the SAME frozen frame.
 * waveT is pinned (the gulls' idle bob rides it) and every mover cleared (tramwire
 * law) so no Math.random entity drifts across a sample box between the two loads.
 *
 * Host hexes = BEACH cells adjacent to a non-river WATER cell (exactly where the
 * gulls draw), found in-page. Controls: (1) ROAD hexes must not move; (2) the SAME
 * diff at NIGHT (LITAMT high -> gate off) must be ~0 (byte-identical), proving the
 * gulls are day-only and lift off to roost at dusk.
 *
 *   node probe-gulls.mjs
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
const PRIST = join(tmpdir(), 'solvista-pristine-gulls.html');
writeFileSync(PRIST, execFileSync('git', ['-C', REPO, 'show', 'HEAD:solvista.html']));

const SEEDS = [7, 42];
const WARP = 61;
const FRAMES = [['day', 0.35], ['night', 0.90]];
const R = 5;                    /* half-box: 11x11 px per hex (gulls sit inshore of the edge) */
const THR = 14;                 /* per-pixel euclidean RGB change that counts */
const WAVET = 12.3;             /* pin the idle bob to one phase in both builds */

async function sample(page, fileUrl, seed, t) {
  await page.goto(`${fileUrl}?seed=${seed}&warp=${WARP}&t=${t}`);
  await page.waitForTimeout(400);
  return page.evaluate(({ R, WAVET }) => {
    playing = false; waveT = WAVET;
    for (const a of [vehicles, bikes, trams, trucks, peds, boats, ferries, freighters,
      birds, shuttles, dogs, kites, surfers, dolphins, whales, herons, kayaks, joggers,
      deer, clouds, balloons, copters]) a.length = 0;
    render();
    const dpr = cvs.width / cvs.clientWidth, g = ctx;
    /* host hexes: beach cells that touch open water — exactly where the gulls draw */
    const beach = [], road = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)]; if (!c) continue;
      if (c.t === T.BEACH) {
        let water = false;
        for (const [dx, dy] of nbrDirs(y)) { const e = cellAt(x + dx, y + dy); if (e && e.t === T.WATER && !e.riv) { water = true; break; } }
        if (water) beach.push([x, y]);
      } else if (c.t === T.ROAD) road.push([x, y]);
    }
    const box = list => list.map(([x, y]) => { const [cx, cy] = ctr(x, y); return [cx * scale + offX, cy * scale + offY]; })
      .filter(([sx, sy]) => sx > 50 && sx < innerWidth - 50 && sy > 50 && sy < innerHeight - 50)
      .slice(0, 300)
      .map(([sx, sy]) => Array.from(g.getImageData(Math.round(sx * dpr) - R, Math.round(sy * dpr) - R, R * 2 + 1, R * 2 + 1).data));
    return { BEACH: box(beach), ROAD: box(road), lit: LITAMT };
  }, { R, WAVET });
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
const PATCHED = pathToFileURL(ROOT).href, PRISTINE = pathToFileURL(PRIST).href;

console.log('\nTIDELINE SHOREBIRDS — patched vs pristine HEAD, same frozen frame (waveT pinned)');
console.log('changed-pixel fraction (per-pixel |dRGB| > ' + THR + '), seeds 7/42, warp 61\n');
console.log('  seed  frame    BEACH changed   ROAD control(=0)   LITAMT   beach/road hexes');
console.log('  ' + '-'.repeat(74));

for (const seed of SEEDS) {
  for (const [fname, t] of FRAMES) {
    const pa = await sample(p, PATCHED, seed, t);
    const pr = await sample(p, PRISTINE, seed, t);
    const f = changed(pa.BEACH, pr.BEACH), r = changed(pa.ROAD, pr.ROAD);
    console.log(`  ${seed}   ${fname.padEnd(7)}  ${(f.frac * 100).toFixed(2).padStart(6)}%        ` +
      `${(r.frac * 100).toFixed(2).padStart(5)}%          ${pa.lit.toFixed(2)}     ${f.hexes}/${r.hexes}`);
  }
}
await b.close();
console.log('\nPASS = BEACH moves in DAY (gulls appear), ~0 at NIGHT (gate off, byte-identical),');
console.log('       ROAD ~0 in both (change confined to the water-facing beach margin).');
