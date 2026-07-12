#!/usr/bin/env node
/* probe-sandhue.mjs — cue (q), take two: is the night sand the wrong COLOUR?
 *
 * Take one (probe-nightsand) measured within-hex luminance and found the beach's
 * texture collapsing at night. It was true, and fixing it FAILED the eye: a bright
 * per-edge band exposes the hex grid (iter 159), and no amount of it makes sand
 * read as sand. That probe was greyscale, so it was STRUCTURALLY BLIND to the word
 * every agent actually used. Cue (q) says "a low-contrast MAUVE where detail dies";
 * 212's agents said "a flat MAUVE-GREY mass"; and 214's two agents, unprompted and
 * independently, both said the night sand "reads as ASPHALT".
 *
 * That is not a vibe, it is a falsifiable claim in the viewer's units (205), so
 * measure THAT and nothing else:
 *
 *   chroma  = max(RGB) - min(RGB)      how COLOURED is it at all (0 = grey)
 *   hue     = degrees                  40ish = warm sand, 200+ = cool
 *   dBEACH-ROAD = RGB distance between the beach and the ROAD (= asphalt)
 *
 * The claim "the sand reads as asphalt" predicts ONE thing above all: BEACH and
 * ROAD are far apart in colour by day and CLOSE at night. A control that must not
 * move: the day column, which is the same code in both regimes.
 *
 * Freeze per 213 (Math.random stubbed in addInitScript, before the page's script).
 *
 *   node probe-sandhue.mjs
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = process.env.SRC ? resolve(process.env.SRC) : join(HERE, '../../../../solvista.html');

const SEEDS = [7, 42, 1234];
const KINDS = ['BEACH', 'DUNE', 'SHOREPARK', 'PARK', 'FOREST', 'RES', 'ROAD', 'WATER'];
const W = 1600, H = 1000;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H } });
await page.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});

const acc = {};
for (const k of KINDS) acc[k] = { day: [0, 0, 0, 0], night: [0, 0, 0, 0] };

for (const seed of SEEDS) {
  await page.goto(pathToFileURL(SRC).href);
  await page.waitForFunction(() => window.__census !== undefined);
  const r = await page.evaluate(({ seed, kinds }) => {
    playing = false;
    genWorld(seed); window.__warp(61);
    STARS.length = 0; flock = null;
    waveT = 0; time = 0;
    window.__setTide(0.35);
    for (const a of [boats, peds, dogs, birds]) if (Array.isArray(a)) a.length = 0;

    const cvs = document.querySelector('canvas');
    const g = cvs.getContext('2d');
    const D = dpr;
    /* mask to the hex interior at 0.55 — well inside, so no neighbour and no rim
       (196). We want the tile's OWN body colour, not its edges. */
    const inHex = (dx, dy, f) => {
      const hw = HW * f, vr = VR * f, er = ER * f;
      if (Math.abs(dx) > hw || Math.abs(dy) > vr) return false;
      if (Math.abs(dy) <= er) return true;
      return Math.abs(dx) <= hw * (vr - Math.abs(dy)) / (vr - er || 1);
    };
    const meanRGB = (data, kind) => {
      const tv = T[kind];
      let R = 0, Gc = 0, B = 0, n = 0;
      for (const i of HEXI) {
        const c = cells[i]; if (!c || c.t !== tv) continue;
        const x = i % G, y = (i / G) | 0;
        const [wx, wy] = ctr(x, y);
        const sx = (wx * scale + offX) * D, sy = (wy * scale + offY) * D;
        const rx = HW * scale * D, ry = VR * scale * D;
        for (let py = Math.max(0, (sy - ry) | 0); py <= Math.min(cvs.height - 1, sy + ry); py++)
          for (let px2 = Math.max(0, (sx - rx) | 0); px2 <= Math.min(cvs.width - 1, sx + rx); px2++) {
            if (!inHex((px2 - sx) / (scale * D), (py - sy) / (scale * D), 0.55)) continue;
            const o = (py * cvs.width + px2) * 4;
            R += data[o]; Gc += data[o + 1]; B += data[o + 2]; n++;
          }
      }
      return n ? [R / n, Gc / n, B / n, n] : null;
    };
    const out = {};
    for (const [L, t] of [['day', 0.30], ['night', 0.92]]) {
      dayT = t; render();
      const d = g.getImageData(0, 0, cvs.width, cvs.height).data;
      out[L] = {};
      for (const k of kinds) out[L][k] = meanRGB(d, k);
    }
    return out;
  }, { seed, kinds: KINDS });

  for (const k of KINDS) for (const L of ['day', 'night'])
    if (r[L][k]) for (let i = 0; i < 4; i++) acc[k][L][i] += r[L][k][i] / SEEDS.length;
}
await browser.close();

const chroma = ([r, g, b]) => Math.max(r, g, b) - Math.min(r, g, b);
const hue = ([r, g, b]) => {
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), c = mx - mn;
  if (c < 0.5) return NaN;
  let h;
  if (mx === r) h = ((g - b) / c) % 6; else if (mx === g) h = (b - r) / c + 2; else h = (r - g) / c + 4;
  return ((h * 60) % 360 + 360) % 360;
};
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const fmt = v => (Number.isNaN(v) ? ' --' : v.toFixed(0).padStart(3));

console.log('mean tile-body colour, 3 seeds (mask 0.55 of the hex — the tile\'s own body)\n');
console.log('kind         |  DAY   R   G   B  chroma  hue |  NIGHT  R   G   B  chroma  hue');
for (const k of KINDS) {
  const d = acc[k].day, n = acc[k].night;
  console.log(`${k.padEnd(12)} | ${d.slice(0, 3).map(v => String(Math.round(v)).padStart(5)).join('')}` +
    `  ${fmt(chroma(d)).padStart(5)}  ${fmt(hue(d))} | ` +
    `${n.slice(0, 3).map(v => String(Math.round(v)).padStart(5)).join('')}  ${fmt(chroma(n)).padStart(5)}  ${fmt(hue(n))}`);
}

console.log('\nTHE CLAIM: "the night sand reads as ASPHALT". So: how far is BEACH from ROAD?');
console.log('pair                 |   DAY |  NIGHT');
for (const [a, b] of [['BEACH', 'ROAD'], ['BEACH', 'PARK'], ['BEACH', 'RES'], ['DUNE', 'ROAD'], ['PARK', 'ROAD']]) {
  const dd = dist(acc[a].day, acc[b].day), dn = dist(acc[a].night, acc[b].night);
  const tag = (a === 'BEACH' && b === 'ROAD') ? '   <-- the claim' : '';
  console.log(`${(a + ' <-> ' + b).padEnd(20)} | ${dd.toFixed(0).padStart(5)} | ${dn.toFixed(0).padStart(6)}${tag}`);
}
console.log('\n(chroma 0 = pure grey. sand base [238,220,178] is chroma 60, hue ~41 — warm.)');
