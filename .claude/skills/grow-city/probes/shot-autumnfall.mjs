/* shot-autumnfall — zoomed view of the autumn leaf litter on the forest floor
 * (iter 166). Sibling of shot-woodbloom: finds an on-screen forest patch, camera-
 * zooms onto it, and clips autumn (litter) vs summer (control, none). Clock frozen;
 * continuous factor so year drift is harmless, but freeze anyway for a crisp still. */
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
for (const [tag, year] of [['autumn', '2035.87'], ['summer', '2035.62']]) {
  await p.goto(pathToFileURL(ART).href + `?seed=42&warp=61&t=0.30&year=${year}`, { waitUntil: 'load' });
  await p.waitForFunction('window.__find');
  await p.evaluate((year) => {
    playing = false; time = 5.0;
    for (const a of [vehicles, bikes, trams, trucks, peds, boats, ferries, freighters,
      birds, shuttles, dogs, kites, surfers, dolphins, whales, herons, kayaks, joggers,
      deer, clouds, balloons, copters]) a.length = 0;
    // centre on the densest cluster of on-screen forest hexes
    const woods = window.__find('FOREST').filter(s => s.sx > 60 && s.sy > 60);
    let best = woods[0], bn = -1;
    for (const w of woods) { const n = woods.filter(o => Math.abs(o.x - w.x) + Math.abs(o.y - w.y) <= 2).length;
      if (n > bn) { bn = n; best = w; } }
    const world = ctr(best.x, best.y);
    scale = 8.0; offX = 720 - world[0] * scale; offY = 450 - world[1] * scale;
    window.__setYear(parseFloat(year));
    render();
  }, year);
  await p.screenshot({ path: join(OUT, `autumnfall-${tag}.png`), clip: { x: 470, y: 230, width: 520, height: 460 } });
}
await b.close();
console.log('shots written');
