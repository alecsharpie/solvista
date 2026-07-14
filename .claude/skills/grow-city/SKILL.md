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
     *didn't* intend to touch is a red flag; investigate before logging. **But the
     census itself has a ±2 wobble on tick-sensitive metrics, and it will frame your
     edit for it (iter 226).** `census.mjs` does `goto` → `waitForTimeout(500)` → read
     and **never sets `playing=false`**, so the RAF loop runs a *wall-clock-dependent*
     number of `tick()`s in that window — 163's law (c), living inside the gate. A
     draw-only change makes each frame a hair slower, so fewer ticks land, and a
     late-development metric (`solarRoofs`) shifts a cell or two. 226's *same patched
     file* read `+1`, then `+0`, then `-2`. ⇒ **To test whether an unintended metric
     move is YOURS, re-run the SAME FILE — do not diff against HEAD.** HEAD-vs-baseline
     comes back byte-clean (it is the file the baseline was pinned from), which makes
     your edit look guilty of something the harness did. Core metrics (`pop`,
     `developed`, `roads`) are not affected and remain the real gate.
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
  from intuition.**

⚠ **AND THEN 202 WROTE ITS PINS DOWN AS LITERALS, AND THEY ROTTED — SEE THE LAW BELOW
(iter 264).** This recipe used to name them here (`day 0.30, golden 0.68, night 0.92`)
and `shot-stepback.mjs` hard-coded them. **261 gave the light curve a `year` term
(`sunWarp`: the season is now a DAY LENGTH), the curve moved under the literals, and
they silently became guesses again** — golden slid to **GWARM 0.36 of 0.786**, and the
seasonal frame was being shot at **mid-morning, where a day-length season is ~0 BY
CONSTRUCTION** (`d(LUMA)` **0.15**, against **1.58** at dusk). Four agent FAILs, two
seeds, all instrument. **`shot-stepback.mjs` now DERIVES every pin in-page from the
artifact's own `sunWarp`/`SUNDN`/`GWARM` at the year being shot — there is no `t`
literal left in it, and you should not add one.** Golden is the **argmax of `GWARM`**;
the season is a **DISCRIMINATING PAIR** (258) — `dusk-summer` / `dusk-winter` at the
**same wall-clock instant**, taken midway between the two seasons' sunsets, so the sun
is provably **UP in one frame and DOWN in the other**.

