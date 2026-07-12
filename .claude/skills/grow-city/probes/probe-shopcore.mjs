#!/usr/bin/env node
/* probe-shopcore.mjs — DOES THE COMMERCIAL LAYER KNOW WHERE DOWNTOWN IS?
 *
 * 218 proved the TOWER placement roll is a DEAD LEVER (100% converted on every seed:
 * `p` sets timing, never placement) and named the real seam one layer up: towers rise
 * ONLY on COM, and COM is sited by
 *
 *     shop = (roads>=2 && dev>=1 && rng()<0.45) || (coms>=1 && rng()<0.3)
 *
 * -- corner lots and neighbours. Nothing in it knows where the CBD is, so a uniform
 * commercial layer FORCES a uniform skyline whatever the tower rule does.
 *
 * PART A -- 218's LAW FIRST: print this roll's conversion rate before tuning it.
 *   The tower roll saturates because a COM cell STAYS COM and is re-picked ~60x.
 *   The shop fork is inside the develop branch, so the cell leaves EMPTY/MEADOW the
 *   moment it fires: it should be ONE-SHOT. Measure it -- don't assume it. If cells
 *   reach the fork more than once, `p` is dead here too and only the PREDICATE can steer.
 *
 * PART B -- the variant sweep, on both of 206's ledgers at once:
 *   EFFECT = tower/COM COUNT core vs rim  (218's law: the eye counts MASS, not a ratio)
 *   COST   = total COM, total towers, pop (98: HOLD THE MEAN -- massing is not shrinking)
 *
 *   PREFERENCE, NOT GATE (206): both rolls are scaled by m(core)=A+B*core, clamped to 1.
 *   The rim keeps a real chance; the core gets a strong one.
 *
 *   node probe-shopcore.mjs
 */
import { homedir } from 'node:os';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = join(HERE, '../../../../solvista.html');

const HEAD_FORK = `        const shop=(roads>=2&&dev>=1&&rng()<0.45)||(coms>=1&&rng()<0.3);`;
const src = readFileSync(SRC, 'utf8');
if (!src.includes(HEAD_FORK)) { console.error('seam not found -- did the shop rule change?'); process.exit(1); }

/* m(core) = A + B*core, applied to BOTH rolls, clamped to 1.
   Draw COUNT is identical to HEAD (one rng() per roll, same short-circuit guards),
   so the fork itself is stream-neutral; downstream reshuffles because the TILE differs. */
/* ROUND 2. Round 1 swept m=A+B*core with A<1 and EVERY variant LOST core towers
   (42 -> 29/38/32/33) and 14-27% of the pop: with mean core ~0.1 over developing land,
   A<1 makes m<1 nearly everywhere, so it CUT COM city-wide -- and COM is the tower
   substrate, so fewer COM => fewer towers => -240 pop apiece. The rim fell faster than
   the core, which flatters the RATIO and is exactly 218's sin.
   So: PURE ADDITION. m = 1 + B*core, never below 1. The rim keeps HEAD's rule byte for
   byte; only the core is lifted. R4 widens the falloff instead of steepening it. */
const VARIANTS = [
  { name: 'HEAD   0.45 / 0.30 flat', A: 1, B: 0 },
  { name: 'R1  m=1+1.0*core', A: 1, B: 1.0 },
  { name: 'R2  m=1+2.0*core', A: 1, B: 2.0 },
  { name: 'R3  m=1+3.5*core', A: 1, B: 3.5 },
  { name: 'R4  m=1+2.0*core, R=1.6*CORER', A: 1, B: 2.0, wide: 1.6 },
];

const SEEDS = [7, 42, 1234];
const WARP = 61;
const RINGS = [[0, 4], [5, 8], [9, 12], [13, 16], [17, 22], [23, 99]];

