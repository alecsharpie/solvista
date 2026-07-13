/* shot-beachseason — the camera for the seasonal beach.
 *
 * ⚠ AIM BY MEASURED INK OF THE HOST (245). The season moves the FARMS by an order of
 * magnitude more than it moves the sand — they are the loudest seasonal thing in the
 * city — so an unmasked "where did the frame change most" argmax lands on farmland and
 * frames a field. The aim here is taken from the FURNITURE'S OWN INK: render the frozen
 * world with beachPhase forced to 1 and again forced to BEACHMIN, mask the difference to
 * BEACH hexes, and take the argmax window of THAT. It points where the towels provably are.
 *
 * ⚠ NAME THE FILE, NEVER A LETTER (239). Every frame is written under a self-describing
 * name and the agent is asked to report per FILE, so it cannot transpose the mapping.
 * The same world point is forced into every build via AIM, so the pair is blind and the
 * two frames differ ONLY in the thing under test.
 */
import { pathToFileURL, fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { homedir } from 'node:os';
import { execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;

const HERE = dirname(fileURLToPath(import.meta.url));
const PATCH = join(HERE, '../../../../solvista.html');
const HEAD = '/tmp/beachshot-head.html';
execSync(`git -C ${HERE} show HEAD:solvista.html > ${HEAD}`);

const SEED = Number(process.argv[2] || 42);
const OUT = process.argv[3] || join(HERE, 'shots/beach');
mkdirSync(OUT, { recursive: true });

const DRYPEAK = 2035.62, WINTER = 2035.02;
const Z = 3.6;

const freeze = (seed) => {
  playing = false;
  genWorld(seed);
  __warp(61);
  STARS.length = 0;
  flock = null;
  clouds.length = 0;
  for (const [g] of ENTINFO) { const a = g(); if (Array.isArray(a)) a.length = 0; }
  time = 1000; waveT = 500;
  __setTide(0.59);
  __setTime(0.30);
  lastSky = 0; syncSky(performance.now()); syncStats();   // 204: a frozen clock does not refresh the DOM
};

const open = async (browser, art) => {
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.addInitScript(() => {
    let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  });
  await page.goto('file://' + art);
  await page.waitForTimeout(600);
  return page;
};

const browser = await chromium.launch();

/* ---- 1. find the aim, from the FURNITURE'S OWN INK, on the patch ---- */
const p = await open(browser, PATCH);
const aim = await p.evaluate(({ seed, DRYPEAK, freezeSrc }) => {
  eval('(' + freezeSrc + ')')(seed);
  __setYear(DRYPEAK);
  const dpr = window.devicePixelRatio || 1;
  const cvs = document.querySelector('canvas'), ctx = cvs.getContext('2d');
  const W = cvs.width, H = cvs.height;
  const grab = () => ctx.getImageData(0, 0, W, H).data;

  const real = beachPhase;
  beachPhase = () => 1;         render(); const summer = grab();
  beachPhase = () => BEACHMIN;  render(); const winter = grab();
  beachPhase = real;            render();

  const m = new Uint8Array(W * H);                 // mask: BEACH hexes ONLY (245)
  for (const h of __find('BEACH')) {
    const cx = Math.round(h.sx * dpr), cy = Math.round(h.sy * dpr);
    for (let y = Math.max(0, cy - 13); y < Math.min(H, cy + 13); y++)
      for (let x = Math.max(0, cx - 13); x < Math.min(W, cx + 13); x++) m[y * W + x] = 1;
  }
  // integral of furniture ink over a sliding window -> argmax
  const ink = new Float64Array(W * H);
  for (let i = 0, q = 0; i < summer.length; i += 4, q++) {
    if (!m[q]) continue;
    ink[q] = Math.abs(summer[i] - winter[i]) + Math.abs(summer[i + 1] - winter[i + 1]) + Math.abs(summer[i + 2] - winter[i + 2]);
  }
  const R = 150; let best = -1, bx = 0, by = 0;
  for (let y = R; y < H - R; y += 12) for (let x = R; x < W - R; x += 12) {
    let s = 0;
    for (let yy = y - R; yy < y + R; yy += 4) for (let xx = x - R; xx < x + R; xx += 4) s += ink[yy * W + xx];
    if (s > best) { best = s; bx = x; by = y; }
  }
  // device px -> world coords, via the artifact's own camera
  return { wx: (bx / dpr - offX) / scale, wy: (by / dpr - offY) / scale, ink: Math.round(best) };
}, { seed: SEED, DRYPEAK, freezeSrc: freeze.toString() });
await p.close();
console.log(`\n  aim (furniture ink argmax, masked to BEACH): world ${aim.wx.toFixed(1)}, ${aim.wy.toFixed(1)}  [ink ${aim.ink}]\n`);

/* ---- 2. shoot every frame at that same aim ---- */
const shoot = async (art, year, name, zoom) => {
  const page = await open(browser, art);
  const info = await page.evaluate(({ seed, year, aim, zoom, freezeSrc }) => {
    eval('(' + freezeSrc + ')')(seed);
    __setYear(year);
    if (zoom) {
      scale = zoom;
      offX = window.innerWidth / 2 - aim.wx * scale;
      offY = window.innerHeight / 2 - aim.wy * scale;
    }
    render();
    const bp = (typeof beachPhase === 'function') ? beachPhase().toFixed(3) : 'n/a (HEAD)';
    return { year: year.toFixed(2), bp };
  }, { seed: SEED, year, aim, zoom, freezeSrc: freeze.toString() });
  await page.screenshot({ path: join(OUT, name) });        // 200: DOM-composited
  await page.close();
  console.log(`  ${name.padEnd(26)} year=${info.year}  beachPhase=${String(info.bp).padEnd(11)} -> ${join(OUT, name)}`);
};

await shoot(HEAD,  WINTER,  `s${SEED}-head-winter.png`,  Z);
await shoot(PATCH, WINTER,  `s${SEED}-patch-winter.png`, Z);
await shoot(PATCH, DRYPEAK, `s${SEED}-patch-summer.png`, Z);
await shoot(HEAD,  DRYPEAK, `s${SEED}-head-summer.png`,  Z);
await shoot(PATCH, WINTER,  `s${SEED}-patch-winter-wholecity.png`, 0);
console.log('');
await browser.close();
