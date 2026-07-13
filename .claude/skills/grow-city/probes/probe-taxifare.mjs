#!/usr/bin/env node
/* probe-taxifare.mjs — DOES THE CAB EVER PICK ANYBODY UP?
 *
 * ~1 in 6 cars has worn a lemon-yellow livery and a checker band since it got its
 * paint. Iter 230 gave the flag a MEANING at night (the cab keeps no curfew, so the
 * cab's share of the traffic climbs through the small hours) and wrote, in the source:
 *
 *     the TAXI -- and the taxi is the point. ... the flag has never MEANT anything.
 *
 * ...but in the DAY it still means nothing. `stepVehicle` random-walks a taxi exactly
 * like an ordinary car (straightest 72%, else a coin), and its tooltip says
 * "still FOR HIRE once the traffic has gone home" over a cab that has never once
 * stopped for a fare. This is 249's ferry, on wheels: a label asserting a behaviour
 * the draw ignores, over a mover whose step function has one state.
 *
 * The artifact already ships BOTH halves of the fix, and this probe checks both:
 *
 *   the MECHANISM -- `dwell` is the house's own word for a call. The BUS has pulled
 *                    into its stops for 200 iterations (`v.dwell=16`), in this very
 *                    function. So the bus is a CORRECT SIBLING (248): it validates
 *                    the rig for free. If this probe cannot see the BUS stopping,
 *                    the probe is broken -- and a taxi reading 0 would be a dead
 *                    INSTRUMENT, not a dead feature (196/250).
 *
 *   the HOST      -- `livelyKerb(x,y)` = `pedRoad(x,y) && c.buzz >= KERBBUZZ`, which
 *                    the source calls "the ONE definition of a lively kerb", already
 *                    read by TWO readers (syncFleet's home pool, and re-anchoring).
 *                    A cab picking up a fare where there is "something to come out
 *                    for" is the THIRD reader of that same predicate -- 112's law
 *                    running forwards instead of being violated.
 *
 * ⚠ NOT a `peds` vector, and that is deliberate (111): a resident is leashed to its
 * anchor, so only 20-31% of any road-borne host has a live ped near it, and
 * "residents hail a cab" would be structurally capped at a quarter of the kerbs.
 * `livelyKerb` is a TERRAIN predicate -- the fare is implied by the buzz field, not
 * by a rendered figure -- so the cap does not apply.
 *
 * PART A -- the DEAD-CODE check, and it comes FIRST (T.MARKET, the plazas, the fire CA).
 *   Pure world data: no render, no clock, no pixels, no noise floor, nothing to stub.
 *   Per seed x era: how many ROAD cells, how many are a livelyKerb, and -- the question
 *   that actually decides the feature -- can a random-walking cab FIND one? (share of
 *   road cells within 3/6 steps of a kerb, over the road graph the cab actually drives.)
 *   It also sweeps the ERA, because a host the city BUILDS has a BIRTHDAY (249): if
 *   1985 has no lively kerbs, 1985 is a free EXACT dead-regime control.
 *
 * PART B -- the DEFECT, stated as a number nobody had to choose a threshold for (236).
 *   Temporal (134): every other gate in this harness is frozen, so "it never stops"
 *   has no instrument. Let the clock RUN -- driving the artifact's OWN
 *   `advanceEntities`, never a re-implementation of the rule under test (249) -- and
 *   count STOP EVENTS per class. HEAD's cab is a CONSTANT: 0 stops, forever, on every
 *   seed. That is the defect, and HEAD's own constant is the baseline, for free.
 *   Columns:
 *     TAXI  -- the treatment. HEAD must read 0.
 *     CAR   -- the must-NOT-move control (250): an ordinary car must never stop, on
 *              either build. If it moves, the fix leaked out of its own class.
 *     BUS   -- the FREE POSITIVE CONTROL (248). It already pulls in. It must read > 0
 *              on BOTH builds and must NOT change: if it does, I broke the bus.
 *
 *   node probe-taxifare.mjs            # runs against the working tree
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
/* SRC=<file> to grade another build (e.g. pristine HEAD) with NO /bin/cp swap of the
   artifact itself — 197's stale-backup hazard, and 257's fix for it. */
