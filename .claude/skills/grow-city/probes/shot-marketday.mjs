/* The market's camera (iter 285).
 *
 * A STILL CANNOT PROVE A VERB (134/258): "the market packs up" is a claim about
 * cadence and no photograph can carry it. So this does not try to shoot the verb —
 * it shoots the STATE the verb leaves behind, and makes the two builds DISAGREE at
 * one instant (264's discriminating pair):
 *
 *   shut  — the same square, same hour, in DAYLIGHT. HEAD draws its three stalls
 *           (it has no closed state at all); the patch draws bare pitches and the
 *           trestles stacked to one side. THIS is the frame that carries the lap.
 *   open  — a morning market, stalls up. Both builds must look ~the same here.
 *   lit   — an evening market trading under the string lights (patch only can have
 *           this be MEANINGFUL; on HEAD the lights burn regardless).
 *   city  — the required un-zoomed whole-plate read.
 *
 * 258: the success condition at `shut` is an ABSENCE, and an absent subject renders
 * exactly like a camera that MISSED. So every frame self-reports its host's presence,
 * the stalls it actually issued, and its clock — printed to the CONSOLE (for me), never
 * burned into the PNG (the agents stay blind).
 *
 * Aim: ARGMAX OF MEASURED INK over HOSTS (226/272) — suppress each market by retyping
 * its hex (230), diff at FULL RESOLUTION (the stalls are sparse), zero the ink under the
 * HUD boxes first (200), then pan to the winning market's own ctr(). Terrain is identical
 * across builds (the lap draws zero rng()), so both builds frame the identical hex and
 * the pair is genuinely blind.
 *
 * 269: drive `zoom`; `scale` is DERIVED (scale = fitScale*zoom). There is no setZoom.
 * 239/238/268: frames named by FILE, tokens MEANINGLESS and NON-ORDINAL, map CROSSED
 * between seeds — so "the fix is always the second one" fails on one of them.
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PATCH = join(HERE, 'solvista.html');
const HEAD = process.env.HEAD_SRC || '/tmp/head-mkt.html';
const OUT = process.env.OUT || join(HERE, '.claude/skills/grow-city/shots/mkt');
mkdirSync(OUT, { recursive: true });

const MAP = { 7: { kappa: 'patch', sigma: 'head' },      // crossed (238/268)
             42: { kappa: 'head', sigma: 'patch' } };

const b = await chromium.launch();

// the freeze every page shares (163/195f/199/203/272)
const FREEZE = (seed) => {
  playing = false;
  genWorld(seed); __warp(2035 - 1974);
  time = 1000; waveT = 500;
  if (typeof __setWind === 'function') __setWind(0.5);       // 275/280: the third clock
  STARS.length = 0; if (typeof flock !== 'undefined') flock = null;
  for (const n of ['vehicles', 'peds', 'dogs', 'boats', 'birds', 'clouds'])
    if (Array.isArray(window[n])) window[n].length = 0;
  for (const c of cells) if (c.h < c.th) c.h = c.th;         // 272: settle the heights
};

// count the stall prisms the frame issues for ONE hex — build-agnostic, and the
// only thing that can tell "correctly shut" from "the camera missed" (258)
const HOOK = () => {
  const pr = window.prism, dcl = window.drawCell;
  window.__at = null; window.__n = 0;
  window.drawCell = (x, y) => { window.__in = (x + ',' + y) === window.__at;
    const r = dcl(x, y); window.__in = false; return r; };
  window.prism = (...a) => { if (window.__in) window.__n++; return pr(...a); };
};

for (const seed of [7, 42]) {
  /* ---- pass 1: on the PATCH, pick the host by ink and derive the three pins ---- */
  const p0 = await b.newPage({ viewport: { width: 1400, height: 900 } });
  await p0.addInitScript(() => { let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
  await p0.goto(pathToFileURL(PATCH).href);
  await p0.waitForFunction(() => window.__census !== undefined);

  const plan = await p0.evaluate(({ seed, FREEZE_S }) => {
    eval('(' + FREEZE_S + ')')(seed);

    const mkts = [];
    for (const i of HEXI) if (cells[i].t === T.MARKET) mkts.push([i % G, (i / G) | 0]);
    if (!mkts.length) return { none: 1 };

    /* a daylight hour: the darkest LITAMT there is (261/274 — drive the curve, since
       __setTime only assigns dayT and LITAMT is recomputed inside render()) */
    const litAt = (t) => { SUNT = sunWarp(t); return daylight(SUNT).lit; };
    let hDay = 0, lo = 9;
    for (let h = 0; h < 1; h += 0.005) { const L = litAt(h); if (L < lo) { lo = L; hDay = h; } }

    zoom = 1; scale = fitScale * zoom; offX = fitX; offY = fitY;
    const g = cvs.getContext('2d'), W = cvs.width, H = cvs.height, dpr = W / cvs.clientWidth;
    const grab = () => g.getImageData(0, 0, W, H).data;
    const boxes = ['.placard', '.census', '.controls'].map(s => document.querySelector(s))
      .filter(Boolean).map(e => { const r = e.getBoundingClientRect();
        return [r.left * dpr, r.top * dpr, r.right * dpr, r.bottom * dpr]; });
    const hud = (X, Y) => boxes.some(([x0, y0, x1, y1]) => X >= x0 && X < x1 && Y >= y0 && Y < y1);

    /* --- AIM: argmax of the STALLS' OWN VISIBLE INK, over (day x hex) ---------------
       258: only ~a third of the squares trade at any one noon, so on a given day the
       "argmax" has n=1 and is a lottery ticket, not an aim. Take it over TIME as well.
       Isolation is 253's suppress-the-PREDICATE rig, IN ONE PAGE: force marketAmt to 0
       for the hex under test and re-render — the artifact then draws that square exactly
       as it draws a shut one, so the difference IS its stalls, at a floor of exactly 0,
       off the final composited canvas (occlusion measured for free).
       ⚠ 284: marketAmt is a top-level `function`, so its global property is
       NON-CONFIGURABLE -- `delete` is a silent no-op. Keep the original and restore BY
       ASSIGNMENT, or the stub survives and poisons every later measurement. */
    const realAmt = window.marketAmt;
    let best = null;
    for (let d = 0; d < 24; d++) {
      __setTime(d + hDay);
      const open = mkts.filter(([x, y]) => realAmt(x, y) >= 1);
      if (!open.length) continue;
      render();
      const A = grab();
      for (const [x, y] of open) {
        window.marketAmt = (px, py) => (px === x && py === y) ? 0 : realAmt(px, py);
        render();
        const B = grab();
        window.marketAmt = realAmt;                       // restore BY ASSIGNMENT (284)
        let ink = 0;                                      // 272(a): FULL resolution
        for (let i = 0; i < A.length; i += 4) {
          if (A[i] === B[i] && A[i + 1] === B[i + 1] && A[i + 2] === B[i + 2]) continue;
          const X = (i >> 2) % W, Y = (i >> 2) / W | 0;
          if (hud(X, Y)) continue;                        // 200: invisible to the viewer
          ink++;
        }
        if (!best || ink > best.ink) best = { x, y, ink, tOpen: d + hDay };
      }
    }
    window.marketAmt = realAmt;
    render();
    if (!best) return { none: 1 };

    /* ...now the other two pins, FOR THAT HEX */
    const { x, y } = best;
    let tShut = null, tLit = null;
    for (let d = 0; d < 120; d++) {
      if (tShut === null) { __setTime(d + hDay); if (marketAmt(x, y) <= 0) tShut = d + hDay; }
      if (tLit === null) for (let h = 0.60; h < 1; h += 0.01) {
        __setTime(d + h);
        if (marketAmt(x, y) >= 1) { SUNT = sunWarp(h); if (daylight(SUNT).lit > 0.4) { tLit = d + h; break; } }
      }
      if (tShut !== null && tLit !== null) break;
    }
    return { x, y, ink: best.ink, mkts: mkts.length, tOpen: best.tOpen, tShut, tLit, hDay };
  }, { seed, FREEZE_S: FREEZE.toString() });
  await p0.close();

  if (plan.none) { console.log(`seed ${seed}: NO MARKET`); continue; }
  console.log(`\nseed ${seed}: ${plan.mkts} markets · host @${plan.x},${plan.y} (${plan.ink}px ink)`
    + ` · pins open=${plan.tOpen?.toFixed(3)} shut=${plan.tShut?.toFixed(3)} lit=${plan.tLit?.toFixed(3)}`);

  /* ---- pass 2: shoot BOTH builds at the identical hex + identical pins ---- */
  for (const [tok, which] of Object.entries(MAP[seed])) {
    const src = which === 'patch' ? PATCH : HEAD;
    const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
    await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
      Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
    await p.goto(pathToFileURL(src).href);
    await p.waitForFunction(() => window.__census !== undefined);
    await p.evaluate(({ seed, FREEZE_S, HOOK_S }) => {
      eval('(' + FREEZE_S + ')')(seed); eval('(' + HOOK_S + ')')();
    }, { seed, FREEZE_S: FREEZE.toString(), HOOK_S: HOOK.toString() });

    /* `shut` is the ONLY discriminating frame: at tOpen and tLit the patch's levers
       collapse to HEAD's literals (marketAmt===1 ⇒ up===1 ⇒ the identical six prisms),
       so those pairs are byte-identical BY CONSTRUCTION -- that is the fixed point, not
       a broken camera. They are shot as ORIENTING frames (what a trading square looks
       like), and `city` is the required un-zoomed whole-plate read. */
    for (const [name, t, z] of [['open', plan.tOpen, 7.5], ['shut', plan.tShut, 7.5],
                                ['lit', plan.tLit, 7.5], ['city', plan.tShut, 1]]) {
      if (t === null || t === undefined) { console.log(`  (no ${name} pin)`); continue; }
      const cap = await p.evaluate(({ x, y, t, z }) => {
        __setTime(t);
        zoom = z; scale = fitScale * zoom;                 // 269: zoom in, scale derived
        if (z > 1) {
          const [wx, wy] = ctr(x, y);                      // 272(b): pan to the HOST's ctr()
          offX = cvs.clientWidth / 2 - wx * scale;
          offY = cvs.clientHeight / 2 - wy * scale;
          clampPan();
        } else { offX = fitX; offY = fitY; }
        window.__at = x + ',' + y; window.__n = 0;
        render();
        window.__at = null;
        lastSky = 0; syncSky(performance.now()); syncStats();   // 204: the DOM does not follow a frozen clock
        const c = cellAt(x, y);
        const amt = (typeof marketAmt === 'function') ? marketAmt(x, y).toFixed(2) : 'n/a';
        return `market@${x},${y} HOST=${c.t === T.MARKET ? 'PRESENT' : 'GONE'}`
          + ` · stalls issued=${window.__n} · marketAmt=${amt}`
          + ` · day=${Math.floor(dayT)} dayT=${(dayT % 1).toFixed(3)} LITAMT=${LITAMT.toFixed(2)}`;
      }, { x: plan.x, y: plan.y, t, z });
      const f = join(OUT, `s${seed}-${tok}-${name}.png`);
      /* 204: a ~30px stall in a 1400x900 frame is a needle you are asking an agent to
         find. The square is panned to the viewport centre, so clip tightly around it. */
      const clip = z > 1 ? { x: 700 - 190, y: 450 - 140, width: 380, height: 280 } : undefined;
      await p.screenshot({ path: f, ...(clip ? { clip } : {}) });   // 200: DOM-composited
      console.log(`  ${f.replace(/.*\//, '').padEnd(24)} ${cap}`);
    }
    await p.close();
  }
}
await b.close();
console.log(`\nMAP (do NOT give this to the agents):`);
for (const [s, m] of Object.entries(MAP)) console.log(`  seed ${s}: ` +
  Object.entries(m).map(([k, v]) => `${k}=${v}`).join('  '));
