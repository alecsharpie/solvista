#!/usr/bin/env node
/* probe-seam.mjs — cue (v): is the sand<->park boundary still a bare cut? (iter 215)
 *
 * The complaint (both step-back agents, both seeds, iter 214) is: "warm tan meets cool
 * desaturated green with NO TRANSITION, on a bare hex boundary, so the staircase is
 * traceable." That is a claim about COLOUR MIXING ACROSS A BOUNDARY, so measure that
 * and nothing else (214: build the probe in the units of the complaint).
 *
 *   green ink on seam SAND  = px where G > R   (sand is R>G>B, so this can only be marram)
 *   tan ink on seam LAWN    = px where R > G+12 (lawn is G>R, so this can only be blown sand)
 *
 * CONTROLS that must NOT move: sand with no green neighbour, lawn with no sand neighbour.
 * They are the same tiles, drawn by the same code, differing only in whether they are ON
 * the seam — so if they move, the change is not the seam's.
 * FLOOR: HEAD loaded twice, diffed, in the SAME run (213) — a floor pinned from an earlier
 * run drifts with machine load and will fail a passing gate.
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const REPO  = join(HERE, '../../../..');
const PATCH = process.env.PATCH ? resolve(process.env.PATCH) : join(REPO, 'solvista.html');
/* pristine HEAD, extracted beside the artifact — the probe's whole isolation rests on
   the two builds differing ONLY by this iteration's edit (161) */
const HEAD  = resolve(process.env.HEAD_FILE || join(REPO, '.seam-head.html'));
if (!process.env.HEAD_FILE) {
  const { execSync } = await import('node:child_process');
  const { writeFileSync } = await import('node:fs');
  writeFileSync(HEAD, execSync('git show HEAD:solvista.html', { cwd: REPO, maxBuffer: 1 << 28 }));
}
const SEEDS = [7, 42, 1234];

const browser = await chromium.launch();

async function shoot(file, seed, t) {
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  /* stub the PRNG BEFORE the page's own script runs (213) — anything seeded with the
     real Math.random at LOAD is baked in before a page.evaluate can reach it */
  await page.addInitScript(() => { let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
  await page.goto(pathToFileURL(file).href);
  await page.waitForFunction(() => window.__census);
  const out = await page.evaluate(({ sd, tt }) => {
    playing = false;                       /* stops both clocks — but does NOT pin them */
    genWorld(sd); __warp(61);
    STARS.length = 0; flock = null;
    time = 0; waveT = 0;                   /* 195(f): playing=false is not a frozen clock */
    __setTime(tt); __setYear(2035.62);
    lastSky = 0; syncSky(performance.now()); /* 204: syncSky is throttled 400ms */
    render();
    const cvs = document.querySelector('canvas');
    const W = cvs.width, H = cvs.height;
    const img = cvs.getContext('2d').getImageData(0, 0, W, H).data;

    const SAND = new Set([T.BEACH, T.DUNE]);
    const GRN  = new Set([T.SHOREPARK, T.PARK, T.MEADOW]);
    const cls = new Int8Array(W * H);      /* 1 seamSand 2 seamGrn 3 ctrlSand 4 ctrlGrn */
    const dev = (gx, gy) => { const [wx, wy] = px(gx, gy);
      return [(wx * scale + offX) * dpr, (wy * scale + offY) * dpr]; };
    const RX = Math.ceil(CW * scale * dpr * 0.62), RY = Math.ceil(ROWY * scale * dpr * 0.85);

    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cellAt(x, y); if (!c) continue;
      const isS = SAND.has(c.t), isG = GRN.has(c.t);
      if (!isS && !isG) continue;
      const touch = countAround(x, y, 1, n => isS ? GRN.has(n.t) : SAND.has(n.t)) > 0;
      const k = isS ? (touch ? 1 : 3) : (touch ? 2 : 4);
      const [cx, cy] = dev(x + 0.5, y + 0.5);
      /* claim a pixel only if THIS hex centre is the nearest of the seven — exact on a hex grid */
      const nb = nbrDirs(y).map(([dx, dy]) => dev(x + dx + 0.5, y + dy + 0.5));
      for (let py = Math.max(0, (cy - RY) | 0); py < Math.min(H, cy + RY); py++)
        for (let pxx = Math.max(0, (cx - RX) | 0); pxx < Math.min(W, cx + RX); pxx++) {
          const d0 = (pxx - cx) ** 2 + (py - cy) ** 2;
          let mine = true;
          for (const [nx2, ny2] of nb) if ((pxx - nx2) ** 2 + (py - ny2) ** 2 < d0) { mine = false; break; }
          if (mine) cls[py * W + pxx] = k;
        }
    }
    /* cross-boundary mixing, per class */
    const mix = [0, 0, 0, 0, 0], area = [0, 0, 0, 0, 0];
    for (let i = 0; i < W * H; i++) {
      const k = cls[i]; if (!k) continue;
      area[k]++;
      const r = img[i * 4], g = img[i * 4 + 1];
      if (k === 1 || k === 3) { if (g > r) mix[k]++; }        /* green ink on sand */
      else { if (r > g + 12) mix[k]++; }                       /* tan ink on lawn */
    }
    return { W, H, img: Array.from(img), cls: Array.from(cls), mix, area };
  }, { sd: seed, tt: t });
  await page.close();
  return out;
}

const label = ['', 'seam SAND', 'seam LAWN', 'ctrl sand ', 'ctrl lawn '];
console.log('cue (v): the sand<->park seam. mixing = px of the OTHER palette landing on this tile.\n');
for (const t of [0.30, 0.92]) {
  console.log(`--- ${t === 0.30 ? 'DAY  t=0.30' : 'NIGHT t=0.92'} ---`);
  for (const seed of SEEDS) {
    const h1 = await shoot(HEAD, seed, t);
    const h2 = await shoot(HEAD, seed, t);   /* the floor, measured in THIS run (213) */
    const pa = await shoot(PATCH, seed, t);
    const dif = (a, b) => { const d = [0, 0, 0, 0, 0];
      for (let i = 0; i < a.W * a.H; i++) { const k = a.cls[i]; if (!k) continue;
        const m = Math.max(Math.abs(a.img[i*4]-b.img[i*4]), Math.abs(a.img[i*4+1]-b.img[i*4+1]),
                           Math.abs(a.img[i*4+2]-b.img[i*4+2]));
        if (m > 8) d[k]++; }
      return d; };
    const floor = dif(h1, h2), chg = dif(h1, pa);
    console.log(`  seed ${seed}`);
    for (const k of [1, 2, 3, 4]) {
      const per = (v, a) => a ? (1000 * v / a).toFixed(1) : '  - ';
      console.log(`    ${label[k]}  mixing ${String(h1.mix[k]).padStart(5)} -> ${String(pa.mix[k]).padStart(5)} px `
        + `(${per(h1.mix[k], h1.area[k])} -> ${per(pa.mix[k], pa.area[k])} per 1k px)   `
        + `changed ${String(chg[k]).padStart(5)} px  [floor ${floor[k]}]`);
    }
  }
}
await browser.close();
