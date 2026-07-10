#!/usr/bin/env node
/* Iter 112 visual probe.
 *
 * The feature is MOTION (a train brakes, stands, and pulls out while its platform
 * empties), so a still frame cannot show it and a filmstrip across sim time would be
 * all weather (iter 111: two shots of this city at different instants differ by ~14%
 * of the canvas). So: freeze the clock, and drive ONLY the train's `p`/`dw` and the
 * platform's `mlast` between render()s. Every other pixel is then identical by
 * construction, and the diff isolates the feature.
 *
 * Also per iter 111: never hand-derive which station is visible. Stage phase A vs
 * phase C at EVERY station, count changed pixels, and shoot the winner.
 *
 *   node probe-station.mjs <seed> <outdir>
 */
import { homedir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(join(resolve(HERE, '../../..'), 'solvista.html')).href;

const seed = process.argv[2] || '7';
const outDir = process.argv[3] || join(HERE, 'shots/station');
mkdirSync(outDir, { recursive: true });

const ZOOM = 3.4, CLIP = { w: 300, h: 230 };

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
page.on('pageerror', e => errs.push(String(e)));

await page.goto(`${PAGE}?seed=${seed}&warp=61&t=0.35`, { waitUntil: 'load' });
await page.waitForTimeout(700);

/* Freeze. Nothing advances from here: only the values we poke. */
await page.evaluate(() => { playing = false; });

/* Install the stager in-page, so phases are one function both the diff and the
   filmstrip drive -- the same "one definition" discipline as railQueue. */
await page.evaluate(({ ZOOM }) => {
  window.__aim = (li, si) => {                 // centre the camera on a station
    const m = monos[li], [x, y] = m.path[[...m.sta][si]];
    const [cx, cy] = ctr(x, y);
    scale = fitScale * ZOOM;
    offX = innerWidth / 2 - cx * scale;
    offY = innerHeight / 2 - cy * scale;
    return { cx, cy };
  };
  /* phase: 0 approaching (full platform) | 1 standing (boarding) | 2 pulled out (empty) | 3 refilled */
  window.__phase = (li, si, phase) => {
    const m = monos[li], idxs = [...m.sta], pi = idxs[si];
    const st = m.staP.find(s => s.i === pi);
    const [sx, sy] = m.path[pi], c = cells[idx(sx, sy)];
    m.trains.forEach((t, k) => {              // park every other train well away, identically in all phases
      if (k !== 0) { t.p = (st.p + 0.5 + k * 0.03) % 1; t.dw = 0; }
    });
    const t0 = m.trains[0];
    if (phase === 0) { t0.p = (st.p - 0.85 * m.brakeP + 1) % 1; t0.dw = 0; c.mlast = time - 1e4; }
    if (phase === 1) { t0.p = st.p; t0.dw = 1.0; c.mlast = time - 1.6; }   // mid-dwell: bl=0.5
    if (phase === 2) { t0.p = (st.p + 0.55 * m.brakeP) % 1; t0.dw = 0; c.mlast = time - 4.0; } // u=0.8 < MONOGONE
    if (phase === 3) { t0.p = (st.p + 0.45) % 1; t0.dw = 0; c.mlast = time - 40; }
    render();
  };
  window.__grab = (w, h) => {                  // device-pixel RGBA of the centre box
    const X = ((innerWidth - w) / 2 * dpr) | 0, Y = ((innerHeight - h) / 2 * dpr) | 0;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    return Array.from(ctx.getImageData(X, Y, (w * dpr) | 0, (h * dpr) | 0).data);
  };
}, { ZOOM });

const lines = await page.evaluate(() => monos.map((m, li) => ({ li, closed: m.closed, n: m.sta ? m.sta.size : 0 })));

/* ---- rank every station by how many pixels the feature actually moves ---- */
const ranked = [];
for (const L of lines) {
  if (!L.closed || !L.n) continue;
  for (let si = 0; si < L.n; si++) {
    await page.evaluate(({ li, si }) => window.__aim(li, si), { li: L.li, si });
    const a = await page.evaluate(({ li, si, C }) => { window.__phase(li, si, 0); return window.__grab(C.w, C.h); }, { li: L.li, si, C: CLIP });
    const c = await page.evaluate(({ li, si, C }) => { window.__phase(li, si, 2); return window.__grab(C.w, C.h); }, { li: L.li, si, C: CLIP });
    let diff = 0;
    for (let i = 0; i < a.length; i += 4) if (a[i] !== c[i] || a[i + 1] !== c[i + 1] || a[i + 2] !== c[i + 2]) diff++;
    ranked.push({ li: L.li, si, diff });
  }
}
ranked.sort((p, q) => q.diff - p.diff);
console.log(`seed ${seed} — changed pixels, approaching vs departed, per station (zoom ${ZOOM}):`);
for (const r of ranked) console.log(`  line ${r.li} station ${r.si}: ${r.diff} px${r.diff < 200 ? '   <- occluded / sub-pixel' : ''}`);

const best = ranked[0];
if (!best || best.diff < 200) { console.log('\nNO VISIBLE STATION on this seed.'); await browser.close(); process.exit(0); }
console.log(`\nshooting line ${best.li} station ${best.si} (${best.diff} px)`);

const clip = { x: (1440 - CLIP.w) / 2, y: (900 - CLIP.h) / 2, width: CLIP.w, height: CLIP.h };
const names = ['a-approaching', 'b-standing', 'c-departed', 'd-refilled'];
await page.evaluate(({ li, si }) => window.__aim(li, si), best);
for (let p = 0; p < 4; p++) {
  await page.evaluate(({ li, si, p }) => window.__phase(li, si, p), { ...best, p });
  await page.screenshot({ path: join(outDir, `${names[p]}.png`), clip });
}

/* whole-city frame, same seed, un-zoomed — the cumulative read */
await page.evaluate(() => { zoom = 1; scale = fitScale; offX = fitX; offY = fitY; render(); });
await page.screenshot({ path: join(outDir, 'whole-city.png') });

console.log(`page errors: ${errs.length}${errs.length ? '\n  ' + errs.join('\n  ') : ''}`);
await browser.close();
