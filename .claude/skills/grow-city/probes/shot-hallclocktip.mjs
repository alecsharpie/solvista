/* shot-hallclocktip.mjs — screenshot the TOWN HALL hover TOOLTIP (iter 184), the
   complement of iter 149's shot-hallclock.mjs (which grades the drawn dial). shoot.mjs
   can't hover; __find('hall') gives the hall tile's clip-ready screen coords. Freeze
   the day clock in-page (__setTime, freeze-the-clock law) so the new 'Clock' row shows
   a definite hour, hover it, print the tooltip text + clip-shoot it magnified.
   usage: node shot-hallclocktip.mjs '<query>' <outdir> [dayT] */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright/index.mjs';
import { mkdirSync } from 'fs';
import { resolve } from 'path';

const [query, outDir, dt] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const DAYT = dt ? parseFloat(dt) : 0.30;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 4 });
const errs = [];
page.on('pageerror', e => errs.push(String(e)));
await page.goto('file://' + resolve('solvista.html') + '?' + query);
await page.waitForTimeout(2000);
// freeze the day clock in-page so the Clock row is a definite hour (freeze-the-clock law)
await page.evaluate(t => { playing = false; __setTime(t); render(); }, DAYT);

const halls = await page.evaluate(() => window.__find('hall'));
if (!halls.length) { console.log('NO HALL'); await browser.close(); process.exit(1); }
const onScreen = halls.filter(e => e.sx > 260 && e.sx < 1180 && e.sy > 140 && e.sy < 760);
const pool = onScreen.length ? onScreen : halls;
const pk = pool.sort((a, b) => Math.hypot(a.sx - 720, a.sy - 450) - Math.hypot(b.sx - 720, b.sy - 450))[0];
const clip = (w, h) => ({ x: Math.max(0, pk.sx - w / 2), y: Math.max(0, pk.sy - h / 2), width: w, height: h });

await page.mouse.move(pk.sx, pk.sy);
await page.waitForTimeout(400);
await page.screenshot({ path: `${outDir}/01-hover-context.png`, clip: clip(520, 400) });
await page.screenshot({ path: `${outDir}/02-hover-tight.png`, clip: clip(240, 220) });
const tip = await page.evaluate(() => {
  const t = document.getElementById('tip');
  return t.style.display === 'block' ? t.innerText.replace(/\n/g, ' | ') : '(no tooltip)';
});
console.log(`dayT=${DAYT} halls=${halls.length} at ${pk.sx.toFixed(0)},${pk.sy.toFixed(0)}`);
console.log(`tooltip: ${tip}`);
console.log(`pageerrors: ${errs.length ? errs.join(' ; ') : 'none'}`);
await browser.close();
