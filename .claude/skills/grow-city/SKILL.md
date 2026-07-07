---
name: grow-city
description: Grow the Solvista city diorama (solvista.html) by one increment — make it bigger / more varied / more connected / more alive — then verify with screenshots + a numeric census that it grew and nothing regressed. Run repeatedly (loop-friendly) to compound improvements. Use when asked to "add more city", "grow the city", "keep improving the diorama", or run it under /loop.
---

# grow-city

An **autonomous improvement loop** for `solvista.html` (the "Solvista" procedural
cellular-automata hex-city artifact), built to run **unattended for long stretches**
(all night, under `/loop`). Each invocation performs **one** iteration and leaves
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

## The loop (one iteration)

1. **Orient.** Read the **State of the city** header at the top of `GROWTH.md`
   (the domain × kind grid + saturation notes) plus the **last ~5 entries** — you
   don't need to re-read the whole archive every iteration; the header exists so
   rotation and saturation are legible at a glance. Then pick the next
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
   - **Read the target seam BEFORE designing.** `GROWTH.md` is the loop's memory,
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
   - **Visual gate** — screenshot the change at a couple of seeds/eras and *look*:
     ```bash
     node ~/.claude/skills/screenshot-verify/shoot.mjs 'solvista.html?seed=42&warp=61&t=0.3' --shots wide --out .claude/skills/grow-city/shots/after
     node ~/.claude/skills/screenshot-verify/shoot.mjs 'solvista.html?seed=7&warp=31&t=0.3'  --shots wide --out .claude/skills/grow-city/shots/after7
     ```
     **Read** the PNGs. Confirm the new thing is visible, sits correctly on the
     hex grid, and the scene still reads as a coherent coastal city — no z-order
     tears, floating tiles, or blown-out color.
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
       seeded stream and the shot would lie. *Rare tiles/civics* (one-per-city
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
   **Verdict**`) so the log stays skimmable at 40+ entries. **Also update the
   State of the city header** at the top of `GROWTH.md` (add the iteration number
   to its domain × kind cell; refresh the saturation/deploy lines) — that header
   is what step 1 reads instead of the whole archive, so a stale header
   silently breaks rotation. Then **git commit** the iteration (source + ledger
   in one commit, `Iter N: <what>`) and push — the repo is
   github.com/alecsharpie/solvista, and with concurrent loops possible an
   uncommitted iteration is one stale write away from being lost.
6. **Redeploy note.** `solvista.html` is the durable source; the live artifact is
   a separate copy. Do **not** auto-redeploy without a nod — but don't let the
   request rot either: at the **end of a session** (or when the user next
   appears), explicitly **ask for the redeploy nod**, citing how many iterations
   are pending. "Redeploy pending" logged 30 times with no ask = a live artifact
   drifting stale forever. (Project memory has the URL + the `/bin/cp` gotcha.)

## Every ~5 iterations: step back (autonomous self-check)

This loop is built to run **unattended for long stretches** — all night, under
`/loop`, with nobody watching. That is the point of the experiment: find the
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

**Also run the frame-time gate** as part of this step-back (borrowed from the
polish-tile skill, which owns the baseline):
```bash
node .claude/skills/polish-tile/perf.mjs
```
The census and screenshots are both blind to *performance* drift, and this loop
only ever adds entities and draw work — dozens of individually-cheap features
can compound into a slow frame exactly the way kelp compounded into a dark
coast. PASS = mean frame time within 15% of baseline in both day/night scenes.
Log the number in the holistic entry; if it regressed, the next iteration is a
perf-fix iteration (headless timing is noisy — re-run once before believing a
borderline number).

If run under `/loop`, do exactly one iteration per turn, then stop and let the
loop re-invoke — don't chain multiple vectors in a single pass.

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
  expect pop to jump; that's up, not a collapse).
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
- Keep the census hook (`window.__census()`, near `__warp`/`__setTime` ~L1929)
  in sync if you add tile types or entity arrays — add them to its tallies so the
  metric keeps measuring the right things.
- **Keep the hover tooltip in sync.** When you add a tile type or civic kind, add
  it to `TILELABEL` / `CIVICLABEL` / `TILEDESC` (near the canvas `mousemove`
  handler) so hovering it names + describes it. Same discipline as the census hook.
- **Smooth motion:** anything that moves along the coast/water must derive its x
  from `shoreAtF(y)` (unrounded), NOT `shoreAt(y)` — the rounded version snaps the
  craft column-to-column and reads jumpy. (Terrain tiles keep the rounded coast.)

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
- `GROWTH.md` — the append-only iteration ledger, with the maintained
  **State of the city** header (domain × kind grid) at the top.
- `shots/` — screenshot output (gitignore-able scratch).
- Repo root `shoot.config.json` — city framings for `screenshot-verify`
  (`wide`/`tall`/`mobile` full-page + `coast`/`downtown` zoom clips; select with
  `--shots name`).

## Setup (once per machine)

Playwright is borrowed from the `screenshot-verify` skill. If `census.mjs` can't
find a browser:
```bash
cd ~/.claude/skills/screenshot-verify && npm install && npx playwright install chromium
```
