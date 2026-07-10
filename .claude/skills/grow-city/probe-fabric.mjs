/* probe-fabric.mjs — measures how MONOTONE the low-rise residential carpet is.
 *
 * Three holistic agents (iters 92, 94, 99) called the mid-block mass "a uniform
 * carpet / beige monotone". This turns that into numbers, so a fix can be judged
 * instead of vibed. Reports, per seed:
 *   - RES count
 *   - body-colour share (terra vs cream)
 *   - SAME-BODY NEIGHBOUR FRACTION: of all RES-RES hex adjacencies, what share
 *     join two houses of the same body colour? 1.0 = a perfect carpet;
 *     ~0.5 = a fine-grained mix. THIS is the monotony number.
 *   - mean contiguous same-body patch size (flood fill over RES adjacency)
 *   - roof-colour histogram, and whether the roof pattern is seed-invariant.
 *   - corr(body, height): are cream houses systematically the tall ones?
 *
 * Usage: node probe-fabric.mjs [--year 2035]
 * Scratch/diagnostic — gitignored, like probe-species.mjs / probe-core.mjs.
 */
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '../../..');
const YEAR = Number((process.argv.find(a => a.startsWith('--year')) || '').split('=')[1] || 2035);
const SEEDS = [7, 42, 1234];

const html = readFileSync(resolve(ROOT, 'solvista.html'));
const server = createServer((_, res) => { res.setHeader('content-type', 'text/html'); res.end(html); }).listen(0);
await new Promise(r => server.once('listening', r));
const port = server.address().port;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

