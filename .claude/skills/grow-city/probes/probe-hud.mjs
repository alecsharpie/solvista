/* probe-hud — cue (z): "the stats bar clips TRANSIT REA[CH]".
 *
 * Every probe in probes/ reads the CANVAS. The HUD is DOM (200's law), so it is
 * invisible to all of them — which is why only an agent ever caught this, and why
 * it needs its own instrument.
 *
 * The claim is about TEXT BEING CUT OFF, which is directly measurable and needs no
 * eye at all: an element's text is clipped exactly when scrollWidth > clientWidth,
 * and it is cut off by the VIEWPORT when its right edge exceeds innerWidth.
 * Report both, per stat, at several viewport widths — the defect is a layout one,
 * so it must be graded across the widths a user actually has.
 */
import { createRequire } from 'node:module';
import { homedir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const { chromium } = createRequire(import.meta.url)(
  join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js'));

import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC  = process.env.SRC || join(HERE, '../../../../solvista.html');
const BYTES = readFileSync(SRC);

/* serve the SAME bytes with / without a charset, so the only variable is the decode.
   MODE=http-nocharset reproduces shoot.mjs's server — which is how every screenshot
   this loop has ever graded was actually taken. */
const MODE = process.env.MODE || 'file';
let server = null, base = pathToFileURL(SRC).href;
if (MODE.startsWith('http')) {
  const ctype = MODE === 'http-utf8' ? 'text/html; charset=utf-8' : 'text/html';
  server = createServer((_q, r) => { r.setHeader('Content-Type', ctype); r.end(BYTES); });
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  base = `http://127.0.0.1:${server.address().port}/`;
}
const URL_ = base + '?seed=42&warp=61';

const WIDTHS = [1600, 1400, 1024, 820, 640, 390];  // step-back width -> ... -> the mobile framing

const br = await chromium.launch();
console.log('\n=== probe-hud — is the stats bar clipping its labels? ===');
console.log('    src : ' + SRC);
console.log('    mode: ' + MODE + '   (' + base.split('?')[0] + ')\n');

let worst = 0, offenders = 0;

for (const w of WIDTHS) {
  const page = await br.newPage({ viewport: { width: w, height: 900 } });
  await page.goto(URL_, { waitUntil: 'load' });
  await page.waitForTimeout(600);

  const r = await page.evaluate(() => {
    const vw = window.innerWidth;
    const card = document.querySelector('.census');
    const cardR = card.getBoundingClientRect();
    const stats = [...card.querySelectorAll('.stat')].map(s => {
      const span = s.querySelector('span');
      const sr = span.getBoundingClientRect();
      const cs = getComputedStyle(s);
      return {
        label   : span.textContent.trim(),
        value   : s.querySelector('b').textContent.trim(),
        hidden  : cs.display === 'none',
        // the text is wider than its box => the glyphs are cut
        clipW   : span.scrollWidth - span.clientWidth,
        // the box itself runs past the right edge of the screen
        overRun : Math.round(sr.right - vw),
        right   : Math.round(sr.right),
      };
    });
    return { vw, cardRight: Math.round(cardR.right), cardOver: Math.round(cardR.right - vw), stats };
  });

  console.log(`  viewport ${r.vw}px   card right edge ${r.cardRight}px  ` +
              (r.cardOver > 0 ? `>>> RUNS OFF SCREEN by ${r.cardOver}px <<<` : `(fits, ${-r.cardOver}px spare)`));
  for (const s of r.stats) {
    if (s.hidden) continue;
    const cut = s.clipW > 0 || s.overRun > 0;
    if (cut) { offenders++; worst = Math.max(worst, Math.max(s.clipW, s.overRun)); }
    console.log('      ' + (cut ? 'CLIPPED' : '   ok  ') + '  ' +
      s.label.padEnd(18) + JSON.stringify(s.value).padEnd(12) +
      ' textOverflow=' + String(s.clipW).padStart(3) + 'px' +
      '   offscreen=' + String(s.overRun).padStart(4) + 'px');
  }
  console.log();
  await page.close();
}

await br.close();
if (server) server.close();
console.log(`  VERDICT: ${offenders} clipped stat-label(s) across ${WIDTHS.length} widths; worst cut ${worst}px.`);
console.log(offenders ? '  ** Cue (z) CONFIRMED — the HUD cuts its own labels.\n'
                      : '  ** No clipping at any tested width — cue (z) does NOT reproduce.\n');
