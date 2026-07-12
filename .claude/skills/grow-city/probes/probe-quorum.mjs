#!/usr/bin/env node
/* probe-quorum.mjs — GRADE THE QUORUM, NOT THE PROBABILITY.
 *
 * probe-towerroll proved the placement ROLL is 100% saturated on all 3 seeds (zero
 * still-eligible COM cells anywhere). So `p` cannot shape WHERE towers go -- only
 * ELIGIBILITY can, and eligibility is the quorum `com>=2`. A predicate cannot saturate.
 *
 * This sweeps candidate quorum formulas as a CONTINUOUS score, so `core` grades the bar:
 *
 *     HEAD :  com >= 2
 *     V<n> :  com + L*core >= K          (L = core lift, K = bar)
 *
 * Read the two ledgers a lever always has (206): the EFFECT (does a density gradient
 * appear?) AND the COST TO THE POPULATION (does the tower count / pop survive?).
 * 98's law -- HOLD THE MEAN: massing a city is not shrinking it.
 *
 *   node probe-quorum.mjs
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

const HEAD_COND = 'if(com>=2&&rng()<(0.14+0.20*back)*(0.5+c.val)){';
const src = readFileSync(SRC, 'utf8');
if (!src.includes(HEAD_COND)) { console.error('seam not found -- did the rule change?'); process.exit(1); }

/* L = core lift, K = bar.  HEAD is L=0, K=2. */
const VARIANTS = [
  { name: 'HEAD      com>=2', L: 0,   K: 2   },
  { name: 'V1  com+2.0*core>=2.0', L: 2.0, K: 2.0 },   /* pure ADD: rim unchanged, core relaxed */
  { name: 'V2  com+3.0*core>=2.0', L: 3.0, K: 2.0 },   /* pure ADD, wider core relaxation */
  { name: 'V3  com+3.0*core>=2.5', L: 3.0, K: 2.5 },   /* REDISTRIBUTE: rim needs 3, core needs ~0 */
  { name: 'V4  com+4.0*core>=2.5', L: 4.0, K: 2.5 },   /* REDISTRIBUTE, stronger core pull */
];

const SEEDS = [7, 42, 1234];
const WARP = 61;
const RINGS = [[0, 4], [5, 8], [9, 12], [13, 16], [17, 22], [23, 99]];

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
await p.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});

const out = [];
for (const v of VARIANTS) {
  const cond = v.L === 0
    ? HEAD_COND
    : `if(com+${v.L}*core>=${v.K}&&rng()<(0.14+0.20*back)*(0.5+c.val)){`;
  /* the rule reads `core`, which HEAD defines ABOVE the roll -- so no hoist needed */
  const file = join(tmpdir(), `sv-q-${v.L}-${v.K}.html`);
  writeFileSync(file, src.replace(HEAD_COND, cond));
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
      const bins = RINGS.map(() => ({ dev: 0, tow: 0, th: 0 }));
      let towD = [], devD = [];
      for (const i of HEXI) {
        const x = i % G, y = (i / G) | 0;
        const c = cells[i]; if (!c) continue;
        const d = hexDist(x, y, CBDX, CBDY);
        const bi = ringOf(d); if (bi < 0) continue;
        const B = bins[bi];
        if (DEV.has(c.t)) { B.dev++; devD.push(d); }
        if (c.t === T.TOWER) { B.tow++; B.th += c.th; towD.push(d); }
      }
      const mean = a => a.length ? a.reduce((s, z) => s + z, 0) / a.length : 0;
      return { bins, tow: towD.length, pop: stats.pop, meanTowD: mean(towD), meanDevD: mean(devD) };
    }, { RINGS, seed, WARP });
    per.push({ seed, ...r });
  }
  out.push({ v, per });
}
await b.close();

const pct = (t, d) => d ? (100 * t / d) : 0;

console.log('\nGRADING THE QUORUM  (world data; genWorld+warp 61; seeds 7/42/1234)');
console.log('TOWER % of developed land, per ring of hexDist from the CBD.');
console.log('The GRADIENT is the vector; TOWERS and POP are the COST (206: a lever has two ledgers).\n');

const hdr = '  ' + 'variant'.padEnd(24) + 'seed  ' +
  RINGS.map(([lo, hi]) => ((hi === 99 ? `${lo}+` : `${lo}-${hi}`)).padStart(7)).join('') +
  '   towers     pop   towD/devD';
console.log(hdr);
console.log('  ' + '-'.repeat(hdr.length - 2));

for (const { v, per } of out) {
  per.forEach((r, i) => {
    const cells = r.bins.map(B => `${pct(B.tow, B.dev).toFixed(1)}%`.padStart(7)).join('');
    const ratio = (r.meanTowD / r.meanDevD).toFixed(2);
    console.log('  ' + (i === 0 ? v.name : '').padEnd(24) + String(r.seed).padStart(4) + '  ' +
      cells + `   ${String(r.tow).padStart(6)}  ${String(r.pop).padStart(6)}   ${ratio.padStart(6)}`);
  });
  const tot = per.reduce((s, r) => s + r.tow, 0), pop = per.reduce((s, r) => s + r.pop, 0);
  const core = per.reduce((s, r) => s + pct(r.bins[0].tow + r.bins[1].tow, r.bins[0].dev + r.bins[1].dev), 0) / 3;
  const rim = per.reduce((s, r) => s + pct(r.bins[4].tow + r.bins[5].tow, r.bins[4].dev + r.bins[5].dev), 0) / 3;
  console.log('  ' + ''.padEnd(24) + ' SUM' + ' '.repeat(3) +
    `core(0-8) ${core.toFixed(1)}%   rim(17+) ${rim.toFixed(1)}%   CONTRAST ${(core / (rim || 1)).toFixed(2)}x` +
    `      ${String(tot).padStart(4)}  ${String(pop).padStart(6)}`);
  console.log('');
}

console.log('READ: HEAD contrast ~1x = towers sit where the LAND sits (no downtown).');
console.log('      A fix must raise CONTRAST *without* collapsing towers/pop (206: a hard gate starves the rule).');
console.log('      towD/devD ~1.00 = sprinkled; <1 = clustered toward the core.');
