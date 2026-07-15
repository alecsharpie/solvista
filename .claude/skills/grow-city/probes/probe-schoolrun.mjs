#!/usr/bin/env node
/* probe-schoolrun.mjs — DOES THE SCHOOL RUN HAPPEN TWICE, OR ONCE?
 *
 * The school is the ONE civic institution that draws a time-of-day crowd: a
 * drop-off crowd of kids and grown-ups at its gate, gated on the wall clock:
 *
 *     if(dayT>0.15 && dayT<0.30){  // the school run: drop-off crowd at the gate
 *
 * A real school run has TWO peaks — the morning drop-off and the afternoon
 * pickup — but this only ever drew the morning window, so the gate stood empty
 * every afternoon while the classrooms emptied behind it. A half-schedule: one
 * window where a school day has two. (199's tell on a DRAW GATE: the predicate
 * asserts "the school run" but its value can only ever be the morning of it.)
 *
 * TEMPORAL (134), because every other gate this loop owns is FROZEN: a claim
 * about CADENCE — "the gate is busy twice a day" — cannot be photographed. It
 * reads NO PIXELS (it counts the figure bodies the frame ISSUES), so it has no
 * noise floor at all; the only clock is the one it pins itself.
 *
 * ISOLATION: it hooks ctx.fillRect and counts figure bodies — w===1.4, h in
 * {1.8, 2.9} (kid / grown-up) — but ONLY those landing within GATE_R of a
 * school's own gate centre, computed in-page from the artifact's own px() +
 * frontSide(). That box excludes the FESTIVAL crowd, which shares the figure
 * signature (fillRect(...,1.4,hgt) at L6696) but is drawn on fete cells far from
 * any school gate.
 *
 * BUILD-AGNOSTIC via SRC=: it only counts what the frame draws, so the SAME file
 * grades HEAD (SRC=/tmp/head.html) and the patch — no source hook, no cross-build
 * pixel floor (230).
 *
 * THE HEADLINE NEEDS NO THRESHOLD (236): the vector is "make the schedule vary",
 * so HEAD's answer is a CONSTANT by construction — ONE busy window — and
 * DISTINCT BUSY WINDOWS = 1 is the defect stated. The patch reads 2.
 *
 * THE COLUMNS THAT MUST NOT MOVE (250):
 *   MIDDAY (dayT 0.42) — outside both windows, so the gate must be EMPTY on both
 *                        builds. The dead-regime control (199).
 *   NIGHT  (dayT 0.05) — same.
 *   MORNING            — the patch must not touch the morning drop-off: its count
 *                        must be IDENTICAL across builds (the change is purely the
 *                        afternoon window). This is also the POSITIVE control (248):
 *                        a correct sibling window, so a morning that reads 0 means
 *                        the probe is broken, not the city.
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
const WARP = 61;                 /* 2035: the mature city, most schools */
/* the pins: night, the morning window, midday (control), the afternoon window, dusk */
const PINS = { night: 0.05, morning: 0.22, midday: 0.42, afternoon: 0.56, dusk: 0.75 };
const GATE_R = 16;               /* px: a figure body this close to a gate centre is school-run */

console.log(`\nartifact: ${SRC}`);

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
/* 213: my change draws no new Math.random, so both builds see the same stream */
await p.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await p.goto(PAGE);
await p.waitForFunction(() => typeof window.__warp === 'function');

const rows = [];
for (const seed of SEEDS) {
  const r = await p.evaluate(({ seed, warp, pins, gateR }) => {
    playing = false;
    genWorld(seed); __warp(warp);

    /* every school's gate centre, in the same (world-plate) space fillRect args live in */
    const gates = [];
    for (const i of HEXI) {
      const c = cells[i]; if (c.t !== T.CIVIC || c.kind !== 'school') continue;
      const x = i % G, y = (i / G) | 0, gx = x + 0.5, gy = y + 0.5;
      const fxS = frontSide(x, y, hashCell(x, y, seedNum ^ 0x5C01) < 0.5 ? 1 : -1);
      gates.push(px(gx + fxS * 0.24, gy + 0.3));
    }

    /* hook fillRect: tally figure bodies (w=1.4, h in {1.8,2.9}) near any gate */
    const realFR = CanvasRenderingContext2D.prototype.fillRect;
    let tally = 0;
    CanvasRenderingContext2D.prototype.fillRect = function (rx, ry, rw, rh) {
      if (rw === 1.4 && (rh === 1.8 || rh === 2.9)) {
        for (const [gxp, gyp] of gates) {
          if (Math.abs(rx - gxp) < gateR && Math.abs(ry - gyp) < gateR) { tally++; break; }
        }
      }
      return realFR.call(this, rx, ry, rw, rh);
    };

    const count = t => { __setTime(t); tally = 0; render(); return tally; };
    const out = {};
    for (const k in pins) out[k] = count(pins[k]);

    CanvasRenderingContext2D.prototype.fillRect = realFR;
    return { schools: gates.length, ...out };
  }, { seed, warp: WARP, pins: PINS, gateR: GATE_R });
  rows.push({ seed, ...r });
}
await b.close();

const KEYS = Object.keys(PINS);
console.log('\nSCHOOL-RUN FIGURES AT THE GATE  (count of kid/grown-up bodies the frame draws)');
console.log('seed schools |' + KEYS.map(k => k.padStart(10)).join('') + '  | BUSY WINDOWS');
for (const r of rows) {
  const busy = KEYS.filter(k => k !== 'midday' && k !== 'night' && k !== 'dusk' && r[k] > 0);
  const nonzero = KEYS.filter(k => r[k] > 0);
  console.log(
    `${String(r.seed).padEnd(4)} ${String(r.schools).padStart(6)}  |` +
    KEYS.map(k => String(r[k]).padStart(10)).join('') +
    `  | ${nonzero.join(',') || '(none)'}`);
}

const midOK = rows.every(r => r.midday === 0 && r.night === 0 && r.dusk === 0);
const morningOK = rows.every(r => r.morning > 0);
const afternoonOK = rows.every(r => r.afternoon > 0);
console.log('\nCONTROLS: midday/night/dusk empty on both builds =', midOK ? 'ok' : 'FAIL',
  '| morning busy (positive control) =', morningOK ? 'ok' : 'FAIL');
console.log('AFTERNOON pickup busy =', afternoonOK ? 'YES (2 windows)' : 'NO (1 window — HEAD)');
