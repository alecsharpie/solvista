/* probe-concert.mjs (iter 250) — does the amphitheater's concert keep a CALENDAR?
 *
 * The vector REMOVES the winter show, and 247's law is explicit: a removal vector needs a
 * probe that names what SURVIVES, not one that measures what MOVED. A pixel diff of the bowl
 * between winter and summer is structurally incapable of telling "the stage went dark" from
 * "something else got drawn there instead" (247 read 2,076 px of beach emptying and it was
 * palm trees moving in). So this counts OBJECTS, in the units a viewer would state:
 *
 *     how many SINGERS, FOOTLIGHTS and AUDIENCE SPECKS does the bowl draw, per season?
 *
 * Deterministic, no pixels, no noise floor, nothing to stub for it.
 *
 * Instruments (all unique draw signatures inside the amphitheater block):
 *   singer     ctx.arc(...,   r === 0.68)          the performer's head
 *   footlight  ctx.fillRect(..., w===1,   h===1)   three along the stage lip
 *   speck      ctx.fillRect(..., w===1.2, h===1.2) the audience on the tiers
 *   TIER ARCS  ctx.ellipse(...)  in the cavea      <-- THE CONTROL: stone, must never move
 *
 * The two free EXACT controls (249):
 *   (a) HEAD's answer is a CONSTANT by construction — DISTINCT SHOW STATES over the year
 *       must read 1 on HEAD. That IS the defect, stated as a number, with no threshold
 *       invented (236: the defect is its own perfect control).
 *   (b) The bowl has a BIRTHDAY — `year>=2004` — so at 1985 there is NO amphitheater and
 *       the patch runs HEAD's byte-identical code. A dead regime, for free (199).
 *   ...and the FIXED POINT (245): concertSeason()===1 exactly at the dry peak (s=0.62), so
 *   at that one pin the patch must render byte-IDENTICAL counts to HEAD.
 *
 * The showtime hour is NOT guessed (202): CIVHRS.amphitheater===0 means so = 1-nightDeep(),
 * so the show runs at DUSK, not at deep night. Part 0 sweeps dayT and takes the pin off the
 * artifact's own light curve.
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execSync } from 'node:child_process';
import { writeFileSync, unlinkSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;

const HERE = dirname(fileURLToPath(import.meta.url));
/* resolve the artifact relative to the PROBE's own location, never an absolute path —
   two probes once hardcoded ../solvista-grow/... and silently measured the worktree */
const ART = [join(HERE, '../../../../solvista.html'), join(HERE, 'solvista.html')]
  .find(p => { try { execSync(`test -f "${p}"`); return true; } catch { return false; } });
const REPO = dirname(ART);
const SEEDS = [42, 7, 1234];
const SEASONS = [['winter', 0.02], ['spring', 0.30], ['dry peak', 0.62], ['autumn', 0.87]];

/* pristine HEAD, from git itself */
const HEADSRC = join(REPO, '.probe-concert-head.html');
writeFileSync(HEADSRC, execSync(`git -C "${REPO}" show HEAD:solvista.html`, { maxBuffer: 1 << 28 }));

const COUNTER = () => {
  /* NB the wrappers must reach through `window.__cc` at CALL time, not close over the
     object — a probe that swaps in a fresh counter each frame would otherwise go on
     incrementing the original and read zero forever (caught by the tier control). */
  window.__cc = { singer: 0, foot: 0, speck: 0, tier: 0 };
  window.__ccReset = () => { const C = window.__cc; C.singer = C.foot = C.speck = C.tier = 0; };
  const P = CanvasRenderingContext2D.prototype;
  const arc = P.arc, fillRect = P.fillRect, ellipse = P.ellipse;
  P.arc = function (x, y, r, ...a) { if (Math.abs(r - 0.68) < 1e-9) window.__cc.singer++; return arc.call(this, x, y, r, ...a); };
  P.fillRect = function (x, y, w, h) {
    if (w === 1 && h === 1) window.__cc.foot++;
    if (w === 1.2 && h === 1.2) window.__cc.speck++;
    return fillRect.call(this, x, y, w, h);
  };
  P.ellipse = function (x, y, rx, ry, ...a) {
    /* the cavea tiers: rx = 2.6 + r*2.0, ry = 1.4 + r*1.05, for r = 1..NT */
    for (let r = 1; r <= 5; r++) if (Math.abs(rx - (2.6 + r * 2.0)) < 1e-9 && Math.abs(ry - (1.4 + r * 1.05)) < 1e-9) window.__cc.tier++;
    return ellipse.call(this, x, y, rx, ry, ...a);
  };
};

