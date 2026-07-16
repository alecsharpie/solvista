/* probe-tankage — does the walk-up water tank ride c.age, as its comment claims?
 *
 * HEAD gated the tank purely on a static hashCell(x,y,seed^0x7A7E)<0.3, so a
 * walk-up either always had a tank or never, at any age: the comment "the older
 * walk-ups keep a timber water tank" was a 199-tell (a claim the value cannot have).
 * The patch adds `c.age > TANKAGE` (~12 yr), so the tank now appears once a building
 * has genuinely stood — the first pixel on a developed building to read c.age
 * (254's live-but-unread host; corr(age,distCBD) ~ -0.35 at 2035 => the old town IS
 * downtown, and tanks now concentrate there).
 *
 * Pure world data: no render, no clock, no noise floor. BUILD-AGNOSTIC: it reads
 * `typeof TANKAGE` and falls back to HEAD's age-blind gate, so ONE file grades both
 * builds with no source swap and no cross-build floor (230).
 *
 * Headline needs no threshold (236): HEAD's corr(tank,age) ~ 0 (age-blind) IS the
 * defect stated; the patch makes it strongly positive by construction, AND pulls
 * the tanked mean toward the core. `DISTINCT` young-city tanks (a 1995 boomtown of
 * fresh walk-ups) drops to ~0, which is correct: tanks accrue as the city ages.
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = process.env.SRC || join(HERE, '../../../../solvista.html');
const SEEDS = [42, 7, 1234, 99, 2024, 555];
const ERAS = [1995, 2015, 2035];

const b = await chromium.launch();
const p = await b.newPage();
await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await p.goto(pathToFileURL(SRC).href);
await p.waitForTimeout(400);

const build = await p.evaluate(() => typeof TANKAGE === 'number' ? `PATCH (TANKAGE=${TANKAGE})` : 'HEAD (age-blind)');
console.log(`build: ${build}`);
console.log('seed  era   tanks  corr(tank,age)  meanDist(tanked)  meanDist(low-MID)');
for (const seed of SEEDS) {
  for (const era of ERAS) {
    const r = await p.evaluate(([seed, era]) => {
      playing = false; genWorld(seed); window.__warp(era - year);
      const age = (typeof TANKAGE === 'number') ? TANKAGE : -1;   /* HEAD: no age gate */
      const w = [];
      for (const i of HEXI) {
        const c = cells[i]; if (c.t !== T.MID || c.v > 0.5) continue;
        const x = i % G, y = (i / G) | 0;
        const hs = (!c.solar && !c.groof && hashCell(x, y, seedNum ^ 0x7A7E) < 0.3);
        const tank = (hs && c.age > age) ? 1 : 0;   /* age=-1 on HEAD => hs alone */
        w.push({ age: c.age, d: hexDist(x, y, CBDX, CBDY), tank });
      }
      const tanked = w.filter(o => o.tank);
      const meanD = a => a.length ? a.reduce((s, o) => s + o.d, 0) / a.length : 0;
      let corr = 0;
      if (w.length >= 3) {
        const A = w.map(o => o.tank), B = w.map(o => o.age);
        const ma = A.reduce((s, x) => s + x, 0) / A.length, mb = B.reduce((s, x) => s + x, 0) / B.length;
        let sa = 0, sb = 0, sab = 0;
        for (let k = 0; k < A.length; k++) { const da = A[k] - ma, db = B[k] - mb; sa += da * da; sb += db * db; sab += da * db; }
        corr = (sa && sb) ? sab / Math.sqrt(sa * sb) : 0;
      }
      return { tanks: tanked.length, corr, dT: meanD(tanked), dAll: meanD(w) };
    }, [seed, era]);
    console.log(`${String(seed).padEnd(5)} ${era}  ${String(r.tanks).padStart(4)}` +
      `      ${r.corr.toFixed(2).padStart(5)}          ${r.dT.toFixed(1).padStart(5)}            ${r.dAll.toFixed(1).padStart(5)}`);
  }
}
await b.close();
