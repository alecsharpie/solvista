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
| **Nature** | 4, 26, 29, **102** | 1, 13, 60 | 37, 46, 67, 76, **108**, **120**, **139** | ~~46~~, ~~88~~, ~~101~~ | U4 | 53, 96 | **117**, **129** |
| **Water & coast** | 6, 10, 12, 16, 20, 33, **106** | 90 | 17, 25, 51, 65, 72, **113**, **123** | 22 | | U2, 44, 58, 79, **116**, **132** | **97**, **141** |
| **Urban fabric** | 32, 62 | 7, 23, ~~82~~ | 38, 54, 68, 92 | 47, **109** | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103**, **110**, **118**, **124**, **143** | **133** |
| **Transport** | 2, 9, 21, 31, 48 | 77 | 28, 39, 55, 63, **112**, **121**, **128** | 5, 15, **138** | U4 | U1, U3, 70, 85, 87, 94 | **105** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107** | 36, 59, 66, 80, 91 | 45 | | 73, ~~**114**~~ | 52, 122, **140** |
| **Sky & atmosphere** | 27, 43 | | 19, 35, 50, 57, 95, **135** | | | 61, 81, 89, **115** | ~~**134**~~ |
| **People & activity** | 41, 56, **127** | 49 | 34, 64, 93, **104**, **119** | 78, **111** | | 84, **137** | 71 |

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
  Sky **135** · Urban **143** · People **137** · Nature **139** · Transport **138** · Civic **140** · Water **141**.
  **Stalest is now Sky (135)**, then People (137) — check the last entry of the stalest domain for a banked
  finding before reading its row. (**137 took People × Polish**: gave the walking figures — peds/dogs/joggers,
  the only movers with no `shadS()` shadow while every vehicle has one — the house-style contact shadow at the
  feet; draw-only, `probe-figshadow` gates it. People's figure/crowd draws are richly polished now; only the
  *static* standing crowds still cast no shadow. **⚠ The live ped/dog system is non-reproducible across page
  loads — probe figure DRAW changes by controlled placement, not a build-vs-build diff (137's findings).**) (**Sky's moon strobe is FIXED (135)** — the moon's synodic phase now reads `dayT` (the slow ~110 s/cycle
  day counter) not the fast `year` dev clock, so the disc reads as a slow legible moon, not a ~2 Hz flicker
  (`probe-moonrate`: 12→0 strobe-crossings/3 s). **Banked next for Sky: the SEASON still reads `year` and would
  still strobe** (~0.7 Hz, 134), so a moon-only HUD card is now viable but a season word needs its own slow clock
  first (135). **134's full almanac was REVERTED** — don't re-ship it assuming 135 unblocked it. Sky's additive/CA
  cells are still traps, see below.) (**132 took Water × Polish** — the kelp beds got a floating olive canopy so a bed reads as a living
  forest, not a flat dark hole, while staying the darkest thing inshore; `probe-kelp` gates it.)
  **Water's STILL-banked cue (123): the pier/lifeguard are still `rng()`-salted; site them on a depth by respending
  their draws (123's stream-neutral trick) — but that REPEATS 123's site-on-depth mechanism, so vary it.** (**129 cashed the tell a 7th time for Nature**:
  the orchard drew a blossom/fruit calendar since iter 57 but its tooltip was mute; it now names the
  season via a shared `orchardPhase()`. **129's banked Nature Deepen is CASHED (iter 139)**: VINEYARD's
  grapes/canes now read `year` via a shared `vinePhase()` (bare in winter → purple at harvest), the last frozen
  agriculture tile. Its tooltip is now the un-cashable next Nature × Interaction/UX (a `Vines` season row from
  the same `vinePhase()`, like 129's orchard `Grove` row).) (**127 took People × New element** aimed not at its spent
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
  **123 ran the tell FORWARDS**, which is a new move: rather than making the draw honor a string, it made the
  string and the rule **share one constant** (`SHELF0`/`SHELF1` — the tooltip *names* the `Coastal shelf`, the
  wind farm *stands* on it), so the two cannot drift apart in the first place. Prefer this to re-syncing them
  later. Related, and the deeper prize: **a derived field earns its keep when a RULE reads it, not when the draw
  shows it.** `rDeep` was drawn by 116 and read by nothing until 123 sited on it. Still unread by any rule:
  **`rGreen`, `rShop`, `rServ`** feed only the walkable stat — *nothing sites itself against them.*
  **Iteration 147 is the next holistic step-back** (105, 110, 115, 120, 125, 130, 136, **142**, …). Shoot it
  **at night AND a season, and PIN THE DAY FRAME OFF JANUARY** (`year=2035.62` dry-peak baselines +
  `2035.02` as the seasonal-contrast frame — a default `?warp=61` frame is already ~winter; SKILL.md holds
  the full recipe). **130, 136 AND 142 all found NO compounding city defect** (three clean bills in a row, the
  honest step-back outcome, no city change): both seeds PASS day/night/season, agents *located* the night core
  off-centre by light alone (142: (.47,.53)+(.40,.30) / (.47,.62), matching 136; 115's lighting holds), 138's
  arterial night-corridors traced continuous both seeds, sea reads (116/123 hold), no tears/floaters/blowout;
  seasons measured alive (`probe-season`: FARM winter→dry-peak **88**, VINEYARD now moving too since 139, ROAD
  control ~0.5–2 — the *whole-frame* mildness agents feel is the by-design evergreen/irrigated dilution (120),
  a composition fact not a dead calendar). **The night-core-is-broad watch-item (136/142) is now CASHED (iter
  143, Urban × Polish): a tight Gaussian bump (`CORESIG=5`) on the CBD turned the flat smoothstep plateau into a
  peak** (probe-nightcore: seed-42 core→8-12 gap 0.152→0.307). Subtle-but-discriminable (both agents blind-picked
  the after-frame); a stronger read needs the window mix `0.35+0.65·c.lit` widened, not `c.lit` steepened further.
  **125** was the same shape and its product was the pin-off-January recipe fix.
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
  Un-cashed: `[T.IND]` *"warehouses and light industry"*,
  `[T.VINEYARD]` *"terraced"* (draw now reads `year` via `vinePhase()`, iter 139 — READY to un-cash a `Vines`
  season row). The plaza/quad **titles** are now **CASHED (iter 140)** — an owned square's headline reads
  *"Town hall forecourt"* / *"Museum grounds"* outright.
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
  almost no pixels. **Sky-feedable list is now EMPTY (iter 139 cashed `VINEYARD`)** — every vegetation tile
  that can read `year` now does; a further Sky interconnect must come from a genuinely new derived field, not
  from un-freezing another tile.
  Recent kinds:
  **133 Interaction/UX** · **134 Interaction/UX (EXPLORED → REVERTED — the strobing almanac)** ·
  **135 Deepen/Fix (moon re-clocked `year`→`dayT`, strobe gone)** · **137 Polish (figure contact shadows)** ·
  **138 Connect (arterial spine lit as a night corridor via `c.flow`)** ·
  **139 Deepen (vineyard reads `year` via `vinePhase()` — bare→purple by season)** ·
  **140 Interaction/UX (plaza/quad tooltip headlines name their owning institution)** ·
  **141 Interaction/UX (kelp bed names its extent — `Bed — N hexes`, the KELP tell cashed)** ·
  **143 Polish (night CBD gets a tight Gaussian light peak — `CORESIG`; the broad-core watch-item cashed)** —
  (**130/136/142 were the holistic step-backs — no domain × kind lap.**) Interaction/UX ran hot 133/134/140/141; 143 broke it back to Polish.
  **Next domain lap (144) owes Sky (135, now stalest), then People (137); read its row for kinds.** Vary off
  Polish (143) and Interaction/UX (four of last six) — reach for Deepen/Connect. Sky
  is post-saturation (Deepen/Fix only — its additive/CA cells are traps); Urban's additive cell is spent (118). The coldest kind is **Scale** (a structural lever, not a lap move);
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
- **PERF BASELINE RE-PINNED 2026-07-10 (iter 105's step-back): day 33.16ms · night 37.33ms.** Held through
  iters 109/110/111/117 against pristine-HEAD controls (per-iter detail archived at 140/142). Not re-pinned
  since; day still reads flat against it, night now runs ~+2.2ms of real 137+138 draw plus load (see 142).
  **Iter 130+136 (step-backs): 126→135 cost ZERO — HEAD flat vs old commits, interleaved.** Both step-backs
  saw ~+7% night vs the stored baseline and both proved it machine load. 130: HEAD-129 vs iter-125 (`c63e43b`)
  **−0.5% both**. 136: `perf.mjs` read day 34.5 / night 40.17 (+4.0/+7.6% vs baseline); interleaved HEAD-135 vs
  iter-130 (`f2aa721`, A/B/A/B, min per variant): night **39.83 vs 39.78**, day **34.22 vs 34.00** — **+0.1%**,
  flat, so 131→135 (cue-d square, kelp canopy, tile ring, almanac revert, moon→dayT) added nothing measurable.
  The iter-130 file that *recorded* 37.33ms night itself reads **39.78ms today** — pure load. **NOT re-pinned**
  (baking today's load in would blind the gate). The stored-baseline night false-FAIL is now a
  **four-time pattern (125→130→136→142)** — always understates today's load; the interleave-against-an-old-commit
  reading is the only honest step-back grade. (**A 2-round day+night interleave overruns the 120s Bash
  timeout — `run_in_background` it or cap at ~1.5 rounds.** Also filter the perf-mean grep to lines with `p95`,
  or it swallows the "vs baseline" lines and corrupts the min per variant.)
  **142 (step-back): the interleave found a small but REAL cost — the first non-flat step-back delta.** `perf.mjs`
  read day 34.34 (+3.6%) / night 40.83 (+9.4% vs stored baseline); interleaved HEAD-141 vs iter-136 (`6b31425`,
  A/B/A/B, min per variant): day **34.44 vs 34.50** (−0.2%, flat) but night **41.39 vs 40.50** (**+2.2%**). That
  +2.2% night is 137's figure contact-shadows (day+night) + **138's per-arterial night lamps landing** — small,
  expected (138's own finding flagged night), well inside budget (60fps 100% / 30fps 47.7%), NOT a regression to
  fix and NOT re-pinned. **Night is the one to watch** (118 added per-window
  lit-pane draws; 138 added ~88-hex arterial strokes at night).
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
  **(d) the civic quarter's real square — CLOSED, MEASURED DEAD (iter 131; do not re-open).** A ≥3-hex civic
  square is geometrically impossible at the quarter (proven dead by `probe-quarter.mjs`), and its connective
  goal already ships via the fete bunting. Full reasoning moved to `GROWTH-archive.md` at iter 142.
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

> **Archive:** the 136 entries before Iteration 134 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

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

## Iteration 135 — the moon slows down (2026-07-11)

**Vector.** Sky & atmosphere × **Deepen** (a FIX). Rotation did not name Sky (People 127 was stalest), but
iter 134 banked a **measured, shipped defect** as "the real banked Sky vector," and a banked measured finding
outranks kind-rotation (the loop's own law) — doubly so when it is a *fix* for a compounding problem (120's
rule). The defect: iter 126 drove the moon's synodic phase off `year`, a fast **development** clock (~0.17
yr/sec at speed 1), so `year*12.3685` sweeps ~2 lunations/sec and the disc **strobes ~2 Hz at night**. Every
gate this loop owns is frozen, so it shipped invisibly (134 caught it only by letting the clock run).

**What the temporal probe found first** (`probes/probe-moonrate.mjs`, promoted — 134's law: a *cadence* claim
needs a running clock, the mirror of freeze-the-clock). playing=true, sampled `__moon().illum` at 20 Hz over
3 s, counted 0.5-crossings (a lunation crosses twice); control = the day/dev clocks must advance. **HEAD: 12
crossings, max |Δillum| 0.74/step**, control healthy (Δyear 0.49/3 s). Confirmed 134's analytic strobe before
a line was written.

**Change (~10 lines, draw-only).** A shared `moonPhase()` (by `daylight()`) returns the lunation fraction from
**`dayT`** — the real day counter (~110 s/cycle; monotonic, wrapped only for time-of-day) — one synodic month
every `MOONSYN=8` day-cycles, offset per city by `seedNum*φ` so each loads on its own phase. The render-scope
`moonL`, the moonglade, and `__moon()` all read it (one predicate, 112's law). `dayT`-driven, it is near-fixed
across a single night (0.5 day → ≤0.1 ΔMOONF) and visibly waxes across the ~6-min run (~3.3 day-cycles → ~0.4
lunation). No tile, entity, `rng()`, `tick()`, or terrain — pop provably flat.

**Census.** PASS, exit 0. Tile histogram empty, core +0; `greenRoofs −2` is the documented roof-adoption
headless-timing wobble (127/132/133).

**Probe, after.** `probe-moonrate`: **12 → 0 crossings, max |Δillum| 0.74 → 0.0002**, control still running —
the strobe is gone and the page is not merely frozen. And the re-clocked iter-126 `probe-moon` (now stepping
`dayT` by whole day-cycles at fixed night — an integer dayT step = exactly 1/8 lunation, time-of-day held):
**corr(illum, lit px) = 1.000** both seeds, new→full 11→374 / 13→372, land control dev 0.00 — the disc still
draws every phase correctly, and seeds 42/7 now load on *different* phases (0.07 vs 0.44), the per-seed offset
working.

**Visual.** 2/2 whole-frame night agents PASS (seeds 42 & 7, off-January `year=2035.62`, t=0.90). Both located
a clean single moon — seed 42 a crescent at (0.74,0.15), seed 7 a near-full disc at (0.91,0.15), two distinct
phases both rendering cleanly — no tears/doubling/blowout anywhere, each frame a balanced night city with
core→edge falloff.

**Verdict — FIXED.** The moon 126 gave a calendar now keeps it on the *day* clock, so it reads as a slow,
legible moon instead of a 2 Hz flicker. The banked defect is closed; a moon-phase HUD card is now viable (see
findings — the season half still strobes).

### Findings for later laps
- **⚠ THE MOON STROBE IS FIXED — but a SEASON readout still strobes (the almanac is only half-unblocked).**
  134's almanac welded `seasonWord(year)` + a moon card to the HUD; 135 slowed the MOON (now on `dayT`), but
  the SEASON still reads `year`, the fast dev clock (~0.7 Hz word-flip, 134). So a **moon-only** HUD card is
  now viable; a **season** word is not, until the season also reads a slow clock (or is quantized/held). Don't
  re-ship the full almanac assuming 135 unblocked it.
- **`dayT` IS A MONOTONIC DAY COUNTER, not just time-of-day.** `daylight()` wraps it `%1` internally, so `dayT`
  itself accumulates unbounded (~110 s/cycle). It is the loop's one **slow** clock: anything that "should
  advance over minutes, not seconds" and must not flicker in a static frame should read `dayT`, never `year`
  (the moon now does). And an **integer `dayT` step advances the moon exactly 1/8 lunation while holding
  time-of-day fixed** — the clean way to sweep the moon at fixed night in a probe (probe-moon uses it).
- **A per-seed phase offset (`seedNum*φ mod 1`) buys free variety at zero stream cost.** The moon now loads on
  a different phase per city (probe: 0.07 vs 0.44) without touching `rng()`. Reuse the golden-ratio-of-seedNum
  trick for any "same every city" ornament that should vary but must not perturb the seeded stream.

## Iteration 136 — the seventh step-back finds a clean, quiet city (2026-07-11) [holistic step-back]

**Vector.** The mandated holistic step-back (105/110/115/120/125/130/**136**). Not a domain × kind lap: it
reads the WHOLE city for *cumulative* drift the census and per-feature gates are blind to, runs the perf
gate, and — per 115/120/125 — does it at **night AND a season, with the day/night baselines pinned OFF
January** (`year=2035.62` dry peak; `2035.02` as the seasonal-contrast frame). No city vector taken, so
rotation is unchanged; next lap (137) owes the stalest domain, **People (127)**.

**What was read.** Un-zoomed whole-city `wide` frames at **2 seeds × 3 lights/calendars** — seed 42
(warp 61) and seed 7 (warp 31), each at {day 2035.62/t=0.40, night 2035.62/t=0.90, winter 2035.02/t=0.40}.
One subagent per seed read its own three frames, asked the *cumulative* question ("has anything compounded
into clutter or darkness?") plus 108's **locate-don't-judge** night test ("where is the core by light alone?").

**Result: the city is healthy — both agents VISUAL: PASS.**
- **Night lighting (115) holds at both seeds, LOCATED off-centre.** By light alone the luminous core sat at
  seed 42 ~(0.45,0.48), seed 7 ~(0.47,0.62), both with a genuine core→edge falloff ("not a flat glitter mat",
  "peaks there and fades to dim green-grey at the edges, near-black at the corners"). Rim fades to dark.
- **The sea reads** (116's bottom + 123's founded wind farm): turbines parallel to the shelf, no dead void.
- **No z-order tears, floating tiles, hard seams, or blown-out colour in any of the 6 frames** — brightest
  night window-clusters stay warm amber, not clipped; the beach→sea stepped terracing reads as intentional.
- **Winter reads distinct from summer** at both seeds (cooler/browner farm/scrub, paler sky), city balanced.

**Season — measured alive, not believed.** Both agents independently called the *whole-frame* seasonal signal
"mild / reads more late-summer than winter" — a real perception, but it is the **evergreen/irrigated dilution**
(PARK/REDWOOD/GARDEN cover much of the frame and are near-zero *by design*, per 120), not a dead calendar.
`probes/probe-season.mjs` (per-tile rendered-pixel distance from winter, `ROAD` = zero control): FARM
winter→dry-peak **88.2**, →autumn 92.9; VINEYARD →autumn 58.1, ORCHARD →autumn 41.4; MEADOW/FOREST/SHOREPARK
all move; PARK/REDWOOD/GARDEN/QUAD near-zero by design. ROAD control **0.5–2.1**. Matches 130 (FARM 88.4).
The calendar is working; the whole-frame mildness is a *composition* fact, not a bug.

**Perf — the stored-baseline false-FAIL fired a THIRD time, and the interleaved control collapsed it again.**
`perf.mjs` read day **34.5ms** (+4.0% vs baseline) / night **40.17ms** (+7.6%), the night rise looking like a
regression. Interleaved HEAD-135 vs the iter-130 file (`f2aa721`, A/B/A/B, min per variant): night **39.83 vs
39.78ms** (**+0.1%**), day **34.22 vs 34.00ms** — flat both ways, so iters 131→135 (cue-d square, kelp canopy,
tile focus ring, almanac revert, moon→dayT) added **nothing measurable**. The +7.6% night vs baseline is
**pure machine load** — the 6-day-old iter-130 file, which *recorded* 37.33ms night, itself reads **39.78ms
today**. **NOT re-pinned** (baking today's load in would blind the gate to a real future regression). Census
PASS and vacuous by construction (no source edit).

**Change (the step-back's product — none to the city).** No compounding defect, so per 120/125/130 ("a clean
step-back is a complete iteration — don't force a filler vector") the output is the health record plus header
refreshes: step-back pointer → 141 (next is 141), perf note gains the 136 interleaved reading, rotation
pointer notes 136 as the step-back. No `solvista.html` edit; tree verified clean after the perf interleave
restored HEAD.

**Verdict — FIXED.** No compounding city defect (the honest step-back outcome, third clean bill in a row:
130, 136). 115/116/120/123's accumulated visual laws still all read correctly at both seeds under all three
lights, eight iters on. The perf gate's stored-baseline false-FAIL is confirmed benign by the interleaved
control for the third time (125→130→136); the guardrail stays honest.

### Findings

- **THE STORED-BASELINE PERF FALSE-FAIL IS NOW A THREE-TIME PATTERN (125→130→136) — the stored baseline
  understates today's load, never the reverse.** 125 saw night +16%→+4% real; 130 saw +7%→−0.5%; 136 saw
  +7.6%→+0.1%. Every step-back days after the pin conflates code drift with today's load, and every time the
  interleave against an old commit's own file collapses it. Do not re-chase a night number a same-session
  interleave flattens; do not re-pin to an inflated day. (`git show <old>:solvista.html > /tmp/x`, swap A/B/A/B,
  min per variant — but note **a 2-round × day+night interleave overruns the 120s Bash timeout**; run it
  `run_in_background`, or cap at ~1.5 rounds — one full round of the control plus two of HEAD is enough signal.)
- **A CLEAN WHOLE-FRAME "MILD SEASON" IS A COMPOSITION FACT, NOT A REGRESSION — settle it with the probe, not
  another agent.** Both agents this step-back read the seasons as faint; the probe shows FARM/VINEYARD/ORCHARD
  swinging 40–90 while the frame-dominant PARK/REDWOOD/GARDEN sit near-zero *by design* (120). The agents are
  reading the *area-weighted average*, which is genuinely muted; the calendar is not. This is the locate-don't-
  judge law's cousin: when an agent's *impression* contradicts a by-design invariant, the probe is the verdict.
- **THREE CLEAN STEP-BACKS DEEP, THE OPEN WATCH-ITEM IS "NIGHT CORE IS BROAD/DIFFUSE" — banked, NOT a defect.**
  Both agents located the core with real falloff (so 115 holds), but both independently noted the glow is
  spread across much of the built area rather than a single tight downtown peak. That is a *legibility* nuance,
  not a tear or a darkness compound — a future Sky/Urban Polish could tighten the CBD light gradient (steeper
  falloff from `CBDX/CBDY`), but it did not earn a fix here. Logged so a later lap can pick it up deliberately.

## Iteration 137 — the people cast a shadow (2026-07-11)

**Vector.** People & activity × **Polish** (SHIPPED). Rotation named the domain — 136's step-back said 137 owes
People (still stalest, last 127) — and steered the kind to Polish/Interaction-UX while warning to **vary off
Interaction/UX** (3 of the last 5 laps: 129/133/134). People's Polish cell was the stalest kind there (last **84**).
The target chose itself by a house-style **inconsistency**: `shadS()` is the shared ground-contact-shadow helper,
and every *vehicle* has cast one for many iterations (`drawVehicle`: bikes L4951 `shadS(...,0.08)`, cars L4967
`shadS(...,0.16)`) — but the **walking figures** (peds/dogs/joggers, the only other *movers*) had **none**, so
they read as floating a hair off the pavement. (Surveyed first: the figure and crowd draws are otherwise richly
polished — gait/bob/kids, leash+wag, scissoring joggers, stadium/amphitheatre/strip crowds — the missing shadow
was the one clear gap.)

**Change (~5 lines, draw-only).** A `shadS(feet)` contact shadow, drawn right after `stamp()` and *before* the
legs so the figure reads on top, at the FEET (`gy`, not the bobbing head — so the figure walks/skips over a fixed
shadow): `drawPed` `shadS(cx,gy,0.10,0.17)` + the skipping kid `shadS(kx,gy,0.06,0.15)`; `drawDog`
`shadS(cx,cy,0.11,0.15)` (low/long); `drawJogger` `shadS(cx,cy,0.09,0.16)`. Sizes are ~⅔ the car's (0.16), the
figures being ~⅔ a car's footprint; ungated by light, exactly as the vehicle shadow is (it's ambient contact, not
a sun cast). No tile, entity array, `rng()`, `tick()` pass or terrain — pop provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, all core metrics **+0**, entity counts
identical (peds 664 · dogs 90 · joggers 31). `greenRoofs −1` is the documented roof-adoption headless-timing
wobble (127/132/133/135). Exactly as predicted for a draw-only change touching no seeded stream.

**Probe.** `probes/probe-figshadow.mjs` (new, promoted), patched vs pristine HEAD, seeds 7/42. **The live figures
could not be probed** — peds/dogs are a frame-timing-dependent system whose array *composition, order AND
positions* drift a nondeterministic ~20px between two page loads of the same seed (HEAD-vs-HEAD noise floor
alone was |Δ|~9–13 at fixed coords; `ped[0]` isn't even the same resident twice). So the probe tests the DRAW
FUNCTIONS deterministically: clear all live movers (incl. vehicles, which drift over roads and poison a
fixed-coord diff), **place a fixed set of 30 peds at chosen ROAD-cell centres** — identical objects in both
builds — freeze/pin the clocks, render, and diff a **tight feet-row band** (the shadow is a flat ~2px-wide,
1px-tall iso-squashed smudge; `TW/TH=16/8`, so a wide box dilutes it to nothing). Result: **feet mean Δlum
−1.16** (a *uniform* darkening — |ΔRGB| 1.14 ≈ |Δlum|, a shadow not a hue shift), consistent (−1.06/−1.27),
**bare-road control 0.047** (≈0, >20× separation). The darkening is confined to figure feet.

**Visual.** The shadow is a ~2–3px contact patch — **invisible at fit zoom, visible at zoom** (133's ring law).
Self-read of a `hovershot` ZOOM=9 / dsf-4 no-hover crop (seed 42): a soft, flat, iso-squashed olive shadow sits
directly under the ped's feet, correctly centred and below the legs, figure drawn on top, no spill — it grounds
the figure exactly as intended. Whole-city `wide` frames (seeds 42 & 7, day `year=2035.62`), one agent each:
both **VISUAL: PASS** — balanced coherent coastal city, no z-order tears / floaters / hard seams / blown-out
colour, and — the cumulative question — **no muddy or over-darkened pavement** (the shadows correctly invisible
at that zoom, causing no darkening).

**Verdict — SHIPPED.** The walking figures now sit on the pavement with the same house-style contact shadow every
vehicle already casts. Draw-only, pop provably flat, ~5 lines, reads at zoom.

### Findings for later laps
- **⚠ THE LIVE PED/DOG SYSTEM IS NON-REPRODUCIBLE ACROSS PAGE LOADS — a build-vs-build pixel diff on live
  figures is hopeless; PLACE a controlled set instead (new; the lap's central probe lesson).** Peds spawn/despawn
  and step over a nondeterministic number of real-time frames before you can freeze, so the array's composition,
  order and positions all differ between two loads of the same seed (~20px drift, |Δ|~9 HEAD-vs-HEAD). Pinning
  `Math.random` and zeroing gait were *necessary but not sufficient* — the positions themselves had already
  drifted. The clean gate for any figure-DRAW change is: freeze, clear the live movers (incl. **vehicles**, which
  drift over roads and poison a bare-ground control), and push a fixed set of figures at chosen cell centres with
  every field set by hand — the draw code is identical whether a figure is live or placed. This is the figure
  analogue of the terrain probes' `git show HEAD:` diff.
- **A ~5px SPRITE'S ORNAMENT IS A ~2px MARK — size the probe band and the visual read to it, not the sprite
  (reinforces 133).** `TW/TH=16/8` at `scale≈0.66` makes even the car's `0.16` shadow only ~3px; a per-row
  luminance profile showed the ped shadow lands on **exactly one pixel row** (Δlum −0.81 there, 0.00 everywhere
  else). A default 8×8 sample box diluted a real −0.8 signal to −0.1 and read as noise. Sample the one row; look
  at a ≥9× crop. Anything the size of a person's foot is invisible at fit zoom by construction, and that is fine.
- **THE HOUSE-STYLE HELPER IS THE TELL FOR A POLISH — grep who ELSE calls it.** `shadS`/`shadowEl` grounded
  buildings, domes and every vehicle; the walking figures were the lone omission. A "who uses this shared helper,
  and who conspicuously doesn't?" grep is a reliable way to find the next consistency Polish (cf. the tooltip
  tell: a string that asserts what the draw ignores). People's remaining such gap: the *static* standing crowds
  (strip/stadium/amphitheatre/school-run specks) also cast no shadow — but they're a bigger, more diffuse change.

## Iteration 138 — the main roads light up at night (2026-07-11)

**Vector.** Transport × **Connect** (SHIPPED). Rotation named the domain — Transport was the single stalest
(128) — and its entities are fully saturated (cars/buses/emergency/bikes/trams/trucks; vehicles already richly
lit; cabins fixed 128, trains named 105, stations fixed 112), so 118's law forbids a New element. The one
banked Transport cue (128's MINSEP cabin-crossing cosmetic) is explicitly low-value/"after anything that
matters". So I took **Connect** — Transport's coldest live cell (last **15**) — whose signature is to add no
new object and *light a relationship between two things that already exist*: the **arterial road network**
(`c.flow>=ARTFLOW`, the documented "main roads" measure) and **night**. Varies off Polish (137) and Deepen
(both hot).

**The seam.** Street lamps existed (L3843) but keyed off `c.busy` — the LOCAL "≥3-developed-neighbours" test
that the header itself notes calls *a third of the city* an avenue — as a scattered glow disc. So at night the
city's actual through-network (`c.flow`, ~15% of roads, the real spine) never read as a network; only cars lit
the roads. This is exactly the documented "reuse `c.flow` for anything that should follow the main roads —
don't hand-roll a second notion of important street."

**Change (~18 lines, draw-only).** In the ROAD draw case, the night-lamp block now branches on `art`: an
arterial hex pools warm light along its centre-line toward each arterial neighbour (the same neighbour-walk the
gold trunk line uses just above) — a soft wide base (w9 @ 0.11·LITAMT) + a bright continuous core (w4.5 @
0.20) + a small lamp head — so `c.flow` joins hex-to-hex into one continuous lit ribbon. Ordinary streets keep
a *dimmer* ambient disc (0.30→0.22) so the spine out-shines them. No tile, entity, `rng()`, `hashCell`,
`tick()` pass or terrain; all strings pure-ASCII (134's invariant). Pop provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, all core metrics **+0** (first pass) / pop
**−3** (final) is the documented `(year*·)` salt jitter. `arterials 795` unchanged. Stream-neutral by
construction.

**Probe.** `probes/probe-artlight.mjs` (new, promoted). Build-vs-build (patched vs pristine HEAD), night frame
frozen (109's law — the sea sparkles on waveT, headlights ride v.p), seeds 7/42. Signed **Δluminance** over 60
arterial hex boxes, with two controls the census can't express. First cut proved the effect real but weak
(**+3.71**, and the seed-42 visual agent correctly failed it — the continuous ribbon at 0.15 was *fainter*
per-pixel than the 0.30 ordinary disc). After tuning: arterial NIGHT **Δlum +7.26** (7.33/7.19) · **DAY
control +0.08** (block is `LITAMT>0.25`-gated ⇒ night-only) · **far-water NIGHT control 0.00** (the spine lit,
not a whole-frame wash). Both controls held; the signal near-doubled.

**Visual.** First cut: **1/2** (seed 7 PASS located the corridors; seed 42 FAILED — "uniform scattered dots,
no brighter continuous spine"). That FAIL was a true design signal, not a vague miss, so I measured (probe) and
re-tuned rather than arguing. Retuned: **2/2 PASS**, both seeds. Asked to *locate* (108's law), both agents
traced **continuous** warm ribbons — seed 42: "CONTINUOUS lit ribbons tracing the roads hex-to-hex, not
scattered dots… distinctly brighter than the dim grey-blue side streets"; seed 7: a gold loop through the core
+ a horizontal spine + a strand to the river. Both: no z-order tears / floaters / blowout, warm light
"tasteful… not a smeared glare wash," whole frame a balanced night coastal city with the arterials reading as
"the connective tissue."

**Verdict — SHIPPED.** The city's main roads now read as a lit network at night — `c.flow`'s spine glows as a
continuous warm corridor while side streets stay dim, adding legible structure with no new object, provably
flat pop. Transport's Connect cell is filled (its third: 5, 15, 138).

### Findings for later laps
- **THE NIGHT LAMPS NOW ENCODE THE ROAD HIERARCHY — arterial (`c.flow`) = bright continuous ribbon, ordinary
  street = dim ambient disc (L3843).** Any future road-network night vector should read/extend this, not
  re-key it: the two-tier lamp is now the one night definition of "main road vs side street," and it shares
  `c.flow` with the daytime gold trunk line (one predicate, 112's law). The `c.busy` disc is now *only* for
  non-arterial streets.
- **A "READS AS SCATTERED DOTS, NO CONTINUOUS RIBBON" AGENT FAIL IS A CONTRAST-vs-CONTINUITY DEFECT, NOT A
  DESIGN-DEAD-END — measure the SIGNED delta, then push it.** The first cut's continuous stroke (0.15·LITAMT)
  was *dimmer per-pixel than the ordinary disc it was meant to out-shine* (0.30), so the eye read the bright
  discrete lamp-heads as beads and missed the ribbon. The probe's signed Δlum (+3.71 → +7.26) is exactly the
  knob the agent's complaint pointed at; a linear feature must be both continuous AND brighter than what it
  ranks above (101's contrast×width law, applied to *relative* brightness). One re-tune closed a 1/2 to 2/2.
- **A NIGHT-ONLY DRAW ADDS PER-ARTERIAL STROKE WORK ONLY AT NIGHT (~88 hexes × ~2 segments × 2 strokes).**
  Cheap, but night is the frame to watch (118). Not perf-gated this lap (draw-only, and the interleave overruns
  the 120s Bash timeout); the 141 step-back's interleaved control will grade it against the stored baseline.

## Iteration 139 — the vineyard keeps the calendar (2026-07-11)

**Vector.** Nature × **Deepen** (SHIPPED/DEEPENED). Rotation named the domain — Nature was the single stalest
(129) — and the header banked the content over many laps: *"129's banked Nature move is now a Deepen — make
VINEYARD's grapes read `year` (last Sky-feedable item; 108/113/120)."* A banked, measured cue outranks
kind-rotation (119's law), which is why Deepen was taken despite being hot. The vineyard was the artifact's
last frozen agriculture: its draw painted **green trellis rows + purple (`lav`) grape clusters
UNCONDITIONALLY** — a vine stuck at perpetual harvest — while its neighbours (FARM ±88 seasonal, the orchard's
blossom/fruit since iter 57) already turned with the year.

**Change (~14 lines, draw-only).** Added a shared `vinePhase()` next to `orchardPhase()` (one predicate, one
definition — 112's law — so a future tooltip reads the same source the draw paints): `dormant` (winter, s<0.16
or ≥0.99) · `bud` (spring) · `veraison` (dry-peak summer) · `ripe` (autumn harvest). `case T.VINEYARD` now
gates on it: **leafy green canes in season / bare brown thinned canes in winter**, and grape clusters
**only at veraison (sage-green berries) and ripe (purple `lav` harvest)** — none in bud/dormant. Mirrors the
orchard exactly. No tile, entity, `rng()`, `hashCell`, terrain or `tick()` pass; strings pure-ASCII (134).

**Census.** PASS, exit 0. Draw-only and stream-neutral — tile histogram empty, all core metrics +0 (the pop −3
seen on a re-run is the documented `(year*·)` salt jitter, present on pristine too).

**Probe — two, because a seasonal draw on the fast `year` clock has TWO ways to be wrong.**
- `probes/probe-vine.mjs` (new) — build-vs-build |ΔRGB| at vineyard hex centres, patched vs pristine HEAD,
  clock frozen (109), per season: **winter 10.96** (grapes removed, canes browned) · **spring 3.99** · **dry-peak
  3.74** (grapes now green not purple) · **autumn 0.00** — autumn is the *season control*: both builds draw
  purple grapes, so my change leaves the harvest byte-identical and only fixes the three wrong seasons.
  **ROAD control 0.46 flat every season** (the edit is only `case T.VINEYARD`). seeds 7/42/1234.
- `probes/probe-vinerate.mjs` (new, TEMPORAL — 134's law: a claim about motion needs a running clock) —
  `year` is the fast dev clock (~0.167 yr/s at speed 1), so the vineyard cycles in live play. Counted phase
  flips over 12 s of real play with the **ORCHARD as the accepted-reference control**: VINEYARD **0.67 Hz** =
  ORCHARD **0.67 Hz**, both seeds. The vineyard flickers no harder than the orchard shipped on this same clock
  since iter 57 — it joins the diorama's existing seasonal time-lapse, it does not introduce a novel strobe.

**Visual.** First reads FAILED and *both agents were right to* — but the fault was the harness, not the draw:
`?year=` pins the calendar ONCE at load (L6357) and the live clock then drifts it `+dt·s/6` during tileshot's
~1.4 s `playing=true` wait, so the winter pin drifted to bud (green) and the autumn pin overran past `.99` to
dormant (brown) — the exact "seasons inverted" the seed-7 agent reported. Re-shot with the **clock frozen**
(`playing=false; __setYear(y); render()`), the phases render as designed: I verified winter (brown bare canes),
dry-peak (green, subtle) and autumn (green + purple clusters) myself, then a fresh agent PASSED all four seeds-42
frames — *"winter reads bare/brown, spring/summer green, autumn green-with-purple-grapes; the four frames
clearly differ in a sensible seasonal order,"* no z-order/floater/blowout, winery sits cleanly atop. The
whole-city frame was confirmed balanced/beautiful/no-tears by the first seed-42 agent (that check is
season-independent).

**Verdict — DEEPENED.** The vineyard now turns through the year like its orchard and farm neighbours —
bare in winter, laden with purple grapes at harvest — closing the last frozen agriculture tile and the last
Sky-feedable vegetation (108/113/120). Draw-only, stream-neutral, provably scoped (autumn control 0.00, ROAD
0.46), and no worse strobe than the orchard (0.67 Hz each).

### Findings for later laps
- **⚠ A SEASONAL SCREENSHOT MUST FREEZE THE CLOCK — `?year=` PINS ONCE, THEN THE LIVE CLOCK DRIFTS IT A FULL
  SEASON DURING THE WAIT (new, promoted to SKILL.md).** `?year=` calls `__setYear` once at load (L6357); the
  frame loop then runs `year += dt·s/6` (~0.167 yr/s), so a screenshot taken after a ~1 s `playing=true` wait
  has drifted ~0.15–0.24 yr — a discrete-phase feature can be a WHOLE SEASON off. This cost two false-FAIL
  agent reads this lap (one read the seasons "inverted"). Prior seasonal shots tolerated it because
  `applySeason`'s color is continuous (a 0.2 drift is a small nudge); a discrete-threshold visual is not.
  Freeze before the shot: `playing=false; __setYear(y); render()`, exactly as the probes do. (`shoot.mjs`'s
  `?year=` alone is NOT enough for a discrete seasonal feature.)
- **A DISCRETE-PHASE VISUAL ON THE FAST `year` CLOCK IS NOT AUTOMATICALLY A 134-STYLE STROBE — the test is
  whether it flips WORSE than the accepted ORCHARD, not whether it flips.** 134 reverted a HUD *readout* (text
  words at 0.7 Hz, jarring). Scenery that participates in the whole-city seasonal time-lapse (farms recolor,
  orchard blossoms/fruits) is accepted at that same 0.67 Hz. `probe-vinerate` is the reusable instrument: run
  the live clock, count phase flips, use the orchard as the ceiling control.
- **THE VINEYARD TOOLTIP IS NOW UN-CASHABLE — the last banked Nature Interaction.** `TILEDESC[T.VINEYARD]`
  ("Terraced grapevines — wine country") is now mute about a draw that knows its `vinePhase()`, exactly the
  orchard's state before 129 gave it a `Grove` row. The next Nature × Interaction/UX lap adds a `Vines` row
  naming the season (Dormant / Bud break / Veraison / Harvest) from the shared `vinePhase()` — one predicate,
  already built. This retires the header's *"VINEYARD needs a Deepen first"* caveat (108/109/129): the Deepen
  is done.

## Iteration 140 — the squares say whose they are (2026-07-11)

**Vector.** Civic & culture × **Interaction/UX** (SHIPPED). Rotation named the domain — Civic was the single
stalest (its last SHIP was 122; 131 was an explore that shipped nothing) — and the header banked the content
over three laps: the plaza/quad tooltip **titles** still read the generic tile label ("Plaza"/"Quad") while a
data row buried the owner as "Forecourt of — Town hall". Kind was forced off Deepen (139) and Polish (both hot,
131/132/137); Civic's entities/ornaments are saturated (flags already fly on hall/library/parliament, banners on
the museum — I grepped `windFlag` and confirmed it before proposing a New element), so 118's law forbids a New
element, leaving Interaction/UX — and the tell ("a string generic where the code already knows the specific")
is the loop's most reliable move (117/122/129).

**The seam.** `describeTile` (L5981) set a paved square's title from the generic `TILELABEL` and only appended
`['Forecourt of', CIVICLABEL[k]]` as a data row. `squareOwner(x,y)` (L1190) already answers whose square it is
from `c.own` — the index the placing rule STAMPS (not adjacency, which 122 measured wrong on 2/3 seeds).

**Change (~11 lines, tooltip text only).** Added a PLAZA/QUAD branch to the title/sub chain: when `squareOwner`
resolves, the headline reads `<Institution> forecourt` / `<Institution> grounds` (e.g. "Museum forecourt",
"University grounds") and the sub is prose ("The paved public square that fronts the museum." / "Mown lawns kept
behind the university."). Removed the now-redundant "Forecourt of/Grounds of" data row. Squares whose owner was
rebuilt away keep the generic "Plaza"/"Quad". No draw, tile, entity, rng()/hashCell, tick() pass or terrain;
strings pure-ASCII (134).

**Census.** PASS, exit 0. Draw-only tooltip text — tile histogram empty, all core metrics +0, stream-neutral by
construction. Vacuous by design (the probe is the gate).

**Probe.** `probes/probe-civic.mjs` — **updated** to the new headline contract, not forked (one predicate, one
probe — 112's law applied to the gate itself; the claim moved from a data-row regex to a headline parse, so the
probe's parse moved with it). It hovers every PLAZA/QUAD, reads the HEADLINE, and checks the named institution
is an adjacent ELIGIBLE civic (MAJORK for forecourts, GROUNDS for quads) recomputed in Node from cube distance
— a third implementation sharing no code with the page — then PASS 2 checks the institution agrees from its own
side. seeds 7/42/1234: **PASS · PASS · PASS** (checked 30/25/29 tooltips, plaza 4/3/4 · quad 10/8/8, pageerrors
0). Squares fire at scale (dead-code law) and every headline named the owner the geometry confirms.

**Visual.** Hover clips at seeds 7/1234, agent read: **PASS**. Transcribed "Museum forecourt / The paved public
square that fronts the museum.", "Hospital grounds / Mown lawns kept behind the hospital.", "University forecourt
/ …the university." — all the new format, none generic; text legible, no overlap/clipping/blowout.

**Verdict — SHIPPED.** A paved civic square's tooltip now leads with the institution it belongs to instead of a
generic "Plaza" with the owner buried below — the headline (the most-read line) is now the specific fact. Closes
the plaza/quad-title tell banked by 122/129. Civic's Interaction/UX cell gains its third (52, 122, 140).

### Findings for later laps
- **THE PLAZA/QUAD-TITLE TELL IS CASHED — do not re-open it.** `TILEDESC[T.PLAZA]`/`[T.QUAD]` and the generic
  `TILELABEL` are now bypassed for OWNED squares; only ownerless/rebuilt squares fall through to them. The
  headline names the owner and there is no longer a "Forecourt of" data row.
- **A TOOLTIP HEADLINE IS A STRONGER SEAM THAN A DATA ROW — the fact the eye reads first should be the specific
  one.** The owner was already correct in a buried row since 122; promoting it to the title added no new truth,
  only legibility. When a tooltip already KNOWS the specific but leads with the generic, promoting it to the
  headline is a clean Interaction/UX lap with zero draw risk.
- **UPDATE THE PROBE, DON'T FORK IT.** probe-civic already owned the plaza/quad claim, so the change moved the
  claim's *reader* (data-row regex → headline parse) rather than adding a second reader. A new probe would have
  been two readers of one claim — the exact anti-pattern 112 warns about, applied to the harness.

## Iteration 141 — the kelp bed names its extent (2026-07-11)

**Vector.** Water & coast × **Interaction/UX** (SHIPPED). Rotation named the domain — Water was the single
stalest (last 132) — and the header named the content: the **un-cashed KELP tell**. `TILEDESC[T.KELP]` said
only *"Seaweed swaying in the shallows"* while `describeTile` printed nothing of the bed, though the woods had
named their `Stand — N hexes` by flood fill since iter 117 and iter 132 gave the kelp its own drawn canopy. A
banked, measured cue outranks kind-rotation (the loop's law), even with Interaction/UX hot (133/134/140).

**Adopted from a killed process.** I did **not** author this — the prior iteration ran the vector, passed its
own gates, and was killed (rate limit / sleep) *between* its verdict and `git commit`, leaving a clean,
coherent, uncommitted change + its probe in the worktree (the iter-72 shape). Per the skill's dirty-worktree
rule I re-ran the gates myself; they decide, not the missing ledger entry. Described below from the diff.

**Change (~15 lines, tooltip + refactor, zero draw code).** `standSize` (the woods' flood fill) generalized
to `floodSize(x,y,pred)`; `standSize`/`bedSize` now both delegate to it — **one definition, so the stand and
the bed count contiguity the same way and cannot drift (112's one-predicate law)**. `describeTile` gains a
`Bed — N hexes` row for KELP by `bedSize`; the `TILEDESC[T.KELP]` sub rewritten to *"A bed of kelp rooted in
the cold, shallow water off the beach."* Depth is deliberately **left off** (invariantly shoal here → constant
noise), extent is the one honest datum. Kelp carries no CA state, so the bed is pure geometry.

**Census.** PASS, exit 0. Tooltip/refactor-only, stream-neutral — tile histogram empty, core metrics +0.
(`solarRoofs` −2 / `greenRoofs` −1 is the roof-adoption CA's known headless-timing wobble, ±1–2 on pristine
HEAD; this change touches no terrain and no `rng()`.)

**Probe** `probes/probe-kelptip.mjs` (already present, promoted). Hovers every KELP hex via `__find('KELP')`
screen coords, scrapes `#tip`'s `Bed` row, and checks the count against ground truth recomputed **in Node** by
a flood fill over the kelp set using odd-r cube adjacency — a **third** implementation sharing no code with the
page's `floodSize`/`nbrs6` (122's law: check a tooltip claim against independent recomputation, not a shot that
renders it). Freezes the sim first. Controls: a WATER hex must print no `Bed` row; bed sizes partition the kelp
set. **seed 42:** 10 kelp / ~6 beds, checked 9, control 12 water — **PROBE: PASS**. **seed 7:** 17 kelp / ~7
beds, checked 15, control 12 — **PROBE: PASS**. Sample scrape reads clean: `Kelp bed | A bed of kelp… | Bed |
2 hexes | Tide | Ebbing`.

**Visual.** No draw code changed, so scene pixels are identical to HEAD; the tooltip's rendered text is already
verified by the probe's DOM scrape. One defensive whole-city wide read (seed 42, `year=2035.62`) delegated to
an agent: balanced coastal city, no z-order tears / floaters / blowout, coastline & kelp shallows read clean,
nothing compounded. VISUAL: PASS.

**Verdict — SHIPPED. The KELP tell is CASHED.** The un-cashed-tooltip list loses its longest-standing entry;
KELP joins the woods, orchard, vineyard and institutions in naming what its own code already knows.

### Findings
- **Depth is correctly OMITTED where it is invariant.** The header's banked cue named *"extent AND depth"*, but
  every kelp hex abuts the beach at shoal depth, so a `Depth` row would print constant noise. The adopted change
  showed only extent — the honest datum. **A tooltip row earns its place by VARYING; a constant field is noise,
  not data** (cf. iter 120's frozen-green hexes: sameness masquerading as information).
- **`floodSize(x,y,pred)` is now the shared contiguity primitive** — reuse it for any "how big is the contiguous
  patch this hex belongs to" question (marsh, a district, a water body) rather than forking a fourth flood fill.
- **A killed iteration's PROBE is its self-grade — re-run it, don't re-derive it.** The prior process left a
  complete, independent-recomputation probe; running it (both seeds) plus census settled adoption in ~3 minutes
  without re-designing anything. The probe *is* the missing ledger entry's evidence.

## Iteration 142 — the eighth step-back finds a clean city, and the first real perf delta (2026-07-11) [holistic step-back]

**Vector.** The mandated holistic step-back (105/110/115/120/125/130/136/**142**; 141 slipped it one). Not a
domain × kind lap: it reads the WHOLE city for *cumulative* drift the census and per-feature gates are blind to,
runs the perf gate, and — per 115/120/125 — does it at **night AND a season, with the day/night baselines pinned
OFF January** (`year=2035.62` dry peak; `2035.02` as the seasonal-contrast frame). No city vector taken, so
rotation is unchanged; next lap (143) owes the stalest domain, **Urban (133)**, then Sky (135).

**What was read.** Un-zoomed whole-city `wide` frames at **2 seeds × 3 lights/calendars** — seed 42 (warp 61)
and seed 7 (warp 31), each at {day 2035.62/t=0.35, night 2035.62/t=0.90, winter 2035.02/t=0.35}. One subagent
per seed read its own three frames, asked the *cumulative* question ("has anything compounded into clutter or
darkness?") plus 108's **locate-don't-judge** night test ("where is the core by light alone?").

**Result: the city is healthy — both agents VISUAL: PASS.**
- **Night lighting (115) holds at both seeds, LOCATED off-centre.** By light alone the luminous core sat at seed
  42 ~(0.47,0.53) with a secondary glow ~(0.40,0.30), seed 7 ~(0.47,0.62) — matching 136's (.45,.48)/(.47,.62),
  both with a genuine core→edge falloff and dim/near-black rim.
- **138's arterial night-corridors read as designed** — both agents, unprompted, traced *continuous* warm lit
  ribbons along the main roads ("clear diagonal streaks in the west/central grid", "amber-lit corridors
  radiating from the core"), distinctly brighter than the dim side streets. The 138 ship still reads eight iters
  on, at the whole-frame scale.
- **The sea reads** (116's bottom + 123's founded wind farm): turbines parallel to the shelf, no dead void.
- **No z-order tears, floating tiles, hard seams, or blown-out colour in any of the 6 frames** — night
  window-clusters stay warm amber, not clipped.
- **Winter reads distinct from summer** at both seeds (farm/scrub paler/tan, cooler sky), city balanced.

**Season — measured alive, not believed.** `probes/probe-season.mjs` (per-tile rendered-pixel distance from
winter, `ROAD` = zero control): FARM winter→dry-peak **88.3**, →autumn 93.0; VINEYARD now **44.6/36.7/42.7**
(the iter-139 seasonal draw shows in the probe — new since 136); ORCHARD 25.3/17.8/41.4; MEADOW/FOREST/SHOREPARK
all move; PARK/REDWOOD/GARDEN/QUAD near-zero *by design* (120). ROAD control **0.5–2.2**. Matches 130/136 (FARM
88). The calendar is working; the whole-frame mildness agents feel is the by-design evergreen/irrigated dilution.

**Perf — the stored-baseline false-FAIL fired a FOURTH time, but the interleave found the first REAL delta.**
`perf.mjs` read day **34.34ms** (+3.6% vs baseline) / night **40.83ms** (+9.4%), the night rise looking like a
regression. Interleaved HEAD-141 vs the iter-136 file (`6b31425`, A/B/A/B, min per variant): day **34.44 vs
34.50ms** (**−0.2%**, flat) but night **41.39 vs 40.50ms** (**+2.2%**) — unlike 130/136 which were flat both
ways. That +2.2% night is 137's figure contact-shadows (day+night) + **138's ~88-hex per-arterial night lamps
landing** — small, expected (138's own finding flagged night as the one to watch), well inside budget (60fps
budget 100%, 30fps 47.7%). NOT a regression to fix and **NOT re-pinned** (the +9.4% vs stored baseline is still
mostly load — the 6-day-old iter-136 file itself read 40.50ms night today vs the 37.33ms it was pinned at).
Census PASS and vacuous by construction (no source edit).

**Change (the step-back's product — none to the city).** No compounding defect, so per 120/125/130/136 ("a
clean step-back is a complete iteration — don't force a filler vector") the output is the health record plus
header refreshes: step-back pointer → 147, perf note gains the 142 interleaved reading (four-time false-FAIL
pattern + first real delta), rotation notes 142 as the step-back. No `solvista.html` edit; tree verified clean
after the perf interleave restored HEAD.

**Verdict — FIXED.** No compounding city defect (the honest step-back outcome, third clean bill in a row: 130,
136, 142). All accumulated visual laws (115/116/120/123) and 138's arterial night-lighting still read correctly
at both seeds under all three lights. The perf gate's stored-baseline night false-FAIL is benign for the fourth
time (125→130→136→142) — but the same-session interleave this time surfaced the genuine +2.2% night cost of
137+138's night draw, which is exactly what the interleave exists to separate from load.

### Findings
- **THE INTERLEAVE'S JOB IS TO SEPARATE REAL COST FROM LOAD — and at 142 it did BOTH in one reading.** The
  stored baseline said night +9.4% (looks like a regression); the interleave against iter-136's own file said
  +2.2% (the real cost of 137+138's night draw) with day flat. Neither number alone is the truth: the stored
  baseline conflates code + 6 days of load drift, the interleave isolates code. A non-flat interleave is not a
  false-FAIL — it is the gate working. +2.2% for a deliberately-shipped night-lighting network is a good trade,
  logged not fixed.
- **⚠ WHEN SCRIPTING THE PERF INTERLEAVE, FILTER perf.mjs's OUTPUT TO THE `p95` LINES.** `perf.mjs` prints the
  frame-timing block AND a "vs baseline" block, both starting `  day`/`  night`; a naive `grep '^  (day|night)'`
  swallows the baseline numbers and silently corrupts the `min` per variant (they leak in as extra array
  elements). Grep for lines containing `mean` AND `p95` (`grep -E '^  (day|night) +mean.*p95'`). Cost me one
  wasted round this lap.
- **138's ARTERIAL NIGHT-LIGHTING HAS PAID TWICE NOW — at ship (138) and at this whole-frame step-back.** Both
  142 agents traced the continuous corridors unprompted at fit zoom, which is a stronger read than 138's own
  tight clips (a linear feature that survives downscaling has real contrast×width, 101's law). The road
  hierarchy at night (arterial ribbon vs side-street disc) is a durable, legible layer.
- **THE NIGHT-CORE-IS-BROAD watch-item (136) is RECONFIRMED at 142, still not a defect.** Both agents again
  located a real falloff but a spread glow rather than a tight CBD peak. Three step-backs deep it is the one
  standing legibility nuance; a future Sky/Urban Polish steepening the `CBDX/CBDY` light gradient could cash it
  deliberately — it has not earned a forced fix.

## Iteration 143 — the downtown gets a bright heart at night (2026-07-11)

**Vector.** Urban fabric × **Polish** (SHIPPED). Rotation named the domain — Urban was the single stalest (last
133) — and 118's law forbids a New element in a domain whose additive inventory is surveyed spent. The content
was a **banked, thrice-reconfirmed watch-item** (136/142 step-backs): the night core reads *broad/diffuse*, a
real falloff but no tight CBD peak, "a future Sky/Urban Polish steepening the `CBDX/CBDY` light gradient could
cash it deliberately." A banked, measured finding outranks kind-rotation (119's law), and Polish varies HARD
off the last four laps (all Interaction/UX, 133/134/140/141) — the header's own steer.

**Probe first (119's law).** Fixed `probes/probe-nightcore.mjs`'s path bug on the way in — it read
`./solvista.html` relative to its own dir (the exact anti-pattern SKILL.md warns about); now
`../../../../solvista.html` (the repo-root resolve). Its ring profile *named the defect precisely*: the night
light field `c.lit` is `0.18 + 0.70·smoothstep(1−d/34)`, and **smoothstep is flat-topped (zero slope at the
CBD)**, so the inner rings barely out-shone each other. seed 7 ring 0-4 (**0.810**) was actually *dimmer* than
ring 4-8 (**0.826**) — the brightest ground was a plateau, not a peak. That is the "diffuse core" three agents
felt, measured.

**Change (~6 lines, draw-only, genWorld only).** Kept the broad smoothstep glow to the rim (it earns the
rim→core gradient) but **added a tight Gaussian bump on the CBD**: a new `CORESIG=5` and
`c.lit = 0.16 + 0.50·broad + 0.28·exp(−d²/2σ²) + (c.lit−0.5)·0.5`. Position-only (never height — a building
must not wear its height twice, 103/110), stream-neutral (no `rng()`, no terrain, no tile/entity), and the
per-frame draw path is byte-identical — the Gaussian is computed once in `genWorld`, not per frame, so no perf
cost (perf gate not needed; the step-back owns it).

**Census.** PASS, exit 0. Draw-only, stream-neutral — tile histogram empty, all core metrics +0
(`greenRoofs +1` is the roof-adoption CA's known headless-timing wobble).

**Probe, after.** `probe-nightcore` ring `c.lit` means, before → after:
- seed 42: `0.899/0.828/0.747/0.658/0.473/0.264` → `0.921/0.774/0.614/0.515/0.370/0.224` — the core→(8-12) gap
  **doubled 0.152 → 0.307**; a real monotonic peak.
- seed 7: `0.810/0.826/0.762/…` (0-4 *below* 4-8, no peak) → `0.832/0.770/0.629/…` (0-4 now the brightest).
- `corr(lit,th)` **0.09–0.11** both seeds — brightness still does NOT restate height (invariant held, 103/110).
- The PIXEL luminance moved only ~1–2 units per mid-ring (the window mix `0.35+0.65·c.lit` compresses the range
  and windows are a fraction of each building) — so the effect is subtle by construction, which the visual gate
  then confirmed is *discriminable*, and which is the right proportion for a nuance (a dramatic core blows out).

**Visual.** Before/after night frames (off-January `year=2035.62`, t=0.88), one agent per seed, asked to
**DISCRIMINATE** which frame has the tighter core (108's locate-don't-judge). **2/2 chose the after-frame**,
blind, and both **located the brightest cluster at the true CBD** — seed 42 ~(0.47,0.48) [CBD (32,31)], seed 7
~(0.44,0.63) [CBD (31,41), the southern y reads low in-frame]. Both: no z-order tears, no floating tiles, no
blown-out/clipped white (peak stays warm window-light, not a halo/blob), whole frame a balanced night coastal
city with a dark rim. VISUAL: PASS both.

**Verdict — SHIPPED. The night-core-is-broad watch-item (136/142) is CASHED.** Downtown now reads as a single
luminous heart with a steep inner falloff, not a wide even smear — the flat-plateau defect (smoothstep's
zero-slope top) is gone. Draw-only, stream-neutral, position-only, zero perf cost. Urban's Polish cell gains
its tenth (…124, 143); Urban is no longer stalest.

### Findings for later laps
- **SMOOTHSTEP IS FLAT-TOPPED — a radial falloff built on `u²(3−2u)` has ZERO slope at its centre, so it makes
  a PLATEAU where you want a PEAK.** The night core read diffuse for 28 iterations because its own falloff was
  gentlest exactly at the CBD (seed 7's innermost ring measured *dimmer* than the next one out). If a field
  should read as a bright *point*, add a tight Gaussian/cone bump on top of the broad base; don't just scale the
  smoothstep. Reusable for any "concentrate X on a centre" field (a future density/value/glow peak).
- **THE PIXEL PROBE AND THE MODEL PROBE DISAGREE ON MAGNITUDE — the window mix `0.35+0.65·c.lit` compresses.**
  A large swing in the `c.lit` *field* (ring means moved 0.05–0.13) became a ~1–2-luminance-unit swing in
  rendered pixels, because the window term has a 0.35 floor and windows are a fraction of each building. So a
  field fix reads *subtly*. If a future lap wants the core to read MORE strongly, the lever is widening
  `0.35+0.65·c.lit`'s range (or a dedicated warm downtown sky-glow disc), NOT steepening `c.lit` further — it's
  already peaked, and the ceiling is the mix, not the field.
- **probe-nightcore.mjs's path was BROKEN (`./solvista.html`) and is now fixed** — it could not have run since
  it was `git mv`'d into `probes/`. Any probe that predates the "resolve relative to the probe, four dirs up"
  law may carry the same bug; check the `readFileSync`/`goto` path before trusting an old probe's silence.
