/* shot-corner — the camera for iter 281's corner shop.
 *
 * A genuinely BLIND HEAD-vs-patch pair, and that is honest here BECAUSE the lap draws
 * zero rng() and writes no terrain: both builds generate the IDENTICAL city with the
 * shops on the IDENTICAL hexes (census: every metric +0). So both builds' argmaxes land
 * on the same host and the pair frames the same wall.
 *
 * AIMED BY MEASURED INK (226/272), never by a tile predicate:
 *   - suppress the shops IN ONE PAGE (230: clear every c.corner), re-render, diff;
 *     the changed pixels ARE the shopfronts, at a floor of exactly 0, off the final
 *     composited canvas, so occlusion is checked for free.
 *   - SETTLE THE HEIGHTS first (272: render() mutates c.h, so an unsettled world makes
 *     the two-render floor the size of the signal).
 *   - score each corner HOME by the ink in ITS OWN neighbourhood and take the argmax
 *     over HOSTS, then pan to THAT host's ctr() (272: an ink window's centre need not
 *     sit on any host).
 *   - sum at FULL RESOLUTION (the feature is sparse: a stride would sample noise).
 *   - zero the ink inside the HUD boxes first (200: a canvas diff scores ink hidden
 *     behind .placard exactly as brightly as ink in open ground).
 *
 * Pins are DERIVED from the artifact's own light curve at the year being shot (264),
 * never typed. `__setTime(t)` only assigns dayT — SUNT/LITAMT are recomputed inside
 * render() (274) — so derive with `SUNT = sunWarp(t); daylight(SUNT).lit`.
 *
 * Drives `zoom`, NEVER `scale` (269: there is no setZoom; the contract is
 * `zoom=n; scale=fitScale*zoom`).
 *
 * Frames are named BY FILE with MEANINGLESS, NON-ORDINAL tokens and the HEAD/patch map
 * is CROSSED between seeds (238/239/268), so neither position nor alphabet carries the
 * answer. Every frame SELF-REPORTS its own state (202) — including how many corner shops
 * are standing in the frame, in the viewer's units (236).
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { mkdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));

const PATCH = join(HERE, '../../../../solvista.html');
const HEADF = process.env.HEAD || '/tmp/head281.html';
const OUT = process.env.OUT || join(HERE, '../shots/corner');
mkdirSync(OUT, { recursive: true });

const ERA = 2035;
/* meaningless tokens, and the map is CROSSED between the seeds */
const PLAN = [
  { seed: 42, kappa: PATCH, sigma: HEADF, kappaIs: 'PATCH', sigmaIs: 'HEAD' },
  { seed: 7,  kappa: HEADF, sigma: PATCH, kappaIs: 'HEAD',  sigmaIs: 'PATCH' },
];

const b = await chromium.launch();

