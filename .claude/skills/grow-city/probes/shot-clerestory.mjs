/* shot-clerestory.mjs — zoom the artifact's own camera onto the sawtooth warehouse
   cluster and shoot it DAY and NIGHT, so an agent can confirm the iter-173 north-light
   glazing sits on the monitors and reads (glass-grey by day, faint warm work-shift
   glow after dark). IND is sparse (~2-6/city) and small, so a fit-zoom shot is
   invisible; wheel in on the cluster centroid like hovershot does.
   usage: node probes/shot-clerestory.mjs '<url query>' <outdir> */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright/index.mjs';
import { mkdirSync, existsSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, '../../../solvista.html'),
  resolve(HERE, '../solvista.html'), resolve(process.cwd(), 'solvista.html')].find(existsSync);
const [query, outDir] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 3 });
await page.goto('file://' + ROOT + '?' + query);
await page.waitForTimeout(2000);

// centroid of the largest cluster of non-loft warehouses on screen
let inds = await page.evaluate(() => window.__find('IND').filter(c => c.sx > 200 && c.sx < 1240 && c.sy > 120 && c.sy < 780));
if (!inds.length) { console.log('NO IND ON SCREEN'); await browser.close(); process.exit(1); }
let cx = inds.reduce((s, c) => s + c.sx, 0) / inds.length;
let cy = inds.reduce((s, c) => s + c.sy, 0) / inds.length;

for (let i = 0; i < 4; i++) {
  await page.mouse.move(cx, cy);
  await page.mouse.wheel(0, -400);
  await page.waitForTimeout(220);
  inds = await page.evaluate(() => window.__find('IND'));
  const near = inds.filter(c => Math.hypot(c.sx - cx, c.sy - cy) < 260);
  if (near.length) { cx = near.reduce((s, c) => s + c.sx, 0) / near.length; cy = near.reduce((s, c) => s + c.sy, 0) / near.length; }
}
await page.mouse.move(20, 20);
await page.waitForTimeout(400);
const clip = (w, h) => ({ x: Math.max(0, cx - w / 2), y: Math.max(0, cy - h / 2), width: w, height: h });
await page.screenshot({ path: `${outDir}/cluster.png`, clip: clip(520, 400) });
await page.screenshot({ path: `${outDir}/tight.png`, clip: clip(260, 200) });
console.log(`IND cluster @ ${cx.toFixed(0)},${cy.toFixed(0)}, n=${inds.length}`);
await browser.close();
