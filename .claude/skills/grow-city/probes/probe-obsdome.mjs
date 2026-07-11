#!/usr/bin/env node
/* probe-obsdome.mjs — does the observatory dome ROTATE to track the night sky? (iter 158)
 *
 * The observatory dome was drawn with a slit at a FIXED azimuth (`sd` flipped it per
 * city but it never moved), though CIVICDESC promised "A dome ... open to the night."
 * Iter 158 drives the slit off the slow day clock (dayT, the same one the hall clock
 * (149) and moon (135) read): the aperture points at the ZENITH (straight up) at
 * midnight and leans to the east/west horizons through dusk and dawn, opening after
 * dark and buttoned up by day. So at midnight it looks UP while the clock hand (149)
 * points DOWN — complementary readers of one clock.
 *
 * The census is vacuous (draw-only, reads globals, no rng/terrain), and a screenshot
 * only proves the dome renders. So MEASURE the aperture from pixels (locate-don't-
 * judge, 108). The slit is near-white (rgba 228,255,248 ~ lum 249) and stands out on
 * the dark night dome, so a fixed high-luminance threshold isolates the OPEN aperture,
 * and the centroid of that bright ink gives its azimuth. Zoom the camera onto the dome
 * first (149: camera-set beats mouse-wheel). The probe recomputes the expected sweep
 * itself; it never gates on __obs().phi.
 *
 * Gates (per seed):
 *   - observatory exists at scale (dead-code law).
 *   - the aperture is OPEN at night, SHUT by day: midnight bright-ink count >> noon's.
 *   - the slit azimuth SWEEPS: monotonic across dusk-side -> midnight -> dawn-side,
 *     and ~centered (zenith) at midnight.
 *   - control: a night frame rendered twice is pixel-identical (frozen, no strobe).
 *
 * Usage: node probe-obsdome.mjs [seed ...]
 */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright-core/index.mjs';
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';

const SEEDS = process.argv.slice(2).length ? process.argv.slice(2).map(Number) : [7, 42, 1234, 3, 88];
const HTML = readFileSync(new URL('../../../../solvista.html', import.meta.url));

const srv = createServer((_, res) => { res.setHeader('content-type', 'text/html'); res.end(HTML); }).listen(0);
await new Promise(r => srv.once('listening', r));
const port = srv.address().port;

// five night samples spanning dusk-side -> midnight -> dawn-side (nd = signed offset
// from midnight), plus a noon control where the aperture is shut.
const NIGHT = [0.86, 0.93, 0.00, 0.03, 0.05]; // all inside the open window (open>=0.89)
const NOON = 0.50;
const LUMTH = 235;    // only the near-white open slit crosses this (at night)
const TOLMID = 20;    // deg: midnight azimuth must be within this of the zenith (up)
const MINPIX = 12;    // min open-slit pixels at an extreme night frame
const MINEXC = 110;   // min peak-median contrast for an OPEN aperture

const browser = await chromium.launch();
let allPass = true, measured = 0, seedsWithObs = 0;

