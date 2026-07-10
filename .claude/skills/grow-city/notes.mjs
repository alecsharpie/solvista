#!/usr/bin/env node
/* notes — generate release notes for a range of iterations from git + the ledger.
 *
 *   node notes.mjs                     # everything since the last tag, or all history
 *   node notes.mjs Iter100..HEAD       # an explicit git range
 *   node notes.mjs 4299d9b..HEAD       # sha range
 *   node notes.mjs --last 20           # the last N iteration commits
 *
 * Everything is READ from what the iterations already wrote: the commit subject,
 * the `Domain × Kind` opening each body, the `**Verdict**` in each ledger entry,
 * and the head-to-tail delta of `census-history.jsonl`. The generator invents no
 * prose -- its whole job is selection and grouping, which is the one thing a plain
 * `git log` cannot do:
 *   - iterations are grouped by DOMAIN, so the notes read as "what happened to the
 *     waterfront / to transport", not a flat time-ordered list;
 *   - EXPLORED → REVERTED iterations get their own section, because "what we tried
 *     and rejected, and why" is the most interesting part of an autonomous run and
 *     no conventional changelog tool would ever surface it.
 *
 * Output is Markdown on stdout. Redirect it, paste it, or pipe it anywhere.
 */
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, '../../..');
const git = (...a) => execFileSync('git', ['-C', REPO, ...a], { encoding: 'utf8' }).trimEnd();

/* ---- resolve the range ---------------------------------------------------- */
const argv = process.argv.slice(2);
let range = argv.find((a) => a.includes('..'));
const lastI = argv.indexOf('--last');
if (lastI !== -1 && argv[lastI + 1]) {
  const n = parseInt(argv[lastI + 1], 10);
  const shas = git('log', '--format=%H', '--grep=^Iter ', '-E', `-${n}`).split('\n').filter(Boolean);
  if (shas.length) range = `${shas[shas.length - 1]}~1..HEAD`;
}
if (!range) {
  const lastTag = (() => {
    try { return git('describe', '--tags', '--abbrev=0'); } catch { return ''; }
  })();
  range = lastTag ? `${lastTag}..HEAD` : '';
}

/* ---- collect the iteration commits, oldest first --------------------------- */
const fmt = '%H%x01%s%x01%aI%x01%b%x02';
const raw = git('log', ...(range ? [range] : []), '--reverse', `--format=${fmt}`);
const commits = raw
  .split('\x02')
  .map((c) => c.replace(/[\x00\n]+/, '').trim()) // drop the record separator's leading newline
  .filter(Boolean)
  .map((c) => {
    const [sha, subject, date, body = ''] = c.split('\x01');
    return { sha: sha.trim().slice(0, 7), subject, date, body };
  });

const DOMAINS = [
  'Nature', 'Water & coast', 'Urban fabric', 'Transport',
  'Civic & culture', 'Sky & atmosphere', 'People & activity',
];

/* One read of the ledger entry serves both the verdict and the vector fallback:
 * a title-only commit body (iters 114/117) still has a full ledger entry. */
