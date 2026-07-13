#!/usr/bin/env node
/* probe-buildingage.mjs — is BUILDING AGE a live host, or a dead field?
 *
 * The tell (SKILL.md's richest seam, cashed 9x): `describeTile` publishes
 *
 *    const est = Math.max(1974, Math.round(year - c.age*0.075));
 *    else if(DEV.has(c.t)) data.push(['Built','~'+est]);
 *
 * ...so EVERY developed tile in Solvista tells you the year it was built. `c.age`
 * is written at 36 sites and incremented every tick (L2218). And no draw reads it
 * for a building: a house from 1974 and one from 2034 render as the same pixels.
 *
 * Before designing anything, the dead-code law: DOES THE HOST EXIST AT SCALE?
 * The upgrade pass RESETS age to 0 on every conversion (RES->MID->TOWER), so it is
 * entirely possible that by 2035 every building has recently upgraded and the field
 * is near-uniform -- T.MARKET again, and the vector would be a no-op.
 *
 * Pure world data: no canvas, no clock, no noise floor, nothing to stub. Reports
 * per DEV tile type the age distribution in YEARS (the viewer's unit -- the tooltip
 * prints a year, so grade it in years, not ticks), plus the spatial structure
 * (corr with hexDist from the published CBD) that any age-driven look would inherit.
 *
 *   node probe-buildingage.mjs
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(join(HERE, '../../../../solvista.html')).href;

const SEEDS = [7, 42, 1234, 5, 99, 2024];
const WARP = 61;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
await p.addInitScript(() => {                       /* 213: before the page's own script */
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});

const rows = [];
for (const seed of SEEDS) {
  await p.goto(`${PAGE}?seed=${seed}&warp=${WARP}&t=0.30`);
  await p.waitForTimeout(400);

  rows.push(await p.evaluate(({ seed, WARP }) => {
    playing = false;
    genWorld(seed);
    __warp(WARP);

    const byType = {};
    const ages = [], dists = [];
    for (const i of HEXI) {
      const x = i % G, y = (i / G) | 0;
      const c = cells[i]; if (!c || !DEV.has(c.t)) continue;
      const name = Object.keys(T).find(k => T[k] === c.t) || String(c.t);
      const yrs = c.age * 0.075;
      (byType[name] ||= []).push(yrs);
      ages.push(yrs);
      dists.push(hexDist(x, y, CBDX, CBDY));
    }
    const q = (a, f) => { const s = [...a].sort((u, v) => u - v); return s.length ? s[Math.min(s.length - 1, Math.floor(f * s.length))] : 0; };
    const mean = a => a.length ? a.reduce((u, v) => u + v, 0) / a.length : 0;
    const corr = (A, B) => {
      const ma = mean(A), mb = mean(B);
      let n = 0, da = 0, db = 0;
      for (let i = 0; i < A.length; i++) { n += (A[i] - ma) * (B[i] - mb); da += (A[i] - ma) ** 2; db += (B[i] - mb) ** 2; }
      return (da && db) ? n / Math.sqrt(da * db) : 0;
    };

    const types = {};
    for (const [k, a] of Object.entries(byType))
      types[k] = { n: a.length, mean: mean(a), p10: q(a, 0.10), p50: q(a, 0.50), p90: q(a, 0.90), max: Math.max(...a) };

    /* the viewer's unit: how many buildings are OLD enough to look old? */
    const old15 = ages.filter(a => a >= 15).length, old30 = ages.filter(a => a >= 30).length;

    /* THE DECIDING MEASUREMENT. corr(age,dist) = -0.4 says a gradient EXISTS, but a
       gradient the eye can see needs age to be SPATIALLY COHERENT — neighbouring
       buildings agreeing into quarters. If age is salt-and-pepper per cell, an
       age-driven tint is random shading, not a historic core, and it will (rightly)
       fail the visual gate. So compare the spread of age BETWEEN NEIGHBOURS against
       the spread of age across the whole stock:
         coherence = 1 - mean|age - meanNbrAge| / mean|age - meanAge|
       ~1 => smooth quarters (the feature reads).  ~0 => noise (it cannot). */
    let dNbr = 0, dGlob = 0, nPair = 0;
    const mAge = mean(ages);
    for (const i of HEXI) {
      const x = i % G, y = (i / G) | 0;
      const c = cells[i]; if (!c || !DEV.has(c.t)) continue;
      const a = c.age * 0.075;
      let s = 0, k = 0;
      nbrs6(x, y, (u, v2) => { const n = cellAt(u, v2); if (n && DEV.has(n.t)) { s += n.age * 0.075; k++; } });
      if (!k) continue;
      dNbr += Math.abs(a - s / k);
      dGlob += Math.abs(a - mAge);
      nPair++;
    }
    const coherence = nPair ? 1 - (dNbr / nPair) / (dGlob / nPair) : 0;

    /* and the gradient the eye would actually trace: mean age per ring from the CBD */
    const RINGS = [[0, 4], [5, 8], [9, 12], [13, 16], [17, 22], [23, 99]];
    const ring = RINGS.map(() => []);
    for (const i of HEXI) {
      const x = i % G, y = (i / G) | 0;
      const c = cells[i]; if (!c || !DEV.has(c.t)) continue;
      const d = hexDist(x, y, CBDX, CBDY);
      const bi = RINGS.findIndex(([lo, hi]) => d >= lo && d <= hi);
      if (bi >= 0) ring[bi].push(c.age * 0.075);
    }

    return {
      seed, year: Math.round(year), n: ages.length, types,
      meanAge: mAge, p90: q(ages, 0.90), maxAge: Math.max(...ages),
      old15pct: 100 * old15 / ages.length, old30pct: 100 * old30 / ages.length,
      corrAgeDist: corr(ages, dists),
      coherence,
      ringMean: ring.map(a => mean(a)), ringN: ring.map(a => a.length),
    };
  }, { seed, WARP }));
}
await b.close();

