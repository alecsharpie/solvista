#!/usr/bin/env node
/* Shape probe for iter 93 ("the dogs get owners").
 *
 * The tile histogram is blind to this vector (it touches no terrain), and the
 * census `life.dogs` count is unchanged by construction. What actually changed
 * is WHO a dog is attached to and WHERE it may therefore stand. So measure:
 *
 *   leashed      how many dogs have a real `peds` owner (vs strays)
 *   heeling      leashed dogs sharing their owner's hex right now (must be 100%)
 *   offPark      % of dog-samples standing on ground `strollable()` rejects —
 *                i.e. streets. Pre-93 this is identically 0: dogs could not
 *                leave the park. That is iter 78's flagged follow-on.
 *   moving       % of dog-samples with enough residual speed to animate a gait
 *                (iter 84's technique; 0 would mean the legs never scissor)
 *   stamped      dogs carrying a fresh draw stamp => the tooltip can name them
 *
 * Samples are taken over many __step advances so occupancy is time-averaged,
 * not a single frame's luck.
 *
 *   node probe-dogs.mjs
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(join(resolve(HERE, '../../..'), 'solvista.html')).href;

const SEEDS = [7, 42, 1234];
const WARP = 61;          // 2035
const SAMPLES = 60;       // __step advances per seed
const STEP = 3;           // sim-seconds per advance

const b = await chromium.launch();
const rows = [];
for (const seed of SEEDS) {
  const p = await b.newPage();
  p.on('pageerror', e => { console.error(`  page error: ${e.message}`); });
  await p.goto(`${PAGE}?seed=${seed}&warp=${WARP}&t=0.35`);
  await p.waitForFunction(() => typeof window.__census === 'function');

  const r = await p.evaluate(async ({ SAMPLES, STEP }) => {
    // top-level `let` of a classic script lives in the global lexical env,
    // so `dogs`/`peds`/`strollable` resolve by name here.
    const leashed = dogs.filter(d => d.own >= 0).length;
    const owners = new Set(dogs.filter(d => d.own >= 0).map(d => d.own));
    // exclusivity: no resident may hold two leashes. An unguarded nearest-ped scan
    // gave one ped four dogs and drew a visible fan of leashes (caught by the
    // seed-7 visual gate, not by any number here). Now it is a number.
    const shared = leashed - owners.size;
    let heel = 0, heelN = 0, off = 0, mov = 0, n = 0;
    let pedOff = 0, pedN = 0, ownOff = 0, ownN = 0;
    for (let s = 0; s < SAMPLES; s++) {
      window.__step(STEP);
      for (const d of dogs) {
        n++;
        if (!strollable(d.x, d.y)) off++;
        const sp = Math.hypot((d.tx - d.ox), (d.ty - d.oy));
        if (sp > 0.06) mov++;
        const o = d.own >= 0 ? peds[d.own] : null;
        if (o) { heelN++; if (o.x === d.x && o.y === d.y) heel++; }
      }
      for (let i = 0; i < peds.length; i++) {
        const q = peds[i], onRd = !strollable(q.x, q.y);
        pedN++; if (onRd) pedOff++;
        if (owners.has(i)) { ownN++; if (onRd) ownOff++; }
      }
    }
    // force one real frame so draw stamps land, then count fresh ones
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    const stamped = dogs.filter(d => d._sf === FRAMEN || d._sf === FRAMEN - 1).length;
    return { dogs: dogs.length, leashed, shared, heel, heelN, off, mov, n, stamped, pedOff, pedN, ownOff, ownN };
  }, { SAMPLES, STEP });

  rows.push({ seed, ...r });
  await p.close();
}
await b.close();

console.log(`\n=== dog probe · 2035 · ${SAMPLES}x${STEP}s per seed ===\n`);
console.log('  seed   dogs  leashed  shared   heeling    offPark    moving   stamped   ownerOnRd  allPedsOnRd');
for (const r of rows) {
  const pct = (a, t) => t ? `${((100 * a) / t).toFixed(0)}%`.padStart(4) : '   -';
  console.log(
    `  ${String(r.seed).padStart(4)}   ${String(r.dogs).padStart(4)}` +
    `   ${String(r.leashed).padStart(2)}/${String(r.dogs).padStart(2)}` +
    `    ${String(r.shared).padStart(2)}` +
    `    ${pct(r.heel, r.heelN)}      ${pct(r.off, r.n)}      ${pct(r.mov, r.n)}` +
    `     ${String(r.stamped).padStart(2)}/${String(r.dogs).padStart(2)}` +
    `      ${pct(r.ownOff, r.ownN)}        ${pct(r.pedOff, r.pedN)}`
  );
}
const heelOK = rows.every(r => r.heel === r.heelN);
const exclOK = rows.every(r => r.shared === 0);
const offOK = rows.some(r => r.off > 0);
const stampOK = rows.every(r => r.stamped > 0);
console.log(`\n  heeling exact: ${heelOK ? 'yes' : 'NO'} · one leash per hand: ${exclOK ? 'yes' : 'NO'} · dogs reach the street: ${offOK ? 'yes' : 'NO'} · stamped: ${stampOK ? 'yes' : 'NO'}\n`);
process.exit(heelOK && exclOK && offOK && stampOK ? 0 : 1);
