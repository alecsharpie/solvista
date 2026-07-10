# Solvista growth ledger

Append-only log of `grow-city` iterations. Newest at the bottom. Each iteration =
one growth vector, verified by `census.mjs` (numeric, no-regression gate) + a
screenshot pass. This file is the loop's memory: rotate vectors, don't repeat.

Census matrix: seeds `[7, 42, 1234]` × eras `[1985, 2005, 2035]`, `t=0.35`.
Metrics are summed over all 9 cells of the matrix.

## State of the city (maintained header — UPDATE EACH ITERATION)

This grid + the notes below are what step 1 (Orient) reads instead of the whole
archive. Cells hold iteration numbers (**struck = explored and reverted**, so the
cell is *attempted*, not *filled* — read its entry before re-trying it); `U1`–`U5` are user-directed passes
(U1 generative monorail · U2 feedback polish: smooth water motion / hover
tooltip / kelp re-gate · U3 determinism audit · U4 hexagon plate + plural
rivers/monorails/cable cars · U5 census stats that can fall).

**Interaction/UX is now a column** (added iter 97). It was a documented *kind* that lived only in
the bullet below, so a domain touched by an Interaction vector still looked untouched to step 1's
rotation scan. Cells hold only vectors the ledger explicitly attributes to a domain; cross-cutting
ones (U2, 42, U5) stay in the bullet.

| Domain | New element | New CA rule | Deepen | Connect | Scale | Polish | Interaction/UX |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Nature** | 4, 26, 29, **102** | 1, 13, 60 | 37, 46, 67, 76, **108** | ~~46~~, ~~88~~, ~~101~~ | U4 | 53, 96 | |
| **Water & coast** | 6, 10, 12, 16, 20, 33, **106** | 90 | 17, 25, 51, 65, 72 | 22 | | U2, 44, 58, 79 | **97** |
| **Urban fabric** | 32, 62 | 7, 23, ~~82~~ | 38, 54, 68, 92 | 47, **109** | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103** | |
| **Transport** | 2, 9, 21, 31, 48 | 77 | 28, 39, 55, 63 | 5, 15 | U4 | U1, U3, 70, 85, 87, 94 | **105** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107** | 36, 59, 66, 80, 91 | 45 | | 73 | 52 |
| **Sky & atmosphere** | 27, 43 | | 19, 35, 50, 57, 95 | | | 61, 81, 89 | |
| **People & activity** | 41, 56 | 49 | 34, 64, 93, **104** | 78 | | 84 | 71 |

- **Interaction/UX kind:** tile tooltip (U2, user-directed) + **entity
  tooltips (iter 42)** + **Est./Built years in tooltips (iter 52, Civic-led)**
  + **hover focus ring (iter 71, People-led)** + **census stats that can fall
  (U5: tallest / density / solar share / transit reach / walkable)**
  + **the coast names itself (iter 97, Water-led: pier/stall/ferris wheel,
  esplanade, lifeguard tower, dune `Sand`+`Marram grass`, live `Tide`)**
  + **the transit lines name themselves (iter 105, Transport-led: hovering a monorail train or
  cable-car cabin names its LINE — "Line 3 of 3 — a 183-span loop with 30 stations" — and traces the
  whole route across the city, pipped at its stops)**.
  When adding an entity array: `stamp()` it in its draw + add an `ENTINFO` row
  (same discipline as the census hook). `stamp()` now also draws the focus ring,
  so any stamped entity is ringable for free. **An `ENTINFO` `sub` may be a
  FUNCTION of the entity (iter 105)** — use it when a thing's interest is its
  *membership* (which line / route / depot), computed live, not a stored string.
