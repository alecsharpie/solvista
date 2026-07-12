#!/usr/bin/env node
/* probe-crownsweep.mjs — the skyline is set by TWO rules; sweep BOTH clauses.
 *
 * 217's law: when a rule decides both WHETHER and HOW MUCH, a fix to one clause is
 * mistaken for a fix to the phenomenon. Here it is one quantity (c.th) written by TWO
 * rules, and 98 keyed only the first to `core`:
 *
 *   PLACEMENT  c.th  = (54+c.v*82) * (0.70+0.66*core)
 *   GROWTH     if (TOWER && year>=2022 && rng()<0.02 && c.th<160) c.th += 9+c.v*12
 *                                                       ^^^^^^^^         ^^^^^^^^^
 *                                                       flat cap         no core
 *              /* the downtown keeps rising *\/   <- the comment asserts centrality
 *                                                    the code does not have (199)
 *
 * MEASURED (probe-towergrow): mean growth is small (~4) and FLAT across rings, but
 * maxGrow is a heavy CENTRALITY-BLIND TAIL -- 42-60, and one seed-42 tower at ring
 * 9-12 grew +79. The mean is fine; the TAIL sets the ENVELOPE, and the envelope is
 * what the eye reads as a skyline (205/218: the viewer's units).
 *
 * LEDGER 1 (effect)  crownGap = max(th | d<=6) - max(th | d>8)
 *                    "is the tallest thing downtown actually the tallest thing?"
 *                    plus the ring envelope, corr(th,core), and top10 distance.
 * LEDGER 2 (cost)    towers / tallTowers / helipads / towerHt / pop  (206)
 *
 * Every noise variant holds a + b/2 = 95, so E[placement] is unchanged BY
 * CONSTRUCTION (98's hold-the-mean, and it survives core's distribution moving).
 * `rng()<0.02` stays LEFT of the cap test, so the seeded stream is untouched.
 *
 *   node probe-crownsweep.mjs
 */
import { homedir } from 'node:os';
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = join(HERE, '../../../../solvista.html');

const N_NEEDLE = '(54+c.v*82)*(0.70+0.66*core)';
const CAP_NEEDLE = '&&c.th<160){';
const INC_NEEDLE = 'c.th+=9+c.v*12;';

const base = readFileSync(SRC, 'utf8');
for (const n of [N_NEEDLE, CAP_NEEDLE, INC_NEEDLE])
  if (!base.includes(n)) { console.error('needle moved:', n); process.exit(1); }

/* growth needs its own `core` — the rule's branch does not compute one */
const GCORE = 'Math.max(0,Math.min(1,1-hexDist(x,y,CBDX,CBDY)/CORER))';

/* noise: a + b*v, all with a + b/2 = 95  => mean placement EXACTLY held */
const NOISE = {
  n0: '(54+c.v*82)*(0.70+0.66*core)',   /* BASE, span 2.52x */
  n3: '(74+c.v*42)*(0.70+0.66*core)',   /* span 1.57x */
  n4: '(84+c.v*22)*(0.70+0.66*core)',   /* span 1.26x */
};
/* growth: [cap expression, increment expression] */
const GROW = {
  g0: ['&&c.th<160){', 'c.th+=9+c.v*12;'],                                   /* BASE */
  /* g1: cap TAPERS outward. core keeps its 160 ceiling; the rim's is cut to 82.
         160*(0.70+0.66*core)/1.36  ==  82.4 + 77.6*core   */
  g1: [`&&c.th<82.4+77.6*${GCORE}){`, 'c.th+=9+c.v*12;'],
  /* g2: increment scales with core, mean held over tower sites (mean core 0.282
         => mean factor 0.886, so /0.886 keeps E[increment] = 15) */
  g2: ['&&c.th<160){', `c.th+=(9+c.v*12)*(0.70+0.66*${GCORE})/0.886;`],
  /* g3: both */
  g3: [`&&c.th<82.4+77.6*${GCORE}){`, `c.th+=(9+c.v*12)*(0.70+0.66*${GCORE})/0.886;`],
};

