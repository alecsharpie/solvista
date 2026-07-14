/* 261 — DOES THE SEASON HAVE A DAY LENGTH, AND CAN A VIEWER SEE IT?
 *
 * 260 proved 253's seasonal light REAL and INVISIBLE: it is a global multiplicative CHROMA
 * cast, which is exactly the transform colour constancy divides out. Measured, winter moved
 * warm-cool d=0.52 (HARDER than the golden hour's 0.43, which every agent calls obvious) and
 * luminance d=0.09 (where the golden hour moves 0.69). ⇒ the season needs a NON-CHROMATIC
 * channel, and the one the sky owns is WHEN THE SUN IS UP.
 *
 * THE TRAP THIS PROBE IS BUILT TO AVOID (205): a day-length feature is loudest in the
 * evening and silent at noon, so picking an evening pin and reporting a big number is
 * grading my own homework — the threshold would be in the units of my own design constant.
 * So Part B SWEEPS THE WHOLE DAY and prints the shape of the function. HEAD must read ~0 at
 * every hour (its light curve has no `year` term at all); the patch must be ~0 at NOON (a
 * winter noon is still noon — this is the free must-not-move control) and LARGE at dawn/dusk.
 * The GOLDEN HOUR is carried as the INCUMBENT BAR (226): a light change both agents called
 * obvious, in the same units, in the same frame. It is a threshold I did not invent.
 *
 * A. THE WORLD DATA — pure. No render, no clock, no noise floor. Drives THE ARTIFACT'S OWN
 *    sunWarp/SUNUP/SUNDN (249: never re-implement the rule under test) and reports sunrise,
 *    sunset and day length per season. ⚠ HEAD's answer is a CONSTANT BY CONSTRUCTION, so
 *    "DISTINCT DAY LENGTHS = 1" is an unarguable baseline nobody had to design (236).
 *
 * B. THE SWEEP — is it VISIBLE? Reuses probe-seasonhue's rig exactly: warm-cool (R-B) AND
 *    luminance, each as Cohen's d against the plate's OWN within-frame grain (254/255: an
 *    amplitude, never a count). All renders in ONE page on ONE world ⇒ the identical-pin
 *    floor is EXACTLY 0 and is printed first (203). Plate mask is free: render() clearRect()s,
 *    so the void is alpha=0 and the CSS sky cannot inflate anything (200).
 *
 * C. THE FIXED POINT (245). dayLen() is centred on the season's mean, so it is EXACTLY 0 at
 *    the equinox and sunWarp returns t unchanged ⇒ the patch must run HEAD's byte-identical
 *    code path. Proved TWICE:
 *      C1 — 253's PREDICATE SUPPRESSION, inside ONE page (floor exactly 0, build-agnostic):
 *           window.dayLen = () => 0 collapses the warp to identity. At the equinox this must
 *           change NOTHING (dayLen is already 0); in winter it must change A LOT.
 *      C2 — the cross-build diff, patch vs pristine HEAD, with HEAD-vs-HEAD measured as the
 *           floor IN THE SAME RUN (213), and a winter control that must diverge hugely.
 *
 *   node probe-daylen.mjs [seed...]
 */
import { homedir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { existsSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html')].find(existsSync);

const SEEDS = process.argv.slice(2).map(Number).filter(Boolean);
const seeds = SEEDS.length ? SEEDS : [42, 7];

/* pristine HEAD, for C2 only. No /bin/cp of the artifact — nothing can be left swapped (197). */
const HEADF = '/tmp/solvista-head-261.html';
writeFileSync(HEADF, execSync(`git -C ${HERE} show HEAD:solvista.html`, { maxBuffer: 1 << 28 }));

/* applySeason's own keyframes. EQUINOX is where seasonCool()==0.5 exactly (0.62 - 0.25). */
const WINTER = 2035.02, DRYPEAK = 2035.62, EQUINOX = 2035.87;
/* the light pins come from the light curve, never from intuition (202). */
const GOLDEN = 0.68;
const SWEEP = [0.10, 0.20, 0.30, 0.42, 0.55, 0.66, 0.74, 0.80];   /* dawn .. noon .. dusk */
const NOONPIN = 0.42, EVEPIN = 0.74;

const browser = await chromium.launch();
const fmt = (n, w = 6, p = 2) => String(n.toFixed(p)).padStart(w);

async function open(file) {
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 });
  /* 213: stub the PRNG before the page's own script, not merely before genWorld. */
  await page.addInitScript(() => {
    let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  });
  await page.goto(pathToFileURL(file).href);
  await page.waitForTimeout(400);
  return page;
}

