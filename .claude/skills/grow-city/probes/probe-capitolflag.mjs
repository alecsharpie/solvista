/* probe-capitolflag — do the parliament's twin standards FLY WITH THE WIND?  (iter 338)
 *
 * The capitol's two gold standards flapped on `Math.sin(time*2+y)` — a clock term with
 * no wind in it — while every other flag in the city (hall/school windFlag, harbour +
 * beach flags, kites) rides the shared gust (windForce). They are the un-enumerated
 * member of the wind's reader category (280: grep the MECHANISM, not the reader list).
 *
 * It reads NO PIXELS — it hooks the artifact's own path ops and reads back the pennant
 * triangle the frame ISSUES (base verts share the pole x; tip offset +st downwind), so
 * the reach = tipX - baseX is deterministic, with NO NOISE FLOOR AT ALL. BUILD-AGNOSTIC:
 * `windForce` is a top-level function, so `window.windForce=()=>1` renders HEAD's draw
 * IN-PAGE (253) — ONE file grades HEAD and the patch, no source swap, no cross-build floor.
 *
 * Columns (reach = pennant tip's downwind extent past the pole, CSS px, mean of the 2):
 *   GALE   real windForce, WINDA=1.0  — full gale.
 *   CALM   real windForce, WINDA=0.25 — dead calm: the standard streams less + droops.
 *   HEAD   windForce()=>1, WINDA=0.25 — HEAD's draw (ignores wind).
 * Assertions:
 *   RESPONSE     CALM << GALE            (the standard answers the wind)
 *   FIXED POINT  GALE == HEAD            (windForce()==1 reproduces HEAD's 4.2+wv2, 245)
 *   MUST-NOT-MOVE  HEAD@calm == HEAD@gale (HEAD ignores wind: the control, 250/253)
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
const WARP  = 61;   /* parliament reveals at 2034 */

/* record every filled path's vertices, before anything renders */
const HOOK = () => {
  const P = CanvasRenderingContext2D.prototype;
  const o = { beginPath:P.beginPath, moveTo:P.moveTo, lineTo:P.lineTo, fill:P.fill };
  const S = window.__cf = { pts:[], tris:[], on:false };
  P.beginPath = function(){ S.pts = []; return o.beginPath.call(this); };
  P.moveTo = function(x,y){ S.pts.push([x,y]); return o.moveTo.apply(this,arguments); };
  P.lineTo = function(x,y){ S.pts.push([x,y]); return o.lineTo.apply(this,arguments); };
  P.fill = function(){
    if(S.on && S.pts.length===3){
      const p=S.pts;
      /* a pennant: the two BASE verts share the pole x (p[0], p[2]); p[1] is the tip */
      if(Math.abs(p[0][0]-p[2][0])<0.6 && Math.abs(p[0][1]-p[2][1])>0.4 && Math.abs(p[0][1]-p[2][1])<6)
        S.tris.push({ bx:p[0][0], by:(p[0][1]+p[2][1])/2, reach:p[1][0]-p[0][0] });
    }
    return o.fill.call(this);
  };
};

const collect = async (page, seed) => await page.evaluate(({ seed, warp }) => {
  const S = window.__cf;
  playing = false;
  genWorld(seed); window.__warp(warp);
  for(const c of cells) if(c.h < c.th) c.h = c.th;
  STARS.length = 0; flock = null;
  time = 1000; waveT = 500;
  window.__setTime(0.35);
  render();  /* warm-up: SUNT/LITAMT are recomputed inside render() (274) */

  /* the parliament's WORLD centre (the hooked verts are px() world coords, drawn under
     setTransform(dpr*scale,...)), so we keep only pennants ON it (there is one/city) */
  const par = window.__find('parliament').map(p => { const [wx,wy]=ctr(p.x,p.y); return {wx,wy}; });
  const orig = window.windForce;

  /* record the two pennants closest to a parliament centre, mean their reach */
  const grab = () => {
    S.tris = []; S.on = true; render(); S.on = false;
    if(!par.length) return null;
    const near = S.tris.filter(t => par.some(p => Math.hypot(t.bx-p.wx, t.by-p.wy) < 30));
    if(near.length < 2) return null;
    near.sort((a,b)=>Math.abs(a.reach)-Math.abs(b.reach));
    /* two standards per city, same st ⇒ take the mean reach */
    const r = near.map(t=>t.reach);
    return { mean: r.reduce((s,v)=>s+v,0)/r.length, n: r.length,
             min: Math.min(...r), max: Math.max(...r) };
  };

  window.windForce = orig; window.__setWind(1.0);  const gale = grab();
  window.windForce = orig; window.__setWind(0.25); const calm = grab();
  window.windForce = ()=>1; window.__setWind(0.25); const head = grab();
  window.windForce = ()=>1; window.__setWind(1.0);  const headg = grab();
  window.windForce = orig;

  return { par: par.length, gale, calm, head, headg };
}, { seed, warp: WARP });

const run = async () => {
  const b = await chromium.launch();
  const page = await b.newPage();
  await page.addInitScript(HOOK);
  await page.goto(pathToFileURL(ART).href);
  await page.waitForTimeout(300);

  console.log(`\nprobe-capitolflag — the capitol standards vs the wind   (ART=${ART.split('/').pop()})`);
  console.log('seed  parliaments   GALE    CALM    HEAD   HEAD@gale   response   fixedpt   ctrl');
  let allResp = true, allFix = true, allCtrl = true;
  for(const seed of SEEDS){
    const r = await collect(page, seed);
    if(!r.gale || !r.calm || !r.head){ console.log(`${seed}   (no parliament / pennants not found: par=${r.par})`); continue; }
    const gale=r.gale.mean, calm=r.calm.mean, head=r.head.mean, headg=r.headg.mean;
    const resp = calm < gale*0.65;                 /* calm streams clearly less */
    const fix  = Math.abs(gale-head) < 0.05;        /* windForce==1 == HEAD */
    const ctrl = Math.abs(head-headg) < 0.001;      /* HEAD ignores wind */
    allResp &&= resp; allFix &&= fix; allCtrl &&= ctrl;
    console.log(`${String(seed).padEnd(5)} ${String(r.par).padStart(3)}         ` +
      `${gale.toFixed(2).padStart(6)} ${calm.toFixed(2).padStart(7)} ${head.toFixed(2).padStart(7)} ` +
      `${headg.toFixed(2).padStart(8)}    ${resp?'✓':'✗'}(${(calm/gale).toFixed(2)}x)   ${fix?'✓':'✗'}      ${ctrl?'✓':'✗'}`);
  }
  await b.close();
  const pass = allResp && allFix && allCtrl;
  console.log(`\nRESPONSE ${allResp?'PASS':'FAIL'} · FIXED POINT ${allFix?'PASS':'FAIL'} · CONTROL ${allCtrl?'PASS':'FAIL'}`);
  console.log(`CAPITOLFLAG: ${pass?'PASS':'FAIL'}\n`);
  process.exit(pass?0:1);
};
run();
