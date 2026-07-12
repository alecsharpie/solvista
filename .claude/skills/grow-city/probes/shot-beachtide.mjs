#!/usr/bin/env node
/* shot-beachtide.mjs — frame the BEACH FURNITURE for the visual gate.
 *
 * The fixed `coast` clip in shoot.config.json is a hard-coded rectangle, and the
 * coastline moves from seed to seed: on seed 7 it lands on open water and the beach
 * is off the edge of the crop (a visual agent correctly FAILed the framing, not the
 * feature). So aim the camera instead of guessing a rectangle.
 *
 * Finds a beach hex that ACTUALLY DRAWS a parasol -- by capturing the real draw call
 * (ellipse with the unique 4.5x2.6 canopy signature) rather than recomputing the gate
 * -- and that FACES THE SEA (a landlocked beach hex has no tide to answer, so framing
 * one would prove nothing). Centres the artifact's own camera on it, zoomed, and shoots
 * the same frame at dead low water and at high water.
 *
 *   node shot-beachtide.mjs <seed> <outdir>
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync, mkdirSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = [resolve(HERE, 'solvista.html'), resolve(HERE, '../../../../solvista.html')].find(existsSync);

const seed = process.argv[2] || '42';
const outdir = resolve(process.argv[3] || join(HERE, '../shots/beachtide' + seed));
mkdirSync(outdir, { recursive: true });

const ZOOM = +(process.env.ZOOM || 3.4);
const VW = 1400, VH = 900;
const CLIP = { x: VW / 2 - 340, y: VH / 2 - 250, width: 680, height: 500 };

const browser = await chromium.launch();
const pg = await browser.newPage({ viewport: { width: VW, height: VH } });
pg.on('pageerror', e => console.log('  PAGE ERROR', e.message));
await pg.goto('file://' + ROOT + '?seed=' + seed + '&warp=61&t=0.5&year=2035.62');
await pg.waitForTimeout(600);

// find a sea-facing beach hex that really draws a parasol, and aim the camera at it
const aim = await pg.evaluate(({ ZOOM, VW, VH }) => {
  playing = false; dayT = 0.5;
  const proto = CanvasRenderingContext2D.prototype;
  if (!proto.__origEllipse) proto.__origEllipse = proto.ellipse;
  let grab = [];
  proto.ellipse = function (x, y, rx, ry, ...rest) {
    if (grab && rx === 4.5 && ry === 2.6) grab.push([x, y]);
    return proto.__origEllipse.call(this, x, y, rx, ry, ...rest);
  };
  TIDE = 0.5; render();
  const parasols = grab; grab = null;

  // which beach hexes face the sea (same water test the damp margin uses)
  const seaFacing = [];
  for (const i of HEXI) {
    const c = cells[i];
    if (!c || c.t !== T.BEACH) continue;
    const gx = i % G, gy = (i / G) | 0;
    let n = 0;
    for (const [dx, dy] of nbrDirs(gy)) {
      const e = cellAt(gx + dx, gy + dy);
      if (e && e.t === T.WATER && !e.riv) n++;
    }
    if (n) { const [hx, hy] = ctr(gx, gy); seaFacing.push([hx, hy]); }
  }
  // the parasol nearest a sea-facing hex centre, preferring a spot with neighbours
  let best = null, bestScore = -1;
  for (const p of parasols) {
    let d = 1e9;
    for (const h of seaFacing) d = Math.min(d, (p[0] - h[0]) ** 2 + (p[1] - h[1]) ** 2);
    if (d > 20 * 20) continue;                       // not on a sea-facing hex
    const near = parasols.filter(q => Math.hypot(q[0] - p[0], q[1] - p[1]) < 90).length;
    if (near > bestScore) { bestScore = near; best = p; }
  }
  if (!best) return null;
  scale = ZOOM;
  offX = VW / 2 - best[0] * scale;
  offY = VH / 2 - best[1] * scale;
  return { wx: best[0], wy: best[1], cluster: bestScore, parasols: parasols.length, seaFacing: seaFacing.length };
}, { ZOOM, VW, VH });

if (!aim) { console.log('seed ' + seed + ': no sea-facing parasol found'); await browser.close(); process.exit(1); }
console.log(`seed ${seed}: aimed at a sea-facing parasol (${aim.cluster} in its cluster; ` +
  `${aim.parasols} parasols, ${aim.seaFacing} sea-facing beach hexes)`);

for (const [nm, tide] of [['low', 0.02], ['high', 0.98]]) {
  await pg.evaluate(t => { TIDE = t; TIDEV = 1; render(); }, tide);
  await pg.screenshot({ path: join(outdir, nm + '.png'), clip: CLIP });
}
console.log('  -> ' + outdir + '/{low,high}.png');
await browser.close();