const COMBOS = [
  ['BASE        n0 g0', 'n0', 'g0'],
  ['noise only  n4 g0', 'n4', 'g0'],
  ['cap only    n0 g1', 'n0', 'g1'],
  ['inc only    n0 g2', 'n0', 'g2'],
  ['n4 + cap    n4 g1', 'n4', 'g1'],
  ['n4 + both   n4 g3', 'n4', 'g3'],
  ['n3 + cap    n3 g1', 'n3', 'g1'],
  ['n3 + both   n3 g3', 'n3', 'g3'],
];

const SEEDS = [7, 42, 1234];
const WARP = 61;
const RINGS = [[0, 4], [5, 8], [9, 12], [13, 16], [17, 22], [23, 99]];

const browser = await chromium.launch();
const tmp = join(HERE, '.crownsweep.html');

const measure = async (nk, gk) => {
  let src = base.replace(N_NEEDLE, NOISE[nk]);
  src = src.replace(CAP_NEEDLE, GROW[gk][0]).replace(INC_NEEDLE, GROW[gk][1]);
  writeFileSync(tmp, src);
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  let err = null; page.on('pageerror', e => { err = e.message; });
  await page.goto(pathToFileURL(tmp).href);
  await page.waitForFunction(() => window.__census && window.__warp);
  const out = [];
  for (const seed of SEEDS) {
    out.push(await page.evaluate(({ seed, WARP, RINGS }) => {
      playing = false; genWorld(seed); __warp(WARP);
      const tw = [];
      for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
        const c = cellAt(x, y); if (!c || c.t !== T.TOWER) continue;
        const d = hexDist(x, y, CBDX, CBDY);
        tw.push({ d, core: Math.max(0, Math.min(1, 1 - d / CORER)), th: c.th });
      }
      const cs = window.__census(), n = tw.length;
      const mx = tw.reduce((s, t) => s + t.core, 0) / n, my = tw.reduce((s, t) => s + t.th, 0) / n;
      let sxy = 0, sxx = 0, syy = 0;
      for (const t of tw) { const dx = t.core - mx, dy = t.th - my; sxy += dx * dy; sxx += dx * dx; syy += dy * dy; }
      const byTh = [...tw].sort((a, b) => b.th - a.th);
      const mm = a => a.length ? Math.max(...a.map(t => t.th)) : 0;
      return {
        seed, n, meanTh: my, corr: sxy / Math.sqrt(sxx * syy || 1),
        top10D: byTh.slice(0, 10).reduce((s, t) => s + t.d, 0) / 10,
        env: RINGS.map(([a, b]) => mm(tw.filter(t => t.d >= a && t.d <= b))),
        crownGap: mm(tw.filter(t => t.d <= 6)) - mm(tw.filter(t => t.d > 8)),
        pop: cs.pop, tallTowers: cs.tallTowers, helipads: cs.helipads, towerHt: cs.towerHt,
      };
    }, { seed, WARP, RINGS }));
  }
  await page.close();
  if (err) throw new Error(err);
  return out;
};

const f = (n, w, d = 0) => String(n.toFixed(d)).padStart(w);
console.log('crownGap = max(th | d<=6) - max(th | d>8).  POSITIVE = downtown really is the tallest.\n');

for (const [name, nk, gk] of COMBOS) {
  const rs = await measure(nk, gk);
  const avg = k => rs.reduce((s, r) => s + r[k], 0) / rs.length;
  const sum = k => rs.reduce((s, r) => s + r[k], 0);
  console.log(`${name}`);
  for (const r of rs)
    console.log(`   seed ${String(r.seed).padStart(4)}  env [${r.env.map(e => f(e, 4)).join(' ')}]` +
      `   crownGap ${f(r.crownGap, 5)}`);
  console.log(`   MEAN crownGap ${f(avg('crownGap'), 5, 1)}   corr ${avg('corr').toFixed(3)}   ` +
    `top10D ${f(avg('top10D'), 4, 1)}   meanTh ${f(avg('meanTh'), 5, 1)}`);
  console.log(`   COST towers ${f(sum('n'), 4)}  tallTowers ${f(sum('tallTowers'), 4)}  ` +
    `helipads ${f(sum('helipads'), 4)}  towerHt ${f(sum('towerHt'), 6)}  pop ${f(sum('pop'), 7)}\n`);
}

unlinkSync(tmp);
await browser.close();
