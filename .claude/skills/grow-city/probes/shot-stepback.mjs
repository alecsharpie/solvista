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
 * __setYear + __setTime + render) and takes the light pins FROM THE LIGHT CURVE.
 *
 * ITER 264 — THE PINS WENT STALE, EXACTLY AS 202's DID, AND FOR THE SAME REASON.
 * 202 wrote "take the pins from the curve, not from a guess" and then HARD-CODED
 * t=0.30 / t=0.68 as LITERALS. That was honest at the time: the light curve had no
 * `year` term, so a fixed `t` really was a fixed phase. Then iter 261 gave the season
 * a DAY LENGTH (sunWarp warps the curve's TIME AXIS), the curve moved under the
 * literals, and they silently became guesses again. Measured cost, at the 33rd
 * step-back: FOUR agent FAILs, two seeds, on two "defects" that were both this file.
 *
 *  (a) THE SEASON WAS SHOT AT ITS NULL HOUR. The seasonal-contrast frame was pinned at
 *      t=0.30 -- MID-MORNING. A day-length season is ~0 at mid-day by construction and
 *      lives at the MARGINS: probe-daylen measures winter-vs-summer at d(LUMA) 0.15 at
 *      t=0.30 (below 254's d<0.4 "nobody sees it" floor, and essentially ON TOP of the
 *      probe's own NOON CONTROL at 0.09) against 1.58 at dusk. The camera was shooting
 *      the control and calling it the treatment; both agents duly reported "winter is
 *      indistinguishable from day", and they were RIGHT ABOUT THE PIXELS.
 *  (b) GOLDEN HOUR IS SEASONAL NOW TOO. The sun sets at dayT 0.831 at the dry peak, so
 *      the old t=0.68 lands in MID-AFTERNOON: it self-reported GWARM=0.36 against the
 *      curve's peak of 0.786, and both agents said the frame was "barely warmer than day".
 *  (c) THE CAPTION'S OWN SUN STATE WAS WRONG. SUNUP/SUNDN are thresholds on the WARPED
 *      axis (SUNT), and this file tested them against the WALL clock (dayT) -- so it
 *      would print "sun=UP" for a winter dusk whose sun had already set, which is the
 *      one fact the frame exists to show (258: a frame must self-report its subject).
 *
 * So NOTHING here is a literal any more. Every pin is DERIVED, in-page, from the
 * artifact's own sunWarp/SUNDN/GWARM at the year being shot -- a structural fix, not a
 * checked one (223), so the pins cannot go stale again whatever a later lap does to the
 * light. The seasonal contrast is now a DISCRIMINATING PAIR (258): dusk-summer and
 * dusk-winter at the SAME wall-clock instant, chosen midway between the two seasons'
 * sunsets, so the sun is provably UP in one frame and DOWN in the other.
 *
 *      day     t=0.30              the daylight plateau (season-flat, and that is correct)
 *      golden  t=argmax GWARM      the low-sun band, FOUND not guessed
 *      night   t=0.92              deep night
 *      dusk    t=(sunset_winter + sunset_dry)/2, shot at BOTH years -- the season
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

const DRY = 2035.62;      /* applySeason's golden dry peak */
const WINTER = 2035.02;   /* the wet trough */

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 });
page.on('pageerror', e => console.error('PAGE ERROR:', e.message));

/* ---- DERIVE the light pins from the artifact's OWN curve, at each year (see header).
   Nothing below is a literal `t`: we drive the shipped sunWarp/SUNDN/GWARM rather than
   re-implementing them (249), so a later lap that moves the light moves these pins too. */
