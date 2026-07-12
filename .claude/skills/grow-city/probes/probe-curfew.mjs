/* Does the city's crowd go to bed the way its windows do?
 *
 * Two claims, and they are measured separately:
 *   (1) PLACEMENT — at 3am the people who are still out are on the LIVELY ground.
 *       Reported in the viewer's units (the TILE a resident stands on), not in buzz:
 *       buzz is the mechanism, so gating on it would be grading my own homework (205).
 *   (2) CADENCE  — the crowd THINS through the evening instead of half of it blinking
 *       out in a single frame. Fully independent of buzz: it is a count vs. the clock.
 *
 * No pixels: pedHidden() is a pure function of the resident's hour and the clock, so one
 * frozen world can be re-read at many clock pins with zero noise floor. Math.random is
 * stubbed BEFORE genWorld (203) so both builds spawn the identical crowd.
 *
 * CONTROL: the DAY column. The change is night-only by construction (pedHidden's LITAMT
 * gate), so daylight runs byte-identical code in both builds and whatever IT reads is the
 * noise floor, measured on the same box in the same run (199).
 */
import { homedir } from 'node:os';
import { writeFileSync, unlinkSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '../../../..');
const ART = join(ROOT, 'solvista.html');
const SEEDS = [42, 7, 1234];

/* the clock pins: dayT through the evening, the small hours, and back up through dawn */
const PINS = [
  ['midday  ', 0.30], ['dusk    ', 0.72], ['evening ', 0.78], ['late    ', 0.86],
  ['deep    ', 0.95], ['smallhrs', 0.04], ['dawn    ', 0.06], ['sunup   ', 0.09],
];

const BASE = join(ROOT, '.probe-base.html');
writeFileSync(BASE, execSync('git show HEAD:solvista.html', { cwd: ROOT, maxBuffer: 1 << 28 }));

const browser = await chromium.launch();

async function run(file, seed) {
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.goto(pathToFileURL(file).href);
  await page.waitForFunction(() => typeof window.__warp === 'function');
  return await page.evaluate(({ seed, PINS }) => {
    /* freeze, and make the crowd reproducible: joggers/deer/kayaks and the ped `kid`/hour
       draws all come off Math.random, and genWorld respawns them (iter 203). */
    playing = false;
    let s = 0x2F6E2B1 >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    genWorld(seed); window.__warp(61);

    /* the viewer's units: what is this resident standing ON? */
    const LIVELY = new Set([T.COM, T.MARKET, T.PLAZA, T.CIVIC, T.STADIUM, T.QUAD]);
    const QUIET = new Set([T.PARK, T.SHOREPARK, T.BEACH, T.DUNE, T.FIELD, T.GARDEN]);
    const near = (x, y, set) => {          /* on it, or fronting it across a kerb */
      const c = cellAt(x, y); if (c && set.has(c.t)) return true;
      for (const d of nbrDirs(y)) { const n = cellAt(x + d[0], y + d[1]); if (n && set.has(n.t)) return true; }
      return false;
    };
    /* the two populations, fixed for the whole sweep (the world is frozen): who LIVES on
       lively ground, who lives on quiet ground. Retention within each is the real claim. */
    const isLively = p => near(p.x, p.y, LIVELY) && !QUIET.has(cellAt(p.x, p.y)?.t);
    const isQuiet = p => QUIET.has(cellAt(p.x, p.y)?.t);
    const poolL = peds.filter(isLively).length, poolQ = peds.filter(isQuiet).length;
    const rows = [];
    for (const [name, t] of PINS) {
      dayT = t; setLight(daylight(dayT));
      const vis = peds.filter(p => !pedHidden(p));
      rows.push({
        name, t, lit: +LITAMT.toFixed(2), tot: peds.length, vis: vis.length,
        onLively: vis.filter(isLively).length, onQuiet: vis.filter(isQuiet).length,
        /* the joggers carried the SAME defect, one array over: a fixed coin against the
           same saturated LITAMT>0.75 gate. Nobody should be out running at 3am. */
        jog: joggers.filter(j => !(typeof nightAmt === 'function'
          ? nightAmt() > j.out
          : LITAMT > 0.75 && (((j.ph * 97) | 0) % 10) < 6)).length,
        jogTot: joggers.length,
      });
    }
    return { rows, poolL, poolQ };
  }, { seed, PINS });
}

