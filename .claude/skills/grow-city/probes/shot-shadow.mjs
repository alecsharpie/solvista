#!/usr/bin/env node
/* ITER 225 — the shadow camera.
 *
 * Freezes the world in-page (playing=false stops BOTH clocks), pins genWorld +
 * __warp + __setYear + __setTime, forces syncSky/syncStats (which a frozen clock
 * otherwise leaves stale -- iter 204), renders once with NO wait (a wait is exactly
 * what drifts the pin -- iters 139/202), and shoots with page.screenshot() so the
 * DOM is composited (iter 200).
 *
 * Two framings per hour:
 *   wide  -- the whole city, un-zoomed: has anything compounded into clutter/darkness?
 *   close -- zoom x3 on the densest tree+crowd ground, where a shadow is ~9px and
 *            legible. Iter 159: judge a subtle ornament at the zoom a user actually
 *            looks at it, not at fit (invisible) nor at an extreme (unfair).
 *
 * The close frames are the LOCATE test: morning and evening are the same city at the
 * same camera, and the ONLY thing that differs is where the sun is. Shadow direction
 * is LEFT/RIGHT, which the projection preserves (iter 224 -- screen-y is depth, but
 * sx survives), so "which way do the shadows fall?" is a fair question to ask blind.
 *
 *   node shot-shadow.mjs <seed> <outdir>
 */
import { homedir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync, mkdirSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const CAND = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html')];
const ART = CAND.find(f => existsSync(f));

const seed = parseInt(process.argv[2] || '42', 10);
const outdir = resolve(process.argv[3] || join(HERE, '../shots/shadow'));
mkdirSync(outdir, { recursive: true });

/* hours off the light curve: sunP=(dayT-.05)/(.78-.05) */
const FRAMES = [
  { name: 'morning', t: 0.16 },   /* sun low RIGHT -> shadows must fall LEFT  */
  { name: 'noon',    t: 0.415 },  /* sun high, centred -> shadows tuck under  */
  { name: 'evening', t: 0.68 },   /* sun low LEFT  -> shadows must fall RIGHT */
  { name: 'night',   t: 0.92 },   /* no sun -> soft ambient contact patch     */
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 });
page.on('pageerror', e => console.error('PAGE ERROR:', e.message));

for (const f of FRAMES) {
  for (const kind of ['wide', 'close']) {
    await page.goto(pathToFileURL(ART).href);
    await page.waitForTimeout(500);
    const st = await page.evaluate(({ seed, t, kind }) => {
      playing = false;
      genWorld(seed); __warp(61); __setYear(2035.62); __setTime(t);
      time = 0; waveT = 0;
      if (kind === 'close') {
        /* aim at the densest ground where things CAST: trees + peds + cars. Pick the
           hex with the most tree-bearing / standable neighbours, deterministic per
           seed, so every hour frames the IDENTICAL patch and only the light moves. */
        const CASTS = new Set([T.FOREST, T.REDWOOD, T.PARK, T.SHOREPARK, T.QUAD]);
        let best = null, bs = -1;
        for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
          const c = cellAt(x, y);
          if (!c || !CASTS.has(c.t)) continue;
          let s = 0;
          for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
            const n = cellAt(x + dx, y + dy);
            if (n && CASTS.has(n.t)) s++;
          }
          if (s > bs) { bs = s; best = [x, y]; }
        }
        if (best) {
          const [bx, by] = ctr(best[0], best[1]);
          scale *= 3;
          offX = innerWidth / 2 - bx * scale;
          offY = innerHeight / 2 - by * scale;
        }
      }
      lastSky = 0; syncSky(performance.now()); syncStats();   /* a frozen clock leaves these stale (204) */
      render();
      return { dayT, LITAMT: +LITAMT.toFixed(2), phase: phaseWord(dayT),
               SHOFF: +SHOFF.toFixed(2), SHLEN: +SHLEN.toFixed(2), SHAMT: +SHAMT.toFixed(2),
               sunUp: dayT >= SUNUP && dayT <= SUNDN };
    }, { seed, t: f.t, kind });
    const png = join(outdir, `s${seed}-${f.name}-${kind}.png`);
    await page.screenshot({ path: png });
    console.log(`  ${(f.name + '/' + kind).padEnd(15)} t=${st.dayT.toFixed(2)} ${st.phase.padEnd(11)} ` +
      `sun=${st.sunUp ? 'UP  ' : 'down'} SHOFF=${String(st.SHOFF).padStart(5)} ` +
      `SHLEN=${st.SHLEN} SHAMT=${st.SHAMT} -> ${png}`);
  }
}
await browser.close();
