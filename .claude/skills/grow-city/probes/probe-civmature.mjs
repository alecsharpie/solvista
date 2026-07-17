/* probe-civmature — the gate for iter 326 (Civic's first CA field: the squares weather in).
 *
 * Pure world data: drives the artifact's OWN tick() and reads cells[].civ + cells[].age --
 * no pixels, NO NOISE FLOOR AT ALL, nothing to stub. BUILD-AGNOSTIC via SRC=: c.civ is
 * undefined on HEAD (reads 0), so ONE file grades HEAD and the patch with no source swap,
 * no cross-build floor (230).
 *
 * HEADLINE -- NEEDS NO THRESHOLD (236). The vector is "a paved plaza matures over the decades".
 *   HEAD's civ is a CONSTANT 0 on every plaza, always -- a raw square and a fifty-year one are
 *   drawn identically. That IS the defect, stated.
 *
 * CLAIM (the whole point): maturity must track AGE. Report corr(civ, age) over all plazas, and
 *   the mean civ of OLD squares (age>=OLD ticks) vs NEW ones (age<NEW) -- old >> new, or the
 *   field is decoupled from age and the "weathering" is a lie. Old squares approach 1 (dressed);
 *   new forecourts sit low (raw concrete).
 *
 * CONTAINED (250, LEAK -- the must-not-move column): every NON-PLAZA hex must read civ 0. The
 *   pass zeroes a rebuilt/destroyed square, so a fresh plaza always starts at raw concrete.
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = join(HERE, '../../../../solvista.html');
const SRC = process.env.SRC || ART;
const TAG = process.env.TAG || (process.env.SRC ? 'HEAD' : 'PATCH');
const SEEDS = [42, 7, 1234, 99, 2024, 555];
const OLD = 180, NEW = 90;   // ticks (~22yr / ~11yr at 0.075yr/tick)

const b = await chromium.launch();
const p = await b.newPage();
await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await p.goto(pathToFileURL(SRC).href);
await p.waitForTimeout(400);

console.log('### ' + TAG + '  (' + SRC.split('/').pop() + ')\n');
console.log('seed | plazas | corr(civ,age) | OLD(>=180)   NEW(<90) | maxCiv | LEAK(non-plaza)');
const agg = { plazas: [], corr: [], old: [], nw: [], leak: [] };

for (const seed of SEEDS) {
  const r = await p.evaluate(({ seed, OLD, NEW }) => {
    playing = false;
    genWorld(seed);
    for (let n = 0; n < 800 && year < 2035; n++) { year += 0.075; tick(); }
    for (let k = 0; k < 40; k++) tick();          // let the slow field settle at the mature city
    const civOf = c => (c.civ || 0);

    let plazas = 0, leak = 0, maxC = 0;
    const old = [0, 0], nw = [0, 0];
    const xs = [], ys = [];                        // for corr(civ, age)
    for (const i of HEXI) {
      const c = cells[i], v = civOf(c);
      if (c.t === T.PLAZA) {
        plazas++;
        if (v > maxC) maxC = v;
        xs.push(c.age); ys.push(v);
        if (c.age >= OLD) { old[0] += v; old[1]++; }
        else if (c.age < NEW) { nw[0] += v; nw[1]++; }
      } else if (v > 0.004) { leak++; }            // any non-plaza holding civ is a bug
    }
    // Pearson corr
    const n = xs.length;
    let corr = 0;
    if (n > 1) {
      const mx = xs.reduce((a, b) => a + b, 0) / n, my = ys.reduce((a, b) => a + b, 0) / n;
      let sxy = 0, sxx = 0, syy = 0;
      for (let k = 0; k < n; k++) { const dx = xs[k] - mx, dy = ys[k] - my; sxy += dx * dy; sxx += dx * dx; syy += dy * dy; }
      corr = (sxx > 0 && syy > 0) ? sxy / Math.sqrt(sxx * syy) : 0;
    }
    const m = a => a[1] ? a[0] / a[1] : 0;
    return { plazas, leak, maxC, corr, old: m(old), nw: m(nw), oldN: old[1], nwN: nw[1] };
  }, { seed, OLD, NEW });

  agg.plazas.push(r.plazas); agg.corr.push(r.corr); agg.old.push(r.old);
  agg.nw.push(r.nw); agg.leak.push(r.leak);
  console.log(String(seed).padEnd(5) + '|' +
    ('' + r.plazas).padStart(7) + ' |' +
    r.corr.toFixed(2).padStart(14) + ' |' +
    (r.old.toFixed(2) + '(' + r.oldN + ')').padStart(11) + (r.nw.toFixed(2) + '(' + r.nwN + ')').padStart(11) + ' |' +
    r.maxC.toFixed(2).padStart(8) + ('' + r.leak).padStart(9) + '  <- LEAK MUST be 0');
}

const mean = a => a.reduce((x, y) => x + y, 0) / a.length;
console.log('\n  PLAZAS / city:      ' + agg.plazas.join(', '));
console.log('  corr(civ, age):     ' + agg.corr.map(v => v.toFixed(2)).join(', ') +
  '   <- strongly positive ⇒ maturity tracks how long the square has stood');
console.log('  OLD vs NEW mean:    old ' + mean(agg.old).toFixed(2) + '  new ' + mean(agg.nw).toFixed(2) +
  '   <- old >> new (HEAD: 0 vs 0 -- the defect stated, 236)');
console.log('  LEAK (non-plaza):   ' + agg.leak.join(', ') + '   <- MUST be 0 on every seed (250)');
await b.close();
