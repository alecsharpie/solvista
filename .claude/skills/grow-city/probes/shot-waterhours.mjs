/* shot-waterhours — the camera for the water crowd's hour.
 *
 * The expected result at NIGHT is an ABSENCE (the river empties), and 258's law is that an
 * absent subject and a correctly-negative subject RENDER THE SAME FRAME. So:
 *   - every frame SELF-REPORTS its host's presence (kayaks drawn / kayaks in the city),
 *   - the DAY frame is a REQUIRED POSITIVE TWIN: both builds must show all 9 paddlers and be
 *     INDISTINGUISHABLE. If an agent can tell the day frames apart, the patch has leaked
 *     into daylight and the lap is wrong.
 *
 * Genuinely BLIND: the lap draws zero rng() and changes no terrain, so both builds generate
 * the IDENTICAL city with the kayaks on the IDENTICAL hexes -- both argmaxes independently
 * land on the same water. Frames are named BY FILE with MEANINGLESS, NON-ORDINAL tokens and
 * the HEAD/patch map is CROSSED between seeds (238/239/268).
 *
 * AIMED BY MEASURED INK (226/272): suppress drawKayak in ONE page, diff, score each KAYAK by
 * the ink in its OWN neighbourhood, take the argmax over HOSTS, then pan to THAT kayak's own
 * drawn position. Ink chooses WHICH; the entity's own _sx/_sy supplies WHERE.
 * Pins are DERIVED from the light curve at the year being shot, never typed (264/271).
 * Drives `zoom`, never `scale` (269/275). page.screenshot(), because the HUD is DOM (200).
 */
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { homedir } from 'os';
import { mkdirSync } from 'fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));

const OUT = process.argv[3] || join(HERE, '../shots/water');
const SEED = +(process.argv[2] || 42);
const WARP = 61;
const DRYPEAK = 2035.62;

/* crossed between seeds, so "the fix is always the second one" fails on one of them */
const MAP = SEED === 42 ? { kappa: 'patch', sigma: 'head' }
                        : { kappa: 'head', sigma: 'patch' };

mkdirSync(OUT, { recursive: true });

