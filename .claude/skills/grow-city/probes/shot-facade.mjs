#!/usr/bin/env node
/* shot-facade.mjs — frame the MID-RISE FABRIC for the visual gate (cue (r)).
 *
 * The change under test is the walk-up's facade rhythm, so the shot must land on a
 * DENSE RUN of walk-ups — a fixed `downtown` rect is a coin-flip for that (201), so
 * aim the camera: find the cell whose neighbourhood holds the most MID, and centre on
 * it. The world is deterministic per seed, so HEAD and PATCH aim at the SAME hex and
 * the pair is directly comparable.
 *
 * Freezes in-page (playing=false stops both clocks), pins time/waveT, clears the
 * Math.random-spawned drifters, and forces syncSky/syncStats (204 — a frozen clock
 * does not refresh the DOM). Shoots with page.screenshot() (200 — the user sees the
 * canvas PLUS the DOM).
 *
 *   ART=<file> node shot-facade.mjs <seed> <outdir>
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync, mkdirSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = process.env.ART ||
  [resolve(HERE, '../../../../solvista.html')].find(existsSync);

const seed = process.argv[2] || '42';
const outdir = resolve(process.argv[3] || join(HERE, 'shots/facade' + seed));
mkdirSync(outdir, { recursive: true });

const ZOOM = +(process.env.ZOOM || 4.0);
const VW = 1400, VH = 900;
const CLIP = { x: VW / 2 - 380, y: VH / 2 - 280, width: 760, height: 560 };

const browser = await chromium.launch();
const pg = await browser.newPage({ viewport: { width: VW, height: VH } });
pg.on('pageerror', e => console.log('  PAGE ERROR', e.message));
await pg.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await pg.goto('file://' + ART + '?seed=' + seed + '&warp=61');
await pg.waitForFunction(() => typeof genWorld === 'function');

const freeze = (dayT) => pg.evaluate((dt) => {
  playing = false;
  time = 0; waveT = 0; STARS.length = 0; flock = null;
  dayT = dt; __setTime(dt);
  lastSky = 0; syncSky(performance.now()); syncStats();   // 204: the DOM does not refresh itself
  render();
}, dayT);

// aim: the hex with the most MID in its neighbourhood (deterministic per seed)
const aim = await pg.evaluate(({ ZOOM, VW, VH }) => {
  playing = false;
  let best = null, bestN = -1, total = 0;
  for (const i of HEXI) {
    const c = cells[i]; if (!c || c.t !== T.MID) continue;
    total++;
    const gx = i % G, gy = (i / G) | 0;
    let n = 0;
    for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) {
      const e = cellAt(gx + dx, gy + dy);
      if (e && e.t === T.MID) n++;
    }
    if (n > bestN) { bestN = n; best = [gx, gy]; }
  }
  if (!best) return null;
  const [wx, wy] = ctr(best[0], best[1]);
  scale = ZOOM;
  offX = VW / 2 - wx * scale;
  offY = VH / 2 - wy * scale;
  return { cell: best, cluster: bestN, totalMid: total };
}, { ZOOM, VW, VH });

if (!aim) { console.log('seed ' + seed + ': no MID found'); await browser.close(); process.exit(1); }
console.log(`seed ${seed}: ${aim.totalMid} walk-ups; aimed at ${aim.cell} (${aim.cluster} MID in its 7x7)`);

for (const [nm, dt] of [['day', 0.30], ['night', 0.92]]) {
  await freeze(dt);
  await pg.screenshot({ path: join(outdir, nm + '.png'), clip: CLIP });   // aimed close-up
}
// and one un-zoomed whole-city frame, to read the fabric at the scale a user sees it
await pg.evaluate(() => { zoom = 1; scale = fitScale; offX = fitX; offY = fitY; });  // the artifact's own reset-to-fit
await freeze(0.30);
await pg.screenshot({ path: join(outdir, 'city.png') });
console.log('  -> ' + outdir + '/{day,night,city}.png');
await browser.close();
