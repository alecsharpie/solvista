#!/usr/bin/env node
/* Aim the camera at the AERIAL CABLE (iter 203) — the object probe-darkline located as
 * iter 202's unexplained "thin dark line drawn OVER the towers/water".
 *
 * A fixed clip is not a framing (201's law): the gondola lines are procedural and sit
 * somewhere different on every seed. So LOCATE the host first — read gonds[].path straight
 * out of the artifact, take the mid-span of the longest line, and drive the artifact's own
 * scale/offX/offY to centre it. Clock frozen in-page (playing=false stops BOTH clocks, so
 * neither the light nor the calendar drifts), one render, no wait, page.screenshot() so the
 * DOM/HUD composites (200's law).
 *
 * node shot-gondola.mjs <seed> <outdir>
 */
import { homedir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync, mkdirSync } from 'node:fs';

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

/* fit (how a user meets the city) + two zooms + the golden hour, when the sky behind the
   cable is at its brightest and a hard dark hairline would be at its ugliest */
const FRAMES = [['fit', 0.30, 1], ['mid', 0.30, 2.6], ['close', 0.30, 4.5], ['golden', 0.68, 2.6]];

for (const [name, dayT, zoom] of FRAMES) {
  const st = await page.evaluate(({ seed, dayT, zoom }) => {
    playing = false;
    genWorld(seed); __warp(61);
    if (typeof STARS !== 'undefined') STARS.length = 0;
    try { flock = null; } catch (e) {}
    waveT = 0; time = 0; __setTime(dayT);

    /* LOCATE the host: the longest cable line, and the middle of its run */
    const g = gonds.filter(q => q.path && q.path.length > 1).sort((a, b) => b.path.length - a.path.length)[0];
    if (!g) return { none: true };
    const mid = g.path[g.path.length >> 1];
    const [wx, wy] = ctr(mid[0], mid[1]);
    const ty = wy - g.h;                        /* aim at the ROPE, not the ground under it */

    if (zoom > 1) {                             /* drive the artifact's OWN camera */
      scale *= zoom;
      offX = innerWidth / 2 - wx * scale;
      offY = innerHeight / 2 - ty * scale;
    }
    render();
    /* self-report the pinned state: phaseWord TAKES t — calling it bare returns 'night'
       for every frame and the tool lies about its own camera */
    return { none: false, spans: g.path.length, h: +g.h.toFixed(1), lines: gonds.length,
             phase: phaseWord(dayT), LITAMT: +LITAMT.toFixed(2), dayT };
  }, { seed, dayT, zoom });

  if (st.none) { console.log(`seed ${seed}: no gondola line`); break; }
  const f = join(out, `s${seed}-${name}.png`);
  await page.screenshot({ path: f });
  console.log(`${f}   ${name} zoom=${zoom}x  t=${st.dayT} phase=${st.phase} LITAMT=${st.LITAMT}  ` +
              `cable: ${st.spans} spans, ride height ${st.h}, ${st.lines} line(s)`);
}
await browser.close();
