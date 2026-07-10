#!/usr/bin/env node
/* Iter 121: put a DWELLING cabin in front of the camera.
 *
 * The vector is a motion change, and a screenshot cannot see speed. But it can see the
 * one static claim the fix makes: a cabin that has stopped is stopped AT a tower (on the
 * sheave head), not floating one span past it. A cabin dwells for 4 of every 52-109 sim
 * seconds, so no fixed `&step=` will reliably catch one -- this steps until it does.
 *
 * node probe-gondshot.mjs <seed> <outdir>
 * Prints the sim time it found, so the frame can be reproduced with &step=<t>.
 */
import { homedir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '../../..');
const PAGE = pathToFileURL(join(ROOT, process.env.FILE || 'solvista.html')).href;

const SEED = process.argv[2] || '42';
const OUT = resolve(process.argv[3] || join(HERE, 'shots/gond'));
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
page.on('pageerror', e => errs.push(String(e)));
await page.goto(`${PAGE}?seed=${SEED}&warp=61&t=0.35`, { waitUntil: 'load' });
await page.waitForTimeout(600);
await page.evaluate(() => { playing = false; });

/* step until some cabin is standing, then hand back its screen position and its tower's */
const hit = await page.evaluate(() => {
  const live = () => gonds.filter(g => g.path && g.path.length > 1);
  for (let t = 0; t < 400; t += 0.05) {
    window.__step(0.05);
    for (const g of live()) for (const cb of g.cabins) {
      if (!(cb.dw > 0)) continue;
      const [gsx, gsy, ccx, ccy, sg] = gondPos(g, cb.p);
      const [tcx, tcy] = ctr(ccx, ccy);              // the cell it stopped over
      const Hs = g.h - sg;
      return {
        t: +t.toFixed(2), p: +cb.p.toFixed(4), dw: +cb.dw.toFixed(2),
        spans: g.path.length - 1,
        atTerminal: ccx === g.path[0][0] && ccy === g.path[0][1] ? 'start'
          : (ccx === g.path[g.path.length - 1][0] && ccy === g.path[g.path.length - 1][1] ? 'end' : 'MID-LINE!'),
        isPylon: g.pylSet.has(g.path.findIndex(([x, y]) => x === ccx && y === ccy)),
        sag: +sg.toFixed(3),
        cabX: gsx * scale + offX, cabY: (gsy - Hs) * scale + offY,
        towX: tcx * scale + offX, towY: tcy * scale + offY,
      };
    }
  }
  return null;
});
if (!hit) { console.log('no dwelling cabin found'); await browser.close(); process.exit(1); }

await page.evaluate(() => render());
await page.screenshot({ path: join(OUT, `wide-seed${SEED}.png`) });
const clip = (w, h, name) => page.screenshot({
  path: join(OUT, `${name}-seed${SEED}.png`),
  clip: {
    x: Math.max(0, Math.min(1440 - w, hit.cabX - w / 2)),
    y: Math.max(0, Math.min(900 - h, hit.cabY - h / 2)),
    width: w, height: h,
  },
});
await clip(420, 300, 'near');
await clip(180, 130, 'close');

console.log(JSON.stringify(hit, null, 1));
console.log(`\nreproduce: ?seed=${SEED}&warp=61&t=0.35&step=${hit.t}`);
console.log(`cabin screen (${hit.cabX.toFixed(1)}, ${hit.cabY.toFixed(1)})  tower cell centre (${hit.towX.toFixed(1)}, ${hit.towY.toFixed(1)})`);
console.log(`dx from tower column: ${(hit.cabX - hit.towX).toFixed(2)} px  (must be ~0: it stopped ON the mast)`);
await browser.close();
if (errs.length) { console.log('PAGE ERRORS:', errs); process.exit(1); }
