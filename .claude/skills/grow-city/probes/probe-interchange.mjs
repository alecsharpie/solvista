#!/usr/bin/env node
/* Does the bus network ever MEET the rail network?
 *
 * `recount()` builds ONE transit reach map from stations UNION bus stops:
 *     reachFill(rTransit,2,(c,i)=>stations.has(i)||(c.t===T.ROAD&&c.stop));
 * i.e. the model already asserts an integrated transit system. But the two are
 * sited by rules that have never heard of each other:
 *     stations : railStations() — a monorail stop with >=3 developed neighbours
 *     bus stops: hashCell(x,y,seedNum^0xB5B5)<0.05 on any built-up ROAD
 * a blind 5% coin on the road grid.
 *
 * Measures, per seed at 2035: how far is a rail station from the nearest bus
 * stop, and how many stations are served (a stop within 1 hex / within 2)?
 *
 *   node probe-interchange.mjs [seed ...]
 */
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
/* resolve the artifact relative to THIS file, never the cwd (a hardcoded path silently
   measures the wrong checkout) */
const PAGE = pathToFileURL([resolve(HERE, '../../../../solvista.html'),
                            resolve(HERE, 'solvista.html')].find(existsSync)).href;

const seeds = process.argv.slice(2).filter(a => !a.startsWith('-')).map(Number);
const SEEDS = seeds.length ? seeds : [7, 42, 1234, 5, 99, 3];

const b = await chromium.launch();
const rows = [];
for (const seed of SEEDS) {
  const p = await b.newPage();
  p.on('pageerror', e => console.error('PAGEERROR', seed, String(e)));
  await p.goto(`${PAGE}?seed=${seed}&warp=61&t=0.35`);
  await p.waitForTimeout(400);
  rows.push(await p.evaluate(() => {
    const stops = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)];
      if (c.t === T.ROAD && c.stop) stops.push([x, y]);
    }
    const staCells = monoStationCells().map(i => [i % G, (i / G) | 0]);
    const d = staCells.map(([sx, sy]) => {
      let best = 99;
      for (const [bx, by] of stops) best = Math.min(best, hexDist(sx, sy, bx, by));
      return best;
    });
    /* THE CEILING: a stop can only exist on a road hex that the existing rule
       deems eligible (built-up, not a bridge, not the coast highway). How many
       stations even HAVE such a hex within 1 / within 2? */
    const eligible = (x, y) => {
      const c = cells[idx(x, y)];
      return c && c.t === T.ROAD && !c.bridge && x !== SHOREX
        && countAround(x, y, 1, n => DEV.has(n.t)) >= 2;
    };
    const cap = r => staCells.filter(([sx, sy]) => {
      for (let yy = sy - r; yy <= sy + r; yy++) for (let xx = sx - r; xx <= sx + r; xx++)
        if (hexDist(sx, sy, xx, yy) <= r && eligible(xx, yy)) return true;
      return false;
    }).length;
    /* CONTROL: independently recompute the blind coin's own stop set (122 —
       check the claim against recomputed truth, not against the code that made
       it). The interchange rule may PROMOTE a coin stop to an interchange, but
       it must never destroy one, so every coin cell must still carry a stop. */
    let coin = 0, coinKept = 0;
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)];
      if (!c || c.t !== T.ROAD || c.bridge || x === SHOREX) continue;
      if (countAround(x, y, 1, n => DEV.has(n.t)) < 2) continue;
      if (hashCell(x, y, seedNum ^ 0xB5B5) < 0.05) { coin++; if (c.stop) coinKept++; }
    }
    let roads = 0, s1 = 0, s2 = 0;
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].t === T.ROAD) roads++;
      if (cells[i].stop === 1) s1++; else if (cells[i].stop === 2) s2++;
    }
    return {
      roads, stops: stops.length, stations: staCells.length, s1, s2, coin, coinKept,
      d,
      served1: d.filter(v => v <= 1).length,
      served2: d.filter(v => v <= 2).length,
      cap1: cap(1), cap2: cap(2),
      mean: d.length ? +(d.reduce((a, v) => a + v, 0) / d.length).toFixed(2) : NaN,
    };
  }));
  await p.close();
}
await b.close();

console.log('seed  roads stops(ord/ich) sta | nearest-stop dist per station        | mean  served<=1 <=2 | CEIL <=1 <=2 | coin kept');
let S = 0, S1 = 0, S2 = 0, C1 = 0, C2 = 0, CN = 0, CK = 0;
SEEDS.forEach((s, i) => {
  const r = rows[i];
  S += r.stations; S1 += r.served1; S2 += r.served2; C1 += r.cap1; C2 += r.cap2;
  CN += r.coin; CK += r.coinKept;
  console.log(
    String(s).padEnd(5), String(r.roads).padEnd(5),
    `${r.stops} (${r.s1}/${r.s2})`.padEnd(14),
    String(r.stations).padEnd(3), '|',
    r.d.join(' ').padEnd(36), '|',
    String(r.mean).padEnd(5), String(r.served1).padEnd(8), String(r.served2).padEnd(3), '|',
    String(r.cap1).padEnd(4), String(r.cap2).padEnd(3), '|',
    `${r.coinKept}/${r.coin}`);
});
const pc = (a, b) => `${a}/${b} (${(100 * a / b).toFixed(0)}%)`;
console.log(`\nSERVED   station with a bus stop <=1: ${pc(S1, S)} | <=2: ${pc(S2, S)}   <-- THE CLAIM`);
console.log(`CEILING  station with an ELIGIBLE road <=1: ${pc(C1, S)} | <=2: ${pc(C2, S)}   <-- control: terrain-derived, must NOT move`);
console.log(`CONTROL  blind-coin stops still standing: ${pc(CK, CN)}   <-- must be 100%: an interchange PROMOTES a shelter, never destroys one`);
