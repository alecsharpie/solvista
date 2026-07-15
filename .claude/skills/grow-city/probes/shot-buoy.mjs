/* 296 — channel-buoy camera. Aims at the pier head + its seaward approach, where the
 * new navigation marks are anchored (pier.x1,pier.y is published world data; the buoys
 * spawn at pier.x1+2.5.. seaward). Freezes in-page, forces the DOM (204), page.screenshot
 * (200). Day + night (the marks flash after dark) at two seeds, plus an un-zoomed frame. */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(process.env.SRC || join(HERE, '../../../../solvista.html'));
const SEED = Number(process.argv[2] || 42);
const OUT = resolve(process.argv[3] || join(HERE, 'shots/buoy'));
mkdirSync(OUT, { recursive: true });
const VW = 1400, VH = 900;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: VW, height: VH } });
await page.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await page.goto('file://' + SRC + '?seed=' + SEED);
await page.waitForTimeout(400);
const world = await page.evaluate(({ seed }) => {
  playing = false; genWorld(seed); __warp(61);
  STARS.length = 0; flock = null; time = 100; waveT = 100;
  const c = ctr(pier.x1 + 2.5, pier.y);
  return { px1: pier.x1, py: pier.y, wx: c[0], wy: c[1], nbuoy: buoys.length };
}, { seed: SEED });
async function shoot(name, t, zoom) {
  const st = await page.evaluate(({ t, zoom, wx, wy, VW, VH }) => {
    if (zoom) { scale = zoom; offX = VW / 2 - wx * zoom; offY = VH / 2 - wy * zoom; }
    else { scale = fitScale; offX = fitX; offY = fitY; }
    __setTime(t); CCACHE = {};
    lastSky = 0; syncSky(performance.now()); syncStats(); render();
    return { t: +t.toFixed(2), lit: +LITAMT.toFixed(2), scale: +scale.toFixed(2) };
  }, { t, zoom, wx: world.wx, wy: world.wy, VW, VH });
  const f = join(OUT, `${name}.png`);
  await page.screenshot({ path: f });
  console.log(`  ${name.padEnd(16)} t=${st.t} LITAMT=${st.lit} scale=${st.scale} → ${f}`);
}
console.log(`seed ${SEED}: pier head hex (${world.px1}, ${world.py}); ${world.nbuoy} channel buoys spawned.`);
await shoot('pier-day', 0.30, 6.0);
await shoot('pier-night', 0.92, 6.0);
await shoot('city-day', 0.30, 0);
await browser.close();
