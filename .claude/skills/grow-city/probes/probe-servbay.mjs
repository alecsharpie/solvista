#!/usr/bin/env node
/* probe-servbay.mjs — CAN YOU SEE the vehicle that came home?
 *
 * probe-servcall proved the fleet ARRIVES (0% -> 10-25% of its time standing at its own
 * door, control flat). Two visual agents then said they could not find the fire engine at
 * the firehouse at all, and that the ambulance was "half-buried" at the hospital. Both
 * things can be true at once, and the reason is DRAW ORDER: the plate renders in plain rows
 * top->bottom, so a LOWER row is drawn LATER and therefore IN FRONT (195's law). civicDoor()
 * returns every road cell touching the institution and servSend() builds a multi-source BFS,
 * so the vehicle homes to the NEAREST door -- which is very often the one BEHIND the building,
 * where the building's own body then draws straight over it.
 *
 * Occlusion is directly measurable (203's law) -- never settle it by reading the draw code.
 * For each service vehicle, parked at its bay, this measures its INK: render the frozen frame
 * with the vehicle in the fleet, and again with it spliced out, and count the pixels that
 * differ. That is threshold-free and correct however small the vehicle is (203: a colour
 * threshold fails on thin draws).
 *
 *    inkAtBay      px the parked vehicle contributes where it actually parks
 *    inkOnTop      px the SAME vehicle contributes when re-drawn over the finished frame
 *    visible%      inkAtBay / inkOnTop   -- 0% = the building ate it entirely
 *    rowDelta      doorRow - civicRow    -- negative = it parked BEHIND the building
 *
 * A vehicle that is 100% visible needs no fix; one at ~0% is invisible to the user and the
 * whole iteration is decoration nobody can see.
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = [resolve(HERE, 'solvista.html'), resolve(HERE, '../../../../solvista.html')].find(existsSync);

const SEEDS = [7, 42, 1234];
const KINDS = ['ambo', 'police', 'fireeng'];
const HOMEK = { police: 'police', fireeng: 'firehouse', ambo: 'hospital' };

const browser = await chromium.launch();
const pg = await browser.newPage({ viewport: { width: 1200, height: 800 } });
pg.on('pageerror', e => console.log('  PAGE ERROR', e.message));

async function run(seed, kind) {
  await pg.goto('file://' + ROOT + '?seed=' + seed + '&warp=61');
  await pg.waitForTimeout(350);
  return await pg.evaluate(({ kind, civicKind }) => {
    playing = false; dayT = 0.30;
    let s = 0x2F6E2B1 >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    const v = vehicles.find(u => u.kind === kind);
    if (!v) return null;
    let t = 0;
    while (t < 900 && v.duty !== 'bay') { advanceEntities(1 / 30, 1); time += 1 / 30; t += 1 / 30; }
    if (v.duty !== 'bay') return { no: 'never came home' };

    let cx = null;
    for (const i of HEXI) { const c = cells[i]; if (c.t === T.CIVIC && c.kind === civicKind) { cx = [i % G, (i / G) | 0]; break; } }
    const b = ctr(cx[0], cx[1]);
    scale = 5.5; offX = innerWidth / 2 - b[0] * scale; offY = innerHeight / 2 - b[1] * scale;

    const ctx2 = cvs.getContext('2d');
    const grab = () => { render(); return ctx2.getImageData(0, 0, cvs.width, cvs.height).data; };

    const withV = grab();                               // the vehicle where it really parks
    const keep = vehicles.slice();
    vehicles.splice(vehicles.indexOf(v), 1);
    const without = grab();                             // the same frame with it spliced out
    vehicles.length = 0; vehicles.push(...keep);

    // ...and the same vehicle re-drawn OVER the finished frame: its full, unoccluded ink
    render();
    ctx2.save();
    const dpr = window.devicePixelRatio || 1;
    ctx2.setTransform(dpr * scale, 0, 0, dpr * scale, dpr * offX, dpr * offY);
    drawVehicle(v);
    ctx2.restore();
    const onTop = ctx2.getImageData(0, 0, cvs.width, cvs.height).data;

    const ink = (a, b2) => {
      let n = 0;
      for (let i = 0; i < a.length; i += 4) {
        if (Math.abs(a[i] - b2[i]) + Math.abs(a[i + 1] - b2[i + 1]) + Math.abs(a[i + 2] - b2[i + 2]) > 12) n++;
      }
      return n;
    };
    return {
      atBay: ink(withV, without), onTop: ink(onTop, without),
      rowDelta: v.y - cx[1], vhex: [v.x, v.y], civic: cx,
    };
  }, { kind, civicKind: HOMEK[kind] });
}

console.log('probe-servbay — can you SEE the vehicle that came home?\n');
console.log('  vehicle   seed   inkAtBay  inkOnTop  visible%   rowDelta (neg = parked BEHIND)');
for (const kind of KINDS) {
  for (const seed of SEEDS) {
    const r = await run(seed, kind);
    if (!r || r.no) { console.log('  ' + kind.padEnd(9) + String(seed).padStart(5) + '   ' + (r ? r.no : 'absent')); continue; }
    const vis = r.onTop ? 100 * r.atBay / r.onTop : 0;
    console.log('  ' + kind.padEnd(9) + String(seed).padStart(5)
      + String(r.atBay).padStart(11) + String(r.onTop).padStart(10)
      + (vis.toFixed(0) + '%').padStart(10) + String(r.rowDelta).padStart(11)
      + '   ' + (vis < 25 ? '  <-- HIDDEN' : ''));
  }
}
await browser.close();
