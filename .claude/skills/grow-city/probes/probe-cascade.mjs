#!/usr/bin/env node
/* probe-amphcost.mjs — IS THE TOWER DROP MINE, OR IS IT THE CHAOS? (iter 231)
 *
 * The census (3 seeds) read TOWER -6.9%, towerHt -6.1%, pop -3.9% with `developed` FLAT.
 * Same land, shorter buildings. That is not obviously chaotic-CA wobble, and 218's law
 * says the tower roll is SATURATED — tower count is set by the PREDICATE (com>=2), not by
 * rng luck — so a mere stream reshuffle should NOT move it much. A 7% skyline tax to
 * unbury one tile would be a bad trade (the solar-farm precedent).
 *
 * So widen the sample. Pure world data at 2035, HEAD vs patch, 10 seeds, PAIRED.
 * Directional (patch loses towers on ~every seed) => a real cost, and I must mitigate.
 * Sign flips seed to seed and the mean is ~0 => the 3-seed census caught a bad draw.
 *
 * SRC=<path> picks the build.
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));

const SEEDS = [7, 42, 1234, 99, 2025, 5150, 3, 808, 61423, 777];
const BUILDS = {
  HEAD: process.env.HEADSRC || '/tmp/solvista-HEAD.html',
  patch: join(HERE, '../../../../solvista.html'),
};

const b = await chromium.launch();
const out = {};
for (const [name, path] of Object.entries(BUILDS)) {
  const pg = await b.newPage({ viewport: { width: 1400, height: 900 } });
  await pg.addInitScript(() => { let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
  await pg.goto(pathToFileURL(resolve(path)).href);
  await pg.waitForTimeout(300);
  out[name] = [];
  for (const seed of SEEDS) {
    out[name].push(await pg.evaluate((sd) => {
      playing = false;
      genWorld(sd); __warp(61);
      let tower = 0, th = 0, com = 0, dev = 0, pop2 = 0, amph = null;
      for (let i = 0; i < G * G; i++) {
        const c = cells[i]; if (!c) continue;
        if (c.t === T.TOWER) { tower++; th += c.th || 0; }
        if (c.t === T.COM) com++;
        if (DEV.has(c.t)) dev++;
        if (c.t === T.CIVIC && c.kind === 'amphitheater') amph = hexDist(i % G, (i / G) | 0, CBDX, CBDY);
      }
      const cs = window.__census();
      return { seed: sd, tower, th: Math.round(th), com, dev, pop: Math.round(cs.pop), amphDist: amph };
    }, seed));
  }
  await pg.close();
}
await b.close();

console.log('\n=== is the tower drop DIRECTIONAL? (10 seeds, paired, world data at 2035) ===\n');
console.log('seed      TOWER  HEAD->patch      towerHt %      pop %      developed %    amph dist HEAD->patch');
let tsum = 0, psum = 0, dsum = 0, tdown = 0, n = 0;
SEEDS.forEach((s, i) => {
  const h = out.HEAD[i], p = out.patch[i];
  const dt = p.tower - h.tower;
  const pctT = h.th ? (p.th - h.th) / h.th * 100 : 0;
  const pctP = h.pop ? (p.pop - h.pop) / h.pop * 100 : 0;
  const pctD = h.dev ? (p.dev - h.dev) / h.dev * 100 : 0;
  tsum += dt; psum += pctP; dsum += pctD; n++;
  if (dt < 0) tdown++;
  console.log(`${String(s).padEnd(7)} ${String(h.tower).padStart(4)} -> ${String(p.tower).padStart(4)}` +
    ` (${(dt >= 0 ? '+' : '') + dt})`.padEnd(9) +
    `  ${pctT >= 0 ? '+' : ''}${pctT.toFixed(1)}%`.padStart(9) +
    `  ${pctP >= 0 ? '+' : ''}${pctP.toFixed(1)}%`.padStart(9) +
    `  ${pctD >= 0 ? '+' : ''}${pctD.toFixed(1)}%`.padStart(11) +
    `        ${String(h.amphDist).padStart(2)} -> ${String(p.amphDist).padStart(2)}`);
});
console.log(`\nmean TOWER delta ${(tsum / n).toFixed(1)}   mean pop ${(psum / n).toFixed(2)}%   mean developed ${(dsum / n).toFixed(2)}%`);
console.log(`seeds where the patch LOSES towers: ${tdown}/${n}`);
console.log('\n~half the seeds losing, mean near 0  => chaotic reshuffle (the census caught a bad draw).');
console.log('most seeds losing, mean clearly down => DIRECTIONAL: the bowl is displacing the skyline.');
