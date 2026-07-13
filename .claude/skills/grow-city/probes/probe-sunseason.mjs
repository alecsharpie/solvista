#!/usr/bin/env node
/* probe-sunseason.mjs — DOES THE LIGHT KEEP A CALENDAR? (iter 253)
 *
 * The cue (aq, iter 252): `daylight()` is indexed by the HOUR and carries no `year` term, so
 * the sky, the tint every surface's colour passes through, and the low sky's warmth are
 * IDENTICAL in January and July. Two blind agents, two seeds: "no cooler light, same sky,
 * same sun." The banked instrument (probe-seasonarea) can only see TILES — which is exactly
 * why the loop spent laps on vegetation. This one measures the LIGHT.
 *
 * ⚠ IT DOES NOT DIFF PATCH-vs-HEAD, AND THAT IS THE POINT (230). The first cut did, and its
 *   HEAD-vs-HEAD floor was 20,000-34,000 px: two loads of the SAME file drift that far through
 *   genWorld even with the PRNG stubbed, the clocks pinned and every mover cleared. A claim of
 *   "EXACTLY 0" cannot be made from under a floor of 20,000. So both halves stay inside ONE
 *   build:
 *
 *  A. THE LEVERS, IN PURE JS — no render, no clock, NO NOISE FLOOR AT ALL. Call daylight(t)
 *     itself in each build and compare the numbers it returns, bit for bit. This is the whole
 *     gate, and it has two free EXACT controls:
 *       - THE FIXED POINT (245): seasonCool() is centred on the dry peak, so at s=0.62 every
 *         lever collapses to HEAD's literal ⇒ daylight() must return BIT-IDENTICAL values at
 *         EVERY hour. An exact, falsifiable proof that a seasonal light adds no draw work.
 *       - THE DEAD REGIME (199): the term is gated by (1-lit), so at night the branch cannot
 *         run ⇒ BIT-IDENTICAL in EVERY season. The lamplit city keeps its own colour.
 *
 *  B. THE FEATURE'S OWN INK, IN ONE PAGE (230's mutate-the-data rig; floor EXACTLY 0). Render
 *     the frozen world as shipped, then force seasonCool()=0 — which is precisely HEAD's code
 *     path, since c=0 skips the branch — and render the same world again. The difference IS
 *     the feature, off the final composited frame, with occlusion checked for free.
 *
 *  C. THE DIRECTION, IN THE VIEWER'S UNIT (205/214). |dRGB| is a MAGNITUDE and cannot say
 *     "cooler" — the complaint's noun is a COLOUR word, so measure COLOUR: warmth = mean(R) -
 *     mean(B) over the frame. HEAD is NOT flat here and should not be: its GROUND already has
 *     a calendar (the grass goes gold), worth ~-3.7. That is the baseline the LIGHT adds to.
 *
 *  D. GWARM — the low sky's warmth, read by FIVE existing features (the sea's golden sheen,
 *     the cloud bellies, the glass rake, the sun's own colour). It inherits the calendar for
 *     free, so its seasonal swing is a coupling to MEASURE, not to assume (223).
 *
 * ⚠ page.screenshot(), never getImageData: the sky is the BODY'S CSS GRADIENT and every
 *   canvas-readback probe in this harness is structurally blind to it (200/248).
 * ⚠ Never name a frame's hour parameter `dayT` — it shadows the page's global and __setTime
 *   then pins every frame to the same hour (this probe's first cut did: all three hours came
 *   back with an identical changed-px count and the "night" frame self-reported LITAMT=0.027).
 *
 *   node probe-sunseason.mjs
 */
import { homedir, tmpdir } from 'node:os';
import { writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));

const ART = join(HERE, '../../../../solvista.html');
const PATCH = pathToFileURL(process.env.PATCH || ART).href;
/* pristine HEAD comes from git itself, never from a /tmp file an earlier run happened to leave:
   a banked probe must run on a cold checkout (101 — the ledger cited probes the repo did not
   contain). Part A needs it; parts B/C/D do not (they suppress the predicate in ONE page). */
const headFile = process.env.HEAD || join(tmpdir(), 'solvista-head-sunseason.html');
if (!process.env.HEAD)
  writeFileSync(headFile, execSync('git show HEAD:solvista.html', { cwd: dirname(ART), maxBuffer: 1 << 26 }));
const HEAD = pathToFileURL(headFile).href;

const SEEDS = [7, 42];
const WARP = 61;
/* the light pins come off the LIGHT CURVE, never from intuition (202): KEYS puts full day at
   0.30, the golden peak at 0.68 (GWARM peaks 0.786 at 0.70) and true night at 0.92. */
const HOURS = [['day', 0.30], ['golden', 0.68], ['night', 0.92]];
const SEASONS = [['winter', 0.02], ['spring', 0.30], ['dry-peak', 0.62], ['autumn', 0.87]];
const CLIP = { x: 360, y: 0, width: 1240, height: 880 };   /* the HUD owns the corners (200) */

