/* iter 242 — THE CLOUD SHADE FALLS ON THE OPEN SEA.
   Two step-back agents, blind, on two different seeds, unprompted, both reported
   "dark oval blobs on the water with no cloud above them" / "cloud shadows without
   their clouds". The draw gated the shade on inB() under a comment promising
   "shade only falls where there is ground to catch it" — but inB() is the PLATE,
   and the plate runs out to sea (199/209's tell: a predicate that cannot deliver
   what its comment asserts).

   THE CLAIM, IN THE VIEWER'S UNITS (205): dark shade ink is landing on sea pixels.
   So measure exactly that — not my alpha formula, which would be grading my own
   homework.

   RIG (the suppression family — 226 draw / 230 decision / 234 colour):
     - shade layer  = render as shipped, then re-render with ONLY the shade fill
                      suppressed (its rgba(36,30,20,..) is unique in the file).
                      The difference IS the shade, in ONE page, floor exactly 0,
                      off the final composited canvas (so occlusion is free).
     - water mask   = 234's palette suppression: loud-paint the sea's BASE entries,
                      flush CCACHE, re-render. Changed px = every px the sea paints,
                      AS SEEN. Derived per-build, so the probe is build-agnostic and
                      runs unchanged on HEAD and patch with no cross-build floor.
   GATE:  shade ink ON WATER  -> must collapse to ~0.
   CONTROL: shade ink ON LAND -> must NOT move (if my change dimmed the shadows the
            city is supposed to have, this is where it shows).
   The HUD cards are masked (200): ink under the placard is ink no user ever sees. */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = join(HERE, process.env.SRC || 'solvista.html');

const SEEDS = [42, 7, 1234];
const HOURS = [['day', 0.30], ['golden', 0.68]];

const br = await chromium.launch();
const page = await br.newPage({ viewport: { width: 1400, height: 900 } });
await page.addInitScript(() => {                 /* 213: BEFORE the page's own script */
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await page.goto(pathToFileURL(ART).href);
await page.waitForFunction(() => window.__census);

const rows = await page.evaluate(({ seeds, hours }) => {
  const g = cvs.getContext('2d');
  const grab = () => g.getImageData(0, 0, cvs.width, cvs.height).data;

  /* 200: the HUD is DOM — mask the cards so no ink is counted where a user sees a card */
  const dpr = cvs.width / cvs.clientWidth;
  const cards = [...document.querySelectorAll('.placard,.census,.controls')].map(e => {
    const r = e.getBoundingClientRect();
    return [r.left * dpr, r.top * dpr, r.right * dpr, r.bottom * dpr];
  });
  const W = cvs.width, H = cvs.height;
  const vis = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++)
    vis[y * W + x] = cards.some(c => x >= c[0] && x <= c[2] && y >= c[1] && y <= c[3]) ? 0 : 1;

  const SEA = ['water', 'waterDk', 'waterSh', 'waterDp'];
  const realFill = g.fill, realSeason = window.applySeason;
  const out = [];

  for (const seed of seeds) {
    for (const [hour, t] of hours) {
      playing = false;
      genWorld(seed); __warp(61);                 /* 163c: rebuild, don't trust the load */
      STARS.length = 0; flock = null;             /* 163d / 199 */
      time = 1234.5; waveT = 567.8;               /* 195f */
      __setYear(2035.62); __setTime(t);
      render();
      const A = grab();                           /* as shipped */
      render(); const A2 = grab();                /* ...and again: the FLOOR, in-run (213) */

      /* ---- the SHADE layer: suppress its (unique) fill colour, re-render ---- */
      g.fill = function (...a) {
        if (/^rgba\(36,\s*30,\s*20/.test(this.fillStyle)) return;
        return realFill.apply(this, a);
      };
      render(); const S = grab();
      g.fill = realFill;

      /* ---- the WATER mask: loud-paint the sea's palette entries (234) ---- */
      window.applySeason = () => {};              /* 238: or render() rebuilds BASE from CAN0 */
      const keep = SEA.map(n => BASE[n].slice());
      SEA.forEach(n => { BASE[n] = [255, 0, 255]; });
      CCACHE = {};
      render(); const Wm = grab();
      SEA.forEach((n, i) => { BASE[n] = keep[i]; });
      CCACHE = {};
      window.applySeason = realSeason;

      /* ---- classify every pixel of shade ink by what it is sitting on ---- */
      let floor = 0, onSea = 0, onLand = 0, seaPx = 0, landPx = 0, waterPx = 0;
      for (let p = 0, px = 0; p < A.length; p += 4, px++) {
        if (!vis[px]) continue;
        const d0 = Math.abs(A[p] - A2[p]) + Math.abs(A[p + 1] - A2[p + 1]) + Math.abs(A[p + 2] - A2[p + 2]);
        floor += d0;
        const isSea = (A[p] !== Wm[p] || A[p + 1] !== Wm[p + 1] || A[p + 2] !== Wm[p + 2]);
        if (isSea) waterPx++;
        const ink = Math.abs(A[p] - S[p]) + Math.abs(A[p + 1] - S[p + 1]) + Math.abs(A[p + 2] - S[p + 2]);
        if (ink === 0) continue;
        if (isSea) { onSea += ink; seaPx++; } else { onLand += ink; landPx++; }
      }

      /* ---- the viewer's units (236): how many clouds put a shadow on open water? ---- */
      const wet = new Set([T.WATER, T.MARSH, T.KELP]);
      let overSea = 0;
      for (const cl of clouds) {
        const c = cellAt(cl.x | 0, cl.y | 0);
        if (!c || wet.has(c.t)) overSea++;
      }
      out.push({ seed, hour, floor, onSea, onLand, seaPx, landPx, waterPx,
                 clouds: clouds.length, overSea });
    }
  }
  return out;
}, { seeds: SEEDS, hours: HOURS });

const pad = (s, n) => String(s).padStart(n);
console.log(`SRC = ${ART.split('/').pop()}\n`);
console.log('seed  hour     FLOOR   waterPx |  SHADE INK ON SEA  (px)  |  ON LAND (control)  (px) | clouds off-land');
for (const r of rows) {
  console.log(`${pad(r.seed, 4)}  ${r.hour.padEnd(7)} ${pad(r.floor, 6)}  ${pad(r.waterPx, 7)} | ${pad(r.onSea, 15)} ${pad('(' + r.seaPx + ')', 8)} | ${pad(r.onLand, 12)} ${pad('(' + r.landPx + ')', 8)} | ${r.overSea}/${r.clouds}`);
}
const tot = k => rows.reduce((a, r) => a + r[k], 0);
console.log(`\nTOTAL   shade ink on SEA = ${tot('onSea')}   |   on LAND (control) = ${tot('onLand')}   |   floor = ${tot('floor')}`);
await br.close();
