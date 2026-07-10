/* iter 105 — verify the hovered-transit ROUTE TRACE.
   hovershot.mjs clips ~150px around the entity, which is right for a focus ring
   and useless for a feature whose whole point is city-scale EXTENT: a monorail
   loop can be 183 spans. So shoot the FULL 1440x900 frame, hovered vs control,
   and let the pair prove the trace appears only on hover.

   Two traps this probe exists to dodge, both of which silently produce a
   "hovered a Street" frame that looks like a FAIL of the feature:
     - trains and cabins MOVE. Coords sampled before the control screenshot are
       ~1s stale by the time the cursor arrives. Re-sample, move, and VERIFY the
       tooltip title is the entity before shooting; retry on the fresh coords.
     - __ents returns SCREEN coords (e._sx*scale+offX); e._sx alone is world.
   usage: node probe-lineshot.mjs '<query>' '<Entity name>' <outdir> [--longest] */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright/index.mjs';
import { mkdirSync } from 'fs';
import { resolve } from 'path';

const [query, entName, outDir] = process.argv.slice(2);
const longest = process.argv.includes('--longest');
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const errs = [];
page.on('pageerror', e => errs.push(String(e)));
await page.goto('file://' + resolve('solvista.html') + '?' + query);
await page.waitForTimeout(2500);

// --longest: hover a car on the line with the most spans, so the trace is a real
// city-crossing route and not a stubby 2-span loop that would prove nothing.
let lineIdx = -1;
if (longest) {
  const r = await page.evaluate(() => window.__rail());
  const closedLens = r.lens.map((L, i) => ({ L, i })).filter(o => o.L > 2);
  lineIdx = closedLens.sort((a, b) => b.L - a.L)[0].i;
  console.log(`line lens=${JSON.stringify(r.lens)} -> hovering line ${lineIdx}`);
}
// live screen coords of the candidate cars, re-read fresh on every attempt
const sample = () => page.evaluate(({ n, li }) => {
  const vis = e => e._sf !== undefined;
  const scr = e => ({ sx: e._sx * scale + offX, sy: e._sy * scale + offY });
  if (li >= 0) return monos[li] && monos[li].closed ? monos[li].trains.filter(vis).map(scr) : [];
  return window.__ents(n);
}, { n: entName, li: lineIdx });

const first = await sample();
if (!first.length) { console.log('NO ENTITY: ' + entName); await browser.close(); process.exit(1); }
// prefer a car near frame center, away from the HUD
const rank = a => Math.hypot(a.sx - 700, a.sy - 430);
let target = first.filter(e => e.sx > 200 && e.sx < 1240 && e.sy > 120 && e.sy < 780).sort((a, b) => rank(a) - rank(b))[0] || first[0];
const idx = first.indexOf(target);

// control first: cursor parked far away -> there must be NO trace anywhere
await page.mouse.move(20, 20);
await page.waitForTimeout(400);
await page.screenshot({ path: `${outDir}/00-control-nohover.png` });

const title = () => page.evaluate(() => {
  const t = document.getElementById('tip');
  if (t.style.display !== 'block') return '(none)';
  const h = t.querySelector('.tt');
  return h ? h.innerText : '(none)';
});
let ok = false, tip = '';
for (let attempt = 0; attempt < 8 && !ok; attempt++) {
  const now = await sample();
  const p = now[idx] || now[0];
  if (!p) break;
  await page.mouse.move(p.sx, p.sy);
  await page.waitForTimeout(140);
  if ((await title()) === entName) { ok = true; target = p; }
}
if (!ok) { console.log(`MISSED: cursor never landed on a ${entName}`); await browser.close(); process.exit(1); }

await page.screenshot({ path: `${outDir}/01-hover-fullframe.png` });
tip = await page.evaluate(() => document.getElementById('tip').innerText.replace(/\n+/g, ' | '));
console.log(`entity=${entName} n=${first.length} hovered at ${target.sx.toFixed(0)},${target.sy.toFixed(0)}`);
console.log(`tooltip: ${tip}`);
console.log(`pageerrors: ${errs.length ? errs.join(' ; ') : 'none'}`);
await browser.close();
