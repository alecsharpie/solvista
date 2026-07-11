#!/usr/bin/env node
/* probe-buslivery — does the bus now read as a BUS (a long window strip + a cream
 * livery band running the flank) rather than a plain long gold car? (iter 146,
 * Transport × Polish)
 *
 * Every other transit/utility vehicle has a kind-specific tell — the tram a cream
 * belt + trolley pole, the truck a tall container box — but the bus drew as the
 * generic prism, i.e. a gold car stretched to `long=0.30`. The fix adds two bandS()
 * bands on the bus body: a glass window strip (z 3.7..6.0) and a cream livery band
 * (z 2.5..3.2). Draw-only, no rng()/hashCell/tick — the census is vacuous, so this
 * probe is the gate.
 *
 * Why CONTROLLED placement (137's law): buses are live vehicles that drift a
 * nondeterministic amount over the road network between two page loads, so a
 * fixed-coord build-vs-build diff on live buses is hopeless. So we clear every live
 * mover and PLACE a fixed set of vehicles at chosen ROAD-cell centres, heading east
 * (alongX) at p=0.5 — identical objects in both builds — then freeze and render.
 *
 *   TARGET box  = a placed BUS body: patched must differ from HEAD (the new bands),
 *                 |ΔRGB| clearly > 0.
 *   CONTROL box = a placed CAR at another ROAD cell: the car draw is untouched, so
 *                 patched ≈ HEAD (~0) — proves the change is confined to the bus kind.
 *
 * Freezes the sim + pins time/waveT (same-frame-control law, iter 109) so nothing
 * moves between the two renders.
 *
 *   node probe-buslivery.mjs [seed ...]
 */
import { homedir, tmpdir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync, mkdtempSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const CAND = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html'), resolve(HERE, 'solvista.html')];
const ART = CAND.find(existsSync);
const REPO = dirname(ART);
const SEEDS = process.argv.slice(2).filter(a => !a.startsWith('-')).map(Number);
const seeds = SEEDS.length ? SEEDS : [7, 42];
const q = s => `?seed=${s}&warp=61&t=0.30&tide=0.59&year=2035.62`;

const tmp = mkdtempSync(join(tmpdir(), 'buslivery-'));
const HEAD = join(tmp, 'head.html');
writeFileSync(HEAD, execFileSync('git', ['-C', REPO, 'show', 'HEAD:solvista.html']));

/* over two RGBA arrays: mean |ΔRGB|, and the fraction of pixels that visibly
 * changed (|ΔRGB|>8) — the livery is a band of large per-pixel change diluted by
 * unchanged background in the body box, so the changed-fraction is the honest read. */
function stats(a, b) {
  let d = 0, ch = 0; const n = a.length / 4;
  for (let k = 0; k < n; k++) {
    const i = k * 4;
    const px = (Math.abs(a[i] - b[i]) + Math.abs(a[i + 1] - b[i + 1]) + Math.abs(a[i + 2] - b[i + 2])) / 3;
    d += px; if (px > 8) ch++;
  }
  return { d: d / n, ch: ch / n };
}
/* a box over the vehicle BODY: the bands run the flank (~ax*CW long, mid-height),
 * so centre on (cx, cy-3) and cover the footprint. */
async function grab(page, sx, sy) {
  return page.evaluate(([sx, sy]) => {
    const cv = document.querySelector('canvas');
    const g = cv.getContext('2d');
    const dpr = cv.width / cv.clientWidth;
    const wx = Math.round(11 * dpr), wy = Math.round(6 * dpr);
    const px = Math.round(sx * dpr), py = Math.round((sy - 3) * dpr);
    return Array.from(g.getImageData(px - wx, py - wy, wx * 2, wy * 2).data);
  }, [sx, sy]);
}

/* Load, freeze, clear live movers, and PLACE buses (target) + cars (control) at the
 * centres of spread-out ROAD cells, all heading east (alongX). Deterministic in both
 * builds because every field is set by hand. Returns their screen coords. */
async function placed(page, url) {
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForFunction('window.__find');
  return page.evaluate(() => {
    playing = false; time = 5.0; waveT = 3.0;
    vehicles.length = 0; bikes.length = 0; trams.length = 0; trucks.length = 0;
    peds.length = 0; dogs.length = 0; joggers.length = 0; kites.length = 0;
    const roads = window.__find('ROAD').filter((_, i) => i % 5 === 0).slice(0, 80);
    const half = (roads.length / 2) | 0;
    const busC = roads.slice(0, half), carC = roads.slice(half);
    const mk = (r, kind, c) => ({ x: r.x, y: r.y, nx: r.x + 1, ny: r.y, p: 0.5, sp: 0.6, kind, c });
    for (const r of busC) vehicles.push(mk(r, 'bus', 'gold'));
    for (const r of carC) vehicles.push(mk(r, 'car', 'teal'));
    render();
    return { bus: busC.map(r => [r.sx, r.sy]), car: carC.map(r => [r.sx, r.sy]) };
  });
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

console.log('seed | buses | bus %changed  |ΔRGB| |  car control %changed');
console.log('─'.repeat(60));
const agg = { bch: [], bd: [], cch: [] };

for (const s of seeds) {
  const pos = await placed(page, pathToFileURL(HEAD).href + q(s));
  const busH = [], carH = [];
  for (const [sx, sy] of pos.bus) busH.push(await grab(page, sx, sy));
  for (const [sx, sy] of pos.car) carH.push(await grab(page, sx, sy));

  await placed(page, pathToFileURL(ART).href + q(s));
  let bch = 0, bd = 0, cch = 0;
  for (let i = 0; i < pos.bus.length; i++) { const r = stats(await grab(page, ...pos.bus[i]), busH[i]); bch += r.ch; bd += r.d; }
  for (let i = 0; i < pos.car.length; i++) { cch += stats(await grab(page, ...pos.car[i]), carH[i]).ch; }
  const nB = pos.bus.length || 1, nC = pos.car.length || 1;
  const BCH = bch / nB, BD = bd / nB, CCH = cch / nC;
  agg.bch.push(BCH); agg.bd.push(BD); agg.cch.push(CCH);
  console.log(`${String(s).padEnd(4)} | ${String(pos.bus.length).padStart(5)} | ${(BCH * 100).toFixed(1).padStart(6)}%  ${BD.toFixed(2).padStart(6)}  | ${(CCH * 100).toFixed(2).padStart(9)}%`);
}

await browser.close();
const mean = a => a.reduce((s, v) => s + v, 0) / a.length;
const BCH = mean(agg.bch), BD = mean(agg.bd), CCH = mean(agg.cch);
console.log('─'.repeat(60));
console.log(`bus body: ${(BCH * 100).toFixed(1)}% of pixels changed (mean |ΔRGB| ${BD.toFixed(2)})  ·  car control ${(CCH * 100).toFixed(2)}% changed`);
console.log(`VERDICT: ${BCH > 0.06 && BCH > CCH * 5 && CCH < 0.02 ? 'PASS' : 'FAIL'}  (bus >6% of body pixels changed, >5x the car control, control<2%)`);
