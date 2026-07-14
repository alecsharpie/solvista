/* probe-loft — does the warehouse->loft conversion EVER fire?
 *
 * The placard promises "Warehouses become lofts and far fields go solar once the
 * rent says so." The rule (tick(), year>=2006) gates on `c.val > 0.45` — but
 * valueSrc(T.IND) is 0.18, the LOWEST source in the city bar burnt ground, and
 * updateValue diffuses 60% neighbour / 40% source. Warehouses cluster with
 * warehouses (the harbor-works pass grows IND at IND), so an industrial cell is
 * dragged DOWN by its own neighbourhood.
 *
 * Pure world data: no render, no clock, no noise floor, nothing to stub.
 *
 * The MARKET fork is a FREE POSITIVE CONTROL (248): it shares the rule's exact
 * precondition (`rng()<0.25` inside the same gate), so if the gate fires at all,
 * BOTH must be nonzero. A market-from-IND of 0 alongside a loft of 0 convicts the
 * GATE, not the fork.
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
const ERAS = [2006, 2015, 2035];

const b = await chromium.launch();
const p = await b.newPage();
await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await p.goto(pathToFileURL(SRC).href);
await p.waitForTimeout(400);

const rows = [];
for (const seed of SEEDS) {
  for (const era of ERAS) {
    const r = await p.evaluate(([seed, era]) => {
      playing = false;
      genWorld(seed);
      window.__warp(era - year);          /* ONE prefix warp (259: two hops != one) */
      let ind = 0, loft = 0, mkt = 0, eligible = 0;
      const vals = [];
      for (const i of HEXI) {
        const c = cells[i];
        if (c.t === T.IND) {
          ind++;
          vals.push(c.val);
          if (c.loft) loft++;
          /* the gate, minus the roll: how many warehouses could EVER convert */
          /* 218: eligibility under the rule's CURRENT predicate. blockValue if the
             patch defines it, else HEAD's self-suppressing c.val gate. */
          const bvOK = (typeof blockValue === 'function')
            ? blockValue(i % G, (i / G) | 0) > (typeof LOFTVAL === 'number' ? LOFTVAL : 0.5)
            : c.val > 0.45;
          if (!c.loft && bvOK) eligible++;
        }
        if (c.t === T.MARKET) mkt++;
      }
      vals.sort((a, b2) => a - b2);
      const q = f => vals.length ? vals[Math.min(vals.length - 1, Math.floor(f * vals.length))] : 0;
      return { ind, loft, mkt, eligible, year: +year.toFixed(1),
               vMed: +q(0.5).toFixed(3), vMax: +(vals[vals.length - 1] || 0).toFixed(3) };
    }, [seed, era]);
    rows.push({ seed, era, ...r });
  }
}
await b.close();

console.log('\nWAREHOUSE -> LOFT: does the rule fire?   (src ' + (SRC === ART ? 'HEAD/worktree' : SRC) + ')');
console.log('  gate: year>=2006 && t===IND && !loft && val>0.45 && rng()<0.08');
console.log('  valueSrc(IND) = 0.18  (the lowest in the city bar BURNT)\n');
console.log('  seed   era |  IND  LOFT  | ELIGIBLE (val>0.45) | median val   max val | MARKET');
console.log('  ' + '-'.repeat(84));
for (const r of rows) {
  console.log('  ' + String(r.seed).padStart(4) + '  ' + r.era +
    ' | ' + String(r.ind).padStart(4) + '  ' + String(r.loft).padStart(4) +
    '  | ' + String(r.eligible).padStart(18) +
    ' | ' + String(r.vMed).padStart(10) + String(r.vMax).padStart(10) +
    ' | ' + String(r.mkt).padStart(6));
}
const mature = rows.filter(r => r.era === 2035);
const totLoft = mature.reduce((a, r) => a + r.loft, 0);
const totInd = mature.reduce((a, r) => a + r.ind, 0);
const totElig = mature.reduce((a, r) => a + r.eligible, 0);
const worstVmax = Math.max(...mature.map(r => r.vMax));
console.log('\n  AT 2035, over ' + mature.length + ' seeds:');
console.log('    warehouses           ' + totInd);
console.log('    LOFTS                ' + totLoft + '   <-- the feature');
console.log('    still-eligible       ' + totElig + '   (218: ~0 eligible + 0 converted => the GATE never opened)');
console.log('    highest IND val seen ' + worstVmax.toFixed(3) + '   (the gate needs > 0.450)');
console.log('    seeds with >=1 loft  ' + mature.filter(r => r.loft > 0).length + ' / ' + mature.length);

