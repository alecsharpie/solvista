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
| **Nature** | 4, 26, 29, 102, **156**, **174** | 1, 13, 60 | 37, 46, 67, 76, **108**, **120**, **139**, **166** | ~~46~~, ~~88~~, ~~101~~ | U4 | 53, 96 | **117**, **129**, **148**, **183** |
| **Water & coast** | 6, 10, 12, 16, 20, 33, 106, **169** | 90 | 17, 25, 51, 65, 72, **113**, **123**, **159** | 22 | | U2, 44, 58, 79, **116**, **132**, **150**, **185** | **97**, **141**, **176** |
| **Urban fabric** | 32, 62 | 7, 23, ~~82~~, **151** | 38, 54, 68, 92, **165**, **173** | 47, **109**, ~~**160**~~ | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103**, **110**, **118**, **124**, **143**, **180** | **133** |
| **Transport** | 2, 9, 21, 31, 48, **164** | 77 | 28, 39, 55, 63, **112**, **121**, **128**, **155**, **179** | 5, 15, **138** | U4 | U1, U3, 70, 85, 87, 94, **146** | **105**, **171** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107** | 36, 59, 66, 80, 91, **149**, **158**, **175** | 45 | | 73, ~~**114**~~, **168** | 52, 122, **140**, **184** |
| **Sky & atmosphere** | 27, 43 | | 19, 35, 50, 57, 95, **135**, **153**, **161**, **181** | | | 61, 81, 89, **115** | ~~**134**~~, **144** |
| **People & activity** | 41, 56, **127**, **170**, **186** | 49 | 34, 64, 93, **104**, **119**, **145**, **178** | 78, **111** | | 84, **137**, **163** | 71, **154** |

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
  Sky **181** · People **186** · Transport **179** · Urban **180** · Nature **183** · Civic **184** · Water **185**. (162, **167**, **172**, **177**, **182** = step-backs, no domain lap.) **186 took People × New element (the park café tables fill with seated day-only patrons — the 455-strong `cafes` surface put out parasol tables since before the ledger but never a single diner, the same amenity-with-no-people seam 127 found on the picnic lawn; `hashCell`-scattered, `LITAMT<0.5` so the terrace empties at night; draw-only stream+pop-neutral, `probe-cafepatron` CAFE day 0.93–0.99% → night 0.00% byte-identical, PARKC+ROAD ctls ~0, 3 seeds; a seed-7 agent FAIL claiming day/night INVERSION was disproven by the probe — its "night figures" were the base shop's lit windows. NB a later same-case draw (pond/fountain, `v<0.32`) OVERDRAWS the tables, so the shot selector hunts a `v>=0.44` front-most café). Next is the mandated STEP-BACK at 187; the next domain lap (188) owes Transport (179), then Urban (180)/Sky (181). **184 took Civic × Interaction/UX (the town hall clock tells its time on hover — a `Clock` row via a new `clockWord(dayT)`, reading the same slow day clock the drawn hand has pointed at since 149; kind repeated 183 because every other Civic kind is spent-or-hot, and saturation beats kind-rotation (118); draw-nothing tooltip, pop+stream flat, `probe-hallclocktip` clock-match 7/7 × 3 seeds, 7 distinct times across the day, non-hall control 500/500 clean). So the next domain lap (185) owes Water (176), then People (178)/Transport (179)/Urban (180). 185 took Water × Polish (wind-driven whitecaps break on the open swell — sparse seeded `hashCell` foam caps on open water beyond the coastal shelf `rDeep>SHELF1`, day-only via `LITAMT<0.6` so the night hands off to the moonglade; the one texture the flat daytime mid-ocean lacked, aimed at the biggest untouched water SURFACE not another coast entity; draw-only stream+pop-neutral, `probe-whitecap` SEA 0.21-0.30% day ≫ SHELF ≤0.07 ≫ LAND 0 → night 0, 3 seeds; agents "just right, slightly faint" after a size/alpha bump). So the next domain lap (186) owes People (178), then Transport (179)/Urban (180); step-back still at 187.**
  **Stalest by number is Sky (161), but Sky is post-saturation (Deepen/Fix ONLY — additive/CA cells are traps). 173 took Urban × Deepen (the warehouse north-light clerestory — closing the roof-furniture set city-wide; see below), so the next domain lap (174) owes Nature (166)/Civic (168)**, then Water (169)/People (170)/Transport (171). **174 took Nature × New element (rolled hay bales on the stubble fields post-harvest, `probe-haybale`). **175 took Civic × Deepen (the parliament floodlights its facade — a warm uplight wash up the colonnade at night, matching the museum's dusk floodlight; the grander "tallest civic roof" only lit its dome/lantern while the museum lit its facade — the banked 168 Civic Deepen candidate; draw-only stream+pop-neutral, `probe-parliament` FACADE 24–38% at night → 0.00% day, ROAD ctl ~0, 5 seeds; joins the night-mood run moon/stars/observatory/biolum/amphitheater). **176 took Water × Interaction/UX (the river names its course — a `Course — N hexes` row via a bridge-AWARE flood `riverCourse` so a span doesn't fragment the reach; the river was the barest tooltip in the city, zero data rows over its richest water system; a `Crossings` companion was DROPPED — bridge cells over-count vs connected components and the L1633 pave-over rule makes the unit ambiguous; draw-nothing tooltip, pop+stream flat, `probe-river` 254 river hexes named 3 seeds, sea control clean 1916 hexes, sea-leak 0). So the next domain lap (178) owes People (170)/Transport (171).** 171 took Transport × Interaction/UX (the boulevards name themselves, `probe-boulevard`); 170 took People × New element (the pier's day-only anglers, `probe-anglers`). **178 took People × Deepen (the festival streets fill with people — a day-and-dusk crowd of `hashCell`-scattered figures mills on each `c.fete` ROAD cell under the bunting, then heads home by deep night; a People×Civic interconnect on a drawn CA system that was rendered for the artifact's whole life but never *inhabited*; draw-only stream+pop-neutral, `probe-fetecrowd` FETE day 2.9–3.6% → night 0.00% byte-identical, ROAD ctl ~0, 3 seeds). **179 took Transport × Deepen (the bridges light their lamps at night — the bridge sub-case `break`s before the road's night-lamp block, so every bridge went pitch dark at night for the artifact's whole life while both banks glowed; two warm rail lamps atop the deck + a `waveT` reflection on the river below, a Transport×Water interconnect; draw-only stream+pop-neutral, `probe-bridgelamp` BRIDGE night 7.4–8.1% → day 0.00% byte-identical, ROAD ctl 0.00% both, 3 seeds). So the next domain lap (180) owes Urban (173, Deepen/Polish only — measured-saturated).** **180 took Urban × Polish (the towers ground their own weight — the fixed 0.42×0.13 contact shadow under every building now scales with mass `shf=clamp((h-9)/120,0,1)`, so a 150-unit tower grounds on a 0.94/0.23 pool while a bungalow keeps the old blob; centered in the house style since nothing in the artifact casts a directional shadow, draw-only stream+pop-neutral, `probe-massshadow` TALL 0.6–1.0% ≫ SHORT/CTL ~0.05% 3 seeds; the first scaling was too weak because the tower body occludes its own base shadow — size for the ring not the area). So the next domain lap (181) owes Sky (161, Deepen/Fix ONLY — saturated), then the step-back at 182.** **181 took Sky × Deepen (the sea catches the golden hour — bright additive-gold sun-path glints on the open water at dawn/dusk, reading 161's reusable `cwarm`/`skyBot` signal onto the largest surface in the frame, filling the gap between the noon glitter and the night moonglade; a Sky×Water interconnect, draw-only stream+pop-neutral, `probe-seagold` SEA dusk ~31%/dawn ~22% → noon/night ~0, LAND ctl 0 all frames, 3 seeds. ⚠ A warm alpha WASH over teal desaturates to OLIVE — carry sunset/warm light over cool water with ADDITIVE `'lighter'` glints, not a wash; two tuning rounds were lost raising a wash's alpha before the blend mode was the real fix. `GWARM`/`GWSB` are now globals beside `LITAMT` for any golden-hour draw.)** 171's fete-street TOOLTIP (`c.fete` drawn but unnamed in `describeTile`) is still banked, and now more worth cashing since the street is no longer empty. **182 was the mandated STEP-BACK — ELEVENTH clean bill in a row (perf 178→181 flat: day +1.0% / night +0.9% vs iter-177 `7e2ac2c`; seasons alive FARM dry-peak 88.4; night core off-centre both seeds ~(.47,.50)/(.47,.60)). No city change.** **183 took Nature × Interaction/UX (the fields name their own harvest — a `Fields` crop-phase row in the FARM tooltip via a shared `farmPh(v)`, the biggest agricultural surface, the one 148's "agriculture tell spent" note had OVERLOOKED; draw-nothing tooltip + byte-identical one-predicate refactor, pop+stream flat, `probe-farmtip` 3 seeds). So the next domain lap (184) owes Civic (175), then Water (176)/People (178)/Transport (179).** Next step-back at **187** (interleave HEAD vs iter-182's file to isolate 183–186). **Urban is measured-saturated now: additive spent (118), Connect measured-hard TWICE (160 RES terracing, 165 high-street arcade — the `hstr` parade zigzags with parity, longest straight-hex-axis run = 2, so it is not a clean arcade host); Urban's next lap is Deepen/Polish only** (or a COM arcade if a *straight-hex-axis* retail run is ever found — the parade is not one). Roof-furniture is now CLOSED city-wide across all 5 developed types (MID/RES water tanks, TOWER gardens, COM plant 165, IND warehouse north-light clerestory 173) — no bare roof left, so a future Urban "bare roof" vector has no host; Urban Deepen must go elsewhere (facades, ground plane, harbour apron). Check the last entry of the stalest domain for a banked
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
  asserts-less-than-the-code-knows tell is now SPENT for agriculture** (orchard 129 + vineyard 148 + **FARM 183** —
  183 closed the biggest host, which 148's "spent" note had OVERLOOKED: a `Fields` phase row on `farmPhase(c.v)`,
  `Ploughed under`/`Sprouting`/`Standing crop`/`Ripening to straw`/`Cut for harvest`); GARDEN's draw
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
  **Iteration 187 is the next holistic step-back** (105, 110, 115, 120, 125, 130, 136, **142**, **147**, **152**, **157**, **162 done**, **167 done**, **172 done**, **177 done**, **182 done**, …).
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

> **Archive:** the 179 entries before Iteration 177 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

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

## Iteration 178 — the festival streets fill with people (2026-07-12) [People & activity × Deepen]

**Vector.** People & activity × **Deepen** (SHIPPED). Rotation named the stalest domain: 178 owed **People (170)**
or **Transport (171)**; People is staler by number. Kind varied off People's recent run — New element (170), Polish
(163), Interaction/UX (154) — to a **Deepen** that *interconnects* People with an existing **Civic** system (the
highest-yield move per the skill). Last People Deepen was 145 (beach furniture sun); Deepen is globally hot but the
domain rotation is what's binding here.

**The seam — a drawn Civic system that no person ever used.** Since long before the ledger, `tick()` (L1853)
computes `c.fete`: where two civic institutions front the same short stretch of street, the blocks between them
string up **bunting** (a "civic mile"), drawn as pennants + evening lights (L4133). But the festival street stood
**empty for the artifact's whole life** — bunting over a lifeless road. Populating it is a clean People×Civic
interconnect. Confirmed at scale first (dead-code law): `c.fete` = **10/16/19 cells** on seeds 42/7/1234 (`node -e`
count), a real host, not dead code.

**Change (~24-line draw, all draw-only).** Inside the `if(c.fete)` block, after the bunting: a small crowd of
festival-goers on each fete cell. Up to 5 figures, `hashCell`-gated (`seedNum^0x3F1A>0.68` skip) so counts vary,
scattered in an ellipse around the cell centre (`hashCell` angle + radius 2.0–5.6px) with a gentle `Math.sin(time)`
sway; body colour from `coral/gold/teal/lav/sage`; house-style `shadS` contact shadow at the feet (137/163). Day
fade `faa=clamp((0.82-LITAMT)/0.28,0,1)` on the slow light clock — the crowd is out by **day and into the dusk**
(when the strand lights up), then **home by deep night** (a rhythm, not a strobe; matches the anglers/umbrellas).
No tile, entity array, `rng()`, `hashCell`-terrain, `tick()` pass or terrain change; strings pure-ASCII (134). Pop
+ stream provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, all core metrics **+0**, entity counts identical
(`towerHt +1` = documented RAF tick-count jitter). Vacuous by construction (draw-only) — the probe is the gate.

**Probe — `probes/probe-fetecrowd.mjs` (new, promoted).** Diffs PATCH vs HEAD over the `c.fete` ROAD cells' screen
boxes at a frozen frame, day + night, with non-fete ROAD cells as the control. seeds 7/42/1234: **FETE crowd DAY
2.92% / 3.10% / 3.62% → NIGHT 0.00% / 0.00% / 0.00%** (faa→0, byte-identical); **ROAD control 0.00–0.01%** at both
frames. **PASS (3 seeds).** First cut of the probe read the night control at **77–88%** — the **163 load-timing
law**: the RAF loop runs a variable number of `tick()`s between load and freeze, so the *loaded* developed city
differs run to run. Rebuilding in-page (`genWorld(seed)` + `__warp(61)`) plus clearing the unseeded `STARS` field
and stubbing `Math.random` (163 law d) made the night frame byte-identical and collapsed the control to ~0 — the
crowd's absence at night is now proven, not swamped by non-reproducibility.

**Visual.** Downtown clip + whole-city `wide`, day, seeds 42 & 7. Two agents, both **PASS**: festival bunting found
in the civic core with **little standing figures clustered on the road beneath it**, feet grounded on the hex grid,
contact shadows reading; **no z-order tears, floaters, or blown-out color** anywhere; whole frame still a balanced,
bright coastal city (towers/parks/river/beach/pier all coherent), the crowds adding life without clutter.

**Verdict — SHIPPED.** The civic mile — bunting-strung but deserted for the artifact's whole life — now fills with a
day-and-dusk crowd milling under the pennants, and empties by deep night. A People×Civic interconnect on a drawn
system nobody used: draw-only, pop + stream flat, ~24 lines + a probe. People's Deepen cell gains its next (34, 64,
93, **104**, **119**, **145**, **178**); People is no longer stalest (Transport 171 now is). The next domain lap
(179) owes **Transport (171)**, then the step-back at **182**.

