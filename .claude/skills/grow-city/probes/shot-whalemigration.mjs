#!/usr/bin/env node
/* shot-whalemigration.mjs — the gray whales' camera.
 *
 * The change: the whales now keep a MIGRATION (whaleSeason) — present through the cool
 * half of the year, gone to the northern feeding grounds through the golden summer and
 * autumn. HEAD drew them all year round.
 *
 * ⚠ 258: the success condition in SUMMER is an ABSENCE — "the offing is empty" — and a
 *   frame that simply MISSES the whales renders exactly like a correct one. So the WINTER
 *   frame is a REQUIRED POSITIVE TWIN at the IDENTICAL aim, where the whales MUST be
 *   visible, and every frame SELF-REPORTS its year, whaleSeason() and the whale count
 *   the frame actually drew (202/236). If the agent cannot see whales in winter, the
 *   camera is broken and the summer frame proves nothing.
 * ⚠ Aim by MEASURED INK (226/230): suppress drawWhale in ONE page, diff, centre on the
 *   densest window — so the crop provably contains whales in winter, and the SAME aim
 *   holds the summer control.  Whales flooded (?flood=) so the scatter is legible.
 * ⚠ playing=false is not a frozen clock (195f): pin time/waveT before genWorld/__warp;
 *   clear flock/STARS (199/163d).  Frames named by FILE, tokens meaningless, map CROSSED
 *   between seeds (238/239/268).  page.screenshot (DOM composited, 200).
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
const OUT = process.argv[3] || '.claude/skills/grow-city/shots/whale';
const SRC = process.env.SRC || ROOT;
mkdirSync(OUT, { recursive: true });
const WARP = 61, ZOOM = 2.2, WAVET = 3.1;      /* WAVET chosen so several whales are surfaced */
/* CROSS the winter/summer token map between seeds so no token is always the treatment */
const TOK = SEED === 7 ? { winter: 'alpha', summer: 'gamma' } : { winter: 'gamma', summer: 'alpha' };

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
await p.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await p.goto(pathToFileURL(SRC).href + '?flood=whales:16');
await p.waitForFunction(() => typeof window.__warp === 'function');

const info = await p.evaluate(({ seed, warp, ZOOM, WAVET }) => {
  playing = false; time = 0; waveT = 0;
  genWorld(seed); __warp(warp); time = 0; waveT = WAVET; flock = null; STARS.length = 0;
  const hasNew = typeof whaleSeason === 'function';
  const cv = document.querySelector('canvas'), gg = cv.getContext('2d');
  const midX = cv.width / 2, midY = cv.height / 2;

  /* aim by measured whale ink in a WINTER daylight frame (whales present) */
  __setYear(2035.02); __setTime(0.42);
  zoom = 1; scale = fitScale; offX = fitX; offY = fitY;
  const grab = () => gg.getImageData(0, 0, cv.width, cv.height).data;
  const real = window.drawWhale;
  render(); const A = grab();
  window.drawWhale = () => {}; render(); const Bt = grab(); window.drawWhale = real;
  /* densest 160px window of |A-B| = where the whales are */
  let bx = midX, by = midY, best = -1; const W = cv.width, H = cv.height, step = 8, R = 80;
  const ink = (x, y) => { const i = (y * W + x) * 4; return Math.abs(A[i] - Bt[i]) + Math.abs(A[i + 1] - Bt[i + 1]) + Math.abs(A[i + 2] - Bt[i + 2]); };
  for (let y = R; y < H - R; y += step) for (let x = R; x < W - R; x += step) {
    let s = 0; for (let yy = -R; yy <= R; yy += step) for (let xx = -R; xx <= R; xx += step) s += ink(x + xx, y + yy);
    if (s > best) { best = s; bx = x; by = y; }
  }
  return { hasNew, aim: [(bx - offX) / scale, (by - offY) / scale] };   /* aim in WORLD coords */
}, { seed: SEED, warp: WARP, ZOOM, WAVET });

/* take the three screenshots, re-pinning per frame so the DOM composites the right state */
async function frame(kind, yr, aim) {
  return p.evaluate(({ yr, ZOOM, kind, aim }) => {
    __setYear(yr); __setTime(0.42);
    const cv = document.querySelector('canvas'), midX = cv.width / 2, midY = cv.height / 2;
    if (kind === 'city') { zoom = 1; scale = fitScale; offX = fitX; offY = fitY; }
    else { zoom = ZOOM; scale = fitScale * ZOOM; offX = midX - aim[0] * scale; offY = midY - aim[1] * scale; clampPan(); }
    for (const w of whales) w._sf = -777; render();
    lastSky = 0; syncSky(performance.now()); syncStats();
    return { ws: typeof whaleSeason === 'function' ? Math.round(whaleSeason() * 100) / 100 : 1,
      drawn: whales.filter(w => w._sf !== -777).length };
  }, { yr, ZOOM, kind, aim });
}

for (const [kind, yr, tok] of [
  ['zoom', 2035.02, TOK.winter], ['zoom', 2035.62, TOK.summer], ['city', 2035.02, 'city']]) {
  const r = await frame(kind, yr, info.aim);
  const name = kind === 'city' ? `s${SEED}-city-winter` : `s${SEED}-${kind}-${tok}`;
  await p.screenshot({ path: join(OUT, name + '.png') });
  console.log(`${name}.png   year ${yr}  whaleSeason ${r.ws}  whales drawn ${r.drawn}  build ${info.hasNew ? 'patch' : 'HEAD'}`);
}
await b.close();