const SRC = process.env.SRC || join(HERE, '../../../../solvista.html');
const PAGE = pathToFileURL(SRC).href;
console.log(`\nartifact: ${SRC}`);

const SEEDS = [7, 42, 1234];
const ERAS = [['1985', 11], ['2005', 31], ['2035', 61]];
const SIMSECS = 600;          /* ten sim-minutes: long enough for a cab to cross the city */
const DT = 1 / 30;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
/* 213: stub the PRNG before the page's own script, not after */
await p.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});

/* ---------------- PART A — the host, pure world data ---------------- */
console.log('\n=== PART A — DOES THE HOST EXIST? (livelyKerb = pedRoad && buzz >= KERBBUZZ) ===');
console.log('  seed  era    ROADcells  KERBS  share   reachable<=3  <=6   (of road cells)');

const hostRows = [];
for (const seed of SEEDS) {
  for (const [eraName, warp] of ERAS) {
    await p.goto(`${PAGE}?seed=${seed}&warp=${warp}&t=0.30`);
    await p.waitForTimeout(350);
    const r = await p.evaluate(({ seed, warp }) => {
      playing = false;
      genWorld(seed);
      __warp(warp);

      /* every ROAD cell a vehicle may drive (roadNbrOpts admits T.ROAD) */
      const road = [], kerb = [];
      for (const i of HEXI) {
        const x = i % G, y = (i / G) | 0;
        const c = cells[i]; if (!c || c.t !== T.ROAD) continue;
        road.push([x, y]);
        if (livelyKerb(x, y)) kerb.push([x, y]);
      }
      /* BFS over the ROAD GRAPH ITSELF (not hexDist) from every kerb — this is the
         graph the cab actually drives, so it answers "can it find one", not "is one
         nearby as the gull flies". */
      const dist = new Map();
      const key = (x, y) => y * G + x;
      let frontier = kerb.map(([x, y]) => { dist.set(key(x, y), 0); return [x, y]; });
      let d = 0;
      while (frontier.length && d < 40) {
        d++;
        const next = [];
        for (const [x, y] of frontier)
          for (const [nx, ny] of roadNbrOpts(x, y)) {
            const k = key(nx, ny);
            if (dist.has(k)) continue;
            dist.set(k, d); next.push([nx, ny]);
          }
        frontier = next;
      }
      const within = r => road.filter(([x, y]) => (dist.get(key(x, y)) ?? 99) <= r).length;
      return {
        road: road.length, kerb: kerb.length,
        w3: within(3), w6: within(6),
        year: Math.floor(year),
      };
    }, { seed, warp });

    hostRows.push({ seed, eraName, ...r });
    const pct = n => r.road ? (100 * n / r.road).toFixed(0).padStart(3) + '%' : '  --';
    console.log(
      `  ${String(seed).padStart(4)}  ${eraName}  ${String(r.road).padStart(9)}` +
      `  ${String(r.kerb).padStart(5)}  ${pct(r.kerb)}` +
      `        ${pct(r.w3)}  ${pct(r.w6)}`);
  }
}

const k2035 = hostRows.filter(r => r.eraName === '2035');
const k1985 = hostRows.filter(r => r.eraName === '1985');
console.log(`\n  2035 kerbs per city: ${k2035.map(r => r.kerb).join(' / ')}` +
  `   1985: ${k1985.map(r => r.kerb).join(' / ')}`);
console.log('  ⇒ if 1985 has ~no kerbs, 1985 is a FREE EXACT dead-regime control (249).');

/* ---------------- PART B — the defect, temporal ---------------- */
console.log('\n=== PART B — DOES THE CAB EVER STOP? (10 sim-min, driving advanceEntities) ===');
console.log('  seed   TAXI stops   CAR stops(ctrl)   BUS stops(+ctrl)   taxis  cars  buses' +
  '   | HIRED% (viewer: share of cabs showing a DARK roof lamp at a glance)');

