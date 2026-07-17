/* iter 331 — the jet camera. The plane is Math.random drift-in, so it is placed
   deterministically (mid-frame, high) and the world frozen, then shot with
   page.screenshot (DOM composited, 200). A fair midday whole-city frame + a close-up
   aimed at the placed jet, and a night frame to confirm it correctly VANISHES. */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = 'file://' + join(HERE, '../../../../solvista.html');
const seed = Number(process.argv[2] || 42);
const OUT = process.argv[3] || join(HERE, 'shots/jet');
import { mkdirSync } from 'node:fs';
mkdirSync(OUT, { recursive: true });

const br = await chromium.launch();
const p = await br.newPage({ viewport: { width: 1400, height: 900 } });
await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await p.goto(ART, { waitUntil: 'load' });
await p.evaluate(s => { genWorld(s); __warp(61); }, seed);

const setup = await p.evaluate(() => {
  playing = false; time = 104; waveT = 40;
  rainFront = () => 0;   /* force FAIR weather: the jet is fair-weather only, and a clear sky
                            shows it cleanly (the loaded moment may be rainy — a rainy shot
                            correctly hides the jet and confused the first visual read, 200/204) */
  plane = { p: 0.5, y: 0.11, dir: 1, sp: 0, sl: 0.2 };
  const pin = t => { dayT = t; SUNT = sunWarp(dayT); setLight(daylight(SUNT)); lastSky = 0; syncSky(performance.now()); syncStats(); render(); render(); };
  pin(0.30);
  /* AIM BY MEASURED INK (226/272), NOT by pxc(plane) — pxc is pre-transform, so the
     computed nose is nowhere near where the jet actually draws. Diff plane-on vs -null. */
  const W = cvs.width, H = cvs.height, grab = () => new Uint8ClampedArray(ctx.getImageData(0, 0, W, H).data);
  render(); const A = grab(); const keep = plane; plane = null; render(); const B = grab(); plane = keep; render();
  let x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1, cx = 0, cy = 0, n = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = (y * W + x) * 4;
    const d = Math.max(Math.abs(A[i] - B[i]), Math.abs(A[i + 1] - B[i + 1]), Math.abs(A[i + 2] - B[i + 2]));
    if (d > 6) { n++; cx += x; cy += y; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; } }
  return { cx: (cx / n) | 0, cy: (cy / n) | 0, bbox: [x0, y0, x1, y1] };
});
/* crop to the ink bbox, padded, so the whole contrail fills the close-up */
const [bx0, by0, bx1, by1] = setup.bbox, pad = 40;
const clip = { x: Math.max(0, bx0 - pad), y: Math.max(0, by0 - pad),
  width: Math.min(1400, bx1 + pad) - Math.max(0, bx0 - pad), height: Math.min(900, by1 + pad) - Math.max(0, by0 - pad) };
await p.screenshot({ path: join(OUT, 'day-city.png') });
await p.screenshot({ path: join(OUT, 'day-jet.png'), clip });

await p.evaluate(() => { const pin = t => { dayT = t; SUNT = sunWarp(dayT); setLight(daylight(SUNT)); lastSky = 0; syncSky(performance.now()); syncStats(); render(); render(); }; pin(0.68); });
await p.screenshot({ path: join(OUT, 'golden-jet.png'),
  clip });

await p.evaluate(() => { const pin = t => { dayT = t; SUNT = sunWarp(dayT); setLight(daylight(SUNT)); lastSky = 0; syncSky(performance.now()); syncStats(); render(); render(); }; pin(0.93); });
await p.screenshot({ path: join(OUT, 'night-city.png') });

await br.close();
console.log('shot jet seed', seed, '->', OUT, 'ink centroid@', setup.cx, setup.cy, 'bbox', setup.bbox);
