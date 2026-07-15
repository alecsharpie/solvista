/* iter 300 visual gate: a DISCRIMINATING PAIR (258) — an EVENING frame (na low, strip
   crowd full) and a SMALL-HOURS frame (na high, strip crowd thinned) at the same seed,
   whole-city, frozen in-page. page.screenshot (DOM composited). Each frame self-reports
   its own na + crowd count so a mis-pinned frame is caught by the tool (202). */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright/index.mjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = process.env.SRC || join(HERE, '../../../../solvista.html');
const OUT = process.env.OUT || join(HERE, '../shots/stripcrowd');
import { mkdirSync } from 'fs';
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
for (const seed of [42, 7]) {
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.addInitScript(() => { let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
  await page.goto('file://' + SRC);
  await page.waitForFunction(() => typeof genWorld === 'function');
  await page.evaluate((seed) => { playing = false; genWorld(seed); __warp(61); __setYear(2035.62); }, seed);
  for (const [name, want] of [['evening', 0.12], ['smallhours', 0.90]]) {
    const info = await page.evaluate(({ want }) => {
      /* search the lit night for the dayT whose nightAmt is closest to `want` */
      let best = null;
      for (let t = 0.60; t < 1.16; t += 0.005) {
        const dt = t % 1; __setTime(dt); render();
        if (!(LITAMT > 0.35)) continue;
        const na = nightAmt();
        if (!best || Math.abs(na - want) < Math.abs(best.na - want)) best = { dt, na };
      }
      __setTime(best.dt); lastSky = 0; syncSky(performance.now()); syncStats(); render();
      const hasStrip = typeof stripOut === 'function';
      let crowd = 0;
      for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
        const c = cells[idx(x, y)];
        if (c && c.t === T.COM && c.v > 0.6 && LITAMT > 0.35 &&
            (!hasStrip || nightAmt() < stripOut(x, y))) crowd++;
      }
      return { dt: +best.dt.toFixed(3), na: +best.na.toFixed(3), lit: +LITAMT.toFixed(3), crowd };
    }, { want });
    const tag = `s${seed}-${name}`;
    await page.screenshot({ path: join(OUT, tag + '.png') });
    console.log(`${tag}: dayT=${info.dt} na=${info.na} LITAMT=${info.lit} strip-crowd=${info.crowd}`);
  }
  await page.close();
}
await browser.close();
