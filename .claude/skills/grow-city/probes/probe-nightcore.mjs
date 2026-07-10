#!/usr/bin/env node
/* probe-nightcore.mjs — does the night city have a LUMINOUS CORE?
 *
 * Iter 115's step-back agent called the night frame "a uniform warm-speckle field
 * with no bright downtown". That is a "which is more X" claim, and iter 108's law
 * says agents invert those. So measure it.
 *
 * Two readings, because the cause is occlusion-free and the effect is not:
 *
 *   MODEL  — for every building cell, the per-cell light parameter `c.lit` against
 *            `hexDist(x,y,CBDX,CBDY)`. drawBuilding's window mix is
 *            `LITAMT*(0.35+0.65*c.lit)`, so `c.lit` IS the light field. Pearson
 *            corr(lit, d) near 0 => the light ignores downtown, by construction.
 *            No pixels, no occlusion, no camera. This is the decisive number.
 *
 *   PIXEL  — mean night luminance sampled at each building's screen point, bucketed
 *            into distance rings. Occlusion and roof-vs-facade make the ABSOLUTE
 *            value meaningless; the sample point is identical across runs and rings,
 *            so the RING PROFILE and the before/after delta are what to read.
 *
 * Reference scale (iter 110's probe-towertone, same Pearson convention):
 *   |corr| < ~0.35 = the two fields are decoupled.  > ~0.6 = one restates the other.
 * Here we WANT a negative corr (far from downtown => dimmer). corr ~ 0 = the defect.
 *
 * Usage: node probe-nightcore.mjs [seed ...]
 */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright-core/index.mjs';
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';

const SEEDS = process.argv.slice(2).length ? process.argv.slice(2).map(Number) : [7, 42, 1234];
const HTML = readFileSync(new URL('./solvista.html', import.meta.url));

const srv = createServer((_, res) => { res.setHeader('content-type', 'text/html'); res.end(HTML); }).listen(0);
await new Promise(r => srv.once('listening', r));
const port = srv.address().port;

const pearson = (a, b) => {
  const n = a.length, ma = a.reduce((s, x) => s + x, 0) / n, mb = b.reduce((s, x) => s + x, 0) / n;
  let sab = 0, sa = 0, sb = 0;
  for (let i = 0; i < n; i++) { const da = a[i] - ma, db = b[i] - mb; sab += da * db; sa += da * da; sb += db * db; }
  return sab / Math.sqrt(sa * sb);
};
const mean = a => a.reduce((s, x) => s + x, 0) / (a.length || 1);

// distance rings, in hexes from the CBD
const RINGS = [[0, 4], [4, 8], [8, 12], [12, 16], [16, 22], [22, 40]];

const browser = await chromium.launch();
for (const seed of SEEDS) {
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  // t=0.88 is deep night (KEYS: lit=1.0). tide/year pinned so nothing else moves.
  await page.goto(`http://127.0.0.1:${port}/solvista.html?seed=${seed}&warp=61&t=0.88&year=2035.62&tide=0.59`, { waitUntil: 'load' });
  await page.waitForFunction(() => typeof window.__find === 'function');
  await page.waitForTimeout(1200); // growth animation settles (h -> th)

  const data = await page.evaluate(() => {
    // iter 109's same-frame law: freeze the sim, then draw exactly one frame.
    playing = false;
    render();
    const cv = document.querySelector('canvas');
    const g = cv.getContext('2d');
    const dpr = cv.width / cv.clientWidth;
    const BUILD = [T.RES, T.MID, T.COM, T.TOWER];
    const lum = (px, py) => {
      // 9x9 box at the sample point; buildings rise from the ground centre, so
      // lift the point onto the facade. Consistent across rings and runs.
      const X = Math.round(px * dpr) - 4, Y = Math.round(py * dpr) - 4;
      if (X < 0 || Y < 0 || X + 9 > cv.width || Y + 9 > cv.height) return null;
      const d = g.getImageData(X, Y, 9, 9).data;
      let s = 0;
      for (let i = 0; i < d.length; i += 4) s += 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
      return s / (d.length / 4);
    };
    const out = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)];
      if (!c || !BUILD.includes(c.t)) continue;
      const [cx, cy] = ctr(x, y);
      const sx = cx * scale + offX, sy = cy * scale + offY - 8 * scale;
      out.push({ d: hexDist(x, y, CBDX, CBDY), lit: c.lit, th: c.th, L: lum(sx, sy) });
    }
    return { cells: out, CBDX, CBDY, CORER, LITAMT };
  });
  await page.close();

  const B = data.cells;
  const vis = B.filter(b => b.L !== null);
  console.log(`\n=== seed ${seed} · ${B.length} buildings · CBD (${data.CBDX},${data.CBDY}) · CORER=${data.CORER} · LITAMT=${data.LITAMT}`);
  console.log(`MODEL corr(lit, dist)  = ${pearson(B.map(b => b.lit), B.map(b => b.d)).toFixed(3)}   (want clearly negative; ~0 = light ignores downtown)`);
  console.log(`MODEL corr(lit, th)    = ${pearson(B.map(b => b.lit), B.map(b => b.th)).toFixed(3)}   (want ~0: brightness must NOT restate height — iters 103/110)`);
  console.log(`PIXEL corr(lum, dist)  = ${pearson(vis.map(b => b.L), vis.map(b => b.d)).toFixed(3)}   (${vis.length} sampled)`);
  console.log(`  ring(hex)    n   mean c.lit   mean lum`);
  for (const [lo, hi] of RINGS) {
    const r = B.filter(b => b.d >= lo && b.d < hi);
    if (!r.length) continue;
    const rv = r.filter(b => b.L !== null);
    console.log(`  ${String(lo).padStart(2)}-${String(hi).padStart(2)}  ${String(r.length).padStart(5)}      ${mean(r.map(b => b.lit)).toFixed(3)}     ${rv.length ? mean(rv.map(b => b.L)).toFixed(1) : '  --'}`);
  }
}
await browser.close();
srv.close();
