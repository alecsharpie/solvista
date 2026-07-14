#!/usr/bin/env node
/* shot-firespark.mjs — the fire camera.
 *
 * The fire only burns 1974-2030, so a 2035 `?warp=61` frame — the frame every screenshot in
 * this loop has ever taken — CANNOT show one, by construction. This camera therefore drives
 * the artifact's own tick() forward until it finds a SPREADING episode (>=2 hexes alight at
 * once), freezes there, and aims at it.
 *
 * ⚠ THE EXPECTED RESULT IS A PRESENCE, NOT AN ABSENCE (258 inverted) — so the failure mode is
 * a frame with no fire in it, which is exactly what an un-aimed camera gives you. Every frame
 * SELF-REPORTS the year, how many hexes are alight, and how far the nearest burning hex is
 * from the centre of the crop, so a mis-aimed frame is caught by the tool and not by an agent.
 *
 * AIMED BY MEASURED INK (226/230/234), never by ctr() of a hex I picked: drawFire is
 * suppressed in ONE page and the frame re-rendered, so the changed pixels ARE the fire —
 * floor exactly 0, occlusion checked for free, off the final composited canvas. The argmax is
 * scored per BURNING HEX (272: an ink window's centre need not sit on any fire), then the
 * camera pans to that hex's own ctr().
 *
 * ⚠ Drive `zoom`, never `scale` (269). ⚠ Settle the heights before the two-render diff (272) —
 * render() grows c.h, so an unsettled world makes the floor the size of the signal. ⚠ Pin
 * WINDA/time/waveT and clear flock/STARS (275/199/163d) or the diff measures the weather.
 *
 * Pins DERIVED from the light curve, never typed (264). Frames named by FILE (239).
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';

const HERE = dirname(fileURLToPath(import.meta.url));
const { chromium } = await import(
  join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.mjs')
);

const SRC = process.env.SRC || join(HERE, '../../../../solvista.html');
const TAG = process.env.TAG || 'kappa';
const SEED = +(process.argv[2] || 42);
const OUT = process.argv[3] || join(HERE, '../shots/fire');
mkdirSync(OUT, { recursive: true });
const PAGE = pathToFileURL(SRC).href;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2 });
await p.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await p.goto(`${PAGE}?seed=${SEED}`);
await p.waitForTimeout(300);

/* 1. drive the sim to a SPREADING episode and freeze the world there */
const found = await p.evaluate((seed) => {
  playing = false;
  genWorld(seed);
  const YPT = 0.45 / 6;                       /* __warp's own step — tick() does not move year */
  let best = null;
  while (year < 2029.5) {
    year += YPT; tick();
    let lit = [];
    for (const i of HEXI) if (cells[i].fire > 0) lit.push(i);
    if (lit.length >= 2) { best = { year, lit: lit.slice() }; break; }
    if (lit.length === 1 && !best) best = { year, lit: lit.slice() };   /* fallback: any fire */
  }
  if (!best) return null;
  /* if we only banked a 1-hex fallback, keep driving for a real jump */
  if (best.lit.length < 2) {
    while (year < 2029.5) {
      year += YPT; tick();
      let lit = [];
      for (const i of HEXI) if (cells[i].fire > 0) lit.push(i);
      if (lit.length >= 2) { best = { year, lit: lit.slice() }; break; }
    }
  }
  /* freeze every clock the frame loop writes (275/195f/163d) */
  time = 12.0; waveT = 3.0; WINDA = 0.5; STARS.length = 0; flock = null;
  for (const c of cells) if (c.h < c.th) c.h = c.th;      /* 272: settle before any diff */
  return { year: best.year, lit: best.lit };
}, SEED);

if (!found) { console.log('NO FIRE FOUND — the camera has nothing to shoot.'); await b.close(); process.exit(1); }
console.log(`seed ${SEED}: episode at year ${found.year.toFixed(1)}, ${found.lit.length} hex(es) alight`);

