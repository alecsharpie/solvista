#!/usr/bin/env node
/* probe-seasonarea.mjs — the season, sampled over the HEX'S AREA, not its centre pixel.
 *
 * Iter 238. `probe-season.mjs` samples ONE pixel per instance:
 *     getImageData(Math.round(s.sx*dpr), Math.round(s.sy*dpr), 1, 1)
 * Iter 237 fixed that probe's weighting BETWEEN tile types (area-weighting the rows, so a
 * 7-hex MEADOW no longer counts as much as a 563-hex PARK) and left the sample WITHIN a hex
 * at a single pixel. Those are two different unit errors, and only the first was closed.
 *
 * It matters because a PARK draws its TREES at grid OFFSETS (tree(gx-0.28,gy-0.05,...)) and
 * its pond/fountain AT the centre — so the centre pixel of a park is lawn, never canopy, and
 * the probe is STRUCTURALLY BLIND to the park's trees. A canopy change can move every tree in
 * the city and this instrument will report PARK unmoved to within 0.1. (It did: 20.8 -> 20.9.)
 * FOREST, whose trees are dense enough to cover its centre, moved 18.9 -> 27.1 in the same run
 * — the probe sees canopy exactly where the canopy happens to sit on one pixel. That is 228's
 * law again: a banked probe acquitting the thing it was pointed at.
 *
 * Method: identical freeze (213's addInitScript PRNG stub; in-page genWorld+__warp per 163c, so
 * the world is byte-identical across builds), but for each instance sample a BOX the size of the
 * hex and report the MEAN per-pixel distance from winter. That cannot cancel (it is a mean of
 * |dRGB|, not a distance of means) and it is the area-integrated generalisation of what
 * probe-season computes at one pixel — the viewer's unit (218: the eye integrates AREA).
 *
 * Also reports CANOPY SHARE per tile type, by 234's palette-suppression law: loud-paint
 * BASE.canopy/canopyLt, flush CCACHE, re-render IN THE SAME PAGE, and the changed pixels ARE
 * the deciduous canopy — occlusion-correct, floor exactly 0, build-agnostic. That is what says
 * whether a canopy fix can reach a given surface at all.
 *
 *   node probe-seasonarea.mjs            # the working tree
 *   SRC=/tmp/head.html node probe-seasonarea.mjs
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(process.env.SRC || join(HERE, '../../../../solvista.html')).href;

const SEEDS = [7, 42, 1234];
const WARP = 61;
const SEASONS = [['winter', 0.02], ['spring', 0.30], ['dry-peak', 0.62], ['autumn', 0.87]];
const KINDS = ['MEADOW', 'FOREST', 'PARK', 'SHOREPARK', 'FARM', 'FIELD',
               'VINEYARD', 'ORCHARD', 'REDWOOD', 'GARDEN', 'QUAD', 'ROAD'];
const LEGIBLE = 25;   /* probe-season's floor, unchanged — see its header */

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
await p.addInitScript(() => {                       /* 213: stub before the page's own script */
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});

const acc = {}, counts = {}, canopyShare = {}, lawnShare = {};
for (const k of KINDS) { acc[k] = {}; canopyShare[k] = []; lawnShare[k] = []; counts[k] = 0;
  for (const [n] of SEASONS) acc[k][n] = []; }

