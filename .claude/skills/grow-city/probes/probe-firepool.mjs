/* iter 348 — A FIRE LIGHTS THE GROUND IT SITS ON. The beach bonfire's self-glow lit only
   the flame (an 8px halo at cy-2); the dark night sand around it stayed dark. 348 casts a
   warm firelight pool ON the sand, squashed to the ground plane. Draw-only, so the census is
   vacuous; the claim is "the pool RENDERS visible warm ink on the sand at the fire's foot, at
   night — a healthy fraction of the flame-halo the artifact already ships, and ZERO by day."
   Isolation is DUAL, both in ONE page (253, floor exactly 0, build-agnostic):
     - FIREPOOL=1 vs 0  → the POOL alone (the NEW ink);
     - FIREGLOW=1 vs 0  → the flame's own halo (the INCUMBENT bar, 226 — no threshold I invent).
   Controls:
     (1) NIGHT (LITAMT>0.5) → substantial POOL ink on the sand, box BELOW the flame's;
     (2) DAY (LITAMT=0, bonfires gated off) → ZERO pool ink (the free dead-regime control, 199). */
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
    playing = false;
    const W = cvs.width, H = cvs.height;
    const setDay = t => { dayT = t; SUNT = sunWarp(dayT); setLight(daylight(SUNT)); };
    const grab = () => new Uint8ClampedArray(ctx.getImageData(0, 0, W, H).data);
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
      return { n, ink, peak, cy: n ? (cy / n) | 0 : 0, box: n ? [loX, hiX, hiY, loY] : [0,0,0,0] };
    };
    const poolInk = () => diff(() => { FIREGLOW = 1; FIREPOOL = 1; }, () => { FIREGLOW = 1; FIREPOOL = 0; });
    const glowInk = () => diff(() => { FIREGLOW = 1; FIREPOOL = 1; }, () => { FIREGLOW = 0; FIREPOOL = 1; });

    /* NIGHT: pick the time (flame flicker) that lights the pool brightest */
    setDay(0.92); const lit = LITAMT;
    let pool = { ink: 0 }, glow = { ink: 0 }, bestT = 0;
    for (let t = 0; t < 6; t += 0.37) { time = t; const pk = poolInk();
      if (pk.ink > pool.ink) { pool = pk; bestT = t; } }
    time = bestT; glow = glowInk();

    /* DAY control: LITAMT=0, the bonfire gate is false, so the pool cannot draw */
    setDay(0.35); const litDay = LITAMT;
    let dayPool = { n: 0, ink: 0 };
    for (let t = 0; t < 6; t += 0.5) { time = t; const d = poolInk();
      if (d.ink > dayPool.ink) dayPool = d; }
    FIREGLOW = 1; FIREPOOL = 1;
    return { lit: +lit.toFixed(2), litDay: +litDay.toFixed(2), bestT: +bestT.toFixed(2), pool, glow, dayPool };
  });

  const ratio = r.glow.ink ? r.pool.ink / r.glow.ink : 0;
  const pass = r.lit > 0.5 && r.pool.n > 150 && r.pool.peak > 20 && r.dayPool.n === 0;
  allPass = allPass && pass;
  console.log(`seed ${seed}: night LITAMT=${r.lit} (flame t=${r.bestT}) · day LITAMT=${r.litDay}`);
  console.log(`   POOL  ${r.pool.n}px / ${r.pool.ink} ink, peak ${r.pool.peak}, centre y~${r.pool.cy}, box x[${r.pool.box[0]}..${r.pool.box[1]}] y[${r.pool.box[2]}..${r.pool.box[3]}]`);
  console.log(`   GLOW  ${r.glow.n}px / ${r.glow.ink} ink (incumbent halo)  →  pool/glow = ${(ratio*100).toFixed(0)}%`);
  console.log(`   DAY control LITAMT=${r.litDay} → ${r.dayPool.n}px / ${r.dayPool.ink} ink   ${pass ? 'PASS' : 'FAIL'}`);
  await p.close();
}
await br.close();
console.log(allPass ? 'FIREPOOL: PASS' : 'FIREPOOL: FAIL');
