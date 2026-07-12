#!/usr/bin/env node
/* shot-crown.mjs — the tower-crown camera (cue (af)).
 * Two framings per seed: the WHOLE city (the zoom at which six agents called downtown
 * wallpaper -- the claim is about the skyline, so it must be judged at the skyline's
 * zoom) and a close-up AIMED at the CBD (so the crowns can be checked for z-tears and
 * floating). Freezes the world in-page and forces syncSky/syncStats (204).
 * SRC=/path/to/head.html shoots the same framing on HEAD, so a blind before/after pair
 * frames the identical hexes.
 *   node shot-crown.mjs <seed> <outdir>
 */
import { homedir } from 'node:os';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(process.env.SRC || join(HERE, '../../../../solvista.html')).href;

const seed = process.argv[2] || '42';
const outdir = process.argv[3] || '/tmp/crown';
mkdirSync(outdir, { recursive: true });

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2 });
await p.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});

for (const [tag, t] of [['day', 0.30], ['night', 0.92]]) {
  for (const [zt, zoom] of [['city', 0], ['core', 3.4]]) {
    await p.goto(`${PAGE}?seed=${seed}&warp=61&t=${t}`);
    await p.waitForTimeout(400);
    const gt = await p.evaluate(({ t, seed, zoom }) => {
      playing = false;                  /* stops both clocks */
      genWorld(+seed); __warp(61);
      __setTime(t); __setYear(2035.62);
      if (zoom) {                       /* aim at the CBD: the towers are the subject */
        const [wx, wy] = ctr(CBDX, CBDY);
        scale = zoom;
        offX = innerWidth / 2 - wx * scale;
        offY = innerHeight / 2 - wy * scale;
      }
      lastSky = 0; syncSky(performance.now()); syncStats();   /* 204 */
      render();
      /* the frame self-reports its own state (202): phaseWord takes dayT -- calling it
         bare returns 'night' for every frame and would hand an agent a mislabelled pin */
      return { towers: stats.towers, dayT: +dayT.toFixed(3), phase: phaseWord(dayT),
               sunUp: dayT >= SUNUP && dayT <= SUNDN, lit: +LITAMT.toFixed(2) };
    }, { t, seed, zoom });
    await p.screenshot({ path: join(outdir, `${tag}-${zt}.png`) });
    console.log(`seed ${seed} ${tag}/${zt}: towers=${gt.towers} dayT=${gt.dayT} phase=${gt.phase} sun=${gt.sunUp ? 'UP' : 'down'} LITAMT=${gt.lit}`);
  }
}
await b.close();
