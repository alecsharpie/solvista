/* probe-suntclock — 264's law: WHEN A LAP INTRODUCES A REMAP, GREP EVERY READER OF THE
   REMAPPED QUANTITY AND ASK WHICH AXIS IT IS ON.

   261 gave the season a DAY LENGTH: `sunWarp` warps the light curve's TIME AXIS, so the
   sun's state is a pure function of SUNT, not dayT. Its comment claims "ONE PREDICATE,
   FOUR READERS". This probe asks whether that is true.

   THREE SUSPECTS, each a threshold on the LIGHT CURVE applied to the WALL CLOCK:
     A. phaseWord(dayT)      -> the HUD's word. Its bands ARE the curve's keyframes
                                (0.05 = SUNUP, 0.80 ~ SUNDN 0.78).  [the viewer's units]
     B. the sea's sun glitter -> glit = (1-LITAMT)*max(0,1-|dayT-0.47|/0.30)
     C. the dawn fog          -> dawn = clamp(1-|dayT-0.10|/0.09,0,1)

   INSTRUMENTS
     A is read in the VIEWER'S UNITS (205/236): the actual DOM text of the HUD's phase pill,
       driven through the artifact's own syncStats(). Build-agnostic.
     B COUNTS THE OBJECTS THE FRAME ISSUES (274), by hooking the artifact's own `hexTile`
       and matching the glint colour COMPUTED IN-PAGE from colA() (275: colA puts the
       palette through the ILLUMINANT, so a match on the BASE literal never fires).
       The shimmer wash is the ONLY hexTile-with-glint; the river sparkle (L5214) and the
       crest strokes (L5115) are strokeStyle, so this hook EXCLUDES both contaminants.
     C reads the artifact's own FOGAMT after a render, with `time` pinned so the seeded
       `spell` term is constant and the whole delta is the dawn term.
   No pixels anywhere => NO NOISE FLOOR AT ALL. Nothing to stub but the clocks.

   CONTROLS
     MUST-NOT-MOVE (250): the moon (moonPhase), the hall clock (clockWord), the stadium
       fixture (matchClock) — these are WALL-CLOCK readers BY DESIGN and must be untouched.
     THE FIXED POINT (253/261): stub the PREDICATE, never the year — `year=2035.87` is not
       representable in float64, so seasonCool() lands ~1e-9 off 0.5 and dayLen() comes out
       -1.8e-10 instead of 0. Force `window.seasonCool = () => 0.5` => dayLen() === 0 BY
       ARITHMETIC => sunWarp(t) returns t through its own guard => HEAD and patch must be
       BYTE-IDENTICAL on every column.

   BUILD-AGNOSTIC: SRC=<path> grades any build; all three instruments hook or read the
   artifact's own functions, so ONE file grades HEAD and the patch with no source swap
   and no cross-build floor (230). */
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { homedir } from 'node:os';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = process.env.SRC ? resolve(process.env.SRC) : join(HERE, '../../../../solvista.html');
const SEEDS = [42, 7, 1234];

/* seasonCool() = 0.5 - 0.5*cos(2PI*(s-0.62)) => 1 at s=0.12 (wet winter), 0 at s=0.62 (dry peak).
   dayLen() = DAYLEN*(2*seasonCool()-1) => +0.10 in winter (sun sets EARLY), -0.10 in summer. */
