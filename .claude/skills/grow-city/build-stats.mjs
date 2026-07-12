#!/usr/bin/env node
/* build-stats.mjs — regenerate stats.html (the public cost/time dashboard) from
 * RUNLOG.md, the loop's own ledger.
 *
 *   node .claude/skills/grow-city/build-stats.mjs
 *
 * IMPORTANT: this runs as a POST-iteration step in run-loop.sh (plain node, in
 * bash) — NOT inside the `claude -p` agent. If the agent regenerated its own
 * scoreboard, that work would inflate the very cost/time the page reports. Keep
 * it out of the iteration.
 *
 * Single source of truth is RUNLOG.md:
 *   ✔ / ↩  = logged live by runlog.mjs (billed tier; has verdict + vector)
 *   ≈      = recovered from terminal scrollback (cost+time only)
 * Iterations before the first RUNLOG entry are shown as a flat 15-min estimate
 * with no cost — clearly labelled as such.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const RUNLOG = join(HERE, 'RUNLOG.md');
const OUT = join(HERE, '../../../stats.html');       // repo root — served by Pages
const EST_MINUTES = 15;                              // flat estimate for the unrecorded early runs

// ---- parse RUNLOG into rows -------------------------------------------------
function parseRunlog(txt) {
  const rows = [];
  for (const l of txt.split('\n')) {
    let m = l.match(/^([✔↩])\s+Iter\s+(\d+)\s+(.*?)\s+(SHIPPED|DEEPENED|FIXED|EXPLORED → REVERTED|REVERTED)\s+(\d+)m(\d+)s\s+\$([0-9.]+)/);
    if (m) {
      rows.push({ iter: +m[2], vector: m[3].trim() === '—' ? null : m[3].trim(), verdict: m[4].replace(/\s+/g, ' '),
        secs: +m[5] * 60 + +m[6], cost: +m[7], reverted: /REVERTED/.test(m[4]), tier: 'billed' });
      continue;
    }
    m = l.match(/^≈\s+Iter\s+(\d+)\s+.*?recovered\s+(\d+)m(\d+)s\s+\$([0-9.]+)/);
    if (m) {
      rows.push({ iter: +m[1], vector: null, verdict: null, secs: +m[2] * 60 + +m[3], cost: +m[4], reverted: null, tier: 'recovered' });
    }
  }
  return rows;
}

const parsed = parseRunlog(readFileSync(RUNLOG, 'utf8'));
if (!parsed.length) { console.error('build-stats: no rows parsed from RUNLOG — aborting.'); process.exit(1); }
const firstKnown = Math.min(...parsed.map(r => r.iter));
const rows = [];
for (let i = 1; i < firstKnown; i++) rows.push({ iter: i, vector: null, verdict: null, secs: EST_MINUTES * 60, cost: null, reverted: null, tier: 'estimated' });
rows.push(...parsed);
rows.sort((a, b) => a.iter - b.iter);

// ---- aggregates ------------------------------------------------------------
const known = rows.filter(r => r.cost != null);            // recovered + billed
const billed = rows.filter(r => r.tier === 'billed');      // have verdicts
const sum = (a, f) => a.reduce((x, r) => x + (f(r) || 0), 0);
const maxIter = Math.max(...rows.map(r => r.iter));
const knownCost = sum(known, r => r.cost);
const knownHours = sum(known, r => r.secs) / 3600;
const totalHours = sum(rows, r => r.secs) / 3600;
const avgCost = knownCost / known.length;
const avgMin = sum(known, r => r.secs) / known.length / 60;
const priciest = known.reduce((a, r) => r.cost > a.cost ? r : a);
const longest = rows.reduce((a, r) => r.secs > a.secs ? r : a);
const recFrom = Math.min(...rows.filter(r => r.tier === 'recovered').map(r => r.iter));
const bilFrom = Math.min(...billed.map(r => r.iter));

const V = ['SHIPPED', 'DEEPENED', 'FIXED', 'EXPLORED → REVERTED'];
const verdicts = V.map(v => {
  const rs = billed.filter(r => r.verdict === v);
  return { v, label: v === 'EXPLORED → REVERTED' ? 'Reverted' : v[0] + v.slice(1).toLowerCase(), n: rs.length, cost: sum(rs, r => r.cost) };
});

const fmt$ = n => '$' + n.toFixed(n < 100 ? 2 : 0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const asOf = new Date().toISOString().slice(0, 10);
const chartRows = rows.map(r => ({ i: r.iter, c: r.cost, s: r.secs, t: r.tier, v: r.verdict, k: r.vector }));

const html = `<button id="themeBtn" class="themebtn" aria-label="Toggle light/dark" title="Toggle theme">◐</button>
<div class="wrap">

<header class="hero">
  <div class="eyebrow">Solvista · autonomous build loop</div>
  <h1>A city that builds itself, one verified step at a time.</h1>
  <p class="lede">Solvista is a procedural cellular-automata city. It grows through a headless
  loop: each iteration is a fresh <code>claude&nbsp;-p</code> process with an empty context that reads the
  ledger, makes <em>one</em> improvement, verifies it with a numeric census and screenshot gates,
  commits, and exits — then the next one starts. No human in the loop. This page is the receipts.</p>
  <div class="herofig">
    <div><span class="big">${maxIter}</span><span class="unit">iterations run</span></div>
    <div><span class="big">${totalHours.toFixed(0)}<span class="sm">h</span></span><span class="unit">of autonomous compute</span></div>
    <div><span class="big">${verdicts[0].n + verdicts[1].n + verdicts[2].n}</span><span class="unit">shipped &middot; ${verdicts[3].n} reverted</span></div>
  </div>
  <a class="back" href="./">&larr; open the living city</a>
</header>

<section class="note">
  <strong>About the dollar figures.</strong> These are <em>would-be</em> API list prices — the
  pay-per-token cost of the tokens each iteration used, at Claude Opus pricing. <strong>No money was
  actually spent per iteration:</strong> the loop ran on a flat-rate Claude subscription. It even hit
  the subscription's usage limits mid-run and politely waited for the reset before carrying on. So read
  the costs as <em>"what this scale of autonomy would cost on the metered API"</em>, not a bill.
</section>

<section class="tiles">
  <div class="tile"><div class="tl">Would-be API cost</div><div class="tv">${fmt$(knownCost)}</div><div class="td">across ${known.length} measured iterations</div></div>
  <div class="tile"><div class="tl">Autonomous compute</div><div class="tv">${knownHours.toFixed(1)}<span class="tvu">h</span></div><div class="td">measured; ${totalHours.toFixed(0)}h incl. estimated early runs</div></div>
  <div class="tile"><div class="tl">Per iteration</div><div class="tv">${avgMin.toFixed(0)}<span class="tvu">min</span></div><div class="td">avg &middot; ${fmt$(avgCost)} would-be</div></div>
  <div class="tile"><div class="tl">Longest iteration</div><div class="tv">${(longest.secs/60).toFixed(0)}<span class="tvu">min</span></div><div class="td">#${longest.iter} &middot; ${fmt$(priciest.cost)} priciest (#${priciest.iter})</div></div>
</section>

<section class="chart">
  <h2>How long each iteration ran</h2>
  <p class="sub">Wall-clock runtime per iteration. <span class="key k-est"></span>#1&ndash;${firstKnown - 1} are a flat
  ${EST_MINUTES}-min estimate (no record kept); <span class="key k-recovered"></span>#${recFrom}&ndash;${bilFrom - 1} recovered from
  terminal logs; <span class="key k-billed"></span>#${bilFrom}&ndash;${maxIter} logged live. The longest ran ${(longest.secs/60).toFixed(0)} min (#${longest.iter}). Hover for detail.</p>
  <div id="timeChart" class="svgbox"></div>
</section>

<section class="chart">
  <h2>What each iteration would have cost</h2>
  <p class="sub">One column per iteration. <span class="key k-billed"></span>Logged live by the
  loop's cost ledger (#${bilFrom}&ndash;${maxIter}); <span class="key k-recovered"></span>recovered from terminal
  output (#${recFrom}&ndash;${bilFrom - 1}). The unrecorded early runs have no cost figure. Hover for detail.</p>
  <div id="costChart" class="svgbox"></div>
</section>

<section class="chart">
  <h2>Cumulative would-be cost</h2>
  <p class="sub">The compounding price of ${known.length} autonomous iterations, if it had been metered.</p>
  <div id="cumChart" class="svgbox"></div>
</section>

<section class="chart">
  <h2>How the loop judged its own work</h2>
  <p class="sub">Of the ${billed.length} iterations with a recorded verdict (#${bilFrom}&ndash;${maxIter}), the loop shipped
  most — but honestly <strong>reverted ${verdicts[3].n}</strong> after exploring dead ends. Self-assessment,
  not just self-generation.</p>
  <div id="verdictChart" class="svgbox"></div>
</section>

<section class="chart">
  <h2>What we can and can't see</h2>
  <p class="sub">The cost logger was added at iteration ${bilFrom}; earlier figures were rescued from saved
  terminal scrollback. Iterations 1&ndash;${firstKnown - 1} predate any saved record — shown here as a flat
  ${EST_MINUTES}-minute estimate with no cost data.</p>
  <div id="provChart" class="svgbox"></div>
  <div class="provlegend">
    <span><span class="sw sw-est"></span><b>1&ndash;${firstKnown - 1}</b> &middot; no record &middot; estimated ${EST_MINUTES} min/iter, no cost</span>
    <span><span class="sw sw-rec"></span><b>${recFrom}&ndash;${bilFrom - 1}</b> &middot; recovered from terminal logs</span>
    <span><span class="sw sw-bil"></span><b>${bilFrom}&ndash;${maxIter}</b> &middot; logged live (billed cost + time)</span>
  </div>
</section>

<section class="chart">
  <h2>The build log</h2>
  <p class="sub">The loop's own ledger — most recent first. Domain &times; kind of change, the verdict it
  reached, its runtime, and the would-be cost.</p>
  <div class="tablewrap">
    <table id="ledger"><thead><tr><th>#</th><th>Vector</th><th>Verdict</th><th class="num">Time</th><th class="num">Would-be $</th></tr></thead><tbody></tbody></table>
  </div>
</section>

<footer>
  <p>Snapshot as of iteration ${maxIter} &middot; ${asOf}, regenerated automatically after each iteration.
  The loop keeps running, so the live city keeps changing. Costs are API-equivalent estimates on a
  flat-rate subscription, not amounts paid.</p>
  <p><a href="./">&larr; the living city</a> &middot; <a href="https://github.com/alecsharpie/solvista">source on GitHub</a></p>
</footer>

</div>

<div id="tip" class="tip" hidden></div>

<script>
(function(){const q=new URLSearchParams(location.search).get('theme');
  const root=document.documentElement;
  if(q==='dark'||q==='light')root.dataset.theme=q;
  document.getElementById('themeBtn').addEventListener('click',()=>{
    const cur=root.dataset.theme||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');
    root.dataset.theme=cur==='dark'?'light':'dark';
    document.querySelectorAll('.svgbox').forEach(b=>b.innerHTML='');drawAll();
  });})();
const DATA = ${JSON.stringify(chartRows)};
const V = ${JSON.stringify(verdicts)};
const MAXITER = ${maxIter};
const fmtUsd = n => n==null ? '—' : '$'+n.toFixed(2);
const fmtMin = s => (s/60).toFixed(0)+' min';
const cssv = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const TIERSRC = {estimated:'estimated (no record)', recovered:'recovered from logs', billed:'logged live'};
const TIERFILL = {estimated:'--muted', recovered:'--series-2', billed:'--series-1'};

const NS='http://www.w3.org/2000/svg';
function el(t,a={}){const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);return e;}
function svg(box,w,h){const s=el('svg',{viewBox:'0 0 '+w+' '+h,width:'100%',preserveAspectRatio:'xMidYMid meet'});box.innerHTML='';box.appendChild(s);return s;}

const tip=document.getElementById('tip');
function showTip(html,x,y){tip.innerHTML=html;tip.hidden=false;const r=tip.getBoundingClientRect();
  let L=x+14,T=y+14;if(L+r.width>window.innerWidth-8)L=x-r.width-14;if(T+r.height>window.innerHeight-8)T=y-r.height-14;
  tip.style.left=L+'px';tip.style.top=T+'px';}
function hideTip(){tip.hidden=true;}

function drawAll(){
// ---- runtime per iteration (columns, full run, all tiers) ----
(function(){
  const box=document.getElementById('timeChart');const rows=DATA;
  const W=920,H=300,P={l:44,r:12,t:14,b:28};const s=svg(box,W,H);
  const iw=W-P.l-P.r,ih=H-P.t-P.b;const maxM=Math.max(...rows.map(d=>d.s/60));
  const x=i=>P.l+iw*((i-1)/(MAXITER-1));const bw=Math.max(1.4,iw/rows.length-0.8);
  const y=m=>P.t+ih-(m/maxM)*ih;
  [0,30,60,90].forEach(v=>{if(v>maxM)return;const yy=y(v);
    s.appendChild(el('line',{x1:P.l,y1:yy,x2:W-P.r,y2:yy,stroke:cssv('--grid'),'stroke-width':1}));
    const t=el('text',{x:P.l-8,y:yy+4,'text-anchor':'end',class:'axis'});t.textContent=v+'m';s.appendChild(t);});
  rows.forEach(d=>{const m=d.s/60;const bx=x(d.i)-bw/2,by=y(m),bh=P.t+ih-by;
    const r=el('rect',{x:bx,y:by,width:bw,height:Math.max(0.5,bh),rx:Math.min(1.5,bw/2),fill:cssv(TIERFILL[d.t]),'fill-opacity':d.t==='estimated'?0.4:1,class:'col'});
    r.addEventListener('mousemove',e=>showTip('<b>Iteration '+d.i+'</b><br>'+fmtMin(d.s)+(d.c!=null?' &middot; '+fmtUsd(d.c):'')+(d.k?'<br>'+d.k:'')+'<br><span class=src>'+TIERSRC[d.t]+'</span>',e.clientX,e.clientY));
    r.addEventListener('mouseleave',hideTip);s.appendChild(r);});
  [1,${firstKnown - 1},${bilFrom},MAXITER].forEach(i=>{const t=el('text',{x:x(i),y:H-8,'text-anchor':i===1?'start':i===MAXITER?'end':'middle',class:'axis'});t.textContent='#'+i;s.appendChild(t);});
})();

// ---- cost per iteration (columns) ----
(function(){
  const box=document.getElementById('costChart');const rows=DATA.filter(d=>d.c!=null);
  const W=920,H=300,P={l:44,r:12,t:14,b:28};const s=svg(box,W,H);
  const iw=W-P.l-P.r,ih=H-P.t-P.b;const maxC=Math.max(...rows.map(d=>d.c));
  const x=i=>P.l+iw*((i-rows[0].i)/(rows[rows.length-1].i-rows[0].i));const bw=Math.max(2,iw/rows.length-1.2);
  const y=c=>P.t+ih-(c/maxC)*ih;
  [0,5,10,15].forEach(v=>{if(v>maxC)return;const yy=y(v);
    s.appendChild(el('line',{x1:P.l,y1:yy,x2:W-P.r,y2:yy,stroke:cssv('--grid'),'stroke-width':1}));
    const t=el('text',{x:P.l-8,y:yy+4,'text-anchor':'end',class:'axis'});t.textContent='$'+v;s.appendChild(t);});
  rows.forEach(d=>{const bx=x(d.i)-bw/2,by=y(d.c),bh=P.t+ih-by;
    const r=el('rect',{x:bx,y:by,width:bw,height:Math.max(0.5,bh),rx:Math.min(2,bw/2),fill:cssv(TIERFILL[d.t]),class:'col'});
    r.addEventListener('mousemove',e=>showTip('<b>Iteration '+d.i+'</b><br>'+fmtUsd(d.c)+' &middot; '+fmtMin(d.s)+(d.k?'<br>'+d.k:'')+(d.v?'<br><span class=vt>'+d.v.replace('EXPLORED → REVERTED','reverted').toLowerCase()+'</span>':'')+'<br><span class=src>'+TIERSRC[d.t]+'</span>',e.clientX,e.clientY));
    r.addEventListener('mouseleave',hideTip);s.appendChild(r);});
  [rows[0].i,${bilFrom},160,200,rows[rows.length-1].i].forEach(i=>{const t=el('text',{x:x(i),y:H-8,'text-anchor':'middle',class:'axis'});t.textContent='#'+i;s.appendChild(t);});
})();

// ---- cumulative cost (area+line) ----
(function(){
  const box=document.getElementById('cumChart');const rows=DATA.filter(d=>d.c!=null);let acc=0;const pts=rows.map(d=>({i:d.i,y:(acc+=d.c)}));
  const W=920,H=260,P={l:52,r:12,t:14,b:28};const s=svg(box,W,H);
  const iw=W-P.l-P.r,ih=H-P.t-P.b;const maxY=pts[pts.length-1].y;
  const X=i=>P.l+iw*((i-pts[0].i)/(pts[pts.length-1].i-pts[0].i));const Y=v=>P.t+ih-(v/maxY)*ih;
  [0,200,400,600,800].forEach(v=>{if(v>maxY)return;const yy=Y(v);
    s.appendChild(el('line',{x1:P.l,y1:yy,x2:W-P.r,y2:yy,stroke:cssv('--grid'),'stroke-width':1}));
    const t=el('text',{x:P.l-8,y:yy+4,'text-anchor':'end',class:'axis'});t.textContent='$'+v;s.appendChild(t);});
  let dLine='M'+pts.map(p=>X(p.i)+' '+Y(p.y)).join(' L ');
  const dArea=dLine+' L '+X(pts[pts.length-1].i)+' '+Y(0)+' L '+X(pts[0].i)+' '+Y(0)+' Z';
  s.appendChild(el('path',{d:dArea,fill:cssv('--series-1'),'fill-opacity':0.1,stroke:'none'}));
  s.appendChild(el('path',{d:dLine,fill:'none',stroke:cssv('--series-1'),'stroke-width':2,'stroke-linejoin':'round'}));
  const end=pts[pts.length-1];s.appendChild(el('circle',{cx:X(end.i),cy:Y(end.y),r:4,fill:cssv('--series-1'),stroke:cssv('--surface'),'stroke-width':2}));
  const lt=el('text',{x:X(end.i)-8,y:Y(end.y)+18,'text-anchor':'end',class:'endlbl'});lt.textContent=fmtUsd(end.y);s.appendChild(lt);
  const hv=el('line',{y1:P.t,y2:P.t+ih,stroke:cssv('--muted'),'stroke-width':1,opacity:0});s.appendChild(hv);
  const hd=el('circle',{r:4,fill:cssv('--series-1'),stroke:cssv('--surface'),'stroke-width':2,opacity:0});s.appendChild(hd);
  s.addEventListener('mousemove',e=>{const pt=s.getBoundingClientRect();const px=(e.clientX-pt.left)/pt.width*W;
    let best=pts[0],bd=1e9;for(const p of pts){const dd=Math.abs(X(p.i)-px);if(dd<bd){bd=dd;best=p;}}
    hv.setAttribute('x1',X(best.i));hv.setAttribute('x2',X(best.i));hv.setAttribute('opacity',1);
    hd.setAttribute('cx',X(best.i));hd.setAttribute('cy',Y(best.y));hd.setAttribute('opacity',1);
    showTip('<b>Through #'+best.i+'</b><br>'+fmtUsd(best.y)+' cumulative',e.clientX,e.clientY);});
  s.addEventListener('mouseleave',()=>{hv.setAttribute('opacity',0);hd.setAttribute('opacity',0);hideTip();});
  [pts[0].i,${bilFrom},160,200,end.i].forEach(i=>{const t=el('text',{x:X(i),y:H-8,'text-anchor':'middle',class:'axis'});t.textContent='#'+i;s.appendChild(t);});
})();

// ---- verdict breakdown (horizontal bars) ----
(function(){
  const box=document.getElementById('verdictChart');
  const cols={SHIPPED:'--series-1',DEEPENED:'--series-2',FIXED:'--series-3','EXPLORED → REVERTED':'--series-6'};
  const W=920,rowH=52,P={l:110,r:120,t:6,b:6};const H=P.t+P.b+V.length*rowH;const s=svg(box,W,H);
  const maxN=Math.max(...V.map(d=>d.n));const iw=W-P.l-P.r;
  V.forEach((d,idx)=>{const cy=P.t+idx*rowH+rowH/2;const bw=(d.n/maxN)*iw;
    const lab=el('text',{x:P.l-12,y:cy+4,'text-anchor':'end',class:'vlbl'});lab.textContent=d.label;s.appendChild(lab);
    const bar=el('rect',{x:P.l,y:cy-11,width:Math.max(2,bw),height:22,rx:4,fill:cssv(cols[d.v]),class:'col'});
    bar.addEventListener('mousemove',e=>showTip('<b>'+d.label+'</b><br>'+d.n+' iterations<br>'+fmtUsd(d.cost)+' would-be',e.clientX,e.clientY));
    bar.addEventListener('mouseleave',hideTip);s.appendChild(bar);
    const vt=el('text',{x:P.l+bw+8,y:cy+4,class:'vnum'});vt.textContent=d.n+'  ·  '+fmtUsd(d.cost);s.appendChild(vt);});
})();

// ---- provenance coverage strip ----
(function(){
  const box=document.getElementById('provChart');
  const W=920,H=64,P={l:8,r:8,t:8,b:22};const s=svg(box,W,H);const iw=W-P.l-P.r,ih=H-P.t-P.b;
  const X=i=>P.l+iw*((i-1)/(MAXITER-1));
  const segs=[{a:1,b:${firstKnown - 1},c:'--muted'},{a:${recFrom},b:${bilFrom - 1},c:'--series-2'},{a:${bilFrom},b:MAXITER,c:'--series-1'}];
  segs.forEach(g=>{const x0=X(g.a),x1=X(g.b);s.appendChild(el('rect',{x:x0,y:P.t,width:x1-x0-2,height:ih,rx:3,fill:cssv(g.c),'fill-opacity':g.c==='--muted'?0.35:0.9}));});
  [1,${firstKnown - 1},${bilFrom - 1},MAXITER].forEach(i=>{const t=el('text',{x:X(i),y:H-6,'text-anchor':i===1?'start':i===MAXITER?'end':'middle',class:'axis'});t.textContent='#'+i;s.appendChild(t);});
})();
}
drawAll();

// ---- ledger table (billed tier, newest first) ----
(function(){
  const tb=document.querySelector('#ledger tbody');
  const rows=DATA.filter(d=>d.v).slice().reverse();
  const vclass={SHIPPED:'v-ship',DEEPENED:'v-deep',FIXED:'v-fix','EXPLORED → REVERTED':'v-rev'};
  const vtxt={SHIPPED:'shipped',DEEPENED:'deepened',FIXED:'fixed','EXPLORED → REVERTED':'reverted'};
  for(const d of rows){const tr=document.createElement('tr');
    tr.innerHTML='<td class="num">'+d.i+'</td><td>'+(d.k||'—')+'</td><td><span class="vb '+vclass[d.v]+'">'+vtxt[d.v]+'</span></td><td class="num">'+fmtMin(d.s)+'</td><td class="num">'+fmtUsd(d.c)+'</td>';
    tb.appendChild(tr);}
})();
</script>`;

const head = `<style>
:root{
  --surface:#fcfcfb; --plane:#f9f9f7; --ink:#0b0b0b; --ink2:#52514e; --muted:#898781;
  --grid:#e1e0d9; --axis:#c3c2b7; --border:rgba(11,11,11,.10);
  --series-1:#2a78d6; --series-2:#1baf7a; --series-3:#eda100; --series-6:#e34948;
}
@media (prefers-color-scheme:dark){:root{
  --surface:#1a1a19; --plane:#0d0d0d; --ink:#fff; --ink2:#c3c2b7; --muted:#898781;
  --grid:#2c2c2a; --axis:#383835; --border:rgba(255,255,255,.10);
  --series-1:#3987e5; --series-2:#199e70; --series-3:#c98500; --series-6:#e66767;
}}
:root[data-theme=dark]{--surface:#1a1a19;--plane:#0d0d0d;--ink:#fff;--ink2:#c3c2b7;--grid:#2c2c2a;--axis:#383835;--border:rgba(255,255,255,.10);--series-1:#3987e5;--series-2:#199e70;--series-3:#c98500;--series-6:#e66767;}
:root[data-theme=light]{--surface:#fcfcfb;--plane:#f9f9f7;--ink:#0b0b0b;--ink2:#52514e;--grid:#e1e0d9;--axis:#c3c2b7;--border:rgba(11,11,11,.10);--series-1:#2a78d6;--series-2:#1baf7a;--series-3:#eda100;--series-6:#e34948;}
*{box-sizing:border-box}
body{margin:0;background:var(--plane);color:var(--ink);font-family:system-ui,-apple-system,"Segoe UI",sans-serif;line-height:1.5;-webkit-font-smoothing:antialiased}
.wrap{max-width:1000px;margin:0 auto;padding:clamp(20px,5vw,56px) clamp(16px,4vw,32px) 64px}
code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.9em;background:var(--surface);padding:.1em .35em;border-radius:4px;border:1px solid var(--border)}
.hero{padding-bottom:8px}
.eyebrow{text-transform:uppercase;letter-spacing:.12em;font-size:12px;font-weight:600;color:var(--muted)}
h1{font-size:clamp(28px,5vw,44px);line-height:1.1;margin:.3em 0 .35em;letter-spacing:-.02em;max-width:16ch}
.lede{font-size:clamp(16px,2.2vw,18px);color:var(--ink2);max-width:64ch;margin:0 0 26px}
.herofig{display:flex;flex-wrap:wrap;gap:clamp(24px,6vw,64px);margin:26px 0 20px}
.herofig>div{display:flex;flex-direction:column}
.big{font-size:clamp(40px,8vw,64px);font-weight:650;line-height:1;letter-spacing:-.02em}
.big .sm{font-size:.5em;font-weight:600;margin-left:1px}
.unit{color:var(--ink2);font-size:14px;margin-top:6px}
.back{display:inline-block;margin-top:8px;color:var(--series-1);text-decoration:none;font-weight:600;font-size:15px}
.back:hover{text-decoration:underline}
.note{background:var(--surface);border:1px solid var(--border);border-left:3px solid var(--series-3);border-radius:10px;padding:16px 18px;margin:28px 0;font-size:15px;color:var(--ink2)}
.note strong{color:var(--ink)}
.tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin:28px 0 8px}
.tile{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px 18px}
.tl{font-size:13px;color:var(--muted);font-weight:600}
.tv{font-size:32px;font-weight:650;letter-spacing:-.02em;margin:6px 0 2px}
.tv .tvu{font-size:.55em;font-weight:600;margin-left:1px}
.td{font-size:13px;color:var(--ink2)}
.chart{margin:44px 0 0}
.chart h2{font-size:22px;letter-spacing:-.01em;margin:0 0 4px}
.sub{color:var(--ink2);font-size:14.5px;margin:0 0 16px;max-width:72ch}
.svgbox{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:14px 12px}
text.axis{fill:var(--muted);font-size:11px;font-variant-numeric:tabular-nums}
text.vlbl{fill:var(--ink);font-size:14px;font-weight:600}
text.vnum{fill:var(--ink2);font-size:13px;font-variant-numeric:tabular-nums}
text.endlbl{fill:var(--ink);font-size:12px;font-weight:600;font-variant-numeric:tabular-nums}
.col{cursor:pointer;transition:opacity .1s}.col:hover{opacity:.75}
.key{display:inline-block;width:10px;height:10px;border-radius:2px;margin:0 4px 0 2px;vertical-align:baseline}
.key.k-billed{background:var(--series-1)}.key.k-recovered{background:var(--series-2)}.key.k-est{background:var(--muted);opacity:.55}
.provlegend{display:flex;flex-wrap:wrap;gap:8px 22px;margin-top:12px;font-size:13px;color:var(--ink2)}
.provlegend b{color:var(--ink);font-variant-numeric:tabular-nums}
.sw{display:inline-block;width:11px;height:11px;border-radius:3px;margin-right:5px;vertical-align:-1px}
.sw-est{background:var(--muted);opacity:.5}.sw-rec{background:var(--series-2)}.sw-bil{background:var(--series-1)}
.tablewrap{overflow-x:auto;border:1px solid var(--border);border-radius:12px;background:var(--surface);max-height:520px;overflow-y:auto}
table{border-collapse:collapse;width:100%;font-size:14px;min-width:520px}
th,td{text-align:left;padding:10px 14px;border-bottom:1px solid var(--border)}
th{font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:var(--muted);position:sticky;top:0;background:var(--surface)}
tbody tr:last-child td{border-bottom:none}
.num{text-align:right;font-variant-numeric:tabular-nums}
.vb{font-size:12px;font-weight:600;padding:2px 8px;border-radius:20px}
.v-ship{color:var(--series-1);background:color-mix(in srgb,var(--series-1) 14%,transparent)}
.v-deep{color:var(--series-2);background:color-mix(in srgb,var(--series-2) 14%,transparent)}
.v-fix{color:var(--series-3);background:color-mix(in srgb,var(--series-3) 18%,transparent)}
.v-rev{color:var(--series-6);background:color-mix(in srgb,var(--series-6) 14%,transparent)}
footer{margin-top:56px;padding-top:20px;border-top:1px solid var(--border);color:var(--muted);font-size:13.5px}
footer a{color:var(--series-1);text-decoration:none}footer a:hover{text-decoration:underline}
.tip{position:fixed;z-index:10;background:var(--ink);color:var(--surface);padding:8px 11px;border-radius:8px;font-size:12.5px;line-height:1.45;pointer-events:none;box-shadow:0 4px 16px rgba(0,0,0,.25);max-width:240px}
.tip b{font-weight:650}.tip .vt{opacity:.8}.tip .src{opacity:.6;font-size:11px}
.themebtn{position:fixed;top:14px;right:14px;z-index:9;width:36px;height:36px;border-radius:50%;border:1px solid var(--border);background:var(--surface);color:var(--ink2);font-size:17px;cursor:pointer;line-height:1}
.themebtn:hover{color:var(--ink)}
@media print{.themebtn{display:none}}
</style>`;

const doc = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Solvista — an autonomous build loop, in cost &amp; time</title>
<meta name="description" content="${maxIter} iterations of a headless Claude loop growing a procedural city — runtime, would-be cost, and the loop's own self-verified build log.">
<meta name="theme-color" content="#f9f9f7" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0d0d0d" media="(prefers-color-scheme: dark)">
${head}
</head>
<body>
${html}
</body>
</html>`;

writeFileSync(OUT, doc);
console.log('stats.html regenerated —', (doc.length), 'bytes | through #' + maxIter +
  ' | known $' + knownCost.toFixed(2) + ' | ' + totalHours.toFixed(1) + 'h | longest #' + longest.iter + ' ' + (longest.secs/60).toFixed(0) + 'm');
