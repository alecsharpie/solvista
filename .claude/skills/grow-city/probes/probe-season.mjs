#!/usr/bin/env node
/* probe-season.mjs — which vegetation actually responds to the calendar?
 *
 * ############################################################################
 * ⚠ THIS PROBE SAMPLES ONE PIXEL PER INSTANCE, AT THE HEX CENTRE (iter 238).
 * Its per-tile numbers are a POINT sample, not an area one, and for any tile
 * whose draw puts something specific at its centre they are actively wrong:
 *   - PARK draws its TREES at grid OFFSETS (tree(gx-0.28,gy-0.05,...)) and its
 *     pond/fountain AT the centre, so this probe is STRUCTURALLY BLIND to a
 *     park's canopy. 238 tripled every deciduous tree's seasonal swing and this
 *     probe reported PARK 20.8 -> 20.9, i.e. unmoved.
 *   - FOREST's trees are dense enough to cover its centre, so the SAME change
 *     read 18.9 -> 27.1 here and "crossed the legibility floor". In area units
 *     it went 16.1 -> 19.5 and is still below it. The floor-crossing was an
 *     artifact of where one pixel landed.
 * Iter 237 fixed this probe's weighting BETWEEN tile types (area-weighting the
 * rows) and left the sample WITHIN a hex at one pixel. Those are two different
 * unit errors and only the first was closed.
 * ⇒ USE probes/probe-seasonarea.mjs FOR ANY AREA / "does the viewer see it"
 *   CLAIM. It samples the hex's whole box, and it also reports what fraction of
 *   each hex a given palette entry actually paints (234's palette-suppression),
 *   which is what says whether a change CAN reach a surface at all.
 * This probe remains useful for one thing: a fast per-type check that a given
 * draw reads `year` AT ALL (a palette no draw reads still shows up here as 0).
 * ############################################################################
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
const PAGE = pathToFileURL(join(HERE, '../../../../solvista.html')).href;

const SEEDS = [7, 42, 1234];
const WARP = 61;
/* applySeason's own keyframes */
const SEASONS = [
  ['winter', 0.02], ['spring', 0.30], ['dry-peak', 0.62], ['autumn', 0.87],
];
const KINDS = ['MEADOW', 'FOREST', 'PARK', 'SHOREPARK', 'FARM', 'FIELD',
               'VINEYARD', 'ORCHARD', 'REDWOOD', 'GARDEN', 'QUAD', 'ROAD'];

/* Legibility floor, in RGB-distance units. NOT a tuned constant: the measured
 * data has a clean gap — every surface a visual agent has ever NAMED as turning
 * (VINEYARD 36, SHOREPARK 53, FARM 103) sits above it, every surface they read
 * as unchanged (QUAD 24, MEADOW 21, PARK 21, FOREST 19, REDWOOD 7) sits below.
 * Any value in 25..35 classifies identically, so the magnitude is not
 * load-bearing (iter 231's rule). It brackets an observation; it is not a bar
 * chosen so the artifact clears it (iter 205). */
const LEGIBLE = 25;

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
console.log('  tile         n   share     ' + SEASONS.map(([s]) => s.padStart(9)).join(''));
console.log('  ' + '-'.repeat(74));

/* The viewer sees AREA, not tile types. A 7-hex MEADOW and a 563-hex PARK get
 * one row each above, so a table that is loud on the small tiles reads as a
 * working calendar while the green mass of the city sits still. Weight by
 * footprint (iter 218: grade a distribution in the units the EYE reads, not
 * the units the RULE is written in). ROAD stays out of the weighting: it is
 * the control, not vegetation. */
const VEG = KINDS.filter(k => k !== 'ROAD');
const vegN = VEG.reduce((s, k) => s + (counts[k] || 0), 0);

for (const k of KINDS) {
  if (!counts[k]) { console.log(`  ${k.padEnd(11)} ${String(0).padStart(4)}   (none on screen)`); continue; }
  const row = SEASONS.map(([s]) => mean(acc[k][s]).toFixed(1).padStart(9)).join('');
  const dry = mean(acc[k]['dry-peak']);
  const share = k === 'ROAD' ? '   -- ' : ((counts[k] / vegN) * 100).toFixed(1).padStart(5) + '%';
  const flag = k === 'ROAD' ? (dry < 2 ? '   <-- control OK' : '   <-- CONTROL MOVED')
             : dry < LEGIBLE ? `   <-- MUTE (< ${LEGIBLE})` : '';
  console.log(`  ${k.padEnd(11)} ${String(counts[k]).padStart(4)}  ${share}   ${row}${flag}`);
}
console.log('\n(ROAD is the control: it must read ~0 in every column.)');

/* AREA-WEIGHTED — the number a viewer's eye actually integrates. */
console.log('\nAREA-WEIGHTED over the ' + vegN + ' vegetated hexes on screen (the VIEWER\'S unit):');
const wrow = SEASONS.map(([s]) => {
  const w = VEG.reduce((sum, k) => sum + mean(acc[k][s]) * (counts[k] || 0), 0);
  return (w / vegN).toFixed(1).padStart(9);
}).join('');
console.log('  ' + 'all veg'.padEnd(11) + ' ' + String(vegN).padStart(4) + '  100.0%   ' + wrow);

/* How much of the green mass is BELOW the legibility floor at the dry peak? */
const mute = VEG.filter(k => counts[k] && mean(acc[k]['dry-peak']) < LEGIBLE);
const muteN = mute.reduce((s, k) => s + counts[k], 0);
console.log(`\n  MUTE AREA at the dry peak (shift < ${LEGIBLE}/441): ` +
            `${muteN} / ${vegN} hexes = ${((muteN / vegN) * 100).toFixed(1)}% of the vegetation`);
console.log('  mute surfaces: ' + (mute.length ? mute.map(k => `${k}(${counts[k]})`).join(' · ') : 'none'));
console.log('\n  The eye integrates AREA. A calendar that is loud on a small tile and mute on');
console.log('  the dominant surface reads as "no season" however good the per-tile table looks.');
