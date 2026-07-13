#!/usr/bin/env node
/* probe-fringeshape.mjs — THE SHAPE OF A FRINGE THE GATE CAN AFFORD.
 *
 * probe-fringeabsorb just refuted 233's named way through: the interior admits
 * ~25 cells and a belt holds 157-223, so `developed` CANNOT be held flat. Every
 * fringe costs developed cells. The census core gate's ceiling is ~-4.5%.
 *
 * So the design question is no longer "how do we pay nothing" -- it is:
 *
 *     WHAT IS THE MOST COUNTRYSIDE PER DEVELOPED CELL SPENT?
 *
 * 233's three shape laws say what NOT to build (each cost it a gate round):
 *   1. an even SCATTER reads as SPECKLE  -- salting blocks clears none of them
 *   2. an unwarped rim ring reads as an OFFSET HALO -- a hexDist field's
 *      boundary IS the plate's hexagon, by construction
 *   3. the warp must EXCEED the belt depth, or the city never touches the edge
 * ...and its post-mortem says the belt was SEED-FRAGILE: the noise decided both
 * the shape AND the AMOUNT, so seed 7 held 220 lots (PASS) and seed 42 held 161
 * (FAIL). 195: a procedural city must hold on EVERY seed.
 *
 * CANDIDATE: **top-K of a smooth field**, not a threshold on one.
 *   - a smooth field's top-K is its PEAKS => contiguous LOBES, never speckle (law 1)
 *   - the field is noise + a mild rim bias, so its boundary is the NOISE, not
 *     hexDist => it cannot trace the hexagon (law 2)
 *   - lobes hang off the rim with gaps between => the city still reaches the
 *     void on most bearings (law 3), for free
 *   - and K is a CONSTANT, so the AMOUNT held is identical on every seed while
 *     the SHAPE still wanders. The lottery that killed 233 is designed out.
 *
 * Reported per candidate K: the census COST (developed cells the belt sits on)
 * and the payoff in the units the EYE reads -- the largest CONTIGUOUS run of
 * undeveloped land in the outer plate (HEAD's is the control).
 *
 *   node probe-fringeshape.mjs
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(join(HERE, '../../../../solvista.html')).href;

const SEEDS = [7, 42, 1234, 99, 2024, 555];
const KS = [90, 120, 150, 180];
const RIMMAX = 11;          /* how far in from the rim a lobe may reach */

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
await p.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await p.goto(PAGE);
await p.waitForFunction(() => typeof window.__warp === 'function');

