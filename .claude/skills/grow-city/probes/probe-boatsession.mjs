#!/usr/bin/env node
/* probe-boatsession.mjs — DO THE DAY-SAILERS EVER COME IN, AND CAN ANYONE SEE THEM IF THEY DO?
 *
 * `drawBoat` opened with no gate at all: six pleasure sailboats are spawned once in
 * genWorld and drawn on EVERY frame of the artifact's life — at 3am in midwinter, six
 * boats are still tacking about an empty, black bay. 286 gave the water CROWD an hour
 * (waterSession/waterOut: surfers, kayaks, kites) and wrote "the last board and the last
 * BOAT off the water together" — but "boat" there meant the KAYAK; the sailing boats[]
 * array was never touched. 271/280: a comment enumerates who was FIXED, not who should
 * READ. The day-sailer is the un-enumerated member of the recreational-craft category.
 *
 * ⚠ BUILD-HONEST, NOT PREDICATE-REPLICATING (205). `waterSession` exists on BOTH HEAD and
 *   the patch (286 added it for surfers), so `typeof waterSession==='function'` does NOT
 *   tell you whether the BOAT is gated — re-implementing the predicate would grade my own
 *   homework and read identically on both builds. So this measures the ACTUAL rendered
 *   draw: it isolates the moving boats by suppressing drawBoat's movers INSIDE ONE PAGE
 *   (226/230) and diffing — the changed px ARE the boats the frame really drew. HEAD keeps
 *   them out at night; the patch takes them home.
 *
 * PART A — moving-boat INK at four pins (viewer's units, 205). HEAD: night ≈ day (the
 *   defect, a constant). Patch: night → 0. POSITIVE CONTROL (248): the KAYAK — gated on
 *   BOTH builds (286) — so kayak deep-night ink → 0 on both proves the session clock fires
 *   and the rig can see a departure. MUST-NOT-MOVE (250): the MOORED boats (tied off the
 *   pier) hold their ink at deep night on both builds. A count going DOWN needs something
 *   required to stay UP.
 *
 * ⚠ moving boats get their x from advanceEntities, which a frozen render never runs (204),
 *   so seaXFr() is applied by hand before every render.
 */
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = existsSync(join(HERE, 'solvista.html')) ? join(HERE, 'solvista.html')
                                                     : join(HERE, '../../../../solvista.html');
const SRC = process.env.SRC || ROOT;
const PAGE = pathToFileURL(SRC).href;

const SEEDS = [7, 42, 1234];
const WARP = 61;
const DRYPEAK = 2035.62, WINTER = 2035.02;

console.log(`\nartifact: ${SRC}\n`);

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
await p.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await p.goto(PAGE);
await p.waitForFunction(() => typeof window.__warp === 'function');

console.log('PART A — ACTUAL rendered ink of the moving boats, by pin (build-honest, floor 0).');
console.log('        noon/dusk/deepNight at DRY-PEAK, then NOON in deep WINTER.  px (px/boat)');
console.log('        ‖ kayak deepNight ink (CONTROL: gated on both, must → ~0)  ‖ moored deepNight ink (MUST NOT MOVE)\n');

for (const seed of SEEDS) {
  const r = await p.evaluate(({ seed, warp, dry, win }) => {
    playing = false;

    /* ink of a class, isolated by suppressing its own draw fn in one page, at a pin */
    const inkAt = (year, t, suppress) => {
      genWorld(seed); __warp(warp); __setYear(year);
      boats.forEach(e => { if (!e.moored) e.x = seaXFr(e.y, e.fr); });
      __setTime(t); render();
      const W = cvs.width, H = cvs.height, g = cvs.getContext('2d');
      const A = g.getImageData(0, 0, W, H).data;
      const restore = suppress();
      render();
      const B = g.getImageData(0, 0, W, H).data;
      restore();
      let moved = 0;
      for (let i = 0; i < A.length; i += 4)
        if (Math.abs(A[i] - B[i]) + Math.abs(A[i + 1] - B[i + 1]) + Math.abs(A[i + 2] - B[i + 2]) > 24) moved++;
      return moved;
    };
    const supMovers = () => { const o = window.drawBoat; window.drawBoat = e => { if (e.moored) return o(e); }; return () => (window.drawBoat = o); };
    const supMoored = () => { const o = window.drawBoat; window.drawBoat = e => { if (!e.moored) return o(e); }; return () => (window.drawBoat = o); };
    const supKayak  = () => { const o = window.drawKayak; window.drawKayak = () => {}; return () => (window.drawKayak = o); };

    /* find the deep-night pin (max nightAmt) once */
    genWorld(seed); __warp(warp); __setYear(dry);
    let night = 0.92; { let bn = -1; for (let t = 0; t < 1; t += 0.02) { __setTime(t); if (nightAmt() > bn) { bn = nightAmt(); night = t; } } }

    const movers = boats.filter(e => !e.moored).length;
    return {
      movers,
      noon:  inkAt(dry, 0.5,   supMovers),
      dusk:  inkAt(dry, 0.72,  supMovers),
      dark:  inkAt(dry, night, supMovers),
      wnoon: inkAt(win, 0.5,   supMovers),
      kayDark: inkAt(dry, night, supKayak),
      moorDark: inkAt(dry, night, supMoored),
    };
  }, { seed, warp: WARP, dry: DRYPEAK, win: WINTER });
  const pb = n => `${n}px (${(n / r.movers).toFixed(0)})`;
  console.log(
    `  seed ${String(seed).padStart(4)}  noon ${pb(r.noon)}  dusk ${pb(r.dusk)}  `
    + `deepNight ${pb(r.dark)}  winterNoon ${pb(r.wnoon)}   `
    + `‖ kayakDark ${r.kayDark}px  ‖ mooredDark ${r.moorDark}px`);
}

await b.close();
console.log('\n(HEAD: deepNight ≈ noon = the defect.  Patch: deepNight → 0, winterNoon low, kayakDark ~0, mooredDark held.)\n');
