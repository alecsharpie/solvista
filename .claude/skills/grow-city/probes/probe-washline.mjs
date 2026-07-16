#!/usr/bin/env node
/* Does the washing line answer the WEATHER and the CALENDAR? (iter 318)
 *
 * drawBuilding's RES washing line (7242) has hung out on a gate of LITAMT<0.45 &&
 * !party && hashCell<0.22 for the artifact's life — its own comment claiming "out on
 * dry days", yet it flapped through a downpour and through midwinter alike. The street
 * crowd two functions up learnt to read rainingAt (5051); the beach furniture and the
 * water crowd keep beachPhase (247/317). The washing was that category's un-enumerated
 * sibling (271/286). The patch gates it on rainingAt(x,y)<0.05 and thins the population
 * on beachPhase(), SCALED so the dry peak (beachPhase()===1) reproduces HEAD's 0.22.
 *
 * This counts the GATE POPULATION using the artifact's OWN predicates (beachPhase,
 * rainingAt, hashCell) over the real cells — the gate has no other side effect, so its
 * truth-count IS the number of washing lines drawn. Both HEAD's gate (hashCell<0.22, no
 * rain) and the patch's gate are computed here from the shared functions, so the probe is
 * BUILD-AGNOSTIC (it depends on nothing the patch line touched).
 *
 * A. dry-PEAK / clear sky  -> patch == HEAD   (the fixed point, byte-for-byte: 245)
 * B. dry-PEAK / rain over the homes -> patch < HEAD  (washing comes in) + a positive
 *    control that the forced cloud actually wets homes (else a dead rig reads the same 0)
 * C. wet-trough / clear sky -> patch ~= 0.10*HEAD  (BEACHMIN thinning)
 * ELIGIBLE (west-RES-neighbour, both built, not party) is the must-not-move denominator (250).
 */
import { homedir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = process.env.SRC || join(HERE, 'solvista.html');
const seeds = [7, 42, 1234];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2 });
await page.goto(pathToFileURL(ART).href);
await page.waitForTimeout(500);

async function counts(seed, s, rain) {
  return await page.evaluate(({ seed, s, rain }) => {
    playing = false;
    genWorld(seed);
    __warp(61);
    __setYear(2035 + s);
    __setTime(0.30);                       // a clear day hour -> LITAMT low, washing shows
    render();                              // settle heights (c.h == c.th) + fill LITAMT
    // weather: clear the sky, or force ONE raining cloud over the residential centroid
    let rx = 0, ry = 0, nres = 0;
    for (let i = 0; i < cells.length; i++) if (cells[i].t === T.RES) { rx += i % G; ry += (i / G | 0); nres++; }
    rx = nres ? rx / nres : G / 2; ry = nres ? ry / nres : G / 2;
    clouds.length = 0;
    if (rain) clouds.push({ x: rx, y: ry, s: 30, wf: -999, y0: ry, ph: 0 }); // wf<<0 -> cloudWet=1; s huge -> whole plate wet (saturation test)
    const idxOf = (x, y) => y * G + x;
    let eligible = 0, head = 0, patch = 0, wetHits = 0;
    const bp = beachPhase();
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idxOf(x, y)];
      if (c.t !== T.RES) continue;
      const n = x > 0 ? cells[idxOf(x - 1, y)] : null;
      // shared preconditions (identical for HEAD and patch, so they cancel):
      if (!(n && n.t === T.RES && c.h > 5 && n.h > 5 && !(c.party > 0) && !(n.party > 0))) continue;
      const hc = hashCell(x, y, seedNum ^ 0x7A1D);
      const wet = rainingAt(x, y);
      if (wet >= 0.05) wetHits++;
      const inHead = hc < 0.22;                          // HEAD gate: no season, no rain
      const inPatch = hc < 0.22 * bp && wet < 0.05;      // patch gate
      if (inHead) eligible++;                            // eligible = HEAD's dry-day population
      if (inHead) head++;
      if (inPatch) patch++;
    }
    let maxWet = 0, wetAll = 0;
    for (let i = 0; i < cells.length; i++) { const w = rainingAt(i % G, i / G | 0); if (w > maxWet) maxWet = w; if (w >= 0.05) wetAll++; }
    return { eligible, head, patch, wetHits, wetAll, maxWet: +maxWet.toFixed(3), bp: +bp.toFixed(3), lit: +LITAMT.toFixed(3) };
  }, { seed, s, rain });
}

const S_PEAK = 0.62, S_TROUGH = 0.12;
console.log('washing-line gate population — HEAD gate (hashCell<0.22, no rain) vs PATCH gate\n');
for (const seed of seeds) {
  const A = await counts(seed, S_PEAK, false);
  const B = await counts(seed, S_PEAK, true);
  const C = await counts(seed, S_TROUGH, false);
  console.log(`seed ${seed}  (LITAMT ${A.lit}, must be <0.45 for washing to show at all)`);
  console.log(`  A dry-PEAK  clear  bp=${A.bp}  HEAD ${A.head}  PATCH ${A.patch}   -> ${A.head === A.patch ? 'FIXED POINT ok (==)' : 'DRIFT!'}`);
  console.log(`  B dry-PEAK  RAIN   bp=${B.bp}  HEAD ${B.head}  PATCH ${B.patch}   wetHits=${B.wetHits} wetAll=${B.wetAll} maxWet=${B.maxWet}  -> ${B.patch < B.head && B.wetHits > 0 ? 'washing came IN' : 'no effect / dead rig'}`);
  console.log(`  C wet-trough clear bp=${C.bp}  HEAD ${C.head}  PATCH ${C.patch}   ratio=${C.head ? (C.patch / C.head).toFixed(2) : 'n/a'} (expect ~${S_TROUGH < 0.62 ? (0.10 + (1 - 0.10) * (0.5 + 0.5 * Math.cos(6.2831853 * (S_TROUGH - 0.62)))).toFixed(2) : ''})`);
  console.log('');
}
await browser.close();
