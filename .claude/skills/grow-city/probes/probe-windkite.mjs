/* probe-windkite — does the SKY's gust cycle reach the KITE and the BALLOON? (iter 280)
 *
 * WINDA is "the gust cycle the trees, the palms, the flags and the clouds all already ride"
 * (its own comment; 245 added the sea). Two things in the sky still ignored it:
 *
 *   drawKite  — gated ONLY on LITAMT. A kite flew exactly as high, as far downwind and as
 *               taut in a dead calm as in a full gale. windFlag sits TWENTY LINES BELOW it
 *               and has gone "limp in the calm, snapping straight in a gust" since iter 50
 *               (262's law: the unfixed sibling is inside the function you just edited).
 *   balloons  — `b.x += b.sp*dt*s`. The CLOUDS they drift among read `(0.55+0.9*WINDA)`.
 *               A free balloon that does not drift at wind speed is not a free balloon.
 *
 * ISOLATION — 253's PREDICATE SUPPRESSION, in ONE page, so there is NO HEAD FILE and no
 * cross-build floor (230). Every lever in drawKite is a multiple of `kiteGust()`, which
 * returns 1.0 at full gale = HEAD's literal geometry. So:
 *
 *     window.kiteGust = () => 1   ⇒  the page renders HEAD's kite, exactly.
 *
 * That makes the probe BUILD-AGNOSTIC in the strongest sense: it grades HEAD and the patch
 * from the SAME file, in the same page, at a floor of exactly 0 px.
 *
 * HEADLINE NEEDS NO THRESHOLD (236): with kiteGust forced to 1, the kite must render
 * IDENTICALLY at dead calm and at full gale. `HEAD kite Δ = 0 px` IS the defect, stated.
 *
 * CONTROLS:
 *   POSITIVE (248) — the FLAG. A correct sibling twenty lines below the defect that
 *     provably reads WINDA. It MUST move calm→gale in BOTH builds; a flat flag would mean
 *     the wind pin is dead and the kite's 0 proves nothing.
 *   MUST-NOT-MOVE (250) — at a FIXED wind, swapping kiteGust must change ZERO pixels
 *     OUTSIDE the kite's own layer. ⚠ Do NOT use a `drawBuilding` layer for this, which is
 *     the obvious choice and is WRONG: suppressing a building reveals the SWAYING TREES
 *     behind it, so its antialiased silhouette edges flip in and out of the mask as the
 *     wind moves the BACKGROUND. It read 174–213 px — IDENTICALLY on both builds, which is
 *     the tell that it was the RIG and not the artifact. A suppression mask is only a valid
 *     control if what it UNCOVERS is also inert to the signal you are sweeping.
 *   FIXED POINT (245) — the shipped kite at FULL GALE vs kiteGust=1 must be 0 px.
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;

const HERE = dirname(fileURLToPath(import.meta.url));
const ART = join(HERE, '../../../../solvista.html');
const SRC = process.env.SRC || ART;
const SEEDS = [42, 7, 1234];
const WARP = 61, DAYT = 0.35;
const CALM = 0.25, GALE = 1.0;   /* WINDA's true floor and ceiling */

const p6 = n => String(n).padStart(6);

