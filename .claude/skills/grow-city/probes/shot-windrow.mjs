/* shot-windrow — the camera for cue (as) (iter 275).
 *
 * A genuinely BLIND HEAD-vs-patch pair, and it is honest here BECAUSE the lap draws zero
 * rng() and changes no terrain: both builds generate the IDENTICAL city, with the rows on
 * the identical hexes. Only their SHAPE differs.
 *
 * Laws obeyed:
 *  - aim by the ARGMAX OF MEASURED INK, scored per ROW, then pan to that row's own anchor
 *    ctr() (226/272) — never a guessed clip, never a tile predicate;
 *  - sum the ink map at FULL RESOLUTION (272a: the rows are sparse — a stride would see
 *    ~1/16 of them and aim at noise);
 *  - zero the HUD boxes before the argmax (200: the canvas is not what the user sees);
 *  - drive `zoom`, NEVER `scale` (269: setZoom derives scale = fitScale*zoom);
 *  - pins DERIVED from the light curve at the year being shot, never typed (264/271);
 *  - pin WINDA — a THIRD clock that playing=false does not stop (see probe-windrow);
 *  - frames named by FILE, with MEANINGLESS tokens, map CROSSED between seeds (238/239/268);
 *  - page.screenshot(), DOM-composited (200);
 *  - every frame self-reports its state — but NEVER the treatment, or the pair is not blind.
 *
 * A moderate zoom on purpose (159): a subtle coast ornament is invisible at fit and stacks
 * into bars at 7x. This is the scale the coast is actually looked at.
 */
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { mkdirSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));

/* resolve the artifact relative to the probe's OWN location, never an absolute path */
const LOCAL = join(HERE, 'solvista.html');
const ART   = existsSync(LOCAL) ? LOCAL : join(HERE, '../../../../solvista.html');
/* HEAD: git show HEAD:solvista.html > /tmp/head-solvista.html */
const HEADSRC = process.env.HEADSRC || '/tmp/head-solvista.html';
const OUT   = resolve(process.argv[3] || join(HERE, 'shots/windrow'));
const SEEDS = [42, 7];
const WARP  = 61, WIND = 0.85, ZOOM = 3.6;
/* the treatment is not always the second frame, and the tokens carry no order (268) */
const TOKENS = { 42: ['kappa', 'sigma'], 7: ['sigma', 'kappa'] };
mkdirSync(OUT, { recursive: true });

const HOOK = () => {
  const P = CanvasRenderingContext2D.prototype;
  const o = { beginPath:P.beginPath, moveTo:P.moveTo, lineTo:P.lineTo,
              quadraticCurveTo:P.quadraticCurveTo, fill:P.fill, stroke:P.stroke };
  const S = window.__wr = { pts:[], rows:[], suppress:false, on:false, foam:null, deep:false, xy:null };
  const rgbOf = s => { const m = String(s).match(/(\d+)[,\s]+(\d+)[,\s]+(\d+)/); return m ? m[1]+','+m[2]+','+m[3] : null; };
  S.rgbOf = rgbOf;
  P.beginPath = function(){ S.pts = []; return o.beginPath.call(this); };
  P.moveTo = function(x,y){ S.pts.push([x,y]); return o.moveTo.apply(this,arguments); };
  P.lineTo = function(x,y){ S.pts.push([x,y]); return o.lineTo.apply(this,arguments); };
  P.quadraticCurveTo = function(cx,cy,x,y){ S.pts.push([cx,cy],[x,y]); return o.quadraticCurveTo.apply(this,arguments); };
  const grab = (kind, style) => {
    if(!S.on || !S.foam || !S.deep) return false;
    if(rgbOf(style) !== S.foam) return false;
    let x0=1e9,x1=-1e9; for(const p of S.pts){ if(p[0]<x0)x0=p[0]; if(p[0]>x1)x1=p[0]; }
    if(x1-x0 < CW*0.8) return false;
    S.rows.push({ xy:S.xy, head:S.pts[0] });
    return S.suppress;
  };
  P.fill   = function(){ if(grab('fill',   this.fillStyle))   return; return o.fill.apply(this,arguments); };
  P.stroke = function(){ if(grab('stroke', this.strokeStyle)) return; return o.stroke.apply(this,arguments); };
};

