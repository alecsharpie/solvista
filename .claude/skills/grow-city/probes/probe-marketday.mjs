/* Does the open-air market ever PACK UP?
 *
 * Iter 240 gave the STADIUM a fixture — `matchClock()`, hashed off Math.floor(dayT),
 * the artifact's own never-wrapping DAY COUNTER — and wired the crowd, the floodlights,
 * the tooltip and `residentWhere` to that one predicate. It wrote the law down:
 * "when a lap establishes a property, ENUMERATE THE CATEGORY" (271).
 *
 * It did not enumerate. T.MARKET is the stadium's sibling on THREE lists:
 *   ATTRACT  (L223)   PEDDEST (L3810)   and syncFleet L3336, the SAME LINE:
 *       if(t===T.MARKET||t===T.STADIUM){openCells.push(...)}   // "markets & matches draw a crowd"
 * ...and `residentWhere` reads matchClock() for the stadium THREE LINES BELOW the
 * market's flat 'Browsing the market stalls.' (262: the unfixed sibling is inside the
 * function you just edited).
 *
 * The T.MARKET draw case (L5941) has NO CLOCK GATE AT ALL: three striped stalls,
 * unconditionally, plus string lights on every night. CIVHRS cannot help it — that
 * table is keyed on `c.kind`, and MARKET is a TILE with no kind (274's law, inverted).
 *
 * It COUNTS OBJECTS, not pixels (250/274): hook the artifact's own draw fns and count
 * what the frame ISSUES per hex. Deterministic, NO NOISE FLOOR AT ALL, no ambient term,
 * nothing to stub. BUILD-AGNOSTIC: it only hooks the artifact's own fns, so ONE file
 * grades HEAD and the patch with no source swap and no cross-build floor (230).
 *
 * Headline needs no threshold (236): HEAD's stall count is a CONSTANT by construction,
 * so DISTINCT STALL COUNTS = 1 over every hour of every day IS the defect, stated.
 *
 * Controls:
 *   STADIUM — the FREE POSITIVE CONTROL (248): the correct sibling, drawn by the same
 *     drawCell, off the same day counter. If its objects do not move, the RIG is broken,
 *     not the city. (This is what turns "market reads 1" from a suspicion into a conviction.)
 *   FARM    — the MUST-NOT-MOVE column (250): a tile with no clock of any kind. Its object
 *     count may not move across the day, on either build.
 *   LIGHTS  — the market's string lights, which DO already read LITAMT. They are the tell:
 *     they burn every night of the year over stalls nobody is minding.
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = process.env.SRC || join(HERE, 'solvista.html');
const SEEDS = [7, 42, 1234, 99, 5150, 2024];
const DAYS = 8, HOURS = 16;

const b = await chromium.launch();
const p = await b.newPage();
await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await p.goto('file://' + SRC);
await p.waitForFunction(() => window.__census !== undefined);

const data = await p.evaluate(({ SEEDS, DAYS, HOURS }) => {
  playing = false;

  // --- hook the artifact's own draw fns, scoped to the cell being drawn (274's rig)
  const dc = window.drawCell, pr = window.prism;
  const ctx2 = document.querySelector('canvas').getContext('2d');
  const fr = ctx2.fillRect.bind(ctx2);
  window.__cur = null; window.__hex = null; window.__tally = null;
  window.drawCell = (x, y) => {
    const c = cells[idx(x, y)];
    window.__cur = c ? c.t : null; window.__hex = x + ',' + y;
    const r = dc(x, y);
    window.__cur = null; window.__hex = null; return r;
  };
  const bump = (k) => {                       // reach through window at CALL time (250)
    const t = window.__cur, T2 = window.__tally;
    if (t == null || !T2) return;
    (T2[t] ||= { prism: 0, rect: 0, light: 0 })[k]++;
    if (t === T.MARKET) {                     // ...and per HEX, so a lit-but-closed
      const h = window.__hex;                 // square cannot hide inside a city total
      ((T2.mkt ||= {})[h] ||= { prism: 0, light: 0 })[k === 'light' ? 'light' : k]++;
    }
  };
  window.prism = (...a) => { bump('prism'); return pr(...a); };
  // ...and the string lights must be told apart from the PACKED-AWAY pitch marks and
  // trestles the patch also draws with fillRect, or the column silently changes meaning
  // between builds and reports the fix as a no-op (228, on my own rig). The lights are
  // the artifact's only 1.3 x 1.3 rect -- a geometric signature, so no fillStyle
  // round-trip through Chromium's canonicaliser (273).
  ctx2.fillRect = (...a) => {
    bump('rect');
    if (a[2] === 1.3 && a[3] === 1.3) bump('light');
    return fr(...a);
  };

  const out = [];
  for (const seed of SEEDS) {
    genWorld(seed); __warp(61);                                  // 1974 -> 2035
    for (const c of cells) if (c.h < c.th) c.h = c.th;           // 272: settle the heights

    const nMkt = cells.filter(c => c.t === T.MARKET).length;
    const nStad = cells.filter(c => c.t === T.STADIUM).length;

    // a stable, real market hex to trace through the week
    let trace = null;
    for (let i = 0; i < G * G; i++) if (cells[i].t === T.MARKET) { trace = [i % G, (i / G) | 0]; break; }

    const samples = [];
    let hexHours = 0, openHexHours = 0, litHexHours = 0, litButClosed = 0,
        nightHexHours = 0, nightLitHexHours = 0;
    for (let d = 0; d < DAYS; d++) for (let h = 0; h < HOURS; h++) {
      __setTime(d + h / HOURS);
      window.__tally = {}; render();
      const T2 = window.__tally;
      const mk = T2[T.MARKET] || { prism: 0, light: 0 };
      const st = T2[T.STADIUM] || { prism: 0, rect: 0 };
      const fm = T2[T.FARM] || { prism: 0, rect: 0 };
      const per = T2.mkt || {};
      const night = LITAMT > 0.25;

      // --- score EVERY market hex, not the city total (250: a defect cannot hide in a mean)
      for (const [, v] of Object.entries(per)) {
        hexHours++;
        const open = v.prism > 0, lit = v.light > 0;
        if (open) openHexHours++;
        if (lit) litHexHours++;
        if (lit && !open) litButClosed++;         // the defect. Patch: must be 0.
      }
      if (night) { nightHexHours += nMkt; nightLitHexHours += Object.values(per).filter(v => v.light > 0).length; }

      samples.push({
        d, h,
        stalls: nMkt ? +(mk.prism / nMkt).toFixed(2) : 0,
        stad: nStad ? +((st.prism + st.rect) / nStad).toFixed(2) : 0,
        farm: fm.prism + fm.rect,
        lit: +LITAMT.toFixed(3),
        // the traced square's own predicate (patch only) -- CALLED WITH ITS HEX
        mktOpen: (typeof window.marketAmt === 'function' && trace)
          ? +marketAmt(trace[0], trace[1]).toFixed(2) : null,
      });
    }
    const uniq = k => new Set(samples.map(s => s[k])).size;
    out.push({
      seed, nMkt, nStad,
      dStalls: uniq('stalls'), dStad: uniq('stad'), dFarm: uniq('farm'),
      stallMin: Math.min(...samples.map(s => s.stalls)),
      stallMax: Math.max(...samples.map(s => s.stalls)),
      openPct: +(100 * openHexHours / hexHours).toFixed(1),
      litPct: +(100 * litHexHours / hexHours).toFixed(1),
      litButClosed,
      nightLitPct: nightHexHours ? +(100 * nightLitHexHours / nightHexHours).toFixed(1) : 0,
      hasPredicate: typeof window.marketAmt === 'function',
      samples,
    });
  }
  return out;
}, { SEEDS, DAYS, HOURS });
await b.close();

const pad = (s, n) => String(s).padStart(n);
console.log(`\nSRC = ${SRC}   (${DAYS} days x ${HOURS} hours, year 2035)\n`);
console.log('=== A. DOES THE MARKET KEEP A CLOCK? ===');
console.log('  headline needs no threshold: if the stalls are a CONSTANT, DISTINCT = 1 IS the defect (236).');
console.log('  STADIUM = the free positive control (a correct sibling on the same day counter, same drawCell).');
console.log('  FARM    = the must-not-move column (no clock of any kind).\n');
console.log('seed   mkts stads | DISTINCT stalls  stadium*  farm* | stalls min..max | square-hours OPEN');
for (const r of data)
  console.log(`${pad(r.seed, 6)} ${pad(r.nMkt, 4)} ${pad(r.nStad, 5)} |`
    + ` ${pad(r.dStalls, 15)} ${pad(r.dStad, 9)} ${pad(r.dFarm, 5)} |`
    + ` ${pad(r.stallMin, 7)}..${String(r.stallMax).padEnd(5)} | ${pad(r.openPct + '%', 17)}`);
console.log('\n  * stadium/farm DISTINCT are controls: stadium MUST be > 1 (a live sibling clock), farm MUST be 1.');

console.log('\n=== B. THE STRING LIGHTS — do they burn over a market nobody is minding? ===');
console.log('  scored PER SQUARE-HOUR (250): a lit-but-shut square cannot hide inside a city total.');
console.log('  LIT-BUT-CLOSED is the defect, and on the patch it must be 0 BY CONSTRUCTION.\n');
console.log('seed   | square-hours lit | of night square-hours, lit | LIT BUT CLOSED');
for (const r of data)
  console.log(`${pad(r.seed, 6)} | ${pad(r.litPct + '%', 16)} | ${pad(r.nightLitPct + '%', 25)} | ${pad(r.litButClosed, 14)}`);

console.log('\n=== C. ONE CITY, ONE WEEK (seed 42) — stalls per market hex, by day x hour ===');
const s42 = data.find(r => r.seed === 42);
if (s42) {
  const hdr = [];
  for (let h = 0; h < HOURS; h++) hdr.push(pad((h / HOURS).toFixed(2).slice(1), 5));
  console.log('  dayT  ' + hdr.join(''));
  for (let d = 0; d < DAYS; d++) {
    const row = s42.samples.filter(s => s.d === d).map(s => pad(s.stalls, 5));
    console.log('  day ' + d + ' ' + row.join(''));
  }
  if (s42.hasPredicate) {
    console.log('\n  marketAmt() (patch only):');
    for (let d = 0; d < DAYS; d++) {
      const row = s42.samples.filter(s => s.d === d).map(s => pad(s.mktOpen, 5));
      console.log('  day ' + d + ' ' + row.join(''));
    }
  }
}
console.log('');
