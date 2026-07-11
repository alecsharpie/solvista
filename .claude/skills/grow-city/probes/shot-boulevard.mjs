#!/usr/bin/env node
/* shot-boulevard.mjs — drive a real cursor onto a treed road and a plain busy road,
 * capture the rendered #tip tooltip for each, so the DOM change is confirmed to
 * actually paint (not just return the right string in describeTile).
 *   node shot-boulevard.mjs [seed]
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync, mkdirSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const CAND = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html'), resolve(HERE, '../../../solvista.html')];
const ROOT = CAND.find(existsSync);
const fileUrl = pathToFileURL(ROOT).href;
const OUT = join(HERE, '.claude/skills/grow-city/shots/boulevard');
try { mkdirSync(OUT, { recursive: true }); } catch {}
const SEED = +(process.argv[2] || 42);

const browser = await chromium.launch();
const page = await page_(browser);
async function page_(b){ const p = await b.newPage(); await p.setViewportSize({width:1400,height:900}); return p; }

await page.goto(`${fileUrl}?seed=${SEED}&warp=61&t=0.35`);
await page.waitForTimeout(500);

// pick a treed boulevard cell + a busy-plain control near frame centre, return screen coords
const picks = await page.evaluate(() => {
  playing = false;
  for (const a of [vehicles, bikes, trams, trucks, peds, dogs, joggers, boats, ferries, birds]) a.length = 0;
  render();  /* clear entity stamps so the TILE wins the hover, not a ped standing on it */
  const cx = G / 2, cy = G / 2;
  const near = (arr) => arr.sort((a, b) => (Math.hypot(a[0]-cx,a[1]-cy) - Math.hypot(b[0]-cx,b[1]-cy)))[0];
  const treedNbr = (x, y) => nbrDirs(y).some(([dx, dy]) => { const n = cellAt(x + dx, y + dy); return n && n.t === T.ROAD && n.treed; });
  const treed = [], busy = [];
  for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
    const c = cells[idx(x, y)]; if (c.t !== T.ROAD || c.bridge) continue;
    if (c.treed && boulevardSize(x, y) >= 5) treed.push([x, y]);
    else if (c.busy && !treedNbr(x, y)) busy.push([x, y]);  /* isolated so screen-rounding can't land on a boulevard */
  }
  const scr = ([x, y]) => [ (x + 0.5 + (y & 1) * 0.5) * CW * scale + offX,
                            (y + 0.5) * ROWY * scale + offY, x, y ];
  near(treed); near(busy);  /* sort both by distance to centre, nearest first */
  return { boul: treed.map(scr), ctrl: busy.map(scr) };
});

// move the real cursor, read back the cell the handler actually resolved (hoverTile),
// and accept the first candidate that lands where we intended (want='treed'|'plain')
async function hoverShot(name, cands, want) {
  for (const p of cands.slice(0, 40)) {
    await page.mouse.move(p[0], p[1]);
    await page.waitForTimeout(120);
    const res = await page.evaluate(() => hoverTile && { x: hoverTile.x, y: hoverTile.y,
      treed: !!cells[idx(hoverTile.x, hoverTile.y)].treed, road: cells[idx(hoverTile.x, hoverTile.y)].t === T.ROAD });
    if (!res || !res.road) continue;
    if (want === 'treed' && !res.treed) continue;
    if (want === 'plain' && res.treed) continue;
    await page.waitForTimeout(150);
    const tip = page.locator('#tip');
    await tip.screenshot({ path: join(OUT, `${name}-s${SEED}.png`) });
    const txt = (await tip.innerText()).replace(/\n+/g, ' | ');
    console.log(`${name} @resolved(${res.x},${res.y}): ${txt}`);
    return;
  }
  console.log(`${name}: no candidate resolved to want=${want}`);
}
await hoverShot('boulevard', picks.boul, 'treed');
await hoverShot('control-avenue', picks.ctrl, 'plain');

await browser.close();
console.log('shots ->', OUT);
