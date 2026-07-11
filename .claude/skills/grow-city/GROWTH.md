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
| **Nature** | 4, 26, 29, 102, **156**, **174** | 1, 13, 60 | 37, 46, 67, 76, **108**, **120**, **139**, **166** | ~~46~~, ~~88~~, ~~101~~ | U4 | 53, 96 | **117**, **129**, **148** |
| **Water & coast** | 6, 10, 12, 16, 20, 33, 106, **169** | 90 | 17, 25, 51, 65, 72, **113**, **123**, **159** | 22 | | U2, 44, 58, 79, **116**, **132**, **150** | **97**, **141**, **176** |
| **Urban fabric** | 32, 62 | 7, 23, ~~82~~, **151** | 38, 54, 68, 92, **165**, **173** | 47, **109**, ~~**160**~~ | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103**, **110**, **118**, **124**, **143** | **133** |
| **Transport** | 2, 9, 21, 31, 48, **164** | 77 | 28, 39, 55, 63, **112**, **121**, **128**, **155** | 5, 15, **138** | U4 | U1, U3, 70, 85, 87, 94, **146** | **105**, **171** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107** | 36, 59, 66, 80, 91, **149**, **158**, **175** | 45 | | 73, ~~**114**~~, **168** | 52, 122, **140** |
| **Sky & atmosphere** | 27, 43 | | 19, 35, 50, 57, 95, **135**, **153**, **161** | | | 61, 81, 89, **115** | ~~**134**~~, **144** |
| **People & activity** | 41, 56, **127**, **170** | 49 | 34, 64, 93, **104**, **119**, **145** | 78, **111** | | 84, **137**, **163** | 71, **154** |

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
  Sky **161** · People **170** · Transport **171** · Urban **173** · Nature **174** · Civic **175** · Water **176**. (162, **167**, **172**, **177** = step-backs, no domain lap.)
  **Stalest by number is Sky (161), but Sky is post-saturation (Deepen/Fix ONLY — additive/CA cells are traps). 173 took Urban × Deepen (the warehouse north-light clerestory — closing the roof-furniture set city-wide; see below), so the next domain lap (174) owes Nature (166)/Civic (168)**, then Water (169)/People (170)/Transport (171). **174 took Nature × New element (rolled hay bales dot the stubble fields in the weeks after the harvest cut — golden `straw`/`stubble` rolls scattered by `hashCell` when a FARM's per-cell `ph` is in the post-cut window 0.82–0.95, extending the farm's own crop calendar per 127's surface-not-entities law; draw-only stream+pop-neutral; `probe-haybale` FARM 1.8–2.1% at harvest → 0.000% in summer, ROAD ctl ~0). **175 took Civic × Deepen (the parliament floodlights its facade — a warm uplight wash up the colonnade at night, matching the museum's dusk floodlight; the grander "tallest civic roof" only lit its dome/lantern while the museum lit its facade — the banked 168 Civic Deepen candidate; draw-only stream+pop-neutral, `probe-parliament` FACADE 24–38% at night → 0.00% day, ROAD ctl ~0, 5 seeds; joins the night-mood run moon/stars/observatory/biolum/amphitheater). **176 took Water × Interaction/UX (the river names its course — a `Course — N hexes` row via a bridge-AWARE flood `riverCourse` so a span doesn't fragment the reach; the river was the barest tooltip in the city, zero data rows over its richest water system; a `Crossings` companion was DROPPED — bridge cells over-count vs connected components and the L1633 pave-over rule makes the unit ambiguous; draw-nothing tooltip, pop+stream flat, `probe-river` 254 river hexes named 3 seeds, sea control clean 1916 hexes, sea-leak 0). So the next domain lap (178) owes People (170)/Transport (171).** 171 took Transport × Interaction/UX (the boulevards name themselves, `probe-boulevard`); 170 took People × New element (the pier's day-only anglers, `probe-anglers`). **177 was the mandated STEP-BACK — TENTH clean bill in a row (perf 173→176 flat: day −0.2% / night +0.3% vs iter-172 `3d0e876`; seasons alive FARM dry-peak 87.6; night core located off-centre both seeds ~(.48,.50)/(.53,.60)). No city change.** Next step-back at **182**. **Urban is measured-saturated now: additive spent (118), Connect measured-hard TWICE (160 RES terracing, 165 high-street arcade — the `hstr` parade zigzags with parity, longest straight-hex-axis run = 2, so it is not a clean arcade host); Urban's next lap is Deepen/Polish only** (or a COM arcade if a *straight-hex-axis* retail run is ever found — the parade is not one). Roof-furniture is now CLOSED city-wide across all 5 developed types (MID/RES water tanks, TOWER gardens, COM plant 165, IND warehouse north-light clerestory 173) — no bare roof left, so a future Urban "bare roof" vector has no host; Urban Deepen must go elsewhere (facades, ground plane, harbour apron). Check the last entry of the stalest domain for a banked
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
  **Iteration 182 is the next holistic step-back** (105, 110, 115, 120, 125, 130, 136, **142**, **147**, **152**, **157**, **162 done**, **167 done**, **172 done**, **177 done**, …).
  Shoot it **at night AND a season, and PIN THE DAY FRAME OFF JANUARY** (`year=2035.62` dry-peak baselines +
  `2035.02` as the seasonal-contrast frame — a default `?warp=61` frame is already ~winter; SKILL.md holds
  the full recipe). **130, 136, 142, 147, 152, 157, 162, 167, 172 AND 177 all found NO compounding city defect** (TEN clean bills in a row, the
  honest step-back outcome, no city change): both seeds PASS day/night/season, agents *located* the night core
  off-centre by light alone (177: (.48,.50) / (.53,.60), matching 172's (.47,.55)/(.45,.62), 167's (.47,.50)/(.50,.62) & 162's (.48,.53)/(.45,.62); 115/143's lighting holds), 138's
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
  **⚠ Iteration 182 is the next holistic STEP-BACK** (…/**157**/**162 done**/**167 done**/**172 done**/**177 done**/**182**) — not a domain lap; see the recipe
  below (night + season, day frame off January, interleaved perf). **162 was the mandated step-back (SEVENTH clean bill,
  perf 157→161 flat day / +1.1% night, seasons alive, night core located both seeds). 163 took People × Polish
  (static-crowd contact shadows, closing 137); 164 took Transport × New element (the taxi — a `Math.random`-flagged
  lemon-yellow cab variety on the car entity).** **165 took Urban × Deepen (COM rooftop mechanical plant); 166 took Nature × Deepen (AUTUMN LEAF LITTER on the FOREST floor — the season-complement of 156's spring bloom, `autumnFall()` centred on the same s≈0.87 the canopy ambers on, draw-only stream+pop-neutral; `probe-autumnfall` FOREST 11.8/11.4% autumn → 0/0 summer — the forest floor now keeps a full four-season calendar). 167 was the mandated STEP-BACK (clean); 168 owes Civic (158).** **155 took Transport × Deepen (the tram catenary, the
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

> **Archive:** the 170 entries before Iteration 168 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

## Iteration 168 — the amphitheater's stage gets its concert (2026-07-11) [Civic & culture × Polish]

**Vector.** Civic & culture × **Polish** (SHIPPED). Rotation named the domain — after the 167 step-back the lap
owed the stalest domain, **Civic** (last SHIP 158). Kind varied OFF Deepen deliberately: Deepen has run hot
globally (155/158/159/165/166 all Deepen), and Civic's own last kind was Deepen (158). **Polish** is Civic's most
under-used cell (last 73; 114 reverted) and globally cold (last Polish 163). Content fits the night-mood run the
last laps built (moon 135, stars 153, observatory 158, biolum surf 159).

**The seam.** `case 'amphitheater'` (L4745) lit an EMPTY stage at showtime — a warm wash ellipse + 3 footlight
dots under `if(LITAMT>0.3)` — while its own `CIVICDESC` promised *"An open-air bowl beside the parks. Concerts
through the summer."* A label asserting a performance the pixels never showed: the same asserts-more-than-it-draws
tell that has paid seven times (117/122/129/148/158…), here in its **Polish** form — make the existing draw read
as what its label already claims. Amphitheater is 1/city, sited from 2004 (present in the 2035 census slices), a
zoom-reward landmark like the observatory (158) and hall clock (149) — census tile histogram confirms 1/city.

**Change (~14 lines, draw-only).** Inside the existing `LITAMT>0.3` showtime block: a soft warm **beam** cone
spilling from over the stage onto the apron; a centre-stage **performer** — a lavender body + a warm-lit head —
that **sways** to the music (`sin(time*1.5+x*1.3)`); the warm apron wash and 3 footlights kept. No tile, entity,
`rng()`, `hashCell` spawn, `tick()` pass or terrain; strings pure-ASCII (134). Stream + pop provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram empty, all core metrics +0, entity counts identical.
Vacuous by construction (a night-only draw at the t=0.35 daytime census frame draws nothing) — the probe is the gate.

**Probe — `probes/probe-amphi.mjs` (new, promoted).** Diffs PATCHED vs pristine HEAD at the SAME frozen frame
(`time` pinned, every mover cleared per tramwire's law), camera-zoomed onto the 1/city amphitheater hex so the
stage is unoccluded (obsdome's method), ROAD as the zero control. seeds 42/1234/88: **STAGE changed 8.1–8.25% at
NIGHT → 0.00% in DAY** (gate off → byte-identical), **ROAD ~0** both frames. seeds 3/7 skipped: their
amphitheater is **occluded** behind foreground downtown towers (byte-identical even at night — the draw fires but
is overpainted; verified visually), so unmeasurable here, not a failure. **VERDICT: PASS (3 seeds).**

**Visual.** `probes/shot-amphi.mjs` (new) camera-zooms the amphitheater, night + a day control. seed 42 (mine) &
seed 1234 (agent, blind): the NIGHT frame reads as a soloist under a spotlight — lavender figure, glowing head,
warm beam, footlights, centre-stage on the hex bowl, no float/tear/blowout; the DAY frame an empty stone cavea
(the flat coloured audience specks are the pre-existing `LITAMT<0.75` daytime crowd, untouched) — **VISUAL: PASS**
both. Whole-city `wide` night (seed 42), one agent: balanced coherent coast, lit core (x~0.48,y~0.52, matching
162/167's reads) → dark rim, sea reads, nothing compounded — **VISUAL: PASS**.

**Verdict — SHIPPED.** The amphitheater stage, lit-but-empty for the artifact's whole life, now stages a spotlit
performer at night — honoring the "Concerts through the summer" the label always promised, and adding a Civic
entry to the night-life run. Draw-only, stream + pop flat, ~14 lines + a probe + a shot script. Civic's Polish
cell gains its next (73, ~~114~~, **168**); Civic is no longer stalest (Water 159 now is).

### Findings for later laps
- **THE ASSERTS-MORE-THAN-IT-DRAWS TELL HAS A POLISH FORM, not only Deepen/Interaction.** 117/122/129/148 cashed it
  in *tooltips* (a string vs `describeTile`); 158 cashed a *draw* comment ("open to the night") as a Deepen. 168 is
  the same tell as a **Polish**: `CIVICDESC` (a tooltip string) asserted "Concerts", and the *draw* showed an empty
  lit stage — so making the draw honor the string is a legibility fix, not a new system. Where else does a label
  promise activity the tile draws as empty?
- **A CAMERA-ZOOM PROBE ON A 1/CITY LANDMARK MUST TREAT OCCLUSION AS SKIP, NOT FAIL.** 2 of 5 seeds sited the
  amphitheater where downtown towers overpaint it from the diorama's fixed camera — byte-identical patched-vs-
  pristine even at night. That is the draw firing and being overdrawn, not a defect; the probe skips a
  night≈0 seed and requires ≥2 measurable seeds passing (obsdome's "only seeds with the feature on-screen count").
- **STILL BANKED from 158's draw-tell list:** the firehouse bell (static gold disc, no natural clock tie — weaker)
  and museum/parliament floodlights (the museum already floodlights at dusk; parliament does not). Next Civic
  Deepen candidate; 168 took the Polish path to the same tell instead.

## Iteration 169 — the tideline gets its gulls (2026-07-11) [Water & coast × New element]

**Vector.** Water & coast × **New element** (SHIPPED). Rotation named the stalest domain, **Water** (last SHIP
150; 159 Deepen). Kind varied off 159's Deepen and the recent night-feature run (135/153/158/159) to a **New
element** on a genuinely fresh **surface** — 127's law (saturation is of a domain's *entities*, not its surfaces):
Water's entity list is spent (boats, ferries, freighters, kayaks, herons, surfers, whales, gulls-on-the-ferry-wake),
but **no bird has ever landed** — the damp sand at the waterline had no life at all. A daytime feature, deliberately
breaking the five-lap night streak.

**The seam.** `case T.BEACH` (L3265) already walks every sea-facing hex edge to lay the tide's damp margin and its
tidepools — `edges` (the water-facing vertex pairs), `cx,cy` and the inshore geometry are all in scope. The exact
host for birds standing on the wet band, inshore of the waterline.

**Change (~30 lines + a `drawGull` helper, draw-only).** A `LITAMT<0.58`-gated block after the tidepools scatters a
small group of **1-3 gulls** on the damp margin of beach hexes that face open water, `hashCell`-gated
(`seedNum^0x6011 < 0.32`) so only ~a third of shore stretches hold a group — sparse, irregular, never a wall of
birds. Each gull is `hashCell`-placed along the chosen edge and a little inshore, most facing the sea, one per group
with its head down feeding; a slow `waveT` idle bob. They fade in through the morning and lift off to roost by dusk
(`ga=clamp((0.58-LITAMT)/0.22,0,1)`, the same slow day-clock the beach umbrellas ride, so a daily rhythm not a
strobe). `drawGull` is a side-on herring gull: pale-grey `whiteDk` back, `white` breast/head, `gold` bill+legs,
`ink` wingtip+eye, a `shadS` contact shadow (house style, 137/163). No tile, entity array, `rng()`, `tick()` pass or
terrain; strings pure-ASCII (134). Stream + pop provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram empty, core metrics +0, entity counts identical. Vacuous by
construction (draw-only) — the probe is the gate.

**Probe — `probes/probe-gulls.mjs` (new, promoted).** Diffs PATCHED vs pristine HEAD at the SAME frozen frame
(waveT pinned, every mover cleared, tramwire's law), sampling BEACH hexes that touch non-river WATER (the gull hosts,
found in-page) with ROAD as the zero control. seeds 7/42: **BEACH changed 1.17% / 0.85% in DAY (LITAMT 0.02) → 0.00%
/ 0.00% at NIGHT (LITAMT 1.00, gate off, byte-identical)**; ROAD control ~0 in day (0.22%/0.05% = day-only gulls
bleeding into adjacent coastal-road boxes, correctly →0 at night) and ~0 at night. So the gulls appear only by day
and only on the water-facing beach margin. **PASS.**

**Visual.** The wide `coast` clip made the ~4px gulls borderline — one agent PASS ("borderline, close to noise"),
one FAIL ("can't locate them"). That is biolum's exact lesson (159): a subtle coast ornament must be judged at the
**moderate ~4x zoom a user actually looks at the coast**, not the wide clip. `probes/shot-gulls.mjs` (new; camera-
zooms a front-of-frame beach hex that passes the gull gate, day frame) at 4.6x/6.5x: both seeds read cleanly as
little pale shorebirds standing on the damp margin at the waterline, facing the sea — correct placement, no
floating/clutter (self-verified both seeds). Whole-city `wide` (seed 42): balanced beautiful coast, gulls correctly
sub-pixel/uncluttered at fit zoom, no tears/floaters/blowout — agent **VISUAL: PASS**.

**Verdict — SHIPPED.** The waterline, lifeless for the artifact's whole existence, now has shorebirds standing on
the wet sand by day — the daytime Water counterpart to the recent night-life run. Draw-only, stream + pop flat.
Water's New element cell gains its next (6, 10, 12, 16, 20, 33, 106, **169**); Water is no longer stalest
(Urban 151 now is).

### Findings for later laps
- **A ~4px COAST ORNAMENT IS BORDERLINE AT THE WIDE `coast` CLIP AND CLEAN AT ~4.6x — SHOOT THE MODERATE ZOOM
  FIRST (biolum's law, 159, re-confirmed).** The wide `coast` framing split two agents (one couldn't locate the
  gulls at all); a camera-zoom to the natural ~4.6x coast scale on a hex that *passes the feature's own placement
  gate* resolved them as birds on both seeds. When a small coast feature's probe PASSES but the wide-clip agents
  disagree, the framing is unfair — reframe, don't redesign (the FAIL is a cue to measure/reframe, 120's law).
- **127's SURFACE-NOT-ENTITIES LAW HELD AGAIN for a saturated domain.** Water's *entity* list is spent, but the
  wet sand margin was an untouched *surface* with no life on it. A New element still lands in a saturated domain if
  it targets a surface nothing has drawn on (127 picnics on PARK, 145 the beach's daily rhythm, 169 the tideline).
- **STILL banked for Water (123):** the pier/lifeguard tower are still `rng()`-salted — site them on a depth by
  respending their draws, but VARY 123's site-on-depth mechanism. Untouched still: a New element could also land on
  the marsh's wet edge, or gulls could work the ferry wake as they *land* on the water (currently they only fly).

## Iteration 170 — the pier hails its anglers (2026-07-12) [People & activity × New element]

**Vector.** People & activity × **New element** (SHIPPED). Rotation named the stalest domain, **People** (last SHIP
163, a Polish; the header explicitly owed the 170 lap to People or Transport). Kind varied off 163's Polish and the
globally hot **Deepen** streak (165/166) to a **New element** on a fresh *surface* — 127's law (saturation is of a
domain's *entities*, not its surfaces): People's entity list is full (peds, dogs, joggers, kids, static crowds,
picnics, beach towels/bonfires), but no one had ever **fished**. The pier deck gets strolling peds (openCells push,
L2235; tooltip "Out on the pier for the view") but never a *stationary* activity — anglers are the one iconic pier
figure missing. A daytime feature, deliberately breaking the recent night-feature run.

**The seam.** `drawPierAt` (L2902) draws the boardwalk deck per pier cell; the plain deck (not the snack stall at
`x1-1` nor the ferris wheel at `x1`) had structures but no people fishing. Added the anglers right after the deck
prism, before the stall/wheel blocks.

**Change (~23-line draw + 1-line FIX, all draw-only).** On plain deck cells, gated `LITAMT<0.62` (day) and
`x===pier.x1-2 || hashCell(x,y,seedNum^0x6A1D)<0.45` — the seaward-most eligible cell (over the deepest water, where
people fish) is **guaranteed** an angler so a short pier is never empty, plus hash-driven others for variety. Each
angler: a side-on figure at deck height (z5), a `trunk` rod angling out over the water, a `whiteDk` line dropping to
a `coral` float on the sea, a `shadS` contact shadow (house style, 137/163), body colour `hashCell`-picked from
teal/stone/terra, day fade `aa=clamp((0.62-LITAMT)/0.24,0,1)` on the same slow day-clock as the beach umbrellas/gulls
(a rhythm, not a strobe). No tile, entity array, `rng()`, `tick()` pass or terrain; strings pure-ASCII (134). Stream
+ pop provably flat.

**Bundled FIX (1 line).** `drawPierAt` was only called from the **WATER and BEACH** switch cases, so where a pier
crosses **KELP** cells (seed 7: 2 of its 3 eligible deck cells are kelp) the deck **vanished into a gap** — a latent
bug the artifact carried for its whole life. Added `if(pierAt(x,y))drawPierAt(x,y)` to the `T.KELP` case (kelp draws
first, deck on top — same z-order as water/beach). This closes the gap AND is what lets the anglers site robustly
across seeds (without it, seed 7's guaranteed cell was kelp and drew nothing).

**Census.** PASS, exit 0, pageerrors 0. Tile histogram empty, core metrics +0, entity counts identical. Vacuous by
construction (draw-only) — the probe is the gate.

**Probe — `probes/probe-anglers.mjs` (new, promoted).** Because the iteration bundles two changes, the probe uses
**two reference builds** to isolate them: `BASE` = HEAD, `DECK` = HEAD + the one kelp-deck line (no anglers), `PATCH`
= working tree. Diffing PATCH vs DECK at the same frozen frame (movers cleared, tramwire law) isolates the anglers
alone — both builds already draw the deck over kelp. seeds 7/42: **ANGLERS (PATCH−DECK) day 2.18% / 0.86% → night
0.00% / 0.00%** (gate off → byte-identical), **ROAD control ~0** both frames; the secondary **deck-fix (DECK−BASE)**
column reads 25%/10% present at DAY **and** NIGHT (correct — the deck is permanent). So the anglers appear only by
day and only on the pier deck. **PASS.** (Getting here cost the fragile-short-pier debug the finding below records.)

**Visual.** `probes/shot-anglers.mjs` (new) camera-zooms the pier, day + night. Two agents (seed 7 & 42), both
**PASS**: DAY reads 2 anglers standing correctly ON the deck, rod + line to a float on the sea; NIGHT the deck is
empty (they pack up); the deck is **continuous end-to-end over the kelp** (gap closed); whole-city `wide` at both
seeds balanced/beautiful, no z-order tears/floaters/blowout/mojibake. (Seed 7 first FAILed — deck empty — which the
probe traced to the kelp gap; the FIX turned it to a clean PASS, 120's "a FAIL is a cue to MEASURE" in action.)

**Verdict — SHIPPED.** The pier, strolled-but-never-fished for the artifact's whole life, now has anglers casting off
the deck by day — the daytime People counterpart to the recent night-life run, sitting beside 169's tideline gulls.
Bundled a real deck-over-kelp fix. Draw-only, stream + pop flat. People's New element cell gains its next (41, 56,
**127**, **170**); People is no longer stalest (Transport 164 now is).

### Findings for later laps
- **A SWITCH-CASE-GATED DRAW SILENTLY SKIPS TILE TYPES THE CASE DOESN'T COVER — grep every case a shared helper is
  called from before assuming it runs everywhere.** `drawPierAt` was wired into WATER + BEACH but not KELP, so the
  pier deck (and anything I hung on it) vanished wherever the pier crossed kelp. A feature layered on a per-tile draw
  inherits that draw's coverage gaps. When a feature "works on seed 42 but not seed 7," suspect a tile-type the host
  draw doesn't handle on the failing seed (here: `pierdbg` printed `t:26` = KELP for seed 7's dead cells).
- **A SHORT PROCEDURAL HOST IS HIGH-VARIANCE — GUARANTEE ONE INSTANCE, HASH THE REST.** The pier is only 3–5 deck
  cells; an independent per-cell `hashCell<p` gate left whole piers empty on unlucky seeds (seed 7's cells all hashed
  ≥0.75). Forcing the seaward-most eligible cell (`x===pier.x1-2`) to always fish, then hash-gating the others,
  guarantees presence without making every cell identical. Reuse this shape for any feature on a small procedural run
  (a few civic slots, a short parade) rather than trusting the hash to populate it.
- **WHEN AN ITERATION BUNDLES TWO DRAW CHANGES, ADD A THIRD REFERENCE BUILD TO THE PROBE (the 161 build-vs-build law,
  extended).** A permanent change (deck-over-kelp) swamped a day-only one (anglers) in a plain patched-vs-HEAD diff.
  Building an intermediate reference (HEAD + only the permanent line) and diffing PATCH vs *that* isolated the
  day-only feature cleanly, with the permanent change reported as its own column. `String.replace` on an anchor is
  enough to synthesize the intermediate build inside the probe.

## Iteration 171 — the boulevards name themselves (2026-07-12) [Transport × Interaction/UX]

**Vector.** Transport × **Interaction/UX** (SHIPPED). Rotation named the stalest domain, **Transport** (last SHIP
164). Kind varied HARD off the recent runs — New element ran the last two laps (169/170) and 164 spent Transport's
New element cell; Deepen is globally hot (155/158/159/165/166); Polish (146) and Connect (138) are Transport's two
most-recent kinds. That left **Interaction/UX**, which is Transport's single **stalest cell (only 105 ever)** and by
far the stalest Interaction/UX across all domains (Nature 148 · Water 141 · Urban 133 · Civic 140 · Sky 144 · People
154 · **Transport 105**). A draw-nothing tooltip vector — guaranteed-flat pop.

**The seam — the asserts-LESS-than-the-code-knows tell (117/122/129/148/168), in its Interaction form.** The ROAD
draw has rendered a **tree-lined boulevard** — an allée planted down *both* kerbs (`if(c.treed)`, L4071) — since
long before the ledger, and the CA spreads `treed` among connected busy streets (L1659, adopting from treed
neighbours), so boulevards form leafy runs. But `describeTile`'s road branch named only Bridge/Arterial/Avenue/Street
off `flow`/`busy`/`bridge` and was **mute about `c.treed`** — hovering the single leafiest, most distinctive street in
the city read a flat "Avenue" like any other. The draw knew it was a boulevard; the label didn't say so. (The
`boulevardTrees` census stat already counts `c.treed` — **1203** across the 9-cell matrix, ~340/city — so it is a
tile at scale, not dead code, 30/107's law.)

**Change (~10 lines, tooltip logic only).** In `describeTile`'s ROAD branch: a treed road now titles **`Boulevard`**
(ranked below Bridge, above Arterial/Avenue/Street), sub *"A leafy avenue, planted with trees down both kerbs."* — and
if it is *also* a trunk (`flow>=ARTFLOW`) the sub appends *" Also a trunk route."* so a treed arterial keeps its
network identity. Added a **`Length — N block(s)`** data row = the boulevard's contiguous extent via a new
`boulevardSize(x,y)` = `floodSize(x,y, road && treed)` — the *same* flood the woods name their stand with (117) and
kelp its bed. No tile, entity, `rng()`, `hashCell`, `tick()` pass, terrain, or canvas draw; all strings pure-ASCII
(134 — no accent on "allee", the `é` in this ledger note aside). Pop + stream provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, all core metrics **+0**, `boulevardTrees 1203`
unchanged, entity counts identical (greenRoofs +1 = documented RAF tick-count jitter, touches no `rng()`). Vacuous by
construction (a tooltip-only change draws nothing) — the probe is the gate.

**Probe — `probes/probe-boulevard.mjs` (new, promoted).** A DOM/logic probe, not a pixel diff (the change is pure
tooltip logic): loads a developed city (`?seed&warp=61`) and calls `describeTile()` on real cells. **TARGET** — every
treed ROAD must title `Boulevard` AND carry a `Length N block(s)` row whose N equals `boulevardSize` (>=1).
**CONTROL** — busy NON-treed roads must title `Avenue`/`Arterial` and contain neither `Boulevard` nor `Length`; a
quiet road must stay `Street`. seeds 7/42/1234: **treed named+length 347/347 · 346/346 · 340/340 (0 bad, 0
len-mismatch)**; busy-plain control clean **33/33 · 54/54 · 29/29**; quiet road = `Street` all three; longest boulevard
run **28 / 15 / 15 blocks**. **VERDICT: PASS (3 seeds).**

**Visual — `probes/shot-boulevard.mjs` (new, promoted).** Drives a REAL cursor onto a boulevard and a plain-busy road
(reading back the handler's resolved `hoverTile` and retrying candidates so the control reliably lands on a non-treed
cell — treed roads are dense near centre, so a naive projection kept snapping to a neighbouring boulevard), then
screenshots the rendered `#tip` card. One agent, blind, read all four: **boulevard s7** = "Boulevard" + leafy sub +
`Length 28 blocks`; **boulevard s42** = "Boulevard" + `Length 5 blocks`; **control s7/s42** = "Avenue", no
Boulevard/Length; all cards legible, aligned, no clip/overflow/CSS breakage — **VISUAL: PASS**. (No whole-city shot:
the canvas is byte-identical to HEAD — nothing new is drawn — so the census/interleave/step-back visual pass has
nothing to catch here.)

**Verdict — SHIPPED.** The leafiest street in every city, a flat "Avenue" for the artifact's whole life, now names
itself a **Boulevard** and tells you how many blocks its allee runs — Transport's first Interaction/UX vector since
105, and the asserts-less-than-the-code-knows tell cashed in its Interaction form. Draw-nothing, pop + stream flat,
~10 lines + a probe + a shot script. Transport's Interaction/UX cell gains its next (105, **171**); Transport is no
longer stalest (Urban 165 now is, and 172 is the step-back).

### Findings for later laps
- **THE ASSERTS-LESS-THAN-THE-CODE-KNOWS TELL EXTENDS TO A DRAW-VARIANT THE LABEL FLATTENS, not just a missing calendar
  or a mute string.** 117/122/129/148 cashed it where a tooltip ignored CA *state*; 171 cashed it where the tooltip
  collapsed a distinct **draw variant** (`c.treed`, an allee both kerbs) into a generic label. Look for other draw
  flags the tooltip doesn't surface: a road can also carry `c.fete` (festival bunting is drawn, unnamed) and `c.corr`
  (a corridor). A BUILDING's `c.corner` is already named; check what other per-cell draw flags a label flattens.
- **A GENERIC FLOOD (`floodSize`) NOW HAS THREE READERS (stand/bed/boulevard) — reach for it for any "name this
  contiguous run's extent" tooltip.** `boulevardSize` was one line. Any feature whose interest is *how far it reaches*
  (a marsh, a dune field, a solar farm, an arterial spine) can report `Length/Extent — N` for near-free.
- **A TOOLTIP-LOGIC CHANGE IS GATED BY A DOM PROBE, NOT A PIXEL DIFF — and its "visual" gate is the rendered `#tip`
  card, not the city.** `describeTile()` returns an HTML string, callable in-page on every cell, so the probe asserts
  the exact title/rows across ALL host cells (347/seed) with a control class — far stronger than sampling a few. The
  screenshot only needs to confirm the card *paints*; drive the real cursor and read back `hoverTile` to place it
  honestly (naive world->screen projection snaps to the wrong hex when the host class is dense).

## Iteration 172 — the fourteenth step-back finds a clean city, perf flat (2026-07-12) [holistic step-back]

**Vector.** The mandated holistic step-back (105/110/115/120/125/130/136/142/147/152/157/162/167/**172**). Not a
domain × kind lap: it reads the WHOLE city for *cumulative* drift the census and per-feature gates are blind to,
runs the season probe + interleaved perf gate, at night AND a season with the day/night baselines pinned OFF
January (`year=2035.62` dry peak; `2035.02` as the seasonal-contrast frame). No city vector taken, so rotation is
unchanged — the next lap (173) owes the stalest domain, **Urban (165)**, then Nature (166)/Civic (168).

**What was read.** Un-zoomed whole-city `wide` frames at **2 seeds × 3 lights/calendars** — seed 42 (warp 61) &
seed 7 (warp 31), each at {day 2035.62/t=0.35, night 2035.62/t=0.90, winter 2035.02/t=0.35}. One subagent per
seed read its own three frames: the cumulative question ("has anything compounded into clutter or darkness?")
plus 108's **locate-don't-judge** night test ("where is the core by light alone?") and a season-distinctness check.

**Result: the city is healthy — both agents VISUAL: PASS.**
- **Night core (115/143) LOCATED off-centre both seeds** — seed 42 ~(0.47,0.55) with a warm-lit tower spine
  (.45,.40)→(.50,.75), seed 7 ~(0.45,0.62) — matching 167 ((.47,.50)/(.50,.62)), 162 ((.48,.53)/(.45,.62)), each
  with a genuine bright-core→dim-mid-ring→dark-rim falloff to a near-black ocean, not a flat wash.
- **All recent vectors sit correctly in the whole frame** — 168's amphitheater performer, 169's tideline gulls,
  170's pier anglers, 171's boulevards — with the pier/ferris/wind-farm on the water plane and the block grid
  still separating cleanly. **No z-order tears / floaters / hard seams / blown-out white / mojibake** in any of the
  6 frames; stat strip + labels crisp both seeds (em-dashes render correctly, no `Â·`). **Winter reads distinct**
  from summer at both seeds (cooler/duller vegetation, more bare-brown farm plots, marginally cooler water) — mild
  by design (120's evergreen/irrigated dilution), clearer at seed 7.

**Season — measured alive.** `probes/probe-season.mjs`: FARM winter→dry-peak **88.4** (matches
130/136/142/147/152/157/162/167), VINEYARD 44.6/36.7/42.7 (139), FOREST 20.6/19.7/**30.7** (autumn holds at 166's
litter level), ORCHARD 25.3/17.8/41.4, MEADOW/SHOREPARK move, PARK/REDWOOD/GARDEN/QUAD near-zero by design (120),
ROAD control **0.5–2.1**. Calendar working; the four-season forest floor (156/166) is real.

**Perf — 168→171 cost ~ZERO.** Interleaved HEAD-171 vs the iter-167 file (`e942152`, A/B/A/B ×3, **min per
variant**, one process so both eat the same machine load): day **35.39 vs 35.17ms** (**+0.6%, flat**) and night
**41.33 vs 41.55ms** (**−0.5%, flat**). So 168 (amphitheater performer, night-only draw) + 169 (gulls, day-only) +
170 (anglers, day-only) + 171 (boulevard tooltip, draw-nothing) added ~nothing measurable — expected, all four are
draw-only/tooltip. NOT re-pinning the stored baseline (it reads inflated on today's load per the reflexive
false-FAIL, 167; re-pin only if an interleave *itself* shows a persistent offset — it has not since 142's real
+2.2%). Census PASS, vacuous (no source edit); tree clean.

**Change (the step-back's product — none to the city).** No compounding defect, so per
120/130/136/142/147/152/157/162/167 ("a clean step-back is a complete iteration — don't force a filler vector")
the output is the health record + header refreshes: step-back pointer 167→172 (next 177), the ninth clean bill,
and the 172 interleaved perf reading. No `solvista.html` edit.

**Verdict — FIXED.** No compounding city defect — the NINTH clean step-back in a row (130, 136, 142, 147, 152,
157, 162, 167, 172). All accumulated visual laws (115/116/120/123 + 138 arterials + 143 CBD peak) still read at
both seeds under all three lights; the season is alive (166's autumn litter still in FOREST's probe, 139's
vineyard moving); perf is flat against the honest interleaved control.

### Findings
- **NINTH CONSECUTIVE CLEAN STEP-BACK — the loop's late-game equilibrium is holding.** Four laps of draw-only /
  tooltip vectors (168 amphitheater, 169 gulls, 170 anglers, 171 boulevards) landed since 167 with ZERO measurable
  perf cost and no cumulative visual drift. The recent surface-not-entities discipline (127's law) keeps adding
  life to *untouched surfaces* (the stage, the tideline, the pier deck) rather than piling more entities into a
  saturated coast — which is exactly why nothing compounds. Pattern: 125→…→167→172.
- **THE INTERLEAVE-VS-A-STEP-BACK-FILE IS NOW THE STANDING PERF METHOD, and it read +0.6%/−0.5% against a file 4
  iters and 5 days old.** The stored baseline remains untouched and would false-FAIL; the only trustworthy number
  is HEAD vs a pinned older commit's file in ONE process. e942152 (iter 167) is the current perf anchor; the next
  step-back (177) should interleave HEAD vs THIS iteration's file to isolate 173–176's cost.
- **Night is still the slowly-accumulating column but it did NOT move this window** — of 168–171 only 168's
  amphitheater performer draws at night, and it is a 1/city landmark often occluded, so night held flat (−0.5%).
  Night remains the column a future step-back watches first (≈41ms/24fps at today's load), but there is no drift to
  act on. No perf-fix iteration owed.

## Iteration 173 — the warehouse roof grows its north-light (2026-07-12) [Urban × Deepen]

**Vector — Urban × Deepen** (next lap owed the stalest domain, Urban, last shipped 165). Adopted and finished a
killed iteration found uncommitted in the worktree at startup: the source had ~3 lines of complete, coherent
draw code (a `## Iteration 173` had never been written, so it died before step 5). Per the "dirty worktree"
protocol — **the gates decide, not the ledger** — I re-verified it, tuned one number the visual agents flagged,
and shipped. Domain × kind matches exactly what the header called for (the last bare roof).

**The seam.** 165 gave COM the mid-rise roof-plant, closing the roof-furniture set across MID (water tanks) /
RES (solar) / TOWER (gardens/helipads) / COM (plant) — the header noted **"only IND (warehouses) has a bare
roof left."** The sawtooth warehouse (`drawBuilding`'s `T.IND` else-branch, ~L4595) drew two white monitor
prisms (`gx-0.17`, `gx+0.19`) with nothing on them — a flat white cap where every other block carries lived-in
roof detail.

**Change (~4 lines, draw-only).** North-light clerestory glazing: a glass band (`colLit('glass',0.6,lit*0.65)`)
up the front face of each sawtooth monitor — the factory's classic clerestory. Glass-grey by day; a **faint warm
work-shift glow after dark** (light industry runs a partial night shift, dimmer than the offices' full-`lit`
glazing above — base 0.6 and a sub-office `lit*0.65` mix keep it restrained). Loft IND keeps its own crown
(this is the sawtooth branch only). No tile / entity / `rng()` / `hashCell` / `tick()` pass / terrain — `colLit`
is plain glass-grey by day and mixes toward warm with the scene `lit`, so pop/stream stay flat and it can't blow
out. All strings pure-ASCII (134). **My one edit to the inherited code:** `lit*0.4` → `lit*0.65`, because both
visual agents independently read the night glow as "cool/subtle, not the intended warm" — a tuning nit they both
still PASSed. The bump warms it while keeping it below the offices.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram empty; `pop` 154918 (+7, chaotic-CA noise, no `rng()`
touched), `developed`/`roads` +0. Vacuous by construction (draw-only) — the probe is the gate.

**Probe — `probes/probe-clerestory.mjs` (new, promoted).** PATCH(working) vs BASE(HEAD) whole-hex diff over each
warehouse (iter-161 law: every differing pixel over a host hex IS the clerestory, by construction). Rebuilds the
city in-page (`genWorld(seedNum); __warp(WARP); __setTime(t)`, iter-163(c)) so the RAF's wall-clock tick jitter
can't diverge the two builds — this was load-bearing: without it the ROAD control was run-to-run non-deterministic
(0.02%→0.55%). **WARE moves DAY AND NIGHT** — seeds 7/42/1234 day 0.70/1.77/1.20%, night 0.78/1.86/1.30%
(**night > day every seed**, confirming the warmth bump registers after dark). **LOFT control exactly 0.000%**
across all 6 rows (same tile, untouched branch — the decisive clean control) and **ROAD control 0.001–0.020%**
(deterministic once rebuilt). **VERDICT: PASS (3 seeds).**

**Visual — `probes/shot-clerestory.mjs` (new, promoted).** Wheels the artifact's own camera onto the largest
warehouse cluster (IND is sparse, ~2–6/city, and small — fit zoom is invisible) and shoots day+night at both
seeds. Two agents (one per seed), blind, both **VISUAL: PASS** — glazing visible on the roof teeth, sits
correctly (not floating), no z-order tears / floaters / blowout anywhere, whole city still balanced; only nit was
the cool night glow. After the warmth bump a third agent read all 4 night clips: glow now "faint WARM amber/gold,
restrained, not blown out, clearly dimmer than the office/tower windows" — **WARMTH: GOOD**.

**Verdict — DEEPENED.** The last bare roof in the city — every warehouse monitor, flat white for the artifact's
whole life — now carries a north-light clerestory that glows a faint work-shift amber after dark. Roof furniture
is now **truly city-wide** (MID/RES/TOWER/COM/IND). Draw-only, pop+stream flat, ~4 lines + a probe + a shot
script. Urban's Deepen cell gains 173 (38/54/68/92/165/**173**); the next lap (174) owes Nature (166)/Civic (168).

### Findings for later laps
- **A KILLED ITERATION THAT PASSES ITS GATES IS KEPT — and adopting it is a licence to finish it, not just rubber-
  stamp it.** The inherited 3 lines passed census + probe, but both visual agents flagged the night glow as too
  cool. Adopting authorship meant I could take the one-number tune (`lit*0.4`→`0.65`) the original author never
  got to, and re-gate it. The protocol's "keep it" is a floor, not a ceiling.
- **`T` IS THE GLOBAL TILE-TYPE ENUM — NEVER name a probe `page.evaluate` param `T`.** Passing the frame time in as
  `{ T: t }` and destructuring `({...,T})` shadowed the page's `T`, so `c.t === T.IND` became `c.t === (0.35).IND
  === undefined` and matched ZERO cells (nWare→0) with no error — a silent all-zero probe. Cost a debugging lap.
  Use `TOD`/`WARP`/`RX` — anything but a single capital that collides with the artifact's globals (`T`, `G`, `LIT`).
- **A BUILD-VS-BUILD DIFF PROBE THAT COMPARES TWO SEPARATELY-LOADED FILES MUST REBUILD IN-PAGE (iter-163(c)) OR ITS
  CONTROLS ARE NON-DETERMINISTIC.** The clerestory signal (WARE) and the same-branch LOFT control were stable
  without the rebuild, but the ROAD control — cells the RAF keeps upgrading between load and freeze — swung 0.02→0.55%
  run to run and false-FAILed. `genWorld(seedNum);__warp(WARP);__setTime(t)` pins a byte-identical city; without it,
  any control on a CA-mutated tile class (ROAD/RES/upgrades) is noise. (LOFT held because loft-conversion had
  saturated by warp 61 — a control on a *settled* class survives the jitter; a control on a *live* one does not.)
- **The roof-furniture set is now CLOSED across all 5 developed building types (MID/RES/TOWER/COM/IND).** A future
  "bare roof" Urban vector has no host left; Urban Deepen must go elsewhere (facades, ground plane, the harbour
  works apron). Don't propose more roof clutter.

## Iteration 174 — the cut fields keep their hay bales (2026-07-12) [Nature × New element]

**Vector — Nature × New element** (next lap owed the stalest domain, Nature, last shipped 166). The forest
floor is over-worked (156 spring bloom, 166 autumn litter — a full four-season floor), so I went to Nature's
biggest *untouched* surface instead: the FARM belt (~150 fields, the strongest seasonal mover, winter→dry-peak
88). 127's law — "additive inventory spent" is a claim about a domain's *entities*, not its *surfaces*.

**The seam.** The farm draws its own crop calendar (`cropRGB`, iter 108/57 lineage): a field greens → ripens
to `straw` → is **cut** to `stubble` (ph 0.80–0.90) → is ploughed back to `soilDk` (ph 0.93–0.995). The
palette even carries `straw`/`stubble` with a comment naming "then ripe, then cut" — but the cut left the field
**bare**: nothing marked the harvest. The post-cut stubble window was an empty surface with a name already in
the palette.

**Change (~11 lines, draw-only).** When a FARM cell's per-cell phase `ph` is in the post-cut window
(`0.82<ph<0.95`) and `hashCell(x,y,70)<0.62` (thins to ~60% of fields for variety), scatter `1+(hashCell·3)`
rolled hay bales: a soft contact-shadow ellipse (house-style, per 137), a `straw` body ellipse (the golden roll
on its side), and a darker `stubble` end-cap arc (the curled end). Placement is `hashCell`-scattered so it
perturbs nothing — no `rng()`, no terrain, no `tick()` pass. The bales inherit the scene `col()` tint, so they
darken with night and can't blow out; not day-gated (bales sit in the field round the clock, like the barn).
All strings pure-ASCII (134). The window sits at ph≈0.88 ≈ autumn (`applySeason`'s .87 keyframe), so bales
appear at harvest and are gone by winter — the field's own calendar drives them, so the belt bales as a
patchwork (each field ±2.5 weeks off its neighbours via the existing `v` phase offset), never all at once.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram empty; all entity/tile counts flat. Vacuous by
construction (draw-only, no `rng()`/terrain) — the probe is the gate.

**Probe — `probes/probe-haybale.mjs` (new, promoted).** PATCH(working) vs BASE(HEAD) whole-hex diff over each
FARM cell (iter-161 law: every differing pixel over a host hex IS the bales, since the crop colour reads the
same `year` in both builds). Rebuilds the city in-page (`genWorld;__warp;__setYear;__setTime`, iter-163(c)) so
RAF tick jitter can't diverge the builds. **The strong control is a CALENDAR control, not just a tile control:**
at **harvest** (`year=2035.88`) FARM diffs **2.07/1.88/1.84%** (seeds 7/42/1234) — bales present; at **summer**
(`year=2035.40`) FARM diffs **exactly 0.000%** all three seeds — no field is post-cut, so no bale is drawn in
either build, isolating the bale from the crop-colour calendar. ROAD tile control **~0.00–0.02%** at both
calendars. **VERDICT: PASS (3 seeds).**

**Visual — `probes/shot-haybale.mjs` (new, promoted).** Wheels the artifact's own camera onto the densest FARM
cluster (farms are scattered and bales are ~2px, so fit zoom shows nothing) and **freezes the calendar in-page**
at year 2035.88/2035.90 for the final frame (discrete-seasonal freeze law — `?year=` alone drifts a season
during the `playing=true` wait). Two agents (one per seed), blind: both **VISUAL: PASS** — golden bales visible
on the stubble field faces, sitting correctly on the iso plane (not floating, not off-edge), reading as rounded
bales with a highlight/shade (not flat specks), distinct from the pre-existing coral/purple crop dots; no
z-order tears / floaters / blowout; whole belt still balanced, "bales add harvest texture without clutter." One
un-zoomed whole-city frame (third agent): city reads balanced/beautiful, no tears/darkness/mojibake, stat strip
crisp.

**Verdict — SHIPPED.** The farm belt's calendar had a cut phase named in the palette since forever but nothing
in the field to show for it; now the weeks after each harvest carry rolled golden bales, patchworked field by
field. Draw-only, pop+stream flat, ~11 lines + a probe + a shot script. Nature's New element cell gains 174
(4/26/29/102/156/**174**); the next lap (175) owes Civic (168).

### Findings for later laps
- **A CALENDAR CONTROL is stronger than a tile control for a SEASONAL draw-only feature.** Diffing PATCH vs BASE
  over the host tile at the harvest calendar proves *something* changed; diffing the SAME tile at a non-harvest
  calendar (summer, 0.000%) proves the change is the *bale* and not the crop colour, which reads `year` in both
  builds and would otherwise pollute any single-calendar FARM diff. For any seasonally-gated feature, add the
  off-season calendar as the control, not just an off-tile.
- **The palette often names a phase the draw never showed.** `straw`/`stubble` existed with a comment "ripe,
  then cut" for the artifact's whole life, but the cut field was bare. A named-but-unshown palette entry (or a
  named-but-unshown draw state) is a cheap New-element seam — the intent is already recorded; you just draw it.
  Where else does a palette/comment name a state the pixels skip?
- **Nature's forest floor is a four-season CLOSED surface (156/166); its next big surface is the FARM belt
  (174 opened it).** The belt still has room: post-cut bales are shipped, but a harvest could also stack sheaves,
  and the barn (v>0.9) is a lone object — a farm New element / Deepen has host left. Garden (2 hexes) and meadow
  (6 hexes) remain too small to buy pixels; prefer FARM/FOREST for Nature surfaces.

## Iteration 175 — the parliament floodlights its facade (2026-07-12) [Civic & culture × Deepen]

**Vector — Civic × Deepen** (SHIPPED). Rotation named the domain — the 174 lap left Civic (last SHIP 168) the
stalest owed lap. Kind: **Deepen**, the banked Civic candidate from 168's findings ("museum/parliament
floodlights — the museum already floodlights at dusk; parliament does not. Next Civic Deepen candidate"). It also
fits the coherent night-mood run the recent Civic/Sky/Water laps built (moon 135, stars 153, observatory 158,
biolum surf 159, amphitheater concert 168). Draw-only, so a guaranteed-flat ship.

**The seam.** `case 'museum'` (L4731) draws a **floodlit facade** at dusk — a warm `rgba(255,222,160,·)` wash up
its front (L4751-4754) under `if(LITAMT>0.3)`. The **parliament** (L4934, the grander building — `th=34`, the
"tallest civic roof", a full colonnade + grand gold dome) lit only its **dome + lantern beacon** at night
(L4949-4953); its colonnade facade stayed dark. So the two grandest civic landmarks were lit inconsistently: the
lesser one floodlit, the greater one dark below its dome. Parliament is sited 2034, present in the 2035 census
slices, 1/city (census tile histogram confirms).

**Change (~9 lines, draw-only).** Inside the parliament's existing `LITAMT>0.3` night block, before the dome
uplight (so the dome glow overlays crisp): a warm floodlight polygon washing up the colonnade facade, mirroring
the museum's method but on the parliament's own front-face geometry (half-extents 0.37x0.32, up to the body top
`hb`). Warm cream `rgba(255,224,165,0.16*LITAMT)` — a touch dimmer than the museum's 0.18 since the parliament
already carries the dome uplight, keeping it below blowout. No tile / entity / `rng()` / `hashCell` / `tick()`
pass / terrain; `LITAMT` is a scene global, so pop + stream stay flat. All strings pure-ASCII (134).

**Census.** PASS, exit 0, pageerrors 0. Tile histogram empty, all core metrics +0, entity counts identical.
Vacuous by construction (a night-only draw at the t=0.35 daytime census frame draws nothing) — the probe is the
gate. (`greenRoofs -1` is documented chaotic-CA headless wobble; the change touches no `rng()`.)

**Probe — `probes/probe-parliament.mjs` (new, promoted; adapted from `probe-amphi.mjs`, the 1/city-landmark
template).** Diffs PATCHED vs pristine HEAD at the SAME frozen frame (`time` pinned, every mover cleared per the
tramwire law), camera-zoomed onto the 1/city parliament hex so the facade is unoccluded, ROAD as the zero
control, night vs a day control. **seeds 42/1234/3/88/7: FACADE changed 37.9/23.9/37.8/37.9/37.8% at NIGHT ->
0.00/0.17/0.00/0.00/0.00% in DAY** (gate off -> byte-identical), **ROAD control 0.00-0.58%** both frames. All 5
measurable (none occluded this run). **VERDICT: PASS (5 seeds).**

**Visual — `probes/shot-parliament.mjs` (new, promoted).** Camera-zooms the 1/city parliament, night + a day
control, both seeds. Two agents (seed 42, seed 1234), blind, both **VISUAL: PASS** — NIGHT shows a warm
amber/golden wash across the colonnade bays below the dome (pooling at the steps), DAY the same colonnade reads
as plain pale/white stone with cool shadows; the dome keeps its separate uplight in both; no z-order tears /
floating light / white-clipping (amber, not blown out); reads as a coherent floodlit monument, not a glowing
blob. Whole-city `wide` NIGHT (seed 42, third agent): balanced coherent coast, core located by light alone at
**(0.47, 0.55)** — matching 162/167/172's night-core reads, so no lighting drift — sea reads, no
tears/blowout/mojibake, stat strip crisp. **VISUAL: PASS**.

**Verdict — DEEPENED.** The parliament — the city's grandest civic roof, lit only at its dome after dark for the
artifact's whole life — now floodlights its colonnade facade at night, matching the museum's dusk floodlight and
joining the night-mood run. Draw-only, pop + stream flat, ~9 lines + a probe + a shot script. Civic's Deepen cell
gains 175 (36/59/66/80/91/149/158/**175**); Civic is no longer stalest (Water 169 now is — the next lap, 176,
owes it).

### Findings for later laps
- **THE ASSERTS-INCONSISTENCY tell has a SYMMETRY form: two kindred hosts drawn inconsistently.** 168 found the
  amphitheater's label promised what its draw omitted (asserts-more-than-it-draws). 175 is the sibling: two
  *drawn* landmarks (museum, parliament) that should share a treatment (dusk floodlighting) but didn't — the
  lesser one had it, the greater didn't. Where else do two kindred civics/tiles carry a night/day/seasonal
  treatment on one but not the other? (The 168 findings also bank the **firehouse bell** and note the
  **museum already floodlights** — parliament is now done, so the remaining civic-night-treatment gap is the
  firehouse bell, weaker per 168.)
- **The night-mood Civic/Sky/Water run is getting full** (moon 135, stars 153, observatory 158, biolum 159,
  amphitheater 168, parliament 175). Each has been a single landmark or a sparse field, so none compounds into
  city-wide night clutter — but a future night-glow vector should check the whole-frame night read (still clean
  at 175: core (0.47,0.55), no over-bright bloom) before adding a sixth+ glow. Prefer a DAYTIME or non-glow
  Civic move next if Civic comes up again soon.
- **`probe-amphi.mjs` is now the reusable template for any 1/city night-lit civic landmark** (camera-zoom the
  single host, night-vs-day diff, ROAD control, occlusion=SKIP). `probe-parliament.mjs` adapted it in minutes:
  swap the `c.kind` filter, bump `R` for a taller host, keep the rest. For the next single-civic draw/light
  vector, clone one of these two rather than writing a probe from scratch.

## Iteration 176 — the river names its course (2026-07-12) [Water & coast × Interaction/UX]

**Vector — Water & coast × Interaction/UX** (SHIPPED). Rotation named the stalest domain, **Water** (last SHIP
169; the 175 entry explicitly owed the 176 lap to Water). Kind: **Interaction/UX**, Water's stalest cell (only
97, 141 — and the stalest I/UX across all domains: Nature 148 · Urban 133 · Civic 140 · Sky 144 · People 154 ·
Transport 171 · **Water 141**). A draw-nothing tooltip vector — guaranteed-flat pop, and it varies hard off the
recent New element (169/170) / Deepen (175) / New element (174) run.

**The seam — the asserts-LESS-than-the-code-knows tell (117/122/129/148/171), in its Interaction form.** The
**river** is the city's biggest water feature and the spine of its most-compounded system (banks → bridges →
marsh → herons → kayaks), yet `describeTile`'s river branch (L6397) gave it the **barest tooltip in the artifact**:
a flat `title='River'` / `sub='Fresh water winding down to the sea.'` with **zero data rows** — while the
boulevard (171), the woods stand (117) and the kelp bed name their own extent via `floodSize`. The draw knew the
whole waterway; the label named nothing about it.

**Change (~18 lines: a `riverCourse(x,y)` helper + a 2-line data-row push, tooltip logic only).** A river hex now
carries a **`Course — N hexes`** row = the whole waterway's open-water hex count. `riverCourse` is a **bridge-aware**
flood: a bridge is a ROAD drawn over the river (genWorld L624; the L1633 rule also paves dense stretches into
bridge-road), so a naive `riv`-only flood **fragments the course at every span** — the flood therefore *steps
through* `bridge` road to keep the reach continuous, but counts only WATER hexes (every counted hex is one you can
see as river). Sea water (`WATER && !riv`) never qualifies, so the flood **stops at the mouth** and can't walk the
coast highway. No tile / entity / `rng()` / `hashCell` / `tick()` pass / terrain / canvas draw; strings pure-ASCII
(134). Pop + stream provably flat.

**Considered and DROPPED — a `Crossings` row.** The bridge-aware flood also *counts* the spans, so a
`Crossings — N bridges` row was the obvious companion. A check (`probe-bridgecheck`, ad-hoc, deleted) killed it:
raw bridge-**cell** counts wildly over-report (seed 7's longest course = 37 bridge cells but only **4** distinct
connected components), and the L1633 rule *paves river water into bridge-road* in dense downtown, so a "bridge"
component conflates a transverse crossing with a longitudinal covered stretch — no honest single number. Course
(open-water hexes) has none of that murk. Shipped the clean single datum, exactly as boulevard/stand/bed do; a
distinct-crossings count is banked below if it ever earns a Deepen.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, all core metrics **+0**, entity/tile counts
identical (`greenRoofs -1` = documented chaotic-CA headless jitter, touches no `rng()`). Vacuous by construction
(a tooltip-only change draws nothing) — the probe is the gate.

**Probe — `probes/probe-river.mjs` (new, promoted).** A DOM/logic probe (the change is pure tooltip logic). Per
122's law — a tooltip vector must check its claim against **independently recomputed truth**, not just that it
renders — the probe re-implements the bridge-aware flood itself (its own predicate + count, using only the grid
topology `nbrs6`) and asserts describeTile's printed N equals that recompute; calling `riverCourse` would only
prove the row renders. **TARGET** every river hex titles `River` AND carries a `Course N hex(es)` row == the
independent flood (>=1). **CONTROL** every SEA hex titles `Ocean`, carries a `Depth` row, and carries **no**
`Course` row; the flood must also never count a sea hex (**sea-leak guard**). seeds 7/42/1234: river
**111/48/95** hexes, named+course **OK 111/111 · 48/48 · 95/95**, course-mismatch **0**, **sea-leak 0**; sea
control clean **630/630 · 639/639 · 647/647** (bad 0); longest course **61/48/58** hexes. **VERDICT: PASS (3 seeds).**

**Visual — `probes/shot-river.mjs` (new, promoted).** shoot.mjs can't hover, so it drives Playwright directly:
finds a mid-course on-screen river hex, aims the real cursor at it, screenshots the rendered tooltip, and prints
its text. seeds 42/1234 render `River · Fresh water winding down to the sea. · Course 48/58 hexes`, pageerrors
none. Two agents (one per seed), blind, both **VISUAL: PASS** — tooltip box crisp and legible, correct three-line
content, no clipping / overlap garbage / mojibake; cursor sits on a blue river hex; whole-city `wide` (seed 42,
same agent) reads balanced and beautiful, no z-order tears / floaters / blowout.

**Verdict — SHIPPED.** The river — the artifact's biggest waterway and the barest tooltip in the city — now names
its own course, the same extent-flood the boulevard, the woods and the kelp bed use. Draw-only, pop + stream flat,
~18 lines + a probe + a shot script. Water's Interaction/UX cell gains 176 (**97**, **141**, **176**); Water is no
longer stalest (Sky 161 now is the stalest number, but post-saturation; the next domain lap owes People (170) /
Transport (171)).

### Findings for later laps
- **THE ASSERTS-LESS-THAN-THE-CODE-KNOWS TELL HAS A NAKED form: a tile whose tooltip has NO data rows at all.**
  117/122/129/148/171 all found a tooltip that named *some* things but omitted one; the river named *nothing* —
  a bare title+sub over the city's richest water system. When rotation lands on a mature domain, grep
  `describeTile` for the branches that push zero `data` rows; those are the barest, highest-yield tells.
- **A NAIVE FLOOD FRAGMENTS AT ANYTHING THAT INTERRUPTS THE PREDICATE — make the flood aware of the interrupter.**
  The river's `riv` water is split by bridge-road (genWorld L624 + the L1633 pave-over rule), so `floodSize(riv)`
  would have reported a stub for most hovers. Stepping the flood *through* the interrupter while counting only the
  real cells keeps the extent honest. Reuse this shape for any linear feature crossed by a different tile type
  (a promenade broken by a plaza, a rail line through a station).
- **A COUNT IS ONLY HONEST IF ITS UNIT IS UNAMBIGUOUS — check the connected-components before shipping "N of X".**
  The `Crossings` row died because bridge *cells* (37) ≠ distinct crossings (4 components), and the L1633 rule
  makes a component either a real span or a covered stretch — two meanings, one number. When a candidate datum
  counts cells of a clustered feature, count its connected components first (a 20-line ad-hoc probe) and confirm
  the unit is what the label claims. Prefer the datum whose unit is unambiguous (open-water hexes) over the one
  that reads well but can't be defined cleanly.
- **STILL banked for Water (123, unchanged):** the pier/lifeguard tower are still `rng()`-salted — site them on a
  depth by respending their draws, but VARY 123's site-on-depth mechanism. And a distinct-crossings river datum
  (connected-component count, filtering longitudinal covers) is a possible future Water Deepen if it earns the
  ambiguity cost.

## Iteration 177 — the fifteenth step-back finds a clean city, perf flat (2026-07-12) [holistic step-back]

**Vector.** The mandated holistic step-back (105/110/115/120/125/130/136/142/147/152/157/162/167/172/**177**). Not a
domain × kind lap: it reads the WHOLE city for *cumulative* drift the census and per-feature gates are blind to,
runs the season probe + interleaved perf gate, at night AND a season with the day/night baselines pinned OFF
January (`year=2035.62` dry peak; `2035.02` as the seasonal-contrast frame). No city vector taken, so rotation is
unchanged — the next lap (178) owes the stalest domains, **People (170)/Transport (171)**.

**What was read.** Un-zoomed whole-city `wide` frames at **2 seeds × 3 lights/calendars** — seed 42 (warp 61) &
seed 7 (warp 31), each at {day 2035.62/t=0.35, night 2035.62/t=0.90, winter 2035.02/t=0.35}. One subagent per
seed read its own three frames: the cumulative question ("has anything compounded into clutter or darkness?")
plus 108's **locate-don't-judge** night test ("where is the core by light alone?") and a season-distinctness check.

**Result: the city is healthy — both agents VISUAL: PASS.**
- **Night core (115/143) LOCATED off-centre by light alone both seeds** — seed 42 ~(0.48,0.50), seed 7 ~(0.53,0.60)
  — matching 172 ((.47,.55)/(.45,.62)), 167 ((.47,.50)/(.50,.62)), 162 ((.48,.53)/(.45,.62)); each a genuine warm
  bright-core → dim residential mid-ring → dark rim → near-black ocean falloff, not a flat wash, with lit transit
  lines threading out (138 arterials hold).
- **All recent vectors sit correctly in the whole frame** — 173's warehouse north-light, 174's hay bales, 175's
  parliament floodlight, 176's river tooltip (draw-nothing) — with pier/ferris/wind-farm on the water plane and the
  block grid still separating cleanly. **No z-order tears / floaters / hard seams / blown-out white / mojibake** in
  any of the 6 frames; stat strip + labels crisp both seeds (`·` renders correctly, no `Â·`). **Winter reads
  distinct** from summer at both seeds (bare/stubble-striped farm plots, duller desaturated vegetation) — mild
  California winter by design (120's evergreen/irrigated dilution), no snow.

**Season — measured alive.** `probes/probe-season.mjs`: FARM winter→dry-peak **87.6** (matches
130/136/142/147/152/157/162/167/172), VINEYARD 44.6/36.7/42.7 (139), FOREST 20.6/19.7/**30.7** (autumn holds at
166's litter level), ORCHARD 25.3/17.8/41.4, MEADOW/SHOREPARK move, PARK/REDWOOD/GARDEN/QUAD near-zero by design
(120), ROAD control **0.5–2.1**. Calendar working; the four-season forest floor (156/166) is real.

**Perf — 173→176 cost ~ZERO.** Interleaved HEAD-176 vs the iter-172 file (`3d0e876`, A/B/A/B ×3, **min per
variant**, one process so both eat the same machine load): day **34.44 vs 34.5ms** (**−0.2%, flat**) and night
**40.55 vs 40.44ms** (**+0.3%, flat**). So 173 (warehouse clerestory, day roof draw) + 174 (hay bales, day-only) +
175 (parliament floodlight, night-only) + 176 (river tooltip, draw-nothing) added ~nothing measurable — expected,
all four are draw-only/tooltip. NOT re-pinning the stored baseline (it reads inflated on today's load per the
reflexive false-FAIL, 167; re-pin only if an interleave *itself* shows a persistent offset — it has not since
142's real +2.2%). Census PASS, vacuous (no source edit); tree clean.

**Change (the step-back's product — none to the city).** No compounding defect, so per
120/130/136/142/147/152/157/162/167/172 ("a clean step-back is a complete iteration — don't force a filler
vector") the output is the health record + header refreshes: step-back pointer 172→177 (next 182), the tenth clean
bill, and the 177 interleaved perf reading. No `solvista.html` edit.

**Verdict — FIXED.** No compounding city defect — the TENTH clean step-back in a row (130, 136, 142, 147, 152,
157, 162, 167, 172, 177). All accumulated visual laws (115/116/120/123 + 138 arterials + 143 CBD peak) still read
at both seeds under all three lights; the season is alive (166's autumn litter still in FOREST's probe, 139's
vineyard moving); perf is flat against the honest interleaved control.

### Findings
- **TENTH CONSECUTIVE CLEAN STEP-BACK — the loop's late-game equilibrium is holding.** Four more laps of draw-only /
  tooltip vectors (173 warehouse north-light, 174 hay bales, 175 parliament floodlight, 176 river course tooltip)
  landed since 172 with ZERO measurable perf cost and no cumulative visual drift. The surface-not-entities /
  deepen-what-exists discipline keeps adding life to *untouched surfaces & existing systems* (a roof, a stubble
  field, a facade, a tooltip) rather than piling more entities onto a saturated coast — which is exactly why
  nothing compounds. Pattern: 125→…→172→177.
- **THE INTERLEAVE-VS-A-STEP-BACK-FILE IS NOW THE STANDING PERF METHOD, and it read −0.2%/+0.3% against a file 5
  iters old.** The stored baseline remains untouched and would false-FAIL; the only trustworthy number is HEAD vs a
  pinned older commit's file in ONE process. **3d0e876 (iter 177's anchor was iter 172) — the next step-back (182)
  should interleave HEAD vs THIS iteration's file (Iter 177 / whatever 181 leaves) to isolate 178–181's cost.**
- **Night is still the slowly-accumulating column but it did NOT move this window** — of 173–176 only 175's
  parliament floodlight draws at night, and it is a 1/city landmark often occluded, so night held flat (+0.3%).
  Night remains the column a future step-back watches first (≈40.5ms/24fps at today's load), but there is no drift
  to act on. No perf-fix iteration owed.
