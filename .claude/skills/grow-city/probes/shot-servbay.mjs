#!/usr/bin/env node
/* shot-servbay.mjs — aim the camera at a service vehicle standing at its own door.
 *
 * A FIXED CLIP IS NOT A FRAMING (201): the city is procedural, so the hospital, the precinct
 * and the firehouse sit somewhere different in every seed -- and this feature is a BEHAVIOUR,
 * so even the right building is empty ~75-80% of the time. A guessed rectangle would be a
 * coin flip twice over.
 *
 * So: freeze the CA, step the entity loop until the vehicle's own `duty` says it is standing
 * at its bay, then centre the artifact's own camera on that building and render once. The
 * frame is captured with page.screenshot() (DOM-composited, 200's law).
 *
 *   node shot-servbay.mjs <seed> <outdir>
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync, mkdirSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = [resolve(HERE, 'solvista.html'), resolve(HERE, '../../../../solvista.html')].find(existsSync);

const SEED = process.argv[2] || '42';
const OUT = process.argv[3] || '.shots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const pg = await browser.newPage({ viewport: { width: 1400, height: 900 } });
pg.on('pageerror', e => console.log('  PAGE ERROR', e.message));

const HOMEK = { police: 'police', fireeng: 'firehouse', ambo: 'hospital' };

async function bayShot(kind, zoom, tag, dayT0) {
  await pg.goto('file://' + ROOT + '?seed=' + SEED + '&warp=61');
  await pg.waitForTimeout(400);
  const info = await pg.evaluate(({ kind, zoom, HOMEK, dayT0 }) => {
    playing = false; dayT = dayT0;
    const v = vehicles.find(u => u.kind === kind);
    if (!v) return { ok: false, why: 'no ' + kind };
    // step the entity loop until it is STANDING at its own door
    let t = 0;
    while (t < 600 && v.duty !== 'bay') { advanceEntities(1 / 30, 1); time += 1 / 30; t += 1 / 30; }
    if (v.duty !== 'bay') return { ok: false, why: kind + ' never reached its bay in 600s' };
    // ...and centre the camera on the INSTITUTION, not on the vehicle, so the shot shows the
    // building it has come home to.
    let bx = null;
    for (const i of HEXI) {
      const c = cells[i];
      if (c.t === T.CIVIC && c.kind === HOMEK[kind]) { bx = ctr(i % G, (i / G) | 0); break; }
    }
    if (!bx) return { ok: false, why: 'no ' + HOMEK[kind] + ' building' };
    lastSky = 0; syncSky(performance.now()); syncStats();   // syncSky is THROTTLED to 400ms and
                                                           // syncStats only runs when playing:
    scale = zoom;
    offX = innerWidth / 2 - bx[0] * scale;
    offY = innerHeight / 2 - bx[1] * scale;
    render();
    // AIM AT THE VEHICLE, not at ctr(x,y): it is drawn INTERPOLATED between its hex and its
    // next hex by v.p, so the hex centre can be a whole hex (~110px at 5.5x) from where it
    // actually appears -- enough for a visual agent to sweep the wrong quadrant and report an
    // empty street. stamp() records the true drawn position in world coords, so use that.
    if (v._sx !== undefined) {
      offX = innerWidth / 2 - v._sx * scale;
      offY = innerHeight / 2 - (v._sy - 3) * scale;
      render();
    }
    return { ok: true, duty: v.duty, waited: Math.round(t), civic: HOMEK[kind] };
  }, { kind, zoom, HOMEK, dayT0 });
  if (!info.ok) { console.log('  ' + tag + ': SKIPPED — ' + info.why); return; }
  await pg.screenshot({ path: join(OUT, tag + '.png'), clip: { x: 450, y: 250, width: 500, height: 400 } });
  console.log('  ' + tag + '.png  ' + kind + ' duty=' + info.duty + ' at the ' + info.civic
    + '  (took ' + info.waited + 's of sim to come home)');
}

// the whole frame, un-zoomed, for the cumulative read
async function wide(tag, dayT0) {
  await pg.goto('file://' + ROOT + '?seed=' + SEED + '&warp=61');
  await pg.waitForTimeout(400);
  await pg.evaluate((d) => { playing = false; dayT = d;
    // ...a frozen clock does NOT refresh the DOM sky or the HUD. syncSky() early-returns for
    // 400ms and syncStats() only runs inside the playing branch, so a hand-rolled freeze shoots
    // a NIGHT plate under a DAYTIME sky (iter 202's lying camera, walked into again).
    lastSky = 0; syncSky(performance.now()); syncStats(); render(); }, dayT0);
  await pg.screenshot({ path: join(OUT, tag + '.png') });
  console.log('  ' + tag + '.png  whole city');
}

/* the ambulance OUT ON A CALL, beacon lit — the change's most visible face, and the one thing
   the artifact never did before: a service beacon that runs in DAYLIGHT because the vehicle is
   actually responding. Centre on the VEHICLE here, not on a building. */
async function callShot(kind, zoom, tag, dayT0) {
  await pg.goto('file://' + ROOT + '?seed=' + SEED + '&warp=61');
  await pg.waitForTimeout(400);
  const info = await pg.evaluate(({ kind, zoom, dayT0 }) => {
    playing = false; dayT = dayT0;
    const v = vehicles.find(u => u.kind === kind);
    if (!v) return { ok: false, why: 'no ' + kind };
    let t = 0;
    while (t < 900 && v.duty !== 'call') { advanceEntities(1 / 30, 1); time += 1 / 30; t += 1 / 30; }
    if (v.duty !== 'call') return { ok: false, why: kind + ' never went out on a call' };
    // ...and let it get clear of the bay so the shot is of a vehicle in traffic
    for (let k = 0; k < 30 * 12 && v.duty === 'call'; k++) { advanceEntities(1 / 30, 1); time += 1 / 30; }
    lastSky = 0; syncSky(performance.now()); syncStats();
    const p = ctr(v.x, v.y);
    scale = zoom;
    offX = innerWidth / 2 - p[0] * scale;
    offY = innerHeight / 2 - p[1] * scale;
    render();
    if (v._sx !== undefined) {   // aim at the DRAWN position, not the hex centre (see bayShot)
      offX = innerWidth / 2 - v._sx * scale;
      offY = innerHeight / 2 - (v._sy - 3) * scale;
      render();
    }
    return { ok: true, duty: v.duty, hex: [v.x, v.y] };
  }, { kind, zoom, dayT0 });
  if (!info.ok) { console.log('  ' + tag + ': SKIPPED — ' + info.why); return; }
  await pg.screenshot({ path: join(OUT, tag + '.png'), clip: { x: 450, y: 250, width: 500, height: 400 } });
  console.log('  ' + tag + '.png  ' + kind + ' duty=' + info.duty + ' at hex ' + info.hex);
}

console.log('shot-servbay — seed ' + SEED + ' -> ' + OUT);
await bayShot('police', 9, 'bay-police', 0.30);       // the come-home tableau (measured visible)
await callShot('ambo', 9, 'call-ambulance', 0.30);    // beacon lit, in daylight, on a call
await wide('city-day', 0.30);
await wide('city-night', 0.92);
await browser.close();
