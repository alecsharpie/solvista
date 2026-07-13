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
 * Iterations before the first RUNLOG entry are shown as a flat 10-min estimate
 * with no cost — clearly labelled as such.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const RUNLOG = join(HERE, 'RUNLOG.md');
const OUT = join(HERE, '../../../stats.html');       // repo root — served by Pages
const EST_MINUTES = 10;                              // flat estimate for the unrecorded early runs

// ---- parse RUNLOG into rows -------------------------------------------------
function parseRunlog(txt) {
  const rows = [];
  for (const l of txt.split('\n')) {
    let m = l.match(/^([✔↩])\s+Iter\s+(\d+)\s+(.*?)\s+(SHIPPED|DEEPENED|FIXED|EXPLORED → REVERTED|REVERTED)\s+(\d+)m(\d+)s\s+\$([0-9.]+)\s+([0-9a-f]{7})/);
    if (m) {
      rows.push({ iter: +m[2], vector: m[3].trim() === '—' ? null : m[3].trim(), verdict: m[4].replace(/\s+/g, ' '),
        secs: +m[5] * 60 + +m[6], cost: +m[7], reverted: /REVERTED/.test(m[4]), tier: 'billed', sha: m[8] });
      continue;
    }
    m = l.match(/^≈\s+Iter\s+(\d+)\s+.*?recovered\s+(\d+)m(\d+)s\s+\$([0-9.]+)\s+([0-9a-f]{7})/);
    if (m) {
      rows.push({ iter: +m[1], vector: null, verdict: null, secs: +m[2] * 60 + +m[3], cost: +m[4], reverted: null, tier: 'recovered', sha: m[5] });
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
  const cost = sum(rs, r => r.cost), secs = sum(rs, r => r.secs);
  return { v, label: v === 'EXPLORED → REVERTED' ? 'Reverted' : v[0] + v.slice(1).toLowerCase(),
    n: rs.length, cost, secs,
    avgCost: rs.length ? cost / rs.length : 0, avgMin: rs.length ? secs / rs.length / 60 : 0 };
});

const fmt$ = n => '$' + n.toFixed(n < 100 ? 2 : 0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const asOf = new Date().toISOString().slice(0, 10);

// ---- what each iteration worked on (a "tag") --------------------------------
// The RUNLOG vector is often blank, so recover the tag from three sources in
// order: the RUNLOG vector column, the commit subject's `(Domain × Kind)`, then
// step-back / fix keywords. Domains are normalised to seven canonical buckets.
const subjOf = {};
try {
  for (const s of execFileSync('git', ['log', '--format=%s'], { encoding: 'utf8', maxBuffer: 1 << 28 }).split('\n')) {
    const im = s.match(/^Iter (\d+):/);
    if (im && !subjOf[+im[1]]) subjOf[+im[1]] = s;
  }
} catch { /* not a git checkout — tags degrade to RUNLOG vector only */ }
const canonDomain = d => {
  if (!d) return null;
  for (const [re, name] of [[/^urban/i, 'Urban'], [/^nature/i, 'Nature'], [/^sky/i, 'Sky'],
    [/^civic/i, 'Civic'], [/^water/i, 'Water'], [/^people/i, 'People'], [/^transport/i, 'Transport']])
    if (re.test(d.trim())) return name;
  return null;
};
function tagFor(r) {
  const v = r.vector || '', s = subjOf[r.iter] || '';
  let d = canonDomain((v.match(/^(.*?)\s*(?:x|×)/) || [])[1]); if (d) return d;
  const p = s.match(/\(([A-Za-z][A-Za-z& ]+?)\s*(?:x|×)\s*[^)]*\)/);
  d = canonDomain(p && p[1]); if (d) return d;
  if (/step-back/i.test(s)) return 'Step-back';
  if (r.verdict === 'FIXED' || /\bfix|\bbug/i.test(s)) return 'Fix';
  return null;
}
for (const r of rows) r.tag = tagFor(r);

// aggregate tags over measured iterations (the ones with a cost/time figure)
const DOMAIN_TAGS = ['Urban', 'Transport', 'Nature', 'People', 'Sky', 'Water', 'Civic'];
const TAG_ORDER = [...DOMAIN_TAGS, 'Step-back', 'Fix'];
const tags = TAG_ORDER.map(t => {
  const rs = known.filter(r => r.tag === t);
  return { t, n: rs.length, cost: sum(rs, r => r.cost), secs: sum(rs, r => r.secs) };
}).filter(d => d.n > 0).sort((a, b) => b.n - a.n);

// The other half of the vector: the KIND of change. Order matters — "interconnect"
// must win over "connect", "New CA rule" over "New element".
const canonKind = d => {
  if (!d) return null;
  for (const [re, name] of [[/polish/i, 'Polish'], [/deepen|interconnect/i, 'Deepen'],
    [/new\s*ca|ca rule/i, 'New CA rule'], [/new element|new tile|new entity|new structure/i, 'New element'],
    [/interaction|ux/i, 'Interaction/UX'], [/connect/i, 'Connect'], [/scale/i, 'Scale']])
    if (re.test(d.trim())) return name;
  return null;
};
function kindFor(r) {
  const grab = str => { const m = str && str.match(/(?:x|×)\s*\**([A-Za-z][A-Za-z/ ]*?)\**\s*(?:[,.)]|$)/); return m ? m[1] : null; };
  let k = canonKind(grab(r.vector)); if (k) return k;
  const p = (subjOf[r.iter] || '').match(/\([^)]*(?:x|×)([^)]*)\)/);
  return canonKind(p ? p[1] : null);
}
for (const r of rows) r.kind = kindFor(r);
const KIND_ORDER = ['Polish', 'Deepen', 'New element', 'Connect', 'Interaction/UX', 'New CA rule', 'Scale'];
const kinds = KIND_ORDER.map(t => {
  const rs = known.filter(r => r.kind === t);
  return { t, n: rs.length, cost: sum(rs, r => r.cost), secs: sum(rs, r => r.secs) };
}).filter(d => d.n > 0).sort((a, b) => b.n - a.n);