const shoot = async (token, src, seed) => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  /* addInitScript fixes the PRNG *function*, but its STREAM POSITION keeps advancing -- so a
     SECOND genWorld() draws different Math.random values and respawns the kayaks somewhere
     ELSE (they are a Math.random-spawned class). The aim pass and the shot pass would then
     build two DIFFERENT cities and the camera would aim at a boat that no longer exists.
     It did exactly that, and the two builds duly rendered an identical empty crop. So the
     stream must be RE-SEEDED in-page before EVERY genWorld (248). */
  await page.addInitScript(() => {
    window.__reseed = () => {
      let s = 0x51F3A9C >>> 0;
      Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    };
    window.__reseed();
  });
  await page.goto('file://' + src);
  await page.waitForFunction(() => typeof window.__warp === 'function');

  /* ---- freeze, then AIM by the argmax of the kayaks' own measured ink ---- */
  const aim = await page.evaluate(({ seed, warp, year }) => {
    __reseed();                                          /* 248: same stream => same city */
    playing = false; time = 0; waveT = 0;
    genWorld(seed); __warp(warp);
    STARS.length = 0; flock = null;
    if (typeof __setWind === 'function') __setWind(0.5);
    for (const c of cells) if (c.h < c.th) c.h = c.th;   /* 272 */

    /* aim on the DAY frame: every kayak is out in both builds, so the aim is build-blind */
    __setYear(year); __setTime(0.42);
    zoom = 1; scale = fitScale * zoom; offX = fitX; offY = fitY;

    const cv = document.querySelector('canvas'), C = cv.getContext('2d');
    const grab = () => { render(); return C.getImageData(0, 0, cv.width, cv.height).data; };
    const A = grab();
    const ok = drawKayak; drawKayak = () => {}; const B = grab(); drawKayak = ok;
    render();                                            /* leave the page as shipped */

    const dpr = window.devicePixelRatio || 1, W = cv.width;
    /* sum at FULL resolution -- the kayaks are sparse (272) */
    const ink = new Float32Array(cv.width * cv.height);
    for (let i = 0, p = 0; i < A.length; i += 4, p++) {
      const d = Math.abs(A[i] - B[i]) + Math.abs(A[i + 1] - B[i + 1]) + Math.abs(A[i + 2] - B[i + 2]);
      if (d > 8) ink[p] = 1;
    }
    /* score each KAYAK by the ink in its OWN neighbourhood, then pan to that kayak */
    const R = 26 * dpr;
    let best = null, bestInk = -1;
    for (const k of kayaks) {
      if (k._sx === undefined) continue;
      const dx = (k._sx * scale + offX) * dpr, dy = (k._sy * scale + offY) * dpr;
      let s = 0;
      for (let y = Math.max(0, dy - R | 0); y < Math.min(cv.height, dy + R); y++)
        for (let x = Math.max(0, dx - R | 0); x < Math.min(W, dx + R); x++) s += ink[y * W + x];
      if (s > bestInk) { bestInk = s; best = k; }
    }
    return { wx: best._sx, wy: best._sy, bestInk, n: kayaks.length };
  }, { seed, warp: WARP, year: DRYPEAK });

  /* ---- shoot: night (treatment), day (required positive twin), city (un-zoomed whole frame) ---- */
  for (const hour of ['day', 'night', 'city']) {
    const meta = await page.evaluate(({ seed, warp, year, hour, wx, wy }) => {
      __reseed();                                          /* 248: same stream => same city */
      playing = false; time = 0; waveT = 0;
      genWorld(seed); __warp(warp);
      STARS.length = 0; flock = null;
      if (typeof __setWind === 'function') __setWind(0.5);
      for (const c of cells) if (c.h < c.th) c.h = c.th;
      __setYear(year);

      /* DERIVE the pin from the curve AT THIS YEAR -- sunWarp makes the light a function of
         BOTH dayT and year, so a pin searched at another season is a literal (264/271). */
      let t = 0.42;
      if (hour !== 'day') {
        let bestA = -1;
        for (let i = 0; i < 400; i++) {
          const tt = i / 400; __setTime(tt); render();
          if (nightAmt() > bestA) { bestA = nightAmt(); t = tt; }
        }
      }
      __setTime(t);

      if (hour === 'city') {                            /* the whole plate, un-zoomed */
        zoom = 1; scale = fitScale * zoom; offX = fitX; offY = fitY;
      } else {
        zoom = 5.2; scale = fitScale * zoom;            /* drive zoom, never scale (269) */
        const dpr = window.devicePixelRatio || 1;
        const mid = document.querySelector('canvas').width / (2 * dpr);
        const midY = document.querySelector('canvas').height / (2 * dpr);
        offX = mid - wx * scale; offY = midY - wy * scale;
        if (typeof clampPan === 'function') clampPan();
      }

      render();                                          /* render BEFORE the DOM sync (261) */
      lastSky = 0; syncSky(performance.now()); syncStats();   /* 204 */

      /* SELF-REPORT: the host's presence, in the viewer's units (236/258) */
      let drawn = 0;
      for (const k of kayaks) {
        if (typeof waterSession === 'function' && typeof waterOut === 'function') {
          if (waterSession() >= waterOut(k)) drawn++;
        } else drawn++;                                   /* HEAD: no gate, all of them */
      }
      /* WHERE DID THE TARGET ACTUALLY END UP? clampPan() moves it (272's law), so the
         viewport centre is NOT the aim. Report the aimed kayak's real screen position and
         clip around THAT -- a fixed clip on a rim target lands on empty water, and two
         builds render empty water IDENTICALLY (which is exactly how this camera lied once). */
      /* ...and prove the aim still POINTS AT A BOAT in THIS world. If the aim pass and the
         shot pass ever build different cities again, this goes large and the tool says so
         instead of an agent having to (202). By day it must be ~0. */
      let miss = 1e9;
      for (const k of kayaks)
        if (k._sx !== undefined) miss = Math.min(miss, Math.hypot(k._sx - wx, k._sy - wy));

      return { t, drawn, n: kayaks.length, nightAmt: +nightAmt().toFixed(3),
               sx: wx * scale + offX, sy: wy * scale + offY, miss,
               kites: kites.length, LITAMT: +LITAMT.toFixed(3) };
    }, { seed, warp: WARP, year: DRYPEAK, hour, wx: aim.wx, wy: aim.wy });

    const f = join(OUT, `s${seed}-${token}-${hour}.png`);
    /* CLIP TIGHTLY on the close-ups (204/285): a ~70px kayak in a 1400x900 frame is a
       needle you are asking an agent to find, and that alone has FAILed a gate before.
       Clip around the target's REAL post-clampPan position, never the viewport centre. */
    const W = 500, H = 360;
    let clip;
    if (hour !== 'city') {
      const x = Math.max(0, Math.min(1400 - W, meta.sx - W / 2));
      const y = Math.max(0, Math.min(900 - H, meta.sy - H / 2));
      clip = { x, y, width: W, height: H };
      const inside = meta.sx >= x && meta.sx <= x + W && meta.sy >= y && meta.sy <= y + H;
      if (!inside) throw new Error(`AIM ESCAPED THE CROP: target (${meta.sx.toFixed(0)},${meta.sy.toFixed(0)}) outside clip — the camera is lying, fix it before shooting`);
    }
    await page.screenshot({ path: f, clip });             /* DOM-composited (200) */
    console.log(`  ${f}`);
    console.log(`      t=${meta.t.toFixed(3)}  nightAmt=${meta.nightAmt}  ` +
                `KAYAKS DRAWN ${meta.drawn}/${meta.n}  ` +
                `aim@(${meta.sx.toFixed(0)},${meta.sy.toFixed(0)})  aim-miss ${meta.miss.toFixed(1)}w` +
                `${hour !== 'city' ? '  clip@(' + clip.x.toFixed(0) + ',' + clip.y.toFixed(0) + ')' : ''}`);
    if (hour === 'day' && meta.miss > 3)
      throw new Error(`AIM MISSED EVERY BOAT by ${meta.miss.toFixed(1)} world px — the aim pass and the shot pass built different cities. Fix the rig, do not shoot.`);
  }
  await browser.close();
};

const HEADSRC = '/tmp/head.html';
console.log(`seed ${SEED}   map: ${JSON.stringify(MAP)}  (crossed between seeds)`);
for (const [token, build] of Object.entries(MAP))
  await shoot(token, build === 'head' ? HEADSRC : join(HERE, '../../../../solvista.html'), SEED);
