#!/usr/bin/env node
/* probe-kidbed.mjs — DOES THE CITY LOSE ITS CHILDREN ALL AT ONCE?
 *
 * `drawPed` draws a resident, and beside ~18% of them it draws a child:
 *
 *     if(p.kid && LITAMT<0.5){        // a little one skips alongside; home by dark
 *
 * The PARENT, one line above, is hidden by `pedHidden(p) = nightAmt() > p.out` — the
 * per-resident curfew iter 210 built, whose whole point (its own comment) is that a
 * crowd must thin "one door at a time" rather than blink out in a single frame:
 *
 *     the old rule was one shared threshold flipped by a uniform coin ... it tested
 *     LITAMT, which the light curve PINS at 1.0 from dayT 0.86 to dawn ... half the
 *     city blinked out in a single frame at dusk
 *
 * The child is still on that old gate. `LITAMT` is GLOBAL and monotone through dusk,
 * so the threshold `LITAMT < 0.5` fires for EVERY child in the city in the SAME FRAME.
 * 199 taught the windows to go to bed, 210 the residents and the joggers, 230 the
 * traffic — each replacing exactly this gate with a per-entity hour. The child is the
 * third recursion and the last one, drawn inside the very function 210 fixed.
 *
 * THE BASELINE IS FREE AND EXACT (236): when the vector is "make X vary", HEAD's answer
 * is a CONSTANT by construction, so `DISTINCT CHILD BEDTIMES = 1` is an unarguable
 * defect statement with no threshold invented. A count of 1 against ~20 children means
 * they all leave together.
 *
 * TEMPORAL, because every other gate this loop owns is FROZEN (134): a claim about
 * *cadence* — "they go one at a time" — cannot be photographed. It reads NO PIXELS, so
 * it has no noise floor at all; the only clock is the one it pins itself.
 *
 * BUILD-AGNOSTIC: it asks the page whether `kidHidden` exists and falls back to HEAD's
 * literal gate, so the SAME file grades HEAD and the patch — no source swap, no
 * cross-build floor (230), no 197-class stale-backup hazard.
 *
 * THE COLUMNS THAT MUST NOT MOVE (250 — a vector whose purpose is to take something
 * away needs a must-not-move column beside the must-go one, or a dead instrument and a
 * working feature print the same zeros):
 *   ADULTS   — the parents' curfew is untouched, so their bedtimes must be IDENTICAL
 *              across builds. They are also the POSITIVE CONTROL (248): a correct
 *              sibling mechanism in the same function. If the adults read 1 distinct
 *              bedtime, the probe is broken, not the city.
 *   NOON     — nightAmt() is 0 all day, so every child must be out at noon on BOTH
 *              builds. The free dead-regime control (199).
 *   PRESENT  — the child population itself must not change. This is a bedtime vector,
 *              not a spawn vector: if `children` moves, I have perturbed the stream.
 *
 * AND THE INVARIANT THE FIX IS FOR: a child goes in NO LATER THAN its parent. On the
 * patch that is true BY CONSTRUCTION (223 — a drift you make impossible beats one you
 * agree to look for), and this prints the violation count so the construction is
 * checkable rather than merely asserted.
 */
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
/* resolved relative to the probe's OWN location, never an absolute path, and it works
   from the repo root (where an ad-hoc probe is born) and from probes/ (where it lands) */
const ROOT = existsSync(join(HERE, 'solvista.html')) ? join(HERE, 'solvista.html')
                                                     : join(HERE, '../../../../solvista.html');
const SRC = process.env.SRC || ROOT;
const PAGE = pathToFileURL(SRC).href;

const SEEDS = [7, 42, 1234];
const WARP = 61;              /* 2035: the mature city, where the crowd is biggest */
const STEP = 0.002;           /* dayT pins across the evening */

console.log(`\nartifact: ${SRC}`);

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
/* 213: stub the PRNG before the page's own script, or every Math.random-seeded entity
   (peds' `kid` and `out` among them) differs on every load and the builds are not
   comparable. My change draws NO new Math.random, so both builds see the same stream —
   the same residents, with the same children and the same hours. */
await p.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await p.goto(PAGE);
await p.waitForFunction(() => typeof window.__warp === 'function');

