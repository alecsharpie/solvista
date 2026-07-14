#!/usr/bin/env node
/* shot-bloomwave.mjs — the camera for the wildflower wave (iter 263).
 *
 * THE QUESTION IS A COUNT, NOT A JUDGEMENT (108). HEAD renders ZERO hexes in flower in
 * the year we screenshot, on every seed; the patch renders ~10 at load. So the agent is
 * asked to COUNT flowering hexes, and its answer is checkable against ground truth this
 * script already holds and prints.
 *
 * ⚠ SELF-REPORT IN THE VIEWER'S UNITS (236). The caption says "14 hexes in flower", which
 * a viewer could in principle arrive at by looking — never `bloom=7` or a tick index.
 *
 * ⚠ AIMED BY MEASURED INK (226), NOT BY A PREDICATE. The aim is the argmax of the BLOOM'S
 * OWN ink: render the frozen world twice in ONE page, once with bloomAt() suppressed
 * (230 — suppress the DRAW, not the build), and the changed pixels ARE the flowers, at a
 * floor of exactly 0, off the final composited canvas (so occlusion is priced for free).
 *
 * ⚠ The aim is then FORCED onto the HEAD build (AIM=wx,wy) so both builds frame the
 * IDENTICAL hex and the pair is blind — HEAD's coastal park is the same grass, simply not
 * in flower. Frames are named BY FILE, never by a letter (239); the caller crosses the
 * build->name map between seeds (238).
 *
 * ⚠ DAY PIN. The butterflies are gated LITAMT<0.4, so a night frame cannot show them; the
 * flowers are a daytime feature and are shot as one.
 *
 *   node shot-bloomwave.mjs <seed> <outdir>        # TAG=<name> SRC=<path> AIM=wx,wy
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
const SRC = process.env.SRC || ROOT;
const TAG = process.env.TAG || 'patch';
const AIM = process.env.AIM ? process.env.AIM.split(',').map(Number) : null;
const SEED = Number(process.argv[2] || 42);
const OUT = process.argv[3] || '.claude/skills/grow-city/shots/bloom';
const WARP = 61, ZOOM = 4.2, DAYT = 0.30;
mkdirSync(OUT, { recursive: true });

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2 });
await p.addInitScript(() => {                       /* 213 — same stream on both builds */
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await p.goto(pathToFileURL(SRC).href);
await p.waitForFunction(() => typeof window.__warp === 'function');

await p.evaluate(({ seed, warp, t }) => {
  playing = false;
  genWorld(seed); __warp(warp);
  __setTime(t); render();
}, { seed: SEED, warp: WARP, t: DAYT });

/* the aim: argmax of the FLOWERS' OWN ink, by suppressing the draw in one page (226/230) */
const aim = AIM || await p.evaluate(() => {
  const cv = document.querySelector('canvas');
  const g = () => cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data;
  const A = g();
  const keep = window.bloomAt;
  window.bloomAt = () => {};  render();                  /* suppress the DRAW */
  const B = g();
  window.bloomAt = keep;      render();

  const dpr = cv.width / innerWidth;
  let best = [0, 0], bestInk = -1;
  for (const i of HEXI) {
    const c = cells[i]; if (!c || !(c.bloom > 0)) continue;
    const x = i % G, y = (i / G) | 0;
    const [wx, wy] = ctr(x, y);
    const sx = (wx * scale + offX) * dpr, sy = (wy * scale + offY) * dpr;
    let ink = 0;                                          /* ink in a 3-hex neighbourhood */
    for (let py = Math.max(0, sy - 60 | 0); py < Math.min(cv.height, sy + 60); py++)
      for (let px2 = Math.max(0, sx - 60 | 0); px2 < Math.min(cv.width, sx + 60); px2++) {
        const k = (py * cv.width + px2) * 4;
        ink += Math.abs(A[k] - B[k]) + Math.abs(A[k + 1] - B[k + 1]) + Math.abs(A[k + 2] - B[k + 2]);
      }
    if (ink > bestInk) { bestInk = ink; best = [wx, wy]; }
  }
  return best;
});

const state = () => p.evaluate(() => {
  let flower = 0, host = 0;
  for (const i of HEXI) {
    const c = cells[i]; if (!c) continue;
    if (c.t === T.SHOREPARK || c.t === T.MEADOW) { host++; if (c.bloom > 0) flower++; }
  }
  return { flower, host, dayT: +dayT.toFixed(3), lit: +LITAMT.toFixed(2) };
});

const shoot = async (name, zoom) => {
  await p.evaluate(({ aim, zoom, t }) => {
    __setTime(t);
    if (zoom) { scale = fitScale * zoom; offX = innerWidth / 2 - aim[0] * scale; offY = innerHeight / 2 - aim[1] * scale; }
    else { window.zoom = 1; scale = fitScale; offX = fitX; offY = fitY; }
    render();
    lastSky = 0; syncSky(performance.now()); syncStats();   /* 204 — the DOM is not live */
  }, { aim, zoom, t: DAYT });
  const st = await state();
  const f = join(OUT, `${TAG}_${name}.png`);
  await p.screenshot({ path: f });                           /* 200 — DOM composited */
  console.log(`  ${f}\n     ${st.flower} hexes IN FLOWER of ${st.host} grassland · dayT=${st.dayT} LITAMT=${st.lit}${zoom ? '' : '  (un-zoomed whole city)'}`);
};

console.log(`\n${SRC}  [${TAG}]  seed ${SEED} · aim ${aim.map(v => v.toFixed(1))}`);
await shoot('close', ZOOM);
await shoot('city', 0);
await b.close();
