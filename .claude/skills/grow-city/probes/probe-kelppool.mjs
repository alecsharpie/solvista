/* probe-kelp3 — HOW DARK COULD THE COAST GO?
 *
 * Kelp is this loop's most notorious regression ("kelp lined the entire coast dark
 * for ~13 iterations"). Before choosing ANY rate for a spread rule, count the pool
 * a depth predicate would admit -- the space decides the rule, and the rate is
 * irrelevant until the space is right (263).
 *
 * Pure world data: no render, no clock, no noise floor.
 *
 * Columns: the whole sea, then the candidate pools, with and without HEAD's coarse
 * stretch gate (hashCell(5,y>>2,...) < 0.34 -- the gate whose comment says "only
 * OCCASIONAL beds ... so most of the coast stays clean light sand + open water").
 * That intent is a design constraint I am not licensed to break.
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = join(HERE, '../../../../solvista.html');

const SEEDS = [42, 7, 1234, 99, 2024, 555];

const b = await chromium.launch();
const p = await b.newPage();
await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await p.goto(pathToFileURL(ART).href);
await p.waitForTimeout(400);

console.log('=== the sea, by depth band, and the pool a depth predicate would admit ===');
console.log('HEAD KELP sits at rDeep=1.000 flat.  SHELF0=3 SHELF1=5 DEEPR=10');
console.log('seed |  sea  KELP | d<=2  d<=SHELF0(3)  d<=SHELF1(5) | +stretch gate: d<=2  d<=3  d<=5');
const tot = { a: 0, b: 0, c: 0 };
for (const seed of SEEDS) {
  const r = await p.evaluate((seed) => {
    playing = false;
    genWorld(seed);
    window.__warp(2035 - year);

    /* the sea a kelp holdfast could ever reach: open salt water, off the rubble,
       away from the river plume -- HEAD's own non-depth clauses, kept verbatim */
    const rootable = (x, y, i, c) =>
      (c.t === T.WATER || c.t === T.KELP) && !c.riv && !moleSet.has(i)
      && countAround(x, y, 1, n => n.t === T.WATER && n.riv) === 0;

    let sea = 0, kelp = 0;
    const band = { 2: 0, 3: 0, 5: 0 }, gated = { 2: 0, 3: 0, 5: 0 };
    for (const i of HEXI) {
      const x = i % G, y = (i / G) | 0, c = cells[i];
      if (c.t === T.KELP) kelp++;
      if (!rootable(x, y, i, c)) continue;
      sea++;
      const d = rDeep[i];
      const stretch = hashCell(5, y >> 2, seedNum ^ 0x4E1F) < 0.34;
      for (const k of [2, 3, 5]) {
        if (d <= k) { band[k]++; if (stretch) gated[k]++; }
      }
    }
    return { sea, kelp, band, gated };
  }, seed);

  console.log(
    String(seed).padEnd(5) + '|' + String(r.sea).padStart(5) + String(r.kelp).padStart(6) + ' |' +
    String(r.band[2]).padStart(5) + String(r.band[3]).padStart(14) + String(r.band[5]).padStart(14) + ' |' +
    String(r.gated[2]).padStart(21) + String(r.gated[3]).padStart(6) + String(r.gated[5]).padStart(6));
  tot.a += r.gated[2]; tot.b += r.gated[3]; tot.c += r.gated[5];
}
console.log('\nmean gated pool:  d<=2 ' + (tot.a / SEEDS.length).toFixed(1) +
            '   d<=3 ' + (tot.b / SEEDS.length).toFixed(1) +
            '   d<=5 ' + (tot.c / SEEDS.length).toFixed(1) +
            '     (HEAD ships 8-36 kelp; the coast must NOT go dark)');

await b.close();
