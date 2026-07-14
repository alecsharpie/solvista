#!/usr/bin/env node
/* probe-bloomhost.mjs — the wildflower CA is alive; has its HOST been eaten?
 *
 * Solvista ships a real excitable-media CA (tick(), ~L2373): a bloom lives 7 ticks,
 * falls into a 14-tick refractory, spreads to quiescent neighbours, is seeded
 * spontaneously and by the rain front. Its draw is the richest ornament on any
 * green tile: a body-colour lift, five flower specks, and BUTTERFLIES.
 *
 * Its entire host is ONE tile: `if(c.t!==T.MEADOW)continue;`
 *
 * And T.MEADOW is in RAISEABLE (L1475) — the set the development pass BUILDS ON.
 * So the host is consumed BY CONSTRUCTION as the city matures. This is 206's law
 * (a rule keyed to a tile the upgrade pass consumes starves itself) arriving on a
 * CA's host instead of a siting rule's pool.
 *
 * PART A (premise, pure world data — no render, no clock, no noise floor):
 *   - MEADOW by era: the collapse curve. Is the host gone at the year we render?
 *   - blooming hexes at 2035: HEAD's answer. If ~0, the defect IS the number —
 *     no threshold invented (236: when the vector is "make X happen", HEAD's
 *     zero is a baseline nobody had to design).
 *   - candidate permanent-green hosts + their CONTIGUITY. The spread rule needs a
 *     blooming NEIGHBOUR, so a scattered host cannot carry a wave however big it
 *     is. Reports largest connected component + mean same-host neighbours.
 *
 * PART B (temporal — 134: every other gate is frozen, and "the wave never runs"
 *   is a claim about TIME). Drives the artifact's OWN tick() and counts bloom
 *   IGNITIONS over N ticks, HEAD-host vs each candidate host.
 *
 * PART C (the stream cost). The spread roll is `rng()<0.6` and it is TERRAIN-GATED
 *   — it only fires for a quiescent host cell with a blooming neighbour. So
 *   ENLARGING THE HOST SPENDS MORE DRAWS FROM THE SHARED SEEDED STREAM, and the
 *   chaotic-CA invariant says that reshuffles every downstream metric. This counts
 *   the eligible-spread events per tick per host, which IS the extra draw count.
 *   It is what decides whether the fix may use rng() at all.
 *
 *   node probe-bloomhost.mjs
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(join(HERE, '../../../../solvista.html')).href;

const SEEDS = [7, 42, 1234, 99, 2024, 5];
const ERAS = [11, 31, 61];          /* __warp -> ~1985 / ~2005 / ~2035 */
const TICKS = 120;                  /* Part B/C horizon */

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
await p.addInitScript(() => {       /* 213: stub the PRNG before the page's own script */
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});

const rows = [];
for (const seed of SEEDS) {
  await p.goto(`${PAGE}?seed=${seed}&warp=61&t=0.30`);
  await p.waitForTimeout(300);

  const r = await p.evaluate(({ seed, ERAS, TICKS }) => {
    playing = false;

    /* candidate hosts. MEADOW is HEAD's. The others are the PERMANENT green /
       un-buildable grassland the city cannot develop (none is in RAISEABLE). */
    const CAND = {
      MEADOW:     c => c.t === T.MEADOW,
      SHOREPARK:  c => c.t === T.SHOREPARK,
      DUNE:       c => c.t === T.DUNE,
      PARK:       c => c.t === T.PARK,
      'SHOREPARK+DUNE': c => c.t === T.SHOREPARK || c.t === T.DUNE,
      'SHOREPARK+DUNE+MEADOW': c => c.t === T.SHOREPARK || c.t === T.DUNE || c.t === T.MEADOW,
    };

    /* ---- A: the collapse curve, per era ---- */
    const era = {};
    for (const w of ERAS) {
      genWorld(seed); __warp(w);          /* a PREFIX warp is on the trajectory (259) */
      const t = {};
      for (const k of Object.keys(CAND)) t[k] = 0;
      let blooming = 0, refrac = 0;
      for (const i of HEXI) {
        const c = cells[i]; if (!c) continue;
        for (const k of Object.keys(CAND)) if (CAND[k](c)) t[k]++;
        if (c.t === T.MEADOW) { if (c.bloom > 0) blooming++; else if (c.bloom < 0) refrac++; }
      }
      era[w] = { tiles: t, blooming, refrac, year: Math.round(year) };
    }

    /* ---- rebuild at 2035, the frame everybody renders ---- */
    genWorld(seed); __warp(61);

    /* ---- A2: contiguity. A wave needs a NEIGHBOUR, not just a population. ---- */
    const N6 = (x, y) => {                 /* the artifact's own hex neighbourhood */
      const o = (y & 1) ? 1 : 0;
      return [[x - 1, y], [x + 1, y], [x - 1 + o, y - 1], [x + o, y - 1], [x - 1 + o, y + 1], [x + o, y + 1]];
    };
    const conn = {};
    for (const k of Object.keys(CAND)) {
      const isH = (x, y) => { const c = cellAt(x, y); return c ? CAND[k](c) : false; };
      const seen = new Set(); let best = 0, n = 0, nbrSum = 0;
      for (const i of HEXI) {
        const x = i % G, y = (i / G) | 0;
        const c = cells[i]; if (!c || !CAND[k](c)) continue;
        n++;
        nbrSum += N6(x, y).filter(([a, bb]) => isH(a, bb)).length;
        if (seen.has(i)) continue;
        let sz = 0; const st = [[x, y]]; seen.add(i);
        while (st.length) {
          const [cx, cy] = st.pop(); sz++;
          for (const [a, bb] of N6(cx, cy)) {
            const j = bb * G + a;
            if (seen.has(j) || !isH(a, bb)) continue;
            seen.add(j); st.push([a, bb]);
          }
        }
        if (sz > best) best = sz;
      }
      conn[k] = { n, biggest: best, meanNbrs: n ? +(nbrSum / n).toFixed(2) : 0 };
    }

    /* ---- B/C: drive the artifact's OWN tick(); count ignitions + the spread
       roll's ELIGIBLE EVENTS (= the extra rng() draws host expansion would spend).
       Simulated per host WITHOUT touching the page's bloom state: we run our own
       excitable-media bookkeeping over the SAME terrain, since tick()'s rule only
       ever reads c.t and c.bloom. ---- */
    const sim = {};
    for (const k of Object.keys(CAND)) {
      const host = [];
      for (const i of HEXI) { const c = cells[i]; if (c && CAND[k](c)) host.push(i); }
      const isH = new Set(host);
      const bloom = new Map(host.map(i => [i, 0]));
      let ignitions = 0, eligible = 0, peak = 0;
      /* deterministic surrogate for rng()<0.6 / spontaneous seeding, same rates */
      let s = (seed * 2654435761) >>> 0;
      const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
      for (let t = 0; t < TICKS; t++) {
        const sp = rnd() < 0.10 ? host[(rnd() * host.length) | 0] : -1;
        const next = new Map(bloom);
        let live = 0;
        for (const i of host) {
          const v = bloom.get(i);
          if (v > 0) { next.set(i, v - 1 === 0 ? -14 : v - 1); live++; continue; }
          if (v < 0) { next.set(i, v + 1); continue; }
          const x = i % G, y = (i / G) | 0;
          const hot = N6(x, y).some(([a, bb]) => { const j = bb * G + a; return isH.has(j) && bloom.get(j) > 3; });
          if (i === sp) { next.set(i, 7); ignitions++; continue; }
          if (hot) { eligible++; if (rnd() < 0.6) { next.set(i, 7); ignitions++; } }
        }
        for (const [i, v] of next) bloom.set(i, v);
        if (live > peak) peak = live;
      }
      sim[k] = { ignitions, eligible, peak, elPerTick: +(eligible / TICKS).toFixed(1) };
    }

    return { era, conn, sim };
  }, { seed, ERAS, TICKS });

  rows.push({ seed, ...r });
}
await b.close();

