#!/usr/bin/env node
/* probe-downtownmass.mjs — GRADE THE SKYLINE AS MASS, AND TEST THE AGENT'S CHARGE.
 *
 * The two visual agents split. Seed 42 located the patched downtown within 0.01 (x) of
 * the true CBD and called HEAD coreless. Seed 7 FAILed the patch as "102 near-identical
 * towers spread evenly across the whole city -- an over-built picket forest".
 *
 * That FAIL is a CAUSAL claim and it is directly measurable (212: grade the FAIL by
 * measuring it). It says the patch ADDED towers across the plate. So report, per seed,
 * HEAD vs PATCH:
 *
 *   far-rim (23+) TOWER COUNT   <- the "picket forest". If the patch did not move it,
 *                                  the forest is HEAD's and the agent has misattributed.
 *   tower HEIGHT mass in ring 0-8, and its SHARE of the city's total tower height
 *                               <- the eye reads MASS, not count (218): core towers are
 *                                  taller by `0.70+0.66*core`, so height concentrates
 *                                  faster than count.
 *   height-weighted centroid distance from the CBD, vs the same for ALL developed land
 *                               <- <1 means the skyline peaks inward of where the land is.
 *
 * Pure world data: no canvas, no clock, no noise floor (218's cheapest instrument).
 *   git show HEAD:solvista.html > /tmp/solvista-head.html   # the pristine control
 *   node probe-downtownmass.mjs
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));

const BUILDS = [
  { name: 'HEAD ', file: '/tmp/solvista-head.html' },
  { name: 'PATCH', file: join(HERE, '../../../../solvista.html') },
];
const SEEDS = [7, 42, 1234];
const WARP = 61;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
await p.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});

const rows = [];
for (const bd of BUILDS) {
  for (const seed of SEEDS) {
    await p.goto(`${pathToFileURL(bd.file).href}?seed=${seed}&warp=${WARP}&t=0.30`);
    await p.waitForTimeout(300);
    const r = await p.evaluate(({ seed, WARP }) => {
      playing = false; genWorld(seed); __warp(WARP);
      let towN = 0, towH = 0, coreH = 0, coreN = 0, rimN = 0, wD = 0, devD = 0, devN = 0, tallN = 0;
      for (const i of HEXI) {
        const x = i % G, y = (i / G) | 0, c = cells[i]; if (!c) continue;
        const d = hexDist(x, y, CBDX, CBDY);
        if (DEV.has(c.t)) { devN++; devD += d; }
        if (c.t !== T.TOWER) continue;
        towN++; towH += c.th; wD += c.th * d;
        if (d <= 8) { coreH += c.th; coreN++; }
        if (d >= 23) rimN++;
        if (c.th >= 120) tallN++;
      }
      return { towN, towH, coreH, coreN, rimN, tallN,
               cen: towH ? wD / towH : 0, devMean: devN ? devD / devN : 0 };
    }, { seed, WARP });
    rows.push({ build: bd.name, seed, ...r });
  }
}
await b.close();

console.log('\nTHE SKYLINE AS MASS  (world data; genWorld + warp 61; sum of tower height = the mass the eye reads)\n');
const hdr = '  build  seed   towers   far-rim(23+)   core(0-8) tow   coreH share of all tower height   massCentroid/devMean';
console.log(hdr);
console.log('  ' + '-'.repeat(hdr.length - 2));
for (const s of SEEDS) {
  for (const bd of BUILDS) {
    const r = rows.find(z => z.build === bd.name && z.seed === s);
    const share = r.towH ? (100 * r.coreH / r.towH) : 0;
    const ratio = r.devMean ? (r.cen / r.devMean) : 0;
    console.log('  ' + r.build + String(r.seed).padStart(6) + String(r.towN).padStart(9) +
      String(r.rimN).padStart(15) + String(r.coreN).padStart(16) +
      `${share.toFixed(1)}%`.padStart(35) + ratio.toFixed(2).padStart(23));
  }
  console.log('');
}
console.log('READ:');
console.log('  far-rim UNCHANGED between HEAD and PATCH  => the "picket forest" is HEAD\'s, not the patch\'s.');
console.log('     The patch is PURE ADDITION (ccore=0 at the rim => the rule there is byte-identical).');
console.log('  coreH share UP  => the city\'s tower MASS moved downtown, which is what a skyline IS.');
console.log('  massCentroid/devMean < 1 => the skyline peaks inward of where the land sits.');
