#!/usr/bin/env node
/* shot-greenhue.mjs — iter 265: the camera for the golden hour's green.
 *
 * The complaint is a WHOLE-PLATE one ("the amber wash flattens the whole plate into
 * near-monochrome terracotta"), so the primary frame is UN-ZOOMED. A close-up on a park is
 * carried beside it, AIMED BY MEASURED INK (226) — 234's palette suppression gives the mask
 * for free, so the camera points where the greens provably render rather than at a guessed clip.
 *
 * ⚠ THE GOLDEN PIN IS DERIVED, NEVER TYPED (264's law — the one that cost the last step-back two
 * false FAILs on four agent reads). 261 gave the light curve a `year` term, so any literal `t` is
 * a guess about a curve that has moved: the old `0.68` lands in mid-afternoon at GWARM 0.36 of a
 * possible 0.779. Golden = the ARGMAX of the shipped GWARM, found by driving the artifact's own
 * code (249), exactly as shot-stepback does.
 *
 * ⚠ THE DAY FRAME IS A REQUIRED POSITIVE TWIN, NOT DECORATION (258). goldenWash() is 0 at noon, so
 * daylight runs BYTE-IDENTICAL code on both builds — the two day frames MUST be indistinguishable.
 * If an agent can tell them apart, the patch has leaked into daylight and the lap is wrong. It is
 * the free dead-regime control (199), pointed at the camera instead of at a probe.
 *
 * Frames are named BY FILE, never by a letter (239) — an A/B letter is a pointer the agent must
 * carry across four images, and pointers get swapped. Each frame SELF-REPORTS its own state (202)
 * in the VIEWER'S units (236). Shot with page.screenshot(), so the DOM placard composites (200).
 *
 *   node shot-greenhue.mjs <seed> <outdir>            # the working tree
 *   SRC=/tmp/head.html TAG=head node shot-greenhue.mjs <seed> <outdir>
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = process.env.SRC ? resolve(process.env.SRC) : join(HERE, '../../../../solvista.html');
const TAG = process.env.TAG || 'patch';
const SEED = +(process.argv[2] || 42);
const OUT = resolve(process.argv[3] || '.');
const DRY = 2035.62;                      /* applySeason's golden dry peak, off winter (202) */
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1500, height: 950 } });
await page.addInitScript(() => {          /* 213: stub the PRNG before the page's own script */
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await page.goto(pathToFileURL(SRC).href);
await page.waitForFunction(() => typeof window.__warp === 'function');

/* freeze the world once, derive the pin, and find where the greens actually render */
const info = await page.evaluate(([seed, dry]) => {
  playing = false;                         /* both clocks stop */
  genWorld(seed); window.__warp(61);
  time = 0; waveT = 0;
  if (typeof STARS !== 'undefined') STARS.length = 0;
  if (typeof flock !== 'undefined') flock = null;
  window.__setYear(dry);

  let goldenT = 0, best = -1;              /* 264: FOUND, not guessed */
  for (let t = 0.55; t <= 0.95; t += 0.005) {
    window.__setTime(t); render();
    if (GWARM > best) { best = GWARM; goldenT = t; }
  }

  /* 226/234: aim by MEASURED INK — loud-paint the greens and take the argmax window of their mask */
  window.__setTime(goldenT); render();
  const cvs = document.querySelector('canvas'), c2 = cvs.getContext('2d');
  const grab = () => { render(); return c2.getImageData(0, 0, cvs.width, cvs.height).data; };
  const NAMES = ['grass', 'grassDk', 'lawn', 'meadow', 'canopy', 'canopyLt', 'evergreen', 'evergreenLt', 'turf', 'sage', 'sprout'];
  const A = grab();
  const keep = {}; for (const n of NAMES) if (BASE[n]) { keep[n] = BASE[n].slice(); BASE[n] = [255, 0, 255]; }
  CCACHE = {}; const B = grab();
  for (const n of NAMES) if (keep[n]) BASE[n] = keep[n];
  CCACHE = {};

  const dpr = cvs.width / cvs.clientWidth, CW = cvs.width;
  const cell = 120 * dpr; const gw = Math.ceil(cvs.width / cell), gh = Math.ceil(cvs.height / cell);
  const bins = new Float64Array(gw * gh);
  for (let i = 0; i < A.length; i += 4) {
    const d = Math.abs(A[i] - B[i]) + Math.abs(A[i + 1] - B[i + 1]) + Math.abs(A[i + 2] - B[i + 2]);
    if (d > 150) { const p = (i / 4) | 0, x = p % CW, y = (p / CW) | 0; bins[((y / cell) | 0) * gw + ((x / cell) | 0)] += 1; }
  }
  let bi = 0; for (let i = 1; i < bins.length; i++) if (bins[i] > bins[bi]) bi = i;
  const sx = (((bi % gw) + 0.5) * cell) / dpr, sy = (((bi / gw | 0) + 0.5) * cell) / dpr;
  /* screen -> world, so the HEAD build can be forced to the identical hex */
  return { goldenT: +goldenT.toFixed(3), goldenGW: +best.toFixed(2),
           wx: (sx - offX) / scale, wy: (sy - offY) / scale, ink: bins[bi] };
}, [SEED, DRY]);

const AIM = process.env.AIM ? process.env.AIM.split(',').map(Number) : [info.wx, info.wy];
console.log(`seed ${SEED} [${TAG}]  golden t=${info.goldenT} (GWARM ${info.goldenGW})  aim=${AIM.map(v => v.toFixed(0)).join(',')}`);

for (const [name, t, zoom] of [['golden-city', info.goldenT, 0], ['golden-park', info.goldenT, 4.2],
                               ['day-city', 0.30, 0]]) {
  const cap = await page.evaluate(([t, zoom, aim]) => {
    window.__setTime(t);
    /* the artifact's own fit camera — its globals, not a hook: `__fit` does not exist (shot-canopy
       has been carrying a dead reference to it). This is the '0' key's reset, at L8467. */
    if (zoom) { scale = zoom; offX = innerWidth / 2 - aim[0] * scale; offY = innerHeight / 2 - aim[1] * scale; }
    else { window.zoom = 1; scale = fitScale; offX = fitX; offY = fitY; }
    render();
    lastSky = 0; syncSky(performance.now()); syncStats();   /* 204: a frozen clock does not refresh the DOM */
    render();
    /* 202/236: the frame self-reports, in the units a viewer could actually check */
    return `dayT=${t.toFixed(3)} GWARM=${GWARM.toFixed(2)} LITAMT=${LITAMT.toFixed(2)} ` +
           `TINT=[${TINT.map(v => v.toFixed(2)).join(',')}]`;
  }, [t, zoom, AIM]);
  const f = join(OUT, `${name}.${TAG}.png`);
  await page.screenshot({ path: f });      /* 200: DOM-composited, not a canvas readback */
  console.log(`  ${name}.${TAG}.png   ${cap}`);
}
await browser.close();
