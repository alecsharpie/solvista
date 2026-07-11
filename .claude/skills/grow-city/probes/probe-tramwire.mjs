#!/usr/bin/env node
/* probe-tramwire — does the streetcar now draw from an OVERHEAD CONTACT WIRE, where
 * its trolley pole used to poke at empty air? (iter 155, Transport × Deepen)
 *
 * The tram's pantograph now meets a taut catenary strung the length of the block it
 * is traversing (the A->B segment), at a fixed height (wh=9.6) over the road lane.
 * Draw-only, no rng()/hashCell/tick — the census is vacuous, so this probe is the gate.
 *
 * CONTROLLED placement (137's law): trams drift a nondeterministic amount over the
 * road network between page loads (Math.random spawn/steer), so a fixed-coord
 * build-vs-build diff on live trams is hopeless. So clear every live mover and PLACE
 * a fixed set at chosen ROAD-cell centres, heading east (alongX) at p=0.5 — identical
 * objects in both builds — then freeze (playing=false, pinned time/waveT, iter 109)
 * and render.
 *
 * Measure the OVERHEAD BAND only (a strip above the roof, cy-12..cy-6.5, +/-0.7*CW
 * wide) — that is where the wire+pantograph live and where the body change is nil:
 *   TARGET = a placed TRAM: HEAD draws a short leaning pole+dot in that band; patched
 *            draws a full-block wire + vertical pantograph + contact shoe, so the band
 *            changes a lot.
 *   CONTROL = a placed CAR at other ROAD cells: no overhead anything in either build,
 *            so patched ~= HEAD (~0) — proves the change is confined to the tram kind.
 *
 *   node probe-tramwire.mjs [seed ...]
 */
import { homedir, tmpdir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync, mkdtempSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const CAND = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html'), resolve(HERE, '../../../solvista.html')];
const ART = CAND.find(existsSync);
const REPO = dirname(ART);
const SEEDS = process.argv.slice(2).filter(a => !a.startsWith('-')).map(Number);
const seeds = SEEDS.length ? SEEDS : [7, 42];
const q = s => `?seed=${s}&warp=61&t=0.30&tide=0.59&year=2035.62`;

const tmp = mkdtempSync(join(tmpdir(), 'tramwire-'));
const HEAD = join(tmp, 'head.html');
writeFileSync(HEAD, execFileSync('git', ['-C', REPO, 'show', 'HEAD:solvista.html']));

/* mean |ΔRGB| and fraction of pixels visibly changed (|ΔRGB|>8) — the wire is a thin
 * dark line diluted by unchanged sky/rooftop in the band, so changed-fraction is the
 * honest read. */
function stats(a, b) {
  let d = 0, ch = 0; const n = a.length / 4;
  for (let k = 0; k < n; k++) {
    const i = k * 4;
    const px = (Math.abs(a[i] - b[i]) + Math.abs(a[i + 1] - b[i + 1]) + Math.abs(a[i + 2] - b[i + 2])) / 3;
    d += px; if (px > 8) ch++;
  }
  return { d: d / n, ch: ch / n };
}
/* the WHOLE canvas backing store. In a frozen frame the ONLY thing that differs
 * between patched and HEAD is the placed vehicles' draw, so a whole-frame diff needs
 * no per-vehicle box (and no world/screen unit juggling): it catches every wire
 * wherever it lands. Count of pixels changed by |ΔRGB|>8. */
async function grabFull(page) {
  return page.evaluate(() => {
    const cv = document.querySelector('canvas');
    const g = cv.getContext('2d');
    return Array.from(g.getImageData(0, 0, cv.width, cv.height).data);
  });
}

/* Load, freeze, clear live movers, PLACE a set of ONE kind at spread-out ROAD centres,
 * all heading east (alongX). Deterministic in both builds (every field set by hand). */
async function placed(page, url, kind) {
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForFunction('window.__find');
  return page.evaluate((kind) => {
    playing = false; time = 5.0; waveT = 3.0;
    // clear EVERY mover — clouds/birds/balloons spawn via Math.random and would
    // differ between page loads, putting a noise floor on the whole-frame diff.
    for (const a of [vehicles, bikes, trams, trucks, peds, boats, ferries, freighters,
      birds, shuttles, dogs, kites, surfers, dolphins, whales, herons, kayaks, joggers,
      deer, clouds, balloons, copters]) a.length = 0;
    const roads = window.__find('ROAD').filter((_, i) => i % 3 === 0).slice(0, 120);
    const mk = (r) => ({ x: r.x, y: r.y, nx: r.x + 1, ny: r.y, p: 0.5, sp: 0.6, kind,
      c: kind === 'tram' ? 'brick' : 'teal' });
    for (const r of roads) (kind === 'tram' ? trams : vehicles).push(mk(r));
    render();
    return roads.length;
  }, kind);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

console.log('seed | placed | tram %frame-changed |ΔRGB| | car control %changed');
console.log('─'.repeat(64));
const agg = { tch: [], td: [], cch: [] };

for (const s of seeds) {
  // TARGET: trams, patched vs HEAD (whole-frame diff = the wires)
  const nT = await placed(page, pathToFileURL(HEAD).href + q(s), 'tram');
  const tramH = await grabFull(page);
  await placed(page, pathToFileURL(ART).href + q(s), 'tram');
  const tr = stats(await grabFull(page), tramH);
  // CONTROL: cars, patched vs HEAD (draw untouched → ~0)
  await placed(page, pathToFileURL(HEAD).href + q(s), 'car');
  const carH = await grabFull(page);
  await placed(page, pathToFileURL(ART).href + q(s), 'car');
  const cr = stats(await grabFull(page), carH);
  agg.tch.push(tr.ch); agg.td.push(tr.d); agg.cch.push(cr.ch);
  console.log(`${String(s).padEnd(4)} | ${String(nT).padStart(6)} | ${(tr.ch * 100).toFixed(3).padStart(9)}%  ${tr.d.toFixed(3).padStart(6)}  | ${(cr.ch * 100).toFixed(3).padStart(9)}%`);
}

await browser.close();
const mean = a => a.reduce((s, v) => s + v, 0) / a.length;
const TCH = mean(agg.tch), TD = mean(agg.td), CCH = mean(agg.cch);
console.log('─'.repeat(64));
console.log(`tram wires: ${(TCH * 100).toFixed(3)}% of frame pixels changed (mean |ΔRGB| ${TD.toFixed(3)})  ·  car control ${(CCH * 100).toFixed(3)}% changed`);
console.log(`VERDICT: ${TCH > 0.001 && TCH > CCH * 10 && CCH < 0.0005 ? 'PASS' : 'FAIL'}  (120 tram wires change >0.1% of the frame, >10x the car control; control<0.05% = render-noise floor)`);
