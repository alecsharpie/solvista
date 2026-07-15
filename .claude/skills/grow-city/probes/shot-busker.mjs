/* shot-busker — the street musician's camera (iter 293).
 * Aims the close-up by MEASURED INK (226/230): suppress BUSK in ONE page, diff, and score
 * each busker's own hex; pan to the densest one's ctr(). Daytime pin (dayT 0.5) so every
 * busker is out. Drives `zoom`, never `scale` (269). page.screenshot (DOM-composited, 200).
 * Also the un-zoomed whole city (the census is blind to visual regression). */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = process.env.SRC || join(HERE, '../../../../solvista.html');
const SEED = +(process.argv[2] || 42);
const OUT = process.argv[3] || join(HERE, '../shots/busker');
mkdirSync(OUT, { recursive: true });

const b = await chromium.launch();
const page = await b.newPage({ viewport: { width: 1400, height: 900 } });
await page.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await page.goto('file://' + ART);
await page.waitForTimeout(400);

const info = await page.evaluate((SEED) => {
  playing = false; genWorld(SEED); __warp(61);
  for (const c of cells) if (c.h < c.th) c.h = c.th;       /* settle: render() grows buildings */
  time = 4; waveT = 0; STARS.length = 0; flock = null;
  __setTime(0.50); render();                               /* noon: every busker is out */

  const cv = document.querySelector('canvas'), g = cv.getContext('2d');
  const W = cv.width, H = cv.height, dpr = window.devicePixelRatio || 1;
  const grab = () => g.getImageData(0, 0, W, H).data;
  const hud = [...document.querySelectorAll('.placard,.census,.controls')].map(e => {
    const r = e.getBoundingClientRect();
    return { x0: r.left * dpr, y0: r.top * dpr, x1: r.right * dpr, y1: r.bottom * dpr }; });
  const hidden = (px, py) => hud.some(bx => px >= bx.x0 && px <= bx.x1 && py >= bx.y0 && py <= bx.y1);
  const inkMap = () => {
    BUSK = 1; render(); const A = grab();
    BUSK = 0; render(); const B = grab();
    BUSK = 1;
    const acc = new Float64Array(W * H); let total = 0;
    for (let i = 0; i < A.length; i += 4) {
      const d = Math.max(Math.abs(A[i]-B[i]), Math.abs(A[i+1]-B[i+1]), Math.abs(A[i+2]-B[i+2]));
      if (d <= 0) continue; const p = i/4, px = p%W, py = (p/W)|0;
      if (hidden(px, py)) continue; acc[p] = d; total += d; }
    return { acc, total }; };

  /* score each busker hex by its own visible ink, pan to the densest one's ctr() */
  const m0 = inkMap();
  const cells2 = [];
  for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) if (buskerAt(x, y)) cells2.push({ x, y });
  const inkAt = (c) => { const w = ctr(c.x, c.y);
    const sx = Math.round((offX + w[0]*scale)*dpr), sy = Math.round((offY + w[1]*scale)*dpr);
    const R = Math.round(16*dpr); let s = 0;
    for (let j = Math.max(0, sy-R); j < Math.min(H, sy+R); j++)
      for (let i = Math.max(0, sx-R); i < Math.min(W, sx+R); i++) s += m0.acc[j*W+i];
    return s; };
  const scored = cells2.map(c => ({ ...c, ink: inkAt(c) })).sort((a, z) => z.ink - a.ink);
  const target = scored[0]; const tw = ctr(target.x, target.y);

  const mid = [W/(2*dpr), H/(2*dpr)];
  zoomAt(mid[0], mid[1], 6.0);
  offX = mid[0] - tw[0]*scale; offY = mid[1] - tw[1]*scale; clampPan();

  const m1 = inkMap();
  const WIN = Math.round(420*dpr);
  const bx = Math.round(mid[0]*dpr - WIN/2), by = Math.round(mid[1]*dpr - WIN/2);
  let inClip = 0;
  for (let j = by; j < by+WIN; j++) for (let i = bx; i < bx+WIN; i++) inClip += m1.acc[j*W+i];
  render(); lastSky = 0; syncSky(performance.now()); syncStats();
  return { seed: SEED, buskers: cells2.length, zoom: +zoom.toFixed(2),
    inkFit: Math.round(m0.total), inkInClip: Math.round(inClip),
    clip: { x: Math.round(bx/dpr), y: Math.round(by/dpr), width: Math.round(WIN/dpr), height: Math.round(WIN/dpr) } };
}, SEED);

console.log(JSON.stringify(info));
if (info.inkInClip <= 0) console.error('!! CROP HAS NO BUSKER INK — camera is lying, do not ship.');
const cap = `seed ${info.seed} · STREET BUSKER · noon (all ${info.buskers} out) · zoom ${info.zoom}x · busker ink in crop=${info.inkInClip}`;
await page.evaluate((t) => { const d = document.createElement('div');
  d.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#000c;color:#fff;font:11px monospace;padding:5px 8px;text-align:center';
  d.textContent = t; document.body.appendChild(d); }, cap);
await page.screenshot({ path: join(OUT, `s${SEED}-busker.png`), clip: info.clip });
if (process.env.NOBUSK) {                       /* the same crop with the busker suppressed — is a suspect blob MINE? */
  await page.evaluate(() => { BUSK = 0; render(); lastSky = 0; syncSky(performance.now()); syncStats(); });
  await page.screenshot({ path: join(OUT, `s${SEED}-nobusk.png`), clip: info.clip });
  await page.evaluate(() => { BUSK = 1; render(); });
}

await page.evaluate(() => { zoom = 1; scale = fitScale; offX = fitX; offY = fitY;
  render(); lastSky = 0; syncSky(performance.now()); syncStats(); });
await page.screenshot({ path: join(OUT, `s${SEED}-city.png`) });
await b.close();
console.log(`wrote ${OUT}/s${SEED}-{busker,city}.png`);
