/* One magnified clip centred on the MIDDLE of the greenway spine, so the trail is
   resolvable. tileshot.mjs aims at __find('PARK'), which picks any of ~200 parks;
   this aims at the ribbon itself.  node shot-gw.mjs '<url query>' <outfile> [zoom] */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright/index.mjs';
import path from 'path';

const [q, out, zoom = '1'] = process.argv.slice(2);
const [file, query = ''] = q.split('?');
const url = 'file://' + path.resolve(file) + '?' + query;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 3 });
await p.goto(url);
await p.waitForTimeout(1200);

for (let i = 0; i < +zoom; i++) {
  await p.mouse.move(800, 500);
  await p.mouse.wheel(0, -400);
  await p.waitForTimeout(250);
}
await p.waitForTimeout(600);

const at = await p.evaluate(() => {
  const sp = window.__find('gwspine');
  if (!sp.length) return null;
  const m = sp[sp.length >> 1];
  return { sx: m.sx, sy: m.sy, n: sp.length, GWK, GWFAM };
});
if (!at) { console.error('no greenway'); await b.close(); process.exit(1); }
console.log('spine cells', at.n, 'GWK', at.GWK, 'GWFAM', at.GWFAM, '->', at.sx | 0, at.sy | 0);

const W = 700, H = 460;
const clip = {
  x: Math.max(0, Math.min(1600 - W, at.sx - W / 2)),
  y: Math.max(0, Math.min(1000 - H, at.sy - H / 2)),
  width: W, height: H,
};
await p.screenshot({ path: out, clip });
console.log('->', out);
await b.close();
