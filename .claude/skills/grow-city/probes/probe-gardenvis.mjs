#!/usr/bin/env node
/* Is the community garden actually VISIBLE, and is it where the camera says it is?
 *
 * A visual agent FAILed seed 5: "no garden at the centre of the frame; the only
 * garden-like tile is off-centre and has no lawn hex under it." Two checkable
 * claims -- one about the CAMERA, one about OCCLUSION. Both are measurable, so
 * measure them rather than redesign on an agent's say-so (the locate-don't-judge law).
 *
 * Method (iter 203's probe-gondz): render the SAME frozen frame three ways --
 *   SUPPRESSED : the garden cell forced to T.EMPTY            (the background)
 *   IN PLACE   : the garden drawn where the draw loop puts it (depth-sorted)
 *   ON TOP     : the background, then drawCell() re-painted over the finished frame
 * Then
 *   inkInPlace = |IN PLACE - SUPPRESSED|   (what the eye actually gets)
 *   inkOnTop   = |ON TOP   - SUPPRESSED|   (the garden's full unoccluded footprint)
 *   occluded%  = 1 - inkInPlace/inkOnTop
 * and the CENTROID of the in-place diff says where on screen it really lands.
 *
 * Freeze discipline: stub Math.random BEFORE genWorld (iter 203 -- joggers/whales/
 * deer respawn on every genWorld and are ~4000px of noise), clear STARS + flock,
 * pin waveT/time (iter 195f). The unchanged-frame control must read an honest 0.
 *
 *   node probe-gardenvis.mjs [seed ...]
 */
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = ['.', '../../../..'].map(u => resolve(HERE, u, 'solvista.html')).find(existsSync);
const PAGE = pathToFileURL(ROOT).href;

const seeds = process.argv.slice(2).filter(a => !a.startsWith('-')).map(Number);
const SEEDS = seeds.length ? seeds : [7, 42, 1234, 5, 99, 3];
const ZOOM = 4.0;

const b = await chromium.launch();
console.log('page:', PAGE);
console.log('');
console.log('  seed  garden      ink in place / on top   occluded    centroid vs frame centre');
console.log('  ---------------------------------------------------------------------------');

const all = [];
for (const seed of SEEDS) {
  const p = await b.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 1 });
  p.on('pageerror', e => console.error('PAGEERROR', seed, String(e)));
  await p.goto(`${PAGE}?seed=${seed}&t=0.30`);
  await p.waitForTimeout(400);

  const rows = await p.evaluate(({ seed, ZOOM }) => {
    /* ---- deterministic freeze (203 / 199 / 195f) ---- */
    playing = false;
    let s = 0x2F6E2B1 >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    genWorld(seed); __warp(61);
    STARS.length = 0; flock = null;
    waveT = 12.5; time = 40.0;

    const ctx2 = cvs.getContext('2d');
    const W = cvs.width, H = cvs.height;
    const snap = () => { lastSky = 0; syncSky(performance.now()); render(); return ctx2.getImageData(0, 0, W, H).data; };
    const diff = (a, b) => {
      let n = 0, sx = 0, sy = 0;
      for (let i = 0; i < a.length; i += 4) {
        const d = Math.max(Math.abs(a[i] - b[i]), Math.abs(a[i + 1] - b[i + 1]), Math.abs(a[i + 2] - b[i + 2]));
        if (d > 8) { const px = (i / 4) % W, py = (i / 4 / W) | 0; n++; sx += px; sy += py; }
      }
      return { n, cx: n ? sx / n : -1, cy: n ? sy / n : -1 };
    };

    const gardens = window.__find('GARDEN');
    const out = [];
    /* noise-floor control: the same frame twice, nothing changed. Must be 0. */
    const ctl = diff(snap(), snap());

    for (const g of gardens) {
      const c = cells[idx(g.x, g.y)];
      const [wx, wy] = ctr(g.x, g.y);
      /* aim the artifact's own camera at this garden */
      scale = ZOOM; offX = innerWidth / 2 - wx * scale; offY = innerHeight / 2 - wy * scale;
      const dpr = W / innerWidth;                       /* device px per CSS px */
      const fcx = W / 2, fcy = H / 2;

      const keep = c.t;
      c.t = T.EMPTY; const base = snap();               /* SUPPRESSED */
      c.t = keep;    const inplace = snap();            /* IN PLACE (depth-sorted) */
      /* ON TOP: background, then re-paint just this cell over the finished frame */
      c.t = T.EMPTY; snap(); c.t = keep;
      ctx2.save(); ctx2.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx2.translate(offX, offY); ctx2.scale(scale, scale);
      drawCell(g.x, g.y);
      ctx2.restore();
      const ontop = ctx2.getImageData(0, 0, W, H).data;

      const dIn = diff(base, inplace), dTop = diff(base, ontop);
      /* WHAT IS IN FRONT? rows draw top->bottom, so the row below (dy=+1) is drawn
         LAST and is what buries this hex. Name the occluder; don't guess a lever. */
      const TN = Object.fromEntries(Object.entries(T).map(([k, v]) => [v, k]));
      const front = [];
      for (const [dx, dy] of nbrDirs(g.y)) {
        if (dy !== 1) continue;
        const n = cellAt(g.x + dx, g.y + dy);
        if (n) front.push(TN[n.t]);
      }
      out.push({
        x: g.x, y: g.y, inPlace: dIn.n, onTop: dTop.n,
        occ: dTop.n ? 1 - dIn.n / dTop.n : null,
        dx: dIn.n ? (dIn.cx - fcx) / dpr : null,       /* CSS px from frame centre */
        dy: dIn.n ? (dIn.cy - fcy) / dpr : null,
        front,
      });
    }
    return { ctl: ctl.n, out };
  }, { seed, ZOOM });

  await p.close();
  if (rows.ctl !== 0) console.log(`  !! seed ${seed}: NOISE FLOOR ${rows.ctl} px (should be 0) -- readings suspect`);
  for (const r of rows.out) {
    all.push({ seed, ...r });
    const off = r.dx === null ? '   (invisible)' :
      `(${r.dx >= 0 ? '+' : ''}${r.dx.toFixed(0)}, ${r.dy >= 0 ? '+' : ''}${r.dy.toFixed(0)}) px`;
    console.log(`  ${String(seed).padStart(4)}  (${String(r.x).padStart(2)},${String(r.y).padStart(2)})  ` +
      `${String(r.inPlace).padStart(6)} / ${String(r.onTop).padStart(5)} px   ` +
      `${r.occ === null ? '  n/a' : (100 * r.occ).toFixed(0).padStart(4) + '%'}      ${off}` +
      `   in front: ${r.front.join(',')}`);
  }
}
await b.close();

