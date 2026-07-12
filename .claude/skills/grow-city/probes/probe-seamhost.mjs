import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const { chromium } = (await import(pathToFileURL(join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js')).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART  = pathToFileURL(join(HERE, '../../../../solvista.html')).href;
const b = await chromium.launch(); const p = await b.newPage();
await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s*1664525 + 1013904223) >>> 0) / 4294967296); });
await p.goto(ART);
await p.waitForFunction(() => window.__census);
for (const seed of [7, 42, 1234, 99, 300, 5150]) {
  const r = await p.evaluate((sd) => {
    playing = false; genWorld(sd); __warp(61);
    const GREEN = new Set([T.PARK, T.SHOREPARK, T.MEADOW, T.GARDEN, T.FOREST, T.QUAD, T.FIELD]);
    const SAND  = new Set([T.BEACH, T.DUNE]);
    let beach=0, dune=0, sandTouchGreen=0, beachTouchGreen=0, duneTouchGreen=0,
        greenTouchSand=0, marram=0, seamMarram=0, byKind={};
    for (let y=0;y<G;y++) for (let x=0;x<G;x++) {
      const c = cellAt(x,y); if(!c) continue;
      const nGreen = countAround(x,y,1,n=>GREEN.has(n.t));
      if (SAND.has(c.t)) {
        if(c.t===T.BEACH) beach++; else dune++;
        if(c.t===T.DUNE && c.sand>=DUNEMARRAM) marram++;
        if (nGreen>0) { sandTouchGreen++;
          if(c.t===T.BEACH) beachTouchGreen++; else { duneTouchGreen++;
            if(c.sand>=DUNEMARRAM) seamMarram++; }
          for(const [dx,dy] of nbrDirs(y)) { const n=cellAt(x+dx,y+dy); if(n&&GREEN.has(n.t)){
            const k=Object.keys(T).find(kk=>T[kk]===n.t); byKind[k]=(byKind[k]||0)+1; } }
        }
      } else if (GREEN.has(c.t)) {
        if (countAround(x,y,1,n=>SAND.has(n.t))>0) greenTouchSand++;
      }
    }
    return {beach,dune,sandTouchGreen,beachTouchGreen,duneTouchGreen,greenTouchSand,marram,seamMarram,byKind};
  }, seed);
  console.log(`seed ${String(seed).padStart(4)}  BEACH ${String(r.beach).padStart(3)} DUNE ${String(r.dune).padStart(3)}  |  sand touching green: ${String(r.sandTouchGreen).padStart(3)} (beach ${r.beachTouchGreen}, dune ${r.duneTouchGreen})  |  green touching sand: ${String(r.greenTouchSand).padStart(3)}  |  marram ${r.marram} (on seam ${r.seamMarram})  |  green nbrs: ${JSON.stringify(r.byKind)}`);
}
await b.close();
