/* probe-woods.mjs — grade iter 117's woodland tooltip.
 *
 * Hovers real FOREST / REDWOOD / MEADOW / BURNT hexes via __find()'s screen
 * coords, scrapes #tip, and checks every CLAIM against ground truth:
 *   - "Stand: N hexes"  vs an INDEPENDENT flood fill computed here in Node from
 *     __find('forest')+__find('redwood') (different code, same answer required).
 *   - "Canopy: X"       vs the neighbour count the DRAW uses (k>=4 closed, k<=1 edge).
 *   - "Deep woods"      vs the succession precondition tick() gates old growth on.
 * A tooltip that claims a stand the fill disagrees with is a lie; that is the
 * whole point of the probe (iter 112: a predicate with three readers).
 *
 *   node probe-woods.mjs [seed] [warp]
 */
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;

const seed = process.argv[2] || '42', warp = process.argv[3] || '61', yr = process.argv[4] || '';
const NBR_E = [[1,0],[-1,0],[0,-1],[0,1],[-1,-1],[-1,1]];
const NBR_O = [[1,0],[-1,0],[0,-1],[0,1],[1,-1],[1,1]];
const dirs = y => (y & 1) ? NBR_O : NBR_E;

/* independent stand fill: contiguous FOREST|REDWOOD over hex neighbours */
function stands(woodKeys) {
  const seen = new Set(), sizeOf = new Map();
  for (const k of woodKeys) {
    if (seen.has(k)) continue;
    const comp = [], stack = [k]; seen.add(k);
    while (stack.length) {
      const cur = stack.pop(); comp.push(cur);
      const [x, y] = cur.split(',').map(Number);
      for (const [dx, dy] of dirs(y)) {
        const nk = (x + dx) + ',' + (y + dy);
        if (woodKeys.has(nk) && !seen.has(nk)) { seen.add(nk); stack.push(nk); }
      }
    }
    for (const c of comp) sizeOf.set(c, comp.length);
  }
  return sizeOf;
}

const url = pathToFileURL(process.cwd() + '/solvista.html').href
          + `?seed=${seed}&warp=${warp}&t=0.3` + (yr ? `&year=${yr}` : '');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
const errs = [];
page.on('pageerror', e => errs.push(String(e)));
await page.goto(url);
await page.waitForTimeout(1500);
/* `?year=` only SETS the calendar; the shroom/bloom passes live in tick(), so pin
   the year and drive ticks by hand to reach a season's state, then freeze. */
const ticks = Number(process.argv[5] || 0);
await page.evaluate(({ y, n }) => {
  for (let i = 0; i < n; i++) { if (y) year = y; tick(); }
  if (y) year = y;
  playing = false;                                 // freeze: no tick while we hover
  render();
}, { y: yr ? Number(yr) : 0, n: ticks });

const cells = await page.evaluate(() => {
  const grab = n => window.__find(n).map(c => ({ x: c.x, y: c.y, sx: c.sx, sy: c.sy }));
  return { forest: grab('forest'), redwood: grab('redwood'),
           meadow: grab('meadow'), burnt: grab('burnt'), shroom: grab('shroom') };
});

const woodKeys = new Set([...cells.forest, ...cells.redwood].map(c => c.x + ',' + c.y));
const sizeOf = stands(woodKeys);
const nStands = new Set([...woodKeys].map(k => sizeOf.get(k) + ':' + k)).size;

console.log(`seed ${seed} warp ${warp} — forest ${cells.forest.length} · redwood ${cells.redwood.length} `
          + `· meadow ${cells.meadow.length} · burnt ${cells.burnt.length} · shroom ${cells.shroom.length}`);
const distinct = new Set(); for (const k of woodKeys) distinct.add(sizeOf.get(k));
console.log(`  independent fill: ${woodKeys.size} wood hexes; stand sizes seen: `
          + [...distinct].sort((a, b) => b - a).slice(0, 8).join(', '));

/* hover a sample of each type and cross-check the tooltip's claims */
const tipOf = async (sx, sy) => {
  await page.mouse.move(sx, sy);
  await page.waitForTimeout(40);
  return page.evaluate(() => {
    const t = document.getElementById('tip');
    if (getComputedStyle(t).display === 'none') return null;
    return t.innerText.replace(/\n+/g, ' | ');
  });
};

let checked = 0, bad = 0;
const sample = (arr, n) => arr.filter((_, i) => i % Math.max(1, Math.floor(arr.length / n)) === 0).slice(0, n);

for (const kind of ['forest', 'redwood']) {
  for (const c of sample(cells[kind], 6)) {
    if (c.sx < 0 || c.sx > 1600 || c.sy < 0 || c.sy > 1000) continue;
    const tip = await tipOf(c.sx, c.sy);
    if (!tip) { console.log(`  ${kind} (${c.x},${c.y}) -> NO TOOLTIP`); bad++; continue; }
    // an entity (deer, bird) can win the pick over the tile — skip those
    if (!/Woods|Redwood/.test(tip)) continue;
    checked++;
    const m = tip.match(/Stand\s*\|?\s*(\d+)\s*hex/);
    const truth = sizeOf.get(c.x + ',' + c.y);
    const claim = m ? Number(m[1]) : null;
    const ok = claim === truth;
    if (!ok) bad++;
    console.log(`  ${ok ? 'ok ' : 'BAD'} ${kind} (${c.x},${c.y}) stand claim=${claim} truth=${truth}`);
    console.log(`      ${tip.slice(0, 150)}`);
  }
}

