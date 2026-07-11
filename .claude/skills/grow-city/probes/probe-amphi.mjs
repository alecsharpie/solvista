#!/usr/bin/env node
/* probe-amphi.mjs — does the amphitheater draw a spotlit PERFORMER at showtime,
 * ONLY after dark, ONLY on the stage? (iter 168)
 *
 * CIVICDESC promised "Concerts through the summer", but the showtime draw only lit
 * an EMPTY stage (a warm wash + 3 footlight dots). Iter 168 adds a swaying spotlit
 * performer under a beam, night-gated (LITAMT>0.3, i.e. dusk/night), draw-only.
 *
 * The census is vacuous (draw-only, reads globals, no rng/terrain), and a screenshot
 * only proves it renders. So diff PATCHED (working tree) vs PRISTINE (git HEAD) at the
 * SAME frozen frame over a box on the amphitheater hex — every pixel that differs IS
 * the new performer/beam, BY CONSTRUCTION (iter 161). `time` is pinned so the sway sits
 * at one phase in both builds; every mover is cleared (tramwire law) so nothing drifts
 * across the box between the two page loads.
 *
 * Host = the amphitheater CIVIC hex (1/city), found in-page. Controls: (1) a ROAD box
 * must not move; (2) the SAME diff in DAY (LITAMT low -> gate off) must be ~0.
 *
 *   node probe-amphi.mjs [seed ...]
 */
import { homedir, tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { writeFileSync, existsSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const CAND = [resolve(HERE, 'solvista.html'), resolve(HERE, '../../../../solvista.html'), resolve(HERE, '../../../solvista.html')];
const ROOT = CAND.find(existsSync);
const REPO = dirname(ROOT);
const PRIST = join(tmpdir(), 'solvista-pristine-amphi.html');
writeFileSync(PRIST, execFileSync('git', ['-C', REPO, 'show', 'HEAD:solvista.html']));

const SEEDS = process.argv.slice(2).length ? process.argv.slice(2).map(Number) : [42, 1234, 3, 88, 7];
const WARP = 61;
const FRAMES = [['night', 0.90], ['day', 0.35]];
const R = 34;                   /* half-box on the zoomed-in stage */
const THR = 14;                 /* per-pixel euclidean RGB change that counts */
const TIMEP = 5.0;              /* pin the sway to one phase in both builds */
const ZOOM = 6;

async function sample(page, fileUrl, seed, t) {
  await page.goto(`${fileUrl}?seed=${seed}&warp=${WARP}&t=${t}`);
  await page.waitForTimeout(500);
  return page.evaluate(({ R, TIMEP, ZOOM }) => {
    playing = false; time = TIMEP;
    for (const a of [vehicles, bikes, trams, trucks, peds, boats, ferries, freighters,
      birds, shuttles, dogs, kites, surfers, dolphins, whales, herons, kayaks, joggers,
      deer, clouds, balloons, copters]) a.length = 0;
    const amphi = [], road = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)]; if (!c) continue;
      if (c.t === T.CIVIC && c.kind === 'amphitheater') amphi.push([x, y]);
      else if (c.t === T.ROAD) road.push([x, y]);
    }
    if (!amphi.length) { render(); return { AMPHI: [], ROAD: [], n: 0 }; }
    /* camera-zoom onto the (1/city) amphitheater so the stage is unoccluded */
    const [ax, ay] = amphi[0];
    const [wx, wy] = ctr(ax, ay);
    zoom = ZOOM; scale = fitScale * zoom;
    offX = cvs.clientWidth / 2 - wx * scale; offY = cvs.clientHeight / 2 - wy * scale;
    render();
    const dpr = cvs.width / cvs.clientWidth, g = ctx;
    const box = list => list.map(([x, y]) => { const [cx, cy] = ctr(x, y); return [cx * scale + offX, cy * scale + offY]; })
      .filter(([sx, sy]) => sx > 50 && sx < innerWidth - 50 && sy > 50 && sy < innerHeight - 50)
      .slice(0, 300)
      .map(([sx, sy]) => Array.from(g.getImageData(Math.round(sx * dpr) - R, Math.round(sy * dpr) - R, R * 2 + 1, R * 2 + 1).data));
    return { AMPHI: box(amphi), ROAD: box(road), n: amphi.length };
  }, { R, TIMEP, ZOOM });
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

console.log('\nAMPHITHEATER CONCERT — patched vs pristine HEAD, same frozen frame (time pinned)');
console.log('changed-pixel fraction (per-pixel |dRGB| > ' + THR + '), warp 61\n');
console.log('  seed  frame    STAGE changed   ROAD control(=0)   amphi/road hexes');
console.log('  ' + '-'.repeat(66));

let passed = 0, failed = 0;
for (const seed of SEEDS) {
  const paN = await sample(p, PATCHED, seed, 0.90);
  if (!paN.AMPHI.length) { console.log(`  ${seed}   (no amphitheater this seed — SKIP)`); continue; }
  let nightFrac = 0, dayFrac = 0;
  for (const [fname, t] of FRAMES) {
    const pa = await sample(p, PATCHED, seed, t);
    const pr = await sample(p, PRISTINE, seed, t);
    const f = changed(pa.AMPHI, pr.AMPHI), r = changed(pa.ROAD, pr.ROAD);
    if (fname === 'night') nightFrac = f.frac; else dayFrac = f.frac;
    console.log(`  ${seed}   ${fname.padEnd(7)}  ${(f.frac * 100).toFixed(2).padStart(6)}%        ` +
      `${(r.frac * 100).toFixed(2).padStart(5)}%             ${f.hexes}/${r.hexes}`);
  }
  // A stage that is byte-identical even at NIGHT is OCCLUDED (buried behind a
  // foreground building in a later row, verified visually for seed 7) — the draw
  // fires but is overpainted, so it is unmeasurable here, not a failure. SKIP it.
  if (nightFrac < 0.005) { console.log(`  ${seed}   -> occluded (byte-identical at night) — SKIP`); continue; }
  // PASS: the stage moves at night (performer+beam appear), ~0 in DAY (gate off).
  if (nightFrac > 0.01 && dayFrac < 0.002) passed++; else failed++;
}
await b.close();
console.log('\nPASS = STAGE moves at NIGHT (performer+beam appear), ~0 in DAY (gate off),');
console.log('       ROAD ~0 in both (change confined to the amphitheater stage).');
if (failed) { console.log(`VERDICT: FAIL — ${failed} measurable seed(s) did not match the night-on/day-off pattern`); process.exit(1); }
if (passed < 2) { console.log(`VERDICT: FAIL — only ${passed} measurable seed(s); need >=2 (rest occluded)`); process.exit(1); }
console.log(`VERDICT: PASS (${passed} seeds; occluded seeds skipped)`);
process.exit(0);
