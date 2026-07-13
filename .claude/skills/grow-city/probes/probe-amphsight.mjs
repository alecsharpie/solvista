#!/usr/bin/env node
/* probe-amphsight.mjs — iter 244. THE BOWL'S SIGHTLINE.
 *
 * The amphitheater's cavea is drawn facing straight up-screen and CANNOT be turned: a
 * circle on the ground projects to a wide shallow ellipse here, so the seating only
 * reads as a rake while it is the NEAR half of it. (Built, shot, and reverted — two
 * agents on two seeds called the turned bowl "a spilled cream blob".)
 *
 * So the SITE must come to the bowl. The siting rule scored groundLoad — the rows at
 * dy=+1/+2 — which keeps the flat bowl from being buried, and is right. But the audience
 * looks the OTHER way, and nothing had ever scored what stands there (240: two gates on
 * one feature, pointing opposite ways).
 *
 * A view is a PREFERENCE, not a gate (206), and a preference on a pool must be priced on
 * BOTH ledgers in one run: the EFFECT (what the house looks at) and the COST TO THE
 * POPULATION (is the bowl still placed, and is it still visible?). AMPHVIEW=0 IS HEAD, so
 * the control is exact and costs nothing to carry.
 *
 * Pure world data: no render, no clock, no noise floor.
 */
