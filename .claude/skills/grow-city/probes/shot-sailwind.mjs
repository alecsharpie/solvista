#!/usr/bin/env node
/* shot-sailwind.mjs — the sail-wind camera (iter 334).
 *
 * The point is the SAIL: at a gust the leech should bow leeward (+x, the same way the
 * clouds/smoke lean); at a dead calm it is HEAD's straight taut triangle (windForce()==0 ->
 * belly 0, an exact fixed point, 245). So shoot the SAME frozen day/summer/clear frame twice —
 * GALE (WINDA=1) and CALM (WINDA=0.25) — as a blind A/B: an agent that can pick the frame
 * whose sail is fuller has confirmed the feature reads. Tokens meaningless + non-ordinal, map
 * CROSSED between seeds (238/239/268), so "always the second one" fails on one seed.
 *
 * Aimed by MEASURED INK of the boats (226): the draw is a lexical closure so it cannot be
 * suppressed via window; empty the boats array instead, diff, argmax the boat window. Pin day
 * (the sail reads white against blue water) + summer + clear. page.screenshot (200). Drive
 * zoom, never scale (269).
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
const OUT = process.argv[3] || join(HERE, '../shots/sail');
mkdirSync(OUT, { recursive: true });
const PAGE = pathToFileURL(SRC).href;

/* CROSS the map between seeds (238): which token is the gale */
const GALE_TOKEN = SEED === 42 ? 'delta' : 'kappa';
const CALM_TOKEN = SEED === 42 ? 'kappa' : 'delta';

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2 });
await p.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await p.goto(`${PAGE}?seed=${SEED}`);
await p.waitForTimeout(300);

/* 1. freeze a mature day/summer/clear frame with the boats out */
await p.evaluate((seed) => {
  playing = false;
  genWorld(seed);
  __warp(61);
  __setYear(2035.62);                                /* dry peak -> summer, boats out */
  window.rainFront = () => 0;                         /* clear */
  time = 5.0; waveT = 5.0; STARS.length = 0; flock = null;
  for (const c of cells) if (c.h < c.th) c.h = c.th;
}, SEED);

/* 2. aim by measured ink of the most-visible boat */
const aim = await p.evaluate(() => {
  const invSun = (target) => { let lo = 0, hi = 1; for (let k = 0; k < 60; k++) { const m = (lo + hi) / 2; if (sunWarp(m) < target) lo = m; else hi = m; } return lo; };
  __setTime(invSun((SUNUP + SUNDN) / 2));            /* solar noon */
  WINDA = 1;
  const cvs = document.querySelector('canvas'); const g = cvs.getContext('2d');
  const grab = () => { render(); return g.getImageData(0, 0, cvs.width, cvs.height).data; };
  const A = grab();
  const saved = boats.slice(); boats.length = 0; const B = grab(); boats.push(...saved);
  const W = cvs.width, H = cvs.height, ink = new Float32Array(W * H);
  for (let i = 0, q = 0; i < A.length; i += 4, q++) {
    const d = Math.max(Math.abs(A[i] - B[i]), Math.abs(A[i + 1] - B[i + 1]), Math.abs(A[i + 2] - B[i + 2]));
    if (d > 8) ink[q] = d;
  }
  const dpr = W / cvs.clientWidth;
  for (const sel of ['.placard', '.census', '.controls']) {
    const el = document.querySelector(sel); if (!el) continue; const r = el.getBoundingClientRect();
    for (let y = Math.max(0, r.top * dpr | 0); y < Math.min(H, (r.bottom * dpr) | 0); y++)
      for (let x = Math.max(0, r.left * dpr | 0); x < Math.min(W, (r.right * dpr) | 0); x++) ink[y * W + x] = 0;
  }
  let best = null, bestScore = -1;
  for (const bt of boats) {
    const [wx, wy] = pxc(bt.x, bt.y);
    const sx = (wx * scale + offX) * dpr, sy = (wy * scale + offY) * dpr; let s = 0, R = 40 * dpr;
    if (sx < 0 || sx > W || sy < 0 || sy > H) continue;
    for (let py = Math.max(0, sy - R | 0); py < Math.min(H, sy + R | 0); py++)
      for (let px2 = Math.max(0, sx - R | 0); px2 < Math.min(W, sx + R | 0); px2++) s += ink[py * W + px2];
    if (s > bestScore) { bestScore = s; best = { wx, wy, moored: !!bt.moored, ink: s }; }
  }
  return best;
});
console.log(`seed ${SEED}: best boat @world(${aim.wx.toFixed(0)},${aim.wy.toFixed(0)}) moored=${aim.moored} ink=${aim.ink.toFixed(0)}`);

/* 3. shoot: whole city (gale) + close-up sail at GALE and CALM, blind + crossed */
async function shoot(file, winda, z, label) {
  const cap = await p.evaluate(({ winda, z, wx, wy }) => {
    const invSun = (target) => { let lo = 0, hi = 1; for (let k = 0; k < 60; k++) { const m = (lo + hi) / 2; if (sunWarp(m) < target) lo = m; else hi = m; } return lo; };
    __setTime(invSun((SUNUP + SUNDN) / 2));
    WINDA = winda;
    const cvs = document.querySelector('canvas');
    if (z === 1) { scale = fitScale; offX = fitX; offY = fitY; zoom = 1; }
    else { zoom = z; scale = fitScale * z; offX = cvs.clientWidth / 2 - wx * scale; offY = cvs.clientHeight / 2 - wy * scale; if (typeof clampPan === 'function') clampPan(); }
    render(); lastSky = 0; syncSky(performance.now()); syncStats(); render();
    const sx = wx * scale + offX, sy = wy * scale + offY;
    const off = Math.hypot(sx - cvs.clientWidth / 2, sy - cvs.clientHeight / 2);
    return `WINDA=${WINDA.toFixed(2)} force=${windForce().toFixed(2)} belly=${(4.5 * windForce()).toFixed(2)}px · boat ${off.toFixed(0)}px off-centre · zoom=${zoom}x`;
  }, { winda, z, wx: aim.wx, wy: aim.wy });
  await p.screenshot({ path: file });
  console.log(`  ${file}\n      [${label}] ${cap}`);
}

await shoot(join(OUT, `s${SEED}-city-gale.png`), 1.0, 1, 'whole-city gale');
await shoot(join(OUT, `s${SEED}-${GALE_TOKEN}.png`), 1.0, 5.5, 'BLIND close-up (gale)');
await shoot(join(OUT, `s${SEED}-${CALM_TOKEN}.png`), 0.25, 5.5, 'BLIND close-up (calm)');
await b.close();
