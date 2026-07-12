#!/usr/bin/env node
/* probe-unilight.mjs — does the UNIVERSITY light up at night, and only at night?
 *
 * ITER 195 EXPLORED -> REVERTED. The finding stands and is still worth fixing: the
 * university is the ONLY one of the twelve civics with no LITAMT reference at all —
 * the one MAJORK monument that goes pitch dark after sunset, while the parliament
 * floodlights its colonnade (175), the museum its facade, the hall its clock, the
 * library its reading hall, the police its beacon. What failed was every PLACE to
 * put the light, not the diagnosis. This probe is kept so a retry is cheap: point it
 * at a patched working tree and it will grade the retry the same way.
 *
 * Read iter 195's ledger entry before retrying. In short: the campanile ORPHANS a
 * halo (tall + thin, so a taller neighbour drawn later swallows the lamp while the
 * glow spills into open sky beside it), the quad is occlusion-safe but the tile's
 * OWN wings overdraw it by a per-seed amount (`fxU` flips sign), and every element
 * on this tile is a few px at fit zoom. It is a polish-tile job, not a growth lap.
 *
 * PATCH = working tree, BASE = git HEAD. The edit under test was draw-only and lived
 * entirely inside the `kind==='university'` branch:
 *   (a) the wing's flat glass strip  bandR(...colLit('glass',0.85,lit*0.6))
 *       becomes the city's own per-pane window field  winBandR(...,0x5CB1,...),
 *       so at night a scattered few panes burn and the rest are nobody home;
 *   (b) the campanile's belfry lantern burns warm above LITAMT>0.3.
 *
 * WHOLE-FRAME diff, not a hand-computed box (161's law, and the box is what a
 * first cut of this probe got wrong: the campanile rises a *variable* h+14 above
 * the tile centre and flips side per seed, so a fixed box missed it on 2 of 3
 * seeds — a pure-red unconditional lantern still read 0.00%, which proved the
 * SAMPLER wrong, not the feature). With every mover and star cleared and the clock
 * frozen, the two builds render identical pixels except the edit, so:
 *   every differing pixel IS the change, and its CENTROID must land on the
 *   university — which makes this a locate-check, not just a magnitude.
 *
 *   TARGET   = changed pixels at NIGHT > 0, centroid within ~a tile of the uni.
 *   CONTROL1 = NOON: EXACTLY 0 changed pixels. winBandR falls through to the very
 *              bandR/colLit call it replaced while LITAMT<0.35, and `lit` is 0 by
 *              day, so noon must not move by a single pixel anywhere in the frame.
 *   CONTROL2 = the centroid distance itself: if the edit leaked out of the
 *              university branch, changed pixels would scatter and the distance
 *              would blow up.
 *   DUSK is reported, not gated: winBandR also carries iter 190's GWARM golden-hour
 *   rake, which the flat bandR did not, so the wing now joins that family too.
 *
 *   node probe-unilight.mjs
 */
