#!/usr/bin/env node
/* probe-winband.mjs — did the paned window band break the stripes WITHOUT darkening
 * the towers? (iter 118, cue (j))
 *
 * Two claims, both falsifiable, neither of which a visual agent can settle (iter 108:
 * agents invert tone orderings; they are reliable only for "is it broken"):
 *
 *   1. MEAN TONE HELD. `colWin` lifts the surviving panes by 1/(1-a) so the band's
 *      mean equals the solid ribbon's *by construction* (iter 116's law). The lift
 *      clips at 255 on the hot channels, so the hold is only approximate -- measure
 *      the residual. The sea's first draft drifted -8.9% and every gate would have
 *      shipped it.
 *   2. HORIZONTAL DETAIL UP, VERTICAL DETAIL FLAT. A ribbon has almost no horizontal
 *      gradient; panes divided by mullions have a lot. That IS "windows, not stripes",
 *      stated as a number. Vertical gradient should barely move: we did not touch the
 *      storey pitch.
 *
 * ⚠ FROZEN INSTANT (iter 109's same-frame law). Draw code differs between the two
 * builds, so this cannot be an in-page A/B like probe-litdiff -- it needs two pages.
 * Both are therefore frozen (`playing=false`) and rendered once, so clouds, cars and
 * the tide are identical by construction and every changed pixel is the code.
 * Pristine side is `git show HEAD:solvista.html`, NEVER `git stash` (iter 108).
 *
 * Usage: node probe-winband.mjs [seed ...]
 */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright-core/index.mjs';
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const SEEDS = process.argv.slice(2).length ? process.argv.slice(2).map(Number) : [7, 42, 1234];
const PATCHED = readFileSync(new URL('./solvista.html', import.meta.url));
const PRISTINE = execSync('git show HEAD:solvista.html', { maxBuffer: 1 << 28 });

const srv = createServer((req, res) => {
  res.setHeader('content-type', 'text/html');
  res.end(req.url.startsWith('/pristine') ? PRISTINE : PATCHED);
}).listen(0);
await new Promise(r => srv.once('listening', r));
const port = srv.address().port;

/* Mean luminance + gradient energy over each tower's front faces, at a frozen instant. */
const sample = async (browser, path, seed, t) => {
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  await page.goto(`http://127.0.0.1:${port}${path}?seed=${seed}&warp=61&t=${t}&year=2035.62&tide=0.59`, { waitUntil: 'load' });
  await page.waitForFunction(() => typeof window.__twr === 'function');
  const r = await page.evaluate(() => {
    playing = false;                       // freeze; nothing below awaits, so no rAF
    const cv = document.querySelector('canvas'), g = cv.getContext('2d');
    render();
    const dsf = cv.width / cv.clientWidth;
    const lum = (d, i) => 0.21 * d[i] + 0.72 * d[i + 1] + 0.07 * d[i + 2];

    let n = 0, sum = 0, gx = 0, gy = 0, gn = 0;
    const shot = [];
    for (const w of window.__twr()) {
      if (w.h < 20) continue;                       // still rising: no facade yet
      const hp = w.h * scale * dsf;                  // body height, image px
      const x0 = Math.round((w.sx * dsf) - 6 * scale * dsf), wd = Math.round(12 * scale * dsf);
      const y1 = Math.round(w.sy * dsf - hp * 0.12), y0 = Math.round(y1 - hp * 0.72);
      if (x0 < 1 || y0 < 1 || x0 + wd > cv.width - 1 || y1 > cv.height - 1) continue;
      const d = g.getImageData(x0, y0, wd, y1 - y0).data, H = y1 - y0;
      for (let yy = 0; yy < H; yy++) for (let xx = 0; xx < wd; xx++) {
        const i = (yy * wd + xx) * 4, L = lum(d, i);
        sum += L; n++;
        if (xx + 1 < wd) { gx += Math.abs(L - lum(d, i + 4)); gn++; }
        if (yy + 1 < H) gy += Math.abs(L - lum(d, i + wd * 4));
      }
      shot.push(w.style);
    }
    return { n, mean: sum / n, gx: gx / gn, gy: gy / gn, towers: shot.length, LITAMT };
  });
  await page.close();
  return r;
};

const browser = await chromium.launch();
console.log('tower facade, frozen instant, night t=0.88   (mean = tone held?   |dI/dx| = windows not stripes?)\n');
console.log('seed        n px   towers |  mean lum  pristine -> patched   |  |dI/dx|  pristine -> patched  |  |dI/dy|');
for (const seed of SEEDS) {
  const a = await sample(browser, '/pristine', seed, 0.88);
  const b = await sample(browser, '/patched', seed, 0.88);
  const pc = (x, y) => ((y - x) / x * 100).toFixed(1).padStart(6);
  console.log(
    `${String(seed).padEnd(6)} ${String(b.n).padStart(8)} ${String(b.towers).padStart(6)}  |` +
    `  ${a.mean.toFixed(1).padStart(6)} -> ${b.mean.toFixed(1).padStart(6)}  (${pc(a.mean, b.mean)}%)  |` +
    `  ${a.gx.toFixed(2).padStart(5)} -> ${b.gx.toFixed(2).padStart(5)}  (${pc(a.gx, b.gx)}%)  |` +
    `  ${a.gy.toFixed(2).padStart(5)} -> ${b.gy.toFixed(2).padStart(5)}  (${pc(a.gy, b.gy)}%)`);
}
/* the day frame must be byte-identical: LITAMT < 0.35 short-circuits winBandR */
console.log('\nday control t=0.30 (must be 0.0% on every column — the day frame pays nothing):');
for (const seed of SEEDS) {
  const a = await sample(browser, '/pristine', seed, 0.30);
  const b = await sample(browser, '/patched', seed, 0.30);
  const pc = (x, y) => ((y - x) / x * 100).toFixed(1).padStart(6);
  console.log(`seed ${String(seed).padEnd(5)} mean ${a.mean.toFixed(2)} -> ${b.mean.toFixed(2)} (${pc(a.mean, b.mean)}%)   |dI/dx| ${a.gx.toFixed(3)} -> ${b.gx.toFixed(3)} (${pc(a.gx, b.gx)}%)`);
}
await browser.close();
srv.close();
