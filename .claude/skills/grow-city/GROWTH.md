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
| **Water & coast** | 6, 10, 12, 16, 20, 33, **106** | 90 | 17, 25, 51, 65, 72, **113** | 22 | | U2, 44, 58, 79 | **97** |
| **Urban fabric** | 32, 62 | 7, 23, ~~82~~ | 38, 54, 68, 92 | 47, **109** | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103**, **110** | |
| **Transport** | 2, 9, 21, 31, 48 | 77 | 28, 39, 55, 63, **112** | 5, 15 | U4 | U1, U3, 70, 85, 87, 94 | **105** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107** | 36, 59, 66, 80, 91 | 45 | | 73, ~~**114**~~ | 52 |
| **Sky & atmosphere** | 27, 43 | | 19, 35, 50, 57, 95 | | | 61, 81, 89, **115** | |
| **People & activity** | 41, 56 | 49 | 34, 64, 93, **104** | 78, **111** | | 84 | 71 |

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
- **ROTATION.** Last vector per domain: Water **106** ·
  Nature **108** · Urban **110** · People **111** · Transport **112** · Water **113** · Civic **114** · Sky **115**.
  **Sky's twenty-lap staleness is now spent** — 115 took it *without* adding anything, which is the
  documented way past its additive saturation (surveyed iter 103; its empty `New CA rule` cell remains a
  **trap, not an invitation** — sky is not cellular, and fog on terrain is already `rSea`/`fogAt`).
  Stalest is now **Water (106/113)** — and it has the strongest cue in the ledger waiting for it, new
  **cue (k)**, raised by two independent agents at 115's step-back. Then **Nature (108)**, then Urban (110).
  Civic's banked **cue (d)** was attempted at
  114 and **reverted**: its goal is proven (a 3-hex square reads at fit zoom) but its prescribed
  host does not exist — see the rewritten cue below before re-opening it.
  **Iteration 120 is the next holistic step-back** (105, 110, 115, …), and per 115's finding it must be
  shot **at night as well as by day**: 115's night frame failed on a defect present in every city ever
  generated, which ~114 daytime whole-city reads, the census and the perf gate had all missed.
  Iter 111 was People × Connect and used
  109's trick (close a gap between two existing objects); iter 112 **cashed the same trick in
  Transport** (trains ↔ their own stations) and iter 113 cashed it a third time in **Water** (the
  marsh ↔ the tide its own tooltip printed). **That shape has now paid in four domains — assume it is
  spent, and look for the gap-closing seam only where a tooltip/label already ASSERTS a relationship
  the draw ignores.** (That is the reliable tell: 111 a shelter, 112 a platform, 113 a live `Tide`.)
  Note iter 108 was Nature × Deepen but its
  *content* was a Sky interconnect (the farm calendar reads `applySeason`'s `year`) — **Sky can be
  fed by deepening another domain toward it**, which is the way out of its saturation that does not
  require a sky feature. **113 did this again** (the marsh reeds now read `year`), leaving 109's
  Sky-feedable list at `VINEYARD` and `MEADOW` seed-heads.
  Recent kinds: 107 New CA rule ·
  108 Deepen · 109 Connect · 110 Polish · 111 Connect · 112 Deepen · 113 Deepen · 114 Polish (reverted) ·
  115 Polish —
  **Deepen has paid 3 of the last 8; stop reaching for it.** **Polish has now paid 3 of the last 6, so it is
  no longer cold either.** The coldest kind is **Scale** (a structural lever, not a lap
  move), then **New element** and **Interaction/UX**. **Connect paid three times** (109, 111, 112 — 112 logged as
  Deepen, see its entry): its trick was that
  it added no new object — it *closed a gap between two that already existed* (see 109's first finding).
  Note **107 was a New CA rule that
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
- **⚠ FREEZE THE CLOCK BEFORE YOU DIFF A LIVE DIORAMA, AND MEASURE WHICH INSTANCES ARE VISIBLE
  (iter 111; `probe-vis.mjs` is the worked example).** (a) Two shots of this city at different sim
  times differ by ~14% of the canvas — cars, waves, swaying trees — so a pixel diff across time can
  never isolate a small ornament. Set `playing=false` and re-`render()` with only your feature
  toggled: every other pixel is then identical *by construction* (iter 109's same-frame law, where
  "frame" means the **instant**, not just the viewport). The same diff went 9371 px → 237 px.
  (b) **"Not drawn" and "drawn but occluded" are the same screenshot.** A hand-rolled occlusion
  filter picked a hidden bus shelter and the visual agent duly returned a false `VISUAL: FAIL`. Never
  hand-derive which instances are visible — render each and count changed pixels. Sweeping the
  camera also tells you *from what zoom* a thing reads: the bus queue is 0% at fit zoom, 53–63% at
  zoom 4, plateauing at 63–73% (the plateau is the permanently-occluded remainder). **The whole-city
  gate can neither convict nor acquit anything drawn at 3 px.**
- **⚠ `peds` CANNOT SERVE THE ROAD NETWORK (iter 111, measured, before writing any code).** A resident
  is leashed to the open cell it is anchored to (`PEDLEASH=2`, and `stepPed`'s comment says that
  constant was tuned to hold street occupancy at ~19%). Only **20–31%** of bus stops have a live ped's
  anchor within a leash — even at radius 5 it is 56–75%. So "residents walk to / wait at / ride the X"
  vectors are structurally capped at ~a quarter of any road-borne host, and would leave the rest
  *emptier* than whatever decoration they replaced. To do it properly you must move the **spawn pool**
  (`openCells` in `syncFleet`), not the leash. Don't rediscover this.
- **⚠ A NORMALIZED PARAMETER SILENTLY ENCODES PATH LENGTH (iter 112).** Anything moving by
  `e.p += k*dt` where `p` is a *fraction of its path* has a GROUND speed proportional to that path's
  length. The monorail did: every line lapped in 71s whatever its size, so seed 7's 89-span line ran
  its trains **45× faster** than its 2-span one. Fixed by making the rate `spans/sec` and capping the
  lap. **The gondola still has it, measured: `cb.p+=dt*s*0.02` gives 0.14–0.36 spans/s, and seed 42
  runs two cable lines at 0.36 and 0.18 — identical cabins, visibly different speeds. Open cue (h).**
  Before touching any `p`-parametrised mover, ask what `p=1` *means* on that instance.
- **⚠ AN EASING RAMP TO ZERO MUST BE `sqrt`, NOT LINEAR (iter 112).** To slow a mover as it nears
  something (a platform, a dock, a terminal), `v = V·d/B` is the intuitive choice and it is **wrong**:
  the time to cross the brake zone is `∫dx/(V·x/B)`, which **diverges**, so the mover spends nearly its
  whole journey pinned at whatever floor you clamped to. It tripled the monorail lap (210s vs 71s) *while
  still reading as three different speeds*. Use `v = V·sqrt(d/B)` — constant deceleration, physically
  what a train does, and it integrates to a finite `2B/V`. **Neither the census nor three visual agents
  can see this**; only a numeric probe of speed can (`probe-train.mjs`).
- **⚠ A PREDICATE WITH THREE READERS WILL HAVE THREE ANSWERS (iter 112; extends 107's dead-rule law).**
  "Is this stop a station?" was written inline in the draw (`stops.has(i) && countAround(...)>=3`), and
  *ignored* by the tooltip and the hovered-route pips, which counted raw `stops`. So a line claimed up to
  **twice** the platforms it drew (21–100% overstatement) and pipped bare track. 107 taught *audit a rule
  for reachability*; the sibling move is **`grep` for a predicate's OTHER readers before trusting any one
  of them.** Fix is iter 111's `stopQueue` shape: one function, one set (`m.sta`), every reader shares it.
  Free regression check: the census `stations` metric was computed by a *fourth* copy, and held at 40.
- **ELEVATED FEATURES CANNOT BE OCCLUDED — the 111 visibility law still applies, but passes trivially
  (iter 112).** All 19 monorail stations moved **1595–3590 px** in the approach-vs-departed diff at zoom
  3.4; not one was hidden. Contrast iter 111's street-level bus shelters, ~30% of which were permanently
  behind a building. Anything drawn at `RAILH=40` is above the rooftops. Still *measure* — but expect a
  pass, and expect the fit-zoom frame to show a stopping train (unlike a 3 px queue).
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
  valid at iter **111** (pristine-HEAD control that session read day **33.78ms**; the change added
  +0.22ms). Also valid at iter **110**: a pristine-HEAD control read day **33.49ms** / night **37.72ms** (min-of-3),
  and iter 109's read day **33.33ms** / night **37.89ms**. Not re-pinned. The
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
- **`?tide=` IS NOW A URL HOOK (iter 113) — the sea is testable, and every prior shot was a lie about it.**
  Same story as `?year=` one dimension over: `TIDE` runs a ~2 min seeded cycle and **no screenshot in this
  loop's history could pin it.** The default is seeded, not neutral — **`?seed=42` loads at TIDE 0.02, dead
  low water.** `?tide=v` shifts the cycle's *phase* (`__setTide`), so the sea keeps moving from where you put
  it rather than freezing. Use `.02 / .35 / .59 / .98` = low / mid-ebb / **neutral** / high. **`0.59` is the
  pin you want when grading anything ELSE on a marsh**: it sits below the flood-sheen cut (0.60) and at
  `ebb=0`, so the hex body is one flat color and nothing tidal can move.
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
- **⚠ THE COLOUR-RESTATES-HEIGHT CLASS IS NOW EXHAUSTED — MID (99), RES (103), TOWER (110).** All
  three building types drew colour from the field that drives height. TOWER was the worst and lasted
  longest: `style` *and* `c.th` both read `c.v`, so the four silhouettes were four **height classes**
  (mean th 58/84/95/121) and the tallest tower was a terracotta ziggurat in 2 of 3 cities — downtown
  had exactly **four looks**. `corr(style,th)` **0.727 → 0.257**, distinct looks **4 → 19 of 20**.
  **`probe-towertone.mjs` (`git add -f`'d, reads the permanent `window.__twr` hook) generalises**:
  recover the field that picks colour and the field that picks height, report Pearson. If a fourth
  building type is ever added, measure it on day one.
- **⚠ MIXING TWO UNIFORM HASHES GIVES A TRAPEZOID — RE-SOLVE THE CUTS OR YOU CULL THE RARE FORM
  (iter 110).** The iter-99 recipe `mv*0.72+v*0.28` is **not uniform**: its density rises on
  `[0,0.28]`, is flat to `0.72`, then falls. So reusing the old thresholds silently reshapes the
  distribution — keeping TOWER's `0.35/0.62/0.85` would have cut ziggurats from 15% to **5.6%**, a
  two-thirds cull of the most characterful tower *dressed up as a variety win*, and a `corr` check
  would have passed it. Solving the trapezoid CDF for the original mix gave `0.39/0.59/0.75`
  (measured after: 37.6/24.9/24.5/13.1 vs 35/27/23/15). This is iter 98's hold-the-mean law applied
  to a **distribution**. It bites whenever the decoupled selector also chooses *geometry*, not colour.
- **⚠ A PROBE MUST READ THE RULE, NOT RE-DERIVE IT (iter 110).** `probe-towertone.mjs` first
  copy-pasted the selector under an "edit BOTH together" comment — a drift bomb that would quietly
  grade the wrong rule after the next edit. Extracting `towerLook()` as the single definition and
  having `window.__twr` call it makes the probe grade the **live** code. Pair with iter 101's law: a
  tracked probe that reimplements what it measures is *worse* than no probe.
- **⚠ THE STEP-BACK'S AGENTS ARE GOOD WITNESSES AND BAD DOCTORS (iter 110).** Both holistic agents
  correctly saw *repetition* in the downtown; **all three of their prescriptions were closed dead
  ends** — "add parks" (cue e½, closed 102), "the floating district lines" (the monorail beam, closed
  87 — the header's pre-registered false positive fired again), and "give the roads contrast
  hierarchy" (dead by iter 101's contrast×width law, since a road is a 1-hex ribbon; and the *width*
  branch re-opens cue (b), closed 86). **Take the observation, discard the prescription, then go find
  the mechanism in the source.** Here the mechanism was one `const` on one line — no agent could see it.
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
  **(k) the open water is the least-resolved third of the frame** *(Water & coast — banked iter 115; the
  STRONGEST cue here, and Water is the stalest domain)*. **Both** day agents at 115's step-back named the sea
  unprompted and independently: *"a large flat teal wedge — no wave detail, reefs, wake trails, or depth
  gradient… it carries a disproportionate share of canvas for how little it resolves"* / *"the entire right
  third is flat teal… compared to the hyper-dense land it reads as dead space."* Two independent agents
  converging with no prompt is the strongest cue signal in this ledger. **Both also called the offshore
  turbines and boats "randomly salted rather than sited"** — so the answer is almost certainly *depth,
  texture or tone in the water field itself*, **not another floating object**. Note iter 106 passed on Water
  × Connect/CA/Scale for reasons recorded in its entry; this is Water × **Polish**, which is untouched by
  that reasoning.
  **(j) the night windows verge on stripe-noise** *(Urban fabric, or a `polish-tile` job — banked iter 115)*.
  115's night agent, second complaint: across the dense core the yellow window rows are *"extremely dense and
  repetitive — they buzz as horizontal-stripe noise rather than individual lit windows, especially on the mid
  towers."* Distinct from 115's vector (this is per-window density inside `drawBuilding`'s band draw, not the
  light field), and **115 made it marginally worse downtown** while relieving it at the rim. Grade it with
  `probe-litdiff.mjs`'s same-instant A/B.
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
  **(g) THIRTEEN lines / SIXTEEN seedless `hashCell` calls remain** — **iter 103's audit grep undercounted,
  and iter 113 corrected it.** The old pattern
  (`grep -nE 'hashCell\([^)]*,[[:space:]]*(0x)?[0-9]+\)' … | grep -v seedNum`) matches only a **bare integer**
  salt, so every `k+90` / `j+40` / `r*3+cc+50` form was invisible to it — including **two of the marsh's own
  three offenders.** Use the superset:
  `grep -noE 'hashCell\([^;]{0,60}' solvista.html | grep -v seedNum` (then discard the L182 definition and
  genWorld's L510/511/523, which pass the real `seed`). Each survivor is a function of `(x,y[,j])` alone, so
  it paints the identical pattern in every city. Two stakes, and **only the first is an invariant breach
  worth a vector**:
  - **Presence decisions** (something is there, or isn't, in the same place in every city):
    **L2747** `hashCell(x,y,77)<0.28` — which surf cells catch the city's light-smear at night.
  - **Ornament jitter** (a detail's lean/length/brightness, not its existence): kelp sway **L2799**,
    palm fronds **L2832 ×2 / L2834 ×2**, orchard fruit **L3248/3249**, **park fireflies L3423 ×2**
    (identical firefly positions in every city), **L3610/3613**, **L5113/5117**.
    The marsh reed tufts were **CLOSED by iter 113** (and its lean salt `hashCell(x,j,7)` took no `y`, so
    every marsh hex in a column leaned identically). The tower window-lights
    (`hashCell(x,z|0,3|5|9|13)` — every city's towers lit identically at night, the *most visible*
    of the class) were **CLOSED by iter 110**, folded into its TOWER Polish; they now mix `seedNum`.
  Note `darkWinR` is **not** a breach: it takes a literal `salt` argument but mixes `seedNum^salt`
  internally — check the callee before indicting a call site. And when you fix a range, **space the bases**:
  `0x9EE1+j` / `0x9EE2+j` / `0x9EE3` collide at `j=2` (iter 113).
  **(i) the marsh reeds do not read, and that is a `polish-tile` job** *(banked by iter 113, Water)* —
  the reed calendar shipped in 113 is wired and measurable, but the reeds are **seven sub-pixel strokes
  huddled around the pool**, so the hex reads as "green hex with a pool" and the calendar is invisible at
  fit zoom. (Verified by marking them magenta — see 113's findings; the striking pale figure on a marsh
  hex is a **heron**, not a reed.) Spreading/lengthening them is a tile redesign, out of scope for a
  growth lap, and it would pay off immediately because the seasonal color is already computed.
  **(d) the civic quarter deserves a real square — STILL OPEN, BUT ITS PRESCRIPTION IS DEAD**
  *(banked by iter 91; attempted and **reverted** by iter 114, Civic × Polish — read 114 before re-trying)*.
  The goal is confirmed and **measured**: every `PLAZA` patch in every seed is exactly **one hex**
  (`[1,1,1]/[1,1]/[1,1,1]`), so the quarter is a knot of pale domes each hugging its own private
  forecourt — and a throwaway build proved a **3-hex square is beautiful and legible at fit zoom**
  (both agents, 2 seeds), where iter 101's 1-hex ribbon was not. **Minimum viable size is 3**; a
  2-hex square sits on the edge of 101's contrast×width law.
  What is dead is 91's *implementation*: "annex an adjoining `FORECOURT_LOT`". **There is no such
  lot.** A forecourt is sited to front the loudest street, so it is a **road junction** — of the 6
  quarter-member heads' 36 neighbour slots, **ROAD 16 (44%)**, pavable lot **2 (5.6%)**, of which
  **one** fronts a street. Iter 100's `QUAD` grounds pass eats the back lot besides. The rule fired
  **zero** times in three cities. Do not "fix" this by loosening the gate — with the gate at 1.0 it
  fires **once, in one city, on one institution.**
  So: **the square must take the ROAD**, which is also the honest reading of iter 100 (the cell
  between two majors *is* the street they both front — pedestrianise it). Two things a taker must
  carry: (i) a **demote-on-merge** step — a per-head size cap does **not** stop two squares joining,
  and iter 114's throwaway produced a 5-hex patch with **two centrepieces**; (ii) the **hazard list**
  in 114's findings — cars are provably safe, but trams/monorail draw along roads, and `c.stop`,
  `c.bridge`, `c.flow`/`ARTFLOW`, `frontSide()`, boulevard trees and `c.hstr` all read `ROAD` and are
  unaudited. `roads` is a **core** census metric. Budget a lap for the audit; don't do it on the side.
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

> **Archive:** the 108 entries before Iteration 106 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

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

## Iteration 110 — the towers stop wearing their height (2026-07-10) [holistic step-back]

**Vector** — Urban fabric × **Polish**. Rotation would have said People (104). The **step-back
overrode it**: this is the 5th-iteration holistic pass, and it found something, so the skill's rule
("if something compounded badly, spend the next iteration FIXING it") took precedence. Two
independent whole-frame agents, on two seeds, converged on *the same* complaint — seed 42:
"hundreds of similar blue-grey/red-capped blocks… a monotonous tower carpet"; seed 7: "tower colors
repeat so consistently that massing becomes hard to parse." Seed 42 returned `VISUAL: FAIL`.

**Triage first — most of what the agents PRESCRIBED was already a closed dead end.** Worth recording,
because a future step-back will hear the same three suggestions:
- *"thin density, add parks"* → cue (e½), **closed by iter 102**; the header says do not plant a
  second lung.
- *"stray floating district lines read as tears"* (seed 42) → the monorail/cable beam, **closed by
  iter 87** with six agents. The header pre-registers this exact false positive; it fired again.
- *"give the roads hierarchy so downtown reads as blocks"* (seed 7) → a **trap on both branches**.
  Contrast-only is dead by iter 101's law (below ~2–3 hexes across a corridor is untraceable at *any*
  ΔL, and a road is a 1-hex ribbon); the width branch re-opens cue (b), "the asphalt floods the
  interior", closed by iter 86. **Do not spend a lap on road hierarchy.**
  What survived triage was not their diagnosis but their *observation*: the buildings repeat.

**The seam.** `drawBuilding`'s `case T.TOWER` opened with `const style=v<0.35?0:(v<0.62?1:(v<0.85?2:3))`
while the upgrade pass sets `c.th=(54+c.v*82)*(0.70+0.66*core)` (L1104). **Both read `c.v`.** So the
silhouette was a restatement of height — the third and most visible instance of the defect iter 99
took out of `MID` and iter 103 out of `RES`. And colour restated the silhouette: every teal slab wore
the one `teal`, every ziggurat the one `terra`. Downtown had exactly **four looks**.

**Measured before designing** (`probe-towertone.mjs`, now `git add -f`'d, reading a new permanent
`window.__twr` hook):

| | corr(style,th) | distinct looks | commonest body | tallest is ziggurat |
| --- | --- | --- | --- | --- |
| before | 0.695 / 0.757 / 0.695 — **mean 0.727** | **4** | 36.8–47.9% | **2/3 seeds** |
| after | 0.179 / 0.325 / 0.267 — **mean 0.257** | **19 of 20** | 27.3–28.8% | 0/3 seeds |

0.727 sits inside MID's *pre-fix* band (0.76–0.79); 0.257 sits inside the MID/RES *post-fix*
reference band (0.19–0.31 / 0.22–0.25). Mean height per style climbed monotonically before
(58 → 84 → 95 → 121): the four "styles" were four **height classes**.

**Change.** `towerLook(x,y,v)` — one pure function, the *only* definition of the rule — draws two
independent seed-salted hashes: `form=fv*0.72+v*0.28` picks the massing (keeping a **mild** height
link, because a tall tower genuinely should step back — ziggurats are still the tallest style on
average, 98 vs 79), and `cv` picks the body outright from 5 shades (white/cream/sand/teal/terra),
with a light `capN` on setbacks. 4 forms × 5 bodies = 20 looks. Also closed the **most visible half of
open cue (g)**: the four `hashCell(x,z|0,3|5|9|13)` per-storey window-light salts were literals, so
*every city's towers lit identically at night*; they now mix `seedNum`.

**⚠ The mixed selector is TRAPEZOIDAL, not uniform — re-solve the cuts or you silently delete the
rare form.** `0.72·A+0.28·B` on two uniforms has a trapezoid density, so keeping the old
`0.35/0.62/0.85` cuts would have cut ziggurats from 15% to **5.6%** — a two-thirds cull of the most
characterful tower, dressed up as a variety win. Solving the trapezoid CDF for the original mix gives
`0.39/0.59/0.75`; measured after, the mix is **37.6 / 24.9 / 24.5 / 13.1** against a pre-change
35 / 27 / 23 / 15. This is iter 98's hold-the-mean law applied to a *distribution* rather than a mean.

**Census** — PASS. Tile histogram **completely empty**; `towers`/`towerHt`/`tallTowers`/`helipads`/
`roads`/`developed`/`parks` all **+0**. `pop -3`, `greenRoofs -1` — precisely the load jitter iter 108
documented on *identical pristine code* (154915 vs 154918). `style` is cosmetic: it feeds no
`rng()`-gated predicate, and `pop`/`towerHt` read `c.h`/`c.th`, never the style. Draw-only ⇒
stream-neutral by construction, and the census signature proves it.

**Perf** — PASS, and run *because* iter 109 said to, not because it was the step-back: the style mix
moved and per-tower draw work varies by style. Pristine-HEAD control taken the same session, 3 passes,
min-of-three: day **33.49 → 33.61ms** (+0.12), night **37.72 → 37.72ms** (+0.00). One pass read
35.16ms day; min-of-three exists for exactly that spike. `col()` memoizes on `name|f`, so the fifth
body shade buys a cache entry, not a draw call — palette variety remains the cheapest beauty here.

**Visual** — PASS on both seeds, day + downtown + a night clip. Seed 7, unprompted: *"the added tower
variety lightens the core rather than darkening it into clutter."* Both confirmed the tallest tower
still reads as a landmark rather than a featureless box — the one real risk of decoupling form from
height. Night windows read as warm lit bands, not blow-out.

**Verdict — FIXED.** The step-back's own `VISUAL: FAIL` is cleared. Perf baseline (2026-07-10, day
33.16 / night 37.33) still valid; not re-pinned.

**Durable findings**
- **The step-back's job is to name the vector, and its agents are good witnesses but bad doctors.**
  Both correctly saw *repetition*; both prescribed fixes the ledger had already closed. **Take the
  observation, throw away the prescription, then go find the mechanism in the source.** The mechanism
  here was one `const` on one line, and no agent could have seen it.
- **`corr(colour-field, height-field)` is a defect *class*, and the class is now exhausted.** MID
  (99), RES (103), TOWER (110) — all three of the city's building types drew colour from the field
  that drives height. If a fourth type is ever added, measure it on day one: `probe-towertone.mjs`
  generalises (recover the field that picks colour, the field that picks height, report Pearson).
- **When a decorative selector also chooses GEOMETRY, decoupling it is not free — check the
  distribution, not just the correlation.** The naive iter-99 copy would have passed a `corr` check
  and quietly culled the ziggurats. The tell was the trapezoid; the guard was re-solving the cuts.
- **A probe must read the rule, not re-derive it.** `probe-towertone.mjs` first duplicated the
  selector with an "edit BOTH together" comment — a drift bomb. Extracting `towerLook()` and having
  `window.__twr` call it means the probe grades the *live* rule. Pair this with iter 101's law:
  a tracked probe that reimplements what it measures is worse than no probe.

## Iteration 111 — the buses stop for somebody (2026-07-10)

**Vector** — People & activity × **Connect**. Rotation named the domain: People (104) was two laps
overdue (110's step-back pre-empted it). The kind came from 109's own finding — *"Connect's trick was
that it added no new object, it closed a gap between two that already existed; look for that shape in
People and Transport before reaching for a new entity."* This is that shape exactly: `c.stop` road
hexes have drawn a shelter since long before the ledger, buses have pulled into them and dwelt
(`v.wait=1.2+…`, `v.dwell=16`) — **and the two had never met.**

**The seam.** Under every shelter, `drawCell`'s `case T.ROAD` painted `1+((x+y)&1)` little figures with
the comment *"somebody's always waiting on the day buses."* They were furniture: the same 1 or 2 people,
in the same spots, forever, whether or not a bus had just been and gone. The city drew the *idea* of
people waiting for a bus and never connected it to the buses.

**Measured BEFORE designing, and the measurement killed the first design.** The obvious vector was to
send *real residents* (`peds`) to the stops. `probe-stops.mjs` says they cannot get there:

| | seed 7 | seed 42 | seed 1234 |
| --- | --- | --- | --- |
| stops | 24 | 32 | 30 |
| within a leash of ANY strollable cell (structural ceiling) | 83% | 84% | 83% |
| **within a leash of a live ped's ANCHOR** (real ceiling) | **25%** | **31%** | **20%** |
| stops holding a ped at any moment, today | 6.2% | 3.1% | 3.0% |

Sweeping the tether: even at radius **5**, only 56–75% of stops have a resident anchored near them —
and `PEDLEASH` is the constant `stepPed`'s own comment says was tuned to hold street occupancy at ~19%.
Real peds would have staffed a quarter of the shelters and **emptied the other three quarters**, which
is strictly worse than the fakes. *Abandoned before writing a line of it.*

**Change.** ~30 lines. `stopQueue(c,x,y)` — one pure function, the only definition of the rule, read by
the draw, the tooltip **and the bus**. `stepVehicle` stamps `c.blast=time` when a bus pulls in (and
`c.bqs`, whoever was aboard). The queue then builds while nobody comes: empty for `BUSGONE=6s`, +1
rider every `BUSQGAP=20s`, up to a per-stop `stopCap` of **1–3** drawn from `hashCell` (never `rng()`),
so shelters differ from one another. When a bus arrives the figures step off the sidewalk toward it
(`-ox*bl`) and fade (`1-bl²`), and are gone. `probe-bus.mjs` set the constants: median headway at a
served stop is **74–126 s**, so a shelter refilling in ~46 s spends real time part-full.

**⚠ Held the mean (iter 98's law).** First cut used `stopCap` 2–4 and read **2.53 waiters** against the
painted rule's flat **1.50** — ~30 extra glyphs citywide, i.e. clutter wearing variety's clothes. Retuned
to 1–3: **1.68 / 1.83 / 1.83**. What the change buys is *variation and a story*, not more people.

**Census — PASS.** Every metric `+0` (`pop -3`, `greenRoofs`/`solarRoofs` flat), **tile histogram empty**,
entity counts unmoved, 0 page errors. Draw-only + `hashCell`: stream-neutral by construction, and the
`pop ±3` is exactly the load jitter iter 108 documented on *identical pristine code*.

**Perf — PASS, and controlled against pristine HEAD in the same session** (not against the baseline
file — iters 99/104). Min-of-3, sequential: mine day **34.00** / night **38.55 ms**; pristine HEAD the
same session day **33.78 ms**. **+0.22 ms (+0.65%)** — noise. The +2.5% the baseline file reports is
today's machine load, not this code. Baseline (day 33.16 / night 37.33) **not** re-pinned.

**Visual — PASS, 2/2 agents, on same-frame filmstrips.** Both described the sequence unprompted
(3 standing → shifted toward the street and translucent → shelter empty) and both noted the frames were
pixel-identical apart from the figures. Whole-city frames: *"balanced, beautiful coastal city… no
clutter or darkening."*

**Tooltip** (per the sync invariant): `Bus stop` now reads its live state — `3 waiting` / `boarding` /
`nobody waiting`. Verified by driving a real hover through all three phases; no page errors.

**Verdict: SHIPPED.**

### Findings

- **⚠ A FILMSTRIP OF A LIVE DIORAMA NEEDS A FROZEN CLOCK, OR THE DIFF IS ALL WEATHER.** The first
  filmstrip stepped the sim between shots. The pixel diff of "full" vs "emptied" came back **9371 px
  (14% of the clip), bbox 139×110** — cars had moved, trees had swayed, the sea had breathed. It
  proved nothing about a 3-pixel figure. Setting `playing=false` and driving only `c.blast` between
  `render()` calls makes every other pixel identical **by construction**, and the same diff came back
  **237 px in a 14×24 box.** This is iter 109's "a control must live in the same frame as the thing it
  controls," and the *frame* means the instant, not just the viewport. Both visual agents then
  volunteered that the frames were identical except the figures — a same-frame control makes the
  agents better witnesses too.
- **⚠ "NOT DRAWN" AND "DRAWN BUT HIDDEN" ARE THE SAME SCREENSHOT — AND MY OCCLUSION FILTER PICKED A
  HIDDEN ONE.** Seed 42's first gate returned `VISUAL: FAIL`; the agent saw no figures and read the
  neighbouring festival bunting as them. It was right: the stop I had chosen was **occluded**, and the
  same-frame diff there is **0 px in every phase**. I had hand-rolled an occlusion filter (no `DEV` at
  `(x±1,y+1)`) and it selected an invisible shelter anyway. Replaced by *measuring*: zoom onto each
  candidate, diff full-vs-emptied, keep the stop whose figures actually move pixels. **Do not
  hand-derive which instances are visible — render them and count.** (Header law: "when a pixel probe
  of a 3-D scene reads weakly, suspect occlusion first." It applies to choosing the *subject* too.)
- **⚠ THE AGENT'S `FAIL` WAS CORRECT AND ITS DIAGNOSIS WAS WRONG — AGAIN (iter 110's law, in the
  visual gate).** It reported "bunting/pennants, not people," and concluded the feature didn't work.
  The feature worked; the *stop was behind a building*. Take the observation ("I can't see figures"),
  throw away the explanation, go measure. Note the failure mode `probe-vis.mjs` now covers: I would
  have shipped a false `FAIL` and reverted a good iteration.
- **THE QUEUE IS A ZOOM-IN REWARD, AND NOW THERE IS A NUMBER FOR IT.** `probe-vis.mjs` sweeps the
  camera: figures move **2–4 px at fit zoom (0% of shelters)**, become readable at **zoom 4 (53–63%)**,
  and **plateau at 63–73% by zoom 8** — the plateau is the ~30% that are permanently occluded. So this
  buys nothing in the un-zoomed frame the census and the wide shots live in, and it is *not* a
  regression either: the painted figures it replaces were equally sub-pixel. Worth knowing before the
  next lap spends itself on ornament at this scale. **The artifact invites zoom ("scroll to zoom");
  the whole-city gate can neither convict nor acquit anything drawn at 3 px.**
- **A "DEEPEN" THAT MEASUREMENT TURNS INTO A DIFFERENT VECTOR IS STILL A GOOD LAP.** The intended
  change (real peds ride buses) was structurally impossible against a tuned constant, and one probe
  said so in ten minutes. The shipped change closes the *same* gap from the other side. Recording the
  dead branch matters more than the live one: **`peds` cannot serve the road network — their leash is
  anchored to open ground by design.** Any future "residents use transport" vector must either move the
  anchor (spawn pool) or accept ~25% coverage. Don't rediscover this.

## Iteration 112 — the trains stop where the platforms are (2026-07-10)

**Vector** — Transport × **Deepen**. Rotation named the domain: Transport (105) was the stalest safe
pick (Sky 95 is staler but is a documented trap). The header pointed at the kind too — *"109's trick
(close a gap between two existing objects) is still unspent in Transport"* — and this lap cashes it.
I logged it as **Deepen, not Connect**, because Connect had already paid in 109 and 111 and the bulk of
the change is a *motion-model fix*, not a join; calling it Connect a third time would have misreported
the rotation the header exists to protect.

**The seam.** Every monorail station drew riders under its canopy with the intent "waiting for the next
train" — and the train never came. `stepAnim` was one line: `tr.p += dt*s*0.014`, forever, straight
through every platform. The buses had dwelt at their stops since long before the ledger (iter 111 gave
them somebody to wait for). The trains never had.

**Two defects found by probing, not by reading.** `probe-rail.mjs` (written before any design):

| seed 7 | line 0 | line 1 | line 2 |
| --- | --- | --- | --- |
| spans `L` | 89 | 2 | 90 |
| `stops.size` — **what the tooltip reported** | 15 | 1 | 14 |
| **real, drawn stations** (`countAround(...)>=3`) | **8** | **0** | **11** |
| overstatement | 47% | 100% | 21% |

1. **`p` is a fraction of the loop, so ground speed scaled with loop length.** Every line lapped in
   exactly 71 s whatever its size: seed 7's 89-span line ran its trains at 1.25 spans/s and its 2-span
   line at 0.028 — **45× apart, identical hardware.**
2. **"Station" was written three times and meant three things.** The draw gated on neighborhood density;
   the tooltip and the hovered-route pips counted raw `stops`. Lines claimed up to twice the platforms
   they drew, and pipped bare track. A *fourth* copy lived in `monoStationCells()` (the census metric).

**Change.** ~60 lines. `railStations()` computes `m.sta` (the station set) and `m.staP` (where a train
must stand) once per tick; the draw, the pips, the tooltip, the census metric and the train all read it —
iter 111's `stopQueue` shape. `stepTrains()` gives a train a **ground** speed (`MONOSPD=1.25` spans/s,
capped at `MONOCAP` so a 2-span loop can't spin), brakes it into each station, stands it `MONODWELL=3.2 s`,
and pulls it away. `railQueue()` empties the platform as the train stands — the riders slide to the post
and fade — then refills it a rider at a time. Car spacing moved from `0.011` of a lap to `1.0` **span**,
so the three cars no longer mush together on short lines (unchanged on long ones by construction).

**⚠ The first easing curve was linear, and it was silently catastrophic.** `e = d/B` tripled the lap
(**210 s vs 71 s**) and *still* left three lines reading as three speeds. The time to cross a brake zone
under a linear ramp is `∫dx/(V·x/B)`, which **diverges** — the train spent its lap pinned at the 0.10
floor. `sqrt` (constant deceleration) integrates to `2B/V`. Census: blind. Three visual agents: blind.
Only `probe-train.mjs`, measuring spans/sec, could see it. Now, with sqrt:

| | seed 7 L=89 | seed 7 L=90 | seed 1234 L=66 |
| --- | --- | --- | --- |
| ground speed while moving | 0.882 | 0.793 | 0.977 spans/s |
| lap | 127 s | 150 s | 80 s |
| standing | 20.4% | 24.4% | 15.9% of the time |
| **middle car ↔ platform when stood** | **0.0000** | **0.0000** | **0.0000 spans** |
| closest two trains ever | 16.1 | 23.3 | 26.1 spans |

Every uncapped line now cruises at the same 1.25 spans/s; the residual spread is the deliberate lap-time
cap on stubby loops. Trains never overlap (no signalling needed — each accrues the same dwell per lap, so
phase is preserved). **Held the mean (iter 98's law):** riders/platform 1.88→1.65, 1.55→1.41, 2.00→1.67,
1.75→1.54 — a 9–17% *reduction*, so the platforms breathe rather than gaining clutter.

**Census — PASS.** `pop −3`, `greenRoofs −1`, **everything else `+0`**; tile histogram empty; entity counts
unmoved; 0 page errors. Anim/draw-only, no `rng()`, no terrain. The `±3` is the load jitter iter 108
documented on *identical pristine code*. **`stations: 40 → 40` is the real check**: the census computes that
metric from a copy of the predicate I rewrote, and it reproduced the old set exactly.

**Perf — PASS, controlled against pristine HEAD in the same session** (iters 99/104). Min-of-3, sequential:
mine day **33.67** / night **38.05 ms**; pristine HEAD the same session day **33.89** / night **38.11 ms**.
**−0.22 ms — free**, and plausibly real (a platform sometimes draws 0 riders where it always drew `cap`).
The +1.5% the baseline file reports is today's machine load. Baseline (day 33.16 / night 37.33) **not** re-pinned.

**Visual — PASS, 3/3 agents, on frozen-clock filmstrips.** `probe-station.mjs` staged approach → standing →
departed → refilled by poking only `tr.p`, `tr.dw` and `c.mlast` at one instant, so every other pixel is
identical by construction (iter 111's law). All three agents volunteered that the backgrounds were
pixel-identical, all three confirmed the middle car lands under the canopy and the platform empties and
refills, and all three read the whole-city frame as *"a balanced, beautiful coastal city… no clutter or
darkening."*

**Tooltip** (per the sync invariant): now reads `m.sta`, so a train says *"Line 1 of 3 — a 89-span loop with
**8 stations**"* (was "15 stations"), a stubby loop says *"…with no station yet"*, and a standing train adds
*"Standing at a platform."* The hovered-route pips now land only on real platforms. `__rail()` gained
`stations`/`stops`/`standing` for probing.

**Verdict: SHIPPED.**

### Findings

- **⚠ A NORMALIZED PARAMETER SILENTLY ENCODES PATH LENGTH.** `p += k·dt` over a variable-length path makes
  ground speed proportional to length. It hid for 112 iterations because *one* line looks fine — the bug is
  only visible when you compare two instances, which no screenshot of one city ever does. **The gondola has
  it too, measured: 0.14–0.36 spans/s, and seed 42 runs two cable lines at 0.36 and 0.18. Open cue (h).**
- **⚠ THE INTUITIVE EASING CURVE IS THE DIVERGENT ONE.** See above. Worth stating as a rule because the next
  "slow down as it approaches X" vector (ferries docking, cable cars at terminals — cue (h)) will reach for
  `d/B` again. Use `sqrt(d/B)`. Any floor you add to rescue a linear ramp is a confession that it diverges.
- **⚠ A DEAD RULE (107) AND A RULE READ BY THREE DISAGREEING CALLERS ARE THE SAME DEFECT CLASS.** 107 audited
  a rule that never fired. This one fired, but "what is a station?" had four independent implementations and
  two of them were wrong. `grep` for a predicate's other readers before trusting the one in front of you. The
  cheap tell: a derived quantity (`stops.size`) being used where a *filtered* one is meant.
- **AN ELEVATED FEATURE PASSES THE VISIBILITY LAW TRIVIALLY.** Iter 111 had to hunt for a bus shelter that
  wasn't behind a building (~30% were). All **19** stations here moved 1595–3590 px in the approach-vs-departed
  diff. Things drawn at `RAILH=40` are above the rooftops. Unlike 111's 3 px queue, **a stopping train is
  legible in the un-zoomed frame** — this lap bought something the whole-city gate can actually see.
- **THE PROBE THAT KILLED THE FIRST DESIGN WAS 40 LINES AND RAN IN 90 SECONDS.** `probe-train.mjs` reported
  ground speed, lap time, standing fraction, middle-car offset and train separation. Every one of those
  numbers was needed: the offset proved the snap, the separation acquitted the missing signalling, and the
  speed convicted the easing curve that both other gates had passed. **When a change is about MOTION, neither
  a still frame nor a tile histogram is a gate.** Write the probe.

## Iteration 113 — the marsh answers its own tooltip (2026-07-10)

**Vector** — Water & coast × **Deepen**. Rotation named the domain: Water (106) was the stalest *safe*
pick (Sky 95 is staler and a documented trap). The header also named the content: iter 109's banked
"Sky-feedable" list is `VINEYARD`, `MEADOW` seed-heads, **`MARSH`** — deepening another domain toward
Sky is the sanctioned way to feed Sky without a sky feature. Kind is Deepen, not Connect: Connect had
already paid three laps running (109/111/112).

**The seam.** `T.MARSH`'s tooltip calls it a *"Reedy tidal wetland"* and — since iter 97 — prints a
**live `Tide` reading on that very hex**. The draw was two fixed ellipses and seven reed strokes. The
city told you the tide on a tile that had never once moved with it. Same shape as 111 (a shelter that
never met a bus) and 112 (a platform that never met a train): *close a gap between two things that
already exist.*

**Measured before designing** (`probe-marsh.mjs`, tracked). Clock frozen (`playing=false`) so only
`TIDE` could move a pixel:

| | pristine | after |
| --- | --- | --- |
| marsh mean luminance, TIDE 0 → 1 | **151.5 → 151.7** | **135.0 → 153.0** (seed 42) |
| | | **140.4 → 155.7** (seed 1234) |
| pixels changed across the cycle | ~0 (0.7% = neighbour bleed) | **61–74%, monotone at every step** |

The 0.7% pristine "movement" was the neighbouring BEACH's damp margin leaking into the sample box —
i.e. the beach *did* answer the tide and the marsh did not.

**The design was decided by geometry, not taste.** First attempt breathed the two pools with the tide.
It moved **3.9%** of the hex at half tide, because a marsh hex is **23.4 × 15.6 screen px** and its pools
are **~4 × 2 px**. Scaling them harder changed nothing. So the **flat** answers instead: the hex body
lerps toward `soil` on the ebb (exposed wet mud), a permanent mud bed is laid under each pool for the
water to shrink inside, and a thin `colA('water')` sheet is drawn over everything above TIDE 0.60.
That is a whole-hex response, and it is what took the change from 3.9% to 72%.

**Change** (`case T.MARSH`, ~30 lines, draw-only):
1. body `= lerp(meadow, soil, ebb*0.42)`, `ebb = clamp((0.58-TIDE)/0.58)`; pools shrink to 0.34× inside a
   fixed 1.22× mud bed; flood sheen above TIDE 0.60.
2. reeds keep a calendar — `green` peaks midsummer and **wraps cleanly** (`1-|s-0.42|/0.34`), lerping
   `sage → straw`, then `→ stubble` by a winter term; `rlen` drops 38% at deep winter.
3. cue **(g)**: the three reed `hashCell` salts now mix `seedNum`. The old lean salt was
   `hashCell(x,j,7)` — **no `y` at all**, so every marsh hex in a column leaned identically.
4. new URL hook **`?tide=0..1`** (`__setTide`), which shifts the cycle's *phase* so the sea keeps
   moving from there rather than freezing.

**Census** — `pop/roads/developed` and all 22 metrics **exactly +0**, both before and after the salt fix.
Tile histogram empty, as intended: this deepens a tile's draw, it does not move a tile. Draw-only, no
`rng()`, no terrain.

**Perf** (run because this lap adds per-frame draw work — iter 109's law, not the step-back's):
min-of-3 day **33.83ms** / night **38.16ms** vs baseline 33.16/37.33 → +2.0% / +2.2%, inside the band
109/110/111 measured for *pristine* HEAD (33.33 / 33.49 / 33.78). PASS. Not re-pinned.

**Visual** — tide: **PASS** on the zoomed pair ("a genuine drained tidal mudflat… birds picking over wet
mud"; high water "broken into per-tuft reflective patches, not a solid rectangle"). Whole-city, 3 frames,
2 seeds: **PASS**, explicitly *"not a repeat of the kelp failure"* — the low-tide marsh reads as a natural
estuary, and the city is no darker at dead low than at high water. Reed calendar: **two agents returned
FAIL, and they were substantially right** — see findings.

**Verdict — SHIPPED.** The tide is the feature and it is verified three ways. The reed calendar and the
salt fix ride along at zero cost (+0 census, +0 perf) but are **below the resolution at which this loop
can see anything**; they rest on the pixel probe alone, and I have logged that rather than dressing it up.

### Findings

- **⚠ THE CONSPICUOUS THING ON YOUR TILE MAY BELONG TO SOMEONE ELSE (new; extends iter 111's law).**
  111 taught that *"not drawn"* and *"drawn but occluded"* are the same screenshot. Here: **"your ornament"
  and "a neighbouring entity" are the same screenshot.** Two agents and *I* read the pale vertical shapes on
  the marsh as reeds. They are a **heron** (`herons`: 54 in the census). The reeds are seven sub-pixel
  strokes bunched around the pool. **The instrument:** back up the file, set the ornament's `strokeStyle`
  to `'#ff00ff'`, shoot, revert (census confirms the revert). One 200×180 crop settled what four agent
  reads and three probes could not. Do this *before* believing any account of a few-pixel ornament —
  including your own.
- **⚠ CUE (g)'s AUDIT GREP HAS A BLIND SPOT, AND THE CUE'S COUNT IS WRONG.** The pattern
  `hashCell\([^)]*,[[:space:]]*(0x)?[0-9]+\)` matches only a **bare integer** salt, so every `k+90` /
  `j+40` / `r*3+cc+50` form is invisible to it. It reported "4 remain"; the superset
  `grep -oE 'hashCell\([^;]{0,60}' solvista.html | grep -v seedNum` finds **13 lines / 16 calls** that
  are genuinely a function of `(x,y[,j])` alone — kelp sway (L2799), palm fronds (L2832/2834), orchard
  fruit (L3248/3249), **park fireflies (L3423)**, L3610/3613, L5113/5117, plus the surf presence test
  (L2747). Two of the marsh's own three offenders were never counted. **Generalizes iter 107:** an audit
  is bounded by its instrument — a rule can be dead because nothing reaches it, and a breach can be
  invisible because the grep can't spell it.
- **⚠ A REED-PIXEL COUNT IS A CONTRAST MEASURE, NOT A HEIGHT MEASURE (extends iter 104).** Classifying
  "pixels far from the body color" counted **winter highest (20.3/cell)** while winter reeds are **34%
  shorter** — sage reeds on green meadow barely contrast; straw reeds on a muted winter body contrast
  hard. Switching to geometry (topmost reed pixel, dpr 8) did not rescue it either: a 0.8px antialiased
  tip is *detected only when it contrasts*, so the detector's sensitivity varies with the very quantity
  under test, and the ordering flipped between seeds. **Height is drawn but unverifiable at this scale;
  color is verified** (G−R: spring **+9/+12** → dry **−10/−9** → winter **−1/−2**, consistent on 2 seeds).
  When a proxy correlates with your independent variable, it cannot grade it.
- **⚠ MASK A TILE PROBE TO THE HEXAGON — A SQUARE BOX AROUND A 23×16 px HEX EATS ITS NEIGHBOURS.**
  The first reed probe sampled a 14×14 box and confidently reported reed colors of `R−B ≈ +60`. That is
  **sand**: the box spilled onto the BEACH, and beach sand is bright and tawny — indistinguishable from an
  autumn reed by any color test. `probe-reed.mjs` (tracked) carries the point-in-hex mask
  (`|dy| <= V-(V-E)|dx|/X`, shrunk 14% off the antialiased rim); reuse it for any per-tile pixel claim.
- **A `hashCell` SALT *RANGE* CAN COLLIDE WITH ITSELF.** Writing `seedNum^(0x9EE1+j)`, `seedNum^(0x9EE2+j)`
  and `seedNum^0x9EE3` looks like three independent salts and is not: at `j=2` the first *is* the third, so
  two reed quantities became perfectly correlated. Verified by evaluating `hashCell` in-page at a fixed
  cell across seeds. Space the bases (`0x9E01+j`, `0x9E41+j`, `0x9E81`). Note this is safe to fix after the
  fact **only because the vector is draw-only** — iter 107's "never pick a salt after seeing the census"
  binds terrain rules, whose salt perturbs the `rng()` stream. Here census is +0 for every salt.
- **`?tide=` IS NOW A URL HOOK — the sea is finally testable, and every prior shot was a lie about it.**
  Exactly iter 108's `?year=` story: a whole dimension of the diorama that no screenshot in this loop's
  history could pin. Note the free-running default is *seeded*: `?seed=42` loads at **TIDE 0.02 — dead
  low water** (`(seedNum%31)*0.4` → 4.4 rad). Implemented by phase-shift, not by clamping `TIDE`, so the
  tide keeps cycling from where you put it. Use `.02 / .35 / .59 / .98` for low / mid-ebb / neutral
  (no sheen, no mud tint — the right pin for grading anything *else* on a marsh) / high.
- **OPEN CUE (i) — the marsh reeds do not read, and that is a `polish-tile` job.** Seven strokes in a
  ~10×4-unit huddle around the pool contribute almost nothing to how the hex reads; the tile is "green hex
  with a pool". Spreading/lengthening them is a tile redesign, out of scope for a growth lap. The reed
  calendar is already wired and would pay off immediately if the reeds themselves were made legible.

## Iteration 114 — the square that had nowhere to go (2026-07-10)

**Vector** — Civic & culture × **Polish**. Rotation named the domain (Civic 107 was the stalest *safe*
pick; Sky 95 is staler and a documented trap) and the header named the content: **banked cue (d)**,
"the civic quarter deserves a real square", open since iter 91. Kind is Polish, not Deepen — Deepen had
paid 3 of the last 6 laps.

**The seam.** Cue (d) prescribed the implementation: *"2–3 contiguous `PLAZA` cells fronting several
institutions… scope it to `MAJORK` cells that have ≥2 other `MAJORK` within 4 hexes."* I built exactly
that: a 2024+ pass that finds a quarter member's forecourt and annexes one adjoining `FORECOURT_LOT`
that fronts a street; a `plazaPatch()` used by rule *and* tooltip (iter 112's one-predicate law); a
`c.sq` head/annex role so the head keeps the rosette, statue and bunting while the annex draws open
paving, benches and a night lamp; and a tooltip that names the square and the institutions it fronts.

**Census said the rule never fired.** `pop −3`, tile histogram **empty**. (The `−3` is iter 108's load
jitter: after reverting, the same code re-censused at `pop +0` exactly.)

**Measured why** (`probe-square.mjs`, tracked — conjunct-survivor method from `probe-market.mjs`):

| | seed 7 | seed 42 | seed 1234 |
| --- | --- | --- | --- |
| `PLAZA` patch sizes | **[1, 1, 1]** | **[1, 1]** | **[1, 1, 1]** |
| majors · quarter members | 6 · 4 | 6 · 3 | 6 · 4 |
| quarter members **with a forecourt** | 2 | 1 | 3 |
| …of those, with an **eligible annex lot** | **0** | **1** | **0** |

Every plaza in the artifact's entire life has been a **single hex**. And the annex has no host, because
a forecourt is **a road junction**. Across the 6 quarter-member heads, their 36 neighbour slots are
**ROAD 16 (44%)** · CIVIC 7 · QUAD 4 · PARK 3 · ROCK 2 · TOWER 2 · MID 1 · COM 1. Only **2 of 36** are a
pavable `FORECOURT_LOT`, and only **one** of those fronts a street — seed 42's town hall, which then
lost the `hashCell < 0.85` roll. The rule fired **zero** times in three cities.

**Then I asked the next lap's question before closing.** A throwaway build (ROAD allowed as an annex,
gate wide open, backed up + reverted) grew real squares: `PLAZA 8 → 19`, `ROAD −9`, `COM −1`,
`pop −810` (−0.52% for 11 cells — matching iter 101's measured 0.045%/cell almost exactly). Two visual
agents on two seeds: **PASS** both. The 3-hex square reads as *"one coherent paved square… annexes look
like plaza, not blank"*, no street dead-ends into it, whole-city frames clean. At **fit zoom** it is
*"findable but modest — a distinct pale patch… though it could be missed on a fast scan."*

**Verdict — EXPLORED → REVERTED.** Cue (d)'s *goal* is sound and now demonstrated; cue (d)'s
*prescription* is dead. Shipping the lot-based rule would have shipped a pass that fires on one
institution in one of three cities. Retuning the gate to `0.95` to rescue that one host is precisely the
move iter 107 forbids (never pick a salt or probability after seeing the census), and it would have
bought noise, not a feature. The road-based version works and is beautiful — but it is a **different,
unvalidated rule with an unaudited blast radius**, and choosing it after reading a census is the same
forbidden move one level up. It belongs to a lap that starts from the hazard list below, not to this one.

`solvista.html` is byte-identical to HEAD. Pristine control census: `pop`, `roads`, `developed` **+0**,
tile histogram empty.

### Findings

- **⚠ A FORECOURT IS A ROAD JUNCTION — THERE IS NO LOT BESIDE IT (new; extends iter 100).** Iter 100
  proved *the cell between two clustered majors is the street they both front*. The sharper fact: the
  forecourt's **entire neighbourhood** is street. It is sited to front the loudest one (`c.flow`), so by
  construction it is ringed by roads — **44% of its neighbours**, against **5.6%** pavable lots. Worse,
  the two rules are **eating each other's hosts**: the grounds pass (iter 100) takes the back lot for its
  `QUAD` (4 of 36 slots), so the forecourt's only non-street neighbours are the green its own institution
  earned. **Any "extend the civic square" vector must take the ROAD, or it has no host at all.**
- **⚠ A 3-HEX PAVED BLOB *DOES* READ AT FIT ZOOM — iter 101's law, confirmed from the positive side for
  the first time.** 101 established that below ~2–3 hexes a corridor is untraceable *at any ΔL*, and it
  died proving the negative (a 1-hex greenway ribbon, ΔL 22–35, nine agents could not trace it). Here a
  3-hex **blob** of the same paving was found unprompted by both agents at fit zoom. Width, not contrast,
  was always the variable. **The corollary matters for planning: cue (d) is worth a lap, and its minimum
  viable size is 3 — a 2-hex square would sit on the edge of the law.**
- **⚠ A PER-HEAD "GROW TO N" GUARD DOES NOT PREVENT A MERGE — AND A MERGED SQUARE HAS TWO CENTREPIECES
  (new).** `if(plazaPatch(head).length>=3)continue;` is evaluated per institution, so two majors 2–3
  hexes apart each grow toward the other and their patches **join**. Measured on the throwaway: seed 1234
  produced a **5-hex patch carrying 2 heads** — two fountains, two rosettes, two sets of bunting inside
  one square. Any future patch-growing rule needs a **demote-on-merge** step (keep the lowest-idx head,
  set the rest to annex), not just a size cap.
- **⚠ THE AGENT CREDITED A NEIGHBOUR'S ORNAMENT — AGAIN, AND ON A DIRECT YES/NO QUESTION (iter 113's law
  fires unprompted).** Asked point-blank *"do you see more than one fountain/statue/rosette in this
  square?"* on the frame that **provably had two**, the agent answered *"only ONE centrepiece region — the
  orange dome"*. The dome is an **institution**, not a plaza centrepiece. A 20-line `page.evaluate` that
  flood-fills each patch and counts `!c.sq` settled it in one command (`3hex/1head · 5hex/2head`). 113
  said agents mistake a neighbour's entity for your ornament; add: **they will do it while answering the
  exact question you asked to prevent it.** Never accept an agent's *count* of anything.
- **A RULE WITH ONE HOST ACROSS THREE SEEDS IS NOISE, NOT A FEATURE.** The temptation on reading
  `annexLots: 0/1/0` is to loosen a threshold until it fires. That inverts the census's purpose: the
  histogram was reporting *the design is starved*, not *the gate is too tight*. The `hashCell<0.85` roll
  that killed seed 42's only host is a red herring — with the gate at 1.0 the rule still fires **once**,
  in **one** city, on **one** institution.
- **HAZARD LIST FOR THE ROAD PIVOT (for whoever takes cue (d)).** Cars are **safe**: `stepVehicle` picks
  from `roadNbrOpts` each hop and reverses at a dead end (`if(!opts.length){v.nx=lx;v.ny=ly}`) — there is
  no global path to break. Unaudited, and all of them read `ROAD`: **trams and the monorail/gondola lines**
  (drawn along road cells), **`c.stop`** (bus stops — the throwaway already excluded these and `c.bridge`),
  **`c.flow`** drainage and the `ARTFLOW` arterial classification, **`frontSide()`** (reads ROAD neighbours,
  so paving one can flip an institution's front on a later tick), **boulevard trees**, **`c.hstr`**.
  Budget a lap for the audit, not an afternoon. `roads` is a **core** census metric — the throwaway's
  `−9 / 5786` (−0.16%) is comfortable, but a wider rule could approach the 5% collapse gate.
- **`probe-square.mjs` and `shot-square.mjs` are `git add -f`'d** (iter 101's law: an untracked probe the
  ledger cites does not exist). The probe reports plaza patch sizes, per-major forecourt status and the
  head's neighbour composition; the shooter finds the **largest patch** by flood fill and wheels the
  artifact's own camera onto its centroid — reuse it for any *"does this multi-hex patch read?"* claim.

## Iteration 115 — the city keeps its lights on downtown (2026-07-10) [holistic step-back]

**Vector** — Sky & atmosphere × **Polish**. Rotation named the domain: Sky was the stalest (95) and had
been stalest for twenty laps, parked because it is *additively* saturated. This lap is the way past that —
it adds nothing. Kind is Polish (make what exists read better), not Deepen: Deepen had paid 3 of the
last 7 laps. The content was chosen by the step-back's own agents, not by me.

**The step-back found it.** Three un-zoomed whole-city agents (seeds 42/7 day, seed 42 night). Both day
frames PASS. **The night frame FAILED**: *"lighting has no hierarchy — uniform window-light density
everywhere makes the city read as one flat glittering mat instead of a skyline with a luminous core
fading to dark residential edges."* Independently, the seed-7 **day** agent reached the same place from
the other side: *"87 towers sprinkled almost evenly across the whole landmass with no skyline logic…
the skyline has no focal massing."* Two agents, two frames, one claim: **the city has no centre.**

**But that is a "which is more X" claim, and iter 108's law says agents invert those.** So it was measured
before a line was written (`probe-nightcore.mjs`, `git add -f`'d).

**The cause was in the source, not the pixels.** `drawBuilding`'s only window-light term is
`lit=LITAMT*(0.35+0.65*c.lit)`, and `c.lit` had **exactly one writer** — `genWorld`'s
`lit:hashCell(y,x,seed)`. Per-cell white noise. The night light field was, by construction, independent
of downtown, density, value and height:

| | seed 7 | seed 42 | seed 1234 |
| --- | --- | --- | --- |
| `corr(c.lit, dist-from-CBD)` **before** | **+0.008** | **−0.013** | **+0.056** |
| mean `c.lit`, rings 0-4 → 22-40 | 0.42 → 0.52 | 0.62 → 0.51 | 0.46 → 0.50 |
| `corr(c.lit, dist)` **after** | **−0.806** | **−0.827** | **−0.776** |
| mean `c.lit`, rings 0-4 → 22-40 | **0.81 → 0.27** | **0.90 → 0.26** | **0.83 → 0.25** |
| `corr(c.lit, th)` before → after | −0.008 → **0.088** | 0.015 → **0.068** | −0.071 → **0.052** |

**Change.** Once the founding fixes `CBDX,CBDY`, one pass over the grid moves the **mean** of `c.lit`
along a smoothstep falloff and keeps the existing seeded draw as the **variance**:
`c.lit = clamp(0.18 + 0.70·smoothstep(1−d/LITR) + (c.lit−0.5)·0.5, 0, 1)`.
Driven by **position alone** — never height or type, so a building still does not wear its height twice
(iters 103/110); the guard is `corr(lit, th)`, which stayed at 0.05–0.09, far below the 0.35 decoupling
line. New constant `LITR=34`, deliberately **not** `CORER=16`: over half of every city's buildings stand
beyond hex 22 from the CBD, so reusing the tower-siting radius would have pinned the whole outer city at
one dim value and merely moved the flatness outward. No new `hashCell`, no new salt, no `rng()` draw.

**Census** — `pop`, `roads`, `developed`, `towers`, `parks` all **+0**; tile histogram **empty**;
`greenRoofs −1` is iter 108's documented load jitter (salted on `(year*31)|0`), not this vector. Exactly
the draw-only signature. VERDICT: PASS.

**Visual** — 3 agents, all PASS. Rather than ask "is the core brighter?" (the question 108 says they
invert), each night agent was asked to **locate downtown by light alone** and the answer checked against
ground truth. Blind, both hit it within ~2% of the frame:

| | agent's centre | true CBD | error |
| --- | --- | --- | --- |
| seed 42 | (0.47, 0.50) | (0.49, 0.51) | ~33 px |
| seed 7 | (0.50, 0.62) | (0.48, 0.63) | ~33 px |

Seed 7's core is **not** at frame centre (y=0.63), so that is a discriminating hit, not "guess the middle".
Both confirmed the rim still reads as buildings (no black void) and that light still varies
building-to-building — *"dark unlit blocks sit right beside brightly lit towers even in the core"* — so it
reads as a city, not a painted vignette. The day agent confirmed **no** lighting effect at midday.

**Perf** (step-back gate, min-of-3, sequential): day **33.83ms** · night **38.55ms** vs baseline
33.16/37.33. Day is *identical* to the pristine control taken at the head of this same session (33.83ms).
The bake is one-time in `genWorld`; `drawBuilding` is untouched, so per-frame work is unchanged. Readings
rose monotonically across the three passes (33.83→34.44→34.89) — load, not code (iters 99/104). Not re-pinned.

**Verdict — SHIPPED.** The stalest domain in the city was fixed by *removing* a defect, not adding a feature.

### Findings

- **⚠ TWO PAGE LOADS ARE NOT THE SAME INSTANT — the same-frame law has a second half (new; extends 109).**
  109 said: freeze the sim, toggle only your feature, and every other pixel is identical *by construction*.
  What it did not say is **where** the two frames must live. The first cut of `probe-litdiff.mjs` diffed a
  pristine build against the patched one across two `page.goto`s and reported **5.6% of DAY pixels changed**
  — including at `t=0.44`, where `LITAMT` is *exactly 0* and the feature provably cannot draw. The probe was
  lying: `frame()` runs on rAF from the moment of load, so between `goto` and `evaluate` a variable number of
  frames tick the sim, drift the clouds (`syncSky` takes `performance.now()`) and step every vehicle. **The
  tell was self-contradiction: re-running the identical comparison gave 89408 px, then 89633 px.** A
  deterministic diff that changes between runs is measuring the harness. Fixed by doing the A/B **inside one
  page**: render, mutate the field in place, render again, restore. Day went to **0 px changed, exactly**,
  and night to 6.6% (dusk 4.9%). *If a probe of a frozen scene is not bit-exact, do not reach for a
  tolerance — find what is still moving.*
- **⚠ A SINGLE-READER, SINGLE-WRITER DRAW FIELD IS THE SAFEST THING IN THIS ARTIFACT TO CHANGE (new).**
  `grep -n '\.lit'` returned three lines total: the write, the read, and an unrelated `dl.lit`. That
  three-line grep is what licensed the whole vector — a field no CA pass reads cannot perturb the seeded
  stream, so `pop` was *guaranteed* flat before the census ran, and it was. The mirror of 107's dead-rule
  law: **107 says grep a rule's writers before trusting it; this says grep a field's readers before fearing
  it.** Combined with `LITAMT=0` at midday, the change was provably day-invariant *and* census-invariant
  before a single gate was run. Look for the other one-reader draw fields (`c.v`, `c.dist`) when a Polish
  lap needs a guaranteed-clean ship.
- **⚠ ASK AN AGENT TO *LOCATE*, NOT TO *COMPARE* — and check it against ground truth (new; the practical
  answer to 108's law).** 108 established agents are reliable for "is it broken" and unreliable for "which
  is more X", and left the loop with no way to visually grade a *magnitude*. There is one: convert the
  comparison into a **localization**, then verify it numerically. "Is the core brighter?" is unanswerable
  and invites flattery; "point at the brightest concentration, in fractional coords, or say NO CENTRE" is
  gradeable against `ctr(CBDX,CBDY)·scale+off`. Two agents landed within 33 px of a CBD they were never
  told. **Give the agent an escape hatch** ("NO CENTRE is a completely acceptable answer") or the hit means
  nothing — an agent that must name a point will always name one. This generalizes to any vector with a
  known location: a square, a lung, a depot, a line.
- **THE NIGHT WAS THE ONLY FRAME THAT KNEW.** Two day agents passed the same city the night agent failed,
  and the census, the tile histogram and the perf gate were all blind to a defect present in every city
  ever generated. The loop has taken ~114 whole-city reads and, until this one, **essentially all of them
  were by day** — the same blind spot that hid the January-only shots until iter 108 and the dead-low-water
  shots until 113. **Shoot the step-back at night too; it is a different city.**
- **Banked cue (j) — the night windows verge on stripe-noise** *(Urban fabric, or a `polish-tile` job)*. The
  same night agent, second complaint: across the dense core the yellow window rows are *"extremely dense and
  repetitive — they buzz as horizontal-stripe noise rather than individual lit windows, especially on the mid
  towers."* This lap dimmed the periphery, which relieves it at the rim but **not downtown, where the fix
  made rows brighter**. Distinct from this vector (per-window density inside `drawBuilding`'s band draw, not
  the light field), so it was left alone. Take it with `probe-litdiff.mjs`'s in-page A/B.
- **Banked cue (k) — the open water is the least-resolved third of the frame** *(Water & coast)*. **Both**
  day agents, unprompted and independently, named the sea: *"a large flat teal wedge — no wave detail, reefs,
  wake trails, or depth gradient… it carries a disproportionate share of canvas for how little it resolves"*
  and *"the entire right third is flat teal… compared to the hyper-dense land it reads as dead space."* Two
  independent agents converging unprompted is the strongest cue signal this ledger has. Note both also called
  the scattered offshore turbines/boats *"randomly salted rather than sited"* — so the answer is likely
  **depth/texture in the water field**, not another floating object.
- **`probe-nightcore.mjs` and `probe-litdiff.mjs` are `git add -f`'d** (iter 101's law). `probe-nightcore`
  reports, per seed, `corr(lit,dist)`, `corr(lit,th)` and mean `c.lit` + mean sampled luminance per distance
  ring — reuse it for *any* "does this field follow the city's structure?" claim. `probe-litdiff` is the
  general **same-instant A/B**: freeze, render, mutate in place, render, diff. It is the right instrument for
  any change whose blast radius you want to bound in pixels rather than argue about.
