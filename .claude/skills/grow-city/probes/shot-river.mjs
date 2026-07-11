/* shot-river.mjs — visual gate for the river-names-its-course tooltip (iter 176).
   shoot.mjs can't hover, so drive Playwright directly: find a mid-course river hex,
   aim the real cursor at it, and screenshot the rendered tooltip + print its text.
   usage: node probes/shot-river.mjs '<url query>' <outdir> */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync, mkdirSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html')].find(existsSync);

const [query, outDir] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 3 });
const errs = [];
page.on('pageerror', e => errs.push(String(e)));
await page.goto(pathToFileURL(ROOT).href + '?' + query);
await page.waitForTimeout(1200);

// find on-screen river hexes; prefer one near screen centre on the longest course
const pick = await page.evaluate(() => {
  const rivs = [];
  for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
    const c = cells[idx(x, y)];
    if (!(c.t === T.WATER && c.riv)) continue;
    const [cx, cy] = ctr(x, y);
    const sx = cx * scale + offX, sy = cy * scale + offY;
    if (sx > 300 && sx < 1140 && sy > 160 && sy < 740) rivs.push({ x, y, sx, sy, n: riverCourse(x, y) });
  }
  if (!rivs.length) return null;
  // longest course, then nearest to centre
  const maxN = Math.max(...rivs.map(r => r.n));
  const pool = rivs.filter(r => r.n >= maxN - 3);
  pool.sort((a, b) => Math.hypot(a.sx - 720, a.sy - 450) - Math.hypot(b.sx - 720, b.sy - 450));
  return pool[0];
});
if (!pick) { console.log('NO ON-SCREEN RIVER'); await browser.close(); process.exit(1); }

const clip = (w, h) => ({ x: Math.max(0, pick.sx - w / 2), y: Math.max(0, pick.sy - h / 2), width: w, height: h });
await page.mouse.move(pick.sx, pick.sy);
await page.waitForTimeout(400);
await page.screenshot({ path: `${outDir}/01-river-hover.png`, clip: clip(560, 400) });
await page.screenshot({ path: `${outDir}/02-river-context.png`, clip: clip(900, 640) });
const tip = await page.evaluate(() => {
  const t = document.getElementById('tip');
  return t && t.style.display === 'block' ? t.innerText.replace(/\n/g, ' | ') : '(no tooltip)';
});
console.log(`river hex ${pick.x},${pick.y} course=${pick.n} at ${pick.sx.toFixed(0)},${pick.sy.toFixed(0)}`);
console.log(`tooltip: ${tip}`);
console.log(`pageerrors: ${errs.length ? errs.join(' ; ') : 'none'}`);
await browser.close();
