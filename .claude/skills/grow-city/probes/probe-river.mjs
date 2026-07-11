#!/usr/bin/env node
/* probe-river.mjs — does hovering a river hex now NAME its course length, while every
 * SEA hex stays unchanged?
 *
 * The change is pure tooltip logic in describeTile: a river water hex (WATER && riv)
 * now carries a 'Course N hexes' row = its whole course by a bridge-aware flood
 * (riverCourse — steps through bridge spans so the reach doesn't fragment, counts only
 * the open-water hexes). So this is a DOM/logic probe, not a pixel diff: load a
 * developed city, call describeTile() on real cells, and assert the HTML.
 *
 * 122's law — a tooltip vector must check its claim against INDEPENDENTLY recomputed
 * truth, not just that it renders. So the probe re-implements the bridge-aware flood
 * itself (its own predicate + counting, using only the grid topology nbrs6), and
 * asserts describeTile's printed N == that independent recompute. If the probe just
 * called riverCourse it would only prove the row renders, not that it is right.
 *
 * TARGET  = every river hex (WATER && riv) must title 'River' AND carry a 'Course N
 *           hex(es)' row whose N == the independent flood's WATER-hex count (>=1).
 * CONTROL = SEA hexes (WATER && !riv) must title 'Ocean', carry a 'Depth' row, and
 *           must NOT carry a 'Course' row (the change moves nothing else). The flood
 *           must also stop at the mouth (never counts a sea hex — sea-leak guard).
 *
 *   node probe-river.mjs
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const CAND = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html'), resolve(HERE, '../../../solvista.html')];
const ROOT = CAND.find(existsSync);
const fileUrl = pathToFileURL(ROOT).href;

const SEEDS = [7, 42, 1234];
const WARP = 61;

const browser = await chromium.launch();
const page = await browser.newPage();
let allPass = true;

for (const seed of SEEDS) {
  await page.goto(`${fileUrl}?seed=${seed}&warp=${WARP}&t=0.35`);
  await page.waitForTimeout(400);
  const r = await page.evaluate(() => {
    playing = false;
    // INDEPENDENT recompute (not riverCourse): flood river water + bridge road, using
    // only the grid topology (nbrs6). Counts water hexes and bridge crossings apart.
    const indepCourse = (x0, y0) => {
      const isRiv = m => !!m && ((m.t === T.WATER && m.riv) || (m.t === T.ROAD && m.bridge));
      if (!isRiv(cells[idx(x0, y0)])) return { hexes: 0, sea: 0 };
      const seen = new Set([idx(x0, y0)]), stack = [[x0, y0]];
      let hexes = 0, sea = 0;
      while (stack.length) {
        const [a, b] = stack.pop(); const c = cellAt(a, b);
        if (c.t === T.WATER && c.riv) hexes++;
        else if (c.t === T.WATER && !c.riv) sea++;   // must never happen — sea leak guard
        nbrs6(a, b, (p, q) => {
          const m = cellAt(p, q); if (!isRiv(m)) return;
          const j = idx(p, q); if (seen.has(j)) return; seen.add(j); stack.push([p, q]);
        });
      }
      return { hexes, sea };
    };
    const river = [], sea = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)];
      if (c.t !== T.WATER) continue;
      if (c.riv) river.push([x, y]);
      else if (!pierAt(x, y) && !moleSet.has(idx(x, y))) sea.push([x, y]);
    }
    const has = (h, s) => h.indexOf(s) >= 0;
    const titleOf = h => { const m = h.match(/class="tt">([^<]*)</); return m ? m[1] : '?'; };
    const rowN = (h, label) => { const m = h.match(new RegExp('<span>' + label + '</span><b>(\\d+)')); return m ? +m[1] : null; };

    // TARGET
    let tOk = 0, tBad = 0, courseMismatch = 0, seaLeak = 0;
    for (const [x, y] of river) {
      const h = describeTile(cells[idx(x, y)], x, y);
      const ind = indepCourse(x, y);
      if (ind.sea > 0) seaLeak++;
      const okTitle = titleOf(h) === 'River';
      const cn = rowN(h, 'Course');
      const okCourse = cn === ind.hexes && ind.hexes >= 1;
      if (okTitle && okCourse) tOk++;
      else { tBad++; if (!okCourse) courseMismatch++; }
    }
    // CONTROL: sea hexes untouched — 'Ocean', a Depth row, and no Course row
    let cOk = 0, cBad = 0;
    for (const [x, y] of sea) {
      const h = describeTile(cells[idx(x, y)], x, y);
      const clean = titleOf(h) === 'Ocean' && has(h, 'Depth') && !has(h, 'Course');
      if (clean) cOk++; else cBad++;
    }
    // longest course this seed, for interest
    let maxCourse = 0;
    for (const [x, y] of river) maxCourse = Math.max(maxCourse, indepCourse(x, y).hexes);
    return { river: river.length, tOk, tBad, courseMismatch, seaLeak, sea: sea.length, cOk, cBad, maxCourse };
  });
  const pass = r.river > 0 && r.tBad === 0 && r.cBad === 0 && r.seaLeak === 0;
  allPass = allPass && pass;
  console.log(`seed ${seed}: river=${r.river} named+course OK=${r.tOk}/${r.river} (bad ${r.tBad}, course-mismatch ${r.courseMismatch}, sea-leak ${r.seaLeak}) | ` +
    `sea control clean=${r.cOk}/${r.sea} (bad ${r.cBad}) | longest course=${r.maxCourse} hexes  -> ${pass ? 'PASS' : 'FAIL'}`);
}

await browser.close();
console.log(allPass ? '\nVERDICT: PASS' : '\nVERDICT: FAIL');
process.exit(allPass ? 0 : 1);
