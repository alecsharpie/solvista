/* Magnified clip on one instance of a tile type / civic kind, so few-pixel
   features are actually resolvable before a subagent judges them (iter 70's
   false-negative trap: a feature reported broken purely because it was too
   small to see at the `downtown` clip scale).
   Complements hovershot.mjs, which aims at *entities* via __ents; this aims at
   *tiles* via __find.

   node tileshot.mjs '<url query>' <TYPE> <outdir>
     TYPE: a T enum name ('TOWER','PARK','STADIUM',…) or a CIVIC kind ('hospital',…)
   Emits tile-close.png (tight) and tile-mid.png (context) at deviceScaleFactor 4. */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright/index.mjs';
import path from 'path';

const [q, type, out] = process.argv.slice(2);
if (!q || !type || !out) { console.error('usage: tileshot.mjs <url query> <TYPE> <outdir>'); process.exit(2); }
const [file, query = ''] = q.split('?');
const url = 'file://' + path.resolve(file) + '?' + query;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 4 });
await p.goto(url);
await p.waitForTimeout(1400);

const hits = await p.evaluate(t => window.__find(t), type);
if (!hits || !hits.length) { console.error('no ' + type + ' found'); await b.close(); process.exit(1); }
/* prefer an instance comfortably inside the frame, nearest the horizontal centre */
const inview = hits.filter(h => h.sx > 200 && h.sx < 1400 && h.sy > 200 && h.sy < 850);
const pick = (inview.length ? inview : hits).sort((a, c) => Math.abs(a.sx - 800) - Math.abs(c.sx - 800))[0];
console.log(type + ' at', pick.sx | 0, pick.sy | 0, '(' + hits.length + ' instances)');

/* dy lifts the clip: tall structures rise well above their tile centre */
for (const [name, w, h, dy] of [['tile-close', 150, 190, 110], ['tile-mid', 320, 300, 150]]) {
  await p.screenshot({
    path: path.join(out, name + '.png'),
    clip: { x: Math.max(0, pick.sx - w / 2), y: Math.max(0, pick.sy - dy), width: w, height: h },
  });
}
await b.close();
