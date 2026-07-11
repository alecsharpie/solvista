/* shot-fetetip.mjs — screenshot the FESTIVAL STREET hover TOOLTIP (iter 191). shoot.mjs
   can't hover; __find('fete') gives fete road cells' clip-ready screen coords. Freeze
   the clock in-page (freeze-the-clock law) at a day frame (crowd row = 'Crowds under
   the bunting') and a night frame ('Quiet after dark'), hover a fete cell, print the
   tooltip text + clip-shoot it magnified. Confirms the tooltip renders (no mojibake
   from &mdash;) and the crowd row flips.
   usage: node shot-fetetip.mjs '<query>' <outdir> */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright/index.mjs';
import { mkdirSync } from 'fs';
import { resolve } from 'path';

const [query, outDir] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 4 });
const errs = [];
page.on('pageerror', e => errs.push(String(e)));
await page.goto('file://' + resolve('solvista.html') + '?' + query);
await page.waitForTimeout(1500);

const feteAll = await page.evaluate(() => window.__find('fete'));
if (!feteAll.length) { console.log('NO FETE'); await browser.close(); process.exit(1); }
const onScreen = feteAll.filter(e => e.sx > 300 && e.sx < 1140 && e.sy > 160 && e.sy < 740);
const pool = onScreen.length ? onScreen : feteAll;
const pk = pool.sort((a, b) => Math.hypot(a.sx - 720, a.sy - 450) - Math.hypot(b.sx - 720, b.sy - 450))[0];
const clip = (w, h) => ({ x: Math.max(0, pk.sx - w / 2), y: Math.max(0, pk.sy - h / 2), width: w, height: h });

for (const [name, t] of [['day', 0.35], ['night', 0.90]]) {
  await page.evaluate(tt => { playing = false; __setTime(tt); render(); }, t);
  await page.mouse.move(pk.sx, pk.sy);
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${outDir}/${name}-context.png`, clip: clip(560, 420) });
  const tip = await page.evaluate(() => {
    const el = document.getElementById('tip');
    return el.style.display === 'block' ? el.innerText.replace(/\n/g, ' | ') : '(no tooltip)';
  });
  console.log(`${name} (t=${t}) fete=${feteAll.length} at ${pk.sx.toFixed(0)},${pk.sy.toFixed(0)}`);
  console.log(`  tooltip: ${tip}`);
}
console.log(`pageerrors: ${errs.length ? errs.join(' ; ') : 'none'}`);
await browser.close();
