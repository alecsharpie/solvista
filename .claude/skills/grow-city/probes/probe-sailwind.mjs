#!/usr/bin/env node
/* probe-sailwind.mjs — DOES THE SAIL FILL WITH THE WIND? (iter 334)
 *
 * The seam. Every gusting thing over the coast rides WINDA — the trees/palms sway on
 * windForce, the flags flap, the clouds/smoke/kites lean +x. The pleasure sailboats were
 * JUST enumerated into waterSession for their HOURS (286: "the last board and the last BOAT
 * off the water together"). But a comment enumerates who was FIXED, not who should READ
 * (280) — and the SAIL, the definitional wind-reader, was still a flat static triangle
 * (drawBoat, fillStyle col('white',1.05), a straight leech masthead->clew at +x). Grep the
 * MECHANISM (windForce), not the reader-list, and the sail is the un-enumerated member.
 *
 * THE FIX. The leech bows leeward (+x, the same way the clouds/smoke lean) by belly =
 * 4.5*windForce(), drawn as a quadratic whose control sits on the chord midpoint at a dead
 * calm (belly==0 -> HEAD's straight taut triangle byte-for-byte, an exact fixed point, 245)
 * and bows fuller as the wind picks up.
 *
 * This grades the SHIPPED draw in ONE build (230): no source swap, no cross-build floor. It
 * hooks ctx.quadraticCurveTo and reads the belly straight off the geometry — the sail's
 * control is (cx+2.25+belly), its clew end is (cx+4.5), so belly = control.x - end.x + 2.25,
 * a per-render number with NO pixel diff and NO NOISE FLOOR AT ALL. The sail's signature is
 * unique: at a dead calm belly==0 exactly (control on the chord), and between calm and gale
 * the control moves +x while the clew end stays put. Render the SAME frozen day/summer/clear
 * frame at CALM and GALE and the sails out themselves.
 *
 * WHAT MUST BE TRUE:
 *  - CALM (windForce 0): belly == 0 exactly for every sail — HEAD's straight leech, the
 *    must-not-move fixed point (245/250).
 *  - GALE (windForce 1): belly == 4.5 for every sail (the leech bows a fixed amount leeward),
 *    and gale.belly > calm.belly (the sail fills as the wind rises).
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
    __warp(61);                                     /* -> ~2035, mature city, boats present */
    __setYear(2035.62);                             /* dry peak -> beachPhase high, boats out */
    __setTime(0.5);                                 /* noon -> waterSession ~1, sailing boats out */
    window.rainFront = () => 0;                     /* force clear: no rain shaft quadratics to confuse */
    time = 5.0; waveT = 5.0;                         /* frozen clock -> deterministic bob */

    /* capture every quadraticCurveTo (control x/y, end x/y). The sail's signature is unique:
       control on the chord at calm, control moving +x while the end stays put at gale. */
    const cap = [];
    const oq = ctx.quadraticCurveTo.bind(ctx);
    ctx.quadraticCurveTo = function (cpx, cpy, x, y) {
      cap.push({ cpx, cpy, ex: x, ey: y });
      return oq(cpx, cpy, x, y);
    };
    const grab = (w) => { cap.length = 0; __setWind(w); render(); return cap.map((q) => ({ ...q })); };

    const calm = grab(0.25);                         /* windForce 0 -> belly must be 0 */
    const gale = grab(1.0);                          /* windForce 1 -> belly 4.5 */
    ctx.quadraticCurveTo = oq;

    return { calm, gale };
  }, seed);

  rows.push({ seed, ...r });
}
await b.close();

/* a quadratic is a SAIL iff calm belly == 0 (control on chord) AND the control moves +x
   between calm and gale while the clew end stays fixed. belly = control.x - end.x + 2.25. */
const f = (n) => (n >= 0 ? ' ' : '') + n.toFixed(3);
let calmOK = true, galeOK = true, any = false;

for (const r of rows) {
  const sails = [];
  const n = Math.min(r.calm.length, r.gale.length);
  for (let i = 0; i < n; i++) {
    const c = r.calm[i], g = r.gale[i];
    if (Math.abs(c.ex - g.ex) > 0.001 || Math.abs(c.ey - g.ey) > 0.001) continue; /* end must be fixed */
    const bellyC = c.cpx - c.ex + 2.25;
    const bellyG = g.cpx - g.ex + 2.25;
    if (Math.abs(bellyC) < 1e-6 && bellyG - bellyC > 0.1) sails.push({ bellyC, bellyG });
  }
  console.log(`SEED ${r.seed}  (${sails.length} sail${sails.length === 1 ? '' : 's'} on screen)`);
  console.log('  sail |  calm.belly   gale.belly   fill?');
  console.log('  -----+----------------------------------');
  for (let k = 0; k < sails.length; k++) {
    any = true;
    const s = sails[k];
    if (Math.abs(s.bellyC) > 1e-6) calmOK = false;
    if (Math.abs(s.bellyG - 4.5) > 1e-3) galeOK = false;
    console.log(`  ${String(k + 1).padStart(4)} | ${f(s.bellyC).padStart(9)}   ${f(s.bellyG).padStart(9)}   ${s.bellyG > s.bellyC ? 'YES' : '*NO*'}`);
  }
  console.log('');
}

console.log('VERDICT');
console.log(`  CALM belly == 0 (HEAD's straight leech, fixed point):  ${calmOK ? 'EXACT (0 px)' : '*** DRIFTED ***'}`);
console.log(`  GALE belly == 4.5 (leech bows a full sail leeward):    ${galeOK ? 'YES' : '*** OFF ***'}`);
console.log(`  at least one sail measured:                            ${any ? 'YES' : '*** NONE ***'}`);
console.log(`\n  ${calmOK && galeOK && any ? 'SAILWIND: PASS' : 'SAILWIND: FAIL'}`);
