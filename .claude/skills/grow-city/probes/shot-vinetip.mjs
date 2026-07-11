#!/usr/bin/env node
/* shot-vinetip — screenshot the vineyard hover tooltip with its new Vines row, at
   two seasons (dry-peak "Green fruit" vs autumn "Ripe for harvest"). Fires a REAL
   mouse move (page.mouse.move) so the artifact's own mousemove handler builds the
   tooltip, then clips a box around the cursor.  node shot-vinetip.mjs */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(join(HERE, '../../../../solvista.html')).href;
const OUT = join(HERE, '../shots/vinetip');

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 });
await p.goto(`${PAGE}?seed=42&warp=61&t=0.35`);
await p.waitForFunction('window.__find');

for (const [name, yfrac] of [['drypeak', 0.62], ['autumn', 0.87]]) {
  const s = await p.evaluate(y => {
    playing = false; window.__setYear(2035 + y); render();
    const on = v => v.sx > 120 && v.sx < innerWidth - 120 && v.sy > 120 && v.sy < innerHeight - 200;
    const v = window.__find('VINEYARD').filter(on)[0];
    return v ? { sx: v.sx, sy: v.sy } : null;
  }, yfrac);
  if (!s) { console.log(name, 'no on-screen vineyard'); continue; }
  await p.mouse.move(s.sx, s.sy);
  await p.waitForTimeout(120);
  await p.screenshot({
    path: `${OUT}-${name}.png`,
    clip: { x: Math.max(0, s.sx - 40), y: Math.max(0, s.sy - 40), width: 320, height: 260 },
  });
  console.log(name, `vineyard @ (${s.sx.toFixed(0)},${s.sy.toFixed(0)}) ->`, `${OUT}-${name}.png`);
}
await b.close();
