#!/usr/bin/env node
/* probe-crowdshadow — do the STATIC standing crowds now cast the same house-style
 * ground contact shadow every walking figure got in iter 137? (iter 163,
 * People & activity × Polish, closing 137's banked gap.)
 *
 * 137 shadowed the MOVING figures (peds/dogs/joggers) but explicitly banked the
 * STATIC standing crowds as still shadowless. Two of those stand on the GROUND:
 *   - the evening strip crowd on COM (gated LITAMT>0.35 && v>0.6)
 *   - the school-run drop-off crowd at the gate (gated dayT in (0.15,0.30))
 * Both are DETERMINISTIC hashCell/frozen-time draws (unlike the live-ped system
 * 137 had to place by hand), so a whole-frame build-vs-build diff LOCATES the
 * change by construction (iter 161's law): with every mover cleared and the clock
 * frozen, the two builds render identically EXCEPT the crowd shadows, so every
 * pixel that differs IS one — no fragile per-figure box needed.
 *
 *   EVENING (dayT 0.88): the strip crowd draws -> changed pixels appear and the
 *                        net luminance goes NEGATIVE (a shadow is darker).
 *   MORNING (dayT 0.22): the school-run crowd draws -> same.
 *   CONTROL (dayT 0.45): neither crowd's gate holds -> ~0 changed pixels
 *                        (proves the change touches ONLY the crowd frames, and
 *                        the platform/concourse crowds were left untouched).
 *
 *   node probe-crowdshadow.mjs [seed ...]
 */
import { homedir, tmpdir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync, mkdtempSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const CAND = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html')];
const ART = CAND.find(existsSync);
const REPO = dirname(ART);
const SEEDS = process.argv.slice(2).filter(a => !a.startsWith('-')).map(Number);
const seeds = SEEDS.length ? SEEDS : [7, 42];
const q = s => `?seed=${s}&warp=61&year=2035.62`;

const tmp = mkdtempSync(join(tmpdir(), 'crowdshadow-'));
const HEAD = join(tmp, 'head.html');
writeFileSync(HEAD, execFileSync('git', ['-C', REPO, 'show', 'HEAD:solvista.html']));

/* Return the whole canvas as RGBA for a canonical frozen frame. The RAF loop runs
 * a load-timing-dependent number of tick()s before we can freeze, which flips
 * 2035-era development cells DIFFERENTLY between the two builds and swamps the tiny
 * shadow additions. So we don't trust the loaded state: we REBUILD the city
 * deterministically in-page (genWorld(seed) + __warp) — identical code in both
 * builds, so byte-identical cities — then clear every mover and freeze the clock,
 * leaving the deterministic crowd draws as the ONLY difference. */
async function frame(page, url, seed, dayT) {
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForFunction('window.__find');
  return page.evaluate(([seed, dayT]) => {
    playing = false; time = 5.0; waveT = 3.0;
    genWorld(seed); syncStats(); window.__warp(61); /* canonical 2035 state, no wall-clock ticks */
    window.__setYear(2035.62);
    if (typeof flock !== 'undefined') flock = null;
    for (const a of [vehicles, bikes, trams, trucks, peds, boats, ferries, freighters,
      birds, shuttles, dogs, kites, surfers, dolphins, whales, herons, kayaks, joggers,
      deer, clouds, balloons, copters]) a.length = 0;
    STARS.length = 0;       /* the 70-star field is built once at load with UNSEEDED
      Math.random, so it differs per page load — clear it (it is not our feature) */
    Math.random = () => 0.5; /* neutralize any residual draw-time randomness so the
      ONLY build-to-build difference left is the deterministic crowd shadow */
    window.__setTime(dayT); render();
    const cv = document.querySelector('canvas');
    return Array.from(cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data);
  }, [seed, dayT]);
}

/* whole-frame diff. A contact shadow can ONLY darken, so we separate DARKENED from
 * LIGHTENED pixels (iter 161's directional law): a real shadow gives darker >>
 * lighter; residual noise is balanced. `changed` = |ΔRGB|>3 either way. */
function diff(a, b) {
  let changed = 0, darker = 0, lighter = 0, n = a.length / 4;
  for (let k = 0; k < n; k++) {
    const i = k * 4;
    const d = (Math.abs(a[i] - b[i]) + Math.abs(a[i + 1] - b[i + 1]) + Math.abs(a[i + 2] - b[i + 2])) / 3;
    if (d > 3) {
      changed++;
      const dl = (0.299 * a[i] + 0.587 * a[i + 1] + 0.114 * a[i + 2]) - (0.299 * b[i] + 0.587 * b[i + 1] + 0.114 * b[i + 2]);
      if (dl < -3) darker++; else if (dl > 3) lighter++;
    }
  }
  return { changed, darker, lighter };
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const FR = [['evening/strip', 0.88], ['morning/school', 0.22], ['midday/control', 0.45]];
console.log('seed | frame           | darker px | lighter px | changed');
console.log('─'.repeat(60));
const res = {};

for (const s of seeds) {
  for (const [name, dt] of FR) {
    const h = await frame(page, pathToFileURL(HEAD).href + q(s), s, dt);
    const p = await frame(page, pathToFileURL(ART).href + q(s), s, dt);
    const r = diff(p, h);
    (res[name] ||= []).push(r);
    console.log(`${String(s).padEnd(4)} | ${name.padEnd(15)} | ${String(r.darker).padStart(9)} | ${String(r.lighter).padStart(10)} | ${String(r.changed).padStart(7)}`);
  }
}
await browser.close();

/* THE GATE IS THE STRIP CROWD (86 COM tiles): both seeds must show many darker px
 * and ZERO lighter — a contact shadow can only darken, so any lighter px would mean
 * pollution. The midday control, where neither crowd's gate holds, must be flat
 * (~noise floor). The SCHOOL crowd (only 4 schools, a narrow morning window) is
 * genuinely below the whole-frame noise floor: its pooled darker/lighter FLIPS run
 * to run, so it is NOT gated here — it uses the identical shadS-at-feet idiom and is
 * confirmed in daylight by the visual gate (probe-crowdshot.mjs). Reported for
 * information only. */
const strip = res['evening/strip'], school = res['morning/school'], ctrl = res['midday/control'];
const sum = (arr, k) => arr.reduce((a, r) => a + r[k], 0);
const okStrip = strip.every(r => r.darker > 100 && r.lighter === 0);
const okCtrl = ctrl.every(r => r.darker < 12 && r.lighter < 12);
console.log('─'.repeat(60));
console.log(`strip GATE:      darker ${strip.map(r => r.darker).join('/')} px, lighter ${strip.map(r => r.lighter).join('/')} (both seeds; a shadow only darkens)`);
console.log(`control (flat):  darker/lighter ${ctrl.map(r => r.darker + '/' + r.lighter).join('  ')} (want ~0/0)`);
console.log(`school (info):   pooled darker ${sum(school, 'darker')} vs lighter ${sum(school, 'lighter')} — below whole-frame floor, see visual gate`);
console.log(`VERDICT: ${okStrip && okCtrl ? 'PASS' : 'FAIL'}`);
