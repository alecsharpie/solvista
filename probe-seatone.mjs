#!/usr/bin/env node
/* probe-seatone — does the sea's DRAWN tone follow its depth field, and did the
 * mean hold? (iter 116, cue (k))
 *
 * The general instrument for any "I re-toned a large surface" claim. Three
 * questions the census, the screenshots and a visual agent all cannot answer:
 *
 *   1. HOLD-THE-MEAN (iter 98): did mean water luminance move? A third of the
 *      canvas is sea; darkening its mean is how kelp darkened the coast.
 *   2. VARIANCE: did the spread actually grow? That is the whole point of a
 *      depth gradient — variance, not mean.
 *   3. DOES THE TONE FOLLOW THE FIELD (iter 110): Pearson corr(sampled
 *      luminance, rDeep) read from the LIVE hook, not a reimplementation.
 *
 * Samples the real canvas at each wet hex centre (3x3 disc), exactly as
 * probe-farmtone/probe-quadtone do. Pristine control is `git show HEAD:` — NOT
 * `git stash`, which reverts the tracked census baseline too (iter 108).
 *
 *   node probe-seatone.mjs [seed ...]
 */
import { homedir, tmpdir } from 'node:os';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const REPO = resolve(dirname(fileURLToPath(import.meta.url)));
const SEEDS = process.argv.slice(2).filter(a => !a.startsWith('-')).map(Number);
const seeds = SEEDS.length ? SEEDS : [7, 42, 1234];

/* pristine HEAD, written beside the real page so relative context matches */
const tmp = mkdtempSync(join(tmpdir(), 'seatone-'));
const pristine = join(tmp, 'pristine.html');
writeFileSync(pristine, execFileSync('git', ['-C', REPO, 'show', 'HEAD:solvista.html']));

const lum = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
const mean = a => a.reduce((s, v) => s + v, 0) / (a.length || 1);
const sd = a => { const m = mean(a); return Math.sqrt(mean(a.map(v => (v - m) ** 2))); };
const corr = (a, b) => {
  const ma = mean(a), mb = mean(b);
  const num = a.reduce((s, v, i) => s + (v - ma) * (b[i] - mb), 0);
  const den = Math.sqrt(a.reduce((s, v) => s + (v - ma) ** 2, 0) * b.reduce((s, v) => s + (v - mb) ** 2, 0));
  return den ? num / den : 0;
};

/* neutral tide (0.59: below the flood-sheen cut, ebb=0 — nothing tidal moves),
 * high summer, midday. Freeze the sim so the sampled frame is the frame. */
const q = s => `?seed=${s}&warp=61&t=0.35&tide=0.59&year=2035.62`;

/* Sample every open-sea hex centre. `__find('WATER')` exists on BOTH sides (the
 * pristine control predates __deep), so coords come from there and the depth
 * field is joined in from the patched page by cell key. */
async function sample(page, url) {
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForFunction('window.__find && window.__census');
  await page.evaluate(() => { playing = false; render(); });
  return page.evaluate(() => {
    const cv = document.querySelector('canvas');
    const g = cv.getContext('2d');
    const dpr = cv.width / cv.clientWidth;
    const deep = window.__deep ? window.__deep() : [];
    const dmap = new Map(deep.map(c => [c.x + ',' + c.y, c]));
    const out = [];
    for (const c of window.__find('WATER')) {
      const px = Math.round(c.sx * dpr), py = Math.round(c.sy * dpr);
      if (px < 1 || py < 1 || px >= cv.width - 1 || py >= cv.height - 1) continue;
      const d = g.getImageData(px - 1, py - 1, 3, 3).data;
      let r = 0, gg = 0, b = 0;
      for (let k = 0; k < 9; k++) { r += d[k * 4]; gg += d[k * 4 + 1]; b += d[k * 4 + 2]; }
      const hit = dmap.get(c.x + ',' + c.y);
      out.push({ key: c.x + ',' + c.y, d: hit ? hit.d : -1, riv: hit ? hit.riv : null, r: r / 9, g: gg / 9, b: b / 9 });
    }
    return out;
  });
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

console.log('seed   n     mean lum        sd (spread)     corr(lum,depth)   depth range');
console.log('─'.repeat(78));
const agg = { pre: [], post: [] };

for (const s of seeds) {
  const preAll = await sample(page, pathToFileURL(pristine).href + q(s));
  const postAll = await sample(page, pathToFileURL(join(REPO, 'solvista.html')).href + q(s));

  /* open sea only: the river is WATER too, and it is shallow by construction */
  const keep = new Set(postAll.filter(c => !c.riv && c.d > 0).map(c => c.key));
  const post = postAll.filter(c => keep.has(c.key));
  const pre = preAll.filter(c => keep.has(c.key));

  const lp = pre.map(c => lum(c.r, c.g, c.b)), lq = post.map(c => lum(c.r, c.g, c.b));
  const dq = post.map(c => c.d);
  agg.pre.push(...lp); agg.post.push(...lq);

  console.log(
    `${String(s).padEnd(6)} ${String(post.length).padEnd(5)} ` +
    `${mean(lp).toFixed(1)} → ${mean(lq).toFixed(1)}   `.padEnd(16) +
    `${sd(lp).toFixed(2)} → ${sd(lq).toFixed(2)}   `.padEnd(16) +
    `${corr(lq, dq).toFixed(3)}`.padEnd(18) +
    `${Math.min(...dq)}..${Math.max(...dq)}`
  );
}

console.log('─'.repeat(78));
const dm = mean(agg.post) - mean(agg.pre);
console.log(`ALL    mean lum ${mean(agg.pre).toFixed(2)} → ${mean(agg.post).toFixed(2)}  (Δ ${dm >= 0 ? '+' : ''}${dm.toFixed(2)}, ${(100 * dm / mean(agg.pre)).toFixed(2)}%)`);
console.log(`       spread   ${sd(agg.pre).toFixed(2)} → ${sd(agg.post).toFixed(2)}  (×${(sd(agg.post) / sd(agg.pre)).toFixed(2)})`);
console.log(`\nHOLD-THE-MEAN: ${Math.abs(dm) <= 2 ? 'PASS' : 'FAIL'} (|Δlum| ${Math.abs(dm).toFixed(2)} vs tol 2.0)`);

await browser.close();
