#!/usr/bin/env node
/* Does the haul rope still read as a SCRATCH? (iter 203, Transport x Polish)
 *
 * Iter 202's step-back banked an unexplained cue: two agents, two seeds, both saw
 * "a thin dark line drawn OVER the towers/water", and 202 disproved the naive
 * cause. `probe-darkline` located it by construction: the aerial cable-car haul
 * rope, stroked col('ink',1.05) = #373128 (the darkest ink in the palette), fully
 * OPAQUE, at 0.5 DEVICE px at fit zoom, chaining 15-25 spans into an unbroken
 * 200-330px dark run across the sky and the open sea. A sub-pixel line at full ink
 * cannot antialias into a rope -- it rasterizes as a hard ragged scratch.
 *
 * The claim under test is NOT "the rope moved" (it didn't -- same catenary, same
 * pixels' worth of geometry). It is about how the rope RASTERIZES:
 *   (1) it is no longer a flat-opaque maximally-dark line  -> PEAK CONTRAST falls;
 *   (2) it has a body, so its ink is SPREAD not concentrated -> COVERAGE rises;
 *   (3) it answers the light -> a daylight GLINT (pixels LIGHTER than the
 *       background) exists by day and is absent at night, and absent in HEAD.
 *
 * ISOLATION. The rope is a WORLD-space draw inside the row loop, so a canvas
 * readback sees it truly (200's law bites only on screen-space draws, and the
 * rope's bbox is centre-right, nowhere near the placard's corner). The background
 * behind the rope is obtained WITHOUT source surgery: re-render the same build with
 * ctx.stroke() no-op'd whenever the call stack names drawGondAt. So each build
 * yields its own exact background, and rope pixels = diff(normal, suppressed).
 * That makes every number below a property of the ROPE alone, by construction.
 *
 * CONTROLS. (a) A full-frame HEAD-vs-PATCH diff must lie ENTIRELY inside the
 * cable's bbox -- if a single pixel outside it moved, the edit touched something
 * it had no business touching. (b) HEAD's glint count must be ~0 in both lights
 * (it has no light term beyond the global TINT), which is what makes PATCH's
 * day-only glint a real signal rather than a rendering artifact.
 *
 * Deterministic per 163(c)/(d) + 195(f) + 199 + a Math.random stub: genWorld+__warp in-page,
 * STARS cleared, flock nulled, waveT/time pinned -- an unchanged frame must read 0.
 *
 * !! WHAT THIS PROBE FOUND, AND WHY THE PATCH IT GRADED IS NOT IN THE TREE (iter 203).
 * The patch under test gave the rope a soft body + a lit "steel" core + a daylight glint. The
 * probe REFUTED it and it was reverted byte-identical, so run against a clean tree this script
 * now reports all-zeros. It is kept as the RIG (it grades any future change to the rope) and as
 * the record of the refutation:
 *     glint px       0 -> 0     on every seed and both lights -- the highlight is a DEAD DRAW:
 *                               at 0.5 device px the core and the highlight land in the SAME
 *                               sub-pixel, so a thin dark line cannot carry a lit top edge.
 *     peak contrast  0.33 -> 0.34  UNCHANGED -- the one measure of "reads as a hard scratch"
 *                               did not move, while coverage rose 419 -> 567 px. Adding a halo
 *                               under a thin dark line makes it MORE prominent, not less.
 * => if a future lap wants to soften this rope, the only lever that touches peak contrast is
 *    the CORE's own alpha/width. A body/halo is additive and works against you.
 */
import { homedir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync, writeFileSync, readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const CAND = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html')];
const ART = CAND.find(f => existsSync(f));
const ROOT = dirname(ART);

/* PATCH = the working tree; HEAD = pristine, straight out of git */
const PATCH = join(ROOT, '.probe-rope-patch.html');
const HEAD = join(ROOT, '.probe-rope-head.html');
writeFileSync(PATCH, readFileSync(ART, 'utf8'));
writeFileSync(HEAD, execSync('git show HEAD:solvista.html', { cwd: ROOT, maxBuffer: 1 << 28 }).toString());

const SEEDS = [42, 7, 1234];
const LIGHTS = { day: 0.30, night: 0.88 };

/* Render BOTH frames (rope on / rope suppressed) inside ONE evaluate, so nothing can drift
   between them. The standard freeze (163c/d, 195f, 199) was NOT enough here: the Math.random-
   spawned entities (joggers, whales, kayaks, herons, deer, balloons...) respawn on every
   genWorld, so two renders of the "same" world differed by 4068 px -- the same order as the
   whole signal, and it made the first run of this probe pure noise. Stub Math.random to a
   fixed seeded stream before each render and an unchanged frame goes to an honest 0. */
const shoot = (page, seed, dayT) => page.evaluate(({ seed, dayT }) => {
  const cvs = document.querySelector('canvas');
  const ctx2 = cvs.getContext('2d');
  const proto = Object.getPrototypeOf(ctx2);
  const origStroke = proto.stroke, origRandom = Math.random;

  const frame = (suppress) => {
    let s = 0x2F6E2B1 >>> 0;                       /* same Math.random stream for both renders */
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    playing = false;
    genWorld(seed);
    __warp(61);
    if (typeof STARS !== 'undefined') STARS.length = 0;
    try { flock = null; } catch (e) {}
    waveT = 0; time = 0;
    __setTime(dayT);
    /* suppress ONLY the rope: drawGondAt's pylon is prismS (fills), so every stroke it
       issues IS a cable span -- verified, 25 strokes for 25 spans on seed 42 */
    if (suppress) proto.stroke = function () { if ((new Error()).stack.includes('drawGondAt')) return; return origStroke.apply(this, arguments); };
    render();
    proto.stroke = origStroke;
    return Array.from(ctx2.getImageData(0, 0, cvs.width, cvs.height).data);
  };

  const on = frame(false), off = frame(true), on2 = frame(false);
  Math.random = origRandom;
  return { on, off, on2, W: cvs.width, H: cvs.height };
}, { seed, dayT });

const lum = (d, i) => (0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]) / 255;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on('pageerror', e => console.log('PAGE ERROR:', e.message));

