#!/usr/bin/env node
/* probe-surfsession.mjs — DOES THE LINEUP EVER GO HOME, AND CAN ANYONE SEE IT IF IT DOES?
 *
 * `drawSurfer` (L7622) opens with no gate at all:
 *
 *     function drawSurfer(s){
 *       const[cx,cy]=pxc(seaXF(s.y,s.off),s.y);
 *
 * Nine surfers are spawned once in genWorld and drawn on EVERY frame of the artifact's
 * life. Every other person in Solvista keeps an hour — the residents (curfewAt, 210),
 * the children (kidOut, 262), the joggers (j.out, 210), the traffic (VCURF, 230), the
 * stadium crowd (matchClock, 240) — and 247 taught the SAND a calendar (beachPhase), so
 * in winter the umbrellas and deckchairs pack away. The water crowd learned neither: at
 * 3am in midwinter, nine people are still sitting in the break off an empty beach.
 *
 * This is 262's law one scope wider. 262 says: after you fix a per-entity rule, grep the
 * FUNCTION you fixed for the other things it draws. The surfer is not in drawPed — so
 * grep every draw that puts a PERSON on the plate and ask which of them keeps state.
 *
 * ⚠ AND THE POINT OF RUNNING THIS *BEFORE* DESIGNING (259): a feature can be perfectly
 * real and still be dead as a LOOK. If the night lineup renders 20px of dark ink on a
 * dark sea, then taking it away is a change nobody can see, and the HOURS half of this
 * vector is a nothing — leaving only the SEASON half, which lands in BROAD DAYLIGHT
 * where the surfers provably render. Part B decides that, and it decides it before a
 * line of the fix exists.
 *
 * PART A — TEMPORAL (134), and it reads NO PIXELS, so it has no noise floor at all.
 *   Every other gate this loop owns is frozen; "they never go home" is a claim about
 *   cadence and cannot be photographed. HEAD's answer is a CONSTANT by construction, so
 *   `DISTINCT LINEUP SIZES = 1` IS the defect, stated, with no threshold invented (236).
 *
 *   THE POSITIVE CONTROL (248) IS THE JOGGER, and it is the whole reason to believe a
 *   flat surfer column. A jogger is a correct sibling — a Math.random-spawned person on
 *   the same shoreline, drawn two functions away, who provably keeps an hour on the very
 *   clock the surfer ignores. If the joggers do NOT thin across the night, the probe is
 *   broken and the city is innocent.
 *   THE MUST-NOT-MOVE COLUMN (250) IS THE KAYAKS + BOATS: this is a people vector, so
 *   the boats must ride through it untouched. A count going DOWN needs something
 *   required to stay UP.
 *
 * PART B — THE VIEWER'S UNITS (205). Isolated by suppressing `drawSurfer` INSIDE ONE
 *   PAGE (226/230) and re-rendering: the changed pixels ARE the lineup, off the final
 *   composited canvas, so occlusion is measured for free and the floor is EXACTLY 0.
 *   BUILD-AGNOSTIC — the mask comes from the build's own render, so this same file grades
 *   HEAD and the patch with no source swap and no cross-build floor (230/197).
 *   Reported as ink AND as ink-per-surfer, at four pins: noon, dusk, deep night, and a
 *   WINTER NOON (the frame where the season half must pay out).
 *
 * ⚠ Surfers are Math.random-spawned on purpose ("the lineup never perturbs the seeded
 *   simulation"), so the PRNG is stubbed in addInitScript (213) — before the page's own
 *   script, or the lineup differs on every load.
 */
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = existsSync(join(HERE, 'solvista.html')) ? join(HERE, 'solvista.html')
                                                     : join(HERE, '../../../../solvista.html');
const SRC = process.env.SRC || ROOT;
const PAGE = pathToFileURL(SRC).href;

const SEEDS = [7, 42, 1234];
const WARP = 61;                 /* 2035 */
const DRYPEAK = 2035.62, WINTER = 2035.02;

console.log(`\nartifact: ${SRC}\n`);

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
await p.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await p.goto(PAGE);
await p.waitForFunction(() => typeof window.__warp === 'function');

/* ─── PART A ── temporal: does the lineup ever thin? ─────────────────────────── */
console.log('PART A — the day sweep (no pixels, no noise floor).  DRYPEAK, 2035');
console.log('        surfers ON / 9   |  joggers ON (POSITIVE CONTROL: must thin)  |  kayaks+boats (MUST NOT MOVE)');

