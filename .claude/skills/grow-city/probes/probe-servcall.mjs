#!/usr/bin/env node
/* probe-servcall.mjs — does the service fleet actually COME HOME?
 *
 * The census for iter 204 is vacuous by construction (+0 on every metric, empty tile
 * histogram): the change is entity motion only, so the seeded rng() stream is byte-identical
 * and the CA cannot move. This probe is therefore the gate.
 *
 * The claim: each service vehicle now runs a round trip to its OWN institution's door —
 * the cruiser to the precinct yard, the ambulance to the hospital bay, the engine to the
 * firehouse apron — where it STANDS with its beacon dark, then rolls out again.
 *
 * Isolation is patch-vs-HEAD (161): two builds, identical but for the edit, same seed, same
 * stubbed Math.random, same number of stepped sim-seconds. Measured per vehicle:
 *
 *    atDoor%   share of sim-time the vehicle is standing on its own institution's door cell
 *    arrivals  how many times it pulls in
 *    meanDist  mean road-BFS distance from the vehicle to that door
 *
 * The door set and the road-BFS are RECOMPUTED HERE from the terrain, independently of the
 * artifact's own civicDoor()/roadField() — 122's law: check the claim against independently
 * recomputed truth, not against the formula under test.
 *
 * CONTROL (must NOT move): an ordinary CAR, scored against the hospital door by the very
 * same code. A car is a random walker in both builds, so if the patch had accidentally
 * routed the whole fleet home — or if `atDoor` were simply measuring "any vehicle wanders
 * past a door sometimes" — the control would move too. It must read ~0 in BOTH builds.
 *
 * SECOND TEST — the engine heads to the smoke. probe-firehost showed the fire CA is a ghost
 * (2 one-cell episodes across 3 seeds x 61 years), so the branch that answers a fire can
 * never be caught by waiting. It is FORCED instead: light a road-adjacent cell, set firesNow,
 * and watch the engine's road-distance to the smoke over the next 10s. PATCH must DESCEND;
 * HEAD, a random walker, must not.
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = [resolve(HERE, 'solvista.html'), resolve(HERE, '../../../../solvista.html')].find(existsSync);
const REPO = dirname(ROOT);

const SEEDS = [7, 42, 1234];
const WARP = 61;
const SECS = 240;        // sim-seconds of entity motion per run
const DT = 1 / 30;

const BASE = join(REPO, '.probe-servcall-base.html');
writeFileSync(BASE, execFileSync('git', ['-C', REPO, 'show', 'HEAD:solvista.html'], { maxBuffer: 1 << 28 }));

const browser = await chromium.launch();
const pg = await browser.newPage({ viewport: { width: 1200, height: 800 } });
pg.on('pageerror', e => console.log('  PAGE ERROR', e.message));

// shared in-page helpers: the door set and the road BFS, recomputed from terrain by the probe
const PROBE_LIB = `
  globalThis._door = (kind) => {
    const out = [];
    for (const i of HEXI) {
      const c = cells[i]; if (c.t !== T.CIVIC || c.kind !== kind) continue;
      const x = i % G, y = (i / G) | 0;
      for (const [dx, dy] of nbrDirs(y)) { const n = cellAt(x + dx, y + dy); if (n && n.t === T.ROAD) out.push(x + ',' + (y)); }
      for (const [dx, dy] of nbrDirs(y)) { const n = cellAt(x + dx, y + dy); if (n && n.t === T.ROAD) out.push((x + dx) + ',' + (y + dy)); }
    }
    return new Set(out.filter(s => { const [a, b] = s.split(',').map(Number); const c = cellAt(a, b); return c && c.t === T.ROAD; }));
  };
  globalThis._field = (srcs) => {
    const d = new Int32Array(G * G).fill(-1); const q = [];
    for (const s of srcs) { const [x, y] = s.split(',').map(Number); const i = idx(x, y); if (d[i] < 0) { d[i] = 0; q.push(x, y); } }
    for (let h = 0; h < q.length; h += 2) {
      const x = q[h], y = q[h + 1], dv = d[idx(x, y)];
      for (const [dx, dy] of nbrDirs(y)) {
        const nx = x + dx, ny = y + dy, n = cellAt(nx, ny); if (!n || n.t !== T.ROAD) continue;
        const j = idx(nx, ny); if (d[j] >= 0) continue;
        d[j] = dv + 1; q.push(nx, ny);
      }
    }
    return d;
  };
  globalThis._stub = () => { let s = 0x2F6E2B1 >>> 0; Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); };
`;

async function roundTrip(file, seed) {
  await pg.goto('file://' + file + '?seed=' + seed + '&warp=' + WARP);
  await pg.waitForTimeout(350);
  return await pg.evaluate(({ SECS, DT, LIB }) => {
    eval(LIB);
    playing = false; _stub();
    const HOMEK = { police: 'police', fireeng: 'firehouse', ambo: 'hospital' };
    const watch = [];
    for (const k of ['police', 'fireeng', 'ambo']) {
      const v = vehicles.find(u => u.kind === k); if (!v) continue;
      const doors = _door(HOMEK[k]);
      watch.push({ k, v, doors, fld: _field(doors), at: 0, arr: 0, sum: 0, n: 0, was: false });
    }
    // CONTROL: the ORDINARY fleet, scored against the hospital door by the identical code.
    // It must be AGGREGATE, not one car: Math.random is a single stubbed stream, and the
    // patched service vehicles draw a different NUMBER of values from it (targets, waits,
    // tie-breaks), so every later consumer -- every car -- walks a different walk in the two
    // builds. One car's atDoor% therefore swings on stream-shift alone and proves nothing.
    // Averaged over the whole ~38-car fleet that shift washes out, and what is left is the
    // only thing the control is asking: does ordinary traffic still ignore the hospital?
    const carDoors = _door('hospital'), carFld = _field(carDoors);
    const cars = vehicles.filter(u => u.kind === 'car' || u.kind === 'bus');
    for (const c of cars) watch.push({ k: '_car', v: c, doors: carDoors, fld: carFld, at: 0, arr: 0, sum: 0, n: 0, was: false });

    for (let t = 0; t < SECS; t += DT) {
      advanceEntities(DT, 1); time += DT;
      for (const w of watch) {
        const key = w.v.x + ',' + w.v.y;
        const on = w.doors.has(key);
        if (on) { w.at++; if (!w.was) w.arr++; }
        w.was = on;
        const d = w.fld[idx(w.v.x, w.v.y)];
        if (d >= 0) { w.sum += d; w.n++; }
      }
    }
    const N = Math.round(SECS / DT);
    const rows = watch.filter(w => w.k !== '_car')
      .map(w => ({ k: w.k, at: 100 * w.at / N, arr: w.arr, dist: w.n ? w.sum / w.n : -1 }));
    const cs = watch.filter(w => w.k === '_car');
    if (cs.length) rows.push({
      k: 'traffic(ctrl x' + cs.length + ')',
      at: 100 * cs.reduce((s, w) => s + w.at, 0) / (N * cs.length),
      arr: +(cs.reduce((s, w) => s + w.arr, 0) / cs.length).toFixed(1),
      dist: cs.reduce((s, w) => s + (w.n ? w.sum / w.n : 0), 0) / cs.length,
    });
    return rows;
  }, { SECS, DT, LIB: PROBE_LIB });
}

// --- FORCED FIRE: does the engine turn toward the smoke? ---
async function fireRun(file, seed) {
  await pg.goto('file://' + file + '?seed=' + seed + '&warp=' + WARP);
  await pg.waitForTimeout(350);
  return await pg.evaluate(({ DT, LIB }) => {
    eval(LIB);
    playing = false; _stub();
    const eng = vehicles.find(u => u.kind === 'fireeng'); if (!eng) return null;
    // light the road-adjacent burnable cell FARTHEST from the engine, so a random walker
    // has no chance of drifting onto it: any approach must be steering.
    const engF = _field(new Set([eng.x + ',' + eng.y]));
    let best = null, bd = -1;
    for (const i of HEXI) {
      const c = cells[i]; if (c.t !== T.FOREST && c.t !== T.RES && c.t !== T.COM) continue;
      const x = i % G, y = (i / G) | 0;
      // ALL the road cells touching this hex, exactly as the artifact's fireDoor() does. Taking
      // only the first would build a different door set from the one the engine actually steers
      // to, and the probe would then print "arrived" as a distance of 8.
      const adj = [];
      for (const [dx, dy] of nbrDirs(y)) { const n = cellAt(x + dx, y + dy); if (n && n.t === T.ROAD) adj.push((x + dx) + ',' + (y + dy)); }
      if (!adj.length) continue;
      const d = Math.min(...adj.map(a => { const v = engF[idx(...a.split(',').map(Number))]; return v < 0 ? 1e9 : v; }));
      if (d < 1e9 && d > bd) { bd = d; best = { c, adj }; }
    }
    if (!best) return null;
    best.c.fire = 4; firesNow = true;                 // the CA is frozen; the fire is held lit
    const fld = _field(new Set(best.adj));
    const d0 = fld[idx(eng.x, eng.y)];
    // 60s, not 12: the smoke is 42-66 road-steps away and the engine runs at 1.15 hex/s, so a
    // short trace cannot show a descent -- and it must first drive on to a junction where it
    // is allowed to turn (roadNbrOpts forbids the U-turn), so it often moves AWAY first.
    const trace = [];
    for (let t = 0; t < 60; t += DT) {
      advanceEntities(DT, 1); time += DT;
      if (Math.abs(t % 6) < DT) trace.push(fld[idx(eng.x, eng.y)]);
    }
    return { d0, end: fld[idx(eng.x, eng.y)], trace, duty: eng.duty || '(none)' };
  }, { DT, LIB: PROBE_LIB });
}

console.log('probe-servcall — does the service fleet come home?\n');
console.log('  ' + SECS + ' sim-seconds of entity motion, stubbed Math.random, warp=' + WARP);
console.log('  atDoor% = share of time standing on its own institution\'s door cell\n');

for (const seed of SEEDS) {
  const b = await roundTrip(BASE, seed);
  const p = await roundTrip(ROOT, seed);
  console.log('SEED ' + seed);
  console.log('    vehicle        HEAD atDoor%  arr  meanDist  |  PATCH atDoor%  arr  meanDist');
  for (const w of p) {
    const o = b.find(x => x.k === w.k) || { at: 0, arr: 0, dist: -1 };
    console.log('    ' + w.k.padEnd(12)
      + o.at.toFixed(1).padStart(11) + '%' + String(o.arr).padStart(5) + o.dist.toFixed(1).padStart(10)
      + '  | ' + p.find(x => x.k === w.k).at.toFixed(1).padStart(12) + '%'
      + String(w.arr).padStart(5) + w.dist.toFixed(1).padStart(10));
  }
  console.log();
}

console.log('FORCED FIRE — the engine is sent at the FARTHEST road-adjacent burnable cell.');
console.log('  road-distance from the engine to the smoke, sampled every 6s over 60s:\n');
for (const seed of SEEDS) {
  const b = await fireRun(BASE, seed);
  const p = await fireRun(ROOT, seed);
  if (!b || !p) { console.log('  seed ' + seed + ': no engine'); continue; }
  console.log('  seed ' + String(seed).padEnd(5)
    + ' HEAD  d0=' + String(b.d0).padStart(3) + '  -> ' + b.trace.join(' ') + '   (duty ' + b.duty + ')');
  console.log('       ' + ' '.repeat(5)
    + ' PATCH d0=' + String(p.d0).padStart(3) + '  -> ' + p.trace.join(' ') + '   (duty ' + p.duty + ')');
}
await browser.close();
unlinkSync(BASE);
