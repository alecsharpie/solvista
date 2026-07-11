/* probe-roofplant.mjs (iter 165) — build-vs-build isolation of the COM rooftop plant.
 * Two builds run identical deterministic code except the edit, so EVERY differing
 * pixel IS the plant (iter 161 law). Rebuild the city in-page via genWorld+__warp
 * so it's byte-identical regardless of RAF timing (iter 163 law); freeze the clock.
 * Day frame (2035.62) => no STARS/night randomness. Control: a lower band (coast/
 * water, no COM roofs) must hold ~0 plant-like px.
 *
 * Prep the pristine build first (the version WITHOUT the plant, whatever that is):
 *   git -C <worktree> show <base>:solvista.html > /tmp/solvista-head.html
 * Math.random is stubbed and time/waveT frozen so genWorld's ship placement and the
 * sea shimmer are deterministic across the two loads (iter 161 corollary a): the
 * whole-frame count still wobbles with warm-up, so gate on GREY-plant-like px in the
 * roof band vs the coast control, not on the raw changed count. */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PATCHED = pathToFileURL(join(HERE, '../../../../solvista.html')).href;
const HEAD = pathToFileURL('/tmp/solvista-head.html').href;
const SEEDS = [42, 7];
const WARP = 61, YEAR = 2035.62;

async function frame(page, url, seed){
  await page.goto(url);
  await page.waitForTimeout(300);
  return await page.evaluate(({seed,WARP,YEAR})=>{
    Math.random=()=>0.5; genWorld(seed); __warp(WARP); __setYear(YEAR); playing=false; time=1000; waveT=1000; WINDA=0.5;
    for(const a of [vehicles,bikes,trams,trucks,peds,boats,ferries,freighters,birds,shuttles,dogs,surfers,dolphins,whales,herons,kayaks,joggers,deer,clouds,balloons,copters])a.length=0;
    if(typeof STARS!=="undefined")STARS.length=0;
    render(); render();
    const dpr = cvs.width/cvs.clientWidth;
    const w=cvs.width,h=cvs.height;
    const d=ctx.getImageData(0,0,w,h).data;
    return {w,h,dpr,buf:Array.from(d)};
  },{seed,WARP,YEAR});
}
const b=await chromium.launch();
const p=await b.newPage({viewport:{width:1600,height:1000}});
for(const seed of SEEDS){
  const A=await frame(p,HEAD,seed);      // pristine
  const B=await frame(p,PATCHED,seed);   // patched
  const {w,h}=A;
  let changed=0, greyish=0, ctrlChanged=0, ctrlGrey=0;
  let sumR=0,sumG=0,sumBl=0, ys=[];
  const ctrlY0 = Math.floor(h*0.80);     // bottom fifth = coast/water control
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
    const i=(y*w+x)*4;
    const dr=B.buf[i]-A.buf[i], dg=B.buf[i+1]-A.buf[i+1], db=B.buf[i+2]-A.buf[i+2];
    if(Math.abs(dr)+Math.abs(dg)+Math.abs(db) < 24) continue;
    changed++;
    const inCtrl = y>=ctrlY0;
    if(inCtrl) ctrlChanged++;
    const r=B.buf[i],g=B.buf[i+1],bl=B.buf[i+2];
    const lum=0.3*r+0.59*g+0.11*bl;
    if(Math.abs(r-g)<28 && Math.abs(g-bl)<34 && lum>45 && lum<215){ greyish++; sumR+=r;sumG+=g;sumBl+=bl; ys.push(y); if(inCtrl) ctrlGrey++; }
  }
  ys.sort((a,c)=>a-c);
  const med = ys.length?ys[ys.length>>1]:-1;
  console.log(`seed ${seed}: changed ${changed} px | grey(plant-like) ${greyish} (${(100*greyish/Math.max(1,changed)).toFixed(0)}%) `+
    `mean rgb ${(sumR/Math.max(1,greyish)).toFixed(0)},${(sumG/Math.max(1,greyish)).toFixed(0)},${(sumBl/Math.max(1,greyish)).toFixed(0)} `+
    `| grey-px median y=${med}/${h} | CONTROL bottom-fifth changed ${ctrlChanged} of which plant-like ${ctrlGrey}`);
}
await b.close();
