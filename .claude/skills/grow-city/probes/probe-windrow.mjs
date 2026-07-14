/* probe-windrow — does a wind row TAPER, or is it ruler-drawn?  (iter 275, cue (as))
 *
 * Cue (as): both 266 agents, independently, on two seeds, read the windrows as
 * "perfectly straight and uniform in thickness". A STROKE has exactly ONE width, so
 * that is not a tuning miss — it is structural, and HEAD's answer is a CONSTANT by
 * construction. So the headline needs no threshold (236): HEAD reads
 * DISTINCT WIDTHS PER ROW = 1, which IS the defect, stated.
 *
 * It reads NO PIXELS for the geometry — it hooks the artifact's own path ops and reads
 * back the shape the frame actually issues. Deterministic, NO NOISE FLOOR AT ALL.
 * BUILD-AGNOSTIC: it classifies a row by its foam style + its EXTENT (a row spans >= 1
 * cell; no cap streak, glint or wake does), so ONE file grades HEAD and the patch with
 * no source swap and no cross-build floor (230).
 *
 * Columns:
 *   WIDTH PROFILE   the treatment: half-width at the head / belly / tail of each row.
 *   S-CURVE         max deviation of the spine from its own chord, in CSS px.
 *   INK             mean px per row, isolated by SUPPRESSING the classified rows in ONE
 *                   page and diffing (floor exactly 0, occlusion free) — the MUST-HOLD
 *                   column: the taper is a change of SHAPE, not of brightness (245).
 *   ROWS            the must-not-move column (250): the siting rule is untouched.
 *   CAPS/GLINTS     the other foam draws — must not move (250).
 *   NIGHT           the free dead-regime control (199): the rows are gated LITAMT<0.6.
 */
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join, resolve } from 'path';
import { existsSync } from 'fs';
import { homedir } from 'os';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;

const HERE = dirname(fileURLToPath(import.meta.url));
/* resolve relative to the probe's OWN location, never an absolute path — and survive the
   git mv from the repo root into probes/ */
const LOCAL = join(HERE, 'solvista.html');
const ART  = process.env.SRC ? resolve(process.env.SRC)
           : existsSync(LOCAL) ? LOCAL
           : join(HERE, '../../../../solvista.html');
const SEEDS = [42, 7, 1234];
const WARP  = 61;

