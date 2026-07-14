/* shot-kelp — the camera for iter 282's kelp bed.
 *
 * TWO framings, and the first one is the one that matters:
 *   city   the WHOLE plate, un-zoomed. Kelp is this loop's most notorious
 *          regression -- it "lined the entire coast dark for ~13 iterations"
 *          precisely because every visual check zoomed on the new tile and never
 *          re-read the coastline as a whole. So the un-zoomed frame is REQUIRED,
 *          and it is the frame the coast-darkening question is asked of.
 *   bed    a close-up AIMED at the largest bed (bedSize, the artifact's own flood
 *          fill) -- never a fixed clip, which on a procedural coast lands on open
 *          water (201).
 *
 * Terrain is identical across builds except the bed itself (the pass draws zero
 * rng() and pop/dev/roads are byte-identical), so a HEAD/patch pair is a genuinely
 * blind A/B: AIM= forces HEAD to frame the identical hex.
 *
 * Frames are named BY FILE with MEANINGLESS tokens, and the map is CROSSED between
 * seeds, so neither an order nor an alphabet can carry the answer (239/238/268).
 * Clock frozen in-page; page.screenshot() so the DOM composites (200).
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));

const SRC = process.env.SRC || join(HERE, '../../../../solvista.html');
const TOKEN = process.env.TOKEN || 'kappa';
const SEED = +(process.argv[2] || 42);
const OUT = process.argv[3] || join(HERE, '../shots/kelp');
const AIM = process.env.AIM ? process.env.AIM.split(',').map(Number) : null;
mkdirSync(OUT, { recursive: true });

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await p.goto(pathToFileURL(SRC).href);
await p.waitForTimeout(500);

/* freeze the world, build the city, pin every clock (163/195f/199/275) */
const info = await p.evaluate((seed) => {
  playing = false;
  genWorld(seed);
  window.__warp(2035 - year);
  time = 40; waveT = 12; STARS.length = 0; flock = null;
  if (window.__setWind) window.__setWind(0.5);
  if (window.__setTide) window.__setTide(0.59);        /* neutral tide: nothing tidal can move */
  window.__setTime(0.34);                              /* plain daylight; the bed is a DAY read */
  for (const c of cells) if (c.h < c.th) c.h = c.th;   /* settle the heights (272) */

  /* find the largest bed, and report what the frame contains */
  let best = null, bestN = 0, kelp = 0;
  for (const i of HEXI) {
    const c = cells[i]; if (c.t !== T.KELP) continue;
    kelp++;
    const x = i % G, y = (i / G) | 0, n = bedSize(x, y);
    if (n > bestN) { bestN = n; best = [x, y]; }
  }
  const depths = [];
  for (const i of HEXI) if (cells[i].t === T.KELP) depths.push(rDeep[i]);
  const md = depths.length ? (depths.reduce((a, v) => a + v, 0) / depths.length) : 0;
  return { best, bestN, kelp, meanDepth: +md.toFixed(2) };
}, SEED);

const target = AIM || info.best;

/* 1. the WHOLE plate, un-zoomed -- the coast-darkening frame */
await p.evaluate(() => {
  zoom = 1; scale = fitScale; offX = fitX; offY = fitY;
  render(); lastSky = 0; syncSky(performance.now()); syncStats();
});
await p.waitForTimeout(120);
await p.screenshot({ path: join(OUT, `s${SEED}-${TOKEN}-city.png`) });

/* 2. the close-up, aimed at the largest bed. Drive `zoom`, never `scale` (269). */
await p.evaluate(([tx, ty]) => {
  const [wx, wy] = ctr(tx, ty);
  zoom = 4.2; scale = fitScale * zoom;
  offX = innerWidth / 2 - wx * scale;
  offY = innerHeight / 2 - wy * scale;
  clampPan();
  render(); lastSky = 0; syncSky(performance.now()); syncStats();
}, target);
await p.waitForTimeout(120);
await p.screenshot({ path: join(OUT, `s${SEED}-${TOKEN}-bed.png`) });

console.log(`seed ${SEED} [${TOKEN}] ${SRC.split('/').pop()}`);
console.log(`  kelp ${info.kelp} hexes · largest bed ${info.bestN} hexes at ${info.best} · mean depth ${info.meanDepth}`);
console.log(`  aimed at ${target}   -> ${OUT}/s${SEED}-${TOKEN}-{city,bed}.png`);

await b.close();
