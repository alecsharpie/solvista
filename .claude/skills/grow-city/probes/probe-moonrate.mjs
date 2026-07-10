#!/usr/bin/env node
/* probe-moonrate.mjs — does the moon read as a SLOW moon, or does it strobe? (iter 135)
 *
 * Iter 126 drove the moon's synodic phase off `year`, which is a fast DEVELOPMENT
 * clock (~0.17 yr/sec at speed 1), so `year*12.3685` sweeps ~2 lunations/sec and the
 * disc flickers ~2 Hz at night (iter 134's measurement, the banked defect). Every
 * gate this loop owns is FROZEN (census, standard probe, screenshots), so it is
 * blind to a strobe. This probe is TEMPORAL: it lets the clock RUN (playing=true)
 * and samples `__moon().illum` fast enough to catch a 2 Hz oscillation, then counts
 * how many times the lit fraction crosses 0.5 over the window — a full lunation
 * crosses twice.
 *
 * CONTROL: the day/dev clocks (`dayT`, `year`) MUST advance over the window. Zero
 * moon crossings only proves "slow moon" if the page is actually PLAYING; if the
 * page were frozen the moon would also read 0 crossings for the wrong reason.
 *
 *   node probe-moonrate.mjs        (run on HEAD, then again after the fix)
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(join(HERE, 'solvista.html')).href;

const SEEDS = [42, 7];
const DUR = 3000, DT = 50;   /* 3 s of real play, sampled every 50 ms (20 Hz > 2*2 Hz Nyquist) */

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });

let worst = 0;
for (const seed of SEEDS) {
  await p.goto(`${PAGE}?seed=${seed}&warp=61&t=0.90`);
  await p.waitForTimeout(400);

  const res = await p.evaluate(async ({ DUR, DT }) => {
    playing = true; speed = 1;
    const s = [];
    const t0 = performance.now();
    while (performance.now() - t0 < DUR) {
      s.push({ t: performance.now() - t0, illum: window.__moon().illum, dayT, year });
      await new Promise(r => setTimeout(r, DT));
    }
    return s;
  }, { DUR, DT });

  const illum = res.map(r => r.illum);
  let cross = 0;
  for (let i = 1; i < illum.length; i++)
    if ((illum[i - 1] - 0.5) * (illum[i] - 0.5) < 0) cross++;
  let maxStep = 0;
  for (let i = 1; i < illum.length; i++) maxStep = Math.max(maxStep, Math.abs(illum[i] - illum[i - 1]));
  const dDay = res[res.length - 1].dayT - res[0].dayT;
  const dYr = res[res.length - 1].year - res[0].year;
  const secs = (res[res.length - 1].t - res[0].t) / 1000;

  console.log(`\nseed ${seed} — ${res.length} samples over ${secs.toFixed(1)}s of real play`);
  console.log(`  illum 0.5-crossings: ${cross}   [strobe ≫0; slow moon = 0]`);
  console.log(`  max |Δillum| per ${DT}ms step: ${maxStep.toFixed(4)}   [strobe ~0.9; slow ~0.00x]`);
  console.log(`  CONTROL clock running: ΔdayT ${dDay.toFixed(3)}, Δyear ${dYr.toFixed(3)} over ${secs.toFixed(1)}s   [both must be >0]`);
  const running = dDay > 0 && dYr > 0;
  console.log(`  verdict: ${cross === 0 && running ? 'SLOW (pass)' : running ? 'STROBES (' + cross + ' crossings)' : 'CLOCK FROZEN — probe invalid'}`);
  worst = Math.max(worst, cross);
}
console.log(`\nworst crossings across seeds: ${worst}`);
await b.close();
