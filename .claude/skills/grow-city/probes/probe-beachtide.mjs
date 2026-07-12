#!/usr/bin/env node
/* probe-beachtide.mjs — do the BEACHGOERS answer the tide, or only the sun?
 *
 * The seam: iter 145 made the beach furniture follow the SUN (LITAMT gates the
 * parasols in through the morning and packs them away by dusk), and the beach GROUND
 * has answered the TIDE since long before that — the damp margin `w2` sweeps up and
 * down the sand, and iter 196 used it as its positive control precisely because it
 * provably reads TIDE. But the furniture itself was drawn at px(gx,gy), the bare hex
 * centre. So at dead low water the sunbathers were lying on wet sand.
 *
 * This is a STATE-RESPONSE claim ("does X answer signal S?"), so the isolation is
 * 196's, not 161's: render ONE build TWICE at two pins of TIDE, same seed, same
 * genWorld, frozen clock. The only variable is TIDE, so any parasol that moves has
 * answered it.
 *
 * It measures DRAW CALLS, not pixels (199's wrap-the-draw move): CanvasRenderingContext2D
 * .ellipse is wrapped and every parasol canopy — ellipse(cx,cy-5,4.5,2.6), a signature
 * that occurs exactly ONCE in the file — is captured with its position. No pixel noise
 * floor at all, so the zero is an honest zero (195(f)).
 *
 * The direction each parasol SHOULD travel is recomputed from the terrain by this probe,
 * independently of the artifact's own seaDirS() (122's law: check the claim against
 * independently recomputed truth, not against the formula under test).
 *
 *   BASE  displacement along seaward  ~0.00px   the draw is DEAF   <- the seam, as a number
 *   PATCH displacement along seaward  ~+5.0px   it answers the tide
 *   PATCH perpendicular component     ~0.00px   it travels along the shore normal (control)
 *   PATCH landlocked beach hexes      0.00px    no sea to answer   (control)
 *   BOTH  damp-margin pixels move                the TIDE pin is LIVE (positive control:
 *                                                without it, BASE=0 is a dead pin, not a
 *                                                deaf draw -- 196's law)
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = [resolve(HERE, 'solvista.html'), resolve(HERE, '../../../../solvista.html')].find(existsSync);
const REPO = dirname(ROOT);

const SEEDS = [7, 42, 1234];
const LO = 0.02, HI = 0.98;          // dead low water / high water
const WARP = 61;

// pristine HEAD beside the patched file, so BASE is the real shipped draw
const BASE = join(REPO, '.probe-beachtide-base.html');
writeFileSync(BASE, execFileSync('git', ['-C', REPO, 'show', 'HEAD:solvista.html'], { maxBuffer: 1 << 28 }));

const browser = await chromium.launch();
const pg = await browser.newPage({ viewport: { width: 1400, height: 900 } });
pg.on('pageerror', e => console.log('  PAGE ERROR', e.message));

async function measure(file, seed) {
  await pg.goto('file://' + file + '?seed=' + seed + '&warp=' + WARP);
  await pg.waitForTimeout(500);
  return await pg.evaluate(({ LO, HI }) => {
    playing = false;
    dayT = 0.5;                       // midday: LITAMT ~0, so the furniture is fully out
    // --- capture the parasol canopies by their unique draw signature ---
    const proto = CanvasRenderingContext2D.prototype;
    if (!proto.__origEllipse) proto.__origEllipse = proto.ellipse;
    let grab = null;
    proto.ellipse = function (x, y, rx, ry, ...rest) {
      if (grab && rx === 4.5 && ry === 2.6) grab.push([x, y]);
      return proto.__origEllipse.call(this, x, y, rx, ry, ...rest);
    };
    const shoot = tide => {
      TIDE = tide; TIDEV = 1;
      grab = [];
      render();
      const got = grab; grab = null;
      return got;
    };
    // --- the beach hexes, and which way the sea lies from each: RECOMPUTED HERE,
    //     from the terrain, not by calling the artifact's seaDirS() ---
    const hexes = [];
    for (const i of HEXI) {
      const c = cells[i];
      if (!c || c.t !== T.BEACH) continue;
      const gx = i % G, gy = (i / G) | 0;
      const [hx, hy] = ctr(gx, gy);
      let sx = 0, sy = 0, n = 0;
      for (const [dx, dy] of nbrDirs(gy)) {
        const e = cellAt(gx + dx, gy + dy);
        if (!e || e.t !== T.WATER || e.riv) continue;
        const [nx, ny] = ctr(gx + dx, gy + dy);
        const L = Math.hypot(nx - hx, ny - hy) || 1;
        sx += (nx - hx) / L; sy += (ny - hy) / L; n++;
      }
      const L = Math.hypot(sx, sy) || 1;
      hexes.push({ hx, hy, n, sx: n ? sx / L : 0, sy: n ? sy / L : 0 });
    }
    const lo = shoot(LO), hi = shoot(HI);
    // --- match each captured parasol to its nearest beach-hex centre (hexes are 32px
    //     apart and the travel is a few px, so the nearest centre is unambiguous) ---
    const near = p => {
      let b = null, bd = 1e9;
      for (const h of hexes) { const d = (p[0] - h.hx) ** 2 + (p[1] - h.hy) ** 2; if (d < bd) { bd = d; b = h; } }
      return bd < 18 * 18 ? b : null;
    };
    const byHex = new Map();
    for (const p of lo) { const h = near(p); if (h) byHex.set(h, { lo: p }); }
    for (const p of hi) { const h = near(p); if (h && byHex.has(h)) byHex.get(h).hi = p; }

    let alongSum = 0, perpSum = 0, nSea = 0, landlockedMax = 0, nLand = 0;
    for (const [h, v] of byHex) {
      if (!v.lo || !v.hi) continue;
      const dx = v.hi[0] - v.lo[0], dy = v.hi[1] - v.lo[1];
      if (h.n === 0) { landlockedMax = Math.max(landlockedMax, Math.hypot(dx, dy)); nLand++; continue; }
      alongSum += dx * h.sx + dy * h.sy;          // + = moved SEAWARD as the tide flooded
      perpSum += Math.abs(dx * -h.sy + dy * h.sx);
      nSea++;
    }
    // --- positive control: does the damp margin itself move? (is the TIDE pin live?) ---
    const cvs = document.querySelector('canvas');
    const g = cvs.getContext('2d');
    const snap = tide => { TIDE = tide; TIDEV = 1; render(); return g.getImageData(0, 0, cvs.width, cvs.height).data; };
    const a = snap(LO), b = snap(HI);
    let moved = 0;
    for (let i = 0; i < a.length; i += 4) {
      if (Math.abs(a[i] - b[i]) + Math.abs(a[i + 1] - b[i + 1]) + Math.abs(a[i + 2] - b[i + 2]) > 8) moved++;
    }
    return {
      parasols: lo.length, matched: nSea, landlocked: nLand,
      along: nSea ? alongSum / nSea : 0,
      perp: nSea ? perpSum / nSea : 0,
      landlockedMax, tidePixels: moved,
    };
  }, { LO, HI });
}

console.log('  parasol travel from LOW water -> HIGH water, projected on each hex\'s own seaward normal');
console.log('  (+ = follows the water down the beach as it floods)\n');
console.log('  seed   build   parasols  along-seaward   perp(ctl)   landlocked(ctl)   tide-px(live?)');
for (const seed of SEEDS) {
  for (const [nm, f] of [['BASE ', BASE], ['PATCH', ROOT]]) {
    const r = await measure(f, seed);
    console.log(`  ${String(seed).padEnd(6)} ${nm}   ${String(r.parasols).padStart(6)}   ` +
      `${r.along.toFixed(2).padStart(9)}px   ${r.perp.toFixed(2).padStart(6)}px   ` +
      `${r.landlockedMax.toFixed(2).padStart(8)}px (n=${r.landlocked})   ${String(r.tidePixels).padStart(7)}`);
  }
}
await browser.close();
