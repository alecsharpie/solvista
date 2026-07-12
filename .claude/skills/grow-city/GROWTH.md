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
| **Nature** | 4, 26, 29, 102, **156**, **174** | 1, 13, 60, **206** | 37, 46, 67, 76, **108**, **120**, **139**, **166** | ~~46~~, ~~88~~, ~~101~~ | U4 | 53, 96, **194**, ~~**198**~~ | **117**, **129**, **148**, **183** |
| **Water & coast** | 6, 10, 12, 16, 20, 33, 106, **169** | 90 | 17, 25, 51, 65, 72, **113**, **123**, **159**, **196** | 22, ~~**205**~~ | | U2, 44, 58, 79, **116**, **132**, **150**, **185** | **97**, **141**, **176** |
| **Urban fabric** | 32, 62 | 7, 23, ~~82~~, **151** | 38, 54, 68, 92, **165**, **173**, **189**, **199**, **209** | 47, **109**, ~~**160**~~ | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103**, **110**, **118**, **124**, **143**, **180** | **133** |
| **Transport** | 2, 9, 21, 31, 48, **164** | 77 | 28, 39, 55, 63, **112**, **121**, **128**, **155**, **179**, **193** | 5, 15, **138** | U4 | U1, U3, 70, 85, 87, 94, **146**, **188**, ~~**203**~~ | **105**, **171** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107** | 36, 59, 66, 80, 91, **149**, **158**, **175**, ~~**195**~~ | 45, **204** | | 73, ~~**114**~~, **168** | 52, 122, **140**, **184** |
| **Sky & atmosphere** | 27, 43 | | 19, 35, 50, 57, 95, **135**, **153**, **161**, **181**, **190**, **208** | | | 61, 81, 89, **115**, **200** | ~~**134**~~, **144** |
| **People & activity** | 41, 56, **127**, **170**, **186** | 49 | 34, 64, 93, **104**, **119**, **145**, **178**, **201** | 78, **111** | | 84, **137**, **163** | 71, **154**, **191** |

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
  Sky **208** · People **201** · Transport **203** · Urban **209** · Nature **206** · Civic **204** · Water **205**.
  **THE LAP NOW OWES PEOPLE (stalest, 201), then Transport (203), then Civic (204).**
  Urban is measured-saturated in *additive* and *Connect* (see below) ⇒ its lap must be **Deepen or Polish**.
  **209 (Urban × Deepen, SHIPPED: the ground the city stands on) — full recap in its own entry, still in the
  ledger window; its new tell (*a comment stating a standard the adjacent branch is exempted from*) ⇒ SKILL.md.**
  `drawCell`'s `default:` painted the ground under **every** developed hex one flat `sandDk` — a house's garden
  and a factory's yard agreeing **to within 1 RGB unit** — beside a line giving the `EMPTY` lot a patchwork *"so
  it reads as pasture, not paint."* Now `GROUND` = `lawn` gardens / `paving` (new palette entry) / `stone`
  hardstanding. Colour-only, **zero new path objects**, perf free. Three things survive here:
  **(1) ⚠ THE GROUND PLANE IS NOW SPENT** as an Urban Deepen target — **facades** and the **harbour apron** remain.
  **(2) THE DEVELOPED GROUND IS A HUGE SURFACE, MEASURED (`probes/probe-groundvis.mjs`, reusable):** the ground a
  viewer actually SEES is **5.2% of the frame** — RES yards alone **2.21%** (35k px), *more than every open lot put
  together*, and NOT buried (cf. 206). Ask it — *"how much of surface X is visible?"* — before designing on any
  ground-level surface.
  **(3) THE SUBURBS NOW BREATHE WITH THE YEAR** (RES shift **1.2 → 36.8**; PARK positive control 44.1 → 44.6, COM
  `paving` negative control 1.0 → 1.7). ⇒ **When a domain looks interconnect-saturated, re-ask it as: what LARGE
  SURFACES wear a palette name that cannot carry the signal?**
  **206 (Nature × New CA rule, FIXED) — full recap in its own entry, still in the ledger window; header recap
  rotated to `GROWTH-archive.md` at 207.** It audited a rule that had under-fired for the artifact's whole life
  (`GARDEN` = 6 hexes in the entire matrix; one seed in three grew *zero*, ever) and fixed it: **a mid-rise is
  still housing**, so `HOMES={RES,MID}` ⇒ **`GARDEN 6 → 17`**. Two things survive here:
  **(1) Reusable — `openFront(x,y)` + `TALLT`** (beside `countAround`): *is the hex in front clear?* **Draw order
  IS depth order, so any ground-level thing that must be SEEN should ask before siting itself** (23 gardens
  measured: mean **58% occluded**, one at **100%**). Ship such a lever as a **PREFERENCE, not a GATE** — the hard
  gate *starved* the rule (`GARDEN 14 → 5`, worse than the bug), because `MID` is both a home *and* the thing that
  buries you. Law ⇒ SKILL.md (*a lever has two ledgers*). **204's buried service bays (cue n) are this same defect
  one domain over.**
  **(2) The vacant lot is a MIRAGE** — don't reach for it: `EMPTY` with ≥2 RES nbrs falls **85 → 6.5** by 2035,
  and **0.0** with a road adjacent. Development eats every gap. **⚠ GARDEN's seasonal cue is now UNBLOCKED (host
  fixed) and MEASURED (dry-peak shift 1.8 = ROAD-level) — see cue (p).**
  **204 (Civic × Connect, SHIPPED: the service fleet comes home) — full recap in its own entry, still in the
  ledger window; header recap rotated at 207.** Law ⇒ SKILL.md (*a stubbed shared `Math.random` makes a PER-ENTITY
  control worthless — make the control a POPULATION*). Two findings survive here:
  **⚠ THE FIRE CA IS A GHOST — do not build "X answers the fire" (`probe-firehost`).** Ignition is year-gated
  (`year<2006`; forest `year<2030`), so **at 2035 nothing can ignite at all**, and before then it is vanishing:
  **two one-cell episodes across 3 seeds × 61 years** (two seeds: *zero*), and fire **never spreads**. **`T.MARKET`
  all over again — fully drawn, three labels boasting about it, and it never runs.** Reviving it is a Nature/Urban
  CA lap with real cost (BURNT is the darkest tile in the palette), not a freebie.
  **⚠ Cue (n) — A PARKED VEHICLE IS OFTEN INVISIBLE, AND THE DOOR IS NOT THE REASON** (`probe-servbay`: 4 of 9
  parked vehicles read **0%** visible ink). What buries a bay is **the density of the downtown its institution
  stands in**, not which door it picks — 204 built the door-ranking lever and **measured it at nothing** (485/489/
  485 of 900), so it is NOT in the shipped code. **Making a bay legible means giving the CIVIC TILE a visible
  apron on its front edge — a `polish-tile` job, not a growth lap** (same shape as 195's university light).
  **205 (Water × Connect, REVERTED) — recap rotated to `GROWTH-archive.md` at 207; its finding is held IN FULL by
  cue (o) below: THE PORT HAS NO WATERFRONT.** Two laws ⇒ SKILL.md.
  **203/201/202 — recaps rotated; laws promoted to SKILL.md. What survives: THE WHOLE TRAMWAY IS SUB-PIXEL AT FIT
  ZOOM** (0.5px rope, 5px cabins, hairline masts) — 203 proved the rope properly depth-sorted (`probe-gondz`:
  8.4-23.6% occluded) and the artifact INNOCENT of 202's "thin dark line"; the fault is LEGIBILITY ⇒ a
  **`polish-tile` job on the WHOLE tramway**, never a tweak to the rope. **Do NOT re-try: a body/halo under it
  (measured — backfires) or a lit top edge (measured — impossible at 0.5px).**
  **195 (Civic × Deepen, REVERTED). STILL-UNCASHED: `university` is the ONLY of the twelve civics with no `LITAMT`
  — the only `MAJORK` monument pitch dark after sunset; every place to put the light failed ⇒ a `polish-tile` job,
  not a growth lap** (gate kept: `probes/probe-unilight.mjs` + `shot-uni.mjs`).
  **Sky is post-saturation (Deepen/Fix ONLY — its additive/CA cells are traps).** **Urban is measured-saturated: additive spent (118), and Connect measured-hard TWICE** — 160 (RES terracing: no seed forms E-W RES runs of >=3) and 165 (high-street arcade: the `hstr` parade zigzags with row parity, longest straight-hex-axis run = 2, so it is not a clean arcade host); **Urban's next lap is Deepen/Polish only** (or a COM arcade if a *straight-hex-axis* retail run is ever found — the parade is not one). **Roof-furniture is CLOSED city-wide** across all 5 developed types (MID/RES water tanks, TOWER gardens, COM plant 165, IND warehouse north-light clerestory 173) — no bare roof is left, so a future Urban "bare roof" vector has no host; Urban Deepen must go elsewhere — and the **GROUND PLANE is now SPENT too (209)**, leaving **facades** and the **harbour apron**. (The per-lap recaps of **173-185**, and their superseded "next lap owes" pointers, were rotated into `GROWTH-archive.md` at iter 196 to pay for 196's lines — the header is a fixed budget, and the ROTATION line above is the live pointer.) Check the last entry of the stalest domain for a banked
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
  their draws (123's stream-neutral trick) — but that REPEATS 123's site-on-depth mechanism, so vary it.**
  **The asserts-less-than-the-code-knows tell is SPENT for agriculture** (orchard 129 + vineyard 139/148 + FARM
  183 — each tile's tooltip now names the season its draw already knew, off ONE shared `*Phase()` the draw and
  the string both read). **GARDEN is the last mute one** (host fixed by 206; shift measured at ROAD-level 1.8 by
  207 — cue (p)), **and a good Nature × Deepen lap:** its three raised beds could run *staggered* calendars (beds
  at different stages is an allotment's whole visual identity — a shape no other ag tile uses: FARM staggers whole
  FIELDS against each other, this would stagger BEDS within one plot), with the tooltip reading ONE shared
  `gardenPhase()` — run the tell FORWARDS (123), don't re-sync later. (**127 took People × New element** aimed not at its spent
  *entity* list but at its biggest untouched *surface* — PARK's 878 hexes now show day-only picnics. The lesson:
  "additive inventory spent" is a claim about a domain's entities, not its surfaces.) (**126 took Sky × Deepen** — the moon now keeps a calendar
  and the moonglade dims with its phase — which is the documented way past Sky's additive saturation: a Deepen
  that adds no element. Sky is no longer stale, and its empty `New CA rule` cell is still a trap, not an invitation.)
  **124 closed the ghost-`c.solar` cue — the LAST banked cue that moved a census number; from here the
  census is VACUOUS for most vectors, so reach for a probe.** Three steering laws, paid for by 118/119/123 and
  kept because they govern step 1: **a cue is a POINTER, NOT A SPEC** (123's banked cue misdescribed its own
  code — re-grep the seam before designing to it); **a banked, measured finding outranks both kind-rotation and
  cell-emptiness** (119); and **saturation beats kind-rotation** — 118 declined the header's own "coldest kind"
  steer and was right, because when a domain's additive cell is spent the KIND changes, not the domain. Full
  text rotated to `GROWTH-archive.md` at 204.
  **Sky's additive/CA cells are TRAPS, not invitations** (115 took Sky by adding nothing; sky is not cellular, and
  fog on terrain is already `rSea`/`fogAt`). Surveyed at 103; detail archived.
  **Cue (k) is FULLY CLOSED** (116 gave the sea a depth field, 123 stood the wind farm on it). **Still banked for
  Water:** the **pier** row and the **lifeguard tower** are still `rng()`-picked with rejection loops and should
  site on a *depth* — free via 123's trick, **respend an object's existing `rng()` draws rather than re-drawing
  them**, and the stream cannot move. **123 ran the tell FORWARDS** (make the string and the rule share ONE
  constant, so they cannot drift apart) — prefer that to re-syncing them later. **A derived field earns its keep
  when a RULE reads it, not when the draw shows it:** `rGreen`/`rShop`/`rServ` are still read by NOTHING but the
  walkable stat. **⚠ A tick-rule cannot read them directly (151): `recount()` never runs in the sim loop, so the
  reach maps are STALE inside `tick()`** — recompute locally, or pay a recount. (Detail archived at 200.)
  **Iteration 212 is the next holistic step-back** (105, 110, 115, 120, 125, 130, 136, 142, 147, 152, 157, 162, 167, 172, 177, 182, 187, 192, 197, 202, **207 — all done**).
  **207 (the 21st) = a CLEAN BILL on the city, and the PERF ARC IS PRICED AND ACCEPTED — no fix lap is owed.**
  Both seeds PASSed all 4 frames; no feature has compounded into clutter or darkness; both agents independently
  located the golden-hour sun at **x=0.39, y=0.10** (the locate-check working). Perf: the **lap** (203-206) was
  **free** (day +0.3%, night +1.0% vs 202) — no surprise, since 203 and 205 both reverted. The **ARC** vs
  `7e2ac2c` (177, 30 iters) reads **day +7.2% / night +5.1%**, and vs `5f01426` (162, 45 iters) **day +9.5% /
  night +6.0%** (absolute: day 38.3ms · night 44.2ms). **The number that matters is that 202 read those SAME two
  refs at +7.5/+4.1 and +8.6/+5.7** — so five laps on, the arc has moved **~+0.9% day and is NOT accelerating.**
  Still ~+0.2%/shipped-lap; **priced and ACCEPTED.**
  **⚠ 207's PERF SUSPECT, named NOT mandated (198's law): THERE IS NO HOT ORNAMENT — the arc is DIFFUSE, which is
  exactly why every per-lap gate reads it as free.** `probe-drawbudget` (night): `drawCell` = **95.2%** of 132,679
  path objects, and the hot leaves are `winBandR` **32.6%** · `prismS` **28.0%** · `hexTile` **12.7%** · `bandS`
  **7.3%** — i.e. **~48% of the night frame is STATIC TERRAIN RE-RASTERIZED EVERY FRAME**, while everything this
  loop has added in 200 iterations sits beneath it (`tree` 4.1%, `shadS` 2.2%, `drawBuilding` 1.4%, `drawVehicle`
  0.4%). The suspect is that the terrain layer is redrawn every frame though it changes only on `tick()`.
  **Do NOT open a caching lap on that say-so — 198's levers are all CLOSED (cost is PER PATH OBJECT; batching,
  shrinking and sprite-blitting each measured at nothing), so the only real lever is drawing FEWER objects.
  MEASURE first.**
  **The GAP-CLOSING trick (111/112/113) is SPENT in four domains; the TELL that replaced it (a label asserting
  what the draw ignores) is CASHED 7x — 117 redwoods, 122 `CIVICLABEL`, 129 orchard, 140 plaza/quad, 148
  vineyard, 183 FARM, and 199 found its next host is a CONSTANT (see SKILL.md). Still MUTE: `[T.IND]` (no
  calendar) and GARDEN (season-frozen draw — needs a Deepen first). ⚠ 122's warning stands: a tooltip vector
  needs a probe checking the claim against INDEPENDENTLY RECOMPUTED truth, not a screenshot that it renders.
  (The "Sky-feedable list is EMPTY since 139" bullet was **DISPROVEN by 209**, archived: true of *vegetation*, false of the city — see ROTATION finding (3).)
  **Kind-picking, compressed (full text + the 143-163 per-lap recaps rotated to `GROWTH-archive.md` at 204).**
  **Scale** is the coldest kind and a structural lever, not a lap move. **New element** (last 127): a saturated
  domain cannot take one — but saturation is of a domain's ENTITIES, so one can still land on a large untouched
  **surface** (127 put picnics on PARK's 878 hexes; 145 a daily rhythm on the beach). **Connect** (109, 111, 112,
  and now **204**): its trick is that it adds NO NEW OBJECT — it closes a gap between two that already exist.
  **107 was a New CA rule that ADDED NOTHING** — it rewrote a pass that had never fired; *auditing an existing
  rule for reachability* is a New-CA-rule move available in every domain at zero content cost (`probe-market.mjs`,
  and 204's `probe-firehost` is the same move on the fire pass — it found a ghost).
  Note **Nature × Connect was attempted and reverted three times** (46, 88,
  101) and is the row's graveyard: 46 found it geometrically impossible, 88 found it has no host
  draw-only, 101 found the host *and the land* and lost on **shape**. Do not re-open it as a
  *corridor*. **Cue (e½) is now CLOSED — iter 102 shipped the blob 101 prescribed** (the commons),
  so the interior has its lung; **do not plant a second one.** Nature's remaining cold cells are
  Connect (graveyard — leave it) and Scale.
- **⚠ THE PROBES ARE BLIND TO THE HUD, AND THE SKY IS SCARCE (iter 200 — read before siting ANYTHING in screen
  space).** Every probe in `probes/` reads `cvs.getImageData()`. **The HUD is not in the canvas.** `.placard` is a
  DOM card owning the whole **top-left corner** (`left:20px`, `max-width:300px`, tall); `.census`/`.controls` own
  the bottom corners. So a screen-space draw can be *invisible to the user* while a canvas probe calls it present
  and lovely: 200's first probe scored the golden-hour sun at **11,716 px** on a frame where it sat **entirely
  behind the placard**, and two agents on two seeds said "no sun" and were **RIGHT**. ⇒ for a VISIBILITY claim
  about a screen-space draw, diff **`page.screenshot()`** (DOM composited) — which occlusion-checks for free.
  Anything in a `ctx.setTransform(dpr,0,0,dpr,0,0)` block is screen space: **sun, moon, stars, shooting star.**
  And the sky is **measured, shallow and mostly spoken for**: the plate is a hexagon, so the open sky is a *band*
  — skyline **~0.12 of the viewport across the middle**, falling to 0.27–0.43 only in the top corners, and the
  top-left corner is the placard's. That is why the moon sits at **x=0.80**, and why 200's sun rises out of the
  **open sea** (right, deep corner sky) and sets **behind downtown** (left — it cannot go low, the placard is
  there). Little room is left for a second sky object; measure the band first. (General law, incl. the correction
  to "a probe is the verdict" — *only if it measures what the claim is about* — in SKILL.md.)
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
  **The COST MODEL is now MEASURED, not guessed (198, `probes/probe-shadcost.mjs`): a canvas ornament costs
  PER-ELLIPSE (per path object rasterized) — NOT per `fill()`, NOT per unit area, and a pre-baked `drawImage`
  sprite is WORSE, not better.** So the levers on any future draw-cost regression are, in order: draw fewer
  objects (a *visual* decision, price it against what the ornament is worth), or accept it. **Batching fills,
  shrinking radii, and sprite-blitting are all CLOSED — measured, three ways, and none of them buys anything.**
  194's tree shadows are the standing example: ~3% for the grounding of every tree, and it is worth paying.
  197's non-flat lap (193+194+196 = day +3.8/+4.4%, night +2.9/+3.0% vs iter-192 `d8819ec`, **all of it 194's
  shadows**) is **priced and ACCEPTED**. 197's mandated *fix* ("the cost is the FILL COUNT — batch them into one
  fill") was **measured and DISPROVEN by 198**, and was rotated to `GROWTH-archive.md` at iter 199 rather than
  left here contradicting the paragraph above it.
  **⚠ THE COST MODEL HAS A HOLE, AND 200's SUN SITS IN IT.** 198's table (per-ellipse; area-independent; sprite
  worse) was measured on **SOLID fills only**. 200's sun is **two radial-GRADIENT fills** costing **day +2.3%/
  +1.7%** — a lot for *two* path objects under a strict per-path model. A gradient is evaluated **per pixel**, so
  it may be priced by **AREA** where a solid ellipse is not. **Nobody has measured that** — don't shrink `HR`
  "because 198 said area is free" (it said no such thing about gradients); the variant to build is a
  gradient-area sweep. 200's ~2% is **PAID** (it is the source of the whole golden-hour family).
  **⚠ A CHANGE THAT IS PROVABLY INERT IN ONE REGIME GIVES YOU A FREE NOISE FLOOR (199).** 199's edit draws
  nothing in daylight (0 panes at noon, *verified*), so its **day column IS the noise floor**: it read
  −0.0 / +0.1 / +1.0% on provably identical code. That is what "±1% means nothing" looks like when you can
  prove it, rather than assert it. Most late-game vectors are night-only or day-only — use the **dead regime as
  the control** instead of arguing with the noise.
  (**A 2+-round day+night interleave overruns the 120s Bash timeout — but do NOT pipe it through `tee`:
  node block-buffers stdout to a pipe, so a backgrounded run looks EMPTY until it exits and you will think it
  died (197 lost a run that way and re-ran it). Run it foreground with a long timeout, or read the task file
  after exit.** **⚠ `cp` is aliased `-i` here — use `/bin/cp` or every swap silently no-ops and you measure ONE
  file 4×, iter 147.**)
  **⚠ NEVER grade frame time by CONSECUTIVE passes (117 corrected 99).** Machine load is autocorrelated over
  minutes, so three passes in one loaded window are three samples of ONE draw: 117's gate read a perfectly
  STABLE +25.5/+26.0/+26.5% on a diff with **zero draw calls**, and the identical bytes read +3.5% twenty
  minutes later. Only an **interleaved A/B/A/B against pristine HEAD** (min per variant) reads true — and
  brace the shell interpolation (`/tmp/$v117.html` silently measures one variant six times). Full reasoning
  rotated to `GROWTH-archive.md` at iter 199; `perfab.mjs` implements it, and 199's inert-regime law (PERF
  bullet) tells you how big the noise floor actually is on the day you run it.
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
- **Institutions cluster: `MAJORK` / `QUARTER` / `siteQuarter()` (iter 91).** `MAJORK` = the five monumental
  kinds (`hall museum parliament university library`), the shared vocabulary for "major institution" used by
  BOTH the civic quarter and the 2020+ forecourt rule. `QUARTER` = the three that *seek* it (library, museum,
  parliament); services stay sited by need, and `observatory` is deliberately free to sit at the rim.
  `siteQuarter()` hugs the nearest standing major at `QNEAR..QFAR` = **2-4 hexes** (adjacency would kill the
  bunting, which needs a ROAD cell reachable from two civics); it falls back to the scattered search when the
  core is walled in, so `civicKinds` never drops. Detail archived at 200.
