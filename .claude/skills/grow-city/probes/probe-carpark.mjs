/* probe-carpark — the surface car park (iter 295), a draw-only EMPTY-lot variant.
 *
 * Draw-only, so the census is vacuous; the gate is here. THREE questions:
 *  (A) HOST: how many lots does carPark() light per city? (must be a handful, not 0, not a flood)
 *  (B) FLOOR: two renders with CARPARK=0 in ONE page must be BYTE-IDENTICAL (0 px) — the
 *      suppressor is 253's predicate-suppression, and a floor of 0 is what lets (C) mean anything.
 *  (C) INK: render CARPARK=1 vs CARPARK=0 in ONE page; the changed pixels ARE the car parks.
 *      Reported as px, and as px/lot, isolated at a floor of exactly 0 (occlusion free, on the
 *      final composited canvas). Build-agnostic (one file, the suppressor does the isolation).
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = join(HERE, '../../../../solvista.html');
const SEEDS = [7, 42, 1234];

const b = await chromium.launch();
const p = await b.newPage();
await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await p.goto(pathToFileURL(ART).href);
await p.waitForTimeout(400);

const grab = () => p.evaluate(() => {
  const w = cvs.width, h = cvs.height;
  return Array.from(cvs.getContext('2d').getImageData(0,0,w,h).data);
});
const diff = (A,B) => { let n=0; for(let i=0;i<A.length;i+=4){
  if(Math.abs(A[i]-B[i])+Math.abs(A[i+1]-B[i+1])+Math.abs(A[i+2]-B[i+2])>18)n++; } return n; };

for (const seed of SEEDS) {
  // freeze one world
  const host = await p.evaluate((seed) => {
    playing=false; CARPARK=1; genWorld(seed); __warp(2035-1974);
    time=1000; waveT=1000; STARS.length=0; if(typeof flock!=='undefined')flock=null;
    let lots=0; for(let y=0;y<G;y++)for(let x=0;x<G;x++){const c=cellAt(x,y);
      if(c&&c.t===T.EMPTY&&carPark(x,y,c))lots++;}
    return lots;
  }, seed);
  const on  = await p.evaluate(()=>{ CARPARK=1; render(); return 1; }).then(grab);
  const off = await p.evaluate(()=>{ CARPARK=0; render(); return 1; }).then(grab);
  const off2= await p.evaluate(()=>{ CARPARK=0; render(); return 1; }).then(grab);
  const floor = diff(off, off2);
  const ink = diff(on, off);
  console.log(`seed ${seed}: lots=${host}  ink=${ink}px  px/lot=${host?(ink/host).toFixed(1):'-'}  FLOOR(off vs off)=${floor}px`);
}
await b.close();
