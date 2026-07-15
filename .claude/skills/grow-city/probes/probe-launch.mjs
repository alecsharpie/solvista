/* probe-launch — does the HARBOUR LAUNCH work the ship at anchor, and stay in the water?
 *
 * New element (iter 297): a small harbour launch runs the short leg between the harbour
 * waterline and the anchored container ship's side. This asks, in the units the change is
 * about — nothing here can be judged from a still, and the census is Math.random-only vacuous:
 *   (1) EXISTS iff a ship rides at anchor           (1 launch <-> 1 anchored freighter)
 *   (2) PATH IN WATER: every point of her whole ping-pong lands on WATER, never the beach,
 *       the void, the pier or the ship's own hex                     (must be 100%)
 *   (3) GEOMETRY: her shore end A is SEAWARD of the waterline, her ship end B is INSHORE of
 *       the hull, so the leg threads the near-shore water band the right way round.
 *
 * Pure world data driven off the artifact's OWN launchPts/launchPos — no render, no pixels,
 * no noise floor, nothing to stub but Math.random (248: re-seeded in-page before genWorld).
 *
 * CONTROLS (250, measured not assumed):
 *   - the anchored FREIGHTER's own cell must be WATER  (a correct sibling: the water test is
 *     meaningful, and the ship is genuinely offshore)
 *   - one column INSHORE of the shore end A must be NON-water (BEACH/land) — the discriminator
 *     that proves the launch sits right at the water's edge, not floated up onto the sand.
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = join(HERE, '../../../../solvista.html');   // resolve relative to the probe's own location
const SRC = process.env.SRC || ART;
const SEEDS = [7, 42, 1234, 5, 99, 2024];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
await page.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await page.goto('file://' + SRC);
await page.waitForFunction(() => window.__census !== undefined);

const run = async (year) => {
  const rows = [];
  for (const seed of SEEDS) {
    const r = await page.evaluate(({ seed, year }) => {
      let s = 0x51F3A9C >>> 0;
      Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
      playing = false;
      genWorld(seed);
      __warp(year - 1974);

      const ship = freighters.find(f => f.anchored);
      const hasShip = !!ship;
      const nLaunch = launches.length;
      if (typeof launchPts !== 'function' || !nLaunch)
        return { seed, hasShip, nLaunch, missing: true };

      const P = launchPts();                      // [[Ax,Ay],[Bx,By]]
      const shipX = ship ? seaXFr(ship.y, ship.fr) : 0;

      // (2) sample the WHOLE ping-pong: both legs, dwell included
      const L = launches[0];
      // "wet" is the artifact's OWN definition (WETSET: WATER/MARSH/KELP) — a launch floats
      // over a kelp bed or a river mouth just as it floats over open water.
      const isWater = (wx, wy) => { const c = cellAt(Math.round(wx), Math.round(wy)); return !!c && WETSET.has(c.t); };
      let n = 0, water = 0, onShip = 0, offshore = 0;
      const shipIx = Math.round(shipX), shipIy = Math.round(ship.y);
      for (const dir of [1, -1]) {
        L.dir = dir;
        for (let k = 0; k <= 40; k++) {
          L.t = k / 40 * 1.3;                     // 0 .. 1.3 (past 1.0 = the dwell)
          const p = launchPos(L); if (!p) continue;
          n++;
          if (isWater(p[0], p[1])) water++;
          if (Math.round(p[0]) === shipIx && Math.round(p[1]) === shipIy) onShip++;
        }
      }

      // (3) geometry
      const dA = P[0][0] - shoreAtF(P[0][1]);      // shore end seaward of the waterline (>0)
      const dB = shipX - P[1][0];                  // ship end inshore of the hull (>0)
      const legLen = Math.hypot(P[1][0] - P[0][0], P[1][1] - P[0][1]);

      // CONTROLS
      const shipWater = ship ? isWater(shipX, ship.y) : null;               // ship sits in water
      const inshoreDry = !isWater(shoreAtF(P[0][1]) - 0.6, P[0][1]);        // one col in = land

      return { seed, hasShip, nLaunch, water, n, waterPct: n ? water / n : 0,
               onShip, dA, dB, legLen, shipWater, inshoreDry };
    }, { seed, year });
    rows.push(r);
  }
  return rows;
};

const fmt = (rows, label) => {
  console.log(`\n=== ${label} (${SRC === ART ? 'PATCH' : 'HEAD (SRC)'}) ===`);
  console.log('seed   ship? nLaunch  water%   onShip   dA(seaward>0)  dB(inshore>0)  legLen   ctrl:shipWater  ctrl:inshoreDry');
  let allWater = true, allExist = true, allGeom = true;
  for (const r of rows) {
    if (r.missing) { console.log(`${String(r.seed).padEnd(6)} ${r.hasShip} lnch=${r.nLaunch}  (no launchPts / no launch)`); allWater = false; continue; }
    const w = (r.waterPct * 100).toFixed(1).padStart(6);
    console.log(`${String(r.seed).padEnd(6)} ${String(r.hasShip).padEnd(5)} ${String(r.nLaunch).padStart(5)}  ${w}%  ${String(r.onShip).padStart(6)}  ${r.dA.toFixed(2).padStart(12)}  ${r.dB.toFixed(2).padStart(12)}  ${r.legLen.toFixed(2).padStart(6)}   ${String(r.shipWater).padStart(12)}   ${String(r.inshoreDry).padStart(13)}`);
    if (r.waterPct < 0.999 || r.onShip > 0) allWater = false;
    if (r.hasShip !== (r.nLaunch > 0)) allExist = false;
    if (!(r.dA > 0 && r.dB > 0)) allGeom = false;
  }
  console.log(`  EXIST 1<->1: ${allExist ? 'PASS' : 'FAIL'} · PATH ALL WATER (& off the hull): ${allWater ? 'PASS' : 'FAIL'} · GEOMETRY threads shore->ship: ${allGeom ? 'PASS' : 'FAIL'}`);
};

fmt(await run(2035), '2035 (mature harbour)');
fmt(await run(1990), '1990 (young harbour — must not strand or crash)');
await browser.close();
