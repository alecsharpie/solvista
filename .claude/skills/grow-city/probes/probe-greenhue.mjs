#!/usr/bin/env node
/* probe-greenhue.mjs — iter 265: does the GOLDEN sun rotate the city's greens onto the asphalt?
 *
 * 214's law, at the OTHER END OF THE DAY. A flat per-channel multiply on a saturated surface is
 * a HUE ROTATION, not a tint. The whole wash ladder (214 sand, 220 masonry, 221 greens, 234
 * timber) exists because the NIGHT tint [.42,.42,.58] crushes R and swings every WARM surface to
 * violet. The GOLDEN tint is that bug's mirror and had never been read as one: [.92,.72,.66]
 * crushes G and B, so on a surface whose identity is its GREEN, R overtakes G and the hue swings
 * to orange.
 *
 * WHY probe-goldenhue IS THE WRONG INSTRUMENT FOR THIS (238's coverage law). It samples the
 * PARK HEX, and a park hex is only ~45% lawn + 12% canopy — the other 43% is season-dead paths,
 * ponds, benches and cafe furniture, which are SUPPOSED to be tan. So the hex mean DILUTES the
 * green by more than half and reports a 3deg move where the grass itself moves 15. Measure the
 * PALETTE ENTRY, not the tile.
 *
 * THE RIG IS 234'S PALETTE SUPPRESSION — loud-paint the entry, diff inside ONE page, and the
 * changed pixels ARE that draw (floor exactly 0; occlusion checked for free, since the mask is
 * read off the final composited canvas; BUILD-AGNOSTIC, because the mask comes from each build's
 * OWN render — no source swap, no cross-build floor, no 197-class stale-backup hazard).
 *
 * THE GATE IS 221'S LAW: for an identity/hue claim, gate on the surface's distance from ITS OWN
 * DAYLIGHT SELF, never on a pairwise separation from a neighbour — a separation metric can reward
 * the very bug you are fixing. So the score is
 *
 *   dHUE = angular distance( GOLDEN hue of the greens , DAY hue of the greens )
 *
 * ...and beside it the one binary a viewer actually reads, which needs no threshold at all:
 *
 *   GREEN? = is G still the MAX CHANNEL — i.e. is the grass still GREEN, or is it now orange?
 *
 * CONTROLS:
 *   (a) THE WARM PALETTE MUST NOT MOVE (250's must-not-move column). sandCol passes no golden
 *       dial on purpose — the land is diffuse and SHOULD blaze at dusk (257) — so the sand's
 *       golden hue must come back IDENTICAL to HEAD. If it moves, the wash has leaked out of
 *       the greens and the lap is fighting the light instead of the collapse.
 *   (b) DAY is the free dead-regime control (199): goldenWash() is 0 at noon (TINT's R-B is .09,
 *       under the cut), so daylight runs BYTE-IDENTICAL code on both builds. Every day column
 *       must match HEAD. If it moves, the patch leaked into daylight.
 *   (c) LUMINANCE must not move: washRGB is luminance-MATCHED by construction (223), so this is
 *       a HUE change and nothing else. A brighter park would be a bug, not a win.
 *
 * THE GOLDEN PIN IS DERIVED, NEVER TYPED (264's law). 261 gave the light curve a `year` term, so
 * a literal `t` is a guess about a curve that has moved. Golden = the ARGMAX of the shipped GWARM,
 * found by driving the artifact's own code (249), exactly as shot-stepback does.
 *
 *   node probe-greenhue.mjs
 *   git show HEAD:solvista.html > /tmp/head.html && SRC=/tmp/head.html node probe-greenhue.mjs
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = process.env.SRC ? resolve(process.env.SRC) : join(HERE, '../../../../solvista.html');

const SEEDS = [7, 42, 1234];
const W = 1600, H = 1000;
/* the TREATMENT: LEAFN, the set the artifact itself calls "anything that grows". */
const GREENS = ['grass', 'grassDk', 'lawn', 'meadow', 'canopy', 'canopyLt',
                'evergreen', 'evergreenLt', 'turf', 'sage', 'sprout'];
/* the CONTROL: warm surfaces, which take no golden dial and must be byte-identical. */
const WARM = ['sand', 'sandDk', 'cream', 'terra'];

