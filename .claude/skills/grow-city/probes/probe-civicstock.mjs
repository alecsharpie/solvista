/* probe-civic — does the parliament actually stand, and is it the tallest civic roof?
   Pure world data: no render, no clock, no noise floor, nothing to stub.
   CIVICDESC[parliament] claims "the tallest civic roof in Solvista" — a comparative,
   falsifiable claim about the pixels. The rule gives it c.th=34 while every other
   milestone civic gets 20+c.v*14 (i.e. up to 34). Measure the claim. */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
import { existsSync } from 'node:fs';
const HERE = dirname(fileURLToPath(import.meta.url));
/* resolve the artifact relative to THIS FILE, never an absolute path */
const A1 = join(HERE, '../../../../solvista.html'), A2 = join(HERE, 'solvista.html');
const ART = existsSync(A1) ? A1 : A2;

const SEEDS = [7, 42, 1234, 99, 2024, 555];
const b = await chromium.launch();
const p = await b.newPage();
await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await p.goto('file://' + ART);
await p.waitForFunction(() => window.__census !== undefined);

const rows = await p.evaluate((seeds) => {
  const out = [];
  for (const seed of seeds) {
    for (const era of [2005, 2035]) {
      genWorld(seed); __warp(era - 1974);
      const civ = [];
      for (let i = 0; i < G * G; i++) {
        const c = cells[i];
        if (c.t === T.CIVIC) civ.push({ kind: c.kind, th: +c.th.toFixed(1), h: +c.h.toFixed(1) });
      }
      out.push({ seed, era, pop: stats.pop, civ });
    }
  }
  return out;
}, SEEDS);

await b.close();

console.log('=== A. CIVIC POPULATION (does every kind actually stand?) ===');
const KINDS = ['hall','school','library','police','firehouse','museum','hospital',
               'observatory','parliament','university','aquarium','amphitheater'];
for (const era of [2005, 2035]) {
  console.log(`\n-- era ${era} --`);
  console.log('kind         ' + SEEDS.map(s => String(s).padStart(6)).join('') + '   seeds-present');
  for (const k of KINDS) {
    const counts = SEEDS.map(s => {
      const r = rows.find(r => r.seed === s && r.era === era);
      return r.civ.filter(c => c.kind === k).length;
    });
    const present = counts.filter(n => n > 0).length;
    const flag = present === 0 ? '   <== NEVER STANDS' : (present < SEEDS.length ? '   <== MISSING on some seeds' : '');
    console.log(k.padEnd(13) + counts.map(n => String(n).padStart(6)).join('') + `   ${present}/${SEEDS.length}${flag}`);
  }
}

console.log('\n\n=== B. THE CLAIM: "the tallest civic roof in Solvista" (era 2035) ===');
console.log('c.h is the DRAWN height (c.th is its target). Rank parliament among all civic roofs.\n');
console.log('seed    parl.h   best-rival (kind)      margin   RANK   claim');
let trueN = 0, tieN = 0;
const margins = [];
for (const s of SEEDS) {
  const r = rows.find(r => r.seed === s && r.era === 2035);
  const parl = r.civ.find(c => c.kind === 'parliament');
  if (!parl) { console.log(`${String(s).padEnd(8)}  --- NO PARLIAMENT ---`); continue; }
  const rivals = r.civ.filter(c => c.kind !== 'parliament').sort((a, b) => b.h - a.h);
  const best = rivals[0];
  const margin = parl.h - best.h;
  const rank = 1 + r.civ.filter(c => c.h > parl.h).length;
  margins.push(margin);
  const pct = (margin / parl.h * 100);
  const verdict = rank === 1 ? (pct < 10 ? 'TRUE but a TIE (<10%)' : 'TRUE, visibly') : 'FALSE';
  if (rank === 1) trueN++;
  if (rank === 1 && pct < 10) tieN++;
  console.log(`${String(s).padEnd(8)}${parl.h.toFixed(1).padStart(6)}   ${best.h.toFixed(1).padStart(5)} (${best.kind.padEnd(12)})  ${margin.toFixed(1).padStart(6)}  (${pct.toFixed(1).padStart(4)}%)   #${rank}    ${verdict}`);
}
const mm = margins.reduce((a, b) => a + b, 0) / (margins.length || 1);
console.log(`\nparliament is the tallest civic roof on ${trueN}/${SEEDS.length} seeds`);
console.log(`...but by a mean margin of only ${mm.toFixed(1)} height units (${tieN}/${SEEDS.length} seeds are a VISUAL TIE under 10%)`);

console.log('\n\n=== C. THE ROOF DISTRIBUTION (era 2035, all seeds pooled) ===');
const all = [];
for (const s of SEEDS) { const r = rows.find(r => r.seed === s && r.era === 2035); all.push(...r.civ); }
const byKind = {};
for (const c of all) (byKind[c.kind] ||= []).push(c.h);
console.log('kind             n    min     mean     max');
for (const k of KINDS) {
  const v = byKind[k]; if (!v) continue;
  const mean = v.reduce((a, b) => a + b, 0) / v.length;
  console.log(k.padEnd(15) + String(v.length).padStart(3) +
    Math.min(...v).toFixed(1).padStart(7) + mean.toFixed(1).padStart(9) + Math.max(...v).toFixed(1).padStart(8));
}