async function run(browser, seed) {
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.addInitScript(() => {          /* 213: stub the PRNG before the page's script */
    let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  });
  await page.goto(pathToFileURL(SRC).href);
  await page.waitForTimeout(400);

  const out = await page.evaluate(async ({ seed, WARP, DAYT, CALM, GALE }) => {
    if (!window.__setWind) return { noHook: true };
    playing = false;                        /* advanceEntities stops ⇒ WINDA holds a pin */
    STARS.length = 0; flock = null; waveT = 0; time = time;   /* 163/195f/199 */
    genWorld(seed); __warp(WARP);           /* __warp settles c.h on exit (272) */
    __setTime(DAYT); render();              /* 274: LITAMT is recomputed inside render() */

    const cvs = document.querySelector('canvas');
    const g2 = cvs.getContext('2d');
    const W = cvs.width, H = cvs.height;
    const grab = () => { render(); return g2.getImageData(0, 0, W, H).data; };

    /* 226/230: suppress a named draw by stack-matching its call sites, inside ONE page */
    const P = CanvasRenderingContext2D.prototype;
    const rf = P.fill, rs = P.stroke;
    let SUP = null;
    const hit = () => SUP && new Error().stack.includes(SUP);
    P.fill = function (...a) { if (hit()) return; return rf.apply(this, a); };
    P.stroke = function (...a) { if (hit()) return; return rs.apply(this, a); };

    /* the mask of every pixel one named fn puts on the FINAL COMPOSITED canvas */
    const layer = (fn) => {
      SUP = null; const A = grab();
      SUP = fn; const B = grab();
      SUP = null;
      const m = new Uint8Array(W * H);
      let ink = 0, minY = 1e9;
      for (let i = 0, p = 0; i < A.length; i += 4, p++) {
        const d = Math.abs(A[i] - B[i]) + Math.abs(A[i + 1] - B[i + 1]) + Math.abs(A[i + 2] - B[i + 2]);
        if (d > 12) { m[p] = 1; ink++; const y = (p / W) | 0; if (y < minY) minY = y; }
      }
      return { m, ink, apex: ink ? minY : -1 };
    };
    const symdiff = (a, b) => { let n = 0; for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) n++; return n; };

    /* sample the isolated layers at one wind pin */
    const at = (w) => { __setWind(w); return { kite: layer('drawKite'), flag: layer('windFlag') }; };

    const shipped = kiteGust;
    const rows = {};
    for (const [name, fn] of [['HEAD (kiteGust=1)', () => 1], ['PATCH (shipped)', shipped]]) {
      window.kiteGust = fn;                 /* 253: force the predicate; HEAD needs no file */
      const c = at(CALM), g = at(GALE);
      rows[name] = {
        kiteMove: symdiff(c.kite.m, g.kite.m),
        kiteApexCalm: c.kite.apex, kiteApexGale: g.kite.apex,
        kiteInkCalm: c.kite.ink, kiteInkGale: g.kite.ink,
        flagMove: symdiff(c.flag.m, g.flag.m),
      };
    }

    /* MUST-NOT-MOVE (250), done RIGHT. A `drawBuilding` layer is NOT a valid control here:
       suppressing a building reveals the SWAYING TREES behind it, so its antialiased
       silhouette edges flip in and out of the mask as the wind moves the BACKGROUND -- it
       duly read 174-213 px, IDENTICALLY on both builds, which is the tell that it was the
       rig and not the artifact. The honest control asks the question directly: at a FIXED
       wind, does swapping kiteGust change ANY pixel that is not a kite pixel?  */
    __setWind(CALM);
    window.kiteGust = shipped; const kmask = layer('drawKite').m;
    const A = grab();
    window.kiteGust = () => 1; const hmask = layer('drawKite').m;
    const B = grab();
    window.kiteGust = shipped;
    let outside = 0, inside = 0;
    for (let i = 0, p = 0; i < A.length; i += 4, p++) {
      const d = Math.abs(A[i] - B[i]) + Math.abs(A[i + 1] - B[i + 1]) + Math.abs(A[i + 2] - B[i + 2]);
      if (d > 12) { if (kmask[p] || hmask[p]) inside++; else outside++; }
    }

    /* FIXED POINT (245): the shipped kite at FULL GALE == HEAD's kite, byte-for-byte */
    __setWind(GALE);
    window.kiteGust = shipped; const kg = layer('drawKite');
    window.kiteGust = () => 1; const kh = layer('drawKite');
    window.kiteGust = shipped;
    const fixed = symdiff(kg.m, kh.m);

    /* Part C: does the BALLOON drift at wind speed? No pixels ⇒ no noise floor. The CLOUD
       provably reads WINDA, so it is a built-in reference: HEAD's ratio SWINGS, the
       patch's is a CONSTANT (both now scale by the same windDrift()). */
    playing = false;
    const ratios = [];
    for (let i = 0; i < 12; i++) {
      const b0 = balloons.map(b => b.x), c0 = clouds.map(c => c.x);
      __step(4);
      const bd = balloons.reduce((s, b, j) => s + (b.x - b0[j]), 0) / balloons.length;
      const cd = clouds.reduce((s, c, j) => s + (c.x - c0[j]), 0) / clouds.length;
      if (cd > 1e-9) ratios.push(bd / cd);
      __step(9);                              /* roll the gust cycle on to a new state */
    }
    /* the wind's own mean, measured rather than assumed */
    let acc = 0, n = 0;
    for (let i = 0; i < 4000; i++) { __step(0.5); acc += WINDA; n++; }
    return { rows, fixed, ratios, windMean: acc / n, outside, inside,
             kites: kites.length, balloons: balloons.length, clouds: clouds.length };
  }, { seed, WARP, DAYT, CALM, GALE });

  await page.close();
  return out;
}

