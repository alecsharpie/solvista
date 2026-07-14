/* Is the "civic mile" a MILE, or is it the default state of the downtown street?
 *
 * The rule (solvista L2841): from EVERY CIVIC hex, BFS 3 steps out along the road
 * graph, stamping each road with that civic's id; a road reached by a SECOND civic
 * is flagged `c.fete`. Its comment promises "where two civic institutions front the
 * SAME SHORT STRETCH of street, the blocks between them string up bunting — a civic
 * mile tying the district together", and the draw strings bunting + mills a crowd on
 * every flagged cell.
 *
 * But `describeTile` PREEMPTS on c.fete (L9209):
 *     title = c.fete ? 'Festival street' : ... : c.treed ? 'Boulevard' : art ? 'Arterial'
 *                    : c.busy ? 'Avenue' : 'Street'
 * so every over-fired fete cell silently OUTRANKS the whole road-label ladder — the
 * one iter 283 had just repaired. This is 283's defect one lap later, in Civic.
 *
 * Headline needs no threshold (236): a "mile" is a SHORT STRETCH. Report
 *   - fete as a share of all road, and of CORE road (the ladder it preempts)
 *   - the CONNECTED COMPONENTS of the flag: a mile is a few short runs, not one blob
 *   - the LABEL LADDER: how many Boulevard/Arterial/Avenue titles does fete eat?
 *   - how many DISTINCT civic PAIRS actually justify each flagged cell (the rule's
 *     own claim is "TWO institutions") — and how far the flag reaches from a civic.
 *
 * Controls:
 *   - ROADS / CIVIC counts are the MUST-NOT-MOVE column (250): a label/flag lap may
 *     not move terrain.
 *   - `c.treed` (283's boulevard, just repaired and known good) is the FREE POSITIVE
 *     CONTROL (248): a correct sibling road flag on the same graph. If the probe can
 *     see a sane distribution there, a mad one on fete is the CITY, not the rig.
 *
 * Pure world data: no render, no clock, no pixels, no noise floor, nothing to stub.
 * BUILD-AGNOSTIC via SRC= (230): one file grades HEAD and the patch.
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = process.env.SRC || join(HERE, 'solvista.html');
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
    const isRoad = i => cells[i].t === T_.ROAD;

    // connected components of a boolean predicate over the road graph
    const comps = pred => {
      const seen = new Set(), out = [];
      for (let i = 0; i < G_ * G_; i++) {
        if (!pred(i) || seen.has(i)) continue;
        let n = 0; const q = [i]; seen.add(i);
        while (q.length) { const j = q.pop(); n++;
          for (const k of nbrs(j)) if (pred(k) && !seen.has(k)) { seen.add(k); q.push(k); } }
        out.push(n);
      }
      return out.sort((a, b) => b - a);
    };

    const roads = [], civics = [];
    for (let i = 0; i < G_ * G_; i++) {
      if (isRoad(i)) roads.push(i);
      if (cells[i].t === T_.CIVIC) civics.push(i);
    }

    const fete  = i => isRoad(i) && cells[i].fete;
    const treed = i => isRoad(i) && cells[i].treed;

    const feteN  = roads.filter(fete).length;
    const treedN = roads.filter(treed).length;

    // --- the LABEL LADDER: what would each road be called, and what does fete EAT?
    // transcribed from describeTile L9209 (art = isAvenue && flow >= ARTFLOW is the
    // artifact's own trunk test; read it off the page rather than re-deriving)
    const titleOf = i => {
      const x = i % G_, y = (i / G_) | 0, c = cells[i];
      const art = (typeof isAvenue === 'function') && isAvenue(x, y)
                  && (typeof ARTFLOW === 'number' ? (c.flow || 0) >= ARTFLOW : false);
      if (c.fete) return 'Festival';
      if (c.bridge) return 'Bridge';
      if (c.treed) return 'Boulevard';
      if (art) return 'Arterial';
      if (c.busy) return 'Avenue';
      return 'Street';
    };
    // ...and what it WOULD have been called with fete out of the way
    const titleNoFete = i => {
      const x = i % G_, y = (i / G_) | 0, c = cells[i];
      const art = (typeof isAvenue === 'function') && isAvenue(x, y)
                  && (typeof ARTFLOW === 'number' ? (c.flow || 0) >= ARTFLOW : false);
      if (c.bridge) return 'Bridge';
      if (c.treed) return 'Boulevard';
      if (art) return 'Arterial';
      if (c.busy) return 'Avenue';
      return 'Street';
    };
    const eaten = {};
    for (const i of roads) if (cells[i].fete) {
      const w = titleNoFete(i); eaten[w] = (eaten[w] || 0) + 1;
    }
    const titles = {};
    for (const i of roads) { const w = titleOf(i); titles[w] = (titles[w] || 0) + 1; }

    // --- how many DISTINCT civics are actually within the rule's own reach (3 road
    // steps) of each flagged cell? The rule's claim is TWO. Recompute honestly.
    const civicReach = new Map();          // road idx -> Set(civic idx)
    for (const ci of civics) {
      const x = ci % G_, y = (ci / G_) | 0;
      const seen = new Set(), q = [];
      for (const k of nbrs(ci)) if (isRoad(k) && !cells[k].bridge) { seen.add(k); q.push([k, 1]); }
      while (q.length) {
        const [j, d] = q.shift();
        if (!civicReach.has(j)) civicReach.set(j, new Set());
        civicReach.get(j).add(ci);
        if (d < 3) for (const k of nbrs(j))
          if (isRoad(k) && !cells[k].bridge && !seen.has(k)) { seen.add(k); q.push([k, d + 1]); }
      }
    }
    let pair2 = 0, pair3plus = 0, pairsSum = 0;
    for (const i of roads) if (cells[i].fete) {
      const n = (civicReach.get(i) || new Set()).size;
      pairsSum += n;
      if (n === 2) pair2++; else if (n > 2) pair3plus++;
    }

    const fc = comps(fete), tc = comps(treed);
    return {
      seed, roads: roads.length, civics: civics.length,
      feteN, fetePct: +(100 * feteN / roads.length).toFixed(1),
      feteComps: fc.length, feteBiggest: fc[0] || 0,
      feteMedComp: fc.length ? fc[Math.floor(fc.length / 2)] : 0,
      treedN, treedComps: tc.length, treedBiggest: tc[0] || 0,
      titles, eaten,
      pair2, pair3plus,
      meanCivicsInReach: feteN ? +(pairsSum / feteN).toFixed(2) : 0,
    };
  }, { seed });
  rows.push(r);
}
await b.close();

const pad = (s, n) => String(s).padStart(n);
console.log(`\nSRC = ${SRC}\n`);
console.log('=== A. IS THE CIVIC MILE A MILE? (2035) ===');
console.log('  a "mile" is a SHORT STRETCH between TWO institutions.  Controls: roads/civics must not move;');
console.log('  treed (283\'s boulevard, repaired & known good) is the free positive control.\n');
console.log('seed    roads civics |  fete  %road | comps biggest  med | civics-in-reach  =2  >2');
for (const r of rows)
  console.log(`${pad(r.seed,6)} ${pad(r.roads,6)} ${pad(r.civics,6)} | ${pad(r.feteN,5)} ${pad(r.fetePct,5)}% |`
    + ` ${pad(r.feteComps,5)} ${pad(r.feteBiggest,7)} ${pad(r.feteMedComp,4)} |`
    + ` ${pad(r.meanCivicsInReach,14)} ${pad(r.pair2,4)} ${pad(r.pair3plus,3)}`);

console.log('\n  CONTROL — treed (boulevard, 283):');
console.log('seed    treed | comps biggest');
for (const r of rows)
  console.log(`${pad(r.seed,6)} ${pad(r.treedN,6)} | ${pad(r.treedComps,5)} ${pad(r.treedBiggest,7)}`);

console.log('\n=== B. THE LABEL LADDER — what does `Festival street` PREEMPT? ===');
console.log('  describeTile L9209 tests c.fete FIRST, so a fete cell can never be called anything else.\n');
const ORD = ['Festival', 'Bridge', 'Boulevard', 'Arterial', 'Avenue', 'Street'];
console.log('seed   | ' + ORD.map(w => pad(w, 10)).join(''));
for (const r of rows)
  console.log(`${pad(r.seed,6)} | ` + ORD.map(w => pad(r.titles[w] || 0, 10)).join(''));
console.log('\n  ...and what those Festival cells WOULD have been called (the titles fete EATS):');
const EORD = ['Bridge', 'Boulevard', 'Arterial', 'Avenue', 'Street'];
console.log('seed   | ' + EORD.map(w => pad(w, 10)).join(''));
for (const r of rows)
  console.log(`${pad(r.seed,6)} | ` + EORD.map(w => pad(r.eaten[w] || 0, 10)).join(''));
console.log('');
