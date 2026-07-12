#!/usr/bin/env node
/* probe-towergrow.mjs — how much of a tower's height is PLACEMENT, and how much is
 * the year>=2022 GROWTH rule? And does growth know where downtown is?
 *
 * probe-tapersweep showed that narrowing the placement noise raises corr(th,core)
 * 0.62 -> 0.86 and costs NOTHING -- yet the ENVELOPE stays broken on every variant,
 * including one where a rim tower mathematically CANNOT out-top a core tower at
 * placement. So height is being added AFTER placement, by something centrality-blind.
 *
 * The suspect is L1589, and it is 217's law exactly -- ONE QUANTITY, TWO RULES, and
 * the fix went to one of them:
 *
 *   PLACEMENT  c.th = (54+c.v*82) * (0.70 + 0.66*core)     <- 98 keyed this to `core`
 *   GROWTH     if (TOWER && year>=2022 && rng()<0.02 && c.th < 160)  c.th += 9+c.v*12
 *                                                          ^^^ no `core` ANYWHERE
 *
 * The growth rule is a LEVELLER: it pulls every tower with th<160 up toward a flat
 * universal ceiling, so the rim slowly climbs to the same 160 the core already sits
 * at. It is the anti-taper, and it runs for the last 13 of the city's 61 years.
 *
 * Measures, per ring: placement height (recomputed from v+core, the rule is a pure
 * function of them), realized c.th, the GROWTH between them, and what share of towers
 * have reached the flat cap.
 *
 *   node probe-towergrow.mjs
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

const f = (n, w, d = 1) => String(n.toFixed(d)).padStart(w);
console.log('placement = (54+82v)*(0.70+0.66*core), recomputed.  growth = c.th - placement.\n');

for (const seed of SEEDS) {
  const r = await page.evaluate(({ seed, WARP, RINGS }) => {
    playing = false; genWorld(seed); __warp(WARP);
    const tw = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cellAt(x, y); if (!c || c.t !== T.TOWER) continue;
      const d = hexDist(x, y, CBDX, CBDY);
      const core = Math.max(0, Math.min(1, 1 - d / CORER));
      const place = (54 + c.v * 82) * (0.70 + 0.66 * core);
      tw.push({ d, core, place, th: c.th, grow: c.th - place });
    }
    return RINGS.map(([a, b]) => {
      const r = tw.filter(t => t.d >= a && t.d <= b);
      const m = k => r.length ? r.reduce((s, t) => s + t[k], 0) / r.length : 0;
      return {
        a, b, n: r.length, place: m('place'), th: m('th'), grow: m('grow'),
        maxGrow: r.length ? Math.max(...r.map(t => t.grow)) : 0,
        atCap: r.filter(t => t.th >= 160).length,
      };
    });
  }, { seed, WARP, RINGS });

  console.log(`=== seed ${seed} ===`);
  console.log(`  ring      n   placement    final    GROWTH   maxGrow   at cap(>=160)`);
  for (const q of r) {
    console.log(`  ${String(q.a).padStart(2)}-${String(q.b).padStart(2)} ${String(q.n).padStart(5)}  ` +
      `${f(q.place, 9)} ${f(q.th, 8)} ${f(q.grow, 9)} ${f(q.maxGrow, 9)}   ${String(q.atCap).padStart(3)}/${q.n}`);
  }
  console.log('');
}

await browser.close();
