/* iter 319 — do fireworks bloom over the ground on a big evening match, and ONLY then?
 *
 * The census is vacuous here (draw-only, no rng()), so this probe is the gate. The
 * vector CONNECTS the existing match calendar (matchClock/fixtureAt, 240) to the
 * existing decade-festival firework grammar (over the pier since 1980) — a display
 * over the stadium at the final whistle of a "cup night".
 *
 * Part A (TEMPORAL, 134/236 — no pixels, so no noise floor at all): matchCelebrate()
 *   over the day. It must be NONZERO only in the short window after the final whistle
 *   (kickoff + MATCHDUR .. + CELEBWIN) of a big-night fixture, and ZERO everywhere else
 *   — every ordinary night, every no-fixture day, and every hour outside the window.
 *   HEAD is its own control (236): it has no matchCelebrate at all, so its display is a
 *   CONSTANT zero, every night, forever — the absence stating itself. The patch must
 *   fire on some nights and not others. Also prints the window length in SECONDS (236):
 *   a display lasting >=CELEBWIN*110s cannot strobe.
 *
 * Part B (INK, 253's suppress-the-PREDICATE rig — floor EXACTLY 0, one page, build-
 *   agnostic): render the frozen world at the peak of a big EVENING night's window as
 *   shipped, then force `matchCelebrate = () => 0` and render the SAME world again. The
 *   difference IS the fireworks. And forcing it to 0 IS HEAD's behaviour, so the
 *   suppressed frame is the exact FIXED POINT — the patch reduces to HEAD when no big
 *   night is on. CONTROLS that must read 0 px:
 *     - an ORDINARY night (fixture, not a cup night): suppression changes nothing;
 *     - a NO-FIXTURE night: nothing to celebrate;
 *     - DAYLIGHT during a big-night afternoon whistle: the LITAMT>0.6 gate shows nothing.
 *
 * Part C (the VIEWER'S units, 236/205): over N days, how many nights does a viewer
 *   actually SEE fireworks over the ground — i.e. big-night EVENING fixtures whose
 *   whistle falls after dark. That is the claim, not a predicate.
 */
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'path';
import { homedir } from 'os';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '../../../../');   /* relative to the PROBE, never absolute */
const ART = join(ROOT, process.env.SRC || 'solvista.html');

const SEEDS = [42, 7, 1234];
const WARP = 61;
const DAYS = 60;            /* how many consecutive day-cycles to survey */

const browser = await chromium.launch();
async function open() {
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.addInitScript(() => {           /* 213: stub BEFORE the page's own script */
    let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  });
  await page.goto(pathToFileURL(ART).href);
  await page.waitForTimeout(400);
  return page;
}