const hue = (r, g, b) => {
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), c = mx - mn;
  if (c < 1e-6) return 0;
  let h;
  if (mx === r) h = ((g - b) / c) % 6;
  else if (mx === g) h = (b - r) / c + 2;
  else h = (r - g) / c + 4;
  h *= 60; return h < 0 ? h + 360 : h;
};
const dHue = (a, b) => { const d = Math.abs(a - b) % 360; return d > 180 ? 360 - d : d; };
const luma = (r, g, b) => 0.30 * r + 0.59 * g + 0.11 * b;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H } });
await page.addInitScript(() => {                     /* 213: stub the PRNG before the page's script */
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await page.goto(pathToFileURL(SRC).href);
await page.waitForFunction(() => typeof window.__warp === 'function');

const rows = [];
for (const seed of SEEDS) {
  const r = await page.evaluate(([seed, GREENS, WARM]) => {
    playing = false;                                  /* both clocks stop */
    genWorld(seed); window.__warp(61);
    time = 0; waveT = 0;                              /* 195(f): drifting surf sits under the signal */
    if (typeof STARS !== 'undefined') STARS.length = 0;
    if (typeof flock !== 'undefined') flock = null;
    window.__setYear(2035.62);                        /* the dry peak, off winter (202) */

    const cvs = document.querySelector('canvas');
    const ctx2 = cvs.getContext('2d');
    const grab = () => { render(); return ctx2.getImageData(0, 0, cvs.width, cvs.height).data; };

    /* GOLDEN = the argmax of the curve's OWN warmth signal, FOUND not guessed (264). Drive the
       shipped GWARM rather than re-implementing it (249); search the dusk band, as the camera does. */
    let goldenT = 0, best = -1;
    for (let t = 0.55; t <= 0.95; t += 0.005) {
      window.__setTime(t); render();
      if (GWARM > best) { best = GWARM; goldenT = t; }
    }

    /* 234: loud-paint a palette group, re-render in ONE page, and the changed pixels ARE that group. */
    const measure = (names) => {
      const A = grab();
      const keep = {}; for (const n of names) if (BASE[n]) keep[n] = BASE[n].slice();
      for (const n of names) if (BASE[n]) BASE[n] = [255, 0, 255];
      CCACHE = {};
      const B = grab();
      for (const n of names) if (keep[n]) BASE[n] = keep[n];
      CCACHE = {};
      /* ⚠ THE THRESHOLD SELECTS OPACITY, AND A LOW ONE MEASURES THE GROUND (iter 265). Loud-painting
         [255,0,255] over a green moves an OPAQUE pixel by ~419 (|dR|+|dG|+|dB|), so a threshold of
         24 admits pixels that are only ~6% green — faint alpha-blended specks (sprouts, canopy
         edges) sitting on TAN ground, whose shipped colour is mostly the ground's. They dragged the
         aggregate ~8 RGB units toward orange and made the grass look R-dominant when the grass FILL
         was not. 234's own caution, arriving on the mask instead of on the count: read the surface
         where it is actually PAINTED. 150 ≈ 36% opacity and up. */
      const MIND = 150;
      let n = 0, sr = 0, sg = 0, sb = 0;
      for (let i = 0; i < A.length; i += 4) {
        const d = Math.abs(A[i] - B[i]) + Math.abs(A[i + 1] - B[i + 1]) + Math.abs(A[i + 2] - B[i + 2]);
        if (d > MIND) { n++; sr += A[i]; sg += A[i + 1]; sb += A[i + 2]; }   /* mean of the SHIPPED colour */
      }
      return n ? { n, r: sr / n, g: sg / n, b: sb / n } : { n: 0, r: 0, g: 0, b: 0 };
    };

    const out = { goldenT: +goldenT.toFixed(3), goldenGW: +best.toFixed(3) };
    for (const [hn, t] of [['day', 0.30], ['golden', goldenT]]) {
      window.__setTime(t); lastSky = 0; render();      /* 204: the frozen clock will not sync the sky */
      out[hn] = { green: measure(GREENS), warm: measure(WARM) };
    }
    return out;
  }, [seed, GREENS, WARM]);
  rows.push({ seed, ...r });
}
await browser.close();

const px = o => `[${Math.round(o.r)},${Math.round(o.g)},${Math.round(o.b)}]`;
const isGreen = o => o.g > o.r;                       /* the binary the viewer reads: G still the max? */

console.log(`\nGREEN UNDER A GOLDEN SUN — ${SRC.includes('head') ? 'PRISTINE HEAD' : 'the working tree'}`);
console.log('the mask IS the palette entry (234) — floor exactly 0, occlusion free, build-agnostic');
console.log(`golden pin DERIVED, not typed (264): t=${rows[0].goldenT}, GWARM peaks ${rows[0].goldenGW}\n`);

console.log('  TREATMENT — the greens (LEAFN: "anything that grows")');
console.log('  seed |      day rgb        hue |   golden rgb        hue |  dHUE | GREEN? | luma d->g');
console.log('  ---------------------------------------------------------------------------------------');
let worst = 0, notGreen = 0;
for (const r of rows) {
  const d = r.day.green, g = r.golden.green;
  const hd = hue(d.r, d.g, d.b), hg = hue(g.r, g.g, g.b), dh = dHue(hd, hg);
  worst = Math.max(worst, dh);
  const grn = isGreen(g); if (!grn) notGreen++;
  console.log(`  ${String(r.seed).padStart(4)} | ${px(d).padEnd(15)} ${hd.toFixed(0).padStart(3)}deg | ${px(g).padEnd(15)} ${hg.toFixed(0).padStart(3)}deg | ${dh.toFixed(0).padStart(4)}deg |  ${grn ? ' yes  ' : '*NO*  '} | ${Math.round(luma(d.r, d.g, d.b))} -> ${Math.round(luma(g.r, g.g, g.b))}`);
}

console.log('\n  CONTROL — the warm palette (sandCol passes NO golden dial; must be IDENTICAL to HEAD)');
console.log('  seed |      day rgb        hue |   golden rgb        hue |  dHUE');
console.log('  -----------------------------------------------------------------');
for (const r of rows) {
  const d = r.day.warm, g = r.golden.warm;
  const hd = hue(d.r, d.g, d.b), hg = hue(g.r, g.g, g.b);
  console.log(`  ${String(r.seed).padStart(4)} | ${px(d).padEnd(15)} ${hd.toFixed(0).padStart(3)}deg | ${px(g).padEnd(15)} ${hg.toFixed(0).padStart(3)}deg | ${dHue(hd, hg).toFixed(0).padStart(4)}deg`);
}

console.log(`\nworst green dHUE = ${worst.toFixed(0)} deg   |   seeds where the grass is NOT green at golden: ${notGreen}/${rows.length}`);
console.log('HEAD reads dHUE ~32deg and *NO* on every seed — R overtakes G and the grass renders ORANGE.');
console.log('The land SHOULD warm at dusk (257). It should not all warm onto ONE hue.');
process.exit(notGreen ? 1 : 0);
