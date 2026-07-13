#!/usr/bin/env node
/* shot-taxifare.mjs — the cab camera.
 *
 * The feature is a BEHAVIOUR (a cab pulls over at a lively kerb) and a STATE (the roof
 * lamp is a FOR-HIRE sign: amber when vacant, dark with a fare aboard). A frozen frame
 * cannot show "it stopped" — but it can show the LAMP, and that is a LOCATE question
 * with an answer I already hold (108): hired ⇒ dark, vacant ⇒ amber.
 *
 * ⚠ The lamp is an r=1.1 WORLD-unit arc and fitScale≈0.65 ⇒ 0.7 CSS px at fit zoom —
 * 215's hairline exactly. It is invisible without real magnification, so this wheels the
 * ARTIFACT'S OWN camera in (scale/offX/offY), never an upscaled crop.
 * ⚠ Aim at the entity's DRAWN position (`_sx`/`_sy`, set by stamp), never ctr() — a
 * vehicle is drawn interpolated between hexes and can be a whole hex from its cell (204).
 * ⚠ Force syncSky/syncStats: a frozen clock does not refresh the DOM (204).
 * ⚠ page.screenshot, not a canvas readback (200).
 * ⚠ Files are named, never lettered (239) — each frame self-reports its own state (202).
 *
 *   node shot-taxifare.mjs <seed> <outdir>
 *   SRC=/tmp/head.html node shot-taxifare.mjs 42 shots/head    # the HEAD control
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = process.env.SRC || join(HERE, '../../../../solvista.html');
const PAGE = pathToFileURL(SRC).href;

const seed = +(process.argv[2] || 42);
const OUT = process.argv[3] || 'shots/taxi';
mkdirSync(OUT, { recursive: true });
console.log(`artifact: ${SRC}\nseed ${seed} -> ${OUT}`);

const innerW = 1400, innerH = 900;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: innerW, height: innerH }, deviceScaleFactor: 2 });
await p.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await p.goto(`${PAGE}?seed=${seed}&warp=61`);
await p.waitForTimeout(400);

/* Freeze, rebuild, and run the sim until the cabs have had time to pick up fares.
   Returns the drawn world position of one HIRED cab and one VACANT cab. */
