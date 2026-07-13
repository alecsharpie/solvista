#!/usr/bin/env node
/* probe-deckhue.mjs — cue (u): is the pier/boardwalk DECK hue-rotated at night?
 *
 * The deck is NOT a tile type — it is a draw laid over WATER/BEACH hexes — so the
 * per-tile sampler (probe-sandhue / probe-goldenhue) is structurally blind to it.
 * Isolate it instead by LOUD-PAINTING ITS PALETTE ENTRY AND DIFFING INSIDE ONE PAGE
 * (161: the diff locates the draw by construction; 230: two renders in one page are
 * byte-identical, so the floor is exactly 0):
 *
 *   render()                       -> imgA   (the deck as shipped)
 *   BASE.deck = magenta; CCACHE={} -> imgB   (the deck, and ONLY the deck, moved)
 *   mask = (imgA != imgB)                    == every pixel the deck draws
 *   deck colour = mean of imgA over mask     == the deck's TRUE rendered colour
 *
 * That mask is computed per-build from the build's own render, so this runs
 * UNCHANGED on HEAD and on the patch — no source swap, no cross-build floor (230).
 *
 * THE GATE IS 221'S LAW: for an identity/hue claim, gate on the surface's distance
 * from ITS OWN DAYLIGHT SELF, never on a pairwise separation from a neighbour (a
 * separation metric REWARDS this class of bug). So the number that decides it is
 *
 *   dHUE = angular distance( night hue of the deck , DAY hue of the deck )
 *
 * CONTROLS:
 *   (a) DAY is the free dead-regime control (199): washRGB crosses over at LITAMT
 *       0.35, so daylight runs BYTE-IDENTICAL code on both builds. Every day column
 *       must match HEAD to ~0.1 deg. If it moves, the patch leaked into daylight.
 *   (b) ink (deck px) must not move: this is a COLOUR change, not a geometry one.
 *   (c) night LUMINANCE is reported because 222's ladder invariant spans the SET —
 *       no UNLIT surface may out-brighten the LIT ones. The deck must stay dark.
 *
 * Freeze per 213 (Math.random stubbed in addInitScript, before the page's script)
 * and 195(f) (pin `time` and `waveT`, or drifting surf sits under the signal).
 *
 *   node probe-deckhue.mjs            # the shipped file
 *   SRC=/tmp/head.html node probe-deckhue.mjs
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = process.env.SRC ? resolve(process.env.SRC) : join(HERE, '../../../../solvista.html');

const SEEDS = [7, 42, 1234];
const HOURS = [['day', 0.30], ['night', 0.92]];
const W = 1600, H = 1000;

function hue(r, g, b) {
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), c = mx - mn;
  if (c < 1e-6) return 0;
  let h;
  if (mx === r) h = ((g - b) / c) % 6;
  else if (mx === g) h = (b - r) / c + 2;
  else h = (r - g) / c + 4;
  h *= 60; return h < 0 ? h + 360 : h;
}
const chroma = (r, g, b) => Math.max(r, g, b) - Math.min(r, g, b);
const luma = (r, g, b) => 0.30 * r + 0.59 * g + 0.11 * b;
const dHue = (a, b) => { const d = Math.abs(a - b) % 360; return d > 180 ? 360 - d : d; };

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H } });
/* 213: stub the PRNG before the page's own top-level script runs, not after. */
await page.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await page.goto(pathToFileURL(SRC).href);
await page.waitForFunction(() => typeof window.__warp === 'function');