### Findings for later laps
- **A DRAWN CA-DERIVED SURFACE CAN BE FULLY RENDERED YET NEVER *INHABITED* — that gap is a clean People×domain
  interconnect.** `c.fete` had bunting, evening lights, its own tick-pass derivation, and a census stat, but no
  person had ever stood on it. Populating a *drawn-but-lifeless* surface (like 127's PARK picnics on 878 empty
  hexes) is the surface-not-entities move aimed at an existing SYSTEM rather than raw terrain — and it's a Deepen,
  not a New element, because it enriches something already there. Look for other drawn-but-empty surfaces: does
  anyone ever *use* the amphitheater stage (168), the observatory terrace, the market stalls?
- **THE 163 LOAD-TIMING LAW BITES ANY PATCH-vs-HEAD DIFF AT A DEVELOPED, NIGHT FRAME — rebuild in-page BY DEFAULT.**
  The first probe cut read a 77–88% *control* at night purely because the two loads had ticked a different number
  of times. Day happened to be clean (control 0.02%), which is a trap: a probe that passes its day control but not
  its night one is not "half working," it is *non-reproducible* and its day number is luck. Start every build-vs-
  build probe with `genWorld(seed); __warp(N); STARS.length=0; Math.random=()=>0.5` — don't wait for the night
  control to expose the non-determinism.
- **171 BANKED the fete-street TOOLTIP as a future Interaction vector (`c.fete` drawn but unnamed in `describeTile`)
  — STILL OPEN and now more worth cashing**, since the street it names is no longer empty. A treed road became a
  `Boulevard`; a fete road could name itself the festival mile with a `Festival — links <A> and <B>` row (the two
  institutions its `feteId` chain runs between). Deliberately left out of 178 to keep this a pure People Deepen and
  not poach 171's banked Interaction seam.

## Iteration 179 — the bridges light their lamps at night (2026-07-12) [Transport × Deepen]

**Vector.** Transport × **Deepen** (SHIPPED). Rotation named the stalest domain, **Transport (171)** (178 was the
People lap). Kind varied off Transport's recent run — Interaction/UX (171), New element (164), Polish (146) — to a
**Deepen** that *interconnects* Transport with **Water** (the reflection). The vehicle/road/monorail/gondola
systems are all measured-saturated; the seam here was a genuine *gap*, not another ornament.

