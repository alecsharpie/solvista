/* shot-civhours — the same city at DUSK and at 4am, aimed at the institutions (iter 213).
 *
 * Not shoot.mjs + ?t=: that loads with playing=true and then WAITS, and the frame loop
 * drifts both clocks while it does (139, 202). The whole feature here is a difference
 * between two hours, so a drifting pin would destroy exactly the thing under test.
 * Freeze in-page, pin dayT, render once, screenshot.
 *
 * page.screenshot(), not a canvas readback: the user sees the canvas PLUS the DOM (200).
 * And the camera is AIMED at a located host, not a guessed rectangle (201).
 *
 * node shot-civhours.mjs <seed> <outdir>
 */
import { homedir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdirSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = pathToFileURL(join(HERE, '../../../../solvista.html')).href;

const SEED = parseInt(process.argv[2] || '42', 10);
const OUT = process.argv[3] || join(HERE, 'shots-civ');
mkdirSync(OUT, { recursive: true });

const HOURS = { dusk: 0.71, '4am': 0.04 };   /* nightDeep() 0 -> 1: the span the hours curve runs over */

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
page.on('pageerror', e => console.error('PAGE ERROR', e.message));
await page.addInitScript(() => {                 /* before the page's own script: see probe-civhours */
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await page.goto(ART);
await page.waitForFunction(() => typeof window.__find === 'function');

await page.evaluate((seed) => {
  playing = false;
  genWorld(seed); window.__warp(61);
  STARS.length = 0; flock = null; time = 0; waveT = 0;
}, SEED);

/* aim: centre the camera on a located civic and zoom, rather than trusting a fixed clip.
   Same idiom the artifact's own zoom uses (offX = centre - world*scale). */
const aim = (kind, z) => page.evaluate(({ kind, z }) => {
  const hits = window.__find(kind);
  if (!hits.length) return false;
  const [wx, wy] = ctr(hits[0].x, hits[0].y);
  zoom = z; scale = fitScale * z;
  offX = innerWidth / 2 - wx * scale;
  offY = innerHeight / 2 - wy * scale;
  return true;
}, { kind, z });

const wide = () => page.evaluate(() => { zoom = 1; scale = fitScale; offX = fitX; offY = fitY; });

const shot = async (page, name, t) => {
  await page.evaluate((t) => {
    window.__setTime(t);
    /* a frozen clock does NOT refresh the DOM: syncSky is throttled 400ms and syncStats
       only runs while playing, so without this you get a night plate under a day sky (204) */
    lastSky = 0; syncSky(performance.now()); syncStats();
    render();
  }, t);
  await page.screenshot({ path: join(OUT, name + '.png') });
  const state = await page.evaluate(() => 'dayT=' + dayT.toFixed(2) + ' LITAMT=' + LITAMT.toFixed(2)
    + ' nightDeep=' + nightDeep().toFixed(2) + ' civOpen(museum)=' + civOpen('museum').toFixed(2)
    + ' civOpen(hospital)=' + civOpen('hospital').toFixed(2));
  console.log('  ' + name.padEnd(22) + state);   /* every frame self-reports its own state (202) */
};

console.log('seed ' + SEED + ' -> ' + OUT);
for (const [hname, t] of Object.entries(HOURS)) {
  if (await aim('hall', 3.4)) await shot(page, `s${SEED}-hall-${hname}`, t);
  if (await aim('amphitheater', 5.5)) await shot(page, `s${SEED}-amphi-${hname}`, t);
  await wide(); await shot(page, `s${SEED}-city-${hname}`, t);
}
await browser.close();