- **A forecourt is now SHARED, by construction (iter 91).** The 2020+ rule skips a civic with a `PLAZA` within 2
  hexes and quarter members sit 2-4 apart, so the quarter gets **one** square, not four (`PLAZA 14->10`).
  Defensible urbanism, accepted — but it is the one place that vector *cost* something. See open cue (d).
- **Open cues, banked by holistic passes (take one when its domain comes up):**
  (Cues **(l)**, **(e½)** and **(d)** are all CLOSED and were rotated to `GROWTH-archive.md` at iter 201.)
  **(g) THIRTEEN lines / SIXTEEN seedless `hashCell` calls remain** — **iter 103's audit grep undercounted,
  and iter 113 corrected it.** The old pattern
  (`grep -nE 'hashCell\([^)]*,[[:space:]]*(0x)?[0-9]+\)' … | grep -v seedNum`) matches only a **bare integer**
  salt, so every `k+90` / `j+40` / `r*3+cc+50` form was invisible — incl. **two of the marsh's own three**. Superset:
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
  **(i) the marsh reeds do not read, and that is a `polish-tile` job** *(banked by 113, Water)* — the reed calendar
  shipped in 113 is wired and measurable, but the reeds are **seven sub-pixel strokes huddled around the pool**, so
  the hex reads as "green hex with a pool" and the calendar is invisible at fit zoom. Spreading/lengthening them is
  a tile redesign, out of scope for a growth lap, and would pay off at once — the seasonal colour is already computed.
  **(m) SHOWERS ARE HOST-STARVED — do not build "X responds to the rain" (iter 201, measured before designing).**
  Rain is fully realised (shaft, drops, damp patch that dries behind the shower, rainbow) and **nothing on the
  ground reads `cl.rain`** — a tempting seam. But `probes/probe-rainhost.mjs` swept every rain cloud across its
  whole traverse: a shower's ground footprint (the damp ellipse, `R=48*cl.s`, y-squashed 0.30) covers **2–5 hexes
  TOTAL**, of which **BEACH 0.1–0.2 and PARK 0.17–0.31** per shower-frame, at 1–2 rain clouds per seed. At any
  moment a shower rains on **less than one** picnic/café hex. This is `T.MARKET` again (the dead-code law): the
  vector has no host. Widening the footprint is a Sky change to a tuned draw, and gradients price by AREA (see
  the PERF hole).
  **(o) THE PORT HAS NO WATERFRONT — do not build "the ship docks / cargo comes ashore / cranes work her /
  lighters run to a wharf / the harbor works are fed by sea" (iter 205, `probes/probe-harborhost.mjs`, 6 seeds,
  unanimous).** `SHOREX`=`CTRX+11` is *the coast highway column*; `SHORE0`=`SHOREX+5` is the water's edge *"five
  lots seaward of the highway"*; the warehouses are sited at `SHOREX-1..-3`, **behind** it. So they stand **5-9
  hexes from the sea**, the waterline at `harborY` is **BEACH/DUNE/SHOREPARK** on every seed, and **no quay or
  wharf tile exists**. Solvista is a **roadstead** — an open anchorage — so the anchored freighter is *correct*,
  not broken, however loudly her comment ("waiting on a berth") and her tooltip ("Serving the harbor works") read
  like the label-tell. A port vector must **build the waterfront FIRST** (a quay/wharf tile on an industrial
  shore): a terrain lap with real cost, not an entity-motion freebie. **Banked host, if one is ever wanted: the
  MOLE is real and reliable** — `moleSet` is 5-12 cells on all 6 seeds probed (the `path.length>=5` guard bites
  less often than its comment implies), and it is the artifact's only built structure standing in the water.
  **(p) CLOSED by 208 (the amenity green got a real seasonal amplitude: PARK 8.4→23.5, SHOREPARK 17.9→52.3,
  QUAD 5.7→21.2) and EXTENDED by 209 (the RES ground joined it: 1.2→36.8). Body archived; the WARNING is live.**
  **⚠ DO NOT RAISE THE LAWN AMPLITUDE FURTHER.** `grass` and `lawn` are the **SAME base colour** `[150,181,122]`,
  so the dry-season divergence *is* the managed green's whole identity, and lawns must stay **greener/brighter than
  the hills** at every point in the year — seed 7's agent already reads hillside hexes *"close in value to the paler
  lawns, but they never invert."* It is at the top of what is safe; any further push must re-run the blind locate.
  **⚠ GARDEN is STILL MUTE (1.8 → 5.4): its ground is mostly raised beds, so the lawn lift barely reaches it. Its
  own richer cue stands** — staggered per-bed calendars + one shared `gardenPhase()` (Nature × Deepen; host fixed
  by 206).
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

