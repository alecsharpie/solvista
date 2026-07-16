/* probe-blockparty — does the block-party excitable medium BLINK AS ONE?
 *
 * The party CA (tick(), c.party) shared a CONSTANT refractory (-16) and constant
 * duration (5), so — like the fairy rings before 272 and the wildflowers before
 * 263 — the whole city ignited and became eligible again in lockstep: parties came
 * in tight synchronous bursts and a mature city showed ONE party at a time, or none.
 * Its excitable-media siblings jitter a timer from a per-cell uniform; the party (the
 * member 271 says to enumerate) was the holdout with BOTH timers constant.
 *
 * TEMPORAL (134): every other gate is frozen, so a claim about CADENCE has no
 * instrument. Drives the artifact's OWN tick() and reads cells[].party — NO PIXELS,
 * so no noise floor at all, nothing to stub. BUILD-AGNOSTIC via SRC/HEAD file loads.
 *
 * Headline needs no threshold (236): HEAD's cadence is a SQUARE WAVE (all-or-nothing
 * bursts, ~1 active at maturity). Reports per era: the burst run-length pattern, the
 * fraction of ticks with ZERO parties, mean active count, and the DISTINCT refractory
 * values in flight (HEAD: 1, patch: many). census-flat is proved elsewhere (draw-only).
 */
import { homedir } from 'node:os';
import { pathToFileURL } from 'node:url';
const PW = homedir()+'/.claude/skills/screenshot-verify/node_modules/playwright/index.js';
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const b = await chromium.launch();

async function run(file, label){
  const pg = await b.newPage();
  await pg.goto(pathToFileURL(file).href);
  console.log('\n=== '+label+' ===');
  for (const seed of [7,42,1234]){
    for (const yr of [2005,2035]){
      const r = await pg.evaluate(({seed,yr})=>{
        genWorld(seed); __warp(yr-1974);
        const series=[]; const resets=new Set(); let prev=new Map();
        for(let t=0;t<120;t++){ tick();
          let a=0;
          for(let i=0;i<cells.length;i++){ const c=cells[i];
            if(c.t!==T.RES)continue;
            if(c.party>0)a++;
            // detect a reset: a cell that just hit its most-negative value
            const p=prev.get(i);
            if(c.party<0 && p!==undefined && p>0) resets.add(c.party);  // a cell that was partying last tick just reset
            prev.set(i,c.party);
          }
          series.push(a);
        }
        const zero = series.filter(v=>v===0).length/series.length;
        const mean = series.reduce((s,v)=>s+v,0)/series.length;
        const mx = Math.max(...series);
        const rv=[...resets].sort((a,b)=>a-b);
        return {zero:+zero.toFixed(2), mean:+mean.toFixed(2), mx,
                refr:rv.length?`[${-rv[rv.length-1]}..${-rv[0]}] n=${rv.length}`:'none',
                sig:series.slice(0,50).map(v=>v===0?'.':(v>9?'#':String(v))).join('')};
      }, {seed,yr});
      console.log(`seed ${seed} @${yr}: zero-ticks ${(r.zero*100).toFixed(0)}%  mean ${r.mean}  max ${r.mx}  refractory ${r.refr}`);
      console.log(`   first-50-ticks active: ${r.sig}`);
    }
  }
  await pg.close();
}
await run('/Users/alec/me/solvista-grow/solvista.html','PATCH');
await run('/tmp/head.html','HEAD');
await b.close();
