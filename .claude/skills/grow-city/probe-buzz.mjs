#!/usr/bin/env node
/* probe-buzz — the shape probe for iteration 104 (People & activity x Deepen).
 *
 * Question: does biasing the ped walk by `c.buzz` actually move the crowd toward
 * the things PEDDEST names (shopfronts, markets, plazas, institutions), and does
 * it do so WITHOUT blowing the street occupancy that stepPed's comment says was
 * tuned to ~19%?
 *
 * Method — one page load reports BEFORE and AFTER (iter 103's law):
 *   - HEAD's stepPed is re-implemented here verbatim as `stepOld`. The buzz pass
 *     changes no terrain, so the *same* loaded city is the correct substrate for
 *     both policies; nothing needs stashing.
 *   - Both policies start from the SAME snapshot of ped state, get the same
 *     burn-in, and are stepped a FIXED NUMBER OF STEPS (not for a fixed wall
 *     time). Load therefore cannot skew the reading the way it skews `pop` and
 *     the perf gate (iter 103) -- there is no frame loop in the measurement.
 *
 * Reported per seed, time-averaged over the sampled steps:
 *   street  fraction of peds standing on a ROAD hex   (the tuned ~19%)
 *   buzz    mean `c.buzz` of the hex a ped stands on  (the field it now climbs)
 *   shop    fraction of peds with a COM/MARKET/CIVIC/STADIUM in their ring
 *           -- i.e. actually outside something worth coming out for
 *
 * `stepOld`'s column IS the control: a blind walk's occupancy is the null
 * distribution of the same peds over the same city.
 *
 *   node probe-buzz.mjs [seeds...]      (default 7 42 1234)
 */
import { homedir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(HERE, '../../..');
const PAGE = pathToFileURL(join(REPO, 'solvista.html')).href;

const seeds = process.argv.slice(2).filter(a => /^\d+$/.test(a)).map(Number);
const SEEDS = seeds.length ? seeds : [7, 42, 1234];
const BURN = 6000, SAMP = 9000, EVERY = 10;   // steps @ dt=1/30 -> 200s burn-in, 300s sampled

const browser = await chromium.launch();
const rows = [];
for (const seed of SEEDS) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const errs = [];
  page.on('pageerror', e => errs.push(String(e)));
  await page.goto(`${PAGE}?seed=${seed}&warp=61`, { waitUntil: 'load' });
  await page.waitForTimeout(600);

  const r = await page.evaluate(({ BURN, SAMP, EVERY }) => {
    /* bare names: top-level `const`/`let` live in the global LEXICAL env, not on
       `window` (iter 96). Function declarations DO land on window. */
    const snap = () => peds.map(p => ({ ...p }));
    const restore = s => { peds.length = 0; for (const p of s) peds.push({ ...p }); };
    const S = snap();

    /* the buildings a resident leaves the house FOR (a subset of PEDDEST: the
       greens are where they already are, so they don't evidence a pull) */
    const DESTB = new Set([T.COM, T.MARKET, T.CIVIC, T.STADIUM]);

    const sample = () => {
      let road = 0, buzz = 0, shop = 0, roadShop = 0;
      for (const p of peds) {
        const c = cellAt(p.x, p.y); if (!c) continue;
        buzz += (c.buzz || 0);
        let s = 0;
        nbrs6(p.x, p.y, (nx, ny) => { const n = cellAt(nx, ny); if (n && DESTB.has(n.t)) s = 1; });
        shop += s;
        /* split the street tally: a ped standing on a shopfront kerb is the
           feature; a ped standing on a suburban lane is the regression the
           PEDLEASH comment warns about. The aggregate cannot tell them apart. */
        if (c.t === T.ROAD) { road++; if (s) roadShop++; }
      }
      return [road, buzz, shop, roadShop];
    };

    /* HEAD's stepPed, verbatim -- the blind walk */
    const stepOld = (p, dt) => {
      p.tm -= dt;
      const pierBound = onPier(p.x, p.y), onRoad = !pierBound && pedRoad(p.x, p.y);
      if (p.tm <= 0) {
        if (onRoad) {
          const [kx, ky] = kerbDir(p.x, p.y);
          p.tx = kx + (Math.random() - 0.5) * 0.2; p.ty = ky + (Math.random() - 0.5) * 0.2;
          p.tm = 1.4 + Math.random() * 2.4;
        } else {
          p.tx = (Math.random() - 0.5) * 0.72; p.ty = (Math.random() - 0.5) * (pierBound ? 0.2 : 0.72);
          p.tm = 2 + Math.random() * 4;
        }
        if (Math.random() < (onRoad ? PEDSTEP_RD : PEDSTEP_OP)) {
          const d = nbrDirs(p.y)[(Math.random() * 6) | 0], nx = p.x + d[0], ny = p.y + d[1];
          if (pedWalk(p, nx, ny)) { p.x = nx; p.y = ny; if (strollable(nx, ny)) { p.hx = nx; p.hy = ny; } }
        }
      }
      p.ox = lerp(p.ox, p.tx, dt * 0.7); p.oy = lerp(p.oy, p.ty, dt * 0.7);
    };

    const run = fn => {
      restore(S);
      const dt = 1 / 30;
      for (let i = 0; i < BURN; i++) for (const p of peds) fn(p, dt);
      let road = 0, buzz = 0, shop = 0, rs = 0, n = 0;
      for (let i = 0; i < SAMP; i++) {
        for (const p of peds) fn(p, dt);
        if (i % EVERY === 0) {
          const [r, b, s, k] = sample();
          road += r; buzz += b; shop += s; rs += k; n += peds.length;
        }
      }
      return { street: road / n, buzz: buzz / n, shop: shop / n,
               stShop: rs / n, stDull: (road - rs) / n };
    };

    /* the control is STOCHASTIC (130 peds, Math.random): one pass of stepOld read
       street 21.4% and another 17.4% on the same seed and bytes. Run it twice and
       average, or a 3-point shift is unreadable. (Iter 103's law, restated for a
       metric whose noise is sampling rather than machine load.) */
    const b1 = run(stepOld), b2 = run(stepOld);
    const before = {}; for (const k of Object.keys(b1)) before[k] = (b1[k] + b2[k]) / 2;
    const a1 = run(window.stepPed), a2 = run(window.stepPed);
    const after = {}; for (const k of Object.keys(a1)) after[k] = (a1[k] + a2[k]) / 2;
    const spread = Math.abs(b1.street - b2.street);
    restore(S);

    /* the field itself, for reference: mean buzz over every hex a ped MAY stand on */
    let fs = 0, fn2 = 0;
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cellAt(x, y); if (!c || c.t === T.VOID) continue;
      if (!(strollable(x, y) || pedRoad(x, y))) continue;
      fs += (c.buzz || 0); fn2++;
    }
    return { before, after, spread, pedN: peds.length, fieldMean: fs / fn2, standable: fn2 };
  }, { BURN, SAMP, EVERY });

  if (errs.length) { console.error(`seed ${seed}: PAGE ERROR ${errs[0]}`); process.exitCode = 1; }
  rows.push({ seed, ...r });
  await page.close();
}
await browser.close();

