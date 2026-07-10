#!/usr/bin/env node
/* Does the greenway READ at city zoom? Sample the real canvas, per iter 100's rule:
 * measure the tile as RENDERED, not as specified — and settle with a number what three
 * rounds of agent opinion could not.
 *
 * Samples a disc at each tile centre at DEFAULT fit zoom and reports mean sRGB luminance:
 *   gwspine  the greenway's spine cells (should carry the cream trail)
 *   gwbulge  its widenings (plain lawn)
 *   PARK     ordinary parks (the thing the ribbon must separate from)
 *   MID      the surrounding built fabric
 * plus maxTrail = the brightest pixel found in each spine tile's disc: if the trail is
 * drawn at all, some pixel in there is cream (~235). If maxTrail ~= lawn, it is NOT drawn.
 *
 *   node probe-gwtone.mjs [seed ...]
 */
import { homedir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE = pathToFileURL(join(resolve(HERE, '../../..'), 'solvista.html')).href;

const args = process.argv.slice(2).filter(a => !a.startsWith('-')).map(Number);
const SEEDS = args.length ? args : [7, 42, 1234];
const lum = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

const b = await chromium.launch();
for (const seed of SEEDS) {
  const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
  p.on('pageerror', e => console.error('PAGEERROR', seed, String(e)));
  await p.goto(`${PAGE}?seed=${seed}&warp=61&t=0.3`);
  await p.waitForTimeout(1200);

  const groups = await p.evaluate(() => {
    const pick = sel => sel.map(h => [h.sx, h.sy]);
    const spine = pick(window.__find('gwspine'));
    const gwAll = new Set(window.__find('greenway').map(h => h.x + ',' + h.y));
    const spineSet = new Set(window.__find('gwspine').map(h => h.x + ',' + h.y));
    const bulge = [], park = [], mid = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)]; if (!c) continue;
      const k = x + ',' + y, [cx, cy] = ctr(x, y);
      const s = [cx * scale + offX, cy * scale + offY];
      if (c.gw && !spineSet.has(k)) bulge.push(s);
      else if (c.t === T.PARK && !gwAll.has(k)) park.push(s);
      else if (c.t === T.MID) mid.push(s);
    }
    return { spine, bulge, park, mid };
  });

  const png = await p.screenshot();
  const { createCanvas, loadImage } = await (async () => {
    /* no node-canvas: sample via the page itself */ return {};
  })();
  /* sample inside the page instead: read pixels straight off the live canvas */
  const stats = await p.evaluate(g => {
    const c = document.querySelector('canvas');
    const ctx2 = c.getContext('2d');
    const dpr = c.width / c.getBoundingClientRect().width;
    const L = (r, gg, b) => 0.2126 * r + 0.7152 * gg + 0.0722 * b;
    const sample = pts => {
      let n = 0, sr = 0, sg = 0, sb = 0, maxL = 0, maxs = [];
      for (const [sx, sy] of pts) {
        const px = Math.round(sx * dpr), py = Math.round(sy * dpr);
        if (px < 2 || py < 2 || px > c.width - 3 || py > c.height - 3) continue;
        const d = ctx2.getImageData(px - 1, py - 1, 3, 3).data;
        let best = 0;
        for (let i = 0; i < d.length; i += 4) {
          sr += d[i]; sg += d[i + 1]; sb += d[i + 2]; n++;
          const l = L(d[i], d[i + 1], d[i + 2]);
          if (l > best) best = l;
        }
        maxs.push(best);
      }
      maxs.sort((a, b2) => a - b2);
      return n ? {
        n: pts.length,
        lum: +L(sr / n, sg / n, sb / n).toFixed(1),
        rgb: [sr / n, sg / n, sb / n].map(v => Math.round(v)),
        medMax: maxs.length ? +maxs[maxs.length >> 1].toFixed(1) : 0,
      } : null;
    };
    return Object.fromEntries(Object.entries(g).map(([k, v]) => [k, sample(v)]));
  }, groups);

  const f = k => stats[k] ? `${k}=${String(stats[k].lum).padStart(5)} (n=${String(stats[k].n).padStart(3)}, medMaxPx=${String(stats[k].medMax).padStart(5)})` : `${k}=none`;
  const dL = (a, b2) => stats[a] && stats[b2] ? Math.abs(stats[a].lum - stats[b2].lum).toFixed(1) : '?';
  console.log(`seed ${String(seed).padStart(4)}  ${f('spine')}  ${f('bulge')}  ${f('park')}  ${f('mid')}`);
  console.log(`            spine vs park ΔL=${dL('spine', 'park')}   park vs mid ΔL=${dL('park', 'mid')} (scale ref)`);
  await p.close();
}
await b.close();
