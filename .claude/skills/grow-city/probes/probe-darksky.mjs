/* Does the observatory stand on the DARK RIM its own label promises?
 *
 * CIVICDESC.observatory : 'A dome out on the dark rim of the city, open to the night.'
 * L1720 comment         : '...the observatory wants the dark rim'
 * L8277 comment         : '...the observatory the dark rim'
 * CIVHRS.observatory=1  : '...whose whole night is just beginning'
 * The siting rule (L2300): the SAME uniform random scatter as the police station.
 *
 * PURE WORLD DATA — no render, no clock, no noise floor, nothing to stub (217).
 * The quantity is `c.lit`, which is not a proxy: genWorld builds it from
 * hexDist-to-CBD (LITR=34 broad glow + CORESIG core bump) and it is drawBuilding's
 * ONLY window-light term, so it IS the night frame's brightness at that lot. It is
 * static after genWorld, so 231's "the city grew up in front of it" cannot bite.
 *
 * The rule picks a UNIFORM RANDOM lot from its eligible pool, so HEAD's observatory
 * lit must be ~= the pool MEAN. That is the baseline, and it needs no threshold
 * invented (236: the defect is its own control).
 *
 * CAPTURE = (poolMean - obsLit) / (poolMean - poolMin): the share of the available
 * darkness the rule actually captures. A random rule scores ~0.
 *
 * POSITIVE CONTROL (248): the AQUARIUM is sited by a REAL rule (it wants the
 * shoreline). Scored the same way on ITS OWN predicate (distance to water), it must
 * come back strongly non-random -- that is what proves the rig can SEE a siting
 * preference, so the observatory's flat number is a real flatness and not a dead probe.
 */
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { homedir } from 'os';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = 'file://' + join(HERE, '../../../../solvista.html');   /* relative to the probe (never absolute) */

const SEEDS = [42, 7, 1234, 99, 2024, 5];
const SRC = process.env.SRC || '';

