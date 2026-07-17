#!/usr/bin/env node
/* WHERE does the frame actually go? A draw-budget census.
 *
 * Iter 202's step-back found that day frame time drifted +8.6% over the 40
 * iterations 162->202 while EVERY individual lap graded "free" against the lap
 * before it (+0.4% at 197->202). A ~0.2%/iteration drift sits permanently under
 * the noise floor of the per-lap A/B the skill mandates, so the gate is
 * structurally blind to it. To spend a perf iteration you need a SUSPECT, and
 * 198's law says the suspect must be MEASURED, not inferred (197 inferred "batch
 * the fills", 198 built it and bought +0.3%: nothing).
 *
 * 198 also established the cost model on this canvas: the unit of cost is the
 * PATH OBJECT RASTERIZED — one charge per ellipse/arc/path, near-independent of
 * its area, of how many are grouped into one fill(), and not avoidable by
 * blitting a sprite. So the path-object COUNT is a direct cost proxy, and the
 * whole frame's budget can be censused in ONE render instead of N timing runs.
 *
 * Method: wrap CanvasRenderingContext2D's terminal ops (fill/stroke/fillRect/
 * strokeRect/drawImage/fillText) and its path primitives (ellipse/arc/rect/
 * lineTo/quadraticCurveTo/bezierCurveTo). Attribute each terminal op to the
 * artifact function that issued it, read off the call stack. Render exactly one
 * frozen frame and print the histogram, sorted by path objects.
 *
 * Deterministic per 163(c)/(d) + 195(f) + 199: genWorld+__warp in-page, STARS
 * cleared, flock nulled, waveT/time pinned. (Counts are draw-call counts, not
 * pixels, so they are exact -- but the world must still be the same world.)
 */
import { homedir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
/* resolve the artifact RELATIVE TO THIS FILE, never an absolute path */
const CAND = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html'),
              resolve(HERE, 'solvista.html')];
/* SRC= grades any build (iter 257). 222's law says a lap must COUNT its path objects rather
   than infer them from its diff -- which needs HEAD's count as well as the patch's, and this
   probe could only ever read the working tree. `SRC=$(git show HEAD:solvista.html)` now does it
   with no /bin/cp swap, so there is no stale-backup hazard (197). */
const ART = process.env.SRC ? resolve(process.env.SRC) : CAND.find(f => existsSync(f));

const SEEDS = [42, 7, 1234];
/* dayT pins: the light curve's day plateau vs deep night */
const LIGHTS = { day: 0.30, night: 0.88 };

const census = async (page, seed, dayT) => page.evaluate(({ seed, dayT }) => {
  /* --- freeze the world (163c/d, 195f, 199) --- */
  playing = false;
  genWorld(seed);
  __warp(61);
  /* 325's law: __warp(61) lands the world at ~2035.0 with snow on the ground, and
     __setYear does not re-tick, so a warp-based path-object count over-attributes the
     bounded SEASONAL snow draw to the PERMANENT arc. Clear any season-persistent CA
     field before counting the arc. */
  try { for (const c of cells) if (c.snow) c.snow = 0; } catch (e) {}
  if (typeof STARS !== 'undefined') STARS.length = 0;
  try { flock = null; } catch (e) {}
  waveT = 0; time = 0;
  __setTime(dayT);

  /* --- instrument the context --- */
  const cvs = document.querySelector('canvas');
  const ctx2 = cvs.getContext('2d');
  const proto = Object.getPrototypeOf(ctx2);
  const TERMINAL = ['fill', 'stroke', 'fillRect', 'strokeRect', 'drawImage', 'fillText', 'strokeText'];
  const PATHOP = ['ellipse', 'arc', 'rect', 'lineTo', 'quadraticCurveTo', 'bezierCurveTo', 'arcTo'];

  const byFn = new Map();   // caller -> {ops, paths, ellipse, arc}
  const totals = { ops: 0, paths: 0, ellipse: 0, arc: 0, rect: 0, line: 0 };
  let pending = 0, pendEll = 0, pendArc = 0;   // path primitives since last beginPath

  /* The instrumentation lives in an eval'd frame, so attribute ONLY to frames that
   * come from solvista.html itself. Record two levels:
   *   leaf   = the artifact fn that issued the ctx op   (e.g. hexTile, shadS)
   *   family = the fn render() itself called            (e.g. drawCell, drawVehicle)
   * The leaf names the primitive; the family names the system paying for it. */
  const frames = () => {
    const out = [];
    for (const ln of (new Error()).stack.split('\n')) {
      if (!ln.includes('solvista.html')) continue;
      const m = ln.match(/at (?:new )?([A-Za-z_$][\w$]*)/);
      out.push(m ? m[1] : '(anon)');
    }
    return out;   // [leaf, ..., family, render]
  };
  const caller = () => {
    const f = frames();
    if (!f.length) return { leaf: '(none)', family: '(none)' };
    const ri = f.lastIndexOf('render');
    const family = ri > 0 ? f[ri - 1] : f[f.length - 1];
    return { leaf: f[0], family };
  };

  const byFam = new Map();
  const bump = (map, key, n, e, ar) => {
    let r = map.get(key);
    if (!r) map.set(key, r = { ops: 0, paths: 0, ellipse: 0, arc: 0 });
    r.ops++; r.paths += n; r.ellipse += e; r.arc += ar;
  };

  const saved = {};
  for (const op of TERMINAL) {
    saved[op] = proto[op];
    proto[op] = function (...a) {
      const { leaf, family } = caller();
      /* a fill()/stroke() rasterizes every path object queued since beginPath;
       * a fillRect/drawImage/fillText is itself exactly one object. */
      const n = (op === 'fill' || op === 'stroke') ? Math.max(pending, 1) : 1;
      bump(byFn, leaf, n, pendEll, pendArc);
      bump(byFam, family, n, pendEll, pendArc);
      totals.ops++; totals.paths += n; totals.ellipse += pendEll; totals.arc += pendArc;
      return saved[op].apply(this, a);
    };
  }
  const savedBegin = proto.beginPath;
  proto.beginPath = function (...a) { pending = 0; pendEll = 0; pendArc = 0; return savedBegin.apply(this, a); };
  for (const op of PATHOP) {
    const s = proto[op];
    proto[op] = function (...a) {
      pending++;
      if (op === 'ellipse') pendEll++;
      else if (op === 'arc') pendArc++;
      else if (op === 'rect') totals.rect++;
      else totals.line++;
      return s.apply(this, a);
    };
  }

  /* --- exactly one frame --- */
  render();

  const dump = m => [...m.entries()].map(([fn, r]) => ({ fn, ...r }))
    .sort((a, b) => b.paths - a.paths).slice(0, 22);
  return { totals, rows: dump(byFn), fams: dump(byFam) };
}, { seed, dayT });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on('pageerror', e => console.error('PAGE ERROR:', e.message));
await page.goto(pathToFileURL(ART).href);
await page.waitForTimeout(600);

