#!/usr/bin/env node
/* shot-cafehours.mjs — the come-in-from-the-rain camera (iter 336).
 *
 * The shopfront/kerb crowd — café terrace diners, the busker, its evening strip audience —
 * now comes IN when a shower crosses (dryAt = rainingAt<RAINDRY). Shoot the SAME frozen dusk
 * city twice: DRY (rainingAt->0, == HEAD, strips busy) and WET (rainingAt->1, strips emptied),
 * as a blind A/B zoomed on the downtown strips (the broadest, most visible member — 226/266).
 * An agent that can pick which frame has the busier terraces/strips has confirmed it reads.
 * Tokens meaningless + non-ordinal, map CROSSED between seeds (238/239/268). page.screenshot
 * (the crowd is canvas but the HUD is DOM, 200). Drive zoom, never scale (269).
 *
 * WET stubs the rain PREDICATE rather than placing a cloud (253) so the whole city empties and
 * the effect is maximal for the read; the point under test is "the crowd came in", not "here is
 * a raincloud". A dry whole-city frame gives the holistic read (the natural HEAD scene).
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';

const HERE = dirname(fileURLToPath(import.meta.url));
const { chromium } = await import(
  join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.mjs')
);

const SRC = process.env.SRC || join(HERE, '../../../../solvista.html');
const SEED = +(process.argv[2] || 42);
const OUT = process.argv[3] || join(HERE, '../shots/cafe');
mkdirSync(OUT, { recursive: true });
const PAGE = pathToFileURL(SRC).href;

/* CROSS the map between seeds (238): which token is the DRY (busy) frame */
const DRY_TOKEN = SEED === 42 ? 'orla' : 'pike';
const WET_TOKEN = SEED === 42 ? 'pike' : 'orla';

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2 });
await p.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await p.goto(`${PAGE}?seed=${SEED}`);
await p.waitForTimeout(300);

/* freeze a mature dusk city; downtown coords for the aim */
const info = await p.evaluate((seed) => {
  playing = false;
  genWorld(seed);
  __warp(61);                                       /* -> ~2035 */
  __setYear(2035.62);                               /* dry peak: café terraces full */
  waveT = 3.0; STARS.length = 0; flock = null;
  for (const c of cells) if (c.h < c.th) c.h = c.th;
  const [wx, wy] = ctr(CBDX, CBDY);
  return { wx, wy };
}, SEED);

async function shoot(file, rain, z, label) {
  const cap = await p.evaluate(({ rain, z, wx, wy }) => {
    __setTime(0.82);                                /* dusk: LITAMT>0.35 (neon lit), strip crowd out */
    window.rainingAt = () => rain;                  /* 0 = dry (==HEAD) · 1 = raining everywhere */
    const cvs = document.querySelector('canvas');
    if (z === 1) { scale = fitScale; offX = fitX; offY = fitY; zoom = 1; }
    else { zoom = z; scale = fitScale * z; offX = cvs.clientWidth / 2 - wx * scale; offY = cvs.clientHeight / 2 - wy * scale; if (typeof clampPan === 'function') clampPan(); }
    render(); lastSky = 0; syncSky(performance.now()); syncStats(); render();
    return `dusk dayT=0.82 LITAMT=${LITAMT.toFixed(2)} · rain=${rain} · zoom=${zoom}x`;
  }, { rain, z, wx: info.wx, wy: info.wy });
  await p.screenshot({ path: file });
  console.log(`  ${file}\n      [${label}] ${cap}`);
}

/* whole-city dry (the natural HEAD dusk scene) for the holistic read */
await shoot(join(OUT, `s${SEED}-city-dry.png`), 0, 1, 'whole-city DRY (=HEAD)');
/* blind A/B zoomed on downtown strips */
await shoot(join(OUT, `s${SEED}-cbd-${DRY_TOKEN}.png`), 0, 4, `CBD ${DRY_TOKEN} (DRY, busy)`);
await shoot(join(OUT, `s${SEED}-cbd-${WET_TOKEN}.png`), 1, 4, `CBD ${WET_TOKEN} (WET, emptied)`);

await b.close();
console.log(`\nblind pair: s${SEED}-cbd-${DRY_TOKEN}.png vs s${SEED}-cbd-${WET_TOKEN}.png (DRY=${DRY_TOKEN}, crossed per seed)`);
