/* shot-snow — the visual gate for iter 321 (winter snow, Sky's first CA rule).
 *
 * Freezes the world IN-PAGE (playing=false, genWorld + __warp + __setYear), then runs a
 * few tick()s AT the pinned year so the snow field settles to that season's target -- a
 * ?year= pin drifts ~0.167 yr/s while shoot.mjs waits (139/202), and __setYear alone does
 * not tick, so the field would still hold its post-warp (snowless) value. Shoots with
 * page.screenshot() (DOM composited, 200); forces the HUD (204).
 *
 * WINTER (s=0.12, deep Jan) shows the dusting; SUMMER (s=0.62, dry peak) is the control --
 * it must be snowless, i.e. ~identical to HEAD. Frames named by FILE (239).
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = join(HERE, '../../../../solvista.html');
const OUT = process.argv[3] || join(HERE, 'shots/snow');
import { mkdirSync } from 'node:fs';
mkdirSync(OUT, { recursive: true });

const SEEDS = (process.argv[2] || '42,7').split(',').map(Number);
const FRAMES = [
  { name: 'winter-day',   year: 2035.12, t: 0.35 },
  { name: 'summer-day',   year: 2035.62, t: 0.35 },   // control: must be snowless
  { name: 'winter-dusk',  year: 2035.12, t: 0.74 },   // night snow must be dim, not glowing
];

const b = await chromium.launch();
const page = await b.newPage();
await page.setViewportSize({ width: 1400, height: 900 });

for (const seed of SEEDS) {
  for (const f of FRAMES) {
    await page.goto(pathToFileURL(ART).href);
    await page.waitForTimeout(400);
    const st = await page.evaluate(({ seed, year, t }) => {
      playing = false;
      genWorld(seed);
      __warp(61);
      __setYear(year);
      for (let k = 0; k < 14; k++) tick();   // settle the snow field to this season's target
      __setTime(t);
      lastSky = 0; syncSky(performance.now()); syncStats();
      render();
      let cover = 0, tot = 0;
      const SL = (typeof SNOWLAND !== 'undefined') ? SNOWLAND : new Set();
      for (const i of HEXI) { const c = cells[i]; if (SL.has(c.t)) { tot++; if ((c.snow || 0) > 0.05) cover++; } }
      return { dayT, LITAMT: +LITAMT.toFixed(2), phase: phaseWord(dayT),
               snowCover: tot ? +(100 * cover / tot).toFixed(0) : 0 };
    }, { seed, year: f.year, t: f.t });
    const png = join(OUT, `s${seed}-${f.name}.png`);
    await page.screenshot({ path: png });
    console.log(`s${seed} ${f.name.padEnd(12)} t=${st.dayT.toFixed(2)} LITAMT=${st.LITAMT} ${st.phase.padEnd(9)} snowCover=${String(st.snowCover).padStart(3)}% -> ${png}`);
  }
}
await b.close();
