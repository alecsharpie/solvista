#!/usr/bin/env node
/* The step-back's own camera — 3 lights x 2 calendars, with the clock FROZEN.
 *
 * Iter 202's step-back shot its frames with shoot.mjs and `?t=`/`?year=` and got
 * TWO FALSE FAILS from four agents, on two independent bugs that were both in the
 * INSTRUMENT, not the city:
 *
 *  (1) THE PIN DRIFTS. shoot.mjs loads with playing=true and then WAITS, and the
 *      frame loop advances `year += dt*speed/6` (~0.167 yr/s) and `dayT += dt/110`.
 *      So a `?year=2035.62` (dry peak) frame drifts toward autumn while a
 *      `?year=2035.02` (winter) frame drifts into SPRING -- and the agents duly
 *      reported that summer and winter looked the same, and that the farmland was
 *      "inverted". Iter 139 hit this exact trap and only DOCUMENTED it; the
 *      step-back recipe kept telling people to pin with `?year=` anyway.
 *  (2) THE LIGHT PINS WERE GUESSED. 202 shot "golden hour" at t=0.80. The artifact's
 *      own phaseWord() calls t>=0.80 'night', and SUNDN=0.78 means the sun block
 *      draws NOTHING past it. Both agents correctly said "no sun, this is night".
 *
 * So this script freezes the world in-page (playing=false, then genWorld + __warp +
 * __setYear + __setTime + render) and takes the light pins FROM THE LIGHT CURVE'S
 * OWN KEYFRAMES rather than from a guess:
 *
 *      day     t=0.30   LITAMT 0.03, sun up (sunP 0.34)      -- the daylight plateau
 *      golden  t=0.68   GWARM 0.72 (peaks 0.786 at 0.70)     -- the low-sun band
 *      night   t=0.92   LITAMT 1.00, sun down                -- deep night
 *   x  dry     year=2035.62  (applySeason's golden dry peak)
 *      winter  year=2035.02
 *
 * It shoots with page.screenshot(), NOT a canvas readback: iter 200's law is that
 * the user sees the canvas PLUS the DOM, and the .placard owns the top-left corner.
 * A step-back must look at what the user looks at.
 *
 *   node probes/shot-stepback.mjs <seed> <outdir>
 */
import { homedir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync, mkdirSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
/* resolve the artifact RELATIVE TO THIS FILE, never an absolute path */
const CAND = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html')];
const ART = CAND.find(f => existsSync(f));

const seed = parseInt(process.argv[2] || '42', 10);
const outdir = resolve(process.argv[3] || join(HERE, '../shots/stepback'));
mkdirSync(outdir, { recursive: true });

/* pins read off the light curve + applySeason's keyframes, NOT guessed (see header) */
const FRAMES = [
  { name: 'day',    t: 0.30, year: 2035.62 },
  { name: 'golden', t: 0.68, year: 2035.62 },
  { name: 'night',  t: 0.92, year: 2035.62 },
  { name: 'winter', t: 0.30, year: 2035.02 },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 });
page.on('pageerror', e => console.error('PAGE ERROR:', e.message));

for (const f of FRAMES) {
  await page.goto(pathToFileURL(ART).href);
  await page.waitForTimeout(500);
  const state = await page.evaluate(({ seed, t, year }) => {
    playing = false;              /* frame loop no longer advances dayT/year (L7092) */
    genWorld(seed);
    __warp(61);                   /* develop the city; this ALSO advances `year` ... */
    __setYear(year);              /* ... so the calendar pin must come AFTER the warp */
    __setTime(t);
    /* The user sees canvas PLUS DOM (200), and a frozen clock does not refresh the DOM
       (204): syncSky() self-throttles for 400ms and syncStats() is only ever called from
       inside the `if(playing)` branch. So a frozen frame keeps the HUD and the CSS sky
       gradient it had AT PAGE LOAD -- i.e. daytime. Iter 227's step-back agents duly read
       "DAYTIME / 0% new moon" off a night frame with a crescent drawn, on both seeds, and
       FAILed the city for it; probe-hudfreeze.mjs proved the artifact correct and this
       camera stale. Force both, or the frames lie about everything outside the canvas. */
    lastSky = 0; syncSky(performance.now()); syncStats();
    render();
    return { dayT, year, LITAMT: +LITAMT.toFixed(2), GWARM: +GWARM.toFixed(2),
             phase: phaseWord(dayT), sunUp: dayT >= SUNUP && dayT <= SUNDN,
             hud: document.getElementById('stPhase').textContent };
  }, { seed, t: f.t, year: f.year });
  /* NOTE: no waitForTimeout here -- a wait is exactly what drifts the pin. The
     freeze holds, but there is nothing to gain by waiting and a season to lose. */
  const png = join(outdir, `s${seed}-${f.name}.png`);
  await page.screenshot({ path: png });        /* DOM composited, per iter 200 */
  console.log(`  ${f.name.padEnd(7)} t=${state.dayT.toFixed(2)} year=${state.year.toFixed(2)} ` +
    `LITAMT=${String(state.LITAMT).padStart(4)} GWARM=${String(state.GWARM).padStart(4)} ` +
    `sun=${state.sunUp ? 'UP  ' : 'down'} phase=${state.phase.padEnd(11)} ` +
    `HUD=${(state.hud === state.phase ? 'ok' : 'STALE:' + state.hud).padEnd(8)} -> ${png}`);
}
await browser.close();
