/* probe-domedark.mjs — the observatory, in the VIEWER'S units (iter 259).
 *
 * probe-darksky measured `c.lit` AT THE DOME'S OWN HEX. That is the RULE's unit, and it
 * is not what an eye reads (205). Two visual agents then disagreed FLATLY about the same
 * patched build -- one said the dome was "ringed by lit towers", the other that it was
 * "stranded in the unlit dark" -- and the second FAILED ITS OWN LOCATE (it put the dome at
 * (0.65,0.47) when the truth was (0.29,0.69)), so it was judging the wrong pixels. When
 * agents disagree, a NUMBER is the verdict, not a re-run.
 *
 * Three questions, all in units a viewer could arrive at by looking:
 *
 * A. AMBIENT -- how much lit city SURROUNDS the dome? Mean rendered luminance of the live
 *    hexes within R of it, sampled over each hex's AREA (238: a point sample lands on a
 *    roof) and read off the frame with THE DOME ITSELF SUPPRESSED, so its own glow cannot
 *    contaminate the thing it is supposed to be standing away from. THIS is the claim.
 *
 * B. VISIBILITY -- is the dome BURIED? The 1234 agent reported HEAD's downtown dome
 *    "entirely occluded by surrounding skyscrapers ... unrenderable at its own centre".
 *    206's law, and it is directly measurable (probe-amphvis's rig, retargeted):
 *      A = frame as shipped                     B = frame with the dome's drawCell suppressed
 *      D = B, dome's drawCell re-issued ON TOP
 *      inkInPlace = |A-B|   inkOnTop = |D-B|    occluded% = 1 - inPlace/onTop
 *    Floor EXACTLY 0 (one page, frozen clock), occlusion read off the final composited canvas.
 *
 * C. HUD -- pushing the dome to the rim can push it ANYWHERE, including behind the placard,
 *    which owns the top-left and which every getImageData probe is structurally blind to
 *    (200). Measured against the real DOM box, not guessed.
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));

const HEADPATH = '/tmp/solvista-darksky-HEAD.html';
writeFileSync(HEADPATH, execSync('git show HEAD:solvista.html', { cwd: HERE, maxBuffer: 1 << 28 }));
const BUILDS = { HEAD: 'file://' + HEADPATH, patch: 'file://' + join(HERE, '../../../../solvista.html') };
const SEEDS = [7, 42, 1234, 99, 2024, 5];
const NIGHT = 0.92;      /* off the light curve (202) */
const R = 5;             /* the neighbourhood an eye reads around a landmark, in hexes */

const br = await chromium.launch();
const out = {};
for (const [build, url] of Object.entries(BUILDS)) {
  const p = await br.newPage({ viewport: { width: 1400, height: 900 } });
  await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
  await p.goto(url);
  out[build] = [];
  for (const seed of SEEDS) {
    out[build].push(await p.evaluate(({ seed, NIGHT, R }) => {
      playing = false;                                   /* stops BOTH clocks */
      genWorld(seed); __warp(61); __setTime(NIGHT);
      lastSky = 0; syncSky(performance.now()); syncStats();

      let ax = -1, ay = -1, lit = 0;
      for (const i of HEXI) {
        const c = cells[i];
        if (c.t === T.CIVIC && c.kind === 'observatory') { ax = i % G; ay = (i / G) | 0; lit = c.lit; }
      }
      const ctx2 = cvs.getContext('2d');
      const W = cvs.width, H = cvs.height, dpr = W / innerWidth;
      const grab = () => ctx2.getImageData(0, 0, W, H).data;

      render();
      const Aimg = grab();                                        /* frame as shipped */
      const real = drawCell;
      window.drawCell = (x, y) => { if (x === ax && y === ay) return; real(x, y); };
      const Bimg = (render(), grab());                             /* the dome suppressed */
      const Dimg = (render(), real(ax, ay), grab());               /* ...and re-issued ON TOP */
      window.drawCell = real;

      let inPlace = 0, onTop = 0;
      for (let i = 0; i < Aimg.length; i += 4) {
        const d1 = Math.max(Math.abs(Aimg[i] - Bimg[i]), Math.abs(Aimg[i + 1] - Bimg[i + 1]), Math.abs(Aimg[i + 2] - Bimg[i + 2]));
        const d2 = Math.max(Math.abs(Dimg[i] - Bimg[i]), Math.abs(Dimg[i + 1] - Bimg[i + 1]), Math.abs(Dimg[i + 2] - Bimg[i + 2]));
        if (d1 > 6) inPlace++;
        if (d2 > 6) onTop++;
      }

      /* --- A. AMBIENT: the lit city around it, off the DOME-SUPPRESSED frame --- */
      const lum = (buf, sx, sy, r) => {           /* mean luminance over an AREA (238) */
        let s = 0, n = 0;
        for (let y = sy - r; y <= sy + r; y += 2) for (let x = sx - r; x <= sx + r; x += 2) {
          if (x < 0 || y < 0 || x >= W || y >= H) continue;
          const i = (y * W + x) * 4;
          s += 0.30 * buf[i] + 0.59 * buf[i + 1] + 0.11 * buf[i + 2]; n++;
        }
        return n ? s / n : 0;
      };
      let aLum = 0, aLit = 0, an = 0;
      for (const i of HEXI) {
        const x = i % G, y = (i / G) | 0;
        const hd = hexDist(x, y, ax, ay);
        if (hd < 1 || hd > R) continue;                  /* the ring AROUND it, not the dome */
        const [wx, wy] = ctr(x, y);
        const sx = Math.round((wx * scale + offX) * dpr), sy = Math.round((wy * scale + offY) * dpr);
        aLum += lum(Bimg, sx, sy, Math.round(6 * dpr)); aLit += cells[i].lit; an++;
      }

      /* --- C. HUD: is the dome behind the placard? (200) real DOM box, not a guess --- */
      const [wx, wy] = ctr(ax, ay);
      const sx = wx * scale + offX, sy = wy * scale + offY;
      const pc = document.querySelector('.placard');
      const b = pc ? pc.getBoundingClientRect() : null;
      const behind = b ? (sx > b.left && sx < b.right && sy > b.top && sy < b.bottom) : false;

      return { seed, ax, ay, lit, d: hexDist(ax, ay, CBDX, CBDY),
        inPlace, onTop, occl: onTop ? 1 - inPlace / onTop : 0,
        aLum: aLum / an, aLit: aLit / an, an, behind,
        sx: Math.round(sx), sy: Math.round(sy),
        pbox: b ? [Math.round(b.left), Math.round(b.top), Math.round(b.right), Math.round(b.bottom)] : null };
    }, { seed, NIGHT, R }));
  }
  await p.close();
}
await br.close();

