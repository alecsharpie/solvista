#!/usr/bin/env node
/* Render `claude --output-format stream-json` into a clean, human-scannable feed.
 *
 *   claude -p ... --output-format stream-json --verbose | node fmt-stream.mjs [--rate-file F]
 *
 * Without this, an iteration is 40 minutes of silence followed by one wall of
 * prose. With it you get one line per action, so you can see the loop thinking.
 *
 * It also lifts the structured `rate_limit_event` out of the stream and writes
 * `resetsAt` (a unix timestamp) to --rate-file, so the runner can sleep exactly
 * as long as it needs to instead of parsing "resets 6:40pm" out of English.
 *
 * VERBOSE=1 (default) tool calls + a one-line gloss of what the model says.
 * VERBOSE=2            full assistant prose.
 * Non-JSON lines (stderr, warnings, the rate-limit message) pass straight through.
 */
import { writeFileSync } from 'node:fs';
import { basename } from 'node:path';
import { createInterface } from 'node:readline';

const V = parseInt(process.env.VERBOSE ?? '1', 10);
const rateIdx = process.argv.indexOf('--rate-file');
const RATE_FILE = rateIdx !== -1 ? process.argv[rateIdx + 1] : null;
const HEARTBEAT_MS = 90_000;

const started = Date.now();
let lastEvent = Date.now();
let tools = 0;
let quiet = false;

const clock = () => new Date().toTimeString().slice(0, 8);
const dur = (ms) => {
  const s = Math.round(ms / 1000);
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m${String(s % 60).padStart(2, '0')}s`;
};
const trunc = (s, n) => {
  s = String(s ?? '').replace(/\s+/g, ' ').trim();
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
};
const emit = (mark, label, detail = '') => {
  lastEvent = Date.now();
  const pad = label.padEnd(7);
  process.stdout.write(`  ${clock()}  ${mark} ${pad} ${detail}\n`);
};

/* One line per tool call, shaped by what that tool actually does. */
function describeTool(name, input = {}) {
  switch (name) {
    case 'Bash': {
      const cmd = trunc(input.command, 68);
      // the loop's own gates are the interesting bash calls — call them out
      if (/census\.mjs --save-baseline/.test(cmd)) return ['⊙', 'baseline', 'pinning the seed×era matrix'];
      if (/census\.mjs/.test(cmd)) return ['⊙', 'census', 'regression gate'];
      if (/perf\.mjs/.test(cmd)) return ['⊙', 'perf', 'frame-time gate'];
      if (/shoot\.mjs|hovershot|tileshot/.test(cmd)) return ['◫', 'shoot', trunc(cmd, 60)];
      if (/^git commit|git commit/.test(cmd)) return ['✔', 'commit', trunc(cmd.replace(/.*-m\s*/, ''), 58)];
      if (/rotate-ledger/.test(cmd)) return ['⊙', 'rotate', 'trimming GROWTH.md'];
      return ['▸', 'bash', cmd];
    }
    case 'Read': {
      const f = basename(input.file_path ?? '?');
      const span = input.offset ? `:${input.offset}${input.limit ? `+${input.limit}` : ''}` : '';
      return ['▸', 'read', f + span];
    }
    case 'Edit':
    case 'Write':
      return ['✎', name.toLowerCase(), basename(input.file_path ?? '?')];
    case 'Grep':
      return ['▸', 'grep', trunc(input.pattern, 60)];
    case 'Glob':
      return ['▸', 'glob', trunc(input.pattern, 60)];
    case 'Task':
    case 'Agent':
      return ['⇉', 'agent', trunc(input.description ?? input.subagent_type ?? '', 60)];
    case 'TodoWrite':
      return null; // pure bookkeeping, never interesting
    default:
      return ['▸', trunc(name, 7).toLowerCase(), trunc(JSON.stringify(input), 60)];
  }
}

/* A dim gloss of the model's prose: first sentence only, so the feed stays a feed. */
function glossText(text) {
  if (V >= 2) return text.trim();
  const first = text.trim().split(/(?<=[.!?])\s/)[0] ?? '';
  return first.length > 10 ? trunc(first, 76) : null;
}

const beat = setInterval(() => {
  if (quiet) return;
  const idle = Date.now() - lastEvent;
  if (idle > HEARTBEAT_MS) {
    process.stdout.write(`  ${clock()}  ⋯ still working (${dur(Date.now() - started)} elapsed, ${tools} actions)\n`);
    lastEvent = Date.now();
  }
}, 30_000);
beat.unref?.();

const rl = createInterface({ input: process.stdin, crlfDelay: Infinity });

for await (const line of rl) {
  if (!line.trim()) continue;
  let ev;
  try {
    ev = JSON.parse(line);
  } catch {
    // stderr, warnings, and the rate-limit message itself: pass through verbatim
    process.stdout.write(line + '\n');
    lastEvent = Date.now();
    continue;
  }

  switch (ev.type) {
    case 'rate_limit_event': {
      const info = ev.rate_limit_info ?? {};
      if (RATE_FILE && info.resetsAt) {
        try {
          writeFileSync(RATE_FILE, JSON.stringify({ status: info.status, resetsAt: info.resetsAt, type: info.rateLimitType }));
        } catch { /* the runner falls back to its own parsing */ }
      }
      if (info.status && info.status !== 'allowed') {
        emit('⚠', 'limit', `${info.rateLimitType ?? 'rate'} limit ${info.status}; resets ${new Date(info.resetsAt * 1000).toTimeString().slice(0, 5)}`);
      }
      break;
    }

    case 'assistant':
      for (const c of ev.message?.content ?? []) {
        if (c.type === 'tool_use') {
          tools++;
          const d = describeTool(c.name, c.input);
          if (d) emit(d[0], d[1], d[2]);
        } else if (c.type === 'text' && V >= 1) {
          const g = glossText(c.text);
          if (g) emit('·', '', g);
        }
      }
      break;

    case 'result': {
      quiet = true;
      clearInterval(beat);
      const cost = ev.total_cost_usd != null ? `$${ev.total_cost_usd.toFixed(2)}` : '';
      const acts = `${tools} action${tools === 1 ? '' : 's'}`;
      const bits = [dur(ev.duration_ms ?? Date.now() - started), acts, `${ev.num_turns ?? '?'} turns`, cost].filter(Boolean);
      emit(ev.is_error ? '✗' : '✔', ev.is_error ? 'error' : 'done', bits.join('  ·  '));
      // The final message is the iteration's own report — the one bit of prose
      // worth keeping in full. Everything above it was a live progress feed.
      if (ev.result) {
        process.stdout.write('\n');
        for (const l of String(ev.result).trim().split('\n')) process.stdout.write(`      ${l}\n`);
        process.stdout.write('\n');
      }
      break;
    }

    // 'system' (init), 'user' (tool results) — too noisy to render
    default:
      break;
  }
}
clearInterval(beat);
