#!/usr/bin/env node
/* WHAT does a tree contact shadow actually cost — the fill COUNT, the fill AREA,
 * or the path itself?
 *
 * 194 gave every trunk a shadS() contact ellipse; 197 priced the lap at day +3.4%
 * / night +3.5% and mandated iter 198 "batch a hex's tree shadows into ONE path
 * with ONE fill()", on the inference that the cost was the FILL COUNT (194 had
 * memoized shadS's rgba string and bought back exactly zero, so 197 reasoned the
 * cost must be the fill). That inference was never measured. This probe measures
 * it: five variants, all built from HEAD by surgery, interleaved A/B/C/D/E per
 * round with the MIN taken per variant, so every variant eats the same machine
 * load (headless timing on this box swings +-30%).
 *
 *   HEAD    194's shipped per-tree shadS                       (control)
 *   NOSHAD  tree+palm contact shadows removed entirely  -> the WHOLE budget
 *   BATCH   197's mandate: one path + one fill() per hex -> tests FILL COUNT
 *   SMALLR  same call count, radius x0.5 (area x0.25)   -> tests FILL AREA
 *   SPRITE  a pre-rasterized ellipse blitted (drawImage) -> tests PATH RASTER
 *
 * RESULT (iter 198, two independent runs agreeing): only NOSHAD moves.
 *   NOSHAD -2.8/-3.1% day, -2.4/-2.6% night   <- the 3% is real
 *   BATCH  +0.3/+0.9% day                     <- fewer fills buys NOTHING
 *   SMALLR +0.4/+0.9% day                     <- less area buys NOTHING
 *   SPRITE +4.1% day, +3.6% night             <- blitting is WORSE than filling
 * => The cost is PER-ELLIPSE — one charge per ellipse rasterized, near-independent
 * of its size, of how many are grouped into a fill(), and not avoidable by
 * blitting a sprite instead. The only lever on it is drawing FEWER ellipses, i.e.
 * giving up the per-trunk grounding 194 shipped and 197's agents praised. The 3%
 * is the honest price of the shadows. Do not re-open the batch/area/sprite levers.
 */
import { homedir, tmpdir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdtempSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
/* resolve the artifact RELATIVE TO THIS FILE, never an absolute path */
const CAND = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html')];
const ART = CAND.find(f => existsSync(f));
const REPO = dirname(ART);

/* every variant is built from HEAD by surgery, so the probe reproduces the whole
 * finding from a clean tree — it must never read the working file for a variant,
 * or on a reverted tree it would silently measure HEAD against itself. */
const REF = process.env.REF || 'HEAD';
const src = execFileSync('git', ['-C', REPO, 'show', `${REF}:solvista.html`], { encoding: 'utf8' });
const cut = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`anchor not found:\n${from.slice(0, 70)}`);
  return s.replace(from, to);
};

const TREE = `  shadS(cx,cy,(sp===1?0.19:sp===2?0.11:0.22)*s,0.13);`;
const PALM = `  shadS(cx,cy,0.15*s,0.13);`;
const SHADFN = `function shadS(cx,cy,r,a){
  ctx.fillStyle='rgba(40,32,20,'+a+')';
  ctx.beginPath();ctx.ellipse(cx,cy,r*TW,r*TH,0,0,7);ctx.fill();
}`;

const noshad = cut(cut(src, TREE, ''), PALM, '');

const smallr = cut(cut(src,
  TREE, `  shadS(cx,cy,(sp===1?0.19:sp===2?0.11:0.22)*s*0.5,0.13);`),
  PALM, `  shadS(cx,cy,0.15*s*0.5,0.13);`);

/* BATCH — 197's mandate, reconstructed: tree() queues its ellipse instead of
 * filling it, and treeGroup() lays a whole stand down in one path + one fill().
 * Pass 1 collects, pass 2 draws the bodies over the shadows. */
let batch = cut(src, `function tree(gx,gy,s,shade){`, `let TMODE=0, TSHAD=[];
function treeGroup(f){
  TMODE=1; TSHAD.length=0; f();
  if(TSHAD.length){
    ctx.fillStyle='rgba(40,32,20,0.13)';
    ctx.beginPath();
    for(let i=0;i<TSHAD.length;i+=3){
      const rx=TSHAD[i+2]*TW, ry=TSHAD[i+2]*TH;
      ctx.moveTo(TSHAD[i]+rx,TSHAD[i+1]);
      ctx.ellipse(TSHAD[i],TSHAD[i+1],rx,ry,0,0,7);
    }
    ctx.fill();
  }
  TMODE=2; f(); TMODE=0;
}
function tree(gx,gy,s,shade){`);
batch = cut(batch, TREE, `  const shr=(sp===1?0.19:sp===2?0.11:0.22)*s;
  if(TMODE===1){TSHAD.push(cx,cy,shr);return;}
  if(TMODE===0)shadS(cx,cy,shr,0.13);`);
