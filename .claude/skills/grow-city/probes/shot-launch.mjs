/* 297 — THE HARBOUR-LAUNCH CAMERA.
 *
 * The claim is "a small launch works the ship at anchor" — she runs the short leg between
 * the harbour waterline and the anchored container ship's side. The host is PUBLISHED world
 * data (freighters[0], anchored; her position seaXFr(f.y,f.fr)) floating on open water where
 * nothing occludes her, so ctr of the ship IS the located host (201/249) — no argmax needed.
 *
 * Two close-ups pose the launch at the two states the draw makes: MID-LEG (moving, throwing a
 * wake) and ALONGSIDE (stopped at the ship, wake at rest, night lights lit). Plus the required
 * un-zoomed whole-city frame. Freeze in-page (139/202), force the DOM (204), render with no
 * wait, page.screenshot (200). Files NAMED not lettered (239); every frame self-reports (202).
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));

const SRC  = resolve(process.env.SRC || join(HERE, '../../../../solvista.html'));
const TAG  = process.env.TAG || 'patch';
const SEED = Number(process.argv[2] || 42);
const OUT  = resolve(process.argv[3] || join(HERE, 'shots/launch'));
mkdirSync(OUT, { recursive: true });

const VW = 1400, VH = 900;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: VW, height: VH } });
await page.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await page.goto('file://' + SRC + '?seed=' + SEED);
await page.waitForTimeout(400);

const world = await page.evaluate(({ seed }) => {
  playing = false; genWorld(seed); __warp(61);
  STARS.length = 0; flock = null;
  time = 100; waveT = 100;
  const f = freighters.find(f => f.anchored);
  const sx = seaXFr(f.y, f.fr);
  const c = ctr(sx - 0.6, f.y + 0.3);          // aim between the ship's side and the shore
  return { sx: +sx.toFixed(2), sy: +f.y.toFixed(2), wx: c[0], wy: c[1], nL: launches.length };
}, { seed: SEED });

async function shoot(name, t, zoom, poseT, poseDir) {
  const st = await page.evaluate(({ t, zoom, wx, wy, VW, VH, poseT, poseDir }) => {
    // drive the zoom contract (269): zoom = n; scale = fitScale*zoom; then centre the aim.
    if (zoom) { window.zoom = zoom; scale = fitScale * zoom; offX = VW / 2 - wx * scale; offY = VH / 2 - wy * scale; }
    else { window.zoom = 1; scale = fitScale; offX = fitX; offY = fitY; }
    // pose the launch (only matters on the zoomed frames)
    if (launches.length && poseT !== null) { launches[0].t = poseT; launches[0].dir = poseDir; }
    __setTime(t); CCACHE = {};
    lastSky = 0; syncSky(performance.now()); syncStats();
    render();
    const L = launches[0];
    let state = 'none';
    if (L) state = L.t >= 1.0 ? (L.dir > 0 ? 'ALONGSIDE-ship' : 'at-harbour') : (L.dir > 0 ? 'running-OUT' : 'putting-back');
    return { t: +t.toFixed(2), lit: +LITAMT.toFixed(2), scale: +scale.toFixed(2),
             nL: launches.length, state };
  }, { t, zoom, wx: world.wx, wy: world.wy, VW, VH, poseT, poseDir });
  const f = join(OUT, `${name}-${TAG}.png`);
  await page.screenshot({ path: f });
  console.log(`  ${(name + '-' + TAG).padEnd(20)} t=${st.t} LITAMT=${st.lit} scale=${st.scale}  launches=${st.nL} state=${st.state}  → ${f}`);
}

console.log(`seed ${SEED}: anchored ship at ~(${world.sx}, ${world.sy}); ${world.nL} launch; camera aimed there.`);
await shoot("harbour-day-underway", 0.50, 6.0, 0.5, 1);   /* mid-leg, moving, wake up */
await shoot('harbour-night-alongside', 0.92, 6.0, 1.0, 1);/* alongside the ship, lights lit */
await shoot("city-day", 0.50, 0, null, 1);                /* the un-zoomed whole-frame read */

await browser.close();
