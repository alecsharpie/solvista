#!/usr/bin/env node
/* probe-nightsand.mjs — cue (q): "the night coast flattens to a mauve void".
 *
 * Raised UNPROMPTED by two blind step-back agents at 212 (both seeds) and by a
 * third at 213. The cue itself names three candidate causes and tells you to
 * probe before designing: is it LUMINANCE (too dark), is it CONTRAST (detail
 * dies), or is it that NO NIGHT DRAW IS GATED ON BEACH AT ALL?
 *
 * Those are three different numbers, so measure all three, and measure them
 * against CONTROLS that are not the coast — because "everything gets darker at
 * night" is not a bug, it is night. The bug, if there is one, is the beach
 * losing its read FASTER than the rest of the city.
 *
 * Per tile type, masked to the hex's own geometry (196 — a box samples the
 * neighbours; and the mask is SWEPT, so rim bleed shows itself):
 *   bright  = mean luminance over the type's pixels
 *   detail  = mean over hexes of (stdev of luminance WITHIN that hex)  <- texture
 *   spread  = stdev over hexes of (that hex's mean luminance)          <- do hexes differ?
 *
 * `detail` is the one the agents are describing: "no beach/sand read", "detail
 * dies". Report day, night, and night/day RETENTION. A type whose retention is
 * in line with the controls is just dark; a type far below them has lost its
 * draw.
 *
 * Freeze per 213/203/199/163: Math.random stubbed in addInitScript BEFORE the
 * page's own script, genWorld+__warp in-page, STARS/flock cleared, waveT/time
 * pinned, playing=false. TIDE pinned identically for day and night, and printed,
 * so the tide cannot be the difference between the two frames.
 *
 *   node probe-nightsand.mjs
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
/* SRC=<path> grades a pristine HEAD copy with the identical instrument — the only
   honest before/after, and it must be PER SEED: the fix is moon-gated, and seed 42
   is at a NEW moon at this hour, so a 3-seed mean can hide it entirely. */
const SRC = process.env.SRC ? resolve(process.env.SRC) : join(HERE, '../../../../solvista.html');

const SEEDS = [7, 42, 1234];
const COAST = ['BEACH', 'BEACHfront', 'BEACHback', 'DUNE', 'SHOREPARK', 'WATER', 'KELP'];
const CTRL = ['PARK', 'FOREST', 'RES', 'ROAD'];
const KINDS = [...COAST, ...CTRL];
const MASKS = [0.8, 0.6, 0.4];          /* swept (196) */
const W = 1600, H = 1000;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: W, height: H } });
/* 213: stub BEFORE the page's own top-level script, or everything it seeds at
   load with the real Math.random is already baked in and differs per load. */
await p.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});

const acc = {};   /* acc[kind][light][mask] = {bright,detail,spread,n} summed over seeds */
for (const k of KINDS) { acc[k] = { day: {}, night: {} };
  for (const L of ['day', 'night']) for (const m of MASKS) acc[k][L][m] = { bright: 0, detail: 0, spread: 0, n: 0 }; }