for (const [name, dayT] of Object.entries(LIGHTS)) {
  console.log(`\n================ ${name.toUpperCase()} (dayT=${dayT}) ================`);
  const aggLeaf = new Map(), aggFam = new Map();
  const tot = { ops: 0, paths: 0, ellipse: 0, arc: 0, rect: 0, line: 0 };
  const fold = (agg, rows) => {
    for (const r of rows) {
      let a = agg.get(r.fn);
      if (!a) agg.set(r.fn, a = { paths: 0, ops: 0, ellipse: 0, arc: 0 });
      a.paths += r.paths; a.ops += r.ops; a.ellipse += r.ellipse; a.arc += r.arc;
    }
  };
  for (const seed of SEEDS) {
    const { totals, rows, fams } = await census(page, seed, dayT);
    for (const k of Object.keys(tot)) tot[k] += totals[k];
    fold(aggLeaf, rows); fold(aggFam, fams);
    /* reload between seeds: the instrumentation is monkey-patched onto the proto */
    await page.goto(pathToFileURL(ART).href);
    await page.waitForTimeout(400);
  }
  const N = SEEDS.length;
  console.log(`per-frame totals (mean of ${N} seeds):  ` +
    `terminal ops ${(tot.ops / N).toFixed(0)} | PATH OBJECTS ${(tot.paths / N).toFixed(0)} | ` +
    `ellipse ${(tot.ellipse / N).toFixed(0)} | arc ${(tot.arc / N).toFixed(0)}`);
  const table = (title, agg) => {
    console.log(`\n  -- ${title} --`);
    console.log(`  ${'fn'.padEnd(20)} ${'PATHS'.padStart(7)} ${'share'.padStart(7)} ${'ops'.padStart(7)} ${'ellipse'.padStart(8)} ${'arc'.padStart(6)}`);
    const rows = [...agg.entries()].map(([fn, a]) => ({ fn, ...a })).sort((a, b) => b.paths - a.paths);
    for (const r of rows.slice(0, 14)) {
      const share = (100 * r.paths / tot.paths).toFixed(1) + '%';
      console.log(`  ${r.fn.padEnd(20)} ${(r.paths / N).toFixed(0).padStart(7)} ${share.padStart(7)} ` +
        `${(r.ops / N).toFixed(0).padStart(7)} ${(r.ellipse / N).toFixed(0).padStart(8)} ${(r.arc / N).toFixed(0).padStart(6)}`);
    }
  };
  table('FAMILY (what render() called — the system paying)', aggFam);
  table('LEAF (the fn that issued the ctx op)', aggLeaf);
}
await browser.close();
