/* probe-snow — the gate for iter 321 (Sky's first CA rule).
 *
 * Pure world data: drives the artifact's OWN tick() and reads cells[].snow -- no
 * pixels, NO NOISE FLOOR AT ALL, nothing to stub. BUILD-AGNOSTIC via SRC=: c.snow is
 * undefined on HEAD (reads 0), so ONE file grades HEAD and the patch with no source
 * swap and no cross-build floor (230).
 *
 * HEADLINE -- NEEDS NO THRESHOLD (236). The vector is "make winter show". HEAD's
 * snow is a CONSTANT 0, everywhere, always -- a baseline nobody had to design.
 *   WINTER mean snow (deep Jan, s=0.12)  vs  SUMMER mean (dry peak, s=0.62).
 *   HEAD: 0 / 0.  Patch: winter > 0, summer ~ 0  => the seasonal gate is real.
 *
 * SPATIAL (the diffusion-CA claim, not a flat wash): snow is DEEP on the parks/woods
 *   and THIN on the trafficked streets, per the per-type target -- so mean(PARK) and
 *   mean(FOREST) must sit well above mean(ROAD).
 *
 * ANTI-QUILT (255/257): the drawn alpha tracks c.snow, so if c.snow stepped hard
 *   between touching hexes the field would terrace onto the lattice. The diffusion
 *   term smooths it; report the p95 |step| between touching snow-land hexes -- it must
 *   be SMALL relative to the field's own range.
 *
 * CONTAINED (250, the must-not-move column): the coast (BEACH/DUNE/SHOREPARK) and every
 *   building are NOT snow-land, so their c.snow must be 0 -- a LEAK count that must read 0.
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
console.log('seed | WINTER  cover%  PARK  FOREST  ROAD | SUMMER | quilt p95 step | LEAK(coast/bldg)');
const agg = { win: [], sum: [], park: [], road: [], quilt: [], leak: [] };

for (const seed of SEEDS) {
  const r = await p.evaluate((seed) => {
    playing = false;
    genWorld(seed);
    for (let n = 0; n < 800 && year < 2035; n++) { year += 0.075; tick(); }
    const settle = (yr) => { year = yr; for (let k = 0; k < 10; k++) tick(); };
    const SL = (typeof SNOWLAND !== 'undefined') ? SNOWLAND : new Set();
    const snowOf = c => (c.snow || 0);

    const stat = () => {
      const acc = { all: [0, 0], park: [0, 0], forest: [0, 0], road: [0, 0], cover: 0, tot: 0, leak: 0 };
      const CO = [T.BEACH, T.DUNE, T.SHOREPARK], DEVL = DEV;
      for (const i of HEXI) {
        const c = cells[i], s = snowOf(c);
        if (SL.has(c.t)) {
          acc.tot++; acc.all[0] += s; acc.all[1]++;
          if (s > 0.05) acc.cover++;
          if (c.t === T.PARK) { acc.park[0] += s; acc.park[1]++; }
          if (c.t === T.FOREST || c.t === T.REDWOOD) { acc.forest[0] += s; acc.forest[1]++; }
          if (c.t === T.ROAD) { acc.road[0] += s; acc.road[1]++; }
        } else if (CO.includes(c.t) || DEVL.has(c.t)) {
          if (s > 0.004) acc.leak++;
        }
      }
      const m = a => a[1] ? a[0] / a[1] : 0;
      return { all: m(acc.all), park: m(acc.park), forest: m(acc.forest), road: m(acc.road),
               cover: acc.tot ? 100 * acc.cover / acc.tot : 0, leak: acc.leak };
    };

    settle(2035.12); const W = stat();           // deep winter
    // anti-quilt: p95 |snow step| between touching snow-land hexes, in the winter field
    const steps = [];
    for (const i of HEXI) {
      const c = cells[i]; if (!SL.has(c.t) || snowOf(c) <= 0.05) continue;
      const x = i % G, y = (i / G) | 0;
      nbrs6(x, y, (nx, ny) => { const nc = cellAt(nx, ny);
        if (nc && SL.has(nc.t) && snowOf(nc) > 0.05) steps.push(Math.abs(snowOf(c) - snowOf(nc))); });
    }
    steps.sort((a, bb) => a - bb);
    const p95 = steps.length ? steps[Math.floor(steps.length * 0.95)] : 0;

    settle(2035.62); const S = stat();            // golden dry peak -- must be clean
    return { W, S, p95 };
  }, seed);

  agg.win.push(r.W.all); agg.sum.push(r.S.all); agg.park.push(r.W.park); agg.road.push(r.W.road);
  agg.quilt.push(r.p95); agg.leak.push(r.W.leak);
  console.log(String(seed).padEnd(5) + '|' +
    r.W.all.toFixed(2).padStart(7) + (r.W.cover.toFixed(0) + '%').padStart(7) +
    r.W.park.toFixed(2).padStart(6) + r.W.forest.toFixed(2).padStart(8) + r.W.road.toFixed(2).padStart(6) + ' |' +
    r.S.all.toFixed(3).padStart(7) + ' |' + r.p95.toFixed(3).padStart(11) + ('   ' + r.W.leak).padStart(6) +
    '  <- summer & leak MUST be ~0');
}

const mean = a => a.reduce((x, y) => x + y, 0) / a.length;
console.log('\n  WINTER mean snow: ' + agg.win.map(v => v.toFixed(2)).join(', ') + '   mean ' + mean(agg.win).toFixed(2) +
  '   (HEAD: 0 on every seed)');
console.log('  SUMMER mean snow: ' + agg.sum.map(v => v.toFixed(3)).join(', ') + '   <- MUST be ~0 (melts before the golden peak)');
console.log('  PARK vs ROAD:     park ' + mean(agg.park).toFixed(2) + '  road ' + mean(agg.road).toFixed(2) +
  '   <- park DEEPER than road ⇒ a spatial field, not a flat wash');
console.log('  QUILT p95 step:   ' + agg.quilt.map(v => v.toFixed(3)).join(', ') +
  '   <- SMALL vs the field range (~1.0) ⇒ diffusion-smoothed, no lattice terrace');
console.log('  LEAK (coast/bldg): ' + agg.leak.join(', ') + '   <- MUST be 0 on every seed');
await b.close();
