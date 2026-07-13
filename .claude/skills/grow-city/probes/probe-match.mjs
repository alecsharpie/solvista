/* iter 240 — is there a MATCH, and does the ground go dark when there is not?
 *
 * The census is vacuous here (draw-only, no rng()), so this probe is the gate.
 *
 * Part A (TEMPORAL, 134/236 — no pixels, so no noise floor at all): the fixture list.
 *   HEAD is its own perfect control (236's corollary): its floodlights are gated on
 *   `LITAMT>0.3` alone, so the pitch is lit on 100% of nights, FOREVER, on every seed —
 *   a CONSTANT by construction, which is the defect stating itself. The patch must vary.
 *   Also prints each phase's length in SECONDS (the viewer's units, 236): a state that
 *   lasts >=7s cannot strobe, which is 134's law about a claim on cadence.
 *
 * Part B (INK, 230's mutate-the-DECISION rig): isolate the match inside ONE page —
 *   render the frozen world as shipped, then set `fixtureAt = () => -1` and render the
 *   SAME world again. The difference IS the match (crowd + floodlights + pitch glow), at
 *   a floor of EXACTLY 0, off the final composited canvas, so occlusion is checked free.
 *   Build-agnostic (234): it runs unchanged on HEAD and patch, with no source swap.
 *   CONTROL: on a NON-fixture night, suppressing the decision must change NOTHING (0 px)
 *   — and daylight-with-no-fixture likewise. A control that can move is not a control.
 *
 * Part C (the VIEWER'S units, 236/205): count the nights on which the pitch actually
 *   RENDERS its floodlit green, in a box aimed at the stadium — the same instrument on
 *   both builds. The claim is "the ground is dark unless there is a game", and that is a
 *   claim about how many nights a viewer sees a lit pitch, not about a predicate.
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
const NIGHTS = 12;          /* how many consecutive day-cycles to look at */
const TOD_NIGHT = 0.80;     /* after SUNDN (0.78): the floodlights' own regime */

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

/* freeze one world, aim a box at its stadium, and hand back a render()+grab() closure */
const RIG = (seed, warp) => {
  let s = 0x51F3A9C >>> 0;                   /* re-seed: the RAF loop ate an unknown number */
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  playing = false; STARS.length = 0; flock = null;
  genWorld(seed); __warp(warp);
  time = 40; waveT = 40;                     /* 195(f): playing=false is NOT a frozen clock */
  window.__rig = { seed };
};

const HAS_STADIUM = () => {
  const hits = [];
  for (let y = 0; y < G; y++) for (let x = 0; x < G; x++)
    if (cells[idx(x, y)].t === T.STADIUM) hits.push([x, y]);
  return hits;
};

/* ---------------- A: the fixture list, and its cadence ---------------- */
console.log('=== A. THE FIXTURE LIST (no pixels — pure predicate) ===');
console.log('    HEAD lights the pitch on 100% of nights, on every seed, by construction.\n');
const pageA = await open();
for (const seed of SEEDS) {
  const r = await pageA.evaluate(([seed, warp, N], ) => {
    let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    playing = false; genWorld(seed); __warp(warp);
    if (typeof fixtureAt !== 'function') return { head: true };
    let games = 0, eve = 0, aft = 0;
    const list = [];
    for (let d = 0; d < N; d++) {
      const ko = fixtureAt(d);
      if (ko < 0) { list.push('·'); continue; }
      games++; if (ko > 0.5) { eve++; list.push('N'); } else { aft++; list.push('a'); }
    }
    /* 200 days for a stable rate */
    let g2 = 0; for (let d = 0; d < 200; d++) if (fixtureAt(d) >= 0) g2++;
    return { games, eve, aft, list: list.join(''), rate: g2 / 200,
             play: MATCHDUR * 110, gate: MATCHGATE * 110 };
  }, [seed, WARP, NIGHTS]);
  if (r.head) { console.log(`  seed ${seed}: HEAD — no fixtureAt(); every night is floodlit.`); continue; }
  console.log(`  seed ${seed}: ${r.games}/${NIGHTS} of the next days have a game  [${r.list}]  `
    + `(N=evening, a=afternoon, ·=dark)   rate over 200 days = ${(r.rate * 100).toFixed(0)}%`);
  if (seed === SEEDS[SEEDS.length - 1])
    console.log(`\n  CADENCE (134): play lasts ${r.play.toFixed(0)}s, the gates ${r.gate.toFixed(0)}s `
      + `— on the 110s dayT clock. Nothing here can strobe.`);
}
await pageA.close();

