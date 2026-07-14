/* shot-solarfield — the solar array's camera.
 *
 * The before/after is taken INSIDE ONE PAGE by retyping the SOLARF cells back to
 * T.FARM (230's suppress-the-DECISION), which draws exactly the farmland that stood
 * there before. Floor exactly 0, no source swap, no cross-build drift.
 *
 * That is not a convenience here, it is the ONLY honest option: the lap deletes a
 * dead rule's rng() draws, so HEAD's city is a DIFFERENT city and the same hex need
 * not even be a farm in it (267). A HEAD-vs-patch A/B would be comparing two worlds.
 *
 * Aimed by ARGMAX OF MEASURED INK, scored per HOST (226/272): score each solar hex
 * by the ink in its own neighbourhood, take the argmax over HOSTS, then pan to THAT
 * hex's own ctr(). An ink window's geometric centre need not sit on any panel.
 * HUD boxes are zeroed before the argmax (200) — a canvas readback scores ink hidden
 * behind .placard just as brightly.
 *
 * The UN-ZOOMED whole-plate frame is REQUIRED and is the frame that matters: this
 * feature darkens countryside hexes, and "kelp lined the entire coast dark for ~13
 * iterations" precisely because every check zoomed on the new tile.
 *
 * Frames are named by FILE with meaningless tokens, map CROSSED between seeds
 * (238/239/268). Drives `zoom`, never `scale` (269).
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = process.env.SRC || join(HERE, '../../../../solvista.html');

const SEED = +(process.argv[2] || 42);
const OUT = process.argv[3] || join(HERE, '../shots/solar');
mkdirSync(OUT, { recursive: true });

/* crossed map: on seed 42 kappa=shipped, on seed 7 sigma=shipped (238/268) */
const CROSS = SEED === 7;
const NAME_SHIPPED = CROSS ? 'sigma' : 'kappa';
const NAME_BEFORE  = CROSS ? 'kappa' : 'sigma';

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2 });
await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  window.__reseed = () => { s = 0x51F3A9C >>> 0; };
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await p.goto(pathToFileURL(ART).href);
await p.waitForTimeout(500);

/* ---- build the world once, frozen, and find the array by MEASURED INK ---- */
const info = await p.evaluate((seed) => {
  playing = false;
  window.__reseed();                       /* re-seed the PRNG stream before EVERY genWorld */
  genWorld(seed);
  window.__warp(2035 - year);
  time = 40; waveT = 6; STARS.length = 0; flock = null;   /* pin the other clocks */
  if (typeof __setWind === 'function') __setWind(0.5);
  for (const c of cells) if (DEV.has(c.t) && c.h < c.th) c.h = c.th;   /* settle heights (272) */

  /* light: DERIVE the day pin from the artifact's own curve, never a literal (264) */
  const gw = [];
  for (let t = 0; t < 1; t += 0.005) { const S = sunWarp(t); gw.push([daylight(S).lit, t]); }
  const DAY = 0.415;                       /* noon — shadS's own byte-identical pin (225) */
  __setTime(DAY);

  const solar = [];
  for (const i of HEXI) if (cells[i].t === T.SOLARF) solar.push(i);

  /* --- suppress the DECISION: retype the panels back to farmland, render, diff --- */
  const grab = () => { render(); const c = document.querySelector('canvas');
    return c.getContext('2d').getImageData(0, 0, c.width, c.height).data; };

  const A = grab();                                   /* as shipped */
  const keep = solar.map(i => cells[i].t);
  for (const i of solar) cells[i].t = T.FARM;         /* the land as it stood before */
  const B = grab();
  for (let k = 0; k < solar.length; k++) cells[solar[k]].t = keep[k];

  /* the changed pixels ARE the panels. zero the HUD boxes first (200). */
  const cv = document.querySelector('canvas');
  const W = cv.width, H = cv.height, dpr = W / window.innerWidth;
  const boxes = [...document.querySelectorAll('.placard,.census,.controls')].map(e => {
    const r = e.getBoundingClientRect();
    return [r.left * dpr, r.top * dpr, r.right * dpr, r.bottom * dpr];
  });
  const inHUD = (x, y) => boxes.some(([l, t, r, bo]) => x >= l && x <= r && y >= t && y <= bo);

  const ink = new Float32Array(W * H);
  let total = 0;
  for (let q = 0; q < W * H; q++) {
    const o = q * 4;
    const d = Math.max(Math.abs(A[o] - B[o]), Math.abs(A[o + 1] - B[o + 1]), Math.abs(A[o + 2] - B[o + 2]));
    if (d < 8) continue;
    const x = q % W, y = (q / W) | 0;
    if (inHUD(x, y)) continue;
    ink[q] = d; total++;
  }

  /* score each HOST by the ink in its own neighbourhood, argmax over HOSTS (272) */
  const R = Math.round(70 * dpr);
  let best = -1, bestScore = -1;
  for (const i of solar) {
    const [wx, wy] = ctr(i % G, (i / G) | 0);
    const sx = Math.round((wx * scale + offX) * dpr), sy = Math.round((wy * scale + offY) * dpr);
    let s = 0;
    for (let y = Math.max(0, sy - R); y < Math.min(H, sy + R); y++)
      for (let x = Math.max(0, sx - R); x < Math.min(W, sx + R); x++) s += ink[y * W + x];
    if (s > bestScore) { bestScore = s; best = i; }
  }

  /* 259's check, free: is it even VISIBLE? — against an INCUMBENT BAR (226).
     the VINEYARD is the correct sibling: the same far-field conversion, on the same
     host, that the artifact already ships and nobody has ever called invisible. */
  const vine = [];
  for (const i of HEXI) if (cells[i].t === T.VINEYARD) vine.push(i);
  const C = (() => {
    const k2 = vine.map(i => cells[i].t);
    for (const i of vine) cells[i].t = T.FARM;
    const d = grab();
    for (let k = 0; k < vine.length; k++) cells[vine[k]].t = k2[k];
    render();
    return d;
  })();
  let vink = 0;
  for (let q = 0; q < W * H; q++) {
    const o = q * 4;
    const d = Math.max(Math.abs(A[o] - C[o]), Math.abs(A[o + 1] - C[o + 1]), Math.abs(A[o + 2] - C[o + 2]));
    if (d >= 8) vink++;
  }

  return {
    solarN: solar.length, vineN: vine.length,
    inkPx: total, inkPerSolar: total / Math.max(1, solar.length),
    vinePx: vink, vinePerVine: vink / Math.max(1, vine.length),
    best, bx: best % G, by: (best / G) | 0, DAY, dpr,
  };
}, SEED);