**The seam — the one unlit road in the city.** The `T.ROAD` draw grew a rich night layer over many laps: arterial
lit corridors, ordinary-street lamp glows, boulevard lamps. But the **bridge sub-case breaks early** (L4023) —
`hexTile` water + a timber deck prism + a white railing band, then `break;` — *before* the `if(LITAMT>0.25)`
street-lamp block ever runs. So for the artifact's whole life every bridge went **pitch dark at night** while the
streets it joined glowed on both banks: a span of black cutting the warm river. Confirmed a real host first
(dead-code law): census `bridges` = **4–60 per era-cell**, 266 across the matrix, 20–60 in developed eras.

**Change (~14-line draw, all draw-only, inside `if(c.bridge)` before the break).** Gated `LITAMT>0.25` to match the
street lamps: two warm **rail lamps** (bright head + soft halo) atop the deck at its two span-ends (`hx2/hy2` from
the same `ew`/`0.52`·`HW`/`VR` extents the deck prism uses, so they land on the deck, not off it), plus a warm
**reflection** ellipse on the water just in front of the deck that breathes with `waveT` (the Transport×Water
interconnect). No tile, entity array, `rng()`, `hashCell`-terrain, `tick()` pass or terrain change; warm rgba only,
strings pure-ASCII (134). Pop + stream provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, all core metrics **+0**, `bridges 266` unchanged,
entity counts identical (`greenRoofs -1`/`towerHt +1` = documented RAF tick-count jitter, touches no `rng()`).
Vacuous by construction (draw-only) — the probe is the gate.

**Probe — `probes/probe-bridgelamp.mjs` (new, promoted).** Diffs PATCH vs HEAD over the `c.bridge` ROAD cells'
screen boxes at a frozen frame, **night + day**, with non-bridge ROAD cells as the control. Rebuilt in-page
(`genWorld`+`__warp`), `STARS` cleared, `Math.random` stubbed, movers cleared, clock frozen (163 law) so the night
frame is reproducible. seeds 7/42/1234: **BRIDGE lamps NIGHT 8.11% / 7.52% / 7.43% → DAY 0.00% / 0.00% / 0.00%**
(LITAMT 0.02, byte-identical, no draw); **ROAD control 0.00%** at both frames, all three seeds (20–60 bridges each).
**PASS (3 seeds).**

**Visual.** Night `wide` + `downtown`, seeds 42 & 7. Two agents, both **PASS**: warm paired rail lamps found on the
deck of every river crossing, sitting on the deck (not floating), the reflection reading as an *attached* smudge
under the deck edge, towers correctly occluding decks (z-order intact); **no tears, floating lamps, or blown-out
blobs**; the whole night frame still a balanced coastal city (streets/windows warm, sky + water dark, moon clear) —
the lamps fill in the previously-dark bridges rather than adding clutter.

**Verdict — SHIPPED.** The one road that went dark at night — the bridge deck, which `break`s before the street-lamp
block — now lights its rail lamps and casts them warm on the river, joining the night-lit street network across the
water. A Transport×Water interconnect: draw-only, pop + stream flat, ~14 lines + a probe. Transport's Deepen cell
gains its next (…155, **179**); Transport is no longer stalest (Urban 173 now is). The next domain lap (180) owes
**Urban (Deepen/Polish only — measured-saturated)**, then the step-back at **182**.

### Findings for later laps
- **AN EARLY `break` IN A DRAW CASE CAN STARVE A SUB-VARIANT OF A WHOLE LAYER THE MAIN PATH GREW LATER.** The bridge
  sub-case was written before the road's night-lamp layer existed, and its `break;` meant every lamp/corridor pass
  added afterward silently skipped the bridges — a dark seam nobody noticed for the artifact's life because the
  per-feature visual gate always zoomed on the *new* lamp, never re-read the bridge. When a tile has a `break`-ing
  sub-case (bridge, station, forecourt…), check what shared later blocks it forfeits. Candidates to audit: does the
  bridge deck get street *trees*/*fete*/*treed* handling? (It breaks before all of them.)
- **A REFLECTION IS THE CHEAPEST Transport×Water INTERCONNECT AND IT READS AT FIT.** A warm ellipse on the water in
  front of a lit structure, `waveT`-modulated, costs one `ellipse` and turns an isolated light into a light *on the
  scene*. Anything that lights up beside water (the pier, lifeguard tower, a harbour crane, a moored ship) can pool
  a reflection for near-free — and unlike a thin ribbon, a glow-on-dark-water clears the contrast×width bar at fit.

## Iteration 180 — the towers ground their own weight (2026-07-12) [Urban fabric × Polish]

**Vector.** Urban fabric × **Polish** (SHIPPED). Rotation named the stalest domain, **Urban (173)** — the header owed
the 180 lap to Urban, Deepen/Polish only (Urban is measured-saturated: additive spent 118, Connect measured-hard twice
160/165, roof-furniture closed city-wide). Kind varied HARD off the globally hot **Deepen** streak (173/175/178/179 all
Deepen) to a **Polish** — improve something already there, add nothing. Urban's last Polish was 143.

**The seam — one shadow blob for every building, tower or bungalow.** `drawBuilding` opens with
`shadowEl(gx,gy,0.42,0.13)` (L4321) — a **fixed** centered contact ellipse dropped under every RES/MID/COM/TOWER cell,
regardless of mass. So a 150-unit ziggurat and a 9-unit house cast the **identical** ground shadow for the artifact's
whole life, while every *other* diorama element responds to its context (umbrellas follow the sun 145, glitter 150,
crowds cast shadows 137/163). The house style for shadows is a **centered** contact ellipse everywhere (cars, peds,
crowds, trees all use `shadS`), so a directional rake was rejected as style-breaking — the right Polish keeps it
centered and sizes it to the building's mass.

**Change (2 lines, draw-only).** `shf=clamp((h-9)/120,0,1)` (0 for houses, ~1 for the tallest towers) now scales the
shadow: `shadowEl(gx,gy, 0.42+shf*0.52, 0.13+shf*0.10)` — a house keeps the old 0.42/0.13 blob, a tall tower grounds
on a 0.94-radius, 0.23-alpha pool. Still a centered ellipse in the house style, radius capped so a dense core grounds
without darkening into clutter. No tile, entity, `rng()`, `hashCell`, `tick()` pass or terrain; `clamp` already
defined (L182); pure-ASCII (134). Pop + stream provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, all core metrics **+0**, `greenRoofs +1`/`towerHt
+1` = documented RAF tick-count jitter (touches no `rng()`). Vacuous by construction (draw-only) — the probe is the
gate.

