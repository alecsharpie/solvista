#!/usr/bin/env node
/* shot-parliament.mjs — camera-zoom the (1/city) parliament and clip it, night + a day
 * control, for the iter-175 facade floodlight. node shot-parliament.mjs <seed> <warp> <outdir> */
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html')].find(existsSync);
const seed = +(process.argv[2]||42), warp = +(process.argv[3]||61), out = process.argv[4]||join(HERE,'../shots/parliament');
mkdirSync(out,{recursive:true});
const HTML = readFileSync(ROOT);
const srv = createServer((_,res)=>{res.setHeader('content-type','text/html');res.end(HTML);}).listen(0);
await new Promise(r=>srv.once('listening',r));
const port = srv.address().port;
const b = await chromium.launch();
const p = await b.newPage({viewport:{width:1600,height:1000},deviceScaleFactor:2});
for(const [name,t] of [['night',0.90],['day',0.35]]){
  await p.goto(`http://127.0.0.1:${port}/solvista.html?seed=${seed}&warp=${warp}&t=${t}`);
  await p.waitForTimeout(600);
  const clip = await p.evaluate(()=>{
    playing=false;
    let a=null; for(let y=0;y<G;y++)for(let x=0;x<G;x++){const c=cells[idx(x,y)];if(c&&c.t===T.CIVIC&&c.kind==='parliament'){a=[x,y];break;}}
    if(!a) return null;
    const [wx,wy]=ctr(a[0],a[1]);
    zoom=7; scale=fitScale*zoom; offX=cvs.clientWidth/2-wx*scale; offY=cvs.clientHeight/2-wy*scale;
    render();
    /* parliament is a tall capitol — shift the clip UP to frame the lit facade + dome */
    return {x:cvs.clientWidth/2-160,y:cvs.clientHeight/2-200,width:320,height:340};
  });
  if(!clip){console.log('seed',seed,'no parliament');continue;}
  await p.screenshot({path:join(out,`s${seed}_${name}.png`),clip});
  console.log('wrote',join(out,`s${seed}_${name}.png`));
}
await b.close();srv.close();
