/* shot-biolum — tight night zoom onto the beach-facing surf line, to judge the new
 * bioluminescent glow (iter 159). Centers the camera on a front-of-frame stretch of
 * beach whose seaward edge has open water, freezes with a fixed waveT, clips night.
 * Also a day clip (control: gate off, no glow) at the same spot. */
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
const SCALE = process.argv[4] || '7.0';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
for (const [tag, t] of [['night', '0.90'], ['day', '0.35']]) {
  await p.goto(pathToFileURL(ART).href + `?seed=${SEED}&warp=${WARP}&t=${t}`, { waitUntil: 'load' });
  await p.waitForFunction('window.__find');
  await p.evaluate((SCALE) => {
    playing = false; waveT = 3.0;
    for (const a of [vehicles, bikes, trams, trucks, peds, boats, ferries, freighters,
      birds, shuttles, dogs, kites, surfers, dolphins, whales, herons, kayaks, joggers,
      deer, clouds, balloons, copters]) a.length = 0;
    // beach cells that touch open water, front-of-frame (lower sy), most water neighbours
    const beaches = window.__find('BEACH').map(s => {
      let n = 0; for (const [dx, dy] of nbrDirs(s.y)) { const e = cellAt(s.x + dx, s.y + dy); if (e && e.t === T.WATER && !e.riv) n++; }
      return { ...s, sea: n };
    }).filter(s => s.sea > 0);
    beaches.sort((a, b) => (b.sea - a.sea) || (b.sy - a.sy));
    const r = beaches[0] || window.__find('BEACH')[0];
    const world = ctr(r.x, r.y);
    scale = Number(SCALE); offX = 720 - world[0] * scale; offY = 450 - world[1] * scale;
    render();
  }, SCALE);
  await p.screenshot({ path: join(OUT, `biolum-${SEED}-${tag}.png`), clip: { x: 440, y: 220, width: 560, height: 480 } });
}
await b.close();
console.log('shots written');
