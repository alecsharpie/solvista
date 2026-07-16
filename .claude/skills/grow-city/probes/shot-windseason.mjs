/* iter 311 — THE SEASONAL-SEA CAMERA (Water & coast × Deepen/interconnect).
 *
 * A DISCRIMINATING PAIR (264): winter vs summer at ONE wall-clock instant — same
 * gust phase, same tide, same light — so the ONLY variable is the season, which
 * this lap feeds into WINDA. Winter runs rough, summer glassy.
 *
 * The gust phase is pinned at the base cycle's PEAK (found in-page), because at a
 * lull both seasons are calm and there is nothing to discriminate.
 *
 * The close-up is AIMED BY MEASURED INK (226), diffing the two seasons and taking
 * the argmax window — MASKED TO THE SEA first (shot-seastate's law: the trees,
 * palms and flags read WINDA too and move ~8x the ink, so an unmasked argmax lands
 * on the palm band). Both seasons are framed on the IDENTICAL hex, so the pair is
 * blind.
 *
 * Files carry NEUTRAL, NON-ORDINAL tokens and the winter/summer map is CROSSED
 * between seeds (238/239/268), so "the second one is always winter" fails. Every
 * frame self-reports its state in the VIEWER'S units (202/236).
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));

const SRC  = resolve(process.env.SRC || join(HERE, '../../../../solvista.html'));
const SEED = Number(process.argv[2] || 42);
const OUT  = resolve(process.argv[3] || join(HERE, 'shots/windseason'));
mkdirSync(OUT, { recursive: true });

const WINTER = 0.12, SUMMER = 0.62;   /* wet trough / dry peak of seasonCool() */
const VW = 1400, VH = 900;
/* cross the token->season map between seeds so the read is blind */
const MAP = SEED % 2 === 0 ? { kappa: WINTER, sigma: SUMMER } : { kappa: SUMMER, sigma: WINTER };

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: VW, height: VH } });
await page.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await page.goto('file://' + SRC + '?seed=' + SEED);
await page.waitForTimeout(400);

/* freeze; find the gust PEAK so the two seasons differ maximally */
const T = await page.evaluate(() => {
  playing = false; genWorld(seedNum); __warp(61);
  STARS.length = 0; flock = null;
  waveT = 100;
  let best = -1, bt = 0;
  for (let t = 0; t < 100; t += 0.25) {
    const g = Math.max(0, Math.sin(t * 0.13 + (seedNum % 89) * 0.5)) * (0.72 + 0.28 * Math.sin(t * 0.57));
    if (g > best) { best = g; bt = t; }
  }
  time = bt;
  return bt;
});

/* aim by measured ink of the SEA, diffing the two seasons at the pinned instant */
const aim = await page.evaluate(({ WINTER, SUMMER, VW, VH }) => {
  const g = cvs.getContext('2d');
  const grab = (season) => { year = Math.floor(year) + season; advanceEntities(0, 1); __setTime(0.30); CCACHE = {}; render(); return g.getImageData(0, 0, cvs.width, cvs.height).data; };

  const A = grab(SUMMER);
  const SEA = ['water', 'waterDk', 'foam', 'glint'];
  const keep = {}; for (const n of SEA) { keep[n] = BASE[n].slice(); BASE[n] = [255, 0, 255]; }
  CCACHE = {}; const M = (() => { advanceEntities(0, 1); render(); return g.getImageData(0, 0, cvs.width, cvs.height).data; })();
  for (const n of SEA) BASE[n] = keep[n]; CCACHE = {};

  const isSea = new Uint8Array(cvs.width * cvs.height);
  for (let i = 0; i < isSea.length; i++) { const j = i * 4; if (A[j] !== M[j] || A[j + 1] !== M[j + 1] || A[j + 2] !== M[j + 2]) isSea[i] = 1; }

  const a = grab(SUMMER), b = grab(WINTER);
  const dpr = cvs.width / VW, R = 130, step = 20;
  let best = -1, bx = 0, by = 0;
  for (let cy = R; cy < VH - R; cy += step) for (let cx = R; cx < VW - R; cx += step) {
    let tot = 0;
    for (let y = cy - R; y < cy + R; y += 4) for (let x = cx - R; x < cx + R; x += 4) {
      const p = ((y * dpr) | 0) * cvs.width + ((x * dpr) | 0);
      if (!isSea[p]) continue;
      const i = p * 4;
      tot += Math.max(Math.abs(a[i] - b[i]), Math.abs(a[i + 1] - b[i + 1]), Math.abs(a[i + 2] - b[i + 2]));
    }
    if (tot > best) { best = tot; bx = cx; by = cy; }
  }
  return { wx: (bx - offX) / scale, wy: (by - offY) / scale, ink: best };
}, { WINTER, SUMMER, VW, VH });

console.log(`seed ${SEED}: gust peak t=${T.toFixed(2)}; close-up aimed by measured sea ink at world (${aim.wx.toFixed(1)}, ${aim.wy.toFixed(1)}), ink=${aim.ink}`);

async function shoot(name, season, zoom) {
  const st = await page.evaluate(({ season, zoom, wx, wy, VW, VH }) => {
    if (zoom) { scale = zoom; offX = VW / 2 - wx * zoom; offY = VH / 2 - wy * zoom; }
    else { scale = fitScale; offX = fitX; offY = fitY; }
    year = Math.floor(year) + season; advanceEntities(0, 1); __setTime(0.30);
    CCACHE = {}; lastSky = 0; syncSky(performance.now()); syncStats(); render();
    return { winda: +WINDA.toFixed(3), sea: +seaState().toFixed(3), scale: +scale.toFixed(2) };
  }, { season, zoom, wx: aim.wx, wy: aim.wy, VW, VH });
  const f = join(OUT, name + '.png');
  await page.screenshot({ path: f });
  console.log(`  ${name.padEnd(12)} WINDA=${st.winda}  seaState=${st.sea}  scale=${st.scale}  → ${f}`);
}

for (const [tok, season] of Object.entries(MAP)) {
  await shoot('city-' + tok, season, 0);
  await shoot('sea-' + tok, season, 4.2);
}

await browser.close();
