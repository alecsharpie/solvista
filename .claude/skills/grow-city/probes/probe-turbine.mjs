#!/usr/bin/env node
/* Siting probe for cue (k)'s second half: "the offshore objects are still
 * randomly salted rather than sited" (iters 115, 116).
 *
 *   node probe-turbine.mjs [seed ...]
 *
 * Turbines are laid in genWorld at a fixed SHORE-relative offset
 * (shoreAt(y)+5..+8), which is not a depth. This joins each turbine to the live
 * `rDeep` field via the __deep hook and grades the siting the way the tooltip
 * grades the water:
 *
 *   depth    rDeep at the turbine's hex, and the band the tooltip would name
 *   tile     what the hex actually IS at the drawn year (a turbine on KELP is
 *            never drawn -- the draw case is T.WATER)
 *   rowsep   min row separation between turbines (they share a row freely today)
 *   drawn    whether the turbine survives to the draw at all
 *
 * A well-sited farm: every turbine on the `Coastal shelf` (rDeep 3..5), on open
 * WATER, no two within a few rows of each other.
 */
import { homedir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(join(resolve(HERE, '../../..'), 'solvista.html')).href;

const args = process.argv.slice(2).filter(a => !a.startsWith('-')).map(Number);
const SEEDS = args.length ? args : [7, 42, 1234, 99, 2024, 555];

const band = d => d <= 2 ? 'Shoals' : d <= 5 ? 'Coastal shelf' : d < 10 ? 'Open water' : 'Deep water';

const b = await chromium.launch();
const rows = [];
for (const seed of SEEDS) {
  const p = await b.newPage();
  await p.goto(`${PAGE}?seed=${seed}&warp=61&t=0.35`);
  await p.waitForFunction(() => window.__deep && window.__census, null, { timeout: 20000 });
  const r = await p.evaluate(() => {
    const deep = window.__deep();
    const dmap = new Map(deep.map(o => [o.y * 1000 + o.x, o]));
    const T2 = Object.fromEntries(Object.entries(T).map(([k, v]) => [v, k]));
    return turbines.map(t => {
      const o = dmap.get(t.y * 1000 + t.x);
      const c = cellAt(t.x, t.y);
      return {
        x: t.x, y: t.y,
        d: o ? o.d : -1,
        riv: o ? !!o.riv : false,
        tile: c ? (T2[c.t] || c.t) : 'NONE',
        shoreOff: t.x - shoreAt(t.y),
      };
    });
  });
  await p.close();
  // row separation
  const ys = r.map(t => t.y);
  let sep = 99;
  for (let i = 0; i < ys.length; i++) for (let j = i + 1; j < ys.length; j++) sep = Math.min(sep, Math.abs(ys[i] - ys[j]));
  const uniq = new Set(r.map(t => t.y * 1000 + t.x)).size;
  rows.push({ seed, t: r, sep, uniq });
}
await b.close();

let bad = 0, tot = 0, onShelf = 0;
for (const { seed, t, sep, uniq } of rows) {
  console.log(`\nseed ${seed}   rowsep=${sep}   distinct cells=${uniq}/3`);
  for (const o of t) {
    tot++;
    const drawn = o.tile === 'WATER' && !o.riv;
    if (!drawn) bad++;
    if (o.d >= 3 && o.d <= 5) onShelf++;
    console.log(`   (${String(o.x).padStart(3)},${String(o.y).padStart(3)})  shore+${o.shoreOff}  ` +
      `rDeep=${String(o.d).padStart(2)} ${band(o.d).padEnd(14)} tile=${o.tile.padEnd(6)}` +
      `${o.riv ? ' RIVER' : ''}${drawn ? '' : '  <-- NOT DRAWN'}`);
  }
}
console.log(`\n${tot} turbines: ${onShelf} on Coastal shelf (rDeep 3-5), ${bad} not drawable.`);
