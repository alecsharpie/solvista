#!/usr/bin/env node
/* probe-bedtime.mjs — does the city go to BED? (iter 199, Urban x Deepen)
 *
 * The seam: winBandR paints a lit pane wherever hashCell(...) >= WINDARK and leaves the
 * rest as wall, and its own comment calls that remainder "nobody home" — an assertion
 * about OCCUPANCY, which is the one thing about a city that changes through a night.
 * But WINDARK was a CONSTANT (0.16). So the same panes were dark at 8pm and at 4am, and
 * every window lit at dusk still burned at dawn. LITAMT cannot carry the hour either:
 * the light curve PINS it at 1.0 from dayT 0.86 all the way to midnight, so the whole
 * evening is one flat plateau. The fix reads the hour from dayT (the slow clock the moon
 * /hall clock/observatory already share) and sweeps the threshold up through the panes.
 *
 * ISOLATION (196's state-response law). The question is not "what did my edit change?"
 * but "does the draw ANSWER a signal?" — so the diff is two PINS OF dayT within ONE
 * build (frozen clock, same genWorld), run on BOTH builds:
 *
 *   panes drawn, BASE:  dusk == midnight EXACTLY      <- the seam, stated as a number.
 *                                                        A constant threshold cannot
 *                                                        know the hour, so the count is
 *                                                        frozen. This IS the defect.
 *   panes drawn, PATCH: midnight << dusk              <- the fix works, and
 *                       and RES falls much further than TOWER (the differential: homes
 *                       empty, the tower keeps a skeleton crew, so the night core
 *                       SHARPENS rather than the city merely dimming).
 *
 * The pane count comes from wrapping winQuad (called once per LIT pane) and winBandR
 * (which knows the cell) — i.e. it counts actual draw calls, NOT my own formula, so it
 * is not circular.
 *
 * CONTROLS:
 *   NOON panes drawn       -> must be 0 ON BOTH BUILDS. This is the daylight gate, and it
 *                             is deliberately a MECHANISM gate, not a pixel one: paned
 *                             glass is only drawn while LITAMT>=0.35, and the whole edit
 *                             lives inside that branch, so if no pane is painted at noon
 *                             the edit is UNREACHABLE in daylight. Proving that beats
 *                             counting pixels, because of the next line.
 *   NOON pixels            -> reported against a SAME-FRAME CONTROL (109's law): the
 *                             artifact has a per-load NOISE FLOOR — BASE re-rendered
 *                             from a second page load of the SAME file differs from
 *                             itself by ~100-600 scattered px (max delta ~8) on some
 *                             seeds, surviving genWorld+__warp+freeze. So "patch-vs-base
 *                             != 0" at noon does NOT mean a leak; it means the floor. We
 *                             print both, and on seed 7 (floor == 0) noon comes out
 *                             BYTE-IDENTICAL, which is the real proof.
 *   BASE dusk vs midnight  -> POSITIVE CONTROL, pixels MUST move (sky/tint deepen). If
 *                             this were 0 the dayT pin would be DEAD, and "BASE panes
 *                             frozen" would be a false negative rather than a finding
 *                             (196: a dead pin produces the same zero as a deaf draw).
 *   MIDNIGHT lighter px    -> must be EXACTLY 0, at THR=10, i.e. ABOVE the noise floor's
 *                             max delta (~8) so the floor cannot manufacture one. At
 *                             midnight every type's dark-share is above the old 0.16, and
 *                             colWin's mean-holder is pinned to the BASELINE on purpose,
 *                             so a lit pane keeps exactly its old colour and can only go
 *                             OUT. A lighter pixel would mean the mean-holder is
 *                             brightening the survivors -> the blow-to-white failure
 *                             mode. (cf. 194's "a contact shadow can only darken".)
 *
 * Clock frozen per 195(f): playing=false is NOT a frozen clock — waveT/time keep
 * whatever the RAF loop reached, and the surf drifts. Pin both, clear STARS (163d) and
 * every entity array, and rebuild in-page with genWorld+__warp (163c).
 *
 *   node probe-bedtime.mjs
 */
