/* probe-solarfield — does "far fields go solar" EVER fire? (and why not)
 *
 * The placard promises "Warehouses become lofts AND FAR FIELDS GO SOLAR once the
 * rent says so." 267 fixed the loft clause. The solar clause has produced ZERO
 * SOLARF on every seed at every era for the artifact's entire life — and iters
 * 107/108 banked it as the last genuinely open dead-rule question, then nobody
 * went back.
 *
 * Two suspects, and 267's law says a dead rule usually has BOTH:
 *
 *  (a) THE SPACE (263). The rule is an rc() lottery: ks(6)=9 picks/tick over
 *      ~3,400 live cells, then rng()<0.02. Expected conversions over the 2012+
 *      window ~= ticks * 9 * (pool/|HEXI|) * 0.02 — so it needs ~60 eligible
 *      cells to yield ONE panel. Its own neighbours (vineyard, orchard) WALK.
 *
 *  (b) THE POOL (107). VINEYARD (1990+) and ORCHARD (1985+) sit 4 and 12 lines
 *      BELOW it, take the SAME host (FARM), on a STRICTLY WEAKER dev clause
 *      (no DEV within 1, vs solar's no DEV within 2 — every far field is also a
 *      near-ish field), start 22 and 27 years earlier, and WALK every cell while
 *      solar runs a lottery. 107's law: a rule can be dead because another rule's
 *      precondition is strictly weaker on the same host.
 *
 * Pure world data: no render, no clock, no pixels, no noise floor, nothing to stub.
 *
 * POSITIVE CONTROLS (248): VINEYARD and ORCHARD are correct sibling conversion
 * rules on the SAME HOST in the SAME tick(). They provably work. A flat SOLARF
 * column beside live vineyard/orchard columns convicts the CITY, not the rig.
 * MUST-NOT-MOVE (250): FARM itself — a conversion rule must not eat its own host.
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = join(HERE, '../../../../solvista.html');
const SRC = process.env.SRC || ART;

const SEEDS = [42, 7, 1234, 99, 2024, 555];
const ERAS = [2012, 2020, 2035];

const b = await chromium.launch();
const p = await b.newPage();
await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await p.goto(pathToFileURL(SRC).href);
await p.waitForTimeout(400);

/* ---- A. the census question + the pool, decomposed clause by clause ---- */
console.log('=== A. does it fire? (SOLARF) — with its two correct siblings as positive controls ===');
console.log('       seed  era |  SOLARF   FARM  VINE   ORCH |  farNoDev2  poolNow  everElig | E[conv] 218-rate');
const A = [];
for (const seed of SEEDS) {
  for (const era of ERAS) {
    const r = await p.evaluate(([seed, era]) => {
      playing = false;
      genWorld(seed);
      window.__warp(era - year);              /* ONE prefix warp (259) */
      let solarf = 0, farm = 0, vine = 0, orch = 0, farNoDev2 = 0, stillElig = 0;
      for (const i of HEXI) {
        const c = cells[i], x = i % G, y = (i / G) | 0;
        if (c.t === T.SOLARF) solarf++;
        if (c.t === T.VINEYARD) vine++;
        if (c.t === T.ORCHARD) orch++;
        if (c.t === T.FARM) {
          farm++;
          /* the rule's own predicate, minus the roll */
          if (countAround(x, y, 2, n => DEV.has(n.t)) === 0) { farNoDev2++; stillElig++; }
        }
      }
      return { solarf, farm, vine, orch, farNoDev2, stillElig, hexi: HEXI.length, KS: (typeof KS === 'number' ? KS : 1.46) };
    }, [seed, era]);

    /* the lottery's own arithmetic, in the rule's own constants */
    const ticks = Math.max(0, (era - 2012) / 0.075);
    const picks = Math.round(6 * r.KS);
    const Econv = ticks * picks * (r.stillElig / r.hexi) * 0.02;
    /* 218's conversion rate: converted / (converted + still eligible) */
    const rate = (r.solarf + r.stillElig) ? (100 * r.solarf / (r.solarf + r.stillElig)) : NaN;
    A.push({ seed, era, ...r, Econv, rate });
    console.log(
      `      ${String(seed).padStart(5)} ${era} | ${String(r.solarf).padStart(7)} ${String(r.farm).padStart(6)} ` +
      `${String(r.vine).padStart(5)} ${String(r.orch).padStart(5)} | ${String(r.farNoDev2).padStart(10)} ` +
      `${String(r.stillElig).padStart(8)} ${'—'.padStart(9)} | ${Econv.toFixed(2).padStart(7)} ${(isNaN(rate) ? '—' : rate.toFixed(1) + '%').padStart(8)}`);
  }
}

/* ---- B. the POOL over time: was there EVER anything to convert? ---- */
/* 107's law: is the pool starved by the siblings that take the same host on a
   strictly weaker clause? Count, at 2012, how many far farms exist — and how many
   farms the orchard/vineyard have ALREADY eaten by then. */
