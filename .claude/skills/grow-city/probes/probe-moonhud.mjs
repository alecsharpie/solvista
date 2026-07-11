#!/usr/bin/env node
/* probe-moonhud.mjs — the census-card moon readout (iter 144): correct, and slow. (iter 144)
 *
 * Iter 135 slowed the moon FIELD (moonPhase reads the slow dayT day-counter, not the
 * fast `year` dev clock) and banked "a moon-only HUD card is now viable." This adds
 * that card (#stMoonPct / #stMoonName in the census strip). Two claims to gate:
 *
 *  A. CADENCE (134's law — a readout claim needs a RUNNING clock). Let the page play
 *     and read the actual DOM #stMoonName over 6 s; the visible word must NOT strobe.
 *     CONTROL: dayT/year must advance, else "0 transitions" would mean "frozen".
 *  B. CORRECTNESS + LIVENESS. Sweep a whole lunation via __setTime and check every
 *     sampled word agrees with its illumination & waxing state, and that all 8 phase
 *     names actually appear (the readout is live across the month, not stuck).
 *
 *   node probe-moonhud.mjs
 */
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
/* resolve relative to THIS file: probes/ (git mv'd home) is four dirs up; the repo
   root is where an ad-hoc probe is born before it's promoted. Pick whichever exists. */
const CAND = [join(HERE, '../../../../solvista.html'), join(HERE, 'solvista.html')];
const FILE = CAND.find(existsSync);
const PAGE = pathToFileURL(FILE).href;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });

let ok = true;

/* ---- A. cadence: the DOM word must not strobe while the clock runs ---- */
for (const seed of [42, 7]) {
  await p.goto(`${PAGE}?seed=${seed}&warp=61&t=0.90`);
  await p.waitForTimeout(300);
  const res = await p.evaluate(async () => {
    playing = true; speed = 8;                 /* 8x so dayT moves fast; still slow moon */
    const words = []; const t0 = performance.now();
    let d0 = dayT, y0 = year;
    while (performance.now() - t0 < 6000) {
      words.push(document.getElementById('stMoonName').textContent);
      await new Promise(r => setTimeout(r, 100));
    }
    return { words, dDay: dayT - d0, dYr: year - y0 };
  });
  let trans = 0;
  for (let i = 1; i < res.words.length; i++) if (res.words[i] !== res.words[i - 1]) trans++;
  const running = res.dDay > 0 && res.dYr > 0;
  const pass = trans <= 2 && running;
  ok = ok && pass;
  console.log(`\nseed ${seed} — cadence (6 s of 8x play, DOM #stMoonName @10Hz)`);
  console.log(`  word transitions: ${trans}   [strobe ≫; slow legible readout ≤2]`);
  console.log(`  distinct words seen: ${[...new Set(res.words)].join(', ')}`);
  console.log(`  CONTROL clock running: ΔdayT ${res.dDay.toFixed(3)}, Δyear ${res.dYr.toFixed(3)}   [both >0]`);
  console.log(`  verdict: ${pass ? 'SLOW (pass)' : running ? 'STROBES' : 'CLOCK FROZEN — invalid'}`);
}

/* ---- B. correctness + liveness across a full lunation ---- */
const sweep = await p.evaluate(() => {
  playing = false;
  const rows = [];
  const d0 = Math.floor(dayT);
  for (let k = 0; k <= 64; k++) {
    dayT = d0 + k / 8;                          /* 8 integer steps = 1 lunation */
    const m = window.__moon();
    rows.push({ l: m.phase, illum: m.illum, wax: m.waxing, word: moonWord(m.phase) });
  }
  return rows;
});
/* phase names are binned by lunation FRACTION (the convention), not by illumination,
   so a 99%-lit "waxing gibbous" is correct. What must hold: the word's waxing/waning
   sense matches the actual limb, and the two poles land on the illumination extremes. */
let bad = 0;
for (const r of sweep) {
  const w = r.word, waxSide = w.startsWith('waxing') || w === 'first quarter';
  const wanSide = w.startsWith('waning') || w === 'last quarter';
  if (waxSide && !r.wax) bad++;                 /* a "waxing" word while the limb wanes */
  else if (wanSide && r.wax) bad++;             /* a "waning" word while it waxes */
  else if (w === 'full moon' && r.illum < 0.90) bad++;
  else if (w === 'new moon' && r.illum > 0.10) bad++;
}
const names = [...new Set(sweep.map(r => r.word))];
const liveness = names.length === 8;                /* all 8 phases appear over the month */
const corr = bad === 0;
ok = ok && liveness && corr;
console.log(`\nlunation sweep (65 samples over one synodic month, playing=false)`);
console.log(`  distinct phase names: ${names.length}/8   [${names.join(', ')}]`);
console.log(`  word/illum/waxing disagreements: ${bad}   [must be 0]`);
console.log(`  verdict: ${liveness && corr ? 'CORRECT + LIVE (pass)' : 'FAIL'}`);

console.log(`\n==== ${ok ? 'PASS' : 'FAIL'} ====`);
await b.close();
process.exit(ok ? 0 : 1);
