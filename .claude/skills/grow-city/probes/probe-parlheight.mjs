/* probe-parliament — "the tallest civic roof in Solvista" is a COMPARATIVE claim
 * about the pixels. Grade it in the VIEWER'S units (205), not in c.th.
 *
 * 224's law: screen-y is DEPTH, not height — the topmost thing in the frame is the
 * farthest-back thing. So the projection-safe quantity is the DRAWN SILHOUETTE:
 * how far a building's ink rises ABOVE ITS OWN HEX CENTRE, in CSS px.
 *
 * Isolation is 230's suppress-the-DECISION rig, inside ONE page: render as shipped,
 * then retype the ONE civic hex to EMPTY and re-render. The changed pixels ARE that
 * civic, read off the final composited canvas — so occlusion is measured for free
 * (a buried parliament has a low visible apex, and that is the honest answer).
 * Floor is exactly 0 and it is printed as the first row (203).
 *
 * BUILD-AGNOSTIC: the mask comes from each build's own render, so this file grades
 * HEAD and the patch unchanged, with no source swap and no cross-build floor (230).
 *   SRC=/tmp/head.html node probe-parliament.mjs
 *
 * MUST-NOT-MOVE column (250): every OTHER civic's silhouette. The lap raises one
 * constant on one kind; if a school moves, the change has leaked.
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
import { existsSync } from 'node:fs';
/* resolve the artifact relative to THIS FILE (never an absolute path), and stay
   correct both at the repo root (where an ad-hoc probe is born) and in probes/ */
const A1 = join(HERE, '../../../../solvista.html'), A2 = join(HERE, 'solvista.html');
const ART = existsSync(A1) ? A1 : A2;
const SRC = process.env.SRC || ART;

const SEEDS = [7, 42, 1234, 99, 2024, 555];

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await p.goto(pathToFileURL(SRC).href);
await p.waitForFunction(() => window.__census !== undefined);

const data = await p.evaluate((seeds) => {
  const out = [];
  const g = cvs.getContext('2d');
  const grab = () => g.getImageData(0, 0, cvs.width, cvs.height).data;
  const dpr = cvs.width / cvs.clientWidth;

  for (const seed of seeds) {
    playing = false;
    genWorld(seed); __warp(2035 - 1974);
    /* freeze everything that could drift between two renders in this page */
    time = 1000; waveT = 500; dayT = 0.30;
    STARS.length = 0; if (typeof flock !== 'undefined') flock = null;
    for (const arr of [vehicles, peds, dogs, boats, birds]) if (Array.isArray(arr)) arr.length = 0;
    render();

    const A = grab();
    /* FLOOR: two renders, no mutation. Must be exactly 0 (203). */
    render();
    const A2 = grab();
    let floor = 0;
    for (let i = 0; i < A.length; i += 4)
      if (Math.abs(A[i] - A2[i]) > 8 || Math.abs(A[i + 1] - A2[i + 1]) > 8 || Math.abs(A[i + 2] - A2[i + 2]) > 8) floor++;

    const civics = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)];
      if (c && c.t === T.CIVIC) civics.push({ x, y, kind: c.kind, th: c.th });
    }

    const rows = [];
    for (const cv of civics) {
      const c = cells[idx(cv.x, cv.y)];
      const [wx, wy] = ctr(cv.x, cv.y);
      const sy = wy * scale + offY;               /* hex centre, CSS px */
      const keep = { t: c.t, kind: c.kind, h: c.h, th: c.th };
      c.t = T.EMPTY; c.kind = null; c.h = 0; c.th = 0;
      render();
      const B = grab();
      c.t = keep.t; c.kind = keep.kind; c.h = keep.h; c.th = keep.th;
      render();

      let apexDev = Infinity, ink = 0;
      const W = cvs.width;
      for (let i = 0; i < A.length; i += 4) {
        if (Math.abs(A[i] - B[i]) > 8 || Math.abs(A[i + 1] - B[i + 1]) > 8 || Math.abs(A[i + 2] - B[i + 2]) > 8) {
          ink++;
          const py = ((i / 4) / W) | 0;
          if (py < apexDev) apexDev = py;
        }
      }
      const apexCss = apexDev === Infinity ? sy : apexDev / dpr;
      rows.push({ kind: cv.kind, th: +cv.th.toFixed(1), ink,
                  rise: +(sy - apexCss).toFixed(1) });     /* CSS px the ink rises above its own hex centre */
    }
    out.push({ seed, floor, rows });
  }
  return out;
}, SEEDS);

