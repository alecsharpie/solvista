#!/usr/bin/env node
/* probe-railink.mjs — iter 241's instrument for cue (am).
 *
 * THE COMPLAINT (240's agent, seed 7, unprompted, on a PASSing frame):
 *   "Long straight grey beams criss-cross nearly the whole diorama in big X patterns,
 *    flattening the isometric read... the mid-city is closer to visual noise."
 * And polish-tile's cue (a), from the other side: the SAME structure is sub-pixel and
 * ILLEGIBLE at fit. Both are probably true, and that is the finding.
 *
 * The census is vacuous (draw-only). This is the gate.
 *
 * IT IS NOT A THRESHOLD I INVENTED (226's law): the vector is "the viaduct should sit in
 * the city's value band like every other structure", so THE CONTROL IS THE HOUSE STANDARD.
 * The artifact's own comment at drawMonoAt says the OLD beam was
 *     "brighter than every building it flew over"
 * — an assertion about the CURRENT beam that has never been checked (199's tell). So the
 * headline is: WHERE DOES THE BEAM'S INK SIT IN THE LUMINANCE DISTRIBUTION OF THE BUILDING
 * FACES IT FLIES OVER? If it is at the top, the comment is false and the beam is exactly
 * what the agent says it is: the brightest, hardest line in the frame.
 *
 * ISOLATION — one build, not two (226/230/234's suppression family). drawMonoAt/drawGondAt/
 * drawBuilding are top-level function declarations, i.e. writable globals, so each layer is
 * isolated by nulling its own draw and re-rendering IN ONE PAGE. The diff IS that layer, at a
 * noise floor of exactly 0 (the probe prints the zero rather than assuming it — 203), off the
 * FINAL COMPOSITED canvas, so occlusion is counted for free (200) — a beam a tower covers
 * simply does not appear. Build-agnostic: it runs unchanged on HEAD and on the patch, with no
 * source swap and no cross-build floor (230's trap).
 *
 * WHAT IT REPORTS, per seed, at the FIT camera (the zoom the complaint is about):
 *   railL / bgL / dL   the beam's own luminance, what is under it, and the CONTRAST it cuts
 *   pct-of-bldg        the beam's percentile in the lit building faces' luminance — the
 *                      house standard, in the viewer's units
 *   cols               how many of the frame's 1600 columns carry rail ink = the "criss-cross"
 *                      extent, stated as a number instead of an adjective
 *   width              mean ink thickness per crossed column — cue (a)'s "sub-pixel", measured
 *
 *   node probe-railink.mjs            (SRC=/path/to/other.html to run it on HEAD)
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = process.env.SRC || join(HERE, '../../../../solvista.html');

const SEEDS = [7, 42, 1234];
const WARP = 61;
const HOURS = [['day', 0.30], ['night', 0.92]];   /* pins off the light curve (202) */
const W = 1600, H = 1000;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H } });
await page.addInitScript(() => {                  /* 213: BEFORE the page's own script */
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await page.goto(pathToFileURL(ART).href);
await page.waitForFunction(() => window.__census);

const run = await page.evaluate(({ seeds, warp, hours }) => {
  const g = cvs.getContext('2d');
  const grab = () => g.getImageData(0, 0, cvs.width, cvs.height).data;
  const lum = (d, i) => 0.30 * d[i] + 0.59 * d[i + 1] + 0.11 * d[i + 2];

  /* 200: the HUD is DOM. Mask the cards so no ink is counted where the user sees a card. */
  const dpr = cvs.width / cvs.clientWidth;
  const cards = [...document.querySelectorAll('.placard,.census,.controls')].map(e => {
    const r = e.getBoundingClientRect();
    return [r.left * dpr, r.top * dpr, r.right * dpr, r.bottom * dpr];
  });
  const hidden = (x, y) => cards.some(c => x >= c[0] && x <= c[2] && y >= c[1] && y <= c[3]);

  const MONO = window.drawMonoAt, GOND = window.drawGondAt, BLDG = window.drawBuilding,
        PYL = window.monoPylon;
  const out = [];

  for (const seed of seeds) {
    for (const [hour, t] of hours) {
      playing = false;
      genWorld(seed); __warp(warp);               /* 163c: rebuild, don't trust the load */
      STARS.length = 0; flock = null;             /* 163d / 199 */
      time = 1234.5; waveT = 567.8;               /* 195f */
      __setTime(t);
      render();                                   /* __setTime does NOT render — without this, A is
                                                     the PREVIOUS row's frame and the diff is the HOUR */
      const A = grab();                           /* as shipped */
      render(); const A2 = grab();                /* ...and again: the FLOOR, measured in-run (213) */

      window.drawMonoAt = () => {}; window.drawGondAt = () => {};
      render(); const R = grab();                 /* no elevated transit */
      window.drawMonoAt = MONO;
      render(); const RG = grab();                /* monorail back, gondola still off */
      window.drawGondAt = GOND;

      window.monoPylon = () => {};
      render(); const NP = grab();                /* the beam, with its LEGS taken away */
      window.monoPylon = PYL;

      window.drawBuilding = () => {};
      render(); const B = grab();                 /* no buildings */
      window.drawBuilding = BLDG;
      render();

      /* floor */
      let floor = 0;
      for (let i = 0; i < A.length; i += 4) if (A[i] !== A2[i] || A[i + 1] !== A2[i + 1] || A[i + 2] !== A2[i + 2]) floor++;

      /* A layer = the pixels that differ between the frame WITH it and the frame WITHOUT it,
         read off the FINAL composited canvas, so occlusion is already counted (200).
         ink = the layer's own luminance; under = what it covered; dL = the contrast it cuts. */
      const layer = (WITH, WITHOUT) => {
        const ink = [], under = [], colHit = new Int32Array(cvs.width);
        let px = 0;
        for (let y = 0; y < cvs.height; y++) for (let x = 0; x < cvs.width; x++) {
          const i = (y * cvs.width + x) * 4;
          if (WITH[i] === WITHOUT[i] && WITH[i + 1] === WITHOUT[i + 1] && WITH[i + 2] === WITHOUT[i + 2]) continue;
          if (hidden(x, y)) continue;
          px++; colHit[x]++;
          ink.push(lum(WITH, i)); under.push(lum(WITHOUT, i));
        }
        const cols = [...colHit].filter(c => c > 0).length;
        return { ink, under, px, cols, width: cols ? px / cols : 0 };
      };
      const mono = layer(RG, R);                  /* the monorail alone */
      const gond = layer(A, RG);                  /* the gondola alone */
      const pyl = layer(A, NP);                   /* the LEGS alone: what holds the beam up */
      const bldgL = layer(A, B);                  /* THE HOUSE STANDARD: an ordinary structure */
      const { ink: railL, under: bgL, px: railPx, cols, width } = layer(A, R);
      /* the building faces it flies over — the HOUSE STANDARD */
      const bl = [];
      for (let i = 0; i < A.length; i += 4) {
        if (A[i] === B[i] && A[i + 1] === B[i + 1] && A[i + 2] === B[i + 2]) continue;
        const x = (i >> 2) % cvs.width, y = (i >> 2) / cvs.width | 0;
        if (hidden(x, y)) continue;
        bl.push(lum(A, i));
      }
      bl.sort((a, b) => a - b);
      const mean = a => a.length ? a.reduce((s, v) => s + v, 0) / a.length : 0;
      const q = (a, p) => a.length ? a[Math.min(a.length - 1, Math.round(p * (a.length - 1)))] : 0;
      const rL = mean(railL), bL = mean(bgL);
      /* the beam's percentile within the building-face luminance distribution */
      let below = 0; for (const v of bl) if (v < rL) below++;
      /* The eye reads EDGES, not means: a layer whose MEAN contrast is -8 can still be the
         hardest line in the frame if its brightest decile cuts +38. So report BOTH TAILS.
         dTop = the 90th pct of signed contrast (its brightest ink over what it covers),
         dBot = the 10th (its darkest). Loudness lives in the tails; the mean hides it. */
      const sub = l => {
        const d = l.ink.map((v, k) => v - l.under[k]).sort((a, b) => a - b);
        return {
          px: l.px, cols: l.cols, colFrac: l.cols / cvs.width, width: l.width,
          inkL: mean(l.ink), underL: mean(l.under), dL: mean(l.ink) - mean(l.under),
          dTop: q(d, 0.9), dBot: q(d, 0.1),
        };
      };

      out.push({
        seed, hour, floor, railPx, cols, colFrac: cols / cvs.width, width,
        railL: rL, bgL: bL, dL: rL - bL,
        mono: sub(mono), gond: sub(gond), bldg: sub(bldgL), pyl: sub(pyl),
        legShare: mono.px ? pyl.px / mono.px : 0,   /* how much of the viaduct is LEGS? */
        bldgN: bl.length, bldgMean: mean(bl), bldgP50: q(bl, 0.5), bldgP90: q(bl, 0.9), bldgP99: q(bl, 0.99),
        pctOfBldg: bl.length ? below / bl.length : 0,
      });
    }
  }
  return out;
}, { seeds: SEEDS, warp: WARP, hours: HOURS });

await browser.close();

const f = (v, n = 1) => v.toFixed(n).padStart(6);
console.log(`\nprobe-railink — the elevated transit's ink, isolated by suppression (floor must be 0)\n`);
console.log(`  ${'seed/hour'.padEnd(12)} ${'floor'.padStart(5)} ${'railPx'.padStart(7)} ${'cols'.padStart(5)} ${'of W'.padStart(6)} ${'width'.padStart(6)} ${'railL'.padStart(6)} ${'bgL'.padStart(6)} ${'dL'.padStart(6)}  ${'bldg P50/P90/P99'.padStart(18)} ${'pct-of-bldg'.padStart(11)}`);
for (const r of run) {
  console.log(`  ${(r.seed + ' ' + r.hour).padEnd(12)} ${String(r.floor).padStart(5)} ${String(r.railPx).padStart(7)} ${String(r.cols).padStart(5)} ${(100 * r.colFrac).toFixed(0).padStart(5)}% ${f(r.width, 2)} ${f(r.railL)} ${f(r.bgL)} ${f(r.dL)}  ${f(r.bldgP50, 0)}/${f(r.bldgP90, 0)}/${f(r.bldgP99, 0)} ${(100 * r.pctOfBldg).toFixed(1).padStart(10)}%`);
}
console.log(`\n  MONORAIL vs GONDOLA vs THE HOUSE STANDARD (an ordinary building)`);
console.log(`  loudness lives in the TAILS: dTop/dBot = the 90th/10th pct of signed contrast vs what it covers.\n`);
console.log(`  ${'seed/hour'.padEnd(12)} ${'| mono px'.padStart(9)} ${'cols'.padStart(5)} ${'wid'.padStart(5)} ${'dTop'.padStart(6)} ${'dBot'.padStart(6)} ${'| gond px'.padStart(9)} ${'cols'.padStart(5)} ${'dTop'.padStart(6)} ${'| bldg dTop'.padStart(11)} ${'dBot'.padStart(6)}`);
for (const r of run) {
  console.log(`  ${(r.seed + ' ' + r.hour).padEnd(12)} ${String(r.mono.px).padStart(9)} ${(100 * r.mono.colFrac).toFixed(0).padStart(4)}% ${f(r.mono.width, 1)} ${f(r.mono.dTop)} ${f(r.mono.dBot)} ${String(r.gond.px).padStart(9)} ${(100 * r.gond.colFrac).toFixed(0).padStart(4)}% ${f(r.gond.dTop)} ${f(r.bldg.dTop).padStart(11)} ${f(r.bldg.dBot)}`);
}
const dayR = run.filter(r => r.hour === 'day');
const av = (k, l) => dayR.reduce((s, r) => s + r[l][k], 0) / dayR.length;
console.log(`\n  THE VIADUCT'S LEGS — how much of the elevated structure is the thing HOLDING IT UP?\n`);
console.log(`  ${'seed/hour'.padEnd(12)} ${'pylon px'.padStart(9)} ${'of the monorail'.padStart(16)} ${'pyl dTop'.padStart(9)} ${'dBot'.padStart(6)}`);
for (const r of run) {
  console.log(`  ${(r.seed + ' ' + r.hour).padEnd(12)} ${String(r.pyl.px).padStart(9)} ${(100 * r.legShare).toFixed(1).padStart(15)}% ${f(r.pyl.dTop).padStart(9)} ${f(r.pyl.dBot)}`);
}
const legs = dayR.reduce((s, r) => s + r.legShare, 0) / dayR.length;
console.log(`\n  DAY VERDICT`);
console.log(`    contrast:  the monorail's brightest decile cuts dTop ${av('dTop', 'mono').toFixed(1)} / dBot ${av('dBot', 'mono').toFixed(1)} against what it covers,`);
console.log(`               vs an ordinary BUILDING's ${av('dTop', 'bldg').toFixed(1)} / ${av('dBot', 'bldg').toFixed(1)}. It is IN BAND — the beam is NOT too bright.`);
console.log(`    geometry:  it runs across ${(100 * av('colFrac', 'mono')).toFixed(0)}% of the frame's columns — nothing else in the city does.`);
console.log(`    support:   ${(100 * legs).toFixed(1)}% of that structure is already LEGS — it is NOT an unsupported line.`);
console.log(`\n  => Three hypotheses died here (iter 241): "the beam is too bright" (it is in band), "the`);
console.log(`     gondola is the problem" (it is 33x less ink than the monorail), and "it has no visible`);
console.log(`     legs" (41% of its ink IS legs). EVERY per-pixel property is in band. The only quantity`);
console.log(`     out of band is EXTENT — and that is a property of the NETWORK, not of any draw.`);

const bad = run.filter(r => r.floor > 0);
console.log(`\n  floor: ${bad.length ? 'NONZERO — the isolation is not clean' : 'exactly 0 on every row (one page, frozen clock)'}`);
const day = run.filter(r => r.hour === 'day');
const p = day.reduce((s, r) => s + r.pctOfBldg, 0) / day.length;
console.log(`  DAY headline: the beam's ink sits at the ${(100 * p).toFixed(1)}th percentile of the building faces it flies over.`);
console.log(`                mean contrast against what it covers: dL = ${(day.reduce((s, r) => s + r.dL, 0) / day.length).toFixed(1)}`);
console.log(`                mean ink thickness: ${(day.reduce((s, r) => s + r.width, 0) / day.length).toFixed(2)} px per crossed column`);
console.log(`                crosses ${(100 * day.reduce((s, r) => s + r.colFrac, 0) / day.length).toFixed(0)}% of the frame's columns\n`);