const f = (v, n = 1) => v.toFixed(n);
console.log(`\n=== A. AMBIENT -- how much LIT CITY surrounds the dome? (the claim, in the viewer's units) ===`);
console.log(`   mean rendered LUMINANCE of the ${'live hexes within ' + R} of the dome, dome itself SUPPRESSED\n`);
console.log(`seed        HEAD lum   patch lum    change      HEAD nbr c.lit   patch nbr c.lit`);
let hL = 0, pL = 0;
SEEDS.forEach((s, i) => {
  const h = out.HEAD[i], p = out.patch[i];
  hL += h.aLum; pL += p.aLum;
  const pc = (p.aLum - h.aLum) / h.aLum * 100;
  console.log(`${String(s).padEnd(6)}     ${f(h.aLum).padStart(6)}      ${f(p.aLum).padStart(6)}     ${(pc >= 0 ? '+' : '') + f(pc)}%`.padEnd(52) +
    `${f(h.aLit, 3).padStart(6)}           ${f(p.aLit, 3).padStart(6)}`);
});
console.log(`\n  mean ambient luminance  HEAD ${f(hL / SEEDS.length)}  ->  patch ${f(pL / SEEDS.length)}   ` +
  `(${f((pL - hL) / hL * 100)}%)`);

console.log(`\n\n=== B. VISIBILITY -- is the dome BURIED? (206; the 1234 agent's defect, measured) ===`);
console.log(`   occluded% = 1 - inkInPlace/inkOnTop, off the final composited canvas. floor exactly 0.\n`);
console.log(`seed      HEAD: d(CBD)  visible px   OCCLUDED     |   patch: d(CBD)  visible px   OCCLUDED`);
let ho = 0, po = 0, hbur = 0, pbur = 0;
SEEDS.forEach((s, i) => {
  const h = out.HEAD[i], p = out.patch[i];
  ho += h.occl * 100; po += p.occl * 100;
  if (h.occl > 0.5) hbur++; if (p.occl > 0.5) pbur++;
  console.log(`${String(s).padEnd(6)}        ${String(h.d).padStart(3)}      ${String(h.inPlace).padStart(6)}px     ${f(h.occl * 100).padStart(5)}%     |` +
    `        ${String(p.d).padStart(3)}      ${String(p.inPlace).padStart(6)}px     ${f(p.occl * 100).padStart(5)}%`);
});
console.log(`\n  mean occluded   HEAD ${f(ho / SEEDS.length)}%  ->  patch ${f(po / SEEDS.length)}%`);
console.log(`  domes more than HALF buried:   HEAD ${hbur}/${SEEDS.length}  ->  patch ${pbur}/${SEEDS.length}`);

console.log(`\n\n=== C. HUD -- is the dome hidden behind the placard? (200: every canvas probe is blind to it) ===\n`);
SEEDS.forEach((s, i) => {
  const h = out.HEAD[i], p = out.patch[i];
  console.log(`${String(s).padEnd(6)}  HEAD (${String(h.sx).padStart(4)},${String(h.sy).padStart(3)}) ${h.behind ? 'BEHIND PLACARD' : 'clear'}` +
    `      patch (${String(p.sx).padStart(4)},${String(p.sy).padStart(3)}) ${p.behind ? 'BEHIND PLACARD <-- ' : 'clear'}`);
});
console.log(`\n  placard box (HEAD, seed ${SEEDS[0]}): [${out.HEAD[0].pbox}]`);
