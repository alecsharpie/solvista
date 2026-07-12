---
name: grow-city
description: Grow the Solvista city diorama (solvista.html) by one increment — make it bigger / more varied / more connected / more alive — then verify with screenshots + a numeric census that it grew and nothing regressed. One invocation = one iteration; `run-loop.sh` runs it repeatedly to compound improvements. Use when asked to "add more city", "grow the city", "keep improving the diorama".
---

# grow-city

An **autonomous improvement loop** for `solvista.html` (the "Solvista" procedural
cellular-automata hex-city artifact), built to run **unattended for long stretches**
(all night, under `run-loop.sh`). Each invocation performs **one** iteration and leaves
the repo verified and logged, so it can be run again and again to compound the city
over time.

The whole point is that "did it actually grow, and did I break anything?" is a
**measured** question, not a vibe. Every iteration ends with a census diff and a
screenshot pass.

**An iteration does not have to *add* something.** A valid outcome is: ship a
feature, deepen an existing system, *fix* a problem that earlier iterations
compounded, or **explore an idea and revert it** because it didn't earn its place.
Exploring and rejecting is a real result — log it (step 5) so the run remembers.
The gates below are what make hours of this safe without a human watching.

## Worktree — where the loop runs

This loop edits, screenshots, and frequently **reverts** — a lot of churn. To keep
your **main checkout clean and usable while the loop runs unattended**, all of that
happens in a dedicated git worktree on a `grow-city` branch. `main` only ever moves
by a clean **fast-forward of a finished, verified iteration** (step 5), so your main
checkout never carries the loop's half-done edits, reverted experiments, or
screenshot scratch.

**Once per session, before you start iterating**, make sure the worktree exists and
is current, then `cd` into it — **every command in the loop below runs from the
worktree root.** All the `.claude/skills/...`, `GROWTH.md`, and `solvista.html`
paths are repo-relative and resolve inside the worktree (it's a full checkout;
tracked files — `census.mjs`, `census-history.jsonl`, `census-baseline.json`,
`GROWTH.md`, `solvista.html` — are all present; `census-latest.json` and `shots/`
are gitignored and just regenerate there):

```bash
# from the main checkout (/Users/alec/me/solvista):
WT=../solvista-grow
git worktree list | grep -q solvista-grow \
  || git worktree add "$WT" grow-city 2>/dev/null \
  || git worktree add -b grow-city "$WT"    # first ever run: branch grow-city off main
git -C "$WT" merge --ff-only main           # pick up anything that landed on main
cd "$WT"                                     # run the whole loop from here
```

The worktree is a **single-writer** workspace — one loop at a time on the `grow-city`
branch. (Two concurrent loops would need two worktrees on two branches; don't point
both at this one.)

## The loop (one iteration)

