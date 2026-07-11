#!/usr/bin/env node
/* probe-fetetip.mjs — does hovering a festival street now NAME it and report its
 * crowd live, while every ordinary road hex stays a plain street?
 *
 * The change is pure tooltip logic in describeTile: a fete ROAD cell (c.fete — the
 * civic-mile bunting strung between two institutions, iter 178) now titles
 * 'Festival street' (not Avenue/Street) and carries a live 'Festival' row that reads
 * 'Crowds under the bunting' by day and 'Quiet after dark' at deep night, on the SAME
 * gate the milling crowd draw (178) uses: clamp((0.82-LITAMT)/0.28,0,1)>0.02.
 * So this is a DOM/logic probe, not a pixel diff: load a developed city, call
 * describeTile() on real cells across day + night, and assert the HTML.
 *
 * 122's law — a tooltip vector must check its claim against INDEPENDENTLY recomputed
 * truth, not just that it renders. So the probe re-implements the crowd gate itself
 * from the live LITAMT and asserts describeTile's printed value == that recompute.
 *
 * TARGET  = every fete ROAD hex titles 'Festival street' AND carries a 'Festival' row
 *           whose value == the independent day/night gate; the value must FLIP between
 *           the day frame and the night frame (crowds -> quiet).
 * CONTROL = ordinary ROAD hexes (!fete) must NOT title 'Festival street' and must NOT
 *           carry a 'Festival' row, in either frame (the change moves nothing else).
 *
 *   node probe-fetetip.mjs
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
const FRAMES = [['day', 0.35], ['night', 0.90]];

const browser = await chromium.launch();
const page = await browser.newPage();
let allPass = true;

for (const seed of SEEDS) {
  await page.goto(`${fileUrl}?seed=${seed}`);
  await page.waitForTimeout(200);
  const r = await page.evaluate(({ seed, warp, frames }) => {
    genWorld(seed); __warp(warp); playing = false;
    const fete = [], road = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)];
      if (c.t !== T.ROAD) continue;
      (c.fete ? fete : road).push([x, y]);
    }
    const titleOf = h => { const m = h.match(/class="tt">([^<]*)</); return m ? m[1] : '?'; };
    const rowVal = (h, label) => { const m = h.match(new RegExp('<span>' + label + '</span><b>([^<]*)<')); return m ? m[1] : null; };
    // INDEPENDENT recompute of the crowd draw's own gate (178), from live LITAMT.
    const expect = () => (Math.min(1, Math.max(0, (0.82 - LITAMT) / 0.28)) > 0.02)
      ? 'Crowds under the bunting' : 'Quiet after dark';

    const out = {};
    for (const [name, t] of frames) {
      __setTime(t); render();
      let tOk = 0, tBad = 0, valMismatch = 0;
      const vals = new Set();
      for (const [x, y] of fete) {
        const h = describeTile(cells[idx(x, y)], x, y);
        const okTitle = titleOf(h) === 'Festival street';
        const v = rowVal(h, 'Festival');
        const okVal = v === expect();
        if (v) vals.add(v);
        if (okTitle && okVal) tOk++; else { tBad++; if (!okVal) valMismatch++; }
      }
      // CONTROL: ordinary roads untouched — never 'Festival street', never a Festival row
      let cOk = 0, cBad = 0;
      for (const [x, y] of road) {
        const h = describeTile(cells[idx(x, y)], x, y);
        const clean = titleOf(h) !== 'Festival street' && rowVal(h, 'Festival') === null;
        if (clean) cOk++; else cBad++;
      }
      out[name] = { lit: +LITAMT.toFixed(2), tOk, tBad, valMismatch, cOk, cBad, val: [...vals].join('/') || '-' };
    }
    return { fete: fete.length, road: road.length, out };
  }, { seed, warp: WARP, frames: FRAMES });

  const d = r.out.day, n = r.out.night;
  const flips = d.val === 'Crowds under the bunting' && n.val === 'Quiet after dark';
  const pass = r.fete > 0 && d.tBad === 0 && n.tBad === 0 && d.cBad === 0 && n.cBad === 0 && flips;
  allPass = allPass && pass;
  console.log(`seed ${seed}: fete=${r.fete} road=${r.road}`);
  console.log(`   day  (LIT ${d.lit}): named+val OK=${d.tOk}/${r.fete} (bad ${d.tBad}, val-mismatch ${d.valMismatch}) val="${d.val}" | road ctl clean=${d.cOk}/${r.road} (bad ${d.cBad})`);
  console.log(`   night(LIT ${n.lit}): named+val OK=${n.tOk}/${r.fete} (bad ${n.tBad}, val-mismatch ${n.valMismatch}) val="${n.val}" | road ctl clean=${n.cOk}/${r.road} (bad ${n.cBad})  -> ${pass ? 'PASS' : 'FAIL'} (flip ${flips})`);
}

await browser.close();
console.log(allPass ? '\nVERDICT: PASS' : '\nVERDICT: FAIL');
process.exit(allPass ? 0 : 1);
