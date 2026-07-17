#!/usr/bin/env node
/* probe-cafehours.mjs — DOES THE SHOPFRONT/KERB CROWD COME IN FROM THE RAIN? (iter 336)
 *
 * The seam. Peds carry umbrellas (drawPed, rainingAt>RAINUMB) and the washing line comes
 * in at the first drops (rainingAt<0.05); the beach and water crowd keep a calendar. But
 * three outdoor commercial-strip draws kept an HOUR and ignored the SHOWER:
 *   - the park café/kiosk patrons (drawCell PARK, gate `LITAMT<0.5`, seated body 1.4x1.6)
 *   - the busker (buskerAt, gate `nightAmt()<buskOut`, standing body 1.8x3.2)
 *   - the busker's evening strip audience (drawBuilding COM, `nightAmt()<stripOut`, 1.6x2.6)
 * They are the un-enumerated siblings of the rain-aware category (271/286 — grep the
 * MECHANISM rainingAt, not the comment's noun list, 280).
 *
 * THE FIX. dryAt(x,y)=rainingAt(x,y)<RAINDRY (0.05), added to all three gates (and the
 * washing line repointed to it — one predicate, N readers, 112). At `rainingAt<RAINDRY`
 * (dry) dryAt is TRUE and each gate collapses to HEAD's condition byte-for-byte — an exact
 * fixed point (245/253): DRY == HEAD, so no HEAD file is needed.
 *
 * Grades the SHIPPED draw in ONE build, ONE world, ONE frame (230/253): stub window.rainingAt
 * (a function declaration -> on window) to 0 (DRY == HEAD) and to 1 (WET, raining everywhere),
 * and count the body fillRects the frame ISSUES by their (w,h) signature. No pixel diff, NO
 * NOISE FLOOR AT ALL. The DELTA (DRY - WET) is the crowd that came in; only these three draws
 * read rain among the body fillRects, so the delta isolates them.
 *
 * MUST-NOT-MOVE CONTROL (250): the kid body (drawPed, 1.2x1.8) keeps a curfew, not the rain,
 * so its count is IDENTICAL dry vs wet — if it moves, the rain stub perturbed the wrong draw.
 *
 * WHAT MUST BE TRUE, per seed, at a pin where the type is OUT:
 *   - DRY count > 0 (the crowd was out), WET count == 0 (it came in).
 *   - kid control IDENTICAL dry vs wet.
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
    __warp(61);                                     /* -> ~2035, mature city: cafés, buskers, strips all present */
    __setYear(2035.62);                             /* the golden dry peak (beachPhase===1) so café patrons are maximal */
    waveT = 5.0;

    const near = (a, b2) => Math.abs(a - b2) < 0.05;
    /* body fillRect signatures (w,h): café patron 1.4x1.6 · busker 1.8x3.2 · strip 1.6x2.6 ·
       kid CONTROL 1.2x1.8 */
    const sig = (w, h) =>
      near(w, 1.4) && near(h, 1.6) ? 'cafe' :
      near(w, 1.8) && near(h, 3.2) ? 'busker' :
      near(w, 1.6) && near(h, 2.6) ? 'strip' :
      near(w, 1.2) && near(h, 1.8) ? 'kid' : null;

    const cap = {};
    const ofr = ctx.fillRect.bind(ctx);
    ctx.fillRect = function (x, y, w, h) {
      const k = sig(w, h);
      if (k) cap[k] = (cap[k] || 0) + 1;
      return ofr(x, y, w, h);
    };
    const realRain = window.rainingAt;
    const count = (dayT, rain) => {
      window.rainingAt = () => rain;
      for (const k in cap) delete cap[k];
      __setTime(dayT); render();
      return { cafe: cap.cafe || 0, busker: cap.busker || 0, strip: cap.strip || 0, kid: cap.kid || 0,
               LITAMT, nightAmt: nightAmt() };
    };

    /* DAY pin (café + busker out) and DUSK pin (strip out) */
    const dayDry = count(0.47, 0), dayWet = count(0.47, 1);
    const duskDry = count(0.82, 0), duskWet = count(0.82, 1);

    window.rainingAt = realRain;
    ctx.fillRect = ofr;
    return { dayDry, dayWet, duskDry, duskWet };
  }, seed);

  rows.push({ seed, ...r });
}
await b.close();

let ok = true, ctrlOK = true;
const line = (tag, d) =>
  `  ${tag.padEnd(9)} LITAMT ${d.LITAMT.toFixed(2)} nightAmt ${d.nightAmt.toFixed(2)}  |  ` +
  `cafe ${String(d.cafe).padStart(3)}  busker ${String(d.busker).padStart(3)}  strip ${String(d.strip).padStart(3)}  |  kid(ctrl) ${d.kid}`;

for (const r of rows) {
  console.log(`SEED ${r.seed}`);
  console.log(line('DAY  dry', r.dayDry));
  console.log(line('DAY  WET', r.dayWet));
  console.log(line('DUSK dry', r.duskDry));
  console.log(line('DUSK WET', r.duskWet));
  /* the DELTA (dry - wet) is the crowd that came in — 285: with a shared fillRect signature
     the rain-independent collision floor cancels, so only the delta is the measurement.
     café/busker measured at the DAY pin (they are out by day), strip at the DUSK pin. */
  const dCafe = r.dayDry.cafe - r.dayWet.cafe;
  const dBusker = r.dayDry.busker - r.dayWet.busker;
  const dStrip = r.duskDry.strip - r.duskWet.strip;
  console.log(`  DELTA (dry-wet, = crowd that came in):  café ${dCafe}  busker ${dBusker}  strip ${dStrip}`);
  if (dCafe <= 0 || dBusker <= 0 || dStrip <= 0) ok = false;
  /* and the residual must be the rain-INDEPENDENT floor: strip WET must equal the DAY frame
     where the strip crowd cannot draw (LITAMT<0.35), proving the strip crowd itself hit 0 */
  if (r.duskWet.strip !== r.dayDry.strip) ok = false;
  /* kid control must not move with the rain */
  if (r.dayDry.kid !== r.dayWet.kid || r.duskDry.kid !== r.duskWet.kid) ctrlOK = false;
  console.log('');
}

console.log('VERDICT');
console.log(`  DELTA dry->wet > 0 for café/busker/strip (crowd came in): ${ok ? 'YES' : '*** NO ***'}`);
console.log(`  kid control IDENTICAL dry vs wet (250):                   ${ctrlOK ? 'YES (must-not-move held)' : '*** MOVED ***'}`);
console.log(`  DRY == HEAD by construction (dryAt≡true collapses each gate — 245/253).`);
console.log(`\n  ${ok && ctrlOK ? 'CAFEHOURS: PASS' : 'CAFEHOURS: FAIL'}`);