/* ---------------- A: the display's schedule, and its cadence ---------------- */
console.log('=== A. THE DISPLAY SCHEDULE (no pixels — pure predicate) ===');
console.log('    HEAD has no matchCelebrate(): its display is a constant 0, every night.\n');
const pageA = await open();
for (const seed of SEEDS) {
  const r = await pageA.evaluate(([seed, warp, N], ) => {
    let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    playing = false; genWorld(seed); __warp(warp);
    if (typeof matchCelebrate !== 'function') return { head: true };
    /* survey each day: is there a fixture, is it a big night, is it evening? */
    let fixtures = 0, big = 0, bigEve = 0;
    const mark = [];
    for (let d = 0; d < N; d++) {
      const ko = fixtureAt(d);
      if (ko < 0) { mark.push('·'); continue; }
      fixtures++;
      /* peek at the window: sample matchCelebrate at the whistle for day d */
      dayT = d + ko + MATCHDUR + 0.001;
      const cel = matchCelebrate();
      if (cel > 0) { big++; if (ko > 0.5) { bigEve++; mark.push('*'); } else mark.push('a'); }
      else mark.push(ko > 0.5 ? 'N' : 'a');
    }
    /* window shape for ONE big night: sweep the whole day, list where cel>0 */
    let bigDay = -1;
    for (let d = 0; d < N; d++) { const ko = fixtureAt(d); if (ko < 0) continue;
      dayT = d + ko + MATCHDUR + 0.001; if (matchCelebrate() > 0 && ko > 0.5) { bigDay = d; break; } }
    let on = 0, off = 0, winMax = 0, koB = -1;
    if (bigDay >= 0) {
      koB = fixtureAt(bigDay);
      for (let f = 0; f < 1; f += 1 / 220) { dayT = bigDay + f; const c = matchCelebrate();
        if (c > 0) { on++; winMax = Math.max(winMax, c); } else off++; }
    }
    /* 400 days for a stable rate */
    let g = 0, b = 0;
    for (let d = 0; d < 400; d++) { const ko = fixtureAt(d); if (ko < 0) continue; g++;
      dayT = d + ko + MATCHDUR + 0.001; if (matchCelebrate() > 0) b++; }
    return { fixtures, big, bigEve, mark: mark.join(''),
             fixRate: g / 400, bigRate: b / 400, bigOfFix: b / g,
             winFrac: on / (on + off), winSec: (on / 220) * 110, winMax: +winMax.toFixed(2), koB };
  }, [seed, WARP, DAYS]);
  if (r.head) { console.log(`  seed ${seed}: HEAD — no matchCelebrate(); no display ever.`); continue; }
  console.log(`  seed ${seed}: ${r.fixtures}/${DAYS} days have a fixture, ${r.big} are cup nights `
    + `(${r.bigEve} evening = SEEN)  [${r.mark}]`);
  console.log(`             (* = big evening, a/N = ordinary fixture, · = dark)`);
  console.log(`             rate over 400 days: fixtures ${(r.fixRate*100).toFixed(0)}%, `
    + `cup nights ${(r.bigRate*100).toFixed(0)}% of days = ${(r.bigOfFix*100).toFixed(0)}% of fixtures `
    + `(design CELEBP=34%)`);
  if (r.koB >= 0)
    console.log(`             window: cel>0 for ${(r.winFrac*100).toFixed(1)}% of the day = `
      + `${r.winSec.toFixed(1)}s after the whistle, peak ${r.winMax} (134: >=1s, cannot strobe)\n`);
  else console.log('');
}
await pageA.close();

