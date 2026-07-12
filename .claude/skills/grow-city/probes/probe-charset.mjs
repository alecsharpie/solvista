/* probe-charset — is the mojibake a bug in the ARTIFACT, or in the INSTRUMENT?
 *
 * Cue (w) claims: "A LIVE MOJIBAKE BUG IS SHIPPED ON THE PUBLIC SITE."
 * That is a claim about how the DOCUMENT IS DECODED, which is decided by, in order:
 *   1. the HTTP Content-Type charset  (overrides everything)
 *   2. a <meta charset> in the first 1024 bytes
 *   3. sniffing / locale fallback (windows-1252)
 *
 * So serve the SAME BYTES three ways and read the strings back as the JS ENGINE sees
 * them (the inline <script> is decoded with the document, so a mis-decode corrupts the
 * string LITERALS themselves — which is exactly what lands in the DOM):
 *
 *   A  file://                          -> Chromium sniffs UTF-8
 *   B  http, 'text/html'                -> what shoot.mjs's server sends (NO charset)
 *   C  http, 'text/html; charset=utf-8' -> what GitHub Pages actually sends (measured)
 *
 * If A and C are clean and only B is corrupt, the artifact is INNOCENT and the local
 * screenshot harness is the thing that is broken.
 */
import { createRequire } from 'node:module';
import { homedir } from 'node:os';
const { chromium } = createRequire(import.meta.url)(
  join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js'));
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const FILE = join(HERE, '../../../../solvista.html');
const BYTES = readFileSync(FILE);                      // the exact bytes, served identically

/* serve the same buffer under a caller-chosen Content-Type */
const serve = (ctype) => new Promise(res => {
  const s = createServer((_q, r) => { r.setHeader('Content-Type', ctype); r.end(BYTES); });
  s.listen(0, '127.0.0.1', () => res({ s, url: `http://127.0.0.1:${s.address().port}/` }));
});

/* the mojibake signature: UTF-8 bytes decoded as windows-1252.
   U+2014 '—' = E2 80 94 -> 'â€"' · U+00B7 '·' = C2 B7 -> 'Â·' · U+00E9 'é' = C3 A9 -> 'Ã©' */
const MOJI = /[ÂÃâ][-¿€™š‚]|Ã©|â€/;
const bad  = (s) => MOJI.test(s || '');

const CASES = [
  ['A  file://                        ', () => ({ url: pathToFileURL(FILE).href, close: () => {} })],
  ['B  http  text/html   (shoot.mjs)  ', async () => { const { s, url } = await serve('text/html');                    return { url, close: () => s.close() }; }],
  ['C  http  charset=utf-8 (GH Pages) ', async () => { const { s, url } = await serve('text/html; charset=utf-8');     return { url, close: () => s.close() }; }],
];

const br = await chromium.launch();
const rows = [];

for (const [label, mk] of CASES) {
  const { url, close } = await mk();
  const page = await br.newPage();
  await page.goto(url + (url.startsWith('file') ? '?seed=42' : '?seed=42'), { waitUntil: 'load' });
  await page.waitForTimeout(700);

  const r = await page.evaluate(() => {
    /* read the strings AS THE JS ENGINE DECODED THEM — top-level consts are in global
       lexical scope, so evaluate() can see them. These are the literals the DOM gets. */
    const grab = (f) => { try { return f(); } catch (e) { return '<err:' + e.message + '>'; } };
    return {
      charset : document.characterSet,
      // the always-on-screen stats panel: the em-dash placeholder (L7385)
      tallDOM : (document.getElementById('stTall') || {}).textContent,
      // a tooltip literal with an acute-e (L7495)
      comDesc : grab(() => TILEDESC[T.COM]),
      // a tooltip literal with an em-dash (L7497)
      vinDesc : grab(() => TILEDESC[T.VINEYARD]),
      // the whole visible HUD text, so nothing hides
      hudText : document.body.innerText.slice(0, 4000),
    };
  });

  rows.push([label, r]);
  await page.close();
  close();
}

await br.close();

console.log('\n=== probe-charset — the SAME BYTES, decoded three ways ===\n');
console.log('  case                                charset       stats"—"  cafés     vineyard "—"   HUD');
console.log('  ' + '-'.repeat(94));
for (const [label, r] of rows) {
  const cells = [
    (r.charset || '?').padEnd(13),
    (bad(r.tallDOM) ? 'MOJIBAKE' : 'clean   ').padEnd(9),
    (bad(r.comDesc) ? 'MOJIBAKE' : 'clean   ').padEnd(9),
    (bad(r.vinDesc) ? 'MOJIBAKE' : 'clean   ').padEnd(13),
    (bad(r.hudText) ? 'MOJIBAKE' : 'clean'),
  ];
  console.log('  ' + label + cells.join(' '));
}

console.log('\n  --- the literals, verbatim (what the user actually reads) ---');
for (const [label, r] of rows) {
  console.log('  ' + label.trim());
  console.log('      stats tall  : ' + JSON.stringify(r.tallDOM));
  console.log('      TILEDESC COM: ' + JSON.stringify(r.comDesc));
}

/* The gate. The artifact is meant to be ONE SELF-CONTAINED FILE, so the standard it
   must meet is: it decodes correctly NO MATTER HOW IT IS SERVED. That is exactly
   "all three cases clean" — and case B (a plain server that declares no charset) is
   the one that can only pass if the FILE declares its own encoding. */
const [A, B, C] = rows.map(([, r]) => r);
const anyBad = (r) => bad(r.tallDOM) || bad(r.comDesc) || bad(r.vinDesc) || bad(r.hudText);
const allUTF8 = rows.every(([, r]) => r.charset === 'UTF-8');
console.log('\n  VERDICT:');
if (!anyBad(A) && !anyBad(B) && !anyBad(C) && allUTF8) {
  console.log('  ** PASS — the file is SELF-DESCRIBING: all three serving conditions decode as\n' +
              '     UTF-8, including case B, which declares no charset at all. The encoding no\n' +
              '     longer depends on the server, so the mojibake class is structurally DEAD.');
  process.exit(0);
} else if (!anyBad(A) && anyBad(B) && !anyBad(C)) {
  console.log('  ** FAIL — case B corrupts: the file is NOT self-describing and is relying on the\n' +
              '     server to declare its charset. Restore the <meta charset="utf-8">.');
  process.exit(1);
} else {
  console.log('  ** FAIL — unexpected pattern; read the table.');
  process.exit(1);
}