`shot-stepback.mjs` freezes the world in-page (`playing=false` stops *both* clocks),
pins `genWorld`+`__warp`+`__setYear`+`__setTime`, renders once with **no wait**, and
shoots with `page.screenshot()` (DOM-composited, per 200's law). Every frame
**self-reports** its own state — now in the *viewer's* units (236), e.g.
`dusk-winter t=0.766 LITAMT=0.95 sun=DOWN (sets 0.701)` — so a mis-pinned frame is
caught by the tool instead of by an agent. ⚠ **`SUNUP`/`SUNDN` are thresholds on the
WARPED axis `SUNT`, not on `dayT`**; testing them against the wall clock printed
`sun=UP` on a winter dusk whose sun had already set. Re-shot this way, both seeds
PASSed and **both blind agents named the winter frame by the light alone, on a crossed
mapping** (238).
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
- **The file DECLARES `<meta charset="utf-8">` (line 1, iter 229) — raw UTF-8 in string literals is now
  SAFE, and iter 134's "keep literals pure-ASCII" rule is REPEALED.** Do not hand-escape a `·` or an `é`,
  and do not re-open this: the file is **self-describing** under every serving condition, asserted by
  `probes/probe-charset.mjs` (which serves the same bytes three ways — `file://`, http with no charset,
  http with `charset=utf-8` — and FAILs unless all three decode as UTF-8). **If you ever touch the head of
  the file, keep the meta tag in the first 1024 bytes or the whole class comes back.**
  The history is the lesson, and it is a law: **134 saw mojibake in an http screenshot and wrote a
  DISCIPLINE ("escape every literal") where a one-line STRUCTURAL fix was available.** The discipline was
  then silently violated 12 times over 95 iterations, and the ledger escalated it to its #1 cue —
  *"a LIVE bug shipped on the public site"* — which was **false**: GitHub Pages sends
  `Content-Type: text/html; charset=utf-8`, which overrides everything, so **no user ever saw it.** The
  mojibake existed *only* under `shoot.mjs`'s dev server, which sends `text/html` with no charset. ⇒
  **THE LOOP HAD BEEN GRADING ITS OWN INSTRUMENT AND FILING THE RESULT AGAINST THE ARTIFACT.**
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

- **A CAMERA SET THROUGH A *DERIVED* QUANTITY RENDERS A FRAME THAT CONTRADICTS ITS OWN HUD — DRIVE THE STATE THE APP
  DRIVES, NEVER THE VARIABLE IT COMPUTES (iter 269).** 264 says a camera pin must be *derived from the curve at shoot
  time, never stored*. 269 is its structural sibling and it is about **which variable you are allowed to write.** The
  artifact's camera contract is `zoom` (1 = the fitted diorama), and `setZoom` does **`scale = fitScale * zoom`** — so
  **`scale` is an OUTPUT, not an input.** I set `scale = 4.6` directly. The canvas duly rendered at **7.2x** while the
  HUD's zoom pill, which reads `zoom`, went on truthfully reporting **`1x`** — and an agent that read the pill
  **correctly** called the frame un-zoomed and *refused to grade it*. That is a whole gate round spent on a frame that
  was internally inconsistent, and note the shape: **the agent was right, the artifact was innocent, and the
  contradiction was invisible to me because I never looked at the HUD.** ⇒ **Before you write ANY page global from a
  probe or camera, `grep` for the function the app uses to set it and check what else that function writes.** If the app
  never assigns your variable directly, neither may you. The tell — and it is the only one you get: **your frame's own
  self-report (202) disagrees with your frame**, which is precisely the condition 202's self-reporting exists to catch,
  arriving on a quantity you did not think to print. (Corollary: this is 204's HUD-does-not-follow-a-frozen-clock law
  one rung deeper — 204 says *force* `syncStats()`; 269 says the value it syncs must have been **set correctly in the
  first place**, or forcing it merely publishes your error with more authority.)
- **AN AIMING PREDICATE THAT CORRELATES WITH YOUR FEATURE'S *MEANING* USUALLY CORRELATES WITH ITS *OCCLUSION* — SO
  "AIM AT THE MOST X" FRAMES THE MOST BURIED INSTANCE, BY CONSTRUCTION (iter 269, cashing 258).** 226 says aim by
  measured ink, never by a tile predicate; 258 says the predicate that makes a behaviour *meaningful* can be the
  predicate that *buries* it (the cab stops at a `livelyKerb`, which is by definition ground with tall frontage). 269
  is the two laws **colliding inside the camera**, and it is the form that feels most obviously correct while you write
  it. I aimed the streetcar's close-up at *"the tram nearest the BIGGEST avenue"* — an eminently sensible framing. But
  the biggest avenue is the **highest-flow trunk**, and the highest-flow trunk is **downtown**, and downtown is **where
  the towers are** — so my aiming rule was **positively correlated with occlusion** and framed the single most buried
  streetcar in the city. Two agents, on two rounds, duly FAILed a frame whose centre was a tower wall. Re-aimed by
  **argmax of measured ink** (suppress each candidate in one page, diff, take the best), the same build PASSed with a
  full unprompted confirmation. ⇒ **When your camera's aiming rule contains a superlative — the biggest, the busiest,
  the densest, the most central, the liveliest — stop and ask what that superlative is MADE OF.** If it is made of
  *tall neighbours* or *dense fabric*, you are aiming at a wall. **Aim by ink; let the predicate choose the CANDIDATE
  POOL, never the WINNER.** The tell: your aim is a `min`/`max` over a field that also drives development.
  ⇒ **AND THE COROLLARY THAT SAVED THE LAP: THE SAME CORRELATION IS A REAL COST, NOT ONLY A CAMERA BUG — SO PRICE IT ON
  THE AGGREGATE BEFORE YOU BELIEVE EITHER THE CROP OR YOUR FEAR.** The burial was *also* genuinely happening (on the
  worst seed the best on-avenue tram rendered **13px**), and a crop is an **n=1 sample of exactly the tail** (258). The
  honest instrument is the **population**: visible ink per instance, HEAD vs patch, over all seeds — which came back
  **+23%, up on 5 of 6.** The feature makes the thing MORE visible on average and less visible in one tail. **A single
  damning close-up and a healthy aggregate are not in conflict; they are the distribution.** Report both.

- **A PROBE'S *ADJACENCY* IS AS WRONG-ABLE AS ITS UNITS — AND A "SMOOTHED" HASH IS NOT A SMOOTH FIELD, IT IS A
  BLOCKY ONE (iter 268).** 228's law says re-derive the instrument from the complaint's nouns; 238 says check *where*
  it samples; 235 says read what it *measures*. 268 is the fourth axis, and it is the one that will hand you a passing
  number about the wrong pair of things: **check WHICH TWO THINGS your probe COMPARES.** `probe-seastep` (257) grades
  the sea's terracing by the RGB step between two **DEPTH-ADJACENT** hexes — tone `k` vs tone `k+1`. Every number it
  prints is true, it certified the day sea at step/chroma **0.14** as *the bar the artifact has always accepted*, and it
  is **the wrong pair**: two tones one step apart on a *quantised scale* need not be **neighbours in the world**, and the
  step the eye reads is between two hexes that **TOUCH**. Re-measured on touching pairs, the mean *acquits* (5.4 against
  a noise-free floor of 4.6; step/chroma **0.07**, half the certified bar) — **and the defect is entirely in the TAIL**
  (224/241a, again): the seabed put a **≥2-tone jump on 5.0% of all touching sea-hex pairs**, up to **31 RGB**
  (step/chroma **0.41**, ~3× the accepted bar), scattered at random through open water. Both step-back agents, blind, on
  both seeds, called it *"a hexagonal quilt… you count the tiles before you see water"* — **in the DAY frames the banked
  probe had certified.** ⇒ **When a probe and two agents disagree, ask what PAIR each is comparing** (200/205's
  what-is-each-looking-at, on the *relation* rather than the *layer*). The tell: your metric is a difference, and the two
  operands are adjacent in a **VALUE** space (a tone, a rank, a bucket) rather than in the **SPACE THE VIEWER SEES**.
  ⇒ **AND THE CAUSE IS A DESIGN LAW WORTH MORE THAN THE FIX: `hashCell(x>>1, y>>1)` IS NOT A SMOOTHED HASH — IT IS A
  BLOCKY ONE.** A spatial hash is **white noise**; downsampling its *coordinates* does not low-pass it, it makes it
  **piecewise-constant** — constant inside each 2×2 block and an **independent uniform draw across every block edge**.
  So a field built this way is *maximally discontinuous exactly at the boundaries a viewer can see*, and the comment
  above it promising **"shoals and channels rather than contour lines"** named a structure its own mechanism **cannot
  produce** (199's tell, hosted one rung below a comment's *claim*: a comment's **MECHANISM**). A coherent shoal must be
  **CONTINUOUS**; interpolate between the lattice points (`seaOct`: same octaves, same weights, same amplitude, same
  mean, smoothstep-interpolated) and the hard seams fall **5.0% → 1.4%** with the **must-not-move column holding** (the
  seabed's own variance, 0.361 → 0.364 — *smoothed, not flattened*). **Before trusting any `hash(x>>k, …)`, ask whether
  you wanted a BLOCK or a GRADIENT.** They are different fields, and only one of them is noise you can see through.
  ⇒ ⚠ **AND WHAT IT CANNOT FIX IS THE LAW YOU MUST NOT THEN RE-OPEN: the ONE-TONE terrace survives in EVERY variant**
  (p90 = 11.0, noise-free included) — **255's ⛔, a per-hex flat fill terraces onto the lattice BY CONSTRUCTION.** 268
  removed the hard **SEAMS**; it did not and cannot remove the **LATTICE**. **A field fix buys you the tail, never the
  quantisation** — that needs a different rendering unit, not a different field.
- **AN A/B GIVEN *ORDINAL* NAMES IS NOT BLIND — `one`/`two` CARRIES THE SAME ORDER `A`/`B` DOES (iter 268, sharpening
  239).** 239 says: name the FILE, never a letter, because a letter is a pointer the agent must maintain and pointers
  get swapped. Correct — and it is **half** the defence, which is exactly how 268 walked back into it. I named the blind
  pair `s42-one-sea.png` / `s42-two-sea.png`: file names, self-identifying, per the law — **and ordinals**. On a
  **crossed** map, *both* agents chose **"two"**, i.e. they agreed with the **POSITION** and thereby disagreed about the
  **BUILD**; one of them also described the patch with a property (*"per-cell independent, high-frequency"*) that is
  **arithmetically impossible** for it to have. Re-shot with **meaningless tokens** (`kappa`/`sigma`) and the **position
  crossed as well**, the same question came back honest: one agent named the fix and **measured the frames itself** to
  prove it, the other said **"I truly cannot tell them apart"** rather than inventing a difference — *which is the
  answer a working blind gate is allowed to give.* ⇒ **A blind pair's names must carry NO order, NO alphabet and NO
  seniority, and the treatment must not sit in the same POSITION on every seed.** The tell: you could sort your frame
  names. (And note the payoff: the crossing is what *detected* the bias — with an uncrossed map both agents would have
  "agreed", and I would have shipped on a consensus that was purely positional.)
- **A DIFFUSED FIELD CARRIES THE CELL'S OWN SOURCE TERM — SO A RULE THAT ASKS A CHEAP TILE "ARE YOU VALUABLE YET?" IS
  ASKING IT TO CONTRADICT ITS OWN DEFINITION, AND IT WILL NEVER FIRE. SCORE THE NEIGHBOURHOOD, NOT THE LOT (iter 267).**
  218 says a *saturated* roll is a dead lever; 263 says a rule's ignition is a *distribution over a space*. 267 is the
  third member and the one that hides best, because **the rule reads like good sense and its field is real**. Solvista
  has shipped a full warehouse→loft conversion — brick prism, strips of new glass, a coral arts-district sign, a rooftop
  studio, **and a line in the placard promising it** (*"Warehouses become lofts… once the rent says so"*) — since long
  before the ledger, and it had produced **0 lofts, on 6 seeds in 6, at every era, for the artifact's entire life**. Its
  gate was `c.val > 0.45`. But `c.val` is a **diffusion**: `updateValue` mixes **60% neighbour mean + 40%
  `valueSrc(t)`**, and `valueSrc(T.IND)` is **0.18**, the lowest source in the city bar burnt ground — so **an
  industrial lot's own cheapness is subtracted from the very signal meant to lift it**, and warehouses cluster with
  warehouses, which drags it lower still. Measured ceiling across six cities: **`c.val` 0.425 against a 0.450 gate.**
  *Not improbable — unreachable.* ⇒ **When a rule keys a cell's fate to a diffused field, check whether that field
  contains the cell's OWN source term, and whether that term points the wrong way.** The fix is not a threshold, it is a
  **change of subject**: `blockValue(x,y)` = the neighbour mean *the diffusion already computes*, minus the self term.
  A warehouse does not gentrify because the warehouse got valuable; **it gentrifies because the city arrived at its
  door.** The tell, and it is checkable before you run anything: **your rule's predicate names a property the subject is
  DEFINED as lacking** (a *cheap* lot must become *valuable*; a *derelict* tile must become *desirable*; a *dark* hex
  must become *lit*) — and the field it reads is a diffusion the subject is a source of.
  ⇒ **AND THE THRESHOLD YOU REPLACE IT WITH SHOULD BE THE ARTIFACT'S OWN CONSTANT, NOT ONE YOU PICK.** 205 warns that a
  gate whose threshold is in the units of your own design constant can only confirm you implemented what you
  implemented. The escape here was free: **0.5 is `valueSrc`'s DEFAULT RETURN and `updateValue`'s own `n?s/n:0.5`
  FALLBACK** — *the artifact's existing definition of neutral land* — so the rule reads, in English, *"a shed converts
  when the block around it is worth more than neutral ground."* Swept, it is also the **only** cut that works: **0.45
  admits 26 of 27 sheds and the yard vanishes** (206: a lever that improves every instance can still destroy the
  population) while **0.55 starves 4 seeds in 6** (233: gate on the WORST seed). **Before inventing a constant, grep the
  file for the one it already means.**
  ⇒ ⚠ **AND 263'S LAW RECURRED IN THE SAME LAP, ON THE SAME RULE, AFTER THE GATE WAS FIXED — SO FIX THE SPACE *AND* THE
  GATE, AND EXPECT THE SECOND LIMITER.** Opening the gate shipped almost nothing: the pass still converted **6.7%** of
  what it admitted, and **no probability could rescue it** — swept to `p=0.8` it *still* left **2 seeds in 6 with no
  loft at all**. Cause: it hunted a **3–6 cell** host with `rc()`, **a lottery over the whole 3,400-cell plate**, so it
  saw a given warehouse **less than once in three decades**. **A tiny host cannot be found by a uniform sample of a
  large space, and the rate is irrelevant until the space is right.** The house's own idiom for a small host is to
  **walk it** (the corner-shop pass does), rolling on `hashCell(x,y,seed^SALT^TICKN)` ⇒ **zero `rng()` draws**, so the
  rule becomes **inert to the seeded stream** (263). ⇒ **A dead rule usually has TWO causes, and fixing either alone
  ships nothing — after you fix the gate, RE-MEASURE before you believe you are done.**
  ⇒ ⚠ **AND A RULE THAT CONSUMES ITS OWN HOST NEEDS A FLOOR, BECAUSE A SMALL HOST IS *ALL EDGE*.** `blockValue` is an
  *edge* predicate by construction (the block around a rim shed is city; around a core shed it is more sheds), and on a
  big yard it self-limits. **On a 3-shed yard every shed IS an edge shed** — unguarded, 2 seeds in 6 converted the port
  to its last building and the city lost the sawtooth warehouse and its clerestory **altogether**. One counter
  (`works`, floored at 1) fixes it. **The tell: your rule's predicate is a spatial gradient, and its host's population
  is small enough that the gradient has no interior.**

- **AN ILLUMINANT PROTECTS ONE SET OF SURFACES AND DESTROYS ITS COMPLEMENT — AND YOU WILL ONLY EVER BUILD THE
  LADDER FOR THE HALF THAT BROKE FIRST (iter 265).** 214's law says a flat per-channel multiply on a saturated
  surface is a **HUE ROTATION**, not a tint. It is right, it is one of the loop's best findings, and it built a
  five-lap ladder (214 sand · 220 masonry · 221 greens · 223 · 234 timber) — **all of it at NIGHT**, because the
  night tint `[.42,.42,.58]` crushes R and swings every **WARM** surface to violet. The **GOLDEN** tint
  `[.92,.72,.66]` is that bug's **exact mirror** — it crushes G and B, so on any surface whose identity is its
  **GREEN**, R overtakes G and the grass renders **orange** — and in **264 iterations nobody read it as the same
  bug**, while the ledger's #1 cue (*"the amber wash flattens the whole plate into near-monochrome terracotta"*)
  pointed straight at it. Measured: every land surface converges into a **9-degree hue band** (PARK 32° · ROAD
  24° · BEACH 25°), the greens rotate **32°** against the warm surfaces' **14°**, and the grass **crosses the
  channel-order boundary** (G→R max) — *the qualitative break, and it needs no threshold*. ⇒ **A correction
  mechanism gated on ONE light regime has a twin you have not written.** When you find a wash/tint/adaptation
  keyed to one end of the day, **ask what the illuminant looks like at the OTHER end, and which surfaces are
  its complement.** The tell, and it is precise: **214's own audit was banked as a SUFFICIENT test on a SPECIFIC
  HUE** (*"any warm surface landing near hue ~308 with chroma <15 has been rotated"*) — a test that **can only
  ever fire at night**, and so was structurally incapable of ever finding this. **Audit by `dHUE` — the
  surface's angular distance from its OWN daylight self (221) — which is meaningful under ANY illuminant.**
  ⇒ **AND THE FIX IS A DIAL ON THE MECHANISM YOU ALREADY HAVE, NOT A SECOND ONE.** `washRGB` took one extra
  argument (`w = max(nightDial, gold)`, defaulting to 0) and the complement set — `LEAFN`, *the artifact's own
  word for "anything that grows"* — passed it. The warm callers pass **nothing** and stay **byte-identical at
  every hour**, which is what keeps the lap from *fighting the light*: the land is diffuse and it **should**
  blaze at dusk (257). **Do not de-warm the scene to fix this; protect the complement.** The lap that damps the
  whole illuminant is the one that makes the parks look *unlit*, and an agent will say so.
  ⇒ ⚠ **AND THE DIAL MUST READ THE QUANTITY THE COLOUR CACHE IS KEYED ON.** The obvious signal was `GWARM` — and
  it is **wrong**, because `CCACHE` is flushed precisely when **`TINT`** changes, so a `GWARM`-derived dial can
  serve a **stale colour** whenever the two fail to co-vary. Deriving it from `TINT` instead (`TINT[0]-TINT[2]`,
  the illuminant's own warm-cool) makes the cache correct **by construction** — 261's law (*a rule you must
  remember is worse than a rule you cannot break*) arriving on a **cache** instead of on a call order. **Before
  keying a draw to a global, ask what invalidates the memo in front of it.**

- **AN AREA-MEAN IS THE INSTRUMENT FOR A *WASH* AND IS STRUCTURALLY BLIND TO A *MARK* — IT DIVIDES YOUR FEATURE BY ITS
  OWN COVERAGE RATIO, AND IT WILL TELL YOU TO REVERT SOMETHING TWO BLIND AGENTS CAN SEE (iter 266).** 255's law is right:
  a pixel COUNT is not an AMPLITUDE, so state the magnitude as `d` against the surface's own grain — and 255 built
  `probe-seaamp` to do it. 260 then warns: check your banked probe is not built on the one dimension your feature holds
  flat. **266 is the third member, and it is about the DENOMINATOR.** `probe-seaamp` averages the luminance shift over
  **every pixel of the host region** (456,863 sea px). That is exactly correct for what 255 built it for — a *wash*, a
  field painted over the whole surface. A **windrow paints 2% of the ocean**, so the same instrument divides a mark
  sitting at **d≈0.9 where it is actually drawn** down to **d=0.38 over the region** — *below 255's own "invisible"
  case (0.57)*. **The banked probe that the cue itself NAMES would have graded a 9–11x improvement as "no change" and
  killed it.** ⇒ **Before pointing a region-mean probe at an ornament, compute what fraction of the region the ornament
  COVERS.** For a sparse mark the amplitude is **per-pixel-where-it-is-drawn** (`ink / movedPx`), never `ink / regionPx`
  — and the *salience* question does not belong to a probe at all: **it belongs to the blind agents, who are the only
  instrument this loop owns that measures whether a thing is SEEN.** The tell, and it is checkable before you run
  anything: **your feature is SPARSE and LOCAL, and your instrument's denominator is the WHOLE HOST.** (This is 228's
  law recursing an **eighth** time — every time, on an instrument the harness already owned.)
  ⇒ **AND THE CONSTRUCTIVE HALF IS THE WAY PAST A LATTICE: LENGTH IS THE ONE DIMENSION A HEXAGON CANNOT QUANTIZE.**
  255's ⛔ (a per-hex field painted as a flat fill terraces onto the lattice, so it is invisible or a quilt with nothing
  between) forecloses *width* and *tone* on a tiled surface, and 214 forecloses the per-EDGE stroke. What is left is a
  shape that runs **ALONG** the tiling rather than **WITHIN** it: sub-hex in **width** (so it never lands on an edge and
  has nothing to terrace) and **multi-hex in length** (so the eye integrates it as a coherent mark and it survives the
  downscale to fit zoom). A 2 CSS-px × 60 CSS-px streak at d≈0.9 is *seen*; the same ink as a 2×0.7 px speck is not.
  ⇒ ⚠ **AND ITS DIRECTION IS A Z-ORDER DECISION, NOT A LOOK.** A mark that crosses tile boundaries is, by construction,
  drawn during ONE cell and lying across OTHERS — so **draw order is depth order** applies to it (211). Point it at
  cells still to come and every one of them paints it out; **trail it back over cells already painted** (here: upwind,
  west and slightly north of its anchor) and nothing can cover it, with no z-sorting, no second pass and no clip. Walk
  its own extent to truncate it at the first cell that is not a valid host, and it can never stray onto one that is
  wrong (248's bound-by-EXTENT-not-by-ANCHOR, arriving as a *constructor* rather than as a cull). The tell: your new
  ornament is longer than the cell that owns it.

- **A PIN IS A LITERAL ONLY UNTIL SOMEBODY GIVES THE CURVE A NEW INPUT — AND THE LAP THAT ROTS YOUR CAMERA IS THE LAP
  THAT *IMPROVES THE ARTIFACT*, SO NOTHING WILL EVER FAIL AT THE TIME (iter 264).** 202 says: take the light pins from
  the curve, never from intuition. It is right, it fixed a real bug — and then it **wrote the answers down as literals**
  (`day 0.30, golden 0.68, night 0.92`), in the recipe *and* in the tool, under a header boasting that the pins came
  "from the light curve's own keyframes rather than from a guess." **That was TRUE when written**: the curve had no
  `year` term, so a fixed `t` really was a fixed phase. Then **261 gave the season a DAY LENGTH** (`sunWarp` warps the
  curve's time axis) — an unambiguously *good* change, which passed every gate — and **every pin in the camera silently
  became a guess again.** Cost, measured at the next step-back: golden shot at **`GWARM` 0.36 of a possible 0.786**
  (under half strength, for four iterations, so *every golden read in that window was of a frame that wasn't golden*),
  and the seasonal-contrast frame shot at **`t=0.30`, mid-morning — where a day-length season is ZERO BY CONSTRUCTION**
  (`probe-daylen`: `d(LUMA)` **0.15**, *below* 254's `d<0.4` floor and **sitting on top of the probe's own NOON
  CONTROL at 0.09**, against **1.58** at the evening margin). **The camera was shooting the control and calling it the
  treatment**, and four agents on two seeds duly FAILed the city for *"winter is indistinguishable from day."* **They
  were right about the pixels. The city was innocent. The feature was enormous.** ⇒ **A camera pin must be DERIVED
  FROM THE CURVE AT SHOOT TIME, never stored** — `shot-stepback` now searches for the argmax of `GWARM` and inverts
  `sunWarp` for sunset, so it re-derives itself against whatever the light has become. This is 223's law (*prefer a
  structural invariant to a checked one*) arriving on **the instrument**: a stale pin cannot be *noticed*, because the
  frame it produces is a perfectly valid frame of the wrong moment. **The tell — and it is the only one you get:** your
  feature is a *function of a signal*, and your camera names that signal with a **number you typed**. Two corollaries:
  ⇒ **(a) A THRESHOLD IN THE MODEL AND A PIN IN THE CAMERA LIVE ON DIFFERENT AXES THE MOMENT ANYONE WARPS ONE.**
  `SUNUP`/`SUNDN` are thresholds on the **warped** clock (`SUNT`); the camera tested them against the **wall** clock
  (`dayT`) and so printed `sun=UP` on a winter dusk whose sun had **already set** — the caption denying the one fact
  the frame existed to show (258). **When a lap introduces a remap, `grep` every reader of the remapped quantity and
  ask which axis it is on.**
  ⇒ **(b) FOR A SIGNAL THAT IS ZERO SOMEWHERE BY CONSTRUCTION, SHOOT IT AS A *DISCRIMINATING PAIR*, NEVER AS A SINGLE
  FRAME.** A day-length season is null at noon and loud at dusk; a single "winter" frame gives an agent nothing to
  compare against and it will confidently report an absence. Shoot **both seasons at ONE wall-clock instant chosen so
  the two disagree maximally** (here: midway between the two sunsets ⇒ sun **UP** in summer, **DOWN** in winter), hide
  the labels, and **cross the mapping between seeds** (238). Both blind agents then named winter **from the light
  alone**, one of them reciting the mechanism unprompted (*"sun already set = shorter day = winter"*). **A pair the
  agent must discriminate is worth more than any number of frames it can merely describe.**
  ⇒ ⚠ **AND THE LAW RECURSED ON THE VERY NEXT LAP, BECAUSE 264 FIXED THE *CAMERA* AND LEFT THE *PROBE* (iter 265).** 264
  derived `shot-stepback`'s pins from the curve and declared they *"cannot rot again."* They cannot. But
  **`probe-goldenhue` — the instrument the ledger's #1 cue NAMES — still pinned golden at a literal `t=0.68`**, so the
  loop's *measurement* of its loudest defect had never been taken at golden either (**`GWARM` 0.36 of 0.779**), and the
  cue had been graded through a half-strength pin for its whole life. ⇒ **A stale pin is a property of a CURVE, not of a
  FILE: when you fix one, `grep` every OTHER reader of that curve and fix them in the same lap.** This is **262's law
  arriving on the HARNESS** (*a fix applied to an entity is not applied to its dependents*), and the tell is identical —
  your fix's own header explains why a typed constant is the wrong way to name a signal, and another file in the same
  directory still types it.
  ⇒ ⚠ **AND A SUPPRESSION MASK'S THRESHOLD SELECTS *OPACITY*, SO A LOW ONE MEASURES THE BACKGROUND (iter 265; sharpening
  234).** 234 says loud-paint `BASE[name]`, diff in one page, and the changed pixels **are** that draw. True — but *how
  much* a pixel changes is proportional to **how much of that draw is IN it**, so a threshold of `d>24` against a
  ~419-unit full-opacity swing admits pixels that are only **~6% the thing you are measuring** and **94% whatever lies
  under it**. Averaging their *shipped* colour then reports the **background**: faint alpha-blended green specks lying on
  TAN ground dragged the greens' mean **8 RGB units toward orange** and reported the grass as R-dominant when the grass
  **FILL** was not — which nearly cost a correct fix a doubling of its constant. ⇒ **Set the mask threshold as a fraction
  of the loud-paint's OWN full-opacity swing, not as a small integer**, and say which opacity you kept. The tell: your
  mask's cutoff is a number nobody chose for a reason, and your subject is drawn with **alpha**.

- **A SPREADING RULE IS *SPARK + SPREAD + REFRACTORY*, AND A LAP THAT ONLY FIXES ITS *HOST* WILL SHIP A RULE THAT STILL
  CANNOT RUN. CHECK THE SPARK'S **SAMPLE SPACE**, NEVER ITS RATE (iter 263).** 218 says measure a roll's conversion rate
  before tuning it; 231 says a rule can select for its own burial. 263 is the third member and it hides in the one clause
  nobody reads, because *the rest of the rule is correct*: Solvista has shipped a genuine **excitable-media CA** — bloom
  7 ticks, 14-tick refractory, neighbour spread, rain-front seeding, five flower specks and **butterflies**, and a tooltip
  printing `In bloom / Gone over / Not in flower` — since its **first iteration**, and it **had never once run in the year
  anybody looks at** (measured: **0 hexes in flower, on 6 seeds in 6**). Two independent causes, and *fixing either alone
  ships nothing*: (a) its host `T.MEADOW` is in **`RAISEABLE`**, the set the development pass **builds on**, so the city
  ate it — **68 → 4 hexes (93%)** — which is **206's law arriving on a CA's HOST** instead of a siting rule's pool; and
  (b) its spontaneous spark samples **`(rng()*G)|0` over the BOUNDING SQUARE**, three quarters of which is **`VOID`** (the
  plate is a hexagon — the invariants' own warning), so its chance of landing on a host is **~0.0017/tick: one spark per
  574 ticks.** ⇒ **A spread rule's ignition is a *distribution over a space*, and the space is usually wrong before the
  rate is.** Ask what fraction of the sampled space is *eligible* — if the answer is 2%, the rate is irrelevant and no
  amount of host-fixing will light it. The tell: **your CA is textbook-correct, its draw is beautiful, and its output is
  a flat ZERO that nobody has ever questioned** (236: when the answer is a constant by construction, the constant *is* the
  defect, and no threshold need be invented).
  ⇒ **AND THE HALF I WOULD HAVE MISSED WAS FOUND *ONLY* BY 250'S POSITIVE CONTROL — PUT THE MECHANISM'S OWN CORRECT
  SIBLING IN A COLUMN THAT MUST MOVE.** The gate carried **the MEADOW at 1985**, where the host still stands (61–96
  hexes) — a correct sibling of the very rule under test. It came back **dead on 5 seeds in 6.** *An excitable medium
  that dense cannot be that quiet*, so the instrument or the rule was broken — and that impossibility is what convicted
  the spark. **Without it I would have swapped the host, seen the wave still fail, and called it a tuning problem.** The
  tell: your fix targets a *host*, and you have nothing in the run that is required to work *for the host it already had*.
  ⇒ **AND THE SECOND CONSTRUCTIVE HALF: A POPULATION THAT SHARES A CONSTANT TIMER *SYNCHRONISES*, AND THE FIX IS FREE.**
  With one shared `-14` refractory the whole band bloomed and went over **as one**, so **41% of all ticks had not a single
  flower anywhere in the city** and half the seeds *opened on bare grass* — a passing mean hiding an all-or-nothing
  medium. Jittering it (`9..18`, mean **13.5 ≈ HEAD's 14**, so 98's hold-the-mean is free) desynchronises the waves and
  the grass is never bare. **Take the jitter from a uniform the cell ALREADY carries** (`c.v = hashCell(x,y,seed)`) ⇒
  **zero new random draws** (262's law, arriving on a *cell* instead of an entity). The tell: every member of a population
  runs the same clock, and your metric is a *mean* rather than a *worst case* (233: gate on the worst seed).
  ⇒ ⚠ **AND THE TRAP THAT ONLY THE CAMERA CAUGHT: A TICK-SALTED HASH NEEDS ITS COUNTER RESET BY `genWorld`.** Moving the
  CA's randomness off the shared `rng()` onto `hashCell(x,y,seed^SALT^TICKN)` is right — it makes the rule **wholly
  inert** (it writes one field and *cannot* perturb a metric it does not touch, so a wildflower can no longer move a
  tower; census `pop`/`roads`/`developed` came back **+0**). But `TICKN` **survived a world rebuild**, so the same seed
  rendered *different flowers* depending on how many frames had run — the artifact's first invariant, broken. **Only the
  self-reporting frame caught it** (202): the caption said `0 hexes IN FLOWER` where the probe had measured 6. **Any
  per-tick salt is part of the WORLD — reset it with the world.**
- **WHEN YOU FIX A RULE, GREP THE *DRAW FUNCTION* FOR THE OTHER THINGS IT DRAWS — A FIX APPLIED TO AN ENTITY IS NOT
  APPLIED TO ITS *DEPENDENTS*, AND THE UNFIXED SIBLING IS USUALLY *INSIDE THE FUNCTION YOU JUST EDITED* (iter 262).**
  217 says: when a rule decides both *whether* and *how much*, a fix to one clause is mistaken for a fix to the
  phenomenon. 224 says: grep for every rule that **writes** the field. 262 is the third sibling and the most embarrassing,
  because the defect does not hide in another file — **it hides three lines below the fix.** Iter 210 gave every resident
  a per-resident bedtime (`pedHidden`), explicitly to stop the crowd "blinking out in a single frame at dusk", and wrote
  that reasoning into a comment. **`drawPed` also draws a CHILD beside ~18% of residents, and the child stayed on the very
  gate 210 was written to condemn** (`if(p.kid && LITAMT < 0.5)`). `LITAMT` is **global and monotone**, so that threshold
  fires for **every child in the city in the same frame**: measured, `DISTINCT BEDTIMES = 1` on every seed, mean
  `nightAmt` **0.009** — *the first dark frame there is* — while their parents walked on for hours (mean `out` 0.85) and
  **not one child in any city was ever taken home by one.** It survived 52 iterations because *"the children go home at
  dark"* is **true**, and nobody read it beside the line above it. This was the **fourth** recursion of one gate (199 the
  windows · 210 the residents + joggers · 230 the traffic · 262 the child). ⇒ **After you fix a per-entity rule, `grep`
  the function you fixed for every OTHER draw it issues, and ask whether each keeps the same kind of state.** The tell:
  your fix's own comment explains why a *global* signal was the wrong gate, and the same function still contains one.
  ⇒ **AND THE COROLLARY IS A FREE, EXACT CONTROL: TAKE A PER-ENTITY JITTER FROM A UNIFORM THE ENTITY *ALREADY HAS*,
  NEVER FROM A FRESH `Math.random()`.** 204 warns that a stubbed **shared** stream makes a per-entity control worthless,
  because your patch draws a different *number* of values and everything downstream walks a different walk. The escape is
  not a better control — it is **to draw nothing at all**. `p.kid` was already `1 + Math.random()*6`, so `(p.kid/6)%1` is
  **exactly** uniform on [0,1) *by construction* and costs **zero** draws ⇒ the seeded `rng()` stream **and** the shared
  `Math.random` stream both stay **byte-identical**, and the probe's must-not-move column (the adults' curfews) comes back
  **identical rather than merely close** — which is what makes a "nothing else moved" claim provable instead of asserted.
  **Before adding a random draw to an entity, check what uniforms it is already carrying.** (This is 249/261's
  re-index-an-existing-curve law, arriving on the *PRNG* instead of on a lookup.) (`probes/probe-kidbed.mjs`.)

- **A SIGNAL THAT CANNOT BE SEEN ON THE CHANNEL YOU PAINTED IT ON IS USUALLY NOT A LOOK AT ALL — ASK WHAT THE SIGNAL
  IS A SIGNAL *OF*, AND PAY IT IN THAT COIN (iter 261).** 260's law is the diagnosis (a global multiplicative chroma
  cast is exactly what colour constancy divides out, so the season was 1.2x *louder* than the golden hour and seen by
  nobody). 261 is the **way through**, and it generalises past colour: **the season is not a colour, it is a CLOCK.**
  The fix touched no palette and no draw — it warped **the light curve's TIME AXIS** (`sunWarp`: one sine, fixed at
  solar noon and solar midnight), so winter's sun *rises late and sets early*. The season's luminance went
  **d 0.09 → 1.59**, i.e. **2.3x the golden-hour bar**, and three blind agents ranked it correctly on the first try.
  ⇒ **When a feature measures large and reads as nothing, stop tuning its amplitude and re-ask what DIMENSION the
  thing actually lives in.** The tell: your feature is a *property of the world* (a season, an hour, an age, a
  weather) and you have implemented it as *a tint*.
  ⇒ **AND THE DESIGN THAT MADE IT SAFE IS REUSABLE: WARP THE *INPUT* OF AN EXISTING CURVE, NEVER THE CURVE'S OUTPUT.**
  Every downstream quantity (the sky, the tint, `LITAMT`, the sun's x and y, `SHOFF`/`SHLEN`/`SHAMT`) is a **pure
  function of the clock**, and the warped clock has the **same range** as the clock ⇒ **nothing can leave the envelope
  HEAD already renders.** The sun literally *cannot* be lowered into the placard (200's ⛔, satisfied **structurally**
  rather than by care — 223), and it hits its identical peak in every season because `sin(0)===0`. A remap of a lookup
  the frame was doing anyway is also **free**: path objects **+0.03% day / −1.1% night**. **Before adding a new field,
  check whether the thing you want already exists as a curve you can re-index.**
  ⚠ **AND THE COROLLARY THAT COST A ROUND — TO PROVE AN *EXACT* FIXED POINT, PIN THE **SIGNAL**, NEVER THE PARAMETER
  THAT PRODUCES IT.** 245 says centre the lever so it collapses to HEAD's literal at one pin; 253 says write the
  normaliser so that pin is exact by construction. Both assume **you can reach the pin.** You often cannot: `year =
  2035.87` **is not representable in float64**, so `year%1` lands ~1e-13 off, `seasonCool()` ~1e-9 off 0.5, and the
  lever comes out **−1.8e−10 instead of 0** — the `if(d===0)` guard never fires. And a 1e−10 nudge is not harmless,
  because **the artifact is full of QUANTIZERS** (`seaFace` rounds to 32nds, `colMix` quantizes `t`, `CCACHE` keys):
  one bucket flips **for the whole sea at once**, and the "byte-identical" frame reads **332 px**. ⇒ **Stub the
  PREDICATE to its mean** (`seasonCool = () => 0.5` ⇒ the lever is 0 *by arithmetic*) — it is build-symmetric, exact,
  and it took the fixed point to **0 px**. The tell: your fixed point is "the year where X = its mean", and you are
  about to reach it by setting a float.
  ⚠ **AND: A CORRECTNESS THAT RESTS ON CALL ORDER IS A LATENT BUG, NOT A DESIGN.** 261 cached the warped clock in a
  global set inside `render()`; `syncSky` read it, and the app's `frame()` happens to call `render(); syncSky()` — so
  the app was never wrong. **My own camera called them the other way and painted a night sky behind a daylit noon
  city**, and an agent correctly FAILed it. The fix is not to document the order — it is to **delete the dependency**
  (`syncSky` now warps its own clock; one `sin()` per 400ms). This is 227/243's law arriving on a *hidden invariant*
  instead of a probe: **a rule you must remember is worse than a rule you cannot break.**
- **THE EYE DISCOUNTS AN ILLUMINANT — A *PURE-CHROMA* CHANGE IS INVISIBLE NO MATTER HOW BIG IT MEASURES, AND THE
  NORMALISER YOU ADDED TO KEEP IT HONEST IS WHAT REMOVED THE ONLY CHANNEL IT COULD HAVE BEEN SEEN ON (iter 260).**
  214 says a greyscale probe cannot see "mauve" ⇒ *measure colour*. 260 is that law's **converse**, and it is the one
  that will cost you a whole feature: **the viewer's instrument is not symmetric.** 253 gave the sunlight a calendar —
  correctly, provably, with a byte-identical fixed point — and at the 32nd step-back **four blind agents, on two seeds,
  reported no season at all** (*"no cooler light"*, *"winter is indistinguishable from summer"*). They were right, and
  so was 253. The natural experiment settles it, because the artifact ships a light change everybody *does* see:
  | light change | warm-cool (R−B) | **luminance** | seen? |
  | --- | --- | --- | --- |
  | golden hour (the **incumbent bar**, 226) | +24.9 (d **0.43**) | **−24.7 (d 0.69)** | instantly, every agent |
  | winter (253's season) | **−30.2 (d 0.52)** | **−3.4 (d 0.09)** | **by nobody** |
  **The season moves the colour axis 1.2x HARDER than the golden hour does and is invisible; the golden hour moves
  LUMINANCE 8x harder and is unmissable.** The chroma amplitude is not the problem — *the season is a global
  multiplicative cast on every surface at once, which is precisely the transform the visual system divides out.* It is
  what colour constancy is FOR, and it is what a white-balance algorithm is built to remove. A viewer reading one frame
  at a time (which is how the visual gate reads them) re-normalises it away and sees "a normal daylit city." ⇒ **A
  global illuminant is the one signal you cannot deliver in chroma.** ⚠ **AND THE TRAP IS THAT THE FIX IS A LAW: 223
  says normalise a gain triple's magnitude so luminance cannot drift — and it is RIGHT, on a ladder of PER-SURFACE
  washes, where drift is a bug (222).** Applied to a **whole-scene illuminant**, that same normaliser (`n = 1/(1−K·c)`,
  *"winter comes out COOLER and never DIMMER"*) is not a safeguard, it is a **castration**: it zeroes the only channel
  the eye reads. **A law derived on a per-surface mechanism does not automatically hold on a global one** (257's
  re-read-the-mechanism law, arriving on a law of our own). The tell: **your feature is a multiplicative tint applied
  to every surface in the frame, and you are proud of holding its luminance flat.**
  ⇒ **AND THE COROLLARY THAT NEARLY COST THE STEP-BACK ITS FINDING — 228'S LAW, RECURSING A *SIXTH* TIME, ON THE PROBE
  I REACHED FOR FIRST.** The banked magnitude rig (`probe-seaamp`, 255) is domain-agnostic, takes two PNGs, and is
  exactly the instrument the situation calls for. It reports **LUMINANCE** — its header says so in the first line — and
  it duly graded the season at **mean 6.4, median 2.0, d=0.27** and would have let me file *"the season is real but
  sub-threshold; tune it up"*, which is **false in both halves**. I was measuring, with a greyscale instrument, the one
  dimension the feature is **normalised to hold at zero.** ⇒ **Before you point a banked probe at a feature, read the
  feature's own diff for the dimension it deliberately DID NOT move — and check your probe is not built on it.** A
  probe aimed at a design's own null space returns a small honest number and a completely wrong verdict.
  (`probes/probe-seasonhue.mjs`: warm-cool **and** luminance, both as `d` against the plate's own grain, with the
  identical-pin floor at **exactly 0** and golden hour carried as the bar I did not invent.)
- **A FIELD WITH A FLOOR CANNOT EXPRESS AN ABSENCE — WHEN YOU DRIVE A SIGNAL TO ITS MINIMUM, GO AND LOOK AT WHAT THAT
  MINIMUM *RENDERS* AS (iter 259).** 205 says state the claim in the viewer's units; 254 says a regional signal dies
  under a per-object grain. 259 is the third member, and it is the one you will walk into while doing everything else
  right, because **your probe will award you a PERFECT SCORE.** The observatory's label had promised *"a dome out on
  the dark rim"* for the artifact's whole life while the siting rule was a uniform random scatter — a real defect (10
  seeds: `obs.lit` **0.389** against a random-lot expectation of **0.310**; on one seed the dome stood at `c.lit`
  **1.000**, the field's maximum, **two hexes from the CBD**). The fix drove `c.lit` to **0.000 on every seed**:
  capture of the available darkness **0.057 → 1.000**. Flawless — **and the ambient luminance around the dome moved
  −1.9%, which is nothing, and a blind agent said so in as many words** (*"ringed by lit towers… neither is stranded
  out in the dark"*) **and was RIGHT.** The reason is one constant: the draw is `lit = LITAMT*(0.35 + 0.65*c.lit)`, so
  **`c.lit = 0` is not *dark*, it is *35% lit*** — the rendered range is **2.9:1**, not ∞:1, and it is swamped by
  everything else in the hex that never reads the field at all. ⇒ **Before you optimise a field, read the LINE THAT
  CONSUMES IT and compute its rendered dynamic range.** A field can be perfectly real, monotone, and rot-proof — and
  still be **fine as a CHOOSER and dead as a LOOK**. The tell: **your feature's success metric is "signal X goes to its
  extreme", and X reaches the pixels through an expression with an additive floor** (`a + b*X`), a clamp, or a `max()`.
  ⇒ **AND THE COROLLARY THAT SAVED THE LAP: WHEN THE HEADLINE DIES, THE PROBE YOU BUILT TO KILL IT IS USUALLY STILL
  HOLDING THE REAL FINDING.** The probe written to answer the *viewer's* question (how much lit city SURROUNDS the
  dome) also measured, in the same run, the thing nobody had asked: **HEAD buried its own one-per-city landmark at a
  mean of 54.5%, three seeds in six more than HALF buried, and on one seed the observatory rendered EIGHT PIXELS**
  (97.8% occluded, behind the towers of the CBD it had been dropped into) — independently confirmed, blind, by an
  agent who said *"I cannot find it."* **Siting for darkness alone halved that BY LUCK and buried one seed WORSE than
  HEAD did** (80.8% vs 28.0%), because nothing scored the sightline. Two gates on one feature, made to point the same
  way (244) with the predicate the artifact already ships (`groundLoad`, 231): **54.5% → 5.9%, 0/6 buried, worst seed
  97.8% → 12.2%.** ⇒ **A dead headline is not a dead lap. Re-read your own instrument's other columns before you
  revert** — and note the shape: *the label was right about the PLACE and silent about the thing that mattered.*
- **WHEN THE EXPECTED RESULT IS AN *ABSENCE*, A FRAME WITH THE SUBJECT *MISSING* IS INDISTINGUISHABLE FROM A FRAME
  WHERE THE SUBJECT CORRECTLY SHOWS NOTHING — SO THE FRAME MUST SELF-REPORT THE SUBJECT'S **PRESENCE** (iter 258).**
  202 says make every frame self-report its own state; 236 says say it in the *viewer's* units. 258 is the case where
  a missing self-report produces not a false FAIL but a **false PASS**, which is far worse because nothing argues with
  it. The cab's roof lamp is a FOR-HIRE sign: **hired ⇒ the lamp goes DARK**. The close-up aimed at a hired cab framed
  a **TOWER** — the cab was buried behind it — and the agent duly reported the roof lamp as **DARK** and returned
  **VISUAL: PASS**. *It was right about the pixels and the pixels contained no cab.* **An absent subject and a
  correctly-negative subject render the same frame.** ⇒ **Any gate whose success condition is "X is not there / X went
  out / X is empty" must first prove X's HOST is in the frame** — print it in the caption (`nearest cab 0px
  off-centre, HIRED(lamp must be DARK)`), and make the *positive* twin (the vacant cab, lamp LIT) a required companion
  frame so the agent has to *discriminate* rather than merely confirm. This is 250's must-not-move column arriving on
  the **camera** instead of on the probe: a count going *down* needs something required to stay *up*. The tell: your
  agent's correct answer and its answer on an empty frame are **the same word**.
  ⇒ **AND THE MECHANISM THAT PUT THE TOWER THERE IS A LAW OF ITS OWN: THE PREDICATE THAT MAKES A BEHAVIOUR
  *MEANINGFUL* CAN BE THE PREDICATE THAT *BURIES* IT.** 206 says a ground-level thing in dense fabric is often
  invisible — as if density were bad luck. It is not luck, it is **selection**. The cab stops only at a `livelyKerb`
  (*a road with ≥2 ATTRACT neighbours*), which is **by construction** the ground with tall shopfront frontage drawn in
  the row **in front** — draw order is depth order, so **the siting rule is positively correlated with occlusion**
  (measured: the standing cab rendered **14px** of visible ink against **154–167** for cabs elsewhere). ⇒ **When a
  feature is sited by "somewhere interesting", ask what "interesting" is MADE OF** — if it is made of tall neighbours,
  your feature is choosing its own wall. Price it with 206's two ledgers before you shoot.
  ⇒ **AND THE COROLLARY THAT COST THE ROUND EVEN THOUGH I *OBEYED* 226: AN ARGMAX OVER n=1 IS NOT AN ARGMAX.** 226
  says aim by measured ink, never by a tile predicate — I did, and it **still** framed the wall, because the frame
  held exactly **one** hired cab and an argmax with one candidate is a lottery ticket. **A sparse feature's
  best-exposed instance may not exist in the frame you happen to freeze.** ⇒ **Take the argmax over TIME** (step the
  sim, re-measure each sample, keep the best), and **set the bar from the INCUMBENT, not from your own constant**
  (205/226): "well exposed" = *clears 70% of the mean **vacant** cab in the same frame*, i.e. as visible as an
  ordinary car in an ordinary place. The tell: your host population is a handful of movers.
  ⇒ **AND: A STILL FRAME CANNOT SHOW THAT SOMETHING *STOPPED*** (134, arriving on the **visual gate** rather than on a
  probe). *Stopped* is a claim about motion and no photograph can carry it; a stopped car and a moving car are the
  same pixels. **Do not tune such a frame — DELETE it**, gate the behaviour with a temporal probe, and aim the camera
  at **the STATE the behaviour leaves behind** (here: the lamp). The tell: your close-up is trying to prove a verb.
- **A TERRACE IS SEEN AS `STEP ÷ CHROMA`, NOT AS `STEP` — SO ANYTHING THAT *DESATURATES* A TILED SURFACE EXPOSES A
  LATTICE THAT WAS ALREADY THERE AND WAS ALWAYS FINE, AND YOUR DIFF WILL CONTAIN NO GEOMETRY AT ALL (iter 257).**
  255 says a smooth field sampled once per hexagon and painted as a flat fill is piecewise-constant on the lattice, so
  its steps land on the hex boundaries and the surface reads as a quilt. 255 learned that by **building** such a field.
  257 found the artifact **had one all along**: `seaTone` quantises depth to **eighths**, so two adjacent sea hexes have
  always differed by one eighth of the `waterSh`→`waterDp` ramp, painted as two flat fills. At **DAY** that step is
  **10.6** RGB units and *nobody in 256 iterations has ever called the day sea a quilt*. At **GOLDEN HOUR** the step is
  **SMALLER (8.7)** — and two blind agents, on two seeds, at 1:1 crops, unprompted and on **pristine HEAD**, both called
  it *"a clear hexagonal quilt… exposing the grid."* **The step did not grow. The CHROMA collapsed** (76 → 44: the warm
  golden tint is near-complementary to teal, so it cancels the sea's colour — 214's law arriving at dusk), and a terrace
  with no colour to hide behind stops reading as **water depth** and starts reading as **TILING**. Measured as
  `step/chroma`: day **0.14** (accepted for the artifact's whole life) · golden HEAD **0.20** (its worst) · night
  **0.08** · golden fixed **0.08** (its best). ⇒ **The quantity the viewer sees is the step RELATIVE TO THE SURFACE'S
  OWN COLOUR.** Two consequences, and the second is the one that will bite: (a) **you can fix a quilt without touching
  its geometry**, by giving the surface its colour back; (b) **any change that desaturates a tiled surface — a wash, a
  tint, a light, a fog, a season — MANUFACTURES a quilt out of a step that was already there and was fine**, and it will
  pass every geometry review because *it contains no geometry*. The tell: your surface is one flat fill per hex drawn
  from a quantised field, and something in your lap moves its **chroma**. (`probes/probe-seastep.mjs` — render-free, no
  clock, no noise floor; it asks `seaFace()` for its colour directly, so glints and foam riding *on top* of the fill
  cannot confuse it.)
  ⇒ **AND THE COROLLARY THAT NARROWS 255'S ⛔, WHICH WOULD OTHERWISE HAVE FORBIDDEN THE FIX: 255 BANS A *PER-HEX* FIELD
  IN A TILE FILL, NOT A *UNIFORM* ONE.** 255's ⛔ was written as *"do not paint a signal into the water's body colour"*,
  and read literally it kills this lap. But re-read its **mechanism**: the quilt comes from a field that is *sampled per
  hex*, so its quantisation steps land on hex boundaries. A term with **no `x` and no `y` in it** — one number for the
  whole ocean — moves every hex by the *same* amount and **introduces not one new spatial step**; it *cannot* terrace,
  and 257's uniform sky-mirror measurably **halved** the existing one (8.7 → 4.1). ⇒ **When a banked ⛔ would forbid
  your vector, go and re-read the MECHANISM it was derived from, not the sentence it was written as.** A law generalised
  one notch too far is indistinguishable from a law, right up until it costs you the fix.
  ⇒ **AND THE FIX'S OWN PRINCIPLE IS WORTH KEEPING: `albedo × TINT` IS RIGHT FOR LAND AND IS A CATEGORY ERROR ON A
  MIRROR.** Every land surface is a **diffuse** reflector — its colour *is* albedo × illuminant — which is why the
  golden tint duly saturates the sand, the roofs and the hills (chroma **+40..140%** on every land tile). **Water is
  SPECULAR: its colour is the SKY'S, not albedo × sunlight.** Passing it through the diffuse illuminant is the whole
  bug, and it is 209's law (*what large surface wears a field that cannot carry the signal?*) cashed on **the largest
  surface in the city**. So the sea takes **`GWST`, the OVERHEAD sky** (what a top-down sea faces), *not* passed through
  `TINT` — reflected light is not albedo, the same reason the lit windows take a raw literal. ⚠ **Two seductive
  alternatives, BOTH REFUTED BY ARITHMETIC BEFORE A LINE WAS WRITTEN — do not re-try either:** mirroring the **warm
  horizon** (`GWSB`) instead lands on `[121,130,111]`, **chroma 19, a murky olive** (teal and orange are complementary,
  so the blend passes through *grey* — 181's own comment says so, which is why its sun path is carried by **additive**
  glints and not by a wash); and merely **restoring the teal** the tint cancels hands back a *bright daytime sea*, which
  is the complaint stated **louder**. **The sea must not keep its noon colour — it must change to the RIGHT one.**
- **A SMOOTH FIELD RENDERED AS A FLAT PER-HEX FILL *TERRACES ONTO THE LATTICE* — SO A TILE-BODY WASH MAY BE SUBTLE OR
  IT MAY BE SEEN, AND IT CAN NEVER BE BOTH (iter 255).** 214 says a per-EDGE stroke cannot be both bright and
  grid-invisible, *because the hex geometry is always in it and contrast is the dial that reveals it*. 255 is the same
  law on the **per-HEX FILL**, and the reasoning that walks you into it is seductive: *my field is smooth in (x,y), so
  adjacent hexes agree, so no edges can pop.* **False.** The field is smooth; the **rendering unit is the hexagon**, so
  a smooth field sampled once per hex and painted as a flat fill is **piecewise-constant on the lattice** — and any
  quantisation you added for the colour cache lands its steps exactly on hex boundaries. Measured on the sea: the wash
  is either **d=0.57** against the surface's own grain (⇒ *both* blind agents, on the cleanest A/B the harness can shoot,
  reported **no visible difference** and one explicitly refused to invent one) or, at 2.5x gain, **d=1.15** (⇒ *"discrete
  hexagonal cells flipping between normal and pale — a high-contrast hex QUILT... camouflage / a tiled mosaic, not a
  sea"*). **There is no middle.** ⇒ **The artifact's own escape is the tell: the sun glitter does exactly this and gets
  away with it ONLY by being a LOW-ALPHA OVERLAY** (max 0.16) — i.e. by living permanently in the subtle regime and
  never trying to be seen. **If a signal must be SEEN on a tiled surface, it needs a SHAPE THAT CROSSES TILE
  BOUNDARIES** (a streak, a ribbon, a scatter of marks), not a fill that obeys them. This is 254's *"a SHAPE, an
  ORNAMENT, a COUNT — never a hue"* arriving through the **geometry** instead of through the grain. The tell: your diff
  modulates the colour handed to `hexTile`.
  ⇒ **AND THE COROLLARY THAT LET IT PASS EVERY GATE: A PIXEL *COUNT* IS NOT AN *AMPLITUDE*, AND YOUR PROBE'S THRESHOLD
  IS PROBABLY BELOW SIGHT.** `probe-seastate` scores a pixel as *moved* at `d > 6` — **2.7% of range, invisible** — so
  it reported the feature repainting **18–22% of the ocean (29–35x HEAD)** and I read that as a triumph. Re-stated as
  an amplitude it was **12.7/255 mean against a surface whose own within-region SD is 22.3**. **A count answers "did
  pixels change"; the viewer asks "how much".** ⇒ **When a probe's headline is a COUNT and an agent says it cannot see
  the thing, believe the AGENT and go and measure the MAGNITUDE** — in units of the grain it must be seen against (254's
  `d`). `probes/probe-seaamp.mjs` is the rig, and it is domain-agnostic: hand it two PNGs. The tell: your gate's
  tolerance is a small integer nobody chose for a perceptual reason.
- **A REGIONAL SIGNAL CANNOT BE PAINTED ON A CHANNEL A PER-OBJECT *GRAIN* ALREADY SCATTERS — THE GRAIN IS YOUR NOISE
  FLOOR, AND AN EARLIER LAP MAY HAVE DELIBERATELY *MAXIMISED* IT (iter 254).** 218 says the eye counts objects, not
  ratios; 224 says for a silhouette the viewer's statistic is the `max`, not the mean. 254 is the third member of that
  family and the one that will pass every gate you own: **your metric is the region MEAN, and the defect lives in the
  WITHIN-region VARIANCE.** The vector was the richest tell in the file — `c.age` is ticked at 36 sites, dates the
  current structure, and `describeTile` has published it as *"Built ~1998"* on every developed tile for the artifact's
  whole life, while **no pixel ever read it**. The host measured *perfect*: full 61-year spread, 81% of the stock ≥15yr,
  spatial coherence **0.40** (neighbours agree ⇒ quarters, not speckle), and a **monotone** core→rim gradient (inner
  rings 38–47yr, rim 23–27) — *the old town is downtown*, and the city had never shown it. The fix (RES/MID masonry
  taking a luma-normalised ochre lean from age) then passed **every gate the loop has**: census flat, luminance held to
  **0.6/255**, 222's night ordering **byte-identical to HEAD** (`*TOWER 131 *MID 123 *COM 119 | BEACH 98`, clearing by
  21), path objects **−0.03%**, isolation floor **exactly 0 px** (253), and the headline — **core-rim warmth gap 6.3 →
  29.9**, with HEAD's gap *changing sign across seeds*, the signature of a signal that does not exist. **And two blind
  agents, on two seeds, independently returned `NO REGIONAL PATTERN` — both having MEASURED the frame themselves**
  (251's tell). They were right. The masonry's `cream`/`terra`/`sandDk` lottery already scatters per-building warmth at
  **SD ~45** (R−B), which is **larger than the biggest core-rim gap the lever can ever reach** (32 on the worst seed, at
  full saturation): **Cohen's d = 0.87 / 0.40 / 0.73**, and on the seed the agent read, **0.40**. ⇒ **State a regional
  claim as the gap in units of the WITHIN-region SCATTER (`d`), never as a difference of means** — a ring mean averages
  the grain away and will happily certify a change nobody can see (214's necessary-but-not-sufficient corollary, on the
  *spatial* axis). The tell: **your feature is a smooth low-frequency field, and the surface you are painting it on
  already carries high-frequency per-object noise in the same channel.**
  ⇒ **AND THE CEILING IS STRUCTURAL, SO DO NOT TUNE — the normaliser SATURATES.** The obvious rescue (my span was too
  wide: the ring-mean ages span only ~17 years and I divided by 26, spending two-thirds of the lever's range on nothing)
  is real and it is **not enough**: swept, worst-seed `d` runs **0.40 → 0.58 → 0.65 → 0.65 → 0.64** and **plateaus below
  0.8**. Once the per-object signal saturates at ±1 the regional gap is capped by the *extreme colours*, while the grain's
  SD is fixed — so `d_max ≈ (colour range)/(grain SD)` and **only two things can move it: louder extremes (here:
  implausible blue stucco) or a quieter grain.** The grain was **bought on purpose** by 99/103/239 to kill wallpaper.
  ⇒ **THE TWO GOALS ARE IN DIRECT CONFLICT AND THE LOOP ALREADY CHOSE VARIANCE. Before designing any "the buildings
  should show X regionally" vector, price it against that grain first — the building COLOUR CHANNEL IS SPENT.** (`probes/
  probe-buildingage.mjs` = the host, render-free; `probes/probe-patina.mjs` = the `d` and the saturation sweep.)
- **A GATE BREACHED BY A HAIR, WHOSE PRESCRIBED FIX COSTS A HEALTHY GUARD, IS A GATE TO SUSPECT — AND "IS IT LIT?"
  IS AN *EXTREME*, NEVER A MEAN (iter 251).** 224 says a SILHOUETTE's statistic is the `max`; 251 is the same error on
  the *brightness* axis, and it had been steering the loop's **#1 🔴 cue for 24 iterations**. 222's invariant (*no UNLIT
  surface may out-brighten the LIT ones*) is right, and it was scored on each tile's **MEAN** — but **a building reads
  as lit because of its WINDOWS**, a handful of 240-luminance panes against a dark wall, *not* because its hex average
  is high. A mean folds the dark body back in, so a **flat pale surface** (sand: uniform, mean == envelope) can
  "out-brighten" a lit high-variance one **while looking obviously dimmer to any eye**. It duly did: `BEACH 96 >= MID
  95` ⇒ FAIL. ⚠ **AND THE PROBE HAD NEVER ONCE SAMPLED A LIT WINDOW** — it read `getImageData(sx,sy,1,1)`, **one pixel
  at the hex centre**, which on a building lands on its **ROOF** (238's point-sample defect, **recursing a fourth
  time**, inside a probe the header already warned about). The invariant was comparing *the beach's sand to a
  building's roof*. Re-scored on the **p90 envelope** over the hex's **area**, **pristine unmodified HEAD PASSES by
  21** (`*TOWER 131 *MID 123 *COM 119 | BEACH 98`), and the same fix reveals the point sample was distorting the *hue*
  guards too (PARK's *"26° off its daylight self"* is **1°** in area units). ⇒ **Two tells, and either one should stop
  you: (a) your gate FAILS by ~1 unit and the fix it prescribes DAMAGES something measured and healthy** (dimming the
  sand to satisfy the mean cost `BEACH↔ROAD` **24 → 18**, walking it back toward 214's asphalt — *the cure was the
  disease*); **(b) blind agents MEASURE THE FRAME and report the opposite of your probe** (both said the shore is *"a
  quiet dark ribbon"* at ~90 against a **frame max of 237–244**). **When a probe and an agent disagree, ask what each
  is LOOKING AT before re-running either** (200/205) — here the probe was looking at a roof. This is **229's law
  arriving on an INVARIANT instead of a serving condition**: the cue was *re-confirmed twice*, and every
  re-confirmation used the same broken instrument. **A defect only your harness can see is a defect in your harness.**
- **SUPPRESS THE *PREDICATE* — THE FOURTH MEMBER OF THE SUPPRESSION FAMILY, AND THE ONE THAT NEEDS NO HEAD FILE AT
  ALL (iter 253).** 226 suppresses the **DRAW** (stack-match its call sites), 230 the **DECISION** (mutate the state
  the feature reads), 234 the **COLOUR** (loud-paint `BASE[name]`). 253 adds the cheapest: when your feature is
  written as **`HEAD + K·signal`** — which is what every *centred* lever (245) and every *"make X answer Y"* vector
  (196) looks like — you can isolate it by forcing its **predicate function** to zero on `window` and re-rendering
  **inside one page**: `window.seasonCool = () => 0` makes `c=0`, the branch is skipped, and `daylight()` runs HEAD's
  code path *exactly*. The difference between the two renders **IS** the feature, at a floor of **exactly 0**, off
  the final composited canvas (occlusion free), and it is **build-agnostic** — no `git show`, no `/bin/cp`, no
  cross-build floor, no 197-class stale-backup hazard. ⇒ **Reach for it whenever a top-level `function` gates your
  change.** The tell: your diff adds one predicate and multiplies existing constants by it.
  ⚠ **AND THIS IS NOT A CONVENIENCE — A CROSS-BUILD DIFF *CANNOT* PROVE AN EXACT ZERO (230, and it cost 253 a round).**
  253's first cut diffed patch-vs-HEAD and carried a HEAD-vs-HEAD floor **in the same run** (213), doing everything
  the laws ask: `addInitScript` PRNG stub, clocks pinned before `genWorld`, `STARS`/`flock`/`clouds` cleared, **every
  mover array emptied**. The floor still read **20,000–34,000 px** — two loads of the same file drift that far — so
  the fixed point's "0 px" was unprovable and its controls read 31k–34k, *indistinguishable from the drift*. **You
  cannot claim EXACTLY 0 from under a floor of 20,000.** The way out is never a tighter freeze; it is to stop leaving
  the page.
  ⇒ **COROLLARY — A CENTRED LEVER'S FIXED POINT CAN BE DESTROYED BY FLOAT ERROR IN ITS *NORMALISER*, SO WRITE THE
  NORMALISER IN TERMS OF THE SIGNAL, NOT OF THE GAINS.** 245 says centre the lever so it collapses to HEAD's literal
  at one pin; 223 says normalise a gain triple's magnitude. Do both the obvious way and they **fight**:
  `n = 1/(gr*0.30 + gg*0.59 + gb*0.11)` does **not** return exactly `1.0` at `gr=gg=gb=1`, because `0.30+0.59+0.11`
  is not 1.0 in float64 — so the "byte-identical" pin would have drifted `tint`'s last bit, on the very frame the
  whole proof rests on. Write it as **`n = 1/(1 − K·c)`** (K = the triple's luma deficit, here 0.0308): algebraically
  identical, **exactly 1 at c=0 by construction**. A fixed point you can *prove* beats one you got away with.
- **WHEN YOU RESTORE A SIGNAL THAT WAS MISSING *GLOBALLY*, THE OLD PROBE'S **CONTROL** BECOMES YOUR HEADLINE — AND IF
  YOUR FIX LIFTS *EVERY* ROW OF A METRIC PAST ITS FLOOR, ASK WHETHER YOU FIXED THE SUBJECT OR MOVED THE INSTRUMENT'S
  BASELINE (iter 253).** 251 says a metric that flatters you is a metric to distrust. Here is the constructive twin.
  The season was missing from the **light**, which falls on *everything* — so the honest witness is the surface that
  is **season-dead by palette**: `probe-seasonarea`'s **`ROAD` control**, its designed "honest zero" (3.5), moved to
  **20.1**. Asphalt has no seasonal palette entry, so *its entire shift is the illumination* — an unarguable proof
  that needs no threshold and that the instrument's own author had already validated. ⇒ **When you fix a global
  signal, go and read the row the old probe put there to represent "nothing is happening."** ⚠ And the same run's
  headline was a trap: the mute-vegetation area went **66.4% → 0.0%** while **not one plant changed** (the palette is
  byte-identical). **The metric was SUPERSEDED, not satisfied** — it had always been measuring the *frame*, and the
  frame's light now moves. Quoting it as a vegetation win would have been the exact self-congratulation 251 punishes.
  **The tell: your change lifts every row of a table at once.** That is the signature of a *baseline* move, not a
  *subject* fix — name which one it is, out loud, before you write the verdict.
  ⇒ **AND A PROBE PARAMETER NAMED AFTER A PAGE GLOBAL *SHADOWS* IT.** 253's probe took `frame(p, seed, year, dayT)`
  and did `__setTime(dayT)` — pinning **every frame to the same hour**, because `dayT` was the *parameter*. Three
  hours returned an identical changed-px count and the "night" frame self-reported `LITAMT=0.027`. **Only 202's
  self-report caught it** — the numbers alone were perfectly plausible. Never name a pin after the global it pins.
- **WHEN THE VECTOR IS "MAKE X VARY", HEAD'S *CONSTANT* IS A FREE, EXACT BASELINE — AND IF THE FEATURE HANGS OFF A
  THING THE WORLD BUILDS AT A KNOWN YEAR, THE ERA BEFORE IT IS A FREE, EXACT *CONTROL* (iter 249).** 236 says the
  defect is its own perfect control (when you are fixing a constant that should have been a variable, HEAD's
  `DISTINCT STATES = 1` is an unarguable baseline nobody had to design). 249 is that law with its **second half**
  attached, and the pair is the cheapest complete gate this loop has found. The ferry's tooltip had promised *"working
  the shoreline, **every stop**"* for the artifact's whole life over a boat whose `stepFerry` was **one line** and whose
  lane fraction was **never written again after spawn** — a temporal probe (134) read **DISTINCT SPEEDS = 1 on every
  seed**, forever, which *is* the bug, stated in a number, with no threshold invented. Then the fix's own control came
  free: the berth is the **pier head**, and `pierAt` does not exist before **1986** — so at 1985 the new predicate
  returns 0, every lever collapses to HEAD's literal, and **the patch runs HEAD's byte-identical code**. That control is
  **exact, not statistical** (it re-reads 1 / 0 / never-closes), it needs no second build, and the census's own 1985 era
  becomes a genuine untouched cell. ⇒ **Before you design a "make X answer Y" vector, ask (a) what number is CONSTANT in
  HEAD — that is your baseline — and (b) whether your host has a BIRTHDAY. A year-gated host hands you a dead regime for
  nothing** (199's law, arriving through the *world* instead of through the light). The tell: your feature is gated on a
  structure, tile or civic that the city *builds at a known year*.
  ⇒ **AND THE COROLLARY THAT FOUND THE LAP: `dwell` WAS ALREADY THE HOUSE'S WORD FOR A CALL.** The **bus** has pulled
  into its stops for 200 iterations (`stepVehicle`: `v.dwell=16`); the ferry was the one transit mode that called
  nowhere. **Before you invent a mechanism, grep for the one the artifact already ships** — 248's free-positive-control
  law (*a correct sibling draw validates your rig*) has a **design** twin: a correct sibling *rule* hands you the idiom,
  the vocabulary, and the reviewer's benchmark (226) in one. ⚠ And keep the SIGN: `f.sp` stays signed throughout and the
  **THROTTLE** goes to zero, never the velocity — `drawFerry` reads `f.sp`'s sign for her heading, so zeroing it would
  have spun every berthed boat to face east.
- **A THRESHOLD INSIDE AN `if / else if` CHAIN IS NOT A GATE — IT IS A *BOUNDARY BETWEEN TWO FEATURES*, SO NARROWING
  ONE ARM SILENTLY WIDENS ITS NEIGHBOUR (iter 247).** 245 says ride the **eligibility** gate, not the alpha, when you
  want real dynamic range — and that is right, and it is exactly how you walk into this. 247 made the beach crowd
  seasonal by scaling the furniture's eligibility threshold (`v < UMB*beachPhase()`), which is the correct lever. But
  the umbrella arm and the **PALM** arm are **adjacent arms of ONE `else if` chain, keyed on the SAME `v`**
  (`...umbrella... } else if(v<0.42) palm(...)`), so shrinking one arm does not **empty** those hexes — **it hands them
  to the next arm.** Winter grew **a full palm tree in every deckchair slot the crowd vacated**: permanent vegetation
  popping in and out with the calendar. The fix is to pin the neighbour to its **own, unseasoned** band (`v>=UMB &&
  v<0.42`), so the strip the crowd vacates draws bare sand. ⇒ **Before you touch ANY threshold that sits in an
  if/else chain, grep the chain's other arms and ask what inherits the range you are giving up.** A lone `if` has a
  gate; a chain has a **partition of one noise value**, and a partition conserves area — every hex you take out of one
  arm lands in another. The tell: your threshold's variable (`v`, `r`, a `hashCell`) is tested again, on the next line,
  by an `else if`.
  ⇒ **AND THE COROLLARY IS THE ONE THAT COST THE LAP — IT IS 214'S LAW, AND MY PROBE WALKED INTO IT: WHEN A VECTOR'S
  PURPOSE IS TO *REMOVE* SOMETHING, DO NOT MEASURE THAT ITS PIXELS MOVED — *COUNT WHAT IS THERE INSTEAD*.** 247's probe
  was a textbook 196 state-response rig: frozen clock, one `genWorld`, one build, masks swept per 196, controls exactly
  0, floor exactly 0. It measured **2,076 px of beach changing between winter and the dry peak** and I read that as *"the
  furniture packs away."* **It never asked what the pixels changed TO.** They had changed into palm trees. *"The sand
  changed"* is **necessary** for *"the beach emptied"* and is **not sufficient** — and a pixel-count diff is
  structurally incapable of telling the two apart, however clean its controls are. **Two visual agents caught it, on
  both seeds, one by reading the source.** The instrument that actually gates it is a **census of objects, in the units
  of the thing that broke**: hook `palm()` and **count the calls per season** — deterministic, no pixels, no noise
  floor, and it states the invariant a viewer would state (*a palm does not migrate*): **PALMS flat at 128/109/111
  across all four seasons on BOTH builds.** ⇒ **A removal vector needs a probe that names what SURVIVES, not one that
  measures what MOVED.** The tell: your probe's headline number is a **pixel diff**, and your claim contains a noun
  (*empty*, *gone*, *packed away*) that a pixel diff cannot verify.
  ⇒ **AND THE SURVIVOR COUNT IS ALSO YOUR TRIPWIRE FOR A DEAD INSTRUMENT — IT IS 196'S POSITIVE CONTROL AND 247'S
  "WHAT SURVIVES" IN THE SAME COLUMN, WHICH IS WHY IT IS THE CHEAPEST GATE A REMOVAL LAP CAN BUY (iter 250).** 196 says
  a `BASE = 0` is worthless without a positive control, because *a dead pin and a deaf draw produce the same zero*.
  250 made the amphitheater's concert seasonal and counted the objects the bowl draws — singer, footlights, audience
  specks (must go to 0 in winter) **and the CAVEA'S TIER ARCS (stone: must never move)**. The first run came back **all
  zeros, tiers included** — and a zero there is *impossible*, so the instrument was convicted in ten seconds. (The
  wrappers had closed over the counter object while the probe swapped in a **fresh** one each frame, so every increment
  landed on an object nobody read — a hazard of any hook you reset per render: **reach through `window.X` at call time,
  never close over it.**) **Without the tier column I would have read "singer 0, specks 0, every season, BOTH builds" as
  a broken feature and gone off to redesign a draw that was fine** — the exact failure 196 warns of, arriving through
  the *probe* instead of through the *pin*. ⇒ **On any vector whose purpose is to take something away, put a
  MUST-NOT-MOVE object count beside the must-go one.** It is free (same hook, same run), it names what survives, and it
  is the only thing standing between you and a confident redesign of a healthy feature. The tell: **your probe's
  headline is a count going DOWN, and nothing in the run is required to stay UP.**
- **AN ANCHOR IS NOT AN EXTENT — ANY CULL, FADE OR BOUND EVALUATED AT A DRAW'S ANCHOR POINT SILENTLY UNDER-BOUNDS
  EVERY PIXEL IT PUTS BEYOND THAT POINT (iter 248).** 211 says a per-hex ornament drawn at an **offset** can land in
  the *next hex* and be painted over: draw order is depth order, so an offset is a depth decision. 248 is the same
  defect on the **culling** axis, and it is the one that reaches the *void*. The rain shaft is a quad ~`26*s` wide at
  the belly and `36*s` at the foot whose foot trails **upwind** by `rlean` — and its rim gate tested **`cl.x`, the
  cloud's centre**. So at the very moment the gate declared a shower fully on-plate (`pa=1`), **up to 57% of its
  landing footprint was painting on the void** (measured: 1.4–2.1 hexes past the rim in the model; **4.7% of every
  veil quad the artifact actually fills**, worst **3.4 hexes**, in the shipped draw). ⇒ **When a draw has EXTENT — a
  quad, an ellipse, a halo, a shadow, an arc, anything with a half-width, a lean or an offset — its bound must be
  computed from its own DRAWN EDGES, not from the point it hangs off.** The fade *grammar* rarely needs to change;
  only its reference point does. And the fix is **structural, not checked** (223): make `pa>0` *require* the whole
  extent inside the rim and off-plate ink is **exactly 0 by construction**, forever, instead of a thing you agree to
  go on measuring.
  ⇒ **AND THE COROLLARY IS THE CHEAPEST POSITIVE CONTROL THIS LOOP HAS FOUND: WHEN ONE DRAW IN THE FILE ALREADY DOES
  IT RIGHT, THAT DRAW *IS* YOUR CONTROL — IT VALIDATES THE INSTRUMENT AND CONVICTS THE DEFECT IN THE SAME RUN.** The
  rainbow sits **twenty lines** from the shaft, fades against the **same rim**, and tests its **LEGS** (`fl`/`fr`,
  under a comment that says *"test the LEGS, not the cloud"*). It read **0.00 hexes of overhang on all 6 seeds** while
  the shaft read 2.14 — so a single probe, with no extra design, proved the rig could see zero *and* that the shaft
  was not it. 196 warns that a `BASE = 0` is worthless without a **positive** control; a correct sibling draw is that
  control, free. **Before building a control, grep the file for a neighbour that already solves your problem.**
  ⚠ **This is 242's cited-standard law with the citation running the OTHER WAY, which is why it survived so long.**
  242 found a draw citing a **broken** neighbour as precedent. Here the shaft cites a **correct** one — *"spent 2
  hexes short of the rim **(as the bow is)**"* — and **still does not do what the bow does**. A false invariant had
  acquired a witness that actually holds, so the comment read as *audited*. ⇒ **"As X does" is a claim about TWO
  pieces of code, and X being right does not make the claim true. Go and read the neighbour — every time.**
- **A BUDGET WITH SLACK IS NOT ABSORPTION CAPACITY — THE SLACK *IS* THE PREDICATE'S EXHAUSTION, AND IT WILL BE CITED
  AS THE EVIDENCE FOR EXACTLY THE THING IT DISPROVES (iter 246).** 233's law says that when a vector's *purpose* is to
  take something away, the lap is not "tune it down" — it is to **find the PAIRED ADDITION that holds the core metric
  flat.** Right, and it leaves you one step from the trap: *where do you put the thing you freed?* The obvious answer
  is wherever a cap has headroom. 233 measured the dev budget at **1153 used / 1382**, wrote *"the budget **has slack**,
  so the city **can** absorb the freed development inland"* straight into the ledger header, and that sentence steered
  the loop's **#1 cue for 14 iterations**. The slack is real. **The inference is backwards.** A rule whose roll is
  ~100% saturated (218) stops for exactly **one** reason — it has run out of **eligible cells** — so unspent budget is
  not headroom the city could use, it is the **receipt for land it could not find.** *Slack and exhaustion are the same
  fact read from opposite ends*, and the plan was resting the absorption half of its pair on the very measurement that
  refuted it. Measured: a belt **HOLDS 157–223** cells while widening the parcel rule's road radius 2→3 **ADMITS 25** —
  and **2→4 admits the SAME 25**, i.e. **zero** interior open cells at road-distance 4. The land was not *out of reach*
  of the predicate; it was **gone** (206's *the vacant lot is a MIRAGE*, arriving on the absorption question).
  ⇒ **Never treat a cap's headroom as a place to put something. Go COUNT THE ELIGIBLE CELLS** — it is a render-free
  probe (`probes/probe-fringeabsorb.mjs`) and it costs one command. **The tell: your plan says "there is slack, so it
  can absorb", and the rule that left the slack is saturated.**
  ⇒ **AND THE COMPANION IS 218'S HOST LAW, WHICH THIS CUE HAD NOW IGNORED FOR THREE LAPS — INCLUDING IN THE PROBE THAT
  NAMED IT.** `probe-fringehost`'s own header (written by 233) lists limiter **(3)**: *"the rim is dense because ROADS
  run to the rim, and **the fix belongs in the road/corridor pass**."* 233 then built a mask over the **parcel** rule;
  the header's way-through targeted the **parcel** rule; and 246's own best candidate shape was a mask over the
  **parcel** rule. **All three steer the innocent rule** (218: it faithfully fills what the roads reach) while the host
  goes untouched — and the measurement says so out loud: a lobe belt holding **81 developed cells (≈ −7%)** grows the
  biggest contiguous undeveloped run only **118 → 133**, and on one seed **not at all (107 → 107)**, because **the
  ROADS fragment every lobe** and a belt may not touch them. **Writing the host law down in your probe's header does
  not make you obey it.** When a lap's third independent measurement points at a host you keep declining to touch,
  **the vector is not under-tuned — it is aimed at the wrong file**, and the honest move may be to declare it
  unreachable rather than to build a fourth mask.
- **WHEN YOU MAKE A CONSTANT INTO A FUNCTION OF A SIGNAL, CENTRE EVERY LEVER ON THAT SIGNAL'S MEAN — IT BUYS A
  BYTE-IDENTICAL FIXED POINT, WHICH IS AN EXACT, FALSIFIABLE PROOF THAT THE FEATURE ADDS NO DRAW WORK (iter 245).**
  98 says hold the mean; 216 says a draw change is free if the path count is flat; 222 says the world IS the draw
  list, so *count objects, don't read the diff*. All three leave you asserting the mean is held. **Make it PROVABLE
  instead.** 245 made the sea's whitecaps answer the wind by swinging two thresholds — and a threshold on a `crest`
  **gates a path-object COUNT**, so a drifted mean is a permanent, unbudgeted cost, forever. Writing each lever as
  `HEAD_CONST + (MEAN − signal)*K` means that at `signal == MEAN` **every lever collapses to HEAD's literal**, so the
  patch must render **0 px** from HEAD at that one pin — measured on 3 seeds, with a **full-gust control at 736–805 px**
  proving the builds do diverge elsewhere. The mean is then not a claim you defend but **arithmetic you can run**
  (mean cap count 8.00% → 8.07% ⇒ **+0.4 path objects**). This is 223's law (*prefer a structural invariant to a checked
  one*) arriving on the **cost** axis: **a drift you make impossible beats a drift you agree to look for.** The tell:
  your vector's one-line description is *"X should vary with Y"*, and X currently gates a count.
  ⇒ **AND ITS COROLLARY IS 217'S LAW, ON A *DRAW* INSTEAD OF A SITING RULE: A FIXED *ELIGIBILITY* GATE CAPS THE DYNAMIC
  RANGE OF ANY THRESHOLD BENEATH IT.** The whitecaps decide two things on adjacent lines — *may this hex EVER break*
  (`hashCell > 0.76`) and *does it break NOW* (`crest > 0.5`). 245 made only the second answer the wind, which is the
  obvious clause, and the calm→gale swing came out **1.5x**: both the pixels and my own eye read it as *"slightly more
  speckle"*, because the fixed gate let only **24% of the open water EVER break, in any weather.** The ceiling was in
  the *eligibility*, not the threshold. Riding both (still centred, so the fixed point survives) took it to **3.0x**
  for **+0.8%** mean cost. ⇒ **When a dynamic range disappoints, do not reach for a bigger K — grep the rule for the
  clause that decides WHETHER it may happen at all, and check that clause is not a constant.**
- **AIM A CAMERA BY MEASURED INK OF THE *HOST*, NOT OF THE *FRAME* — WHEN YOUR TREATMENT AND YOUR POSITIVE CONTROL
  ANSWER THE SAME SIGNAL, AN UNMASKED ARGMAX LANDS ON THE CONTROL (iter 245).** 226 says stop aiming by tile predicates
  and aim by measured ink; 201 says locate, then aim. 245 obeyed both and still framed a **park**. The rig was a
  state-response probe (196), whose *positive control* is *"things that provably DO read this signal"* — for the wind,
  the trees, palms and flags. So the frame's biggest calm→gale pixel difference **is the control, by construction**:
  the land moved **~5,000 px** against the sea's 21–42. The argmax duly walked to the palm band, the close-up contained
  no ocean at all, and an agent correctly **FAILed the camera** — costing a full gate round on a feature that was fine.
  ⇒ **Mask the argmax search to the host before you take it** (234's palette suppression gives the mask for free: loud-
  paint the host's palette entries and the changed pixels ARE the host). The tell is structural and you can spot it
  before you shoot: **your probe has a positive control, and your camera does not know about it.**
  ⚠ Two smaller traps from the same lap, both of which will waste a round: (a) **`| head -n` sends SIGPIPE and can kill
  a shot script before it writes its later frames** — you then read a *stale* PNG from the previous run and debug a
  feature against a file that predates it (239's md5 check catches this; so does not truncating). (b) **A whole-frame
  HASH is not a diff** — it is all-or-nothing, so one anti-aliased pixel of float noise reports "different" exactly as
  loudly as a broken feature. **Count differing pixels, and carry a floor** (213).
- **240 SAYS TWO GATES ON ONE FEATURE MUST POINT THE SAME WAY. THE SEQUEL IS *WHICH ONE YOU MAY MOVE* — AND THE
  PROJECTION, NOT THE CUE, DECIDES (iter 244).** The amphitheater's siting rule scores `groundLoad` (the rows at
  `dy=+1/+2`), so it deliberately takes a lot whose **south is open** and the flat bowl is not buried — while the
  draw sat the audience facing **north**, into the leftover. Two gates, one feature, pointing **opposite ways**, for
  the artifact's whole life: measured, the house looked into a wall on 2 seeds in 10 and its mean sightline was
  worth 0.79. The cue — and the agent who filed it — **named the fix**: *"face the bowl toward the river."* It was
  built exactly, and it was **impossible**. ⇒ **ROTATION IS NOT A FREE PARAMETER IN AN AXONOMETRIC PROJECTION.** A
  circle on the ground projects to a **wide, shallow** ellipse, and the cavea reads as a bowl *precisely because* its
  seating is the **near half** of it — the tiers stack into a visible rake. Swing it 90° and the seating becomes the
  ellipse's **left/right half, a tall narrow sliver**, whose five arcs (2px apart, 2px wide) **fuse into a flat
  blob**. Two agents, blind, on two seeds, independently: *"a spilled cream blob"*, *"a painter's palette lying on
  the grass"*. **The code was not wrong** — a forced-north control rendered **byte-identical to HEAD**, proving the
  generalization exact. The *projection* was wrong. **224 already says this for READING** (screen-y is depth, not
  height — never ask an agent to locate by how high a thing sits). **244 is the same law for WRITING: before you vary
  a quantity, ask what the projection does to it.** A shape's legibility can depend on its orientation to the
  privileged axis, and no amount of correct trigonometry buys it back.
  ⇒ **THE WAY THROUGH: two gates can be made to agree from EITHER side — so when the draw cannot move, MOVE THE
  WORLD.** Keep the fixed draw and score what stands in the sightline the draw *already has*. Cost: **nothing** —
  worst-case burial byte-identical (14), placed 10/10, and `ROOFTOPS 2/10 → 0/10`. The tell: your cue prescribes a
  change to a *draw*, and the draw's freedom is constrained by the camera rather than by the code.
  Corollary, and it is the one that surprised — **THE DEFECT IS NOT ALWAYS THE MIRROR IMAGE OF THE FIX (219's law,
  wearing a new face).** The bowl was facing a **wall**, so the obvious rule is *penalise the wall*. Swept as its own
  variant, that is a **DEAD LEVER**: at 20× the shipped weight it never moved a **single** bowl off a rooftop view,
  while the subtraction was the only thing that ever **cost** burial. What worked was **pure addition** — *give it
  something to look at* (water, protected green). 219 says a spatial preference must never score below 1; 244 adds
  that the subtractive form is not merely *worse*, it can be **inert**. **Sweep the two mechanisms apart before you
  tune either** (`probes/probe-amphsight.mjs` grades both on both of 206's ledgers in one run).
  ⚠ And a sharpening of 231's leak law, paid for in this lap: **a variant sweep that builds its world with the
  ARTIFACT'S OWN RULE is grading inside the PATCHED world — `K=0` is NOT HEAD.** The sweep ranks variants honestly
  (one world, all variants), but its baseline drifts as you tune the shipped constant. **Carry an END-TO-END section
  that builds HEAD and the patch as separate pages, lets each grow its own city, and reads each build's own answer
  with the SAME code** — that, and not the sweep, is the claim.
- **A CITED STANDARD IS NOT AN ENFORCED ONE — WHEN CODE NAMES A NEIGHBOUR AS THE PRECEDENT FOR AN INVARIANT, GO READ
  THE NEIGHBOUR (iter 242).** 199's tell (a name asserting a behaviour its value cannot have) has now been cashed on a
  tooltip, a constant, a comment (209), a half-finished fix (217) and a palette entry (238). 242 found the rung below,
  and it is the one that *propagates*: **a later draw that cites an earlier one as authority for a standard the earlier
  one never actually implemented.** The cloud shade was gated `if(inB(cl.x|0,cl.y|0))` under the comment *"shade only
  falls where there is ground to catch it"* — but **`inB()` tests the PLATE, and the plate runs out to sea**, so every
  cloud over the ocean painted a dark ellipse onto open water for the artifact's entire life. That alone is 209. The
  *new* part: the **rainbow**, written later, builds a careful `ROWMIN`/`ROWMAX` rim test under the comment *"it fades
  out as the shower leaves the plate (**cf. the cloud shade above — no ground, no bow**)"* — **it cites, as settled
  precedent, a gate that was never doing the job.** A false invariant had acquired a *witness*, and the witness made it
  look audited. ⇒ **Grep for `cf.`, "as X does", "same as", "like the Y above" in comments, and check the referent
  actually does the thing.** A cross-reference is the cheapest way for a wrong assumption to become load-bearing,
  because the second author *verified nothing* and the reader now sees two places agreeing.
  Corollary — **the fix's own control must be able to move in only ONE direction, and if it moves the other way, stop.**
  242's first cut gated the shade on a sampled land-fraction *alone*, dropping `inB` — which let clouds whose centre is
  **off-plate** cast shade for the first time (an ellipse is not clipped to the rim, so it spills into the void: a *new*
  floating artifact, the very class being fixed). A change that only ever multiplies an alpha by a fraction ≤1 **cannot
  increase ink** — and the probe's land control read **+66%**. That impossibility is what caught it, in one run.
  **Design your control so that the *sign* of an unexpected move is itself a diagnosis.**
- **A CUE NAMES ITS SYMPTOM IN THE UNITS OF THE DRAW — BUT "TOO LOUD" CAN MEAN "TOO MUCH OF IT". WHEN EVERY
  PER-PIXEL PROPERTY MEASURES IN BAND, STOP TUNING THE DRAW AND GO COUNT THE THINGS (iter 241).** Every colour/
  contrast/occlusion law above teaches you to answer a visual complaint by measuring the *draw*, and 228 teaches you
  to re-derive the instrument from the complaint's own nouns. 241 is the case where **the complaint's nouns are all
  about the draw and the defect is entirely in the WORLD.** An agent reported the elevated rail as *"long straight
  grey beams criss-crossing the whole diorama, flattening the isometric read... visual noise"*, which reads as a
  brightness/weight problem and invites you to dim it. Measured against **the house standard** (226 — isolate an
  *ordinary building* with the same rig and read the two side by side), the beam's ink sat at the **33rd percentile
  of the building faces it flies over**, cutting **dTop +37 / dBot −53 against a building's +57 / −55: in band on
  every axis.** Two more hypotheses died the same way (the gondola was **33x less ink**; **41% of the structure was
  already legs**). Nothing was drawn wrong — **there was simply too much of it**, because `minLen` was fresh noise
  per line and the line COUNT was rolled by a **different rule that never read it**: two lotteries multiplying, total
  track **28..291 cells (a 10.4x spread)** on a plate 66 cells wide, and **nothing in the system had ever priced the
  network AS a network.** ⇒ **A large per-seed SPREAD is not a look problem, it is an unbudgeted generator** (233's
  lottery law, one level up — and it is exactly why a 2-seed visual gate passed this for 240 iterations: most seeds
  draw fine). The tell: your cue says *loud / cluttered / noisy*, and the thing it points at is **procedurally
  replicated**. Count the instances across ~10 seeds *before* you touch a colour.
  Three corollaries, each paid for in this lap:
  (a) **LOUDNESS LIVES IN THE TAILS — a mean contrast will ACQUIT the hardest line in the frame.** The beam's *mean*
  contrast against what it covers is **−9** (it looks innocent, and that is how it survived every gate); its
  **brightest decile is +37**, which is the thin bright deck stroke the eye actually reads. **The eye reads EDGES,
  not means.** Report `dTop`/`dBot` (the 90th/10th percentile of *signed* contrast), never `mean(dL)` alone.
  (b) **TO BOUND A THING'S EXTENT, DO NOT BOUND ITS RADIUS — for a closed circuit, radius and length are COUPLED.**
  "It spans the plate" begs for a cap on how far the railhead may stray from its start. Measured: that sends the line
  **straight out and straight back**, which is not a loop but a **stub** — every line collapsed to ~20 cells and the
  feature was gutted (mean track 127 → 50). Bound the **length**, via a budget the whole network shares, and note the
  route home costs **~65% again** on top of wherever it turns around — that overshoot is where a naive budget leaks.
  (c) **A "LESS OF IT" VECTOR IS A PERF CREDIT, AND 222'S LAW RUNS IN REVERSE.** 222 says a world-changing diff is
  never free just because it contains no draw call — the world *is* the draw list. The converse pays: budgeting the
  network measured **path objects −3.2% day / −2.9% night**, the first give-back against the ~+0.2%/iteration arc.
  **Count the objects when a lap SUBTRACTS, not only when it adds.**
- **WHEN PATCH-vs-HEAD CANNOT GET BELOW ITS OWN SIGNAL, STOP SWAPPING THE BUILD AND MUTATE THE DATA (iter 230).**
  161 says a whole-frame patch-vs-HEAD diff locates your change *by construction*, and 213 says measure the floor
  in the same run. Do both and you can still be stuck: **two loads of the SAME file drift by thousands of px through
  `genWorld`** — 213's `addInitScript` stub fixes the *PRNG*, but something in the pre-freeze RAF frames survives the
  rebuild regardless, and it gets worse the longer a page idles before its freeze (**open all your pages up front and
  frame them in sequence and the floor hits 40,000 px**; open→frame→close one at a time and it falls to a few
  thousand). When your feature is worth about that much — 230's ~45 hidden vehicles are ~2,000 px — **patch-vs-HEAD
  is structurally incapable of seeing it**, and it will say so in the most misleading way available: 230's DAY
  control, on code that is *provably inert* by day, read **11,721 px against a 7,034 px floor.** ⇒ Two renders inside
  **one page** are byte-identical (measure it: **0 px**), so isolate the feature **without changing the build** —
  render as shipped, then **mutate the state the feature reads** (230 cleared every vehicle's curfew, `v.out =
  undefined`, so nobody keeps an hour) and render the same frozen world again. The difference IS the feature, at a
  floor of **exactly 0**, off the final composited canvas — so occlusion is checked for free. This is 226's
  stack-suppression law generalized: **226 suppresses the DRAW, 230 suppresses the DECISION**, and both beat a build
  swap because they never leave the page. The tell: your change is a *conditional* on existing entities, and your
  cross-build floor is the same order as your effect.
  Corollary — **the thing you want to aim a camera at may be the thing that leaves no trace.** A hidden entity
  returns before `stamp()`, so it has **no `_sx`/`_sy` at all** and 204's "aim at the drawn position" has nothing to
  read. Render **with the feature off** first (everyone back on the road), take the drawn positions *then*, pick your
  argmax knot, and only afterwards let the feature back in — the camera is aimed by the counterfactual.
- **TO ISOLATE A DRAW THAT IS NOT A TILE, SUPPRESS ITS *PALETTE ENTRY* — LOUD-PAINT `BASE[name]`, FLUSH
  `CCACHE`, RE-RENDER IN ONE PAGE, AND THE CHANGED PIXELS *ARE* THAT DRAW (iter 234).** This is the third
  member of the suppression family and the cheapest: **226 suppresses the DRAW** (stack-match its call
  sites), **230 suppresses the DECISION** (mutate the state the feature reads), **234 suppresses the
  COLOUR**. Reach for it whenever the thing you must measure has **no tile type**, so the per-tile samplers
  (`probe-sandhue`, `probe-goldenhue`) are structurally blind to it — an ornament laid *over* other hexes:
  the pier deck, a bridge deck, benches, platforms, an animal's coat. Three properties make it the strongest
  rig available for a colour claim:
  ```js
  const A = grab();                                                   /* as shipped            */
  const keep = BASE.deck.slice();
  BASE.deck = [255,0,255]; CCACHE = {};  const B = grab();            /* only that name moved  */
  BASE.deck = keep;        CCACHE = {};
  /* mask = (A != B) == every pixel that palette entry draws; deck colour = mean of A over mask */
  ```
  (a) **The floor is exactly 0** — both renders are in ONE page with the clock frozen, so nothing can drift
  between them (230). (b) **It is BUILD-AGNOSTIC**: the mask is derived from each build's *own* render, so
  the identical probe runs unchanged on HEAD and on the patch with **no source swap and no cross-build
  floor** — which is the trap 230 spent a whole lap on. (c) **Occlusion is free**: what the mask contains is
  what the final composited frame actually shows, so it measures the draw *as seen*, not as issued. And the
  same mask **aims the camera by measured ink** (226): take the argmax window of it and point there, instead
  of guessing a clip (201) or trusting a tile predicate that does not know what it is looking for.
  ⚠ Two cautions. **A colour change cannot move geometry** — nothing in the artifact branches on a colour —
  so if the mask's pixel *count* shifts a little between builds, that is your **threshold** reclassifying
  antialiased/alpha-blended edge pixels (they now sit a different distance from the loud sentinel), not a
  real change; say so rather than claiming "count unmoved". And **the daylight mask is the control that
  proves it**: `washRGB` crosses over at `LITAMT` 0.35, so daylight runs byte-identical code and the day
  columns must match HEAD **to the pixel** (234's did, on all three seeds — 199's dead-regime control,
  arriving for free).
- **A CORE-COLLAPSE GATE GUARDS AGAINST *ACCIDENT*, SO IT CANNOT PASS A DELIBERATE, LOCALIZED *REDUCTION* — PRICE
  YOUR VECTOR AGAINST THE GATE BEFORE YOU DESIGN, NOT AFTER (iter 233).** The census hard-fails on a >5% drop in
  `pop`/`developed`/`roads`, and that is right: those metrics exist to catch a change that *broke* the city. But some
  vectors are *supposed* to remove fabric — 233's greenbelt (giving the city a countryside fringe, the ledger's #1
  measured cue) exists precisely to make `developed` go **down**, and the gate cannot tell "the city correctly stopped
  sprawling to the edge of its plate" from "the city cratered." 233 measured the fringe strong enough for a viewer to
  call it open country at **`developed` −5.7..−9.3% ⇒ HARD FAIL**, and everything the gate would pass (ceiling ≈
  **−4.5%**) was too weak for half the visual reads. **The feature was boxed between two gates and died there.** ⇒ The
  moment your vector's *purpose* is to take something away, **compute what it will do to the core metrics before you
  write the rule**, and if the honest version cannot fit, **the lap is not "tune it down" — it is to find the PAIRED
  ADDITION that holds the metric flat.** (233's: the dev budget has *slack*, so holding the rim only costs pop because
  nothing makes interior cells eligible to absorb it — hold the rim **and** widen the core in ONE lap and `developed`
  stays flat, the gate opens, and the belt can be as strong as the eye needs. Priced separately, each half fails.)
  The tell: your diff's whole point is a *minus sign* on something the census calls core.
- **A NOISE-DRAWN FEATURE IS A LOTTERY, AND A TWO-SEED VISUAL GATE WILL HAND YOU ONE WIN AND ONE LOSS (iter 233).**
  195 says a procedural city must hold on **every** seed. 233 is what that costs you in practice: a greenbelt whose
  shape came from a value-noise field produced, from the *same code*, a convincing wandering hinterland on seed 7
  (*"the plate's hexagonal outline is NOT legible in the green"* — PASS) and a mechanical rim halo on seed 42
  (*"a constant-width band tracing the plate's outline"* — FAIL). Three different shapes were built, and **every**
  round came back one PASS and one FAIL, always failing on whichever seed had drawn the weaker belt (measured: 220
  held lots vs 161). **On a bad draw a procedural ornament does not merely under-deliver — it ANNOUNCES THE
  GENERATOR'S RULE, which is a worse artifact than not having the feature at all.** ⇒ When a feature's *quality* (not
  just its placement) is drawn from noise, **gate it on its WORST seed**: measure the per-seed spread of the thing the
  eye judges before you shoot anything, and if the spread straddles your bar, the design is wrong — not the tuning.
  Corollary, and it is a design law: **a mask whose field is a function of `hexDist` from the plate centre has a
  boundary that IS the plate's hexagon, by construction.** No amount of density noise hides that (an even scatter
  reads as *speckle*; modulating only the ring's *strength* reads as an *offset halo*). To make such a boundary
  wander, warp the **distance field itself**, and the warp must **exceed the belt's depth** — otherwise the field
  clamps at the rim and the city can never touch the plate's edge, which an agent will spot immediately.
- **A DEFECT ONLY YOUR HARNESS CAN SEE IS A DEFECT IN YOUR HARNESS — REPRODUCE IT IN THE USER'S
  CONFIGURATION BEFORE YOU BELIEVE IT IS THE ARTIFACT'S (iter 229).** 200 says a probe can measure a
  *layer* the user never looks at; 205 says the label-tell has a false-positive mode; 202/227 say a
  documented trap you keep walking into is a broken tool, not a law. 229 is all three at once, and it
  names the missing question: **WHO SERVES / RENDERS THE THING WHEN A REAL USER LOOKS AT IT?** The
  harness had *three* ways of loading the artifact and had never reconciled them — `shoot.mjs` serves
  http with **no charset** (Chromium falls back to windows-1252 ⇒ **creates** mojibake), `hovershot.mjs`
  and every probe load `file://` (Chromium sniffs UTF-8 ⇒ **hides** it), and the deployed site is
  **neither**: GitHub Pages sends `charset=utf-8`, which **overrides both**. So the artifact was
  *innocent*, the mojibake was an artifact of the dev server, and **no user had ever seen it** — yet the
  ledger had escalated it across three step-backs into its **#1 🔴 cue, "a LIVE bug on the public site",
  re-measured as "~4x bigger"**, and ordered the next lap to spend itself hand-escaping 12 string
  literals that were never broken. **Every re-measurement re-confirmed it, because every re-measurement
  used the same broken instrument.** ⇒ Before you build to a defect that only ever shows up *in your own
  tooling's output*, spend one command on the real thing (`curl -sI <the deployed URL>` cost 3 seconds and
  refuted the loop's loudest cue). And when the instrument and the artifact disagree, **the fix is usually
  STRUCTURAL and belongs to whichever one is lying** — here one `<meta charset>` in the artifact fixed the
  bug, repealed a wrong invariant, *and* stopped the instrument lying, all at once. The tell: **a defect
  that only reproduces under one of your load paths, and a "discipline" in your notes telling you to keep
  working around it.**
- **WHEN ONE FEATURE IS DRAWN BY TWO GATES, CHECK THEY POINT THE SAME WAY — AND A DOMAIN WITH AN EMPTY CUE LIST IS
  UNGREPPED, NOT SATURATED (iter 240).** 199's tell (a name asserting a behaviour its value cannot have) has been
  cashed on tooltips, a constant, a comment, a half-finished fix. 240 found it **twice in one tile, pointing in
  opposite directions** — which is the form that survives longest, because each gate is defensible alone and only the
  *pair* is absurd. The stadium's crowd was drawn `if(LITAMT<0.75)` under the comment *"match-day crowd"* — so the
  same nine hash-placed specks stood on the concourse **every afternoon of every year, for a match that never kicked
  off** — while its floodlights came up `if(LITAMT>0.3)`, blazing over the stands **that same gate had just emptied**.
  The lights burned for nobody; the crowd stood in daylight with the lights off. It survived the artifact's entire
  life because *"the stadium has a crowd"* and *"the stadium is floodlit at night"* are both true, and nobody read
  them together. ⇒ **When a feature has more than one draw gate, read them TOGETHER and ask what state the pair
  implies.** Two gates on the same tile that never agree are not two features — they are one missing predicate.
  Corollary (217's law, one scope wider): grep for a tile/entity whose gates read **different signals for the same
  idea**, and give them **one shared predicate** with every reader on it (`matchClock`: crowd, floodlights, tooltip,
  and `residentWhere`, all off one function).
  ⇒ **AND THE SECOND HALF IS ABOUT WHERE TO LOOK AT ALL: 225's grep-the-seam law is now 3 for 3** (Sky 236, Nature
  238, People 240 — every one off a domain the ledger header had written off as stale). People's cue list was
  **empty**, and its seam held the defect above. **An empty cue list records where you have already looked; it is
  not evidence there is nothing to find.** Before you skip a stale domain, spend one `grep` on its seams.
  Corollary — **look for a clock the artifact already has and nobody reads.** 240's fixture list needed a multi-day
  clock and one was sitting there: `dayT += dt*s/110` **never wraps**, so `Math.floor(dayT)` is a real day counter,
  and in 240 iterations only the moon had ever read it. A cadence vector's hardest part is usually finding a clock
  that is slow enough not to strobe (134) — **check what the existing accumulators do past their wrap point.**
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
  **⇒ AND THE SAME FACT IS A DESIGN LAW, NOT ONLY A MEASUREMENT ONE: A HAIRLINE ORNAMENT NEEDS A BODY (iter 215).**
  203 says a sub-pixel line defeats your *probe*. It also defeats the *viewer*, and for the identical reason — a
  0.6px blade is permanently blended with whatever is behind it, so it **tints its background instead of marking
  it.** 215's marram tufts changed ~800 px of seam sand and moved the "green ink on sand" count by **zero**
  (31.2 → 30.7 per 1k): they were *hazing* the beach, not tufting it, and the feature's whole point was to be seen.
  Adding a **root clump** — one solid 1–2px ellipse under the blades — took it to **+36..+62%** and both agents then
  read it as a dune fringe. So: **any ornament made of hairlines (blades, reeds, masts, rigging, aerials) needs a
  fill anchoring it, or it will read as a smudge of tint and no amount of extra strokes will fix it.** This is why
  the `polish-tile` BACKLOG's two standing legibility cues — the sub-pixel elevated transit **(a)** and the marsh
  reeds' *"seven sub-pixel strokes round the pool"* **(d)** — are both *stroke-only* draws. **The lever on both is a
  body, not more strokes or more contrast.**
- **A CHAIN is not a STROKE: filter a draw census by the feature's PERCEIVED extent, not its per-call extent
  (iter 203).** Hunting the "thin dark line", 203 censused every stroke that was long, thin and dark — and **missed
  the answer**, because each rope span is only **12–14 px** and sat under the "long" threshold, while **15–25 spans
  chain into an unbroken 199–331 px run** across the frame. *The eye sees the chain; a per-stroke filter cannot.*
  When you census draw calls to find something a viewer complained about, **group by issuer and sum** before you
  threshold — and note the same census's other trap: a non-string `strokeStyle` (a `CanvasGradient`) has no
  luminance, so defaulting it to black makes the **rain shafts** the darkest "line" in the city. `probes/probe-darkline.mjs`
  is the reusable locator — stack-attributed, so it names the function that issued the ink.
  **⇒ AND BOTH OF THOSE TRAPS WERE STILL LIVE *IN THE PROBE* WHEN 243 PICKED IT UP — BECAUSE THIS ENTRY WROTE THE
  COMPENSATION DOWN INSTEAD OF FIXING THE CODE. A "BEWARE, THIS PROBE LIES IN WAY X" NOTE IS A BUG REPORT, NOT A LAW
  (iter 243).** Read the paragraph above as it stood: it tells you, correctly and in detail, that `probe-darkline`
  scores gradients as black and cannot see a chain. It had said so for **40 iterations** — and the probe went on doing
  both, so 243 ran the loop's own banked locator at the loop's own most-reported undiagnosed defect and got, at the top
  of the census, **8,160px of phantom black ink that was the rain shafts** (a soft wash the eye never reads as a line),
  with the real suspect — the gondola rope, whose spans are ~12–14px — **filtered out by `len >= 30` and absent from
  the table entirely**. Every future reader was expected to re-derive the compensation from prose, forever. This is
  **229's law wearing a probe** (a *discipline* written where a *structural* fix was available), and **202/227's** with
  the tool now in your own hands: **a documented trap you keep walking into is a broken tool, not a law.** ⇒ **When you
  find yourself writing "remember that probe P over-reports Y" — stop, and spend the five minutes inside P.** Gradients
  are now counted apart and never scored as ink; `MINLEN` is an env knob so the same probe censuses chains (`MINLEN=4`)
  or long strokes (the default 30). The tell: a caveat in your notes whose job is to un-teach an instrument's output.
- **STUBBING `Math.random` BEFORE `genWorld` IS NOT EARLY ENOUGH — stub it before the PAGE'S OWN SCRIPT, with
  `page.addInitScript` (iter 213, sharpening 203).** 203 says stub the PRNG before `genWorld` because a whole class
  of entities respawns in it. True, and still not enough: a `page.evaluate` runs **after the document's top-level
  script has already executed**, so every piece of state the artifact seeds with the *real* `Math.random` **at load**
  is baked in before your stub can land — and differs on every page load. That is why 199 had to name `flock`, and
  163 had to name `STARS`: they are not a list to complete, they are **symptoms of stubbing too late**. 213's probe
  did everything 203/199/163 ask (stub, `genWorld`+`__warp`, clear `STARS`/`flock`, pin `time`/`waveT`, empty every
  mover array) and its day control — **byte-identical code in both builds** — still read **8k–18k changed px**. One
  line fixed it and subsumes the whole clear-list:
  ```js
  await page.addInitScript(() => { let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s*1664525 + 1013904223) >>> 0) / 4294967296); });
  ```
  Floor: **8k–18k px → 12–49 px.** Do this in **every** probe; it costs one line and it is the difference between a
  probe that measures your feature and one that measures the weather.
- **...and MEASURE THE FLOOR IN THE SAME RUN — a floor pinned from an earlier run is the stale-baseline sin (iter
  213).** 203 says "always render the unchanged frame twice and print the diff as the probe's first row." Go one
  further: load **HEAD twice** and carry `HEAD-vs-HEAD` as a **column beside** `patch-vs-HEAD`, per hour, per seed.
  The residual floor *drifts with machine load* exactly as frame time does (213's floor read 10–40 px on one run and
  32–49 px on the next), so a `const FLOOR = 40` you pinned an hour ago will start FAILing a passing gate — the same
  way `perf-baseline.json` went stale and made the perf gate untrustworthy. Compute the threshold **from the floor
  the run just measured**, and the probe grades itself: `night 562–658 px against a floor of 12–20` is a sentence a
  reader can check, and `night 562 px` alone is not.
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
- **...and the SAME stub can HIDE YOUR TREATMENT, not merely spoil a control — the failure inverts when you keep
  the draw COUNT identical (iter 210).** 204's law assumes your patch draws a *different* number of values, so
  everything downstream diverges. Do the conscientious thing — keep the count the same, so the stream does *not*
  shift — and you buy the opposite bug: **both builds now read the SAME `r` at the same position for the same
  entity**, and if old rule and new rule are both thresholds on that one `r`, they can decide **identically**.
  210 replaced `hidden = (r < 0.5)` with `hidden = (r < 0.505 − 0.63·buzz)`; on quiet ground (`buzz = 0`) those
  are *the same set*, so two builds that differ enormously in the aggregate produced **frames 250 px apart, with
  not one figure moved**, and the first visual gate correctly reported nothing. The feature was fine; the *frame*
  was. ⇒ **A stubbed stream makes your builds correlated, and correlation cuts both ways.** When a patch-vs-HEAD
  diff of a *stochastic* decision comes back suspiciously empty, before you doubt the feature, ask whether the two
  rules are reading the same random number — and if they are, **shoot the regime where the two thresholds
  *separate*** (210's hour was `dayT 0.04`, where HEAD's saturated gate had let its entire crowd back out) or give
  the new rule **its own stream**. The aggregate probe is unaffected either way, which is why it was right and the
  first screenshots were wrong.
- **A FROZEN CLOCK DOES NOT REFRESH THE DOM — `syncSky` is THROTTLED and `syncStats` only runs when playing
  (iter 204).** 200 says the user sees canvas *plus* DOM; 202 says the step-back's camera was lying. Here is the
  third member of that family, and it will bite any hand-rolled freeze: `frame()` calls `render()` on **every**
  RAF regardless of `playing` (so your canvas is fine, and any debug overlay you paint is *wiped*), but
  `syncSky(now)` **early-returns for 400 ms** (`if(now-lastSky<400)return`) and `syncStats()` is called **only
  inside the `if(playing)` branch**. So `playing=false; dayT=0.92; render(); screenshot()` gives you a
  **night-lit plate under a bright daytime sky**, with the HUD still reading "DAYTIME" — and an agent will
  correctly FAIL it, costing a full gate round. Force them: `lastSky=0; syncSky(performance.now()); syncStats();`
  before you shoot. (`probes/shot-stepback.mjs` does this **as of 227** — this line claimed it already did
  for 23 iterations while it did **not**, and the step-back's own camera duly handed 227 a false FAIL on both
  seeds: the HUD read `daytime / 0% new moon` off a night frame with a crescent drawn, and two agents
  independently FAILed the *city* for the *camera*. **A documented trap you keep walking into is a broken tool,
  not a law — fix the tool.** ⇒ And the general form, which is what makes the fix stick: **make the frame
  SELF-REPORT the DOM state you are about to ask an agent about.** `shot-stepback` now prints `HUD=ok` /
  `HUD=STALE:<word>` per frame, so a stale HUD is caught by the tool in one line instead of by a gate round.
  This is 202's law — every frame self-reports its own state — extended from the canvas to the DOM, which is
  precisely the layer 200 warns the probes cannot see. `probes/probe-hudfreeze.mjs` is the three-case rig that
  settled it: **A** frozen-as-shot, **B** frozen + `syncStats()`, **C** actually playing; A stale while B and C
  agree ⇒ the camera lies and the artifact is innocent.)
- **Aim a close-up at the entity's DRAWN position (`_sx`/`_sy`), never at `ctr(x,y)` (iter 204).** 201 says a
  fixed clip is not a framing — aim at the feature. This is the sharper form for a *mover*: a vehicle is drawn
  **interpolated** between its hex and its next hex by `v.p`, so `ctr(v.x,v.y)` can be a **whole hex** (~110 px at
  5.5×) from where it actually appears. That is precisely far enough for a visual agent to sweep the wrong
  quadrant and report an empty street — one did, on a frame where the probe measured the parked cruiser at **96%
  visible ink**. `stamp()` already records the true drawn position in world coords (`e._sx`/`e._sy`, the same
  fields `pickEntity` hovers by): render once, read them, re-centre, render again. And when the object is ~20 px,
  **clip tightly** — a 20 px vehicle in a 1400×900 frame is a needle you are asking an agent to find.
- **A LEVER HAS TWO LEDGERS: measure its cost to the POPULATION, not just its effect on the INSTANCE (iter 206).**
  198 says measure a lever before you mandate it. 206 *did* — and still shipped a bug, because it measured only one
  side. The community gardens were being buried by the mid-rises drawn in front of them, so 206 measured the obvious
  lever (*is the hex in front clear?*) and it **separated cleanly**: a garden with a tall front row renders 2340px of
  ink and 4 in 11 are ≥86% buried; with a clear front row, 4354px and 2 in 12. Mandated as a hard gate, it
  **starved the rule outright — `GARDEN 14 → 5`, worse than the bug it was fixing** — because the siting rule
  demands ≥3 *home* neighbours and `MID` is **both a home and the thing that buries you**: the two predicates fight
  for the same cells. **A constraint that improves every instance it admits can still destroy the population by
  admitting almost none.** ⇒ When a lever is a *filter on a pool*, measure **the pool** in the same breath as the
  effect (one census run), and prefer a **PREFERENCE to a GATE**: weighting the roll (`rng() < (openFront ? 0.075 :
  0.02)`) took mean occlusion 58%→40% and fully-invisible 1→0 while *raising* the count to 17. The tell: your lever's
  predicate shares a tile type with the host predicate it must coexist with.
- **A GROUND-LEVEL TILE SITED IN DENSE FABRIC IS OFTEN INVISIBLE — "it is placed" is not "it can be seen" (iter 206).**
  Draw order is depth order, so whatever stands in the row at `dy=+1` is painted last and buries the hex behind it.
  Measured across 23 community gardens on 6 seeds: **mean 58% occluded, 7 of 23 ≥86% buried, and one rendering 0 px
  of ink against 8,924 px drawn on top.** This is 204's cue (n) (buried service bays) generalized from *entities* to
  *tiles*, and it is why a census tile-histogram win can be a visual nothing. `openFront(x,y)` + `TALLT` (beside
  `countAround`) is the shipped predicate — **any ground-level thing that must be SEEN should ask it before siting
  itself.** Corollary, and it is 205's law arriving by a second road: **state the claim in the viewer's units.**
  "GARDEN 6 → 17" is a claim about *cells*; the claim that matters is *how many gardens the city shows you*, and
  only `probe-gardenvis` (one frame under two z-orders, `occluded% = 1 − inkInPlace/inkOnTop`) can answer it.
- **`openFront`/`frontLoad` ONLY COUNT `TALLT` — so they will call a front "clear" that is not, and a GROUND-LEVEL
  thing will still be buried (iter 226).** 206 gives you `openFront` and 211 the sharper `frontLoad`, and both are
  the right *idea*: draw order is depth order, so ask what stands in the rows in front. But both only count tiles in
  **`TALLT`**, and the thing that actually hides a person's *feet* is often a **mid-height shop** — not in `TALLT`,
  and more than tall enough. 226 aimed its visual gate at a bus stop three times and was buried three times: once
  behind towers (`openFront` misses a tower two rows back — 211's own caveat), then behind a shop that
  `frontLoad(x,y)===0` swore was not there. **Two full agent rounds, both FAILing the camera while the feature was
  fine.** ⇒ **For anything drawn at ground level, "can it be SEEN" is not answerable by a tile predicate — answer it
  by MEASURED INK.** Render the frame with the ornament and again without it, diff per instance, and take the
  argmax: that is where it *provably* renders, and it is the only honest place to aim a camera (201's locate-then-aim,
  with the locating done by measurement instead of by a predicate that does not know what it is looking for).
- **A SITING RULE RUNS ONCE IN A YOUNG CITY AND IS JUDGED IN AN OLD ONE — SO SCORE THE FRONT BY WHAT IT WILL *BECOME*,
  NOT BY WHAT STANDS THERE NOW. AN EMPTY LOT IS NOT A CLEAR VIEW; IT IS A BUILDING THAT HAS NOT BEEN BUILT YET (iter
  231).** 226 (above) tells you a ground-level thing needs *measured ink*, not a tile predicate. 231 built the
  predicate 226 asked for — `groundLoad`, summing the **drawn height** in the two rows in front (frontLoad counts
  TALLT *membership*, so an h80 tower and an h5 shed score alike, and RES scores 0) — and it **still shipped a bug**,
  because a predicate that reads *today's* heights answers the wrong question. The amphitheater is sited at
  **year 2004** and every frame renders **2035**. Scored on the city as it stands, **all six seeds found a front of
  `groundLoad` ZERO** — and the hash then broke the tie, so a **vacant lot's** frontage won as often as a road's. But
  a vacant lot beside a road and a park is the most developable land in the city: by 2035 two of them had become
  `RES:16 COM:21` and `COM:18 TOWER:89`, burying the bowl at **81% and 63%**. **The rule was SELECTING FOR ITS OWN
  BURIAL** — it actively preferred the ground the upgrade pass was about to build on. Counting a `RAISEABLE` lot at a
  nominal future height took it to **6.3% mean occlusion, worst 12%, 0/6 buried**, and the constant's **magnitude is
  not load-bearing** (30 and 60 pick identically): all that matters is that a buildable front scores **nonzero** while
  a permanently-open one (road, water, shore, rock) scores **zero**. This is **206's law arriving from the occlusion
  side** — *ask what a tile BECOMES, never what it is* — and it is the fourth instance of that defect.
  ⇒ **Corollary, and it is the one that cost the lap: A VARIANT SWEEP MUST LET EACH VARIANT SEE ONLY WHAT THE RULE
  WILL SEE — grade it at the clock the RULE RUNS AT, not the clock you RENDER at.** 231's first sweep ranked
  candidates against the **mature** 2035 city and crowned the height predicate at **8.4%** occlusion; shipped, the
  identical predicate measured **27.7%** — a 3x error, and the sweep had been *letting the variants see the future*.
  Re-run honestly (pick on the 2004 terrain, judge by measured ink in the 2035 frame) it ranked them correctly and
  the winner held at 6.3% when shipped. **A sweep that grades on state the rule cannot observe is not a sweep, it is
  a leak.** `probes/probe-amphfuture.mjs` is the honest rig; `probes/probe-amphgrow.mjs` is the two-line diagnosis
  (print the host's occlusion predicate **at siting** and again **at render** — if it rises, the city grew up in front
  of your feature and the rule chose that).
- **A SCARY CENSUS MOVE ON 3 SEEDS MAY BE THE CHAOS, NOT YOU — PAIR IT ACROSS ~10 SEEDS BEFORE YOU BELIEVE IT, AND
  BEFORE YOU "FIX" IT (iter 231).** The census matrix is **3 seeds**, and a rule that moves *one cell* of terrain
  reshuffles the whole downstream `rng()` stream for decades. 231's census read `TOWER -6.9%`, `towerHt -6.1%`,
  `pop -3.9%` with **`developed` FLAT** — the same land building *shorter*, which looks exactly like a real,
  directional skyline tax, and a 7% skyline tax to unbury one tile would have been a bad trade (the solar-farm
  precedent). It was **noise**: paired over 10 seeds the mean TOWER delta is **+1.4 (up)**, mean pop **+1.07% (up)**,
  and only **3/10** seeds lose towers — swings of −24 and +22 sit side by side. The 3-seed matrix had simply drawn two
  of the worst. ⚠ Note this **refutes the tempting inference from 218**: yes, the tower *roll* is saturated, but the
  tower **predicate** (`com>=2`) reads a COM layer that is itself `rng()`-sited, so a stream reshuffle **does** move
  the skyline — chaotically, ±15% per seed, centred on zero. ⇒ **Before you redesign to protect a metric, spend one
  render-free probe asking whether the sign is even stable.** `probes/probe-cascade.mjs` is the rig (paired world data,
  N seeds, HEAD vs patch). The tell: `developed` is flat while a *composition* metric moves, and your change touched
  terrain at an early year.
- **WHEN THE VECTOR IS "APPLY THE HOUSE STANDARD TO THE LAST THING THAT LACKS IT", THE CONTROL IS THE HOUSE STANDARD
  — NOT A THRESHOLD YOU CHOOSE (iter 226).** 205 says a probe whose threshold is in the units of your own design
  constant is grading its own homework, and leaves you with: so what threshold *is* honest? Here is one whole class
  of vector where the answer is free. 226 gave the city's waiting crowds the contact shadow every other figure
  already had; the visual agents FAILed it with *"I cannot see it"*, and **in the viewer's units they were right** —
  2.1 px of shadow per figure at fit zoom. The trap is to now argue about whether 2.1 px is "enough", which is a
  number you would be inventing. **Don't. Measure the thing the artifact ALREADY SHIPS AND ACCEPTS, the same way, in
  the same frame.** A ped's shadow — unquestioned for 200 iterations — renders **4.4–4.5 px/figure**; the new queue
  shadow renders **1.9–2.7**. Same order, same idiom ⇒ *"invisible at fit zoom"* is a true statement about **every
  shadow in Solvista**, not an objection to this one, and the feature ships. ⇒ **Isolate the incumbent with the same
  rig you used on the newcomer** (stack-suppress its call site, re-render, diff) **and read the two side by side.**
  The tell you can use this: your change's one-line description is *"X should do what Y already does."*
- **A siting rule keyed to a tile the UPGRADE PASS CONSUMES will starve itself as the city matures — key it to the
  CATEGORY, not the TILE (iter 206).** The community-garden rule wanted `RES` with **≥3 RES neighbours**. But a house
  ringed by houses is *precisely* the house that upgrades to a mid-rise, so the rule's own host pool **collapsed
  40 → 15 across the only years it was allowed to run**, placing ~1.5 gardens a city and **none at all in one seed
  in three.** The fix was one predicate: **a mid-rise is still housing** — count `HOMES = {RES, MID}`, and the pool
  goes 2.5× and *stable* through maturity. This is now the **third** instance of one defect (`T.MARKET` wanted dense
  `COM`, which upgrades past; iter 82's `RES→COM` on arterials found the frontage already `COM`/`MID`/`TOWER`), so
  treat it as a standing audit: **when a rule names a tile type in a growing city, ask what that type BECOMES.**
  The cheapest possible check comes first — `GARDEN` read **6 hexes across the entire 9-cell census matrix**, and
  one look at the tile histogram would have caught it at any point in the artifact's life.
- **A COMMENT THAT STATES A STANDARD THE ADJACENT BRANCH IS EXEMPTED FROM is the tell's next host — and check
  the SIZE of the exempted surface before you believe it is marginal (iter 209).** 199 found the tell's host had
  moved from a tooltip to a *constant*; 209 found the rung below that: a **comment that gets the principle right
  and applies it to one branch of the same `if`.** `drawCell`'s `default:` gave the `EMPTY` lot a patchwork
  *"so the green sheets read as pasture, not paint"* — and in the very next clause painted the ground under
  **every developed hex** one flat `sandDk`, so a house's front garden and a factory's yard agreed **to within
  one RGB unit** for 208 iterations. **Grep for a principle written down once and applied to one branch of the
  same conditional.** Two corollaries, both general: (a) **before designing on a ground-level surface, MEASURE how
  much of it a viewer actually sees** — `probes/probe-groundvis.mjs` answers *"how much of surface X is visible?"*
  by loud-painting one type's ground and diffing (the diff **is** the visible ground, by construction, 161). It
  is the direct answer to 206's occlusion law, and here it *inverted* the expectation: the developed ground is
  **5.2% of the frame**, the RES yards alone **2.21%** — the largest ground surface in the city, not a buried one.
  (b) **A "saturated" interconnect list is a claim about the class you enumerated, not about the city.** The
  header had recorded *"the Sky-feedable list is EMPTY — every vegetation tile that can read `year` now does"*;
  that was true of **vegetation** and false of the **city**, because the biggest surface the seasons could not
  reach was not a plant at all — it was the residential ground, wearing a non-seasonal palette name. Renaming it
  `lawn` took its seasonal shift from **1.2 to 36.8** for free. ⇒ **When a domain looks interconnect-saturated,
  re-ask it as: what large surfaces are wearing a palette name / field that cannot carry the signal?**
- **WHEN A RULE DECIDES BOTH *WHETHER* AND *HOW MUCH*, A FIX TO ONE CLAUSE IS ROUTINELY MISTAKEN FOR A FIX
  TO THE PHENOMENON — AND THE FIX'S OWN COMMENT WILL NAME THE MECHANISM IT SKIPPED (iter 217).** 209 found
  the tell's host in a *comment that states a standard the adjacent branch is exempted from*. 217 found the
  rung below: **a comment that correctly diagnoses a defect, and then fixes it in ONE of the two places the
  defect lives.** The tower rule decides *placement* and *height* on adjacent lines. Iter 98 diagnosed the
  cause in exactly the right words — *"a linear ramp down the x+y diagonal is a HALF-PLANE, not a place, so
  it has no peak for a skyline to sit on"* — keyed **HEIGHT** to a real centrality field (`0.70+0.66*core`),
  and **left PLACEMENT rolling on the very half-plane it had just condemned** (`(0.14+0.20*back)*(0.5+c.val)`,
  where 98 *itself* had established that `c.val` is not a centrality field either). The result survived 119
  iterations and every per-lap gate: a city with a **TALL middle but not a DENSE one** — height falling
  108→67 core-to-rim while tower *density* stayed flat (6.8–10.0%), **four times as many towers on the rim as
  downtown**, and mean tower distance from the CBD (19.8) essentially equal to mean *developed* distance
  (22.1). Two blind agents on two seeds said "there is no downtown" and were right. ⇒ **When you fix a rule,
  ask what ELSE that rule decides.** Grep for rules whose clauses read *different fields* for the same idea
  (siting vs intensity, spawn vs size, whether vs how-much) — a magnitude fix is not a distribution fix, and
  a peak with no mass under it is not a skyline. Corollary: **the cheapest instrument is often not a render at
  all.** `probes/probe-skyline.mjs` is pure world data — no canvas, no clock, no noise floor, no `Math.random`
  to stub — and it settled in one run a question four rounds of screenshots could only gesture at.
- **A SATURATED RULE CANNOT BE STEERED BY ITS PROBABILITY — MEASURE THE CONVERSION RATE BEFORE YOU TUNE A RATE
  (iter 218, and it REFUTED the fix 217 ordered).** 199's corollary says to check whether a *signal* is saturated
  before concluding a draw "already reads" it. This is the same trap one level up, in the **CA rules themselves**,
  and it is the loop's native currency: a per-tick pass is sampled **~60 times per cell** over a run
  (~800 ticks × `ks(240)` picks), so `1-(1-p)^60 ≈ 1` for any `p` above ~0.02. **The roll converts ~100% of whatever
  qualifies, and the probability therefore sets only TIMING, never PLACEMENT.** Measured on the tower rule:
  `converted / (converted + still-eligible)` = **100.0% on all three seeds** — not one cell anywhere in any city was
  still eligible and un-converted. So 217's prescription (*"give the placement roll a `core` term"*) was **incapable
  of moving a single tower**, and 98's comment had said so years earlier. ⇒ **Before you tune ANY `rng()<p` in
  `tick()`, print `p`'s conversion rate.** If it is ~100%, `p` is a dead lever and **only the PREDICATE can steer the
  rule** — a predicate cannot saturate. This is a two-minute, render-free probe (`probes/probe-towerroll.mjs`) and it
  is now the first thing to run on any placement/siting vector.
  **⇒ AND THE TELL FOR *WHICH* KIND OF ROLL YOU HAVE IS ONE LINE OF CODE: DOES THE SUCCESS BRANCH REMOVE THE CELL
  FROM ITS OWN ELIGIBLE POOL? (iter 219.)** 218 gives you the *test* but not the *diagnosis*, and the difference is
  structural, not statistical. The tower roll leaves the converted cell as `COM`, which is still `COM` — so `rc()`
  re-picks it ~60x and it converts eventually **whatever `p` is**: saturated, `p` dead. The shop fork sits inside
  the develop branch, so the cell leaves `EMPTY`/`MEADOW` **the instant it fires** and can never be re-rolled:
  **ONE-SHOT, and `p` is a live lever on the fork's outcome** (measured — max hits/cell = **1** on every seed,
  `probes/probe-shopcore.mjs` Part A). ⇒ **Read the rule's success branch against its own precondition before you
  either tune `p` or write it off.** A rule whose precondition survives its own success is saturating; a rule that
  eats its precondition is one-shot. Both live in `tick()` and they look identical at the call site.
- **A SPATIAL PREFERENCE MUST BE PURE ADDITION — SCALING A ROLL *DOWN* IS A CUT DRESSED AS A REDISTRIBUTION, AND IT
  COMPOUNDS THROUGH ANY RULE BUILT ON TOP OF IT (iter 219).** 206 says prefer a **preference** to a **gate**. That is
  necessary and it is not sufficient: 219's first sweep expressed "prefer the core" the natural way — multiply the
  roll by `m = A + B*core` with `A<1` — which is a preference, not a gate, and **every variant made the city worse**
  (core towers **42 → 29/38/32/33**, pop **−14..−27%**). The arithmetic is the whole lesson: **mean `core` over the
  plate is ~0.1**, so `A<1` puts `m<1` across ~90% of the land and you have quietly **cut the rule city-wide** while
  believing you moved it. Worse, the tile you cut (`COM`) was the **SUBSTRATE** a later rule builds on (towers rise
  only on COM, at 240 pop each), so the cut **compounded downstream** and destroyed the very core towers the change
  was for — while *flattering the ratio*, which is 218's own sin. ⇒ **Write a spatial preference as `m = 1 + B*field`,
  never below 1.** The un-preferred region then keeps the **byte-identical** rule, so the only thing that can happen
  is the thing you intended, and **98's hold-the-mean comes free by construction** instead of being something you
  must solve for. Two corollaries: (a) **"just widen the falloff" is not a gentler version of the same lever — it is
  a different lever that lifts EVERYTHING** (219's R4, radius ×1.6, *doubled* the rim: 148 → 205); (b) before you
  cut a tile type anywhere, **ask what is built ON it** — a substrate's population is not its own.
- **A DENSITY FIX IS NOT A MASS FIX — THE EYE COUNTS OBJECTS, NOT RATIOS (iter 218; 205's next host).** 205 says
  state the claim in the viewer's units. Here is the specific unit error you will actually make, because it is the
  one your *rule* hands you: a siting rule operates **per cell**, so you will instinctively grade it **per cell** —
  "TOWER % of developed land" — and that ratio can improve enormously while the frame gets *no better*. Solvista's
  rim carries **~20× more land** than its core, so `53.6% core vs 6.3% rim` density still leaves **15 towers downtown
  against 34 out past ring 23**: twice as many on the rim, exactly what four blind agents reported and what the
  ratio concealed. ⇒ **When a rule distributes objects over unequal-sized regions, grade it on the COUNT, not the
  share.** The tell: your probe's units are the units your rule is written in.
  **⇒ AND THE NEXT UNIT ERROR IS MEAN-vs-ENVELOPE: FOR ANYTHING THAT READS AS A SILHOUETTE, THE VIEWER'S STATISTIC
  IS THE *MAX*, NOT THE MEAN — AND THE TWO CAN MOVE IN OPPOSITE DIRECTIONS (iter 224).** 218's error is *per-cell vs
  per-object*; this one is *central-tendency vs extreme*, and it is nastier because the mean statistic will look
  **excellent** while the thing the viewer complains about gets **worse**. Solvista's mean tower height already
  tapered beautifully from the CBD (`corr(th,core)` 0.58–0.67; mean height 124→69 by ring) at the exact moment two
  blind agents called the skyline *"a spine, not a crown."* They were right: **a skyline IS its upper envelope** —
  you see the tallest thing in each direction, not the average thing — and the envelope was broken (one seed's ring
  5-8 max **out-topped the core's**). Worse, the fix the cue prescribed (narrow the height noise) **raised `corr` to
  0.861 and made the crown WORSE**: `crownGap` 20.9 → 11.5, with one seed going **negative**. It compressed the
  core's peak harder than it compressed the rim's growth-inflated outliers. ⇒ **When the claim is about a
  SILHOUETTE, a SKYLINE, a HORIZON, a CANOPY, a RIDGE — anything where the eye samples the extreme of a
  distribution — gate on `max` per region, never on `corr` or `mean`.** 224's `crownGap = max(th | d≤6) − max(th |
  d>8)` is the shape to copy: one number, in the viewer's units, that goes **negative** exactly when the thing is
  wrong. And this is 221's law again (*a gate can be anti-correlated with correctness*) with a new tell: **your
  metric is a measure of central tendency and the defect lives in the tail.**
- **A RULE CAN BE FAITHFUL TO A DEFECT ONE LAYER UPSTREAM — CHECK THE HOST LAYER'S DISTRIBUTION BEFORE YOU BLAME THE
  RULE THAT READS IT (iter 218).** The dead-code law says confirm a host *exists* at scale before wiring to it. This
  is its distributional twin, and it is what 217 (and 98, and I) got wrong for 120 iterations: **towers can only rise
  on `COM`, and `COM` is itself uniformly sprinkled** (COM-origin share: 50% in ring 0-4, then flat 25–36% out to the
  rim), so a uniform commercial layer **forces** a uniform skyline no matter what the tower rule says. The tower rule
  was never broken — it was *correctly* reflecting its host. The real defect was one line up (`shop=(roads>=2&&…)`,
  L1443), wearing **the identical fault** (siting with no centrality term), and fixing *it* needs no tower change at
  all, because `com>=2` **is already a clustering predicate** and will concentrate towers automatically wherever COM
  concentrates. ⇒ **When a rule's output is mis-distributed, plot the distribution of its HOST before touching the
  rule.** If the host is flat, the rule is innocent and you are about to spend a lap in the wrong file. Corollary,
  paid for twice now: **a fix in the wrong place is worse than no fix** — it passes every gate, banks a real number,
  and leaves a *second* half-finished fix in the file for someone to find in another 119 iterations.
- **A KNOCKOUT SWEEP THAT REMOVES ONE OCCLUDER AT A TIME WILL TELL YOU "NOTHING COVERS IT" — AND BE
  WRONG. When it comes back empty, stop removing things and REPLAY THE DRAW'S OWN GEOMETRY (iter 211).**
  203's `probe-gondz` settles *whether* something is occluded (`occluded% = 1 − inkInPlace/inkOnTop`).
  It does not tell you **what** is doing it, and the obvious next probe — knock out each candidate and
  see which one gives the element back — has **two blind spots that both return a confident zero**:
  (a) **several occluders overlap**, so removing any one leaves the rest still covering; and (b) the
  occluder is the **GROUND PLANE of the hex in front**, which no knockout removes — flattening a
  building (`h=0`) or even retyping it (`t=T.EMPTY`) *still paints its hex*, and `hexTile` draws at
  **1.02 precisely so a tile laps over its neighbour**. 211 flattened an 11×13 block, every entity
  array, the monorail and the cable car, one at a time, and the shelter never reappeared — while a
  `fillRect` spy proved the draw was **executing and issuing its pixels**. The answer came from
  arithmetic, not deletion: **replay the draw's own offsets and ask where it actually puts the object.**
  ⇒ Corollary, and it is an artifact-wide invariant: **a per-hex ornament drawn at an OFFSET from its
  hex centre can land inside the NEXT hex, which is drawn later and paints over it.** The bus shelter
  offset to a "sidewalk side" by `sd=((x+y)&1)?1:-1` had, for the artifact's *entire life*, been
  putting half its shelters on the **near kerb** — inside the hex in front — where they were invisible
  **32%** of the time against **9%** on the far kerb (`probes/probe-kerb.mjs`, and it read the same on
  ordinary stops, so this was never the new feature's bug). **Any draw with a perpendicular/toward-viewer
  offset must check that offset's SIGN against draw order.** Draw order is depth order; an offset is a
  depth decision.
- **A BANKED INSTRUMENT CAN BE THE WRONG INSTRUMENT — AND IT WILL ACQUIT THE VERY THING THE AGENTS KEEP POINTING
  AT (iter 228, sharpening 214).** 214 says build the probe in the units of the complaint. Its nastiest form is
  when a probe **already exists**, was written by an earlier lap, is cited by the cue itself, and is *correct* —
  so nobody re-asks what it measures. Cue (af) (the loudest in the ledger: six agents, three step-backs, "the
  towers are wallpaper") shipped with `probe-facade` as its named instrument. `probe-facade` measures stripe
  **RHYTHM**, and it had **measured TOWER innocent** (42-47 rhythms, top 6%) while the agents went on pointing at
  the towers for three step-backs. Both were true: **a tower can wear a unique stripe rhythm and still be the same
  SHAPE as every other tower.** Every one of the six agents had said **SILHOUETTE** and **ROOF**; not one said
  banding. A new twenty-line draw census (`probe-crown`) found the defect immediately — **4 distinct crowns
  city-wide, 41% of towers ending flat.** ⇒ **Re-derive the instrument from the COMPLAINT'S OWN NOUNS, even when
  the cue hands you a probe.** The tell: the banked probe *passes* the thing the agents *fail*. (This is the cue-is-
  a-POINTER-not-a-SPEC law, one level down: the cue can be wrong about its own instrument.)
  **⇒ BUT THE CONVERSE IS ALSO TRUE, AND OBEYING 228 LITERALLY WILL MAKE YOU REBUILD WHAT YOU ALREADY HAVE: A BANKED
  PROBE CAN CARRY THE RIGHT INSTRUMENT UNDER THE WRONG NAME — READ WHAT IT *MEASURES*, NOT WHAT IT IS *CALLED*
  (iter 235).** 228 says re-derive the instrument from the complaint's nouns *even when the cue hands you a probe*,
  and the header duly warned 235 that `probe-crown` "measures the CROWN, which 228 already fixed. Do not let a banked
  probe acquit the thing the agents keep pointing at." Taken at its word, that says: **build a new probe.** It was
  wrong — and expensively so, because `probe-crown` **already contained the exact instrument the complaint called
  for.** Its `silo()` samples the **absolute half-width at 12 normalised heights**, i.e. *the outline the eye traces
  against the sky*, which is precisely SILHOUETTE/MASS/FOOTPRINT; it was **printing 5.3 shapes / top 54%** — a
  conviction — in a line nobody read, beside the crown headline everybody did. The probe was named for the lap that
  *authored* it, not for everything it measures, and one lap's name became the next lap's blind spot. ⇒ **Before you
  accept OR reject a banked probe, open it and read its metrics against the complaint's nouns, one by one.** 228's
  test ("does the banked probe *pass* the thing the agents *fail*?") must be applied **per metric, not per probe** —
  `probe-crown` passed on `crown` and failed on `silo` **in the same output**. The tell: the cue tells you a probe is
  the wrong instrument, and the reason given is *the name of the lap that wrote it*.
- **A PROBE THAT SAMPLES A *POINT* CANNOT ANSWER A QUESTION ABOUT AN *AREA* — AND IT WILL ANSWER ANYWAY, WITH A
  NUMBER THAT MOVES. CHECK *WHERE* YOUR PROBE SAMPLES, NOT ONLY WHAT IT WEIGHTS (iter 238).** 235 says read what a
  banked probe *measures*, not what it is *called*. 238 is the rung below, and it is the **third** recursion of 228's
  law — this time **inside the probe the previous step-back had just repaired.** `probe-season` samples **one pixel,
  at the hex centre** (`getImageData(sx, sy, 1, 1)`). PARK draws its trees at grid *offsets* and its pond/fountain
  *at* the centre, so the probe is **structurally blind to a park's canopy**. On one single edit it therefore
  reported **PARK 20.8 → 20.9 ("unmoved")** and **FOREST 18.9 → 27.1 ("crossed the legibility floor")** — both pure
  artifacts of where one pixel happened to land; in area units the same edit read 20.2→22.2 and 16.1→19.5, *neither*
  crossing anything. ⚠ **237 had "fixed" this probe by area-weighting BETWEEN tile types and left the sample WITHIN
  a hex at one pixel: two different unit errors, and closing one does not close the other** — the survivor will
  then flatter or damn your change at random, and it looks authoritative because the *other* unit error was just
  fixed. ⇒ **Before trusting any per-instance number, ask what fraction of the instance the probe actually looked
  at.** A point sample is only valid where the host is *homogeneous*; the moment a hex contains furniture, a pond, a
  path or an off-centre ornament, it is a lottery.
  **⇒ AND THE COMPANION MEASUREMENT IS THE ONE THAT SHOULD COME FIRST: BEFORE YOU BELIEVE A PALETTE/DRAW CHANGE CAN
  MOVE A SURFACE, MEASURE WHAT FRACTION OF THAT SURFACE IT ACTUALLY *PAINTS*.** 234's palette-suppression gives it
  for free (loud-paint `BASE[name]`, flush `CCACHE`, re-render in ONE page, and the changed pixels **are** that
  entry — floor exactly 0, occlusion included, build-agnostic). 238 measured it *after* designing and the table
  ended the argument in one line: PARK is **45% lawn, 12% canopy**, and the other **43% is season-dead paths, ponds,
  benches and café furniture** — so a canopy fix could move PARK by ~2 and **no design could have done better**,
  which was knowable before a line was written. The tell: you are about to change one palette entry / one draw and
  claim it will move a whole tile type. **Ask for its coverage first; it is one probe run, and it can save you a
  lap** — or tell you the cue you were handed is unreachable and must be reframed rather than attempted.
  Corollary, cheap and it cost a page crash: **a TERNARY hides a palette name from an anchored grep.**
  `col(t===0?'coniferLt':'conifer', …)` does **not** match `grep "col('conifer'"`. Grep `col([^)]*'name'`.
- **A SELF-REPORTING FRAME MUST SELF-REPORT IN THE *VIEWER'S* UNITS — A CAPTION IN THE RULE'S UNITS IS WORSE THAN NO
  CAPTION, BECAUSE IT LOOKS AUTHORITATIVE AND IT WILL MAKE CORRECT AGENTS LOOK WRONG (iter 236).** 202 says make every
  frame self-report its own state so a mis-pinned frame is caught by the tool, not by a gate round. 205 says state the
  claim in the viewer's units. Put them together carelessly and you get a **confidently mislabelled frame**: 236's
  camera printed `RAINING=7/7`, read straight off the rule that decides which clouds are wet — and **both visual
  agents, blind, on two seeds, counted 2.** They were **right**. The draw spends a shower *2 hexes short of the rim*,
  so a cloud the front has soaked renders **nothing at all** while it drifts out over the void; only **3–4 of 7** ever
  put a veil on the plate. The caption and the pixels were measuring **different quantities**, and because the caption
  was mine I was one step from "the agents cannot count" — the exact inversion 200/205 warn about, now arriving
  through the *instrument's own label*. ⇒ **Before you print a number on a frame, ask whether a viewer could in
  principle arrive at it by looking.** If the rule's number and the drawn number can differ (a mask, a cull, an
  off-screen instance, an occluder), **print BOTH and name which is which** — 236's probe now reports
  `soaked 7/7 -> RENDERED 4/7`, and the gap *is* the finding. The tell: your caption comes from the decision, and the
  agent's answer comes from the canvas.
  Corollary, and it is free every time you fix a *constant that should have been a variable*: **the defect is its own
  perfect control.** When the vector is "make X vary", HEAD's answer is a **constant by construction**, so a temporal
  probe's `DISTINCT STATES = 1` is an unarguable baseline you did not have to design — 236's HEAD read *2 raining
  clouds, forever, on every seed*, and no threshold had to be invented to call that broken.
- **A NUMBER THAT WILL NOT MOVE IS A TELL THAT YOUR INSTRUMENT, NOT THE CITY, IS DECIDING IT (iter 228).** 228's fix
  took tower crowns 4 -> 17 while the "41% flat" bucket sat **exactly unchanged** — the same 35.3% on the same seed,
  before and after. A metric that is *stone* while everything around it moves is not a stubborn defect; it is a
  bucket your probe cannot see into. It was: the helideck is raw `ctx.arc`, invisible to a `prism`/`bandR` hook, so
  **~40% of towers — the TALLEST, read hardest against the sky, all wearing ONE identical bare deck** — were being
  silently filed under "flat". Shipping there would have been **217's law exactly** (a fix to one clause, mistaken
  for a fix to the phenomenon). ⇒ **Before believing a bucket, ACCOUNT for it**: make the probe report the residual
  as its own named column (`crownable-but-bare`, which must go to 0), so the part your hook is blind to cannot hide
  inside the part it can see.
- **BUILD THE PROBE IN THE UNITS OF THE COMPLAINT — a greyscale instrument cannot see "mauve" (iter 214).**
  205 says state the claim in the viewer's units. 214 is the sharper, nastier form: **your probe can be
  measuring a real defect, and still be the wrong instrument.** Three agents across three iterations
  (212 x2, 213) described the night coast with the word **MAUVE** — a HUE. 214 fixated on their other
  phrase ("detail dies") and built a **luminance** probe. It worked: it found a real, large, correctly-
  measured defect (the night beach retains **32%** of its daylight texture vs RES's 103%, because every
  beach detail draw is gated OFF at night). The fix passed that probe beautifully (texture 7.1 -> 20.3,
  every control unmoved) and **both visual agents FAILed it, one of them blind.** The actual bug was
  invisible to the instrument *by construction*: a greyscale probe **cannot represent hue**. One
  colour-space probe found it in a single run, exactly where the agents had been pointing for three
  iterations. ⇒ **When the complaint contains a colour word, measure COLOUR (hue + chroma), not
  luminance.** And generally: before you build the probe, re-read the complaint and ask whether the
  quantity you are about to measure *can even represent the thing being complained about*.
  Corollary — **a probe measuring a NECESSARY but not SUFFICIENT quantity will happily pass a change the
  eye rejects.** "Is there contrast on the beach" is necessary for the beach to read; *a neon tube also
  has contrast*. The claim was "the beach reads as a beach", and no contrast metric can express it.
  **⇒ AND THE NASTIEST FORM: A "DISTINCTNESS" METRIC CAN BE *ANTI-CORRELATED* WITH CORRECTNESS — IT WILL
  REWARD THE VERY BUG YOU ARE FIXING (iter 221).** 214's law says use the right *dimension* (hue, not
  luminance). 221 got the dimension right and the **relation** wrong, and it nearly failed a correct fix.
  The night ground plane was rotating green -> **CYAN**, so the standing cue prescribed the obvious gate:
  *pair PARK<->ROAD separation*. But **a cyan park is maximally far in RGB from its warm tan neighbours** —
  the hue-rotation bug was *inflating* the number the cue said to maximize, and fixing it moved PARK<->RES
  **29 -> 25 (down)** while PARK<->ROAD barely stirred (15 -> 16). A gate on neighbour-separation would
  have read the correct fix as a regression and the bug as healthy. **The claim was never "the park differs
  from its neighbours" — it was "the park is not GREEN".** ⇒ **For an identity/hue claim, gate on the
  surface's distance from ITS OWN DAYLIGHT SELF, not from other surfaces**: PARK's night hue went **113deg
  off its daylight hue -> 20deg off**, which is the claim, stated in its own units. Carry the separations
  as a *guard* (nothing may fall below the ~15 collapse floor), never as the *score*. **The tell: your gate
  is a pairwise/contrast/difference metric, and the defect you are fixing is one of the two things being
  differenced.** (This is why the cue's own suggested gate must be re-derived, not trusted — a cue is a
  POINTER, NOT A SPEC.)
  **⇒ AND ITS PRICE, PAID AT 222: A PER-SURFACE GATE IS BLIND BY CONSTRUCTION TO A CROSS-SURFACE *ORDERING*, SO A
  LADDER OF PER-SURFACE FIXES NEEDS A GLOBAL INVARIANT NO SINGLE LAP CAN CHECK.** 221's law above is correct and it
  is *exactly why the next drift was invisible*. Three laps (214 sand, 220 masonry, 221 greens) each fixed a real
  hue rotation, and each was gated — as mandated — on **its own surface's distance from its own daylight self**.
  None was ever asked about anybody else. But the shared `washRGB` gain triple lifts **luminance** as a side-effect,
  so each lap silently added **+6..+9 night luminance to its own surface** while every un-washed surface moved
  **<=+2** — and after three laps the night brightness ORDERING had inverted: it *was* TOWER 108 > COM 107 > MID 99 >
  BEACH 96 (the three LIT building types on top, correct), and it became TOWER 109 > COM 108 > **BEACH 105** > MID
  101 — **the unlit sand had crossed into the lit city's band**, which two blind agents on two seeds called *"the
  shoreline glows like it's lit at noon."* Every per-lap gate passed, correctly, the whole way down. ⇒ **When you
  are the Nth lap of a ladder applying ONE shared mechanism to a series of surfaces, the per-lap gate is necessary
  and not sufficient: state the invariant that spans the SET** (here: *no UNLIT surface may out-brighten the LIT
  ones*) **and check it every lap.** The tell: a shared helper (`washRGB`, `sandCol`) that several laps call with
  different constants, where each lap's gate reads only its own caller. Corollary: **a fix that corrects dimension A
  (hue) will usually perturb dimension B (luminance) — name B and bound it, or the ladder walks B off a cliff one
  defensible step at a time.**
  **⇒ AND THE MECHANISM BY WHICH B DRIFTS HAS A NAME: A KNOB CHOSEN FOR ITS *RATIOS* WAS NEVER NORMALISED FOR ITS
  *MAGNITUDE*. PREFER A STRUCTURAL INVARIANT TO A CHECKED ONE (iter 223).** 222 says *name dimension B and check it
  every lap*, which is right and is still a discipline someone must remember. 223 found the ladder's actual defect
  and it was **one unnormalised number**. `washRGB`'s comment promised a *"LUMINANCE-MATCHED, hue-preserving"* wash,
  and `L` (the tint's own luminance) genuinely delivered that — then every caller multiplied `L` by a **gain triple**
  chosen for its channel **ratios** (lean the restoration onto the channel carrying the surface's identity), whose
  **magnitude nobody normalised**: sand `1.15/1.08/1.06` has a luma-weighted mean of **1.099**, green
  `1.08/1.15/1.06` of **1.119**. So each rung silently gifted its surface **~10% night luminance** while fixing its
  hue, and each rung's gate — *correctly, per 221* — only ever asked about hue. The fix is one line
  (`n = 1/(gr*0.30 + gg*0.59 + gb*0.11)`), and it is strictly better than a checked invariant: a **uniform rescale
  cannot rotate a colour**, so the hue is preserved *by construction* while luminance loses the freedom to drift.
  ⇒ **When several callers tune a shared mechanism through a per-caller vector, ask what that vector is chosen FOR
  (a direction) and what it therefore silently also moves (a magnitude) — then normalise the second at the source.**
  The tell: a helper whose comment states an invariant, and a caller-supplied multiplier applied *after* the line
  that establishes it. **A drift you make impossible beats a drift you agree to look for.**
- **A FLAT PER-CHANNEL MULTIPLY IS NOT A TINT ON A SATURATED SURFACE — IT IS A HUE ROTATION (iter 214).**
  The night light is applied as `base[i] * TINT[i]`, and `TINT` is named for what it is *meant* to do —
  wash the scene cooler while leaving each surface recognisably itself. Its VALUE cannot do that. The
  night tint is **`[.42,.42,.58]`**: it lifts blue and crushes green, so it does not *darken* a warm
  surface, it **rotates its hue**. Sand's base `[238,220,178]` runs R>G>B (hue 40, chroma 77); times that
  tint it comes out `[103,92,103]` — **R and B land on the same value, G becomes the MINIMUM** — hue
  **309**, chroma **12**. Violet. Measured over 3 seeds, the night beach then sat **44 RGB units from the
  ROAD, both at hue ~308**, where they sat 116 apart by day: **the sand and the asphalt were the same
  colour**, which is precisely what five agents called "a flat mauve mass" and "asphalt". This is
  **199's law's next host** (a constant whose *name* asserts a behaviour its *value* cannot have), and it
  is a whole CLASS of bug, not one tile. ⇒ **Audit it, don't guess:** `probes/probe-sandhue.mjs` prints
  night hue+chroma per tile — **any surface whose identity is its WARMTH, landing near hue ~308 with
  chroma <15, has been rotated.** (ROAD at 308 is *fine*: asphalt genuinely is grey. The bug only bites a
  surface that is *supposed* to be warm.) The fix is a **luminance-matched, hue-preserving** wash for that
  surface (`sandCol()`), which is colour-only: **zero path objects, zero geometry, and free by the
  perf model.** Gate it at the same `LITAMT` 0.35 cut the lit glass uses and daylight stays byte-identical.
  **⇒ BUT "hue ~308 / chroma <15" IS A SUFFICIENT TEST, NOT A NECESSARY ONE — IT ONLY FIRES ON SURFACES
  BLUE ENOUGH TO *INVERT*, AND IT WILL WALK PAST EVERY WARM SURFACE THAT MERELY GOES GREY (iter 234).**
  Whether the tint rotates a surface all the way to violet is a fact about **that surface's blue channel**,
  not about the bug. Sand `[238,220,178]`: `.58*178 = 103 > .42*238 = 100`, so blue overtakes red, the
  channel order inverts to B>R>G, and it lands on hue 309 — the audit fires. The pier deck `[196,164,118]`
  has the *same bug from the same line of code*, but its blue is only 118, so red still wins (`82 > 68`),
  **the channel order HOLDS**, and it lands on hue **2** — where the 308 test says nothing is wrong. It is
  not violet; it is **GREY** (measured: day hue 38 / chroma 73 → night hue 2 / chroma **13**, 82% of its
  colour gone), and it sat un-fixed through the entire wash ladder (214→220→221→223) *because the banked
  audit could not see it*. **The load-bearing half of that test was always the CHROMA.** ⇒ **Audit by
  221's gate — the surface's angular distance from ITS OWN DAYLIGHT HUE, plus its chroma retention — and
  never by a fixed target hue.** `dHUE` is the honest number in every case (deck: **36° → 6.5°**; sand's
  old rotation was 91°), and unlike "is it near 308" it is meaningful for a surface of *any* base colour.
  Corollary, and it is why this is worth a law rather than a note: **a cue's NOUN can be wrong while its
  MECHANISM is right.** Cue (u) said the deck was *violet* — it never was — and the cue was still pointing
  at exactly the right line. **Believe a cue's pointer; re-measure its adjective** (the cue-is-a-POINTER-
  not-a-SPEC law, wearing a colour word).
- **ON A PER-EDGE DRAW, LEGIBILITY AND GRID-EXPOSURE ARE THE SAME QUANTITY — you cannot escape 159 by
  keeping the shape and changing only the TONE (iter 214).** 159 says a glowing line along a hex edge
  reads as a neon tube and must become dots. 214 read that law, *quoted it in the code comment*, and
  reasoned around it: the beach's damp band is *already* a per-edge stroke and reads beautifully by day,
  so surely re-tinting it (same geometry, same width, same softness, same clip — only the colour crossing
  from dark to bright) is safe? **It is not, and both agents said why in the same breath.** The day band
  works **BECAUSE it is dark and low-contrast**: *"at day the band is only slightly lighter than the sand,
  so the polygon corners disappear. **The moment you crank the luminance, the geometry becomes the
  subject.**"* The hex geometry is **always** in a per-edge stroke; contrast is the dial that makes it
  visible. So a per-edge band can be *subtle* or it can be *bright*, and it can never be both-and-legible.
  ⇒ **A "same shape, new tone" argument is not a defence against 159 — it is the trap.** If the feature
  needs to be SEEN at night, it needs a different SHAPE (points), or a different SURFACE (the tile body,
  which has no edges to betray).
- **AN INK-WEIGHTED CENTROID MEASURES *REWEIGHTING*, NOT *DISPLACEMENT* — when the claim is that something MOVED,
  measure the move PER OBJECT, never as a global centre of mass (iter 225).** 161 says a whole-frame patch-vs-HEAD
  diff locates your change *by construction*, and that is true — but locating the ink is not the same as measuring
  what the ink *did*, and the obvious next step is a trap. 225's first probe isolated the shadow layer perfectly
  (render twice, once with `shadS` suppressed; the difference IS every shadow in the city) and then took the
  **ink-weighted centroid** of that layer, HEAD vs patch, to measure how far the shadows were thrown. It returned
  **the WRONG SIGN on both seeds** — reporting the city's shadows had swung *left* at the exact hour the code threw
  them *right* — plus an ink ratio of **2.5x** where the geometry predicted 1.2x. One cause for both: a shadow on
  bright sand contributes far more ink than one on dark asphalt, so when the shadows grew, **the ink reweighted
  across the city** and the global centroid moved for reasons having nothing to do with any shadow's displacement.
  ⇒ **A centroid over a frame is a statistic about WHERE THE INK IS, not about WHERE ANYTHING WENT.** Measure a
  displacement in the draw's own device-space coordinates (wrap the primitive, read `ctx.getTransform()` at draw
  time — 203) and difference it **per object**; the result is then scale-invariant and falsifiable (225's read the
  design constants back to two decimals at every zoom, with two independent no-move hours pinned at exactly 0.00).
  Two corollaries: (a) **a RATIO THAT OVERSHOOTS THE GEOMETRY is the tell** that your weights, not your feature, are
  moving — if the shape grew 1.2x and the ink grew 2.5x, stop and re-read the instrument; (b) **pairing by INDEX is
  fragile** — the entity population wobbles ~0.2% per load, one missing object shifts every later index, so take the
  statistic over the **POPULATION** (204) rather than per-index, or gate on the counts matching.
- **A DOMAIN IS "SATURATED" ONLY RELATIVE TO THE CUES YOU HAVE BANKED — WHEN A STALE DOMAIN'S CUE LIST LOOKS DEAD,
  GREP ITS SEAM BEFORE YOU SKIP IT (iter 225).** The ledger header had written Sky off as post-saturation with two
  weak cues, one a confirmed dead end, and instructed the next lap to fall through to another domain if Sky "again
  has nothing." Sky had plenty: `shadS` — **the one function every shadow in the city routes through** — was drawing
  a centred ellipse at a hard-coded alpha, identical at dawn, noon, golden hour and midnight, in an artifact that
  *moves a sun across the sky and sets it*. That is 199's tell (a name asserting a behaviour its value cannot have)
  hosted on a **function**, and no amount of re-reading the banked cue list would ever have surfaced it. ⇒ The
  saturation notes record *where you have already looked*, which is **not** the same as where there is nothing to
  find. Spend one `grep` on the stale domain's seams before you accept its own verdict on itself.
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
- **A STABLE INTERLEAVED TIMING DELTA CAN STILL BE PURE NOISE — when you cannot EXPLAIN a cost, stop timing and COUNT
  PATH OBJECTS (iter 216).** Every perf law here says *interleave against pristine HEAD, min per variant*, because
  consecutive passes lie (117). True — but it leaves the impression that an interleaved number is therefore
  **trustworthy**, and it is not. Two interleaved A/B rounds graded 216's draw-only facade change at a *stable* day
  **+2.2% / +2.8%** (night +0.4/+0.1). Stable, repeated, and **entirely machine load** — 117's own false signal
  (+25.5/+26.0/+26.5% on a diff with **zero draw calls**) wearing the interleave as camouflage. The way out is not
  another round: it is to **change instrument.** 198 established that cost on this canvas is **per path object**, so
  path-object count is a **deterministic, load-immune proxy for cost**, and `probes/probe-drawbudget.mjs` prints it.
  216's edit measured **104,745 → 104,753 path objects (+8, +0.008%)** with `bandS` byte-identical: **+8 objects
  cannot cost 2.5% of a frame**, so the verdict is FREE and the timing gate was reporting the weather. ⇒ **Reach for
  the deterministic instrument whenever the timing gate's number has no MECHANISM behind it.** This is the third time
  the loop has paid for the same shape (with 200 and 205): **when two instruments disagree, ask which one measures the
  thing that CAUSES the effect — don't just re-run whichever is easiest to re-run.** Corollary, worth doing on any
  draw change: **hold the MEAN of whatever you jitter** (98's hold-the-mean law) and the path count — hence the cost —
  stays flat *by construction*, so the perf question never opens at all.
  **⇒ BUT RUN THE SAME INSTRUMENT WHEN THEY *AGREE*, BECAUSE "NO NEW DRAW CALL" IS NOT "NO NEW DRAW WORK" — THE WORLD
  IS THE DRAW LIST (iter 222).** 216 uses the path-object count to *acquit* a draw change the timer had wrongly
  convicted. 222 ran it expecting the same acquittal — a lap of four iterations that added **no drawing primitive at
  all** (two colour-only washes, one world-data siting rule, one revert) was reading a stable day +3.3% / night +4.2%,
  which looked exactly like 216's phantom. **It was not.** Path objects read **day 104,787 → 108,007 (+3.1%)** and
  **night 132,547 → 138,734 (+4.7%)** — agreeing with the timer to within 0.5pp, so the cost was **real**, and the
  mechanism was the *world*: iter 219's siting fix had concentrated COM downtown, more COM grows more TOWERs, and a
  tower is `prismS`/`bandS` bands by day and `winBandR` lit panes by night (which is why **night grew more than day** —
  the signature of the mechanism, visible in the numbers). ⇒ **A rule that changes which tiles EXIST changes how many
  objects are rasterized every frame, forever, even though its diff contains not one drawing call.** The loop had been
  pricing CA/siting/`tick()` vectors as free by *reading the diff* — and had written "219 is world-data only (no new
  draw call) — arc unmoved" straight into the ledger header, where it was false. **Price a world-changing vector by
  COUNTING OBJECTS, not by inspecting its diff**; it is one command, and it is the only way the loop can tell "this
  city got denser" (a cost worth paying) from "this draw got fatter" (a cost to interrogate).
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
- **NAME THE FILE, NEVER A LETTER — "FRAME A / FRAME B" IS A TRANSPOSITION HAZARD, AND IT WILL HAND YOU A
  PERFECT INVERSION OF A CORRECT RESULT (iter 239).** 238 crosses the A/B mapping between seeds so that
  *"the fix is always the second one"* fails on one of them. That defends against a **bias** and does
  nothing about the **bookkeeping**, which is the failure that actually happens: 239's seed-42 agent read
  four PNGs, formed an entirely correct perception, and **attached it to the wrong letter** — reporting
  pristine HEAD as the varied build and the patch as *"essentially one shape"*, the exact inverse of a probe
  that had measured 2.0 → 20.7 silhouettes with its control unmoved. The tell that it was bookkeeping and not
  perception: **its description of the losing frame named a feature that exists ONLY in the patch** (*"a wider
  skirt/base course under a set-back upper volume"*). An A/B letter is a **pointer the agent must maintain
  across four images**, and pointers get swapped; a **path is self-identifying and cannot be**. ⇒ Give the
  agent the **file paths**, tell it to **refer to each by name**, and ask it to report **per file** — never
  "which of A/B is better". Then *you* map name → build, which is a lookup you control. The same discipline
  makes the answer checkable: `mid7head/day.png ~1 shape · mid7/day.png ~4 shapes` is a sentence you can
  verify against ground truth you already hold; *"B is better"* is not.
  ⚠ **And when a visual read inverts a measurement, check the INSTRUMENT before you re-argue the result**
  (197): confirm by **md5** that the file on disk is the build you think it is (a perf/probe run `/bin/cp`s
  HEAD aside and can leave it swapped) and that the two PNGs actually **differ**. Only then spend the budget
  and **look yourself** — that is precisely the case the visual gate's "look at *that one* PNG" clause is
  reserved for.
- **Ask an agent to LOCATE, not to JUDGE** (108) — see the visual gate. And when
  agents disagree, **a probe is the verdict, not a rerun** — ***but only if the probe measures what the
  claim is about* (iter 200).** This is the one recorded case where the agents were right and the probe
  was wrong, and the standing law above would have told you to override them. The probe was measuring a
  *layer the user never looks at*. So when a probe and an agent disagree, do not just re-run either one:
  **first ask what each is actually looking at.** A number beats a vibe only when it is a number *about
  the same thing*. (The locate-don't-judge discipline is what made this catchable: agents asked to
  *point at* the sun returned positions within ~0.01 of the shipped formula on every frame where it was
  visible, which is exactly why their "there is no sun here" was credible rather than vague.)
  **⇒ BUT FIRST CHECK THE THING YOU ASKED THEM TO LOCATE IS VISIBLE IN THE PROJECTION AT ALL — SCREEN-Y IS
  DEPTH, NOT HEIGHT (iter 224).** 108 says ask an agent to LOCATE because a wrong answer is *visibly* wrong.
  That only holds if the quantity you name is one the projection **preserves**, and the most obvious quantity
  in a city — **how tall a building is** — is one it **destroys**. A cell's baseline is `ctr(x,y).y =
  (y+0.5)*ROWY`, so the apex is `(row baseline − height)`: across ~30 rows the baseline moves far more than any
  building height, and **the topmost thing in the image is the farthest-back thing, not the tallest.** Measured
  (`probes/probe-apex.mjs`): `corr(screen apex, true height)` = **0.262 / −0.289**, while `corr(screen apex,
  ROW/depth)` = **0.995 on every seed.** So cue (ac)'s mandated gate — *"a blind 'point at the TALLEST tower'
  must land in the core"* — was **unanswerable by eye**, and an agent duly pointed at (0.44, 0.12) on a frame
  whose CBD is at y=0.625: it had found the **height-91 rim tower at row 2**, exactly as the projection
  dictates. That is not a bad agent, it is a **bad question**, and it cost a full gate round. ⇒ **Before you
  ask a blind locate, ask what the projection does to the quantity you are naming.** Re-phrased in a
  projection-safe unit — *"judge height ONLY by the length of the vertical wall, never by position in the
  frame"* — the same agent, blind, counted **5–8 massive outskirt slabs in HEAD and "essentially none" in the
  patch** and matched the world data exactly. **Name a quantity the projection keeps** (drawn wall length, ink,
  colour, count, left-right position — `sx` survives fine), or **aim the camera** (201) so the comparison is
  local and depth is held constant.
- **WHEN YOU FIX A QUANTITY, GREP FOR EVERY RULE THAT *WRITES* IT (iter 224 — 217's sibling).** 217 says: when a
  rule decides both *whether* and *how much*, a fix to one clause is mistaken for a fix to the phenomenon. Its
  sibling is the same defect one scope wider: **one field, written by TWO RULES IN DIFFERENT BRANCHES**, where a
  later lap fixes the writer it happened to be reading and never learns the other exists. `c.th` (tower height)
  is set at **placement** — which iter 98 correctly keyed to `core` — and then *written again* by a **2022+ growth
  rule in a different `else if`**, `c.th += 9+c.v*12` under a **flat universal ceiling of 160 with no `core`
  anywhere**. It survived **126 iterations** and every gate, and it is what kept the skyline flat: the rim slowly
  climbed to the very ceiling downtown already sat at. **Its own comment said `/* the downtown keeps rising */`**
  — 199's tell, on a rule that lifted the *whole city, uniformly*. ⇒ Before you tune a field, `grep -n` for every
  assignment to it (`c.th=`, `c.th+=`) and read them **together**. A quantity with two writers has two
  distributions, and you are only ever looking at one of them.
  **⇒ AND ITS COROLLARY, PAID FOR TWICE: A CONSTANT SOLVED AGAINST A MEASURED WORLD STATISTIC WILL ROT WHEN A
  LATER LAP MOVES THAT STATISTIC — NORMALISE BY THE FORMULA'S OWN MAX, NOT BY THE WORLD'S MEAN.** 98 solved
  `0.70+0.66*core` to hold-the-mean against a **measured mean `core` over tower sites of 0.125**. That number is
  not a constant of the code — it is a property of **where COM happens to sit** — and **219 concentrated COM
  downtown**, silently taking it to **0.282** and invalidating the solve, unnoticed for six laps. 224's `TCAP`
  normalises by the centrality shape's own **max (1.36)**, which is a property of the *formula* and cannot drift.
  This is 223's law (*prefer a structural invariant to a checked one*) arriving from a second direction — and it
  is why 224 **rejected a higher-scoring variant** that needed a `/0.886` derived from the same rotting statistic.
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
- **IN A WHOLE-FRAME READ, THE VERDICT IS WHERE AN AGENT IS WRONG AND THE ASIDE IS WHERE IT IS RIGHT (iter 212).**
  The locate-don't-judge law says a FAIL is a cue to measure. 212 shows *which part* of an agent's reply to trust,
  and it inverts the obvious reading. Both step-back agents FAILed, on two different, confident, specific causes —
  and **measurement refuted both**: the "elevated rail is drawn over the towers" was a z-order claim, and
  `probe-monoz` found `drawMonoAt` **10.6–19.8% occluded** on every seed and light (properly depth-sorted, the third
  clearing of the same accusation after 202 and 203); the "golden-hour sun sits in the cold sky" was factually true
  and still wrong, being 201's objection-to-the-model (the sun is high *on purpose* — the placard owns the low-left
  sky). Yet **the two things they mentioned only in passing, unprompted, and independently agreed on across two
  seeds — the night coast flattening to a mauve void, and one building type repeating into wallpaper — were real,
  unrefuted, and exactly the cumulative drift a step-back exists to catch.** The asymmetry has a cause: a FAIL is a
  *diagnosis*, and diagnosing requires a causal model the agent does not have (it cannot see the draw order, the
  HUD, or the plate's geometry); an aside is a *perception*, and perceiving is the one thing it is actually better
  at than you. ⇒ **Grade the FAIL by measuring it. Mine the asides for cues — and weight an aside that two agents
  reach independently, on different seeds, above any verdict either of them gives you.**
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
  `probe-sandhue.mjs` (**night hue+chroma per tile — the hue-rotation audit**; any warm surface at
  hue ~308 / chroma <15 has been rotated to violet, see the law above), `probe-nightsand.mjs` (per-tile
  within-hex TEXTURE retention, day vs night, with non-coastal controls), `probe-sandinert.mjs`
  (patch-vs-HEAD whole-frame isolation with the floor measured in-run), `shot-nightsand.mjs` (the coast
  camera: whole-city + a close-up AIMED at the longest run of sea-facing beach, plus a day control;
  freezes in-page and forces `syncSky`/`syncStats` per 204).
  `probe-facade.mjs` (**is a building type WALLPAPER?** — wraps `winBandR` and records the true SCREEN
  ROW of every window band the frame issues, so it measures the *draw*, not the source, and runs
  unchanged on HEAD and patch. Reports distinct stripe rhythms, the top rhythm's share of the stock, and
  the corduroy number: **what % of a building's bands land on an IDENTICAL screen row as its E-W
  neighbour's**. MID vs TOWER is treatment vs control), `shot-facade.mjs` (the facade camera: aims at the
  densest MID cluster — deterministic per seed, so HEAD and patch frame the same hex — day + night + a
  whole-city frame),
  `probe-seamhost.mjs` (**does the sand<->green seam exist, and where?** — 6-seed adjacency census;
  the dead-code check run *before* 215 designed anything), `probe-seam.mjs` (**cross-boundary colour
  MIXING** — green ink landing on seam sand / tan ink on seam lawn, with off-seam sand and lawn as the
  controls that must not move; floor measured in-run), `shot-seam.mjs` (the seam camera: whole-city +
  a 4.2x close-up **aimed** at the longest run of seam, day and night, patch and HEAD).
  `probe-towerroll.mjs` (**is this `tick()` rule's `rng()<p` a DEAD LEVER?** — prints `converted / (converted +
  still-eligible)` per ring. **~100% ⇒ the roll saturated and `p` steers nothing; only the PREDICATE can.** Run it
  BEFORE tuning any siting probability — it refuted 217's prescribed fix in one command),
  `probe-shopcore.mjs` (**the COM-siting fork: is its roll one-shot or saturated, and what does a `core` preference
  do to it?** Part A counts **hits/cell** — the direct test of the one-shot-vs-saturating tell above. Part B sweeps
  candidate preferences on **both** of 206's ledgers, and it is the probe that caught the `A<1` cut: a variant table
  where the *ratio* improves while the **counts and the pop fall** is the tell),
  `probe-downtownmass.mjs` (**is there a skyline, in the units the eye reads?** — pure world data, no render, no
  clock: share of the city's total tower **HEIGHT** inside ring 0-8, the far-rim tower count, and the height-weighted
  mass centroid vs the mean developed distance. It is what refuted 219's two agent FAILs — the "picket forest" they
  blamed on the patch moved by **one tower**), `probe-quorum.mjs`
  (the companion **variant sweep**: grades candidate *predicates* on both of 206's ledgers at once — the EFFECT
  (core/rim contrast) and the COST TO THE POPULATION (towers, pop) — so a starving gate outs itself in the table),
  `shot-downtown.mjs` (whole-city day+night frame **plus the CBD's true screen fraction**, so a blind "point at
  downtown" answer is checkable against ground truth — 108's locate-don't-judge, with the answer key),
  `probe-skyline.mjs` (**is there a DOWNTOWN?** — bins every live cell by `hexDist` from the published CBD and
  reports TOWER *density* per ring against mean tower height as the control. **Pure world data: no render, no clock,
  no noise floor** — the cheapest probe in the harness, and the one that settled 217. Reach for it for any claim
  about *where* a tile type sits), `probe-goldenhue.mjs` (**per-tile hue / chroma / luminance at day, golden and
  night, plus the pairwise separation matrix** — the general form of 214's `probe-sandhue`: it answers *"does tile X
  keep its identity from tile Y under light L?"*. Any surface pair collapsing below ~15 RGB units has lost its
  identity. ✅ **REPAIRED at 251, and it had been lying in TWO ways at once**: it sampled **ONE PIXEL AT THE HEX
  CENTRE** (238's defect — on a building that is its **ROOF**, so its *"night luminance"* of every LIT type had
  **never once included a lit window**), and it scored 222's ordering invariant on the **MEAN**, which folds a lit
  building's dark wall back in. It now samples the hex's **AREA** and scores the invariant on the **p90 ENVELOPE** —
  *the eye reads the EXTREME* (224) — under which **pristine HEAD PASSES by 21**. ⚠ It also carries **`BEACH↔ROAD`**,
  **214's own headline pair**, which it never had: that is the guard any change to the night sand must clear, and it
  is what convicted 251's own patch. **Trust it again; do NOT re-open the night sand or the night greens (cue (ag) is
  CLOSED, refuted).** ✅ **REPAIRED AGAIN at 265, and this time it was the CLOCK**: it pinned golden at a literal
  **`t=0.68`** — the pin 261's `sunWarp` rotted and 264 fixed *in the camera but not here* — so it had been grading the
  ledger's #1 cue at **`GWARM` 0.36 of 0.779**, under half strength, for its whole life. The pin is now **DERIVED
  in-page as the argmax of the shipped `GWARM`** (249) and the frame **self-reports it** (202). ⚠ **But it samples the
  PARK HEX, and a park hex is only 45% lawn + 12% canopy — the other 43% is season-dead paths, ponds and furniture
  (238)** — so it **dilutes a vegetation change by more than half** and reported a **3°** move where the grass itself
  moved **15°**. **For any claim about the GREENS themselves, use `probe-greenhue`, not this.**
  The **green pair** (265 — reach for these on any vector about an ILLUMINANT, a wash, or a surface's COLOUR IDENTITY
  under a light): `probe-greenhue.mjs` (**does this light rotate the greens off their own hue?** 234's palette
  suppression aimed at **`LEAFN`** — loud-paint the entry, diff in ONE page, and the changed pixels ARE the greens:
  floor exactly **0**, occlusion free, **BUILD-AGNOSTIC** (the mask comes from each build's own render, so it runs
  unchanged on HEAD and patch with no source swap and no cross-build floor). Scored on **221's `dHUE`** — the surface's
  distance from its OWN daylight self, never a pairwise separation — beside the one binary that needs **no threshold at
  all**: **is G still the MAX CHANNEL, i.e. is the grass still GREEN?** (HEAD reads **NOT GREEN on 3/3 seeds**, which is
  the defect stating itself — 236.) ⚠ **Its WARM-palette column is the must-not-move control** (250): `sandCol` passes
  no golden dial *on purpose*, so if the sand rotates, the wash has leaked and the lap is **fighting the light** instead
  of fixing the collapse. ⚠ **Its DAY column is the free dead-regime control** (199) — the dial is 0 at noon, so daylight
  must come back **identical**. ⚠ **Its mask threshold is 150, ≈36% opacity, and that is LOAD-BEARING** — see the law:
  at 24 it measures the tan ground under the specks), `shot-greenhue.mjs` (its camera — whole plate **un-zoomed** (the
  complaint is a whole-plate one) plus a close-up **aimed by measured ink** (226/234), pin **DERIVED** from `GWARM` never
  typed (264), frames named **by FILE** (239) with the map **CROSSED between seeds** (238). ⚠ **Its DAY frame is a
  REQUIRED POSITIVE TWIN, not decoration** (258): the two day frames must be indistinguishable, and if an agent can tell
  them apart the patch has leaked into daylight. ⚠ **`window.__fit` DOES NOT EXIST** — the fit camera is the globals
  `fitScale`/`fitX`/`fitY` (L8467); `shot-canopy.mjs` still carries the dead reference).
  `probe-deckhue.mjs` (234 — **the colour of a draw that has NO TILE TYPE.** Loud-paints `BASE.deck`, diffs
  inside one page, and the changed pixels ARE the deck (see the palette-suppression law): reports its rendered
  hue / chroma / luminance, and gates on **`dHUE` — its angular distance from its OWN daylight hue** (221),
  never a pairwise separation. Build-agnostic, floor 0, with the **day columns as the free dead-regime
  control**. Retarget it at any palette name by changing the two `BASE.*` lines — it is the instrument for
  every ornament the per-tile samplers cannot see), `shot-deck.mjs` (its camera — **aimed by measured ink**:
  takes the argmax window of that same mask, so it points at where the timber provably renders rather than at
  a guessed clip; `AIM=wx,wy` forces the world point so the HEAD build frames the identical hex and the
  before/after pair is **blind**. Shoots the whole-city night frame too, per the un-zoomed rule).
  The **skyline four** (224, all pure world data — no render, no clock, no noise floor, nothing to stub):
  `probe-taper.mjs` (per-ring tower height: mean, **max (the ENVELOPE)**, `corr(th,core)`, where the tallest
  actually stands, and **the mean `core` over tower sites** — the statistic 98 hard-coded and 219 invalidated;
  print it before trusting any tower constant), `probe-towergrow.mjs` (**splits height into PLACEMENT vs the 2022+
  GROWTH rule** — it is what found that growth's *mean* is small and flat while its **tail** is fat and
  centrality-blind; reach for it whenever a quantity has two writers), `probe-crownsweep.mjs` (**the two-ledger
  variant sweep** for the skyline: grades candidate height formulas on the EFFECT (`crownGap`, envelope, corr) and
  the COST (towers/tallTowers/helipads/towerHt/pop) at once — it is what showed the cue's own prescription made the
  crown *worse*), and `probe-apex.mjs` (**is this quantity even visible in the projection?** — reports
  `corr(screen apex, true height)` vs `corr(screen apex, ROW/depth)`; it reads **0.26 / 0.995**, which is the proof
  that screen-y is depth. **Run it before asking any agent to locate something by how HIGH it sits in the frame.**)
  `probe-queueshadow.mjs` (226 — **does this draw-only ornament RENDER, and does it follow the sun?** Isolates a new
  draw **by stack-suppressing its own call sites** and re-rendering *in one page*, so the diff IS the change at a
  noise floor of **exactly 0**, off the final composited canvas (occlusion checked for free). Carries `stray` ink as
  the control that nothing else moved, and measures the throw **per object against its own noon** — the raw left/right
  ink split is biased by surface brightness and read 63–72% west at `SHOFF=0`),
  `probe-shadowparity.mjs` (226 — **is my new ornament the same as the one the artifact already ships?** Isolates the
  newcomer AND the incumbent with the same rig and prints px/figure side by side. The answer to *"an agent cannot see
  it"* when the vector is "apply the house standard to the last thing lacking it" — see the law above),
  `shot-queueshadow.mjs` (the aimed camera: finds the instance whose ornament **measurably renders the most ink** and
  centres on it, then hands the same aim to the HEAD build so the blind before/after pair frames the identical hex —
  because `openFront`/`frontLoad` will hand you a buried one).
  `probe-crown.mjs` (228 — **is this building type the same SHAPE every time?** ⚠ **BADLY NAMED: it reports TWO
  independent metrics and BOTH are load-bearing** — `silo` (distinct **SILHOUETTES**: the absolute half-width sampled
  at 12 normalised heights = the outline the eye traces, which is MASS/FOOTPRINT) *and* `crown` (what sits at the
  roofline). 228 fixed the crown; **235 fixed the silhouette off the same probe**, which had been quietly convicting
  the towers the whole time (see the read-what-it-MEASURES law). Wraps `drawBuilding`+`prism`+`bandR`, so it censuses
  the massing the frame actually *draws*. Build-agnostic — runs unchanged on HEAD and patch — with **MID as the
  control**. ⚠ It reports **`crownable-but-bare`**
  separately, because a hook on `prism`/`bandR` is **blind to raw-`ctx` crowns** like the helideck and would
  otherwise file them under "flat"), `shot-crown.mjs` (its camera: whole-city *and* a close-up aimed at the CBD, day
  + night, `SRC=` to shoot the identical framing on HEAD for a blind A/B; every frame self-reports `dayT`/`phase`/
  `sun`/`LITAMT` per 202 — ⚠ `phaseWord` takes `dayT`, and calling it **bare** labels every frame `night`),
  `probe-charset.mjs` (229 — **is the artifact self-describing, or is the SERVER holding it up?** Serves the same
  bytes three ways — `file://` · http `text/html` (= `shoot.mjs`, **no charset**) · http `charset=utf-8` (= GitHub
  Pages, measured live) — and reads the strings back **as the JS engine decoded them**, since the inline `<script>`
  is decoded with the document and a mis-decode corrupts the string *literals*. **FAILs unless all three come back
  UTF-8.** Run it if you ever touch the head of the file), `probe-hud.mjs` (229 — **is the HUD clipping its own
  labels?** Pure DOM: `scrollWidth > clientWidth` per stat, plus each box's overrun past the viewport, swept across
  6 widths 1600→390. **Every probe in `probes/` reads the canvas and is blind to this layer (200)** — this is the
  one that can see it. It **refuted cue (z)**: 0 clipped labels at every width, ≥20px spare), `shot-charset.mjs`
  (229 — the camera that pins the **harsh** serving condition on purpose (http, no charset), because the harness's
  own cameras disagree: `shoot.mjs` **creates** the mojibake and `hovershot.mjs` (`file://`) **hides** it. Shoots
  the tooltip + stats + whole frame; `SRC=` for a blind HEAD/patch pair. ⚠ `__find` returns HEX indices in `x`/`y`
  and SCREEN px in **`sx`/`sy`** — aim at `sx`/`sy`),
  `probe-nightfleet.mjs` (230 — **does this conditional-on-an-entity feature actually fire, and does it RENDER?**
  Part A sweeps the HOUR over **one** city built once per seed, so the fleet is held fixed and the visible mix is a
  pure function of the clock (no pixels ⇒ no noise floor at all); daylight is the free dead-regime control. Part B
  is the **mutate-the-data** rig of the law above — isolate the feature inside ONE page by clearing the state it
  reads (`v.out = undefined`), floor **exactly 0**. Reach for it for any *hide/show/gate* feature, where a build
  swap's floor swamps the signal), `shot-nightfleet.mjs` (its camera — **aims by the counterfactual**: the hidden
  thing has no `_sx`, so it renders the feature OFF to find where the departed traffic *would* be, centres there,
  then lets the feature back in. Shoots a **blind A/B** of the identical frozen hex, shipped vs feature-off, for a
  LOCATE question with a checkable answer),
  `probe-hudfreeze.mjs` (227 — **is this a real bug, or is my frozen camera lying about the DOM?** Three cases at
  one pin: **A** frozen exactly as the shot does it · **B** frozen + `syncStats()` · **C** actually playing. **A
  stale while B and C agree ⇒ the camera lies and the artifact is innocent.** It cleared the "night frame says
  DAYTIME" FAIL that two agents raised on two seeds. Reach for it whenever agents report a *readout* — a HUD word, a
  stat, a label — disagreeing with the *canvas*: the canvas is live and the DOM is not.)
  The **siting four** (231 — reach for these on any vector that *places* something):
  `probe-amphvis.mjs` (**can this ground-level thing BE SEEN?** — `occluded% = 1 − inkInPlace/inkOnTop`, isolating the
  host by suppressing its own `drawCell` **inside one page**, so the floor is exactly **0** and occlusion is checked
  off the final composited canvas. Carries the **population** count beside it, because a siting preference must never
  starve a one-per-city tile. Retarget it by changing the `kind` it looks for),
  `probe-amphgrow.mjs` (**did the city grow up in FRONT of it?** — prints the host's occlusion predicate at **siting**
  and again at **render**. Pure world data. If it rises, your rule optimized a property the city then destroyed),
  `probe-amphfuture.mjs` (**the honest siting sweep** — every variant picks on the YOUNG terrain the rule actually
  sees, and is graded by measured ink in the MATURE frame that actually renders. The mature-world version of this
  sweep is a **leak** and misranked 231 by 3x — see the law), `shot-amphsite.mjs` (the camera: aims at each build's
  **own** host, self-reports the front's tile types + heights, day+night, `SRC=` for a blind HEAD/patch pair).
  `probe-front.mjs` (236 — **the TEMPORAL probe: does this thing actually CHANGE OVER TIME?** Every other gate here
  is frozen, so a claim about *cadence* has no instrument (134). Part A runs the clock and counts **DISTINCT STATES**
  (HEAD's weather reads **1** — a constant, which is the defect stating itself); Part B measures the fastest possible
  turn-on in **units/sec** and converts it to a fade time, so a **strobe** cannot hide; Part C pins the cycle with
  `__setYear` to prove it is deterministic; Part D reports the thing in **the VIEWER'S units** — `soaked N/7 ->
  RENDERED M/7`, plus the feature's ink isolated by **suppression in one page** (floor exactly 0) **with the HUD
  masked out** (200). Reach for it for any *cycle, rhythm, schedule or weather* vector), `shot-front.mjs` (its camera:
  freezes in-page and **searches for the `year` that hits a target front while HOLDING THE SEASON FIXED** — season is
  `year%1`, the front a ~20yr cycle, so `year+k` varies one and not the other. Every frame self-reports — ⚠ **and
  236's law: self-report in the VIEWER'S units, or the caption lies with authority**).
  `probe-seasonarea.mjs` (238 — **the AREA form of `probe-season`, and the one to use for any "does the viewer see
  it" claim.** Samples the hex's whole **box** (mean per-pixel |dRGB| — an integral, so it cannot cancel) instead of
  `probe-season`'s ONE CENTRE PIXEL, which is blind to anything a tile draws off-centre. **Its second table is the
  reusable one:** the **% of each hex a given palette entry actually PAINTS** (234's suppression — loud-paint
  `BASE[name]`, ⚠ **no-op `applySeason` too, or `render()` rebuilds the entry from `CAN0` before a single tree is
  drawn and you will read 0.0% canopy on a FOREST**). That coverage number is what tells you, *before you design*,
  whether a palette change can move a surface at all: PARK is **45% lawn / 12% canopy / 43% season-dead furniture**),
  `shot-canopy.mjs` (its camera — one frozen world at **winter vs the dry peak**, whole-city + a close-up **aimed by
  measured canopy ink** (226), `AIM=wx,wy` so HEAD frames the identical hex for a **blind** A/B. 238 crossed the
  A/B mapping between seeds so "the second one is the fix" fails on one — both agents still picked the patch).
  `probe-railink.mjs` (241 — **is this element too LOUD, or is there too MUCH of it?** Isolates the elevated transit
  by suppressing its own draw fns and re-rendering **in one page** (floor exactly 0, occlusion free, build-agnostic),
  then reads its ink against **the house standard — an ordinary BUILDING, isolated with the same rig** (226), so no
  threshold is invented. Reports `dTop`/`dBot` — the **TAILS** of signed contrast, because a mean acquits a hairline
  (see the law) — plus the columns it crosses and its ink thickness. It killed three hypotheses in one run. **Reach
  for it for any "X is too loud / cluttered / noisy" cue, and read its EXTENT columns before its contrast ones**),
  `shot-railnet.mjs` (its camera — the whole un-zoomed plate, since the defect is a property of the network's EXTENT
  and no close-up would show it; freezes in-page, forces the HUD (204), `SRC=` for a blind HEAD/patch pair, and every
  frame **self-reports its own line count and track total**, which is what caught a one-line city the budget had
  silently left untouched).
  `probe-amphsight.mjs` (244 — **the two-mechanism sweep.** When a cue says a thing faces the wrong way, there are
  always TWO rules that could be at fault (the DRAW's orientation and the SITING that chose the ground), and two
  candidate fixes (*avoid the bad thing* vs *seek the good thing*) — and they do not cost the same. Grades candidate
  weights on both of 206's ledgers at once (the EFFECT: what the house looks at · the COST: is it buried, is it still
  placed) **and holds the two mechanisms apart as variants A/B/C**, which is what exposed *avoid the wall* as a dead
  lever. ⚠ Its sweep builds the world with the artifact's own rule, so **`K=0` is not HEAD** — read the **END-TO-END**
  section at the bottom, which builds HEAD and the patch as separate pages and reads both with the same code. That is
  the claim; the sweep is only the ranking), `shot-amphsight.mjs` (its camera — **each build aims at its OWN bowl**,
  because the whole point of the change is that the bowl may be sited elsewhere and forcing HEAD to the patch's hex
  would frame bare ground. Reports what each build's bowl looks out at, so a blind agent's read is checkable).
  The **sea-state three** (245 — reach for these on any vector that makes an existing draw ANSWER AN EXISTING SIGNAL):
  `probe-seastate.mjs` (**the 196 state-response rig, in its cleanest form** — ONE build, frozen clock, same `genWorld`,
  rendered at a sweep of pins of the signal, so every moved pixel IS a response; the host is isolated by 234's palette
  suppression, so it is **build-agnostic** (runs unchanged on HEAD and patch, no source swap, no cross-build floor) and
  the floor is **exactly 0**. ⚠ **Its `land` column is a POSITIVE CONTROL, not decoration**: the trees/flags provably
  read `WINDA`, so a dead pin and a deaf draw produce the same zero and only the control can tell them apart. ⚠ It also
  demonstrates **196's contaminant**: the rain leans on the wind and is alpha-blended OVER the water, so it lands inside
  a water-palette mask and masqueraded as the sea answering — clearing `clouds` took seed 7 from 3,398 px to 29),
  `probe-seamean.mjs` (**the FIXED POINT — the exact proof that a dynamic feature adds no draw work.** Renders patch and
  HEAD at the one pin where every centred lever collapses to HEAD's literal; **0 px ⇒ the mean is held by construction**,
  with a full-gust column as the control that the builds *do* diverge. Derives pristine HEAD from git itself. ⚠ It is the
  one CROSS-BUILD diff here, so it has a floor — **and the floor is the MOVERS** (230): empty the entity arrays or a
  HEAD-vs-HEAD control reads 5,416 px), `shot-seastate.mjs` (its camera — freezes in-page, pins the wind, and **aims the
  close-up by measured ink OF THE HOST**: ⚠ the argmax **must** be masked to the sea, or it lands on the palms, which
  read the same signal and move 8x the ink — see the law).
  The **fringe pair** (246 — reach for these on any vector whose purpose is to REMOVE fabric, and BEFORE you promise a
  paired addition): `probe-fringeabsorb.mjs` (**can the core absorb what the rim gives back?** — pure world data, 6
  seeds, no render. Prints the three numbers that decide any hold-something-back vector: the **budget's slack**, what a
  candidate mask **HOLDS**, and what a widened predicate **ADMITS**. ⚠ **Read its `r=3` and `r=4` columns TOGETHER** —
  when a wider radius admits *the same* cells, the supply is **exhausted, not out of reach**, and no predicate can
  reach it. It refuted the ledger's #1 cue in one run, before a line of the fix was written),
  `probe-fringeshape.mjs` (**the shape sweep: what is the most countryside per developed cell spent?** Grades candidate
  masks on both of 206's ledgers — the COST (developed cells held) and the payoff in the units the eye reads (**the
  largest CONTIGUOUS undeveloped run**, with HEAD as the control). Its candidate is **top-K of a smooth field**, which
  designs out all three of 233's shape laws at once — peaks ⇒ **lobes** never speckle · the boundary is the **noise**
  not `hexDist` · **K constant** ⇒ the *amount* held is identical every seed while the *shape* still wanders, killing
  the lottery that killed 233. ⚠ Its verdict was **negative**, and that is the reusable part: a belt cannot buy
  contiguity because **ROADS fragment every lobe**).
  The **ferry pair** (249 — reach for these on any vector about a MOVER'S CADENCE, or any feature gated on a host the
  city builds at a known year): `probe-ferrycall.mjs` (**does this thing ever actually DO the thing its label claims?**
  Part A is pure world data — no render, no clock, no noise floor — and answers the dead-code question FIRST: *does the
  host exist, and can the mover REACH it?* (the pier head: 2.5–4.1 cells out in the water on 6 seeds). Parts B/C are
  **TEMPORAL** (134 — every other gate here is frozen, so *"it never stops"* has no instrument): they let the clock RUN
  and count **DISTINCT SPEEDS**, then drive the artifact's OWN step loop — never a re-implementation of the rule under
  test — and measure the call in the **viewer's units** (205: the water between hull and deck, not the design constant).
  ⚠ **Two free EXACT controls, and they are the reusable idea**: HEAD's *constant* IS the baseline (236), and the
  **pre-1986 era**, where the deck does not exist, runs HEAD's byte-identical code (199). ⚠ **Approach the host from
  whichever side has water** — the pier can sit within an approach-length of a bay END, and starting the mover blindly
  put her OUTSIDE the bay, where the bounce clause flipped her: a defect in the RIG that reads exactly like a dead
  feature), `shot-ferrycall.mjs` (its camera — **no argmax needed**: unlike a buried ground ornament (226) the host is
  **published world data** (`pier.x1,pier.y`) floating on open water where nothing can occlude it, so `ctr()` IS the
  located host (201). Makes the pair comparable by pinning her **ROW, not the clock** — `ferryFr` is a pure function of
  `f.y`, so freezing at `f.y = pier.y` puts the patch at her berth and HEAD abeam it, same world, same instant, same
  camera. Every frame **self-reports the gap in cells a viewer can see** (236); `SRC=`/`TAG=` name the FILE, never a
  letter (239)).
  The **concert pair** (250 — reach for these on any vector that TAKES SOMETHING AWAY, and on any "does X keep a
  calendar" claim): `probe-concert.mjs` (**counts OBJECTS, not pixels** — the only instrument that can tell *"the stage
  went dark"* from *"something else got drawn there"* (247). Deterministic, no render diff, **no noise floor at all**.
  ⚠ **Its `TIER ARCS` column is the reusable idea**: the cavea is stone and MUST draw every frame, so it is 196's
  positive control and 247's *what survives* **in one column** — and it convicted the probe itself when a botched
  counter reset made every column read 0. ⚠ Two of its columns (footlights `1x1`, specks `1.2x1.2`) share their
  signature with other draws in a mature city, so **their ABSOLUTE counts are contaminated and only the DELTA is the
  measurement** (−3 and −8, exactly, on every seed); the singer (`arc r=0.68`) is unique. ⚠ **An object count sees
  PRESENCE, not the FADE** — it prints `concertSeason()` beside the counts, or autumn's 4%-alpha singer would be
  reported as a full house (205). Carries HEAD's **constant** as the baseline (236) and the bowl's **BIRTHDAY**
  (`year>=2004` ⇒ 1985 runs HEAD's bytes) as a free exact control (249)), `shot-concert.mjs` (its camera — pins the
  **SEASON at the DUSK showtime hour**, and ⚠ **that hour is taken off the LIGHT CURVE, not guessed**:
  `CIVHRS.amphitheater===0` ⇒ `so = 1-nightDeep()`, so the show runs at `dayT≈0.70` and is **invisible** at the
  intuitive "night" pin of 0.92 (202). Freezes in-page, forces the HUD (204), `page.screenshot` (200); frames are
  named **by file** (239) and each self-reports the objects it actually drew).
  `probe-rainrim.mjs` (248 — **is this draw bounded by its ANCHOR or by its own EXTENT?** Part A is pure world data
  (no render, no clock, no noise floor): it sweeps the cloud across its row — which IS the traverse it makes in play —
  and reports the hexes of veil painted **past the plate's rim**, weighted by the alpha it is actually drawn at, with
  the **two ledgers** (206) beside it: the off-plate ink the fix erases and the on-plate ink it must not destroy.
  ⚠ **Its `bow` column is a POSITIVE CONTROL, and it is the reusable idea** — the rainbow fades against the SAME rim
  and tests its own LEGS, so it MUST read 0.00; a correct sibling draw validates the rig for free (see the law).
  Part B grades the **SHIPPED DRAW, not the probe's arithmetic**: it tags the shaft's own gradient (`96,116,142`,
  unique to it) and reads back the quad the artifact actually fills — **build-agnostic**, so it runs unchanged on HEAD
  and patch with no source swap and no cross-build floor), `shot-rainrim.mjs` (its camera — ⚠ **the void backdrop is
  the BODY's CSS gradient, so every `getImageData` probe is structurally blind to it (200) and this MUST use
  `page.screenshot()`**. Shoots three framings × two builds, named **by file** (239): `rim` (the treatment), `inland`
  (⚠ the **live** control — both builds must rain, and rain identically) and an un-zoomed `city`. It pins `time`,
  `waveT` **and `dayT` BEFORE `genWorld`/`__warp`** and re-seeds `Math.random` in-page: `addInitScript` fixes the PRNG
  *function*, but the stream POSITION and the clocks at load are wall-clock dependent, and `__warp`'s ticks branch on
  them — leave them and two builds warp **different populations** into being and the control reads thousands of px),
  `pngdiff.mjs` (count differing pixels between two PNGs, with a tolerance; ⚠ load them as **base64 data URLs** — a
  blank page cannot load `file://` images and will hang).
  The **cab pair** (258 — reach for these on any vector about a MOVER'S JOB, and on any feature sited by "somewhere
  interesting"): `probe-taxifare.mjs` (**does this mover ever DO the thing its label claims?** Part A is pure world
  data — no render, no clock, no noise floor — and answers the DEAD-CODE question FIRST: does the host exist, and can
  the mover *reach* it over the graph it actually drives? (`livelyKerb`: 125–147 per city, 67–71% of road within 3
  steps). Part B is **TEMPORAL** (134): it drives the artifact's OWN `advanceEntities` and counts **STOP EVENTS** —
  HEAD's cab reads **0, forever**, which is the defect with no threshold invented (236). ⚠ **Its three controls are
  the reusable idea**: the **BUS** is a FREE POSITIVE control (248 — a correct sibling in the same array and the same
  function, so a taxi 0 is a *real* zero); the **CAR** is the must-not-move column (250); and **CABS-OFF** is 230's
  suppress-the-decision rig — with no car flagged a cab the roll is never drawn, so the patch runs HEAD's stream
  **exactly** and reproduces it byte-for-byte. ⚠ **Re-seed `Math.random` IN-PAGE** (248) or 204's shared-stream shift
  walks the whole fleet and moves the *taxi count*. Part C answers **206** — mean visible ink per cab **by state**),
  `shot-taxifare.mjs` (its camera, and it is the cautionary one — ⚠ **it framed a TOWER on its first two cuts.** Aims
  by measured ink (226) **taken as an ARGMAX OVER TIME**, because the frame held exactly ONE hired cab and an argmax
  over n=1 is a lottery; the bar is **self-calibrating** off the incumbent (70% of the mean *vacant* cab in the same
  frame), never a constant I chose. ⚠ **Every frame SELF-REPORTS whether a cab is actually at the centre** — the
  expected result is an *absence* (a dark lamp), and a frame with no cab in it reads exactly like a correct one, which
  is a false PASS an agent will hand you (see the law)).
  The **day-length pair** (261 — reach for these on any vector that makes an existing CURVE answer an existing signal,
  and on any "is this light/season/hour change VISIBLE" claim): `probe-daylen.mjs` (**A** — pure world data, no render,
  no clock, no noise floor: drives *the artifact's own* `sunWarp`/`SUNUP`/`SUNDN` (249) and reports sunrise/sunset/day
  length per season. ⚠ **HEAD's answer is a CONSTANT by construction ⇒ `DISTINCT DAY LENGTHS = 1` is a baseline nobody
  had to design** (236). **B** — the visibility sweep: the season's warm-cool *and* luminance `d` **across the WHOLE
  day**, never at the one hour the feature is loudest (205), with **golden hour as the incumbent bar** (226) and **NOON
  as the free must-not-move control**. **C** — the fixed point by 253's predicate suppression in ONE page, floor exactly
  0. ⚠ **PIN THE SIGNAL, NOT THE YEAR** — see the law; and ⚠ **its C2 cross-build arm was BUILT, RUN AND CUT** (floor
  98k–706k px, signal *below* its own floor: 230, re-confirmed — **do not re-add the build swap**)),
  `shot-daylen.mjs` (its camera — the evening pin, where a day-length feature *lives*, plus noon as the control; both
  builds × both seasons, **named by FILE** (239) with the map **CROSSED between seeds** (238), each frame self-reporting
  in the **VIEWER'S** units (236: *"sun is DOWN · today's sunset 0.701"*, never `dayLen=0.08`). ⚠ It calls `render()`
  **before** the DOM sync, exactly as `frame()` does — the reverse order painted a stale sky and drew a false FAIL).
  The **bedtime pair** (262 — reach for these on any vector about an entity's SCHEDULE, HOUR or CADENCE, and on any
  "does X keep its own clock" claim): `probe-kidbed.mjs` (**TEMPORAL** (134 — every other gate here is frozen, so
  *"they all leave at once"* has no instrument) and it reads **NO PIXELS**, so it has **no noise floor at all**. ⚠ **It
  is BUILD-AGNOSTIC** — it asks the page whether the new predicate exists and falls back to HEAD's literal gate, so ONE
  file grades both builds with **no source swap and no cross-build floor** (230). ⚠ **Its headline needs no threshold**:
  when the vector is "make X vary", HEAD's answer is a CONSTANT by construction, so **`DISTINCT BEDTIMES = 1` IS the
  defect, stated** (236). ⚠ **Its ADULTS column is a FREE POSITIVE CONTROL *and* the must-not-move column in one** (248 +
  250): the parents' curfew is a *correct sibling mechanism in the same function*, so if it does not read a spread the
  **probe** is broken, not the city — and because the fix draws no new random values it must come back **identical**, not
  merely close), `shot-kidbed.mjs` (its camera — ⚠ **the expected result on HEAD is an ABSENCE, so every frame
  SELF-REPORTS its host's presence** (258: an absent subject and a correctly-negative subject render the same frame) and
  the **day close-up is a REQUIRED POSITIVE TWIN** — by day both builds *must* show the child, or the camera is broken.
  Aims by **measured ink** (226): suppresses the children in ONE page (230) and takes the argmax of their own ink, then
  **forces the same aim onto HEAD** so the pair is blind. Frames named **by FILE** (239), map **crossed between seeds**).
  The **bloom pair** (263 — reach for these on any vector about a SPREADING/CA rule, a HOST the city may consume, or a
  "does this thing ever actually HAPPEN" claim): `probes/probe-bloomhost.mjs` (**has the city EATEN this rule's host?**
  Pure world data — no render, no clock, no noise floor. Reports the host's **collapse curve across eras** (MEADOW
  **68 → 4**, 93% eaten, because it sits in `RAISEABLE`), and — the reusable column — each candidate host's
  **CONTIGUITY**: biggest connected component + mean same-host neighbours. ⚠ **A spread rule needs a NEIGHBOUR, not a
  POPULATION**: PARK has 185 hexes and can only *speckle* (biggest component **14**), while SHOREPARK's 100 hexes carry a
  wave (**34**, mean **4.0** neighbours). **Count the component, not the tiles.** Its Part C also prints the
  **eligible-spread events per tick**, which IS the extra `rng()` draws a wider host would spend from the shared seeded
  stream — the number that decides whether your fix may use `rng()` at all), `probes/probe-bloomwave.mjs` (**the gate:
  does the rule actually FIRE in the year we render?** TEMPORAL (134 — every other gate here is frozen, so *"it never
  runs"* has no instrument): it drives the artifact's **OWN `tick()`** and reads **no pixels**, so it has **no noise floor
  at all**. **BUILD-AGNOSTIC** — one file grades HEAD and the patch with no source swap and no cross-build floor (230).
  ⚠ **Its headline needs no threshold**: HEAD reads **0, on every seed** (236). ⚠ **Its POSITIVE CONTROL is the whole
  lap** — the same mechanism on the host it *already had*, at the era where that host still exists; **it is what proved
  the spark, not the host, was the bug** (see the law). Carries `developed` as the must-not-move column (250)),
  `probes/shot-bloomwave.mjs` (its camera — aims by **measured ink** (226): suppresses `bloomAt()` in ONE page (230) and
  takes the argmax of the flowers' own ink, then **forces the same aim onto HEAD** so the pair is blind. Every frame
  **self-reports in the VIEWER'S units** (236: *"29 hexes IN FLOWER of 102 grassland"*, never `bloom=7`) — **that caption
  is what caught `TICKN` surviving `genWorld`**. Frames named **by FILE** (239), map **crossed between seeds** (238)).
  The **loft pair** (267 — reach for these on any vector about a `tick()` RULE THAT MAY NEVER HAVE FIRED, or any siting/
  conversion gated on a DIFFUSED FIELD): `probe-loft.mjs` (**does this rule EVER fire?** Pure world data — no render, no
  clock, no noise floor, nothing to stub, and the cheapest instrument in the harness. Part A counts the feature across
  seeds × eras beside **218's conversion rate** (`converted / (converted + still-eligible)`) — ⚠ **its headline needs no
  threshold: HEAD reads 0 lofts AND 0 eligible, which is the gate never opening, stated** (236). It also prints the
  host's **median and MAX** value against the gate's own constant, and that one column is the whole diagnosis: a max of
  **0.425** under a **0.450** gate is *unreachable*, not unlucky. Part B is the **predicate sweep** — it grades candidate
  thresholds on both of 206's ledgers (the EFFECT: eligible sheds · the COST: does it starve the WORST seed, or flood
  and eat the host) and it picks its own constant. ⚠ **Read its `works` column** — a conversion rule that consumes its
  host must leave some), `shot-loft.mjs` (its camera — the before/after is taken **INSIDE ONE PAGE** by clearing
  `c.loft` (230's suppress-the-DECISION), which draws exactly the warehouse HEAD drew: floor **0**, no source swap, no
  cross-build drift. ⚠ **That is not a convenience here — it is the only honest option**: the lap deletes a dead rule's
  `rng()` draws, so HEAD's city is a *different* city and the same hex need not even be industrial in it. Aimed by
  **measured ink** (226), pins **derived** from the light curve (264), frames named **by FILE** with the map **CROSSED**
  between seeds (238/239), and every frame **self-reports what is standing at its centre** (258)).
  The **avenue pair** (269 — reach for these on any vector about a MOVER'S ROUTE, and on any "does X follow the main
  roads / the network / the trunk" claim): `probe-avenue.mjs` (**does this mover go where its label says?** TEMPORAL
  (134 — every other gate here is frozen, so *"she never rides the avenue"* has no instrument): it drives the artifact's
  **OWN `advanceEntities`** and samples where each vehicle actually stands, tick by tick. ⚠ **Its THREE controls are the
  reusable idea, and they are what make the headline believable.** The **POLICE is a FREE POSITIVE CONTROL** (248) — a
  *correct sibling in the same array and the same step function* that provably reads `c.flow` (`servTarget`), so at
  **1.74x chance** it proves the probe **can see an avenue-rider** and a tram's 1.04x is a *real* flatness, not a dead
  rig. **CAR/BIKE/TRUCK are the must-not-move column** (250) — uniform walkers that must sit **on** the chance line —
  and they also **MEASURE the chance line** instead of my assuming it (205: the bar is the artifact's, not mine).
  ⚠ **Part A is the DESIGN GATE and it runs BEFORE you write a line**: it counts the host's **CONNECTED COMPONENTS,
  DEAD ENDS and mean DEGREE** (263: a rule that must *travel* a host needs a NEIGHBOUR, not a population). It is what
  forbade the obvious fix — a tram *confined* to the trunk **strands in a block**, so the mechanism had to be a
  PREFERENCE. ⚠ **Part C is 206's SECOND LEDGER**: distinct hexes reached, because *a mover pinned to a stub is a worse
  artifact than a wanderer*. ⚠ **Part D is the other second ledger — CAN SHE STILL BE SEEN?** — ink per instance,
  isolated by suppressing the layer **in ONE page** (230; floor exactly 0, occlusion free, build-agnostic). **Run D even
  when you came for B**: it is the only thing that can tell a real burial from a cherry-picked crop),
  `shot-avenue.mjs` (its camera, and it is the **cautionary** one — **it framed a TOWER twice.** ⚠ **Drive `zoom`, NEVER
  `scale`** (`setZoom` derives `scale = fitScale*zoom`; setting `scale` renders a zoomed canvas under a HUD still saying
  `1x`, and an agent will correctly refuse to grade it). ⚠ **Aim at `_sx`/`_sy`, NEVER `ctr(x,y)`** (204 — measured here
  at **7–27 world-px = 32–119 screen px** of miss). ⚠ **Aim by ARGMAX OF MEASURED INK, never by "nearest the biggest
  avenue"** — the biggest avenue is the highest-flow trunk, which is *downtown, among the towers*, so that predicate
  frames the **most buried** instance by construction (see the law). Terrain is identical across builds, so the
  whole-city frame is a genuinely blind A/B; frames named **by FILE** (239), map **CROSSED** between seeds (238), tokens
  **meaningless** not ordinal (268), pins **DERIVED** from `sunWarp`/`SUNUP`/`SUNDN` (264)).
  Eight of them are **harness-wide**, not per-feature — reach for these on any lap:
  `probe-seasonhue.mjs` (260 — **IS THIS LIGHT/COLOUR CHANGE ACTUALLY VISIBLE?** The companion to `probe-seaamp`, and
  the one to reach for **first** on any illuminant claim, because `probe-seaamp` measures **LUMINANCE ONLY** and will
  return a small honest number about a feature that deliberately holds luminance flat (228's law, 6th recursion). It
  reports the shift on **BOTH** axes — **warm-cool `(R−B)`, the units of every "cooler/warmer" complaint, AND
  luminance** — each as **Cohen's `d` against the plate's own within-frame grain** (254/255: an amplitude, never a
  count). ⚠ **Its GOLDEN-HOUR row is the reusable idea: an INCUMBENT BAR I did not invent** (226) — a light change every
  agent calls obvious, measured in the same units, in the same frame, so "is d=0.5 a lot?" is answered by the artifact
  instead of by me. ⚠ The plate mask is **free and exact**: `render()` `clearRect()`s, so the void is **alpha=0** on the
  canvas and the CSS sky cannot inflate anything — it measures the CITY, which is what the agents read. All renders in
  **ONE page on ONE world** ⇒ identical-pin floor **exactly 0**, printed as the first row. Retarget it at any two light
  pins by changing `DAY`/`GOLDEN`/`WINTER`/`DRYPEAK`),
  `probe-cascade.mjs` (**is this census move MINE, or the CHAOS?** — the census matrix is only **3 seeds**, and a rule
  that moves one cell of terrain reshuffles the `rng()` stream for decades. Pairs HEAD vs patch over ~10 seeds on pure
  world data and prints the per-seed sign. 231's alarming `TOWER −6.9% / pop −3.9%` came back **mean +1.4 towers,
  +1.07% pop, only 3/10 seeds down.** Run it before redesigning to protect any metric),
  `perfab.mjs` (interleaved A/B frame time; `REF=<sha>` to price a lap **or an arc**),
  `probe-shadcost.mjs` (the draw-**cost model**: cost is per path object — rerun before
  reopening any draw-cost lever), `probe-drawbudget.mjs` (**where the frame goes** —
  path objects per draw fn, in one render; calibrated against `probe-shadcost`. ✅ **`SRC=` since 257**, so a lap can
  price itself against pristine HEAD — ⚠ **`SRC=` takes a PATH, not the file's CONTENTS** (the recipe banked here read
  `SRC=$(git show HEAD:solvista.html)`, which passes ~200KB of HTML *as a filename* and dies in `page.goto`; iter 259).
  Use `git show HEAD:solvista.html > /tmp/head.html && SRC=/tmp/head.html node …` — **no `/bin/cp` swap, so no
  197-class stale-backup hazard**. 222 says COUNT your objects rather than infer them from your diff; this is how),
  The **sea-quilt pair** (268 — reach for these on any claim about a TILED SURFACE's continuity, and on any field built
  from a `hash(x>>k, …)`): `probe-seaquilt.mjs` (**the step between hexes that actually TOUCH** — the pair
  `probe-seastep` does *not* measure. Render-free: the artifact's own `rDeep` + `seaFace()`, no pixels, no clock, no
  noise floor, nothing to stub. ⚠ **Read its `>=2-tone jumps` column, NEVER its mean** — the mean sits on the noise-free
  floor and *acquits* (the defect is 5.0% of pairs, in the tail: 224/241a). ⚠ **Its `tone SD` is the MUST-NOT-MOVE
  column** (250): the two octaves exist to give the sea *shoals*, and a "fix" that flattens them into depth contours has
  destroyed the feature to fix its render. ⚠ **`DEPTH` (noise off) is the FLOOR** — if HEAD sits on it, the noise is
  innocent and you are in the wrong file; ⚠ **`SHIPPED` reads the artifact's REAL `seaT`** (248's Part B), so the table
  grades the draw the city makes and not your model of it. Retarget it at any quantised per-hex field),
  `shot-seaquilt.mjs` (its camera — **aimed by the measured DEFECT**: it centres on the sea hex with the most hard
  jumps around it, i.e. where the quilt provably *is*, and `AIM=wx,wy` forces the identical hex onto the other build so
  the pair is blind. ⚠ **Every frame SELF-REPORTS what fraction of it is actually SEA** (202) — the first cut framed a
  crop that was **45% sky**, and the tool caught it instead of an agent. ⚠ **Bound the crop by its EXTENT, not its
  anchor** (248): a rim hex can have six sea neighbours and still sit at the plate's edge),
  `probe-seastep.mjs` (257 — **IS THIS TILED SURFACE A QUILT?** The **cheapest instrument in the harness**: no render,
  no clock, no pixels, no noise floor, nothing to stub. It asks `seaFace()` directly for the colour of each of the nine
  depth tones and reports the **LATTICE STEP** between two depth-adjacent hexes — so the glints and foam riding *on top*
  of the fill cannot confuse it. ⚠ **Read its `step/chroma` column, never `step` alone**: the day sea's raw step is
  **BIGGER** than the golden sea's, and nobody has ever called the day sea a quilt — *a terrace is seen relative to the
  surface's own colour* (see the law). Day+night are its free **dead-regime control** (`GWARM=0` ⇒ both builds must
  match to the unit). Retarget it at any quantised per-hex fill by swapping the function it interrogates),
  `probe-darkline.mjs` (**locate an unexplained linear artifact**: censuses every long/thin/dark
  stroke and attributes it to the fn that issued it. ✅ **REPAIRED at 243 — its two documented lies are now fixed IN
  THE TOOL, not in a caveat**: a `CanvasGradient` stroke is counted apart and **never scored as black** (the rain
  shafts used to top the census with 8,160px of phantom ink), and **`MINLEN=4` censuses CHAINS** — the default 30
  cannot see a 12–14px gondola span, which is how the rope hid from this very probe for 40 iterations),
  `probe-cablehost.mjs` (243 — **where do the aerial lines actually RUN?** Pure world data — no render, no clock, no
  noise floor, nothing to stub, and it is the cheapest instrument in the harness. Per line: length, **SEA spans
  (`WETSET` — the ONE definition of wet)** kept separate from **beach spans**, the tile it ends on, and its pylon
  indices; monorail loops beside it as the control. `SRC=` grades pristine HEAD. It identified cue (an) in one run
  after `probe-darkline` had failed to. **Reach for it before designing any route/siting vector — ask what the path
  RUNS OVER before you touch a draw**), and `probe-gondz.mjs` (**is this drawn OVER that?** — one frame under
  two z-orders, `occluded% = 1 − inkInPlace / inkOnTop`; settles any occlusion claim).
  `probe-ropesteel.mjs` is the rig that graded — and refuted — 203's rope polish; it is the
  template for isolating a draw by *suppressing its own strokes* (stack-matched) rather than
  boxing it.
  The **observatory pair** (259 — reach for these on any SITING vector, and on any "X should answer signal Y" where Y
  is a LIGHT/GLOW field): `probe-darksky.mjs` (**does this siting rule do what its label says?** Pure world data — no
  render, no clock, no noise floor. Reproduces the rule's OWN eligible pool, then scores the chosen lot against it:
  **CAPTURE = (poolMean − chosen)/(poolMean − poolMin)** = *the share of the available signal the rule captures* — and
  **a uniform random rule scores ~0, which is a baseline you do not have to invent** (236). ⚠ **Its AQUARIUM column is
  a FREE POSITIVE CONTROL** (248): a *correct sibling siting rule*, scored the same way on its own predicate
  (dist-to-water **1** on 6/6, vs a random inland lot's 7–9) — so a flat treatment column is a real flatness and not a
  dead probe. ⚠ Its **azimuth** column exists because an ARGMIN over a shared `hashCell` salt is a **SELECTION** on it.
  Part B is the **paired 10-seed cascade** (231) — it is what proved the census's alarming `schools −3` was the chaos
  (**4 → 4 on every seed**)), `probe-domedark.mjs` (**...and can a VIEWER see it?** The instrument that killed 259's own
  headline and then handed it a better one. **A. AMBIENT** — mean rendered luminance of the live hexes *around* the
  host, sampled over each hex's AREA (238) off a frame with **the host itself suppressed**, so its own glow cannot
  contaminate the thing it is supposed to be standing away from. **B. VISIBILITY** — `occluded% = 1 −
  inkInPlace/inkOnTop` (probe-amphvis's rig, retargeted): floor **exactly 0**, one page, read off the final composited
  canvas. **C. HUD** — is the host behind the placard (200), measured against the real DOM box. ⚠ **Run B even when you
  came for A**), `shot-darksky.mjs` (its camera — each build aims at its **OWN** host, because the whole point is that
  it may be sited elsewhere (244); frames are named **by FILE** with the HEAD/patch map **CROSSED between seeds**
  (238/239), and every frame self-reports the host's hex, `c.lit`, hexDist-from-CBD and its **TRUE screen fraction —
  the answer key for a blind locate** (108)).
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
