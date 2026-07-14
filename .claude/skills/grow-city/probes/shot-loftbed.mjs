/* shot-loftbed.mjs — the camera for cue (at): does the loft go to bed? (iter 274)
 *
 * A genuinely blind HEAD-vs-patch pair is honest HERE (unlike 267's camera, which had
 * to compare in-page): this lap draws ZERO rng() values and changes no terrain, so the
 * two builds generate the IDENTICAL city and the loft stands on the IDENTICAL hex.
 * Terrain, mass, brick and sign band are byte-identical; only the glass differs.
 *
 * 272(a,b,c) — AIMING. The loft is ~2 buildings in a 1.26M-px frame, so:
 *   (a) the ink map is summed at FULL RESOLUTION (a strided argmax cannot see it);
 *   (b) each LOFT is scored by the ink in ITS OWN neighbourhood and we pan to that
 *       loft's ctr() — an ink WINDOW's centre need not sit on any building;
 *   (c) we zoom about the viewport centre and then pan EXPLICITLY (zoomAt+clampPan
 *       strands an edge target), driving `zoom` and never `scale` (269).
 * 200: the ink inside the HUD boxes is zeroed before the argmax, or the camera aims
 * at a loft the viewer cannot see.
 *
 * 258: the expected result at night is an ABSENCE (panes going dark), and a frame that
 * simply MISSED the loft renders exactly like a correct one. So every frame
 * SELF-REPORTS its host's presence and its own state, and the DAY frame is a REQUIRED
 * POSITIVE TWIN: below LITAMT<0.35 winBandR falls back to the identical solid band, so
 * the two day frames MUST be indistinguishable. If an agent can tell them apart, the
 * patch has leaked into daylight.
 *
 * 264/271: no `t` literal. Both night pins are DERIVED in-page by searching the
 * SHIPPED nightDeep() curve AT THE YEAR BEING SHOT (sunWarp makes it a function of
 * year as well as dayT, so a pin searched at the wrong season shoots the control).
 *
 * 238/239/268: frames are named by FILE, with MEANINGLESS tokens (no letters, no
 * ordinals), and the build->token map is CROSSED between the seeds.
 *
 *   node shot-loftbed.mjs <outdir>
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const A1 = join(HERE, '../../../../solvista.html'), A2 = join(HERE, 'solvista.html');
import { existsSync } from 'node:fs';
const PATCH = existsSync(A1) ? A1 : A2;
/* pristine HEAD for the blind pair — derive it, never /bin/cp over the artifact (197):
   git show HEAD:solvista.html > /tmp/head.html && HEAD_SRC=/tmp/head.html node shot-loftbed.mjs */
const HEAD = process.env.HEAD_SRC || '/tmp/head274.html';
const OUT = process.argv[2] || join(HERE, '../shots/loftbed');
mkdirSync(OUT, { recursive: true });

const SEEDS = [7, 42];
/* meaningless tokens, CROSSED between the seeds (268: an ordinal carries an order) */
const MAP = { 7: { kappa: 'patch', sigma: 'head' }, 42: { kappa: 'head', sigma: 'patch' } };

const b = await chromium.launch();

