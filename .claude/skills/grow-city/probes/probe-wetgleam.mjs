#!/usr/bin/env node
/* probe-wetgleam.mjs — DO THE NIGHT STREET-LAMPS MIRROR DOWN THE WET TARMAC? (iter 341)
 *
 * The seam. The arterial spine + ordinary streets draw warm light pools at night
 * (drawCell ROAD, gate `LITAMT>0.25`), but they gleamed identically wet or dry — the wet
 * street reflection (the reason a rainy city night reads luminous, the land analog of
 * 329's waterfront-reflects-the-skyline) was missing. It is an un-enumerated reader of the
 * rain MECHANISM (rainingAt), like the café/washing-line crowd 336 brought in (280 — grep
 * the mechanism, not the comment's noun list).
 *
 * THE FIX. When rainingAt(x,y)>0 the lamp draws one extra warm radial-gradient smear,
 * vertically stretched toward the viewer (a LONG mark survives the downscale, 266). At
 * rainingAt===0 (the dry majority) the `if(wetg>0)` block is skipped, so a dry frame draws
 * HEAD's exact bytes — an exact fixed point (245/253): DRY == HEAD, no HEAD file needed.
 *
 * Grades the SHIPPED draw in ONE build, ONE world, ONE frame (230/253). It hooks the
 * artifact's own createRadialGradient/fill and counts, by colour signature, the OBJECTS the
 * frame ISSUES — no pixel diff, NO NOISE FLOOR AT ALL, build-agnostic:
 *   - GLEAM  = radial gradients whose first stop is the smear's warm colour (rgba(255,214,150
 *              arterial / rgba(255,206,138 ordinary) — unique to this draw as a GRADIENT.
 *   - LAMP HEAD (must-not-move, 250 + positive control) = the solid lamp-head fills
 *              (rgba(255,226,152 arterial / rgba(255,198,108 ordinary) — both unique). The
 *              heads do NOT read rain, so their count must be IDENTICAL dry vs wet AND > 0
 *              (proving the frame IS a lit night city; a dead frame would give gleam 0 too).
 *
 * WHAT MUST BE TRUE, per seed, at a night pin (lamps on):
 *   - gleam DRY == 0 (the fixed point: block skipped, HEAD path), gleam WET >> 0 (it fires).
 *   - lamp-head count IDENTICAL dry vs wet, and > 0 (must-not-move + positive control).
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const { chromium } = await import(
  join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.mjs')
);

const SRC = process.env.SRC || join(HERE, '../../../../solvista.html');
const PAGE = pathToFileURL(SRC).href;
const SEEDS = [7, 42, 1234];

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
await p.addInitScript(() => {                       /* 213: stub the PRNG before the page's script */
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});

console.log(`SRC = ${SRC}\n`);

const rows = [];
for (const seed of SEEDS) {
  await p.goto(`${PAGE}?seed=${seed}`);
  await p.waitForTimeout(200);

  const r = await p.evaluate((seed) => {
    playing = false;
    genWorld(seed);
    __warp(61);                                     /* -> ~2035, mature developed city: lit arterials everywhere */
    __setYear(2035.62);
    time = 0; waveT = 5.0;
    if (typeof flock !== 'undefined') flock = null; /* 199 */
    if (typeof STARS !== 'undefined') STARS.length = 0; /* 163 */

    /* tag gleam gradients: wrap createRadialGradient so its addColorStop records its 1st colour */
    const GLEAM = /^rgba\(255,214,150|^rgba\(255,206,138/;   /* the smear's two warm colours */
    const HEADC = /^rgba\(255,226,152|^rgba\(255,198,108/;   /* the two solid lamp-head colours */
    const ocg = ctx.createRadialGradient.bind(ctx);
    ctx.createRadialGradient = function (...a) {
      const g = ocg(...a);
      const oas = g.addColorStop.bind(g);
      g.addColorStop = function (o, c) { if (o === 0 && GLEAM.test(c)) g.__gleam = true; return oas(o, c); };
      return g;
    };
    const cap = { gleam: 0, head: 0 };
    const ofill = ctx.fill.bind(ctx);
    ctx.fill = function (...a) {
      const fs = ctx.fillStyle;   /* 273: Chromium canonicalises fillStyle on read (adds spaces) -> strip them */
      if (fs && typeof fs === 'object' && fs.__gleam) cap.gleam++;
      else if (typeof fs === 'string' && HEADC.test(fs.replace(/\s/g, ''))) cap.head++;
      return ofill(...a);
    };

    const count = (dayT, rain) => {
      window.rainingAt = () => rain;
      cap.gleam = 0; cap.head = 0;
      __setTime(dayT); render();
      return { gleam: cap.gleam, head: cap.head, LITAMT };
    };

    /* a night pin (lamps on, LITAMT high). dayT 0.92 = deep night, well past LITAMT>0.25. */
    const dry = count(0.92, 0), wet = count(0.92, 1);

    ctx.fill = ofill; ctx.createRadialGradient = ocg;
    return { dry, wet };
  }, seed);

  rows.push({ seed, ...r });
}
await b.close();

let ok = true, ctrlOK = true;
for (const r of rows) {
  console.log(`SEED ${r.seed}   (LITAMT ${r.dry.LITAMT.toFixed(2)})`);
  console.log(`  DRY (rainingAt=0):  gleam ${String(r.dry.gleam).padStart(4)}   lampHead(ctrl) ${r.dry.head}`);
  console.log(`  WET (rainingAt=1):  gleam ${String(r.wet.gleam).padStart(4)}   lampHead(ctrl) ${r.wet.head}`);
  console.log(`  DELTA gleam dry->wet: ${r.wet.gleam - r.dry.gleam}`);
  if (!(r.dry.gleam === 0 && r.wet.gleam > 0)) ok = false;   /* fixed point + fires */
  if (!(r.dry.head === r.wet.head && r.dry.head > 0)) ctrlOK = false; /* must-not-move + positive */
  console.log('');
}

console.log('VERDICT');
console.log(`  gleam DRY==0 (fixed point, 245/253) & WET>0 (it fires), all seeds:  ${ok ? 'YES' : '*** NO ***'}`);
console.log(`  lamp-head IDENTICAL dry vs wet & >0 (must-not-move 250 + positive):  ${ctrlOK ? 'YES' : '*** MOVED / DEAD FRAME ***'}`);
console.log(`\n  ${ok && ctrlOK ? 'WETGLEAM: PASS' : 'WETGLEAM: FAIL'}`);
