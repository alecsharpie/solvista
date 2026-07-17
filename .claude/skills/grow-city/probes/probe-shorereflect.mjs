#!/usr/bin/env node
/* probe-shorereflect.mjs (iter 329) — does the night waterfront reflection now ANSWER
 * the skyline it fronts, instead of smearing uniformly along the whole coast?
 *
 * The smear is one signature draw: ctx.fillRect with fillStyle 'rgba(255,200,120,a)'
 * (unique among fillRects; GWSB shares the colour but is golden-hour hexTile/strokes,
 * off at night). Wrapping shoreGlow(y) stashes (y, g) and wrapping ctx.fillRect reads
 * them back at the instant the smear draws — so every rect is attributed to its shore
 * row's glow with NO pixel diff and NO noise floor. BUILD-AGNOSTIC (patch only), the
 * claim is the correlation.
 *
 * Gates: (1) ink per shore row rises with g (patch) — HEAD is flat by construction;
 * (2) dark rows (g<=0.03) emit EXACTLY 0 (the fix's whole point — a reflection needs a
 * source); (3) DAY control: the LITAMT>0.4 gate is off ⇒ 0 rects, a free dead regime (199).
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(join(HERE, '../../../../solvista.html')).href;
const SEEDS = [7, 42, 1234];

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
await p.addInitScript(() => {                         /* 213 */
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await p.goto(PAGE);
await p.waitForFunction(() => window.__census);

for (const seed of SEEDS) {
  const r = await p.evaluate((seed) => {
    playing = false;
    genWorld(seed); __warp(61);
    STARS.length = 0; flock = null; time = 1234.5; waveT = 567.8;

    const origSG = window.shoreGlow; let lastY = -1, lastG = 0;
    window.shoreGlow = (y) => { lastY = y; const g = origSG(y); lastG = Math.min(1, g); return g; };
    const origFR = CanvasRenderingContext2D.prototype.fillRect;
    let capture = false, perRow = {}, rects = 0;
    CanvasRenderingContext2D.prototype.fillRect = function (x, y, w, h) {
      if (capture) {
        const fs = this.fillStyle;                     /* 273: Chromium canonicalises on read */
        if (typeof fs === 'string' && fs.startsWith('rgba(255, 200, 120')) {
          const a = parseFloat(fs.slice(fs.lastIndexOf(',') + 1));
          if (a > 0) { rects++; perRow[lastY] = perRow[lastY] || { g: lastG, ink: 0 }; perRow[lastY].ink += Math.abs(w * h) * a; }
        }
      }
      return origFR.apply(this, arguments);
    };

    const measure = (t) => {
      __setTime(t);
      perRow = {}; rects = 0; capture = true; render(); capture = false;
      const rows = Object.entries(perRow).map(([y, v]) => ({ g: v.g, ink: v.ink }));
      return { rects, rows, LITAMT };
    };

    const night = measure(0.95);
    const day = measure(0.415);

    CanvasRenderingContext2D.prototype.fillRect = origFR;
    window.shoreGlow = origSG;

    /* correlation of per-row glow vs emitted ink, and ink binned by glow */
    const rows = night.rows;
    const n = rows.length, mg = rows.reduce((s, r) => s + r.g, 0) / n, mi = rows.reduce((s, r) => s + r.ink, 0) / n;
    let sgg = 0, sii = 0, sgi = 0;
    for (const r of rows) { sgg += (r.g - mg) ** 2; sii += (r.ink - mi) ** 2; sgi += (r.g - mg) * (r.ink - mi); }
    const corr = sgi / (Math.sqrt(sgg * sii) || 1);
    const bins = [0, 0, 0, 0, 0], bn = [0, 0, 0, 0, 0];
    for (const r of rows) { const k = Math.min(4, Math.floor(r.g * 5)); bins[k] += r.ink; bn[k]++; }
    const perBin = bins.map((b, i) => bn[i] ? +(b / bn[i]).toFixed(1) : 0);

    /* dark-row leak: any emitted ink attributed to a row whose real glow <= 0.03 */
    let darkLeak = 0;
    for (let y = 0; y < G; y++) { const sx = shoreAt(y); if (sx >= rowCap(y)) continue; const g = origSG(y); if (g <= 0.03 && perRow[y]) darkLeak += perRow[y].ink; }

    return { nightRects: night.rects, nightLIT: +night.LITAMT.toFixed(2), dayRects: day.rects, dayLIT: +day.LITAMT.toFixed(2),
             corr: +corr.toFixed(2), litRows: n, perBin, darkLeak: +darkLeak.toFixed(1) };
  }, seed);
  console.log(`seed ${String(seed).padStart(4)} · night LITAMT ${r.nightLIT} rects ${r.nightRects} on ${r.litRows} rows`);
  console.log(`           corr(glow,ink) = ${r.corr}  | mean ink by glow bin [0-.2 .2-.4 .4-.6 .6-.8 .8-1] = ${JSON.stringify(r.perBin)}`);
  console.log(`           DAY control (must be 0): ${r.dayRects} rects (LITAMT ${r.dayLIT})  | dark-row leak (must be 0): ${r.darkLeak}`);
}
await b.close();
