/* iter 291 — SHEET LIGHTNING. Draw-only, so the census is vacuous; the claim is
   "a heavy shower flickers from within, and only a heavy shower does."
   Isolation is by the LIGHTN suppressor (253): render a frozen instant twice, LIGHTN=1
   (treatment) and LIGHTN=0 (control), in ONE page — the diff IS the flash, floor exactly 0
   for everything else. BUILD-AGNOSTIC: nothing to swap.
   Two gates, and the second is the whole point:
     (1) a WET front (some cloud with cloudWet>LIGHTN0) at a flash phase must produce INK;
     (2) a DRY front (no cloud clears the bar) must produce ZERO at any time — the flash
         cannot fire on a fair-weather sky. That is the control that proves the gate.
   The pulse is deterministic in `time` (no rng), so a frozen clock can pin the flash. */
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

for (const seed of SEEDS) {
  const p = await open();
  await p.evaluate(s => { genWorld(s); __warp(61); }, seed);

  const r = await p.evaluate(() => {
    playing = false; dayT = 0.72;                       /* dusk: the flash is at its most visible */
    const grab = () => new Uint8ClampedArray(ctx.getImageData(0, 0, cvs.width, cvs.height).data);
    const diff = (A, B) => { let n = 0, ink = 0;
      for (let i = 0; i < A.length; i += 4) {
        const d = Math.max(Math.abs(A[i] - B[i]), Math.abs(A[i + 1] - B[i + 1]), Math.abs(A[i + 2] - B[i + 2]));
        if (d > 4) { n++; ink += d; } }
      return { n, ink }; };
    /* find the WETTEST front over the year range clouds fly (they spawn 1998+) */
    const maxWet = () => Math.max(0, ...clouds.map(c => cloudWet(c)));
    let wetY = 2010, dryY = 2010, wetV = 0, dryV = 1;
    for (let y = 1999; y < 2036; y += 0.25) { year = y; const w = maxWet();
      if (w > wetV) { wetV = w; wetY = y; }
      if (w < dryV) { dryV = w; dryY = y; } }

    /* (1) WET: sweep time for the brightest flash (pulse is deterministic in `time`) */
    year = wetY; let best = { n: 0, ink: 0 }, bestT = 0;
    for (let t = 0; t < 44; t += 0.18) {
      time = t; LIGHTN = 1; render(); const A = grab();
      LIGHTN = 0; render(); const B = grab();
      const d = diff(A, B);
      if (d.ink > best.ink) { best = d; bestT = t; }
    }

    /* (2) DRY control: no cloud clears the bar → flash cannot fire, any time */
    year = dryY; let dry = { n: 0, ink: 0 };
    for (let t = 0; t < 44; t += 0.37) {
      time = t; LIGHTN = 1; render(); const A = grab();
      LIGHTN = 0; render(); const B = grab();
      const d = diff(A, B);
      if (d.ink > dry.ink) dry = d;
    }
    return { wetY: +wetY.toFixed(2), wetV: +wetV.toFixed(3), dryY: +dryY.toFixed(2), dryV: +dryV.toFixed(3),
             flash: best, bestT: +bestT.toFixed(2), dry };
  });

  const pass = r.flash.n > 200 && r.dry.n === 0;
  console.log(`seed ${seed}:  wet front @${r.wetY} (maxWet ${r.wetV}) → FLASH ${r.flash.n}px / ${r.flash.ink} ink @t=${r.bestT}`);
  console.log(`          dry front @${r.dryY} (maxWet ${r.dryV}) → control ${r.dry.n}px / ${r.dry.ink} ink   ${pass ? 'PASS' : 'FAIL'}`);
  await p.close();
}
await br.close();
