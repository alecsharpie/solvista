/* iter 311 — does the WIND keep a calendar?  (Water & coast × Deepen/interconnect)
 *
 * WINDA is the single gust cycle the whole coast reads (whitecaps + windrows via
 * seaState(), the surf, and the trees/palms/flags/clouds/kites). It was a pure
 * function of `time`, so the sea broke exactly as hard in every season. This lap
 * scales it by the calendar, CENTRED on the season's mean, so:
 *   - PATCH: mean sea roughness swings WINTER > SUMMER  (DISTINCT > 1)
 *   - HEAD (windSeason=()=>1, = no seasonal term): roughness CONSTANT across
 *     seasons at fixed time (DISTINCT = 1) — the defect stated (236)
 *   - the YEAR-MEAN is held: avg over the whole year == HEAD's value (245)
 *   - the EQUINOX is a byte-identical fixed point, proved by stubbing the
 *     PREDICATE, never a float year (253/261): windSeason live == windSeason()=>1
 *     at seasonCool()==0.5, to the last bit.
 *   - CONTROL: TIDE has no seasonal term, so it is identical across seasons.
 *
 * Render-free: WINDA/seaState are pure globals, so there is NO NOISE FLOOR AT ALL
 * and nothing to stub. Build-agnostic — one file grades HEAD (windSeason stub)
 * and the patch. */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright/index.mjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = 'file://' + join(HERE, '../../../../solvista.html');

// four calendar points: dry peak (summer), wet trough (winter), two equinoxes.
const SEASONS = [
  ['summer  (dry peak) ', 0.62],
  ['autumn  (equinox)  ', 0.87],
  ['winter  (wet trough)', 0.12],
  ['spring  (equinox)  ', 0.37],
];

const run = async (seed) => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto(ART + '?seed=' + seed, { waitUntil: 'networkidle' });
  await p.waitForTimeout(300);

  // sweep the gust cycle so we compare the SEASONAL MEAN, not a single lull/gust.
  // slow term period 2*pi/0.13 ~= 48; sample two full periods.
  const NT = 240, TMAX = 100;

  const measure = await p.evaluate(({ SEASONS, NT, TMAX }) => {
    const yr0 = Math.floor(year);
    const sweep = (season, headMode) => {
      const keepWS = window.windSeason;
      if (headMode) window.windSeason = () => 1;      // == no seasonal term == HEAD
      year = yr0 + season;
      let wSum = 0, sSum = 0, wMax = -1, wMin = 2;
      const samp = [];
      for (let i = 0; i < NT; i++) {
        time = (i / NT) * TMAX;
        advanceEntities(0, 1);                         // recompute WINDA/TIDE at this time+season
        wSum += WINDA; sSum += seaState();
        wMax = Math.max(wMax, WINDA); wMin = Math.min(wMin, WINDA);
        samp.push(WINDA);
      }
      window.windSeason = keepWS;
      return { meanW: wSum / NT, meanS: sSum / NT, wMax, wMin, samp };
    };
    const out = { patch: [], head: [], tide: [] };
    for (const [name, s] of SEASONS) {
      out.patch.push([name, sweep(s, false)]);
      out.head.push([name, sweep(s, true)]);
      // TIDE control: read TIDE at one fixed time across seasons
      year = yr0 + s; time = 12.34; advanceEntities(0, 1);
      out.tide.push([name, TIDE]);
    }
    return out;
  }, { SEASONS, NT, TMAX });
  await b.close();
  return measure;
};

const fmt = n => (n).toFixed(4);
for (const seed of [42, 7]) {
  const m = await run(seed);
  console.log(`\n===== seed ${seed} =====`);
  console.log('season                 |  PATCH meanWINDA meanSeaState (max/min) |  HEAD meanWINDA meanSeaState');
  let fixMax = 0, pMeans = [], hMeans = [];
  for (let i = 0; i < SEASONS.length; i++) {
    const [name, p] = m.patch[i], [, h] = m.head[i];
    pMeans.push(p.meanS); hMeans.push(h.meanS);
    // fixed-point check at the two equinoxes (i==1,3): patch samp must equal head samp
    if (i === 1 || i === 3) {
      let d = 0; for (let k = 0; k < p.samp.length; k++) d = Math.max(d, Math.abs(p.samp[k] - h.samp[k]));
      fixMax = Math.max(fixMax, d);
    }
    console.log(`${name} |  ${fmt(p.meanW)}   ${fmt(p.meanS)}  (${fmt(p.wMax)}/${fmt(p.wMin)})  |  ${fmt(h.meanW)}   ${fmt(h.meanS)}`);
  }
  const distinctH = new Set(hMeans.map(x => x.toFixed(6))).size;
  const distinctP = new Set(pMeans.map(x => x.toFixed(6))).size;
  const yrMeanP = pMeans.reduce((a, b) => a + b) / pMeans.length;
  const yrMeanH = hMeans.reduce((a, b) => a + b) / hMeans.length;
  console.log(`DISTINCT seaState across seasons:  PATCH ${distinctP}  |  HEAD ${distinctH}  (HEAD must be 1 — the defect stated, 236)`);
  console.log(`WINTER/SUMMER seaState ratio:      ${(pMeans[2] / pMeans[0]).toFixed(3)}x   (winter rougher; HEAD ${(hMeans[2] / hMeans[0]).toFixed(3)}x)`);
  console.log(`YEAR-MEAN seaState (held, 245):    PATCH ${fmt(yrMeanP)}  |  HEAD ${fmt(yrMeanH)}  (delta ${fmt(yrMeanP - yrMeanH)})`);
  console.log(`EQUINOX FIXED POINT (253):         max|WINDA_patch - WINDA_head| = ${fixMax.toExponential(2)}  (must be 0)`);
  console.log('TIDE control (no seasonal term, must be identical across seasons):');
  console.log('  ' + m.tide.map(([n, t]) => t.toFixed(5)).join('  ') + `  -> DISTINCT ${new Set(m.tide.map(([, t]) => t.toFixed(6))).size} (must be 1)`);
}
