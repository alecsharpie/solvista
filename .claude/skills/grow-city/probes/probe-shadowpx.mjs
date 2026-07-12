#!/usr/bin/env node
/* ITER 225 — HOW FAR DOES A SHADOW ACTUALLY MOVE, IN THE PIXELS A VIEWER HAS?
 *
 * The shadow-layer centroid probe came back with the WRONG SIGN at evening and an
 * ink ratio of 2.5x where the geometry predicts 1.2x. Both are the same artifact: an
 * ink-weighted centroid over the whole city REWEIGHTS when shadows gain ink unevenly
 * (a shadow on bright sand contributes far more ink than one on dark asphalt), so it
 * measures reweighting, not displacement. Wrong instrument.
 *
 * So measure the throw in the ONLY unit that decides whether this feature exists for
 * a viewer: DEVICE PIXELS on screen (iter 205 -- state the claim in the viewer's
 * units). Wrap ctx.ellipse inside shadS and record where the shadow is actually
 * centred, in device space (ctx.getTransform() at draw time, so the camera is
 * accounted for and the probe needs no knowledge of it -- iter 203).
 *
 * This is NOT grading my own homework (the 205 sin): the design constant is in
 * shadow-radii; the question is what that is worth in PIXELS, and whether a shadow
 * that moves N px while being M px wide is something anyone can see. A sub-pixel
 * ornament reads as a smudge, not a mark (iters 203/215).
 */
import { homedir, tmpdir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync, writeFileSync, mkdtempSync } from 'node:fs';
import { execSync } from 'node:child_process';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const CAND = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html')];
const ART = CAND.find(f => existsSync(f));
const ROOT = dirname(ART);

const TMP = mkdtempSync(join(tmpdir(), 'shadowpx-'));
const HEADF = join(TMP, 'head.html');
writeFileSync(HEADF, execSync(`git -C "${ROOT}" show HEAD:solvista.html`, { maxBuffer: 1 << 28 }));

const HOURS = [
  { name: 'morning', t: 0.16 },
  { name: 'NOON',    t: 0.415 },
  { name: 'evening', t: 0.68 },
  { name: 'night',   t: 0.92 },
];
/* ZOOM 1 = the artifact's own fit zoom (what the diorama loads at). */
const ZOOMS = [1, 3, 5.5];
const browser = await chromium.launch();

async function grab(file, seed, t, zoom) {
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 1 });
  await page.addInitScript(() => {
    let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  });
  page.on('pageerror', e => console.error('PAGE ERROR:', e.message));
  await page.goto(pathToFileURL(file).href);
  await page.waitForTimeout(400);
  return await page.evaluate(({ seed, t, zoom }) => {
    playing = false;
    genWorld(seed); __warp(61); __setYear(2035.62); __setTime(t);
    time = 0; waveT = 0;
    scale *= zoom;                       /* the artifact's own camera, really magnified */
    /* capture every shadow the frame issues, in DEVICE space */
    const g = cvs.getContext('2d'), realEll = g.ellipse.bind(g);
    const shots = [];
    let inShad = false;
    const keep = shadS;
    shadS = (cx, cy, r, a) => { inShad = true; keep(cx, cy, r, a); inShad = false; };
    g.ellipse = function (x, y, rx, ry, rot, s0, s1) {
      if (inShad) {
        const m = g.getTransform();
        shots.push({ x: m.a * x + m.c * y + m.e, rx: m.a * rx });   /* device x + device x-radius */
      }
      return realEll(x, y, rx, ry, rot, s0, s1);
    };
    render();
    g.ellipse = realEll; shadS = keep;
    return { n: shots.length, scale,
             xs: shots.map(s => s.x), rxs: shots.map(s => s.rx) };
  }, { seed, t, zoom });
}

console.log('\nITER 225 — how far does a shadow move, in the pixels a viewer actually has?');
console.log('throw = mean(patch shadow centre x) - mean(HEAD shadow centre x), DEVICE px.');
console.log('width = mean shadow x-RADIUS in device px. A throw far below the width is invisible.\n');

for (const seed of [42]) {
  for (const zoom of ZOOMS) {
    console.log(`SEED ${seed}  zoom x${zoom}`);
    console.log('    hour     shadows | HEAD rx | patch rx |   THROW px | throw / width');
    for (const H of HOURS) {
      const h = await grab(HEADF, seed, H.t, zoom);
      const p = await grab(ART, seed, H.t, zoom);
      /* Pair by INDEX and the arrays drift: the entity population wobbles by ~0.2%
         (2777 vs 2784 of ~2800) from load to load, and one missing shadow shifts
         every later index. So take the throw over the POPULATION, not per individual
         (iter 204): with ~2800 shadows drawn at identical places in both builds, a
         7-shadow wobble cannot move the mean, but a real throw moves all of them. */
      const n = h.n;
      const mean = a => a.reduce((s, v) => s + v, 0) / a.length;
      const thr = mean(p.xs) - mean(h.xs);
      const wob = Math.abs(h.n - p.n);
      const hrx = h.rxs.reduce((a, b) => a + b, 0) / h.n;
      const prx = p.rxs.reduce((a, b) => a + b, 0) / p.n;
      console.log(`    ${H.name.padEnd(8)} ${String(n).padStart(7)} | ` +
        `${hrx.toFixed(2).padStart(7)} | ${prx.toFixed(2).padStart(8)} | ` +
        `${thr.toFixed(2).padStart(10)} | ${(thr / hrx).toFixed(2).padStart(6)}` +
        `  (pop wobble ${wob})`);
    }
    console.log('');
  }
}
await browser.close();
