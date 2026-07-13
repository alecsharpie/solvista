/* iter 236 — THE WEATHER FRONT. A TEMPORAL probe (134's law: every gate this loop
   owns is frozen, so a claim about CADENCE needs a running clock).
   The claim: rain used to be a PERMANENT property of a cloud; now it is weather.
   The control is the defect itself — on HEAD the raining-cloud count is a CONSTANT,
   so its variance must be exactly 0 and the patch's must not be.
   Pure world data (__front reads year + seedNum + cl.wf) — no canvas, no pixels,
   so there is no noise floor to measure. Math.random is stubbed pre-load anyway (213). */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = 'file://' + join(HERE, '../../../../solvista.html');   /* root-born; see SKILL.md */
const SRC = process.env.SRC ? 'file://' + join(HERE, '../../../../' + process.env.SRC) : ART;
const SEEDS = [42, 7];

const br = await chromium.launch();
const open = async () => {
  const p = await br.newPage({ viewport: { width: 1400, height: 900 } });
  await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
  await p.goto(SRC, { waitUntil: 'load' });
  return p;
};
const has = async p => await p.evaluate(() => typeof window.__front === 'function');

console.log(`SRC = ${SRC.split('/').pop()}  (${process.env.SRC || 'patched'})`);

for (const seed of SEEDS) {
  const p = await open();
  const hasFront = await has(p);
  await p.evaluate(s => { genWorld(s); __warp(61); }, seed);

  /* ---------- A. TEMPORAL: does the weather CHANGE? (speed 8 to cover a cycle) ---------- */
  const A = await p.evaluate(async (hasFront) => {
    playing = true; speed = 8;
    const samples = [];
    const t0 = performance.now();
    while (performance.now() - t0 < 14000) {
      await new Promise(r => requestAnimationFrame(r));
      /* HEAD has no __front: fall back to counting the boolean it does have */
      const wet = hasFront ? window.__front().wet : clouds.map(c => c.rain ? 1 : 0);
      samples.push({ t: performance.now() - t0, n: wet.filter(v => v > 0.02).length, wet });
    }
    playing = false; speed = 1;
    const ns = samples.map(s => s.n);
    return { ns, n_min: Math.min(...ns), n_max: Math.max(...ns),
             n_mean: ns.reduce((a, b) => a + b, 0) / ns.length,
             distinct: new Set(ns).size, count: ns.length };
  }, hasFront);

  /* ---------- B. STROBE: at speed 1, how fast can a shower turn on? (134) ---------- */
  const B = await p.evaluate(async (hasFront) => {
    if (!hasFront) return null;
    playing = true; speed = 1;
    let prev = window.__front().wet, maxJump = 0, dt = 0;
    const t0 = performance.now(); let last = t0;
    while (performance.now() - t0 < 9000) {
      await new Promise(r => requestAnimationFrame(r));
      const now = performance.now();
      const wet = window.__front().wet;
      for (let i = 0; i < wet.length; i++) {
        const j = Math.abs(wet[i] - prev[i]) / ((now - last) / 1000);   /* dw per SECOND */
        if (j > maxJump) { maxJump = j; }
      }
      prev = wet; dt = now - last; last = now;
    }
    playing = false;
    return { maxRate: maxJump, fadeSec: maxJump > 0 ? 1 / maxJump : Infinity };
  }, hasFront);

  /* ---------- C. DETERMINISM + the cycle, by pinning year (no clock at all) ---------- */
  const C = await p.evaluate((hasFront) => {
    if (!hasFront) return null;
    playing = false;
    const rows = [];
    for (let dy = 0; dy <= 24; dy += 2) {
      __setYear(2035 + dy);
      const f = window.__front();
      rows.push({ dy, front: +f.front.toFixed(3), n: f.wet.filter(v => v > 0.02).length });
    }
    __setYear(2035);
    return rows;
  }, hasFront);

  /* ---------- D. THE VIEWER'S UNITS (205): how many showers actually RENDER? ----------
     "7 clouds are raining" is a claim about the FRONT's decision. The viewer's unit is
     veils falling ON THE PLATE: the draw spends every shower 2 hexes short of the rim
     (pa=0 off-plate), so a cloud the front has soaked renders NOTHING while it is out
     over the void. Both visual agents counted 2 where this probe said 7 — so measure
     what the DRAW does, not what the front decided.  Also settles the bellies: they
     disagreed on whether a wet cloud greys, which is a pixel question. */
  const D = await p.evaluate((hasFront) => {
    playing = false;
    const grab = () => { render(); return ctx.getImageData(0, 0, cvs.width, cvs.height).data; };
    const rows = [];
    for (const dy of [0, 4, 8, 14, 22]) {
      __setYear(2035.62 + dy); __setTime(0.30);
      const wet = hasFront ? window.__front().wet : clouds.map(c => c.rain ? 1 : 0);

      /* the arithmetic the DRAW itself does: a shower is spent 2 hexes short of the rim,
         so a soaked cloud out over the void renders nothing at all */
      let soaked = 0, drawn = 0;
      clouds.forEach((cl, i) => {
        if (wet[i] > 0.02) soaked++;
        const gy = cl.y | 0;
        const inset = (gy >= 0 && gy < G) ? Math.min(cl.x - ROWMIN[gy], ROWMAX[gy] - cl.x) : -1;
        if (Math.max(0, Math.min(1, inset / 2)) * wet[i] > 0.02) drawn++;
      });

      /* SUPPRESS THE WEATHER and re-render IN ONE PAGE (226/230/234): every pixel that
         moves IS the weather — veils, wet ground and grey bellies, as composited, with
         occlusion free and a floor of EXACTLY 0. The dry frame proves the floor: with no
         shower to suppress, the two renders must be byte-identical. */
      const A = grab();
      const keep = clouds.map(cl => cl.wf);
      clouds.forEach(cl => { cl.wf = 9; });        /* nothing can reach a front of 9 */
      const B = grab();
      clouds.forEach((cl, i) => { cl.wf = keep[i]; });

      /* ⚠ 200: the probe reads the CANVAS, the user sees canvas + DOM — and the .placard
         owns the top-left corner of the very SKY BAND the cloud bellies live in. Ink
         behind the HUD is ink nobody sees, so mask the cards out and report it apart. */
      const hud = [...document.querySelectorAll('.placard,.census,.controls')]
        .map(e => e.getBoundingClientRect())
        .map(r => [r.left * dpr, r.top * dpr, r.right * dpr, r.bottom * dpr]);
      const behindHUD = (px, py) => hud.some(([l, t, rr, b]) => px >= l && px <= rr && py >= t && py <= b);

      let ink = 0, sky = 0, dsum = 0, hidden = 0;
      const H = cvs.height, W = cvs.width, SKYCUT = H * 0.34;   /* the cloud band */
      for (let i = 0; i < A.length; i += 4) {
        const d = Math.max(Math.abs(A[i] - B[i]), Math.abs(A[i + 1] - B[i + 1]), Math.abs(A[i + 2] - B[i + 2]));
        if (d <= 2) continue;
        const p = i >> 2, px = p % W, py = (p / W) | 0;
        if (behindHUD(px, py)) { hidden++; continue; }           /* invisible to the user */
        ink++; dsum += d; if (py < SKYCUT) sky++;
      }
      rows.push({ dy, soaked, drawn, ink, sky, ground: ink - sky, hidden, mean: ink ? dsum / ink : 0 });
    }
    __setYear(2035);
    return rows;
  }, hasFront);

  const nm = (x, d = 2) => x.toFixed(d);
  console.log(`\n=== seed ${seed} ===`);
  console.log(`A. TEMPORAL (14s at speed 8, ${A.count} samples): raining clouds ` +
              `min=${A.n_min} max=${A.n_max} mean=${nm(A.n_mean)} — DISTINCT STATES = ${A.distinct}` +
              (A.distinct === 1 ? '   <== CONSTANT: the weather never changes' : ''));
  if (B) console.log(`B. STROBE (speed 1): fastest shower turn-on = ${nm(B.maxRate, 3)} w/sec ` +
                     `=> a shower fades in over ~${nm(B.fadeSec, 1)}s   (a strobe would be >1 w/sec)`);
  if (C) {
    console.log(`C. THE FRONT, pinned by __setYear (deterministic, no clock):`);
    console.log('   yr+  ' + C.map(r => String(r.dy).padStart(5)).join(''));
    console.log('   front' + C.map(r => nm(r.front).padStart(5)).join(''));
    console.log('   rain ' + C.map(r => String(r.n).padStart(5)).join(''));
  }
  console.log(`D. THE VIEWER'S UNITS (205) — showers the FRONT soaks vs showers the DRAW renders,`);
  console.log(`   and the weather's INK, isolated by suppressing it in ONE page (floor = 0 exactly):`);
  for (const r of D)
    console.log(`   yr+${String(r.dy).padStart(2)}  soaked ${r.soaked}/7 -> RENDERED ${r.drawn}/7   ` +
                `ink ${String(r.ink).padStart(7)} px  (sky ${String(r.sky).padStart(6)} / ` +
                `ground ${String(r.ground).padStart(6)} / behindHUD ${String(r.hidden).padStart(5)})  ` +
                `mean d ${nm(r.mean, 1)}` +
                (r.soaked === 0 ? '   <== DRY: floor, must be 0' : ''));
  await p.close();
}
await br.close();
