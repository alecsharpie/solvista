#!/usr/bin/env node
/* probe-cabinsway.mjs — do the cable-car cabins ROCK on their hangers in the
 * breeze, while nothing that should be still moves?
 *
 * This is a MOTION claim, so it needs a TEMPORAL probe (iter-134 law): a frozen
 * two-render diff is blind to cadence. So we freeze the SIM (playing=false — cb.p
 * and every cabin's rope position stay put) and step ONLY the animation clock
 * `time` across a full cycle, re-rendering at each step. The cabin's sway is a
 * pure function of `time`, so its stamped screen-x (`cb._sx`, what the sway edit
 * moves) must OSCILLATE; its screen-y (`cb._sy`) must NOT (the sway is horizontal);
 * and a monorail TRAIN's `_sx` is the control — trains don't sway and the sim is
 * frozen, so its `_sx` must stay pinned.
 *
 *   CABIN dx   = peak-to-peak of cb._sx over the clock cycle   -> should be > 1.5
 *   CABIN dy   = peak-to-peak of cb._sy (control)              -> ~0
 *   TRAIN dx   = peak-to-peak of tr._sx (control)              -> ~0
 *
 * No PATCH/BASE diff: the claim is about a single build's behaviour over time.
 *
 *   node probe-cabinsway.mjs
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const CAND = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html'),
  resolve(HERE, '../../../solvista.html'), resolve(HERE, 'solvista-grow/solvista.html')];
const ROOT = CAND.find(existsSync);

const SEEDS = [7, 42, 1234];
const WARP = 61;
const TIMES = Array.from({ length: 48 }, (_, i) => i * 0.3);   /* 0 .. 14.1s of clock */

async function sample(page, fileUrl, seed) {
  await page.goto(`${fileUrl}?seed=${seed}`);
  await page.waitForTimeout(200);
  return page.evaluate(({ seed, warp, TIMES }) => {
    genWorld(seed); __warp(warp);
    Math.random = () => 0.5; playing = false; waveT = 3.0;
    for (const a of [vehicles, bikes, trams, trucks, peds, boats, ferries, freighters,
      birds, shuttles, dogs, kites, surfers, dolphins, whales, herons, kayaks, joggers,
      deer, clouds, balloons, copters]) a.length = 0;
    /* stable ids for every cabin and every running train */
    const cabId = [], trnId = [];
    gonds.forEach((g, li) => { if (g.path && g.path.length > 1) g.cabins.forEach((cb, j) => cabId.push([li, j])); });
    monos.forEach((m, li) => { if (m.closed) m.trains.forEach((tr, j) => trnId.push([li, j])); });
    const cab = cabId.map(() => ({ xs: [], ys: [] })), trn = trnId.map(() => ({ xs: [] }));
    for (const t of TIMES) {
      time = t; render();
      cabId.forEach(([li, j], k) => { const cb = gonds[li].cabins[j]; cab[k].xs.push(cb._sx); cab[k].ys.push(cb._sy); });
      trnId.forEach(([li, j], k) => { const tr = monos[li].trains[j]; trn[k].xs.push(tr._sx); });
    }
    const range = a => a.length ? Math.max(...a) - Math.min(...a) : 0;
    return {
      cabDx: cab.map(c => range(c.xs)),
      cabDy: cab.map(c => range(c.ys)),
      trnDx: trn.map(c => range(c.xs)),
      nCab: cabId.length, nTrn: trnId.length,
    };
  }, { seed, warp: WARP, TIMES });
}

const med = a => { if (!a.length) return 0; const s = [...a].sort((x, y) => x - y); return s[s.length >> 1]; };
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
const u = pathToFileURL(ROOT).href;

console.log('\nCABLE-CAR SWAY — cabin _sx oscillation over a frozen-sim clock cycle');
console.log('peak-to-peak of stamped screen coords over ' + TIMES.length + ' clock samples, warp 61\n');
console.log('  seed   nCab  CABIN dx (min/med/max)   CABIN dy ctl(=0)   nTrn  TRAIN dx ctl(=0)');
console.log('  ' + '-'.repeat(76));

let ok = true;
for (const seed of SEEDS) {
  const s = await sample(p, u, seed);
  const dxMin = Math.min(...s.cabDx), dxMed = med(s.cabDx), dxMax = Math.max(...s.cabDx);
  const dyMax = s.cabDy.length ? Math.max(...s.cabDy) : 0;
  const trMax = s.trnDx.length ? Math.max(...s.trnDx) : 0;
  const pass = dxMin > 1.5 && dyMax < 0.05 && trMax < 0.05 && s.nTrn > 0;
  ok = ok && pass;
  console.log(`  ${String(seed).padEnd(5)}  ${String(s.nCab).padStart(3)}   ` +
    `${dxMin.toFixed(2)} / ${dxMed.toFixed(2)} / ${dxMax.toFixed(2)}        ` +
    `${dyMax.toFixed(3).padStart(6)}           ${String(s.nTrn).padStart(3)}   ${trMax.toFixed(3).padStart(6)}   ${pass ? 'PASS' : 'FAIL'}`);
}
await b.close();
console.log('\n' + (ok ? 'VERDICT: PASS' : 'VERDICT: FAIL') +
  ' — every cabin sways (dx>1.5), sways only sideways (dy~0), and the frozen train (dx~0) confirms the sim is still.');
process.exit(ok ? 0 : 1);