/* the freeze + the two stat rigs, injected identically into every page (HEAD and patch). */
const RIG = ({ seed }) => {
  playing = false;
  genWorld(seed);
  __warp(61);
  STARS.length = 0; flock = null;   /* lexical, not window props (163/199) */
  for (const a of [vehicles, bikes, trams, trucks, peds, boats, ferries, freighters, birds,
                   shuttles, dogs, kites, surfers, dolphins, whales, herons, kayaks, joggers,
                   deer, clouds, balloons, copters]) if (Array.isArray(a)) a.length = 0;

  window.__grab = (t, year) => {
    __setYear(year); __setTime(t);
    lastSky = 0; syncSky(performance.now());
    render();
    return cvs.getContext('2d').getImageData(0, 0, cvs.width, cvs.height).data;
  };
  /* probe-seasonhue's stat, verbatim: the shift on both axes, each in units of the plate's
     own within-frame grain. A: reference frame (also supplies the grain). B: the other pin. */
  window.__stat = (A, B) => {
    let n = 0, sw = 0, sl = 0, sww = 0, sll = 0, gw = 0, gww = 0, gl = 0, gll = 0, px = 0;
    for (let i = 0; i < A.length; i += 4) {
      if (A[i + 3] < 250) continue;                        /* void: render() clearRect()s */
      n++;
      const wA = A[i] - A[i + 2], wB = B[i] - B[i + 2];    /* warm-cool: R - B */
      const lA = 0.30 * A[i] + 0.59 * A[i + 1] + 0.11 * A[i + 2];
      const lB = 0.30 * B[i] + 0.59 * B[i + 1] + 0.11 * B[i + 2];
      const dw = wB - wA, dl = lB - lA;
      if (Math.abs(A[i] - B[i]) > 1 || Math.abs(A[i + 1] - B[i + 1]) > 1 || Math.abs(A[i + 2] - B[i + 2]) > 1) px++;
      sw += dw; sww += dw * dw; sl += dl; sll += dl * dl;
      gw += wA; gww += wA * wA; gl += lA; gll += lA * lA;
    }
    const sdW = Math.sqrt(Math.max(0, gww / n - (gw / n) ** 2));
    const sdL = Math.sqrt(Math.max(0, gll / n - (gl / n) ** 2));
    const mw = sw / n, ml = sl / n;
    return { n, px, mw, ml, dW: Math.abs(mw) / (sdW || 1), dL: Math.abs(ml) / (sdL || 1), sdW, sdL };
  };
  /* A: sunrise / sunset / day length, off THE ARTIFACT'S OWN warp (never re-implemented). */
  window.__sun = (year) => {
    __setYear(year);
    const warp = (typeof sunWarp === 'function') ? sunWarp : (t) => t;   /* HEAD has no warp */
    const up = (t) => { const p = (warp(((t % 1) + 1) % 1) - SUNUP) / (SUNDN - SUNUP); return p > 0 && p < 1; };
    let len = 0, rise = null, set = null;
    const S = 20000;
    for (let i = 0; i < S; i++) {
      const t = i / S, a = up(t), b = up((i + 1) / S);
      if (a) len++;
      if (!a && b) rise = (i + 1) / S;
      if (a && !b) set = (i + 1) / S;
    }
    return { rise, set, len: len / S };
  };
};

/* ─────────────────────────────── A. THE WORLD DATA (pure) ─────────────────────────────── */
console.log('\n══ A. THE DAY LENGTH ITSELF — pure world data, no render, no clock, no noise floor');
console.log('   HEAD\'s light curve carries no `year` term at all, so its answer is a CONSTANT');
console.log('   BY CONSTRUCTION — "DISTINCT DAY LENGTHS = 1" is a baseline nobody had to design (236).\n');
{
  const pH = await open(HEADF), pP = await open(ART);
  await pH.evaluate(RIG, { seed: 42 }); await pP.evaluate(RIG, { seed: 42 });
  const seasons = [['winter      ', WINTER], ['equinox     ', EQUINOX], ['dry peak    ', DRYPEAK]];
  console.log(`   ${'season'.padEnd(14)} ${'BUILD'.padEnd(6)} ${'sunrise'.padStart(8)} ${'sunset'.padStart(8)} ${'day length'.padStart(11)}`);
  const seen = { HEAD: new Set(), patch: new Set() };
  for (const [name, y] of seasons) {
    for (const [tag, pg] of [['HEAD', pH], ['patch', pP]]) {
      const s = await pg.evaluate((yy) => window.__sun(yy), y);
      seen[tag].add(s.len.toFixed(3));
      console.log(`   ${name.padEnd(14)} ${tag.padEnd(6)} ${fmt(s.rise, 8, 3)} ${fmt(s.set, 8, 3)} ${fmt(s.len, 11, 3)}`);
    }
  }
  console.log(`\n   ⇒ HEAD  DISTINCT DAY LENGTHS = ${seen.HEAD.size}   (the defect, stated as a number)`);
  console.log(`   ⇒ patch DISTINCT DAY LENGTHS = ${seen.patch.size}`);
  await pH.close(); await pP.close();
}

/* ───────────────────── B. THE SWEEP — is the season VISIBLE, and WHERE? ───────────────────── */
console.log('\n══ B. IS IT VISIBLE? dry peak → winter, swept across the whole day.');
console.log('   d = the shift in units of the plate\'s own within-frame grain. 254: d < 0.4 ⇒ nobody sees it.');
console.log('   ⚠ NOON is the must-not-move control (a winter noon is still noon). GOLDEN is the INCUMBENT BAR.\n');