async function frame(src, seed, tag, aim) {
  const p = await b.newPage();
  await p.setViewportSize({ width: 1400, height: 900 });
  await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
  await p.goto(pathToFileURL(src).href);
  await p.waitForTimeout(400);

  const info = await p.evaluate(([seed, era, aim]) => {
    playing = false;                       /* stops the day clock AND the year clock */
    genWorld(seed);
    __warp(era - 1974);
    if (typeof __setWind === 'function') __setWind(0.5);   /* WINDA is a third clock (275/280) */
    time = 1000; waveT = 500;                              /* 195(f) */
    STARS.length = 0; flock = null;                        /* 163(d) / 199 */
    for (const c of cells) if (c.h < c.th) c.h = c.th;     /* 272: render() mutates the world */

    /* --- derive the light pins from the artifact's OWN curve at THIS year (264) --- */
    let dayT_ = 0, nightT_ = 0, loLit = 1e9, hiLit = -1e9;
    for (let t = 0; t < 1; t += 0.005) {
      const lit = daylight(sunWarp(t)).lit;
      if (lit < loLit) { loLit = lit; dayT_ = t; }         /* full daylight: no lamps on */
      if (lit > hiLit) { hiLit = lit; nightT_ = t; }       /* deep night: the fascia glows */
    }

    /* --- count what is standing, in the viewer's units --- */
    const HOMESET = [T.RES, T.MID];
    const midTail = drawBuilding.toString().split('else if(c.t===T.MID)')[1] || '';
    const drawsMidShop = /c\.corner/.test(midTail);
    const hosts = [];
    let onRes = 0, onMid = 0;
    for (const i of HEXI) {
      const c = cells[i];
      if (!c.corner || !HOMESET.includes(c.t)) continue;
      if (c.t === T.RES) onRes++; else onMid++;
      if (c.t === T.RES || drawsMidShop) hosts.push({ x: i % G, y: (i / G) | 0, mid: c.t === T.MID });
    }
    const shown = onRes + (drawsMidShop ? onMid : 0);

    window.__pins = { dayT_, nightT_, drawsMidShop, onRes, onMid, shown, hosts };
    return { dayT_, nightT_, drawsMidShop, onRes, onMid, shown, nhosts: hosts.length };
  }, [seed, ERA, aim]);

  /* --- AIM: argmax of the shops' OWN measured ink, over HOSTS (only when not given one) --- */
  let world = aim === 'city' ? null : aim;
  if (!world && aim !== 'city') {
    world = await p.evaluate(([t]) => {
      __setTime(t); render();
      const W = cvs.width, H = cvs.height, g = cvs.getContext('2d');
      const A = g.getImageData(0, 0, W, H).data;
      const saved = [];
      for (const i of HEXI) if (cells[i].corner) { saved.push(i); cells[i].corner = false; }
      render();
      const B = g.getImageData(0, 0, W, H).data;
      for (const i of saved) cells[i].corner = true;
      render();

      /* the ink map, at FULL resolution (the feature is sparse) */
      const ink = new Float32Array(W * H);
      for (let i = 0, p2 = 0; i < A.length; i += 4, p2++) {
        const d = Math.max(Math.abs(A[i] - B[i]), Math.abs(A[i+1] - B[i+1]), Math.abs(A[i+2] - B[i+2]));
        if (d > 8) ink[p2] = d;
      }
      /* 200: zero the ink hidden behind the HUD — a canvas diff cannot see the DOM */
      const dpr = window.devicePixelRatio || 1;
      for (const sel of ['.placard', '.census', '.controls']) {
        const el = document.querySelector(sel); if (!el) continue;
        const r = el.getBoundingClientRect();
        for (let yy = Math.max(0, r.top * dpr | 0); yy < Math.min(H, r.bottom * dpr); yy++)
          for (let xx = Math.max(0, r.left * dpr | 0); xx < Math.min(W, r.right * dpr); xx++)
            ink[yy * W + xx] = 0;
      }
      /* score each HOST by the ink in ITS OWN neighbourhood, then pan to that host's ctr() */
      const R = 46 * dpr;
      let best = null, bestScore = -1;
      for (const h of window.__pins.hosts) {
        const [wx, wy] = ctr(h.x, h.y);
        const sx = (wx * scale + offX) * dpr, sy = (wy * scale + offY) * dpr;
        let s = 0;
        for (let yy = Math.max(0, sy - R | 0); yy < Math.min(H, sy + R); yy++)
          for (let xx = Math.max(0, sx - R | 0); xx < Math.min(W, sx + R); xx++)
            s += ink[yy * W + xx];
        if (s > bestScore) { bestScore = s; best = h; }
      }
      if (!best) return null;
      const [wx, wy] = ctr(best.x, best.y);
      return { wx, wy, mid: best.mid, score: Math.round(bestScore) };
    }, [info.dayT_]);
  }

  for (const [phase, t] of [['day', info.dayT_], ['night', info.nightT_]]) {
    await p.evaluate(([t, world, phase, info]) => {
      __setTime(t);
      if (world) { zoom = 4.4; scale = fitScale * zoom;      /* 269: drive zoom, never scale */
        offX = innerWidth / 2 - world.wx * scale;
        offY = innerHeight / 2 - world.wy * scale;
        if (typeof clampPan === 'function') clampPan(); }
      render();
      lastSky = 0; syncSky(performance.now()); syncStats();   /* 204: the DOM does not follow a frozen clock */
      let cap = document.getElementById('__cap');
      if (!cap) { cap = document.createElement('div'); cap.id = '__cap';
        cap.style.cssText = 'position:fixed;right:8px;top:8px;z-index:99;background:#000c;color:#fff;'
          + 'font:11px monospace;padding:6px 8px;border-radius:4px;white-space:pre;text-align:right';
        document.body.appendChild(cap); }
      const SUNT_ = sunWarp(t);
      cap.textContent =
        `${phase}  dayT=${t.toFixed(3)}  LITAMT=${daylight(SUNT_).lit.toFixed(2)}\n`
        + `CORNER SHOPS STANDING IN THIS CITY: ${info.shown}\n`
        + `  on a house (RES): ${info.onRes}   on a walk-up (MID): ${info.drawsMidShop ? info.onMid : 0}\n`
        + (world ? `centred on a ${world.mid ? 'WALK-UP (MID)' : 'HOUSE (RES)'} with a shop` : 'whole city, un-zoomed');
    }, [t, world, phase, info]);
    await p.screenshot({ path: join(OUT, `s${seed}-${tag}-${phase}${world ? '' : '-city'}.png`) });
  }
  await p.close();
  return { info, world };
}

for (const pl of PLAN) {
  /* aim on the PATCH (it has the shops), then force the SAME world point onto the other
     build, so the pair is blind and frames the identical hex */
  const patchSrc = pl.kappaIs === 'PATCH' ? pl.kappa : pl.sigma;
  const a = await frame(patchSrc, pl.seed, '__aim');
  const aim = a.world;
  const k = await frame(pl.kappa, pl.seed, 'kappa', aim);
  const s = await frame(pl.sigma, pl.seed, 'sigma', aim);
  await frame(pl.kappa, pl.seed, 'kappa', 'city');   /* un-zoomed whole city */
  await frame(pl.sigma, pl.seed, 'sigma', 'city');
  console.log(`seed ${pl.seed}: kappa=${pl.kappaIs} sigma=${pl.sigmaIs} | aim=(${aim ? aim.wx.toFixed(0) + ',' + aim.wy.toFixed(0) : 'none'}) ${aim && aim.mid ? 'MID' : 'RES'}`);
  console.log(`   kappa shown=${k.info.shown} (res ${k.info.onRes} / mid ${k.info.drawsMidShop ? k.info.onMid : 0})`);
  console.log(`   sigma shown=${s.info.shown} (res ${s.info.onRes} / mid ${s.info.drawsMidShop ? s.info.onMid : 0})`);
}
await b.close();
console.log('\nshots ->', OUT);
