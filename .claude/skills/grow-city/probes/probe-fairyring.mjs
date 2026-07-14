/* probe-fairyring — DOES THE AUTUMN FLUSH BLINK, OR DOES IT BREATHE?
 *
 * The fairy rings are a fully-wired CA (tick() pass, drawShroom, tooltip row, __find
 * hook) that the ledger had never once mentioned. Host is healthy (FOREST 65-99 +
 * REDWOOD 5-20 at 2035), and probe-shroomvis measured a ring at 15.8-20.8 CSS px at
 * fit zoom -- ~4x a ped's contact shadow, so it is genuinely SEEN (259's check).
 *
 * TEMPORAL (134): every other gate in this loop is FROZEN, so "the whole wood blinks
 * on and off as one" has no instrument. It drives the artifact's OWN tick() and reads
 * NO PIXELS, so it has no noise floor at all and nothing to stub.
 *
 * BUILD-AGNOSTIC: it only reads cells[].shroom, so ONE file grades HEAD and the patch
 * with no source swap and no cross-build floor (230). SRC=<path> selects the build.
 *
 * HEADLINE NEEDS NO THRESHOLD (236): when the vector is "make X vary", HEAD's answer is
 * a CONSTANT by construction. HEAD reads DISTINCT NONZERO COUNTS PER AUTUMN = 1 -- a
 * perfect square wave, 0 -> N -> N -> N -> 0 -- which IS the defect, stated.
 *
 * CONTROLS:
 *   - SPRING/SUMMER rings (must-not-move, 250): the flush may spread into early winter,
 *     but a mushroom in MAY is a broken season. This is the column that guards the
 *     semantics, and it is the one that can kill the lap.
 *   - BLOOM (free positive control, 248): the wildflower CA, a correct sibling
 *     excitable-medium in the SAME tick(), proven alive at 263. If it reads 0 the RIG is
 *     dead, not the rule.
 *   - developed (must-not-move, 250): the pass draws no rng(), so the city must not move.
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;

const HERE = dirname(fileURLToPath(import.meta.url));
const ART = process.env.SRC || join(HERE, '../../../../solvista.html');
const TAG = process.env.TAG || (process.env.SRC ? 'HEAD' : 'patch');
const SEEDS = [7, 42, 1234, 5, 99, 777];
const YEARS = 10;
const TICKS = Math.round(YEARS / 0.075);

const b = await chromium.launch();
const page = await b.newPage({ viewport: { width: 1400, height: 900 } });
await page.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await page.goto('file://' + ART);
await page.waitForTimeout(400);

const rows = await page.evaluate(({ SEEDS, TICKS }) => {
  playing = false;
  const out = [];
  for (const seed of SEEDS) {
    genWorld(seed);
    __warp(61);                                   /* one prefix warp -> ~2035 */
    const samples = [];
    for (let k = 0; k < TICKS; k++) {
      year += 0.45 / 6;                           /* exactly what __warp/frame() do */
      tick();
      let rings = 0, host = 0, bloom = 0, dev = 0;
      for (const c of cells) {
        if (c.t === T.FOREST || c.t === T.REDWOOD) { host++; if (c.shroom > 0) rings++; }
        if ((c.t === T.MEADOW || c.t === T.SHOREPARK) && c.bloom > 0) bloom++;
        if (c.t !== T.VOID && c.t !== T.WATER && c.t !== T.EMPTY) dev++;
      }
      samples.push({ s2: ((year % 1) + 1) % 1, yr: Math.floor(year), rings, host, bloom, dev });
    }
    out.push({ seed, samples });
  }
  return out;
}, { SEEDS, TICKS });

await b.close();

console.log(`\n=== ${TAG} === ${ART}`);
console.log(`Driving the artifact's own tick(). 1 tick = 0.075 yr; ${TICKS} ticks = ${YEARS} yr.\n`);
console.log('        DEFECT ->|  EFFECT ->                        |  MUST NOT MOVE ->');
console.log('seed  host | autumns  DISTINCT-nonzero/autumn  peak  ring-ticks/yr | SPRING+SUMMER rings | bloom(ctrl) | dev');
console.log('-'.repeat(112));

let allDistinct = [], allSpring = 0, allRingTicks = [];
for (const { seed, samples } of rows) {
  /* group the ticks by calendar year and look at each autumn on its own */
  const byYear = new Map();
  for (const s of samples) {
    if (!byYear.has(s.yr)) byYear.set(s.yr, []);
    byYear.get(s.yr).push(s);
  }
  const distincts = [];
  for (const [, ys] of byYear) {
    const nz = ys.map(s => s.rings).filter(r => r > 0);
    if (nz.length) distincts.push(new Set(nz).size);   /* how many DIFFERENT counts while up */
  }
  const meanDistinct = distincts.reduce((a, x) => a + x, 0) / Math.max(1, distincts.length);
  const peak = Math.max(...samples.map(s => s.rings));
  const ringTicks = samples.filter(s => s.rings > 0).length / (samples.length * 0.075);
  /* the guard: a mushroom in spring or summer is a broken season */
  const spring = samples.filter(s => s.s2 >= 0.20 && s.s2 <= 0.70 && s.rings > 0).length;
  const bloomPeak = Math.max(...samples.map(s => s.bloom));
  const host = Math.round(samples.reduce((a, s) => a + s.host, 0) / samples.length);
  const dev = samples[samples.length - 1].dev;

  allDistinct.push(meanDistinct); allSpring += spring; allRingTicks.push(ringTicks);
  console.log(
    String(seed).padEnd(5),
    String(host).padStart(4), '|',
    String(distincts.length).padStart(7),
    meanDistinct.toFixed(2).padStart(23),
    String(peak).padStart(5),
    ringTicks.toFixed(1).padStart(14), '|',
    String(spring).padStart(19), '|',
    String(bloomPeak).padStart(11), '|',
    String(dev).padStart(5),
  );
}
const mean = a => a.reduce((x, y) => x + y, 0) / a.length;
console.log('-'.repeat(112));
console.log(`MEAN  distinct-nonzero counts per autumn = ${mean(allDistinct).toFixed(2)}   (HEAD = 1.00 : a SQUARE WAVE)`);
console.log(`MEAN  ring-ticks per year               = ${mean(allRingTicks).toFixed(1)}`);
console.log(`GUARD spring+summer rings, all seeds    = ${allSpring}   (must be 0)`);
