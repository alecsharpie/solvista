#!/usr/bin/env node
/* probe-ground.mjs — iter 209, Urban fabric x Deepen: the ground plane reads its land use.
 *
 * TWO claims, each with a control that must NOT move:
 *
 *  (1) SEPARATION. The developed ground used to be ONE flat `sandDk` for every land
 *      use. So on BASE the mean rendered tone of the visible RES / MID / COM / TOWER /
 *      IND ground must be the SAME (pairwise distance ~0); on PATCH it must separate.
 *
 *  (2) THE SUBURBS JOIN THE YEAR. A garden is `lawn`, which applySeason drives (208), so
 *      the residential ground should now answer the calendar. This is a STATE-RESPONSE
 *      question (196's law), so the isolation is two pins of `year` WITHIN one build,
 *      run on both builds:
 *        - RES ground: BASE ~0 (sandDk is not seasonal), PATCH >> 0.
 *        - NEGATIVE control, COM ground: `paving` is not seasonal => ~0 on BOTH builds.
 *        - POSITIVE control, PARK: known to answer the year since 208 => must move on
 *          BOTH builds. Without it, "BASE RES = 0" could be a dead pin rather than a
 *          finding (196).
 *
 * SAMPLING. A developed hex's centre is under the building, so the visible YARD has to be
 * found, not guessed. Both builds get the same in-page hook: wrap drawCell to record the
 * current cell, wrap hexTile to paint one type's ground loud red, and diff vs the base
 * frame — the changed pixels ARE that type's visible ground, by construction (161). The
 * mask is then used to sample the REAL frame. No world->screen box, so no neighbour
 * contamination (196). The ground hex is a big opaque fill, not a hairline, so the loud
 * trick is sound (203's sub-pixel caveat does not bite).
 *
 * FREEZE: Math.random stubbed BEFORE genWorld (203), STARS/flock cleared (199), waveT and
 * time pinned (195f). The unchanged-frame diff is printed first as the noise floor (203).
 *
 *   node probe-ground.mjs
 */
import { homedir, tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));

/* BASE is pristine HEAD, reconstructed here rather than left pointing at a /tmp scratch
 * file (REF=<sha> to compare against any older commit). PATCH is the working file. */
const ART = join(HERE, '../../../../solvista.html');
const REF = process.env.REF || 'HEAD';
const tmp = mkdtempSync(join(tmpdir(), 'ground-'));
const BASEF = join(tmp, 'base.html');
writeFileSync(BASEF, execFileSync('git', ['show', `${REF}:solvista.html`],
  { cwd: dirname(ART), maxBuffer: 1 << 28 }));
const BUILDS = { BASE: BASEF, PATCH: ART };
const SEEDS = [7, 42, 1234];
const KINDS = ['RES', 'MID', 'COM', 'TOWER', 'IND', 'PARK'];
const WINTER = 2035.02, DRY = 2035.62;   /* applySeason's own keyframes */

const hook = ({ seed, kinds, winter, dry }) => {
  /* ---- freeze the world ---- */
  playing = false;
  let s = 0x2F6E2B1 >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  genWorld(seed); window.__warp(61);
  STARS.length = 0; flock = null;
  waveT = 0; time = 0; dayT = 0.35;

  /* ---- the loud-ground hook, identical on both builds ---- */
  window.__GT = undefined; window.__CUR = null;
  const _dc = drawCell, _ht = hexTile;
  drawCell = function (x, y) { window.__CUR = cellAt(x, y); return _dc.call(this, x, y); };
  hexTile = function (gx, gy, sc, fill) {
    if (window.__GT !== undefined && window.__CUR && window.__CUR.t === window.__GT && sc === 1.02) fill = '#ff0000';
    return _ht.call(this, gx, gy, sc, fill);
  };

  const cvs = document.querySelector('canvas');
  const g = cvs.getContext('2d');
  const grab = () => { render(); return g.getImageData(0, 0, cvs.width, cvs.height).data; };
  const moved = (a, o) => { const m = []; for (let i = 0; i < a.length; i += 4)
    if (Math.abs(a[i] - o[i]) > 8 || Math.abs(a[i+1] - o[i+1]) > 8 || Math.abs(a[i+2] - o[i+2]) > 8) m.push(i); return m; };
  const meanAt = (a, m) => { let r = 0, gg = 0, b = 0; for (const i of m) { r += a[i]; gg += a[i+1]; b += a[i+2]; }
    return m.length ? [r / m.length, gg / m.length, b / m.length] : [0, 0, 0]; };
  const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]);

  /* ---- masks: the visible ground of each kind, at the winter pin ---- */
  window.__setYear(winter);
  const w0 = grab();
  const noise = moved(grab(), w0).length;          /* must be 0 (203) */
  const mask = {};
  for (const k of kinds) { window.__GT = T[k]; mask[k] = moved(grab(), w0); }
  window.__GT = undefined;

  /* ---- the two seasonal pins, sampled through those masks ---- */
  window.__setYear(dry);
  const d0 = grab();

  const out = { noise, tone: {}, seasonShift: {}, px: {} };
  for (const k of kinds) {
    out.px[k] = mask[k].length;
    out.tone[k] = meanAt(w0, mask[k]);                       /* winter tone of this ground */
    out.seasonShift[k] = dist(meanAt(w0, mask[k]), meanAt(d0, mask[k]));
  }
  return out;
};