const results = [];
for (const seed of SEEDS) {
  await page.goto(`http://127.0.0.1:${port}/?seed=${seed}&warp=${YEAR - 1974}&t=0.35`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  const r = await page.evaluate(() => {
    /* NOTE: G, T, cells, idx, cellAt, hashCell, nbrDirs are top-level `const`/
       function decls. Function decls land on window; `const` does NOT (see iter
       96's probe bug). Inside page.evaluate they all resolve by BARE NAME. */
    const res = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)];
      if (c && c.t === T.RES) res.push([x, y, c]);
    }
    const bodyOf = c => (c.v < 0.5 ? 'terra' : 'cream');
    const roofOf = (x, y, c) => {
      const rv = hashCell(x, y, 7), b = bodyOf(c);
      return rv < 0.45 ? (b === 'terra' ? 'terraDk' : 'terra') : (rv < 0.72 ? 'creamDk' : (rv < 0.9 ? 'sage' : 'coral'));
    };

    /* --- body share --- */
    let terra = 0;
    for (const [, , c] of res) if (bodyOf(c) === 'terra') terra++;

    /* --- same-body neighbour fraction over RES-RES hex edges --- */
    let edges = 0, same = 0;
    const isRes = (x, y) => { const c = cellAt(x, y); return c && c.t === T.RES ? c : null; };
    for (const [x, y, c] of res) {
      nbrs6(x, y, (nx, ny) => {
        const n = isRes(nx, ny); if (!n) return;
        edges++; if (bodyOf(n) === bodyOf(c)) same++;
      });
    }

    /* --- mean contiguous same-body patch size (flood fill) --- */
    const seen = new Set(), sizes = [];
    for (const [x, y, c] of res) {
      const k0 = idx(x, y); if (seen.has(k0)) continue;
      const want = bodyOf(c); let n = 0; const stack = [[x, y]];
      seen.add(k0);
      while (stack.length) {
        const [cx, cy] = stack.pop(); n++;
        nbrs6(cx, cy, (nx, ny) => {
          const nc = isRes(nx, ny); if (!nc) return;
          const k = idx(nx, ny);
          if (seen.has(k) || bodyOf(nc) !== want) return;
          seen.add(k); stack.push([nx, ny]);
        });
      }
      sizes.push(n);
    }

    /* --- roof histogram + a stable fingerprint of the roof pattern --- */
    const roof = {};
    let fp = 0;
    for (const [x, y, c] of res) {
      const rn = roofOf(x, y, c);
      roof[rn] = (roof[rn] || 0) + 1;
      fp = (fp * 31 + (x * 7 + y * 13) * (rn.length + rn.charCodeAt(0))) | 0;
    }

    /* --- corr(body=cream?1:0, height th) --- */
    const ths = res.map(([, , c]) => c.th), bs = res.map(([, , c]) => bodyOf(c) === 'cream' ? 1 : 0);
    const mean = a => a.reduce((p, q) => p + q, 0) / a.length;
    const mt = mean(ths), mb = mean(bs);
    let num = 0, dt = 0, db = 0;
    for (let i = 0; i < ths.length; i++) { num += (ths[i] - mt) * (bs[i] - mb); dt += (ths[i] - mt) ** 2; db += (bs[i] - mb) ** 2; }
    const corr = num / Math.sqrt(dt * db);

    /* also: how many DISTINCT (body,roof) combos does a house actually have? */
    const combo = new Set(res.map(([x, y, c]) => bodyOf(c) + '/' + roofOf(x, y, c)));

    /* ---- MID: the DOMINANT building tile, and the real "carpet" ---- */
    const mid = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)];
      if (c && c.t === T.MID) mid.push([x, y, c]);
    }
    /* Mirrors drawBuilding's MID branch. If HEAD is still v>0.72, `hashCell` with
       the new salt simply isn't consulted there — so we detect which by reading
       the source is not possible from here; instead report BOTH schemes' shares. */
    const midBodyOld = c => (c.v > 0.72 ? 'terra' : 'cream');
    const midToneNew = (x, y, c) => hashCell(x, y, (seedNum ^ 0x3D1B) >>> 0) * 0.72 + c.v * 0.28;
    const midBodyNew = (x, y, c) => { const t = midToneNew(x, y, c); return t > 0.68 ? 'terra' : (t > 0.36 ? 'cream' : 'sandDk'); };
    let midTerra = 0; for (const [, , c] of mid) if (midBodyOld(c) === 'terra') midTerra++;

    const midHistNew = {}; for (const [x, y, c] of mid) { const b = midBodyNew(x, y, c); midHistNew[b] = (midHistNew[b] || 0) + 1; }
    /* corr(body-is-terra, height) under each scheme: 0.87 old = colour IS height */
    const corrOf = pick => {
      const bs = mid.map(([x, y, c]) => pick(x, y, c) === 'terra' ? 1 : 0), ts = mid.map(([, , c]) => c.th);
      const mn = a => a.reduce((p, q) => p + q, 0) / a.length;
      const mt = mn(ts), mb = mn(bs); let nu = 0, dt = 0, db = 0;
      for (let i = 0; i < ts.length; i++) { nu += (ts[i] - mt) * (bs[i] - mb); dt += (ts[i] - mt) ** 2; db += (bs[i] - mb) ** 2; }
      return db === 0 ? 0 : nu / Math.sqrt(dt * db);
    };
    const midCorrOld = corrOf((x, y, c) => midBodyOld(c)), midCorrNew = corrOf(midBodyNew);

    /* same-neighbour fraction over MID-MID edges, new scheme: is it grain or clump? */
    const isMid = (x, y) => { const c = cellAt(x, y); return c && c.t === T.MID ? c : null; };
    let mE = 0, mS = 0;
    for (const [x, y, c] of mid) nbrs6(x, y, (nx, ny) => { const n = isMid(nx, ny); if (!n) return; mE++; if (midBodyNew(nx, ny, n) === midBodyNew(x, y, c)) mS++; });
    const midSameNbrNew = mE ? mS / mE : 0;

    /* Is `dist` a COHERENT REGION over DEV cells, or confetti? Measured over the
       developed mass (that's where the district CA runs), not just MID. */
    const isDev = (x, y) => { const c = cellAt(x, y); return c && DEV.has(c.t) ? c : null; };
    const dev = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)]; if (c && DEV.has(c.t)) dev.push([x, y, c]);
    }
    let dEdges = 0, dSame = 0;
    for (const [x, y, c] of dev) {
      nbrs6(x, y, (nx, ny) => { const n = isDev(nx, ny); if (!n) return; dEdges++; if (n.dist === c.dist) dSame++; });
    }
    const dSeen = new Set(), dSizes = [];
    for (const [x, y, c] of dev) {
      const k0 = idx(x, y); if (dSeen.has(k0)) continue;
      const want = c.dist; let n = 0; const stack = [[x, y]]; dSeen.add(k0);
      while (stack.length) {
        const [cx, cy] = stack.pop(); n++;
        nbrs6(cx, cy, (nx, ny) => {
          const nc = isDev(nx, ny); if (!nc) return;
          const k = idx(nx, ny); if (dSeen.has(k) || nc.dist !== want) return;
          dSeen.add(k); stack.push([nx, ny]);
        });
      }
      dSizes.push(n);
    }
    dSizes.sort((a, b) => b - a);
    const distHist = [0, 0, 0, 0]; for (const [, , c] of dev) distHist[c.dist]++;

    return {
      n: res.length,
      terraShare: terra / res.length,
      sameNbrFrac: same / edges,
      patches: sizes.length,
      meanPatch: mean(sizes),
      maxPatch: Math.max(...sizes),
      roof, roofFp: fp, corrBodyHeight: corr, combos: combo.size,
      midN: mid.length, midTerraShare: midTerra / mid.length,
      midHistNew, midCorrOld, midCorrNew, midSameNbrNew,
      devN: dev.length, distSameNbr: dSame / dEdges,
      distPatches: dSizes.length, distTop5: dSizes.slice(0, 5), distHist,
    };
  });
  results.push({ seed, ...r });
}

