#!/usr/bin/env node
/* probe-kelp — did the kelp canopy Polish actually re-tone the kelp hexes, and
 * ONLY the kelp hexes? (iter 132, Water × Polish)
 *
 * The old kelp draw was a flat `waterDk` hex + four sub-pixel fronds, so a bed
 * read as a dark absence. The change floats olive frond-mats (colMix waterDk→canopy)
 * clipped to the hex. Three questions the census/screenshots can't answer:
 *
 *   1. DID KELP MOVE: mean per-hex |ΔRGB| on KELP hexes, patched vs pristine HEAD,
 *      at the SAME frozen frame — must be clearly non-zero (the mats are drawn).
 *   2. THE CONTROL HOLDS: mean |ΔRGB| on open-WATER (non-kelp) hexes must be ~0 —
 *      the edit touches only `case T.KELP`, so the rest of the sea cannot move.
 *   3. GREENER, NOT BRIGHTER: the mats raise olive (g−b) but must NOT lift the
 *      bed's luminance — kelp is meant to stay the darkest thing inshore (the
 *      hold-the-mean law: brightening the sea is how kelp darkened the coast).
 *
 * Freezes the sim before sampling (same-frame-control law, iter 109): the fronds
 * AND the new mats drift on waveT, so a live diff would measure the drift, not
 * the edit. Pristine control is `git show HEAD:` — not `git stash`, which reverts
 * the tracked census baseline too (iter 108).
 *
 *   node probe-kelp.mjs [seed ...]
 */
import { homedir, tmpdir } from 'node:os';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
/* the artifact lives four levels up from probes/ — resolve it relative to THIS
 * file, never cwd, so the probe measures the real page from any working dir. */
const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..');
const SEEDS = process.argv.slice(2).filter(a => !a.startsWith('-')).map(Number);
const seeds = SEEDS.length ? SEEDS : [7, 42, 1234];

const pristine = join(mkdtempSync(join(tmpdir(), 'kelp-')), 'pristine.html');
writeFileSync(pristine, execFileSync('git', ['-C', REPO, 'show', 'HEAD:solvista.html']));

const lum = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
const mean = a => a.reduce((s, v) => s + v, 0) / (a.length || 1);

/* neutral tide, high summer, midday, frozen — the mats/fronds drift on waveT, so
 * both builds must sample the identical still frame. */
const q = s => `?seed=${s}&warp=61&t=0.35&tide=0.59&year=2035.62`;

async function sample(page, url, kind) {
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForFunction('window.__find');
  await page.evaluate(() => { playing = false; render(); });
  return page.evaluate((kind) => {
    const cv = document.querySelector('canvas');
    const g = cv.getContext('2d');
    const dpr = cv.width / cv.clientWidth;
    const out = [];
    for (const c of window.__find(kind)) {
      const px = Math.round(c.sx * dpr), py = Math.round(c.sy * dpr);
      if (px < 2 || py < 2 || px >= cv.width - 2 || py >= cv.height - 2) continue;
      const d = g.getImageData(px - 2, py - 2, 5, 5).data;   /* 5x5 disc over the hex body */
      let r = 0, gg = 0, b = 0;
      for (let k = 0; k < 25; k++) { r += d[k * 4]; gg += d[k * 4 + 1]; b += d[k * 4 + 2]; }
      out.push({ key: c.x + ',' + c.y, r: r / 25, g: gg / 25, b: b / 25 });
    }
    return out;
  }, kind);
}

/* mean per-hex |ΔRGB| between two keyed samples, over the shared keys */
function joinStats(pre, post) {
  const pm = new Map(pre.map(c => [c.key, c]));
  const drgb = [], goliveP = [], goliveQ = [], lumP = [], lumQ = [];
  for (const c of post) {
    const p = pm.get(c.key); if (!p) continue;
    drgb.push((Math.abs(c.r - p.r) + Math.abs(c.g - p.g) + Math.abs(c.b - p.b)) / 3);
    goliveP.push(p.g - p.b); goliveQ.push(c.g - c.b);
    lumP.push(lum(p.r, p.g, p.b)); lumQ.push(lum(c.r, c.g, c.b));
  }
  return { n: drgb.length, drgb: mean(drgb),
           oliveP: mean(goliveP), oliveQ: mean(goliveQ),
           lumP: mean(lumP), lumQ: mean(lumQ) };
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

console.log('seed   KELP n  |ΔRGB|kelp   olive g-b (pre→post)   lum (pre→post)   | WATER n  |ΔRGB|ctrl');
console.log('─'.repeat(92));
const agg = { kelpD: [], ctrlD: [] };

for (const s of seeds) {
  const kPre = await sample(page, pathToFileURL(pristine).href + q(s), 'KELP');
  const kPost = await sample(page, pathToFileURL(join(REPO, 'solvista.html')).href + q(s), 'KELP');
  const wPre = await sample(page, pathToFileURL(pristine).href + q(s), 'WATER');
  const wPost = await sample(page, pathToFileURL(join(REPO, 'solvista.html')).href + q(s), 'WATER');

  const k = joinStats(kPre, kPost), w = joinStats(wPre, wPost);
  agg.kelpD.push(k.drgb); agg.ctrlD.push(w.drgb);

  console.log(
    `${String(s).padEnd(6)} ${String(k.n).padEnd(6)} ${k.drgb.toFixed(2).padStart(7)}      ` +
    `${k.oliveP.toFixed(1)} → ${k.oliveQ.toFixed(1)}`.padEnd(18) +
    `  ${k.lumP.toFixed(1)} → ${k.lumQ.toFixed(1)}`.padEnd(16) +
    `| ${String(w.n).padEnd(6)} ${w.drgb.toFixed(3).padStart(7)}`
  );
}

console.log('─'.repeat(92));
const kelpMoved = mean(agg.kelpD), ctrlMoved = mean(agg.ctrlD); /* WATER only */
console.log(`KELP moved: mean |ΔRGB| ${kelpMoved.toFixed(2)}   ·   WATER control: mean |ΔRGB| ${ctrlMoved.toFixed(3)}`);
console.log(`VERDICT: ${kelpMoved > 3 && ctrlMoved < 0.5 ? 'PASS' : 'FAIL'}  (kelp re-toned > 3, control held < 0.5)`);

await browser.close();
