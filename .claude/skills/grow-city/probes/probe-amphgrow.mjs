#!/usr/bin/env node
/* probe-amphgrow.mjs — DOES THE CITY GROW UP IN FRONT OF THE BOWL? (iter 231)
 *
 * The scored scan measured 8.4% occlusion in the sweep and 27.7% when SHIPPED. The sweep
 * graded candidates against the MATURE (2035) city. The real rule fires at year>=2004 and
 * scores against the 2004 city — then 31 years of development happen in front of it.
 *
 * And the selection is perverse: groundLoad prefers a front row that is currently EMPTY,
 * which is precisely the road-and-park-adjacent lot the upgrade pass is most likely to
 * build on. The rule may be SELECTING FOR FUTURE BURIAL.
 *
 * Pure world data, no render: for each seed, record the bowl's groundLoad at PLACEMENT
 * (2004) and again at RENDER (2035), and what its front rows turned into.
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = pathToFileURL(join(HERE, '../../../../solvista.html')).href;

const SEEDS = [7, 42, 1234, 99, 2025, 5150];
const b = await chromium.launch();
const pg = await b.newPage({ viewport: { width: 1400, height: 900 } });
await pg.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await pg.goto(ART);
await pg.waitForTimeout(300);

const rows = [];
for (const seed of SEEDS) {
  const r = await pg.evaluate((sd) => {
    playing = false;
    genWorld(sd);
    /* year starts at 1974; walk to just past 2004, when the bowl is sited */
    __warp(31);
    const nm = (t) => Object.keys(T).find(k => T[k] === t) || '?';
    const find = () => {
      for (let i = 0; i < G * G; i++) {
        const c = cells[i];
        if (c && c.t === T.CIVIC && c.kind === 'amphitheater') return [i % G, (i / G) | 0];
      }
      return null;
    };
    const frontOf = (x, y) => [[0, 1], [-1, 1], [1, 1], [0, 2], [-1, 2], [1, 2]]
      .map(([dx, dy]) => { const c = cellAt(x + dx, y + dy);
        return c ? nm(c.t) + (c.th ? ':' + c.th.toFixed(0) : '') : 'void'; });

    const at2004 = find();
    if (!at2004) return { seed: sd, missing: true, year };
    const [x, y] = at2004;
    const g04 = groundLoad(x, y), f04 = frontOf(x, y), y04 = year;

    __warp(31);   /* on to ~2035, the year every frame renders */
    const g35 = groundLoad(x, y), f35 = frontOf(x, y);
    return { seed: sd, x, y, y04, y35: year, g04, g35, f04, f35 };
  }, seed);
  rows.push(r);
}
await b.close();

console.log('\n=== the bowl is sited in 2004 and judged in 2035 ===\n');
let s04 = 0, s35 = 0, n = 0;
for (const r of rows) {
  if (r.missing) { console.log(`seed ${r.seed}: no bowl at year ${r.year?.toFixed(0)}`); continue; }
  s04 += r.g04; s35 += r.g35; n++;
  console.log(`seed ${String(r.seed).padEnd(5)} (${r.x},${r.y})   groundLoad at siting (${r.y04.toFixed(0)}): ` +
    `${String(r.g04.toFixed(0)).padStart(3)}   ->  at render (${r.y35.toFixed(0)}): ${String(r.g35.toFixed(0)).padStart(3)}` +
    `   ${r.g35 > r.g04 ? '  GREW IN FRONT (+' + (r.g35 - r.g04).toFixed(0) + ')' : ''}`);
  console.log(`             front 2004: ${r.f04.join(' ')}`);
  console.log(`             front 2035: ${r.f35.join(' ')}\n`);
}
console.log(`mean groundLoad at siting ${(s04 / n).toFixed(1)}   ->   at render ${(s35 / n).toFixed(1)}`);
console.log('If it rises, the rule optimizes a property the city then destroys — and it');
console.log('picks the EMPTIEST front, which is the lot most likely to be built on.');
