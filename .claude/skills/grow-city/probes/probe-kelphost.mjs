/* probe-kelp2 — the kelp's NEIGHBOURHOOD: is there room to grow, and is there any
 * slow signal out there with RANGE?
 *
 * probe-kelp settled the diagnosis (the pass fires once on tick 1, converts 100%
 * of what qualifies, and is a no-op for 799 more ticks). It also read shoreLoad =
 * 0.00 at radius 2 -- but a fixed radius is the wrong instrument for a "how far
 * away is the city" question. Measure the DISTANCE, not a count in a disc.
 *
 * Pure world data: no render, no clock, no noise floor.
 *
 * 1. ROOM TO SPREAD -- WATER hexes adjacent to the existing bed. A spread rule
 *    needs a NEIGHBOUR, not a population (263). If the bed has no open water
 *    beside it, a spread CA is dead before it is written.
 * 2. THE SIGNALS, as DISTANCES, at 1985 vs 2035 -- does anything the kelp could
 *    read actually MOVE over the 50 years? (267: a field with no range is not a
 *    gate, it is a constant.)
 * 3. DEPTH -- the tooltip comment claims "depth is invariantly shoal here". Check.
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = join(HERE, '../../../../solvista.html');

const SEEDS = [42, 7, 1234, 99, 2024, 555];

const b = await chromium.launch();
const p = await b.newPage();
await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await p.goto(pathToFileURL(ART).href);
await p.waitForTimeout(400);

console.log('=== kelp neighbourhood: room to spread, signal range, depth ===');
console.log('              KELP  openNbrWater | dist->DEV/ROAD  dist->BEACH | depth(kelp)  depth(openNbr)');
for (const seed of SEEDS) {
  for (const era of [1985, 2035]) {
    const r = await p.evaluate(([seed, era]) => {
      playing = false;
      genWorld(seed);
      window.__warp(era - year);

      const kcells = [], kset = new Set();
      for (const i of HEXI) if (cells[i].t === T.KELP) {
        kcells.push([i % G, (i / G) | 0, i]); kset.add(i);
      }

      /* 1. open sea beside the bed: plain WATER, not river, not mole -- the only
            cells a spread rule could ever take. */
      const open = new Set();
      for (const [x, y] of kcells) {
        nbrs6(x, y, (nx, ny) => {
          const c = cellAt(nx, ny); if (!c) return;
          const j = idx(nx, ny);
          if (c.t === T.WATER && !c.riv && !moleSet.has(j)) open.add(j);
        });
      }

      /* 2. signals as DISTANCES (BFS-free: hex distance to the nearest instance) */
      const devs = [], beaches = [];
      for (const i of HEXI) {
        const c = cells[i];
        if (DEV.has(c.t) || c.t === T.ROAD) devs.push([i % G, (i / G) | 0]);
        if (c.t === T.BEACH) beaches.push([i % G, (i / G) | 0]);
      }
      const near = (x, y, list) => {
        let best = 99;
        for (const [ax, ay] of list) { const d = hexDist(x, y, ax, ay); if (d < best) best = d; }
        return best;
      };
      let dDev = 0, dBeach = 0;
      for (const [x, y] of kcells) { dDev += near(x, y, devs); dBeach += near(x, y, beaches); }
      const n = kcells.length || 1;

      /* 3. depth, from the seabed the tile is actually drawn from */
      const dep = a => { let s = 0; for (const i of a) s += rDeep[i]; return a.length ? s / a.length : 0; };
      return {
        kelp: kcells.length, open: open.size,
        dDev: dDev / n, dBeach: dBeach / n,
        depK: dep(kcells.map(k => k[2])), depO: dep([...open]),
      };
    }, [seed, era]);

    console.log(
      (seed + '@' + era).padEnd(14) +
      String(r.kelp).padStart(4) + String(r.open).padStart(14) + ' |' +
      r.dDev.toFixed(2).padStart(14) + r.dBeach.toFixed(2).padStart(13) + ' |' +
      r.depK.toFixed(3).padStart(12) + r.depO.toFixed(3).padStart(15));
  }
}

await b.close();
