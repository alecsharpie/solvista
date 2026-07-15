/* iter 301 visual gate: a DISCRIMINATING PAIR (258) aimed at the deer — an EVENING crop
   (deer grazing the meadow edge) and a DEEP-NIGHT crop (the herd bedded in the trees) at the
   SAME camera, so an agent must discriminate presence vs absence. Aims by the deer's own
   world centre (ctr), zooms about viewport centre then pans explicitly (272c: zoomAt+clampPan
   can strand the target). page.screenshot (DOM composited, 200). Also one whole-city frame for
   the holistic read. Each frame self-reports na + deer-drawn count (202). */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright/index.mjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync } from 'fs';
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = process.env.SRC || join(HERE, '../../../../solvista.html');
const OUT = process.env.OUT || join(HERE, '../shots/deerhour');
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
for (const seed of [42, 7]) {
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.addInitScript(() => { let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
  await page.goto('file://' + SRC);
  await page.waitForFunction(() => typeof genWorld === 'function');
  await page.evaluate((seed) => { playing = false; genWorld(seed); __warp(61); __setYear(2035.62); }, seed);
  const drawn = async (want, cam) => await page.evaluate(({ want, cam }) => {
    let best = null;
    if (want < 0) best = { dt: 0.35, na: 0 };          /* a plain daylight frame */
    else for (let t = 0.55; t < 1.16; t += 0.005) {
      const dt = t % 1; __setTime(dt); render();
      const na = nightAmt();
      if (!best || Math.abs(na - want) < Math.abs(best.na - want)) best = { dt, na };
    }
    __setTime(best.dt);
    if (cam) { zoom = cam.z; scale = fitScale * zoom;
      offX = innerWidth / 2 - cam.wx * scale; offY = innerHeight / 2 - cam.wy * scale; clampPan(); }
    else { zoom = 1; offX = fitX; offY = fitY; scale = fitScale; }
    lastSky = 0; syncSky(performance.now()); syncStats(); render();
    const hasDeer = typeof deerSession === 'function';
    let out = 0; const s = hasDeer ? deerSession() : 1;
    for (const d of deer) if (!hasDeer || s >= d.ph / 7) out++;
    return { dt: +best.dt.toFixed(3), na: +best.na.toFixed(3), lit: +LITAMT.toFixed(3), deerDrawn: out };
  }, { want, cam });
  /* aim: the deer with the most neighbours within 5 hexes (a cluster reads best) */
  const cam = await page.evaluate(() => {
    if (!deer.length) return null;
    let bi = 0, bn = -1;
    for (let i = 0; i < deer.length; i++) {
      let n = 0; for (const e of deer) if (Math.abs(e.x - deer[i].x) + Math.abs(e.y - deer[i].y) < 5) n++;
      if (n > bn) { bn = n; bi = i; }
    }
    const [wx, wy] = ctr(deer[bi].x, deer[bi].y);
    return { wx, wy, z: 4.8 };
  });
  for (const [name, want] of [['day', -1], ['deepnight', 0.85]]) {
    const info = await drawn(want, cam);
    const tag = `s${seed}-${name}`;
    await page.screenshot({ path: join(OUT, tag + '.png') });
    console.log(`${tag}: dayT=${info.dt} na=${info.na} LITAMT=${info.lit} deer-drawn=${info.deerDrawn}`);
  }
  const city = await drawn(-1, null);
  await page.screenshot({ path: join(OUT, `s${seed}-city.png`) });
  console.log(`s${seed}-city: dayT=${city.dt} na=${city.na} deer-drawn=${city.deerDrawn}`);
  await page.close();
}
await browser.close();