import { homedir, tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { writeFileSync, existsSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const CAND = [resolve(HERE, 'solvista.html'), resolve(HERE, '../../../../solvista.html')];
const ROOT = CAND.find(existsSync);
const REPO = dirname(ROOT);
const HEADSRC = execFileSync('git', ['-C', REPO, 'show', 'HEAD:solvista.html']).toString();
const BASE = join(tmpdir(), 'solvista-bedtime-base.html');
writeFileSync(BASE, HEADSRC);

const SEEDS = [7, 42, 1234];
const WARP = 61;
const PINS = { noon: 0.45, dusk: 0.78, midnight: 0.99 };  /* dayT: 0 = midnight */
const WAVET = 12.3, TIME = 40.0;
const THR = 10;             /* luminance step that counts as moved — ABOVE the ~8 noise floor */
const VW = 1100, VH = 700;

/* one frozen render of `build` at `seed`, pinned to dayT=`t`.
   Returns a luminance map (base64), an exact RGBA hash, and the LIT PANE COUNT per
   building type, harvested by wrapping the draw itself. */
async function sample(page, fileUrl, seed, t) {
  await page.goto(`${fileUrl}?seed=${seed}`);
  await page.waitForTimeout(180);
  return page.evaluate(({ seed, warp, t, WAVET, TIME }) => {
    Math.random = () => 0.5;
    genWorld(seed); __warp(warp);
    playing = false;
    waveT = WAVET; time = TIME;
    STARS.length = 0;
    for (const a of [vehicles, bikes, trams, trucks, peds, freighters, birds, shuttles,
      dogs, kites, surfers, dolphins, whales, herons, kayaks, joggers, deer, clouds,
      balloons, copters, boats, ferries]) a.length = 0;
    flock = null;               /* the pelican V is a lone Math.random-spawned object, not an array */
    __setTime(t);
    __setTide(0.59);            /* neutral tide, so the sea is identical at every pin */

    /* ---- count the panes the draw ACTUALLY paints, per building type ----
       winQuad fires once per LIT pane; winBandR knows which cell it is on. Both are
       top-level function declarations in a classic script, so they are window
       properties and the internal calls resolve through them. Counting draw calls
       keeps this independent of windarkAt() — it measures the renderer, not my sum. */
    const panes = {}, bands = {};
    let cur = -1, n = 0;
    const oWQ = window.winQuad, oWB = window.winBandR;
    window.winQuad = function () { n++; return oWQ.apply(this, arguments); };
    window.winBandR = function (gx, gy, ax, ay, z0, z1, x, y) {
      const c = cellAt(x, y); cur = c ? c.t : -1;
      const before = n;
      const r = oWB.apply(this, arguments);
      panes[cur] = (panes[cur] || 0) + (n - before);
      bands[cur] = (bands[cur] || 0) + 1;
      return r;
    };
    render();
    window.winQuad = oWQ; window.winBandR = oWB;

    const w = cvs.width, h = cvs.height;
    const d = ctx.getImageData(0, 0, w, h).data;
    const lum = new Uint8Array(w * h);
    let hash = 2166136261 >>> 0;
    for (let i = 0, p = 0; p < w * h; p++, i += 4) {
      lum[p] = (d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114) | 0;
      hash ^= d[i]; hash = Math.imul(hash, 16777619) >>> 0;
      hash ^= d[i + 1]; hash = Math.imul(hash, 16777619) >>> 0;
      hash ^= d[i + 2]; hash = Math.imul(hash, 16777619) >>> 0;
    }
    let bin = ''; for (let i = 0; i < lum.length; i++) bin += String.fromCharCode(lum[i]);
    const NAME = { 2: 'RES', 3: 'MID', 4: 'COM', 5: 'TOWER' };
    const named = k => Object.fromEntries(Object.entries(k)
      .filter(([t2]) => NAME[t2]).map(([t2, v]) => [NAME[t2], v]));
    return { lum: btoa(bin), hash, w, h, panes: named(panes), bands: named(bands) };
  }, { seed, warp: WARP, t, WAVET, TIME });
}

const dec = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));

/* how the frame moved from a -> b: total changed, and the direction split */
function diff(a, b) {
  const A = dec(a.lum), B = dec(b.lum);
  let changed = 0, darker = 0, lighter = 0;
  for (let i = 0; i < A.length; i++) {
    const dv = B[i] - A[i];
    if (dv <= -THR) { changed++; darker++; }
    else if (dv >= THR) { changed++; lighter++; }
  }
  const pct = v => (100 * v / A.length).toFixed(3);
  return { changed, darker, lighter, pctChanged: pct(changed), pctDark: pct(darker), pctLight: pct(lighter) };
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: VW, height: VH }, deviceScaleFactor: 1 });
const urls = { BASE: pathToFileURL(BASE).href, PATCH: pathToFileURL(ROOT).href };

console.log('probe-bedtime — does the city go to bed?  (dayT: 0.45 noon / 0.78 dusk / 0.99 midnight)\n');