const vis = all.filter(r => r.onTop > 0);
const dead = vis.filter(r => r.inPlace === 0);
const mean = a => a.reduce((x, y) => x + y, 0) / (a.length || 1);
console.log('');
console.log(`gardens measured        : ${all.length} over ${SEEDS.length} seeds`);
console.log(`fully occluded (0 ink)  : ${dead.length}  ${dead.length ? '<-- eaten whole by the rows in front' : ''}`);
console.log(`mean occluded           : ${(100 * mean(vis.map(r => r.occ))).toFixed(0)}%`);
console.log(`mean |centroid offset|  : ${mean(vis.filter(r => r.dx !== null).map(r => Math.hypot(r.dx, r.dy))).toFixed(0)} px` +
  `   (0 = the camera is aimed true; a hex is ~${(2 * 11 * ZOOM).toFixed(0)}px across at ${ZOOM}x)`);

/* THE LEVER, measured before it is mandated (198): does "what stands in the row in
   FRONT" actually separate the buried gardens from the visible ones? */
const TALL = new Set(['MID', 'TOWER', 'COM', 'CIVIC', 'IND', 'FOREST', 'REDWOOD']);
const blocked = vis.filter(r => r.front.some(t => TALL.has(t)));
const clear = vis.filter(r => !r.front.some(t => TALL.has(t)));
console.log('');
console.log('THE LEVER: is there a TALL tile in the row IN FRONT (dy=+1)?');
console.log(`  front is TALL  : n=${String(blocked.length).padStart(2)}   mean occluded ${(100 * mean(blocked.map(r => r.occ))).toFixed(0)}%` +
  `   mean visible ink ${mean(blocked.map(r => r.inPlace)).toFixed(0)} px   (>=86% buried: ${blocked.filter(r => r.occ >= 0.86).length})`);
console.log(`  front is CLEAR : n=${String(clear.length).padStart(2)}   mean occluded ${(100 * mean(clear.map(r => r.occ))).toFixed(0)}%` +
  `   mean visible ink ${mean(clear.map(r => r.inPlace)).toFixed(0)} px   (>=86% buried: ${clear.filter(r => r.occ >= 0.86).length})`);
console.log('');
console.log('  (if the two rows do not separate, the lever is worthless -- 204 built exactly');
console.log('   this lever for the service bays and measured it at nothing. Do not mandate a');
console.log('   fix a table has not backed.)');
