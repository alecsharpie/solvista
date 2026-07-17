#!/usr/bin/env node
/* shot-bloomseason.mjs — the wildflowers' camera.
 *
 * The change: the grassland/park bloom wave (bloomAt) now keeps a SPRING calendar
 * (bloomSeason) — flowers open in spring and are gone by the dry peak, through the
 * summer, the autumn and the deep-winter snow. HEAD drew them every season, incl.
 * flowers ON the snow.
 *
 * ⚠ 258: the success condition in WINTER is an ABSENCE (bare snowy grass, no flowers)
 *   and a frame that simply misses a flowering hex renders like a correct one. So the
 *   SPRING frame is the REQUIRED POSITIVE TWIN at the IDENTICAL aim — flowers MUST be
 *   visible there — and every frame SELF-REPORTS its year, bloomSeason() and the count
 *   of host hexes it would flower (202/236). If spring shows no flowers, the camera is
 *   broken and the winter frame proves nothing.
 * ⚠ Spring and winter are SEPARATE world builds ticked into their own season, so the
 *   snow melts for spring and lies for winter (a frozen world would carry stale snow).
 *   Same seed+warp ⇒ identical terrain, so the world-data aim frames the same ground.
 * ⚠ Aim by WORLD DATA (the host cell with the most bloom>0 hosts around it), so the
 *   crop provably contains flowering ground regardless of the season gate.
 * ⚠ playing=false is not a frozen clock (195f): pin time/waveT; clear flock/STARS.
 *   Frames named by FILE, tokens meaningless, map CROSSED between seeds (238/239/268).
 *   page.screenshot (DOM composited, 200); force syncSky/syncStats (204).
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
const OUT = process.argv[3] || '.claude/skills/grow-city/shots/bloom';
const SRC = process.env.SRC || ROOT;
mkdirSync(OUT, { recursive: true });
const WARP = 26, ZOOM = 3.0;               /* ~2000: meadows still stand */
/* CROSS the spring/winter token map between seeds so no token is always "the flowers" */
const TOK = SEED === 7 ? { spring: 'alpha', winter: 'gamma' } : { spring: 'gamma', winter: 'alpha' };

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
await p.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await p.goto(pathToFileURL(SRC).href);
await p.waitForFunction(() => typeof window.__warp === 'function');

/* build a spring world, aim by world data, return aim in world coords */
const aim = await p.evaluate(({ seed, warp }) => {
  playing = false; time = 0; waveT = 0;
  genWorld(seed); __warp(warp);
  __setYear((year | 0) + 0.34);                 /* spring: snow melts, wave runs */
  for (let k = 0; k < 12; k++) tick();
  const isHost = c => c.t === T.MEADOW || c.t === T.SHOREPARK;
  let best = -1, bx = CTRX, by = CTRY;
  for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
    const c = cells[idx(x, y)]; if (!isHost(c) || c.bloom <= 0) continue;
    let s = 0; for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
      const n = cellAt(x + dx, y + dy); if (n && isHost(n) && n.bloom > 0) s++;
    }
    if (s > best) { best = s; bx = x; by = y; }
  }
  const [wx, wy] = ctr(bx, by);
  return [wx, wy];
}, { seed: SEED, warp: WARP });

async function frame(kind, seasonFrac, aimW) {
  return p.evaluate(({ seed, warp, seasonFrac, ZOOM, kind, aimW }) => {
    playing = false; time = 0; waveT = 1.4;
    genWorld(seed); __warp(warp); flock = null; STARS.length = 0;
    __setYear((year | 0) + seasonFrac);
    for (let k = 0; k < 12; k++) tick();          /* settle snow (winter) / melt it (spring) + run the wave */
    __setTime(0.40);                              /* bright day */
    const cv = document.querySelector('canvas'), midX = cv.width / 2, midY = cv.height / 2;
    if (kind === 'city') { zoom = 1; scale = fitScale; offX = fitX; offY = fitY; }
    else { zoom = ZOOM; scale = fitScale * ZOOM; offX = midX - aimW[0] * scale; offY = midY - aimW[1] * scale; clampPan(); }
    render();
    lastSky = 0; syncSky(performance.now()); syncStats();
    const isHost = c => c.t === T.MEADOW || c.t === T.SHOREPARK;
    const bs = typeof bloomSeason === 'function' ? bloomSeason() : 1;
    const flowering = bs > 0 ? cells.filter(c => isHost(c) && c.bloom > 0).length : 0;
    const snowy = cells.filter(c => c.snow > 0.05).length;
    return { bs: Math.round(bs * 100) / 100, flowering, snowy };
  }, { seed: SEED, warp: WARP, seasonFrac, ZOOM, kind, aimW });
}

const build = (await p.evaluate(() => typeof bloomSeason === 'function')) ? 'patch' : 'HEAD';
for (const [kind, frac, tok] of [
  ['zoom', 0.34, TOK.spring], ['zoom', 0.02, TOK.winter], ['city', 0.02, 'city-winter']]) {
  const r = await frame(kind, frac, aim);
  const name = kind === 'city' ? `s${SEED}-city-winter` : `s${SEED}-${kind}-${tok}`;
  await p.screenshot({ path: join(OUT, name + '.png') });
  console.log(`${name}.png   frac ${frac}  bloomSeason ${r.bs}  flowering-hosts ${r.flowering}  snowy ${r.snowy}  build ${build}`);
}
await b.close();
