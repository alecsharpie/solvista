/* probe-roofspread — is the rooftop-solar "diffusion" actually a CONTAGION,
 * or is it a SPONTANEOUS SCATTER wearing a contagion's comment?   (iter 288)
 *
 * The rule (L2569) says, in its own words:
 *     "rooftop solar spreads by imitation ... a diffusion CA — a roof is far likelier
 *      to convert the more of its neighbors already have."
 *     p = min(0.05, 0.0004 + 0.009*adopt)
 *
 * That is 283's shape exactly: a spread rule with a SPONTANEOUS term, whose comment
 * promises the NEIGHBOUR does the work.  283 measured the boulevard's contagion at
 * 1.34x its own null and found the spark had converted 94% of the host by itself.
 *
 * 287's law: a solar farm is an ARRAY — a rule with no working neighbour term ships
 * SPECKLE.  Rooftop solar CLAIMS to already be an array.  Is it?
 *
 * THE NULL (the whole point):  take the eligible host pool the rule actually ran on,
 * draw the SAME NUMBER of roofs from it uniformly at random, and measure the same
 * statistics.  A real contagion clusters far above its null; a scatter sits on it.
 *
 * Statistics, in the units 283/287 established:
 *   nbrs      mean solar neighbours per solar roof          (the contagion's strength)
 *   run       biggest connected component of solar roofs    (is it an ARRAY?)
 *   alone     % of solar roofs with NO solar neighbour      (pure speckle)
 *
 * Pure world data: no render, no clock, no pixels, no noise floor, nothing to stub.
 * BUILD-AGNOSTIC via SRC=.
 */
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC  = process.env.SRC || join(HERE, 'solvista.html');
const SEEDS = [7, 42, 1234, 99, 2024, 555];

const html = readFileSync(SRC, 'utf8');
const b = await chromium.launch();
const p = await b.newPage();
await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await p.setContent(html);
await p.waitForFunction(() => typeof window.genWorld === 'function');

const rows = await p.evaluate((seeds) => {
  /* the two flags' own host pools, straight off their writers (L2571 / L2581) */
  const HOSTS = {
    solar: c => c.t === T.RES || c.t === T.MID || c.t === T.COM,
    groof: c => c.t === T.MID || c.t === T.COM,
  };

  /* --- the statistics, computed over an arbitrary SET of cell indices --- */
  const stats = (set) => {
    const has = i => set.has(i);
    let nbrSum = 0, alone = 0;
    for (const i of set) {
      const x = i % G, y = (i / G) | 0;
      let n = 0;
      nbrs6(x, y, (a, b2) => { if (inB(a, b2) && has(idx(a, b2))) n++; });
      nbrSum += n; if (n === 0) alone++;
    }
    /* biggest connected component (283/287's "is it an array?" unit) */
    const seen = new Set(); let best = 0;
    for (const i of set) {
      if (seen.has(i)) continue;
      let sz = 0; const q = [i]; seen.add(i);
      while (q.length) {
        const k = q.pop(); sz++;
        const x = k % G, y = (k / G) | 0;
        nbrs6(x, y, (a, b2) => {
          const j = idx(a, b2);
          if (inB(a, b2) && has(j) && !seen.has(j)) { seen.add(j); q.push(j); }
        });
      }
      if (sz > best) best = sz;
    }
    return { n: set.size, nbrs: set.size ? nbrSum / set.size : 0,
             alone: set.size ? 100 * alone / set.size : 0, run: best };
  };

  /* a deterministic LCG for the null draw — nothing to do with the artifact's rng */
  const mkrand = (s) => () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);

  const out = [];
  for (const seed of seeds) {
    genWorld(seed);
    __warp(2035 - 1974);
    for (const flag of ['solar', 'groof']) {
      const host = HOSTS[flag];
      const pool = [], real = new Set();
      for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
        const i = idx(x, y), c = cells[i];
        if (!inB(x, y)) continue;
        /* the pool the rule could EVER have converted = anything still eligible,
           plus everything it did convert.  A converted roof left the eligible set,
           so the honest pool is host-type ∪ {already flagged, still host-type}. */
        if (host(c)) { pool.push(i); if (c[flag]) real.add(i); }
      }
      const R = stats(real);

      /* NULL: same count, drawn uniformly from the same pool, averaged over 40 draws */
      const rnd = mkrand(0xC0FFEE ^ seed);
      let nb = 0, al = 0, rn = 0; const TRIALS = 40;
      for (let t = 0; t < TRIALS; t++) {
        const shuf = pool.slice();
        for (let k = shuf.length - 1; k > 0; k--) {
          const j = (rnd() * (k + 1)) | 0; const tmp = shuf[k]; shuf[k] = shuf[j]; shuf[j] = tmp;
        }
        const s = stats(new Set(shuf.slice(0, real.size)));
        nb += s.nbrs; al += s.alone; rn += s.run;
      }
      out.push({ seed, flag, pool: pool.length, ...R,
                 nNbrs: nb / TRIALS, nAlone: al / TRIALS, nRun: rn / TRIALS });
    }
  }
  return out;
}, SEEDS);

await b.close();

console.log(`\nprobe-roofspread   src=${process.env.SRC ? 'SRC' : 'shipped'}   era=2035\n`);
console.log('               |            REAL                    |            NULL (same count, scattered)   |');
console.log('seed  flag  pool|   n   nbrs  alone%   run          |   nbrs  alone%   run                      |  CONTAGION (real/null)');
console.log('-'.repeat(115));
const agg = {};
for (const r of rows) {
  const ratio = r.nNbrs > 0 ? r.nbrs / r.nNbrs : 0;
  (agg[r.flag] ||= []).push(ratio);
  console.log(
    `${String(r.seed).padStart(4)}  ${r.flag.padEnd(5)} ${String(r.pool).padStart(4)}|` +
    `${String(r.n).padStart(5)} ${r.nbrs.toFixed(2).padStart(6)} ${r.alone.toFixed(1).padStart(6)}% ${String(r.run).padStart(5)}          |` +
    `${r.nNbrs.toFixed(2).padStart(7)} ${r.nAlone.toFixed(1).padStart(6)}% ${r.nRun.toFixed(1).padStart(5)}                      |  ${ratio.toFixed(2)}x`);
}
console.log('-'.repeat(115));
for (const f of Object.keys(agg)) {
  const m = agg[f].reduce((a, x) => a + x, 0) / agg[f].length;
  console.log(`  ${f}: contagion beats its own null by  ${m.toFixed(2)}x   ` +
    `(283's boulevard read 1.34x and the spark had done 94% of the work)`);
}
