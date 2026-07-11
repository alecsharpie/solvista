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
| **Nature** | 4, 26, 29, 102, **156**, **174** | 1, 13, 60 | 37, 46, 67, 76, **108**, **120**, **139**, **166** | ~~46~~, ~~88~~, ~~101~~ | U4 | 53, 96, **194** | **117**, **129**, **148**, **183** |
| **Water & coast** | 6, 10, 12, 16, 20, 33, 106, **169** | 90 | 17, 25, 51, 65, 72, **113**, **123**, **159** | 22 | | U2, 44, 58, 79, **116**, **132**, **150**, **185** | **97**, **141**, **176** |
| **Urban fabric** | 32, 62 | 7, 23, ~~82~~, **151** | 38, 54, 68, 92, **165**, **173**, **189** | 47, **109**, ~~**160**~~ | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103**, **110**, **118**, **124**, **143**, **180** | **133** |
| **Transport** | 2, 9, 21, 31, 48, **164** | 77 | 28, 39, 55, 63, **112**, **121**, **128**, **155**, **179**, **193** | 5, 15, **138** | U4 | U1, U3, 70, 85, 87, 94, **146**, **188** | **105**, **171** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107** | 36, 59, 66, 80, 91, **149**, **158**, **175** | 45 | | 73, ~~**114**~~, **168** | 52, 122, **140**, **184** |
| **Sky & atmosphere** | 27, 43 | | 19, 35, 50, 57, 95, **135**, **153**, **161**, **181**, **190** | | | 61, 81, 89, **115** | ~~**134**~~, **144** |
| **People & activity** | 41, 56, **127**, **170**, **186** | 49 | 34, 64, 93, **104**, **119**, **145**, **178** | 78, **111** | | 84, **137**, **163** | 71, **154**, **191** |

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
  Sky **190** · People **191** · Transport **193** · Urban **189** · Nature **194** · Civic **184** · Water **185**. (162, **167**, **172**, **177**, **182**, **187**, **192** = step-backs, no domain lap.) **191 took People × Interaction/UX (the festival street names itself — the `c.fete` civic-mile road, bunting-strung since before 178 and crowd-filled since 178, was mute in `describeTile`: it now titles 'Festival street' with a live `Festival` row reading 'Crowds under the bunting'/'Quiet after dark' off the SAME `clamp((0.82-LITAMT)/0.28,0,1)>0.02` gate the 178 crowd draw uses; a banked cue from 171 finally cashed (119's law: a banked measured finding outranks kind-rotation). Draw-nothing tooltip, pop+stream flat, `probe-fetetip` recomputes the gate independently — every fete hex named + row FLIPS day→night, ordinary roads control clean, 3 seeds; both seeds VISUAL PASS, `&mdash;` renders clean. Still-mute draws banked: `c.hedge`, `c.party`, `c.shroom`.) **192 was the mandated STEP-BACK — eighteenth, THIRTEENTH clean bill in a row (perf 188→191 flat: day −1.0%/night 0.0% vs iter-187 `ec206ef`; seasons alive FARM dry-peak 88.4; coast bright, night lit, winter present, both seeds VISUAL PASS). No city change.** **193 took Transport × Deepen (the ferry lights up for the night crossing — the LAST transit vehicle to run dark at night now carries warm-lit cabin windows + a white masthead + red-port/green-starboard nav lights + a wash on the water, completing the night-light family (bridges 179, shopfronts 189, windows 190) on the vehicle it had missed; framed to NOT repeat 179's amber lamp — a distinct MARINE vocabulary of coloured sidelights; draw-only stream+pop-neutral, `probe-ferrylight` FERRY night 2.0–2.2% ≫ day 0–0.23%, BOAT ctl 0.00% at night (ferries only), 3 seeds; both seeds VISUAL PASS, agents located the lit vessels). So the next domain lap (194) owes Urban (189, Deepen/Polish only — measured-saturated), then Nature (183)/Civic (184); next step-back at **197**. **190 took Sky × Deepen (the golden hour rakes the sun-facing WINDOWS — an additive warm-gold glint on ONE front face of every building's glass at dawn/dusk, RIGHT at dawn / LEFT at dusk off `dayT`, cashing 180/181's banked "windows catch the low sun"; the THIRD golden-hour surface off the one `GWARM` signal after clouds 161 & sea 181, a Sky×Urban interconnect hooked into the shared `winBandR` so it reaches all 4 building types full-height; draw-only stream+pop-neutral, `probe-windowgold` splits each box L/R to prove the rake is one-sided AND flips: dusk L≫R, dawn R≫L, byte-zero noon/night, 3 seeds; a split agent verdict at `*0.30` was resolved by the probe then re-verified at `*0.44` — legibility is a separate bar from presence). So the next domain lap (191) owes People (186), then the mandated step-back at 192.** **189 took Urban × Deepen (the lit shopfronts spill warm light onto the pavement in front at night — the COM storefront glass, the brightest ground-floor plane in the city, cast NOTHING on the street it faces while lamps/bridges/neon all glowed; a warm ground pool on the road-facing `fs` side gated `LITAMT>0.4 && v>0.5`, source-over low alpha matched to the street lamps' amber so a row of adjacent shops stacks without blowing to white (159's overlap law), positioned via `kerbS`'s face maths + `faceOutS`; a ground-plane Urban Deepen since Urban's additive/Connect are spent, draw-only stream+pop-neutral, `probe-shopspill` COM v>0.5 night 0.22–0.30% → day 0.00% 3 seeds, v<=0.5 gate-control ~0.01% both frames; both seeds VISUAL PASS, no blowout in the dense core). So the next domain lap (190) owes Sky (181, Deepen/Fix ONLY — saturated), then the step-back at 192.** **188 took Transport × Polish (the cable-car cabins rock on their hangers in the breeze — each cabin now PIVOTS about its fixed cable point, the hanger top staying on the rope while the body swings under it, two out-of-phase per-cabin sines, ~±2.4px so it reads at moderate zoom; the aerial transit hung rigidly vertical for the artifact's whole life while whitecaps/kites/flags all moved in the same wind, so this fixes a stillness rather than repeating 179's night-lamp move — draw-only off `time`, no rng/state, pop+stream flat; a MOTION claim so a TEMPORAL probe: `probe-cabinsway` freezes the SIM and steps only `time`, cabin `_sx` swings 4.1–4.5px pk-pk, `_sy` control 0.000, frozen monorail-train `_sx` control 0.000, 3 seeds; both seeds VISUAL PASS at ~3× — cabin stays connected by its hanger to the fixed cable, offset differs A↔B). So the next domain lap (189) owes Urban (180), then Sky (181); step-back at 192.** **186 took People × New element (the park café tables fill with seated day-only patrons — the 455-strong `cafes` surface put out parasol tables since before the ledger but never a single diner, the same amenity-with-no-people seam 127 found on the picnic lawn; `hashCell`-scattered, `LITAMT<0.5` so the terrace empties at night; draw-only stream+pop-neutral, `probe-cafepatron` CAFE day 0.93–0.99% → night 0.00% byte-identical, PARKC+ROAD ctls ~0, 3 seeds; a seed-7 agent FAIL claiming day/night INVERSION was disproven by the probe — its "night figures" were the base shop's lit windows. NB a later same-case draw (pond/fountain, `v<0.32`) OVERDRAWS the tables, so the shot selector hunts a `v>=0.44` front-most café). Next is the mandated STEP-BACK at 187; the next domain lap (188) owes Transport (179), then Urban (180)/Sky (181). **184 took Civic × Interaction/UX (the town hall clock tells its time on hover — a `Clock` row via a new `clockWord(dayT)`, reading the same slow day clock the drawn hand has pointed at since 149; kind repeated 183 because every other Civic kind is spent-or-hot, and saturation beats kind-rotation (118); draw-nothing tooltip, pop+stream flat, `probe-hallclocktip` clock-match 7/7 × 3 seeds, 7 distinct times across the day, non-hall control 500/500 clean). So the next domain lap (185) owes Water (176), then People (178)/Transport (179)/Urban (180). 185 took Water × Polish (wind-driven whitecaps break on the open swell — sparse seeded `hashCell` foam caps on open water beyond the coastal shelf `rDeep>SHELF1`, day-only via `LITAMT<0.6` so the night hands off to the moonglade; the one texture the flat daytime mid-ocean lacked, aimed at the biggest untouched water SURFACE not another coast entity; draw-only stream+pop-neutral, `probe-whitecap` SEA 0.21-0.30% day ≫ SHELF ≤0.07 ≫ LAND 0 → night 0, 3 seeds; agents "just right, slightly faint" after a size/alpha bump). So the next domain lap (188) owes Transport (179), then Urban (180)/Sky (181); step-back done at 187, next at 192.** **194 took Nature × Polish (the trees put their feet on the ground — every tree and palm now drops the house-style `shadS` contact shadow that peds/dogs (137), the static crowds (163), every vehicle and the buildings (180) have dropped for dozens of iterations; the trees, the most numerous vertical object on the plate, floated. Found by grepping the shared primitive, not the ledger: **180's own comment CLAIMS "cars/peds/crowds/trees all use the same shadS"** — the assert-what-the-draw-ignores law, in a COMMENT rather than a tooltip. Sized per species (broadleaf .22 / conifer .19 / poplar .11 / palm .15) at alpha .13 so a 4-tree forest hex grounds without the floor going dark (159's overlap law). Draw-only, census vacuous; `probe-treeshadow` gates on the fact that **a contact shadow can only DARKEN** — FOREST 3.2-4.9% / PARK 2.5-2.7% darker px with **ZERO lighter on every seed**, LAND-ctl (1014 cells) and WATER byte-flat, 3 seeds. A seed-42 agent warned the dense grove went 'olive-muddy, near the tolerable limit' (the kelp failure mode) — **confabulation, disproven by the probe: FOREST mean luminance moves -0.36..-0.44 of 255**, under half a luminance level. ⚠ **COSTS day +3.4% / night +3.5%** (interleaved A/B vs pristine HEAD, `probes/perfab.mjs`) — an ellipse fill on the city's most numerous object; within tolerance and precedent (118 shipped +5.1% night) but a REAL cost — **197's step-back should watch it**. A memo of `shadS`'s rgba() string was tried to buy it back and measured ZERO — reverted.) So the next domain lap (195) owes Civic (184), then Water (185); next step-back at **197**.
  **Stalest by number is Sky (161), but Sky is post-saturation (Deepen/Fix ONLY — additive/CA cells are traps). 173 took Urban × Deepen (the warehouse north-light clerestory — closing the roof-furniture set city-wide; see below), so the next domain lap (174) owes Nature (166)/Civic (168)**, then Water (169)/People (170)/Transport (171). **174 took Nature × New element (rolled hay bales on the stubble fields post-harvest, `probe-haybale`). **175 took Civic × Deepen (the parliament floodlights its facade — a warm uplight wash up the colonnade at night, matching the museum's dusk floodlight; the grander "tallest civic roof" only lit its dome/lantern while the museum lit its facade — the banked 168 Civic Deepen candidate; draw-only stream+pop-neutral, `probe-parliament` FACADE 24–38% at night → 0.00% day, ROAD ctl ~0, 5 seeds; joins the night-mood run moon/stars/observatory/biolum/amphitheater). **176 took Water × Interaction/UX (the river names its course — a `Course — N hexes` row via a bridge-AWARE flood `riverCourse` so a span doesn't fragment the reach; the river was the barest tooltip in the city, zero data rows over its richest water system; a `Crossings` companion was DROPPED — bridge cells over-count vs connected components and the L1633 pave-over rule makes the unit ambiguous; draw-nothing tooltip, pop+stream flat, `probe-river` 254 river hexes named 3 seeds, sea control clean 1916 hexes, sea-leak 0). So the next domain lap (178) owes People (170)/Transport (171).** 171 took Transport × Interaction/UX (the boulevards name themselves, `probe-boulevard`); 170 took People × New element (the pier's day-only anglers, `probe-anglers`). **178 took People × Deepen (the festival streets fill with people — a day-and-dusk crowd of `hashCell`-scattered figures mills on each `c.fete` ROAD cell under the bunting, then heads home by deep night; a People×Civic interconnect on a drawn CA system that was rendered for the artifact's whole life but never *inhabited*; draw-only stream+pop-neutral, `probe-fetecrowd` FETE day 2.9–3.6% → night 0.00% byte-identical, ROAD ctl ~0, 3 seeds). **179 took Transport × Deepen (the bridges light their lamps at night — the bridge sub-case `break`s before the road's night-lamp block, so every bridge went pitch dark at night for the artifact's whole life while both banks glowed; two warm rail lamps atop the deck + a `waveT` reflection on the river below, a Transport×Water interconnect; draw-only stream+pop-neutral, `probe-bridgelamp` BRIDGE night 7.4–8.1% → day 0.00% byte-identical, ROAD ctl 0.00% both, 3 seeds). So the next domain lap (180) owes Urban (173, Deepen/Polish only — measured-saturated).** **180 took Urban × Polish (the towers ground their own weight — the fixed 0.42×0.13 contact shadow under every building now scales with mass `shf=clamp((h-9)/120,0,1)`, so a 150-unit tower grounds on a 0.94/0.23 pool while a bungalow keeps the old blob; centered in the house style since nothing in the artifact casts a directional shadow, draw-only stream+pop-neutral, `probe-massshadow` TALL 0.6–1.0% ≫ SHORT/CTL ~0.05% 3 seeds; the first scaling was too weak because the tower body occludes its own base shadow — size for the ring not the area). So the next domain lap (181) owes Sky (161, Deepen/Fix ONLY — saturated), then the step-back at 182.** **181 took Sky × Deepen (the sea catches the golden hour — bright additive-gold sun-path glints on the open water at dawn/dusk, reading 161's reusable `cwarm`/`skyBot` signal onto the largest surface in the frame, filling the gap between the noon glitter and the night moonglade; a Sky×Water interconnect, draw-only stream+pop-neutral, `probe-seagold` SEA dusk ~31%/dawn ~22% → noon/night ~0, LAND ctl 0 all frames, 3 seeds. ⚠ A warm alpha WASH over teal desaturates to OLIVE — carry sunset/warm light over cool water with ADDITIVE `'lighter'` glints, not a wash; two tuning rounds were lost raising a wash's alpha before the blend mode was the real fix. `GWARM`/`GWSB` are now globals beside `LITAMT` for any golden-hour draw.)** 171's fete-street TOOLTIP (`c.fete` drawn but unnamed in `describeTile`) is still banked, and now more worth cashing since the street is no longer empty. **182 was the mandated STEP-BACK — ELEVENTH clean bill in a row (perf 178→181 flat: day +1.0% / night +0.9% vs iter-177 `7e2ac2c`; seasons alive FARM dry-peak 88.4; night core off-centre both seeds ~(.47,.50)/(.47,.60)). No city change.** **183 took Nature × Interaction/UX (the fields name their own harvest — a `Fields` crop-phase row in the FARM tooltip via a shared `farmPh(v)`, the biggest agricultural surface, the one 148's "agriculture tell spent" note had OVERLOOKED; draw-nothing tooltip + byte-identical one-predicate refactor, pop+stream flat, `probe-farmtip` 3 seeds). So the next domain lap (184) owes Civic (175), then Water (176)/People (178)/Transport (179).** Next step-back at **197** (192 done: HEAD vs iter-187 interleaved perf flat, isolated 188–191). **Urban is measured-saturated now: additive spent (118), Connect measured-hard TWICE (160 RES terracing, 165 high-street arcade — the `hstr` parade zigzags with parity, longest straight-hex-axis run = 2, so it is not a clean arcade host); Urban's next lap is Deepen/Polish only** (or a COM arcade if a *straight-hex-axis* retail run is ever found — the parade is not one). Roof-furniture is now CLOSED city-wide across all 5 developed types (MID/RES water tanks, TOWER gardens, COM plant 165, IND warehouse north-light clerestory 173) — no bare roof left, so a future Urban "bare roof" vector has no host; Urban Deepen must go elsewhere (facades, ground plane, harbour apron). Check the last entry of the stalest domain for a banked
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
  **Iteration 192 is the next holistic step-back** (105, 110, 115, 120, 125, 130, 136, **142**, **147**, **152**, **157**, **162 done**, **167 done**, **172 done**, **177 done**, **182 done**, **187 done**, …). **187 was the 17th step-back — TWELFTH clean bill in a row: census PASS, perf flat (HEAD vs iter-182: day +1.2% / night −0.4%, interleaved), seasons alive (FARM dry-peak 88.4), both seeds VISUAL PASS at 3 lights × 2 calendars, no compounded clutter/darkness, coast clean. No city change.**
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

