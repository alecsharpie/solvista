/* shot-loftstudio.mjs — the loft ROOF-STUDIO camera (iter 302, cue au).
 *
 * The vector repaints the loft's rooftop studio from col('sage') (green, identical
 * to the green-roof garden) to a glazed white penthouse with a warm gold lamp. It is
 * draw-only with ZERO rng, so the world is byte-identical to HEAD and the loft sits
 * on the identical hex — the quantitative before/after is in probe-loftstudio.mjs.
 *
 * This camera aims at the BEST-EXPOSED loft by measured ink (226/267: suppress c.loft
 * in one page, diff, take the argmax loft) and shoots it zoomed, DAY + NIGHT, plus a
 * whole-city frame, on two seeds. 258: every frame self-reports what is at its centre.
 * 264: light pins DERIVED from the curve, no `t` literal.
 *
 *   node shot-loftstudio.mjs <outdir>
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = pathToFileURL(join(HERE, '../../../../solvista.html')).href;
const OUT = process.argv[2] || join(HERE, '../shots/loftstudio');
mkdirSync(OUT, { recursive: true });

const SEEDS = [42, 7];
const br = await chromium.launch();
console.log('\nframe                       lofts  aimed hex   AT CENTRE                  LITAMT');

for (const seed of SEEDS) {
  const p = await br.newPage({ viewport: { width: 1400, height: 900 } });
  await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
  await p.goto(SRC);
  await p.evaluate(() => { window.FIT = [scale, offX, offY]; });

  const aim = await p.evaluate((seed) => {
    playing = false;
    genWorld(seed); __warp(61);
    let dayPin = 0, nightPin = 0, lo = 1e9, hi = -1e9;
    for (let t = 0; t < 1; t += 0.005) {
      __setTime(t); render();
      if (LITAMT < lo) { lo = LITAMT; dayPin = t; }
      if (LITAMT > hi) { hi = LITAMT; nightPin = t; }
    }
    __setTime(dayPin);
    const lofts = HEXI.filter(i => cells[i].t === T.IND && cells[i].loft);
    const g = () => { render();
      return cvs.getContext('2d').getImageData(0, 0, cvs.width, cvs.height).data; };
    const A = g();
    const saved = lofts.slice();
    for (const i of lofts) cells[i].loft = false;    /* 230: reveal where the studio draws */
    const B = g();
    for (const i of saved) cells[i].loft = true;
    const best = { i: lofts[0] ?? -1, ink: -1 };
    for (const i of lofts) {
      const x = i % G, y = (i / G) | 0; const [wx, wy] = ctr(x, y);
      const sx = (wx * scale + offX) * dpr, sy = (wy * scale + offY) * dpr, R = 40 * dpr;
      let ink = 0;
      for (let py = Math.max(0, sy - R * 2); py < Math.min(cvs.height, sy + R); py++)
        for (let px2 = Math.max(0, sx - R); px2 < Math.min(cvs.width, sx + R); px2++) {
          const k = ((py | 0) * cvs.width + (px2 | 0)) * 4;
          ink += Math.abs(A[k] - B[k]) + Math.abs(A[k + 1] - B[k + 1]) + Math.abs(A[k + 2] - B[k + 2]);
        }
      if (ink > best.ink) { best.ink = ink; best.i = i; }
    }
    return { lofts: lofts.length, i: best.i, dayPin, nightPin };
  }, seed);

  for (const view of ['city', 'day', 'night']) {
    const name = `s${seed}-${view}.png`;
    const st = await p.evaluate(({ seed, view, aim }) => {
      playing = false;
      genWorld(seed); __warp(61);
      __setTime(view === 'night' ? aim.nightPin : aim.dayPin);
      const x = aim.i % G, y = (aim.i / G) | 0, c = cells[aim.i];
      const [wx, wy] = ctr(x, y);
      scale = FIT[0]; offX = FIT[1]; offY = FIT[2];
      if (view !== 'city') { const z = 5.5;
        scale = z; offX = innerWidth / 2 - wx * z; offY = innerHeight / 2 - wy * z; }
      lastSky = 0; syncSky(performance.now()); syncStats();
      render();
      const at = aim.i < 0 ? 'NO LOFT(!)' : c.t !== T.IND ? 'NOT INDUSTRIAL(!)'
                 : c.loft ? 'LOFT (brick body, glazed roof studio)' : 'WAREHOUSE(!)';
      const lofts = HEXI.filter(i => cells[i].t === T.IND && cells[i].loft).length;
      return { lofts, x, y, at, LITAMT };
    }, { seed, view, aim });
    await p.screenshot({ path: join(OUT, name) });
    console.log(`${name.padEnd(26)} ${String(st.lofts).padStart(4)}   (${String(st.x).padStart(2)},${String(st.y).padStart(2)})` +
      `   ${st.at.padEnd(38)} ${st.LITAMT.toFixed(2)}`);
  }
  await p.close();
}
await br.close();
console.log(`\nframes -> ${OUT}\n`);
