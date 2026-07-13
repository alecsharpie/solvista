#!/usr/bin/env node
/* shot-sunseason.mjs — the camera for iter 253's seasonal light.
 *
 * ⚠ NOT shoot.mjs + ?year=: it loads with playing=true and then WAITS, and the frame loop
 *   advances year by ~0.167 yr/s — a whole season while the shot is being taken (139/202).
 *   Freeze in-page instead, exactly as a probe does.
 * ⚠ page.screenshot(), never the canvas: THE SKY IS THE BODY'S CSS GRADIENT (200/248), and the
 *   sky is half of what this vector changes.
 * ⚠ Force lastSky/syncSky/syncStats: a frozen clock does not refresh the DOM, so the sky and
 *   the HUD go stale and an agent correctly FAILs the camera (204).
 * ⚠ Frames are named BY FILE, never "A/B" — an A/B letter is a pointer the agent must carry
 *   across four images, and pointers get swapped (239). Each frame also self-reports its own
 *   state, so a mis-pinned frame is caught by the tool and not by a gate round (202).
 *
 *   node shot-sunseason.mjs <seed> <outdir>
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { mkdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));

const SEED = +(process.argv[2] || 42);
const OUT = process.argv[3] || join(HERE, 'shots/sun');
const BUILDS = [['patch', pathToFileURL(join(HERE, '../../../../solvista.html')).href],
                ['head',  pathToFileURL('/tmp/head253.html').href]];
/* pins off the LIGHT CURVE, never intuition (202); calendar off applySeason's own keyframes */
const FRAMES = [['winter-day', 0.02, 0.30], ['drypeak-day', 0.62, 0.30],
                ['winter-golden', 0.02, 0.68], ['drypeak-golden', 0.62, 0.68]];

mkdirSync(OUT, { recursive: true });
const b = await chromium.launch();

for (const [build, src] of BUILDS) {
  const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
  await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
  await p.goto(src); await p.waitForTimeout(400);
  for (const [name, sv, hv] of FRAMES) {
    const st = await p.evaluate(([seed, y, h]) => {
      playing = false;
      let s = 0x2F6E2B1 >>> 0;
      Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
      time = 0; waveT = 0; dayT = h;                 /* pin the clocks BEFORE genWorld (248) */
      genWorld(seed); __warp(61);
      __setYear(2035 + y); __setTime(h);
      STARS.length = 0; flock = null;
      lastSky = 0; syncSky(performance.now()); syncStats();
      render();
      /* HEAD has no seasonCool at all — that IS the defect — so report 'n/a', never a false 0:
         a caption in the wrong units looks authoritative and makes correct agents look wrong (236). */
      return { s: +((year % 1 + 1) % 1).toFixed(3), dayT: +dayT.toFixed(3),
               cool: typeof seasonCool === 'function' ? +seasonCool().toFixed(3) : 'n/a',
               GWARM: +GWARM.toFixed(3),
               LITAMT: +LITAMT.toFixed(3), tint: TINT.map(v => +v.toFixed(3)).join('/') };
    }, [SEED, sv, hv]);
    const f = join(OUT, `${build}-${name}.png`);
    await p.screenshot({ path: f });               /* whole, un-zoomed frame: the LIGHT is global */
    console.log(`${build}-${name}.png  s=${st.s} dayT=${st.dayT} seasonCool=${st.cool} ` +
                `GWARM=${st.GWARM} LITAMT=${st.LITAMT} tint=${st.tint}`);
  }
  await p.close();
}
await b.close();
console.log(`\nseed ${SEED} -> ${OUT}`);
