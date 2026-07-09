#!/bin/bash
# Headless, event-based runner for the grow-city loop.
#
# Each iteration is a fresh `claude -p` process with an empty context: it reads
# GROWTH.md's header, does one growth vector, logs it, commits, and exits. The
# next iteration starts when the previous one exits — no fixed interval, and no
# transcript accumulating across iterations.
#
#   ./run-loop.sh              # run until stopped
#   MAX_ITERS=5 ./run-loop.sh  # run five iterations then exit
#   touch .claude/skills/grow-city/STOP   # graceful stop after current iteration
#
# Env:
#   PERM       permission mode (default: auto). See the note below.
#   MAX_ITERS  stop after this many iterations (default: unlimited)
#   LOG        log file (default: ~/Library/Logs/solvista-grow-city.log)
#
# Permissions: `auto` will still block on anything the project's settings.json
# does not allow, and a blocked prompt in -p mode reads as a denied tool. If
# iterations stall on permissions, either add the needed Bash patterns to
# .claude/settings.json, or set PERM=bypassPermissions — which turns off every
# permission check for this loop. That is a real decision, not a default: this
# loop runs git commits, git push, and a browser, unattended. Read it twice.

set -uo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO="$(cd "$HERE/../../.." && pwd)"

PERM="${PERM:-auto}"
MAX_ITERS="${MAX_ITERS:-0}"
LOG="${LOG:-$HOME/Library/Logs/solvista-grow-city.log}"

STOP_FILE="$HERE/STOP"
# The lock lives OUTSIDE the repo on purpose: an in-repo lock dir is an untracked
# file, which trips the clean-tree preflight below — the runner would refuse to
# start because of its own lock.
LOCK_DIR="${TMPDIR:-/tmp}/solvista-growcity-$(echo "$REPO" | cksum | cut -d' ' -f1).lock"

SPIN_GUARD="${SPIN_GUARD:-10}"      # floor between iterations, so a fast-crashing claude can't spin
MAX_FAILS="${MAX_FAILS:-5}"         # consecutive nonzero exits before we give up
BACKOFF_BASE="${BACKOFF_BASE:-60}"  # doubles per consecutive failure
BACKOFF_CAP="${BACKOFF_CAP:-900}"

mkdir -p "$(dirname "$LOG")"
log() { printf '%s  %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*" | tee -a "$LOG"; }

# ---- single writer -----------------------------------------------------------
# The grow-city worktree is a single-writer workspace (see SKILL.md). Two runners
# would interleave edits to solvista.html and make every census diff meaningless.
if ! mkdir "$LOCK_DIR" 2>/dev/null; then
  if [ -f "$LOCK_DIR/pid" ] && kill -0 "$(cat "$LOCK_DIR/pid")" 2>/dev/null; then
    log "another runner is live (pid $(cat "$LOCK_DIR/pid")) — refusing to start."
    exit 1
  fi
  log "clearing stale lock from pid $(cat "$LOCK_DIR/pid" 2>/dev/null || echo '?')"
  rm -rf "$LOCK_DIR" && mkdir "$LOCK_DIR" || { log "could not take lock"; exit 1; }
fi
echo $$ > "$LOCK_DIR/pid"

cleanup() { rm -rf "$LOCK_DIR"; log "runner exiting."; }
trap cleanup EXIT
trap 'log "interrupted — stopping after signal."; exit 0' INT TERM

# ---- preflight ---------------------------------------------------------------
cd "$REPO" || exit 1
command -v claude >/dev/null || { log "claude not on PATH"; exit 1; }

if [ -n "$(git status --porcelain)" ]; then
  log "REFUSING: $REPO has uncommitted changes. The loop's --ff-only merge into"
  log "main will refuse against a dirty tree, and those edits may be yours."
  log "Commit or stash them, then start the runner."
  exit 1
fi

rm -f "$STOP_FILE"
log "=== grow-city runner up. repo=$REPO perm=$PERM max_iters=${MAX_ITERS:-unlimited} ==="

# ---- the loop ----------------------------------------------------------------
iter=0
fails=0

while :; do
  if [ -f "$STOP_FILE" ]; then
    log "STOP file present — stopping cleanly."
    rm -f "$STOP_FILE"
    exit 0
  fi
  if [ "$MAX_ITERS" -gt 0 ] && [ "$iter" -ge "$MAX_ITERS" ]; then
    log "reached MAX_ITERS=$MAX_ITERS — stopping."
    exit 0
  fi

  iter=$((iter + 1))
  started=$(date +%s)
  log "--- iteration $iter starting ---"

  # A fresh process, an empty context. Everything it needs to know is on disk.
  claude -p "/grow-city" --permission-mode "$PERM" >>"$LOG" 2>&1
  rc=$?
  elapsed=$(( $(date +%s) - started ))

  if [ "$rc" -eq 0 ]; then
    fails=0
    log "--- iteration $iter finished ok in ${elapsed}s ---"
  else
    fails=$((fails + 1))
    log "--- iteration $iter FAILED (exit $rc) after ${elapsed}s [$fails/$MAX_FAILS] ---"
    if [ "$fails" -ge "$MAX_FAILS" ]; then
      log "$MAX_FAILS consecutive failures — giving up. Check $LOG."
      exit 1
    fi
    backoff=$(( BACKOFF_BASE * (1 << (fails - 1)) ))
    [ "$backoff" -gt "$BACKOFF_CAP" ] && backoff=$BACKOFF_CAP
    log "backing off ${backoff}s before retrying."
    sleep "$backoff"
    continue
  fi

  # Event-based: the next iteration starts now. The floor only exists so that an
  # iteration which dies instantly cannot spin the CPU.
  [ "$elapsed" -lt "$SPIN_GUARD" ] && sleep $(( SPIN_GUARD - elapsed ))
done