async function build(browser, src) {
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.addInitScript(() => {
    let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  });
  await page.addInitScript(COUNTER);
  await page.goto('file://' + src);
  await page.waitForFunction(() => window.__warp !== undefined);
  return page;
}

/* count the bowl's objects in ONE frozen frame */
async function frame(page, seed, warp, yr, t) {
  return page.evaluate(([seed, warp, yr, t]) => {
    playing = false;
    genWorld(seed); __warp(warp);
    if (yr !== null) __setYear(yr);
    __setTime(t);
    window.__ccReset();
    render();
    const bowl = cells.some(c => c.t === T.CIVIC && c.kind === 'amphitheater');
    const so = civOpen('amphitheater');
    /* the ALPHA the show is actually drawn at — an object count sees presence, not the
       fade, and would let autumn (cs=0.04, invisible) be reported as a full house (205) */
    const cs = (typeof concertSeason === 'function') ? concertSeason() : 1;
    return { ...window.__cc, bowl, LITAMT, so, cs, show: so * cs };
  }, [seed, warp, yr, t]);
}

const browser = await chromium.launch();
const head = await build(browser, HEADSRC);
const patch = await build(browser, ART);

/* ---- Part 0: take the showtime hour off the LIGHT CURVE, not off intuition (202) ---- */
const curve = await head.evaluate(() => {
  playing = false; genWorld(42); __warp(61);
  const out = [];
  for (let i = 0; i <= 100; i++) {
    const t = i / 100; __setTime(t); render();
    out.push([t, LITAMT, civOpen('amphitheater')]);
  }
  return out;
});
let best = null;
for (const [t, L, so] of curve) { const sh = L > 0.3 ? so : 0; if (!best || sh > best[1]) best = [t, sh, L, so]; }
const TSHOW = best[0], TDAY = 0.30;
console.log(`\n=== Part 0 — the showtime hour, from the artifact's own light curve ===`);
console.log(`  CIVHRS.amphitheater = 0  =>  so = 1 - nightDeep(): the show runs at DUSK, not deep night.`);
console.log(`  argmax over dayT of (LITAMT>0.3 ? so : 0):  dayT=${TSHOW.toFixed(2)}  LITAMT=${best[2].toFixed(2)}  so=${best[3].toFixed(3)}`);
console.log(`  => SHOWTIME PIN dayT=${TSHOW.toFixed(2)}   ·   DAY CONTROL PIN dayT=${TDAY}`);

