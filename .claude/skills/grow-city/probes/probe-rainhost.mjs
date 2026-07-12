/* probe-rainhost — DOES THIS VECTOR HAVE A HOST AT SCALE?
   Before wiring "the outdoor life shelters from the shower", measure the shower's
   actual GROUND footprint (the damp-patch ellipse the cloud already draws) and
   count how many outdoor-life host hexes fall inside it, across seeds and across
   the shower's whole traverse of the plate.
   A vector whose host is 0.3 hexes per shower is dead (the dead-code law). */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const FILE = [resolve(HERE, 'solvista.html'), resolve(HERE, '../../../../solvista.html')].find(existsSync);

const SEEDS = [7, 42, 1234];
const b = await chromium.launch();
const pg = await b.newPage({ viewport: { width: 1400, height: 900 } });
pg.on('pageerror', e => console.log('PAGE ERROR', e.message));

for (const seed of SEEDS) {
  await pg.goto('file://' + FILE + '?seed=' + seed + '&warp=61');
  await pg.waitForTimeout(600);

  const r = await pg.evaluate(() => {
    playing = false;
    // the shower's ground footprint, exactly as the damp patch draws it (L6313-6321)
    const foot = cl => {
      const [cx, cy] = pxc(cl.x, cl.y);
      const py2 = cy - 185 - cy * 0.52;
      const rlean = (cy - (py2 + 6 * cl.s)) * (0.06 + 0.08 * WINDA);
      const R = 48 * cl.s;
      return { ex: cx - rlean * 0.55, ey: cy + 1, rx: R, ry: 0.30 * R };
    };
    const inFoot = (f, x, y) => {
      const dx = (x - f.ex) / f.rx, dy = (y - f.ey) / f.ry;
      return dx * dx + dy * dy;
    };
    const rainers = clouds.filter(c => c.rain);
    // sweep each rain cloud across its whole traverse and tally hosts covered.
    // cells carry NO x/y — index HEXI (the live-cell list) and derive them.
    const HOST = { BEACH: T.BEACH, PARK: T.PARK, SHOREPARK: T.SHOREPARK, QUAD: T.QUAD, PLAZA: T.PLAZA };
    const saveX = rainers.map(c => c.x);
    let tot = {}, frames = 0, everCovered = new Set();
    for (let step = 0; step < 40; step++) {
      rainers.forEach(c => { c.x = -6 + (step / 39) * (G + 12); });
      frames++;
      for (const cl of rainers) {
        const f = foot(cl);
        for (const i of HEXI) {
          const c = cells[i];
          if (!c || c.t === T.VOID) continue;
          const gx = i % G, gy = (i / G) | 0;
          const [px, py] = ctr(gx, gy);
          if (inFoot(f, px, py) <= 1) {
            const nm = Object.keys(HOST).find(k => HOST[k] === c.t);
            if (nm) { tot[nm] = (tot[nm] || 0) + 1; everCovered.add(nm + ':' + gx + ',' + gy); }
            tot.ALL = (tot.ALL || 0) + 1;
          }
        }
      }
    }
    rainers.forEach((c, i) => { c.x = saveX[i]; });
    // per-frame-per-cloud averages
    const per = {};
    const denom = frames * Math.max(1, rainers.length);
    for (const k of Object.keys(tot)) per[k] = +(tot[k] / denom).toFixed(2);
    return { nClouds: clouds.length, nRain: rainers.length, per, distinctHosts: everCovered.size };
  });

  console.log(`seed ${String(seed).padEnd(5)} clouds=${r.nClouds} rain=${r.nRain}` +
    `  | per shower-frame: ALL=${r.per.ALL || 0} hexes` +
    `  BEACH=${r.per.BEACH||0} PARK=${r.per.PARK||0} SHOREPARK=${r.per.SHOREPARK||0} QUAD=${r.per.QUAD||0} PLAZA=${r.per.PLAZA||0}` +
    `  | distinct host hexes ever wetted: ${r.distinctHosts}`);
}
await b.close();
