#!/usr/bin/env node
/* shot-surfsession.mjs — the lineup's camera.
 *
 * The change: the surfers now keep a SESSION (the sun x the calendar), so the lineup
 * empties after dark and thins in winter. HEAD drew all nine on every frame forever.
 *
 * ⚠ 258 IS THE WHOLE DESIGN PROBLEM HERE. The success condition at night is an ABSENCE
 *   — "the water is empty" — and a frame that simply MISSES the lineup renders exactly
 *   like a correct one. An agent will look at empty water it was never pointed at and
 *   return a confident PASS. So:
 *     (a) every frame SELF-REPORTS that its centre IS the lineup's water (202/236), and
 *     (b) the DAY frame is a REQUIRED POSITIVE TWIN, at the IDENTICAL aim, where the
 *         surfers MUST be visible. If the agent cannot see them in the day frame, the
 *         camera is broken and the night frame proves nothing.
 *   The day frame is also the FIXED POINT (245): at the dry peak in daylight the patch
 *   runs HEAD's draw byte-for-byte (probe-surfsession Part C: 0 px), so the two day
 *   frames must be INDISTINGUISHABLE. An agent who can tell them apart has found a leak.
 *
 * ⚠ AIMING — BY MEASURED INK, AND I LEARNED IT THE 226 WAY. The first cut reasoned that
 *   a surfer needs no argmax (249): its position is published world data, floating on
 *   open water where "nothing can occlude it". That is FALSE, and the falseness is the
 *   pier. Aimed at the median board by world-y, the camera framed the PIER DECK on seed
 *   42 — the two boards nearest that aim sit behind it — so the patch's DAY frame, in
 *   which the probe measures 140px of surfer, showed no surfer at all, and an agent
 *   correctly refused to grade it. A board's position says where it IS; it says nothing
 *   about whether it can be SEEN. The aim is now the argmax window of the surfers' OWN
 *   INK, isolated by suppressing `drawSurfer` in ONE page (226/230/234).
 *
 * ⚠ DRIVE `zoom`, NEVER `scale` (269): setZoom's contract is scale = fitScale*zoom.
 *   (The HUD's `1×` pill is `btnSpeed` — the SIM SPEED, not a zoom badge. The artifact
 *   has no zoom readout, so do not go hunting for a 269 violation that isn't there.)
 * ⚠ PINS ARE DERIVED FROM THE CURVE, NEVER TYPED (264): the night pin is the argmax of
 *   the artifact's own nightAmt(), so it re-derives itself against whatever the light
 *   becomes. The seasons are applySeason's own keyframes.
 * ⚠ Frames are named by FILE with MEANINGLESS tokens and the map is CROSSED between
 *   seeds (238/239/268): `one`/`two` carry the same order a letter does.
 */
import { existsSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = existsSync(join(HERE, 'solvista.html')) ? join(HERE, 'solvista.html')
                                                     : join(HERE, '../../../../solvista.html');

const SEED = Number(process.argv[2] || 42);
const OUT = process.argv[3] || '.claude/skills/grow-city/shots/surf';
const SRC = process.env.SRC || ROOT;      /* SRC=<head file> to shoot the other build */
const TAG = process.env.TAG || 'patch';   /* the token this build wears in the filenames */

mkdirSync(OUT, { recursive: true });
const WARP = 61;
const ZTARGET = 4.4;   /* the close-up zoom; the aim window is derived from it */

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
await p.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await p.goto(pathToFileURL(SRC).href);
await p.waitForFunction(() => typeof window.__warp === 'function');

const frames = await p.evaluate(({ seed, warp, ZTARGET }) => {
  playing = false;                       /* stops BOTH clocks */
  /* ⚠ 195(f): `playing=false` is NOT a frozen clock. `time` and `waveT` keep whatever
     wall-clock-dependent value the RAF loop reached before the freeze, so two loads of
     the SAME file render different surf, different gait and different bob — and the two
     builds' DAY frames (which are provably byte-identical in one page, probe Part C) come
     out with different md5s. Pin them BEFORE genWorld/__warp (248), or the blind day pair
     is not a control, it is a wave. */
  time = 0; waveT = 0;
  genWorld(seed); __warp(warp);
  time = 0; waveT = 0;                   /* __warp's ticks can advance them again */
  /* 199/163(d): `flock` is a lone Math.random-spawned OBJECT and `STARS` is built once at
     load, so neither is reset by genWorld — they survive the freeze and land differently
     on every page load. They were the whole cross-build drift in the zoomed crop (5,044px
     at 4.4x, against 24px in the un-zoomed frame — the tell that it was a mover, not the
     world). Clearing them is what makes the DAY pair an honest control. */
  flock = null; STARS.length = 0;

  /* DERIVE the night pin from the artifact's own curve — never a typed literal (264).
     ⚠ AND DERIVE IT AT THE YEAR BEING SHOT (264a). 261 gave the season a DAY LENGTH
     (sunWarp warps the light curve's time axis), so nightAmt() is NOT a pure function of
     dayT: the same dayT is deep night in winter and broad daylight in summer. Deriving
     the pin once, at whatever year __warp happened to leave, and reusing it across
     seasons pinned the "night" frame at nightAmt=0 — the camera shooting the control and
     captioning it the treatment. The frame's own self-report is what caught it (202). */
  window.__nightPin = () => {
    let t0 = 0, best = -1;
    for (let t = 0; t < 1; t += 0.005) {
      __setTime(t); render();
      if (nightAmt() > best) { best = nightAmt(); t0 = t; }
    }
    return t0;
  };
  /* the day pin: solar noon, which sunWarp holds fixed in every season (261) */
  const dayT_ = 0.415;

  /* THE AIM — BY MEASURED INK, NEVER BY A POSITIONAL PREDICATE (226/269).
     The first cut aimed at the MEDIAN board by world-y. It framed the PIER: on seed 42
     the two boards nearest that aim land at screen ~(730,450), directly behind the pier
     deck that occludes them, so the patch's DAY frame — where the probe measures 140px of
     surfer — showed no surfer at all, and an agent correctly refused to grade it. A
     board's world position says where it IS; it says nothing about whether it can be SEEN.
     So: render the fitted frame with the lineup and again with `drawSurfer` suppressed
     (230 — in ONE page, floor exactly 0), take the difference — those pixels ARE the
     surfers, as composited, occlusion included — and centre on the densest window of it.
     ⚠ Aim from the DAY frame: at night the patch draws none of them and there is no ink
     to argmax over (230's corollary — aim by the counterfactual). */
  __setYear(2035.62); __setTime(0.415);
  zoom = 1; scale = fitScale; offX = fitX; offY = fitY;
  const cv = document.querySelector('canvas'), gg = cv.getContext('2d');
  const grab = () => gg.getImageData(0, 0, cv.width, cv.height);
  const real = window.drawSurfer;
  render(); const IA = grab();
  window.drawSurfer = () => {};
  render(); const IB = grab();
  window.drawSurfer = real;
  const dpr = cv.width / innerWidth;
  /* the visible world extent at the target zoom, in fit-frame canvas px */
  const winW = (innerWidth / ZTARGET) * dpr, winH = (innerHeight / ZTARGET) * dpr;
  const ink = [];
  for (let i = 0; i < IA.data.length; i += 4) {
    const d = Math.max(Math.abs(IA.data[i] - IB.data[i]),
                       Math.abs(IA.data[i + 1] - IB.data[i + 1]),
                       Math.abs(IA.data[i + 2] - IB.data[i + 2]));
    if (d > 8) { const px_ = (i >> 2) % cv.width, py_ = ((i >> 2) / cv.width) | 0; ink.push([px_, py_]); }
  }
  /* argmax window: the crop that contains the most surfer ink */
  let bx = 0, by = 0, bn = -1;
  for (const [ax, ay] of ink) {
    let n = 0;
    for (const [ox, oy] of ink) if (Math.abs(ox - ax) < winW / 2 && Math.abs(oy - ay) < winH / 2) n++;
    if (n > bn) { bn = n; bx = ax; by = ay; }
  }
  /* fit-canvas px -> world (screen = world*fitScale + fit; canvas = screen*dpr) */
  const awx = (bx / dpr - fitX) / fitScale, awy = (by / dpr - fitY) / fitScale;
  const inkTotal = ink.length, inkInCrop = bn;

  const shots = [];
  const shoot = (name, year, t, z) => {
    __setYear(year);                          /* the year FIRST — the pin depends on it */
    if (t === null) t = window.__nightPin();  /* derived at THIS year (264a) */
    __setTime(t);
    if (z > 1) { zoom = z; scale = fitScale * zoom;      /* 269: zoom is the input */
                 offX = innerWidth / 2 - awx * scale; offY = innerHeight / 2 - awy * scale;
                 clampPan(); }
    else { zoom = 1; scale = fitScale; offX = fitX; offY = fitY; }
    render();
    lastSky = 0; syncSky(performance.now()); syncStats();   /* 204: the DOM does not follow a frozen clock */
    shots.push({ name, t: Math.round(t * 1000) / 1000,
      night: Math.round(nightAmt() * 100) / 100,
      beach: Math.round(beachPhase() * 100) / 100,
      zoom: Math.round(zoom * 10) / 10 });
    return shots[shots.length - 1];
  };
  window.__shoot = shoot;
  return { dayT_, awx, awy, n: surfers.length, inkTotal, inkInCrop };
}, { seed: SEED, warp: WARP, ZTARGET });

const PINS = [
  /* name          year      t (null = derive the night pin AT THIS YEAR)  zoom */
  ['day',    2035.62, frames.dayT_, ZTARGET],  /* POSITIVE TWIN + fixed point: both builds identical */
  ['night',  2035.62, null,         ZTARGET],  /* the treatment: patch = empty water */
  ['winter', 2035.02, frames.dayT_, ZTARGET],  /* the season: patch = a thin lineup */
  ['city',   2035.62, frames.dayT_, 1],    /* the mandatory un-zoomed whole-plate read */
];

for (const [name, year, t, z] of PINS) {
  const st = await p.evaluate(({ name, year, t, z }) => window.__shoot(name, year, t, z), { name, year, t, z });
  const f = join(OUT, `s${SEED}-${TAG}-${name}.png`);
  await p.screenshot({ path: f });        /* 200: DOM-composited — the probes cannot see the HUD */
  console.log(`  ${f}\n     ${name}: t=${st.t} nightAmt=${st.night} beachPhase=${st.beach} zoom=${st.zoom}x  `
    + `| aimed by MEASURED INK at world ${Math.round(frames.awx)},${Math.round(frames.awy)} `
    + `(${frames.inkInCrop} of ${frames.inkTotal} px of surfer-ink in this crop; ${frames.n} boards spawned)`);
}

await b.close();
