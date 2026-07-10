#!/usr/bin/env node
/* probe-tilering — does a hovered TILE now wear a focus ring, on the RIGHT hex,
 * and ONLY there? (iter 133, Urban fabric × Interaction/UX — cue l)
 *
 * Entities have worn a stamp() focus ring since iter 71, but a bare hovered tile
 * got none, so every tile tooltip named a hex the frame never marked. The fix
 * draws a hex-outline ring at ctr(hoverTile) when hoverTile is set and no entity
 * is under the cursor. Four questions the census (vacuous, draw-only) can't answer:
 *
 *   1. THE REAL WIRING FIRES: a genuine page.mouse.move onto a tile's screen
 *      coords must set the ring — not just the __hover() test hook. So we drive
 *      the actual mousemove handler, exactly as a user does.
 *   2. THE RING LANDS ON THE HOVERED HEX: the TARGET hex box changes between
 *      hover-off and hover-on (the ring is drawn) — mean |ΔRGB| clearly non-zero.
 *   3. IT IS LOCAL: a CONTROL tile far away does NOT change — the ring is one hex.
 *   4. IT CLEARS: moving the cursor to bare sky/void erases the ring — the target
 *      box returns to its hover-off state (no sticky ring).
 *
 * Freezes the sim first (same-frame-control law, iter 109): the ring pulses on
 * `time` and the sea sparkles on waveT, so a live diff would measure motion, not
 * the ring. Everything here is one build (patched) compared against ITSELF in two
 * hover states — no pristine build needed; the ring is a new state, not a re-tone.
 *
 *   node probe-tilering.mjs [seed ...]
 */
import { homedir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
/* the artifact lives four levels up from probes/ once promoted; from the repo
 * root (where an ad-hoc probe is born) it is right here — resolve relative to
 * THIS file either way, never cwd. */
const HERE = dirname(fileURLToPath(import.meta.url));
const CAND = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html')];
import { existsSync } from 'node:fs';
const ART = CAND.find(existsSync);
const SEEDS = process.argv.slice(2).filter(a => !a.startsWith('-')).map(Number);
const seeds = SEEDS.length ? SEEDS : [7, 42];

const q = s => `?seed=${s}&warp=61&t=0.35&tide=0.59&year=2035.62`;

/* mean |ΔRGB| over two equal-length flat pixel arrays (RGBA) */
function diff(a, b) {
  let s = 0, n = a.length / 4;
  for (let k = 0; k < n; k++) {
    s += (Math.abs(a[k * 4] - b[k * 4]) + Math.abs(a[k * 4 + 1] - b[k * 4 + 1]) + Math.abs(a[k * 4 + 2] - b[k * 4 + 2])) / 3;
  }
  return s / n;
}

/* grab the device-pixel box that covers one hex (+ its ring band) at the current
 * camera scale, centred on a tile's CSS screen coords */
async function box(page, sx, sy) {
  return page.evaluate(([sx, sy]) => {
    const cv = document.querySelector('canvas');
    const g = cv.getContext('2d');
    const dpr = cv.width / cv.clientWidth;
    const hw = Math.round(HW * scale * 1.35 * dpr);   /* a touch beyond the 1.06 ring */
    const px = Math.round(sx * dpr), py = Math.round(sy * dpr);
    const x0 = Math.max(0, px - hw), y0 = Math.max(0, py - hw);
    const w = Math.min(cv.width - x0, hw * 2), h = Math.min(cv.height - y0, hw * 2);
    return Array.from(g.getImageData(x0, y0, w, h).data);
  }, [sx, sy]);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

console.log('seed | target hex  |ΔRGB| off→on   | control hex |ΔRGB|   | cleared? |Δ(off vs void)|');
console.log('─'.repeat(88));
const agg = { tgt: [], ctrl: [], clr: [] };

for (const s of seeds) {
  await page.goto(pathToFileURL(ART).href + q(s), { waitUntil: 'load' });
  await page.waitForFunction('window.__find');
  await page.evaluate(() => { playing = false; render(); });

  /* target: an inland PARK (a clear green hex); control: an open-water hex far
   * from it, never under the cursor. Both by grid pick, then screen coords. */
  const [tgt, ctrl] = await page.evaluate(() => {
    const parks = window.__find('PARK'), water = window.__find('WATER');
    const t = parks[(parks.length / 2) | 0] || window.__find('ROAD')[0];
    let best = null, bd = -1;
    for (const w of water) { const d = (w.sx - t.sx) ** 2 + (w.sy - t.sy) ** 2; if (d > bd) { bd = d; best = w; } }
    return [t, best];
  });

  /* hover-OFF baseline: cursor parked in the top-left sky/void corner */
  await page.mouse.move(4, 4);
  await page.evaluate(() => render());
  const tOff = await box(page, tgt.sx, tgt.sy);
  const cOff = await box(page, ctrl.sx, ctrl.sy);

  /* hover-ON: a REAL mousemove onto the target tile (drives the true handler) */
  await page.mouse.move(tgt.sx, tgt.sy);
  await page.evaluate(() => render());
  const tOn = await box(page, tgt.sx, tgt.sy);
  const cOn = await box(page, ctrl.sx, ctrl.sy);

  /* clear: move back to the void, ring must vanish (target returns to OFF) */
  await page.mouse.move(4, 4);
  await page.evaluate(() => render());
  const tClr = await box(page, tgt.sx, tgt.sy);

  const dT = diff(tOff, tOn), dC = diff(cOff, cOn), dClr = diff(tOff, tClr);
  agg.tgt.push(dT); agg.ctrl.push(dC); agg.clr.push(dClr);
  console.log(
    `${String(s).padEnd(4)} | (${tgt.x},${tgt.y}) `.padEnd(20) +
    `${dT.toFixed(2).padStart(6)}        | (${ctrl.x},${ctrl.y}) `.padEnd(22) +
    `${dC.toFixed(3).padStart(6)}  |          ${dClr.toFixed(3).padStart(6)}`
  );
}

await browser.close();
const mean = a => a.reduce((s, v) => s + v, 0) / a.length;
const T = mean(agg.tgt), C = mean(agg.ctrl), CLR = mean(agg.clr);
console.log('─'.repeat(88));
console.log(`target ring: mean |ΔRGB| ${T.toFixed(2)}  ·  control: ${C.toFixed(3)}  ·  cleared residual: ${CLR.toFixed(3)}`);
console.log(`VERDICT: ${T > 3 && C < 0.5 && CLR < 0.5 ? 'PASS' : 'FAIL'}  (ring drawn >3 on the hovered hex, control <0.5, clears <0.5)`);
