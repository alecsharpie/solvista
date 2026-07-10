#!/usr/bin/env node
/* probe-vis — "can this ornament be SEEN, and from what zoom?" (iteration 111)
 *
 * Generalizes past the bus stop: any small draw-only ornament can be measured this
 * way. For each instance, ZOOM the artifact's own camera onto it, FREEZE the clock
 * (`playing=false`), render the scene twice with only the ornament toggled, and
 * count changed pixels in a window at the instance.
 *
 * ⚠ The freeze is what makes it valid (iter 109's same-frame-control law). Stepping
 * the sim between the two renders lets cars, waves, swaying trees and drifting
 * clouds move; a diff of THOSE frames is ~14% of the canvas and proves nothing.
 * Freezing means every pixel not owned by the ornament is identical by construction.
 *
 * ⚠ And it separates "not drawn" from "drawn but hidden" — the two look the same
 * from a screenshot. Iter 111 found the bus-stop queue is sub-pixel at fit zoom
 * (0% of shelters), readable from zoom~4 (53-63%), and plateaus at 63-73% by zoom 8
 * because the rest are occluded by whatever the row in front builds. A plateau
 * below 100% IS the occlusion measurement.
 *
 *   node probe-vis.mjs
 */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright/index.mjs';
import { pathToFileURL } from 'node:url';
const PAGE = pathToFileURL('/Users/alec/me/solvista-grow/solvista.html').href;
const ZOOMS = [1, 2, 4, 8, 14];
const b = await chromium.launch();
console.log('changed px at the shelter (full vs emptied), median over on-screen stops; "vis%" = stops with >=20 px');
console.log('seed   ' + ZOOMS.map(z => `zoom${z}`.padEnd(15)).join(''));
for (const seed of [42, 7, 1234]) {
  const page = await b.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(`${PAGE}?seed=${seed}&warp=61&t=0.3&step=120`, { waitUntil: 'load' });
  await page.waitForTimeout(500);
  const r = await page.evaluate(async (ZOOMS) => {
    playing = false;
    const cv = document.querySelector('canvas'), cx = cv.getContext('2d');
    const out = {};
    const stops = window.__find('stop').map(h => ({ x: h.x, y: h.y }));
    for (const Z of ZOOMS) {
      const px = [];
      for (const s of stops) {
        zoomAt(innerWidth / 2, innerHeight / 2, 1 / 99);          // reset to fit
        let h = window.__find('stop').find(k => k.x === s.x && k.y === s.y);
        if (Z > 1) { zoomAt(h.sx, h.sy, Z); h = window.__find('stop').find(k => k.x === s.x && k.y === s.y); }
        if (h.sx < 60 || h.sx > innerWidth - 60 || h.sy < 60 || h.sy > innerHeight - 60) continue;
        const R = Math.max(14, 4 * scale);
        const c = cells[idx(s.x, s.y)];
        const grab = () => cx.getImageData(h.sx - R, h.sy - R - R / 2, 2 * R, 2 * R).data;
        c.blast = time - 1e4; c.bqs = 0; render(); const A = grab();
        c.blast = time - (BUSBRD + 3); render(); const B = grab();
        c.blast = undefined;
        let n = 0;
        for (let i = 0; i < A.length; i += 4)
          if (Math.abs(A[i]-B[i]) + Math.abs(A[i+1]-B[i+1]) + Math.abs(A[i+2]-B[i+2]) > 24) n++;
        px.push(n);
      }
      px.sort((a, b) => a - b);
      out[Z] = { n: px.length, med: px[px.length >> 1] ?? 0, vis: px.filter(v => v >= 20).length };
    }
    return out;
  }, ZOOMS);
  console.log(String(seed).padEnd(7) + ZOOMS.map(z => {
    const o = r[z]; return `${o.med}px ${(100*o.vis/o.n).toFixed(0)}%/${o.n}`.padEnd(15);
  }).join(''));
  await page.close();
}
await b.close();