const forkFor = v => {
  if (v.B === 0) return HEAD_FORK;
  const R = v.wide ? `(${v.wide}*CORER)` : 'CORER';
  const m = `(${v.A}+${v.B}*ccore)`;
  return `        const ccore=clamp(1-hexDist(x,y,CBDX,CBDY)/${R},0,1);\n` +
         `        const shop=(roads>=2&&dev>=1&&rng()<Math.min(1,0.45*${m}))||(coms>=1&&rng()<Math.min(1,0.3*${m}));`;
};

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
await p.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});

/* ---------------- PART A: is the fork one-shot, or does it saturate? ---------------- */
/* Instrument by counting, per cell, how many times it reaches the fork. Also count the
   cells still sitting EMPTY/MEADOW next to a road at the end -- the "still eligible"
   pool that the tower probe found to be ZERO (the tell of a saturated roll). */
const instr = src.replace(HEAD_FORK,
  `        window.__forkHits=window.__forkHits||{}; const _k=x+','+y;\n` +
  `        window.__forkHits[_k]=(window.__forkHits[_k]||0)+1;\n` + HEAD_FORK);
const fileA = join(tmpdir(), 'sv-shopcore-A.html');
writeFileSync(fileA, instr);

console.log('\nPART A -- 218\'s LAW: what is this roll\'s CONVERSION RATE?');
console.log('  A roll that converts ~100% of its eligible pool is a DEAD LEVER (p sets timing, not placement).');
console.log('  The tower roll read 100.0% on all 3 seeds. The shop fork is inside the develop branch, so it');
console.log('  SHOULD be one-shot -- measure it.\n');
console.log('  seed   fork evals   distinct cells   max hits/cell   still-eligible EMPTY/MEADOW nbr-road');
console.log('  ' + '-'.repeat(94));

for (const seed of SEEDS) {
  await p.goto(`${pathToFileURL(fileA).href}?seed=${seed}&warp=${WARP}&t=0.30`);
  await p.waitForTimeout(350);
  const r = await p.evaluate(({ seed, WARP }) => {
    playing = false;
    window.__forkHits = {};
    genWorld(seed);
    __warp(WARP);
    const hits = Object.values(window.__forkHits);
    const evals = hits.reduce((s, z) => s + z, 0);
    /* the "still eligible" pool: the develop pass's own precondition, unconverted */
    let elig = 0;
    for (const i of HEXI) {
      const x = i % G, y = (i / G) | 0, c = cells[i]; if (!c) continue;
      if ((c.t === T.EMPTY || c.t === T.MEADOW) && !c.corr &&
          countAround(x, y, 2, n => n.t === T.ROAD) > 0) elig++;
    }
    return { evals, distinct: hits.length, max: Math.max(0, ...hits), elig };
  }, { seed, WARP });
  console.log('  ' + String(seed).padStart(4) + String(r.evals).padStart(13) +
    String(r.distinct).padStart(17) + String(r.max).padStart(16) + String(r.elig).padStart(30));
}
console.log('\n  READ: max hits/cell == 1  =>  ONE-SHOT fork. The cell leaves EMPTY the instant it fires,');
console.log('        so p CANNOT saturate here and IS a live lever on the COM/RES mix. (Contrast the');
console.log('        tower roll, where the cell stays COM and is re-picked ~60x until it converts.)');

