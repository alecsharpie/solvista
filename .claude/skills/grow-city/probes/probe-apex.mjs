#!/usr/bin/env node
/* probe-apex.mjs — is "the highest thing on screen" the same as "the tallest tower"?
 *
 * The two blind agents DISAGREED about which build has the better crown, and the
 * seed-7 one put the tallest tower at screen y=0.12 in BOTH builds, against a CBD at
 * y=0.625, calling it "the same slim white spire." That is not a tower report; it
 * smells like the PROJECTION.
 *
 * In this oblique view a cell's baseline is ctr(x,y).y = (y+0.5)*ROWY -- so the ROW
 * sets the vertical origin and the apex is (baseline - height). Across ~30 rows the
 * baseline moves far more than any building height, so the TOPMOST silhouette in the
 * image should be the FARTHEST-BACK tall-ish thing, NOT the tallest thing.
 *
 * If so, "point at the tallest tower" is a question the projection makes unanswerable
 * by eye, and the seed-7 agent's answer is an instrument fault, not a verdict on the
 * feature. This probe checks that directly: it reports, per seed, the tower with the
 * highest APEX on screen and the tower with the greatest HEIGHT, and where each sits.
 *
 *   node probe-apex.mjs
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(process.env.SRC || join(HERE, '../../../../solvista.html')).href;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
page.on('pageerror', e => { console.error('PAGE ERROR', e.message); process.exitCode = 1; });

for (const seed of [7, 42]) {
  await page.goto(`${PAGE}?seed=${seed}&warp=61&t=0.30`);
  await page.waitForFunction(() => window.__census && window.__warp);
  const r = await page.evaluate(() => {
    playing = false; render();
    const W = innerWidth, H = innerHeight;
    const tw = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cellAt(x, y); if (!c || c.t !== T.TOWER) continue;
      const [cx, cy] = ctr(x, y);
      /* screen-space apex: the artifact draws the prism top at (baseline - z), and z
         is c.h in world units, scaled by the same camera as everything else. */
      const sx = (cx * scale + offX) / W;
      const apex = ((cy - c.h) * scale + offY) / H;   /* top of the prism */
      const base = (cy * scale + offY) / H;           /* where it stands */
      tw.push({ x, y, h: c.h, d: hexDist(x, y, CBDX, CBDY), sx, apex, base });
    }
    const [bx, by] = ctr(CBDX, CBDY);
    const byApex = [...tw].sort((a, b) => a.apex - b.apex)[0];   /* highest on screen */
    const byH = [...tw].sort((a, b) => b.h - a.h)[0];            /* actually tallest */
    return {
      cbd: { sx: (bx * scale + offX) / W, sy: (by * scale + offY) / H },
      byApex, byH,
      /* how well does screen-apex rank towers by true height? */
      corr: (() => {
        const n = tw.length;
        const mA = tw.reduce((s, t) => s + t.apex, 0) / n, mH = tw.reduce((s, t) => s + t.h, 0) / n;
        let sxy = 0, sxx = 0, syy = 0;
        for (const t of tw) { const da = t.apex - mA, dh = t.h - mH; sxy += da * dh; sxx += da * da; syy += dh * dh; }
        return sxy / Math.sqrt(sxx * syy || 1);
      })(),
      /* and how well does screen-apex track the ROW (depth) instead? */
      corrRow: (() => {
        const n = tw.length;
        const mA = tw.reduce((s, t) => s + t.apex, 0) / n, mR = tw.reduce((s, t) => s + t.y, 0) / n;
        let sxy = 0, sxx = 0, syy = 0;
        for (const t of tw) { const da = t.apex - mA, dr = t.y - mR; sxy += da * dr; sxx += da * da; syy += dr * dr; }
        return sxy / Math.sqrt(sxx * syy || 1);
      })(),
    };
  });

  console.log(`\n=== seed ${seed} ===   CBD on screen (${r.cbd.sx.toFixed(3)}, ${r.cbd.sy.toFixed(3)})`);
  console.log(`  HIGHEST APEX ON SCREEN : (${r.byApex.sx.toFixed(3)}, ${r.byApex.apex.toFixed(3)})  ` +
    `h=${r.byApex.h.toFixed(0)}  row=${r.byApex.y}  ring=${r.byApex.d}   <- what the eye picks as "tallest"`);
  console.log(`  ACTUALLY TALLEST TOWER : (${r.byH.sx.toFixed(3)}, ${r.byH.apex.toFixed(3)})  ` +
    `h=${r.byH.h.toFixed(0)}  row=${r.byH.y}  ring=${r.byH.d}`);
  console.log(`  corr(screen apex, true height) = ${r.corr.toFixed(3)}   ` +
    `corr(screen apex, ROW/depth) = ${r.corrRow.toFixed(3)}`);
}

await browser.close();
