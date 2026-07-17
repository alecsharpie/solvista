/* shot-bunting — the festival strand, calm vs gale  (iter 339)
 * A blind A/B on the SAME frozen world at __setWind(0.25) (dead calm == HEAD) and
 * __setWind(1.0) (full gale) — the only thing that can differ is the bunting, which now
 * lifts its string taut and streams its pennants downwind. page.screenshot (DOM-composited,
 * 200). Tokens meaningless + non-ordinal, the calm/gale map CROSSED between seeds (238/239/268).
 *
 * AIM by the bunting's OWN INK (226/272): a whole-scene calm-vs-gale diff is contaminated by
 * every other wind reader (trees, sea, kites, clouds), so we hook the pennant TRIANGLES (like
 * probe-bunting) and centre on the densest strand cluster — guaranteed bunting. */
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join, resolve } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { homedir } from 'os';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const LOCAL = join(HERE, 'solvista.html');
const ART  = process.env.SRC ? resolve(process.env.SRC) : existsSync(LOCAL) ? LOCAL : join(HERE,'../../../../solvista.html');
const OUT  = process.argv[2] || join(HERE, '../shots/bunting');
mkdirSync(OUT, { recursive: true });

const MAP = { 42: { calm:'thistle', gale:'harebell' }, 7: { calm:'harebell', gale:'thistle' } };

/* hook the pennant triangles (top edge 2px, tip below) — recorded in WORLD coords, the
   verts are px()/pxc() world coords drawn under setTransform(dpr*scale,...) */
const HOOK = () => {
  const P = CanvasRenderingContext2D.prototype;
  const o = { beginPath:P.beginPath, moveTo:P.moveTo, lineTo:P.lineTo, fill:P.fill };
  const S = window.__bt = { pts:[], pen:[], on:false };
  P.beginPath = function(){ S.pts=[]; return o.beginPath.call(this); };
  P.moveTo = function(x,y){ S.pts.push([x,y]); return o.moveTo.apply(this,arguments); };
  P.lineTo = function(x,y){ S.pts.push([x,y]); return o.lineTo.apply(this,arguments); };
  P.fill = function(){
    if(S.on && S.pts.length===3){
      const p=S.pts, w=Math.abs(p[0][0]-p[1][0]), dy=Math.abs(p[0][1]-p[1][1]);
      if(dy<0.02 && w>1.9 && w<2.1){ const d=p[2][1]-(p[0][1]+p[1][1])/2;
        if(d>0.7 && d<2.4) S.pen.push([(p[0][0]+p[1][0])/2, (p[0][1]+p[1][1])/2]); }
    }
    return o.fill.call(this);
  };
};

const setup = (page, seed) => page.evaluate(({ seed }) => {
  playing = false;
  genWorld(seed); window.__warp(61);
  for(const c of cells) if(c.h < c.th) c.h = c.th;
  STARS.length = 0; flock = null;
  time = 1000; waveT = 500;
  window.__setTime(0.35);
  render();

  /* collect pennant WORLD positions, find the densest 3-hex-radius cluster */
  const S = window.__bt; S.pen = []; S.on = true; window.__setWind(1.0); render(); S.on = false;
  const pen = S.pen;
  if(!pen.length) return { n:0, aim:null };
  let best=0, aim=pen[0];
  for(const a of pen){ let c=0; for(const b of pen) if(Math.hypot(a[0]-b[0],a[1]-b[1])<70) c++;
    if(c>best){ best=c; aim=a; } }
  return { n: pen.length, cluster: best, aim };
}, { seed });

const frameZoom = (page, wc, wind) => page.evaluate(({ wc, wind }) => {
  zoom = 9; scale = fitScale*zoom;
  offX = innerWidth/2 - wc[0]*scale; offY = innerHeight/2 - wc[1]*scale; clampPan();
  window.__setWind(wind);
  lastSky = 0; syncSky(performance.now()); syncStats();
  render();
}, { wc, wind });

const frameCity = (page, wind) => page.evaluate(({ wind }) => {
  zoom = 1; scale = fitScale; offX = fitX; offY = fitY;
  window.__setWind(wind);
  lastSky = 0; syncSky(performance.now()); syncStats();
  render();
}, { wind });

const run = async () => {
  const b = await chromium.launch();
  for(const seed of [42, 7]){
    const page = await b.newPage();
    await page.addInitScript(HOOK);
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(pathToFileURL(ART).href);
    await page.waitForTimeout(300);
    const { n, cluster, aim } = await setup(page, seed);
    if(!aim){ console.log(`seed ${seed}: no bunting found`); await page.close(); continue; }
    const m = MAP[seed];
    await frameZoom(page, aim, 0.25); await page.screenshot({ path: join(OUT, `s${seed}-${m.calm}.png`) });
    await frameZoom(page, aim, 1.00); await page.screenshot({ path: join(OUT, `s${seed}-${m.gale}.png`) });
    await frameCity(page, 1.00);      await page.screenshot({ path: join(OUT, `s${seed}-city.png`) });
    console.log(`seed ${seed}: ${n} pennants, densest cluster ${cluster}  (aim world ${aim.map(v=>v.toFixed(0))})  -> s${seed}-${m.calm}.png / s${seed}-${m.gale}.png / s${seed}-city.png`);
    await page.close();
  }
  await b.close();
  console.log(`\n-> ${OUT}`);
};
run();
