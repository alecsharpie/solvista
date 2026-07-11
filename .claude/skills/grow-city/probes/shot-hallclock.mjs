#!/usr/bin/env node
/* shot-hallclock.mjs — zoomed captures of the town-hall clock for the visual gate
 * (iter 149). shoot.mjs can't drive the camera, so center + zoom the artifact's
 * own camera on the dial and clip it. Two DAYTIME frames (same lighting) so the
 * only cue is the hand: morning (dayT .20, hand lower-left) vs noon (.50, hand up)
 * — a locate-don't-judge pair (iter 108). Plus a noon/midnight pair to show the
 * hand agrees with the sun. usage: node shot-hallclock.mjs [seed] [outdir] */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright-core/index.mjs';
import { createServer } from 'node:http';
import { readFileSync, mkdirSync } from 'node:fs';

const seed = process.argv[2] || '7';
const outDir = process.argv[3] || '.claude/skills/grow-city/shots/hallclock';
mkdirSync(outDir, { recursive: true });
const HTML = readFileSync(new URL('../../../../solvista.html', import.meta.url));
const srv = createServer((_, res) => { res.setHeader('content-type', 'text/html'); res.end(HTML); }).listen(0);
await new Promise(r => srv.once('listening', r));
const port = srv.address().port;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 5 });
await page.goto(`http://127.0.0.1:${port}/solvista.html?seed=${seed}&warp=61&year=2035.62`, { waitUntil: 'load' });
await page.waitForFunction(() => typeof window.__clock === 'function');
await page.waitForTimeout(1200);

// center + zoom onto the dial
const H0 = await page.evaluate(() => {
  playing = false; window.__setTime(0.5); render();
  const h = window.__clock()[0]; if (!h) return null;
  const cv = document.querySelector('canvas');
  const wx = (h.sx - offX) / scale, wy = (h.sy - offY) / scale;
  zoom = 7; scale = fitScale * zoom;
  offX = cv.clientWidth / 2 - wx * scale; offY = cv.clientHeight / 2 - wy * scale;
  render(); return window.__clock()[0];
});
if (!H0) { console.log('no hall'); await browser.close(); srv.close(); process.exit(1); }
const clip = (w, h) => ({ x: H0.sx - w / 2, y: H0.sy - h / 2, width: w, height: h });

const shots = [
  ['morning', 0.20], ['noon', 0.50], ['midnight', 0.00],
];
for (const [name, t] of shots) {
  await page.evaluate((tt) => { window.__setTime(tt); render(); }, t);
  await page.screenshot({ path: `${outDir}/seed${seed}_${name}_tight.png`, clip: clip(70, 70) });
  await page.screenshot({ path: `${outDir}/seed${seed}_${name}_context.png`, clip: clip(200, 220) });
}
console.log(`shot seed ${seed} -> ${outDir} (dial at ${H0.sx.toFixed(0)},${H0.sy.toFixed(0)}, r=${H0.r.toFixed(1)})`);
srv.close(); await browser.close();