const found = await p.evaluate(({ seed }) => {
  let s0 = 0x2F6E2B1 >>> 0;
  Math.random = () => ((s0 = (s0 * 1664525 + 1013904223) >>> 0) / 4294967296);

  playing = false;
  genWorld(seed);
  __warp(61);
  syncFleet();

  const isCab = v => v.taxi;
  const hired = v => typeof cabFree === 'function' ? !cabFree(v) : false;

  /* ⚠ 226: "CAN IT BE SEEN" IS NOT ANSWERABLE BY A PREDICATE — ANSWER IT BY MEASURED INK.
     The first cut of this camera stepped until it found ANY hired, standing cab and aimed
     at its `_sx`. It produced a frame whose centre was a TOWER: the cab was at exactly the
     right world point and BURIED behind it (measured, 14px of visible ink against 154-167
     for the vacant cabs — and a visual agent, correctly, called the framing out).
     That is not a camera bug, it is the HOST: `livelyKerb` means a road with >=2 ATTRACT
     neighbours, i.e. precisely the ground with tall frontage drawn in the row IN FRONT.
     Draw order is depth order, so THE PREDICATE THAT MAKES A STOP MEANINGFUL IS THE
     PREDICATE THAT BURIES IT (206) — and taking the FIRST such cab takes a lottery ticket.
     So: sample over TIME, measure each cab's visible ink (render, re-render with every cab
     spliced out, diff — the changed pixels ARE the cabs as the composited frame shows
     them: occlusion included, floor exactly 0, one page), and aim at the ARGMAX.
     The bar is SELF-CALIBRATING (205 — never a threshold in the units of my own design):
     a cab is "well exposed" iff its ink clears 70% of the mean VACANT cab in the same
     frame, which is just "as visible as an ordinary car in an ordinary place". */
  zoom = 1; scale = fitScale; offX = fitX; offY = fitY;
  const ctx2 = cvs.getContext('2d'), W = cvs.width, H = cvs.height;
  const dev = W / innerWidth, R = Math.round(34 * dev);

  const inkOf = (v, A, B) => {
    if (v._sx === undefined) return 0;
    const cx = v._sx * scale + offX, cy = v._sy * scale + offY;
    if (cx < 360 && cy < 800) return 0;            /* under the placard — invisible to the USER (200) */
    const sx = cx * dev, sy = cy * dev;
    let ink = 0;
    for (let y = Math.max(0, sy - R | 0); y < Math.min(H, sy + R); y++)
      for (let x = Math.max(0, sx - R | 0); x < Math.min(W, sx + R); x++) {
        const k = (y * W + x) * 4;
        if (Math.abs(A[k] - B[k]) + Math.abs(A[k + 1] - B[k + 1]) + Math.abs(A[k + 2] - B[k + 2]) > 12) ink++;
      }
    return ink;
  };

  let bh = null, bv = null, log = [];
  for (let t = 0; t < 90; t++) {
    for (let i = 0; i < 30 * 2; i++) advanceEntities(1 / 30, 1);     /* sample every 2 sim-sec */
    render();
    const A = ctx2.getImageData(0, 0, W, H).data;
    const cabs = vehicles.filter(isCab);
    if (!cabs.length) continue;
    const idx = cabs.map(v => vehicles.indexOf(v));
    for (const v of cabs) vehicles.splice(vehicles.indexOf(v), 1);   /* suppress ALL cabs: 2 renders, not N */
    render();
    const B = ctx2.getImageData(0, 0, W, H).data;
    for (const v of cabs) vehicles.push(v);

    const rows = cabs.map(v => ({ v, ink: inkOf(v, A, B), hired: hired(v), standing: v.wait > 0 }));
    const vac = rows.filter(r => !r.hired);
    const bar = vac.length ? 0.7 * vac.reduce((a, r) => a + r.ink, 0) / vac.length : 0;
    for (const r of rows) {
      const snap = { wx: r.v._sx, wy: r.v._sy, ink: r.ink, standing: r.standing };
      if (r.hired && (!bh || r.ink > bh.ink)) bh = snap;
      if (!r.hired && (!bv || r.ink > bv.ink)) bv = snap;
    }
    log.push(`${t * 2}s bar=${bar | 0} ` + rows.map(r => `${r.hired ? 'H' : 'v'}${r.standing ? '*' : ''}:${r.ink}`).join(' '));
    if (bh && bh.ink >= bar && bar > 0) break;      /* a hired cab as visible as an ordinary car */
  }

  /* ⚠ the world kept MOVING after bv's snapshot was taken, so an early best-vacant aim is
     STALE by the time we shoot (measured: 430px off-centre). Re-pick the vacant cab from
     the FINAL, frozen frame — the one we are actually about to photograph. */
  render();
  {
    const A = ctx2.getImageData(0, 0, W, H).data;
    const cabs = vehicles.filter(isCab);
    for (const v of cabs) vehicles.splice(vehicles.indexOf(v), 1);
    render();
    const B = ctx2.getImageData(0, 0, W, H).data;
    for (const v of cabs) vehicles.push(v);
    render();
    bv = null;
    for (const v of cabs) {
      if (hired(v)) continue;
      const ink = inkOf(v, A, B);
      if (!bv || ink > bv.ink) bv = { wx: v._sx, wy: v._sy, ink, standing: v.wait > 0 };
    }
  }

  return {
    hired: bh && bh.ink > 0 ? { wx: bh.wx, wy: bh.wy } : null,
    vacant: bv && bv.ink > 0 ? { wx: bv.wx, wy: bv.wy } : null,
    hiredInk: bh ? bh.ink : 0, vacantInk: bv ? bv.ink : 0,
    hiredStanding: !!(bh && bh.standing),
    tail: log.slice(-3).join(' | '),
    nCabs: vehicles.filter(isCab).length,
    nHired: vehicles.filter(v => isCab(v) && hired(v)).length,
    hasFeature: typeof cabFree === 'function',
  };
}, { seed });

console.log(`  cabs ${found.nCabs}, hired ${found.nHired}, feature=${found.hasFeature}` +
  `, hired cab STANDING: ${found.hiredStanding}`);
console.log(`  last samples (H=hired v=vacant *=standing): ${found.tail}`);
console.log(`  ⇒ ARGMAX over time: hired ink ${found.hiredInk} (standing=${found.hiredStanding}),` +
  ` vacant ink ${found.vacantInk}`);
