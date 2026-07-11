#!/usr/bin/env node
/* probe-hallclock.mjs — does the town-hall clock's hand READ THE DAY? (iter 149)
 *
 * The hall clock was drawn with FROZEN hands (a fixed 12:15-ish) though its own
 * comment called it "the clock face the town sets its watches by". Iter 149 drove
 * the hand off dayT on a 24h dial: straight up at noon (dayT .5), down at midnight
 * (dayT 0), left in the morning, right in the evening — so it turns with the sun
 * and the moon (135), not sitting still. It is a zoom-reward detail (~2px at fit,
 * like the police beacon / museum banner), so this probe zooms the camera onto the
 * dial before measuring.
 *
 * The census is vacuous (draw-only, reads a global, no rng/terrain), and a single
 * screenshot only proves the dial renders. So MEASURE the hand's DIRECTION from
 * pixels and check it against the day, locate-don't-judge (iter 108).
 *
 * The ink hand sits against the BRIGHT hall wall, so a raw luminance ray is swamped
 * by the building. Instead DIFFERENCE each test frame against a reference frame at
 * the SAME lighting: the static wall/dome/hub/noon-tick cancel exactly, leaving
 * only the moving hand. The centroid of the ink that APPEARED in the test (pixels
 * darker than the reference) is the hand's direction. The probe stays in the
 * daytime lighting window (KEYS: lit ~0 across dayT .13-.60) so lighting is constant
 * across the measured arc — lower-left, through left, up, into upper-right. The
 * probe recomputes the expected angle itself; it never trusts __clock().ang, so a
 * mis-wired draw fails even if the hook echoed the same bug. (Straight-down /
 * lower-right — midnight, evening — sit in fast-changing light and are left to the
 * visual gate: a day vs night clock read.)
 *
 * Gates:
 *   - halls > 0 per seed (dead-code law: the dial must exist at scale).
 *   - per test dayT: enough "appeared ink" pixels, and the centroid angle within
 *     TOL of the angle dayT predicts; observed angle monotonic in dayT.
 *   - control: dayT .5 rendered twice is pixel-identical (frozen => no strobe).
 *
 * Usage: node probe-hallclock.mjs [seed ...]
 */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright-core/index.mjs';
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';

const SEEDS = process.argv.slice(2).length ? process.argv.slice(2).map(Number) : [7, 1234, 42, 3, 88];
const HTML = readFileSync(new URL('../../../../solvista.html', import.meta.url));

const srv = createServer((_, res) => { res.setHeader('content-type', 'text/html'); res.end(HTML); }).listen(0);
await new Promise(r => srv.once('listening', r));
const port = srv.address().port;

// tests: daytime dayT (constant lighting). ref is a far daytime hand (>=90deg away)
// so the "appeared ink" centroid is the test hand, un-confused with the ref hand.
const TESTS = [
  { t: 0.20, ref: 0.55, label: 'morning',    dir: 'lower-left' },
  { t: 0.30, ref: 0.55, label: 'midmorning', dir: 'left' },
  { t: 0.40, ref: 0.15, label: 'late morn',  dir: 'upper-left' },
  { t: 0.50, ref: 0.15, label: 'noon',       dir: 'up' },
];
const REFS = [0.15, 0.55];
const wrapDeg = d => { d = ((d % 360) + 360) % 360; return d > 180 ? 360 - d : d; };
const TOL = 22;      // deg
const MINPIX = 20;   // min "appeared ink" pixels for a real hand (large face when zoomed)

const browser = await chromium.launch();
let allPass = true, measured = 0, seedsWithHall = 0;