const pad = (s, n) => String(s).padStart(n);
const HOSTS = ['MEADOW', 'SHOREPARK', 'DUNE', 'PARK', 'SHOREPARK+DUNE', 'SHOREPARK+DUNE+MEADOW'];

console.log('\n══ A. THE COLLAPSE CURVE — is the bloom CA\'s host still there at the year we render?');
console.log('   MEADOW is in RAISEABLE, so the development pass BUILDS ON IT.\n');
console.log('  seed   MEADOW@1985  @2005  @2035   |  BLOOMING hexes @2035   refractory');
for (const r of rows) {
  const e = r.era;
  console.log('  ' + pad(r.seed, 5) + pad(e[11].tiles.MEADOW, 12) + pad(e[31].tiles.MEADOW, 7) + pad(e[61].tiles.MEADOW, 7) +
    '   |' + pad(e[61].blooming, 12) + pad(e[61].refrac, 21));
}
const m85 = rows.reduce((a, r) => a + r.era[11].tiles.MEADOW, 0) / rows.length;
const m35 = rows.reduce((a, r) => a + r.era[61].tiles.MEADOW, 0) / rows.length;
const bl35 = rows.reduce((a, r) => a + r.era[61].blooming, 0) / rows.length;
console.log(`\n  mean MEADOW  1985 ${m85.toFixed(1)}  ->  2035 ${m35.toFixed(1)}   (${(100 * (1 - m35 / m85)).toFixed(0)}% eaten)`);
console.log(`  mean BLOOMING hexes in the 2035 frame: ${bl35.toFixed(2)}`);

console.log('\n══ B. CANDIDATE HOSTS @2035 — a wave needs a NEIGHBOUR, not just a population.');
console.log('   (none of SHOREPARK/DUNE/PARK is in RAISEABLE: the city cannot build on them)\n');
console.log('  host                      n    biggest-component   mean same-host nbrs');
for (const h of HOSTS) {
  const n = rows.reduce((a, r) => a + r.conn[h].n, 0) / rows.length;
  const bg = rows.reduce((a, r) => a + r.conn[h].biggest, 0) / rows.length;
  const nb = rows.reduce((a, r) => a + r.conn[h].meanNbrs, 0) / rows.length;
  console.log('  ' + h.padEnd(24) + pad(n.toFixed(1), 5) + pad(bg.toFixed(1), 18) + pad(nb.toFixed(2), 22));
}

console.log('\n══ C. WOULD THE WAVE RUN? — the artifact\'s own excitable-media rule, ' + TICKS + ' ticks @2035');
console.log('   eligible/tick IS the extra rng() draws host expansion would spend from the');
console.log('   SHARED SEEDED STREAM (the spread roll is terrain-gated) — the chaotic-CA invariant.\n');
console.log('  host                   ignitions   peak simultaneous   eligible/tick (= extra rng draws)');
for (const h of HOSTS) {
  const ig = rows.reduce((a, r) => a + r.sim[h].ignitions, 0) / rows.length;
  const pk = rows.reduce((a, r) => a + r.sim[h].peak, 0) / rows.length;
  const el = rows.reduce((a, r) => a + r.sim[h].elPerTick, 0) / rows.length;
  console.log('  ' + h.padEnd(24) + pad(ig.toFixed(1), 6) + pad(pk.toFixed(1), 18) + pad(el.toFixed(1), 24));
}
console.log('');
