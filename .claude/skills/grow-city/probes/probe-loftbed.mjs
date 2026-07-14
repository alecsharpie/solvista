/* probe-loftbed — cue (at): "the loft's windows never go to bed".
 *
 * A loft conversion is HOUSING wearing an industrial tile. `BEDT` is keyed by TILE
 * TYPE (199's law, recursing onto a per-cell FLAG), so a loft is T.IND, `BEDT[T.IND]`
 * is undefined, and windarkAt() hands it the flat baseline WINDARK. Except the loft
 * never even CALLS it: its glass is a SOLID RIBBON (bandR), so it has no panes that
 * could go out at all, while every RES/MID/COM/TOWER pane is swept dark by winBandR
 * as the night deepens.
 *
 * ⚠ IT COUNTS OBJECTS, NOT PIXELS (247/250) — and that is the whole point. The first
 * cut of this probe measured each building's mean rendered LUMINANCE and it was
 * USELESS: the working SHED, which has no panes and no bedtime whatever, "fell" by
 * ~11 units between dusk and the small hours, because a whole-building mean is
 * dominated by the AMBIENT LIGHT CURVE and not by the glass (254 — the signal lives
 * in a few panes and an area-mean averages it away). Hooking winQuad instead counts
 * the LIT PANES the frame actually issues: deterministic, no noise floor at all, no
 * ambient term, and it states the claim in the units a viewer reads (205).
 *
 * BUILD-AGNOSTIC: it only hooks the artifact's own draw fns, so ONE file grades HEAD
 * and the patch with no source swap and no cross-build floor (230).
 *   SRC=/tmp/head.html node probe-loftbed.mjs
 *
 * ⚠ ITS HEADLINE NEEDS NO THRESHOLD (236): when the vector is "make X vary", HEAD's
 * answer is a CONSTANT by construction. HEAD's loft draws SOLID BANDS and ZERO panes,
 * at every hour of every night, on every seed — that IS the defect, stated.
 *
 * ⚠ THE HOME (MID) IS THE FREE POSITIVE CONTROL (248): a correct sibling home, drawn
 * by the same winBandR, that provably DOES keep an hour. It must shed panes on BOTH
 * builds — a dead hook and a bedtime-less city print the same flat column. It is also
 * THE BAR (226): "is a 3-pane drop enough?" is a number I would invent; "does the
 * loft now empty like a HOME does?" is one the artifact answers.
 *
 * ⚠ THE WORKING SHED IS THE MUST-NOT-MOVE COLUMN (250): T.IND with !loft keeps a
 * night-shift clerestory (173), and the fix is a per-cell predicate precisely so it
 * cannot bed the shed. It must come back IDENTICAL, not merely close.
 *
 * ⚠ DAY IS THE FREE DEAD-REGIME CONTROL (199): winBandR falls back to the identical
 * solid band below LITAMT<0.35, so daylight must be byte-identical on both builds —
 * 0 panes, same band count.
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const A1 = join(HERE, '../../../../solvista.html'), A2 = join(HERE, 'solvista.html');
const ART = existsSync(A1) ? A1 : A2;
const SRC = process.env.SRC || ART;

const SEEDS = [7, 42, 1234, 99, 2024, 555];
/* the night, from dusk to the small hours. dayT is the raw counter; every row
   self-reports the nightDeep() the panes actually read (202/261). */
const HOURS = [0.72, 0.80, 0.88, 0.96, 0.04];
const DAY = 0.35;   /* the dead regime: LITAMT<0.35 ⇒ no panes drawn at all */

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await p.goto(pathToFileURL(SRC).href);
await p.waitForFunction(() => window.__census !== undefined);