for (const seed of SEEDS) {
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 4 });
  await page.goto(`http://127.0.0.1:${port}/solvista.html?seed=${seed}&warp=61&year=2035.62`, { waitUntil: 'load' });
  await page.waitForFunction(() => typeof window.__obs === 'function');
  await page.waitForTimeout(1200); // let h -> th settle before we freeze

  const res = await page.evaluate(({ NIGHT, NOON, LUMTH }) => {
    playing = false;
    const cv = document.querySelector('canvas');
    const g = cv.getContext('2d');
    const dpr = cv.width / cv.clientWidth;

    window.__setTime(0.0); render();
    let obs = window.__obs();
    if (!obs.length) return { obs: 0 };
    const onscr = obs.filter(o => o.sx > 200 && o.sx < 1400 && o.sy > 120 && o.sy < 880);
    const O0 = (onscr[0] || obs[0]);
    // camera: center the dome and zoom in so the aperture is measurable.
    const wx = (O0.sx - offX) / scale, wy = (O0.sy - offY) / scale;
    zoom = 6; scale = fitScale * zoom;
    offX = cv.clientWidth / 2 - wx * scale; offY = cv.clientHeight / 2 - wy * scale;
    render();
    const O = window.__obs().find(o => o.x === O0.x && o.y === O0.y) || window.__obs()[0];
    const sx = O.sx, sy = O.sy, R = O.r;                    // dome center + radius, css px
    const RAD = R * 1.25;                                   // css half-box
    const X0 = Math.round((sx - RAD) * dpr), Y0 = Math.round((sy - RAD) * dpr), W = Math.round(2 * RAD * dpr);
    const cxg = (sx * dpr) - X0, cyg = (sy * dpr) - Y0;     // dome center in box-px
    const Rp = R * dpr, RIN = 0.28 * Rp, ROUT = 0.98 * Rp;  // radial band of the aperture

    const meas = t => {
      window.__setTime(t); render();
      const o = window.__obs().find(q => q.x === O0.x && q.y === O0.y) || window.__obs()[0];
      const d = g.getImageData(X0, Y0, W, W).data;
      let mx = 0, my = 0, wsum = 0, cnt = 0; const band = [];
      for (let yy = 0; yy < W; yy++) for (let xx = 0; xx < W; xx++) {
        const dx = xx - cxg, dy = yy - cyg, rr = Math.hypot(dx, dy);
        if (rr < RIN || rr > ROUT || dy > 0.18 * Rp) continue; // dome is the upper semicircle
        const i = (yy * W + xx) * 4;
        const L = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
        band.push(L);
        if (L > LUMTH) { const w = L - LUMTH; mx += dx * w; my += dy * w; wsum += w; cnt++; } // slit ink (night)
      }
      band.sort((a, b) => a - b);
      const med = band[band.length >> 1] || 0, p95 = band[Math.min(band.length - 1, Math.floor(band.length * 0.95))] || 0;
      const exc = p95 - med;                         // local contrast: bright slit on the dome body
      const vx = wsum ? mx / wsum : 0, vy = wsum ? my / wsum : 0;
      const az = wsum ? Math.atan2(vx, -vy) * 180 / Math.PI : null; // up=0, right +
      return { t, cnt, az, exc, openAmt: o.openAmt, phi: o.phi, sd: o.sd };
    };
    const hashData = () => { const d = g.getImageData(X0, Y0, W, W).data; let h = 0;
      for (let i = 0; i < d.length; i += 97) h = (h * 31 + d[i]) >>> 0; return h; };

    const frames = [...NIGHT, NOON].map(meas);
    window.__setTime(NIGHT[2]); render(); const ca = hashData();
    window.__setTime(NIGHT[2]); render(); const cb = hashData();
    return { ok: true, sx, sy, R, W, dpr, X0, Y0, cxg, cyg, RIN, ROUT, Rp,
      frames, ctrl: ca === cb, count: window.__obs().length };
  }, { NIGHT, NOON, LUMTH });
  await page.close();

  if (!res.obs && !res.ok) { console.log(`\n=== seed ${seed}: no observatory this seed — SKIP`); continue; }
  seedsWithObs++;
  const nightFrames = res.frames.slice(0, NIGHT.length);
  const noonFrame = res.frames[NIGHT.length];
  console.log(`\n=== seed ${seed} · ${res.count} observatory · dome ${res.sx.toFixed(0)},${res.sy.toFixed(0)} · R=${res.R.toFixed(1)}px`);
  for (const f of res.frames) {
    console.log(`  dayT=${f.t.toFixed(2)}  open=${f.openAmt.toFixed(2)}  ink=${String(f.cnt).padStart(4)}  ` +
      `exc=${f.exc.toFixed(0).padStart(3)}  az=${f.az === null ? ' n/a ' : (f.az.toFixed(0) + '°').padStart(5)}  (phi=${f.phi.toFixed(2)}, sd=${f.sd})`);
  }
  // open/shut: aperture OPEN at night (bright slit on dark dome, high local contrast),
  // SHUT by day (uniform lit dome, low contrast). Lighting-robust (peak-median).
  const midExc = nightFrames[2].exc, noonExc = noonFrame.exc;
  const openShut = midExc >= MINEXC && noonExc < midExc * 0.5;
  // sweep: monotonic azimuth across the five night frames, midnight ~ zenith
  const azs = nightFrames.map(f => f.az);
  const haveAz = azs.every(a => a !== null) && nightFrames[0].cnt >= MINPIX && nightFrames[4].cnt >= MINPIX;
  let mono = haveAz, midCentered = haveAz;
  if (haveAz) {
    const inc = azs.every((a, i) => i === 0 || a > azs[i - 1]);
    const dec = azs.every((a, i) => i === 0 || a < azs[i - 1]);
    mono = inc || dec;
    midCentered = Math.abs(azs[2]) < TOLMID;
  }
  const seedPass = openShut && mono && midCentered && res.ctrl;
  console.log(`  open@midnight exc=${midExc.toFixed(0)} vs shut@noon exc=${noonExc.toFixed(0)}: ${openShut ? 'ok' : 'FAIL'}`);
  console.log(`  azimuth sweep monotonic: ${mono ? 'ok' : 'FAIL'} · midnight~zenith (|${haveAz ? azs[2].toFixed(0) : '?'}|<${TOLMID}): ${midCentered ? 'ok' : 'FAIL'}`);
  console.log(`  control (night frame twice identical): ${res.ctrl ? 'ok' : 'FAIL'}`);
  console.log(`  seed ${seed}: ${seedPass ? 'PASS' : 'FAIL'}`);
  measured++;
  if (!seedPass) allPass = false;
}

srv.close();
await browser.close();
console.log(`\nobservatory found in ${seedsWithObs} seeds (dead-code: dome exists at scale); ${measured} measured.`);
if (measured < 2) { console.log(`VERDICT: FAIL — only ${measured} seed(s) had an observatory; need >=2`); process.exit(1); }
console.log(`VERDICT: ${allPass ? `PASS — the dome tracks the night sky and shuts by day (${measured} seeds)` : 'FAIL'}`);
process.exit(allPass ? 0 : 1);
