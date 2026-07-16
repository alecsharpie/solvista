#!/usr/bin/env node
/* Does the park's outdoor leisure answer the SEASON, or only the sun? (iter 317)
 *
 * The beach furniture and the water crowd pack away for winter (247: beachPhase()).
 * The PARK café patrons, the park lawn picnic, and the shorepark picnic blanket gated
 * only on LITAMT (day/night) and drew IDENTICALLY in August and January — the 271
 * category defect (a property given to the beach, not enumerated onto its park sibling).
 *
 * TEMPORAL / seasonal (134): every other gate is frozen. This pins a fixed DAY hour and
 * sweeps the calendar, counting the leisure draws the frame ISSUES by their geometric
 * signature (285: a signature the patch cannot forge):
 *   - park picnic blanket   fillRect w=5.2 h=2.6
 *   - shorepark blanket      fillRect w=4.0 h=2.6   } "PICNICS"
 *   - café patron head       arc r=0.8              } "DINERS"
 * CONTROLS that must NOT move (250):
 *   - café parasol           ellipse rx=1.1 ry=0.65 (year-round furniture)
 *   - pitch players          fillRect w=1.6 h=2.4   (sport is year-round)
 *
 * BUILD-AGNOSTIC: pass SRC=<path> to grade HEAD; the default is the working file.
 * HEAD reads FLAT across seasons (DISTINCT=1 = the defect stated, 236); the patch
 * thins toward the wet trough. The dry-peak pin (beachPhase===1) is byte-identical (245).
 */
import { homedir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = process.env.SRC || join(HERE, '../../../../solvista.html');
const seeds = [7, 42, 1234];
// s (year%1): dry peak 0.62, then around the year
const SEASONS = [['wet-trough', 0.12], ['spring', 0.37], ['dry-PEAK', 0.62], ['autumn', 0.87]];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2 });
await page.goto(pathToFileURL(ART).href);
await page.waitForTimeout(500);

async function counts(seed, s) {
  return await page.evaluate(({ seed, s }) => {
    playing = false;
    genWorld(seed);
    __warp(61);
    __setYear(2035 + s);
    __setTime(0.52);           // midday, game on: LITAMT < 0.5 AND a pitch game is live
    const near = (a, b) => Math.abs(a - b) < 0.05;
    let picnicPark = 0, picnicShore = 0, patrons = 0, parasols = 0, players = 0;
    const C = CanvasRenderingContext2D.prototype;
    const oFR = C.fillRect, oEl = C.ellipse;
    C.fillRect = function (x, y, w, h) {
      if (near(h, 2.6) && near(w, 5.2)) picnicPark++;         // park lawn blanket
      else if (near(h, 2.6) && near(w, 4.0)) picnicShore++;    // shorepark blanket
      else if (near(w, 1.4) && near(h, 1.6)) patrons++;        // café patron body
      else if (near(w, 1.6) && near(h, 2.4)) players++;        // pitch player (CONTROL: sport, year-round)
      return oFR.apply(this, arguments);
    };
    C.ellipse = function (x, y, rx, ry) {
      if (near(rx, 1.1) && near(ry, 0.65)) parasols++;         // café parasol (CONTROL: furniture, year-round)
      return oEl.apply(this, arguments);
    };
    render();
    C.fillRect = oFR; C.ellipse = oEl;
    return { LITAMT, bp: beachPhase(), picnicPark, picnicShore, patrons, parasols, players };
  }, { seed, s });
}

console.log(`artifact: ${ART}`);
const dryPeak = {};
for (const seed of seeds) {
  console.log(`\n=== seed ${seed} ===`);
  console.log('season'.padEnd(12), 'beachPh picnicPark shore patrons | parasols(ctl) players(ctl)');
  const series = { picnics: [], patrons: [], parasols: [], players: [] };
  for (const [name, s] of SEASONS) {
    const r = await counts(seed, s);
    const picnics = r.picnicPark + r.picnicShore;
    series.picnics.push(picnics); series.patrons.push(r.patrons);
    series.parasols.push(r.parasols); series.players.push(r.players);
    if (name === 'dry-PEAK') dryPeak[seed] = { picnics, patrons: r.patrons };
    console.log(name.padEnd(12),
      r.bp.toFixed(2).padStart(5),
      String(r.picnicPark).padStart(8), String(r.picnicShore).padStart(6),
      String(r.patrons).padStart(7), '|',
      String(r.parasols).padStart(9), String(r.players).padStart(9));
  }
  const dist = a => new Set(a).size;
  console.log(`  DISTINCT picnics=${dist(series.picnics)} patrons=${dist(series.patrons)}  (HEAD: 1 = flat = the defect stated, 236)`);
  console.log(`  CONTROLS must be flat: DISTINCT parasols=${dist(series.parasols)} players=${dist(series.players)} (250)`);
}
await browser.close();
console.log(`\nDRY-PEAK counts (compare HEAD vs patch — must be EQUAL, beachPhase===1 => byte-identical, 245):`);
for (const seed of seeds) console.log(`  seed ${seed}: picnics=${dryPeak[seed].picnics} patrons=${dryPeak[seed].patrons}`);
