/* iter 230 — the camera for the night traffic.
 *
 * A wide whole-city frame CANNOT grade this feature: a vehicle is a few px there, and a
 * visual agent (correctly) refused to count them. So AIM (201): freeze the world, find the
 * hex where the traffic that went home renders the MOST INK (measured, not predicted by a
 * tile predicate — 226), and centre the artifact's own camera on it.
 *
 * It shoots a BLIND A/B of the identical frozen hex, at the identical hour:
 *    A = 3am as shipped (most of the traffic has gone in)
 *    B = the same instant with every vehicle's hour cleared, i.e. the full daytime fleet
 * so the question put to an agent is a LOCATE, not a judgement: which of these two is 3am?
 * Plus a DAY frame, where the two builds are identical by construction (the control).
 *
 * node shot-nightfleet.mjs <seed> <outdir>
 */
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'path';
import { homedir } from 'os';
import { mkdirSync } from 'fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const SEED = parseInt(process.argv[2] || '42', 10);
const OUT = process.argv[3] || join(HERE, '../shots/nf');
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
await page.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await page.goto(pathToFileURL(join(HERE, '../../../../solvista.html')).href);
await page.waitForTimeout(400);

/* freeze, then AIM: the argmax over hidden-traffic ink, in the drawn (_sx/_sy) position of
   the vehicles that actually went home — 204: a mover is drawn INTERPOLATED between its
   hexes, so ctr(v.x,v.y) can be a whole hex from where it appears. */
const setup = (seed, t, full, z) => page.evaluate(([seed, t, full, z]) => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  playing = false; STARS.length = 0; flock = null;
  genWorld(seed); __warp(61);
  __setTime(t); time = 0; waveT = 0;
  zoom = z; scale = fitScale * zoom;

  const all = [...vehicles, ...bikes, ...trams, ...trucks];
  /* Aim off the FULL fleet: a vehicle that has gone home returns BEFORE stamp(), so it has
     no drawn position at all — the thing we want to point the camera at is precisely the
     thing that leaves no trace. So put everyone back on the road, render once to stamp the
     true drawn positions (204: a mover is drawn interpolated, so ctr() can be a whole hex
     out), pick the densest knot of the traffic that WILL go home, and only then let the
     hours back in. */
  for (const v of all) { v._out = v.out; v.out = undefined; }
  render();
  const departing = all.filter(v => v._out !== undefined && nightAmt() > v._out && v._sx !== undefined);
  const pts = departing.length ? departing : all.filter(v => v._sx !== undefined);
  let best = null, bestN = -1;
  for (const c of pts) {
    const n = pts.filter(v => Math.hypot(v._sx - c._sx, v._sy - c._sy) < 90).length;
    if (n > bestN) { bestN = n; best = c; }
  }
  if (best) { offX = innerWidth / 2 - best._sx * scale; offY = innerHeight / 2 - best._sy * scale; }

  if (!full) for (const v of all) v.out = v._out;    // ...and the traffic goes home again
  lastSky = 0; syncSky(performance.now()); syncStats();   // 204: the DOM does not refresh itself
  render();
  const vis = all.filter(v => !vehHidden(v));
  return { onStreet: vis.length, fleet: all.length, cluster: bestN,
           cabs: vis.filter(v => v.taxi).length, cars: vis.filter(v => v.kind === 'car').length,
           bikes: vis.filter(v => v.kind === 'bike').length, trucks: vis.filter(v => v.kind === 'truck').length };
}, [seed, t, full, z]);

const ZOOM = 4.2;
for (const [name, t, full] of [['3am-A-shipped', 0.04, false], ['3am-B-fullfleet', 0.04, true],
                               ['day-control', 0.30, false]]) {
  const r = await setup(SEED, t, full, ZOOM);
  await page.screenshot({ path: join(OUT, `${name}.png`) });   // 200: DOM-composited
  console.log(`${name.padEnd(16)} seed ${SEED}  on-street ${r.onStreet}/${r.fleet}  ` +
    `(cars ${r.cars} of which cabs ${r.cabs} · bikes ${r.bikes} · trucks ${r.trucks})  cluster ${r.cluster}`);
}
console.log(`-> ${OUT}`);
await browser.close();
