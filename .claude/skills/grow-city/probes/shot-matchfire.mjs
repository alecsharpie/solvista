#!/usr/bin/env node
/* shot-matchfire.mjs — the cup-night camera (iter 319).
 *
 * Freezes the world IN-PAGE (playing=false stops both clocks) and pins dayT with
 * __setTime (shoot.mjs's ?t= drifts while it waits, 139/202); syncSky/syncStats forced
 * (204). Aims ABOVE the stadium — the fireworks bloom ~64-98 world units over the
 * ground — a rare tile, so a fixed clip is a coin-flip (201).
 *
 * Blind A/B on the SAME hex, same hour, same camera:
 *   fireworks   a big EVENING fixture, a hair after the final whistle (cel high)
 *   no-fire     the SAME hex/hour on an ORDINARY (or no-) fixture night (the control)
 * ...plus the mandatory un-zoomed whole-city night frame.
 *
 * Every frame self-reports its state in the viewer's units (236): matchCelebrate() and
 * whether the ground is dark. `time` is picked to put a shell mid-burst.
 *
 *   node shot-matchfire.mjs <seed> <outdir>        SRC=head.html for a HEAD control
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '../../../../');
const SRC = pathToFileURL(join(ROOT, process.env.SRC || 'solvista.html')).href;

const seed = +(process.argv[2] || 42);
const out = process.argv[3] || join(HERE, 'shots/matchfire');
mkdirSync(out, { recursive: true });
const ZOOM = 3.4;

const br = await chromium.launch();
const page = await br.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2 });
await page.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await page.goto(SRC, { waitUntil: 'load' });

/* which days are a big evening night, and which is an ordinary/dark control? */
const plan = await page.evaluate(seed => {
  playing = false; genWorld(seed); __warp(61);
  const has = typeof matchCelebrate === 'function';
  let bigEve = -1, ctrl = -1;
  for (let d = 0; d < 60; d++) {
    const ko = has ? fixtureAt(d) : -1;
    if (!has) continue;
    if (ko < 0) { if (ctrl < 0) ctrl = d; continue; }
    dayT = d + ko + MATCHDUR + 0.001;
    const big = matchCelebrate() > 0;
    if (big && ko > 0.5 && bigEve < 0) bigEve = d;
    else if (!big && ctrl < 0) ctrl = d;
  }
  return { has, bigEve, ctrl };
}, seed);

if (!plan.has) console.log(`seed ${seed}: HEAD — no matchCelebrate(); no cup-night display exists.`);

const KO_EVE = 0.70;   /* MATCHEVE */
const FRAMES = [
  ['fireworks', plan.bigEve, ZOOM],
  ['no-fire',   plan.ctrl,   ZOOM],
  ['city-night', plan.bigEve, 0],     /* 0 = whole city */
];

for (const [name, day, zoom] of FRAMES) {
  if (day < 0) { console.log(`seed ${seed}  ${name}: no such day in window — skipped`); continue; }
  const st = await page.evaluate(({ seed, day, zoom }) => {
    let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    playing = false; STARS.length = 0; flock = null;
    genWorld(seed); __warp(61);
    waveT = 40;
    const has = typeof matchCelebrate === 'function';
    const ko = has ? fixtureAt(day) : 0.70;
    __setTime(day + (ko >= 0 ? ko : 0.70) + MATCHDUR + 0.005);

    const stads = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++)
      if (cells[idx(x, y)].t === T.STADIUM) stads.push([x, y]);
    const hex = stads[0];

    /* pick `time` to freeze on a bright multi-burst finale over the first stadium:
       score each shell's burst by brightness*size (matches the draw's 6-shell params) */
    if (hex) {
      const sx = hex[0];
      let best = 40, bestScore = -1;
      for (let tt = 40; tt < 43; tt += 0.02) {
        let sc = 0;
        for (let s2 = 0; s2 < 6; s2++) { const ft = (tt * 0.55 + s2 * 0.19 + sx * 0.13) % 1.15;
          if (ft > 1) continue;
          if (ft >= 0.24) { const q = (ft - 0.24) / 0.76; sc += (1 - q * 0.9) * (6 + q * 30); } }
        if (sc > bestScore) { bestScore = sc; best = tt; }
      }
      time = best;
    } else time = 40;

    if (zoom > 0 && hex) {
      const [wx, wy] = ctr(hex[0], hex[1]);
      scale = zoom;
      offX = innerWidth / 2 - wx * zoom;
      offY = innerHeight * 0.72 - wy * zoom;        /* ground low, fireworks fill the sky above */
    } else {
      window.zoom = 1; scale = fitScale; offX = fitX; offY = fitY;
    }
    lastSky = 0; syncSky(performance.now()); syncStats();   /* 204 */
    render();

    const cel = has ? matchCelebrate() : 0;
    return { hex, LITAMT: +LITAMT.toFixed(2), time: +time.toFixed(2),
             fixture: ko === null || ko === undefined ? '?' : ko < 0 ? 'NO FIXTURE' : ko > 0.5 ? 'evening' : 'afternoon',
             cel: +cel.toFixed(2), display: cel > 0 && LITAMT > 0.6 ? 'FIREWORKS' : 'none' };
  }, { seed, day, zoom });

  console.log(`seed ${seed}  ${name.padEnd(10)} day=${day} time=${st.time} LITAMT=${st.LITAMT} `
    + `fixture=${st.fixture} matchCelebrate=${st.cel} -> ${st.display}  (stadium hex ${st.hex})`);
  await page.screenshot({ path: join(out, `${seed}-${name}.png`) });   /* DOM-composited (200) */
}
await br.close();
