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
| **Nature** | 4, 26, 29, **102** | 1, 13, 60 | 37, 46, 67, 76, **108**, **120** | ~~46~~, ~~88~~, ~~101~~ | U4 | 53, 96 | **117**, **129** |
| **Water & coast** | 6, 10, 12, 16, 20, 33, **106** | 90 | 17, 25, 51, 65, 72, **113**, **123** | 22 | | U2, 44, 58, 79, **116**, **132** | **97** |
| **Urban fabric** | 32, 62 | 7, 23, ~~82~~ | 38, 54, 68, 92 | 47, **109** | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103**, **110**, **118**, **124** | **133** |
| **Transport** | 2, 9, 21, 31, 48 | 77 | 28, 39, 55, 63, **112**, **121**, **128** | 5, 15 | U4 | U1, U3, 70, 85, 87, 94 | **105** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107** | 36, 59, 66, 80, 91 | 45 | | 73, ~~**114**~~ | 52, **122** |
| **Sky & atmosphere** | 27, 43 | | 19, 35, 50, 57, 95 | | | 61, 81, 89, **115** | ~~**134**~~ |
| **People & activity** | 41, 56, **127** | 49 | 34, 64, 93, **104**, **119** | 78, **111** | | 84 | 71 |

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
  so any stamped entity is ringable for free — **and since iter 133 a hovered TILE is ringed too (cue l closed)**.
  **An `ENTINFO` `sub` may be a
  FUNCTION of the entity (iter 105)** — use it when a thing's interest is its
  *membership* (which line / route / depot), computed live, not a stored string.
