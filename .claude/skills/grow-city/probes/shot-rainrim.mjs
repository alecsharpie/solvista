/* shot-rainrim — the camera for (ao): does the shower fall past the edge of the land?
 *
 * ⚠ The void backdrop is the BODY's CSS gradient, not the canvas — so a getImageData
 * probe is structurally blind to it (200) and this MUST shoot page.screenshot().
 *
 * Two positions per seed, so the pair is honest rather than flattering:
 *   INLAND — the cloud sits well inside the plate. BOTH builds must rain the same:
 *            this is the CONTROL that the fix did not simply delete the weather.
 *   RIM    — the cloud's centre is 2 hexes inside the rim, so HEAD's centre-gate calls
 *            it a full shower while its foot hangs out over the void. This is the
 *            treatment.
 * Files are named by BUILD, never A/B (239): an A/B letter is a pointer the agent must
 * carry across four images, and pointers get swapped.
 */
import { homedir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));

const SEED = +(process.argv[2] || 42);
const OUT = resolve(process.argv[3] || join(HERE, '../shots/rainrim'));
mkdirSync(OUT, { recursive: true });

const BUILDS = {
  patch: resolve(HERE, '../../../../solvista.html'),
  head: resolve(process.env.HEADSRC || '/tmp/head-solvista.html'),
};

const b = await chromium.launch();
for (const [build, src] of Object.entries(BUILDS)) {
  const page = await b.newPage({ viewport: { width: 1400, height: 900 } });
  await page.addInitScript(() => {
    let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  });
  await page.goto('file://' + src);
  await page.waitForFunction(() => typeof window.__census === 'function');

  for (const where of ['inland', 'rim', 'city']) {
    const st = await page.evaluate(({ seed, where }) => {
      playing = false;                      /* stops BOTH clocks */
      /* 203, sharpened: addInitScript pins the PRNG FUNCTION, but the stream POSITION
         at genWorld still depends on how many RAF frames this page happened to run
         before the freeze — and genWorld respawns a whole class of entities (joggers,
         whales, deer…) from Math.random. Two builds therefore scatter them differently
         and the "unchanged" control reads thousands of px. Re-seed here and the stream
         position is identical in both builds. */
      let _s = 0x2F6E2B1 >>> 0;
      Math.random = () => ((_s = (_s * 1664525 + 1013904223) >>> 0) / 4294967296);
      /* …and pin the CLOCKS before the warp, not after it: __warp runs ticks, and tick
         branches on dayT (the night fleet is thinned by class, 230). At load dayT/time
         hold a wall-clock-dependent value, so two builds warp DIFFERENT populations
         into being and the control reads thousands of px of scattered traffic. */
      time = 0; waveT = 0; dayT = 0;
      genWorld(seed); __warp(61);
      if (typeof STARS !== 'undefined') STARS.length = 0;
      if (typeof flock !== 'undefined') flock = null;
      /* 195(f): playing=false is NOT a frozen clock. `time` and `waveT` keep whatever
         wall-clock value the RAF loop reached before the freeze — and the drops' own
         lineDashOffset reads `time` — so two builds render different water and
         different rain unless these are pinned. Pinned, the INLAND control comes back
         byte-identical across builds, which is what makes the RIM diff readable. */
      time = 0; waveT = 0;
      __setTime(0.30);                      /* day, off the light curve (202) */

      /* pick the cloud on the widest live row, so the rim is well framed */
      let best = null;
      for (const cl of clouds) {
        const gy = cl.y | 0;
        if (!(gy >= 0 && gy < G) || ROWMAX[gy] < ROWMIN[gy]) continue;
        const w = ROWMAX[gy] - ROWMIN[gy];
        if (!best || w > best.w) best = { cl, gy, w, lo: ROWMIN[gy], hi: ROWMAX[gy] };
      }
      const { cl, gy, lo, hi } = best;

      /* ONE cloud rains, at FULL weight; every other cloud is dry, so the frame is
         unambiguous about which shower we are looking at. */
      const wet = rainFront() - WETRAMP - 0.01;
      for (const c of clouds) c.wf = 1e9;
      cl.wf = wet;

      /* the foot trails UPWIND (foot = cx - rlean), so the LEFT rim is where a veil
         spills furthest. Centre 2 hexes inside it = HEAD's gate reads a full shower. */
      cl.x = (where === 'inland') ? lo + 14.0 : lo + 2.0;
      cl.y = gy + 0.5;

      const [wx, wy] = pxc(cl.x, cl.y);
      if (where === 'city') { scale = fitScale; offX = fitX; offY = fitY; }  /* the WHOLE frame */
      else { const zoom = 3.0; scale = zoom; offX = innerWidth / 2 - wx * zoom; offY = innerHeight / 2 - wy * zoom + 120; }
      lastSky = 0; syncSky(performance.now()); syncStats();   /* 204 */
      render();
      return { gy, lo, hi, x: +cl.x.toFixed(2), s: +cl.s.toFixed(2), w: +cloudWet(cl).toFixed(2), LITAMT: +LITAMT.toFixed(2) };
    }, { seed: SEED, where });

    const f = join(OUT, `${where}-${build}.png`);
    await page.screenshot({ path: f });       /* DOM-composited: the void backdrop is CSS */
    console.log(`  ${where.padEnd(6)} ${build.padEnd(5)} seed=${SEED} row=${st.gy} rim=[${st.lo},${st.hi}] cloud.x=${st.x} size=${st.s} shower=${st.w} LITAMT=${st.LITAMT}  → ${f}`);
  }
  await page.close();
}
await b.close();
console.log('\n  INLAND = the control (both builds must rain the same).  RIM = the treatment.');
