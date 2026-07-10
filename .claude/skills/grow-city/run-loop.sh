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
#   MAX_ITERS  stop after this many COMPLETED iterations (default: unlimited)
#   VERBOSE    0 = iteration boundaries + each iteration's final report
#              1 = live feed, one line per action (default)
#              2 = live feed + the model's full prose
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

VERBOSE="${VERBOSE:-1}"   # 0 = boundaries + final report only, 1 = live action feed, 2 = full prose
RATE_FILE="${TMPDIR:-/tmp}/solvista-growcity-rate.json"

mkdir -p "$(dirname "$LOG")"
log() { printf '%s  %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*" | tee -a "$LOG"; }

LOCK_DIR_EARLY="${TMPDIR:-/tmp}/solvista-growcity-$(echo "$REPO" | cksum | cut -d' ' -f1).lock"

# ---- --status: how is the loop doing? ---------------------------------------
# Checking on an overnight run should not mean reading a 40MB log.
if [ "${1:-}" = "--status" ]; then
  running=0
  if [ -f "$LOCK_DIR_EARLY/pid" ] && kill -0 "$(cat "$LOCK_DIR_EARLY/pid")" 2>/dev/null; then
    running=1
    echo "grow-city: RUNNING (pid $(cat "$LOCK_DIR_EARLY/pid"))"
  else
    echo "grow-city: stopped"
  fi
  echo "  repo: $(git -C "$REPO" rev-parse --short HEAD) $(git -C "$REPO" log -1 --format=%s | cut -c1-48)"
  [ -n "$(git -C "$REPO" status --porcelain)" ] && echo "  ⚠ main is DIRTY — the runner will refuse to start"
  # A dirty worktree means opposite things depending on whether a runner is live.
  # This used to cry "died mid-flight" on EVERY healthy in-progress iteration —
  # which is exactly how a real mid-flight death gets ignored.
  if [ -n "$(git -C "$REPO/../solvista-grow" status --porcelain 2>/dev/null | grep -v 'census-history\.jsonl$')" ]; then
    if [ "$running" = "1" ]; then
      echo "  · worktree has uncommitted work — an iteration is in flight (expected)"
    else
      echo "  ⚠ worktree is DIRTY and no runner is live — an iteration died mid-flight."
      echo "    The commit is the LAST thing an iteration does, so this may be finished,"
      echo "    gate-passing work. Re-run census.mjs; don't reflexively discard it."
    fi
  fi
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
  grep -E '^## (Iteration [0-9]+|U[0-9]+)' "$HERE/GROWTH.md" 2>/dev/null | tail -3 | sed 's/^## /    /' | cut -c1-72
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
# census-history.jsonl is tracked and append-only: *any* census run adds a line,
# including a diagnostic one a human does to inspect this very situation. So it is
# not evidence of a dead iteration — ignore it here. A real mid-flight death also
# leaves solvista.html and/or GROWTH.md modified, which this still catches.
WT="$REPO/../solvista-grow"
wt_dirty() { git -C "$WT" status --porcelain 2>/dev/null | grep -v 'census-history\.jsonl$'; }
if [ -d "$WT" ] && [ -n "$(wt_dirty)" ]; then
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
tries=0      # attempts at the CURRENT iteration; resets when one lands
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
  tries=$((tries + 1))
  started=$(date +%s)
  # "(retry N)" only when this same iteration is being re-attempted — the old
  # global counter made a healthy iteration 2 look like a retry.
  log "--- iteration $((done_ok + 1)) starting$([ "$tries" -gt 1 ] && echo " (retry $tries)") ---"

  # A fresh process, an empty context. Everything it needs to know is on disk.
  # stream-json + fmt-stream.mjs turns 40 minutes of silence into a live feed.
  # raw: keeps the untouched stream so we can grep it and debug after the fact.
  raw="$(mktemp)"; : > "$RATE_FILE"
  claude -p "/grow-city" --permission-mode "$PERM" \
         --output-format stream-json --verbose < /dev/null 2>&1 \
    | tee -a "$raw" \
    | VERBOSE="$VERBOSE" node "$HERE/fmt-stream.mjs" --rate-file "$RATE_FILE" \
    | tee -a "$LOG"
  rc=${PIPESTATUS[0]}
  elapsed=$(( $(date +%s) - started ))
  out="$raw"

  # ---- rate limit: not a failure, just a wait ------------------------------
  # A session limit is the expected end of a long unattended run, not a broken
  # city. Retrying on a 60s backoff just burns attempts against a wall that may
  # not fall for half an hour, and (before this) counted each one toward
  # MAX_FAILS until the runner gave up on a perfectly healthy repo.
  # Two ways to know: the structured rate_limit_event that fmt-stream.mjs lifts
  # out of the stream (authoritative — `resetsAt` is a unix timestamp), or the
  # English message as a fallback for older CLIs.
  rl_status=""; rl_resets=""; rl_limited=""
  if [ -s "$RATE_FILE" ]; then
    rl_status="$(node -e 'try{const j=require(process.argv[1]);process.stdout.write(j.status??"")}catch{}' "$RATE_FILE" 2>/dev/null || true)"
    rl_resets="$(node -e 'try{const j=require(process.argv[1]);process.stdout.write(String(j.resetsAt??""))}catch{}' "$RATE_FILE" 2>/dev/null || true)"
    rl_limited="$(node -e 'try{const j=require(process.argv[1]);process.stdout.write(j.limited===true?"1":"")}catch{}' "$RATE_FILE" 2>/dev/null || true)"
  fi
  # `allowed` fires on EVERY run; `allowed_warning` means "approaching a limit,
  # request still served". Neither stopped the work. Testing `!= "allowed"` put a
  # healthy, shipped iteration to sleep for 30m and never counted it (iter 76).
  # Only a status outside the allowed* family is an actual limit.
  limit_line=""
  if [ "$rl_limited" = "1" ]; then
    limit_line="rate_limit_event: status=$rl_status"
  elif [ -n "$rl_status" ]; then
    case "$rl_status" in
      allowed|allowed_*) ;;                        # not limited; trust the event
      *) limit_line="rate_limit_event: status=$rl_status" ;;
    esac
  elif [ "$rc" -ne 0 ]; then
    # No structured event (older CLI): fall back to the English message — but only
    # on a nonzero exit. An iteration that merely *reads* this file, or writes a
    # ledger entry about rate limits, would otherwise match its own transcript.
    limit_line="$(grep -m1 -iE "hit your (session|usage) limit|rate limit exceeded" "$out" || true)"
  fi

  if [ -n "$limit_line" ]; then
    rm -f "$raw"
    limit_line="$(tr -d '\n' <<<"$limit_line" | cut -c1-70)"

    wait_s=""; reset=""
    # Prefer the structured timestamp. Only trust it if it's actually ahead of us.
    if [ -n "$rl_resets" ] && [ "$rl_resets" -gt "$(date +%s)" ] 2>/dev/null; then
      wait_s=$(( rl_resets - $(date +%s) ))
      reset="$(date -r "$rl_resets" '+%-I:%M%p' 2>/dev/null || echo "$rl_resets")"
    else
      # "resets 6:40pm (Australia/Melbourne)" -> seconds until that clock time.
      # grep -oiE, not `sed ...I`: the case-insensitive sed flag is GNU-only.
      reset="$(grep -oiE '[0-9]{1,2}:[0-9]{2} ?[apm]{2}|[0-9]{1,2} ?[apm]{2}' <<<"$(grep -m1 -iE 'resets' "$out" 2>/dev/null || echo)" | head -1)"
      if [ -n "$reset" ]; then
        norm="$(tr -d ' ' <<<"$reset" | tr '[:lower:]' '[:upper:]')"
        [[ "$norm" != *:* ]] && norm="${norm%[AP]M}:00${norm##*[0-9]}"   # "5PM" -> "5:00PM"
        target="$(date -j -f "%I:%M%p" "$norm" "+%s" 2>/dev/null || true)"
        [ -n "$target" ] && wait_s=$(( target - $(date +%s) ))
      fi
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

  if [ "$rc" -eq 0 ]; then
    fails=0
    tries=0
    done_ok=$((done_ok + 1))
    log "--- iteration $done_ok finished ok in ${elapsed}s ---"
    # One digest line per landed iteration, read from the commit + ledger it just
    # wrote (idempotent by sha, so a no-commit iteration appends nothing). Uses the
    # raw stream only for cost, so it must run before "$out" is removed.
    node "$HERE/runlog.mjs" --repo "$REPO" --elapsed "$elapsed" --raw "$out" 2>&1 | tee -a "$LOG" || true
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
    rm -f "$out"
    sleep "$backoff"
    continue
  fi

  rm -f "$out"

  # Event-based: the next iteration starts now. The floor only exists so that an
  # iteration which dies instantly cannot spin the CPU.
  [ "$elapsed" -lt "$SPIN_GUARD" ] && sleep $(( SPIN_GUARD - elapsed ))
done
