/* probe-kelplife — is the kelp bed ALIVE, and does it read the seabed?
 *
 * The gate for iter 282. Pure world data: it drives the artifact's OWN tick() and
 * reads cells[] -- no pixels, no clock, NO NOISE FLOOR AT ALL, nothing to stub.
 * BUILD-AGNOSTIC via SRC=: one file grades HEAD and the patch with no source swap
 * inside the page and no cross-build pixel floor (230).
 *
 * HEADLINE -- NEEDS NO THRESHOLD (236). When the vector is "make X vary", HEAD's
 * answer is a CONSTANT by construction, so it is a baseline nobody had to design:
 *   DISTINCT BED SIZES over the 800-tick run.  HEAD reads 1. A bed that is stamped
 *   on tick 1 and never touched again has exactly one size, forever.
 *   MEAN DEPTH of the bed.  HEAD reads 1.000, flat, on every seed and every era --
 *   the pass asked "is a beach beside me?", a one-hex proxy for depth, so the bed
 *   was a ribbon welded to the sand on a seabed it never read.
 *
 * POSITIVE CONTROL (248) -- THE DUNE. A correct sibling accretion CA, in the SAME
 * tick(), on the SAME coast, which provably does keep changing. It must move in
 * BOTH builds. A flat kelp column beside a flat dune column would convict the
 * PROBE; a flat kelp column beside a LIVE dune column convicts the city.
 *
 * MUST-NOT-MOVE (250) -- pop / developed / roads. The pass draws ZERO rng() and
 * swaps only within WETSET, so these must come back IDENTICAL, not merely close.
 * That is the inertness claim, and it is provable rather than asserted.
 *
 * COST (233) -- kelp is this loop's most notorious regression ("kelp lined the
 * entire coast dark for ~13 iterations") and the eligible pool is up to 206 cells.
 * The bar is the INCUMBENT, not a constant I chose (226): the bed must not exceed
 * HEAD's on the WORST seed.
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
console.log('seed | KELP: distinct  turn  depth  shelf%  bed@85->@35 | DUNE ctrl | pop / dev / roads');
const agg = { dist: [], depth: [], bed: [], dune: [] };

for (const seed of SEEDS) {
  const r = await p.evaluate((seed) => {
    playing = false;
    genWorld(seed);
    const kset = () => { const s = new Set(); for (const i of HEXI) if (cells[i].t === T.KELP) s.add(i); return s; };
    const dune = () => { let n = 0; for (const i of HEXI) if (cells[i].t === T.DUNE) n++; return n; };

    const sizes = new Set(), duneSizes = new Set();
    let k85 = null;
    for (let n = 1; n <= 800; n++) {
      year += 0.075;
      tick();
      sizes.add(kset().size);
      duneSizes.add(dune());
      if (k85 === null && year >= 1985) k85 = kset();
    }
    const k35 = kset();

    let turn = 0;
    for (const i of k85) if (!k35.has(i)) turn++;
    for (const i of k35) if (!k85.has(i)) turn++;

    let deep = 0, shelf = 0;
    for (const i of k35) { deep += rDeep[i]; if (rDeep[i] >= SHELF0) shelf++; }
    const n = k35.size || 1;

    /* the must-not-move column: the pass draws no rng() and swaps inside WETSET */
    const st = { pop: 0, dev: 0, roads: 0 };
    recount();
    st.pop = stats.pop;
    for (const i of HEXI) { const c = cells[i]; if (DEV.has(c.t)) st.dev++; if (c.t === T.ROAD) st.roads++; }

    return { distinct: sizes.size, turn, depth: deep / n, shelfPct: 100 * shelf / n,
             k85: k85.size, k35: k35.size, duneDistinct: duneSizes.size, dune: dune(), st };
  }, seed);

  agg.dist.push(r.distinct); agg.depth.push(r.depth); agg.bed.push(r.k35); agg.dune.push(r.duneDistinct);
  console.log(String(seed).padEnd(5) + '|' +
    String(r.distinct).padStart(10) + String(r.turn).padStart(6) +
    r.depth.toFixed(3).padStart(7) + (r.shelfPct.toFixed(0) + '%').padStart(8) +
    ('   ' + r.k85 + '->' + r.k35).padStart(13) + ' |' +
    (' ' + r.duneDistinct + ' sizes/' + r.dune).padStart(11) + ' |' +
    ('  ' + r.st.pop + ' / ' + r.st.dev + ' / ' + r.st.roads));
}

const mean = a => a.reduce((x, y) => x + y, 0) / a.length;
console.log('\n  KELP distinct sizes: ' + agg.dist.join(', ') +
  '   (HEAD is 1 on every seed: stamped once, never touched again)');
console.log('  KELP mean depth:     ' + agg.depth.map(d => d.toFixed(2)).join(', ') +
  '   (HEAD is 1.00 on every seed: a ribbon on the sand)');
console.log('  KELP bed size:       ' + agg.bed.join(', ') + '   mean ' + mean(agg.bed).toFixed(1) +
  '   WORST ' + Math.max(...agg.bed) + '   (HEAD: 8,17,8,9,26,36 / mean 17.7 / worst 36)');
console.log('  DUNE control:        ' + agg.dune.join(', ') + ' distinct sizes  <- MUST be >1 in BOTH builds');

await b.close();
