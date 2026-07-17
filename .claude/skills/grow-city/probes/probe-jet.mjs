/* iter 331 — THE HIGH JET + CONTRAIL. A Math.random drift-in, draw-only, so the census
   is vacuous; the claim is "a jet's contrail RENDERS high in the sky by day, is GONE at
   night (no sun lights it), and FADES OUT in rain (fair-weather only)."
   Isolation is by clearing the decision (230): a deterministic plane is placed, the frozen
   world is rendered, then plane=null and re-rendered IN ONE PAGE — the diff IS the whole
   jet+contrail, floor exactly 0. Build-agnostic (no source swap): the diff comes from the
   page's own render.
   Three conditions, and the two controls are the whole point:
     (1) DAY  fair  -> substantial ink, high in the frame (upper sky, not over the skyline);
     (2) NIGHT fair -> ~0 ink (the trail's `day = 1-LITAMT` factor kills it — a dead regime);
     (3) DAY  rain  -> ~0 ink (balloonFair=0 fades it out — fair-weather only).
   balloonFair is a top-level function, so stub it BY ASSIGNMENT and restore the same way
   (284: `delete` silently no-ops on a function declaration). */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = 'file://' + join(HERE, '../../../../solvista.html');
const SEEDS = [42, 7, 1234];

const br = await chromium.launch();
let allPass = true;
for (const seed of SEEDS) {
  const p = await br.newPage({ viewport: { width: 1400, height: 900 } });
  await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
  await p.goto(ART, { waitUntil: 'load' });
  await p.evaluate(s => { genWorld(s); __warp(61); }, seed);

  const r = await p.evaluate(() => {
    playing = false; time = 100; waveT = 40;
    const W = cvs.width, H = cvs.height;
    const grab = () => new Uint8ClampedArray(ctx.getImageData(0, 0, W, H).data);
    const bfOrig = balloonFair;
    /* place a deterministic jet mid-frame, high up; sp=0 so it cannot drift the frozen frame */
    const place = () => { plane = { p: 0.5, y: 0.12, dir: 1, sp: 0, sl: 0.2 }; };
    /* the jet's ink = (plane present) - (plane null), same frozen world, one page */
    const jetInk = () => {
      place(); render(); const A = grab();
      plane = null; render(); const B = grab();
      let n = 0, ink = 0, sy = 0;
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4;
        const d = Math.max(Math.abs(A[i] - B[i]), Math.abs(A[i + 1] - B[i + 1]), Math.abs(A[i + 2] - B[i + 2]));
        if (d > 6) { n++; ink += d; sy += y; }
      }
      return { n, meanY: n ? (sy / n / H) : 0 };
    };
    const at = (dayT_, fair) => {
      dayT = dayT_; SUNT = sunWarp(dayT); setLight(daylight(SUNT));
      balloonFair = () => fair;
      const o = jetInk(); balloonFair = bfOrig; return o;
    };
    return { day: at(0.30, 1), night: at(0.93, 1), rain: at(0.30, 0), LITday: (dayT = 0.30, SUNT = sunWarp(dayT), setLight(daylight(SUNT)), LITAMT) };
  });

  const dayN = r.day.n, nightN = r.night.n, rainN = r.rain.n;
  /* the jet must draw a real trail by day, high in the frame; night and rain must ~vanish */
  const pass = dayN > 200 && r.day.meanY < 0.42 && nightN < dayN * 0.06 && rainN < dayN * 0.06;
  allPass = allPass && pass;
  console.log(`seed ${seed}: DAY ${dayN}px meanY=${r.day.meanY.toFixed(2)}  NIGHT ${nightN}px  RAIN ${rainN}px  -> ${pass ? 'PASS' : 'FAIL'}`);
  await p.close();
}
await br.close();
console.log(allPass ? '\nJET: PASS' : '\nJET: FAIL');
process.exit(allPass ? 0 : 1);