const pc = v => (v * 100).toFixed(1) + '%';
const ba = (b, a, f = pc) => `${f(b)} -> ${f(a)}`;
console.log('\nprobe-buzz — crowd distribution, blind walk vs buzz-biased walk');
console.log(`(${BURN} burn-in + ${SAMP} sampled steps @ dt=1/30, fixed count: load-independent;`);
console.log(` each policy run twice and averaged — the control is stochastic)\n`);
console.log('seed   field  street          st:shopfront    st:dull         shop            buzz');
for (const r of rows) {
  const b = r.before, a = r.after;
  console.log(
    String(r.seed).padEnd(7) +
    r.fieldMean.toFixed(2).padEnd(7) +
    ba(b.street, a.street).padEnd(16) +
    ba(b.stShop, a.stShop).padEnd(16) +
    ba(b.stDull, a.stDull).padEnd(16) +
    ba(b.shop, a.shop).padEnd(16) +
    ba(b.buzz, a.buzz, v => v.toFixed(2))
  );
}
const mean = f => rows.reduce((s, r) => s + f(r), 0) / rows.length;
const rel = f => ((mean(r => f(r.after)) / mean(r => f(r.before)) - 1) * 100).toFixed(0);
const line = (label, f, fmt = pc) =>
  console.log(`mean ${label.padEnd(12)} ${ba(mean(r => f(r.before)), mean(r => f(r.after)), fmt)}   (${rel(f) >= 0 ? '+' : ''}${rel(f)}%)`);
console.log('');
line('street', x => x.street);
line('st:shopfront', x => x.stShop);
line('st:dull', x => x.stDull);
line('shop', x => x.shop);
line('buzz', x => x.buzz, v => v.toFixed(2));
console.log('\ncontrol spread (|run1-run2| of stepOld street occupancy), per seed: %s',
  rows.map(r => pc(r.spread)).join('  '));
console.log('-> a street delta smaller than that spread is noise, not a result.');
