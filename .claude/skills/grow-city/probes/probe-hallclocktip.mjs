#!/usr/bin/env node
/* probe-hallclocktip.mjs — does hovering the TOWN HALL now NAME the hour its clock
 * hand points at, matching the same slow day clock the draw reads, while every
 * other tile stays unchanged?
 *
 * The town hall draws a working 24h clock (iters 135/149): the hand reads dayT —
 * up at noon, down at midnight — "the clock the town sets its watches by". Yet its
 * tooltip (CIVICDESC[hall]) named the chambers and the clerk and said nothing of
 * the time. The change adds a single 'Clock' data row = clockWord(dayT), reading
 * the SAME dayT the hand points at. Same asserts-less-than-code seam as the farm
 * (183), orchard (129), vineyard (148) — but on the slow TIME clock, not the year,
 * so it never strobes (iter 134/135's law).
 *
 * 122's law — a tooltip vector must check its claim against INDEPENDENTLY recomputed
 * truth, not just that it renders. So the probe re-implements clockWord itself (from
 * dayT) and asserts describeTile's printed 'Clock' word == that independent recompute
 * across a full sweep of the day.
 *
 * TARGET  = the hall hex must title 'Town hall' AND carry a 'Clock' row whose string
 *           == the independent recompute of clockWord(dayT), at every sampled time.
 * CONTROL = a sample of non-hall tiles (other civics, ROAD, RES, FARM) must NOT carry
 *           a 'Clock' row — the change moves nothing else.
 * TIME    = the hall's Clock string must CHANGE across the day (>1 distinct value):
 *           proof the row reads the live clock, not a frozen string.
 *
 *   node probe-hallclock.mjs
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
// a full sweep of the day: midnight / 3am / 6am / 7:12am(default) / noon / 6pm / 9pm
const TIMES = [0.0, 0.125, 0.25, 0.30, 0.5, 0.75, 0.875];

const browser = await chromium.launch();
const page = await browser.newPage();
let allPass = true;

// independent clock-string recompute — clockWord's OWN formula, reimplemented
const indepClock = t => {
  const mins = Math.round((((t % 1) + 1) % 1) * 1440) % 1440;
  const h = (mins / 60 | 0), m = mins % 60, ap = h < 12 ? 'AM' : 'PM';
  return (h % 12 || 12) + ':' + (m < 10 ? '0' : '') + m + ' ' + ap;
};

for (const seed of SEEDS) {
  await page.goto(`${fileUrl}?seed=${seed}&warp=${WARP}&t=0.35`);
  await page.waitForTimeout(400);
  const r = await page.evaluate(({ TIMES, seed }) => {
    playing = false;
    genWorld(seed); __warp(61);
    const titleOf = h => { const m = h.match(/class="tt">([^<]*)</); return m ? m[1] : '?'; };
    const clockOf = h => { const m = h.match(/<span>Clock<\/span><b>([^<]*)</); return m ? m[1] : null; };
    const hasClock = h => h.indexOf('<span>Clock</span>') >= 0;

    // find the hall + a control sample (other civics + ROAD/RES/FARM)
    let hall = null; const others = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)];
      if (c.t === T.CIVIC && c.kind === 'hall') hall = [x, y];
      else if ((c.t === T.CIVIC) || [T.ROAD, T.RES, T.FARM].includes(c.t)) others.push([x, y]);
    }
    if (!hall) return { hall: false };

    // sweep the day: at each dayT, read the hall's Clock string + title
    const rows = [];
    const seen = new Set();
    for (const t of TIMES) {
      __setTime(t); render();
      const h = describeTile(cells[idx(hall[0], hall[1])], hall[0], hall[1]);
      const w = clockOf(h);
      if (w != null) seen.add(w);
      rows.push({ t, title: titleOf(h), word: w });
    }
    // control: non-hall tiles must carry no Clock row (sample up to 500)
    let cOk = 0, cBad = 0;
    for (const [x, y] of others.slice(0, 500)) {
      if (!hasClock(describeTile(cells[idx(x, y)], x, y))) cOk++; else cBad++;
    }
    return { hall: true, rows, distinct: seen.size, others: Math.min(others.length, 500), cOk, cBad };
  }, { TIMES, seed });

  if (!r.hall) { console.log(`seed ${seed}: NO HALL FOUND -> FAIL`); allPass = false; continue; }
  let ok = 0, bad = 0;
  for (const row of r.rows) {
    const want = indepClock(row.t);
    if (row.title === 'Town hall' && row.word === want) ok++;
    else { bad++; console.log(`  seed ${seed} t=${row.t}: got title='${row.title}' clock='${row.word}' want '${want}'`); }
  }
  const timeChanges = r.distinct > 1;
  const pass = bad === 0 && ok === r.rows.length && r.cBad === 0 && timeChanges;
  allPass = allPass && pass;
  console.log(`seed ${seed}: hall clock-match=${ok}/${r.rows.length} (bad ${bad}) ` +
    `| distinct times across day=${r.distinct}/${r.rows.length} ` +
    `| non-hall control no-Clock=${r.cOk}/${r.others} (bad ${r.cBad}) -> ${pass ? 'PASS' : 'FAIL'}`);
}

await browser.close();
console.log(allPass ? '\nVERDICT: PASS' : '\nVERDICT: FAIL');
process.exit(allPass ? 0 : 1);
