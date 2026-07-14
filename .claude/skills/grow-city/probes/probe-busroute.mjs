/* probe-busroute — DOES THE BUS EVER CALL AT ITS OWN STOPS?
 *
 * Solvista scatters bus shelters on a 5% coin over eligible street (`c.stop`), draws a
 * queue of figures under each canopy, and prints "3 waiting" in the tooltip. `stopQueue`
 * says it "builds while nobody comes and empties when one does" — and the bus that is
 * supposed to come is spawned on a UNIFORMLY RANDOM road and then RANDOM-WALKS
 * (`stepVehicle`'s straightest-72%-else-any rule, byte-identical to an ordinary car).
 * It only calls at a shelter it happens to blunder into.
 *
 * ⚠ HEAD'S ANSWER NEEDS NO THRESHOLD (236): `stopQueue` reads
 *     since = (c.blast === undefined) ? 1e4 : time - c.blast
 * so a stop no bus has EVER reached is pinned at its own `stopCap` — a permanently
 * saturated shelter — for the artifact's entire life. DISTINCT QUEUE STATES = 1 there.
 *
 * A. HOST — pure world data, no clock, no pixels, no noise floor. The road graph's
 *    CONNECTED COMPONENTS (263: a thing that must TRAVEL a host needs a NEIGHBOUR, not a
 *    population), the stops, and how they fall across components. Run this BEFORE
 *    designing: if the stops sit in components a bus cannot reach, no routing rule helps.
 *
 * B. TEMPORAL (134) — every other gate in this harness is frozen, so "it never comes"
 *    has no instrument. Drives the artifact's OWN `advanceEntities` and counts CALLS PER
 *    STOP (the `c.blast` stamp stepVehicle itself writes). Reads NO PIXELS ⇒ no floor.
 *    BUILD-AGNOSTIC: it only reads the artifact's own state, so ONE file grades HEAD and
 *    the patch with no source swap and no cross-build floor (230).
 *
 *    ⚠ THE TAXI IS THE FREE POSITIVE CONTROL (248): a correct sibling mover in the SAME
 *      array and the SAME function that provably stops (258 built it, `v.dwell`), so a
 *      bus reading 0 is a REAL zero and not a dead rig.
 *    ⚠ THE CAR is the must-not-move column (250) — and it is an AGGREGATE, never an
 *      individual, because a patched bus draws a different number of values from the
 *      SHARED Math.random stream and walks every car downstream (204).
 */
import { homedir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join, isAbsolute } from 'path';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;

const HERE = dirname(fileURLToPath(import.meta.url));
const FILE = process.env.SRC
  ? (isAbsolute(process.env.SRC) ? process.env.SRC : join(HERE, process.env.SRC))
  : join(HERE, '../../../../solvista.html');
const SEEDS = [7, 42, 1234, 99, 555, 2024];
const YEAR = 2035;
const SIMSEC = 900;          /* 15 sim-minutes — far longer than any viewer watches */
const DT = 0.1;

const br = await chromium.launch();
const page = await br.newPage({ viewport: { width: 1400, height: 900 } });
/* 213: stub the PRNG before the page's own script, or every Math.random-spawned
   entity is baked in at load and differs on every run. */
await page.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await page.goto('file://' + FILE);
await page.waitForFunction(() => window.__census !== undefined);