console.log('\nIS BUILDING AGE A LIVE HOST?   pure world data, 6 seeds, warp 61 (year ~2035)');
console.log('age in YEARS (the tooltip\'s own unit: age*0.075). DEV tiles only.\n');
console.log('seed    n   mean   p90   max   >=15yr   >=30yr   corr(age, dist-from-CBD)');
for (const r of rows)
  console.log(
    String(r.seed).padEnd(6),
    String(r.n).padStart(4),
    r.meanAge.toFixed(1).padStart(6),
    r.p90.toFixed(1).padStart(5),
    r.maxAge.toFixed(1).padStart(5),
    (r.old15pct.toFixed(1) + '%').padStart(7),
    (r.old30pct.toFixed(1) + '%').padStart(8),
    r.corrAgeDist.toFixed(3).padStart(12));

console.log('\nPER TILE TYPE (mean / p10..p90 / max, years) — seed 42:');
const s42 = rows.find(r => r.seed === 42);
console.log('type      n    mean    p10    p50    p90    max');
for (const [k, v] of Object.entries(s42.types).sort((a, b) => b[1].n - a[1].n))
  console.log(
    k.padEnd(9), String(v.n).padStart(4),
    v.mean.toFixed(1).padStart(7), v.p10.toFixed(1).padStart(6),
    v.p50.toFixed(1).padStart(6), v.p90.toFixed(1).padStart(6), v.max.toFixed(1).padStart(6));

console.log('\nSPATIAL COHERENCE — does age form QUARTERS, or is it per-cell noise?');
console.log('  coherence = 1 - mean|age - meanNbrAge| / mean|age - meanAge|   (~1 smooth, ~0 noise)');
console.log('\nseed    coherence   mean age by ring from CBD (0-4 / 5-8 / 9-12 / 13-16 / 17-22 / 23+)');
for (const r of rows)
  console.log(
    String(r.seed).padEnd(6),
    r.coherence.toFixed(3).padStart(9),
    '   ' + r.ringMean.map(v => v.toFixed(1).padStart(5)).join(' '));
console.log('  n     ' + ' '.repeat(9) + '   ' + rows[0].ringN.map(v => String(v).padStart(5)).join(' ') + '  (seed 7)');

const mAll = rows.reduce((s, r) => s + r.meanAge, 0) / rows.length;
const mOld = rows.reduce((s, r) => s + r.old15pct, 0) / rows.length;
const mCoh = rows.reduce((s, r) => s + r.coherence, 0) / rows.length;
console.log(`\nmean building age ${mAll.toFixed(1)} yr · ${mOld.toFixed(1)}% are >=15yr old · coherence ${mCoh.toFixed(3)}`);
console.log(mOld < 5
  ? 'VERDICT: DEAD HOST — the upgrade pass resets age; almost nothing is old. Do not build on it.'
  : mCoh < 0.25
    ? 'VERDICT: LIVE BUT INCOHERENT — age is per-cell noise, so no draw keyed to it can read\n         as a quarter.'
    : 'VERDICT: LIVE AND COHERENT HOST — age spans the full 61 years and forms quarters.');

/* ⚠ AND THE HOST BEING LIVE IS NOT PERMISSION TO PAINT IT (iter 254). This probe answers
   "is there a signal in the WORLD", which is necessary and NOT sufficient. 254 read exactly
   the table above — full 61-year spread, coherence 0.40, a monotone core->rim gradient — built
   the obvious feature (RES/MID masonry taking a luma-normalised ochre lean from c.age), passed
   every gate it could name (census flat, luminance held to 0.6/255, 222's night ordering
   IDENTICAL to HEAD, path objects -0.03%, isolation floor exactly 0 px, core-rim warmth gap
   6.3 -> 29.9) ... and TWO BLIND AGENTS ON TWO SEEDS COULD NOT SEE IT AT ALL.
     The reason is not in this table and this probe cannot see it: the masonry's cream/terra/
   sandDk palette lottery ALREADY scatters per-building warmth by SD ~45 (R-B), which is LARGER
   than the biggest core-rim gap the lever can reach (32 on the worst seed, at full saturation).
   The grain IS the noise floor -- and 99/103/239 deliberately MAXIMISED it to kill wallpaper.
   Measured: Cohen's d plateaus at 0.65 and no tuning of the span passes 0.8 (probe-patina.mjs).
   ⇒ BEFORE KEYING A DRAW TO THIS FIELD, MEASURE YOUR SIGNAL AGAINST THE WITHIN-REGION SCATTER
   OF THE CHANNEL YOU MEAN TO PAINT ON -- never against the region MEANS, which average the
   grain away and will pass a change nobody can see. The law is in SKILL.md. */
