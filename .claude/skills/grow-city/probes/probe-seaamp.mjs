/* 255 — HOW BIG IS THE CHANGE, IN THE UNITS AN EYE RECEIVES?
 *
 * probe-seastate counts a pixel as "moved" at max-channel delta > 6 — i.e. 2.7% of the
 * range, which is INVISIBLE. So "33,763 px answer the wind" is a COUNT, and a count
 * cannot tell a bold change from a subliminal one. Two blind agents read the fit-zoom
 * frames and reported no visible difference, against that count. Somebody is wrong, and
 * the way to find out is to report the AMPLITUDE (214/205: state the claim in the
 * viewer's units), not another count.
 *
 * Prints the distribution of per-pixel luminance shift over the pixels that changed,
 * plus — the number that actually decides it — the change as a fraction of the CONTRAST
 * the sea already carries (its own within-sea standard deviation). A regional signal
 * that lands well under the surface's existing grain is one nobody can see (254's law).
 *
 *   node probe-seaamp.mjs <before.png> <after.png>
 */
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { readFileSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;

const [a, b] = process.argv.slice(2).map(p => resolve(p));
const d64 = (p) => 'data:image/png;base64,' + readFileSync(p).toString('base64');
const br = await chromium.launch();
const page = await br.newPage();

const r = await page.evaluate(async ([ua, ub]) => {
  const load = (u) => new Promise(res => { const i = new Image(); i.onload = () => res(i); i.src = u; });
  const [ia, ib] = await Promise.all([load(ua), load(ub)]);
  const c = document.createElement('canvas'); c.width = ia.width; c.height = ia.height;
  const x = c.getContext('2d', { willReadFrequently: true });
  x.drawImage(ia, 0, 0); const A = x.getImageData(0, 0, c.width, c.height).data;
  x.clearRect(0, 0, c.width, c.height);
  x.drawImage(ib, 0, 0); const B = x.getImageData(0, 0, c.width, c.height).data;

  const lum = (D, i) => 0.30 * D[i] + 0.59 * D[i + 1] + 0.11 * D[i + 2];
  const deltas = [];
  let n = 0;
  /* the sea is teal: B > R and G > R. A cheap, honest sea test that needs no palette. */
  const isSea = (D, i) => D[i + 2] > D[i] + 20 && D[i + 1] > D[i] + 20;
  const seaL = [];
  for (let i = 0; i < A.length; i += 4) {
    if (isSea(A, i)) seaL.push(lum(A, i));
    const d = Math.abs(lum(A, i) - lum(B, i));
    if (d > 1) { deltas.push(d); n++; }
  }
  deltas.sort((p, q) => p - q);
  const q = (f) => deltas.length ? deltas[Math.floor(f * (deltas.length - 1))] : 0;
  const mean = deltas.reduce((s, v) => s + v, 0) / (deltas.length || 1);
  const sMean = seaL.reduce((s, v) => s + v, 0) / (seaL.length || 1);
  const sSD = Math.sqrt(seaL.reduce((s, v) => s + (v - sMean) ** 2, 0) / (seaL.length || 1));
  return { n, total: A.length / 4, mean, p50: q(0.5), p90: q(0.9), p99: q(0.99), max: q(1),
           seaPx: seaL.length, seaSD: sSD };
}, [d64(a), d64(b)]);
await br.close();

console.log(`\nchanged pixels (|dLuma| > 1): ${r.n.toLocaleString()} of ${r.total.toLocaleString()}`);
console.log(`\n  per-pixel LUMINANCE shift, over the pixels that changed (0-255):`);
console.log(`    mean ${r.mean.toFixed(1)}   p50 ${r.p50.toFixed(1)}   p90 ${r.p90.toFixed(1)}   p99 ${r.p99.toFixed(1)}   max ${r.max.toFixed(1)}`);
console.log(`\n  the sea's OWN existing grain (within-sea luminance SD): ${r.seaSD.toFixed(1)}   [${r.seaPx.toLocaleString()} sea px]`);
console.log(`  ⇒ the change, in units of the grain it must be seen against:`);
console.log(`       mean  d = ${(r.mean / r.seaSD).toFixed(2)}      p90  d = ${(r.p90 / r.seaSD).toFixed(2)}\n`);