const A = [];
for (const seed of SEEDS) {
  const r = await p.evaluate(({ seed, warp, year }) => {
    playing = false;
    genWorld(seed); __warp(warp); __setYear(year);

    const hasNew = typeof waterSession === 'function';
    /* build-agnostic: the patch's OWN predicate if it exists, else HEAD's (no gate at all).
       This is the shipped rule, not a re-implementation of it (249). */
    const surferOn = s => hasNew ? !(waterSession() < waterOut(s)) : true;

    const pins = [];
    for (let t = 0; t < 1; t += 0.01) pins.push(Math.round(t * 1000) / 1000);

    const rows = [];
    for (const t of pins) {
      __setTime(t); render();
      const surf = surfers.filter(surferOn).length;
      const jog = joggers.filter(j => !(nightAmt() > j.out)).length;
      rows.push({ t, surf, jog, night: nightAmt(), lit: LITAMT });
    }
    return {
      hasNew,
      surfers: surfers.length, joggers: joggers.length,
      movers: kayaks.length + boats.length,
      distinctSurf: new Set(rows.map(r => r.surf)).size,
      distinctJog: new Set(rows.map(r => r.jog)).size,
      minSurf: Math.min(...rows.map(r => r.surf)), maxSurf: Math.max(...rows.map(r => r.surf)),
      minJog: Math.min(...rows.map(r => r.jog)), maxJog: Math.max(...rows.map(r => r.jog)),
      /* the deepest-night pin: how many are still out when the city is asleep? */
      darkSurf: rows.reduce((a, r) => (r.night > a.night ? r : a), rows[0]).surf,
      darkJog: rows.reduce((a, r) => (r.night > a.night ? r : a), rows[0]).jog,
    };
  }, { seed, warp: WARP, year: DRYPEAK });
  A.push({ seed, ...r });
  console.log(`  seed ${String(seed).padStart(4)}  surf ${r.minSurf}..${r.maxSurf} of ${r.surfers} `
    + `(DISTINCT ${r.distinctSurf}, in the dark ${r.darkSurf})  |  `
    + `jog ${r.minJog}..${r.maxJog} of ${r.joggers} (DISTINCT ${r.distinctJog}, in the dark ${r.darkJog})  |  `
    + `kayaks+boats ${r.movers}`);
}
console.log(`  build: ${A[0].hasNew ? 'PATCH (waterSession present)' : 'HEAD (no gate)'}`);

/* ─── PART A2 ── the season sweep ────────────────────────────────────────────── */
console.log('\nPART A2 — the season sweep at NOON (the hour the surfers are provably visible)');
console.log('        beachPhase() is the sand\'s own calendar (247). Does the water read it?');
for (const seed of SEEDS) {
  const r = await p.evaluate(({ seed, warp }) => {
    playing = false;
    genWorld(seed); __warp(warp);
    const hasNew = typeof waterSession === 'function';
    const surferOn = s => hasNew ? !(waterSession() < waterOut(s)) : true;
    const out = [];
    for (const [name, yr] of [['winter', 2035.02], ['spring', 2035.30], ['dry peak', 2035.62], ['autumn', 2035.87]]) {
      __setYear(yr); __setTime(0.415); render();
      out.push({ name, n: surfers.filter(surferOn).length, beach: Math.round(beachPhase() * 100) / 100 });
    }
    /* THE FIXED POINT (245): at the dry peak, in daylight, the session is exactly 1 and
       every board is out — so the patch runs HEAD's draw, byte-for-byte, at that pin.
       Arithmetic, not a claim: no threshold, no second build, no cross-build floor. */
    __setYear(2035.62); __setTime(0.415); render();
    const sess = hasNew ? waterSession() : 1;
    return { out, surfers: surfers.length, sess, allOut: surfers.filter(surferOn).length };
  }, { seed, warp: WARP });
  console.log(`  seed ${String(seed).padStart(4)}  ` + r.out.map(o => `${o.name} ${o.n}/${r.surfers} (beachPhase ${o.beach})`).join('  |  '));
  console.log(`            FIXED POINT  dry-peak noon: waterSession()=${r.sess}  -> ${r.allOut}/${r.surfers} out `
    + `${r.sess === 1 && r.allOut === r.surfers ? '✅ byte-identical to HEAD at this pin' : '❌ the lever is not centred'}`);
}

/* ─── PART B ── can anyone SEE the lineup? ───────────────────────────────────── */
console.log('\nPART B — the lineup in the VIEWER\'S units: ink, isolated by suppressing drawSurfer');
console.log('        in ONE page (floor exactly 0, occlusion free, build-agnostic).');
console.log('        pin                     ink px   px/surfer   drawn');

