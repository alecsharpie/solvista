/* 245 — DOES THE SEA ANSWER THE WIND?
 *
 * WINDA is a seeded gust cycle (0.25..1.0). The trees sway on it, the palms ride it,
 * the flags snap straight in it, the clouds race on it, the rain leans with it. The
 * artifact's own comment says "the whole scene gusts together" — and the water draw
 * contains no WINDA at all, under a comment that calls its whitecaps "wind-driven".
 *
 * This is a STATE-RESPONSE probe (196): render ONE build twice at two pins of the
 * signal, frozen clock, same genWorld — so every moved pixel is a wind-response.
 *
 *   treatment      sea pixels that move as the wind rises      HEAD: 0 by construction
 *   POSITIVE ctrl  land pixels (trees/flags/clouds DO read it) must move on BOTH builds
 *                  — a dead pin produces the same zero as a deaf draw (196)
 *   floor          same wind rendered twice                    must be exactly 0 (203/213)
 *
 * The sea mask comes from 234's palette suppression: loud-paint the sea's palette
 * entries, flush CCACHE, re-render in ONE page, and the changed pixels ARE the sea —
 * occlusion included (a boat's hull is boat-coloured, so it is correctly NOT sea).
 *
 * Build-agnostic: no source swap, no cross-build floor (230). SRC=<file> grades HEAD.
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;

const HERE = dirname(fileURLToPath(import.meta.url));
const ART  = resolve(process.env.SRC || join(HERE, '../../../../solvista.html'));
const SEEDS = (process.env.SEEDS || '42,7,1234').split(',').map(Number);
const WINDS = [0.25, 0.45, 0.65, 0.85, 1.00];   /* WINDA's real range: 0.25 (lull) .. 1.0 (gust) */

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

/* 213: stub the PRNG before the page's own script, or everything genWorld seeds with
   the real Math.random at load is baked in before a page.evaluate can land. */
await page.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});

console.log(`\nartifact: ${ART}\n`);
console.log('sea = pixels inside the water surface that MOVE as the wind rises (the claim)');
console.log('land = trees/flags/clouds — they provably read WINDA, so this is the POSITIVE CONTROL\n');

const rows = [];

for (const seed of SEEDS) {
  await page.goto('file://' + ART + '?seed=' + seed);
  await page.waitForTimeout(400);

  const out = await page.evaluate(({ seed, WINDS }) => {
    /* ---- freeze the world (163c/d, 195f, 199) ---------------------------------- */
    playing = false;
    genWorld(seed);
    __warp(61);
    STARS.length = 0;
    flock = null;
    time = 100;        /* pin BOTH clocks: a diff needs a frozen clock, and waveT   */
    waveT = 100;       /* rolls the crests independently of the wind (195f)          */
    __setTime(0.30);   /* day — the whitecaps are day-only (LITAMT gate)             */

    /* 196: THE CONTAMINANT. The rain shafts LEAN with WINDA, and they are alpha-blended
       OVER the water — so their pixels are part-water and land inside a water-palette
       mask. A neighbour answering the same signal masquerades as the host answering it.
       Record the front, then clear the sky: the question is whether the SEA SURFACE
       answers the wind, not whether the weather drawn on top of it does. */
    const front = __front();
    const soaked = front.wet.filter(w => w > 0.02).length;
    clouds.length = 0;

    const g = cvs.getContext('2d');
    const W = cvs.width, H = cvs.height;
    const grab = () => { render(); return g.getImageData(0, 0, W, H).data; };

    /* ---- the sea mask, by palette suppression (234) ----------------------------
       ⚠ REPAIRED at 255, and it had been measuring the wrong thing since 245: the list
       below used to be ['water','waterDk','foam','glint'] — the sea's ORNAMENTS. But
       `water`/`waterDk` paint the RIVER, the marsh, pools and wakes; the open sea's own
       BODY is `seaFace` -> colMix('waterSh','waterDp'), and NEITHER WAS IN THE MASK. So
       "the sea" was really "the glitter wash + the foam caps", and `land` — its COMPLEMENT
       (see below) — silently contained the entire ocean surface.
       It read HEAD correctly BY ACCIDENT: in HEAD the sea's body never moves with the wind,
       so it contributed 0 to either bucket. The first change that moves the BODY (255's
       roughness wash) lands most of its pixels in `land`, and the POSITIVE CONTROL doubles.
       That is 228's law again, and this is the fifth recursion: read what a probe MEASURES,
       and check WHICH palette entries actually paint the surface you named it after. */
    const SEA = ['water', 'waterDk', 'foam', 'glint', 'waterSh', 'waterDp'];
    const A = grab();
    const keep = {};
    for (const n of SEA) { keep[n] = BASE[n].slice(); BASE[n] = [255, 0, 255]; }
    CCACHE = {};
    const B = grab();
    for (const n of SEA) BASE[n] = keep[n];
    CCACHE = {};

    const isSea = new Uint8Array(W * H);
    let seaPx = 0;
    for (let i = 0; i < W * H; i++) {
      const j = i * 4;
      if (A[j] !== B[j] || A[j + 1] !== B[j + 1] || A[j + 2] !== B[j + 2]) { isSea[i] = 1; seaPx++; }
    }

    /* ---- floor: the SAME wind rendered twice must be 0 (203/213) --------------- */
    WINDA = WINDS[0]; CCACHE = {};
    const f1 = grab(), f2 = grab();
    let floor = 0;
    for (let i = 0; i < W * H; i++) {
      const j = i * 4;
      const d = Math.max(Math.abs(f1[j] - f2[j]), Math.abs(f1[j + 1] - f2[j + 1]), Math.abs(f1[j + 2] - f2[j + 2]));
      if (d > 6) floor++;
    }

    /* ---- the sweep: every render diffed against the CALM reference ------------- */
    WINDA = WINDS[0]; CCACHE = {};
    const calm = grab();

    const res = [];
    for (const w of WINDS) {
      WINDA = w; CCACHE = {};
      const cur = grab();
      let seaInk = 0, landInk = 0, seaMoved = 0, landMoved = 0;
      for (let i = 0; i < W * H; i++) {
        const j = i * 4;
        const d = Math.max(Math.abs(cur[j] - calm[j]), Math.abs(cur[j + 1] - calm[j + 1]),
                           Math.abs(cur[j + 2] - calm[j + 2]));
        if (d <= 6) continue;
        if (isSea[i]) { seaInk += d; seaMoved++; } else { landInk += d; landMoved++; }
      }
      res.push({ w, seaInk, landInk, seaMoved, landMoved });
    }
    return { seaPx, floor, res, soaked, front: front.front };
  }, { seed, WINDS });

  console.log(`— seed ${seed} —   sea surface = ${out.seaPx.toLocaleString()} px    floor = ${out.floor} px    (rain front ${out.front.toFixed(2)}, ${out.soaked} soaked clouds — CLEARED, see 196)`);
  console.log('   WINDA    sea px      sea ink        land px     land ink   (vs the calm frame)');
  for (const r of out.res) {
    console.log(`   ${r.w.toFixed(2)}   ${String(r.seaMoved).padStart(7)}  ${String(r.seaInk).padStart(11)}   `
              + `${String(r.landMoved).padStart(9)}  ${String(r.landInk).padStart(11)}`);
  }
  const top = out.res[out.res.length - 1];
  rows.push({ seed, floor: out.floor, seaPx: out.seaPx, sea: top.seaMoved, land: top.landMoved });
  console.log(`   ⇒ at full gust: sea ${top.seaMoved} px, land ${top.landMoved} px (positive control)\n`);
}

