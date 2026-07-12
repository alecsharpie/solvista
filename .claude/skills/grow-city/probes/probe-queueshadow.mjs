#!/usr/bin/env node
/* probe-queueshadow.mjs — iter 226's gate.
 *
 * CLAIM: the city's three WAITING crowds (bus queue, rail platform queue, stadium
 * concourse) now cast a contact shadow, it is actually VISIBLE, and it swings with
 * the sun (225's SHOFF) like every other shadow in the city.
 *
 * The census is vacuous here (draw-only: every metric +0), so this is the gate.
 *
 * ISOLATION — one build, not two. The new shadows are suppressed BY STACK (the three
 * call sites' line numbers), so rendering twice in ONE page, back to back, with the
 * clock frozen, gives a diff that IS the new shadows by construction (161) with a
 * noise floor of exactly zero (195f/203 — and the probe PRINTS that zero rather than
 * assuming it). No cross-build transfer, and because the diff is of the FINAL
 * composited canvas, anything a later-drawn row painted over simply does not appear:
 * occlusion is checked for free (200).
 *
 * WHAT CAN FAIL:
 *   (1) ink ~ 0            => the shadows are buried or sub-pixel (203: measure INK,
 *                             never saturation) — the feature would be a no-op.
 *   (2) stray ink > 0      => the edit disturbed something OTHER than the queues.
 *                             It consumes no rng()/Math.random, so this must be 0.
 *   (3) no left/right swing => the shadows do not read the sun.
 *
 * The swing is measured PER OBJECT, never as a global centroid: 225 got the WRONG
 * SIGN on both seeds doing exactly that, because a shadow on bright sand carries more
 * ink than one on dark asphalt, so the ink REWEIGHTS across the city and a centroid
 * moves for reasons no shadow moved. Here every ink pixel is assigned to its NEAREST
 * waiting figure's FEET and classified left/right of THAT figure, so the statistic is
 * a direction, not a mass.
 *
 *   node probe-queueshadow.mjs
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = join(HERE, '../../../../solvista.html');

const SEEDS = [7, 42];
const WARP = 61;
/* pins taken from the light curve, never from intuition (202). SHOFF = e*(2sp-1)*(...),
   so it is negative before solar noon and positive after; 225 pins noon at t=0.415. */
const HOURS = [['morning', 0.22, 0], ['noon', 0.415, 0], ['evening', 0.68, 0],
               ['morning', 0.22, 5], ['noon', 0.415, 5], ['evening', 0.68, 5]];
