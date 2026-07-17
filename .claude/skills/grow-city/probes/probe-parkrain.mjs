#!/usr/bin/env node
/* probe-parkrain.mjs — DO THE DAYTIME PARK CROWDS COME IN FROM THE RAIN? (iter 337)
 *
 * The seam. 336 brought the shopfront/kerb crowd in from a shower (café patrons, busker,
 * strip audience) on a shared dryAt(x,y)=rainingAt(x,y)<RAINDRY, and wrote into the header
 * that "the rain-aware category's last visible siblings are enumerated." It was not: two of
 * the clearest outdoor DAYTIME crowds, in the SAME draw code, still sat through the downpour —
 *   - the park PICNICKERS  (drawCell PARK v<0.44, gate `LITAMT<0.5 && hashCell<beachPhase()`,
 *     blanket fillRect 5.2x2.6) — twenty lines below the café patrons 336 DID fix
 *   - the pickup BALLGAME   (drawCell FIELD, gate `pitchGame(x,y)>0 && LITAMT<0.5`,
 *     player fillRect 1.6x2.4) — pitchGame is read by the draw AND the tooltip (pitchWord)
 * This is 262/286's cliff: fix one member of a category, leave the sibling in the same
 * function.
 *
 * THE FIX. dryAt added to the picnic gate; and folded INTO pitchGame (one predicate, both the
 * draw and the tooltip — 112/123) so the tooltip cannot claim "a game is on" over an empty
 * rained-off pitch. At `rainingAt<RAINDRY` (dry) dryAt is TRUE and each gate collapses to
 * HEAD's condition byte-for-byte — an exact fixed point (245/253): DRY == HEAD, no HEAD file.
 *
 * Grades the SHIPPED draw in ONE build, ONE world, ONE frame (230/253): stub window.rainingAt
 * (a function declaration -> on window) to 0 (DRY == HEAD) and to 1 (WET, raining everywhere),
 * and count the body fillRects the frame ISSUES by their (w,h) signature. No pixel diff, NO
 * NOISE FLOOR AT ALL. The DELTA (DRY - WET) is the crowd that came in.
 *
 * MUST-NOT-MOVE CONTROL (250): the kid body (drawPed, 1.2x1.8) keeps a curfew, not the rain,
 * so its count is IDENTICAL dry vs wet — if it moves, the rain stub perturbed the wrong draw.
 *
 * WHAT MUST BE TRUE, per seed, at an afternoon pin where both are out:
 *   - DRY count > 0 (they were out), WET count == 0 (they came in).
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
    __warp(61);                                     /* -> ~2035, a mature city */
    __setYear(2035.62);                             /* the golden dry peak (beachPhase===1) so picnics are maximal */
    waveT = 5.0;

    const near = (a, b2) => Math.abs(a - b2) < 0.05;
    /* body fillRect signatures (w,h): picnic blanket 5.2x2.6 · pitch player 1.6x2.4 ·
       kid CONTROL 1.2x1.8 */
    const sig = (w, h) =>
      near(w, 5.2) && near(h, 2.6) ? 'picnic' :
      near(w, 1.6) && near(h, 2.4) ? 'pitch' :
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
      return { picnic: cap.picnic || 0, pitch: cap.pitch || 0, kid: cap.kid || 0, LITAMT };
    };

    /* AFTERNOON pin: LITAMT<0.5 (picnic + game are day-only) and inside the kickoff window
       (PITCHKO 0.52 .. +PITCHDUR 0.22), so the ballgame is at full strength. */
    const dry = count(0.60, 0), wet = count(0.60, 1);

    window.rainingAt = realRain;
    ctx.fillRect = ofr;
    return { dry, wet };
  }, seed);

  rows.push({ seed, ...r });
}
await b.close();

let ok = true, ctrlOK = true;
const line = (tag, d) =>
  `  ${tag.padEnd(9)} LITAMT ${d.LITAMT.toFixed(2)}  |  ` +
  `picnic ${String(d.picnic).padStart(3)}  pitch ${String(d.pitch).padStart(3)}  |  kid(ctrl) ${d.kid}`;

for (const r of rows) {
  console.log(`SEED ${r.seed}`);
  console.log(line('DRY', r.dry));
  console.log(line('WET', r.wet));
  const dPic = r.dry.picnic - r.wet.picnic;
  const dPit = r.dry.pitch - r.wet.pitch;
  console.log(`  DELTA (dry-wet, = crowd that came in):  picnic ${dPic}  pitch ${dPit}`);
  /* both must go fully to 0 in the rain (no rain-independent collision on these signatures) */
  if (dPic <= 0 || dPit <= 0 || r.wet.picnic !== 0 || r.wet.pitch !== 0) ok = false;
  if (r.dry.kid !== r.wet.kid) ctrlOK = false;
  console.log('');
}

console.log('VERDICT');
console.log(`  DELTA dry->wet > 0 & WET==0 for picnic/pitch (crowd came in): ${ok ? 'YES' : '*** NO ***'}`);
console.log(`  kid control IDENTICAL dry vs wet (250):                       ${ctrlOK ? 'YES (must-not-move held)' : '*** MOVED ***'}`);
console.log(`  DRY == HEAD by construction (dryAt≡true collapses each gate — 245/253).`);
console.log(`\n  ${ok && ctrlOK ? 'PARKRAIN: PASS' : 'PARKRAIN: FAIL'}`);
