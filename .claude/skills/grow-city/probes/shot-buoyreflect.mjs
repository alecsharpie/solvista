/* iter 349 — the channel-buoy reflection camera. Shoots a NIGHT harbour in two variants IN ONE
   BUILD: FLASHREFL=1 (reflection ON) vs FLASHREFL=0 (OFF = exactly what HEAD draws, since the
   reflection is the only addition). A genuinely blind A/B with no build swap, no cross-build floor.
   Aims the close-up at the BRIGHTEST flashing buoy by measured reflection ink (226/272 — argmax
   over the buoys, then pan to that mark), because the buoys are sparse and a centroid lands between
   them. Frames named by FILE with meaningless, non-ordinal tokens and the on/off map CROSSED between
   seeds (238/239/268). Freezes in-page, pins light off the curve (202/204/264), page.screenshot (200),
   drives zoom not scale (269). */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = 'file://' + join(HERE, '../../../../solvista.html');
const OUT = join(HERE, '../shots/buoyreflect');
mkdirSync(OUT, { recursive: true });
/* token -> reflection on/off, crossed per seed so position can't reveal the treatment */
const MAP = { 42: { orin: 1, vael: 0 }, 7: { orin: 0, vael: 1 } };

const br = await chromium.launch();
for (const seed of [42, 7]) {
  const p = await br.newPage({ viewport: { width: 1400, height: 900 } });
  await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
  await p.goto(ART, { waitUntil: 'load' });
  await p.evaluate(s => { genWorld(s); __warp(61); }, seed);

  const info = await p.evaluate(() => {
    playing = false; dayT = 0.92; SUNT = sunWarp(dayT); setLight(daylight(SUNT));
    const W = cvs.width, H = cvs.height;
    const grab = () => new Uint8ClampedArray(ctx.getImageData(0, 0, W, H).data);
    const reflPeak = () => { FLASHGLOW = 1; FLASHREFL = 1; render(); const A = grab();
      FLASHREFL = 0; render(); const B = grab(); FLASHREFL = 1;
      let n = 0, peak = 0, px = W / 2, py = H / 2;
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = (y * W + x) * 4;
        const d = Math.max(Math.abs(A[i] - B[i]), Math.abs(A[i + 1] - B[i + 1]), Math.abs(A[i + 2] - B[i + 2]));
        if (d > 6) { n++; if (d > peak) { peak = d; px = x; py = y; } } }
      return { n, peak, px, py }; };
    let best = { n: 0, peak: 0, px: W / 2, py: H / 2 }, bestT = 0;
    for (let t = 0; t < 9; t += 0.29) { time = t; const m = reflPeak();
      if (m.peak > best.peak) { best = m; bestT = t; } }
    time = bestT;
    return { bestT: +bestT.toFixed(2), lit: +LITAMT.toFixed(2), n: best.n, peak: best.peak, sx: best.px, sy: best.py };
  });

  for (const [tok, on] of Object.entries(MAP[seed])) {
    await p.evaluate(({ on }) => {
      FLASHREFL = on; zoom = 1; scale = fitScale; offX = fitX; offY = fitY;
      lastSky = 0; syncSky(performance.now()); syncStats(); render();
    }, { on });
    await p.screenshot({ path: join(OUT, `s${seed}-${tok}-city.png`) });
    await p.evaluate(({ sx, sy, on }) => {
      FLASHREFL = on;
      const wx = (sx - offX) / scale, wy = (sy - offY) / scale;
      zoom = 5.5; scale = fitScale * zoom;
      offX = innerWidth / 2 - wx * scale; offY = innerHeight / 2 - wy * scale; clampPan();
      render();
    }, { ...info, on });
    await p.screenshot({ path: join(OUT, `s${seed}-${tok}-close.png`) });
  }
  console.log(`seed ${seed}: flash t=${info.bestT} LITAMT=${info.lit}  brightest refl px=(${info.sx | 0},${info.sy | 0}) peak ${info.peak}  (${info.n} px)`);
  await p.close();
}
await br.close();
console.log('shots in', OUT);
