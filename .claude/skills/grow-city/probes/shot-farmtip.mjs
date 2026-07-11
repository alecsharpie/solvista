/* shot-farmtip.mjs — screenshot the FARM hover tooltip (iter 183). shoot.mjs can't
   hover; __find('FARM') gives a farm tile's clip-ready screen coords. Pin the calendar
   in-page (discrete-seasonal freeze law) so the 'Fields' row shows a definite phase,
   hover it, print the tooltip text + clip-shoot it magnified.
   usage: node shot-farmtip.mjs '<query>' <outdir> [year] */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright/index.mjs';
import { mkdirSync } from 'fs';
import { resolve } from 'path';

const [query, outDir, yr] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const YEAR = yr ? parseFloat(yr) : 2035.88;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 4 });
const errs = [];
page.on('pageerror', e => errs.push(String(e)));
await page.goto('file://' + resolve('solvista.html') + '?' + query);
await page.waitForTimeout(2000);
// pin the calendar in-page so the Fields phase is definite (freeze-the-clock law)
await page.evaluate(y => { playing = false; __setYear(y); render(); }, YEAR);

const farms = await page.evaluate(() => window.__find('FARM'));
const onScreen = farms.filter(e => e.sx > 260 && e.sx < 1180 && e.sy > 140 && e.sy < 760);
const pool = onScreen.length ? onScreen : farms;
if (!pool.length) { console.log('NO FARM'); await browser.close(); process.exit(1); }
const pk = pool.sort((a, b) => Math.hypot(a.sx - 720, a.sy - 450) - Math.hypot(b.sx - 720, b.sy - 450))[0];
const clip = (w, h) => ({ x: Math.max(0, pk.sx - w / 2), y: Math.max(0, pk.sy - h / 2), width: w, height: h });

await page.mouse.move(pk.sx, pk.sy);
await page.waitForTimeout(400);
await page.screenshot({ path: `${outDir}/01-hover-context.png`, clip: clip(520, 380) });
await page.screenshot({ path: `${outDir}/02-hover-tight.png`, clip: clip(220, 200) });
const tip = await page.evaluate(() => {
  const t = document.getElementById('tip');
  return t.style.display === 'block' ? t.innerText.replace(/\n/g, ' | ') : '(no tooltip)';
});
console.log(`year=${YEAR} farms=${farms.length} at ${pk.sx.toFixed(0)},${pk.sy.toFixed(0)}`);
console.log(`tooltip: ${tip}`);
console.log(`pageerrors: ${errs.length ? errs.join(' ; ') : 'none'}`);
await browser.close();
