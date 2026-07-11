#!/usr/bin/env node
/* probe-crowdshot.mjs — before/after zoomed captures of the static-crowd contact
 * shadows for the visual gate (iter 163). The shadow is a faint contact ellipse, so
 * a before/after pair at IDENTICAL framing is the honest way to show it. Both builds
 * rebuild the city deterministically (genWorld+__warp, stars/movers cleared) so the
 * only pixel difference is the shadow. Two crowds: the daylit SCHOOL-run drop-off
 * (shadow clearest on lit pavement) and the dusk STRIP crowd under the neon.
 *   node probe-crowdshot.mjs [seed] [outdir]
 */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright-core/index.mjs';
import { createServer } from 'node:http';
import { readFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname } from 'node:path';

const seed = process.argv[2] || '42';
const outDir = process.argv[3] || '.claude/skills/grow-city/shots/crowdshadow';
mkdirSync(outDir, { recursive: true });
const ARTPATH = new URL('../../../../solvista.html', import.meta.url);
const ART = readFileSync(ARTPATH);
const HEAD = execFileSync('git', ['-C', dirname(ARTPATH.pathname), 'show', 'HEAD:solvista.html']);

async function shoot(html, tag) {
  const srv = createServer((_, res) => { res.setHeader('content-type', 'text/html'); res.end(html); }).listen(0);
  await new Promise(r => srv.once('listening', r));
  const port = srv.address().port;
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 5 });
  await page.goto(`http://127.0.0.1:${port}/solvista.html?seed=${seed}&warp=61`, { waitUntil: 'load' });
  await page.waitForFunction(() => typeof window.__find === 'function');

  /* deterministic rebuild + clear everything that differs per load, then find a
   * front-of-frame school and a front COM strip-crowd tile; center+zoom on each. */
  const loc = await page.evaluate((seed) => {
    playing = false; time = 5.0; waveT = 3.0;
    genWorld(seed); syncStats(); window.__warp(61); window.__setYear(2035.62);
    for (const a of [vehicles, bikes, trams, trucks, peds, boats, ferries, freighters,
      birds, shuttles, dogs, kites, surfers, dolphins, whales, herons, kayaks, joggers,
      deer, clouds, balloons, copters]) a.length = 0;
    if (typeof flock !== 'undefined') flock = null;
    STARS.length = 0;
    const cv = document.querySelector('canvas');
    const pick = (pred) => { let best = null;
      for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) { const c = cells[idx(x, y)];
        if (pred(c, x, y) && (!best || y > best.y)) best = { x, y }; } return best; };
    const school = pick(c => c.t === T.CIVIC && c.kind === 'school');
    const strip = pick((c, x, y) => c.t === T.COM && c.v > 0.6 && y > G * 0.45 && y < G * 0.8);
    const worldOf = t => { const [sx, sy] = px(t.x + 0.5, t.y + 0.5); return { wx: (sx - offX) / scale, wy: (sy - offY) / scale }; };
    return { school: school && worldOf(school), strip: strip && worldOf(strip) };
  }, +seed);

  const frame = async (target, t, name, z) => {
    if (!target) { console.log(`  no ${name}`); return; }
    const c = await page.evaluate(([target, t, z]) => {
      const cv = document.querySelector('canvas');
      zoom = z; scale = fitScale * zoom;
      offX = cv.clientWidth / 2 - target.wx * scale; offY = cv.clientHeight / 2 - target.wy * scale;
      window.__setTime(t); render();
      return { sx: cv.clientWidth / 2, sy: cv.clientHeight / 2 };
    }, [target, t, z]);
    /* the crowd figures are FIXED screen-px, ~3-4px below the tile centre; camera
     * zoom won't enlarge them, only a TIGHT clip does — so clip small and low. */
    await page.screenshot({ path: `${outDir}/seed${seed}_${name}_${tag}.png`, clip: { x: c.sx - 55, y: c.sy - 40, width: 110, height: 100 } });
  };
  await frame(loc.school, 0.22, 'school', 13);
  await frame(loc.strip, 0.80, 'strip', 13);
  srv.close(); await browser.close();
  console.log(`  ${tag}: school=${!!loc.school} strip=${!!loc.strip}`);
}

console.log(`seed ${seed}:`);
await shoot(HEAD, 'head');
await shoot(ART, 'after');
console.log(`-> ${outDir}`);