/* the recorder + suppressor. Installed once, before anything renders. */
const HOOK = () => {
  const P = CanvasRenderingContext2D.prototype;
  const o = { beginPath:P.beginPath, moveTo:P.moveTo, lineTo:P.lineTo,
              quadraticCurveTo:P.quadraticCurveTo, bezierCurveTo:P.bezierCurveTo,
              ellipse:P.ellipse, arc:P.arc, fill:P.fill, stroke:P.stroke };
  const S = window.__wr = { pts:[], rows:[], caps:0, glints:0, suppress:false, on:false, foam:null };

  P.beginPath = function(){ S.pts = []; return o.beginPath.call(this); };
  P.moveTo = function(x,y){ S.pts.push([x,y]); return o.moveTo.apply(this,arguments); };
  P.lineTo = function(x,y){ S.pts.push([x,y]); return o.lineTo.apply(this,arguments); };
  P.quadraticCurveTo = function(cx,cy,x,y){ S.pts.push([cx,cy],[x,y]); return o.quadraticCurveTo.apply(this,arguments); };
  P.bezierCurveTo = function(a,b,c,d,x,y){ S.pts.push([a,b],[c,d],[x,y]); return o.bezierCurveTo.apply(this,arguments); };
  /* the whitecaps are ellipses — hook them or they vanish from the control column */
  P.ellipse = function(x,y){ S.pts.push([x,y]); return o.ellipse.apply(this,arguments); };
  P.arc     = function(x,y){ S.pts.push([x,y]); return o.arc.apply(this,arguments); };

  /* NEVER match a colour LITERAL: colA() puts foam through the day's tint (base
     [255,251,240] renders as rgba(242,250,249) at noon), and Chromium canonicalises the
     string on read besides. Ask the artifact what foam IS right now, and compare parsed
     numbers. window.__wr.foam is refreshed by the caller before every render. */
  const rgbOf = s => { const m = String(s).match(/(\d+)[,\s]+(\d+)[,\s]+(\d+)/); return m ? m[1]+','+m[2]+','+m[3] : null; };
  window.__wr.rgbOf = rgbOf;

  /* A windrow is a foam-styled path spanning >= 0.8 of a cell. Nothing else foam-coloured
     is that long once the movers are cleared (a cap streak is ~8px, a glint ~2px). */
  const span = () => {
    let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;
    for(const p of S.pts){ if(p[0]<x0)x0=p[0]; if(p[0]>x1)x1=p[0]; if(p[1]<y0)y0=p[1]; if(p[1]>y1)y1=p[1]; }
    return { w:x1-x0, h:y1-y0, pts:S.pts.slice() };
  };
  const grab = (kind, style, lw) => {
    if(!S.on || !S.foam) return false;
    if(rgbOf(style) !== S.foam) return false;
    const b = span();
    /* A long foam path is NOT automatically a windrow: the mole's break and the shore surf
       are long foam strokes too (they showed up 11-per-city at NIGHT, where a windrow
       cannot exist — the night control caught them). So gate on the windrow's OWN
       precondition, read off the cell being drawn: deep, open, non-river water. */
    if(b.w < CW*0.8 || !S.deep){ if(kind==='stroke') S.caps++; else S.glints++; return false; }
    S.rows.push({ kind, lw, pts:b.pts });
    return S.suppress;                      /* true => skip the draw (isolation) */
  };
  P.fill   = function(){ if(grab('fill',   this.fillStyle,   0))              return; return o.fill.apply(this,arguments); };
  P.stroke = function(){ if(grab('stroke', this.strokeStyle, this.lineWidth)) return; return o.stroke.apply(this,arguments); };
};

/* Freeze the world completely: 213's addInitScript PRNG stub subsumes STARS/flock/the
   Math.random spawns; then pin both clocks, clear every mover (their wakes are foam and
   would masquerade as rows — 196's contaminant), and settle the heights (272: render()
   GROWS the city while it draws it). */
const freeze = (seed, warp) => {
  playing = false;
  genWorld(seed); window.__warp(warp);
  for(const c of cells) if(c.h < c.th) c.h = c.th;
  STARS.length = 0; flock = null;
  for(const a of [boats, ferries, freighters, kayaks, whales, dolphins, cars, trucks, trams, peds])
    if(Array.isArray(a)) a.length = 0;
  time = 1000; waveT = 500;
};

const px2css = () => 1 / (window.devicePixelRatio || 1);

