/* THE BOULEVARD CAMERA (iter 283).
 *
 * The vector moves the tree canopy off the backstreets and onto the TRUNK, so it
 * REMOVES ~940 street trees city-wide. Two things therefore need looking at, and the
 * un-zoomed one is the one that matters:
 *   (1) the WHOLE PLATE -- has the city been denuded? (the kelp lesson: a feature
 *       checked only in close-up lined the whole coast dark for 13 iterations)
 *   (2) a CLOSE-UP of the allee -- does the boulevard read as a grand tree-lined avenue?
 *
 * AIMED BY MEASURED INK (226/272), not by a tile predicate. The canopy is isolated by
 * 230's suppress-the-DECISION, in ONE page, at a floor of exactly 0: clear c.treed and
 * re-render, and the changed pixels ARE the allee. The one trap is that drawCell's
 * street-tree fallback is gated `if(!c.treed && (x*3+y)%4===0)`, so clearing the flag
 * DRAWS A TREE BACK on a quarter of the hexes and contaminates the mask -- so the
 * suppression is restricted to the 75% of cells where it has no side effect at all.
 * Ink then chooses WHICH allee (so it is provably visible, un-occluded); the winning
 * cell's own ctr() supplies WHERE (so we provably land on it) -- 272's law.
 *
 * AIM=wx,wy forces the identical world point onto the other build, so the pair is blind.
 * Frames are named by FILE with MEANINGLESS tokens and the map is CROSSED between seeds
 * (238/239/268). Every frame SELF-REPORTS its own state (202/236).
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = process.env.SRC || join(HERE, '../../../../solvista.html');
const SEED = +(process.argv[2] || 42);
const OUT = process.argv[3] || '.claude/skills/grow-city/shots/blvd';
const TAG = process.env.TAG || 'x';
const AIM = process.env.AIM ? process.env.AIM.split(',').map(Number) : null;

const b = await chromium.launch();
const page = await b.newPage({ viewport: { width: 1400, height: 900 } });
await page.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });

/* ---- freeze the world, derive the light pin from the curve (264), find the allee ---- */
await page.goto(pathToFileURL(ART).href);
await page.waitForTimeout(400);

