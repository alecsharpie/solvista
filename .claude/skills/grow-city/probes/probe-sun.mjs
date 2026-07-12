#!/usr/bin/env node
/* probe-sun — "is the sun in the sky, does it TRACK the day, does it REDDEN at the horizon,
 * and does it stay OUT of the night?" (iteration 200)
 *
 * ⚠ THIS PROBE SCREENSHOTS THE PAGE, NOT THE CANVAS, AND THAT IS THE WHOLE POINT.
 * The first version of it read `cvs.getContext('2d').getImageData()` like every other probe
 * in this directory, and it confidently reported the golden-hour sun PRESENT at 11,716 px
 * while two visual agents, on two seeds, twice, reported no sun at all. The agents were
 * right. Solvista's HUD (`.placard`) is a DOM card — left:20px, max-width:300px, and tall —
 * sitting ABOVE the canvas, and the setting sun was passing behind it. A canvas readback
 * cannot see the DOM, so the probe was measuring a layer the user never looks at.
 * `page.screenshot()` composites DOM over canvas exactly as the user (and the agents) see
 * it, so a diff of two screenshots measures the sun THAT CAN ACTUALLY BE SEEN. Every probe
 * that gates a *visible* claim on a canvas readback shares this blind spot.
 *
 * Isolation is iter 161's law: diff PATCH against pristine HEAD over the whole frame. The
 * builds run identical code but for the sun block, so every pixel that differs IS the sun —
 * and now, is the sun that survived the HUD and the skyline. The CENTROID of those pixels
 * is the sun's screen position, free and by construction.
 *
 * The claim is DIRECTIONAL, not merely present/absent: the sun must RISE ON THE RIGHT and
 * SET ON THE LEFT — the same rule iter 190 uses to pick which face of the glass to rake
 * (`gs = dayT<0.5 ? 1 : -1`). A count of bright pixels could not tell a tracking sun from a
 * lamp stapled to the sky; the arc can.
 *
 * Controls:
 *   - NIGHT IS INERT BY CONSTRUCTION (199). The block is gated on dayT in [SUNUP,SUNDN], so
 *     the night pins must come back byte-identical. We COUNT THE SUN'S OWN DRAW CALLS
 *     (hooking createRadialGradient) rather than re-deriving my own gate, so the dead regime
 *     is proved dead — which also makes night a free perf noise floor.
 *   - DRAWN vs SEEN. sunDraws says it executed; visible px says it survived the HUD and the
 *     rooftops. The gap between those two columns is the entire bug above, so both are shown.
 *   - CONTRAST against the local sky: presence is not legibility (iter 101).
 *
 * Clock frozen per 195(f)/163(c,d)/199: playing=false is NOT a frozen clock — pin waveT and
 * time, rebuild in-page with genWorld+__warp, clear STARS and every entity array, and null
 * the lone Math.random-spawned pelican `flock`.
 */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright/index.mjs';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
import { execSync } from 'node:child_process';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';

const HERE = dirname(fileURLToPath(import.meta.url));
const ART = join(HERE, '../../../../solvista.html');

const SEEDS = [42, 7, 1234];
const WARP = 61;
const WAVET = 12.3, TIME = 40.0;
const VW = 1600, VH = 1000, DSF = 2;   /* exactly shoot.mjs's `wide`, HUD and all */
const VIS = 3000;                      /* a day pin below this is an occluded sun, not a sun */

const PINS = [
  ['dawn    ', 0.09, 'day'],
  ['morning ', 0.22, 'day'],
  ['noon    ', 0.42, 'day'],
  ['golden  ', 0.66, 'day'],
  ['sunset  ', 0.74, 'day'],
  ['duskend ', 0.86, 'night'],
  ['midnight', 0.99, 'night'],
];

const tmp = mkdtempSync(join(tmpdir(), 'sunprobe-'));
const BASE = join(tmp, 'base.html');
writeFileSync(BASE, execSync(`git -C ${HERE} show HEAD:solvista.html`, { maxBuffer: 1 << 28 }));

/* one frozen PAGE screenshot (DOM composited over canvas), plus the sun's own draw count */
async function shot(page, fileUrl, seed, t) {
  await page.goto(`${fileUrl}?seed=${seed}`);
  await page.waitForTimeout(160);
  const sunDraws = await page.evaluate(({ seed, warp, t, WAVET, TIME }) => {
    Math.random = () => 0.5;
    genWorld(seed); __warp(warp);
    playing = false;
    waveT = WAVET; time = TIME;
    STARS.length = 0;
    for (const a of [vehicles, bikes, trams, trucks, peds, freighters, birds, shuttles,
      dogs, kites, surfers, dolphins, whales, herons, kayaks, joggers, deer, clouds,
      balloons, copters, boats, ferries, heliPads]) a.length = 0;
    flock = null;
    __setTime(t);
    __setTide(0.59);
    let n = 0;
    const proto = CanvasRenderingContext2D.prototype, orig = proto.createRadialGradient;
    proto.createRadialGradient = function (x0, y0, r0, x1, y1, r1) {
      if (r0 === 0 && (Math.abs(r1 - 12) < 0.01 || Math.abs(r1 - 62.4) < 0.01)) n++;
      return orig.apply(this, arguments);
    };
    render();
    proto.createRadialGradient = orig;
    return n;
  }, { seed, warp: WARP, t, WAVET, TIME });
  const png = await page.screenshot({ type: 'png' });
  return { sunDraws, b64: png.toString('base64') };
}

