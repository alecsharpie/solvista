#!/usr/bin/env node
/* shot-nightsand.mjs — the visual gate for iter 214 (the moonlit waterline).
 *
 * Shoots, per seed: the whole city at night (the cumulative read — has the coast
 * stopped being a void?), a coast close-up at night AIMED at the longest run of
 * sea-facing beach (201: a fixed clip is not a framing — the coastline moves seed
 * to seed, and `shoot.config.json`'s `coast` rect landed on open water on seed 7),
 * and the SAME coast close-up by day, which is the control: the change is gated off
 * below LITAMT 0.35, so the day frame must be indistinguishable from HEAD.
 *
 * Clock frozen in-page exactly as shot-stepback does (202): playing=false stops both
 * clocks, pins come after __warp, no wait before the shot (a wait is what drifts the
 * pin), and syncSky/syncStats are FORCED because a frozen clock does not refresh the
 * DOM (204 — syncSky early-returns for 400ms and syncStats only runs while playing,
 * so an unforced freeze gives you a night plate under a daytime sky).
 *
 * Every frame self-reports its own state, so a mis-pinned frame is caught by the
 * tool and not by an agent (202).
 *
 *   node shot-nightsand.mjs <seed> <outdir>
 */
import { homedir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync, mkdirSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = process.env.SRC ? resolve(process.env.SRC) : join(HERE, '../../../../solvista.html');

const seed = +(process.argv[2] || 42);
const outdir = resolve(process.argv[3] || '.');
if (!existsSync(outdir)) mkdirSync(outdir, { recursive: true });

const VW = 1600, VH = 1000, ZOOM = 4.2;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: VW, height: VH }, deviceScaleFactor: 2 });
page.on('pageerror', e => console.error('PAGE ERROR:', e.message));

/* whole-city night · coast night · coast day (control) */
const FRAMES = [
  { name: 'city-night', t: 0.92, zoom: false },
  { name: 'coast-night', t: 0.92, zoom: true },
  { name: 'coast-day', t: 0.30, zoom: true },
];

for (const f of FRAMES) {
  await page.goto(pathToFileURL(ART).href);
  await page.waitForTimeout(400);
  const st = await page.evaluate(({ seed, t, zoom, VW, VH, ZOOM }) => {
    playing = false;
    genWorld(seed);
    __warp(61);
    __setTime(t);
    __setTide(0.35);                    /* mid-ebb: the damp band is open, not swamped */

    let aimed = null;
    if (zoom) {
      /* the longest run of sea-facing beach: the stretch a viewer would call "the
         beach", not one isolated hex. Aim there. */
      const sea = [];
      for (const i of HEXI) {
        const c = cells[i]; if (!c || c.t !== T.BEACH) continue;
        const x = i % G, y = (i / G) | 0;
        let faces = false;
        for (const [dx, dy] of nbrDirs(y)) {
          const e = cellAt(x + dx, y + dy);
          if (e && e.t === T.WATER && !e.riv) { faces = true; break; }
        }
        if (faces) sea.push(ctr(x, y));
      }
      if (!sea.length) return null;
      /* densest cluster of them */
      let best = sea[0], bestN = -1;
      for (const p of sea) {
        let n = 0;
        for (const q of sea) if ((p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 < 140 ** 2) n++;
        if (n > bestN) { bestN = n; best = p; }
      }
      scale = ZOOM;
      offX = VW / 2 - best[0] * scale;
      offY = VH / 2 - best[1] * scale;
      aimed = { n: sea.length, cluster: bestN };
    }
    render();
    lastSky = 0; syncSky(performance.now()); syncStats();   /* 204 */
    render();
    return {
      dayT, LITAMT: +LITAMT.toFixed(2), TIDE: +TIDE.toFixed(2),
      MOONF: +((1 - Math.cos(moonPhase() * 6.2832)) / 2).toFixed(2),
      phase: phaseWord(dayT), aimed,
    };
  }, { seed, t: f.t, zoom: f.zoom, VW, VH, ZOOM });

  if (!st) { console.log(`  ${f.name}: no sea-facing beach on seed ${seed}`); continue; }
  const png = join(outdir, `s${seed}-${f.name}.png`);
  await page.screenshot({ path: png });         /* DOM composited (200) */
  console.log(`  ${f.name.padEnd(11)} t=${st.dayT.toFixed(2)} LITAMT=${String(st.LITAMT).padStart(4)} ` +
    `MOONF=${String(st.MOONF).padStart(4)} (${st.MOONF < 0.15 ? 'NEW ' : st.MOONF > 0.8 ? 'FULL' : 'part'}) ` +
    `TIDE=${st.TIDE} phase=${st.phase.padEnd(11)}` +
    (st.aimed ? ` aim=${st.aimed.cluster}/${st.aimed.n} sea-facing` : ' whole city') + ` -> ${png}`);
}
await browser.close();
