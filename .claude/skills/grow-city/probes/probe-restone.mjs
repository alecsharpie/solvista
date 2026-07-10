#!/usr/bin/env node
/* probe-restone.mjs — the shape probe for cue (f): RES body colour + roof hash.
 *
 * Two questions, both answered from the LIVE page's own hashCell/cells/seedNum
 * (bare-named inside page.evaluate: top-level `const`/`let` are lexical, NOT on
 * window — iter 96's law). It scores the OLD scheme and the NEW scheme in the
 * same run, so one pass on either revision reports before AND after.
 *
 *   (1) corr(body is cream, height field v) over every RES cell — the defect
 *       iter 99 removed from MID (corr 0.76-0.79 -> 0.19-0.31).
 *   (2) cross-seed roof agreement: for cells that are RES in BOTH seeds, how
 *       often do the two cities paint the same roof colour? A literal salt
 *       gives 100% (invariant breach); a seed-salted hash gives chance.
 *
 *   node probe-restone.mjs
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(join(HERE, '../../../../solvista.html')).href;

const SEEDS = [7, 42, 1234];
const WARP = 61; /* 2035 */

const b = await chromium.launch();
const p = await b.newPage();
const perSeed = [];

for (const seed of SEEDS) {
  await p.goto(`${PAGE}?seed=${seed}&warp=${WARP}&t=0.35`);
  await p.waitForTimeout(400);
  perSeed.push(await p.evaluate(() => {
    const out = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      if (!inB(x, y)) continue;
      const c = cells[idx(x, y)];
      if (c.t !== T.RES) continue;
      const v = c.v;

      /* --- OLD: body restates height; roof hash uses a LITERAL salt --- */
      const oBody = v < 0.5 ? 'terra' : 'cream';
      const orv = hashCell(x, y, 7);
      const oRoof = orv < 0.45 ? (oBody === 'terra' ? 'terraDk' : 'terra')
                  : (orv < 0.72 ? 'creamDk' : (orv < 0.9 ? 'sage' : 'coral'));
      const oChim = hashCell(x, y, 5) < 0.3;

      /* --- NEW: independent seed-salted draw mixed in, mirroring MID --- */
      const mv = hashCell(x, y, seedNum ^ 0x5C31);
      const tone = mv * 0.72 + v * 0.28;
      const nBody = tone > 0.56 ? 'cream' : (tone > 0.27 ? 'terra' : 'sandDk');
      const nrv = hashCell(x, y, seedNum ^ 0x7A9F);
      let nRoof = nrv < 0.45 ? (nBody === 'terra' ? 'terraDk' : 'terra')
                : (nrv < 0.72 ? 'creamDk' : (nrv < 0.9 ? 'sage' : 'coral'));
      if (nRoof === nBody) nRoof = 'terraDk';
      const nChim = hashCell(x, y, seedNum ^ 0x5C05) < 0.3;

      out.push({ k: x + ',' + y, v, oBody, oRoof, oChim, nBody, nRoof, nChim });
    }
    return out;
  }));
}

/* point-biserial corr between a boolean flag and the continuous v */
const corr = (rows, flag) => {
  const n = rows.length;
  const xs = rows.map(flag ? r => (flag(r) ? 1 : 0) : () => 0);
  const ys = rows.map(r => r.v);
  const mx = xs.reduce((a, c) => a + c, 0) / n, my = ys.reduce((a, c) => a + c, 0) / n;
  let sxy = 0, sxx = 0, syy = 0;
  for (let i = 0; i < n; i++) { const dx = xs[i] - mx, dy = ys[i] - my; sxy += dx * dy; sxx += dx * dx; syy += dy * dy; }
  return sxy / (Math.sqrt(sxx * syy) || 1);
};
const share = (rows, f) => {
  const m = {};
  for (const r of rows) m[f(r)] = (m[f(r)] || 0) + 1;
  return Object.entries(m).sort((a, b2) => b2[1] - a[1])
    .map(([k, n]) => `${k} ${(100 * n / rows.length).toFixed(1)}%`).join(' · ');
};

console.log('\n=== (1) corr(body is cream, height field v) — RES, era 2035');
console.log('    seed        OLD      NEW');
for (let i = 0; i < SEEDS.length; i++) {
  const rows = perSeed[i];
  const o = corr(rows, r => r.oBody === 'cream'), nw = corr(rows, r => r.nBody === 'cream');
  console.log(`    ${String(SEEDS[i]).padEnd(8)} ${o.toFixed(3).padStart(7)}  ${nw.toFixed(3).padStart(7)}   (n=${rows.length})`);
}

console.log('\n=== (1b) body-colour share');
for (let i = 0; i < SEEDS.length; i++) {
  console.log(`    seed ${String(SEEDS[i]).padEnd(6)} OLD  ${share(perSeed[i], r => r.oBody)}`);
  console.log(`    seed ${String(SEEDS[i]).padEnd(6)} NEW  ${share(perSeed[i], r => r.nBody)}`);
}

console.log('\n=== (2) cross-seed agreement on cells that are RES in both seeds');
console.log('    (100% = every city paints the identical pattern = invariant breach)');
for (let i = 0; i < SEEDS.length; i++) for (let j = i + 1; j < SEEDS.length; j++) {
  const A = new Map(perSeed[i].map(r => [r.k, r]));
  const both = perSeed[j].map(r => [A.get(r.k), r]).filter(([a]) => a);
  const agree = (f) => (100 * both.filter(([a, c]) => f(a) === f(c)).length / both.length).toFixed(1) + '%';
  console.log(`    ${SEEDS[i]} vs ${SEEDS[j]}  (n=${both.length} shared RES cells)`);
  console.log(`       roof     OLD ${agree(r => r.oRoof).padStart(6)}   NEW ${agree(r => r.nRoof).padStart(6)}`);
  console.log(`       chimney  OLD ${agree(r => r.oChim).padStart(6)}   NEW ${agree(r => r.nChim).padStart(6)}`);
}
console.log('');
await b.close();