for (const seed of SEEDS) {
  const r = await p.evaluate(({ seed, warp }) => {
    playing = false;
    genWorld(seed); __warp(warp);
    const c = document.querySelector('canvas'), g = c.getContext('2d');
    const grab = () => g.getImageData(0, 0, c.width, c.height).data;
    const diff = (a, b2) => { let n = 0; for (let i = 0; i < a.length; i += 4) {
      const d = Math.max(Math.abs(a[i] - b2[i]), Math.abs(a[i + 1] - b2[i + 1]), Math.abs(a[i + 2] - b2[i + 2]));
      if (d > 8) n++; } return n; };

    const real = window.drawSurfer;
    const hasNew = typeof waterSession === 'function';
    /* ⚠ count what actually RENDERS, not what gets CALLED: the call site invokes
       drawSurfer for all 9 every frame and the gate returns early inside it, so a
       wrapper that increments on entry reports 9/9 at midnight (236 — a caption in the
       rule's units, not the viewer's). Ask the shipped predicate instead. */
    const surferOn = s => hasNew ? !(waterSession() < waterOut(s)) : true;

    const pins = [
      ['noon      (dry peak)', 2035.62, 0.415],
      ['dusk      (dry peak)', 2035.62, 0.760],
      ['deep night(dry peak)', 2035.62, 0.920],
      ['NOON      (WINTER)  ', 2035.02, 0.415],
    ];
    const out = [];
    for (const [name, yr, t] of pins) {
      __setYear(yr); __setTime(t);
      render(); const A0 = grab();
      const drawn = surfers.filter(surferOn).length;
      window.drawSurfer = () => {};          /* suppress: the diff IS the lineup */
      render(); const B0 = grab();
      window.drawSurfer = real;
      out.push({ name, ink: diff(A0, B0), drawn, night: Math.round(nightAmt() * 100) / 100 });
    }
    /* the floor: two identical renders, same page, same frozen world */
    __setYear(2035.62); __setTime(0.415);
    render(); const F1 = grab(); render(); const F2 = grab();
    return { out, floor: diff(F1, F2), surfers: surfers.length, hasNew };
  }, { seed, warp: WARP });

  console.log(`  seed ${seed}  (floor ${r.floor} px)`);
  for (const o of r.out) {
    const per = o.drawn ? (o.ink / o.drawn).toFixed(1) : '—';
    console.log(`    ${o.name}   ${String(o.ink).padStart(6)}   ${String(per).padStart(7)}   ${o.drawn}/${r.surfers}`);
  }
}

/* ─── PART C ── the FIXED POINT, proved in pixels (253) ──────────────────────── */
console.log('\nPART C — the fixed point, by PREDICATE SUPPRESSION inside ONE page (253).');
console.log('        HEAD has no gate, so HEAD === "waterSession() is always 1". Force that on the');
console.log('        patch and re-render: if the shipped frame equals it, the patch RUNS HEAD\'S DRAW.');
console.log('        No source swap, no cross-build floor (230) — the zero is exact or it is not.');
console.log('        pin                     patch vs forced-1     verdict');
for (const seed of SEEDS) {
  const r = await p.evaluate(({ seed, warp }) => {
    playing = false;
    genWorld(seed); __warp(warp);
    const c = document.querySelector('canvas'), g = c.getContext('2d');
    const grab = () => g.getImageData(0, 0, c.width, c.height).data;
    const diff = (a, b2) => { let n = 0; for (let i = 0; i < a.length; i += 4) {
      const d = Math.max(Math.abs(a[i] - b2[i]), Math.abs(a[i + 1] - b2[i + 1]), Math.abs(a[i + 2] - b2[i + 2]));
      if (d > 0) n++; } return n; };
    const real = window.waterSession;
    const out = [];
    /* dry-peak noon IS the fixed point; deep night is the CONTROL that must NOT be 0 —
       the builds have to actually diverge somewhere, or a broken suppression would read
       "0 px" everywhere and I would call that a pass (196's positive control). */
    for (const [name, yr, t] of [['dry-peak noon (FIXED PT)', 2035.62, 0.415],
                                 ['deep night   (CONTROL) ', 2035.62, 0.920]]) {
      __setYear(yr); __setTime(t);
      render(); const A0 = grab();
      window.waterSession = () => 1;            /* = HEAD: no gate, every board out */
      render(); const B0 = grab();
      window.waterSession = real;
      out.push({ name, px: diff(A0, B0) });
    }
    return out;
  }, { seed, warp: WARP });
  console.log(`  seed ${String(seed).padStart(4)}`);
  for (const o of r) {
    const ok = o.name.includes('FIXED') ? (o.px === 0 ? '✅ EXACT — patch runs HEAD\'s draw' : '❌ not centred')
                                        : (o.px > 0 ? '✅ the builds DO diverge here' : '❌ suppression is dead');
    console.log(`    ${o.name}   ${String(o.px).padStart(8)} px      ${ok}`);
  }
}

await b.close();
console.log('');
