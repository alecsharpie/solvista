/* shot-fairyring — the autumn flush's camera.
 *
 * ⚠ THE CADENCE IS NOT A VISUAL CLAIM. "The wood no longer blinks on and off as one"
 * is a claim about MOTION, and no still frame can carry it (134/258). probe-fairyring
 * gates the cadence. THIS camera's job is only: do the rings RENDER, do they sit on the
 * woodland floor at MIXED ages, and is the city unharmed?
 *
 * ⚠ THE DEFAULT FRAME IS WINTER. ?warp=61 lands the calendar on ~2035.0 and the rings are
 * an AUTUMN feature -- so every shot this loop has ever taken had zero mushrooms in it.
 * The camera steps to the tick with the most DIVERSE ring ages and self-reports it.
 *
 * ⚠ SETTLE THE HEIGHTS. render() MUTATES THE WORLD (drawBuilding grows every under-height
 * cell toward c.th), so a tick()-driven freeze is NOT idempotent. __warp settles c.h=c.th
 * at its end; a raw tick() loop does not, and the floor came back 544-788 px.
 *
 * ⚠ A SPARSE SIGNAL NEEDS A FULL-RESOLUTION ARGMAX. The first cut summed the suppression
 * diff at stride 4 -- but the whole city's rings are only ~60-130 changed px, so a
 * stride-4 scan SEES ALMOST NONE OF THEM and its argmax is noise. It duly framed downtown,
 * and two agents (correctly) refused to grade a crop with no forest in it. Sum every pixel.
 *
 * ⚠ DRIVE `zoom`, NEVER `scale` (269): zoomAt() is the artifact's camera contract and it
 * derives scale = fitScale*zoom. Setting scale directly renders a zoomed canvas under a
 * HUD still reading 1x, and an agent will correctly refuse to grade it.
 *
 * ⚠ PINS ARE DERIVED, NEVER TYPED (264), and derived AT THE YEAR BEING SHOT (271).
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;

const HERE = dirname(fileURLToPath(import.meta.url));
const ART = process.env.SRC || join(HERE, '../../../../solvista.html');
const TOKEN = process.env.TOKEN || 'kappa';
const SEED = +(process.argv[2] || 42);
const OUT = process.argv[3] || join(HERE, '.claude/skills/grow-city/shots/ring');
mkdirSync(OUT, { recursive: true });

const b = await chromium.launch();
const page = await b.newPage({ viewport: { width: 1400, height: 900 } });
await page.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  window.__reseed = () => { s = 0x51F3A9C >>> 0; };
});
await page.goto('file://' + ART);
await page.waitForTimeout(400);

const info = await page.evaluate((SEED) => {
  playing = false;
  genWorld(SEED);
  __warp(61);

  const ringCells = () => { const a = []; for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) { const c = cells[idx(x, y)]; if ((c.t === T.FOREST || c.t === T.REDWOOD) && c.shroom > 0) a.push({ x, y, age: c.shroom }); } return a; };
  const s2now = () => ((year % 1) + 1) % 1;

  /* Walk the flush and keep the tick whose rings are most MIXED in age -- a fresh ring
     draws at alpha 1 and a fading one at 0.5, and THAT much is visible in a still.
     (⚠ not "the first tick with rings > 0": __warp lands on s2~0 with LAST autumn's
     rings still fading through early winter, which is the feature.) */
  let bestTick = null, bestScore = -1;
  for (let k = 0; k < 400; k++) {
    year += 0.45 / 6; tick();
    const s2 = s2now();
    if (s2 < 0.80 || s2 > 0.99) continue;
    const rc = ringCells();
    if (rc.length < 2) continue;
    const ages = new Set(rc.map(r => r.age));
    const score = ages.size * 100 + rc.length;      /* diversity first, then count */
    if (score > bestScore) { bestScore = score; bestTick = { year, snapshot: cells.map(c => c.shroom) }; }
    if (ages.size >= 3) break;
  }
  if (bestTick) {                                    /* restore that exact tick's rings */
    year = bestTick.year;
    for (let i = 0; i < cells.length; i++) cells[i].shroom = bestTick.snapshot[i];
  }

  for (const c of cells) if (c.h < c.th) c.h = c.th;   /* settle: render() grows buildings */
  time = 0; waveT = 0; STARS.length = 0; flock = null;

  /* DERIVE the daylight pin at THIS year (271: sunWarp makes the light a function of year
     AND dayT). ⚠ NOT argmin(nightAmt): it is SATURATED at 0 across all of daylight, so it
     carries no information over the range we care about and its argmin returned DAWN
     (199's law). Use a signal that VARIES over daylight -- the frame's own mean luminance. */
  const cv = document.querySelector('canvas'), g = cv.getContext('2d');
  const grab = () => g.getImageData(0, 0, cv.width, cv.height).data;
  const luma = () => {
    const d = grab(); let s = 0, n = 0;
    for (let i = 0; i < d.length; i += 4 * 97) { if (d[i + 3] === 0) continue; s += 0.30 * d[i] + 0.59 * d[i + 1] + 0.11 * d[i + 2]; n++; }
    return n ? s / n : 0;
  };
  let bestT = 0, bestL = -1;
  for (let t = 0; t < 1; t += 0.01) { __setTime(t); __reseed(); render(); const L = luma(); if (L > bestL) { bestL = L; bestT = t; } }
  __setTime(bestT);

  /* AIM BY MEASURED INK (226/230): suppress drawShroom in ONE page, diff, take the densest
     window -- at FULL resolution, because the signal is ~100 px in a 1.26M-px frame. */
  const W = cv.width, H = cv.height, dpr = window.devicePixelRatio || 1;
  /* ⚠ 200'S LAW: THE CANVAS IS NOT WHAT THE USER SEES. The HUD (.placard, .census,
     .controls) is DOM drawn OVER the canvas, and getImageData cannot see it -- so a
     canvas diff happily scores ring ink that is COMPLETELY HIDDEN behind the placard.
     It did: the first cut aimed at rings buried under the top-left card and an agent
     correctly reported a crop full of downtown towers and no mushrooms. Zero the ink
     inside every HUD box before taking the argmax, so we can only ever aim at ink the
     user can actually SEE. */
  const hud = [...document.querySelectorAll('.placard,.census,.controls')].map(e => {
    const r = e.getBoundingClientRect();
    return { x0: r.left * dpr, y0: r.top * dpr, x1: r.right * dpr, y1: r.bottom * dpr };
  });
  const hidden = (px, py) => hud.some(b => px >= b.x0 && px <= b.x1 && py >= b.y0 && py <= b.y1);

  const inkMap = () => {
    __reseed(); render(); const A = grab();
    const real = window.drawShroom; window.drawShroom = () => {};
    __reseed(); render(); const B = grab();
    window.drawShroom = real;
    const acc = new Float64Array(W * H);
    let total = 0, behindHud = 0;
    for (let i = 0; i < A.length; i += 4) {
      const d = Math.max(Math.abs(A[i] - B[i]), Math.abs(A[i + 1] - B[i + 1]), Math.abs(A[i + 2] - B[i + 2]));
      if (d <= 0) continue;
      const p = i / 4, px = p % W, py = (p / W) | 0;
      if (hidden(px, py)) { behindHud += d; continue; }   /* the user cannot see this */
      acc[p] = d; total += d;
    }
    return { acc, total, behindHud };
  };
  const argmaxWin = (acc, WIN) => {                  /* full-res box sum, no striding */
    let bx = 0, by = 0, best = -1;
    for (let y = 0; y + WIN <= H; y += 8) for (let x = 0; x + WIN <= W; x += 8) {
      let s = 0;
      for (let j = y; j < y + WIN; j++) { const row = j * W; for (let i = x; i < x + WIN; i++) s += acc[row + i]; }
      if (s > best) { best = s; bx = x; by = y; }
    }
    return { bx, by, best };
  };

  const centroid = (acc) => { let sx=0, sy=0, s=0, minx=1e9,maxx=-1,miny=1e9,maxy=-1;
    for (let p=0;p<acc.length;p++){ const v=acc[p]; if(!v)continue; const x=p%W, y=(p/W)|0;
      sx+=x*v; sy+=y*v; s+=v; if(x<minx)minx=x; if(x>maxx)maxx=x; if(y<miny)miny=y; if(y>maxy)maxy=y; }
    return s? {cx:sx/s, cy:sy/s, minx, maxx, miny, maxy} : null; };
  /* 1. SCORE EACH RING BY ITS OWN MEASURED, USER-VISIBLE INK at fit zoom (226/230/271),
        then PAN TO THAT RING'S OWN ctr(). Both halves are load-bearing:
        - picking by INK (not by a predicate or a position) guarantees the ring we frame is
          one that provably renders -- not one buried behind a tower or under the placard;
        - panning to its ctr() (not to an ink-window's geometric centre) guarantees we
          actually land ON it. Aiming at the argmax WINDOW's centre missed: with rings this
          sparse the window's midpoint need not sit on any ring at all, and the pan walked
          off to a world point with no mushrooms in it. */
  const m0 = inkMap();
  const ringInk = (cell) => {                        /* visible ink within ~1 hex of this ring */
    const w = ctr(cell.x, cell.y);
    const sx = Math.round((offX + w[0] * scale) * dpr), sy = Math.round((offY + w[1] * scale) * dpr);
    const R = Math.round(14 * dpr);
    let s = 0;
    for (let j = Math.max(0, sy - R); j < Math.min(H, sy + R); j++)
      for (let i = Math.max(0, sx - R); i < Math.min(W, sx + R); i++) s += m0.acc[j * W + i];
    return s;
  };
  const scored = ringCells().map(c => ({ ...c, ink: ringInk(c) })).sort((a, z) => z.ink - a.ink);
  const target = scored[0];
  const tw = ctr(target.x, target.y);

  /* 2. zoom the ARTIFACT'S OWN camera (269: drive zoom, never scale), then pan the target
        to the middle of the frame.
        ⚠ zoomAt(target, f) alone is NOT enough: it keeps the world point under the cursor,
        but clampPan() then shoves the view to keep the plate in frame -- which STRANDED a
        ring at x=6..35, the extreme left edge, half-clipped. The crop "contained" it in a
        corner and an agent scanned the towers and correctly reported no mushrooms.
        Zoom about the CENTRE, then pan explicitly. (offX/offY are pan INPUTS -- zoomAt and
        the '0' key both assign them; only `scale` is derived.) */
  const mid = [W / (2 * dpr), H / (2 * dpr)];
  zoomAt(mid[0], mid[1], 4.5);
  offX = mid[0] - tw[0] * scale; offY = mid[1] - tw[1] * scale; clampPan();

  /* 3. re-measure at the new zoom and crop on the CENTRE, where the target ring now is */
  const m1 = inkMap();
  const WIN = Math.round(440 * dpr);
  const bx = Math.round(mid[0] * dpr - WIN / 2), by = Math.round(mid[1] * dpr - WIN / 2);
  let inClip = 0;
  for (let j = by; j < by + WIN; j++) for (let i = bx; i < bx + WIN; i++) inClip += m1.acc[j * W + i];
  const a1 = { bx, by, best: inClip };

  __reseed(); render();
  lastSky = 0; syncSky(performance.now()); syncStats();   /* 204: a frozen clock does not refresh the DOM */

  const rc = ringCells();
  const ages = rc.map(r => r.age).sort((a, z) => z - a);
  return {
    seed: SEED, year: +year.toFixed(3), s2: +s2now().toFixed(3),
    dayT: +bestT.toFixed(3), luma: +bestL.toFixed(1),
    zoom: +zoom.toFixed(2),
    rings: rc.length, ages: ages.join(','), distinctAges: new Set(ages).size,
    inkTotalFit: Math.round(m0.total), inkTotalZoom: Math.round(m1.total),
    inkBehindHud: Math.round(m1.behindHud),          /* ring ink the user CANNOT see (200) */
    inkInClip: Math.round(a1.best),                  /* the self-check: is there ANY ring here? */
    inkBox: centroid(m1.acc),
    clip: { x: Math.round(a1.bx / dpr), y: Math.round(a1.by / dpr), width: Math.round(WIN / dpr), height: Math.round(WIN / dpr) },
  };
}, SEED);

