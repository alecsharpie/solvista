/* shot-tramwire — zoomed view of the streetcar's new overhead contact wire (iter 155).
 * Places a few trams on central road cells (live trams drift; placement is deterministic),
 * freezes, camera-zooms onto one, and clips day + night. */
import { homedir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = resolve(HERE, '../../../../solvista.html');
const OUT = resolve(HERE, '../shots');
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
for (const [tag, t] of [['day', '0.30'], ['night', '0.90']]) {
  await p.goto(pathToFileURL(ART).href + `?seed=7&warp=61&t=${t}&year=2035.62`, { waitUntil: 'load' });
  await p.waitForFunction('window.__find');
  await p.evaluate(() => {
    playing = false; time = 5.0; waveT = 3.0;
    for (const a of [vehicles, bikes, trams, trucks, peds, boats, ferries, freighters,
      birds, shuttles, dogs, kites, surfers, dolphins, whales, herons, kayaks, joggers,
      deer, clouds, balloons, copters]) a.length = 0;
    // a CLEAR avenue: an east-running road whose cell in FRONT (y+1) is open ground
    // or water, so nothing tall occludes the overhead wire behind it.
    const roads = window.__find('ROAD');
    const open = new Set([T.PARK, T.PLAZA, T.BEACH, T.DUNE, T.SHOREPARK, T.GARDEN, T.FIELD, T.QUAD, T.WATER]);
    const clearAt = (x, y) => { const c = cellAt(x, y + 1); return c && open.has(c.t); };
    const cand = roads.filter(r => roads.some(o => o.x === r.x + 1 && o.y === r.y)
      && clearAt(r.x, r.y) && clearAt(r.x + 1, r.y));
    cand.sort((a, b) => b.sy - a.sy);           // prefer front-of-frame (lower on screen)
    const r = cand[0] || roads[0];
    for (let k = -2; k <= 2; k++) { const o = roads.find(q => q.x === r.x + k && q.y === r.y);
      if (o) trams.push({ x: o.x, y: o.y, nx: o.x + 1, ny: o.y, p: 0.5, sp: 0.6, kind: 'tram', c: 'brick' }); }
    const world = ctr(r.x, r.y);
    scale = 5.5; offX = 720 - world[0] * scale; offY = 470 - world[1] * scale;
    render();
    window.__cx = 720; window.__cy = 470;
  });
  await p.screenshot({ path: join(OUT, `tramwire-${tag}.png`), clip: { x: 470, y: 250, width: 500, height: 440 } });
}
await b.close();
console.log('shots written');
