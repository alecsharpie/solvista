/* iter 313 — HOT-AIR BALLOONS ARE A FAIR-WEATHER CRAFT. Draw-only, so the census is vacuous;
   the claim is "the balloons fade out as the rain front gathers, and only fair weather flies them."

   HEAD's own comment says "on fair days" / "fair-weather balloon festival" — but the draw ignored
   the weather entirely (199's tell). The fix reads the SAME rainFront every cloud/bow/CA already
   does, faded at draw time (rng untouched → census byte-identical; the balloons never despawn, they
   loop underneath, so it MUST be a draw gate not a spawn gate).

   Isolate the balloon LAYER by rendering the frozen frame WITH balloons and WITHOUT (clear the
   array), and diff: the changed pixels ARE the balloons, at a floor of exactly 0, sky cancelled.
   Do it at the DRIEST and WETTEST year of the front's cycle, per seed.

   BUILD-AGNOSTIC via 253's suppress-the-PREDICATE trick: window.balloonFair = () => 1 renders HEAD's
   behaviour (balloons drawn regardless of weather) IN-PAGE — no source swap, no cross-build floor.
     HEAD-equiv: balloon ink at the dry year ≈ ink at the wet year   (weather-blind, the defect)
     PATCH:      balloon ink high when dry, ~0 when wet              (the fix) */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = 'file://' + join(HERE, '../../../../solvista.html');
const SEEDS = [42, 7, 1234];

const br = await chromium.launch();
await (async () => {})();
for (const seed of SEEDS) {
  const p = await br.newPage({ viewport: { width: 1400, height: 900 } });
  /* 213: stub Math.random before the page's own script, or a second genWorld respawns entities */
  await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
  await p.goto(ART, { waitUntil: 'load' });

  const r = await p.evaluate(seed => {
    genWorld(seed); __warp(61); playing = false;
    time = 0; waveT = 0; STARS.length = 0; flock = null;
    dayT = 0.35;                                   /* full day, so LITAMT < 0.5 and balloons draw */
    /* __warp parks every balloon off the left edge (it never drifts them); spread them across
       the visible plate so the layer actually renders. Position is independent of the fade. */
    balloons.forEach((b, i) => { b.x = 6 + i * 8; });

    /* driest & wettest year over the front's cycle (balloons only exist from 1998) */
    let dryY = 2010, wetY = 2010, dV = 2, wV = -1;
    for (let y = 1999; y < 2036; y += 0.05) { year = y; const f = rainFront();
      if (f < dV) { dV = f; dryY = y; }
      if (f > wV) { wV = f; wetY = y; } }

    const orig = window.balloonFair;
    const grab = () => { render(); return ctx.getImageData(0, 0, cvs.width, cvs.height).data; };
    /* balloon ink at the current year: frame WITH balloons minus frame WITHOUT */
    const ink = () => {
      const A = grab();
      const keep = balloons.slice(); balloons.length = 0;
      const B = grab();
      balloons.push(...keep);
      let n = 0;
      for (let i = 0; i < A.length; i += 4) {
        const d = Math.abs(A[i] - B[i]) + Math.abs(A[i + 1] - B[i + 1]) + Math.abs(A[i + 2] - B[i + 2]);
        if (d > 12) n++;
      }
      return n;
    };

    const out = { nBalloons: balloons.length,
      dryY: +dryY.toFixed(2), dryFront: +dV.toFixed(3), wetY: +wetY.toFixed(2), wetFront: +wV.toFixed(3),
      dryFair: 0, wetFair: 0 };

    /* PATCH (real predicate) */
    year = dryY; out.dryFair = +balloonFair().toFixed(3); out.patchDry = ink();
    year = wetY; out.wetFair = +balloonFair().toFixed(3); out.patchWet = ink();

    /* HEAD-equiv: force fair=1 so balloons draw regardless of weather (253) */
    window.balloonFair = () => 1;
    year = dryY; out.headDry = ink();
    year = wetY; out.headWet = ink();
    window.balloonFair = orig;
    return out;
  }, seed);

  const pr = x => String(x).padStart(6);
  const patchRatio = r.patchDry ? (r.patchWet / r.patchDry) : 0;
  const headRatio = r.headDry ? (r.headWet / r.headDry) : 0;
  /* the fix: patch grounds the fleet in the wet (ratio ~0); HEAD flies it anyway (ratio ~1) */
  const ok = r.nBalloons > 0 && r.dryFair > 0.98 && r.wetFair < 0.02 &&
             r.patchDry > 200 && patchRatio < 0.10 && headRatio > 0.7;
  console.log(`\nseed ${seed}  (${r.nBalloons} balloons aloft)`);
  console.log(`  DRY  @${r.dryY}  front=${r.dryFront}  fair=${r.dryFair}   |   WET @${r.wetY}  front=${r.wetFront}  fair=${r.wetFair}`);
  console.log(`  PATCH balloon ink   dry ${pr(r.patchDry)}   wet ${pr(r.patchWet)}   wet/dry ${patchRatio.toFixed(3)}   <- fleet grounds in the rain`);
  console.log(`  HEAD  balloon ink   dry ${pr(r.headDry)}   wet ${pr(r.headWet)}   wet/dry ${headRatio.toFixed(3)}   <- flies through it (control)`);
  console.log(`  ${ok ? 'PASS' : 'FAIL'}`);
  await p.close();
}
await br.close();
