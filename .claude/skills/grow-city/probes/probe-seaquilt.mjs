#!/usr/bin/env node
/* IS THE SEA A QUILT? — the NEIGHBOUR-step probe (iter 268).
 *
 * 257 built `probe-seastep` and it asks: what is the RGB step between two DEPTH-ADJACENT
 * sea hexes? That is a true number (10.6 at day) and it ACQUITS the sea. But it is not the
 * step a viewer sees, because it is the wrong ADJACENCY: it compares tone k with tone k+1,
 * and no such pair need be neighbours in the world.
 *
 * The step the eye actually reads is between two hexes that TOUCH. And `seaT` is not depth:
 *
 *     n = 0.62*hashCell(x>>1, y>>1, SEASALT) + 0.38*hashCell(x>>2, y>>2, SEASALT^0x9E3)
 *     seaT[i] = round(clamp((rDeep[i]-1)/DEEPR + (n-0.5)*0.30, 0, 1) * 8)
 *
 * `hashCell` is a spatial HASH — white noise. Downsampling it (x>>1) does not smooth it, it
 * makes it BLOCKY: constant inside a 2x2 block of hexes, and an INDEPENDENT uniform draw
 * across every block boundary. So the comment above it ("so the bands read as shoals and
 * channels rather than as contour lines") states an intent the value cannot deliver — 199's
 * tell, hosted on a comment (209). A coherent shoal needs an INTERPOLATED field; a
 * downsampled hash gives a random jump at every block edge instead.
 *
 * TWO LEDGERS (206), and the second is what stops this from being a cure worse than the
 * disease:
 *   EFFECT — the neighbour step. Mean/p90 |dRGB| between TOUCHING sea hexes, and the share
 *            of neighbour pairs jumping >= 2 tones. This is the quilt.
 *   COST   — the seabed's LARGE-SCALE variance (SD of the tone field). The two octaves were
 *            put there to give the sea shoals and channels, and that is worth keeping. A
 *            "fix" that flattens the sea to smooth depth contours has destroyed the feature
 *            to fix its rendering. This column MUST hold.
 *
 * VARIANTS, all computed from the artifact's OWN rDeep, in one page, no render, no clock,
 * no pixels, no noise floor, nothing to stub:
 *   HEAD    — the blocky downsampled hash, as it stood before iter 268.
 *   SHIPPED — reads the artifact's ACTUAL seaT, so the table grades the draw the city really
 *             makes and not my model of it (248's Part B). It must land on SMOOTH.
 *   DEPTH   — noise amplitude 0. Isolates how much of the neighbour step is DEPTH, i.e. the
 *             floor no fix can go below. (If HEAD ~ DEPTH, the noise is innocent and I am
 *             in the wrong file.)
 *   SMOOTH  — the same two octaves, same amplitude, same weights, BILINEARLY INTERPOLATED
 *             between the hash lattice points instead of sampled blockwise.
 *
 *   node probe-seaquilt.mjs
 */
