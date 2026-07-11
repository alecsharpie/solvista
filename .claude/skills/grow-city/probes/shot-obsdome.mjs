#!/usr/bin/env node
/* shot-obsdome.mjs — zoomed captures of the observatory dome for the visual gate
 * (iter 158). shoot.mjs can't drive the camera, so center + zoom the artifact's own
 * camera on the dome and clip it. Four frames: dusk (slit leaning), midnight (slit
 * up at the zenith), dawn (slit leaning the other way) — a locate-don't-judge triple
 * (108) — plus noon (aperture buttoned up). usage: node shot-obsdome.mjs [seed] [outdir] */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright-core/index.mjs';
import { createServer } from 'node:http';
import { readFileSync, mkdirSync } from 'node:fs';

const seed = process.argv[2] || '42';
const outDir = process.argv[3] || '.claude/skills/grow-city/shots/obsdome';
mkdirSync(outDir, { recursive: true });
const HTML = readFileSync(new URL('../../../../solvista.html', import.meta.url));
const srv = createServer((_, res) => { res.setHeader('content-type', 'text/html'); res.end(HTML); }).listen(0);
await new Promise(r => srv.once('listening', r));
const port = srv.address().port;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 5 });
await page.goto(`http://127.0.0.1:${port}/solvista.html?seed=${seed}&warp=61&year=2035.62`, { waitUntil: 'load' });
await page.waitForFunction(() => typeof window.__obs === 'function');
await page.waitForTimeout(1200);

const O0 = await page.evaluate(() => {
  playing = false; window.__setTime(0.0); render();
  const o = window.__obs()[0]; if (!o) return null;
  const cv = document.querySelector('canvas');
  const wx = (o.sx - offX) / scale, wy = (o.sy - offY) / scale;
  zoom = 7; scale = fitScale * zoom;
  offX = cv.clientWidth / 2 - wx * scale; offY = cv.clientHeight / 2 - wy * scale;
  render(); return window.__obs()[0];
});
if (!O0) { console.log('no observatory'); await browser.close(); srv.close(); process.exit(1); }
const R = O0.r;
const clip = (w, h) => ({ x: O0.sx - w / 2, y: O0.sy - R * 0.35 - h / 2, width: w, height: h });

const shots = [
  ['dusk', 0.86], ['midnight', 0.00], ['dawn', 0.05], ['noon', 0.50],
];
for (const [name, t] of shots) {
  await page.evaluate((tt) => { window.__setTime(tt); render(); }, t);
  await page.screenshot({ path: `${outDir}/seed${seed}_${name}_tight.png`, clip: clip(R * 2.6, R * 2.2) });
  await page.screenshot({ path: `${outDir}/seed${seed}_${name}_context.png`, clip: clip(R * 6, R * 6) });
}
console.log(`shot seed ${seed} -> ${outDir} (dome at ${O0.sx.toFixed(0)},${O0.sy.toFixed(0)}, R=${R.toFixed(1)})`);
srv.close(); await browser.close();
