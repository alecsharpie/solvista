/* shot-woods.mjs — iter 117. hovershot.mjs aims at ENTITIES via __ents; this
 * aims at TILES via __find, so the woodland tooltip can be screenshotted.
 * Zooms the artifact's own camera (real magnification), re-picking the tile
 * after each wheel because zooming moves its screen coords.
 *
 *   node shot-woods.mjs <seed> <warp> <outdir> [year]
 */
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;

const [seed = '42', warp = '11', outDir = 'shots/woods', yr = ''] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const ZOOM = +(process.env.ZOOM || 4);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
page.on('pageerror', e => errs.push(String(e)));
await page.goto(pathToFileURL(process.cwd() + '/solvista.html').href
  + `?seed=${seed}&warp=${warp}&t=0.3&tide=0.59` + (yr ? `&year=${yr}` : ''));
await page.waitForTimeout(1400);

/* choose a wooded hex near frame centre that belongs to a decent stand */
const target = async kind => {
  const all = await page.evaluate(k => window.__find(k), kind);
  if (!all.length) return null;
  return all.sort((a, b) => Math.hypot(a.sx - 720, a.sy - 450) - Math.hypot(b.sx - 720, b.sy - 450))[0];
};

for (const kind of ['redwood', 'forest', 'meadow']) {
  let cur = await target(kind);
  if (!cur) { console.log(`${kind}: none in this city`); continue; }
  const gx = cur.x, gy = cur.y;
  for (let i = 0; i < ZOOM; i++) {
    await page.mouse.move(cur.sx, cur.sy);
    await page.mouse.wheel(0, -400);
    await page.waitForTimeout(220);
    const again = await page.evaluate(k => window.__find(k), kind);
    const me = again.find(c => c.x === gx && c.y === gy);
    if (!me) break;
    cur = me;
  }
  await page.mouse.move(20, 20); await page.waitForTimeout(250);
  await page.mouse.move(cur.sx, cur.sy); await page.waitForTimeout(300);
  const tip = await page.evaluate(() => {
    const t = document.getElementById('tip');
    return getComputedStyle(t).display === 'none' ? null : t.innerText.replace(/\n+/g, ' | ');
  });
  await page.screenshot({ path: `${outDir}/${kind}-hover.png` });
  console.log(`${kind} (${gx},${gy}) -> ${tip || 'NO TOOLTIP'}`);
  // reset zoom for the next subject
  await page.mouse.move(720, 450);
  for (let i = 0; i < ZOOM; i++) { await page.mouse.wheel(0, 400); await page.waitForTimeout(120); }
  await page.waitForTimeout(250);
}

/* the mandatory un-zoomed whole-city frame: the tooltip must not have disturbed it */
await page.mouse.move(20, 20); await page.waitForTimeout(300);
await page.screenshot({ path: `${outDir}/whole-city.png` });
console.log(`pageerrors: ${errs.length}`);
await browser.close();
