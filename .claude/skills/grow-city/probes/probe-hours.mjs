/* probe-hours — does every LEISURE draw in Solvista keep an hour and a calendar?
 *
 * 271 gave the SURFERS an hour + a calendar and wrote the law: when a lap establishes a
 * property, ENUMERATE THE CATEGORY. 280 warns that the list a comment gives you is a
 * CHANGELOG of who has been fixed, not a TAXONOMY of who should read it. So this greps the
 * category by MEASUREMENT instead of by the comment at solvista.html:3924.
 *
 * PART A — TEMPORAL (134): every other gate in this harness is frozen, so "they never go
 *   home" has no instrument. Drives the artifact's own render() over a day x 2 seasons and
 *   counts, per draw fn, THE OBJECTS THE FRAME ACTUALLY ISSUES -- by instrumenting the ctx
 *   ops each draw emits (a draw that returned early emits none). Deterministic: NO PIXELS,
 *   so NO NOISE FLOOR AT ALL, nothing to stub but the clocks.
 *   HEADLINE NEEDS NO THRESHOLD (236): when the vector is "make X keep an hour", HEAD's
 *   answer is a CONSTANT by construction, so DISTINCT COUNTS = 1 *is* the defect, stated.
 *   POSITIVE CONTROLS (248): the SURFER and the JOGGER are correct siblings -- people on the
 *   same shoreline reading the same clock -- so a flat kayak column beside a live surfer
 *   column convicts the CITY, not the rig.
 *
 * PART B — 259'S CHECK, AND IT MUST RUN BEFORE A LINE OF THE FIX: does the thing you are
 *   about to REMOVE at night even RENDER at night? If it renders nothing, the hours half is
 *   dead before you write it. Isolated by suppressing the draw fn IN ONE PAGE (230) =>
 *   floor exactly 0, occlusion checked off the final composited canvas, BUILD-AGNOSTIC.
 *
 * BUILD-AGNOSTIC: it only hooks the artifact's own draw fns and reads its own predicates,
 * so ONE file grades HEAD and the patch with no source swap and no cross-build floor (230).
 */
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { homedir } from 'os';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;

const HERE = dirname(fileURLToPath(import.meta.url));
const ART = process.env.SRC || join(HERE, '../../../../solvista.html');
const SEEDS = [42, 7, 1234, 99, 5, 777];
const WARP = 61;

/* the leisure category, as measured rather than as remembered */
const FNS = ['drawKayak', 'drawKite', 'drawDog', 'drawSurfer', 'drawJogger', 'drawPed'];

const setup = async (page) => {
  await page.addInitScript(() => {
    let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  });
  await page.goto('file://' + ART);
  await page.waitForFunction(() => typeof window.__warp === 'function');
};

/* freeze EVERY clock the frame loop writes (275: enumerate them, don't wait to be burned) */
const freeze = (seed, warp) => {
  playing = false;
  time = 0; waveT = 0;
  genWorld(seed); __warp(warp);
  STARS.length = 0; flock = null;
  if (typeof __setWind === 'function') __setWind(0.5);
  for (const c of cells) if (c.h < c.th) c.h = c.th;   /* 272: render() mutates the world */
};

