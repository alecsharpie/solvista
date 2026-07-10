// probe-solghost.mjs — iter 124. The ghost-solar fix: c.solar / c.groof persist
// after a building is cleared for a paved square (forecourt/quad), so the census
// counted panels on plazas and roads. The draw + tooltip already gate on
// DEV.has(c.t); this proves the census/adoption readers were counting cells that
// are NOT buildings. GHOST = solar flag on a non-DEV tile (the over-count the fix
// removes). REAL = solar flag on a building (the control — still counted, unchanged).
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright/index.mjs';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(join(HERE, '../../../../solvista.html')).href;
const url = p => `${PAGE}?${p}`;
const b = await chromium.launch();
let totGhostS = 0, totGhostG = 0;
for (const seed of [7, 42, 1234, 5, 99, 3, 11, 77]) {
  const pg = await b.newPage({ viewport: { width: 1600, height: 1000 } });
  await pg.goto(url(`seed=${seed}&warp=61&t=0.3`));   // warp to 2035, the mature city
  await pg.waitForTimeout(700);
  const r = await pg.evaluate(() => {
    const name = t => Object.keys(T).find(k => T[k] === t) || ('#' + t);
    let realS = 0, ghostS = 0, realG = 0, ghostG = 0;
    const ghostTiles = {};
    for (let i = 0; i < G * G; i++) {
      const c = cells[i]; if (!c) continue;
      const dev = DEV.has(c.t);
      if (c.solar) { if (dev) realS++; else { ghostS++; ghostTiles[name(c.t)] = (ghostTiles[name(c.t)] || 0) + 1; } }
      if (c.groof) { if (dev) realG++; else ghostG++; }
    }
    return { realS, ghostS, realG, ghostG, ghostTiles };
  });
  totGhostS += r.ghostS; totGhostG += r.ghostG;
  const tiles = Object.entries(r.ghostTiles).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}:${v}`).join(' ');
  console.log(String(seed).padStart(6),
    `solar real=${String(r.realS).padStart(4)} GHOST=${String(r.ghostS).padStart(3)}`,
    `| green real=${String(r.realG).padStart(3)} GHOST=${String(r.ghostG).padStart(3)}`,
    `| ghost tiles: ${tiles || '(none)'}`);
  await pg.close();
}
await b.close();
console.log(`\nTOTAL ghost solar=${totGhostS}, ghost green=${totGhostG} across 8 seeds.`);
console.log(totGhostS > 0
  ? 'CONFIRMED: solar/green flags persist on non-building tiles — the census was counting them; now it does not.'
  : 'NO GHOSTS FOUND — the fix would be a no-op; investigate.');
