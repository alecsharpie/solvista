#!/usr/bin/env node
/* probe-bloomseason.mjs — DO THE GRASSLAND WILDFLOWERS ANSWER THE SPRING CALENDAR?
 *
 * `bloomAt` (L5495) — the excitable-media bloom wave drawn on every MEADOW and
 * SHOREPARK hex — opened with NO season gate: it drew its flowers (and butterflies)
 * whenever c.bloom>0, all year round, while a wildflower meadow is a spring→early-
 * summer phenomenon that scorches to bare gold by the dry peak and stands as dry
 * grass through the summer, the autumn and the deep-winter snow. The forest-floor
 * ephemerals already keep the calendar (springBloom, L1881); the grassland wave did
 * not — and with the snow field shipped at iter 321, HEAD draws its flowers ON TOP
 * OF THE SNOW in deep winter.
 *
 * This is the 271/286/322 pattern (make the seasonal thing answer the calendar), in
 * the neglected Nature domain. The fix gates the DRAW on bloomSeason() (a raised
 * trapezoid centred on spring, 0 by the dry peak and through winter); the CA (c.bloom)
 * is UNTOUCHED, so the seeded stream and census are byte-identical.
 *
 * The change is DRAW-ONLY, so c.bloom is IDENTICAL between builds — which lets a
 * frozen-world year sweep isolate the season gate perfectly (freeze one world, vary
 * `year`, and only the draw mask moves).
 *
 * PART A — TEMPORAL (134), NO PIXELS ⇒ no noise floor. Freeze one world; per season,
 *   count the wildflower hexes the SHIPPED draw rule makes VISIBLE (bloom>0 AND, on
 *   the patch, bloomSeason()>0 — the real gate, not a re-implementation, 249). HEAD
 *   has no bloomSeason ⇒ flowers drawn in every season ⇒ DISTINCT=1 & nonzero
 *   everywhere = the defect stated (236). MUST-NOT-MOVE control (250): the raw CA
 *   count (bloom>0) — the medium — must be BYTE-IDENTICAL HEAD vs PATCH and flat
 *   across the frozen year (I never re-tick). FREE POSITIVE CONTROL (248): springBloom
 *   (the FOREST ephemeral) — already seasonal on BOTH builds, proving the year pin is
 *   live and that HEAD's forest flowers already behaved; only the grassland didn't.
 *
 * PART B — THE SNOW OVERLAP (the doubly-wrong sub-case): build the snow field in deep
 *   winter, then count MEADOW hexes where HEAD would draw a flower (bloom>0) that ALSO
 *   lie under snow (snow>SNOWSHOW). HEAD flowers N of them ON the snow; the patch, 0.
 *
 * Build-agnostic via SRC (HEAD's bloomSeason is undefined ⇒ gate treated as always-on).
 */
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = existsSync(join(HERE, 'solvista.html')) ? join(HERE, 'solvista.html')
                                                     : join(HERE, '../../../../solvista.html');
const SRC = process.env.SRC || ROOT;
const PAGE = pathToFileURL(SRC).href;

const SEEDS = [7, 42, 1234];
const WARP = 26;                 /* ~2000: SHOREPARK (~100 hexes) AND MEADOW both still stand */
const SEASONS = [['winter', 0.12], ['spring', 0.34], ['l.sprg', 0.46],
                 ['summer', 0.62], ['autumn', 0.87], ['e.wint', 0.94]];

console.log(`\nartifact: ${SRC}\n`);

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
await p.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await p.goto(PAGE);
await p.waitForFunction(() => typeof window.__warp === 'function');

/* ─── PART A ── temporal: do the wildflowers open only in spring? ───────────────── */
console.log('PART A — season sweep, wildflower hexes the DRAW makes visible (bloom>0 & in-season).');
console.log('         MEADOW+SHOREPARK drawn  |  raw CA bloom>0 (MUST NOT MOVE)  |  season factor');
const A = [];
for (const seed of SEEDS) {
  const r = await p.evaluate(({ seed, warp, seasons }) => {
    playing = false;
    genWorld(seed); __warp(warp);                     /* __warp runs tick() each step ⇒ wave established */
    const hasNew = typeof bloomSeason === 'function';
    const isHost = c => c.t === T.MEADOW || c.t === T.SHOREPARK;
    const raw = cells.filter(c => isHost(c) && c.bloom > 0).length;   /* the CA medium — frozen, build-shared */
    const rows = [];
    for (const [name, s] of seasons) {
      const yr = 2000 + s; __setYear(yr);
      const bs = hasNew ? bloomSeason() : 1;                          /* the real draw gate, 249 */
      const drawn = bs > 0 ? cells.filter(c => isHost(c) && c.bloom > 0).length : 0;
      rows.push({ name, drawn, bs: Math.round(bs * 100) / 100, sp: Math.round(springBloom() * 100) / 100 });
    }
    return { hasNew, raw, rows, distinct: new Set(rows.map(x => x.drawn)).size,
             anyOffSeason: rows.filter(x => x.name === 'summer' || x.name === 'autumn' || x.name === 'winter')
                               .some(x => x.drawn > 0) };
  }, { seed, warp: WARP, seasons: SEASONS });
  A.push({ seed, ...r });
  const cells = r.rows.map(x => `${x.name} ${String(x.drawn).padStart(3)}`).join(' | ');
  console.log(`  seed ${String(seed).padStart(4)}  ${cells}   DISTINCT ${r.distinct}  raw ${r.raw}`);
}
const springF = A[0].rows.map(x => `${x.name} ${x.bs}`).join(' | ');
console.log(`  bloomSeason() factor:  ${springF}`);
console.log(`  springBloom() (FOREST control, already seasonal both builds):  ${A[0].rows.map(x => `${x.name} ${x.sp}`).join(' | ')}`);
console.log(`  build: ${A[0].hasNew ? 'PATCH (bloomSeason present)' : 'HEAD (no gate — flowers every season)'}`);
console.log(`  off-season flowers drawn (winter/summer/autumn)?  ${A.map(a => `${a.seed}:${a.anyOffSeason}`).join('  ')}`);

/* ─── PART B ── the snow overlap: flowers drawn ON the winter snow ──────────────── */
console.log('\nPART B — deep winter: MEADOW hexes with a flower (bloom>0) that ALSO lie under snow.');
console.log('         "flowers on snow": how many the DRAW actually paints there.');
for (const seed of [7, 42, 1234]) {
  const r = await p.evaluate(({ seed, warp }) => {
    playing = false;
    genWorld(seed); __warp(warp);
    __setYear((year | 0) + 0.12);                     /* deep-winter phase (seasonCool>SNOW0) */
    for (let k = 0; k < 10; k++) tick();              /* settle the snow field + advance the wave */
    const hasNew = typeof bloomSeason === 'function';
    const bs = hasNew ? bloomSeason() : 1;
    const onSnow = cells.filter(c => c.t === T.MEADOW && c.bloom > 0 && c.snow > SNOWSHOW).length;
    const snowyMeadow = cells.filter(c => c.t === T.MEADOW && c.snow > SNOWSHOW).length;
    return { onSnow, drawnOnSnow: bs > 0 ? onSnow : 0, snowyMeadow, bs: Math.round(bs * 100) / 100 };
  }, { seed, warp: WARP });
  console.log(`  seed ${String(seed).padStart(4)}  meadow-under-snow ${String(r.snowyMeadow).padStart(3)}  |  with a flower ${String(r.onSnow).padStart(2)}  |  DRAWN on snow ${r.drawnOnSnow}  (bloomSeason ${r.bs})`);
}

await b.close();
