#!/usr/bin/env node
/* shot-seam.mjs — the visual gate for iter 215 (the sand<->park seam, cue (v)).
 * Per seed: the whole city (the cumulative read) + a close-up AIMED at the longest
 * run of sand-touching-green (201: a fixed clip is not a framing — the coast moves
 * seed to seed). Moderate zoom, not fit and not 7x (iter 159's law about judging a
 * subtle coast ornament). Clock frozen in-page per 202/204; page.screenshot per 200.
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = process.env.SRC ? resolve(process.env.SRC) : join(HERE, '../../../../solvista.html');
const seed = +(process.argv[2] || 42), outdir = resolve(process.argv[3] || 'shots/seam');
const { mkdirSync } = await import('node:fs');
mkdirSync(outdir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
await page.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await page.goto(pathToFileURL(SRC).href);
await page.waitForFunction(() => window.__census);

for (const [name, t, zoom] of [['whole', 0.30, 1], ['seam-day', 0.30, 4.2], ['seam-night', 0.92, 4.2]]) {
  const info = await page.evaluate(({ sd, tt, zm }) => {
    playing = false; genWorld(sd); __warp(61);
    STARS.length = 0; flock = null; time = 0; waveT = 0;
    __setTime(tt); __setYear(2035.62);
    if (zm > 1) {
      /* aim at the hex with the most seam around it — the longest run of the boundary */
      const SAND = new Set([T.BEACH, T.DUNE]), GRN = new Set([T.SHOREPARK, T.PARK, T.MEADOW]);
      let best = null, bs = -1;
      for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
        const c = cellAt(x, y); if (!c || !SAND.has(c.t)) continue;
        if (countAround(x, y, 1, n => GRN.has(n.t)) === 0) continue;
        const s = countAround(x, y, 3, n => (SAND.has(n.t) &&
                    countAround(n.x, n.y, 1, m => GRN.has(m.t)) > 0));
        if (s > bs) { bs = s; best = [x, y]; }
      }
      const [wx, wy] = px(best[0] + 0.5, best[1] + 0.5);
      scale = zm; offX = innerWidth / 2 - wx * zm; offY = innerHeight / 2 - wy * zm;
    }
    lastSky = 0; syncSky(performance.now()); syncStats();   /* 204 */
    render();
    return { t: dayT.toFixed(2), phase: phaseWord ? phaseWord() : '?', lit: LITAMT.toFixed(2) };
  }, { sd: seed, tt: t, zm: zoom });
  const png = join(outdir, `${name}.png`);
  await page.screenshot({ path: png });          /* DOM composited (200) */
  console.log(`${png}   seed=${seed} ${name}  dayT=${info.t} LITAMT=${info.lit} phase=${info.phase}`);
}
await browser.close();
