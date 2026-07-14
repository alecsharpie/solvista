/* probe-warppop — IS THE WARP A FAITHFUL FAST-FORWARD?
 *
 * recount() scales a TOWER's residents by c.h/c.th (the ANIMATED height), and
 * c.h is grown ONLY inside drawBuilding() -- i.e. inside render(). __warp never
 * renders (it is a tight `while(year<target){tick()}` loop), so under a warp
 * every tower in the city stands at h=0 and houses NOBODY, for the whole sim.
 * Every pop-gated civic rule in tick() (school / university / stadium) reads
 * that stunted number.
 *
 * A live-played city interleaves render() with tick(), so its towers DO grow.
 * ⇒ the WARPED city and the LIVED city are different cities. This measures both.
 *
 * Three regimes, same seeds, same tick loop, pure world data (no pixels):
 *   WARP    — as shipped: c.h never grows during the sim   (= census + every probe)
 *   LIVE    — c.h grown FRAMES_PER_TICK times per tick      (= what a visitor sees)
 *   INSTANT — c.h = c.th immediately                        (the upper bound)
 *
 * The SCHOOL is the treatment (its gate is pop). The UNIVERSITY and STADIUM are
 * free positive controls (248): pop-gated siblings in the same tick(), so if they
 * do not move either, the finding is about pop and not about one rule.
 * ROADS is the must-not-move column (250): its rules never read pop.
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = process.env.SRC || join(HERE, '../../../../solvista.html');

const SEEDS = [7, 42, 1234];
/* one tick is 0.45 sim-seconds; at speed 1 that is 0.45 real seconds, and the
   RAF loop renders ~60x a second ⇒ ~27 growth steps per tick in live play. */
const FPT = 27;

const b = await chromium.launch();
const page = await b.newPage();
await page.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await page.goto('file://' + SRC);
await page.waitForFunction(() => typeof window.__warp === 'function');

const out = [];
for (const seed of SEEDS) {
  for (const mode of ['WARP', 'LIVE', 'INSTANT']) {
    const r = await page.evaluate(({ seed, mode, FPT }) => {
      playing = false;
      genWorld(seed);
      const grow = () => {
        if (mode === 'WARP') return;
        for (const c of cells) {
          if (!DEV.has(c.t)) continue;
          if (mode === 'INSTANT') { c.h = c.th; continue; }
          /* drawBuilding's own line, run once per emulated frame */
          for (let f = 0; f < FPT; f++)
            if (c.h < c.th) c.h = Math.min(c.th, c.h + 0.35 + (c.th - c.h) * 0.012);
        }
      };
      while (year < 2035) { year += 0.45 / 6; tick(); grow(); }
      /* settle + final recount, exactly as __warp's tail does, so every regime is
         reported on the same settled city -- the only difference is what the RULES
         saw while it was being built. */
      for (const c of cells) if (DEV.has(c.t)) c.h = c.th;
      recount();
      const uni = cells.filter(c => c.t === T.CIVIC && c.kind === 'university').length;
      return { pop: stats.pop, sch: stats.schools, uni, stad: stats.stad,
               towers: stats.towers, dev: stats.dev, walk: stats.walkPct,
               roads: cells.filter(c => c.t === T.ROAD).length };
    }, { seed, mode, FPT });
    out.push({ seed, mode, ...r });
  }
}
await b.close();

const f = (n, w) => String(n).padStart(w);
console.log('\n=== THE WARPED CITY vs THE LIVED CITY (2035) ===');
console.log('  treatment: SCHOOLS (pop-gated).  positive controls: UNI, STAD (pop-gated siblings).');
console.log('  must-not-move: ROADS (its rules never read pop).\n');
console.log('  seed  regime       pop  owed  SCHOOLS   UNI  STAD  towers    dev  walk%   roads');
for (const r of out) {
  const owed = Math.floor(r.pop / 3500);
  const mark = r.mode === 'WARP' ? ' ' : ' ';
  console.log(`  ${f(r.seed,4)} ${r.mode.padEnd(8)}${f(r.pop,8)} ${f(owed,5)} ${f(r.sch,8)} ${f(r.uni,5)} ${f(r.stad,5)} ${f(r.towers,7)} ${f(r.dev,6)} ${f(r.walk,6)} ${f(r.roads,7)}${mark}`);
  if (r.mode === 'INSTANT') console.log('');
}

console.log('=== the gap, WARP -> LIVE ===\n');
for (const seed of SEEDS) {
  const w = out.find(r => r.seed === seed && r.mode === 'WARP');
  const l = out.find(r => r.seed === seed && r.mode === 'LIVE');
  const pc = (a, b0) => (b0 === 0 ? 'n/a' : ((a - b0) / b0 * 100).toFixed(1) + '%');
  console.log(`  seed ${seed}:  pop ${w.pop} -> ${l.pop} (${pc(l.pop, w.pop)})   ` +
              `schools ${w.sch} -> ${l.sch}   uni ${w.uni} -> ${l.uni}   ` +
              `dev ${w.dev} -> ${l.dev} (${pc(l.dev, w.dev)})   roads ${w.roads} -> ${l.roads}`);
}
console.log('');