/* ---- PART B: the predicate sweep ------------------------------------------
 * The rule MEANS "has the city arrived at this warehouse's door?" and ASKS
 * "is this warehouse itself valuable?" — which it can never be. Score the
 * NEIGHBOURHOOD instead (the same neighbour-mean updateValue already computes),
 * and sweep the threshold on BOTH of 206's ledgers: the EFFECT (eligible
 * warehouses) and the COST (does it starve on the worst seed / flood the yard?).
 * 233: gate on the WORST seed, not the mean.
 */
const b2 = await chromium.launch();
const p2 = await b2.newPage();
await p2.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await p2.goto(pathToFileURL(SRC).href);
await p2.waitForTimeout(400);

const CUTS = [0.45, 0.50, 0.55, 0.60, 0.65];
const per = [];
for (const seed of SEEDS) {
  const r = await p2.evaluate(([seed, CUTS]) => {
    playing = false;
    genWorld(seed);
    window.__warp(2035 - year);
    const bv = [];
    for (const i of HEXI) {
      const c = cells[i];
      if (c.t !== T.IND) continue;
      const x = i % G, y = (i / G) | 0;
      let s = 0, n = 0;
      nbrs6(x, y, (a, b3) => { const m = cellAt(a, b3); if (m) { s += m.val; n++; } });
      bv.push(n ? s / n : 0.5);
    }
    return { ind: bv.length, bv: bv.map(v => +v.toFixed(3)),
             pass: CUTS.map(k => bv.filter(v => v > k).length) };
  }, [seed, CUTS]);
  per.push({ seed, ...r });
}
await b2.close();

console.log('\n\nPART B — SCORE THE BLOCK, NOT THE LOT');
console.log('  blockValue(x,y) = mean c.val over the 6 neighbours (updateValue\'s own statistic),');
console.log('  which drops the lot\'s self-suppressing 0.4*valueSrc(IND)=0.072 term.\n');
console.log('  seed | IND |  blockValue over the warehouses      | eligible at cut  ' + CUTS.map(c => c.toFixed(2)).join('  '));
console.log('  ' + '-'.repeat(96));
for (const r of per) {
  console.log('  ' + String(r.seed).padStart(4) + ' | ' + String(r.ind).padStart(3) +
    ' | ' + r.bv.sort((a, b3) => b3 - a).join(' ').padEnd(36) +
    ' |                 ' + r.pass.map(v => String(v).padStart(5)).join(' '));
}
console.log('\n  TOTALS over ' + SEEDS.length + ' seeds (' + per.reduce((a, r) => a + r.ind, 0) + ' warehouses):');
CUTS.forEach((k, j) => {
  const tot = per.reduce((a, r) => a + r.pass[j], 0);
  const seedsWith = per.filter(r => r.pass[j] > 0).length;
  const worst = Math.min(...per.map(r => r.pass[j]));
  const allInd = per.every(r => r.pass[j] === r.ind);
  console.log('    cut ' + k.toFixed(2) + '  eligible ' + String(tot).padStart(3) +
    '   seeds with >=1: ' + seedsWith + '/' + SEEDS.length +
    '   WORST seed: ' + worst + (allInd ? '   <-- floods: EVERY warehouse converts' : ''));
});
console.log('\n  (0.50 is the artifact\'s OWN neutral: valueSrc default, and updateValue\'s n?s/n:0.5 fallback.)');