- **ROTATION.** Last vector per domain:
  Sky **134** (reverted) · Urban **133** · People **127** · Nature **129** · Transport **128** · Civic **131** · Water **132**.
  **Stalest is now People (127)** — check the last entry of the stalest domain for a banked finding before reading
  its row. (**Sky's Interaction/UX was ATTEMPTED at 134 and REVERTED** — a HUD readout naming the season + moon
  phase from `year` STROBES, because `year` is a fast development clock, not a wall calendar: **~0.17 yr/sec at speed 1**,
  so the season word flips ~0.7 Hz and the moon phase ~2 Hz in normal play. Static frames — every visual gate this
  loop takes — are blind to it. **A Sky/season/moon readout is banked behind a rate fix: iter 126's DRAWN moon also
  strobes ~2 Hz at night** (a latent defect its frozen-frame gate missed); decouple the moon's synodic phase from the
  sprinting `year` — e.g. tie lunations to `dayT` days — and BOTH the disc and a readout become readable. That is the
  next Sky vector. Sky's additive/CA cells are still traps, see below.) (**132 took Water × Polish** — the kelp beds got a floating olive canopy so a bed reads as a living
  forest, not a flat dark hole, while staying the darkest thing inshore; `probe-kelp` gates it.)
  **Water's STILL-banked cue (123): the pier/lifeguard are still `rng()`-salted; site them on a depth by respending
  their draws (123's stream-neutral trick) — but that REPEATS 123's site-on-depth mechanism, so vary it (132 did:
  it took a different Water kind).** (**129 cashed the tell a 7th time for Nature**:
  the orchard drew a blossom/fruit calendar since iter 57 but its tooltip was mute; it now names the
  season via a shared `orchardPhase()`. **129's banked Nature move is now a Deepen** — make VINEYARD's grapes
  read `year` (last Sky-feedable item; 108/113/120), *then* its tooltip earns a row too.) (**127 took People × New element** aimed not at its spent
  *entity* list but at its biggest untouched *surface* — PARK's 878 hexes now show day-only picnics. The lesson:
  "additive inventory spent" is a claim about a domain's entities, not its surfaces.) (**126 took Sky × Deepen** — the moon now keeps a calendar
  and the moonglade dims with its phase — which is the documented way past Sky's additive saturation: a Deepen
  that adds no element. Sky is no longer stale, and its empty `New CA rule` cell is still a trap, not an invitation.)
  **124 cashed Urban's banked ghost-`c.solar` cue and it is now CLOSED:** `c.solar`/`c.groof` persist after a
  building is cleared for a paved square, so the census counted panels on `PLAZA`/`QUAD`/`PARK`/`GARDEN`/`STADIUM`
  (probe-solghost: 27 ghost solar + 4 ghost green across 8 seeds) and the adoption CA counted them as neighbours.
  The draw + tooltip already gated on `DEV.has(c.t)`; 124 routed the census (×2) and both adoption neighbour-counts
  through the same predicate — `solarRoofs` −20, terrain-neutral (pop/roads/developed +0). **This was the last
  banked cue that moved a census number**; from here the census is vacuous again for most vectors — reach for a probe.
  **123 cashed the cue banked for Water, exactly as 122 cashed Civic's, 121 cue (h), and 119 cue from 111:
  four laps running where *the header told the iteration what to do*.** That is the loop working. **But 123 also
  found the banked cue's own description of the code was WRONG** (it said `hashCell`; the turbines were `rng()`),
  and the implementation the cue prescribed would have reshuffled the seeded stream. **A cue is a pointer, not a
  spec — re-grep the seam before designing to it.**
  **Cue (n) is CLOSED (iter 128).** The cable cars were parked within one span of the anchor tower in every
  still frame; 128 re-spreads a line's cabins once it **settles** (target reached, plate edge, or stalled),
  keeping the growth rescale — which 128 re-derived and confirmed is *correct* (constant-fraction would hop a
  cabin ~1 span per span-append during live growth). Residual, accepted: a line still *actively* mid-growth
  (seed 1234's slow high-target line) legitimately stays telescoped — that is the rescale working, not a bug.
  **120 broke rotation deliberately and
  logged why**: it was the mandated holistic step-back, the step-back found a real defect, and the skill's own
  rule ("if something compounded badly, spend the next iteration FIXING it") outranks rotation. A step-back
  that finds a defect and then ships an unrelated vector has wasted the step-back. **Every domain except Sky now
  has an Interaction/UX vector** (133 filled Urban's via cue (l); 118 had closed cue (j)).
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
  **Cue (k) is now FULLY CLOSED**: 116 gave the sea a bottom (the *field* half) and **123 stood the wind farm
  on it** (the *siting* half) — 3/18 turbines were on the shelf, now 42/42 across 14 seeds, and the farm's line
  bends around headlands because the depth is held and the row is not. **What 123 leaves banked for Water** is
  the rest of the salted coast: the **pier** row and the **lifeguard tower** are still `rng()`-picked with
  rejection loops, and a boardwalk should run out to a *depth*. 123's second finding makes that free — **respend
  an object's existing `rng()` draws rather than re-drawing them**, and the stream cannot move.
  Civic's banked **cue (d)** was attempted at
  114 and **reverted**: its goal is proven (a 3-hex square reads at fit zoom) but its prescribed
  host does not exist — see the rewritten cue below before re-opening it.
  **123 ran the tell FORWARDS**, which is a new move: rather than making the draw honor a string, it made the
  string and the rule **share one constant** (`SHELF0`/`SHELF1` — the tooltip *names* the `Coastal shelf`, the
  wind farm *stands* on it), so the two cannot drift apart in the first place. Prefer this to re-syncing them
  later. Related, and the deeper prize: **a derived field earns its keep when a RULE reads it, not when the draw
  shows it.** `rDeep` was drawn by 116 and read by nothing until 123 sited on it. Still unread by any rule:
  **`rGreen`, `rShop`, `rServ`** feed only the walkable stat — *nothing sites itself against them.*
  **Iteration 135 is the next holistic step-back** (105, 110, 115, 120, 125, **130**, …). Shoot it
  **at night AND a season, and PIN THE DAY FRAME OFF JANUARY** (`year=2035.62` dry-peak baselines +
  `2035.02` as the seasonal-contrast frame — a default `?warp=61` frame is already ~winter; SKILL.md holds
  the full recipe). **130 found NO compounding city defect** (a clean bill of health, the honest step-back
  outcome, no city change): both seeds PASS day/night/season, agents *located* the night core off-centre
  by light alone ((.45,.45)/(.48,.60), 115's lighting holds), sea reads (116/123 hold), no
  tears/floaters/blowout in 6 frames; seasons measured alive (`probe-season`: FARM winter→dry-peak 88, ROAD
  control ~0.5–2). Perf flat — see the perf note. **125** was the same shape and its product was the
  pin-off-January recipe fix now in SKILL.md.
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
  **129 cashed it a seventh time** (the orchard's blossom/fruit calendar, mute in `describeTile` since iter 57 —
  now a `Grove` row) and confirmed its **limit**: of the three mute vegetation tooltips only the orchard's DRAW
  read `year`, so only it could be un-muted honestly — VINEYARD/GARDEN need a Deepen first (see 129).
  Un-cashed: `TILEDESC[T.KELP]` *"swaying in the shallows"*, `[T.IND]` *"warehouses and light industry"*,
  `[T.VINEYARD]` *"terraced"* (needs its draw to read `year` first), and the plaza/quad **titles** (still the
  generic tile label — they could read *"Town hall forecourt"* outright).
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
  Recent kinds: 123 Deepen · 124 Polish · 126 Deepen · 127 New element ·
  128 Deepen · 129 Interaction/UX · **131 Polish/Connect (EXPLORED → REVERTED, cue (d) closed)** · **132 Polish** ·
  **133 Interaction/UX** · **134 Interaction/UX (EXPLORED → REVERTED — the strobing almanac)** —
  (**130 was the holistic step-back — no domain × kind lap.**)
  **Next lap owes People (127, now stalest); live/cheap kinds there: Polish, Interaction/UX** (Connect paid at 111).
  Vary off Interaction/UX (2 of last 4). Unless another banked, measured cue outranks rotation. Live/cheap: **Connect** (last 111, adds no new object),
  **Interaction/UX**, **Polish**. The coldest kind is **Scale** (a structural lever, not a lap move);
  **New element** was cashed at 127 (before that 106). Note 118's
  finding that a *saturated* domain cannot take a New element — but 127 sharpens it: saturation is of a domain's
  *entities*, and a New element can still land on a large untouched **surface** (127 put picnics on PARK). Pick
  the domain first and read its row before choosing. **Connect** (last 111) is live and cheap: its trick is to add no new object.
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
- **⚠ `peds` CANNOT SERVE THE ROAD NETWORK (iter 111, measured, before writing any code).** A resident
  is leashed to the open cell it is anchored to (`PEDLEASH=2`, and `stepPed`'s comment says that
  constant was tuned to hold street occupancy at ~19%). Only **20–31%** of bus stops have a live ped's
  anchor within a leash — even at radius 5 it is 56–75%. So "residents walk to / wait at / ride the X"
  vectors are structurally capped at ~a quarter of any road-borne host, and would leave the rest
  *emptier* than whatever decoration they replaced. To do it properly you must move the **spawn pool**
  (`openCells` in `syncFleet`), not the leash. Don't rediscover this.
- **PERF BASELINE RE-PINNED 2026-07-10 (iter 105's step-back): day 33.16ms · night 37.33ms.** Still
  valid at iter **111** (pristine-HEAD control that session read day **33.78ms**; the change added
  +0.22ms). Also valid at iter **110**: a pristine-HEAD control read day **33.49ms** / night **37.72ms** (min-of-3),
  and iter 109's read day **33.33ms** / night **37.89ms**. Not re-pinned. The
  stale-baseline warning 104 raised is **resolved** — the old pin (2026-07-09, day 31.33ms) predated
  iters 100–104 and reported ~+6% before your change existed. Do not re-chase it. Still valid at iter
  **117** (pristine-HEAD control, interleaved: day **35.11ms** / night **39.45ms**; the patched file read
  day **34.33** / night **39.22**). Not re-pinned.
  **Iter 130 (step-back): 126→129 cost ZERO — HEAD faster than the iter-125 file, interleaved.** `perf.mjs`
  read day 34.0 / night 40.0 (+2.4/+7.2% vs baseline), the night rise looking like a regression. Interleaved
  HEAD-129 vs the iter-125 file (`c63e43b`, A/B/A/B, min per variant): day **34.17 vs 34.33**, night **40.17
  vs 40.39** — HEAD **−0.5% in BOTH**, i.e. the moon/picnic/cable-car/orchard iters added nothing measurable.
  The +8% night vs baseline is **pure machine load** (the 4-day-old iter-125 file also reads ~40ms night
  today). **NOT re-pinned** (baking today's load in would blind the gate). Same story 125 told for 116→124
  (~+4% night, day flat, overlapping ranges) — the interleaved-against-an-old-commit reading is now proven
  twice as the only honest step-back grade. **Night is the one to watch** (118 added per-window lit-pane draws).
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
- **`c.buzz` — the third derived field, after `c.flow` and `c.val` (iter 104, in `tick()`).** How much
  is there to come out FOR, seen from a hex: `ATTRACT.has(c.t)?2:0` plus a count of `ATTRACT`
  neighbours (`COM`/`MARKET`/`CIVIC`/`STADIUM`/`PLAZA`). Pure terrain derivation, no `rng()`,
  recomputed each tick. It is sparse — **mean 0.54–0.59 over standable hexes, and mostly 0** — so a
  rule keyed to it changes behaviour *only* near attractions and is a no-op across the rest of the
  city. Reuse it for anything meaning "somewhere worth standing"; don't hand-roll a second one.
  **⚠ `c.buzz` is NOT `PEDDEST`** — an attraction field must EXCLUDE the ground you stand on
  (`PEDDEST` is mostly open park, so its argmax is a lawn interior, not a shopfront kerb); see
  iter 104's archived note before re-deriving.
- **The CBD is published: `CBDX`/`CBDY` + `CORER`=16 (iter 98, L215).** `genWorld` has always laid a
  founding crossroads (`mainX`,`fy`) and grown the old town around it; it stayed local for 97
  iterations, so **no rule knew where downtown was**. Note `c.val` is *not* a centrality field — it
  diffuses `valueSrc`, whose peaks sit on **parks and water** (0.92/0.74), not on the core. Anything
  that means "near downtown" should use `hexDist(x,y,CBDX,CBDY)`, not `c.val` and not `CTRX/CTRY`
  (the plate's centre, which is not the city's).
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
  **(l) CLOSED (iter 133)** — a hovered TILE now wears a hex-outline focus ring (`hoverTile`→`render()`,
  1.06 of the footprint, ink-under/cream-pulse matching `stamp()`). `window.__hover(x,y)` sets it for probes;
  `probe-tilering.mjs` gates it. Legibility note carried forward: a thin hover stroke is INVISIBLE in a wide
  downscaled shot (both agents FAILed the fit-zoom read) — re-shoot tight (2×/R55) before doubting the draw.
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
  **(d) the civic quarter's real square — CLOSED, MEASURED DEAD (iter 131; do not re-open).** cue (d)'s
  two goals are severable and each is settled: the **connective** goal (the quarter reads as one precinct,
  not isolated domes) is **already shipped** by the fete "civic mile" bunting (`c.fete`, L1764). The **≥3-hex
  pedestrian-square** goal is **geometrically impossible at the quarter** (`probe-quarter.mjs`, seeds
  7/42/1234): taking the shared road yields **2 hex max** (it bridges a forecourt and a *building*, not two
  forecourts) and every candidate road is the **arterial/monorail/boulevard/bus-stop spine** the invariants
  forbid; growing a forecourt by annexing lots reaches 3 only at the **lone (non-quarter) majors**, never the
  quarter's own (0–1 pavable neighbours, boxed in). So a 3-hex square can exist only where there is no quarter
  to make it *civic*. 114 reverted this; 131 proved it dead in 4s/seed with a geometry probe. Leave it closed.
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
---

<!-- rotated -->

> **Archive:** the 127 entries before Iteration 125 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

## Iteration 125 — the step-back finds a clean city, and a January in its own eye (2026-07-11) [holistic step-back]

**Vector.** The mandated holistic step-back (105/110/115/120/**125**). Not a domain × kind lap: its job is
to read the WHOLE city for *cumulative* drift the census and per-feature visual gates are blind to, run the
perf gate, and — new since 115/120 — do it at **night and a season**, not just a daylit January. No city
domain vector was taken (see the verdict), so rotation is unchanged.

**What was read.** Un-zoomed whole-city frames at **2 seeds × 3 lights/calendars** (42 and 7; day, night,
and a season each), one subagent per seed reading its own three frames and asked the *cumulative* question
("has anything compounded into clutter or darkness?"), never "is the new feature there."

**Result: the city is healthy.** Both agents **VISUAL: PASS**.
- **Night lighting (115) holds across both seeds.** Asked to *locate* the luminous core by light alone
  (108's locate-don't-judge law), both hit near the true CBD — seed 42 at (.48,.47), seed 7 at (.50,.62),
  the latter a discriminating **off-centre** hit. Neither read a flat glitter mat; the rim fades to dark.
- **The sea reads** (116's bottom + 123's founded wind farm): "reads as ONE grouped wind farm parallel to
  the shelf," night sea "deep desaturated blue, not a dead void."
- **No z-order tears, floating tiles, hard seams, or blown-out colour in any of the 6 frames.** Day frames
  balanced, core→edge density gradient intact, open water alive not empty.

**Perf — the gate cried a FALSE FAIL, and the interleaved control caught it.** `perf.mjs` reported night
**+16%** (43.3 vs baseline 37.3) and FAILed, stable across two runs. But the stored baseline is a day old
under a different load: the **iter-115 file's own bytes read 41.3ms night today** (~+10% pure load).
Interleaved HEAD-125 vs the iter-115 file (A/B/A/B, min of 3): night **43.06 vs 41.28 (+4.3%)**, day
**36.44 vs 38.06 (~flat, HEAD faster)** — sample ranges *overlap*. So the real cost of iters 116→124 is
**~+4% night, day flat** — minor. **Not re-pinned** (re-pinning to today's inflated 43ms would blind the
gate to a real future regression); night is the one to watch (118 added per-window lit-pane draws). Header
perf note updated.

**Season — measured alive; the one "defect" an agent named was an artifact of MY shot.** Seed 42's agent
independently reported "winter barely differs from summer." Per 108's law (agents invert "which is more X"),
this was measured, not believed: `probes/probe-season.mjs` (per-tile rendered-pixel distance from winter,
`ROAD` as the zero control) reads **FARM winter→dry-peak 88, winter→autumn 93**, with FOREST/VINEYARD/
ORCHARD/MEADOW/SHOREPARK all moving and PARK/REDWOOD near-zero *by design* (irrigated / evergreen, per 120).
ROAD control **~0–2.2**. The seasons are working. The agent was fooled because I shot the "day" baseline at
the **default** year — which is **~2035.0 ≈ winter (January is the default)** — so it compared the winter
frame to a frame that was *also* winter. Exactly the January-blindness the header has warned about since
108/120, walked into again.

**Change (the step-back's product — a recipe fix, not a city change).** Promoted the lesson into
**SKILL.md**'s step-back section and refreshed the header's step-back pointer: **pin the day/night baseline
frames off January** (`year=2035.62`, dry peak) and keep `2035.02` as the seasonal-contrast frame, so the
two baseline frames sit at different calendar points and seasonal drift can surface on the primary reads.
No `solvista.html` edit; census unchanged and vacuous by construction (tree verified clean after the perf
interleave restored HEAD).

**Verdict — FIXED.** No compounding city defect found (a clean bill of health is the rarer, and the honest,
step-back outcome). The compounding problem that *was* found is in the loop's own guardrail — a step-back
that shoots its "day" frame in January cannot see a seasonal bug and mis-reads winter — and it is now fixed
in the recipe so it stops recurring (108 → 120 → 125). The city grows by keeping its instruments honest.

### Findings

- **⚠ A DEFAULT-CALENDAR "DAY" FRAME IS A WINTER FRAME (new; the third recurrence of the January blind spot).**
  `?warp=61` from `year=1974` lands on ~2035.0, and `applySeason`'s winter keyframe is 0.02 — so an un-pinned
  day shot and a `year=2035.02` "winter" shot are the *same instant*. An agent handed both will report the
  season "doesn't read," comparing winter to winter, and a real seasonal regression on the primary frame is
  invisible. Pin the day/night baselines to a non-winter `year=`; the seasonal frame is the contrast, not the
  day frame. (108 wired `?year=`, 120 shot a season, 125 fixed the *day* frame — the same blind spot, closed
  one layer deeper each time.)
- **⚠ GRADE A STEP-BACK PERF FAIL BY INTERLEAVING AGAINST AN OLD COMMIT'S FILE, NEVER BY THE STORED BASELINE
  (sharpens 117's law).** The baseline is pinned on a specific day's load; a step-back runs days later on a
  different load, so `current vs baseline` conflates code drift with today's load. The clean reading is
  `current-file vs old-commit-file`, interleaved under *the same* load — here it collapsed a +16% FAIL to a
  +4% real delta with overlapping ranges. `git show <old>:solvista.html > /tmp/x.html` and swap it in.
- **A CLEAN STEP-BACK IS A COMPLETE ITERATION — DON'T FORCE A FILLER VECTOR ONTO IT (reinforces 120).** 120's
  law says a step-back that finds a defect then ships an *unrelated* vector wastes the step-back. The corollary:
  when it finds *no* city defect, the honest output is the health record + whatever the read itself surfaced
  (here, the recipe fix) — not a Sky feature invented to have shipped something. "One more shallow feature is
  not automatically worth it" (the skill). The next lap still owes the stalest domain (Sky, then People/Nature).

## Iteration 126 — the moon keeps a calendar (2026-07-11)

**Vector.** Sky & atmosphere × **Deepen**. Sky was the stalest domain (last 115) and had gone twenty laps
without a vector; the documented way past its additive saturation is a **Deepen that adds no element** (115
itself did this). The moon had been a **fixed full disc since the artifact began** — a constant circle at
screen (0.80, 0.15), the same every night of the city's 61-year run. It has a rich neighbour it never talked
to: `year`. So this interconnects moon ↔ calendar ↔ the existing moonglade, adding no tile, entity, CA pass,
or `rng()` draw.

**Change.** The moon now waxes and wanes on a synodic month as `year` advances (~12.37 lunations/yr):
- `MOONF` = lit fraction `(1−cos(2π·frac(year·12.3685)))/2`, computed once at render scope so both the moon
  draw and the moonglade read the *same* phase (one predicate, all readers — iter 112's law).
- The moon draws as a **dim full "earthshine" disc** (so the unlit part still reads as a moon) with the **lit
  lune** on top — outer limb semicircle on the lit side + a terminator half-ellipse whose x-radius shrinks to
  0 at the quarters and flips its bulge crescent↔gibbous by the sign of `cos(phase)`. Craters fade in only
  past `MOONF>0.5`; the glow scales with `MOONF` (a new moon casts almost none).
- **The moonglade dims with the phase** (`×(0.12+0.88·MOONF)`): the sea only shines when there's a moon to
  shine it. New moon → a faint 12% glade; full → the full pool.
- `window.__moon()` → `{phase, illum, waxing}`, and `?year=` (iter 108) already pins it for tests.

**Census.** PASS, exit 0, pageerrors 0. **Every metric +0, tile histogram empty, every entity count
identical** — exactly as predicted for a draw-only change that reads `year` and touches no `rng()`/terrain.

**Probe.** `probes/probe-moon.mjs` (moved into the tracked dir, per iter 101). Freezes the clock, pins night
(t=0.90, LITAMT=1), steps `year` across one full lunation, and counts **alpha-weighted** bright pixels in the
moon box (compositing over the transparent-black canvas — the faint glow is a bright colour at low alpha and
must NOT count as lit; the first draft counted it and read the whole box "lit"). Against `__moon().illum`:
`corr(illum, lit px) = 1.000` on seeds 42 & 7; **new moon → 0 lit px, full → 392** (≈ disc area π·11²); **land
control max dev 0.02–0.26 lum** (only the moon moves). A separate check: full-vs-new **moonglade signal =
+393…419** bright px on the sea across seeds 7/42/1234 — the glade brightens with the phase, as designed.

**Visual.** Both fit-zoom agents FAILED — and **contradicted each other, crossed**: the crescent frame read
as "full", the full frame read as "crescent lit on the left". At ~22px the moon defeats a downscaled PNG, so
per the loop's law (agents fail confidently ⇒ measure) I shot **3× tight clips** and read them myself: the
crescent is lit on the **right** over a dim disc, full is a bright disc with craters, new is a near-dark disc
with a thin sliver, gibbous is mostly-lit with a bite from the left — all four correct and legible at zoom.
Both agents independently confirmed the **whole frame** reads as a balanced night coastal city, no tears/
floaters/blowout. Verdict from probe + own eyes, not the agents.

**Verdict — DEEPENED.** The oldest fixture in the sky finally keeps time, and the sea shines only when it can.
Sky is no longer the stalest domain. No tile, no entity, no `rng()`, pop provably flat.

### Findings
- **`getImageData` RETURNS UN-PREMULTIPLIED RGB — a low-alpha glow reads as full brightness.** A probe that
  thresholds luminance on a canvas with transparency **must** multiply by `alpha/255` (composite over the
  known background). The first `probe-moon` draft counted the moon's 0.15-alpha glow as "lit" and reported the
  entire box lit at every phase (corr 0.000). This bites any future probe that measures a glow/halo/foam over
  transparent canvas.
- **A ~22px feature at fit zoom is below the visual gate's floor — shoot a tight clip and read it yourself.**
  Two careful agents didn't just miss the phase, they inverted it and disagreed. The moon is a *compact* object
  (they all FOUND it), so it isn't cue-(k)'s contrast×width problem — it is simply too few pixels to read
  *shape* from a 1600→downscaled PNG. For any small-but-legible ornament, the gate is a zoomed clip + a probe,
  not a whole-frame agent read.
- **A fixed constant is a Deepen waiting to happen — look for a drawn thing that ignores a field it could
  read.** The moon read *nothing*; `year` was right there. Sky's remaining such seams (the way past its
  saturation, per 108/113/120): `VINEYARD` seed-heads still ignore `year`. Anything drawn from a lone literal
  (a fixed position, a fixed brightness) that a global already varies is a candidate.

## Iteration 127 — the parks get a picnic (2026-07-11)

**Vector.** People & activity × **New element**. People was the stalest domain (last 119) and its additive
inventory was declared spent (119's finding: only Deepen/Scale live) — but that inventory was of *entities*;
its live cells and the domain's biggest **untouched surface** are two different things. Iter 120's step-back
had already sized that surface: **PARK is the city's real green mass (878 hexes)** and *"if you want the city
to look different, the lever is PARK."* The parks had ponds, fountains, cafés, sculptures, fireflies — but no
one *at rest* on the grass (SHOREPARK has a picnic blanket; PARK never did). New element was also the coldest
kind (last 106, twenty laps), and the header said vary off Deepen/Polish. Draw-only + `hashCell`, so pop is
provably flat.

**Change.** A new `v`-band in the PARK draw (`v∈[0.32,0.44)`, ~12% of parks, carved between the fountain and
tree branches): an **open sunny lawn** — one shade tree instead of three — with, **by day only** (`LITAMT<0.5`,
mirroring the kid/day logic and complementing the night fireflies), a **coral-or-lav checkered blanket**
(`hashCell` picks the colour), two white check squares, a `trunk` picnic basket, and **two seated figures**
(a short colour torso + an `ink` head dot, in the ped house style). No new tile, entity array, `rng()` draw,
or `tick()` pass — so no census hook, `TILELABEL`, or `ENTINFO` change (it is still a `PARK`).

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, every core metric **+0**, entity counts
identical (`greenRoofs +1` is the documented `(year*31)` salt jitter). Exactly as predicted for a draw-only
`hashCell` change that touches no terrain and no seeded stream.

**Probe.** `probes/probe-picnic.mjs`. Freezes the clock (109's same-frame law) and counts **LAV** blanket
pixels in each park tile's lower box, by day and by night, with **FOREST** as the null control. Lav is the
signal because it is the *only unique colour*: **coral is shared with terracotta/`coral` building roofs**
(a park next to one reads as a picnic — the first probe draft's headline "112 hits" was a neighbour's roof,
and a coral roof dims below threshold at night so it even fakes the day-only test). Result, seeds 7/42/1234:
**park lav px day 20/17/9 = 46 → night 0/0/0**, **FOREST control 0/0 every seed**. A picnic appears by day,
is gone by night, and nowhere but a park.

**Visual.** My own read of a 5×-zoomed clip (the blanket is ~5px, below the fit-zoom floor — iter 126's law):
a coral blanket with two seated figures + a white check, sitting cleanly on the open lawn beside one tree,
unmistakably a picnic. Then 2/2 whole-frame agents (seeds 42 & 7, `wide`, day `year=2035.62` off-January per
125): parks read as balanced green space (trees + ponds + fountains + **open lawns as legible clearings, not
bare holes**), no z-order tears / floating tiles / blown-out colour anywhere, whole frame a cohesive beautiful
coastal city. The muted coral/lav lawns "blend in," not glaring.

**Verdict — SHIPPED.** People's stalest streak is broken by aiming a New element at its biggest *surface*
(PARK) rather than its spent *entity* list. Draw-only, pop provably flat, day-gated, visible up close.

### Findings for later laps
- **⚠ PICK A PROBE'S SIGNAL COLOUR FROM THE PALETTE'S *UNIQUE* ENTRIES, NOT THE OBVIOUS ONE (new; the lap's
  central lesson).** `coral` was the natural blanket colour and it is **shared by building roofs** (`roofN`
  can be `coral`/`terra`), so the coral probe conflated picnics with the roofs of buildings *adjacent to
  parks* — and because a roof dims at night, it even survived the day-only cancellation. `lav` is used by
  nothing structural (no roof/body/car/road tone), so it is a clean tracer. **Before trusting a colour probe,
  grep the palette for every other draw that uses that colour name.** (Extends 120's "a car dims below
  threshold and reads as day-only" — same trap, different static object.)
- **DAYLIGHT DESATURATES A COLOUR TOWARD GREY — a probe matcher tuned to the BASE rgb will miss it (new).**
  `lav` base `[178,148,198]` renders `~[192,168,184]` at `t=0.30`: B pulled 210→184, the blue-over-green gap
  shrunk from ~+50 to ~+14. The first matcher (`bl>gr+22`) scored **0** on real blankets. Sample the
  *rendered* pixel and tune to that, never to the palette literal.
- **A DOMAIN'S "ADDITIVE INVENTORY IS SPENT" IS A CLAIM ABOUT ITS ENTITIES, NOT ITS SURFACES (new).** 119
  retired People as additively done, and for peds/dogs/joggers/crowds it was right. But the parks — 878 hexes,
  the single biggest tile class — had no people at rest, because "People" had only ever been read as *moving
  entities*. When a domain's entity list is exhausted, look at what large *static surface* it could still
  populate before declaring it saturated. People's remaining such surfaces: plazas/quads (buskers, market
  stalls beyond the café), stadium/amphitheatre seating.
- People's live cells remain **Deepen** and **Scale** for entities; **New element** is now re-opened for it
  via *surfaces* (this lap). The picnic band replaced ~12% of dense-tree park tiles with open lawn + one tree —
  parks stayed balanced (both agents), so a small tree-density trade for variety is safe on PARK's large n.

## Iteration 128 — the cable cars leave the tower (2026-07-11)

**Vector.** Transport × **Deepen** (a fix). Transport was the second-stalest domain (121) and its last entry
banked **cue (n)**, measured and pre-existing: both cabins on every line, every seed, sit within one span of
the start tower at page load, so **no cabin is ever seen riding over the city in any screenshot without
`&step=`**. A banked, measured finding outranks kind-rotation (Deepen has paid a lot lately — but 121 itself
cashed a banked Transport defect on the same logic). The cue named the mechanism and the fix: `stepGond`'s
growth rescale (`cb.p=cb.p<.5?cb.p*k:1-(1-cb.p)*k`, `k=(L-1)/L`, once per span) telescopes each cabin's `p`
toward the anchor cell it held when the line was one span long; **re-spread the cabins once the line settles**,
and do NOT touch the rescale, which keeps a *growing* line smooth (see the finding below for why).

**What the probe found before a line was written** (`probes/probe-cabload.mjs`, new, promoted). Each cabin's
physical fraction `t∈[0,1]` along its line at load, no stepping, seeds 7/42/1234: every one of **5/5 lines
parked** — `t` within **0.026–0.097** of a terminal, mean spread between the two cabins **0.017** (stacked).
Control: a hash of the path polyline, to prove any fix moves cabins and no cable.

**Change.** In `stepGond`, once the line stops extending, re-spread its cabins across the current length once
(keyed to `L` so it re-arms if the line grows on): reset `cb.p` to the artifact's own seed spread `[0.15,0.62]`
(→ `t≈0.30/0.76`, one cabin on each leg). It fires at **three** settle points, not just the cue's `L>=target`:
also at the plate edge (`ty>=G-3`), and when growth has clearly stalled (a new `g.stall` counter of
growth-attempt ticks with no push crosses 90). No `rng()`, no terrain, no draw call, no new entity/tile.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**; core `+0`; `gondLines 15`/`gondola 16`
identical; `pop −3` / `solarRoofs +2` / `greenRoofs +1` is the documented `(year*23)` salt jitter (108/121).
Predicted before running — the vector touches no seeded stream.

**Probe, after.** `5/5 → 2/5 parked`, **mean spread 0.017 → 0.259**, path hashes byte-identical (geometry
untouched). The 2 residual parked lines are **seed 1234's**, and they are parked *correctly*: at 2035 they are
genuinely still mid-growth (`stall:0 wait:0`, 6/tgt21 and 9/tgt14 spans) — an actively-lengthening line, the
one state the rescale exists to keep smooth. A survey (seeds 7/42/100/2024/9/555 + seed 1234 at warp 90/120)
confirms every line that has **reached or neared its target** now spreads; only a slow high-target line caught
mid-growth stays telescoped, which is a true transient, not a defect.

**Visual.** 2/2 PASS, seeds 42 & 7, before/after `coast` clip (the cable band) + `wide` whole-city. Asked to
**locate** the cabins (120's law), not to judge: seed-42 agent found them "bunched at the tower" before and
"spread along the cable, riding mid-span" after; seed-7 agent (whose cable runs inland, off the coast clip)
found them in the wide frame "clearly spread along the cable — one mid-span over a road, a second near the far
mast — not stacked at one tower," both hanging correctly from the rope, no tears/floaters/blowout anywhere.

**Verdict — SHIPPED (DEEPENED / FIXED). Cue (n) is CLOSED** for every settled line.

### Findings for later laps
- **⚠ THE RESCALE IS RIGHT — I CHECKED WHY, SO THE NEXT LAP DOESN'T "FIX" IT (new; validates 121's caution).**
  The tempting simpler fix is to delete the telescoping so cabins keep a constant *fraction* and ride outward
  as the line grows — which would spread *all* lines including mid-growth ones, with no settle flag. It is
  **wrong**: appending one span at the far end then moves a cabin at fraction `t` outward by `t` spans (~0.76
  span ≈ 23px) *per append*, a visible hop on every span during live growth. The rescale keeps a cabin's
  **absolute** position fixed (no hop) at the cost of drifting it to its birth cell (the anchor). Both are
  smooth only in warp (no frames between appends); live play needs the rescale. So the right shape is exactly
  what 121 prescribed: keep the rescale, re-spread at settle. A cue that says "do not touch X" is worth
  *re-deriving* before obeying — here the derivation confirmed it and named the residual it cannot fix.
- **cue (n) RESIDUAL — an actively-growing line legitimately parks its cabins (new, accepted, not a defect).**
  Seed 1234's `tgt21` line is mid-growth across a wide era range because its shore earns spans slowly, so a
  still frame there catches telescoped cabins. This is the rescale working. If a future lap wants even these
  spread, the only clean way is a *warp-only* spread (during screenshot generation there are no frames between
  appends, so constant-fraction is free) — but that is mode-dependent plumbing for a rare transient; weigh it
  against just leaving it.
- **THE MINSEP COSMETIC IS STILL OPEN (121's last sub).** The two cabins ride one drawn curve and pass through
  each other once per half-trip; `[0.15,0.62]` is 0.47 apart in `p`, not antipodal, so they cross off-centre.
  A real jig-back tram counterbalances its pair on a loop. One-line change, low value, no agent has ever
  remarked on it — belongs after anything that matters.

## Iteration 129 — the orchard names its season (2026-07-11)

**Vector.** Nature × **Interaction/UX**. Nature was the stalest domain (last 120) and the header steered hard
**off Deepen** (6 of the last 11) and off New element (127) — leaving the tell (117's most-reliable move) as the
right kind. The orchard has drawn a seasonal **blossom/fruit overlay from `year` since iter 57**, but
`describeTile` never named it: hovering an orchard showed only `Value`, while MEADOW right beside it gets a live
`Wildflowers` row. So the DRAW knew the calendar and the tooltip stayed mute — exactly the seam 117's law names.

**Change.** A shared `orchardPhase()` (near the wood helpers) returns `blossom`/`fruit`/`leaf` from
`applySeason`'s own windows (`s2∈(0.16,0.42)` / `(0.70,0.99)`). The orchard **draw** now derives its
`blossom`/`fruit` booleans from it (was two inline `s2>…` tests — behaviour-identical, verified), and
`describeTile` reads the **same** function for a new `Grove` row (`In blossom` / `In fruit` / `In leaf`). One
predicate, all readers (112's law) — the tooltip can never name a fruit the renderer didn't paint (117's law).
No tile, entity, `rng()`, or `tick()` pass; the city's pixels are unchanged.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**; core `+0`; `greenRoofs +1` is the documented
`(year*31)` salt jitter (127). Exactly as predicted for a describeTile-only change.

**Probe.** `probes/probe-orchard.mjs` (new, promoted), two independent truths, neither trusting
`orchardPhase()` — per 122's law that a tooltip vector needs a probe against *recomputed* truth, not a
screenshot it renders. **(1) String:** the `Grove` row vs phase recomputed from the keyframe windows in the
probe's own math — **72/72 orchard rows match across seeds 7/42/1234 × 4 keyframes, 0 wrong**; FOREST control
prints a `Grove` row **0** times. **(2) Draw:** crown-box RGB shift from the winter frame, **ORCHARD minus
FOREST** (forest eats the shared seasonal warming — 127's law that coral is un-isolable, so difference it out
instead of colour-matching it). Excess = the overlay the orchard alone paints: **spring "In blossom" +11.83
(largest)**, dry-peak "In leaf" +5.60 (smallest), autumn "In fruit" +8.71 — the pixels move most exactly
where the row says blossom, least where it says leaf.

**Visual.** Hover shots at three calendar pins (blossom/fruit/leaf), read by an agent: all three show
`Orchard → Fruit groves. → Grove: <In blossom|In fruit|In leaf> → Value 56%`, mapping exact, same two-column
style as the Value/Woods rows, no glitch. Whole-city `wide` frame (seed 42, dry peak): balanced coastal city,
no tears/floaters/blowout — as expected, the render is untouched.

**Verdict — SHIPPED.** The grove that has kept the calendar since 1974 finally says so when you point at it.
Draw-render byte-identical, pop provably flat, the tell cashed a seventh time.

### Findings for later laps
- **THE ORCHARD/VINEYARD/GARDEN TOOLTIPS WERE ALL MUTE — only the orchard COULD be un-muted honestly (new).**
  Of the three, only the orchard's *draw* reads `year`; VINEYARD shows ripe lav grapes year-round and GARDEN is
  static. So their tooltips can't get an honest season row until their **draws** read the calendar first — which
  is a **Deepen**, not a tell. `VINEYARD` is the last name on the Sky-feedable list (108/113/120): make its
  grapes bud→green→purple→bare on `year` like the orchard, *then* its tooltip earns a row. That is the banked
  Nature × Deepen, and it also finally cashes `TILEDESC[VINEYARD]`'s "Terraced grapevines — wine country."
- **DIFFERENCE OUT A GLOBAL CONFOUND WITH A CONTROL TILE, DON'T COLOUR-MATCH IT (reinforces 127).** The first
  draw-truth draft counted "pale coral" blossom pixels and the FOREST control read 30–55 of them — because
  `applySeason` warms the *whole* frame and coral is shared with autumn foliage (127's exact trap). Switching to
  *(orchard shift − forest shift) from winter* cancelled the season and left a clean +11.83 blossom signal. When
  a season/light/weather global moves every tile, pick a control tile that gets the global but not your feature
  and subtract it — same shape as probe-season's ROAD zero.

## Iteration 130 — the sixth step-back finds a clean, quiet city (2026-07-11) [holistic step-back]

**Vector.** The mandated holistic step-back (105/110/115/120/125/**130**). Not a domain × kind lap: it
reads the WHOLE city for *cumulative* drift the census and per-feature gates are blind to, runs the perf
gate, and — per 115/120/125 — does it at **night AND a season, with the day/night baselines pinned OFF
January** (`year=2035.62` dry peak; `2035.02` as the seasonal-contrast frame). No city vector was taken, so
rotation is unchanged; next lap (131) owes the stalest domain, Civic (122) / Water (123).

**What was read.** Un-zoomed whole-city `wide` frames at **2 seeds × 3 lights/calendars** — seed 42
(warp 61) and seed 7 (warp 31), each at {day 2035.62, night 2035.62/t=0.90, winter 2035.02}. One subagent
per seed read its own three frames and was asked the *cumulative* question ("has anything compounded into
clutter or darkness?") plus 108's **locate-don't-judge** night test ("where is the core by light alone?").

**Result: the city is healthy — both agents VISUAL: PASS.**
- **Night lighting (115) holds at both seeds, LOCATED off-centre.** Asked to point at the luminous core by
  light alone, seed 42 landed at ~(.45,.45), seed 7 at ~(.48,.60) — the latter a discriminating off-centre
  hit — both with a genuine core→edge falloff ("not a flat glitter mat"), rim fading to dark.
- **The sea reads** (116's bottom + 123's founded wind farm): "grouped features on a clean graded
  teal/navy," turbines parallel to the shelf, night water "dim but legibly lit, not a dead void."
- **No z-order tears, floating tiles, hard seams, or blown-out colour in any of the 6 frames.**
- **Winter reads distinct from summer** at both seeds (browner farm/scrub, cooler sky), city balanced.

**Season — measured alive, not believed.** `probes/probe-season.mjs` (per-tile rendered-pixel distance from
winter, `ROAD` as the zero control): FARM winter→dry-peak **88.4**, →autumn **93.1**; VINEYARD/ORCHARD/
FOREST/MEADOW/SHOREPARK all move; PARK/REDWOOD/GARDEN near-zero *by design* (irrigated/evergreen, per 120).
ROAD control **0.5–2.1**. The calendar is working.

**Perf — the gate cried the same false alarm as 125, and the interleaved control caught it again.** `perf.mjs`
read day **34.0ms** (+2.4% vs baseline) / night **40.0ms** (+7.2%), the night rise looking like a regression.
Interleaved HEAD-129 vs the iter-125 file (`c63e43b`, A/B/A/B, min per variant): day **34.17 vs 34.33**, night
**40.17 vs 40.39** — HEAD is **−0.5% in BOTH**, so iters 126→129 (moon calendar, park picnics, cable-car
re-spread, orchard tooltip) added **nothing measurable**. The +8% night vs baseline is **pure machine load**:
the 4-day-old iter-125 file also reads ~40ms night today. **NOT re-pinned** (baking today's load in would
blind the gate to a real future regression). Census PASS and vacuous by construction (no source edit).

**Change (the step-back's product — none to the city).** The read found no compounding defect, so per 120/125
("a clean step-back is a complete iteration — don't force a filler vector onto it") the output is the health
record itself plus the header refreshes: step-back pointer → 135, perf note gains the 130 interleaved reading,
rotation pointer notes 130 as the step-back. No `solvista.html` edit; tree verified clean after the perf
interleave restored HEAD.

**Verdict — FIXED.** No compounding city defect (the rarer, honest step-back outcome). The perf gate's
stored-baseline false-FAIL — the one drift the step-back *did* re-surface — is confirmed benign by the
interleaved control, exactly as 125 predicted; the guardrail stays honest.

### Findings

- **THE STORED-BASELINE PERF FALSE-FAIL IS NOW A RECURRING, PREDICTED EVENT — grade every step-back FAIL by
  interleaving against an old commit's file (125's law, confirmed twice).** 125 saw night +16% vs baseline and
  proved it ~+4% real; 130 saw night +7% and proved it −0.5% real. The stored baseline is pinned to one day's
  load; a step-back days later conflates code drift with today's load. `git show <old>:solvista.html > /tmp/x`
  and swap it in, A/B/A/B, min per variant — the delta is the only honest reading. Do not re-pin to an inflated
  day, and do not re-chase a night number that an interleaved control collapses.
- **A CLEAN STEP-BACK CONFIRMS THE ACCUMULATED VISUAL LAWS ARE STILL LOAD-BEARING, seven iters on.** 115's
  night lighting, 116's sea bottom, 120's by-design evergreen/irrigated seasonal freeze, and 123's founded
  wind farm all still read correctly at both seeds under all three lights — nothing has quietly eroded them.
  The value of a no-change step-back is exactly this: proof that the earlier fixes have not been undone by
  later additions.
- **`cp` is `-i` here and `grep` is `ugrep` — a perf interleave loop that shells `cp`/`grep` will hang on the
  overwrite prompt or choke on `->`/`>` in the timing line.** Use `/bin/cp -f` and `command grep -E '^  (day|
  night) '`; don't `grep -v '>'` the timing line (it contains `>60fps-budget`). A small tooling snag that ate
  two perf runs this iteration; noted so 135 doesn't re-lose them.

## Iteration 131 — the civic square is measured dead, and cue (d) closes (2026-07-11)

**Vector.** Civic & culture × **Polish/Connect** (an EXPLORE). Rotation named the domain — Civic was the
single stalest (122, older than Water 123) — and the header's own law (*a banked, measured cue outranks
kind-rotation*) named the content: **cue (d)**, the loop's most-flagged open cue, banked by 91, attempted
and reverted by 114, and re-listed "STILL OPEN" ever since. Its goal: the civic quarter's knot of private
1-hex forecourts should become **one legible ≥3-hex pedestrian square** (114 proved 3 reads at fit zoom, a
1-hex ribbon does not — 101's contrast×width law). Kind was forced away from Deepen (5 of last 10) and
Interaction/UX (2 of last 10), which Polish/Connect satisfies. Per *probe before you design*, I measured
the geometry before writing a line — and the measurement **closes the cue** instead.

**What the probe found** (`probes/probe-quarter.mjs`, promoted). In-page, seeds 7/42/1234 at warp 61:
- **Every city has exactly ONE multi-major quarter** (3–4 majors); the other majors are lone and scattered.
  Forecourts are **all 1-hex** (confirms 114's `[1,1,1]` measurement, now across the annex geometry too).
- **Reading A — take the shared road → a 3-hex square: IMPOSSIBLE.** Pedestrianising a single shared-street
  ROAD yields a **2-hex patch at most, never 3** — the bridgeable road touches a forecourt PLAZA and a
  *building* (CIVIC, which does not extend a PLAZA patch), not two forecourts. And **every** such candidate
  road is the **arterial + monorail + boulevard-tree + bus-stop spine**: haz=[ARTERIAL], [ARTERIAL,treed,MONO],
  [stop,busy,treed] — precisely the network the invariants forbid severing. 114's "take the ROAD" is dead:
  it is insufficient (2 hex) *and* it is the spine.
- **Reading B — grow a forecourt to 3 by annexing pavable lots: ALSO IMPOSSIBLE at the quarter.** Of 11
  forecourts, only **2** have ≥2 pavable-lot (`FORECOURT_LOT`) neighbours to annex — and both are the
  **isolated lone-major** forecourts (seed 42 `(27,1)` [MID,MID], seed 1234 `(42,1)` [RES,RES,RES]), NOT the
  quarter's. **The quarter's own forecourts have 0–1 pavable neighbours** (boxed in by civics, the mile, and
  each other). So a 3-hex square can be grown only where there is *no quarter* to make it a **civic** square —
  a contradiction. (And annexing RES/MID costs pop for a barely-visible tile — 100's ~0.045%/cell, 92's
  never-zone-near-TOWER.)
- **Reading C — the connective goal is ALREADY SHIPPED.** cue (d)'s deeper intent (the quarter reads as one
  connected precinct, not isolated domes) is delivered by the fete **"civic mile"** (`c.fete`, L1764): a
  pure-derivation BFS strings bunting along the ROAD stretch where two civics' road-regions meet — the
  district is already tied together along the street the square wanted to be.

**Census.** PASS, exit 0. `solvista.html` **byte-identical to HEAD** (`git diff --stat` empty) — no source
edit, so the census is vacuous by construction (this is an EXPLORE that rejected its design *before*
implementation, cheaper than 101/114 which built then reverted). No visual gate is owed — nothing draws
differently. The probe **is** the gate: a measurement that could have found a 3-hex opening and instead
found none, on ≥2 seeds, with the hazard list as its own control.

**Verdict — EXPLORED → REVERTED. Cue (d) is CLOSED.** Its ≥3-hex-square goal is geometrically unreachable at
the quarter (2 hex max on the arterial/mono spine; the only 3-annexable forecourts are lone non-quarter
majors), and its connective goal is already met by the civic-mile bunting. Building anything here would be
marginal filler on a hazard — the census can pass a change that isn't worth its cost (82/88/101/114), and
this one fails the bar *before* a pixel is drawn. Reverting a passing-but-weak change is the system working;
declining to build a measured-dead one is the same working one step earlier.

### Findings
- **⚠ CUE (d) IS DEAD IN BOTH READINGS — DO NOT RE-OPEN IT (new; supersedes 91/114 and every "STILL OPEN"
  header note).** Road-take → 2 hex on the spine; lot-annex → only lone (non-civic) forecourts can reach 3.
  The two goals of cue (d) are severable: the **connective** one (precinct reads as one) is *shipped* (civic
  mile); the **square** one is *impossible* without either severing the arterial/monorail spine or building
  the square where there is no quarter. `probe-quarter.mjs` is the proof and re-runs in ~4s per seed.
- **MEASURE A CUE'S GEOMETRY BEFORE ITS DRAW (sharpens "probe before you design").** 114 built a throwaway
  square, saw it was pretty, reverted on the *host* being wrong, and banked "take the ROAD." One probe that
  floods the hypothetical patch and reads the hazard flags would have shown in 4s that the road-take yields 2
  hex on the spine — no build needed. When a cue is about *where a thing can go*, the first artefact is a
  geometry probe, not a draw.
- **A "beautiful in a throwaway" proof is necessary, not sufficient — it says nothing about whether the
  geometry admits it at the sites that matter.** 114's 3-hex mock was genuinely legible; the error was
  generalising from a hand-placed patch to a quarter whose real cells cannot form one. Prove the *siting*, not
  just the *look*.
## Iteration 132 — the kelp beds grow a canopy (2026-07-11)

**Vector.** Water & coast × **Polish**. Rotation named the domain — Water was the single stalest (123).
Kind was steered by two constraints: Water's banked cue (pier/lifeguard-on-depth) *repeats* 123's
site-on-depth mechanism, and the header said to **vary it or pick a different Water kind**; and Deepen
had paid 4 of the last 9 laps. Polish satisfies both (it varies off Deepen and off the banked cue). The
target chose itself: the kelp bed is the artifact's own documented failure surface — *"kelp lined the
entire coast dark for ~13 iterations"* — and the draw was a **flat `waterDk` hex + four sub-pixel fronds**,
so a bed read as a dark absence rather than a living forest.

**Change.** `case T.KELP` now floats an **olive frond-canopy** on the dark shallows: 4 broad soft
elliptical mats per hex, `colMix('waterDk','canopy',t,·)` (only ~a third of the way toward `canopy`, `t`
quantized so the cache stays bounded), hashCell-placed (no `rng()`), clipped to the hex, drifting on
`waveT` like the fronds above them. The base dark fill and the four upright fronds are untouched and draw
on top. The mats are **greener, not brighter** — the bed keeps its place as the darkest thing inshore
(the palette's stated intent, L266–269), it just reads as canopy instead of a hole.

**Census.** PASS, exit 0. Draw-only and stream-neutral (no terrain, no `rng()`) — tile histogram empty,
all core metrics +0, as expected for a Polish. (`greenRoofs` wobbled ±1 between runs on *pristine* HEAD
too — the roof-adoption CA ticks a load-dependent number of times during the headless warp; it is census
timing-noise, not this edit, which lives entirely inside `drawCell`.)

**Probe.** `probes/probe-kelp.mjs` (promoted). Freezes the sim (same-frame-control law — mats AND fronds
drift on `waveT`), samples a 5×5 disc at every KELP hex centre on patched vs `git show HEAD:`, seeds
7/42/1234 at neutral tide / dry-peak / midday. Result: **KELP moved, mean |ΔRGB| 4.56**; olive index
**(g−b) 18.0 → 26.5** (the mats add green, not blue); luminance **116.5 → 117.4** (+0.9, so the bed did NOT
brighten — hold-the-mean holds, it stays darkest inshore). **WATER control: mean |ΔRGB| 0.20** (≈0, just
hex-edge antialiasing where a water hex abuts a kelp hex) — the edit touched only `case T.KELP` and the
control proves the rest of the sea did not move. VERDICT: PASS.

**Visual.** Two agents, one per seed, coast-zoom + a whole-city wide (seed 7). Seed 42 **located the
olive kelp beds** hugging the beach edge on the lower-left, reading as *"dark olive/green smudges on the
darker teal — the darkest inshore element, greener rather than a flat black hole,"* inside the water hexes,
no spill onto sand or open sea. Seed 7 PASSED with the olive read *marginal at that zoom* (it saw the
darker inshore patches but could not confirm the tint) — which the probe's control-checked +8.5 olive shift
settles quantitatively. Both: no z-order tears, no floaters, no blowout anywhere; the whole-city frame
still reads as a balanced, beautiful coast, nothing compounded into darkness. Both `VISUAL: PASS`.

**Verdict — SHIPPED.** The kelp bed reads as a kelp forest from above, not a dark hole, and the change is
provably confined to kelp hexes (control 0.20) without darkening the coast (Δlum +0.9). Draw-only,
stream-neutral, ~25 lines.

### Findings
- **THE KELP TILE'S DRAW NOW READS `waterDk`/`canopy` AS A CANOPY, BUT ITS TOOLTIP IS STILL MUTE** —
  `TILEDESC[T.KELP]` says only *"Seaweed swaying in the shallows"* and `describeTile` prints nothing of the
  bed. The un-cashed KELP tell (header) is still open, and now *richer*: a bed knows its extent (a flood
  fill of KELP neighbours, exactly the woods' `Stand — N hexes`, iter 117) and its depth (`rDeep`). That is
  the next Water × Interaction/UX lap when Water comes round again — but it needs a probe that recomputes
  bed size independently (122's law: a tooltip vector needs truth checked against recomputation, not a
  screenshot that it renders).
- **A "re-tone a small surface" Polish gets the same instrument as a large one** — `probe-kelp` is
  `probe-seatone`'s shape (freeze, sample the hex-centre disc on patched vs `git show HEAD:`, join by key)
  narrowed to a sparse tile with a **same-domain control** (open WATER). The control is what makes a draw-only
  Polish gate-able at all: |ΔRGB| 4.56 on the target vs 0.20 on the control is a verdict a screenshot cannot
  give, and it caught nothing wrong here only because the edit was correctly scoped — that is the point.
- **⚠ `probe-seatone.mjs` RESOLVES `REPO` AS `dirname(import.meta.url)`, which is `probes/`, NOT the repo
  root** — so `join(REPO,'solvista.html')` and `git -C REPO` only work if you happen to run it from a cwd
  where that path resolves, and it violates the skill's own law (resolve `../../../../solvista.html` from the
  probe's location). `probe-kelp` does it right (`resolve(HERE,'../../../..')`) and runs from any cwd; the
  older probes that copied the `dirname` form should be fixed the next time one is touched.

## Iteration 133 — the hovered tile gets its ring, and cue (l) closes (2026-07-11)

**Vector.** Urban fabric × **Interaction/UX** (SHIPPED). Rotation named the domain — Urban was the single
stalest (last 124) — and the header named the content twice over: Urban's *additive* moves are surveyed
**spent** (118), its Interaction/UX cell was **empty**, and banked **cue (l)** was waiting there. Kind was
forced off Deepen (4 of last 9) and off the site-on-depth mechanism; Interaction/UX satisfies both and fills
the last empty Urban cell.

**The defect (cue l, banked iter 117).** Entities have worn a `stamp()` focus ring since iter 71, but a bare
hovered **TILE** got none: `hoverEnt` is `null` whenever the cursor is over ground, and the only ring keyed
off it. So every tile tooltip in the artifact's history — U2's, 97's coast, 117's woods, 122's institutions —
**named a hex the frame never pointed at**, and on a dense grid at fit zoom you cannot tell which one it means.

**Change (~20 lines, draw-only).** A new `hoverTile` is set by the `mousemove` handler in the same branch that
already resolves the tile for the tooltip (and cleared on entity-hover, off-plate, pan, and `mouseleave` — one
predicate, every reader). `render()` draws it last, as an affordance: a hex-outline ring at `ctr(hoverTile)`,
scale **1.06** of the footprint (`hexTile`'s own path, no fill, so terrain and anything standing on it read
through), with the **same ink-under (2.6px) / cream-pulse (1.1px) stroke as the focus ring and the transit
trace** — the whole hover language is now one voice. Added `window.__hover(x,y)` (mirrors `__find`/`__ents`;
`shoot.mjs` can't hover) for probes/screenshots.

**Census.** PASS, exit 0. Draw-only, stream-neutral (no terrain, no `rng()`) — tile histogram empty, core
metrics +0. (`greenRoofs` +1 is the roof-adoption CA's known headless-timing wobble, ±1 on pristine HEAD too.)

**Probe** `probes/probe-tilering.mjs` (promoted). One patched build compared against ITSELF in two hover
states (the ring is a new *state*, not a re-tone — no pristine build needed). Freezes the sim (the ring pulses
on `time`), then drives a **real `page.mouse.move`** onto a PARK's screen coords (tests the true handler, not
just the `__hover` hook) and diffs a hex-box against the hover-off frame, with a far-off WATER hex as control:
seeds 7 & 42, **target |ΔRGB| 8.73** (ring drawn on the hovered hex) · **control 0.000** (it is one hex, not
a wash) · **cleared residual 0.000** (move to void ⇒ ring vanishes, no sticky ring). VERDICT: PASS.

**Visual.** Both fit-zoom agents FAILED — *and the probe + my own eyes overturned them*, the loop's law
exactly (agents fail confidently ⇒ measure, then look at that one PNG). At R=130 the 1.1px cream stroke
downscales away, so both agents (correctly, on their evidence) could not *see* it — while **both independently
confirmed the WHOLE frame is clean**: no z-order tears, floaters, doubled rings, or blowout, city reads
balanced. A **tight R=55 / 2× clip** settled the legibility question I could not delegate: a crisp
black+cream hexagon outline hugging **exactly one** hex — the green PARK (seed 42) and the hospital hex (seed
7) — sitting correctly on the hex grid, tracing one hexagon cleanly. Bold and legible where the cursor is (=
where the user looks). VISUAL: PASS on the tight reads + the delegated whole-frame reads.

**Verdict — SHIPPED. Cue (l) is CLOSED.** Every tile tooltip in the artifact now points at the hex it names.
Urban's Interaction/UX cell is filled; only Sky now lacks an Interaction/UX vector.

### Findings
- **A "hover ring is invisible" agent FAIL is a ZOOM artifact, not a defect — the stroke is 1.1px and dies in
  a downscaled wide clip.** The probe (`|ΔRGB| 8.73` hex-local, control 0.000) and a tight 2×/R55 clip both
  show it crisp. When a thin *linear* affordance "can't be seen," re-shoot tighter before touching the draw
  (101's contrast×width law, read the other way: at fit zoom width is fixed, so magnify the *shot*).
- **`shoot.mjs`/`hovershot.mjs` cannot screenshot a TILE hover** — `hovershot` aims at entities via `__ents`.
  `window.__hover(x,y)` (this iter) is the tile analogue; a tiny custom shot script that calls it + clips
  tight is the pattern for any future tooltip/hover/selection vector on a *tile* (122's institutions, 117's
  woods, 97's coast could all now be re-shot with their hex marked).
- **The next tooltip lap can reuse this ring for free.** 132's banked KELP-tooltip cue and any future
  `describeTile` enrichment now land on a hex the frame *marks* — the legibility half of every tile-tooltip
  vector is done; only the *words* remain.

## Iteration 134 — the almanac that strobed (2026-07-11)

**Vector.** Sky & atmosphere × **Interaction/UX** (an EXPLORE → REVERTED). Rotation named the domain
twice over: Sky was the single stalest (last 126) *and* the one domain the grid showed lacking an
Interaction/UX vector (133's own closing line). The content chose itself by the loop's most reliable
tell — *a thing the code knows and no readout names*: the HUD stat strip prints the **year** integer
and the **time of day** (`phaseWord`), but never the **season** (hidden inside the year) nor the **moon
phase** (iter 126 gave the moon a synodic calendar and `__moon()`, surfaced NOWHERE in the UI). Kind
varied off Deepen (4 of the last 9) and off the site-on-depth mechanism.

**Change (built, then reverted).** `stPhase` → `seasonWord(year)+' · '+phaseWord(dayT)` (e.g. "summer ·
golden hour"), season anchored to `applySeason`'s own peaks so word and palette can't drift; plus a new
`.stat.moon.opt.sm` card between the year and the residents count — a moon glyph (`\u{1F311}`…`\u{1F318}`,
eight phases) + a phase word ("waxing gibbous"), read from `moonReadout()` which calls `__moon()` (one
predicate, shared with the drawn disc). `__setYear`/`__setTime` were made to refresh the readout.

**Census.** PASS, exit 0. Draw/DOM-only, stream-neutral — tile histogram empty, all core metrics +0.
(Vacuous by construction, as every readout iteration is.)

**Probe (`probe-almanac.mjs`, written, ran, then deleted with the feature).** Pinned `?year=` across a
season/phase spread on seeds 7 & 42; read `stPhase`/`stMoonLbl` from the live DOM and compared to an
independently-recomputed season & moon (122's law — check the claim against recomputed truth, not a
screenshot that it renders). **48/48 pass**, control held (changing `?t=` moved neither season nor moon).
So the mapping was *correct*. The probe proved the wrong thing.

**Visual — and where it turned.** Static tight HUD clips (day/night/frozen-crescent) read beautifully:
"AUTUMN · DAYTIME", 🌕 "FULL MOON", and the crescent glyph rendered as a distinct dark disc with a thin
lune. But **two whole-frame agents (one per seed) both FAILED**, and both were RIGHT: (a) the raw `·`
byte rendered as mojibake **"Â·"** over the http-served shot — the file has **no `<meta charset>`**, so
Chromium fell back to windows-1252 (my `file://` clips sniffed UTF-8 and hid it); (b) the night agent
caught the drawn crescent contradicting the HUD's "FULL MOON". (b) sent me to **measure the calendar's
rate in normal play** — the one thing a static frame cannot show — and that measurement **killed the
vector**: `year` advances **0.170 yr/sec at speed 1** (it is a fast *development* clock so a city grows
over minutes, NOT a wall calendar). In 3 s of play the **season word cycled through 3 values (~0.7 Hz)**
and the **moon phase through 5 (~2 Hz strobe)**. As a text readout that is flickering noise — and it
*degrades* the previously-readable time-of-day line (driven by the slow `dayT`, ~110 s/cycle) by welding
it to the sprinting year clock.

**Verdict — EXPLORED → REVERTED.** `solvista.html` restored byte-identical to HEAD. The readout was
*correct* (probe 48/48) and *pretty* (static clips) and still failed the bar the moment it moved. The
census can pass a change that isn't worth its cost, and a frozen visual gate can pass one that only reads
right when frozen (82/88/101/114/131 — now 134). Reverting it is the system working.

### Findings
- **⚠ `year` IS A FAST DEVELOPMENT CLOCK (~0.17 yr/sec = 1/6 at speed 1), NOT A WALL CALENDAR.** Anything
  that names the **season** or the **moon phase** from `year` in a live text readout STROBES (season ~0.7 Hz,
  moon ~2 Hz, measured over 3 s of play). This is why `stPhase` correctly showed only time-of-day, off the
  SLOW `dayT` (~110 s/cycle): a readout must be matched to its clock's speed. Do not re-surface season/moon
  as text until the clock they read is slowed.
- **⚠ iter 126's DRAWN MOON ALSO STROBES ~2 Hz at night** — a latent defect its frozen-frame visual gate
  could not catch (a single screenshot is blind to a 2 Hz cycle). **This is the real banked Sky vector:** a
  Polish/Fix that decouples the moon's synodic phase from the sprinting `year` (e.g. tie lunations to `dayT`
  days, or to a slowed calendar), so the disc reads as a slow, legible moon — and ONLY THEN does a
  season/moon HUD readout become viable. The almanac is banked behind this fix.
- **A STATIC SCREENSHOT GATE IS BLIND TO STROBE/FLICKER — a "does it read in MOTION?" claim needs a TEMPORAL
  probe** (sample the DOM/canvas over N seconds of real play, `playing=true`, and count distinct states).
  This is the mirror of the freeze-the-clock law (which is for two-render *diffs*): a diff needs a frozen
  clock; a *rate* needs a running one. Every gate this loop owns — census, probe (frozen), visual (frozen) —
  was blind here until I let the clock run and counted states. Reach for this for any readout/animation whose
  correctness is about *cadence*, not a single frame.
- **⚠ THE FILE HAS NO `<meta charset>` — KEEP JS STRING LITERALS PURE-ASCII.** A raw `·` (U+00B7) renders as
  mojibake **"Â·"** when `shoot.mjs` serves over http (Chromium falls back to windows-1252); a `file://` load
  sniffs UTF-8 and HIDES the bug, so my own tight clips looked clean and only the http wide shots caught it.
  In JS strings use the escape (`'·'`, and `'\u{1F311}'`… for the moon glyphs, which I DID get right); in
  HTML use `&middot;`/`&mdash;`/`&times;` — exactly as the rest of the file does (every glyph was ASCII-safe
  before this). Promoted to SKILL.md (Invariants).