> **Archive:** the 187 entries before Iteration 185 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

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

## Iteration 187 — holistic step-back (no city change)

**Vector** — the mandated ~5-iteration step-back (105/110/115/120/125/130/136/142/147/152/157/162/167/172/177/**182**/**187**). The seventeenth step-back; isolates iters 183–186 (all draw-only: FARM harvest tooltip, hall-clock tooltip, whitecaps, café patrons) by interleaving HEAD against iter-182's file.

**Census** — PASS, every core aggregate flat vs baseline (pop/developed/roads unmoved; cafes 455, stations 40, boulevardTrees 1203 all +0). Draw-only run, so this is expected and proves only that no page threw.

**Perf (interleaved HEAD vs iter-182 `7614539`, A/B/A/B, min per variant)** — **day 36.72ms (HEAD) vs 36.28ms (182) = +1.2%; night 42.55ms vs 42.72ms = −0.4%.** Flat — four draw-only tooltip/element iterations cost nothing measurable. (Absolute numbers ran hot vs the 33/37 baseline this session — machine load; the interleaved delta is the verdict, not the absolute, per the same-session-pristine-control law.)

**Seasons alive** — `probe-season`: FARM winter→dry-peak **88.4**, VINEYARD 44.6→36.7, ORCHARD 25.3→41.4, ROAD control ~0.5–2.1. The calendar is working across every agriculture tile.

