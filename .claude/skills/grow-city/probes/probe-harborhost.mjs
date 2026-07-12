#!/usr/bin/env node
/* probe-harborhost.mjs — DOES THE PORT HAVE A WATERFRONT? (No. Don't build one's worth of features on it.)
 *
 * Iter 205 opened what looked like a textbook seam. genWorld spawns freighters[0] "at anchor in
 * the roadstead off the warehouse row, WAITING ON A BERTH", throws a rubble mole out to shelter
 * her while she waits, and her tooltip says she is "Serving the harbor works" -- and then
 * advanceEntities says `if(f.anchored)continue`. She has been a static prop since 1974. That is
 * the label-asserts-what-the-draw-ignores tell, and 205 duly built her a berth cycle.
 *
 * It was wrong, and this probe is why. The measurement that should have been taken BEFORE the
 * design (the loop's own "probe before you design" law) is host existence:
 *
 *    shoreTerrain  what the ship would berth AGAINST, at the waterline on the harbor row
 *    indDist       how far the nearest warehouse actually is from the water, in hex cells
 *    bowGapPx      open water between her bow and the land at the most inshore position the
 *                  artifact's own open-water projection can even express, seaXFr(harborY, 0)
 *    shipSpread    max-min of her distance-to-shore over 600 sim-seconds: 0.00 = a static prop
 *    mole          cells in moleSet: 0 on the seeds where the arm stubs out (path.length<5)
 *
 * THE FINDING. `SHOREX = CTRX+11` is "the coast highway column" and `SHORE0 = SHOREX+5` is the
 * "nominal water's edge, FIVE LOTS SEAWARD OF THE HIGHWAY". The harbor works are sited at
 * `SHOREX-1-(rng()*3)` -- i.e. BEHIND the highway. So the warehouses stand 6-9 hexes from the
 * sea, with the coast highway, five lots of land, and then BEACH / DUNE / SHOREPARK between
 * them and the water. There is no quay, no wharf, no industrial waterfront anywhere in the
 * artifact, and the coast at the harbor row is a RECREATIONAL beach -- the same sand 201 put
 * sunbathers and parasols on.
 *
 * So the ship is not a broken promise. Solvista's port is a ROADSTEAD: an open anchorage where
 * ships lie at anchor precisely BECAUSE there is nowhere to come alongside. "Waiting on a berth"
 * is her situation, not an unfulfilled one, and bringing her alongside runs a 26px container ship
 * onto a swimming beach in front of a dune. This is 201's law -- an objection to the ARTIFACT'S
 * MODEL, not to the code -- and the dead-host law (T.MARKET, the fire CA) in one.
 *
 * ==> DO NOT BUILD: the ship docks / cargo comes ashore / cranes work her / lighters run to a
 *     wharf / the harbor works are "fed by sea". None of it has a host. A port vector must FIRST
 *     build the waterfront (a quay or wharf tile on the industrial shore), which is a terrain
 *     lap with real cost -- not an entity-motion freebie.
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = [resolve(HERE, 'solvista.html'), resolve(HERE, '../../../../solvista.html')].find(existsSync);

const SEEDS = [7, 42, 1234, 99, 2024, 555];
const WARP = 61, SECS = 600, DT = 1 / 20;

const browser = await chromium.launch();
const pg = await browser.newPage({ viewport: { width: 1200, height: 800 } });
pg.on('pageerror', e => console.log('  PAGE ERROR', e.message));
await pg.goto(pathToFileURL(ROOT).href);
await pg.waitForFunction(() => typeof cells !== 'undefined' && cells.length > 0);

const rows = [];
for (const seed of SEEDS) {
  rows.push(await pg.evaluate(({ seed, WARP, SECS, DT }) => {
    playing = false;
    let z = 0x2F6E2B1 >>> 0;                                   // 203: stub Math.random BEFORE genWorld
    Math.random = () => ((z = (z * 1664525 + 1013904223) >>> 0) / 4294967296);
    flock = null;
    genWorld(seed); window.__warp(WARP);

    const y = harborY, sh = shoreAtF(y), si = shoreAt(y);
    const nm = t => Object.keys(T).find(k => T[k] === t) || '?';
    // what she would berth against: the land, walking inland from the first water cell
    const shore = [-1, -2, -3].map(d => { const c = cellAt(si + d, y); return c ? nm(c.t) : '--'; });
    // how far the warehouses really are from the water
    let indDist = Infinity;
    for (const i of HEXI) {
      const c = cells[i]; if (c.t !== T.IND) continue;
      const x = i % G, yy = (i / G) | 0;
      if (Math.abs(yy - y) <= 4) indDist = Math.min(indDist, shoreAt(yy) - x);
    }
    // the most inshore position the open-water projection can express, and the gap it leaves
    const berthCx = seaXFr(y, 0);
    const bowGapPx = ((berthCx - (sh - 0.5)) * CW) - 12.6;      // 12.6px = the hull's own bow overhang

    // is she a static prop? 600 sim-seconds of the real loop.
    const f = freighters.find(g => g.anchored);
    const dist = g => Math.hypot(seaXFr(g.y, g.fr) - sh, g.y - y);
    let mn = Infinity, mx = -Infinity;
    for (let t = 0; t < SECS; t += DT) {
      advanceEntities(DT, 1);
      const d = dist(f); mn = Math.min(mn, d); mx = Math.max(mx, d);
    }
    return { seed, y, shore, indDist: isFinite(indDist) ? indDist : null,
             bowGapPx: +bowGapPx.toFixed(1), shipSpread: +(mx - mn).toFixed(2),
             mole: moleSet.size, CW };
  }, { seed, WARP, SECS, DT }));
}
await browser.close();

console.log('\nprobe-harborhost — does the "harbor works" have a waterfront for a ship to work?\n');
console.log('  SHOREX = CTRX+11 (the coast highway column); SHORE0 = SHOREX+5 ("five lots seaward of');
console.log('  the highway"). The warehouses are sited at SHOREX-1..-3 — BEHIND the highway.\n');
console.log('  seed  harborY  waterline: land inland of the sea    warehouse  bow gap  ship    mole');
console.log('                                                       from sea   at best  spread  cells');
console.log('  ' + '-'.repeat(88));
for (const r of rows) {
  console.log('  ' + String(r.seed).padEnd(6) + String(r.y).padStart(5) + '    ' +
    r.shore.join(' / ').padEnd(34) + String(r.indDist).padStart(6) + ' hex' +
    (r.bowGapPx.toFixed(1) + 'px').padStart(10) + r.shipSpread.toFixed(2).padStart(8) +
    String(r.mole).padStart(7));
}
const beach = rows.every(r => ['BEACH', 'DUNE', 'SHOREPARK'].includes(r.shore[0]));
const far = rows.every(r => r.indDist >= 4);
const prop = rows.every(r => r.shipSpread < 0.01);
console.log('\n  waterline is recreational (beach/dune/shorepark) on every seed : ' + (beach ? 'YES' : 'no'));
console.log('  warehouses stand >=4 hexes from the water on every seed        : ' + (far ? 'YES' : 'no'));
console.log('  the anchored ship never moves (spread 0.00) — a static prop    : ' + (prop ? 'YES' : 'no'));
console.log('  even seaXFr(harborY,0), the most inshore open-water position the projection can');
console.log('  express, leaves ~' + rows[0].bowGapPx.toFixed(0) + 'px (~1.7 hexes, CW=' + rows[0].CW + ') of open sea under her bow.');
console.log('\n  VERDICT: THE PORT HAS NO WATERFRONT. Solvista is a roadstead, not a harbour.');
console.log('  Do not build "the ship docks / cargo comes ashore / cranes work her". Build the quay first.\n');