/* ── MEAN-HOLD (98/216/222) ───────────────────────────────────────────────────────
 * The cap threshold gates a path-object COUNT, so a drifted mean is a permanent,
 * un-budgeted draw cost. The design is centred so seaState()==0.5 reproduces HEAD's
 * draw EXACTLY. Only the CYCLE MEAN is measured here:
 *   mean(seaState) over the REAL gust cycle must land on 0.5. Pure maths off the
 *   artifact's own WINDA formula — no render, no noise floor, nothing to stub.
 *
 * ⚠ THE FIXED-POINT FRAME HASH THAT USED TO LIVE HERE WAS A DEAD INSTRUMENT (removed
 *   at 255). It rendered once and hashed the frame, then told you to compare that
 *   number against a HEAD run. It could NEVER pass: (a) it never cleared the MOVERS,
 *   so boats and peds drift between page loads (230 — the floor IS the movers), and
 *   (b) a whole-frame HASH is not a diff — it is all-or-nothing, so ONE anti-aliased
 *   pixel of float noise reports "different" exactly as loudly as a broken feature
 *   (245's own law, which this probe then went on to break). Measured at 255: the same
 *   pristine HEAD file hashed 3129893759, 2450885004 and 3158439912 on three
 *   consecutive runs. It was three iterations of pure noise wearing a decimal point.
 *   ⇒ The fixed point is proved by `probe-seamean.mjs`, which COUNTS DIFFERING PIXELS
 *   and carries a HEAD-vs-HEAD floor in the same run (213). Use that; it works.
 */
console.log('\n══ MEAN-HOLD ══  (is the foam redistributed, or is there simply more of it?)');
{
  const WFIX = 0.25 + 0.75 * (0.16 / 0.66);   /* the WINDA at which seaState()==0.5 */
  await page.goto('file://' + ART + '?seed=42');
  await page.waitForTimeout(400);
  const mean = await page.evaluate(({ WFIX }) => {
    playing = false; genWorld(42); __warp(61);
    STARS.length = 0; flock = null; clouds.length = 0;
    waveT = 100; __setTime(0.30);

    /* (2) mean seaState over the real gust cycle, sampled off the shipped WINDA formula */
    const ss = t => {
      const w = 0.25 + 0.75 * Math.max(0, Math.sin(t * 0.13 + (seedNum % 89) * 0.5)) * (0.72 + 0.28 * Math.sin(t * 0.57));
      return 0.34 + 0.66 * Math.min(1, Math.max(0, (w - 0.25) / 0.75));
    };
    let acc = 0; const N = 400000;
    for (let i = 0; i < N; i++) acc += ss(i * 0.01);   /* 4000 s ≫ both periods (48 s, 11 s) */

    return { meanSS: acc / N, WFIX };
  }, { WFIX });
  console.log(`  cycle mean seaState = ${mean.meanSS.toFixed(4)}   (target 0.5000)`);
  console.log(`  fixed point at WINDA=${mean.WFIX.toFixed(4)} ⇒ seaState 0.5.`);
  console.log(`      ⇒ prove it with  node probes/probe-seamean.mjs  (counts px, carries a floor).`);
  console.log(`        The frame HASH that used to print here was noise — see the header.`);
}

console.log('\n══ VERDICT ══');
for (const r of rows) {
  const seaDeaf = r.sea <= Math.max(50, r.floor * 3);
  const pinLive = r.land > 200;
  console.log(`seed ${String(r.seed).padStart(4)}  floor ${String(r.floor).padStart(3)}  `
    + `sea ${String(r.sea).padStart(6)} px ${seaDeaf ? '← DEAF to the wind' : '← answers the wind'}   `
    + `land ${String(r.land).padStart(6)} px ${pinLive ? '(pin is LIVE)' : '⚠ PIN DEAD — probe is lying'}`);
}
await browser.close();
