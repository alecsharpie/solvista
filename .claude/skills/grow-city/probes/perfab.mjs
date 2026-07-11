#!/usr/bin/env node
/* interleaved A/B frame-time: pristine HEAD vs the patched working file.
 * Headless timing on this box swings +-30% with load, so a stored baseline cannot
 * answer "did MY change cost anything". Run A/B/A/B and take the MIN per variant —
 * both variants then eat the same machine load. (grow-city SKILL.md, perf section.) */
import { homedir, tmpdir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdtempSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
/* resolve the artifact RELATIVE TO THIS FILE, never an absolute path — two earlier
 * probes hardcoded ../solvista-grow/... and silently measured the worktree */
const CAND = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html')];
const ART = CAND.find(f => existsSync(f));
const REPO = dirname(ART);

const tmp = mkdtempSync(join(tmpdir(), 'perfab-'));
const HEAD = join(tmp, 'head.html'), PATCH = join(tmp, 'patch.html');
writeFileSync(HEAD, execFileSync('git', ['-C', REPO, 'show', 'HEAD:solvista.html']));
copyFileSync(ART, PATCH);

const WARMUP = 60, SAMPLE = 300, ROUNDS = 3;
const scenes = [['day', 't=0.35'], ['night', 't=0.8']];

async function measure(page, file, q) {
  await page.goto(pathToFileURL(file).href + `?seed=42&warp=61&${q}`, { waitUntil: 'load' });
  await page.waitForFunction('window.__census');
  return page.evaluate(([warmup, sample]) => new Promise(res => {
    const d = []; let last = 0, n = 0;
    function loop(now) {
      if (n >= warmup && last) d.push(now - last);
      last = now;
      if (++n < warmup + sample) requestAnimationFrame(loop);
      else { d.sort((a, b) => a - b); res(d.reduce((s, v) => s + v, 0) / d.length); }
    }
    requestAnimationFrame(loop);
  }), [WARMUP, SAMPLE]);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
for (const [name, q] of scenes) {
  const A = [], B = [];
  for (let r = 0; r < ROUNDS; r++) {            /* interleave A/B/A/B/A/B */
    A.push(await measure(page, HEAD, q));
    B.push(await measure(page, PATCH, q));
  }
  const a = Math.min(...A), b = Math.min(...B);
  const pct = (b - a) / a * 100;
  console.log(`${name.padEnd(6)} pristine ${a.toFixed(2)}ms  patched ${b.toFixed(2)}ms  ->  ${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`);
}
await browser.close();
