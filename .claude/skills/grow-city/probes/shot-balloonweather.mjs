/* iter 313 — HOT-AIR BALLOONS ARE A FAIR-WEATHER CRAFT. Visual gate for the balloon fade.
   Freezes in-page (playing=false stops both clocks), pins a DRY year and the WETTEST year at
   the same daylit hour, waits past syncSky's 400ms throttle so the leaden backdrop repaints,
   then shoots the WHOLE frame (balloons ride high across the sky — there is nothing to zoom at).

   __warp parks every balloon off the left edge (it never drifts them), so spread them across the
   plate first — position is independent of the weather fade under test.

   Three frames per seed, named by FILE (239), each self-reporting its state (202). The success
   case is an ABSENCE, so it is shot as a DISCRIMINATING pair (258): the fair frame proves the
   balloons EXIST in this city, the storm frame shows them correctly gone, and the storm-head
   frame (253: window.balloonFair = () => 1) shows the DEFECT — the fleet flying through the storm.
     fair        — dry year: balloons out (also = HEAD on a fair day, unchanged).
     storm       — wettest year, same hour: leaden sky, NO balloons (the fix).
     storm-head  — the same storm with the fade forced off: balloons drifting through the rain. */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = 'file://' + join(HERE, '../../../../solvista.html');
const OUT = process.argv[3] || join(HERE, '../shots/balloonweather');
const SEED = +(process.argv[2] || 42);
mkdirSync(OUT, { recursive: true });

const br = await chromium.launch();
const p = await br.newPage({ viewport: { width: 1400, height: 900 } });
await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await p.goto(ART, { waitUntil: 'load' });
const yrs = await p.evaluate(s => {
  genWorld(s); __warp(61); playing = false; time = 0; waveT = 0; STARS.length = 0; flock = null;
  balloons.forEach((b, i) => { b.x = 6 + i * 8; });          /* spread across the visible plate */
  let dryY = 2010, wetY = 2010, dV = 2, wV = -1;
  for (let y = 1999; y < 2036; y += 0.05) { year = y; const f = rainFront();
    if (f < dV) { dV = f; dryY = y; } if (f > wV) { wV = f; wetY = y; } }
  return { dryY: +dryY.toFixed(2), wetY: +wetY.toFixed(2), n: balloons.length };
}, SEED);

const shoot = async (name, y, t, headMode) => {
  const st = await p.evaluate(([yy, tt, hm]) => {
    year = yy; dayT = tt;
    window.__ballOrig = window.__ballOrig || balloonFair;
    window.balloonFair = hm ? () => 1 : window.__ballOrig;
    return { front: +rainFront().toFixed(2), oc: +overcast().toFixed(2), fair: +balloonFair().toFixed(2) };
  }, [y, t, !!headMode]);
  await p.waitForTimeout(560);                              /* let syncSky repaint the backdrop */
  const file = join(OUT, `s${SEED}-${name}.png`);
  await p.screenshot({ path: file });
  console.log(`${file}   year=${y} dayT=${t} front=${st.front} overcast=${st.oc} balloonFair=${st.fair}`);
};

console.log(`seed ${SEED}: ${yrs.n} balloons · dry @${yrs.dryY} · wet @${yrs.wetY}`);
await shoot('fair', yrs.dryY, 0.35, false);
await shoot('storm', yrs.wetY, 0.35, false);
await shoot('storm-head', yrs.wetY, 0.35, true);
await br.close();