1. **Orient.** Read the **State of the city** header at the top of `GROWTH.md`
   (the domain × kind grid + saturation notes) plus the **last ~5 entries** — you
   don't need to re-read the whole archive every iteration; the header exists so
   rotation and saturation are legible at a glance. `GROWTH.md` is kept small
   (header + last 10 entries) by `rotate-ledger.mjs`; older entries live in
   `GROWTH-archive.md`, which you should **not** read by default. **Never read
   the archive to "catch up"** — the header is the summary, and the archive is
   ~80k tokens of context you will not get back. Then pick the next
   **domain × kind** (see the menu below): **rotate the domain** so no
   part of the city is neglected, and **vary the kind** so you don't repeat a move
   (don't ship five new tiles — or five diffusion CAs — in a row).
   **Also judge saturation, not just rotation:** if a domain's obvious *additive*
   moves are spent (you're reaching for the *n*th diffusion CA / *n*th marine animal
   / *n*th farm-variant tile), stop adding to it and change the **kind**:
   - **Deepen / interconnect** an existing system rather than adding a new one (the
     river got good precisely by compounding: banks → bridges → marsh → herons →
     kayaks). This is usually the right move once the basics exist.
   - **Polish** — improve what's there, or fix a cumulative problem the holistic
     review turned up. (Deep single-tile redesigns → the `polish-tile` skill.)
   - **Stop.** "One more shallow feature" is not automatically worth it. Ending a
     session (and logging that returns have flattened) is a valid outcome.
2. **Baseline.** Capture the current city as the regression baseline:
   ```bash
   node .claude/skills/grow-city/census.mjs --save-baseline
   ```
   (Only needed once per iteration, before you edit. It pins the seed×era matrix.)
3. **Pick ONE domain × kind** from the menu and implement it — one focused change,
   in the house style (see *Invariants*). Small and shippable beats sweeping and
   broken (but see the counterweight — occasionally take one bigger swing). The
   kind can be additive (new element / CA rule) OR non-additive (**Deepen**,
   **Polish**, **Interaction**) — a change that adds nothing is still a valid
   iteration.
   - **Read the target seam BEFORE designing — the seam, not the file.**
     `solvista.html` is ~4k lines (~55k tokens); reading it whole burns a third
     of a fresh context before you have written a line. `grep -n` the seam
     names from the domain table, then `Read` with `offset`/`limit` around the
     hits. `GROWTH.md` is the loop's memory,
     **not the artifact's inventory** — the artifact predates the ledger, and many
     features (beach towels, bonfires, kites, the pier, string lights…) exist
     without a ledger entry. Grep/read the draw case, `tick()` pass, or entity
     code you're about to extend and confirm your idea doesn't already exist
     (iter 34 nearly shipped beach towels onto a beach that already had them).
     Same discipline for hosts: verify the host tile/entity exists at scale
     (census tile histogram) before wiring to it — plazas were ~0 (iter 30).
4. **Verify — all three gates must pass:**
   - **Census + error gate** (numeric growth, no regressions, no page errors):
     ```bash
     node .claude/skills/grow-city/census.mjs
     ```
     Exit 0 (VERDICT: PASS) = no page errors and no core-aggregate collapse.
     Non-zero = a page threw or a core metric cratered >5% — **fix before
     continuing.** Then read the **tile-histogram diff** to confirm your change
     moved the tile you intended (that's the real growth signal, not the wobble).
     - **The census is a REGRESSION GUARD, not a growth score.** Because the CA is
       chaotic, it can't prove growth — it proves *nothing collapsed*. Growth is
       judged from the tile histogram + the screenshots. So **do not add a bespoke
       census metric for every feature** — that sprawl (this harness grew ~15) is
       you grading your own homework. Rely on the existing tile histogram + entity
       `transport`/`life` counts the `__census()` hook already returns; add a new
       tracked metric only when a feature moves *nothing* the hook already reports
       and you genuinely need a number to point at.
     - **A draw-only iteration makes the census nearly vacuous — expect that, and
       reach for a probe.** Most late-game vectors (Polish, Deepen, Interaction)
       touch no terrain and no `rng()`, so a PASS reads `every metric +0, tile
       histogram empty`. That is the *correct* result and it proves only that the
       page did not throw. It says nothing about whether your change worked.
   - **Probe gate — write the measurement that can FAIL.** When the census is +0
     and the screenshots are a judgement call, the iteration rests on a **probe**:
     a small headless script that measures the one quantity your change was about,
     on ≥2 seeds, with a **control** that must not move. This is the strongest gate
     the loop has, and it is what repeatedly overturned the visual agents.
     ```bash
     node .claude/skills/grow-city/probes/probe-season.mjs   # e.g. per-tile seasonal pixel shift
     ```
     Good probes state a number and a control in one line of output: `corr(luminance,
     depth) = -0.87` (iter 116) · `|dI/dx| +38..45%, day control 0.0%` (118) ·
     `cruise spread 2.83x -> 1.00x` (121) · `PARK 0.0 shift in all four seasons,
     ROAD control ~0` (120, which found 878 frozen hexes three agents had missed).
     - **Probes live in `probes/`, and they are source, not scratch.** Ad-hoc probes
       are born at the repo root, where `.gitignore` ignores them so a killed
       iteration can't dirty the tree. The moment a probe backs a claim in your
       ledger entry, **`git mv` it into `.claude/skills/grow-city/probes/` and commit
       it** — that directory is tracked normally, no `git add -f`. For ~20 iterations
       the ledger cited probes the repo did not contain (iter 101 found this).
     - Resolve the artifact **relative to the probe's own location**
       (`join(HERE, '../../../../solvista.html')`), never an absolute path — two
       probes hardcoded `../solvista-grow/...` and silently measured the worktree
       when run from the main checkout.
     - Freeze the clock before any two-render diff (`playing=false`). Cars, waves and
       clouds move between frames; a diff of *those* is ~14% of the canvas and proves
       nothing (iter 109's same-frame-control law, encoded in `probes/probe-vis.mjs`).
   - **Visual gate** — screenshot the change at a couple of seeds/eras and *look*:
     ```bash
     node ~/.claude/skills/screenshot-verify/shoot.mjs 'solvista.html?seed=42&warp=61&t=0.3' --shots wide --out .claude/skills/grow-city/shots/after
     node ~/.claude/skills/screenshot-verify/shoot.mjs 'solvista.html?seed=7&warp=31&t=0.3'  --shots wide --out .claude/skills/grow-city/shots/after7
     ```
     Someone must **look at** the PNGs and confirm the new thing is visible, sits
     correctly on the hex grid, and the scene still reads as a coherent coastal
     city — no z-order tears, floating tiles, or blown-out color.

     **Delegate that looking to subagents — do not read the PNGs yourself.**
     Images are the single most expensive thing that can enter a context, they are
     worthless on the next iteration, and this loop is built to run for hours. Take
     the shots, then spawn **one `Agent` per seed, in parallel** (a single message
     with one `Agent` call per seed), each told to read only its own PNGs and
     reply with a short text verdict. Their contexts — and the images in them — are
     discarded when they return; only the verdict text reaches you. Give each a
     strict contract:

     > Read `<png paths>`. This is a procedural hex-grid coastal city diorama.
     > The change under test is: `<one sentence>`. Report, in ≤8 lines:
     > (1) is the change visible, and does it sit correctly on the hex grid?
     > (2) any z-order tears, floating tiles, or blown-out color *anywhere* in
     > the frame — not just at the change? (3) does the whole frame still read
     > as a balanced, beautiful coastal city, or has something compounded into
     > clutter/darkness? End with exactly one line: `VISUAL: PASS` or
     > `VISUAL: FAIL — <reason>`.

     Any `VISUAL: FAIL` fails the gate. If a verdict is vague or you have reason
     to doubt it, look at *that one* PNG yourself — the budget exists to be spent
     when it matters, not to be defended.

     **ASK AN AGENT TO LOCATE, NOT TO JUDGE (iter 108's law).** A visual agent asked
     "is downtown brighter?" will confidently say yes about a frame where nothing
     changed. Asked "*where* is downtown, by light alone?" it must actually look, and
     its answer is checkable against ground truth you already hold. Iter 115 asked
     two agents, blind, to point at the CBD; both landed within ~33px of the true
     `CBDX/CBDY`, which is worth more than any number of PASSes. Phrase the question
     so a wrong answer is *visibly* wrong: point at it, count them, name which of
     these two frames is the dry season.

     **Agents fail confidently, not vaguely — so a FAIL is a cue to MEASURE, never
     to redesign on their say-so.** The instruction above ("if a verdict is vague")
     under-describes the real failure. At iter 120 three agents failed the seasonal
     frame: two named the wrong cause and one invented a defect that was not there;
     a twenty-line probe found the actual bug (878 permanently-green hexes) in one
     command. At iter 113 an agent asked point-blank the question designed to prevent
     a specific error made exactly that error. **When agents disagree, or when a FAIL
     names a cause you cannot see in the code, write a probe and let it settle the
     question.** Their verdict is evidence; a number is the verdict.
     - **Zooming in:** `shoot.config.json` has named clip framings — `--shots coast`
       (the beach/ocean band) and `--shots downtown` (the dense core) — so you
       don't hand-compute clip rectangles. For an arbitrary tile/civic, the
       `window.__find('PARK')` / `__find('hospital')` hook returns clip-ready CSS
       screen coords of every instance (see the polish-tile skill's usage).
     - **Also take ONE un-zoomed whole-city shot and look at the WHOLE frame** —
       not just your feature. The census only catches *metric* collapse; it is
       blind to *visual* regressions (a feature that darkens/clutters an unrelated
       area, or a good-in-isolation change that compounds badly with earlier ones).
       Kelp lined the entire coast dark for ~13 iterations because every visual
       check zoomed on the new tile and never re-read the coastline as a whole.
     - *Sparse entities* (few-per-city) and *drift-in entities* (things that spawn
       off-screen and cross over minutes — balloons, the pelican flock): use the
       **URL debug hooks** instead of editing source: `&flood=joggers:30,whales:8`
       overrides `Math.random`-spawned entity counts (nothing to revert, so a
       crashed session can't ship a flood), and `&step=300` advances entity motion
       300 sim-seconds so drift-ins are on-screen and animation phases vary
       (`__warp` alone doesn't run the frame loop). Don't flood `rng()`-spawned
       entities (boats, peds, dogs, shuttles, birds) — that would perturb the
       seeded stream and the shot would lie.
     - *Seasonal* features: `&year=2035.62` pins the calendar (applied after
       `warp`, which advances `year`). Use `.02/.30/.62/.87` for winter / spring /
       the golden dry peak / autumn — `applySeason`'s own keyframes. **Without it
       every shot is January**: `?warp=61` from `year=1974` always lands on ~2035.0,
       which is why nobody noticed for 107 iterations that the farms had no seasons
       (iter 108). **But `?year=` PINS ONCE at load and the live clock then DRIFTS it
       `+dt·s/6` (~0.167 yr/s) during the shot's `playing=true` wait — a ~1 s wait
       drifts ~0.2 yr, a whole season (iter 139: two false-FAIL agent reads, one saw
       the seasons "inverted").** Continuous `applySeason` color tolerates the drift;
       a **discrete-phase** feature (orchard blossom/fruit, vineyard grapes) does not
       — so for those, **freeze the clock in-page before the shot** exactly as a probe
       does: `playing=false; __setYear(y); render()`. `shoot.mjs`'s `?year=` alone is
       not enough for a discrete seasonal draw. *Rare tiles/civics* (one-per-city
       guards, hashCell thresholds) still need a temporary source edit: back up
       first (`/bin/cp`), shoot, **revert**, re-run census. See iters 11/16/19.
   - **Determinism holds** — because seeds are pinned, a metric moving that you
     *didn't* intend to touch is a red flag; investigate before logging.
5. **Log — successes AND failures, equally.** Append to `GROWTH.md`: iteration #,
   the domain × kind, what changed, the census/tile-histogram lines that moved, and
   the verdict. **A reverted attempt is a first-class outcome, not a non-event** —
   log it as carefully as a ship. An iteration can legitimately end SHIPPED,
   DEEPENED, FIXED (undid a compounding problem), or EXPLORED→REVERTED (tried it,
   it didn't earn its place). For a revert, record *what* you tried, *why* it
   failed the bar (too sweeping / weak payoff / bad trade / wrong host tile /
   couldn't be tuned), and what you'd avoid next time. This ledger is the loop's
   only memory across an unattended all-night run: it is what stops iteration N+1
   from re-exploring the same dead end, and it is the record of the *exploration
   itself* — which is a valuable result even when nothing ships. Prefer a short
   structured shape (`**Vector** / **Change** / **Census** / **Visual** /
   **Verdict**`) so the log stays skimmable at 40+ entries. Verdicts are a closed
   vocabulary — `SHIPPED`, `DEEPENED`, `FIXED`, `EXPLORED → REVERTED` — because
   tools read them. **Also update the State of the city header** at the top of
   `GROWTH.md` (add the iteration number to its domain × kind cell; refresh the
   saturation/deploy lines) — that header is what step 1 reads instead of the whole
   archive, so a stale header silently breaks rotation.

   **The header is a FIXED BUDGET (400 lines), not a scratchpad — to add a line,
   cut a line.** This step used to say only "add" and "refresh", never "cut", and
   the predictable happened: by iter 122 the header had reached **1224 lines
   (~27k tokens)**, a third of the archive it exists to spare you, re-read on every
   single iteration, still carrying a sea-fog watch item it noted as *fixed sixty
   iterations earlier*. `rotate-ledger.mjs` now measures it and warns (it will not
   fail your commit). When it warns, **the next iteration's first job is the trim,
   before its vector**: `MOVE` superseded bullets — closed cues, watch items long
   since fixed, findings a later law subsumes — down into `GROWTH-archive.md`.
   **Never delete.** The loop's memory is the one thing it cannot re-derive; the
   entries rotate rather than vanish, and so must the header.

   **Promote a law, don't just log it.** If a finding is *general* — true of the next
   vector, not just this one — it belongs in `SKILL.md`, not only in an entry that
   will rotate into the archive and never be read again. `GROWTH.md` is where you
   record *what happened*; `SKILL.md` is where you record *what to do differently
   next time*. Several hard-won laws (locate-don't-judge; one predicate, one
   definition; probe before you design; the interleaved perf control) sat in ledger
   entries for dozens of iterations, being independently rediscovered, before they
   were written down here. Editing this file is a legitimate use of an iteration.

   Then **rotate the ledger** so it can't grow without bound — this loop is meant
   to run for hundreds of iterations, and step 1 has to stay cheap:
   ```bash
   node .claude/skills/grow-city/rotate-ledger.mjs
   ```
   It keeps the header + the last 10 entries in `GROWTH.md` and moves older ones
   to `GROWTH-archive.md`, preserving every entry byte-for-byte. It is idempotent
   and a no-op below the threshold, so run it unconditionally, *after* appending
   your entry and *before* committing (the rotation lands in the same commit).

   Then **commit the iteration on the `grow-city`
   branch** (source + ledger + archive in one commit, `Iter N: <what>`) and
   **fast-forward `main` to it and push** — `main` is the durable source, and it
   should only ever advance by a clean, verified iteration:
   ```bash
   # from the worktree (../solvista-grow):
   git add -A && git commit -m "Iter N: <what>"
   git -C ../solvista merge --ff-only grow-city && git -C ../solvista push
   ```
   The `--ff-only` is a guard: `grow-city` always descends from `main`, so it must
   fast-forward — if it ever refuses, either someone put a divergent commit on
   `main`, or `main`'s working tree has **uncommitted edits** to a file the merge
   touches (e.g. hand-edits to `solvista.html` in the main checkout). **Stop and
   reconcile rather than force it** — those are the user's changes, not yours. An
   uncommitted iteration is one stale write away from being lost, so don't leave
   the worktree dirty between iterations either.

   `solvista.html` **is** the deliverable — a single self-contained file, served
   straight from the repo by GitHub Pages. There is no separate copy to sync and
   nothing to redeploy: a pushed commit is a shipped city. Keep the file
   standalone (no external assets, no build step) and that stays true.

## Every ~5 iterations: step back (autonomous self-check)

This loop is built to run **unattended for long stretches** — all night, under
`run-loop.sh`, with nobody watching. That is the point of the experiment: find the
guardrails that let an autonomous improvement loop run for hours without drifting.
So the runner must be its **own** reviewer; the fix for self-verification's ceiling
is a *wider* self-check, not a human.

Roughly every 5th iteration (and at end of session), take one **un-zoomed
whole-city shot at 2 seeds and read the WHOLE frame** — not just your latest
feature. The census only catches *metric* collapse; it is blind to *cumulative
visual* drift. Ask: is the city still balanced, readable, and beautiful as a
whole, or has some element compounded into clutter or darkness? (Kelp lined the
entire coast dark for ~13 iterations because every check zoomed on the new tile
and never re-read the coastline.) **If something compounded badly, spend the next
iteration FIXING it instead of adding more.** This holistic pass is the main
guardrail that lets the loop scale to long unattended runs.

**Shoot the step-back at three lights AND two calendars, and PIN the day frame off
January** — night (iter 115: the night frame failed on a defect every day frame had
passed) and a season (iter 120: a January whole-city read can never see a seasonal
bug). But note the trap iter 125 walked straight into: `?warp=61` lands the calendar
on ~2035.0, i.e. **the default "day" frame is already winter**, so a day frame and a
`year=2035.02` winter frame *collapse to the same instant* and an agent reads "winter
barely differs from summer" when it is really comparing winter to winter. So pin the
**day/night baseline frames to a non-winter `year=` (e.g. `2035.62`, the golden dry
peak)** and use `2035.02` for the explicit seasonal-contrast frame — then the two
baseline frames sit at different calendar points and seasonal drift can show on the
primary reads. (Whether the seasons are alive at all is a probe question, not an
agent one: `probes/probe-season.mjs` prints each keyframe's per-tile pixel distance
from winter with `ROAD` as the zero control — FARM winter→dry-peak ≈ 88 is the tell
that the calendar is working.)

**Also run the frame-time gate** as part of this step-back (borrowed from the
polish-tile skill, which owns the baseline):
```bash
node .claude/skills/polish-tile/perf.mjs
```
The census and screenshots are both blind to *performance* drift, and this loop
only ever adds entities and draw work — dozens of individually-cheap features
can compound into a slow frame exactly the way kelp compounded into a dark
coast. Log the number in the holistic entry; if it regressed, the next iteration
is a perf-fix iteration — but **name the SUSPECT (which draw got slower), not the
FIX (which lever to pull)**. 197 named the lever ("batch the per-tree shadow fills"),
198 built it and measured **+0.3%**, and the real cost model turned out to be
per-ellipse — see the perf-lever law below. Run the passes **sequentially, and never alongside a
subagent that is doing anything** — the gate measures frame time on a loaded
shared machine, so concurrency doesn't just slow it, it *corrupts the reading*.
(The visual gate parallelizes safely because reading a PNG has no timing
semantics. The perf gate does not.)

**Judge against a same-session PRISTINE CONTROL, not `perf-baseline.json`.**
Headless timing on this box swings ±30% with load — iter 40 saw 23ms and 35ms for
the same code minutes apart — so a number recorded on some other day, under some
other load, cannot answer "did *my change* cost anything." A stored baseline also
goes stale silently the moment the plate changes size, and this skill already
documents what that cost: the hexagon plate (`41b0acd`) left it stale and the perf
gate failed on every later iteration until it was re-pinned, because *a failing
gate nobody trusts is worse than no gate*.

So: `/bin/cp` the pristine `HEAD` file beside your patched one and **interleave**
them — `A/B/A/B`, at least two rounds, taking the **minimum per variant**. Both
variants then eat the same machine load, and the comparison is the only thing you
report. This is what iters 115/116/118/119/120/121 actually did, and it is what let
121 claim "free (day +0.03%, night −0.5%)" and 118 own up to "night +5.1%" with a
straight face. Absolute numbers still go in the ledger — they are the long-run
drift record — but the **verdict comes from the interleaved delta.**

**But a step-back must price the ARC, not the LAP — the per-lap gate is STRUCTURALLY
BLIND to compounding (iter 202).** The interleaved A/B above is the right technique
at the wrong *baseline distance* when you use it to grade a step-back. Graded against
the previous step-back, iters 199+200+201 came back **free: day +0.4%, night −1.1%**.
Graded against *older* step-backs, the very same HEAD reads **192 +5.2% · 177 +7.5% ·
162 +8.6% day** (night +2.1/+4.1/+5.7%). Both readings are honest. The loop only ever
*adds* draw work, at roughly **+0.2%/iteration** — and +0.2% is *permanently* beneath
the noise floor of a 3-iteration comparison, so **every lap can be truthfully called
free while forty of them cost 8.6%.** `perfab.mjs` takes `REF` for exactly this: run it
against the last step-back *and* against one 30–40 iterations back.
```bash
REF=<prev-step-back-sha>  node .claude/skills/grow-city/probes/perfab.mjs   # the lap
REF=<40-iters-back-sha>   node .claude/skills/grow-city/probes/perfab.mjs   # the ARC
```
And to turn a drift into a **suspect** without inferring one (198's law), census where
the frame actually goes: **`probes/probe-drawbudget.mjs`** counts **path objects** — the
measured unit of cost — in one render and attributes each to the fn that issued it. It
is calibrated: it scores `shadS` at 2.7% of day path objects, and 197/198 *measured*
removing it at −2.8/−3.1%. Its standing result (iter 202): `drawCell` is **94%** of the
frame; day is **77%** `prismS`+`bandS`+`hexTile` (static terrain re-rasterized every
frame); night adds `winBandR` at **32.6%** — 43,421 path objects from 2,672 `fill()`s,
which is 198's "batching buys nothing" law made visible. **Name the suspect; do not
mandate the fix.**

**Shoot the step-back with `probes/shot-stepback.mjs`, NOT with `shoot.mjs` + `?t=`/
`?year=` — the step-back's own camera was lying for ~60 iterations (iter 202).** 202's
first visual pass drew **two false FAILs from four agents** ("there is no sun"; "winter
is identical to summer"), and *both* were the instrument:
- **`?year=` DRIFTS.** `shoot.mjs` loads with `playing=true` and then *waits*, and the
  frame loop advances `year += dt·speed/6` ≈ **0.167 yr/s**. The summer pin drifts to
  autumn and the **winter pin drifts into spring**, so agents duly report the seasons
  as absent or *inverted*. This is **iter 139's trap** — which the ledger *documented*
  and never fixed at source, so the recipe went on telling every step-back to pin with
  `?year=` anyway. A documented trap you keep walking into is a broken tool, not a law.
- **Guessed light pins land on the wrong phase.** 202 shot "golden hour" at `t=0.80`.
  The artifact's own `phaseWord()` calls `t>=0.80` **`'night'`**, and past `SUNDN=0.78`
  the sun block *"draws nothing whatever"*. **Take the pins from the light curve, never
  from intuition:** day `0.30`, golden `0.68` (`GWARM` peaks 0.786 at 0.70), night `0.92`.

`shot-stepback.mjs` freezes the world in-page (`playing=false` stops *both* clocks),
pins `genWorld`+`__warp`+`__setYear`+`__setTime`, renders once with **no wait**, and
shoots with `page.screenshot()` (DOM-composited, per 200's law). Every frame
**self-reports** its own state (`golden t=0.68 GWARM=0.72 sun=UP phase=golden hour`),
so a mis-pinned frame is caught by the tool instead of by an agent. Re-shot that way,
both seeds PASSed and two blind agents put the sun within **0.003** of the shipped
formula.
```bash
node .claude/skills/grow-city/probes/shot-stepback.mjs 42 .claude/skills/grow-city/shots/sb
```

The whole-city read in this step-back is the same job as the visual gate, so
delegate it the same way: one `Agent` per seed, each reading its own un-zoomed
frame, each returning a text verdict. Ask them the *cumulative* question — "has
anything compounded into clutter or darkness?" — not "is the new feature there."

## Running unattended

**One invocation = one iteration.** Do exactly one vector, then stop and let the
runner re-invoke you — never chain multiple vectors in a single pass.

The loop is driven **headless, event-based**: each iteration is a fresh `claude -p`
process that starts with an empty context, does one vector, and exits. The next
one starts when the previous exits — no fixed interval, no accumulating
transcript.

```bash
cd .claude/skills/grow-city
caffeinate -is ./run-loop.sh      # overnight: keep the Mac awake for the whole run
MAX_ITERS=3 ./run-loop.sh         # a supervised burst (counts COMPLETED iterations)
./run-loop.sh --status            # how's it going? (no 40MB log to read)
touch STOP                        # stop gracefully after the current iteration
VERBOSE=0|1|2 ./run-loop.sh       # quiet | action feed (default) | full prose
```

**The digest accrues as the run goes.** Every landed iteration appends one line to
`RUNLOG.md` (`runlog.mjs`, called by the runner) — verdict read from the ledger,
not guessed — so a finished run leaves a skimmable table instead of only a
scrolled-away feed:
```
✔ Iter 121  Transport × Deepen        SHIPPED   40m06s  $2.41  eed22e4
↩ Iter 114  Civic & culture × Polish  EXPLORED → REVERTED  31m02s  $2.05  efc62cd
```
For a **grouped, shareable summary of any range** — by domain, with the reverts in
their own section — generate it from git + the ledger at any time, retroactively:
```bash
node notes.mjs --last 20          # or  notes.mjs Iter100..HEAD  ·  sha..sha
```

The runner streams each iteration through `fmt-stream.mjs`, which renders claude's
`--output-format stream-json` as one line per action, so a 40-minute iteration is a
live feed rather than 40 minutes of silence:

```
  19:54:01  ⊙ baseline pinning the seed×era matrix
  19:55:12  ▸ read    solvista.html:2450+70
  19:58:40  ✎ edit    solvista.html
  20:01:03  ⊙ census  regression gate
  20:03:11  ⇉ agent   visual gate, seed 42
  20:07:55  ⋯ still working (13m elapsed, 24 actions)
  20:33:16  ✔ done    40m06s  ·  61 actions  ·  38 turns  ·  $2.41
```

Each iteration's **final report is printed in full** — that's the one piece of prose
worth reading.

**`caffeinate` is not optional for an overnight run.** A Mac that sleeps kills
`claude` mid-iteration and leaves the worktree holding a half-finished — or
worse, a *finished but uncommitted* — iteration.

The runner treats a **session rate limit as a wait, not a failure**: the stream
carries a structured `rate_limit_event` whose `resetsAt` is a unix timestamp, so it
sleeps exactly long enough (capped at 6h; short retry if the reset already passed;
30m poll if there's no usable time), and does not count it against `MAX_FAILS`.
Note `rate_limit_event` fires on *every* run with `status: "allowed"` — only a
non-`allowed` status means you're actually limited, and a genuine crash while
`allowed` is still a failure. `MAX_ITERS` counts *completed* iterations, so a night
that spends two hours rate-limited still grows the city the number of times you asked.

This is why the ledger discipline in steps 1 and 5 is load-bearing rather than
tidy: **`GROWTH.md` is not a summary of your memory, it *is* your memory.** A
fresh process knows only what the header grid, the last 10 entries, and
`census-history.jsonl` tell it. Anything you learned and did not write down is
gone the moment you exit.

### If you find the worktree dirty at startup

An iteration killed mid-flight (rate limit, machine sleep, `^C`) leaves its work
uncommitted. The runner refuses to start on top of it, and you must not reflexively
`git checkout -- .` it. **Look at what's there first.** The commit is the *last*
thing an iteration does, so a killed iteration is often a complete, gate-passed
change that only missed `git commit`:

**The gates decide, not the ledger.** Re-run `node .claude/skills/grow-city/census.mjs`
yourself — it needs no API tokens and tells you in ~90s whether the change still
passes. That verdict, plus a look at the diff, is what says whether the work is
sound. A missing `## Iteration N` entry does **not** mean the work is half-written.

- Census passes, and the diff reads as one coherent change? Keep it. Write the
  ledger entry yourself from the diff, then rotate, commit, ff-merge, push —
  exactly as step 5 would have. If you did not author it, say so in the entry
  and in the commit message, and describe it from the diff rather than inventing
  the intent.
- A new `## Iteration N` entry already there? Then it reached step 5 and had
  already written its own verdict — commit as-is.
- Census fails, or the diff is visibly mid-thought (a half-added tile with no
  draw case, a `tick()` pass wired to nothing)? `git stash` it rather than
  deleting, and say so.
- **⚠ A diff that only SUBTRACTS shipped features is a CORRUPTED CONTROL FILE, not
  work to keep — and the census will pass it happily (iter 197).** Every rule above
  assumes the dirty tree *adds* something; this one inverts. 197 started on a tree
  whose `solvista.html` deleted three shipped features (193's ferry lights, 194's
  tree shadows, 196's kelp tide) and added nothing — a stale pristine backup copied
  back over the artifact by a perf/probe run (`perfab.mjs`, `probe-*`, and the
  step-back all `/bin/cp` HEAD aside) that was killed before it restored. A city with
  three draw-only features removed still has flat pop/roads/tiles, so **"census
  passes" is not evidence here** and the keep-it rule would have silently reverted
  three good iterations. **Read the diff's SIGN before its verdict:** if it removes
  code that `git log` shows was deliberately committed, and adds nothing, it is the
  backup, not the work. `git stash` it (never `checkout --`; it is not yours to
  delete) and re-run the census on restored HEAD.

Iteration 72 ("the harbor gets its ships") was killed by a rate limit *between*
its verdict and its commit. It had passed every gate; discarding it would have
silently thrown away a good iteration and left the loop to rediscover it. Iteration
70's chimney smoke was the same shape and was nearly lost the same way.

Those two died *after* step 5, so they had ledger entries to prove themselves by.
The hexagon plate (commit `41b0acd`: `G=48` square → `HEXR=33` masked hexagon,
plural monorail/gondola lines, one-to-three rivers) died *before* step 5 and had
none — yet it was complete, and census passed. An earlier form of this section
told you to discard when there was "no ledger entry, **or** the census fails,"
which would have thrown it away. Hence the rule above: **the ledger entry is
evidence, the census is the verdict.** Expect unlogged work in the tree —
`GROWTH.md` is the loop's memory, not the artifact's inventory (step 1), and that
cuts both ways: features land without entries, and so do whole rewrites.

Running under `/loop` still works, but it re-fires into the *same* session, so
every census table, source read, and screenshot accumulates across iterations —
and with an interval longer than the 5-minute prompt-cache TTL, that whole
transcript is re-read uncached on every firing. Prefer the headless runner for
anything longer than a couple of iterations.

## Growth menu — pick a DOMAIN × a KIND OF CHANGE

Every iteration = one **domain** (what part of the city) crossed with one **kind of
change** (how you touch it). The two axes are what keep growth balanced *and*
non-repetitive: **rotate the domain** so no part of the city is neglected, and
**vary the kind** so you don't ship five new tiles in a row. "Add a nature CA rule"
is then one unambiguous coordinate (Nature × New CA rule) instead of three
overlapping menu items — the old flat list mixed domains, a mechanism, and a scale
lever together, so almost anything could be labeled almost anything.

(Seams below are function/identifier names — stable across the file growing.
`grep` for them; the file is ~4k lines.)

### Domains — WHAT part of the city (rotate across these for balance)

| Domain | Covers | Seams in `solvista.html` |
| --- | --- | --- |
| **Nature** | forests, meadows, blooms, gardens, wildflowers, redwoods, orchards | forest/meadow/bloom/garden/logging passes in `tick()`; `tree`/`palm` draw |
| **Water & coast** | ocean, river, beach, kelp, marsh, surf, tidal life, boardwalk | `shoreAt`/`shoreAtF`, KELP/MARSH passes, `drawBoat`/`drawFerry`/`drawWhale`, BEACH/WATER draw |
| **Urban fabric** | homes/mid-rise/shops/towers, density, skyline, districts, land value | upgrades pass in `tick()`, `drawBuilding`, `updateValue`, `budget`/`POPW`/`DEV`/`G` |
| **Transport** | cars, trams, trucks, ferries, monorail, gondola + the road/rail network | entity arrays, `syncFleet`, `stepVehicle`, `drawVehicle`, `planMonorail`/`planGondola` |
| **Civic & culture** | schools, museums, hospital, university, aquarium, amphitheater, markets, plazas | civics list in `tick()`, `CIVIC` draw cases, market/loft/plaza logic |
| **Sky & atmosphere** | clouds, fog, weather, day↔night, seasons, balloons, birds, lighting, mood | `syncSky`, `applySeason`/season logic, `daylight`/`setLight`, ambience in `render` |
| **People & activity** | crowds, strollers, dogs, kids, festivals, events, night life | ped/dog spawn in `syncFleet`, `stepPed`/`stepDog`, `drawPed` |

### Kinds of change — HOW you touch it (vary these; don't repeat one)

- **New element** — a new tile / entity / structure. Draw code + a `hashCell` or
  `Math.random` spawn/placement. (Prefer draw-only / `Math.random` for a
  guaranteed-flat pop; see the counterweight section.)
- **New CA rule** — a fresh `tick()` pass (the engine's native currency:
  succession, diffusion, spread, excitable-media). `hashCell(x,y,seedNum^SALT)`,
  never `rng()`. Great, but don't let *every* iteration be another diffusion pass.
- **Deepen / interconnect** — enrich an existing system, or make elements *relate*.
  **The highest-yield move, and it was badly under-used** — the river only got
  great by compounding across laps (banks→bridges→marsh→herons→kayaks). Once a
  domain has its basics, reach for this before adding a fifth new thing.
- **Connect** — networks/links across a domain: denser roads, new bridges,
  corridors, a rail line, a coastal promenade tying the shore together.
- **Scale** — bigger/denser: raise `G`, push development, taller/denser downtown.
  An **occasional structural lever, NOT a per-lap move** — reach for it only when
  the city feels cramped, and re-baseline carefully (it regenerates everything, so
  expect pop to jump; that's up, not a collapse). Re-baseline **both** gates: a
  bigger plate means more tiles to draw, so `polish-tile/perf-baseline.json` is
  stale too, and it will read the extra land as a frame-time regression forever.
  The hexagon plate (`41b0acd`) left both stale and the perf gate failed on every
  later iteration until they were re-pinned — a failing gate nobody trusts is
  worse than no gate.
- **Polish** — make something that already exists read better / look beautiful,
  adding nothing. Often the highest value late-game (e.g. the too-dark coast was a
  polish job). Deep single-tile redesigns belong to the separate `polish-tile` skill.
- **Interaction / UX** — how a person reads and pokes the diorama: hover tooltips,
  click affordances, controls, legibility of the whole. (This is where the hover
  tooltip lives — keep `TILELABEL`/`CIVICLABEL`/`TILEDESC` in sync per invariants.)

### Picking
Rotate the **domain** for balance; within it pick the **kind** it needs next —
basics missing → New element / New CA rule; basics present → **Deepen** or
**Polish**. When every domain's obvious *additive* moves are spent, that's the
signal to steer the whole session toward **Deepen / Polish / Interaction**, or to
stop (see saturation, in *Orient*).

## Invariants — do NOT regress these

These are hard-won decisions baked into the artifact. Breaking one is a regression
even if the census looks fine:

- **Procedural, new city every load.** No hand-placed landmarks. Everything is
  seeded from `rng`/`hashCell`; a change must hold up across many seeds, not one.
- **Transport follows the three hex axes only.** E-W rows + the two diagonal
  families (SE: constant `q=x-(y>>1)`; SW: constant `s=x+((y+1)>>1)`). **No
  vertical (x=const) roads/lines** — they wiggle with row parity and read square.
  Any new transport must run along these axes (or sawtooth chains of them).
- **Hex grid projection.** `px()` takes parity from the integer row; use `ctr()`
  for exact centers, `pxc()` for smooth parity-free motion (birds/boats/clouds).
  Draw new prisms via `hexTile`/`prismS`/`bandS`. Render order is plain rows
  top→bottom — respect it or you'll get z-order tears.
- **Chaotic CA — draw new randomness from the spatial hash, not `rng()`.** The
  main `rng()` sequence is shared and its draws are *terrain-gated* (a pass only
  rolls its probability if a cell qualifies). So calling `rng()` in a new pass —
  or even changing terrain that a later pass tests — reshuffles the entire
  downstream stream, and every metric wobbles a few %. This is expected, not a
  bug. Two consequences: (1) draw per-cell chance from `hashCell(x,y,seedNum^SALT)`
  so your rule perturbs nothing it doesn't touch; (2) the census gate can't be an
  exact diff — it hard-fails only on page errors or a >5% *core* collapse
  (`pop`/`developed`/`roads`); judge real growth from the **tile histogram** (did
  your target tile move?) plus the **screenshots**, not from every ±1.
- **Canvas sizing gotcha:** the canvas needs explicit `width/height:100%`;
  `position:fixed;inset:0` alone does NOT stretch it.
- **The file has NO `<meta charset>` — keep JS string literals pure-ASCII (iter 134).** A raw non-ASCII
  byte (e.g. `·` U+00B7) renders as mojibake (`Â·`) when `shoot.mjs` serves the file over http, because
  Chromium falls back to windows-1252; a `file://` load sniffs UTF-8 and HIDES the bug, so tight `file://`
  clips look clean while the http wide shots are corrupt. In JS strings use the escape (`'·'`,
  `'\u{1F311}'`); in HTML use `&middot;`/`&mdash;`/`&times;` — as the rest of the file already does.
- Keep the census hook (`window.__census()`, near `__warp`/`__setTime` ~L1929)
  in sync if you add tile types or entity arrays — add them to its tallies so the
  metric keeps measuring the right things.
- **Keep the hover tooltip in sync.** When you add a tile type or civic kind, add
  it to `TILELABEL` / `CIVICLABEL` / `TILEDESC` (near the canvas `mousemove`
  handler) so hovering it names + describes it. When you add an **entity** array,
  `stamp(e,cx,cy)` it in its draw function and add an `ENTINFO` row so hovering
  it names it too (iter 42). Same discipline as the census hook.
- **Smooth motion:** anything that moves along the coast/water must derive its x
  from `shoreAtF(y)` (unrounded), NOT `shoreAt(y)` — the rounded version snaps the
  craft column-to-column and reads jumpy. (Terrain tiles keep the rounded coast.)

## Laws the loop derived (promoted from the ledger — obey these)

Each of these was learned the expensive way, then re-learned because it lived in an
entry that rotated into the archive. They are general: they apply to the *next*
vector, whatever it is.

- **Probe before you design.** Measure the thing you believe is broken *before*
  writing a line of the fix. Iters 112 and 115 both opened by probing and both found
  the real defect was not the assumed one — 112 discovered monorail trains advanced
  by a *fraction of the loop* (so a 2-span line and an 89-span line lapped in the
  same 71s), 115 discovered `c.lit` was per-cell white noise with `corr(lit,
  dist-from-CBD) = +0.008`. Neither was guessable from reading the draw code.
- **To isolate a subtle draw-only change, DIFF PATCHED vs PRISTINE HEAD over a whole frame/band — it locates your
  change BY CONSTRUCTION (iter 161).** Two builds run identical code except your edit, so *every pixel that differs
  IS your change* — no fragile world→screen box that fights the camera transform and the shape's own geometry (161
  wasted two passes boxing cloud puffs that sit either side of a naive centre box). Two corollaries that turned 161
  from FAIL to a clean read: (a) when the diff is polluted by pre-freeze **entity drift**, don't chase determinism —
  drift is **directionally balanced** (warm px ≈ cool px, signed mean ~0) while a real tint is **directional**, so a
  warm-vs-cool split or signed mean separates signal from drift cleanly; (b) when a subtle change reads as **zero**
  in the probe, **force it LOUD first** (paint it pure red unconditionally) to prove the draw path executes before
  you trust the sampler — a loud frame that's still unchanged means the *sampler* is wrong, not the feature.
  Two more corollaries a whole-frame diff needs to be trustworthy (iter 163, crowd shadows): (c) **rebuild the city
  in-page — don't trust the LOADED state.** The RAF loop runs a wall-clock-dependent number of `tick()`s between
  load and freeze, and at a developed era each tick flips upgrade/succession cells, so two loads at the *same seed*
  render *different cities* and drown a faint change. Call `genWorld(seed)` (it reseeds `rng=mulberry32(seed)`) +
  `__warp(N)` in-page for a byte-identical city regardless of load timing — this is how you get a clean diff of a
  *deterministic* draw despite 137/154's "the live system is non-reproducible." (d) **a NIGHT whole-frame diff is
  polluted by the unseeded `STARS` field** (70 stars built once at load with `Math.random`, so different per load);
  `STARS.length=0` before render, and stub `Math.random` for any residual draw-time randomness. And when the
  feature is genuinely SPARSE (a few host tiles), its whole-frame count sits at the noise floor and flips sign run
  to run — **gate the STRONG instance, report the sparse one directionally + a visual, don't gate noise.**
  Two more the university lap paid for (iter 195): (e) **a LOUD test must be read against the LOUD COLOUR, not
  re-run through the same PATCH-vs-HEAD diff.** 195 painted a lantern pure red, compared red-vs-HEAD (139 px) to
  warm-vs-HEAD (136 px), and concluded the draw was "95% occluded" — **wrong by construction**: both builds change
  the same pixel *set* versus HEAD, so the totals coincide whatever colour the change is. A direct **count of red
  pixels** in the loud build (13/85/36) showed it was rendering fine. The diff is blind to *which* colour; only
  counting the loud colour isolates the draw. Corollary (b) says force it loud — this says how to *read* the loud
  frame. (f) **`playing=false` is NOT a frozen clock.** `waveT` and `time` keep whatever wall-clock-dependent value
  the RAF loop reached before the freeze, so two loads render different water: 195's probe had a **10–22 px noise
  floor of drifting surf** sitting right on top of a 5–47 px signal. Pin `waveT` **and** `time` (163's laws name
  STARS/movers/`genWorld`, not these) and the unchanged frames go to **exactly 0**. An honest zero is what makes
  every other number in the probe readable.
- **A GLOW is a gradient, and it must not outlive the thing it comes from (iter 195).** Two rules, both general:
  (a) **a flat additive `arc()` is a coin, not a glow** — it has a hard circular rim and it tints whatever sits
  inside it (195's warm halo turned a green spire olive); an agent called it *"a brown coin pasted on the sky."*
  Use `createRadialGradient` falling to **alpha 0 at the rim**. The artifact already knew this — the rain
  damp-patch (~L6216) is a gradient, commented *"soft-edged, or it reads as a decal."* (b) **a halo around a
  TALL THIN object ORPHANS.** A halo is by construction larger than its lamp, so when a later-drawn neighbour
  (a lower row — **draw order IS depth order**) covers the lamp, the glow still spills into open sky beside it:
  a light with no visible source, which is the invariants' "no floating" clause. 195's campanile lamp was
  *"obvious… reads as LIGHT, no seam"* on seed 42 and **a detached blob hanging in the sky on seed 7**, and a
  procedural city must hold on **every** seed. **Gate such a glow on there being no taller cell in the rows below
  — do not just dim it**, and prefer a ground-level host (which is occluded together with its tile).
- **Every gate this loop owns is FROZEN — a claim about MOTION needs a TEMPORAL probe (iter 134).** The
  census, the standard probe (freezes the clock for a two-render diff), and the visual gate (single
  screenshots) are all blind to *cadence*: a readout or animation can be provably *correct* (134's almanac
  passed its probe 48/48) and *pretty* in every static frame, and still be flickering noise in play. 134's
  season/moon HUD readout strobed because `year` is a fast **development** clock (~0.17 yr/sec at speed 1,
  so a city grows over minutes), NOT a wall calendar — the season word flipped ~0.7 Hz and the moon ~2 Hz.
  It was caught only by letting the clock RUN (`playing=true`) and **counting distinct states over N
  seconds**. This is the mirror of the freeze-the-clock law: a *diff* needs a frozen clock; a *rate* needs
  a running one. Match a readout to its clock's speed (`stPhase` correctly reads the slow `dayT`, ~110 s/cycle,
  not the sprinting `year`), and when correctness is about cadence, sample over time — don't trust a frame.
- **One predicate, one definition, all readers share it.** "Is this stop a station?"
  had **four** independent implementations and two were wrong — the draw gated on
  neighbourhood density, the tooltip counted raw `stops` — so lines claimed up to
  twice the platforms they drew (iter 112, fixed by `railStations()` computing `m.sta`
  once). Iter 119 hit the same shape: a spawn pool (`openCells`) and its re-entry
  test (`strollable`) were two readers of one idea, asymmetric, and the asymmetry was
  a one-way ratchet that decayed the feature to nothing over 20 sim-minutes. **When
  you add a rule, grep for every other place that already answers the same question.**
- **The tell's next host is a CONSTANT whose NAME asserts a behaviour its VALUE cannot have (iter 199).**
  The label-asserts-what-the-draw-ignores tell (below) has been cashed on tooltips (113/117/183) and once on a
  *comment* (194). 199 found the next rung down: `winBandR` lit a pane wherever `hashCell(...) >= WINDARK` and
  called the remainder **"nobody home"** — an assertion about *occupancy*, which is the one thing about a city
  that changes across a night — while `WINDARK` was a **hard-coded 0.16**. So the same panes were dark at 8pm and
  at 4am and every window lit at dusk still burned at dawn: the city never went to bed. **Grep for constants and
  enums whose name or comment claims a state, a rate, or a time-of-day, then check whether anything ever varies
  them.** A constant named for a *verb* is the tell; a constant named for a *dimension* is fine.
  Corollary — **check whether the obvious signal is SATURATED before concluding the draw "already reads" it.**
  It is tempting to say the windows already know about night because they scale by `LITAMT`. They do not: the
  light curve **pins `LITAMT` at 1.0 from dayT 0.86 to midnight**, so across the entire evening it is a flat
  plateau and carries *no* information about the hour. A signal that is clamped over the range you care about is
  the same as no signal. Read the keyframes, not the variable name.
- **A change that is provably INERT in one regime hands you a FREE perf noise floor (iter 199).** The perf
  section below says to grade only by an interleaved A/B against pristine HEAD — but it does not say how to know
  when a small delta is noise. If your change is *night-only* (or day-only, or seasonal), then the other regime
  runs **byte-identical code**, so whatever *it* reads IS the noise floor, measured on the same box under the
  same load, for free, in the same run. 199's edit draws zero panes in daylight (verified, not assumed), and its
  day column read **−0.0 / +0.1 / +1.0%** across three rounds — so its night reading of **+1.5 / −1.4 / −0.2%**
  is centred inside its own control and the change is free. Most late-game vectors are gated on `LITAMT` or
  `year`, so this control is nearly always available: **prove the dead regime is dead, then let it referee.**
- **Clear the pelican `flock` when you freeze the world for a probe (iter 199).** 163(c)/(d) tell you to rebuild
  in-page with `genWorld`+`__warp`, clear `STARS`, and empty the entity *arrays*. `flock` is neither: it is a
  lone `Math.random`-spawned **object** (`let flock=null`), so it survives the standard freeze and lands
  somewhere different on every page load. It was the **entire per-load noise floor** — ~100–600 scattered pixels,
  max delta ~8 — that made 199's probe false-FAIL its own daylight control, and it is invisible to every existing
  probe's clear-list. `flock = null` and an unchanged frame goes to an honest **0 px**. (195(f): an honest zero
  is what makes every other number in the probe readable.)
- **STUB `Math.random` BEFORE `genWorld` — it is the freeze-list item nobody wrote down, and it is the BIGGEST
  (iter 203).** 163(c)/(d) name `genWorld`+`__warp`, `STARS`, and the entity arrays; 199 adds `flock`. All of that
  is still not enough, because a whole class of entities — **joggers, whales, kayaks, herons, deer, dolphins,
  balloons** — is `Math.random`-spawned (that is exactly why `&flood=` exists for them and not for the `rng()` ones),
  and they **respawn on every `genWorld` call**. So two renders of the "same" frozen world, in the same page load,
  differ by **~4,000 px** — the same order as an entire feature's signal, and 203's first probe run was therefore
  *pure noise* dressed up as a six-row table. Clearing `flock` is a special case of this; the general fix is one
  line, and it subsumes the lot:
  ```js
  let s = 0x2F6E2B1 >>> 0;                                            /* before genWorld */
  Math.random = () => ((s = (s*1664525 + 1013904223) >>> 0) / 4294967296);
  ```
  **And ALWAYS render the unchanged frame twice and print the diff as the probe's first row.** 195(f) says an honest
  zero makes the other numbers readable; 203 says *make the probe SAY the zero*, because a silent noise floor does
  not announce itself — it just quietly makes every column plausible and wrong. Better still, render both frames
  inside **one** `page.evaluate` so nothing can drift between them.
- **"It is drawn OVER X" is an OCCLUSION claim, and occlusion is DIRECTLY MEASURABLE — never settle it by reading
  the draw code (iter 203).** 203 reasoned, correctly, that the cable-car rope *must* be depth-sorted: `stepGond`
  only takes `axStep` d=1/d=2 and **both are `y+1`**, so a path is strictly monotone in y and every span is drawn
  before the row it descends into. Four agent-reads said otherwise, in specific terms, on two seeds. A code argument
  cannot overrule four eyes — **a number can**. Render the SAME frozen frame under **two z-orders**: the element
  where the draw loop actually puts it, versus **the very same recorded polylines re-stroked on top of the finished
  frame**; `occluded% = 1 − inkInPlace / inkOnTop`. **~0% ⇒ nothing ever covers it (an always-on-top overlay, and the
  agents are right); >0% ⇒ it is genuinely depth-sorted.** The rope measured **8.4–23.6% occluded** on every seed and
  light, so the artifact was innocent and the agents had (once again) named a cause the measurement refuted. Record
  the polylines in **DEVICE space** (`ctx.getTransform()` at stroke time) and the replay needs no knowledge of the
  camera. `probes/probe-gondz.mjs` is the reusable rig.
- **A LOUD test FAILS on a SUB-PIXEL draw — measure INK, not saturation (iter 203, correcting 195(b)).** 195(b) says
  force the feature loud and count the loud colour. But a line **thinner than one device pixel** is *always* blended
  with its background and **can never produce a saturated pixel** — so a colour threshold counts ≈0 and you will
  conclude the draw is dead when it is fine. 203's occlusion probe first read **"0 visible px"** on a rope that is
  demonstrably 262–419 px. For anything sub-pixel, drop the threshold entirely and measure **ink contribution** —
  the summed max-channel distance from the same frame rendered *without* the element — which is threshold-free and
  correct at any width. (Corollary for the *loud* trick generally: it works on ellipses and fills, which cover whole
  pixels; it does not work on hairlines.)
- **A CHAIN is not a STROKE: filter a draw census by the feature's PERCEIVED extent, not its per-call extent
  (iter 203).** Hunting the "thin dark line", 203 censused every stroke that was long, thin and dark — and **missed
  the answer**, because each rope span is only **12–14 px** and sat under the "long" threshold, while **15–25 spans
  chain into an unbroken 199–331 px run** across the frame. *The eye sees the chain; a per-stroke filter cannot.*
  When you census draw calls to find something a viewer complained about, **group by issuer and sum** before you
  threshold — and note the same census's other trap: a non-string `strokeStyle` (a `CanvasGradient`) has no
  luminance, so defaulting it to black makes the **rain shafts** the darkest "line" in the city. `probes/probe-darkline.mjs`
  is the reusable locator — stack-attributed, so it names the function that issued the ink.
- **A stubbed SHARED `Math.random` makes a PER-ENTITY control WORTHLESS — aggregate the control (iter 204).**
  203 tells you to stub `Math.random` so a probe is reproducible. But the stub is **one stream**, and your patch
  almost always draws a *different number* of values from it (204's service vehicles now pull targets, waits and
  tie-breaks). Every consumer *after* them therefore gets different numbers and walks a different walk — so a
  **single** control entity diverges between the two builds for reasons that have nothing to do with your change.
  204's first control was one car, and it moved 0.0% → 1.4%, which reads exactly like "the patch routed ordinary
  traffic home." It had not. Averaged over the whole **38-car fleet** the stream-shift washes out and the control
  reads flat (0.1–0.4% in *both* builds), which is the only thing the control was ever asking. ⇒ **Make a control
  a POPULATION, not an individual** — or give it its own PRNG. A control that can move for a reason you did not
  cause is not a control.
- **A FROZEN CLOCK DOES NOT REFRESH THE DOM — `syncSky` is THROTTLED and `syncStats` only runs when playing
  (iter 204).** 200 says the user sees canvas *plus* DOM; 202 says the step-back's camera was lying. Here is the
  third member of that family, and it will bite any hand-rolled freeze: `frame()` calls `render()` on **every**
  RAF regardless of `playing` (so your canvas is fine, and any debug overlay you paint is *wiped*), but
  `syncSky(now)` **early-returns for 400 ms** (`if(now-lastSky<400)return`) and `syncStats()` is called **only
  inside the `if(playing)` branch**. So `playing=false; dayT=0.92; render(); screenshot()` gives you a
  **night-lit plate under a bright daytime sky**, with the HUD still reading "DAYTIME" — and an agent will
  correctly FAIL it, costing a full gate round. Force them: `lastSky=0; syncSky(performance.now()); syncStats();`
  before you shoot. (`probes/shot-stepback.mjs` already does this; anything you hand-roll must too.)
- **Aim a close-up at the entity's DRAWN position (`_sx`/`_sy`), never at `ctr(x,y)` (iter 204).** 201 says a
  fixed clip is not a framing — aim at the feature. This is the sharper form for a *mover*: a vehicle is drawn
  **interpolated** between its hex and its next hex by `v.p`, so `ctr(v.x,v.y)` can be a **whole hex** (~110 px at
  5.5×) from where it actually appears. That is precisely far enough for a visual agent to sweep the wrong
  quadrant and report an empty street — one did, on a frame where the probe measured the parked cruiser at **96%
  visible ink**. `stamp()` already records the true drawn position in world coords (`e._sx`/`e._sy`, the same
  fields `pickEntity` hovers by): render once, read them, re-centre, render again. And when the object is ~20 px,
  **clip tightly** — a 20 px vehicle in a 1400×900 frame is a needle you are asking an agent to find.
- **A label that asserts a relationship the draw ignores is a bug, and it is the
  richest seam in the artifact.** `TILEDESC[MARSH]` promised a "Reedy tidal wetland"
  and printed a live `Tide` for 16 iterations over a tile that never moved a pixel
  (113). `TILEDESC[REDWOOD]` said "Old-growth redwoods" while `describeTile` printed
  nothing of the `age`/`fire`/`bloom` the CA had tracked all along (117). Look for
  the seam where a tooltip already claims something the pixels don't do.
- **Dead code renders zero.** Before wiring to a host, confirm it exists *at scale* in
  the census tile histogram. `T.MARKET` — stalls, string lights, fully drawn — read
  **0 in every seed and era of the artifact's entire life** because its siting rule
  wanted a condition the upgrade pass saturates past (107). Plazas were ~0 the same
  way (30).
- **Contrast is not traceability; for a linear feature, legibility ≈ contrast ×
  width.** A 1–2 hex ribbon is one screen pixel at fit zoom, however bright. Iter 101's
  greenway passed the census with a good trade and still failed 7 of 9 agent reads.
- **A glowing LINE along a hex edge reads as a neon tube; a glowing DOT reads as a
  spark (iter 159).** A per-edge stroke on a straight coast joins with its neighbours
  into a continuous bright outline that exposes the hex geometry — no alpha low enough
  to fix it stays visible. Four agent reads FAILed every stroke form of the
  bioluminescent surf; sparse `hashCell`-gated *dots* passed both seeds on the first
  try. **When a per-edge draw keeps reading as an outline however you dim it, stop
  tuning brightness and change its SHAPE to points.** Two corollaries: (a) an additive
  glow that can overlap itself must have a **low red channel** or it blows to white on
  the overlaps — pick a glow colour by its darkest channel, not its hue; (b) judge a
  subtle coast ornament at a **moderate zoom** (the scale a user looks at the coast),
  not fit (invisible) nor an extreme 7x (corner hexes stack into bars) — a 7x FAIL on a
  feature clean at fit and lovely at ~4x is the zoom being unfair, not the feature.
- **To prove a STATE RESPONSE ("does X answer signal S?"), diff two states of ONE build — and you then need a
  POSITIVE control (iter 196).** Every probe law above assumes the question is *"what did my edit change?"*, whose
  isolation is patch-vs-HEAD. A **Deepen that makes an existing tile answer an existing signal** asks a different
  question, and a patch-vs-HEAD diff answers it only indirectly. Isolate instead by rendering **one build twice at two
  pins of S** (frozen clock, same `genWorld`): the only variable is S, so every moved pixel is an S-response. Run that
  on **both** builds and one table settles the whole claim — `BASE` host ≈ 0 (the seam: the draw was deaf) vs `PATCH`
  host ≫ 0 (the fix). **But "BASE = 0" is worthless on its own**, because a dead pin produces exactly the same zero as
  a deaf draw. So carry a **positive control: a host already known to answer S** (196 used BEACH, whose damp margin and
  tidepools provably read `TIDE`). It must move on *both* builds — that is what proves the pin is live, and it doubles
  as proof your edit didn't disturb it. A negative control (dry land) catches the rest.
- **A world→screen BOX around a host also samples its NEIGHBOURS — mask to the host's own geometry and SWEEP the mask
  (iter 196).** 161 says prefer a whole-frame diff *because* boxes fight geometry; but a state-response probe (above)
  **cannot** use a whole frame, since every other tile that answers S would pollute it. When you must box, the box is
  contaminated by neighbours — and **a neighbour that answers the same signal S will masquerade as your host answering
  it.** 196's first run "found" HEAD's kelp already responding to the tide at 3.2–4.7%, which would have killed the
  premise; the real cause was the *beach's* damp margin (`w2` up to ~7px) drawn on the BEACH hex but spilling across
  the shared edge into the kelp box. **Do not shrink the box until it passes — that is grading your own homework.**
  Mask to the host's polygon and **sweep the mask size**: if the contaminant *walks out to an honest zero* as the mask
  tightens (0.53% → 0.00% → 0.00%) while your signal *rises* (19% → 28% → 37%), you have proved both that the residual
  was rim bleed **and** that your effect is centrally located — i.e. it really is the host, not an artifact. A sweep
  that *explains* a residual is worth more than a threshold that hides it.
- **A perf LEVER is a HYPOTHESIS — measure it before you MANDATE it, and characterize a cost with variants that
  DISCRIMINATE between mechanisms, not one plausible fix (iter 198).** 197's step-back measured a real +3.4% from
  194's per-tree contact shadows and then mandated the *fix* — "batch the per-tree `shadS` fills into one path per
  hex" — reasoning that since 194 had memoized `shadS`'s `rgba()` string for zero gain, the cost *must* be the fill
  count. That was inference, never measurement. 198 built the batch exactly as ordered and measured **+0.3%:
  nothing.** The way out was to stop tuning and write a probe that **holds one factor fixed per variant**, so the
  table names the mechanism rather than grading one guess: `NOSHAD` (remove the draw → the whole budget), `BATCH`
  (¼ the fill *count*, same area), `SMALLR` (¼ the *area*, same count), `SPRITE` (`drawImage` a pre-baked ellipse
  → no path raster). **Only `NOSHAD` moved.** ⇒ On this canvas a draw costs **PER-ELLIPSE — per path object
  rasterized** — near-independent of its size, of how many are grouped into one `fill()`, and a sprite blit is
  *worse* (+2–4%), not better. Three corollaries, all general: (a) **`ctx.fill()` is not the unit of cost; the path
  object is** — batching N ellipses into one fill still rasterizes N ellipses, so "batch the fills" is not an
  optimization, it is a refactor; (b) the only real lever on such a cost is **drawing fewer things**, which is a
  *visual* decision — price it against what the ornament is worth and be willing to **pay** (194's ~3% buys the
  grounding of every tree in the city, and that is a good trade); (c) **a step-back should name the SUSPECT, not
  the FIX.** Naming the fix converts the next iteration into a foregone conclusion and spends it proving the
  step-back wrong. `probes/probe-shadcost.mjs` is the reusable table — rerun it before reopening any draw-cost lever.
- **THE PROBE READS THE CANVAS; THE USER SEES THE CANVAS *PLUS THE DOM* (iter 200).** Every probe in
  `probes/` measures `cvs.getContext('2d').getImageData()` — and the artifact's HUD is **not in the
  canvas**. `.placard` is a DOM card that owns the whole **top-left corner** (`left:20px`,
  `max-width:300px`, and tall — `max-height:calc(100vh - 132px)`), and `.census`/`.controls` own the
  bottom corners. A canvas readback cannot see them, so anything drawn in **screen space** can be
  *completely invisible to the user* while the probe reports it present, bright and beautiful. 200's
  first probe scored the golden-hour sun at **11,716 changed px** on a frame where the sun was
  **entirely behind the placard**; two agents, on two seeds, twice, said "no sun" and were **right**.
  ⇒ **When the claim is about VISIBILITY of a SCREEN-SPACE draw, diff `page.screenshot()` (DOM
  composited), not the canvas.** A screenshot diff also gets the occlusion check for free: what the
  HUD or the skyline eats simply does not appear in the diff. (World-space draws are mostly safe — the
  camera keeps them out of the card gutters — but *any* `ctx.setTransform(dpr,0,0,dpr,0,0)` block is
  screen space: sun, moon, stars, shooting star.)
  Corollary — **the sky on this plate is a SCARCE, MEASURED resource, not open space.** The plate is a
  hexagon, so the open sky is a shallow **band**: the skyline sits at ~0.12 of the viewport right
  across the middle and only falls to 0.27–0.43 in the top corners — and the top-left corner is the
  placard's. That is why the moon is parked at x=0.80. Measure the band before siting anything in it.
- **A PROBE WHOSE THRESHOLD IS IN THE UNITS OF YOUR OWN DESIGN CONSTANT IS GRADING YOUR OWN HOMEWORK (iter 205).**
  196 says *don't shrink the box until it passes*. This is the same sin one level up, and it is much harder to see,
  because the probe is **not wrong** — every number it prints is true. 205 moved a ship to `seaXFr(harborY, 0)`,
  called that "the berth", and gated on `dist < 2.2 cells`. It passed: 4 arrivals, 55% of her life "alongside",
  control bit-identical. **But `2.2 cells` was chosen because the berth constant met it**, and the claim was not
  *"her distance decreases"* — it was ***"she comes alongside"***, which is a claim about **the water the eye sees
  under her bow**: 54.6px, ~1.7 hexes, unchanged and never computed. Two agents FAILed it instantly. ⇒ **State the
  claim in the viewer's units, then measure THAT.** If your gate's threshold and your design's constant are
  expressed in the same quantity, the gate can only ever confirm you implemented what you implemented. The tell:
  you can pass the probe by editing the threshold. And note this is the *second* case (with 200's sun behind the
  placard) where the agents were right and the probe was wrong — **both times the probe was measuring a layer or a
  unit the user never sees.** When a probe and an agent disagree, ask what each is *looking at* BEFORE re-running
  either.
- **CHECK THE HOST EXISTS BEFORE YOU BELIEVE THE TELL — the label-tell has a FALSE-POSITIVE MODE (iter 205).**
  The richest seam in the artifact (a label asserting what the draw ignores) has been cashed eight times, so it is
  trusted on sight. **It can also be a lie in the other direction.** The harbor freighter's comment said *"waiting
  on a berth"*, her breakwater said *"rides in still water"*, her tooltip said *"Serving the harbor works"*, and
  the step loop said `if(f.anchored)continue` — a perfect tell. It was **not a defect**: `SHORE0 = SHOREX+5` puts
  the water's edge *"five lots seaward of the highway"* while the warehouses sit *behind* the highway, so the port
  has **no waterfront at all**, the waterline is a swimming beach, and a ship lying at anchor offshore is **the
  correct depiction of a roadstead.** The label was describing the model accurately; *I* was reading real-world
  intuition ("ships dock") into a model that cannot express docking. ⇒ Before you build to a tell, spend one
  command proving its **host** exists (the dead-code law: `T.MARKET`, the fire CA, and now the quay). And per 201:
  when the fix requires the world to contain something, **ask whether the world does.**
- **Ask an agent to LOCATE, not to JUDGE** (108) — see the visual gate. And when
  agents disagree, **a probe is the verdict, not a rerun** — ***but only if the probe measures what the
  claim is about* (iter 200).** This is the one recorded case where the agents were right and the probe
  was wrong, and the standing law above would have told you to override them. The probe was measuring a
  *layer the user never looks at*. So when a probe and an agent disagree, do not just re-run either one:
  **first ask what each is actually looking at.** A number beats a vibe only when it is a number *about
  the same thing*. (The locate-don't-judge discipline is what made this catchable: agents asked to
  *point at* the sun returned positions within ~0.01 of the shipped formula on every frame where it was
  visible, which is exactly why their "there is no sun here" was credible rather than vague.)
- **A FIXED CLIP IS NOT A FRAMING — aim the camera at the feature, don't guess a rectangle (iter 201).**
  `shoot.config.json`'s `coast` and `downtown` are hard-coded rects, but **the city is procedural: the coastline
  moves seed to seed.** On seed 7 the `coast` clip landed on **open water** — the beach, the parasols and the
  damp margin were all outside the crop — and the visual agent correctly FAILed *the crop*, costing a full
  gate round-trip. A fixed rect is fine for a *whole-city* read; it is a coin-flip for anything **sited by the
  terrain**. Instead **locate the host, then aim**: `window.__find('BEACH')` returns clip-ready screen coords,
  and for a feature whose siting rule is subtle you can capture the **actual draw calls** (wrap `ctx.ellipse`
  on a signature unique to the ornament — grep to confirm it *is* unique), pick an instance that satisfies the
  feature's precondition (201 needed a parasol on a **sea-facing** hex — a landlocked one has no tide to answer
  and would have proved nothing), then set the artifact's own `scale`/`offX`/`offY` to centre it and shoot.
  `probes/shot-beachtide.mjs` is the reusable pattern.
- **An agent's "this is BACKWARDS" may be an objection to the ARTIFACT'S MODEL, not to your change (iter 201).**
  The locate-don't-judge law says a FAIL is a cue to measure. This is the subtler case: **the agent's every
  factual claim can be correct — matching your probe exactly — and its verdict still wrong**, because it is
  applying real-world intuition to a model that cannot express it. 201's beach furniture retreats *up* the sand
  on the ebb; an agent called that inverted (a real beach hands you *more* sand at low tide). But the artifact's
  **coastline is fixed terrain and cannot recede**, so the tide can only express itself as the intertidal flat
  drying out *inland*, and flipping the sign would have driven the towels **onto the widening wet sand** —
  contradicting the one invariant the feature was built on. ⇒ When a FAIL objects to a *direction* or a
  *semantics* rather than to a pixel, **ask what the model can actually represent** before you flip it: the
  proposed fix may be incoherent inside the artifact. Then get a fresh read that **states the model's
  constraint** and let it judge within that (201's two re-reads both then PASSed *and* independently flagged the
  same caveat, which is the model's — bank it, don't paper over it).
- **Reverting a passing-but-weak change is the system working.** The census can pass a
  change that isn't worth its cost. Iters 82, 88, 101 and 114 all explored, failed a
  bar the census could not express, and reverted to byte-identical. That is a *result*
  — log it as carefully as a ship.

## "Small and shippable" — with a counterweight

The default bias (small, additive, low-risk) is right *most* of the time and keeps
ships clean. But it has a failure mode: it made this loop **defer the single most
interesting feature (the aerial cable car) ~5 times** as "too sweeping," shipping
marginal filler instead — until a framing was found that made it low-risk. So:
- Once per few iterations, it's worth **one bigger swing** at a high-value hard
  thing. Back up first (`/bin/cp` the file), timebox it, and if the visual gate
  shows it's off, **revert** — exactly as done for the solar-farm attempt, which
  *passed the census yet was reverted* because a −4% pop hit for a barely-visible
  feature was a bad trade. Reverting a passing-but-weak change is the system
  working, not a failure.
- Prefer **draw-only / `Math.random`** features when you want a guaranteed-clean
  ship: they touch no terrain and no seeded `rng()`, so pop stays flat. A
  terrain-altering CA pass at an early year cascades chaotically over decades of
  development and wobbles pop a few % *no matter how few cells it touches*.

## Files this skill owns

- `census.mjs` — the seed×era census/regression harness (deterministic).
- `census-baseline.json` / `census-latest.json` — captured matrices (baseline is
  overwritten each iteration by `--save-baseline`).
- `census-history.jsonl` — append-only: one summary line per census run
  (scalars + tile histogram + life/transport totals), so the city's numeric
  story across all iterations survives baseline overwrites. Never edit; plot it
  someday.
- `GROWTH.md` — the iteration ledger: the maintained **State of the city** header
  (domain × kind grid) + the most recent 10 entries. Kept small on purpose.
- `GROWTH-archive.md` — older entries, rotated out. Append-only, oldest first.
  **Nothing reads this by default.** Consult it only to answer a specific
  question about an old vector ("was X ever tried?"), and even then `grep` it —
  don't read it.
- `rotate-ledger.mjs` — moves all but the last 10 entries from `GROWTH.md` into
  the archive. Idempotent, no-op below the threshold, refuses to write unless
  every entry is accounted for exactly once. `--keep N`, `--dry-run`. Also
  **measures the maintained header against a 400-line budget** and warns (exit 0,
  never blocks a commit) when it is over — see step 5. `--header-max N`, `0` to skip.
- `probes/` — **tracked source, not scratch.** The per-feature measurement scripts
  that gate a draw-only iteration, one per cue closed: `probe-seatone.mjs` (luminance
  vs. sea depth), `probe-winband.mjs` (facade `|dI/dx|` with a day control),
  `probe-season.mjs` (per-tile seasonal pixel shift, `ROAD` as control),
  `probe-vis.mjs` (can this ornament be *seen*, and from what zoom — freezes the
  clock first). Each resolves the artifact as `join(HERE, '../../../../solvista.html')`.
  Ad-hoc probes are born at the repo root (gitignored); `git mv` one here the moment
  your ledger entry cites it.
  Five of them are **harness-wide**, not per-feature — reach for these on any lap:
  `perfab.mjs` (interleaved A/B frame time; `REF=<sha>` to price a lap **or an arc**),
  `probe-shadcost.mjs` (the draw-**cost model**: cost is per path object — rerun before
  reopening any draw-cost lever), `probe-drawbudget.mjs` (**where the frame goes** —
  path objects per draw fn, in one render; calibrated against `probe-shadcost`),
  `probe-darkline.mjs` (**locate an unexplained linear artifact**: censuses every long/thin/dark
  stroke and attributes it to the fn that issued it — but read the chain law above before
  trusting its thresholds), and `probe-gondz.mjs` (**is this drawn OVER that?** — one frame under
  two z-orders, `occluded% = 1 − inkInPlace / inkOnTop`; settles any occlusion claim).
  `probe-ropesteel.mjs` is the rig that graded — and refuted — 203's rope polish; it is the
  template for isolating a draw by *suppressing its own strokes* (stack-matched) rather than
  boxing it.
- `probes/shot-stepback.mjs` — **the step-back's camera.** 3 lights × 2 calendars with
  the clock **frozen in-page** and the light pins taken from the light curve, because
  `shoot.mjs` + `?t=`/`?year=` drifts the calendar ~0.167 yr/s while it waits and will
  hand you false FAILs (iters 139, 202). Each frame self-reports its own state.
  `node probes/shot-stepback.mjs <seed> <outdir>`.
- `run-loop.sh` — the headless event-based runner (one fresh `claude -p` per
  iteration, next starts when the previous exits). Handles rate limits, refuses
  to start on a dirty tree or a dirty worktree, `--status`, `STOP`.
- `fmt-stream.mjs` — renders the runner's `stream-json` output as a live one-line-
  per-action feed, and lifts `rate_limit_event.resetsAt` out for the runner.
- `runlog.mjs` / `RUNLOG.md` — one digest line per landed iteration, appended by the
  runner. Idempotent by commit sha (a no-commit iteration appends nothing), verdict
  and vector read from the commit + ledger, cost from the raw stream. `RUNLOG.md` is
  the accruing table; it is not memory (the ledger is) and nothing reads it back.
- `notes.mjs` — release notes for a range, from git + the ledger, grouped by domain
  with an *Explored and rejected* section. `--last N`, or a `git` range; whole-file
  numeric delta scoped to the range's dates. Invents no prose; pure selection.
- `hovershot.mjs` — screenshots a *hover*, which `shoot.mjs` cannot do. Aims the
  real cursor at an entity via `__ents`, then clips it at three scales plus a
  no-hover control frame. `node hovershot.mjs '<url query>' '<Entity name>'
  <outdir>`; `ZOOM=n` first wheels the artifact's own camera in (real
  magnification, not upscaled pixels), `PICK=front` picks a front-row instance
  (back-row entities can be legitimately occluded). Use it for any change to the
  tooltip / hover / selection surface.
- `shots/` — screenshot output (gitignore-able scratch).
- Repo root `shoot.config.json` — city framings for `screenshot-verify`
  (`wide`/`tall`/`mobile` full-page + `coast`/`downtown` zoom clips; select with
  `--shots name`).

## Setup (once per machine)

The **worktree** (`../solvista-grow`, branch `grow-city`) is created automatically
by the idempotent snippet in *Worktree — where the loop runs*; no manual setup. To
tear it down (e.g. to start clean): `git worktree remove ../solvista-grow` from the
main checkout — the `grow-city` branch is preserved and re-attached next run.

Playwright is borrowed from the `screenshot-verify` skill. If `census.mjs` can't
find a browser:
```bash
cd ~/.claude/skills/screenshot-verify && npm install && npx playwright install chromium
```