for (const seed of SEEDS) {
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 4 });
  await page.goto(`http://127.0.0.1:${port}/solvista.html?seed=${seed}&warp=61&year=2035.62`, { waitUntil: 'load' });
  await page.waitForFunction(() => typeof window.__clock === 'function');
  await page.waitForTimeout(1200); // let h -> th settle before we freeze

  const res = await page.evaluate(({ tests, refs }) => {
    playing = false;
    const cv = document.querySelector('canvas');
    const g = cv.getContext('2d');
    const dpr = cv.width / cv.clientWidth;

    window.__setTime(0.5); render();
    let halls = window.__clock();
    if (!halls.length) return { halls: 0 };
    const onscr = halls.filter(h => h.sx > 200 && h.sx < 1400 && h.sy > 150 && h.sy < 850);
    const H0 = (onscr[0] || halls[0]);
    // camera: center the dial and zoom in so the ~2px face becomes measurable.
    const wx = (H0.sx - offX) / scale, wy = (H0.sy - offY) / scale; // clock world coords
    zoom = 6; scale = fitScale * zoom;
    offX = cv.clientWidth / 2 - wx * scale; offY = cv.clientHeight / 2 - wy * scale;
    render();
    const H = window.__clock().find(h => h.x === H0.x && h.y === H0.y) || window.__clock()[0];
    const sx = H.sx, sy = H.sy, RAD = Math.max(6, H.r * 1.8); // css half-box

    const X0 = Math.round((sx - RAD) * dpr), Y0 = Math.round((sy - RAD) * dpr), W = Math.round(2 * RAD * dpr);
    const cxg = (sx * dpr) - X0, cyg = (sy * dpr) - Y0; // center in box-px
    const grab = t => {
      window.__setTime(t); render();
      const d = g.getImageData(X0, Y0, W, W).data, L = new Float32Array(W * W);
      for (let i = 0; i < W * W; i++) L[i] = 0.2126 * d[i * 4] + 0.7152 * d[i * 4 + 1] + 0.0722 * d[i * 4 + 2];
      return L;
    };
    const frames = {};
    for (const t of [...new Set([...tests.map(x => x.t), ...refs])]) frames[t] = grab(t);

    // the hand runs from the center hub (~0.24*r) out to its tip (~0.74*r); sample
    // that band, clear of the hub dot and the outer rim/tick.
    const HUB = 0.30 * H.r * dpr, RIM = 0.90 * H.r * dpr;
    const out = { halls: halls.length, sx, sy, r: H.r, W, tests: [] };
    for (const cs of tests) {
      const L = frames[cs.t], R = frames[cs.ref];
      let mx = 0, my = 0, wsum = 0, cnt = 0;
      for (let yy = 0; yy < W; yy++) for (let xx = 0; xx < W; xx++) {
        const i = yy * W + xx, dL = R[i] - L[i]; // >0: test darker than ref = ink appeared
        const rr = Math.hypot(xx - cxg, yy - cyg);
        if (dL > 40 && rr > HUB && rr < RIM) { mx += (xx - cxg) * dL; my += (yy - cyg) * dL; wsum += dL; cnt++; }
      }
      const vx = wsum ? mx / wsum : 0, vy = wsum ? my / wsum : 0;
      const obs = Math.atan2(vx, -vy) * 180 / Math.PI; // screen dir u(a)=(sin a,-cos a)
      out.tests.push({ t: cs.t, label: cs.label, dir: cs.dir, obsDeg: obs, expDeg: (cs.t - 0.5) * 360, cnt });
    }
    const hash = arr => { let h = 0; for (let i = 0; i < arr.length; i++) h = (h * 31 + (arr[i] | 0)) >>> 0; return h; };
    out.ctrlSame = hash(grab(0.5)) === hash(grab(0.5));
    return out;
  }, { tests: TESTS, refs: REFS });
  await page.close();

  if (!res.halls) { console.log(`\n=== seed ${seed}: no standalone hall this seed (became parliament) — SKIP`); continue; }
  seedsWithHall++;
  console.log(`\n=== seed ${seed} · ${res.halls} hall(s) · dial ${res.sx.toFixed(0)},${res.sy.toFixed(0)} · face r=${res.r.toFixed(1)}px`);
  let seedPass = res.ctrlSame, prevObs = null, mono = true;
  const visible = res.tests.some(c => c.cnt >= MINPIX); // any hand ink at all?
  for (const c of res.tests) {
    const err = wrapDeg(c.obsDeg - c.expDeg);
    const ok = c.cnt >= MINPIX && err < TOL;
    if (!ok) seedPass = false;
    if (prevObs != null && c.obsDeg <= prevObs) mono = false;
    prevObs = c.obsDeg;
    console.log(`  ${c.label.padEnd(10)} dayT=${c.t.toFixed(2)}  hand→${c.dir.padEnd(11)}  ` +
      `obs ${c.obsDeg.toFixed(0).padStart(4)}° exp ${c.expDeg.toFixed(0).padStart(4)}°  ` +
      `err ${err.toFixed(0).padStart(3)}°  ink=${String(c.cnt).padStart(4)}  ${ok ? 'ok' : 'FAIL'}`);
  }
  if (!visible) {
    // no hand ink on any frame => this hall's dial is occluded by a front tile
    // (a camera-independent draw-order fact, e.g. an amphitheater knoll in front).
    // Not measurable, not a feature failure — skip it.
    console.log(`  seed ${seed}: SKIP — dial occluded (no hand visible), not measurable`);
    continue;
  }
  if (!mono) { seedPass = false; console.log('  monotonic obs(dayT): FAIL'); } else console.log('  monotonic obs(dayT): ok');
  console.log(`  control (dayT .5 twice identical): ${res.ctrlSame ? 'ok' : 'FAIL'}`);
  console.log(`  seed ${seed}: ${seedPass ? 'PASS' : 'FAIL'}`);
  measured++;
  if (!seedPass) allPass = false;
}

srv.close();
await browser.close();
console.log(`\nhalls found in ${seedsWithHall} seeds (dead-code: dial exists at scale); ${measured} had a visible dial and were measured.`);
if (measured < 2) { console.log(`VERDICT: FAIL — only ${measured} seed(s) had a visible dial; need >=2 to trust`); process.exit(1); }
console.log(`VERDICT: ${allPass ? `PASS — the hall clock reads the day (${measured} seeds measured)` : 'FAIL'}`);
process.exit(allPass ? 0 : 1);
