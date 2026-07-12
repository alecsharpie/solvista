#!/usr/bin/env node
/* probe-sandinert.mjs — iter 214's isolation gate.
 *
 * Two claims to settle, both by whole-frame patch-vs-HEAD diff (161: two builds run
 * identical code except the edit, so EVERY pixel that differs IS the edit):
 *
 *   DAY   must be ZERO. The sheen is gated below LITAMT 0.35, so daylight runs
 *         byte-identical code. A provably dead regime is a free noise floor (199) —
 *         but only if it really is dead, so prove it rather than assert it.
 *   NIGHT must be LARGE, and it must sit ON THE BEACH.
 *
 * The floor is measured IN THE SAME RUN by loading HEAD twice and carrying
 * HEAD-vs-HEAD as a column beside patch-vs-HEAD (213): a floor pinned from an
 * earlier run drifts with machine load and is the stale-baseline sin.
 *
 * Math.random is stubbed in addInitScript — BEFORE the page's own top-level script
 * (213), because a page.evaluate stub lands too late for everything the artifact
 * seeds at load (STARS, flock, and the whole Math.random-spawned entity class:
 * joggers, whales, kayaks, herons, deer, dolphins, balloons). Without it the floor
 * is 8k-18k px and every column is plausible and wrong.
 *
 *   node probe-sandinert.mjs
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { writeFileSync, unlinkSync } from 'node:fs';
import { execSync } from 'node:child_process';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PATCH = join(HERE, '../../../../solvista.html');
const HEADF = join(HERE, '__inert_head.html');
writeFileSync(HEADF, execSync('git show HEAD:solvista.html', { cwd: join(HERE, '../../../..'), maxBuffer: 1 << 28 }));

const SEEDS = [7, 42];
const W = 1600, H = 1000;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H } });
await page.addInitScript(() => {                 /* 213: before the page's own script */
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});

/* one frozen render per (build, seed, light), returned as raw pixels + the beach mask */
async function grab(src, seed, t) {
  await page.goto(pathToFileURL(src).href);
  await page.waitForFunction(() => window.__census !== undefined);
  return page.evaluate(({ seed, t }) => {
    playing = false;
    genWorld(seed); window.__warp(61);
    STARS.length = 0; flock = null;
    waveT = 0; time = 0; dayT = t;
    window.__setTide(0.35);
    for (const a of [boats, peds, dogs, birds]) if (Array.isArray(a)) a.length = 0;
    render();
    const cvs = document.querySelector('canvas');
    const d = cvs.getContext('2d').getImageData(0, 0, cvs.width, cvs.height).data;

    /* which device pixels belong to a BEACH hex? so the diff can be attributed. */
    const D = dpr, mask = new Uint8Array(cvs.width * cvs.height);
    for (const i of HEXI) {
      const c = cells[i]; if (!c || c.t !== T.BEACH) continue;
      const x = i % G, y = (i / G) | 0;
      const [wx, wy] = ctr(x, y);
      const sx = (wx * scale + offX) * D, sy = (wy * scale + offY) * D;
      const rx = HW * scale * D, ry = VR * scale * D;
      for (let py = Math.max(0, (sy - ry) | 0); py <= Math.min(cvs.height - 1, sy + ry); py++)
        for (let px2 = Math.max(0, (sx - rx) | 0); px2 <= Math.min(cvs.width - 1, sx + rx); px2++)
          mask[py * cvs.width + px2] = 1;
    }
    return { px: Array.from(d), mask: Array.from(mask), w: cvs.width, h: cvs.height };
  }, { seed, t });
}

const diff = (a, b, mask) => {
  let all = 0, onBeach = 0;
  for (let i = 0, p = 0; i < a.length; i += 4, p++) {
    if (Math.abs(a[i] - b[i]) > 8 || Math.abs(a[i + 1] - b[i + 1]) > 8 || Math.abs(a[i + 2] - b[i + 2]) > 8) {
      all++; if (mask[p]) onBeach++;
    }
  }
  return { all, onBeach };
};

console.log('changed pixels vs pristine HEAD (1600x1000).  FLOOR = HEAD loaded twice, same run.\n');
console.log('seed  light |     FLOOR |  PATCH-vs-HEAD   (of which ON BEACH)');
for (const seed of SEEDS) {
  for (const [name, t] of [['day  ', 0.30], ['night', 0.92]]) {
    const h1 = await grab(HEADF, seed, t);
    const h2 = await grab(HEADF, seed, t);
    const pt = await grab(PATCH, seed, t);
    const floor = diff(h1.px, h2.px, h1.mask);
    const d = diff(pt.px, h1.px, h1.mask);
    const pct = d.all ? (100 * d.onBeach / d.all).toFixed(0) : '--';
    console.log(`${String(seed).padStart(4)}  ${name} | ${String(floor.all).padStart(9)} | ` +
      `${String(d.all).padStart(14)}   ${String(d.onBeach).padStart(6)} px = ${String(pct).padStart(3)}%`);
  }
}
await browser.close();
unlinkSync(HEADF);
