#!/usr/bin/env node
/* probe-artlight — does the arterial spine (c.flow>=ARTFLOW) now read as a lit
 * CORRIDOR at night, patched vs pristine HEAD? (iter 138, Transport × Connect)
 *
 * The old night lamps were a warm glow disc keyed to c.busy (the LOCAL "third of
 * the city" test), so the actual through-network never read as a network at night.
 * The change pools warm light along the arterial centre-line toward each arterial
 * neighbour, tracing c.flow hex-to-hex, and leaves ordinary streets' ambient disc
 * byte-identical. So the falsifiable claim, with controls the census can't express:
 *
 *   SIGNAL  : arterial hex boxes are BRIGHTER at night on the patched build than on
 *             pristine HEAD (signed Δluminance clearly > 0).
 *   CONTROL1: the SAME arterial boxes on a DAY frame do NOT change — the whole lamp
 *             block is gated `LITAMT>0.25`, so day Δ ≈ 0 (proves night-only).
 *   CONTROL2: a far-off NON-road tile (deep water) at night does NOT change — Δ ≈ 0
 *             (proves it is the spine that lit up, not a whole-frame wash).
 *
 * Freezes the sim (same-frame-control law, iter 109): the sea sparkles on waveT and
 * headlights ride v.p, so a live diff would measure motion. Build-vs-build: pristine
 * HEAD is loaded from /tmp, patched from the worktree; arterial coords come from
 * __find('arterial') on each build (same seed ⇒ same cells).
 *
 *   node probe-artlight.mjs [seed ...]   (default 7 42)
 */
import { homedir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync } from 'node:fs';
import { execSync } from 'node:child_process';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const CAND = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html')];
const PATCHED = CAND.find(existsSync);
/* pristine HEAD, written beside /tmp so a killed run leaves nothing in the tree */
const PRISTINE = '/tmp/pristine-artlight.html';
if (!existsSync(PRISTINE)) {
  execSync(`git -C ${dirname(PATCHED)} show HEAD:solvista.html > ${PRISTINE}`);
}

const SEEDS = process.argv.slice(2).filter(a => !a.startsWith('-')).map(Number);
const seeds = SEEDS.length ? SEEDS : [7, 42];
const NIGHT = s => `?seed=${s}&warp=61&t=0.90&tide=0.59&year=2035.62`;
const DAY   = s => `?seed=${s}&warp=61&t=0.35&tide=0.59&year=2035.62`;

/* mean luminance (0.299R+0.587G+0.114B) over a flat RGBA array */
function lum(a) {
  let s = 0, n = a.length / 4;
  for (let k = 0; k < n; k++) s += 0.299 * a[k * 4] + 0.587 * a[k * 4 + 1] + 0.114 * a[k * 4 + 2];
  return s / n;
}
/* device-pixel box covering one hex, centred on a tile's CSS screen coords */
async function box(page, sx, sy) {
  return page.evaluate(([sx, sy]) => {
    const cv = document.querySelector('canvas');
    const g = cv.getContext('2d');
    const dpr = cv.width / cv.clientWidth;
    const hw = Math.round(HW * scale * 0.9 * dpr);
    const px = Math.round(sx * dpr), py = Math.round(sy * dpr);
    const x0 = Math.max(0, px - hw), y0 = Math.max(0, py - hw);
    const w = Math.min(cv.width - x0, hw * 2), h = Math.min(cv.height - y0, hw * 2);
    return Array.from(g.getImageData(x0, y0, w, h).data);
  }, [sx, sy]);
}

async function load(page, url) {
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForFunction('window.__find');
  await page.evaluate(() => { playing = false; render(); });
}
/* summed luminance over a set of hex boxes, at the current frame */
async function litSum(page, pts) {
  let tot = 0;
  for (const p of pts) tot += lum(await box(page, p.sx, p.sy));
  return tot / pts.length;
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

console.log('seed | arterials | NIGHT arterial Δlum (P−H) | DAY arterial Δlum | NIGHT far-water Δlum');
console.log('─'.repeat(92));
const agg = { night: [], day: [], ctrl: [] };

for (const s of seeds) {
  /* pick the arterial + far-water hexes ONCE (cells are seed-identical across builds) */
  await load(page, pathToFileURL(PATCHED).href + NIGHT(s));
  const pick = await page.evaluate(() => {
    let art = window.__find('arterial');
    const water = window.__find('WATER');
    /* cap the arterial sample for speed; take a spread across the list */
    if (art.length > 60) { const st = art.length / 60; art = Array.from({ length: 60 }, (_, i) => art[(i * st) | 0]); }
    /* far water: farthest deep-water hex from the arterial centroid */
    const mx = art.reduce((a, b) => a + b.sx, 0) / art.length, my = art.reduce((a, b) => a + b.sy, 0) / art.length;
    let f = null, bd = -1;
    for (const w of water) { const d = (w.sx - mx) ** 2 + (w.sy - my) ** 2; if (d > bd) { bd = d; f = w; } }
    return { art: art.map(a => ({ x: a.x, y: a.y, sx: a.sx, sy: a.sy })), water: [f] };
  });

  const pN_art = await litSum(page, pick.art);
  const pN_ctrl = await litSum(page, pick.water);
  await load(page, pathToFileURL(PATCHED).href + DAY(s));
  const pD_art = await litSum(page, pick.art);

  await load(page, pathToFileURL(PRISTINE).href + NIGHT(s));
  const hN_art = await litSum(page, pick.art);
  const hN_ctrl = await litSum(page, pick.water);
  await load(page, pathToFileURL(PRISTINE).href + DAY(s));
  const hD_art = await litSum(page, pick.art);

  const dNight = pN_art - hN_art, dDay = pD_art - hD_art, dCtrl = pN_ctrl - hN_ctrl;
  agg.night.push(dNight); agg.day.push(dDay); agg.ctrl.push(dCtrl);
  console.log(`${String(s).padEnd(4)} | ${String(pick.art.length).padStart(9)} | ${dNight.toFixed(2).padStart(24)} | ${dDay.toFixed(2).padStart(17)} | ${dCtrl.toFixed(2).padStart(20)}`);
}

await browser.close();
const mean = a => a.reduce((x, v) => x + v, 0) / a.length;
const N = mean(agg.night), D = mean(agg.day), C = mean(agg.ctrl);
console.log('─'.repeat(92));
console.log(`arterial NIGHT Δlum ${N.toFixed(2)}  ·  DAY control ${D.toFixed(2)}  ·  far-water NIGHT control ${C.toFixed(2)}`);
console.log(`VERDICT: ${N > 1.5 && Math.abs(D) < 0.6 && Math.abs(C) < 0.6 ? 'PASS' : 'FAIL'}  (spine brightens >1.5 at night; day & far-water controls <0.6)`);
