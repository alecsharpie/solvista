/* probe-farmtone: does the farm belt's RENDERED tone actually move across the year,
   and do neighbouring fields sit at different stages (patchwork)?
   Method: load the city, __find('FARM') for screen coords, sample the real canvas
   pixels in a small box at each field centre, and report the mean RGB + the
   field-to-field spread. Answers "does it separate?" only — never "is it traceable"
   (iter 101). Usage: node probe-farmtone.mjs [seed] */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright/index.mjs';
import { pathToFileURL } from 'node:url';

const seed = process.argv[2] || '42';
const YEARS = [2035.02, 2035.30, 2035.62, 2035.86];
const base = pathToFileURL(process.cwd() + '/solvista.html').href;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });

const lum = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

console.log(`seed ${seed} — mean rendered FARM tile color, sampled from canvas pixels`);
console.log('year    n     R    G    B    lum   spread(±lum)  hue');
for (const y of YEARS) {
  await page.goto(`${base}?seed=${seed}&warp=61&t=0.3&year=${y}`, { waitUntil: 'load' });
  await page.waitForTimeout(400);
  const r = await page.evaluate(() => {
    const cv = document.querySelector('canvas');
    const cx = cv.getContext('2d', { willReadFrequently: true });
    const dpr = cv.width / cv.clientWidth;
    const hits = window.__find('FARM');
    const per = [];
    for (const h of hits) {
      const px = Math.round(h.sx * dpr), py = Math.round(h.sy * dpr);
      if (px < 4 || py < 4 || px > cv.width - 5 || py > cv.height - 5) continue;
      const d = cx.getImageData(px - 3, py - 3, 7, 7).data;
      let R = 0, G = 0, B = 0, n = 0;
      for (let i = 0; i < d.length; i += 4) { R += d[i]; G += d[i + 1]; B += d[i + 2]; n++; }
      per.push([R / n, G / n, B / n]);
    }
    return per;
  });
  if (!r.length) { console.log(`${y}  no farms on screen`); continue; }
  const mean = [0, 1, 2].map(i => r.reduce((a, c) => a + c[i], 0) / r.length);
  const lums = r.map(lum);
  const mL = lums.reduce((a, b) => a + b, 0) / lums.length;
  const sd = Math.sqrt(lums.reduce((a, b) => a + (b - mL) ** 2, 0) / lums.length);
  // hue: crude green-vs-gold axis. >0 = greener than red, <0 = golder.
  const hue = (mean[1] - mean[0]).toFixed(1);
  console.log(
    `${y}  ${String(r.length).padStart(3)}  ` +
    mean.map(v => String(Math.round(v)).padStart(4)).join(' ') +
    `  ${mL.toFixed(1).padStart(5)}   ${sd.toFixed(2).padStart(5)}      ${String(hue).padStart(5)} (G-R)`
  );
}
await browser.close();