**Visual** — whole-frame reads at 3 lights × 2 calendars (day golden `year=2035.62` / night / winter `year=2035.02`), 2 seeds, one agent each, cumulative-drift question. **Both VISUAL: PASS.** Seed 42: balanced diamond city, dense-but-legible downtown, clean sand→teal coast (the old too-dark-coastline bug still absent), smooth sky, genuine night (lit windows + waxing-crescent moon + moonglade), winter a mild-but-present cool variant. Seed 7: same verdict — no z-order tears, no floaters, no hex seams, no blown-out color, coast bright not dark, night gold-lit with moon reflection.

**Verdict — EXPLORED → REVERTED** (no change to commit; `solvista.html` restored byte-identical after the perf swap). **Twelfth clean bill in a row.** The city is balanced, readable and beautiful at ~186 iterations; nothing has compounded into clutter or darkness; seasons, night mood and coast all read correctly; perf flat. Next domain lap (188) owes Transport (179), then Urban (180)/Sky (181). Next step-back at **192**.

## Iteration 188 — the cable cars rock on their hangers in the breeze (2026-07-12) [Transport × Polish]

**Vector.** Transport × **Polish** (SHIPPED). Rotation named the stalest domain: **Transport (179)** (186 was
People, 187 the step-back). On *kind*: Transport's whole run is night-ward Deepen (179 bridge lamps, 155 catenary),
New element (164 taxi), Interaction/UX (171 boulevards), Polish (146 bus). Deepen just ran at 179, so I **varied off
it deliberately** — 179 was "add a warm night lamp to an unlit transport structure," and the obvious next candidate
(a night lamp on the dark elevated monorail station) would have *repeated the move*. Polish instead, aimed at a
daytime-and-night stillness.

**The seam — the aerial transit hangs rigidly vertical.** I grepped the whole Transport surface first and found it
measured-saturated: roads carry lane markings, avenue/arterial centre-lines, lit night corridors, street trees,
boulevard allées, and bus shelters *with day-fading boarding queues*; vehicles have livery, headlights + red
taillights (5521), contact shadows, beacons, taxi checker; monorail trains and gondola cabins already have night-lit
glass windows; bridges got their night lamps at 179; the tram got its catenary at 155. The one thing left untouched:
the **cable-car cabins hang dead-plumb from the rope** and never move relative to it. Meanwhile the city already has
a *wind* — 185's whitecaps break on the swell, the kites fly, the flags stream — so a rigid, windless cable car is
the odd stillness out. Cable cars sway; ours didn't.

