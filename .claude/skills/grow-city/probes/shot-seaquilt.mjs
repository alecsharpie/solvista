#!/usr/bin/env node
/* The sea-quilt camera (iter 268).
 *
 * AIMED BY THE MEASURED DEFECT (226's aim-by-ink, on a world field instead of on ink): the
 * close-up is centred on the sea hex with the most >=2-tone neighbour jumps around it in
 * HEAD — i.e. where the quilt provably IS, not where I guess it is. The aim is computed
 * once and FORCED onto the other build via AIM=wx,wy, so both builds frame the IDENTICAL
 * hex and the pair is genuinely blind.
 *
 * DAY is the pin, and it is derived, not chosen for flattery: the neighbour step is 3x
 * bigger at day (5.2) than at golden (1.7), so day is where the defect lives — and it is
 * the frame both step-back agents called a quilt.
 *
 * Frames are named BY FILE (239), never A/B, and the whole-city frame is shot too (the
 * un-zoomed rule) because a fix to the sea must not be judged only on the sea.
 * page.screenshot(), not the canvas, per 200.
 *
 *   node shot-seaquilt.mjs <seed> <outdir> [SRC=/path/to/other.html] [AIM=wx,wy] [TAG=name]
 */
import { homedir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync, mkdirSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const DEFAULT = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html')].find(f => existsSync(f));

const seed = Number(process.argv[2] || 42);
const outdir = process.argv[3] || './shots/seaquilt';
const SRC = process.env.SRC || DEFAULT;
const TAG = process.env.TAG || 'patch';
const AIM = process.env.AIM ? process.env.AIM.split(',').map(Number) : null;
mkdirSync(outdir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2 });
await page.goto(pathToFileURL(SRC).href);
await page.waitForTimeout(400);

const info = await page.evaluate(({ seed, aim }) => {
  playing = false;                       /* stops BOTH clocks */
  genWorld(seed); __warp(61); __setYear(2035.62); __setTime(0.30);

  /* aim at the hex with the most >=2-tone jumps around it -- the measured quilt */
  let best = null;
  if (!aim) {
    for (const i of HEXI) {
      if (!rDeep[i]) continue;
      const x = i % G, y = (i / G) | 0;
      let j2 = 0, n = 0;
      for (const [dx, dy] of nbrDirs(y)) {
        const k = idx(x + dx, y + dy);
        if (k < 0 || k >= G * G || !rDeep[k]) continue;
        n++; if (Math.abs(seaT[i] - seaT[k]) >= 2) j2++;
      }
      if (n < 6) continue;
      /* ...and the whole CROP must be open water, not just the hex. A rim hex can have six
         sea neighbours and still sit at the plate's edge with void beyond it -- which is
         how the first cut framed 45% sea and would have asked an agent to judge the sea in
         a frame that was half sky. Bound by the crop's EXTENT, not by its anchor (248). */
      let tot = 0, s = 0;
      for (let ddy = -4; ddy <= 4; ddy++) for (let ddx = -4; ddx <= 4; ddx++) {
        const xx = x + ddx, yy = y + ddy; tot++;
        if (xx >= 0 && xx < G && yy >= 0 && yy < G && rDeep[idx(xx, yy)]) s++;
      }
      if (s / tot < 0.85) continue;
      if (!best || j2 > best.j2) { const c = ctr(x, y); best = { j2, wx: c[0], wy: c[1], x, y }; }
    }
  }
  const wx = aim ? aim[0] : best.wx, wy = aim ? aim[1] : best.wy;

  const shots = {};
  /* whole city, un-zoomed: the fix must not be judged only on the sea */
  scale = fitScale; offX = fitX; offY = fitY;
  render(); lastSky = 0; syncSky(performance.now()); syncStats();
  shots.city = true;
  return { wx, wy, aimed: !aim, j2: best ? best.j2 : -1 };
}, { seed, aim: AIM });

await page.screenshot({ path: join(outdir, `s${seed}-${TAG}-city.png`) });

/* the close-up, at the aim. The frame SELF-REPORTS how much sea is actually in it (202):
   a crop that has wandered onto the coast or the horizon is caught by the tool, not by an
   agent -- and "the sea is a quilt" cannot be judged in a frame with no sea in it. */
const crop = await page.evaluate(({ wx, wy }) => {
  scale = 5.0;
  offX = innerWidth / 2 - wx * scale;
  offY = innerHeight / 2 - wy * scale;
  render(); lastSky = 0; syncSky(performance.now()); syncStats();
  let inView = 0, sea = 0;
  for (const i of HEXI) {
    const x = i % G, y = (i / G) | 0, c = ctr(x, y);
    const sx = c[0] * scale + offX, sy = c[1] * scale + offY;
    if (sx < 0 || sx > innerWidth || sy < 0 || sy > innerHeight) continue;
    inView++; if (rDeep[i]) sea++;
  }
  return { inView, sea, frac: sea / inView };
}, info);
await page.screenshot({ path: join(outdir, `s${seed}-${TAG}-sea.png`) });
console.log(`  close-up: ${crop.sea}/${crop.inView} hexes in frame are SEA (${(crop.frac * 100).toFixed(0)}%)` +
  `${crop.frac < 0.6 ? '  *** THE CROP IS NOT OPEN WATER -- RE-AIM ***' : ''}`);

await browser.close();
console.log(`  seed ${seed} [${TAG}]  aim=${info.wx.toFixed(1)},${info.wy.toFixed(1)} ` +
  `${info.aimed ? `(AIMED: hex with ${info.j2} hard jumps)` : '(forced)'}  -> ${outdir}/s${seed}-${TAG}-{city,sea}.png`);
console.log(`  AIM=${info.wx.toFixed(3)},${info.wy.toFixed(3)}`);
