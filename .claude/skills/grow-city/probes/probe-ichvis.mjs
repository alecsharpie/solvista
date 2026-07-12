#!/usr/bin/env node
/* Is the interchange shelter actually VISIBLE, or is it buried? (iter 211)
 *
 * A visual agent FAILed seed 42: "no canopy, no posts, no totem — only the queue
 * figures render." Plausible: a station needs >=3 developed neighbours, so it sits
 * in dense fabric BY CONSTRUCTION, and iter 206's law says a ground-level thing in
 * dense fabric is often buried (draw order IS depth order). But an agent's cause is
 * a cue to MEASURE, never to redesign on.
 *
 * METHOD (161: a diff isolates the change by construction).
 *   inkInPlace = |render(c.stop=2) - render(c.stop=0)|   -- the shelter's ink, as drawn
 *   inkFree    = the same diff in a world where the TALL cells in the rows IN FRONT
 *                are flattened (th=0). They are equally absent from BOTH renders, so
 *                they cancel out of the diff: what is left is the shelter, unoccluded.
 *   occluded%  = 1 - inkInPlace / inkFree
 *
 * CONTROL: the ordinary (blind-coin) shelters. If they are buried just as badly, the
 * agent found a pre-existing condition of every bus stop in the city, not a defect
 * this vector introduced. If interchanges are systematically worse, the siting rule
 * needs 206's openFront() lever -- as a PREFERENCE, never a gate (206: the hard gate
 * starved the rule it was fixing).
 *
 *   node probe-ichvis.mjs [seed ...]
 */
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const CAND = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html')];
const PAGE = pathToFileURL(CAND.find(f => existsSync(f))).href;

const seeds = process.argv.slice(2).filter(a => !a.startsWith('-')).map(Number);
const SEEDS = seeds.length ? seeds : [42, 7, 1234, 5];

const b = await chromium.launch();
const out = [];
for (const seed of SEEDS) {
  const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
  p.on('pageerror', e => console.error('PAGEERROR', seed, String(e)));
  await p.goto(PAGE);
  await p.waitForTimeout(900);
  out.push(await p.evaluate((seed) => {
    /* 203: stub Math.random BEFORE genWorld, or the Math.random-spawned entities
       respawn between renders and every number below is noise. */
    let s = 0x2F6E2B1 >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    playing = false;
    genWorld(seed); __warp(61);
    if (typeof STARS !== 'undefined') STARS.length = 0;
    try { flock = null; } catch (e) {}
    waveT = 0; time = 0; __setTime(0.30);

    const cv = document.querySelector('canvas');
    const g2 = cv.getContext('2d');
    const snap = () => { render(); return g2.getImageData(0, 0, cv.width, cv.height).data; };
    const diff = (A, B) => { let n = 0; for (let i = 0; i < A.length; i += 4)
      if (Math.abs(A[i] - B[i]) + Math.abs(A[i+1] - B[i+1]) + Math.abs(A[i+2] - B[i+2]) > 12) n++; return n; };

    /* aim the camera at one cell, so the shelter is well resolved */
    const S0 = scale;
    const aim = (x, y) => { const [wx, wy] = ctr(x, y);
      scale = S0 * 4; offX = innerWidth / 2 - wx * scale; offY = innerHeight / 2 - wy * scale; };

    /* re-issue ONE tile on top of the finished frame (probe-gondz's two-z-order
       trick): whatever the shelter puts down HERE is its ink with nothing able to
       cover it. render() leaves the ctx in screen space, so restore the world
       transform first -- the same one render() itself uses. */
    const onTop = (x, y) => {
      render();
      ctx.setTransform(dpr * scale, 0, 0, dpr * scale, dpr * offX, dpr * offY);
      drawCell(x, y);
      return g2.getImageData(0, 0, cv.width, cv.height).data;
    };

    const measure = (x, y, kind) => {
      const c = cells[idx(x, y)];
      aim(x, y);
      const A = snap();                              /* as drawn, in its true z-order */
      c.stop = 0; const Z = snap();                  /* shelter gone */
      c.stop = kind;
      const inPlace = diff(A, Z);

      const T2 = onTop(x, y);                        /* the same tile, drawn last */
      c.stop = 0; const T0 = onTop(x, y);
      c.stop = kind;
      const free = diff(T2, T0);                     /* its ink if nothing covered it */

      return { x, y, open: openFront(x, y), fete: !!c.fete, inPlace, free,
               occ: free > 0 ? 1 - inPlace / free : 0 };
    };

    const ich = [], ord = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)];
      if (c.stop === 2) ich.push([x, y]); else if (c.stop === 1) ord.push([x, y]);
    }
    /* measure every interchange, and an equal-sized sample of ordinary stops */
    const step = Math.max(1, Math.floor(ord.length / Math.max(1, ich.length)));
    const ordS = ord.filter((_, i) => i % step === 0).slice(0, Math.max(1, ich.length));

    return {
      ich: ich.map(([x, y]) => measure(x, y, 2)),
      ord: ordS.map(([x, y]) => measure(x, y, 1)),
    };
  }, seed));
  await p.close();
}
await b.close();

const agg = rows => {
  if (!rows.length) return null;
  return {
    n: rows.length,
    meanOcc: (100 * rows.reduce((a, r) => a + r.occ, 0) / rows.length).toFixed(0) + '%',
    buried: rows.filter(r => r.occ >= 0.86).length,
    invisible: rows.filter(r => r.inPlace < 20).length,
    fete: rows.filter(r => r.fete).length,
    openFront: rows.filter(r => r.open).length,
    meanInk: Math.round(rows.reduce((a, r) => a + r.inPlace, 0) / rows.length),
    meanFree: Math.round(rows.reduce((a, r) => a + r.free, 0) / rows.length),
  };
};
console.log('seed | group       |  n  meanOcc >=86%buried  ink<20  fete  openFront  meanInk  meanFree');
const all = { ich: [], ord: [] };
SEEDS.forEach((s, i) => {
  for (const k of ['ich', 'ord']) {
    const a = agg(out[i][k]); if (!a) continue;
    all[k].push(...out[i][k]);
    console.log(String(s).padEnd(4), '|', (k === 'ich' ? 'INTERCHANGE' : 'ordinary   '), '|',
      String(a.n).padEnd(3), String(a.meanOcc).padEnd(7), String(a.buried).padEnd(12),
      String(a.invisible).padEnd(7), String(a.fete).padEnd(5), String(a.openFront).padEnd(10),
      String(a.meanInk).padEnd(8), a.meanFree);
  }
});
if (process.argv.includes('--rows')) {
  console.log('\n== PER INTERCHANGE ==');
  SEEDS.forEach((s, i) => out[i].ich.forEach(r => console.log(
    `seed ${s}  @${r.x},${r.y}  openFront=${r.open}  fete=${r.fete}  ` +
    `ink=${r.inPlace}  free=${r.free}  occluded=${(100 * r.occ).toFixed(0)}%`)));
}
console.log('\n== ALL SEEDS ==');
for (const k of ['ich', 'ord']) console.log((k === 'ich' ? 'INTERCHANGE' : 'ordinary   '), JSON.stringify(agg(all[k])));