const shoot = async (page, src, seed, token) => {
  const info = await page.evaluate(({ seed, warp, wind, zoom }) => {
    const S = window.__wr;
    if(!window.__wrHooked){
      window.__wrHooked = true;
      const od = drawCell;
      window.drawCell = function(x, y){
        const c = cellAt(x, y);
        S.deep = !!(c && c.t === T.WATER && !c.riv && rDeep[idx(x,y)] > SHELF1);
        S.xy = [x, y];
        const r = od.apply(this, arguments); S.deep = false; return r;
      };
      const om = drawMoleAt;   /* the mole's break is foam and long, and is not a row */
      window.drawMoleAt = function(){ const d = S.deep; S.deep = false;
        const r = om.apply(this, arguments); S.deep = d; return r; };
    }
    playing = false;
    genWorld(seed); window.__warp(warp);
    for(const c of cells) if(c.h < c.th) c.h = c.th;   /* render() GROWS the city while it draws it (272) */
    STARS.length = 0; flock = null;
    time = 1000; waveT = 500; WINDA = wind;            /* WINDA is a third clock (see probe-windrow) */

    /* DERIVE the day pin from the artifact's own light curve at the year being shot — never
       type one (264). The rows are gated LITAMT<0.6; take the brightest daylight there is. */
    let best = 1e9, bt = 0.35;
    for(let t = 0; t < 1; t += 0.005){
      const lit = daylight(sunWarp(t)).lit;
      if(lit < best){ best = lit; bt = t; }
    }
    window.__setTime(bt);
    render();                                          /* __setTime only assigns dayT (274) */

    const cvs = document.querySelector('canvas');
    const g = cvs.getContext('2d');
    const grab = () => g.getImageData(0, 0, cvs.width, cvs.height);

    /* isolate the rows' own ink: render as shipped, then with the rows suppressed */
    S.on = true; S.suppress = false; S.rows = []; S.foam = S.rgbOf(colA('foam',1,1));
    render();
    const A = grab(), rows = S.rows.slice();
    S.suppress = true; render();
    const B = grab();
    S.on = false; S.suppress = false;

    /* the ink map, at FULL resolution — the rows are sparse (272a) */
    const W = cvs.width, H = cvs.height, dpr = window.devicePixelRatio || 1;
    const ink = new Float32Array(W * H);
    for(let i = 0, p = 0; i < A.data.length; i += 4, p++){
      const d = Math.max(Math.abs(A.data[i]-B.data[i]), Math.abs(A.data[i+1]-B.data[i+1]), Math.abs(A.data[i+2]-B.data[i+2]));
      ink[p] = d > 2 ? d : 0;
    }
    /* the canvas is NOT what the user sees (200): zero the ink behind every HUD box */
    let hudZeroed = 0;
    for(const sel of ['.placard', '.census', '.controls']){
      const el = document.querySelector(sel); if(!el) continue;
      const r = el.getBoundingClientRect();
      for(let yy = Math.max(0, r.top*dpr|0); yy < Math.min(H, r.bottom*dpr); yy++)
        for(let xx = Math.max(0, r.left*dpr|0); xx < Math.min(W, r.right*dpr); xx++){
          if(ink[yy*W+xx]) hudZeroed++;
          ink[yy*W+xx] = 0;
        }
    }
    /* score each ROW by the ink in ITS OWN neighbourhood, argmax over ROWS, then pan to
       that row's anchor ctr() — an ink WINDOW's centre need not sit on any row (272b) */
    const R = 90 * dpr;
    let bestRow = null, bestScore = -1;
    for(const r of rows){
      const sx = r.head[0] * scale + offX, sy = r.head[1] * scale + offY;   /* world -> screen */
      const px0 = sx * dpr, py0 = sy * dpr;
      let s = 0;
      for(let yy = Math.max(0, py0-R|0); yy < Math.min(H, py0+R); yy++)
        for(let xx = Math.max(0, px0-R|0); xx < Math.min(W, px0+R); xx++) s += ink[yy*W+xx];
      if(s > bestScore){ bestScore = s; bestRow = r; }
    }
    let totalInk = 0; for(let i = 0; i < ink.length; i++) totalInk += ink[i] > 0 ? 1 : 0;
    return { bt, lit: best, rows: rows.length, aim: bestRow ? bestRow.xy : null,
             bestScore: Math.round(bestScore), hudZeroed, totalInk, WINDA, ss: seaState() };
  }, { seed, warp: WARP, wind: WIND, zoom: ZOOM });

  /* whole-city, un-zoomed — the frame must still read as a coastal city (the invariant) */
  await page.evaluate(() => { scale = fitScale; offX = fitX; offY = fitY; zoom = 1;
    lastSky = 0; syncSky(performance.now()); syncStats(); render(); });
  await page.screenshot({ path: join(OUT, `s${seed}-${token}-city.png`) });

  /* the close-up: drive ZOOM, never scale (269); zoom about the centre, then pan explicitly
     to the aimed row (272c: zoomAt + clampPan strands the target at the frame edge) */
  await page.evaluate(({ aim, zoom: Z }) => {
    /* the app never assigns `scale` directly — it derives it (zoomAt, and the '0' key both
       do `zoom=n; scale=fitScale*zoom`). Drive the input, let the output follow (269). */
    zoom = Z; scale = fitScale * zoom;
    const [wx, wy] = ctr(aim[0], aim[1]);
    offX = innerWidth/2  - wx*scale;
    offY = innerHeight/2 - wy*scale;
    clampPan(); lastSky = 0; syncSky(performance.now()); syncStats(); render();
  }, { aim: info.aim, zoom: ZOOM });
  await page.screenshot({ path: join(OUT, `s${seed}-${token}-sea.png`) });
  return info;
};

const browser = await chromium.launch();
for(const seed of SEEDS){
  const builds = [
    { src: HEADSRC, token: TOKENS[seed][0] },
    { src: ART,     token: TOKENS[seed][1] }
  ];
  for(const b of builds){
    const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
    await page.addInitScript(() => { let s = 0x51F3A9C >>> 0;
      Math.random = () => ((s = (s*1664525 + 1013904223) >>> 0) / 4294967296); });
    await page.addInitScript(HOOK);
    await page.goto(pathToFileURL(b.src).href);
    await page.waitForTimeout(600);
    const i = await shoot(page, b.src, seed, b.token);
    console.log(`seed ${seed}  ${b.token.padEnd(6)}  rows=${String(i.rows).padStart(2)}  aim=hex(${i.aim})  ` +
                `dayT=${i.bt.toFixed(3)} LITAMT=${i.lit.toFixed(3)}  WINDA=${i.WINDA} ss=${i.ss.toFixed(2)}  ` +
                `rowInk=${i.totalInk}px  hudZeroed=${i.hudZeroed}px`);
    await page.close();
  }
}
await browser.close();
console.log('\n-> ' + OUT);
