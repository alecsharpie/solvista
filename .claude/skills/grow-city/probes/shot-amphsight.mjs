#!/usr/bin/env node
/* shot-amphface.mjs — the camera for iter 244 (the bowl faces its view).
 *
 * Aims at the amphitheater itself (201: a fixed clip is not a framing — the city is
 * procedural and the bowl moves seed to seed). Freezes the world in-page, forces the
 * HUD (204), and hands the SAME aim to the HEAD build so the before/after pair frames
 * the identical hex and is genuinely blind.
 *
 * Every frame self-reports its own state, in the VIEWER's units (202/236).
 *
 *   node shot-amphface.mjs <seed> <outdir>
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
const OUT = process.argv[3] || join(REPO, 'shots/amph');
mkdirSync(OUT, { recursive: true });

const HEAD = join(REPO, '.amphshot-head.html');
writeFileSync(HEAD, execSync(`git -C "${REPO}" show HEAD:solvista.html`, { maxBuffer: 1 << 28 }));

const HOURS = [['day', 0.30], ['night', 0.92]];
const browser = await chromium.launch();

async function open(file) {
  const p = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await p.addInitScript(() => {
    let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  });
  await p.goto(pathToFileURL(file).href);
  await p.waitForFunction(() => typeof genWorld === 'function');
  await p.evaluate(() => { window.FIT = [scale, offX, offY]; });
  return p;
}

/* EACH BUILD AIMS AT ITS OWN BOWL. The whole point of the change is that the bowl may be
   sited somewhere else, so forcing HEAD to the patch's hex would frame bare ground and
   prove nothing (201: aim at the feature, not at a rectangle). */
const findBowl = (p) => p.evaluate(([seed, warp]) => {
  playing = false; genWorld(seed); __warp(warp);
  let ai = -1;
  for (let i = 0; i < G * G; i++) { const c = cells[i]; if (c && c.t === T.CIVIC && c.kind === 'amphitheater') { ai = i; break; } }
  if (ai < 0) return null;
  const x = ai % G, y = (ai / G) | 0, [wx, wy] = ctr(x, y);
  /* HEAD has no amphSight/amphView — describe it the same way regardless, by hand */
  const RAYS = [[(x, y) => [x + ((y & 1) ? 1 : 0), y - 1]], [(x, y) => [x - ((y & 1) ? 0 : 1), y - 1]]];
  let green = false, water = false;
  for (const [step] of RAYS) {
    let px = x, py = y;
    for (let k = 1; k <= 5; k++) {
      [px, py] = step(px, py);
      const q = cellAt(px, py); if (!q || q.t === T.VOID) break;
      if (WETSET.has(q.t)) water = true;
      if (q.t === T.PARK || q.t === T.SHOREPARK || q.t === T.PLAZA || q.t === T.FOREST || q.t === T.REDWOOD || q.t === T.GARDEN || q.t === T.QUAD) green = true;
    }
  }
  return { x, y, wx, wy, view: water ? 'the water' : green ? 'the parkland' : 'the rooftops', gl: +groundLoad(x, y).toFixed(0) };
}, [SEED, 61]);

const shoot = async (p, tag) => {
  const aim = await findBowl(p);
  if (!aim) { console.log(`${tag}: no amphitheater`); return; }
  console.log(`${tag}: bowl at (${aim.x},${aim.y}) — looks out at ${aim.view.toUpperCase()} (groundLoad ${aim.gl})`);
  const { wx, wy } = aim;
  for (const [hn, t] of HOURS) {
    for (const [zn, zoom] of [['city', 0], ['close', 6.0]]) {
      const state = await p.evaluate(([seed, warp, t, zoom, wx, wy]) => {
        playing = false; genWorld(seed); __warp(warp);
        STARS.length = 0; flock = null;
        time = 1234.5; waveT = 567.8;
        __setTime(t);
        scale = FIT[0]; offX = FIT[1]; offY = FIT[2];
        if (zoom) { scale = zoom; offX = innerWidth / 2 - wx * zoom; offY = innerHeight / 2 - wy * zoom; }
        lastSky = 0; syncSky(performance.now()); syncStats();
        render();
        return { dayT: +dayT.toFixed(3), lit: +LITAMT.toFixed(2), phase: phaseWord(dayT) };
      }, [SEED, 61, t, zoom, wx, wy]);
      const name = `${tag}-${hn}-${zn}.png`;
      await p.screenshot({ path: join(OUT, name) });     /* 200: DOM-composited */
      console.log(`  ${name.padEnd(24)} dayT=${state.dayT} LITAMT=${state.lit} phase=${state.phase}`);
    }
  }
};

const pPatch = await open(ART);
await shoot(pPatch, 'patch');
const pHead = await open(HEAD);
await shoot(pHead, 'head');

await browser.close();
unlinkSync(HEAD);
console.log(`\nwrote ${OUT}`);
