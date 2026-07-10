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
| **Nature** | 4, 26, 29, **102** | 1, 13, 60 | 37, 46, 67, 76, **108**, **120** | ~~46~~, ~~88~~, ~~101~~ | U4 | 53, 96 | **117** |
| **Water & coast** | 6, 10, 12, 16, 20, 33, **106** | 90 | 17, 25, 51, 65, 72, **113** | 22 | | U2, 44, 58, 79, **116** | **97** |
| **Urban fabric** | 32, 62 | 7, 23, ~~82~~ | 38, 54, 68, 92 | 47, **109** | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103**, **110**, **118** | |
| **Transport** | 2, 9, 21, 31, 48 | 77 | 28, 39, 55, 63, **112**, **121** | 5, 15 | U4 | U1, U3, 70, 85, 87, 94 | **105** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107** | 36, 59, 66, 80, 91 | 45 | | 73, ~~**114**~~ | 52, **122** |
| **Sky & atmosphere** | 27, 43 | | 19, 35, 50, 57, 95 | | | 61, 81, 89, **115** | |
| **People & activity** | 41, 56 | 49 | 34, 64, 93, **104**, **119** | 78, **111** | | 84 | 71 |

- **Interaction/UX kind:** tile tooltip (U2, user-directed) + **entity
  tooltips (iter 42)** + **Est./Built years in tooltips (iter 52, Civic-led)**
  + **hover focus ring (iter 71, People-led)** + **census stats that can fall
  (U5: tallest / density / solar share / transit reach / walkable)**
  + **the coast names itself (iter 97, Water-led: pier/stall/ferris wheel,
  esplanade, lifeguard tower, dune `Sand`+`Marram grass`, live `Tide`)**
  + **the transit lines name themselves (iter 105, Transport-led: hovering a monorail train or
  cable-car cabin names its LINE — "Line 3 of 3 — a 183-span loop with 30 stations" — and traces the
  whole route across the city, pipped at its stops)**
  + **the woods name their own stand (iter 117, Nature-led: `Stand — N hexes` by live flood fill,
  `Canopy Closed/Thickening/Open edge` read from the draw's own `k`, `Undisturbed ~N yr`,
  `Old growth since`, `Deep woods`, `Mushrooms up`, `Burning`, and a live
  `Wildflowers In bloom/Gone over/Not in flower`)**
  + **the institutions name themselves (iter 122, Civic-led: `CIVICDESC` gives all 12 kinds their own
  sentence, drawn from each one's siting rule; `Civic quarter — N institutions` by `siteQuarter`'s own
  `MAJORK`/`QFAR`; `Fronts a paved forecourt` / `Keeps its own grounds behind`, and the squares answer
  back with `Forecourt of — Town hall` / `Grounds of — Museum`; `One of — 4 schools`)**.
  When adding an entity array: `stamp()` it in its draw + add an `ENTINFO` row
  (same discipline as the census hook). `stamp()` now also draws the focus ring,
  so any stamped entity is ringable for free — **but a TILE has no ring, see cue (l)**.
  **An `ENTINFO` `sub` may be a
  FUNCTION of the entity (iter 105)** — use it when a thing's interest is its
  *membership* (which line / route / depot), computed live, not a stored string.
