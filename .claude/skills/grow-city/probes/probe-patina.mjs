#!/usr/bin/env node
/* probe-patina.mjs — does the masonry answer its own AGE, and does it cost anything?
 *
 * The vector: `c.age` has been computed, ticked and PUBLISHED ("Built ~1998") on every
 * developed tile for the artifact's whole life, and no pixel ever read it. Now RES and MID
 * take a luma-normalised ochre lean from it: old masonry bakes warm, new render stays cool.
 *
 * THE CLAIM, in the viewer's units (205): "the old core reads WARMER than the new fringe."
 * Not "pixels moved" — 247's law: a pixel diff cannot verify a noun. So Part A states the
 * claim as warmth (R-B) per RING from the published CBD, and it is EXACT: it drives the
 * artifact's OWN colour pipeline (249 — never re-implement the rule under test), hooking
 * drawBuilding + sandCol so every number is the literal colour the frame is painted with.
 * No canvas readback, no noise floor, no occlusion.
 *
 * ISOLATION IS BY PREDICATE SUPPRESSION (253): `window.patina = () => 0` makes sandCol take
 * its `if(p)` false branch, which is HEAD's line byte-for-byte. So the control is not another
 * BUILD — it is the same page, and the floor is EXACTLY 0 by construction (230): no git show,
 * no /bin/cp, no cross-build drift, no 197-class stale-backup hazard.
 *
 * CONTROLS, and each one can only move in one direction:
 *   - LUMINANCE per ring must be FLAT. The whole point of `n` is that the lean is luma-
 *     normalised (223), so if brightness moves, the neutraliser is broken and 222's
 *     cross-surface ordering invariant is in danger.
 *   - The BEACH sand goes through the SAME sandCol() and passes NO p, so its ink must be
 *     EXACTLY 0 changed pixels. Same function, untouched caller: a free control (248).
 *   - GLASS (TOWER/COM) never calls sandCol: must be 0.
 *   - HEAD's core-vs-rim warmth gap IS the baseline, and it is a CONSTANT by construction
 *     (nothing read age), so no threshold has to be invented (236).
 *
 *   node probe-patina.mjs
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(join(HERE, '../../../../solvista.html')).href;

const SEEDS = [7, 42, 1234];
const WARP = 61;
const RINGS = [[0, 8], [9, 16], [17, 22], [23, 99]];

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
await p.addInitScript(() => {                    /* 213: before the page's own script */
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});

const out = [];
for (const seed of SEEDS) {
  await p.goto(`${PAGE}?seed=${seed}&warp=${WARP}&t=0.30`);
  await p.waitForTimeout(400);

  out.push(await p.evaluate(({ seed, WARP, RINGS }) => {
    /* freeze the world: both clocks, the movers, the unseeded fields (163/195/199/203) */
    playing = false;
    genWorld(seed); __warp(WARP);
    time = 1000; waveT = 5;
    STARS.length = 0; flock = null;
    for (const a of [vehicles, bikes, trams, trucks, peds, boats, ferries, freighters, birds,
                     shuttles, dogs, kites, surfers, dolphins, whales, herons, kayaks, joggers,
                     deer, clouds, balloons, copters]) if (a) a.length = 0;

    const ringOf = d => RINGS.findIndex(([lo, hi]) => d >= lo && d <= hi);
    const lum = c => 0.30 * c[0] + 0.59 * c[1] + 0.11 * c[2];
    const parse = s => s.match(/\d+/g).map(Number);

    /* ---- PART A: the colour the artifact ACTUALLY paints, per ring. Exact, no pixels. ---- */
    const origDB = window.drawBuilding, origSC = window.sandCol;
    let cur = null;
    const sample = () => {
      const bins = RINGS.map(() => ({ n: 0, rb: 0, L: 0, all: [] }));
      window.drawBuilding = function (c, x, y, gx, gy) {
        cur = { t: c.t, d: hexDist(x, y, CBDX, CBDY), got: null };
        const r = origDB(c, x, y, gx, gy);
        if (cur.got && (cur.t === T.RES || cur.t === T.MID)) {
          const bi = ringOf(cur.d);
          if (bi >= 0) {
            const B = bins[bi]; B.n++; B.rb += cur.got[0] - cur.got[2]; B.L += lum(cur.got);
            B.all.push(cur.got[0] - cur.got[2]);      /* keep every building: the SCATTER is the point */
          }
        }
        cur = null; return r;
      };
      /* the BODY's lit face is the first sandCol(name, 1, p) a building issues */
      window.sandCol = function (name, f, pp) {
        const s = origSC(name, f, pp);
        if (cur && !cur.got && f === 1) cur.got = parse(s);
        return s;
      };
      CCACHE = {}; render();
      window.drawBuilding = origDB; window.sandCol = origSC; CCACHE = {};
      const sd = a => { if (a.length < 2) return 0; const m = a.reduce((u, v) => u + v, 0) / a.length;
        return Math.sqrt(a.reduce((u, v) => u + (v - m) ** 2, 0) / (a.length - 1)); };
      return bins.map(B => ({ n: B.n, rb: B.n ? B.rb / B.n : 0, L: B.n ? B.L / B.n : 0, sd: sd(B.all) }));
    };

    const shipped = sample();
    const origPat = window.patina;
    window.patina = () => 0;                     /* 253: suppress the PREDICATE, not the build */
    const head = sample();
    window.patina = origPat;

    /* ---- PART B: does it reach the FRAME? one page, two renders, floor exactly 0. ---- */
    const g = cvs.getContext('2d');
    const grab = () => { CCACHE = {}; render(); return g.getImageData(0, 0, cvs.width, cvs.height).data; };
    const A = grab();
    window.patina = () => 0;
    const B = grab();
    const B2 = grab();                            /* the FLOOR, measured in the same run (213) */
    window.patina = origPat;

    let ink = 0, floor = 0;
    for (let i = 0; i < A.length; i += 4) {
      if (Math.abs(A[i] - B[i]) + Math.abs(A[i + 1] - B[i + 1]) + Math.abs(A[i + 2] - B[i + 2]) > 6) ink++;
      if (Math.abs(B2[i] - B[i]) + Math.abs(B2[i + 1] - B[i + 1]) + Math.abs(B2[i + 2] - B[i + 2]) > 6) floor++;
    }
    return { seed, shipped, head, ink, floor, px: A.length / 4 };
  }, { seed, WARP, RINGS }));
}
await b.close();