const run = async (page, seed, dayT) => await page.evaluate(({ seed, dayT, warp }) => {
  const S = window.__wr;
  /* refresh foam's CURRENT rendered rgb — it moves with the light */
  const reset = () => { S.rows = []; S.caps = 0; S.glints = 0; S.foam = S.rgbOf(colA('foam',1,1)); };

  /* tag every draw with the cell it belongs to, and evaluate the windrow's own
     precondition there — the mole and the surf are foam and long, and are NOT rows */
  if(!window.__wrHooked){
    window.__wrHooked = true;
    const od = drawCell;
    window.drawCell = function(x, y){
      const c = cellAt(x, y);
      S.deep = !!(c && c.t === T.WATER && !c.riv && rDeep[idx(x,y)] > SHELF1);
      const r = od.apply(this, arguments);
      S.deep = false;
      return r;
    };
    /* the MOLE sits on deep-water hexes and its break is a long foam stroke — it is not a
       row, and it is what the night control was catching (6 per city, at every hour) */
    const om = drawMoleAt;
    window.drawMoleAt = function(){ const d = S.deep; S.deep = false;
      const r = om.apply(this, arguments); S.deep = d; return r; };
  }

  playing = false;
  genWorld(seed); window.__warp(warp);
  for(const c of cells) if(c.h < c.th) c.h = c.th;
  STARS.length = 0; flock = null;
  for(const nm of ['boats','ferries','freighters','kayaks','whales','dolphins','cars','trucks','trams','peds','bikes','dogs']){
    try { const a = eval(nm); if(Array.isArray(a)) a.length = 0; } catch(e){}
  }
  /* ⚠ WINDA is a THIRD CLOCK and playing=false does not stop it (195f). seaState() is a
     pure function of it, and the whole windrow rule — the anchor share, the length, the
     alpha, the belly — is a pure function of seaState(). Leave it and it holds whatever
     wall-clock-dependent value the RAF loop reached before the freeze: two loads of the
     SAME file read ss = 0.8002 and 0.8024, which moved a whitecap and made the
     must-not-move control drift by 1. No probe's freeze list names it. */
  time = 1000; waveT = 500; WINDA = 0.75;
  window.__setTime(dayT);

  const cvs = document.querySelector('canvas');
  const g = cvs.getContext('2d');
  const shot = () => g.getImageData(0,0,cvs.width,cvs.height).data;

  /* warm-up: __setTime only assigns dayT — SUNT/LITAMT/TINT are recomputed once a frame
     INSIDE render() (274), so foam's current colour is not knowable until one has run. */
  render();

  /* ---- A. as shipped: record the rows ---- */
  S.on = true; S.suppress = false; reset();
  render();
  const rows = S.rows.slice(), caps = S.caps, glints = S.glints;
  const A = shot();

  /* ---- B. same frozen world, rows suppressed: the diff IS the rows ---- */
  S.suppress = true; reset();
  render();
  const B = shot();
  S.on = false; S.suppress = false;

  /* ---- C. floor: render A's condition twice, must be 0 ---- */
  S.on = true; S.suppress = false; reset();
  render();
  const A2 = shot();
  S.on = false;

  const diff = (p, q) => { let n = 0, sum = 0;
    for(let i = 0; i < p.length; i += 4){
      const d = Math.max(Math.abs(p[i]-q[i]), Math.abs(p[i+1]-q[i+1]), Math.abs(p[i+2]-q[i+2]));
      if(d > 2){ n++; sum += d; }
    }
    return { n, amp: n ? sum/n : 0 };
  };
  const ink = diff(A, B), floor = diff(A, A2);

  /* geometry, in CSS px (the units a viewer reads) */
  const dpr = window.devicePixelRatio || 1;
  const sc = (typeof scale !== 'undefined' ? scale : 1) / dpr;
  const prof = [];
  for(const r of rows){
    let W;                                              /* half-width at head / belly / tail */
    let dev = 0;
    if(r.kind === 'stroke'){
      W = [r.lw/2, r.lw/2, r.lw/2];                     /* a stroke has ONE width, everywhere */
      const p = r.pts;                                  /* moveTo, ctrl, end */
      if(p.length >= 3){
        const a = p[0], b = p[p.length-1], c = p[1];
        const L = Math.hypot(b[0]-a[0], b[1]-a[1]) || 1;
        /* a quadratic's max deviation from its chord is half the control's offset */
        dev = Math.abs((c[0]-a[0])*(b[1]-a[1]) - (c[1]-a[1])*(b[0]-a[0])) / L / 2;
      }
    } else {
      /* the fill is left side [0..N] then right side [N..0]: pair them up */
      const p = r.pts, n = p.length / 2;
      const half = i => {
        const l = p[i], rr = p[p.length-1-i];
        return Math.hypot(l[0]-rr[0], l[1]-rr[1]) / 2;
      };
      const belly = Math.max(...Array.from({length:n}, (_,i) => half(i)));
      W = [half(1), belly, half(n-2)];
      /* spine = midpoints; deviation from its own chord */
      const mid = i => [(p[i][0]+p[p.length-1-i][0])/2, (p[i][1]+p[p.length-1-i][1])/2];
      const a = mid(0), b = mid(n-1);
      const L = Math.hypot(b[0]-a[0], b[1]-a[1]) || 1;
      for(let i = 1; i < n-1; i++){
        const m = mid(i);
        dev = Math.max(dev, Math.abs((m[0]-a[0])*(b[1]-a[1]) - (m[1]-a[1])*(b[0]-a[0])) / L);
      }
    }
    prof.push({ head:W[0]*sc, belly:W[1]*sc, tail:W[2]*sc, dev:dev*sc, kind:r.kind });
  }

  const mean = a => a.length ? a.reduce((s,v) => s+v, 0) / a.length : 0;
  return {
    rows: rows.length, caps, glints,
    /* TRIPWIRE: on the patch every row is a FILL. Any stroke-row means the classifier has
       caught something else long and foam-coloured (the mole break, the shore surf). */
    strokeRows: prof.filter(p => p.kind === 'stroke').length,
    fillRows:   prof.filter(p => p.kind === 'fill').length,
    head:  mean(prof.map(p => p.head)),
    belly: mean(prof.map(p => p.belly)),
    tail:  mean(prof.map(p => p.tail)),
    dev:   mean(prof.map(p => p.dev)),
    /* the headline: how many DISTINCT half-widths does one row have? a stroke has 1. */
    distinct: mean(prof.map(p => new Set([p.head, p.belly, p.tail].map(v => v.toFixed(3))).size)),
    inkPx: ink.n, inkAmp: ink.amp, floorPx: floor.n,
    perRow: rows.length ? ink.n / rows.length : 0,
    kind: prof.length ? prof[0].kind : '-'
  };
}, { seed, dayT, warp: WARP });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport:{ width:1400, height:900 } });
await page.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s*1664525 + 1013904223) >>> 0) / 4294967296); });
await page.addInitScript(HOOK);
await page.goto(pathToFileURL(ART).href);
await page.waitForTimeout(600);

