#!/usr/bin/env node
/* probe-treeshadow — do the TREES now cast the same house-style ground contact
 * shadow that every other standing thing in the city has cast for dozens of
 * iterations? (iter 194, Nature × Polish.)
 *
 * The seam: peds/dogs (137), the static standing crowds (163), every vehicle, and
 * the buildings (180) all ground themselves with shadS(). The trees — the most
 * numerous vertical object on the plate (FOREST 2-4 per hex, PARK, the boulevard
 * street trees, the redwoods, the beach palms) — did not. Iter 180's own comment
 * even CLAIMS "cars/peds/crowds/trees all use the same shadS". They didn't.
 *
 * Trees are drawn unconditionally, so unlike the crowd shadows (163) there is no
 * time-gated control frame available. The control here is SPATIAL: tile types whose
 * draw case never calls tree()/palm() must not move a single pixel.
 *
 *   HOSTS    FOREST (densest: 2-4 trees/hex), PARK (the biggest tree-bearing surface)
 *   CONTROLS FARM, WATER — no tree()/palm() call in either draw case, so byte-flat
 *
 * Two independent things must hold:
 *   (1) DIRECTIONAL — a contact shadow can only DARKEN. Host darker px >> 0 and
 *       host lighter px == 0. Anything lighter would mean pollution, not shadow
 *       (iter 161's directional law).
 *   (2) LOCAL — the controls stay at the noise floor, proving the change touches
 *       only the tiles that actually grow trees.
 *
 * Build-vs-build over a deterministic in-page rebuild (iter 161): genWorld(seed) +
 * __warp gives a byte-identical city regardless of load timing, every mover is
 * cleared and the clock frozen, so every pixel that differs IS a tree shadow.
 *
 *   node probe-treeshadow.mjs [seed ...]
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
const seeds = SEEDS.length ? SEEDS : [7, 42, 1234];
const WARP = 61, R = 12;           /* R=12px covers every sub-hex tree base in a cell */
const q = s => `?seed=${s}&warp=${WARP}&year=2035.62`;

const tmp = mkdtempSync(join(tmpdir(), 'treeshadow-'));
const HEAD = join(tmp, 'head.html');
writeFileSync(HEAD, execFileSync('git', ['-C', REPO, 'show', 'HEAD:solvista.html']));

/* Sample an R-box around the centre of every cell of each class, plus the whole
 * frame. Deterministic rebuild + frozen clock so the two builds differ ONLY by the
 * feature under test. */
async function frame(page, url, seed) {
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForFunction('window.__find');
  return page.evaluate(([seed, warp, R]) => {
    playing = false; time = 5.0; waveT = 3.0; WINDA = 0.5; /* freeze the sway too */
    genWorld(seed); syncStats(); window.__warp(warp);
    if (typeof flock !== 'undefined') flock = null;
    for (const a of [vehicles, bikes, trams, trucks, peds, boats, ferries, freighters,
      birds, shuttles, dogs, kites, surfers, dolphins, whales, herons, kayaks, joggers,
      deer, clouds, balloons, copters]) a.length = 0;
    STARS.length = 0;
    Math.random = () => 0.5;
    window.__setTime(0.45); render();               /* plain daylight */
    const cvs = document.querySelector('canvas'), g = cvs.getContext('2d');
    const dpr = cvs.width / cvs.clientWidth;
    /* The R-box around a cell centre is wide enough to bleed into the NEXT hex, so a
     * control cell on the edge of the countryside picks up the shadow of the forest
     * or boulevard tree next door — which is bleed, not a defect. A control must
     * therefore be INTERIOR: the cell and all six neighbours are the same tree-free
     * type, so nothing within the box can grow a tree. (Both edge-inclusive and
     * interior numbers are reported; the gate uses the interior one.) */
    /* every draw case that calls tree()/palm(), read off the source by attributing each
     * call to its enclosing `case T.X:` — NOT guessed. GARDEN and SHOREPARK were missed
     * on the first pass and each leaked a few px into the control. Over-listing here is
     * safe (it only shrinks the control), under-listing is what fakes a failure. */
    const TREEHOST = new Set([T.FOREST, T.PARK, T.ROAD, T.QUAD, T.PLAZA, T.MEADOW,
      T.GARDEN, T.SHOREPARK, T.BEACH, T.DUNE, T.VINEYARD, T.BURNT, T.REDWOOD]);
    /* two rings, not one: at R=12px the box can still just reach the trunk base of a
     * tree in the SECOND ring (tree() is called at sub-hex offsets up to 0.36 of a
     * cell, which leans it toward us). If the residual darkening is really bleed, a
     * 2-ring exclusion must drive the control to exactly zero — and it does. */
    const near2 = (x, y) => {
      const seen = [[x, y]];
      for (const [dx, dy] of nbrDirs(y)) seen.push([x + dx, y + dy]);
      const out = seen.slice();
      for (const [px_, py_] of seen) for (const [dx, dy] of nbrDirs(py_)) out.push([px_ + dx, py_ + dy]);
      return out;
    };
    const interior = (x, y) => near2(x, y).every(([ax, ay]) => {
      const n = cells[idx(ax, ay)]; return !n || !TREEHOST.has(n.t);
    });
    /* FARM-edge is kept only to SHOW the bleed (it is 40-45 thin strip cells, all of
     * which touch a tree host, so it can never be a clean control). The real land
     * control is LAND-ctl: any non-water tile that is not itself a tree host and has
     * no tree host within two rings — drawn from the interior of the industrial and
     * urban blocks, so it is a large, honest sample of ground the trees must not touch. */
    const cls = { FOREST: [], PARK: [], 'FARM-edge': [], 'LAND-ctl': [], WATER: [] };
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)]; if (!c) continue;
      if (c.t === T.FOREST) cls.FOREST.push([x, y]);
      else if (c.t === T.PARK) cls.PARK.push([x, y]);
      else if (c.t === T.WATER) cls.WATER.push([x, y]);
      else {
        if (c.t === T.FARM) cls['FARM-edge'].push([x, y]);
        if (c.t !== T.EMPTY && !TREEHOST.has(c.t) && interior(x, y)) cls['LAND-ctl'].push([x, y]);
      }
    }
    const box = list => list.map(([x, y]) => { const [cx, cy] = ctr(x, y); return [cx * scale + offX, cy * scale + offY]; })
      .filter(([sx, sy]) => sx > 60 && sx < innerWidth - 60 && sy > 60 && sy < innerHeight - 60)
      .slice(0, 250)
      .map(([sx, sy]) => Array.from(g.getImageData(Math.round(sx * dpr) - R, Math.round(sy * dpr) - R, R * 2 + 1, R * 2 + 1).data));
    const out = { _n: {} };
    for (const k in cls) { out[k] = box(cls[k]); out._n[k] = cls[k].length; }
    return out;
  }, [seed, WARP, R]);
}