for (const seed of SEEDS) {
  await p.goto(pathToFileURL(SRC).href);
  await p.waitForFunction(() => window.__census !== undefined);
  const r = await p.evaluate(({ seed, kinds, masks }) => {
    playing = false;
    genWorld(seed); window.__warp(61);
    STARS.length = 0; flock = null;
    waveT = 0; time = 0;
    window.__setTide(0.35);                       /* mid-ebb, identical in both frames */
    for (const a of [boats, peds, dogs, birds]) if (Array.isArray(a)) a.length = 0;

    const cvs = document.querySelector('canvas');
    const g = cvs.getContext('2d');
    const D = dpr;
    const lum = (d, i) => 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];

    /* the hex, in world units, relative to its centre: N/S points, HW half-width,
       full width between -ER..+ER, tapering above/below. Exact, not an ellipse. */
    const inHex = (dx, dy, f) => {
      const hw = HW * f, vr = VR * f, er = ER * f;
      if (Math.abs(dx) > hw || Math.abs(dy) > vr) return false;
      if (Math.abs(dy) <= er) return true;
      return Math.abs(dx) <= hw * (vr - Math.abs(dy)) / (vr - er || 1);
    };

    /* the damp band — and so the sheen — only draws on a beach hex that HAS a sea
       neighbour. Grading the feature over every BEACH hex grades it on cells it
       cannot reach (206: measure the POOL). Split them. */
    const seaFacing = (x, y) => {
      for (const [dx, dy] of nbrDirs(y)) {
        const e = cellAt(x + dx, y + dy);
        if (e && e.t === T.WATER && !e.riv) return true;
      }
      return false;
    };

    const sample = (data, kind, f) => {
      const want = kind === 'BEACHfront' ? 'front' : kind === 'BEACHback' ? 'back' : null;
      const tv = want ? T.BEACH : T[kind], hexes = [];
      for (const i of HEXI) {
        const c = cells[i]; if (!c || c.t !== tv) continue;
        const x = i % G, y = (i / G) | 0;
        if (want && (seaFacing(x, y) ? 'front' : 'back') !== want) continue;
        const [wx, wy] = ctr(x, y);
        const sx = (wx * scale + offX) * D, sy = (wy * scale + offY) * D;
        const rx = HW * scale * D, ry = VR * scale * D;
        let sum = 0, sum2 = 0, n = 0;
        const x0 = Math.max(0, Math.floor(sx - rx)), x1 = Math.min(cvs.width - 1, Math.ceil(sx + rx));
        const y0 = Math.max(0, Math.floor(sy - ry)), y1 = Math.min(cvs.height - 1, Math.ceil(sy + ry));
        for (let py = y0; py <= y1; py++) for (let pxx = x0; pxx <= x1; pxx++) {
          const dx = (pxx - sx) / (scale * D), dy = (py - sy) / (scale * D);
          if (!inHex(dx, dy, f)) continue;
          const v = lum(data, (py * cvs.width + pxx) * 4);
          sum += v; sum2 += v * v; n++;
        }
        if (n < 12) continue;                     /* off-screen / clipped hexes */
        const mean = sum / n;
        hexes.push({ mean, sd: Math.sqrt(Math.max(0, sum2 / n - mean * mean)) });
      }
      if (!hexes.length) return null;
      const gm = hexes.reduce((a, h) => a + h.mean, 0) / hexes.length;
      const detail = hexes.reduce((a, h) => a + h.sd, 0) / hexes.length;
      const spread = Math.sqrt(hexes.reduce((a, h) => a + (h.mean - gm) ** 2, 0) / hexes.length);
      return { bright: gm, detail, spread, n: hexes.length };
    };

    const out = { tide: {}, lit: {}, kinds: {} };
    for (const k of kinds) out.kinds[k] = { day: {}, night: {} };

    for (const [L, t] of [['day', 0.30], ['night', 0.92]]) {
      dayT = t; render();
      const a = g.getImageData(0, 0, cvs.width, cvs.height).data;
      render();                                   /* 203: the noise floor, in-run */
      const a2 = g.getImageData(0, 0, cvs.width, cvs.height).data;
      let floor = 0;
      for (let i = 0; i < a.length; i += 4)
        if (Math.abs(a[i] - a2[i]) > 8 || Math.abs(a[i + 1] - a2[i + 1]) > 8 || Math.abs(a[i + 2] - a2[i + 2]) > 8) floor++;
      out.tide[L] = TIDE; out.lit[L] = LITAMT; out.moonf = (typeof MOONF !== 'undefined') ? MOONF : (1 - Math.cos(moonPhase() * 6.2832)) / 2;  /* HEAD keeps it local to render() */ out['floor_' + L] = floor;
      for (const k of kinds) for (const f of masks) out.kinds[k][L][f] = sample(a, k, f);
    }
    return out;
  }, { seed, kinds: KINDS, masks: MASKS });

  const fr = r.kinds.BEACHfront;
  console.log(`seed ${seed}:  TIDE ${r.tide.night.toFixed(2)}  LITAMT day ${r.lit.day.toFixed(2)} / night ${r.lit.night.toFixed(2)}` +
    `  MOONF ${r.moonf.toFixed(2)} (${r.moonf < 0.15 ? 'NEW' : r.moonf > 0.8 ? 'FULL' : 'part'})` +
    `  floor ${r.floor_day}/${r.floor_night} px` +
    `  |  BEACHfront night detail ${fr.night[0.6].detail.toFixed(1)} bright ${fr.night[0.6].bright.toFixed(0)}` +
    `  (day ${fr.day[0.6].detail.toFixed(1)}/${fr.day[0.6].bright.toFixed(0)})`);
  for (const k of KINDS) for (const L of ['day', 'night']) for (const f of MASKS) {
    const s = r.kinds[k][L][f]; if (!s) continue;
    const a = acc[k][L][f];
    a.bright += s.bright; a.detail += s.detail; a.spread += s.spread; a.n += s.n;
  }
}
await b.close();

const N = SEEDS.length;
for (const f of MASKS) {
  console.log(`\n=== mask ${f} of the hex ===`);
  console.log('kind         hexes |  DAY  bright detail spread |  NIGHT bright detail spread | RETENTION bright detail');
  for (const k of KINDS) {
    const d = acc[k].day[f], n = acc[k].night[f];
    if (!d.n) continue;
    const D = { b: d.bright / N, d: d.detail / N, s: d.spread / N };
    const G2 = { b: n.bright / N, d: n.detail / N, s: n.spread / N };
    const tag = COAST.includes(k) ? ' ' : '.';   /* '.' marks a non-coastal control */
    console.log(
      `${tag}${k.padEnd(11)}${String(Math.round(d.n / N)).padStart(5)} | ` +
      `${D.b.toFixed(1).padStart(11)}${D.d.toFixed(2).padStart(7)}${D.s.toFixed(2).padStart(7)} | ` +
      `${G2.b.toFixed(1).padStart(12)}${G2.d.toFixed(2).padStart(7)}${G2.s.toFixed(2).padStart(7)} | ` +
      `${(G2.b / D.b * 100).toFixed(0).padStart(8)}%${(G2.d / D.d * 100).toFixed(0).padStart(7)}%`);
  }
}
console.log('\n(. = non-coastal control.  detail = mean within-hex luminance stdev = TEXTURE.)');

/* per-seed, because the fix is moon-gated and the MEAN can hide a new-moon seed
   that still reads as a void (204: a control — or a claim — must be a population,
   but a POPULATION MEAN can also bury the one member you care about). */
