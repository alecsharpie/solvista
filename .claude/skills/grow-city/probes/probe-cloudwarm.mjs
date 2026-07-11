#!/usr/bin/env node
/* probe-cloudwarm.mjs — do cloud BELLIES catch the warm horizon at golden hour,
 * and only the bellies, and only at golden hour? (Iter 161, Sky × Deepen.)
 *
 * The change tints the two lower ("belly") puffs of a FAIR cloud toward the
 * horizon colour dl.skyBot, scaled by cwarm=clamp((R-B-70)/70,0,1) — high at
 * dawn/dusk, ~0 at noon, 0 at night. The TOP puff and rain clouds are untouched.
 *
 * The sky gradient is itself warm at dusk, and clouds ride a camera transform, so
 * neither a self time-diff nor a world→screen box can isolate the belly cleanly.
 * So this is a build-vs-build SKY-BAND diff at one FROZEN instant: patched vs
 * pristine HEAD, same seed, playing=false, same dayT. The two builds run the same
 * code EXCEPT the belly tint. A residual: the pre-freeze load drifts entities a
 * little differently per page load, so a raw changed-pixel count is polluted by
 * that drift — but drift is DIRECTIONALLY BALANCED (a moved car shifts pixels
 * warm and cool in equal measure) while the belly tint shifts pixels CONSISTENTLY
 * WARM. So the discriminators are directional, over the sky band (y<45%, above the
 * fast car/ped traffic): mean Δ(R-B) over changed px, and the count of pixels that
 * shifted WARM (Δ(R-B)>6) vs COOL (<-6):
 *   dusk = the effect       (mean warmth clearly > 0; warm px ≫ cool px)
 *   noon = temporal control (cwarm≈0 ⇒ mean ~0; warm px ≈ cool px, drift only)
 *
 *   node probe-cloudwarm.mjs
 */
import { execSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir, homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(HERE, '../../../../solvista.html');
const PATCHED = pathToFileURL(SRC).href;

const tmp = mkdtempSync(join(tmpdir(), 'cloudwarm-'));
const pf = join(tmp, 'solvista.html');
writeFileSync(pf, execSync(`git -C ${dirname(SRC)} show HEAD:solvista.html`));
const PRISTINE = pathToFileURL(pf).href;

const SEEDS = [7, 42, 1234];
const WARP = 61;
const DUSK = 0.70;   /* golden hour: skyBot #e89a6b, cwarm≈0.79 */
const NOON = 0.44;   /* skyBot #f2e3c2, cwarm≈0 */
const DTH = 3;       /* per-channel diff that counts a pixel as "changed" */

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
const mean = a => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);

/* pixels of the SKY BAND (top 45%, above the fast car/ped traffic) of one frozen frame */
async function frame(url, t) {
  await p.goto(url); await p.waitForTimeout(200);
  return await p.evaluate(({ t }) => {
    playing = false; window.__setTime(t); render();
    const H = Math.round(cvs.height * 0.45);
    return { w: cvs.width, h: H, d: Array.from(ctx.getImageData(0, 0, cvs.width, H).data) };
  }, { t });
}
/* over changed pixels (>DTH any channel): mean Δ(R-B), and warm/cool split */
function diff(pa, pr) {
  let warmN = 0, coolN = 0; const w = [];
  for (let i = 0; i + 3 < pa.d.length; i += 4) {
    if (Math.abs(pa.d[i] - pr.d[i]) > DTH || Math.abs(pa.d[i + 1] - pr.d[i + 1]) > DTH || Math.abs(pa.d[i + 2] - pr.d[i + 2]) > DTH) {
      const dw = (pa.d[i] - pa.d[i + 2]) - (pr.d[i] - pr.d[i + 2]);
      w.push(dw);
      if (dw > 6) warmN++; else if (dw < -6) coolN++;
    }
  }
  return { warm: mean(w), warmN, coolN };
}

console.log('cloud belly golden-hour warmth — patched vs pristine HEAD, sky-band diff, frozen');
console.log('  seed        dusk  Δ(R-B) / warmPx / coolPx      noon (control)  Δ(R-B) / warm / cool');
const agg = { dw: [], dwarm: [], dcool: [], nw: [], nwarm: [], ncool: [] };
for (const seed of SEEDS) {
  const pd = await frame(`${PATCHED}?seed=${seed}&warp=${WARP}&t=0.35`, DUSK);
  const rd = await frame(`${PRISTINE}?seed=${seed}&warp=${WARP}&t=0.35`, DUSK);
  const pn = await frame(`${PATCHED}?seed=${seed}&warp=${WARP}&t=0.35`, NOON);
  const rn = await frame(`${PRISTINE}?seed=${seed}&warp=${WARP}&t=0.35`, NOON);
  const d = diff(pd, rd), n = diff(pn, rn);
  agg.dw.push(d.warm); agg.dwarm.push(d.warmN); agg.dcool.push(d.coolN);
  agg.nw.push(n.warm); agg.nwarm.push(n.warmN); agg.ncool.push(n.coolN);
  console.log(`  ${String(seed).padEnd(6)}    ${d.warm.toFixed(1).padStart(6)} / ${String(d.warmN).padStart(6)} / ${String(d.coolN).padStart(6)}       ${n.warm.toFixed(1).padStart(6)} / ${String(n.warmN).padStart(5)} / ${String(n.coolN).padStart(5)}`);
}
const dw = mean(agg.dw), dwarm = mean(agg.dwarm), dcool = mean(agg.dcool);
const nw = mean(agg.nw), nwarm = mean(agg.nwarm), ncool = mean(agg.ncool);
console.log(`  MEAN      ${dw.toFixed(1).padStart(6)} / ${dwarm.toFixed(0).padStart(6)} / ${dcool.toFixed(0).padStart(6)}       ${nw.toFixed(1).padStart(6)} / ${nwarm.toFixed(0).padStart(5)} / ${ncool.toFixed(0).padStart(5)}`);
/* the tint is warm-only at dusk (warm≫cool, mean>0); the noon control is drift-only (warm≈cool, mean~0) */
const pass = dw > 3 && dwarm > dcool * 2 && Math.abs(nw) < 1.5 && nwarm < ncool * 2;
console.log(pass
  ? `VERDICT: PASS — dusk bellies warm +${dw.toFixed(1)} (R-B), warmPx ${dwarm.toFixed(0)} ≫ coolPx ${dcool.toFixed(0)}; noon control mean ${nw.toFixed(1)}, warm ${nwarm.toFixed(0)}≈cool ${ncool.toFixed(0)} (drift only).`
  : `VERDICT: FAIL — dusk ${dw.toFixed(1)} warm${dwarm.toFixed(0)}/cool${dcool.toFixed(0)}, noon ${nw.toFixed(1)} warm${nwarm.toFixed(0)}/cool${ncool.toFixed(0)}.`);
await b.close();