import { homedir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html')].find(f => existsSync(f));

const SEEDS = [42, 7, 1234];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
await page.goto(pathToFileURL(ART).href);
await page.waitForTimeout(400);

const out = await page.evaluate((seeds) => {
  const parse = s => s.match(/\d+/g).map(Number);
  const chroma = c => Math.max(...c) - Math.min(...c);
  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
  playing = false;

  /* the golden pin is DERIVED from the shipped light curve, never typed (264/265) */
  const goldenPin = () => {
    let best = 0, bt = 0.7;
    for (let t = 0.5; t < 1.0; t += 0.002) {
      const dl = daylight(t);
      const g = Math.max(0, Math.min(1, (dl.skyBot[0] - dl.skyBot[2] - 70) / 70));
      if (g > best) { best = g; bt = t; }
    }
    return { t: bt, gwarm: best };
  };

  const pinLight = (t) => {
    __setTime(t);
    const dl = daylight(dayT); setLight(dl);
    GWARM = Math.max(0, Math.min(1, (dl.skyBot[0] - dl.skyBot[2] - 70) / 70));
    GWSB = dl.skyBot;
    if (typeof GWST !== 'undefined') GWST = dl.skyTop;
  };

  /* the three seabed fields, all from the artifact's own rDeep */
  const fields = {
    HEAD: (x, y) => 0.62 * hashCell(x >> 1, y >> 1, SEASALT) + 0.38 * hashCell(x >> 2, y >> 2, SEASALT ^ 0x9E3),
    DEPTH: () => 0.5,                       /* amplitude 0: (n-0.5) == 0 */
    SHIPPED: null,                          /* reads the artifact's own seaT (see below) */
    SMOOTH: (x, y) => {
      /* same two octaves, same weights, same amplitude -- but INTERPOLATED between the
         hash lattice points instead of held constant across each block. */
      const oct = (x, y, sh, salt) => {
        const s = 1 << sh, fx = x / s, fy = y / s;
        const x0 = Math.floor(fx), y0 = Math.floor(fy);
        const tx = fx - x0, ty = fy - y0;
        const sx = tx * tx * (3 - 2 * tx), sy = ty * ty * (3 - 2 * ty);   /* smoothstep */
        const h00 = hashCell(x0, y0, salt), h10 = hashCell(x0 + 1, y0, salt);
        const h01 = hashCell(x0, y0 + 1, salt), h11 = hashCell(x0 + 1, y0 + 1, salt);
        return (h00 * (1 - sx) + h10 * sx) * (1 - sy) + (h01 * (1 - sx) + h11 * sx) * sy;
      };
      return 0.62 * oct(x, y, 1, SEASALT) + 0.38 * oct(x, y, 2, SEASALT ^ 0x9E3);
    },
  };

  const res = {};
  let golden;
  const PINS = [{ name: 'day', t: 0.30 }, { name: 'golden', t: 0 }];

  for (const seed of seeds) {
    genWorld(seed); __warp(61); __setYear(2035.62);
    /* DERIVE the pin AT THE YEAR BEING SHOT -- sunWarp gives the curve a `year` term (261),
       so a pin searched before __setYear lands on a different season's sunset (264). */
    golden = goldenPin(); PINS[1].t = golden.t;
    res[seed] = { golden };

    for (const [vname, fn] of Object.entries(fields)) {
      /* rebuild the tone field with this variant's noise, from the artifact's own rDeep --
         EXCEPT for SHIPPED, which reads the artifact's ACTUAL seaT, so the table grades the
         draw the city really makes and not just my arithmetic (248's Part B). */
      const T = new Int8Array(G * G).fill(-1);
      for (const i of HEXI) {
        if (!rDeep[i]) continue;
        if (vname === 'SHIPPED') { T[i] = seaT[i]; continue; }
        const x = i % G, y = (i / G) | 0;
        const n = fn(x, y);
        T[i] = Math.round(Math.max(0, Math.min(1, (rDeep[i] - 1) / DEEPR + (n - 0.5) * 0.30)) * 8);
      }

      /* COST ledger: the seabed's large-scale variety (SD of the tone field, in eighths) */
      const vals = []; for (const i of HEXI) if (T[i] >= 0) vals.push(T[i]);
      const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
      const sd = Math.sqrt(vals.reduce((a, b) => a + (b - mean) ** 2, 0) / vals.length);

      const perPin = {};
      for (const p of PINS) {
        pinLight(p.t);
        const cols = []; for (let k = 0; k <= 8; k++) cols.push(parse(seaFace(k / 8)));
        const chr = chroma(cols[4]);

        /* EFFECT ledger: the step between hexes that actually TOUCH */
        const steps = []; let jump2 = 0;
        for (const i of HEXI) {
          if (T[i] < 0) continue;
          const x = i % G, y = (i / G) | 0;
          for (const [dx, dy] of nbrDirs(y)) {
            const j = idx(x + dx, y + dy);
            if (j <= i || j < 0 || j >= G * G || T[j] < 0) continue;   /* each pair once */
            const dt = Math.abs(T[i] - T[j]);
            if (dt >= 2) jump2++;
            steps.push(dist(cols[T[i]], cols[T[j]]));
          }
        }
        steps.sort((a, b) => a - b);
        const m = steps.reduce((a, b) => a + b, 0) / steps.length;
        perPin[p.name] = {
          t: +p.t.toFixed(3),
          step: m, p90: steps[Math.floor(steps.length * 0.90)], max: steps[steps.length - 1],
          ratio: m / chr, chroma: chr,
          jump2: 100 * jump2 / steps.length, pairs: steps.length,
        };
      }
      res[seed][vname] = { sd: sd / 8, mean: mean / 8, pins: perPin };
    }
  }
  return res;
}, SEEDS);

await browser.close();

const g = out[SEEDS[0]].golden;
console.log(`
IS THE SEA A QUILT?  the step between sea hexes that actually TOUCH
render-free: the artifact's own rDeep + seaFace(), no pixels, no clock, no noise floor
golden pin DERIVED from the shipped light curve: t=${g.t.toFixed(3)} (GWARM peaks ${g.gwarm.toFixed(3)}) -- never typed (264)

  EFFECT: the neighbour step (the quilt)          COST: the seabed's own variety (the shoals)
  ------------------------------------------------------------------------------------------`);
for (const seed of SEEDS) {
  console.log(`\n  seed ${seed}`);
  console.log(`    light   variant | nbr step  p90   max | step/chroma | >=2-tone jumps | tone SD`);
  console.log(`    -----------------------------------------------------------------------------`);
  for (const pin of ['day', 'golden']) {
    for (const v of ['HEAD', 'SHIPPED', 'DEPTH', 'SMOOTH']) {
      const r = out[seed][v].pins[pin], sd = out[seed][v].sd;
      console.log(`    ${pin.padEnd(6)}  ${v.padEnd(6)} |` +
        `  ${r.step.toFixed(1).padStart(5)}  ${r.p90.toFixed(1).padStart(4)}  ${r.max.toFixed(1).padStart(4)} |` +
        `    ${r.ratio.toFixed(2)}     |     ${r.jump2.toFixed(1).padStart(4)}%      |  ${sd.toFixed(3)}`);
    }
  }
}
console.log(`
  READ
    DEPTH is the FLOOR -- the neighbour step with the noise switched off. It is what no fix
    can go below, and if HEAD sits on it the noise is innocent and the quilt is elsewhere.
    SMOOTH keeps the same two octaves, the same weights and the same amplitude, and only
    stops them being piecewise-constant.
    step/chroma is 257's unit: the terrace measured against the surface's OWN colour. The
    DAY row of a healthy sea is the bar -- it is the one the artifact has always accepted.
    tone SD is the MUST-NOT-MOVE column: it is the shoals. A fix that takes it to ~0 has
    flattened the seabed into depth contours and destroyed the feature to fix its render.
`);
