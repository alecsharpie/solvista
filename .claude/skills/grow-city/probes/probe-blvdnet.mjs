/* Is the boulevard canopy a CONTAGION (grand tree-lined avenues) or a SCATTER?
 *
 * The rule (solvista L2539) is p = min(0.16, 0.002 + 0.05*adopt) per busy street
 * per tick, from year 2000. Its comment calls it "a contagion along the busy street
 * network... spreads block to block", and the tooltip names the tile a BOULEVARD and
 * prints `Length: N blocks` off boulevardSize() — a flood fill of contiguous treed road.
 *
 * The headline needs no threshold (236): compare the SHIPPED run-length distribution
 * against the NULL MODEL — the same number of treed cells scattered at random over the
 * same busy-road network. A contagion must beat its own null; if it does not, the
 * neighbour term is decorative and the city has no boulevards, only a green haze.
 * Pure world data: no render, no clock, no pixels, no noise floor, nothing to stub.
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = process.env.SRC || join(HERE, '../../../../solvista.html');
const SEEDS = [7, 42, 1234, 99, 5150, 2024];

const b = await chromium.launch();
const page = await b.newPage();
await page.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await page.goto('file://' + SRC);
await page.waitForFunction(() => typeof window.genWorld === 'function');

const rows = [];
for (const seed of SEEDS) {
  const r = await page.evaluate(({ seed }) => {
    playing = false;
    genWorld(seed); __warp(61);                       // 1974 -> 2035

    const G_ = G, T_ = T;
    const isRoad = i => cells[i].t === T_.ROAD;
    const treed  = i => isRoad(i) && cells[i].treed;
    const busy   = i => isRoad(i) && cells[i].busy && !cells[i].bridge;

    // neighbour list over the live plate, along the hex axes the artifact uses
    const nbrs = i => {
      const x = i % G_, y = (i / G_) | 0, out = [];
      const o = (y & 1) ? [[1,0],[-1,0],[0,-1],[1,-1],[0,1],[1,1]]
                        : [[1,0],[-1,0],[-1,-1],[0,-1],[-1,1],[0,1]];
      for (const [dx, dy] of o) {
        const a = x + dx, c = y + dy;
        if (a >= 0 && a < G_ && c >= 0 && c < G_) out.push(c * G_ + a);
      }
      return out;
    };

    // run-length distribution of a boolean set over the road graph
    const runs = (setArr) => {
      const seen = new Set(), out = [];
      for (const i of setArr) {
        if (seen.has(i)) continue;
        let n = 0; const st = [i]; seen.add(i);
        while (st.length) {
          const j = st.pop(); n++;
          for (const k of nbrs(j)) if (setArr.has(k) && !seen.has(k)) { seen.add(k); st.push(k); }
        }
        out.push(n);
      }
      return out.sort((a, z) => z - a);
    };

    const roadsAll = [], busyAll = [], treedAll = [];
    for (let i = 0; i < G_ * G_; i++) {
      if (!isRoad(i)) continue;
      roadsAll.push(i);
      if (busy(i)) busyAll.push(i);
      if (treed(i)) treedAll.push(i);
    }

    const obs = runs(new Set(treedAll));

    // NULL MODEL: same count, scattered at random over the ROAD graph. Build-independent,
    // so HEAD and the patch are graded against the identical baseline.
    // 200 trials, so the null's own spread is visible and the comparison is honest.
    let nMax = 0, nMean = 0, nSingle = 0;
    const TRIALS = 200;
    for (let t = 0; t < TRIALS; t++) {
      const pool = roadsAll.slice();
      for (let k = pool.length - 1; k > 0; k--) {
        const j = (Math.random() * (k + 1)) | 0; [pool[k], pool[j]] = [pool[j], pool[k]];
      }
      const pick = new Set(pool.slice(0, treedAll.length));
      const rr = runs(pick);
      nMax += rr[0] || 0;
      nMean += treedAll.length / (rr.length || 1);
      nSingle += rr.filter(v => v === 1).length / (rr.length || 1);
    }

    // how connected is the HOST itself? (282: a spread rule needs a REACHABLE neighbour)
    const hostRuns = runs(new Set(busyAll));

    // THE CANDIDATE HOST: the trunk the artifact has published since iter 77.
    // A spread rule needs a NEIGHBOUR, not a population (263) -- so measure the
    // arterial network's CONNECTIVITY before designing anything on it.
    const artAll = roadsAll.filter(i => (cells[i].flow || 0) >= ARTFLOW && !cells[i].bridge);
    const artRuns = runs(new Set(artAll));

    // ...and the CONJUNCTION: the trunk WHERE IT RUNS THROUGH BUILT-UP FABRIC.
    // Both predicates already ship (c.flow>=ARTFLOW since 77; c.busy). No new constant.
    // If this is fragmented, a contagion cannot cross it (282's percolation law).
    const abAll = artAll.filter(i => cells[i].busy);
    const abRuns = runs(new Set(abAll));

    // what the TOOLTIP actually says, over every road in the city
    const label = { Boulevard: 0, Arterial: 0, Avenue: 0, Street: 0, Bridge: 0, Festival: 0 };
    for (const i of roadsAll) {
      const c = cells[i];
      if (c.fete) label.Festival++;
      else if (c.bridge) label.Bridge++;
      else if (c.treed) label.Boulevard++;
      else if ((c.flow || 0) >= ARTFLOW) label.Arterial++;
      else if (c.busy) label.Avenue++;
      else label.Street++;
    }
    // ...and how many of the trunk routes have been RE-LABELLED Boulevard by the canopy
    const artTreed = artAll.filter(i => cells[i].treed).length;

    return {
      roads: roadsAll.length, busy: busyAll.length, treed: treedAll.length,
      fill: treedAll.length / (busyAll.length || 1),
      obsRuns: obs.length, obsMax: obs[0] || 0,
      obsMean: treedAll.length / (obs.length || 1),
      obsSingle: obs.filter(v => v === 1).length / (obs.length || 1),
      nullMax: nMax / TRIALS, nullMean: nMean / TRIALS, nullSingle: nSingle / TRIALS,
      hostBiggest: hostRuns[0] || 0, hostComps: hostRuns.length,
      art: artAll.length, artBiggest: artRuns[0] || 0, artComps: artRuns.length,
      artTreed, label, trunkShare: artTreed / (treedAll.length || 1),
      trunkFill: artTreed / (artAll.length || 1),
      ab: abAll.length, abBiggest: abRuns[0] || 0, abComps: abRuns.length,
    };
  }, { seed });
  rows.push({ seed, ...r });
}
await b.close();

const f = (v, n = 2) => v.toFixed(n).padStart(6);
console.log('\n=== HOST: the busy-street network the canopy must travel over ===');
console.log('seed     roads   busy  biggest-component  components');
for (const r of rows)
  console.log(String(r.seed).padStart(6), String(r.roads).padStart(7), String(r.busy).padStart(6),
              String(r.hostBiggest).padStart(18), String(r.hostComps).padStart(11));

console.log('\n=== THE CANOPY: shipped vs its own NULL (same count, scattered at random) ===');
console.log('        treed   fill%  | run-len mean       | longest allee      | singletons');
console.log('seed                    | SHIPPED    NULL    | SHIPPED    NULL    | SHIPPED    NULL');
for (const r of rows)
  console.log(String(r.seed).padStart(6), String(r.treed).padStart(7), f(r.fill * 100, 1),
    ' |', f(r.obsMean), '  ', f(r.nullMean),
    ' |', String(r.obsMax).padStart(6), '  ', f(r.nullMax, 1),
    ' |', f(r.obsSingle * 100, 1), '  ', f(r.nullSingle * 100, 1));

const mo = rows.reduce((a, r) => a + r.obsMean, 0) / rows.length;
const mn = rows.reduce((a, r) => a + r.nullMean, 0) / rows.length;
const xo = rows.reduce((a, r) => a + r.obsMax, 0) / rows.length;
const xn = rows.reduce((a, r) => a + r.nullMax, 0) / rows.length;
const fl = rows.reduce((a, r) => a + r.fill, 0) / rows.length;
console.log('\nmean fill of the busy network  : ' + (fl * 100).toFixed(1) + '%');
console.log('mean run length  SHIPPED/NULL  : ' + mo.toFixed(2) + ' / ' + mn.toFixed(2)
          + '   ratio ' + (mo / mn).toFixed(2) + 'x');
console.log('longest allee    SHIPPED/NULL  : ' + xo.toFixed(1) + ' / ' + xn.toFixed(1)
          + '   ratio ' + (xo / xn).toFixed(2) + 'x');
console.log('\n=> a CONTAGION must beat its own null. ~1.0x means the neighbour term is decorative.\n');

console.log('=== WHERE THE CANOPY STANDS (the claim: a GRAND AVENUE is a MAIN ROAD) ===');
console.log('seed   treed   on-trunk  % of canopy ON the trunk   % of the TRUNK that is treed');
for (const r of rows)
  console.log(String(r.seed).padStart(6), String(r.treed).padStart(7), String(r.artTreed).padStart(9),
              (r.trunkShare * 100).toFixed(1).padStart(24), (r.trunkFill * 100).toFixed(1).padStart(29));
const ts = rows.reduce((a, r) => a + r.trunkShare, 0) / rows.length;
const tf = rows.reduce((a, r) => a + r.trunkFill, 0) / rows.length;
console.log('\nmean: ' + (ts * 100).toFixed(1) + '% of the canopy is on a trunk route; '
          + (tf * 100).toFixed(1) + '% of the trunk is tree-lined.');
console.log('   (the WORST seed must not STARVE -- 233: gate on the worst, never the mean)\n');

console.log('=== CANDIDATE HOST: the arterial trunk (c.flow >= ARTFLOW, published since iter 77) ===');
console.log('   (263: a spread rule needs a REACHABLE neighbour -- count the COMPONENT, not the tiles)');
console.log('seed   arterials  biggest-component  components  already-treed');
for (const r of rows)
  console.log(String(r.seed).padStart(6), String(r.art).padStart(9), String(r.artBiggest).padStart(18),
              String(r.artComps).padStart(11), String(r.artTreed).padStart(14));

console.log('\n=== WHAT THE TOOLTIP SAYS (the label ladder the canopy has eaten) ===');
console.log('seed   Boulevard  Arterial  Avenue  Street  Bridge');
for (const r of rows) {
  const L = r.label;
  console.log(String(r.seed).padStart(6), String(L.Boulevard).padStart(9), String(L.Arterial).padStart(9),
              String(L.Avenue).padStart(7), String(L.Street).padStart(7), String(L.Bridge).padStart(7));
}
const tot = k => rows.reduce((a, r) => a + r.label[k], 0) / rows.length;
console.log('\nmean per city: Boulevard ' + tot('Boulevard').toFixed(1)
          + ' | Arterial ' + tot('Arterial').toFixed(1)
          + ' | Avenue ' + tot('Avenue').toFixed(1)
          + ' | Street ' + tot('Street').toFixed(1));
console.log('=> the tooltip tests c.treed BEFORE the arterial, so a treed trunk reads "Boulevard".\n');

console.log('=== THE PROPOSED HOST: trunk AND built-up (arterial n busy) ===');
console.log('   both predicates already ship; if this fragments, a contagion cannot cross it (282)');
console.log('seed   cells  biggest-component  components   would-be ladder (at full fill)');
for (const r of rows) {
  const L = r.label;
  const boul = r.ab;
  const art  = r.art - r.ab;                       // trunk through open land: stays bare
  const ave  = r.busy - r.ab;                      // busy street, not trunk
  const st   = r.roads - r.label.Bridge - r.label.Festival - boul - art - ave;
  console.log(String(r.seed).padStart(6), String(r.ab).padStart(6), String(r.abBiggest).padStart(18),
              String(r.abComps).padStart(11), '   B ' + String(boul).padStart(3) + ' | A ' + String(art).padStart(3)
              + ' | Av ' + String(ave).padStart(3) + ' | St ' + String(st).padStart(3));
}
const mab = rows.reduce((a, r) => a + r.ab, 0) / rows.length;
console.log('\nmean boulevard cells: HEAD ' + tot('Boulevard').toFixed(1) + '  ->  proposed ' + mab.toFixed(1)
          + '   (' + (mab / tot('Boulevard') * 100).toFixed(0) + '% of HEAD)');
console.log('=> and all four labels survive: the trunk through open land stays a bare Arterial.\n');
