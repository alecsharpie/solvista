#!/usr/bin/env node
/* probe-taxi — does a car flagged a TAXI now render as a taxi (a lemon-yellow body,
 * a checker band, a roof sign) rather than as a plain car? (iter 164, Transport ×
 * New element)
 *
 * ~1 in 6 spawned cars is now `taxi:true` (a Math.random flag, no rng() — the seeded
 * CA stream is byte-identical, so the census is vacuous and this probe is the gate).
 * The taxi draw overrides the body colour to `cab` (a new lemon-yellow palette entry)
 * and adds a checker band + a lit roof sign. Draw-only, no rng()/hashCell/tick.
 *
 * Vehicles are only a few pixels across at fit zoom, so we measure the change by a
 * build-vs-HEAD |ΔRGB| diff (137's controlled placement: clear the live movers and
 * PLACE identical cars at spread-out ROAD cells, all `c:'teal'`, heading east). To
 * keep the control free of any neighbouring-taxi bleed, the two are measured in
 * SEPARATE scenes:
 *
 *   TARGET scene = every placed car is `taxi:true`. patched recolours each body
 *                  teal->cab-yellow and adds the checker+sign, while HEAD (which
 *                  ignores the flag) draws a plain teal car — so every taxi box
 *                  differs a lot from HEAD.
 *   CONTROL scene = every placed car is `taxi:false`. The car draw is identical in
 *                   both builds, so patched === HEAD (~0) — proves the change is
 *                   confined to the taxi flag and touches no other car.
 *
 * Freezes the sim + pins time/waveT (same-frame-control law, 109) so nothing moves.
 *
 *   node probe-taxi.mjs [seed ...]
 */
import { homedir, tmpdir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync, mkdtempSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const CAND = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html')];
const ART = CAND.find(existsSync);
const REPO = dirname(ART);
const SEEDS = process.argv.slice(2).filter(a => !a.startsWith('-')).map(Number);
const seeds = SEEDS.length ? SEEDS : [7, 42];
const q = s => `?seed=${s}&warp=61&t=0.30&tide=0.59&year=2035.62`;

const tmp = mkdtempSync(join(tmpdir(), 'taxi-'));
const HEAD = join(tmp, 'head.html');
writeFileSync(HEAD, execFileSync('git', ['-C', REPO, 'show', 'HEAD:solvista.html']));

function stats(a, b) { /* fraction of box pixels that visibly changed (|ΔRGB|>8) */
  let ch = 0; const n = a.length / 4;
  for (let k = 0; k < n; k++) {
    const i = k * 4;
    const px = (Math.abs(a[i] - b[i]) + Math.abs(a[i + 1] - b[i + 1]) + Math.abs(a[i + 2] - b[i + 2])) / 3;
    if (px > 8) ch++;
  }
  return ch / n;
}
async function grab(page, sx, sy) {
  return page.evaluate(([sx, sy]) => {
    const cv = document.querySelector('canvas');
    const g = cv.getContext('2d');
    const dpr = cv.width / cv.clientWidth;
    const wx = Math.round(9 * dpr), wy = Math.round(7 * dpr);
    const px = Math.round(sx * dpr), py = Math.round((sy - 4) * dpr);
    return Array.from(g.getImageData(px - wx, py - wy, wx * 2, wy * 2).data);
  }, [sx, sy]);
}
/* place N identical cars (all taxi=flag) at spread-out ROAD cells heading east.
 * The city is REBUILT in-page (genWorld+__warp, 163's law) so it is byte-identical
 * between the HEAD and ART loads regardless of RAF timing — without it the two builds
 * render slightly different cities and the terrain around the boxes pollutes the
 * plain-car control. */
async function placed(page, url, seed, flag) {
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForFunction('window.__find');
  return page.evaluate(([seed, flag]) => {
    genWorld(seed); window.__warp(61);       /* deterministic city, ~2035 */
    playing = false; window.__setTime(0.30); waveT = 3.0;   /* daytime, frozen */
    vehicles.length = 0; bikes.length = 0; trams.length = 0; trucks.length = 0;
    peds.length = 0; dogs.length = 0; joggers.length = 0; kites.length = 0;
    const roads = window.__find('ROAD').filter((_, i) => i % 7 === 0).slice(0, 40);
    for (const r of roads) vehicles.push({ x: r.x, y: r.y, nx: r.x + 1, ny: r.y, p: 0.5, sp: 0.6, kind: 'car', taxi: flag, c: 'teal' });
    render();
    return roads.map(r => [r.sx, r.sy]);
  }, [seed, flag]);
}
/* mean box-%changed (HEAD vs ART) for a scene where every placed car has `flag` */
async function measure(page, s, flag) {
  const pos = await placed(page, pathToFileURL(HEAD).href + q(s), s, flag);
  const H = [];
  for (const [sx, sy] of pos) H.push(await grab(page, sx, sy));
  await placed(page, pathToFileURL(ART).href + q(s), s, flag);
  let ch = 0;
  for (let i = 0; i < pos.length; i++) ch += stats(await grab(page, ...pos[i]), H[i]);
  return { n: pos.length, ch: ch / (pos.length || 1) };
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

console.log('seed | placed | taxi %changed vs HEAD | plain-car control %changed');
console.log('─'.repeat(64));
const agg = { t: [], c: [] };
for (const s of seeds) {
  const T = await measure(page, s, true);
  const C = await measure(page, s, false);
  agg.t.push(T.ch); agg.c.push(C.ch);
  console.log(`${String(s).padEnd(4)} | ${String(T.n).padStart(6)} | ${(T.ch * 100).toFixed(1).padStart(20)}% | ${(C.ch * 100).toFixed(2).padStart(18)}%`);
}
await browser.close();
const mean = a => a.reduce((s, v) => s + v, 0) / a.length;
const T = mean(agg.t), C = mean(agg.c);
console.log('─'.repeat(64));
console.log(`taxi box: ${(T * 100).toFixed(1)}% of pixels changed vs HEAD  ·  plain-car control ${(C * 100).toFixed(2)}%`);
console.log(`VERDICT: ${T > 0.02 && T > C * 10 && C < 0.005 ? 'PASS' : 'FAIL'}  (taxi >2% of box changed, >10x the plain-car control, control<0.5%)`);
