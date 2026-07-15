/* probe-concertcrowd — the amphitheater is the THIRD event venue, and the crowd
 * pool + residentWhere had enumerated only two of the three (285's category law).
 *
 * The crowd-draw pool (syncFleet) and residentWhere key on TOP-LEVEL tile types
 * (T.MARKET, T.STADIUM). The amphitheater is a T.CIVIC with a kind, so — exactly
 * like CIVHRS before it (285) — neither could NAME it: no resident ever lived by
 * the one bowl that fills a full house every summer night, and a resident standing
 * on it during a concert was told 'Out for a stroll'.
 *
 * Part A (semantic gate, build-HONEST): a fake ped on the amphitheater hex, at three
 *   states, through the ACTUAL residentWhere. HEAD returns the fallthrough; patch
 *   names the concert off concertLive() — the SAME predicate the beam lights by.
 *   STADIUM ped is the must-not-move control (250).
 * Part B (residency): clear peds, refill via syncFleet, count anchors ON the
 *   amphitheater hex. HEAD 0 (civic not in the pool at all); patch > 0.
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = join(HERE, '../../../../solvista.html');
const SRC = process.env.SRC || ART;
const SEEDS = [7, 42, 1234];

const b = await chromium.launch();
const p = await b.newPage();
await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await p.goto(pathToFileURL(SRC).href);
await p.waitForTimeout(300);

for (const seed of SEEDS) {
  const r = await p.evaluate((seed) => {
    playing = false;
    let sMR = 0x51F3A9C >>> 0;
    Math.random = () => ((sMR = (sMR * 1664525 + 1013904223) >>> 0) / 4294967296);
    genWorld(seed); __warp(2035 - 1974);
    const hasPatch = typeof concertLive === 'function';

    // find the amphitheater hex
    let ax = -1, ay = -1;
    for (let i = 0; i < cells.length; i++) {
      const c = cells[i];
      if (c.t === T.CIVIC && c.kind === 'amphitheater') { ax = i % G; ay = (i / G) | 0; break; }
    }
    // a stadium hex for the control
    let sx = -1, sy = -1;
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].t === T.STADIUM) { sx = i % G; sy = (i / G) | 0; break; }
    }

    const states = [
      ['concert-dusk',  2035.62, 0.80],   // dry peak = in season, dusk = LITAMT high
      ['concert-dusk2', 2035.62, 0.86],
      ['season-noon',   2035.62, 0.50],   // in season, broad day
      ['winter-dusk',   2035.02, 0.80],   // out of season
    ];
    const out = [];
    for (const [lab, yr, t] of states) {
      __setYear(yr); __setTime(t); render();
      const amPed = { x: ax, y: ay, ox: 0, oy: 0, hx: ax, hy: ay };
      const stPed = { x: sx, y: sy, ox: 0, oy: 0, hx: sx, hy: sy };
      out.push({
        lab,
        LITAMT: +LITAMT.toFixed(2),
        cSeason: hasPatch ? +concertShow().toFixed(3) : null,
        cLive: hasPatch ? concertLive() : null,
        amWord: residentWhere(amPed),
        stWord: residentWhere(stPed),
      });
    }

    // Part B: residency — clear peds, refill, count anchors on the amphitheater hex
    peds.length = 0;
    syncFleet();
    let onAmph = 0, onStad = 0, total = peds.length;
    for (const pd of peds) {
      if (pd.hx === ax && pd.hy === ay) onAmph++;
      if (cells[idx(pd.hx, pd.hy)].t === T.STADIUM) onStad++;
    }
    return { hasPatch, ax, ay, out, onAmph, onStad, total };
  }, seed);

  console.log(`\n=== seed ${seed}  build=${r.hasPatch ? 'PATCH' : 'HEAD'}  amphitheater@(${r.ax},${r.ay}) ===`);
  for (const s of r.out) {
    console.log(`  ${s.lab.padEnd(13)} LIT=${s.LITAMT} show=${s.cSeason} live=${s.cLive}`);
    console.log(`      amphitheater ped -> "${s.amWord}"`);
    console.log(`      STADIUM ped (control) -> "${s.stWord}"`);
  }
  console.log(`  RESIDENCY: peds anchored ON the amphitheater = ${r.onAmph} / ${r.total}   (stadium anchors ${r.onStad})`);
}
await b.close();