**Probe — `probes/probe-massshadow.mjs` (new, promoted).** Diffs PATCH vs HEAD over each building's base box at a
frozen day frame (t=0.35), split by height to prove the shadow **scales with mass**: TALL (shf>0.4, the big towers),
SHORT (shf<0.05, houses/walk-ups — shf≈0 so ~unchanged), CTL (non-building EMPTY/PARK). Rebuilt in-page
(`genWorld`+`__warp`), STARS cleared, `Math.random` stubbed, movers cleared, clock frozen (163 law) so the frame is
reproducible. seeds 7/42/1234: **TALL 1.02% / 0.79% / 0.61% >> SHORT 0.08% / 0.05% / 0.04% ~ CTL 0.10% / 0.06% /
0.04%** — a monotone height-gated darkening, ~10–15× the house/ground floor (SHORT/CTL residual is neighbouring
towers' enlarged pools leaking into edge boxes). **PASS (3 seeds).** First cut (shf*0.32/0.055) read TALL only
0.03–0.11% — the tower body **occludes its own base shadow**, so only the ring around the footprint shows; pushing the
scale to 0.52/0.10 made the visible pool read without over-darkening.

**Visual.** BEFORE (HEAD) vs AFTER downtown clips + AFTER whole-city `wide`, day, seeds 42 & 7. Two agents, both
**PASS**: the taller-building grounding is **visible** (bigger/darker soft pools under the tower clusters, houses
unchanged), pools sit **centered on the footprints** with no directional smear or misalignment; the downtown ground is
**NOT murk** — darkening stays local to tower bases, roads/plazas/grass between them keep their tone; **no z-order
tears, floaters, or blown-out color** anywhere; both called the whole frame a balanced, beautiful coastal city, the
grounding *improving depth* by anchoring the towers.

**Verdict — SHIPPED.** The one-size-fits-all contact shadow — identical under a bungalow and a 150-unit tower for the
artifact's whole life — now scales with building mass, so downtown's towers ground with real visual weight while houses
are untouched. A centered contact ellipse in the house style, draw-only, pop + stream flat, 2 lines + a probe. Urban's
Polish cell gains its next (…143, **180**). The next domain lap (181) owes **Sky (161, Deepen/Fix only — saturated)**,
then the mandated **step-back at 182**.

### Findings for later laps
- **A SUBTLE DRAW-ONLY CHANGE ON A SELF-OCCLUDING HOST NEEDS ITS SCALE PUSHED PAST THE OCCLUDER.** A building's contact
  shadow is mostly *hidden under the building*, so enlarging it only exposes a thin ring around the footprint — the
  first (modest) scaling measured 0.03–0.11% and would have failed the "is it visible" gate. When the thing you polish
  is drawn *under* the thing that occludes it (a base shadow, a plinth, an undercroft), the visible signal is only the
  overhang; size the change for the *ring*, not the *area*, and let the probe tell you when it clears the floor.
- **THE HOUSE STYLE FOR SHADOWS IS A CENTERED CONTACT ELLIPSE — a directional rake would break it.** Every mover and
  structure grounds with a centered `shadS`/`shadowEl`; nothing in the artifact casts a directional shadow. A
  raking/leaning building shadow was considered and rejected on *consistency* grounds before it was ever coded
  (buildings raking while cars/people/trees don't would read as a mismatch), and the centered-but-mass-scaled version
  is the one that fits. When polishing a shared visual idiom, match the idiom the rest of the scene already uses.
- **`shadowEl` STILL IGNORES DAYLIGHT.** The contact shadow is drawn unconditionally at the same alpha day and night;
  it now scales with mass but not with the sun. A future Sky×Urban interconnect could soften it toward dusk (fainter
  as the light flattens) the way 145/150 tie beach/sea to `LITAMT` — but keep it centered (house style) and beware the
  night frame, where `rgba(40,32,20,a)` over dark ground already reads as little.

## Iteration 181 — the sea catches the golden hour (2026-07-12) [Sky & atmosphere × Deepen]

**Vector.** Sky & atmosphere × **Deepen** (SHIPPED). Rotation named the stalest domain, **Sky (161)** — and the header
mandates Sky is **Deepen/Fix ONLY** (post-saturation: additive/CA cells are traps). Kind is therefore forced to Deepen
(varied off the globally-hot Deepen run only by domain — Sky is genuinely the owed lap). A Sky×Water *interconnect*,
the highest-yield move: it adds no element, it applies an existing Sky signal to an existing surface.

**The seam — the sea is untouched at the most beautiful light of the day.** The open sea already responds to two
lights: a **cool sun glitter** at noon (L3160, peaks at `dayT` 0.47, gone by dusk) and the **night moonglade** (L5938,
`LITAMT>0.5`). But at **golden hour** — dawn/dusk, when the sky blazes warm (`skyBot` orange) and iter 161 warms the
cloud bellies — the sea stayed cold: the noon glitter has faded and the moonglade hasn't lit. 161's own finding flagged
`cwarm` (its `skyBot` golden-hour gate) as **"a reusable golden-hour signal"**; this cashes it on the largest surface
in the frame. A global `GWARM`/`GWSB` is set once per frame from `dl.skyBot` beside `LITAMT` (same `clamp((R-B-70)/70)`
as 161), so the sea reads the exact signal the clouds do.

**Change (~18-line draw + 2 globals, all draw-only).** In the `T.WATER` case (open water, `!c.riv`), gated `GWARM>0.02`:
a faint warm base wash tinted toward `skyBot`, plus — the load-bearing part — bright **additive** (`globalCompositeOperation
='lighter'`) warm-gold glint dashes that shimmer with `waveT`. No tile, entity, `rng()`, `hashCell`, `tick()` pass or
terrain; `save`/`restore` brackets the composite change; strings pure-ASCII (134). Byte-unchanged at noon and night
(GWARM=0). Pop + stream provably flat.

**Census.** PASS, exit 0, pageerrors 0 (re-run on final code). Tile histogram **empty**, all core metrics **+0**, entity
counts identical (RAF tick-count jitter only). Vacuous by construction (draw-only) — the probe is the gate.

**Probe — `probes/probe-seagold.mjs` (new, promoted).** Diffs PATCH vs HEAD over open-water cells' screen boxes at a
frozen frame, at **dusk / dawn / noon / night**, with land (RES/FOREST/MID) as the spatial control. Build-vs-build at the
SAME frame (161 law) so the ambient golden-hour tint — which noon/night lack — is NOT counted as signal, only the sheen.
Rebuilt in-page + STARS cleared + `Math.random` stubbed + movers cleared + clock/`waveT` frozen (163). seeds 7/42/1234:
**SEA DUSK 30.9%/31.3%/31.0% · DAWN 21.8%/21.8%/22.7% → NOON 0.00% · NIGHT ~0.00%** (GWARM 0.62/0.43 → 0/0);
**LAND control 0.00% at every frame, every seed.** **PASS (3 seeds).**

**Visual — three rounds; the tuning is the story.** First build (wash `sheet*0.18`): two agents PASS but both "too
subtle." A wash-alpha bump (0.22, then 0.42) did NOT fix it and a sharper-framed agent FAILed it — **orange-over-teal is
near-complementary, so an alpha wash muddies toward olive instead of reading gold** (an agent literally saw "olive-gold").
The moonglade solves the same night problem with bright *additive* glints that pop over any water tone, so the final
build pulls the wash back to 0.20 and carries the light in **additive gold glints**. Re-shot (wide + coast, seeds 42 & 7),
two agents both **PASS**: gold sparkle glints clearly register on open water only (not river/beach/land/piers), the sea
still reads as teal water (no orange slab), no blown-out color / z-order tears / floaters, whole frame a balanced beautiful
coastal dusk.

**Verdict — SHIPPED.** The sea — cold at the most beautiful light of the day, between the noon glitter and the night
moonglade — now catches a warm gold sun-path at dawn/dusk, reading 161's `cwarm` signal onto the water. A Sky×Water
interconnect, draw-only, pop + stream flat, ~18 lines + a probe. Sky's Deepen cell gains its next (…161, **181**); Sky is
no longer stalest. The next iteration (**182**) is the mandated **holistic step-back**.

### Findings for later laps
- **A WARM WASH OVER TEAL WATER CANNOT READ AS GOLD — IT DESATURATES TO OLIVE (near-complementary alpha blend). Carry
  golden-hour / sunset light on water with BRIGHT ADDITIVE (`'lighter'`) GLINTS, not a broad alpha wash.** Two full
  tuning rounds were burned raising a wash's alpha (0.18→0.42) with agents still failing it "too faint" — the alpha was
  never the problem, the *blend mode* was. This is the moonglade's own trick (it twinkles, it doesn't wash), and it is a
  general rule for tinting one surface toward a near-complementary light: additive points pop over any base; an alpha
  wash of the complement just greys the base. Reach for `globalCompositeOperation='lighter'` (bracketed by save/restore)
  the next time a warm light must read over cool water (or vice versa).
- **`GWARM`/`GWSB` ARE NOW GLOBALS (set once per frame from `dl.skyBot`, beside `LITAMT`).** Any draw that wants "how
  warm is the low sky right now, and toward what colour" can read them for free — a future Sky×Urban golden-hour glint on
  west-facing tower windows (180's banked "windows catch the low sun"), a warm rim on the wind turbines, or a warm cast
  on the beach sand at dusk. Same shape as 161's cloud-belly warmth, now available city-wide.
- **JUDGE A COAST/WATER ORNAMENT AT COAST ZOOM — a warm sheen on the sea LOSES at wide zoom** because it competes with
  the warm sky and the off-map peach background for the eye (159's zoom-fairness law, seen again here: the seed-42 wide
  read "cool sea," the seed-7 coast read "beautiful gold"). The coast clip is the honest frame; keep a wide frame only to
  catch whole-city regressions, not to grade the ornament's presence.

## Iteration 182 — the sixteenth step-back finds a clean city, perf flat (2026-07-12) [holistic step-back]

**Vector.** The mandated holistic step-back (105/110/115/120/125/130/136/142/147/152/157/162/167/172/177/**182**). Not a
domain × kind lap: it reads the WHOLE city for *cumulative* drift the census and per-feature gates are blind to,
runs the season probe + interleaved perf gate, at night AND a season with the day/night baselines pinned OFF
January (`year=2035.62` dry peak; `2035.02` as the seasonal-contrast frame). No city vector taken, so rotation is
unchanged — the next lap (183) owes the stalest domains, **Nature (174)/Civic (175)**, then Water (176)/People (178)/Transport (179).

**What was read.** Un-zoomed whole-city `wide` frames at **2 seeds × 3 lights/calendars** — seed 42 (warp 61) &
seed 7 (warp 31), each at {day 2035.62/t=0.35, night 2035.62/t=0.90, winter 2035.02/t=0.35}. One subagent per
seed read its own three frames: the cumulative question ("has anything compounded into clutter or darkness?")
plus 108's **locate-don't-judge** night test ("where is the core by light alone?") and a season-distinctness check.

**Result: the city is healthy — both agents VISUAL: PASS.**
- **Night core (115/143) LOCATED off-centre by light alone both seeds** — seed 42 ~(0.47,0.50), seed 7 ~(0.47,0.60)
  — matching 177 ((.48,.50)/(.53,.60)), 172 ((.47,.55)/(.45,.62)), 167 ((.47,.50)/(.50,.62)); each a genuine warm
  bright-core → dim residential mid-ring → dark rim → near-black ocean falloff, not a flat wash, with lit transit
  lines threading out (138 arterials hold). Both agents independently reported the warm core mass + the falloff
  gradient + the golden street/rail chains.
- **All recent vectors sit correctly in the whole frame** — 178's fete crowd, 179's bridge lamps, 180's mass-scaled
  contact shadows, 181's golden-hour sea glints — with pier/ferris/wind-farm on the water plane and the block grid
  still separating cleanly. **No z-order tears / floaters / hard seams / blown-out white / mojibake** in any of the
  6 frames; stat strip + labels crisp both seeds (`·`, em-dashes, "WAXING CRESCENT/GIBBOUS" all render correctly,
  no `Â·`). **Winter reads distinct** from the golden-hour day frame at both seeds (bare/stubble-striped farm plots,
  duller desaturated vegetation, cooler sky/sea) — mild California winter by design (120's evergreen/irrigated
  dilution), no snow; both agents noted the shift is gentle-but-clear, terrain-borne not HUD-borne.

**Season — measured alive.** `probes/probe-season.mjs`: FARM winter→dry-peak **88.4** (matches
130..177 ≈87.6), VINEYARD 44.6/36.7/42.7 (139), FOREST 20.6/19.7/**30.7** (autumn litter holds at 166's level),
ORCHARD 25.3/17.8/41.4, MEADOW/SHOREPARK move, PARK/REDWOOD/GARDEN/QUAD near-zero by design (120), ROAD control
**0.5–2.1**. Calendar working; the four-season forest floor (156/166) is real.

**Perf — 178→181 cost ~ZERO (within machine noise).** Interleaved HEAD-181 vs the iter-177 file (`7e2ac2c`,
A/B/A/B ×3, **min per variant**, one process so both eat the same machine load): day **35.89 vs 35.55ms**
(**+1.0%**) and night **42.0 vs 41.61ms** (**+0.9%**). So 178 (fete crowd, day-and-dusk) + 179 (bridge lamps,
night-only) + 180 (mass shadow, day roof/ground draw) + 181 (sea gold, dawn/dusk additive glints) added ~1%,
inside the ±30% headless swing this box shows for identical code — i.e. flat, no drift to act on. Absolute
numbers run a touch above 177's (34.4/40.5) purely as today's load; the honest reading is the interleaved delta.
NOT re-pinning the stored baseline (it reads inflated on today's load per 167's reflexive false-FAIL; re-pin only
if an interleave *itself* shows a persistent offset — it has not since 142's real +2.2%). Census PASS, vacuous
(no source edit); tree clean.

**Change (the step-back's product — none to the city).** No compounding defect, so per
120/130/136/142/147/152/157/162/167/172/177 ("a clean step-back is a complete iteration — don't force a filler
vector") the output is the health record + header refreshes: step-back pointer 177→182 (next 187), the eleventh
clean bill, and the 182 interleaved perf reading. No `solvista.html` edit.

**Verdict — FIXED.** No compounding city defect — the ELEVENTH clean step-back in a row (130, 136, 142, 147, 152,
157, 162, 167, 172, 177, 182). All accumulated visual laws (115/116/120/123 + 138 arterials + 143 CBD peak) still
read at both seeds under all three lights; the season is alive (166's autumn litter still in FOREST's probe, 139's
vineyard moving); perf is flat against the honest interleaved control.

### Findings
- **ELEVENTH CONSECUTIVE CLEAN STEP-BACK — the loop's late-game equilibrium is holding.** Four more laps of
  draw-only / interconnect vectors (178 fete crowd, 179 bridge lamps, 180 mass shadow, 181 sea gold) landed since
  177 with ~ZERO measurable perf cost and no cumulative visual drift. The surface-not-entities /
  deepen-what-exists discipline keeps adding life to *untouched surfaces & existing systems* (an empty drawn CA
  street, a dark bridge deck, the base of every building, the open water at golden hour) rather than piling more
  entities onto a saturated coast — which is exactly why nothing compounds. Pattern: 125→…→177→182.
- **THE INTERLEAVE-VS-A-STEP-BACK-FILE IS NOW THE STANDING PERF METHOD, and it read +1.0%/+0.9% against a file 5
  iters old (`7e2ac2c`, iter 177).** The stored baseline remains untouched and would false-FAIL; the only
  trustworthy number is HEAD vs a pinned older commit's file in ONE process. **The next step-back (187) should
  interleave HEAD vs THIS iteration's file (Iter 182 / whatever 186 leaves, anchor `<SHA-182>`) to isolate
  183–186's cost.**
- **Night is still the slowly-accumulating column and it moved a hair (+0.9%) — 179's bridge lamps are the one of
  178–181 that draws at night, and they are a bounded per-bridge draw, not a per-cell field.** Night remains the
  column a future step-back watches first (≈42ms/24fps at today's load), but +0.9% is inside noise and no
  perf-fix iteration is owed. The night draw budget is being spent carefully — bounded landmark/edge lights
  (175 parliament, 179 bridges), never a full-frame night pass.

## Iteration 183 — the fields name their own harvest (2026-07-12) [Nature × Interaction/UX]

**Vector — Nature × Interaction/UX** (SHIPPED). Rotation named the stalest domain, **Nature (174)** (Civic 175 was the
next-owed, staler by number is Nature). Kind varied HARD off the globally-hot **Deepen** streak (178/179/181 all Deepen,
180 Polish) to an **Interaction/UX** — no recent iteration was one (last was 176, Water). A draw-nothing tooltip vector:
a guaranteed-flat, pop+stream-neutral ship.

**The seam — the biggest agricultural surface, unnamed.** Orchard names its `Grove` season (129) and vineyard its
`Vines` season (148), each reading the same `year`-phase its draw paints. The **FARM** belt — the *largest* agricultural
surface (~150 fields), the strongest seasonal mover (winter→dry-peak 88), and the richest calendar of the three (5
phases: ploughed→sprout→standing crop→straw→cut stubble, plus 174's hay bales) — printed only the static
`TILEDESC[FARM]` "Row crops on the golden hills." and said nothing about *where in the year* the field stood. The header
had even declared "the agricultural asserts-less-than-code tell is SPENT (orchard 129 + vineyard 148)" — but it
**overlooked FARM**, whose calendar is the most elaborate of all and which 174 had just deepened. A genuine open seam,
the exact 129/148 shape on a bigger host.

**Change (~8 lines, tooltip-only + a shared-predicate refactor).** Extracted the field's per-cell phase clock into a
shared `farmPh(v)` = `((((year%1)+1)%1-(v-0.5)*0.10)%1+1)%1` (the 112 one-predicate law) and routed the FARM **draw**
through it (was inline `s`/`ph` at L3792 — algebraically identical, so byte-unchanged pixels). Added `farmPhase(v)`
mapping `farmPh` to a word on the draw's own boundaries (`<0.06||>=0.93` ploughed · `<0.20` sprouting · `<0.52` growing ·
`<0.80` ripening · else harvested), and a `describeTile` `Fields` row reading `farmPhase(c.v)`: **Ploughed under /
Sprouting / Standing crop / Ripening to straw / Cut for harvest**. Since each field runs ±5 weeks off its neighbours
via `c.v`, the belt names a *patchwork* of phases, not one word. No tile / entity / `rng()` / `hashCell`-terrain /
`tick()` pass / terrain change; strings pure-ASCII (134). Pop + stream provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, all core metrics **+0**, entity counts identical
(`solarRoofs -2`/`towerHt -1` = documented RAF tick-count jitter, touches no `rng()`; the `farmPh` refactor is
algebraically identical so the draw is byte-unchanged). Vacuous by construction (tooltip-only) — the probe is the gate.

**Probe — `probes/probe-farmtip.mjs` (new, promoted).** A logic probe on the 122/176 template: it **independently**
recomputes each field's phase word from `year` + `c.v` (its own copy of the ph formula + boundaries, not by calling
`farmPhase`) and asserts `describeTile`'s printed `Fields` word equals it. Rebuilt in-page (`genWorld`+`__warp`) at
**two calendars** — harvest 2035.88 and midsummer 2035.40. seeds 7/42/1234: **word-match 35/35 · 40/40 · 45/45 at
harvest, same at summer**; **non-FARM control (ROAD/RES/ORCHARD/VINEYARD) carries no `Fields` row, 400/400 clean**;
**calendar control: 'Cut for harvest' = all fields at harvest → 0 at midsummer** (proving the row reads the year, not a
static string — 174's calendar-control law). **VERDICT: PASS (3 seeds).**

**Visual — `probes/shot-farmtip.mjs` (new, promoted).** `shoot.mjs` can't hover; the shot script uses `__find('FARM')`
for a farm's clip-ready screen coords, pins the calendar in-page (freeze-the-clock law), hovers, and clip-shoots the
tooltip magnified. seed 42 @ harvest: tooltip reads `Farm | Row crops on the golden hills. | Fields | Cut for harvest
| Value 55%`; seed 7 @ midsummer: `... | Fields | Standing crop | ...` — no page errors. Two agents (one per seed),
both **VISUAL: PASS**: `Farm` title + `Fields` row visible and **legible** (no mojibake/clipping), hex cursor outline
seats on the hovered field, surrounding farms read as coherent row-crop fields, no z-order tears / floaters / blowout;
the whole-city frame (seed 42) still a balanced beautiful coastal city.

**Verdict — SHIPPED.** The farm belt — the biggest agricultural surface, richest calendar, deepened only last lap (174)
— now names its own harvest cycle on hover, a patchwork of phases reading the same per-cell clock the crop colour
paints. The asserts-less-than-code tell, closed for the agricultural surface the header had overlooked. Draw-nothing
tooltip + a one-predicate refactor, pop + stream flat, ~8 lines + a probe + a shot. Nature's Interaction/UX cell gains
183 (117/129/**148**/**183**). The next domain lap (184) owes **Civic (175)**, then Water (176)/People (178)/Transport
(179); step-back still at **187**.

### Findings for later laps
- **THE "ASSERTS-LESS-THAN-CODE" TELL WAS DECLARED SPENT FOR A DOMAIN WHILE ITS BIGGEST HOST WAS STILL OPEN.** The
  header said the agricultural tell was closed by orchard (129) + vineyard (148), but FARM — the *largest* of the three,
  with the *richest* calendar — was never named, and 174 had just deepened it. A "kind spent for domain X" claim in the
  header is about the *hosts touched so far*, not every host; before trusting a saturation note, grep the domain for the
  *biggest untouched instance* of the same seam. (Same shape as 127's "additive spent is about entities, not surfaces.")
- **THE ONE-PREDICATE REFACTOR IS FREE WHEN THE DRAW ALREADY COMPUTES THE PREDICATE INLINE.** FARM's draw computed `ph`
  inline; extracting `farmPh(v)` and pointing both the draw and the new tooltip at it cost nothing (algebraically
  identical, byte-unchanged pixels) and bought the 112 guarantee that the word can never drift from the colour. When you
  add a tooltip that names what a draw paints, prefer *extracting the draw's own expression* into a shared helper over
  re-deriving the value — you get correctness-by-construction, not a second definition to keep in sync (112/175's law).
- **GARDEN (2 hexes) is the last un-named agricultural tile, but its draw does NOT read `year` (129) — it needs a
  Deepen FIRST.** With FARM closed, Nature's Interaction/UX seam via the agricultural calendar is spent; the next
  Nature × Interaction/UX must be a *new* seam (e.g. does the barn/`c.v>0.9` outbuilding, or a REDWOOD stand's fire
  history beyond 117's `Undisturbed`, name anything the draw already tracks?).

## Iteration 184 — the town hall clock tells its time on hover (2026-07-12) [Civic & culture × Interaction/UX]

**Vector — Civic & culture × Interaction/UX** (SHIPPED). Rotation named the stalest domain: **Civic (175)** was owed and
staler by number than every other (Sky 181 · People 178 · Transport 179 · Urban 180 · Nature 183 · Water 176). On
*kind*: Civic's other kinds are saturated or hot — additive is spent (12 richly-drawn institutions + plazas with
statues/fountains/bunting), Deepen was JUST cashed last Civic lap (175 parliament floodlight) and is globally hot
(178/179/181), Polish (168) has no compounding defect to fix, and a terrain CA/Connect would perturb the seeded stream
for marginal payoff. The one clean, guaranteed-flat open Civic seam is the asserts-less-than-code tooltip tell — the
same seam 129/148/183 cashed. Kind repeats 183 (also Interaction/UX), but *saturation beats kind-rotation* (118's law):
when a domain's other kinds are all spent-or-hot, the kind that stays is the one that stays. Draw-nothing tooltip: a
pop+stream-neutral ship.

**The seam — a drawn clock that never told its own time.** The town hall draws a working 24h clock (iters 135/149):
the hand reads the slow day clock `dayT` — straight up at noon, down at midnight — "the clock the town sets its watches
by" (its own L4825 comment). Yet its tooltip (`CIVICDESC[hall]`) named only the chambers and the clerk and said nothing
of the *hour the hand points at*. The exact orchard(129)/vineyard(148)/farm(183) shape — a draw that tracks a live
quantity over a tooltip that stays mute — but on the slow **time** clock rather than the year, so it can never strobe
(134's law: `dayT` ~110 s/cycle is the legible clock, unlike the fast `year`).

**Change (~10 lines, tooltip-only).** Added `clockWord(t)` beside `phaseWord`/`moonWord`: `mins=round(((t%1+1)%1)*1440)
%1440`, formatted 12-hour `H:MM AM/PM`, pure-ASCII (134). Added one `describeTile` row inside the `c.t===T.CIVIC` block:
`if(c.kind==='hall')data.push(['Clock',clockWord(dayT)])` — reading the SAME `dayT` the drawn hand uses (up=noon convention
matches: `dayT` 0=12:00 AM, .25=6:00 AM, .5=12:00 PM, .75=6:00 PM). No tile / entity / `rng()` / `hashCell` /
`tick()` pass / terrain change. Pop + stream provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, all core metrics **+0**, entity/life/transport counts
identical. Vacuous by construction (tooltip-only) — the probe is the gate.

**Probe — `probes/probe-hallclocktip.mjs` (new, promoted).** Named to distinguish it from iter 149's
`probe-hallclock.mjs`, which grades the *drawn hand*; this grades the *tooltip row*. On the 122/183 template it
**independently** recomputes `clockWord` from `dayT` and asserts `describeTile`'s printed `Clock` word equals it across a
full day sweep (midnight/3am/6am/7:12am/noon/6pm/9pm). Rebuilt in-page (`genWorld`+`__warp`), seeds 7/42/1234:
**clock-match 7/7 each**; **time control: 7/7 distinct strings across the day** (proves the row reads the live clock, not
a frozen string); **non-hall control (other civics + ROAD/RES/FARM) carries no `Clock` row, 500/500 clean**.
**VERDICT: PASS (3 seeds).**

**Visual — `probes/shot-hallclocktip.mjs` (new, promoted).** Freezes the clock in-page (freeze-the-clock law), hovers
the hall via `__find('hall')`, clip-shoots the tooltip. seed 42 @ dayT 0.30: `...| Clock | 7:12 AM | Value 67%`; seed 7 @
dayT 0.66: `...| Clock | 3:50 PM | High street | Value 64%` — no page errors, clock strings correct (0.30·24=7:12 AM,
0.66·24=3:50 PM). Two agents (one per seed), both **VISUAL: PASS**: `Clock` row visible + legible (no mojibake/intra-panel
clipping), hall hex cleanly outlined, no z-order tears / floaters / blowout; the whole frame reads as a balanced coastal
city. (Both noted the tooltip panel runs past the clip's right edge — a screenshot framing artifact, not a defect.)

**Verdict — SHIPPED.** The town hall — whose drawn hand has told the time on its dial since iter 149 — now tells it in
words on hover, off the same slow `dayT` the hand points at. The asserts-less-than-code tell, closed on the city's most
iconic timepiece. Draw-nothing tooltip, pop+stream flat, ~10 lines + a probe + a shot. Civic's Interaction/UX cell gains
184 (52/122/**140**/**184**). The next domain lap (185) owes **Water (176)**, then People (178)/Transport (179)/Urban
(180); step-back still at **187**.

### Findings for later laps
- **A DRAWN LIVE QUANTITY OVER A MUTE TOOLTIP IS THE SAME SEAM WHETHER THE CLOCK IS THE YEAR OR THE DAY.** 129/148/183
  cashed it on the *seasonal* (`year`) clock; 184 cashed it on the *time-of-day* (`dayT`) clock. The tell is general:
  wherever a draw animates off a global (`dayT`, `LITAMT`, `time`, `year`) and the tooltip names none of it, there is a
  free Interaction/UX row — *provided the clock is slow enough not to strobe* (134): `dayT` (~110 s) and `year` (dev
  clock, minutes) are safe to name as a discrete word/number; `time` (frame clock) is NOT — a readout off `time` would
  flicker. Candidates still open on the SLOW clocks: the observatory dome's open/shut state (`LITAMT`), the police beacon,
  the museum/parliament floodlight (`LITAMT>0.3`) — each a live "lit after dark" the tooltip could name.
- **BEFORE NAMING A NEW PROBE/SHOT, `ls probes/` — iter 149 already owned `probe-hallclock.mjs`/`shot-hallclock.mjs`.**
  The bare `mv` refused to overwrite (saving 149's drawn-hand tools); a `git mv` or a `Write` would have been the danger.
  Named mine `*-hallclocktip.mjs` (the tooltip variant). Two probes can share a subject (the hall clock) from opposite
  sides — one grades the pixels (149), one grades the words (184) — so distinguish by *what they measure*, not the subject.
- **SATURATION BEATS KIND-ROTATION, AGAIN (118).** 184 repeated 183's Interaction/UX kind because every other Civic kind
  was spent (additive/Polish) or hot (Deepen). When rotation names a domain but its non-repeated kinds are all
  saturated-or-hot, repeating the one open kind on the owed domain beats forcing a weak change of a worse kind.

## Iteration 185 — wind-driven whitecaps break on the open swell (2026-07-12) [Water & coast × Polish]

**Vector — Water & coast × Polish** (SHIPPED). Rotation named the stalest domain, **Water** (last SHIP 176; the 184
entry explicitly owed the 185 lap to Water). On *kind*: Interaction/UX just ran twice (183/184) and Deepen has been
globally hot (178/179/181), so both were avoided; **New element** was ruled out because the guidance warns against
piling more entities onto a saturated coast (the coast already carries boats/ferries/freighters/surfers/dolphins/
whales/herons/kayaks/kites). **Polish** — improve an existing surface, add nothing — is the fresh, on-guidance kind,
aimed at the biggest untouched *surface* rather than an entity (127's surface-not-entities law).

**The seam — the daytime mid-ocean read flat.** The open sea is already rich (depth-graded tone 116, sparkle,
noon cool glitter 150, golden-hour glints 181, night moonglade + biolum surf 159, a traveling surf break). But all
of those are either noon-only (glitter), dawn/dusk-only (gold), night-only (moonglade/biolum), or at the *beach*
edge (surf break). On a plain daytime afternoon the **open water between the surf line and the noon-glitter zone**
had no sense of a breeze — flat teal with only the faint static sparkle line (L3161). The one genuine daytime gap.

**Change (~20-line draw, all draw-only).** In the `T.WATER` case, after the sparkle: on **open water only**
(`!c.riv && rDeep[idx(x,y)]>SHELF1` — beyond the coastal shelf, so not in the shallows/surf zone), sparse **whitecaps**
gated `hashCell(x,y,seedNum^0x7CA9)>0.76` (~24% of open cells, seeded so no two cities cap alike and it perturbs no
`rng()`), each breaking on a `waveT`-driven `crest` phase (only when `crest>0.5`) as a small foam ellipse + a short
streak down the swell face. **Day-only:** gated `LITAMT<0.6` with the alpha fading `*(1-LITAMT/0.6)`, so the caps
melt away by dusk and the night frame is byte-unchanged (hands off to the moonglade/biolum — nothing added to the
night, respecting the "night-glow run is getting full" watch of 175). No tile / entity / `rng()` / `hashCell`-terrain
/ `tick()` pass / terrain change; strings pure-ASCII (134). Pop + stream provably flat. (Tuned once: first cut read
"faint/understated" to the visual agents — bumped per-cap size 2.6->3.0 and alpha 0.42->0.55, **size not density**,
so it reads clearer without becoming a busy speckle.)

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, all core metrics **+0**, entity counts identical
(`greenRoofs -1`/`towerHt -1` = documented RAF tick-count jitter, touches no `rng()`). Vacuous by construction
(draw-only) — the probe is the gate.

**Probe — `probes/probe-whitecap.mjs` (new, promoted; adapted from `probe-seagold.mjs`, the open-water build-vs-build
template).** Diffs PATCH vs pristine HEAD over water-cell screen boxes at a frozen frame, day/noon/dusk/night, with
**two** controls: SHELF (shallow water `rDeep<=SHELF1`, must stay ~0 — proves the *depth* gate) and LAND (RES/FOREST/
MID, must stay 0 — the WATER case is the only edit). Rebuilt in-page (`genWorld`+`__warp`), STARS cleared,
`Math.random` stubbed, movers cleared, clock+`waveT` frozen (163 law) so a same-frame PATCH-vs-HEAD diff is exactly
my code. seeds 7/42/1234: **SEA caps DAY 0.23/0.21/0.29% · NOON 0.24/0.21/0.30% -> DUSK 0.07/0.07/0.10% -> NIGHT
0.00% all** (the `LITAMT` day-gate); **SHELF control <=0.07% every frame** (caps are offshore only); **LAND control
0.00% every frame, every seed**. Clean three-way separation SEA >> SHELF >> LAND. **VERDICT: PASS (3 seeds).**

**Visual.** Coast clips (181's zoom-fairness law: judge a water ornament at coast zoom) both seeds + a whole-city
`wide`, day. Five agent reads across two rounds, all **VISUAL: PASS**: whitecaps read as **scattered small white
dabs/streaks on the open teal sea** (not a uniform sheet, no repeating stripes), **correctly placed** out on the open
water away from the beach/surf line — none on land/beach/river/boats, and distinguishable from the triangular
sailboats and buoys; **no z-order tears / floaters / blown-out white**; the sea still reads as a coherent graded teal
ocean. Whole-frame agent: balanced beautiful coastal city, the sea "not speckled or busy," stat strip crisp, no `Â·`
mojibake. Prominence rose from "faint/understated" (first cut) to "just right, slightly faint" after the size/alpha bump.

**Verdict — SHIPPED.** The open mid-ocean — flat teal on a plain daytime afternoon, between the beach surf and the
noon glitter — now grows sparse wind-driven whitecaps that break and fade with the swell, seeded per-city and gone by
dusk. A Polish of the biggest untouched water surface, draw-only, pop + stream flat, ~20 lines + a probe. Water's
Polish cell gains 185 (…**150**, **185**). The next domain lap (186) owes **People (178)**, then Transport (179)/Urban
(180); step-back still at **187**.

### Findings for later laps
- **A "SATURATED COAST" IS SATURATED IN ENTITIES, NOT SURFACES — the open-sea SURFACE was the clean Water lap.** The
  header repeatedly warns against piling more entities onto the coast, and the coast's entity list is genuinely spent.
  But the *open-water surface* (350+ hexes/city) had one un-lit daytime state, and a draw-only Polish of it added life
  with zero new entities and zero clutter risk (127's law, applied to Water: the surface-not-entities move is the way
  past a coast that's full of craft). When Water comes up again, look for another *surface* state (the beach dry sand,
  the dune face, the rock armour) before reaching for a new floating thing.
- **A DAY-GATED WATER ORNAMENT IS THE CLEAN COMPLEMENT TO A SATURATING NIGHT-GLOW RUN.** 175 flagged the night-mood
  glow run (moon/stars/observatory/biolum/amphitheater/parliament/bridge lamps) as getting full. Whitecaps gate the
  OTHER way — `LITAMT<0.6`, present by day, byte-unchanged at night — so they add nothing to the crowded night frame
  and fill the under-served daytime instead. When a domain's night is busy, its day is where the room is.
- **TUNE A SUBTLE ORNAMENT BY PER-INSTANCE SIZE/ALPHA, NOT BY DENSITY.** The first cut read "faint" to two agents; the
  fix was to enlarge and brighten each cap (2.6->3.0, alpha 0.42->0.55) while keeping the `hashCell>0.76` count fixed,
  so it reads clearer without tipping into a busy speckle (the whole-frame agent had confirmed headroom: "not speckled
  or busy"). Raising the count would have risked the clutter the whole-frame gate exists to catch; raising the
  per-cap presence does not.
- **`probe-seagold.mjs`/`probe-whitecap.mjs` are the reusable open-water build-vs-build template** (PATCH-vs-HEAD over
  `T.WATER !riv` cell boxes at a frozen frame, a depth/shelf control + a land control, day/night frames). For the next
  open-sea draw vector, clone one: swap the frame set and the target/control cell filters, keep the 163-law in-page
  rebuild + mover clear + STARS/Math.random stubs that make the diff reproducible.

## Iteration 186 — the café tables fill with patrons by day (2026-07-12) [People & activity × New element]

**Vector — People & activity × New element** (SHIPPED). Rotation named the stalest domain: **People** (last SHIP 178;
the 185 entry explicitly owed the 186 lap to People). On *kind*: Deepen just ran on People (178) and has been globally
hot (178/179/181), Interaction/UX ran twice recently (183/184), and Polish ran the last two laps (180/185) — so **New
element** was both the freshest kind (globally unused since Nature 174) and the one that gives a guaranteed-flat pop
when drawn-only. Aimed, per 127's law, not at People's spent *entity* list but at an under-served *surface*.

**The seam — set tables with no diners.** The park café/kiosk (drawn since long before the ledger, on every PARK hex
adjacent to a shop — the 455-strong `cafes` surface) puts out two parasol tables with poles and tabletops… and nobody
sits at them. The exact shape 127 found for the picnic lawn: a drawn amenity for people, with no people. A café is only
alive when someone is having a coffee at it.

**Change (~10-line draw, all draw-only).** In the `T.PARK` café block, after each parasol is drawn, add day-only
seated patrons: two chairs either side of the parasol, each gated `hashCell(x,y,seedNum^SALT)>0.5` so some sit empty
(a lived-in terrace, not a packed one), each a short colored body (`['gold','sage','lav','coral']`, `hashCell`-picked)
+ an ink head, clearly smaller/seated vs a standing ped. **Day-only** (`LITAMT<0.5`, matching the picnic lawn right
below it) so the terrace empties after dark. No tile / entity / `rng()` / `hashCell`-terrain / `tick()` pass / terrain
change; strings pure-ASCII (134); no new tile/entity → census hook, TILELABEL, ENTINFO all unchanged. Pop + stream
provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, all core metrics **+0**, entity/life/transport
counts identical. Vacuous by construction (draw-only) — the probe is the gate.

**Probe — `probes/probe-cafepatron.mjs` (new, promoted; cloned from `probe-whitecap.mjs`, the PATCH-vs-HEAD template).**
Diffs PATCH vs pristine HEAD over PARK screen boxes at a frozen frame, day/night, with two controls: PARKC (PARK cells
NOT adjacent to shops — no café draw, must stay ~0) and ROAD (must stay 0 — the café block is the only edit). Rebuilt
in-page (`genWorld`+`__warp`), STARS cleared, `Math.random` stubbed, movers cleared, clock frozen (163 law). seeds
7/42/1234: **CAFE patrons DAY 0.99/0.94/0.93% -> NIGHT 0.00% all** (the `LITAMT` day-gate, night byte-identical);
**PARKC control <=0.01% every frame**; **ROAD control 0.00% every frame**. Clean separation CAFE >> PARKC ~ ROAD ~ 0.
**VERDICT: PASS (3 seeds).**

**Visual — `probes/shot-cafepatron.mjs` (new, promoted).** ~7-8x zoom onto a café-edge PARK tile (selector requires
occupied seats + `v>=0.44` to skip the pond/fountain that would overdraw the tables + front-most row to avoid tower
occlusion), day + night. seed 42: patrons clearly visible as small seated colored bodies + ink heads flanking the coral
and teal parasols, correctly smaller/seated vs the taller bunting-pole standers, gone at night — agent + my own read
both **VISUAL: PASS**, whole frame balanced. seed 7: after re-framing (the first framing landed on a pond café where
the pond overdraws the tables, then on tower-occluded ones), patrons clearly visible on the park hex beside the shop's
striped awning by day, park hex dark and empty at night. Whole-city wide/downtown reads (both seeds, agents): balanced
coherent coastal city, no z-order tears / floaters / blowout / compounded clutter.

⚠ **A confidently-wrong agent FAIL, settled by the probe (the loop's law working).** The seed-7 visual agent FAILed
claiming the day/night behavior was *inverted* — "patrons appear at NIGHT, absent by DAY." The probe disproves it flat:
night café-diff is **0.00% byte-identical to HEAD** on seed 7, and the code gates `LITAMT<0.5` (night LITAMT=1.00, block
skipped). The "night figures" it saw were the *base* shop's lit-window silhouettes, present in HEAD too — not my
patrons. The FAIL was really a framing artifact (its shot centered on a pond café whose tables the pond overdraws, plus
a lit shop nearby). Per the header law (agents fail confidently; a FAIL naming a cause absent from the code is a cue to
*measure*, not redesign) the probe was the verdict, and a corrected framing then showed the seed-7 patrons plainly.

**Verdict — SHIPPED.** The park café tables — set with parasols since before the ledger and never once occupied — now
fill with seated patrons by day and empty after dark, like the picnic lawn beside them. A People × New element aimed at
a surface (127's law), draw-only, pop + stream flat, ~10 lines + a probe + a shot. People's New element cell gains 186
(41/56/127/170/**186**). Next is the mandated **step-back at 187**; the next domain lap (188) owes Transport (179), then
Urban (180)/Sky (181).

### Findings for later laps
- **A DRAWN AMENITY-FOR-PEOPLE WITH NO PEOPLE IS THE SAME SEAM AS THE MUTE-TOOLTIP TELL — look for set tables, empty
  benches, vacant stages.** 127 found it on the picnic lawn (blanket, no picnickers), 186 on the café terrace (tables,
  no diners). The move: a draw already stages a human activity but omits the humans; add them day-gated (`LITAMT<0.5`)
  and `hashCell`-scattered so pop stays flat and the night hands off cleanly. Candidates still open: the fountain-plaza
  benches, the amphitheater seating tiers (a daytime audience?), the market stalls (but MARKET reads 0 — dead host,
  107), the surf-beach towels (already crowded). Prefer the ones on a *developed/urban* surface, since the coast and
  parks are getting full.
- **A LATER DRAW IN THE SAME TILE CASE CAN OVERDRAW YOUR FEATURE — mind the case's own paint order.** The café tables
  are drawn first in `T.PARK`, then `if(v<0.24)` paints a big pond ellipse *over* them, and `v<0.32` a fountain — so on
  low-value café tiles the tables (and my patrons) are partly buried. The feature is correct (probe 0.93%+), but a
  close-up must frame a `v>=0.44` café tile to SEE it. When a per-tile feature reads absent at some framings but the
  probe says present, suspect a later same-case draw occluding it before you suspect the feature.
- **THE VISUAL-SHOT SELECTOR IS PART OF THE GATE — teach it to skip occluded instances.** A café-edge tile sits next to
  shops/towers, which draw tall in later rows and occlude it; a pond/fountern café buries its own tables. `shot-cafepatron.mjs`
  ends up selecting for occupied seats AND `v>=0.44` AND the front-most row precisely so the framing lands on a *visible*
  instance. A sparse/host-gated feature needs its shot to hunt for a clean example, or the visual gate reads a false
  absence (and an agent then invents a cause for it).
