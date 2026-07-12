#!/usr/bin/env node
/* probe-skyline.mjs — is there a DOWNTOWN, or are the towers sprinkled?
 *
 * Iter 217's step-back: both visual agents, blind, on two different seeds,
 * independently reported the same thing — "67/91 towers sprinkled evenly across
 * the whole plate, no downtown, no skyline; the city reads as texture, not a
 * place." Per 212's law, an aside two agents reach independently outranks either
 * one's verdict, and a FAIL is a cue to MEASURE.
 *
 * The suspect is in the code, not the pixels. The tower upgrade rule (~L1493) is:
 *
 *    if(com>=2 && rng() < (0.14+0.20*back)*(0.5+c.val))          <- PLACEMENT
 *      c.t=T.TOWER; c.th=(54+c.v*82)*(0.70+0.66*core);           <- HEIGHT
 *
 * The comment above it correctly diagnoses the half-plane problem ("a linear ramp
 * down the x+y diagonal is a HALF-PLANE, not a place, so it has no peak for a
 * skyline to sit on") -- and then fixes it for HEIGHT ONLY. `back` is still the
 * half-plane, and iter 98 already established that `c.val` is NOT a centrality
 * field (it diffuses valueSrc, whose peaks sit on parks and water). So *nothing*
 * in the placement roll knows where downtown is.
 *
 * Method: pure world-data (no rendering, so no timing/noise). Rebuild in-page with
 * genWorld+__warp, then bin every live cell by hexDist from the published CBD and
 * report, per ring:
 *   - TOWER share of developed land   (DENSITY -- the agents' claim)
 *   - mean tower height c.th          (HEIGHT  -- already fixed, the CONTROL)
 * If density is flat across rings while height falls, the half-fix is confirmed:
 * the city has a tall middle but no dense one.
 *
 *   node probe-skyline.mjs
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(join(HERE, '../../../../solvista.html')).href;

const SEEDS = [7, 42, 1234];
const WARP = 61;
/* rings of hexDist from the published CBD (CORER=16 is the artifact's own "core") */
const RINGS = [[0, 4], [5, 8], [9, 12], [13, 16], [17, 22], [23, 99]];

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
/* 213: stub the PRNG before the page's own script, not after */
await p.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});

const rows = [];
for (const seed of SEEDS) {
  await p.goto(`${PAGE}?seed=${seed}&warp=${WARP}&t=0.30`);
  await p.waitForTimeout(400);

  const r = await p.evaluate(({ RINGS, seed, WARP }) => {
    playing = false;
    genWorld(seed);            /* byte-identical world regardless of load timing (163) */
    __warp(WARP);

    const bins = RINGS.map(() => ({ dev: 0, tow: 0, th: 0, res: 0, live: 0 }));
    const ringOf = d => RINGS.findIndex(([lo, hi]) => d >= lo && d <= hi);

    let towD = [], devD = [];
    for (const i of HEXI) {                       /* HEXI is flat y*G+x indices */
      const x = i % G, y = (i / G) | 0;
      const c = cells[i]; if (!c) continue;
      const d = hexDist(x, y, CBDX, CBDY);
      const bi = ringOf(d); if (bi < 0) continue;
      const B = bins[bi];
      B.live++;
      if (DEV.has(c.t)) { B.dev++; devD.push(d); }
      if (c.t === T.RES) B.res++;
      if (c.t === T.TOWER) { B.tow++; B.th += c.th; towD.push(d); }
    }
    const mean = a => a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0;
    return {
      bins,
      towN: towD.length,
      meanTowD: mean(towD),
      meanDevD: mean(devD),
      cbd: [CBDX, CBDY],
    };
  }, { RINGS, seed, WARP });

  rows.push({ seed, ...r });
}
await b.close();

console.log('\nIS THERE A DOWNTOWN?  towers binned by hexDist from the published CBD');
console.log('world data only (no render); genWorld+warp 61; seeds 7/42/1234\n');

for (const r of rows) {
  console.log(`  seed ${r.seed}  (CBD at ${r.cbd[0]},${r.cbd[1]};  ${r.towN} towers)`);
  console.log('    ring      live   devel  towers   TOWER%of-dev   mean ht');
  console.log('    ---------------------------------------------------------');
  r.bins.forEach((B, i) => {
    const [lo, hi] = RINGS[i];
    const lbl = (hi === 99 ? `${lo}+` : `${lo}-${hi}`).padStart(5);
    const pct = B.dev ? (100 * B.tow / B.dev) : 0;
    const ht = B.tow ? (B.th / B.tow) : 0;
    const bar = '#'.repeat(Math.round(pct * 1.2));
    console.log(`    ${lbl}  ${String(B.live).padStart(6)}  ${String(B.dev).padStart(6)}  ${String(B.tow).padStart(6)}   ${pct.toFixed(1).padStart(5)}%  ${bar.padEnd(14)} ${ht.toFixed(0).padStart(5)}`);
  });
  console.log(`    mean dist from CBD:  towers ${r.meanTowD.toFixed(1)}   |   ALL developed ${r.meanDevD.toFixed(1)}   <-- equal = sprinkled, not clustered`);
  console.log('');
}

console.log('READ: TOWER%of-dev is the DENSITY claim (do towers CLUSTER downtown?).');
console.log('      mean ht is the CONTROL -- iter 98 keyed HEIGHT to `core`, so it SHOULD fall with distance.');
console.log('      If density is flat while height falls, the skyline was half-fixed: a tall middle, but not a dense one.');
