/* probe-reed: do the marsh's reed tufts change color and HEIGHT across the year, on
   screen? (iter 108: an agent will confidently invert a tone ordering — measure it.)

   Two traps this probe exists to avoid:
   (a) A marsh hex is 23.4 x 15.6 screen px. A square sample box around its centre
       SPILLS INTO THE NEIGHBOURING BEACH, and sand (R-B ~ +60) is bright and tawny —
       indistinguishable from an autumn reed by any color test. The first draft of this
       probe measured sand and reported "reeds don't change". So: mask strictly to the
       hexagon (and shrink 14% to clear the antialiased rim).
   (b) TIDE must be pinned to 0.59 — below the flood-sheen cut (0.60), at ebb=0 — so the
       body is one flat color and the reeds are the only thing that can move.

   Reed pixels = inside the hex, far from the body's modal color, LIGHTER than it, and
   not bluer (which excludes the teal pools and their dark mud beds).
   Usage: node probe-reed.mjs [seed] */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright/index.mjs';
import { pathToFileURL } from 'node:url';
const seed = process.argv[2] || '7';
const base = pathToFileURL(process.cwd() + '/solvista.html').href;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
console.log(`seed ${seed} — reeds only (hex-masked), TIDE pinned 0.59: no sheen, no ebb-mud tint`);
console.log('season   year      reedpx/cell   mean reed RGB      G-R (green>0)   body RGB');
for (const [nm, y] of [['winter', '2035.02'], ['spring', '2035.30'], ['summer', '2035.42'], ['dry   ', '2035.62'], ['autumn', '2035.87']]) {
  await p.goto(`${base}?seed=${seed}&warp=61&t=0.3&year=${y}&tide=0.59`, { waitUntil: 'load' });
  await p.waitForTimeout(350);
  const r = await p.evaluate(() => {
    playing = false; TIDE = 0.59; TIDEV = 1; render();
    const cv = document.querySelector('canvas');
    const cx = cv.getContext('2d', { willReadFrequently: true });
    const dpr = cv.width / cv.clientWidth;
    const X = HW * scale * 0.86, V = VR * scale * 0.86, E = ER * scale * 0.86;  // css px, shrunk off the rim
    const inHex = (dx, dy) => Math.abs(dx) <= X && Math.abs(dy) <= V - (V - E) * Math.abs(dx) / X;
    let reed = [0, 0, 0], nreed = 0, cells = 0, body = [0, 0, 0];
    for (const h of window.__find('MARSH')) {
      const R = Math.ceil(X) + 2;
      const px = Math.round(h.sx * dpr), py = Math.round(h.sy * dpr), Rp = Math.round(R * dpr);
      if (px < Rp + 1 || py < Rp + 1 || px > cv.width - Rp - 2 || py > cv.height - Rp - 2) continue;
      const W = 2 * Rp, d = cx.getImageData(px - Rp, py - Rp, W, W).data;
      const hist = new Map(); const inside = [];
      for (let iy = 0; iy < W; iy++) for (let ix = 0; ix < W; ix++) {
        const dx = (ix - Rp) / dpr, dy = (iy - Rp) / dpr;
        if (!inHex(dx, dy)) continue;
        const i = (iy * W + ix) * 4;
        inside.push(i);
        const k = (d[i] >> 3) + ',' + (d[i + 1] >> 3) + ',' + (d[i + 2] >> 3);
        hist.set(k, (hist.get(k) || 0) + 1);
      }
      if (!inside.length) continue;
      const mk = [...hist.entries()].sort((a, c) => c[1] - a[1])[0][0].split(',').map(v => v * 8 + 4);
      cells++; body[0] += mk[0]; body[1] += mk[1]; body[2] += mk[2];
      for (const i of inside) {
        const dr = d[i] - mk[0], dg = d[i + 1] - mk[1], db = d[i + 2] - mk[2];
        const lighter = dr + dg + db > 12;                 // reeds stand brighter than the flat
        const notPool = db <= dr + 6;                      // pools/mud are bluer / much darker
        if (Math.hypot(dr, dg, db) > 12 && lighter && notPool) {
          reed[0] += d[i]; reed[1] += d[i + 1]; reed[2] += d[i + 2]; nreed++;
        }
      }
    }
    return { reed, nreed, cells, body };
  });
  if (!r.cells) { console.log(`${nm} no marsh`); continue; }
  const m = r.nreed ? r.reed.map(v => v / r.nreed) : [0, 0, 0];
  const bd = r.body.map(v => v / r.cells);
  console.log(`${nm}   ${y}   ${(r.nreed / r.cells).toFixed(1).padStart(6)}      ` +
    `[${m.map(v => String(Math.round(v)).padStart(3)).join(',')}]        ${(m[1] - m[0]).toFixed(0).padStart(4)}         ` +
    `[${bd.map(v => String(Math.round(v)).padStart(3)).join(',')}]`);
}
await b.close();
