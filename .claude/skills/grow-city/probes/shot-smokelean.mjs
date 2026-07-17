#!/usr/bin/env node
/* shot-smokelean.mjs — the smoke-lean camera (iter 333).
 *
 * The fire only burns 1974-2030, so drive the artifact's own tick() to a live episode and
 * freeze there (279's rig). The point is the SMOKE: at a gust the wildfire plume should
 * stream downwind (+x), the higher the farther; at a dead calm it is HEAD's straight column
 * (windForce()==0 -> smokeLean 0, an exact fixed point). So shoot the SAME frozen fire twice —
 * GALE (WINDA=1) and CALM (WINDA=0.25) — as a blind A/B: an agent that can pick which frame
 * has the smoke leaning has confirmed the feature reads. Tokens are meaningless + non-ordinal,
 * the map CROSSED between seeds (238/239/268), so "always the second one" fails on one seed.
 *
 * Aimed by MEASURED INK of the fire (226/230/234): drawFire suppressed in one page, diff.
 * Pin day (smoke reads against sky). page.screenshot (200). Drive zoom, never scale (269).
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
const OUT = process.argv[3] || join(HERE, '../shots/smoke');
mkdirSync(OUT, { recursive: true });
const PAGE = pathToFileURL(SRC).href;

/* CROSS the map between seeds (238): which token is the gale */
const GALE_TOKEN = SEED === 42 ? 'vera' : 'nolan';
const CALM_TOKEN = SEED === 42 ? 'nolan' : 'vera';

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2 });
await p.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await p.goto(`${PAGE}?seed=${SEED}`);
await p.waitForTimeout(300);

/* 1. drive to a spreading episode and freeze */
const found = await p.evaluate((seed) => {
  playing = false;
  genWorld(seed);
  const YPT = 0.45 / 6;
  let best = null;
  while (year < 2029.5) {
    year += YPT; tick();
    let lit = []; for (const i of HEXI) if (cells[i].fire > 0) lit.push(i);
    if (lit.length >= 2) { best = { year, lit: lit.slice() }; break; }
    if (lit.length === 1 && !best) best = { year, lit: lit.slice() };
  }
  if (best && best.lit.length < 2) {
    while (year < 2029.5) {
      year += YPT; tick();
      let lit = []; for (const i of HEXI) if (cells[i].fire > 0) lit.push(i);
      if (lit.length >= 2) { best = { year, lit: lit.slice() }; break; }
    }
  }
  if (!best) return null;
  time = 12.0; waveT = 3.0; STARS.length = 0; flock = null;
  for (const c of cells) if (c.h < c.th) c.h = c.th;
  return { year: best.year, lit: best.lit };
}, SEED);
if (!found) { console.log('NO FIRE FOUND'); await b.close(); process.exit(1); }
console.log(`seed ${SEED}: episode at year ${found.year.toFixed(1)}, ${found.lit.length} hex(es) alight`);

/* 2. aim by measured ink of the fire */
const aim = await p.evaluate((lit) => {
  const cvs = document.querySelector('canvas'); const g = cvs.getContext('2d');
  const grab = () => { render(); return g.getImageData(0, 0, cvs.width, cvs.height).data; };
  WINDA = 1;                                        /* aim at the gale frame, where the plume is widest */
  const A = grab();
  const real = window.drawFire; window.drawFire = () => {}; const B = grab(); window.drawFire = real;
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
  let bestHex = null, bestScore = -1;
  for (const i of lit) {
    const x = i % G, y = (i / G) | 0; const [wx, wy] = ctr(x, y);
    const sx = (wx * scale + offX) * dpr, sy = (wy * scale + offY) * dpr; let s = 0, R = 90 * dpr;
    for (let py = Math.max(0, sy - R | 0); py < Math.min(H, sy + R | 0); py++)
      for (let px2 = Math.max(0, sx - R | 0); px2 < Math.min(W, sx + R | 0); px2++) s += ink[py * W + px2];
    if (s > bestScore) { bestScore = s; bestHex = { x, y, wx, wy, ink: s }; }
  }
  return { bestHex };
}, found.lit);
console.log(`  best burning hex (${aim.bestHex.x},${aim.bestHex.y}) ink=${aim.bestHex.ink.toFixed(0)}`);

/* 3. shoot: whole city (gale) + close-up blaze at GALE and CALM, blind + crossed */
async function shoot(file, winda, z, hex, label) {
  const cap = await p.evaluate(({ winda, z, hex }) => {
    const invSun = (target) => { let lo = 0, hi = 1; for (let k = 0; k < 60; k++) { const m = (lo + hi) / 2; if (sunWarp(m) < target) lo = m; else hi = m; } return lo; };
    __setTime(invSun((SUNUP + SUNDN) / 2));          /* solar noon — smoke reads against sky */
    WINDA = winda;
    const cvs = document.querySelector('canvas');
    if (z === 1) { scale = fitScale; offX = fitX; offY = fitY; zoom = 1; }
    else { zoom = z; scale = fitScale * z; offX = cvs.clientWidth / 2 - hex.wx * scale; offY = cvs.clientHeight / 2 - hex.wy * scale; if (typeof clampPan === 'function') clampPan(); }
    render(); lastSky = 0; syncSky(performance.now()); syncStats(); render();
    let lit = 0; for (const i of HEXI) if (cells[i].fire > 0) lit++;
    const sx = hex.wx * scale + offX, sy = hex.wy * scale + offY;
    const off = Math.hypot(sx - cvs.clientWidth / 2, sy - cvs.clientHeight / 2);
    return `year ${year.toFixed(1)} · WINDA=${WINDA.toFixed(2)} force=${windForce().toFixed(2)} · ${lit} alight · blaze ${off.toFixed(0)}px off-centre · zoom=${zoom}x`;
  }, { winda, z, hex });
  await p.screenshot({ path: file });
  console.log(`  ${file}\n      [${label}] ${cap}`);
}

await shoot(join(OUT, `s${SEED}-city-gale.png`), 1.0, 1, aim.bestHex, 'whole-city gale');
await shoot(join(OUT, `s${SEED}-${GALE_TOKEN}.png`), 1.0, 4.4, aim.bestHex, 'BLIND close-up (gale)');
await shoot(join(OUT, `s${SEED}-${CALM_TOKEN}.png`), 0.25, 4.4, aim.bestHex, 'BLIND close-up (calm)');
await b.close();