console.log('\n=== B. did the SIBLINGS eat the pool? (state at 2012, when solar first opens) ===');
console.log('       seed |  FARM  far(noDev2)  |  VINE  ORCH (already converted, from 1990/1985)');
for (const seed of SEEDS) {
  const r = await p.evaluate((seed) => {
    playing = false; genWorld(seed); window.__warp(2012 - year);
    let farm = 0, far = 0, vine = 0, orch = 0;
    for (const i of HEXI) {
      const c = cells[i], x = i % G, y = (i / G) | 0;
      if (c.t === T.VINEYARD) vine++;
      if (c.t === T.ORCHARD) orch++;
      if (c.t === T.FARM) { farm++; if (countAround(x, y, 2, n => DEV.has(n.t)) === 0) far++; }
    }
    return { farm, far, vine, orch };
  }, seed);
  console.log(`      ${String(seed).padStart(5)} | ${String(r.farm).padStart(5)} ${String(r.far).padStart(12)}  | ` +
              `${String(r.vine).padStart(5)} ${String(r.orch).padStart(5)}`);
}

/* ---- C. the HONEST sweep (231): the rule RUNS from 2012 and is JUDGED at 2035 ---- */
/* A sweep graded on the mature 2035 plate is a LEAK — by then development has eaten
   the far-farm pool (s99 51->21, s7 12->0), so it grades the candidates on land the
   rule never got to see. Drive tick() from 2012 and apply the candidate at every
   tick, exactly as the shipped walk would. Read the result at 2035.
   EFFECT: SOLARF per city on the WORST seed (233).  COST: does it eat the FARM host? */
console.log('\n=== C. HONEST sweep — WALKED hash-gated pass, applied EVERY TICK from 2012 (231) ===');
console.log('   gate |' + SEEDS.map(s => ('s' + s).padStart(8)).join('') + ' |  worst   mean | FARM@2035 (mean, HEAD=44.7)');
for (const gate of [0.15, 0.25, 0.35, 0.50, 0.70]) {
  const out = [], farms = [];
  for (const seed of SEEDS) {
    const r = await p.evaluate(([seed, gate]) => {
      playing = false; genWorld(seed);
      window.__warp(2012 - year);           /* to the year the rule opens */
      /* now step the sim ourselves, applying the candidate rule each tick — so it
         sees the young countryside, not the mature one (231). */
      while (year < 2035) {
        year += 0.45 / 6; tick();           /* __warp's exact order: bump year, THEN tick */
        for (const i of HEXI) {
          const c = cells[i], x = i % G, y = (i / G) | 0;
          if (c.t !== T.FARM) continue;
          if (countAround(x, y, 2, n => DEV.has(n.t)) === 0
              && hashCell(x, y, seedNum ^ 0x5A17) < gate) { c.t = T.SOLARF; c.age = 0; }
        }
      }
      let hit = 0, farm = 0;
      for (const i of HEXI) {
        if (cells[i].t === T.SOLARF) hit++;
        if (cells[i].t === T.FARM) farm++;
      }
      return { hit, farm };
    }, [seed, gate]);
    out.push(r.hit); farms.push(r.farm);
  }
  const worst = Math.min(...out), mean = out.reduce((a, c) => a + c, 0) / out.length;
  const fmean = farms.reduce((a, c) => a + c, 0) / farms.length;
  console.log(`   ${gate.toFixed(2)} |` + out.map(v => String(v).padStart(8)).join('') +
              ` | ${String(worst).padStart(6)} ${mean.toFixed(1).padStart(6)} | ${fmean.toFixed(1).padStart(8)}`);
}

/* ---- D2. the ACCRETION design: one field breaks ground, the array creeps along the fence ---- */
/* D showed a hash-gated WALK ships SPECKLE (biggest run 1 on 4 seeds in 6). A solar
   farm is an ARRAY, so the rule needs a NEIGHBOUR (263), a guaranteed SPARK (233 —
   a per-cell spark hash starves seed 42, which owns only 3 far farms), and a BOUND
   (282 — an unbounded spread fills its whole pool; seed 99's is 51 hexes).
   Candidate: each tick, score every far farm; prefer one ADJACENT to existing solar;
   convert ONE, at a TICKN-salted rate, until the array reaches SOLARMAX.
   Graded honestly (231): the rule runs from 2012, judged at 2035. */