const br = await chromium.launch();
const page = await br.newPage({ viewport: { width: 1400, height: 900 } });
await page.addInitScript(() => {                       /* 213: stub BEFORE the page's own script */
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await page.goto(ART);

const rows = [];
for (const seed of SEEDS) {
  const r = await page.evaluate((seed) => {
    /* --- the world at 2018, the year the rule RUNS (231: pick on the young terrain) ---
       ONE warp, never two. __warp(n) ticks `while(year<year+n)`, so warping 43.5 and then
       17.5 lands a DIFFERENT number of ticks than warping 61 in one go — it builds a
       different city, and every other instrument here (the census, the camera, Part B)
       uses a single __warp(61). A prefix warp IS on that trajectory; a two-hop warp is not. */
    genWorld(seed);
    __warp(44);                                        /* 1974 + 44 -> 2018, the year the dome is sited */
    const yearPool = year;

    /* the rule's OWN eligible pool, reproduced exactly: rcIn(2,SHOREX-1,2,G-2) + EMPTY|RES + roadNear */
    const pool = [];
    for (const i of HEXI) {
      const x = i % G, y = (i / G) | 0, c = cells[i];
      if (x < 2 || x > SHOREX - 1 || y < 2 || y > G - 2) continue;
      if (c.t !== T.EMPTY && c.t !== T.RES) continue;
      if (!roadNear(x, y)) continue;
      pool.push({ x, y, lit: c.lit, d: hexDist(x, y, CBDX, CBDY) });
    }
    const lits = pool.map(p => p.lit);
    const poolMean = lits.reduce((a, b) => a + b, 0) / lits.length;
    const poolMin = Math.min(...lits);
    const darkest = pool.reduce((a, b) => b.lit < a.lit ? b : a, pool[0]);
    const zeroPlateau = lits.filter(v => v <= poolMin + 1e-9).length;

    /* how far is water from a typical inland lot? (the aquarium's control baseline) */
    const wdist = (x, y) => {
      for (let r = 1; r <= 12; r++) if (countAround(x, y, r, n => n.t === T.WATER || n.t === T.BEACH || n.t === T.DUNE || n.t === T.SHOREPARK) > 0) return r;
      return 13;
    };
    const poolW = pool.reduce((a, p) => a + wdist(p.x, p.y), 0) / pool.length;

    /* --- and the RENDER year, rebuilt from the same seed with the single warp the
           census and the camera use, so all three instruments see ONE city --- */
    genWorld(seed); __warp(61);
    let obs = null, aq = null;
    for (const i of HEXI) {
      const c = cells[i];
      if (c.t !== T.CIVIC) continue;
      const x = i % G, y = (i / G) | 0;
      /* the dome's slit azimuth (158) — hashCell on salt 0x0B5E. An argmin sharing that
         salt would SELECT for a low hash and pin sd to -1 in every city, killing it. */
      if (c.kind === 'observatory') obs = { x, y, lit: c.lit, d: hexDist(x, y, CBDX, CBDY),
        sd: hashCell(x, y, seedNum ^ 0x0B5E) < 0.5 ? -1 : 1 };
      if (c.kind === 'aquarium') aq = { x, y, w: wdist(x, y) };
    }
    return {
      year: Math.round(year), yearPool: Math.round(yearPool * 10) / 10,
      pool: pool.length, poolMean, poolMin, zeroPlateau,
      darkD: darkest.d, obs, aq, poolW, CORER, LITR
    };
  }, seed);
  rows.push({ seed, ...r });
}
await br.close();

const f = (v, n = 3) => v === undefined || v === null ? ' -- ' : v.toFixed(n);
console.log(`\nARTIFACT: ${SRC || 'HEAD (as shipped)'}`);
console.log(`\nOBSERVATORY -- does it stand in the dark?   (c.lit: 0 = dark rim, 1 = blazing CBD)`);
console.log(`  the rule picks a UNIFORM RANDOM lot from its pool, so obs.lit should read ~= pool mean\n`);
console.log(`seed   pool  pool.mean  pool.min(darkest)  OBS.lit   CAPTURE   obs.d  darkest.d  in CORE?`);
let cap = [];
for (const r of rows) {
  const c = (r.poolMean - r.obs.lit) / (r.poolMean - r.poolMin);
  cap.push(c);
  const core = r.obs.d <= r.CORER;
  console.log(`${String(r.seed).padStart(4)}  ${String(r.pool).padStart(5)}   ${f(r.poolMean)}      ${f(r.poolMin)} (x${r.zeroPlateau})` +
    `      ${f(r.obs.lit)}    ${f(c, 2).padStart(5)}   ${String(r.obs.d).padStart(4)}     ${String(r.darkD).padStart(4)}    ${core ? 'YES <-- downtown' : 'no'}`);
}
const mc = cap.reduce((a, b) => a + b, 0) / cap.length;
console.log(`\n  mean CAPTURE of the available darkness = ${f(mc, 3)}   (a uniform random rule scores ~0.00)`);
console.log(`  mean obs.lit ${f(rows.reduce((a, r) => a + r.obs.lit, 0) / rows.length)}  vs  mean pool ${f(rows.reduce((a, r) => a + r.poolMean, 0) / rows.length)}` +
  `  vs  darkest available ${f(rows.reduce((a, r) => a + r.poolMin, 0) / rows.length)}`);

const sds = rows.map(r => r.obs.sd);
console.log(`\n  dome SLIT AZIMUTH (158) across seeds: [${sds.join(', ')}]  -- ` +
  (new Set(sds).size > 1 ? 'VARIES (ok)' : 'ALL THE SAME <-- the tie-break salt has collided with the dome draw'));

console.log(`\nPOSITIVE CONTROL (248) -- the AQUARIUM, which HAS a real siting rule (it wants the shore).`);
console.log(`  Same rig, its own predicate. If this is flat too, the PROBE is dead, not the observatory.\n`);
console.log(`seed   aquarium dist-to-water   a random inland lot's   ratio`);
for (const r of rows) {
  console.log(`${String(r.seed).padStart(4)}          ${String(r.aq ? r.aq.w : '--').padStart(2)}                  ${f(r.poolW, 1).padStart(5)}          ${r.aq ? f(r.poolW / r.aq.w, 1) + 'x closer' : '--'}`);
}

/* ---------------------------------------------------------------------------
 * PART B -- IS THE SCHOOL DROP MINE, OR IS IT THE CHAOS? (231's law)
 *
 * The 3-seed census read `schools 21 -> 18` (-14%) and `CIVIC 84 -> 81`. There is no
 * mechanism for this change to COST the city a school: the dome moves OUT of the
 * fabric (freeing central land) and pop went UP (which EARNS schools -- the rule is
 * `stats.pop > 3500*(schools+1)`). But the school rule is rng()-gated, and moving one
 * cell of terrain reshuffles the whole downstream stream for decades. So widen the
 * sample: 10 seeds, PAIRED, pure world data at 2035.
 *   sign flips seed to seed, mean ~0  => chaotic reshuffle; the 3-seed matrix drew badly.
 *   most seeds losing, mean clearly down => DIRECTIONAL, a real cost, and I must mitigate.
 * ------------------------------------------------------------------------- */
import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
const HEADPATH = '/tmp/solvista-darksky-HEAD.html';
writeFileSync(HEADPATH, execSync('git show HEAD:solvista.html', { cwd: HERE, maxBuffer: 1 << 28 }));

const CSEEDS = [7, 42, 1234, 99, 2025, 5150, 3, 808, 61423, 777];
const builds = { HEAD: 'file://' + HEADPATH, patch: ART };
const cout = {};
const br2 = await chromium.launch();
for (const [name, url] of Object.entries(builds)) {
  const pg = await br2.newPage({ viewport: { width: 1400, height: 900 } });
  await pg.addInitScript(() => { let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
  await pg.goto(url);
  cout[name] = [];
  for (const seed of CSEEDS) {
    cout[name].push(await pg.evaluate((sd) => {
      playing = false;
      genWorld(sd); __warp(61);
      let schools = 0, civic = 0, dev = 0, obsLit = null;
      for (const i of HEXI) {
        const c = cells[i];
        if (DEV.has(c.t)) dev++;
        if (c.t !== T.CIVIC) continue;
        civic++;
        if (c.kind === 'school') schools++;
        if (c.kind === 'observatory') obsLit = c.lit;
      }
      return { schools, civic, dev, pop: Math.round(window.__census().pop), obsLit };
    }, seed));
  }
  await pg.close();
}
await br2.close();

console.log(`\n\n=== PART B: is the school drop MINE, or the CHAOS? (10 seeds, paired, 2035) ===\n`);
console.log(`seed      schools        CIVIC       pop %    developed %    OBS.lit HEAD->patch`);
let ssum = 0, sdown = 0, sup = 0, psum2 = 0, dsum2 = 0;
CSEEDS.forEach((s, i) => {
  const h = cout.HEAD[i], p = cout.patch[i];
  const ds = p.schools - h.schools;
  const pp = (p.pop - h.pop) / h.pop * 100, pd = (p.dev - h.dev) / h.dev * 100;
  ssum += ds; psum2 += pp; dsum2 += pd;
  if (ds < 0) sdown++; if (ds > 0) sup++;
  console.log(`${String(s).padEnd(7)} ${String(h.schools).padStart(3)} -> ${String(p.schools).padStart(3)} (${(ds >= 0 ? '+' : '') + ds})`.padEnd(28) +
    `${String(h.civic).padStart(3)} -> ${String(p.civic).padStart(3)}`.padEnd(13) +
    `${pp >= 0 ? '+' : ''}${pp.toFixed(1)}%`.padStart(7) +
    `${pd >= 0 ? '+' : ''}${pd.toFixed(1)}%`.padStart(13) +
    `        ${f(h.obsLit)} -> ${f(p.obsLit)}`);
});
const n2 = CSEEDS.length;
console.log(`\nmean school delta ${(ssum / n2).toFixed(2)}   (down on ${sdown}/${n2} seeds, UP on ${sup}/${n2})`);
console.log(`mean pop ${(psum2 / n2).toFixed(2)}%   mean developed ${(dsum2 / n2).toFixed(2)}%`);
console.log(`mean OBS.lit  HEAD ${f(cout.HEAD.reduce((a, r) => a + r.obsLit, 0) / n2)}  ->  patch ${f(cout.patch.reduce((a, r) => a + r.obsLit, 0) / n2)}`);
console.log(`\n  ~half down / mean near 0 => chaotic reshuffle, the 3-seed census drew badly.`);
console.log(`  most seeds down / mean clearly negative => DIRECTIONAL: the dome is costing schools.`);
