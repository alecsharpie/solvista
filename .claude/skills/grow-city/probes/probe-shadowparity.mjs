#!/usr/bin/env node
/* probe-shadowparity.mjs — iter 226's DECIDING gate.
 *
 * The queue-shadow probe proved the new shadows exist, swing with the sun, and disturb
 * nothing. It could not answer the question the visual agents actually raised: at fit
 * zoom each one is ~2 px, and an agent could not see it. Is that a DEFECT?
 *
 * It is only a defect if it is UNLIKE the shadows the artifact already ships. The claim
 * was never "a big shadow" — it is "the WAITING figures are grounded like every other
 * figure in the city". So the control is not a threshold I choose (205: a probe whose
 * threshold is in the units of my own design constant grades its own homework). The
 * control is the CITY'S OWN, already-shipped, already-accepted shadow:
 *
 *   TREATMENT  the three waiting crowds added by 226   (bus queue, rail queue, stadium)
 *   CONTROL A  the ped's contact shadow                 (r=0.10 — the house standard)
 *   CONTROL B  iter 163's strip-crowd shadow            (r=0.09, a=0.16 — IDENTICAL idiom,
 *                                                        the same feature, shipped 63 laps ago)
 *
 * Each is isolated by stack-suppressing ONLY its own call sites and re-rendering, so
 * every number is ink the user can actually see off the final composited canvas (161/200).
 * If a queue figure renders the same ink as a ped, the feature is the house standard
 * applied consistently, and "an agent cannot see it at fit zoom" is true of EVERY shadow
 * in Solvista — not a fault of this one.
 *
 *   node probe-shadowparity.mjs
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = join(HERE, '../../../../solvista.html');

const SEEDS = [7, 42, 1234];
const WARP = 61, T = 0.30;                 /* plain daylight: every crowd is out */
const W = 1600, H = 1000;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H } });
await page.addInitScript(() => {           /* 213 */
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await page.goto(pathToFileURL(ART).href);
await page.waitForFunction(() => window.__census);

const rows = await page.evaluate(({ seeds, warp, t }) => {
  const GROUPS = {
    'queue (226, NEW)': /solvista\.html:(4444|5007|6203):/,
    'ped (house std)': /solvista\.html:6367:/,
    'strip crowd (163)': /solvista\.html:5375:/,
  };
  const orig = window.shadS;
  let count = 0, suppress = null;
  window.shadS = function (cx, cy, r, a) {
    const st = new Error().stack || '';
    if (suppress && suppress.test(st)) return;      /* stack-matched suppression */
    if (counting && counting.test(st)) count++;
    return orig.call(this, cx, cy, r, a);
  };
  let counting = null;
  const grab = () => cvs.getContext('2d').getImageData(0, 0, cvs.width, cvs.height).data;
  const diff = (A, B) => {
    let px = 0;
    for (let i = 0; i < A.length; i += 4)
      if (A[i] !== B[i] || A[i + 1] !== B[i + 1] || A[i + 2] !== B[i + 2]) px++;
    return px;
  };

  const out = [];
  for (const seed of seeds) {
    playing = false;
    genWorld(seed); __warp(warp);
    STARS.length = 0; flock = null;
    time = 1234.5; waveT = 567.8;
    __setTime(t);
    lastSky = 0; syncSky(performance.now()); syncStats();

    suppress = null; counting = null; render();
    const A = grab();
    suppress = null; counting = null; render();
    const floor = diff(A, grab());                  /* the honest zero, printed (203) */

    for (const [name, re] of Object.entries(GROUPS)) {
      suppress = null; counting = re; count = 0; render();   /* count this group's figures */
      const figs = count;
      suppress = re; counting = null; render();               /* ...and remove them */
      const px = diff(A, grab());
      out.push({ seed, name, figs, px, perFig: figs ? +(px / figs).toFixed(1) : NaN, floor });
    }
  }
  window.shadS = orig;
  return out;
}, { seeds: SEEDS, warp: WARP, t: T });

await browser.close();
console.log('\niter 226 — is a waiting figure\'s shadow the SAME as the shadows Solvista already ships?');
console.log('(fit zoom, plain daylight, 3 seeds. px = visible shadow ink off the final frame.)\n');
console.log('seed   group                figs    px    px/figure   floor');
for (const r of rows)
  console.log(String(r.seed).padEnd(6), r.name.padEnd(20), String(r.figs).padStart(4),
    String(r.px).padStart(5), String(r.perFig).padStart(10), String(r.floor).padStart(7));
console.log(`
READ: floor must be 0. The verdict is the px/figure COLUMN, read ACROSS the groups:
if a 226 queue figure renders about what a ped or a 163 strip-crowd figure renders, then
226 is the house standard applied to the last crowd that lacked it — and "invisible at fit
zoom" is a true statement about EVERY shadow in this city, not an objection to this one.
`);
