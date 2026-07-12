#!/usr/bin/env node
/* shot-queueshadow.mjs — iter 226's camera.
 *
 * The feature is a contact shadow under the people WAITING at a bus stop, so a fixed
 * clip is a coin-flip (201: the city is procedural, the stops move seed to seed). AIM
 * instead: find the stop with the longest queue — using the artifact's own stopQueue(),
 * so the SAME hex is framed in both builds — and centre the camera on it.
 *
 * Frames per seed:
 *   a-before-evening   HEAD, aimed, golden hour   <- the blind pair. The figures float.
 *   b-after-evening    PATCH, same hex, same hour <- ...and here they are grounded.
 *   c-after-morning    PATCH, same hex, morning   <- the shadow has swung to the WEST.
 *   d-after-city       PATCH, whole city, day     <- the cumulative read.
 *
 * Frozen in-page (playing=false stops both clocks; time/waveT pinned per 195f), light
 * pinned off the light curve (202), sky+stats forced (204), and shot with
 * page.screenshot() so the DOM HUD is composited in (200).
 *
 *   node shot-queueshadow.mjs <outdir>
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { writeFileSync, mkdirSync, unlinkSync } from 'node:fs';
import { execSync } from 'node:child_process';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '../../../..');
const PATCH = join(ROOT, 'solvista.html');
const HEADF = join(HERE, '__queue_head.html');
writeFileSync(HEADF, execSync('git show HEAD:solvista.html', { cwd: ROOT, maxBuffer: 1 << 28 }));

const OUT = process.argv[2] || join(HERE, '../shots/queue');
mkdirSync(OUT, { recursive: true });
const SEEDS = [7, 42];
const WARP = 61, ZOOM = 10;
const W = 1400, H = 900;

const browser = await chromium.launch();

/* Freeze the world, aim, render once, and report what the frame actually IS (202).

   AIMING: neither openFront nor frontLoad is enough here. Both only count TALLT types,
   and 226's first two gate rounds were both lost to that: openFront picked a stop walled
   in by towers two rows back (it only tests dy=+1 — 211), and frontLoad(=0) then picked
   one buried behind a mid-height SHOP, which is not in TALLT at all but is more than tall
   enough to hide a person's feet. Agents correctly FAILed the camera twice.

   So aim at the instance whose shadow MEASURABLY RENDERS: draw the frame with the new
   shadows and again without them, diff per figure, and centre on the figure carrying the
   most visible ink (201: locate the host, then aim). aimAt is then handed to the HEAD
   build too, so the before/after pair frames the identical hex. */
const NEWLINE = /solvista\.html:(4444|5007|6203):/;

const setup = async (page, seed, t, zoom, aimAt) => await page.evaluate(({ seed, warp, t, zoom, aimAt, src }) => {
  const re = new RegExp(src);
  const orig = window.shadS;
  let feet = [], mode = 'draw';
  window.shadS = function (cx, cy, r, a) {
    if (re.test(new Error().stack || '')) {
      if (mode === 'suppress') return;
      const m = ctx.getTransform();
      feet.push({ cx, cy, dx: m.a * cx + m.c * cy + m.e, dy: m.b * cx + m.d * cy + m.f });
    }
    return orig.call(this, cx, cy, r, a);
  };
  const frame = () => {
    playing = false;
    genWorld(seed); __warp(warp);
    STARS.length = 0; flock = null;
    time = 1234.5; waveT = 567.8;
    __setTime(t);
    lastSky = 0; syncSky(performance.now()); syncStats();
  };
  const grab = () => cvs.getContext('2d').getImageData(0, 0, cvs.width, cvs.height).data;

  let aim = aimAt;
  if (!aim) {                       /* PATCH build: find the figure whose shadow shows most */
    frame(); feet = []; mode = 'draw'; render();
    const A = grab();
    mode = 'suppress'; render();
    const B = grab();
    const w = cvs.width, ink = new Float64Array(feet.length);
    for (let i = 0; i < A.length; i += 4) {
      const d = Math.max(Math.abs(A[i] - B[i]), Math.abs(A[i+1] - B[i+1]), Math.abs(A[i+2] - B[i+2]));
      if (!d) continue;
      const p = i >> 2, x = p % w, y = (p / w) | 0;
      let bi = -1, bd = 256;
      for (let k = 0; k < feet.length; k++) {
        const ddx = x - feet[k].dx, ddy = y - feet[k].dy, dd = ddx*ddx + ddy*ddy;
        if (dd < bd) { bd = dd; bi = k; }
      }
      if (bi >= 0) ink[bi] += d;
    }
    let bi = 0;
    for (let k = 1; k < feet.length; k++) if (ink[k] > ink[bi]) bi = k;
    aim = feet.length ? { cx: feet[bi].cx, cy: feet[bi].cy, ink: Math.round(ink[bi]) } : null;
  }

  frame();
  if (zoom && aim) { scale = zoom; offX = innerWidth / 2 - aim.cx * zoom; offY = innerHeight / 2 - aim.cy * zoom; }
  mode = 'draw'; render();
  window.shadS = orig;
  return { aim, LITAMT: +LITAMT.toFixed(2), SHOFF: +SHOFF.toFixed(2) };
}, { seed, warp: WARP, t, zoom, aimAt, src: NEWLINE.source });

for (const seed of SEEDS) {
  const aims = {};
  for (const [file, src, t, zoom] of [
    [`seed${seed}-b-after-evening`, PATCH, 0.68, ZOOM],
    [`seed${seed}-a-before-evening`, HEADF, 0.68, ZOOM],
    [`seed${seed}-c-after-morning`, PATCH, 0.22, ZOOM],
    [`seed${seed}-d-after-city`, PATCH, 0.30, 0],
  ]) {
    const page = await browser.newPage({ viewport: { width: W, height: H } });
    await page.addInitScript(() => {                 /* 213 */
      let s = 0x51F3A9C >>> 0;
      Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    });
    await page.goto(pathToFileURL(src).href);
    await page.waitForFunction(() => window.__census);
    /* the golden-hour PATCH frame picks the aim; every other frame reuses it */
    const st = await setup(page, seed, t, zoom, aims[seed] || null);
    if (!aims[seed] && st.aim) aims[seed] = st.aim;
    const clip = zoom ? { x: W/2 - 260, y: H/2 - 200, width: 520, height: 400 } : undefined;
    await page.screenshot({ path: join(OUT, file + '.png'), clip });   /* DOM-composited (200) */
    console.log(`${file}.png  aim=(${st.aim ? st.aim.cx.toFixed(0)+','+st.aim.cy.toFixed(0) : '-'}) ink=${st.aim ? st.aim.ink : '-'}  LITAMT=${st.LITAMT} SHOFF=${st.SHOFF}`);
    await page.close();
  }
}
await browser.close();
unlinkSync(HEADF);
console.log('\n-> ' + OUT);
