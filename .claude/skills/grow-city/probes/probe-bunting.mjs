/* probe-bunting — does the festival strand STIR WITH THE WIND?  (iter 339)
 *
 * The bunting — strung along the civic-mile festival strand (c.fete) and around the
 * civic square — hung as frozen dead-straight pennants on a fixed catenary, while every
 * other festive/cloth thing in the city rides the shared gust (windForce): the flags flap,
 * the kites fly, the sails belly, the smoke leans (280/333/334/338). It is the un-enumerated
 * member of the wind's reader category (280: grep the MECHANISM windForce, not the reader list).
 *
 * It reads NO PIXELS — it hooks the artifact's own path ops and reads back the pennant
 * TRIANGLE the frame ISSUES (top edge two verts share a y, 2px apart; the 3rd is the tip),
 * so the tip's downwind stream (tipX - mid) and its vertical drop are deterministic, with
 * NO NOISE FLOOR AT ALL. BUILD-AGNOSTIC: `windForce` is a top-level function, so
 * `window.windForce=()=>0` renders HEAD's draw IN-PAGE (253) — ONE file grades HEAD and the
 * patch, no source swap, no cross-build floor.
 *
 * Columns (mean over every bunting pennant in the frame; STREAM = tip's +x downwind offset,
 * DROP = tip's drop below the top edge, both CSS px):
 *   GALE  real windForce, WINDA=1.0  — full gale: tip streams downwind + lifts.
 *   CALM  real windForce, WINDA=0.25 — dead calm: windForce()==0, limp straight-down (== HEAD).
 *   HEAD  windForce()=>0 always      — HEAD's draw (ignores wind).
 * Assertions:
 *   RESPONSE      GALE stream >> CALM stream, GALE drop < CALM drop  (the strand answers the wind)
 *   FIXED POINT   CALM == HEAD                (windForce()==0 reproduces HEAD's limp pennant, 245)
 *   MUST-NOT-MOVE HEAD@calm == HEAD@gale      (HEAD ignores wind: the control, 250/253)
 */
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join, resolve } from 'path';
import { existsSync } from 'fs';
import { homedir } from 'os';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;

const HERE = dirname(fileURLToPath(import.meta.url));
const LOCAL = join(HERE, 'solvista.html');
const ART  = process.env.SRC ? resolve(process.env.SRC)
           : existsSync(LOCAL) ? LOCAL
           : join(HERE, '../../../../solvista.html');
const SEEDS = [42, 7, 1234, 99];
const WARP  = 61;

/* record every filled 3-vertex path, before anything renders */
const HOOK = () => {
  const P = CanvasRenderingContext2D.prototype;
  const o = { beginPath:P.beginPath, moveTo:P.moveTo, lineTo:P.lineTo, fill:P.fill };
  const S = window.__bt = { pts:[], tris:[], on:false };
  P.beginPath = function(){ S.pts = []; return o.beginPath.call(this); };
  P.moveTo = function(x,y){ S.pts.push([x,y]); return o.moveTo.apply(this,arguments); };
  P.lineTo = function(x,y){ S.pts.push([x,y]); return o.lineTo.apply(this,arguments); };
  P.fill = function(){
    if(S.on && S.pts.length===3){
      const p=S.pts;
      /* a bunting pennant: top edge p[0],p[1] share a y and lie ~2px apart; p[2] is the tip */
      const w = Math.abs(p[0][0]-p[1][0]), dy = Math.abs(p[0][1]-p[1][1]);
      if(dy < 0.02 && w > 1.9 && w < 2.1){
        const midx=(p[0][0]+p[1][0])/2, midy=(p[0][1]+p[1][1])/2;
        const drop = p[2][1]-midy;
        if(drop > 0.7 && drop < 2.4)   /* tip hangs below the top edge (0.88..2.2) */
          S.tris.push({ stream: p[2][0]-midx, drop });
      }
    }
    return o.fill.call(this);
  };
};

const collect = async (page, seed) => await page.evaluate(({ seed, warp }) => {
  const S = window.__bt;
  playing = false;
  genWorld(seed); window.__warp(warp);
  for(const c of cells) if(c.h < c.th) c.h = c.th;
  STARS.length = 0; flock = null;
  time = 1000; waveT = 500;
  window.__setTime(0.35);
  render();  /* warm-up */

  const orig = window.windForce;
  const grab = () => {
    S.tris = []; S.on = true; render(); S.on = false;
    if(!S.tris.length) return null;
    const n = S.tris.length;
    const s = S.tris.reduce((a,t)=>a+t.stream,0)/n;
    const d = S.tris.reduce((a,t)=>a+t.drop,0)/n;
    return { n, stream: s, drop: d };
  };

  window.windForce = orig; window.__setWind(1.0);  const gale = grab();
  window.windForce = orig; window.__setWind(0.25); const calm = grab();
  window.windForce = ()=>0; window.__setWind(0.25); const head = grab();
  window.windForce = ()=>0; window.__setWind(1.0);  const headg = grab();
  window.windForce = orig;

  return { gale, calm, head, headg };
}, { seed, warp: WARP });

const run = async () => {
  const b = await chromium.launch();
  const page = await b.newPage();
  await page.addInitScript(HOOK);
  await page.goto(pathToFileURL(ART).href);
  await page.waitForTimeout(300);

  console.log(`\nprobe-bunting — the festival strand vs the wind   (ART=${ART.split('/').pop()})`);
  console.log('seed  pennants   GALE.stream  CALM.stream   GALE.drop  CALM.drop   response  fixedpt  ctrl');
  let allResp = true, allFix = true, allCtrl = true, any = false;
  for(const seed of SEEDS){
    const r = await collect(page, seed);
    if(!r.gale || !r.calm || !r.head){ console.log(`${seed}   (no bunting pennants found)`); continue; }
    any = true;
    const gs=r.gale.stream, cs=r.calm.stream, gd=r.gale.drop, cd=r.calm.drop;
    const hs=r.head.stream, hd=r.head.drop, hgs=r.headg.stream, hgd=r.headg.drop;
    const resp = gs > cs + 2 && gd < cd - 0.8;              /* clear stream + lift in a gale */
    const fix  = Math.abs(cs-hs) < 0.02 && Math.abs(cd-hd) < 0.02;   /* calm == HEAD */
    const ctrl = Math.abs(hs-hgs) < 0.001 && Math.abs(hd-hgd) < 0.001; /* HEAD ignores wind */
    allResp &&= resp; allFix &&= fix; allCtrl &&= ctrl;
    console.log(`${String(seed).padEnd(5)} ${String(r.gale.n).padStart(5)}      ` +
      `${gs.toFixed(2).padStart(7)} ${cs.toFixed(2).padStart(11)} ${gd.toFixed(2).padStart(11)} ${cd.toFixed(2).padStart(9)}     ` +
      `${resp?'✓':'✗'}       ${fix?'✓':'✗'}      ${ctrl?'✓':'✗'}`);
  }
  await b.close();
  const pass = any && allResp && allFix && allCtrl;
  console.log(`\nRESPONSE ${allResp?'PASS':'FAIL'} · FIXED POINT ${allFix?'PASS':'FAIL'} · CONTROL ${allCtrl?'PASS':'FAIL'}`);
  console.log(`BUNTING: ${pass?'PASS':'FAIL'}\n`);
  process.exit(pass?0:1);
};
run();