/* the four multi-tree hexes — the only sites where batching can cut a fill */
batch = cut(batch, `      tree(gx-0.22,gy-0.18,(0.9+v*0.4)*s,0.9*sh);
      tree(gx+0.2,gy+0.1,(0.8+v*0.3)*s,1.0*sh);
      if(k>=2)tree(gx-0.05,gy+0.3,0.7*s,0.85*sh);
      if(k>=4)tree(gx+0.08,gy-0.36,0.62*s,0.95*sh);`,
  `      treeGroup(()=>{
        tree(gx-0.22,gy-0.18,(0.9+v*0.4)*s,0.9*sh);
        tree(gx+0.2,gy+0.1,(0.8+v*0.3)*s,1.0*sh);
        if(k>=2)tree(gx-0.05,gy+0.3,0.7*s,0.85*sh);
        if(k>=4)tree(gx+0.08,gy-0.36,0.62*s,0.95*sh);
      });`);
batch = cut(batch, `      tree(gx-0.3,gy+0.26,0.6,1.05);tree(gx+0.3,gy-0.26,0.6,1.0);`,
  `      treeGroup(()=>{tree(gx-0.3,gy+0.26,0.6,1.05);tree(gx+0.3,gy-0.26,0.6,1.0);});`);
batch = cut(batch, `        tree(gx-0.2,gy-0.14,0.75+v*0.5,1);
        tree(gx+0.16,gy+0.14,0.7+v*0.4,0.92);
        if(v>0.7)tree(gx+0.05,gy-0.28,0.6,1.05);`,
  `        treeGroup(()=>{
          tree(gx-0.2,gy-0.14,0.75+v*0.5,1);
          tree(gx+0.16,gy+0.14,0.7+v*0.4,0.92);
          if(v>0.7)tree(gx+0.05,gy-0.28,0.6,1.05);
        });`);
batch = cut(batch, `        if(ewN>=diagN){tree(gx,gy+0.36,0.5,1.02);tree(gx,gy-0.36,0.5,1.02);}
        else{tree(gx+0.36,gy,0.5,1.02);tree(gx-0.36,gy,0.5,1.02);}`,
  `        treeGroup(()=>{
          if(ewN>=diagN){tree(gx,gy+0.36,0.5,1.02);tree(gx,gy-0.36,0.5,1.02);}
          else{tree(gx+0.36,gy,0.5,1.02);tree(gx-0.36,gy,0.5,1.02);}
        });`);

/* SPRITE — same shadows in the same places, but blitted from a pre-rasterized
 * ellipse: ONE canvas call (drawImage) instead of four, and no path raster. */
const sprite = cut(src, SHADFN, `const SHADSPR=new Map();
function shadSprite(r,a){
  const k=Math.round(r*200)*1000+Math.round(a*100);
  let sp=SHADSPR.get(k);
  if(sp===undefined){
    const SS=4, rx=r*TW, ry=r*TH;                 /* baked at 4x so zoom stays crisp */
    const w=Math.max(2,Math.ceil(rx*2*SS)+2), h=Math.max(2,Math.ceil(ry*2*SS)+2);
    sp=document.createElement('canvas'); sp.width=w; sp.height=h;
    const g=sp.getContext('2d');
    g.fillStyle='rgba(40,32,20,'+a+')';
    g.beginPath();g.ellipse(w/2,h/2,rx*SS,ry*SS,0,0,7);g.fill();
    sp._rx=w/(2*SS); sp._ry=h/(2*SS);
    SHADSPR.set(k,sp);
  }
  return sp;
}
function shadS(cx,cy,r,a){
  const sp=shadSprite(r,a);
  ctx.drawImage(sp,cx-sp._rx,cy-sp._ry,sp._rx*2,sp._ry*2);
}`);

const tmp = mkdtempSync(join(tmpdir(), 'shadcost-'));
const variants = [['HEAD', src], ['NOSHAD', noshad], ['BATCH', batch], ['SMALLR', smallr], ['SPRITE', sprite]];
for (const v of variants) { const f = join(tmp, v[0] + '.html'); writeFileSync(f, v[1]); v[2] = f; }

const WARMUP = 60, SAMPLE = 300, ROUNDS = 3;
async function measure(page, file, q) {
  await page.goto(pathToFileURL(file).href + `?seed=42&warp=61&${q}`, { waitUntil: 'load' });
  await page.waitForFunction('window.__census');
  return page.evaluate(([warmup, sample]) => new Promise(res => {
    const d = []; let last = 0, n = 0;
    function loop(now) {
      if (n >= warmup && last) d.push(now - last);
      last = now;
      if (++n < warmup + sample) requestAnimationFrame(loop);
      else res(d.reduce((s, v) => s + v, 0) / d.length);
    }
    requestAnimationFrame(loop);
  }), [WARMUP, SAMPLE]);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
for (const [scene, q] of [['day', 't=0.35'], ['night', 't=0.8']]) {
  const got = new Map(variants.map(v => [v[0], []]));
  for (let r = 0; r < ROUNDS; r++)                 /* interleave: same load per variant */
    for (const [name, , file] of variants) got.get(name).push(await measure(page, file, q));
  const base = Math.min(...got.get('HEAD'));
  console.log(`\n== ${scene} ==`);
  for (const [name] of variants) {
    const m = Math.min(...got.get(name));
    const pct = (m - base) / base * 100;
    console.log(`  ${name.padEnd(7)} ${m.toFixed(2)}ms  ${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`);
  }
}
await browser.close();