const out = {};
for (const [tag, file] of [['BASE', BASE], ['PATCH', ART]]) {
  out[tag] = {};
  for (const seed of SEEDS) out[tag][seed] = await run(file, seed);
}
await browser.close();
unlinkSync(BASE);

const pct = (a, b) => b ? (100 * a / b).toFixed(0).padStart(3) + '%' : '  --';
for (const seed of SEEDS) {
  const B = out.BASE[seed], P = out.PATCH[seed];
  console.log(`\n=== seed ${seed} ===  crowd ${B.rows[0].tot}   living on LIVELY ground ${B.poolL} / QUIET ground ${B.poolQ}`);
  console.log('   pin      LITAMT |  BASE  out  |  lively kept  quiet kept  ||  PATCH out  |  lively kept  quiet kept');
  for (let i = 0; i < PINS.length; i++) {
    const b = B.rows[i], p = P.rows[i];
    console.log(`   ${b.name}   ${String(b.lit).padStart(4)}  | ${String(b.vis).padStart(4)}/${b.tot} |` +
      `     ${pct(b.onLively, B.poolL)}       ${pct(b.onQuiet, B.poolQ)}   ||` +
      ` ${String(p.vis).padStart(4)}/${p.tot} |     ${pct(p.onLively, P.poolL)}       ${pct(p.onQuiet, P.poolQ)}`);
  }
}

console.log('\n' + '='.repeat(96));
console.log('CLAIM 1 — at the deepest hour, is the crowd that is LEFT on the lively ground?');
console.log('  (retention within each population; the two must SEPARATE, and in BASE they must not)');
for (const tag of ['BASE', 'PATCH']) {
  const L = [], Q = [];
  for (const seed of SEEDS) {
    const d = out[tag][seed], r = d.rows[5];            /* smallhrs */
    L.push(100 * r.onLively / d.poolL); Q.push(100 * r.onQuiet / d.poolQ);
  }
  const f = a => a.map(v => v.toFixed(0) + '%').join(' / ');
  console.log(`  ${tag.padEnd(5)}  lively ground keeps ${f(L)}   quiet ground keeps ${f(Q)}   (seeds ${SEEDS.join(', ')})`);
}
console.log('\nCLAIM 2 — does the crowd THIN, or does it blink? (distinct crowd sizes across the 7 night pins)');
for (const tag of ['BASE', 'PATCH'])
  console.log(`  ${tag.padEnd(5)}  ${SEEDS.map(s => new Set(out[tag][s].rows.slice(1).map(r => r.vis)).size).join(' / ')}` +
    `   trace: ${out[tag][SEEDS[0]].rows.slice(1).map(r => r.vis).join(' -> ')}`);

console.log('\nCLAIM 3 — the JOGGERS carried the same defect. Is anyone still running at 3am?');
for (const tag of ['BASE', 'PATCH'])
  console.log(`  ${tag.padEnd(5)}  runners out, dusk -> small hours: ` +
    SEEDS.map(s => out[tag][s].rows.slice(1).map(r => r.jog).join('->') +
      `/${out[tag][s].rows[0].jogTot}`).join('   |   '));

const dayOK = SEEDS.every(s => out.BASE[s].rows[0].vis === out.PATCH[s].rows[0].vis &&
  out.BASE[s].rows[0].vis === out.BASE[s].rows[0].tot);
console.log(`\nCONTROL — the DAY is an inert regime (199): nobody hidden, both builds identical = ${dayOK}` +
  `  [${SEEDS.map(s => out.BASE[s].rows[0].vis + '=' + out.PATCH[s].rows[0].vis).join(', ')}]`);
