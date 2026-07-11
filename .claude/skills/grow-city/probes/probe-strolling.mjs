#!/usr/bin/env node
/* probe-strolling — iter 154, People & activity x Interaction/UX.
 *
 * The Resident tooltip was a flat "Out for a stroll."; it is now a FUNCTION of the
 * hex the ped stands on (iter 105's functional-sub pattern), naming what the walk's
 * own step logic already sorts peds by — the pier, a lively kerb, an open green.
 * A leashed dog heels to its owner's hex, so its tooltip echoes that phrase.
 *
 * Peds are non-reproducible across loads (137), so this does NOT diff live peds:
 * `residentDoing(p)` is a PURE function of p.x/p.y, so the probe enumerates EVERY
 * cell as a hypothetical ped position, buckets cells by the phrase the PAGE returns,
 * and checks each bucket independently against the raw `cells[].t` (NOT by calling
 * residentDoing again — 122's law):
 *
 *   (1) Partition is clean — every phrase-bucket holds ONLY the tile category it
 *       claims (the "Down on the sand." bucket is all BEACH/DUNE, etc.); a mis-typed
 *       mapping leaks a wrong tile into a bucket and fails here.
 *   (2) Pier overrides tile — every cell the phrase calls a pier has onPier() true.
 *   (3) Road split — the two street phrases are exactly the pedRoad() cells, split by
 *       livelyKerb() (buzz>=2); the busy-street bucket is all high-buzz kerbs.
 *   (4) CONTROL — a building interior (RES/MID/TOWER/COM/IND, not road, not pier)
 *       gets the fallback "Out for a stroll." and NOTHING else; the mapping must not
 *       leak onto tiles a ped only passes, and such cells must exist.
 *   (5) Live — the interesting buckets are non-empty (the feature actually fires).
 *   (6) Determinism — same seed, two loads, identical phrase for a fixed cell sample.
 *
 *   node probe-strolling.mjs
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(join(HERE, '../../../../solvista.html')).href;

const SEEDS = [7, 42];
const WARP = 61; // 2035, the built-out city — the most strollable variety

/* phrase -> the ONLY tile types (by T name) that phrase is allowed to describe.
 * Road/pier phrases are validated by predicate instead (see below). */
const TILE_OK = {
  'Browsing the market stalls.': ['MARKET'],
  'Out for a walk in the green.': ['PARK', 'SHOREPARK'],
  'Pottering in the community garden.': ['GARDEN'],
  'Crossing the square.': ['PLAZA', 'QUAD'],
  'Down on the sand.': ['BEACH', 'DUNE'],
  'Out by the stadium.': ['STADIUM'],
  'Cutting across the field.': ['FIELD'],
};
const PIER_PHRASE = 'Out on the pier for the view.';
const ROAD_QUIET = 'Walking the block.';
const ROAD_BUSY = 'Window-shopping the busy street.';
const FALLBACK = 'Out for a stroll.';

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });

async function scan(seed, warp) {
  await p.goto(`${PAGE}?seed=${seed}&warp=${warp}`);
  await p.waitForTimeout(400);
  return await p.evaluate((TILE_OK) => {
    const Tname = {}; for (const k in T) Tname[T[k]] = k;
    // bucket every non-void cell by the phrase residentDoing() returns for it
    const buckets = {};   // phrase -> {tiles:Set, count, sample:[x,y]}
    const detail = [];    // per-cell facts, computed from RAW cells[] (independent)
    let sampleCell = null;
    for (let i = 0; i < cells.length; i++) {
      const c = cells[i]; if (!c || c.t === T.VOID) continue;
      const x = i % G, y = (i / G) | 0;
      const phrase = residentDoing({ x, y });
      const b = buckets[phrase] || (buckets[phrase] = { tiles: {}, count: 0 });
      b.count++; b.tiles[Tname[c.t]] = (b.tiles[Tname[c.t]] || 0) + 1;
      detail.push({ phrase, t: Tname[c.t], pier: onPier(x, y), road: pedRoad(x, y), busy: pedRoad(x, y) && livelyKerb(x, y) });
      if (x === 40 && y === 40) sampleCell = phrase;
    }
    return { buckets, detail, sampleCell };
  }, TILE_OK);
}

let fails = 0;
const fail = (m) => { console.log('  FAIL: ' + m); fails++; };

for (const seed of SEEDS) {
  const r = await scan(seed, WARP);
  console.log(`\n=== seed ${seed} (warp ${WARP}) ===`);

  // (1) tile-mapped buckets: only the allowed tile types, and each is non-empty (5)
  for (const [phrase, ok] of Object.entries(TILE_OK)) {
    const b = r.buckets[phrase];
    if (!b) { fail(`bucket empty (feature dead?): "${phrase}"`); continue; }
    const bad = Object.keys(b.tiles).filter((t) => !ok.includes(t));
    if (bad.length) fail(`"${phrase}" leaked onto ${bad.join(',')}`);
    console.log(`  ${b.count.toString().padStart(4)}  ${phrase}  [${Object.keys(b.tiles).join(',')}]`);
  }

  // (2) pier: every cell in the pier bucket must be onPier()
  const pierB = r.detail.filter((d) => d.phrase === PIER_PHRASE);
  const pierBad = pierB.filter((d) => !d.pier).length;
  if (pierBad) fail(`${pierBad} pier-phrase cells are NOT onPier()`);
  console.log(`  ${pierB.length.toString().padStart(4)}  ${PIER_PHRASE}  (all onPier: ${pierBad === 0})`);

  // (3) road split: both road phrases are exactly pedRoad cells, split by livelyKerb
  const quiet = r.detail.filter((d) => d.phrase === ROAD_QUIET);
  const busy = r.detail.filter((d) => d.phrase === ROAD_BUSY);
  if (quiet.some((d) => !d.road || d.busy)) fail(`"${ROAD_QUIET}" holds a non-quiet-road cell`);
  if (busy.some((d) => !d.busy)) fail(`"${ROAD_BUSY}" holds a non-busy-kerb cell`);
  console.log(`  ${quiet.length.toString().padStart(4)}  ${ROAD_QUIET}`);
  console.log(`  ${busy.length.toString().padStart(4)}  ${ROAD_BUSY}  (all busy kerbs: ${busy.every((d) => d.busy)})`);

  // (4) CONTROL: building interiors -> fallback only, and they exist
  const interiors = r.detail.filter((d) => ['RES', 'MID', 'TOWER', 'COM', 'IND'].includes(d.t) && !d.road && !d.pier);
  const leaked = interiors.filter((d) => d.phrase !== FALLBACK);
  if (!interiors.length) fail('no building-interior control cells found');
  if (leaked.length) fail(`${leaked.length} interior cells got a stroll phrase, e.g. "${leaked[0].phrase}" on ${leaked[0].t}`);
  console.log(`  CONTROL: ${interiors.length} interiors -> fallback only: ${leaked.length === 0}`);
}

// (6) determinism: same seed, two loads, identical phrase at a fixed cell
const a = await scan(7, WARP), c = await scan(7, WARP);
if (a.sampleCell !== c.sampleCell) fail(`non-deterministic at (40,40): "${a.sampleCell}" vs "${c.sampleCell}"`);
console.log(`\ndeterminism @ (40,40): "${a.sampleCell}" == "${c.sampleCell}": ${a.sampleCell === c.sampleCell}`);

await b.close();
console.log(fails ? `\nPROBE FAIL (${fails})` : '\nPROBE PASS');
process.exit(fails ? 1 : 0);
