#!/usr/bin/env node
/* probe-anglers.mjs — do anglers appear on the pier deck ONLY by day?
 *
 * This iteration bundles TWO changes to the pier, so the probe uses TWO reference
 * builds to keep them from conflating:
 *   BASE  = git HEAD                              (no deck-over-kelp, no anglers)
 *   DECK  = HEAD + the one deck-over-kelp line    (deck draws over kelp; NO anglers)
 *   PATCH = working tree                          (deck-over-kelp + anglers)
 * The deck-over-kelp fix is PERMANENT (day AND night); the anglers are DAY-ONLY.
 * Diffing PATCH vs DECK at the same frozen frame therefore isolates the anglers
 * alone (both builds already draw the deck over kelp). Diffing DECK vs BASE reports
 * the deck-fix itself as a secondary measurement.
 *
 * Every mover is cleared (tramwire law) — peds legally walk the pier, so a strolling
 * figure would otherwise drift across a sample box between loads and pollute the diff.
 * Host hexes = eligible pier deck cells (pier.x0 < x < pier.x1-1, y = pier.y), found
 * in-page. Controls: ROAD hexes must not move; the ANGLER diff at NIGHT (LITAMT high
 * -> gate off) must be ~0 (byte-identical), proving the anglers pack up at dusk.
 *
 *   node probe-anglers.mjs
 */
import { homedir, tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { writeFileSync, existsSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const CAND = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html'), resolve(HERE, '../../../solvista.html')];
const ROOT = CAND.find(existsSync);
const REPO = dirname(ROOT);
const HEADSRC = execFileSync('git', ['-C', REPO, 'show', 'HEAD:solvista.html']).toString();
const BASE = join(tmpdir(), 'solvista-anglers-base.html');   /* HEAD: no deck-over-kelp, no anglers */
const DECK = join(tmpdir(), 'solvista-anglers-deck.html');   /* HEAD + deck-over-kelp only */
writeFileSync(BASE, HEADSRC);
/* insert ONLY the deck-over-kelp line into the KELP case (the case just before DUNE) */
const ANCHOR = "      break;}\n    case T.DUNE:{";
if (!HEADSRC.includes(ANCHOR)) { console.error('anchor not found — probe needs updating'); process.exit(2); }
writeFileSync(DECK, HEADSRC.replace(ANCHOR, "      if(pierAt(x,y))drawPierAt(x,y);\n" + ANCHOR));

const SEEDS = [7, 42];
const WARP = 61;
const FRAMES = [['day', 0.35], ['night', 0.90]];
const R = 14;                   /* half-box: the rod/line reach ~12px to the side of the cell centre */
const THR = 14;                 /* per-pixel euclidean RGB change that counts */
const WAVET = 12.3;             /* pin the frame in both builds (nothing tidal moves the anglers, but stay safe) */

async function sample(page, fileUrl, seed, t) {
  await page.goto(`${fileUrl}?seed=${seed}&warp=${WARP}&t=${t}`);
  await page.waitForTimeout(400);
  return page.evaluate(({ R, WAVET }) => {
    playing = false; waveT = WAVET;
    for (const a of [vehicles, bikes, trams, trucks, peds, boats, ferries, freighters,
      birds, shuttles, dogs, kites, surfers, dolphins, whales, herons, kayaks, joggers,
      deer, clouds, balloons, copters]) a.length = 0;
    render();
    const dpr = cvs.width / cvs.clientWidth, g = ctx;
    /* host hexes: eligible pier deck cells (the plain deck, not stall/wheel) */
    const pierCells = [], road = [];
    if (typeof pier === 'object' && pier) {
      for (let x = pier.x0 + 1; x <= pier.x1 - 2; x++) {
        const c = cells[idx(x, pier.y)]; if (c) pierCells.push([x, pier.y]);
      }
    }
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)]; if (c && c.t === T.ROAD) road.push([x, y]);
    }
    const box = list => list.map(([x, y]) => { const [cx, cy] = ctr(x, y); return [cx * scale + offX, cy * scale + offY]; })
      .filter(([sx, sy]) => sx > 50 && sx < innerWidth - 50 && sy > 50 && sy < innerHeight - 50)
      .slice(0, 300)
      .map(([sx, sy]) => Array.from(g.getImageData(Math.round(sx * dpr) - R, Math.round(sy * dpr) - R, R * 2 + 1, R * 2 + 1).data));
    return { PIER: box(pierCells), ROAD: box(road), lit: LITAMT, np: pierCells.length };
  }, { R, WAVET });
}

function changed(a, b) {
  let px = 0, hit = 0;
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) {
    const A = a[i], B = b[i];
    for (let p = 0; p < A.length; p += 4) {
      const dr = A[p] - B[p], dg = A[p + 1] - B[p + 1], db = A[p + 2] - B[p + 2];
      px++;
      if (Math.sqrt(dr * dr + dg * dg + db * db) > THR) hit++;
    }
  }
  return { frac: px ? hit / px : 0, hexes: n };
}

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
const uPATCH = pathToFileURL(ROOT).href, uBASE = pathToFileURL(BASE).href, uDECK = pathToFileURL(DECK).href;

console.log('\nPIER ANGLERS — two reference builds isolate the day-only anglers from the deck-over-kelp fix');
console.log('changed-pixel fraction (per-pixel |dRGB| > ' + THR + '), seeds 7/42, warp 61\n');
console.log('  seed  frame    ANGLERS(PATCH-DECK)   ROAD ctl(=0)   deck-fix(DECK-BASE)   LITAMT');
console.log('  ' + '-'.repeat(80));

for (const seed of SEEDS) {
  for (const [fname, t] of FRAMES) {
    const pa = await sample(p, uPATCH, seed, t);
    const dk = await sample(p, uDECK, seed, t);
    const bs = await sample(p, uBASE, seed, t);
    const ang = changed(pa.PIER, dk.PIER);
    const roadc = changed(pa.ROAD, dk.ROAD), deckfix = changed(dk.PIER, bs.PIER);
    console.log(`  ${seed}   ${fname.padEnd(7)}  ${(ang.frac * 100).toFixed(2).padStart(6)}%             ` +
      `${(roadc.frac * 100).toFixed(2).padStart(5)}%          ${(deckfix.frac * 100).toFixed(2).padStart(6)}%           ${pa.lit.toFixed(2)}`);
  }
}
await b.close();
console.log('\nPASS = ANGLERS move in DAY, ~0 at NIGHT (gate off -> PATCH==DECK byte-identical), ROAD ~0.');
console.log('       deck-fix column is the secondary change (deck now draws over kelp): present DAY AND NIGHT.');
