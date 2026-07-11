#!/usr/bin/env node
/* shot-cornershop.mjs — zoomed captures of a neighbourhood corner shop for the
 * visual gate (iter 151). shoot.mjs can't drive the camera, so find a corner-shop
 * house (RES with c.corner), center + zoom the artifact's own camera on it, and
 * clip it against the plain terraces around it. Day (green grocer's awning +
 * storefront glass) and night (the fascia stays lit after the houses dim).
 * usage: node shot-cornershop.mjs [seed] [outdir] */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright-core/index.mjs';
import { createServer } from 'node:http';
import { readFileSync, mkdirSync } from 'node:fs';

const seed = process.argv[2] || '42';
const outDir = process.argv[3] || '.claude/skills/grow-city/shots/cornershop';
mkdirSync(outDir, { recursive: true });
const HTML = readFileSync(new URL('../../../../solvista.html', import.meta.url));
const srv = createServer((_, res) => { res.setHeader('content-type', 'text/html'); res.end(HTML); }).listen(0);
await new Promise(r => srv.once('listening', r));
const port = srv.address().port;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 5 });
await page.goto(`http://127.0.0.1:${port}/solvista.html?seed=${seed}&warp=61&year=2035.62`, { waitUntil: 'load' });
await page.waitForFunction(() => typeof window.__find === 'function');
await page.waitForTimeout(1000);

// find a corner shop nearest canvas centre (most likely front-row, unoccluded), zoom on it
const S = await page.evaluate(() => {
  playing = false; window.__setTime(0.5); render();
  const cs = window.__find('RES').filter(s => cells[idx(s.x, s.y)].corner);
  if (!cs.length) return null;
  const cx = innerWidth / 2, cy = innerHeight / 2;
  cs.sort((a, b) => Math.hypot(a.sx - cx, a.sy - cy) - Math.hypot(b.sx - cx, b.sy - cy));
  const t = cs[0];
  const cv = document.querySelector('canvas');
  const wx = (t.sx - offX) / scale, wy = (t.sy - offY) / scale;
  zoom = 6; scale = fitScale * zoom;
  offX = cv.clientWidth / 2 - wx * scale; offY = cv.clientHeight / 2 - wy * scale;
  render();
  return { sx: cv.clientWidth / 2, sy: cv.clientHeight / 2, n: cs.length, x: t.x, y: t.y };
});
if (!S) { console.log(`seed ${seed}: no corner shop on screen`); await browser.close(); srv.close(); process.exit(1); }
const clip = (w, h) => ({ x: S.sx - w / 2, y: S.sy - h / 2, width: w, height: h });

for (const [name, t] of [['day', 0.35], ['night', 0.90]]) {
  await page.evaluate((tt) => { window.__setTime(tt); render(); }, t);
  await page.screenshot({ path: `${outDir}/seed${seed}_${name}_tight.png`, clip: clip(150, 150) });
  await page.screenshot({ path: `${outDir}/seed${seed}_${name}_context.png`, clip: clip(420, 400) });
}
console.log(`shot seed ${seed}: ${S.n} corner shops, zoomed on (${S.x},${S.y}) -> ${outDir}`);
srv.close(); await browser.close();