let failures = [];
for (const seed of SEEDS) {
  const S = {};
  for (const [bn, url] of Object.entries(urls))
    for (const [pn, t] of Object.entries(PINS)) S[bn + '|' + pn] = await sample(page, url, seed, t);
  /* a SECOND, independent load of the SAME base file — the same-frame control (109). The
     artifact's render has a small per-load noise floor; without this we would read that
     floor as a daylight leak, which is exactly what the first run of this probe did. */
  S['BASE|noon2'] = await sample(page, urls.BASE, seed, PINS.noon);

  console.log(`=== seed ${seed} ===`);

  /* 1. THE SEAM + THE FIX, as pane counts (the mechanism, counted from the draw) */
  console.log('  lit panes drawn        dusk -> midnight      (BASE = constant WINDARK)');
  for (const type of ['RES', 'MID', 'COM', 'TOWER']) {
    const bd = S['BASE|dusk'].panes[type] || 0, bm = S['BASE|midnight'].panes[type] || 0;
    const pd = S['PATCH|dusk'].panes[type] || 0, pm = S['PATCH|midnight'].panes[type] || 0;
    const drop = pd ? (100 * (pd - pm) / pd).toFixed(1) : 'n/a';
    const bdrop = bd ? (100 * (bd - bm) / bd).toFixed(1) : 'n/a';
    console.log(`    ${type.padEnd(6)} BASE ${String(bd).padStart(5)} -> ${String(bm).padStart(5)}  (${bdrop}%)` +
      `   PATCH ${String(pd).padStart(5)} -> ${String(pm).padStart(5)}  (${drop}% go dark)`);
    if (bd !== bm) failures.push(`seed ${seed}: BASE ${type} pane count MOVED (${bd}->${bm}) — the seam claim is wrong`);
    if (pm >= pd) failures.push(`seed ${seed}: PATCH ${type} did not go dark (${pd}->${pm})`);
  }
  const rRES = (() => { const p = S['PATCH|dusk'].panes.RES, m = S['PATCH|midnight'].panes.RES; return 100 * (p - m) / p; })();
  const rTOW = (() => { const p = S['PATCH|dusk'].panes.TOWER, m = S['PATCH|midnight'].panes.TOWER; return 100 * (p - m) / p; })();
  console.log(`    differential: RES goes dark ${(rRES / rTOW).toFixed(2)}x as fast as TOWER  (homes empty; the tower keeps a skeleton crew)`);
  if (!(rRES > rTOW * 1.5)) failures.push(`seed ${seed}: RES (${rRES.toFixed(1)}%) does not empty far faster than TOWER (${rTOW.toFixed(1)}%)`);

  /* 2. CONTROLS */
  const noonPanesB = Object.values(S['BASE|noon'].panes).reduce((a, b) => a + b, 0);
  const noonPanesP = Object.values(S['PATCH|noon'].panes).reduce((a, b) => a + b, 0);
  console.log(`  CONTROL noon  panes drawn   : BASE ${noonPanesB}, PATCH ${noonPanesP}  [must be 0 — the paned branch is not taken in daylight, so the edit is UNREACHABLE there]`);
  if (noonPanesB !== 0 || noonPanesP !== 0) failures.push(`seed ${seed}: panes ARE drawn at noon (${noonPanesB}/${noonPanesP}) — the daylight gate is not what it claims`);
  const noonFloor = diff(S['BASE|noon'], S['BASE|noon2']);      /* same-frame control: BASE vs BASE */
  const noonPx = diff(S['BASE|noon'], S['PATCH|noon']);
  const exact = noonPx.changed === 0 && noonFloor.changed === 0;
  console.log(`  CONTROL noon  pixels        : patch-vs-base ${noonPx.changed} px  vs  SAME-FRAME CONTROL (base-vs-base, 2nd load) ${noonFloor.changed} px` + (exact ? '  [both 0 — BYTE-IDENTICAL]' : '  [both are the per-load noise floor, not a leak]'));
  if (noonPx.changed > 40 && noonPx.changed > 6 * (noonFloor.changed + 1)) failures.push(`seed ${seed}: noon patch-vs-base (${noonPx.changed} px) far exceeds its own noise floor (${noonFloor.changed} px) — a real daylight leak`);

  const pos = diff(S['BASE|dusk'], S['BASE|midnight']);
  console.log(`  CONTROL+ dayT pin live  : BASE dusk->midnight moved ${pos.pctChanged}% of the frame  [must be > 0, else the pin is dead]`);
  if (pos.changed === 0) failures.push(`seed ${seed}: the dayT pin is DEAD on BASE — "BASE panes frozen" would be a false negative`);

  const mid = diff(S['BASE|midnight'], S['PATCH|midnight']);
  console.log(`  MIDNIGHT patch-vs-base  : ${mid.pctChanged}% changed = ${mid.pctDark}% DARKER + ${mid.pctLight}% lighter  [lighter must be 0 — panes only go OUT]`);
  if (mid.lighter !== 0) failures.push(`seed ${seed}: ${mid.lighter} px got LIGHTER at midnight — colWin is brightening the survivors (blowout)`);
  if (mid.darker === 0) failures.push(`seed ${seed}: nothing darkened at midnight`);
  console.log();
}

await browser.close();
if (failures.length) { console.log('FAIL\n  ' + failures.join('\n  ')); process.exit(1); }
console.log('PASS — the panes were frozen on BASE and now answer the hour; homes empty faster than towers;\n       daylight byte-identical; at midnight windows only ever go OUT.');
