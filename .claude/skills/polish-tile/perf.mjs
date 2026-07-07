#!/usr/bin/env node
/* polish-tile perf gate.
 *
 * Loads solvista.html on a FIXED busy scene (seed 42, year 2035) at day and
 * night, samples requestAnimationFrame deltas, and reports mean / p95 frame
 * time plus the share of frames over the 60fps and 30fps budgets. Diffs the
 * mean against a saved baseline so "did my prettier tile cost frame time?" is
 * a measured question.
 *
 *   node perf.mjs                 # measure + diff vs perf-baseline.json
 *   node perf.mjs --save-baseline # pin the current timings as the baseline
 *
 * Exit non-zero on page errors or a mean-frame-time regression beyond TOL in
 * either scene. Headless timing is noisy (and vsync can floor fast frames at
 * ~16.7ms) — re-run once before believing a borderline regression, and treat
 * the static perf rules in SKILL.md as binding regardless of this number.
 */
import { homedir } from 'node:os';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

/* borrow Playwright from the screenshot-verify skill (its browser is installed) */
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(HERE, '../../..');
const PAGE = pathToFileURL(join(REPO, 'solvista.html')).href;
const baseFile = join(HERE, 'perf-baseline.json');
const curFile  = join(HERE, 'perf-latest.json');
const save = process.argv.includes('--save-baseline');

const SCENES = [
  { name: 'day',   url: `${PAGE}?seed=42&warp=61&t=0.35` },
  { name: 'night', url: `${PAGE}?seed=42&warp=61&t=0.8`  },
];
const WARMUP = 60, SAMPLE = 300;   // frames
const TOL = 0.15;                  // >15% mean regression vs baseline = FAIL

async function measure(page) {
  return page.evaluate(([warmup, sample]) => new Promise(res => {
    const deltas = []; let last = 0, n = 0;
    function loop(now) {
      if (n >= warmup && last) deltas.push(now - last);
      last = now;
      if (++n < warmup + sample) requestAnimationFrame(loop);
      else {
        deltas.sort((a, b) => a - b);
        const mean = deltas.reduce((s, d) => s + d, 0) / deltas.length;
        res({
          mean: +mean.toFixed(2),
          p95:  +deltas[Math.floor(deltas.length * 0.95)].toFixed(2),
          over60: +(deltas.filter(d => d > 17.5).length / deltas.length).toFixed(3),
          over30: +(deltas.filter(d => d > 34).length  / deltas.length).toFixed(3),
        });
      }
    }
    requestAnimationFrame(loop);
  }), [WARMUP, SAMPLE]);
}

async function run() {
  const b = await chromium.launch();
  const scenes = {}; let pageerrors = 0;
  for (const s of SCENES) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
    p.on('pageerror', e => { pageerrors++; console.error('PAGEERROR', s.name, String(e)); });
    await p.goto(s.url);
    await p.waitForTimeout(800);            // settle: fonts, first paints
    scenes[s.name] = await measure(p);
    await p.close();
  }
  await b.close();
  return { when: new Date().toISOString(), pageerrors, scenes };
}

const cur = await run();
writeFileSync(curFile, JSON.stringify(cur, null, 1));

const show = (tag, d) => console.log(
  `  ${tag.padEnd(6)} mean ${String(d.mean).padStart(6)}ms   p95 ${String(d.p95).padStart(6)}ms   >60fps-budget ${(d.over60 * 100).toFixed(1)}%   >30fps-budget ${(d.over30 * 100).toFixed(1)}%`);

console.log('=== frame timing (seed 42, 2035) ===');
for (const s in cur.scenes) show(s, cur.scenes[s]);
console.log('pageerrors:', cur.pageerrors);

if (save) {
  writeFileSync(baseFile, JSON.stringify(cur, null, 1));
  console.log('baseline saved ->', baseFile);
  process.exit(cur.pageerrors ? 1 : 0);
}
if (!existsSync(baseFile)) {
  console.log('no baseline yet — run `node perf.mjs --save-baseline` first.');
  process.exit(cur.pageerrors ? 1 : 0);
}

const base = JSON.parse(readFileSync(baseFile, 'utf8'));
let regressions = 0;
console.log(`\nvs baseline (${base.when}):`);
for (const s in cur.scenes) {
  const b = base.scenes[s], c = cur.scenes[s];
  if (!b) continue;
  const pct = b.mean ? (c.mean - b.mean) / b.mean : 0;
  const flag = pct > TOL ? '  <== REGRESSION' : Math.abs(pct) <= 0.05 ? '  ~flat' : pct > 0 ? '  up' : '  down';
  if (pct > TOL) regressions++;
  console.log(`  ${s.padEnd(6)} mean ${b.mean}ms -> ${c.mean}ms  (${(pct * 100).toFixed(1)}%)${flag}`);
}
const verdict = cur.pageerrors ? 'FAIL — page errors'
             : regressions    ? `FAIL — mean frame time regressed >${TOL * 100}%`
             : 'PASS';
console.log(`\nVERDICT: ${verdict}. (Headless timing is noisy — re-run once before believing a borderline number.)`);
process.exit((regressions || cur.pageerrors) ? 1 : 0);