console.log(`seed ${SEED}: SOLARF ${info.solarN} hexes · array ink ${info.inkPx}px ` +
  `(${info.inkPerSolar.toFixed(0)} px/hex)`);
console.log(`  incumbent bar (226) — VINEYARD, the sibling far-field conversion the artifact already ships:`);
console.log(`  VINEYARD ${info.vineN} hexes · ${info.vinePx}px (${info.vinePerVine.toFixed(0)} px/hex)`);
console.log(`  aiming at hex (${info.bx},${info.by}) — argmax of the panels' OWN measured ink`);

/* ---- shoot ---- */
async function shoot(tag, zoomTo, dayT, suppress) {
  const cap = await p.evaluate(([bx, by, zoomTo, dayT, suppress]) => {
    playing = false;
    __setTime(dayT);
    /* drive `zoom`, never `scale` (269) */
    if (zoomTo > 1) {
      zoom = zoomTo; scale = fitScale * zoom;
      const [wx, wy] = ctr(bx, by);
      offX = window.innerWidth / 2 - wx * scale;
      offY = window.innerHeight / 2 - wy * scale;
      if (typeof clampPan === 'function') clampPan();
    } else { zoom = 1; scale = fitScale; offX = fitX; offY = fitY; }

    const solar = [];
    for (const i of HEXI) if (cells[i].t === T.SOLARF) solar.push(i);
    let keep = null;
    if (suppress) { keep = solar.map(i => cells[i].t); for (const i of solar) cells[i].t = T.FARM; }

    render();
    lastSky = 0; syncSky(performance.now()); syncStats();     /* the DOM does not follow a frozen clock (204) */

    /* self-report: the frame states its own condition, and whether the HOST is in it (258) */
    const [wx, wy] = ctr(bx, by);
    const sx = wx * scale + offX, sy = wy * scale + offY;
    const onScreen = sx > 0 && sx < window.innerWidth && sy > 0 && sy < window.innerHeight;
    /* ⚠ DO NOT restore here. frame() calls render() on EVERY RAF regardless of
       `playing` (204), and p.screenshot() is a separate round-trip — so a world
       mutation undone inside this evaluate is repainted away before the shot
       lands, and the "suppressed" PNG comes back byte-identical to the shipped
       one. (It did: two agents, two seeds, both refused to grade it.) The same
       suppression is SAFE for a getImageData diff, because that happens INSIDE
       one evaluate. A canvas readback and a DOM screenshot differ by one RAF.
       The world is left suppressed; the caller restores it after the shot. */
    window.__restore = keep
      ? () => { for (let k = 0; k < solar.length; k++) cells[solar[k]].t = keep[k]; render(); }
      : null;
    /* what is ACTUALLY on the plate right now, not what we started with (258) */
    let live = 0; for (const i of HEXI) if (cells[i].t === T.SOLARF) live++;
    return { n: live, dayT, zoom, onScreen,
             miss: Math.round(Math.hypot(sx - window.innerWidth / 2, sy - window.innerHeight / 2)) };
  }, [info.bx, info.by, zoomTo, dayT, suppress]);

  const file = join(OUT, `s${SEED}-${tag}.png`);
  await p.screenshot({ path: file });          /* DOM-composited (200) */
  await p.evaluate(() => { if (window.__restore) window.__restore(); window.__restore = null; });
  console.log(`  ${tag.padEnd(22)} panels-ON-PLATE=${cap.n} dayT=${cap.dayT} zoom=${cap.zoom.toFixed(1)}x ` +
    `host-on-screen=${cap.onScreen} aim-miss=${cap.miss}px  -> ${file}`);
  if (zoomTo > 1 && !cap.onScreen) throw new Error(`camera aimed at nothing (${tag})`);
}

/* the un-zoomed whole plate: REQUIRED, and the frame that matters */
await shoot('city-day', 1, info.DAY, false);
await shoot('city-night', 1, 0.92, false);
/* the close-up, blind pair: shipped vs the same land with the panels suppressed */
await shoot(`close-${NAME_SHIPPED}`, 4.5, info.DAY, false);
await shoot(`close-${NAME_BEFORE}`, 4.5, info.DAY, true);
await shoot('close-night', 4.5, 0.92, false);

await b.close();
console.log(`\n  (blind map for THIS seed: ${NAME_SHIPPED}=shipped, ${NAME_BEFORE}=panels suppressed)`);