**Change (~6-line draw edit, all draw-only).** In the cabin draw block (render loop, ~L5960), each cabin now
**pivots about its fixed cable attachment point** (`gsx,gsy-Hs`): the hanger's *top* stays on the rope, and a lateral
`sway` offset swings the hanger *bottom*, the cabin body, its window band, and its hover-stamp together. `sway =
sin(time*1.15 + cb.p*39 + li*1.7)*1.7 + sin(time*0.63 + li)*0.7` — two out-of-phase sines (a quick gust over a slow
swell), per-cabin-phased off `cb.p`/`li` so no two cars rock in lockstep, ~±2.4px peak so it reads at moderate zoom
without looking unmoored. Pure draw off the animation clock `time`; no tile / entity / `rng()` / `hashCell`-terrain /
`tick()` pass / terrain change / new state; strings pure-ASCII (134). Pop + stream provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**; gondola **16** and every core metric **+0**
(`greenRoofs +1` = documented RAF tick-count jitter). Vacuous by construction (draw-only) — the probe is the gate.

**Probe — `probes/probe-cabinsway.mjs` (new, promoted).** A **MOTION** claim, so a **temporal** probe (iter-134
law: a frozen two-render diff is blind to cadence). It **freezes the SIM** (`playing=false`, so every cabin's rope
position `cb.p` and thus `gsx` stay put) and steps **only the animation clock** `time` across 48 samples of a cycle,
re-rendering at each and reading the stamped screen coords. The sway is a pure function of `time`, so:
**CABIN dx (cb._sx pk-pk) = 4.08 / 4.30 / 4.45** on seeds 7/42/1234 (matching the designed ±2.4 amplitude); **CABIN
dy = 0.000** (the sway is horizontal only); **TRAIN dx = 0.000** — a monorail train's `_sx` is the control, and with
the sim frozen it stays pinned, proving the motion is my sway and not the sim advancing. **VERDICT: PASS (3 seeds).**

**Visual — `/tmp` zoom + wide shots.** ~3× camera zoom centred on a cabin, rendered at **two clock moments** half a
slow-cycle apart (A/B) so a still-image agent can see the cabin swing relative to its fixed cable, plus a whole-city
`wide` (day golden `year=2035.62`) for the compounding check. seeds 42 & 7, one agent each, both **VISUAL: PASS**:
the coral cabin stays **connected by its hanger to the fixed cable** (not floating, not detached, not clipping the
tower), its offset/angle relative to the cable **differs between A and B** (sway visible), no z-order tears /
floaters / blown-out color anywhere, and the whole frame still reads as a balanced, beautiful coastal city.

**Verdict — SHIPPED.** The aerial cable cars — plumb and windless for the artifact's whole life — now rock gently on
their hangers in the same breeze that raises the whitecaps and flies the kites. A Transport × Polish that fixes a
*stillness* rather than repeating 179's night-lamp move: draw-only, pop + stream flat, ~6 lines + a temporal probe.
Transport's Polish cell gains 188 (U1/U3/70/85/87/94/**146**/**188**). The next domain lap (189) owes **Urban (180)**,
then Sky (181); the next step-back is at **192**.

### Findings for later laps
- **A "stillness" is a Polish seam the way a mute tooltip is an Interaction seam.** When a city already has a force
  (here: wind — whitecaps 185, kites, flags) that visibly moves *some* things, anything in the same medium that
  *doesn't* move is a gap worth closing. The aerial cabins hung rigid while everything else in the wind swayed. Look
  for other unmoved things that should respond to a force already in the scene: do the moored boats bob on the swell?
  do the flags on the far buildings stream while nearer ones are still? does anything hang (banners, the bunting)
  that should sway?
- **A pendulum under an iso vertical prism is free: pivot the ground point, pin the top.** `prismS` builds a vertical
  prism upward from a ground screen-point, so shifting that point laterally translates the whole body sideways at
  every height. To make it swing rather than slide, keep the *cable/attachment* draw at the original `gsx` and feed
  the *swayed* `gsx+sway` only to the body + the hanger's bottom endpoint. No rotation math, no new transform.
- **A MOTION Polish's gate is a TEMPORAL probe with a FROZEN-SIM control, and the control is another moving entity
  held still.** Rather than diffing two frames (blind to cadence) or trusting a still agent (can't see motion), freeze
  the sim and step only `time`: the feature's stamped coord must oscillate while a *sibling* entity that also gets
  stamped but does NOT have the feature (the monorail train) stays pinned — that pin is what proves the sim is
  actually frozen and the oscillation is the feature, not the world advancing. `_sy` doubles as an axis control
  (horizontal-only sway ⇒ dy≈0).

## Iteration 189 — the shopfronts spill onto the pavement at night (2026-07-12) [Urban fabric × Deepen]

**Vector.** Urban fabric × **Deepen** (SHIPPED). Rotation named the stalest domain, **Urban (180)** — the 188 entry
owed the 189 lap to Urban. Urban is measured-saturated (additive spent 118, Connect measured-hard 160/165, roof-furniture
closed city-wide), so its laps are **Deepen/Polish only** and must go to *facades, ground plane, harbour apron* (header).
Kind varied off 180's Polish to a **Deepen** on the **ground plane** — the one part of downtown the many night laps never
reached.

**The seam — the liveliest windows threw nothing on the street.** Downtown grew a rich night layer over dozens of laps:
arterial lit corridors (L4197), ordinary-street lamp glows (L4216), bridge rail lamps + river reflection (179), COM neon
signs (L4608), terrace lanterns (L4521). Yet the COM **storefront glass** — lit at night with `colLit('glass',...)`, the
brightest ground-floor plane in the city — cast **no light onto the pavement it faces**. Every warm pool on the street
came from a lamp; none came from the shops themselves. A genuine gap on the ground plane, not another ornament.

**Change (~10-line draw, all draw-only, in the COM case after the `fs`/`bcx,bcy` setup, before the body prism so the
kerb/crowd sit on top).** Gated `LITAMT>0.4 && v>0.5` (the retail strip): a warm **ground pool** in front of the
storefront on the road-facing (`fs`) side — a wide soft wash (`rgba(255,206,124,·)`, 6.2×2.6) plus a brighter core near
the glass (`rgba(255,222,150,·)`, 3.6×1.5), positioned at the storefront base via the same `X/V/E` face maths `kerbS`
uses and pushed outward with `faceOutS(...,3.0)` toward the viewer/street. Amber matched to the street lamps' own
`rgba(255,204,120,·)` (L4208). **Source-over low alpha** (peak ~0.12/0.18), not `'lighter'`, so a row of adjacent lit
shops stacks into one continuous glow **without blowing to white** (159's overlap caution). No tile, entity array,
`rng()`, `hashCell`-terrain, `tick()` pass or terrain change; strings pure-ASCII (134). Pop + stream provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, all core metrics **+0**, entity counts identical
(`greenRoofs +1`/`towerHt -1` = documented RAF tick-count jitter, touches no `rng()`). Vacuous by construction
(draw-only) — the probe is the gate.

**Probe — `probes/probe-shopspill.mjs` (new, promoted).** Diffs PATCH vs HEAD over the COM cells' screen boxes at a
frozen frame, **night + day**, split by the gate: TARGET = COM `v>0.5` (spill drawn), CONTROL = COM `v<=0.5` (gate
excludes → no draw, so the control also tests the gate). Rebuilt in-page (`genWorld`+`__warp`), `STARS` cleared,
`Math.random` stubbed, movers cleared, clock frozen (163 law). seeds 7/42/1234: **COM v>0.5 NIGHT 0.22% / 0.30% / 0.28%
→ DAY 0.00% / 0.00% / 0.00%** (LITAMT 0.02, no draw); **v<=0.5 control 0.01–0.02%** both frames all seeds (edge bleed
from adjacent lit shops). **PASS (3 seeds).**

**Visual.** Night `downtown` + `wide`, seeds 42 (`warp=61`) & 7 (`warp=31`), pinned `year=2035.62`. Two agents, both
**PASS**: warm amber pools found on the pavement hugging the base of lit shopfronts, sitting flat on the hex ground
(not floating), fanning toward the street; **no z-order tears, floating tiles, or blowout** — the dense retail core stays
legible with dark pavement showing through, the spill reads as *pooled glow* not a merged white/orange smear, warm
windows still read as windows; the whole wide frame still a balanced night coastal city (dark sky/sea, moon, warm core
dimming to the edge), the spill deepening the warmth without clutter.

**Verdict — SHIPPED.** The one lit plane in downtown that gave nothing back to the street — the storefront glass — now
pools warm on the pavement in front of it, joining the night-lit ground plane the lamps, bridges and neon already built.
A ground-plane Urban Deepen: draw-only, pop + stream flat, ~10 lines + a probe. Urban's Deepen cell gains its next (…173,
**189**). The next domain lap (190) owes **Sky (181, Deepen/Fix ONLY — saturated)**, then the mandated step-back at **192**.

### Findings for later laps
- **A LIT VERTICAL PLANE BESIDE A GROUND PLANE OWES IT A SPILL, AND IT IS THE CHEAPEST GROUND-PLANE DEEPEN.** Same shape
  as 179's bridge-lamp reflection one dimension over: any structure that lights up at night (storefront, a floodlit
  civic facade, the market stalls, a lit pier) can pool a warm ground glow in front for two ellipses — and because it is
  glow-on-dark it clears the contrast×width bar at fit (179). Candidates still un-spilled: the MARKET stalls' string
  lights, the CIVIC floodlit facades (they light the wall but not the forecourt paving), the pier lamps.
