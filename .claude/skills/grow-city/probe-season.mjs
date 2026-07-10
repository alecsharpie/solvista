#!/usr/bin/env node
/* probe-season.mjs — which vegetation actually responds to the calendar?
 *
 * Iter 120's holistic step-back: a visual agent claimed the golden dry peak
 * reads as "blighted brown patches in a green city" — i.e. the season stops at
 * the farm boundary. The BASE comments say otherwise (parks are *deliberately*
 * irrigated, evergreens *deliberately* sit it out), so this is a question for a
 * pixel probe, not for eyes.
 *
 * Method: freeze the clock (playing=false) so nothing but `year` can move a
 * pixel — iter 109's same-frame law, where "frame" means the instant. Then for
 * each vegetation tile type, sample the RENDERED pixel at every instance's
 * centre at each seasonal keyframe, and report the mean distance from winter.
 * That measures the draw, not the palette: a BASE color that no draw reads
 * would show up here as zero.
 *
 *   node probe-season.mjs
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(join(HERE, '../../../solvista.html')).href;

const SEEDS = [7, 42, 1234];
const WARP = 61;
/* applySeason's own keyframes */
const SEASONS = [
  ['winter', 0.02], ['spring', 0.30], ['dry-peak', 0.62], ['autumn', 0.87],
];
const KINDS = ['MEADOW', 'FOREST', 'PARK', 'SHOREPARK', 'FARM', 'FIELD',
               'VINEYARD', 'ORCHARD', 'REDWOOD', 'GARDEN', 'QUAD', 'ROAD'];

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
const acc = {}; /* kind -> season -> [dists] */
const counts = {};

for (const seed of SEEDS) {
  await p.goto(`${PAGE}?seed=${seed}&warp=${WARP}&t=0.30`);
  await p.waitForTimeout(500);

  const res = await p.evaluate(({ KINDS, SEASONS }) => {
    playing = false;                       /* freeze: only `year` may move a pixel */
    const dpr = cvs.width / cvs.clientWidth;
    const g = ctx;

    /* tile centres, once — geometry does not depend on season */
    const sites = {};
    for (const k of KINDS) sites[k] = window.__find(k)
      .filter(s => s.sx > 40 && s.sx < innerWidth - 40 && s.sy > 40 && s.sy < innerHeight - 40)
      .slice(0, 400);

    const sample = () => {
      const out = {};
      for (const k of KINDS) {
        out[k] = sites[k].map(s => {
          const d = g.getImageData(Math.round(s.sx * dpr), Math.round(s.sy * dpr), 1, 1).data;
          return [d[0], d[1], d[2]];
        });
      }
      return out;
    };

    const byS = {};
    for (const [name, yfrac] of SEASONS) {
      window.__setYear(2035 + yfrac);
      render();                            /* applySeason() runs at top of render */
      byS[name] = sample();
    }
    const n = {}; for (const k of KINDS) n[k] = sites[k].length;
    return { byS, n };
  }, { KINDS, SEASONS });

  for (const k of KINDS) {
    counts[k] = (counts[k] || 0) + res.n[k];
    acc[k] = acc[k] || {};
    const w = res.byS['winter'][k];
    for (const [name] of SEASONS) {
      const s = res.byS[name][k];
      acc[k][name] = acc[k][name] || [];
      for (let i = 0; i < s.length; i++) {
        const dr = s[i][0] - w[i][0], dg = s[i][1] - w[i][1], db = s[i][2] - w[i][2];
        acc[k][name].push(Math.sqrt(dr * dr + dg * dg + db * db));
      }
    }
  }
}
await b.close();

const mean = a => a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0;

console.log('\nRENDERED-PIXEL DISTANCE FROM WINTER, mean over instances (RGB euclidean, 0-441)');
console.log('sampled at tile centres, clock frozen, seeds 7/42/1234, warp 61, t=0.30\n');
console.log('  tile         n     ' + SEASONS.map(([s]) => s.padStart(9)).join(''));
console.log('  ' + '-'.repeat(66));
for (const k of KINDS) {
  if (!counts[k]) { console.log(`  ${k.padEnd(11)} ${String(0).padStart(4)}   (none on screen)`); continue; }
  const row = SEASONS.map(([s]) => mean(acc[k][s]).toFixed(1).padStart(9)).join('');
  const dry = mean(acc[k]['dry-peak']);
  const flag = dry < 2 ? '   <-- DEAD to the dry season' : '';
  console.log(`  ${k.padEnd(11)} ${String(counts[k]).padStart(4)}   ${row}${flag}`);
}
console.log('\n(ROAD is the control: it must read ~0 in every column.)');
