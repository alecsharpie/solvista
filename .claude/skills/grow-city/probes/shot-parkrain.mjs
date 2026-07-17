#!/usr/bin/env node
/* shot-parkrain.mjs — the daytime-park-crowd come-in-from-the-rain camera (iter 337).
 *
 * The park picnickers and the pickup ballgame now come IN when a shower crosses (dryAt =
 * rainingAt<RAINDRY), the siblings 336 left out of the same block. Shoot the SAME frozen
 * afternoon city twice: DRY (rainingAt->0, == HEAD, crowds out) and WET (rainingAt->1,
 * emptied), as a blind A/B. Aim by MEASURED INK (226/272): the ONLY thing that differs
 * between DRY and WET is the picnic/ballgame crowds, so the argmax window of the DRY-vs-WET
 * pixel diff IS where they render — no guessed clip. Tokens meaningless + non-ordinal, map
 * CROSSED between seeds (238/239/268). page.screenshot (200). Drive zoom, never scale (269).
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';

const HERE = dirname(fileURLToPath(import.meta.url));
const { chromium } = await import(
  join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.mjs')
);

const SRC = process.env.SRC || join(HERE, '../../../../solvista.html');
const SEED = +(process.argv[2] || 42);
const OUT = process.argv[3] || join(HERE, '../shots/parkrain');
mkdirSync(OUT, { recursive: true });
const PAGE = pathToFileURL(SRC).href;

/* CROSS the map between seeds (238): which token is the DRY (busy) frame */
const DRY_TOKEN = SEED === 42 ? 'wren' : 'lark';
const WET_TOKEN = SEED === 42 ? 'lark' : 'wren';

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2 });
await p.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await p.goto(`${PAGE}?seed=${SEED}`);
await p.waitForTimeout(300);

/* freeze a mature afternoon city, then find the aim by ink: diff DRY vs WET at fit zoom, take
   the densest window of the change (= where the picnic/ballgame crowds render), zero the HUD
   boxes first (200), and convert to world coords for the pan. */
const aim = await p.evaluate((seed) => {
  playing = false;
  genWorld(seed);
  __warp(61);                                       /* -> ~2035 */
  __setYear(2035.62);                               /* dry peak: picnics maximal */
  waveT = 3.0; STARS.length = 0; flock = null;
  for (const c of cells) if (c.h < c.th) c.h = c.th;
  const cvs = document.querySelector('canvas');
  scale = fitScale; offX = fitX; offY = fitY; zoom = 1;
  const grab = (rain) => {
    window.rainingAt = () => rain;
    __setTime(0.60); render();                       /* afternoon: LITAMT<0.5, games at full strength */
    return ctx.getImageData(0, 0, cvs.width, cvs.height).data;
  };
  const A = grab(0), B = grab(1);
  window.rainingAt = () => 0;
  /* HUD boxes to zero out of the ink map (200): placard TL, census/controls corners */
  const W = cvs.width, H = cvs.height, dpr = W / cvs.clientWidth;
  const hud = [[0, 0, 320, H], [0, H - 220 * dpr, 420 * dpr, H], [W - 340 * dpr, H - 220 * dpr, W, H]];
  const inHud = (x, y) => hud.some(([x0, y0, x1, y1]) => x >= x0 && x < x1 && y >= y0 && y < y1);
  const win = 150 * dpr | 0, step = 20 * dpr | 0;
  let best = -1, bx = W / 2, by = H / 2;
  for (let cy = win; cy < H - win; cy += step) for (let cx = win; cx < W - win; cx += step) {
    let s = 0;
    for (let y = cy - win; y < cy + win; y += 4) for (let x = cx - win; x < cx + win; x += 4) {
      if (inHud(x, y)) continue;
      const i = (y * W + x) * 4;
      s += Math.abs(A[i] - B[i]) + Math.abs(A[i + 1] - B[i + 1]) + Math.abs(A[i + 2] - B[i + 2]);
    }
    if (s > best) { best = s; bx = cx; by = cy; }
  }
  /* screen(css) -> world at fit: screen = world*scale + off */
  const sx = bx / dpr, sy = by / dpr;
  const wx = (sx - offX) / scale, wy = (sy - offY) / scale;
  return { wx, wy };
}, SEED);

async function shoot(file, rain, z, label) {
  const cap = await p.evaluate(({ rain, z, wx, wy }) => {
    __setTime(0.60);                                /* afternoon: LITAMT<0.5, crowds out */
    window.rainingAt = () => rain;                  /* 0 = dry (==HEAD) · 1 = raining everywhere */
    const cvs = document.querySelector('canvas');
    if (z === 1) { scale = fitScale; offX = fitX; offY = fitY; zoom = 1; }
    else { zoom = z; scale = fitScale * z; offX = cvs.clientWidth / 2 - wx * scale; offY = cvs.clientHeight / 2 - wy * scale; if (typeof clampPan === 'function') clampPan(); }
    render(); lastSky = 0; syncSky(performance.now()); syncStats(); render();
    return `afternoon dayT=0.60 LITAMT=${LITAMT.toFixed(2)} · rain=${rain} · zoom=${zoom}x`;
  }, { rain, z, wx: aim.wx, wy: aim.wy });
  await p.screenshot({ path: file });
  console.log(`  ${file}\n      [${label}] ${cap}`);
}

/* whole-city dry (the natural HEAD afternoon scene) for the holistic read */
await shoot(join(OUT, `s${SEED}-city-dry.png`), 0, 1, 'whole-city DRY (=HEAD)');
/* blind A/B zoomed on the crowds (aimed by measured ink) */
await shoot(join(OUT, `s${SEED}-park-${DRY_TOKEN}.png`), 0, 5, `park ${DRY_TOKEN} (DRY, busy)`);
await shoot(join(OUT, `s${SEED}-park-${WET_TOKEN}.png`), 1, 5, `park ${WET_TOKEN} (WET, emptied)`);

await b.close();
console.log(`\nblind pair: s${SEED}-park-${DRY_TOKEN}.png vs s${SEED}-park-${WET_TOKEN}.png (DRY=${DRY_TOKEN}, crossed per seed)`);
