#!/usr/bin/env node
/* probe-kelptide.mjs — does the KELP bed answer the tide its own tooltip prints?
 *
 * The seam: describeTile's `tidal` test (L6759) includes T.KELP, so hovering a kelp
 * bed prints a live `Tide` row (High water / Flooding / Ebbing / Low water) — over a
 * draw that read TIDE nowhere. Iter 113's marsh defect, one tile along.
 *
 * The isolation is NOT patch-vs-HEAD: it is LOW TIDE vs HIGH TIDE *within one build*,
 * at a frozen clock, same seed, same genWorld. The only variable is TIDE, so every
 * differing pixel IS a tide response. Run that on BOTH builds and the 2x3 settles the
 * whole claim in one table:
 *
 *   KELP  on BASE  -> ~0      the draw is DEAF (this is the seam the ledger claims)
 *   KELP  on PATCH -> BIG     the fix works
 *   BEACH on BOTH  -> BIG     POSITIVE CONTROL. The beach's damp margin + tidepools
 *                             provably read TIDE (L3431-3481), so if BEACH does not
 *                             move, the tide PIN itself is dead and a "KELP ~0 on
 *                             BASE" would be a false negative, not a finding.
 *   ROAD  on BOTH  -> ~0      NEGATIVE CONTROL: dry land ignores the tide.
 *
 * Clock frozen per iter 195(f): playing=false is NOT a frozen clock — waveT and time
 * keep whatever wall-clock value the RAF loop reached, and the kelp mats/fronds drift
 * on waveT, so an unpinned waveT would drown the signal in sway. Pin both. genWorld +
 * __warp in-page (163c) so the city is byte-identical regardless of load timing; all
 * entity arrays cleared so nothing drifts into a box.
 *
 *   node probe-kelptide.mjs
 */
