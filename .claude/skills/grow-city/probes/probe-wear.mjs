/* probe-wear — the gate for iter 324 (People's first non-excitable CA: desire paths).
 *
 * Pure world data: drives the artifact's OWN tick() and reads cells[].wear -- no pixels,
 * NO NOISE FLOOR AT ALL, nothing to stub. BUILD-AGNOSTIC via SRC=: c.wear is undefined on
 * HEAD (reads 0), so ONE file grades HEAD and the patch with no source swap, no cross-build
 * floor (230).
 *
 * HEADLINE -- NEEDS NO THRESHOLD (236). The vector is "the busy public green wears to bare
 * earth". HEAD's wear is a CONSTANT 0, everywhere, always -- a baseline nobody designed.
 *
 * SPATIAL (the whole claim -- it must NOT brown the parks uniformly): wear is a function of
 *   c.buzz (the ATTRACT field). Report mean wear for LIVELY WEARLAND hexes (buzz>=KERBBUZZ=2,
 *   the shopfront/plaza edge) vs QUIET ones (buzz<2, the park interior). Lively >> quiet, and
 *   the quiet interior must stay ~green (near 0), or the feature is a wash, not a desire path.
 *
 * BOUNDED (250, the must-not-move column of a "don't darken everything" vector): what fraction
 *   of all WEARLAND hexes ever crosses WEARSHOW? It must be a MINORITY -- most public green is
 *   quiet and stays clean.
 *
 * CONTAINED (250, LEAK): every NON-WEARLAND hex must read wear 0 -- the pass zeroes it.
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = join(HERE, '../../../../solvista.html');
const SRC = process.env.SRC || ART;
const TAG = process.env.TAG || (process.env.SRC ? 'HEAD' : 'PATCH');
const SEEDS = [42, 7, 1234, 99, 2024, 555];

const b = await chromium.launch();
const p = await b.newPage();
await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await p.goto(pathToFileURL(SRC).href);
await p.waitForTimeout(400);

console.log('### ' + TAG + '  (' + SRC.split('/').pop() + ')\n');
console.log('seed | worn-hexes  cover% | LIVELY(buzz>=2)  QUIET(<2) | maxWear | LEAK(non-green)');
const agg = { worn: [], cover: [], lively: [], quiet: [], leak: [] };

for (const seed of SEEDS) {
  const r = await p.evaluate((seed) => {
    playing = false;
    genWorld(seed);
    for (let n = 0; n < 800 && year < 2035; n++) { year += 0.075; tick(); }
    // let the slow desire-path field settle at the mature city
    for (let k = 0; k < 60; k++) tick();
    const WL = (typeof WEARLAND !== 'undefined') ? WEARLAND : new Set();
    const SHOW = (typeof WEARSHOW !== 'undefined') ? WEARSHOW : 0.12;
    const wearOf = c => (c.wear || 0);

    let wearland = 0, worn = 0, leak = 0, maxW = 0;
    const lively = [0, 0], quiet = [0, 0];
    for (const i of HEXI) {
      const c = cells[i], w = wearOf(c);
      if (WL.has(c.t)) {
        wearland++;
        if (w > SHOW) worn++;
        if (w > maxW) maxW = w;
        if ((c.buzz || 0) >= 2) { lively[0] += w; lively[1]++; }
        else { quiet[0] += w; quiet[1]++; }
      } else if (w > 0.004) { leak++; }        // any non-green hex holding wear is a bug
    }
    const m = a => a[1] ? a[0] / a[1] : 0;
    return { wearland, worn, leak, maxW,
             cover: wearland ? 100 * worn / wearland : 0,
             lively: m(lively), quiet: m(quiet) };
  }, seed);

  agg.worn.push(r.worn); agg.cover.push(r.cover); agg.lively.push(r.lively);
  agg.quiet.push(r.quiet); agg.leak.push(r.leak);
  console.log(String(seed).padEnd(5) + '|' +
    (r.worn + '/' + r.wearland).padStart(11) + (r.cover.toFixed(0) + '%').padStart(7) + ' |' +
    r.lively.toFixed(2).padStart(15) + r.quiet.toFixed(2).padStart(11) + ' |' +
    r.maxW.toFixed(2).padStart(8) + ('' + r.leak).padStart(9) + '  <- LEAK MUST be 0');
}

const mean = a => a.reduce((x, y) => x + y, 0) / a.length;
console.log('\n  WORN hexes / city:  ' + agg.worn.join(', ') + '   (HEAD: 0 on every seed -- the defect stated, 236)');
console.log('  COVER of green:     ' + agg.cover.map(v => v.toFixed(0) + '%').join(', ') +
  '   <- a MINORITY (250): most public green stays quiet & clean, no uniform browning');
console.log('  LIVELY vs QUIET:    lively ' + mean(agg.lively).toFixed(2) + '  quiet ' + mean(agg.quiet).toFixed(2) +
  '   <- lively >> quiet ⇒ desire paths at the busy edge, not a wash');
console.log('  LEAK (non-green):   ' + agg.leak.join(', ') + '   <- MUST be 0 on every seed');
await b.close();