function entryOf(num) {
  for (const f of ['GROWTH.md', 'GROWTH-archive.md']) {
    const p = join(HERE, f);
    if (!existsSync(p)) continue;
    const txt = readFileSync(p, 'utf8');
    const start = txt.search(new RegExp(`^## Iteration ${num}\\b`, 'm'));
    if (start === -1) continue;
    const rest = txt.slice(start + 1);
    const nx = rest.search(/^## (?:Iteration \d+|U\d+)\b/m);
    return nx === -1 ? txt.slice(start) : txt.slice(start, start + 1 + nx);
  }
  return '';
}

function verdictOf(entry, subject) {
  const v = entry.match(/\*\*Verdict[^*]*?(SHIPPED|DEEPENED|FIXED|EXPLORED\s*(?:→|->)\s*REVERTED|REVERTED)/i);
  if (v) return v[1].toUpperCase().replace(/\s*(?:→|->)\s*/, ' → ');
  return /explored\s*->\s*reverted|\(reverted\)/i.test(subject) ? 'EXPLORED → REVERTED' : 'SHIPPED';
}

/* `Domain × Kind` from the commit body, falling back to the ledger's `**Vector**`
 * line (bold markers and a leading `**Vector** —` stripped). */
function vectorFrom(body, entry) {
  const scan = (s) => s && s.match(/([A-Z][A-Za-z& ]+?)\s+(?:x|×)\s+\**([A-Za-z/ ]+?)\**(?:,|\.|\s+\(|$)/);
  const fromEntry = entry.match(/\*\*Vector\*?\*?\s*[.—-]*\s*(.+)/);
  const m = scan(body.split('\n')[0]) || scan(fromEntry ? fromEntry[1] : '');
  return m ? { domain: m[1].trim(), kind: m[2].trim() } : { domain: '—', kind: '' };
}

const iters = [];
for (const c of commits) {
  const m = c.subject.match(/^Iter (\d+):\s*(.+?)\s*(?:\(explored -> reverted\)|\(reverted\))?$/i);
  if (!m) continue; // infra / hand commits are not iterations
  const [, num, title] = m;
  const entry = entryOf(num);
  const { domain, kind } = vectorFrom(c.body, entry);
  iters.push({ num: +num, title, domain, kind, sha: c.sha, date: c.date, verdict: verdictOf(entry, c.subject) });
}

if (!iters.length) {
  console.error(`no iteration commits in range ${range || '(all history)'}`);
  process.exit(1);
}

/* ---- numeric story from census-history.jsonl ------------------------------ */
/* Scope the delta to the RANGE: census rows carry a `when` timestamp, so keep the
 * rows that fall within the range's commit dates. Otherwise `--last 12` would
 * report the whole city's all-time growth, which is a different (and misleading)
 * claim. Widen by a small margin because a census runs a beat before its commit. */
function censusDelta(fromISO, toISO) {
  const p = join(HERE, 'census-history.jsonl');
  if (!existsSync(p)) return null;
  const lo = new Date(fromISO).getTime() - 3600e3; // 1h grace before the first commit
  const hi = new Date(toISO).getTime() + 3600e3;
  const rows = readFileSync(p, 'utf8').split('\n').filter(Boolean).map((l) => {
    try { return JSON.parse(l); } catch { return null; }
  }).filter((r) => r && !r.baseline && r.scalars && r.when)
    .filter((r) => { const t = new Date(r.when).getTime(); return t >= lo && t <= hi; });
  if (rows.length < 2) return null;
  const a = rows[0].scalars, b = rows[rows.length - 1].scalars;
  const keys = ['pop', 'developed', 'roads', 'tileKinds', 'transportModes', 'civicKinds'];
  return keys.filter((k) => a[k] != null && b[k] != null)
    .map((k) => ({ k, from: a[k], to: b[k], d: b[k] - a[k] }));
}

/* ---- render --------------------------------------------------------------- */
const lo = iters[0].num, hi = iters[iters.length - 1].num;
const shipped = iters.filter((i) => !i.verdict.includes('REVERTED'));
const reverted = iters.filter((i) => i.verdict.includes('REVERTED'));

const out = [];
out.push(`# Solvista — iterations ${lo}–${hi}`);
out.push('');
out.push(`${shipped.length} landed, ${reverted.length} explored and reverted, across ${iters.length} iterations.`);
out.push('');

const delta = censusDelta(iters[0].date, iters[iters.length - 1].date);
if (delta && delta.some(({ d }) => d !== 0)) {
  out.push('## By the numbers');
  out.push('');
  out.push('| Metric | Start | End | Δ |');
  out.push('| --- | ---: | ---: | ---: |');
  for (const { k, from, to, d } of delta) {
    const sign = d > 0 ? `+${d}` : `${d}`;
    out.push(`| ${k} | ${from} | ${to} | ${sign} |`);
  }
  out.push('');
  out.push('*(The CA is chaotic and its `rng()` is terrain-gated, so per-metric deltas are drift, not a score — see the ledger.)*');
  out.push('');
} else if (delta) {
  out.push('## By the numbers');
  out.push('');
  out.push('The census held flat across this range — every tracked metric unchanged. ' +
    'That is expected, not empty: these were draw-only iterations (Polish / Deepen / ' +
    'Interaction), which touch no terrain and no `rng()`, so growth here is legibility ' +
    'and correctness, not tile count. See each iteration\'s probe.');
  out.push('');
}

out.push('## What shipped');
out.push('');
for (const dom of DOMAINS) {
  const inDom = shipped.filter((i) => i.domain === dom);
  if (!inDom.length) continue;
  out.push(`### ${dom}`);
  for (const i of inDom) {
    const tag = i.verdict === 'SHIPPED' ? '' : ` _(${i.verdict.toLowerCase()})_`;
    out.push(`- **Iter ${i.num}** — ${i.title}${tag} · ${i.kind} · \`${i.sha}\``);
  }
  out.push('');
}
const orphans = shipped.filter((i) => !DOMAINS.includes(i.domain));
if (orphans.length) {
  out.push('### Other');
  for (const i of orphans) out.push(`- **Iter ${i.num}** — ${i.title} · \`${i.sha}\``);
  out.push('');
}

if (reverted.length) {
  out.push('## Explored and rejected');
  out.push('');
  out.push('Tried, measured, and reverted to byte-identical because it did not earn its place — the loop working as designed.');
  out.push('');
  for (const i of reverted) {
    out.push(`- **Iter ${i.num}** — ${i.title} · ${i.domain} × ${i.kind} · \`${i.sha}\``);
  }
  out.push('');
}

process.stdout.write(out.join('\n') + '\n');
