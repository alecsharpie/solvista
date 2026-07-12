/* Where do the two builds actually DIFFER at deep night?
 * The peds are index-matched between builds (same Math.random stub -> same spawn), so
 * ped i is the same person in both. The change is: some of them have gone home. Find
 * THOSE, and their drawn screen positions, so the camera can be aimed at them rather
 * than at a rectangle I guessed (iter 201/204). */
import { homedir } from 'node:os';
import { writeFileSync, unlinkSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '../../../..');
const ART = join(ROOT, 'solvista.html');
const BASE = join(ROOT, '.find-base.html');
writeFileSync(BASE, execSync('git show HEAD:solvista.html', { cwd: ROOT, maxBuffer: 1 << 28 }));

const browser = await chromium.launch();
const TILEN = {};

async function vis(file, seed) {
  const page = await browser.newPage({ viewport: { width: 1500, height: 950 } });
  await page.goto(pathToFileURL(file).href);
  await page.waitForTimeout(300);
  const r = await page.evaluate(({ seed }) => {
    playing = false;
    let s = 0x2F6E2B1 >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    genWorld(seed); __warp(61); __setTime(0.95); render();
    const NAME = Object.fromEntries(Object.entries(T).map(([k, v]) => [v, k]));
    return peds.map(p => ({
      hid: pedHidden(p), x: p.x, y: p.y, sx: p._sx, sy: p._sy,
      tile: NAME[cellAt(p.x, p.y)?.t] || '?',
    }));
  }, { seed });
  await page.close();
  return r;
}

for (const seed of [42, 7]) {
  const H = await vis(BASE, seed), P = await vis(ART, seed);
  /* who went home under the new rule, and who is newly out */
  const wentHome = [], stayedOut = [];
  for (let i = 0; i < H.length; i++) {
    if (!H[i].hid && P[i].hid) wentHome.push(H[i]);
    if (H[i].hid && !P[i].hid) stayedOut.push(P[i]);
  }
  const byTile = a => { const m = {}; for (const p of a) m[p.tile] = (m[p.tile] || 0) + 1; return m; };
  console.log(`\n=== seed ${seed} @ deep night ===`);
  console.log(`  HEAD visible ${H.filter(p => !p.hid).length}  PATCH visible ${P.filter(p => !p.hid).length}`);
  console.log(`  GONE HOME under the new rule (${wentHome.length}):`, byTile(wentHome));
  console.log(`  NEWLY OUT   under the new rule (${stayedOut.length}):`, byTile(stayedOut));
  /* the densest cluster of "gone home" in WORLD hex coords -> aim the camera there */
  let best = null, bn = 0;
  for (const c of wentHome) {
    const n = wentHome.filter(o => Math.hypot(o.x - c.x, o.y - c.y) < 6).length;
    if (n > bn) { bn = n; best = c; }
  }
  if (best) console.log(`  densest emptying cluster: ${bn} residents around hex (${best.x},${best.y}) [${best.tile}]`);
}
await browser.close();
unlinkSync(BASE);