const browser = await chromium.launch();
console.log(`\nprobe-windkite — SRC=${SRC.split('/').slice(-1)}  warp=${WARP} dayT=${DAYT}  calm=${CALM} gale=${GALE}\n`);
let bad = 0;
for (const seed of SEEDS) {
  const r = await run(browser, seed);
  if (r.noHook) { console.log(`SEED ${seed}: no __setWind hook — this file is pre-280. Run the patch.`); continue; }
  console.log(`SEED ${seed}   kites=${r.kites} balloons=${r.balloons} clouds=${r.clouds}   E[WINDA]=${r.windMean.toFixed(3)}`);
  console.log(`  build              | KITE moved | apex calm→gale     | FLAG moved (+ control)`);
  for (const [k, v] of Object.entries(r.rows)) {
    const lift = v.kiteApexCalm - v.kiteApexGale;
    console.log(`  ${k.padEnd(18)} | ${p6(v.kiteMove)} px  | ${p6(v.kiteApexCalm)}→${p6(v.kiteApexGale)} (${lift > 0 ? '+' : ''}${lift}px higher) | ${p6(v.flagMove)} px`);
  }
  const H = r.rows['HEAD (kiteGust=1)'], Pt = r.rows['PATCH (shipped)'];
  console.log(`  >> HEAD's kite is WIND-DEAF: ${H.kiteMove} px between a dead calm and a full gale ${H.kiteMove === 0 ? '[exactly 0 — the defect, stated]' : '[!! expected 0]'}`);
  console.log(`  >> the patch's kite answers it: ${Pt.kiteMove} px, and flies ${Pt.kiteApexCalm - Pt.kiteApexGale}px higher in the gale`);
  console.log(`  >> FIXED POINT — shipped kite at full gale vs HEAD: ${r.fixed} px ${r.fixed === 0 ? '[byte-identical ✓]' : '[!! must be 0]'}`);
  console.log(`  >> flag control: HEAD ${H.flagMove} px / patch ${Pt.flagMove} px  ${H.flagMove > 0 && Pt.flagMove > 0 ? '[LIVE ✓]' : '[DEAD RIG !!]'}`);
  console.log(`  >> MUST-NOT-MOVE: swapping kiteGust at fixed wind changed ${r.inside} px INSIDE the kite layer, ${r.outside} px OUTSIDE it ${r.outside === 0 ? '[nothing else moved ✓]' : '[!! LEAKED]'}`);
  const rr = r.ratios, mean = rr.reduce((a, b) => a + b, 0) / rr.length;
  const sd = Math.sqrt(rr.reduce((a, b) => a + (b - mean) ** 2, 0) / rr.length);
  console.log(`  >> balloon/cloud drift ratio: mean ${mean.toFixed(3)}  SD ${sd.toFixed(4)}  range ${Math.min(...rr).toFixed(2)}..${Math.max(...rr).toFixed(2)}`);
  console.log(`     (HEAD measured SD 0.32–0.34, range 1.08..2.19 — the balloon idled through the gale)\n`);
  if (H.kiteMove !== 0 || r.fixed !== 0 || Pt.kiteMove === 0 || H.flagMove === 0 || r.outside !== 0) bad++;
}
await browser.close();
console.log(bad ? `VERDICT: ${bad} seed(s) FAILED a gate.` : 'VERDICT: PASS — HEAD wind-deaf at exactly 0, fixed point exact, controls clean.');
