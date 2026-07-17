#!/usr/bin/env node
/* probe-shoreglow.mjs (iter 329) — before designing "the reflection answers the shore
 * it fronts", measure the SPACE (218/246): does developed frontage behind the coast
 * actually VARY along the shore, or is the beach so wide the city is out of reach and
 * the signal is ~0 everywhere (in which case the feature just DELETES the smear)?
 * Pure world data: no render, no clock, no noise floor. */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(join(HERE, '../../../../solvista.html')).href;
const SEEDS = [7, 42, 1234, 99, 5, 321];
const REACH = 10;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
for (const seed of SEEDS) {
  await p.goto(`${PAGE}?seed=${seed}&warp=61&t=0.30`);
  await p.waitForTimeout(300);
  const r = await p.evaluate((REACH) => {
    playing = false;
    const gs = [];
    for (let y = 0; y < G; y++) {
      const sx = shoreAt(y);
      if (sx >= rowCap(y)) continue;       // this row has no open water
      let g = 0;
      for (let k = 1; k <= REACH; k++) {
        const c = cellAt(sx - k, y);
        if (c && DEV.has(c.t)) { const h = c.th || 8; g += (0.35 + 0.65 * Math.min(1, h / 120)) * (1 - (k - 1) / REACH); }
      }
      gs.push(g);
    }
    gs.sort((a, b) => a - b);
    const q = f => +gs[Math.min(gs.length - 1, Math.floor(gs.length * f))].toFixed(2);
    return {
      shoreRows: gs.length,
      lit: gs.filter(g => g > 0.1).length,     // rows with a real source behind
      dark: gs.filter(g => g <= 0.1).length,   // rows the smear will vanish from
      gMed: q(0.5), gP75: q(0.75), gP90: q(0.9), gMax: +gs[gs.length - 1].toFixed(2),
    };
  }, REACH);
  console.log('seed', String(seed).padStart(4), '·',
    'shoreRows', r.shoreRows, '| lit', r.lit, 'dark', r.dark,
    '| g med', r.gMed, 'p75', r.gP75, 'p90', r.gP90, 'max', r.gMax);
}
await b.close();
