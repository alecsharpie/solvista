/* iter 293 — STREET BUSKER. Draw-only, so the census is vacuous; two claims:
   (A) VISIBILITY — the musician actually renders. Isolation is by the BUSK suppressor (253):
       render a frozen instant twice, BUSK=1 (treatment) and BUSK=0 (control), in ONE page —
       the diff IS every busker, floor exactly 0 for everything else. BUILD-AGNOSTIC.
   (B) STAGGER (the whole point) — the buskers pack up ONE AT A TIME as the evening deepens,
       never all in one frame (the 210/262/286 cliff). Measured render-free with __buskers()
       (the SAME buskerAt() the draw reads): sweep dayT and count. All out by day (nightAmt 0),
       declining through the evening (DISTINCT NONZERO COUNTS >> 1), all in by deep night.
       A global-monotone gate like LITAMT would give DISTINCT NONZERO = 1 (a binary cliff). */
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
    playing = false; time = 4.0;
    const grab = () => new Uint8ClampedArray(ctx.getImageData(0, 0, cvs.width, cvs.height).data);
    const diff = (A, B) => { let n = 0, ink = 0;
      for (let i = 0; i < A.length; i += 4) {
        const d = Math.max(Math.abs(A[i] - B[i]), Math.abs(A[i + 1] - B[i + 1]), Math.abs(A[i + 2] - B[i + 2]));
        if (d > 4) { n++; ink += d; } }
      return { n, ink }; };

    /* (A) VISIBILITY @ noon (all buskers out) — floor first, then the isolation */
    dayT = 0.50;
    BUSK = 1; render(); const A0 = grab();
    BUSK = 1; render(); const A1 = grab();          /* same build twice → floor */
    BUSK = 0; render(); const B  = grab();          /* suppressed */
    BUSK = 1;
    const floor = diff(A0, A1), busk = diff(A0, B);
    const dayCount = __buskers();

    /* (B) STAGGER — count out across the WHOLE day. render() refreshes SUNT/LITAMT
       (nightAmt reads them, and they only recompute in render() — iter 284), so a
       render-free sweep would read one frozen hour. Deep night is dayT ~0.9..0.1. */
    const sweep = [];
    for (let dt = 0; dt < 1.0; dt += 0.02) { dayT = dt; render(); sweep.push([+dt.toFixed(2), __buskers()]); }
    const counts = sweep.map(s => s[1]);
    const nz = new Set(counts.filter(v => v > 0));
    const nightMin = Math.min(...counts);
    dayT = 0.50; render();
    return { floor, busk, dayCount, distinctNonzero: nz.size, nightMin,
             curve: sweep.filter((_, i) => i % 4 === 0).map(s => `${s[0]}:${s[1]}`) };
  });

  const pass = r.busk.n > 60 && r.floor.n === 0 && r.dayCount > 0 && r.distinctNonzero >= 3 && r.nightMin < r.dayCount;
  allPass = allPass && pass;
  console.log(`seed ${seed}:  buskers by day ${r.dayCount}  → INK ${r.busk.n}px / ${r.busk.ink}  (floor ${r.floor.n}px)`);
  console.log(`          STAGGER: distinct nonzero counts across the day = ${r.distinctNonzero}  (a cliff = 1);  deep-night min ${r.nightMin}/${r.dayCount}`);
  console.log(`          curve dayT:count  ${r.curve.join('  ')}   ${pass ? 'PASS' : 'FAIL'}`);
  await p.close();
}
await br.close();
console.log(allPass ? '\nALL PASS' : '\nFAIL');
process.exit(allPass ? 0 : 1);
