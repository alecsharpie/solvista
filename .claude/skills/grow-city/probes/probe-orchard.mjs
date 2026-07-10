#!/usr/bin/env node
/* probe-orchard.mjs — does the orchard's new "Grove" tooltip row tell the truth?
 *
 * Iter 129 (Nature x Interaction/UX) surfaced 117's tell for the orchard: the
 * DRAW has painted a seasonal blossom/fruit overlay from `year` since iter 57,
 * but describeTile never named it. The new row reads a shared `orchardPhase()`.
 * Per 122's law, a tooltip vector needs a probe that checks the claim against
 * INDEPENDENTLY recomputed truth, not a screenshot that it merely renders. So
 * this checks the row two ways and neither trusts orchardPhase():
 *
 *   (1) String truth — recompute the phase from applySeason's keyframe windows
 *       in this file's OWN math and confirm every orchard's Grove row matches,
 *       at every keyframe, on 3 seeds.
 *   (2) Draw truth — the row must agree with the PIXELS, not just a duplicated
 *       formula. A pale-coral MATCHER is hopeless here (iter 127's law: coral is
 *       shared with autumn foliage warmth, and applySeason warms the WHOLE frame),
 *       so instead measure each tile's crown-box shift from its own winter frame
 *       and SUBTRACT the FOREST control (probe-season's method: forest eats the
 *       same global seasonal warming, so orchard-minus-forest isolates the
 *       blossom/fruit overlay the orchard alone paints). The excess must jump in
 *       the "In blossom" (spring) frame. FOREST also never gets a Grove row.
 *
 *   node probe-orchard.mjs
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
/* applySeason's own keyframes x the phase the WINDOWS (recomputed here, not from
   orchardPhase) put each on: blossom 0.16..0.42, fruit 0.70..0.99, else leaf. */
const FRAMES = [
  ['winter',  0.02, 'In leaf'],
  ['spring',  0.30, 'In blossom'],
  ['dry-peak',0.62, 'In leaf'],
  ['autumn',  0.87, 'In fruit'],
];

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });

let strChecks = 0, strFails = 0, foundGroveOnForest = 0;
/* per frame, mean crown-box RGB distance from the winter frame, orchard & forest */
const shift = {};
for (const [name] of FRAMES) shift[name] = { ORCHARD: [], FOREST: [] };

for (const seed of SEEDS) {
  await p.goto(`${PAGE}?seed=${seed}&warp=${WARP}&t=0.30`);
  await p.waitForTimeout(500);

  const res = await p.evaluate(({ FRAMES }) => {
    playing = false;                     /* freeze: only `year` may move a pixel */
    const dpr = cvs.width / cvs.clientWidth, g = ctx;
    const on = s => s.sx > 40 && s.sx < innerWidth - 40 && s.sy > 40 && s.sy < innerHeight - 40;
    const orch = window.__find('ORCHARD').filter(on).slice(0, 400);
    const wood = window.__find('FOREST').filter(on).slice(0, 400);

    /* mean RGB over a box on the tile's crowns (the season/blossom paint) */
    const box = s => {
      const R = 9, x0 = Math.round((s.sx - R) * dpr), y0 = Math.round((s.sy - R) * dpr);
      const d = g.getImageData(x0, y0, Math.round(2 * R * dpr), Math.round(2 * R * dpr)).data;
      let r = 0, gg = 0, bb = 0, n = 0;
      for (let i = 0; i < d.length; i += 4) { r += d[i]; gg += d[i + 1]; bb += d[i + 2]; n++; }
      return [r / n, gg / n, bb / n];
    };
    /* the Grove row text out of the rendered tooltip, or null if absent */
    const grove = s => {
      const m = describeTile(cells[idx(s.x, s.y)], s.x, s.y)
        .match(/<span>Grove<\/span><b>([^<]+)<\/b>/);
      return m ? m[1] : null;
    };
    /* does a FOREST tile wrongly print a Grove row? */
    const woodGrove = s => /<span>Grove<\/span>/.test(describeTile(cells[idx(s.x, s.y)], s.x, s.y));

    const out = {};
    for (const [name, yfrac] of FRAMES) {
      window.__setYear(2035 + yfrac);
      render();
      out[name] = {
        grove: orch.map(grove),
        boxO: orch.map(box),
        boxF: wood.map(box),
        woodGrove: wood.map(woodGrove),
      };
    }
    return out;
  }, { FRAMES });

  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
  const win = res['winter'];
  for (const [name, , expect] of FRAMES) {
    const r = res[name];
    for (const gv of r.grove) { strChecks++; if (gv !== expect) strFails++; }
    for (const w of r.woodGrove) if (w) foundGroveOnForest++;
    for (let i = 0; i < r.boxO.length; i++) shift[name].ORCHARD.push(dist(r.boxO[i], win.boxO[i]));
    for (let i = 0; i < r.boxF.length; i++) shift[name].FOREST.push(dist(r.boxF[i], win.boxF[i]));
  }
}
await b.close();

const mean = a => a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0;

console.log('\n(1) STRING TRUTH — tooltip Grove row vs independently recomputed phase windows');
console.log(`    seeds 7/42/1234 x 4 keyframes: ${strChecks - strFails}/${strChecks} orchard rows match, `
  + `${strFails} wrong`);
console.log(`    control: FOREST tiles printing a Grove row: ${foundGroveOnForest} (must be 0)\n`);

console.log('(2) DRAW TRUTH — crown-box RGB shift from winter (clock frozen); ORCHARD minus FOREST');
console.log('    control isolates the overlay the orchard alone paints (blossom in spring, fruit in autumn)');
console.log('    frame       expect        orchardΔ   forestΔ   excess (=overlay)');
console.log('    ' + '-'.repeat(64));
for (const [name, , expect] of FRAMES) {
  if (name === 'winter') continue;
  const o = mean(shift[name].ORCHARD), f = mean(shift[name].FOREST);
  console.log(`    ${name.padEnd(10)} ${expect.padEnd(12)} `
    + `${o.toFixed(2).padStart(8)} ${f.toFixed(2).padStart(9)} ${(o - f).toFixed(2).padStart(13)}`);
}
console.log('\n    Pass iff: string 100% match, 0 Grove on FOREST, and a clear positive excess in');
console.log('    the "In blossom" (spring) frame — the orchard shifts beyond the shared season.\n');
