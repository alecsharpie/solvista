#!/usr/bin/env node
/* shot-concert.mjs — the camera for iter 250 (the bowl keeps a concert season).
 *
 * Pins the SEASON at the DUSK SHOWTIME hour. The hour is not guessed (202): CIVHRS
 * .amphitheater === 0 means so = 1 - nightDeep(), so the show runs at dusk and dies by
 * deep night — probe-concert Part 0 takes dayT=0.70 off the artifact's own light curve.
 *
 * Freezes the world in-page (playing=false stops BOTH clocks — `?year=` DRIFTS ~0.167 yr/s
 * while shoot.mjs waits, which is a whole season, iters 139/202), forces the HUD (204),
 * and shoots with page.screenshot so the DOM is composited (200).
 *
 * FRAMES ARE NAMED BY FILE, NEVER BY A LETTER (239): an A/B letter is a pointer the agent
 * must carry across four images, and pointers get swapped. Each frame self-reports its own
 * state in the VIEWER's units (236) — cs, and the objects the bowl actually DREW.
 *
 *   node shot-concert.mjs <seed> <outdir>
 */
import { homedir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execSync } from 'node:child_process';
import { writeFileSync, mkdirSync, unlinkSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = [join(HERE, '../../../../solvista.html'), join(HERE, 'solvista.html')]
  .find(p => { try { execSync(`test -f "${p}"`); return true; } catch { return false; } });
const REPO = dirname(ART);

const SEED = +(process.argv[2] || 42);
const OUT = process.argv[3] || join(REPO, 'shots/concert');
mkdirSync(OUT, { recursive: true });

const HEADF = join(REPO, '.concertshot-head.html');
writeFileSync(HEADF, execSync(`git -C "${REPO}" show HEAD:solvista.html`, { maxBuffer: 1 << 28 }));

const TSHOW = 0.70;                                  /* dusk — from the light curve, not intuition */
const SEASONS = [['winter', 2035.02], ['drypeak', 2035.62]];
const browser = await chromium.launch();

async function open(file) {
  const p = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await p.addInitScript(() => {
    let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  });
  /* count what the bowl actually draws, so every frame can self-report it (236) */
  await p.addInitScript(() => {
    window.__cc = { singer: 0, speck: 0 };
    window.__ccReset = () => { window.__cc.singer = 0; window.__cc.speck = 0; };
    const P = CanvasRenderingContext2D.prototype;
    const arc = P.arc, fillRect = P.fillRect;
    P.arc = function (x, y, r, ...a) { if (Math.abs(r - 0.68) < 1e-9) window.__cc.singer++; return arc.call(this, x, y, r, ...a); };
    P.fillRect = function (x, y, w, h) { if (w === 1.2 && h === 1.2) window.__cc.speck++; return fillRect.call(this, x, y, w, h); };
  });
  await p.goto(pathToFileURL(file).href);
  await p.waitForFunction(() => typeof genWorld === 'function');
  await p.evaluate(() => { window.FIT = [scale, offX, offY]; });
  return p;
}

/* the bowl is world data and this change does not move it, so both builds frame the
   identical hex (201: aim at the feature, never at a rectangle — the city is procedural) */
const findBowl = (p) => p.evaluate(([seed, warp]) => {
  playing = false; genWorld(seed); __warp(warp);
  for (let i = 0; i < G * G; i++) {
    const c = cells[i];
    if (c && c.t === T.CIVIC && c.kind === 'amphitheater') {
      const x = i % G, y = (i / G) | 0, [wx, wy] = ctr(x, y);
      return { x, y, wx, wy };
    }
  }
  return null;
}, [SEED, 61]);

const shoot = async (p, tag) => {
  const aim = await findBowl(p);
  if (!aim) { console.log(`${tag}: NO AMPHITHEATER on this seed`); return; }
  console.log(`\n${tag}: bowl at hex (${aim.x},${aim.y})`);
  const { wx, wy } = aim;
  for (const [sn, yr] of SEASONS) {
    for (const [zn, zoom] of [['close', 6.5], ['city', 0]]) {
      const st = await p.evaluate(([seed, warp, yr, t, zoom, wx, wy]) => {
        playing = false; genWorld(seed); __warp(warp);
        STARS.length = 0; flock = null;
        time = 1234.5; waveT = 567.8;
        __setYear(yr);            /* AFTER warp — warp advances `year` */
        __setTime(t);
        scale = FIT[0]; offX = FIT[1]; offY = FIT[2];
        if (zoom) { scale = zoom; offX = innerWidth / 2 - wx * zoom; offY = innerHeight / 2 - wy * zoom; }
        lastSky = 0; syncSky(performance.now()); syncStats();
        window.__ccReset(); render();
        const so = civOpen('amphitheater');
        const cs = (typeof concertSeason === 'function') ? concertSeason() : 1;
        return { dayT: +dayT.toFixed(2), lit: +LITAMT.toFixed(2), yr: +year.toFixed(2),
                 so: +so.toFixed(2), cs: +cs.toFixed(2), show: +(so * cs).toFixed(2),
                 singer: window.__cc.singer, speck: window.__cc.speck };
      }, [SEED, 61, yr, TSHOW, zoom, wx, wy]);
      const name = `${tag}-${sn}-${zn}.png`;
      await p.screenshot({ path: join(OUT, name) });     /* 200: DOM-composited */
      console.log(`  ${name.padEnd(28)} year=${st.yr} dayT=${st.dayT} LITAMT=${st.lit} | ` +
                  `so=${st.so} concertSeason=${st.cs} SHOW=${st.show} => drew ${st.singer} singer, ${st.speck} specks`);
    }
  }
};

const pPatch = await open(ART);
await shoot(pPatch, 'patch');
const pHead = await open(HEADF);
await shoot(pHead, 'head');

await browser.close();
unlinkSync(HEADF);
console.log(`\nwrote ${OUT}`);
