/* probe-marsh: does the salt marsh's RENDERED tone move with the TIDE it reports,
   and with the calendar? The tile's own tooltip calls it a "Reedy tidal wetland"
   and prints a live Tide reading — this asks whether any pixel agrees.

   Method (iter 111's law): freeze the clock (playing=false) so nothing but the
   variable under test can move a pixel, set TIDE directly, render(), then sample
   real canvas pixels at each __find('MARSH') centre. Reports mean RGB + luminance
   + the cell-to-cell spread, and the changed-pixel count vs the low-water frame
   (which is what "is it visible at all" actually means).

   Also reports marsh hex size in screen px at fit zoom, per iter 111: a thing
   drawn at 3 px can be neither convicted nor acquitted by the whole-city gate.

   Usage: node probe-marsh.mjs [seed] [year]  */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright/index.mjs';
import { pathToFileURL } from 'node:url';

const seed = process.argv[2] || '42';
const year = process.argv[3] || '2035.30';
const TIDES = [0.0, 0.25, 0.5, 0.75, 1.0];
const base = pathToFileURL(process.cwd() + '/solvista.html').href;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
const lum = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

await page.goto(`${base}?seed=${seed}&warp=61&t=0.3&year=${year}`, { waitUntil: 'load' });
await page.waitForTimeout(400);

// freeze the sim: after this, ONLY the variable we set can move a pixel.
const geom = await page.evaluate(() => {
  playing = false;
  const cv = document.querySelector('canvas');
  const hits = window.__find('MARSH');
  return { n: hits.length, hexW: 2 * HW * scale, hexH: 2 * VR * scale,
           dpr: cv.width / cv.clientWidth, W: cv.clientWidth, H: cv.clientHeight,
           onscreen: hits.filter(h => h.sx > 8 && h.sy > 8 && h.sx < cv.clientWidth - 8 && h.sy < cv.clientHeight - 8).length };
});
console.log(`seed ${seed}  year ${year}  —  ${geom.n} MARSH cells, ${geom.onscreen} on screen`);
console.log(`marsh hex at fit zoom: ${geom.hexW.toFixed(1)} x ${geom.hexH.toFixed(1)} screen px`);
console.log('');
console.log('TIDE    n     R    G    B    lum    spread   changed-px vs TIDE=0');
console.log('----------------------------------------------------------------');

let ref = null;
for (const tide of TIDES) {
  const r = await page.evaluate((tide) => {
    TIDE = tide; TIDEV = 1;          // the frame loop is frozen, so these stick
    render();
    const cv = document.querySelector('canvas');
    const cx = cv.getContext('2d', { willReadFrequently: true });
    const dpr = cv.width / cv.clientWidth;
    const hits = window.__find('MARSH');
    const per = [];
    const boxes = [];
    for (const h of hits) {
      const px = Math.round(h.sx * dpr), py = Math.round(h.sy * dpr);
      const R = Math.round(9 * dpr);
      if (px < R + 1 || py < R + 1 || px > cv.width - R - 2 || py > cv.height - R - 2) continue;
      const d = cx.getImageData(px - R, py - R, 2 * R, 2 * R).data;
      let A = 0, B = 0, C = 0, n = 0;
      for (let i = 0; i < d.length; i += 4) { A += d[i]; B += d[i + 1]; C += d[i + 2]; n++; }
      per.push([A / n, B / n, C / n]);
      boxes.push(Array.from(d));
    }
    return { per, boxes };
  }, tide);

  if (!r.per.length) { console.log(`${tide}  no marsh on screen`); continue; }
  const mean = [0, 1, 2].map(i => r.per.reduce((a, c) => a + c[i], 0) / r.per.length);
  const lums = r.per.map(lum);
  const mL = lums.reduce((a, b) => a + b, 0) / lums.length;
  const sd = Math.sqrt(lums.reduce((a, b) => a + (b - mL) ** 2, 0) / lums.length);

  let changed = '—';
  if (ref === null) ref = r.boxes;
  else {
    let diff = 0, total = 0;
    for (let b = 0; b < r.boxes.length; b++)
      for (let i = 0; i < r.boxes[b].length; i += 4) {
        total++;
        if (Math.abs(r.boxes[b][i] - ref[b][i]) > 2 ||
            Math.abs(r.boxes[b][i + 1] - ref[b][i + 1]) > 2 ||
            Math.abs(r.boxes[b][i + 2] - ref[b][i + 2]) > 2) diff++;
      }
    changed = `${diff} / ${total}  (${(100 * diff / total).toFixed(1)}%)`;
  }
  console.log(
    `${tide.toFixed(2)}  ${String(r.per.length).padStart(3)}  ` +
    mean.map(v => String(Math.round(v)).padStart(4)).join(' ') +
    `  ${mL.toFixed(1).padStart(5)}   ${sd.toFixed(2).padStart(5)}    ${changed}`
  );
}

// and the calendar, at mid tide
console.log('');
console.log('year (TIDE frozen at 0.5)   lum    G-R (green<->gold)');
for (const y of ['2035.02', '2035.30', '2035.62', '2035.87']) {
  await page.goto(`${base}?seed=${seed}&warp=61&t=0.3&year=${y}`, { waitUntil: 'load' });
  await page.waitForTimeout(350);
  const m = await page.evaluate(() => {
    playing = false; TIDE = 0.5; TIDEV = 1; render();
    const cv = document.querySelector('canvas');
    const cx = cv.getContext('2d', { willReadFrequently: true });
    const dpr = cv.width / cv.clientWidth;
    const per = [];
    for (const h of window.__find('MARSH')) {
      const px = Math.round(h.sx * dpr), py = Math.round(h.sy * dpr), R = Math.round(9 * dpr);
      if (px < R + 1 || py < R + 1 || px > cv.width - R - 2 || py > cv.height - R - 2) continue;
      const d = cx.getImageData(px - R, py - R, 2 * R, 2 * R).data;
      let A = 0, B = 0, C = 0, n = 0;
      for (let i = 0; i < d.length; i += 4) { A += d[i]; B += d[i + 1]; C += d[i + 2]; n++; }
      per.push([A / n, B / n, C / n]);
    }
    return per;
  });
  if (!m.length) { console.log(`${y}  none`); continue; }
  const mean = [0, 1, 2].map(i => m.reduce((a, c) => a + c[i], 0) / m.length);
  console.log(`${y}                     ${lum(mean).toFixed(1).padStart(5)}   ${(mean[1] - mean[0]).toFixed(1).padStart(5)}`);
}

await browser.close();
