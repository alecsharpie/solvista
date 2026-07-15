/* probe-pitchgame.mjs (iter 307) — does the neighbourhood PITCH keep a schedule?
 *
 * TEMPORAL (134 — every other gate here is frozen, so "a game is never on or off"
 * has no instrument) and reads NO PIXELS, so it has NO NOISE FLOOR AT ALL. It drives
 * dayT directly and asks the page, per FIELD, how full the game is (pitchGame) across
 * the day and across ~10 days.
 *
 * BUILD-AGNOSTIC: it asks whether pitchGame exists and falls back to HEAD's gate
 * (2 players whenever LITAMT<0.4 — a constant by daylight), so ONE file grades HEAD
 * and the patch with no source swap and no cross-build floor (230/236).
 *
 * Headline needs no threshold (236): HEAD reads DISTINCT DAYTIME STATES = 1 per field
 * (always 2 players, on every pitch, every day) — the defect stated.
 *
 * The DESYNC column is the 263 guard: two pitches must NOT fill on the same schedule,
 * or the crowd blinks on as one. We report the max pairwise correlation of game-state
 * across fields — HEAD's is 1.0 (all identical); the patch must be well below.
 */
import { homedir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { existsSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = process.env.SRC || (existsSync(join(HERE, 'solvista.html'))
  ? join(HERE, 'solvista.html') : join(HERE, '../../../../solvista.html'));
const SEEDS = [7, 42, 1234];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
await page.addInitScript(() => { let s = 0x3F17A9 >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await page.goto(pathToFileURL(ART).href);
await page.waitForFunction(() => typeof genWorld === 'function');

console.log(`probe-pitchgame — pitch schedule, ${ART.includes('grow') && !ART.includes('..') ? '(root/patch build)' : ''}`);
console.log('per field: distinct daytime game-states over 10 days, and the busiest day; DESYNC = max pairwise corr across fields\n');

for (const seed of SEEDS) {
  const r = await page.evaluate((seed) => {
    playing = false;
    genWorld(seed);
    __warp(2035 - year);
    const HASGATE = typeof pitchGame === 'function';
    // find FIELD cells
    const fields = [];
    for (let i = 0; i < cells.length; i++) {
      const c = cells[i]; if (c.t === T.FIELD) fields.push([i % G, (i / G) | 0]);
    }
    // sample game-state per field over 10 days x 24 hours
    const DAYS = 10, HRS = 24;
    // per field: array of samples (daytime only), and per (field,day) peak fullness
    const perField = fields.map(() => ({ states: new Set(), samples: [] }));
    const dayPeak = fields.map(() => Array(DAYS).fill(0));
    for (let d = 0; d < DAYS; d++) {
      for (let h = 0; h < HRS; h++) {
        const t = d + h / HRS;
        __setTime(t);
        // recompute the light for this dayT so LITAMT is right
        SUNT = sunWarp(dayT); LITAMT = daylight(SUNT).lit;
        const daytime = LITAMT < 0.5;
        fields.forEach(([x, y], fi) => {
          let g;
          if (HASGATE) g = pitchGame(x, y);
          else g = daytime ? 1 : 0;   // HEAD: 2 players whenever daylight, else none
          const shown = daytime ? g : 0;
          if (daytime) perField[fi].states.add(Math.round(shown * 4) / 4);
          perField[fi].samples.push(daytime ? shown : -1);
          if (shown > dayPeak[fi][d]) dayPeak[fi][d] = shown;
        });
      }
    }
    // desync: max pairwise Pearson corr of the daytime sample vectors
    const vecs = perField.map(p => p.samples.filter(v => v >= 0));
    function corr(a, b) {
      const n = a.length; let sa = 0, sb = 0; for (let i = 0; i < n; i++) { sa += a[i]; sb += b[i]; }
      const ma = sa / n, mb = sb / n; let num = 0, da = 0, db = 0;
      for (let i = 0; i < n; i++) { const u = a[i] - ma, v = b[i] - mb; num += u * v; da += u * u; db += v * v; }
      return (da < 1e-9 || db < 1e-9) ? 1 : num / Math.sqrt(da * db);
    }
    let maxCorr = 0;
    for (let i = 0; i < vecs.length; i++) for (let j = i + 1; j < vecs.length; j++)
      maxCorr = Math.max(maxCorr, corr(vecs[i], vecs[j]));
    const gameDaysPerField = dayPeak.map(dp => dp.filter(v => v > 0.5).length);
    return {
      hasGate: HASGATE, nFields: fields.length,
      distinct: perField.map(p => p.states.size),
      gameDays: gameDaysPerField,
      maxCorr: vecs.length > 1 ? maxCorr : null,
    };
  }, seed);
  const dm = r.distinct.length ? (r.distinct.reduce((a, b) => a + b, 0) / r.distinct.length).toFixed(1) : '-';
  const gd = r.gameDays.length ? (r.gameDays.reduce((a, b) => a + b, 0) / r.gameDays.length).toFixed(1) : '-';
  console.log(`seed ${String(seed).padEnd(5)} ${r.hasGate ? 'PATCH' : 'HEAD '} | fields ${r.nFields} | ` +
    `mean DISTINCT daytime states/field ${dm} | mean game-days/10 ${gd} | ` +
    `DESYNC maxCorr ${r.maxCorr === null ? '(1 field)' : r.maxCorr.toFixed(2)}`);
}
await browser.close();