/* ---- Part A: DISTINCT SHOW STATES over the year (HEAD's constant IS the baseline) ---- */
console.log(`\n=== Part A — the SHOW, at dusk, through the year (objects drawn, not pixels) ===`);
console.log(`  NB the footlight (1x1) and speck (1.2x1.2) SIGNATURES are shared with other draws in a`);
console.log(`  mature city, so their ABSOLUTE counts are contaminated and only the DELTA is the`);
console.log(`  measurement (the bowl draws 3 footlights and up to 8 specks). The singer (arc r=0.68)`);
console.log(`  is unique — Part D reads 0 of them where no bowl stands. TIER ARCS are the control.`);
console.log(`  Object counts see PRESENCE, not the fade, so cs = concertSeason() is printed beside them.\n`);
console.log(`  build  seed  season       cs    singer  footlights  specks | TIER ARCS (control)`);
const distinct = { head: {}, patch: {} };
const tbl = { head: {}, patch: {} };
for (const [name, page] of [['head', head], ['patch', patch]]) {
  for (const seed of SEEDS) {
    const sigs = new Set(); tbl[name][seed] = {};
    for (const [sname, s] of SEASONS) {
      const r = await frame(page, seed, 61, 2035 + s, TSHOW);
      sigs.add(`${r.singer}/${r.foot}/${r.speck}`);
      tbl[name][seed][sname] = r;
      console.log(`  ${name.padEnd(5)}  ${String(seed).padEnd(4)}  ${sname.padEnd(10)} ${r.cs.toFixed(2)}  ${String(r.singer).padStart(6)}  ${String(r.foot).padStart(10)}  ${String(r.speck).padStart(6)} | ${String(r.tier).padStart(5)}`);
    }
    distinct[name][seed] = sigs.size;
  }
  console.log('');
}
console.log(`  THE MEASUREMENT — patch minus HEAD, per season (what the bowl STOPS drawing):`);
console.log(`  seed  season       singer  footlights  specks | TIER ARCS (must be 0)`);
for (const seed of SEEDS) {
  for (const [sname] of SEASONS) {
    const h = tbl.head[seed][sname], p = tbl.patch[seed][sname];
    console.log(`  ${String(seed).padEnd(4)}  ${sname.padEnd(10)}  ${String(p.singer - h.singer).padStart(6)}  ${String(p.foot - h.foot).padStart(10)}  ${String(p.speck - h.speck).padStart(6)} | ${String(p.tier - h.tier).padStart(5)}`);
  }
}
console.log(`\n  DISTINCT SHOW STATES across the four seasons:`);
for (const seed of SEEDS) console.log(`    seed ${String(seed).padEnd(5)}  HEAD ${distinct.head[seed]}   PATCH ${distinct.patch[seed]}`);
console.log(`  (HEAD = 1 on every seed IS the bug: the concert never knew what month it was.)`);

/* ---- Part B: the DAY control — the bowl is open parkland year-round, must NOT move ---- */
console.log(`\n=== Part B — DAY control (dayT=${TDAY}): the bowl is open to anyone, all year ===`);
console.log(`  build  seed  season      singer  footlights  specks | TIER ARCS`);
for (const [name, page] of [['head', head], ['patch', patch]]) {
  for (const seed of SEEDS) {
    for (const [sname, s] of SEASONS) {
      const r = await frame(page, seed, 61, 2035 + s, TDAY);
      console.log(`  ${name.padEnd(5)}  ${String(seed).padEnd(4)}  ${sname.padEnd(10)}  ${String(r.singer).padStart(6)}  ${String(r.foot).padStart(10)}  ${String(r.speck).padStart(6)} | ${String(r.tier).padStart(5)}`);
    }
  }
}

/* ---- Part C: the FIXED POINT (245) — at the dry peak the patch IS HEAD ---- */
console.log(`\n=== Part C — the FIXED POINT: concertSeason()===1 at s=0.62, so patch must equal HEAD ===`);
let fpOK = true;
for (const seed of SEEDS) {
  const a = await frame(head, seed, 61, 2035.62, TSHOW);
  const b = await frame(patch, seed, 61, 2035.62, TSHOW);
  const same = a.singer === b.singer && a.foot === b.foot && a.speck === b.speck && a.tier === b.tier;
  if (!same) fpOK = false;
  console.log(`  seed ${String(seed).padEnd(5)} HEAD ${a.singer}/${a.foot}/${a.speck}/${a.tier}   PATCH ${b.singer}/${b.foot}/${b.speck}/${b.tier}   ${same ? 'IDENTICAL' : '*** DIVERGED ***'}`);
}

/* ---- Part D: the BIRTHDAY control (249) — no bowl before 2004 => HEAD's own code ---- */
console.log(`\n=== Part D — the BIRTHDAY control: the bowl is sited at year>=2004 ===`);
for (const seed of SEEDS) {
  const a = await frame(head, seed, 11, null, TSHOW);   /* 1974 + 11 = 1985 */
  const b = await frame(patch, seed, 11, null, TSHOW);
  console.log(`  seed ${String(seed).padEnd(5)} 1985  bowl exists: HEAD ${a.bowl}  PATCH ${b.bowl}   objects HEAD ${a.singer}/${a.foot}/${a.speck}  PATCH ${b.singer}/${b.foot}/${b.speck}`);
}

await browser.close();
unlinkSync(HEADSRC);
console.log(`\nFIXED POINT: ${fpOK ? 'HOLDS — the patch is byte-identical to HEAD at the dry peak.' : 'BROKEN'}`);
