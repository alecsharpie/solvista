#!/usr/bin/env node
/* probe-towerroll.mjs — IS THE TOWER PLACEMENT ROLL SATURATED?
 *
 * 217 prescribed the fix: "give the tower PLACEMENT roll a `core` term, as 98 gave
 * the height one." But the comment sitting ON the seam (L1476-1484) says iter 98
 * ALREADY tried exactly that and measured it as a dead lever:
 *
 *   "It is a weak lever: ~800 ticks x ks(240) picks sample every cell ~60 times,
 *    so this test SATURATES, and nearly any lasting COM with a quorum towers
 *    eventually whatever p is. Steepening it toward the core moved mean tower
 *    spread by 0.9 hexes and core share by 1 point -- and cost 21% of the towers."
 *
 * A step-back should name the SUSPECT, not the FIX (198). Before building 217's
 * prescription, measure its premise.
 *
 * SATURATION TEST (pure world data, post-hoc, no source edit):
 *   The rule fires on:  c.t===COM && !seaside(x) && com>=2   (com counts COM|TOWER nbrs)
 *   So at end state, a cell that STILL satisfies that predicate and is STILL COM is a
 *   cell the roll passed over every time it was sampled.
 *     leftover% = eligible-but-still-COM / (eligible-but-still-COM + TOWER)
 *   leftover ~ 0  =>  the roll SATURATED: every eligible cell towered, p is irrelevant,
 *                     and tower placement is decided ENTIRELY by ELIGIBILITY (where COM
 *                     sits + the quorum). Scaling p by `core` cannot make a downtown.
 *   leftover large => p is live and 217's prescription can work.
 *
 * Also reports, per ring: the ELIGIBLE pool, so we can see whether a redistribution
 * that HOLDS THE TOWER COUNT (98's law, applied to placement) is even available.
 *
 *   node probe-towerroll.mjs
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
const RINGS = [[0, 4], [5, 8], [9, 12], [13, 16], [17, 22], [23, 99]];

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
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
    genWorld(seed);
    __warp(WARP);

    const ringOf = d => RINGS.findIndex(([lo, hi]) => d >= lo && d <= hi);
    const bins = RINGS.map(() => ({ com: 0, elig: 0, tow: 0, dev: 0, q: 0, qn: 0 }));

    let totElig = 0, totTow = 0;
    /* quorum histogram over ALL still-COM cells, to see how much headroom a
       graded-quorum lever would have */
    const qhist = [0, 0, 0, 0, 0, 0, 0];

    for (const i of HEXI) {
      const x = i % G, y = (i / G) | 0;
      const c = cells[i]; if (!c) continue;
      const d = hexDist(x, y, CBDX, CBDY);
      const bi = ringOf(d); if (bi < 0) continue;
      const B = bins[bi];
      if (DEV.has(c.t)) B.dev++;

      if (c.t === T.TOWER) { B.tow++; totTow++; }

      if (c.t === T.COM) {
        B.com++;
        const com = countAround(x, y, 1, n => n.t === T.COM || n.t === T.TOWER);
        qhist[Math.min(6, com)]++;
        if (!(x > SHOREX - 4) && com >= 2) { B.elig++; totElig++; }   /* tick()'s local seaside() */
      }
    }
    return { bins, totElig, totTow, qhist, cbd: [CBDX, CBDY] };
  }, { RINGS, seed, WARP });

  rows.push({ seed, ...r });
}
await b.close();

console.log('\nIS THE TOWER PLACEMENT ROLL SATURATED?   (world data; genWorld+warp 61)');
console.log('"eligible" = still COM, !seaside, com>=2  ->  a cell the roll REFUSED every time it sampled it.\n');

for (const r of rows) {
  const sat = 100 * r.totTow / (r.totTow + r.totElig);
  console.log(`  seed ${r.seed}  CBD ${r.cbd}   TOWERS ${r.totTow}   still-eligible COM ${r.totElig}   => roll converted ${sat.toFixed(1)}% of the eligible pool`);
  console.log('    ring     devel     COM   eligible  TOWER   tow%of-dev   tow/(tow+elig)');
  console.log('    -------------------------------------------------------------------------');
  r.bins.forEach((B, i) => {
    const [lo, hi] = RINGS[i];
    const lbl = (hi === 99 ? `${lo}+` : `${lo}-${hi}`).padStart(5);
    const dpct = B.dev ? (100 * B.tow / B.dev) : 0;
    const conv = (B.tow + B.elig) ? (100 * B.tow / (B.tow + B.elig)) : 0;
    console.log(`    ${lbl}  ${String(B.dev).padStart(6)}  ${String(B.com).padStart(6)}  ${String(B.elig).padStart(8)}  ${String(B.tow).padStart(6)}   ${dpct.toFixed(1).padStart(6)}%       ${conv.toFixed(1).padStart(6)}%`);
  });
  console.log(`    quorum histogram over still-COM cells (com = COM|TOWER nbrs):  ` +
    r.qhist.map((n, q) => `${q}:${n}`).join('  '));
  console.log('');
}

console.log('READ: tow/(tow+elig) ~ 100%  =>  the roll SATURATES. p is a DEAD lever: placement is decided');
console.log('      by ELIGIBILITY (where COM sits x the com>=2 quorum), not by the probability.');
console.log('      In that case 217/98\'s "give placement a core term" CANNOT make a downtown, and the');
console.log('      real lever is the QUORUM (eligibility), graded by core -- which does not saturate.');
