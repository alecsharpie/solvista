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
# Rate limits are the expected end of a long unattended run, not a failure.
LIMIT_FALLBACK="${LIMIT_FALLBACK:-1800}"  # poll interval when the reset time is unusable
LIMIT_RETRY="${LIMIT_RETRY:-120}"         # reset time already passed — try again soon
LIMIT_MAX="${LIMIT_MAX:-21600}"           # never sleep longer than this (6h) on one limit

mkdir -p "$(dirname "$LOG")"
log() { printf '%s  %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*" | tee -a "$LOG"; }

LOCK_DIR_EARLY="${TMPDIR:-/tmp}/solvista-growcity-$(echo "$REPO" | cksum | cut -d' ' -f1).lock"

# ---- --status: how is the loop doing? ---------------------------------------
# Checking on an overnight run should not mean reading a 40MB log.
if [ "${1:-}" = "--status" ]; then
  if [ -f "$LOCK_DIR_EARLY/pid" ] && kill -0 "$(cat "$LOCK_DIR_EARLY/pid")" 2>/dev/null; then
    echo "grow-city: RUNNING (pid $(cat "$LOCK_DIR_EARLY/pid"))"
  else
    echo "grow-city: stopped"
  fi
  echo "  repo: $(git -C "$REPO" rev-parse --short HEAD) $(git -C "$REPO" log -1 --format=%s | cut -c1-48)"
  [ -n "$(git -C "$REPO" status --porcelain)" ] && echo "  ⚠ main is DIRTY — the runner will refuse to start"
  [ -n "$(git -C "$REPO/../solvista-grow" status --porcelain 2>/dev/null)" ] &&
    echo "  ⚠ worktree is DIRTY — an iteration died mid-flight; inspect before restarting"
  echo
  echo "  last log:  $(grep -E 'iteration [0-9]+ (starting|finished|FAILED)|session limit|giving up|runner exiting' "$LOG" 2>/dev/null | tail -1 | sed 's/^[0-9-]* //')"
  if [ -f "$HERE/census-history.jsonl" ]; then
    tail -1 "$HERE/census-history.jsonl" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{const j=JSON.parse(s),c=j.scalars||{};
      console.log("  last census: "+j.when.slice(0,16).replace("T"," ")+"  pageerrors="+j.pageerrors+"  pop="+c.pop+" roads="+c.roads+" developed="+c.developed);}catch(e){}});' 2>/dev/null
  fi
  [ -f "$HERE/../polish-tile/perf-latest.json" ] && node -e 'const j=require(process.argv[1]);
    console.log("  last perf:   "+j.when.slice(0,10)+"  day="+j.scenes.day.mean+"ms  night="+j.scenes.night.mean+"ms");' \
    "$HERE/../polish-tile/perf-latest.json" 2>/dev/null
  echo
  echo "  recent iterations:"
  grep '^## Iteration' "$HERE/GROWTH.md" 2>/dev/null | tail -3 | sed 's/^## /    /' | cut -c1-72
  grep -o 'Pending: iters[^*]*' "$HERE/GROWTH.md" 2>/dev/null | head -1 | sed 's/^/    redeploy debt: /'
  exit 0
fi

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

# An iteration killed mid-flight (rate limit, sleep, ^C) leaves its work in the
# worktree, uncommitted. That is often a COMPLETE, gate-passed iteration that
# only missed its `git commit` — do not silently start a new one on top of it
# and do not discard it. Surface it and let a human look.
WT="$REPO/../solvista-grow"
if [ -d "$WT" ] && [ -n "$(git -C "$WT" status --porcelain 2>/dev/null)" ]; then
  log "REFUSING: the grow-city worktree has uncommitted changes — an earlier"
  log "iteration probably died mid-flight. It may be finished, verified work that"
  log "only missed its commit (check for a new '## Iteration' entry in GROWTH.md,"
  log "then re-run census.mjs). Inspect, then commit or discard:"
  log "    git -C $WT status"
  log "    git -C $WT diff"
  exit 1
fi

rm -f "$STOP_FILE"
log "=== grow-city runner up. repo=$REPO perm=$PERM max_iters=${MAX_ITERS:-unlimited} ==="

# ---- the loop ----------------------------------------------------------------
done_ok=0    # iterations that actually COMPLETED — what MAX_ITERS counts
attempt=0    # invocations, including failures and rate-limit retries
fails=0