console.log('probe-windrow — ' + ART.split('/').pop() + (process.env.SRC ? '  [SRC]' : '  [worktree]'));
console.log('');
console.log('A. WIDTH PROFILE + SPINE   (day, dayT=0.35; half-widths in CSS px at fit)');
console.log('   seed   fill/strk  rows   head   belly    tail   distinct   S-dev   caps  glints');
const day = {};
for(const s of SEEDS){
  const r = day[s] = await run(page, s, 0.35);
  console.log(`   ${String(s).padEnd(6)} ${(r.fillRows+'/'+r.strokeRows).padEnd(9)} ${String(r.rows).padStart(4)}  ${r.head.toFixed(2).padStart(5)}  ${r.belly.toFixed(2).padStart(6)}  ${r.tail.toFixed(2).padStart(6)}   ${r.distinct.toFixed(2).padStart(6)}   ${r.dev.toFixed(2).padStart(5)}   ${String(r.caps).padStart(4)}  ${String(r.glints).padStart(6)}`);
}
console.log('');
console.log('B. INK  (rows isolated by suppression in ONE page; MUST HOLD — the taper is a SHAPE change)');
console.log('   seed    rows   ink px   px/row   amp   floor');
for(const s of SEEDS){
  const r = day[s];
  console.log(`   ${String(s).padEnd(6)} ${String(r.rows).padStart(5)}  ${String(r.inkPx).padStart(7)}  ${r.perRow.toFixed(1).padStart(6)}  ${r.inkAmp.toFixed(1).padStart(4)}  ${String(r.floorPx).padStart(5)}`);
}
console.log('');
console.log('C. NIGHT — the free dead-regime control (199): the rows are gated LITAMT<0.6');
console.log('   seed    rows   ink px');
for(const s of SEEDS){
  const r = await run(page, s, 0.92);
  console.log(`   ${String(s).padEnd(6)} ${String(r.rows).padStart(5)}  ${String(r.inkPx).padStart(6)}`);
}
await browser.close();
