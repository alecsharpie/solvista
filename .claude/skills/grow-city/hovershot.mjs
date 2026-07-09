/* ad-hoc verification driver for the hover focus ring (iter 71).
   shoot.mjs can't hover, so drive Playwright directly: use __ents to aim the
   real cursor at a named entity, then clip-shoot it magnified (iter 70 lesson:
   a few-px feature needs deviceScaleFactor before a visual FAIL means anything).
   usage: node hovershot.mjs '<query>' '<Entity name>' <outdir> */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright/index.mjs';
import { mkdirSync } from 'fs';
import { resolve } from 'path';

const [query, entName, outDir] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 4 });
const errs = [];
page.on('pageerror', e => errs.push(String(e)));
await page.goto('file://' + resolve('solvista.html') + '?' + query);
await page.waitForTimeout(2500);

const ents = await page.evaluate(n => window.__ents(n), entName);
if (!ents.length) { console.log('NO ENTITY: ' + entName); await browser.close(); process.exit(1); }
// PICK=front favours front rows, which nothing later can draw over -- an
// occluded entity legitimately shows no ring, so it can't verify one.
const onScreen = ents.filter(e => e.sx > 260 && e.sx < 1180 && e.sy > 140 && e.sy < 760);
const pool = onScreen.length ? onScreen : ents;
const pick = process.env.PICK === 'front'
  ? pool.sort((a, b) => b.sy - a.sy)[0]
  : pool.sort((a, b) => Math.hypot(a.sx - 720, a.sy - 450) - Math.hypot(b.sx - 720, b.sy - 450))[0];
// ZOOM=n: wheel the artifact's own camera in over the entity before shooting, so
// a 5px pedestrian is magnified by real rendering, not by upscaled pixels.
let cur = pick;
if (process.env.ZOOM) {
  for (let i = 0; i < +process.env.ZOOM; i++) {
    await page.mouse.move(cur.sx, cur.sy);
    await page.mouse.wheel(0, -400);
    await page.waitForTimeout(250);
    const again = await page.evaluate(n => window.__ents(n), entName);
    const near = again.filter(e => Math.hypot(e.sx - cur.sx, e.sy - cur.sy) < 90);
    if (!near.length) break;
    cur = near.sort((a, b) => Math.hypot(a.sx - cur.sx, a.sy - cur.sy) - Math.hypot(b.sx - cur.sx, b.sy - cur.sy))[0];
  }
  // park the cursor away so the control frame is genuinely un-hovered
  await page.mouse.move(20, 20);
  await page.waitForTimeout(300);
}
const pk = cur;
const clip = (w, h) => ({ x: Math.max(0, pk.sx - w / 2), y: Math.max(0, pk.sy - h / 2), width: w, height: h });

// control: no cursor on the entity -> there must be NO ring
await page.screenshot({ path: `${outDir}/00-control-nohover.png`, clip: clip(150, 110) });
await page.mouse.move(pk.sx, pk.sy);
await page.waitForTimeout(400);
await page.screenshot({ path: `${outDir}/01-hover-magnified.png`, clip: clip(150, 110) });
await page.screenshot({ path: `${outDir}/02-hover-context.png`, clip: clip(520, 380) });
await page.screenshot({ path: `${outDir}/03-hover-tight.png`, clip: clip(56, 42) });
const tip = await page.evaluate(() => {
  const t = document.getElementById('tip');
  return t.style.display === 'block' ? t.innerText.replace(/\n/g, ' | ') : '(no tooltip)';
});
console.log(`entity=${entName} n=${ents.length} at ${pk.sx.toFixed(0)},${pk.sy.toFixed(0)}`);
console.log(`tooltip: ${tip}`);
console.log(`pageerrors: ${errs.length ? errs.join(' ; ') : 'none'}`);
await browser.close();