for (const seed of SEEDS) {
  await p.goto(`${PAGE}?seed=${seed}&warp=${WARP}&t=0.30`);
  await p.waitForTimeout(400);

  const res = await p.evaluate(({ KINDS, SEASONS, seed, WARP }) => {
    playing = false;                       /* freeze: only `year` may move a pixel */
    genWorld(seed); __warp(WARP);          /* 163c: rebuild in-page, byte-identical across builds */
    const dpr = cvs.width / cvs.clientWidth;
    const W = cvs.width, H = cvs.height;

    const sites = {};
    for (const k of KINDS) sites[k] = window.__find(k)
      .filter(s => s.sx > 40 && s.sx < innerWidth - 40 && s.sy > 40 && s.sy < innerHeight - 40)
      .slice(0, 400);

    /* the hex's on-screen size, derived from two horizontally-adjacent instances of
       whatever kind has them — never hardcoded, since the camera fits the plate */
    let hexW = 0;
    for (const k of KINDS) {
      const m = new Map(sites[k].map(s => [s.x + ',' + s.y, s]));
      for (const s of sites[k]) {
        const n = m.get((s.x + 1) + ',' + s.y);
        if (n) { hexW = Math.abs(n.sx - s.sx); break; }
      }
      if (hexW) break;
    }
    const R = Math.max(2, Math.round(hexW * 0.42 * dpr));   /* inside the hex, clear of neighbours */

    const grab = () => ctx.getImageData(0, 0, W, H).data;
    /* mean per-pixel |dRGB| over the instance's box — an area integral, cannot cancel */
    const boxDist = (A, B, s) => {
      const cx = Math.round(s.sx * dpr), cy = Math.round(s.sy * dpr);
      let sum = 0, n = 0;
      for (let y = Math.max(0, cy - R); y <= Math.min(H - 1, cy + R); y++)
        for (let x = Math.max(0, cx - R); x <= Math.min(W - 1, cx + R); x++) {
          const i = (y * W + x) * 4;
          sum += Math.hypot(A[i] - B[i], A[i + 1] - B[i + 1], A[i + 2] - B[i + 2]); n++;
        }
      return n ? sum / n : 0;
    };
    const boxChanged = (A, B, s) => {   /* fraction of the box's pixels that moved at all */
      const cx = Math.round(s.sx * dpr), cy = Math.round(s.sy * dpr);
      let hit = 0, n = 0;
      for (let y = Math.max(0, cy - R); y <= Math.min(H - 1, cy + R); y++)
        for (let x = Math.max(0, cx - R); x <= Math.min(W - 1, cx + R); x++) {
          const i = (y * W + x) * 4;
          if (A[i] !== B[i] || A[i + 1] !== B[i + 1] || A[i + 2] !== B[i + 2]) hit++;
          n++;
        }
      return n ? hit / n : 0;
    };

    /* ---- seasonal shift, area-sampled ---- */
    const frames = {};
    for (const [name, yf] of SEASONS) { window.__setYear(2035 + yf); render(); frames[name] = grab(); }
    const out = { hexW, R: R / dpr, shift: {}, canopy: {}, n: {} };
    for (const k of KINDS) {
      out.n[k] = sites[k].length;
      out.shift[k] = {};
      for (const [name] of SEASONS)
        out.shift[k][name] = sites[k].map(s => boxDist(frames[name], frames.winter, s));
    }

    /* ---- 234: how much of each hex IS deciduous canopy? loud-paint it and diff, in ONE page ---- */
    window.__setYear(2035 + 0.62); render();
    const A = grab();
    /* applySeason() runs at the TOP of render() and rebuilds BASE.canopy from CAN0 every
       frame — so a loud paint is overwritten before one tree is drawn (the probe read 0.0%
       canopy on a FOREST). No-op the rebuilder for the B frame: every OTHER seasonal entry
       (grass, lawn, turf...) then retains the dry-peak value A's render just set, so it is
       held fixed and the diff isolates the canopy alone. */
    const saveAS = applySeason;
    const share = (names) => {
      applySeason = () => {};
      const keep = names.map(n => BASE[n].slice());
      names.forEach((n, i) => { BASE[n] = i % 2 ? [0, 255, 255] : [255, 0, 255]; });
      CCACHE = {};
      const B = grab_after_render();
      names.forEach((n, i) => { BASE[n] = keep[i]; });
      applySeason = saveAS; CCACHE = {};
      const o = {};
      for (const k of KINDS) o[k] = sites[k].map(s => boxChanged(A, B, s));
      return o;
    };
    function grab_after_render() { render(); return grab(); }
    out.canopy = share(['canopy', 'canopyLt']);
    out.lawn = share(['lawn']);
    return out;
  }, { KINDS, SEASONS, seed, WARP });

  for (const k of KINDS) {
    counts[k] += res.n[k];
    canopyShare[k].push(...res.canopy[k]);
    lawnShare[k].push(...res.lawn[k]);
    for (const [n] of SEASONS) acc[k][n].push(...res.shift[k][n]);
  }
  if (seed === SEEDS[0]) console.log(`hex on screen ${res.hexW.toFixed(1)}px -> sample box +/-${res.R.toFixed(1)}px\n`);
}
await b.close();

const mean = a => a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0;
const VEG = KINDS.filter(k => k !== 'ROAD');
const totVeg = VEG.reduce((s, k) => s + counts[k], 0);

console.log('MEAN PER-PIXEL DISTANCE FROM WINTER, over the HEX\'S AREA (RGB euclidean, 0-441)');
console.log(`clock frozen, seeds ${SEEDS.join('/')}, warp ${WARP}, t=0.30${process.env.SRC ? '   [SRC=' + process.env.SRC + ']' : ''}\n`);
console.log('  tile         n   share    canopy%    lawn%     winter   spring dry-peak   autumn');
console.log('  ' + '-'.repeat(84));
let muteN = 0; const mutes = [];
for (const k of KINDS) {
  const sh = k === 'ROAD' ? '   --' : (100 * counts[k] / totVeg).toFixed(1) + '%';
  const cs = (100 * mean(canopyShare[k])).toFixed(1) + '%';
  const ls = (100 * mean(lawnShare[k])).toFixed(1) + '%';
  const cols = SEASONS.map(([n]) => mean(acc[k][n]).toFixed(1).padStart(8)).join(' ');
  const dry = mean(acc[k]['dry-peak']);
  const mute = k !== 'ROAD' && dry < LEGIBLE;
  if (mute) { muteN += counts[k]; mutes.push(`${k}(${counts[k]})`); }
  console.log(`  ${k.padEnd(10)}${String(counts[k]).padStart(5)}${sh.padStart(8)}${cs.padStart(10)}${ls.padStart(9)}   ${cols}` +
              (mute ? '   <-- MUTE (< ' + LEGIBLE + ')' : (k === 'ROAD' ? '   <-- control' : '')));
}
const wAvg = n => VEG.reduce((s, k) => s + counts[k] * mean(acc[k][n]), 0) / totVeg;
console.log('\nAREA-WEIGHTED over the ' + totVeg + ' vegetated hexes (the VIEWER\'S unit):');
console.log('  all veg   ' + String(totVeg).padStart(5) + '  100.0%' +
            (100 * VEG.reduce((s, k) => s + counts[k] * mean(canopyShare[k]), 0) / totVeg).toFixed(1).padStart(9) + '%   ' +
            SEASONS.map(([n]) => wAvg(n).toFixed(1).padStart(8)).join(' '));
console.log(`\n  MUTE AREA at the dry peak (< ${LEGIBLE}/441): ${muteN} / ${totVeg} = ${(100 * muteN / totVeg).toFixed(1)}%`);
if (mutes.length) console.log('  mute surfaces: ' + mutes.join(' · '));
console.log('\n  canopy% = the share of the hex\'s own box that the DECIDUOUS canopy actually paints');
console.log('  (234: loud-paint BASE.canopy/canopyLt, re-render in one page, the changed pixels ARE it).');
console.log('  A surface with a low canopy% CANNOT be moved by any canopy change, however large.');