console.log('\n=== D2. ACCRETION sweep — guaranteed spark + fence-line spread + size cap ===');
console.log('  cap rate |' + SEEDS.map(s => ('s' + s).padStart(7)).join('') + ' | worst  mean | bigRun(min/mean) | FARM (HEAD 44.7)');
for (const [cap, rate] of [[5, 0.08], [8, 0.08], [8, 0.04], [12, 0.08]]) {
  const cnt = [], big = [], farms = [];
  for (const seed of SEEDS) {
    const r = await p.evaluate(([seed, cap, rate]) => {
      playing = false; genWorld(seed); window.__warp(2012 - year);
      let TK = 0;
      while (year < 2035) {
        year += 0.45 / 6; tick(); TK++;
        /* --- the candidate rule, exactly as it would ship --- */
        let solar = 0, best = -1, bestScore = -1;
        for (const i of HEXI) {
          const c = cells[i];
          if (c.t === T.SOLARF) { solar++; continue; }
          if (c.t !== T.FARM) continue;
          const x = i % G, y = (i / G) | 0;
          if (countAround(x, y, 2, n => DEV.has(n.t)) > 0) continue;   /* a FAR field, or nothing */
          const adj = countAround(x, y, 1, n => n.t === T.SOLARF) > 0;
          const s = (adj ? 1e6 : 0) + hashCell(x, y, seedNum ^ 0x5A17);
          if (s > bestScore) { bestScore = s; best = i; }
        }
        if (best >= 0 && solar < cap
            && hashCell(best % G, (best / G) | 0, seedNum ^ 0x5A17 ^ TK) < rate) {
          const c = cells[best]; c.t = T.SOLARF; c.h = 0; c.th = 0; c.age = 0;
        }
      }
      /* read out: count, biggest connected run, farms left */
      const seen = new Set(), runs = [];
      const isS = i => cells[i] && cells[i].t === T.SOLARF;
      let total = 0, farm = 0;
      for (const i of HEXI) {
        if (cells[i].t === T.FARM) farm++;
        if (!isS(i) || seen.has(i)) continue;
        let n = 0; const st = [i]; seen.add(i);
        while (st.length) {
          const j = st.pop(); n++;
          const x = j % G, y = (j / G) | 0;
          for (const [dx, dy] of nbrDirs(y)) {
            const nx = x + dx, ny = y + dy;
            if (!inB(nx, ny)) continue;
            const k = idx(nx, ny);
            if (isS(k) && !seen.has(k)) { seen.add(k); st.push(k); }
          }
        }
        runs.push(n); total += n;
      }
      return { total, big: runs.length ? Math.max(...runs) : 0, farm };
    }, [seed, cap, rate]);
    cnt.push(r.total); big.push(r.big); farms.push(r.farm);
  }
  const mean = a => a.reduce((x, c) => x + c, 0) / a.length;
  console.log(`  ${String(cap).padStart(3)} ${rate.toFixed(2)} |` + cnt.map(v => String(v).padStart(7)).join('') +
    ` | ${String(Math.min(...cnt)).padStart(5)} ${mean(cnt).toFixed(1).padStart(5)} | ` +
    `${String(Math.min(...big)).padStart(6)}/${mean(big).toFixed(1).padStart(5)}     | ${mean(farms).toFixed(1).padStart(8)}`);
}

/* ---- D. does it read as an ARRAY or as SPECKLE? (263: count the COMPONENT, not the tiles) ---- */
/* A solar farm is an array. A hash gate is white noise, so if the far-farm host is
   fragmented the rule ships scattered singletons and the feature is speckle (255/266).
   Count the connected components of the SOLARF it actually lays down. */
console.log('\n=== D. array or speckle? connected components of the shipped SOLARF (gate 0.35) ===');
console.log('       seed | SOLARF | biggest run  mean run  singletons');
for (const seed of SEEDS) {
  const r = await p.evaluate(([seed, gate]) => {
    playing = false; genWorld(seed); window.__warp(2012 - year);
    while (year < 2035) {
      year += 0.45 / 6; tick();
      for (const i of HEXI) {
        const c = cells[i], x = i % G, y = (i / G) | 0;
        if (c.t !== T.FARM) continue;
        if (countAround(x, y, 2, n => DEV.has(n.t)) === 0
            && hashCell(x, y, seedNum ^ 0x5A17) < gate) { c.t = T.SOLARF; c.age = 0; }
      }
    }
    /* flood-fill the SOLARF cells */
    const seen = new Set(), runs = [];
    const isS = i => { const c = cells[i]; return c && c.t === T.SOLARF; };
    for (const i of HEXI) {
      if (!isS(i) || seen.has(i)) continue;
      let n = 0; const stack = [i]; seen.add(i);
      while (stack.length) {
        const j = stack.pop(); n++;
        const x = j % G, y = (j / G) | 0;
        for (const [dx, dy] of nbrDirs(y)) {
          const nx = x + dx, ny = y + dy;
          if (!inB(nx, ny)) continue;
          const k = idx(nx, ny);
          if (isS(k) && !seen.has(k)) { seen.add(k); stack.push(k); }
        }
      }
      runs.push(n);
    }
    const total = runs.reduce((a, c) => a + c, 0);
    return { total, big: runs.length ? Math.max(...runs) : 0,
             mean: runs.length ? total / runs.length : 0,
             ones: runs.filter(v => v === 1).length };
  }, [seed, 0.35]);
  console.log(`      ${String(seed).padStart(5)} | ${String(r.total).padStart(6)} | ` +
              `${String(r.big).padStart(11)} ${r.mean.toFixed(1).padStart(9)} ${String(r.ones).padStart(11)}`);
}

await b.close();
