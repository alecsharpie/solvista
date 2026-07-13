#!/usr/bin/env node
/* IS THE SEA A QUILT? — the lattice-step probe (iter 257).
 *
 * 255's law: a smooth field sampled once per hexagon and painted as a FLAT FILL is
 * piecewise-constant on the lattice, so its steps land exactly on the hex boundaries and
 * the surface reads as a tiled mosaic rather than as a sea. 255 learned that by BUILDING
 * such a field. This probe asks whether the artifact ALREADY HAD ONE.
 *
 * It does, and it is HEAD's: `seaTone` quantises depth to EIGHTHS, so two adjacent sea
 * hexes differ by one eighth of the waterSh->waterDp ramp, painted as two flat fills. That
 * step is the lattice step, and it is what a viewer either does or does not see.
 *
 * The instrument is the cheapest in the harness: NO RENDER, NO CLOCK, NO NOISE FLOOR and
 * nothing to stub. It calls the artifact's own seaFace() for each of the nine tones at a
 * pinned light and reads back the colour the fill actually gets. The lattice step is then
 * exact arithmetic, not a pixel estimate -- and, unlike a screenshot, it cannot be confused
 * by the glints and foam that ride ON TOP of the fill (those are identical in both builds,
 * so they are not the question).
 *
 * TWO NUMBERS, AND THE SECOND IS THE ONE THAT MATTERS:
 *   step   -- mean |dRGB| between the fills of two depth-adjacent hexes. The raw size of
 *             the terrace.
 *   step/chroma -- the terrace measured against the SURFACE'S OWN COLOUR. This is the
 *             ratio 255's law is really about, and it is why DAY is the control that makes
 *             the whole table readable: the day sea has a LARGER raw step than the golden
 *             sea and nobody has ever called the day sea a quilt. A step on a saturated
 *             surface reads as WATER DEPTH; the same step on a desaturated one has no
 *             colour to hide behind and reads as TILING.
 *
 * DAY and NIGHT are also the free dead-regime control (199): GWARM is 0 at both, so the
 * patch runs HEAD's byte-identical code path and those rows MUST match to the unit.
 *
 *   node probes/probe-seastep.mjs
 */
import { homedir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html')].find(f => existsSync(f));

/* pristine HEAD, derived from git itself -- never a /bin/cp backup lying around (197) */
const HEADF = '/tmp/probe-seastep-head.html';
writeFileSync(HEADF, execSync(`git -C ${dirname(ART)} show HEAD:solvista.html`, { maxBuffer: 1 << 28 }));

const PINS = [
  { name: 'day',    t: 0.30 },
  { name: 'golden', t: 0.68 },
  { name: 'night',  t: 0.92 },
];

const browser = await chromium.launch();

async function readBuild(file) {
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.goto(pathToFileURL(file).href);
  await page.waitForTimeout(400);
  const out = await page.evaluate((pins) => {
    const parse = s => s.match(/\d+/g).map(Number);
    const lum = c => 0.30 * c[0] + 0.59 * c[1] + 0.11 * c[2];
    const chroma = c => Math.max(...c) - Math.min(...c);
    const res = {};
    playing = false;
    genWorld(42); __warp(61); __setYear(2035.62);
    for (const p of pins) {
      __setTime(p.t);
      /* seaFace reads TINT/GWARM/GWST, all of which render() publishes -- so drive the real
         light pipeline exactly as a frame does, then ask the real function for its colour. */
      const dl = daylight(dayT); setLight(dl);
      GWARM = clamp((dl.skyBot[0] - dl.skyBot[2] - 70) / 70, 0, 1); GWSB = dl.skyBot;
      if (typeof GWST !== 'undefined') GWST = dl.skyTop;   /* absent on HEAD: it is 257's global */
      const cols = [];
      for (let k = 0; k <= 8; k++) cols.push(parse(seaFace(k / 8)));
      /* the lattice step: two DEPTH-ADJACENT hexes, i.e. one eighth of the ramp */
      let s = 0;
      for (let k = 0; k < 8; k++) {
        const a = cols[k], b = cols[k + 1];
        s += Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
      }
      const mid = cols[4];
      res[p.name] = {
        step: s / 8, chroma: chroma(mid), lum: Math.round(lum(mid)),
        mid, gwarm: +GWARM.toFixed(2),
      };
    }
    return res;
  }, PINS);
  await page.close();
  return out;
}

const head = await readBuild(HEADF);
const patch = await readBuild(ART);
await browser.close();

console.log(`
IS THE SEA A QUILT?  the lattice step between two DEPTH-ADJACENT sea hexes
seed 42, calendar 2035.62 (dry peak) -- render-free: seaFace() asked directly, no pixels

  light   build |  sea fill        chr  lum | LATTICE STEP | step/chroma
  ---------------------------------------------------------------------`);
for (const p of PINS) {
  for (const [tag, b] of [['HEAD ', head], ['patch', patch]]) {
    const r = b[p.name];
    const ratio = r.chroma > 0 ? (r.step / r.chroma) : Infinity;
    console.log(`  ${p.name.padEnd(6)}  ${tag} | rgb(${r.mid.join(',').padEnd(11)}) ${String(r.chroma).padStart(3)} ${String(r.lum).padStart(4)} |` +
      `     ${r.step.toFixed(1).padStart(4)}     |   ${ratio.toFixed(2)}`);
  }
}
const dgh = head.day, dgp = patch.day, ngh = head.night, ngp = patch.night;
const dead = (dgh.step === dgp.step && ngh.step === ngp.step &&
  dgh.mid.join() === dgp.mid.join() && ngh.mid.join() === ngp.mid.join());
console.log(`
  DEAD-REGIME CONTROL (199): GWARM=0 at day and night, so the patch must run HEAD's bytes.
    day/night identical across builds: ${dead ? 'YES -- the fixed point holds' : 'NO *** THE FIXED POINT IS BROKEN ***'}

  READ: the DAY row is the reference the eye already accepts -- nobody has ever called the
        day sea a quilt. Compare each golden row's step/chroma against it: a terrace on a
        SATURATED surface reads as water depth, the same terrace on a DESATURATED one has no
        colour to hide behind and reads as TILING (255).`);