- **ROTATION.** Last vector per domain:
  Sky **115** · Water **116** · Urban **118** · People **119** · Nature **120** · Transport **121** · Civic **122**.
  **Stalest is now Sky (115)** — but read its trap note below before taking it — then **Water (116)**, which is
  the better pick because it holds the board's cheapest live cue: **turbine siting on `rDeep`** (116's last
  finding). **122 took the then-stalest domain (Civic) and cashed the tell banked in the list below**, exactly
  as 121 cashed cue (h) and 119 cashed 111's finding: three laps running where *the header told the iteration
  what to do*. That is the loop working. **Urban also now holds a fresh banked cue from 122: ghost `c.solar` on
  paved squares still inflates `solarRoofs` and still nudges the adoption CA** — see 122's third finding; it is
  a metric-moving fix and wants its own lap.
  And **Transport's next lap has cue (n)** (121, measured, pre-existing): both cable cars sit within **one span of
  the anchor tower at page load**, on every line and every seed, because the growth rescale telescopes `p→0` — so
  no cabin is ever seen riding *over* the city without `&step=`. Re-spread the cabins once `L` reaches `g.target`;
  do **not** touch the rescale, which is correct for a growing line.
  **120 broke rotation deliberately and
  logged why**: it was the mandated holistic step-back, the step-back found a real defect, and the skill's own
  rule ("if something compounded badly, spend the next iteration FIXING it") outranks rotation. A step-back
  that finds a defect and then ships an unrelated vector has wasted the step-back. **Every domain except Urban and
  Sky now has an Interaction/UX vector**; Urban's remaining Interaction/UX territory is cue **(l)**, since
  **118 closed cue (j)**.
  **119 took People × Deepen, its FULLEST cell, and was right to** — because 111 had already *measured*
  and banked the vector there (move the ped spawn pool). **A banked, measured finding outranks both
  kind-rotation and cell-emptiness**; the grid says what is *untried*, not what is *most wanted*. Check
  the last entry of the stalest domain for a banked finding before reading its row.
  **⚠ 118 declined the header's own "coldest kind" steer, and was right to.** The header said *New element*;
  118 first grepped the Urban draw and found its additive moves **spent** (cranes, helipads, masts, skybridges,
  lofts, solar/green roofs, terraces, neon, podia — full inventory in 118's last finding). Saturation beats
  kind-rotation: when a domain's additive cell is exhausted, the kind changes, not the domain. Read the
  inventory before proposing an Urban **New element**.
  **Sky's twenty-lap staleness is spent** — 115 took it *without* adding anything, which is the
  documented way past its additive saturation (surveyed iter 103; its empty `New CA rule` cell remains a
  **trap, not an invitation** — sky is not cellular, and fog on terrain is already `rSea`/`fogAt`).
  **Cue (k) is CLOSED by 116** (the sea has a depth field), but only its *field* half — 116's last
  finding banks the **siting** half, and it is the cheapest good vector on the board: `turbSet` is
  scattered by `hashCell` into water of any depth, and there is now an `rDeep` to found it on.
  (Still open after 117 and 122, which went to Nature and Civic by rotation. **Water is now second-stalest
  and Sky is a trap, so this is the next lap's most likely pick.**)
  Civic's banked **cue (d)** was attempted at
  114 and **reverted**: its goal is proven (a 3-hex square reads at fit zoom) but its prescribed
  host does not exist — see the rewritten cue below before re-opening it.
  **Iteration 125 is the next holistic step-back** (105, 110, 115, 120, …), and per 115's finding it must be
  shot **at night as well as by day**: 115's night frame failed on a defect present in every city ever
  generated, which ~114 daytime whole-city reads, the census and the perf gate had all missed. **120 also
  shot the SEASON** (`&year=`) and that is what caught its defect — a whole-city read in January can never
  see a seasonal bug, and January is the default. **Add a seasonal frame to every step-back.**
  Iter 111 was People × Connect and used
  109's trick (close a gap between two existing objects); iter 112 **cashed the same trick in
  Transport** (trains ↔ their own stations) and iter 113 cashed it a third time in **Water** (the
  marsh ↔ the tide its own tooltip printed). **That shape has now paid in four domains — assume it is
  spent, and look for the gap-closing seam only where a tooltip/label already ASSERTS a relationship
  the draw ignores.** (That is the reliable tell: 111 a shelter, 112 a platform, 113 a live `Tide`.)
  **117 cashed the tell a fifth time and it is now the loop's most reliable move**: `TILEDESC` claimed
  *"Old-growth redwoods"* and *"Wild grass and wildflowers"* while `describeTile` printed only `Value`,
  though the CA had tracked `c.age`/`c.fire`/`c.bloom`/`c.shroom` since 1974. **Where else does a string
  assert what the code already knows?** **122 cashed it a sixth time** (`CIVICLABEL`'s one sub for twelve
  institutions) and found the tell is **self-renewing**: cashing it *created* a new one, since
  `TILEDESC[T.PLAZA]` still says only *"A paved civic square"* for a square that now knows its institution.
  Un-cashed: `TILEDESC[T.KELP]` *"swaying in the shallows"*, `[T.IND]` *"warehouses and light industry"*,
  `[T.VINEYARD]` *"terraced"*, and the plaza/quad **titles** (still the generic tile label — they could
  read *"Town hall forecourt"* outright).
  **122 also warns what the tell CANNOT do alone:** its first build derived ownership from *adjacency*, named
  the wrong institution on 2 of 3 seeds, and **passed the census and would have passed both visual agents** —
  the prose is only wrong if you know the geometry. **A tooltip vector needs a probe that checks the claim
  against independently recomputed truth, not just a screenshot that it renders.**
  Note iter 108 was Nature × Deepen but its
  *content* was a Sky interconnect (the farm calendar reads `applySeason`'s `year`) — **Sky can be
  fed by deepening another domain toward it**, which is the way out of its saturation that does not
  require a sky feature. **113 did this again** (the marsh reeds now read `year`), leaving 109's
  Sky-feedable list at `VINEYARD` and `MEADOW` seed-heads. **120 was a third instance** (the park lawns
  now read `year`) — and note it found `MEADOW` is only **6 tiles city-wide**, so a meadow vector buys
  almost no pixels. Sky-feedable list is now effectively `VINEYARD` seed-heads alone.
  Recent kinds: 111 Connect · 112 Deepen · 113 Deepen · 114 Polish (reverted) ·
  115 Polish · 116 Polish · 117 Interaction/UX · 118 Polish · 119 Deepen · 120 Deepen · 121 Deepen ·
  122 Interaction/UX — **122 broke Deepen's four-lap run, as the header demanded.**
  **Polish has paid 5 of the last 12; do not open with one**, and Interaction/UX has now paid twice in
  six. The coldest kinds are **Scale** (a
  structural lever, not a lap move) and **New element** (last: 106) — but note 118's finding that a
  *saturated* domain cannot take a New element; pick the domain first (Water, 116) and read its
  row before choosing. **Connect** (last 111) is live and cheap: its trick is to add no new object.
  **Connect paid three times** (109, 111, 112 — 112 logged as
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
  lap. **The gondola had it too, and cue (h) is CLOSED by iter 121** — measured worse than 112 banked
  (cruise spread **2.83×**, 0.24–0.68 spans/s, every line turning round in exactly 50.0s), now **1.00×**.
  **Count the legs when you port the fix:** on the closed monorail loop `p=1` is one lap (`rate=SPD/L`);
  on the open ping-pong gondola it is a **round trip** — two legs — so `rate=SPD/(2*(L-1))`. Miss the 2 and
  you ship a uniform speed that is uniformly half of what you meant, and every gate here passes it.
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
  iters 100–104 and reported ~+6% before your change existed. Do not re-chase it. Still valid at iter
  **117** (pristine-HEAD control, interleaved: day **35.11ms** / night **39.45ms**; the patched file read
  day **34.33** / night **39.22**). Not re-pinned.
  **⚠ 117 CORRECTED 99's DIAGNOSTIC.** The old rule read *"a **stable** pass-over-pass offset means code,
  a **rising** one means load."* **The stable half is FALSE**: machine load is autocorrelated over
  minutes, so three passes inside one loaded window are three samples of *one* draw. Iter 117's gate read
  **+25.5 / +26.0 / +26.5%** — perfectly stable — on a diff with **zero draw calls**, and the identical
  bytes read **+3.5%** twenty minutes later. **Never grade frame time by consecutive passes at all.** The
  only sound reading is **interleaved A/B/A/B against pristine HEAD** (swap `solvista.html` between every
  pass, min per variant) — and brace the shell interpolation, because `/tmp/$v117.html` silently measures
  one variant six times. 99's *remedy* (control against pristine HEAD, not the baseline file) stands, and
  "code" may still be earlier iterations' code. Re-pin at a step-back whenever the offset survives an
  interleaved control; `polish-tile` owns the file, so say so in the entry rather than re-pinning silently.
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
  **(l) a hovered TILE gets no focus ring, only entities do** *(Interaction/UX — banked iter 117)*.
  The ring at L367 is drawn from `stamp()` and keys off `hoverEnt`, which `pickEntity` leaves `null`
  whenever the cursor is over bare ground: iter 71 gave the ring to *stamped entities* only. So every
  tile tooltip in the artifact's history — U2's, 97's coast, 117's woods — names a hex the frame never
  points at, and on a dense grid at fit zoom you cannot tell which hex it means. Two agents noticed
  independently once asked. A hex-outline ring (reuse `hexTile`'s path at `1.02`, stroke, no fill) is
  the obvious shape and it is **draw-per-frame**, so it needs the perf gate — but it is one stroke.
  Beware the false positive: 117's first visual gate *asked* for a tile ring and got a `VISUAL: FAIL`
  for its absence, which is a prompt bug, not evidence the ring is owed. Take this only as its own vector.
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
  **~~(j) the night windows verge on stripe-noise~~ — CLOSED BY ITER 118.** The band was a continuous glowing
  ribbon with one notch punched in it; it now draws only its lit panes and lets the prism's own wall be the
  mullion. Horizontal gradient energy **+38…45%**, mean tone held **+1.8…2.6%**, night frame **+5.1%**, day frame
  byte-identical. Two night agents independently confirmed *"a grid of windows"* and *"the stripe noise is gone."*
  Grade any successor with `probe-winband.mjs` (|dI/dx| vs |dI/dy|), not `probe-litdiff.mjs`.
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

> **Archive:** the 115 entries before Iteration 113 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

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
- **~~Banked cue (k)~~ — CLOSED BY ITER 116 (the field half). The SITING half is still open** — see 116's
  last finding: the turbines/boats are still salted into water of any depth, and `rDeep` now exists to
  found them on the `Coastal shelf`. Original cue, kept because its wording is what made it actionable:
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

## Iteration 116 — the sea gets a bottom (2026-07-10)

**Vector.** Water & coast × Polish. The stalest domain (106/113), cashing **banked cue (k)** — the
strongest signal in this ledger, two independent day agents at 115's step-back naming the open sea
unprompted: *"a large flat teal wedge — no wave detail, reefs, wake trails, or depth gradient"* and
*"the entire right third is flat teal… it reads as dead space."* Both also called the scattered
offshore objects *"randomly salted rather than sited"*, so the cue prescribed **depth/texture in the
water field, not another floating object.** That prescription was taken literally: this vector adds
**no new object, no tile type, no entity, no CA pass.**

**Change.** The sea was drawn `hexTile(gx,gy,1.02,col('water',1))` — one constant, every hex, since
the artifact began.
- **`rDeep` — a new derived field, and `rSea`'s exact mirror.** `rSea` floods *from* wet cells *into*
  land (the fog's gate); `seaFill()` floods **from land into water**. So a hex's value is its true
  distance offshore: it bends around headlands, keeps the harbor and the bay shallow, and never lets
  the river run deep — **all three for free, from one BFS, with no special-casing.** Filled beside
  `reachFill(rSea,…)` at tick cadence. Uncapped, deliberately: a cell left at 0 would read as *shoal*,
  not as far-offshore (the capped first draft did exactly that).
- `seaT` caches the drawn tone (eighths) alongside the depth, so the two-octave `hashCell` seabed is
  computed **once per tick, not once per hex per frame**.
- `colMix(n1,n2,t,f)` — a tinted blend of two palette colors, sharing `col()`'s cache. New, reusable.
- Tooltip: open water now prints **`Depth: Shoals / Coastal shelf / Open water / Deep water`**, beside
  the live `Tide` iter 97 gave it. The draw shows the field; the hover names it.

**The tuning failure, which is the transferable part.** The first build blended `water→waterDk` and
darkened the sea's mean luminance **153.4 → 139.8 (−8.9%)**. Every gate would have shipped it: census
flat, and three visual agents would have called a darker sea *"moody"*. **That is the kelp failure mode
exactly** — a third of the canvas, drifted dark, one iteration at a time. Two causes, both worth knowing:
- **A clamped depth ramp is not a centered one.** `DEEPR=9` against a measured **mean depth of 6.6**
  (range 1..19) pinned most of the sea at *fully deep*. Measure the field's distribution **before**
  choosing the constant that normalizes it; `DEEPR=10` puts mean tone on 0.50.
- **Hold the mean by CONSTRUCTION, not by tuning** (iter 98's law, applied to a surface). Rather than
  blend `water→waterDk` and hand-tune a brightness ramp back up, place the two endpoints
  **symmetrically about `water`**: `waterSh/waterDp = water ± 0.8·(water−waterDk)`. Their midpoint *is*
  `water`, so at mean tone 0.5 the mean is unchanged **algebraically** — only the variance can grow.
  Result: mean **153.4 → 152.4 (−0.62%)**, spread **6.8 → 19.1 (×2.8)**. `waterDp` is kept a shade
  lighter than `waterDk` so the kelp beds stay the darkest thing inshore.

**Census.** PASS. `pop 154918→154915 (−3)`, `roads +0`, `developed +0`, tile histogram **empty**, every
entity count identical. Exactly as predicted before running it: `grep -n rDeep` returns one writer and
only draw-side readers, so by iter 115's single-reader law the vector **could not** perturb the seeded
stream. The `−3` pop / `+1` greenRoof are iter 108's documented load-dependent salt jitter, not this change.

**Probe.** `probe-seatone.mjs` (**`git add -f`'d**, per iter 101). Samples the real canvas at every
open-sea hex centre (3×3 disc) and joins the **live** `rDeep` via a new `window.__deep` hook — it grades
the tone against the field that picks it rather than reimplementing `seaTone()` (iter 110's law).
Pristine control is `git show HEAD:solvista.html`, **never `git stash`** (iter 108).

| seed | n | mean lum | spread (sd) | corr(lum, depth) |
| --- | --- | --- | --- | --- |
| 7 | 644 | 153.5 → 151.8 | 8.22 → 19.81 | **−0.874** |
| 42 | 655 | 153.3 → 153.1 | 5.72 → 18.71 | **−0.903** |
| 1234 | 662 | 153.2 → 152.3 | 6.14 → 18.71 | **−0.897** |

**Visual.** 3/3 PASS across 6 frames — seed 42 + seed 7 (wide + `coast` clip), **seed 42 at night**, and
seed 1234 at **high tide** in spring. Agents independently and unprompted confirmed the two things the
BFS was supposed to buy and that no probe can see: the gradient *"bends correctly around the
pier/headland and the harbor"* and *"stays shallow up the river."* No banding, no contour lines, no
blocky patches, no hex seams. Night: *"deep desaturated navy, not a dead black void… stays distinctly
bluer than the night sky, so the horizon separation holds."*

**Perf.** PASS, and **perf-neutral**. Min-of-3, patched: day **34.61ms** / night **39.11ms**. But the
absolute numbers rose between batches, so per the ledger's law a rising offset was controlled against
**pristine HEAD under the same load, measured immediately after**: day **33.89ms** / night **38.55ms**.
The +0.72ms residual is *smaller than pristine's own 1.05ms drift within its own batch* — noise, not code.
Baseline **not** re-pinned. Caching `seaT` at tick cadence is what keeps this flat: the per-frame draw is
still exactly one `hexTile` fill, now from a 9-entry color cache.

**Verdict — SHIPPED.** Cue (k) is **CLOSED**: the sea has a bottom. Note what it did *not* cost —
no tile type, no entity, no `rng()` draw, `pop` provably flat before a gate was run.

**Findings for later laps.**
- **⚠ HOLD A SURFACE'S MEAN BY GEOMETRY, NOT BY A BRIGHTNESS RAMP (new; iter 98's law, generalized).**
  To add contrast to a large surface without drifting its tone, do **not** blend `base→dark` and correct
  with a per-step brightness factor — that is a two-parameter fit you will tune against a probe until it
  passes. Place the endpoints **symmetrically about the original color** (`base ± A·(base−dark)`) and the
  mean holds *algebraically*, for any amplitude `A`, with `f=1` at every step. One free knob (`A`), zero
  fitting, and the cache stays tiny. This applies to any future re-tone of the sky, the forest, or the roofs.
- **⚠ NORMALIZE A FIELD BY ITS MEASURED DISTRIBUTION, NOT BY ITS NAME (new).** `DEEPR` looks like "how
  deep the deep is" and invites a guessed constant. It is really *the divisor that decides where the mean
  lands*, and a wrong guess saturated 60% of the sea against the clamp — a **−8.9%** mean shift, invisible
  to census and flattering to agents. **Histogram the field first** (`/tmp/dhist.mjs` shape: `__deep()` →
  bin by `d`), then solve for the constant. Any future `(v−a)/K` tone map has this trap.
- **`rSea` HAD A MIRROR NOBODY HAD WRITTEN (new).** The BFS that measures "how far inland am I" run
  backwards measures "how far offshore am I", and *the second one respects every piece of coastal geometry
  the first one does* — headlands, harbors, the bay, the river — because it is the same flood. Before
  hand-rolling a distance heuristic (`x − shoreAt(y)` was the obvious wrong answer: it ignores headlands
  and would have run the **river** to full depth), check whether an existing `reachFill` inverts.
  `reachFill()` itself could **not** be reused — it hardcodes `WETSET.has → skip` as its wall.
- **`window.__deep` IS A PERMANENT HOOK** — every wet hex with `{x,y,d,tone,riv,sx,sy}`. Use it for any
  "does this tone/entity/rule follow depth?" claim, and as the histogram source for the law above.
- **THE OFFSHORE OBJECTS ARE STILL "RANDOMLY SALTED" — cue (k) closed only the *field* half** *(Water &
  coast)*. Both 115 agents said it; this lap answered the tone and left the siting. **Now there is a field
  to site them against**: turbines belong on the `Coastal shelf` (`rDeep` 3–5, where they are actually
  founded), not scattered into `Deep water`. `turbSet` is laid in `genWorld` from `hashCell` — gate it on
  `rDeep` and the wind farm sites itself. Cheap, draw-adjacent, and it makes the new field *mean* something.

## Iteration 117 — the woods keep books nobody could read

**Vector.** Nature × **Interaction/UX**. Nature was the stalest domain (last touched 108) and its
Interaction/UX cell was **empty**; Interaction/UX was a cold kind (last 105) while the header warned
Polish had paid 4 of the last 7 and Deepen 3 of the last 9. The tell the header prescribes for a
gap-closing vector — *"look for the seam only where a tooltip/label already ASSERTS a relationship the
draw ignores"* — is met exactly here: `TILEDESC[REDWOOD]` says **"Old-growth redwoods"** and
`TILEDESC[MEADOW]` says **"Wild grass and wildflowers"**, and the CA has always tracked `c.age`,
`c.fire`, `c.bloom` and `c.shroom` per cell while `describeTile` printed **`Value` and nothing else**.

**Change.** Hovering a woodland or meadow hex now reports the state the diorama was already
simulating. In the 105 lineage (a thing's interest is its *membership*, computed live):
- **`Stand — N hexes`** on FOREST/REDWOOD: the contiguous wood it belongs to, flood-filled on hover.
- **`Canopy — Closed / Thickening / Open edge`** on FOREST, read from the **same `k`** the draw uses to
  decide scrub-at-the-edge and the 3rd/4th tree.
- **`Undisturbed — ~N yr`** on FOREST; **`Old growth since <year>`** on REDWOOD.
- **`Deep woods — sheltered enough for old growth`** when the succession precondition holds.
- **`Mushrooms up`** (`c.shroom>0`), **`Burning`** (`c.fire>0`), and on MEADOW
  **`Wildflowers — In bloom / Gone over / Not in flower`** (`c.bloom`, live like `Tide`).
- `T.BURNT` gained the `TILEDESC` it never had, plus `Burnt — ~N yr ago`.

Three inline predicates were extracted so one definition has all readers (iter 112's `stopQueue`
shape): `isWood`, `canopyK(x,y)` (draw + tooltip), `deepWoods(x,y)` (`tick()`'s old-growth pass +
tooltip). **No draw code was added.** `git diff` contains *zero* lines with a `ctx.`/`fillRect`/
`hexTile`/`col(` call.

**Census.** `VERDICT: PASS`, exit 0, pageerrors 0. `pop 154915 → 154911 (−4, −0.003%)`, `roads +0`,
`developed +0`, **tile histogram empty**. Exactly right: no terrain write, no `rng()` draw, no new
`hashCell`. The ±4 is iter 108's load-jitter (`(year*23)|0` salts), not the feature — a first census
run on the same code read `pop +0 / greenRoofs −1`, the second `pop −4 / towerHt −1`.

**Probes.** `probe-woods.mjs` (**`git add -f`'d**) hovers real tiles via `__find`'s screen coords,
scrapes `#tip`, and checks every claim against ground truth — including an **independent Node-side
flood fill** of the stands, so the tooltip's `Stand` number is graded by different code than produces
it. **415 wood hexes across seeds 7/42/99/1234/3: 0 disagreements.** Canopy tiers spread on every seed
(seed 42: Closed 24 / Thickening 28 / Open edge 17). `shot-woods.mjs` (**`git add -f`'d**) is the tile
analogue of `hovershot.mjs`, which can only aim at entities.

**Visual.** 2 seeds × (redwood + forest + meadow hover, zoom 4) + un-zoomed whole city.
Seed 1234 `VISUAL: PASS`. Seed 42 first returned `VISUAL: FAIL` on **two claims, both wrong** — see
findings. Re-shot with a corrected prompt: `VISUAL: PASS`. Both agents independently called the
whole-city frame balanced and the woodland stands coherent.

**Perf.** Interleaved A/B against pristine HEAD, min-of-3: patched **day 34.33ms / night 39.22ms**,
pristine **day 35.11ms / night 39.45ms**. The patched file is marginally *faster* (sharing one
`isWood` arrow removes a per-hex closure allocation in `countAround`). Baseline **not re-pinned**.

**Verdict — SHIPPED.** The oldest CA in the artifact finally says what it has been computing since
1974. Zero pixels, zero tiles, zero pop.

### Findings

- **⚠ A STABLE PASS-OVER-PASS OFFSET DOES *NOT* MEAN CODE — it means the load was stable too (iter 117
  corrects iter 99's law).** 99 taught: *"a **stable** pass-over-pass offset means code, a **rising** one
  means load."* The perf gate here read **+25.5% / +26.0% / +26.5%** day across three passes — textbook
  "stable ⇒ code" — and it was **pure load**. Minutes later the **identical bytes** read day
  **34.2/35.0/35.3ms** instead of **41.6/41.8/41.9ms**. Load on a shared machine is *autocorrelated over
  minutes*, so three passes inside one loaded window are three samples of one draw, not three draws.
  **Three consecutive passes are not an independent control at any spread.** The only sound reading is
  **interleaved A/B/A/B against pristine HEAD** — swap the file between every pass, take the min per
  variant. 99's own remedy (control against pristine HEAD) was right; its *diagnostic* was wrong and
  would have sent this iteration hunting a nonexistent +26% regression in a diff containing no draw calls.
- **⚠ `for v in patched pristine; do cp /tmp/$v117.html …` SILENTLY MEASURES ONE VARIANT SIX TIMES.**
  `$v117` parses as the variable `v117`, not `${v}117` — every `cp` failed, `solvista.html` was never
  swapped, and the A/B printed six plausible, subtly-different numbers for the *same file*. It looked
  like a clean result. Brace your interpolations, and **make the swap fail loudly** (`|| exit 1`);
  a perf harness that silently compares a thing to itself is worse than no harness. (The accident is
  what exposed the load finding above, but only because the numbers disagreed with the earlier window.)
- **⚠ A LEADING QUESTION IN THE VISUAL PROMPT MANUFACTURES A `VISUAL: FAIL`.** I asked the agents
  *"does the tile under the cursor visibly show a focus/hover ring?"* — a feature that **has never
  existed for tiles**. The ring at L367 keys off `hoverEnt`, which `pickEntity` sets to `null` on a bare
  tile; iter 71 gave the ring to *stamped entities* only. Seed 42's agent dutifully failed the gate on
  its absence. **The gate can only answer questions about what is in the frame; a prompt that presumes a
  feature will get that feature reported as missing, or hallucinated as present.** Re-prompted without
  the presumption, the same PNGs passed.
- **⚠ AND THE SAME AGENT'S "STRAY FLOATING SPRITES" WERE 4×-MAGNIFIED WILDFLOWERS — measured, per iter
  106.** Seed 42 reported *"small floating orange+purple squares … a minor z-order/floating-tile
  artifact"*; seed 1234, on the same change, reported *"no z-order tears, no floating tiles."* Two agents
  in direct contradiction ⇒ settle it with a number (iter 108). `probe-fleck.mjs` counted pixels matching
  `col('gold',1.1)` = **rgb(255,174,59)** and `col('lav',1.05)` = **rgb(189,153,191)** on a frozen,
  un-hovered canvas: **pristine HEAD gold 11 px / lav 11 px, patched gold 11 / lav 10** — and **272
  `EMPTY` lots** request a fleck (`default:` draw case, `c.age>12 && c.v<0.2`). They are the succession
  wildflowers that have always been there, resolved into squares by the camera. **At zoom ≥4 every 1–2 px
  ornament in this artifact becomes a square, and an agent will call squares an artifact.** Say so in the
  prompt, or shoot the hover at zoom ≤2.
- **A PIXEL DIFF CANNOT VALIDATE A REFACTOR HERE — but a NUMERIC one can, and it is strictly better.**
  PNG bytes of pristine vs patched differ; so do **pristine vs pristine** (entities move during the
  1.2 s load, iter 111's ~14%-of-canvas law), so byte-equality is not a test. Instead, prove the
  *extracted predicate* equals the *inline expression it replaced*, in-page, over the whole grid:
  `canopyK(x,y) === countAround(x,y,1,n=>n.t===T.FOREST||n.t===T.REDWOOD)` and the same for `deepWoods`.
  **0 mismatches over 3367 in-bounds cells × 2 seeds.** That, plus a `git diff` containing no `ctx.` line,
  proves the frame is unchanged *by construction* — no screenshot required. **Reach for this whenever a
  lap extracts a predicate; it is cheaper, decisive, and immune to entity motion.**
- **`deepWoods` on FOREST is an EARLY row, not a dead one — a third case for iter 108's triage.** 108
  divided ~0-reading rules into *dead* (`MARKET`, unreachable), *late* (`GARDEN`, gated `year>=2008`) and
  *transient* (`BURNT`, `age>6`). This is the mirror of *late*: measured on seed 42, forest hexes passing
  `deepWoods` go **11 (1985) → 6 (2005) → 0 (2035)** — not because the rule starves, but because the deep
  hexes **mature away into `REDWOOD`**. A snapshot at the census's newest era reads 0 and looks dead. The
  page loads at `year=1974` and runs forward, so the row is alive exactly where a *user* is. **Before
  deleting a row that reads 0 at 2035, check whether its host is being consumed by a downstream rule.**
- **`c.age` MEANS "since last turnover", AND `genWorld` STARTS EVERY CELL AT `age:0`.** The first draft
  labelled the forest row `Regrown ~61 yr ago`, which is a **lie about the woods that never turned over**:
  61 yr is simply the age of the world (1974→2035), and an original `genWorld` forest hex has never
  regrown. Relabelled `Undisturbed ~N yr`, which is true whether the hex is primeval, logged-and-regrown,
  or newly matured — all three reset `age`. Any future vector printing `c.age` on a *natural* tile has
  this trap; `describeTile`'s own `est` comment ("age dates the CURRENT structure") only ever contemplated
  buildings.
- **VERIFY A CONDITIONAL ROW BY *INJECTING* ITS STATE — the CA's own luck is not a test.** `Mushrooms up`,
  `Burning`, `In bloom` and `Gone over` never fired under `__warp`: blooms are seeded by **rain clouds**,
  and clouds are advanced in `frame()`, not `tick()`, so **no amount of warping ever rains**; mushrooms
  live 3 ticks inside a `year%1 ∈ (0.76,0.98)` window. `?year=` + hand-driven `tick()`s still produced
  0 of each. What iter 117 ships is the **state→row mapping**, not the CA — so set `c.bloom=7` /
  `c.shroom=3` / `c.fire=3` on a known on-screen hex, `render()`, hover, and assert the row appears
  (4/4 ok). **A row you cannot make fire is a row you have not tested**, and reaching for a rarer seed or
  a longer warp is the slow way to not test it.
- **NEXT.** Cue **(k)'s siting half** is still the cheapest good vector on the board (gate `turbSet` on
  `rDeep` 3–5 so the wind farm sites itself on the coastal shelf) — but Water was 116 and Nature is now
  117, so it wants **Urban (110)**, **People (111)** or **Transport (112)** first by rotation. New cue
  **(l)** below. **Iteration 120 remains the holistic step-back**, and must be shot at night as well as day.

## Iteration 118 — the windows stop being stripes (2026-07-10)

**Vector.** Urban fabric × **Polish**, cashing **banked cue (j)**. Urban was the stalest domain (110)
and the header's steer was *"the coldest kind is New element"* — I did not take it, and the reason is
the more useful half of this entry. Before designing anything I grepped the Urban draw for what is
already there: **tower cranes (two of them), rooftop helipads, aviation masts, glass skybridges, brick
loft conversions, solar roofs, green roofs, roof gardens, stepped terraces, neon sign bands, chimney
smoke, retail podia, 4 forms × 5 bodies = 20 tower looks.** Urban's additive moves are *spent*, which
is exactly the saturation condition SKILL.md says to answer by changing the **kind**, not the domain.
Against that, cue (j) is a defect **two independent holistic agents named unprompted** (iters 94, 115).
A banked, twice-observed visual defect in the stalest domain outranks kind-rotation, and 120 is the
next holistic step-back — which 115 ruled must be shot **at night**. Fix it before it is graded.

**Change.** One function replaces a pair, at all **8** facade-band sites (RES · MID · COM · TOWER×4 styles).
- The old band was `bandR(…colLit('glass'…))` — a continuous glowing ribbon across the whole face —
  followed by `darkWinR`, which punched **one** notch, into only 64% of faces. The ribbon was the
  dominant mark; that *is* the stripe noise, and it had been the shape of every lit facade since the
  artifact began.
- `winBandR` draws **only the lit panes**, in one path, and lets the prism's **own wall** stand between
  them. That is what a mullion is. A pane nobody is home in is simply *not drawn*. `n` = `round(X/hb)`
  clamped 2..4 keeps panes roughly square at any band height, from a RES window strip to a ziggurat setback.
- `colWin(f,litMix,a,k)` — new, cached exactly like `colLit`. Lifts the surviving panes so the band's
  **mean tone is held by construction** (iter 116), never tuned back afterwards.
- `darkWinR` deleted. Night-only: below `LITAMT<0.35` the day frame draws the band it always drew.

**Census.** PASS. `pop 154918→154915 (−3)`, **every other metric exactly +0**, tile histogram **empty**,
every entity count identical. Predicted before running: the vector touches no `rng()`, no terrain, no
`hashCell` a rule reads — it cannot perturb the seeded stream. The `−3` is iter 108's documented
load-dependent `(year*23)` salt jitter.

**Probe.** `probe-winband.mjs` (**`git add -f`'d**). Frozen instant (`playing=false`), pristine side is
`git show HEAD:solvista.html`, never `git stash` (iter 108). Samples each `__twr()` tower's facade box.

| seed | mean lum (tone held?) | \|dI/dx\| (windows, not stripes?) | \|dI/dy\| |
| --- | --- | --- | --- |
| 7 | 88.0 → 89.9 (**+2.1%**) | 11.57 → 15.93 (**+37.8%**) | +2.2% |
| 42 | 90.0 → 91.6 (**+1.8%**) | 11.71 → 16.97 (**+45.0%**) | +2.8% |
| 1234 | 86.0 → 88.2 (**+2.6%**) | 10.91 → 15.45 (**+41.6%**) | +4.8% |

Day control: **0.0% on every column, all three seeds** — the `LITAMT` short-circuit, falsified rather
than asserted.

**Perf.** PASS. Interleaved A/B/A/B vs pristine HEAD ×3 (iter 117's law), min per variant: day
**identical** (34.89 vs 34.89), night **39.22 → 41.22ms = +5.1%**. Against the 37.33ms pin that is
+10.4%, inside the 15% tolerance; pristine itself read 39.22 under the same load, so the offset is
earlier iterations' code and the load of the hour, not this vector. Baseline **not** re-pinned
(`polish-tile` owns it).

**Visual.** 2/2 PASS, seeds 42 and 7, wide + `downtown` clip, **at night** (`t=0.88`). Both agents,
independently: the panes read as *"a grid of windows"* / *"vertical stacks of separated yellow
rectangles… the old continuous-ribbon stripe noise is gone"*; no seams between adjacent panes, no
clipped-white windows, no z-order tears; downtown *"about right — bright enough to be the focal point
without blowing out."* Seed 7's agent added, unprompted: *"the discrete panes actually **reduce** the
former glare/clutter."*

**Verdict — SHIPPED.** Cue **(j) is CLOSED**. It cost no tile type, no entity, no `rng()` draw, and
the day frame is byte-identical.

**Findings for later laps.**
- **⚠ HOLD THE MEAN OF WHAT WAS ON SCREEN, NOT OF THE IDEALIZATION YOU REPLACED (new; extends iter 116).**
  The first build solved `(1-a)v + a·dk == lm` — hold the mean of the *solid ribbon* — and came out
  **+5.1 / +4.5 / +5.6% BRIGHTER** on the three seeds. Cause: the band it replaced was never the solid
  ribbon; it already had a notch punched in it, so it was ~10% dark. Compensating to the idealization
  over-brightens by exactly that notch. Carry the pristine dark share `k` into the solve —
  `(1-a)v + a·dk == (1-k)·lm + k·dk` — and `k=a` leaves the colour untouched while `k=0` recovers the
  naive lift. **Before compensating for what you remove, measure what was already missing.**
- **⚠ ON CANVAS THE COST IS THE RASTER, NOT THE `fill()` CALL — and BATCHING MADE IT WORSE (new).**
  Measured, on the night frame, against pristine: build every quad and never fill → **+0.8%**. Fill one
  token quad per building → **+0.0%**. Fill ~5 extra anti-aliased *sheared* quads per band → **+14%**.
  Then the obvious optimisation — queue every dark quad and flush **one** path per building — went to
  **+14.9%**, i.e. *worse*, because a many-subpath path rasterizes across its whole bounding box. Fill
  calls are free; **filled area and anti-aliased edges are not.** Do not reach for path batching to fix
  a canvas perf problem. Reach for **drawing less**: the fix that landed at +5.1% was to stop painting a
  ribbon and punching it, and instead paint only the lit panes, letting the wall that was *already
  drawn* be the mullion. This is iter 109's connector law in another costume — **a mullion you have to
  draw is a mullion you got wrong.**
- **⚠ GIVE EVERY PERF COMPARISON AN IN-RUN INVARIANT COLUMN (new; sharpens iter 117).** This change is
  night-only and *provably* leaves the day frame byte-identical, so `perf.mjs`'s **`day` column is a
  free load detector**: any pass where `day` moves is a loaded pass whose `night` cannot be read. It
  caught a reading of day **41.22ms** / night **48.78ms** — both garbage — that in isolation looked like
  a catastrophic regression and would have killed a good vector. 117 said *never grade frame time by
  consecutive passes*; the constructive form is **arrange for one column that must not move**, and throw
  out any pass where it does. Most vectors can find one (a scene, a seed, an era the change cannot reach).
- **`probe-winband.mjs` IS THE INSTRUMENT FOR "did this surface change STRUCTURE without changing TONE?"**
  Mean luminance answers tone; **mean |dI/dx| vs |dI/dy| answers structure** — a ribbon has almost no
  horizontal gradient, panes have a lot. *"Reads as windows, not stripes"* is thereby a number. No visual
  agent can settle that claim (iter 108) and the census is blind to it. Adapt it for any future re-tone
  or re-texture of a large repeated surface (roofs, hulls, the sky).
- **URBAN FABRIC'S ADDITIVE INVENTORY, so nobody re-proposes it** *(the iter-34 beach-towel lesson)*.
  Already drawn: tower cranes on rising civics **and** rising towers, rooftop helipads (+copters), aviation
  masts, glass skybridges between adjacent towers, brick loft conversions with arts-district sign bands,
  solar roofs, green roofs, roof gardens, stacked terraces, ziggurat gold trim, neon sign bands, sawtooth
  warehouses with working stacks, chimney smoke, retail podia under towers. **`GROWTH.md` is the loop's
  memory, not the artifact's inventory** — grep the draw case before designing an Urban element.

## Iteration 119 — the residents move downtown (2026-07-10)

**Vector.** People & activity × **Deepen**. People was the stalest domain (111) and the header steered
away from Polish (5 of the last 9). Iter 111 had already *measured* and banked the vector: residents
structurally cannot serve the road network, *"to do it properly you must move the **spawn pool**
(`openCells` in `syncFleet`), not the leash."* Nobody had measured what moving it buys, or costs.
It adds no new object, no tile, no `rng()` draw — the Connect trick applied to a system, not a pair.

**What the probe found before a line was written** (`probe-anchor.mjs`, `git add -f`'d):
- `openCells` is **54% coastline by area** (BEACH+DUNE+SHOREPARK), so a uniform draw houses the
  population at the seaside. Seed 7 anchors **81 of 130 residents on sand and exactly 4 downtown**
  (3 MARKET, 1 QUAD) — across **6075 developed cells and 5786 roads**. The city Solvista builds is
  not the city its people live in.
- The crowd is also a **fossil**: `syncFleet` is called from `tick()` (L1758), so peds spawn
  progressively as the city grows and **never re-site**. A resident anchored to the 1985 beach is
  still on it in 2035.
- The probe reproduces 111's headline number exactly (stopCov **25.0 / 31.3 / 20.0%** vs its
  "20–31%"), which is what licenses trusting its other columns.

**Change.** Two edits, one idea: *an anchor is the cell a resident lives on.*
- `syncFleet` builds `kerbCells` beside `openCells` — ROAD, not a bridge, `buzz>=KERBBUZZ(2)`. That is
  buzz's sparse tail (~110 hexes against ~510 of open ground): a kerb fronting shops or institutions.
  Residents draw from `openCells.concat(kerbCells)`; **dogs keep the open-ground pool**, since an owned
  dog heels to its human and reaches the kerb through them while a stray keeps `stepDog`'s park roam.
- `stepPed`'s re-anchor test `strollable` → `homeGround` = `strollable || livelyKerb`.

**Census.** PASS. `pop 154918→154915 (−3)`, **every other metric exactly +0**, tile histogram **empty**,
`dogs 90` identical. Predicted before running: peds draw the same *number* of `rng()` values from a
longer array, so no seeded draw downstream (dogs, boats, birds, shuttles) moves. The `−3` is iter 108's
documented load-dependent `(year*23)` salt jitter.

**Probe.** Pristine side is `git show HEAD:solvista.html`, never `git stash` (iter 108).

| seed | coast% | kerb% | stopCov | anchorBuzz | street% *open-ground residents* |
| --- | --- | --- | --- | --- | --- |
| 7 | 62.3 → **51.5** | 0 → **17.7** | 29.2 → **50.0** | 0.292 → **0.685** | 20.0 → 19.6 |
| 42 | 66.9 → **47.7** | 0 → **14.6** | 31.3 → **53.1** | 0.292 → **0.577** | 19.1 → 24.2 |
| 1234 | 69.2 → **56.2** | 0 → **16.9** | 20.0 → **36.7** | 0.231 → **0.562** | 21.4 → 19.4 |

Kerb residents stand on their own street 76.0 / 77.8 / 82.6% of the time. **111's structural cap on
bus-stop coverage is broken: it roughly doubles.**

**Perf.** PASS. Interleaved A/B/A/B vs pristine HEAD (iter 117's law), min per variant: day
**33.78 → 34.01ms (+0.7%)**, night **39.89 → 40.00ms (+0.3%)**. Zero draw calls added — entity counts
are identical — so the only cost is one predicate in `stepPed`. Pristine itself read night +6.9% against
the 37.33ms pin under this load, so that offset is earlier code, not this vector. Not re-pinned
(`polish-tile` owns the file).

**Visual.** 2/2 PASS, seeds 42 and 7, `wide` + `downtown` clip, `&step=300` so the crowd is at its
*settled* distribution rather than its spawn state. Both agents independently: pedestrians stand at the
kerb **edges** of road hexes, "not centered in the traffic lane or sunk into buildings"; no z-order
tears, no blown-out colour; and — asked specifically — **the beach is still well populated**, consistent
with a ~15% reduction rather than an emptying.

**Verdict — SHIPPED (DEEPENED).**

**Findings for later laps.**
- **⚠ A SPAWN POOL AND ITS RE-ENTRY TEST ARE TWO READERS OF ONE PREDICATE (new; extends iter 112's law).**
  The pool said *"open ground **or** a lively kerb"*; `stepPed`'s re-anchor still said *"open ground"*.
  That asymmetry is a **one-way ratchet** — open ground captures a kerb resident and never gives one
  back — and it silently ate the entire feature: kerb residents decayed **10.0% → 3.8%** (seed 7),
  10.0 → 4.6 (42), 6.2 → 2.3 (1234), **monotone**, over 20 sim-minutes. Symmetric (`homeGround`), the
  flow runs both ways and mean-reverts: over **80** sim-minutes it wanders 11–26% with no collapse and
  no runaway. 112 said *grep for a predicate's other readers*; the sharper form is **a pool is a
  predicate, and whatever lets an agent RE-ENTER the pool is its second reader.** Look for this wherever
  a thing has a home it can leave and return to.
- **⚠ NEITHER THE CENSUS NOR A SCREENSHOT CAN SEE A RATCHET — BOTH ARE TAKEN AT LOAD (new).** The
  ratcheted build passed the census with every metric `+0` and would have passed the visual gate
  outright: at `t=0` the kerbs are full. It only fails after minutes of *watching*, which nothing in
  this harness does. When a vector changes a **distribution that evolves**, the gate is a time series,
  not a snapshot — step the sim and check the quantity is **stationary**. `probe-anchor.mjs` +
  `__step(600)` in a loop is the instrument; it costs one page load.
- **⚠ AN AGGREGATE THAT MIXES TWO POPULATIONS CANNOT CONVICT ANYTHING (new; sharpens iter 104).** The
  headline `street%` jumped 16.8 → 30.7%, straight into the range `stepPed`'s comment says it rejected
  ("0.15 flooded them to ~28%") — and it is **fine**. Split by anchor class: open-ground residents are
  *unchanged* (20.0/19.1/21.4 → 19.6/24.2/19.4%, inside the documented 3.0–5.3 pt control spread) and
  the whole rise is a **new subpopulation standing where it lives**. The rejected 0.15 tuning drained
  parks *into* the streets; this adds residents *to* the streets. Same aggregate, opposite meaning. Per
  iter 118, this split is also the **in-run invariant column**: open-ground street% must not move.
- **`syncFleet` IS CALLED FROM `tick()`, SO THE CROWD IS A FOSSIL OF THE CITY'S PAST (new).** Peds top
  up to `wantPeds` as `pop` grows and **never re-site**, so the anchor histogram records where open
  ground *was* when each resident spawned, not where it is now. Two consequences: any "where do people
  live" vector is really about the **growth history**, not the 2035 map; and a counterfactual that
  resamples the 2035 pool (this probe's first draft did) is an idealization the progressive spawn never
  reaches — **A/B two live builds instead.** Also note `?warp=61` alone leaves only ~92 of 130 residents
  spawned; the rest arrive over ~2.5s of real frames. **Any shot of peds taken at load is missing 30% of
  the crowd** — `shoot.mjs`'s settle time has been hiding this.
- **People's additive inventory, so nobody re-proposes it** *(the iter-34 beach-towel lesson)*: peds with
  gait + colour + kids in tow + night thinning, dogs with exclusive owners and leashes and strays,
  joggers, block parties, evening crowds, stadium/market crowd terms, pier crowds, hover focus ring.
  The domain's live cells are **Deepen** (this one) and **Scale**; `Connect` paid at 78 and 111.

## Iteration 120 — the parks rejoin the year (2026-07-11)

**Vector.** Nature × **Deepen** (content is a Sky interconnect — the 108/113 pattern), taken as the
**holistic step-back** the header mandated. Rotation said Transport (112); the step-back found a real
defect first, and *"if something compounded badly, spend the next iteration FIXING it"* outranks
rotation. A step-back that finds a defect and then ships an unrelated vector has wasted the step-back.

**The step-back itself.** 5 un-zoomed whole-city frames — seeds 42 and 7, **day and night** (115's law),
plus a **seasonal** frame (`&year=2035.62`, the golden dry peak) — read by 3 parallel agents, all told to
hunt cumulative drift, not to look for a feature. `&step=300` so the crowd was settled (119's law).
**All three returned VISUAL: FAIL.** Two of the three were wrong, and finding that out was the work:

- **Season agent:** *"season only tints farm tiles; meadow, forest, parks and grass stay green — the
  golden frame reads as blighted brown patches in a green city."* Its **diagnosis was false** (the code
  plainly tints `grass`/`meadow`/`canopy`) but its **perception was true**. Resolved by probe, not argument.
- **Seed-7 agent:** *"rain shafts render as a floating grey smudge off the west edge, a z-order tear."*
  **False positive — I looked at that one PNG myself.** It is a rain cloud sitting over the western hills
  with its shaft landing on terrain. Nothing floats, nothing tears. **Not banked as a cue.**
- **Seed-42 agent:** night periphery (east beach/parkland) goes dead-dark while the core blazes; seed-7
  agent independently flagged the same shape (dim NW quadrant). Two independent sightings ⇒ **banked as
  cue (m)**, below. Note the *post-fix* night agent called night "legible and beautiful", so (m) is a
  soft cue about core-vs-periphery *balance*, not a black hole. Verify before spending a lap on it.

**What the probe found** (`probe-season.mjs`, new; clock frozen per 109's same-frame law, `ROAD` as the
null control). Mean rendered-pixel distance from winter, at tile centres, seeds 7/42/1234:

| | MEADOW | FOREST | **PARK** | **SHOREPARK** | FARM | QUAD | ROAD *(control)* |
| --- | --- | --- | --- | --- | --- | --- | --- |
| n | 6 | 231 | **584** | **294** | 120 | 24 | 1200 |
| dry-peak, before | 26.6 | 19.7 | **0.0** | **0.0** | 88.4 | **0.0** | 0.5 |
| dry-peak, after | 26.6 | 19.7 | **9.9** | **17.9** | 88.4 | **5.2** | 0.5 |

The season did **not** stop at the farms — it stopped at the **irrigated** greens, and those are the
overwhelming majority of the city's green area: **878 park/shorepark hexes against 231 forest and 6
meadow.** So the dry season painted 120 brown farms onto 878 permanently-emerald hexes. `PARK`,
`SHOREPARK`, `QUAD`, `GARDEN`, `FIELD` all read **exactly 0.0 in all four seasons**.

**Change.** Palette only. `applySeason` now tints `BASE.lawn` and `BASE.turf` on a **muted** share of the
same `dry`/`winter` curve it already drove `grass`/`meadow` with (`LAWN0`/`TURF0` pinned beside the other
`*0` originals). Every one of the ~14 `col('lawn',k)` / `col('turf',k)` draw sites picks it up through
`CCACHE`, which `applySeason` already invalidates — **zero new draw calls, no `rng()`, no terrain.**
Ordering is now `FARM 88 > MEADOW 27 > FOREST 20 > SHOREPARK 18 > PARK 10 > QUAD 5`: parks remain the
lushest thing on the plate. *Irrigated buys amplitude, not immunity.*

**Census.** PASS. Tile histogram **empty**, every metric **+0**, entity counts identical — predicted
before running, since a palette change touches no seeded draw.

**Perf.** PASS, free. Min-of-3, interleaved: day **33.94 → 33.94ms**, night **39.94 → 39.83ms**. Two extra
`mixA` calls per frame. (Pristine HEAD read night +7.0% against the 37.33ms pin under this session's load —
that offset is earlier code, matching 119's identical observation. Not re-pinned; `polish-tile` owns it.)

**Visual.** 2/2 PASS on the fix, seeds 42 and 7, A/B before-vs-after at the golden peak plus a winter
frame plus a night frame. Both agents independently: the farms *"are no longer orphaned"* / *"no isolated
brown blight patches"*, parks *"muted toward olive but did NOT go brown/dead"* and stay clearly the
greenest tiles, winter and golden read as two seasons of one city, night undamaged.

**Verdict — SHIPPED (FIXED).**

**Findings for later laps.**
- **⚠ A VISUAL AGENT'S PERCEPTION AND ITS DIAGNOSIS ARE TWO DIFFERENT CLAIMS, AND ONLY ONE IS ITS JOB
  (new; the central lesson of this lap).** All three agents failed the frame; the two that named a *cause*
  named the wrong one, and one invented a defect (the "floating rain shaft") that does not exist. An agent
  looking at a PNG can tell you **that** a frame is ugly and **where**; it cannot tell you **why**, because
  the cause lives in code it never read. Treat the *where* as evidence and the *why* as a hypothesis to
  probe. Had 120 trusted the season agent's diagnosis it would have "fixed" `canopy` — which was never
  broken — and left all 878 frozen hexes in place. **Never ship an agent's causal claim; probe it.**
- **⚠ AND NEVER BANK ONE EITHER.** The rain-shaft FAIL would have entered this header as a cue and sent
  some future lap hunting a z-order tear in correct code. One image read killed it. The skill says the
  budget "exists to be spent when it matters" — **a cue you are about to write into the ledger is exactly
  when it matters**, because a false cue outlives the iteration that invented it.
- **⚠ EVERY WHOLE-CITY SHOT THIS LOOP HAS EVER TAKEN WAS IN JANUARY (new, and it explains 108).** `?warp=61`
  from `year=1974` always lands on ~2035.0, so without `&year=` the season term is ~0 and *a seasonal defect
  is invisible to the gate by construction*. This is the second time that has bitten (108: the farms had no
  seasons at all, unnoticed for 107 laps). Both were found only by pinning `&year=`. **A step-back now shoots
  a seasonal frame** (header updated). Ask what else the default URL silently pins: `tide` is the obvious next
  one — `&tide=` exists, and no gate has ever moved it.
- **⚠ "INTENTIONAL" IN A COMMENT IS NOT THE SAME AS "MEASURED" (new).** `BASE.lawn`'s comment reads
  *"irrigated green: parks stay lush when the hills go gold"* — a real design intent, and it is why I nearly
  dismissed the agent. But the code did not implement *lush*; it implemented **frozen**, in all four seasons,
  including autumn and winter where the intent says nothing. A comment stating a *goal* is not evidence the
  goal was hit. `grep`ping the comment made the defect look like a decision. The probe made it a number.
- **THE CITY'S GREEN MASS IS PARK, NOT NATURE (new; sizes for any future vegetation vector).** `PARK` 584
  + `SHOREPARK` 294 = 878 hexes, vs `FOREST` 231, `REDWOOD` 34, `VINEYARD` 26, `ORCHARD` 18, `MEADOW` **6**,
  `GARDEN` **6**, `FIELD` **8**. Any Nature vector aimed at meadow/garden/field is aimed at ~20 tiles and
  **cannot move a whole-city frame** (cf. 111's law: the whole-city gate cannot convict anything drawn at
  3 px). If you want the city to *look* different, the lever is `PARK`.
- **cue (m) — NIGHT'S PERIPHERY (new, soft, two independent sightings).** Downtown blazes; the outer ring
  (east beach + parkland on 42, NW farms + low residential on 7) falls to near-unlit olive at `t=0.8`, losing
  detail the day frame shows. The named candidates: the **pier/ferris wheel/boardwalk read as unlit**, and
  there is no low-density streetlight or ambient moonlight on sand/parkland. A third agent, post-fix, called
  the same night frame beautiful — so **measure the luminance histogram core-vs-ring before committing a
  lap to it**; do not take the FAIL at face value (see the first finding above).

## Iteration 121 — the cable cars agree on a speed (2026-07-11)

**Vector.** Transport × **Deepen** (a fix). Transport was the stalest domain (112), and the header's own
law — *"a banked, measured finding outranks both kind-rotation and cell-emptiness"* — pointed at the last
entry of that domain, where iter 112 had measured but not fixed **cue (h)**: the gondola still carried the
normalized-parameter bug the monorail was cured of. Deepen has now paid four laps running; a banked,
measured defect outranks kind-rotation, but the **next lap must vary the kind** (see header).

**What the probe found before a line was written** (`probe-gond.mjs`, new, `git add -f`'d; freeze `playing`,
drive `__step()`, sample `cb.p`). Cue (h) was **understated**. At `warp=61` the lines are longer than 112
sampled, so the spread is worse than the 0.14–0.36 it banked:

| seed | line | spans | cruise spans/s | round trip | stand% |
| --- | --- | --- | --- | --- | --- |
| 7 | 1 | 16 | **0.64** | 50.0s | 0.0 |
| 42 | 1 | 17 | **0.68** | 50.0s | 0.0 |
| 42 | 2 | 8 | **0.32** | 50.0s | 0.0 |
| 1234 | 1 | 6 | **0.24** | 50.0s | 0.0 |
| 1234 | 2 | 9 | **0.36** | 50.0s | 0.0 |

**Cruise spread 2.83×**, and seed 42 flies one cabin past an identical one at **0.68 vs 0.32 spans/s** in the
same frame. The `roundTrip` column is the bug stated as a tautology: **every line, of every length, turns
round in exactly 50.0s**, because `cb.p+=dt*s*0.02` is a *lap* rate. `p∈[0,1)` is a **round trip** of a
ping-pong line, so one p-unit is `2*(L-1)` spans — the factor 2 the monorail's fix did not need.

**Change.** `stepCabins(g,dt)`, in the monorail's own grammar, plus `g.rateP`/`g.brakeP` precomputed in
`buildGondSet` (the analogue of `buildMonoSet`):
- rate is **spans/sec** (`GONDSPD=0.40`), capped so a one-span line can't blink (`GONDCAP`, ≥20s round trip);
- a cabin **eases into its terminal and back out** over `GONDBRAKE=1.6` spans with `sqrt(d/B)` — constant
  deceleration. 112's law: the intuitive linear ramp diverges and pins the mover on its floor;
- it then **dwells** `GONDDWELL=4.0` sim-seconds at the sheave, and the tooltip says so
  (*"Standing at the terminal."*, per the sync invariant — the trains already said it);
- `stepGond`'s growth rescale now clears `cb.dw`, so a line that lengthens under a dwelling cabin cannot
  strand it standing mid-line.

Constants were typed **before** anything was measured (107's law) and are reported as they were typed.

**Probe, after.** `cruise 0.400 .. 0.400 spans/s — spread 1.00×`. Round trip now scales with the line
(52.2s at 6 spans → 109.1s at 17). `standing anywhere but a terminal: 0.0 sim-seconds`. `mean/cruise` is
**0.68–0.85**, which is the check that the sqrt ramp did *not* degenerate: the cabin genuinely reaches
cruise instead of crawling on its 0.1 floor. Dwell is 7.4–15.5% of a round trip, exactly `8s / roundTrip`.

**Census.** PASS. Tile histogram **empty**, every metric **+0** except `pop −3` / `greenRoofs +1` — iter 108's
documented load-dependent `(year*23)|0` salt jitter. `gondLines 15`, `gondola 16` cabins, identical. Predicted
before running: the vector touches no `rng()`, no terrain, and adds no draw call.

**Static gate on the one thing a screenshot CAN see** (`probe-gondshot.mjs`, new): a motion change is invisible
to a still frame, but *where a stopped cabin stops* is not. Stepping until a cabin dwells, then reading its
screen position against its tower's: `atTerminal:"start"`, `isPylon:true`, `sag:0.000`, and **dx = 0.00 px**
from the mast column, both seeds. It stops **on** the sheave head — where `gondSag` is zero by construction —
not one span past it.

**Perf.** PASS, free. Interleaved A/B/A/B vs pristine HEAD (117's law), min per variant: day
**34.94 → 34.95ms (+0.03%)**, night **41.22 → 41.00ms (−0.5%)**. Zero draw calls; ≤6 cabins × one `sqrt`.

**Visual.** 2/2 PASS, seeds 42 and 7, whole frame + two crops on the dwelling cabin. Both agents independently:
the cabin hangs on the cable **at a mast head**, "not floating in mid-span, not sunk below the rope, and not
detached"; no z-order tears, no blown-out colour; the whole frame still reads as a balanced coastal city.
Their *perception* is the evidence; the exactness claim rests on the probe's 0.00 px, not on their eyes (120's law).

**Verdict — SHIPPED (DEEPENED / FIXED). Cue (h) is CLOSED.**

**Findings for later laps.**
- **⚠ PORTING 112's FIX REQUIRES COUNTING THE LEGS (new).** 112's law is *"ask what `p=1` MEANS on that
  instance."* On the monorail `p=1` is one lap of a closed loop, so `rate = SPD/L`. On the gondola `p=1` is a
  **round trip** of an open line — two legs — so `rate = SPD/(2*(L-1))`, and the brake zone converts with the
  same factor 2. Get it wrong and you ship a *uniform* speed that is uniformly half of what you intended, which
  every gate here would have passed. The remaining `p`-parametrised movers are worth the same question.
- **⚠ cue (n) — THE CABLE CARS ARE PARKED AT THE ANCHOR IN EVERY SHOT EVER TAKEN (new, measured, PRE-EXISTING —
  this lap did not cause it and did not fix it).** Position along the line at page load, in spans from the start
  terminal, `warp=61`: seed 7 `[0.72, 0.34]` of 16 spans · seed 42 `[0.77, 0.29]` of 17 and `[0.52, 0.54]` of 8 ·
  seed 1234 `[0.45, 0.61]` of 6 and `[0.53, 0.53]` of 9. **Both cabins, every line, every seed, sit within one
  span of the start tower** — and pristine and patched agree, so it is the *growth rescale*, not the stepper.
  `stepGond`'s `cb.p = cb.p<0.5 ? cb.p*k : 1-(1-cb.p)*k` with `k=(L-1)/L`, applied once per span, telescopes to
  `p₀·(L₀-1)/(L-1) → 0`: it pins each cabin to the cell it occupied when the line was **one span long**, which is
  the anchor. Its comment — *"keep the cabins where they are while the line lengthens under them"* — describes
  the implementation **accurately**; nobody read off the consequence. (Sharper than 120's "a comment states a
  goal, not a measurement": here the comment is *true* and the behaviour is still wrong.) Consequence: no cabin is
  ever seen riding **over** the city without `&step=`, so the feature's whole point is invisible at load. This is
  the third instance of *the default URL silently pins a state* (`year` iter 108, `tide` iter 113, now cabin
  phase). Cheap fix for the next Transport lap: re-spread the cabins once `L` reaches `g.target`. **Do not
  "fix" the rescale itself** — it is correct for a growing line.
- **A DWELL IS A PURE TIME DELAY, SO IT CANNOT BUNCH TWO MOVERS (new; the worry that made me check).** Both cabins
  on a line share `rateP`/`brakeP`, the step depends only on `p`, and the pause has fixed length at a fixed point.
  So each cabin's period is *identical* and their offset in **time** is exactly conserved — they can never merge,
  whatever the ledger's "ratchet" instinct (119) suggests. Measured: separation wanders 0.9–4.9 spans over 300s
  with no trend, and is in fact *wider* than pristine's, because the dwell desynchronises them.
- **⚠ THE INTERLEAVED PERF GATE JUST EARNED ITS KEEP, ON PRISTINE CODE (new; hard evidence for 117's law).**
  Round 1 of this lap's gate read **day 47.39ms on unmodified HEAD** — the harness printed
  `33.16ms -> 47.39ms (42.9%) <== REGRESSION`. Round 2 of the *same bytes* read 34.94ms. A single-pass gate would
  have convicted code that did not exist yet, and a "stable offset ⇒ code" reading (99's rule, corrected by 117)
  would have agreed. **Only the A/B/A/B swap, min per variant, can tell a machine from a diff.**
- **`minSep ≈ 0.00 spans`: the two cabins pass THROUGH each other, in both builds (new, pre-existing, cosmetic).**
  They ride one drawn curve, so once per half-trip they occupy the same point. A real jig-back tram counterbalances
  its pair on a loop and they pass side-by-side at midspan; here they are also not quite antipodal (`p` 0.15/0.62,
  0.47 apart, not 0.50). Both are one-line changes and belong with cue (n), not before it — the crossing is a few
  pixels and no visual agent has ever remarked on it.

## Iteration 122 — the institutions name themselves (2026-07-11)

**Vector.** Civic & culture × **Interaction/UX**. Rotation named the domain: Civic was the stalest
(114, and that lap *reverted*). The header named the content — its un-cashed-tell list ends with
*"`CIVICLABEL` (every civic says only 'A public institution.' — 12 kinds, one sub)"* — and the tell
itself is the loop's most reliable move (117's law: **look where a string already ASSERTS what the code
knows**). Kind was forced: Deepen had paid four laps running (119–121) and its licence was spent, the
header says *"do not open with a Polish"*, and Civic's Interaction/UX cell had one entry (52).

**Change.** Hovering an institution, or the squares it earned, now reports what its own siting rule knew.
- **`CIVICDESC`** — twelve sentences, one per kind, each written from that kind's *rule*: the hall
  predates the streets, the school comes *"with every few thousand residents"* (`pop>3500*(schools+1)`),
  the university *"with every fourteen thousand"*, the aquarium sits *"where the streets run out at the
  sea"*, the observatory on *"the dark rim"*, the amphitheater *"beside the parks"*.
- **`Civic quarter — N institutions`** on a major, counted with `siteQuarter`'s own `MAJORK`/`QFAR`.
- **`Fronts a paved forecourt`** / **`Keeps its own grounds behind`**, and, on the squares themselves,
  **`Forecourt of — Town hall`** / **`Grounds of — Museum`** — cashing `TILEDESC[T.QUAD]`, which has
  always said *"Mown grounds behind an institution"* without ever naming which.
- **`One of — 4 schools`** on the two kinds the city builds by demand.
- **Fixed a lie the probe found on the way**: a paved square claimed **`Rooftop solar`**.

**Census.** `VERDICT: PASS`, exit 0, pageerrors 0. `pop 154915 → 154911 (−4, −0.003%)`, `roads +0`,
`developed +0`, **tile histogram empty**, `civicKinds +0`. Exactly right: no terrain write, no `rng()`
draw. `git diff` has **zero** `ctx.`/`fillRect`/`hexTile`/`col(` lines — so per iter 109 the perf gate
was not owed. The ±4 is iter 108's load jitter (`(year*23)|0` salt), not the feature.

**Probe.** `probe-civic.mjs` (**`git add -f`'d**) hovers every civic/plaza/quad via `__find`'s screen
coords, scrapes `#tip`, and checks each claim against cube distance recomputed in Node — a third
implementation sharing no code with `countAround()` or `hexDist()`. **84 claims across 3 seeds: PASS.**
`shot-civic.mjs` is `shot-woods.mjs` retargeted (hovershot aims at *entities*; civics are tiles).

**Visual.** Two agents, two seeds, un-zoomed frames + five hover clips each: **VISUAL: PASS** both.
*"All rows legible, right-aligned values line up, no clipping"*; *"no z-order tears… palette stays muted
and harmonious"*; the whole city still *"reads as a balanced, beautiful coastal city."*

**Verdict — SHIPPED.**

### Findings

- **⚠ ADJACENCY CANNOT ANSWER "WHOSE IS THIS?" — AND THE PROBE CAUGHT IT, NOT THE GATES (new; the
  sharpest instance of iter 112's law yet).** The first build read ownership as *"a PLAZA/QUAD touching
  me"*. But a quad laid behind the **town hall** also touches the **library** two hexes over, so it named
  whichever neighbour came first in `nbrs6` order — wrong on **seeds 42 and 1234**, right on 7 — and both
  institutions claimed the same lawn. Census was flat, the tooltip was fluent, and *both visual agents
  would have passed it*: the text is only wrong if you know the geometry. **The placing rule is the only
  code that ever knew the answer, so it now says so**: `n.own=idx(x,y)` stamped at conversion in both the
  forecourt and grounds rules; `squareOwner()` reads it; `ownsSquare()` reads the same fact from the
  institution's side, so the two can never disagree. **When a relation is many-to-one, record it at the
  point where it is one-to-one — do not re-derive it from geometry later.**
- **⚠ `hasQuad()` AND "DO I OWN A QUAD?" ARE DIFFERENT QUESTIONS, AND MUST KEEP DIFFERENT NAMES.** The
  grounds rule's guard (`countAround(x,y,1,…QUAD)>0`) means *"is a quad already touching me"* — that is
  what stops two clustered majors both getting one, and it is correct. The tooltip's question is *"is one
  MINE"*. I nearly shared one helper between them, which is 112's law read backwards: **one predicate per
  question, not one predicate per phrase.** They are now `hasQuad()` (tick) and `ownsSquare()` (tooltip).
- **⚠ A PAVED SQUARE WAS CLAIMING `Rooftop solar` — AND `solarRoofs` STILL COUNTS IT (new, measured).**
  The solar pass sets `c.solar` only on `RES/MID/COM`; the forecourt and grounds rules then pave that very
  cell into `PLAZA`/`QUAD` **without clearing the flag**. Only `drawBuilding` paints panels and it runs
  exactly when `DEV.has(c.t)`, so the square showed an array nobody drew. Seed 7's plaza printed it. The
  `High street` row on the very next line **had always guarded** (`c.hstr&&DEV.has(c.t)`); the two roof
  rows never did. Fixed on the tooltip side only. **Two live consequences remain, deliberately unfixed
  here** (never retune a metric mid-lap, and never after reading its census):
  (a) the census `solarRoofs`/`greenRoofs` tally is `if(c.solar)` over *all* tiles, so it **over-counts**
  these roofless squares — a few per city;
  (b) the diffusion itself reads `countAround(x,y,1,n=>n.solar)`, so a ghost-solar plaza **still nudges
  its neighbours to adopt.** The clean fix is `c.solar=c.groof=false` at both conversion sites, which
  moves a tracked metric and perturbs an adoption CA — **a lap of its own, in Urban.**
- **⚠ "NOT DRAWN" AND "NOT READABLE" ARE NOT THE SAME OBSERVATION — iter 111's law, one level up, and it
  bit the probe.** Pass 2 checked *"the institution claims grounds ⇔ some square names it"*. Squares that
  could not be **hovered** — offscreen, or with a **pedestrian standing on them** (`QUAD` is in `PEDDEST`,
  so a ped wins `pickEntity` over the tile) — silently registered as *"names nobody"*, and the probe
  produced a **false FAIL** against a hall whose quad was on-screen, correctly owned, and simply occupied.
  A probe must track what it **failed to read** (`unread`) and decline to assert, exactly as a visual gate
  must not read an occluded entity as an absent one.
- **`CIVICLABEL`'s tell is now cashed; the list left is `TILEDESC[T.KELP]` ("swaying in the shallows"),
  `[T.IND]` ("warehouses and light industry"), `[T.VINEYARD]` ("terraced").** Note the tell is *self-
  renewing*: cashing it here **created** a new one — `TILEDESC[T.PLAZA]` still says only *"A paved civic
  square"* for a square that now knows its institution, and the plaza/quad `title` is still the generic
  tile label. A future lap could title them *"Town hall forecourt"* outright.
