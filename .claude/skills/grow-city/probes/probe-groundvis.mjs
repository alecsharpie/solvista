#!/usr/bin/env node
/* probe-groundvis.mjs — is the developed GROUND PLANE actually visible?
 *
 * solvista.html:4621 draws the ground under EVERY developed hex as one flat
 * `col('sandDk', 0.9)` — a house's front garden and a factory's yard are the
 * same paint — while the EMPTY grass beside it gets a whole patchwork so it
 * "reads as pasture, not paint".
 *
 * Before designing anything on that surface, ask the host question (206): draw
 * order IS depth order, so the row in front buries the yard behind it. How many
 * pixels of that ground does the viewer ACTUALLY see, per land-use type?
 *
 * Method: freeze the world in-page (stub Math.random BEFORE genWorld per 203,
 * clear STARS/flock, pin waveT/time/dayT, playing=false), render a base frame,
 * then re-render with ONE type's ground fill swapped to a loud colour and count
 * changed pixels. A diff, not a colour match, so later alpha overlays (contact
 * shadows, tints) cannot fool it. The ground hex is a big opaque fill, not a
 * hairline, so the loud trick is sound here (203's sub-pixel caveat).
 *
 * Control: a type with NO ground swap must diff to exactly 0 px.
 *
 *   node probe-groundvis.mjs
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = join(HERE, '../../../../solvista.html');

const ORIG = `      hexTile(gx,gy,1.02,col(c.t===T.EMPTY?'grass':'sandDk',
        c.t===T.EMPTY?0.93+0.05*Math.sin(x*0.85+y*0.6)+0.04*hashCell(x,y,seedNum^0x6EAF):0.9));`;
const PATCH = `      { let __gf=col(c.t===T.EMPTY?'grass':'sandDk',
        c.t===T.EMPTY?0.93+0.05*Math.sin(x*0.85+y*0.6)+0.04*hashCell(x,y,seedNum^0x6EAF):0.9);
        if(window.__GT!==undefined&&c.t===window.__GT)__gf='#ff0000';
        hexTile(gx,gy,1.02,__gf); }`;

const src = readFileSync(SRC, 'utf8');
if (!src.includes(ORIG)) { console.error('anchor not found'); process.exit(1); }
const TMP = join(HERE, '../../../../__groundvis.html');
writeFileSync(TMP, src.replace(ORIG, PATCH));

const SEEDS = [7, 42, 1234];
const KINDS = ['RES', 'MID', 'COM', 'TOWER', 'CIVIC', 'IND', 'EMPTY'];
const W = 1600, H = 1000;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: W, height: H } });
const rows = {};
for (const k of [...KINDS, 'CONTROL']) rows[k] = { px: 0, cells: 0 };

for (const seed of SEEDS) {
  await p.goto(pathToFileURL(TMP).href);
  await p.waitForFunction(() => window.__census !== undefined);
  const r = await p.evaluate(({ seed, kinds }) => {
    /* --- freeze (203/199/163) --- */
    playing = false;
    let s = 0x2F6E2B1 >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    genWorld(seed); window.__warp(61);
    STARS.length = 0; flock = null;
    waveT = 0; time = 0; dayT = 0.35;

    const cvs = document.querySelector('canvas');
    const g = cvs.getContext('2d');
    const grab = () => { render(); return g.getImageData(0, 0, cvs.width, cvs.height).data; };

    window.__GT = undefined;
    const base = grab();
    const base2 = grab();                       /* the noise floor, printed first (203) */
    const diff = (a, o) => { let n = 0; for (let i = 0; i < a.length; i += 4)
      if (Math.abs(a[i] - o[i]) > 8 || Math.abs(a[i+1] - o[i+1]) > 8 || Math.abs(a[i+2] - o[i+2]) > 8) n++; return n; };

    const out = { NOISE: diff(base2, base), total: cvs.width * cvs.height, kinds: {} };
    for (const k of kinds) {
      window.__GT = T[k];
      out.kinds[k] = { px: diff(grab(), base), cells: 0 };
    }
    /* a type that does not exist -> must be exactly 0 */
    window.__GT = -999;
    out.CONTROL = diff(grab(), base);
    window.__GT = undefined;

    for (const i of HEXI) { const c = cells[i]; for (const k of kinds) if (c.t === T[k]) out.kinds[k].cells++; }
    return out;
  }, { seed, kinds: KINDS });

  console.log(`seed ${seed}: noise floor ${r.NOISE} px  ·  control (no such type) ${r.CONTROL} px`);
  for (const k of KINDS) {
    rows[k].px += r.kinds[k].px; rows[k].cells += r.kinds[k].cells;
  }
  rows.CONTROL.px += r.CONTROL;
}

const N = SEEDS.length;
console.log('\nVISIBLE GROUND PLANE, mean over ' + N + ' seeds (1600x1000 = 1.6M px)');
console.log('kind      cells    visible px   px/cell   % of frame');
for (const k of KINDS) {
  const px = rows[k].px / N, cl = rows[k].cells / N;
  console.log(k.padEnd(9) + String(Math.round(cl)).padStart(5) +
    String(Math.round(px)).padStart(13) + (px / (cl || 1)).toFixed(1).padStart(10) +
    (100 * px / (W * H)).toFixed(2).padStart(11) + '%');
}
console.log('CONTROL'.padEnd(9) + '    -' + String(Math.round(rows.CONTROL.px / N)).padStart(13) + '   (must be 0)');

await b.close();
unlinkSync(TMP);
