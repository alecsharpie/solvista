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
| **Nature** | 4, 26, 29, 102, **156** | 1, 13, 60 | 37, 46, 67, 76, **108**, **120**, **139** | ~~46~~, ~~88~~, ~~101~~ | U4 | 53, 96 | **117**, **129**, **148** |
| **Water & coast** | 6, 10, 12, 16, 20, 33, **106** | 90 | 17, 25, 51, 65, 72, **113**, **123**, **159** | 22 | | U2, 44, 58, 79, **116**, **132**, **150** | **97**, **141** |
| **Urban fabric** | 32, 62 | 7, 23, ~~82~~, **151** | 38, 54, 68, 92 | 47, **109**, ~~**160**~~ | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103**, **110**, **118**, **124**, **143** | **133** |
| **Transport** | 2, 9, 21, 31, 48, **164** | 77 | 28, 39, 55, 63, **112**, **121**, **128**, **155** | 5, 15, **138** | U4 | U1, U3, 70, 85, 87, 94, **146** | **105** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107** | 36, 59, 66, 80, 91, **149**, **158** | 45 | | 73, ~~**114**~~ | 52, 122, **140** |
| **Sky & atmosphere** | 27, 43 | | 19, 35, 50, 57, 95, **135**, **153**, **161** | | | 61, 81, 89, **115** | ~~**134**~~, **144** |
| **People & activity** | 41, 56, **127** | 49 | 34, 64, 93, **104**, **119**, **145** | 78, **111** | | 84, **137**, **163** | 71, **154** |

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
  Sky **161** · Urban ~~**160**~~ (Connect reverted; last SHIP 151) · People **163** · Nature **156** · Transport **164** · Civic **158** · Water **159**. (162 = step-back, no domain lap.)
  **Stalest is now Urban (last SHIP 151; 160 Connect reverted)**, then Nature (156) — Transport just went at 164 (the taxi, a lemon-yellow cab variety on the car entity, closing its New-element cell), so the next lap (165) owes Urban, then Nature (Urban's additive cell is spent (118), its Connect measured-hard (160) — so Deepen/Polish, or a COM high-street arcade once `hstr` adjacency is measured). Check the last entry of the stalest domain for a banked
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
  **`rGreen`, `rShop`, `rServ`** feed only the walkable stat — *nothing sites itself against them.* **⚠ And a
  tick-rule CAN'T read them directly (iter 151): `recount()` runs only at init/warp/manual, never in the sim loop
  (L6342), so the reach maps are STALE inside `tick()`** — 151 cashed the seam's *shape* (a shop-distance rule)
  but recomputed it LOCALLY (`countAround` r2), so `rShop` per se is still unread (recompute it, or pay a recount).
  **Iteration 167 is the next holistic step-back** (105, 110, 115, 120, 125, 130, 136, **142**, **147**, **152**, **157**, **162 done**, …).
  Shoot it **at night AND a season, and PIN THE DAY FRAME OFF JANUARY** (`year=2035.62` dry-peak baselines +
  `2035.02` as the seasonal-contrast frame — a default `?warp=61` frame is already ~winter; SKILL.md holds
  the full recipe). **130, 136, 142, 147, 152, 157 AND 162 all found NO compounding city defect** (SEVEN clean bills in a row, the
  honest step-back outcome, no city change): both seeds PASS day/night/season, agents *located* the night core
  off-centre by light alone (162: (.48,.53) / (.45,.62), matching 157's (.48,.52)/(.48,.60) & 152's (.47,.55)/(.44,.62); 115/143's lighting holds), 138's
  arterial night-corridors traced continuous both seeds, sea reads (116/123 hold), no tears/floaters/blowout;
  seasons measured alive (`probe-season`: FARM winter→dry-peak **88**, VINEYARD now moving too since 139, ROAD
  control ~0.5–2 — the *whole-frame* mildness agents feel is the by-design evergreen/irrigated dilution (120),
  a composition fact not a dead calendar). **The night-core-is-broad watch-item (136/142) is CASHED (iter 143,
  Urban × Polish): a `CORESIG=5` Gaussian bump on the CBD made the flat plateau a peak (`probe-nightcore`, detail
  archived); a stronger read widens the window mix `0.35+0.65·c.lit`, not `c.lit`.** (**125** = same shape, the pin-off-January recipe fix.)
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
  Recent kinds (135–141 recaps archived at iter 162 trim):
  **143 Polish (night CBD Gaussian light peak — `CORESIG`)** · **144 Interaction/UX (moon HUD card — `moonWord()`)** · **145 Deepen (beach furniture follows the sun via `LITAMT` — day-only umbrellas, `probe-beachsun`)** · **146 Polish (the bus reads as a bus — taller boxy body + window strip + cream livery, `probe-buslivery`)** · **149 Deepen (town-hall clock hand reads `dayT` — 24h dial, up at noon / down at midnight, agrees with the sun & moon; `hallClockCtr` shared by draw + `__clock` hook, `probe-hallclock`)** · **150 Polish (the open sea gets a day-only SUN GLITTER — cool bands of shimmer lift the water tone at noon, gone by dusk, night byte-unchanged; `probe-glitter`)** · **151 New CA rule (the block grows its own CORNER SHOP — a house in a shop desert opens a green-awning store on its ground floor via `c.corner`, a mixed-use FLAG so it stays RES and the census is vacuous; re-validating, stream+pop neutral; `probe-cornershop`)** · **152 STEP-BACK (fifth consecutive clean bill — no city change; perf 143→151 ~zero, seasons alive, night core located)** · **153 Deepen (the night STARS fade under a full moon — a 5th reader of `MOONF`, per-star magnitude thins the faint ones first; `probe-starmoon`)** · **154 Interaction/UX (the Resident tooltip names what the ped is doing from its hex — pier/market/green/kerb — via `residentDoing()`, the dog echoes its owner; `probe-strolling`)** · **155 Deepen (the streetcar draws from an OVERHEAD CONTACT WIRE — the pole that poked at empty air now rides a catenary strung the A→B block; the draw-form of the 149 tell; `probe-tramwire`)** — (**130/136/142/147/152/157 were the holistic step-backs.**) **156 New element (the WOODS FLOWER IN SPRING — a wildflower understory carpets the 69-hex forest floor before the canopy closes, then fades by summer; shared `springBloom()`, draw-only stream+pop-neutral; `probe-woodbloom`).** **157 STEP-BACK (sixth consecutive clean bill — no city change; perf 152→156 ~zero, seasons alive incl. FOREST now moving via 156, night core located both seeds).** **158 Deepen (the OBSERVATORY DOME opens after dark and ROTATES to track the night sky — slit at the zenith at midnight, leaning to the horizons at dusk/dawn, shut by day; reads the slow `dayT` like the 149 clock & 135 moon; `__obs` locator, `probe-obsdome`).** **159 Deepen (the SURF GLOWS at night — bioluminescence sparkles the breaking wave with sparse soft sea-green DOTS, `LITAMT>0.5`-gated & `hashCell`-scattered, draw-only stream+pop-neutral; `probe-biolum` — the Water entry in the moon/stars/observatory night run).** Interaction/UX ran hot 133/134/140/141/144; 143/145/146/149/150/151/153/155/156/158/159 broke it to Polish/Deepen/Polish/Deepen/Polish/New-CA/Deepen/Deepen/New-element/Deepen/Deepen, 154 was Interaction/UX. **160 Urban × Connect EXPLORED → REVERTED** (RES terracing — extend 109's MID street-wall to houses): mechanism worked (`probe-terrace` 46–53% gap-fill vs 0.5% control) but the HOST doesn't exist at scale — only ~15% of RES have an E-W RES neighbour and ZERO seeds form runs of ≥3, and RES bodies are HEX PRISMS (widening a hex ≠ a shared-wall terrace). **Law: check host ADJACENCY, not just host count, before a Connect — 109's street-wall is MID-specific (MID clusters + is rectangular); RES/COM terracing needs measured E-W runs first. Urban × Connect still open (last SHIP 109); a COM high-street arcade (`hstr` marks retail runs) is the better target once its adjacency is measured.** **161 Deepen (CLOUD BELLIES catch the GOLDEN HOUR — the two lower puffs of a fair cloud tint toward `dl.skyBot` by `cwarm=clamp((R-B-70)/70,0,1)`, warm at dawn/dusk, ~0 at noon AND night; top puff & rain clouds untouched; draw-only stream/pop-neutral; `probe-cloudwarm` sky-band build-vs-build, dusk +11.6 warm≫cool, noon control balanced).** The `cwarm` gate off `skyBot` is a reusable golden-hour signal; next Sky feed needs a genuinely new derived field (the Sky-feedable vegetation list is empty since 139, and the SEASON word is still banked-but-blocked by its fast-`year` strobe, 134). **162 STEP-BACK (seventh clean bill).** **163 Polish (STATIC STANDING CROWDS finally cast the house-style contact shadow — the evening strip crowd (COM) + school-run drop-off now `shadS` at their feet like every ped/vehicle since 137; draw-only stream/pop-neutral; `probe-crowdshadow` strip 234/206 darker px & ZERO lighter, control flat). Closes 137's banked static-crowd gap; only the ELEVATED platform queue + abstract concourse dots deliberately left (deck/dots, not ground figures).**
  **⚠ Iteration 167 is the next holistic STEP-BACK** (…/**152**/**157**/**162 done**/**167**) — not a domain lap; see the recipe
  below (night + season, day frame off January, interleaved perf). **162 was the mandated step-back (SEVENTH clean bill,
  perf 157→161 flat day / +1.1% night, seasons alive, night core located both seeds). 163 took People × Polish
  (static-crowd contact shadows, closing 137); 164 took Transport × New element (the taxi — a `Math.random`-flagged
  lemon-yellow cab variety on the car entity; the next lap (165) owes the stalest, Urban (last SHIP 151), then Nature (156)).** **155 took Transport × Deepen (the tram catenary, the
  149 draw-tell); 156 took Nature × New element (spring wildflower understory on the FOREST floor — 127's
  surface-not-entities law, forest=69 hexes vs garden=2). 157 was the mandated STEP-BACK; 158 took Civic × Deepen
  (the observatory dome rotates to track the night sky — 149's banked draw-tell); 159 took Water × Deepen (the surf
  glows at night, `probe-biolum`); the next lap (160) owes the stalest domain, Urban (151)**, then Sky (153). Sky is post-saturation (Deepen/Fix ONLY — its additive/CA cells are traps;
  the banked Sky move is the SEASON word, which needs a slow clock FIRST — see the moon note above). Urban's
  additive cell is spent (118). The coldest kind is **Scale** (a structural lever, not a lap move);
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
  **Iters 130/136 (step-backs): 126→135 cost ZERO** (130 −0.5% both vs iter-125 `c63e43b`; 136 +0.1% vs iter-130
  `f2aa721`; night +7% vs the STORED baseline proven load both). **147: 143→146 cost ZERO**; **152: 143→151 cost
  ZERO** (both vs iter-142 `ce17d61`, min/variant, all flat — detail archived). **157: 152→156 cost ZERO**
  (day +3.5% inside the ±9ms day noise, night +0.4% flat; detail archived). **162: 157→161 cost ~ZERO** — HEAD-161 vs iter-157 (`ae93fd4`, A/B/A/B min/variant)
  day **35.00 vs 35.05 (−0.1%, flat; day steady this run, all 4 reads 35.0–35.3)**, night **41.45 vs 41.00 (+1.1%,
  small — 158 dome + 159 biolum land at night)**; `perf.mjs` vs stored baseline read +5.9%/+11.3% (pure load).
  **The day column is USUALLY the noisy one on this box — grade it ONLY by min-of-≥2-rounds
  interleave, but check the round spread (162's was tight); night is steady and is the SLOW-accumulating column
  (night-only draws pile up there).** The stored-baseline false-FAIL is now an **EIGHT-time pattern
  (125→130→136→142→147→152→157→162)** — always understates today's load; the interleave-against-an-old-commit reading is
  the only honest step-back grade, and it is **NOT re-pinned** (baking today's load in would blind the gate).
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
  **(l) CLOSED (iter 133) — hover-tile focus ring + the thin-stroke legibility law: both in GROWTH-archive.md (iter 157 trim).**
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
  **(d) the civic quarter's real square — CLOSED, MEASURED DEAD (iter 131; do not re-open — a ≥3-hex civic
  square is geometrically impossible at the quarter, `probe-quarter.mjs`; full reasoning archived at iter 142).**
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

> **Archive:** the 157 entries before Iteration 155 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

## Iteration 155 — the streetcar draws from an overhead wire (2026-07-11) [Transport × Deepen]

**Vector.** Transport × **Deepen** (SHIPPED). Rotation named the domain — Transport was the single stalest (last
146) — and 118's law + 138's findings rule out a Transport New element (entities saturated). Varied the kind off
146 (Polish) / 154 (the recent IUX run) to **Deepen**, running the loop's most reliable move in its **draw** form
(149's law): an ornament that asserts a relationship the draw ignores. The tram's comment (L5134) called its
trolley pole *"a slim trolley pole to the overhead"* — but there **was no overhead.** The pole drew from
`cy-6.6` to a lone contact dot at `(cx+1.3, cy-9.4)`, poking at empty air. Same shape as 149's frozen clock:
the streetcar claimed to be an electric rail vehicle drawing power from a catenary, and drew none.

**The seam.** `drawVehicle`'s `v.kind==='tram'` block (L5133). `A=ctr(v.x,v.y)`, `B=ctr(v.nx,v.ny)` (the A->B
segment the tram is traversing), `L`, `lane` are all in scope at the top of `drawVehicle` (L5077-5079), so the
overhead wire can be strung the length of the block at the SAME lane offset, raised a fixed height.

**Change (~8 lines, draw-only).** Replaced the leaning pole+dot with (1) a **contact wire** from `A` to `B`,
lane-shifted and raised `wh=9.6` (`ctx.moveTo(A[0]+lox,A[1]+loy-wh)…lineTo(B[0]+lox,B[1]+loy-wh)`) — because
`cx=lerp(A,B,p)-ddy/L*lane` and `cy=lerp+ddx/L*lane*0.6`, the wire point directly above the tram is exactly
`(cx,cy-wh)`, so the wire spans the ROAD (holds still as the tram slides under it), not the car; (2) a **vertical
pantograph** from the roof `(cx,cy-6.6)` straight up to `(cx,cy-wh)`; (3) the contact shoe dot at `(cx,cy-wh)`.
Kept the cream livery belt. No tile, entity, `rng()`, `hashCell`, `tick()` pass or terrain; strings pure-ASCII
(134, comment only). Pop provably flat, stream-neutral.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram empty, core metrics +0 (`towerHt +1` is the documented
chaotic-CA headless wobble), entity counts identical (trams 54 · cars 360 …). Vacuous by construction — the
probe is the gate.

**Probe — `probes/probe-tramwire.mjs` (new, promoted).** Trams drift nondeterministically over the road network
between loads (137's law), so it CLEARS **every** mover (clouds/birds/balloons spawn via `Math.random` and would
put a noise floor on a whole-frame diff — see findings) and PLACES 120 trams (target) then 120 cars (control) at
spread ROAD centres, all east, frozen clock+`waveT` (109). Metric = **whole-frame** changed-pixel fraction
patched-vs-pristine-HEAD (in a frozen frame the only difference IS the wires, so no per-vehicle box / unit
juggling). seeds 7/42: **tram-set 0.21% of frame changed** vs **car control 0.004%** — a ~50x separation,
confined to the tram kind (the car draw is byte-identical). **PASS.**

**Visual.** `probes/shot-tramwire.mjs` (new) places a run of trams on a **clear avenue** (front-of-frame, open
ground/water in front so nothing occludes the overhead), camera-zooms, clips day + night. First shot placed the
trams in a **tower canyon** and an agent correctly FAILED it (front-row towers buried the trams AND the wire,
leaving pantograph nubs poking at air — see findings); the fair clear-avenue re-shoot then PASSED: a fresh agent
read the wire as *"a single thin dark wire … unbroken across the full avenue … poles rise from the tram roofs and
meet it"*, plausible catenary, no z-order tears/clipping/blowout, present day and night. Whole-city `wide` at
seeds 42 & 7, one agent each: both **VISUAL: PASS** — balanced coherent coastal cities, nothing compounded (the
wire is sub-pixel and invisible at fit zoom, so it adds no clutter there).

**Verdict — DEEPENED.** The streetcar now draws power from an overhead contact wire strung over its avenue, where
for the artifact's whole life its pole poked at empty air — it reads as an electric tram, joining the moon (135),
the clock (149) and the vineyard (148/139) in the run of ornaments that now honor what they always claimed.
Draw-only, stream-neutral, pop flat, ~8 lines. Transport's Deepen cell gains its next (28, 39, 55, 63, 112, 121,
128, **155**); Transport is no longer stalest (Nature 148 now is).

### Findings for later laps
- **THE ASSERTS-MORE-THAN-IT-SHOWS *DRAW* TELL (149) PAID AGAIN — grep vehicle/ornament COMMENTS for a claimed
  connection the geometry omits.** 149 found the frozen clock by its comment; this lap found the tram by *"pole to
  the overhead"* over an overhead that wasn't drawn. Candidates still open (149's list): the firehouse bell is
  static; museum/parliament are floodlit but otherwise inert. A pole/mast/gauge that *should* touch something is
  the richest version.
- **A LOW OVERHEAD ELEMENT IS OCCLUDED BY FRONT-ROW BUILDINGS — that is physically correct, but it means a
  tower-canyon zoom can show a bare pantograph nub.** The wire draws in the tram's bucket (after its own two
  cells' buildings, L5608) so it is correct against those, but nearer ROWS (drawn later, L5600) legitimately
  overpaint it — so in dense downtown the wire hides behind the front towers (as real catenary would) and only the
  nub pokes above. Unlike the monorail (drawn per-cell at `RAILH`, well above rooftops), the tram wire is at
  street level and inherently occludable. Accepted as realistic; a shot MUST choose a clear avenue (open ground in
  front) to judge it fairly, or it reads as broken nubs. **When shooting a low overhead detail, pick a
  front-of-frame cell with open ground/water behind and in front — never a tower canyon.**
- **A WHOLE-FRAME PATCHED-vs-HEAD DIFF NEEDS EVERY `Math.random` MOVER CLEARED, not just the seeded ones.** My
  first cut cleared vehicles/peds/etc. but left clouds/birds/balloons, which spawn via `Math.random` at load and
  differ between the two page loads — a 0.15% whole-frame noise floor that swamped the ~0.2% wire signal. Clearing
  **all** movers dropped the control to 0.004% (pure render nondeterminism) and the ~50x separation appeared. For
  any whole-frame two-load diff, clear the full entity list (the `[a,b,…].forEach(a=>a.length=0)` block), not a
  subset. (The per-box metric in `probe-buslivery` sidesteps this by only sampling the vehicle body; a whole-frame
  metric cannot.)
- **`CW` IS A WORLD UNIT; `sx/sy` FROM `__find` ARE SCREEN px — do not mix them in a getImageData box.** My first
  probe built the sample box as `0.7*CW*dpr` wide (world) but `(sy-12)…(sy-6.5)` tall (screen), so the box was the
  wrong size and read ~0 signal. The whole-frame diff dodges the unit problem entirely and is the more robust
  shape for a thin draw-only ornament whose exact pixels are hard to box.

## Iteration 156 — the woods flower in spring (2026-07-11) [Nature × New element]

**Vector.** Nature & landscape × **New element** (SHIPPED). Rotation named the domain — Nature was the single
stalest (last 148) — and 155's entry passed it the baton. Kind: varied off Nature's worn Deepen (139/120/108)
and its now-spent agriculture Interaction/UX (148); **New element** is Nature's stalest kind (last **102**) and
fresh. Content followed **127's law** (saturation is of a domain's *entities*, not its *surfaces*): FOREST is a
large untouched surface — **69 hexes/city** vs GARDEN's 2 and MEADOW's 2-6 — and its floor drew nothing but
`grassDk` + scrub. Meanwhile the MEADOW's lovely wildflower-bloom aesthetic (specks + butterflies, iter 49) is
stranded on those 2-6 tiles where nobody sees it. So: a spring wildflower understory on the woodland floor —
botanically the ephemerals that bloom in the brief window after the thaw and **before the canopy closes over
them** (the same `s≈0.28` spring the palette already greens the canopy on).

**The seam.** `case T.FOREST` (L3331) drew the floor as one `grassDk` fill; `applySeason` (L314) already computes
a `spring` factor from `year` but only fed it to the canopy palette. I added a shared `springBloom()` (L1113,
next to `orchardPhase`/`vinePhase`) = `clamp(1-|s-0.28|/0.17,0,1)` — ONE predicate the draw and the tooltip both
read (112's law), so the flowers cannot claim a season the floor doesn't paint.

**Change (~10-line draw + 1-line tooltip + 1 helper, all draw-only).** In the FOREST draw, right after the base
hexTile and **before** the trees (so the canopy overlays the floor), a `springBloom()>0.06`-gated block scatters
3-5 wildflower specks per hex — `hashCell(x,y,seedNum^SALT)` for count and positions (spaced salts 0x5B/0x5C/0x5D),
colors `lav`/`gold`/`white` (static, not season-touched, so they keep their hue), alpha `0.30+0.55·spf`. A
matching `describeTile` row (`['Understory','Spring wildflowers']` when `springBloom()>0.4`) keeps the tooltip in
sync. No tile, entity, `rng()`, `tick()` pass or terrain; strings pure-ASCII (134). Fully stream-neutral (hashCell
only) and pop-neutral.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram empty, all core metrics +0 (`pop +4` is documented
chaotic-CA headless wobble), entity counts identical. Vacuous by construction — the probe is the gate.

**Probe — `probes/probe-woodbloom.mjs` (new, promoted).** Isolates the flowers from the canopy's OWN seasonal
palette shift by diffing **patched vs pristine HEAD at the SAME frozen spring frame** — the only difference
between the two builds is the wildflower block (per-pixel changed fraction, |ΔRGB|>18, over each FOREST hex's 7×7
box). Clears EVERY mover first (tramwire's law — else Math.random cars/peds drift over the ROAD control between
loads). seeds 7/42: **FOREST changed 10.95% / 11.30% in SPRING → 0.00% / 0.00% in SUMMER** (spf=0, byte-identical),
**ROAD control 0.04-0.16%** both frames. So the understory appears only in spring and only on forest — a ~55×
separation within the one tile type, and zero leakage onto roads.

**Visual.** `probes/shot-woodbloom.mjs` (new) camera-zooms a dense forest patch, clipping spring vs summer; plus
whole-city `wide` at seeds 42 & 7 (spring). Three agents, one each, discriminate-don't-judge (108). Zoom agent:
SPRING has the lavender/gold/white specks on the forest floor between/under the trees (not floating, not bleeding
onto the neighbouring meadow hex), SUMMER floor plain — **VISUAL: PASS**. Both whole-city agents: balanced
coherent coastal city, no z-order tears/floaters/blowout, forest/green reads as calm sage/olive with **no** speckle
or noise at fit zoom (the understory is correctly sub-pixel there) — **VISUAL: PASS** both.

**Verdict — SHIPPED.** The woods now flower in spring — a wildflower understory carpets the forest floor before
the canopy closes and fades by summer, lifting a 69-hex surface that drew nothing but a green fill, and finally
giving the MEADOW's stranded bloom aesthetic a stage the whole city can see. Draw-only, stream + pop neutral, one
shared predicate. Nature's New element cell gains its next (4, 26, 29, 102, **156**); Nature is no longer stalest
(Civic 149 now is).

### Findings for later laps
- **127'S "SURFACE, NOT ENTITIES" LAW PAYS AGAIN — pick the domain's BIGGEST tile count for a New element.** The
  census tile histogram is the map: seed 42 forest=69, park=205, but garden=2, meadow=2-6. A within-hex ornament
  buys pixels in proportion to the tile's COUNT, so a New element aimed at a 2-tile type (GARDEN, which the header
  kept banking) is nearly invisible whatever you draw; the same effort on FOREST (69) lights the whole woodland.
  **Read the histogram before choosing which surface to decorate.**
- **A SEASON-GATED DRAW IS PROBED patched-vs-pristine AT ONE FROZEN SEASON, not season-vs-season.** The confound is
  that the base palette ALSO shifts with season (the canopy greens/golds), so a plain spring-vs-summer FOREST diff
  moves even with no flowers. Diffing the two BUILDS at the same spring frame cancels the palette shift entirely —
  the only difference is your block. The summer patched-vs-pristine diff (=0) is then the clean confinement control,
  and it's stronger than ROAD because it's the SAME tile type proving your gate is off out of season.
- **`springBloom()` JOINS `orchardPhase`/`vinePhase` AS A SHARED YEAR-PREDICATE — reuse it, don't re-clamp.**
  Anything else that should key on the spring window (a future MEADOW green-up, blossom drifts, spring bird return)
  should read it, so the draw and any tooltip cannot drift. It reads the FAST `year` (development clock), which is
  fine for a CONTINUOUS alpha (drift tolerated, like `applySeason`), but a DISCRETE spring/not-spring readout off it
  would strobe (134) — quantize or slow-clock first, exactly as the banked SEASON word still needs.

## Iteration 157 — the eleventh step-back finds a clean city, perf flat (2026-07-11) [holistic step-back]

**Vector.** The mandated holistic step-back (105/110/115/120/125/130/136/142/147/152/**157**). Not a domain × kind
lap: it reads the WHOLE city for *cumulative* drift the census and per-feature gates are blind to, runs the season
probe + interleaved perf gate, at night AND a season with the day/night baselines pinned OFF January
(`year=2035.62` dry peak; `2035.02` as the seasonal-contrast frame). No city vector taken, so rotation is
unchanged — the next lap (158) owes the stalest domain, **Civic (149)**, then Water (150).

**What was read.** Un-zoomed whole-city `wide` frames at **2 seeds × 3 lights/calendars** — seed 42 (warp 61) &
seed 7 (warp 31), each at {day 2035.62/t=0.35, night 2035.62/t=0.90, winter 2035.02/t=0.35}. One subagent per
seed read its own three frames: the cumulative question ("has anything compounded into clutter or darkness?")
plus 108's **locate-don't-judge** night test ("where is the core by light alone?").

**Result: the city is healthy — both agents VISUAL: PASS.**
- **Night core (115/143) LOCATED off-centre both seeds** — seed 42 ~(0.48,0.52), seed 7 ~(0.48,0.60) — matching
  152 ((.47,.55)/(.44,.62)), 147 and 142, each with a genuine core→edge falloff to a dark rim, not a flat wash.
  Both agents also named a secondary lit lobe (42 ~(.42,.38), 7 ~(.42,.48)) — the old-town crossroads reading
  distinct from the CBD, as intended.
- **138's arterial night-corridors** read as *continuous* warm ribbons distinct from dim side streets both seeds;
  the sea reads (116's bottom + 123's founded wind farm). **No z-order tears / floaters / hard seams /
  blown-out white** in any of the 6 frames. **Winter reads distinct** from summer (farm/scrub tan/dormant, cooler
  flatter light, cooler ocean) at both seeds — the mildest of the three deltas, by-design (120's dilution).

**Season — measured alive.** `probes/probe-season.mjs`: FARM winter→dry-peak **88.4** (matches 130/136/142/147/152),
VINEYARD 44.6/36.7/42.7 (139), **FOREST now 20.6/19.7/24.6** (156's spring understory + canopy shift both read),
ORCHARD/MEADOW/SHOREPARK all move, PARK/REDWOOD/GARDEN/QUAD near-zero by design (120), ROAD control **0.5–2.2**.
Calendar working; the whole-frame mildness is the by-design evergreen/irrigated dilution.

**Perf — 152→156 cost ZERO; the stored-baseline read fired its SIXTH+ false-FAIL.** `perf.mjs` vs stored baseline
read day **+30%** / night **+39%**, looking like a regression. Interleaved HEAD-156 vs the iter-152 file
(`be84b49`, A/B/A/B, **min per variant**): day **37.66 vs 36.39** (**+3.5%**, inside the ±9ms round-to-round noise
floor the day column swung across — 43.2/37.7 for the same HEAD bytes) and night **42.83 vs 42.66** (**+0.4%,
flat**). So 153 (per-star magnitude, night-only draw) + 154 (tooltip-only) + 155 (tram catenary, day+night stroke)
+ 156 (spring understory, OFF at the perf frame's ~January year) added nothing measurable. NOT re-pinned. Census
PASS, vacuous (no source edit); tree verified clean after the interleave restored HEAD.

**Change (the step-back's product — none to the city).** No compounding defect, so per 120/130/136/142/147/152 ("a
clean step-back is a complete iteration — don't force a filler vector") the output is the health record + header
refreshes: step-back pointer 152→157 (next 162), the sixth clean bill, and the 157 interleaved perf reading. No
`solvista.html` edit.

**Verdict — FIXED.** No compounding city defect — the SIXTH clean step-back in a row (130, 136, 142, 147, 152,
157). All accumulated visual laws (115/116/120/123 + 138 arterials + 143 CBD peak) still read at both seeds under
all three lights; the season is alive (156's understory now shows in the FOREST column); perf is flat against the
honest interleaved control.

### Findings
- **SIXTH CONSECUTIVE CLEAN STEP-BACK, and the stored-baseline false-FAIL is now habitual — trust ONLY the
  interleave.** The stored baseline (day 33.16 / night 37.33, pinned 2026-07-10) read +30% day / +39% night on a
  diff the interleave proves free; the 5-day-old iter-152 file reads the same inflated numbers today. Re-pin only
  if an interleave *itself* shows a persistent offset (it has not since 142's real +2.2%).
- **THE DAY COLUMN IS NOISIER THAN NIGHT ON THIS BOX — grade day only by the min-of-≥2-rounds interleave.** Round 1
  read the identical HEAD bytes at 43.2ms day and round 2 at 37.7ms (a 15% swing from load alone), so a single-round
  day delta is meaningless; night was steady (42.8/42.9). Take at least two rounds and the min per variant, exactly
  as the skill says — a one-round day number will invent a regression or hide one.
- **156's spring understory correctly reads ZERO perf at the standard perf frame** (year 2035 ≈ January, bloom
  gate off) yet MOVES the season probe's FOREST column (spring 20.6) — the two gates see it at different calendars,
  which is the intended design (season-gated draws are free out of season). Don't read "perf flat" as "the feature
  isn't drawing"; read the probe at the season the gate is on.

## Iteration 158 — the observatory dome opens and turns with the night sky (2026-07-11) [Civic & culture × Deepen]

**Vector.** Civic & culture × **Deepen** (SHIPPED). Rotation named the domain — after the 157 step-back the lap
owed the stalest domain, **Civic** (last SHIP 149). Kind stayed Deepen (149's own cell) because 149 explicitly
*banked* the seam: the asserts-more-than-it-shows tell has a **draw** form, and 149's richest banked candidate was
*"a frozen sundial/gauge/vane that should track a clock."* The observatory is exactly that — and it feeds Sky by
deepening Civic toward it (108's law, "Sky can be fed by deepening another domain"). A banked, named finding
outranks kind-rotation (the header's own law), so Deepen it is; content varies from 149 (a clock hand) and 155/153
(tram/stars).

**The seam.** `case 'observatory'` (L4650) drew the teal dome with a **slit at a FIXED azimuth** — `sd` (a per-city
hashCell) flipped which side it sat, but it never moved through the night — while its own `CIVICDESC` promised
*"A dome out on the dark rim of the city, open to the night."* A real observatory dome **rotates** to keep a target
in the aperture and is buttoned up by day. The observatory is one-per-city, sited from 2018 (present in the 2035
census slices) — a zoom-reward landmark like the hall clock (149), not dead code (census tile histogram confirms 1/city).

**Change (~13 lines, draw-only).** Replaced the static slit with an aperture whose azimuth reads the slow day clock
(`dayT`, the same one the hall clock (149) and moon (135) read): `nd = dayT>0.5?dayT-1:dayT` (signed offset from
midnight), `phi = clamp(nd*4.887,-1.4,1.4)*openAmt*sd`. So the slit points at the **zenith (straight up) at midnight**
and leans toward the east/west horizons through dusk and dawn — and at midnight it looks UP while the 149 clock hand
points DOWN, complementary readers of one clock. `openAmt = clamp((LITAMT-0.15)/0.45,0,1)` gates the aperture
open after dark and shut by day (thin seam → wide bright glowing slit); the instrument glow rides the open slit.
`sd` kept as per-city handedness. No tile, entity, `rng()`, `hashCell` spawn, `tick()` pass or terrain; strings
pure-ASCII (134). Stream + pop provably flat. Added a test-only `__obs()` locator hook (dome center/radius on
screen + `sd`/`openAmt`/`phi`), mirroring `__clock` (149).

**Census.** PASS, exit 0, pageerrors 0. Tile histogram empty, all core metrics +0, entity counts identical
(`greenRoofs +1` is documented chaotic-CA wobble). Vacuous by construction (a draw reading globals) — the probe is
the gate.

**Probe — `probes/probe-obsdome.mjs` (new, promoted).** Zooms the camera onto the dome (149: camera-set beats
wheel) and measures the aperture from pixels, locate-don't-judge (108); recomputes the expected sweep itself, never
gates on `__obs().phi`. Two measurements: **azimuth** = centroid of near-white slit ink (L>235 — clean at night,
when the dome is dark); **open/shut** = local contrast `p95−median` in the aperture band (lighting-robust, unlike
absolute luminance which daylight confounds — my first cut read noon "brighter" than midnight). seeds 7/42/1234/3/88,
all with an observatory: at 5 night dayT the slit azimuth sweeps **monotonic** and **midnight sits at the zenith
(−1°)** — seed 42 (sd=1) −39°→−20°→−1°→+8°→+12°, seed 3 (sd=−1) mirrors it +38°→…→−13°; aperture **open at midnight
(contrast 156) vs shut at noon (70)**; control (a night frame twice) pixel-identical. **VERDICT: PASS (5 seeds).**

**Visual.** `probes/shot-obsdome.mjs` (new) camera-zooms the dome at dusk/midnight/dawn/noon, 2 seeds. One agent,
blind locate (108): midnight slit **UP** both seeds; dusk vs dawn lean to **opposite sides** (mirrored between seeds
by `sd`, as designed); noon aperture a faint shut sliver vs the vivid midnight glow; dome seated on its drum, proper
z-order (a front tower correctly occludes) — **VISUAL: PASS**. Whole-city `wide` night (seed 42) + day (seed 7),
one agent each: both balanced coherent coast, lit core → dark rim, no tears/floaters/blowout, nothing compounded —
**VISUAL: PASS** both.

**Verdict — DEEPENED.** The observatory dome now opens after dark and rotates to track the night sky, where for the
artifact's whole life its slit sat frozen — finally honoring the `CIVICDESC` that always called it "open to the
night." Draw-only, stream + pop flat, ~13 lines + a locator hook + a probe + a shot script. Civic's Deepen cell
gains its next (36, 59, 66, 80, 91, 149, **158**); Civic is no longer stalest (Water 150 now is).

### Findings for later laps
- **149'S DRAW-TELL PAYS AGAIN — its banked candidate list is a to-do list.** 149 named the seam ("a frozen
  vane/gauge/dome that should track a clock") AND named the candidates; 158 just cashed the richest one. Still
  banked from 149: the **firehouse bell** (static gold disc — but no natural clock tie, weaker) and the
  **museum/parliament** floodlights. The observatory was the strongest because its own tooltip already asserted the
  behavior ("open to the night"). Where else does a DRAWN ornament's comment/shape promise motion the draw ignores?
- **OPEN/SHUT IS MEASURED BY LOCAL CONTRAST (peak−median), NOT ABSOLUTE LUMINANCE — daylight confounds the latter.**
  My first probe counted pixels over a fixed luminance threshold and read NOON as *more* open than midnight, because
  the whole daylit dome exceeds the threshold. The fix: within the aperture band, `p95−median` — a bright slit on a
  dark night dome gives high contrast; a shut seam on a uniformly-lit day dome gives low contrast — regardless of
  ambient light. Absolute-threshold centroid is still fine for the AZIMUTH *at night* (dome dark, only the slit is
  near-white). Two metrics, two lighting regimes: contrast for open/shut across day↔night, luminance-centroid for
  direction within the night.
- **A SWEEP THAT PIVOTS ON `dayT>0.5?dayT-1:dayT` IS SYMMETRIC IN CODE BUT NOT IN THE OPEN WINDOW.** The aperture is
  full-open by dusk (dayT 0.90 → openAmt 1.0) but drops fast on the dawn side (dayT 0.10 → 0.21), so a naive
  symmetric ±0.10 night sample set put one frame outside the open window (ink=0). Pick night probe samples by
  checking `openAmt`, not by assuming the dusk/dawn edges are mirror images — the daylight model isn't.

## Iteration 159 — the surf glows at night (2026-07-11) [Water & coast × Deepen]

**Vector.** Water & coast × **Deepen** (SHIPPED). Rotation named the domain — after the 158 Civic ship the lap
owed the stalest domain, **Water** (last SHIP 150). Kind varied off Water's worn Polish (150/132/116) and its
recent IUX (141) to **Deepen**, enriching the existing surf-break draw with a genuinely new night phenomenon —
and, like 135 (moon) / 153 (stars) / 158 (observatory), feeding the night-mood theme by deepening a domain toward
Sky (108's law). Content: **bioluminescence** — the breaking surf phosphoresces a cool sea-green after dark, the
Water counterpart to the run of night features the last laps built.

**The seam.** `case T.WATER`'s surf-break block (L3126) already strokes foam along every beach-facing hex edge with
a traveling opacity wave `ph=sin(waveT*1.6-(y+dy*0.5)*0.9)` and an inset `ins`. Its per-edge vertices `a`/`b`,
inset direction `ix`/`iy`, and `ph` are all in scope — the exact host for a night glow that breaks where the wave
breaks.

**Change (~18 lines, draw-only).** A `LITAMT>0.5`-gated block after each foam stroke scatters up to 3 **soft
glowing dots** along the break, each `hashCell(...,seedNum^0x0B10)`-gated (skip if `hb<0.45`) so most slots are
empty and the glow reads as **sparse sparks, not a line**. Each dot: a wide faint halo arc + a small bright centre,
both a **deep saturated sea-green** raw literal (`rgba(66,220,164)` / `rgba(110,238,188)` — emitted light, so
untinted by the blue night TINT, like the warm city-light smear above; low red channel so overlaps stay green, not
white). Strength = `dphi·(LITAMT-0.5)/0.5·(0.55+0.45·hb)`. No tile, entity, `rng()`, `tick()` pass or terrain;
strings pure-ASCII (134). Stream + pop provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram empty, core metrics +0, entity counts identical. Vacuous
by construction (a night-only draw at the day census frame draws nothing) — the probe is the gate.

**Probe — `probes/probe-biolum.mjs` (new, promoted).** Diffs PATCHED vs pristine HEAD at the SAME frozen frame
(waveT pinned to 12.3, every mover cleared per tramwire's law), sampling the water hexes that touch a beach hex
(the surf hosts, found in-page) with ROAD as the zero control. seeds 7/42: **SURF changed 0.24% / 0.51% at NIGHT →
0.00% / 0.00% in DAY** (gate off → byte-identical), **ROAD control ~0** both frames. So the glow appears only at
night and only on the surf line. **PASS.**

**Visual.** `probes/shot-biolum.mjs` (new; takes seed/warp/**scale**) camera-zooms a front-of-frame beach that
touches open water, clipping night + a day control. **This vector cost SIX tuning rounds** — see findings; the
short version is that a per-edge *stroke* reads as a continuous neon tube on straight coasts however dim, and a
pale aqua blows to near-white where adjacent hexes' strokes stack. The design that finally passed is **scattered
soft DOTS in a deep sea-green**. At a moderate ~4.3x zoom (the scale a user actually looks at the coast) both seeds
read as soft, tasteful, patchy phosphorescence on the waterline, no blowout: seed 42 & seed 7 one agent each,
both **VISUAL: PASS**. Whole-city `wide` night (seed 42): balanced coherent coast, lit core → dark rim, the sparks
correctly sub-pixel/no clutter at fit zoom, no tears/floaters/blowout — **VISUAL: PASS**.

**Verdict — DEEPENED.** The breaking surf now sparkles with bioluminescence after dark, a new night life for the
coastline that for the artifact's whole life went dark at the waterline — the Water entry in the run of night
features (moon 135, stars 153, observatory 158). Draw-only, stream + pop flat. Water's Deepen cell gains its next
(17, 25, 51, 65, 72, 113, 123, **159**); Water is no longer stalest (Urban 151 now is).

### Findings for later laps
- **A GLOWING LINE ALONG A HEX EDGE READS AS A NEON TUBE; A GLOWING DOT READS AS A SPARK. For a night ornament on
  the faceted coast, draw DOTS not strokes.** Four straight agent reads FAILed the stroke forms ("uniform neon tube
  tracing the hex edges", "blown-out near-white cores") across every brightness and patchiness I tried; switching
  to sparse hash-gated dots passed both seeds on the first try. A per-edge stroke on a straight coast joins with its
  neighbours into a continuous bright outline that exposes the hex geometry — no alpha low enough to fix it stays
  visible. Dots can't form a line, so they never trace the geometry. **When a per-edge draw keeps reading as an
  outline, stop tuning its brightness and change its SHAPE to points.**
- **EMITTED LIGHT THAT STACKS MUST HAVE A LOW RED CHANNEL, OR IT BLOWS TO WHITE.** A pale aqua (`rgba(178,255,228)`,
  R=178) over dark water goes near-white where two strokes overlap (additive coverage → the light stroke colour). A
  deep sea-green (R=66) stays green at any coverage because the red channel never climbs. For any additive glow that
  can overlap itself (coast corners, dense edges), pick the colour by its **darkest** channel, not its hue.
- **THE "GOOD WINDOW" OF A SUBTLE COAST DETAIL IS A MODERATE ZOOM, NOT FIT AND NOT EXTREME.** At fit zoom the glow is
  correctly invisible (adds nothing, clutters nothing — whole-city PASS); at a punishing 7x the closest corner hexes
  stack into bright bars; at ~4x (the natural "look at the coast" zoom) it reads as intended. Judge a coast ornament
  at the zoom a user would actually use to see the coast — `shot-biolum.mjs` now takes a `scale` arg for exactly
  this. A 7x FAIL on a feature that's clean at fit and lovely at 4x is the zoom being unfair, not the feature.
- **`probe-biolum` re-confirms tramwire's law and adds one:** clear EVERY mover before a whole-frame two-load diff,
  AND if you dim a feature to fix a look, re-run the probe — a deep-green + low-alpha pass dropped seed 7's night
  signal to 0.05% (below its own ROAD noise) before I raised it back; a look-fix can silently kill the measurement.

## Iteration 160 — terraced row houses don't fit a hex city (2026-07-11) [Urban fabric × Connect]

**Vector.** Urban fabric × **Connect** (EXPLORED → REVERTED). Rotation named the stalest domain, **Urban**
(last SHIP 151); the kind chose **Connect** (Urban's under-used cell — 47, 109) deliberately to break both the
hot **Deepen** streak (155/158/159) and the five-iteration **night** run — a daytime fabric feature.

**Idea.** Extend 109's celebrated MID "street wall" — adjacent walk-ups grow their body into the E-W gap to form
a continuous terrace at ZERO extra fills (grow the body, don't add a prism) — to **RES**: a modest inner house
(v<0.55, so below the pool/palm bands) whose EAST neighbour is also a modest RES grows east (jx 0.20, ab 0.30→0.50)
so their party walls butt into a terraced row, the pitched roof kept per-house so the roofline stays countable.
Shared `resTerrace(c,x,y)` predicate (one definition, read by both the draw and a new `__terr` locator), keyed on
the EAST cell's hash so both sides agree; draw-only (hashCell, no rng()/terrain).

**What passed.** Census PASS (draw-only, vacuous — greenRoofs +1 chaotic wobble). `probe-terrace.mjs` (patched vs
pristine HEAD, frozen day frame, movers cleared) confirmed the MECHANISM works on the pairs that exist: terraced
pairs FILL 46–53% of the party-wall gap strip, control (rejected candidates) ~0.4–0.6% — 2/2 seeds. The join is
correct; it just has almost nothing to join.

**Why REVERTED — the host doesn't exist at scale.** City-wide count (seeds 7/42/1234): RES = 275/299/301, but only
**37/43/49 have an E-W RES neighbour at all**, of which **5/5/11 terrace, and ZERO seeds form a run of ≥3 houses.**
RES on this hex grid is predominantly **detached** — houses sit one-per-hex separated by roads and gaps, so there
is no dense E-W residential fabric to weave (unlike MID, which clusters along arterials, which is exactly why 109
worked there). The zoomed shot showed the second, deeper reason: **RES bodies are HEX PRISMS filling a hex tile**,
so "grow east 0.20" merely widens a hexagon — it never reads as the rectangular shared-wall terrace the mechanism
assumes. Net effect: a handful of invisible, isolated joined pairs, not a connected street. A passing census + a
passing probe, correctly overturned by the "does it read city-wide" bar.

**Verdict — EXPLORED → REVERTED.** `solvista.html` byte-identical to HEAD (`git checkout`); the `resTerrace`
helper, the `__terr` hook, `probe-terrace.mjs`, and `shot-terrace.mjs` all removed. Urban's Connect cell is
*attempted* (~~160~~), not filled; last real Urban ship is still 109.

### Findings for later laps
- **CHECK HOST ADJACENCY, NOT JUST HOST COUNT, BEFORE A CONNECT VECTOR (the dead-code-renders-zero law's adjacency
  corollary, 30/107).** The census tile histogram said RES≈290 — abundant — but a "join your neighbour" feature
  needs the neighbours to BE adjacent at scale, and only ~15% of RES have an E-W RES neighbour, 0% in runs of 3+.
  A Connect that weaves a fabric needs that fabric to be woven-able: measure adjacency (a 10-line `__terr`-style
  count) BEFORE designing, the same discipline as censusing a host tile before wiring to it.
- **109'S STREET-WALL TRICK IS MID-SPECIFIC, NOT A GENERAL RES/COM MOVE.** It works because MID clusters densely
  along arterials AND is a flat-topped rectangular block whose bodies genuinely butt. RES is neither (detached,
  hex-prism-roofed). Don't re-try RES terracing; the answer is a measured no.
- **Urban × Connect remains genuinely open (last real ship 109).** A future attempt should target a fabric that IS
  dense and linear — e.g. a continuous shopfront canopy/arcade along a COM high street (`c.hstr` from iter 118
  already marks retail runs) — but only after measuring that COM clusters E-W in runs, which RES does not.

## Iteration 161 — cloud bellies catch the golden hour (2026-07-11) [Sky & atmosphere × Deepen]

**Vector.** Sky × Deepen. Sky was the stalest domain (last vector 153) and its additive/CA cells are traps
(surveyed 103; sky isn't cellular). The clouds are richly deepened (rain shafts, wet trails, rainbows, drifting
shade) but the puffs themselves are drawn **pure white regardless of the light** — at dawn/dusk the warm horizon
that colours the whole sky never touches them. That is the classic golden-hour tell: a low sun lights cloud
**undersides** warm while the tops stay bright. A draw-only Deepen that adds no element and reads the light the
rest of the scene already reads.

**Change.** In the cloud loop (render, ~L5758) compute once per frame `cwarm=clamp((skyBot.R-skyBot.B-70)/70,0,1)`
from `dl.skyBot` — the horizon colour is orange at dawn/dusk (R≫B), pale at noon, cool-purple at night, so `R-B`
picks out the low-sun glow **and nothing else** (noon and night both give cwarm≈0). The two lower ("belly") puffs
of a **fair** cloud are then filled toward `skyBot` by `cwarm*0.55` instead of white; the top crown puff and rain
clouds (grey belly) are untouched. Pure draw-only: no terrain, no `rng()`, no new entity — pop/stream neutral.

**Census.** PASS, vacuous as expected — every metric +0, tile histogram empty (draw-only). Regression guard only.

**Probe.** `probes/probe-cloudwarm.mjs` — build-vs-build **sky-band diff** (patched vs pristine HEAD, same seed,
`playing=false`, same frozen `dayT`). The two builds run identical code except the belly tint, so any pixel that
differs IS a belly pixel; a residual is that the pre-freeze load drifts entities slightly differently per load, but
**drift is directionally balanced (warm px ≈ cool px) while the tint shifts pixels consistently WARM**, so the
discriminators are directional. Result over seeds 7/42/1234: **dusk mean Δ(R-B) +11.6, warm px 4095 ≫ cool px 1401**
(≈3:1); **noon control mean +1.2, warm 1394 ≈ cool 1340** (drift only). The tint is warm-only and dusk-only.
(Getting here cost two dead ends the probe file documents: a world→screen box missed the belly puffs — they sit at
`cx±14s`, either side of a naive centre box — and a whole-frame count control was polluted by ground-traffic drift;
a **loud-red belly** test confirmed the draw renders correctly and it was the *sampling* that was wrong. Law below.)

**Visual.** Two dusk seeds, whole-city. **Seed 42 PASS** — belly reads clearly peach/gold under a whiter top,
"natural golden-hour underlighting, not dirt"; the one grey cloud stays grey (by design); no tears/floaters/blowout.
**Seed 7** an agent FAILed as "cool grey bellies" — but the visible clouds there sit HIGH against the *cool* upper
sky (skyTop), so the real, measured warm shift (probe: seed 7 was the *strongest*, +18.2) composites over a cool
base and reads neutral-grey rather than gold. A moderate-zoom crop confirmed: gentle, non-garish, present but subtle
where the ambient sky is cool. The effect is by-design mild — a golden-hour touch, not a repaint.

**Verdict — DEEPENED.** Sky reads the light on one more surface; draw-only, pop/stream-neutral, probe-gated.

### Findings for later laps
- **CLOUD BELLIES ARE THE SEAM: puffs were painted a fixed white while the sky around them was fully lit.** Look for
  other *emissive/reflective* draws that ignore `dl`/`TINT` — anything drawn with a hardcoded `rgb(...)` in the sky
  or on water that should catch dawn/dusk. `dl.skyBot` is the ready-made "how warm is the horizon right now" signal:
  `clamp((R-B-70)/70,0,1)` is a reusable golden-hour gate (0 at noon AND night, peak at dawn/dusk).
- **A build-vs-build pixel probe that LOCATES by boxing world→screen coords will fight the camera transform and the
  puff geometry; a WHOLE/BAND DIFF locates by construction** — the only pixels that can differ ARE your change, so
  diff finds them. When the diff is polluted by pre-freeze entity drift, don't chase determinism: **drift is
  directionally balanced, a directional signal (warm-vs-cool split, or signed mean) separates cleanly.** And when a
  subtle draw-change reads as zero in a probe, force it LOUD (pure red) first to prove the draw path before trusting
  the sampler (cost me two dead ends this lap).
- **A physically-plausible ambient effect will read differently by where its host sits** — the same warm belly is
  gold over a warm sky (seed 42) and neutral-grey over a cool upper sky (seed 7). That is correct, not a bug; the
  probe (not the agent) is the verdict for "did the warmth apply." Don't crank the strength to force every cloud
  gold — seed 42's agent already warned the current strength is at the "natural, not dirty" edge.

## Iteration 162 — the twelfth step-back finds a clean city, perf flat (2026-07-11) [holistic step-back]

**Vector.** The mandated holistic step-back (105/110/115/120/125/130/136/142/147/152/157/**162**). Not a domain ×
kind lap: it reads the WHOLE city for *cumulative* drift the census and per-feature gates are blind to, runs the
season probe + interleaved perf gate, at night AND a season with the day/night baselines pinned OFF January
(`year=2035.62` dry peak; `2035.02` as the seasonal-contrast frame). No city vector taken, so rotation is
unchanged — the next lap (163) owes the stalest domain, **People (154)**, then Transport (155).

**What was read.** Un-zoomed whole-city `wide` frames at **2 seeds × 3 lights/calendars** — seed 42 (warp 61) &
seed 7 (warp 31), each at {day 2035.62/t=0.35, night 2035.62/t=0.90, winter 2035.02/t=0.35}. One subagent per
seed read its own three frames: the cumulative question ("has anything compounded into clutter or darkness?")
plus 108's **locate-don't-judge** night test ("where is the core by light alone?").

**Result: the city is healthy — both agents VISUAL: PASS.**
- **Night core (115/143) LOCATED off-centre both seeds** — seed 42 ~(0.48,0.53) (agent range x0.45–0.52,
  y0.45–0.62), seed 7 ~(0.45,0.62) — matching 157 ((.48,.52)/(.48,.60)), 152, 147, each with a genuine
  core→edge falloff to a dark rim, not a flat wash. Both agents named a secondary lit lobe too (42's river
  pocket ~(.44,.78) + a north cluster ~(.42,.22); 7's north cluster ~(.55,.23) + the lit pier ~(.85,.55)).
- **158's observatory, 159's surf biolum and 161's warm cloud bellies all sit correctly** in the whole frame;
  138's arterial night-corridors read as continuous warm ribbons distinct from dim side streets both seeds; the
  sea reads (116's bottom + 123's founded wind farm). **No z-order tears / floaters / hard seams / blown-out
  white** in any of the 6 frames. **Winter reads distinct** from summer at both seeds (cooler/duller vegetation,
  cooler flatter light, cooler ocean) — mildest of the three deltas at seed 42, clearer at seed 7, by-design
  (120's evergreen/irrigated dilution).

**Season — measured alive.** `probes/probe-season.mjs`: FARM winter→dry-peak **88.4** (matches
130/136/142/147/152/157), VINEYARD 44.6/36.7/42.7 (139), FOREST 20.1/19.5/24.4 (156's spring understory + canopy
shift both read), ORCHARD 25.3/17.8/41.4, MEADOW/SHOREPARK all move, PARK/REDWOOD/GARDEN/QUAD near-zero by design
(120), ROAD control **0.5–2.1**. Calendar working; the whole-frame mildness is the by-design dilution, not a dead
calendar.

**Perf — 157→161 cost ~ZERO; the stored-baseline read fired its SEVENTH+ false-FAIL.** `perf.mjs` vs stored
baseline read day **+5.9%** / night **+11.3%**, looking like a regression. Interleaved HEAD-161 vs the iter-157
file (`ae93fd4`, A/B/A/B, **min per variant**): day **35.00 vs 35.05** (**−0.1%, flat**) and night **41.45 vs
41.00** (**+1.1%, small**). So 158 (observatory dome, day+night draw) + 159 (surf biolum, night-only) + 161 (warm
cloud bellies, day-only, ~0 at night) added ~nothing measurable; the +1.1% night is 158's dome + 159's biolum
landing at night, well inside budget (night >30fps ~49–52%, ≈50fps). NOT re-pinned. **The day column was UNUSUALLY
steady this run** — all four day reads clustered 35.0–35.3ms (contrast 157's ±9ms swing), so the day delta is
trustworthy here; night was steady as always. Census PASS, vacuous (no source edit); tree verified clean after
the interleave restored HEAD.

**Change (the step-back's product — none to the city).** No compounding defect, so per 120/130/136/142/147/152/157
("a clean step-back is a complete iteration — don't force a filler vector") the output is the health record +
header refreshes: step-back pointer 157→162 (next 167), the seventh clean bill, and the 162 interleaved perf
reading. No `solvista.html` edit.

**Verdict — FIXED.** No compounding city defect — the SEVENTH clean step-back in a row (130, 136, 142, 147, 152,
157, 162). All accumulated visual laws (115/116/120/123 + 138 arterials + 143 CBD peak) still read at both seeds
under all three lights; the season is alive (156's understory shows in FOREST, 139's vineyard moving); perf is
flat against the honest interleaved control.

### Findings
- **SEVENTH CONSECUTIVE CLEAN STEP-BACK, and the stored-baseline false-FAIL is now a habit — trust ONLY the
  interleave.** The stored baseline (day 33.16 / night 37.33, pinned 2026-07-10) read +5.9% day / +11.3% night on
  a diff the interleave proves flat/tiny; the 5-day-old iter-157 file reads the same inflated numbers today. The
  pattern is now 125→130→136→142→147→152→157→162. Re-pin only if an interleave *itself* shows a persistent offset
  (it has not since 142's real +2.2%).
- **The day column is USUALLY the noisy one, but not this run — check the round-to-round spread before trusting a
  day delta.** 157 saw the identical HEAD bytes read 43.2 then 37.7ms (a 15% load swing); 162's four day reads all
  landed 35.0–35.3ms, so the −0.1% day delta is real, not luck. The lesson stands (grade day by min-of-≥2-rounds),
  but "day is always ±9ms" is not a law — measure the spread, don't assume it.
- **Night is the accumulating column, and it accumulates SLOWLY — three night-drawing features across five
  iterations (158 dome + 159 biolum) cost +1.1%.** Every night-only draw (per-window glow 118, arterial lamps 138,
  stars 153, biolum 159, dome 158) lands on night alone, so night is where the loop's draw work quietly compounds.
  +1.1% over 5 iters is fine, but this is the column a future step-back should watch first.

## Iteration 163 — the standing crowds sit down on the pavement (2026-07-11) [People & activity × Polish]

**Vector.** People & activity × **Polish** (SHIPPED). Rotation named the domain (after the 162 step-back the lap
owed the stalest, **People**, last SHIP 154). Kind broke the hot **Deepen** streak (155/158/159/161) to **Polish** —
and cashed a banked, *named* People finding: iter 137 gave the WALKING figures (peds/dogs/joggers) the house-style
`shadS` contact shadow and explicitly banked that *"only the static standing crowds still cast no shadow."* This
closes that gap. A banked finding outranks kind-rotation (the header's own law).

**The seam.** Four static "crowd" draws render little standing figures with a body `fillRect` + an `ink` head arc
and **no `shadS`** — so they float a hair above the ground while every ped, dog, jogger and vehicle around them is
seated on a contact smudge. Two stand on the GROUND: the **evening strip crowd** on COM (`L4319`, gated
`LITAMT>0.35 && v>0.6`, 86 host tiles/city) and the **school-run drop-off crowd** at the gate (`L4664`, gated
`dayT` in (0.15,0.30)). The other two were left by design: the **platform queue** stands on an ELEVATED deck (a
ground-contact ellipse doesn't apply) and the **match-day concourse** is abstract 1.2px dots, not figures.

**Change (~5 lines, draw-only).** One `shadS(...)` at each ground-crowd figure's FEET, drawn *before* the body so
the figure reads on top — exactly 137's idiom. Strip: `shadS(cx+ox,cy+oy-0.5,0.09,0.16)` (feet = body bottom).
School: `shadS(px4,py4,kid?0.06:0.09,kid?0.15:0.16)` — kids get the smaller smudge (137's kid-shadow radius). No
tile, entity, `rng()`, `hashCell` spawn, `tick()` pass or terrain; strings pure-ASCII (134). Stream + pop provably
flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram empty, core metrics +0 (`towerHt -1` documented chaotic
wobble). Vacuous by construction — the probe is the gate.

**Probe — `probes/probe-crowdshadow.mjs` (new, promoted).** Whole-frame build-vs-build diff (iter 161's
locate-by-construction), patched vs pristine HEAD, at three frozen frames (strip-evening `dayT`=0.88, school-morning
0.22, midday control 0.45). Getting a clean night diff took **three determinism fixes**, all findings below: (1) the
pre-freeze RAF loop runs a load-timing-dependent number of `tick()`s that flip 2035 development cells DIFFERENTLY
per load, swamping the shadow — so the probe *rebuilds* the city in-page (`genWorld(seed)+__warp(61)`, identical code
both builds → byte-identical cities) rather than trusting the loaded state; (2) the 70-star field (`STARS`, iter
153) is built once at load with UNSEEDED `Math.random`, so it differs per load — cleared; (3) any residual draw-time
`Math.random` stubbed to a constant. A shadow can only DARKEN, so the diff counts darker vs lighter px (161's
directional law). Result seeds 7/42: **strip GATE darker 234/206 px, lighter 0/0** (a pure directional shadow),
**midday control flat** (0-3 darker / 0-7 lighter). The SCHOOL crowd is genuinely below the whole-frame noise floor
(4 schools, a narrow window — its pooled darker/lighter FLIPS run to run, 16/4 then 19/37), so it is **not gated
numerically** — same `shadS` idiom, confirmed in daylight by the visual shot. **PROBE PASS.** A LOUD-red test
(iter 161's law) first proved the draw path executes (2177 red px vs HEAD 0) after a sampler bug (a 3-arg call to a
4-arg `frame()` had made both builds render identical garbage → a false 0) — the loud frame located it in one run.

**Visual.** `probes/probe-crowdshot.mjs` (new) shoots before/after (HEAD vs patched) clips at identical framing
(same deterministic rebuild). Whole-city `wide` frames (dusk seed 42, morning seed 7): both agents **VISUAL: PASS** —
balanced coherent coastal city, lit core→dark rim, no z-order tears / floaters / blown-out color, nothing
compounded. Both agents could NOT resolve the ~2px contact shadow itself at crop scale (it is sub-resolution in a
static screenshot, as any contact shadow is) — which is precisely the case the skill says a probe settles, and the
probe does (234/0). The shadow is the *identical* `shadS` call peds/dogs/vehicles have used since 137, at the same
alpha and the feet, so its appearance is inherited from those already-shipped shadows; the agents' job here was
whole-frame coherence, which passed.

**Verdict — SHIPPED.** The evening strip crowd and the school-run drop-off crowd now sit on the pavement on a
contact shadow, where for the artifact's whole life they floated — every figure in the city is finally grounded
(137 did the movers; 163 does the static crowds). Draw-only, stream + pop flat, ~5 lines + two probes. People ×
Polish gains its next (84, 137, **163**); People is no longer stalest (Transport 155 now is).

### Findings for later laps
- **A WHOLE-FRAME NIGHT build-vs-build diff is polluted by the UNSEEDED `STARS` field (built once at load) — clear
  `STARS` (and stub `Math.random`) for a deterministic night diff.** 161's whole-frame law assumed daytime; at night
  the 70 randomly-placed stars differ per load and read as ~500 changed px at high amplitude, dwarfing a faint
  ground change. `STARS.length=0` before render kills it. Any future NIGHT whole-frame probe must do this.
- **Don't trust the LOADED city for a build-vs-build diff — REBUILD it in-page (`genWorld(seed)+__warp(N)`).** The
  RAF loop runs a wall-clock-dependent number of `tick()`s between load and freeze, and at a developed era (2035)
  each tick flips upgrade/succession cells, so the two loads render *different cities* even at the same seed. Calling
  `genWorld` (which reseeds `rng=mulberry32(seed)`) + `__warp` reproduces a byte-identical city regardless of load
  timing. This is the fix for the class of nondeterminism 137/154 flagged as "the live system is non-reproducible" —
  for anything DETERMINISTIC (terrain, hashCell draws) you *can* get a clean diff, you just have to rebuild.
- **Gate a probe on the STRONG instance; report a SPARSE one directionally, don't gate it.** The strip crowd (86
  tiles) gives a rock-solid signal; the school crowd (4 tiles) sits at the noise floor and its signed/pooled count
  flips sign run to run. Forcing a numeric gate on the sparse instance would be grading noise. Gate the strong one,
  confirm the sparse one shares the identical code path + a visual, and say so.
- **A contact shadow / sub-2px feature is below AGENT SCREENSHOT RESOLUTION — the probe is authoritative, the agent
  does coherence (137's precedent, restated).** Two blind agents FAILed "can't see the shadow"; that is a resolution
  limit, not a defect, and the probe (which CAN measure 2px) is the verdict. Frame the agent's job as the whole-city
  coherence check, not "spot the 2px smudge."
- **Still shadowless BY DESIGN:** the elevated **platform queue** (riders on a deck, not ground — a ground ellipse
  would spill) and the abstract **match-day concourse** dots (1.2px marks, not figures). If a future lap wants the
  platform riders grounded, the shadow must land on the DECK surface (its own small ellipse), not the ground plane.

## Iteration 164 — the city hails a cab (2026-07-11) [Transport × New element]

**Vector.** Transport × **New element** (SHIPPED). Rotation named the domain — after 163 (People) the lap owed the
stalest, **Transport** (last SHIP 155, a Deepen). Kind broke Transport's long **Deepen** run (55/63/112/121/128/155)
and its recent Polish (146): its **New element** cell was the stalest of all (last was iter 48). The bar 118/127 set —
*a saturated domain can still take a New element on an untouched **surface***, and *prefer draw-only / Math.random for
a guaranteed-flat pop* — is met here: taxis are a draw-only variety layered on the existing car entity, no new array,
no rng().

**The seam.** `drawVehicle` (`L5128`) draws every car as the same coloured prism; the fleet spawns in `syncFleet`
(`L2166`) as `kind:'car'` with a `CARCOLS` colour. No taxi existed (grepped: no `taxi`/`cab`/`checker`). A taxi is the
one everyday road vehicle the city was missing, and it reads at a glance by three cues: a lemon-yellow body, a checker
band, and a lit roof sign.

**Change (draw-only + a Math.random flag).**
- Palette: added `cab:[247,203,55]` — a brighter, greener lemon-yellow than the orange `gold` the buses wear, so a
  cab separates from a bus at a glance (bus G≈161 vs cab G≈203).
- Spawn: `taxi:kind==='car'&&Math.random()<0.17` — ~1 in 6 cars. **`Math.random`, not `rng()`**, and inserted between
  `kind` and the `c:` property so the seeded `rng()` call ORDER is byte-identical (the `c:` expression still consumes
  its `CARCOLS` draw for every car). The CA is untouched whether a car is a cab or not.
- Draw: a `bc=v.taxi?'cab':v.c` body colour (a cab wears yellow whatever colour it drew), a checker band (alternating
  ink/cream `fillRect`s along the flank, like the truck's stripe), a small roof-sign prism, and an amber roof-sign
  glow at `LITAMT>0.3` (after dark). Taxis still get the shared headlights/taillights (they fall through as cars).
- Hover: the vehicle pick names a `taxi` **Taxi — "For hire — flag it down."** (else the existing `VKIND`/`Car`).

**Census.** Vacuous by construction (draw-only + Math.random): every metric +0, empty tile histogram, cars 360
unchanged (taxis are a subset). VERDICT PASS. (The `pop -4` wobble is RAF-timing tick-count noise, 163's law — the
change touches no `rng()`.)

**Probe.** `probes/probe-taxi.mjs` — 137's controlled placement + 163's in-page rebuild (`genWorld(seed)+__warp(61)`
so HEAD and ART render a byte-identical city). Two scenes, each placing identical teal cars at 40 spread ROAD cells:
a `taxi:true` scene diffs vs HEAD (the flag recolours the body + adds checker+sign), and a `taxi:false` control scene
diffs vs HEAD (car draw is identical code → ~0, and *separate* from the taxi scene so no neighbouring cab bleeds in).
**taxi box 3.2% of pixels changed vs HEAD · plain-car control 0.00–0.16% (<0.5%, >10x under).** PASS both seeds. The
in-page rebuild was load-bearing: without it the two page loads render slightly different cities (RAF tick drift) and
the control jittered to 0.35% and failed — 163's rebuild law collapsed it to ~0.

**Visual.** Two agents, both **PASS**. Seed 7 & 42 downtown (day): located 3+ lemon-yellow cabs sitting correctly ON
the road hexes, distinct from the orange-gold buses, checker band + roof sign visible, no floating/tearing. Whole-city
(seed 7) reads balanced — yellow stays sparse (a few cabs + existing crop fields), not dominant. Night: the cabs are a
few dark pixels at fit zoom so the amber roof-glow was unverifiable by eye (a resolution limit, not a defect — the
probe confirms the draw path fires; cf. 163's sub-2px agent-resolution law).

**Verdict.** SHIPPED. **Banked for Transport:** the New element cell is spent again; the domain's live vehicle inventory
(car/bus/tram/truck/bike/taxi + service fleet) is now full, so its next lap is Deepen/Polish/Connect, not another kind
of vehicle. A cab could later *deepen* (pick up/drop peds at a kerb) but that hits the `peds`-can't-serve-the-road cap
(111) — it would need the spawn-pool move, not the leash.
