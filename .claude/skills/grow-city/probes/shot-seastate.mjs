/* 245 — THE SEA-STATE CAMERA.
 *
 * shoot.mjs cannot pin the wind, and its clock DRIFTS while it waits (139/202), so the
 * gust would wander between the two frames it is meant to contrast. This freezes the
 * world in-page (playing=false stops BOTH clocks), pins WINDA, renders once with no
 * wait, and shoots with page.screenshot() (DOM-composited, per 200).
 *
 * The close-up is AIMED BY MEASURED INK (226): render calm, render gale, diff, and take
 * the argmax window of the difference — that is where the sea provably breaks hardest,
 * rather than a guessed clip (201) or a tile predicate that cannot know what it is
 * looking for. Both winds are then framed on the IDENTICAL hex, so the pair is blind.
 *
 * Every frame self-reports its own state, in the VIEWER'S units (202/236).
 * Files are NAMED, never lettered (239) — the agent reports per file name.
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
const OUT  = resolve(process.argv[3] || join(HERE, 'shots/sea'));
const TAG  = process.env.TAG || '';
mkdirSync(OUT, { recursive: true });

const CALM = 0.25, GALE = 1.00;   /* WINDA's true range: the lull and the full gust */
const VW = 1400, VH = 900;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: VW, height: VH } });
await page.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await page.goto('file://' + SRC + '?seed=' + SEED);
await page.waitForTimeout(400);

/* freeze once; every frame below is the same world at the same instant, wind apart */
await page.evaluate(({ seed }) => {
  playing = false; genWorld(seed); __warp(61);
  STARS.length = 0; flock = null;
  time = 100; waveT = 100; __setTime(0.30);
}, { seed: SEED });

/* ---- aim the close-up by measured ink (226) ------------------------------------ */
const aim = await page.evaluate(({ CALM, GALE, VW, VH }) => {
  const g = cvs.getContext('2d');
  const grab = w => { WINDA = w; CCACHE = {}; render(); return g.getImageData(0, 0, cvs.width, cvs.height).data; };

  /* ⚠ MASK THE SEARCH TO THE SEA FIRST. The trees, palms and flags ALSO read WINDA — and
     they move ~8x more ink than the water does — so an unmasked argmax of the calm→gale
     diff lands on the PALM BAND, i.e. squarely on this probe's own positive control. The
     first cut of this camera did exactly that and framed a park. The sea mask comes from
     234's palette suppression: loud-paint the sea's entries and the changed pixels ARE
     the water. Aim by measured ink OF THE HOST, not of the frame (226). */
  const A = grab(CALM);
  const SEA = ['water', 'waterDk', 'foam', 'glint'];
  const keep = {}; for (const n of SEA) { keep[n] = BASE[n].slice(); BASE[n] = [255, 0, 255]; }
  CCACHE = {}; const M = grab(CALM);
  for (const n of SEA) BASE[n] = keep[n]; CCACHE = {};

  const isSea = new Uint8Array(cvs.width * cvs.height);
  for (let i = 0; i < isSea.length; i++) {
    const j = i * 4;
    if (A[j] !== M[j] || A[j + 1] !== M[j + 1] || A[j + 2] !== M[j + 2]) isSea[i] = 1;
  }

  const a = grab(CALM), b = grab(GALE);
  const dpr = cvs.width / VW;
  const R = 130, step = 20;
  let best = -1, bx = 0, by = 0;
  for (let cy = R; cy < VH - R; cy += step) {
    for (let cx = R; cx < VW - R; cx += step) {
      let tot = 0;
      for (let y = cy - R; y < cy + R; y += 4) {
        for (let x = cx - R; x < cx + R; x += 4) {
          const p = ((y * dpr) | 0) * cvs.width + ((x * dpr) | 0);
          if (!isSea[p]) continue;                       /* land cannot win this argmax */
          const i = p * 4;
          tot += Math.max(Math.abs(a[i] - b[i]), Math.abs(a[i + 1] - b[i + 1]), Math.abs(a[i + 2] - b[i + 2]));
        }
      }
      if (tot > best) { best = tot; bx = cx; by = cy; }
    }
  }
  return { wx: (bx - offX) / scale, wy: (by - offY) / scale, ink: best };
}, { CALM, GALE, VW, VH });

console.log(`seed ${SEED}: close-up aimed by measured foam ink at world (${aim.wx.toFixed(1)}, ${aim.wy.toFixed(1)})`);

async function shoot(name, winda, zoom) {
  const st = await page.evaluate(({ winda, zoom, wx, wy, VW, VH }) => {
    if (zoom) { scale = zoom; offX = VW / 2 - wx * zoom; offY = VH / 2 - wy * zoom; }
    else { scale = fitScale; offX = fitX; offY = fitY; }
    WINDA = winda; CCACHE = {};
    lastSky = 0; syncSky(performance.now()); syncStats();   /* 204: a frozen clock does not refresh the DOM */
    render();
    return { winda: +WINDA.toFixed(2), sea: +seaState().toFixed(2), scale: +scale.toFixed(2) };
  }, { winda, zoom, wx: aim.wx, wy: aim.wy, VW, VH });
  const f = join(OUT, name + (TAG ? '-' + TAG : '') + '.png');
  await page.screenshot({ path: f });
  console.log(`  ${name.padEnd(14)} WINDA=${st.winda.toFixed(2)}  seaState=${st.sea.toFixed(2)}  `
            + `scale=${st.scale}  → ${f}`);
}

await shoot('city-calm', CALM, 0);
await shoot('city-gale', GALE, 0);
await shoot('sea-calm', CALM, 4.2);
await shoot('sea-gale', GALE, 4.2);

await browser.close();
