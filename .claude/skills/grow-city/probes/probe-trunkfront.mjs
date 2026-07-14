/* THE DESIGN GATE (263/282): a spread rule needs a REACHABLE neighbour.
 * The trunk (c.flow>=ARTFLOW) is well connected. Requiring c.busy (>=3 developed
 * neighbours) on top of it SHATTERS it. So sweep the frontage requirement: how much
 * open-country trunk can we strip before the boulevard's substrate percolates apart?
 * Pure world data. */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = process.env.SRC || join(HERE, '../../../../solvista.html');
const SEEDS = [7, 42, 1234, 99, 5150, 2024];

const b = await chromium.launch();
const page = await b.newPage();
await page.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s*1664525 + 1013904223) >>> 0) / 4294967296); });
await page.goto('file://' + SRC);
await page.waitForFunction(() => typeof window.genWorld === 'function');

const rows = [];
for (const seed of SEEDS) {
  rows.push({ seed, ...await page.evaluate(({ seed }) => {
    playing = false; genWorld(seed); __warp(61);
    const G_ = G;
    const nbrs = i => { const x=i%G_, y=(i/G_)|0, out=[];
      const o=(y&1)?[[1,0],[-1,0],[0,-1],[1,-1],[0,1],[1,1]]:[[1,0],[-1,0],[-1,-1],[0,-1],[-1,1],[0,1]];
      for(const[dx,dy]of o){const a=x+dx,c=y+dy; if(a>=0&&a<G_&&c>=0&&c<G_)out.push(c*G_+a);} return out; };
    const runs = S => { const seen=new Set(), out=[];
      for(const i of S){ if(seen.has(i))continue; let n=0; const st=[i]; seen.add(i);
        while(st.length){const j=st.pop();n++;for(const k of nbrs(j))if(S.has(k)&&!seen.has(k)){seen.add(k);st.push(k);}}
        out.push(n);} return out.sort((a,z)=>z-a); };

    const trunk = [];
    for (let i=0;i<G_*G_;i++){ const c=cells[i];
      if(c.t===T.ROAD && !c.bridge && (c.flow||0)>=ARTFLOW) trunk.push(i); }

    const out = {};
    for (const need of [0,1,2,3]) {
      const S = new Set(trunk.filter(i=>{ const x=i%G_,y=(i/G_)|0;
        return countAround(x,y,1,n=>DEV.has(n.t)) >= need; }));
      const r = runs(S);
      out['n'+need] = { cells: S.size, biggest: r[0]||0, comps: r.length,
                        mean: S.size/(r.length||1), big3: r.slice(0,3).reduce((a,v)=>a+v,0) };
    }
    return out;
  }, { seed }) });
}
await b.close();

console.log('\n=== TRUNK, thinned by a FRONTAGE requirement (>= N developed neighbours) ===');
console.log('   N=0 is the bare trunk; N=3 is c.busy, which we measured SHATTERS it.\n');
console.log('  seed |  N=0 cells/big/comp |  N=1 cells/big/comp |  N=2 cells/big/comp |  N=3 (c.busy)');
for (const r of rows) {
  const s = k => { const o = r[k]; return (String(o.cells).padStart(4)+'/'+String(o.biggest).padStart(3)+'/'+String(o.comps).padStart(3)); };
  console.log(String(r.seed).padStart(6), '|', s('n0').padStart(18), '|', s('n1').padStart(18),
              '|', s('n2').padStart(18), '|', s('n3'));
}
const avg = (k,f) => (rows.reduce((a,r)=>a+r[k][f],0)/rows.length);
console.log('\n            cells  biggest-component  components  mean-run  top-3-runs');
for (const k of ['n0','n1','n2','n3'])
  console.log((k==='n3'?'N=3 (busy)':'N='+k[1]+'       ').padEnd(11),
    avg(k,'cells').toFixed(1).padStart(6), avg(k,'biggest').toFixed(1).padStart(17),
    avg(k,'comps').toFixed(1).padStart(11), avg(k,'mean').toFixed(1).padStart(9),
    avg(k,'big3').toFixed(1).padStart(11));
console.log('\n=> pick the LOOSEST frontage that still strips open country while keeping the');
console.log('   trunk PERCOLATED -- the boulevard must be able to travel its own host (282).\n');
