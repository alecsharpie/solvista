#!/usr/bin/env node
/* probe-windowgold.mjs — do the building WINDOWS catch a warm rake ONLY at golden hour,
 * and only on the SUN-FACING face?
 *
 * PATCH = working tree, BASE = git HEAD. The only change is a draw-only, GWARM-gated
 * block appended to winBandR (the shared window renderer for RES/MID/COM/TOWER): an
 * additive warm-gold quad over ONE front face — the sun-facing one, RIGHT at dawn
 * (dayT<0.5) / LEFT at dusk (dayT>0.5). Diffing PATCH vs BASE over each building's
 * screen box at a frozen frame isolates the glint.
 *   TARGET  = building cells (DEV): change present at DUSK/DAWN (GWARM>0), ~0 at
 *             NOON/NIGHT (GWARM=0, no draw).
 *   CONTROL = non-building tiles (PARK/ROAD/WATER): ~0 at every frame (winBandR is
 *             the only edited draw).
 *   DIRECTION = split each building box into LEFT vs RIGHT screen halves. The glint
 *             lights ONE face, so at DUSK the LEFT half moves >> RIGHT, and at DAWN
 *             the RIGHT half moves >> LEFT — the rake flips with the sun.
 * Every mover cleared + clock frozen (tramwire law); rebuilt in-page + STARS cleared
 * + Math.random stubbed (163 law) so the frame is reproducible; PATCH vs HEAD at the
 * SAME frame so the ambient golden-hour tint is NOT counted, only the glint.
 *
 *   node probe-windowgold.mjs
 */
import { homedir, tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { writeFileSync, existsSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const CAND = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html'), resolve(HERE, '../../../solvista.html'), resolve(HERE, 'solvista.html')];
const ROOT = CAND.find(existsSync);
const REPO = dirname(ROOT);
const HEADSRC = execFileSync('git', ['-C', REPO, 'show', 'HEAD:solvista.html']).toString();
const BASE = join(tmpdir(), 'solvista-windowgold-base.html');
writeFileSync(BASE, HEADSRC);

const SEEDS = [7, 42, 1234];
const WARP = 61;
const FRAMES = [['dusk', 0.68], ['dawn', 0.05], ['noon', 0.47], ['night', 0.90]];
const R = 9;                    /* half-box over each building hex */
const THR = 10;                 /* per-pixel euclidean RGB change that counts */

async function sample(page, fileUrl, seed, t) {
  await page.goto(`${fileUrl}?seed=${seed}`);
  await page.waitForTimeout(200);
  return page.evaluate(({ R, seed, warp, t }) => {
    genWorld(seed); __warp(warp); __setTime(t);
    STARS.length = 0; Math.random = () => 0.5;
    playing = false; waveT = 12.3;
    for (const a of [vehicles, bikes, trams, trucks, peds, boats, ferries, freighters,
      birds, shuttles, dogs, kites, surfers, dolphins, whales, herons, kayaks, joggers,
      deer, clouds, balloons, copters]) a.length = 0;
    render();
    const dpr = cvs.width / cvs.clientWidth, g = ctx;
    const bld = [], ctl = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)]; if (!c) continue;
      if (DEV.has(c.t) && c.h > 12) bld.push([x, y]);           /* mid/tall bodies show the glass */
      else if (c.t === T.PARK || c.t === T.ROAD || c.t === T.WATER) ctl.push([x, y]);
    }
    const grab = list => list.map(([x, y]) => { const [cx, cy] = ctr(x, y); return [cx * scale + offX, cy * scale + offY]; })
      .filter(([sx, sy]) => sx > 60 && sx < innerWidth - 60 && sy > 60 && sy < innerHeight - 60)
      .slice(0, 400)
      .map(([sx, sy]) => Array.from(g.getImageData(Math.round(sx * dpr) - R, Math.round(sy * dpr) - R, R * 2 + 1, R * 2 + 1).data));
    const gw = (typeof GWARM === 'undefined') ? -1 : GWARM;
    return { BLD: grab(bld), CTL: grab(ctl), lit: LITAMT, gwarm: gw, nb: bld.length };
  }, { R, seed, warp: WARP, t });
}

/* whole-box changed fraction + the fraction restricted to the left vs right screen half */
function changed(a, b, R) {
  const W = R * 2 + 1;
  let px = 0, hit = 0, lpx = 0, lhit = 0, rpx = 0, rhit = 0;
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) {
    const A = a[i], B = b[i];
    for (let p = 0; p < A.length; p += 4) {
      const col = (p / 4) % W;
      const dr = A[p] - B[p], dg = A[p + 1] - B[p + 1], db = A[p + 2] - B[p + 2];
      const on = Math.sqrt(dr * dr + dg * dg + db * db) > THR;
      px++; if (on) hit++;
      if (col < R) { lpx++; if (on) lhit++; } else if (col > R) { rpx++; if (on) rhit++; }
    }
  }
  return { frac: px ? hit / px : 0, left: lpx ? lhit / lpx : 0, right: rpx ? rhit / rpx : 0 };
}

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
const uPATCH = pathToFileURL(ROOT).href, uBASE = pathToFileURL(BASE).href;

console.log('\nGOLDEN-HOUR WINDOW GLINT — PATCH vs HEAD over building (DEV, h>12) boxes');
console.log('changed-pixel fraction (per-pixel |dRGB| > ' + THR + '), warp 61');
console.log('L/R = the box\'s left vs right screen half (the two front faces)\n');
console.log('  seed  frame    BLD glint   L-half  R-half    CTL(=0)   GWARM  LITAMT');
console.log('  ' + '-'.repeat(70));

for (const seed of SEEDS) {
  for (const [fname, t] of FRAMES) {
    const pa = await sample(p, uPATCH, seed, t);
    const bs = await sample(p, uBASE, seed, t);
    const bld = changed(pa.BLD, bs.BLD, R);
    const ctl = changed(pa.CTL, bs.CTL, R);
    const dir = fname === 'dusk' ? 'L>R' : fname === 'dawn' ? 'R>L' : '';
    console.log(`  ${seed}  ${fname.padEnd(7)}  ${(bld.frac * 100).toFixed(2).padStart(6)}%   ` +
      `${(bld.left * 100).toFixed(2).padStart(5)}%  ${(bld.right * 100).toFixed(2).padStart(5)}%   ` +
      `${(ctl.frac * 100).toFixed(2).padStart(5)}%    ${pa.gwarm.toFixed(2)}   ${pa.lit.toFixed(2)}  ${dir}`);
  }
}
await b.close();
console.log('\nPASS = BLD glint present at DUSK/DAWN (GWARM>0), ~0 at NOON/NIGHT; CTL ~0 all frames;');
console.log('       and the lit half FLIPS: DUSK L-half >> R-half, DAWN R-half >> L-half.');
