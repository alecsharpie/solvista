#!/usr/bin/env node
/* WHAT is the thin dark line? (iter 202's banked, unexplained cue.)
 *
 * Two agents, on two seeds, both reported "a thin dark line reads as drawn OVER
 * the towers/water". 202 disproved the naive cause (drawMonoAt/drawGondAt are
 * called INSIDE the row loop, so they are row-interleaved) and banked the cue
 * with an explicit instruction: PROBE it, do not redesign on the agents' say-so.
 *
 * Reading the code kills two more hypotheses before a pixel is rendered:
 *   - the monorail beam strokes only to the MIDPOINT of each neighbour, so it
 *     never reaches into another cell's footprint;
 *   - the gondola path is strictly monotone in y (stepGond only ever takes
 *     axStep d=1 or d=2, and BOTH are y+1), so its full-span cable is always
 *     drawn BEFORE the row it descends into -- correct z-order by construction.
 * So: stop theorizing, and LOCATE the line by measurement.
 *
 * Method (probe-drawbudget's attribution, retargeted): wrap ctx.stroke() and the
 * path builders, and for every stroke record its DEVICE-space polyline length,
 * its device lineWidth, its colour luminance, its bbox, and the artifact function
 * that issued it (read off the call stack). Then census the strokes that match
 * what the agents described -- LONG, THIN, DARK -- and print them by issuer.
 *
 * A line the eye reads as "drawn over the city" is one that is long, thin, dark,
 * and NOT occluded. So the census is sorted by total device length: whatever is
 * painting the most dark linear ink is the suspect, and its bbox says where.
 *
 * Deterministic per 163(c)/(d) + 195(f) + 199: genWorld+__warp in-page, STARS
 * cleared, flock nulled, waveT/time pinned.
 */
