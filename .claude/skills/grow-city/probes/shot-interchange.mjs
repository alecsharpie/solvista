#!/usr/bin/env node
/* The camera for iter 211's interchange (Transport x Connect).
 *
 * Aims at a real interchange (c.stop===2) AND the railway platform that reached
 * for it — the claim is "the buses come to the trains", so a frame with only the
 * shelter in it would prove nothing (201: aim at the feature, never guess a rect).
 * Frames the midpoint of the two, so both are in shot.
 *
 * Day only: the shelter queue is drawn under LITAMT<0.55, and the queue is half
 * the point (an interchange takes a trainful).
 *
 *   node shot-interchange.mjs <seed> <outdir>
 */
import { existsSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const CAND = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html')];
const ART = CAND.find(f => existsSync(f));

const seed = +(process.argv[2] || 42);
const out = process.argv[3] || '.';
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on('pageerror', e => console.log('PAGE ERROR:', e.message));
await page.goto(pathToFileURL(ART).href);
await page.waitForTimeout(1200);

const FRAMES = [['fit', 1], ['mid', 2.8], ['close', 5.2]];

for (const [name, zoom] of FRAMES) {
  const st = await page.evaluate(({ seed, zoom }) => {
    playing = false;
    genWorld(seed); __warp(61);
    if (typeof STARS !== 'undefined') STARS.length = 0;
    try { flock = null; } catch (e) {}
    waveT = 0; time = 0; __setTime(0.30);        /* day: the queue draws under LITAMT<0.55 */

    /* LOCATE: an interchange, and the station that claimed it. Prefer one the rule
       sited on a clear-front street -- that is the TYPICAL case (35 of 42 measured),
       not a cherry-pick; the 7 that stand behind a tower do so because their platform
       has no visible street within reach at all. */
    const found = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      if (cells[idx(x, y)].stop !== 2) continue;
      for (const m of monos || []) for (const i of m.sta || []) {
        const [sx, sy] = m.path[i];
        if (hexDist(x, y, sx, sy) <= STOPR) { found.push({ x, y, sx, sy, open: openFront(x, y) }); break; }
      }
    }
    const best = found.find(f => f.open) || found[0];
    if (!best) return { none: true };

    const [bx, by] = ctr(best.x, best.y);
    const [tx, ty] = ctr(best.sx, best.sy);
    const wx = (bx + tx) / 2, wy = (by + ty) / 2;   /* frame the pair: shelter + platform */

    if (zoom > 1) {                                /* drive the artifact's OWN camera */
      scale *= zoom;
      offX = innerWidth / 2 - wx * scale;
      offY = innerHeight / 2 - wy * scale;
    }
    lastSky = 0; syncSky(performance.now()); syncStats();   /* 204: a frozen clock does not refresh the DOM */
    render();

    let ich = 0, ord = 0;
    for (const c of cells) { if (c.stop === 2) ich++; else if (c.stop === 1) ord++; }
    return {
      stop: [best.x, best.y], sta: [best.sx, best.sy], open: best.open,
      nOpen: found.filter(f => f.open).length, nFound: found.length,
      dist: hexDist(best.x, best.y, best.sx, best.sy), ich, ord,
    };
  }, { seed, zoom });

  if (st.none) { console.log(`seed ${seed}: NO INTERCHANGE`); break; }
  const f = join(out, `${seed}-${name}.png`);
  await page.screenshot({ path: f });                       /* 200: DOM-composited */
  console.log(`${f}  seed=${seed} zoom=${zoom}  interchange@${st.stop} station@${st.sta} ` +
              `dist=${st.dist}hex openFront=${st.open} (${st.nOpen}/${st.nFound} clear-front)  ` +
              `(city: ${st.ich} interchanges, ${st.ord} ordinary stops)`);
}
await browser.close();
