import { homedir } from 'node:os';
import { pathToFileURL } from 'node:url';
const PW = homedir()+'/.claude/skills/screenshot-verify/node_modules/playwright/index.js';
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const OUT = '/Users/alec/me/solvista-grow/.claude/skills/grow-city/shots/party';
import { mkdirSync } from 'node:fs';
mkdirSync(OUT,{recursive:true});
const b = await chromium.launch();
for (const seed of [7,42]){
  const pg = await b.newPage();
  await pg.setViewportSize({width:1400,height:900});
  await pg.goto(pathToFileURL('/Users/alec/me/solvista-grow/solvista.html').href);
  const info = await pg.evaluate((seed)=>{
    playing=false;
    genWorld(seed); __warp(2006-1974); __setTime(0.35);
    // step to a tick with a good party cluster
    let best=null;
    for(let t=0;t<40;t++){ tick();
      let cnt=0, cells2=[];
      for(let y=0;y<G;y++)for(let x=0;x<G;x++){const c=cells[idx(x,y)]; if(c.t===T.RES&&c.party>0){cnt++;cells2.push([x,y]);}}
      if(cnt>(best?best.cnt:1)){ // pick cell with most partying neighbours
        let bx,by,bn=-1;
        for(const [x,y] of cells2){let n=0; nbrs6(x,y,(a,bb)=>{const m=cellAt(a,bb); if(m&&m.t===T.RES&&m.party>0)n++;}); if(n>bn){bn=n;bx=x;by=y;}}
        best={cnt,bx,by,t};
      }
    }
    lastSky=0; syncSky(performance.now()); if(typeof syncStats==='function')syncStats();
    render();
    return best;
  }, seed);
  console.log('seed',seed,'active parties',info.cnt,'aim',info.bx,info.by);
  // whole-city
  await pg.evaluate(()=>{zoom=1;scale=fitScale;offX=fitX;offY=fitY;render();});
  await pg.screenshot({path:`${OUT}/s${seed}-city.png`});
  // close-up aimed at party cluster
  await pg.evaluate(({bx,by})=>{
    const [wx,wy]=ctr(bx,by);
    zoom=6; scale=fitScale*zoom;
    offX = innerWidth/2 - wx*scale; offY = innerHeight/2 - wy*scale;
    render();
  }, info);
  await pg.screenshot({path:`${OUT}/s${seed}-party.png`, clip:{x:1400/2-260,y:900/2-200,width:520,height:400}});
  await pg.close();
}
await b.close();
console.log('shots ->',OUT);
