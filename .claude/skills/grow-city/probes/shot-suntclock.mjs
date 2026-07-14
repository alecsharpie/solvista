/* shot-suntclock — the camera for iter 284 (the light curve's clock had two readers left
   on the WALL clock).

   THE FOG IS A CROSSED DISCRIMINATING PAIR (264). At ONE wall-clock instant the two builds
   must disagree in OPPOSITE directions depending on the season, which is a question no agent
   can fluke:
     winter dayT 0.20  ->  HEAD clear (dawn 0.000) | PATCH FOGGY (0.973)   sun only just up
     summer dayT 0.10  ->  HEAD FOGGY (1.000)      | PATCH clear (0.000)   sun rose an hour ago
   A single "is there fog" frame proves nothing; the CROSS is the whole gate.

   THE HUD is DOM, so this MUST use page.screenshot(), never a canvas readback (200).
   At the winter dusk pin the plate renders as full night and HEAD's pill still says "sunset".

   LAWS OBEYED
     - freeze in-page (playing=false stops BOTH clocks); pin genWorld + __warp + __setYear +
       __setTime; render() BEFORE the DOM sync, exactly as frame() does (261 — the reverse
       order paints a stale sky and draws a false FAIL).
     - force the HUD: lastSky=0; syncSky(); syncStats() — a frozen clock does not refresh the
       DOM, and syncStats() only runs while playing (204).
     - frames are named BY FILE with MEANINGLESS, NON-ORDINAL tokens, and the HEAD/patch map
       is CROSSED between seeds, so "the second one is the fix" fails on one of them
       (238/239/268).
     - every frame SELF-REPORTS its own state (202), in the VIEWER'S units (236). */
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { homedir } from 'node:os';
import { mkdirSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));

const PATCH = join(HERE, '../../../../solvista.html');
const HEAD = process.env.HEAD_SRC || '/tmp/head284.html';
const OUT = process.env.OUT || join(HERE, '../shots/sunt');
mkdirSync(OUT, { recursive: true });

/* meaningless, non-ordinal tokens — no alphabet, no seniority, nothing sortable (268) */
const TOKENS = { 42: { patch: 'kappa', head: 'sigma' }, 7: { patch: 'sigma', head: 'kappa' } };

const PINS = [
  { tag: 'wmorn', year: 0.12, t: 0.20, note: 'winter morning' },
  { tag: 'smorn', year: 0.62, t: 0.10, note: 'summer morning' },
  { tag: 'wdusk', year: 0.12, t: 0.766, note: 'winter dusk (the HUD pin)' },
];

const browser = await chromium.launch();

for (const seed of [42, 7]) {
  for (const [build, src] of [['patch', PATCH], ['head', HEAD]]) {
    const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
    await page.addInitScript(() => {
      let s = 0x51F3A9C >>> 0;
      Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    });
    await page.goto('file://' + resolve(src));
    await page.waitForFunction(() => typeof window.__warp === 'function');

    for (const P of PINS) {
      const state = await page.evaluate(({ seed, P }) => {
        playing = false;                       /* stops BOTH clocks */
        genWorld(seed); __warp(61);
        STARS.length = 0; flock = null;
        /* ⚠ PIN THE SEEDED FOG SPELL TO ZERO, or it SATURATES FOGAMT and destroys the pair.
           fogDepth = clamp(dawn*0.85 + max(0,spell)*1.25, 0, 1), and at an arbitrary `time`
           the spell alone can pin the plate at 1.0 — so both builds come back "foggy" and the
           discriminating cross is invisible. Choose `time` so sin(...) = -1 => spell = -1.25
           => max(0,spell) = 0 => the DAWN TERM IS THE WHOLE FOG, which is the thing under test.
           (`ph` runs to 96*0.7 = 67.2, far past the target, so wind forward by whole periods
           or `time` comes out negative.) */
        const TWO_PI = 6.2831853, ph = (seedNum % 97) * 0.7, want = 1.5 * Math.PI;
        let u = want - ph; while (u < 0) u += TWO_PI;
        time = u / 0.028; waveT = 500;
        if (window.__setWind) __setWind(0.5);
        __setYear(2035 + P.year);
        __setTime(P.t);
        render();                              /* render FIRST, as frame() does (261) */
        lastSky = 0; syncSky(performance.now()); syncStats();   /* 204 */
        const sunUp = SUNT >= SUNUP && SUNT < SUNDN;
        /* the season's own sunset, inverted from the artifact's own curve */
        let lo = 0.45, hi = 0.99;
        for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (sunWarp(m) < SUNDN) lo = m; else hi = m; }
        return {
          dayT: +dayT.toFixed(3), SUNT: +SUNT.toFixed(3),
          fog: +FOGAMT.toFixed(3),
          pill: document.getElementById('stPhase').textContent,
          sun: sunUp ? 'UP' : 'DOWN',
          sunset: +((lo + hi) / 2).toFixed(3),
        };
      }, { seed, P });

      const tok = TOKENS[seed][build];
      const file = join(OUT, `s${seed}-${P.tag}-${tok}.png`);
      await page.screenshot({ path: file });   /* DOM-composited: the HUD is not in the canvas (200) */
      console.log(
        `s${seed} ${P.tag.padEnd(6)} ${tok.padEnd(6)}  dayT=${state.dayT}  SUNT=${state.SUNT}` +
        `  sun=${state.sun} (sets ${state.sunset})  FOG=${state.fog}  pill="${state.pill}"   ${P.note}`
      );
    }
    await page.close();
  }
}
await browser.close();
console.log('\nwrote ->', OUT);
console.log('THE GATE IS THE CROSS: wmorn and smorn must disagree in OPPOSITE directions.');
