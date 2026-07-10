#!/usr/bin/env node
/* probe-vine — does the vineyard now keep the calendar? (iter 139, Nature × Deepen)
 *
 * Pristine, the VINEYARD draw painted GREEN trellis rows + PURPLE (lav) grape
 * clusters UNCONDITIONALLY — a vine frozen at perpetual harvest. Only its meadow
 * GROUND tint moved with the season (BASE.meadow), so probe-season showed a shift
 * that was entirely the floor, not the vine. The change gates draw on vinePhase():
 * bare brown canes + no grapes in winter, green canes in spring (bud), green
 * (sage) berries at the dry-peak summer (veraison), purple (lav) grapes at the
 * autumn harvest (ripe).
 *
 * A same-season, build-vs-build diff at the vineyard hex centres isolates the
 * VINE from the (unchanged) ground:
 *   - winter / spring  -> LARGE |ΔRGB|: grapes removed, canes browned+thinned
 *   - dry-peak         -> MODERATE:     grapes now sage-green, not purple
 *   - autumn (ripe)    -> SMALL:        both builds draw purple grapes + green vines
 *                        (the SEASON CONTROL: the one keyframe my change leaves alone)
 *   - ROAD, every season -> ~0:         the edit touches only case T.VINEYARD
 *
 * Clock frozen (iter 109 same-frame law) so only `year` moves a pixel; pristine
 * is `git show HEAD:` (not stash — that reverts the tracked census baseline too).
 *
 *   node probe-vine.mjs [seed ...]
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

const pristine = join(mkdtempSync(join(tmpdir(), 'vine-')), 'pristine.html');
writeFileSync(pristine, execFileSync('git', ['-C', REPO, 'show', 'HEAD:solvista.html']));

const SEASONS = [['winter', 0.02], ['spring', 0.30], ['dry-peak', 0.62], ['autumn', 0.87]];
const mean = a => a.reduce((s, v) => s + v, 0) / (a.length || 1);
const patched = join(REPO, 'solvista.html');

async function sampleAll(page, file, seed, kind) {
  await page.goto(pathToFileURL(file).href + `?seed=${seed}&warp=61&t=0.35`, { waitUntil: 'load' });
  await page.waitForFunction('window.__find');
  const byS = {};
  for (const [name, yf] of SEASONS) {
    byS[name] = await page.evaluate(({ yf, kind }) => {
      window.__setYear(2035 + yf); playing = false; render();
      const cv = document.querySelector('canvas');
      const g = cv.getContext('2d');
      const dpr = cv.width / cv.clientWidth;
      const out = [];
      for (const c of window.__find(kind)) {
        const px = Math.round(c.sx * dpr), py = Math.round(c.sy * dpr);
        if (px < 3 || py < 3 || px >= cv.width - 3 || py >= cv.height - 3) continue;
        const d = g.getImageData(px - 3, py - 3, 7, 7).data;   /* 7x7 over hex body: catches the 4 clusters + rows */
        let r = 0, gg = 0, b = 0;
        for (let k = 0; k < 49; k++) { r += d[k * 4]; gg += d[k * 4 + 1]; b += d[k * 4 + 2]; }
        out.push({ key: c.x + ',' + c.y, r: r / 49, g: gg / 49, b: b / 49 });
      }
      return out;
    }, { yf, kind });
  }
  return byS;
}

function diff(pre, post) {
  const pm = new Map(pre.map(c => [c.key, c]));
  const d = [];
  for (const c of post) {
    const p = pm.get(c.key); if (!p) continue;
    d.push((Math.abs(c.r - p.r) + Math.abs(c.g - p.g) + Math.abs(c.b - p.b)) / 3);
  }
  return { n: d.length, d: mean(d) };
}

const b = await chromium.launch();
const page = await b.newPage({ viewport: { width: 1600, height: 1000 } });
const acc = { VINEYARD: {}, ROAD: {} };
for (const kind of ['VINEYARD', 'ROAD']) for (const [s] of SEASONS) acc[kind][s] = [];

for (const seed of seeds) {
  for (const kind of ['VINEYARD', 'ROAD']) {
    const pre = await sampleAll(page, pristine, seed, kind);
    const post = await sampleAll(page, patched, seed, kind);
    for (const [s] of SEASONS) {
      const r = diff(pre[s], post[s]);
      if (r.n) acc[kind][s].push(r.d);
    }
  }
}
await b.close();

console.log('\nBUILD-vs-BUILD |ΔRGB| at tile centres (patched − pristine HEAD), frozen clock');
console.log('seeds ' + seeds.join('/') + ', warp 61, per season keyframe\n');
console.log('  tile        ' + SEASONS.map(([s]) => s.padStart(10)).join(''));
console.log('  ' + '-'.repeat(52));
for (const kind of ['VINEYARD', 'ROAD']) {
  const row = SEASONS.map(([s]) => mean(acc[kind][s]).toFixed(2).padStart(10)).join('');
  console.log('  ' + kind.padEnd(10) + row);
}
console.log('\n(ROAD is the control: ~0 every season — the edit is only case T.VINEYARD.)');
console.log('(autumn is the SEASON control: both builds draw purple grapes, so it stays small.)');
