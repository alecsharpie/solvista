#!/usr/bin/env node
/* probe-vinetip — does the vineyard's new "Vines" tooltip row tell the truth?
 *
 * Iter 148 (Nature × Interaction/UX) cashes the tell banked by 139: the VINEYARD
 * draw has kept a seasonal calendar since 139 (bare canes → leaf → green berries →
 * purple harvest, via a shared vinePhase()), but describeTile never named it. The
 * new row reads that same vinePhase(). Per 122's law a tooltip vector needs a probe
 * that checks the claim against INDEPENDENTLY recomputed truth, not a screenshot
 * that it merely renders. The seasonal DRAW is already gated by 139's probe-vine;
 * what is NEW here is the string, so this checks the string two ways:
 *
 *   (1) String truth — recompute the phase from vinePhase's OWN window math in this
 *       file (not by calling vinePhase()) and confirm every vineyard's Vines row
 *       matches, at every keyframe, on 3 seeds.
 *   (2) Control — a FARM and an ORCHARD tile (the other two agriculture tiles) must
 *       NEVER print a Vines row; the ORCHARD must still print its own Grove row.
 *
 *   node probe-vinetip.mjs
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
/* the four keyframes x the phase vinePhase's WINDOWS (recomputed here, not from
   vinePhase) put each on: dormant <0.16||>=0.99, bud <0.45, veraison <0.72, ripe. */
const word = s2 => (s2 < 0.16 || s2 >= 0.99) ? 'Bare canes'
  : s2 < 0.45 ? 'In leaf' : s2 < 0.72 ? 'Green fruit' : 'Ripe for harvest';
const FRAMES = [
  ['winter',   0.02],
  ['spring',   0.30],
  ['dry-peak', 0.62],
  ['autumn',   0.87],
];

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });

let strChecks = 0, strFails = 0, vinesOnFarm = 0, vinesOnOrchard = 0, groveOnOrchard = 0, orchardSeen = 0;

for (const seed of SEEDS) {
  await p.goto(`${PAGE}?seed=${seed}&warp=${WARP}&t=0.30`);
  await p.waitForTimeout(500);

  const res = await p.evaluate(({ FRAMES }) => {
    playing = false;                     /* freeze: only `year` may move a pixel */
    const on = s => s.sx > 40 && s.sx < innerWidth - 40 && s.sy > 40 && s.sy < innerHeight - 40;
    const vine = window.__find('VINEYARD').filter(on).slice(0, 400);
    const farm = window.__find('FARM').filter(on).slice(0, 400);
    const orch = window.__find('ORCHARD').filter(on).slice(0, 400);
    const row = (s, label) => {
      const m = describeTile(cells[idx(s.x, s.y)], s.x, s.y)
        .match(new RegExp('<span>' + label + '</span><b>([^<]+)</b>'));
      return m ? m[1] : null;
    };
    const out = {};
    for (const [name, yfrac] of FRAMES) {
      window.__setYear(2035 + yfrac);
      out[name] = {
        vines:       vine.map(s => row(s, 'Vines')),
        vinesFarm:   farm.map(s => row(s, 'Vines')),
        vinesOrch:   orch.map(s => row(s, 'Vines')),
        groveOrch:   orch.map(s => row(s, 'Grove')),
      };
    }
    return out;
  }, { FRAMES });

  for (const [name, yfrac] of FRAMES) {
    const s2 = ((yfrac % 1) + 1) % 1, expect = word(s2), r = res[name];
    for (const v of r.vines) { strChecks++; if (v !== expect) strFails++; }
    for (const v of r.vinesFarm) if (v) vinesOnFarm++;
    for (const v of r.vinesOrch) if (v) vinesOnOrchard++;
    for (const v of r.groveOrch) { orchardSeen++; if (v) groveOnOrchard++; }
  }
}
await b.close();

console.log('\n(1) STRING TRUTH — tooltip Vines row vs independently recomputed vinePhase windows');
console.log(`    seeds 7/42/1234 x 4 keyframes: ${strChecks - strFails}/${strChecks} vineyard rows match, `
  + `${strFails} wrong`);
console.log('\n(2) CONTROL — the row is confined to the vineyard, and does not clobber the orchard');
console.log(`    FARM tiles printing a Vines row:    ${vinesOnFarm} (must be 0)`);
console.log(`    ORCHARD tiles printing a Vines row: ${vinesOnOrchard} (must be 0)`);
console.log(`    ORCHARD tiles still printing Grove: ${groveOnOrchard}/${orchardSeen} (unchanged by this lap)\n`);
console.log('    Pass iff: string 100% match, 0 Vines on FARM/ORCHARD, Grove still on every orchard.\n');
