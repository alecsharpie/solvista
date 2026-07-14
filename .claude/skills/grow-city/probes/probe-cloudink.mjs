/* probe-cloudshade — the cloud shade EXISTS. Can it be SEEN?
 *
 * probe-cloudland measured HEAD's clouds standing over land 55% of their lives —
 * 3.86 of 7 casting a shadow at any instant. Two blind agents, two seeds, said
 * "not a single cloud or cloud SHADOW over the landmass." When a probe and an agent
 * disagree, ask what each is LOOKING AT (200): the probe read the DECISION
 * (`gnd>0`), the agent read the CANVAS. So: measure the ink.
 *
 * Isolation is by fillStyle SIGNATURE, in ONE page (226/230/234): the cloud shade is
 * the only draw in the file that fills `rgba(36,30,20,…)` and the ped/tree/car contact
 * shadow (`shadS`) is the only one that fills `rgba(40,32,20,…)`. Suppress each, diff,
 * and the changed pixels ARE that draw — off the final composited canvas, so occlusion
 * is measured for free, at a floor of exactly 0, BUILD-AGNOSTIC (no source swap).
 *
 * `shadS` IS THE INCUMBENT BAR AND IT IS THE WHOLE POINT (226): it is the shadow the
 * artifact has shipped and every agent has accepted for 270 iterations. "Is alpha 0.05
 * enough?" is a number I would be inventing; "does the cloud shade reach the amplitude
 * of the shadow under every tree in the city?" is a question the artifact answers.
 *
 * The amplitude is stated PER PIXEL WHERE THE THING IS DRAWN (266) and as Cohen's `d`
 * against the ground's own within-frame grain (254/255) — never as a count, and never
 * area-meaned over a region the mark only covers a sliver of.
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
const DAY = 0.30;   /* the step-back's own day pin */

const b = await chromium.launch();
const p = await b.newPage();
await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await p.goto(pathToFileURL(SRC).href);
await p.waitForTimeout(400);

const out = await p.evaluate(([SEEDS, DAY]) => {
  const cvs = document.querySelector('canvas'), c2 = cvs.getContext('2d');

  /* suppress a draw by its fillStyle signature */
  let SUPPRESS = null;
  const realFill = CanvasRenderingContext2D.prototype.fill;
  /* ⚠ Chromium CANONICALISES fillStyle on read — 'rgba(36,30,20,.05)' comes back as
     'rgba(36, 30, 20, 0.05)'. A naive prefix match silently never fires, and BOTH
     columns (treatment AND incumbent) read 0 — which is how the positive control
     convicts the probe instead of the city (250). Strip the whitespace. */
  CanvasRenderingContext2D.prototype.fill = function (...a) {
    if (SUPPRESS && typeof this.fillStyle === 'string' &&
        this.fillStyle.replace(/\s/g, '').startsWith(SUPPRESS)) return;
    return realFill.apply(this, a);
  };

  const grab = (sup) => {
    SUPPRESS = sup; render(); SUPPRESS = null;
    return c2.getImageData(0, 0, cvs.width, cvs.height).data;
  };
  const lum = (d, i) => 0.30 * d[i] + 0.59 * d[i + 1] + 0.11 * d[i + 2];

  const rows = [];
  for (const seed of SEEDS) {
    playing = false;
    genWorld(seed); __warp(61);
    /* 272: render() MUTATES the world (drawBuilding grows c.h toward c.th), so a
       "frozen" world is not idempotent under render. Settle the heights or the
       HEAD-vs-HEAD floor is in the hundreds of px. */
    for (const c of cells) if (c.h < c.th) c.h = c.th;
    STARS.length = 0; flock = null; time = 0; waveT = 0;
    __setYear(2035.62); __setTime(DAY);

    const A = grab(null);
    const A2 = grab(null);                       /* the floor, measured in the same run (213) */
    const B = grab('rgba(36,30,20');             /* cloud shade off */
    const C = grab('rgba(40,32,20');             /* shadS off — the incumbent */

    let floor = 0;
    for (let i = 0; i < A.length; i += 4) if (A[i] !== A2[i] || A[i + 1] !== A2[i + 1] || A[i + 2] !== A2[i + 2]) floor++;

    /* the ground's own grain: SD of luminance over the live plate (alpha>0) */
    let gs = 0, gs2 = 0, gn = 0;
    for (let i = 0; i < A.length; i += 4) if (A[i + 3] > 0) { const L = lum(A, i); gs += L; gs2 += L * L; gn++; }
    const grain = Math.sqrt(gs2 / gn - (gs / gn) ** 2);

    const score = (X) => {           /* X = the render with the draw SUPPRESSED */
      let px = 0, drop = 0;
      for (let i = 0; i < A.length; i += 4) {
        const d = Math.abs(A[i] - X[i]) + Math.abs(A[i + 1] - X[i + 1]) + Math.abs(A[i + 2] - X[i + 2]);
        if (d > 0) { px++; drop += lum(X, i) - lum(A, i); }   /* how much DARKER the shipped frame is */
      }
      return { px, amp: px ? drop / px : 0 };
    };
    const cloud = score(B), ped = score(C);
    rows.push({
      seed, floor, grain,
      cloudPx: cloud.px, cloudAmp: cloud.amp, cloudD: cloud.amp / grain,
      pedPx: ped.px, pedAmp: ped.amp, pedD: ped.amp / grain,
    });
  }
  return rows;
}, [SEEDS, DAY]);

console.log('\n=== the cloud shade, against the shadow the artifact already ships ===');
console.log('   amp = mean luminance DARKENING, per pixel WHERE THE THING IS DRAWN (266)');
console.log("   d   = that amplitude in units of the ground's own within-frame grain (254)\n");
console.log('  seed   floor    grain |   CLOUD SHADE  px      amp      d   |   shadS (INCUMBENT)  px      amp      d');
for (const r of out) {
  console.log(`  ${String(r.seed).padStart(5)}   ${String(r.floor).padStart(4)}    ${r.grain.toFixed(1).padStart(5)} | ` +
    `           ${String(r.cloudPx).padStart(6)}  ${r.cloudAmp.toFixed(2).padStart(7)}  ${r.cloudD.toFixed(2).padStart(5)} | ` +
    `             ${String(r.pedPx).padStart(6)}  ${r.pedAmp.toFixed(2).padStart(7)}  ${r.pedD.toFixed(2).padStart(5)}`);
}
const m = (f) => out.reduce((a, r) => a + f(r), 0) / out.length;
console.log(`\n  MEAN   cloud shade  amp ${m(r => r.cloudAmp).toFixed(2)}  (d ${m(r => r.cloudD).toFixed(2)})`);
console.log(`         shadS  BAR    amp ${m(r => r.pedAmp).toFixed(2)}  (d ${m(r => r.pedD).toFixed(2)})`);
console.log(`         the cloud shade is ${(m(r => r.cloudAmp) / m(r => r.pedAmp)).toFixed(2)}x the amplitude of the shadow under every tree in the city.`);

await b.close();
