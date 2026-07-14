/* shot-darksky.mjs — the observatory's camera (iter 259).
 *
 * The vector is a SITING change, so each build must aim at its OWN dome: forcing HEAD
 * to the patch's hex would frame bare ground (244's law, shot-amphsight).
 *
 * NIGHT is the only light that can carry the claim: the whole point is the darkness
 * AROUND the dome, and the aperture only opens after dark (openAmt reads LITAMT).
 * The pin is taken from the light curve, not from intuition (202): dayT 0.92 = night.
 *
 * Frames per seed per build:
 *   *-city.png  un-zoomed whole plate -- the LOCATE frame. The agent is asked to POINT
 *               at the dome; this script prints its TRUE screen fraction, so a
 *               confabulated answer is visibly wrong (108's locate-with-an-answer-key).
 *   *-dome.png  a 4.0x close-up on that build's own dome -- does it sit correctly on
 *               the grid, and what is around it?
 *
 * 239: the frames are named by FILE, never by a letter, and the HEAD/patch mapping is
 * CROSSED between the seeds, so "the second one is always the fix" is false on one of
 * them. This script prints the map; the agent never sees it.
 *
 * 204: a frozen clock does NOT refresh the DOM -- syncSky is throttled 400ms and
 * syncStats only runs when playing -- so both are forced before every shot.
 * 200: page.screenshot(), never a canvas readback, so the HUD is composited in.
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));

const OUT = process.argv[2] || join(HERE, '../shots/darksky');
mkdirSync(OUT, { recursive: true });

const HEADPATH = '/tmp/solvista-darksky-HEAD.html';
writeFileSync(HEADPATH, execSync('git show HEAD:solvista.html', { cwd: HERE, maxBuffer: 1 << 28 }));

/* the mapping is CROSSED between seeds (238) — token -> build differs per seed */
/* seeds chosen because HEAD is BAD on them (233: a noise-drawn feature is a lottery, and a
   two-seed gate hands you one win and one loss — seed 42's HEAD dome lands at c.lit 0.026,
   dark BY LUCK, so it cannot discriminate). HEAD: seed 7 = 0.496 'lost to the city glow';
   seed 1234 = 1.000, the field's MAXIMUM — the dome in the blazing heart of the CBD. */
const PLAN = [
  { seed: 7,    tokens: { arc: 'HEAD', vane: 'patch' } },
  { seed: 1234, tokens: { arc: 'patch', vane: 'HEAD' } },
];
const SRC = { HEAD: 'file://' + HEADPATH, patch: 'file://' + join(HERE, '../../../../solvista.html') };
const NIGHT = 0.92;          /* off the light curve (202), not guessed */

const br = await chromium.launch();
console.log(`\nHEAD/patch map (the agents never see this):`);
for (const { seed, tokens } of PLAN)
  console.log(`  seed ${seed}: ` + Object.entries(tokens).map(([t, b]) => `${t}=${b}`).join('  '));
console.log(`\nframe                         dome hex    c.lit   d(CBD)  sky                    true screen pos   LITAMT`);

for (const { seed, tokens } of PLAN) {
  for (const [token, build] of Object.entries(tokens)) {
    const p = await br.newPage({ viewport: { width: 1400, height: 900 } });
    await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
      Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
    await p.goto(SRC[build]);
    await p.evaluate(() => { window.FIT = [scale, offX, offY]; });

    for (const zoom of [0, 4.0]) {
      const name = `s${seed}-${token}-${zoom ? 'dome' : 'city'}.png`;
      const st = await p.evaluate(({ seed, zoom, NIGHT }) => {
        playing = false;                            /* stops BOTH clocks */
        genWorld(seed); __warp(61); __setTime(NIGHT);
        /* find THIS build's own dome */
        let ox = -1, oy = -1, lit = null;
        for (const i of HEXI) {
          const c = cells[i];
          if (c.t === T.CIVIC && c.kind === 'observatory') { ox = i % G; oy = (i / G) | 0; lit = c.lit; }
        }
        const [wx, wy] = ctr(ox, oy);
        scale = FIT[0]; offX = FIT[1]; offY = FIT[2];
        if (zoom) { scale = zoom; offX = innerWidth / 2 - wx * zoom; offY = innerHeight / 2 - wy * zoom; }
        lastSky = 0; syncSky(performance.now()); syncStats();   /* 204: the DOM is not live */
        render();
        /* the dome's TRUE position on screen — the answer key for a blind locate (108) */
        const sx = wx * scale + offX, sy = wy * scale + offY;
        /* NB: seeingWord() is patch-only — the word is formed in node, so this runs on HEAD too */
        return { ox, oy, lit, d: hexDist(ox, oy, CBDX, CBDY),
          fx: sx / innerWidth, fy: sy / innerHeight, LITAMT, dayT };
      }, { seed, zoom, NIGHT });

      const sky = st.lit < 0.10 ? 'Dark — good seeing'
        : st.lit < 0.25 ? 'Dark, out past the glow'
        : st.lit < 0.45 ? 'Washed by the city glow' : 'Lost to the city glow';
      await p.screenshot({ path: join(OUT, name) });   /* 200: DOM-composited */
      console.log(`${name.padEnd(28)}  (${String(st.ox).padStart(2)},${String(st.oy).padStart(2)})   ` +
        `${st.lit.toFixed(3)}    ${String(st.d).padStart(2)}    ${sky.padEnd(24)} ` +
        `(${st.fx.toFixed(2)}, ${st.fy.toFixed(2)})     ${st.LITAMT.toFixed(2)}`);
    }
    await p.close();
  }
}
await br.close();
console.log(`\nframes -> ${OUT}\n`);