- **ROTATION.** Last vector per domain: Sky **95** · People **104** ·
  Transport **105** · Water **106** · Civic **107** · Nature **108** · Urban **109**. Stalest is still
  **Sky (95)**, but it is **additively saturated** (surveyed iter 103) and its **empty `New CA rule`
  cell is a trap, not an invitation** — sky is not cellular; the one grid-shaped sky idea, fog on
  terrain, is already `rSea`/`fogAt`. Read 103's survey before spending a lap there. **People (104)**
  is now the next-stalest safe pick; Transport (105) after it. Note iter 108 was Nature × Deepen but its
  *content* was a Sky interconnect (the farm calendar reads `applySeason`'s `year`) — **Sky can be
  fed by deepening another domain toward it**, which is the way out of its saturation that does not
  require a sky feature. Iter 109's leftover Sky-feedable list: `VINEYARD`, `MEADOW` seed-heads, `MARSH`.
  Recent kinds: 104 Deepen · 105 Interaction/UX · 106 New element · 107 New CA rule ·
  108 Deepen · 109 Connect — the coldest kind is now **Scale** (a structural lever, not a lap move), then
  Polish and New element. **Connect just came in from the cold** after 62 iterations: its trick was that
  it added no new object — it *closed a gap between two that already existed* (see 109's first finding).
  Look for that shape in People and Transport before reaching for a new entity. Note **107 was a New CA rule that
  ADDED NOTHING**: it rewrote a pass that had never fired. *Auditing an existing rule for
  reachability* is a New-CA-rule move available in every domain and it costs no new content — see
  `probe-market.mjs` and the dead-rule law below. (Iter 106 passed on Connect/CA/Scale *for Water*
  and recorded why in its entry: Connect there means a corridor and iter 101's law kills those; a
  Water CA rule would repeat iter 90's dune accretion; Scale is a structural lever, not a lap move.
  That reasoning is Water-specific — the kinds stay cold for **other** domains.)
  Note **Nature × Connect was attempted and reverted three times** (46, 88,
  101) and is the row's graveyard: 46 found it geometrically impossible, 88 found it has no host
  draw-only, 101 found the host *and the land* and lost on **shape**. Do not re-open it as a
  *corridor*. **Cue (e½) is now CLOSED — iter 102 shipped the blob 101 prescribed** (the commons),
  so the interior has its lung; **do not plant a second one.** Nature's remaining cold cells are
  Connect (graveyard — leave it) and Scale.
- **⚠ RUN THE PERF GATE IN ANY LAP THAT ADDS PER-FRAME DRAW WORK — not only at the 5th-iteration
  step-back (iter 109).** 109's first design added ~2000 `fill()`s/frame and cost **+28.5% day**. The
  census was blind to it by construction (draw-only ⇒ `pop +0`, empty tile histogram) and **3/3 visual
  agents called it beautiful.** Frame time was the *only* gate that knew. Had it waited for the
  step-back, the loop would have shipped the regression and then hunted it across five iterations'
  worth of suspects. Corollary from the same lap: **when a connector is expensive, look for the version
  where the existing geometry reaches** — growing one block into its neighbour drew the identical
  terrace for **zero** extra fills. *A connector you have to draw is a connector you got wrong.*
- **⚠ TWO LAWS FOR PIXEL-PROBING A FACADE (iter 109; `probe-terrace.mjs` is the worked example).**
  (a) **A control must live in the same frame as the thing it controls.** A pristine-vs-patched diff is
  invalid whenever you can see *past* your change: through an un-joined gap you look at the row behind,
  which legitimately changed, so the "unchanged" control class moves too. Compare against a reference
  point in the *same* frame instead. (b) **On a hex prism, equal screen `y` is not equal wall height** —
  the front face slopes `+V` (S-point) → `+E` (shoulder), so two points at one screen `y` differ by
  ~`V/4` in `z`, enough for one to land in a 3-tall glass band and the other on plain wall. Invert it:
  `y = cy + V + (E−V)·u − z`, and sample `z = 10+7k` (bands occupy `[5+7k, 8+7k]`, rails to `8.9+7k`).
  And **before doubting the feature, check the facade is visible at all**: restricting to joints with no
  `DEV` cell in the row in front took the reading from a muddy 42.6% to a decisive 64.9% vs 2.1%.
  **When a pixel probe of a 3-D scene reads weakly, suspect occlusion first.**
- **PERF BASELINE RE-PINNED 2026-07-10 (iter 105's step-back): day 33.16ms · night 37.33ms.** Still
  valid at iter 109: a pristine-HEAD control run that lap read day **33.33ms** / night **37.89ms**. The
  stale-baseline warning 104 raised is **resolved** — the old pin (2026-07-09, day 31.33ms) predated
  iters 100–104 and reported ~+6% before your change existed. Do not re-chase it. The rule it taught
  survives: **a *stable* pass-over-pass offset means code, a *rising* one means load — and "code" may
  be earlier iterations' code, so control against pristine HEAD, not against the baseline file**
  (iters 99, 104). Re-pin at a step-back whenever the offset is stable and attributable to landed
  work; `polish-tile` owns the file, so say so in the entry rather than re-pinning silently.
- **`?year=` IS NOW A URL HOOK (iter 108) — the seasons are finally testable.** `window.__setYear`
  had existed since the season pass but was **never wired to the query string**, so no screenshot in
  this loop's history could pin a *calendar* position: `?warp=61` from `year=1974` always lands on
  ~2035.0, i.e. **every shot ever taken of this city was in January.** Now
  `?seed=42&warp=61&year=2035.62` pins high summer. Applied *after* `warp` (warp advances `year`).
  Use `.02 / .30 / .62 / .87` for winter / spring / the golden dry peak / autumn — those are
  `applySeason`'s own keyframes. An unreachable test hook is the same defect class as iter 107's
  unreachable rule: **grep the URL block before assuming a hook you can see is a hook you can use.**
- **⚠ THE CENSUS IS LOAD-DEPENDENT, AND THE LEDGER HAS BEEN MIS-ATTRIBUTING ITS JITTER (iter 108).**
  `frame()` does `year+=dt*s/6` and fires `tick()` off *real elapsed time*, and it keeps running while
  Playwright is talking to the page. So the wall-clock gap between page load and the harness's
  `__census()` call lands in `year` — and `c.solar` / `c.groof` salt their `hashCell` on
  **`(year*23)|0`** / `(year*31)|0`. A few stray milliseconds tick that integer over and a few roofs
  flip. Measured: **two captures of *identical pristine code* gave `pop` 154915 vs 154918,
  `solarRoofs` 1474 vs 1471, `greenRoofs` 398 vs 397.** This matters because the ledger's stock
  explanation for small wobble is "terrain-gated `rng()` reshuffling" (the chaotic-CA invariant) —
  and **that cannot explain wobble on a draw-only vector, which touches no `rng()` at all.** Iter 108
  was draw-only and still showed `solarRoofs −3`. Before blaming your feature for a ±3, **re-capture
  the BASELINE, not just the latest** — running the same edited code twice only proves the edited side
  is stable. A real fix (freeze the sim before `__census()`) is an open harness vector.
- **⚠ `git stash` IS NOT A CLEAN PRISTINE CONTROL IN THIS LOOP (iter 108).** `census-baseline.json` is
  **tracked**, and `--save-baseline` modifies it — so `git stash` reverts your fresh baseline to the
  last *committed* one, and the "pristine" census you then run is scored against an iteration-old
  matrix. Iter 108's control printed `pop +4712` and looked catastrophic; it was comparing pristine
  code to iter 107's committed baseline. Read the **absolute** latest column, not the delta, when the
  stash control runs. Worse, `git stash pop` then **fails** on the appended `census-history.jsonl`
  (`local changes would be overwritten`) and leaves your work in the stash — `git checkout --
  .claude/skills/grow-city/census-history.jsonl && git stash pop` recovers it. Do not panic and reset.
- **⚠ A VISUAL AGENT WILL CONFIDENTLY INVERT A TONE ORDERING — MEASURE IT (iter 108).** Asked which of
  four frames had the brightest farm belt, one agent answered "August, deep chocolate-brown = darkest"
  across two independent runs; the other answered "August = brightest". A 40-line pixel probe settled
  it in one command: August **lum 160.8**, January **112.9** — the first agent had been reading the
  wrong hexes. Agents are reliable for *"is it broken"* (tears, blow-out, clutter — both passed those,
  and agreed) and unreliable for *"which is more X"*. **`probe-farmtone.mjs` (`git add -f`'d) is the
  general instrument:** `__find(TILE)` → screen coords → `getImageData` at each centre → mean RGB,
  luminance, and the **field-to-field spread**, which is how you prove *variation* (patchwork) rather
  than just *change*. Adapt it for any "does this tile's tone move across condition X?" claim.
- **DEAD-RULE TRIAGE, one lap on (iter 108 revisiting 107's candidate list).** 107 queued `GARDEN`
  (~0.3/city), `PLAZA`, `SOLARF` (0), `BURNT` (0) as suspected dead rules. Two are now **explained and
  should not be "fixed"**: `GARDEN` is gated `year>=2008`, and the census matrix's eras are
  1985/2005/2035, so it reads 0 in **two of three eras by construction** — ~2 per *2035* city, sparse
  but alive. `BURNT` is a **transient** (`age>6` → `EMPTY`), so a snapshot census will almost always
  miss it. **A census average across eras cannot distinguish "dead" from "late", and a snapshot cannot
  distinguish "dead" from "short-lived".** Only `SOLARF` (`FARM` + no `DEV` within 2 + `rng()<0.02`,
  2012+) remains a genuine open question — and note iter's earlier solar-farm attempt was reverted as a
  bad trade, so reaching it is not obviously desirable. Divide 107's list by *why* a tile reads 0
  before spending a lap on it.
- **⚠ A RULE CAN BE DEAD BECAUSE ANOTHER RULE'S PRECONDITION IS STRICTLY WEAKER ON THE SAME HOST
  (iter 107).** `T.MARKET` — a fully-drawn tile with stalls, string lights, `POPW` 14, membership in
  `DEV`/`ATTRACT`/`PEDDEST` — read **0 in every seed and era for the artifact's entire life.** Its
  siting rule wanted `COM` with **3** COM neighbours; the upgrade pass 40 lines above takes any inland
  `COM` at **2** COM-or-TOWER neighbours and *saturates* (iter 98). The market's precondition was
  strictly harder than the tower's, on the same host, in a race it always lost — **unreachable, not
  mistuned.** Fixed by rehosting on `PARK` + `buzz>=2` (markets are the open ground shops grow around).
  **`probe-market.mjs` (tracked) is the general instrument: it counts survivors of each successive
  conjunct of a predicate, so the starving clause names itself.** Run it on any rule whose tile the
  census reads ~0. Candidates worth auditing: `GARDEN` (~0.3/city), `PLAZA` (~1/city), `SOLARF` (0–1),
  `BURNT` (0). A dead rule survived 106 iterations; assume there are others.
- **⚠ THE NO-OP CONTROL — the terrain analogue of iter 97's stash control (iter 107).** To learn what a
  rule's **terrain writes** did, delete the write (`c.t=T.X;…` → `void 0`), keep the predicate, and
  census. Zero cells change, so it must read `+0`. When it doesn't, the delta you were about to blame
  on your feature is a **stream** artifact. Iter 107's no-op moved `pop` −0.3%, `EMPTY` +30 and
  **`FIELD` 20→14 with nothing built** — because the old dead rule's trailing `rng()<0.3` *did* fire in
  a narrow year window, so **deleting a dead rule's draw is itself a perturbation.** A rule that never
  changes terrain can still be load-bearing on the stream. This control is what distinguishes "my
  feature broke X" from "the stream moved"; the stash control cannot, because both files differ.
- **⚠ CHOOSE A CA RULE'S HOST TILE BY WHICH PASSES GATE `rng()` ON IT, NOT BY SCENERY (iter 107).**
  `T.EMPTY` hosts ~8 `rng()`-gated passes (farms, industry, forest succession, gardens, the civic lot
  search), so consuming an empty lot deletes every conditional draw those passes would have rolled
  there. `T.PARK` hosts none. Same rule, same ~2 markets/city, host is the only difference: **EMPTY →
  `pop` +4.6% on one salt, −5.8% on another** (the latter a `COLLAPSE` hard-fail); **PARK → +4.2 /
  −0.8 / −2.4, all passing.** A stream-quiet host halves the chaos amplitude. Grep `t===T.<HOST>` for
  `rng()`-gated passes before committing to a host.
- **⚠ A `hashCell` SALT IS A FREE PARAMETER THAT CAN SWING A CORE METRIC 10 POINTS — NEVER PICK IT
  AFTER SEEING THE CENSUS (iter 107).** Identical rule, three salts, `pop` from +4.6% to −5.8%: one
  ships, one hard-fails, and *nothing about the city differs*. Ship the constant you typed **before**
  running anything, and report the spread. Corollary, and it generalizes past salts: **on a chaotic CA
  the `pop` delta of a terrain vector is a property of the perturbation, not of the feature.** Judge by
  the tile histogram. Conversely the **`hashCell` *probability*** is a free, stream-neutral tuning lever
  (107 raised coverage 0.5→0.72 with zero stream effect) — tune eligibility there, never with an
  `rng()<p` (iter 98).
- **`c.buzz` — the third derived field, after `c.flow` and `c.val` (iter 104, in `tick()`).** How much
  is there to come out FOR, seen from a hex: `ATTRACT.has(c.t)?2:0` plus a count of `ATTRACT`
  neighbours (`COM`/`MARKET`/`CIVIC`/`STADIUM`/`PLAZA`). Pure terrain derivation, no `rng()`,
  recomputed each tick. It is sparse — **mean 0.54–0.59 over standable hexes, and mostly 0** — so a
  rule keyed to it changes behaviour *only* near attractions and is a no-op across the rest of the
  city. Reuse it for anything meaning "somewhere worth standing"; don't hand-roll a second one.
  **⚠ `c.buzz` is NOT `PEDDEST`** — see the trap bullet below.
- **⚠ AN ATTRACTION FIELD MUST EXCLUDE THE GROUND YOU STAND ON (iter 104).** The buzz field was first
  built by counting `PEDDEST` neighbours — the list already named "pedestrian destinations". It made
  peds *worse*: street occupancy fell **18.3%→15.4%**, draining the streets. Cause: `PEDDEST` is mostly
  **open ground** (`PARK`/`GARDEN`/`QUAD`/`SHOREPARK`), and parks are large and **adjacent to
  themselves**, so a park *interior* scored above a kerb outside a row of shops — the field's argmax
  was the middle of a lawn. `PEDDEST` answers *"what do I turn to face"* (its only prior use was
  `kerbDir`); an attraction field answers *"what do I cross a block to reach"*. Those are different
  questions and **the plausible name was the wrong list.** Fixed by `ATTRACT` — things you mostly
  *cannot stand on*, so they can only raise the buzz of the ground **around** them, which is exactly
  the café edge and the shopfront kerb. **Before reusing a Set, check what its existing call sites
  ask of it, not what it is called.**
- **⚠ A STOCHASTIC CONTROL NEEDS TWO RUNS TOO — and the aggregate can be unreadable (iter 104).**
  Iter 103 said: for load-dependent metrics, run the *same* code twice. The same law holds for any
  metric whose noise is **sampling** rather than machine load. `stepOld`'s street occupancy read
  **21.4%** and **17.4%** on identical bytes and the same seed (130 peds, Math.random): a **3.0–5.3
  point** run-to-run spread, wider than iter 104's whole effect. So the aggregate could neither
  convict nor acquit the change. What *could*: **splitting the metric by the hypothesis.** Street
  occupancy decomposed into *kerbs fronting a shop* (**8.5%→14.0%**) and *dull lanes*
  (**10.3%→8.1%**, down on all three seeds) — two large, sign-consistent effects hiding inside a
  noise-dominated sum that moved +3.2 points. **When a metric is too noisy to grade a vector, don't
  average it harder — partition it along the mechanism you claim.**
- **A random walk can be biased WITHOUT changing how often it moves (iter 104).** `stepPed` drew 1 of
  6 directions blind and stayed put on a wall, so `P(move) = step·(legal/6)`. Picking directly from
  the *legal* set — the obvious way to add a bias — silently moves every ped 2–3× more and blows a
  tuned occupancy. Multiplying the step roll by `legal/6` restores the original marginal **exactly**,
  leaving the field to change only **where** they go, never **how often**. Any future "make entity X
  prefer Y" vector on a reject-sampled walk has this trap.
- **BUILD IN THE SEA WITHOUT A TILE TYPE (iter 106; the pier/turbine pattern).** A `Map` keyed by
  `idx`, laid in `genWorld` from `hashCell` only, drawn from `case T.WATER`, and named in
  `describeTile` **before** the tile under it. No `T.*` constant, no entity array, no `rng()` draw —
  `pop` came back **exactly +0**. `moleSet` (the breakwater) joins `pier`/`turbSet`. Reach for this
  before adding a tile type. Note `shoreAt(y)` **is** the first ocean cell of the row (`x>=sh` →
  WATER, `sh-3..sh-1` → BEACH), so it is the correct root for anything thrown out from the beach —
  but require `BEACH` at the root's back, or you will root on the **river mouth** (seed 3 did).
  `probe-mole.mjs` (tracked) checks hex-neighbour contiguity, root-on-sand, single head, and whether
  the anchored freighter lands inside the arm; adapt it for any coastal structure.
- **⚠ NO `probe-*.mjs` IS TRACKED BY GIT — the ledger cites tools the repo does not carry (iter 101).**
  `.gitignore` ignores `probe-*.mjs` and `shot-*.mjs` so a killed iteration can't dirty the tree. The
  side effect: **every probe this ledger tells you to reuse exists only as an untracked leftover in
  whoever's worktree wrote it.** `git ls-files` shows *zero* tracked probes; `probe-quadtone.mjs` —
  which iter 100 called "the shape probe for any *does this tile read at city zoom?* claim" — **is not
  in the repo at all.** So: describe a probe's *method* in the entry (that survives), and if a probe
  is genuinely meant to outlive its iteration, **`git add -f` it** and say so. Do not write "keep it"
  and assume git kept it.
- **⚠ CONTRAST IS NOT TRACEABILITY — for a LINEAR feature, legibility ≈ contrast × WIDTH (iter 101).**
  Iter 95 says legibility at distance is luminance contrast, not coverage. True, and **it does not
  imply a high-ΔL line can be followed.** Iter 101's greenway spine measured **ΔL 22–35 above ordinary
  `PARK`** — against a `PARK`-vs-`MID` reference of **ΔL 7–11**, a pair everyone calls obviously
  distinguishable — and **nine agent reads still could not trace it**, because at fit zoom a one-hex
  ribbon is ~1 screen pixel: contrast *without a shape*. **Below ~2–3 hexes across, a corridor is
  untraceable at any ΔL.** `probe-gwtone.mjs` answers "does it separate?"; it **cannot** answer "can
  it be followed?" — that one needs width, and an un-zoomed frame. Don't grade a line with a tone probe.
- **⚠ A STRUCTURE'S TONE MUST CLEAR EVERY SURFACE IT CROSSES (iter 106).** Third law in the family
  after 100 (ornament averages into tone) and 101 (contrast × width). The breakwater drew in
  `whiteDk` — copied from `ROCK`, which sits on **grass** — but the mole spans **sand then sea**, and
  `whiteDk` (lum 220) against `sand` (221) is invisible. A visual agent failed it as *"floats
  detached in open water"*; `probe-mole.mjs` proved the root cell abutted `BEACH` all along. **The
  defect was tonal and the report was geometric.** Fixed with `stone`/`stoneDk` (lum **122/92**),
  clearing sea (155) and sand (221) both. Two corollaries: **(i)** pick a tone against the background
  it will *actually* sit on, and if it spans two, clear both; **(ii)** when an agent says "floating"
  or "detached", **measure the geometry before rewriting it** — "invisible" looks exactly like
  "not connected" from the outside.
- **A MULTI-SEGMENT PATH BUILT BY "ADVANCE, THEN TEST" SKIPS A CELL AT THE JOINT (iter 106).** The
  mole's straight run ended `path.push([x,y]); x++`, leaving the cursor one *past* the last cell, and
  the diagonal hook then added its own `dx` on top. Seeds 5 and 99 laid arms with a one-cell hole;
  seeds 7 and 42 were saved only by row parity making `dx=0`, **so the two seeds under test looked
  perfect.** Keep the cursor on the last cell laid; test each step before taking it. Any jetty /
  causeway / spit has this trap and **it hides behind parity** — check contiguity on ≥8 seeds.
- **⚠ ORNAMENT YOU CANNOT SEE AT DISTANCE STILL AVERAGES INTO THE TILE'S TONE (iter 100).** Iter 95
  established that legibility at distance is luminance contrast, not coverage. The corollary: **coverage
  destroys it.** `QUAD` was given a `turf` base of lum **144** to separate it from `PARK`; the tile
  *measured* **160**, because its own mower stripes (`turf×1.12`, most of the face) and cream path
  averaged the sampled tone **+16 back toward park**, collapsing QUAD-vs-PARK to **ΔL 2.9** on seed 42.
  Damping the ornament (stripes ×1.05) and re-cutting the base restored **ΔL 19–23**. **Measure the tile
  as RENDERED, not as specified** — `probe-quadtone.mjs` samples the real canvas at default fit zoom
  (3×3 disc per tile centre) and reports per-type mean sRGB/luminance, with `PARK vs FOREST` (ΔL 31–36,
  obviously distinguishable) and `PARK vs MEADOW` as built-in scale references. **It is the shape probe
  for any "does this tile read at city zoom?" claim** — and it settled a dispute three rounds of agent
  opinion could not. Two agent verdicts were outright unreliable (one described a tower facade inside a
  quad clip); a number was not.
- **⚠ THE CELL BETWEEN TWO CLUSTERED MAJORS IS THE STREET THEY BOTH FRONT — there is nothing to build
  there (iter 100).** Iter 91's `QNEAR=2` comment ("far enough to leave one between") reads like a hook
  for a shared civic square. Measured across 3 seeds, that gap cell is **ROAD 10/16 · PLAZA 4/16 · bare
  lot 3/16**, and *shared* lot cells adjacent to two institutions number **0, 0, 3** — `siteQuarter`
  requires `roadNear()`, so majors meet on a road **by construction**. Greening/paving it would sever
  the civic mile the iter-45 bunting is strung along. Institutional space goes **behind** an institution
  (`probe-grounds.mjs`), where its neighbours are overwhelmingly `MID`.
- **⚠ `c.dist` IS CONFETTI, NOT NEIGHBOURHOODS — do not build anything on it (iter 99).** The district
  majority-vote CA (L1201) looks like it partitions the city into 4 quarters; measured over the ~1100
  `DEV` cells it runs on, `sameNbr` is **45.6–50.2%** against a **25%** chance floor, with **535–580
  patches** and a largest patch of **12–21 cells**. It coarsens far slower than development re-injects
  fresh random `dist` into new cells. `DISTCOL[c.dist]` is therefore ~random per building — harmless
  on COM's tiny shopfront signs, but **tinting any large surface by district paints noise.** Fixing
  the CA is a real (stream-perturbing) vector; until then, treat `c.dist` as decoration.
- **⚠ COLOUR KEYED TO THE SAME FIELD AS HEIGHT IS NOT VARIATION (iter 99).** MID drew
  `bodyN=v>0.72?'terra':'cream'` while `th=22+c.v*14` — so colour was a restatement of height
  (`corr` **0.76–0.79**), ~73% of the city's commonest building wore one cream, and its parapet was
  `creamDk` **100%** of the time. Mixing in an independent seed-salted hash (`tone=mv*0.72+v*0.28`)
  dropped `corr` to **0.19–0.31** and cost nothing: **`col()` memoizes on `name|f`, so extra colours
  buy cache entries, not draw calls.** Palette variety is the cheapest beauty in the renderer.
  **`RES` still has this exact defect — see open cue (f).**
- **Stash-control the PERF gate, not just the census (iter 99).** Iter 97 established the census
  stash-control. The same trick settles frame time, which is otherwise unreadable on a loaded shared
  machine: iter 99's change read **+0.28ms day** and three passes drifted *monotonically upward*
  (34.00→34.44→34.50) — load, not code. Re-running the **pre-edit** file under the **same** load gave
  day **33.83–34.83ms**, i.e. the post-edit number sits *inside the pre-edit band*. A rising
  pass-over-pass trend within one gate run is the tell. Costs 3 minutes and no tokens.
- **The gitignored backup name is `before.html`** (`.gitignore`, alongside `probe-*.mjs` /
  `shot-*.mjs`). Iter 99 used `_before.html` for a before/after shot and got lucky deleting it — any
  other name is untracked scratch that makes `run-loop.sh` refuse to start on a "dirty" tree.
- **⚠ THE UPGRADE PASS SATURATES — its probability is a weak, expensive lever (iter 98).** `tick()`
  runs ~813 times to 2035 and each runs `ks(240)`=350 `rc()` picks over 4489 cells, so **every cell
  is sampled ~60 times**. A test like `rng()<p` with p≈0.14 fires with probability `1-0.86^60 ≈ 1.0`:
  nearly any lasting `COM` with a quorum *will* tower, whatever `p` says. Consequence: tuning `p` to
  shape the city barely shapes it (steepening it toward the core moved mean tower spread 0.9 hexes
  and core share 1 point) while **costing 21% of the city's towers at 240 pop each**. Before you
  reach for a probability in `tick()`, ask whether ~60 samples have already saturated it. **Shape a
  saturating rule with a quantity that is set ONCE (height, kind, a flag), not with its rate.**
- **⚠ `pop` weights a tower by `h/th`, and `h` grows at DRAW time (iter 98, L3215/L1593).** So
  **raising `c.th` silently costs population and `towerHt`** — the tower gets taller but reaches a
  smaller fraction of its target in the frames the census samples. Iter 98's first height field
  averaged 0.62× where the old one averaged 0.78× and cost **half the city's `tallTowers` (118→56)
  and helipads (76→38)** while looking like a "massing" win. If you re-key a height field, **solve
  its coefficients to hold the old mean** (measure the mean of the old field over the cells that
  actually become towers — `/tmp`-style one-off `page.evaluate`), then redistribute. Holding the
  mean is what turns a shrink into a massing.
- **The CBD is published: `CBDX`/`CBDY` + `CORER`=16 (iter 98, L215).** `genWorld` has always laid a
  founding crossroads (`mainX`,`fy`) and grown the old town around it; it stayed local for 97
  iterations, so **no rule knew where downtown was**. Note `c.val` is *not* a centrality field — it
  diffuses `valueSrc`, whose peaks sit on **parks and water** (0.92/0.74), not on the core. Anything
  that means "near downtown" should use `hexDist(x,y,CBDX,CBDY)`, not `c.val` and not `CTRX/CTRY`
  (the plate's centre, which is not the city's).
- **⚠ A linear ramp is a HALF-PLANE, not a place (iter 98).** The tower rule's `back` =
  `(CTRX+CTRY+10-(x+y))/(G-2)` read high across an entire diagonal *band*, so it could never mass
  anything — hence "the eye finds *a tall side* more than a distinct core". Worse, the founding
  crossroads sits **coastward**, where `x+y` is large and `back` is *small*: it scored the core
  **0.677 against its own 0.782 mean**, so downtown was a literal **dip** in the skyline. Measured
  on HEAD: core towers averaged **0.87×** the height of rim towers and the tallest tower stood
  **33 hexes** from the crossroads on all three seeds. **If a field is supposed to have a centre,
  it must be radial; check its value AT the centre before trusting the comment above it.**
- **⚠ A massing statistic anchored on its own argmax is self-referential (iter 98).** `probe-core.mjs`
  first measured tall-vs-short around the *densest radius-4 disc*, and reported seed 42 as a FAIL
  (ratio 0.90) for a change that worked — because that seed's densest knot of towers is 29 hexes
  from downtown, so the tall core towers counted as "far". Re-anchored on `CBDX/CBDY` the same
  frames read 1.75. **Anchor a "did it concentrate" metric on the thing it was supposed to
  concentrate *around*, never on where it actually ended up.** `probe-core.mjs` now reports both
  (`tallD`, `discD`) and is the shape probe for any future skyline/massing claim.
- **A pure DRAW/height change can be provably stream-neutral (iter 98).** Keying only `c.th` to the
  new field — and leaving the `rng()<p` siting test byte-identical — left `pop`, `roads`,
  `developed`, `towers` at **exactly +0** and moved **zero** tiles in the histogram, while
  `towerHt` +4.7%, `tallTowers` +12.7%, `helipads` +23.7%. Compare iter 91's law: `rng()` draw
  *count* is the invariant. `c.th` feeds no `rng()`-gated predicate (the 2022 growth rule's
  `rng()<0.02 && c.th<160` short-circuits with the draw **first**), so it perturbs nothing. **When
  a vector can be expressed as a property of a thing rather than a decision about which things
  exist, express it that way — the census then proves the change instead of tolerating it.**
- **⚠ A DRAW-TIME structure with no tile type of its own is invisible to the tooltip (iter 97).**
  Nothing in `TILELABEL` looks missing, so nothing looks wrong — the pier reported **"Ocean"** for
  ~75 iterations, and the iter-22 esplanade and the lifeguard tower were mute the same way. The
  invariant "keep the tooltip in sync" is usually read as *new tile type → new label*; it also
  means **anything you paint over a tile must be named before that tile.** `pierAt(x,y)` (L1827,
  what is *drawn*, 1986) vs `onPier(x,y)` (where a ped may *walk*, 1987) are now one predicate with
  two readers. When you add a draw-time overlay, hover it before you ship it.
- **⚠ `solarRoofs` / `greenRoofs` JITTER ±4 UNDER A NULL EDIT (iter 97).** They salt their hash
  with `(year*23)|0` / `(year*31)|0` (L1126/L1136) and `year` is a continuously-advancing float, so
  the salt quantizes differently depending on where tick accumulation lands. Iter 97 saw +4/+1,
  suspected its own change, and ran the control: **`git stash` the edit, re-census pristine HEAD
  against the same baseline → identical +4/+1.** Before believing any small non-core delta, run
  that stash-control. It costs 90s and needs no tokens.
  **⚠ AMENDED BY ITER 103 — one pristine run is NOT a control.** `pop`, `towerHt` and `solarRoofs`
  are all functions of **how many frames rendered** in the census's 500ms settle (the first two read
  `c.h`, which grows at *draw* time; the third quantizes a salt off the float `year`), so they track
  **machine load**, and a pristine run can read exactly `+0` *by luck* — framing your change. Iter
  103 saw pristine `+0` against its edit's `−3/−1/+2`, then re-ran the **unchanged edited file** and
  got `+6/+1/+0`. **Run the SAME code twice; a delta that flips sign is noise.** These three metrics
  only, and never mind them if the tile histogram is empty.
- **⚠ A slow signal sampled briefly looks exactly like a stuck one (iter 97).** `TIDE` has a ~140s
  period (`waveT` advances ~1.0/s, `×0.045`) and spends most of its time near the extremes (arcsine).
  Watching a live page for 17s showed **only** `Low water` and looked like a dead-label bug; the
  feature was fine — seed 42 simply started in the trough, where `sin` is flattest. **Sweep the
  phase (assign `waveT` in `page.evaluate` and read the real function), don't watch the clock.**
  `TIDEV` (sign of `dTIDE/dt`) is derived from the *same hoisted phase* as `TIDE`, so they cannot
  disagree — do that whenever a value and its derivative are both consumed.
- **⚠ Gating a TILE tooltip? Clear entities off the target hex first (iter 97).** `pickEntity()`
  beats the tile, by design. Seed 7's esplanade shot returned **"Jogger / Logging shoreline
  miles."** — a correct tooltip for the wrong subject, and a visual FAIL for a feature that worked.
  Use `&flood=joggers:0` (the debug hook exists for this) and pick the candidate hex with the most
  clearance from any stamped entity. `shot-coasttip.mjs` is the tile-side sibling of
  `hovershot.mjs` (which aims at *entities* via `__ents` and cannot target a hex).
- **⚠ Water & coast is ADDITIVELY SATURATED too (surveyed iter 97).** 6 new elements, the dune CA
  (90), the esplanade (22), five Deepens, four Polishes. Already there: beach, dunes+marram, kelp,
  marsh, rocks, lighthouse, boardwalk pier (deck/stall/ferris wheel), esplanade, lifeguard tower,
  harbor works + freighters, ferries, boats, kayaks, surfers, whales, dolphins, herons, tidepools,
  a live `TIDE`, and offshore wind. Its remaining moves are **Deepen / Polish / Interaction**;
  97 took Interaction.
- **⚠ Nature is ADDITIVELY SATURATED (surveyed iter 95; Polish taken by iter 96).** Before reaching
  for a new plant or a
  new nature CA, know what is already there: forest succession + logging, `REDWOOD` canopy closure,
  **wildfire** (`c.fire` → `T.BURNT` → `EMPTY`), meadow `bloom` as excitable media, `VINEYARD`,
  `ORCHARD`, fairy rings (`c.shroom`), `c.hedge` field rims, **street trees + a boulevard allée**
  (`c.treed`, L1143 — iter 96 nearly re-shipped these), and `EMPTY` already draws a patchwork
  with saplings and flecks (iter 53). `T.BURNT` reads **0** at all nine census points — fires are
  rare and decay in 6 ticks, so the whole fire ecology is *invisible* in any snapshot; deepening it
  buys a thing nobody sees. Nature's next real move is **Deepen or Polish**, not a new element.
- **Trees have three species now: `treeSp()` → broadleaf / conifer / poplar (iter 96, L2135).**
  Hashed from the tree's **sub-hex** position (`round(gx*8),round(gy*8)`), so a clump mixes;
  conifers weighted inland (`0.08+0.30*inland`, `inland=clamp((SHOREX-gx)/30,0,1)`), poplar a flat
  ~6% accent. Realized mix **68 / 25.5 / 6.3%**; conifer share **14.7% coast → 34.3% hills**.
  Species does **not** depend on `year`, so a tree never changes kind as the city ages.
  `ORCHARD`/`VINEYARD` don't call `tree()` (own draws) — their rows stay uniform. `probe-species.mjs`
  is the shape probe. **⚠ `tree()` is the hottest draw call in the renderer (~2,700/frame): iter 96
  cost +7.1% day frame time on its own.** Don't put the next Nature vector inside `tree()` too.
- **⚠ A top-level `const` is NOT on `window` (iter 96).** `SHOREX`/`CTRX`/`HEXR`/`G` are `const`s:
  they live in the global **lexical** env, so inside `page.evaluate` they resolve **by bare name**
  but `window.SHOREX` is `undefined`. Function declarations (`tree`, `treeSp`, `cellAt`) *do* land
  on `window`. Iter 96's probe read `window.SHOREX`, got `undefined`, and computed `NaN` — and
  because **`NaN < x` is `false`, every value silently fell through a bucketing chain into the last
  bucket**, reporting a dead gradient for a feature that was working. A probe that reports a
  suspiciously *uniform* result is more likely broken than the feature. Bare-name it, like
  `probe-dash.mjs` does.
- **⚠ Alpha cannot rescue a colour that matches its background (iter 95).** A rain veil at
  `rgba(120,146,176)` (lum 143) over a sunlit city (lum 150–190) was **invisible**, and two rounds
  of more ink (α .30→.52, 9→12 columns, 1→1.4px) moved it from 0.79× to **0.98× of the animation
  noise floor** — i.e. it perturbed the frame exactly as much as the pedestrians did. Legibility at
  distance is **luminance contrast, not coverage**. It shipped only once given a *dark shaft*
  (lum 114) behind pale drops. Any new translucent atmosphere — haze, spray, smoke, dust, godrays —
  must clear its background in luminance, and **`probe-rainink.mjs` is the way to check**: diff the
  canvas against HEAD inside the feature's bbox *and* inside a control box (this city animates, so
  two loads always differ). Signature matters as much as the mean — a coherent shape at Δ8 is
  obvious; scattered pixels at Δ25 are not. **Measure before you tune a third time.**
- **⚠ The wide gate and the zoom gate can disagree, and both be right (iter 95).** Zoom passed all
  three tunings; wide failed the first two. Iter 94 said *zoom before you fix*; the complement is
  **the wide frame is the product** — the camera renders at `scale ≈ 0.59`, so a 1.2px stroke is
  sub-pixel on screen and a feature that only exists at 3× does not exist. When the gates split,
  don't pick a side: give the feature a cue at **each** scale. And tell wide reviewers **"no
  enhancement"** — an agent that contrast-boosts will confirm any feature you like.
- **Showers: clouds are `rng()`-spawned, never `?flood=` them (iter 95).** ~2 of 7 clouds rain per
  city. `probe-rain.mjs` reports which, and the `&step=` that walks one clear of the rim
  (seed 42 → 600, seed 7 → 600, seed 1234 → 560); `shot-rain.mjs <seed> <step> <out>` clips the
  cloud→ground column. A shower is rim-faded by `pa` on `ROWMIN`/`ROWMAX` (iter 89's grammar) so it
  never rains into the void, and its damp ground patch is centred on the shaft's **foot**
  (`cx-rlean`), not the cloud — see the next bullet.
- **⚠ Placing one entity NEXT TO another? Size the gap in PIXELS (iter 93).** A hex is
  `CW`=32px wide and `ROWY`=16px tall, so an offset expressed in *hex units* separates
  half as far vertically as horizontally: iter 93's dogs orbited their owners at `r`
  hex and drew as one blob whenever the angle pointed up the screen. Compute the offset
  in px, then divide by `CW`/`ROWY`. And pick the **direction from the ground, not the
  geometry** — `kerbDir()` stands a street ped 0.30 hex out on the kerb normal to keep
  it off the centre line, so nudging its dog "toward the hex interior" put the dog in
  the traffic lane. An entity attached to a host should reuse the host's *legality*
  (`pedWalk`/`strollable`/`kerbDir`), not just its hex. **Neither bug moved any census
  metric, and neither was visible in a whole-frame shot** — entity-vs-entity vectors
  need a zoomed gate (`hovershot.mjs ZOOM=6`).
- **Dogs belong to residents (iter 93).** `d.own` indexes `peds`, exclusively (one leash
  per hand). A leashed dog rides its owner's hex, so it inherits `pedWalk`'s street/bridge
  legality free — anything that changes where peds may walk moves the dogs too. Strays
  (`own<0`) keep the park roam. `probe-dogs.mjs` is the shape probe.
- **⚠ "Reach toward each neighbour" is a junction asterisk waiting to happen (iter 94).** The
  road draw dashed from the hex centre toward *every* road neighbour. Correct on a straight run;
  at a dense junction, six axes meeting at 60° draw a star, and **54.6% of all road hexes were
  painting an X** by the time anyone looked. It survived 93 iterations because the density that
  triggers it is density *the loop itself added*. Any per-cell radial draw — dashes, wires,
  hedges, desire paths, power lines — has this failure mode. **Mark a through-line, not spokes.**
  Now: 2 road neighbours = one path (straight run or bend), keep both; 3+ = a junction, mark only
  the busiest through-axis by `c.flow`; ≤1 = draw nothing. X-hexes are **0 by construction**.
  `probe-dash.mjs` is the shape probe.
- **`NBR_OPP=[[0,1],[2,5],[3,4]]` — the three hex axes, parity-free (iter 94, L207).** These are
  the *collinear-opposite* neighbour index pairs into `nbrDirs(y)`: same indices for even and odd
  rows. **The intuitive pairing is wrong.** "Which move walks back to where I came from" gives
  `(0,1) (2,3) (4,5)`, because index 2 is *up-right* on even rows and *up-left* on odd ones —
  those are inverse **steps**, not opposite **neighbours**, and a line drawn through them bends.
  Anything asking "what street runs *through* this hex?" must use `NBR_OPP`.
- **⚠ A wide frame localizes a complaint; it does not diagnose it (iter 94).** Two agents on two
  seeds independently reported the core's roads as grime — *and both blamed the wrong cause*
  ("roads too close in value to the roofs, one grey mass"). Zoomed adjudicators found value
  separation was fine and the defect was dash geometry. Acting on the wide verdict would have
  re-toned asphalt that iter 86 had already toned correctly. **Zoom (`--shots downtown`) before
  you fix anything a whole-frame agent reports.** Corollary for gating lighting: **`t=0.72` is
  *sunset*, not night** — an agent there reported "no night lights" for a city whose windows are
  60–70% lit at `t=0.9`. Shoot `t≈0.9`.
- **⚠ `solarRoofs` is a flaky census metric (±1) (iter 94).** It moved `+1` on one run and `+0`
  on two re-runs of identical bytes: `c.solar` is a `hashCell` salted by `year` (L1126), and
  `year` advances with the tick count. A ±1 on it is evidence of nothing — re-run before
  believing it, and never read it as a growth signal.
- **⚠ The plate is a HEXAGON, not a square (U4):** `G` (=67) is only the bounding
  box the `cells` array lives in; the live plate is the `HEXR`=33 rings masked by
  `HEXOK`, and everything outside it is `T.VOID`. So: never loop `0..G` and assume
  a live cell — `inB()` gates it, `cellAt()` returns `null` off-plate, and a seeded
  random cell must come from **`HEXI`** (the live-cell list) or it lands in a dead
  corner. Each row's live span is `ROWMIN[y]`/`ROWMAX[y]`; the coast and its craft
  clamp to those. Per-tick development attempts are scaled by `KS`=1.46 because the
  plate carries ~46% more land than the old 48×48 square — a new per-tick placement
  loop should scale with `ks(n)` too, or it will fill proportionally slower.
- **⚠ Monorail and cable cars are PLURAL (U4):** `monos` / `gonds` are *lists* of
  independently grown lines, each closing its own loop. The old singular `monorail`,
  `monoPath`, `monoClosed`, `gond`, `gondPath` are gone — code written against them
  will silently read `undefined`.
- **Traffic flow exists — `c.flow` + `ARTFLOW` (iter 77).** `trafficFlow()` runs each
  tick: trips are generated by developed hexes and drain along the road network to the
  value core, accumulating like a river's drainage tree. `c.flow` is that accumulated
  load; `flow>=ARTFLOW` (64) is an **arterial** (~15% of roads, ~97/city). Unlike `busy`
  (a *local* ≥3-developed-neighbours test that calls a third of the city an avenue),
  flow is a **network** measure — ~200 high-flow roads are not `busy` and vice versa.
  **Bridges come out as the trunks unprompted** (seed 42's global max, 635, is a bridge
  deck), and the spine is connected: 153 of 155 arterial hexes touch another. `__find`
  now answers `'arterial'`. Reuse `c.flow` for anything that should follow the main
  roads — don't hand-roll a second notion of "important street". **Iter 80 is the
  first reuse:** civic forecourts pick the lot fronting the loudest street.
  **⚠ But flow is a bad host for *land use* (iter 82).** `RES→COM` on arterial
  frontage produced 85% **singletons** — by the time a street carries flow its
  frontage is already `COM`/`MID`/`TOWER`, so the houses left to convert are
  scattered. Flow suits *point* decisions (which lot fronts the loudest street) far
  better than *linear* ones (grow a high street). Don't re-try RES→COM on arterials.
- **⚠ `COM` is the TOWER precursor (iter 82).** The upgrades pass promotes `COM` on a
  `com>=2` quorum, so **anything that makes shops makes skyscrapers**: +115 COM came
  back as +31% towers and +12.8% pop. Any future rule that mints `COM` must decide
  whether those lots are downtown parcels or terminal shopfronts.
- **⚠ But do NOT make them terminal by vetoing the upgrade (iter 92).** 82's proposed fix
  (exempt shopfronts from the tower upgrade *and* the quorum) was implemented and cost
  **−9.8% pop / −20% towers** — a hard core collapse. **`POPW[TOWER]`=240** vs `COM`=10,
  `MID`=28: pop in this model essentially *is* towers, so any rule that costs towers costs
  pop and nothing buys it back (redirecting a blocked lot to `MID` recovers 12%). Worse,
  the natural sites for a shop street — the founding crossroads, `mainX` — are **exactly
  the value core**, so you veto the very lots that were going to tower. Displacing the
  tower to a neighbour is *also* a trap (towers 247→**237**): a high street's neighbours are
  houses, so the redirect finds no eligible host. **Never zone against `TOWER` near the
  core.** Express a terminal use as a **draw property** instead — see `c.hstr` below.
- **The high street: `c.hstr` + `HSLEN`/`HSPULL` + a retail podium (iter 92).** `genWorld`
  has always laid a founding **main street** (`fdx`, a hex diagonal through the crossroads,
  at init in 1974). Iter 92 reserves its flanking lots (`c.hstr`) via a deterministic scan,
  and the parcels pass builds **shops, never houses** there (`shop||c.hstr`) — 82's
  "reserve the frontage pre-1990" prerequisite, finally met. **The CA is touched in exactly
  one place**; the upgrade pass is byte-identical to HEAD. Towers rise on the parade freely
  and get a **shop podium** in `drawBuilding`'s `TOWER` case (7 of 13 wall lots are podium
  towers by 2005 — without it the street vanishes as downtown densifies). `__find('highst')`
  returns the reserved frontage; tooltip says *High street*. **Its tile histogram delta is
  ≈0** (`COM −6`) — do not look for it there, use `probe-highst.mjs`.
- **`COM` now has a shopfront, and it faces the street (iter 83 — 82's blocker is
  cleared).** 82 said `COM` had "no shopfront draw"; it had one, but the awning was a
  `bandR` **ring** and the glass ran full height, so a shop was a `MID` in a colored
  belt. Now: glass at street level over a stallriser, a `slotS` door, a kerb apron,
  and a **projecting striped awning** — all on `frontSide()`'s road-facing face
  (cached as `c.fs`, refreshed on `year`). A retail siting vector is now unblocked
  *visually*, but 82's siting lesson stands unchanged: reserve frontage pre-1990,
  and never re-try RES→COM on arterials.
- **One-sided drawing has a vocabulary now (iter 83).** `bandR`/`bandS` wrap **both**
  visible faces — a ring cannot express frontage. Use `faceOutS()` (a face's outward
  screen normal), `awnS()`, `kerbS()` and the older `slotS()` for anything a building
  does *toward a street*: porches, stoops, loading docks, café spill-out. And note
  the **`0.5 − ax` margin**: a prism at `ax=0.36` leaves ~4.5px of its own hex free on
  every side, so things drawn there project over the pavement and read as depth
  **without** crossing into the next row — the trick that makes an overhang safe in a
  painter's-order renderer.
- **⚠ Nature × Connect is not reachable draw-only (iter 88, EXPLORED→REVERTED).** Shelterbelts
  linking wood to wood along the hex axes: **1 / 0 / 1** belt cells at 2035 across the three
  seeds (vs 14 / 6 / 16 at 1985), and `BELTR` 4→8 doesn't move it. By 2035 the woods are not
  separated by open ground, they are **walled by buildings** — the axis walks die on
  `RES 122 · MID 75 · COM 46 · PARK 30`, and the walks that still land are wood-adjacent-to-wood.
  Including `PARK`/`GARDEN`/`SHOREPARK` as endpoints *and* pass-throughs gives 4 / 1 / 3. Same
  answer. **Don't re-try a wood corridor as a flag + draw.** Two reusable results: mark corridors
  as **paths, not per-cell tests** (per-cell drew a *dotted* line and pushed seed 1234's patch
  count **up**, 39→43; path-marking gives 39→32), and a **patch-count union-find over `__find`
  is the honest test of any Connect claim** — make the next one pass one. `AXSTEP`, the
  parity-free three-axis stepper, is preserved verbatim in 88's entry. Also: `c.hedge` (L1206)
  **already rims the farm fields**, so any new line-of-scrub vector must first say how it differs.
- **⚠ REMOVING an `rng()` draw perturbs FAR more than moving a building (iter 91).** The
  single most valuable measurement of the lap, and it inverts the intuition. Siting the
  library/museum/parliament by a deterministic `hashCell` scan *instead of* the old
  `rcIn()` search looked like the safe, house-style move ("no rng draw, so siting perturbs
  nothing"). It cost **−22% pop and −47% towers by 2035** — a hard core-gate collapse. A
  controlled experiment (burn the draws the old loop would have made, so the *only*
  difference is where the building stands) showed the siting itself was **worth +2 to
  +14% pop**: the loss was 100% the three skipped draws reshuffling 800 ticks of stream.
  **So: a deterministic rule that REPLACES an existing rng search must still spend that
  search's draws.** Run the old loop, keep its result, throw it away. The codebase already
  did this once — the 1996 plaza rule "is kept only so its `rng()` draws keep the stream
  aligned" — but the lesson was filed as a quirk of that rule, not as a law. It is a law.
  The advice "prefer `hashCell` so your rule perturbs nothing it doesn't touch" is only
  true for a rule that is **purely additive**; a *substitution* is a different animal.
  Corollary: **`rng()`-draw *count* is the invariant, not `rng()` avoidance.** Order your
  code so the draw count is provably independent of your new terrain edit (place nothing
  until after the search runs), and the diff is exactly "the building moved".
- **Institutions now cluster: `MAJORK` / `QUARTER` / `siteQuarter()` (iter 91).** `MAJORK` =
  the five monumental kinds (`hall museum parliament university library`) — it is the shared
  vocabulary for "major institution", used by **both** the civic quarter and the 2020+
  forecourt rule (which previously inlined the same five-way test). `QUARTER` = the three
  that *seek* the quarter (`library museum parliament`, at 1982/1997/2034); services (school,
  police, firehouse, hospital, aquarium, amphitheater, observatory) stay sited by need, and
  `observatory` is deliberately left free to sit at the rim. `siteQuarter()` hugs the nearest
  standing major at `QNEAR..QFAR` = **2–4 hexes** — near enough to share a street, far enough
  to leave one between (adjacency would kill the bunting, which needs a ROAD cell reachable
  from two civics). It falls back to the scattered search when the core is walled in, so
  `civicKinds` never drops. **Two existing systems light up for free:** festival bunting
  (iter 45) roughly **doubles-to-triples** (fete 9→16, 6→18 per city), and downtown builds
  **taller** because three clustered civics choke one COM quorum instead of three.
- **A forecourt is now SHARED, by construction (iter 91).** The 2020+ rule skips a civic with a
  `PLAZA` within 2 hexes, and quarter members sit 2–4 apart — so the quarter gets **one** square,
  not four (`PLAZA 14→10` across the matrix). That is defensible urbanism and was accepted, but
  it is the one place the vector *cost* something. See open cue (d).
- **Open cues, banked by holistic passes (take one when its domain comes up):**
  **(e½) the interior is an edge-to-edge carpet — now DENSITY-ONLY** *(cue (e)'s skyline half was
  **CLOSED by iter 98**; its **palette** half was **CLOSED by iter 99**)* Urban fabric — iter 94's
  holistic agent called the landmass "too uniform… little breathing room between core and edge,"
  and the interior an "edge-to-edge carpet of roads + rooftops with little green breathing room."
  **98 fixed the skyline; 99 fixed the colour; 100 put the first *earned* green in the interior
  (7–10 `QUAD` hexes behind the institutions) — but it did NOT add a lung.** Iter 100's step-back
  agent, reading the whole frame: the interior *"does breathe… but green is fragmented into small
  patches rather than any real district-scale lung,"* and its top recommendation was to
  **consolidate green into one or two district-scale parks/greenways** instead of more scatter.
  That, plus mid-block density, is exactly what remains. Note iter 100 spent −1.03% pop for 23
  cells, so a district-scale park is affordable but not free.
  **Iter 101 attacked this and REVERTED — read its findings before re-trying.** It settled three
  things and cost nothing: (i) **`PARK` is permanent** — nothing in `tick()` consumes one, so green
  planted in `genWorld` survives to 2035, and the "plant it early" host iter 88 hoped for is real;
  (ii) green costs about **0.045% pop per cell** and partly repays it, because `PARK` is the top
  `valueSrc` (0.92) and lifts the frontage it faces (`cafes` +141, `COM` +51); (iii) **the lung must
  be a BLOB, not a ribbon** — a 1–2 hex corridor is untraceable at frame scale whatever its contrast
  (see the law at the top). So: ~50 contiguous cells, **≥3 hexes across**, sited by
  `hexDist(x,y,CBDX,CBDY)`, not by `c.val`. The greenway's flag/tooltip/half-segment path draw and
  its contiguity probe were all correct — only the shape was wrong.
  Heed iter 92 (never zone against `TOWER` near the core: −9.8% pop) **and** iter 98
  (the upgrade probability *saturates*, so leaning on `p` is a weak lever that costs towers at 240
  pop each). A `MID`/`RES` thinning rule, or interior parks, is likelier than anything touching
  towers. **This is the first (e½) move that must change tiles, so it cannot be stream-neutral —
  budget for a few % of chaotic wobble and judge it on the tile histogram.**
  The same agent flagged seed 1234's long straight monorail/cable
  lines as still reading like a "wireframe/UI stroke" — but iters 85/87 closed that with two
  agents each, so treat this as one un-zoomed opinion, **not** a reopening of cue (c).
  **(f) `RES` says its height twice, and its roofs ignore the seed** — **CLOSED by iter 103**
  (`corr` 0.87–0.89 → 0.22–0.25; chimney cross-seed agreement 100% → ~60%; a third body shade).
  (RES body is *not* clumped — measured `sameNbr` **52.1%**, maxPatch **5.3** — so do **not** "fix"
  patchiness that isn't there.)
  **(g) SEVEN literal-salt `hashCell` calls remain** *(audited by iter 103;
  `grep -nE 'hashCell\([^)]*,[[:space:]]*(0x)?[0-9]+\)' solvista.html | grep -v seedNum`)* — each is
  a function of `(x,y)` alone, so it paints the identical pattern in every city. They split into two
  stakes, and **only the first class is an invariant breach worth a vector**:
  - **Presence decisions** (something is there, or isn't, in the same place in every city):
    **L2523** `hashCell(x,y,77)<0.28` — which surf cells catch the city's light-smear at night.
  - **Ornament jitter** (a detail's lean/length/brightness, not its existence): **L2608** ×2
    (`lean`/`ln`), **L3115** (marsh reed tufts), and **L3555/3563/3575/3587** (`hashCell(x,z|0,N)` —
    per-storey window-light brightness, so **every city's towers light identically at night**; the
    most *visible* of the ornament class and the one worth folding into a future Urban/Sky Polish).
  Note `darkWinR` is **not** a breach: it takes a literal `salt` argument but mixes `seedNum^salt`
  internally (L2188) — check the callee before indicting a call site.
  **(d) the civic quarter deserves a real square** *(banked by iter 91, Civic × Polish)* — the
  quarter now reads as a knot of pale domes sharing a single forecourt hex. A proper civic
  square (2–3 contiguous `PLAZA` cells fronting several institutions, rather than one lot won
  by the loudest street) would repay the clustering. Do **not** implement it by loosening the
  radius-2 guard globally — that would pave forecourts city-wide; scope it to `MAJORK` cells
  that have ≥2 other `MAJORK` within 4 hexes.
  ~~(a) **the rainbow floats**~~ — **CLOSED by iter 89.** Not by 81's fog fix, though the
  cue predicted it would be: a bow forms in *nearby* drops, so it may legitimately hang in
  **front** of the city, and moving it into the row loop would have buried it. What was
  wrong was that it drew over the **void** past the rim and **ended on a hard chord**.
  Fixed by anchoring it to the ground its shower falls on and dissolving both legs.
  With (a), (b) and (c) all closed the cue list was empty for one iteration; **(d) and (e),
  above, are the open cues** — (d) found by a *vector* rather than by a holistic pass.
  ~~(b) **the asphalt floods the interior**~~ — **CLOSED by iter 86.**
  ~~(c) **the monorail beam reads as UI chrome**~~ — **CLOSED by iter 87.** Six agents on
  4 seeds across iters 79/84/85 called `drawMonoAt`'s beam a "debug overlay floating above
  the rooftops"; 85 corrected the attribution (it was never `drawGondAt`) and 87 fixed it:
  peak tone **255 → 217**, the girder given a shadowed body + underside, the pylons planted
  on `creamDk` footings under a pier head whose top face is `RAILH` itself. Both wide agents
  confirmed it now reads as elevated infrastructure. It is legitimate geometry — **never
  "fix" it by deleting it.** One durable lesson: the monorail deliberately has **no sag**,
  because a rigid box girder does not sag; only the gondola's rope does. *Don't re-open.*
- **⚠ A TICK IS 0.075 YEARS, NOT ONE (iter 90).** `__warp(n)` runs `while(year<target){year+=0.45/6;tick();}`
  — so a `tick()` pass runs **~147 times by 1985, ~413 by 2005, ~813 by 2035**. Any *per-tick rate*
  (accretion, decay, growth) must be scaled to ~800 ticks or it saturates long before the first era
  you can screenshot. Iter 90's first two attempts were ~13× too fast and the dune ridge was fully
  grown *and* grassed at 1985, with zero visible succession; it looked like a placement rule. If your
  new pass is meant to *evolve over the eras*, print its state at all three eras before you tune it.
- **A terrain-altering CA CAN be pop-neutral — preserve every predicate the old tile answered (iter 90).**
  The standing warning that terrain passes always wobble pop a few % is true only if you let the
  swapped tile *drop out* of the predicates the old one satisfied. `BEACH→DUNE` moved 266 cells and
  came back **+0 on all 22 metrics** (pop, developed, roads exact) because DUNE was added to every
  passive test BEACH participated in: **`valueSrc` (0.74 — the big one; the `default: 0.5` would have
  shifted the coastal land-value field inland and cascaded into development), `greenNear`,
  `openCells`, `strollable`, and the aquarium's shoreline adjacency**. Grep the new tile's *predecessor*
  for every mention before you swap it. Two conversions were provably safe to skip: KELP and the
  LIGHTHOUSE both require a **water-adjacent** beach cell, and a dune by construction has no wet
  neighbour — reason it out rather than adding the tile everywhere by reflex.
- **⚠ Drawing a rounded natural mound: apex + ground contact + ONE hard facet boundary (iter 90).**
  Four attempts, all looked at zoomed. **There are ZERO gradients in the file** (`createRadialGradient`
  ×0) — the style is flat facets, so soft shading is not available. What fails: two stacked ellipses
  read as a **pancake on a cast shadow** (a larger, lower, darker ellipse *is* the grammar of a drop
  shadow) — and no amount of resizing them fixes it; a single symmetric ellipse cut by a straight
  ridge reads **flat**; a truncated cone reads as a **drum/volcano**. What works is `T.ROCK`'s idiom:
  a silhouette with a **visible apex** and a **visible ground-contact line**, split by one crisp facet
  edge (dome profile arc + contact arc, shaded, with a lit cap sagging back from the apex). Copy the
  ROCK case, not the MARSH case, for anything that must sit *up* off its tile.
- **⚠ `pop` is NOT bit-reproducible across census runs (iter 85).** Identical source, three
  runs: `+2`, `+2`, `+0`. So a ±2 wobble on a **draw-only** change means nothing — re-run the
  gate on unchanged source before concluding the seeded stream moved. (Iters 78/84's "+0 on
  all 22" controls were real, but the guarantee is statistical, not exact.)
- **Aerial structures: a straight uniform stroke IS the grammar of a UI overlay (iter 85).**
  What separates geometry from chrome is **sag, shading, a footing and a cap** — and sag is
  the cheapest. The gondola now has all four: `gondSag(g,f)` is a parabola over the span
  between bracketing towers (`GONDSAG`=0.95px/cell → 2.81px over 3 cells, a ~4% sag ratio),
  **exactly 0 at each tower** so the rope lands on the sheave head; `buildGondSet` publishes
  `g.pyl` (spans, for `gondSag`) + `g.pylSet` (draw test); the pylon is footing + shaded mast
  + head; `gondPos` returns sag as a **5th element** so cabins ride the curve. **⚠ Draw any
  per-cell curve with `GONDSEG` sub-steps** — a 3-cell span has only *two* interior cells and
  symmetry forces them to equal height, so cell-centre sampling yields a **trapezoid**, not a
  curve (`0 2.53 2.53 0`). `drawMonoAt`'s beam is the same defect, unfixed — see cue (c).
- **Civic forecourts are a *placement* rule, not a tile (iters 36 → 80).** Every
  `PLAZA` in the city is a forecourt; 36's random-sample rule at L909 has never
  fired even once and survives only to keep the `rng()` stream aligned — do not
  "fix" it, and do not count on it to make plazas. Placement scores each neighbour
  `(front side ? 1e6 : 0) + maxAdjacentRoadFlow`, so **front dominates and flow
  only breaks the tie**. `FORECOURT_LOT` = `{EMPTY, RES, COM, MID}`: an institution
  may clear a shop or a mid-rise for its square, never a `TOWER`, never a `PARK`.
  Widening that set from `{EMPTY,RES}` is what took coverage 6/15 → 14/15 civics —
  the downtown halls ringed by shops were the ones going without.
- **Peds walk the streets now — `pedWalk`/`PEDLEASH`/`kerbDir` (iter 78).** Open ground
  is ~100 *disconnected islands* by 2035 (parks/plazas/beaches), so a ped confined to it
  can never leave the one it spawned on. Peds may now also walk **roads** (not bridges —
  raised deck, they'd sink), bounded by `PEDLEASH`=2 hexes from an anchor `p.hx,p.hy`
  that **re-anchors on reaching open ground** — so parks chain through the streets
  between them and the walkable-island count roughly **halves** (99→46, 101→37, 95→53).
  Streets are transit, not destination (shorter `tm` + `PEDSTEP_RD`>`PEDSTEP_OP`), so
  occupancy settles ~19%: 4 residents in 5 are still in the parks. `kerbDir()` puts a
  street ped on the **kerb** facing what it came to see, never the centre line.
  **`strollable()` is unchanged, so dogs are still park-bound** — a natural follow-on.
- **Peds have a gait, and the velocity was already there (iter 84).** `stepPed` lerps
  `ox→tx`, so **the residual `tx-ox` IS this frame's speed** — no new state, no
  `Math.random()` draw, so the pixel-identical control of iter 78 is preserved. `drawPed`
  scissors two legs with amplitude `clamp(sp*0.42,0,1.15)`, hips bobbing over the planted
  foot; at `sp≈0` the legs close and the ped *stands*. Measured across 1560 ped-frames:
  ~11% idle, ~49% full stride. **Any entity that lerps toward a target can be animated
  from its own residual this way** — `stepDog` (`ox→tx`, dogs still legless) is the
  obvious next one, and `stepShuttle` lerps too. Gait phase is `ph:peds.length*1.7`,
  **index-derived on purpose**: a `Math.random()` at spawn would have re-rolled every
  other mover. The old ped also **floated ~0.6px above the ground**; feet now touch it,
  so the figure is ~0.5px taller. That is the fix, not a regression.
- **⚠ Screenshotting a 5px entity: centring on it is NOT enough (iter 84).** Three
  re-shoots. (a) `__ents` returns `{name,sx,sy}` with **no identity**, so "track one ped"
  is positional, and at `zoom=14` a ped outruns any search radius — the clip photographed
  a building. Re-pick the ped *nearest screen centre each frame* instead. (b) Entities are
  drawn **with their row**, so buildings in the rows *below* paint straight over them: a
  perfectly-centred ped can be entirely hidden. Filter to peds whose next two rows downhill
  are flat (`!TALL.has(c.t)` — **`TALL` is NOT a page global**, iter 85 tripped on this;
  rebuild it in the probe as `new Set([T.TOWER,T.MID,T.CIVIC,T.COM])`) and that stand on
  open ground — `hovershot.mjs`'s `PICK=front`
  is the same lesson, generalized. (c) At `ZMAX=14` an 80px clip is **narrower than one hex**;
  use ~200px so the figure has context and survives a one-hex stroll. Budget ~4 shot
  attempts for any few-px entity, and **look at the first frame yourself before spawning
  agents** — two of the four agents in this lap's first round graded a building.
- **⚠ An entity-behaviour change CANNOT have a pixel-identical BEFORE control (iter 78).**
  Entity motion (`stepVehicle`, `stepPed`, …) draws from the **shared unseeded
  `Math.random()`**, never from seeded `rng()`. So changing *how many* `Math.random()`
  draws happen per frame re-rolls every other moving thing — both seed-78 subagents
  correctly saw cars/trams/a helicopter shift between BEFORE and AFTER, and one wrongly
  concluded the "scene RNG order" had been perturbed. It had not: the seeded CA stream
  was untouched and all 22 census metrics + every entity count came back **exactly +0**.
  Only *terrain/draw* changes (76, 77) yield clean controls. Tell the reviewing agent to
  look for **stationary** evidence, and don't read moving vehicles as a determinism bug.
- **Reach maps exist — reuse them (U5):** `reachFill(out, r, isSrc)` is a
  multi-source hex BFS capped at radius `r`, walking over land only (`WETSET` blocks
  water/marsh/kelp), filling `out` with steps-to-nearest-source and 255 for "farther
  than r". `recount()` already runs four per tick (transit / green / shop / service).
  Any "how far is X from Y" question should call it rather than hand-rolling a flood
  fill. Cost is ~1ms per `recount()`, which is per *tick*, not per frame.
- **⚠ Three census stats can FALL, by design (U5):** `walkPct`, `transitPct` and
  `solarPct` are shares of residents/roofs, not counts. Green space and shops
  saturate >90% on their own, so **services are walkable's binding constraint** — a
  tower lap that adds residents without civics will *drop* `walkPct`, and that is
  the stat working, not a regression. Judge them by whether the city earned the
  change, not by "up = good". `density` (residents per developed hex) rises with
  intensification and falls with sprawl.
- **Lit vs emissive — `colA()` exists now (iter 79).** `col()` applies `TINT`, but it
  returns `rgb(...)` with no alpha, so **every translucent highlight in the file was
  written as a hardcoded `rgba(255,…)` literal and silently ignored the day/night tint.**
  `colA(name,f,a)` is the tinted-rgba twin (uncached — `a` is continuous; measured free).
  The test is **does the thing reflect light or emit it?** Foam, glints, wave sparkle
  *reflect* → must go through `colA`. The moon (L3851+), aquarium bioluminescence (L3231),
  window lights, and the `LITAMT`-gated shore glow *emit* → they correctly keep literals,
  and several are deliberately gated to appear only at night. **Do not "fix" those.**
  Remaining untinted literals that may deserve the same look: the whale spout (L3774) and
  boat wake at L3659 — both sit next to `col('foam',1)` calls, so the file is inconsistent.
- **⚠ A holistic VISUAL: PASS is WEAK evidence (iter 79).** Two subagents each returned
  `VISUAL: PASS` on whole-city night frames in which the surf was rendering as a pure-white
  neon rim around the entire coastline — a real, 79-lap-old defect. An un-primed reviewer
  told "check if anything compounded" has **no BEFORE to compare against** and grades the
  city against its own imagination, so it ratifies whatever it sees. Two working signals:
  (1) **contradictory explanations of the same artifact are a finding** — both agents
  explained away the white cable-car lines, one as "stadium pitch markings", one as "the UI
  selection overlay" (they are `drawGondAt`'s `col('whiteDk')` pylons+cables, L3424, and
  legitimate); (2) **a caveat both seeds volunteer is a finding** — both flagged night sand
  as "muddy brown… acceptable", which is the tint working, but looking at *why* they both
  reached for it surfaced the untinted foam beside it. Look at the frame yourself when two
  agents agree in different words.
- **⚠ A reviewer only sees the change at the scale the change lives at (iter 82).** Two
  wide-frame agents returned `VISUAL: PASS` on a change that the one **downtown-zoom**
  agent correctly failed. A street wall is a *block-scale* feature, so the block-scale
  verdict outranks two city-scale ones. Send the zoom that matches the feature's scale,
  and **when verdicts split, believe the tighter one** — then confirm by eye.
- **⚠ A moved tile histogram can still be a lie (iter 82).** `COM +182` read as 182 new
  shops; a probe showed only ~45/city were actually the feature — the rest was the
  seeded stream reshuffling downstream of a terrain change. The histogram proves the
  vector *touched* its tile, not that it *built* the thing you designed. **When a
  feature has a shape (a run, a ring, a spine), measure the shape.** A 40-line
  connected-components probe in the page (`cells`/`cellAt`/`nbrDirs` are page globals;
  copy `probe-forecourt.mjs`) settled in 90s what 3 screenshots and 3 subagents could
  not. Delete the probe after; the finding goes here.
- **The marine layer is a FIELD on the plate, not blobs on the lens (iter 81).**
  `fogAt(x,y,i)` × `FOGAMT`, emitted per-hex *inside* the row loop, so the next row
  occludes it and it can never hang off the plate. Gated by `rSea` — a fifth
  `reachFill` whose sources are every wet cell, so fog finds rivers and marsh too.
  Colored via `colA('fog',…)` (it scatters → it takes the tint). Two things that
  look like bugs and are not: (1) the per-hex alpha is 0.22, tuned for the ~2.4
  lenses that survive *across a row* — the next row paints over the rest, so the
  field does not accumulate down-screen; (2) the faint hex ripple in fogged water
  is the lens lattice, and **hash-jittering the centers to break it up makes hard-
  edged bubbles instead — tried, reverted, don't re-try.** `FOGAMT>0.02` early-outs,
  so a clear city pays nothing; a foggy frame costs ~+10%.
- **⚠ The three gates share a SAMPLING blind spot (iter 81).** Census, perf and
  every screenshot run the same seeds (7/42/1234, or 42) at the same times
  (`t≈0.3`, `t=0.8`). The fog spell fires only when `sin((seed%97)*0.7)>0.25` —
  which *none* of those seeds satisfy — and the dawn bank needs `t≈0.10`. So a
  feature that had shipped before the ledger existed sat visibly broken for 80
  laps, unrendered by any gate. Kelp survived 13 laps by never being *looked at*;
  this survived 80 by never being *sampled*. When touching anything time- or
  seed-gated, find a seed×t that actually shows it (and say which, in the entry).
- **⚠ Overlays drawn last FLOAT (iter 71):** the instinct to draw a highlight
  "last of all, so it can never tear" is wrong in this renderer. Rows draw
  top→bottom, so an entity in row *y* is legitimately occluded by a tower in
  row *y+1* — an overlay drawn after everything then lands on that tower's roof,
  ringing the wrong object. Draw entity overlays **at the entity's own z** (i.e.
  from `stamp()`), and accept that an occluded entity shows no ring. Also:
  `ctx.lineWidth` is in **world** units under the camera transform, so a 2.2px
  stroke is *thicker than a 1.8px pedestrian* — keep entity-scale strokes ≤1.1.
- **⚠ `dx` is NOT a screen direction (iter 73):** on this offset-row hex grid the
  sign of a neighbour's `dx` does not say which way it lies on screen. An **even**
  row's `dx=0` diagonals sit half a cell **EAST** (`sdx=+16`) and its `dx=-1`
  diagonals WEST; **odd** rows invert it. Code that buckets neighbours by
  `dx>0 / dx<0` (and skips `dx===0`) silently becomes *east on odd rows, west on
  even rows*. Always difference `ctr(x,y)[0]`. `frontSide()` does this; it also
  weights the due-E/W neighbour 2× a diagonal, which is correct.
- **⚠ Facing ≠ visible (iter 73):** orienting a detail toward a street does not
  make it *seen* — a tall tower up to ~3 rows **south** covers a face whichever
  side it is on (11 of 24 reoriented civics got more occluded, 10 less). Occlusion
  is a coin flip orthogonal to siting. If a Polish lap wants a *visible* win, it
  must choose the less-occluded side, not just the correct one.
- **Hover verification:** `shoot.mjs` cannot hover. `hovershot.mjs` (iter 71)
  drives Playwright directly: `__ents` aims the real cursor at a named entity,
  `ZOOM=n` wheels the artifact's own camera in (real magnification, not upscaled
  pixels), `PICK=front` favours front rows (a back-row entity may be occluded
  and legitimately ringless). Emits a no-hover control frame + 3 clip scales.
- **⚠ THE RESOLUTION CEILING: a hex is only ~23 screen px (iter 77).** `scale` at rest
  is **0.73**, and `ctx.lineWidth` is in *world* units, so **device px = world × 0.73**.
  Iter 77 first shipped a "doubled centre line" of two 0.42-wide strokes 0.62 apart →
  **0.31 device px each, 0.45px apart**: physically unresolvable, and *fainter than the
  1.0-wide dash it replaced*. Before drawing any fine detail, multiply by 0.73 and ask if
  it survives. Sub-pixel strokes don't render thin — they render **absent**. The fix that
  works is one crisp ≥1.2-world line, optionally splitting into detail when `scale>1.7`
  (a legit LOD dial: the camera zooms to 14×).
- **⚠ Visual-gate FALSE **PASS** — the mirror of iter 70 (iter 77):** a subagent told
  "look for gold arterial lines" reported seeing them **when the feature was rendering
  sub-pixel**, because the city *already* had gold `busy` dashes that look like the
  feature. A primed agent pattern-matches. Two standing fixes: (1) for any change to a
  **marking, color or line weight**, shoot a **BEFORE control at identical clip coords**
  (`git show HEAD:solvista.html > before.html` — `shoot.mjs` takes it) and make the agent
  say *what differs*; (2) name the confusable pre-existing element in the prompt and
  forbid reporting it. A verdict of "the feature is visible" is worthless without a
  control; "X is in AFTER and absent in BEFORE" is evidence.
- **⚠ `tileshot.mjs` mis-frames FLAT tiles (iter 77):** its clip is lifted `dy`=110px
  **above** the tile centre to catch tall towers, so for a ROAD/PLAZA/BEACH the target
  lands at the bottom edge and a reviewer judges the buildings north of it. For flat
  tiles clip centred (`sy-70`, 220×150) instead. This produced iter 77's second false
  FAIL — two of three gate verdicts that lap were framing artifacts, not the feature.
- **Magnified TILE clips: `tileshot.mjs` (iter 75).** The tile-side twin of
  `hovershot`: `node tileshot.mjs '<url query>' TOWER <outdir>` aims a
  `deviceScaleFactor:4` clip at one instance via `__find`, emitting
  `tile-close/tile-mid.png`. Use it whenever the feature under test is only a few
  pixels wide — it is the standing fix for iter 70's false-negative trap (a
  subagent calling FAIL because a feature was unresolvable at `downtown` scale).
- **⚠ `c.age` is in TICKS, not years — ~13.3 ticks/year (iter 76):** max age is 681 at
  year 2025. Any threshold you write thinking in years is off by 13×. (The sim's own
  rules already know this: `age>16` at the succession pass is ~1.2 *years*, not 16.)
- **⚠ Forest age is a DEAD field; the woods are frozen (iter 76):** `c.age` is ticked
  and reset by fire/logging/succession but **no sim rule reads a FOREST's age**, and
  turnover is ~zero after ~1995 — forest hexes younger than 15 years at 2035 number
  **0/1/0** across seeds 7/42/1234. So "forests grow up / burn scars regrow" would be
  invisible in ~99% of cells. Don't re-explore it. What *does* vary is **canopy
  closure** (wooded-neighbour count fills all of buckets 0–6), which is what 76 shipped.
  Related: **`MEADOW` is down to 1 cell at 2035** — the wildflower-bloom CA and the
  deer's meadow habitat have almost nothing left to run on in a mature city, so
  deepening blooms or deer buys nothing at the late era.
- **Saturation notes:** Water & coast additive moves are well spent (6 new
  elements) — prefer Deepen/Polish there. Weather now has rain + rainbows +
  sea-fog spells (35, 43) + wind/gust cycle (50) + FULL SEASONS (57: winter
  cools, spring freshens, golden-hills summer, autumn ambers; evergreens sit
  it out via the conifer palette split). ⚠ **Sky is now CONFIRMED SATURATED
  (iter 68/69):** probing for a Sky feature turned up clouds + cloud shadows,
  rain, rainbows, sea-fog, wind, seasons, moon, moonglade, stars AND shooting
  stars all already present — don't add to Sky, it's done. **People is
  near-saturated too (iter 69):** peds/dogs/walkers/kids/joggers + block
  parties, evening crowds, picnics, benches, park cafés, fireflies all exist.
  Parks are mature (café kiosks, ponds, fountains, sculptures, fireflies).
  The city is reaching overall maturity — most domains now answer a
  "does this exist?" probe with YES. Lean hard on Deepen/Polish/Interaction,
  reach for genuinely-absent interconnects, and treat "returns have
  flattened → stop" as a live option. Emptiest cell left: Sky ×
  Connect (dubious — what would it even link?); after 49 every flagged gap is
  filled, so lean Deepen/Polish/Interaction from here (saturation, not
  rotation, is now the binding constraint). **But iter 77 is a counter-example worth
  remembering: Transport × New CA rule sat empty for 76 laps and paid out a whole new
  city-scale structure (the arterial spine) with zero terrain risk.** Before declaring a
  domain spent, check whether it's spent in *every kind* — an "additively saturated"
  domain can still be missing its CA rule. Standing leads: `treed` boulevards still
  spread on `busy`, so **allées line the wrong streets** — retargeting them to `c.flow`
  would plant the trees down the trunks (Transport × Deepen); vehicles ignore `c.flow`
  entirely and could prefer arterials. ⚠ Nature × Connect is a DEAD END
  (iter 46): woodland
  patches are never within ≤5 axis-steps of each other across open ground in
  real cities — wood-to-wood green links have no geometry to attach to; don't
  re-explore. Explored & reverted: solar-farm contagion (iter 32);
  tuned-not-reverted: forecourt plazas (iter 36 — 1996 start collapsed pop 5%,
  moved to 2020). **Civic is additively saturated too (iter 73):** every civic
  kind is already richly drawn (flags, beacons, night glows, an amphitheatre
  audience) — probe the draw case before believing any Civic gap. Open Civic
  lead: the 27-of-74 civics that front roads on *both* sides (corner lots) still
  fall back to a hash in `frontSide` — picking the less-occluded side there is
  the natural next Civic × Polish lap (see iter 73's follow-up).
- **Shipping:** `solvista.html` is the deliverable — one self-contained file,
  served from the repo by GitHub Pages. A pushed commit is a shipped city, so
  there is no redeploy step, no separate live copy, and no sync debt to track.
  Keep the file standalone: no external assets, no build step.
- **⚠ `__ents` blind spot (iter 70):** the `vehicles` array (private cars, buses,
  police, ambo, fireeng) has **no `ENTINFO` row** — it's a mixed-kind array, so
  one label would be wrong — which means `__ents()` never returns cars and you
  **cannot aim a clip at a car** with it. `__ents` only sees trams
  ('Streetcar'), trucks ('Delivery truck') and bikes ('Cyclist'). Don't conclude
  "this seed has no cars" from an empty `__ents` result (iter 70 nearly did).
- **⚠ Visual-gate false negatives (iter 70):** a subagent returned `VISUAL: FAIL`
  for a night-lighting change purely because the feature was **too small to
  resolve** at the `downtown` clip scale at dusk — not because it was broken. A
  few-pixel feature needs a **magnified clip** (`__ents` coords + a ~110×80 clip
  at `deviceScaleFactor:4`) before a FAIL means anything. Also: the big grey
  diagonal in many clips is the **monorail/gondola support**, and at low
  resolution it looks exactly like a hard-edged white light beam — tell the
  subagent so, or it will report a phantom tear.
- **⚠ Concurrent sessions:** a polish-tile loop edited `solvista.html` *while*
  iter 35 ran (espRow/espAt/drawEspAt smooth esplanade; promenade metric
  399→153 is its intended re-banding, not a regression). If two loops run at
  once, unexplained metric moves may be the other session, and file-state write
  conflicts are possible. Check for surprise functions/metrics before blaming
  nondeterminism. (Since 2026-07-08 the folder is `/Users/alec/me/solvista`,
  a git repo pushed to github.com/alecsharpie/solvista — commit each shipped
  iteration.)
- **Perf gate** (`polish-tile/perf.mjs`, every ~5 iters): FAILED at iter 39
  (day +22-38%); **FIXED at iter 40** (bandS single-path + setLight cache fix).
  Latest reading (**iter 87**): PASS ×3, min of each scene, day **31.78ms** (baseline
  31.33, **+1.4%**) / night **35.89ms** (baseline 37.22, **−3.6%**) — within 0.2ms of
  iter 85's numbers for the structurally identical pylon change. Two extra prisms on
  ~40 monorail pylons cost nothing measurable, exactly as 85's ~21 gondola towers didn't.
  Earlier reading (**iter 77**): PASS ×3 on a quiet box, day **30.17ms** / night
  **34.11ms** (baselines 31.33 / 37.22 → **−3.7% / −8.4%**, both *under* baseline and
  matching iter 76's 30.28/34.44). A per-tick CA pass over ~800 road cells plus the
  arterial centre lines cost **nothing measurable** — the pass is per *tick*, not per
  frame, and trunk hexes skip the dashes they replace, so the draw is neutral by
  construction. Note the baselines were re-pinned after U4's bigger plate.
  Earlier reading (iter 75): day **24.55ms** / night **27.44ms**
  (old baselines 24 / 26.61 → +2.3% / +3.1%). Iter 75's lit windows cost
  **+1.55ms of NIGHT frame** (25.89 @74 → 27.44) and **+0.05ms of day** (i.e.
  nothing) — the first clean measurement of the header's own "gate new draw work
  on night" heuristic, and it holds. **Night now carries ~2.9ms of headroom
  before +15%; it is the scarcer budget from here, so the next few laps should
  prefer day-visible or draw-free vectors.** (Readings were unusually stable —
  all three runs agreed to ±0.05ms, so the box was quiet.)
  ⚠ **The "creeping day floor" was mostly measurement noise — claim retired at
  iter 74.** The floor FELL across 25.17 @69 → 25.22 @70 → 25.11 @71 → 24.78 @72
  → 24.50 @74 while the code only *gained* draw work (freighters, focus ring,
  `frontSide`). Draw cost can't fall as draw work rises, so the earlier minima
  were load-contaminated. No fix-lap threshold is pending. Corollary: **min-of-3
  is still not enough isolation on this box for a 0.5ms delta to mean anything** —
  don't build a story out of sub-ms moves. Night rose +0.27ms @70 (vehicle
  lights) — cheap, because they're gated on `LITAMT>0.35`. **Gating new draw work
  on night is a good way to buy detail without touching the day floor.**
  ⚠ This machine runs hot (load avg 4+): run the gate 3× and judge by the MINIMUM.
- **Holistic reads:** @69 seed 314 night + seed 42 golden hour, both coherent.
  **@74 seed 903 + seed 1234, each day AND night, both PASS** — land→sea gradient
  reads, downtown dense but streets still separate blocks, rooftop props varied not
  spammy, night is "tasteful sparkle, no glare discs or bloom halos." No tears, no
  floaters, no blown color. The city is in good visual health as of iter 74.
- **⚠ Sea fog is seeded, not drift (iter 74):** soft vertical translucent ovals over
  the water/shore are the **sea-fog banks** (`solvista.html:3618`), spell phase
  `sin(time*0.028+(seedNum%97)*0.7)`. `1234%97=70` sits inside a foggy window;
  `903%97=30` does not — so two seeds legitimately disagree about whether the city
  is foggy. Don't diagnose it as haze/glare drift. Sea-fog watch item from iter 60
  was **FIXED at iter 61** (feathered three-lens banks + beach-band fade), and that
  fix still reads soft at 74.
- **⚠ An exactly-flat census does not prove a change was pure (iter 74):** `__warp`
  is a deterministic fixed tick loop, but `census.mjs:55` reads `__census()` after a
  **500ms wall-clock wait** while the page's RAF loop keeps advancing
  `year += dt*s/110`. The ±1..21 "last-partial-tick jitter" of iters 70/72/73 is
  real and **load-correlated**; a perfectly flat table (as at 74) means the box was
  quiet, not that nothing was perturbed.
  ⚠ Harness lesson (iter 65): NEVER run census + shoot.mjs in one parallel
  command — contended Chromiums time out mid-init and produce blank "1974 /
  0 residents" frames that look like a catastrophic regression. Re-shoot
  solo before believing a blank frame.

---

<!-- rotated -->

> **Archive:** the 102 entries before Iteration 100 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

## Iteration 100 — the institutions get their grounds (2026-07-10) [holistic step-back]

**Vector** — Civic & culture × **New element (SHIPPED)**, plus the 5-iteration holistic step-back.
Both axes were forced and both were right: iter 99 left an explicit instruction (*"iter 100 should be
Civic & culture, and NOT Polish"*), Civic's **New element** cell had been cold since **iter 30** — 70
iterations — while its Deepen cell was the row's busiest (36/59/66/80/91), and no **New element** had
shipped anywhere for five iterations. It also takes a bite out of standing cue **(e½)**: institutions
are what earns interior green in a real city.

**Change.** A new tile `T.QUAD` (31) — *mown institutional grounds*. `GROUNDS` = the five `MAJORK`
monuments **+ hospital + school** (the two services whose real plan is a building set back in its own
green; a firehouse has an apron, the amphitheater already sits in parkland, the observatory wants the
dark rim). At **2022+**, each such institution takes the lot **behind** it: the forecourt rule (2020)
scores on `c.flow` and takes the *loud* side, so the quad inverts it and takes the quiet one — the
back lot fronting no street. Runs after the forecourt, so `PLAZA` is already claimed and sits outside
`FORECOURT_LOT`; the two squares can never contend for a lot. `hashCell`-gated, no `rng()`.
Registered in all seven seams a ground tile touches: `valueSrc` (0.92, as park), `reachFill(rGreen)`,
`openCells`, `strollable`, `PEDDEST` (peds now stroll the quad), the draw case, and
`TILELABEL`/`TILEDESC` — hovering one says **"Quad / Mown grounds behind an institution."**

**The probe killed half the design before a line shipped.** The obvious feature was a *shared* quad on
the cell between two clustered majors — iter 91 spaced the quarter at `QNEAR=2` explicitly to "leave
one between," which reads like a hook left for exactly this. `probe-grounds.mjs` measured what is
actually on that cell across three seeds: **ROAD 10/16 · PLAZA 4/16 · a bare lot 3/16 (one seed).**
`siteQuarter` requires `roadNear()`, so **two institutions meet on the street they both front, by
construction** — greening it would have severed the civic mile iter 45's bunting is strung along.
Shared gap cells: **0, 0, 3.** The back-lot design was the supported one: **8/10, 11/12, 11/12**
institutions have a convertible neighbour, and those neighbours are overwhelmingly **MID** — the exact
"edge-to-edge carpet" tile cue (e½) complains about.

**⚠ THE FINDING: ORNAMENT YOU CANNOT SEE AT DISTANCE STILL AVERAGES INTO THE TILE'S TONE, AND CAN
CANCEL THE BASE COLOUR YOU ADDED TO CARRY IT.** The visual gate **failed three times on seed 7**, always
with one sentence: *"grid-correct and well-placed, but reads as a generic grass hex."* Rounds 1–2 I
treated it as an ornament problem (clip to the true hexagon — an ellipse clip had cut the mower passes
into a lens and let the path slab out over the neighbours; replace two floating dark blobs with a
shrub row). Those were real bugs and fixed real ugliness **up close**, and changed nothing at city
zoom. The cause was that `QUAD` was drawn in **PARK's own `lawn`**. So I gave it a `turf` of its own —
and it *still* failed. `probe-quadtone.mjs` (samples the real canvas at default fit zoom, 3×3 disc at
each tile centre) said why:

| | before | after | reference |
| --- | --- | --- | --- |
| QUAD vs PARK `ΔL` | **6.9 / 2.9 / 9.3** | **20.7 / 19.3 / 22.5** | PARK vs FOREST (obvious): 31–36 |
| QUAD vs PARK `ΔRGB` | 12.2 / 15.2 / 25.0 | 30.8 / 31.3 / 37.9 | PARK vs FOREST: 60–66 |
| QUAD sampled lum | **160** (base fill was 144) | 144–146 | PARK 163–168 · MID 157 · FOREST 131 |

`turf` had luminance 144, but the tile **measured 160** — the mower stripes (`turf×1.12`, covering
most of the face) and the cream path were lifting the sampled tone **+16 back toward park**. Iter 95's
law is that coverage cannot *create* legibility at distance; the corollary, unowned until now, is that
**coverage can destroy it.** Fix: stripes `1.12→1.05`, path `cream .95→.90` and thinner, rim hedge
darker/thicker (`canopy .82→.70`, lw `2.6→3.2`), `turf` re-cut deeper *and cooler* ([101,137,97]) so
it separates from PARK by luminance **and** hue, and from FOREST by hue. QUAD now sits as a third
green between forest and park, and **slightly darker than the MID carpet (145 vs 157)** — green
relief, not a dark hole. **Measure the tile as rendered, not as specified.**

**Census** — `VERDICT: PASS`. `QUAD 0 → 23` (the rule is 2022+, so only the 2035 era of the matrix has
them: ~7–10 per city, matching the probe). `pop 150332 → 148777 (−1.03%)`, `developed −29`,
`roads −2`, `TOWER −4`, `MID −17 · RES −10`. A terrain rule, so it perturbs the stream by design and
this is the low end of the few-percent the invariants predict — a far better trade than the reverted
solar farm (−4% for a barely-visible feature). `schools 23→21` is the pop-gated school rule
(`pop>3500*(schools+1)`) crossing its threshold on a 1% pop dip, not a bug. The three later
draw-only rounds moved the histogram **not one cell** — an implicit control that the turf/hedge/palette
work was purely draw-side.

**Visual** — 4 rounds, 2 seeds, no enhancement. Final: both **PASS**. Seed 7 — the reviewer that
failed it three times — returned *"YES — this is the real change… they no longer blend into ordinary
parks,"* found 3–4 quads unaided, and confirmed not-too-dark. Two agent verdicts proved unreliable in
the middle rounds (one described a tower facade in a quad clip), which is why the **pixel probe, not a
fourth opinion, is what settled it.**

**Perf (step-back gate)** — 3 sequential passes, day **34.17 / 34.61 / 34.94ms**, night **38.83 /
39.55 / 39.78ms**; PASS (min day +9.1%, night +4.3% vs baseline). The monotonic pass-over-pass rise is
iter 99's documented load signature, and iter 99's published HEAD-under-load band (day 33.83–34.83ms)
contains my minimum — so the quad's ~8 extra tiles of draw cost nothing measurable, as expected
(`col()` memoizes, so `turf` buys a cache entry).

**Holistic whole-city (2 seeds, un-zoomed).** Both PASS, no bugs, no compounding. Coastline explicitly
healthy — *"one of the strongest parts of the frame,"* kelp restrained. Night warm and legible.
Skyline: iter 98's core is *"readable… but a loose band rather than a tight core."*
**Cue (e½) survives, narrowed again:** the interior *"does breathe… but green is fragmented into small
patches rather than any real district-scale lung."* Both the agent's top recommendation and mine:
**consolidate green into one or two district-scale parks/greenways** rather than more scatter. Iter 100
added *earned* green (7–10 hexes); it did not add a lung.

**Verdict — SHIPPED.** The institutions have grounds, the tooltip names them, peds stroll them, and the
mid-rise carpet gave up ~23 cells to green that a city actually earns. Three visual failures on one
seed were worth more than the ship: they produced `probe-quadtone.mjs` and the law above.

## Iteration 101 — the greenway that could not be traced (2026-07-10)

**Vector** — Nature × **Connect**. Rotation forced the kind: 96/97/98/99/100 ran
Polish · Interaction · Polish · Polish · New element, so **Connect and Deepen were both
cold** and a sixth Polish-ish lap was off the table. The vector itself was *prescribed*,
twice over: iter 88 died proving "Nature × Connect is not reachable draw-only" and left an
explicit design for its successor — *"the reachable Connect hosts are the greens the city
already protects; a PARK↔PARK↔FOREST greenway is the version with an actual host, **if one
plants it as terrain early enough to survive**"* — and iter 100's step-back agent independently
asked to **"consolidate green into one or two district-scale parks/greenways."** Same feature,
found from two directions. Cue (e½).

**Change (reverted).** A `GWK`/`GWFAM` line on the diagonal family the main street did *not*
take, surveyed in `genWorld` after the high street: walk the axis, convert `EMPTY`/`MEADOW`
to `PARK` with a `c.gw` flag, skipping `corr` so crossing streets stay whole; ~40% of spine
cells bulge one hex sideways. Plus `gwTrail()` (a cream footpath), a `Greenway` tooltip, and
`__find('greenway'|'gwspine')`. **Zero `rng()` draws** — offset, side and bulges all from
`hashCell` — so `genWorld`'s seeded stream stayed byte-identical; only the terrain perturbed
downstream ticks.

**Census** — PASS, and the trade was *good*: `pop` −3346 (**−2.25%**) and `developed` −43
for ~52 green cells per seed, i.e. roughly **half the pop-per-cell cost of iter 100's QUAD**,
because `PARK` is the top `valueSrc` (0.92) and the ribbon lifts `val` along its whole
frontage — `cafes` **+141**, `COM` **+51**, `tallTowers` **+6**. `PARK` **+344** (not +470:
the late park pass fires less, because the greenway already satisfies its "no PARK within 3"
test — the ribbon *replaces* confetti, exactly what cue (e½) asked for).

**Visual — the gate, and the reason for the revert.** `VISUAL: FAIL` **7 of 9** agent reads.
Final version: seed 42 PASS (traced it on one axis, no tears), **seed 7 FAIL — could not
trace it.** Seed 7 is also the seed with the weakest measured contrast, so that FAIL is
*corroborated by the number*, not contradicted by it. A change must hold across seeds.

**Verdict: EXPLORED → REVERTED.** `solvista.html` is byte-identical to HEAD; census on the
reverted tree is **+0 on all 22 metrics**, empty tile histogram, 0 page errors. Reverted
because it cost 2.25% of the population and 27% of the stations for a feature you must zoom
one step in to see — the solar-farm trade — and because a 1–2 hex ribbon **is not the
district-scale lung cue (e½) asked for.** Cue (e½) stays **open**.

### Findings — what iteration 102+ should lift from this

- **⚠ CONTRAST IS NOT TRACEABILITY. For a LINEAR feature, legibility ≈ contrast × WIDTH.**
  This is the load-bearing result, and it *refines* iter 95 ("legibility at distance is
  luminance contrast, not coverage"). A tone probe (sample a 3×3 disc at each tile centre off the
  live canvas via `getImageData`, at **default fit zoom**, and compare mean sRGB luminance against a
  `PARK`-vs-`MID` scale reference) measured the spine at **ΔL 22–35 above ordinary PARK**,
  against a `PARK`-vs-`MID` reference of only **ΔL 7–11** — the ribbon out-contrasted a pair
  everybody calls obviously distinguishable, **and agents still could not follow it.** A
  one-hex-wide line at fit zoom is ~1 screen pixel: that is contrast *without a shape*.
  Below ~2–3 hexes across, a corridor cannot be traced no matter its ΔL. **Do not answer
  "can it be followed?" with a tone probe** — tone answers "does it separate", which is a
  different question. Iter 95's rule and this one are both true and neither implies the other.
- **PARK IS PERMANENT — the host iter 88 wanted exists, and is confirmed.** No pass in
  `tick()` ever consumes a `PARK`: development takes only `EMPTY`/`MEADOW`/`FARM` (L907/928/936),
  and roads pave only `c.corr` (L899/1192). Measured `survive == gw` on 3 seeds × 1985/2035.
  **So terrain planted in `genWorld` survives to 2035.** Any future green vector should plant
  early and stop worrying about the city eating it.
- **Green is not just affordable, it partly pays for itself.** `valueSrc` scores `PARK` **0.92**,
  the highest in the game (L813), so park frontage raises neighbours' `val`, which raises
  development probability (L909's `greenNear`) and height. −2.25% pop for 52 cells/seed, vs
  iter 100's −1.03% for 23. Budget green at **~0.045% pop per cell**, not more.
- **Survey a line's offset; never coin-flip it.** A `hashCell` coin flip aimed seed 7's ribbon
  out to sea — 17 cells planted, its walk blocked by `WATER:18` and `BEACH:6`. Scoring both
  sides by plantable cells (the same deterministic scan `hsBest` uses for the high street) took
  seed 7 to **58 cells** and fixed the seed spread. **Reusable for any future axis feature.**
- **Union-find must BRIDGE one cell, or it condemns a correct corridor.** A greenway crossed by
  streets is still one greenway. Strict adjacency called the ribbon **13/14/16 patches**;
  bridging a single non-green cell called it **4/6/4**, with `fullSpan` **56–59 hexes**. Iter 88's
  "mark paths, not cells" rule stands, but its *measurement* needs this amendment.
- **Drawing a continuous line across tiles under top→bottom row order: stroke HALF a segment
  from each tile to the shared hex edge.** The lower half is overpainted by the next row's tile,
  then redrawn by that tile's own upward half. Produced **zero z-order tears** across 9 reads.
  Worth re-deriving for any future path/greenway/route. (`px(x+0.5,y+0.5) === ctr(x,y)` exactly,
  so either is safe for integer cells.)
- **⚠ `stations` falls whenever you de-densify a band, and it is not a break.** `monoStationCells()`
  only counts a stop with `countAround(x,y,1,DEV)>=3`, and `PARK ∉ DEV` — so green beside a line
  drops its stops below quorum. `stations` **−17 (−27%)** while `monoLines` stayed **11**. Check
  `monoLines` before believing you severed transit.
- **⚠ Agent verdicts were unreliable AGAIN, and the tell is corroboration.** Nine wide-frame reads
  produced "a debug-chrome lattice", "an L-shaped kink", and "the trail rides over rooftops" —
  **all three factually false**: `px()≡ctr()` for integer cells, and stepping the SW family moves
  the centre exactly **−0.5·CW per row**, a straight screen line. But seed 7's FAIL *was* true, and
  the tell was that a number agreed with it. **Trust a verdict a measurement corroborates; verify
  one it contradicts.** (Iter 100 said the same and it keeps paying.)
- **⚠ Aim clips at DEFAULT fit zoom.** `shot-gw.mjs` wheel-zoomed first, then read `scale`/`offX`
  via `__find` — but the camera is still easing, so the clip landed on towers and I nearly
  believed the trail was not drawn at all. Shoot at fit zoom, or wait for the camera to settle.

### The prescription for a real lung (cue (e½) is still open)

Not a ribbon — **a blob.** Same ~50 cells, contiguous, **≥3 hexes across** so it has a shape at
frame scale; that is the one thing this iteration proves a 1–2 hex corridor can never have.
Expect it to cost *more* pop per cell than the ribbon did (the ribbon's long frontage was what
bought the `val` uplift back), so budget nearer iter 100's rate. Site it with
`hexDist(x,y,CBDX,CBDY)` (iter 98), **not** `c.val` — whose peaks already sit on parks and water.
The `c.gw` flag, the `Greenway` tooltip, the `gwTrail()` half-segment draw, and the contiguity probe
(union-find with a one-cell bridge, plus a blocker histogram of what stops the walk) were all
*correct* and are worth re-deriving; only the **shape** was wrong.

## Iteration 102 — the commons: the interior gets its lung (2026-07-10)

**Provenance — I did not author this change.** It was found **uncommitted in the worktree** at
startup, left by an iteration killed between its verdict and its `git commit`. Per the skill's
dirty-worktree rule, the **gates decide, not the ledger**: I re-ran the census (PASS), re-shot both
seeds, and re-ran the visual gate before adopting it. Everything below the Provenance line is
described **from the diff and from gates I ran myself**, not from the original author's intent.

**Vector** — Nature × **New element** (district-scale). This is the direct execution of the
prescription iter 101 wrote for its successor: *"Not a ribbon — **a blob.** Same ~50 cells,
contiguous, ≥3 hexes across… Site it with `hexDist(x,y,CBDX,CBDY)` (iter 98), **not** `c.val`."*
Cue (e½), open since iter 88 and asked for independently by iter 100's step-back agent
("consolidate green into one or two district-scale parks"), is **now closed**.

**Change.** In `genWorld`, after the high street: a deterministic survey scores every legal centre
in the band `6 ≤ hexDist(x,y,CBDX,CBDY) ≤ 13` by how much of its r=3 core is plantable, docking −3
per sea/void cell; the best centre gets an `r=4` disc of `PARK`. The outer ring only is nibbled by
`hashCell(x,y,seedNum^0x10A5) >= 0.55`, so the commons has a coastline rather than the silhouette of
a hexagon — but the **r=3 core (7 hexes across) is always solid**, which is the one property 101
proved a corridor can never have. `corr` and `hstr` cells are stepped over, so a street may cross
the commons and the high street keeps its shop wall. **Draws zero `rng()`** — it perturbs the seeded
stream only through the terrain it changes.

**Census — PASS.** `PARK` **943 → 1205 (+262)**, i.e. ~29 cells per seed-era. Core: `pop`
**+1432 (+0.96%)**, `developed` **−60 (−0.98%)**, `roads` **+94 (+1.65%)** — all inside chaotic
wobble, nothing near the −5% floor. Land came overwhelmingly from open ground, not from buildings:
`EMPTY` −219, `FOREST` −17, `MEADOW` +9.

**Visual — PASS, 2/2.** Seed 42 and seed 7, un-zoomed wide frames, one agent each. Both found **one
large contiguous green mass in the interior**, correctly hex-aligned, no z-order tears, no floating
tiles, no blown-out colour, and both read the whole frame as still balanced. Seed 7 — *the seed whose
FAIL killed iter 101* — was checked specifically for the ocean mis-siting that sank the ribbon, and
the commons lands **fully on land, clear of beach and river.** The deterministic survey did its job.

**Verdict: SHIPPED.**

### Findings

- **⚠ A BLOB DOES NOT COST POP — IT PAID FOR ITSELF, AND ITER 101'S PREDICTION WAS WRONG.**
  101 predicted the blob would cost *more* pop per cell than the ribbon (which cost −2.25%), reasoning
  that the ribbon's long frontage was what bought its `val` uplift back. **Measured: `pop` went UP
  +0.96%** while `developed` fell 1%. Compactness did not forfeit the uplift — it **traded extent for
  density**: `MID` −99 but `TOWER` **+18**, `tallTowers` **+8**, `RES` +30. Because `PARK` is the top
  `valueSrc` (0.92), a solid green mass lifts `val` on everything ringing it, and the ring builds
  *taller* instead of wider. **Do not budget green as a pop cost** (101's "~0.045% pop per cell" is
  superseded for compact shapes); a contiguous park is close to pop-neutral-or-positive.
- **The r=3 solid core is the load-bearing constant, not the r=4 radius.** 101's result — below ~2–3
  hexes across a shape is untraceable at fit zoom — means the *guaranteed* width is what earns the
  read. The ragged `hashCell` outer ring is pure ornament and can be tuned freely; the core cannot.
  Both agents found the mass unprompted, so 7-hexes-across clears the legibility bar with margin.
- **Survey, never coin-flip — confirmed a second time.** 101 learned this the hard way when a
  `hashCell` coin flip aimed seed 7's ribbon out to sea. The same deterministic best-of-scan (the one
  `hsBest` uses) put the commons on land on seed 7 **first try**. Any future placed feature should
  score candidate centres and take the max; it costs one loop and removes a whole class of seed bug.
- **`PARK` permanence held in practice, not just in theory.** 101 proved by inspection that no `tick()`
  pass consumes a `PARK`. This iteration is the end-to-end confirmation: green planted in `genWorld` at
  1974 is still standing in the 2035 census column.
- **⚠ Don't plant a second lung.** The cue asked for *one* district-scale park precisely because the
  complaint (iters 94 and 100) was scattered confetti. A second blob re-scatters. Nature's additive
  moves in this direction are now **spent** — next Nature lap should be Deepen or Polish.

## Iteration 103 — the houses stop copying each other, city to city (2026-07-10)

**Vector** — Urban fabric × **Polish** (a FIX). This closes open cue **(f)**, banked by iter 99
when it fixed the identical pair of defects in `MID` and measured — but did not fix — them in `RES`.
Rotation pointed at Sky/People, and I went looking there first; the survey below is why I turned back.

**Change.** Three lines in `drawBuilding`'s `RES` branch (L3392–3400 → L3392–3409):
- `bodyN=v<0.5?'terra':'cream'` → `mv=hashCell(x,y,seedNum^0x5C31)`, `tone=mv*0.72+v*0.28`,
  `bodyN=tone>0.56?'cream':(tone>0.27?'terra':'sandDk')` — the same shape as iter 99's `MID` fix,
  thresholds solved to hold a ~40/40/19 split rather than gutting cream.
- roof `hashCell(x,y,7)` → `hashCell(x,y,seedNum^0x7A9F)`.
- chimney `hashCell(x,y,5)` → `hashCell(x,y,seedNum^0x5C05)`.
- The prism's front face read `col(bodyN==='terra'?'terra':'cream',1)` — a no-op ternary while
  `bodyN` had two values, and a **latent bug the moment a third arrives** (every `sandDk` house
  would have worn a cream face). Now `col(bodyN,1)`.

Draw-only: `drawBuilding` calls no `rng()`, and `bodyN`/`roofN` feed no `rng()`-gated predicate.

**Census — PASS**, and provably stream-neutral. **Every tick-derived metric is exactly +0** and the
**tile histogram is empty**: `parks`, `towers`, `roads`, `developed`, `tileKinds`, `bridges`,
`greenRoofs`, `tallTowers`, `helipads`, `boulevardTrees`, `avenues`, `arterials`, `promenade`,
`stations`, `cafes`, `schools`, `stadiums`. The only movers are the three **frame-count-dependent**
metrics, and they wander in both directions across runs of *identical* code (see finding 2):
run 1 `pop −3 · towerHt −1 · solarRoofs +2`; run 2 `pop +6 · towerHt +1 · solarRoofs +0`.

**Probe.** `probe-restone.mjs` (now `git add -f`'d — the header's rule). Two questions, both answered
from the live page's own `hashCell`/`cells`/`seedNum` (bare-named — iter 96's law), and it scores the
**old and new schemes in the same run**, so one pass on either revision reports before *and* after:
- `corr(body is cream, height field v)` over every `RES` cell, era 2035:
  **0.889 / 0.868 / 0.871 → 0.240 / 0.219 / 0.253** (seeds 7 / 42 / 1234). Iter 99's post-fix `MID`
  band is 0.19–0.31, so `RES` now sits inside it.
- **cross-seed agreement** on cells that are `RES` in *both* seeds — 100% means every city paints the
  identical pattern. **Chimney: 100.0% / 100.0% / 100.0% → 59.5% / 67.9% / 57.9%.** Roof:
  61.9 / 80.4 / 93.0% → 14.3 / 26.8 / 21.1%.
- Body share: `terra 50/cream 50` → `terra ~41 · cream ~40 · sandDk ~19`.

**Visual — PASS, 2/2.** Seeds 42 and 7, un-zoomed whole-city **before/after pairs**, one agent each,
told not to enhance. Both found the third shade visible and warm, "blends into the existing earthy
palette rather than muddying it"; no z-order tears, no floating tiles, no blown-out colour; houses
still locked to the hex grid. Both independently confirmed **nothing but house body colour changed** —
seed 7's agent read the whole stat bar identical (`2035 · 35,200 · 71 · 64 · 179 · 33 · 18 · 49% ·
56% · 37%`), seed 42's read towers 76 / tallest 54 / parks 201 unchanged. That is the visual
corroboration of the census's stream-neutrality claim.

**Verdict: SHIPPED.** Cue (f) is **CLOSED**.

### Findings

- **⚠ THE CUE'S CLAIM WAS *NEARLY* RIGHT, AND THE NEAR-MISS IS THE INTERESTING PART.** Cue (f) said
  "every seed paints the identical RES roof pattern." Measured, the roof agreed only **61.9–93.0%**
  across seed pairs — because `roofN`'s first branch keys off `bodyN`, which keys off `v`, which
  **is** seeded. The literal-salt draw `rv` was identical in every city; the *rendered* roof leaked
  a little seed through its dependence on the body. **The clean demonstrator was the chimney**
  (`hashCell(x,y,5)`, no `v` term at all): **100.0% agreement on all three seed pairs.** Lesson:
  when auditing a seed-independence breach, **measure the term with no seeded dependency** — a
  downstream consumer can launder a constant into something that looks seed-varying.
- **⚠ A SINGLE STASH-CONTROL RUN CAN FRAME YOUR OWN CHANGE (corrects iter 97's recipe).** Iter 97
  established: suspect a small non-core delta → `git stash` the edit, re-census pristine HEAD, see if
  the delta persists. I did that; pristine read **exactly +0** on `pop`/`towerHt`/`solarRoofs` while my
  edit read `−3/−1/+2`. By that recipe my change was guilty. It was not: **re-running the census on
  the unchanged edited file gave `+6/+1/+0`** — the same metrics moving the *other* way. `pop` and
  `towerHt` read `c.h`, which **grows at draw time** (iter 98), and `solarRoofs` quantizes a salt off
  the float `year` (iter 97) — all three are functions of *how many frames rendered* in the census's
  500ms settle, i.e. of machine load. The pristine run's `+0` was luck: it happened to match the load
  under which the baseline was captured. **The control for a noisy metric is running the SAME code
  twice, not one run of each.** Compare the perf gate's rule (three passes, take the minimum) — the
  census needs the same discipline on its three draw-time metrics, and only on those.
- **The stream-neutrality proof is a PARTITION, not a zero.** A draw-only change does not produce
  "all +0"; it produces **+0 on every metric derived from `tick()`** and noise on exactly the three
  derived from frame count. Reading the census as one number hides this. The partition is the proof:
  an empty tile histogram plus 17 exact zeros says the seeded stream never moved, whatever `pop` does.
- **⚠ SKY & ATMOSPHERE IS ADDITIVELY SATURATED, AND ITS EMPTY `New CA rule` CELL IS A TRAP.** The
  rotation bullet sent me to Sky. Before designing anything I grepped the seams, and found Sky is the
  most densely built domain in the artifact — most of it **unrecorded by this ledger** (step 1's law:
  the ledger is the loop's memory, *not the artifact's inventory*). Already there: a full **marine
  layer** (`fogDepth`/`fogAt`/`FOGR`/`rSea`, with a `reachFill` distance field off every wet cell, a
  dawn clock *and* a seeded multi-day fog spell), showers, clouds, stars, a moon, a **shooting star**,
  a seeded **`WINDA` gust field** that the washing lines flap to — and a **sweeping lighthouse beam**.
  I nearly shipped, in order: sea fog (exists), a unified wind (exists), and a lighthouse beam
  (exists — the tooltip has promised "sweeps the bay at night" all along, and it delivers). **Sky's
  `New CA rule` cell is empty because sky is not cellular** — its state lives in screen space and in
  time, not on the hex grid; the one grid-shaped sky idea (fog pooling on terrain) was already taken
  by `rSea`. Do not treat that empty cell as an invitation. Sky's remaining kinds are **Deepen /
  Polish / Interaction**, same as Water and Nature.
- **Rotation is a tiebreaker, not a mandate.** Three of seven domains (Nature, Water, Sky) are now
  measured-saturated on additive kinds, so "stalest domain" increasingly points at places with nothing
  cheap left to add, while a *specified, measured, invariant-breaking bug* sat open in the hottest
  domain. The bug won. When the rotation bullet and an open cue disagree, **prefer the cue that comes
  with a number attached** — and log the survey that made you turn back, because that survey is the
  expensive part and it is exactly what the next fresh process cannot re-derive cheaply.

## Iteration 104 — the crowds find the shopfronts (2026-07-10)

**Vector** — People & activity × **Deepen**. Rotation pointed here on both axes at once: People was
the stalest domain (last vector 93) and Deepen the coldest kind (last at 95), with 103 warning off
Polish. No cue was open on People, so this is a seam-led vector, not a cue-led one.

**The seam.** `PEDDEST` — a Set literally named "pedestrian destinations" (shops, markets, plazas,
institutions, greens) — existed for one purpose: `kerbDir` used it to decide which way a ped standing
on a kerb turned to **face**. No resident had ever *walked* toward one. Peds random-walked over open
ground, re-anchoring wherever they landed. The city had a notion of what its people wanted and never
let them go and get it.

**Change.** Two edits, ~35 lines.
- **`c.buzz`, a new derived field** (`tick()`, beside the bus-stop pass): `ATTRACT.has(c.t)?2:0` plus
  a count of `ATTRACT` neighbours, where `ATTRACT = {COM, MARKET, CIVIC, STADIUM, PLAZA}`. Pure
  terrain derivation — no `rng()`, no terrain change — recomputed each tick as shopfronts open.
  Generalizes the `cafes` stat (a park hex facing a shop) from one tile type to the whole plate.
- **`stepPed` climbs it.** Among the neighbours a ped may *legally* enter, it now picks one with
  weight `1+BUZZW*buzz` (biased, not routed — nobody pathfinds). Two terms then hold it there: on a
  lively hex it re-decides more slowly (`BUZZDWELL`) and steps on less often (`BUZZSTILL`). That is
  what turns a market or a parade of shopfronts into a *standing crowd* rather than a place peds
  merely pass through. `BUZZMAX=3, BUZZW=1.6, BUZZSTILL=0.55, BUZZDWELL=1.3`.
- **The `legal/6` factor is load-bearing.** See the finding below — without it the tuned street
  occupancy blows out.
- **Dogs came along for free.** A leashed dog rides its owner's hex (iter 93), so residents now walk
  their dogs to the shops with no code at all.

**Census — PASS**, and provably stream-neutral by iter 103's **partition**: **every tick-derived
metric is exactly +0** and the **tile histogram is empty** (`parks`, `towers`, `roads`, `developed`,
`bridges`, `tileKinds`, `civicKinds`, `transportModes`, `solarRoofs`, `greenRoofs`, `towerHt`,
`tallTowers`, `helipads`, `boulevardTrees`, `avenues`, `arterials`, `promenade`, `stations`, `cafes`,
`schools`, `stadiums`). Only `pop` moved: **+3 of 150,206** (0.002%), the frame-count metric. 0 page
errors. The buzz pass reads terrain and writes only `c.buzz`; `stepPed` draws only `Math.random()`.

**Probe.** `probe-buzz.mjs` (`git add -f`'d). Re-implements HEAD's `stepPed` as `stepOld` and runs
**both policies on one page load from the same ped snapshot**, stepped a **fixed number of steps**
(not a fixed wall time), so machine load cannot skew it. Both policies run **twice** and are averaged
— the control is stochastic (see findings). Time-averaged over 3 seeds, era 2035:

| | before | after | |
| --- | --- | --- | --- |
| street occupancy, kerbs **fronting a shop** | 8.5% | **14.0%** | **+64%** |
| street occupancy, **dull lanes** | 10.3% | **8.1%** | **−22%** (down on all 3 seeds) |
| peds with an attraction in their ring | 16.7% | **26.2%** | **+57%** |
| mean `c.buzz` of the hex a ped stands on | 0.22 | **0.39** | **+74%** |
| street occupancy, **total** | 18.8% | 22.0% | *noise — see findings* |

**Visual — PASS, 2/2.** Seeds 42 and 7, **before/after pairs** at `warp=61&t=0.3&step=300` (`__step`
runs `advanceEntities`, so the crowd gets 300 sim-seconds to settle — a static shot of a
*distribution* change is meaningless without it). Zoomed `--shots downtown` per iter 93's law that
entity-vs-entity vectors are invisible wide, plus un-zoomed wide frames. One agent per seed, told not
to enhance. Both independently reported denser knots on the market rows, the plaza/civic dome, and
shop-fronted kerbs, with **emptier park interiors and residential lanes** — i.e. they described
`st:dull −22%` without being told it existed. Both found no z-order tears, no floating tiles, no
figures on rooftops or water, no blown-out colour. Both confirmed the wide frames were otherwise
**pixel-identical**, reading the whole HUD stat bar unchanged (seed 7: `2035 · 35,200 · 71 · 64 · 179
· 33 · 18 · 49% · 56% · 37%`) — the visual corroboration of the census's stream-neutrality claim.

**Perf — PASS, and the gate is lying by +5.5%.** 3 sequential passes: day 33.16/33.11/33.17ms,
night ~37.3ms — a **stable** offset (no rising trend), which by iter 99's rule means code, not load.
So I ran iter 99's stash-control on **pristine HEAD** under the same load: day **33.00/33.06/34.17ms**.
Taking the minimum of each, **this vector costs +0.11ms (+0.3%)**; the other +5.3% is a **stale
baseline** pinned 2026-07-09, before iters 100–103 landed. Logged in the header rather than silently
re-pinned — `polish-tile` owns that file.

**Verdict: SHIPPED.**

### Findings

- **⚠ THE PLAUSIBLE NAME WAS THE WRONG LIST — and it made the feature actively worse.** The first
  build counted `PEDDEST` neighbours. The probe read street occupancy **18.3%→15.4%**: it *drained*
  the streets. `PEDDEST` is mostly the open ground the ped is standing on, and **parks are large and
  adjacent to themselves**, so a park *interior* outscored a kerb outside a row of shops — the field's
  argmax was the middle of a lawn, and the walk dutifully climbed to it. The two questions look
  identical and are not: `kerbDir` asks *"what do I turn to face"* (a park, correctly); an attraction
  field asks *"what do I cross a block to reach"*. `ATTRACT` is the second list, and it works
  precisely **because most of it cannot be stood on** — a building can only ever raise the buzz of the
  ground around it, which is the café edge and the shopfront kerb where a crowd belongs. **Check what
  a Set's existing call sites ask of it before reusing it; the name is not the specification.** The
  probe caught this in one run, before any screenshot.
- **⚠ WHEN A METRIC IS TOO NOISY TO GRADE A VECTOR, PARTITION IT — DON'T AVERAGE IT HARDER.** Street
  occupancy is stochastic (130 peds × `Math.random`): `stepOld` read **21.4%** and **17.4%** on
  identical bytes and the same seed, a **3.0–5.3 point** control spread — wider than this change's
  whole aggregate effect (+3.2). The total could neither convict nor acquit. Splitting it along the
  *mechanism I was claiming* dissolved the problem: shopfront kerbs **+64%**, dull lanes **−22%**,
  both sign-consistent across all three seeds. The scary aggregate ("streets 19%→22%, you flooded
  them") and the true result ("peds left the lanes for the shops") are the same number. This extends
  iter 103's law — *run the same code twice* — from **machine-load** noise to **sampling** noise, and
  `probe-buzz.mjs` now runs each policy twice by default and prints the control spread with the
  warning that a smaller delta is not a result.
- **A random walk can be biased without changing how often it moves.** `stepPed` used reject
  sampling: draw 1 of 6 directions blind, stay put if it's a wall. So `P(move) = step·(legal/6)`,
  quietly. The obvious way to add a bias — pick from the *legal* set — makes every ped move 2–3×
  more and would have blown the occupancy the PEDLEASH comment says was tuned by measurement
  (0.45→14%, 0.15→28%). Multiplying the step roll by `legal/6` restores the original marginal
  **exactly**, so the field changes only **where** peds go, never **how often**. Compare iter 98's
  law (express a vector as a *property* of a thing, not a *decision* about which things exist): here
  the same discipline applied to a *rate* is what let a behaviour change stay provably neutral.
- **A stale perf baseline spends the next iteration's budget.** The gate read +5.7% day for a change
  that costs +0.11ms, because pristine HEAD already reads +5.3% against a baseline pinned four
  iterations ago. A gate that has drifted a third of the way to its own threshold will eventually
  fail on innocent code, and then nobody will trust it (the hexagon-plate lesson, arrived at from the
  other direction — that one left the baseline stale by *scaling the plate*; this one left it stale by
  simple accumulation). **Control against pristine HEAD, not against the baseline file** — a stable
  offset means code, but it may be *earlier iterations'* code.
- **The interconnect was free where the ledger promised it would be.** Iter 93 established that a
  leashed dog rides its owner's hex and inherits `pedWalk`'s legality. Nothing in this vector mentions
  dogs, and residents now walk them to the shops. That is the payoff of the Deepen kind, and the
  reason the header calls it the highest-yield move: the third and fourth systems come for free once
  two are wired together.

## Iteration 105 — the lines name themselves (2026-07-10) [holistic step-back]

**Vector** — Transport × **Interaction/UX**. Rotation pointed at both axes at once: Transport was the
stalest domain (last vector 94) and its `Interaction/UX` cell was **empty**, while 104 warned off
Deepen and 103 off Polish. The cell was empty for a reason worth recording — see the seam.

**The seam.** `ENTINFO` — the hover surface — carried streetcars, trucks, cyclists, ferries, whales,
dogs. It did **not** carry the **monorail trains** or the **cable-car cabins**. Nor did `TILELABEL`
carry the guideway or the cable. So the city's two flagship transit systems, the ones U4 went to the
trouble of making *plural*, were the only moving things in Solvista that **could not be named by
pointing at them.** And nothing anywhere could answer the question those systems actually raise: a
183-span loop leaves the frame — *where does it go?* Extent is the one property of a transit line you
cannot read off any single hex.

**Change.** Draw-only, ~45 lines, three edits.
- **Two `ENTINFO` rows**, with flattening getters (`monos.flatMap(m=>m.closed?m.trains:[])`,
  gondolas likewise gated on `path.length>1`, so a line that hasn't broken ground yields no cabins).
- **`sub` may now be a function.** `consider()` resolves `typeof sub==='function'?sub(e):sub`, so a car
  describes **the line it belongs to** rather than its species: *"Line 3 of 3 — a 183-span loop with 30
  stations."* / *"An aerial line — 9 spans over the low-rise strip."* Counts are read live off
  `m.path`/`m.stops`, never stored. A `plur()` helper handles the stubby lines that really occur.
- **The route trace.** Hovering a train or cabin strokes its whole line, drawn last (beside the
  copters, the existing "over the scene" precedent): monorail along the beam deck and closed onto its
  tail; cable **sub-sampled 4× per span through `gondSag`** so the trace lies on the rope's catenary
  rather than its chord. Station pips at `m.stops`; terminal pips at the cable's two ends. `stamp()` on
  the **middle** car — so the pick point is the train's center, not its nose — buys the focus ring free.

**Census — PASS, and stream-neutral by iter 103's partition.** **Every metric +0**, including `pop`
(150,206 → 150,206), and the **tile histogram is empty**. 0 page errors. The vector draws no `rng()`,
touches no terrain, adds no entity array — so `__census()` needed no new tally, per the
census-sprawl rule. Nothing to add, nothing added.

**Visual — PASS, 3/3 agents.** Full-frame **hover-vs-control pairs** at seeds 7 and 42, both systems.
Two agents (one per seed) independently confirmed: no trace in the control, trace on hover, routes
locked to the hex axes, pips on the line, no z-order tears, and — the step-back's cumulative question
— the city still reads balanced and bright, coast and downtown clean. **Both then volunteered the same
complaint unprompted:** the trace "reads as a dark line with a faint pale seam." Fixed by iter 101's
law and re-verified by a third agent (below).

**Perf — PASS, and the baseline is re-pinned.** 3 sequential passes, day 33.28/33.22/33.39ms. Against
iter 104's pristine-HEAD control (min 33.00ms) this vector costs **+0.22ms (+0.7%)** — and costs
*nothing* headless, since `hoverEnt` is null with no cursor and the trace block never runs. The gate's
+6% was the stale 2026-07-09 baseline the header flagged. **This step-back re-pinned it**
(`perf.mjs --save-baseline` → day **33.16ms**, night **37.33ms**), closing that warning.

**Verdict: SHIPPED.**

### Findings

- **⚠ A "LINEAR FEATURE" POLISH LAW JUST GOT ITS SECOND CONFIRMATION — and two agents found it before
  I did.** The trace shipped as a 2.8px ink halo (α.40) under a 1.2px cream core. Both visual agents,
  independently, reported the line read *dark*. That is exactly iter 101: **for a linear feature,
  legibility ≈ contrast × WIDTH** — the halo was 2.3× the width of the thing it was backing, so the
  halo *was* the line. Fixed by inverting the ratio's intent, not the colors: halo to 3.4px @ α**.34**
  (softer, wider) and the **core to 1.9px @ α.74–.92**. A third agent confirmed C-vs-A now reads as
  "a pale cream ribbon with a dark backing" and that nothing was smothered. **When two independent
  reviewers volunteer the same unrequested complaint, that is data, not taste** — spend the extra
  agent.
- **A MOVING ENTITY CANNOT BE HOVER-TESTED FROM STALE COORDS.** The first probe hovered a *Street* on
  both seeds and looked like a total feature failure. Two causes, both in the probe: (1) `__ents`
  returns **screen** coords (`e._sx*scale+offX`) — `e._sx` alone is **world**, and I'd used it; (2)
  trains and cabins *move*, so coords sampled before the control screenshot are ~1s stale by the time
  the cursor arrives. The fix is the general one for any hover test on a moving target: **re-sample,
  move, then VERIFY the tooltip title equals the entity name, and retry on fresh coords** (8 tries).
  Do not screenshot a hover you have not confirmed landed — a missed hover and a broken feature
  produce the identical frame.
- **`sub`-as-a-function is the reusable half of this vector.** Any future entity whose interest is its
  *membership* (a ferry's route, a truck's depot, a bus's line) can now describe itself from live
  state with no new mechanism — one `typeof` check in `consider()` bought it. Static strings still work
  unchanged; nothing else in `ENTINFO` moved.
- **The empty grid cell was empty because the tooltip is `ENTINFO`-shaped.** Transport's Interaction/UX
  cell stayed cold for 100 iterations not because transit was uninteresting but because the two systems
  worth interrogating were **not entities in any array the hover surface walked** — they are nested
  inside `monos[].trains` / `gonds[].cabins`. **A cold rotation cell can mark a structural gap, not a
  lack of ideas.** Worth checking, next time a cell resists.
- **`probe-lineshot.mjs` is `git add -f`'d** (per iter 101: `probe-*.mjs` is gitignored, so ledgers that
  say "reuse the probe" cite tools the repo doesn't carry). It shoots full-frame hover/control pairs
  with the verify-retry loop above; `--longest` picks a car on the line with the most spans, because
  a stubby 2-span loop proves nothing about a trace.
- **Stubby lines are real.** Seed 7's three loops are 89, **2**, and 183 spans; a 2-span "loop" would
  have rendered *"1 stations"*. `plur()` exists for that. A closed monorail loop is **not** guaranteed
  to reach `minLen` — `homing` closes it early — so never assume a generated line is large.

## Iteration 106 — the harbor gets its arm (2026-07-10)

**Vector** — Water & coast × **New element**. Water was the stalest safe domain (last vector 97; Sky
is staler but 103 surveyed it as additively saturated and its empty CA cell as a trap). I passed on
Water's three cold *kinds* and should say why: **Connect** in this domain means a corridor, and iter
101's law kills 1-hex corridors; **New CA rule** would have been a sediment/accretion pass, which is
the same shape as iter 90's dunes; **Scale** is a structural lever, not a lap move.

**The seam.** `genWorld` sites harbor works — three `IND` warehouses on the coast highway at
`harborY` — and then anchors a container ship off them, with the comment *"rides at anchor in the
roadstead, **waiting on a berth**"*. There was no berth, and no shelter: the city's shipping lay in
open swell. A harbor is the one coastal structure Solvista named in its own source and never built.

**Change.** Draw-only, ~40 lines. The pier and the wind turbines showed the pattern: a structure in
the sea need not be a *tile*. `moleSet` (a `Map` keyed by `idx`) is laid in `genWorld` after the
turbines — straight seaward along a hex row for 6–8 cells from the first ocean cell of the row, then
hooking 3–4 cells across the harbor mouth on a SE/SW diagonal (`dx = y&1`, never a square column) —
and `case T.WATER` draws it. Rooted on the side of `harborY` the pier is *not* on; `hashCell` for
length and side, **no `rng()`**. A dark wet-stone mound under a pale cap walk, armour blocks tumbled
at the foot, surf breaking along the front, and a white **harbor light** with a red lamp at the head.
`Breakwater` / `Harbor light` added to the hover surface (it is drawn *over* the ocean, so like the
pier it must be named before the tile under it). New palette pair `stone`/`stoneDk`.

**Census — PASS.** `pop` **+0** (150,208), `roads`/`developed`/`towers`/all others **+0**, 0 page
errors. Tile histogram: **KELP 108→105, WATER +3** — the mole's root cells are beach-adjacent, which
is exactly where kelp seeds, so the kelp pass now skips `moleSet` (nothing takes root under rubble).
That is the vector's only terrain touch and the only intended histogram move. No new census metric:
no tile type, no entity array, so `__census()` needed nothing (census-sprawl rule).

**Shape probe — 16 seeds.** `probe-mole.mjs` (**`git add -f`'d**) checks every consecutive pair of
mole cells is a true hex neighbour, that the root's west neighbour is `BEACH`, that there is exactly
one head, and that the anchored freighter's `seaXFr` lands inside the arm. **16/16 contiguous,
16/16 rooted on sand, 12/16 ship-inside** (the other 4 are short arms that never reach the ship's
row, so the test is undefined, not failed). Both defects below were caught by it or by a zoom.

**Visual — PASS, 2/2 agents**, after one **FAIL** and a fix (below). Tight clips on the mole (day +
night) plus un-zoomed whole-city frames at seeds 7 and 42. Both agents: arm touches the sand, reads
as one unbroken run, no z-order tears, harbor light present, red lamp lit at night, and the whole
frame still reads balanced and bright with a clean coastline.

**Verdict: SHIPPED.**

### Findings

- **⚠ A STRUCTURE'S TONE MUST SEPARATE FROM EVERY SURFACE IT CROSSES — not just the one you pictured
  it on.** The mole first drew in `whiteDk`, copied from `ROCK`'s granite. `ROCK` sits on **grass**;
  the mole spans **sand then sea**. `whiteDk` (lum 220) against `sand` (221) is invisible, so the arm
  dissolved into the beach and appeared to *begin* where it reached blue water — the seed-7 agent
  failed it as **"floats detached in open water, not thrown out from shore."** It was attached the
  whole time; `probe-mole.mjs` proved the root cell abutted `BEACH`. The bug was tonal, not
  geometric. Fixed with a `stone`/`stoneDk` pair (lum **122/92**) chosen to clear **both** backgrounds
  — sea 155, sand 221 — plus a pale cap walk for internal contrast. This is the third law in the
  family after iter 100 (ornament averages into tone) and 101 (contrast × width): **check a new
  element's tone against every background it will actually cross, and if it spans two, it must clear
  both.** A palette name that reads beautifully in one biome is not a palette choice.
- **⚠ AN AGENT REPORTING A GEOMETRIC DEFECT MAY BE REPORTING A TONAL ONE.** "Detached", "floating",
  "not connected" is what *invisible* looks like from the outside. Before you rewrite the geometry,
  **measure it** — the probe took 3 minutes and no tokens, and said the geometry was already right.
  Had I trusted the verdict's literal words I would have moved the root inland and broken it.
- **A PATH BUILT BY "ADVANCE, THEN TEST" SKIPS A CELL AT EVERY JOINT.** The straight run ended with
  `path.push([x,y]); x++` — leaving `x` one **past** the last cell laid — and the hook then added its
  own `dx` on top of that. Seeds 5 and 99 laid arms with a one-cell hole (`[56,27]→[58,26]`); seeds 7
  and 42 were saved only by row parity making `dx=0`, so the two seeds I was watching looked perfect.
  **Keep the cursor on the last cell you laid, and test each step before taking it.** Any future
  multi-segment path (a jetty, a causeway, a spit) has this trap, and it hides behind parity.
- **The pier/turbine pattern is the cheapest way to build in the sea.** A `Map` keyed by `idx`, laid
  in `genWorld` with `hashCell` only, drawn from `case T.WATER`, named in `describeTile` before the
  tile under it. No tile type, no entity array, no `rng()` draw — `pop` came back **exactly +0**.
  Reach for it before adding a `T.*` constant. (It is not *quite* stream-neutral here only because
  the kelp guard changes 3 cells; a structure that avoids beach-adjacent water would be exactly 0.)
- **`shoreAt(y)` is the first ocean cell of the row** (`x>=sh` → WATER, `sh-3..sh-1` → BEACH), so it
  is the right root for anything thrown out from the beach — but **guard the river mouth**: seed 3
  rooted on `riv` water until `rootOK` required `BEACH` at the root's back. The pier's own `rivRow`
  check exists for the same reason. Sand at your back is the cheap test for "am I on the coast".

## Iteration 107 — the market square was never built (2026-07-10)

**Vector** — Civic & culture × **New CA rule**. Rotation named both axes: Civic was the stalest domain
(last vector 100) and the recent kinds were New element / Polish / Deepen / Interaction / New element,
so `New CA rule` was among the three coldest. This is a *rewrite* of an existing pass, not a fresh one
— which is what the domain needed, because the pass it rewrites had never once fired.

**The seam.** `T.MARKET` is a fully-built tile: cream paving, three striped stalls, string lights after
dark, a `POPW` of 14, membership in `DEV`, `ATTRACT` and `PEDDEST`, and its own triple weight in
`openCells` so crowds gather on it. `TILELABEL` names it, `TILEDESC` describes it. **The census has
read `MARKET: 0` in every seed and era for the artifact's entire recorded life** (0–3 over the 9-cell
matrix, i.e. ~0 per city; the stragglers come from the *other*, IND→market-hall rule). Nobody has ever
seen this tile.

Its siting rule (L1106) read `COM && countAround(...,1,COM)>=3 && greenNear`. **It is not mistuned; it
is unreachable.** The upgrade pass 40 lines above takes any inland `COM` at **2** COM-or-TOWER
neighbours, and by iter 98's saturation arithmetic (~60 samples/cell) that test fires with probability
≈1. A shop is towered long before a third shop can gather beside it. The market's precondition was
strictly *harder* than the tower's, on the same host, in a race it always lost. Measured on 6 seeds at
2035 (`probe-market.mjs`): **COM 202–228/city, COM with ≥3 COM neighbours = 0. On every seed.**

**Change.** ~10 lines. A market is not a shop — it is the open ground the shops grew around. Host is
now `PARK` with `buzz>=2` (the iter-104 `ATTRACT` field: on standable ground it *is* the count of
adjacent attractions, so `buzz>=2` reads "enclosed on two sides by things worth walking to" — no
hand-rolled second field), plus `roadNear`, a spacing guard, and `hashCell` eligibility. The pass keeps
its `ks(6)` `rc()` picks and adds **no `rng()` draw of its own**.

**Census — PASS.** `MARKET` **0 → 12** across the matrix; every seed now grows **1–5** markets by 2035,
none before 1992. `PARK` 1205→**1222** and `parks` +20 — the squares did not cost the city its greens.
`pop` +3.1%, `towers` +18. **The pop number is not growth and I am not claiming it** — see below.

**Visual — PASS, 2/2 agents.** Magnified clips (day, seed 42; night, seed 7) + un-zoomed whole-city
frames. Both: the square reads as cream paving with striped stalls, sits flush on a hex face beside
park and shopfronts, string lights render as discrete warm dots and not blown-out blobs, no z-order
tears, and the whole frame still reads as a balanced coastal city. Correctly *subtle* at fit zoom.

**Verdict: SHIPPED.**

### Findings

- **⚠ A RULE CAN BE DEAD BECAUSE ANOTHER RULE'S PRECONDITION IS STRICTLY WEAKER ON THE SAME HOST.**
  The market wanted `COM` with 3 COM neighbours; the tower rule takes `COM` at 2, and saturates. Every
  cell that ever approached the market's condition had already been converted. **Before tuning a rule
  that never fires, look for an earlier pass on the same host with a weaker test** — the rule is not
  mistuned, it is unreachable, and no amount of probability tweaking will reach it. `probe-market.mjs`
  (**`git add -f`'d**) is the general instrument: it counts survivors of *each successive conjunct* of
  a rule's predicate, so the starving clause names itself. It took one run to find a dead rule that had
  survived 106 iterations.
- **⚠ THE NO-OP CONTROL — the terrain analogue of iter 97's stash control, and this iteration's most
  reusable finding.** To learn what your rule's *terrain writes* did, run the rule with the write
  removed (`c.t=T.MARKET;…` → `void 0`) and census that. Same predicate, same picks, **zero cells
  changed**. It should read `+0` everywhere. It did **not**: `pop` −0.3%, `EMPTY` +30, and **`FIELD`
  20→14** with nothing built. Cause: the old dead rule's trailing `rng()<0.3` *did* fire in the
  1992–96 window, before the tower rule (`year>=1996`) began eating clustered shops — so **deleting a
  dead rule's draw is itself a stream perturbation.** A rule that never changes terrain can still be
  load-bearing on the stream. Without this control I would have shipped `FIELD −9` as a market-caused
  regression and "fixed" it wrongly (I tried: see below).
- **⚠ CHOOSE A CA RULE'S HOST TILE BY WHICH PASSES GATE `rng()` ON IT, NOT BY SCENERY.** `T.EMPTY` is
  the host of ~8 other `rng()`-gated passes (farms, industry, forest succession, gardens, the civic lot
  search); consuming an empty lot deletes every conditional draw those passes would have rolled there.
  `T.PARK` gates none. Same rule, same ~2 markets/city, only the host differs:
  **EMPTY → `pop` +4.6% on one salt and −5.8% on another** (the second is a `COLLAPSE` hard-fail);
  **PARK → +4.2 / −0.8 / −2.4 across three salts, all passing.** Hosting on a stream-quiet tile halved
  the chaos amplitude. This is a *design* lever nobody had named.
- **⚠ A `hashCell` SALT IS A FREE PARAMETER THAT CAN SWING A CORE METRIC BY 10 POINTS. NEVER PICK IT
  AFTER SEEING THE CENSUS.** Three salts, identical rule: `pop` +4.6% / −5.8% (EMPTY host). One ships,
  one hard-fails, and *nothing about the city is different*. I shipped `0x4A17` because it is the
  constant I typed **before running anything**, and I am reporting all three deltas rather than the
  flattering one. The corollary for every future terrain vector: **the pop delta on a chaotic CA is a
  property of the salt, not of the feature.** The growth signal is the tile histogram — here, a tile
  that went from *nonexistent in the artifact's whole life* to 1–5 per city.
- **The `hashCell` probability is a stream-free tuning lever.** Coverage was raised 0.5→0.72 (every seed
  gets ≥1 market; seed 3 had 0 at 0.5) with **zero** effect on the `rng()` stream, because `hashCell`
  makes no draw. Tune eligibility freely; never tune an `rng()<p` for the same purpose (iter 98).
- **Two hypotheses, both measured, both WRONG — recorded so nobody re-tries them.** (i) *"Markets eat
  the pocket parks that ball fields need"* — fields site on `EMPTY` with `PARK within 2` and do not
  recognize `MARKET`, so this was plausible. I added a "take only a *corner* of a green" clause
  (`>=1 PARK neighbour`). It **did not move `FIELD` at all** (still 11) and starved markets to zero on
  three of eight seeds. Reverted. (ii) *"`FIELD`'s drop is salt-noise"* — it is not salt-noise either
  (−9 / −6 / −9 across three salts, sign-stable). The no-op control settled it: `FIELD` is a tiny
  metric (n=20 over nine cities) that moves with **any** stream shift, including one that changes no
  terrain. **When two opposed theories both survive the aggregate, the aggregate is not the instrument
  — build the control that holds one variable at exactly zero.**
- **`c.buzz` reused exactly as iter 104 invited.** "Somewhere worth standing" was already computed,
  already free of `rng()`, already recomputed each tick. A market square is the argmax of that field on
  open ground. No new field, no new census metric (census-sprawl rule: `MARKET` was already tallied in
  the tile histogram, and the vector adds no tile type and no entity array).

## Iteration 108 — the fields keep the calendar (2026-07-10)

**Vector** — Nature × **Deepen / interconnect**. Rotation named the domain: Sky (95) is staler but
additively saturated and its `New CA rule` cell is a documented trap, so Nature (102) was the
next-stalest safe pick. Kind was chosen against the two most recent (New element, New CA rule), and
`Deepen` is the skill's stated highest-yield move once a domain has its basics — Nature has had its
basics since iter 60. The interconnect is Nature × **Sky**: the fields now read `applySeason`'s
calendar. Draw-only by construction, so `pop` could not move.

**The seam.** `applySeason()` (L293) drives `grass`, `grassDk`, `meadow`, `canopy`, `canopyLt` through
the year — the hills go gold at `s≈0.62`, deciduous canopies amber at `s≈0.87`, evergreens sit it out.
**`T.FARM` was not in that list.** Its draw case painted a soil hex and three crop rows in one of three
*static* colors picked from `c.v` (`sage`/`gold`/`meadow`), at a fixed `lineWidth` of 2.1. So the wild
grass around a farm went gold in August while the cultivated field — the most seasonal surface in any
real landscape — did not change all year. Orchards already keep the calendar (iter 57's grove); the
farmland, which outnumbers them, never did.

**Change.** ~20 lines, all in `drawCell`'s `case T.FARM` plus one helper pair. Each field derives a
phase `ph` from the calendar `s=year%1`, offset by up to ±5 weeks from `c.v`, and runs a chain:
ploughed `soilDk` → `sprout` → the crop's own color → `straw` → cut `stubble` → ploughed under. Both
ends of the chain are `soilDk`, so it is continuous across the new year *and* winter rows read as dark
furrows on the lighter soil hex. `veg` swells `lineWidth` 0.9→2.4, so the rows are furrows in winter
and heavy growth at midsummer. Fruit dots (the `v>0.66` variety) now appear **only** in the weeks
before the cut. Four palette entries added (`sprout`/`crop`/`straw`/`stubble`); `applySeason` must not
touch them or the two would double-count — which is why the third crop variety moved off `meadow`
(season-driven) onto a dedicated `crop`. No terrain, no `rng()`, no `hashCell`, no new tile type.

**The ground carries the year, not just the rows.** First pass modulated only the rows and the two
visual agents *disagreed about which frame was greenest* — the tell that the effect was under-powered.
Three ~2px rows are a thin ornament on a wide hex, so the tile's mean tone at city zoom is the
**ground** (iter 100's law, and the reason iter 101's one-hex greenway failed). Fixed by blending 34%
of the crop color into the soil hex. That is the whole difference between "visible if you lean in" and
"the belt turns with the year".

**Census — PASS.** `pop 154915 → 154918 (+3)`, `roads/developed/parks/towers +0`, **tile histogram
completely empty** — as a draw-only vector must be. The residual ±3 is *not* mine: see the finding
below; identical pristine code recaptures at ±3 too.

**Probe — the year moves the belt, and the belt is a patchwork.** `probe-farmtone.mjs` samples real
canvas pixels at every `__find('FARM')` centre. Mean farm luminance, seed 42 / seed 7:
Jan **112.9 / 107.4** → Apr **147.7 / 148.2** → Aug **160.8 / 159.8** → Nov **137.3 / 140.7**.
A **48-point** luminance swing, against the ledger's own ΔL 7–11 reference for "obviously
distinguishable". Hue (G−R) is `−20 → −2 → −26 → −25`: April is the only green frame, August the
golden one, exactly as designed. Field-to-field spread is **±21.4 in January and ±18.7 in November,
but only ±9–11 at midsummer** — the stagger is most visible where the chain is steepest (ploughing,
cutting) and least where every field is simply mature. That is the patchwork, measured.

**Perf — PASS.** 3 sequential runs, judged by the minimum of each scene: day **33.22ms** (+0.2% vs the
iter-105 baseline 33.16ms), night **37.61ms** (+0.8% vs 37.33ms). The two uncached `rgb()` strings per
farm per frame (~150 farms) cost nothing measurable. Baseline **not** re-pinned — `polish-tile` owns it
and there is nothing to re-pin.

**Visual — PASS, 2/2 agents, on the strengthened version.** Four frames × two seeds, un-zoomed whole
city. Both: no blow-out or neon, the rows still read as distinct lines against the tinted ground, no
z-order tears or floating tiles anywhere in the frame, January reads as *ploughed farmland* rather than
mud or scarring, and all four frames still read as a balanced coastal city. (One agent inverted
brightest/darkest — see the finding; it does not affect the gate, which is about damage, not ordering.)

**Verdict: SHIPPED.**

### Findings

- **⚠ THE CENSUS IS LOAD-DEPENDENT, AND "CHAOTIC-CA NOISE" HAS BEEN COVERING FOR IT.** A draw-only
  vector — no `rng()`, no terrain, an empty tile histogram — still printed `solarRoofs −3`. The
  invariant the ledger reaches for ("terrain-gated `rng()` reshuffling") **logically cannot apply**.
  Cause: `frame()` advances `year` off real elapsed time and keeps ticking while Playwright drives the
  page; `c.solar`/`c.groof` salt their `hashCell` on `(year*23)|0` / `(year*31)|0`, so milliseconds of
  machine load flip roofs, and an extra `tick()` moves `pop`. **Two captures of identical pristine code:
  `pop` 154915 vs 154918, `solarRoofs` 1474 vs 1471.** The instrument's floor is ±3, not 0. Corollary
  that cost me twenty minutes: **running your edited code twice proves only that the edited side is
  deterministic.** To attribute a small delta you must re-capture the **baseline**. Freezing the sim
  before `__census()` would remove the floor entirely and sharpen every future gate — an open vector.
- **⚠ `git stash` IS A CONTAMINATED CONTROL HERE, AND IT CAN EAT YOUR ITERATION.** `census-baseline.json`
  is tracked and `--save-baseline` dirties it, so `git stash` silently reverts your fresh baseline to
  the last committed one. My "pristine control" printed `pop +4712` and read like a catastrophe; it was
  pristine code scored against **iter 107's** matrix. Read the absolute latest column, never the delta,
  when the stash control runs. Then `git stash pop` **refused** — `census-history.jsonl` had been
  appended to by the control run — and left the whole iteration sitting in the stash. Recovery:
  `git checkout -- .claude/skills/grow-city/census-history.jsonl && git stash pop`. The no-op control
  (iter 107) does not have this failure mode; prefer it when the question is about terrain writes.
- **⚠ AGENTS GRADE DAMAGE WELL AND ORDERINGS BADLY — MEASURE THE ORDERING.** Both seeds' agents agreed
  perfectly on every *defect* question (no tears, no blow-out, rows legible, city coherent) across two
  rounds. Asked *"which frame is brightest"*, one answered "August, deep chocolate-brown, darkest" —
  twice, confidently — while the probe puts August at **lum 160.8** and January at **112.9**. It was
  reading the wrong hexes. The first round's disagreement about *which frame was greenest* is what told
  me the effect was under-powered and sent me to strengthen the ground, so **a disagreement between
  agents is signal even when both say PASS**. But never resolve it with a third agent: `__find(TILE)` →
  `getImageData` → mean RGB + spread is one command and it is dispositive. `probe-farmtone.mjs` is
  `git add -f`'d (per iter 101, `.gitignore` eats `probe-*.mjs`), and its **spread** column is the
  reusable half — it measures *variation across instances*, which is how you prove a patchwork rather
  than a mere change.
- **AN UNREACHABLE TEST HOOK IS THE SAME DEFECT AS AN UNREACHABLE RULE (iter 107's shape, in the
  harness).** `window.__setYear` has existed since the seasons landed, commented *"pin the calendar
  (seasons) for tests"*, and was **never wired into the URL block** — while `?t=`, `?warp=`, `?step=`
  and `?flood=` all were. Consequence: `?warp=61` from `year=1974` always lands near 2035.0, so **every
  screenshot in this loop's entire history was taken in January**, and nobody could have seen a seasonal
  farm even if one had existed. One line added. Iter 107 found a rule nobody could reach; this is a hook
  nobody could reach. **Grep the URL block before assuming a hook you can see is a hook you can use.**
- **DEAD-RULE TRIAGE: divide 107's candidate list by *why* the tile reads 0.** `GARDEN` is gated
  `year>=2008` and the matrix's eras are 1985/2005/2035 — it is 0 in two of three eras **by
  construction** (~2 per 2035 city). `BURNT` reverts to `EMPTY` at `age>6` — a **transient** a snapshot
  will nearly always miss. Neither is dead; neither should be "fixed". **An era-averaged census cannot
  tell "dead" from "late", and a snapshot cannot tell "dead" from "short-lived."** Of 107's four
  candidates only `SOLARF` is still genuinely open — and an earlier solar-farm vector was reverted as a
  bad trade, so reaching it may not be worth wanting. 107's rule ("assume there are others") stands; its
  *list* was three-quarters explained by measurement artifacts.
- **A DOMAIN CAN BE FED BY DEEPENING ANOTHER DOMAIN TOWARD IT.** This is filed under Nature, but its
  content is a **Sky** interconnect — the farms consume `applySeason`'s `year`. Sky has been the stalest
  domain for 13 iterations precisely because its own additive cells are spent. The way to grow it is not
  a new sky feature but to make more of the ground *answer* to it. Remaining surfaces that still sit out
  the calendar: `VINEYARD` (should redden and be cut), `MEADOW` seed-heads, `MARSH`. Cheap, draw-only,
  and each one makes the existing season system worth more.

## Iteration 109 — the walk-ups close ranks (2026-07-10)

**Vector** — Urban fabric × **Connect**. Rotation named both axes: Urban (103) was the stalest safe
domain (Sky 95 is staler but is a documented trap), and `Connect` is one of the two coldest kinds —
its only prior entry is iter 47's skybridges. The recent kinds were New element / New CA rule /
Deepen, so Connect was also un-repeated.

**The seam.** A `MID` walk-up bodies out `ax=0.34` — 0.68 of a cell — so an E-W pair leaves a 0.32-cell
gap and the mid-rise mass reads as a checkerboard of detached boxes, never as streets. This is the one
gap that *shows*: along the two diagonal axes the row in front is drawn later and its own height covers
the seam, which is exactly why iter 47 found diagonal skybridges "stubby/hidden". The E-W gap is the
only visible one, and closing it is the whole of the vector. (`RES` villas are deliberately left
detached — they have gardens, pools, palms and a washing line strung *across* the gap to the next door
west. Villas detached, walk-ups terraced, is also the correct urbanism.)

**Change.** ~6 lines in `case T.MID`. A walk-up whose **east** neighbour is also a walk-up grows east:
centre `+0.16`, half-extent `0.34 → 0.5`. Its east face then lands exactly on that neighbour's west
face (`gx+0.66`) and the two butt with zero overlap. Chains compose — each member grows into the next,
so a run of *n* closes *n−1* joints — and the row's left-to-right draw order does the occlusion for
free. Where heights differ the taller block's flank *is* the party wall, which is what a stepped
terrace looks like; no `min()` anywhere, the geometry does it. Roof furniture (solar, green roof,
fringe, water tank) rides the shifted deck by `+jx`. Gate `hashCell(x+1,y,seedNum^0x4E27)<0.72`, keyed
on the **east** cell so a joint is decided once by the same hash from either side; ~1 in 4 stays open
as a light well. Salt and probability were **typed before anything was run**, per iter 107's law.
Draw-only: no `rng()`, no terrain, no new tile type, so nothing to add to `__census()` or the tooltip.

**Census — PASS.** `pop 154918 → 154918 (+0)`, every metric `+0`, **tile histogram completely empty**,
0 page errors. A draw-only vector must move nothing, and this one moved nothing — not even the ±3 that
iter 108 documented as the instrument's load floor.

**Perf — PASS, and it is the reason the first design was thrown away.** See the finding below. Final:
3 sequential runs judged by the minimum of each scene, day **33.44ms**, night **37.78ms**, against a
*pristine-HEAD control measured on the same machine minutes earlier* (day 33.33ms, night 37.89ms):
**+0.3% / −0.3%**. The street wall costs zero fills. Baseline not re-pinned; `polish-tile` owns it and
there is nothing to re-pin.

**Probe — `probe-terrace.mjs` (`git add -f`'d), 16 seeds.** Re-applies the join predicate from inside
the page (so it cannot disagree with the draw code), chains closed joints into terraces, and pixel-tests
the result. **3140 eligible joints, 2246 closed = 71.5%** against the declared 72% gate. Run lengths:
1195 pairs, 300 triples, 85 quads, 36 fives, 10 six-plus, longest 7 — so **55.2% of all walk-ups
(3872/7011) now stand in a terrace** rather than alone. Pixel test, restricted to joints with no
building in front to occlude them: a **closed** joint reads the west block's own facade (mean RGB
distance **13.0**, exact match 64.9%); an **open** one reads past it to the background (**55.0**, 2.1%).

**Visual — PASS, 3/3 agents**, on the shipped geometry (the first three verdicts were discarded with the
first design). Day downtown before/after at seeds 42 and 7, a night downtown pair, and un-zoomed whole-city
frames. All three: terraces continuous and square on the hex grid, **no lopsided blocks, no roof furniture
overhanging a widened roof, no clipping**; at night the window ribbon runs on through the joint and still
reads as separate panes rather than one glowing slab; no z-order tears anywhere; the whole frame still a
balanced coastal city, the mid-rise "adds texture without flattening the skyline".

**Verdict: SHIPPED.**

### Findings

- **⚠ TO CONNECT TWO THINGS, GROW ONE INTO THE OTHER — DO NOT INSERT A THIRD THING BETWEEN THEM.** The
  first design filled each gap with a *filler prism*: a third block, at `min(h,h_w)`, in the west
  neighbour's colour, carrying its own glass bands and its own cornice. It passed census and 3/3 visual
  agents — and **failed the perf gate at +28.5% day / +26.7% night**, ~2000 extra `fill()`s per frame
  (≈14 per joint × ~140 joints). Widening the west block instead — same prism, `cx+0.16`, `ax 0.34→0.5`
  — produces *identical* geometry for **zero** extra fills, and the window ribbon, cornice and balcony
  rails extend across the joint for free instead of being redrawn. It also deleted the `min()` height
  logic and a `midTone()` helper I had hoisted only so the filler could paint the neighbour's shade.
  **A connector you have to draw is a connector you got wrong.** Look for the version where the existing
  geometry reaches.
- **⚠ THE PERF GATE IS THE ONLY GATE THAT CATCHES THIS, AND CENSUS + VISUAL WILL BOTH WAVE IT THROUGH.**
  The filler prism was *invisible* to the census (draw-only ⇒ `pop +0`, empty histogram) and *beautiful*
  to three independent visual agents. Nothing but frame time knew it was wrong. The skill runs perf only
  at the ~5th-iteration step-back; **any vector that adds per-frame draw work should run it in its own
  lap**, and this one was not a step-back. Had I not, the loop would have shipped a 28% frame-time
  regression and discovered it, unattributably, five iterations later.
- **⚠ CONTROL AGAINST PRISTINE HEAD, ON THE SAME MACHINE, WITHIN MINUTES — the baseline file cannot tell
  you whether it is you or the room.** Iters 99/104 taught "stable offset ⇒ code, rising ⇒ load". The
  filler's offset was stable (+33/+29/+30%) — but so is a genuinely loaded machine's. The reading that
  actually decided it was `git show HEAD:solvista.html > solvista.html`, 3 perf runs (day min **33.33ms**,
  flat to baseline), restore. That took four minutes and converted "probably my code" into "certainly my
  code". Cheap; do it before you optimise, not after.
- **⚠ A CROSS-FRAME PIXEL DIFF IS NOT A VALID CONTROL FOR A CHANGE YOU CAN SEE *PAST*.** The filler
  version's probe compared pristine-vs-patched pixels at each joint and read closed Δ27.3 / open Δ0.2 —
  a beautiful control. The same probe on the shipped version read open **Δ7.0**, and I nearly filed it as
  noise. It was not: through an *open* gap you look at the row **behind**, whose walk-ups legitimately
  widened. The control class was contaminated by correct change. **A control must live in the same frame
  as the thing it controls** — rewritten to compare the joint against the west block's own facade, one
  frame, no pristine load (and it runs in half the time).
- **⚠ ON A HEX PRISM, "SAME SCREEN Y" IS NOT "SAME WALL HEIGHT".** The front face's top edge slopes from
  `+V` at the S-point to `+E` at the shoulder, so two points sampled at one screen `y` sit ~`V/4` apart
  in `z`. Window bands are 3 tall and repeat every 7, so one probe point kept landing in glass and the
  other on plain wall: closed Δ35.3 vs open Δ47.0, a **null result from a geometry bug, not from the
  feature**. Invert the face equation and pick `z`: `y = cy + V + (E−V)·u − z`, with `z = 10+7k` (bands
  occupy `[5+7k, 8+7k]`, rails to `8.9+7k`). Any future probe that samples a facade needs this.
- **AND THEN THE OCCLUDERS: a facade probe must first ask whether the facade is visible.** With the
  geometry fixed the test still read only 42.6% match on closed joints. The city is dense; the row drawn
  in front covers most walls, and it covers two nearby probe points *unequally*. Restricting to joints
  with **no `DEV` cell at all in the row in front** (n 2246→464) moved closed joints to Δ**13.0** / 64.9%
  match against open Δ**55.0** / 2.1% — a 31× separation. The confound was never the vector. **When a
  pixel probe of a 3-D scene reads weakly, suspect occlusion before you suspect the feature.**
- **The `hashCell` gate should be keyed on the ASYMMETRIC end of the relation.** A joint between `(x-1,y)`
  and `(x,y)` is one thing, but two cells can ask about it. Keying on the **east** cell (`hashCell(x+1,y)`
  from the west block's point of view) means both sides compute the same bit, so a probe written from the
  other direction agrees with the draw code by construction. That is why `probe-terrace.mjs` could re-apply
  the predicate and land on 71.5% against a 72% target with no fudge.
