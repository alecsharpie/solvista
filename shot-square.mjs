/* Iter 114 (throwaway): magnify the civic square using the artifact's own camera.
   Centres on the midpoint of a head+annex pair, so the whole square is in frame.
   node shot-square.mjs <seed> <zoomSteps> <out.png> */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright/index.mjs';
import path from 'path';

const [seed = '42', steps = '5', out = 'square.png'] = process.argv.slice(2);
const url = 'file://' + path.resolve('solvista.html') + `?seed=${seed}&warp=61&t=0.3`;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 800 }, deviceScaleFactor: 3 });
await p.goto(url);
await p.waitForTimeout(1200);

/* the square = the largest PLAZA patch; aim at its centroid */
const target = await p.evaluate(() => {
  const seen = new Set(), patches = [];
  for (const i of HEXI) {
    if (cells[i].t !== T.PLAZA || seen.has(i)) continue;
    const st = [i]; seen.add(i); const cs = [];
    while (st.length) {
      const j = st.pop(); const x = j % G, y = (j / G) | 0; cs.push([x, y]);
      nbrs6(x, y, (mx, my) => { const m = cellAt(mx, my); if (!m || m.t !== T.PLAZA) return;
        const k = idx(mx, my); if (seen.has(k)) return; seen.add(k); st.push(k); });
    }
    patches.push(cs);
  }
  patches.sort((a, b) => b.length - a.length);
  if (!patches[0]) return null;
  const best = patches[0];
  return { n: best.length, cells: best, sizes: patches.map(p => p.length) };
});
if (!target) { console.error('no PLAZA'); process.exit(1); }
console.log(`seed ${seed}: patch sizes [${target.sizes.join(', ')}], aiming at the ${target.n}-hex square`);

const aim = await p.evaluate(cs => {
  let sx = 0, sy = 0;
  for (const [x, y] of cs) { const s = window.__find('PLAZA').find(f => f.x === x && f.y === y); if (s) { sx += s.sx; sy += s.sy; } }
  return { sx: sx / cs.length, sy: sy / cs.length };
}, target.cells);

await p.mouse.move(aim.sx, aim.sy);
for (let i = 0; i < +steps; i++) { await p.mouse.wheel(0, -400); await p.waitForTimeout(90); }
await p.waitForTimeout(700);

const now = await p.evaluate(cs => {
  const all = window.__find('PLAZA');
  let sx = 0, sy = 0, n = 0;
  for (const [x, y] of cs) { const s = all.find(f => f.x === x && f.y === y); if (s) { sx += s.sx; sy += s.sy; n++; } }
  return { sx: sx / n, sy: sy / n };
}, target.cells);

const cx = Math.max(170, Math.min(1030, now.sx)), cy = Math.max(140, Math.min(660, now.sy));
await p.screenshot({ path: out, clip: { x: cx - 170, y: cy - 140, width: 340, height: 280 } });
console.log('->', out);
await b.close();
