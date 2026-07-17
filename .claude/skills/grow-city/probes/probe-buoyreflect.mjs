/* iter 349 — THE CHANNEL MARKS MIRROR THEIR FLASH. The red/green buoy flash lit only its own
   lamp (a 5px glow at the topmark); the black harbour water below it stayed dark, while every
   OTHER water light source reflects (the ferry/launch nav-light wash, the moon, the whole lit
   waterfront — 179/329). 349 casts a coloured reflection ON the water below the mark, a long
   vertical smear breathing with the swell. Draw-only, so the census is vacuous; the claim is
   "the reflection RENDERS visible coloured ink on the water below the mark, at night, a healthy
   fraction of the lamp-flash the artifact already ships, and ZERO by day."
   Isolation is DUAL, both in ONE page (253, floor exactly 0, build-agnostic):
     - FLASHREFL=1 vs 0  → the REFLECTION alone (the NEW ink);
     - FLASHGLOW=1 vs 0  → the lamp's own flash (the INCUMBENT bar, 226 — no threshold I invent).
   Controls:
     (1) NIGHT (LITAMT>0.28, flash firing) → coloured reflection ink on the water, box BELOW the lamp's;
     (2) DAY   (LITAMT<0.28, flash gated off) → ZERO reflection ink (the free dead-regime control, 199). */
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
    const reflInk = () => diff(() => { FLASHGLOW = 1; FLASHREFL = 1; }, () => { FLASHGLOW = 1; FLASHREFL = 0; });
    const glowInk = () => diff(() => { FLASHGLOW = 1; FLASHREFL = 1; }, () => { FLASHGLOW = 0; FLASHREFL = 1; });

    /* NIGHT: pick the time (flash beat) that lights the most reflection */
    setDay(0.92); const lit = LITAMT;
    let refl = { ink: 0 }, glow = { ink: 0 }, bestT = 0;
    for (let t = 0; t < 9; t += 0.29) { time = t; const pk = reflInk();
      if (pk.ink > refl.ink) { refl = pk; bestT = t; } }
    time = bestT; glow = glowInk();

    /* DAY control: LITAMT<0.28, the flash gate is false, so the reflection cannot draw */
    setDay(0.35); const litDay = LITAMT;
    let dayRefl = { n: 0, ink: 0 };
    for (let t = 0; t < 9; t += 0.4) { time = t; const d = reflInk();
      if (d.ink > dayRefl.ink) dayRefl = d; }
    FLASHGLOW = 1; FLASHREFL = 1;
    return { lit: +lit.toFixed(2), litDay: +litDay.toFixed(2), bestT: +bestT.toFixed(2), refl, glow, dayRefl };
  });

  const ratio = r.glow.ink ? r.refl.ink / r.glow.ink : 0;
  const pass = r.lit > 0.28 && r.refl.n > 40 && r.refl.peak > 30 && r.dayRefl.n === 0;
  allPass = allPass && pass;
  console.log(`seed ${seed}: night LITAMT=${r.lit} (flash t=${r.bestT}) · day LITAMT=${r.litDay}`);
  console.log(`   REFL  ${r.refl.n}px / ${r.refl.ink} ink, peak ${r.refl.peak}, centre y~${r.refl.cy}, box x[${r.refl.box[0]}..${r.refl.box[1]}] y[${r.refl.box[2]}..${r.refl.box[3]}]`);
  console.log(`   GLOW  ${r.glow.n}px / ${r.glow.ink} ink (incumbent flash)  →  refl/glow = ${(ratio*100).toFixed(0)}%`);
  console.log(`   DAY control LITAMT=${r.litDay} → ${r.dayRefl.n}px / ${r.dayRefl.ink} ink   ${pass ? 'PASS' : 'FAIL'}`);
  await p.close();
}
await br.close();
console.log(allPass ? 'BUOYREFLECT: PASS' : 'BUOYREFLECT: FAIL');