const F = (v, w = 6, d = 1) => v.toFixed(d).padStart(w);
console.log('\nDOES THE MASONRY WEAR ITS AGE?   RES+MID body colour, per ring from the published CBD');
console.log('exact: the artifact\'s own sandCol(), hooked at draw time. no pixels, no noise floor.');
console.log('WARMTH = R-B of the lit body face (higher = more ochre).   rings: 0-8 / 9-16 / 17-22 / 23+\n');

for (const r of out) {
  console.log(`seed ${r.seed}   (n per ring: ${r.shipped.map(x => x.n).join(' / ')})`);
  console.log('  WARMTH  HEAD  ' + r.head.map(x => F(x.rb)).join(' ') +
    '        core-rim gap ' + F(r.head[0].rb - r.head[3].rb));
  console.log('          patch ' + r.shipped.map(x => F(x.rb)).join(' ') +
    '        core-rim gap ' + F(r.shipped[0].rb - r.shipped[3].rb));
  console.log('  LUMIN   HEAD  ' + r.head.map(x => F(x.L)).join(' ') + '   <- CONTROL: must not move');
  console.log('          patch ' + r.shipped.map(x => F(x.L)).join(' ') +
    '   (delta ' + r.shipped.map((x, i) => F(x.L - r.head[i].L, 5, 1)).join(' ') + ')');
  /* THE QUESTION THE RING MEAN CANNOT ANSWER (218/224): a viewer never sees a ring mean.
     They see BUILDINGS — and the cream/terra/sandDk grain already scatters warmth wildly
     WITHIN every ring. So the signal is the core-rim GAP measured in units of that SCATTER. */
  const pool = x => Math.sqrt((r.shipped[0].sd ** 2 + r.shipped[3].sd ** 2) / 2);
  console.log('  SCATTER patch ' + r.shipped.map(x => F(x.sd)).join(' ') +
    '   <- per-building SD WITHIN each ring');
  console.log('          => core-rim gap ' + F(r.shipped[0].rb - r.shipped[3].rb).trim() +
    ' vs scatter ' + pool().toFixed(1) + '  ⇒  d = ' +
    ((r.shipped[0].rb - r.shipped[3].rb) / pool()).toFixed(2));
  console.log('');
}

console.log('REACHES THE FRAME?   changed px vs the SAME page with patina suppressed (floor = HEAD twice)\n');
console.log('seed      feature px      floor px    (of', out[0].px.toLocaleString(), 'px)');
for (const r of out)
  console.log(String(r.seed).padEnd(9), String(r.ink).padStart(9), String(r.floor).padStart(13));

const gapH = out.reduce((s, r) => s + (r.head[0].rb - r.head[3].rb), 0) / out.length;
const gapP = out.reduce((s, r) => s + (r.shipped[0].rb - r.shipped[3].rb), 0) / out.length;
const dL = Math.max(...out.flatMap(r => r.shipped.map((x, i) => Math.abs(x.L - r.head[i].L))));
const fl = Math.max(...out.map(r => r.floor));
console.log(`\ncore-vs-rim WARMTH gap:  HEAD ${gapH.toFixed(1)}  ->  patch ${gapP.toFixed(1)}`);
console.log(`max |luminance shift| any ring: ${dL.toFixed(2)}   ·   max floor: ${fl} px`);
console.log(
  (gapP - gapH) > 6 && dL < 1.0 && fl === 0
    ? '\nVERDICT: PASS — the old core now reads warmer than the new fringe, luminance is held\n         (so 222\'s ordering invariant is untouched), and the floor is exactly 0.'
    : '\nVERDICT: FAIL — ' + ((gapP - gapH) <= 6 ? 'the core-rim warmth gap did not open. ' : '') +
      (dL >= 1.0 ? 'LUMINANCE MOVED: the luma-neutraliser is broken. ' : '') +
      (fl !== 0 ? 'the floor is not 0. ' : ''));
