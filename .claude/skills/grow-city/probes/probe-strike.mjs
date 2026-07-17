/* iter 328 — THE STRIKE. 291's sheet glow lights the cloud from within; 328 drops a
   forked bolt down the rain shaft to the ground. Draw-only, so the census is vacuous;
   the claim is "a wet storm at a flash peak throws a bolt that REACHES THE GROUND, and
   a fair-weather sky never does."
   Isolation is by the LIGHTN suppressor (253): render the frozen peak-flash instant
   twice, LIGHTN=1 vs LIGHTN=0, in ONE page — the diff is flash+bolt, floor exactly 0.
   The bolt is separated from the sheet glow SPATIALLY, not by pre-selecting a cloud (the
   bolt only draws for an ON-PLATE shower — inside `if(pa>0)`, so it can never strike the
   void, 248 — and the max-fla cloud may be off-plate). The sheet glow is a small ellipse
   at each cloud's belly (belly y ~= cy-185-cy*.52, ry ~11px); the bolt is the tall column
   BELOW every belly. So bolt ink = LIGHTN-diff pixels with y >= BAND (below the lowest
   possible glow), and it must reach well down the frame.
   Two gates, and the control is the whole point:
     (1) WET front at a flash peak → substantial bolt ink, reaching well down the frame;
     (2) DRY front (no cloud clears LIGHTN0) → ZERO bolt ink at any time (fair weather
         cannot strike — the bolt shares the flash's storm bar). */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = 'file://' + join(HERE, '../../../../solvista.html');
const SEEDS = [42, 7];
const BAND = 340;   /* px: below every cloud belly + its sheet-glow ellipse */

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

  const r = await p.evaluate((BAND) => {
    playing = false; dayT = 0.72; SUNT = sunWarp(dayT); setLight(daylight(SUNT));
    const W = cvs.width, H = cvs.height;
    const grab = () => new Uint8ClampedArray(ctx.getImageData(0, 0, W, H).data);
    const fla = (cl, t) => { const w = cloudWet(cl); if (w <= LIGHTN0) return 0;
      const pulse = Math.pow(Math.max(0, Math.sin(t * 1.15 + cl.y * 4.3 + cl.x * 1.1)), 30);
      return pulse * (w - LIGHTN0) / (1 - LIGHTN0) * (0.30 + 0.62 * LITAMT); };
    /* bolt ink: LIGHTN diff, only in the tall band below every belly+glow */
    const boltInk = () => {
      LIGHTN = 1; render(); const A = grab();
      LIGHTN = 0; render(); const B = grab();
      let n = 0, ink = 0, loY = 0, hiY = H, cx = 0;
      for (let y = BAND; y < H; y++) for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4;
        const d = Math.max(Math.abs(A[i] - B[i]), Math.abs(A[i + 1] - B[i + 1]), Math.abs(A[i + 2] - B[i + 2]));
        if (d > 6) { n++; ink += d; cx += x; if (y > loY) loY = y; if (y < hiY) hiY = y; }
      }
      return { n, ink, loY, hiY: n ? hiY : 0, span: n ? loY - hiY : 0, cx: n ? (cx / n) | 0 : 0 };
    };
    /* every flash peak in [0,44]: each qualifying cloud peaks when sin(t*1.15+ph)=1.
       Testing each cloud at ITS OWN peak finds an on-plate strike a summed argmax misses. */
    const peakTimes = () => { const ts = [];
      for (const cl of clouds) { if (cloudWet(cl) <= LIGHTN0) continue;
        const ph = cl.y * 4.3 + cl.x * 1.1;
        for (let k = 0; k < 10; k++) { const t = (Math.PI / 2 + 2 * Math.PI * k - ph) / 1.15;
          if (t >= 0 && t < 44) ts.push(t); } }
      return ts.length ? ts : [...Array(30)].map((_, i) => i * 1.4); };

    /* wettest & driest fronts */
    const maxWet = () => Math.max(0, ...clouds.map(c => cloudWet(c)));
    let dryY = 2010, dryV = 1;
    for (let y = 1999; y < 2036; y += 0.25) { year = y; const w = maxWet();
      if (w < dryV) { dryV = w; dryY = y; } }

    /* (1) WET: a bolt only draws for a wet shower ON the plate (inside if(pa>0)), and the
       single wettest instant can be a storm offshore. Scan the decades for a wet, on-plate
       cloud (inB), collect each such cloud's own flash peak as a (year,time) candidate, and
       take the moment with the most grounded bolt ink. Proves a strike exists somewhere in
       the storm life without depending on one lucky year. */
    const cands = [];
    for (let y = 1999; y < 2036 && cands.length < 60; y += 0.5) { year = y;
      for (const cl of clouds) { if (cloudWet(cl) <= LIGHTN0 || !inB(cl.x | 0, cl.y | 0)) continue;
        const ph = cl.y * 4.3 + cl.x * 1.1;
        const t = (Math.PI / 2 - ph) / 1.15 + Math.ceil((ph - Math.PI / 2) / (2 * Math.PI)) * (2 * Math.PI) / 1.15;
        if (t >= 0 && t < 44) cands.push([y, t]); } }
    let wet = { n: 0, ink: 0, loY: 0, hiY: 0, span: 0, cx: 0 }, bestT = 0, bestY = 0, wetV = 0;
    for (const [y, t] of cands) { year = y; time = t; const d = boltInk();
      if (d.ink > wet.ink) { wet = d; bestT = t; bestY = y; wetV = maxWet(); } }

    /* (2) DRY control: no cloud clears the bar → a coarse grid must stay ZERO */
    year = dryY; let dry = { n: 0, ink: 0 };
    for (let t = 0; t < 44; t += 0.31) { time = t; const d = boltInk();
      if (d.ink > dry.ink) dry = d; }
    LIGHTN = 1;
    return { wetY: +bestY.toFixed(2), wetV: +wetV.toFixed(3), dryY: +dryY.toFixed(2), dryV: +dryV.toFixed(3),
             bestT: +bestT.toFixed(2), nCand: cands.length, wet, dry };
  }, BAND);

  const pass = r.wet.n > 120 && r.wet.span > 120 && r.dry.n === 0;
  allPass = allPass && pass;
  console.log(`seed ${seed}: wet @${r.wetY} maxWet ${r.wetV} flash @t=${r.bestT}`);
  console.log(`   BOLT band(y>=${BAND}) ${r.wet.n}px / ${r.wet.ink} ink, column y ${r.wet.hiY}..${r.wet.loY} (span ${r.wet.span}px), x~${r.wet.cx}`);
  console.log(`   DRY control @${r.dryY} maxWet ${r.dryV} → ${r.dry.n}px / ${r.dry.ink} ink   ${pass ? 'PASS' : 'FAIL'}`);
  await p.close();
}
await br.close();
console.log(allPass ? 'STRIKE: PASS' : 'STRIKE: FAIL');
