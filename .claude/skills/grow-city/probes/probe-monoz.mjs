#!/usr/bin/env node
/* IS THE MONORAIL VIADUCT DRAWN OVER THE TOWERS? (iter 212 step-back)
 *
 * The 22nd step-back's seed-7 agent FAILed the whole city on a specific, confident claim:
 * "the thin grey elevated-rail/viaduct outlines drawn across downtown pass IN FRONT of tower
 * faces they should be behind, with no visible pylons for long spans." Iter 202's agents said
 * the same of a "thin dark line"; iter 203 MEASURED that one (probe-gondz) and found the haul
 * rope 8.4-23.6% occluded — properly depth-sorted, artifact innocent, fault = legibility.
 *
 * But 203 measured the GONDOLA. Nobody has ever measured the MONORAIL, which is what this
 * agent actually named. So measure it, with 203's method (one frame, two z-orders):
 *   occluded% = 1 - inkInPlace / inkOnTop
 *   ~0%  => nothing in the city ever covers it: it IS an always-on-top overlay (agent right).
 *   >0%  => it is genuinely depth-sorted (agent naming a cause the measurement refutes).
 *
 * METHOD, refined from probe-gondz: the viaduct is mostly prismS FILLS, not strokes, so
 * replaying recorded polylines would be lossy. Instead DEFER THE REAL DRAW — suppress
 * drawMonoAt/drawGondAt during the row loop while recording its args AND the live camera
 * matrix, then after render() re-apply that matrix and call the untouched original. Identical
 * draw code, identical camera; the only thing that changes is WHEN it runs.
 *
 * drawGondAt is carried as a CALIBRATION CONTROL: 203 measured it at 8.4-23.6% with a
 * different rig, so this rig must reproduce that or it is not to be trusted on the monorail.
 *
 * Sub-pixel-safe per 203: measure INK CONTRIBUTION (summed max-channel distance from the frame
 * rendered WITHOUT the element), never a saturation threshold — a hairline can never saturate.
 * Deterministic per 163(c)/(d) + 195(f) + 199 + 203's Math.random stub.
 */
import { homedir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const CAND = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html')];
const ART = CAND.find(f => existsSync(f));

const SEEDS = [42, 7, 1234];
const LIGHTS = { day: 0.30, night: 0.88 };
const FNS = ['drawMonoAt', 'drawGondAt'];

const run = (page, seed, dayT, fn) => page.evaluate(({ seed, dayT, fn }) => {
  const cvs = document.querySelector('canvas');
  const ctx2 = cvs.getContext('2d');
  const origRandom = Math.random;
  const orig = window[fn];
  if (typeof orig !== 'function') return { err: 'no such fn: ' + fn };

  const grab = () => ctx2.getImageData(0, 0, cvs.width, cvs.height).data;
  const ink = (A, S) => { let t = 0; for (let i = 0; i < A.length; i += 4)
    t += Math.max(Math.abs(A[i] - S[i]), Math.abs(A[i + 1] - S[i + 1]), Math.abs(A[i + 2] - S[i + 2])); return t; };

  const world = () => {
    let s = 0x2F6E2B1 >>> 0;                       /* 203: the Math.random-spawned entities respawn per genWorld */
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    playing = false;
    genWorld(seed); __warp(61);
    if (typeof STARS !== 'undefined') STARS.length = 0;
    try { flock = null; } catch (e) {}
    waveT = 0; time = 0; __setTime(dayT);          /* 195(f): playing=false is NOT a frozen clock */
  };

  let calls = [];
  const suppress = () => { window[fn] = function (x, y, e) {
    const m = ctx2.getTransform();                 /* the live camera, at the moment the row loop got here */
    calls.push({ x, y, e, m: [m.a, m.b, m.c, m.d, m.e, m.f] });
  }; };
  const restore = () => { window[fn] = orig; };

  /* S: the city with the element entirely absent */
  world(); calls = []; suppress(); render(); restore();
  const S = grab();
  const nCalls = calls.length, seen = calls.slice();

  /* V: the element drawn exactly where the row loop puts it (as shipped) */
  world(); render();
  const V = grab();

  /* T: the SAME real draw, same camera matrix, but issued AFTER the whole frame */
  world(); calls = []; suppress(); render(); restore();
  ctx2.save();
  for (const c of seen) { ctx2.setTransform(...c.m); orig(c.x, c.y, c.e); }
  ctx2.restore();
  const T = grab();

  Math.random = origRandom;
  return { cells: nCalls, visible: ink(V, S), top: ink(T, S) };
}, { seed, dayT, fn });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on('pageerror', e => console.log('PAGE ERROR:', e.message));
await page.goto(pathToFileURL(ART).href);
await page.waitForTimeout(1200);

console.log('IS IT DRAWN OVER THE CITY?  (same real draw, two z-orders; occluded% = 1 - inPlace/onTop)');
console.log('drawGondAt is the CALIBRATION CONTROL - iter 203 measured it at 8.4-23.6% with a different rig.\n');
for (const fn of FNS) {
  console.log(`  ${fn}`);
  console.log('   seed light   cells    ink IN PLACE     ink ON TOP   OCCLUDED');
  for (const seed of SEEDS) {
    for (const [ln, dayT] of Object.entries(LIGHTS)) {
      const r = await run(page, seed, dayT, fn);
      if (r.err) { console.log('   ' + r.err); continue; }
      const occ = r.top ? (1 - r.visible / r.top) * 100 : 0;
      console.log(`   ${String(seed).padStart(4)} ${ln.padEnd(6)} ${String(r.cells).padStart(5)}   ` +
        `${String(r.visible).padStart(12)}   ${String(r.top).padStart(12)}   ${occ.toFixed(1).padStart(6)}%`);
    }
  }
  console.log('');
}
await browser.close();
