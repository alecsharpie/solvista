#!/usr/bin/env node
/* HYPOTHESIS: a shelter is invisible when its sidewalk offset oy = ax*3.6*sd is
   POSITIVE -- i.e. it is pushed toward the viewer, into the hex in front, which is
   drawn later and laps over it (hexTile at 1.02 deliberately overlaps its neighbour).
   sd = ((x+y)&1)?1:-1, so this is decided by PARITY x STREET DIRECTION.
   If true, ink should collapse exactly when oy > 0 -- for ordinary stops too, which
   would make it a pre-existing bug in the shelter draw, not something iter 211 added. */
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
/* resolve relative to THIS file, never the cwd */
const PAGE = pathToFileURL([resolve(HERE, '../../../../solvista.html'),
                            resolve(HERE, 'solvista.html')].find(existsSync)).href;
const SEEDS = process.argv.slice(2).filter(a => !a.startsWith('-')).map(Number);
if (!SEEDS.length) SEEDS.push(42, 7, 1234);

const b = await chromium.launch();
const rows = [];
for (const seed of SEEDS) {
  const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
  p.on('pageerror', e => console.error('PAGEERROR', String(e)));
  await p.goto(PAGE);
  await p.waitForTimeout(800);
  rows.push(...await p.evaluate((seed) => {
    let s = 0x2F6E2B1 >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    playing = false; genWorld(seed); __warp(61);
    if (typeof STARS !== 'undefined') STARS.length = 0;
    try { flock = null; } catch (e) {}
    waveT = 0; time = 0; __setTime(0.30);

    const cv = document.querySelector('canvas'), g2 = cv.getContext('2d');
    const snap = () => { render(); return g2.getImageData(0, 0, cv.width, cv.height).data; };
    const diff = (A, B) => { let n = 0; for (let i = 0; i < A.length; i += 4)
      if (Math.abs(A[i]-B[i]) + Math.abs(A[i+1]-B[i+1]) + Math.abs(A[i+2]-B[i+2]) > 12) n++; return n; };
    const S0 = scale;
    const out = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)];
      if (!c.stop) continue;
      /* replay the shelter's own geometry to get oy */
      const [cx, cy] = ctr(x, y);
      let rdx = 0, rdy = 0;
      for (const [dx2, dy2] of nbrDirs(y)) {
        const n = cellAt(x + dx2, y + dy2);
        if (n && n.t === T.ROAD) { const [nx2, ny2] = ctr(x + dx2, y + dy2); rdx = nx2 - cx; rdy = ny2 - cy; break; }
      }
      if (!(rdx || rdy)) continue;
      const L = Math.hypot(rdx, rdy), ax = rdx / L;
      const sd = ((x + y) & 1) ? 1 : -1;
      const oy = ax * 3.6 * sd;

      const [wx, wy] = ctr(x, y);
      scale = S0 * 4; offX = innerWidth / 2 - wx * scale; offY = innerHeight / 2 - wy * scale;
      const k = c.stop; const A = snap(); c.stop = 0; const Z = snap(); c.stop = k;
      out.push({ seed, x, y, kind: k, oy: +oy.toFixed(2), ink: diff(A, Z) });
    }
    return out;
  }, seed));
  await p.close();
}
await b.close();

const bucket = (rs, lab) => {
  if (!rs.length) return;
  const inv = rs.filter(r => r.ink < 20).length;
  const mean = Math.round(rs.reduce((a, r) => a + r.ink, 0) / rs.length);
  console.log(`  ${lab.padEnd(22)} n=${String(rs.length).padEnd(4)} invisible(<20px)=${String(inv).padEnd(4)}` +
              `(${(100 * inv / rs.length).toFixed(0)}%)  mean ink=${mean}`);
};
console.log('THE SHELTER OFFSET oy (positive = pushed TOWARD the viewer, into the hex in front)\n');
console.log('ALL BUS STOPS (ordinary + interchange), 3 seeds:');
bucket(rows.filter(r => r.oy > 0.1), 'oy > 0  (near kerb)');
bucket(rows.filter(r => r.oy < -0.1), 'oy < 0  (far kerb)');
bucket(rows.filter(r => Math.abs(r.oy) <= 0.1), 'oy ~ 0  (sideways)');
console.log('\nORDINARY stops only (was this bug already in the artifact?):');
bucket(rows.filter(r => r.kind === 1 && r.oy > 0.1), 'oy > 0  (near kerb)');
bucket(rows.filter(r => r.kind === 1 && r.oy < -0.1), 'oy < 0  (far kerb)');
console.log('\nINTERCHANGES only:');
bucket(rows.filter(r => r.kind === 2 && r.oy > 0.1), 'oy > 0  (near kerb)');
bucket(rows.filter(r => r.kind === 2 && r.oy < -0.1), 'oy < 0  (far kerb)');
