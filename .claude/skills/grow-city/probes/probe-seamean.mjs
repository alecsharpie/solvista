/* 245 — THE FIXED POINT. Is the foam REDISTRIBUTED across the gust cycle, or is there
 * simply MORE of it? The cap threshold gates a path-object COUNT (222: the world is the
 * draw list), so a drifted mean is a permanent un-budgeted cost.
 *
 * The design centres every lever on seaState()==0.5, so at that ONE wind the patch must
 * render as HEAD does. This is a cross-build diff, so it has a floor (230) — hence the
 * CONTROL: at full gust the SAME two builds must diverge enormously. Fixed point ≈ floor
 * AND gust ≫ floor ⇒ the centring is real and the foam is redistributed, not added.
 */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));

const PATCH = resolve(join(HERE, '../../../../solvista.html'));

/* Derive pristine HEAD ourselves rather than leaning on a /tmp file a human happened to
   make — a probe that only runs on its author's machine is not source. REF=<sha> to pin. */
const HEAD = join(tmpdir(), 'solvista-head-seamean.html');
writeFileSync(HEAD, execSync(`git -C ${JSON.stringify(dirname(PATCH))} show ${process.env.REF || 'HEAD'}:solvista.html`,
  { maxBuffer: 64 << 20 }));
const WFIX  = 0.25 + 0.75 * (0.16 / 0.66);   /* the WINDA at which seaState()==0.5 */
const SEEDS = (process.env.SEEDS || '42,7,1234').split(',').map(Number);

const browser = await chromium.launch();

async function frameAt(src, seed, winda) {
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.addInitScript(() => {
    let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  });
  await page.goto('file://' + src + '?seed=' + seed);
  await page.waitForTimeout(400);
  const buf = await page.evaluate(({ seed, winda }) => {
    playing = false; genWorld(seed); __warp(61);
    STARS.length = 0; flock = null; clouds.length = 0;
    time = 100; waveT = 100; __setTime(0.30);
    /* 230/163: this is the one CROSS-BUILD diff in the harness, so it has a floor — and the
       floor is the MOVERS. Each page ran a wall-clock-dependent number of RAF frames before
       it was frozen, so its cars, peds and boats sit somewhere else; that alone read 5,416 px
       on a HEAD-vs-HEAD control. Empty them: the whitecaps care about none of them, and the
       frame becomes terrain + sea, which is all this diff is about. */
    for (const a of [vehicles, bikes, trams, trucks, peds, dogs, boats, ferries, freighters,
                     kayaks, surfers, whales, dolphins, herons, deer, joggers, balloons,
                     birds, copters, shuttles]) if (Array.isArray(a)) a.length = 0;
    WINDA = winda; CCACHE = {};
    render();
    const g = cvs.getContext('2d');
    return Array.from(g.getImageData(0, 0, cvs.width, cvs.height).data);
  }, { seed, winda });
  await page.close();
  return Uint8ClampedArray.from(buf);
}

const diff = (a, b) => {
  let n = 0;
  for (let i = 0; i < a.length; i += 4) {
    const d = Math.max(Math.abs(a[i] - b[i]), Math.abs(a[i + 1] - b[i + 1]), Math.abs(a[i + 2] - b[i + 2]));
    if (d > 6) n++;
  }
  return n;
};

console.log(`\nfixed point: WINDA = ${WFIX.toFixed(4)}  ⇒  seaState() = 0.50 (the gust cycle's mean)\n`);
console.log('seed    HEAD-vs-HEAD   PATCH-vs-HEAD      PATCH-vs-HEAD      verdict');
console.log('        (the floor)    @ the fixed point  @ full gust (ctrl)');

for (const seed of SEEDS) {
  const h1 = await frameAt(HEAD, seed, WFIX);
  const h2 = await frameAt(HEAD, seed, WFIX);
  const p1 = await frameAt(PATCH, seed, WFIX);
  const pg = await frameAt(PATCH, seed, 1.0);
  const hg = await frameAt(HEAD, seed, 1.0);

  const floor = diff(h1, h2);
  const fix   = diff(p1, h1);
  const gust  = diff(pg, hg);
  const held  = fix <= Math.max(60, floor * 2);
  console.log(`${String(seed).padStart(4)}  ${String(floor).padStart(10)}   ${String(fix).padStart(14)}   `
    + `${String(gust).padStart(16)}      ${held ? '✔ MEAN HELD' : '✘ MEAN DRIFTED'}`);
}
await browser.close();
