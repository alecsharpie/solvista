/* 260 — IS THE SEASON *VISIBLE*, IN THE UNITS IT IS WRITTEN IN?
 *
 * The 32nd step-back's two agents, blind, on two seeds, both reported the winter frame as
 * indistinguishable from the summer one ("no cooler light", "no readable season"). 253 had
 * shipped exactly that feature and proved it real. Both are right, and the gap between them
 * is a UNITS error that this harness has now made six times (228's law):
 *
 *   probe-seaamp measures LUMINANCE. 253's tint is NORMALISED TO HOLD LUMINANCE FLAT
 *   ("winter comes out COOLER and never DIMMER" — daylight(), L461). Grading it with a
 *   greyscale instrument measures precisely the dimension the design deliberately zeroed.
 *
 * So measure COLOUR (214: a greyscale probe cannot see "mauve"; the complaint's noun is
 * "cooler"). The axis the feature is written on is WARM-COOL: daylight() scales the tint by
 * (R*0.937, G*1.009, B*1.118) at the winter pin, i.e. it moves (R-B) and holds luma. Report:
 *
 *   (a) the shift on the WARM-COOL opponent axis (R-B) — the units of the complaint;
 *   (b) the shift in LUMINANCE — which is the design's own structural control and MUST be
 *       ~0; if it is not, the normaliser (223) has drifted;
 *   (c) both as Cohen's d against the plate's OWN within-frame grain (254/255: an amplitude,
 *       never a count — a signal under the surface's existing scatter is one nobody sees);
 *   (d) the same numbers for GOLDEN HOUR, which is the INCUMBENT BAR (226): a light change
 *       BOTH agents called obvious and dramatic. It is a threshold I did not invent.
 *
 * The plate mask is FREE: render() clearRect()s, so the void is alpha=0 on the canvas and
 * the sky/void cannot inflate the numbers. We measure the CITY, which is what the agents read.
 *
 * All renders happen in ONE page on ONE world (230): only the clock moves between them, so
 * the identical-pin floor is EXACTLY 0 and is printed as the first row (203).
 *
 *   node probe-seasonhue.mjs [seed...]
 */
import { homedir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html')].find(existsSync);

const SEEDS = process.argv.slice(2).map(Number).filter(Boolean);
const seeds = SEEDS.length ? SEEDS : [42, 7, 1234];

/* the light pins come from the light curve, never from intuition (202). */
const DAY = 0.30, GOLDEN = 0.68;
const WINTER = 2035.02, DRYPEAK = 2035.62;   /* applySeason's own keyframes */

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 });
/* 213: stub the PRNG before the page's own script, not merely before genWorld. */
await page.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});

const fmt = (n, w = 6, p = 2) => String(n.toFixed(p)).padStart(w);

console.log('\n  WARM-COOL is (R-B): a POSITIVE shift = warmer, NEGATIVE = cooler.');
console.log('  d = the shift in units of the plate\'s own within-frame grain (SD). 254: d<0.4 ⇒ nobody sees it.\n');

for (const seed of seeds) {
  await page.goto(pathToFileURL(ART).href);
  await page.waitForTimeout(400);

  const r = await page.evaluate(({ seed, DAY, GOLDEN, WINTER, DRYPEAK }) => {
    playing = false;
    genWorld(seed);
    __warp(61);
    /* the movers and the unseeded fields are the per-load noise floor (163/199/203). */
    STARS.length = 0; flock = null;
    for (const a of [vehicles, bikes, trams, trucks, peds, boats, ferries, freighters, birds,
                     shuttles, dogs, kites, surfers, dolphins, whales, herons, kayaks, joggers,
                     deer, clouds, balloons, copters]) if (Array.isArray(a)) a.length = 0;

    const grab = (t, year) => {
      __setYear(year); __setTime(t);
      lastSky = 0; syncSky(performance.now());
      render();
      const g = cvs.getContext('2d');
      return g.getImageData(0, 0, cvs.width, cvs.height).data;
    };

    const day    = grab(DAY, DRYPEAK);
    const day2   = grab(DAY, DRYPEAK);     /* the floor: the SAME pin, twice */
    const winter = grab(DAY, WINTER);
    const golden = grab(GOLDEN, DRYPEAK);

    /* stats over the PLATE only: alpha>0 in the reference frame (render() clearRect()s,
       so the void is transparent and the CSS sky cannot inflate anything). */
    const stat = (A, B) => {
      let n = 0, sw = 0, sl = 0, sww = 0, sll = 0;          /* mean/var of the SHIFT */
      let gw = 0, gww = 0;                                   /* the plate's own GRAIN in (R-B) */
      let gl = 0, gll = 0;
      for (let i = 0; i < A.length; i += 4) {
        if (A[i + 3] < 250) continue;                        /* void */
        n++;
        const wA = A[i] - A[i + 2], wB = B[i] - B[i + 2];    /* warm-cool: R - B */
        const lA = 0.30 * A[i] + 0.59 * A[i + 1] + 0.11 * A[i + 2];
        const lB = 0.30 * B[i] + 0.59 * B[i + 1] + 0.11 * B[i + 2];
        const dw = wB - wA, dl = lB - lA;
        sw += dw; sww += dw * dw; sl += dl; sll += dl * dl;
        gw += wA; gww += wA * wA; gl += lA; gll += lA * lA;
      }
      const mw = sw / n, ml = sl / n;
      const sdW = Math.sqrt(Math.max(0, gww / n - (gw / n) ** 2));   /* grain, warm-cool */
      const sdL = Math.sqrt(Math.max(0, gll / n - (gl / n) ** 2));   /* grain, luminance */
      return { n, mw, ml,
               rmsW: Math.sqrt(sww / n), rmsL: Math.sqrt(sll / n),
               sdW, sdL, dW: Math.abs(mw) / (sdW || 1), dL: Math.abs(ml) / (sdL || 1) };
    };

    return { floor: stat(day, day2), season: stat(day, winter), golden: stat(day, golden) };
  }, { seed, DAY, GOLDEN, WINTER, DRYPEAK });

  console.log(`  ── seed ${seed}  (${r.season.n.toLocaleString()} plate px; grain SD: warm-cool ${r.season.sdW.toFixed(1)}, luma ${r.season.sdL.toFixed(1)})`);
  console.log(`     ${'row'.padEnd(34)} ${'d(R-B)'.padStart(7)} ${'rms'.padStart(6)}   ${'dLUMA'.padStart(6)} ${'rms'.padStart(6)}     d(warm-cool)   d(luma)`);
  const row = (name, s) => console.log(
    `     ${name.padEnd(34)} ${fmt(s.mw, 7)} ${fmt(s.rmsW)}   ${fmt(s.ml, 6)} ${fmt(s.rmsL)}       ${fmt(s.dW, 8)}  ${fmt(s.dL, 8)}`);
  row('FLOOR  same pin twice (must be 0)', r.floor);
  row('SEASON dry peak -> winter', r.season);
  row('GOLDEN day -> golden hour  [BAR]', r.golden);
  const ratio = r.golden.dW ? (r.season.dW / r.golden.dW * 100) : 0;
  console.log(`     ⇒ the season is ${ratio.toFixed(0)}% of the golden hour's warm-cool amplitude` +
              `  (d ${r.season.dW.toFixed(2)} vs ${r.golden.dW.toFixed(2)})\n`);
}

await browser.close();