/* A contact shadow only darkens, so split the changed pixels by SIGN of luminance
 * (iter 161): real shadow => darker >> 0, lighter == 0; noise => balanced. */
function score(A, B) {
  let px = 0, darker = 0, lighter = 0, sumDL = 0;
  const n = Math.min(A.length, B.length);
  for (let i = 0; i < n; i++) {
    const a = A[i], b = B[i];
    for (let p = 0; p < a.length; p += 4) {
      px++;
      const dl = (0.299 * a[p] + 0.587 * a[p + 1] + 0.114 * a[p + 2])
               - (0.299 * b[p] + 0.587 * b[p + 1] + 0.114 * b[p + 2]);
      sumDL += dl;   /* MEAN luminance shift over the whole class, 0..255 */
      const d = (Math.abs(a[p] - b[p]) + Math.abs(a[p + 1] - b[p + 1]) + Math.abs(a[p + 2] - b[p + 2])) / 3;
      if (d <= 3) continue;
      if (dl < -3) darker++; else if (dl > 3) lighter++;
    }
  }
  /* dLum is the "did it compound into DARKNESS" number (the kelp failure mode): the
   * darker-px COUNT says how many pixels moved, dLum says how far the tile actually
   * sank. A grove can light up 5% of its pixels and still barely change tone. */
  return { darker: 100 * darker / px, lighter: 100 * lighter / px, dLum: sumDL / px, px };
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const CLS = ['FOREST', 'PARK', 'FARM-edge', 'LAND-ctl', 'WATER'];
console.log('a contact shadow can only DARKEN — hosts must darken, tree-free controls must not move');
console.log('seed | class     | darker % | lighter % |  dLum | verdict');
console.log('─'.repeat(66));
const res = {};
for (const s of seeds) {
  const h = await frame(page, pathToFileURL(HEAD).href + q(s), s);
  const p = await frame(page, pathToFileURL(ART).href + q(s), s);
  console.log(`     (cells: ${CLS.map(k => k + '=' + p._n[k]).join(' ')})`);
  for (const k of CLS) {
    const r = score(p[k], h[k]);
    (res[k] ||= []).push(r);
    const host = k === 'FOREST' || k === 'PARK';
    console.log(`${String(s).padEnd(4)} | ${k.padEnd(9)} | ${r.darker.toFixed(3).padStart(8)} | ${r.lighter.toFixed(3).padStart(9)} | ${r.dLum.toFixed(2).padStart(6)} | ${host ? 'host' : 'control'}`);
  }
}
await browser.close();

/* GATE: both hosts darken on every seed, with ZERO lighter pixels; both tree-free
 * controls stay pinned at the floor. */
const ok = k => res[k].every(r => r.darker > 0.20 && r.lighter === 0);
const flat = k => res[k].every(r => r.darker < 0.02 && r.lighter < 0.02);
const pass = ok('FOREST') && ok('PARK') && flat('LAND-ctl') && flat('WATER');
const show = k => res[k].map(r => r.darker.toFixed(2)).join('/');
console.log('─'.repeat(66));
const lum = k => res[k].map(r => r.dLum.toFixed(2)).join('/');
console.log(`FOREST host:   darker ${show('FOREST')}%  lighter ${res.FOREST.map(r => r.lighter.toFixed(2)).join('/')}%  meanLum ${lum('FOREST')} /255`);
console.log(`PARK   host:   darker ${show('PARK')}%  lighter ${res.PARK.map(r => r.lighter.toFixed(2)).join('/')}%  meanLum ${lum('PARK')} /255`);
console.log(`FARM edge:     darker ${show('FARM-edge')}%   (every farm strip TOUCHES a tree host — box BLEED, not a defect)`);
console.log(`LAND ctl:      darker ${show('LAND-ctl')}%   (no tree host within 2 rings — want ~0)`);
console.log(`WATER ctl:     darker ${show('WATER')}%   (no tree() in its draw case — want ~0)`);
console.log(`VERDICT: ${pass ? 'PASS' : 'FAIL'}`);
process.exit(pass ? 0 : 1);
