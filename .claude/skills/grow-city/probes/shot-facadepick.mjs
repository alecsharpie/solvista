#!/usr/bin/env node
/* shot-facadepick — drive the REAL mouse onto a downtown tower's FACADE and shoot
 * the tooltip + focus ring, HEAD vs PATCH (cue (ba), iter 278).
 *
 * This uses NONE of the pick's geometry model: it moves the actual cursor to a
 * screen point on the tower's wall (the point is chosen from the drawn base, then
 * lifted up the facade in SCREEN px), fires the artifact's own mousemove listener,
 * renders (which draws the tile ring at ctr(hoverTile)), and screenshots the DOM-
 * composited frame (200 -- the tooltip is a DOM card). Each frame self-reports what
 * hoverTile + the card resolved to (202), so the tool states the answer and the
 * agent only confirms the pixels. Frames named by FILE; A/B token map crossed
 * between seeds (238/239/268).
 *
 *   SRC=/path/to/head.html node shot-facadepick.mjs <seed> <outdir> <tokenA> <tokenB>
 */
import { homedir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync, mkdirSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const CAND = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html')];
const ART = (process.env.SRC && existsSync(process.env.SRC)) ? process.env.SRC : CAND.find(existsSync);
const seed = Number(process.argv[2] || 42);
const outdir = process.argv[3] || 'shots/facadepick';
const tok = process.argv[4] || 'shipped';
mkdirSync(outdir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
await page.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await page.goto(pathToFileURL(ART).href);
await page.waitForFunction(() => typeof genWorld === 'function' && typeof ctr === 'function');

// build the city, settle heights, zoom onto the tallest tower, and return the
// SCREEN point on its facade to aim the real cursor at.
const info = await page.evaluate((seed) => {
  playing = false;
  genWorld(seed); __warp(61); __setYear(2035.62);
  for (const c of cells) if (DEV.has(c.t) && c.h < c.th) c.h = c.th;
  // tallest tower with an open (road) hex directly behind it -- the classic mis-hover
  let best = null;
  for (let y = 2; y < G; y++) for (let x = 0; x < G; x++) {
    const c = cells[idx(x, y)];
    if (!c || c.t !== T.TOWER) continue;
    const bx = x - ((y & 1) ? 0 : 1), b = cells[idx(bx, y - 1)]; // hex behind (up-screen)
    const behindOpen = b && (b.t === T.ROAD || b.t === T.EMPTY || b.t === T.PARK);
    if (!best || c.h > best.h) best = { x, y, h: c.h, behindOpen };
  }
  const { x, y, h } = best;
  const [wcx, wcy] = ctr(x, y);
  // frame it: zoom about the tower base
  zoom = 5.5; scale = fitScale * zoom;
  offX = innerWidth / 2 - wcx * scale;
  offY = innerHeight * 0.62 - wcy * scale;          // base low in frame so the wall fills up
  clampPan();
  render();
  // a point ~65% up the facade, in SCREEN px, chosen from the drawn base (no pick model)
  const baseSx = wcx * scale + offX, baseSy = wcy * scale + offY;
  const sx = baseSx, sy = baseSy - 0.65 * h * scale;
  return { x, y, h: Math.round(h), sx, sy, baseSy: Math.round(baseSy), behind: best.behindOpen };
}, seed);

// fire the real listener at that screen point, then render (draws the ring) and report
await page.mouse.move(info.sx, info.sy);
const report = await page.evaluate(() => {
  render();
  const ht = hoverTile ? `${hoverTile.x},${hoverTile.y}` : 'none';
  const ent = hoverEnt ? 'entity' : '';
  const vis = tipEl && tipEl.style.display !== 'none';
  const title = vis ? (tipEl.querySelector('.tt')?.textContent || '(no title)') : '(hidden)';
  return { ht, title, ent };
});
console.log(`seed ${seed} [${tok}] tower ${info.x},${info.y} h=${info.h} behind-open=${info.behind}`);
console.log(`  cursor on facade -> hoverTile ${report.ht} · card names: "${report.title}"`);
await page.screenshot({ path: join(outdir, `s${seed}-${tok}.png`) });
await browser.close();