/* 2. aim by MEASURED INK of the fire itself (suppress drawFire in one page and diff) */
const aim = await p.evaluate((lit) => {
  const cvs = document.querySelector('canvas');
  const g = cvs.getContext('2d');
  const grab = () => { render(); return g.getImageData(0, 0, cvs.width, cvs.height).data; };

  const A = grab();                             /* as shipped */
  const real = window.drawFire;
  window.drawFire = () => {};                   /* suppress the DRAW (226) */
  const B = grab();
  window.drawFire = real;

  const W = cvs.width, H = cvs.height;
  const ink = new Float32Array(W * H);
  for (let i = 0, q = 0; i < A.length; i += 4, q++) {
    const d = Math.max(Math.abs(A[i] - B[i]), Math.abs(A[i + 1] - B[i + 1]), Math.abs(A[i + 2] - B[i + 2]));
    if (d > 8) ink[q] = d;
  }
  /* 200: a canvas diff scores ink hidden BEHIND the HUD — zero the DOM boxes first */
  const dpr = W / cvs.clientWidth;
  for (const sel of ['.placard', '.census', '.controls']) {
    const el = document.querySelector(sel); if (!el) continue;
    const r = el.getBoundingClientRect();
    for (let y = Math.max(0, r.top * dpr | 0); y < Math.min(H, (r.bottom * dpr) | 0); y++)
      for (let x = Math.max(0, r.left * dpr | 0); x < Math.min(W, (r.right * dpr) | 0); x++) ink[y * W + x] = 0;
  }

  /* 272: score each BURNING HEX by the ink in its OWN neighbourhood, then pan to ITS ctr() */
  let bestHex = null, bestScore = -1, total = 0;
  for (let q = 0; q < ink.length; q++) total += ink[q];
  for (const i of lit) {
    const x = i % G, y = (i / G) | 0;
    const [wx, wy] = ctr(x, y);
    const sx = (wx * scale + offX) * dpr, sy = (wy * scale + offY) * dpr;
    let s = 0, R = 90 * dpr;
    for (let py = Math.max(0, sy - R | 0); py < Math.min(H, sy + R | 0); py++)
      for (let px2 = Math.max(0, sx - R | 0); px2 < Math.min(W, sx + R | 0); px2++) s += ink[py * W + px2];
    if (s > bestScore) { bestScore = s; bestHex = { i, x, y, wx, wy, ink: s }; }
  }
  return { bestHex, totalInk: total, litCount: lit.length };
}, found.lit);

console.log(`  fire ink in frame: ${aim.totalInk.toFixed(0)} · best burning hex (${aim.bestHex.x},${aim.bestHex.y}) ink=${aim.bestHex.ink.toFixed(0)}`);

/* 3. shoot: whole city (un-zoomed) + a close-up aimed at the blaze, day and dusk */
for (const [name, pinKind] of [['day', 'day'], ['dusk', 'dusk']]) {
  for (const [framing, z] of [['city', 1], ['blaze', 4.2]]) {
    const cap = await p.evaluate(({ pinKind, z, hex, seed }) => {
      /* 264: DERIVE both pins by INVERTING the artifact's own warped clock — never a literal.
         ⚠ AND NEVER BY THE ARGMAX OF LITAMT: 199's law says LITAMT is PINNED AT 1.0 across a
         long plateau, so its argmax is not "the brightest hour", it is the LAST hour of the
         plateau — which handed this camera a "day" frame at t=0.880, i.e. the evening, and
         the two pins collapsed onto one instant. A saturated signal has no argmax.
         SUNUP/SUNDN are thresholds on the WARPED axis SUNT (261/264), so invert sunWarp:
         day = SOLAR NOON, the midpoint of the sun's own arc; dusk = just past SUNDN. */
      const invSun = (target) => {
        let lo = 0, hi = 1;
        for (let k = 0; k < 60; k++) { const m = (lo + hi) / 2; if (sunWarp(m) < target) lo = m; else hi = m; }
        return lo;
      };
      const t = pinKind === 'day' ? invSun((SUNUP + SUNDN) / 2)
                                  : Math.min(0.999, invSun(SUNDN) + 0.012);
      __setTime(t);

      const cvs = document.querySelector('canvas');
      if (z === 1) { scale = fitScale; offX = fitX; offY = fitY; zoom = 1; }
      else {
        zoom = z; scale = fitScale * z;         /* 269: the contract is scale = fitScale*zoom */
        offX = cvs.clientWidth / 2 - hex.wx * scale;
        offY = cvs.clientHeight / 2 - hex.wy * scale;
        if (typeof clampPan === 'function') clampPan();
      }
      render();
      lastSky = 0; syncSky(performance.now()); syncStats();   /* 204: the DOM does not follow a frozen clock */
      render();

      /* SELF-REPORT (202/258): the expected result is a PRESENCE — prove the fire is in frame */
      let lit = 0; for (const i of HEXI) if (cells[i].fire > 0) lit++;
      const dpr = cvs.width / cvs.clientWidth;
      const sx = hex.wx * scale + offX, sy = hex.wy * scale + offY;
      const offCentre = Math.hypot(sx - cvs.clientWidth / 2, sy - cvs.clientHeight / 2);
      /* ⚠ 269/202: PRINT THE CAMERA. An agent reported the close-ups were "at the same zoom as
         the city frames"; without zoom in the caption there is no way to tell whether that is
         the artifact, the camera, or the agent — which is a whole gate round spent guessing. */
      return `seed ${seed} · year ${year.toFixed(1)} · t=${t.toFixed(3)} LITAMT=${LITAMT.toFixed(2)} · ` +
             `${lit} hex(es) ALIGHT · nearest blaze ${offCentre.toFixed(0)}px off-centre · ` +
             `zoom=${zoom}x scale=${scale.toFixed(2)} (fit=${fitScale.toFixed(2)})`;
    }, { pinKind, z, hex: aim.bestHex, seed: SEED });

    const file = join(OUT, `s${SEED}-${TAG}-${name}-${framing}.png`);
    await p.screenshot({ path: file });        /* 200: page.screenshot — the user sees canvas + DOM */
    console.log(`  ${file}\n      ${cap}`);
  }
}
await b.close();
