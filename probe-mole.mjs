import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright/index.mjs';
const url = p => 'file:///Users/alec/me/solvista-grow/solvista.html?' + p;
const b = await chromium.launch();
let bad = 0, none = 0;
const NB_E = [[1,0],[-1,0],[0,-1],[-1,-1],[0,1],[-1,1]];
const NB_O = [[1,0],[-1,0],[1,-1],[0,-1],[1,1],[0,1]];
for (const seed of [7, 42, 1234, 5, 99, 3, 11, 77, 128, 256, 512, 900, 2024, 31337, 8, 64]) {
  const pg = await b.newPage({ viewport: { width: 1600, height: 1000 } });
  await pg.goto(url(`seed=${seed}&warp=61&t=0.3`));
  await pg.waitForTimeout(700);
  const r = await pg.evaluate(() => {
    const path = [...moleSet.entries()].map(([i, m]) => ({ x: i % G, y: (i / G) | 0, ...m }))
      .sort((a, b) => a.i - b.i);
    if (!path.length) return { n: 0 };
    const r0 = path[0];
    const west = cellAt(r0.x - 1, r0.y);
    return {
      n: path.length,
      path: path.map(p => [p.x, p.y]),
      rootTouchesLand: !!west && west.t !== T.WATER,
      heads: path.filter(p => p.head).length,
      shipInside: (() => {
        const f = freighters.find(f => f.anchored); if (!f) return null;
        const fx = seaXFr(f.y, f.fr);
        const arm = path.filter(p => Math.abs(p.y - f.y) < 1.5);
        return arm.length ? fx < Math.max(...arm.map(p => p.x)) : 'no-arm-on-row';
      })(),
    };
  });
  // contiguity: every consecutive pair must be hex neighbours
  let gap = null;
  if (r.n) for (let i = 1; i < r.path.length; i++) {
    const [ax, ay] = r.path[i - 1], [bx, by] = r.path[i];
    const dirs = (ay & 1) ? NB_O : NB_E;
    if (!dirs.some(d => ax + d[0] === bx && ay + d[1] === by)) { gap = [r.path[i - 1], r.path[i]]; break; }
  }
  if (!r.n) none++;
  if (gap) bad++;
  console.log(String(seed).padStart(6), 'n=' + String(r.n).padStart(2),
    'root-on-land=' + r.rootTouchesLand, 'heads=' + r.heads,
    'shipInside=' + r.shipInside, gap ? 'GAP ' + JSON.stringify(gap) : 'contiguous');
  await pg.close();
}
console.log(`\n${bad} seeds with gaps, ${none} seeds with no mole`);
await b.close();
