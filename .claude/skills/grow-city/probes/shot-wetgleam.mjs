#!/usr/bin/env node
/* shot-wetgleam.mjs — the wet-street lamp-reflection camera (iter 341).
 *
 * At night the arterial + ordinary street lamps now MIRROR down the wet tarmac (a warm
 * vertical smear) when a shower crosses (rainingAt>0). Shoot the SAME frozen night city
 * twice: DRY (rainingAt->0, == HEAD, no smear) and WET (rainingAt->1, streets gleam), as a
 * blind A/B. Aim by MEASURED INK (226/272): the ONLY thing that differs between DRY and WET
 * is the gleam, so the argmax window of the DRY-vs-WET pixel diff IS where it renders (HUD
 * boxes zeroed first, 200) — no guessed clip. Tokens meaningless + non-ordinal, map CROSSED
 * between seeds (238/239/268). page.screenshot (200). Drive zoom, never scale (269). Plus a
 * whole-city WET frame (flood) for the holistic z-order / coherence read.
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
const OUT = process.argv[3] || join(HERE, '../shots/wetgleam');
mkdirSync(OUT, { recursive: true });
const PAGE = pathToFileURL(SRC).href;

/* CROSS the map between seeds (238): which token is the WET (gleaming) frame */
const WET_TOKEN = SEED === 42 ? 'teasel' : 'sorrel';
const DRY_TOKEN = SEED === 42 ? 'sorrel' : 'teasel';
const NIGHT = 0.92;   /* deep night: LITAMT high, lamps on */

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2 });
await p.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await p.goto(`${PAGE}?seed=${SEED}`);
await p.waitForTimeout(300);

const aim = await p.evaluate(({ seed, NIGHT }) => {
  playing = false;
  genWorld(seed);
  __warp(61);                                       /* -> ~2035, mature developed city */
  __setYear(2035.62);
  time = 0; waveT = 3.0; STARS.length = 0; flock = null;
  for (const c of cells) if (c.h < c.th) c.h = c.th;
  const cvs = document.querySelector('canvas');
  scale = fitScale; offX = fitX; offY = fitY; zoom = 1;
  const grab = (rain) => {
    window.rainingAt = () => rain;
    __setTime(NIGHT); render();
    return ctx.getImageData(0, 0, cvs.width, cvs.height).data;
  };
  const A = grab(0), B = grab(1);
  window.rainingAt = () => 0;
  const W = cvs.width, H = cvs.height, dpr = W / cvs.clientWidth;
  const hud = [[0, 0, 320 * dpr, H], [0, H - 220 * dpr, 420 * dpr, H], [W - 340 * dpr, H - 220 * dpr, W, H]];
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
  const sx = bx / dpr, sy = by / dpr;
  return { wx: (sx - offX) / scale, wy: (sy - offY) / scale };
}, { seed: SEED, NIGHT });

async function shoot(file, rain, z, label) {
  const cap = await p.evaluate(({ rain, z, wx, wy, NIGHT }) => {
    window.rainingAt = () => rain;
    const cvs = document.querySelector('canvas');
    if (z === 1) { scale = fitScale; offX = fitX; offY = fitY; zoom = 1; }
    else { zoom = z; scale = fitScale * z; offX = cvs.clientWidth / 2 - wx * scale; offY = cvs.clientHeight / 2 - wy * scale; if (typeof clampPan === 'function') clampPan(); }
    __setTime(NIGHT); render(); lastSky = 0; syncSky(performance.now()); syncStats(); render();
    return `night dayT=${NIGHT} LITAMT=${LITAMT.toFixed(2)} · rain=${rain} · zoom=${zoom}x`;
  }, { rain, z, wx: aim.wx, wy: aim.wy, NIGHT });
  await p.screenshot({ path: file });
  console.log(`  ${file}\n      [${label}] ${cap}`);
}

/* whole-city: DRY (=HEAD night) and WET (flood — every lit street gleaming) for the holistic read */
await shoot(join(OUT, `s${SEED}-city-dry.png`), 0, 1, 'whole-city DRY (=HEAD night)');
await shoot(join(OUT, `s${SEED}-city-wet.png`), 1, 1, 'whole-city WET (flood)');
/* blind A/B zoomed on the gleam (aimed by measured ink) */
await shoot(join(OUT, `s${SEED}-str-${DRY_TOKEN}.png`), 0, 5, `street ${DRY_TOKEN} (DRY, dry road)`);
await shoot(join(OUT, `s${SEED}-str-${WET_TOKEN}.png`), 1, 5, `street ${WET_TOKEN} (WET, gleaming)`);

await b.close();
console.log(`\nblind pair: s${SEED}-str-${DRY_TOKEN}.png vs s${SEED}-str-${WET_TOKEN}.png (WET=${WET_TOKEN}, crossed per seed)`);