const info = await page.evaluate(({ seed, aim }) => {
  playing = false;                       /* stops BOTH clocks */
  genWorld(seed); __warp(61);
  __setYear(2035.62);                    /* the golden dry peak; pinned AFTER the warp */
  /* a DAY pin, derived not typed: the hour the artifact's own light curve calls brightest */
  let dayT_ = 0.30, lo = 1e9;
  for (let t = 0.20; t <= 0.55; t += 0.01) { const l = daylight(sunWarp(t)).lit; if (l < lo) { lo = l; dayT_ = t; } }
  __setTime(dayT_);
  STARS.length = 0; flock = null; time = 0; waveT = 0;
  if (typeof __setWind === 'function') __setWind(0.5);
  for (const c of cells) if (c.h < c.th) c.h = c.th;      /* render() MUTATES c.h (272) */
  lastSky = 0; syncSky(performance.now()); syncStats();

  const W = cvs.width, H = cvs.height, g = cvs.getContext('2d');
  const grab = () => { render(); return g.getImageData(0, 0, W, H).data; };

  const A = grab();
  /* suppress the allee ONLY where clearing the flag draws nothing back (see header) */
  const hit = [];
  for (let i = 0; i < G * G; i++) {
    const c = cells[i], x = i % G, y = (i / G) | 0;
    if (c.t === T.ROAD && c.treed && ((x * 3 + y) % 4) !== 0) { hit.push(i); c.treed = false; }
  }
  const B = grab();
  for (const i of hit) cells[i].treed = true;
  render();

  /* the canopy's own ink map, at FULL resolution -- the mark is sparse (272) */
  const ink = new Float32Array(W * H);
  let total = 0;
  for (let p = 0; p < W * H; p++) {
    const d = Math.max(Math.abs(A[p * 4] - B[p * 4]), Math.abs(A[p * 4 + 1] - B[p * 4 + 1]),
                       Math.abs(A[p * 4 + 2] - B[p * 4 + 2]));
    if (d > 8) { ink[p] = d; total += d; }
  }
  /* zero the ink hiding behind the HUD -- the user cannot see it (200) */
  let hudZ = 0;
  for (const sel of ['.placard', '.census', '.controls']) {
    const el = document.querySelector(sel); if (!el) continue;
    const r = el.getBoundingClientRect();
    for (let yy = Math.max(0, r.top * dpr | 0); yy < Math.min(H, r.bottom * dpr); yy++)
      for (let xx = Math.max(0, r.left * dpr | 0); xx < Math.min(W, r.right * dpr); xx++)
        { if (ink[yy * W + xx]) hudZ++; ink[yy * W + xx] = 0; }
  }

  /* score each TREED CELL by the ink in its OWN neighbourhood, then pan to that cell's
     ctr() -- an ink WINDOW's centre need not sit on any boulevard (272's law) */
  let bx = 0, by = 0, bs = -1, treed = 0;
  for (let i = 0; i < G * G; i++) {
    const c = cells[i]; if (c.t !== T.ROAD || !c.treed) continue;
    treed++;
    const x = i % G, y = (i / G) | 0, [wx, wy] = ctr(x, y);
    const sx = (wx * scale + offX) * dpr | 0, sy = (wy * scale + offY) * dpr | 0;
    let s = 0;
    const R = 70;
    for (let yy = Math.max(0, sy - R); yy < Math.min(H, sy + R); yy++)
      for (let xx = Math.max(0, sx - R); xx < Math.min(W, sx + R); xx++) s += ink[yy * W + xx];
    if (s > bs) { bs = s; bx = x; by = y; }
  }
  if (aim) { bx = aim[0]; by = aim[1]; }

  /* the run this cell belongs to, in the units the tooltip prints */
  const runLen = (typeof boulevardSize === 'function') ? boulevardSize(bx, by) : 0;
  const cc = cells[idx(bx, by)];
  return { bx, by, runLen, treed, totalInk: total, hudZ, dayT: dayT_,
           flow: cc ? (cc.flow | 0) : 0, art: cc ? cc.flow >= ARTFLOW : false,
           LITAMT: +LITAMT.toFixed(2), phase: phaseWord(dayT_),
           hud: document.getElementById('stPhase').textContent };
}, { seed: SEED, aim: AIM });

console.log(`  seed ${SEED}  build=${ART.includes('head') ? 'HEAD' : 'patch'}  tag=${TAG}`);
console.log(`  canopy: ${info.treed} treed hexes · total ink ${info.totalInk | 0} · ${info.hudZ} px zeroed behind the HUD`);
console.log(`  AIM -> hex (${info.bx},${info.by})  run=${info.runLen} blocks  flow=${info.flow} ` +
            `(${info.art ? 'TRUNK ROUTE' : 'not a trunk'})  t=${info.dayT.toFixed(2)} phase=${info.phase} ` +
            `HUD=${info.hud === info.phase ? 'ok' : 'STALE:' + info.hud}`);

/* ---- 1. the WHOLE PLATE, un-zoomed: has the city been denuded? ---- */
await page.screenshot({ path: join(OUT, `s${SEED}-city-${TAG}.png`) });

/* ---- 2. the close-up, panned to the winning allee ---- */
await page.evaluate(({ bx, by }) => {
  const [wx, wy] = ctr(bx, by);
  zoom = 3.4; scale = fitScale * zoom;          /* drive zoom, NEVER scale (269) */
  offX = vpW / 2 - wx * scale;
  offY = vpH / 2 - wy * scale;
  clampPan();
  lastSky = 0; syncSky(performance.now()); syncStats();
  render();
}, { bx: info.bx, by: info.by });
await page.screenshot({ path: join(OUT, `s${SEED}-allee-${TAG}.png`) });

await b.close();
console.log(`  -> ${OUT}/s${SEED}-city-${TAG}.png · s${SEED}-allee-${TAG}.png\n`);
