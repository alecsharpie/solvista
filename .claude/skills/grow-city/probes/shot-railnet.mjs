#!/usr/bin/env node
/* shot-railnet.mjs — iter 241's camera for cue (am).
 *
 * The complaint is about the WHOLE-FRAME read at FIT zoom ("beams criss-cross nearly the
 * whole diorama"), so this shoots the un-zoomed plate — no close-up would even show the
 * defect, which is a property of the network's EXTENT, not of any one beam.
 *
 * Freezes in-page (playing=false stops BOTH clocks), pins genWorld+__warp+__setTime,
 * forces the HUD (204: syncSky is throttled 400ms and syncStats only runs when playing,
 * so a frozen frame otherwise carries a STALE placard and an agent FAILs the camera),
 * renders once with no wait, and shoots with page.screenshot() so the DOM is composited
 * (200). Every frame self-reports its own state, so a mis-pinned frame is caught by the
 * tool instead of by a gate round (202).
 *
 * Filenames name the BUILD, never a letter (239): an A/B letter is a pointer the agent
 * must carry across four images, and pointers get swapped. A path is self-identifying.
 *
 *   SRC=/path/to/solvista.html node shot-railnet.mjs <seed> <outdir>
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = process.env.SRC || join(HERE, '../../../../solvista.html');

const seed = parseInt(process.argv[2] || '7', 10);
const outdir = resolve(process.argv[3] || join(HERE, '../shots/railnet'));
mkdirSync(outdir, { recursive: true });

const WARP = 61;
const HOURS = [['day', 0.30], ['night', 0.92]];   /* pins off the light curve (202) */

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
await page.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await page.goto(pathToFileURL(ART).href);
await page.waitForFunction(() => window.__census);

for (const [name, t] of HOURS) {
  const state = await page.evaluate(({ seed, warp, t }) => {
    playing = false;
    genWorld(seed); __warp(warp);
    STARS.length = 0; flock = null;
    time = 1234.5; waveT = 567.8;
    __setTime(t);
    lastSky = 0; syncSky(performance.now()); syncStats();   /* 204 */
    render();
    const track = monos.reduce((a, m) => a + (m.path ? m.path.length : 0), 0);
    return { t, LITAMT: +LITAMT.toFixed(3), lines: monos.length,
             spans: monos.map(m => m.path ? m.path.length : 0).join('/'), track };
  }, { seed, warp: WARP, t });
  await page.screenshot({ path: join(outdir, `${name}.png`) });
  console.log(`  ${name.padEnd(6)} t=${state.t}  LITAMT=${state.LITAMT}  monorail: ${state.lines} lines (${state.spans}) = ${state.track} cells`);
}
await browser.close();
console.log(`  -> ${outdir}`);
