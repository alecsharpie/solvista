/* districts: is the shopfront's "district" a COHERENT QUARTER, or per-cell noise?
   HEAD seeds c.dist per-cell (white noise) and lets a weak majority-vote CA try to
   coarsen it; the patch reads distOf(x,y) — a fixed Voronoi of four quarters. Two
   metrics at 2035, both pure world data (no pixels, no clock, no noise floor):
     COHERENCE  — of developed cells with >=3 developed neighbours, the fraction
                  whose district == the plurality district of those neighbours.
                  A smooth field -> ~100%; white noise -> ~25% (chance) + weak vote.
     ECHO       — of COM shopfronts, the fraction with a SAME-color COM within
                  radius 3, i.e. that read as part of a quarter, not a lone speck.
   Build-agnostic: asks the page for distOf, falls back to c.dist (SRC=HEAD). */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright-core/index.mjs';
import { join, dirname } from 'path'; import { fileURLToPath } from 'url';
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = process.env.SRC || join(HERE, '../../../../solvista.html');
const b = await chromium.launch(); const p = await b.newPage();
await p.goto('file://' + ART); await p.waitForFunction(()=>window.genWorld&&window.__warp);
const label = process.env.SRC ? 'HEAD ' : 'PATCH';
for(const seed of [7,42,1234]){
  const r = await p.evaluate((seed)=>{
    genWorld(seed); __warp(2035-1974);
    const D=(x,y)=>typeof distOf==='function'?distOf(x,y):cells[idx(x,y)].dist;
    let dev=0, coh=0;
    for(let y=0;y<G;y++)for(let x=0;x<G;x++){const c=cells[idx(x,y)]; if(!DEV.has(c.t))continue;
      const v=[0,0,0,0]; let nn=0; nbrs6(x,y,(a,b)=>{const n=cellAt(a,b); if(n&&DEV.has(n.t)){v[D(a,b)]++;nn++;}});
      if(nn<3)continue; dev++; let bx=0; for(let j=1;j<4;j++)if(v[j]>v[bx])bx=j; if(D(x,y)===bx)coh++;
    }
    let com=0, echo=0;
    for(let y=0;y<G;y++)for(let x=0;x<G;x++){const c=cells[idx(x,y)]; if(c.t!==T.COM)continue; com++;
      const d=D(x,y); let hit=0;
      for(let dy=-3;dy<=3&&!hit;dy++)for(let dx=-3;dx<=3;dx++){ if(!dx&&!dy)continue;
        const n=cellAt(x+dx,y+dy); if(n&&n.t===T.COM&&D(x+dx,y+dy)===d){hit=1;break;} }
      if(hit)echo++;
    }
    return {dev,coh,com,echo};
  }, seed);
  console.log(`${label} seed ${seed}: coherence(dist==dev-nbr plurality)=${(r.coh/r.dev*100).toFixed(1)}%   shopfront ECHO(same-color COM within r3)=${(r.echo/r.com*100).toFixed(1)}%`);
}
await b.close();
