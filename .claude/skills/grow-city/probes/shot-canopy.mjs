#!/usr/bin/env node
/* shot-canopy.mjs — the camera for iter 238's canopy calendar.
 *
 * Shoots the SAME frozen world at WINTER (2035.02) and the GOLDEN DRY PEAK (2035.62), so the
 * pair answers one question: do the city's trees change between the two frames?
 *
 * Freezes in-page exactly as shot-stepback does (202/204): playing=false stops BOTH clocks,
 * genWorld+__warp+__setYear+__setTime pin the world, and lastSky/syncSky/syncStats are forced
 * because a frozen clock does NOT refresh the DOM. Renders once, no wait, page.screenshot()
 * (DOM-composited, 200).
 *
 * AIM: the close-up is aimed by MEASURED INK (226), not by a guessed clip and not by a tile
 * predicate — loud-paint BASE.canopy/canopyLt with applySeason no-oped, diff in ONE page, and
 * the argmax window of that mask is where the deciduous canopy provably renders densest.
 * AIM=wx,wy forces the world point so the HEAD build frames the IDENTICAL hex and the
 * before/after pair is blind.
 *
 *   node shot-canopy.mjs <seed> <outdir>            # working tree; prints the AIM it chose
 *   SRC=/tmp/head.html AIM=812,430 node shot-canopy.mjs <seed> <outdir>
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(process.env.SRC || join(HERE, '../../../../solvista.html')).href;

const seed = parseInt(process.argv[2] || '42', 10);
const outdir = resolve(process.argv[3] || join(HERE, '../shots/canopy'));
const tag = process.env.SRC ? 'head' : 'patch';
mkdirSync(outdir, { recursive: true });

const CAL = [['winter', 0.02], ['dry', 0.62]];
const WARP = 61, DAYT = 0.30;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
await p.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await p.goto(`${PAGE}?seed=${seed}&warp=${WARP}&t=${DAYT}`);
await p.waitForTimeout(400);

/* freeze + pin, once */
await p.evaluate(({ seed, WARP, DAYT }) => {
  playing = false;
  genWorld(seed); __warp(WARP); __setTime(DAYT);
  window.__fit = [scale, offX, offY];
}, { seed, WARP, DAYT });

/* --- find where the canopy actually renders (measured ink), unless AIM is forced --- */
let aim = process.env.AIM ? process.env.AIM.split(',').map(Number) : null;
if (!aim) {
  aim = await p.evaluate(() => {
    __setYear(2035.62); render();
    const W = cvs.width, H = cvs.height, g = ctx;
    const A = g.getImageData(0, 0, W, H).data;
    const saveAS = applySeason; applySeason = () => {};
    const kc = BASE.canopy.slice(), kl = BASE.canopyLt.slice();
    BASE.canopy = [255, 0, 255]; BASE.canopyLt = [0, 255, 255]; CCACHE = {};
    render();
    const B = g.getImageData(0, 0, W, H).data;
    BASE.canopy = kc; BASE.canopyLt = kl; applySeason = saveAS; CCACHE = {};
    /* argmax window of the mask = densest deciduous canopy on screen */
    const dpr = cvs.width / cvs.clientWidth, win = Math.round(190 * dpr), step = Math.round(24 * dpr);
    let best = -1, bx = 0, by = 0;
    for (let y = 0; y + win < H; y += step) for (let x = 0; x + win < W; x += step) {
      let n = 0;
      for (let j = y; j < y + win; j += 3) for (let i = x; i < x + win; i += 3) {
        const k = (j * W + i) * 4;
        if (A[k] !== B[k] || A[k + 1] !== B[k + 1] || A[k + 2] !== B[k + 2]) n++;
      }
      if (n > best) { best = n; bx = x; by = y; }
    }
    /* screen centre of that window -> WORLD point, so a re-zoom can re-centre on it */
    const sx = (bx + win / 2) / dpr, sy = (by + win / 2) / dpr;
    return [(sx - offX) / scale, (sy - offY) / scale];
  });
  console.log(`AIM=${aim.map(v => Math.round(v)).join(',')}   (argmax canopy ink)`);
}

for (const [cal, yf] of CAL) {
  /* whole city, un-zoomed — the rule: read the WHOLE frame, not just the feature */
  const state = await p.evaluate(({ yf, cal }) => {
    const [s, ox, oy] = window.__fit; scale = s; offX = ox; offY = oy;
    __setYear(2035 + yf);
    lastSky = 0; syncSky(performance.now()); syncStats();   /* 204: a frozen clock does not refresh the DOM */
    render();
    return `${cal}  year=${year.toFixed(2)} s=${(((year % 1) + 1) % 1).toFixed(2)} dayT=${dayT.toFixed(2)} LITAMT=${LITAMT.toFixed(2)}`;
  }, { yf, cal });
  console.log('  ' + state);
  await p.screenshot({ path: join(outdir, `${tag}-${cal}-city.png`) });

  /* the close-up, aimed at the measured canopy */
  await p.evaluate(({ yf, aim }) => {
    scale = 4.4;
    offX = innerWidth / 2 - aim[0] * scale;
    offY = innerHeight / 2 - aim[1] * scale;
    __setYear(2035 + yf);
    lastSky = 0; syncSky(performance.now()); syncStats();
    render();
  }, { yf, aim });
  await p.screenshot({ path: join(outdir, `${tag}-${cal}-trees.png`) });
}
await b.close();
console.log(`  -> ${outdir}/${tag}-{winter,dry}-{city,trees}.png`);
