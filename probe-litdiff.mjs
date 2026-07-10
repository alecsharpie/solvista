#!/usr/bin/env node
/* probe-litdiff.mjs — is the night-core change REALLY night-only?
 *
 * `lit=LITAMT*(0.35+0.65*c.lit)` and daylight()'s LITAMT is 0.0 across midday, so
 * rewriting c.lit must change ZERO pixels by day and many by night. Falsifiable, so
 * falsify it rather than trust the arithmetic.
 *
 * ⚠ TWO PAGE LOADS ARE NOT THE SAME INSTANT. The first cut of this probe diffed a
 * pristine build against a patched one, and reported 5.6% of DAY pixels changed --
 * including at t=0.44 where LITAMT is exactly 0. It was lying: `frame()` runs on
 * rAF from the moment of load, so between `goto` and `evaluate` a variable number of
 * frames tick the sim, drift the clouds (syncSky takes performance.now()) and step
 * every vehicle. Re-running the identical comparison gave 89408 px, then 89633 px.
 *
 * So do the A/B INSIDE ONE PAGE, in one instant: render with the new c.lit, restore
 * the pristine c.lit (genWorld's `hashCell(y,x,seed)`, and seedNum IS that seed),
 * render again. Same clouds, same cars, same tide -- every pixel that moves is the
 * code under test. This is iter 109's same-frame law taken literally: "frame" means
 * the instant, not the viewport.
 *
 * Usage: node probe-litdiff.mjs [seed ...]
 */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright-core/index.mjs';
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';

const SEEDS = process.argv.slice(2).length ? process.argv.slice(2).map(Number) : [7, 42];
const HTML = readFileSync(new URL('./solvista.html', import.meta.url));

const srv = createServer((_, res) => { res.setHeader('content-type', 'text/html'); res.end(HTML); }).listen(0);
await new Promise(r => srv.once('listening', r));
const port = srv.address().port;

const browser = await chromium.launch();
for (const seed of SEEDS) {
  for (const [label, t] of [['DAY   t=0.30', 0.30], ['DAY   t=0.44', 0.44], ['DUSK  t=0.70', 0.70], ['NIGHT t=0.88', 0.88]]) {
    const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
    await page.goto(`http://127.0.0.1:${port}/solvista.html?seed=${seed}&warp=61&t=${t}&year=2035.62&tide=0.59`, { waitUntil: 'load' });
    await page.waitForFunction(() => typeof window.__find === 'function');

    const r = await page.evaluate(() => {
      playing = false;                     // stop the sim; nothing below awaits, so
      const cv = document.querySelector('canvas'); // no rAF frame can interleave
      const g = cv.getContext('2d');
      const grab = () => { render(); return g.getImageData(0, 0, cv.width, cv.height).data; };

      const a = Uint8ClampedArray.from(grab());          // A: the new, core-aware light
      const keep = cells.map(c => c && c.lit);
      for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
        const c = cells[idx(x, y)]; if (c) c.lit = hashCell(y, x, seedNum); // B: pristine
      }
      const b = Uint8ClampedArray.from(grab());
      cells.forEach((c, i) => { if (c) c.lit = keep[i]; });

      let diff = 0, sum = 0, maxd = 0;
      for (let i = 0; i < a.length; i += 4) {
        const d = Math.abs(a[i] - b[i]) + Math.abs(a[i + 1] - b[i + 1]) + Math.abs(a[i + 2] - b[i + 2]);
        if (d) { diff++; sum += d; if (d > maxd) maxd = d; }
      }
      return { diff, sum, maxd, px: a.length / 4, LITAMT };
    });
    await page.close();
    console.log(`seed ${seed}  ${label}  LITAMT ${r.LITAMT.toFixed(2)}  changed ${String(r.diff).padStart(7)} / ${r.px} px  (${(100 * r.diff / r.px).toFixed(2)}%)  maxΔ ${String(r.maxd).padStart(3)}  meanΔ ${r.diff ? (r.sum / r.diff).toFixed(1) : '0.0'}`);
  }
}
await browser.close();
srv.close();
