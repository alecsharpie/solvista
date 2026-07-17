/* iter 328 — the strike camera. 291's sheet flash lights the cloud; 328 grounds a
   forked bolt. The bolt only draws for an ON-PLATE shower (inside if(pa>0), so it never
   strikes the void, 248), and the max-fla cloud can be offshore — so scan the decades for
   a wet on-plate cloud, pin its own flash peak, and AIM the close-up by the bolt's measured
   ink centroid (226), never by a hero predicate. Whole-city dusk frame (the flash lights
   the whole sky band) + the close-up. Freezes in-page and pins the light off the curve
   (202/204/264); page.screenshot (200); drives zoom, never scale (269). */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = 'file://' + join(HERE, '../../../../solvista.html');
const OUT = join(HERE, '../shots/strike');
mkdirSync(OUT, { recursive: true });
const SEEDS = [42, 7];
const BAND = 340;

const br = await chromium.launch();
for (const seed of SEEDS) {
  const p = await br.newPage({ viewport: { width: 1400, height: 900 } });
  await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
  await p.goto(ART, { waitUntil: 'load' });
  await p.evaluate(s => { genWorld(s); __warp(61); }, seed);

  const info = await p.evaluate((BAND) => {
    playing = false; dayT = 0.72; SUNT = sunWarp(dayT); setLight(daylight(SUNT));
    const W = cvs.width, H = cvs.height;
    const grab = () => new Uint8ClampedArray(ctx.getImageData(0, 0, W, H).data);
    /* bolt ink centroid in the tall band (LIGHTN diff) */
    const measure = () => { LIGHTN = 1; render(); const A = grab();
      LIGHTN = 0; render(); const B = grab(); LIGHTN = 1;
      let n = 0, sx = 0, sy = 0;
      for (let y = BAND; y < H; y++) for (let x = 0; x < W; x++) { const i = (y * W + x) * 4;
        const d = Math.max(Math.abs(A[i] - B[i]), Math.abs(A[i + 1] - B[i + 1]), Math.abs(A[i + 2] - B[i + 2]));
        if (d > 6) { n++; sx += x; sy += y; } }
      return n ? { n, sx: sx / n, sy: sy / n } : null; };
    /* candidate wet on-plate clouds at their own flash peaks */
    const cands = [];
    for (let y = 1999; y < 2036 && cands.length < 60; y += 0.5) { year = y;
      for (const cl of clouds) { if (cloudWet(cl) <= LIGHTN0 || !inB(cl.x | 0, cl.y | 0)) continue;
        const ph = cl.y * 4.3 + cl.x * 1.1;
        const t = (Math.PI / 2 - ph) / 1.15 + Math.ceil((ph - Math.PI / 2) / (2 * Math.PI)) * (2 * Math.PI) / 1.15;
        if (t >= 0 && t < 44) cands.push([y, t]); } }
    let best = null, bY = 0, bT = 0;
    for (const [y, t] of cands) { year = y; time = t; const m = measure();
      if (m && (!best || m.n > best.n)) { best = m; bY = y; bT = t; } }
    year = bY; time = bT; lastSky = 0; syncSky(performance.now()); syncStats(); render();
    return { bY: +bY.toFixed(2), bT: +bT.toFixed(2), n: best ? best.n : 0,
             sx: best ? best.sx : W / 2, sy: best ? best.sy : H / 2 };
  }, BAND);
  await p.screenshot({ path: join(OUT, `s${seed}-city.png`) });

  /* close-up: zoom ~2.3 about the bolt's ink centroid (269/272), converting the screen
     centroid to a world point via the live camera */
  await p.evaluate(({ sx, sy }) => {
    const wx = (sx - offX) / scale, wy = (sy - offY) / scale;
    zoom = 2.3; scale = fitScale * zoom;
    offX = innerWidth / 2 - wx * scale; offY = innerHeight / 2 - wy * scale; clampPan();
    render();
  }, info);
  await p.screenshot({ path: join(OUT, `s${seed}-close.png`) });
  console.log(`seed ${seed}: strike @${info.bY} t=${info.bT}  ink ${info.n}px  centroid=(${info.sx | 0},${info.sy | 0})`);
  await p.close();
}
await br.close();
console.log('shots in', OUT);
