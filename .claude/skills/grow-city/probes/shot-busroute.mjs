/* shot-busroute — the camera for iter 276.
 *
 * ⚠ A STILL CANNOT PROVE A VERB (134/258). "The bus runs a route" is a claim about MOTION
 *   and no photograph carries it — probe-busroute owns that. This camera aims at the STATE
 *   the behaviour leaves behind: a bus PULLED IN at a shelter, with the queue boarding.
 * ⚠ AND IT IS A PRESENCE, SO IT SELF-REPORTS ITS HOST (258): every frame prints whether a
 *   bus is actually at the centre, because an empty street and a correct frame look alike.
 * ⚠ AIMED BY MEASURED INK, NEVER BY THE STOP'S POSITION (226/258): `stopOK` requires >=2
 *   DEV neighbours, so a shelter sits BY CONSTRUCTION on ground with tall frontage drawn in
 *   the row in front — the siting rule is positively correlated with occlusion. Suppress the
 *   buses in ONE page (230), diff, score each dwelling bus by the ink in its OWN
 *   neighbourhood, then pan to THAT bus (272).
 * ⚠ Drives `zoom`, never `scale` (269): the contract is zoom=n; scale=fitScale*zoom.
 * ⚠ Zeroes the HUD boxes in the ink map before the argmax (200).
 */
import { homedir } from 'node:os';
import { dirname, join, isAbsolute } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = process.env.SRC
  ? (isAbsolute(process.env.SRC) ? process.env.SRC : join(HERE, process.env.SRC))
  : join(HERE, '../../../../solvista.html');
const SEED = +(process.argv[2] || 42);
const OUT = process.argv[3] || join(HERE, 'shots/bus');
const TAG = process.env.TAG || 'x';
mkdirSync(OUT, { recursive: true });

const br = await chromium.launch();
const page = await br.newPage({ viewport: { width: 1400, height: 900 } });
await page.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await page.goto('file://' + SRC);
await page.waitForFunction(() => window.__census !== undefined);

const info = await page.evaluate(({ seed }) => {
  playing = false;
  genWorld(seed);
  __warp(2035);
  syncFleet();
  STARS.length = 0; flock = null;
  dayT = 0.34;                                  /* broad day: the shelter and its queue read */

  const g = cvs.getContext('2d');
  const W = cvs.width, H = cvs.height;
  const dpr = W / innerWidth;
  /* world -> device. `stamp` records _sx/_sy in WORLD coords (the same ones pickEntity
     hovers by), and render()'s transform is setTransform(dpr*scale,…,dpr*offX,dpr*offY). */
  const dev = (wx, wy) => [dpr * (scale * wx + offX), dpr * (scale * wy + offY)];
  /* 200: a canvas readback scores ink hidden behind the DOM. Zero the HUD boxes. */
  const boxes = [...document.querySelectorAll('.placard,.census,.controls')]
    .map(e => { const r = e.getBoundingClientRect(); return [r.left * dpr, r.top * dpr, r.right * dpr, r.bottom * dpr]; });

  /* the ink map of the BUSES ALONE: suppress them in ONE page and diff (230/226).
     floor exactly 0 — both renders are the same frozen world in the same page. */
  const busInk = () => {
    const A = (render(), g.getImageData(0, 0, W, H).data);
    const real = window.drawVehicle;
    window.drawVehicle = v => { if (v.kind !== 'bus') real(v); };
    render();
    const B = g.getImageData(0, 0, W, H).data;
    window.drawVehicle = real; render();
    const ink = new Uint8Array(W * H);
    for (let i = 0, p = 0; i < A.length; i += 4, p++) {
      const d = Math.max(Math.abs(A[i] - B[i]), Math.abs(A[i + 1] - B[i + 1]), Math.abs(A[i + 2] - B[i + 2]));
      if (d > 12) ink[p] = 1;
    }
    for (const [x0, y0, x1, y1] of boxes)
      for (let y = Math.max(0, y0 | 0); y < Math.min(H, y1 | 0); y++)
        for (let x = Math.max(0, x0 | 0); x < Math.min(W, x1 | 0); x++) ink[y * W + x] = 0;
    return ink;
  };
  const score = (ink, v) => {
    const [sx, sy] = dev(v._sx, v._sy); let n = 0;
    for (let y = Math.max(0, sy - 26 | 0); y < Math.min(H, sy + 26 | 0); y++)
      for (let x = Math.max(0, sx - 26 | 0); x < Math.min(W, sx + 26 | 0); x++) n += ink[y * W + x];
    return n;
  };

  /* ⚠ 258: an argmax over n=1 is a lottery — at any instant only ~1 bus is standing at a
     shelter, so search OVER TIME. The bar is the INCUMBENT, not a number I chose: a stopped
     bus must render at least 70% of the mean MOVING bus's ink in the same frame (226).
     ⚠ AND WE STOP THE SIM AT THE INSTANT WE MEASURE. The first cut kept stepping after it
     picked its winner, so the camera photographed a LATER frame in which the bus had driven
     on — it measured one moment and shot another, and an agent correctly FAILed an empty
     street. A camera must not advance the world past the state it just scored. */
  let best = null, bi = -1, bar = 0, samples = 0, seen = 0;
  for (let t = 0; t < 1800; t += 0.1) {
    advanceEntities(0.1, 1);
    const at = vehicles.filter(v => v.kind === 'bus' && v.wait > 0);
    if (!at.length) continue;
    seen++;
    if (seen % 5) continue;                     /* sample the standing moments, don't re-render each */
    render();
    const ink = busInk();
    const moving = vehicles.filter(v => v.kind === 'bus' && !(v.wait > 0) && v._sx !== undefined);
    const mm = moving.length ? moving.reduce((a, v) => a + score(ink, v), 0) / moving.length : 0;
    let hit = false;
    for (const v of at) {
      if (v._sx === undefined) continue;
      const n = score(ink, v);
      if (n > bi) { bi = n; best = { sx: v._sx, sy: v._sy, x: v.x, y: v.y }; bar = mm; }
      if (n >= 0.7 * mm && mm > 0) hit = true;
    }
    samples++;
    if (hit) break;                             /* good enough, and the world is FROZEN here */
  }
  return {
    buses: vehicles.filter(v => v.kind === 'bus').length,
    bestInk: bi, movingBar: +bar.toFixed(0), samples,
    bx: best ? best.sx : null, by: best ? best.sy : null,
    hex: best ? [best.x, best.y] : null,
  };
}, { seed: SEED });

