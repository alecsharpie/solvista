/* shot-anglers — moderate zoom onto the pier to judge the anglers (iter 170).
 * Centers the camera on the pier deck, freezes with a fixed waveT and every mover
 * cleared, and shoots a DAY frame (anglers present, LITAMT<0.62) and a NIGHT control
 * (they pack up — gate off). Judge a subtle deck ornament at the ~4-5x a user
 * actually looks at the coast (biolum/gulls law, iters 159/169), not fit.
 *   node shot-anglers.mjs [seed] [warp] [scale]
 */
import { homedir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = resolve(HERE, '../../../../solvista.html');
const OUT = resolve(HERE, '../shots');
const SEED = process.argv[2] || '42';
const WARP = process.argv[3] || '61';
const SCALE = Number(process.argv[4] || '5.2');
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });

async function frame(tag, t) {
  await p.goto(pathToFileURL(ART).href + `?seed=${SEED}&warp=${WARP}&t=${t}&year=2035.62`, { waitUntil: 'load' });
  await p.waitForFunction('window.__find');
  await p.evaluate((SCALE) => {
    playing = false; waveT = 3.0;
    for (const a of [vehicles, bikes, trams, trucks, peds, boats, ferries, freighters,
      birds, shuttles, dogs, kites, surfers, dolphins, whales, herons, kayaks, joggers,
      deer, clouds, balloons, copters]) a.length = 0;
    const world = ctr((pier.x0 + pier.x1) / 2, pier.y);
    scale = SCALE; offX = 720 - world[0] * scale; offY = 450 - world[1] * scale;
    render();
  }, SCALE);
  await p.screenshot({ path: join(OUT, `anglers-${SEED}-${tag}-${SCALE}.png`), clip: { x: 420, y: 210, width: 600, height: 500 } });
  console.log('shot written: anglers-' + SEED + '-' + tag + '-' + SCALE + '.png');
}

await frame('day', '0.3');
await frame('night', '0.92');
await b.close();
