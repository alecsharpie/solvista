#!/usr/bin/env node
/* probe-facadepick — when you hover a tall building's FACADE, does the tile pick
 * name the BUILDING, or the ground hex drawn BEHIND it? (cue (ba), iter 278;
 * Urban fabric × Interaction/UX)
 *
 * The tile pick (hoverAt) converts the cursor to world (wx,wy) and takes the
 * nearest hex GROUND CENTRE. A building rises UP the screen from its ground
 * centre, so a cursor on a tower's wall sits far above that centre, and the
 * nearest ground centre is a hex several rows BEHIND — usually a road. So the
 * card/ring names the wrong hex over the whole upper facade.
 *
 * This drives the pick in-page over sample points ON each building's front wall.
 *   - GROUND  = HEAD's inline nearest-ground-centre pick (replicated here).
 *   - SHIPPED = pickTile() if the build exposes it, else GROUND (build-agnostic).
 * A point is "correct" when the pick names the very hex whose wall it sits on
 * AND that hex is the FRONTMOST built column covering the point (i.e. the point
 * is actually visible, not occluded by a nearer building) — so an occluded wall
 * point is excluded rather than scored as a miss.
 *
 * CONTROL (250, must-not-move): open-ground hexes (ROAD/PARK/EMPTY) sampled at
 * their own centres — GROUND and SHIPPED must agree there on every build.
 *
 *   SRC=/path/to/head.html node probe-facadepick.mjs [seed ...]
 */
import { homedir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const CAND = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html'),
              process.env.SRC].filter(Boolean);
const ART = (process.env.SRC && existsSync(process.env.SRC)) ? process.env.SRC : CAND.find(existsSync);
const seeds = process.argv.slice(2).filter(a => !a.startsWith('-')).map(Number);
const SEEDS = seeds.length ? seeds : [42, 7, 1234];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
await page.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await page.goto(pathToFileURL(ART).href);
await page.waitForFunction(() => typeof genWorld === 'function' && typeof ctr === 'function');