import { homedir, tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { writeFileSync, existsSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const CAND = [resolve(HERE, 'solvista.html'), resolve(HERE, '../../../../solvista.html'), resolve(HERE, '../../../solvista.html')];
const ROOT = CAND.find(existsSync);
const REPO = dirname(ROOT);
const BASE = join(tmpdir(), 'solvista-uni-base.html');
writeFileSync(BASE, execFileSync('git', ['-C', REPO, 'show', 'HEAD:solvista.html']).toString());

const SEEDS = [7, 42, 1234];
const WARP = 61;
const FRAMES = [['night', 0.90], ['noon', 0.50], ['dusk', 0.35]];
const THR = 14;                 /* per-pixel euclidean RGB change that counts */

async function sample(page, fileUrl, seed, t) {
  await page.goto(`${fileUrl}?seed=${seed}`);
  await page.waitForTimeout(200);
  return page.evaluate(({ seed, warp, t }) => {
    Math.random = () => 0.5;                 /* BEFORE genWorld: deterministic spawns */
    genWorld(seed); __warp(warp); __setTime(t);
    STARS.length = 0;
    /* PIN THE ANIMATION CLOCKS. Without these the surf keeps whatever waveT the RAF
       loop reached before freeze — a wall-clock-dependent value — so the two loads
       render different water and the "unchanged" frames read ~10-22 changed px of
       coast, 700-900px from the university. That was this probe's noise floor, and
       it sat right on top of the signal. Pinned, an unchanged frame is EXACTLY 0. */
    playing = false; waveT = 12.3; time = 100;
    for (const a of [vehicles, bikes, trams, trucks, peds, freighters, birds,
      shuttles, dogs, kites, surfers, dolphins, whales, herons, kayaks, joggers,
      deer, clouds, balloons, copters, ferries, boats]) a.length = 0;
    render();
    const dpr = cvs.width / cvs.clientWidth;
    const w = cvs.width, h = cvs.height;
    /* the university's true screen position, for the locate-check */
    let uni = null;
    for (let y = 0; y < G && !uni; y++) for (let x = 0; x < G; x++) {
      const c = cellAt(x, y);
      if (c && c.t === T.CIVIC && c.kind === 'university') {
        const [wx, wy] = ctr(x, y);
        uni = [(wx * scale + offX) * dpr, (wy * scale + offY) * dpr];
        break;
      }
    }
    return { px: Array.from(ctx.getImageData(0, 0, w, h).data), w, h, dpr, uni, lit: LITAMT, gw: GWARM };
  }, { seed, warp: WARP, t });
}

/* changed pixels over the whole frame + their centroid */
function diff(a, b) {
  let n = 0, sx = 0, sy = 0;
  const A = a.px, B = b.px, w = a.w;
  for (let i = 0, p = 0; p < A.length; p += 4, i++) {
    const dr = A[p] - B[p], dg = A[p + 1] - B[p + 1], db = A[p + 2] - B[p + 2];
    if (Math.sqrt(dr * dr + dg * dg + db * db) > THR) {
      n++; sx += i % w; sy += (i / w) | 0;
    }
  }
  return { n, cx: n ? sx / n : 0, cy: n ? sy / n : 0, total: A.length / 4 };
}

const br = await chromium.launch();
const p = await br.newPage({ viewport: { width: 1600, height: 1000 } });
const uPATCH = pathToFileURL(ROOT).href, uBASE = pathToFileURL(BASE).href;

console.log('\nUNIVERSITY NIGHT LAMPS — PATCH vs HEAD, WHOLE-FRAME diff (every differing pixel IS the edit)');
console.log('all movers/stars cleared, clock frozen, Math.random stubbed; warp ' + WARP + ', |dRGB| > ' + THR + '\n');
console.log('  seed  frame   changed px    centroid->uni   LITAMT  GWARM');
console.log('  ' + '-'.repeat(62));

for (const seed of SEEDS) {
  for (const [fname, t] of FRAMES) {
    const pa = await sample(p, uPATCH, seed, t);
    const bs = await sample(p, uBASE, seed, t);
    const d = diff(pa, bs);
    const dist = d.n && pa.uni
      ? Math.hypot(d.cx - pa.uni[0], d.cy - pa.uni[1]) / pa.dpr : NaN;
    console.log(`  ${seed}  ${fname.padEnd(6)}  ${String(d.n).padStart(6)} px    ` +
      `${(d.n ? dist.toFixed(0) + ' px' : '   —').padStart(7)}         ` +
      `${pa.lit.toFixed(2)}    ${pa.gw.toFixed(2)}`);
  }
}
await br.close();
console.log('\nPASS = NIGHT changed>0 with the centroid ON the university (a tile is ~26px wide at fit),');
console.log('       NOON EXACTLY 0 changed px anywhere in the frame (byte-identical: LITAMT=0, GWARM=0).');