const W = 1600, H = 1000;
const NEAR = 16;                                    /* device px: a foot owns ink this close */

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H } });
await page.addInitScript(() => {                    /* 213: BEFORE the page's own script */
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await page.goto(pathToFileURL(ART).href);
await page.waitForFunction(() => window.__census);

const run = await page.evaluate(({ seeds, warp, hours, NEAR }) => {
  /* the three call sites added by iter 226 */
  const NEWLINE = /solvista\.html:(4444|5007|6203):/;
  const FIT = [scale, offX, offY];      /* the fit camera, before anything aims it */
  const orig = window.shadS;
  let feet = [], mode = 'record';
  window.shadS = function (cx, cy, r, a) {
    if (NEWLINE.test(new Error().stack || '')) {
      if (mode === 'suppress') return;             /* stack-matched suppression */
      const m = ctx.getTransform();                /* 203: record the FEET in DEVICE space */
      feet.push([m.a * cx + m.c * cy + m.e, m.b * cx + m.d * cy + m.f]);
    }
    return orig.call(this, cx, cy, r, a);
  };

  const grab = () => {
    const g = cvs.getContext('2d');
    return g.getImageData(0, 0, cvs.width, cvs.height).data;
  };
  /* 200: the HUD is DOM, not canvas — a shadow behind the placard is invisible to the
     user while a canvas readback calls it present. Mask the cards out. */
  const dpr = cvs.width / cvs.clientWidth;
  const cards = [...document.querySelectorAll('.placard,.census,.controls')].map(e => {
    const r = e.getBoundingClientRect();
    return [r.left * dpr, r.top * dpr, r.right * dpr, r.bottom * dpr];
  });
  const hidden = (x, y) => cards.some(c => x >= c[0] && x <= c[2] && y >= c[1] && y <= c[3]);

  const out = [];
  for (const seed of seeds) {
    for (const [name, t, zoom] of hours) {
      playing = false;                             /* stops the sim clock... */
      genWorld(seed); __warp(warp);                /* ...163: rebuild, don't trust the load */
      STARS.length = 0; flock = null;              /* 163d / 199 */
      time = 1234.5; waveT = 567.8;                /* 195f: playing=false is NOT a frozen clock */
      __setTime(t);
      /* the camera is GLOBAL and does not reset with genWorld: without this, a fit row
         that follows a zoomed row is silently still zoomed, aimed at the PREVIOUS seed's
         hex (it read figs=0 and 4 px/fig, and every number in the row was plausible and
         wrong). Restore the fit camera captured at load. */
      scale = FIT[0]; offX = FIT[1]; offY = FIT[2];
      if (zoom) {                                  /* aim at a stop the viewer can SEE (206) */
        let best = null;
        for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
          const c = cellAt(x, y);
          if (!c || !c.stop || c.fete || !openFront(x, y)) continue;
          const q = stopQueue(c, x, y).q;
          if (!best || q > best.q) best = { x, y, q };
        }
        if (best) { const [wx, wy] = ctr(best.x, best.y); scale = zoom; offX = innerWidth / 2 - wx * zoom; offY = innerHeight / 2 - wy * zoom; }
      }
      lastSky = 0; syncSky(performance.now()); syncStats();   /* 204 */

      feet = []; mode = 'draw'; render();          /* WITH the new shadows */
      const A = grab();
      mode = 'suppress'; render();                 /* WITHOUT them */
      const B = grab();
      mode = 'suppress'; render();                 /* ...and again: the honest zero (203) */
      const B2 = grab();

      let floor = 0;
      for (let i = 0; i < B.length; i += 4) if (B[i] !== B2[i] || B[i + 1] !== B2[i + 1] || B[i + 2] !== B2[i + 2]) floor++;

      /* every differing pixel IS a new shadow. Assign it to the nearest FEET, then
         classify left/right of THAT figure — a direction, not a centre of mass (225). */
      let ink = 0, px = 0, stray = 0, L = 0, R = 0;
      const wpx = cvs.width;
      /* PER-OBJECT displacement (225): ink-weighted mean dx about EACH figure's own
         feet. Reported later as (hour - noon) per figure, because the raw dx is biased
         by the SURFACE — a shadow on bright pavement carries more ink than the same
         shadow on dark asphalt, so the raw split is a reweighting, not a throw. The
         same figure stands on the same pixels at every hour, so differencing against
         its own noon (SHOFF=0, the free dead-regime control 225 banked) cancels it. */
      const fdx = new Float64Array(feet.length), fw = new Float64Array(feet.length);
      for (let i = 0; i < A.length; i += 4) {
        const d = Math.max(Math.abs(A[i] - B[i]), Math.abs(A[i + 1] - B[i + 1]), Math.abs(A[i + 2] - B[i + 2]));
        if (!d) continue;
        const p = i >> 2, x = p % wpx, y = (p / wpx) | 0;
        if (hidden(x, y)) continue;                /* behind the HUD: the user never sees it */
        ink += d; px++;
        let bi = -1, bd = NEAR * NEAR;
        for (let k = 0; k < feet.length; k++) {
          const dx = x - feet[k][0], dy = y - feet[k][1], dd = dx * dx + dy * dy;
          if (dd < bd) { bd = dd; bi = k; }
        }
        if (bi < 0) { stray += d; continue; }
        const dx = x - feet[bi][0];
        if (dx < 0) L += d; else if (dx > 0) R += d;
        fdx[bi] += dx * d; fw[bi] += d;
      }
      const perFoot = [];
      for (let k = 0; k < feet.length; k++) perFoot.push(fw[k] ? fdx[k] / fw[k] : NaN);
      /* 205: state the claim in the VIEWER's units. A frame total of "223 px" sounds
         large and is 2 px per person. What decides this feature is px PER FIGURE, at
         the zoom a viewer actually looks at (159's corollary). Count only the figures
         actually IN FRAME, or a zoomed run divides by the whole city's queue. */
      const inF = feet.filter(f => f[0] >= 0 && f[0] < cvs.width && f[1] >= 0 && f[1] < cvs.height).length;
      out.push({ seed, name, t, zoom: zoom || 'fit', LITAMT: +LITAMT.toFixed(2), SHOFF: +SHOFF.toFixed(2), SHLEN: +SHLEN.toFixed(2),
                 figs: inF, ink, px, floor, stray, L, R, perFoot });
    }
  }
  window.shadS = orig;
  return out;
}, { seeds: SEEDS, warp: WARP, hours: HOURS, NEAR });

await browser.close();

const pc = (a, b) => (a + b ? (100 * a / (a + b)).toFixed(0) : '--');
console.log('\niter 226 — do the waiting crowds cast a shadow, and does it follow the sun?\n');
console.log('seed  zoom  hour     LITAMT SHOFF SHLEN  figs   ink(px)  px/fig  floor  stray   left%  right%   throw vs noon');
for (const r of run) {
  const noon = run.find(o => o.seed === r.seed && o.name === 'noon' && o.zoom === r.zoom);
  /* per-object, paired by figure, differenced against that figure's own noon (225) */
  let s = 0, n = 0;
  for (let k = 0; k < r.perFoot.length; k++) {
    const a = r.perFoot[k], b = noon.perFoot[k];
    if (Number.isFinite(a) && Number.isFinite(b)) { s += a - b; n++; }
  }
  const thr = n ? (s / n) : NaN;
  const lean = Math.abs(thr) < 0.15 ? 'under (control)' : (thr < 0 ? `${thr.toFixed(2)} px  <- west` : `+${thr.toFixed(2)} px  east ->`);
  const ppf = r.figs ? (r.px / r.figs).toFixed(1) : '--';
  console.log(
    String(r.seed).padEnd(5), String(r.zoom).padEnd(5), r.name.padEnd(8),
    String(r.LITAMT).padEnd(6), String(r.SHOFF).padStart(5), String(r.SHLEN).padStart(5),
    String(r.figs).padStart(5), String(r.px).padStart(8), String(ppf).padStart(7),
    String(r.floor).padStart(6), String(r.stray).padStart(6),
    pc(r.L, r.R).padStart(6), pc(r.R, r.L).padStart(6), '   ' + lean);
}
console.log(`
READ:
  floor  MUST be 0 — two identical renders, same page, frozen clock (203).
  stray  MUST be 0 — ink further than ${NEAR}px from any waiting figure's feet would mean
         the edit moved something it does not own. It draws no rng()/Math.random.
  figs   the waiting figures found. 0 at an hour = that crowd is not drawn then.
  ink    the shadows the user can actually SEE: measured as INK, never saturation (203),
         off the FINAL composited canvas, so anything a later row painted over is
         already excluded (200) — i.e. this is the occlusion check too.
  left/right%  RAW ink split. It is NOT expected to be 50/50 at noon: ink reweights with
         the brightness of the ground each shadow lands on (225), which is exactly why
         the verdict column is differenced per figure against its OWN noon.
  throw vs noon  the real displacement claim. Morning must go WEST, evening EAST, and
         noon is the control that must read ~0 BY CONSTRUCTION (SHOFF=0 there).
`);
