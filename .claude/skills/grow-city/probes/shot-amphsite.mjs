#!/usr/bin/env node
/* shot-amphsite.mjs — the amphitheater camera (iter 231, cue (t)).
 *
 * AIMS at the bowl rather than guessing a rectangle (201): the city is procedural, the
 * bowl moves seed to seed, and a fixed clip would land on open water half the time.
 * Each build is aimed at ITS OWN bowl — the claim is "look where this city put its
 * amphitheater", so framing HEAD's frame on the patch's hex would prove nothing.
 *
 * Freezes in-page (playing=false stops BOTH clocks), forces syncSky/syncStats (204, or the
 * HUD reports the load-time state over a frozen frame), and every frame self-reports (202).
 *
 * node shot-amphsite.mjs <seed> <outdir> [SRC=<build>]
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const seed = process.argv[2] || '42';
const outdir = resolve(process.argv[3] || './shots/amph');
const SRC = process.env.SRC ? resolve(process.env.SRC) : join(HERE, '../../../../solvista.html');
const PAGE = pathToFileURL(SRC).href;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });

for (const [tag, t] of [['day', 0.30], ['night', 0.92]]) {
  for (const [zt, zoom] of [['city', 0], ['bowl', 4.2]]) {
    await p.goto(PAGE);
    await p.waitForTimeout(350);
    const gt = await p.evaluate(({ t, seed, zoom }) => {
      playing = false;
      genWorld(+seed); __warp(61);
      __setTime(t); __setYear(2035.62);
      let ax = -1, ay = -1;
      for (let i = 0; i < G * G; i++) {
        const c = cells[i];
        if (c && c.t === T.CIVIC && c.kind === 'amphitheater') { ax = i % G; ay = (i / G) | 0; break; }
      }
      if (zoom && ax >= 0) {
        const [wx, wy] = ctr(ax, ay);
        scale = zoom;
        offX = innerWidth / 2 - wx * scale;
        offY = innerHeight / 2 - wy * scale;
      }
      lastSky = 0; syncSky(performance.now()); syncStats();
      render();
      /* what is standing in the two rows in front of it, and how tall */
      const front = [[0, 1], [-1, 1], [1, 1], [0, 2], [-1, 2], [1, 2]].map(([dx, dy]) => {
        const c = cellAt(ax + dx, ay + dy);
        if (!c) return 'void';
        const n = Object.keys(T).find(k => T[k] === c.t);
        return n + (c.th ? ':' + c.th.toFixed(0) : '');
      });
      /* groundLoad does not exist on HEAD — this script must run on both builds */
      return { ax, ay, front, gl: (ax >= 0 && typeof groundLoad === 'function') ? groundLoad(ax, ay) : -1,
        dist: ax >= 0 ? hexDist(ax, ay, CBDX, CBDY) : -1,
        dayT: +dayT.toFixed(3), phase: phaseWord(dayT), lit: +LITAMT.toFixed(2) };
    }, { t, seed, zoom });
    await p.screenshot({ path: join(outdir, `${tag}-${zt}.png`) });
    console.log(`seed ${seed} ${tag}/${zt}: bowl=(${gt.ax},${gt.ay}) dist=${gt.dist} groundLoad=${gt.gl}` +
      ` | dayT=${gt.dayT} phase=${gt.phase} LITAMT=${gt.lit}\n    front: ${gt.front.join(' ')}`);
  }
}
await b.close();
