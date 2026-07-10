#!/usr/bin/env node
/* probe-square.mjs — cue (d): does the civic quarter have a real square?
 *
 * For each MAJORK institution at 2035, report:
 *   - quarter member?  (>=2 other MAJORK within 4 hexes)
 *   - did it get a forecourt (PLAZA adjacent)?
 *   - if not, WHY: suppressed by the radius-2 guard, or no eligible lot?
 *   - for the suppressed: is there a FORECOURT_LOT neighbour of the major that
 *     is ALSO adjacent to the blocking PLAZA?  (i.e. does the existing geometry
 *     REACH — iter 109's law: a connector you have to draw is one you got wrong.)
 *
 * Also: PLAZA contiguous patch sizes, so "one lot" vs "a square" is a number.
 */
import { homedir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const REPO = resolve(dirname(fileURLToPath(import.meta.url)));
const PAGE = pathToFileURL(join(REPO, process.argv[3] || 'solvista.html')).href;
const SEEDS = (process.argv[2] || '7,42,1234').split(',').map(Number);

const b = await chromium.launch();
for (const seed of SEEDS) {
  const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
  await p.goto(`${PAGE}?seed=${seed}&warp=61`, { waitUntil: 'load' });
  await p.waitForTimeout(600);
  const r = await p.evaluate(() => {
    const at = (x, y) => cellAt(x, y);
    const majors = [];
    for (const i of HEXI) {
      const c = cells[i], x = i % G, y = (i / G) | 0;
      if (c.t === T.CIVIC && MAJORK.has(c.kind)) majors.push([x, y, c]);
    }
    const around = (x, y, r, f) => countAround(x, y, r, f);
    const rows = majors.map(([x, y, c]) => {
      const peers = majors.filter(([ax, ay]) => (ax !== x || ay !== y) && hexDist(x, y, ax, ay) <= 4).length;
      // adjacent plaza = got a forecourt
      const adjPlaza = around(x, y, 1, n => n.t === T.PLAZA);
      const r2Plaza = around(x, y, 2, n => n.t === T.PLAZA);
      // eligible lots at my door
      let lots = 0, reach = 0;
      for (const d of nbrDirs(y)) {
        const nx = x + d[0], ny = y + d[1], n = at(nx, ny);
        if (!n || !FORECOURT_LOT.has(n.t)) continue;
        let hasRoad = false;
        nbrs6(nx, ny, (mx, my) => { const m = at(mx, my); if (m && m.t === T.ROAD) hasRoad = true; });
        if (!hasRoad) continue;
        lots++;
        // does this lot touch an EXISTING plaza? then growing the square needs no new geometry
        let touches = false;
        nbrs6(nx, ny, (mx, my) => { const m = at(mx, my); if (m && m.t === T.PLAZA) touches = true; });
        if (touches) reach++;
      }
      // THE DECISIVE NUMBER: a square can only grow from its HEAD (the forecourt).
      // What sits around the head? And how many of those are lots one could pave?
      let head = null, hi = 1e9;
      for (const d of nbrDirs(y)) {
        const nx = x + d[0], ny = y + d[1], n = at(nx, ny);
        if (n && n.t === T.PLAZA && idx(nx, ny) < hi) { hi = idx(nx, ny); head = [nx, ny]; }
      }
      let headNbrs = '', annexLots = 0;
      if (head) {
        const kinds = [];
        for (const d of nbrDirs(head[1])) {
          const nx = head[0] + d[0], ny = head[1] + d[1], n = at(nx, ny);
          if (!n) continue;
          kinds.push(Object.keys(T).find(k => T[k] === n.t));
          if (!FORECOURT_LOT.has(n.t)) continue;
          let road = false;
          nbrs6(nx, ny, (mx, my) => { const m = at(mx, my); if (m && m.t === T.ROAD) road = true; });
          if (road) annexLots++;              // eligible: a lot, touching the head, fronting a street
        }
        headNbrs = kinds.join('/');
      }
      return { kind: c.kind, peers, adjPlaza, r2Plaza, lots, reach, headNbrs, annexLots };
    });
    // plaza patches (hex-connected)
    const seen = new Set(), patches = [];
    for (const i of HEXI) {
      if (cells[i].t !== T.PLAZA || seen.has(i)) continue;
      let n = 0; const st = [i]; seen.add(i);
      while (st.length) {
        const j = st.pop(); n++;
        const x = j % G, y = (j / G) | 0;
        nbrs6(x, y, (mx, my) => {
          const m = at(mx, my); if (!m || m.t !== T.PLAZA) return;
          const k = idx(mx, my); if (seen.has(k)) return; seen.add(k); st.push(k);
        });
      }
      patches.push(n);
    }
    return { rows, patches: patches.sort((a, b) => b - a) };
  });

  const quarter = r.rows.filter(x => x.peers >= 2);
  const supp = quarter.filter(x => x.adjPlaza === 0 && x.r2Plaza > 0);
  console.log(`\n=== seed ${seed} ===`);
  console.log(`majors ${r.rows.length}  ·  quarter members (>=2 peers within 4) ${quarter.length}`);
  console.log(`PLAZA patches: [${r.patches.join(', ')}]  (total ${r.patches.reduce((a, c) => a + c, 0)})`);
  for (const x of r.rows)
    console.log(`  ${x.kind.padEnd(11)} peers=${x.peers} adjPlaza=${x.adjPlaza} r2Plaza=${x.r2Plaza} lots=${x.lots} annexLots=${x.annexLots}` +
      (x.headNbrs ? `  head nbrs: ${x.headNbrs}` : ''));
  console.log(`SUPPRESSED (quarter member, no forecourt, plaza within 2): ${supp.length}`);
  console.log(`  ...of those, having a lot that TOUCHES the blocking plaza: ${supp.filter(x => x.reach > 0).length}`);
  console.log(`  ...of those, having any eligible lot at all:               ${supp.filter(x => x.lots > 0).length}`);
  const withHead = quarter.filter(x => x.adjPlaza > 0);
  console.log(`QUARTER MEMBERS WITH A FORECOURT: ${withHead.length}`);
  console.log(`  ...whose forecourt has an eligible ANNEX lot (pavable, fronts a street): ${withHead.filter(x => x.annexLots > 0).length}`);
  await p.close();
}
await b.close();
