#!/usr/bin/env node
/* IS THE HAUL ROPE EVER OCCLUDED? (iter 203)
 *
 * Iter 202 banked "a thin dark line reads as drawn OVER the towers/water" and disproved the
 * naive cause. probe-darkline LOCATED the line: the aerial cable-car haul rope. Reading the
 * code then seemed to EXONERATE it — a gondola path is strictly monotone in y (stepGond only
 * ever takes axStep d=1 or d=2, and BOTH are y+1), so a cable span is always drawn BEFORE the
 * row it descends into, and z-order looked correct by construction.
 *
 * Then four agent-reads (2 seeds x 2 passes) said, independently and specifically, that the
 * rope paints over towers and foreground terrain. The skill's law says a FAIL is a cue to
 * MEASURE, not to redesign — and it also says a probe is the verdict only if it measures what
 * the claim is about. The claim is about OCCLUSION, so measure occlusion directly.
 *
 * METHOD — render the SAME frame under two z-orders and take the ink ratio:
 *   ink IN PLACE = the rope drawn where the row loop actually draws it, and then possibly
 *                  overdrawn by whatever rows come after it.
 *   ink ON TOP   = the very same rope polylines re-stroked over the finished frame.
 *   occluded % = 1 - inPlace / onTop.
 * If the rope's z-order works, later rows must eat some of it and inPlace < onTop.
 * If occlusion is ~0, then NOTHING in the city ever covers the rope: it is effectively an
 * always-on-top overlay, and the agents are right that it reads as a line drawn ON the image.
 * RESULT (iter 203): 8.4-23.6% occluded on every seed and light. The rope IS depth-sorted;
 * the agents' "painted on top of everything" was false, and the naive cause is disproven a
 * third time (after the axStep monotonicity argument and the girder's midpoint stroke).
 *
 * The polylines are recorded in DEVICE space (via ctx.getTransform() at stroke time), so the
 * replay needs no knowledge of the camera: identity transform, same device widths.
 *
 * ⚠ NOTE the metric, because the obvious one is WRONG here. 195(b) says force the draw LOUD and
 * count the loud colour — but a SUB-PIXEL line (this rope is 0.5 device px) is ALWAYS blended
 * with its background and can never produce a SATURATED pixel, so a colour threshold counts ~0
 * and you conclude the draw is dead when it is fine. This probe's first run read "0 visible px"
 * on a rope that is demonstrably 262-419 px. Measure INK CONTRIBUTION instead — the summed
 * max-channel distance from the same frame rendered WITHOUT the element — which is
 * threshold-free and correct at any line width.
 *
 * Deterministic per 163(c)/(d) + 195(f) + 199 + Math.random stub (the Math.random-spawned
 * entities respawn per genWorld and were a 4068px noise floor until stubbed).
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

const run = (page, seed, dayT) => page.evaluate(({ seed, dayT }) => {
  const cvs = document.querySelector('canvas');
  const ctx2 = cvs.getContext('2d');
  const proto = Object.getPrototypeOf(ctx2);
  const origStroke = proto.stroke, origRandom = Math.random;


  let s = 0x2F6E2B1 >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  playing = false;
  genWorld(seed); __warp(61);
  if (typeof STARS !== 'undefined') STARS.length = 0;
  try { flock = null; } catch (e) {}
  waveT = 0; time = 0; __setTime(dayT);

  /* A sub-pixel line can never produce a SATURATED pixel, so thresholding on a loud colour
     counts almost nothing (the first run of this probe read 0 visible px on a rope that is
     demonstrably 262-419 px). Measure the rope's INK CONTRIBUTION instead — how far the frame
     moves when the rope is added — which is threshold-free and correct at any line width. */
  const grab = () => ctx2.getImageData(0, 0, cvs.width, cvs.height).data;
  const ink = (A, S) => { let t = 0; for (let i = 0; i < A.length; i += 4)
    t += Math.max(Math.abs(A[i] - S[i]), Math.abs(A[i + 1] - S[i + 1]), Math.abs(A[i + 2] - S[i + 2])); return t; };

  /* record each rope span in DEVICE space, with its real style, and let it draw normally */
  const lines = [];
  let pts = [];
  const om = proto.moveTo, ol = proto.lineTo, ob = proto.beginPath;
  const map = (self, x, y) => { const m = self.getTransform(); return [m.a * x + m.c * y + m.e, m.b * x + m.d * y + m.f]; };
  const hook = (suppress) => {
    proto.beginPath = function () { pts = []; return ob.apply(this, arguments); };
    proto.moveTo = function (x, y) { pts.push(map(this, x, y)); return om.apply(this, arguments); };
    proto.lineTo = function (x, y) { pts.push(map(this, x, y)); return ol.apply(this, arguments); };
    proto.stroke = function () {
      if ((new Error()).stack.includes('drawGondAt')) {
        if (!suppress) { const m = this.getTransform(), sc = Math.hypot(m.a, m.b) || 1;
          lines.push({ pts: pts.slice(), lw: this.lineWidth * sc, css: String(this.strokeStyle) }); }
        if (suppress) return;                  /* the background: the city with no rope at all */
      }
      return origStroke.apply(this, arguments);
    };
  };
  const unhook = () => { proto.stroke = origStroke; proto.beginPath = ob; proto.moveTo = om; proto.lineTo = ol; };
  const world = () => { let s2 = 0x2F6E2B1 >>> 0; Math.random = () => ((s2 = (s2 * 1664525 + 1013904223) >>> 0) / 4294967296);
    playing = false; genWorld(seed); __warp(61);
    if (typeof STARS !== 'undefined') STARS.length = 0; try { flock = null; } catch (e) {}
    waveT = 0; time = 0; __setTime(dayT); };

  world(); hook(true);  render(); unhook(); const S = grab();   /* no rope   */
  world(); hook(false); render(); unhook(); const V = grab();   /* rope in its row (as shipped) */

  /* replay the SAME polylines on top of the finished frame, in device space and true colours */
  world(); hook(true); render(); unhook();
  ctx2.save();
  ctx2.setTransform(1, 0, 0, 1, 0, 0);         /* the recorded points need no camera */
  ctx2.lineCap = 'round';
  for (const L of lines) {
    ctx2.strokeStyle = L.css; ctx2.lineWidth = L.lw;
    ctx2.beginPath();
    L.pts.forEach((p, i) => i ? ctx2.lineTo(p[0], p[1]) : ctx2.moveTo(p[0], p[1]));
    ctx2.stroke();
  }
  ctx2.restore();
  const T = grab();                            /* rope forced on top of everything */

  Math.random = origRandom;
  return { spans: lines.length, visible: ink(V, S), top: ink(T, S) };
}, { seed, dayT });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on('pageerror', e => console.log('PAGE ERROR:', e.message));
await page.goto(pathToFileURL(ART).href);
await page.waitForTimeout(1200);

console.log('IS THE HAUL ROPE EVER OCCLUDED?  (same rope polylines, two z-orders; ink ratio)\n');
console.log('  seed light   spans   rope ink IN PLACE   rope ink ON TOP   OCCLUDED');
for (const seed of SEEDS) {
  for (const [ln, dayT] of Object.entries(LIGHTS)) {
    const r = await run(page, seed, dayT);
    const occ = r.top ? (1 - r.visible / r.top) * 100 : 0;
    console.log(`  ${String(seed).padStart(4)} ${ln.padEnd(6)} ${String(r.spans).padStart(5)}   ` +
      `${String(r.visible).padStart(10)}   ${String(r.top).padStart(15)}   ${occ.toFixed(1).padStart(6)}%`);
  }
}
console.log('\n  ~0% occluded  => nothing in the city EVER covers the rope: it is an always-on-top overlay.');
console.log('  >0% occluded  => later rows do eat into it, i.e. the rope is genuinely depth-sorted.');
await browser.close();
