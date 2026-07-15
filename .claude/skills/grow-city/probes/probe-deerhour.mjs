/* iter 301 — do the deer keep an hour (bed down in the trees at nightfall, one head at a
   time), or graze the meadow edge identically all night on NO gate at all?
   TEMPORAL (134): every other gate here is frozen, so a claim about CADENCE has no
   instrument. Reads NO PIXELS for the headline (counts the deer the draw's own gate admits,
   per hour) ⇒ no noise floor. BUILD-AGNOSTIC: detects `deerSession` and falls back to HEAD's
   "always drawn", so ONE file grades HEAD and the patch (SRC=) with no cross-build floor (230).
   Positive control = SURFERS (waterOut, a proven hour I did NOT touch ⇒ must vary in BOTH
   builds, so the sweep is live, 248/271). Must-not-move = the HOST count (deer spawned) and
   the whole DAY (nightAmt 0 ⇒ every deer out), byte-identical (199/250).
   259 CHECK: are deer even VISIBLE at deep night? Force all out, diff against deer-emptied. */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright/index.mjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = process.env.SRC || join(HERE, '../../../../solvista.html');
const SEEDS = [42, 7];
const YEAR = 2035.62;
const PINS = [];
for (let t = 0.58; t < 1.0; t += 0.02) PINS.push(+t.toFixed(3));
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
    genWorld(seed); __warp(61);
    __setYear(year);
    const hasDeer = typeof deerSession === 'function';
    const deerCount = () => {
      if (!hasDeer) return deer.length;               /* HEAD: no gate, all drawn */
      const s = deerSession(); let n = 0;
      for (const d of deer) if (s >= d.ph / 7) n++;
      return n;
    };
    const surfCount = () => {                          /* positive control (untouched) */
      const s = waterSession(); let n = 0;
      for (const q of surfers) if (s >= waterOut(q)) n++;
      return n;
    };
    const host = deer.length;
    const out = [];
    for (const t of pins) {
      __setTime(t); render();
      out.push({ t, na: +nightAmt().toFixed(3), deer: deerCount(), surf: surfCount() });
    }
    __setTime(0.45); render(); const dayDeer = deerCount();
    /* 259: deer ink at a deep-night pin — force all out, diff against deer emptied */
    __setTime(0.92);
    if (hasDeer) deerSession = () => 1;               /* force every deer out */
    render();
    const A = ctx.getImageData(0, 0, cvs.width, cvs.height).data;
    const keep = deer.slice(); deer.length = 0;
    render();
    const B = ctx.getImageData(0, 0, cvs.width, cvs.height).data;
    deer.push(...keep);
    let ink = 0;
    for (let i = 0; i < A.length; i += 4)
      if (Math.abs(A[i] - B[i]) + Math.abs(A[i+1] - B[i+1]) + Math.abs(A[i+2] - B[i+2]) > 12) ink++;
    return { hasDeer, host, dayDeer, nightInk: ink, out };
  }, { seed, year: YEAR, pins: PINS });

  const ds = rows.out.map(r => r.deer), ss = rows.out.map(r => r.surf);
  const distinct = new Set(ds).size;
  console.log(`\n=== seed ${seed} · ${rows.hasDeer ? 'PATCH' : 'HEAD'} · deer spawned ${rows.host} ===`);
  console.log(` DEER thru the lit night: [${ds.join(',')}]  DISTINCT=${distinct}  (day control ${rows.dayDeer})`);
  console.log(` SURF (positive control): [${ss.join(',')}]  DISTINCT=${new Set(ss).size}`);
  console.log(` 259 deer ink at deep night (dayT .92, all forced out): ${rows.nightInk} px`);
  console.log(' na  → deer/surf: ' + rows.out.filter((_,i)=>i%3===0).map(r=>`${r.na}:${r.deer}/${r.surf}`).join('  '));
  await page.close();
}
await browser.close();
