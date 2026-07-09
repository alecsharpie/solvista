#!/usr/bin/env node
/* Rotate GROWTH.md: keep the maintained header + the last N iteration entries,
 * move everything older to GROWTH-archive.md.
 *
 *   node rotate-ledger.mjs            # rotate, keeping the last 10 entries
 *   node rotate-ledger.mjs --keep 20  # keep more
 *   node rotate-ledger.mjs --dry-run  # report what would move, touch nothing
 *
 * Idempotent: a no-op once the ledger is already at or under --keep entries, so
 * step 5 can call it every iteration unconditionally.
 *
 * The ledger is the loop's only memory across sessions, so this refuses to run
 * unless every entry it read is accounted for exactly once in what it writes.
 * The archive is written before the truncated ledger: a crash in between leaves
 * an entry in both files (visible, recoverable) rather than in neither.
 */
import { readFileSync, writeFileSync, existsSync, renameSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const LEDGER = join(HERE, 'GROWTH.md');
const ARCHIVE = join(HERE, 'GROWTH-archive.md');

const argv = process.argv.slice(2);
const dryRun = argv.includes('--dry-run');
const keepArg = argv.indexOf('--keep');
const KEEP = keepArg !== -1 ? parseInt(argv[keepArg + 1], 10) : 10;
if (!Number.isInteger(KEEP) || KEEP < 1) {
  console.error('--keep must be a positive integer');
  process.exit(2);
}

const ENTRY_RE = /^## Iteration /gm;
const MARK_OPEN = '<!-- rotated -->';
const MARK_CLOSE = '<!-- /rotated -->';

/* Split a ledger body into [header, entries[]]. An entry runs from its
 * `## Iteration ...` heading to the start of the next one. */
function parse(text) {
  const starts = [...text.matchAll(ENTRY_RE)].map((m) => m.index);
  if (starts.length === 0) return { header: text, entries: [] };
  const header = text.slice(0, starts[0]);
  const entries = starts.map((s, i) => text.slice(s, starts[i + 1] ?? text.length));
  return { header, entries };
}

/* Strip any pointer block a previous rotation left, so we can regenerate it. */
function stripPointer(header) {
  const a = header.indexOf(MARK_OPEN);
  const b = header.indexOf(MARK_CLOSE);
  if (a === -1 || b === -1) return header;
  return (header.slice(0, a) + header.slice(b + MARK_CLOSE.length)).replace(/\n{3,}/g, '\n\n');
}

function pointer(archivedCount, firstKept) {
  const label = firstKept.match(/^## (Iteration \d+)/)?.[1] ?? 'the entries below';
  return `${MARK_OPEN}\n\n> **Archive:** the ${archivedCount} iterations before ${label} live in\n> \`GROWTH-archive.md\`. Nothing reads that file by default — the header grid above\n> is the maintained summary. Rotated by \`rotate-ledger.mjs\`.\n\n${MARK_CLOSE}\n\n`;
}

function atomicWrite(path, text) {
  const tmp = `${path}.tmp-${process.pid}`;
  writeFileSync(tmp, text);
  renameSync(tmp, path);
}

if (!existsSync(LEDGER)) {
  console.error(`no ledger at ${LEDGER}`);
  process.exit(2);
}

const original = readFileSync(LEDGER, 'utf8');
const { header, entries } = parse(original);

if (entries.length <= KEEP) {
  console.log(`ledger has ${entries.length} entries (keep ${KEEP}) — nothing to rotate.`);
  process.exit(0);
}

const toArchive = entries.slice(0, entries.length - KEEP);
const toKeep = entries.slice(entries.length - KEEP);

const archiveHeader =
  '# Solvista growth ledger — archive\n\n' +
  'Older `grow-city` iterations, rotated out of `GROWTH.md` by `rotate-ledger.mjs`.\n' +
  'Append-only, oldest first. Nothing in the loop reads this by default; it exists so\n' +
  'the full exploration record (including dead ends) survives. Read it only when\n' +
  'digging into why an old vector was tried or reverted.\n\n';

const priorArchive = existsSync(ARCHIVE) ? readFileSync(ARCHIVE, 'utf8') : archiveHeader;
const priorArchiveEntries = parse(priorArchive).entries.length;

const nextArchive = priorArchive.replace(/\s*$/, '\n\n') + toArchive.join('');
const nextLedger = stripPointer(header).replace(/\s*$/, '\n\n') + pointer(priorArchiveEntries + toArchive.length, toKeep[0]) + toKeep.join('');

/* Invariant: nothing is lost and nothing is duplicated. */
const before = priorArchiveEntries + entries.length;
const after = parse(nextArchive).entries.length + parse(nextLedger).entries.length;
if (after !== before) {
  console.error(`REFUSING: entry count would change ${before} -> ${after}. Ledger untouched.`);
  process.exit(1);
}

const moved = `${toArchive.length} entries (${toArchive[0].match(/^## (Iteration \d+)/)?.[1]} .. ${toArchive.at(-1).match(/^## (Iteration \d+)/)?.[1]})`;

if (dryRun) {
  console.log(`[dry-run] would archive ${moved}`);
  console.log(`[dry-run] GROWTH.md ${original.length} -> ${nextLedger.length} bytes, keeping ${toKeep.length} entries`);
  process.exit(0);
}

atomicWrite(ARCHIVE, nextArchive); // archive first: a crash duplicates, never loses
atomicWrite(LEDGER, nextLedger);

console.log(`archived ${moved} -> GROWTH-archive.md`);
console.log(`GROWTH.md ${original.length} -> ${nextLedger.length} bytes (${toKeep.length} entries kept)`);
