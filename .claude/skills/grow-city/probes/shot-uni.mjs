#!/usr/bin/env node
/* unishot.mjs — shoot the ONE university tile, zoomed, at a given time of day.
 * The university is a single tile per city and its position varies per seed, so a
 * fixed clip in shoot.config.json cannot frame it. Locate it with __find, wheel the
 * artifact's OWN camera in over it (real magnification, not upscaled pixels — the
 * hovershot.mjs trick), then clip.
 *   node unishot.mjs <seed> <t> <outfile>
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
/* resolve the artifact relative to THIS file, never an absolute path (skill law) */
const ROOT = [resolve(HERE, 'solvista.html'), resolve(HERE, '../../../../solvista.html'),
  resolve(HERE, '../../../solvista.html')].find(existsSync);

const [seed, t, out] = process.argv.slice(2);
const ZOOM = +(process.env.ZOOM || 5);

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 });
await p.goto(`${pathToFileURL(ROOT).href}?seed=${seed}&warp=61&t=${t}&year=2035.62`);
await p.waitForTimeout(900);

/* Wheel-zoom drifts the target into a corner, so aim the camera directly. And the
   campanile is TALL: its lantern sits (h+16) WORLD units above the tile centre, so
   at scale Z it is ~41*Z screen px up — at Z=17 that is ~700px, which is how the
   first cut of this script shot the tower's top clean out of frame and drew two
   VISUAL FAILs that were about the CROP, not the city. So read the cell's own `h`
   and frame from the tower top down. */
const u = await p.evaluate((Z) => {
  let cell = null;
  for (let y = 0; y < G && !cell; y++) for (let x = 0; x < G; x++) {
    const c = cellAt(x, y);
    if (c && c.t === T.CIVIC && c.kind === 'university') { cell = [x, y]; break; }
  }
  if (!cell) return null;
  const c = cellAt(cell[0], cell[1]);
  const [wx, wy] = ctr(cell[0], cell[1]);
  /* tile centre -> above the spire. h+14.6 clears the spire tip, BUT the campanile
     is drawn from px(gx-fxU*0.18, gy-0.34) — an offset centre that is itself well
     ABOVE the tile centre — so budgeting only h+18 still clipped seed 7's spire and
     drew a second false VISUAL FAIL. Pay for the offset too, with margin. */
  const upWorld = c.h + 30;
  scale = Z;
  const cy = innerHeight - 120;             /* park the tile centre low in the frame */
  offX = innerWidth / 2 - wx * scale;
  offY = cy - wy * scale;
  render();
  return { cx: innerWidth / 2, cy, top: cy - upWorld * scale, h: c.h, cell };
}, ZOOM);
if (!u) { console.error('no university found'); await b.close(); process.exit(1); }
await p.waitForTimeout(300);

/* Do NOT try to estimate the tower top. Twice now a clip computed from `h` cropped
   the spire and drew a VISUAL FAIL that was about the CROP, not the city — the
   campanile is drawn from px(gx-fxU*0.18, gy-0.34), an origin already well above
   the tile centre, so `h` alone always under-counts. The camera parks the block
   base at cy, so simply clip from the top of the viewport: a little extra sky costs
   nothing, a cropped spire costs an agent round. */
const W = 640;
const top = 0;
const H = Math.min(1000, u.cy + 60);
const clip = { x: Math.max(0, u.cx - W / 2), y: top, width: W, height: H };
await p.screenshot({ path: out, clip });
await b.close();
console.log(`${out}  seed=${seed} t=${t}  h=${u.h.toFixed(1)}  clip y ${top.toFixed(0)}..${(top + H).toFixed(0)} (tower top ${u.top.toFixed(0)}, base ${u.cy})`);
