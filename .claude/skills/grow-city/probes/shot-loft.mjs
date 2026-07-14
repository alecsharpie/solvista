/* shot-loft.mjs — the warehouse->loft camera (iter 267).
 *
 * The before/after is taken INSIDE ONE PAGE (230): render the world as shipped, then
 * clear c.loft on every cell and render the SAME frozen world again — which draws
 * exactly the sawtooth warehouse HEAD always drew there. No source swap, no
 * cross-build floor, no 197-class stale-backup hazard, and the two frames differ by
 * the feature and by nothing else.
 *
 * (A HEAD-vs-patch shot would be dishonest here anyway: removing the old rc() loop's
 * dead draws reshuffles the seeded stream, so HEAD's city is a DIFFERENT city and the
 * same hex need not even be industrial in it.)
 *
 * 226: the close-up is aimed by MEASURED INK, not by a tile predicate — the two
 * renders are diffed and the argmax loft is framed, so the camera points where the
 * conversion provably renders rather than at whichever shed comes first in HEXI.
 *
 * 258: the expected result is a PRESENCE in both frames (a loft / a warehouse), so
 * every frame self-reports what is standing at its centre. A frame that lost its host
 * is caught by the tool, not by an agent.
 *
 * 264: no `t` literal. Both light pins are DERIVED in-page from the shipped light
 * curve (day = argmin LITAMT, night = argmax LITAMT).
 *
 * 239/238: frames are named by FILE, never by a letter, and the state->token mapping
 * is CROSSED between the seeds, so "the second one is the fix" is false on one seed.
 * This script prints the map; the agent never sees it.
 *
 *   node shot-loft.mjs <outdir>
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = pathToFileURL(join(HERE, '../../../../solvista.html')).href;
const OUT = process.argv[2] || join(HERE, '../shots/loft');
mkdirSync(OUT, { recursive: true });

/* 238: cross the mapping — on seed 42 the loft is "alpha", on seed 7 it is "beta". */
const PLAN = [
  { seed: 42, tokens: { alpha: 'loft', beta: 'works' } },
  { seed: 7,  tokens: { alpha: 'works', beta: 'loft' } },
];

const br = await chromium.launch();
console.log('\nMAP (the agent never sees this):');
for (const { seed, tokens } of PLAN)
  console.log(`  seed ${seed}: ` + Object.entries(tokens).map(([t, s]) => `${t}=${s}`).join('  '));
console.log('\nframe                          lofts  works  aimed hex   AT CENTRE      ink   LITAMT');

for (const { seed, tokens } of PLAN) {
  const p = await br.newPage({ viewport: { width: 1400, height: 900 } });
  await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
  await p.goto(SRC);
  await p.evaluate(() => { window.FIT = [scale, offX, offY]; });

  /* build the world ONCE, derive the pins, and find the argmax loft by measured ink */
  const aim = await p.evaluate((seed) => {
    playing = false;
    genWorld(seed); __warp(61);
    /* 264: derive the light pins from the curve, never type them */
    let dayPin = 0, nightPin = 0, lo = 1e9, hi = -1e9;
    for (let t = 0; t < 1; t += 0.005) {
      __setTime(t); render();
      if (LITAMT < lo) { lo = LITAMT; dayPin = t; }
      if (LITAMT > hi) { hi = LITAMT; nightPin = t; }
    }
    __setTime(dayPin);
    const lofts = [];
    for (const i of HEXI) if (cells[i].t === T.IND && cells[i].loft) lofts.push(i);
    const works = HEXI.filter(i => cells[i].t === T.IND && !cells[i].loft).length;

    const g = () => { render();
      return cvs.getContext('2d').getImageData(0, 0, cvs.width, cvs.height).data; };
    const A = g();                                        /* as shipped */
    const saved = lofts.slice();
    for (const i of lofts) cells[i].loft = false;         /* 230: suppress the DECISION */
    const B = g();                                        /* the warehouse HEAD drew */
    for (const i of saved) cells[i].loft = true;          /* restore */

    /* 226: ink per loft — the argmax is where the conversion provably renders */
    const best = { i: -1, ink: -1 };
    for (const i of lofts) {
      const x = i % G, y = (i / G) | 0;
      const [wx, wy] = ctr(x, y);
      const sx = (wx * scale + offX) * dpr, sy = (wy * scale + offY) * dpr;
      const R = 40 * dpr;
      let ink = 0;
      for (let py = Math.max(0, sy - R * 2); py < Math.min(cvs.height, sy + R); py++)
        for (let px2 = Math.max(0, sx - R); px2 < Math.min(cvs.width, sx + R); px2++) {
          const k = ((py | 0) * cvs.width + (px2 | 0)) * 4;
          ink += Math.abs(A[k] - B[k]) + Math.abs(A[k + 1] - B[k + 1]) + Math.abs(A[k + 2] - B[k + 2]);
        }
      if (ink > best.ink) { best.ink = ink; best.i = i; }
    }
    return { lofts: lofts.length, works, i: best.i, ink: best.ink, dayPin, nightPin };
  }, seed);

  for (const [token, state] of Object.entries(tokens)) {
    for (const view of ['city', 'day', 'night']) {
      const name = `s${seed}-${token}-${view}.png`;
      const st = await p.evaluate(({ seed, state, view, aim }) => {
        playing = false;
        genWorld(seed); __warp(61);
        __setTime(view === 'night' ? aim.nightPin : aim.dayPin);
        if (state === 'works') for (const i of HEXI) cells[i].loft = false;
        const lofts = HEXI.filter(i => cells[i].t === T.IND && cells[i].loft).length;
        const works = HEXI.filter(i => cells[i].t === T.IND && !cells[i].loft).length;
        const x = aim.i % G, y = (aim.i / G) | 0;
        const c = cells[aim.i];
        const [wx, wy] = ctr(x, y);
        scale = FIT[0]; offX = FIT[1]; offY = FIT[2];
        if (view !== 'city') { const z = 4.5;
          scale = z; offX = innerWidth / 2 - wx * z; offY = innerHeight / 2 - wy * z; }
        lastSky = 0; syncSky(performance.now()); syncStats();   /* 204 */
        render();
        /* 258: prove the HOST is in the frame — say what is standing at the centre */
        const at = c.t !== T.IND ? 'NOT INDUSTRIAL(!)' : c.loft ? 'LOFT (brick, glass, sign)'
                                                                : 'WAREHOUSE (sawtooth)';
        return { lofts, works, x, y, at, LITAMT };
      }, { seed, state, view, aim });
      await p.screenshot({ path: join(OUT, name) });        /* 200: DOM-composited */
      console.log(`${name.padEnd(30)} ${String(st.lofts).padStart(4)}   ${String(st.works).padStart(4)}` +
        `   (${String(st.x).padStart(2)},${String(st.y).padStart(2)})   ${st.at.padEnd(24)}` +
        ` ${String(aim.ink).padStart(8)}  ${st.LITAMT.toFixed(2)}`);
    }
  }
  await p.close();
}
await br.close();
console.log(`\nframes -> ${OUT}\n`);
