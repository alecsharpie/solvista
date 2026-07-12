#!/usr/bin/env node
/* Aim the camera at an actual community garden and shoot it (iter 201's law: a
 * fixed clip is not a framing -- GARDEN is a handful of hexes, sited procedurally,
 * so a hard-coded rect is a coin flip). Locates a GARDEN via __find, then sets the
 * artifact's own scale/offX/offY to centre it, and also takes an un-zoomed frame.
 *
 *   node shot-garden.mjs <seed> <outdir>
 */
import { existsSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = ['.', '../../../..'].map(u => resolve(HERE, u, 'solvista.html')).find(existsSync);
const PAGE = pathToFileURL(ROOT).href;

const seed = Number(process.argv[2] || 42);
const OUT = resolve(process.argv[3] || join(HERE, 'shots/garden'));
mkdirSync(OUT, { recursive: true });

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2 });
p.on('pageerror', e => console.error('PAGEERROR', String(e)));
await p.goto(`${PAGE}?seed=${seed}&warp=61&t=0.30`);
await p.waitForTimeout(600);

/* freeze both clocks, and force the throttled DOM (iter 204) */
const info = await p.evaluate(() => {
  playing = false;
  const g = window.__find('GARDEN');
  lastSky = 0; syncSky(performance.now()); syncStats();
  render();
  return { n: g.length, list: g.map(o => ({ x: o.x, y: o.y })) };
});
console.log(`seed ${seed}: ${info.n} gardens at`, info.list.map(o => `(${o.x},${o.y})`).join(' '));
if (!info.n) { console.log('NO GARDEN ON THIS SEED'); await b.close(); process.exit(1); }

/* un-zoomed whole-city frame */
await p.screenshot({ path: join(OUT, `seed${seed}-city.png`) });

/* zoom the artifact's own camera onto the first garden, at two scales */
for (const Z of [4.0, 7.0]) {
  await p.evaluate(({ Z }) => {
    const g = window.__find('GARDEN')[0];
    const [cx, cy] = ctr(g.x, g.y);
    scale = Z;
    offX = innerWidth / 2 - cx * scale;
    offY = innerHeight / 2 - cy * scale;
    lastSky = 0; syncSky(performance.now()); syncStats();
    render();
  }, { Z });
  await p.screenshot({ path: join(OUT, `seed${seed}-garden-${Z}x.png`) });
}
console.log('wrote', OUT);
await b.close();
