#!/usr/bin/env node
/* probe-firespark.mjs — DOES THE WILDFIRE CA EVER RUN?  (probe BEFORE you design)
 *
 * The seam. Four separate places promise Solvista burns:
 *   placard L145      "Fires jump block to block until the 1991 firehouse; the engine still patrols."
 *   CIVICDESC         firehouse: "Engines behind roll-up doors, ready for the fires on the hill."
 *   VKIND.fireeng     "Lights on, heading to the smoke."
 *   TILEDESC[T.BURNT] "Scorched ground after a wildfire. The scrub takes it back."
 * ...and the CA behind them is textbook: c.fire=4 counts down, spreads to neighbours at
 * fire===2 (forest 0.26 / RES 0.18 pre-92), leaves T.BURNT, which regrows to EMPTY at age>6.
 * There is a fire ENGINE with its own `atfire` duty and a fireDoor() BFS to route it.
 *
 * And the census tile histogram reads **BURNT: 0** in every seed and era of the artifact's
 * life, and probe-firehost reads **0 burning ticks on 3 seeds x 820 ticks**. The whole
 * system has never once run. (263: a CA can be textbook-correct, beautifully drawn, and
 * output a flat ZERO nobody has questioned — and the zero IS the defect, stated, with no
 * threshold to invent.)
 *
 * WHY. 263's law says a spreading rule is SPARK + SPREAD + REFRACTORY, and the spark's
 * SAMPLE SPACE is usually wrong before its rate is. Here the spread and the refractory are
 * fine. The spark is:
 *     if(year<2030 && rng()<0.03){ const[x,y,c]=rc();  if(c.t===T.FOREST && rng()<0.4) ... }
 * `rc()` is a UNIFORM LOTTERY over all ~3,400 live cells, and FOREST is ~77 of them — so the
 * rule looks for a 2% host by drawing one ticket a tick. That is 267's law exactly: a tiny
 * host cannot be found by a uniform sample of a large space, and the RATE is irrelevant until
 * the SPACE is right.
 *
 * Part A (pure world data — no render, no clock, no pixels, NO NOISE FLOOR AT ALL) drives the
 * artifact's OWN tick() for the full 61 years and reports, per seed:
 *   - IGNITIONS, EPISODES, hexes burnt, ticks-with-anything-burning   <- the headline; HEAD = 0
 *   - the eligible POOL for each spark branch, and the shipped lottery's per-tick hit rate
 *   - BURNT standing at the three census years
 *
 * THE POSITIVE CONTROL (248/250) IS THE BLOOM CA — the correct sibling excitable medium, in
 * the same tick(), which 263 fixed with the very idiom this lap is about to copy. It MUST come
 * back alive. A dead rig and a dead rule print the same zero, and the bloom column is the only
 * thing that can tell them apart.
 *
 * THE MUST-NOT-MOVE COLUMN (250) is the core: developed / pop / roads at 2035. Fire WRITES
 * TERRAIN, so unlike the bloom it cannot be inert — 233's law says price a fabric-removing
 * vector against the core-collapse gate BEFORE designing it, not after.
 *
 * BUILD-AGNOSTIC: it only drives the artifact's own tick() and reads world data, so ONE file
 * grades HEAD and every candidate build via SRC= — no source swap, no cross-build floor (230).
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const { chromium } = await import(
  join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.mjs')
);

const SRC = process.env.SRC || join(HERE, '../../../../solvista.html');
const PAGE = pathToFileURL(SRC).href;
const SEEDS = [7, 42, 1234, 99, 2024, 5];

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
await p.addInitScript(() => {                       /* 213: stub the PRNG before the page's script */
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});

console.log(`SRC = ${SRC}\n`);