const b = await chromium.launch();
const open = async src => {
  const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
  await p.addInitScript(() => {                     /* 213: stub before the page's own script */
    let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  });
  await p.goto(src); await p.waitForTimeout(400);
  return p;
};
const P = await open(PATCH), H = await open(HEAD);

/* ---------- A. THE LEVERS, IN PURE JS ---------- */
const levers = (p, year, hour) => p.evaluate(([y, t]) => {
  year = y;
  const d = daylight(t);
  const f = a => a.map(v => v.toPrecision(17)).join(',');   /* bit-exact, not rounded */
  return { key: f(d.tint) + '|' + f(d.skyTop) + '|' + f(d.skyBot) + '|' + d.lit.toPrecision(17),
           tint: d.tint.map(v => +v.toFixed(4)),
           skyBot: d.skyBot.map(v => +v.toFixed(1)),
           lit: +d.lit.toFixed(3),
           cool: +(0.5 - 0.5 * Math.cos(6.2831853 * (((y % 1) + 1) % 1 - 0.62))).toFixed(4) };
}, [year, hour]);

console.log('\n\x1b[1mA. THE LEVERS — daylight() itself, compared BIT FOR BIT between builds.\x1b[0m');
console.log('   Pure JS: no render, no clock, no movers, NO NOISE FLOOR AT ALL.\n');
console.log('   season     cool   hour     patch tint              HEAD tint              bit-identical?');
console.log('   ---------------------------------------------------------------------------------------');
let ctlFail = 0, treated = 0;
for (const [sn, sv] of SEASONS) {
  for (const [hn, hv] of HOURS) {
    const y = 2035 + sv;
    const a = await levers(P, y, hv), c = await levers(H, y, hv);
    const same = a.key === c.key;
    /* the two EXACT controls: the fixed point (s=0.62, any hour) and the dead regime (night) */
    const isCtl = sn === 'dry-peak' || hn === 'night';
    let verdict;
    if (isCtl) { verdict = same ? '\x1b[32mIDENTICAL ✅ control\x1b[0m' : '\x1b[31mFAIL — control moved\x1b[0m';
                 if (!same) ctlFail++; }
    else { verdict = same ? '\x1b[31mFAIL — no calendar\x1b[0m' : 'differs  (treatment)';
           if (!same) treated++; }
    console.log(`   ${sn.padEnd(9)} ${String(a.cool).padStart(6)}  ${hn.padEnd(7)} ` +
                `[${a.tint.join(', ')}]`.padEnd(23) + ` [${c.tint.join(', ')}]`.padEnd(24) + ` ${verdict}`);
  }
}
console.log(`\n   controls that moved: ${ctlFail} (must be 0)   ·   treatment cells that differ: ${treated} (must be ${(SEASONS.length-1)*(HOURS.length-1)})`);

/* ---------- B/C/D. ONE PAGE, SUPPRESS THE DECISION (230) ---------- */
const frame = (p, seed, year, hour, kill) => p.evaluate(([seed, year, hour, warp, kill]) => {
  playing = false;
  let s = 0x2F6E2B1 >>> 0;                          /* the STREAM POSITION at load is wall-clock
                                                       dependent, so re-seed in-page too (248) */
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  if (!window.__realCool) window.__realCool = seasonCool;
  /* SUPPRESS THE DECISION (230): seasonCool()=0 makes c=0, the branch is skipped, and daylight()
     runs HEAD's code path exactly — inside the SAME page, so the floor is 0 by construction. */
  window.seasonCool = kill ? () => 0 : window.__realCool;
  time = 0; waveT = 0; dayT = hour;                 /* pin the clocks BEFORE the world is built */
  genWorld(seed); __warp(warp);
  __setYear(year); __setTime(hour);
  STARS.length = 0; flock = null; clouds.length = 0;
  for (const a of [vehicles, bikes, trams, trucks, peds, dogs, boats, ferries, freighters,
                   kayaks, surfers, whales, dolphins, herons, deer, joggers, balloons,
                   birds, copters, shuttles]) if (Array.isArray(a)) a.length = 0;
  CCACHE = {};
  lastSky = 0; syncSky(performance.now()); syncStats();   /* 204: a frozen clock does not refresh
                                                       the DOM — and the sky IS the DOM */
  render();
  return { GWARM: +GWARM.toFixed(4), LITAMT: +LITAMT.toFixed(3) };
}, [seed, year, hour, WARP, kill]);

