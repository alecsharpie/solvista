/* probe-quarter.mjs — DIAGNOSTIC for cue (d): can the civic quarter's private
 * 1-hex forecourts be merged into ONE legible 3-hex square by pedestrianising
 * the street they share?  Measures, in-page, the real geometry before any code
 * is written (the "probe before you design" law):
 *
 *   - group MAJORK civics into quarters (hexDist <= QFAR)
 *   - find each major's forecourt PLAZA (c.own -> major)
 *   - find ROAD cells that bridge two quarter squares/majors ("the civic mile")
 *   - for each, simulate ROAD->PLAZA and report the resulting contiguous PLAZA
 *     patch size (>=3 is the target; 101's contrast x width law)
 *   - report the ROAD-reader HAZARDS on that cell (bridge/stop/hstr/flow/
 *     mono/gond/busy) that an audit lap must clear
 *
 *   node probe-quarter.mjs            # seeds 42 7 1234, warp 61
 */
import { homedir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const HERE = dirname(fileURLToPath(import.meta.url));
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const ART = pathToFileURL(join(HERE, '../../../../solvista.html')).href;

const seeds = process.argv.slice(2).length ? process.argv.slice(2) : ['42', '7', '1234'];
const warp = '61';

const browser = await chromium.launch();
for (const seed of seeds) {
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  const errs = [];
  page.on('pageerror', e => errs.push(String(e)));
  await page.goto(ART + `?seed=${seed}&warp=${warp}&t=0.3`);
  await page.waitForTimeout(1400);

  const out = await page.evaluate(() => {
    const majors = [];
    for (let i = 0; i < cells.length; i++) {
      const c = cells[i];
      if (c.t === T.CIVIC && MAJORK.has(c.kind)) majors.push({ i, x: i % G, y: (i / G) | 0, kind: c.kind });
    }
    // forecourt plazas keyed by owner major idx
    const foreOf = new Map();
    for (let i = 0; i < cells.length; i++) {
      const c = cells[i];
      if (c.t === T.PLAZA && c.own != null && cells[c.own] && cells[c.own].t === T.CIVIC)
        foreOf.set(c.own, i);
    }
    // quarter grouping (union of majors within QFAR)
    const seen = new Set(), quarters = [];
    for (const m of majors) {
      if (seen.has(m.i)) continue;
      const grp = [m]; seen.add(m.i);
      for (const n of majors) if (!seen.has(n.i) && hexDist(m.x, m.y, n.x, n.y) <= QFAR) { grp.push(n); seen.add(n.i); }
      quarters.push(grp);
    }
    const inMono = i => (typeof monoSet !== 'undefined' && monoSet.has(i));
    const inGond = i => (typeof gondSet !== 'undefined' && gondSet.has(i));
    const patchSize = (startIdx, extraPlaza) => {   // contiguous PLAZA flood incl. a hypothetical extra
      const isP = i => i === extraPlaza || (cells[i] && cells[i].t === T.PLAZA);
      const q = [startIdx], seenP = new Set([startIdx]); let n = 0;
      while (q.length) { const i = q.pop(); if (!isP(i)) continue; n++;
        const x = i % G, y = (i / G) | 0;
        nbrs6(x, y, (mx, my) => { const j = idx(mx, my); if (!seenP.has(j) && isP(j)) { seenP.add(j); q.push(j); } });
      }
      return n;
    };
    const cands = [];
    for (let qi = 0; qi < quarters.length; qi++) {
      const grp = quarters[qi];
      if (grp.length < 2) continue;
      const foreIdx = new Set(grp.map(m => foreOf.get(m.i)).filter(v => v != null));
      const majIdx = new Set(grp.map(m => m.i));
      // ROAD cells adjacent to >=2 of {quarter forecourts, quarter majors}
      const roadSeen = new Set();
      for (const fi of [...foreIdx, ...majIdx]) {
        const x = fi % G, y = (fi / G) | 0;
        nbrs6(x, y, (rx, ry) => {
          const j = idx(rx, ry), c = cells[j];
          if (!c || c.t !== T.ROAD || roadSeen.has(j)) return;
          roadSeen.add(j);
          let touchFore = 0, touchMaj = 0;
          nbrs6(rx, ry, (ax, ay) => { const k = idx(ax, ay);
            if (foreIdx.has(k)) touchFore++; if (majIdx.has(k)) touchMaj++; });
          if (touchFore + touchMaj < 2) return;             // must bridge two quarter things
          // simulate pedestrianising: patch size if this ROAD became PLAZA
          const size = patchSize(j, j);
          cands.push({ qi, x: rx, y: ry, touchFore, touchMaj, size,
            haz: [c.bridge && 'bridge', c.stop && 'stop', c.hstr && 'hstr',
                  (c.flow >= ARTFLOW) && 'ARTERIAL', c.busy && 'busy', c.treed && 'treed',
                  inMono(j) && 'MONO', inGond(j) && 'GOND'].filter(Boolean) });
        });
      }
    }
    const foreSizes = [...foreOf.values()].map(i => patchSize(i, -1));
    // OTHER reading of cue (d): grow a forecourt to 3 hexes by annexing adjacent
    // *pavable* lots (FORECOURT_LOT) WITHOUT taking ROAD or CIVIC. Report, per
    // forecourt, how many such lots are adjacent and their tile types (RES/MID/
    // COM cost pop; EMPTY is free). Reaching 3 needs >=2 annexable lots.
    const annex = [];
    for (const fi of foreOf.values()) {
      const x = fi % G, y = (fi / G) | 0, lots = [];
      nbrs6(x, y, (ax, ay) => { const c = cells[idx(ax, ay)];
        if (c && FORECOURT_LOT.has(c.t)) lots.push(Object.keys(T).find(k => T[k] === c.t)); });
      annex.push({ x, y, n: lots.length, lots });
    }
    return {
      majors: majors.length, quarters: quarters.map(g => g.length),
      forecourts: foreOf.size, foreSizes,
      cands, annex, ARTFLOW: typeof ARTFLOW !== 'undefined' ? ARTFLOW : null,
      haveMono: typeof monoSet !== 'undefined', haveGond: typeof gondSet !== 'undefined',
    };
  });

  console.log(`\nseed ${seed} — majors ${out.majors}, quarters ${out.quarters.filter(n=>n>1).length} multi `
    + `(sizes ${out.quarters.join(',')}), forecourts ${out.forecourts} `
    + `(all 1-hex? ${out.foreSizes.every(s=>s===1)} :: ${out.foreSizes.join(',')})`);
  console.log(`  monoSet:${out.haveMono} gondSet:${out.haveGond} ARTFLOW:${out.ARTFLOW}`);
  if (!out.cands.length) console.log('  NO shared-street candidates (no ROAD bridges two quarter squares/majors)');
  for (const c of out.cands)
    console.log(`  cand q${c.qi} (${c.x},${c.y}) touchFore=${c.touchFore} touchMaj=${c.touchMaj} `
      + `-> patch ${c.size} hex${c.size>=3?' *** >=3':''}  haz=[${c.haz.join(',')||'none'}]`);
  const reach3 = out.annex.filter(a => a.n >= 2).length;
  console.log(`  annex-to-3: ${reach3}/${out.annex.length} forecourts have >=2 pavable-lot neighbours `
    + `(EMPTY free / RES,MID,COM cost pop):`);
  for (const a of out.annex)
    console.log(`    fore (${a.x},${a.y}) pavable-nbrs=${a.n} [${a.lots.join(',')||'-'}]`);
  if (errs.length) console.log('  PAGEERRORS:', errs.slice(0, 2));
  await page.close();
}
await browser.close();
