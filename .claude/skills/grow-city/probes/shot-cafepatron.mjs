/* shot-cafepatron — moderate zoom onto a park café/kiosk to judge the seated
 * patrons (iter 186). Finds a café-edge PARK cell (adjacent to shops), centers the
 * camera on it, freezes every mover, and shoots a DAY frame (patrons present,
 * LITAMT<0.5) and a NIGHT control (the terrace empties — gate off). Judge a subtle
 * park ornament at the ~6x a user actually zooms to, not fit.
 *   node shot-cafepatron.mjs [seed] [warp] [scale]
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
const SCALE = Number(process.argv[4] || '7.0');
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });

async function frame(tag, t) {
  await p.goto(pathToFileURL(ART).href + `?seed=${SEED}&warp=${WARP}&t=${t}`, { waitUntil: 'load' });
  await p.waitForFunction('window.__find');
  await p.evaluate((SCALE) => {
    playing = false;
    for (const a of [vehicles, bikes, trams, trucks, peds, boats, ferries, freighters,
      birds, shuttles, dogs, kites, surfers, dolphins, whales, herons, kayaks, joggers,
      deer, clouds, balloons, copters]) a.length = 0;
    /* first café-edge PARK cell near the screen centre */
    const isCafe = (x, y) => countAround(x, y, 1, n => n.t === T.COM || n.t === T.MARKET || n.t === T.CIVIC) > 0;
    /* require the tile to have >=1 OCCUPIED patron seat (same gate the draw uses)
       so the framing lands on a populated table, not a gate-emptied one */
    const occupied = (x, y) => { let n = 0; for (let si = 0; si < 2; si++) for (let pi = 0; pi < 2; pi++) if (hashCell(x, y, seedNum ^ (0x5AF0 + si * 3 + pi)) <= 0.5) n++; return n; };
    /* prefer the FRONT-MOST café (max y): rows draw top->bottom, so nothing in a
       later row can occlude it; among those, nearest the horizontal centre */
    let best = null, bestScore = -1e9;
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)];
      if (c && c.t === T.PARK && isCafe(x, y) && occupied(x, y) >= 2 && c.v >= 0.44) { /* v>=0.44 skips the pond/fountain that would overdraw the tables */
        const score = y * 4 - Math.abs(x - G / 2); /* front-most, then centred */
        if (score > bestScore) { bestScore = score; best = [x, y]; }
      }
    }
    const world = ctr(best[0], best[1]);
    scale = SCALE; offX = 720 - world[0] * scale; offY = 450 - world[1] * scale;
    render();
  }, SCALE);
  await p.screenshot({ path: join(OUT, `cafepatron-${SEED}-${tag}-${SCALE}.png`), clip: { x: 470, y: 260, width: 500, height: 400 } });
  console.log('shot written: cafepatron-' + SEED + '-' + tag + '-' + SCALE + '.png');
}

await frame('day', '0.3');
await frame('night', '0.92');
await b.close();