for (const seed of SEEDS) {
  const tokens = MAP[seed];
  for (const [tok, which] of Object.entries(tokens)) {
    const src = which === 'patch' ? PATCH : HEAD;
    const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
    await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
      Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
    await p.goto(pathToFileURL(src).href);
    await p.waitForFunction(() => window.__census !== undefined);

    /* --- freeze the world, locate the best-exposed loft by MEASURED INK --- */
    const info = await p.evaluate((seed) => {
      playing = false;
      genWorld(seed); __warp(2035 - 1974);
      time = 1000; waveT = 500;
      STARS.length = 0; if (typeof flock !== 'undefined') flock = null;
      for (const n of ['vehicles', 'peds', 'dogs', 'boats', 'birds', 'clouds'])
        if (Array.isArray(window[n])) window[n].length = 0;
      for (const c of cells) if (c.h < c.th) c.h = c.th;   /* 272: settle the heights */

      /* Derive every pin from the SHIPPED curve, at the year being shot (264/271).
         ⚠ __setTime() only assigns dayT: SUNT and LITAMT are recomputed ONCE A FRAME,
         INSIDE render() (261), so reading LITAMT straight after __setTime reads the
         PREVIOUS frame's light — which collapsed all four pins onto one instant until
         the frames' own self-report caught it (202). Drive the curve directly. */
      const lightAt = (t) => { SUNT = sunWarp(t); const dl = daylight(SUNT);
        return { lit: dl.lit, nd: nightDeep() }; };
      const findT = (target) => {
        let best = 0, bd = 9;
        for (let t = 0; t < 1; t += 0.001) {
          const L = lightAt(t);
          if (L.lit < 0.35) continue;               /* only where panes are drawn at all */
          const d = Math.abs(L.nd - target);
          if (d < bd) { bd = d; best = t; }
        }
        return best;
      };
      const tDusk = findT(0.18), tLate = findT(0.92);
      /* the day pin: the darkest LITAMT there is (no panes drawn — the dead regime) */
      let tDay = 0, lo = 9;
      for (let t = 0; t < 1; t += 0.001) { const L = lightAt(t); if (L.lit < lo) { lo = L.lit; tDay = t; } }

      const lofts = [];
      for (const i of HEXI) { const c = cells[i];
        if (c.t === T.IND && c.loft) lofts.push([i % G, (i / G) | 0]); }
      if (!lofts.length) return { none: 1 };

      /* --- ink map: isolate each loft by retyping its hex to EMPTY (230), full res --- */
      __setTime(tDusk);
      zoom = 1; scale = fitScale * zoom; offX = fitX; offY = fitY; render();
      const g = cvs.getContext('2d');
      const W = cvs.width, H = cvs.height, dpr = W / cvs.clientWidth;
      const grab = () => g.getImageData(0, 0, W, H).data;
      /* 200: the probe is blind to the DOM — zero the ink under the HUD boxes */
      const boxes = ['.placard', '.census', '.controls'].map(s => document.querySelector(s))
        .filter(Boolean).map(e => { const r = e.getBoundingClientRect();
          return [r.left * dpr, r.top * dpr, r.right * dpr, r.bottom * dpr]; });
      const hud = (X, Y) => boxes.some(([x0, y0, x1, y1]) => X >= x0 && X < x1 && Y >= y0 && Y < y1);

      const A = grab();
      let best = null;
      for (const [x, y] of lofts) {
        const c = cellAt(x, y), kt = c.t, kh = c.h, kth = c.th;
        c.t = T.EMPTY; c.h = 0; c.th = 0; render();
        const B = grab();
        c.t = kt; c.h = kh; c.th = kth;
        let ink = 0;
        for (let i = 0; i < A.length; i += 4) {
          if (A[i] === B[i] && A[i + 1] === B[i + 1] && A[i + 2] === B[i + 2]) continue;
          const px = (i >> 2) % W, py = (i >> 2) / W | 0;
          if (hud(px, py)) continue;                 /* invisible to the viewer */
          ink++;
        }
        if (!best || ink > best.ink) best = { x, y, ink };
      }
      render();
      return { ...best, lofts: lofts.length, tDusk, tLate, tDay };
    }, seed);

    if (info.none) { console.log(`seed ${seed}: NO LOFT`); await p.close(); continue; }

    /* --- shoot: close-up at both night hours + the day twin + the whole city --- */
    for (const [name, t, z] of [['dusk', info.tDusk, 4.2], ['late', info.tLate, 4.2],
                                ['day', info.tDay, 4.2], ['city', info.tLate, 1]]) {
      const cap = await p.evaluate(({ x, y, t, z }) => {
        __setTime(t);
        /* 269: `zoom` is the camera's INPUT and `scale` is DERIVED from it. Setting
           scale directly renders a zoomed canvas under a HUD still reporting 1x. */
        zoom = z; scale = fitScale * zoom;
        if (z > 1) {                                  /* 272(c): pan EXPLICITLY */
          const [wx, wy] = ctr(x, y);
          offX = cvs.clientWidth / 2 - wx * scale;
          offY = cvs.clientHeight / 2 - wy * scale;
          clampPan();
        } else { offX = fitX; offY = fitY; }
        render();
        lastSky = 0; syncSky(performance.now()); syncStats();   /* 204: the DOM does not follow a frozen clock */
        const c = cellAt(x, y);
        return `loft@${x},${y} standing=${c.t === T.IND && c.loft ? 'YES' : 'NO'}`
          + ` · dayT=${dayT.toFixed(3)} nightDeep=${nightDeep().toFixed(2)} LITAMT=${LITAMT.toFixed(2)}`
          + ` · panes ${LITAMT >= 0.35 ? 'DRAWN' : 'NOT drawn (day: solid band)'}`;
      }, { x: info.x, y: info.y, t, z });
      const f = join(OUT, `s${seed}-${tok}-${name}.png`);
      await p.screenshot({ path: f });                /* 200: DOM-composited */
      console.log(`  ${f.replace(/.*\//, '')}  ${cap}`);
    }
    console.log(`seed ${seed} [${tok}] = ${which}  (loft ink ${info.ink}px, ${info.lofts} lofts)`);
    await p.close();
  }
}
await b.close();
console.log('\n--- BUILD MAP (do not show the agent) ---');
for (const s of SEEDS) console.log(`  seed ${s}: ${JSON.stringify(MAP[s])}`);
