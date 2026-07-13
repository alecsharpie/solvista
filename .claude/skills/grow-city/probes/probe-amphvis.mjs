#!/usr/bin/env node
/* probe-amphvis.mjs — CAN THE AMPHITHEATER BE SEEN?  (cue (t), iter 231)
 *
 * The amphitheater is a GROUND-LEVEL draw (tiers painted flat on the tile, a 0.16-unit
 * stage house). Draw order is depth order, so whatever stands in the row at dy=+1 is
 * painted LAST and buries it (206). `frontLoad` cannot answer this — it only counts
 * TALLT, and misses RES and PARK trees (226) — so answer it by MEASURED INK.
 *
 * Rig (230): isolate the draw INSIDE ONE PAGE by suppressing its own call site, so the
 * floor is EXACTLY 0 and occlusion is checked for free off the final composited canvas.
 *   A = frame as shipped
 *   B = frame with the amphitheater hex's drawCell suppressed
 *   D = B, then the amphitheater's drawCell re-issued ON TOP of the finished frame
 *   inkInPlace = |A-B|   inkOnTop = |D-B|   occluded% = 1 - inkInPlace/inkOnTop
 * ~0% => nothing ever covers it. High => it is genuinely buried.
 *
 * SRC=<path> to point at another build (e.g. pristine HEAD) for a before/after.
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = pathToFileURL(process.env.SRC ? resolve(process.env.SRC) : join(HERE, '../../../../solvista.html')).href;

const SEEDS = [7, 42, 1234, 99, 2025, 5150];
const b = await chromium.launch();
const pg = await b.newPage({ viewport: { width: 1400, height: 900 } });
/* 213: stub Math.random BEFORE the page's own script, or load-time entities differ per load */
await pg.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await pg.goto(ART);
await pg.waitForTimeout(300);

const out = [];
for (const seed of SEEDS) {
  const r = await pg.evaluate((sd) => {
    /* freeze the world: 163(c)/(d), 195(f), 199 */
    playing = false;
    genWorld(sd); __warp(61);
    STARS.length = 0; flock = null;
    for (const a of [vehicles, bikes, trams, trucks, peds, boats, ferries, freighters, birds,
      shuttles, dogs, kites, surfers, dolphins, whales, herons, kayaks, joggers, deer,
      clouds, balloons, copters]) a.length = 0;
    time = 0.35; waveT = 0; dayT = 0.35;

    let ax = -1, ay = -1;
    for (let i = 0; i < G * G; i++) {
      const c = cells[i];
      if (c && c.t === T.CIVIC && c.kind === 'amphitheater') { ax = i % G; ay = (i / G) | 0; break; }
    }
    if (ax < 0) return { seed: sd, missing: true };

    const ctx2 = cvs.getContext('2d');
    const grab = () => ctx2.getImageData(0, 0, cvs.width, cvs.height).data;
    const diff = (p, q) => { let n = 0;
      for (let i = 0; i < p.length; i += 4) {
        const d = Math.max(Math.abs(p[i] - q[i]), Math.abs(p[i + 1] - q[i + 1]), Math.abs(p[i + 2] - q[i + 2]));
        if (d > 6) n++;
      } return n; };

    const real = drawCell;
    /* A — as shipped */
    render(); const A = grab();
    /* floor: render the same thing again, nothing changed => must be 0 */
    render(); const A2 = grab();
    const floor = diff(A, A2);
    /* B — suppress the amphitheater's own call site */
    window.drawCell = (x, y) => { if (x === ax && y === ay) return; real(x, y); };
    render(); const B = grab();
    /* D — same frame, then re-issue the amphitheater ON TOP of everything */
    render(); real(ax, ay); const D = grab();
    window.drawCell = real;

    const inPlace = diff(A, B), onTop = diff(D, B);
    return {
      seed: sd, x: ax, y: ay, floor, inPlace, onTop,
      occl: onTop ? (1 - inPlace / onTop) : 0,
      frontLoad: frontLoad(ax, ay), openFront: openFront(ax, ay),
      dist: hexDist(ax, ay, CBDX, CBDY),
    };
  }, seed);
  out.push(r);
}
await b.close();

console.log(`\n=== amphitheater visibility — ${ART.split('/').pop()} ===`);
console.log('seed     x   y  row  frontLoad  dist  |  floor  inkInPlace  inkOnTop   OCCLUDED%');
let so = 0, sp = 0, st = 0, n = 0, buried = 0;
for (const r of out) {
  if (r.missing) { console.log(`${r.seed}  *** NO AMPHITHEATER — POPULATION LOST ***`); continue; }
  const pct = r.occl * 100;
  if (pct >= 60) buried++;
  so += pct; sp += r.inPlace; st += r.onTop; n++;
  console.log(
    `${String(r.seed).padEnd(6)} ${String(r.x).padStart(3)} ${String(r.y).padStart(3)}` +
    ` ${String(r.y).padStart(4)}   ${String(r.frontLoad).padStart(6)}  ${String(r.dist).padStart(4)}  |` +
    ` ${String(r.floor).padStart(5)}  ${String(r.inPlace).padStart(9)}  ${String(r.onTop).padStart(8)}` +
    `   ${pct.toFixed(1).padStart(7)}%${pct >= 60 ? '  <== BURIED' : ''}`);
}
console.log(`\nmean occluded ${(so / n).toFixed(1)}%   mean visible ink ${(sp / n).toFixed(0)}px ` +
  `(of ${(st / n).toFixed(0)}px drawn)   BURIED(>=60%): ${buried}/${n}   population ${n}/${SEEDS.length}`);
console.log('floor must be 0 on every row (one page, two renders of the same state).');