const rows = [];
for (const seed of SEEDS) {
  const r = await p.evaluate(({ seed, warp, step }) => {
    playing = false;
    genWorld(seed); __warp(warp);

    /* build-agnostic: the patch's predicate if it exists, else HEAD's literal gate */
    const hasNew = typeof kidHidden === 'function';
    const kidOn = pp => hasNew ? !kidHidden(pp) : LITAMT < 0.5;

    const pin = t => { __setTime(t); render(); };

    /* the swept evening: dusk -> the small hours -> dawn */
    const pins = [];
    for (let t = 0.50; t < 1.0; t += step) pins.push(t);
    for (let t = 0.0; t < 0.25; t += step) pins.push(t);

    const kids = peds.map((pp, i) => ({ i, pp })).filter(o => o.pp.kid > 0);
    const bed = new Map();      /* kid index -> nightAmt at which it left */
    const cause = new Map();    /* 'kid' | 'parent' */
    let maxDrop = 0, prevVis = null, startVis = 0;

    /* noon control: nightAmt() is 0 all day, so every child must be out */
    pin(0.415);
    const noonKids = kids.filter(o => kidOn(o.pp) && !pedHidden(o.pp)).length;
    const noonNight = nightAmt();

    for (const t of pins) {
      pin(t);
      const n = nightAmt();
      const vis = new Set();
      for (const o of kids) {
        const parentOut = pedHidden(o.pp);
        const on = !parentOut && kidOn(o.pp);
        if (on) vis.add(o.i);
        else if (!bed.has(o.i) && prevVis && prevVis.has(o.i)) {
          bed.set(o.i, n);
          cause.set(o.i, parentOut ? 'parent' : 'kid');
        }
      }
      if (prevVis === null) startVis = vis.size;
      else maxDrop = Math.max(maxDrop, prevVis.size - vis.size);
      prevVis = vis;
    }

    const beds = [...bed.values()];
    const q = v => Math.round(v * 1000) / 1000;
    const adultOuts = peds.map(pp => pp.out);
    const viol = kids.filter(o => bed.has(o.i) && bed.get(o.i) > o.pp.out + 1e-9).length;

    return {
      hasNew,
      peds: peds.length, children: kids.length,
      startVis, noonKids, noonNight: q(noonNight),
      distinctKid: new Set(beds.map(q)).size,
      maxDrop,
      kidMean: beds.length ? q(beds.reduce((a, v) => a + v, 0) / beds.length) : -1,
      kidMin: beds.length ? q(Math.min(...beds)) : -1,
      kidMax: beds.length ? q(Math.max(...beds)) : -1,
      leftByParent: [...cause.values()].filter(c => c === 'parent').length,
      viol,
      /* CONTROL: the adults' curfew, untouched by this vector */
      distinctAdult: new Set(adultOuts.map(q)).size,
      adultMean: q(adultOuts.reduce((a, v) => a + v, 0) / adultOuts.length),
    };
  }, { seed, warp: WARP, step: STEP });
  rows.push({ seed, ...r });
}
await b.close();

const H = rows[0].hasNew;
console.log(`gate under test: ${H ? 'kidHidden(p)  [PATCH]' : 'LITAMT < 0.5  [HEAD]'}\n`);

console.log('CHILDREN — when do they go in?  (bedtime in nightAmt units: 0 = dusk, 1 = the small hours)');
console.log('seed  peds  kids  |  DISTINCT BEDTIMES  MAX DROP/frame  |   mean    min    max   | left-by-parent');
for (const r of rows) {
  console.log(
    `${String(r.seed).padEnd(5)} ${String(r.peds).padStart(4)} ${String(r.children).padStart(5)}  |` +
    `${String(r.distinctKid).padStart(14)}${String(r.maxDrop).padStart(16)}  |` +
    `${String(r.kidMean).padStart(7)}${String(r.kidMin).padStart(7)}${String(r.kidMax).padStart(7)}   |` +
    `${String(r.leftByParent).padStart(11)}`);
}

console.log('\nCONTROLS — none of these may move between builds');
console.log('seed  | ADULTS distinct  mean out | NOON kids out (must = kids, nightAmt 0) | child-after-parent');
for (const r of rows) {
  const noonOK = r.noonKids === r.children && r.noonNight === 0;
  console.log(
    `${String(r.seed).padEnd(5)} |${String(r.distinctAdult).padStart(15)}${String(r.adultMean).padStart(10)} |` +
    `${String(r.noonKids + '/' + r.children).padStart(16)}  nightAmt=${r.noonNight}  ${noonOK ? 'ok' : 'FAIL'}   |` +
    `${String(r.viol).padStart(14)}`);
}

const allOneBed = rows.every(r => r.distinctKid === 1);
const noViol = rows.every(r => r.viol === 0);
const noonOK = rows.every(r => r.noonKids === r.children && r.noonNight === 0);
console.log('');
if (allOneBed)
  console.log(`VERDICT: every child in the city leaves in ONE frame — DISTINCT BEDTIMES = 1 on all ${rows.length} seeds.`);
else
  console.log(`VERDICT: children leave one at a time — ${rows.map(r => r.distinctKid + '/' + r.children).join(', ')} distinct bedtimes.`);
console.log(`controls: noon ${noonOK ? 'ok' : 'FAIL'} · child-goes-in-before-parent ${noViol ? 'holds on every child' : 'VIOLATED'}`);
