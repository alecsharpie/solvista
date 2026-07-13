#!/usr/bin/env node
/* probe-amphfuture.mjs — SCORE THE FRONT BY WHAT IT WILL BECOME (iter 231)
 *
 * probe-amphgrow proved the defect: the bowl is sited in 2004 and every seed finds a
 * groundLoad of ZERO — a perfectly clear front. Four of six stay clear because that front
 * is ROAD / WATER / SHOREPARK / ROCK, which can never be built on. Two are buried by 2035
 * because their front was `EMPTY EMPTY`, which became RES:16 COM:21 and COM:18 TOWER:89.
 * The rule ties at 0 across hundreds of candidates and lets the HASH break the tie — so a
 * vacant lot's frontage wins as often as a road's. It optimizes a property the city then
 * destroys, and it picks the lots most likely to be developed.
 *
 * So score the front by its POTENTIAL height. This sweep is honest about the clock: every
 * variant picks using the 2004 terrain (as the real rule does), and is graded by MEASURED
 * INK in the 2035 city that every frame actually renders.
 *
 * Two ledgers (206): the EFFECT (occlusion) and the COST (the one-per-city bowl must still
 * be placed on every seed — and must not always end up on the same kind of frontage, which
 * would be procedural monotony).
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = pathToFileURL(join(HERE, '../../../../solvista.html')).href;

const SEEDS = [7, 42, 1234, 99, 2025, 5150];
const VARIANTS = ['V0 raster(HEAD)', 'V2 height NOW (shipped)', 'V5 future EMPTY h30',
  'V6 future EMPTY+ag h30', 'V7 future EMPTY h60'];

const b = await chromium.launch();
const pg = await b.newPage({ viewport: { width: 1400, height: 900 } });
await pg.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await pg.goto(ART);
await pg.waitForTimeout(300);

const rows = [];
for (const seed of SEEDS) {
  const r = await pg.evaluate((sd) => {
    playing = false;
    genWorld(sd);
    __warp(31);                       /* -> ~2005, the year the bowl is sited */

    const TREES = new Set([T.PARK, T.FOREST, T.REDWOOD, T.ORCHARD, T.VINEYARD]);
    const BUILD = new Set([T.EMPTY]);
    const BUILD_AG = new Set([T.EMPTY, T.MEADOW, T.FARM, T.BURNT, T.SOLARF]);
    const OFFS = [[0, 1], [-1, 1], [1, 1], [0, 2], [-1, 2], [1, 2]];
    const load = (x, y, buildSet, futureH) => {
      let n = 0;
      for (const [dx, dy] of OFFS) {
        const c = cellAt(x + dx, y + dy); if (!c) continue;
        const h = c.th || (TREES.has(c.t) ? 14 : (buildSet && buildSet.has(c.t) ? futureH : 0));
        n += h * (dy === 1 ? 2 : 1);
      }
      return n;
    };
    const isCand = (x, y, c) => (c.t === T.EMPTY || c.t === T.RES) && roadNear(x, y)
      && countAround(x, y, 2, n => n.t === T.PARK || n.t === T.PLAZA) > 0;

    /* lift the bowl this build sited, so every variant sees the same full pool */
    for (let i = 0; i < G * G; i++) {
      const c = cells[i];
      if (c && c.t === T.CIVIC && c.kind === 'amphitheater') {
        c.t = T.EMPTY; c.kind = null; c.th = 0; c.h = 0; break; }
    }

    const scorers = [
      null,                                                          /* V0: first raster match */
      (x, y) => load(x, y, null, 0) + hashCell(x, y, seedNum ^ 0x0A44),
      (x, y) => load(x, y, BUILD, 30) + hashCell(x, y, seedNum ^ 0x0A44),
      (x, y) => load(x, y, BUILD_AG, 30) + hashCell(x, y, seedNum ^ 0x0A44),
      (x, y) => load(x, y, BUILD, 60) + hashCell(x, y, seedNum ^ 0x0A44),
    ];
    const nm = (t) => Object.keys(T).find(k => T[k] === t) || '?';
    const picks = scorers.map((f, vi) => {
      let best = -1, bs = 1e18;
      for (let i = 0; i < G * G; i++) {
        const x = i % G, y = (i / G) | 0, c = cells[i];
        if (!c || !isCand(x, y, c)) continue;
        if (vi === 0) { if (hashCell(x, y, seedNum ^ 0x0A44) < 0.6) { best = i; break; } continue; }
        const s = f(x, y);
        if (s < bs) { bs = s; best = i; }
      }
      return best;
    });
    /* what each pick's front was made of AT SITING — the monotony check */
    const fronts = picks.map(i => i < 0 ? null :
      OFFS.map(([dx, dy]) => { const c = cellAt((i % G) + dx, ((i / G) | 0) + dy); return c ? nm(c.t) : 'void'; }));

    __warp(31);                       /* -> ~2036, the year every frame renders */

    const ctx2 = cvs.getContext('2d');
    STARS.length = 0; flock = null;
    for (const a of [vehicles, bikes, trams, trucks, peds, boats, ferries, freighters, birds,
      shuttles, dogs, kites, surfers, dolphins, whales, herons, kayaks, joggers, deer,
      clouds, balloons, copters]) a.length = 0;
    time = 0.35; waveT = 0; dayT = 0.35;
    const grab = () => ctx2.getImageData(0, 0, cvs.width, cvs.height).data;
    const diff = (p, q) => { let n = 0;
      for (let k = 0; k < p.length; k += 4) {
        const d = Math.max(Math.abs(p[k] - q[k]), Math.abs(p[k + 1] - q[k + 1]), Math.abs(p[k + 2] - q[k + 2]));
        if (d > 6) n++;
      } return n; };
    const real = drawCell;
    const measure = (i) => {
      if (i < 0) return null;
      const x = i % G, y = (i / G) | 0, c = cells[i];
      const save = { t: c.t, kind: c.kind, th: c.th, h: c.h, age: c.age };
      c.t = T.CIVIC; c.kind = 'amphitheater'; c.th = 6; c.h = 6; c.age = 0;
      render(); const A = grab();
      render(); const A2 = grab();
      const floor = diff(A, A2);
      window.drawCell = (xx, yy) => { if (xx === x && yy === y) return; real(xx, yy); };
      render(); const B = grab();
      render(); real(x, y); const D = grab();
      window.drawCell = real;
      Object.assign(c, save);
      const inPlace = diff(A, B), onTop = diff(D, B);
      return { x, y, floor, inPlace, onTop, occl: onTop ? (1 - inPlace / onTop) : 0,
        dist: hexDist(x, y, CBDX, CBDY) };
    };
    return { seed: sd, res: picks.map(measure), fronts };
  }, seed);
  rows.push(r);
}
await b.close();