await page.goto(pathToFileURL(ART).href);
await page.waitForTimeout(500);
const PINS = await page.evaluate(({ dry, winter }) => {
  playing = false;
  /* sunset, in WALL-CLOCK dayT, for the pinned year: the instant the warped clock SUNT
     crosses SUNDN. sunWarp is monotone by construction (DAYLEN is bounded so the day can
     never run backwards), so a bisection is exact. */
  const sunsetOf = (y) => {
    __setYear(y);
    let lo = 0.5, hi = 0.999;
    for (let i = 0; i < 50; i++) { const m = (lo + hi) / 2; if (sunWarp(m) < SUNDN) lo = m; else hi = m; }
    return (lo + hi) / 2;
  };
  const sunsetDry = sunsetOf(dry), sunsetWin = sunsetOf(winter);
  /* golden hour = the ARGMAX of the curve's own warmth signal, FOUND not guessed. GWARM is
     set inside render() off skyBot, so we render to read it rather than re-deriving it. */
  __setYear(dry);
  let goldenT = 0, best = -1;
  for (let t = 0.55; t <= 0.95; t += 0.005) {
    __setTime(t); render();
    if (GWARM > best) { best = GWARM; goldenT = t; }
  }
  return { sunsetDry, sunsetWin, goldenT: +goldenT.toFixed(3), goldenGW: +best.toFixed(3),
           /* the discriminating instant: the sun has SET in winter and is still UP in summer */
           duskT: +((sunsetDry + sunsetWin) / 2).toFixed(3) };
}, { dry: DRY, winter: WINTER });

console.log(`  pins  sunset dry=${PINS.sunsetDry.toFixed(3)} winter=${PINS.sunsetWin.toFixed(3)}` +
  `  ->  dusk t=${PINS.duskT} (sun UP in summer, DOWN in winter)` +
  `   golden t=${PINS.goldenT} (GWARM peaks ${PINS.goldenGW})`);

const FRAMES = [
  { name: 'day',         t: 0.30,          year: DRY },
  { name: 'golden',      t: PINS.goldenT,  year: DRY },
  { name: 'night',       t: 0.92,          year: DRY },
  /* the season, shot at the hour it LIVES, as a pair the agent must DISCRIMINATE (258) */
  { name: 'dusk-summer', t: PINS.duskT,    year: DRY },
  { name: 'dusk-winter', t: PINS.duskT,    year: WINTER },
];

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
    /* SUNUP/SUNDN are thresholds on the WARPED axis (SUNT), NOT on the wall clock. Testing
       them against dayT printed "sun=UP" on a winter dusk whose sun had already set -- i.e.
       the caption denied the one fact the frame exists to show (iter 264; 258's law). */
    const up = SUNT >= SUNUP && SUNT <= SUNDN;
    /* today's sunset, in the viewer's units (236): a reader can check this against the frame. */
    let lo = 0.5, hi = 0.999;
    for (let i = 0; i < 50; i++) { const m = (lo + hi) / 2; if (sunWarp(m) < SUNDN) lo = m; else hi = m; }
    return { dayT, year, LITAMT: +LITAMT.toFixed(2), GWARM: +GWARM.toFixed(2),
             phase: phaseWord(dayT), sunUp: up, sunset: +((lo + hi) / 2).toFixed(3),
             hud: document.getElementById('stPhase').textContent };
  }, { seed, t: f.t, year: f.year });
  /* NOTE: no waitForTimeout here -- a wait is exactly what drifts the pin. The
     freeze holds, but there is nothing to gain by waiting and a season to lose. */
  const png = join(outdir, `s${seed}-${f.name}.png`);
  await page.screenshot({ path: png });        /* DOM composited, per iter 200 */
  console.log(`  ${f.name.padEnd(12)} t=${state.dayT.toFixed(3)} year=${state.year.toFixed(2)} ` +
    `LITAMT=${String(state.LITAMT).padStart(4)} GWARM=${String(state.GWARM).padStart(4)} ` +
    `sun=${state.sunUp ? 'UP  ' : 'DOWN'} (sets ${state.sunset.toFixed(3)}) phase=${state.phase.padEnd(11)} ` +
    `HUD=${(state.hud === state.phase ? 'ok' : 'STALE:' + state.hud).padEnd(8)} -> ${png}`);
}
await browser.close();
