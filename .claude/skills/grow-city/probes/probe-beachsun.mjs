#!/usr/bin/env node
/* probe-beachsun — does the beach furniture (umbrellas + towels) now follow the
 * sun: present by day, packed away by the time the evening bonfires are lit?
 * (iter 145, People & activity × Deepen)
 *
 * The umbrella/towel draw on low-`sand` BEACH cells was ungated by time of day —
 * it sat out at 2am while the bonfire burned beside it, so the beach had no daily
 * rhythm of use. The fix multiplies the furniture's alpha by ua =
 * clamp((0.6-LITAMT)/0.25, 0, 1): full at midday (LITAMT~0), gone by dusk
 * (LITAMT>0.6). LITAMT rides the slow ~110s day-clock, so this is a rhythm, not a
 * strobe (134's cadence law: a fast-`year` gate would flicker; this one holds).
 * Draw-only, no rng()/terrain — the census is vacuous, so this probe is the gate.
 *
 * Method — build-vs-build isolation (patched working tree vs `git show HEAD`),
 * which cleanly separates the furniture from the day/night TINT that darkens the
 * whole frame (a within-build day-vs-night diff would conflate the two). At the
 * SAME time of day both builds share identical terrain, so:
 *   DAY control  (t=0.35, LITAMT~0): ua=1 in both → beach cells IDENTICAL, Δ≈0.
 *                Proves the change is a no-op in daylight.
 *   NIGHT target (t=0.90, LITAMT~1): patched draws NO furniture, HEAD draws it →
 *                beach cells differ by the whole umbrella+towel, Δ large.
 *   ROAD control (non-beach): Δ≈0 at night too → the change is confined to the
 *                beach furniture, not a global dim.
 * Freezes the sim + pins time/waveT/tide (109's same-frame law) so waves, foam and
 * the tide line are fixed and identical in both builds.
 *
 *   node probe-beachsun.mjs [seed ...]
 */
import { homedir, tmpdir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync, mkdtempSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const CAND = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html')];
const ART = CAND.find(existsSync);
const REPO = dirname(ART);
const A = process.argv.slice(2).filter(a => !a.startsWith('-')).map(Number);
const seeds = A.length ? A : [7, 42];
/* pin tide neutral so nothing tidal moves, freeze below */
const q = (s, t) => `?seed=${s}&warp=61&t=${t}&tide=0.59`;

const tmp = mkdtempSync(join(tmpdir(), 'beachsun-'));
const HEAD = join(tmp, 'head.html');
writeFileSync(HEAD, execFileSync('git', ['-C', REPO, 'show', 'HEAD:solvista.html']));

/* mean |ΔRGB| over two RGBA arrays */
function meanD(a, b) {
  let d = 0, n = a.length / 4;
  for (let k = 0; k < n; k++) {
    const i = k * 4;
    d += (Math.abs(a[i] - b[i]) + Math.abs(a[i + 1] - b[i + 1]) + Math.abs(a[i + 2] - b[i + 2])) / 3;
  }
  return d / n;
}
/* a box over the furniture: umbrella ellipse ~(cx,cy-5) r4.5, towel ~(cx-6..-2,cy+1) */
async function grab(page, sx, sy) {
  return page.evaluate(([sx, sy]) => {
    const cv = document.querySelector('canvas');
    const g = cv.getContext('2d');
    const dpr = cv.width / cv.clientWidth;
    const wx = Math.round(7 * dpr), wy = Math.round(7 * dpr);
    const px = Math.round((sx - 1) * dpr), py = Math.round((sy - 2) * dpr);
    return Array.from(g.getImageData(px - wx, py - wy, wx * 2, wy * 2).data);
  }, [sx, sy]);
}

/* load, freeze, clear every live mover (their positions drift between two page
 * loads and would poison a fixed-coord diff — figshadow's law), pin the clock to
 * time-of-day t, render; return LITAMT + the screen coords of the umbrella beach
 * cells (low c.v, off the esplanade) and a sparse non-beach ROAD control. The
 * umbrella gates on c.v (line 3245), NOT c.sand, so select on c.v here. */
async function scene(page, url, t) {
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForFunction('window.__find');
  return page.evaluate((t) => {
    playing = false; time = 5.0; waveT = 3.0;
    for (const a of [vehicles, bikes, trams, trucks, peds, dogs, joggers, kites, surfers,
      dolphins, whales, herons, kayaks, boats, ferries, freighters, birds, shuttles,
      balloons, copters, deer]) a.length = 0;
    window.__setTime(t); render();
    const on = (sx, sy) => sx > 60 && sx < innerWidth - 60 && sy > 60 && sy < innerHeight - 60;
    const beach = [], road = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)]; if (!c) continue;
      const [wx, wy] = ctr(x, y), sx = wx * scale + offX, sy = wy * scale + offY;
      if (!on(sx, sy)) continue;
      if (c.t === T.BEACH && c.v < 0.08) {           /* definitely-umbrella at any pop */
        if (!(x === shoreAt(y) - 1 && espAt(y))) beach.push([sx, sy]); /* skip the boardwalk */
      } else if (c.t === T.ROAD && (x + y) % 11 === 0) road.push([sx, sy]);
    }
    return { lit: +LITAMT.toFixed(3), beach: beach.slice(0, 140), road: road.slice(0, 40) };
  }, t);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

console.log('seed phase  LITAMT | umbrella cells |ΔRGB| (patched vs HEAD) | ROAD control |ΔRGB|');
console.log('─'.repeat(80));
const agg = { dayB: [], nightB: [], nightR: [] };

for (const s of seeds) {
  for (const [name, t] of [['day  ', 0.35], ['night', 0.90]]) {
    const pos = await scene(page, pathToFileURL(HEAD).href + q(s, t), t);
    const bH = [], rH = [];
    for (const [sx, sy] of pos.beach) bH.push(await grab(page, sx, sy));
    for (const [sx, sy] of pos.road) rH.push(await grab(page, sx, sy));
    await scene(page, pathToFileURL(ART).href + q(s, t), t);
    let bD = 0, rD = 0;
    for (let i = 0; i < pos.beach.length; i++) bD += meanD(await grab(page, ...pos.beach[i]), bH[i]);
    for (let i = 0; i < pos.road.length; i++) rD += meanD(await grab(page, ...pos.road[i]), rH[i]);
    const B = bD / (pos.beach.length || 1), R = rD / (pos.road.length || 1);
    if (name.trim() === 'day') agg.dayB.push(B); else { agg.nightB.push(B); agg.nightR.push(R); }
    console.log(`${String(s).padEnd(4)} ${name}  ${String(pos.lit).padStart(5)} | ${String(pos.beach.length).padStart(4)} cells  ${B.toFixed(2).padStart(7)}          | ${R.toFixed(3).padStart(9)}`);
  }
}

await browser.close();
const mean = a => a.reduce((s, v) => s + v, 0) / (a.length || 1);
const dayB = mean(agg.dayB), nightB = mean(agg.nightB), nightR = mean(agg.nightR);
console.log('─'.repeat(80));
console.log(`umbrella |ΔRGB|: DAY control ${dayB.toFixed(2)} (≈0, midday untouched)  ·  NIGHT ${nightB.toFixed(2)} (furniture gone)`);
console.log(`ROAD control (night) ${nightR.toFixed(3)} (≈0, change confined to the beach)`);
console.log(`VERDICT: ${nightB > 1 && dayB < 0.2 && nightB > dayB * 8 && nightR < 0.2 ? 'PASS' : 'FAIL'}  (night beach>1, day beach<0.2, night>8×day, road control<0.2)`);