console.log('\n=== score the front by what it WILL BECOME (site 2004, judge 2035, 6 seeds) ===\n');
const agg = VARIANTS.map(() => ({ occ: 0, ink: 0, buried: 0, n: 0, dist: 0, worst: 0, water: 0, floorMax: 0 }));
for (const r of rows) {
  console.log(`seed ${r.seed}`);
  r.res.forEach((m, vi) => {
    if (!m) { console.log(`   ${VARIANTS[vi].padEnd(24)} *** NO PLACEMENT ***`); return; }
    const pct = m.occl * 100, a = agg[vi];
    a.occ += pct; a.ink += m.inPlace; a.n++; a.dist += m.dist; a.worst = Math.max(a.worst, pct);
    a.floorMax = Math.max(a.floorMax, m.floor);
    if (pct >= 60) a.buried++;
    if (r.fronts[vi].includes('WATER')) a.water++;
    console.log(`   ${VARIANTS[vi].padEnd(24)} (${String(m.x).padStart(2)},${String(m.y).padStart(2)})` +
      ` floor ${m.floor}  ink ${String(m.inPlace).padStart(3)}/${String(m.onTop).padStart(3)}` +
      `  occl ${pct.toFixed(1).padStart(5)}%${pct >= 60 ? ' BURIED' : ''}   front@2004: ${r.fronts[vi].join(',')}`);
  });
  console.log('');
}
console.log('--- SUMMARY:  effect  |  cost ---');
console.log('variant                   mean occl  worst   buried   visible ink   dist  waterfront  placed  floor');
agg.forEach((a, vi) => {
  console.log(`${VARIANTS[vi].padEnd(24)}  ${(a.occ / a.n).toFixed(1).padStart(6)}% ${a.worst.toFixed(0).padStart(5)}%` +
    `   ${a.buried}/${a.n}      ${(a.ink / a.n).toFixed(0).padStart(5)}px     ${(a.dist / a.n).toFixed(0).padStart(4)}` +
    `      ${a.water}/${a.n}      ${a.n}/${SEEDS.length}     ${a.floorMax}`);
});
