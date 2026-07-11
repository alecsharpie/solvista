#!/usr/bin/env node
/* probe-farmtip.mjs — does hovering a FARM hex now NAME its crop phase, matching the
 * per-field calendar the draw colours, while every non-FARM tile stays unchanged?
 *
 * The change is pure tooltip logic in describeTile: a FARM hex now carries a
 * 'Fields' row = farmPhase(c.v), which reads the SAME per-cell phase clock the draw
 * colours the crop with (both go through the shared farmPh(v), the 112 one-predicate
 * law). Orchard (129) and vineyard (148) already name their season; FARM — the biggest
 * agricultural surface, richest calendar (5 phases + hay bales, 174) — did not.
 *
 * 122's law — a tooltip vector must check its claim against INDEPENDENTLY recomputed
 * truth, not just that it renders. So the probe re-implements the phase clock and the
 * phase->word mapping itself (from year + c.v, the draw's own boundaries) and asserts
 * describeTile's printed word == that independent recompute. If it just called
 * farmPhase it would only prove the row renders, not that it is right.
 *
 * TARGET  = every FARM hex must title 'Farm' AND carry a 'Fields' row whose word ==
 *           the independent phase recompute of (year, c.v).
 * CONTROL = a sample of non-FARM tiles (ROAD/RES/ORCHARD/VINEYARD) must NOT carry a
 *           'Fields' row (the change moves nothing else; the neighbouring agricultural
 *           tiles keep THEIR own rows — Grove/Vines — and gain no Fields row).
 * CALENDAR = the belt's phase-word distribution must SHIFT across the year (harvest vs
 *           summer): proof the row reads the calendar, not a frozen string. At harvest
 *           many fields read 'Cut for harvest'; at midsummer that count collapses.
 *
 *   node probe-farmtip.mjs
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
// calendar keyframes (fractional year): the dry-peak harvest vs midsummer green
const HARVEST = 2035.88, SUMMER = 2035.40;

const browser = await chromium.launch();
const page = await browser.newPage();
let allPass = true;

// independent phase-word recompute — the draw's OWN formula + boundaries, reimplemented
const WORD = { ploughed: 'Ploughed under', sprouting: 'Sprouting', growing: 'Standing crop', ripening: 'Ripening to straw', harvested: 'Cut for harvest' };

for (const seed of SEEDS) {
  await page.goto(`${fileUrl}?seed=${seed}&warp=${WARP}&t=0.35`);
  await page.waitForTimeout(400);
  const r = await page.evaluate(({ WORD, HARVEST, SUMMER, seed }) => {
    playing = false;
    genWorld(seed); __warp(61);
    // independent recompute of the field's phase WORD (year + c.v), the draw's boundaries
    const indepWord = (yr, v) => {
      const ph = ((((yr % 1) + 1) % 1 - (v - 0.5) * 0.10) % 1 + 1) % 1;
      const k = ph < 0.06 || ph >= 0.93 ? 'ploughed' : ph < 0.20 ? 'sprouting' : ph < 0.52 ? 'growing' : ph < 0.80 ? 'ripening' : 'harvested';
      return WORD[k];
    };
    const farms = [], others = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)];
      if (c.t === T.FARM) farms.push([x, y]);
      else if ([T.ROAD, T.RES, T.ORCHARD, T.VINEYARD].includes(c.t)) others.push([x, y]);
    }
    const has = (h, s) => h.indexOf(s) >= 0;
    const titleOf = h => { const m = h.match(/class="tt">([^<]*)</); return m ? m[1] : '?'; };
    const fieldWord = h => { const m = h.match(/<span>Fields<\/span><b>([^<]*)</); return m ? m[1] : null; };

    // helper: at a pinned calendar, tally the belt's Fields words + count matches vs recompute
    const atYear = yr => {
      __setYear(yr); render();
      const dist = {};
      let ok = 0, bad = 0, missing = 0;
      for (const [x, y] of farms) {
        const c = cells[idx(x, y)];
        const h = describeTile(c, x, y);
        const w = fieldWord(h);
        if (titleOf(h) !== 'Farm') { bad++; continue; }
        if (w == null) { missing++; continue; }
        dist[w] = (dist[w] || 0) + 1;
        if (w === indepWord(yr, c.v)) ok++; else bad++;
      }
      return { dist, ok, bad, missing };
    };

    const harv = atYear(HARVEST);
    const summ = atYear(SUMMER);
    // control: non-FARM tiles must carry no Fields row (sample up to 400)
    let cOk = 0, cBad = 0;
    for (const [x, y] of others.slice(0, 400)) {
      const h = describeTile(cells[idx(x, y)], x, y);
      if (!has(h, '<span>Fields</span>')) cOk++; else cBad++;
    }
    return { farms: farms.length, others: Math.min(others.length, 400), harv, summ, cOk, cBad };
  }, { WORD, HARVEST, SUMMER, seed });

  const cutHarv = r.harv.dist['Cut for harvest'] || 0;
  const cutSumm = r.summ.dist['Cut for harvest'] || 0;
  const calendarShifts = cutHarv > cutSumm; // more fields cut at harvest than midsummer
  const pass = r.farms > 0 && r.harv.bad === 0 && r.harv.missing === 0 &&
    r.summ.bad === 0 && r.summ.missing === 0 && r.cBad === 0 && calendarShifts;
  allPass = allPass && pass;
  console.log(`seed ${seed}: farms=${r.farms} | harvest word-match=${r.harv.ok}/${r.farms} (bad ${r.harv.bad}, missing ${r.harv.missing}) ` +
    `| summer word-match=${r.summ.ok}/${r.farms} (bad ${r.summ.bad}) | non-FARM control no-Fields=${r.cOk}/${r.others} (bad ${r.cBad}) ` +
    `| 'Cut for harvest' fields ${cutHarv} (harvest) vs ${cutSumm} (summer) -> ${pass ? 'PASS' : 'FAIL'}`);
}

await browser.close();
console.log(allPass ? '\nVERDICT: PASS' : '\nVERDICT: FAIL');
process.exit(allPass ? 0 : 1);