- **STACK NIGHT GROUND-GLOWS WITH SOURCE-OVER LOW ALPHA, NEVER `'lighter'`, WHEN THE HOSTS ARE DENSE AND ADJACENT.**
  The COM strip packs shops hex-to-hex, so an additive (`'lighter'`) spill would have summed into a blown-white smear
  across the core (159's overlap law). The street lamps already solved this — plain `rgba(...,~0.11–0.22·LITAMT)`
  ellipses that *alpha-blend* toward warm without ever reaching white. Match the existing night-glow alphas rather than
  inventing a brighter one.

## Iteration 190 — the golden hour rakes the west windows (2026-07-12) [Sky & atmosphere × Deepen]

**Vector.** Sky & atmosphere × **Deepen** (SHIPPED). Rotation named the stalest domain, **Sky (181)** — and the header
mandates Sky is **Deepen/Fix ONLY** (post-saturation: additive/CA cells are traps). Kind forced to Deepen. This cashes
the move **banked twice** (180's "windows catch the low sun", 181's finding that `GWARM` is "a reusable golden-hour
signal" for "a Sky×Urban golden-hour glint on west-facing tower windows"). A Sky×Urban interconnect, the third
golden-hour surface after the cloud bellies (161) and the sea (181) — it adds no element, applying an existing Sky
signal to an existing surface.

**The seam — the glass was cold at the most beautiful light of the day.** The clouds warm at dawn/dusk (161) and the
sea catches a gold sun-path (181), but the buildings' glass — the whole downtown curtain wall — stayed its flat cool
tone through golden hour. Every real coastal city's most iconic sunset image is a wall of towers reflecting the low sun
into orange fire on one side while the other stays shadowed. `winBandR` (L2736) is the **shared window renderer** for
all four building types (RES 4417 / MID 4504 / COM 4583 / TOWER's stacked bands 4657–4685), so one hook there reaches
every facade in the city, full-height up a tower.

**Change (~10-line draw + a small refactor, all draw-only).** `winBandR`'s daytime early-return was converted to an
`if/else` so the tail runs in both branches; appended, gated `GWARM>0.02`: an **additive** (`'lighter'`) warm-gold quad
(`rgba(255,176,88,GWARM*0.44)`) over the full window band of **ONE** front face — the sun-facing one, `gs=dayT<0.5?1:-1`
(**RIGHT at dawn / LEFT at dusk**, read off the same `dayT` clock `GWARM` derives from), drawn *over* the band so it
reads as the pane lighting up while the shaded face stays cool. Additive not a wash (181's law: a warm alpha wash over
cool desaturates to olive). No tile, entity, `rng()`, `hashCell`, `tick()` pass or terrain; `winQuad` geometry reused;
strings pure-ASCII (134). Byte-unchanged at noon and night (GWARM=0). Pop + stream provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, core metrics **+0** (pop/roads/developed flat),
`greenRoofs -1` = documented RAF tick-count jitter (touches no `rng()`). Vacuous by construction (draw-only) — the probe
is the gate.

**Probe — `probes/probe-windowgold.mjs` (new, promoted).** Diffs PATCH vs HEAD over each building's (`DEV`, `h>12`)
screen box at a frozen frame, at **dusk / dawn / noon / night**, with PARK/ROAD/WATER as the control, and — the
load-bearing part — **splits each box into LEFT vs RIGHT screen halves** to prove the rake is one-sided and *flips*.
Rebuilt in-page (`genWorld`+`__warp`), STARS cleared, `Math.random` stubbed, movers cleared, clock/`waveT` frozen (163
law). seeds 7/42/1234: **BLD glint DUSK 12.8/13.5/13.1% · DAWN 10.6/10.9/10.7% → NOON 0.00% · NIGHT 0.00%** (GWARM
0.72/0.43→0); **the lit half FLIPS — DUSK L 14.9/15.8/15.8% ≫ R 11.1/11.7/11.0%; DAWN R 11.5/12.0/12.2% ≫ L
9.1/9.1/8.6%**; CONTROL 0.00% at noon/night (proving nothing else moved), 1.7–3.7% at dawn/dusk = my own glint bleeding
into adjacent tiles' boxes. **PASS (3 seeds).**

**Visual — a split verdict resolved by the probe, then re-verified.** First build (`*0.30`): seed-7 agent PASS ("subtle
but clearly one-sided, the rake flips"), seed-42 agent FAIL ("flat scene-wide wash, no directional flip"). The
directional probe had already measured the flip cleanly *on seed 42* (dusk L 15.0 ≫ R 11.1), so per the loop's law the
probe is the verdict over disagreeing agents — the effect was real and directional, just **under-powered for reliable
legibility**. Both agents confirmed headroom (no clipping). Bumped `*0.30→*0.44` (color to `255,176,88`), re-probed
(directional contrast steeper, L/R ≈ 1.35× at dusk, still byte-zero noon/night), re-shot seed 42: agent now **PASS** —
"on individual towers the LEFT face reads warmer cream/amber while the RIGHT sits greyer at dusk, and the warm side
switches to the RIGHT at dawn on the same towers; no tears/floaters/blowout; wide frame a balanced golden-hour coastal
city."

**Verdict — SHIPPED.** The building glass — cold through golden hour while the clouds (161) and sea (181) caught the low
sun — now takes a warm gold rake on its sun-facing windows, one side ablaze and the other shadowed, the lit face
flipping between dawn and dusk. The third golden-hour surface; a Sky×Urban interconnect, draw-only, pop + stream flat,
~10 lines + a directional probe. Sky's Deepen cell gains its next (…181, **190**). The next domain lap (191) owes the
stalest domain, **People (186)**, then the mandated **holistic step-back at 192**.

### Findings for later laps
- **GOLDEN HOUR NOW LIGHTS THREE SURFACES — clouds (161), sea (181), glass (190) — all off the ONE `GWARM`/`GWSB`
  signal.** The golden-hour system is now a genuine interconnect, not a one-off. Surfaces still cold at dawn/dusk: the
  **beach sand** (145 ties it to `LITAMT`, not `GWARM`), the **wind turbines** (181's banked "warm rim"), and the
  west-facing **civic domes/pediments**. Each is a ready Sky Deepen that adds no element — read `GWARM>0.02` and carry
  the warmth with `'lighter'` glints, never an alpha wash (181).
- **A DIRECTIONAL DRAW-ONLY CHANGE NEEDS A DIRECTIONAL PROBE — split the box, don't just diff it.** The census and a
  whole-box diff both said "12% of building pixels changed," which a wash would also say; only splitting each box into
  LEFT/RIGHT halves and showing the lit half *flips* dusk↔dawn proved the rake was one-sided (and it is what the census
  and a naive probe are blind to). When a feature's whole point is *which side* lights, the gate must measure the side,
  and a control that must move the *other* way at the other frame is stronger than a control that must stay at zero.
- **THE FIRST STRENGTH THAT PASSES A PROBE CAN STILL FAIL THE EYE — legibility is a separate bar from presence.** The
  `*0.30` build passed the probe on all three seeds (the flip was measurable) yet a strict agent could not *see* the
  directionality; `*0.44` was the same effect, legibly. When a subtle Deepen splits the agents, don't revert on the
  FAIL and don't ship on the probe alone — the probe says it's *there*, the agent says it's not *legible*, and both are
  right. Push the strength until the eye catches what the probe already measured, then re-verify (cheap).

## Iteration 191 — the festival street names itself (2026-07-12) [People & activity × Interaction/UX]

**Vector.** People & activity × **Interaction/UX** (SHIPPED). Rotation named the stalest domain: **People (186)** —
the 190 entry explicitly owed the 191 lap to People, ahead of the mandated step-back at 192. On *kind*, I cashed a
**banked, specific cue** the header had been carrying since 171 and re-flagged after 178: *"171's fete-street TOOLTIP
(`c.fete` drawn but unnamed in `describeTile`) is still banked, and now more worth cashing since the street is no
longer empty."* A banked measured finding outranks kind-rotation (119's law), and Interaction/UX varies cleanly off
186's New element.

**The seam — the richest street in the city read as a plain one.** The festival street (`c.fete`) is a civic mile:
where two civic institutions front the same short stretch of road, the blocks between them string up bunting (a whole
CA derivation in `tick()`, ~L1866), light the strand at dusk, and — since 178 — fill with a milling day-into-dusk
crowd. Yet `describeTile`'s ROAD branch knew nothing of it: hovering the most decorated, most inhabited street in the
diorama reported a flat `Avenue`/`Street`/`Boulevard` like any other. The exact *asserts-less-than-the-code-knows*
tell (MARSH tide 113, REDWOOD 117): a draw stages something the tooltip is mute about.

**Change (draw-nothing tooltip, two edits in `describeTile`).** (1) In the ROAD title branch, a `c.fete` override:
title `'Festival street'`, sub `'The civic mile &mdash; bunting strung overhead where two institutions front the same
short blocks.'` (HTML entity, not a raw em-dash byte — 134's mojibake law; the sub goes into `innerHTML`). (2) A live
`Festival` data row after the `Traffic` row, reading the **same crowd gate the 178 draw uses** —
`clamp((0.82-LITAMT)/0.28,0,1)>0.02 ? 'Crowds under the bunting' : 'Quiet after dark'` — so the tooltip can never claim
a crowd the renderer left home (one predicate, one definition, 112's law). Both branches gate on the same `c.fete` the
draw reads. No tile / entity / `rng()` / `hashCell` / `tick()` pass / terrain change; census hook, TILELABEL, ENTINFO
untouched. Pop + stream provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, all core metrics **+0**, entity/life/transport
counts identical (`solarRoofs -2` = RAF tick-count jitter; `describeTile` isn't even in the census path). Vacuous by
construction (hover-only) — the probe is the gate.

**Probe — `probes/probe-fetetip.mjs` (new, promoted).** A DOM/logic probe (like `probe-river`), not a pixel diff:
loads a developed city (`genWorld`+`__warp`), collects fete vs ordinary ROAD cells, and across a **day** frame
(`__setTime(0.35)`) and a **night** frame (`0.90`) calls `describeTile()` and asserts the HTML, **independently
recomputing** the crowd gate from live `LITAMT` (122's law — grade against recomputed truth, not just that it renders).
seeds 7/42/1234: **every fete hex (16/10/19) titled 'Festival street' with a 'Festival' row matching the recompute**,
the value **FLIPS** day `Crowds under the bunting` → night `Quiet after dark`; **ordinary roads (788/821/855) control
clean** — never titled 'Festival street', never carry a 'Festival' row, in either frame. **VERDICT: PASS (3 seeds).**

**Visual — `probes/shot-fetetip.mjs` (new, promoted).** `shoot.mjs` can't hover; `__find('fete')` gives fete cells'
clip-ready screen coords. Freezes the clock at a day + a night frame, hovers a central fete cell, clip-shoots the
tooltip + prints its `innerText`. seeds 1234 & 7, one agent each, both **VISUAL: PASS**: the tooltip box is legible,
title `Festival street`, the sub's `&mdash;` renders as a clean em-dash (no mojibake / no literal `&mdash;`), and the
`Festival` row reads `Crowds under the bunting` by day, `Quiet after dark` at night; no z-order tears / floaters /
blowout, the whole frame still a coherent coastal city day and night.

**Verdict — SHIPPED.** The festival street — bunting since before 178, a crowd since 178, and mute in the tooltip its
whole life — now names itself and reports whether the crowd is out, on the very gate that draws them. A draw-nothing
Interaction/UX cashing a banked cue: pop + stream flat, two small edits + a probe + a shot. People's Interaction/UX
cell gains 191 (71/**154**/**191**). Next is the mandated **holistic step-back at 192**; the next domain lap (193)
owes Transport (188)/Urban (189), then Nature (183)/Civic (184).

### Findings for later laps
- **CASHING A BANKED TOOLTIP CUE IS THE LOOP WORKING — the header told 191 exactly what to do, five laps after 171
  found it.** 171 spotted `c.fete` was drawn-but-unnamed and banked it; 178 inhabited the street and made it *more*
  worth naming; 191 cashed it. A banked cue that names the seam AND the predicate (`c.fete` in `describeTile`) is a
  near-free iteration — grep the seam, confirm it's still unnamed, share the draw's own gate.
- **A LIVE TOOLTIP ROW SHOULD READ THE DRAW'S OWN GATE VERBATIM, and its probe should RECOMPUTE that gate, not the
  row.** The `Festival` row copies `clamp((0.82-LITAMT)/0.28,0,1)>0.02` from the 178 crowd draw, so tooltip and pixels
  cannot drift; the probe recomputes the same gate from `LITAMT` and asserts equality (122's law). This is the tooltip
  analogue of 123's "share one constant" — but here the shared thing is a *predicate*, and the strongest evidence it's
  right is that the row's value FLIPS between the day and night frames exactly when the recompute does.
- **Still-mute draws worth a future tooltip lap:** `c.hedge` (field hedgerows, drawn, unnamed), `c.party` / `c.shroom`
  (both in `__find`'s selector, so drawn, likely mute in `describeTile`) — grep each before designing to confirm.

## Iteration 192 — the eighteenth step-back finds a clean city, perf flat (2026-07-12) [holistic step-back]

**Vector** — the mandated ~5-iteration step-back (105/110/115/120/125/130/136/142/147/152/157/162/167/172/177/**182**/**187**/**192**). The eighteenth step-back; isolates iters 188–191 (all draw-only: 188 cable-car cabin sway, 189 shopfront night spill, 190 golden-hour window glint, 191 festival-street tooltip) by interleaving HEAD against iter-187's file (`ec206ef`). Not a domain × kind lap — reads the WHOLE city for cumulative drift the census and per-feature gates are blind to.

**Census** — PASS, every core aggregate flat vs baseline (pop/developed/roads unmoved; cafes 455, stations 40, boulevardTrees 1203, greenRoofs 405→406 chaotic-noise). Draw-only run, so this is expected and proves only that no page threw.

**Perf (interleaved HEAD vs iter-187 `ec206ef`, A/B/A/B, min per variant)** — **day 35.16ms (HEAD) vs 35.5ms (187) = −1.0%; night 41.25ms vs 41.25ms = 0.0%.** Flat — four draw-only iterations (cabin sway, shopfront spill, window gold, fete tooltip) cost nothing measurable. (Interleaved delta is the verdict, not the absolute, per the same-session-pristine-control law.)

**Seasons alive** — `probe-season`: FARM winter→dry-peak **88.4**, VINEYARD 44.6→36.7, ORCHARD 25.3→41.4, FIELD 2.4→5.3, ROAD control ~0.5–2.1. The calendar is working across every agriculture tile.

**Visual** — whole-frame reads at 3 lights × 2 calendars (day golden `year=2035.62` / night / winter `year=2035.02`), 2 seeds (42, 7), one agent each, cumulative-drift question. **Both VISUAL: PASS.** Seed 42: balanced diamond city, legible downtown, bright clean sand→teal coast (no dark-coast compounding), genuine lit night (windows + waxing-crescent moon + moonglade), winter a mild-but-present cool variant; no z-order tears/floaters/mojibake/blowout. Seed 7: same verdict — coast clean, night atmospheric (one agent noted the far-right night ocean is fairly dark but moon/moonglade keep it legible — not a failure), winter distinct.

**Verdict — EXPLORED → REVERTED** (no change to commit; `solvista.html` untouched — a step-back, no city vector). **Thirteenth clean bill in a row.** The city is balanced, readable and beautiful at ~191 iterations; nothing has compounded into clutter or darkness; seasons, night mood and coast all read correctly; perf flat. Next domain lap (193) owes Transport (188)/Urban (189), then Nature (183)/Civic (184). Next step-back at **197**.

## Iteration 193 — the ferry lights up for the night crossing (2026-07-12) [Transport × Deepen]

**Vector — Transport × Deepen** (SHIPPED). Rotation: the maintained header named **Transport (188)** as next-owed for 193.
Kind: a night-lighting Deepen, but framed to NOT repeat 179's amber lamp-post move — the ferry carries a distinct
*marine* vocabulary (coloured sidelights), and it is the last transit vehicle in the city with zero night presence.

**The seam — the only dark transit vehicle at night.** Cars carry headlights + red taillights (L5561), buses/trams glow
their window strips, emergency vehicles flash beacons, the bridges lit their deck rails (179), the shopfronts spill onto
the pavement (189). The **ferry** — 2 per city, patrolling the coast band — ran *pitch dark*: its `col('white')` cabin is
night-tinted to dark navy and it showed no light at all while crossing the black harbour. A genuine gap, the exact
179/189 night-light shape on the one vehicle it had never reached, and a Transport×Water interconnect.

**Change (~16 lines, draw-only, at the end of `drawFerry`).** A single `if(LITAMT>0.35)` block: warm cabin windows (4
small squares along the cabin), a white masthead dot over the wheelhouse, red-port / green-starboard nav lights at the
hull ends (`cx-6*dir` / `cx+6*dir`, so they swap with heading), and a soft warm wash ellipse on the water below (mirrors
179's on-river lamp reflection). Source-over low alpha — no blowout (159's overlap law; and 2 ferries never overlap).
Distinct from 179 by design: *coloured* marine sidelights, not amber lamp-posts. No tile / entity array / label / `rng()`
/ `hashCell`-terrain / `tick()` pass; strings pure-ASCII (134). The ferry already has its `ENTINFO` row + `stamp()`, so
no tooltip/label sync needed. Pop + stream provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, all core metrics **+0** (`greenRoofs +1` = documented
RAF tick-count jitter, touches no `rng()`). Ferries 18/matrix = 2/city. Vacuous by construction (draw-only) — the probe
is the gate.

**Probe — `probes/probe-ferrylight.mjs` (new, promoted).** Whole-box PATCH-vs-HEAD diff (161's law) over each ferry's
screen box at a FROZEN frame; `Math.random` stubbed *before* `genWorld` so ferry `fr` is identical across the two loads,
STARS cleared, clock frozen, land movers cleared (163 laws). seeds 7/42/1234: **FERRY lights NIGHT 2.07 / 2.16 / 1.97%
≫ DAY 0.00 / 0.23 / 0.00%** (9× separation; the block never runs by day, LITAMT<0.35) · **BOAT control 0.00% at night**
(fishing boats got no lights — the edit touched ferries only, not all harbour craft). **VERDICT: PASS (3 seeds).**

**Visual.** Night wide + coast clips, seeds 42 & 7 (`t=0.9&step=200`), one agent each, LOCATE-not-judge. **Both VISUAL:
PASS.** Both agents *found* the lit vessels on the water (warm cabin windows + red/green end dots + white masthead),
confirmed the lights sit ON the hull (no floating/tears), the faint reflection reads, the dark fishing boats stay dark,
and the whole night frame stays balanced — sparse lit accents against a large dark sea, no clutter or over-brightness,
city glow still dominant.

**Verdict — SHIPPED.** The harbour ferry — the last transit vehicle to run dark at night — now carries its lights across
the night crossing in a marine vocabulary (warm windows, white masthead, red/green sidelights, a wash on the water),
completing the night-light family (bridges 179, shopfronts 189, windows 190) on the one vehicle it had missed. Draw-only,
pop + stream flat, ~16 lines + a probe. Transport's Deepen cell gains 193. The next domain lap (194) owes **Urban (189,
Deepen/Polish only — measured-saturated)**, then Nature (183)/Civic (184). Next step-back at **197**.

## Iteration 194 — the trees put their feet on the ground (2026-07-12) [Nature × Polish]

**Vector.** Nature × Polish. Nature was stalest (183) and **Polish is its coldest
cell — last touched at iter 96, ~100 iterations ago.** The seam was found by grepping
`shadS` rather than by reading the ledger: peds/dogs (137), the static standing crowds
(163), every vehicle, the gulls, and the buildings (180) all ground themselves with a
contact shadow. The trees — the most numerous vertical object on the plate (~25 call
sites: FOREST 2-4/hex, PARK, QUAD, PLAZA, MEADOW, GARDEN, SHOREPARK, the boulevard
street trees, the redwoods, the beach palms) — cast nothing and floated. **Iter 180's
own comment at the building shadow literally CLAIMS "cars/peds/crowds/trees all use
the same shadS".** They didn't. That is the loop's own richest-seam law (a label
asserting a relationship the draw ignores) found in a *comment* rather than a tooltip.

**Change.** Two `shadS` calls, +12 lines, draw-only. In `tree()` a contact shadow at
the foot of the trunk sized to the crown each species actually carries — broadleaf
0.22, conifer 0.19, poplar 0.11 (its narrow plume shades a fraction of a round head)
— and in `palm()` a 0.15 shadow at the bole's foot (it stays at the base even though
the trunk curves away downwind above it). All at alpha 0.13, deliberately low so a
four-tree forest hex grounds without the floor going dark (159's overlap law).

**Census.** PASS. Draw-only: tile histogram empty, `developed`/`roads`/`tileKinds`
+0, pop -3/154918 (0.002%, noise). Vacuous by construction — the iteration rests on
the probe.

**Probe.** `probes/probe-treeshadow.mjs`, build-vs-build over a deterministic in-page
rebuild (161). The gate exploits a physical fact: **a contact shadow can only DARKEN**,
so `lighter` px must be exactly 0.

| class | darker | lighter | meanLum |
| --- | --- | --- | --- |
| FOREST (host) | 4.06 / 4.87 / 3.23% | **0.00** | -0.36/-0.44/-0.29 |
| PARK (host) | 2.59 / 2.53 / 2.66% | **0.00** | -0.27/-0.27/-0.28 |
| LAND-ctl (1014 cells) | 0.00 / 0.00 / 0.00% | 0.00 | 0.00 |
| WATER (700+ cells) | 0.00 / 0.01 / 0.00% | 0.00 | 0.00 |

3 seeds. Zero lighter pixels anywhere, on any seed.

**Visual.** Both seeds VISUAL PASS; both agents *located* the tree cover correctly
(inland forest wedges + the palm line on the shore), so they actually looked. The
seed-42 agent warned the dense conifer grove went *"distinctly darker/olive-muddy...
near the tolerable limit"* — the kelp failure mode, and worth taking seriously. **It
was confabulation, and the probe proved it:** FOREST mean luminance shifts by
**-0.36..-0.44 out of 255**, i.e. less than half of one luminance level. The grove's
pixels *move* (4.9% of them) but its tone does not sink. Agents name causes; a number
is the verdict.

**Perf.** `probes/perfab.mjs` (new; interleaved A/B/A/B vs pristine HEAD, min per
variant, because a stored baseline cannot answer "did MY change cost anything").
**day +3.4%, night +3.5%** — consistent across both scenes, so real, not noise. This
is the honest price of an ellipse fill on the most numerous object in the city. Within
tolerance and within precedent (118 shipped night +5.1%), but **logged as a real cost,
not waved through** — the next step-back (197) should watch it.

**Verdict: SHIPPED.**

### Findings

- **The richest seam can be a COMMENT, not a tooltip.** The loop's law says a *label*
  asserting a relationship the draw ignores is a bug. It generalizes: iter 180's code
  comment asserted trees used `shadS` and nothing had ever checked. **`grep` the shared
  primitive (`shadS`) for who calls it, and diff that against who *claims* to.**
- **A control that is contaminated is not a control — fix the control, don't move the
  threshold.** The first run FAILed on a farm control reading 0.26-0.41% darker. It
  would have been trivial (and wrong) to loosen the gate. The cause was **box bleed**:
  at R=12px the sample box around a farm cell reaches into the tree-bearing hex next
  door. Excluding tree hosts within *two rings* drove it to exactly 0.00% — which
  **proves** the bleed explanation instead of asserting it.
- **A hand-maintained predicate drifts from the draw it mirrors (one-predicate law,
  again).** A residual 0.026% on the land control was not noise — it was GARDEN and
  SHOREPARK missing from my `TREEHOST` set. **Attribute each `tree()`/`palm()` call to
  its enclosing `case T.X:` from the source rather than guessing the host list**; the
  marginal number was a real hole, not a threshold to fudge.
- **A rejected optimization is still a result.** `shadS` rebuilds an `rgba()` string
  per call, and with trees it is now the hottest draw call in the frame — so memoizing
  it looked free. Measured: **it bought nothing** (+3.6/+3.1 vs +3.4/+3.5, pure noise).
  Chrome already caches the fillStyle parse; the cost is the ellipse path+fill itself.
  Reverted, so the diff is exactly the feature. **Don't ship an optimization you did not
  measure — and don't keep one that measured zero.**
- **Banked for Nature:** the shadow is *centered* (house style — nothing in the artifact
  casts a directional shadow). If a future Sky vector ever gives the city a real sun
  direction, `shadS`'s call sites are now a complete, single-primitive inventory of every
  grounded object, and a directional pass could be done in one place.