/* canopy + deep-woods claims, graded against the LIVE rule the draw/tick use */
const ruleCheck = await page.evaluate(() => {
  const out = [];
  for (const f of window.__find('forest').slice(0, 400)) {
    out.push({ x: f.x, y: f.y, k: canopyK(f.x, f.y), deep: deepWoods(f.x, f.y),
               stand: standSize(f.x, f.y) });
  }
  const tiers = { Closed: 0, 'Open edge': 0, Thickening: 0 };
  for (const o of out) tiers[o.k >= 4 ? 'Closed' : o.k <= 1 ? 'Open edge' : 'Thickening']++;
  return { tiers, deep: out.filter(o => o.deep).length, n: out.length,
           standAgree: out.every(o => o.stand > 0) };
});
console.log(`  canopy tiers over ${ruleCheck.n} forest hexes:`, ruleCheck.tiers,
            `· deepWoods ${ruleCheck.deep}`);

/* meadow bloom + burnt: does the live row reflect live state? */
for (const kind of ['meadow', 'burnt']) {
  for (const c of sample(cells[kind], 3)) {
    if (c.sx < 0 || c.sx > 1600 || c.sy < 0 || c.sy > 1000) continue;
    const tip = await tipOf(c.sx, c.sy);
    if (tip) console.log(`  ${kind} (${c.x},${c.y}): ${tip.slice(0, 130)}`);
  }
}

/* the CONDITIONAL rows: a row that never fires is a dead rule (iter 107).
   Count the live state, then hover an instance of each if one exists. */
const state = await page.evaluate(() => {
  let bloom = 0, refrac = 0, meadow = 0, shroom = 0, fire = 0;
  for (let i = 0; i < G * G; i++) { const c = cells[i]; if (!c) continue;
    if (c.t === T.MEADOW) { meadow++; if (c.bloom > 0) bloom++; else if (c.bloom < 0) refrac++; }
    if (c.shroom > 0) shroom++;
    if (c.fire > 0) fire++; }
  const pick = pred => { for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)]; if (c && pred(c)) { const [cx, cy] = ctr(x, y);
        return { x, y, sx: cx * scale + offX, sy: cy * scale + offY }; } } return null; };
  return { bloom, refrac, meadow, shroom, fire,
           bloomAt: pick(c => c.t === T.MEADOW && c.bloom > 0),
           shroomAt: pick(c => c.shroom > 0), fireAt: pick(c => c.fire > 0) };
});
console.log(`  live state: meadows ${state.meadow} (in bloom ${state.bloom}, gone over ${state.refrac}) `
          + `· shroom ${state.shroom} · fire ${state.fire}`);
for (const [label, at] of [['bloom', state.bloomAt], ['shroom', state.shroomAt], ['fire', state.fireAt]]) {
  if (!at) { console.log(`  ${label}: none live at this era/season`); continue; }
  const tip = await tipOf(at.sx, at.sy);
  console.log(`  ${label} row @(${at.x},${at.y}): ${tip ? tip.slice(0, 140) : 'OFFSCREEN/NO TIP'}`);
}

/* The state->row mapping is what iter 117 ships; the CA that produces bloom/shroom/
   fire is pre-existing and fires rarely per tick (bloom is rain-cloud seeded, and
   clouds don't move under __warp; shrooms last 3 ticks). So INJECT each state onto a
   known on-screen hex and assert the row appears. This tests my code, not the CA's luck. */
console.log('  --- injected-state rows (the mapping iter 117 adds) ---');
const onScreen = c => c.sx > 60 && c.sx < 1540 && c.sy > 60 && c.sy < 940;
for (const [label, want, setter] of [
  ['meadow bloom', 'In bloom',     `c=>{c.bloom=7}`],
  ['meadow spent', 'Gone over',    `c=>{c.bloom=-5}`],
  ['wood shroom',  'Mushrooms up', `c=>{c.shroom=3}`],
  ['wood fire',    'Burning',      `c=>{c.fire=3}`],
]) {
  const kind = label.startsWith('meadow') ? 'meadow' : 'forest';
  const target = cells[kind].filter(onScreen)[0];
  if (!target) { console.log(`  ${label}: no on-screen ${kind}`); bad++; continue; }
  await page.evaluate(({ x, y, fn }) => {
    const c = cells[idx(x, y)];
    (0, eval)('(' + fn + ')')(c);
    render();
  }, { x: target.x, y: target.y, fn: setter });
  const tip = await tipOf(target.sx, target.sy);
  const hit = tip && tip.includes(want);
  if (!hit) bad++;
  console.log(`  ${hit ? 'ok ' : 'BAD'} ${label} -> expect "${want}": ${tip ? tip.slice(0, 120) : 'NO TIP'}`);
}

/* cross-check standSize (in-page) against the Node fill on EVERY wood hex */
const mismatch = await page.evaluate(keys => {
  const bad = [];
  for (const k of keys) {
    const [x, y] = k.split(',').map(Number);
    bad.push([k, standSize(x, y)]);
  }
  return bad;
}, [...woodKeys]);
let fillBad = 0;
for (const [k, inPage] of mismatch) if (inPage !== sizeOf.get(k)) fillBad++;
console.log(`  FULL CROSS-CHECK: ${mismatch.length} wood hexes, ${fillBad} disagreements `
          + `between in-page standSize() and the independent Node fill`);

console.log(`  pageerrors: ${errs.length}${errs.length ? ' :: ' + errs[0] : ''}`);
console.log(`VERDICT: ${bad === 0 && fillBad === 0 && errs.length === 0 && checked > 0 ? 'PASS' : 'FAIL'} `
          + `(${checked} tooltips cross-checked)`);
await browser.close();
