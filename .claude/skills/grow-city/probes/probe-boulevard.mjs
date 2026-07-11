#!/usr/bin/env node
/* probe-boulevard.mjs — does hovering a tree-lined road now NAME it a boulevard,
 * report the leafy run's LENGTH, and leave every other road unchanged?
 *
 * The change is pure tooltip logic in describeTile: a treed ROAD now titles
 * 'Boulevard' (was 'Avenue'/'Arterial'/'Street'), gains a 'Length' row = its
 * contiguous treed-road extent (boulevardSize, the floodSize the woods/kelp use),
 * and its sub notes if it is also a trunk. So this is a DOM/logic probe, not a
 * pixel diff: load a developed city, call describeTile() on real cells, and assert
 * the HTML it returns.
 *
 * TARGET  = every treed ROAD cell must title 'Boulevard' AND carry a 'Length N
 *           block(s)' row whose N == boulevardSize (>=1).
 * CONTROL = busy NON-treed roads must title 'Avenue'/'Arterial' and must NOT say
 *           'Boulevard' nor carry a 'Length' row (the change moves nothing else).
 *
 *   node probe-boulevard.mjs
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
    const treed = [], busyPlain = [], quietPlain = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)];
      if (c.t !== T.ROAD || c.bridge) continue;
      if (c.treed) treed.push([x, y]);
      else if (c.busy) busyPlain.push([x, y]);
      else quietPlain.push([x, y]);
    }
    const has = (h, s) => h.indexOf(s) >= 0;
    const titleOf = h => { const m = h.match(/class="tt">([^<]*)</); return m ? m[1] : '?'; };

    // TARGET: every treed road must name Boulevard + a correct Length row
    let tOk = 0, tBad = 0, lenMismatch = 0;
    for (const [x, y] of treed) {
      const h = describeTile(cells[idx(x, y)], x, y);
      const okTitle = titleOf(h) === 'Boulevard';
      const lm = h.match(/<span>Length<\/span><b>(\d+) blocks?<\/b>/);
      const n = boulevardSize(x, y);
      const okLen = lm && +lm[1] === n && n >= 1;
      if (okTitle && okLen) tOk++; else { tBad++; if (!okLen) lenMismatch++; }
    }
    // CONTROL: busy non-treed roads must NOT mention Boulevard/Length
    let cOk = 0, cBad = 0;
    for (const [x, y] of busyPlain) {
      const h = describeTile(cells[idx(x, y)], x, y);
      const clean = !has(h, 'Boulevard') && !has(h, 'Length')
        && (titleOf(h) === 'Avenue' || titleOf(h) === 'Arterial');
      if (clean) cOk++; else cBad++;
    }
    // biggest boulevard run this seed, for interest
    let maxRun = 0;
    for (const [x, y] of treed) maxRun = Math.max(maxRun, boulevardSize(x, y));
    // sample title on a quiet plain road (should stay 'Street')
    const q = quietPlain.length ? titleOf(describeTile(cells[idx(...quietPlain[0])], ...quietPlain[0])) : 'n/a';
    return { treed: treed.length, tOk, tBad, lenMismatch, busy: busyPlain.length, cOk, cBad, maxRun, quietTitle: q };
  });
  const pass = r.treed > 0 && r.tBad === 0 && r.cBad === 0 && r.quietTitle === 'Street';
  allPass = allPass && pass;
  console.log(`seed ${seed}: treed=${r.treed} named+length OK=${r.tOk}/${r.treed} (bad ${r.tBad}, len-mismatch ${r.lenMismatch}) | ` +
    `busy-plain control clean=${r.cOk}/${r.busy} (bad ${r.cBad}) | quiet road='${r.quietTitle}' | longest run=${r.maxRun} blocks  -> ${pass ? 'PASS' : 'FAIL'}`);
}

await browser.close();
console.log(allPass ? '\nVERDICT: PASS' : '\nVERDICT: FAIL');
process.exit(allPass ? 0 : 1);
