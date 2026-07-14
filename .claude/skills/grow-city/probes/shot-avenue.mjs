/* shot-avenue — the streetcar's camera.
 *
 * A STILL FRAME CANNOT SHOW A VERB (258): "she rides the avenue" is a claim about
 * motion, and a moving tram and a wandering tram are the same pixels. So the camera
 * does NOT try to photograph the riding — it photographs the STATE the riding leaves
 * behind: WHERE THE STREETCARS ARE STANDING once the route has reached steady state.
 *
 * THE CONTROL IS UNUSUALLY CLEAN, and it is what makes this a real blind A/B: the
 * change touches NO TERRAIN (the tram spawn draws Math.random, never the seeded rng),
 * so `roads` and `c.flow` are BYTE-IDENTICAL between HEAD and patch — census reads
 * roads +0, arterials +0. The avenue network is THE SAME CITY in both frames. Both
 * cameras therefore aim at the same world point (the centroid of the largest arterial
 * component), and the ONLY thing that differs in the crop is where the trams sit.
 *
 * WHAT THE AGENT CAN CHECK, unaided (the artifact's own visual language):
 *   - an AVENUE is drawn with a SOLID, doubled centre line (`the trunk is drawn solid`)
 *   - an ordinary street gets only short dashed spokes
 *   - a STREETCAR is brick-red, with a cream livery belt, a pantograph and the
 *     overhead contact wire strung above it
 * So "is that tram on an avenue?" is a LOCATE question (108) with an answer key I
 * hold and it does not.
 *
 * THE CAPTION SELF-REPORTS THE HOST'S PRESENCE (258 — `trams in frame: N`) so an
 * empty crop cannot pass as a correct one, but it does NOT report the treatment
 * metric: that is the thing the agent must determine BY LOOKING.
 *
 * Frames are named BY FILE (239), the HEAD/patch map is CROSSED between seeds (238),
 * and the tokens are MEANINGLESS, not ordinal (268: `one`/`two` carry the same order
 * `A`/`B` do, and both agents duly agreed with the POSITION).
 *
 * The light pin is DERIVED from the shipped curve, never typed (264): solar noon is
 * the midpoint of the artifact's own sunrise/sunset, bisected off sunWarp/SUNUP/SUNDN.
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;

const HERE = dirname(fileURLToPath(import.meta.url));
const PATCH = join(HERE, '../../../../solvista.html');
const HEADF = '/tmp/avenue-head.html';
execSync(`cd ${dirname(PATCH)} && git show HEAD:solvista.html > ${HEADF}`);

const OUT = process.argv[2] || join(HERE, '../shots/avenue');
mkdirSync(OUT, { recursive: true });

const YEAR = 2035, STEADY = 600;      /* sim-seconds: let the ROUTE reach steady state */
/* CROSS the mapping between seeds (238), with MEANINGLESS tokens (268) */
const SEEDS = [
  { seed: 42, map: { kappa: PATCH, sigma: HEADF } },
  { seed: 7, map: { kappa: HEADF, sigma: PATCH } },
];

const browser = await chromium.launch();
const truth = {};

