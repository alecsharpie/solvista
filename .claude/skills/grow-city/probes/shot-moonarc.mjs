/* iter 298 camera — THE MOON TRAVERSES. A DISCRIMINATING SET, not a motion claim (134):
   three night pins where the moon stands at three provably different places, so a still
   frame carries the arc. Freezes in-page (playing=false stops both clocks), pins dayT with
   __setTime, renders once, forces the DOM sync (204: syncSky self-throttles, syncStats only
   runs while playing), and shoots with page.screenshot (200: the .placard is DOM). */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
/* resolve the artifact RELATIVE TO THIS FILE, never an absolute path (works from probes/) */
const ART = 'file://' + join(HERE, '../../../../solvista.html');
const OUT = join(HERE, '../shots/moonarc');
const { mkdirSync } = await import('node:fs');
mkdirSync(OUT, { recursive: true });

const PINS = [['dusk', 0.76], ['midnight', 0.90], ['predawn', 0.04]];
const SEEDS = [42, 7];

const br = await chromium.launch();
for (const seed of SEEDS) {
  const p = await br.newPage({ viewport: { width: 1400, height: 900 } });
  await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
  await p.goto(ART, { waitUntil: 'load' });
  await p.evaluate(s => { genWorld(s); __warp(61); }, seed);
  for (const [name, t] of PINS) {
    const info = await p.evaluate((t) => {
      playing = false; time = 5; waveT = 5;
      __setTime(t); render();
      lastSky = 0; syncSky(performance.now()); syncStats();
      const mp = moonPos();
      return { mx: +mp.mx.toFixed(0), my: +mp.my.toFixed(0), lit: +LITAMT.toFixed(2) };
    }, t);
    const png = join(OUT, `s${seed}-${name}.png`);
    await p.screenshot({ path: png });
    console.log(`s${seed} ${name.padEnd(9)} dayT=${t}  moon@(${info.mx},${info.my})  LITAMT=${info.lit}  → ${png}`);
  }
  await p.close();
}
await br.close();