const data = await p.evaluate(({ seeds, hours, DAY }) => {
  const out = [];

  /* Hook the artifact's OWN draw fns and attribute every pane / band to the cell
     being drawn. ⚠ reach through window at call time, never close over the counter
     (250: a wrapper that captures a stale object silently counts into nobody). */
  const dc = window.drawCell, wq = window.winQuad, br = window.bandR;
  window.__cur = null; window.__tally = {};
  window.drawCell = (x, y) => { window.__cur = x + ',' + y; const r = dc(x, y); window.__cur = null; return r; };
  const bump = (k) => { const c = window.__cur; if (c == null) return;
    (window.__tally[c] ||= { panes: 0, bands: 0 })[k]++; };
  window.winQuad = (...a) => { bump('panes'); return wq(...a); };
  window.bandR = (...a) => { bump('bands'); return br(...a); };
  const census = () => { window.__tally = {}; render(); return window.__tally; };

  for (const seed of seeds) {
    playing = false;
    genWorld(seed); __warp(2035 - 1974);
    time = 1000; waveT = 500;
    STARS.length = 0; if (typeof flock !== 'undefined') flock = null;
    for (const n of ['vehicles', 'peds', 'dogs', 'boats', 'birds', 'clouds'])
      if (Array.isArray(window[n])) window[n].length = 0;
    /* 272: render() GROWS the city while it draws it — settle the heights first. */
    for (const c of cells) if (c.h < c.th) c.h = c.th;

    /* --- the host, pure world data --- */
    const lofts = [], sheds = [], mids = [];
    for (const i of HEXI) {
      const c = cells[i], x = i % G, y = (i / G) | 0;
      if (c.t === T.IND && c.loft) lofts.push([x, y, c.h]);
      else if (c.t === T.IND) sheds.push([x, y, c.h]);
      else if (c.t === T.MID) mids.push([x, y, c.h]);
    }
    if (!lofts.length || !mids.length || !sheds.length) { out.push({ seed, lofts: lofts.length, skip: 1 }); continue; }
    /* the positive control is a MID home of comparable mass, so the two are drawn by
       the same winBandR over a similar number of faces */
    const loft = lofts[0];
    mids.sort((a, b2) => Math.abs(a[2] - loft[2]) - Math.abs(b2[2] - loft[2]));
    const home = mids[0], shed = sheds[0];
    const key = (h) => h[0] + ',' + h[1];

    const rows = [];
    for (const t of hours.concat([DAY])) {
      __setTime(t); render();               /* settle the light, then census a clean frame */
      const tal = census();
      const g = (h) => tal[key(h)] || { panes: 0, bands: 0 };
      rows.push({ t, nd: nightDeep(), la: LITAMT, day: t === DAY,
                  L: g(loft), H: g(home), S: g(shed) });
    }
    out.push({ seed, lofts: lofts.length, sheds: sheds.length,
               loft, home, shed, rows });
  }
  return out;
}, { seeds: SEEDS, hours: HOURS, DAY });

await b.close();

const f = (v, w = 5, d = 2) => v.toFixed(d).padStart(w);
const c3 = (o) => `${String(o.panes).padStart(3)}p ${String(o.bands).padStart(2)}b`;
console.log(`\nprobe-loftbed  —  SRC=${SRC.replace(/.*\//, '')}\n`);
console.log('LIT PANES (p) and solid BANDS (b) each building actually draws, per hour.');
console.log('LOFT = treatment · HOME(MID) = positive control + THE BAR (must shed panes');
console.log('on BOTH builds) · SHED = must-not-move.  No pixels ⇒ no noise floor.\n');

const sum = { l0: [], l1: [], h0: [], h1: [] };
for (const s of data) {
  if (s.skip) { console.log(`seed ${s.seed}: host absent (lofts=${s.lofts}) — skipped\n`); continue; }
  console.log(`seed ${String(s.seed).padEnd(5)} lofts=${s.lofts} sheds=${s.sheds}   `
    + `loft@${s.loft[0]},${s.loft[1]} h=${s.loft[2].toFixed(0)}  `
    + `home@${s.home[0]},${s.home[1]} h=${s.home[2].toFixed(0)}  shed@${s.shed[0]},${s.shed[1]}`);
  console.log('   dayT  nightDeep  LITAMT |      LOFT |      HOME |      SHED');
  for (const r of s.rows)
    console.log(`  ${r.t.toFixed(2)}     ${f(r.nd)}    ${f(r.la)} |  ${c3(r.L)} |  ${c3(r.H)} |  ${c3(r.S)}`
      + (r.day ? '   <- DAY (dead regime)' : ''));
  const night = s.rows.filter(r => !r.day);
  const dist = (a) => new Set(night.map(r => r[a].panes)).size;
  const lp = night.map(r => r.L.panes), hp = night.map(r => r.H.panes);
  sum.l0.push(lp[0]); sum.l1.push(lp[lp.length - 1]);
  sum.h0.push(hp[0]); sum.h1.push(hp[hp.length - 1]);
  console.log(`   ⇒ DISTINCT LIT-PANE COUNTS across the night:  LOFT ${dist('L')}   `
    + `HOME(bar) ${dist('H')}   SHED ${dist('S')}`);
  console.log(`   ⇒ panes lit, dusk → small hours:  LOFT ${lp[0]} → ${lp[lp.length - 1]}   `
    + `HOME(bar) ${hp[0]} → ${hp[hp.length - 1]}\n`);
}
const pct = (a, b2) => { const s0 = a.reduce((x, y) => x + y, 0), s1 = b2.reduce((x, y) => x + y, 0);
  return s0 ? `${s0} → ${s1}  (${(100 * (s1 - s0) / s0).toFixed(0)}%)` : `${s0} → ${s1}`; };
console.log(`ALL SEEDS, panes lit dusk → small hours:`);
console.log(`   LOFT      ${pct(sum.l0, sum.l1)}`);
console.log(`   HOME(bar) ${pct(sum.h0, sum.h1)}\n`);