await browser.close(); server.close();

const f = (v, d = 3) => v.toFixed(d);
console.log(`\n=== residential fabric probe · year ${YEAR} ===\n`);
for (const r of results) {
  console.log(`seed ${String(r.seed).padStart(4)}  RES=${String(r.n).padStart(4)}  terra=${f(r.terraShare * 100, 1)}%  ` +
    `sameNbr=${f(r.sameNbrFrac * 100, 1)}%  patches=${r.patches}  meanPatch=${f(r.meanPatch, 1)}  maxPatch=${r.maxPatch}`);
  console.log(`           roof=${JSON.stringify(r.roof)}  combos=${r.combos}  corr(cream,height)=${f(r.corrBodyHeight)}`);
  console.log(`           MID=${r.midN}  OLD terra=${f(r.midTerraShare * 100, 1)}% corr(terra,height)=${f(r.midCorrOld)}`);
  console.log(`           MID NEW body=${JSON.stringify(r.midHistNew)}  corr(terra,height)=${f(r.midCorrNew)}  sameNbr=${f(r.midSameNbrNew * 100, 1)}%`);
  console.log(`           DEV=${r.devN}  distSameNbr=${f(r.distSameNbr * 100, 1)}%  distPatches=${r.distPatches}  top5=${r.distTop5}  hist=${r.distHist}`);
}
const fps = results.map(r => r.roofFp);
console.log(`\nroof-pattern fingerprints: ${fps.join(', ')}`);
console.log(`(fingerprints mix in body colour, so they differ per seed even though hashCell(x,y,7) does not.)`);
const mean = a => a.reduce((p, q) => p + q, 0) / a.length;
console.log(`\nMEAN sameNbrFrac = ${f(mean(results.map(r => r.sameNbrFrac)) * 100, 1)}%   (1.0 = perfect carpet, 0.5 = fine mix)`);
console.log(`MEAN maxPatch    = ${f(mean(results.map(r => r.maxPatch)), 1)} cells`);
console.log(`MEAN corr(cream,height) = ${f(mean(results.map(r => r.corrBodyHeight)))}`);
