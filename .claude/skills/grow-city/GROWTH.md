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
| **Nature** | 4, 26, 29, **102** | 1, 13, 60 | 37, 46, 67, 76, **108**, **120**, **139** | ~~46~~, ~~88~~, ~~101~~ | U4 | 53, 96 | **117**, **129**, **148** |
| **Water & coast** | 6, 10, 12, 16, 20, 33, **106** | 90 | 17, 25, 51, 65, 72, **113**, **123** | 22 | | U2, 44, 58, 79, **116**, **132**, **150** | **97**, **141** |
| **Urban fabric** | 32, 62 | 7, 23, ~~82~~ | 38, 54, 68, 92 | 47, **109** | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103**, **110**, **118**, **124**, **143** | **133** |
| **Transport** | 2, 9, 21, 31, 48 | 77 | 28, 39, 55, 63, **112**, **121**, **128** | 5, 15, **138** | U4 | U1, U3, 70, 85, 87, 94, **146** | **105** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107** | 36, 59, 66, 80, 91, **149** | 45 | | 73, ~~**114**~~ | 52, 122, **140** |
| **Sky & atmosphere** | 27, 43 | | 19, 35, 50, 57, 95, **135** | | | 61, 81, 89, **115** | ~~**134**~~, **144** |
| **People & activity** | 41, 56, **127** | 49 | 34, 64, 93, **104**, **119**, **145** | 78, **111** | | 84, **137** | 71 |

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
  Sky **144** · Urban **143** · People **145** · Nature **148** · Transport **146** · Civic **149** · Water **150**.
  **Stalest is now Urban (143)**, then Sky (144), then People (145) — check the last entry of the stalest domain for a banked
  finding before reading its row. (**137 took People × Polish**: gave the walking figures — peds/dogs/joggers,
  the only movers with no `shadS()` shadow while every vehicle has one — the house-style contact shadow at the
  feet; draw-only, `probe-figshadow` gates it. People's figure/crowd draws are richly polished now; only the
  *static* standing crowds still cast no shadow. **⚠ The live ped/dog system is non-reproducible across page
  loads — probe figure DRAW changes by controlled placement, not a build-vs-build diff (137's findings).**) (**Sky's moon is FIXED (135) and now NAMED (144).** 135 re-clocked the moon's phase onto the slow `dayT`
  (~110 s/cycle) not the fast `year`, killing the ~2 Hz strobe; 144 shipped the moon-only HUD card 135 had banked — the
  census strip's 2nd stat reads `NN% / <phase>` from `moonWord()` off that same slow clock, a fifth reader of the one field
  (`probe-moonhud`: 1 transition/6 s at 8×, 8/8 phases, night agent confirmed card=disc). **STILL banked for Sky: the SEASON
  word** — it reads the fast `year` and would strobe ~0.7 Hz (134), so it needs a slow clock (or quantize/hold) FIRST; don't
  add `seasonWord(year)` to the HUD nor re-ship 134's REVERTED almanac assuming 135/144 unblocked it. Sky's additive/CA cells are still traps, see below.) (**132 took Water × Polish** — the kelp beds got a floating olive canopy so a bed reads as a living
  forest, not a flat dark hole, while staying the darkest thing inshore; `probe-kelp` gates it.)
  **Water's STILL-banked cue (123): the pier/lifeguard are still `rng()`-salted; site them on a depth by respending
  their draws (123's stream-neutral trick) — but that REPEATS 123's site-on-depth mechanism, so vary it.** (**129 cashed the tell a 7th time for Nature**:
  the orchard drew a blossom/fruit calendar since iter 57 but its tooltip was mute; it now names the
  season via a shared `orchardPhase()`. **129's banked Nature Deepen is CASHED (iter 139)**: VINEYARD's
  grapes/canes now read `year` via a shared `vinePhase()` (bare in winter → purple at harvest), the last frozen
  agriculture tile. **Its tooltip is now CASHED (iter 148)** — a `Vines` season row reads the same `vinePhase()`
  (`Bare canes`/`In leaf`/`Green fruit`/`Ripe for harvest`), like 129's orchard `Grove` row. **The
  asserts-less-than-the-code-knows tell is now SPENT for agriculture** (orchard 129 + vineyard 148); GARDEN's draw
  does not read `year` (needs a Deepen first, per 129), so the next Nature × Interaction/UX is a *new* seam.) (**127 took People × New element** aimed not at its spent
  *entity* list but at its biggest untouched *surface* — PARK's 878 hexes now show day-only picnics. The lesson:
  "additive inventory spent" is a claim about a domain's entities, not its surfaces.) (**126 took Sky × Deepen** — the moon now keeps a calendar
  and the moonglade dims with its phase — which is the documented way past Sky's additive saturation: a Deepen
  that adds no element. Sky is no longer stale, and its empty `New CA rule` cell is still a trap, not an invitation.)
  **124 closed the ghost-`c.solar` cue (detail in archive) — the LAST banked cue that moved a census number;
  from here the census is vacuous for most vectors, so reach for a probe.**
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
  **Iteration 152 is the next holistic step-back** (105, 110, 115, 120, 125, 130, 136, **142**, **147**, …).
  Shoot it **at night AND a season, and PIN THE DAY FRAME OFF JANUARY** (`year=2035.62` dry-peak baselines +
  `2035.02` as the seasonal-contrast frame — a default `?warp=61` frame is already ~winter; SKILL.md holds
  the full recipe). **130, 136, 142 AND 147 all found NO compounding city defect** (FOUR clean bills in a row, the
  honest step-back outcome, no city change): both seeds PASS day/night/season, agents *located* the night core
  off-centre by light alone (147: (.47,.50) / (.47,.62), matching 142/136; 115/143's lighting holds), 138's
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
  Un-cashed: `[T.IND]` *"warehouses and light industry"* (not vegetation, no calendar). `[T.VINEYARD]`
  *"terraced"* is now **CASHED (iter 148)** — a `Vines` season row off `vinePhase()`, mirroring 129's orchard;
  agriculture's mute-tooltip tell is now spent (only GARDEN remains and its draw is season-frozen, needs a
  Deepen first). The plaza/quad **titles** are now **CASHED (iter 140)** — an owned square's headline reads
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
  **143 Polish (night CBD Gaussian light peak — `CORESIG`)** · **144 Interaction/UX (moon HUD card — `moonWord()`)** · **145 Deepen (beach furniture follows the sun via `LITAMT` — day-only umbrellas, `probe-beachsun`)** · **146 Polish (the bus reads as a bus — taller boxy body + window strip + cream livery, `probe-buslivery`)** · **149 Deepen (town-hall clock hand reads `dayT` — 24h dial, up at noon / down at midnight, agrees with the sun & moon; `hallClockCtr` shared by draw + `__clock` hook, `probe-hallclock`)** · **150 Polish (the open sea gets a day-only SUN GLITTER — cool bands of shimmer lift the water tone at noon, gone by dusk, night byte-unchanged; `probe-glitter`)** — (**130/136/142 were the holistic step-backs.**) Interaction/UX ran hot 133/134/140/141/144; 143/145/146/149/150 broke it to Polish/Deepen/Polish/Deepen/Polish.
  **⚠ Iteration 152 is the next holistic STEP-BACK** (…/136/142/**147 done**/**152**) — not a domain lap; see the recipe
  below (night + season, day frame off January, interleaved perf). **151 owes the stalest domain, Urban (143)**,
  then Sky (144); vary off Polish (150) and Deepen (149) — Connect/New-CA fresh. Sky
  is post-saturation (Deepen/Fix only — its additive/CA cells are traps); Urban's additive cell is spent (118). The coldest kind is **Scale** (a structural lever, not a lap move);
  **New element** was cashed at 127 (before that 106). Note 118's finding that a *saturated* domain cannot take a
  New element — but 127 sharpens it: saturation is of a domain's *entities*, and a New element can still land on a
  large untouched **surface** (127 put picnics on PARK, 145 a daily rhythm on the beach). Pick the domain first and
  read its row before choosing. **Connect** (last 111) is live and cheap: its trick is to add no new object.
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
  **Iter 130+136 (step-backs): 126→135 cost ZERO — interleaved HEAD flat vs old commits** (130: HEAD-129 vs
  iter-125 `c63e43b` **−0.5% both**; 136: HEAD-135 vs iter-130 `f2aa721` **+0.1%**, A/B/A/B min per variant).
  Both saw ~+7% night vs the STORED baseline and both proved it load. **147 (step-back): 143→146 cost ZERO** —
  interleaved HEAD-146 vs iter-142 (`ce17d61`, min/variant): day **34.28 vs 34.83** (−1.6%), night **41.61 vs
  41.83** (−0.5%), both flat/faster; `perf.mjs` vs stored baseline read night 41.6 (+11%) but the iter-142 file
  ALSO reads 41.8 night today, so it is load. The stored-baseline night false-FAIL is now a **FIVE-time pattern
  (125→130→136→142→147)** — always understates today's load; the interleave-against-an-old-commit reading is the
  only honest step-back grade, and it is **NOT re-pinned** (baking today's load in would blind the gate).
  (**A 2-round day+night interleave overruns the 120s Bash timeout — `run_in_background` it.** Filter the
  perf-mean grep to `p95` lines or it swallows "vs baseline" and corrupts the min. **⚠ `cp` is aliased `-i`
  here — use `/bin/cp` or every swap silently no-ops and you measure ONE file 4×, iter 147.**)
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

> **Archive:** the 143 entries before Iteration 141 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

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

## Iteration 144 — the almanac gets its moon (2026-07-11)

**Vector.** Sky & atmosphere × **Interaction/UX** (SHIPPED). Rotation named the domain — Sky was the single
stalest (last 135) — and its own banked finding named the vector: 135 slowed the moon FIELD onto the slow `dayT`
clock and wrote "a moon-only HUD card is now viable" (a banked measured finding outranks kind-rotation, 119's
law). The Interaction/UX cell held only `~~134~~` (the reverted full almanac), so this both cashes the bank and
fills the cell. Deliberately the **moon only**, not 134's almanac: the header's live warning is that the SEASON
word still reads the fast `year` and would strobe ~0.7 Hz (134), so it stays out until it has its own slow clock.

**Change (~18 lines, DOM + draw-only, stream-neutral).** A new census-strip stat, placed right after the gold
year/time-of-day stat so the two temporal/sky readings group: `<b id="stMoonPct">` over `<span id="stMoonName">`,
marked `opt sm` so it sheds with the other decorative stats as the strip narrows (and never leaks onto the
"founding four" mobile layout — it sits before the `:last-child` transit stat, which keeps its mobile role). A
new `moonWord(l)` beside `phaseWord()` bins the lunation fraction into the eight conventional names; `syncStats()`
reads `moonPhase()` once and writes `NN%` (illumination `(1-cos 2πl)/2`) + the phase word. No `rng()`, no
terrain, no tile/entity, no new per-frame draw — the readout rides the existing `syncStats` cadence (per tick),
the same one the time-of-day phase word already uses.

**Census.** PASS, exit 0. Draw/DOM-only, stream-neutral — tile histogram empty, core metrics +0 (`pop −3`,
`greenRoofs +1` are the documented chaotic-CA / roof-adoption headless wobble).

**Probe — `probes/probe-moonhud.mjs` (promoted; new).** Two claims, because a readout claim needs BOTH a running
clock (134's cadence law) and a correctness sweep:
- **Cadence (running clock):** playing=true at 8×, read the actual DOM `#stMoonName` @10 Hz for 6 s. seed 42 &
  seed 7 both **1 word-transition** (a legible slow readout, not a strobe), CONTROL clock advancing (ΔdayT ≈
  0.43, Δyear ≈ 8). A `year`-driven readout would have flipped words many times per second here.
- **Correctness + liveness:** sweep a full synodic month via `__setTime` (8 integer `dayT` steps = 1 lunation),
  65 samples. **8/8** phase names appear (live across the month), **0** word/limb disagreements (every "waxing"
  word waxes, every "waning" word wanes; "full"/"new" only at the illumination extremes). NB the first cut of
  the *check* wrongly asserted `illum>0.98 ⇒ full moon`; phase names bin by lunation FRACTION, so a 99%-lit
  waxing gibbous is correct — the readout was right, the check was fixed.

**Visual.** Wide dsf=2 frames, one agent per seed. seed 42 day (`year=2035.62`, t=0.35): moon stat reads
`0% / NEW MOON` right after `2035 / DAYTIME`, strip one clean row of 11 stats, no wrap, clear gap before the
controls card, whole frame balanced. **seed 7 night (t=0.90): card reads `97% / WAXING GIBBOUS`, and the agent
independently confirmed the DRAWN moon disc is a nearly-full bright round disc that AGREES with the card** — the
locate-don't-judge check (108) against ground truth the field already holds. Both VISUAL: PASS, no z-order
tears / floating tiles / blown-out colour.

**Verdict — SHIPPED. 135's banked "moon-only HUD card is now viable" is CASHED.** The diorama now names the
moon it draws: an almanac reading that stays put for ~110 s (one day-cycle per phase-eighth) instead of
flickering, because it rides `dayT` not `year`. Sky's Interaction/UX cell is filled (`~~134~~, 144`); Sky is no
longer stalest (People 137 now is). The season half stays banked and explicitly fenced off in the header.

### Findings for later laps
- **THE MOON HUD IS THE HALF OF 134's ALMANAC THAT WAS SAFE — the SEASON half is still fenced.** 135 slowed
  only the moon; the season word still reads `year` (fast dev clock) and would strobe ~0.7 Hz. A future Sky lap
  wanting a season readout must FIRST give it a slow clock or quantize/hold it — do not add `seasonWord(year)`
  to the HUD and assume 144 unblocked it. The moon was shippable precisely because 135 had already re-clocked
  its field; the season has no such fix yet.
- **A HUD stat that mirrors an existing multi-reader field is free and safe.** `moonPhase()` was already the one
  shared predicate (draw disc, moonglade, `__moon()`, iter 135's "one predicate" law); the card is just a fifth
  reader of it, so it cannot drift from what's drawn — the night agent seeing card and disc agree is that law
  paying out. When adding a readout, wire it to the field the pixels already read, never a parallel computation.
- **A readout probe needs TWO clocks: a RUNNING one for cadence, a STEPPED one for correctness.** The strobe
  test (134) must play; the correctness sweep must freeze and step (`__setTime` by integer `dayT` = clean
  lunation-eighths, 135's trick). One probe, both — `probe-moonhud` runs the running-clock DOM read AND the
  frozen sweep. Reuse the shape for any future almanac/readout gate (a season word, a tide readout).

## Iteration 145 — the beach follows the sun (2026-07-11)

**Vector.** People & activity × **Deepen** (SHIPPED). Rotation named the domain — People was the single stalest
(last SHIP 127; 137 was Polish) — and the header steered HARD off Polish (143) and Interaction/UX (four of the
last six: 133/134/140/141/144) toward Deepen/Connect. People's Deepen cell is its fullest (last 119), and its
live-ped probe difficulty is documented (137), so I chose a Deepen that touches a DRAW, not the ped stepping:
the beach furniture.

**The seam.** The umbrella+towel draw on low-`c.v` BEACH cells (L3245) was ungated by time of day — it sat out
at 2am while the bonfire (L3234, `LITAMT>0.5`) burned beside it, so the beach had no daily rhythm of use. (The
kites already come down at night, crowds thin via `pedHidden`, kids go home by dark — the beach furniture was
the one People-activity surface with no day/night rhythm.)

**Change (~6 lines, draw-only).** Multiply the furniture's alpha by `ua=clamp((0.6-LITAMT)/0.25,0,1)` and skip
the draw when `ua<=0.02`: full at midday (LITAMT~0), fills in through the morning, fades by dusk (LITAMT>0.6) as
the bonfires take over. `LITAMT` rides the slow ~110s day-clock, so this is a rhythm, not a strobe (134's
cadence law: a fast-`year` gate would flicker). No tile, entity, rng(), tick() pass or terrain — pop provably
flat.

**Census.** PASS, exit 0. Tile histogram empty, all core metrics +0 (`greenRoofs -1` is the documented
roof-adoption headless wobble). Vacuous by construction — the probe is the gate.

**Probe.** `probes/probe-beachsun.mjs` (new, promoted). Build-vs-build isolation (patched vs `git show HEAD`) at
the SAME time of day, which separates the furniture from the day/night TINT (a within-build day-vs-night diff
would conflate them). Clears every live mover first (137's law) and freezes. seeds 7/42: **DAY control 0.01**
(ua=1 in both builds → beach identical, midday untouched) · **NIGHT 2.94** (patched draws no furniture, HEAD
does → the whole umbrella removed) · **ROAD control 0.017** (change confined to the beach). Night is ~300× the
day control — a decisive, clean separation. Selects umbrella cells by `c.v<0.08` (the draw gates on c.v, NOT
c.sand) and skips the esplanade.

**Visual.** Coast day/night pairs + whole-city wide, seeds 42 & 7, one agent each (108's discriminate-don't-
judge: "which frame has the umbrellas?"). Both **VISUAL: PASS** — both correctly located the colorful parasols
in the DAY frame and confirmed the NIGHT beach is bare dark sand (only pier-lamp/figure glows remain), no
z-order tears, no half-drawn/ghost parasols, no blowout; both wide frames balanced coastal cities, nothing
compounded.

**Verdict — SHIPPED.** The beach furniture now follows the sun — umbrellas fill in through the morning, peak at
midday, and are packed away by the time the evening bonfires are lit, giving the beach a daily rhythm of use to
match the kites, crowds and kids that already thin at night. Draw-only, pop provably flat, slow-clock-gated
(strobe-safe). People's Deepen cell gains its sixth (34, 64, 93, 104, 119, 145).

### Findings for later laps
- **A DRAW GATED ON `LITAMT` IS THE SAFE WAY TO GIVE PEOPLE A DAILY RHYTHM — it is the slow ~110s day-clock, not
  the fast `year`.** 134/135 established that `year` strobes; `LITAMT` (from `daylight(dayT)`) crosses its
  thresholds once per ~110s cycle, so a furniture/crowd draw gated on it fades in/out over minutes. Reuse the
  `ua=clamp((0.6-LITAMT)/0.25,0,1)` shape for any "present by day, gone by night" ornament (or invert for a
  night-only one, as the bonfire already does at `LITAMT>0.5`).
- **THE UMBRELLA GATES ON `c.v`, NOT `c.sand` — and `__find` only exposes `c.sand`.** A probe of beach furniture
  must select cells by `c.v` (iterate `cells` in-page), which `__find('BEACH').sand` will NOT give you; my first
  probe cut sampled the wrong cells and read pure noise. When a draw's condition uses a field `__find` doesn't
  return, replicate the cell scan in the evaluate block.
- **BUILD-VS-BUILD AT A FIXED CLOCK ISOLATES A DAY-ONLY DRAW-GATE FROM THE GLOBAL TINT.** A day-only feature
  can't be probed by a within-build day-vs-night diff (the whole frame's tint moves). Diffing patched-vs-HEAD at
  a FIXED time of day cancels the tint (both builds see it) and leaves only the gated draw — day≈0 proves the
  daytime no-op, night = the removed furniture. Clear live movers first or their inter-load drift swamps it (137).
- **People's beach surface now has a DAILY rhythm; its SEASONAL rhythm is still open (and a strobe trap).**
  Beaches are summer places — the furniture could also swell in summer / empty in winter — but that would gate a
  discrete visual on the fast `year` clock (134's strobe). It needs a slow seasonal clock first, exactly like the
  fenced-off HUD season word (144). Do not gate the umbrellas on `year`.

## Iteration 146 — the bus reads as a bus (2026-07-11)

**Vector.** Transport × **Polish** (SHIPPED). Rotation named the domain — Transport was the single stalest (last
138 = Connect) — and 138's findings + 118's law rule out a Transport New element (entities saturated:
cars/buses/emergency/bikes/trams/trucks, all richly lit; cabins/stations/trains already deepened) while its one
banked cue (128's MINSEP cabin-crossing) is explicitly low-value. 138 was Connect, so I varied off it to
**Polish** — Transport's stalest kind (last **94**) and globally fresh (last 143), exactly the header's steer
("Polish/Connect are fresh").

**The seam — the house-style-helper tell (137), one level up.** Every transit/utility vehicle has a
*kind-specific* draw block: the tram a cream belt + trolley pole (L5040), the truck a raised container box
(L5033), emergency vehicles their beacons/bars (L5022). The **bus** alone fell through to the generic vehicle
prism — a gold body stretched to `long=0.30` with the shared 55%-width glass cabin — so it read as *a long gold
car*, not a bus. (Buses are a real transit element: gold, spawned at 14%, and they pull into bus-stop shelters
and dwell — L2342.)

**Change (~7 lines, draw-only).** A `v.kind==='bus'` block beside the tram/truck ones: (1) a **raised roof**
prism (z 6.0→7.7, above a car's 6.6 cap) so the silhouette is *taller and boxier* — the strongest "reads as a
bus" signal, as the truck's container is; (2) a full-length **glass window strip** (`bandS`, z 3.9→6.0, warms at
night via `colLit(...LITAMT)`); (3) a **cream livery band** (`bandS`, z 2.5→3.3). `bandS` lays each on the
prism's own front faces, so they wrap the body in iso. No tile, entity array, `rng()`, `hashCell`, `tick()` pass
or terrain; strings pure-ASCII (134). Pop provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram empty, all core metrics +0 (pop/roads/developed flat),
entity counts identical (cars 360 · trams 54 · trucks 59 …). Stream-neutral by construction — vacuous, the probe
is the gate.

**Probe.** `probes/probe-buslivery.mjs` (new, promoted). Buses drift nondeterministically over the road network
between loads (137's live-mover law), so a fixed-coord build-vs-build on live buses is hopeless — the probe
CLEARS every live mover and PLACES a fixed set of buses (target) + cars (control) at spread-out ROAD-cell
centres, all heading east, identical objects in both builds, clock frozen (109). Metric = fraction of body-box
pixels visibly changed (the livery is a band of large per-pixel change diluted by background, so changed-fraction
is the honest read). Patched vs pristine HEAD, seeds 7/42: **bus body 9.2% of pixels changed (mean |ΔRGB| 4.51)
· car control 0.11% changed** — an ~80× separation, so the redesign is real and confined to the bus kind (the
car draw is byte-identical). (An early flank-bands-only cut moved just 4% and read too subtle; the raised roof —
a silhouette change — is what made it read AND doubled the probe signal.)

**Visual.** Zoomed before/after placement (`shot-buslivery.mjs`: a bus beside a reference car, camera wheeled
in) + un-zoomed whole-city `wide` at seeds 42 & 7. Three agents, one each (108 discriminate-don't-judge: "which
is the bus, and is it taller/more bus-like than before?"). All **VISUAL: PASS** — the after-bus reads clearly as
a bus (taller boxy body, blue window strip, cream livery stripe) where before it was "a flat featureless
stretched gold box"; the reference car is unchanged; no z-order tears/floaters/mis-projection/blowout; both
whole-city frames balanced, coherent, nothing compounded.

**Verdict — SHIPPED.** The bus now reads as a bus — a taller boxy body with a window strip and cream livery —
joining the tram and truck in having a kind-specific silhouette, where before it was a stretched gold car.
Draw-only, pop provably flat, ~7 lines. Transport's Polish cell gains its next (U1, U3, 70, 85, 87, 94, 146).

### Findings for later laps
- **THE HOUSE-STYLE-HELPER TELL (137) HAS A SILHOUETTE SIBLING: grep who has a KIND-SPECIFIC draw block and who
  falls through to the generic.** 137 found the shadow gap by "who calls `shadS`?"; this lap found the bus by
  "which `v.kind` branches in `drawVehicle` and which doesn't." Tram/truck/emergency each branch; the bus and the
  plain car did not — and a *car* falling through is correct (it IS the generic), a *bus* is not. Next such gap:
  nothing distinguishes vehicle *colors* as fleet liveries, but that's cosmetic and low value.
- **A ~7px SPRITE READS BY SILHOUETTE FIRST, ORNAMENT SECOND — change the outline before the flank (reinforces
  133/137).** The flank-only bands moved just 4% of body pixels and both the probe and the eye read them as
  marginal; the raised roof (taller than a car's cap) is what made the bus unmistakable and pushed the probe to
  9.2%. When polishing a tiny sprite to read as a *category*, spend the first move on its height/outline vs its
  neighbours, not on surface detail.
- **A LIVE-VEHICLE DRAW CHANGE USES 137'S PLACED-SET PROBE, WITH A SISTER-KIND AS CONTROL.** Buses drift like
  peds, so place a fixed set; the clean control is a placed CAR at other cells (draw untouched → ~0), which also
  proves the edit is scoped to `v.kind==='bus'`. Changed-pixel fraction beats mean-|ΔRGB| for a banded ornament
  diluted by the background box.

## Iteration 147 — the ninth step-back finds a clean city, perf flat (2026-07-11) [holistic step-back]

**Vector.** The mandated holistic step-back (105/110/115/120/125/130/136/142/**147**). Not a domain × kind lap:
it reads the WHOLE city for *cumulative* drift the census and per-feature gates are blind to, runs the season
probe + interleaved perf gate, at night AND a season with the day/night baselines pinned OFF January
(`year=2035.62` dry peak; `2035.02` as the seasonal-contrast frame). No city vector taken, so rotation is
unchanged — next lap (148) owes the stalest domain, **Nature (139)**, then Civic (140).

**What was read.** Un-zoomed whole-city `wide` frames at **2 seeds × 3 lights/calendars** — seed 42 (warp 61) &
seed 7 (warp 31), each at {day 2035.62/t=0.35, night 2035.62/t=0.90, winter 2035.02/t=0.35}. One subagent per
seed read its own three frames: the cumulative question ("has anything compounded into clutter or darkness?")
plus 108's **locate-don't-judge** night test ("where is the core by light alone?").

**Result: the city is healthy — both agents VISUAL: PASS.**
- **Night core (115/143) LOCATED off-centre both seeds** — seed 42 ~(0.47,0.50), seed 7 ~(0.47,0.62) — matching
  142 ((.47,.53)/(.47,.62)) and 136, each with a genuine core→edge falloff to a dark rim, not a flat wash. 143's
  Gaussian CBD peak still reads as a *peak*.
- **138's arterial night-corridors** traced as *continuous* warm ribbons distinct from dim side streets, both
  seeds, unprompted — the ship reads nine iters on at whole-frame scale.
- **The sea reads** (116's bottom + 123's founded wind farm). **No z-order tears / floaters / hard seams /
  blown-out white** in any of the 6 frames. **Winter reads distinct** from summer (farm/scrub tan, cooler light)
  at both seeds.

**Season — measured alive.** `probes/probe-season.mjs`: FARM winter→dry-peak **88.4** (matches 130/136/142),
VINEYARD 44.6/36.7/42.7 (139's seasonal draw), ORCHARD/MEADOW/SHOREPARK all move, PARK/REDWOOD/GARDEN/QUAD
near-zero by design (120), ROAD control **0.5–2.2**. Calendar working; the whole-frame mildness is the
by-design evergreen/irrigated dilution.

**Perf — 143→146 cost ZERO; the stored-baseline night false-FAIL fired a FIFTH time.** `perf.mjs` vs stored
baseline read day **34.3** (+3.5%) / night **41.6** (+11%), the night looking like a regression. Interleaved
HEAD-146 vs the iter-142 file (`ce17d61`, A/B/A/B, min per variant): day **34.28 vs 34.83** (−1.6%, HEAD
faster) and night **41.61 vs 41.83** (−0.5%, flat) — both flat/faster, so 143 (CORESIG, computed once in
`genWorld`) + 144 (moon HUD, per-tick DOM) + 145 (beach furniture, night-gated OFF) + 146 (bus bands) added
nothing measurable. The 6-day-old iter-142 file itself reads 41.8ms night today (pinned era: 40.5), so the
+11% vs stored baseline is pure load. NOT re-pinned. Census PASS, vacuous (no source edit); tree verified clean
after the interleave restored HEAD.

**Change (the step-back's product — none to the city).** No compounding defect, so per 120/130/136/142 ("a
clean step-back is a complete iteration — don't force a filler vector") the output is the health record + header
refreshes: step-back pointer 147→152, perf note gains the 147 interleaved reading + the fifth false-FAIL, and
the `/bin/cp` interleave gotcha (below). No `solvista.html` edit.

**Verdict — FIXED.** No compounding city defect — the FOURTH clean step-back in a row (130, 136, 142, 147). All
accumulated visual laws (115/116/120/123 + 138 arterials + 143 CBD peak) still read at both seeds under all
three lights; the season is alive; perf is flat against the honest interleaved control.

### Findings
- **⚠ THE `cp` ALIAS IS `-i` IN THIS SHELL — the perf interleave MUST use `/bin/cp`, exactly as SKILL.md says,
  or every swap silently no-ops and you measure ONE file four times.** My first interleave printed "overwrite
  solvista.html? …not overwritten" on every pass; the A/B numbers were HEAD-vs-HEAD (day 34.6/34.78, night
  40.9/41.3, a ~1% noise floor) and looked deceptively "flat both ways." `/bin/cp -f` (the skill's exact
  prescription) fixed it. **If an interleave reads suspiciously flat, confirm the file actually changed** before
  trusting it — the no-op failure mode masquerades as a clean pass.
- **FIFTH CONSECUTIVE STORED-BASELINE NIGHT FALSE-FAIL (125→130→136→142→147).** The stored night baseline
  (37.33ms, pinned 2026-07-10 under that day's load) now reads +11% high on a diff the interleave proves costs
  nothing; the 6-day-old iter-142 file reads the same 41.8ms today. The gate's absolute night number is a
  reliable over-read; only the same-session interleave against an old commit is trustworthy. Re-pin only if an
  interleave *itself* shows a persistent offset (it has not since 142's real +2.2%).
- **142's +2.2% night did NOT compound — 143→146 added nothing on top of it.** The one real perf delta of this
  series (142, from 137+138's night draw) held flat through four more draw-touching iterations, so the night
  budget is stable (well inside the 30fps 47.7% headroom).

## Iteration 148 — the vineyard names its own season (2026-07-11) [Nature × Interaction/UX]

**Vector.** Nature × Interaction/UX — the stalest domain (last **139**), taking the finding the header
banked there: iter 139 gave VINEYARD a seasonal DRAW (bare canes → leaf → green berries → purple harvest,
via a shared `vinePhase()`), but `describeTile` never named it, so the tooltip's *"terraced"* was mute about
the calendar the pixels already keep. This is the tell (117/122/129) cashed an **eighth** time — a string that
asserts less than the code already knows — and the last frozen agriculture tooltip. A **banked, measured**
finding on the stalest domain outranks kind-rotation.

**The seam.** `vinePhase()` (L1112) already returns `dormant`/`bud`/`veraison`/`ripe` from `year`, read only by
`case T.VINEYARD` in the draw (L3589). The orchard's `Grove` row (L6130, iter 129) is the exact template — one
`describeTile` line that reads its own shared phase fn. `[T.VINEYARD]` *"terraced"* was the header's named
un-cashed string.

**Change (3 lines, tooltip-only).** A `Vines` row in `describeTile` beside the orchard's `Grove` row, reading
the shared `vinePhase()`: `dormant→Bare canes`, `bud→In leaf`, `veraison→Green fruit`, `ripe→Ripe for harvest` —
each word matched to what the trellis draws that phase. No tile, entity, `rng()`, `hashCell`, `tick()` pass or
terrain; strings pure-ASCII (134). Pop provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram empty, all core metrics +0, entity counts identical
(cars 360 · trams 54 …). Vacuous by construction (a `describeTile` edit runs in no census metric) — the probe is
the gate.

**Probe.** `probes/probe-vinetip.mjs` (new, promoted). Per 122's law a tooltip claim is checked against
INDEPENDENTLY recomputed truth, not a screenshot: it recomputes the phase from `vinePhase`'s own window math (not
by calling it) and confirms every on-screen vineyard's `Vines` row at 4 keyframes × 3 seeds. **104/104 rows
match, 0 wrong.** Controls: **0** FARM and **0** ORCHARD tiles print a `Vines` row, and the orchard's own `Grove`
row still prints **72/72** — the row is confined to the vineyard and clobbers nothing. (The seasonal DRAW itself
was already gated by 139's `probe-vine`; what's new this lap is the string.)

**Visual.** `probes/shot-vinetip.mjs` (new) fires a REAL `mouse.move` over an on-screen vineyard so the
artifact's own handler builds the tooltip, clipped at two seasons. One agent read both: the `Vines` row reads
exactly *"Green fruit"* (dry peak) and *"Ripe for harvest"* (autumn), text sharp/legible, em dash correct, no
clipping/mojibake, no z-order or color defect. **VISUAL: PASS.** (No canvas draw changed, so the whole-city
frame is identical — the census proved the world byte-for-byte unchanged.)

**Verdict — SHIPPED.** The vineyard now tells the season it has painted since 139 — the last mute agriculture
tooltip is named. Draw-... tooltip-only, pop provably flat, 3 lines. Nature's Interaction/UX cell gains its next
(117, 129, **148**).

### Findings for later laps
- **THE ASSERTS-LESS-THAN-THE-CODE-KNOWS TELL IS NOW SPENT FOR AGRICULTURE.** 129 un-muted the orchard, 148 the
  vineyard; the header's remaining un-cashed vegetation strings are `[T.GARDEN]` (draw does NOT read `year` — needs
  a Deepen first, like 129/139 did for orchard/vine) and `[T.IND]` *"warehouses and light industry"* (not
  vegetation, no calendar to name). So the next Nature × Interaction/UX is NOT another agriculture row — it needs
  a new seam or a Deepen-then-name pair (GARDEN).
- **A `describeTile` STRING row needs NO whole-city visual and NO draw probe — only the string-truth probe + a
  hover shot.** The census is doubly vacuous (no metric, no draw), the whole-city frame is byte-identical, and
  the seasonal draw was already gated upstream (139). The one gate that can fail is the string vs recomputed
  windows, plus a hover shot that it renders. Don't re-run the interleaved perf/whole-city machinery for a
  pure-text tooltip row.

## Iteration 149 — the town clock tells the time (2026-07-11) [Civic & culture × Deepen]

**Vector.** Civic & culture × **Deepen** — Civic was the single stalest domain (last SHIP 140), and its most
reliable move (the asserts-more-than-it-shows tell) was cashed at 122/140 for tooltips. This lap runs the tell
in its **draw** form: the city hall's clock face is drawn with the comment *"the clock face the town sets its
watches by"*, yet its hands were **frozen** at a fixed ~12:15 — an ornament that claims to tell time while
sitting still. Kind varied off Civic's spent Interaction/UX (52/122/140) and off the globally-hot IUX run
(133/134/140/141/144) to **Deepen** (Civic's stalest kind, last 91). Same spirit as 135's moon: drive a frozen
ornament off the slow day clock.

**The seam.** The hall clock (L4456) drew two static line segments from the dial center. `dayT` (the day
counter, 0=midnight … .5=noon, ~110 s/cycle — the same slow clock 135 re-pinned the moon onto) is a global in
scope. The clock face is a fixed-radius overlay (`ctx.arc(...,3.4)` in world units, so it scales with the camera
but is ~2px at fit) — a zoom-reward detail like the police beacon / museum banner.

**Change (~8 lines, draw-only).** Replaced the two frozen hands with ONE hour hand on a 24h dial:
`clkA=(dayT-.5)·2π`; tip at `(sin clkA, -cos clkA)·2.0` — **straight up at noon, down at midnight, left in the
morning, right in the evening, so it turns with the sun** (and the moon, 135). Added a small fixed noon tick at
the top of the dial for orientation and an ink hub dot. Factored the dial center into `hallClockCtr(gx,gy,hb)`
so the draw and the new `__clock()` probe hook share ONE definition (112's one-predicate law). No tile, entity,
`rng()`, `hashCell`, `tick()` pass or terrain; no string literals (134 mojibake N/A). Pop provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram empty, all core metrics +0, entity counts identical
(cars 360 · trams 54 …). Vacuous by construction (a draw reading a global runs in no census metric) — the probe
is the gate.

**Probe.** `probes/probe-hallclock.mjs` (new, promoted). Measures the hand's DIRECTION from pixels vs the day,
locate-don't-judge (108). A ~2px ink hand is swamped by the bright hall wall, so it **differences** each test
frame against a same-lighting reference (static wall/dome/hub/tick cancel; only the moving hand survives) and
takes the centroid of the ink that APPEARED — the hand's direction. It stays in the daytime lighting window
(dayT .15–.55, lit≈0) so lighting is constant across the measured arc, camera-zooms the dial to ~12px radius,
and **recomputes the expected angle itself** (never trusts `__clock().ang`). seeds 7/1234/88: at dayT
.20/.30/.40/.50 the observed hand angle matched dayT within **1–3°**, **monotonic**, control (dayT .5 twice)
pixel-identical. Halls found in 4 seeds (dead-code: dial at scale); seed 42 SKIP (its dial is occluded by a
front amphitheater knoll — a draw-order fact, not a bug); seeds 3/2024 have no standalone hall (became
parliament). Straight-down/right (midnight, evening) sit in fast-changing light → left to the visual gate.

**Visual.** `probes/shot-hallclock.mjs` (new) camera-zooms the dial and clips morning/noon/midnight. One agent,
blind locate task (108): it read the hand as **lower-left / up / down** respectively and correctly assigned
morning/noon/midnight — the three directions "clearly distinct", tick fixed at top. Whole-city `wide` at seeds
42 & 7, one agent each: both **VISUAL: PASS**, balanced coherent coast, no tears/floaters/blowout, nothing
compounded.

**Verdict — DEEPENED.** The town clock now tells the time of day on its 24h dial and agrees with the sun and
moon, where for the artifact's whole life it sat frozen. Draw-only, pop provably flat, ~8 lines + a shared
helper + a locator hook. Civic's Deepen cell gains its next (36, 59, 66, 80, 91, **149**).

### Findings for later laps
- **THE ASSERTS-MORE-THAN-IT-SHOWS TELL HAS A *DRAW* FORM, NOT JUST A TOOLTIP ONE (extends 117/122/129/148).**
  Those cashed strings that asserted what the code knew; here a *drawn ornament* (a clock) asserted a behavior
  (telling time) the draw ignored. Look for other ornaments whose COMMENT or shape promises motion/state they
  don't have. Candidates seen while grepping: the museum/parliament are floodlit but otherwise static; the
  aquarium fish pennant already waves (`time`); the firehouse bell is static. A frozen sundial/gauge/vane that
  should track a clock is the richest version.
- **A ~2px OVERLAY HAND IS MEASURED BY DIFF-CENTROID IN A CONSTANT-LIGHTING WINDOW, NOT A LUMINANCE RAY.** The
  first probe (darkest-ray from center) failed: the bright wall behind a thin dark hand swamps the ray. The fix
  is 109's cancel-the-static trick applied spatially — difference two frames whose ONLY difference is the hand
  (same lighting, clock frozen), and the centroid of "ink that appeared" is the hand. Keep to the daytime
  lit≈0 band (KEYS) so lighting doesn't recolor the face between frames.
- **CAMERA-SET BEATS MOUSE-WHEEL FOR ZOOMING A PROBE ONTO A FIXED POINT.** `page.mouse.wheel` drifts (clamp +
  cursor) and my zoom walked off the dial onto a neighbour's roof. Setting `zoom/scale/offX/offY` directly
  in-page (recovering world coords as `(sx-offX)/scale`) centers the target exactly. `__clock` returns SCREEN
  coords (`world·scale+offX`), like `__find` — `px()`/`ctr()` return WORLD coords and the city draw applies the
  `dpr·scale` transform, so a hook that forgets `·scale+offX` points at raw world pixels (my first bug).
- **SOME HALLS' DIALS ARE OCCLUDED (a front amphitheater/tall neighbour), and ~2/9 seeds have no standalone
  hall at all (it became parliament).** A per-feature probe on a one-per-city landmark must tolerate SKIPs and
  grade only the measurable instances (require ≥2), not FAIL on an occluded or absent one.

## Iteration 150 — the open sea catches the sun (2026-07-11) [Water & coast × Polish]

**Vector.** Water & coast × **Polish** — Water was the stalest domain (last SHIP 141), and the kind varied off
the recent Deepen/Interaction-UX run (146/149 + the hot IUX laps) to **Polish**, its own kind (last 132). This
is a fill-the-gap Polish, not a banked cue: by DAY the open sea — a third of the canvas — carried only a faint
uniform sparkle (one foam stroke on ~2/7 cells) and the beach surf. There was **no sun on the water**: the
midday ocean read as flat teal, while the night already has its warm city-light smear (L3057). The lesson
this closes is the coast's daytime blank, not the salted-pier cue (123, still banked).

**The seam.** `case T.WATER` draw (L3029). The existing daytime sparkle (L3031) and the night city-smear (L3057)
bracket the spot; I added a day-only layer between them. `dayT` (slow ~110 s day clock) and `LITAMT` (0 by day,
up at night) were already in scope, as was `colA('glint',...)` — the cool-white specular color, distinct from
warm `foam`.

**Change (draw-only, ~14 lines, added not replacing).** A `glit=(1-LITAMT)·max(0,1-|dayT-0.47|/0.30)` factor —
1 at noon, 0 before dusk, 0 all night — gates a shimmer layer over open water (`!c.riv`): slow cool bands drift
seaward (`sin((x·0.9+y·0.5)-waveT·0.55)`) and **lift the whole hex tone** with a translucent `hexTile` wash
(α≤0.16), with brighter sparkle strokes riding each band's crest. No tile, entity, `rng()`, `hashCell`, `tick()`
pass or terrain; strings pure-ASCII (134). Night is byte-unchanged (glit=0 → the block draws nothing); pop
provably flat.

**Two-pass tuning (logged per the counterweight).** The FIRST build used only 1px cool strokes (no wash). It
passed the census but **both visual agents, blind, reported the sea as "flat uniform teal — glitter not
visible"** — the contrast×width law (fine speckle averages to nothing at fit zoom). Strengthened to the
tone-lifting **sheet** (a full-hex wash reads at any zoom); both seeds then PASS. The weak version was never
shipped — reverted in-place before the sheet.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram empty, all core metrics +0, entity counts identical
(cars 360 · trams 54 …). Vacuous by construction (a draw reading globals runs in no census metric) — the probe
is the gate.

**Probe.** `probes/probe-glitter.mjs` (new, promoted). Self-contained, no build-vs-build: freeze the clock AND
pin `waveT` to a constant (so foam/surf/sparkle cancel), render the SAME artifact at noon (glit=1) vs morning
(glit=0), and count pixels the noon frame pushed toward cool white (min-channel +≥12) over the OPEN-SEA box vs
an inland LAND box. seeds 7/42/1234: **sea = 43520 / 43306 / 42122** (mean **42983**), **land control = 7 / 5 /
6** (mean **6**). The morning frame draws no glitter by construction (glit=0), so that ~7000:1 ratio is the
day-only sheet, confined to the sea. (An earlier build-vs-build probe read dirty controls — two page loads
differ in `waveT` and Math.random entities — which is why the self-contained same-build, pinned-`waveT` diff is
the honest form; see findings.)

**Visual.** Coast + whole-city `wide` at seeds 42 & 7, one agent each: both **VISUAL: PASS** — cool shimmer /
brighter drifting bands "clearly perceptible as sunlit water," "not milky / not blown-out / not a film," no
z-order tears or floaters, the frame still a balanced coastal city. (The first, faint build's two FAILs are
logged above.)

**Verdict — SHIPPED.** The daytime open sea now catches the sun — a cool shimmer sheet that peaks at noon and
fades to nothing by dusk, handing off cleanly to the night's warm city smear. Draw-only, day-only, pop provably
flat. Water's Polish cell gains its next (U2, 44, 58, 79, 116, 132, **150**).

### Findings for later laps
- **A FINE-SPECKLE OCEAN EFFECT IS INVISIBLE AT FIT ZOOM — LIFT THE TILE TONE INSTEAD (contrast×width, again).**
  1px cool strokes on ~2/5 of sea cells read as "flat teal" to two blind agents; a translucent full-hex `hexTile`
  wash (a tone lift) reads at any zoom because it has area, not sub-pixel width. For a broad water/sky field,
  reach for a tone wash first and let sparkle strokes ride ON it, not instead of it.
- **A BUILD-vs-BUILD SEA PROBE IS CONFOUNDED; USE SAME-BUILD, PINNED-`waveT`, TWO-CLOCK DIFF.** Diffing patched
  vs pristine across two page loads gave controls of 300–560 (not ~0) because the two loads froze at different
  `waveT` (foam/surf animate with it) and spawned different Math.random entities (boats/surfers). Fix: measure
  ONE build, set `waveT` to a constant in-page, and diff two clock states whose only real difference is the
  feature's own gate (here glit at noon vs morning) — controls dropped to ~6. `waveT` is an assignable global,
  so a probe can pin it exactly like `playing=false` pins the clock.
- **A DAY-ONLY LIGHTING LAYER GATED BY `(1-LITAMT)·<midday bump>` COSTS THE NIGHT NOTHING AND HOLDS THE MEAN
  over a full day** (iter 98's law): it only ever *adds* brightness, and only by day, so the night frame is
  byte-identical (glit=0) and the sea's tone returns to base by dusk. This is the clean template for "the sun
  does X to the sea/sky" without a permanent tone drift.
