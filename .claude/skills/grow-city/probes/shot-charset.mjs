/* shot-charset — the camera for the mojibake fix.
 *
 * The whole point of this lap is that the defect is INVISIBLE to every camera the
 * harness owns: shoot.mjs serves http with NO charset (so it CREATES the mojibake),
 * hovershot.mjs serves file:// (so Chromium sniffs UTF-8 and HIDES it). Neither was
 * ever reconciled against the other, which is how the bug survived 122 iterations and
 * got mis-filed as "live on the public site".
 *
 * So this camera pins the HARSH condition deliberately: http, Content-Type 'text/html',
 * no charset — byte-for-byte what shoot.mjs sends. On HEAD that shows the mojibake; on
 * the patch, the <meta charset> makes the file self-describing and it must come out clean.
 *
 *   SRC=<file> node shot-charset.mjs <outdir>
 *
 * Shoots the two DOM surfaces that carry non-ASCII (200's law: the HUD is not in the
 * canvas, so no canvas probe can see any of this):
 *   - the TOOLTIP over a COM tile ("Street-level shops and cafes." <- the acute e)
 *   - the STATS panel (always on screen)
 *   - the whole frame, as the un-zoomed control that nothing else moved
 */
import { createRequire } from 'node:module';
import { homedir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';
import { readFileSync, mkdirSync } from 'node:fs';
const { chromium } = createRequire(import.meta.url)(
  join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js'));

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC  = process.env.SRC || join(HERE, '../../../../solvista.html');
const OUT  = resolve(process.argv[2] || '.claude/skills/grow-city/shots/charset');
mkdirSync(OUT, { recursive: true });

/* the harsh condition: exactly shoot.mjs's header */
const BYTES = readFileSync(SRC);
const srv = createServer((_q, r) => { r.setHeader('Content-Type', 'text/html'); r.end(BYTES); });
await new Promise(r => srv.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${srv.address().port}/`;

const br = await chromium.launch();
const page = await br.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 });
await page.goto(base + '?seed=42&warp=61', { waitUntil: 'load' });
await page.waitForTimeout(900);

/* freeze, so the shot is stable and the HUD is not mid-update (204's law) */
await page.evaluate(() => { playing = false; lastSky = 0; syncSky(performance.now()); syncStats(); render(); });

const meta = await page.evaluate(() => ({
  charset: document.characterSet,
  mode   : document.compatMode,          // control: adding <meta> must NOT change this
}));
console.log(`  served as 'text/html' (no charset)  ->  document.characterSet = ${meta.charset}`);
console.log(`  document.compatMode = ${meta.mode}   (control: must be identical on HEAD and patch)`);

/* --- 1. the tooltip over a COM tile: this is where 'cafes' lives --- */
/* __find returns HEX indices in x/y and SCREEN px in sx/sy — aim at sx/sy, not x/y.
   Pick a COM well inside the frame, and away from the placard/census cards, which
   own the corners (200) and would swallow the pointer. */
const hov = await page.evaluate(() => {
  const c = (__find('COM') || []).filter(p =>
    p.sx > 420 && p.sx < innerWidth - 60 && p.sy > 90 && p.sy < innerHeight - 190);
  if (!c.length) return null;
  const p = c[Math.floor(c.length / 2)];
  return { x: Math.round(p.sx), y: Math.round(p.sy) };
});
if (hov) {
  await page.mouse.move(hov.x, hov.y);
  await page.waitForTimeout(350);
  const tipTxt = await page.evaluate(() => (document.getElementById('tip') || {}).innerText || '');
  console.log(`  tooltip text: ${JSON.stringify(tipTxt.slice(0, 90))}`);
  const tip = await page.$('#tip');
  const box = tip && await tip.boundingBox();
  if (box) {
    await page.screenshot({
      path: join(OUT, 'tooltip.png'),
      clip: { x: Math.max(0, box.x - 12), y: Math.max(0, box.y - 12), width: box.width + 24, height: box.height + 24 },
    });
  }
}

/* --- 2. the stats panel (always on screen) --- */
const cbox = await (await page.$('.census')).boundingBox();
await page.screenshot({
  path: join(OUT, 'stats.png'),
  clip: { x: Math.max(0, cbox.x - 10), y: Math.max(0, cbox.y - 10), width: cbox.width + 20, height: cbox.height + 20 },
});

/* --- 3. the whole frame, as the control --- */
await page.screenshot({ path: join(OUT, 'whole.png') });

await br.close();
srv.close();
console.log(`  -> ${OUT}/{tooltip,stats,whole}.png\n`);
