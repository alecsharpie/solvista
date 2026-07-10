#!/usr/bin/env node
/* probe-moon.mjs — does the drawn moon actually follow its calendar? (iter 126)
 *
 * Iter 126 gave the moon a synodic phase driven by `year`, and dimmed the
 * moonglade with the lit fraction. The census is vacuous for a draw-only change
 * (every metric +0), so the claim rests here: the number of BRIGHT pixels in the
 * moon disc must track `__moon().illum`, and a land patch must NOT move as the
 * phase sweeps (only the moon and its glade may change).
 *
 * Method: freeze the clock (playing=false, iter 109's same-frame law), pin the
 * night (t=0.90, LITAMT=1), then step `year` across one full lunation. At each
 * step read the ground-truth `illum` from the hook and count lit pixels in the
 * moon box from the RENDERED canvas — different code than computes the phase.
 *
 *   node probe-moon.mjs
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(join(HERE, '../../../../solvista.html')).href;

const SEEDS = [42, 7];
const LUN = 1 / 12.3685;               /* one synodic month, in years */
const STEPS = 8;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });

const corr = (a, c) => {
  const n = a.length, ma = a.reduce((x, y) => x + y) / n, mc = c.reduce((x, y) => x + y) / n;
  let s = 0, sa = 0, sc = 0;
  for (let i = 0; i < n; i++) { const da = a[i] - ma, dc = c[i] - mc; s += da * dc; sa += da * da; sc += dc * dc; }
  return s / Math.sqrt(sa * sc || 1);
};

for (const seed of SEEDS) {
  await p.goto(`${PAGE}?seed=${seed}&warp=61&t=0.90`);
  await p.waitForTimeout(500);

  const res = await p.evaluate(({ LUN, STEPS }) => {
    playing = false;
    const dpr = cvs.width / cvs.clientWidth;
    /* moon box, in device px (moon drawn at 0.80,0.15 in CSS px, r=11) */
    const mx = 0.80 * innerWidth * dpr, my = 0.15 * innerHeight * dpr, R = 16 * dpr;
    const bx = Math.round(mx - R), by = Math.round(my - R), bs = Math.round(R * 2);
    /* a land control patch near the city core (not sea, not moon) */
    const lx = Math.round(0.30 * innerWidth * dpr), ly = Math.round(0.60 * innerHeight * dpr), ls = Math.round(60 * dpr);

    const litCount = () => {
      const d = ctx.getImageData(bx, by, bs, bs).data;
      let n = 0;
      for (let i = 0; i < d.length; i += 4) {
        /* canvas is transparent-black behind the moon, so composite over black:
           the visible luminance is RGB*alpha (the faint glow is a bright colour
           at low alpha and must NOT count as lit) */
        const lum = (0.3 * d[i] + 0.59 * d[i + 1] + 0.11 * d[i + 2]) * (d[i + 3] / 255);
        if (lum > 120) n++;              /* lit lune ~228; dark limb ~34; glow ~36 */
      }
      return n;
    };
    const landLum = () => {
      const d = ctx.getImageData(lx, ly, ls, ls).data;
      let s = 0, n = 0;
      for (let i = 0; i < d.length; i += 4) { s += 0.3 * d[i] + 0.59 * d[i + 1] + 0.11 * d[i + 2]; n++; }
      return s / n;
    };

    const base = 2035.0;
    const rows = [];
    for (let k = 0; k < STEPS; k++) {
      window.__setYear(base + (k / STEPS) * LUN);
      render();
      const m = window.__moon();
      rows.push({ phase: m.phase, illum: m.illum, lit: litCount(), land: landLum() });
    }
    return rows;
  }, { LUN, STEPS });

  const illum = res.map(r => r.illum), lit = res.map(r => r.lit), land = res.map(r => r.land);
  const c = corr(illum, lit);
  const landMean = land.reduce((a, x) => a + x) / land.length;
  const landDev = Math.max(...land.map(x => Math.abs(x - landMean)));
  const litNew = Math.min(...lit), litFull = Math.max(...lit);

  console.log(`\nseed ${seed} — moon over one lunation (clock frozen, t=0.90 night)`);
  console.log('  phase   illum   lit px   land lum');
  for (const r of res)
    console.log(`  ${r.phase.toFixed(3)}   ${r.illum.toFixed(3)}   ${String(r.lit).padStart(6)}   ${r.land.toFixed(1)}`);
  console.log(`  corr(illum, lit px) = ${c.toFixed(3)}   [want ~+1]`);
  console.log(`  lit px  new→full: ${litNew} → ${litFull}   [new ~0]`);
  console.log(`  land control: mean ${landMean.toFixed(1)}, max dev ${landDev.toFixed(2)}   [want ~0]`);
}
await b.close();