import { homedir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const CAND = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html')];
const ART = CAND.find(f => existsSync(f));

/* 203's CHAIN LAW, and it lived in this probe as a bug: a gondola rope span is only
   ~12-14 device px, so a per-stroke `len >= 30` filter CANNOT SEE THE ROPE — while the
   eye sees the 15-25 spans chained into an unbroken run across the frame. Group by
   ISSUER and sum; set MINLEN low to census chains, high for genuinely long strokes. */
const MINLEN = +(process.env.MINLEN ?? 30);
const SEEDS = [42, 7];
const LIGHTS = { day: 0.30, night: 0.88 };

const census = async (page, seed, dayT) => page.evaluate(({ seed, dayT, MINLEN }) => {
  playing = false;
  genWorld(seed);
  __warp(61);
  if (typeof STARS !== 'undefined') STARS.length = 0;
  try { flock = null; } catch (e) {}
  waveT = 0; time = 0;
  __setTime(dayT);

  const cvs = document.querySelector('canvas');
  const ctx2 = cvs.getContext('2d');
  const proto = Object.getPrototypeOf(ctx2);

  /* --- track the path being built, in DEVICE space --- */
  let pts = [];
  const map = (self, x, y) => { const m = self.getTransform(); return [m.a * x + m.c * y + m.e, m.b * x + m.d * y + m.f]; };

  const origBegin = proto.beginPath, origMove = proto.moveTo, origLine = proto.lineTo;
  const origArc = proto.arc, origEll = proto.ellipse, origRect = proto.rect;
  const origQuad = proto.quadraticCurveTo, origBez = proto.bezierCurveTo;
  const origStroke = proto.stroke;

  proto.beginPath = function () { pts = []; return origBegin.apply(this, arguments); };
  proto.moveTo = function (x, y) { pts.push(map(this, x, y)); return origMove.apply(this, arguments); };
  proto.lineTo = function (x, y) { pts.push(map(this, x, y)); return origLine.apply(this, arguments); };
  proto.quadraticCurveTo = function (a, b, x, y) { pts.push(map(this, x, y)); return origQuad.apply(this, arguments); };
  proto.bezierCurveTo = function (a, b, c, d, x, y) { pts.push(map(this, x, y)); return origBez.apply(this, arguments); };
  /* an arc/ellipse/rect is not a LINE -- mark the path non-linear so it is excluded */
  let nonlinear = false;
  proto.arc = function () { nonlinear = true; return origArc.apply(this, arguments); };
  proto.ellipse = function () { nonlinear = true; return origEll.apply(this, arguments); };
  proto.rect = function () { nonlinear = true; return origRect.apply(this, arguments); };

  /* parse any css colour to luminance + alpha via a scratch context */
  const s = document.createElement('canvas').getContext('2d');
  const lumCache = new Map();
  const lumOf = (css) => {
    if (lumCache.has(css)) return lumCache.get(css);
    s.clearRect(0, 0, 1, 1); s.fillStyle = css; s.fillRect(0, 0, 1, 1);
    const d = s.getImageData(0, 0, 1, 1).data;
    const v = { lum: (0.2126 * d[0] + 0.7152 * d[1] + 0.0722 * d[2]) / 255, a: d[3] / 255 };
    lumCache.set(css, v); return v;
  };

  const rows = new Map();
  let gradN = 0, gradLen = 0;   /* gradient strokes: counted, never scored as ink */
  proto.stroke = function () {
    const r = origStroke.apply(this, arguments);
    try {
      if (!nonlinear && pts.length >= 2) {
        const m = this.getTransform();
        const sc = Math.hypot(m.a, m.b) || 1;              /* device px per world px */
        const lw = this.lineWidth * sc;
        let len = 0, x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
        for (let i = 0; i < pts.length; i++) {
          const [px, py] = pts[i];
          if (i) len += Math.hypot(px - pts[i - 1][0], py - pts[i - 1][1]);
          x0 = Math.min(x0, px); y0 = Math.min(y0, py); x1 = Math.max(x1, px); y1 = Math.max(y1, py);
        }
        /* A CanvasGradient/Pattern has NO luminance. Scoring it '#000' (as this probe
           did until iter 243) makes the RAIN SHAFTS the darkest "line" in the city and
           buries every real one: on seed 7 they were 8160px of phantom black ink at the
           top of the census, and they are a SOFT WASH the eye never reads as a line.
           They are counted apart, never as ink. */
        const grad = typeof this.strokeStyle !== 'string';
        if (grad) { gradN++; gradLen += len; }
        const { lum, a } = grad ? { lum: 1, a: 0 } : lumOf(this.strokeStyle);
        /* the agents' description: LONG, THIN, DARK */
        if (!grad && len >= MINLEN && lw <= 3.0 && lum <= 0.42 && a * this.globalAlpha >= 0.35) {
          const st = (new Error()).stack.split('\n').slice(2, 12);
          let fn = '?';
          for (const l of st) {
            const mm = l.match(/at ([A-Za-z_$][\w$]*)/);
            if (mm && !['stroke', 'Object', 'Array', 'Function'].includes(mm[1])) { fn = mm[1]; break; }
          }
          const key = fn + ' | lw=' + lw.toFixed(2) + ' | lum=' + lum.toFixed(2) + ' a=' + a.toFixed(2);
          const e = rows.get(key) || { n: 0, len: 0, maxlen: 0, bb: [1e9, 1e9, -1e9, -1e9] };
          e.n++; e.len += len; e.maxlen = Math.max(e.maxlen, len);
          e.bb[0] = Math.min(e.bb[0], x0); e.bb[1] = Math.min(e.bb[1], y0);
          e.bb[2] = Math.max(e.bb[2], x1); e.bb[3] = Math.max(e.bb[3], y1);
          rows.set(key, e);
        }
      }
    } catch (err) { /* never break the render */ }
    nonlinear = false; pts = [];
    return r;
  };

  render();

  proto.beginPath = origBegin; proto.moveTo = origMove; proto.lineTo = origLine;
  proto.arc = origArc; proto.ellipse = origEll; proto.rect = origRect;
  proto.quadraticCurveTo = origQuad; proto.bezierCurveTo = origBez; proto.stroke = origStroke;

  return { W: cvs.width, H: cvs.height, gradN, gradLen,
    rows: [...rows].map(([k, v]) => ({ k, ...v })).sort((a, b) => b.len - a.len) };
}, { seed, dayT, MINLEN });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on('pageerror', e => console.log('PAGE ERROR:', e.message));
await page.goto(pathToFileURL(ART).href);
await page.waitForTimeout(1200);

console.log(`THIN DARK LINES — per-stroke >=${MINLEN} device px, thin (<=3px), dark (lum<=0.42)`);
console.log('sorted by total device-px of dark linear ink laid down in ONE frame\n');

for (const seed of SEEDS) {
  for (const [name, dayT] of Object.entries(LIGHTS)) {
    const r = await census(page, seed, dayT);
    console.log(`--- seed ${seed} / ${name} (canvas ${r.W}x${r.H}) ---`);
    if (!r.rows.length) { console.log('  (none)\n'); continue; }
    for (const e of r.rows.slice(0, 8)) {
      const [x0, y0, x1, y1] = e.bb;
      console.log(`  ${String(Math.round(e.len)).padStart(6)}px  n=${String(e.n).padStart(4)}  max=${String(Math.round(e.maxlen)).padStart(4)}px  ${e.k}`);
      console.log(`          bbox x ${(x0 / r.W).toFixed(2)}..${(x1 / r.W).toFixed(2)}  y ${(y0 / r.H).toFixed(2)}..${(y1 / r.H).toFixed(2)}`);
    }
    console.log(`          [gradient strokes excluded: n=${r.gradN}, ${Math.round(r.gradLen)}px — soft washes, not lines]`);
    console.log('');
  }
}
await browser.close();