await b.close();

const tag = process.env.SRC ? 'HEAD' : 'PATCH';
console.log(`\n=== SILHOUETTE RISE above own hex centre, CSS px at fit zoom  [${tag}: ${SRC}] ===`);
console.log('(read off the FINAL composited canvas, so occlusion is included — this is what a viewer sees)\n');
console.log('FLOOR (two renders, no mutation): ' + data.map(d => `${d.seed}:${d.floor}px`).join('  '));

console.log('\nseed    parliament        best rival (kind)        margin      RANK   claim');
let n1 = 0, tie = 0; const marg = [];
for (const d of data) {
  const parl = d.rows.find(r => r.kind === 'parliament');
  if (!parl) { console.log(`${String(d.seed).padEnd(8)} --- NO PARLIAMENT ---`); continue; }
  const riv = d.rows.filter(r => r.kind !== 'parliament').sort((a, b) => b.rise - a.rise);
  const best = riv[0];
  const m = parl.rise - best.rise;
  const pct = m / parl.rise * 100;
  const rank = 1 + d.rows.filter(r => r.rise > parl.rise).length;
  marg.push(m);
  if (rank === 1) n1++;
  const verdict = rank !== 1 ? 'FALSE' : (pct < 15 ? 'true, but a TIE' : 'TRUE, visibly');
  if (rank === 1 && pct < 15) tie++;
  console.log(`${String(d.seed).padEnd(8)}${parl.rise.toFixed(1).padStart(8)} px   ${best.rise.toFixed(1).padStart(8)} px (${best.kind.padEnd(12)}) ${m.toFixed(1).padStart(6)} px (${pct.toFixed(0).padStart(3)}%)  #${rank}    ${verdict}`);
}
console.log(`\nparliament tops the civic stock on ${n1}/${data.length} seeds; ${tie}/${data.length} are a VISUAL TIE (<15%)`);
console.log(`mean margin over the runner-up: ${(marg.reduce((a, b) => a + b, 0) / (marg.length || 1)).toFixed(1)} CSS px`);

console.log('\n=== MUST-NOT-MOVE (250): every other civic kind, mean rise (px) — the lap may not touch these ===');
const byK = {};
for (const d of data) for (const r of d.rows) (byK[r.kind] ||= []).push(r.rise);
for (const k of Object.keys(byK).sort()) {
  const v = byK[k], mean = v.reduce((a, b) => a + b, 0) / v.length;
  console.log('  ' + k.padEnd(14) + `n=${String(v.length).padStart(2)}  mean ${mean.toFixed(1).padStart(6)} px   max ${Math.max(...v).toFixed(1).padStart(6)} px`);
}

/* ---------------------------------------------------------------------------
 * SWEEP (206's two ledgers) — pick the capitol's height from the ARTIFACT'S OWN
 * bars, not from a constant I invent (205/226):
 *   EFFECT: it must CLEAR the tallest civic the city can draw (the university's
 *           campanile) — on the WORST seed (233), not on the mean.
 *   COST:   it must stay UNDER the tower stock. The claim is "the tallest civic
 *           roof", not "the tallest building in Solvista" — a capitol that
 *           out-tops downtown has broken the skyline to fix a label.
 * Run on HEAD by mutating the parliament's c.th in-page, so no source edit is
 * needed to choose the number. c.th feeds nothing but the draw here: POPW[CIVIC]
 * is flat 40 (height-independent) and the assignment draws no rng().
 * ------------------------------------------------------------------------- */