for (const seed of SEEDS) {
 for (const SUPPRESS of [false, true]) {
  await p.goto(`${PAGE}?seed=${seed}&warp=61&t=0.30`);
  await p.waitForTimeout(350);
  const r = await p.evaluate(({ seed, SIMSECS, DT, SUPPRESS }) => {
    /* ⚠ 248: addInitScript fixes the PRNG *function*, but the stream POSITION at the
       start of an evaluate is wall-clock dependent — the RAF frames that ran during
       page load consumed an unknown number of draws, and in the PATCHED build those
       frames include the cab's own rolls. Re-seed IN-PAGE so both builds start from
       the same position, or 204's stream shift walks the whole fleet. */
    let s0 = 0x2F6E2B1 >>> 0;
    Math.random = () => ((s0 = (s0 * 1664525 + 1013904223) >>> 0) / 4294967296);

    playing = false;
    genWorld(seed);
    __warp(61);
    syncFleet();

    /* 230 — SUPPRESS THE DECISION, in one page, without swapping the build: with no car
       flagged a cab, `v.taxi && ...` short-circuits and the roll is NEVER drawn, so the
       patched build consumes EXACTLY HEAD's stream. Its BUS column must therefore come
       back byte-identical to HEAD's — an EXACT control that my code touches only taxis. */
    if (SUPPRESS) for (const v of vehicles) v.taxi = false;

    const cls = v => v.taxi ? 'taxi' : v.kind === 'bus' ? 'bus' : v.kind === 'car' ? 'car' : null;
    const stops = { taxi: 0, car: 0, bus: 0 };
    const pop = { taxi: 0, car: 0, bus: 0 };
    for (const v of vehicles) { const k = cls(v); if (k) pop[k]++; }

    /* a STOP EVENT = a transition into standing (wait > 0). Sampled per vehicle,
       identified by object, so a fleet wobble cannot shift an index (225). */
    const was = new Map();
    const steps = Math.round(SIMSECS / DT);
    /* occupancy in the VIEWER'S units (205): at a random glance, what share of the cabs
       on screen have a fare aboard (= a dark roof lamp)? Sampled every frame. */
    let hiredFrames = 0, taxiFrames = 0;
    for (let i = 0; i < steps; i++) {
      advanceEntities(DT, 1);              /* the ARTIFACT'S OWN loop (249) */
      for (const v of vehicles) {
        const k = cls(v); if (!k) continue;
        const now = (v.wait > 0 || v.dwell > 0) ? 1 : 0;
        if (now && !was.get(v)) stops[k]++;
        was.set(v, now);
        if (k === 'taxi') { taxiFrames++; if (typeof cabFree === 'function' && !cabFree(v)) hiredFrames++; }
      }
    }
    return { stops, pop, hired: taxiFrames ? 100 * hiredFrames / taxiFrames : 0 };
  }, { seed, SIMSECS, DT, SUPPRESS });

  console.log(
    `  ${String(seed).padStart(4)} ${SUPPRESS ? 'CABS-OFF' : ' shipped'}` +
    `   ${String(r.stops.taxi).padStart(6)}` +
    `   ${String(r.stops.car).padStart(11)}   ${String(r.stops.bus).padStart(12)}` +
    `   ${String(r.pop.taxi).padStart(5)} ${String(r.pop.car).padStart(5)} ${String(r.pop.bus).padStart(6)}` +
    `   | ${r.hired.toFixed(1).padStart(5)}%`);
 }
}
console.log('\n  BUS > 0 ⇒ the rig CAN see a stop, so a TAXI 0 is a real zero (248/250).');
console.log('  CAR must be 0 on EVERY row — the must-not-move control (250).');
console.log('  CABS-OFF (230) must reproduce HEAD\'s BUS + populations EXACTLY — it proves');
console.log('  the shipped BUS drift is 204\'s shared-stream shift, not a change to the bus.');

