/* iter 300 — does the neon evening crowd THIN through the small hours, one strip at a
   time, or stand identical all night on the global LITAMT cliff?
   TEMPORAL (134): every other gate here is frozen, so a claim about CADENCE has no
   instrument. Reads NO PIXELS (counts the strip cells the draw's own gate admits, per
   hour), so it has no noise floor at all. BUILD-AGNOSTIC: it detects `stripOut` and falls
   back to HEAD's gate, so ONE file grades HEAD and the patch (SRC=) with no cross-build
   floor (230). Positive control = __buskers (a mechanism I did NOT touch, so it must vary
   in BOTH builds — proves the clock sweep is live, 248). Must-not-move = the HOST count
   (COM strip cells) and the whole DAY (nightAmt 0 ⇒ crowd 0), byte-identical (199/250). */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright/index.mjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = process.env.SRC || join(HERE, '../../../../solvista.html');
const SEEDS = [42, 7];
const YEAR = 2035.62;                 /* golden dry peak; season fixed */
/* the lit-night span, dayT 0.60..1.0 then 0.0..0.15 — sample densely */
const PINS = [];
for (let t = 0.60; t < 1.0; t += 0.02) PINS.push(+t.toFixed(3));
for (let t = 0.00; t <= 0.16; t += 0.02) PINS.push(+t.toFixed(3));

const browser = await chromium.launch();
for (const seed of SEEDS) {
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.addInitScript(() => { let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
  await page.goto('file://' + SRC);
  await page.waitForFunction(() => typeof genWorld === 'function' && typeof render === 'function');
  const rows = await page.evaluate(({ seed, year, pins }) => {
    playing = false;
    genWorld(seed); __warp(61);   /* build a mature city (~1974 -> 2035) */
    __setYear(year);
    const hasStrip = typeof stripOut === 'function';
    const crowdCount = () => {
      let n = 0;
      for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
        const c = cells[idx(x, y)];
        if (!c || c.t !== T.COM || !(c.v > 0.6)) continue;
        if (!(LITAMT > 0.35)) continue;
        if (hasStrip && !(nightAmt() < stripOut(x, y))) continue;
        n++;
      }
      return n;
    };
    /* host: every COM strip cell, hour-independent — must match HEAD/patch */
    let host = 0;
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)]; if (c && c.t === T.COM && c.v > 0.6) host++;
    }
    const out = [];
    for (const t of pins) {
      __setTime(t); render();
      out.push({ t, lit: +LITAMT.toFixed(3), na: +nightAmt().toFixed(3),
                 crowd: crowdCount(), busk: __buskers() });
    }
    /* daytime dead-regime control */
    __setTime(0.45); render(); const dayCrowd = crowdCount();
    return { hasStrip, host, dayCrowd, out };
  }, { seed, year: YEAR, pins: PINS });

  const lit = rows.out.filter(r => r.lit > 0.35);
  const crowds = lit.map(r => r.crowd);
  const busks = lit.map(r => r.busk);
  const evening = Math.max(...crowds);           /* dusk peak */
  const small = Math.min(...crowds);             /* small-hours trough */
  const distinct = new Set(crowds).size;
  const bdistinct = new Set(busks).size;
  console.log(`\n=== seed ${seed}  (${rows.hasStrip ? 'PATCH' : 'HEAD'}) ===`);
  console.log(`  HOST (COM strip cells, hour-independent, must-not-move): ${rows.host}`);
  console.log(`  DAY crowd (nightAmt 0, dead-regime, must be 0): ${rows.dayCrowd}`);
  console.log(`  CROWD across the lit night: evening peak ${evening} -> small-hours ${small}` +
              `  (thins to ${(100 * small / evening).toFixed(0)}% of peak)`);
  console.log(`  DISTINCT CROWD COUNTS = ${distinct}   <- headline: HEAD is 1 (the cliff), patch >> 1`);
  console.log(`  BUSKER control (untouched, must vary in BOTH builds): DISTINCT = ${bdistinct}` +
              `  (${Math.max(...busks)} -> ${Math.min(...busks)})`);
  /* a compact night curve */
  console.log('  na>crowd:  ' + lit.filter((_, i) => i % 3 === 0)
    .map(r => `na${r.na.toFixed(2)}=${r.crowd}`).join(' '));
  await page.close();
}
await browser.close();