/* ---------------- PART B: the variant sweep ---------------- */
const out = [];
for (const v of VARIANTS) {
  const file = join(tmpdir(), `sv-shopcore-${v.A}-${v.B}-${v.seedOnly ? 's' : 'b'}.html`);
  writeFileSync(file, src.replace(HEAD_FORK, forkFor(v)));
  const URL = pathToFileURL(file).href;

  const per = [];
  for (const seed of SEEDS) {
    await p.goto(`${URL}?seed=${seed}&warp=${WARP}&t=0.30`);
    await p.waitForTimeout(350);
    const r = await p.evaluate(({ RINGS, seed, WARP }) => {
      playing = false;
      genWorld(seed);
      __warp(WARP);
      const ringOf = d => RINGS.findIndex(([lo, hi]) => d >= lo && d <= hi);
      const bins = RINGS.map(() => ({ dev: 0, com: 0, tow: 0 }));
      let com = 0, tow = 0, towD = [], devD = [];
      for (const i of HEXI) {
        const x = i % G, y = (i / G) | 0, c = cells[i]; if (!c) continue;
        const d = hexDist(x, y, CBDX, CBDY);
        const bi = ringOf(d); if (bi < 0) continue;
        const B = bins[bi];
        if (DEV.has(c.t)) { B.dev++; devD.push(d); }
        if (c.t === T.COM) { B.com++; com++; }
        if (c.t === T.TOWER) { B.tow++; tow++; towD.push(d); }
      }
      const mean = a => a.length ? a.reduce((s, z) => s + z, 0) / a.length : 0;
      return { bins, com, tow, pop: stats.pop, walk: stats.walkPct,
               meanTowD: mean(towD), meanDevD: mean(devD) };
    }, { RINGS, seed, WARP });
    per.push({ seed, ...r });
  }
  out.push({ v, per });
}
await b.close();

console.log('\n\nPART B -- THE SWEEP.  TOWER COUNT per ring of hexDist from the CBD (218: the eye counts MASS,');
console.log('not a ratio -- the rim carries ~20x more land, so a share can improve while the frame gets worse).');
console.log('EFFECT = core vs rim COUNT.   COST = total COM / towers / pop (98: hold the mean).\n');

const hdr = '  ' + 'variant'.padEnd(30) + 'seed' +
  RINGS.map(([lo, hi]) => ((hi === 99 ? `${lo}+` : `${lo}-${hi}`)).padStart(7)).join('') +
  '     COM  towers     pop   towD/devD';
console.log(hdr);
console.log('  ' + '-'.repeat(hdr.length - 2));

for (const { v, per } of out) {
  per.forEach((r, i) => {
    const cells = r.bins.map(B => String(B.tow).padStart(7)).join('');
    const ratio = (r.meanTowD / r.meanDevD).toFixed(2);
    console.log('  ' + (i === 0 ? v.name : '').padEnd(30) + String(r.seed).padStart(4) +
      cells + `  ${String(r.com).padStart(6)}  ${String(r.tow).padStart(6)}  ${String(r.pop).padStart(6)}   ${ratio.padStart(6)}`);
  });
  const sum = k => per.reduce((s, r) => s + r[k], 0);
  const ring = (k) => RINGS.map((_, j) => per.reduce((s, r) => s + r.bins[j][k], 0));
  const band = (k, a, b) => per.reduce((s, r) => s + r.bins[a][k] + r.bins[b][k], 0);
  console.log('  ' + '(3 seeds) DEV land'.padEnd(30) + '    ' + ring('dev').map(n => String(n).padStart(7)).join(''));
  console.log('  ' + '(3 seeds) COM'.padEnd(30) + '    ' + ring('com').map(n => String(n).padStart(7)).join(''));
  console.log('  ' + ''.padEnd(30) + ' SUM  ' +
    `towers core(0-8) ${String(band('tow', 0, 1)).padStart(3)}  vs rim(17+) ${String(band('tow', 4, 5)).padStart(3)}` +
    `   |  COM core ${String(band('com', 0, 1)).padStart(3)} vs rim ${String(band('com', 4, 5)).padStart(3)}` +
    `   |  COM ${String(sum('com')).padStart(4)}  TOW ${String(sum('tow')).padStart(4)}  POP ${String(sum('pop')).padStart(6)}`);
  console.log('');
}

console.log('READ: HEAD has MORE towers on the rim than in the core -- that is "no downtown", in counts.');
console.log('      A fix must move MASS inward while HOLDING total COM/towers/pop (206: a gate that');
console.log('      starves the rule is worse than the bug). towD/devD <1 = towers sit closer in than land does.');