const res = {};
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });

for (const [name, file] of Object.entries(BUILDS)) {
  res[name] = { tone: {}, shift: {}, px: {}, noise: 0 };
  for (const seed of SEEDS) {
    await p.goto(pathToFileURL(file).href);
    await p.waitForFunction(() => window.__census !== undefined);
    const r = await p.evaluate(hook, { seed, kinds: KINDS, winter: WINTER, dry: DRY });
    res[name].noise += r.noise;
    for (const k of KINDS) {
      (res[name].tone[k] ||= []).push(r.tone[k]);
      (res[name].shift[k] ||= []).push(r.seasonShift[k]);
      (res[name].px[k] ||= []).push(r.px[k]);
    }
  }
}
await b.close();

const mean = a => a.reduce((x, y) => x + y, 0) / a.length;
const meanRGB = a => [0, 1, 2].map(i => mean(a.map(v => v[i])));
const D = (p1, q) => Math.hypot(p1[0] - q[0], p1[1] - q[1], p1[2] - q[2]);

console.log(`NOISE FLOOR (unchanged frame re-rendered): BASE ${res.BASE.noise} px · PATCH ${res.PATCH.noise} px  (must be 0)\n`);

console.log('(1) SEPARATION — mean rendered tone of the VISIBLE ground, winter, 3 seeds');
console.log('kind    visible px      BASE rgb            PATCH rgb');
for (const k of KINDS) {
  const bt = meanRGB(res.BASE.tone[k]), pt = meanRGB(res.PATCH.tone[k]);
  const f = v => v.map(x => Math.round(x)).join(',').padEnd(15);
  console.log(k.padEnd(7) + String(Math.round(mean(res.PATCH.px[k]))).padStart(10) + '   ' + f(bt) + '  ' + f(pt));
}
const DEVK = ['RES', 'MID', 'COM', 'TOWER', 'IND'];
for (const build of ['BASE', 'PATCH']) {
  const pairs = [];
  for (let i = 0; i < DEVK.length; i++) for (let j = i + 1; j < DEVK.length; j++)
    pairs.push(D(meanRGB(res[build].tone[DEVK[i]]), meanRGB(res[build].tone[DEVK[j]])));
  console.log(`  ${build}: pairwise land-use tone separation  mean ${mean(pairs).toFixed(1)}  max ${Math.max(...pairs).toFixed(1)}  min ${Math.min(...pairs).toFixed(1)}`);
}

console.log('\n(2) THE YEAR — rendered ground shift, winter -> dry peak (RGB distance), 3 seeds');
console.log('kind        BASE    PATCH');
for (const k of KINDS) {
  const tag = k === 'COM' ? '   <- NEGATIVE control (paving is not seasonal: ~0 on both)'
    : k === 'PARK' ? '   <- POSITIVE control (208: must move on BOTH)'
    : k === 'RES' ? '   <- the claim' : '';
  console.log(k.padEnd(8) + mean(res.BASE.shift[k]).toFixed(1).padStart(8) + mean(res.PATCH.shift[k]).toFixed(1).padStart(9) + tag);
}
