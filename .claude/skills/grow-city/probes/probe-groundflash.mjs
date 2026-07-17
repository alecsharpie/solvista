/* iter 347 — THE STRIKE LIGHTS THE GROUND. 328's bolt grounds at [foot,cy]; 347 floods
   that landing point with a pool of light on the terrain. Draw-only, so the census is
   vacuous; the claim is "the ground pool RENDERS visible ink where the bolt lands, on the
   same wet-storm-at-dusk flash peak — as much as the strike the artifact already ships."
   Isolation is DUAL, both in ONE page (253, floor exactly 0):
     - GFLASH=1 vs 0  → the POOL alone (bolt kept, so this is the NEW ink only);
     - LIGHTN=1 vs 0  → the whole flash+bolt (the INCUMBENT bar, 226 — no threshold I invent).
   Reuses probe-strike's on-plate-wet-flash-peak finder. Controls:
     (1) WET on-plate storm at a flash peak → substantial POOL ink at the bolt's foot,
         a healthy fraction of the bolt ink it accompanies;
     (2) DRY front (no cloud clears LIGHTN0) → ZERO pool ink at any time (a strike-only
         effect cannot appear in fair weather — it shares the strike's storm bar). */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = 'file://' + join(HERE, '../../../../solvista.html');
const SEEDS = [42, 7];

const br = await chromium.launch();
const open = async () => {
  const p = await br.newPage({ viewport: { width: 1400, height: 900 } });
  await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
  await p.goto(ART, { waitUntil: 'load' });
  return p;
};

let allPass = true;
for (const seed of SEEDS) {
  const p = await open();
  await p.evaluate(s => { genWorld(s); __warp(61); }, seed);

  const r = await p.evaluate(() => {
    playing = false; dayT = 0.72; SUNT = sunWarp(dayT); setLight(daylight(SUNT));
    const W = cvs.width, H = cvs.height;
    const grab = () => new Uint8ClampedArray(ctx.getImageData(0, 0, W, H).data);
    /* diff of two renders under a toggled suppressor; returns ink + bbox + peak */
    const diff = (setA, setB) => {
      setA(); render(); const A = grab();
      setB(); render(); const B = grab();
      let n = 0, ink = 0, loY = 0, hiY = H, loX = W, hiX = 0, peak = 0, cy = 0;
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4;
        const d = Math.max(Math.abs(A[i] - B[i]), Math.abs(A[i + 1] - B[i + 1]), Math.abs(A[i + 2] - B[i + 2]));
        if (d > 6) { n++; ink += d; cy += y; if (d > peak) peak = d;
          if (y > loY) loY = y; if (y < hiY) hiY = y; if (x < loX) loX = x; if (x > hiX) hiX = x; }
      }
      return { n, ink, peak, cy: n ? (cy / n) | 0 : 0,
               box: n ? [loX, hiX, hiY, loY] : [0,0,0,0] };
    };
    const poolInk = () => diff(() => { LIGHTN = 1; GFLASH = 1; }, () => { LIGHTN = 1; GFLASH = 0; });
    const boltInk = () => diff(() => { LIGHTN = 1; GFLASH = 1; }, () => { LIGHTN = 0; GFLASH = 1; });

    const maxWet = () => Math.max(0, ...clouds.map(c => cloudWet(c)));

    /* wettest on-plate flash peaks across the decades (probe-strike's finder) */
    const cands = [];
    for (let y = 1999; y < 2036 && cands.length < 60; y += 0.5) { year = y;
      for (const cl of clouds) { if (cloudWet(cl) <= LIGHTN0 || !inB(cl.x | 0, cl.y | 0)) continue;
        const ph = cl.y * 4.3 + cl.x * 1.1;
        const t = (Math.PI / 2 - ph) / 1.15 + Math.ceil((ph - Math.PI / 2) / (2 * Math.PI)) * (2 * Math.PI) / 1.15;
        if (t >= 0 && t < 44) cands.push([y, t]); } }
    /* take the instant with the most bolt ink, then measure the pool AT that instant */
    let bestBolt = { ink: 0 }, bestY = 0, bestT = 0;
    for (const [y, t] of cands) { year = y; time = t; const b = boltInk();
      if (b.ink > bestBolt.ink) { bestBolt = b; bestY = y; bestT = t; } }
    year = bestY; time = bestT;
    const pool = poolInk();

    /* DRY control: no storm, so the pool must be ZERO at every time */
    let dryY = 2010, dryV = 1;
    for (let y = 1999; y < 2036; y += 0.25) { year = y; const w = maxWet();
      if (w < dryV) { dryV = w; dryY = y; } }
    year = dryY; let dryPool = { n: 0, ink: 0 };
    for (let t = 0; t < 44; t += 0.31) { time = t; const d = poolInk();
      if (d.ink > dryPool.ink) dryPool = d; }
    LIGHTN = 1; GFLASH = 1;
    return { bestY: +bestY.toFixed(2), bestT: +bestT.toFixed(2), nCand: cands.length,
             pool, bolt: bestBolt, dryY: +dryY.toFixed(2), dryPool };
  });

  const ratio = r.bolt.ink ? r.pool.ink / r.bolt.ink : 0;
  const pass = r.pool.n > 200 && r.pool.peak > 24 && r.pool.box[3] > 340 && r.dryPool.n === 0;
  allPass = allPass && pass;
  console.log(`seed ${seed}: flash @${r.bestY}/t=${r.bestT}  (${r.nCand} candidates)`);
  console.log(`   POOL  ${r.pool.n}px / ${r.pool.ink} ink, peak ${r.pool.peak}, centre y~${r.pool.cy}, box x[${r.pool.box[0]}..${r.pool.box[1]}] y[${r.pool.box[2]}..${r.pool.box[3]}]`);
  console.log(`   BOLT  ${r.bolt.ink} ink (incumbent)  →  pool/bolt = ${(ratio*100).toFixed(0)}%`);
  console.log(`   DRY control @${r.dryY} → ${r.dryPool.n}px / ${r.dryPool.ink} ink   ${pass ? 'PASS' : 'FAIL'}`);
  await p.close();
}
await br.close();
console.log(allPass ? 'GROUNDFLASH: PASS' : 'GROUNDFLASH: FAIL');