const out = await p.evaluate(({ SEEDS, KS, RIMMAX }) => {
  /* smooth value noise: bilinear over a coarse lattice of hashCell (the artifact
     has only white noise per cell, and white noise cannot make a lobe). */
  const vn = (fx, fy, s) => {
    const x0 = Math.floor(fx), y0 = Math.floor(fy), tx = fx - x0, ty = fy - y0;
    const sx = tx * tx * (3 - 2 * tx), sy = ty * ty * (3 - 2 * ty);
    const h = (a, b2) => hashCell(a, b2, s);
    const a = h(x0, y0) + (h(x0 + 1, y0) - h(x0, y0)) * sx;
    const c2 = h(x0, y0 + 1) + (h(x0 + 1, y0 + 1) - h(x0, y0 + 1)) * sx;
    return a + (c2 - a) * sy;
  };

  /* the largest contiguous component of UNDEVELOPED land in the outer plate --
     the payoff, in the units the eye actually reads (233: "green appears BETWEEN
     the buildings rather than replacing them" was the speckle FAIL). */
  const biggestWild = (isHeld) => {
    const seen = new Uint8Array(G * G);
    const wild = (x, y) => {
      if (!inB(x, y)) return false;
      const c = cells[idx(x, y)];
      if (c.t === T.WATER) return false;
      if (HEXR - hexDist(x, y, CTRX, CTRY) > RIMMAX + 3) return false;  /* outer plate only */
      return !DEV.has(c.t) && c.t !== T.ROAD || isHeld(x, y);
    };
    let best = 0, total = 0;
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const i0 = idx(x, y);
      if (seen[i0] || !wild(x, y)) continue;
      let n = 0; const st = [[x, y]]; seen[i0] = 1;
      while (st.length) {
        const [cx, cy] = st.pop(); n++;
        nbrs6(cx, cy, (a, b2) => {
          if (!inB(a, b2)) return;
          const i = idx(a, b2);
          if (!seen[i] && wild(a, b2)) { seen[i] = 1; st.push([a, b2]); }
        });
      }
      best = Math.max(best, n); total += n;
    }
    return { best, total };
  };

  const res = [];
  for (const seed of SEEDS) {
    playing = false;
    genWorld(seed);
    __warp(61);

    /* score every candidate cell, then take the top K. Identical construction to
       what would ship in genWorld -- so the sweep grades the real thing. */
    const cand = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      if (!inB(x, y)) continue;
      const c = cells[idx(x, y)];
      if (c.t === T.WATER) continue;
      const rim = HEXR - hexDist(x, y, CTRX, CTRY);
      if (rim > RIMMAX) continue;
      /* smooth noise + a mild pull toward the rim, so the lobes HANG OFF the
         edge instead of floating inland as islands */
      const n = vn(x * 0.16, y * 0.16, seedNum ^ 0x5A17);
      const pull = 1 - rim / RIMMAX;                 /* 1 at the rim, 0 at RIMMAX */
      cand.push([n * 0.75 + pull * 0.45, idx(x, y), x, y]);
    }
    cand.sort((a, b2) => b2[0] - a[0]);

    const head = biggestWild(() => false);
    const row = { seed, headWild: head.best, headWildTot: head.total, k: {} };

    for (const K of KS) {
      const held = new Set(cand.slice(0, K).map(v => v[1]));
      /* census cost: how many of the held cells does HEAD actually develop? */
      let cost = 0, rim0 = 0, rim0held = 0;
      for (const [, i, x, y] of cand.slice(0, K)) if (DEV.has(cells[i].t)) cost++;
      for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
        if (!inB(x, y)) continue;
        const c = cells[idx(x, y)]; if (c.t === T.WATER) continue;
        if (HEXR - hexDist(x, y, CTRX, CTRY) <= 2) { rim0++; if (held.has(idx(x, y))) rim0held++; }
      }
      const w = biggestWild((x, y) => held.has(idx(x, y)));
      row.k[K] = {
        cost, biggest: w.best, wildTot: w.total,
        rimFreePct: rim0 ? 100 * (1 - rim0held / rim0) : 0,
      };
    }
    res.push(row);
  }
  return res;
}, { SEEDS, KS, RIMMAX });

const mean = a => a.reduce((s, v) => s + v, 0) / a.length;

console.log('\n=== HEAD CONTROL — largest contiguous undeveloped run in the outer plate ===');
console.log('  seed   |  ' + out.map(r => String(r.seed).padStart(6)).join(' ') + '  |  mean');
console.log('  cells  |  ' + out.map(r => String(r.headWild).padStart(6)).join(' ') +
  `  |  ${mean(out.map(r => r.headWild)).toFixed(0)}`);

console.log('\n=== CANDIDATES — cost (developed cells held) vs payoff (biggest wild run) ===');
console.log('     K  |  cost: per seed                        mean  |  biggest wild run          mean  | rim-free%');
for (const K of KS) {
  const costs = out.map(r => r.k[K].cost);
  const bigs = out.map(r => r.k[K].biggest);
  const rf = mean(out.map(r => r.k[K].rimFreePct));
  console.log(`  ${String(K).padStart(4)}  |  ` + costs.map(c => String(c).padStart(5)).join(' ') +
    `   ${mean(costs).toFixed(0).padStart(6)}  |  ` + bigs.map(c => String(c).padStart(5)).join(' ') +
    `   ${mean(bigs).toFixed(0).padStart(6)}  |   ${rf.toFixed(0)}%`);
}

console.log('\n=== SEED SPREAD (233 died of this — the noise decided the AMOUNT, not just the shape) ===');
for (const K of KS) {
  const costs = out.map(r => r.k[K].cost);
  const bigs = out.map(r => r.k[K].biggest);
  console.log(`  K=${String(K).padStart(3)}   cost ${Math.min(...costs)}..${Math.max(...costs)} ` +
    `(${(Math.max(...costs) / Math.min(...costs)).toFixed(2)}x)   ` +
    `biggest-wild ${Math.min(...bigs)}..${Math.max(...bigs)} (${(Math.max(...bigs) / Math.min(...bigs)).toFixed(2)}x)`);
}
console.log('\n  (233: seed 7 held 220 lots and PASSED; seed 42 held 161 and FAILED.');
console.log('   A candidate is only shippable if its WORST seed clears the bar — 195/233.)\n');

await b.close();