const A = [], B = [];
for (const seed of SEEDS) {
  const r = await page.evaluate(({ seed, year, simsec, dt }) => {
    playing = false;
    genWorld(seed);
    __warp(year);
    syncFleet();

    /* ---- A. HOST: the road graph, its components, and where the stops fall ---- */
    const stops = [], roadIdx = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)];
      if (c.t === T.ROAD) { roadIdx.push([x, y]); if (c.stop) stops.push([x, y, c.stop]); }
    }
    const comp = new Map();                       /* idx -> component id */
    let nc = 0;
    for (const [x, y] of roadIdx) {
      if (comp.has(idx(x, y))) continue;
      const id = nc++, q = [[x, y]]; comp.set(idx(x, y), id);
      while (q.length) {
        const [a, b] = q.pop();
        for (const [nx, ny] of roadNbrOpts(a, b)) {
          if (!comp.has(idx(nx, ny))) { comp.set(idx(nx, ny), id); q.push([nx, ny]); }
        }
      }
    }
    const sz = new Array(nc).fill(0);
    for (const v of comp.values()) sz[v]++;
    const big = Math.max(...sz);
    const stopComp = stops.map(([x, y]) => comp.get(idx(x, y)));
    const stopsInBig = stopComp.filter(c => sz[c] === big).length;

    /* ---- B. TEMPORAL: drive the artifact's own step loop and count CALLS ---- */
    const buses = vehicles.filter(v => v.kind === 'bus');
    const cabs = vehicles.filter(v => v.taxi);
    const cars = vehicles.filter(v => v.kind === 'car' && !v.taxi);
    const calls = new Map(), lastAt = new Map(), headways = [];
    for (const [x, y] of stops) calls.set(idx(x, y), 0);
    let taxiStops = 0;
    const carHex = new Set();
    const wasDwell = new Map(cabs.map(v => [v, v.dwell > 0]));

    for (let t = 0; t < simsec; t += dt) {
      advanceEntities(dt, 1);
      for (const [x, y] of stops) {
        const c = cells[idx(x, y)];
        if (c.blast !== undefined && c.blast !== lastAt.get(idx(x, y))) {
          if (lastAt.has(idx(x, y))) headways.push(c.blast - lastAt.get(idx(x, y)));
          lastAt.set(idx(x, y), c.blast);
          calls.set(idx(x, y), calls.get(idx(x, y)) + 1);
        }
      }
      for (const v of cabs) { const d = v.dwell > 0; if (d && !wasDwell.get(v)) taxiStops++; wasDwell.set(v, d); }
      for (const v of cars) carHex.add(idx(v.x, v.y));
    }

    const served = [...calls.values()].filter(n => n > 0).length;
    const never = stops.length - served;
    /* the queue at a never-called stop: stopQueue's own arithmetic, sampled over the run */
    const dead = stops.find(([x, y]) => calls.get(idx(x, y)) === 0);
    let deadQ = null;
    if (dead) { const c = cells[idx(dead[0], dead[1])];
      deadQ = { q: stopQueue(c, dead[0], dead[1]).q, cap: stopCap(c, dead[0], dead[1]), blast: c.blast === undefined }; }
    headways.sort((a, b) => a - b);
    const med = headways.length ? headways[headways.length >> 1] : null;

    return {
      seed, roads: roadIdx.length, comps: nc, big, stops: stops.length, stopsInBig,
      buses: buses.length, cabs: cabs.length,
      served, never, med: med === null ? null : +med.toFixed(0),
      totCalls: [...calls.values()].reduce((a, b) => a + b, 0),
      deadQ, taxiStops, carHex: carHex.size, cars: cars.length,
    };
  }, { seed, year: YEAR, simsec: SIMSEC, dt: DT });
  A.push(r); B.push(r);
}
await br.close();

console.log(`\nprobe-busroute   ${FILE.split('/').pop()}   year ${YEAR}   ${SIMSEC}s of sim per seed\n`);
console.log('A. HOST — the road graph the bus must travel (pure world data)');
console.log('  seed | roads | comps | biggest | stops | stops in biggest');
for (const r of A) console.log(`  ${String(r.seed).padStart(4)} | ${String(r.roads).padStart(5)} | ${String(r.comps).padStart(5)} | ${String(r.big).padStart(7)} | ${String(r.stops).padStart(5)} | ${r.stopsInBig}/${r.stops}`);

console.log('\nB. DOES A BUS EVER COME?  (calls counted off the artifact\'s own c.blast stamp)');
console.log('  seed | buses | SERVED | NEVER CALLED AT | median headway | total calls | TAXI STOPS (+ctl) | cars (must-not-move, aggregate)');
for (const r of B) {
  const pct = (100 * r.never / r.stops).toFixed(0);
  console.log(`  ${String(r.seed).padStart(4)} | ${String(r.buses).padStart(5)} | ${String(r.served).padStart(6)} | ${String(r.never).padStart(3)}/${r.stops} (${pct}%) | ${r.med === null ? '   n/a' : String(r.med).padStart(4) + 's'}          | ${String(r.totCalls).padStart(4)}        | ${String(r.taxiStops).padStart(4)}              | ${r.cars} cars, ${r.carHex} hexes`);
}
const nev = B.reduce((a, r) => a + r.never, 0), tot = B.reduce((a, r) => a + r.stops, 0);
console.log(`\n  ⇒ ${nev}/${tot} shelters (${(100 * nev / tot).toFixed(0)}%) never saw a bus in ${SIMSEC}s.`);
const dq = B.find(r => r.deadQ);
if (dq) console.log(`  ⇒ a never-called shelter's queue: q=${dq.deadQ.q} of cap ${dq.deadQ.cap}, c.blast undefined=${dq.deadQ.blast}` +
  `  ⇒ SATURATED, DISTINCT QUEUE STATES = 1, forever (236).`);
console.log('');