for (const seed of seeds) {
  for (const [tag, file] of [['HEAD', HEADF], ['patch', ART]]) {
    const page = await open(file);
    await page.evaluate(RIG, { seed });
    const r = await page.evaluate(({ SWEEP, GOLDEN, WINTER, DRYPEAK }) => {
      const out = { rows: [] };
      const ref = __grab(SWEEP[2], DRYPEAK);
      out.floor = __stat(ref, __grab(SWEEP[2], DRYPEAK));       /* same pin twice: must be 0 */
      for (const t of SWEEP) {
        const a = __grab(t, DRYPEAK), b = __grab(t, WINTER);
        const s = __stat(a, b);
        out.rows.push({ t, dW: s.dW, dL: s.dL, mw: s.mw, ml: s.ml, px: s.px, n: s.n });
      }
      const g = __stat(__grab(0.30, DRYPEAK), __grab(GOLDEN, DRYPEAK));
      out.golden = { dW: g.dW, dL: g.dL, mw: g.mw, ml: g.ml };
      return out;
    }, { SWEEP, GOLDEN, WINTER, DRYPEAK });

    console.log(`  ── seed ${seed} · ${tag}   (floor, same pin twice: ${r.floor.px} px, d(luma) ${r.floor.dL.toFixed(3)})`);
    console.log(`     ${'dayT'.padStart(6)} ${'ΔR-B'.padStart(8)} ${'Δluma'.padStart(8)} ${'d(warm-cool)'.padStart(13)} ${'d(LUMA)'.padStart(9)}   ${'% px moved'.padStart(10)}`);
    for (const x of r.rows) {
      const flag = x.t === NOONPIN ? '  ← noon (control)' : x.t === EVEPIN ? '  ← evening' : '';
      console.log(`     ${fmt(x.t, 6, 2)} ${fmt(x.mw, 8, 1)} ${fmt(x.ml, 8, 1)} ${fmt(x.dW, 13)} ${fmt(x.dL, 9)}   ${fmt(100 * x.px / x.n, 9, 1)}%${flag}`);
    }
    console.log(`     ${'GOLDEN'.padStart(6)} ${fmt(r.golden.mw, 8, 1)} ${fmt(r.golden.ml, 8, 1)} ${fmt(r.golden.dW, 13)} ${fmt(r.golden.dL, 9)}   ← THE BAR (an obvious light change)\n`);
    await page.close();
  }
}

/* ─────────────────────────── C. THE FIXED POINT (245) ───────────────────────────
 * ⚠ THE PIN CANNOT BE A YEAR. `year = 2035.87` is not representable in float64, so
 * year%1 lands ~1e-13 off 0.87, seasonCool() lands ~1e-9 off 0.5, and dayLen() comes out
 * -1.8e-10 instead of 0 — the guard never fires and the artifact's own colour QUANTIZERS
 * (seaFace's round-to-32nds) flip a bucket, which is worth ~332 px. That is the PIN's float
 * error, not the feature. The claim is about the SIGNAL'S MEAN, so pin the SIGNAL:
 * seasonCool = () => 0.5 makes dayLen() exactly 0.10*(2*0.5-1) = 0 by arithmetic, and
 * seasonCool exists in BOTH builds (253 shipped it), so stubbing it is build-symmetric. */
console.log('\n══ C1. PREDICATE SUPPRESSION (253) — inside ONE page, so the floor is EXACTLY 0.');
console.log('   window.dayLen = () => 0 collapses sunWarp to the identity, i.e. to HEAD\'s code path.\n');
{
  const page = await open(ART);
  await page.evaluate(RIG, { seed: 42 });
  const r = await page.evaluate(({ WINTER, EVEPIN }) => {
    const liveDL = window.dayLen, liveSC = window.seasonCool;
    const pair = (t, y, meanPin) => {
      window.seasonCool = meanPin ? () => 0.5 : liveSC;
      window.dayLen = liveDL; const a = __grab(t, y);
      const dl = window.dayLen();
      window.dayLen = () => 0;  const b = __grab(t, y);
      window.dayLen = liveDL; window.seasonCool = liveSC;
      return { px: __stat(a, b).px, dl };
    };
    return { mean: pair(EVEPIN, WINTER, true), win: pair(EVEPIN, WINTER, false) };
  }, { WINTER, EVEPIN });
  console.log(`   season at its MEAN (dayLen = ${r.mean.dl})        suppressed vs live: ${String(r.mean.px).padStart(7)} px   ← MUST be 0`);
  console.log(`   winter             (dayLen = ${r.win.dl.toFixed(4)})   suppressed vs live: ${String(r.win.px).padStart(7)} px   ← the feature\n`);
  await page.close();
}

/* ⚠ C2 (cross-build patch-vs-HEAD) WAS BUILT, RUN, AND CUT — 230'S LAW, RE-CONFIRMED.
 * Two loads of the same file drift through genWorld/__warp, and the HEAD-vs-HEAD floor came
 * back at 98,000-706,000 px. At the noon pin the "signal" (478,871) was BELOW its own floor
 * (706,045): the instrument cannot see what it is pointed at. C1 above needs no second build,
 * never leaves the page, and has a floor of EXACTLY 0. Do not re-add the build swap. */

await browser.close();
