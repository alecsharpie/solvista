/* probe-beachpalm — DOES THE BEACH EMPTY, OR DOES IT GROW PALMS?
 *
 * The gate my first probe could not be. That one measured "how many beach pixels change
 * between winter and the dry peak" and read a big number as success — but a PIXEL DIFF
 * CANNOT SAY WHAT THE PIXELS CHANGED *TO*. They had changed into palm trees: the umbrella
 * arm and the palm arm are adjacent arms of ONE else-if chain on the same `v`, so shrinking
 * the furniture's threshold handed every vacated deckchair slot to the next arm, and winter
 * grew a full palm in each. Two visual agents caught it; the probe passed it happily.
 * (214: a probe measuring a NECESSARY but not SUFFICIENT quantity will pass a change the
 * eye rejects. "The sand changed" is necessary for "the beach emptied"; it is not sufficient.)
 *
 * So measure the thing that must NOT move, in the units of the thing that broke:
 *
 *   PALMS  — hook palm() and COUNT THE CALLS per season. A palm does not migrate. This must
 *            be FLAT across the year, and IDENTICAL to HEAD. It is deterministic — no pixels,
 *            no noise floor, nothing to stub — and it is the whole verdict.
 *   TOWELS — hook the towel's fillRect. This is the treatment: it must SWING with the season,
 *            and must equal HEAD exactly at the dry peak (245's fixed point).
 */
import { pathToFileURL, fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { homedir } from 'node:os';
import { execSync } from 'node:child_process';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;

const HERE = dirname(fileURLToPath(import.meta.url));
const PATCH = join(HERE, '../../../../solvista.html');
const HEAD = '/tmp/beachpalm-head.html';
execSync(`git -C ${HERE} show HEAD:solvista.html > ${HEAD}`);

const SEEDS = [42, 7, 1234];
const PINS = { winter: 0.02, spring: 0.30, drypeak: 0.62, autumn: 0.87 };

const freeze = (seed) => {
  playing = false;
  genWorld(seed);
  __warp(61);
  STARS.length = 0; flock = null; clouds.length = 0;
  for (const [g] of ENTINFO) { const a = g(); if (Array.isArray(a)) a.length = 0; }
  time = 1000; waveT = 500;
  __setTide(0.59);
  __setTime(0.30);
};

const run = async (browser, art, seed) => {
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.addInitScript(() => {
    let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  });
  await page.goto('file://' + art);
  await page.waitForTimeout(600);
  const r = await page.evaluate(({ seed, PINS, freezeSrc }) => {
    eval('(' + freezeSrc + ')')(seed);
    const cvs = document.querySelector('canvas'), ctx = cvs.getContext('2d');

    // hook palm(): count the calls. Deterministic; this is the invariant under test.
    const realPalm = palm;
    let palms = 0;
    palm = function (...a) { palms++; return realPalm.apply(this, a); };

    // hook the towel: fillRect(cx-6, cy+1, 4, 2.4) is unique to the beach furniture
    const realFR = ctx.fillRect.bind(ctx);
    let towels = 0;
    ctx.fillRect = function (x, y, w, h) { if (w === 4 && h === 2.4) towels++; return realFR(x, y, w, h); };

    const out = {};
    for (const k in PINS) {
      palms = 0; towels = 0;
      __setYear(2035 + PINS[k]); render();
      out[k] = { palms, towels };
    }
    palm = realPalm; ctx.fillRect = realFR;
    return out;
  }, { seed, PINS, freezeSrc: freeze.toString() });
  await page.close();
  return r;
};

const browser = await chromium.launch();
console.log('\n  PALMS must be FLAT across the year and IDENTICAL to HEAD (a palm does not migrate).');
console.log('  TOWELS must SWING, and must equal HEAD at the dry peak (245\'s fixed point).\n');
console.log('  ' + '='.repeat(80));
console.log('   seed  build  |          PALMS  (must be flat)        |        TOWELS  (must swing)');
console.log('                | winter spring drypeak autumn | flat? | winter spring drypeak autumn');
console.log('  ' + '='.repeat(80));
let bad = 0;
for (const seed of SEEDS) {
  const h = await run(browser, HEAD, seed);
  const p = await run(browser, PATCH, seed);
  for (const [tag, r] of [['HEAD ', h], ['patch', p]]) {
    const pl = ['winter', 'spring', 'drypeak', 'autumn'].map(k => r[k].palms);
    const tw = ['winter', 'spring', 'drypeak', 'autumn'].map(k => r[k].towels);
    const flat = pl.every(v => v === pl[0]);
    if (!flat) bad++;
    console.log(`   ${String(seed).padStart(4)}  ${tag}  |` +
      pl.map(v => String(v).padStart(6)).join(' ') + `  |  ${flat ? ' ✓ ' : ' ✗ '}  |` +
      tw.map(v => String(v).padStart(6)).join(' '));
  }
  const peakSame = h.drypeak.towels === p.drypeak.towels && h.drypeak.palms === p.drypeak.palms;
  console.log(`         fixed point @ dry peak: HEAD ${h.drypeak.towels} towels / ${h.drypeak.palms} palms  vs  ` +
    `patch ${p.drypeak.towels} / ${p.drypeak.palms}   ${peakSame ? '✓ IDENTICAL' : '✗ DIVERGED'}`);
  if (!peakSame) bad++;
  console.log('  ' + '-'.repeat(80));
}
console.log(bad === 0
  ? '\n  VERDICT: PASS — palms are season-invariant on both builds; only the crowd moves.\n'
  : `\n  VERDICT: FAIL — ${bad} check(s) failed.\n`);
await browser.close();
