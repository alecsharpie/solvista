#!/usr/bin/env node
/* Shape probe for the greenway (Nature x Connect).
 *
 * A Connect claim is honest only if the thing is ONE connected run — iter 88's
 * per-cell belt drew a dotted line and RAISED the patch count. So union-find the
 * greenway cells and report:
 *
 *   gw        how many cells the ribbon owns
 *   patches   connected components over the gw cells (1 = a true ribbon)
 *   biggest   cells in the largest component (should be ~= gw)
 *   span      hex distance end-to-end of the largest component (district-scale?)
 *   coreD     hex distance from the ribbon to the founding crossroads (CBD)
 *   survive   gw cells still PARK at 2035 (nothing should ever take one)
 *
 *   node probe-greenway.mjs [seed ...]
 */
import { homedir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(join(resolve(HERE, '../../..'), 'solvista.html')).href;

const args = process.argv.slice(2).filter(a => !a.startsWith('-')).map(Number);
const SEEDS = args.length ? args : [7, 42, 1234];

const b = await chromium.launch();
for (const seed of SEEDS) {
  for (const warp of [0, 61]) {
    const p = await b.newPage();
    p.on('pageerror', e => console.error('PAGEERROR', seed, String(e)));
    await p.goto(`${PAGE}?seed=${seed}&warp=${warp}&t=0.35`);
    await p.waitForTimeout(400);
    const r = await p.evaluate(() => {
      const gw = [];
      let survive = 0, parks = 0;
      for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
        const c = cellAt(x, y);
        if (!c) continue;
        if (c.t === T.PARK) parks++;
        if (c.gw) { gw.push([x, y]); if (c.t === T.PARK) survive++; }
      }
      /* union-find over 6-neighbourhood */
      const key = (x, y) => y * G + x;
      const set = new Map(gw.map(([x, y], i) => [key(x, y), i]));
      const par = gw.map((_, i) => i);
      const find = a => { while (par[a] !== a) a = par[a] = par[par[a]]; return a; };
      const uni = (a, c2) => { a = find(a); c2 = find(c2); if (a !== c2) par[a] = c2; };
      /* A street cutting the ribbon is an intersection, not a hole (the file says as much
         of the high street). So union across a SINGLE non-green cell too: that is the
         honest test of "one greenway", where strict adjacency would call every crossing
         a break. `strict` keeps the unbridged count for comparison. */
      const link = bridge => {
        par.forEach((_, i) => par[i] = i);
        gw.forEach(([x, y], i) => nbrs6(x, y, (a, bb) => {
          const j = set.get(key(a, bb));
          if (j !== undefined) { uni(i, j); return; }
          if (!bridge) return;
          /* hop the gap cell to any green on its far side. Must go through nbrs6 again:
             hex neighbour offsets depend on row parity, so (dx,dy) cannot be reused. */
          nbrs6(a, bb, (e, f) => {
            const k2 = set.get(key(e, f));
            if (k2 !== undefined) uni(i, k2);
          });
        }));
        const cm = new Map();
        gw.forEach((_, i) => { const r2 = find(i); cm.set(r2, (cm.get(r2) || []).concat([i])); });
        return cm;
      };
      const strict = link(false).size;
      const comp0 = link(true);
      let big = [];
      for (const v of comp0.values()) if (v.length > big.length) big = v;
      let span = 0;
      for (const i of big) for (const j of big) {
        const d = hexDist(gw[i][0], gw[i][1], gw[j][0], gw[j][1]);
        if (d > span) span = d;
      }
      let coreD = 99;
      for (const [x, y] of gw) coreD = Math.min(coreD, hexDist(x, y, CBDX, CBDY));
      /* full span of the whole ribbon, ignoring severing */
      let fullSpan = 0;
      for (const a of gw) for (const c2 of gw) {
        const d = hexDist(a[0], a[1], c2[0], c2[1]);
        if (d > fullSpan) fullSpan = d;
      }
      /* what stopped the walk? replay the line and histogram the blockers */
      const NAME = Object.fromEntries(Object.entries(T).map(([k, v]) => [v, k]));
      const block = {};
      for (let yy = 0; yy < G; yy++) {
        const gx = GWX(yy), c = cellAt(gx, yy);
        if (!c) { block.OFFPLATE = (block.OFFPLATE || 0) + 1; continue; }
        if (c.gw) continue;
        const k = c.corr ? 'corr(road)' : NAME[c.t];
        block[k] = (block[k] || 0) + 1;
      }
      return { gw: gw.length, strict, patches: comp0.size, biggest: big.length, span, fullSpan, coreD, survive, parks, pop: stats.pop, block };
    });
    console.log(`seed ${String(seed).padStart(4)} ${warp ? '2035' : '1985'}  gw=${String(r.gw).padStart(3)}  patches=${String(r.patches).padStart(2)}(strict ${String(r.strict).padStart(2)})  biggest=${String(r.biggest).padStart(3)}  span=${String(r.span).padStart(2)}  coreD=${String(r.coreD).padStart(2)}  survive=${String(r.survive).padStart(3)}  parks=${String(r.parks).padStart(3)}  pop=${r.pop}  fullSpan=${r.fullSpan}
             blockers: ${Object.entries(r.block).sort((a, c) => c[1] - a[1]).map(([k, v]) => `${k}:${v}`).join(' · ')}`);
    await p.close();
  }
}
await b.close();
