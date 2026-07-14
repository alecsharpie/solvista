/* DE-LOTTERY THE SPARK (233: gate on the WORST seed).
 * A rare Poisson spark left seed 99 with ONE treed cell. The ignition must be a
 * STRUCTURAL set, not a coin -- so measure the trunk's own flow hierarchy: where are
 * the GRANDEST trunk cells, how many trunk COMPONENTS do they occupy, and how big are
 * those components? That product IS the boulevard's extent, with no constant tuned. */
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

    const trunk = [];
    for (let i=0;i<G_*G_;i++){ const c=cells[i];
      if(c.t===T.ROAD && !c.bridge && (c.flow||0)>=ARTFLOW) trunk.push(i); }
    const TS = new Set(trunk);
    // components of the trunk
    const comp = new Map(); let cid = 0; const size = [];
    for (const i of trunk) { if (comp.has(i)) continue;
      const st=[i]; comp.set(i,cid); let n=0;
      while(st.length){const j=st.pop();n++;for(const k of nbrs(j))if(TS.has(k)&&!comp.has(k)){comp.set(k,cid);st.push(k);}}
      size.push(n); cid++; }

    const flows = trunk.map(i => cells[i].flow).sort((a,z)=>z-a);
    const out = { trunkCells: trunk.length, comps: cid,
                  fMax: flows[0]|0, fMed: flows[(flows.length/2)|0]|0 };
    // for each candidate GRAND cut: how many spark cells, how many components they light,
    // and the TOTAL SIZE of those components -- which is the boulevard's extent at full fill.
    for (const K of [2,3,4,6,8]) {
      const spark = trunk.filter(i => cells[i].flow >= ARTFLOW*K && cells[i].busy);
      const lit = new Set(spark.map(i => comp.get(i)));
      let ext = 0; for (const c of lit) ext += size[c];
      out['K'+K] = { spark: spark.length, lit: lit.size, ext };
    }
    return out;
  }, { seed }) });
}
await b.close();

console.log('\n=== THE TRUNK\'S OWN FLOW HIERARCHY ===');
console.log('seed   trunk  comps   flow-max  flow-median');
for (const r of rows)
  console.log(String(r.seed).padStart(6), String(r.trunkCells).padStart(6), String(r.comps).padStart(6),
              String(r.fMax).padStart(10), String(r.fMed).padStart(12));

console.log('\n=== A DETERMINISTIC SPARK: trunk cells with flow >= K*ARTFLOW, AND built-up frontage ===');
console.log('   "lit" = trunk components containing >=1 spark; "extent" = their total size');
console.log('   = the boulevard at full fill, with NO probability tuned and NO lottery.\n');
console.log('        K=2 spark/lit/ext | K=3 spark/lit/ext | K=4 spark/lit/ext | K=6 spark/lit/ext | K=8');
for (const r of rows) {
  const s = k => { const o=r['K'+k]; return (String(o.spark).padStart(3)+'/'+String(o.lit).padStart(2)+'/'+String(o.ext).padStart(3)); };
  console.log(String(r.seed).padStart(6), s(2).padStart(15), '|', s(3).padStart(15), '|', s(4).padStart(15),
              '|', s(6).padStart(15), '|', s(8));
}
console.log('\n              spark  lit-comps  EXTENT   worst-seed EXTENT  (233: gate on the WORST)');
for (const K of [2,3,4,6,8]) {
  const sp = rows.reduce((a,r)=>a+r['K'+K].spark,0)/rows.length;
  const li = rows.reduce((a,r)=>a+r['K'+K].lit,0)/rows.length;
  const ex = rows.reduce((a,r)=>a+r['K'+K].ext,0)/rows.length;
  const wo = Math.min(...rows.map(r=>r['K'+K].ext));
  console.log(('K='+K).padEnd(12), sp.toFixed(1).padStart(6), li.toFixed(1).padStart(10),
              ex.toFixed(1).padStart(8), String(wo).padStart(18));
}
console.log('');