import { homedir, tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { writeFileSync, existsSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const CAND = [resolve(HERE, 'solvista.html'), resolve(HERE, '../../../../solvista.html'), resolve(HERE, '../../../solvista.html')];
const ROOT = CAND.find(existsSync);
const REPO = dirname(ROOT);
const HEADSRC = execFileSync('git', ['-C', REPO, 'show', 'HEAD:solvista.html']).toString();
const BASE = join(tmpdir(), 'solvista-kelp-base.html');
writeFileSync(BASE, HEADSRC);

const SEEDS = [7, 42, 1234];
const WARP = 61, T_DAY = 0.35;
const LOW = 0.02, HIGH = 0.98;   /* dead low water vs high water (the `?tide=` keyframes) */
const R = 10;                    /* half-box, ~one hex */
const THR = 12;                  /* per-pixel euclidean RGB change that counts as moved */
const WAVET = 12.3, TIME = 40.0; /* pinned: mats drift on waveT, tips on waveT (195f) */
const CAP = 60;                  /* sample cap for the dense control tiles */
const SHRINKS = [1.0, 0.7, 0.5]; /* hex-mask sizes: the sweep that walks out the beach bleed */

/* one render of `build` at seed, pinned to tide `tide`; returns the pixel boxes of
   every KELP / BEACH / ROAD hex on screen. */
async function sample(page, fileUrl, seed, tide) {
  await page.goto(`${fileUrl}?seed=${seed}`);
  await page.waitForTimeout(200);
  return page.evaluate(({ R, WAVET, TIME, seed, warp, t, tide, CAP, SHRINKS }) => {
    Math.random = () => 0.5;
    genWorld(seed); __warp(warp); __setTime(t);
    playing = false;                       /* stops advanceEntities recomputing TIDE from waveT */
    waveT = WAVET; time = TIME;            /* 195(f): playing=false alone does NOT freeze these */
    STARS.length = 0;
    for (const a of [vehicles, bikes, trams, trucks, peds, freighters, birds, shuttles,
      dogs, kites, surfers, dolphins, whales, herons, kayaks, joggers, deer, clouds,
      balloons, copters, boats, ferries]) a.length = 0;
    __setTide(tide);                       /* AFTER the freeze, so nothing advances it back */
    render();

    const dpr = cvs.width / cvs.clientWidth, g = ctx;
    /* Sample only pixels INSIDE the hex, at a shrink factor s, because kelp abuts the
       beach and the beach's damp margin (w2 = 2.4+(1-TIDE)*5, up to ~7px) is drawn on
       the BEACH hex but SPILLS across the shared edge into its neighbours. A plain
       square box around a kelp centre therefore catches a tide-responding beach edge
       and reports it as "kelp". Masking to the hex (and shrinking it) walks that bleed
       out — which is the whole point of the sweep in the output. */
    const inHex = (dx, dy, s) => {
      const X = HW * scale * s, V = VR * scale * s, E = ER * scale * s;
      const ax = Math.abs(dx), ay = Math.abs(dy);
      return ax <= X && ay <= V - (V - E) * (ax / X);
    };
    const grab = (hexes, s) => hexes
      .filter(h => h.sx > 40 && h.sx < innerWidth - 40 && h.sy > 40 && h.sy < innerHeight - 40)
      .slice(0, CAP)
      .map(h => {
        const d = g.getImageData(Math.round(h.sx * dpr) - R * dpr, Math.round(h.sy * dpr) - R * dpr,
          R * 2 * dpr + 1, R * 2 * dpr + 1).data;
        const w = R * 2 * dpr + 1, out = [];
        for (let py = 0; py < w; py++) for (let pxx = 0; pxx < w; pxx++) {
          const dx = (pxx - R * dpr) / dpr, dy = (py - R * dpr) / dpr;
          if (!inHex(dx, dy, s)) continue;
          const i = (py * w + pxx) * 4;
          out.push(d[i], d[i + 1], d[i + 2]);
        }
        return out;
      });
    const K = __find('KELP'), B = __find('BEACH'), Rd = __find('ROAD');
    const res = { nk: K.length };
    for (const s of SHRINKS) res['KELP@' + s] = grab(K, s);
    res.BEACH = grab(B, 1.0); res.ROAD = grab(Rd, 1.0);
    return res;
  }, { R, WAVET, TIME, seed, warp: WARP, t: T_DAY, tide, CAP, SHRINKS });
}

/* % of sampled pixels that moved between the two tide pins (RGB triples) */
function moved(a, b) {
  let px = 0, hit = 0;
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) {
    const A = a[i], B = b[i], m = Math.min(A.length, B.length);
    for (let p = 0; p < m; p += 3) {
      const dr = A[p] - B[p], dg = A[p + 1] - B[p + 1], db = A[p + 2] - B[p + 2];
      px++;
      if (Math.sqrt(dr * dr + dg * dg + db * db) > THR) hit++;
    }
  }
  return px ? (100 * hit / px) : 0;
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
const builds = [['BASE ', pathToFileURL(BASE).href], ['PATCH', pathToFileURL(ROOT).href]];
const out = {};

for (const [name, url] of builds) {
  for (const seed of SEEDS) {
    const lo = await sample(page, url, seed, LOW);
    const hi = await sample(page, url, seed, HIGH);
    const r = { nk: lo.nk, BEACH: moved(lo.BEACH, hi.BEACH), ROAD: moved(lo.ROAD, hi.ROAD) };
    for (const s of SHRINKS) r['K' + s] = moved(lo['KELP@' + s], hi['KELP@' + s]);
    out[`${name}|${seed}`] = r;
  }
}
await browser.close();

console.log('\nLOW water (TIDE=%s) vs HIGH water (TIDE=%s) — same build, same seed, frozen clock.', LOW, HIGH);
console.log('The ONLY variable is TIDE, so every moved pixel is a tide response.');
console.log('\nKELP is sampled inside a hex mask shrunk to s of the hex, to walk out the');
console.log('beach damp-margin bleed across the shared edge (see the header):\n');
console.log('build  seed  kelp#  ' + SHRINKS.map(s => ('KELP s=' + s.toFixed(2)).padStart(11)).join('') + '   BEACH(+ctl)  ROAD(-ctl)');
for (const [name] of builds) {
  for (const seed of SEEDS) {
    const r = out[`${name}|${seed}`];
    console.log('%s  %s  %s %s   %s   %s', name, String(seed).padEnd(4), String(r.nk).padStart(4),
      SHRINKS.map(s => (r['K' + s].toFixed(2) + '%').padStart(11)).join(''),
      (r.BEACH.toFixed(2) + '%').padStart(9), (r.ROAD.toFixed(2) + '%').padStart(8));
  }
}

const g = (n, k) => SEEDS.map(s => out[`${n}|${s}`][k]);
const max = a => Math.max(...a), min = a => Math.min(...a);
const CORE = SHRINKS[SHRINKS.length - 1];               /* the tightest mask: kelp interior only */
const baseK = g('BASE ', 'K' + CORE), patchK = g('PATCH', 'K' + CORE);
const baseB = g('BASE ', 'BEACH'), patchB = g('PATCH', 'BEACH');
const road = [...g('BASE ', 'ROAD'), ...g('PATCH', 'ROAD')];

const pinAlive = min(baseB) > 2 && min(patchB) > 2;   /* the tide pin demonstrably bites */
const wasDeaf = max(baseK) < 0.5;                     /* the seam: HEAD's kelp interior ignored it */
const nowHears = min(patchK) > 5;                     /* the fix: every seed responds */
const ctlClean = max(road) < 0.5;                     /* dry land unmoved */

console.log('\n  positive control  BEACH moves on BOTH builds, so the tide pin is live: %s  [base %s-%s%%, patch %s-%s%%]',
  pinAlive ? 'yes' : 'NO', min(baseB).toFixed(1), max(baseB).toFixed(1), min(patchB).toFixed(1), max(patchB).toFixed(1));
console.log('  the seam          BASE  kelp INTERIOR (s=%s) deaf to the tide (<0.5%%): %s  [max %s%%]', CORE, wasDeaf ? 'yes' : 'NO', max(baseK).toFixed(2));
console.log('  the fix           PATCH kelp interior answers on every seed (>5%%): %s  [min %s%%]', nowHears ? 'yes' : 'NO', min(patchK).toFixed(2));
console.log('  negative control  ROAD unmoved on both (<0.5%%): %s  [max %s%%]', ctlClean ? 'yes' : 'NO', max(road).toFixed(2));

const pass = pinAlive && wasDeaf && nowHears && ctlClean;
console.log('\nVERDICT: %s (%d seeds)\n', pass ? 'PASS' : 'FAIL', SEEDS.length);
process.exit(pass ? 0 : 1);