for (const seed of SEEDS) {
  const r = await page.evaluate((seed) => {
    playing = false;
    genWorld(seed);
    __warp(61);            // ~2035
    __setYear(2035.62);
    // settle heights (272): c.h grows only in render(); the mature drawn wall is c.th
    for (const c of cells) if (DEV.has(c.t) && c.h < c.th) c.h = c.th;

    const CW2 = CW, ROWY2 = ROWY, VR2 = VR, ER2 = ER;
    const BODY = new Set([T.RES, T.MID, T.COM, T.TOWER, T.IND]); // c.h-prism bodies
    // per-hex drawn column: centre = ctr(x,y); half-width X; top = cby-V-h; bottom = cby+V
    const HW2 = CW2 / 2;
    const colOf = (x, y) => {
      const c = cells[idx(x, y)];
      if (!c || !BODY.has(c.t)) return null;
      const cx = (x + 0.5 + (y & 1) * 0.5) * CW2, cy = (y + 0.5) * ROWY2;
      const X = 0.34 * CW2;            // generous body half-width (max ~0.36)
      const V = 0.30 * 2 * VR2;
      return { cx, cy, X, V, h: c.h };
    };
    // HEAD's inline ground-plane pick, replicated verbatim
    const groundPick = (wx, wy) => {
      const y0 = Math.round(wy / ROWY2 - 0.5), x0 = Math.round(wx / CW2 - 1);
      let x = -1, y = -1, bd = 1e9;
      for (let yy = y0 - 1; yy <= y0 + 1; yy++) for (let xx = x0; xx <= x0 + 2; xx++) {
        if (!inB(xx, yy)) continue;
        const dx = wx - (xx + 0.5 + (yy & 1) * 0.5) * CW2, dy = (wy - (yy + 0.5) * ROWY2) * 1.73;
        const d = dx * dx + dy * dy; if (d < bd) { bd = d; x = xx; y = yy; }
      }
      return (x < 0) ? null : [x, y];
    };
    const shipped = (wx, wy) =>
      (typeof pickTile === 'function') ? pickTile(wx, wy) : groundPick(wx, wy);

    // frontmost built column covering a point (ground truth for "what is visible")
    const HMAX = 200;
    const frontmost = (wx, wy) => {
      let best = null;
      const yTop = Math.floor((wy - 0) / ROWY2 - 0.5) - 1;
      const yBot = Math.ceil((wy + HMAX) / ROWY2 - 0.5) + 1;
      for (let yy = yTop; yy <= yBot; yy++) {
        const xc = Math.round(wx / CW2 - 0.5 - (yy & 1) * 0.5);
        for (let xx = xc - 1; xx <= xc + 1; xx++) {
          if (!inB(xx, yy)) continue;
          const col = colOf(xx, yy); if (!col) continue;
          if (Math.abs(wx - col.cx) <= col.X && wy >= col.cy - col.V - col.h && wy <= col.cy + col.V) {
            if (!best || yy > best[1]) best = [xx, yy];
          }
        }
      }
      return best;
    };

    // sample points on each building's front wall
    const fys = [0.12, 0.3, 0.5, 0.7, 0.9], fxs = [-0.5, 0, 0.5];
    const tally = {}; // type -> {pts, gHit, sHit}
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)]; if (!c || !BODY.has(c.t)) continue;
      if (c.h < 12) continue;                 // only buildings tall enough to mis-hover
      const col = colOf(x, y);
      const tn = ({ [T.RES]: 'RES', [T.MID]: 'MID', [T.COM]: 'COM', [T.TOWER]: 'TOWER', [T.IND]: 'IND' })[c.t];
      const t = tally[tn] || (tally[tn] = { pts: 0, gHit: 0, sHit: 0 });
      for (const fy of fys) for (const fx of fxs) {
        const wx = col.cx + fx * col.X, wy = col.cy - fy * col.h - 1;
        const fm = frontmost(wx, wy);
        if (!fm || fm[0] !== x || fm[1] !== y) continue;   // occluded / not visible here → skip
        t.pts++;
        const g = groundPick(wx, wy); if (g && g[0] === x && g[1] === y) t.gHit++;
        const s = shipped(wx, wy);    if (s && s[0] === x && s[1] === y) t.sHit++;
      }
    }

    // control: open-ground hexes at their own centres must be picked identically
    const OPEN = new Set([T.ROAD, T.PARK, T.EMPTY, T.SHOREPARK, T.FARM, T.MEADOW]);
    let ctrlN = 0, ctrlG = 0, ctrlS = 0, ctrlAgree = 0;
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)]; if (!c || !OPEN.has(c.t)) continue;
      const wx = (x + 0.5 + (y & 1) * 0.5) * CW2, wy = (y + 0.5) * ROWY2;
      if (frontmost(wx, wy)) continue;         // skip open cells that sit under a building's column
      ctrlN++;
      const g = groundPick(wx, wy), s = shipped(wx, wy);
      if (g && g[0] === x && g[1] === y) ctrlG++;
      if (s && s[0] === x && s[1] === y) ctrlS++;
      if (g && s && g[0] === s[0] && g[1] === s[1]) ctrlAgree++;
    }
    return { tally, ctrlN, ctrlG, ctrlS, ctrlAgree, hasPick: typeof pickTile === 'function' };
  }, seed);

  console.log(`\n=== seed ${seed}  (${r.hasPick ? 'pickTile PRESENT' : 'HEAD — ground pick only'}) ===`);
  console.log('  facade points named the building itself:  GROUND(HEAD) -> SHIPPED');
  let tp = 0, tg = 0, ts = 0;
  for (const tn of ['TOWER', 'COM', 'MID', 'RES', 'IND']) {
    const t = r.tally[tn]; if (!t || !t.pts) continue;
    tp += t.pts; tg += t.gHit; ts += t.sHit;
    console.log(`    ${tn.padEnd(6)} n=${String(t.pts).padStart(4)}   ${(100 * t.gHit / t.pts).toFixed(1).padStart(5)}%  ->  ${(100 * t.sHit / t.pts).toFixed(1).padStart(5)}%`);
  }
  if (tp) console.log(`    ${'ALL'.padEnd(6)} n=${String(tp).padStart(4)}   ${(100 * tg / tp).toFixed(1).padStart(5)}%  ->  ${(100 * ts / tp).toFixed(1).padStart(5)}%`);
  console.log(`  CONTROL open-ground centres n=${r.ctrlN}: ground ${(100 * r.ctrlG / r.ctrlN).toFixed(1)}% self · shipped ${(100 * r.ctrlS / r.ctrlN).toFixed(1)}% self · agree ${(100 * r.ctrlAgree / r.ctrlN).toFixed(1)}%`);
}
await browser.close();
