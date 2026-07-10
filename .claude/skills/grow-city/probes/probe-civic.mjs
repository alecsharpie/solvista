/* probe-civic.mjs — grade iter 122's civic tooltip.
 *
 * Hovers every CIVIC / PLAZA / QUAD hex via __find()'s screen coords, scrapes
 * #tip, and checks every CLAIM against ground truth recomputed HERE in Node
 * (cube distance from the offset coords — a third implementation, sharing no
 * code with the page's countAround() or hexDist()):
 *   - "Civic quarter: N institutions"  vs majors within QFAR=4 of this major
 *   - "Fronts a paved forecourt"       vs a PLAZA on a direct neighbour
 *   - "Keeps its own grounds behind"   vs a QUAD on a direct neighbour
 *   - "One of N schools"               vs the count of that kind
 *   - title "<X> forecourt" / "<X> grounds" vs the adjoining eligible institution
 *     (iter 140 moved the owner from a 'Forecourt of X' data row into the headline)
 *   - and: no civic still answers the old flat 'A public institution.'
 * A tooltip that claims a quarter, a square or a lawn the geometry disagrees
 * with is a lie — that is the whole point (iter 112: a predicate with three
 * readers will have three answers).
 *
 *   node probe-civic.mjs [seed] [warp]
 */
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;

const seed = process.argv[2] || '42', warp = process.argv[3] || '61';
const QFAR = 4;
const KINDS = ['hall','school','library','police','firehouse','museum','hospital',
               'observatory','parliament','university','aquarium','amphitheater'];
const MAJORK = new Set(['hall','museum','parliament','university','library']);
const GROUNDS = new Set(['hall','museum','parliament','university','library','hospital','school']);
const LABEL = {hall:'Town hall',school:'School',library:'Library',police:'Police station',
  firehouse:'Firehouse',museum:'Museum',hospital:'Hospital',observatory:'Observatory',
  parliament:'Parliament',university:'University',aquarium:'Aquarium',amphitheater:'Amphitheater'};

/* odd-r offset -> cube, then cube distance. Independent of the page's code. */
const cube = (x, y) => { const q = x - ((y - (y & 1)) >> 1); return [q, y, -q - y]; };
const hdist = (ax, ay, bx, by) => {
  const [aq, ar, as] = cube(ax, ay), [bq, br, bs] = cube(bx, by);
  return Math.max(Math.abs(aq - bq), Math.abs(ar - br), Math.abs(as - bs));
};
const adj = (ax, ay, bx, by) => hdist(ax, ay, bx, by) === 1;

const url = pathToFileURL(process.cwd() + '/solvista.html').href
          + `?seed=${seed}&warp=${warp}&t=0.3`;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
const errs = [];
page.on('pageerror', e => errs.push(String(e)));
await page.goto(url);
await page.waitForTimeout(1500);
await page.evaluate(() => { playing = false; render(); });   // freeze before hovering

const grab = async n => page.evaluate(k => window.__find(k).map(
  c => ({ x: c.x, y: c.y, sx: c.sx, sy: c.sy })), n);

const civ = {};
for (const k of KINDS) civ[k] = await grab(k);
const plaza = await grab('plaza'), quad = await grab('quad');
const all = KINDS.flatMap(k => civ[k].map(c => ({ ...c, kind: k })));
const majors = all.filter(c => MAJORK.has(c.kind));

console.log(`seed ${seed} warp ${warp} — civics ${all.length} (majors ${majors.length}) `
          + `· plaza ${plaza.length} · quad ${quad.length}`);
console.log('  ' + KINDS.map(k => `${k} ${civ[k].length}`).filter(s => !/ 0$/.test(s)).join(' · '));

const tipOf = async (sx, sy) => {
  await page.mouse.move(sx, sy);
  await page.waitForTimeout(40);
  return page.evaluate(() => {
    const t = document.getElementById('tip');
    if (getComputedStyle(t).display === 'none') return null;
    return t.innerText.replace(/\n+/g, ' | ');
  });
};
const onScreen = c => c.sx > 4 && c.sx < 1596 && c.sy > 4 && c.sy < 996;

let checked = 0, bad = 0, skipped = 0;
const fail = (m) => { console.log('    ✗ ' + m); bad++; };

/* PASS 1 — the squares. Each names the institution it was laid for; check that
   institution is ADJACENT and ELIGIBLE, and remember the claim so pass 2 can
   check the institution agrees from its own side. */
const namedBy = new Map();          // "x,y" of square -> label it printed
/* a square we could not READ (offscreen, or a ped standing on it won the hover
   pick — QUAD is in PEDDEST) tells us nothing. Pass 2 must not read its silence
   as "no square names this institution": iter 111's law, one level up — "not
   drawn" and "not readable" are not the same observation. */
