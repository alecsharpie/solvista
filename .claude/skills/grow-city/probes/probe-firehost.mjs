#!/usr/bin/env node
/* probe-firehost.mjs — is there a FIRE for the engine to drive to?  (probe BEFORE you design)
 *
 * The seam: three labels promise the fire engine answers the fire —
 *   placard L143   "Fires jump block to block until the 1991 firehouse; the engine still patrols."
 *   CIVICDESC      firehouse: "Engines behind roll-up doors, ready for the fires on the hill."
 *   VKIND.fireeng  "Lights on, heading to the smoke."
 * ...and stepVehicle steers EVERY vehicle the same way: straightest-continuation 72%,
 * random neighbour otherwise. The engine is a random walker with a coral paint job.
 * Its beacon truthfully flashes on the global `firesNow`, so it KNOWS there is a fire
 * somewhere and still will not go.
 *
 * Before writing a line of the Connect, price the HOST (the dead-code law: T.MARKET was
 * fully drawn and read 0 in every seed and era). Two ways this vector can be born dead:
 *
 *  (1) NO FIRE TO DRIVE TO.  Ignition is year-gated: blocks `year<2006`, forest `year<2030`.
 *      At the era every screenshot is taken in (2035) NOTHING can ignite -- so if fires are
 *      also rare before then, the engine has no host at all.
 *
 *  (2) NO TIME TO GET THERE.  A tick is 0.45 REAL SECONDS (frame(): `while(tickAcc>0.45)`),
 *      and a cell burns `c.fire=4` ticks => ONE burning cell lives 1.8s. The engine runs at
 *      sp=1.15 hexes/sec, so it can close ~2 hexes in a cell's whole life. Steering it at a
 *      single cell is pointless BY CONSTRUCTION.
 *      The only thing that can save the vector is SPREAD: fire jumps to neighbours at
 *      c.fire===2 (forest 0.26 / RES 0.18 pre-92), so an EPISODE -- a maximal run of
 *      consecutive ticks with anything burning -- can far outlive any single cell.
 *
 * So the question this probe answers is exactly: HOW LONG IS AN EPISODE, and how far can an
 * engine travel in one?  `reach = 1.15 hex/s * 0.45 s/tick * episodeTicks`.  If the median
 * episode's reach is >= its distance to the fire, the vector is alive; if not, it is T.MARKET
 * and I should log that and pick another vector.
 *
 * Also measured: can the engine ever pull UP to the smoke? A forest fire in the hills may
 * have no road within reach -- so for every episode, the road-BFS distance from the road
 * network to the nearest cell adjacent to a burning hex.
 *
 * Pure measurement of SHIPPED HEAD. Nothing is patched; no control needed.
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = [resolve(HERE, 'solvista.html'), resolve(HERE, '../../../../solvista.html')].find(existsSync);

const SEEDS = [7, 42, 1234];
const SECS_PER_TICK = 0.45;   // frame(): while(tickAcc>0.45){ tick() }
const ENG_HEX_PER_S = 1.15;   // syncFleet: service fleet sp:1.15 ; stepVehicle: p += dt*sp

const browser = await chromium.launch();
const pg = await browser.newPage({ viewport: { width: 1200, height: 800 } });
pg.on('pageerror', e => console.log('  PAGE ERROR', e.message));

async function run(seed) {
  await pg.goto('file://' + ROOT + '?seed=' + seed);
  await pg.waitForTimeout(400);
  return await pg.evaluate(() => {
    playing = false;                       // the RAF loop must not tick behind my back

    // road-BFS: steps over ROAD cells from a multi-source set, so "can the engine get there"
    // is answered on the network the engine actually drives (not straight-line hexDist).
    const roadDistFrom = (srcs) => {
      const d = new Int32Array(G * G).fill(-1);
      const q = [];
      for (const [x, y] of srcs) { const i = idx(x, y); if (d[i] < 0) { d[i] = 0; q.push([x, y]); } }
      for (let h = 0; h < q.length; h++) {
        const [x, y] = q[h], dv = d[idx(x, y)];
        for (const [dx, dy] of nbrDirs(y)) {
          const nx = x + dx, ny = y + dy;
          const c = cellAt(nx, ny); if (!c || c.t !== T.ROAD) continue;
          const j = idx(nx, ny); if (d[j] >= 0) continue;
          d[j] = dv + 1; q.push([nx, ny]);
        }
      }
      return d;
    };

    const ticks = [];
    for (let k = 0; k < 820; k++) {        // 1974 -> ~2035, the same 0.075yr/tick __warp uses
      year += 0.45 / 6; tick();
      const burn = [];
      for (const i of HEXI) if (cells[i].fire > 0) burn.push([i % G, (i / G) | 0]);
      ticks.push({ year, burn });
    }

    // episodes = maximal runs of consecutive ticks with anything burning
    const eps = [];
    let cur = null;
    for (const t of ticks) {
      if (t.burn.length) { if (!cur) cur = { y0: t.year, n: 0, peak: 0, cells: new Set() }; cur.n++; cur.peak = Math.max(cur.peak, t.burn.length); for (const b of t.burn) cur.cells.add(b[0] + ',' + b[1]); }
      else if (cur) { eps.push(cur); cur = null; }
    }
    if (cur) eps.push(cur);

    // for each episode: how far is the fire from the ROAD NETWORK? (BFS out of the burning
    // cells over roads -- 0 means a road cell is on/next to the smoke)
    for (const e of eps) {
      const src = [...e.cells].map(s => s.split(',').map(Number));
      // seed the BFS from every ROAD cell adjacent to a burning cell
      const seeds = [];
      for (const [x, y] of src) for (const [dx, dy] of nbrDirs(y)) {
        const c = cellAt(x + dx, y + dy); if (c && c.t === T.ROAD) seeds.push([x + dx, y + dy]);
      }
      e.roadAdj = seeds.length;             // 0 => no road touches this fire at all
    }

    const band = (y) => y < 1991 ? 'pre-engine' : y < 2006 ? '1991-2005' : y < 2030 ? '2006-2029' : '2030+';
    const bands = {};
    for (const t of ticks) {
      const b = band(t.year);
      (bands[b] ||= { ticks: 0, burnTicks: 0, cells: 0 });
      bands[b].ticks++;
      if (t.burn.length) { bands[b].burnTicks++; bands[b].cells += t.burn.length; }
    }
    return {
      bands,
      eps: eps.map(e => ({ y: e.y0, n: e.n, peak: e.peak, size: e.cells.size, roadAdj: e.roadAdj })),
    };
  });
}

console.log('probe-firehost — is there a fire for the engine to drive to?');
console.log('  a tick = ' + SECS_PER_TICK + ' real s   |   engine = ' + ENG_HEX_PER_S + ' hex/s'
  + '   =>  reach = ' + (SECS_PER_TICK * ENG_HEX_PER_S).toFixed(2) + ' hex per tick of episode\n');

for (const seed of SEEDS) {
  const r = await run(seed);
  console.log('SEED ' + seed);
  console.log('  era band     ticks  burning  %burning   mean cells lit');
  for (const b of ['pre-engine', '1991-2005', '2006-2029', '2030+']) {
    const v = r.bands[b]; if (!v) continue;
    console.log('  ' + b.padEnd(12) + String(v.ticks).padStart(5) + String(v.burnTicks).padStart(9)
      + (100 * v.burnTicks / v.ticks).toFixed(1).padStart(9) + '%'
      + (v.burnTicks ? (v.cells / v.burnTicks).toFixed(2) : '-').padStart(16));
  }
  // episodes in the engine's own era (>=1991) -- the only ones that can ever be answered
  const live = r.eps.filter(e => e.y >= 1991);
  const durs = live.map(e => e.n).sort((a, b) => a - b);
  const med = durs.length ? durs[durs.length >> 1] : 0;
  const noRoad = live.filter(e => e.roadAdj === 0).length;
  console.log('  episodes (year>=1991, the engine exists): ' + live.length
    + '   median ' + med + ' ticks = ' + (med * SECS_PER_TICK).toFixed(1) + 's'
    + '   longest ' + (durs.length ? durs[durs.length - 1] : 0) + ' ticks');
  console.log('    => a steering engine could travel ' + (med * SECS_PER_TICK * ENG_HEX_PER_S).toFixed(1)
    + ' hex in the MEDIAN episode, ' + ((durs[durs.length - 1] || 0) * SECS_PER_TICK * ENG_HEX_PER_S).toFixed(1) + ' hex in the longest');
  console.log('    fires with NO road adjacent (unreachable): ' + noRoad + ' / ' + live.length);
  console.log('    episode sizes: ' + live.map(e => e.size).sort((a, b) => b - a).slice(0, 8).join(', ') + ' ...(hexes burnt)');
  console.log();
}
await browser.close();
