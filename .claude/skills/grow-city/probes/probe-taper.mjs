#!/usr/bin/env node
/* probe-taper.mjs — cue (ac): the skyline has MASS but no TAPER.
 *
 * 219 put the tower mass downtown (coreH share 41-45%). Two blind agents, on two
 * seeds, then independently named what is left: "a spine, not a crown; no
 * tallest-in-the-middle gradient" (1234) and "a local thickening, not a peak --
 * height is flat, no tapering silhouette" (7).
 *
 * The suspect (from the header's cue) is the HEIGHT line, L1587:
 *
 *     c.th = (54 + c.v*82) * (0.70 + 0.66*core)
 *            \___________/   \_______________/
 *             noise, 2.52x    centrality, 1.94x   <- noise SWAMPS signal
 *
 *     core = clamp(1 - hexDist(x,y,CBDX,CBDY)/CORER, 0, 1),  CORER = 16
 *
 * But that framing may be incomplete, and this probe exists to check it BEFORE a
 * line is written (probe-before-you-design). Two things the cue does not say:
 *
 *   (1) `core` CLAMPS TO 0 beyond ring 16. Every tower outside CORER gets the
 *       IDENTICAL factor 0.70 -- so out there the skyline is flat BY CONSTRUCTION
 *       and no amount of noise-narrowing can taper it. How many towers is that?
 *   (2) 98 solved `0.70+0.66*core` to HOLD THE MEAN against a mean core of 0.125
 *       over tower sites. That was measured 120 iterations ago. **219 concentrated
 *       COM downtown**, and towers rise on COM -- so mean core over tower sites
 *       has almost certainly MOVED, and the hold-the-mean constant may be stale.
 *
 * Pure world data: no render, no clock, no noise floor, no Math.random to stub.
 * The cheapest instrument in the harness (probe-skyline's method).
 *
 *   node probe-taper.mjs
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(join(HERE, '../../../../solvista.html')).href;

const SEEDS = [7, 42, 1234];
const WARP = 61;
const RINGS = [[0, 4], [5, 8], [9, 12], [13, 16], [17, 22], [23, 99]];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
page.on('pageerror', e => { console.error('PAGE ERROR', e.message); process.exitCode = 1; });
await page.goto(PAGE);
await page.waitForFunction(() => window.__census && window.__warp);

const fmt = (n, w = 6, d = 1) => String(n.toFixed(d)).padStart(w);

for (const seed of SEEDS) {
  const r = await page.evaluate(({ seed, WARP, RINGS }) => {
    playing = false;
    genWorld(seed); __warp(WARP);

    const tw = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cellAt(x, y); if (!c || c.t !== T.TOWER) continue;
      const d = hexDist(x, y, CBDX, CBDY);
      tw.push({ x, y, d, core: Math.max(0, Math.min(1, 1 - d / CORER)), v: c.v, th: c.th, h: c.h });
    }
    /* every developed cell, for the ring-population denominator */
    let devN = 0, devD = 0;
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cellAt(x, y); if (!c || !DEV.has(c.t)) continue;
      devN++; devD += hexDist(x, y, CBDX, CBDY);
    }

    const cs = window.__census();
    const rows = RINGS.map(([a, b]) => {
      const inR = tw.filter(t => t.d >= a && t.d <= b);
      return {
        a, b, n: inR.length,
        meanTh: inR.length ? inR.reduce((s, t) => s + t.th, 0) / inR.length : 0,
        maxTh: inR.length ? Math.max(...inR.map(t => t.th)) : 0,
        meanH: inR.length ? inR.reduce((s, t) => s + t.h, 0) / inR.length : 0,
      };
    });

    /* correlation of height with centrality over the REALIZED tower population */
    const n = tw.length;
    const mx = tw.reduce((s, t) => s + t.core, 0) / n;
    const my = tw.reduce((s, t) => s + t.th, 0) / n;
    let sxy = 0, sxx = 0, syy = 0;
    for (const t of tw) { const dx = t.core - mx, dy = t.th - my; sxy += dx * dy; sxx += dx * dx; syy += dy * dy; }
    const corr = sxy / Math.sqrt(sxx * syy || 1);

    /* THE CROWN, in the viewer's units: where do the TALLEST towers stand? */
    const byTh = [...tw].sort((a, b) => b.th - a.th);
    const top10 = byTh.slice(0, 10);

    return {
      n, meanCore: mx, meanTh: my, corr,
      outsideCORER: tw.filter(t => t.core === 0).length,
      tallestD: byTh[0].d, tallestTh: byTh[0].th,
      top10D: top10.reduce((s, t) => s + t.d, 0) / 10,
      allD: tw.reduce((s, t) => s + t.d, 0) / n,
      devD: devD / devN,
      rows,
      pop: cs.pop, tallTowers: cs.tallTowers, helipads: cs.helipads, towerHt: cs.towerHt,
    };
  }, { seed, WARP, RINGS });

  console.log(`\n=== seed ${seed} ===  towers ${r.n}   pop ${r.pop}   tallTowers ${r.tallTowers}   helipads ${r.helipads}   towerHt ${r.towerHt}`);
  console.log(`  mean core over tower sites : ${r.meanCore.toFixed(3)}   ` +
    `(98 solved 0.70+0.66*core to hold the mean against 0.125)`);
  console.log(`  towers OUTSIDE CORER (core==0, flat 0.70 by construction) : ${r.outsideCORER}/${r.n}` +
    `  = ${(100 * r.outsideCORER / r.n).toFixed(0)}%`);
  console.log(`  corr(th, core) = ${r.corr.toFixed(3)}`);
  console.log(`  TALLEST tower stands at ring ${r.tallestD} (th ${r.tallestTh.toFixed(0)})   ` +
    `top-10 tallest mean dist ${r.top10D.toFixed(1)}  vs all towers ${r.allD.toFixed(1)}  vs developed ${r.devD.toFixed(1)}`);
  console.log(`  ring      n   meanTh   maxTh   meanH`);
  for (const q of r.rows) {
    console.log(`  ${String(q.a).padStart(2)}-${String(q.b).padStart(2)} ${String(q.n).padStart(5)}  ` +
      `${fmt(q.meanTh)}  ${fmt(q.maxTh)}  ${fmt(q.meanH)}`);
  }
}

await browser.close();