if (!process.env.NOSWEEP) {
  const CANDS = [34, 40.8, 47.6, 54.4, 61.2, 68];   /* = (20+14) * 1.0/1.2/1.4/1.6/1.8/2.0 */
  const b2 = await chromium.launch();
  const p2 = await b2.newPage({ viewport: { width: 1400, height: 900 } });
  await p2.addInitScript(() => { let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
  await p2.goto(pathToFileURL(SRC).href);
  await p2.waitForFunction(() => window.__census !== undefined);

  const sw = await p2.evaluate(({ seeds, cands }) => {
    const out = [];
    const g = cvs.getContext('2d');
    const grab = () => g.getImageData(0, 0, cvs.width, cvs.height).data;
    const dpr = cvs.width / cvs.clientWidth;

    /* rise of ONE cell: retype it to EMPTY, re-render, diff; apex of the changed px */
    const riseOf = (x, y, A) => {
      const c = cells[idx(x, y)];
      const [wx, wy] = ctr(x, y); const sy = wy * scale + offY;
      const keep = { t: c.t, kind: c.kind, h: c.h, th: c.th };
      c.t = T.EMPTY; c.kind = null; c.h = 0; c.th = 0;
      render(); const B = grab();
      c.t = keep.t; c.kind = keep.kind; c.h = keep.h; c.th = keep.th; render();
      let apex = Infinity; const W = cvs.width;
      for (let i = 0; i < A.length; i += 4)
        if (Math.abs(A[i] - B[i]) > 8 || Math.abs(A[i + 1] - B[i + 1]) > 8 || Math.abs(A[i + 2] - B[i + 2]) > 8) {
          const py = ((i / 4) / W) | 0; if (py < apex) apex = py;
        }
      return apex === Infinity ? 0 : sy - apex / dpr;
    };

    for (const seed of seeds) {
      playing = false;
      genWorld(seed); __warp(2035 - 1974);
      time = 1000; waveT = 500; dayT = 0.30;
      STARS.length = 0; if (typeof flock !== 'undefined') flock = null;
      for (const arr of [vehicles, peds, dogs, boats, birds]) if (Array.isArray(arr)) arr.length = 0;
      render();

      let px = -1, py = -1;
      const civ = [];
      const towers = [];
      for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
        const c = cells[idx(x, y)];
        if (!c) continue;
        if (c.t === T.CIVIC) { if (c.kind === 'parliament') { px = x; py = y; } else civ.push([x, y]); }
        if (c.t === T.TOWER) towers.push([x, y, c.th]);
      }
      /* the INCUMBENT CEILING: the 4 tallest towers, isolated with the SAME rig (226) */
      towers.sort((a, b) => b[2] - a[2]);
      const A0 = grab();
      const towRise = towers.slice(0, 4).map(([x, y]) => riseOf(x, y, A0));
      /* the tallest RIVAL civic, same rig */
      const civRise = civ.map(([x, y]) => riseOf(x, y, A0));
      const bestRival = Math.max(...civRise);

      const parl = cells[idx(px, py)];
      const th0 = parl.th;
      const sweep = [];
      for (const th of cands) {
        parl.th = th; parl.h = th; render();
        const A = grab();
        sweep.push({ th, rise: +riseOf(px, py, A).toFixed(1) });
      }
      parl.th = th0; parl.h = th0; render();
      out.push({ seed, bestRival: +bestRival.toFixed(1),
                 towerMin: +Math.min(...towRise).toFixed(1), towerMax: +Math.max(...towRise).toFixed(1),
                 sweep });
    }
    return out;
  }, { seeds: SEEDS, cands: CANDS });
  await b2.close();

  console.log('\n\n=== SWEEP: what height makes "the tallest civic roof" TRUE, without out-topping downtown? ===');
  console.log('(rise in CSS px above own hex centre. Bars are the ARTIFACT\'S: the tallest rival civic, and the 4 tallest towers.)\n');
  console.log('seed    tallest-rival   towers(4 tallest)   ' + CANDS.map(c => ('th=' + c).padStart(8)).join(''));
  for (const r of sw) {
    console.log(String(r.seed).padEnd(8) + (r.bestRival.toFixed(1) + ' px').padStart(12) + '   ' +
      (r.towerMin.toFixed(1) + '..' + r.towerMax.toFixed(1)).padStart(15) + '   ' +
      r.sweep.map(s => s.rise.toFixed(1).padStart(8)).join(''));
  }
  console.log('\ncandidate    clears every rival    max tower breach    verdict');
  for (let i = 0; i < CANDS.length; i++) {
    const th = CANDS[i];
    let ok = 0, breach = 0, minMargin = 1e9;
    for (const r of sw) {
      const rise = r.sweep[i].rise;
      if (rise > r.bestRival) ok++;
      minMargin = Math.min(minMargin, rise - r.bestRival);
      if (rise > r.towerMin) breach++;
    }
    const lead = (th / 34).toFixed(2);
    const v = ok < SEEDS.length ? 'FAILS — still tied/beaten on a seed'
            : breach > 0 ? 'TOO TALL — out-tops a tallest-4 tower'
            : 'PASSES both bars';
    console.log(`th=${String(th).padEnd(6)} (x${lead})  ${ok}/${SEEDS.length} seeds  worst margin ${minMargin.toFixed(1).padStart(5)} px   ${breach}/${SEEDS.length}   ${v}`);
  }
}
