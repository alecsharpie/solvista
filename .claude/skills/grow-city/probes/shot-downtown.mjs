#!/usr/bin/env node
/* shot-downtown.mjs — whole-city frame + the CBD's TRUE screen position (ground truth).
 * 108's law: ask an agent to LOCATE, not to judge. This shoots the frame an agent will
 * read, and prints where downtown ACTUALLY is, so a blind "point at the skyline" answer
 * is checkable. Freezes the world in-page (204: force syncSky/syncStats too).
 *   node shot-downtown.mjs <seed> <outdir>
 */
import { homedir } from 'node:os';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(process.env.SRC || join(HERE, '../../../../solvista.html')).href;

const seed = process.argv[2] || '42';
const outdir = process.argv[3] || '/tmp/dt';
mkdirSync(outdir, { recursive: true });

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2 });
await p.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});

for (const [tag, t] of [['day', 0.30], ['night', 0.92]]) {
  await p.goto(`${PAGE}?seed=${seed}&warp=61&t=${t}`);
  await p.waitForTimeout(400);
  const gt = await p.evaluate(({ t, seed }) => {
    playing = false;                    /* stops both clocks */
    genWorld(+seed); __warp(61);
    __setTime(t); __setYear(2035.62);
    lastSky = 0; syncSky(performance.now()); syncStats();   /* 204: frozen clock does not refresh the DOM */
    render();
    const [wx, wy] = ctr(CBDX, CBDY);   /* world -> screen, via the artifact's own transform */
    const sx = wx * scale + offX, sy = wy * scale + offY;
    return {
      cbd: [CBDX, CBDY],
      fx: +(sx / innerWidth).toFixed(3), fy: +(sy / innerHeight).toFixed(3),
      towers: stats.towers, pop: stats.pop,
    };
  }, { t, seed });
  await p.screenshot({ path: join(outdir, `${tag}.png`) });
  console.log(`seed ${seed} ${tag}: CBD hex ${gt.cbd} -> screen frac x=${gt.fx} y=${gt.fy}  (towers ${gt.towers}, pop ${gt.pop})`);
}
await b.close();