/* decode both screenshots in-browser and diff them */
async function compare(helper, a64, b64) {
  return helper.evaluate(async ({ a64, b64 }) => {
    const load = async (s) => {
      const img = new Image(); img.src = 'data:image/png;base64,' + s; await img.decode();
      const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
      const g = c.getContext('2d'); g.drawImage(img, 0, 0);
      return { d: g.getImageData(0, 0, img.width, img.height).data, w: img.width, h: img.height };
    };
    const A = await load(a64), B = await load(b64);
    const { w, h } = A;
    let n = 0, sx = 0, sy = 0, low = 0, cn = 0, cr = 0, cg = 0, cb = 0;
    for (let i = 0, p = 0; i < A.d.length; i += 4, p++) {
      const dr = B.d[i] - A.d[i], dg = B.d[i + 1] - A.d[i + 1], db = B.d[i + 2] - A.d[i + 2];
      const mag = Math.abs(dr) + Math.abs(dg) + Math.abs(db);
      if (mag <= 6) continue;
      const x = p % w, y = (p / w) | 0;
      n++; sx += x; sy += y;
      if (y > h * 0.5) low++;
      if (mag > 100) { cn++; cr += B.d[i]; cg += B.d[i + 1]; cb += B.d[i + 2]; }
    }
    if (!n) return { n: 0, low: 0 };
    const cx = sx / n / w, cy = sy / n / h;
    /* contrast: the disc's luminance vs the sky ~170px out, in the PATCH frame */
    const lum = (x, y) => { const i = ((y | 0) * w + (x | 0)) * 4; return 0.299 * B.d[i] + 0.587 * B.d[i + 1] + 0.114 * B.d[i + 2]; };
    let ring = 0, rn = 0;
    for (const [ox, oy] of [[-170, 0], [170, 0], [0, 170]]) {
      const px = cx * w + ox, py = cy * h + oy;
      if (px > 0 && px < w && py > 0 && py < h) { ring += lum(px, py); rn++; }
    }
    return {
      n, low, cx, cy,
      disc: cn ? [cr / cn, cg / cn, cb / cn] : null,
      contrast: cn && rn ? (0.299 * cr / cn + 0.587 * cg / cn + 0.114 * cb / cn) - ring / rn : NaN,
    };
  }, { a64, b64 });
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: VW, height: VH }, deviceScaleFactor: DSF });
const helper = await browser.newPage();
await helper.goto('about:blank');

console.log(`probe-sun — PATCH vs pristine HEAD, ${VW}x${VH} PAGE SCREENSHOTS (DOM composited, HUD and all).`);
console.log('Every changed pixel IS the sun — and only the sun the user can actually SEE.\n');

for (const seed of SEEDS) {
  console.log(`seed ${seed}`);
  console.log('  pin        drew?   VISIBLE px   centroid x  centroid y   disc RGB         contrast   below-skyline');
  const arc = [];
  for (const [name, t, regime] of PINS) {
    const a = await shot(page, pathToFileURL(BASE).href, seed, t);
    const b = await shot(page, pathToFileURL(ART).href, seed, t);
    const d = await compare(helper, a.b64, b.b64);
    const drew = b.sunDraws - a.sunDraws;
    const dc = d.disc ? `(${d.disc.map(v => String(Math.round(v)).padStart(3)).join(',')})` : '     -      ';
    console.log(`  ${name} ${regime === 'night' ? '[NIGHT]' : '       '} ${String(drew).padStart(3)}` +
      `${String(d.n).padStart(12)}${(d.n ? d.cx.toFixed(3) : '  -  ').padStart(13)}` +
      `${(d.n ? d.cy.toFixed(3) : '  -  ').padStart(12)}   ${dc}` +
      `${(d.disc ? d.contrast.toFixed(0) : '  -').padStart(9)}${String(d.low).padStart(15)}`);
    if (regime === 'night' && drew !== 0) console.log('     ^^ FAIL: the sun DREW at night');
    if (regime === 'day' && d.n < VIS)
      console.log(`     ^^ FAIL: it drew (${drew} calls) but only ${d.n} px reach the screen — occluded by the HUD or the city`);
    if (regime === 'day') arc.push({ name: name.trim(), ...d });
  }
  const mono = arc.every((p, i) => i === 0 || p.cx < arc[i - 1].cx);
  const high = arc.reduce((m, p) => p.cy < m.cy ? p : m, arc[0]);
  const noon = arc.find(p => p.name === 'noon'), set = arc.find(p => p.name === 'sunset');
  const rb = (p) => p.disc[0] - p.disc[2];
  console.log(`  ARC     x ${arc.map(p => p.cx.toFixed(2)).join(' -> ')}  ` +
    `${mono ? 'MONOTONIC right->left: rises E, sets W (agrees with 190 gs)' : '** NOT MONOTONIC — FAIL **'}`);
  console.log(`  HIGH    at "${high.name}" (cy ${high.cy.toFixed(3)})`);
  console.log(`  REDDEN  disc R-B: noon ${rb(noon).toFixed(0)} -> sunset ${rb(set).toFixed(0)}  ` +
    `${rb(set) > rb(noon) + 40 ? '(reddens at the horizon)' : '** stays white — FAIL **'}`);
  console.log(`  SEEN    min contrast over the day: ${Math.min(...arc.map(p => p.contrast)).toFixed(0)} ` +
    `(the disc must out-shine the sky it sits on — presence is not legibility)\n`);
}

await browser.close();