const rows = [];
for (const seed of SEEDS) {
  for (const [hname, t] of HOURS) {
    const r = await page.evaluate(([seed, t]) => {
      /* freeze the world: one city, one instant, both clocks stopped (163c, 195f) */
      playing = false;
      genWorld(seed); window.__warp(61); window.__setTime(t);
      time = 0; waveT = 0;
      if (typeof STARS !== 'undefined') STARS.length = 0;
      if (typeof flock !== 'undefined') flock = null;

      const cvs = document.querySelector('canvas');
      const ctx2 = cvs.getContext('2d');
      const grab = () => {
        render();
        return ctx2.getImageData(0, 0, cvs.width, cvs.height).data;
      };

      const A = grab();                                  /* the deck as shipped */

      const keep = { deck: BASE.deck.slice(), deckDk: BASE.deckDk.slice() };
      BASE.deck = [255, 0, 255]; BASE.deckDk = [255, 0, 255];
      CCACHE = {};
      const B = grab();                                  /* only the deck moved */
      BASE.deck = keep.deck; BASE.deckDk = keep.deckDk;
      CCACHE = {};

      /* the mask IS the deck, by construction */
      let n = 0, sr = 0, sg = 0, sb = 0;
      for (let i = 0; i < A.length; i += 4) {
        const d = Math.abs(A[i] - B[i]) + Math.abs(A[i + 1] - B[i + 1]) + Math.abs(A[i + 2] - B[i + 2]);
        if (d < 24) continue;                            /* ignore antialias crumbs */
        n++; sr += A[i]; sg += A[i + 1]; sb += A[i + 2];
      }
      return n ? { n, r: sr / n, g: sg / n, b: sb / n, lit: LITAMT } : { n: 0 };
    }, [seed, t]);

    if (!r.n) { rows.push({ seed, hname, n: 0 }); continue; }
    rows.push({
      seed, hname, n: r.n, lit: r.lit,
      hue: hue(r.r, r.g, r.b), chroma: chroma(r.r, r.g, r.b), luma: luma(r.r, r.g, r.b),
      rgb: [r.r, r.g, r.b].map(v => Math.round(v)),
    });
  }
}
await browser.close();

console.log(`\nDECK — rendered colour, isolated by loud-palette diff inside one page`);
console.log(`src: ${SRC}\n`);
console.log('seed   hour    deck px    rgb                hue     chroma   luma');
console.log('-'.repeat(70));
for (const r of rows) {
  if (!r.n) { console.log(`${String(r.seed).padEnd(6)} ${r.hname.padEnd(7)} NO DECK INK`); continue; }
  console.log(
    `${String(r.seed).padEnd(6)} ${r.hname.padEnd(7)} ${String(r.n).padStart(7)}    ` +
    `${JSON.stringify(r.rgb).padEnd(17)} ${r.hue.toFixed(1).padStart(6)}  ${r.chroma.toFixed(1).padStart(6)}  ${r.luma.toFixed(1).padStart(6)}`);
}

console.log(`\nTHE GATE (221): night hue's distance from the deck's OWN DAYLIGHT hue`);
console.log('seed    day hue   night hue    dHUE      chroma day->night     luma');
console.log('-'.repeat(70));
let worst = 0;
for (const seed of SEEDS) {
  const d = rows.find(r => r.seed === seed && r.hname === 'day');
  const n = rows.find(r => r.seed === seed && r.hname === 'night');
  if (!d?.n || !n?.n) continue;
  const dh = dHue(d.hue, n.hue);
  worst = Math.max(worst, dh);
  console.log(
    `${String(seed).padEnd(7)} ${d.hue.toFixed(1).padStart(7)}   ${n.hue.toFixed(1).padStart(8)}   ` +
    `${dh.toFixed(1).padStart(6)}     ${d.chroma.toFixed(1).padStart(5)} -> ${n.chroma.toFixed(1).padStart(5)}` +
    `      ${n.luma.toFixed(1).padStart(5)}`);
}
console.log(`\nworst dHUE = ${worst.toFixed(1)} deg`);
console.log(`  (214's audit: a warm surface landing far from its own daylight hue, with`);
console.log(`   chroma crushed, has been ROTATED. Controls: the DAY columns must be`);
console.log(`   IDENTICAL across builds — daylight is byte-identical code — and the`);
console.log(`   deck px count must not move: this is a COLOUR change, not a geometry one.)`);
