/* iter 303 — do the estuary herons keep an hour (fly to roost at nightfall, one bird at a
   time), or stalk the marsh identically all night on NO gate at all? The 9th recursion of the
   262 cliff, hiding in the DEER lap's own control list (301 cited the heron as untouched, 286).
   TEMPORAL (134): every other gate here is frozen, so a claim about CADENCE has no instrument.
   Reads NO PIXELS for the headline (counts the herons the draw's own gate admits, per hour) ⇒ no
   noise floor. BUILD-AGNOSTIC: detects `heronSession` and falls back to HEAD's "always drawn", so
   ONE file grades HEAD and the patch (SRC=) with no cross-build floor (230). Positive control =
   SURFERS (waterOut, a proven hour I did NOT touch ⇒ must vary in BOTH builds, so the sweep is
   live, 248/271). Must-not-move = the HOST count (herons spawned) and the whole DAY (nightAmt 0 ⇒
   every heron out), byte-identical (199/250).
   259 CHECK: are herons even VISIBLE at deep night? Force all out, diff against herons-emptied.
   NOTE: herons need an estuary marsh, so a seed with no marsh spawns 0 (correctly) — pick seeds
   that actually have herons. */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright/index.mjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = process.env.SRC || join(HERE, '../../../../solvista.html');
const SEEDS = (process.env.SEEDS || '42,1234').split(',').map(Number);
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
    const hasHeron = typeof heronSession === 'function';
    const heronCount = () => {
      if (!hasHeron) return herons.length;             /* HEAD: no gate, all drawn */
      const s = heronSession(); let n = 0;
      for (const h of herons) if (s >= h.ph / 7) n++;
      return n;
    };
    const surfCount = () => {                          /* positive control (untouched) */
      const s = waterSession(); let n = 0;
      for (const q of surfers) if (s >= waterOut(q)) n++;
      return n;
    };
    const host = herons.length;
    const out = [];
    for (const t of pins) {
      __setTime(t); render();
      out.push({ t, na: +nightAmt().toFixed(3), heron: heronCount(), surf: surfCount() });
    }
    __setTime(0.45); render(); const dayHeron = heronCount();
    /* 259: heron ink at a deep-night pin — force all out, diff against herons emptied */
    __setTime(0.92);
    if (hasHeron) heronSession = () => 1;              /* force every heron out */
    render();
    const A = ctx.getImageData(0, 0, cvs.width, cvs.height).data;
    const keep = herons.slice(); herons.length = 0;
    render();
    const B = ctx.getImageData(0, 0, cvs.width, cvs.height).data;
    herons.push(...keep);
    let ink = 0;
    for (let i = 0; i < A.length; i += 4)
      if (Math.abs(A[i] - B[i]) + Math.abs(A[i+1] - B[i+1]) + Math.abs(A[i+2] - B[i+2]) > 12) ink++;
    return { hasHeron, host, dayHeron, nightInk: ink, out };
  }, { seed, year: YEAR, pins: PINS });

  const hs = rows.out.map(r => r.heron), ss = rows.out.map(r => r.surf);
  const distinct = new Set(hs).size;
  console.log(`\n=== seed ${seed} · ${rows.hasHeron ? 'PATCH' : 'HEAD'} · herons spawned ${rows.host} ===`);
  if (rows.host === 0) { console.log(' (no estuary marsh on this seed — 0 herons, correctly; vacuous)'); await page.close(); continue; }
  console.log(` HERON thru the lit night: [${hs.join(',')}]  DISTINCT=${distinct}  (day control ${rows.dayHeron})`);
  console.log(` SURF (positive control):  [${ss.join(',')}]  DISTINCT=${new Set(ss).size}`);
  console.log(` 259 heron ink at deep night (dayT .92, all forced out): ${rows.nightInk} px`);
  console.log(' na  → heron/surf: ' + rows.out.filter((_,i)=>i%3===0).map(r=>`${r.na}:${r.heron}/${r.surf}`).join('  '));
  await page.close();
}
await browser.close();
