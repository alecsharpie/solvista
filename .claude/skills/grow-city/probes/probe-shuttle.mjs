/* probe-shuttle — does the AIR SHUTTLE fly over the CITY, or the country?
 *
 * The shuttle (2012+) used to retarget to a UNIFORMLY RANDOM inland point, so a
 * "city air shuttle" spent its runs droning over the empty meadow/farmland north
 * of the built-up strip. This asks, in the units the change is about:
 *   what share of a shuttle's TARGETS land on DEVELOPED ground?
 *
 * Pure world data driven off the artifact's OWN stepShuttle — no render, no
 * pixels, no noise floor. Same seeded Math.random stream in both builds (248), so
 * both draw from the IDENTICAL pool of candidate points; HEAD takes the first
 * inB point, the patch keeps the first DEV one.
 *
 * CONTROL (the null hypothesis, measured not assumed): the DEVELOPED SHARE of the
 * inland box a uniform walker would hit. HEAD's shuttle sitting ON it is the
 * defect stated (236); the patch clearing it is the fix. And 2012 (a young city,
 * little built) is the FALLBACK check: the patch must not strand or crash there.
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = join(HERE, 'solvista.html');
const SRC = process.env.SRC || ART;
const SEEDS = [7, 42, 1234, 5, 99, 2024];
const SAMPLES = 300;   /* retargets per shuttle */

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
await page.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await page.goto('file://' + SRC);
await page.waitForFunction(() => window.__census !== undefined);

const run = async (year) => {
  const rows = [];
  for (const seed of SEEDS) {
    const r = await page.evaluate(({ seed, year, samples }) => {
      let s = 0x51F3A9C >>> 0;
      Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
      playing = false;
      genWorld(seed);
      __warp(year - 1974);

      /* CONTROL: developed share of the inland sampling box (the uniform baseline) */
      let box = 0, dev = 0;
      for (let y = 3; y < G - 3; y++) for (let x = 3; x < SHOREX - 3; x++) {
        const c = cellAt(x, y); if (!c || c.t === T.VOID) continue;
        box++; if (DEV.has(c.t)) dev++;
      }
      const baseline = box ? dev / box : 0;

      /* drive the artifact's OWN stepShuttle: force a retarget, read the target */
      let onDev = 0, n = 0, offPlate = 0;
      const N = shuttles.length;
      for (const sh of shuttles) {
        for (let k = 0; k < samples; k++) {
          sh.tm = 0;
          stepShuttle(sh, 0.001);         /* retargets; barely moves */
          const c = cellAt(sh.tx | 0, sh.ty | 0);
          n++;
          if (!c || c.t === T.VOID) { offPlate++; continue; }
          if (DEV.has(c.t)) onDev++;
        }
      }
      return { seed, N, baseline, share: n ? onDev / n : 0, offPlate };
    }, { seed, year, samples: SAMPLES });
    rows.push(r);
  }
  return rows;
};

const fmt = (rows, label) => {
  console.log(`\n=== ${label} (${SRC === ART ? 'PATCH' : 'HEAD (SRC)'}) ===`);
  console.log('seed   shuttles  DEV-share   baseline(uniform)  off-plate');
  let sS = 0, sB = 0;
  for (const r of rows) {
    console.log(
      `${String(r.seed).padEnd(6)} ${String(r.N).padEnd(9)} ${(r.share * 100).toFixed(1).padStart(6)}%    ` +
      `${(r.baseline * 100).toFixed(1).padStart(6)}%           ${r.offPlate}`);
    sS += r.share; sB += r.baseline;
  }
  console.log(`MEAN   ${''.padEnd(9)} ${(sS / rows.length * 100).toFixed(1).padStart(6)}%    ${(sB / rows.length * 100).toFixed(1).padStart(6)}%`);
};

fmt(await run(2035), '2035 mature city');
fmt(await run(2012), '2012 young city (fallback check)');

await browser.close();
