/* shot-capitolflag — the capitol standards, calm vs gale  (iter 338)
 * A blind A/B of the ONE parliament per city, shot at __setWind(0.25) (dead calm) and
 * __setWind(1.0) (full gale) on the SAME frozen world — so the only thing that can differ
 * is the two gold standards, which now stream downwind with the shared gust. page.screenshot
 * (DOM-composited, 200). Tokens meaningless + non-ordinal, the calm/gale map CROSSED between
 * seeds (238/239/268). Plus one whole-city gale frame per seed (the un-zoomed read). */
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join, resolve } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { homedir } from 'os';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const LOCAL = join(HERE, 'solvista.html');
const ART  = process.env.SRC ? resolve(process.env.SRC) : existsSync(LOCAL) ? LOCAL : join(HERE,'../../../../solvista.html');
const OUT  = process.argv[2] || join(HERE, '../shots/capitolflag');
mkdirSync(OUT, { recursive: true });

/* seed -> {calm token, gale token}, CROSSED so "the busy one" is not the same token twice */
const MAP = { 42: { calm:'myrtle', gale:'cobalt' }, 7: { calm:'cobalt', gale:'myrtle' } };

const setup = (page, seed) => page.evaluate(({ seed }) => {
  playing = false;
  genWorld(seed); window.__warp(61);
  for(const c of cells) if(c.h < c.th) c.h = c.th;
  STARS.length = 0; flock = null;
  time = 1000; waveT = 500;
  window.__setTime(0.35);
  render();
  const par = window.__find('parliament');
  return par.length ? ctr(par[0].x, par[0].y) : null;   /* world centre */
}, { seed });

const frameZoom = (page, wc, wind) => page.evaluate(({ wc, wind }) => {
  zoom = 7; scale = fitScale*zoom;
  offX = innerWidth/2 - wc[0]*scale; offY = innerHeight/2 - wc[1]*scale; clampPan();
  window.__setWind(wind);
  lastSky = 0; syncSky(performance.now()); syncStats();
  render();
}, { wc, wind });

const frameCity = (page, wind) => page.evaluate(({ wind }) => {
  zoom = 1; scale = fitScale; offX = fitX; offY = fitY;
  window.__setWind(wind);
  lastSky = 0; syncSky(performance.now()); syncStats();
  render();
}, { wind });

const run = async () => {
  const b = await chromium.launch();
  for(const seed of [42, 7]){
    const page = await b.newPage();
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(pathToFileURL(ART).href);
    await page.waitForTimeout(300);
    const wc = await setup(page, seed);
    if(!wc){ console.log(`seed ${seed}: no parliament`); await page.close(); continue; }
    const m = MAP[seed];
    await frameZoom(page, wc, 0.25); await page.screenshot({ path: join(OUT, `s${seed}-${m.calm}.png`) });
    await frameZoom(page, wc, 1.00); await page.screenshot({ path: join(OUT, `s${seed}-${m.gale}.png`) });
    await frameCity(page, 1.00);     await page.screenshot({ path: join(OUT, `s${seed}-city.png`) });
    console.log(`seed ${seed}: wrote s${seed}-${m.calm}.png / s${seed}-${m.gale}.png / s${seed}-city.png  (par world ${wc.map(v=>v.toFixed(0))})`);
    await page.close();
  }
  await b.close();
  console.log(`\n-> ${OUT}`);
};
run();
