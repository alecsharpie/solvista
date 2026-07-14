/* probe-cloudland — do the clouds ever stand over the LAND?
 *
 * Cue (aj), now reported by a third instrument: at the 35th step-back BOTH blind
 * agents, on both seeds, said the sky is parked over the sea ("not a single cloud
 * or cloud shadow over the landmass").
 *
 * The spawn (L1257) is `y: CTRY-20+rng()*40` — a uniform row in a 40-row band —
 * and `x: rng()*G`, uniform over the BOUNDING SQUARE. But the plate is a HEXAGON
 * whose land is only the part of each row inside `shoreAt(y)`, so a cloud's row is
 * chosen with no reference to how much ground that row has under it. `cl.x` DRIFTS
 * and wraps; `cl.y` NEVER CHANGES. So `y` is the permanent lever and `x` is a
 * transient.
 *
 * The metric is the ARTIFACT'S OWN (205/226 — the bar is the artifact's, not mine):
 * `gnd = inB(cl.x|0,cl.y|0) ? shadeGround(cl) : 0` is exactly the gate the shipped
 * draw uses to decide whether this cloud casts a shadow at all. Averaged over a
 * cloud's whole x-traverse (the wrap cycle it actually flies), it IS the fraction of
 * its life the cloud is weather a viewer can see.
 *
 * Pure world data: no render, no clock, no pixels, no noise floor, nothing to stub.
 * BUILD-AGNOSTIC (230): it uses the shipped `window.__cloudLand` when the page has
 * one and falls back to HEAD's in-render copy otherwise, so ONE file grades HEAD and
 * the patch with no source swap and no cross-build floor.
 *
 * ROW PROFILE is the design gate and it must run BEFORE a line of the fix (218/263):
 * if landShare(y) is FLAT, then `y` is a DEAD LEVER and no spawn preference on it can
 * move anything, however it is written.
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

const b = await chromium.launch();
const p = await b.newPage();
await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await p.goto(pathToFileURL(SRC).href);
await p.waitForTimeout(400);

const out = await p.evaluate((SEEDS) => {
  /* the shipped gate, or HEAD's byte-for-byte copy of it if this build has no hook */
  const shadeOf = window.__cloudLand || ((x, y, s) => {
    const rx = 30 * s / CW, ry = 12 * s / ROWY; let hit = 0, n = 0;
    for (let j = -1; j <= 1; j++) for (let i = -2; i <= 2; i++) {
      const c = cellAt(Math.round(x + i * rx * 0.5), Math.round(y + j * ry)); n++;
      if (c && !WETSET.has(c.t)) hit++;
    }
    return Math.min(1, 2 * hit / n);
  });
  const gndAt = (x, y, s) => inB(x | 0, y | 0) ? shadeOf(x, y, s) : 0;

  /* a cloud's life: x runs -6 .. G+6, then wraps (advanceEntities). Sample the
     whole cycle at the resolution the eye would see it drift through. */
  const traverse = (y, s) => {
    let sum = 0, n = 0, seen = 0;
    for (let x = -6; x <= G + 6; x += 0.25) { const g = gndAt(x, y, s); sum += g; if (g > 0) seen++; n++; }
    return { mean: sum / n, frac: seen / n };
  };

  const rows = [];
  for (const seed of SEEDS) {
    playing = false; genWorld(seed); __warp(61);

    /* ---- A. HEAD's answer, in the artifact's own units ---- */
    const per = clouds.map(cl => ({ y: cl.y, s: cl.s, ...traverse(cl.y, cl.s) }));
    const lifetime = per.reduce((a, c) => a + c.mean, 0);          /* expected shade-casting clouds at a random instant */
    const nowCast = clouds.filter(cl => gndAt(cl.x, cl.y, cl.s) > 0).length; /* what a page load / screenshot shows */

    /* ---- B. the ROW PROFILE: is `y` a live lever at all? ---- */
    const prof = [];
    for (let y = CTRY - 20; y <= CTRY + 20; y++) prof.push({ y, v: traverse(y, 1.25).mean });
    const vs = prof.map(r => r.v);
    const best = prof.reduce((a, r) => r.v > a.v ? r : a);
    const worst = prof.reduce((a, r) => r.v < a.v ? r : a);
    const uni = vs.reduce((a, v) => a + v, 0) / vs.length;         /* what a UNIFORM row pick earns */

    rows.push({ seed, lifetime, nowCast, per, uni, best, worst, prof });
  }
  return rows;
}, SEEDS);

console.log('\n=== A. HEAD: does a cloud ever stand over the land? ===');
console.log('   lifetime = sum over the 7 clouds of (fraction of its traverse casting shade)');
console.log('            = the EXPECTED NUMBER OF SHADE-CASTING CLOUDS at a random instant, of 7.\n');
console.log('  seed    lifetime/7   at-spawn/7   per-cloud lifetime shade fraction');
for (const r of out) {
  console.log(`  ${String(r.seed).padStart(5)}   ${r.lifetime.toFixed(2).padStart(5)}        ${String(r.nowCast).padStart(2)}         ` +
    r.per.map(c => c.mean.toFixed(2)).join(' '));
}
const L = out.reduce((a, r) => a + r.lifetime, 0) / out.length;
const N = out.reduce((a, r) => a + r.nowCast, 0) / out.length;
console.log(`\n  MEAN   ${L.toFixed(2)} of 7 clouds cast a shadow at a random instant  (at spawn: ${N.toFixed(1)} of 7)`);

console.log('\n=== B. the ROW PROFILE — is `cl.y` a LIVE LEVER? ===');
console.log('   (if landShare(y) is flat, no spawn preference on y can move anything)\n');
console.log('  seed   uniform-row pick   best row          worst row         dynamic range');
for (const r of out) {
  console.log(`  ${String(r.seed).padStart(5)}      ${r.uni.toFixed(3)}        y=${String(r.best.y).padStart(2)} ${r.best.v.toFixed(3)}     y=${String(r.worst.y).padStart(2)} ${r.worst.v.toFixed(3)}     ${(r.best.v / Math.max(r.uni, 1e-6)).toFixed(2)}x uniform`);
}
console.log('\n  seed 42 profile (row: shade fraction):');
console.log('   ' + out[0].prof.map(r => `${r.y}:${r.v.toFixed(2)}`).join('  '));

await b.close();
