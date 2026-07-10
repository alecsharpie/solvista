#!/usr/bin/env node
/* probe-towertone.mjs — is a building type's PALETTE independent of its HEIGHT?
 *
 * The shape probe for iter 99's law ("colour keyed to the same field as height is
 * not variation"). It was written for TOWER (iter 110) but the method is general:
 * for every instance of a type, recover the field that picks its colour and the
 * field that picks its height, and report Pearson corr between them, plus the
 * share of instances wearing the most common shade.
 *
 * Reference scale, established by the ledger on the two siblings already fixed:
 *   MID  (iter 99):  corr 0.76-0.79  ->  0.19-0.31   (fixed)
 *   RES  (iter 103): corr 0.87-0.89  ->  0.22-0.25   (fixed)
 * So: corr > ~0.6 = colour is restating height. corr < ~0.35 = decoupled.
 *
 * Needs the temporary window.__twr hook (x,y,v,th,h per TOWER).
 * Usage: node probe-towertone.mjs [seed ...]
 */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright-core/index.mjs';
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';

const SEEDS = process.argv.slice(2).length ? process.argv.slice(2).map(Number) : [7, 42, 1234];
const HTML = readFileSync(new URL('./solvista.html', import.meta.url));

const srv = createServer((_, res) => { res.setHeader('content-type', 'text/html'); res.end(HTML); }).listen(0);
await new Promise(r => srv.once('listening', r));
const port = srv.address().port;

// The hook reports `style`/`bodyN` straight from drawBuilding's own selector, so
// this probe never duplicates (and never drifts from) the rule under test.
const STYLE_NAMES = ['0 fins', '1 slab', '2 garden', '3 ziggurat'];

const pearson = (a, b) => {
  const n = a.length, ma = a.reduce((s, x) => s + x, 0) / n, mb = b.reduce((s, x) => s + x, 0) / n;
  let sab = 0, sa = 0, sb = 0;
  for (let i = 0; i < n; i++) { const da = a[i] - ma, db = b[i] - mb; sab += da * db; sa += da * da; sb += db * db; }
  return sab / Math.sqrt(sa * sb);
};

const browser = await chromium.launch();
const rows = [];
for (const seed of SEEDS) {
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  await page.goto(`http://127.0.0.1:${port}/solvista.html?seed=${seed}&warp=61&t=0.3`, { waitUntil: 'load' });
  await page.waitForFunction(() => typeof window.__twr === 'function');
  await page.waitForTimeout(1200); // let growth animation settle (h -> th)
  const twr = await page.evaluate(() => window.__twr());
  await page.close();

  const styles = twr.map(t => t.style);
  const th = twr.map(t => t.th);
  const hist = [0, 0, 0, 0];
  styles.forEach(s => hist[s]++);

  // the tallest tower's style, and the mean height of each style
  const tallest = twr.reduce((a, b) => (b.th > a.th ? b : a));
  const meanBy = hist.map((_, s) => {
    const hs = twr.filter(t => t.style === s).map(t => t.th);
    return hs.length ? hs.reduce((a, b) => a + b, 0) / hs.length : NaN;
  });

  // palette variety: how many distinct (form, body) looks, and the commonest body's share
  const bodies = {};
  twr.forEach(t => { bodies[t.bodyN] = (bodies[t.bodyN] || 0) + 1; });
  const looks = new Set(twr.map(t => `${t.style}|${t.bodyN}`)).size;

  rows.push({
    seed, n: twr.length,
    corr: pearson(styles, th),
    hist, share: Math.max(...hist) / twr.length,
    tallest: tallest.style, tallestTh: tallest.th,
    meanBy, bodies, looks,
    bodyShare: Math.max(...Object.values(bodies)) / twr.length,
  });
}
await browser.close(); srv.close();

console.log('\nprobe-towertone — TOWER: does colour restate height?\n');
for (const r of rows) {
  console.log(`seed ${String(r.seed).padStart(4)}  n=${String(r.n).padStart(3)} towers`);
  console.log(`  corr(style, th)      ${r.corr.toFixed(3)}   ${r.corr > 0.6 ? '<-- colour RESTATES height' : r.corr < 0.35 ? '(decoupled)' : '(partial)'}`);
  console.log(`  style histogram      ${r.hist.map((c, i) => `${STYLE_NAMES[i]}=${c}`).join('  ')}`);
  console.log(`  most common style    ${(r.share * 100).toFixed(1)}% of towers`);
  console.log(`  mean th by style     ${r.meanBy.map(m => (isNaN(m) ? ' --- ' : m.toFixed(1).padStart(5))).join('  ')}`);
  console.log(`  body colours         ${Object.entries(r.bodies).map(([k, n]) => `${k}=${n}`).join('  ')}`);
  console.log(`  distinct looks       ${r.looks}   (commonest body ${(r.bodyShare * 100).toFixed(1)}%)`);
  console.log(`  TALLEST tower (th=${r.tallestTh.toFixed(0)}) is style ${STYLE_NAMES[r.tallest]}`);
  console.log('');
}
const mc = rows.reduce((s, r) => s + r.corr, 0) / rows.length;
const mix = [0, 1, 2, 3].map(s => (rows.reduce((a, r) => a + r.hist[s], 0) / rows.reduce((a, r) => a + r.n, 0) * 100).toFixed(1) + '%');
console.log(`mean corr(style, th) = ${mc.toFixed(3)}   [MID/RES post-fix reference: 0.19-0.31 / 0.22-0.25]`);
console.log(`style mix over all seeds = ${mix.join(' / ')}   [pre-iter-110: 35 / 27 / 23 / 15]`);
console.log(`tallest-is-ziggurat: ${rows.filter(r => r.tallest === 3).length}/${rows.length} seeds`);
console.log(`mean distinct looks = ${(rows.reduce((s, r) => s + r.looks, 0) / rows.length).toFixed(1)} of 20 possible\n`);
