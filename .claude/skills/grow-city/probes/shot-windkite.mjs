/* shot-windkite — the camera for iter 280's wind-borne kite.
 *
 * The gate is a DISCRIMINATING PAIR (264): the SAME world, the SAME frozen clock, the SAME
 * hex — only the WIND differs. A blind agent must name the gale from the kite alone. On
 * HEAD that pair is byte-identical for the kite (the probe measures it at exactly 0 px), so
 * a correct answer here is only possible if the feature works.
 *
 * ⚠ PIN THE WIND (275). WINDA is recomputed from `time` inside advanceEntities, which only
 *   runs while playing — so a frozen page holds whatever gust it loaded on, and two shots of
 *   the same file drew different weather. `__setWind` (280) is the hook that was missing.
 * ⚠ AIM BY MEASURED INK, scored PER KITE, then pan to THAT kite's own anchor (226/272) —
 *   never at "the first kite" or "the middle of the beach".
 * ⚠ DRIVE `zoom`, NEVER `scale` (269): the contract is `zoom=n; scale=fitScale*zoom`. Setting
 *   `scale` renders a zoomed canvas under a HUD still reporting 1x, and an agent will
 *   correctly refuse to grade it.
 * ⚠ `page.screenshot()`, not a canvas readback — the user sees canvas PLUS DOM (200).
 * ⚠ Frames are named by FILE with MEANINGLESS tokens, and the map is CROSSED between seeds
 *   (238/239/268) — an ordinal like one/two carries the same order an A/B letter does.
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = join(HERE, '../../../../solvista.html');
const SRC = process.env.SRC || ART;
const OUT = process.argv[2] || join(HERE, '../shots/windkite');
mkdirSync(OUT, { recursive: true });

const CALM = 0.25, GALE = 1.0, WARP = 61, DAYT = 0.35, ZOOM = 5.0;
/* the map is CROSSED between seeds: on 42 kappa=calm, on 7 kappa=gale */
const MAP = { 42: { kappa: CALM, sigma: GALE }, 7: { kappa: GALE, sigma: CALM } };

const browser = await chromium.launch();
for (const seed of [42, 7]) {
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.addInitScript(() => {
    let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  });
  await page.goto(pathToFileURL(SRC).href);
  await page.waitForTimeout(400);

  const info = await page.evaluate(async ({ seed, WARP, DAYT, ZOOM, CALM }) => {
    playing = false;                       /* stops BOTH clocks; WINDA then holds a pin */
    STARS.length = 0; flock = null; waveT = 0;
    genWorld(seed); __warp(WARP);
    __setTime(DAYT);
    if (window.__setWind) __setWind(CALM);
    render();

    /* --- aim by MEASURED INK, scored per KITE (226/272) ------------------------------ */
    const cvs = document.querySelector('canvas'), g2 = cvs.getContext('2d');
    const W = cvs.width, H = cvs.height;
    const grab = () => { render(); return g2.getImageData(0, 0, W, H).data; };
    const P = CanvasRenderingContext2D.prototype, rf = P.fill, rs = P.stroke;
    let SUP = false;
    const hit = () => SUP && new Error().stack.includes('drawKite');
    P.fill = function (...a) { if (hit()) return; return rf.apply(this, a); };
    P.stroke = function (...a) { if (hit()) return; return rs.apply(this, a); };
    SUP = false; const A = grab();
    SUP = true; const B = grab();
    SUP = false;
    /* ⚠ px() returns WORLD coords -- the canvas TRANSFORM maps them to the screen. Scoring
       ink at `px()*dpr` samples the wrong place entirely and returns a clean, plausible
       ZERO (273: a suppression rig's zero convicts the rig). screen = world*scale + off. */
    const toDev = (ax, ay) => [(ax * scale + offX) * dpr, (ay * scale + offY) * dpr];
    const best = { ink: -1, k: null };
    for (const k of kites) {
      const [ax, ay] = px(k.x + 0.5, k.y + 0.5);
      const [cx, cy] = toDev(ax, ay - 30);
      const R = 70 * dpr;
      let ink = 0;
      for (let y = Math.max(0, cy - R | 0); y < Math.min(H, cy + R); y++)
        for (let x = Math.max(0, cx - R | 0); x < Math.min(W, cx + R); x++) {
          const i = (y * W + x) * 4;
          if (Math.abs(A[i] - B[i]) + Math.abs(A[i + 1] - B[i + 1]) + Math.abs(A[i + 2] - B[i + 2]) > 12) ink++;
        }
      if (ink > best.ink) { best.ink = ink; best.k = k; }
    }
    /* the kite's DRAWN apex sits ~44px above its anchor: frame the kite, not the sand */
    const [wx, wy] = px(best.k.x + 0.5, best.k.y + 0.5);
    return { wx, wy: wy - 28, ink: best.ink, kites: kites.length, litamt: LITAMT, ZOOM };
  }, { seed, WARP, DAYT, ZOOM, CALM });

  for (const [tok, wind] of Object.entries(MAP[seed])) {
    /* CLOSE-UP: aimed at the best-inked kite, wind pinned */
    await page.evaluate(({ wx, wy, ZOOM, wind }) => {
      if (window.__setWind) __setWind(wind);
      zoom = ZOOM; scale = fitScale * zoom;              /* 269: zoom is the input, scale derived */
      offX = innerWidth / 2 - wx * scale; offY = innerHeight / 2 - wy * scale;   /* 272: pan by SCALE */
      clampPan(); render();
    }, { wx: info.wx, wy: info.wy, ZOOM, wind });
    await page.screenshot({ path: join(OUT, `s${seed}-${tok}-kite.png`) });

    /* WHOLE CITY, un-zoomed — the cumulative read (never only the feature) */
    await page.evaluate(({ wind }) => {
      if (window.__setWind) __setWind(wind);
      zoom = 1; scale = fitScale * zoom; offX = fitX; offY = fitY;
      clampPan(); render();
    }, { wind });
    await page.screenshot({ path: join(OUT, `s${seed}-${tok}-city.png`) });
  }
  console.log(`seed ${seed}: ${info.kites} kites, aimed at the best-inked one (${info.ink} px), LITAMT=${info.litamt.toFixed(3)}` +
    `  [truth: ${Object.entries(MAP[seed]).map(([t, w]) => `${t}=${w === CALM ? 'CALM' : 'GALE'}`).join(' ')}]`);
  await page.close();
}
await browser.close();
console.log(`\nframes -> ${OUT}`);