/* ---------------- B + C: ink ---------------- */
console.log('=== B. THE DISPLAY, ISOLATED BY SUPPRESSING THE PREDICATE (one page, floor 0) ===');
const page = await open();
for (const seed of SEEDS) {
  const r = await page.evaluate(([seed, warp, N], ) => {
    let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    playing = false; STARS.length = 0; flock = null;
    genWorld(seed); __warp(warp);
    time = 40; waveT = 40;                     /* 195(f): playing=false is NOT a frozen clock */
    if (typeof matchCelebrate !== 'function') return { head: true };

    const stads = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++)
      if (cells[idx(x, y)].t === T.STADIUM) stads.push([x, y]);
    if (!stads.length) return { none: true };
    const [sxh, syh] = stads[0];
    const c0 = ctr(sxh, syh);
    const sx = Math.round(c0[0] * scale + offX), sy = Math.round(c0[1] * scale + offY);
    const R = 120, dpr = window.devicePixelRatio || 1;
    /* the fireworks sit ABOVE the ground (by0-64..-98), so bias the box upward */
    const bx = Math.max(0, Math.round((sx - R) * dpr)), by = Math.max(0, Math.round((sy - R - 70) * dpr));
    const bw = Math.round(2 * R * dpr), bh = Math.round(2 * R * dpr);
    const g2 = cvs.getContext('2d');
    const grab = () => { render(); return g2.getImageData(bx, by, bw, bh).data; };
    const diff = (a, b) => { let n = 0; for (let i = 0; i < a.length; i += 4)
      if (Math.abs(a[i]-b[i]) + Math.abs(a[i+1]-b[i+1]) + Math.abs(a[i+2]-b[i+2]) > 12) n++; return n; };

    const realFix = fixtureAt, realCel = matchCelebrate;
    /* find a big EVENING night, an ORDINARY (fixture, not-big) night, a DARK night,
       and a big AFTERNOON night in the first N days */
    let dBigEve = -1, dOrd = -1, dOff = -1, dBigAft = -1;
    for (let d = 0; d < N && (dBigEve < 0 || dOrd < 0 || dOff < 0); d++) {
      const ko = realFix(d);
      if (ko < 0) { if (dOff < 0) dOff = d; continue; }
      dayT = d + ko + MATCHDUR + 0.001; const big = realCel() > 0;
      if (big && ko > 0.5 && dBigEve < 0) dBigEve = d;
      else if (big && ko < 0.5 && dBigAft < 0) dBigAft = d;
      else if (!big && dOrd < 0) dOrd = d;
    }
    if (dBigEve < 0) return { noBig: true, hex: [sxh, syh] };

    const out = { hex: [sxh, syh], dBigEve, dOrd, dOff, dBigAft };
    const suppressed = fn => { matchCelebrate = () => 0; const v = fn(); matchCelebrate = realCel; return v; };
    const koE = realFix(dBigEve);

    /* peak of the display: a hair after the whistle */
    __setTime(dBigEve + koE + MATCHDUR + 0.005);
    const A1 = grab(), A2 = grab();
    out.floor = diff(A1, A2);                       /* same frame twice -> must be 0 */
    out.litamt = +LITAMT.toFixed(2);
    out.fireInk = diff(A1, suppressed(grab));        /* the fireworks */

    /* CONTROL 1: an ordinary fixture night, same window position — no display */
    if (dOrd >= 0) { const ko = realFix(dOrd); __setTime(dOrd + ko + MATCHDUR + 0.005);
      const C = grab(); out.ctrlOrd = diff(C, suppressed(grab)); }
    /* CONTROL 2: a no-fixture night */
    if (dOff >= 0) { __setTime(dOff + koE + MATCHDUR + 0.005);
      const C = grab(); out.ctrlOff = diff(C, suppressed(grab)); }
    /* CONTROL 3: a big AFTERNOON night — whistle in daylight, gate LITAMT>0.6 shows nothing */
    if (dBigAft >= 0) { const ko = realFix(dBigAft); __setTime(dBigAft + ko + MATCHDUR + 0.005);
      const C = grab(); out.ctrlAft = diff(C, suppressed(grab)); out.aftLit = +LITAMT.toFixed(2); }

    /* C: over N days, count the nights a viewer SEES fireworks (big evening, whistle dark) */
    let seen = 0;
    for (let d = 0; d < N; d++) { const ko = realFix(d); if (ko < 0) continue;
      __setTime(d + ko + MATCHDUR + 0.005); render();   /* LITAMT is recomputed in render() */
      if (realCel() > 0 && LITAMT > 0.6) seen++; }
    out.seen = seen;
    return out;
  }, [seed, WARP, DAYS]);

  if (r.head) { console.log(`  seed ${seed}: HEAD — no display exists.`); continue; }
  if (r.none) { console.log(`  seed ${seed}: no stadium — skipped`); continue; }
  if (r.noBig) { console.log(`  seed ${seed}: no big evening night in first ${DAYS} days — skipped`); continue; }
  console.log(`  seed ${seed}  (stadium at hex ${r.hex})  days: bigEve=${r.dBigEve} ord=${r.dOrd} off=${r.dOff} bigAft=${r.dBigAft}`);
  console.log(`    floor (same frame twice)                 ${String(r.floor).padStart(6)} px   <- must be 0`);
  console.log(`    FIREWORKS (big evening whistle, LITAMT ${r.litamt}) ${String(r.fireInk).padStart(6)} px`);
  console.log(`    control: ORDINARY fixture night          ${String(r.ctrlOrd ?? '  n/a').padStart(6)} px   <- must be 0`);
  console.log(`    control: NO-fixture night                ${String(r.ctrlOff ?? '  n/a').padStart(6)} px   <- must be 0`);
  console.log(`    control: big AFTERNOON (daylight, LITAMT ${r.aftLit ?? '?'})  ${String(r.ctrlAft ?? '  n/a').padStart(6)} px   <- must be 0`);
  console.log(`    C (viewer): nights fireworks SEEN in ${DAYS} = ${r.seen}\n`);
}
await page.close();
await browser.close();
