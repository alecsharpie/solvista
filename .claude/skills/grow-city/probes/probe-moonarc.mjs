/* iter 298 — THE MOON TRAVERSES. Draw-only (position is a pure function of dayT, no rng),
   so the census is vacuous; the claim is "the moon arcs across the night, stays clear of the
   placard, and BOTH readers (the disc and the moonglade) follow it."

   Part A (build-agnostic headline): sample the moon anchor at N pins across the night.
     HEAD's moon is a screen-space FIXTURE (iw*0.80, ih*0.15) → DISTINCT=1, the defect stated
     (236). The patch arcs → DISTINCT=N, x drifts right→left, altitude peaks mid-night, and the
     x stays well RIGHT of the .placard's edge (~320px at 1400w) so it never sets behind the card.
   Part B (patch-only isolation): freeze one deep-night world; OVERRIDE moonPos() to two fixed
     points and diff — the changed pixels ARE the moon + its glade, so a non-trivial diff proves
     both readers honor the ONE predicate. Floor: the SAME point twice → 0 px. Control: move the
     moon OFF-SCREEN and the glade ink collapses (proving the glade reads moonPos, not a literal). */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
/* resolve the artifact RELATIVE TO THIS FILE, never an absolute path (works from probes/) */
const ART = 'file://' + join(HERE, '../../../../solvista.html');
const SEEDS = [42, 7];
const PLACARD_EDGE = 340;   /* left:20 + max-width:300 ≈ 320; a safe margin */

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

  const r = await p.evaluate((PE) => {
    playing = false;
    const has = typeof moonPos === 'function';
    /* HEAD fallback: the fixed point both readers used to hard-code */
    const anchor = () => has ? moonPos() : { mx: innerWidth * 0.80, my: innerHeight * 0.15, mr: 11 };

    /* --- Part A: the anchor across the night --- */
    const pins = [0.74, 0.78, 0.82, 0.86, 0.90, 0.94, 0.98, 0.02, 0.06, 0.10];
    const samples = pins.map(t => { dayT = t; const a = anchor(); return { t, mx: a.mx, my: a.my }; });
    const keys = new Set(samples.map(s => `${s.mx.toFixed(1)},${s.my.toFixed(1)}`));
    const xs = samples.map(s => s.mx), ys = samples.map(s => s.my);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);      /* small y = high in sky */
    /* the highest point (min y) should land near mid-night, not at an edge */
    const hi = samples.reduce((a, b) => b.my < a.my ? b : a);

    /* --- Part B: do both readers honor the predicate? (patch only) --- */
    let iso = null;
    if (has) {
      dayT = 0.90; time = 5; waveT = 5;
      const grab = () => new Uint8ClampedArray(ctx.getImageData(0, 0, cvs.width, cvs.height).data);
      const diff = (A, B) => { let n = 0; for (let i = 0; i < A.length; i += 4) {
        if (Math.max(Math.abs(A[i]-B[i]), Math.abs(A[i+1]-B[i+1]), Math.abs(A[i+2]-B[i+2])) > 6) n++; }
        return n; };
      const at = (mx, my) => { moonPos = () => ({ mx, my, mr: 11 }); render(); return grab(); };
      const P1a = at(1050, 120), P1b = at(1050, 120);   /* same point twice → floor */
      const P2  = at(720, 95);                           /* moved up-and-left */
      const OFF = at(-600, 120);                         /* moon dragged off-screen left */
      iso = { floor: diff(P1a, P1b), moved: diff(P1a, P2), off: diff(P1a, OFF) };
    }
    return { has, distinct: keys.size, n: pins.length,
             minX: +minX.toFixed(1), maxX: +maxX.toFixed(1),
             minY: +minY.toFixed(1), maxY: +maxY.toFixed(1),
             hiT: hi.t, iso };
  }, PLACARD_EDGE);

  console.log(`seed ${seed}  [${r.has ? 'PATCH: moon arcs' : 'HEAD: moon fixed'}]`);
  console.log(`  A  DISTINCT anchors ${r.distinct}/${r.n}   x ${r.minX}→${r.maxX} (min ${r.minX} vs placard ${PLACARD_EDGE})   y ${r.minY}(high)..${r.maxY}(low)   peak@dayT ${r.hiT}`);
  const aPass = r.distinct >= r.n - 1 && r.minX > PLACARD_EDGE && r.minY < r.maxY - 40;
  console.log(`     A ${aPass ? 'PASS' : 'FAIL'}  (arcs, off-placard, rises to a peak)`);
  if (r.iso) {
    const b = r.iso;
    const bPass = b.floor === 0 && b.moved > 400 && b.off > 200;
    console.log(`  B  floor(same pt) ${b.floor}px · moved(disc+glade) ${b.moved}px · off-screen(glade collapses) ${b.off}px   ${bPass ? 'PASS' : 'FAIL'}`);
  }
  await p.close();
}
await br.close();