const SEASONS = [
  { name: 'winter', frac: 0.12 },
  { name: 'summer', frac: 0.62 },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
await page.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await page.goto('file://' + SRC);
await page.waitForFunction(() => typeof window.__warp === 'function');

const rows = await page.evaluate(({ SEEDS, SEASONS }) => {
  playing = false;                       /* stops dayT and year; SUNT is derived in render() */
  const out = [];

  /* --- hook hexTile to count the sea's shimmer wash (274: count OBJECTS, not pixels) --- */
  let shimmer = 0, glintKey = '';
  const rgbOf = s => { const m = String(s).match(/[\d.]+/g); return m ? m.slice(0, 3).map(Number).join(',') : ''; };
  const _hexTile = window.hexTile;
  window.hexTile = function (gx, gy, k, colr) {
    if (glintKey && rgbOf(colr) === glintKey) shimmer++;
    return _hexTile.apply(this, arguments);
  };

  /* The vector touches NO terrain and NO rng() — the city is invariant across this whole
     sweep — so build it ONCE per seed. Rebuilding per frame costs ~800 ticks a frame and
     buys nothing. (It also keeps `hexTile`'s hook counting one steady city.) */
  const build = seed => { genWorld(seed); __warp(61); STARS.length = 0; flock = null; };

  /* ⚠ A top-level `function seasonCool(){}` is a NON-CONFIGURABLE global property, so
     `delete window.seasonCool` FAILS SILENTLY in sloppy mode and the stub survives FOREVER.
     The first equinox block then poisons every later seed, which reads its "winter" and its
     "summer" at dayLen()===0 — i.e. it prints the CONTROL and calls it the treatment.
     Keep the original and restore it BY ASSIGNMENT. (The tell was unmissable: two seasons
     with an IDENTICAL day length, on a curve 261 proved is alive.) */
  const SEASONCOOL = window.seasonCool;

  /* the seeded fog `spell` SATURATES FOGAMT at 1.0, and a field at its ceiling cannot
     express the dawn term (259). Pin `time` so sin(...) = -1 => spell = -1.25 => max(0,spell)
     = 0 => FOGAMT is dawn*0.85 exactly, and the dawn peak is legible. */
  const quietFogTime = () => {
    const TWO_PI = 6.2831853;
    const ph = (seedNum % 97) * 0.7, want = 1.5 * Math.PI;   /* sin = -1 => spell = -1.25 */
    /* ph runs to 96*0.7 = 67.2, FAR past `want`, so (want-ph) is deeply NEGATIVE — wind it
       forward by whole periods until `time` is positive, or the probe pins a negative clock. */
    let u = want - ph; while (u < 0) u += TWO_PI;
    return u / 0.028;
  };

  const frame = (yearFrac, t, { equinox = false } = {}) => {
    /* the fixed point: stub the PREDICATE to its mean, never the year (261) */
    window.seasonCool = equinox ? (() => 0.5) : SEASONCOOL;
    __setYear(2035 + yearFrac);
    time = quietFogTime(); waveT = 500;  /* pin the 3rd/4th clocks: fog's `spell`, the surf */
    if (window.__setWind) __setWind(0.5);
    __setTime(t);
    /* SUNT/LITAMT are recomputed ONCE A FRAME INSIDE render() (274) — never read them
       straight after __setTime, or you read the PREVIOUS frame's light. */
    glintKey = rgbOf(colA('glint', 1, 1));
    shimmer = 0;
    render();
    syncStats();                          /* 204: the HUD does not follow a frozen clock */
    const sunUp = SUNT >= SUNUP && SUNT < SUNDN;
    return {
      dayT, SUNT, LITAMT, sunUp,
      hud: document.getElementById('stPhase').textContent,   /* the viewer's units (205/236) */
      shimmer,
      fog: FOGAMT,
      /* must-not-move controls: WALL-CLOCK readers, by design */
      moon: Math.round(moonPhase() * 1e6) / 1e6,
      clock: clockWord(dayT),
    };
  };

  /* --- the sun's own true sunrise/sunset per season, from the artifact's own curve --- */
  const solve = (yearFrac, target, lo, hi) => {          /* invert sunWarp for SUNT = target */
    window.seasonCool = SEASONCOOL;
    __setYear(2035 + yearFrac);
    for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (sunWarp(m) < target) lo = m; else hi = m; }
    return (lo + hi) / 2;
  };

  for (const seed of SEEDS) {
    build(seed);
    for (const S of SEASONS) {
      const sunrise = solve(S.frac, SUNUP, 0.0, 0.40);
      const sunset  = solve(S.frac, SUNDN, 0.45, 0.99);

      /* sweep the day at 1/200 (about 7 wall-minutes a step) */
      let hudLies = 0, shimAfterSet = 0, shimTotal = 0, sunlitNoShim = 0, steps = 0;
      let fogPeak = -1, fogPeakT = 0, shimLast = -1;
      const SAY_UP = new Set(['dawn', 'daytime', 'golden hour', 'sunset']);
      for (let i = 0; i < 200; i++) {
        const t = i / 200;
        const f = frame(S.frac, t);
        steps++;
        const hudSaysUp = SAY_UP.has(f.hud);
        if (hudSaysUp !== f.sunUp) hudLies++;
        if (f.shimmer > 0) { shimTotal++; shimLast = t; if (!f.sunUp) shimAfterSet++; }
        /* THE REAL QUESTION, in the artifact's OWN constant: the lit glass comes on at
           LITAMT >= 0.35, so LITAMT < 0.35 IS "broad daylight". Sun up + broad daylight +
           a sea that does not shimmer = the specular sheet died while the sun still shone.
           (LITAMT is the ARTIFICIAL-light amount — high at NIGHT — so (1-LITAMT) already
           gates the glitter seasonally at the DUSK end. The defect can only live at the
           end where LITAMT is NOT the binding constraint.) */
        if (f.sunUp && f.LITAMT < 0.35 && f.shimmer === 0) sunlitNoShim++;
        if (f.fog > fogPeak) { fogPeak = f.fog; fogPeakT = t; }
      }
      out.push({
        seed, season: S.name, sunrise, sunset,
        dayLen: sunset - sunrise,
        hudLiesPct: 100 * hudLies / steps,
        shimTotal, shimAfterSet, sunlitNoShim, shimLast,
        fogPeakT, fogPeak,
      });
    }

    /* --- THE FIXED POINT: seasonCool stubbed to 0.5 => dayLen()===0 => sunWarp(t)===t --- */
    const eq = [];
    for (let i = 0; i < 40; i++) {
      const t = i / 40;
      const f = frame(0.12, t, { equinox: true });
      eq.push([f.dayT, f.SUNT, f.LITAMT, f.hud, f.shimmer, f.fog, f.moon, f.clock].join('|'));
    }
    out.push({ seed, season: 'EQUINOX(fixed point)', fp: eq.join('\n') });
  }
  return out;
}, { SEEDS, SEASONS });

