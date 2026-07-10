#!/usr/bin/env node
/* probe-anchor — the shape probe for iteration 119 (People & activity x Deepen).
 *
 * Iter 111 measured that residents structurally cannot serve the road network:
 * only 20-31% of bus stops have a ped's ANCHOR within PEDLEASH, and its finding
 * named the fix -- "you must move the spawn pool (`openCells` in `syncFleet`),
 * not the leash" -- but never measured what moving it buys, or what it costs.
 *
 * What the first run of this probe found, before any code was written:
 *   - `openCells` is 54% COASTLINE by area (BEACH+DUNE+SHOREPARK), so a uniform
 *     draw houses the population at the seaside. At steady state seed 7 anchors
 *     81 of 130 residents on the sand and exactly 4 downtown (3 MARKET, 1 QUAD),
 *     across a city of 6075 developed cells and 5786 roads.
 *   - The live crowd is ALSO a fossil: syncFleet is called from tick(), so peds
 *     spawn progressively as the city grows and never re-site. A ped anchored to
 *     the 1985 beach is still on it in 2035.
 * Hence the counterfactual that matters is not "resample the 2035 pool" (an
 * idealization the progressive spawn never reaches) but a LIVE A/B of two builds.
 *
 * Method: load a file, let real frames run so syncFleet tops up to wantPeds, then
 * `__step` the entity sim (no rendering, no frame loop -- load cannot skew it,
 * iter 103) and time-average. Pristine side is a copy of `git show HEAD`, never
 * `git stash` (iter 108).
 *
 * Reported per seed, at 2035:
 *   anchors    tile histogram of where residents LIVE (p.hx,p.hy)
 *   coast%     share anchored on BEACH/DUNE/SHOREPARK -- the defect
 *   kerb%      share anchored on a ROAD hex          -- the vector
 *   stopCov    frac of bus stops with >=1 anchor within PEDLEASH (111's 20-31%)
 *   street%    time-averaged frac of peds STANDING on a road (stepPed's tuned ~19%)
 *   dull/live  that street occupancy SPLIT by kerb buzz (iter 104: grade on the
 *              split, never the total, whose control spread is 3.0-5.3 points)
 *
 *   node probe-anchor.mjs [--file PATH] [seeds...]      (default 7 42 1234)
 */
import { homedir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(HERE, '../../..');

const argv = process.argv.slice(2);
const fi = argv.indexOf('--file');
const FILE = fi >= 0 ? resolve(argv[fi + 1]) : join(REPO, 'solvista.html');
const seeds = argv.filter(a => /^\d+$/.test(a)).map(Number);
const SEEDS = seeds.length ? seeds : [7, 42, 1234];
const PAGE = pathToFileURL(FILE).href;

const BURN = 120, SAMP = 40, DT = 3;   // sim-seconds

const browser = await chromium.launch();
console.log(`file: ${FILE}`);
for (const seed of SEEDS) {
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.goto(`${PAGE}?seed=${seed}&warp=61&t=0.35`, { waitUntil: 'load' });
  await page.waitForFunction(() => typeof window.__census === 'function');
  await page.waitForTimeout(2500);          // let syncFleet top up to wantPeds

  const r = await page.evaluate(({ BURN, SAMP, DT }) => {
    const NAME = {}; for (const k in T) NAME[T[k]] = k;
    const COAST = new Set([T.BEACH, T.DUNE, T.SHOREPARK]);

    const anch = {};
    let coast = 0, kerb = 0;
    for (const p of peds) {
      const c = cells[idx(p.hx, p.hy)];
      anch[NAME[c.t]] = (anch[NAME[c.t]] || 0) + 1;
      if (COAST.has(c.t)) coast++;
      if (c.t === T.ROAD) kerb++;
    }

    const stops = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) if (cells[idx(x, y)].stop) stops.push([x, y]);
    let hit = 0;
    for (const [sx, sy] of stops)
      if (peds.some(p => hexDist(sx, sy, p.hx, p.hy) <= PEDLEASH)) hit++;

    // time-averaged street occupancy, split by whether the kerb fronts anything,
    // and -- the control that matters -- SPLIT BY THE PED'S OWN ANCHOR CLASS. The
    // aggregate ~19% stepPed tuned describes a population anchored wholly on open
    // ground; once residents can live on a kerb the aggregate mixes two populations
    // and can no longer convict anything. `openStreet` is the invariant column
    // (iter 118): open-ground residents must behave exactly as they did before.
    const anchorIsRoad = peds.map(p => cells[idx(p.hx, p.hy)].t === T.ROAD);
    window.__step(BURN);
    let onRoad = 0, live = 0, dull = 0, liveN = 0, dullN = 0, n = 0;
    let openOn = 0, openN = 0, kerbOn = 0, kerbN = 0;
    for (let s = 0; s < SAMP; s++) {
      window.__step(DT);
      for (let i = 0; i < peds.length; i++) {
        const p = peds[i], c = cells[idx(p.x, p.y)];
        const road = c.t === T.ROAD && !c.bridge;
        n++;
        if (road) { onRoad++; if ((c.buzz || 0) >= 1) live++; else dull++; }
        if (anchorIsRoad[i]) { kerbN++; if (road) kerbOn++; }
        else { openN++; if (road) openOn++; }
      }
      if (s === 0) for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
        const c = cells[idx(x, y)];
        if (c.t !== T.ROAD || c.bridge) continue;
        if ((c.buzz || 0) >= 1) liveN++; else dullN++;
      }
    }
    return {
      peds: peds.length, anch, coast: coast / peds.length, kerb: kerb / peds.length,
      stops: stops.length, stopCov: stops.length ? hit / stops.length : 0,
      street: onRoad / n, liveFrac: live / n, dullFrac: dull / n, liveN, dullN,
      openStreet: openN ? openOn / openN : 0, kerbStreet: kerbN ? kerbOn / kerbN : 0,
      anchorBuzz: peds.reduce((s, p) => s + (cells[idx(p.hx, p.hy)].buzz || 0), 0) / peds.length,
    };
  }, { BURN, SAMP, DT });

  const pc = v => (v * 100).toFixed(1) + '%';
  console.log(`\n=== seed ${seed} · ${r.peds} residents · ${r.stops} bus stops`);
  console.log(`  anchors     ${JSON.stringify(r.anch)}`);
  console.log(`  coast% ${pc(r.coast)}   kerb% ${pc(r.kerb)}   anchorBuzz ${r.anchorBuzz.toFixed(3)}`);
  console.log(`  stopCov ${pc(r.stopCov)}`);
  console.log(`  street% ${pc(r.street)}   (on lively kerbs ${pc(r.liveFrac)} of peds / ${r.liveN} such hexes;`
            + ` on dull lanes ${pc(r.dullFrac)} / ${r.dullN} hexes)`);
  console.log(`  street% BY ANCHOR:  open-ground residents ${pc(r.openStreet)}  ·  kerb residents ${pc(r.kerbStreet)}`);
  await page.close();
}
await browser.close();