/* ---------------- B + C: ink ---------------- */
console.log('\n=== B. THE MATCH, ISOLATED BY SUPPRESSING THE DECISION (one page, floor 0) ===');
const page = await open();
for (const seed of SEEDS) {
  const r = await page.evaluate(([seed, warp, tod, N], ) => {
    /* --- rig --- */
    let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    playing = false; STARS.length = 0; flock = null;
    genWorld(seed); __warp(warp);
    time = 40; waveT = 40;

    const stads = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++)
      if (cells[idx(x, y)].t === T.STADIUM) stads.push([x, y]);
    if (!stads.length) return { none: true };

    /* aim a box at the stadium (a TILE, so its own centre is honest) */
    const [sxh, syh] = stads[0];
    const c0 = ctr(sxh, syh);
    const sx = Math.round(c0[0] * scale + offX), sy = Math.round(c0[1] * scale + offY);
    const R = 90, dpr = window.devicePixelRatio || 1;
    const bx = Math.max(0, Math.round((sx - R) * dpr)), by = Math.max(0, Math.round((sy - R - 40) * dpr));
    const bw = Math.round(2 * R * dpr), bh = Math.round(2 * R * dpr);
    const g2 = cvs.getContext('2d');
    const grab = () => { render(); return g2.getImageData(bx, by, bw, bh).data; };
    const diff = (a, b) => { let n = 0; for (let i = 0; i < a.length; i += 4)
      if (Math.abs(a[i] - b[i]) + Math.abs(a[i+1] - b[i+1]) + Math.abs(a[i+2] - b[i+2]) > 12) n++; return n; };
    /* How bright is the PITCH? Threshold-free (205): a mean luminance over the turf, read
       the same way on both builds. HEAD lights it every night; the patch only on a fixture. */
    const pc = ctr(sxh, syh);
    const pxx = Math.round(pc[0] * scale + offX), pyy = Math.round(pc[1] * scale + offY);
    const PR = Math.max(3, Math.round(7 * scale)), PH = Math.max(2, Math.round(4 * scale));
    const pitchLum = () => {
      render();
      const d = g2.getImageData(Math.round((pxx - PR) * dpr), Math.round((pyy - 10 - PH) * dpr),
        Math.round(2 * PR * dpr), Math.round(2 * PH * dpr)).data;
      let t = 0, n = 0;
      for (let i = 0; i < d.length; i += 4) { t += 0.30 * d[i] + 0.59 * d[i+1] + 0.11 * d[i+2]; n++; }
      return t / n;
    };

    /* HEAD has no fixture at all: only Part C is meaningful there, and its answer is a
       CONSTANT — the defect stating itself (236). */
    if (typeof fixtureAt !== 'function') {
      const out = { head: true, hex: [sxh, syh], lum: [], fix: [] };
      for (let d = 0; d < N; d++) { __setTime(d + tod); out.lum.push(+pitchLum().toFixed(1)); out.fix.push('?'); }
      return out;
    }
    const real = fixtureAt;
    /* find an EVENING fixture, an AFTERNOON one, and a dark night, in the first N days */
    let dEve = -1, dAft = -1, dOff = -1;
    for (let d = 0; d < N; d++) {
      const ko = real(d);
      if (ko > 0.5 && dEve < 0) dEve = d;
      else if (ko > 0 && ko < 0.5 && dAft < 0) dAft = d;
      else if (ko < 0 && dOff < 0) dOff = d;
    }
    if (dEve < 0 || dOff < 0) return { none: true };

    const out = { dEve, dAft, dOff, hex: [sxh, syh] };
    const suppressed = fn => { fixtureAt = () => -1; const v = fn(); fixtureAt = real; return v; };

    /* FLOOR: the same frozen frame, rendered twice. Must be exactly 0. */
    __setTime(dEve + MATCHEVE + MATCHDUR * 0.5);
    const A1 = grab(), A2 = grab();
    out.floor = diff(A1, A2);

    /* TREATMENT 1 — an EVENING match: the crowd AND the floodlights. */
    out.eveInk = diff(A1, suppressed(grab));

    /* TREATMENT 2 — an AFTERNOON match: played in daylight, so flood=false and the ink
       here is the CROWD ALONE. It decomposes the number above without a second rig. */
    if (dAft >= 0) {
      __setTime(dAft + MATCHAFT + MATCHDUR * 0.5);
      const Af = grab();
      out.aftInk = diff(Af, suppressed(grab));
    }

    /* CONTROL 1: a night with NO fixture — suppressing the decision must change nothing */
    __setTime(dOff + MATCHEVE + MATCHDUR * 0.5);
    const C1 = grab();
    out.ctrlDarkNight = diff(C1, suppressed(grab));

    /* CONTROL 2: daylight, no fixture — likewise inert */
    __setTime(dOff + 0.30);
    const D1 = grab();
    out.ctrlDay = diff(D1, suppressed(grab));

    /* C: the PITCH'S OWN BRIGHTNESS, night by night. No threshold: just the number. */
    out.lum = [];
    for (let d = 0; d < N; d++) { __setTime(d + tod); out.lum.push(+pitchLum().toFixed(1)); }
    out.fix = [];
    for (let d = 0; d < N; d++) { const k = real(d); out.fix.push(k < 0 ? '·' : k > 0.5 ? 'N' : 'a'); }
    return out;
  }, [seed, WARP, TOD_NIGHT, NIGHTS]);

  if (r.none) { console.log(`  seed ${seed}: no stadium / no fixture in window — skipped`); continue; }
  if (r.head) {
    const u = [...new Set(r.lum)];
    console.log(`  seed ${seed}  (stadium at hex ${r.hex})  HEAD — no fixture exists`);
    console.log(`    PITCH LUMINANCE at tod ${TOD_NIGHT}, 12 nights: ${r.lum.join(' ')}`);
    console.log(`    DISTINCT VALUES: ${u.length}  <- 1 = the pitch is lit identically EVERY night\n`);
    continue;
  }
  console.log(`  seed ${seed}  (stadium at hex ${r.hex})`);
  console.log(`    floor (same frame twice)             ${String(r.floor).padStart(6)} px   <- must be 0`);
  console.log(`    EVENING match (crowd + floodlights)  ${String(r.eveInk).padStart(6)} px`);
  console.log(`    AFTERNOON match (the CROWD alone)    ${String(r.aftInk ?? '  n/a').padStart(6)} px`);
  console.log(`    control: dark night,  suppressed     ${String(r.ctrlDarkNight).padStart(6)} px   <- must be 0`);
  console.log(`    control: daylight,    suppressed     ${String(r.ctrlDay).padStart(6)} px   <- must be 0`);
  const lm = r.lum.map((v, i) => `${r.fix[i]}${String(v).padStart(5)}`).join(' ');
  console.log(`    PITCH LUMINANCE at tod ${TOD_NIGHT}, night by night (N/a = fixture, · = dark):`);
  console.log(`      ${lm}`);
}
await page.close();
await browser.close();
