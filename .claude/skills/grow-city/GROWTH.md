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
| **Water & coast** | 6, 10, 12, 16, 20, 33, 106, **169** | 90 | 17, 25, 51, 65, 72, **113**, **123**, **159**, **196** | 22 | | U2, 44, 58, 79, **116**, **132**, **150**, **185** | **97**, **141**, **176** |
| **Urban fabric** | 32, 62 | 7, 23, ~~82~~, **151** | 38, 54, 68, 92, **165**, **173**, **189** | 47, **109**, ~~**160**~~ | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103**, **110**, **118**, **124**, **143**, **180** | **133** |
| **Transport** | 2, 9, 21, 31, 48, **164** | 77 | 28, 39, 55, 63, **112**, **121**, **128**, **155**, **179**, **193** | 5, 15, **138** | U4 | U1, U3, 70, 85, 87, 94, **146**, **188** | **105**, **171** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107** | 36, 59, 66, 80, 91, **149**, **158**, **175**, ~~**195**~~ | 45 | | 73, ~~**114**~~, **168** | 52, 122, **140**, **184** |
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
  Sky **190** · People **191** · Transport **193** · Urban **189** · Nature **194** · Civic **195** · Water **196**.
  **⚠ 198's vector is CHOSEN, and it is not a rotation pick: the tree-shadow PERF FIX (Nature × Polish).** 197's
  step-back measured the first non-flat lap since 142 and localized it to one draw; SKILL.md's step-back rule is
  explicit that a measured regression outranks adding more ("if it regressed, the next iteration is a perf-fix
  iteration"). It is cheap and the lever is already known (batch the per-tree `shadS` fills per hex — see the PERF
  bullet). **After 198, the lap resumes owing Urban (189, Deepen/Polish only — measured-saturated), then Sky (190)/People (191).**
  **196 took Water × Deepen (the kelp bed breathes with the tide — SHIPPED).** `describeTile`'s `tidal` test (L6759)
  includes `T.KELP`, so a kelp bed has always printed a live `Tide` row (`High water`/`Flooding`/`Ebbing`/`Low water`)
  over a draw that read `TIDE` **nowhere** — iter 113's marsh defect, one tile along, unnoticed for 83 iterations. On the
  ebb the four canopy mats now rise, spread and lighten toward exposed olive, and each frond tip lies over and trails
  along the surface; **at/above `TIDE` 0.62 every term is 0 and the draw is byte-identical to HEAD**, so the tide only
  ever *adds* the exposed canopy and can never darken the bed (that byte-zero is what keeps this clear of the historic
  kelp-darkness failure mode). Shares the marsh's own `ebb` cut (0.62) rather than inventing a second threshold (123's
  run-the-tell-forwards move). `lq` quantizes the tide factor into 4 steps because **`colMix` caches on `t`** and a
  continuous `t` defeats that cache. Draw-only, pop+stream flat, census vacuous. `probe-kelptide` diffs **LOW vs HIGH
  water within ONE build** (frozen clock, same `genWorld`), so the only variable is `TIDE`: **BASE kelp interior 0.00%
  on all 3 seeds (deaf — the seam) vs PATCH 35.7-41.9% (answers)**, BEACH as the **positive control** (moves identically
  on both builds, proving the tide pin is live — without it "BASE = 0" would be a dead pin, not a finding), ROAD 0.00%.
  Both seeds VISUAL PASS and both agents correctly **located** low water by the kelp alone. **Two things banked for
  197's step-back: (a) 194's tree-shadow perf cost (day +3.4% / night +3.5%), and (b) at HIGH water the kelp hexes are
  still the darkest pixels in the water — if the bed count ever grows, kelp is the first thing that would band.**
  **So the next domain lap (198) owes Urban (189, Deepen/Polish only — measured-saturated), then Sky (190)/People (191);
  197 is the mandated STEP-BACK.**
  **195 took Civic × Deepen and EXPLORED → REVERTED (`solvista.html` byte-identical to HEAD).** The finding is
  solid and still uncashed: **`university` is the ONLY one of the twelve civics with no `LITAMT` at all** — the
  only `MAJORK` monument that goes pitch dark after sunset (parliament floodlights 175, museum facade, hall clock
  149, library reading hall, police beacon, hospital cross, observatory dome 158; even the school keeps one
  janitor's window). 179/193's shape exactly: a completed family missing one member. What failed was every
  **place to put the light**, and that is now known: (i) **the CAMPANILE ORPHANS A HALO** — tall and thin, so a
  taller neighbour drawn later (seed 7 sits beside a hospital tower) swallows the lamp while the glow, being
  bigger than its lamp, spills into open sky; an agent found *"a detached hazy glow blob floating in the sky,
  unattached to any geometry."* To revive it, **gate the halo on there being no taller cell in the rows below**
  (draw order IS depth order) — dimming it does not help. (ii) the **quad is occlusion-safe but the tile's OWN
  wings overdraw it** by an amount that flips with `fxU`'s per-seed sign (50 changed px on seed 42, **3** on
  seeds 7/1234, identical code). (iii) The tile is simply drawn **small** — no ornament on it carries at fit zoom
  without a glow that extends past the geometry, which is the thing that orphans. **⇒ The university is a
  `polish-tile` job, not a growth lap.** `probes/probe-unilight.mjs` (whole-frame diff + centroid locate-check;
  noon/dusk controls byte-identical at **exactly 0 px**) and `probes/shot-uni.mjs` are kept so a retry starts
  from a working gate. **So the next domain lap (196) owes Water (185), then Urban (189)/Sky (190); next
  step-back at **197** (which also owes 194's flagged tree-shadow perf cost a look).** (162, **167**, **172**, **177**, **182**, **187**, **192** = step-backs, no domain lap.) **191 took People × Interaction/UX (the festival street names itself — the `c.fete` civic-mile road, bunting-strung since before 178 and crowd-filled since 178, was mute in `describeTile`: it now titles 'Festival street' with a live `Festival` row reading 'Crowds under the bunting'/'Quiet after dark' off the SAME `clamp((0.82-LITAMT)/0.28,0,1)>0.02` gate the 178 crowd draw uses; a banked cue from 171 finally cashed (119's law: a banked measured finding outranks kind-rotation). Draw-nothing tooltip, pop+stream flat, `probe-fetetip` recomputes the gate independently — every fete hex named + row FLIPS day→night, ordinary roads control clean, 3 seeds; both seeds VISUAL PASS, `&mdash;` renders clean. Still-mute draws banked: `c.hedge`, `c.party`, `c.shroom`.) **192 was the mandated STEP-BACK — eighteenth, THIRTEENTH clean bill in a row (perf 188→191 flat: day −1.0%/night 0.0% vs iter-187 `ec206ef`; seasons alive FARM dry-peak 88.4; coast bright, night lit, winter present, both seeds VISUAL PASS). No city change.** **193 took Transport × Deepen (the ferry lights up for the night crossing — the LAST transit vehicle to run dark at night now carries warm-lit cabin windows + a white masthead + red-port/green-starboard nav lights + a wash on the water, completing the night-light family (bridges 179, shopfronts 189, windows 190) on the vehicle it had missed; framed to NOT repeat 179's amber lamp — a distinct MARINE vocabulary of coloured sidelights; draw-only stream+pop-neutral, `probe-ferrylight` FERRY night 2.0–2.2% ≫ day 0–0.23%, BOAT ctl 0.00% at night (ferries only), 3 seeds; both seeds VISUAL PASS, agents located the lit vessels). So the next domain lap (194) owes Urban (189, Deepen/Polish only — measured-saturated), then Nature (183)/Civic (184); next step-back at **197**. **190 took Sky × Deepen (the golden hour rakes the sun-facing WINDOWS — an additive warm-gold glint on ONE front face of every building's glass at dawn/dusk, RIGHT at dawn / LEFT at dusk off `dayT`, cashing 180/181's banked "windows catch the low sun"; the THIRD golden-hour surface off the one `GWARM` signal after clouds 161 & sea 181, a Sky×Urban interconnect hooked into the shared `winBandR` so it reaches all 4 building types full-height; draw-only stream+pop-neutral, `probe-windowgold` splits each box L/R to prove the rake is one-sided AND flips: dusk L≫R, dawn R≫L, byte-zero noon/night, 3 seeds; a split agent verdict at `*0.30` was resolved by the probe then re-verified at `*0.44` — legibility is a separate bar from presence). So the next domain lap (191) owes People (186), then the mandated step-back at 192.** **189 took Urban × Deepen (the lit shopfronts spill warm light onto the pavement in front at night — the COM storefront glass, the brightest ground-floor plane in the city, cast NOTHING on the street it faces while lamps/bridges/neon all glowed; a warm ground pool on the road-facing `fs` side gated `LITAMT>0.4 && v>0.5`, source-over low alpha matched to the street lamps' amber so a row of adjacent shops stacks without blowing to white (159's overlap law), positioned via `kerbS`'s face maths + `faceOutS`; a ground-plane Urban Deepen since Urban's additive/Connect are spent, draw-only stream+pop-neutral, `probe-shopspill` COM v>0.5 night 0.22–0.30% → day 0.00% 3 seeds, v<=0.5 gate-control ~0.01% both frames; both seeds VISUAL PASS, no blowout in the dense core). So the next domain lap (190) owes Sky (181, Deepen/Fix ONLY — saturated), then the step-back at 192.** **188 took Transport × Polish (the cable-car cabins rock on their hangers in the breeze — each cabin now PIVOTS about its fixed cable point, the hanger top staying on the rope while the body swings under it, two out-of-phase per-cabin sines, ~±2.4px so it reads at moderate zoom; the aerial transit hung rigidly vertical for the artifact's whole life while whitecaps/kites/flags all moved in the same wind, so this fixes a stillness rather than repeating 179's night-lamp move — draw-only off `time`, no rng/state, pop+stream flat; a MOTION claim so a TEMPORAL probe: `probe-cabinsway` freezes the SIM and steps only `time`, cabin `_sx` swings 4.1–4.5px pk-pk, `_sy` control 0.000, frozen monorail-train `_sx` control 0.000, 3 seeds; both seeds VISUAL PASS at ~3× — cabin stays connected by its hanger to the fixed cable, offset differs A↔B). So the next domain lap (189) owes Urban (180), then Sky (181); step-back at 192.** **186 took People × New element (the park café tables fill with seated day-only patrons — the 455-strong `cafes` surface put out parasol tables since before the ledger but never a single diner, the same amenity-with-no-people seam 127 found on the picnic lawn; `hashCell`-scattered, `LITAMT<0.5` so the terrace empties at night; draw-only stream+pop-neutral, `probe-cafepatron` CAFE day 0.93–0.99% → night 0.00% byte-identical, PARKC+ROAD ctls ~0, 3 seeds; a seed-7 agent FAIL claiming day/night INVERSION was disproven by the probe — its "night figures" were the base shop's lit windows. NB a later same-case draw (pond/fountain, `v<0.32`) OVERDRAWS the tables, so the shot selector hunts a `v>=0.44` front-most café). Next is the mandated STEP-BACK at 187; the next domain lap (188) owes Transport (179), then Urban (180)/Sky (181). **184 took Civic × Interaction/UX (the town hall clock tells its time on hover — a `Clock` row via a new `clockWord(dayT)`, reading the same slow day clock the drawn hand has pointed at since 149; kind repeated 183 because every other Civic kind is spent-or-hot, and saturation beats kind-rotation (118); draw-nothing tooltip, pop+stream flat, `probe-hallclocktip` clock-match 7/7 × 3 seeds, 7 distinct times across the day, non-hall control 500/500 clean). So the next domain lap (185) owes Water (176), then People (178)/Transport (179)/Urban (180). 185 took Water × Polish (wind-driven whitecaps break on the open swell — sparse seeded `hashCell` foam caps on open water beyond the coastal shelf `rDeep>SHELF1`, day-only via `LITAMT<0.6` so the night hands off to the moonglade; the one texture the flat daytime mid-ocean lacked, aimed at the biggest untouched water SURFACE not another coast entity; draw-only stream+pop-neutral, `probe-whitecap` SEA 0.21-0.30% day ≫ SHELF ≤0.07 ≫ LAND 0 → night 0, 3 seeds; agents "just right, slightly faint" after a size/alpha bump). So the next domain lap (188) owes Transport (179), then Urban (180)/Sky (181); step-back done at 187, next at 192.** **194 took Nature × Polish (the trees put their feet on the ground — every tree and palm now drops the house-style `shadS` contact shadow that peds/dogs (137), the static crowds (163), every vehicle and the buildings (180) have dropped for dozens of iterations; the trees, the most numerous vertical object on the plate, floated. Found by grepping the shared primitive, not the ledger: **180's own comment CLAIMS "cars/peds/crowds/trees all use the same shadS"** — the assert-what-the-draw-ignores law, in a COMMENT rather than a tooltip. Sized per species (broadleaf .22 / conifer .19 / poplar .11 / palm .15) at alpha .13 so a 4-tree forest hex grounds without the floor going dark (159's overlap law). Draw-only, census vacuous; `probe-treeshadow` gates on the fact that **a contact shadow can only DARKEN** — FOREST 3.2-4.9% / PARK 2.5-2.7% darker px with **ZERO lighter on every seed**, LAND-ctl (1014 cells) and WATER byte-flat, 3 seeds. A seed-42 agent warned the dense grove went 'olive-muddy, near the tolerable limit' (the kelp failure mode) — **confabulation, disproven by the probe: FOREST mean luminance moves -0.36..-0.44 of 255**, under half a luminance level. ⚠ **COSTS day +3.4% / night +3.5%** (interleaved A/B vs pristine HEAD, `probes/perfab.mjs`) — an ellipse fill on the city's most numerous object; within tolerance and precedent (118 shipped +5.1% night) but a REAL cost — **197's step-back should watch it**. A memo of `shadS`'s rgba() string was tried to buy it back and measured ZERO — reverted.) So the next domain lap (195) owes Civic (184), then Water (185); next step-back at **197**.
  **Sky is post-saturation (Deepen/Fix ONLY — its additive/CA cells are traps).** **Urban is measured-saturated: additive spent (118), and Connect measured-hard TWICE** — 160 (RES terracing: no seed forms E-W RES runs of >=3) and 165 (high-street arcade: the `hstr` parade zigzags with row parity, longest straight-hex-axis run = 2, so it is not a clean arcade host); **Urban's next lap is Deepen/Polish only** (or a COM arcade if a *straight-hex-axis* retail run is ever found — the parade is not one). **Roof-furniture is CLOSED city-wide** across all 5 developed types (MID/RES water tanks, TOWER gardens, COM plant 165, IND warehouse north-light clerestory 173) — no bare roof is left, so a future Urban "bare roof" vector has no host; Urban Deepen must go elsewhere (facades, ground plane, harbour apron). (The per-lap recaps of **173-185**, and their superseded "next lap owes" pointers, were rotated into `GROWTH-archive.md` at iter 196 to pay for 196's lines — the header is a fixed budget, and the ROTATION line above is the live pointer.) Check the last entry of the stalest domain for a banked
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
  **Iteration 202 is the next holistic step-back** (105, 110, 115, 120, 125, 130, 136, 142, 147, 152, 157, 162, 167, 172, 177, 182, 187, 192, **197 — all done**). **197 was the 19th, and it BROKE the clean-bill streak at thirteen — not visually (the city is clean: both seeds VISUAL PASS at 3 lights × 2 calendars, census PASS, seasons alive FARM dry-peak 88.4, night core located (.47,.45)/(.53,.57)) but on PERF: 193+194+196 cost day +3.8/+4.4%, night +2.9/+3.0%, all of it 194's tree shadows.** Both of 197's owed watch items came back **clean**: (a) the tree-shadow *visual* fear was confabulation for the third time — both agents read the groves "grounded-and-clean", not olive-muddy — but its *perf* cost is real, replicated, and now the header's live perf item; (b) **196's kelp watch item is CLOSED, and cannot fire**: KELP is **8–17 beds per seed and IDENTICAL across all three eras** (census tile histogram), i.e. the bed count is fixed at `genWorld` and nothing in `tick()` grows it, so the "if the bed count ever grows, kelp would band" precondition has no mechanism. Both agents confirmed "no dark lining / no crusty seam where the kelp bed sits."
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
  **The tell (a label asserting what the draw ignores) is CASHED 7x and its hosts are nearly spent** —
  117 redwoods, 122 `CIVICLABEL`, 129 orchard, 140 plaza/quad titles, 148 vineyard, 183 FARM. Still MUTE:
  `[T.IND]` (no calendar) and GARDEN (its draw is season-frozen — needs a Deepen first). Detail archived at 195.
  **The tell is SELF-RENEWING: cashing one creates the next.** The full 111->148 history is in GROWTH-archive.md.
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
  (The stale 182-step-back / lap-160 pointers that sat here were rotated into
  `GROWTH-archive.md` at iter 195 to pay for 195's lines — the header is a fixed budget.)
  Sky is post-saturation (Deepen/Fix ONLY — its additive/CA cells are traps;
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
- **PERF — the interleave is the ONLY honest grade, and it is NOT re-pinned.** The stored `perf-baseline.json`
  (day 33.16ms · night 37.33ms, pinned iter 105) has now false-FAILed **nine** step-backs running
  (125→130→136→142→147→152→157→162→**197**) because it always understates *today's* machine load — baking today's
  load in would blind the gate, so it stays stale on purpose. Grade a lap **only** by an interleaved A/B/A/B
  against the PREVIOUS step-back's commit, min per variant (`probes/perfab.mjs`, `REF=<sha>` since iter 197).
  Per-iteration history 105→162 (all ~ZERO except 142's +2.2% night) is in `GROWTH-archive.md`.
  **The day column is the NOISY one on this box — grade it only by min-of-≥2-rounds interleave and check the
  round spread; night is steady and is the SLOW-accumulating column** (night-only draws pile up there: 118's
  lit panes, 138's arterial lamps, 193's ferry lights).
  **⚠ 197 found the FIRST non-flat lap since 142, and it is REAL: 193+194+196 cost day +3.8/+4.4%,
  night +2.9/+3.0%** (two independent interleaves vs iter-192 `d8819ec`). It is **all 194's tree shadows** —
  193 and 196 are free. Within precedent (118 shipped +5.1% night; 142's +2.2% was accepted) and NOT an
  emergency, but it is a per-object `fill()` on the city's most numerous object. **The lever is known: 194
  already proved memoizing `shadS`'s rgba string buys ZERO, so the cost is the FILL COUNT, not the string —
  batch a forest hex's ~4 tree shadows into ONE path with ONE fill.** See 197's entry.
  (**A 2+-round day+night interleave overruns the 120s Bash timeout — but do NOT pipe it through `tee`:
  node block-buffers stdout to a pipe, so a backgrounded run looks EMPTY until it exits and you will think it
  died (197 lost a run that way and re-ran it). Run it foreground with a long timeout, or read the task file
  after exit.** **⚠ `cp` is aliased `-i` here — use `/bin/cp` or every swap silently no-ops and you measure ONE
  file 4×, iter 147.**)
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
  **(e½) CLOSED — iter 102 shipped the commons that 101 prescribed. The interior HAS its lung; do NOT plant a second one.**
  Its brief, and the durable urban findings it carried (`PARK` is permanent; green costs ~0.045% pop/cell and partly
  repays it; never zone against `TOWER` near the core; the upgrade probability saturates), were rotated into
  `GROWTH-archive.md` at iter 197. 101's "a lung must be a BLOB, not a ribbon" is now SKILL.md's contrast law.
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

> **Archive:** the 190 entries before Iteration 188 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

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

## Iteration 195 — the university will not light (2026-07-12) [Civic & culture × Deepen]

**Vector.** Civic & culture × Deepen (rotation owed Civic — last lap 184; kind varied
off 184's Interaction/UX).

**Change (attempted).** *The one dark institution.* Grepping `LITAMT` across all twelve
`c.kind` civic draw branches turned up a clean, measured gap: **`university` is the only
civic in the city with no `LITAMT` reference at all** — the only one of the five `MAJORK`
monuments that goes pitch dark after sunset, while the parliament floodlights its colonnade
(175), the museum its facade, the hall its clock (149), the library its reading hall, the
police its beacon, the hospital its cross, the observatory its dome (158), and even the
school keeps one janitor's window burning. Same shape as 179 (dark bridges) and 193 (dark
ferry): a completed family with exactly one member missing. Three draw-only elements were
tried, all inside the `kind==='university'` branch:
(a) the wing's flat dead glass strip → the city's own per-pane `winBandR` field (salt
`0x5CB1`), so a scattered few panes burn and the rest are nobody home;
(b) the campanile's belfry lantern burns warm, with a radial-gradient additive halo;
(c) a warm courtyard pool on the quad the wings enclose.

**Census.** PASS every build. `pop`/`roads`/`developed` **+0**, tile histogram empty,
`pageerrors: 0` — draw-only, `hashCell` off `seedNum`, stream- and pop-neutral throughout.
(Vacuous by construction, as expected for a night draw; the probe is the gate.)

**Probe.** `probes/probe-unilight.mjs` — whole-frame PATCH-vs-HEAD diff (161's law: two
builds run identical code save the edit, so **every differing pixel IS the edit**, and its
CENTROID must land on the university, which makes it a locate-check and not just a
magnitude). Controls were clean throughout: **NOON and DUSK exactly 0 changed px** on all
three seeds — byte-identical, because `winBandR` falls through to the very `bandR`/`colLit`
call it replaced below `LITAMT<0.35` and `lit` is 0 by day. The target never earned its
place:
- lantern pane alone: **5 / 47 / 8** changed px whole-frame (seeds 7/42/1234) — *at the
  noise floor*; both visual agents saw nothing on the tower.
- + halo: **21 / 136 / 44**, then **27 / 155 / 61** once the halo was drawn last. Legible
  at last — seed 42's agent, asked strictly to hunt for a rim: *"obvious… the single
  brightest thing in the frame… reads as LIGHT, fades smoothly, no visible rim, ring or
  seam even where it crosses the spire… the spire stays green."*
- occlusion-safe elements only (windows + quad): **3 / 50 / 1** — sub-perceptual again.
  Pushing the alphas to compensate **broke the noon control** (6 px): raising the window's
  `f` from 0.85 to 0.90 also moved the *day* fallback colour. The control caught it.

**Visual.** The halo build was beautiful on seed 42 and **broken on seed 7**, where a
blind agent found *"a detached hazy round glow blob floating in the empty sky just off the
tower's right edge, unattached to any geometry"* — **the halo, orphaned.** The campanile is
tall and thin, so a taller neighbour (seed 7 sits beside a hospital tower, drawn later
because it is a lower row) swallows the lamp while the glow, being by construction larger
than its lamp, still spills into open sky. A light with no visible source: the invariants'
"no floating" clause, and a procedural city must hold on **every** seed, not one.

**Verdict: EXPLORED → REVERTED.** `solvista.html` is byte-identical to HEAD. The
*diagnosis* stands and is still worth cashing; what failed is every **place to put the
light**, and that is now known rather than guessable. `probes/probe-unilight.mjs` and
`probes/shot-uni.mjs` are kept so a retry starts from a working gate.

**Findings — read these before retrying the university.**
- **The campanile is the WRONG HOST for a glow, and cannot be fixed by dimming it.** Any
  halo is larger than its lamp; on a tall thin tower a later-drawn neighbour hides the lamp
  and not the halo. To revive it, **gate the halo on there being no taller cell in the rows
  below** (the draw order *is* the depth order) — the guard is the fix, not the alpha.
- **The quad is occlusion-safe but the tile's OWN wings overdraw it**, by an amount that
  flips with `fxU`'s per-seed sign — hence 50 px on seed 42 and 3 px on seeds 7/1234 for
  the identical code. Reconciling the wing/quad geometry is a **tile redesign** →
  **`polish-tile`, not a growth lap.** That is the real referral: the university tile is
  simply drawn *small*, and no night ornament on it can carry at fit zoom without a glow
  that extends past the geometry — which is exactly the thing that orphans.
- **A LOUD test must be measured against the LOUD COLOUR, not re-run through the same
  PATCH-vs-HEAD diff.** Painting the lantern pure red and comparing red-vs-HEAD (139 px) to
  warm-vs-HEAD (136 px), I concluded it was "95% occluded" — **wrong, and wrong by
  construction**: both builds change the same pixel *set* versus HEAD, so the totals
  coincide no matter what colour the change is. A direct **red-pixel count** in the loud
  build (13 / 85 / 36 px) showed it was rendering fine all along. The diff is blind to
  *which* colour; only a count of the loud colour isolates the draw. (161's corollary (b)
  says force it loud — this says *how to read the loud frame*.)
- **Freezing `playing` is NOT freezing the clock.** `waveT` and `time` keep whatever
  wall-clock-dependent value the RAF loop reached before the freeze, so two loads render
  different water: the probe's first cut had a **10–22 px noise floor of drifting surf**,
  700–900 px from the university, sitting right on top of a 5–47 px signal. Pinning
  `waveT` *and* `time` (163's laws name STARS/movers/`genWorld`, but not these) took the
  unchanged frames to **exactly 0**. An honest zero is what made every later number
  readable.
- **Do not compute a tall civic's clip from `h`.** It cost **two false VISUAL FAILs** on
  framing alone. The campanile is drawn from `px(gx-fxU*0.18, gy-0.34)` — an origin already
  well above the tile centre — so `h` always under-counts and the spire crops. `shot-uni.mjs`
  now clips from the top of the viewport: extra sky is free, a cropped spire costs an agent
  round.
- **A flat additive `arc()` is a coin, not a glow** — hard circular rim, and it tints
  whatever sits inside it (the green spire went olive). `createRadialGradient` falling to
  alpha 0 at the rim fixes both. The artifact already knew this: the rain damp-patch
  (~L6216) is a gradient, commented *"soft-edged, or it reads as a decal."* **Reuse it for
  any glow.**
- ⚠ **`greenRoofs` jitters run-to-run in the census on IDENTICAL bytes** (404 → 405 → 406).
  Not a vector's doing — it is the wall-clock-dependent tick count between load and warp
  (163's law (c)) leaking into a counted metric. Harmless at this size, but **do not chase
  it as a regression**, and do not trust it as a growth signal.

## Iteration 196 — the kelp bed breathes with the tide (2026-07-12) [Water & coast × Deepen]

**Vector — Water & coast × Deepen** (SHIPPED). Rotation: the header named **Water (185)** as next-owed for 196. Kind:
Water's last lap was a Polish (185 whitecaps), so this varies to **Deepen** — and Deepen is the documented high-yield
move for a domain whose basics are all present.

**The seam — a tooltip that has been printing a number the draw never read.** `describeTile`'s `tidal` test (L6759)
reads `BEACH || DUNE || KELP || MARSH || (WATER && !riv) || pierAt`, so **hovering a kelp bed prints a live `Tide` row**
(`High water` / `Flooding` / `Ebbing` / `Low water`). The KELP draw case (L3358) read `TIDE` **nowhere**: its canopy mats
and fronds drifted on `waveT` alone. That is *exactly* iter 113's marsh defect — a label asserting a relationship the
draw ignores, which this skill calls the richest seam in the artifact — sitting one tile along from the marsh, unnoticed
for the 83 iterations since. It is also the physically signature kelp behaviour: a canopy-forming alga floats up and
**mats at the surface** on the ebb, and drowns at high water. BEACH (damp margin + tidepools) and MARSH (113) already
answer the tide; KELP was the last inshore tile that did not.

**Change (~14 lines, draw-only, in `case T.KELP`).** One factor, `low = clamp((0.62-TIDE)/0.62,0,1)` — deliberately the
marsh's own `ebb` cut, so the two tidal tiles share a threshold rather than drifting apart (123's run-the-tell-forwards
move). On the ebb: the four canopy mats **rise** (`my - low*1.3`), **spread** (`rr *= 1+low*0.42`) and **lighten**
toward exposed olive (`t += lq*0.26`); and each frond tip, no longer able to stand, **lies over and trails along the
surface** (a short quadratic, `low>0.15`). **At and above TIDE 0.62 every term is zero and the draw is byte-identical to
HEAD** — the tide only ever *adds* the exposed canopy, it never darkens the bed, which is what keeps this clear of the
kelp-darkness failure mode. `lq` quantizes `low` into 4 steps because `colMix` **caches on `t`** and a continuous `t`
would defeat that cache. No tile / entity / label / `rng()` / `hashCell`-terrain / `tick()` pass; strings pure-ASCII (134).
Host is real but sparse: **8-17 KELP hexes/city** (cf. MARSH 15).

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, every metric **+0**. Vacuous by construction
(draw-only) — the probe is the gate.

**Probe — `probes/probe-kelptide.mjs` (new, promoted).** The isolation is *not* patch-vs-HEAD: it is **LOW water vs HIGH
water within one build**, frozen clock, same seed, same `genWorld` — so the only variable is `TIDE` and every moved pixel
is a tide response. Run on both builds it settles the whole claim in one 2x3:

| build | KELP interior (s=0.5) | BEACH (+ctl) | ROAD (-ctl) |
| --- | --- | --- | --- |
| BASE  | **0.00 / 0.00 / 0.00%** (deaf — the seam) | 14.2-17.6% | 0.00% |
| PATCH | **35.7 / 37.5 / 41.9%** (answers) | 14.2-17.6% (untouched) | 0.00% |

**The probe FAILED first, and was right to.** A plain +-10px box around each kelp centre showed BASE kelp already moving
**3.2-4.7%** with the tide — which would have killed the premise. The cause was **box bleed**, not a kelp response: kelp
abuts the beach, and the beach's damp margin (`w2 = 2.4+(1-TIDE)*5`, up to ~7px) is drawn on the BEACH hex but **spills
across the shared edge**. Rather than shrink the box until it passed, the probe now **masks to the hex and sweeps the
mask** — BASE kelp goes `0.53% -> 0.00% -> 0.00%` as the mask tightens (the residual walks out entirely: it was all rim),
while PATCH goes `19.5% -> 28.2% -> 37.5%` (*rising*, i.e. the response is centrally located, so it IS the canopy and not
a rim artifact). BEACH is the **positive control** — it moves identically on both builds, proving the tide pin is live,
without which "BASE kelp = 0" would be a false negative from a dead pin rather than a finding. `waveT` **and** `time`
pinned per 195(f) — the mats drift on `waveT`, so an unpinned clock would have drowned the signal in sway.

**Visual.** Coast clips at low vs high water + an un-zoomed wide frame, seeds 42 & 7, one agent each, LOCATE-not-judge.
**Both VISUAL: PASS.** Both agents were asked which frame is low water *by the kelp alone* and **both got it right**
(seed 7's with the two filenames deliberately listed in scrambled order): they described the spread olive surface mat and
the trailing frond tips at low water vs. "dark water with a couple of upright frond ticks" at high. Both confirmed the
effect stays inside the hex faces (no bleed, no tears, no blowout) and — the question that matters for this tile — **the
coast has NOT gone dark**: kelp reads as a few discrete beds hugging the shore, not a continuous dark band, sand→shallow→
deep gradient intact. ⚠ Seed 7's agent banked one watch item: *at high water the kelp hexes are still the darkest pixels
in the water*, so **if the bed count ever grows, kelp is the first thing that would start banding**. That is HEAD
behaviour (unchanged here by construction), but it is the kelp failure mode's early warning — worth a look at 197's
step-back.

**Verdict — SHIPPED.** The kelp bed now answers the tide its own tooltip has been printing all along: on the ebb the
canopy floats up, mats and lightens, and the frond tips trail along the surface; at high water it drowns back to dark
water, byte-identically to HEAD. Draw-only, pop + stream flat, ~14 lines + a probe. Water's Deepen cell gains 196. The
next domain lap (198) owes **Urban (189, Deepen/Polish only — measured-saturated)**, then Sky (190)/People (191).
**197 is the mandated STEP-BACK** — and it owes two flagged items a look: **194's tree-shadow perf cost (day +3.4% /
night +3.5%)** and this entry's **kelp-banding-at-high-water** watch item.

## Iteration 197 — the nineteenth step-back finds a clean city and a real perf cost (2026-07-12) [holistic step-back]

**Vector** — the mandated ~5-iteration step-back (105/110/115/120/125/130/136/142/147/152/157/162/167/172/177/182/187/192/**197**). The nineteenth. Isolates iters **193** (ferry night lights), **194** (tree contact shadows) and **196** (kelp tide response) — 195 was reverted byte-identical — by interleaving HEAD against iter-192's file (`d8819ec`). Not a domain × kind lap: it reads the WHOLE city for cumulative drift the census and the per-feature gates are blind to. It also owed two flagged watch items an answer.

**Housekeeping — a DESTRUCTIVE rollback was found sitting in the worktree, and discarded.** Startup found `solvista.html` dirty with a diff that *deleted* 193's ferry lights, 194's tree/palm shadows and 196's kelp tide and added nothing (4 insertions were just the old kelp lines returning). It was not a half-finished iteration but a **stale pristine-control backup copied back over the artifact** — almost certainly a killed perf/probe run that had `/bin/cp`'d HEAD aside and died before restoring. `git stash`ed rather than deleted (stash: *"iter197: stale pristine-backup rollback…"*). **Law for the next runner: a dirty tree whose diff only ever SUBTRACTS shipped features is a corrupted control file, not work to keep — the skill's "keep it if census passes" rule assumes the diff ADDS something, and census would have passed this one happily.**

**Census** — PASS. Every core aggregate flat (pop/developed/roads unmoved; `solarRoofs` −2, `towerHt` +1 = chaotic-CA noise). Tile histogram empty. Correct and expected: all three isolated iterations are draw-only, so the census proves only that no page threw.

**Perf — the finding. FIRST non-flat lap since 142, and it is REAL.** Interleaved A/B/A/B vs iter-192 (`d8819ec`), min per variant, run **twice independently**:

| run | day | night |
| --- | --- | --- |
| A | 36.61 → 38.22ms (**+4.4%**) | 47.55 → 48.94ms (**+2.9%**) |
| B | 40.72 → 42.28ms (**+3.8%**) | 42.83 → 44.11ms (**+3.0%**) |

Two runs agree, and the number matches **194's own self-reported cost** (day +3.4% / night +3.5%) almost exactly — so **the entire lap's cost is 194's tree shadows; 193's ferry lights and 196's kelp tide are free** (both are tiny host counts: 18 ferries, 8–17 kelp beds). Within precedent and NOT an emergency (118 shipped +5.1% night; 142's +2.2% was accepted and never fixed), but this loop *only ever adds*, and this is a per-object `fill()` on the most numerous object on the plate. **The lever is already proven: 194 tried memoizing `shadS`'s `rgba()` string and measured ZERO, which means the cost is the FILL COUNT, not the string.** `shadS` (L2843) is `fillStyle=…; beginPath(); ellipse(); fill()` — one full rasterization per tree, ~4 per forest hex. **⇒ 198 is mandated as the fix: batch a hex's tree shadows into ONE path with ONE `fill()`.**

**Watch item (a) — 194's tree shadows: perf cost CONFIRMED, visual fear was CONFABULATION (3rd time).** 194's own agent had warned the dense grove went "olive-muddy, near the tolerable limit" (the kelp failure mode) and 194's probe disproved it (FOREST mean luminance −0.36..−0.44 of 255). 197's two fresh, blind whole-city agents independently read the groves as **"grounded-and-clean… canopies stay green rather than olive-muddy"** (seed 42) and **"grounded, not muddy — the contact shadows sit tight under each trunk"** (seed 7). The shadows are visually right; only their cost is wrong.

**Watch item (b) — 196's kelp-banding cue: CLOSED, and it CANNOT FIRE.** 196 banked "at HIGH water the kelp hexes are still the darkest pixels in the water — if the bed count ever grows, kelp is the first thing that would band." The census tile histogram settles it: **KELP is 17/10/8 beds on the three seeds and IDENTICAL across all three eras (1985/2005/2035)** — the beds are placed at `genWorld` and *nothing in `tick()` grows them*, so the precondition has no mechanism. Both agents also confirmed the coast directly: "no dark lining, no crusty seam where the kelp bed sits" / "clean sand→turquoise gradient with no dark lining or halo band." The historic dark-coast failure mode stays closed.

**Seasons alive** — `probe-season`: FARM winter→dry-peak **88.4** (identical to 192's), VINEYARD 44.6→36.7, ORCHARD 25.3→41.4, FOREST 20.6→19.7, ROAD control 0.5–2.1. The calendar is working across every agriculture tile.

**Visual** — whole-frame reads at 3 lights × 2 calendars (day golden `year=2035.62` / night / winter `year=2035.02`), 2 seeds (42, 7), one agent each, asked the *cumulative-drift* question and given a **locate** task. **Both VISUAL: PASS.** Night core located by light alone at **(0.47,0.45)+(0.47,0.62)** and **(0.53,0.57)** — matching the historical band (177: (.48,.50)/(.53,.60); 172: (.47,.55)/(.45,.62)), so 115/143's CBD lighting holds. No z-order tears, no floaters, no mojibake, no blowout. Winter reads as a real but mild variant on both seeds (seed 7's agent called it "the weakest signal in the set") — that is 120's known by-design evergreen/irrigated dilution, a composition fact, not a dead calendar.

**Verdict — FIXED** (no city change; `solvista.html` byte-identical to HEAD). The step-back's *job* was done: it found something. **The thirteen-clean-bill streak ends at 197 — not on the city, which is balanced, readable and beautiful at ~197 iterations, but on the frame budget.** The one durable improvement shipped here is to the harness: **`probes/perfab.mjs` now takes `REF=<sha>`** so a step-back can grade a whole lap against the previous step-back's commit instead of only HEAD-vs-working-file — the exact measurement this step exists to make, which it previously could not express. **198 = the tree-shadow perf fix (Nature × Polish); the lap then resumes owing Urban (189).** Next step-back at **202**.
