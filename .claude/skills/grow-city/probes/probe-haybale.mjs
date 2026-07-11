#!/usr/bin/env node
/* probe-haybale.mjs — do iter 174's rolled hay bales appear ONLY in the weeks
 * after the harvest cut, and ONLY on the fields?
 *
 * The change scatters 1-3 golden bales on a FARM hex when its per-cell phase `ph`
 * is in the post-cut stubble window (0.82..0.95) — draw-only, hashCell-placed, no
 * rng()/terrain. So the iter-161 law applies: diff PATCH (working tree) vs BASE
 * (git HEAD) over each FARM hex at the SAME calendar, and EVERY differing pixel IS
 * a bale, by construction (the crop colour reads the same `year` in both builds).
 *
 *   HOST     = FARM cells, sampled in-page.
 *   HARVEST  = year fraction ~0.88 (autumn): most fields fall in the bale window
 *              -> FARM must diff > 0.
 *   SUMMER   = year fraction ~0.40 (calendar control): no field is post-cut, so
 *              NO bale is drawn in either build -> FARM diff must be ~0. This is
 *              the strong control: same tile, different calendar, isolates the
 *              bale from the crop.
 *   ROAD     = tile control the change never touches -> ~0 at either calendar.
 * The clock is frozen (playing=false) and the city rebuilt in-page (iter-163(c))
 * so the RAF's wall-clock tick jitter can't diverge PATCH from BASE.
 *
 *   node probe-haybale.mjs
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
const BASE = join(tmpdir(), 'solvista-haybale-base.html');
writeFileSync(BASE, HEADSRC);

const SEEDS = [7, 42, 1234];
const WARP = 61;
const FRAMES = [['harvest', 2035.88], ['summer', 2035.40]];
const RB = 10, RT = 10;   /* bales sit on the tile face; a small box around centre */
const THR = 12;

async function sample(page, fileUrl, seed, yr) {
  await page.goto(`${fileUrl}?seed=${seed}&warp=${WARP}&t=0.35`);
  await page.waitForTimeout(400);
  return page.evaluate(({ WARP, YR, RB, RT }) => {
    genWorld(seedNum); __warp(WARP); __setYear(YR); __setTime(0.35);
    playing = false; if (typeof waveT !== 'undefined') waveT = 12.3;
    for (const a of [vehicles, bikes, trams, trucks, peds, boats, ferries, freighters,
      birds, shuttles, dogs, kites, surfers, dolphins, whales, herons, kayaks, joggers,
      deer, clouds, balloons, copters]) if (a) a.length = 0;
    render();
    const dpr = cvs.width / cvs.clientWidth, g = ctx;
    const farm = [], road = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)]; if (!c) continue;
      if (c.t === T.FARM) farm.push([x, y]);
      else if (c.t === T.ROAD) road.push([x, y]);
    }
    const box = list => list.map(([x, y]) => { const [cx, cy] = ctr(x, y); return [cx * scale + offX, cy * scale + offY]; })
      .filter(([sx, sy]) => sx > 60 && sx < innerWidth - 60 && sy > 90 && sy < innerHeight - 30)
      .slice(0, 300)
      .map(([sx, sy]) => Array.from(g.getImageData(Math.round(sx * dpr) - RB, Math.round(sy * dpr) - RT, RB * 2 + 1, RT + RB + 1).data));
    return { FARM: box(farm), ROAD: box(road), nf: farm.length };
  }, { WARP, YR: yr, RB, RT });
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
  return px ? hit / px : 0;
}

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
const uPATCH = pathToFileURL(ROOT).href, uBASE = pathToFileURL(BASE).href;

console.log('\nHAY BALES — PATCH(working) vs BASE(HEAD) over each FARM hex (iter-161 diff law)');
console.log('changed-pixel fraction (per-pixel |dRGB| > ' + THR + '), seeds 7/42/1234, warp 61\n');
console.log('  seed  frame     FARM           ROAD ctl(=0)   nFarm');
console.log('  ' + '-'.repeat(56));

let ok = true;
for (const seed of SEEDS) {
  const row = {};
  for (const [fname, yr] of FRAMES) {
    const pa = await sample(p, uPATCH, seed, yr);
    const bs = await sample(p, uBASE, seed, yr);
    const farm = changed(pa.FARM, bs.FARM), road = changed(pa.ROAD, bs.ROAD);
    row[fname] = farm;
    if (road > 0.002) ok = false;
    console.log(`  ${seed}  ${fname.padEnd(8)}  ${(farm * 100).toFixed(3).padStart(7)}%       ${(road * 100).toFixed(3).padStart(6)}%      ${pa.nf}`);
  }
  if (!(row.harvest > 0)) ok = false;          /* bales must appear at harvest */
  if (row.summer > 0.002) ok = false;          /* and NOT in summer */
}
await b.close();
console.log('\nPASS = FARM moves at HARVEST (>0) but NOT at SUMMER (~0), ROAD control ~0 both.');
console.log(ok ? 'VERDICT: PASS' : 'VERDICT: FAIL');
process.exit(ok ? 0 : 1);
