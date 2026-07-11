#!/usr/bin/env node
/* probe-starmoon — do the night stars respond to the MOON's phase?
 * (iter 153, Sky & atmosphere × Deepen)
 *
 * The star field (render, ~L5491) fades only with LITAMT — it completely ignores
 * `MOONF`, the moon's lit fraction that the disc, moonglade and moon HUD already
 * read. Astronomically a bright full moon washes out all but the brightest stars
 * while a new moon reveals a rich field. This vector multiplies each star's alpha
 * by a moon-wash factor (and a per-star magnitude), so the field thins under a full
 * moon and swells at new moon. Draw-only, stream-neutral — the census is vacuous,
 * so this probe is the gate.
 *
 * Method — a moon-phase SWEEP at a FIXED time of day. daylight() reads dayT mod 1,
 * so the sky/LITAMT depend only on the fractional part; moonPhase reads raw dayT/8.
 * So sweeping dayT = k + 0.90 (k=0..11, deep night) holds the sky, LITAMT and the
 * frozen twinkle phase IDENTICAL across every sample and varies ONLY the moon.
 * Measure the mean luminance of a sky patch CLEAR of the moon disc + moonglade, vs
 * MOONF, and report corr(starLum, MOONF):
 *   HEAD   → ~0  (stars ignore the moon — the defect)
 *   patched → strongly NEGATIVE (bright moon washes the field out)
 * Control: a city-core ground patch (lit by LITAMT, not the moon) — corr ≈ 0 in
 * both builds, proving the change is confined to the sky.
 *
 *   node probe-starmoon.mjs [seed ...]
 */
import { homedir, tmpdir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync, mkdtempSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const CAND = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html'), resolve(HERE, 'solvista.html')];
const ART = CAND.find(existsSync);
const REPO = dirname(ART);
const A = process.argv.slice(2).filter(a => !a.startsWith('-')).map(Number);
const seeds = A.length ? A : [7, 42];

const tmp = mkdtempSync(join(tmpdir(), 'starmoon-'));
const HEAD = join(tmp, 'head.html');
writeFileSync(HEAD, execFileSync('git', ['-C', REPO, 'show', 'HEAD:solvista.html']));

function corr(xs, ys) {
  const n = xs.length, mx = xs.reduce((a, b) => a + b, 0) / n, my = ys.reduce((a, b) => a + b, 0) / n;
  let sxy = 0, sxx = 0, syy = 0;
  for (let i = 0; i < n; i++) { const dx = xs[i] - mx, dy = ys[i] - my; sxy += dx * dy; sxx += dx * dx; syy += dy * dy; }
  return sxy / (Math.sqrt(sxx * syy) || 1e-9);
}
/* mean luminance over a screen-space box, in device pixels */
async function lum(page, x0, y0, x1, y1) {
  return page.evaluate(([x0, y0, x1, y1]) => {
    const cv = document.querySelector('canvas'), g = cv.getContext('2d');
    const dpr = cv.width / cv.clientWidth;
    const px = Math.round(x0 * innerWidth * dpr), py = Math.round(y0 * innerHeight * dpr);
    const w = Math.round((x1 - x0) * innerWidth * dpr), h = Math.round((y1 - y0) * innerHeight * dpr);
    const d = g.getImageData(px, py, w, h).data;
    let s = 0; for (let i = 0; i < d.length; i += 4) s += (d[i] + d[i + 1] + d[i + 2]) / 3;
    return s / (d.length / 4);
  }, [x0, y0, x1, y1]);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

async function sweep(file, s) {
  await page.goto(pathToFileURL(file).href + `?seed=${s}&warp=61&t=0.90`, { waitUntil: 'load' });
  await page.waitForFunction('window.__moon');
  const moon = [], star = [], ground = [];
  for (let k = 0; k < 12; k++) {
    await page.evaluate((k) => { playing = false; time = 5.0; window.__setTime(k + 0.90); render(); }, k);
    moon.push(await page.evaluate(() => window.__moon().illum));
    /* sky patch clear of the moon (x~0.80) and the sea moonglade (lower/coast) */
    star.push(await lum(page, 0.08, 0.04, 0.52, 0.30));
    /* city-core ground: lit by LITAMT, not the moon */
    ground.push(await lum(page, 0.36, 0.74, 0.64, 0.92));
  }
  return { moon, star, ground };
}

console.log('build   seed | corr(starLum,MOONF)  starLum[newMoon→fullMoon]   | corr(ground,MOONF)');
console.log('─'.repeat(88));
const R = { HEAD: { sc: [], gc: [] }, patched: { sc: [], gc: [] } };
for (const [name, file] of [['HEAD   ', HEAD], ['patched', ART]]) {
  for (const s of seeds) {
    const d = await sweep(file, s);
    const sc = corr(d.star, d.moon), gc = corr(d.ground, d.moon);
    R[name.trim()].sc.push(sc); R[name.trim()].gc.push(gc);
    /* report starLum at the min-MOONF and max-MOONF samples */
    let lo = 0, hi = 0; d.moon.forEach((m, i) => { if (m < d.moon[lo]) lo = i; if (m > d.moon[hi]) hi = i; });
    console.log(`${name} ${String(s).padEnd(4)} | ${sc.toFixed(3).padStart(7)}             ${d.star[lo].toFixed(2).padStart(6)} → ${d.star[hi].toFixed(2).padStart(6)}         |  ${gc.toFixed(3).padStart(7)}`);
  }
}
await browser.close();
const mean = a => a.reduce((x, y) => x + y, 0) / (a.length || 1);
console.log('─'.repeat(88));
const hSC = mean(R.HEAD.sc), pSC = mean(R.patched.sc), pGC = mean(R.patched.gc);
console.log(`HEAD corr(star,moon) ${hSC.toFixed(3)} (≈0: stars ignore the moon) · patched ${pSC.toFixed(3)} (moon washes them out)`);
console.log(`patched ground control corr ${pGC.toFixed(3)} (≈0: change confined to the sky)`);
console.log(`VERDICT: ${pSC < -0.6 && Math.abs(hSC) < 0.3 && Math.abs(pGC) < 0.3 ? 'PASS' : 'FAIL'}  (patched star corr<-0.6, HEAD |corr|<0.3, ground |corr|<0.3)`);