const rows = [];
for (const seed of SEEDS) {
  await p.goto(`${PAGE}?seed=${seed}`);
  await p.waitForTimeout(250);

  const r = await p.evaluate((seed) => {
    playing = false;
    genWorld(seed);                                  /* start at 1974 and drive the real rule */

    /* census years we must report BURNT at, and the core metrics at 2035 */
    const MARKS = [1985, 2005, 2035];
    const out = { marks: {}, sparks: 0, spreads: 0, burntHexes: 0, burningTicks: 0, episodes: [] };

    let prevFire = new Set(), ep = null;
    let poolForest = 0, poolTimber = 0, poolSamples = 0, poolScans = 0;
    let bloomLitTicks = 0, bloomPeak = 0;            /* THE POSITIVE CONTROL (248) */

    const liveFires = () => {
      const s = new Set();
      for (const i of HEXI) if (cells[i].fire > 0) s.add(i);
      return s;
    };

    /* ⚠ tick() does NOT advance the calendar — __warp does (`year += 0.45/6; tick()`).
       A probe that drives tick() itself must drive the CLOCK itself, or `while(year<Y)`
       never terminates. Step the year exactly as __warp does, so this run is on the same
       trajectory the census and every screenshot take (259: a PREFIX warp is on it). */
    const YPT = 0.45 / 6;
    let mi = 0;
    while (year < 2035.5) {
      const before = liveFires();
      year += YPT; tick();
      const after = liveFires();

      /* ⚠ AN "IGNITION" IS NOT A SPARK. A newly-burning cell is EITHER a spark (the rule
         lit it out of nothing) OR a SPREAD (a burning neighbour jumped to it) — and the
         claim on the placard is precisely the second one ("fires jump block to block").
         The first cut of this probe counted every newly-lit cell as an ignition, which
         cannot tell the two apart and so could not grade the thing it was built to grade.
         Split them by asking what was burning NEXT DOOR last tick: a cell with a burning
         neighbour is a JUMP; a cell alone in the dark is a SPARK. */
      for (const i of after) {
        if (before.has(i)) continue;
        const x = i % G, y = (i / G) | 0;
        let hadBurningNbr = false;
        nbrs6(x, y, (a, bb) => {
          const n = cellAt(a, bb);
          if (n && before.has(idx(a, bb))) hadBurningNbr = true;
        });
        if (hadBurningNbr) out.spreads++; else out.sparks++;
      }

      if (after.size > 0) {
        out.burningTicks++;
        if (!ep) ep = { ticks: 0, hexes: new Set(), year: Math.round(year) };
        ep.ticks++;
        for (const i of after) ep.hexes.add(i);
      } else if (ep) {
        out.episodes.push({ ticks: ep.ticks, hexes: ep.hexes.size, year: ep.year });
        ep = null;
      }

      /* the eligible POOL each spark branch is hunting for, and the bloom control.
         Sampled every 8th tick — a pool size is a slow-moving world statistic, and a
         per-tick scan of 3,400 cells x 820 ticks x 6 seeds is what hung the first cut. */
      poolSamples++;
      if (poolSamples % 8 === 0) {
        let f = 0, tb = 0, bl = 0;
        for (const i of HEXI) {
          const c = cells[i];
          if (c.t === T.FOREST) f++;
          if ((c.t === T.RES || c.t === T.COM) && c.age > 26) tb++;
          if (c.bloom > 0) bl++;
        }
        poolForest += f; poolTimber += tb; poolScans++;
        if (bl > 0) bloomLitTicks++;
        if (bl > bloomPeak) bloomPeak = bl;
      }

      while (mi < MARKS.length && year >= MARKS[mi]) {
        let burnt = 0, dev = 0, pop = 0, roads = 0, forest = 0;
        for (const i of HEXI) {
          const c = cells[i];
          if (c.t === T.BURNT) burnt++;
          if (DEV.has(c.t)) dev++;
          if (c.t === T.ROAD) roads++;
          if (c.t === T.FOREST) forest++;
        }
        recount(); pop = stats.pop;
        out.marks[MARKS[mi]] = { burnt, dev, pop, roads, forest };
        mi++;
      }
    }
    if (ep) out.episodes.push({ ticks: ep.ticks, hexes: ep.hexes.size, year: ep.year });
    for (const e of out.episodes) out.burntHexes += e.hexes;

    out.poolForest = poolForest / poolScans;
    out.poolTimber = poolTimber / poolScans;
    out.live = HEXI.length;
    out.ticks = poolSamples;
    out.bloomLitTicks = bloomLitTicks;
    out.bloomPeak = bloomPeak;
    return out;
  }, seed);

  rows.push({ seed, ...r });
}
await b.close();