for (const { seed, map } of SEEDS) {
  for (const [tok, src] of Object.entries(map)) {
    const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
    await page.addInitScript(() => {
      let s = 0x51F3A9C >>> 0;
      Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    });
    await page.goto(pathToFileURL(src).href);
    await page.waitForFunction(() => window.__census !== undefined);

    const state = await page.evaluate(({ seed, year, steady }) => {
      let s = 0x51F3A9C >>> 0;
      Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
      playing = false;
      genWorld(seed);
      __warp(year - 1974);

      /* SOLAR NOON, derived off the shipped curve — no `t` literal (264). SUNUP/SUNDN
         are thresholds on the WARPED axis SUNT, never on the wall clock (261). */
      const cross = (lo, hi, thr) => {
        for (let i = 0; i < 50; i++) {
          const m = (lo + hi) / 2;
          if (sunWarp(m) < thr) lo = m; else hi = m;
        }
        return (lo + hi) / 2;
      };
      const sunrise = cross(0.001, 0.5, SUNUP), sunset = cross(0.5, 0.999, SUNDN);
      const noon = (sunrise + sunset) / 2;
      __setTime(noon);

      /* drive the artifact's OWN step loop to steady state (249: never re-implement
         the rule under test). The spawn effect washes out; what is left is the ROUTE. */
      for (let i = 0; i < steady * 30; i++) advanceEntities(1 / 30, 1);

      /* aim: the centroid of the LARGEST arterial component. Terrain is identical in
         both builds, so this is the same hex in every frame — a fixed, blind camera. */
      const isArt = (x, y) => { const c = cellAt(x, y); return !!c && c.t === T.ROAD && c.flow >= ARTFLOW; };
      const seen = new Set(); let best = [];
      for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
        if (!isArt(x, y) || seen.has(x + ',' + y)) continue;
        const comp = [], st = [[x, y]]; seen.add(x + ',' + y);
        while (st.length) {
          const [cx, cy] = st.pop(); comp.push([cx, cy]);
          for (const [dx, dy] of nbrDirs(cy)) {
            const nx = cx + dx, ny = cy + dy, k = nx + ',' + ny;
            if (!seen.has(k) && isArt(nx, ny)) { seen.add(k); st.push([nx, ny]); }
          }
        }
        if (comp.length > best.length) best = comp;
      }
      const wx = best.reduce((a, c) => a + ctr(c[0], c[1])[0], 0) / best.length;
      const wy = best.reduce((a, c) => a + ctr(c[0], c[1])[1], 0) / best.length;

      /* GROUND TRUTH — the answer key. Never printed on the whole-city frame. */
      const onAve = trams.filter(v => isArt(v.x, v.y)).length;

      /* The CLOSE-UP aims at each build's OWN streetcar (244) — the one nearest the
         big avenue — because the whole point is that HEAD's tram may be nowhere near
         it, and forcing HEAD to the patch's hex would frame an empty street (258: an
         absent subject and a correctly-negative one render the same crop). This frame
         is the LEGIBILITY read, NOT the blind treatment gate: it asks whether a
         streetcar sits correctly on its rails, so its caption may name what it stands
         on. The blind gate is the whole-city frame above. */
      /* Aim at a streetcar that IS on an avenue when this build has one — that is the
         STATE the behaviour leaves behind, and it is the whole point of the frame. When
         the build has none (HEAD, routinely), aim at the nearest tram and let the
         caption SAY SO: that negative frame is the discriminating twin (258/264), not
         a failure of the camera. */
      /* ⚠ AIM BY MEASURED INK (226), NEVER BY A PREDICATE — and this is 258's law biting
         exactly as written. My first cut aimed at "the tram nearest the BIGGEST avenue";
         but the biggest avenue is the highest-flow trunk, which is DOWNTOWN, among the
         TOWERS — so the aiming predicate was POSITIVELY CORRELATED WITH OCCLUSION and
         framed the single most BURIED streetcar in the city by construction. Two agents
         duly failed a frame whose centre was a tower. Instead: render with each candidate
         suppressed, diff, and take the ARGMAX — that is where she provably renders, and
         it is the only honest place to point a camera. */
      const cvA = document.querySelector('canvas'), ctxA = cvA.getContext('2d');
      const snap = () => { render(); return ctxA.getImageData(0, 0, cvA.width, cvA.height).data; };
      zoom = 1; scale = fitScale; offX = fitX; offY = fitY;
      const full = snap();
      const pool = trams.filter(v => isArt(v.x, v.y));
      const cands = pool.length ? pool : trams.slice();
      let near = null, bestInk = -1;
      for (const v of cands) {
        const i = trams.indexOf(v);
        const held = trams.splice(i, 1);            /* suppress just this one */
        const without = snap();
        trams.splice(i, 0, ...held);
        let ink = 0;
        for (let p = 0; p < full.length; p += 4) {
          const d = Math.max(Math.abs(full[p] - without[p]), Math.abs(full[p + 1] - without[p + 1]),
                             Math.abs(full[p + 2] - without[p + 2]));
          if (d > 8) ink++;
        }
        if (ink > bestInk) { bestInk = ink; near = v; }
      }
      const nearOn = near ? (isArt(near.x, near.y) ? 'AVENUE (solid centre line)' : 'a side street') : 'NO TRAM';
      /* ⚠ 204's LAW, AND IT COST THIS LAP TWO GATE ROUNDS: aim at the entity's DRAWN
         position (_sx/_sy, recorded by stamp()), NEVER at ctr(x,y). A vehicle is drawn
         INTERPOLATED between its hex and its next hex by v.p, so its hex centre can be a
         whole hex from where it actually appears — four agent reads, on two seeds, all
         reported "no vehicle at frame centre; the candidate is ~100px up-left", which is
         exactly this. render() first so the stamp is fresh. */
      render();
      const [hx, hy] = near ? ctr(near.x, near.y) : [wx, wy];
      const nx0 = near && near._sx !== undefined ? near._sx : hx;
      const ny0 = near && near._sy !== undefined ? near._sy : hy;
      const aimErr = Math.hypot(nx0 - hx, ny0 - hy);   /* the miss, in world units */

      /* whole-city frame first, at the artifact's own fit camera.
         ⚠ THE CAMERA'S CONTRACT IS `zoom`, NOT `scale` — setZoom does
         `scale = fitScale*zoom`, so `scale` is DERIVED. Setting `scale` alone
         renders a zoomed canvas UNDER A HUD THAT STILL SAYS 1x, and an agent that
         reads the pill will (correctly) call the frame un-zoomed and refuse to
         grade it. That cost a full gate round. Drive `zoom` and derive `scale`. */
      zoom = 1; scale = fitScale; offX = fitX; offY = fitY;
      lastSky = 0; syncSky(performance.now()); syncStats();   /* 204: the DOM does not follow a frozen clock */
      render();
      return { noon: +noon.toFixed(3), trams: trams.length, onAve, wx, wy,
               nx: nx0, ny: ny0, nearOn, aimErr: +aimErr.toFixed(1), bestInk,
               comp: best.length, LITAMT: +LITAMT.toFixed(2) };
    }, { seed, year: YEAR, steady: STEADY });

    truth[`s${seed}-${tok}`] = { src: src === PATCH ? 'PATCH' : 'HEAD', ...state };

    /* every frame self-reports the HOST'S PRESENCE (258) and its own camera state
       (202) — but NOT the treatment metric, which is what the agent must find. */
    const cap = (extra) => page.evaluate(({ seed, noon, trams, extra }) => {
      const d = document.createElement('div');
      d.style.cssText = 'position:fixed;bottom:8px;left:50%;transform:translateX(-50%);z-index:9999;' +
        'background:rgba(0,0,0,.82);color:#fff;font:12px monospace;padding:5px 12px;border-radius:4px';
      d.textContent = `seed=${seed} year=2035 t=${noon} (solar noon, derived) · trams in frame: ${trams} · ${extra}`;
      d.id = '__cap'; document.querySelectorAll('#__cap').forEach(e => e.remove());
      document.body.appendChild(d);
    }, { seed, noon: state.noon, trams: state.trams, extra });

    await cap('WHOLE CITY (un-zoomed)');
    await page.screenshot({ path: join(OUT, `s${seed}-${tok}-city.png`) });

    /* close-up centred on THIS build's own streetcar — the LEGIBILITY read (not the
       blind gate), so the caption names what it is standing on and the host is
       provably at the centre of the frame (258). */
    const Z = 7;   /* zoom, in the artifact's OWN units (1 = the fitted diorama) */
    await page.evaluate(({ nx, ny, Z }) => {
      zoom = Z; scale = fitScale * zoom;              /* setZoom's own contract */
      offX = innerWidth / 2 - nx * scale; offY = innerHeight / 2 - ny * scale;
      lastSky = 0; syncSky(performance.now()); syncStats(); render();
    }, { nx: state.nx, ny: state.ny, Z });
    await cap(`${Z}x ZOOM — streetcar at frame centre, standing on: ${state.nearOn}`);
    await page.screenshot({ path: join(OUT, `s${seed}-${tok}-tram.png`) });

    await page.close();
  }
}
await browser.close();

writeFileSync(join(OUT, 'ANSWER-KEY.json'), JSON.stringify(truth, null, 2));
console.log('\nshot-avenue — frames in', OUT, '\n');
console.log('ANSWER KEY (held by the harness; the frames do NOT carry it):\n');
for (const [k, v] of Object.entries(truth)) {
  console.log(`  ${k.padEnd(12)} ${v.src.padEnd(6)}  trams ON AVENUE: ${v.onAve}/${v.trams}` +
    `   (aimed at best-exposed on-avenue tram: ${v.bestInk} px of ink at fit)`);
}