/* ---------------- PART C — CAN THE CAB BE SEEN? (206) ---------------- */
/* "It is placed" is not "it can be seen". The first cut of the camera aimed at a hired,
   STANDING cab and framed a TOWER: the cab was at the right world point and buried behind
   it. That is not a camera bug, it is a property of the HOST — `livelyKerb` means a road
   with >=2 ATTRACT neighbours (COM/MARKET/CIVIC/STADIUM/PLAZA), i.e. exactly the ground
   with tall frontage drawn in the row IN FRONT. Draw order is depth order, so the
   predicate that makes a stop MEANINGFUL is the predicate that BURIES it (206).
   So measure the POPULATION, not the instance, and split it by STATE — because the two
   halves of this feature are seen in different places:
     the STOP  (standing at a kerb)  is downtown by construction  -> expect occlusion
     the LAMP  (hired, still driving) rides the whole road network -> should be as visible
                                                                      as any other car
   Visible ink per cab = render, then re-render with every cab spliced out, and diff in a
   box around each cab's drawn position: the changed pixels ARE the cabs, as the final
   composited frame shows them — occlusion included, floor exactly 0, one page (226/230). */
console.log('\n=== PART C — CAN IT BE SEEN? (mean visible ink per cab, by state) ===');
console.log('  seed   VACANT(lamp amber)   HIRED+MOVING(lamp dark)   STANDING at kerb   n(v/h/s)');

for (const seed of SEEDS) {
  await p.goto(`${PAGE}?seed=${seed}&warp=61&t=0.92`);
  await p.waitForTimeout(350);
  const r = await p.evaluate(({ seed }) => {
    let s0 = 0x2F6E2B1 >>> 0;
    Math.random = () => ((s0 = (s0 * 1664525 + 1013904223) >>> 0) / 4294967296);
    playing = false; genWorld(seed); __warp(61); syncFleet();
    zoom = 1; scale = fitScale; offX = fitX; offY = fitY;

    const ctx2 = cvs.getContext('2d'), W = cvs.width, H = cvs.height;
    const dev = W / innerWidth, R = Math.round(34 * dev);
    const acc = { v: [], h: [], s: [] };

    for (let t = 0; t < 60; t++) {
      for (let i = 0; i < 30 * 4; i++) advanceEntities(1 / 30, 1);   /* sample every 4 sim-sec */
      render();
      const A = ctx2.getImageData(0, 0, W, H).data;
      const cabs = vehicles.filter(v => v.taxi);
      if (!cabs.length) continue;
      const keep = cabs.map(v => [v, vehicles.indexOf(v)]);
      for (const v of cabs) vehicles.splice(vehicles.indexOf(v), 1);  /* suppress ALL cabs: 2 renders, not N */
      render();
      const B = ctx2.getImageData(0, 0, W, H).data;
      for (const [v] of keep) vehicles.push(v);
      for (const [v] of keep) {
        if (v._sx === undefined) continue;
        const cx = (v._sx * scale + offX), cy = (v._sy * scale + offY);
        if (cx < 360 && cy < 800) continue;                           /* under the placard (200) */
        const sx = cx * dev, sy = cy * dev;
        let ink = 0;
        for (let y = Math.max(0, sy - R | 0); y < Math.min(H, sy + R); y++)
          for (let x = Math.max(0, sx - R | 0); x < Math.min(W, sx + R); x++) {
            const k = (y * W + x) * 4;
            if (Math.abs(A[k] - B[k]) + Math.abs(A[k + 1] - B[k + 1]) + Math.abs(A[k + 2] - B[k + 2]) > 12) ink++;
          }
        const hired = !cabFree(v);
        acc[v.wait > 0 ? 's' : hired ? 'h' : 'v'].push(ink);
      }
    }
    const mean = a => a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0;
    return { v: mean(acc.v), h: mean(acc.h), s: mean(acc.s), n: [acc.v.length, acc.h.length, acc.s.length] };
  }, { seed });

  console.log(`  ${String(seed).padStart(4)}   ${r.v.toFixed(0).padStart(17)}` +
    `   ${r.h.toFixed(0).padStart(22)}   ${r.s.toFixed(0).padStart(16)}   ${r.n.join('/')}`);
}
console.log('\n  VACANT is the CONTROL: it is an ordinary car in an ordinary place.');
console.log('  If HIRED+MOVING ~= VACANT, the roof lamp reads wherever a cab drives, and only');
console.log('  the STOP is buried — which is a fact about the HOST (206), not about the fix.');

await b.close();
