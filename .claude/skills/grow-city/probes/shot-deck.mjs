#!/usr/bin/env node
/* shot-deck.mjs — the camera for cue (u), AIMED BY MEASURED INK (226's law).
 *
 * The deck is a thin ribbon over the water and it is sited procedurally, so a fixed
 * clip is a coin-flip (201) and no tile predicate can tell you where it is legible
 * (226). But we already have an exact answer: loud-paint BASE.deck, diff inside one
 * page, and the changed pixels ARE the deck (161). So take the DENSEST WINDOW of
 * that ink and point the camera there — that is where the boardwalk provably renders.
 *
 * Shoots, per seed:
 *   city-night   whole frame, un-zoomed  (the mandatory cumulative read)
 *   deck-night   ~4x on the densest deck ink   <- the change under test
 *   deck-day     the same aim, in daylight     <- CONTROL: byte-identical code (199),
 *                                                 so HEAD and patch must be identical
 *
 * AIM=wx,wy forces the world point, so the HEAD build frames the IDENTICAL hex and
 * the before/after pair is blind. Freeze per 213/195(f); force syncSky+syncStats
 * per 204 (a frozen clock does not refresh the DOM); page.screenshot per 200.
 *
 *   node shot-deck.mjs <seed> <outdir>
 *   SRC=/tmp/head.html AIM=123.4,456.7 node shot-deck.mjs <seed> <outdir>
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = process.env.SRC ? resolve(process.env.SRC) : join(HERE, '../../../../solvista.html');
const TAG = process.env.TAG || (process.env.SRC ? 'head' : 'patch');
const AIM = process.env.AIM ? process.env.AIM.split(',').map(Number) : null;

const seed = parseInt(process.argv[2] || '42', 10);
const outdir = resolve(process.argv[3] || join(HERE, '../shots/deck'));
mkdirSync(outdir, { recursive: true });

const VW = 1600, VH = 1000, ZOOM = 4.0;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: VW, height: VH }, deviceScaleFactor: 2 });
page.on('pageerror', e => console.error('PAGE ERROR:', e.message));
await page.addInitScript(() => {                       /* 213: before the page's own script */
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await page.goto(pathToFileURL(SRC).href);
await page.waitForFunction(() => typeof window.__warp === 'function');

/* ---- freeze the world, then LOCATE the deck by its own ink ---- */
const aim = await page.evaluate(([seed, forced]) => {
  playing = false;
  genWorld(seed); __warp(61); __setYear(2035.62); __setTime(0.92);
  time = 0; waveT = 0;
  if (typeof STARS !== 'undefined') STARS.length = 0;
  if (typeof flock !== 'undefined') flock = null;
  if (forced) return { wx: forced[0], wy: forced[1], px: 0, forced: true };

  const cvs = document.querySelector('canvas'), c2 = cvs.getContext('2d');
  const grab = () => { render(); return c2.getImageData(0, 0, cvs.width, cvs.height).data; };
  const A = grab();
  const keep = { d: BASE.deck.slice(), k: BASE.deckDk.slice() };
  BASE.deck = [255, 0, 255]; BASE.deckDk = [255, 0, 255]; CCACHE = {};
  const B = grab();
  BASE.deck = keep.d; BASE.deckDk = keep.k; CCACHE = {};

  /* deck ink, accumulated into coarse device-px buckets */
  const CELL = 32, cols = Math.ceil(cvs.width / CELL), rows = Math.ceil(cvs.height / CELL);
  const grid = new Float64Array(cols * rows);
  let tot = 0;
  for (let y = 0; y < cvs.height; y++) for (let x = 0; x < cvs.width; x++) {
    const i = (y * cvs.width + x) * 4;
    const d = Math.abs(A[i] - B[i]) + Math.abs(A[i + 1] - B[i + 1]) + Math.abs(A[i + 2] - B[i + 2]);
    if (d < 24) continue;
    grid[((y / CELL) | 0) * cols + ((x / CELL) | 0)]++; tot++;
  }
  /* densest ~ZOOM-window of ink: box-sum over the grid, take the argmax */
  const winW = Math.max(1, Math.round(cvs.width / 4 / CELL)), winH = Math.max(1, Math.round(cvs.height / 4 / CELL));
  let best = -1, bx = 0, by = 0;
  for (let r = 0; r + winH <= rows; r++) for (let c = 0; c + winW <= cols; c++) {
    let s = 0;
    for (let j = 0; j < winH; j++) for (let i = 0; i < winW; i++) s += grid[(r + j) * cols + c + i];
    if (s > best) { best = s; bx = c; by = r; }
  }
  /* centre of that window, device px -> CSS px -> WORLD (the camera's own units) */
  const devX = (bx + winW / 2) * CELL, devY = (by + winH / 2) * CELL;
  const cssX = devX / dpr, cssY = devY / dpr;
  return { wx: (cssX - offX) / scale, wy: (cssY - offY) / scale, px: tot, win: best, forced: false };
}, [seed, AIM]);

console.log(`  seed ${seed} [${TAG}]  deck ink ${aim.px} px  ->  aim world (${aim.wx.toFixed(1)}, ${aim.wy.toFixed(1)})` +
  (aim.forced ? '  (FORCED — blind A/B)' : `  densest window ${aim.win} px`));

const FRAMES = [
  { name: 'city-night', t: 0.92, zoom: null },   /* the whole-frame cumulative read */
  { name: 'deck-night', t: 0.92, zoom: ZOOM },   /* the change under test */
  { name: 'deck-day',   t: 0.30, zoom: ZOOM },   /* CONTROL: must be identical to HEAD */
];

for (const f of FRAMES) {
  const st = await page.evaluate(([t, zoom, wx, wy, VW, VH]) => {
    playing = false;
    __setTime(t);
    if (zoom) { scale = zoom; offX = VW / 2 - wx * zoom; offY = VH / 2 - wy * zoom; }
    else { scale = fitScale; offX = fitX; offY = fitY; }   /* the un-zoomed whole-city camera */
    /* 204: a frozen clock refreshes neither the CSS sky nor the HUD — force both, or
       the frame lies about everything outside the canvas and an agent FAILs the camera. */
    lastSky = 0; syncSky(performance.now()); syncStats();
    render();
    return { dayT, LITAMT: +LITAMT.toFixed(2), phase: phaseWord(dayT),
             hud: document.getElementById('stPhase').textContent, scale: +scale.toFixed(2) };
  }, [f.t, f.zoom, aim.wx, aim.wy, VW, VH]);

  const png = join(outdir, `s${seed}-${TAG}-${f.name}.png`);
  await page.screenshot({ path: png });
  console.log(`    ${f.name.padEnd(11)} t=${st.dayT.toFixed(2)} LITAMT=${String(st.LITAMT).padStart(4)} ` +
    `scale=${String(st.scale).padStart(5)} phase=${st.phase.padEnd(11)} ` +
    `HUD=${st.hud === st.phase ? 'ok' : 'STALE:' + st.hud} -> ${png}`);
}
await browser.close();