console.log(`seed ${SEED} [${TAG}]  buses ${info.buses}  samples ${info.samples}` +
  `  best-exposed STANDING bus: ${info.bestInk}px  (bar: a MOVING bus renders ${info.movingBar}px) ` +
  `${info.bestInk >= 0.7 * info.movingBar ? 'CLEARS the incumbent bar' : '⚠ BELOW the bar — buried'}` +
  `  hex ${JSON.stringify(info.hex)}`);

/* whole-city frame — un-zoomed, per the whole-frame rule */
await page.evaluate(() => { zoom = 1; scale = fitScale; offX = fitX; offY = fitY; lastSky = 0; syncSky(performance.now()); syncStats(); render(); });
await page.screenshot({ path: join(OUT, `s${SEED}-${TAG}-city.png`) });

/* close-up: drive ZOOM, never scale (269); zoom about the centre then pan explicitly (272) */
if (info.bx !== null) {
  /* ⚠ 272(c): clampPan() DOES NOT LEAVE YOUR TARGET AT THE TARGET — near the plate's edge it
     shifts the view to keep the plate in frame, which strands the subject off-centre. So read
     the bus's position back AFTER the clamp and hover THERE, and self-report the offset. */
  const at = await page.evaluate(({ bx, by }) => {
    zoom = 5.5; scale = fitScale * zoom;
    offX = innerWidth / 2 - bx * scale;
    offY = innerHeight / 2 - by * scale;
    if (typeof clampPan === 'function') clampPan();
    lastSky = 0; syncSky(performance.now()); syncStats(); render();
    return { cx: offX + scale * bx, cy: offY + scale * by, w: innerWidth, h: innerHeight };
  }, { bx: info.bx, by: info.by });
  const off = Math.hypot(at.cx - at.w / 2, at.cy - at.h / 2);
  console.log(`  bus lands at (${at.cx | 0},${at.cy | 0}) — ${off | 0}px off frame centre` +
    `${off > 60 ? '  ⚠ clampPan moved it' : ''}`);
  await page.screenshot({ path: join(OUT, `s${SEED}-${TAG}-stop.png`) });

  /* ...and hover the bus WHERE IT ACTUALLY LANDED, so the TOOLTIP half is on film too */
  await page.mouse.move(at.cx, at.cy);
  await page.waitForTimeout(350);
  await page.screenshot({ path: join(OUT, `s${SEED}-${TAG}-hover.png`) });
}
await br.close();
console.log('  -> ' + OUT);