const unread = new Set();
for (const [arr, name, suffix, set, tname] of
     [[plaza, 'Plaza', ' forecourt', MAJORK, 'forecourt'],
      [quad,  'Quad',  ' grounds',   GROUNDS, 'grounds']]) {
  for (const s of arr) {
    if (!onScreen(s)) { skipped++; unread.add(s.x + ',' + s.y); continue; }
    const tip = await tipOf(s.sx, s.sy);
    /* the headline is the first segment; a square reads either the generic label
       (ownerless / owner rebuilt) or '<Institution> forecourt|grounds'. Anything
       else means a ped/entity on the square won the hover pick — tells us nothing. */
    const title = tip ? tip.split(' | ')[0].trim() : null;
    const owned = title && title.endsWith(suffix);
    if (!title || (title !== name && !owned)) { skipped++; unread.add(s.x + ',' + s.y); continue; }
    checked++;
    const nbrs = all.filter(c => adj(s.x, s.y, c.x, c.y));
    const eligible = nbrs.filter(c => set.has(c.kind));
    if (!owned) {   // generic label — names nobody
      if (eligible.length) console.log(`    · ${name} (${s.x},${s.y}) names nobody `
        + `(adjoins ${eligible.map(e => e.kind)}) — laid by the pre-2020 rule, or owner rebuilt`);
      continue;
    }
    const label = title.slice(0, -suffix.length).trim();
    namedBy.set(s.x + ',' + s.y, { label, tname });
    const owner = eligible.find(c => LABEL[c.kind] === label);
    if (!owner) fail(`${name} (${s.x},${s.y}) headline names '${label}' — not an eligible neighbour `
                   + `(adjoins ${nbrs.map(c => c.kind).join(',') || 'nothing'})`);
    /* a paved square has no roof: only drawBuilding paints panels, and it never
       runs on PLAZA/QUAD. The flag survives the conversion; the tooltip must not. */
    if (/Rooftop solar|Green roof/.test(tip))
      fail(`${name} (${s.x},${s.y}) claims a roof: '${tip}'`);
  }
}

for (const c of all) {
  if (!onScreen(c)) { skipped++; continue; }
  const tip = await tipOf(c.sx, c.sy);
  if (!tip) { fail(`${c.kind} (${c.x},${c.y}) -> NO TOOLTIP`); continue; }
  if (!tip.startsWith(LABEL[c.kind])) { skipped++; continue; }   // an entity won the pick
  checked++;

  if (/A public institution/.test(tip)) fail(`${c.kind} still says 'A public institution.'`);

  /* quarter */
  const peers = majors.filter(m => !(m.x === c.x && m.y === c.y)
                                && hdist(c.x, c.y, m.x, m.y) <= QFAR).length;
  const mq = tip.match(/Civic quarter\s*\|?\s*(\d+) institutions/);
  const wantQ = MAJORK.has(c.kind) && peers > 0;
  if (wantQ && !mq) fail(`${c.kind} (${c.x},${c.y}) has ${peers} peers, tooltip claims no quarter`);
  if (!wantQ && mq) fail(`${c.kind} (${c.x},${c.y}) claims a quarter; peers=${peers} major=${MAJORK.has(c.kind)}`);
  if (wantQ && mq && Number(mq[1]) !== peers + 1)
    fail(`${c.kind} (${c.x},${c.y}) claims ${mq[1]} institutions, geometry says ${peers + 1}`);

  /* forecourt / grounds — the two sides of the relation must agree. The square
     named an institution; this institution must claim exactly the squares that
     named it. (A kind with two instances could be ambiguous by label alone, so
     only assert when this civic is the sole adjacent one of its kind.) */
  const owns = t => [...namedBy.entries()].filter(([k, v]) =>
    v.tname === t && v.label === LABEL[c.kind] && adj(c.x, c.y, ...k.split(',').map(Number)));
  const twinAdj = s => s.some(o => o !== c && o.kind === c.kind
    && [...namedBy.keys()].some(k => adj(o.x, o.y, ...k.split(',').map(Number))));
  for (const [t, re, label, arr] of
       [['forecourt', /Fronts a paved forecourt/, 'forecourt', plaza],
        ['grounds', /Keeps its own grounds behind/, 'grounds', quad]]) {
    const blind = arr.some(s => adj(c.x, c.y, s.x, s.y) && unread.has(s.x + ',' + s.y));
    if (blind) { skipped++; continue; }              // an adjacent square went unread
    const says = re.test(tip), mine = owns(t).length > 0;
    if (says !== mine && !twinAdj(all.filter(o => o.kind === c.kind)))
      fail(`${c.kind} (${c.x},${c.y}) ${label}: tooltip says ${says}, but ${owns(t).length} `
         + `square(s) name it`);
  }

  /* one of N */
  const n = civ[c.kind].length;
  const mo = tip.match(/One of\s*\|?\s*(\d+)/);
  if (n > 1 && !mo) fail(`${c.kind} x${n} but no 'One of'`);
  if (n === 1 && mo) fail(`${c.kind} is unique but claims 'One of ${mo[1]}'`);
  if (n > 1 && mo && Number(mo[1]) !== n) fail(`${c.kind} claims 'One of ${mo[1]}', found ${n}`);
}

/* one sampled tooltip, printed whole, so a human can read the prose */
const show = all.find(c => c.kind === 'library' && onScreen(c)) || all.find(onScreen);
if (show) console.log(`\n  sample — ${await tipOf(show.sx, show.sy)}`);

console.log(`\n  checked ${checked} · skipped ${skipped} (offscreen / entity won the pick) · pageerrors ${errs.length}`);
for (const e of errs) console.log('  ! ' + e);
console.log(bad === 0 && errs.length === 0 ? 'PROBE: PASS' : `PROBE: FAIL — ${bad} bad claims`);
await browser.close();
process.exit(bad === 0 && errs.length === 0 ? 0 : 1);