import { homedir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execSync } from 'node:child_process';
import { writeFileSync, unlinkSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = [join(HERE, '../../../../solvista.html'), join(HERE, 'solvista.html')]
  .find(p => { try { execSync(`test -f "${p}"`); return true; } catch { return false; } });

const SEEDS = [7, 42, 1234, 99, 2024, 555, 31337, 8, 2600, 77];
const KS = [0, 3, 4, 5, 6, 7, 8, 10];

const b = await chromium.launch();
const open = async (file) => {
  const p = await b.newPage();
  await p.addInitScript(() => {
    let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  });
  await p.goto(pathToFileURL(file).href);
  await p.waitForFunction(() => typeof genWorld === 'function');
  return p;
};
const page = await open(ART);

/* Re-run the siting scan for a candidate weight, on the world as the RULE sees it (2004),
   then read the chosen lot's fate in the world that actually RENDERS (2035) — 231's law:
   a sweep that grades on state the rule cannot observe is a leak, not a sweep. */
const rows = await page.evaluate(([seeds, ks]) => {
  const out = [];
  for (const seed of seeds) {
    /* the 2004 terrain the rule runs on */
    playing = false; genWorld(seed); __warp(30);          /* ~2004 */
    const cand = [];
    for (let i = 0; i < G * G; i++) {
      const x = i % G, y = (i / G) | 0, c = cells[i];
      if (!c) continue;
      if ((c.t === T.EMPTY || c.t === T.RES) && roadNear(x, y)
        && countAround(x, y, 2, n => n.t === T.PARK || n.t === T.PLAZA) > 0) {
        /* split the sightline into its two mechanisms: the WALL it must not face, and the
           VIEW it might seek. They are different rules and they do not cost the same. */
        let wall = 0, view = 0;
        for (const r of [2, 3]) {
          let px = x, py = y;
          for (let k = 1; k <= 5; k++) {
            [px, py] = RAY6[r].s(px, py);
            const q = cellAt(px, py); if (!q || q.t === T.VOID) break;
            const w = 1 / k / 2;
            view += (WETSET.has(q.t) ? 3 : GREENV.has(q.t) ? 1.5 : 0) / k / 2;
            /* the wall, at what the lot WILL be (231) — the shipped rule no longer reads
               this; variant B is what proved it a dead lever, so it stays as the control */
            const qh = q.th || (TREET.has(q.t) ? TREEH : (RAISEABLE.has(q.t) ? FUTUREH : 0));
            wall += w * qh / 30;
          }
        }
        cand.push({ x, y, gl: groundLoad(x, y), wall, view, h: hashCell(x, y, seedNum ^ 0x0A44) });
      }
    }
    /* the 2035 world it will be looked at in */
    genWorld(seed); __warp(61);
    const per = {};
    /* A = seek the view AND avoid the wall · B = ONLY avoid the wall · C = ONLY seek the view */
    const SC = { A: (c, k) => c.gl - k * (c.view - c.wall), B: (c, k) => c.gl - k * (-c.wall), C: (c, k) => c.gl - k * c.view };
    for (const v of ['A', 'B', 'C']) for (const k of ks) {
      let best = null, bs = 1e9;
      for (const c of cand) {
        const s = SC[v](c, k) + c.h;
        if (s < bs) { bs = s; best = c; }
      }
      if (!best) { per[v + k] = null; continue; }
      per[v + k] = {
        sight2035: amphSight(best.x, best.y),          /* the view as RENDERED */
        gl2035: groundLoad(best.x, best.y),            /* the burial as RENDERED */
        view: amphView(best.x, best.y),
      };
    }
    out.push({ seed, pool: cand.length, per });
  }
  return out;
}, [SEEDS, KS]);

console.log('\n=== TWO LEDGERS. effect: what the house looks at. cost: is it buried? ===');
console.log('AMPHVIEW=0 IS HEAD (exact control). sight = +3/hex water, +1.5 green, -h/30 building,');
console.log('nearer counts more. gl = groundLoad in the 2035 frame (lower = less buried).');
console.log('Both columns are read at 2035 — the world that RENDERS (231).\n');
console.log('BURIAL LIVES IN THE TAILS, not the mean (241) — a mean gl of 7 can hide one buried bowl.');
console.log('worst = the most-buried seed. buried = seeds with gl > 20. 231 exists to keep these at 0.\n');
const NAME = { A: 'A seek view + avoid wall', B: 'B ONLY avoid the wall  ', C: 'C ONLY seek the view   ' };
console.log('variant                    K   sight   gl mean   gl WORST   buried   water  parkland  ROOFTOPS');
for (const v of ['A', 'B', 'C']) {
  for (const k of KS) {
    const rs = rows.map(r => r.per[v + k]).filter(Boolean);
    if (!rs.length) continue;
    const mean = f => rs.reduce((a, x) => a + f(x), 0) / rs.length;
    const cnt = w => rs.filter(x => x.view === w).length;
    const worst = Math.max(...rs.map(x => x.gl2035));
    const buried = rs.filter(x => x.gl2035 > 20).length;
    const tag = k === 0 ? '  (= HEAD)' : '';
    console.log(`${NAME[v]}  ${String(k).padStart(3)}  ${mean(x => x.sight2035).toFixed(2).padStart(6)}   ` +
      `${mean(x => x.gl2035).toFixed(1).padStart(7)}   ${worst.toFixed(0).padStart(8)}   ${String(buried).padStart(6)}   ` +
      `${String(cnt('the water')).padStart(5)}  ${String(cnt('the parkland')).padStart(8)}  ${String(cnt('the rooftops')).padStart(8)}${tag}`);
  }
  console.log('');
}

/* ---------------------------------------------------------------------------
   THE SWEEP ABOVE RANKS VARIANTS INSIDE ONE WORLD — which is right for ranking, and is
   NOT the shipped answer. The rule sites a cell at 2004, and that cell reshuffles the
   seeded stream for thirty years, so the world each K produces is not the world the sweep
   scored it in. So END-TO-END: build HEAD and build the patch, let each grow its own city,
   and ask each where its own bowl ended up and what it can see. This is the claim.
   --------------------------------------------------------------------------- */
const HEADF = join(dirname(ART), '.amphsight-head.html');
writeFileSync(HEADF, execSync(`git -C "${dirname(ART)}" show HEAD:solvista.html`, { maxBuffer: 1 << 28 }));

const bowlOf = (p) => p.evaluate((seeds) => seeds.map(seed => {
  playing = false; genWorld(seed); __warp(61);
  let ai = -1;
  for (let i = 0; i < G * G; i++) { const c = cells[i]; if (c && c.t === T.CIVIC && c.kind === 'amphitheater') { ai = i; break; } }
  if (ai < 0) return { seed, placed: false };
  const x = ai % G, y = (ai / G) | 0;
  /* HEAD has no amphView(): walk the two up-screen rays by hand so BOTH builds are read
     by the SAME code, and neither is graded by its own definition */
  const RAY = [(x, y) => [x + ((y & 1) ? 1 : 0), y - 1], (x, y) => [x - ((y & 1) ? 0 : 1), y - 1]];
  const GRN = new Set([T.PARK, T.SHOREPARK, T.PLAZA, T.FOREST, T.REDWOOD, T.GARDEN, T.QUAD]);
  let water = false, green = false, sight = 0;
  for (const step of RAY) {
    let px = x, py = y;
    for (let k = 1; k <= 5; k++) {
      [px, py] = step(px, py);
      const q = cellAt(px, py); if (!q || q.t === T.VOID) break;
      if (WETSET.has(q.t)) water = true;
      if (GRN.has(q.t)) green = true;
      sight += (WETSET.has(q.t) ? 3 : GRN.has(q.t) ? 1.5 : 0) / k / 2;
    }
  }
  return { seed, placed: true, x, y, gl: groundLoad(x, y), sight, view: water ? 'water' : green ? 'parkland' : 'ROOFTOPS' };
}), SEEDS);

const pHead = await open(HEADF);
const H = await bowlOf(pHead), P = await bowlOf(page);
await b.close();
unlinkSync(HEADF);

console.log('=== END-TO-END: each build grows its OWN city. THIS IS THE CLAIM. ===\n');
console.log('seed     placed        sight HEAD -> patch      groundLoad (burial)      what it looks at');
for (let i = 0; i < SEEDS.length; i++) {
  const h = H[i], p = P[i];
  if (!h.placed || !p.placed) { console.log(`${SEEDS[i]}: NOT PLACED (head ${h.placed} patch ${p.placed})`); continue; }
  const moved = (h.x !== p.x || h.y !== p.y) ? '' : '   (same lot)';
  console.log(`${String(h.seed).padStart(5)}    ${h.placed && p.placed ? 'yes/yes' : '!!'}      ` +
    `${h.sight.toFixed(2).padStart(5)} -> ${p.sight.toFixed(2).padStart(5)}        ` +
    `${String(h.gl.toFixed(0)).padStart(4)} -> ${String(p.gl.toFixed(0)).padStart(4)}            ` +
    `${h.view.padEnd(8)} -> ${p.view}${moved}`);
}
const ms = a => a.reduce((s, x) => s + x, 0) / a.length;
const rf = (a, v) => a.filter(x => x.view === v).length;
console.log(`\nplaced          ${H.filter(x => x.placed).length}/${SEEDS.length}  ->  ${P.filter(x => x.placed).length}/${SEEDS.length}   (a preference, never a gate — the bowl can never be lost)`);
console.log(`mean sight      ${ms(H.map(x => x.sight)).toFixed(2)}  ->  ${ms(P.map(x => x.sight)).toFixed(2)}`);
console.log(`mean groundLoad ${ms(H.map(x => x.gl)).toFixed(1)}  ->  ${ms(P.map(x => x.gl)).toFixed(1)}      WORST ${Math.max(...H.map(x => x.gl)).toFixed(0)} -> ${Math.max(...P.map(x => x.gl)).toFixed(0)}`);
console.log(`faces ROOFTOPS  ${rf(H, 'ROOFTOPS')}/${SEEDS.length}  ->  ${rf(P, 'ROOFTOPS')}/${SEEDS.length}      <- the defect`);
console.log(`faces water     ${rf(H, 'water')}/${SEEDS.length}  ->  ${rf(P, 'water')}/${SEEDS.length}`);
console.log(`faces parkland  ${rf(H, 'parkland')}/${SEEDS.length}  ->  ${rf(P, 'parkland')}/${SEEDS.length}`);
