/* shot-pitchgame.mjs (iter 307) — the neighbourhood pitch, game ON vs empty ground.
 * Freezes in-page (playing=false), pins dayT to an afternoon where a chosen FIELD has a
 * pickup game (ON) and to one where it does not (EMPTY), aims by ctr() at the field,
 * and shoots page.screenshot() (DOM composited, 200). Also an un-zoomed whole-city frame.
 * Usage: node shot-pitchgame.mjs <seed> <outdir>
 */
import { homedir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { existsSync, mkdirSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = process.env.SRC || (existsSync(join(HERE, 'solvista.html'))
  ? join(HERE, 'solvista.html') : join(HERE, '../../../../solvista.html'));
const SEED = parseInt(process.argv[2] || '42', 10);
const OUT = process.argv[3] || join(HERE, 'shots/pitch');
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
await page.addInitScript(() => { let s = 0x3F17A9 >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await page.goto(pathToFileURL(ART).href);
await page.waitForFunction(() => typeof genWorld === 'function');

// build once and pick a field that has, and lacks, a game on some afternoon
const info = await page.evaluate((seed) => {
  playing = false; genWorld(seed); __warp(2035 - year);
  const fields = [];
  for (let i = 0; i < cells.length; i++) if (cells[i].t === T.FIELD) fields.push([i % G, (i / G) | 0]);
  // score each field by how OPEN its frontage is (206/231: a ground tile buried behind
  // tall rows in front is invisible) — sum drawn height in the two rows ahead.
  const cellAtL = (x, y) => (x < 0 || y < 0 || x >= G || y >= G) ? null : cells[y * G + x];
  function frontLoad(x, y) {
    let s = 0;
    for (let dy = 1; dy <= 2; dy++) for (let dx = -1; dx <= 1; dx++) {
      const n = cellAtL(x + dx, y + dy); if (n) s += (n.h || 0);
    }
    return s;
  }
  // candidates that have both a game-day and an empty-day; prefer the most open
  const cand = [];
  for (const [x, y] of fields) {
    let onDay = -1, offDay = -1;
    for (let d = 0; d < 40; d++) {
      __setTime(d + 0.63);
      const g = pitchGame(x, y);
      if (g > 0.9 && onDay < 0) onDay = d;
      if (g === 0 && offDay < 0) offDay = d;
    }
    if (onDay >= 0 && offDay >= 0) cand.push({ x, y, onDay, offDay, load: frontLoad(x, y) });
  }
  cand.sort((a, b) => a.load - b.load);
  const pick = cand[0] || { x: fields[0][0], y: fields[0][1], onDay: 0, offDay: 1, load: -1 };
  const [wx, wy] = ctr(pick.x, pick.y);
  return { x: pick.x, y: pick.y, wx, wy, onDay: pick.onDay, offDay: pick.offDay, load: pick.load, nFields: fields.length };
}, SEED);
console.log(`seed ${SEED}: ${info.nFields} fields; pitch @${info.x},${info.y}  game-day ${info.onDay}  empty-day ${info.offDay}`);

async function shoot(name, dayT, aim) {
  const box = await page.evaluate(({ dayT, aim, wx, wy }) => {
    playing = false; __setTime(dayT);
    if (aim) { const Z = 6.5; zoom = Z; scale = fitScale * Z;
      offX = innerWidth / 2 - wx * scale; offY = innerHeight / 2 - wy * scale; clampPan(); }
    else { zoom = 1; scale = fitScale; offX = fitX; offY = fitY; }
    render(); lastSky = 0; syncSky(performance.now()); syncStats();
    // the pitch's actual screen position AFTER clampPan — clip tightly on it (285)
    return { sx: wx * scale + offX, sy: wy * scale + offY };
  }, { dayT, aim, wx: info.wx, wy: info.wy });
  if (aim) {
    const W = 360, H = 280;
    const x = Math.max(0, Math.min(1400 - W, box.sx - W / 2));
    const y = Math.max(0, Math.min(900 - H, box.sy - H / 2));
    await page.screenshot({ path: join(OUT, name), clip: { x, y, width: W, height: H } });
  } else {
    await page.screenshot({ path: join(OUT, name) });
  }
  console.log('  wrote', name, aim ? `(clip @${box.sx | 0},${box.sy | 0})` : '');
}
await shoot(`s${SEED}-game.png`, info.onDay + 0.63, true);
await shoot(`s${SEED}-empty.png`, info.offDay + 0.63, true);
await shoot(`s${SEED}-city.png`, info.onDay + 0.63, false);
await browser.close();