await browser.close();

console.log('=== probe-suntclock — is the light curve\'s clock read by ALL its readers? ===');
console.log('SRC:', SRC);
console.log('\nsun-up window is SUNT in [SUNUP 0.05, SUNDN 0.78) — a pure function of SUNT (261).\n');

const fp = {};
console.log('seed  season |  sunrise  sunset  daylen |  HUD-LIES  | shim: total  last@  AFTERSET  SUNLIT-NO-SHIM | fog peak @dayT');
console.log('-'.repeat(126));
for (const r of rows) {
  if (r.fp) { fp[r.seed] = r.fp; continue; }
  console.log(
    String(r.seed).padEnd(5), r.season.padEnd(7), '|',
    r.sunrise.toFixed(3).padStart(7), r.sunset.toFixed(3).padStart(7), r.dayLen.toFixed(3).padStart(7), '|',
    (r.hudLiesPct.toFixed(1) + '%').padStart(9), ' |',
    String(r.shimTotal).padStart(9), r.shimLast.toFixed(3).padStart(7), String(r.shimAfterSet).padStart(9),
    String(r.sunlitNoShim).padStart(15), '|',
    r.fogPeakT.toFixed(3).padStart(8), '(' + r.fogPeak.toFixed(3) + ')'
  );
}

console.log('\n=== FIXED POINT (seasonCool stubbed to 0.5 => dayLen()===0 => sunWarp(t)===t) ===');
console.log('every column must be BYTE-IDENTICAL between HEAD and the patch. Digest per seed:');
for (const s of Object.keys(fp)) {
  let h = 0;
  for (let i = 0; i < fp[s].length; i++) { h = ((h << 5) - h + fp[s].charCodeAt(i)) | 0; }
  console.log('  seed', s, ' digest', (h >>> 0).toString(16).padStart(8, '0'));
}

console.log(`
READ IT LIKE THIS
  HUD-LIES        the % of the day the phase pill's word contradicts the sun's own state.
                  A wall-clock word on a warped curve MUST lie at the margins.
  shim last@      the LAST dayT at which the sea still draws the sun's shimmer. Compare it
                  against SUNSET: if it is a CONSTANT while sunset MOVES, the envelope is
                  season-blind and the sea is not on the sun's clock.
  AFTERSET        frames drawing the SUN's shimmer with the sun DOWN. Expect ~0: (1-LITAMT)
                  already gates the dusk end, so the defect CANNOT live there.
  SUNLIT-NO-SHIM  frames where the sun is UP and it is broad daylight (LITAMT < 0.35, the
                  artifact's own lit-glass threshold) and the sea does NOT shimmer — the
                  specular sheet dying while the sun still shines. THIS is the live end.
  fog peak        the dayT of the dawn fog's maximum. It should track the season's SUNRISE.`);