const differs = (A, B, i) => Math.abs(A[i] - B[i]) > 2 || Math.abs(A[i + 1] - B[i + 1]) > 2 || Math.abs(A[i + 2] - B[i + 2]) > 2;

const res = {};
for (const f of ['head', 'patch']) {
  const file = f === 'head' ? HEAD : PATCH;
  await page.goto(pathToFileURL(file).href);
  await page.waitForTimeout(1200);
  for (const seed of SEEDS) {
    for (const [ln, dayT] of Object.entries(LIGHTS)) {
      const { on, off, on2, W, H } = await shoot(page, seed, dayT);
      let noise = 0;
      for (let i = 0; i < on.length; i += 4) if (differs(on, on2, i)) noise++;
      let cov = 0, peak = 0, sum = 0, glint = 0, darkest = 1, bbox = [1e9, 1e9, -1e9, -1e9];
      for (let i = 0; i < on.length; i += 4) {
        if (!differs(on, off, i)) continue;
        const p = i / 4, x = p % W, y = (p / W) | 0;
        const la = lum(on, i), lb = lum(off, i), dl = la - lb;
        cov++; sum += Math.abs(dl);
        if (Math.abs(dl) > peak) peak = Math.abs(dl);
        if (dl > 0.02) glint++;                   /* rope pixel LIGHTER than its background */
        if (la < darkest) darkest = la;
        bbox[0] = Math.min(bbox[0], x); bbox[1] = Math.min(bbox[1], y);
        bbox[2] = Math.max(bbox[2], x); bbox[3] = Math.max(bbox[3], y);
      }
      res[`${f}|${seed}|${ln}`] = { cov, peak, mean: cov ? sum / cov : 0, glint, darkest, bbox, noise, on, W, H };
    }
  }
}

console.log('NOISE FLOOR — same build, same pins, rendered twice (must be 0, or nothing below is readable)');
for (const k of Object.keys(res)) if (res[k].noise) console.log(`  !! ${k}: ${res[k].noise} px`);
console.log(`  max across all ${Object.keys(res).length} cells: ${Math.max(...Object.values(res).map(r => r.noise))} px\n`);

console.log('THE HAUL ROPE: scratch -> steel   (rope pixels isolated by suppressing drawGondAt strokes)\n');
console.log('  seed light   coverage(px)   peak contrast   mean |dLum|   glint px   darkest rope px');
for (const seed of SEEDS) {
  for (const ln of Object.keys(LIGHTS)) {
    const h = res[`head|${seed}|${ln}`], p = res[`patch|${seed}|${ln}`];
    const f = (a, b, d = 2) => `${a.toFixed(d)} -> ${b.toFixed(d)}`;
    console.log(`  ${String(seed).padStart(4)} ${ln.padEnd(6)} ${String(h.cov).padStart(5)} -> ${String(p.cov).padStart(5)}   ` +
      `${f(h.peak, p.peak).padStart(15)}   ${f(h.mean, p.mean).padStart(13)}   ` +
      `${String(h.glint).padStart(4)} -> ${String(p.glint).padStart(4)}   ${f(h.darkest, p.darkest)}`);
  }
}

/* CONTROL: every pixel HEAD and PATCH disagree on must lie inside the cable bbox */
console.log('\nCONTROL — full-frame HEAD vs PATCH: do any pixels move OUTSIDE the cable bbox?');
for (const seed of SEEDS) {
  for (const ln of Object.keys(LIGHTS)) {
    const h = res[`head|${seed}|${ln}`], p = res[`patch|${seed}|${ln}`];
    const bb = [Math.min(h.bbox[0], p.bbox[0]) - 3, Math.min(h.bbox[1], p.bbox[1]) - 3,
                Math.max(h.bbox[2], p.bbox[2]) + 3, Math.max(h.bbox[3], p.bbox[3]) + 3];
    let inside = 0, outside = 0;
    for (let i = 0; i < h.on.length; i += 4) {
      if (Math.abs(h.on[i] - p.on[i]) <= 2 && Math.abs(h.on[i + 1] - p.on[i + 1]) <= 2 && Math.abs(h.on[i + 2] - p.on[i + 2]) <= 2) continue;
      const q = i / 4, x = q % h.W, y = (q / h.W) | 0;
      if (x >= bb[0] && x <= bb[2] && y >= bb[1] && y <= bb[3]) inside++; else outside++;
    }
    console.log(`  seed ${String(seed).padStart(4)} ${ln.padEnd(6)}  changed ${String(inside).padStart(5)} px inside the cable bbox, ` +
      `${String(outside).padStart(4)} px OUTSIDE  ${outside === 0 ? '<- clean' : '<- LEAK'}`);
  }
}
await browser.close();
