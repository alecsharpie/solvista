import { homedir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = join(HERE, '../../../../solvista.html');
const seed = +(process.argv[2] || 7);
const outdir = join(HERE, '..', 'shots');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 3 });
await page.goto(pathToFileURL(ART).href);
await page.waitForTimeout(500);

// find a park-lawn cluster to aim at (a PARK hex in the picnic v-band with the most PARK neighbours)
const aim = await page.evaluate((seed) => {
  playing = false; genWorld(seed); __warp(61); __setYear(2035.62); __setTime(0.52); render();
  let best = null, bestN = -1;
  for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
    const c = cells[idx(x, y)];
    if (!c || c.t !== T.PARK) continue;
    let n = 0; for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) { const m = cells[idx(x + dx, y + dy)]; if (m && (m.t === T.PARK || m.t === T.SHOREPARK)) n++; }
    if (n > bestN) { bestN = n; best = { x, y }; }
  }
  const [cx, cy] = ctr(best.x, best.y);
  return { x: best.x, y: best.y, sx: cx * scale + offX, sy: cy * scale + offY, LITAMT };
}, seed);

async function frame(tag, yr) {
  const info = await page.evaluate(({ seed, yr }) => {
    playing = false; genWorld(seed); __warp(61); __setYear(yr); __setTime(0.52);
    lastSky = 0; syncSky(performance.now()); syncStats(); render();
    return { LITAMT, bp: beachPhase(), season: ((yr % 1) + 1) % 1 };
  }, { seed, yr });
  const w = 300, h = 260;
  const x = Math.max(0, Math.round(aim.sx - w / 2)), y = Math.max(0, Math.round(aim.sy - h / 2));
  await page.screenshot({ path: join(outdir, `parkseason_s${seed}_${tag}.png`), clip: { x, y, width: w, height: h } });
  await page.screenshot({ path: join(outdir, `parkseason_s${seed}_${tag}_city.png`), clip: { x: 300, y: 120, width: 1000, height: 760 } });
  console.log(`${tag}: bp=${info.bp.toFixed(2)} LITAMT=${info.LITAMT.toFixed(2)} s=${info.season.toFixed(2)}`);
}
// non-ordinal, crossed by seed (238/268): summer/winter tokens vary which file is which
const map = seed % 2 === 0 ? { alpha: 2035.62, bravo: 2035.10 } : { bravo: 2035.62, alpha: 2035.10 };
await frame('alpha', map.alpha);
await frame('bravo', map.bravo);
console.log(`aim hex (${aim.x},${aim.y}); map: alpha=${map.alpha === 2035.62 ? 'SUMMER' : 'winter'} bravo=${map.bravo === 2035.62 ? 'SUMMER' : 'winter'}`);
await browser.close();
