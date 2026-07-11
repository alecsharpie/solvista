/* shot-gulls — moderate day zoom onto a beach-facing stretch that actually holds a
 * gull group, to judge the tideline shorebirds (iter 169). Centers the camera on a
 * front-of-frame beach hex that (a) touches open water and (b) passes the gull
 * placement gate (hashCell(x*5+3,y*7+1,seedNum^0x6011) < 0.32), freezes with a fixed
 * waveT and every mover cleared, day frame (gulls present). SCALE arg = zoom; judge
 * a subtle coast ornament at the ~4x a user actually looks at the coast (biolum law,
 * iter 159), not fit (invisible) nor 7x (corner hexes stack). */
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
const SCALE = process.argv[4] || '4.6';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(pathToFileURL(ART).href + `?seed=${SEED}&warp=${WARP}&t=0.3&year=2035.62`, { waitUntil: 'load' });
await p.waitForFunction('window.__find');
await p.evaluate((SCALE) => {
  playing = false; waveT = 3.0;
  for (const a of [vehicles, bikes, trams, trucks, peds, boats, ferries, freighters,
    birds, shuttles, dogs, kites, surfers, dolphins, whales, herons, kayaks, joggers,
    deer, clouds, balloons, copters]) a.length = 0;
  // beach cells that touch open water AND pass the gull gate, front-of-frame (higher sy)
  const beaches = window.__find('BEACH').map(s => {
    let n = 0; for (const [dx, dy] of nbrDirs(s.y)) { const e = cellAt(s.x + dx, s.y + dy); if (e && e.t === T.WATER && !e.riv) n++; }
    const gull = hashCell(s.x * 5 + 3, s.y * 7 + 1, seedNum ^ 0x6011) < 0.32;
    return { ...s, sea: n, gull };
  }).filter(s => s.sea > 0 && s.gull);
  beaches.sort((a, b) => (b.sy - a.sy) || (b.sea - a.sea));
  const r = beaches[0] || window.__find('BEACH')[0];
  const world = ctr(r.x, r.y);
  scale = Number(SCALE); offX = 720 - world[0] * scale; offY = 450 - world[1] * scale;
  render();
}, SCALE);
await p.screenshot({ path: join(OUT, `gulls-${SEED}-day-${SCALE}.png`), clip: { x: 440, y: 220, width: 560, height: 480 } });
await b.close();
console.log('shot written: gulls-' + SEED + '-day-' + SCALE + '.png');
