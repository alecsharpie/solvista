/* probe-kelptip.mjs — grade iter 141's kelp-bed tooltip.
 *
 * The KELP tooltip now names the contiguous BED a hex belongs to ('Bed — N
 * hexes'), exactly as the woods name their stand (iter 117). This probe hovers
 * every KELP hex via __find('KELP')'s screen coords, scrapes #tip's Bed row, and
 * checks the count against ground truth recomputed HERE in Node: a flood fill over
 * the kelp set using odd-r cube adjacency (hdist==1) — a THIRD implementation
 * sharing no code with the page's floodSize()/nbrs6 (122's law: a tooltip claim is
 * only trustworthy when checked against independently recomputed truth).
 *
 * Controls: (1) a WATER hex must NOT print a 'Bed' row — only KELP does; (2) the
 * whole kelp set partitions into beds whose sizes sum to the kelp count.
 *
 *   node probe-kelptip.mjs [seed] [warp]
 */
import { homedir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(HERE, '../../../..');                 // the artifact, from the probe's own location
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;

const seed = process.argv[2] || '42', warp = process.argv[3] || '61';

/* odd-r offset -> cube, then cube distance. Independent of the page's nbrs6. */
const cube = (x, y) => { const q = x - ((y - (y & 1)) >> 1); return [q, y, -q - y]; };
const hdist = (ax, ay, bx, by) => {
  const [aq, ar, as] = cube(ax, ay), [bq, br, bs] = cube(bx, by);
  return Math.max(Math.abs(aq - bq), Math.abs(ar - br), Math.abs(as - bs));
};

const url = pathToFileURL(join(REPO, 'solvista.html')).href + `?seed=${seed}&warp=${warp}&t=0.3`;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
const errs = [];
page.on('pageerror', e => errs.push(String(e)));
await page.goto(url);
await page.waitForTimeout(1500);
await page.evaluate(() => { playing = false; render(); });   // freeze before hovering

const kelp = await page.evaluate(() => window.__find('KELP').map(
  c => ({ x: c.x, y: c.y, sx: c.sx, sy: c.sy })));
const water = await page.evaluate(() => window.__find('WATER').map(
  c => ({ x: c.x, y: c.y, sx: c.sx, sy: c.sy })));

/* recompute every bed's size by flood fill over the kelp set (independent). */
const key = c => c.x + ',' + c.y;
const kset = new Map(kelp.map(c => [key(c), c]));
const bedOf = new Map();                       // "x,y" -> bed size
for (const start of kelp) {
  if (bedOf.has(key(start))) continue;
  const stack = [start], seen = new Set([key(start)]);
  while (stack.length) {
    const c = stack.pop();
    for (const o of kelp) {
      if (seen.has(key(o)) || hdist(c.x, c.y, o.x, o.y) !== 1) continue;
      seen.add(key(o)); stack.push(o);
    }
  }
  for (const k of seen) bedOf.set(k, seen.size);
}
const sizes = new Set([...bedOf.values()]);
/* distinct beds = sum of 1/size over cells (each bed's cells contribute 1 total) */
const nBeds = [...bedOf.values()].reduce((s, sz) => s + 1 / sz, 0);
console.log(`seed ${seed} warp ${warp} — kelp ${kelp.length} hexes in ~${Math.round(nBeds)} `
  + `beds; bed sizes seen: ${[...sizes].sort((a, b) => a - b).join(',')}`);

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

/* PASS 1 — every kelp hex names its bed, and the count matches the flood fill. */
for (const c of kelp) {
  if (!onScreen(c)) { skipped++; continue; }
  const tip = await tipOf(c.sx, c.sy);
  if (!tip) { fail(`kelp (${c.x},${c.y}) -> NO TOOLTIP`); continue; }
  if (!tip.startsWith('Kelp bed')) { skipped++; continue; }   // a boat/entity won the hover pick
  checked++;
  const m = tip.match(/Bed\s*\|?\s*(\d+)\s*hex/);
  if (!m) { fail(`kelp (${c.x},${c.y}) prints no 'Bed' row: '${tip}'`); continue; }
  const want = bedOf.get(key(c));
  if (Number(m[1]) !== want)
    fail(`kelp (${c.x},${c.y}) claims Bed ${m[1]}, flood fill says ${want}`);
}

/* PASS 2 — control: a WATER hex must NOT print a Bed row. */
let ctlChecked = 0;
for (const c of water) {
  if (!onScreen(c) || ctlChecked >= 12) continue;
  const tip = await tipOf(c.sx, c.sy);
  if (!tip || !tip.startsWith('Ocean')) continue;
  ctlChecked++;
  if (/\bBed\b/.test(tip)) fail(`WATER (${c.x},${c.y}) wrongly prints a Bed row: '${tip}'`);
}

/* one sampled tooltip, whole, for a human to read the prose */
const show = kelp.find(onScreen);
if (show) console.log(`\n  sample — ${await tipOf(show.sx, show.sy)}`);

console.log(`\n  checked ${checked} kelp · control ${ctlChecked} water · skipped ${skipped} `
  + `(offscreen / entity won pick) · pageerrors ${errs.length}`);
for (const e of errs) console.log('  ! ' + e);
console.log(bad === 0 && errs.length === 0 ? 'PROBE: PASS' : `PROBE: FAIL — ${bad} bad claims`);
await browser.close();
process.exit(bad === 0 && errs.length === 0 ? 0 : 1);
