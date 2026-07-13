/* 249 — THE FERRY-CALL CAMERA.
 *
 * The claim is "she comes ALONGSIDE the pier head", which is a claim about the water the
 * eye sees between her hull and the deck (205 — state it in the viewer's units, not in
 * the design constant's). So the frames must show her ABEAM the head, in both builds, on
 * the IDENTICAL hex.
 *
 * No argmax is needed to aim: unlike a buried ground-level ornament (226), the host's
 * position is PUBLISHED world data — `pier.x1, pier.y` — and she floats on open water,
 * where nothing can occlude her. ctr(pier.x1, pier.y) IS the located host (201).
 *
 * The pair is made comparable by pinning her ROW, not by running the clock: ferryFr is a
 * pure function of f.y, so freezing at `f.y = pier.y` puts the patched ferry exactly at
 * her berth (ferryApp = 1) and the HEAD ferry exactly abeam it, out in her cruising lane.
 * Same world, same instant, same camera — the ONLY difference is the call.
 *
 * shoot.mjs cannot do this (its clock drifts while it waits, 139/202), so we freeze
 * in-page, force the DOM (204), render once with no wait, and use page.screenshot() (200).
 * Files are NAMED, never lettered (239), and the agents are asked to LOCATE, not judge (108).
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));

const SRC  = resolve(process.env.SRC || join(HERE, '../../../../solvista.html'));
const TAG  = process.env.TAG || 'patch';          /* names the FILE, so the agent reports per file */
const SEED = Number(process.argv[2] || 42);
const OUT  = resolve(process.argv[3] || join(HERE, 'shots/ferry'));
mkdirSync(OUT, { recursive: true });

const VW = 1400, VH = 900;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: VW, height: VH } });
await page.addInitScript(() => {                   /* 213: stub before the page's own script */
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await page.goto('file://' + SRC + '?seed=' + SEED);
await page.waitForTimeout(400);

/* freeze the world once; every frame below is the same instant, the ferry apart */
const world = await page.evaluate(({ seed }) => {
  playing = false; genWorld(seed); __warp(61);
  STARS.length = 0; flock = null;                  /* 163/199: the per-load noise floor */
  time = 100; waveT = 100;
  /* park her ABEAM the head. On the patch ferryApp(f)=1 here, so she is fully alongside
     and `dwell` puts her wake to rest; on HEAD these fields do not exist and she is drawn
     out on her cruising lane — which is exactly the contrast under test. The second ferry
     is sent to the far end of the bay IN BOTH BUILDS so she cannot wander into frame. */
  const f = ferries[0];
  f.y = pier.y; f.dwell = 9; f.call = 1;
  if (ferries[1]) ferries[1].y = (pier.y > (SEAY0 + SEAY1) / 2) ? SEAY0 + 3 : SEAY1 - 3;
  const c = ctr(pier.x1, pier.y);
  return { px1: pier.x1, py: pier.y, wx: c[0], wy: c[1] };
}, { seed: SEED });

async function shoot(name, t, zoom) {
  const st = await page.evaluate(({ t, zoom, wx, wy, VW, VH }) => {
    if (zoom) { scale = zoom; offX = VW / 2 - wx * zoom; offY = VH / 2 - wy * zoom; }
    else { scale = fitScale; offX = fitX; offY = fitY; }
    __setTime(t); CCACHE = {};
    lastSky = 0; syncSky(performance.now()); syncStats();   /* 204: a frozen clock does not refresh the DOM */
    render();
    const f = ferries[0];
    /* SELF-REPORT IN THE VIEWER'S UNITS (236): the gap a viewer can actually see, in
       cells of open water between her hull and the pier head — not the rule's internals. */
    const fr = (typeof ferryFr === 'function') ? ferryFr(f) : f.fr;
    const gap = seaXFr(f.y, fr) - pier.x1;
    return { t: +t.toFixed(2), lit: +LITAMT.toFixed(2), scale: +scale.toFixed(2),
             gap: +gap.toFixed(2), calls: (typeof ferryPier === 'function') };
  }, { t, zoom, wx: world.wx, wy: world.wy, VW, VH });
  const f = join(OUT, `${name}-${TAG}.png`);
  await page.screenshot({ path: f });
  console.log(`  ${(name + '-' + TAG).padEnd(22)} t=${st.t} LITAMT=${st.lit} scale=${st.scale}  `
            + `gap hull→pier head = ${st.gap} cells  ${st.calls ? '(build CAN call)' : '(build cannot call)'}  → ${f}`);
  return st;
}

console.log(`seed ${SEED}: pier head at hex (${world.px1}, ${world.py}); camera aimed there.`);
await shoot('pier-day',   0.30, 5.5);
await shoot('pier-night', 0.92, 5.5);
await shoot('city-day',   0.30, 0);      /* the un-zoomed whole-frame read — always take one */

await browser.close();