const dec = await b.newPage();
const px = (a, c) => dec.evaluate(async ([a, c]) => {
  const ld = u => new Promise(r => { const i = new Image(); i.onload = () => r(i); i.src = u; });
  const [ia, ic] = await Promise.all([ld(a), ld(c)]);
  const cv = document.createElement('canvas'); cv.width = ia.width; cv.height = ia.height;
  const g = cv.getContext('2d', { willReadFrequently: true });
  g.drawImage(ia, 0, 0); const A = g.getImageData(0, 0, cv.width, cv.height).data;
  g.clearRect(0, 0, cv.width, cv.height);
  g.drawImage(ic, 0, 0); const C = g.getImageData(0, 0, cv.width, cv.height).data;
  let n = 0, r = 0, bl = 0, m = 0;
  for (let i = 0; i < A.length; i += 4) {
    if (A[i] !== C[i] || A[i + 1] !== C[i + 1] || A[i + 2] !== C[i + 2]) n++;
    r += A[i]; bl += A[i + 2]; m++;
  }
  return { n, warm: +((r - bl) / m).toFixed(2) };
}, [`data:image/png;base64,${a.toString('base64')}`,      /* base64: a blank page cannot load file:// */
    `data:image/png;base64,${c.toString('base64')}`]);

const shot = async (p, seed, y, h, kill) => {
  const st = await frame(p, seed, y, h, kill);
  return { st, full: await p.screenshot(), clip: await p.screenshot({ clip: CLIP }) };
};

console.log('\n\x1b[1mB. THE FEATURE\'S OWN INK — shipped vs seasonCool()=0, IN ONE PAGE (floor exactly 0).\x1b[0m\n');
console.log('   seed  season     hour      changed px      GWARM (on / off)   verdict');
console.log('   ---------------------------------------------------------------------------------');
const W = {};
for (const seed of SEEDS) {
  for (const [sn, sv] of SEASONS) {
    for (const [hn, hv] of HOURS) {
      const y = 2035 + sv;
      const on = await shot(P, seed, y, hv, false);
      const off = await shot(P, seed, y, hv, true);
      const d = await px(on.full, off.full);
      const wc = await px(on.clip, off.clip);
      W[`${seed}|${sn}|${hn}`] = { on: wc.warm, off: (await px(off.clip, off.clip)).warm,
                                   g: on.st.GWARM, g0: off.st.GWARM };
      const isCtl = sn === 'dry-peak' || hn === 'night';
      const v = isCtl ? (d.n === 0 ? '\x1b[32mEXACTLY 0 ✅ control\x1b[0m' : `\x1b[31mFAIL — control moved\x1b[0m`)
                      : (d.n > 50000 ? 'treatment' : '\x1b[31mWEAK\x1b[0m');
      console.log(`   ${String(seed).padStart(4)}  ${sn.padEnd(9)} ${hn.padEnd(7)} ` +
                  `${String(d.n).padStart(12)}   ${String(on.st.GWARM).padStart(6)} / ` +
                  `${String(off.st.GWARM).padEnd(6)}   ${v}`);
    }
  }
}

console.log('\n\x1b[1mC. DIRECTION — warmth = mean(R) - mean(B) over the frame (the viewer\'s unit).\x1b[0m');
console.log('   HEAD is NOT flat and should not be: its GROUND already has a calendar (the grass');
console.log('   goes gold). That ~-3.7 is the baseline the LIGHT adds to.\n');
console.log('   seed  hour     build            winter   dry-peak    winter - peak');
console.log('   ---------------------------------------------------------------------------------');
for (const seed of SEEDS) {
  for (const [hn] of HOURS.slice(0, 2)) {
    for (const tag of ['HEAD (light off)', 'patch (light on)']) {
      const k = tag[0] === 'H' ? 'off' : 'on';
      const w = W[`${seed}|winter|${hn}`][k], d = W[`${seed}|dry-peak|${hn}`][k];
      const dl = +(w - d).toFixed(2);
      const note = k === 'off' ? '  <-- the GROUND\'s calendar only'
                 : (dl < -8 ? '  \x1b[32m<-- COOLER in winter ✅\x1b[0m' : '  \x1b[31m<-- FAIL: not cooler\x1b[0m');
      console.log(`   ${String(seed).padStart(4)}  ${hn.padEnd(7)}  ${tag.padEnd(17)}` +
                  `${String(w).padStart(7)} ${String(d).padStart(10)} ${String(dl).padStart(14)}${note}`);
    }
  }
}

console.log('\n\x1b[1mD. GWARM — the low sky\'s warmth, read by FIVE existing features.\x1b[0m');
console.log('   Winter must SOFTEN the golden hour, not cancel it.\n');
console.log('   seed  season      GWARM at the golden pin (t=0.68)');
console.log('   ---------------------------------------------------------------------------------');
for (const seed of SEEDS)
  for (const [sn] of SEASONS)
    console.log(`   ${String(seed).padStart(4)}  ${sn.padEnd(10)}  ${W[`${seed}|${sn}|golden`].g}` +
                `   (light off: ${W[`${seed}|${sn}|golden`].g0})`);

await b.close();
