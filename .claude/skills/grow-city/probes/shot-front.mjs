#!/usr/bin/env node
/* shot-front.mjs — the weather camera (iter 236).
 *
 * Freezes the world IN-PAGE: `?year=` drifts ~0.167 yr/s while shoot.mjs waits, and
 * the front is a function of `year`, so a drifting pin would shoot a different sky
 * than it reports (139/202). playing=false stops both clocks; syncSky/syncStats are
 * forced because a frozen clock does not refresh the DOM (204).
 *
 * It SEARCHES for the year that produces a target front while HOLDING THE SEASON FIXED
 * (season = year%1, the front is a ~20yr cycle — so year+k is the same season, different
 * weather). That is what makes this a fair three-way comparison: the only thing that
 * differs between the frames is the weather.
 *
 * Every frame self-reports front / raining-clouds / year / season (202), so a mis-pinned
 * frame is caught by the tool rather than by a gate round.
 *
 *   node shot-front.mjs <seed> <outdir>          SRC=head.html for the control
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { mkdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));

const seed = +(process.argv[2] || 42);
const out = process.argv[3] || join(HERE, '../shots/front');
/* resolve the artifact relative to the PROBE, never an absolute path (SKILL.md) */
const SRC = 'file://' + join(HERE, '../../../../', process.env.SRC || 'solvista.html');
mkdirSync(out, { recursive: true });

/* the three weathers, at ONE season (the golden dry peak) and ONE light (day) */
const TARGETS = [['dry', 0.00], ['gathering', 0.55], ['front', 0.95]];

const br = await chromium.launch();
const page = await br.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2 });
await page.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await page.goto(SRC, { waitUntil: 'load' });

const hasFront = await page.evaluate(() => typeof window.__front === 'function');

for (const [name, target] of TARGETS) {
  const state = await page.evaluate(({ seed, target, hasFront }) => {
    playing = false;                       /* stops BOTH clocks: dayT and year */
    genWorld(seed); __warp(61);
    __setTime(0.30);                       /* day, off the light curve — never guessed (202) */

    /* hold the season (year%1 = .62, the dry peak) and hunt the year for this front */
    let best = null;
    for (let k = 0; k <= 44; k++) {
      const y = 2035.62 + k;
      __setYear(y);
      const f = hasFront ? window.__front().front : 0;
      const d = Math.abs(f - target);
      if (!best || d < best.d) best = { y, f, d };
    }
    __setYear(best.y);

    lastSky = 0; syncSky(performance.now()); syncStats();   /* 204: a frozen clock does not refresh the DOM */
    render();

    const wet = hasFront ? window.__front().wet : clouds.map(c => c.rain ? 1 : 0);
    return { year: best.y, front: hasFront ? best.f : null,
             raining: wet.filter(v => v > 0.02).length,
             heavy: wet.filter(v => v > 0.5).length,
             season: +(best.y % 1).toFixed(2) };
  }, { seed, target, hasFront });

  const tag = `${name}  year=${state.year}  season=${state.season}  front=` +
              (state.front === null ? 'n/a(HEAD)' : state.front.toFixed(2)) +
              `  RAINING=${state.raining}/7 (heavy ${state.heavy})`;
  console.log(`seed ${seed}  ${tag}`);
  await page.screenshot({ path: join(out, `${seed}-${name}.png`) });   /* DOM-composited (200) */
}
await br.close();