const f2 = (n) => n.toFixed(2);
console.log('A. DOES IT BURN?  (the artifact\'s own tick(), 1974 -> 2035, full run)\n');
console.log('  seed | SPARKS  JUMPS  episodes  biggest  mean-size |  BURNT@85/05/35 | BLOOM ctrl');
console.log('  -----+--------------------------------------------+-----------------+-----------');
for (const r of rows) {
  const m = (y) => String(r.marks[y]?.burnt ?? '-').padStart(2);
  const sizes = r.episodes.map((e) => e.hexes);
  const big = sizes.length ? Math.max(...sizes) : 0;
  const mean = sizes.length ? (sizes.reduce((a, x) => a + x, 0) / sizes.length) : 0;
  console.log(
    `  ${String(r.seed).padStart(4)} | ${String(r.sparks).padStart(6)} ${String(r.spreads).padStart(6)} ` +
    `${String(r.episodes.length).padStart(9)} ${String(big).padStart(8)} ${mean.toFixed(2).padStart(10)} |  ` +
    `${m(1985)} / ${m(2005)} / ${m(2035)}     | ${String(r.bloomLitTicks).padStart(4)}t/pk${r.bloomPeak}`
  );
}

console.log('\nB. WHY — THE SPARK IS A LOTTERY FOR A TINY HOST (267)\n');
console.log('  seed | live cells | mean FOREST pool  P(rc hits)  | mean TIMBER pool  P(rc hits) | expected ignitions/city');
console.log('  -----+------------+-------------------------------+------------------------------+------------------------');
for (const r of rows) {
  const pf = r.poolForest / r.live, pt = r.poolTimber / r.live;
  /* the shipped rates: forest 0.03 * P(host) * 0.4 ; timber 0.08 * P(host) * ~0.5/0.12 */
  const eF = 0.03 * pf * 0.4 * r.ticks * 0.92;      /* year<2030 covers ~92% of the run */
  const eT = 0.08 * pt * 0.28 * r.ticks * 0.53;     /* year<2006, blended 0.5/0.12 */
  console.log(
    `  ${String(r.seed).padStart(4)} | ${String(r.live).padStart(10)} | ` +
    `${f2(r.poolForest).padStart(16)}  ${(pf * 100).toFixed(2).padStart(8)}%  | ` +
    `${f2(r.poolTimber).padStart(15)}  ${(pt * 100).toFixed(2).padStart(8)}%  | ` +
    `${f2(eF + eT).padStart(22)}`
  );
}

console.log('\nC. THE MUST-NOT-MOVE COLUMN (250) — the core at 2035, and the forest the fire eats\n');
console.log('  seed |  developed    pop   roads  FOREST');
console.log('  -----+---------------------------------');
for (const r of rows) {
  const m = r.marks[2035] || {};
  console.log(
    `  ${String(r.seed).padStart(4)} | ${String(m.dev).padStart(9)} ${String(m.pop).padStart(6)} ` +
    `${String(m.roads).padStart(7)} ${String(m.forest).padStart(7)}`
  );
}

const totIgn = rows.reduce((a, r) => a + r.sparks, 0);
const totJump = rows.reduce((a, r) => a + r.spreads, 0);
const bloomOK = rows.every((r) => r.bloomLitTicks > 0);
console.log(`\n  HEADLINE: ${totIgn} SPARKS and ${totJump} JUMPS (block-to-block) across ${rows.length} seeds x full 61-year runs.`);
console.log(`  BLOOM POSITIVE CONTROL: ${bloomOK ? 'ALIVE on every seed — the rig can see an excitable medium.' : '*** DEAD — THE RIG IS BROKEN, NOT THE CITY ***'}`);