> **Archive:** the 202 entries before Iteration 200 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

## Iteration 200 — the sun is in the sky (2026-07-12) [Sky & atmosphere × Polish]

**Vector.** Sky & atmosphere × Polish. Sky was the stalest domain (last at 190) and is
post-saturation — Deepen/Polish only — and Deepen had run four of the last five laps, so
Polish (last at 115) was the coldest kind in the stalest domain.

**Change.** **The city has had a whole FAMILY of low-sun effects for dozens of iterations —
warm cloud bellies (161), the sea's golden sheen (181), the noon sun-glitter (150), the raked
window glass (190), beach furniture that follows the sun (145), roof panels tilted at it — and
the sun itself was never drawn.** The draw code's own comments name it ("the low sun lights
cloud bellies", "the sun-facing face", "under the day sun"); the MOON has a disc, a phase,
earthshine, a halo and a glade on the water. Every warm thing in this sky had a cause that was
not on screen. That is 179/193/195's shape — a completed family missing one member — except
here the missing member is the *source*.

It invents no signal. Its SIDE is `dayT`'s (rises RIGHT, sets LEFT — the very rule 190's `gs`
uses to choose which face of the glass to rake) and its COLOUR is `GWARM`/`GWSB`, so it is the
**fifth reader** of the one golden-hour signal 161/181/190 already share: the disc is visibly
the source of exactly the warmth those three paint. Two draws — a halo that is a **radial
gradient falling to alpha 0 at the rim** (195's law: a flat additive `arc()` is a coin, not a
glow) and a disc whose rim softens into it. Drawn into the sky slab *before* the city, like the
moon, so the skyline occludes it. Gated on `dayT` ∈ [`SUNUP`,`SUNDN`] — **not new numbers: the
light curve's own dawn/dusk keyframes (0.05 / 0.78)** — so it touches the horizon exactly as the
sky turns warm, and **draws literally nothing at night**.

**Two things the measurement forced, neither of which was guessable:**
1. **`GWARM` alone cannot carry the disc down.** It is gated on the low sky being ORANGE
   (`R−B > 70`), and by the time the sun actually touches the horizon the sky has gone PURPLE —
   so GWARM has already fallen back to 0 and a GWARM-only sun turns **WHITE at the exact moment
   it should be an ember**. The probe caught it as a number: horizon warmth **20.6 vs noon 20.9,
   identical**. Altitude has to redden it the rest of the way, and toward a *fixed* ember — not
   toward `GWSB`, which by then is lilac.
2. **The arc is shaped by the plate and by the HUD.** The plate is a hexagon, so the open sky is
   a shallow **band** (skyline ~0.12 of the viewport across the middle, deep only in the
   corners), and **`.placard` owns the top-left corner**. So the sun rises low out of the **open
   sea** on the right, climbs to clear the rooftops, and **sets behind downtown** on the left —
   it cannot go low there, the placard is in the way. An agent noted the dusk sun sits *higher*
   than the dawn sun and "reads backwards"; that asymmetry is the constraint, and it happens to
   be right for this city (open water east, high skyline west).

**Census.** PASS, 0 page errors. `pop/roads/developed` **+0 / +0 / +0**, tile histogram empty —
correct and near-vacuous for a draw-only change (no terrain, no `rng()`).

**Probe.** `probes/probe-sun.mjs`. **⚠ It screenshots the PAGE, not the canvas, and that is the
whole finding of this iteration.** The first version read `cvs.getImageData()` like every other
probe here, and confidently scored the golden-hour sun at **11,716 changed px** on a frame where
the sun was **entirely behind the DOM placard** — while two visual agents, on two seeds, twice,
reported no sun and were **RIGHT**. A canvas readback cannot see the HUD. `page.screenshot()`
composites DOM over canvas exactly as the user sees it, so the diff measures only the sun that
*can actually be seen*, and gets occlusion-checking for free.
On the shipped build, 3 seeds × 7 dayT pins:
- **ARC centroid x 0.90 → 0.79 → 0.62 → 0.41 → 0.33 — MONOTONIC right→left on every seed**
  (rises E, sets W: agrees with 190's `gs`). Highest at noon (cy 0.088).
- **REDDENS: disc R−B 21 (noon, a white 247,247,226) → 110 (sunset, an ember 235,164,126).**
- **SEEN: 13k–26k visible px at every day pin; contrast 31–97 against the local sky** (presence
  is not legibility — iter 101).
- **NIGHT: `sunDraws` = 0** at both night pins on all 3 seeds, counted by hooking the renderer's
  own `createRadialGradient` — so the dead regime is *proved* dead, not asserted from my formula.
  Stray night px (0–16) sit inside the probe's own base-vs-base noise floor.

**Visual.** Both seeds **VISUAL: PASS** (third round; the first two FAILed on the buried sun and
were correct to). The agents **located the disc within ~0.01 of the shipped formula on every
frame** — day (0.71, 0.09) vs predicted (0.714, 0.097); golden (0.37, 0.10) vs (0.381, 0.108);
dawn (0.89, 0.16) vs (0.898, 0.163) — which is what made their "there is no sun here" credible
rather than vague. No coin rim, no orphan glow, no z-order tears; whole frames still read as a
balanced coastal city.

**Perf.** ⚠ **day +2.3% / +1.7%** (two interleaved A/B runs vs pristine HEAD, `probes/perfab.mjs`);
**night −0.2% / −0.4%**, which is the **free inert control** (199's law — the sun draws zero calls
at night, *verified*, so night runs byte-identical code and whatever it reads IS the noise floor).
The day cost is real and is **PAID**: cheaper than 194's tree shadows (+3.4%, also paid), for the
most fundamental object in a daylight sky. **Banked:** it is *two radial-GRADIENT fills*, and
198's per-ellipse cost model was measured on **solid** fills only — a gradient rasterizes per
pixel, so it may be priced by AREA where a solid ellipse is not. 198's table does not answer that.

**Verdict.** SHIPPED.

**Findings (promoted to SKILL.md).**
- **The probe reads the CANVAS; the user sees the CANVAS + the DOM.** For a visibility claim about
  a *screen-space* draw, diff `page.screenshot()`, not the canvas. Anything in a
  `ctx.setTransform(dpr,0,0,dpr,0,0)` block is screen space: sun, moon, stars, shooting star.
- **"A probe is the verdict, not a rerun" — but ONLY if the probe measures what the claim is
  about.** This is the first recorded case where the agents were right and the probe was wrong,
  and the standing law would have told me to override them. When a probe and an agent disagree,
  don't re-run either: **first ask what layer each one is looking at.**
- **The sky on this plate is scarce and measured**, not open space — a shallow band, with the
  top-left corner owned by the placard (which is why the moon sits at x=0.80).

## Iteration 201 — the beach follows the tide (2026-07-12) [People & activity × Deepen]

**Vector** — People & activity × Deepen. People was the stalest domain (last lap 191);
its basics are long spent, so Deepen, not another entity.

**The seam** — iter 145 taught the beach furniture to follow the **sun** (`LITAMT` gates the
parasols in through the morning and packs them away by dusk), and the beach *ground* has
answered the **tide** since long before that — the damp margin `w2=2.4+(1-TIDE)*5` sweeps up
and down the sand, and iter 196 used it as its positive control *precisely because* it
provably reads `TIDE`. But the furniture itself was drawn at `px(gx,gy)`, the bare hex
centre. So the sunbathers answered one signal and were deaf to the other, and **at dead low
water they were lying on wet sand.** 196's shape (a tile deaf to a signal its own hex
already reads), one tile along, in the People domain.

