#!/usr/bin/env node
/* probe-bloomwave.mjs — does the wildflower wave actually RUN in the rendered year?
 *
 * TEMPORAL (134): every other gate in this harness is frozen, and "the wave never
 * runs" is a claim about TIME. So this drives the artifact's OWN tick() — never a
 * re-implementation of the rule under test — and counts hexes in bloom.
 *
 * It reads NO PIXELS, so it has no noise floor at all.
 *
 * BUILD-AGNOSTIC (262): it asks the page for the host by TILE, not by the new
 * predicate, so ONE file grades HEAD and the patch with no source swap and no
 * cross-build floor (230). SRC=<path> points it at a pristine HEAD.
 *
 * THE HEADLINE NEEDS NO THRESHOLD (236): when the vector is "make X happen", HEAD's
 * answer is a CONSTANT by construction. HEAD blooms ZERO hexes at 2035 on every
 * seed — that IS the defect, stated, with nothing invented.
 *
 * THE FREE POSITIVE CONTROL (248): the MEADOW at 1985, where the host still exists,
 * is a CORRECT SIBLING of the very mechanism under test — it must bloom on BOTH
 * builds. If it does not, the RIG is broken, not the city, and a HEAD zero at 2035
 * would be a dead probe rather than a real absence.
 *
 * THE MUST-NOT-MOVE COLUMN (250): the patch draws its spread from hashCell instead
 * of rng(), so the CA is inert — it writes c.bloom and nothing else. `developed`
 * is carried here as the thing that must stay the same ORDER (the census gates it
 * properly; this is the early warning).
 *
 *   node probe-bloomwave.mjs            # the patch
 *   SRC=/tmp/head.html node probe-bloomwave.mjs
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = process.env.SRC || join(HERE, '../../../../solvista.html');
const PAGE = pathToFileURL(SRC).href;

const SEEDS = [7, 42, 1234, 99, 2024, 5];
const TICKS = 150;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
await p.addInitScript(() => {                       /* 213: stub the PRNG before the page's script */
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});

const rows = [];
for (const seed of SEEDS) {
  await p.goto(`${PAGE}?seed=${seed}&warp=61&t=0.30`);
  await p.waitForTimeout(300);

  const r = await p.evaluate(({ seed, TICKS }) => {
    playing = false;

    const run = (warp) => {
      genWorld(seed); __warp(warp);              /* a PREFIX warp is on the trajectory (259) */
      const sample = () => {
        let mB = 0, sB = 0, mN = 0, sN = 0, dev = 0;
        for (const i of HEXI) {
          const c = cells[i]; if (!c) continue;
          if (DEV.has(c.t)) dev++;
          if (c.t === T.MEADOW)    { mN++; if (c.bloom > 0) mB++; }
          if (c.t === T.SHOREPARK) { sN++; if (c.bloom > 0) sB++; }
        }
        return { mB, sB, mN, sN, dev };
      };
      const s0 = sample();
      let peak = 0, sum = 0, firstLit = -1, lit = 0;
      for (let t = 0; t < TICKS; t++) {
        tick();                                   /* the artifact's OWN rule */
        const s = sample();
        const tot = s.mB + s.sB;
        sum += tot; if (tot > peak) peak = tot;
        if (tot > 0) { lit++; if (firstLit < 0) firstLit = t; }
      }
      return {
        hosts: { meadow: s0.mN, shorepark: s0.sN }, dev: s0.dev,
        atLoad: s0.mB + s0.sB,
        mean: +(sum / TICKS).toFixed(1), peak,
        litPct: Math.round(100 * lit / TICKS), firstLit,
      };
    };

    return { y2035: run(61), y1985: run(11) };
  }, { seed, TICKS });

  rows.push({ seed, ...r });
}
await b.close();

const pad = (s, n) => String(s).padStart(n);
console.log(`\n  source: ${SRC}`);
console.log(`  driving the artifact's own tick() for ${TICKS} ticks; no pixels, no noise floor\n`);

console.log('══ A. THE RENDERED YEAR (2035) — is anything in flower in the city we screenshot?\n');
console.log('  seed   MEADOW  SHOREPARK |  in bloom at load   mean in bloom   peak   ticks lit   1st');
for (const r of rows) {
  const a = r.y2035;
  console.log('  ' + pad(r.seed, 5) + pad(a.hosts.meadow, 8) + pad(a.hosts.shorepark, 11) +
    ' |' + pad(a.atLoad, 17) + pad(a.mean, 16) + pad(a.peak, 7) +
    pad(a.litPct + '%', 12) + pad(a.firstLit < 0 ? '—' : a.firstLit, 6));
}
const m = k => (rows.reduce((a, r) => a + r.y2035[k], 0) / rows.length).toFixed(1);
console.log(`\n  mean over 6 seeds:  in bloom at load ${m('atLoad')}   ·   mean in bloom ${m('mean')}   ·   peak ${m('peak')}`);
const dead = rows.filter(r => r.y2035.peak === 0).length;
console.log(`  seeds where the wave NEVER lights in ${TICKS} ticks:  ${dead}/${rows.length}`);

console.log('\n══ B. POSITIVE CONTROL (248) — the MEADOW at 1985, where the host still exists.');
console.log('   A correct sibling of the mechanism under test: it MUST bloom on BOTH builds,');
console.log('   or the RIG is broken and a zero above is a dead probe, not a real absence.\n');
console.log('  seed   MEADOW  |  mean in bloom   peak   ticks lit');
for (const r of rows) {
  const a = r.y1985;
  console.log('  ' + pad(r.seed, 5) + pad(a.hosts.meadow, 8) + '  |' + pad(a.mean, 15) + pad(a.peak, 7) + pad(a.litPct + '%', 12));
}
const ctlDead = rows.filter(r => r.y1985.peak === 0).length;
console.log(`\n  ${ctlDead === 0 ? 'OK — the rig sees blooms on every seed.' : 'RIG BROKEN — the control does not bloom on ' + ctlDead + ' seed(s).'}`);

console.log('\n══ C. MUST-NOT-MOVE (250) — the CA writes c.bloom and nothing else.\n');
console.log('  seed   developed@2035');
for (const r of rows) console.log('  ' + pad(r.seed, 5) + pad(r.y2035.dev, 16));
console.log('');