if (process.env.AIM) {
  const [wx, wy] = process.env.AIM.split(',').map(Number);
  found.hired = { wx, wy };            /* force HEAD to frame the identical world point */
}
console.log(`  AIM=${found.hired ? found.hired.wx.toFixed(1) + ',' + found.hired.wy.toFixed(1) : 'none'}`);

/* Aim the artifact's own camera at a world point and shoot. */
async function frame(name, aim, dayT, zoomN) {
  const info = await p.evaluate(({ aim, dayT, zoomN }) => {
    playing = false;
    __setTime(dayT);
    if (aim) {
      zoom = zoomN; scale = fitScale * zoom;
      offX = innerWidth / 2 - aim.wx * scale;
      offY = innerHeight / 2 - aim.wy * scale;
    } else { zoom = 1; scale = fitScale; offX = fitX; offY = fitY; }
    lastSky = 0; syncSky(performance.now()); syncStats();   /* the DOM does not follow a frozen clock (204) */
    render();
    const cabs = vehicles.filter(v => v.taxi);
    const hired = cabs.filter(v => typeof cabFree === 'function' && !cabFree(v)).length;
    /* ⚠ SELF-REPORT WHETHER A CAB IS ACTUALLY IN THE FRAME (202/236). A close-up with NO
       taxi in it reads to an agent exactly like a correctly-DARK roof lamp — which is a
       false PASS, and I nearly banked one. So the frame states, in its own caption, which
       cab is nearest the centre and how far off-centre it is. `_sx` is only refreshed for
       an entity that stamp() actually DREW, so this also catches a stale aim. */
    const cx = innerWidth / 2, cy = innerHeight / 2;
    let near = null, nd = 1e9;
    for (const v of cabs) {
      if (v._sx === undefined) continue;
      const sx = v._sx * scale + offX, sy = v._sy * scale + offY;
      const d = Math.hypot(sx - cx, sy - cy);
      if (d < nd) { nd = d; near = { d, hired: typeof cabFree === 'function' && !cabFree(v), wait: v.wait > 0 }; }
    }
    return {
      LITAMT: +LITAMT.toFixed(2), phase: phaseWord(dayT), cabs: cabs.length, hired,
      near: near ? { d: Math.round(near.d), hired: near.hired, standing: near.wait } : null,
    };
  }, { aim, dayT, zoomN });
  const f = join(OUT, name + '.png');
  await p.screenshot({ path: f });
  /* a TIGHT crop on the frame centre — the cab is ~110 CSS px at this zoom, so a 220px
     box makes the roof lamp unmissable instead of a needle in a 1400x900 frame (204). */
  if (aim) await p.screenshot({
    path: join(OUT, name + '-tight.png'),
    clip: { x: innerW / 2 - 110, y: innerH / 2 - 110, width: 220, height: 220 },
  });
  const n = info.near;
  const cab = n ? `nearest cab ${n.d}px off-centre, ${n.hired ? 'HIRED(lamp must be DARK)' : 'VACANT(lamp must be AMBER)'}` +
    `${n.standing ? ', STANDING' : ''}` : 'NO CAB DRAWN';
  console.log(`  ${name.padEnd(16)} t=${dayT} ${String(info.phase).padEnd(9)}` +
    ` LITAMT=${info.LITAMT} cabs=${info.cabs} hired=${info.hired} | ${cab}`);
}

/* ⚠ The DAY close-up is deliberately gone. The lamp is gated on LITAMT>0.3, so by day
   there is no lamp to read — and a STILL FRAME CANNOT SHOW THAT A CAR IS STOPPED anyway.
   The stop is a claim about MOTION, and 134 says that needs a TEMPORAL probe, not a
   screenshot: probe-taxifare Part B is its gate (0 -> 58/48/28 calls). What a photograph
   CAN grade is the roof lamp, so that is what the visual gate is aimed at. */
await frame('city-night', null, 0.92, 1);
await frame('city-day', null, 0.30, 1);
if (found.hired) await frame('cab-hired-night', found.hired, 0.92, 5.5);
if (found.vacant) await frame('cab-vacant-night', found.vacant, 0.92, 5.5);

await b.close();
