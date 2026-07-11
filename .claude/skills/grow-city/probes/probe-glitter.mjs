#!/usr/bin/env node
/* probe-glitter.mjs — does the day sun add a shimmer sheet to the open sea, only
 * there, and only by day? (Iter 150, Water × Polish.)
 *
 * The change lifts open-water tone toward a cool highlight in slow drifting
 * bands that peak at noon (glit=(1-LITAMT)*max(0,1-|dayT-0.47|/0.30)) and are
 * gone before dusk, so the night look (the warm city smear) is byte-unchanged.
 *
 * Self-contained, no build-vs-build: freeze the clock AND pin waveT identically
 * (playing=false, waveT set to a constant), then render the SAME artifact at
 * noon (glit=1) and at morning (glit=0). The ONLY thing that differs is the
 * glitter code (lighting tint barely moves: lit 0 vs ~0.05). Count pixels the
 * noon frame pushed toward cool white (min channel up) over the OPEN-SEA box and
 * over an inland LAND box:
 *   sea  = the glitter        (should be large)
 *   land = spatial control    (should be ~0: the change only touches WATER draw)
 * A morning-frame that drew no glitter is the temporal control BY CONSTRUCTION
 * (glit=0), so the sea count IS the day-only glitter.
 *
 *   node probe-glitter.mjs
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(join(HERE, '../../../../solvista.html')).href;

const SEEDS = [7, 42, 1234];
const WARP = 61;
const NOON = 0.47;   /* glit = 1 */
const MORN = 0.16;   /* glit = 0 (|.16-.47|>.30); lighting still ~day (lit~.05) */
const DMIN = 12;     /* min-channel rise that counts as "pushed toward cool white" */

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
const mean = a => a.reduce((x, y) => x + y, 0) / a.length;
const rows = [];

for (const seed of SEEDS) {
  await p.goto(`${PAGE}?seed=${seed}&warp=${WARP}&t=0.35`);
  await p.waitForTimeout(400);

  const res = await p.evaluate(({ NOON, MORN, DMIN }) => {
    playing = false;                     /* freeze: only dayT will move a pixel */
    const dpr = cvs.width / cvs.clientWidth, g = ctx;
    const sea = window.__deep().filter(c => !c.riv && c.d >= 2);
    const land = window.__find('RES').concat(window.__find('FOREST'), window.__find('PARK'));
    const box = pts => {
      const xs = pts.map(s => s.sx), ys = pts.map(s => s.sy);
      const x0 = Math.max(0, Math.min(...xs) - 8), x1 = Math.min(innerWidth, Math.max(...xs) + 8);
      const y0 = Math.max(0, Math.min(...ys) - 8), y1 = Math.min(innerHeight, Math.max(...ys) + 8);
      return { x: Math.round(x0 * dpr), y: Math.round(y0 * dpr),
               w: Math.round((x1 - x0) * dpr), h: Math.round((y1 - y0) * dpr) };
    };
    const seaB = box(sea), landB = box(land);
    const grab = t => { waveT = 4.0; window.__setTime(t); render();  /* waveT pinned so only glit differs */
      return { sea: Array.from(g.getImageData(seaB.x, seaB.y, seaB.w, seaB.h).data),
               land: Array.from(g.getImageData(landB.x, landB.y, landB.w, landB.h).data) }; };
    const A = grab(NOON), B = grab(MORN);
    const added = (a, bb) => { let n = 0; const len = Math.min(a.length, bb.length);
      for (let i = 0; i < len; i += 4) {
        const am = Math.min(a[i], a[i + 1], a[i + 2]), bm = Math.min(bb[i], bb[i + 1], bb[i + 2]);
        if (am - bm >= DMIN && a[i + 2] >= a[i] - 4) n++;
      } return n; };
    return { sea: added(A.sea, B.sea), land: added(A.land, B.land) };
  }, { NOON, MORN, DMIN });

  rows.push({ seed, ...res });
}
await b.close();

console.log('\nSUN-GLITTER PROBE — noon (glit=1) vs morning (glit=0), same build, clock+waveT frozen');
console.log('pixels the noon frame pushed toward cool white (min-channel +>=' + DMIN + ')\n');
console.log('  seed    sea (glitter)     land (control)');
console.log('  ' + '-'.repeat(40));
for (const r of rows) console.log(`  ${String(r.seed).padEnd(6)}  ${String(r.sea).padStart(10)}     ${String(r.land).padStart(10)}`);
console.log('\n  mean sea = ' + mean(rows.map(r => r.sea)).toFixed(0) +
            '   mean land(control) = ' + mean(rows.map(r => r.land)).toFixed(0));
console.log('  PASS if the sea gains a large glitter and the land control stays ~0.');
