/* probe-roofghost — is the rooftop flag SHOWN, or is it a GHOST?  (iter 288)
 *
 * 281's law: a per-cell flag whose WRITER skips a type its READERS still count is
 * ORPHANED — drawn by nothing, and still answering for the tile it sits on.
 *
 * c.solar is written on RES/MID/COM (L2571).  c.groof on MID/COM (L2581).
 * drawBuilding draws them in the RES / MID / COM branches ONLY — the TOWER branch
 * has neither.  But COM -> TOWER is a saturating upgrade (1996+), and every reader
 * gates on DEV.has(c.t), which CONTAINS T.TOWER:
 *     recount()  L3262   stats.solar          (the HUD number)
 *     tooltip    L9509   'Rooftop solar'      (the card)
 *     census     L9946   solarRoofs
 *     the CA     L2572   adopt = n.solar && DEV.has(n.t)   <- it SEEDS THE CONTAGION
 *
 * So: how many of the city's panels are on a roof nobody can see?
 *
 * Pure world data: no render, no clock, no pixels, no noise floor, nothing to stub.
 * BUILD-AGNOSTIC via SRC= (it only reads cells[] + the artifact's own type sets).
 */
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC  = process.env.SRC || join(HERE, 'solvista.html');
const SEEDS = [7, 42, 1234, 99, 2024, 555];
const ERAS  = [2005, 2020, 2035];

const html = readFileSync(SRC, 'utf8');
const b = await chromium.launch();
const p = await b.newPage();
await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await p.setContent(html);
await p.waitForFunction(() => typeof window.genWorld === 'function');

const rows = await p.evaluate(({ seeds, eras }) => {
  const out = [];
  for (const seed of seeds) {
    for (const era of eras) {
      genWorld(seed);
      __warp(era - 1974);
      let shownS = 0, ghostS = 0, shownG = 0, ghostG = 0, burnt = 0;
      let towers = 0, seedNbr = 0;
      /* a TOWER is DRAWN with no panel; RES/MID/COM draw theirs */
      const DRAWS = new Set([T.RES, T.MID, T.COM, T.TOWER]);
      for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
        const c = cells[idx(x, y)];
        if (c.t === T.TOWER) towers++;
        /* what every READER counts: the flag on any DEV tile */
        if (c.solar && DEV.has(c.t)) { DRAWS.has(c.t) ? shownS++ : ghostS++; }
        if (c.groof && DEV.has(c.t)) { DRAWS.has(c.t) ? shownG++ : ghostG++; }
        /* the flag surviving a demolition, ready to resurrect on redevelopment */
        if ((c.solar || c.groof) && c.t === T.BURNT) burnt++;
        /* ghosts that still SEED the diffusion: a live RES/MID/COM whose adopt
           count is being fed by an invisible TOWER neighbour */
        if (!c.solar && DRAWS.has(c.t) &&
            countAround(x, y, 1, n => n.solar && n.t === T.TOWER) > 0) seedNbr++;
      }
      out.push({ seed, era, towers, shownS, ghostS, shownG, ghostG, burnt, seedNbr });
    }
  }
  return out;
}, { seeds: SEEDS, eras: ERAS });

await b.close();

const src = SRC.includes('/tmp') || process.env.SRC ? 'HEAD' : 'shipped';
console.log(`\nprobe-roofghost   src=${src}\n`);
console.log('seed  era   TOWERS |  SOLAR shown  ghost   %ghost |  GROOF shown  ghost   %ghost | burnt-flag  ghost-seeds-CA');
console.log('-'.repeat(112));
const acc = { shownS: 0, ghostS: 0, shownG: 0, ghostG: 0, burnt: 0, seedNbr: 0 };
for (const r of rows) {
  const pS = r.shownS + r.ghostS ? (100 * r.ghostS / (r.shownS + r.ghostS)) : 0;
  const pG = r.shownG + r.ghostG ? (100 * r.ghostG / (r.shownG + r.ghostG)) : 0;
  console.log(
    `${String(r.seed).padStart(4)}  ${r.era}  ${String(r.towers).padStart(6)} | ` +
    `${String(r.shownS).padStart(11)} ${String(r.ghostS).padStart(6)} ${pS.toFixed(1).padStart(7)}% | ` +
    `${String(r.shownG).padStart(11)} ${String(r.ghostG).padStart(6)} ${pG.toFixed(1).padStart(7)}% | ` +
    `${String(r.burnt).padStart(10)} ${String(r.seedNbr).padStart(15)}`);
  if (r.era === 2035) for (const k of Object.keys(acc)) acc[k] += r[k];
}
console.log('-'.repeat(112));
const tS = acc.shownS + acc.ghostS, tG = acc.shownG + acc.ghostG;
console.log(`\n2035, summed over ${SEEDS.length} seeds:`);
console.log(`  SOLAR : ${acc.shownS} shown, ${acc.ghostS} GHOST  ->  ${(100*acc.ghostS/tS).toFixed(1)}% of every panel the city claims is on a roof that DRAWS NOTHING`);
console.log(`  GROOF : ${acc.shownG} shown, ${acc.ghostG} GHOST  ->  ${(100*acc.ghostG/tG).toFixed(1)}%`);
console.log(`  flags surviving on BURNT ground (resurrect on redevelopment): ${acc.burnt}`);
console.log(`  live roofs whose adoption chance is fed by an INVISIBLE tower neighbour: ${acc.seedNbr}`);
