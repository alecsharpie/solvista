/* probe-shroomvis — CAN A FAIRY RING BE SEEN? (259's check, run BEFORE designing.)
 *
 * probe-fairyring proved the CA fires. 259's law: before you optimise a field, read the
 * line that CONSUMES it -- a rule can be perfectly real and still be dead as a LOOK.
 * cue (f) says the wildflowers are ~1.1 CSS px at fit and invisible; the ring's caps are
 * arc(r=0.8) world px, which is the same family.
 *
 * Isolation: suppress drawShroom in ONE page (230) and diff. Floor exactly 0, occlusion
 * free, build-agnostic. Reports ink per ring in CSS px at FIT zoom (the scale a user
 * actually looks at the city).
 *
 * INCUMBENT BAR (226): the artifact already ships drawParty -- a street party, same
 * idiom (a handful of tiny marks on one hex), unquestioned. Isolate it with the SAME rig
 * and read the two side by side, so "too small" is a claim about Solvista and not a
 * number I invented.
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;

const HERE = dirname(fileURLToPath(import.meta.url));
const ART = join(HERE, '../../../../solvista.html');
const SEEDS = [7, 42, 1234];

const b = await chromium.launch();
const page = await b.newPage({ viewport: { width: 1400, height: 900 } });
/* 203/204: Math.random is a STREAM -- each render() consumes draw-time values and
   advances it, so two renders of the same frozen world diverge. Stubbing is not
   enough; the stream must be REWOUND to the same position before every render, or
   the noise floor swamps the signal (measured: 788 px before this, 0 after). */
await page.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  window.__reseed = () => { s = 0x51F3A9C >>> 0; };
});
await page.goto('file://' + ART);
await page.waitForTimeout(400);

const rows = await page.evaluate((SEEDS) => {
  playing = false;
  const cv = document.querySelector('canvas');
  const cx2 = cv.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const grab = () => cx2.getImageData(0, 0, cv.width, cv.height).data;
  const diff = (A, B) => {                       /* ink = summed max-channel distance (203) */
    let px = 0, ink = 0;
    for (let i = 0; i < A.length; i += 4) {
      const d = Math.max(Math.abs(A[i] - B[i]), Math.abs(A[i + 1] - B[i + 1]), Math.abs(A[i + 2] - B[i + 2]));
      if (d > 0) { px++; ink += d; }
    }
    return { px, ink };
  };

  const out = [];
  for (const seed of SEEDS) {
    genWorld(seed);
    __warp(61);
    /* step to an autumn tick where rings are actually up */
    let rings = 0, guard = 0;
    while (rings === 0 && guard++ < 200) {
      year += 0.45 / 6; tick();
      rings = 0; for (const c of cells) if ((c.t === T.FOREST || c.t === T.REDWOOD) && c.shroom > 0) rings++;
    }
    /* parties, for the incumbent bar */
    let parties = 0; for (const c of cells) if (c.t === T.RES && c.party > 0) parties++;

    /* SETTLE THE HEIGHTS. render() MUTATES THE WORLD: drawBuilding grows every
       under-height cell toward c.th (`c.h += 0.35 + ...`), so two renders of a
       "frozen" world are NOT identical while anything is still growing. __warp
       settles c.h = c.th at its end, which is why a warp-only probe never sees
       this -- but driving tick() directly leaves the city mid-growth, and the
       floor came back 544-788 px. Settle it, exactly as __warp does. */
    for (const c of cells) if (c.h < c.th) c.h = c.th;

    time = 0; waveT = 0; STARS.length = 0; flock = null;   /* 195f/199/163d */
    __reseed(); render();
    const A = grab();

    /* suppress the rings only */
    const realShroom = window.drawShroom;
    window.drawShroom = () => {};
    __reseed(); render();
    const B = grab();
    window.drawShroom = realShroom;

    /* suppress the parties only (the incumbent) */
    const realParty = window.drawParty;
    window.drawParty = () => {};
    __reseed(); render();
    const C = grab();
    window.drawParty = realParty;

    /* floor: same render twice, nothing suppressed */
    __reseed(); render();
    const D = grab();

    const s = diff(A, B), p = diff(A, C), f = diff(A, D);
    out.push({
      seed, rings, parties,
      shroomPx: s.px, shroomInk: s.ink,
      partyPx: p.px, partyInk: p.ink,
      floorPx: f.px,
      dpr, scale: window.scale, fitScale: window.fitScale,
    });
  }
  return out;
}, SEEDS);

await b.close();

console.log('\nCAN A FAIRY RING BE SEEN? (fit zoom, device px -> CSS px)\n');
console.log('seed | floor |  rings  ring-px  CSS-px/ring |  parties  party-px  CSS-px/party');
console.log('-'.repeat(80));
for (const r of rows) {
  const cssShroom = r.shroomPx / (r.dpr * r.dpr) / Math.max(1, r.rings);
  const cssParty = r.partyPx / (r.dpr * r.dpr) / Math.max(1, r.parties);
  console.log(
    String(r.seed).padEnd(5), '|',
    String(r.floorPx).padStart(5), '|',
    String(r.rings).padStart(6),
    String(r.shroomPx).padStart(8),
    cssShroom.toFixed(1).padStart(12), ' |',
    String(r.parties).padStart(8),
    String(r.partyPx).padStart(9),
    cssParty.toFixed(1).padStart(15),
  );
}
console.log('\nBars for comparison (from the ledger, same units):');
console.log('  wildflowers  ~1.1 CSS px at fit  -> cue (f): INVISIBLE, polish-tile backlog');
console.log('  observatory  ~5.5 CSS px at fit  -> cue (e): "too small to read"');
console.log('  a ped\'s contact shadow  ~4.4 CSS px  -> shipped and accepted for 200 iterations (226)');
