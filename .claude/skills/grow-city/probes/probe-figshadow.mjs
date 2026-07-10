#!/usr/bin/env node
/* probe-figshadow — do the walking figures (peds/dogs/joggers) now cast the same
 * house-style ground contact shadow every vehicle already casts, at the FEET and
 * nowhere else? (iter 137, People & activity × Polish)
 *
 * The peds, dogs and joggers were the only moving things in the city with no
 * shadS() contact shadow — cars/bikes have had one for many iterations — so they
 * read as floating a hair above the pavement. The fix draws shadS() at each
 * figure's feet, before the legs. Draw-only, no rng(), no new state: the census
 * is vacuous, so this probe is the gate.
 *
 * Why a CONTROLLED placement, not the live figures: peds/dogs are a live,
 * frame-timing-dependent system — the array's composition, order AND positions
 * drift a nondeterministic amount over the handful of real-time frames between
 * load and freeze, so the SAME seed renders a ped[0] ~20px apart on two loads. A
 * build-vs-build pixel diff at fixed coords is hopeless there (HEAD-vs-HEAD noise
 * floor alone was |Δ|~9). So we test the DRAW FUNCTIONS directly and deterministic-
 * ally: clear the live figures, place a fixed set of peds at chosen flat-tile (ROAD)
 * centres — identical objects in both builds — freeze the clocks, and render. The
 * draw code is the same whether a ped is live or placed.
 *
 *   TARGET box  = a placed figure's feet: patched must be DARKER than HEAD (the
 *                 new shadS), Δlum < 0, |ΔRGB| clearly > 0.
 *   CONTROL box = a ROAD cell with NO figure on it: patched ≈ HEAD (~0) — proves
 *                 the change is confined to figure feet, not a global dim.
 *
 * Freezes the sim + pins time/waveT (same-frame-control law, iter 109) so the gait
 * bob is fixed and identical in both builds.
 *
 *   node probe-figshadow.mjs [seed ...]
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

const tmp = mkdtempSync(join(tmpdir(), 'figshadow-'));
const HEAD = join(tmp, 'head.html');
writeFileSync(HEAD, execFileSync('git', ['-C', REPO, 'show', 'HEAD:solvista.html']));

/* mean |ΔRGB| and mean signed luminance delta (patched − head) over two RGBA arrays */
function stats(a, b) {
  let d = 0, lum = 0, n = a.length / 4;
  for (let k = 0; k < n; k++) {
    const i = k * 4;
    d += (Math.abs(a[i] - b[i]) + Math.abs(a[i + 1] - b[i + 1]) + Math.abs(a[i + 2] - b[i + 2])) / 3;
    lum += (0.299 * a[i] + 0.587 * a[i + 1] + 0.114 * a[i + 2]) - (0.299 * b[i] + 0.587 * b[i + 1] + 0.114 * b[i + 2]);
  }
  return { d: d / n, lum: lum / n };
}
/* a TIGHT band centred on the feet: the shadow is a flat ~2px-wide, 1px-tall
 * contact smudge (TW:TH = 2:1 iso squash), so a wide box would dilute it to
 * nothing. 5 px either side, 2 px above/below the feet row. */
async function grab(page, sx, sy) {
  return page.evaluate(([sx, sy]) => {
    const cv = document.querySelector('canvas');
    const g = cv.getContext('2d');
    const dpr = cv.width / cv.clientWidth;
    const wx = Math.round(4 * dpr), wy = Math.round(1 * dpr);
    const px = Math.round(sx * dpr), py = Math.round(sy * dpr);
    return Array.from(g.getImageData(px - wx, py - wy, wx * 2, wy * 2).data);
  }, [sx, sy]);
}

/* Load, freeze, and REPLACE the live figures with a fixed set of peds standing at
 * the centres of the first N spread-out ROAD cells; return their screen coords plus
 * an equal number of bare (no-figure) ROAD control coords. Deterministic in both
 * builds because we set every field ourselves. */
async function placed(page, url) {
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForFunction('window.__find');
  return page.evaluate(() => {
    playing = false; time = 5.0; waveT = 3.0;
    /* clear every live mover — vehicles/bikes/trams drift a nondeterministic amount
     * over roads between two loads and would poison a fixed-coord diff. */
    vehicles.length = 0; bikes.length = 0; trams.length = 0; trucks.length = 0;
    peds.length = 0; dogs.length = 0; joggers.length = 0; kites.length = 0;
    const roads = window.__find('ROAD').filter((_, i) => i % 7 === 0).slice(0, 60);
    const half = (roads.length / 2) | 0;
    const stand = roads.slice(0, half), bare = roads.slice(half);
    for (const r of stand) peds.push({ x: r.x, y: r.y, ox: 0, oy: 0, tx: 0, ty: 0, ph: 0, c: 'teal', kid: 0, nite: 0 });
    render();
    return { feet: stand.map(r => [r.sx, r.sy]), ctrl: bare.map(r => [r.sx, r.sy]) };
  });
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

console.log('seed | figs |  feet |ΔRGB|  feet Δlum |  bare-road control |ΔRGB|');
console.log('─'.repeat(66));
const agg = { d: [], lum: [], c: [] };

for (const s of seeds) {
  const pos = await placed(page, pathToFileURL(HEAD).href + q(s));
  const feetH = [], ctrlH = [];
  for (const [sx, sy] of pos.feet) feetH.push(await grab(page, sx, sy));
  for (const [sx, sy] of pos.ctrl) ctrlH.push(await grab(page, sx, sy));

  await placed(page, pathToFileURL(ART).href + q(s));
  let dS = 0, lS = 0, cS = 0;
  for (let i = 0; i < pos.feet.length; i++) { const f = stats(await grab(page, ...pos.feet[i]), feetH[i]); dS += f.d; lS += f.lum; }
  for (let i = 0; i < pos.ctrl.length; i++) { const c = stats(await grab(page, ...pos.ctrl[i]), ctrlH[i]); cS += c.d; }
  const nF = pos.feet.length || 1, nC = pos.ctrl.length || 1;
  const D = dS / nF, L = lS / nF, C = cS / nC;
  agg.d.push(D); agg.lum.push(L); agg.c.push(C);
  console.log(`${String(s).padEnd(4)} | ${String(pos.feet.length).padStart(4)} | ${D.toFixed(2).padStart(9)}  ${L.toFixed(2).padStart(8)}  | ${C.toFixed(3).padStart(9)}`);
}

await browser.close();
const mean = a => a.reduce((s, v) => s + v, 0) / a.length;
const D = mean(agg.d), L = mean(agg.lum), C = mean(agg.c);
console.log('─'.repeat(66));
console.log(`feet: mean |ΔRGB| ${D.toFixed(2)}  ·  mean Δlum ${L.toFixed(2)} (negative = darker)  ·  bare-road control |ΔRGB| ${C.toFixed(3)}`);
console.log(`VERDICT: ${L < -0.6 && -L > C * 3 && C < 0.3 ? 'PASS' : 'FAIL'}  (feet Δlum<-0.6, darkening >3x the bare-road control, control <0.3)`);
