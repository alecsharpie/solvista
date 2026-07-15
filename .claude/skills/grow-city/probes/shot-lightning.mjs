/* iter 291 — the lightning camera. The flash is deterministic in `time`, so shoot.mjs
   (playing=true, then waits) would drift off the pulse — freeze in-page and pin the
   wettest front at its brightest flash instant, exactly as a probe does (202/204).
   Whole-city dusk frame (the flash lights the whole sky band) + a close-up aimed at the
   firing cloud's own belly (269: drive `zoom`, never `scale`). page.screenshot (200). */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = 'file://' + join(HERE, '../../../../solvista.html');
const OUT = join(HERE, '../shots/lightning');
mkdirSync(OUT, { recursive: true });
const SEEDS = [42, 7];

const br = await chromium.launch();
for (const seed of SEEDS) {
  const p = await br.newPage({ viewport: { width: 1400, height: 900 } });
  await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
  await p.goto(ART, { waitUntil: 'load' });
  await p.evaluate(s => { genWorld(s); __warp(61); }, seed);

  const info = await p.evaluate(() => {
    playing = false; dayT = 0.72;
    /* wettest front */
    let wetY = 2010, wetV = 0;
    for (let y = 1999; y < 2036; y += 0.25) { year = y;
      const w = Math.max(0, ...clouds.map(c => cloudWet(c)));
      if (w > wetV) { wetV = w; wetY = y; } }
    year = wetY; SUNT = sunWarp(dayT); { const dl = daylight(SUNT); setLight(dl); }
    /* brightest flash instant: sum the fla formula over clouds (pure, no render) */
    const fla = (cl, t) => { const w = cloudWet(cl); if (w <= LIGHTN0) return 0;
      const pulse = Math.pow(Math.max(0, Math.sin(t * 1.15 + cl.y * 4.3 + cl.x * 1.1)), 30);
      return pulse * (w - LIGHTN0) / (1 - LIGHTN0) * (0.30 + 0.62 * LITAMT); };
    let bestT = 0, bestS = 0;
    for (let t = 0; t < 44; t += 0.05) { const s = clouds.reduce((a, c) => a + fla(c, t), 0);
      if (s > bestS) { bestS = s; bestT = t; } }
    time = bestT;
    /* the firing cloud + its belly in WORLD coords */
    let hero = null, hv = 0;
    for (const cl of clouds) { const f = fla(cl, bestT); if (f > hv) { hv = f; hero = cl; } }
    const [hx, hy] = pxc(hero.x, hero.y);
    const bx = hx + (hero.y & 1 ? 7 : -7) * hero.s, by = hy - 185 - hy * 0.52 + 6 * hero.s;
    lastSky = 0; syncSky(performance.now()); syncStats();
    render();
    return { wetY: +wetY.toFixed(2), wetV: +wetV.toFixed(3), bestT: +bestT.toFixed(2), bx, by };
  });
  await p.screenshot({ path: join(OUT, `s${seed}-city.png`) });

  /* close-up: zoom ~2.4 about the firing belly, pan it to centre (269/272) */
  await p.evaluate(({ bx, by }) => {
    zoom = 2.4; scale = fitScale * zoom;
    offX = innerWidth / 2 - bx * scale; offY = innerHeight / 2 - by * scale; clampPan();
    render();
  }, info);
  await p.screenshot({ path: join(OUT, `s${seed}-close.png`) });
  console.log(`seed ${seed}: wet @${info.wetY} (maxWet ${info.wetV}) flash @t=${info.bestT}  belly=(${info.bx | 0},${info.by | 0})`);
  await p.close();
}
await br.close();
console.log('shots in', OUT);