**Change** — draw-only. `wetReach()` now owns the damp band's reach as **one definition with
two readers** — the margin that *strokes* the wet sand, and the beachgoers who must stay
*off* it. Let those drift apart and the towels end up laid in the surf; sharing the constant
makes that unrepresentable. `seaDirS(x,y)` gives the mean unit vector toward a hex's WATER
neighbours (same water test the margin uses — a river is not the sea), `null` when
landlocked. The whole ensemble (parasol, pole, towel) slides along that normal by
`(WETMIN+0.5*WETSWING) - wetReach()`, i.e. **the band's own reach either side of its mid-tide
value** — so it retreats up the sand as the ebb widens the wet band, follows the water back
down on the flood, and sits exactly where it always did at mid-tide. No new randomness, no
terrain, no `rng()`.

**Census** — vacuous, as expected for draw-only: PASS, every metric +0, tile histogram empty.
Proves only that nothing threw and that the seeded stream is untouched.

**Probe** — `probes/probe-beachtide.mjs`. A **state-response** claim, so 196's isolation: one
build rendered twice at two `TIDE` pins (frozen clock, same `genWorld`), the only variable
being the tide. Measures **draw calls, not pixels** (199's wrap-the-draw move) — `ctx.ellipse`
is wrapped and the parasol canopy captured by its `4.5x2.6` signature, which occurs **exactly
once** in the file. No pixel noise floor at all, so the zero is an honest zero.

| build | along-seaward | perp (ctl) | landlocked (ctl) | tide-px (live?) |
| --- | --- | --- | --- | --- |
| BASE  | **0.00px** (3/3 seeds) | 0.00 | 0.00 (n=26–30) | 10.0–11.4k |
| PATCH | **+4.80px** (3/3 seeds) | 0.00 | 0.00 (n=26–30) | 10.5–11.9k |

`BASE 0.00` **is the seam, as a number** — the draw was deaf. `PATCH +4.80px` is the travel
the design predicts to two decimal places (pins sweep 0.02→0.98, so 0.96 × the band's 5px
swing). Direction is checked against a seaward normal the probe **recomputes from the terrain
itself**, not by calling `seaDirS` (122's law). Controls: perpendicular drift 0.00 (it travels
along the shore normal, not sideways); the 26–30 **landlocked** beach hexes per seed move
0.00px (no sea to answer → furniture stays put). **Positive control**: the damp margin moves
~10–12k px on *both* builds, so the TIDE pin is LIVE — without it `BASE=0` would be a dead pin
rather than a deaf draw (196's law, and it is what makes the zero mean anything).

**Perf** — not run, and **provably not needed**: the diff adds **zero path objects** (verified
by grep — it re-centres ellipses/line/rect that were already drawn) plus ~240 neighbour lookups
per frame. Under 198's measured cost model (cost is *per path object rasterized*), that is free
by construction. Measuring it would only have re-measured the box's noise.

**Visual** — the first pass FAILed on **my framing, not the feature**: `shoot.config.json`'s
`coast` clip is a hard-coded rectangle and the coastline moves seed to seed, so on seed 7 it
landed on open water with the beach off the edge of the crop. Fixed with
`probes/shot-beachtide.mjs`, which **aims the camera** at a beach hex that actually draws a
parasol *and* faces the sea (found from the real draw calls). Re-shot, both seeds **VISUAL
PASS**, blind, with the A/B labels **inverted between the seeds**: both agents correctly
located dead low water from the wide damp flat, and both confirmed the invariant — *"neither
frame puts a pole or towel on wet sand"*; *"the only things standing on wet sand are gulls and
a dog — correct."*

**The one objection, and why it did not sink it** — the seed-42 agent's first read called the
response **inverted** (a real beach hands you *more* sand at low tide; mine retreats up it).
This is a property of the **artifact's tide model, not of this change**: the coastline is fixed
terrain and cannot recede, so the ebb can only express itself as the intertidal flat drying out
*inland* of the fixed edge. Flipping the sign would drive the towels **onto the widening wet
band** — contradicting the single invariant the feature is built on. Two fresh, correctly-framed,
independent reads both declined the objection: *"they're plausibly just avoiding the wet flat…
it doesn't read as backwards"* and *"local behaviour is right; the global consequence is a
compromise, not a bug."* Both flagged the same honest caveat unprompted, which is the model's,
and it is banked below rather than papered over.

**Verdict: DEEPENED.** The beach now answers both its signals: the sun brings the parasols out,
and the tide decides where they stand.

## Iteration 202 — the twentieth step-back finds a clean city and a lying camera (2026-07-12) [holistic step-back]

**Vector** — holistic step-back (the 20th; 197 was the 19th). No domain lap, no city change: `solvista.html` is
**byte-identical to iter 201**. Two harness probes added.

**Census** — PASS, no page errors, every metric flat (baseline pinned on the same HEAD, so a flat read is the
correct one). Seasons alive: `probe-season` FARM winter→dry-peak **88.4** (the ledger's own expected value),
ROAD control 0.5–2.1.

**Perf — the finding. THE PER-LAP GATE IS STRUCTURALLY BLIND TO COMPOUNDING.**
SKILL.md mandates an interleaved A/B against a *same-session pristine control*, and a step-back sets `REF` to the
previous step-back. Done that way, the last lap is free — and that verdict is *true but useless*:

| REF (step-back) | iters in arc | day | night |
| --- | --- | --- | --- |
| 197 `08cc77b` | 3 (199,200,201) | **+0.4%** | −1.1% |
| 192 `d8819ec` | 10 | +5.2% | +2.1% |
| 177 `7e2ac2c` | 25 | +7.5% | +4.1% |
| 162 `5f01426` | 40 | **+8.6%** | **+5.7%** |

All four measured interleaved against the *same* HEAD, same box, same load. The drift is ~**0.2%/iteration** — which
is *permanently* beneath the noise floor of the 3-iteration A/B the loop is told to run, so every lap can be honestly
graded "free" while the arc costs 8.6%. **A step-back must price the ARC, not the lap.**

To spend that finding you need a SUSPECT, and 198's law says measure it, don't infer it. New
**`probes/probe-drawbudget.mjs`** censuses the whole frame in ONE render, exploiting 198's cost model (the unit of
cost is the **path object rasterized**, so path-object *count* is a cost proxy). It wraps the ctx terminal ops and
attributes each to the artifact fn that issued it (leaf) and to the fn `render()` called (family):

- `drawCell` is **93.8% day / 95.1% night** of all path objects. Entities (vehicles, peds, boats) are a rounding error.
- Day leaves: `prismS` **35.7%** + `bandS` **23.6%** + `hexTile` **17.7%** = **77% in three geometry primitives** —
  i.e. the *static terrain*, re-rasterized every frame although only the light changes.
- Night leaves: `winBandR` **32.6%** — **43,421 path objects from 2,672 `fill()` calls**. That is 198's law made
  visible: batching into one `fill()` does not reduce cost, the ellipses/rects are still rasterized.
- **The proxy is CALIBRATED:** `shadS` (194's tree shadows) = **2.7%** of day path objects, and 197/198 *measured*
  its removal at **−2.8/−3.1%**. Count predicts time.

⇒ **SUSPECT NAMED, FIX NOT MANDATED** (198's law — 197 mandated a fix and burned 198 disproving it). Note the split:
the *drift* lives in the ornament layer the loop keeps adding, but the *mass* (77%) is static terrain that predates
the loop. Clawing back the drift means un-shipping features; the money is somewhere no lap has looked.

**Visual — FOUR agent reads, TWO false FAILs, and BOTH were the instrument, not the city.**
The first pass (shoot.mjs + `?t=`/`?year=`) FAILed on both seeds, both agents independently: *"no sun, the golden
frame renders as NIGHT"* and *"winter is indistinguishable from summer"*. Both were **correct about the pixels and
wrong about the cause** — I had shot the wrong frames:

1. **`t=0.80` is night.** The artifact's own `phaseWord()` returns `'night'` for `t>=0.80`, and `SUNDN=0.78` means the
   sun block *"draws nothing whatever"* past it (its own comment). I guessed the golden-hour pin. Reading `GWARM`
   off the light curve shows it peaks at **0.786 at t=0.70** — golden hour is `[0.55,0.70)`, nowhere near 0.80.
2. **`?year=` DRIFTS.** `playing=true` + `shoot.mjs`'s wait advances `year += dt*speed/6` ≈ **0.167 yr/s** (L7095), so
   the summer pin drifted toward autumn and the *winter* pin drifted into **spring** — which is exactly why an agent
   reported the farmland looked **"inverted"**. This is **iter 139's trap**, which the ledger DOCUMENTED and never
   fixed at source, so the step-back recipe kept telling every iteration to pin with `?year=` anyway.

New **`probes/shot-stepback.mjs`** fixes the camera: freezes the world in-page (`playing=false` → L7092 stops both
clocks), `genWorld`+`__warp`+`__setYear`+`__setTime`+`render()`, no wait, and `page.screenshot()` (DOM-composited,
per 200's law that the user sees canvas **plus** placard). Its pins come from the light curve, not a guess, and each
frame **self-reports** its state (`golden t=0.68 LITAMT=0.28 GWARM=0.72 sun=UP phase=golden hour`).

Re-shot, both seeds **VISUAL: PASS**. The locate-don't-judge check is the proof: two blind agents put the sun at
**(0.386,0.104)** and **(0.39,0.105)**; the shipped formula at `sunP=0.863` gives **(0.388,0.107)** — within 0.003.
Seasons now plainly visible to the agents too (bare ploughed farm, darker/bluer canopy), matching `probe-season`.

**⚠ BANKED CUE (for a Transport/Sky lap, not for tonight).** Both agents, both seeds, unprompted: a long thin dark
line reads as drawn **over** the towers and out across sand/water — *"stray thread"*, *"floating line"*. **The naive
explanation is already DISPROVEN:** `drawMonoAt`/`drawGondAt` are called *inside* the row loop immediately after
`drawCell(x,y)` (L6218–6223), so the aerial lines are row-interleaved and do respect z-order. Real, unexplained,
**and it must be PROBED** — do not redesign on the agents' say-so (108/120's law).
Second, softer cue (both agents): the **golden-hour frame is muddy** — the landmass takes a brown-mauve wash that
flattens colour separation. That is a Sky × Polish target with a ready-made gate (`GWARM`).

**Verdict** — **FIXED** (the harness, not the city). The city itself gets a clean bill: census PASS, seasons alive,
both seeds VISUAL PASS at 3 lights × 2 calendars. The step-back's *own instruments* were producing false FAILs and a
perf gate that could never see its own drift; both are now measured, fixed, and committed as tracked probes.

## Iteration 203 — the thin dark line is a cable, and the cable is fine (2026-07-12) [Transport × Polish, EXPLORED -> REVERTED]

**Vector.** Transport × Polish. Rotation owed Transport (last lap 193), and 202's step-back had
banked an explicit, unexplained cue there: *"a thin dark line reads as drawn OVER the towers/water"*
— seen by **both** agents on **both** seeds, with the naive cause already disproven and an
instruction attached: **PROBE it; do not redesign on the agents' say-so.** A banked, measured
finding outranks kind-rotation, so this lap went to close it.

**What the line IS (`probes/probe-darkline.mjs` — new, and reusable on ANY unexplained linear
artifact).** Wrap `ctx.stroke()`, record each stroke's DEVICE-space polyline length, width and
colour luminance, and attribute it to the issuing fn off the call stack; then census the strokes
that match the description — long, thin, dark. First run was a **false lead**: the top hit was 10
near-vertical 324px strokes from `render:6450` at `lum=0.00`, which turned out to be the **rain
shafts** — my probe defaulted a non-string `strokeStyle` (a `CanvasGradient`) to pure black. The
real answer was hiding *under* the length filter: **the aerial cable-car HAUL ROPE**, stroked
`col('ink',1.05)` = **`#373128`, the darkest ink in the palette, fully opaque, at 0.5 DEVICE px**
at fit zoom. Each span is only 12-14 px — below any sane "long line" threshold — but **15-25 spans
CHAIN into an unbroken 199-331 px dark run** across the sky and the open sea, on all three seeds.
The eye sees the chain; a per-stroke filter cannot. **Cue CLOSED: the line is the cable.**

**The agents' CAUSE was wrong — three ways, and the third is a number.** (1) The girder never
oversteps: `drawMonoAt` strokes only to the **midpoint** of each neighbour, so a beam cannot reach
into another cell's footprint. (2) The rope cannot either: `stepGond` only ever takes `axStep`
d=1 or d=2, and **both are `y+1`**, so a gondola path is **strictly monotone in y** and every span
is drawn BEFORE the row it descends into. (3) And the direct measurement, because a code argument
should not outrank four agent-reads: **`probes/probe-gondz.mjs`** renders the same frame under two
z-orders — rope in its natural place vs. the very same polylines re-stroked on top of the finished
frame — and takes the ink ratio. **OCCLUDED: 22.2/23.6 (seed 42) · 8.6/8.4 (7) · 12.5/12.9% (1234),
day/night.** Not 0%. Later rows genuinely eat 8-24% of the rope. **It is depth-sorted; "painted on
top of everything" is false.** The agents' other claim — *"no cabins on the line, in any frame"* —
is also false: the cabins render at **43-96 px per frame, ~24 px each**, which is exactly a
`prismS(0.11,0.085)` at fit zoom. They are not missing; they are **5 px**.

**What I tried, and why it died.** Give the rope what the girder already got (its own comment at
L5552: the old beam was *"brighter than every building it flew over, and with nothing beneath it"*,
so it was given a body + a lit running surface). The rope is the mirror image and never got the
treatment: a soft translucent **body** so a sub-pixel line antialiases into a rope, a **core** that
is dark but not flat-opaque, and a daylight **glint** (steel catches the sky), gated on `LITAMT`.
**`probes/probe-ropesteel.mjs` refuted it on its own terms:**
- **`glint px: 0 -> 0`, every seed, both lights.** A **DEAD DRAW**. At 0.5 device px the core and
  the highlight land in the **same sub-pixel** — a thin dark line *cannot carry a lit top edge*.
- **`peak contrast: 0.33 -> 0.34` — UNCHANGED**, while coverage rose **419 -> 567 px**. Peak
  contrast is the whole measure of "reads as a hard scratch", and it did not move; the halo made
  the line **more** prominent, the exact opposite of the goal. **A body/halo under a thin dark line
  is additive and works against you** — the only lever that touches peak contrast is the core's own
  alpha/width.

**Census.** PASS. Draw-only: every metric +0, tile histogram empty — correctly vacuous, and it
proves only that the page did not throw. Reverted **byte-identical** (`git diff HEAD` clean), so
perf is unchanged by construction and no perf gate was owed.

**Visual.** 4 agent-reads (2 seeds × fit/mid/close/golden, camera aimed at the rope by
`probes/shot-gondola.mjs`, which LOCATES the longest line and drives the artifact's own
scale/offX/offY — 201's law). All four FAILed, and **all four were wrong about the cause** and
right about the symptom. What survives their reads, and matches the numbers, is a **legibility**
finding, not a z-order or colour one: at fit zoom the whole aerial tramway is **sub-pixel
infrastructure** — a 0.5 px rope, 5 px cabins, hairline masts — so the rope is the only part that
registers at all, and *a lone dark hairline with no legible cars or towers around it reads as a
scratch*. That is **iter 101's law** (`legibility ≈ contrast × width`) landing on Transport.

**Verdict: EXPLORED -> REVERTED.** The cue is CLOSED and the artifact is untouched. The rope is a
legitimate object, correctly depth-sorted, and it must stay visible (the cabins hang from it —
195's orphan law cuts the other way here). Three probes + a camera ship; four laws promoted to
`SKILL.md`. **If a future lap reopens this, it is a `polish-tile`-shaped job on the whole aerial
tramway — rope AND cabins AND masts together, to make it legible as infrastructure — not a tweak
to the rope's colour.** Do not re-try: a halo/body under the rope (measured, backfires), or a lit
top edge on it (measured, impossible at this width).

## Iteration 204 — the service fleet comes home (2026-07-12) [Civic & culture × Connect]

**Vector.** Civic & culture × **Connect** — the coldest cell on the board (last used at iter **45**, ~159
iterations ago), and Civic was the stalest domain (last touched at 195, which explored → reverted). Connect's
trick is that it **adds no new object**: it closes a gap between two that already exist.

**The seam.** Three `CIVICDESC` lines park a vehicle at a door:

- `police` — *"The precinct house. **Cruisers idle in the yard**."*
- `hospital` — *"Emergency, wards, and **the ambulance bay that never closes**."*
- `firehouse` — *"**Engines behind roll-up doors**, ready for the fires on the hill."*

…and `syncFleet` even conditions the **ambulance's very existence** on a hospital standing
(`if(cells.some(c=>c.kind==='hospital'))services.push('ambo')`). The code knows they are related, and then
`stepVehicle` random-walked all three exactly like a car — straightest continuation 72%, else any neighbour —
and **not one of them ever went home.** The fire engine's tooltip said *"Lights on, heading to the smoke"* while
its steering had no idea where the smoke was. This is the label-asserts-what-the-draw-ignores tell, cashed an
8th time, on its richest host yet: **three labels, three vehicles, three buildings, zero connections.**

**Change.** Each service vehicle runs a round trip: it stands at its own institution's door with its beacon
dark, is dispatched **out** to a call, stands there a moment, and drives **home**. It routes by descending a
multi-source BFS field over ROAD cells (`roadField`), so its route *is* the street network and it obeys the
three hex axes for free. `civicDoor(kind)` is ONE definition read by both the dispatcher and the arrival test
(112's law). Each vehicle's call answers its own institution's job, off a field the city already derives: the
cruiser works the **arterials** (`c.flow >= ARTFLOW`, iter 77's "reuse `c.flow` for anything that should follow
the main roads"), the ambulance is called to somewhere people **live**, the engine patrols until something
burns. The **beacon now carries the duty** — an ambulance on a call and an engine at a fire run lit *in
daylight*, anything still out at night runs lit as it always did, and a vehicle standing at its own door is
**dark**. `VKIND`'s `sub` became a **function of the vehicle** (105's law), reading the same `duty` the router
steers by and the beacon lights by: one state, three readers, so they cannot drift apart.

`stepVehicle` runs per **frame** on `Math.random`, so no `rng()` draw is added and the seeded stream — and every
CA pass downstream of it — is byte-identical.

**Census.** PASS. **+0 on every metric, tile histogram empty**, pop/roads/developed all flat. That is the
correct and predicted result for an entity-motion-only change, and it proves only that the page does not throw.
The probe is the gate.

**Probe.** `probes/probe-servcall.mjs` — 240 sim-seconds of stepped entity motion, patch vs pristine HEAD, same
seed, same stubbed `Math.random`. Share of time each vehicle stands **on its own institution's door cell**:

| | HEAD | PATCH |
| --- | --- | --- |
| police | 0.0 / 0.0 / 1.5 % | **20.3 / 20.3 / 17.5 %** |
| fire engine | 0.0 / 1.4 / 0.0 % | **24.6 / 20.5 / 22.0 %** |
| ambulance | 0.0 / 3.3 / 0.0 % | **21.3 / 20.9 / 10.1 %** |
| traffic (control ×38) | 0.4 / 0.2 / 0.1 % | 0.4 / 0.3 / 0.3 % ✓ flat |

2–5 deliberate arrivals each; mean road-distance to home roughly halves. **Forced fire** (the ghost path, lit by
hand because it can never be caught by waiting): the engine's road-distance to the smoke descends **monotonically
56→7 · 42→0 · 66→6** on the three seeds, while HEAD wanders (56→52 · 42→44 · 66→66).

**Visual.** PASS, both seeds. Cruiser located parked at the precinct door (white body, **teal roof bar**, flat on
the hex); ambulance located out on a call with a **lit beacon in daylight** (white body, coral cross, blue/red
flashing square) — a thing the artifact has never done before. Whole-city day and night frames both balanced,
skies correct, nothing compounded.

**Findings.**

1. **The fire CA is a ghost — `probe-firehost` measured it before a line was written, and it saved the vector
   from being born dead.** The original design was "steer the engine at the smoke." Ignition is year-gated
   (blocks `year<2006`, forest `year<2030`), so **at 2035 nothing can ignite at all**; and even in its own era it
   is vanishingly rare — across **3 seeds × 61 years** there are **two one-cell episodes** in the engine's whole
   era (seeds 7 and 1234: *zero*), fire **never spreads** (peak 1.00 cells lit), and a cell burns 4 ticks =
   **1.8 real seconds** while the engine covers **1.6 hexes**. It is `T.MARKET` all over again: fully drawn,
   three labels boasting about it, and it never runs. The engine now genuinely *heads* to the smoke and usually
   never arrives, which is the model being honest. **Do not build "X responds to the fire."**

2. **A parked vehicle is often invisible — and the DOOR is not the reason.** `probe-servbay` measures the parked
   vehicle's ink against the same vehicle re-drawn on top: **4 of 9 read 0%**, eaten by whatever tall thing
   stands in the rows in front (draw order is depth order). I then built a door-ranking lever and **measured it
   at nothing**: nearest / least-blocked-over-3-rows / strictly-in-front score **485 / 489 / 485** out of 900.
   What buries a bay is the **density of the downtown the institution stands in** — the police station happens to
   sit in the open (91–99% on every seed); the hospital and firehouse sit in the core. **The lever was measured
   before it was mandated (198's law) and is not in the shipped code.** Banked as cue (n): making a bay legible
   means giving the civic tile a visible **apron on its front edge** — a `polish-tile` job, like 195's university.

3. **A stubbed shared `Math.random` makes a PER-ENTITY control worthless** — promoted to `SKILL.md`. My first
   control was one car, and it moved (0.0% → 1.4%), which looked like the patch routing ordinary traffic home. It
   was not: the patched service vehicles draw a *different number* of values from the one stubbed stream, so every
   later consumer walks a different walk. Averaged over the whole 38-car fleet the shift washes out and the
   control reads flat. **Aggregate the control, or give it its own stream.**

4. **A frozen clock does NOT refresh the DOM** — promoted to `SKILL.md`. My whole-city night frame came back with
   a *bright daytime sky* over a night-lit plate, and an agent correctly failed it. `syncSky` is **throttled to
   400 ms** and `syncStats` only runs inside the `playing` branch, so a hand-rolled freeze shoots a night plate
   under a day sky. Iter 202's lying camera, walked straight into again, one layer down.

5. **Aim a close-up at the entity's DRAWN position, not its hex centre** — promoted to `SKILL.md`. A vehicle is
   drawn *interpolated* between its hex and its next hex by `v.p`, so `ctr(x,y)` can be a full hex (~110 px)
   from where it actually appears. That is exactly far enough for a visual agent to sweep the wrong quadrant and
   report an empty street — which one did, on a frame where the probe measured the cruiser at **96% visible ink**.
   `stamp()` records the true drawn position in `_sx/_sy`; use it.

6. **The agents disagreed, and the probe was the verdict.** Seed 7 found both vehicles and described them exactly
   (teal roof bar, coral cross, red beacon). Seed 42 reported *"every road hex is completely empty"* — while
   simultaneously describing *"a blue square on a white hexagonal plinth with a coral cross beside it"* and
   calling it a hospital tile. **That is the ambulance**, beacon and all. It looked straight at the feature and
   misnamed it. The probe, which measures precisely the disputed claim (does the vehicle contribute ink to this
   frame), said 96% — and a direct look confirmed it. Agents fail confidently; a number is the verdict.

**Verdict: SHIPPED.**

## Iteration 205 — the ship that was right all along (Water × Connect)

**Vector.** Water & coast × **Connect** — the coldest cell on the whole board (last used at
iteration 22, ~180 laps ago). Connect's trick is that it adds **no new object**: it closes a gap
between two that already exist. The ship, the mole and the harbor works all exist.

**The seam (and it looked textbook).** `genWorld` spawns `freighters[0]` *"at anchor in the
roadstead off the warehouse row, **waiting on a berth**"*, throws a rubble **mole** out across the
roadstead so *"the ship at anchor rides in still water"*, and gives her an `ENTINFO` line saying she
is *"**Serving** the harbor works"*. And then `advanceEntities` says **`if(f.anchored)continue`**.
She has been a **static prop since 1974** — a comment, a breakwater and a tooltip all describing a
job she has never once done. That is the label-asserts-what-the-draw-ignores tell, in 204's exact
shape (the service fleet that never went home), sitting in the coldest cell on the board.

**Change (built, then reverted).** `stepShip()`: lie at anchor → be called **alongside** the quay at
`harborY` → work her boxes off and stow them again (`f.boxes` 6→0→6, the cranes visible in her
silhouette) → stand back out. A wake and a heading while under way; `ENTINFO.sub` a **function** of
her duty (105's law). Zero new draws from *either* random stream — the dwells were respent from her
own `ph` (123's trick) — so the seeded CA could not move and the rest of the shipping stayed
byte-identical.

**Census.** PASS, and **vacuous by construction**: +0 on every metric, tile histogram empty,
`freighters 18` flat. Exactly as predicted for entity motion. (The ±1 wobble on `greenRoofs`/`towerHt`
was checked against **pristine HEAD** and reproduces there — it is the harness's own run-to-run noise,
not the edit.)

**Probe.** `probe-shipberth` PASSED, and **passing was the mistake.** HEAD's ship: motion spread
**0.00 on all 3 seeds** — the static prop, confirmed. PATCH: **4 calls**, ~**55%** of her life
alongside, `minDist 2.9 → 1.60` cells, cargo cycling the full 0..6, and the 5 flooded deep-lane
control ships **bit-identical between builds**. Every number true. Every number irrelevant.

**Visual — the gate that caught it.** Two agents, two seeds, both **FAIL**, both naming the same
thing: *"she is still sitting in open water; there is no quay next to her."* Per the loop's law a FAIL
is a cue to **measure**, so I measured — and they were right. My probe's `ALONGSIDE < 2.2 cells`
threshold was **a number I picked because my own berth constant satisfied it**. The quantity the
*claim* was about is the water the eye sees under her bow, and at `seaXFr(harborY,0)` — the most
inshore position the artifact's open-water projection can even express — that is **54.6px, ~1.7
hexes**, on every seed.

**Why it cannot ship (`probe-harborhost`, 6 seeds, unanimous).** `SHOREX = CTRX+11` is *"the coast
highway column"*. `SHORE0 = SHOREX+5` is the water's edge, *"five lots seaward of the highway"*. The
harbor works are sited at `SHOREX-1-(rng()*3)` — **behind the highway**. So the warehouses stand
**5–9 hexes from the sea**, and the waterline at `harborY` is **BEACH / BEACH / DUNE** on every seed:
the same recreational sand 201 put the parasols and sunbathers on. **There is no quay, no wharf, no
industrial waterfront anywhere in the artifact.** Bringing her alongside beaches a container ship
between the sunbathers and a dune.

⇒ **The ship was never a broken promise.** A **roadstead** is an open anchorage where ships lie at
anchor *precisely because there is nowhere to come alongside*; ships there are worked by lighters or
they wait. *"Waiting on a berth"* is her **situation**, not an unkept one. Solvista is a roadstead,
not a harbour, and I read a real-world intuition ("ships dock") into a model that cannot express
docking — **201's law**, which the header had been carrying for four iterations, aimed straight at me.

**Kept.** `probes/probe-harborhost.mjs` — the host-existence probe (the `probe-market` / `probe-firehost`
shape), so no future lap re-derives this. It runs against plain HEAD and reports the waterline terrain,
the warehouse-to-sea distance, the bow gap, and the 0.00 motion spread, on 6 seeds. New banked cue **(o)**;
`solvista.html` restored **byte-identical** to HEAD.
**Not kept:** `probe-shipberth` (the one quoted above). It diffs the patch against HEAD, and the patch is
gone — it would sit in `probes/` producing a meaningless HEAD-vs-HEAD table forever. A gate for a reverted
change is not a gate. What was worth keeping from it is the *lesson*, and that is now a law in `SKILL.md`.

**Verdict: EXPLORED → REVERTED.** The third member of the dead-host family (`T.MARKET` fully drawn and
never sited; the fire CA fully drawn and never ignited; and now the port, fully described and never
built). The *finding* is worth more than the feature would have been: it removes an entire family of
tempting Water vectors from the board and names the one thing that would unlock them — **build the
quay first.**

## Iteration 206 — the gardens the city never dug (2026-07-12) [Nature × New CA rule]

**Vector.** Nature × New CA rule — but the *audit* kind (iter 107's move: rewrite a rule that
never fired, at zero content cost). Rotation owed Nature; the header banked a Nature cue
("GARDEN is the last season-mute tile — Deepen it before a tooltip"). The cue was **right about
the code and wrong about the priority**, and one census read said so: **GARDEN = 6 hexes across
the whole 9-cell matrix**, and the rule is year-gated to 2008+, so that is **~2 per city at 2035
and zero everywhere else**. Deepening a tile you cannot find is beautiful code nobody sees, so
the vector became: *why are there no gardens?* (205's law, cashed one lap later: **check the host
exists before you believe the tell**.)

**The defect (`probes/probe-gardenhost.mjs`, 6 seeds × 4 eras).** The rule wanted
`RES && countAround(...,RES)>=3`. Houses are *not* scarce — the city holds 287–369 RES throughout.
But **a house ringed by houses is precisely the house the upgrade pass turns into a mid-rise**, so
the pool it drew from **collapsed 40 → 15 across the only years the rule was allowed to run**:

```
  2008:  RES 369   host(RES,>=3 RES) 40.2   gardens 0.0
  2015:  RES 387   host             37.7    gardens 0.5
  2025:  RES 349   host             27.7    gardens 0.7
  2035:  RES 287   host             15.2    gardens 1.5     <- seed 5: host 3, gardens 0. Ever.
```

**It is `T.MARKET`'s defect one tile over (107): a siting rule that asks for the condition the
upgrade pass saturates past.** The probe also **killed my own next idea before I wrote it** — the
rule's comment says gardens are dug *"between the houses"* while the code converts a **house**, so
the honest host looked like the vacant lot. It is not: `EMPTY` with ≥2 RES neighbours falls
**85 → 6.5** by 2035 and **with a road adjacent it is 0.0**. The development pass eats every gap.

**Change.** `RES` is the wrong definition of *home* — **a mid-rise is still housing.** New shared
`HOMES = {RES, MID}` (TOWER excluded on purpose: that is skyline, not a neighbourhood), and the
neighbour test counts homes. Pool **2.5×** and *stable* through maturity (85→94→82→41 vs 40→38→27→15);
seed 5's host goes **3 → 30**.

**Then the visual gate FAILed on seed 5 — and it was RIGHT** (2nd time in 3 laps: 200's sun, 205's
ship). Not for its stated reason. It claimed the garden was off-centre and had "no lawn hex"; the
camera was in fact aimed true (`probe-gardenvis.mjs`, centroid **17px** off on an 88px hex). The
truth was worse: **seed 5's garden rendered 0 px of ink against 8,924 px drawn on top — 100%
occluded.** Across 23 gardens: **mean 58% occluded, 7 of 23 ≥86% buried.** A garden sited *in among
the homes* sits behind mid-rises, and **draw order is depth order**. I had stated the claim in
**cells** when it is a claim about **what the eye sees** (205's law, again).

**The lever, measured before mandated (198) — and then measured on the OTHER side.** Front-row
occluders separate cleanly (tall front: 2340px ink, 4/11 buried · clear front: 4354px, 2/12), so I
mandated a hard `openFront()` gate — and **it starved the rule: GARDEN 14 → 5, worse than the bug.**
`HOMES` requires ≥3 home neighbours and `MID` is *both* a home *and* the thing that buries you: the
two predicates fight. So it ships as a **preference, not a gate** — `rng() < (openFront ? 0.075 : 0.02)`
— which is also the in-world rule (nobody digs allotments in the permanent shade of the block next
door). New law in SKILL.md: **a lever has two ledgers — measure its cost to the POPULATION, not just
its effect on the INSTANCE.**

**Census.** PASS, 0 page errors. Core flat: pop −133 (−0.1%), roads +3, developed −23 (−0.4%).
**Tile histogram: `GARDEN 6 → 17` (+11).**

**Probe (`probe-gardenvis.mjs`, 24 gardens / 6 seeds).** mean occluded **58% → 40%** · fully invisible
**1 → 0** · ≥86% buried **7/23 → 1/24** · front-clear share **52% → 71%** · gardens/city **1.5 → 4.0**,
and **no seed is left at zero** (seed 5: 0 → 2, its best rendering **4% occluded, 8363 px**).

**Visual.** PASS on seeds 42 and 5 (seed 5 re-shot after the fix). Both agents, asked to *locate*,
independently reported the mechanism without being told it: *"the taller mid-rises are behind/beside
it rather than in front, so the plot is open to light and clearly visible."* Whole-city frames clean
on both.

**Verdict: FIXED.** A rule that had under-fired for the artifact's entire life now fires, and the
gardens it digs can be seen. **The banked seasonal cue is now UNBLOCKED and worth cashing** — GARDEN's
draw still reads no `year` at all (the last season-mute vegetation tile), and it finally has a host.

**Reusable:** `openFront(x,y)` + `TALLT` (next to `countAround`) — *is the hex in front of this one
clear?* Any ground-level thing that must be SEEN should ask before siting itself; **204's buried
service bays (cue n) are this same defect one domain over.**

## Iteration 207 — the twenty-first step-back finds a clean city and a one-crop calendar (2026-07-12) [holistic step-back]

**Vector.** The mandated 5th-lap holistic step-back (105→…→202, all done; this is the 21st).
Nothing added. Gates: census · perf **lap AND arc** (202's law) · whole-city visual at 2 seeds ×
3 lights × 2 calendars, shot with `probes/shot-stepback.mjs` (202's fixed camera, never `shoot.mjs`+`?year=`).

**Census.** PASS, 0 page errors. City unchanged, as a step-back should be (tile histogram empty;
`greenRoofs +1`, `towerHt +1` — chaotic-CA wobble).

**Perf — the lap is free, the ARC is real and is NOT accelerating.**
| vs | span | day | night |
| --- | --- | --- | --- |
| **202** `f65487c` | the lap (203–206) | **+0.3%** | **+1.0%** |
| **177** `7e2ac2c` | 30 iters | **+7.2%** | **+5.1%** |
| **162** `5f01426` | 45 iters | **+9.5%** | **+6.0%** |

Absolute: day 38.3ms · night 44.2ms. The lap is free — unsurprising, since **two of its four
iterations (203, 205) reverted** and the two that shipped (204's service routing, 206's garden
preference) add near-zero draw. The arc is the honest number, and the comparison that matters is
against **202's own reading of the same two refs**: it measured 177 at **+7.5/+4.1** and 162 at
**+8.6/+5.7**. Today: **+7.2/+5.1** and **+9.5/+6.0**. Five laps later the arc has moved **~+0.9% day**
— i.e. it is still creeping at roughly the documented +0.2%/shipped-lap, and **it has not accelerated.**
Priced and ACCEPTED; no perf-fix lap is owed.

**Perf — the SUSPECT, named not fixed (198's law).** `probe-drawbudget` (night, 3 seeds): `drawCell`
is **95.2%** of 132,679 path objects. The hot leaves are **not** the loop's ornaments — `winBandR`
**32.6%**, `prismS` **28.0%**, `hexTile` **12.7%**, `bandS` **7.3%**: i.e. **~48% of the night frame
is static terrain re-rasterized every frame**, plus the window bands. Everything ~200 iterations of
this loop has *added* is in the noise beneath it (`tree` 4.1%, `shadS` 2.2%, `drawBuilding` 1.4%,
`drawVehicle` 0.4%). **There is no hot ornament to cut** — the arc is diffuse, spread thin across
dozens of small draws, which is exactly why every per-lap gate reads it as free. **The suspect is
that the terrain layer is re-rasterized every frame although it changes only on `tick()`.** That is a
*structural* observation, not a mandate: 198's levers (batch the fills / shrink the radii / blit a
sprite) are all CLOSED and measured, the cost is **per path object**, and the only real lever is
drawing fewer objects. Do not open a caching lap on my say-so — **measure it first.**

**Visual.** PASS on **both** seeds, all four frames. Both agents, asked to *locate*, independently put
the golden-hour sun at **x=0.39, y=0.10** on two different seeds — the locate-don't-judge check
working. No z-order tears, no floating tiles, no blown-out color; both read the whole frame as "a
balanced, coherent, handsome coastal city." **No feature has compounded into clutter or darkness** —
the coast is not dark (kelp is behaving), downtown is dense but parses, night is carried by the
window/street-light layers with no black holes.

**⚠ THE FIND — both agents flagged the SAME cumulative weakness, and the probe VINDICATED them with a
number they could not have had: THE CALENDAR IS A ONE-CROP CALENDAR.** Seed 42: *"winter reads as
summer with two plowed fields"*; seed 7: *"otherwise winter is near-indistinguishable from midday."*
Per the standing law an agent finding is a **cue to measure**, so I ran `probe-season.mjs` (per-tile
rendered-pixel distance from winter, `ROAD` as the zero control). The seasons are **alive** — but they
are loud on the crops and **mute on the ground the city actually shows you**:

| carries the season | n | dry-peak | | season-MUTE | n | dry-peak |
| --- | --- | --- | --- | --- | --- | --- |
| **FARM** | 130 | **87.0** | | **PARK** | **583** | **8.4** |
| VINEYARD | 26 | 35.2 (41 aut) | | **SHOREPARK** | **294** | 17.9 |
| ORCHARD | 16 | 17.7 (41 aut) | | REDWOOD | 34 | 8.0 |
| MEADOW | 5 | 25.7 | | QUAD | 25 | 5.7 |
| FOREST | 230 | 19.9 (31 aut) | | **GARDEN** | 17 | **1.8** |
| | | | | *ROAD (control)* | 1200 | *0.6* |

**~170 agricultural hexes carry the whole calendar; the ~900 hexes of amenity green are ~10x quieter
than FARM while covering ~5x the ground.** PARK — the city's single largest green surface at **583
hexes** — shifts **8.4**, one order of magnitude under FARM and only ~14x the ROAD control. This is
**not damage that compounded**; it is a surface that was never wired, and it is the exact shape of
127's law (*"additive inventory spent" is a claim about a domain's ENTITIES, not its SURFACES* —
PARK's hexes were the untouched surface then, and they are the season-mute surface now).
It also **confirms the header's banked GARDEN cue by measurement**: `GARDEN 1.8` is ROAD-level, the
last season-mute vegetation tile, and 206 has just given it a real host (n=17, matching 206's
`GARDEN 6 → 17` exactly).

**⚠ But do NOT take this as a mandate — it is a JUDGEMENT, and 201's law applies.** A mown park
genuinely does *not* brown like a wheat field, so "PARK reads 8.4" may be the model being **honest**
rather than deaf, and an agent objecting that winter looks like summer may be objecting to *the
artifact's model of a Mediterranean coast* (where winter is the GREEN season and the *dry peak* is
the golden one — which is precisely why FARM's autumn 92.6 > dry-peak 87.0). Whoever takes this cue
must decide **what a Solvista winter is** before writing a line — and the cheap, defensible version is
not "make PARK brown" but **give the amenity green the same seasonal amplitude the crops already
have** (grass ambering at the dry peak, not snow).

**Verdict: HOLISTIC — clean bill on the city; perf arc priced and ACCEPTED; one measured cue banked.**
Three gates green, no feature has compounded into clutter or darkness, and the loop is not owed a
fix lap. Two things banked for the laps that follow: the **season-mute amenity green** (cue (p)) and
the **terrain-re-rasterization** perf suspect.

## Iteration 208 — the parks join the year (2026-07-12) [Sky & atmosphere × Deepen]

**Vector.** Sky & atmosphere × Deepen — cashing **cue (p)**, banked and *measured* by 207's step-back.
Rotation nominally owed Urban, but 119's law (a banked, measured finding outranks rotation
bookkeeping) points here, and the season pass (`applySeason`) is a Sky seam. Sky's Deepen cell is its
one live cell post-saturation.

**The seam, re-read before designing (123's law: a cue is a POINTER, not a SPEC).** 207 found the
calendar was a *one-crop calendar*: FARM shifted **87.0** rendered px from winter at the dry peak
while PARK — the city's **largest green surface, 583 hexes** — shifted **8.4**. The cue *sounded* like
"the amenity green was never wired", but the code said otherwise: **iter 120 had already wired it**
(`BASE.lawn=mixA(LAWN0,[186,188,116],dry*0.55)`). The defect was not absence, it was **amplitude**:
the dry target `[186,188,116]` sits ~36 units off `LAWN0=[150,181,122]` in red and nowhere else, then
`dry` caps at 0.55 and is halved again — a **~11 RGB unit** swing across a whole year. 120 wrote
*"amplitude, not presence, is what irrigated buys"* and then set the dial to **zero**.

Two things make that a real defect rather than a taste call:
- **PARK (8.4) was sitting at the EVERGREEN FLOOR.** `REDWOOD` shifts **8.0** — and a redwood is
  seasonless *by design* (`applySeason`'s own comment: "Evergreens sit it out"). The city's biggest
  lawn was as seasonal as a conifer.
- **`grass` and `lawn` are the SAME base colour** — both `[150,181,122]` (L276 / L310). So the dry-season
  divergence *is* the park's entire visual identity, and at 11 units the park was near-indistinguishable
  from an open hillside for most of the year.

**Change.** Colour-only, inside `applySeason` — **zero new path objects.** The managed greens keep
their RANK (greener + brighter than grass/meadow at every point in the year) but now carry a real
amplitude on all four keyframes: bleached-but-still-green at the dry peak (`G>R` keeps them off the
hills' gold), deeper through the wet winter, plus a **spring flush** they never had. Quads swing less
than parks (watered harder). The crop palette (`straw`/`stubble`) is untouched — `cropCol()` alone
drives a field's year, per L298's standing ban on double-counting.

**Probe** (`probes/probe-season.mjs`, rendered-px distance from winter, 3 seeds):

| tile | 207 | 208 | |
| --- | --- | --- | --- |
| PARK (n=583) | 8.4 | **23.5** | leaves the evergreen floor; now sits with FOREST/MEADOW |
| SHOREPARK (294) | 17.9 | **52.3** | the whole hex body is lawn — the biggest mover |
| QUAD (25) | 5.7 | **21.2** | |
| GARDEN (17) | 1.8 | 5.4 | still near-mute — its ground is mostly raised beds; cue stands |
| REDWOOD (34) | 8.0 | **8.0** | evergreen floor, unmoved |
| FARM / MEADOW / FOREST / VINEYARD / ORCHARD | 87.0 / 25.7 / 19.9 / 35.2 / 17.7 | **all identical** | negative control: no double-count |
| **ROAD control (1200)** | 0.6 | **0.6** | dead ✓ |

Every tile I did not touch is **bit-identical**, and the ROAD control stays dead — the change is
isolated to the amenity green by construction.

**Census.** PASS. Every metric **+0**, tile histogram **empty** — the correct, vacuous result for a
colour-only change (it proves only that nothing threw or collapsed). The probe is the gate.

**Visual — BLIND locate, 2 seeds (108's law).** Frames shot with `shot-stepback.mjs` (clock frozen
in-page; `day` and `winter` share t=0.30, so only the calendar differs). Frames were copied to neutral
names and **randomized in opposite directions per seed**, then one agent per seed was asked to *name*
which frame was the dry season — not to judge whether the change worked.
- seed 42 → **"B is the dry season"** (truth: A=winter, B=dry) ✓
- seed 7 → **"A is the dry season"** (truth: A=dry, B=winter) ✓

Both correct, on opposite keys. Both **independently cited the amenity green among their tells** —
seed 7's agent *led* with "the wide coastal green strip behind the beach" (SHOREPARK, the 52.3 mover),
seed 42's named "the coastal green belt behind the beach" second. Both confirmed the **rank held**:
the parks still read as *"irrigated… living mid-green while the hills around them go gold"*, with **no
dead, blown-out, sickly-yellow or washed-out lawns** in either frame, and no z-order tears, floating
tiles or compounded clutter/darkness across all four frames (day/golden/night/winter). `VISUAL: PASS` ×2.

**Perf.** Free **by construction**, not by measurement: the diff adds **zero path objects** (two extra
`mixA` calls per frame = 6 lerps). Under 198's measured cost model — cost is **per path object
rasterized** — a pure palette change cannot move the frame. No `perfab` run; 212's step-back owns the arc.

**Banked (from seed 7's agent, unprompted and honest).** *"A couple of hillside hexes sit close in value
to the paler lawns, but they never invert."* The rank holds, but **the amplitude is now near the top of
what is safe** — a further push on `lawn`'s dry target risks the parks reading *paler than the hills*,
which would invert the one relationship the tile exists to express. Do not raise it without re-running
the blind locate.

**Verdict: DEEPENED.** The city's ~900 hexes of amenity green now breathe with the year instead of
sitting frozen at the evergreen floor, and the season is no longer carried by ~170 agricultural hexes
alone. Cue (p) is CLOSED for PARK/SHOREPARK/QUAD; **GARDEN remains mute (5.4) and keeps its own richer
Nature × Deepen cue** (staggered raised beds + a shared `gardenPhase()`).

## Iteration 209 — the ground the city stands on (2026-07-12) [Urban fabric × Deepen]

**Vector.** Urban fabric × Deepen. Rotation owed Urban (stalest, last lap 199) and the
header pins it **Deepen/Polish only** — additive spent (118), Connect measured-hard twice
(160/165), roof-furniture closed city-wide. Of the three Deepen targets the header named
(facades, **ground plane**, harbour apron), the ground plane turned out to be the biggest
untouched surface in the artifact.

**The seam.** `drawCell`'s `default:` case painted the ground under **every** developed hex
as one flat `col('sandDk',0.9)` — a house's front garden and a factory's yard wore the
identical paint — while the very next line gave the `EMPTY` lot beside them a whole
patchwork *"so the green sheets read as pasture, not paint."* The comment knew the
principle and applied it only to the land nobody had built on yet. This is the ground-plane
sibling of 199's tell: not a constant asserting what its value cannot do, but a **comment
stating a standard the adjacent branch is exempted from**.

**Host check FIRST (`probes/probe-groundvis.mjs`, 206's law: draw order is depth order, so a
yard buried by the row in front is not a host).** Loud-paint one type's ground, diff vs base,
count changed px — the diff *is* the visible ground, by construction. 3 seeds, both controls
at an honest **0 px**:

| ground | cells | visible px | % of frame | px/cell |
| --- | --- | --- | --- | --- |
| **RES** | 288 | **35,364** | **2.21%** | 122.8 |
| MID | 440 | 24,633 | 1.54% | 55.9 |
| COM | 216 | 15,478 | 0.97% | 71.5 |
| TOWER | 80 | 5,635 | 0.35% | 70.7 |
| EMPTY | 49 | 8,760 | 0.55% | 180.0 |

**The developed ground a viewer actually SEES is ~5.2% of the frame, and the RES front
garden alone is 2.2% — more visible ground than every open lot in the city put together.**
Not buried at all: the yards are the *most* visible ground there is.

**Change.** One new palette entry (`paving`) and one table:
`GROUND={RES:['lawn',0.90], MID:['paving',1.00], COM:['paving',1.00], TOWER:['paving',0.94],
CIVIC:['paving',1.05], IND:['stone',1.25]}` — gardens in the terraces, paving through the
walk-ups and the core, hardstanding at the works; flecked like the pasture but **quantized to
5 steps** so `col()`'s `name|f` cache stays small (the road's resurfacing-patch discipline).
**Colour only: the same single `hexTile` per hex, ZERO new path objects** (198's per-ellipse
cost model). And because a garden is **`lawn`**, the suburbs join the parks' calendar (208)
**for free** — the residential fabric was the largest surface the seasons could not reach. A
garden is drawn *deeper* than a mown park lawn (hedges, shade, shrubs), so it holds its rank
below PARK while carrying the same year.

**Census.** PASS. Core metrics exactly **+0**, tile histogram **empty**, entity counts flat —
correct and expected: draw-only, no `rng()`, no terrain, no new tile/entity. Vacuous, so the
probe is the gate.

**Probe** (`probes/probe-ground.mjs`). Two claims, each with a control that must not move.
Masks come from the loud-ground hook (wrap `drawCell` to record the cell, wrap `hexTile` to
paint one type's ground red, diff vs base) so the sample is the host's own pixels — no
world→screen box, so no neighbour contamination (196). Noise floor **0 px on both builds**.
- **(1) SEPARATION.** BASE pairwise land-use tone separation **mean 16.4, min 1.0** — RES
  183,161,118 vs MID 182,160,118: *the garden and the court agreed to within one RGB unit.*
  PATCH: **mean 43.8, min 6.8** (RES 134,151,102 · MID 181,169,143 · TOWER 172,163,139).
- **(2) THE SUBURBS JOIN THE YEAR** (a state-response question ⇒ two pins of `year` within
  one build, run on both — 196). Winter→dry-peak rendered shift:
  **RES 1.2 → 36.8** · **NEGATIVE control COM (paving, not seasonal) 1.0 → 1.7**, MID 1.1 →
  1.6, TOWER 0.5 → 0.6 · **POSITIVE control PARK 44.1 → 44.6** (moves on *both* builds, so
  the pin is live and my edit did not disturb it). RES now carries an amplitude in the
  parks' own league, on ground that was frozen for the artifact's entire life.

**Perf.** FREE — interleaved A/B vs pristine HEAD (`perfab.mjs`): **day +0.6% · night +0.2%**,
inside the ~1% noise floor 199 proved on provably-identical code. Structurally it must be:
same path-object count, one extra `hashCell` per developed hex, 15 extra `col()` cache entries.

**Visual.** Both seeds **VISUAL: PASS**, on frozen `shot-stepback` frames. Both agents were
asked to **LOCATE, not judge** (108), and both delivered:
- *Suburbs vs core **from the ground alone**, ignoring roofs and heights* — both drew the
  paved core as a central mass (~0.48,0.50 / 0.42–0.56 x) ringed by green garden ground, and
  both said the two are **"clearly separable from ground alone — I did not need roofs or
  heights."* That is the whole claim, read back to me by someone who could not see the code.
- *Which frame is the drought?* — **A/B labels deliberately inverted between the seeds** so a
  coin-flip cannot pass both (199's trick). Seed 42 said **"A"** (truth: A = dry peak); seed 7
  said **"B"** (truth: B = dry peak). Both cited the suburban yards bleaching to khaki/straw
  while *"the grey paved core and the beach stay unchanged in both, which is exactly the
  'only lawn responds' signature."*
- *Cumulative:* no tears, no floating tiles, no blowout, no muddiness. Both volunteered that
  the city is **not** too green — *"the greens are confined to the low-density fringe, which
  actually sharpens the density gradient rather than flattening it."*

**Findings banked.**
- **The ground plane is now SPENT as an Urban Deepen target.** Of the header's three
  (facades, ground plane, harbour apron), **facades** and the **harbour apron** remain.
- **A comment that states a standard the adjacent branch is exempted from is a tell** — the
  sibling of 199's constant. `EMPTY` got the anti-"paint" patchwork; the 1,000+ developed hexes
  beside it did not, for 208 iterations. Grep for a principle written down once and applied
  to one branch of the same `if`.
- **`probe-groundvis.mjs` is reusable:** it answers *"how much of surface X does a viewer
  actually see?"* for any tile-level draw, via the loud-mask diff. Ask it before designing on
  a ground-level surface (206's law), and note the numbers it returns are large — the ground
  plane is not a marginal canvas.

**Verdict: SHIPPED.**
