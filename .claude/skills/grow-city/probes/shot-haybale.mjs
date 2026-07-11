/* shot-haybale.mjs — zoom the artifact's own camera onto the farm belt and shoot it
   with the calendar FROZEN in the post-harvest window, so an agent can confirm iter
   174's rolled hay bales sit on the stubble fields and read as bales. Bales are ~2px
   and seasonal, so a fit-zoom January shot shows nothing; wheel in on the FARM
   centroid and pin year in-page (playing=false) so drift can't move the fields out
   of the cut window (discrete-seasonal freeze law).
   usage: node shot-haybale.mjs '<url query>' <outdir> [YEAR] */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright/index.mjs';
import { mkdirSync, existsSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = [resolve(HERE, 'solvista.html'), resolve(HERE, '../../../../solvista.html')].find(existsSync);
const [query, outDir, yearArg] = process.argv.slice(2);
const YEAR = parseFloat(yearArg || '2035.88');
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 3 });
await page.goto('file://' + ROOT + '?' + query);
await page.waitForTimeout(1500);

let fs = await page.evaluate(() => window.__find('FARM').filter(c => c.sx > 200 && c.sx < 1240 && c.sy > 120 && c.sy < 780));
if (!fs.length) { console.log('NO FARM ON SCREEN'); await browser.close(); process.exit(1); }
// densest cluster: pick the farm with the most neighbours within 220px, centroid around it
let best = fs[0], bestN = -1;
for (const f of fs) { const n = fs.filter(g => Math.hypot(g.sx - f.sx, g.sy - f.sy) < 220).length; if (n > bestN) { bestN = n; best = f; } }
let cx = best.sx, cy = best.sy;

for (let i = 0; i < 4; i++) {
  await page.mouse.move(cx, cy);
  await page.mouse.wheel(0, -400);
  await page.waitForTimeout(220);
  fs = await page.evaluate(() => window.__find('FARM'));
  const near = fs.filter(c => Math.hypot(c.sx - cx, c.sy - cy) < 300);
  if (near.length) { cx = near.reduce((s, c) => s + c.sx, 0) / near.length; cy = near.reduce((s, c) => s + c.sy, 0) / near.length; }
}
await page.mouse.move(20, 20);
// freeze the calendar in the cut window for the final frame (drift-proof)
await page.evaluate((y) => { playing = false; __setYear(y); render(); }, YEAR);
await page.waitForTimeout(200);
const clip = (w, h) => ({ x: Math.max(0, cx - w / 2), y: Math.max(0, cy - h / 2), width: w, height: h });
await page.screenshot({ path: `${outDir}/belt.png`, clip: clip(560, 420) });
await page.screenshot({ path: `${outDir}/tight.png`, clip: clip(280, 210) });
console.log(`FARM belt @ ${cx.toFixed(0)},${cy.toFixed(0)}, n=${fs.length}, year=${YEAR}`);
await browser.close();
