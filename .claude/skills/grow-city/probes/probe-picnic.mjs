#!/usr/bin/env node
/* probe-picnic.mjs — do picnickers appear on park lawns by day and vanish at night?
 *
 * Iter 127 adds an open picnic-lawn band to PARK (v in [0.32,0.44)): a coral/lav
 * checkered blanket + basket + two seated figures, drawn only when LITAMT<0.5.
 * The census is vacuous for a draw-only change, so this is the gate.
 *
 * Method: freeze the clock (iter 109's same-frame law) so only the DAY/NIGHT
 * light term can move a pixel. For every PARK tile on screen, count blanket-
 * palette pixels (coral / lav) in a box over its lower half, by day and by night.
 * A picnic tile lights up by day; at night it drops to ~0 (the band draws nothing).
 * ROAD is the control — it has no coral/lav and must read ~0 in both frames.
 *
 *   node probe-picnic.mjs
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(join(HERE, 'solvista.html')).href;

const SEEDS = [7, 42, 1234];
const WARP = 61;
const THRESH = 5; /* min blanket-palette px in a box to call the tile "has a picnic" */

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });

console.log('\nPICNICKERS ON PARK LAWNS — LAV blanket px (unique colour), clock frozen');
console.log('seeds 7/42/1234, warp 61, box = tile lower half\n');
console.log('  seed   PARK n   park LAV: day -> night     FOREST control: day / night');
console.log('  ' + '-'.repeat(72));

let pd = 0, pn = 0, cd = 0, cn = 0;
for (const seed of SEEDS) {
  await p.goto(`${PAGE}?seed=${seed}&warp=${WARP}&t=0.30`);
  await p.waitForTimeout(500);

  const r = await p.evaluate(() => {
    playing = false;
    const dpr = cvs.width / cvs.clientWidth;
    const g = ctx;
    const onScreen = s => s.sx > 40 && s.sx < innerWidth - 40 && s.sy > 40 && s.sy < innerHeight - 40;
    const parks = window.__find('PARK').filter(onScreen);
    /* FOREST is the control: no lav anywhere in its draw, no vehicles. */
    const ctrl = window.__find('FOREST').filter(onScreen).slice(0, parks.length);

    /* LAV [178,148,198] is the signal, because it is UNIQUE: no roof (terra /
       coral / cream / sage), body (cream / terra / sandDk), car or road tone is
       lav, so it cannot be confused with a coral building roof the way plain
       coral can. Half the blankets are lav. Daylight desaturates it to a muted
       mauve (~[192,168,184]): B ~+14 over G, R above G, B high. Window-lights use
       lav but are night-only and tiny, so DAY lav in a park box = blanket only. */
    const isLav = (r, gr, bl) => bl > 150 && bl > gr + 11 && r > gr + 8 && r > 150 && r < 225;

    const boxLav = s => {
      const x0 = Math.round((s.sx - 2) * dpr), y0 = Math.round((s.sy + 0) * dpr);
      const w = Math.round(10 * dpr), h = Math.round(7 * dpr); /* lower half: where the blanket sits */
      const d = g.getImageData(x0, y0, w, h).data;
      let n = 0;
      for (let i = 0; i < d.length; i += 4) if (isLav(d[i], d[i + 1], d[i + 2])) n++;
      return n;
    };
    const sum = a => a.reduce((x, y) => x + y, 0);

    window.__setTime(0.30); render();
    const parkDay = sum(parks.map(boxLav)), ctrlDay = sum(ctrl.map(boxLav));
    window.__setTime(0.90); render();
    const parkNight = sum(parks.map(boxLav)), ctrlNight = sum(ctrl.map(boxLav));
    return { nParks: parks.length, parkDay, parkNight, ctrlDay, ctrlNight };
  });

  pd += r.parkDay; pn += r.parkNight; cd += r.ctrlDay; cn += r.ctrlNight;
  console.log(`  ${String(seed).padEnd(6)} ${String(r.nParks).padStart(6)}   ${(r.parkDay + ' -> ' + r.parkNight).padStart(19)}   ${(r.ctrlDay + ' / ' + r.ctrlNight).padStart(24)}`);
}
await b.close();

console.log('\n  ' + '-'.repeat(72));
console.log(`  TOTAL park LAV px: day ${pd} -> night ${pn}   |   FOREST control: day ${cd} / night ${cn}`);
console.log('  PASS if park day >> park night (~0) and FOREST control ~= 0 in both (lav = picnic only).');