const chartRows = rows.map(r => ({ i: r.iter, c: r.cost, s: r.secs, t: r.tier, v: r.verdict, k: r.vector, g: r.tag }));

// ---- why later iterations cost more: context read per iteration -------------
// The fresh process re-reads solvista.html + the ledger every iteration. Recover
// the byte size of each at that iteration's commit, splitting SKILL.md into its
// growing "Laws the loop derived" wedge vs the rest. Cheap (~1.5s over the run),
// and every past iteration's sizes are immutable, so this is a faithful history.
const SKILL_PATH = '.claude/skills/grow-city/SKILL.md';
const GROWTH_PATH = '.claude/skills/grow-city/GROWTH.md';
function skillSplit(sha) {
  try {
    const t = execFileSync('git', ['show', `${sha}:${SKILL_PATH}`], { encoding: 'utf8', maxBuffer: 1 << 28 });
    const m = t.match(/## Laws the loop derived[\s\S]*?(?=\n## |$)/);
    const laws = m ? Buffer.byteLength(m[0]) : 0;
    return { rest: Buffer.byteLength(t) - laws, laws, lawsN: m ? (m[0].match(/^\s*[-*] \*\*/gm) || []).length : 0 };
  } catch { return null; }
}
function blobSizes(sha, files) {
  try {
    const out = execFileSync('git', ['ls-tree', '-l', '-r', sha, '--', ...files], { encoding: 'utf8' });
    const map = {};
    for (const line of out.split('\n')) { const tab = line.split('\t'); if (tab[1]) map[tab[1]] = +tab[0].trim().split(/\s+/)[3] || 0; }
    return map;
  } catch { return null; }
}
const ctx = [];
for (const r of rows) {
  if (!r.sha) continue;
  const sz = blobSizes(r.sha, ['solvista.html', GROWTH_PATH]), sk = skillSplit(r.sha);
  if (!sz || !sk) continue;
  ctx.push({ i: r.iter, sv: (sz['solvista.html'] || 0) / 1024, gr: (sz[GROWTH_PATH] || 0) / 1024,
    skr: sk.rest / 1024, skl: sk.laws / 1024, lawsN: sk.lawsN });
}

// ---- analysis aggregates for the write-up (auto-update as the loop runs) -----
const corr = (xs, ys) => {
  const n = xs.length; if (n < 2) return 0;
  const mx = xs.reduce((a, b) => a + b, 0) / n, my = ys.reduce((a, b) => a + b, 0) / n;
  let sxy = 0, sx = 0, sy = 0;
  for (let k = 0; k < n; k++) { const dx = xs[k] - mx, dy = ys[k] - my; sxy += dx * dy; sx += dx * dx; sy += dy * dy; }
  return sx && sy ? sxy / Math.sqrt(sx * sy) : 0;
};
const SPLIT = 195;                                   // where the regime visibly shifts
const winMin = rs => rs.length ? sum(rs, r => r.secs) / rs.length / 60 : 0;
const winPerMin = rs => { const s = sum(rs, r => r.secs) / 60; return s ? sum(rs, r => r.cost) / s : 0; };
const winRev = rs => rs.length ? billed.filter(r => rs.includes(r) && r.reverted).length / rs.length * 100 : 0;
const pre = billed.filter(r => r.iter < SPLIT), post = billed.filter(r => r.iter >= SPLIT);
const ctxByIter = new Map(ctx.map(c => [c.i, c.sv + c.gr + c.skr + c.skl]));
const joined = billed.filter(r => ctxByIter.has(r.iter));
const ctxFirst = ctx[0], ctxLast = ctx[ctx.length - 1];
const analysis = ctx.length ? {
  preMin: winMin(pre), postMin: winMin(post),
  perMinPre: winPerMin(pre), perMinPost: winPerMin(post),
  revPre: winRev(pre), revPost: winRev(post),
  corrCostTime: corr(billed.map(r => r.secs), billed.map(r => r.cost)),
  corrCostCtx: corr(joined.map(r => ctxByIter.get(r.iter)), joined.map(r => r.cost)),
  skFirst: (ctxFirst.skr + ctxFirst.skl), skLast: (ctxLast.skr + ctxLast.skl),
  lawsFirst: ctxFirst.lawsN, lawsLast: ctxLast.lawsN,
  lawsPctLast: (ctxLast.skl / (ctxLast.skr + ctxLast.skl)) * 100,
  iFirst: ctxFirst.i, iLast: ctxLast.i,
} : null;

// by-result comparison rows (billed tier — the only iterations with verdicts)
const RCLASS = { SHIPPED: 'v-ship', DEEPENED: 'v-deep', FIXED: 'v-fix', 'EXPLORED → REVERTED': 'v-rev' };
const RTXT = { SHIPPED: 'shipped', DEEPENED: 'deepened', FIXED: 'fixed', 'EXPLORED → REVERTED': 'reverted' };
const resultRows = verdicts.map(d =>
  `<tr><td><span class="vb ${RCLASS[d.v]}">${RTXT[d.v]}</span></td><td class="num">${d.n}</td>` +
  `<td class="num">${d.avgMin.toFixed(0)} min</td><td class="num">${fmt$(d.avgCost)}</td>` +
  `<td class="num">${fmt$(d.cost)}</td></tr>`).join('');

// A tiny isometric block — the favicon's mark — used as a section bullet so a row
// of little Solvista tiles marches down the page. Colours are the mark's own
// (sun / gold / shadow), constant in both themes like the favicon.
const CUBE = "data:image/svg+xml," + encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><g transform='translate(32 32.5)'>` +
  `<path d='M0-22 22-9 0 4-22-9Z' fill='#f7e4b4'/><path d='M-22-9 0 4 0 26-22 4Z' fill='#c98a2e'/>` +
  `<path d='M22-9 0 4 0 26 22 4Z' fill='#7a4a1c'/></g></svg>`);

const html = `<button id="themeBtn" class="themebtn" aria-label="Toggle light/dark" title="Toggle theme">◐</button>
<div class="wrap">

<header class="hero">
  <div class="specimen"><div class="chip"><img src="${CUBE}" alt="" width="40" height="40"></div><div class="st"><b>SPECIMEN #${maxIter}</b><span>iterations logged</span></div></div>
  <div class="eyebrow">Solvista · the loop's field log</div>
  <h1>A city that builds itself, one verified step at a time.</h1>
  <p class="lede">Solvista is a procedural cellular-automata city. It grows through a headless
  loop: each iteration is a fresh <code>claude&nbsp;-p</code> process with an empty context that reads the
  ledger, makes <em>one</em> improvement, verifies it with a numeric census and screenshot gates,
  commits, and exits — then the next one starts. No human in the loop. This page is the receipts.</p>
  <div class="herofig">
    <div><span class="big">${fmt$(knownCost)}</span><span class="unit">would-be API cost &middot; ${known.length} measured iterations</span></div>
    <div><span class="big">${totalHours.toFixed(0)}<span class="sm">h</span></span><span class="unit">of autonomous compute &middot; ${maxIter} iterations</span></div>
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
  <div class="tile"><div class="tv">${fmt$(knownCost)}</div><div class="tl">Would-be API cost</div><div class="td">across ${known.length} measured iterations</div></div>
  <div class="tile"><div class="tv">${knownHours.toFixed(1)}<span class="tvu">h</span></div><div class="tl">Autonomous compute</div><div class="td">measured; ${totalHours.toFixed(0)}h incl. estimated early runs</div></div>
  <div class="tile"><div class="tv">${avgMin.toFixed(0)}<span class="tvu">min</span></div><div class="tl">Per iteration</div><div class="td">avg &middot; ${fmt$(avgCost)} would-be</div></div>
  <div class="tile"><div class="tv">${(longest.secs/60).toFixed(0)}<span class="tvu">min</span></div><div class="tl">Longest iteration</div><div class="td">#${longest.iter} &middot; ${fmt$(priciest.cost)} priciest (#${priciest.iter})</div></div>
</section>

<section class="chart">
  <h2>How long each iteration ran</h2>
  <p class="sub">Wall-clock runtime per iteration, each bar coloured by the loop's own verdict:
  <span class="key k-ship"></span>shipped, <span class="key k-deep"></span>deepened,
  <span class="key k-fix"></span>fixed, <span class="key k-rev"></span>reverted &mdash;
  <span class="key k-est"></span>grey are the early runs with no recorded verdict. Reverts run
  <strong>longest on average</strong>; the single longest was ${(longest.secs/60).toFixed(0)} min (#${longest.iter}). Provenance
  (estimated / recovered / live) is the strip near the bottom. Hover for detail.</p>
  <div id="timeChart" class="svgbox"></div>
</section>

<section class="chart">
  <h2>What each iteration would have cost</h2>
  <p class="sub">One column per iteration, coloured by result:
  <span class="key k-ship"></span>shipped, <span class="key k-deep"></span>deepened,
  <span class="key k-fix"></span>fixed, <span class="key k-rev"></span>reverted;
  <span class="key k-est"></span>grey columns (#${recFrom}&ndash;${bilFrom - 1}) predate the verdict log. The
  unrecorded early runs have no cost figure. Hover for detail.</p>
  <div id="costChart" class="svgbox"></div>
</section>

<section class="chart">
  <h2>Cumulative would-be cost</h2>
  <p class="sub">The compounding price of ${known.length} autonomous iterations, if it had been metered.</p>
  <div id="cumChart" class="svgbox"></div>
</section>

<section class="chart">
  <h2>The mix of results, through time</h2>
  <p class="sub">Every iteration that recorded a verdict (#${bilFrom}&ndash;${maxIter}), in order. Each tick is one
  iteration, coloured by how the loop judged its own work:
  <span class="key k-ship"></span>shipped, <span class="key k-deep"></span>deepened,
  <span class="key k-fix"></span>fixed, <span class="key k-rev"></span>reverted. It kept shipping deep
  into the run — and kept honestly reverting the dead ends too. Hover for detail.</p>
  <div id="resultChart" class="svgbox"></div>
</section>

<section class="chart">
  <h2>Time &amp; cost, by result</h2>
  <p class="sub">What each kind of outcome costs, across the ${billed.length} iterations with a verdict. A
  revert isn't free — a dead end still burns compute before the loop backs out — while a quick
  <em>fix</em> is the cheapest thing it does. Would-be API prices; no money was actually spent.</p>
  <div class="tablewrap">
    <table id="byresult"><thead><tr><th>Result</th><th class="num">Count</th><th class="num">Avg time</th><th class="num">Avg would-be $</th><th class="num">Total would-be $</th></tr></thead><tbody>${resultRows}</tbody></table>
  </div>
</section>

<section class="chart">
  <h2>What the loop worked on</h2>
  <p class="sub">Each iteration is tagged by the part of the city it touched — recovered from the ledger
  and commit log, so even iterations that logged a blank vector are placed. <strong>Step-back</strong>
  is the loop's periodic whole-city review (no single domain); <strong>Fix</strong> is a repair with no
  growth vector. Bars are counts across the ${known.length} measured iterations; hover for would-be cost.</p>
  <div id="tagChart" class="svgbox"></div>
</section>

<section class="chart">
  <h2>How the loop changed the city</h2>
  <p class="sub">The other half of each vector: the <em>kind</em> of change, not the place. <strong>Deepen</strong>
  enriches or interconnects what already exists (the loop's self-declared highest-yield move);
  <strong>Polish</strong> makes something read better without adding anything; <strong>New element</strong> adds a
  tile or entity; <strong>Connect</strong> links across a domain; <strong>Interaction/UX</strong> is how you read and
  poke the diorama. Counts across the ${kinds.reduce((a, d) => a + d.n, 0)} growth iterations that named a kind (step-backs and fixes have
  none); hover for avg time and cost.</p>
  <div id="kindChart" class="svgbox"></div>
</section>
${analysis ? `
<section class="chart">
  <h2>Why later iterations cost more</h2>
  <p class="sub">Cost climbed after #${SPLIT}, and it decomposes cleanly. Iterations didn't get pricier
  <em>per minute</em> &mdash; ${fmt$(analysis.perMinPre)}/min before #${SPLIT}, ${fmt$(analysis.perMinPost)}/min after, essentially
  flat. They got <strong>longer</strong>: ${analysis.preMin.toFixed(0)}&nbsp;&rarr;&nbsp;${analysis.postMin.toFixed(0)} min on average, as the easy wins ran
  out (reverts ${analysis.revPre.toFixed(0)}%&nbsp;&rarr;&nbsp;${analysis.revPost.toFixed(0)}%) and the self-check protocol grew heavier. Runtime is what
  cost tracks (r&nbsp;=&nbsp;${analysis.corrCostTime.toFixed(2)}). Layered on top, each of those longer iterations re-reads a bigger
  pile of context (r&nbsp;=&nbsp;${analysis.corrCostCtx.toFixed(2)}) &mdash; so the two compound.</p>
  <p class="sub">Every iteration is a fresh process that re-reads the artifact plus the ledger it must obey, before
  it does any work. <span class="key k-billed"></span>solvista.html grows gently;
  <span class="key k-deep"></span>GROWTH.md is <strong>capped</strong> and stays flat;
  <span class="key k-est"></span>the SKILL.md skeleton barely moves; and
  <span class="key k-rev"></span>the <strong>Laws</strong> section of SKILL.md is the wedge that runs away. Hover for the split.</p>
  <div id="ctxChart" class="svgbox"></div>
</section>

<section class="chart">
  <h2>The ledger that never forgets</h2>
  <p class="sub">That red wedge is the loop's institutional memory. When a lesson is learned the expensive way, the
  loop <em>promotes</em> it to a permanent &ldquo;Laws the loop derived&rdquo; list so it is never re-learned &mdash;
  and that list has grown from <strong>${analysis.lawsFirst} laws</strong> (#${analysis.iFirst}) to <strong>${analysis.lawsLast}</strong> (#${analysis.iLast}), now
  <strong>${analysis.lawsPctLast.toFixed(0)}% of SKILL.md</strong> and read in full on every single run.</p>
  <p class="sub">It exists because of a trade-off worth seeing plainly. <code>GROWTH.md</code>, the prose ledger, is
  budget-capped, so old entries rotate into an archive the loop stops reading &mdash; and it began
  <em>re-deriving</em> lessons it had already paid for. Promoting them to an uncapped list fixed the re-learning, but
  moved the growth to a file read <em>every</em> iteration: capping one ledger just pushed the cost into another. The
  clean fix isn't to un-cap <code>GROWTH.md</code> &mdash; it's to <strong>distil and cap the laws too</strong>, since
  many already supersede one another.</p>
</section>
` : ''}
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
const TAGS = ${JSON.stringify(tags)};
const KINDS = ${JSON.stringify(kinds)};
const CTX = ${JSON.stringify(ctx)};
const MAXITER = ${maxIter};
const fmtUsd = n => n==null ? '—' : '$'+n.toFixed(2);
const fmtMin = s => (s/60).toFixed(0)+' min';
const cssv = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();

// Shared geometry so every iteration-indexed chart lines up on the same x axis:
// identical plot width, left/right margins, iteration domain [1..MAXITER], ticks.
const CW=920, PL=52, PR=16, IW=CW-PL-PR;
const xI=i=>PL+IW*((i-1)/(MAXITER-1));
const BW=Math.max(1.6, IW/MAXITER-0.6);
const XTICKS=[1,${firstKnown - 1},${bilFrom},200,MAXITER].filter((v,i,a)=>a.indexOf(v)===i&&v>=1&&v<=MAXITER);
function xAxis(s,H){XTICKS.forEach(i=>{const t=el('text',{x:xI(i),y:H-8,'text-anchor':i===1?'start':i>=MAXITER?'end':'middle',class:'axis'});t.textContent='#'+i;s.appendChild(t);});}
const TIERSRC = {estimated:'estimated (no record)', recovered:'recovered from logs', billed:'logged live'};
// Colour bars by the loop's own verdict; grey where no verdict was recorded.
const VCOL = {SHIPPED:'--series-1',DEEPENED:'--series-2',FIXED:'--series-3','EXPLORED → REVERTED':'--series-6'};
const VTXT = {SHIPPED:'shipped',DEEPENED:'deepened',FIXED:'fixed','EXPLORED → REVERTED':'reverted'};
const barFill = d => d.v ? VCOL[d.v] : '--muted';
const barOp = d => d.t==='estimated' ? 0.35 : (d.v ? 1 : 0.55);

const NS='http://www.w3.org/2000/svg';
function el(t,a={}){const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);return e;}
function svg(box,w,h){const s=el('svg',{viewBox:'0 0 '+w+' '+h,width:'100%',preserveAspectRatio:'xMidYMid meet'});box.innerHTML='';box.appendChild(s);return s;}

const tip=document.getElementById('tip');
function showTip(html,x,y){tip.innerHTML=html;tip.hidden=false;const r=tip.getBoundingClientRect();
  let L=x+14,T=y+14;if(L+r.width>window.innerWidth-8)L=x-r.width-14;if(T+r.height>window.innerHeight-8)T=y-r.height-14;
  tip.style.left=L+'px';tip.style.top=T+'px';}
function hideTip(){tip.hidden=true;}

// Horizontal count bars with an avg-time/avg-cost tooltip; fillFn(label)->{c,o}.
function drawBars(boxId,items,fillFn){
  const box=document.getElementById(boxId);if(!box||!items.length)return;
  const W=CW,rowH=40,P={l:116,r:150,t:6,b:6};const H=P.t+P.b+items.length*rowH;const s=svg(box,W,H);
  const maxN=Math.max(...items.map(d=>d.n));const iw=W-P.l-P.r;
  items.forEach((d,idx)=>{const cy=P.t+idx*rowH+rowH/2;const bw=(d.n/maxN)*iw;const f=fillFn(d.t);
    const lab=el('text',{x:P.l-12,y:cy+4,'text-anchor':'end',class:'vlbl'});lab.textContent=d.t;s.appendChild(lab);
    const bar=el('rect',{x:P.l,y:cy-10,width:Math.max(2,bw),height:20,rx:4,fill:cssv(f.c),'fill-opacity':f.o,class:'col'});
    const avgM=(d.secs/60/d.n).toFixed(0),avgC=fmtUsd(d.cost/d.n);
    bar.addEventListener('mousemove',e=>showTip('<b>'+d.t+'</b><br>'+d.n+' iterations<br>'+avgM+' min &middot; '+avgC+' avg<br>'+fmtUsd(d.cost)+' would-be total',e.clientX,e.clientY));
    bar.addEventListener('mouseleave',hideTip);s.appendChild(bar);
    const vt=el('text',{x:P.l+Math.max(2,bw)+8,y:cy+4,class:'vnum'});vt.textContent=d.n+'  ·  '+fmtUsd(d.cost);s.appendChild(vt);});
}

function drawAll(){
// ---- runtime per iteration (columns, full run, all tiers) ----
(function(){
  const box=document.getElementById('timeChart');const rows=DATA;
  const W=CW,H=300,P={l:PL,r:PR,t:14,b:28};const s=svg(box,W,H);
  const ih=H-P.t-P.b;const maxM=Math.max(...rows.map(d=>d.s/60));
  const y=m=>P.t+ih-(m/maxM)*ih;
  [0,30,60,90].forEach(v=>{if(v>maxM)return;const yy=y(v);
    s.appendChild(el('line',{x1:P.l,y1:yy,x2:W-P.r,y2:yy,stroke:cssv('--grid'),'stroke-width':1}));
    const t=el('text',{x:P.l-8,y:yy+4,'text-anchor':'end',class:'axis'});t.textContent=v+'m';s.appendChild(t);});
  rows.forEach(d=>{const m=d.s/60;const bx=xI(d.i)-BW/2,by=y(m),bh=P.t+ih-by;
    const r=el('rect',{x:bx,y:by,width:BW,height:Math.max(0.5,bh),rx:Math.min(1.5,BW/2),fill:cssv(barFill(d)),'fill-opacity':barOp(d),class:'col'});
    r.addEventListener('mousemove',e=>showTip('<b>Iteration '+d.i+'</b><br>'+fmtMin(d.s)+(d.c!=null?' &middot; '+fmtUsd(d.c):'')+(d.v?'<br><span class=vt>'+VTXT[d.v]+'</span>':'')+(d.g?'<br>'+d.g:'')+'<br><span class=src>'+TIERSRC[d.t]+'</span>',e.clientX,e.clientY));
    r.addEventListener('mouseleave',hideTip);s.appendChild(r);});
  xAxis(s,H);
})();

// ---- cost per iteration (columns) ----
(function(){
  const box=document.getElementById('costChart');const rows=DATA.filter(d=>d.c!=null);
  const W=CW,H=300,P={l:PL,r:PR,t:14,b:28};const s=svg(box,W,H);
  const ih=H-P.t-P.b;const maxC=Math.max(...rows.map(d=>d.c));
  const y=c=>P.t+ih-(c/maxC)*ih;
  [0,5,10,15].forEach(v=>{if(v>maxC)return;const yy=y(v);
    s.appendChild(el('line',{x1:P.l,y1:yy,x2:W-P.r,y2:yy,stroke:cssv('--grid'),'stroke-width':1}));
    const t=el('text',{x:P.l-8,y:yy+4,'text-anchor':'end',class:'axis'});t.textContent='$'+v;s.appendChild(t);});
  rows.forEach(d=>{const bx=xI(d.i)-BW/2,by=y(d.c),bh=P.t+ih-by;
    const r=el('rect',{x:bx,y:by,width:BW,height:Math.max(0.5,bh),rx:Math.min(2,BW/2),fill:cssv(barFill(d)),'fill-opacity':barOp(d),class:'col'});
    r.addEventListener('mousemove',e=>showTip('<b>Iteration '+d.i+'</b><br>'+fmtUsd(d.c)+' &middot; '+fmtMin(d.s)+(d.v?'<br><span class=vt>'+VTXT[d.v]+'</span>':'')+(d.g?'<br>'+d.g:'')+'<br><span class=src>'+TIERSRC[d.t]+'</span>',e.clientX,e.clientY));
    r.addEventListener('mouseleave',hideTip);s.appendChild(r);});
  xAxis(s,H);
})();

// ---- cumulative cost (area+line) ----
(function(){
  const box=document.getElementById('cumChart');const rows=DATA.filter(d=>d.c!=null);let acc=0;const pts=rows.map(d=>({i:d.i,y:(acc+=d.c)}));
  const W=CW,H=260,P={l:PL,r:PR,t:14,b:28};const s=svg(box,W,H);
  const ih=H-P.t-P.b;const maxY=pts[pts.length-1].y;
  const X=i=>xI(i);const Y=v=>P.t+ih-(v/maxY)*ih;
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
  xAxis(s,H);
})();

// ---- results through time (verdict strip) ----
(function(){
  const box=document.getElementById('resultChart');const rows=DATA.filter(d=>d.v);if(!rows.length)return;
  const cols={SHIPPED:'--series-1',DEEPENED:'--series-2',FIXED:'--series-3','EXPLORED → REVERTED':'--series-6'};
  const vtxt={SHIPPED:'shipped',DEEPENED:'deepened',FIXED:'fixed','EXPLORED → REVERTED':'reverted'};
  const W=CW,H=120,P={l:PL,r:PR,t:12,b:26};const s=svg(box,W,H);
  const ih=H-P.t-P.b;
  rows.forEach(d=>{const bx=xI(d.i)-BW/2;
    const r=el('rect',{x:bx,y:P.t,width:BW,height:ih,rx:Math.min(1.5,BW/2),fill:cssv(cols[d.v]),class:'col'});
    r.addEventListener('mousemove',e=>showTip('<b>Iteration '+d.i+'</b><br><span class=vt>'+vtxt[d.v]+'</span><br>'+fmtMin(d.s)+' &middot; '+fmtUsd(d.c)+(d.g?'<br>'+d.g:''),e.clientX,e.clientY));
    r.addEventListener('mouseleave',hideTip);s.appendChild(r);});
  xAxis(s,H);
})();

// ---- provenance coverage strip ----
(function(){
  const box=document.getElementById('provChart');
  const W=CW,H=64,P={l:PL,r:PR,t:8,b:22};const s=svg(box,W,H);const ih=H-P.t-P.b;
  const segs=[{a:1,b:${firstKnown - 1},c:'--muted'},{a:${recFrom},b:${bilFrom - 1},c:'--series-2'},{a:${bilFrom},b:MAXITER,c:'--series-1'}];
  segs.forEach(g=>{const x0=xI(g.a),x1=xI(g.b);s.appendChild(el('rect',{x:x0,y:P.t,width:x1-x0-2,height:ih,rx:3,fill:cssv(g.c),'fill-opacity':g.c==='--muted'?0.35:0.9}));});
  xAxis(s,H);
})();

// ---- horizontal count bars, reused for the domain and kind breakdowns ----
drawBars('tagChart', TAGS, t => ({ c: (t==='Step-back'||t==='Fix') ? '--muted' : '--series-1', o: (t==='Step-back'||t==='Fix') ? 0.5 : 1 }));
drawBars('kindChart', KINDS, () => ({ c: '--series-1', o: 1 }));

// ---- context read each iteration (stacked area: artifact + ledger) ----
(function(){
  const box=document.getElementById('ctxChart');if(!box||!CTX.length)return;
  const W=CW,H=300,P={l:PL,r:PR,t:14,b:28};const s=svg(box,W,H);
  const ih=H-P.t-P.b;
  const keys=[['sv','--series-1'],['gr','--series-2'],['skr','--muted'],['skl','--series-6']];
  const tot=d=>d.sv+d.gr+d.skr+d.skl;
  const maxY=Math.max(...CTX.map(tot))*1.04;
  const Y=v=>P.t+ih-(v/maxY)*ih;
  const step=maxY>1200?400:maxY>600?200:maxY>300?100:50;
  const lbl=v=>v>=1024?(v/1024).toFixed(1)+'MB':v+'KB';
  for(let v=0;v<=maxY;v+=step){const yy=Y(v);
    s.appendChild(el('line',{x1:P.l,y1:yy,x2:W-P.r,y2:yy,stroke:cssv('--grid'),'stroke-width':1}));
    const t=el('text',{x:P.l-8,y:yy+4,'text-anchor':'end',class:'axis'});t.textContent=lbl(v);s.appendChild(t);}
  const base=CTX.map(()=>0);
  keys.forEach(([k,col])=>{
    const top=CTX.map((d,idx)=>base[idx]+d[k]);
    const topPts=CTX.map((d,idx)=>xI(d.i)+' '+Y(top[idx]));
    const botPts=CTX.map((d,idx)=>xI(d.i)+' '+Y(base[idx])).reverse();
    s.appendChild(el('path',{d:'M'+topPts.join(' L ')+' L '+botPts.join(' L ')+' Z',fill:cssv(col),'fill-opacity':k==='skr'?0.4:0.85,stroke:'none'}));
    CTX.forEach((d,idx)=>base[idx]=top[idx]);});
  const hv=el('line',{y1:P.t,y2:P.t+ih,stroke:cssv('--ink'),'stroke-width':1,opacity:0});s.appendChild(hv);
  const kb=v=>v>=1024?(v/1024).toFixed(2)+' MB':Math.round(v)+' KB';
  s.addEventListener('mousemove',e=>{const pt=s.getBoundingClientRect();const px=(e.clientX-pt.left)/pt.width*W;
    let best=CTX[0],bd=1e9;for(const d of CTX){const dd=Math.abs(xI(d.i)-px);if(dd<bd){bd=dd;best=d;}}
    hv.setAttribute('x1',xI(best.i));hv.setAttribute('x2',xI(best.i));hv.setAttribute('opacity',1);
    showTip('<b>Iteration '+best.i+'</b> reads<br>solvista.html '+kb(best.sv)+'<br>GROWTH.md '+kb(best.gr)+'<br>SKILL.md skeleton '+kb(best.skr)+'<br><span style="color:'+cssv('--series-6')+'">SKILL.md laws '+kb(best.skl)+' &middot; '+best.lawsN+' laws</span><br><b>'+kb(tot(best))+' total</b>',e.clientX,e.clientY);});
  s.addEventListener('mouseleave',()=>{hv.setAttribute('opacity',0);hideTip();});
  xAxis(s,H);
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
    const vec=d.k||(d.g?'<span class="dim">'+d.g+'</span>':'—');
    tr.innerHTML='<td class="num">'+d.i+'</td><td>'+vec+'</td><td><span class="vb '+vclass[d.v]+'">'+vtxt[d.v]+'</span></td><td class="num">'+fmtMin(d.s)+'</td><td class="num">'+fmtUsd(d.c)+'</td>';
    tb.appendChild(tr);}
})();
</script>`;

const head = `<style>
:root{
  /* Solvista at golden hour — parchment cards on a pale-blue-to-sand sky */
  --sky:#cfe4ec; --ground:#e7dcc4; --plane:#e7dcc4;
  --surface:#f6efdd; --ink:#2a241b; --ink2:#6b6252; --muted:#9a8f76;
  --grid:#ddd0b3; --axis:#c3b498; --gold:#b47d1c; --border:rgba(58,54,45,.16);
  /* data colours drawn off the map but picked for contrast on parchment:
     water (shipped), grass (deepened), dusk-plum (fixed), roof-clay (reverted) */
  --series-1:#2f7d9b; --series-2:#4f8a3f; --series-3:#86598a; --series-6:#c15236;
}
@media (prefers-color-scheme:dark){:root{
  /* Solvista at dusk — twilight-navy sky fading to warm dark, cream ink */
  --sky:#1e2744; --ground:#141118; --plane:#141118;
  --surface:#211d17; --ink:#f6efdd; --ink2:#c8bc9f; --muted:#8f8469;
  --grid:#312d25; --axis:#433d33; --gold:#e0a94e; --border:rgba(247,240,223,.13);
  --series-1:#5cabca; --series-2:#84b866; --series-3:#c193bd; --series-6:#e07a5f;
}}
:root[data-theme=dark]{--sky:#1e2744;--ground:#141118;--plane:#141118;--surface:#211d17;--ink:#f6efdd;--ink2:#c8bc9f;--muted:#8f8469;--grid:#312d25;--axis:#433d33;--gold:#e0a94e;--border:rgba(247,240,223,.13);--series-1:#5cabca;--series-2:#84b866;--series-3:#c193bd;--series-6:#e07a5f;}
:root[data-theme=light]{--sky:#cfe4ec;--ground:#e7dcc4;--plane:#e7dcc4;--surface:#f6efdd;--ink:#2a241b;--ink2:#6b6252;--muted:#9a8f76;--grid:#ddd0b3;--axis:#c3b498;--gold:#b47d1c;--border:rgba(58,54,45,.16);--series-1:#2f7d9b;--series-2:#4f8a3f;--series-3:#86598a;--series-6:#c15236;}
*{box-sizing:border-box}
body{margin:0;color:var(--ink);background:var(--ground);
  background-image:linear-gradient(180deg,var(--sky) 0,var(--ground) 46%);background-attachment:fixed;
  font-family:system-ui,-apple-system,"Segoe UI",sans-serif;line-height:1.5;-webkit-font-smoothing:antialiased}
.serif{font-family:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,"Times New Roman",serif}
.wrap{max-width:1000px;margin:0 auto;padding:clamp(20px,5vw,56px) clamp(16px,4vw,32px) 64px}
code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.88em;background:color-mix(in srgb,var(--ink) 7%,transparent);padding:.1em .35em;border-radius:4px}
.hero{position:relative;padding-bottom:8px}
.eyebrow{text-transform:uppercase;letter-spacing:.16em;font-size:12px;font-weight:700;color:var(--gold)}
h1{font-family:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,"Times New Roman",serif;
  font-size:clamp(30px,5.4vw,50px);font-weight:600;line-height:1.05;margin:.28em 0 .38em;letter-spacing:-.01em;max-width:17ch}
.lede{font-size:clamp(16px,2.2vw,18px);color:var(--ink2);max-width:62ch;margin:0 0 22px}
.specimen{position:absolute;top:2px;right:0;display:flex;align-items:center;gap:12px}
.specimen .chip{width:56px;height:56px;border-radius:14px;background:#0d0d0d;display:grid;place-items:center;box-shadow:0 6px 18px rgba(40,30,10,.22)}
.specimen .chip img{width:40px;height:40px;display:block}
.specimen .st{display:flex;flex-direction:column;line-height:1.25}
.specimen .st b{font-size:14px;font-weight:700;letter-spacing:.02em;color:var(--ink)}
.specimen .st span{font-size:12px;color:var(--muted)}
.herofig{display:flex;flex-wrap:wrap;gap:clamp(22px,6vw,60px);margin:24px 0 20px}
.herofig>div{display:flex;flex-direction:column}
.big{font-size:clamp(40px,8vw,62px);font-weight:650;line-height:1;letter-spacing:-.02em;color:var(--gold)}
.big .sm{font-size:.5em;font-weight:600;margin-left:1px}
.unit{color:var(--ink2);font-size:13.5px;margin-top:7px;max-width:24ch}
.back{display:inline-block;margin-top:6px;color:var(--gold);text-decoration:none;font-weight:700;font-size:15px}
.back:hover{text-decoration:underline}
.note{background:var(--surface);border:1px solid var(--border);border-left:3px solid var(--gold);border-radius:12px;padding:16px 18px;margin:26px 0;font-size:15px;color:var(--ink2)}
.note strong{color:var(--ink)}
/* the four headline figures, set like the city's own bottom read-out bar */
.tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));margin:26px 0 8px;
  background:var(--surface);border:1px solid var(--border);border-top:3px solid var(--gold);border-radius:12px;overflow:hidden}
.tile{padding:16px 20px;border-left:1px solid var(--border)}
.tile:first-child{border-left:none}
.tv{font-size:31px;font-weight:650;letter-spacing:-.02em;color:var(--gold)}
.tv .tvu{font-size:.5em;font-weight:600;margin-left:1px;color:var(--ink2)}
.tl{font-size:11.5px;text-transform:uppercase;letter-spacing:.09em;color:var(--muted);font-weight:700;margin:5px 0 3px}
.td{font-size:12.5px;color:var(--ink2)}
.chart{margin:46px 0 0}
.chart h2{font-family:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,"Times New Roman",serif;
  font-size:23px;font-weight:600;letter-spacing:-.01em;margin:0 0 5px;padding-left:26px;
  background:url("${CUBE}") left 2px/17px no-repeat}
.sub{color:var(--ink2);font-size:14.5px;margin:0 0 16px;max-width:72ch}
.svgbox{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:14px 12px}
text.axis{fill:var(--muted);font-size:11px;font-variant-numeric:tabular-nums}
text.vlbl{fill:var(--ink);font-size:14px;font-weight:600}
text.vnum{fill:var(--ink2);font-size:13px;font-variant-numeric:tabular-nums}
text.endlbl{fill:var(--ink);font-size:12px;font-weight:600;font-variant-numeric:tabular-nums}
.col{cursor:pointer;transition:opacity .1s}.col:hover{opacity:.75}
.key{display:inline-block;width:10px;height:10px;border-radius:2px;margin:0 4px 0 2px;vertical-align:baseline}
.key.k-billed{background:var(--series-1)}.key.k-recovered{background:var(--series-2)}.key.k-est{background:var(--muted);opacity:.55}
.key.k-ship{background:var(--series-1)}.key.k-deep{background:var(--series-2)}.key.k-fix{background:var(--series-3)}.key.k-rev{background:var(--series-6)}
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
.dim{color:var(--muted)}
.vb{font-size:12px;font-weight:600;padding:2px 8px;border-radius:20px}
.v-ship{color:var(--series-1);background:color-mix(in srgb,var(--series-1) 16%,transparent)}
.v-deep{color:var(--series-2);background:color-mix(in srgb,var(--series-2) 16%,transparent)}
.v-fix{color:var(--series-3);background:color-mix(in srgb,var(--series-3) 18%,transparent)}
.v-rev{color:var(--series-6);background:color-mix(in srgb,var(--series-6) 16%,transparent)}
footer{margin-top:56px;padding-top:20px;border-top:1px solid var(--border);color:var(--muted);font-size:13.5px}
footer a{color:var(--gold);text-decoration:none}footer a:hover{text-decoration:underline}
.tip{position:fixed;z-index:10;background:var(--ink);color:var(--surface);padding:8px 11px;border-radius:8px;font-size:12.5px;line-height:1.45;pointer-events:none;box-shadow:0 4px 16px rgba(0,0,0,.25);max-width:240px}
.tip b{font-weight:650}.tip .vt{opacity:.8}.tip .src{opacity:.6;font-size:11px}
.themebtn{position:fixed;top:14px;right:14px;z-index:9;width:36px;height:36px;border-radius:50%;border:1px solid var(--border);background:var(--surface);color:var(--ink2);font-size:17px;cursor:pointer;line-height:1}
.themebtn:hover{color:var(--ink)}
@media (max-width:560px){.specimen{display:none}}
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
<link rel="icon" href="favicon.svg" type="image/svg+xml">
${head}
</head>
<body>
${html}
</body>
</html>`;

writeFileSync(OUT, doc);
console.log('stats.html regenerated —', (doc.length), 'bytes | through #' + maxIter +
  ' | known $' + knownCost.toFixed(2) + ' | ' + totalHours.toFixed(1) + 'h | longest #' + longest.iter + ' ' + (longest.secs/60).toFixed(0) + 'm');