console.log(JSON.stringify(info));
if (info.inkInClip <= 0) console.error('!! THE CROP CONTAINS NO RING INK — the camera is lying, do not ship this frame.');

/* every frame SELF-REPORTS its own state (202), in the VIEWER'S units (236) */
const cap = `seed ${info.seed} · ${TOKEN} · AUTUMN s2=${info.s2} · zoom ${info.zoom}x · dayT=${info.dayT} (DERIVED) · ${info.rings} RINGS UP, ages=[${info.ages}] — ${info.distinctAges} DIFFERENT ages (3=fresh/opaque, 1=fading/half) · ring ink in this crop=${info.inkInClip}`;
await page.evaluate((t) => {
  const d = document.createElement('div');
  d.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#000c;color:#fff;font:11px monospace;padding:5px 8px;text-align:center';
  d.textContent = t; document.body.appendChild(d);
}, cap);

await page.screenshot({ path: join(OUT, `s${SEED}-${TOKEN}-ring.png`), clip: info.clip });

/* ...and the un-zoomed WHOLE frame: the census is blind to visual regression, so every
   lap must re-read the whole city, not just its own feature. Back to the fit camera the
   way the artifact's own '0' key does it -- zoom is the input, scale the output (269). */
await page.evaluate(() => {
  zoom = 1; scale = fitScale; offX = fitX; offY = fitY;
  __reseed(); render();
  lastSky = 0; syncSky(performance.now()); syncStats();
});
await page.screenshot({ path: join(OUT, `s${SEED}-${TOKEN}-city.png`) });
await b.close();
console.log(`wrote ${OUT}/s${SEED}-${TOKEN}-{ring,city}.png`);