const run = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await setup(page);

  console.log(`ARTIFACT ${ART}\n`);

  /* ---------------- PART A ---------------- */
  console.log('PART A — objects the frame ISSUES, per draw fn, over the day x 2 seasons');
  console.log('  (DISTINCT = how many different counts the draw takes across the sweep.');
  console.log('   1 = the draw has no clock: a CONSTANT, forever. SURFER/JOGGER are the');
  console.log('   positive controls -- they provably keep an hour, so they MUST read > 1.)\n');

  const rows = [];
  for (const seed of SEEDS) {
    const r = await page.evaluate(({ seed, warp, FNS }) => {
      /* count the ctx ops each draw fn emits: a draw that returned early emits none */
      let OPS = 0;
      const C = document.querySelector('canvas').getContext('2d');
      for (const m of ['fill', 'stroke', 'fillRect', 'arc']) {
        const orig = C[m].bind(C);
        C[m] = (...a) => { OPS++; return orig(...a); };
      }
      const orig = {}, live = {};
      for (const f of FNS) {
        orig[f] = window[f];
        window[f] = function (...a) { const n0 = OPS; const v = orig[f].apply(this, a); if (OPS > n0) live[f]++; return v; };
      }

      playing = false; time = 0; waveT = 0;
      genWorld(seed); __warp(warp);
      STARS.length = 0; flock = null;
      if (typeof __setWind === 'function') __setWind(0.5);
      for (const c of cells) if (c.h < c.th) c.h = c.th;

      const pop = { kayaks: kayaks.length, kites: kites.length, dogs: dogs.length,
                    strays: dogs.filter(d => d.own < 0).length, surfers: surfers.length,
                    joggers: joggers.length };

      const seen = {}; for (const f of FNS) seen[f] = new Set();
      const nightMax = {}; for (const f of FNS) nightMax[f] = 0;

      /* sweep the DAY x two SEASONS (261: the light curve is a function of BOTH) */
      for (const year of [2035.62, 2035.02]) {          /* dry peak, midwinter */
        for (let i = 0; i < 96; i++) {           /* 96, not 24: the whole dusk is a couple of
                                                    pins at 24, and a 3-object thinning is
                                                    shorter than that. Resolution, not tuning. */
          const t = i / 96;
          __setYear(year); __setTime(t);
          for (const f of FNS) live[f] = 0;
          render();                                      /* recomputes SUNT / LITAMT / nightAmt */
          for (const f of FNS) {
            seen[f].add(live[f]);
            if (nightAmt() > 0.8) nightMax[f] = Math.max(nightMax[f], live[f]);
          }
        }
      }
      const out = {};
      for (const f of FNS) out[f] = { distinct: seen[f].size, max: Math.max(...seen[f]),
                                      min: Math.min(...seen[f]), deepNight: nightMax[f] };
      for (const f of FNS) window[f] = orig[f];
      return { pop, out };
    }, { seed, warp: WARP, FNS });
    rows.push({ seed, ...r });
  }

  console.log('  POPULATION per city');
  console.log('  seed |  kayaks  kites   dogs (strays)  surfers  joggers');
  for (const { seed, pop } of rows)
    console.log(`  ${String(seed).padStart(4)} | ${String(pop.kayaks).padStart(7)} ${String(pop.kites).padStart(6)} ${String(pop.dogs).padStart(6)} (${pop.strays})      ${String(pop.surfers).padStart(6)} ${String(pop.joggers).padStart(8)}`);

  console.log('\n  DISTINCT COUNTS over 48 pins (24 hours x 2 seasons)   [deep-night count in brackets]');
  const hdr = FNS.map(f => f.replace('draw', '').padStart(9)).join('');
  console.log('  seed |' + hdr);
  for (const { seed, out } of rows) {
    const cells = FNS.map(f => `${out[f].distinct}${out[f].deepNight ? '[' + out[f].deepNight + ']' : ''}`.padStart(9)).join('');
    console.log(`  ${String(seed).padStart(4)} |` + cells);
  }

  console.log('\n  RANGE (min..max drawn)');
  console.log('  seed |' + hdr);
  for (const { seed, out } of rows) {
    const cells = FNS.map(f => `${out[f].min}..${out[f].max}`.padStart(9)).join('');
    console.log(`  ${String(seed).padStart(4)} |` + cells);
  }

  /* ---------------- PART B ---------------- */
  console.log('\n\nPART B — 259: does it RENDER at night at all? (if not, the fix is invisible)');
  console.log('  ink = CSS px the draw provably puts on the final frame, isolated by');
  console.log('  suppressing its own fn in ONE page (floor exactly 0, occlusion free).\n');
  console.log('  seed | hour   | kayak ink  (px/kayak) | surfer ink (px/surfer)  <- control, 271 measured ~13/surfer');

  for (const seed of SEEDS.slice(0, 3)) {
    for (const [label, t] of [['noon ', 0.42], ['night', 0.92]]) {
      const r = await page.evaluate(({ seed, warp, t }) => {
        playing = false; time = 0; waveT = 0;
        genWorld(seed); __warp(warp);
        STARS.length = 0; flock = null;
        if (typeof __setWind === 'function') __setWind(0.5);
        for (const c of cells) if (c.h < c.th) c.h = c.th;
        __setYear(2035.62); __setTime(t);

        const cv = document.querySelector('canvas');
        const C = cv.getContext('2d');
        const grab = () => { render(); return C.getImageData(0, 0, cv.width, cv.height).data; };
        const diff = (a, b) => { let n = 0; for (let i = 0; i < a.length; i += 4)
          if (Math.abs(a[i] - b[i]) + Math.abs(a[i + 1] - b[i + 1]) + Math.abs(a[i + 2] - b[i + 2]) > 8) n++; return n; };

        const A = grab();
        const dpr = window.devicePixelRatio || 1, sc = 1 / (dpr * dpr);

        const ok = drawKayak; drawKayak = () => {}; const B = grab(); drawKayak = ok;
        const os = drawSurfer; drawSurfer = () => {}; const S = grab(); drawSurfer = os;
        const A2 = grab();                                   /* the floor: must be 0 */

        return { kayak: diff(A, B) * sc, surfer: diff(A, S) * sc, floor: diff(A, A2) * sc,
                 nk: kayaks.length, ns: surfers.length };
      }, { seed, warp: WARP, t });
      const pk = r.nk ? (r.kayak / r.nk).toFixed(1) : '—';
      const ps = r.ns ? (r.surfer / r.ns).toFixed(1) : '—';
      console.log(`  ${String(seed).padStart(4)} | ${label} | ${r.kayak.toFixed(0).padStart(9)}  (${pk.padStart(5)}) | ${r.surfer.toFixed(0).padStart(9)}  (${ps.padStart(5)})   floor ${r.floor.toFixed(0)}`);
    }
  }

  await browser.close();
};
run();
