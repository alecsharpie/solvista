#!/usr/bin/env node
/* probe-cornershop — iter 151, Urban fabric x New CA rule.
 *
 * A new tick() pass opens a "corner shop" on ONE house in a shop DESERT: a RES
 * cell with no COM/MARKET within 3 hexes, on a built-up block. It sets c.corner
 * (the cell STAYS T.RES — mixed-use, like c.loft/c.solar/c.groof), so the pass
 * changes no tile type and calls no rng(): the census is vacuous by construction.
 * The gate is therefore this probe, which checks the PLACEMENT against truth
 * recomputed independently in Node (122's law — not by calling the page's own
 * countAround):
 *
 *   (1) Every corner shop sits in a retail gap — min hex distance to any COM/MARKET
 *       is > 2. (Independent odd-r cube distance, not countAround.) The pass
 *       re-validates (clears c.corner when a shop reaches within 2), so this holds
 *       at every tick, not just at placement.
 *   (2) Control — NO corner shop sits within 2 of a COM/MARKET (the complement of 1).
 *   (3) Spacing — no two corner shops within 2 hexes (the one-per-block rule).
 *   (4) They exist and are not spam: a handful..dozens per city, none before the
 *       rule's 1990 start. Count need NOT grow with the era — stores are absorbed
 *       as the city's shops reach them, so 2035 can hold fewer than 2005.
 *   (5) Naming — a corner shop's describeTile titles "Corner shop"; a plain RES does not.
 *   (6) Determinism — same seed, two loads, identical corner count + positions.
 *
 *   node probe-cornershop.mjs
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(join(HERE, '../../../../solvista.html')).href;

const SEEDS = [7, 42, 1234];

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });

/* the placement audit, run in-page but recomputing distances OURSELVES */
async function audit(seed, warp) {
  await p.goto(`${PAGE}?seed=${seed}&warp=${warp}`);
  await p.waitForTimeout(400);
  return await p.evaluate(() => {
    /* independent odd-r offset -> cube hex distance (NOT the page's countAround) */
    const cube = (x, y) => { const cx = x - ((y - (y & 1)) >> 1), cz = y; return [cx, -cx - cz, cz]; };
    const hdist = (ax, ay, bx, by) => {
      const A = cube(ax, ay), B = cube(bx, by);
      return (Math.abs(A[0] - B[0]) + Math.abs(A[1] - B[1]) + Math.abs(A[2] - B[2])) / 2;
    };
    const corners = [], shops = [];
    for (let i = 0; i < cells.length; i++) {
      const c = cells[i]; if (c.t === T.VOID) continue;
      const x = i % G, y = (i / G) | 0;
      if (c.t === T.RES && c.corner) corners.push([x, y]);
      if (c.t === T.COM || c.t === T.MARKET) shops.push([x, y]);
    }
    /* (1)/(2) every corner's nearest real shop is > 3 away */
    let inDesert = 0, nearShop = 0, minToShop = 99;
    for (const [x, y] of corners) {
      let m = 99;
      for (const [sx, sy] of shops) { const d = hdist(x, y, sx, sy); if (d < m) m = d; }
      if (m > 2) inDesert++; else nearShop++;
      if (m < minToShop) minToShop = m;
    }
    /* (3) spacing: closest pair of corners */
    let minPair = 99;
    for (let a = 0; a < corners.length; a++)
      for (let bb = a + 1; bb < corners.length; bb++) {
        const d = hdist(corners[a][0], corners[a][1], corners[bb][0], corners[bb][1]);
        if (d < minPair) minPair = d;
      }
    /* (5) naming: a corner titles "Corner shop"; a plain RES does not */
    const titleOf = (x, y) => (describeTile(cells[idx(x, y)], x, y).match(/<p class="tt">([^<]+)<\/p>/) || [, ''])[1];
    let cornerNamed = 0, plainNamed = 0, plainSeen = 0;
    for (const [x, y] of corners) if (/Corner shop/.test(titleOf(x, y))) cornerNamed++;
    for (let i = 0; i < cells.length && plainSeen < 200; i++) {
      const c = cells[i]; if (c.t === T.RES && !c.corner) { plainSeen++; if (/Corner shop/.test(titleOf(i % G, (i / G) | 0))) plainNamed++; }
    }
    const sample = corners.length ? titleOf(corners[0][0], corners[0][1]) : '(none)';
    return { n: corners.length, inDesert, nearShop, minToShop, minPair,
             cornerNamed, plainNamed, plainSeen, sample, pos: corners.map(c => c.join(',')).join(' ') };
  });
}

console.log('CORNER-SHOP PLACEMENT AUDIT (distances recomputed in Node, odd-r cube)\n');
let fail = false;
for (const seed of SEEDS) {
  const e35 = await audit(seed, 61);   /* ~2035 */
  const e05 = await audit(seed, 31);   /* ~2005 */
  const e85 = await audit(seed, 11);   /* ~1985 — rule starts 1990, expect 0 */
  const det = await audit(seed, 61);   /* determinism: reload 2035 */

  const ok = e35.nearShop === 0 && e35.inDesert === e35.n && e35.n > 0
    && (e35.minPair === 99 || e35.minPair >= 3)
    && e35.cornerNamed === e35.n && e35.plainNamed === 0
    && e85.n === 0 && e05.n > 0
    && det.n === e35.n && det.pos === e35.pos;
  if (!ok) fail = true;

  console.log(`seed ${seed}:`);
  console.log(`  count      1985=${e85.n}  2005=${e05.n}  2035=${e35.n}  (rule>=1990; count need not grow — stores get absorbed)`);
  console.log(`  gap        ${e35.inDesert}/${e35.n} in a retail gap (>2 from a shop) · nearShop=${e35.nearShop} (must be 0) · nearest real shop >= ${e35.minToShop} hexes`);
  console.log(`  spacing    closest corner pair = ${e35.minPair === 99 ? 'n/a' : e35.minPair} hexes (>= 3)`);
  console.log(`  naming     ${e35.cornerNamed}/${e35.n} title "Corner shop" · plain-RES false hits ${e35.plainNamed}/${e35.plainSeen}`);
  console.log(`  determ.    reload count ${det.n} · positions ${det.pos === e35.pos ? 'identical' : 'DRIFTED'}`);
  console.log(`  sample     "${e35.sample}"`);
  console.log(`  -> ${ok ? 'PASS' : 'FAIL'}\n`);
}

await b.close();
console.log(fail ? 'PROBE: FAIL' : 'PROBE: PASS');
process.exit(fail ? 1 : 0);
