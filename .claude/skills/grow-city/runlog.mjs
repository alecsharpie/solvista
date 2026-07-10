#!/usr/bin/env node
/* runlog — append ONE line per landed iteration to RUNLOG.md.
 *
 *   node runlog.mjs --repo <path> --elapsed <seconds> [--raw <stream.jsonl>]
 *
 * The runner prints each iteration's full final report and then it scrolls away
 * forever, so the only record of a 23-hour run was a 573MB terminal capture. This
 * is the digest, accumulated as it goes:
 *
 *   ✔ Iter 121  Transport × Deepen        SHIPPED   40m06s  $2.41  eed22e4
 *   ↩ Iter 114  Civic & culture × Polish  REVERTED  31m02s  $2.05  efc62cd
 *
 * Everything here is READ from what the iteration already wrote -- the commit
 * subject, the `Domain x Kind` that opens its body, and the `**Verdict**` in its
 * ledger entry. Nothing is invented, and an iteration that recorded nothing gets
 * no line rather than a guessed one.
 *
 * Idempotent by commit sha: an iteration that ended without committing (a crash, a
 * revert-to-pristine that chose not to log) moves no HEAD and appends no line, so
 * the runner can call this unconditionally.
 */
import { readFileSync, existsSync, appendFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const arg = (name, dflt) => {
  const i = process.argv.indexOf(name);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : dflt;
};

const REPO = arg('--repo', join(HERE, '../../..'));
const ELAPSED = parseInt(arg('--elapsed', '0'), 10) || 0;
const RAW = arg('--raw', null);
const RUNLOG = join(HERE, 'RUNLOG.md');

const git = (...a) => execFileSync('git', ['-C', REPO, ...a], { encoding: 'utf8' }).trim();

const sha = git('rev-parse', '--short', 'HEAD');

/* Already recorded? Then HEAD did not move and this iteration landed nothing. */
if (existsSync(RUNLOG) && readFileSync(RUNLOG, 'utf8').includes(sha)) {
  console.log(`runlog: ${sha} already recorded — nothing to append.`);
  process.exit(0);
}

const subject = git('log', '-1', '--format=%s');
const body = git('log', '-1', '--format=%b');

/* `Iter 121: the cable cars agree on a speed` — anything else is not an iteration
 * (an infra commit, a hand edit), and gets no line. */
const m = subject.match(/^Iter (\d+):\s*(.+?)\s*(?:\(explored -> reverted\))?$/i);
if (!m) {
  console.log(`runlog: HEAD "${subject.slice(0, 40)}…" is not an iteration — skipped.`);
  process.exit(0);
}
const [, num, title] = m;

/* The ledger entry is the authority on both the verdict and (as a fallback) the
 * vector — an iteration's commit body often opens with prose, not `Domain × Kind`
 * (iter 123), while its ledger entry always carries a `**Vector**` line. */
function entryOf(n) {
  for (const f of ['GROWTH.md', 'GROWTH-archive.md']) {
    const p = join(HERE, f);
    if (!existsSync(p)) continue;
    const txt = readFileSync(p, 'utf8');
    const start = txt.search(new RegExp(`^## Iteration ${n}\\b`, 'm'));
    if (start === -1) continue;
    const next = txt.slice(start + 1).search(/^## (?:Iteration \d+|U\d+)\b/m);
    return txt.slice(start, next === -1 ? undefined : start + 1 + next);
  }
  return '';
}
const entry = entryOf(num);

const vmatch = (s) => s && s.match(/([A-Z][A-Za-z& ]+?)\s+(?:x|×)\s+\**([A-Za-z/ ]+?)\**(?:,|\.|\s+\(|$)/);
const vEntry = entry.match(/\*\*Vector\*?\*?\s*[.—-]*\s*(.+)/);
const vm = vmatch(body.split('\n')[0]) || vmatch(vEntry ? vEntry[1] : '');
const vector = vm ? `${vm[1].trim()} × ${vm[2].trim()}` : '—';

const vd = entry.match(/\*\*Verdict[^*]*?(SHIPPED|DEEPENED|FIXED|EXPLORED\s*(?:→|->)\s*REVERTED|REVERTED)/i);
const verdict = vd
  ? vd[1].toUpperCase().replace(/\s*(?:→|->)\s*/, ' → ')
  : (/explored\s*->\s*reverted/i.test(subject) ? 'EXPLORED → REVERTED' : 'SHIPPED');
const reverted = verdict.includes('REVERTED');

/* Cost, from the stream's terminal result event. Absent is fine — print nothing. */
let cost = '';
if (RAW && existsSync(RAW)) {
  try {
    for (const line of readFileSync(RAW, 'utf8').split('\n')) {
      if (!line.includes('total_cost_usd')) continue;
      const c = JSON.parse(line).total_cost_usd;
      if (typeof c === 'number') cost = `$${c.toFixed(2)}`;
    }
  } catch {
    /* a truncated stream is not worth failing an otherwise-good iteration over */
  }
}

const dur = ELAPSED ? `${Math.floor(ELAPSED / 60)}m${String(ELAPSED % 60).padStart(2, '0')}s` : '';
const pad = (s, n) => String(s).padEnd(n);

if (!existsSync(RUNLOG)) {
  writeFileSync(
    RUNLOG,
    '# Solvista run log\n\n' +
      'One line per landed iteration, appended by `runlog.mjs` as the runner goes.\n' +
      'The verdict is read from the ledger, not guessed. For prose, see `GROWTH.md`;\n' +
      'for a grouped summary of any range, `node notes.mjs <since>..<until>`.\n\n' +
      '```\n```\n'
  );
}

const line = `${reverted ? '↩' : '✔'} ${pad(`Iter ${num}`, 9)} ${pad(vector, 26)} ${pad(verdict, 19)} ${pad(dur, 8)} ${pad(cost, 6)} ${sha}\n`;

/* Insert inside the fenced block so the file renders as a table, not a wall. */
const txt = readFileSync(RUNLOG, 'utf8');
const close = txt.lastIndexOf('```');
writeFileSync(RUNLOG, txt.slice(0, close) + line + txt.slice(close));

process.stdout.write(`runlog: ${line}`);