while :; do
  if [ -f "$STOP_FILE" ]; then
    log "STOP file present — stopping cleanly after $done_ok iteration(s)."
    rm -f "$STOP_FILE"
    exit 0
  fi
  # Count COMPLETED iterations, not attempts: `MAX_ITERS=3` should mean "three
  # iterations of city growth", not "three tries, two of which hit a rate limit
  # and grew nothing." (The MAX_FAILS counter is what stops a doomed run.)
  if [ "$MAX_ITERS" -gt 0 ] && [ "$done_ok" -ge "$MAX_ITERS" ]; then
    log "reached MAX_ITERS=$MAX_ITERS — stopping."
    exit 0
  fi

  attempt=$((attempt + 1))
  started=$(date +%s)
  log "--- iteration $((done_ok + 1)) starting (attempt $attempt) ---"

  # A fresh process, an empty context. Everything it needs to know is on disk.
  # tee, not >>: we need to *read* the output to spot a rate limit.
  out="$(mktemp)"
  claude -p "/grow-city" --permission-mode "$PERM" 2>&1 | tee -a "$LOG" > "$out"
  rc=${PIPESTATUS[0]}
  elapsed=$(( $(date +%s) - started ))

  # ---- rate limit: not a failure, just a wait ------------------------------
  # A session limit is the expected end of a long unattended run, not a broken
  # city. Retrying on a 60s backoff just burns attempts against a wall that may
  # not fall for half an hour, and (before this) counted each one toward
  # MAX_FAILS until the runner gave up on a perfectly healthy repo.
  if limit_line="$(grep -m1 -iE "hit your (session|usage) limit|rate limit|resets? [0-9]" "$out")"; then
    rm -f "$out"
    limit_line="$(tr -d '\n' <<<"$limit_line" | cut -c1-70)"

    # "resets 6:40pm (Australia/Melbourne)" -> seconds until that clock time.
    # grep -oiE, not `sed ...I`: the case-insensitive sed flag is GNU-only.
    reset="$(grep -oiE '[0-9]{1,2}:[0-9]{2} ?[apm]{2}|[0-9]{1,2} ?[apm]{2}' <<<"$limit_line" | head -1)"
    wait_s=""
    if [ -n "$reset" ]; then
      norm="$(tr -d ' ' <<<"$reset" | tr '[:lower:]' '[:upper:]')"
      [[ "$norm" != *:* ]] && norm="${norm%[AP]M}:00${norm##*[0-9]}"   # "5PM" -> "5:00PM"
      target="$(date -j -f "%I:%M%p" "$norm" "+%s" 2>/dev/null || true)"
      [ -n "$target" ] && wait_s=$(( target - $(date +%s) ))
    fi

    # Every branch below must leave a *sane* wait. A reset time that has already
    # passed (clock skew, a lingering message) used to wrap to +86400 and sleep
    # the loop for 23.9 hours — alive, and growing nothing all night.
    if [ -z "$wait_s" ]; then
      wait_s=$LIMIT_FALLBACK                       # unparseable: poll
      why="couldn't parse a reset time"
    elif [ "$wait_s" -lt 0 ]; then
      wait_s=$LIMIT_RETRY                          # already passed: try again shortly
      why="reset time already passed"
    elif [ "$wait_s" -gt "$LIMIT_MAX" ]; then
      wait_s=$LIMIT_FALLBACK                       # implausibly far: poll instead
      why="reset >${LIMIT_MAX}s away, polling instead"
    else
      wait_s=$(( wait_s + 60 ))                    # cushion past the boundary
      why="reset at $reset"
    fi

    log "--- iteration $((done_ok + 1)) hit a session limit after ${elapsed}s ---"
    log "    \"$limit_line\""
    log "    sleeping $(( wait_s / 60 ))m ($why). Not a failure; nothing is retried but the wait."
    sleep "$wait_s"
    continue    # same iteration number — a limit grew no city
  fi
  rm -f "$out"

  if [ "$rc" -eq 0 ]; then
    fails=0
    done_ok=$((done_ok + 1))
    log "--- iteration $done_ok finished ok in ${elapsed}s ---"
  else
    fails=$((fails + 1))
    log "--- iteration $((done_ok + 1)) FAILED (exit $rc) after ${elapsed}s [$fails/$MAX_FAILS] ---"
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
