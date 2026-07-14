#!/usr/bin/env node
/* shot-kidbed.mjs — the camera for the child's bedtime (iter 262).
 *
 * THE DISCRIMINATING FRAME IS AN EVENING PIN. HEAD hides every child in the city at
 * nightAmt 0.009 (the first dark frame), so at nightAmt ~0.20 HEAD has NO children out
 * and the patch still has several. That is a COUNT, not a judgement (108) — a blind
 * agent can be asked to count children and its answer is checkable against ground truth
 * this script already holds.
 *
 * ⚠ 258'S LAW: when the expected result is an ABSENCE, a frame with the SUBJECT MISSING
 * reads exactly like a frame where the subject correctly shows nothing. "No children in
 * the HEAD frame" and "no PEOPLE in the HEAD frame" are the same picture. So every frame
 * SELF-REPORTS its host's presence — adults drawn AND children drawn — and the DAY
 * close-up is shot as the REQUIRED POSITIVE TWIN: by day nightAmt() is 0, so BOTH builds
 * must show the child, standing beside the same parent, in the same hex. An agent that
 * cannot see the child in the day frame has found a broken camera, not a working feature.
 *
 * ⚠ AIMED BY MEASURED INK (226), NOT BY A PREDICATE. A child is a ~2px figure; at fit
 * zoom nobody can count them. The aim is the argmax of the CHILDREN'S OWN INK: render the
 * frozen world twice in ONE page, once with every `kid` cleared (230 — suppress the
 * DECISION, not the build), and the changed pixels ARE the children, at a floor of exactly
 * 0. The parent with the most child-ink in the frame is the one we point at.
 *
 * ⚠ The aim is then FORCED onto the HEAD build (AIM=wx,wy), so both builds frame the
 * IDENTICAL hex and the pair is blind. That is sound here because the probe proved the two
 * builds share a byte-identical Math.random stream: same residents, same children, same
 * hours. Frames are named BY FILE, never by a letter (239).
 */
import { existsSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = existsSync(join(HERE, 'solvista.html')) ? join(HERE, 'solvista.html')
                                                     : join(HERE, '../../../../solvista.html');
const SRC = process.env.SRC || ROOT;
const TAG = process.env.TAG || 'patch';
const AIM = process.env.AIM ? process.env.AIM.split(',').map(Number) : null;
const SEED = Number(process.argv[2] || 42);
const OUT = process.argv[3] || '.claude/skills/grow-city/shots/kidbed';
const WARP = 61, ZOOM = 5.0, DAYT = 0.415;
mkdirSync(OUT, { recursive: true });

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2 });
await p.addInitScript(() => {                       /* 213 — same stream on both builds */
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await p.goto(pathToFileURL(SRC).href);
await p.waitForFunction(() => typeof window.__warp === 'function');

/* freeze the world, then find the evening pin: the dayT where nightAmt() first clears 0.20 */
const setup = await p.evaluate(({ seed, warp }) => {
  playing = false;
  genWorld(seed); __warp(warp);
  const pin = t => { __setTime(t); render(); };
  let eve = null;
  for (let t = 0.50; t < 1.0; t += 0.001) { pin(t); if (nightAmt() > 0.20) { eve = t; break; } }
  return { eve, year };
}, { seed: SEED, warp: WARP });

/* the aim: argmax of the CHILDREN'S OWN ink, measured by suppressing them in one page */
const aim = AIM || await p.evaluate(({ eve }) => {
  __setTime(eve); render();
  const g = () => { const c = document.querySelector('canvas'); return c.getContext('2d').getImageData(0, 0, c.width, c.height).data; };
  const A = g();
  const keep = peds.map(q => q.kid);
  peds.forEach(q => { q.kid = 0; }); render();            /* 230: suppress the DECISION */
  const B = g();
  peds.forEach((q, i) => { q.kid = keep[i]; }); render();

  const c = document.querySelector('canvas');
  const dpr = c.width / innerWidth;
  let best = null, bestInk = -1;
  for (const q of peds) {
    if (!q.kid || q._sx === undefined) continue;
    const sx = (q._sx * scale + offX) * dpr, sy = (q._sy * scale + offY) * dpr;
    let ink = 0;
    for (let y = Math.max(0, sy - 22 | 0); y < Math.min(c.height, sy + 8); y++)
      for (let x = Math.max(0, sx - 8 | 0); x < Math.min(c.width, sx + 26); x++) {
        const i = (y * c.width + x) * 4;
        ink += Math.abs(A[i] - B[i]) + Math.abs(A[i + 1] - B[i + 1]) + Math.abs(A[i + 2] - B[i + 2]);
      }
    if (ink > bestInk) { bestInk = ink; best = q; }
  }
  return best ? [best._sx, best._sy] : [0, 0];
}, { eve: setup.eve });

const shoot = async (name, t) => {
  const st = await p.evaluate(({ t, aim, zoom }) => {
    __setTime(t);
    scale = fitScale * zoom;
    offX = innerWidth / 2 - aim[0] * scale;
    offY = innerHeight / 2 - aim[1] * scale;
    render();
    lastSky = 0; syncSky(performance.now()); syncStats();     /* 204 — the DOM is not live */
    const hasNew = typeof kidHidden === 'function';
    const kidOn = q => hasNew ? !kidHidden(q) : LITAMT < 0.5;
    const adults = peds.filter(q => !pedHidden(q)).length;
    const kids = peds.filter(q => q.kid && !pedHidden(q) && kidOn(q)).length;
    const tot = peds.filter(q => q.kid).length;
    return { dayT, nightAmt: +nightAmt().toFixed(3), adults, kids, tot };
  }, { t, aim, zoom: ZOOM });
  const f = join(OUT, `${TAG}_${name}.png`);
  await p.screenshot({ path: f });                            /* 200 — DOM composited */
  console.log(`  ${f}\n     dayT=${st.dayT.toFixed(3)} nightAmt=${st.nightAmt} · ADULTS drawn ${st.adults} · CHILDREN drawn ${st.kids}/${st.tot}`);
};

const wide = async (name, t) => {
  const st = await p.evaluate(({ t }) => {
    __setTime(t); zoom = 1; scale = fitScale; offX = fitX; offY = fitY; render();
    lastSky = 0; syncSky(performance.now()); syncStats();
    const hasNew = typeof kidHidden === 'function';
    const kidOn = q => hasNew ? !kidHidden(q) : LITAMT < 0.5;
    const kids = peds.filter(q => q.kid && !pedHidden(q) && kidOn(q)).length;
    return { dayT, nightAmt: +nightAmt().toFixed(3), kids, tot: peds.filter(q => q.kid).length };
  }, { t });
  const f = join(OUT, `${TAG}_${name}.png`);
  await p.screenshot({ path: f });
  console.log(`  ${f}\n     dayT=${st.dayT.toFixed(3)} nightAmt=${st.nightAmt} · CHILDREN drawn ${st.kids}/${st.tot} (un-zoomed whole city)`);
};

console.log(`\n${SRC}  [${TAG}]  seed ${SEED} · evening pin dayT=${setup.eve.toFixed(3)} · aim ${aim.map(v => v.toFixed(1))}`);
await shoot('eve_close', setup.eve);     /* the discriminator: HEAD has no child here     */
await shoot('day_close', DAYT);          /* the POSITIVE TWIN: both builds MUST show one  */
await wide('eve_city', setup.eve);       /* the whole frame, un-zoomed                    */
await b.close();
