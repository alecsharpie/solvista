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

**Interaction/UX is a column** (since 97). Cells hold only vectors the ledger explicitly attributes to a domain;
cross-cutting ones (U2, 42, U5) stay in the bullet below.

| Domain | New element | New CA rule | Deepen | Connect | Scale | Polish | Interaction/UX |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Nature** | 4, 26, 29, 102, **156**, **174** | 1, 13, 60, **206** | 37, 46, 67, 76, **108**, **120**, **139**, **166** | ~~46~~, ~~88~~, ~~101~~ | U4 | 53, 96, **194**, ~~**198**~~ | **117**, **129**, **148**, **183** |
| **Water & coast** | 6, 10, 12, 16, 20, 33, 106, **169** | 90 | 17, 25, 51, 65, 72, **113**, **123**, **159**, **196** | 22, ~~**205**~~ | | U2, 44, 58, 79, **116**, **132**, **150**, **185** | **97**, **141**, **176** |
| **Urban fabric** | 32, 62 | 7, 23, ~~82~~, **151** | 38, 54, 68, 92, **165**, **173**, **189**, **199**, **209** | 47, **109**, ~~**160**~~ | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103**, **110**, **118**, **124**, **143**, **180** | **133** |
| **Transport** | 2, 9, 21, 31, 48, **164** | 77 | 28, 39, 55, 63, **112**, **121**, **128**, **155**, **179**, **193** | 5, 15, **138**, **211** | U4 | U1, U3, 70, 85, 87, 94, **146**, **188**, ~~**203**~~ | **105**, **171** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107** | 36, 59, 66, 80, 91, **149**, **158**, **175**, ~~**195**~~ | 45, **204** | | 73, ~~**114**~~, **168** | 52, 122, **140**, **184** |
| **Sky & atmosphere** | 27, 43 | | 19, 35, 50, 57, 95, **135**, **153**, **161**, **181**, **190**, **208** | | | 61, 81, 89, **115**, **200** | ~~**134**~~, **144** |
| **People & activity** | 41, 56, **127**, **170**, **186** | 49 | 34, 64, 93, **104**, **119**, **145**, **178**, **201**, **210** | 78, **111** | | 84, **137**, **163** | 71, **154**, **191** |

- **Interaction/UX kind — the FEATURE INVENTORY (U2 / 42 / 52 / 71 / 97 / 105 / 117 / 122 + U5's
  falling stats) was rotated to `GROWTH-archive.md` at 211: it was history, not steering.** What
  steers: when adding an entity array, `stamp()` it in its draw + add an `ENTINFO` row (the same
  discipline as the census hook). `stamp()` also draws the focus ring, so any stamped entity is
  ringable for free — and since 133 a hovered TILE is ringed too. **An `ENTINFO` `sub` may be a
  FUNCTION of the entity (105)** — use it when a thing's interest is its *membership* (which line /
  route / depot; **211's `Feeds — Line N of M`**), computed live, never a stored string.
- **ROTATION.** Last vector per domain (**212 was a step-back — it takes no domain, so rotation is unmoved**):
  Sky **208** · People **210** · Transport **211** · Urban **209** · Nature **206** · Civic **204** · Water **205**.
  **THE LAP NOW OWES CIVIC (stalest, 204), then Water (205), then Nature (206).** ⚠ But 212 banked TWO cues that a
  *step-back is meant to steer by* — **(q) the night coast** (Water × Polish) and **(r) facades as wallpaper**
  (Urban × Polish). Both were named independently by two blind agents, and **a banked, measured finding outranks
  kind-rotation (119)**: Water is already 2nd in the queue, so (q) is the natural next-but-one lap.
  **211 (Transport × Connect, SHIPPED: the buses come to the trains) — full recap in its own entry.**
  `recount()` had built ONE transit reach map from stations UNION bus stops while the two were sited by rules that
  had never heard of each other — so they met at the coin's base rate: **3 of 55 stations over 6 seeds.** A station
  now claims a nearby street (`c.stop=2`; `STOPR=2` is `rTransit`'s OWN radius, shared). Coverage **24% → 93%**,
  the terrain ceiling. What survives (its kerb-offset law ⇒ SKILL.md):
  **(1) `frontLoad(x,y)` is the sharper `openFront`** (beside it): `openFront` is a boolean on the row at dy=+1 and
  **misses a TOWER two rows in front**, which reaches up the screen anyway — 11 of 42 interchanges were invisible
  WITH `openFront` true. `frontLoad` weights two rows (first double). Both ship as **PREFERENCES, never gates**
  (206). Net: interchange occlusion **58% → 36%**, ink **94 → 136** vs the ordinary control's 144.
  **(2) A station sits in dense fabric BY CONSTRUCTION** (>=3 developed nbrs), so ANY ground-level thing sited off
  one inherits 206's occlusion law; the residual 36% is terrain, not rule.
  Urban is measured-saturated in *additive* and *Connect* (see below) ⇒ its lap must be **Deepen or Polish**.
  **210 (People × Deepen, SHIPPED: the city goes to bed) — full recap in its own entry, still in the window.**
  199 gave the WINDOWS an hour; the STREET was still a uniform 50/50 coin against a saturated `LITAMT>0.75`. Each
  resident now keeps their own `out` (`curfewAt`). Two findings steer (its stubbed-stream law ⇒ SKILL.md):
  **(1) ⚠ 137's "the ped/dog system is NON-REPRODUCIBLE ⇒ never probe it build-vs-build" is DISPROVEN** — 203's
  `Math.random` stub + in-page `genWorld` gives byte-identical crowds. **People is probe-able like any domain**
  (`probes/probe-curfew.mjs` IS a build-vs-build diff of the crowd).
  **(2) THE `LITAMT` NIGHT-GATE AUDIT IS DONE — do not re-run it.** `LITAMT` peaks at 1.0 (dayT 0.86) but is back to
  **0.64 by the small hours**, so any gate `LITAMT > 0.64` defines a "night" that **ends before dawn**. Exactly two
  existed, both People, both fixed at 210. **Every other `LITAMT>` gate is <= 0.6 and is safe.**
  **209 (Urban × Deepen, SHIPPED: the ground the city stands on) — full recap in its own entry, still in the
  window; its new tell (*a comment stating a standard the adjacent branch is exempted from*) ⇒ SKILL.md.** Now
  `GROUND` = `lawn` gardens / `paving` / `stone` hardstanding, where every developed hex had shared one flat
  `sandDk`. Colour-only, zero new path objects. Three things survive:
  **(1) ⚠ THE GROUND PLANE IS NOW SPENT** as an Urban Deepen target — **facades** and the **harbour apron** remain.
  **(2) THE DEVELOPED GROUND IS A HUGE SURFACE, MEASURED (`probes/probe-groundvis.mjs`, reusable):** the ground a
  viewer SEES is **5.2% of the frame** — RES yards alone **2.21%**, *more than every open lot put together*, and
  NOT buried (cf. 206). Ask it — *"how much of surface X is visible?"* — before designing on any ground surface.
  **(3) THE SUBURBS NOW BREATHE WITH THE YEAR** (RES seasonal shift **1.2 → 36.8**). ⇒ **When a domain looks
  interconnect-saturated, re-ask it as: what LARGE SURFACES wear a palette name that cannot carry the signal?**
  **206 (Nature × New CA rule, FIXED) / 204 (Civic × Connect, SHIPPED) — recaps in their own entries; prose rotated
  at 210, laws ⇒ SKILL.md.** What survives: **(1) Reusable — `openFront(x,y)` + `TALLT`** (beside `countAround`):
  *is the hex in front clear?* **Draw order IS depth order, so any ground-level thing that must be SEEN should ask
  before siting itself** (23 gardens: mean **58% occluded**, one at **100%**). Ship such a lever as a **PREFERENCE,
  not a GATE** — the hard gate *starved* the rule (`GARDEN 14 → 5`, worse than the bug it fixed); 211's `frontLoad`
  is the sharper form. **(2) The vacant lot is a MIRAGE** — `EMPTY` with ≥2 RES nbrs falls **85 → 6.5** by 2035,
  **0.0** with a road adjacent; development eats every gap.
  **⚠ THE FIRE CA IS A GHOST — do not build "X answers the fire" (`probe-firehost`).** Ignition is year-gated
  (`year<2006`, forest `year<2030`) so **at 2035 nothing can ignite at all**; before then, **two one-cell episodes
  across 3 seeds × 61 years** and fire **never spreads**. **`T.MARKET` again.** Reviving it is a real CA lap (BURNT
  is the palette's darkest tile), not a freebie.
  **⚠ Cue (n) — A PARKED VEHICLE IS OFTEN INVISIBLE, AND THE DOOR IS NOT THE REASON** (`probe-servbay`: 4 of 9 read
  **0%** visible ink). What buries a bay is **the density of the downtown its institution stands in**, not which door
  it picks — 204 built the door-ranking lever and **measured it at nothing**, so it is NOT in the shipped code.
  **⚠ THE `polish-tile` BACKLOG — measured cues that are NOT growth laps. Do not spend a domain's lap on one; they
  need a tile redesign, and each already has a gate written.** (a) **THE WHOLE ELEVATED TRANSIT is sub-pixel at fit
  zoom** (0.5px rope, 5px cabins, hairline masts/pylons) — **its Z-ORDER IS CORRECT AND IS CLEARED THREE TIMES; the
  fault is LEGIBILITY. NEVER RE-OPEN THE Z-ORDER** (203 `probe-gondz`: rope 8.4-23.6% occluded; **212
  `probe-monoz`: `drawMonoAt` 10.6-19.8% occluded on every seed/light**). Agents keep FAILing it as "drawn over the
  towers" because a hairline with sub-pixel supports READS on-top however correctly it is sorted. *Do NOT re-try a
  body/halo under the rope (measured — backfires) or a lit top edge (measured — impossible at 0.5px).*
  (b) **`university` is the ONLY of the twelve civics with no `LITAMT`** — the one `MAJORK` monument
  pitch dark after sunset; every place to put the light failed (195; `probe-unilight.mjs` + `shot-uni.mjs`).
  (c) **A parked service vehicle needs its CIVIC TILE to have a visible apron on its front edge** (204, cue n).
  (d) **The marsh reeds do not read** — seven sub-pixel strokes round the pool; its calendar is already computed
  and invisible (cue (i), 113).
  **Sky is post-saturation (Deepen/Fix ONLY — its additive/CA cells are traps).** **Urban is measured-saturated: additive spent (118), and Connect measured-hard TWICE** — 160 (RES terracing: no seed forms E-W RES runs of >=3) and 165 (high-street arcade: the `hstr` parade zigzags with row parity, longest straight-hex-axis run = 2, so it is not a clean arcade host); **Urban's next lap is Deepen/Polish only** (or a COM arcade if a *straight-hex-axis* retail run is ever found — the parade is not one). **Roof-furniture is CLOSED city-wide** across all 5 developed types (MID/RES water tanks, TOWER gardens, COM plant 165, IND warehouse north-light clerestory 173) — no bare roof is left, so a future Urban "bare roof" vector has no host; Urban Deepen must go elsewhere — and the **GROUND PLANE is now SPENT too (209)**, leaving **facades** and the **harbour apron**. Check the last entry of the stalest domain for a banked
  finding before reading its row. (**137's People × Polish** recap was rotated to `GROWTH-archive.md` at 210,
  along with its non-reproducibility warning, which 210 DISPROVED — see the ROTATION block. Still open from it:
  the *static* standing crowds are the last movers casting no `shadS()` shadow.) (**Sky's moon is FIXED (135) and NAMED (144)**
  — both closed, prose archived at 212. **STILL banked for Sky: the SEASON word** — it reads the fast `year` and would strobe
  ~0.7 Hz (134), so it needs a slow clock (or quantize/hold) FIRST; don't add `seasonWord(year)` to the HUD nor re-ship 134's
  REVERTED almanac assuming 135/144 unblocked it. Sky's additive/CA cells are still traps, see below.) (132's kelp-canopy recap: archived at 210.)
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
  **⚠ ITERATION 217 IS THE NEXT HOLISTIC STEP-BACK** (every 5th since 105; **212 was the last, all 22 done**). The 207 / 205 / 203 / 202 / 201 recaps are rotated — laws in SKILL.md; 205's finding is held in full by cue (o).
  **212 (the 22nd) = a CLEAN BILL, no fix lap owed — and BOTH agents FAILed on causes MEASUREMENT REFUTED.**
  Seasons alive (`probe-season` FARM dry-peak **87.0**, ROAD control 0.6) and both agents named the season correctly
  **BLIND** (frames renamed frameA/frameB, order flipped between seeds); both located the sun at **x=0.39, y=0.10**,
  as at 207. **Their two FAILs were both wrong, and both instructive:** (i) *"the golden-hour sun sits in the cold
  sky"* — factually true, and it is **201's law**: an objection to the MODEL (200 sited the sun high ON PURPOSE —
  the placard owns the low-left sky, so it CANNOT go low) ⇒ **cue (s)**, not a bug. (ii) *"the elevated rail is
  drawn OVER the towers"* — **MEASURED AND REFUTED** by new `probes/probe-monoz.mjs`: `drawMonoAt` is **10.6-19.8%
  occluded** on every seed and light, i.e. genuinely depth-sorted, with `drawGondAt` carried as a calibration
  control reproducing 203's independent 8.4-23.6%. **⇒ THE TRANSIT Z-ORDER IS CORRECT AND IS NOW CLEARED THREE
  TIMES (202, 203, 212) — NEVER RE-OPEN IT.** The fault is **LEGIBILITY** (the tramway is sub-pixel at fit zoom,
  `polish-tile` backlog (a)): a hairline whose supports sit below the pixel floor READS as on-top however correctly
  it is sorted. **⇒ THE LESSON: the agents were WRONG on both things they were confident enough to FAIL on, and
  RIGHT on both things they said in PASSING (cues q, r). In a whole-frame read, the ASIDES are the signal.**
  Perf ARC (same refs as 202/207, directly comparable): the lap (208-211) **day +2.7% / night +0.6%** vs 207; vs
  `7e2ac2c` (177, 35 iters) **+8.7% / +4.8%**; vs `5f01426` (162, 50 iters) **+10.5% / +7.3%** (absolute: day
  40.4ms · night 46.5ms). 202 read those same refs at +7.5/+4.1 and +8.6/+5.7, and 207 at +7.2/+5.1 and +9.5/+6.0 —
  so ten laps on the arc has moved ~+1.2% day and is **still ~+0.2%/shipped-lap, NOT accelerating; ACCEPTED.**
  **⚠ THE STANDING PERF SUSPECT (207, unchanged at 212; named NOT mandated per 198): THERE IS NO HOT ORNAMENT — the
  arc is DIFFUSE, which is exactly why every per-lap gate reads it as free.** `probe-drawbudget` (night): `drawCell`
  = **95.2%** of 132,679 path objects; hot leaves `winBandR` **32.6%** · `prismS` **28.0%** · `hexTile` **12.7%** ·
  `bandS` **7.3%** — **~48% of the night frame is STATIC TERRAIN RE-RASTERIZED EVERY FRAME**, while 200 iterations
  of added features sit beneath it (`tree` 4.1%, `shadS` 2.2%, `drawBuilding` 1.4%). **Do NOT open a caching lap on
  that say-so — 198's levers are all CLOSED (cost is PER PATH OBJECT), so the only lever is drawing FEWER objects.**
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
  minutes, so three passes in one window are three samples of ONE draw: 117's gate read a perfectly STABLE
  +25.5/+26.0/+26.5% on a diff with **zero draw calls**, and the identical bytes read +3.5% twenty minutes later.
  Only an **interleaved A/B/A/B against pristine HEAD** (min per variant) reads true; `perfab.mjs` implements it.
  (Reasoning archived at 199.)
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
  **(g) ~SIXTEEN seedless `hashCell` calls remain — each paints the IDENTICAL pattern in EVERY city.** 103's audit
  grep undercounted (it matched only a **bare integer** salt, missing every `k+90` / `j+40` form); 113's superset is
  the one to use — and **the old L-numbers have long since drifted, so RE-RUN it rather than trust a catalogue**:
  `grep -noE 'hashCell\([^;]{0,60}' solvista.html | grep -v seedNum` (discard the definition and genWorld's three,
  which pass the real `seed`). Two stakes, and **only the first is an invariant breach worth a vector**:
  - **Presence decisions** (a thing is there, or isn't, in the same place in every city): the night surf
    light-smear, `hashCell(x,y,77)<0.28`. **This is the one to fix.**
  - **Ornament jitter** (a detail's lean/length/brightness, not its existence): kelp sway, palm fronds, orchard
    fruit, **park fireflies** (identical firefly positions in every city). Cosmetic; low stakes.
  The marsh reeds (113) and the tower window-lights (110 — the most visible of the class) are already CLOSED.
  Note `darkWinR` is **not** a breach: it takes a literal `salt` but mixes `seedNum^salt` internally — check the
  callee before indicting a call site. When fixing a range, **space the bases**: `0x9EE1+j`/`0x9EE2+j`/`0x9EE3`
  collide at `j=2` (113).
  **(i) marsh reeds do not read** — folded into the `polish-tile` BACKLOG above (113, Water).
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
  **(q) THE NIGHT COAST IS A MAUVE VOID (212, Water × Polish suspect).** Raised UNPROMPTED and INDEPENDENTLY by both
  step-back agents on both seeds — seed 42: *"the sand at night flattens to a low-contrast mauve where detail dies"*;
  seed 7: *"the beach + coastal strip at night collapses into a single flat mauve-grey mass with no beach/sand read."*
  The beach is fully realised BY DAY (damp margin, tidepools, towels, parasols — all tide-aware since 196/201) and
  then reads as **nothing** after dark. **PROBE BEFORE DESIGNING** (is it luminance, is it contrast, is it that no
  night draw is gated on BEACH at all?) — and mind cue (m): the coast is where 159's bioluminescent surf FAILed every
  stroke form and passed only as sparse `hashCell` **dots**, so shape, not brightness, is the lever there.
  **(r) A BUILDING TYPE HAS BECOME WALLPAPER (212, Urban × Polish suspect).** Also raised unprompted by both agents,
  independently, naming *different* types — seed 42: *"the red-roofed podium block repeats densely enough in the
  mid-city to become texture noise rather than buildings"*; seed 7: *"the striped high-rise tower is the single most
  repeated element and at this density it has become wallpaper."* This **CONVERGES with the header's own standing
  note** that Urban's ground plane is spent (209) and only **facades** and the harbour apron remain — the facades are
  now independently indicted by two blind reads. Urban is additive- and Connect-saturated, so this IS its next lap.
  **(s) GOLDEN HOUR HAS A HIGH SUN AND A HORIZON-WARM SKY (212, Sky × Polish suspect — CONSTRAINED, read first).**
  Seed 42 FAILed on it: the disc sits high (**y=0.10**) in the *cool* part of the sky while the warm gradient comes
  from the bottom/bottom-right, so golden hour *"reads as hazy dusk with a stray dot."* Every factual claim is true.
  **But the sun CANNOT simply be lowered — 200 put it high ON PURPOSE** (the plate is a hexagon, the `.placard` owns
  the low-left sky; a low sun goes behind the HUD, which is the exact bug 200 was fixing). So this is **201's law**:
  the FAIL objects to the MODEL. Any lap here must reconcile the *sky gradient's* direction with the sun's, or move
  the warmth — **not move the sun down**. Low value, real constraint; do not take it as a quick win.
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

> **Archive:** the 205 entries before Iteration 203 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

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

## Iteration 210 — the city goes to bed (2026-07-12) [People & activity × Deepen]

**Vector** — People & activity × Deepen. People was the stalest domain (last lap 201); its
entity list is long spent, so Deepen — and the seam turned out to be one iter 199 had left
open one system over.

**The seam** — `pedHidden` was the 199-tell exactly, and it wore its own comment as the tell:

```js
/* crowds thin late at night */
const pedHidden = p => LITAMT > 0.75 && !!p.nite;   // nite: Math.random() < 0.5, at spawn
```

Two defects, both of which the comment denies. **(a) It does not thin — it blinks.** The
coin is uniform and the threshold is shared, so half the city vanished *in a single frame*.
**(b) It is deaf to the hour, because `LITAMT` is saturated.** 199 established that the light
curve **pins `LITAMT` at 1.0 from dayT 0.86 to dawn**; it therefore cannot tell 8pm from 4am.
199 fixed that for the *windows* (`nightDeep()`, and `BEDT`: a home empties fastest, a tower
keeps a skeleton crew till dawn) and left the *street* on the old clock. **(c)** And the coin
was **place-blind**: as many people were left standing in a dark rim field at 3am as outside
the lit shopfronts.

The probe then found a **fourth** defect nobody had written down. `LITAMT>0.75` is not just
saturated, it is *narrow*: LITAMT is back down to **0.64 by the small hours**, so the old
"night" was only `dayT 0.76..0.02` — and **the entire crowd of 93 was back on the street at
3am.** Twice a night the city blinked.

**Change** — draw-only; no terrain, no `rng()`, no new entity, **zero new path objects**.
- `nightAmt()` = `nightDeep()` (199's clock — 0 at dusk, 1 in the small hours, off the slow
  `dayT` the moon and the hall clock already share) faded at **both** ends by the light.
  `nightDeep()` is monotone and clamps to 1 *outside* its span (it reads 1.0 at noon), so it
  can open the evening but can never close the dawn; `LITAMT` does that. `NIGHTLO=0.35` is
  the paned-glass cut **verbatim**, so the panes and the street now agree on what "the dark
  hours" means — one predicate, one definition.
- `curfewAt(x,y)` = `CURF0 + CURFB*buzzN(x,y) + Math.random()*CURFJ` — each resident's own
  hour, drawn from **`c.buzz`** (iter 104's "somewhere worth standing" field, which `stepPed`
  already walks them toward). Quiet ground turns in through the evening; the market, the
  plaza and the lively kerbs keep their crowd. The jitter is what makes it a *thinning*: a
  block empties one door at a time. Re-learned on re-anchor, but **only while `nightAmt()===0`**
  — i.e. while nobody in the city is hideable at all, which makes a mid-evening pop
  *unrepresentable* rather than merely unlikely (the per-resident coin existed to stop peds
  blinking as they cross a hex; that property is preserved by construction).
- `drawDog` already consulted `pedHidden(owner)`, so the dog goes home with its human for free.
- `residentDoing` reads the **same** `out` and `nightAmt()` the draw gates on (123's law: run
  the tell *forwards*, so the sentence and the rule cannot drift): `Staying out a while yet.` /
  `About to call it a night.` / `Out till dawn.`
- **The joggers carried the identical bug**, found by auditing every `LITAMT>` gate in the
  file: `if(LITAMT>0.75 && ((j.ph*97|0)%10)<6) return;` — same saturated gate, same fixed coin,
  one array over. They now keep their own (shorter, buzz-free) hour on the same clock: an
  evening run is a thing, a 3am one is not.

**Census** — PASS, vacuous as expected: every metric flat (±1 noise), tile histogram empty,
entity counts unchanged (`joggers 31`, `peds 664`). It proves only that nothing threw and the
seeded stream is untouched.

**Probe** — `probes/probe-curfew.mjs`. No pixels at all: `pedHidden` is a pure function of the
resident's hour and the clock, so **one frozen world is re-read at 8 clock pins with a zero
noise floor**. 3 seeds. `Math.random` stubbed before `genWorld` (203) so both builds spawn the
identical crowd. Reported in the **viewer's units** — the tile a resident stands on — never in
buzz, since buzz is the mechanism and gating on it would be grading my own homework (205).

| | lively ground keeps | quiet ground keeps |
| --- | --- | --- |
| BASE (its own darkest hiding pin) | 57% / 58% / 25% | 49% / 44% / 57% |
| PATCH (the small hours) | **86% / 83% / 63%** | **27% / 29% / 32%** |

BASE does not separate at all — **and the sign flips by seed**, which is what a uniform coin
looks like as a number. PATCH separates cleanly, same sign, every seed.

**Cadence** (independent of buzz — it is just a count against the clock):
`BASE 93 -> 47 -> 47 -> 47 -> 93 -> 93` (two distinct crowd sizes: a cliff down, a cliff back
up *before dawn*) vs `PATCH 93 -> 81 -> 52 -> 30 -> 73 -> 93` (five: a monotone descent and a
graded dawn return).
**Joggers:** BASE has **3/3 out at 3am on every seed** — and on seed 7 its fixed coin hid
**nobody, ever** (3->3->3->3->3). PATCH: `3->3->2->0->0->0->3`.
**Control:** the day is a **provably inert regime** (199) — nobody is hidden by daylight in
either build, so it is a free noise floor: identical on all 3 seeds.

**Perf** — not run, and provably not needed: the diff adds **zero path objects** (it only
*gates* draws that already existed) and strictly draws **fewer** figures at night. Under 198's
measured cost model (cost is per path object rasterized) that is free by construction; the only
new per-frame work is ~140 arithmetic calls. Measuring it would have re-measured the box's noise.

**Visual** — the first pass **FAILed**, and the agent was right: it measured my two frames as
**250px apart, all of it edge anti-aliasing, with not one pedestrian moving.** The cause was
**my own probe hygiene**, and it is a new law. Because I kept the `Math.random()` draw count
identical (good practice — it stops the stream shifting), both builds read the **same `r`** for
the same resident: HEAD hides `r<0.5`, PATCH hides `r < 0.505 - 0.63*buzz`. On quiet ground
(buzz 0) **those are the same set.** I had also aimed the camera at the CBD — the one place the
two builds *agree* (both keep the lively crowd). Re-aimed with `probes/shot-curfew.mjs` at the
hour they actually diverge (`dayT=0.04`, where HEAD has all 93 back out) and at the ground that
actually empties (the densest cluster of residents who go home, located, not guessed — 201).

Re-shot, **both seeds PASS, blind, with the A/B labels inverted between the seeds and flipped
against the previous round.** Both agents independently picked the patched build and named the
mechanism unprompted — *"movement is now correlated with light"*; *"the life stays where the
light is"*; *"a dozen-plus people idling on unlit parkland at 3am reads like a bug, not a
city."* Both located the **jogger** fix without being told which frame was which (*"cityA: none
running. cityB: yes, figures strung along the shore"*). Both confirmed it thins without dying:
*"it has thinned, not died"*, *"quieter, not lifeless."* No z-order tears, no floating figures,
no blown-out colour. (Both flagged the cable-car rope crossing the green frame — present in
*both* builds, and already banked as 203's `polish-tile` legibility job.)

**Verdict: DEEPENED.** The windows learned to keep an hour at 199; now the street does too.

## Iteration 211 — the buses come to the trains (2026-07-12) [Transport × Connect]

**Vector.** Transport × Connect. Rotation owed Transport (stalest: 203, and that was a REVERT, so
its last SHIP was 193), and its banked cue — the sub-pixel tramway — is explicitly a `polish-tile`
job, not a growth lap. Within the row, **Connect** was the cold cell that fits: its trick is that it
adds NO NEW OBJECT, it closes a gap between two that already exist. The last three ships were all
Deepen, so the kind rotates too.

**The gap, measured before designing a line (`probes/probe-interchange.mjs`).** `recount()` builds
ONE transit reach map from stations UNION bus stops — `reachFill(rTransit,2,(c,i)=>stations.has(i)||
(c.t===T.ROAD&&c.stop))` — so the *model* already asserts an integrated transit system. But the two
were sited by rules that had never heard of each other: stations are monorail stops with >=3
developed neighbours; bus stops were `hashCell(x,y,seedNum^0xB5B5)<0.05`, **a blind 5% coin on the
road grid**. They met only by chance, and the number is exactly that: **3 of 55 stations across 6
seeds had a shelter within a hex — 5%, the coin's own base rate.** Three seeds in six had **no
interchange at all**. This is the derived-field mirror of the label-tell: a *field* asserting a
network the geometry never built.

**Change.** A station now claims a nearby street as a feeder stop (`c.stop=2`; ordinary shelters
stay `1`, so every existing truthy reader — `rTransit`, `stepVehicle`, the draw — is untouched).
Three things share one definition rather than drifting:
- **`STOPR=2`** — the search radius is not a new number, it is `rTransit`'s own reach, so "close
  enough to feed the platform" and "close enough to count as served" are ONE predicate (112's law).
  `recount()` now reads `STOPR` too.
- **`stopOK(x,y,c)`** — the eligibility test was inline in the coin; the interchange needed the same
  question, and a second copy would have drifted. Factored once.
- The draw reads `c.stop===2` for a longer canopy + a two-plate sign totem (the bus route below, the
  line overhead); `stopCap` gives it 2..4 waiting instead of 1..3 (a train just unloaded — and this
  is deliberately NOT the city-wide bump iter 98's law forbids: it lands on the ~5 feeder stops a
  city has, not under every canopy). Tooltip: `Interchange` + `Feeds — Line N of M`, recomputed live
  off the same `m.sta` every other reader shares (105). `__find('interchange')` for the camera.

**Census.** PASS, and flat by construction — `c.stop` is a flag, not a tile; the rule draws no
`rng()` and moves no terrain. pop/roads/developed all **+0**, tile histogram empty. Correctly
vacuous: it proves only that the page did not throw. **The probes are the gate.**

**Probe — coverage (`probe-interchange.mjs`, 6 seeds).** Stations with a bus stop within `STOPR`:
**13/55 (24%) → 51/55 (93%)**, and 93% is **exactly the terrain CEILING** (51 of 55 stations have
*any* eligible road within 2 — the other 4 stand over park or unbuilt edge). Within 1 hex: 5% → 38%.
Two controls held: the ceiling is terrain-derived and **did not move** (56%/93% in both builds, so
nothing perturbed the world), and **163/163 blind-coin shelters still stand** — an interchange
PROMOTES a shelter or adds one, it never destroys one (recomputed independently, per 122).

**⚠ THE VISUAL AGENT WAS RIGHT AND THE FIRST DESIGN WAS WRONG — and the cause it named was still
wrong.** Seed 42 FAILed: *"no canopy, no posts, no totem; only three queue figures, clipped at the
waist."* It blamed a z-order tear. It was not one — but the SYMPTOM was real, and chasing it found a
**bug older than this vector**:
- **`probes/probe-ichvis.mjs`** (two z-orders: `occluded% = 1 - inkInPlace/inkOnTop`, per 203's
  `probe-gondz`) measured the naive nearest-wins rule at **58% mean occlusion, 17 of 42 rendering
  under 20px of ink**, against **24%** for the ordinary-shelter control. A station needs >=3 developed
  neighbours, so it stands in dense fabric **BY CONSTRUCTION** — 206's law, one domain over.
- **Single knockouts could not find the occluder** and said "nothing covers it" — flattening every
  cell in an 11x13 block, every entity array, the monorail and the cable car, one at a time, never
  gave the shelter back. That was an instrument failure, not a finding (see the law below).
- The real mechanism, found by replaying the draw's own geometry (`probes/probe-kerb.mjs`): the
  shelter is offset to a sidewalk side by `sd=((x+y)&1)?1:-1`, and on an E-W street that lands it
  either UP the screen (far kerb) or DOWN it (**near kerb — inside the hex in front, which is drawn
  later and laps over it**; `hexTile` draws at 1.02 precisely so it overlaps its neighbour). Measured
  over 3 seeds: a near-kerb shelter is invisible **32%** of the time against **9%** on the far kerb —
  **and that was already true of ORDINARY stops (29% vs 9%), for the artifact's whole life.** A third
  of the city's bus shelters have been drawing themselves under the pavement in front.

**Fix (two levers, both measured, both PREFERENCES not gates).**
- **The draw takes the kerb the viewer can SEE** (parity still picks the side where the street runs
  across the screen and neither kerb is buried). This fixes every shelter in the city, not just the
  new ones: the ink gap between the two kerb classes **closed from 28 to 9** (near 120→134, far
  148→143) and ordinary mean occlusion fell **24% → 18%**. Real, and partial — the kerb was never the
  whole cause.
- **`frontLoad(x,y)`** (new, beside `openFront`) — the siting rule prefers a street the city has not
  built in front of. `openFront` is a boolean on the row at dy=+1 and **misses a TOWER two rows in
  front**, which is tall enough to reach up the screen anyway (11 of 42 were invisible WITH
  `openFront` true). `frontLoad` weights two rows, first row double. Shipped as a **preference**
  (`frontLoad*20 + d*10 + hash`), never a gate — 206's hard gate starved the rule it was fixing, and
  here a gate would cost the coverage that IS the vector.

**Net (probe-ichvis, 4 seeds).** Interchange mean occlusion **58% → 36%**, fully-buried (>=86%)
**17 → 8**, ink shown **94 → 136** — against the ordinary control's 144, i.e. **near parity**. And
coverage never moved off its ceiling: **93%** throughout. The residual is terrain, not rule: a
platform downtown genuinely has towers around it.

**Visual.** Re-shot with `probes/shot-interchange.mjs` (locates a real interchange AND the station
that claimed it, and frames the PAIR — a frame with only the shelter in it would prove nothing).
Both seeds **PASS** on the re-read, and both agents *located* it unprompted: seed 7 — *"at the foot
of the monorail pillar, ~20px below the beam; canopy, two posts, 3-4 figures, and the gold plate with
a teal plate above it"*; seed 42 — *"directly below the station, ~1 hex south, exactly as intended"*,
the very cell that had read as *"legless torsos on a tower roof."* Whole-frame reads clean on both.
**Banked caveat:** at 5.2x the two-plate totem is hard to resolve among towers — it is ~2px.

**Verdict: SHIPPED.** Perf not owed (212 is the step-back); the change adds ~2 path objects at each
of ~5 interchanges and one `frontLoad` sweep per station per *tick*, not per frame.

## Iteration 212 — the twenty-second step-back finds a clean city and two agents crying wolf (2026-07-12) [holistic step-back]

**Vector** — holistic step-back (the 22nd; 207 was the 21st). No domain lap, no city change: `solvista.html` is
**byte-identical to iter 211**. One harness probe added (`probes/probe-monoz.mjs`).

**Census** — PASS, 0 page errors, every metric flat (baseline pinned on the same HEAD, so flat is the correct read).
Seasons alive and measured: `probe-season` FARM winter→dry-peak **87.0** (the expected ~88), SHOREPARK **51.9**,
PARK 23.3, QUAD 21.8 — 208/209's seasonal work holding — with the **ROAD control at 0.6**. GARDEN is still the one
mute tile (**5.4**), exactly as cue (p) says.

**Perf — the ARC, priced against the same two refs 202 and 207 used, so the trend is directly comparable.**

| REF | iters in arc | day | night |
| --- | --- | --- | --- |
| 207 `8e1c20d` | 4 (the lap: 208–211) | +2.7% | +0.6% |
| 177 `7e2ac2c` | 35 | **+8.7%** | +4.8% |
| 162 `5f01426` | 50 | **+10.5%** | **+7.3%** |

Absolute: day ~40.4ms · night ~46.5ms. The comparison that matters is against the *same* refs five laps ago:
vs 177, **202 read +7.5 → 207 +7.2 → 212 +8.7**; vs 162, **202 +8.6 → 207 +9.5 → 212 +10.5**. Ten laps on from
202, the arc has moved ~+1.2% day / ~+1.6% night — i.e. still **~+0.2%/shipped-lap and NOT accelerating**, which is
the rate the loop priced and accepted at 207. **No fix lap is owed.** 207's suspect stands and was not re-measured
(the arc is unchanged in character): the drift is **diffuse** — ~48% of the night frame is static terrain
re-rasterized every frame (`winBandR`/`prismS`/`hexTile`/`bandS`) — and 198's levers are all closed, so the only
real lever is drawing FEWER objects. Do not open a caching lap on that say-so.

**Visual — BOTH seeds FAILed, and BOTH FAILs were refuted by measurement. This is the locate-don't-judge law
paying for itself a third time.** Shot with `probes/shot-stepback.mjs` (3 lights × 2 calendars, clock frozen
in-page, every frame self-reporting its state).

- **The sun: a clean LOCATE.** Both agents, independently, on two seeds, put the golden-hour sun at
  **x≈0.39, y≈0.10** — identical to 207's two agents and to the shipped formula. Seed 42 nevertheless FAILed it:
  *"the disc sits in the cold part of the sky"* while all the warm gradient comes from the bottom/bottom-right.
  Every factual claim in that is **true**, and the verdict is still wrong — it is **201's law** (an objection to the
  ARTIFACT'S MODEL, not to a defect): iter 200 sited the sun high **on purpose**, because the plate is a hexagon and
  the `.placard` owns the low-left sky, so *the sun cannot go low*. Flipping or lowering it would put it behind the
  HUD. **Banked as cue (s), not fixed.**
- **The "z-order tear": MEASURED, REFUTED.** Seed 7 FAILed the whole city on a specific, confident claim — *"the
  elevated-rail/viaduct outlines pass IN FRONT of tower faces they should be behind, with no visible pylons for
  long spans."* Iter 202's agents said this of a "thin dark line" and **203 measured the GONDOLA** (`probe-gondz`:
  8.4–23.6% occluded — properly depth-sorted). But **nobody had ever measured the MONORAIL**, which is what this
  agent actually named. New `probes/probe-monoz.mjs` (203's method, refined: the viaduct is `prismS` **fills**, not
  strokes, so instead of replaying polylines it **defers the real draw** — suppress `drawMonoAt` during the row
  loop while recording its args *and the live camera matrix*, then re-invoke the untouched original after
  `render()`; identical code, identical camera, only the *when* changes):

  | fn | seed 42 | seed 7 | seed 1234 |
  | --- | --- | --- | --- |
  | `drawMonoAt` | 16.8% day / 19.8% night | 10.6% / 12.7% | 16.3% / 18.2% |
  | `drawGondAt` (control) | 16.1% / 25.1% | 2.1% / 1.5% | 5.0% / 5.2% |

  **The monorail is occluded 10.6–19.8% on every seed and light — it is genuinely depth-sorted.** The `drawGondAt`
  column is a **calibration control**: it reproduces 203's independent 8.4–23.6% with a different rig, so the rig
  is trustworthy. ⇒ **The artifact is innocent for the third time**, and the fault is what 203 already named:
  **LEGIBILITY, not z-order** (`polish-tile` backlog cue (a) — the whole tramway is sub-pixel at fit zoom). A
  hairline crossing the skyline with its supports below the pixel floor **reads as "on top"** to a human eye
  however correctly it is sorted. **Do not "fix" the z-order. There is nothing wrong with it.**
- **The seasons: a clean BLIND read.** The two day-lit calendar frames were copied to neutral `frameA`/`frameB`
  names **with the order flipped between seeds**, so a lazy guess fails. **Both agents named the season correctly**
  (42: A=winter/B=dry ✓; 7: A=dry/B=winter ✓). Seed 7 called them subtle — but per cue (p) that subtlety is
  **deliberate and must not be "fixed"**: `grass` and `lawn` share a base colour, and the lawns must stay greener
  than the hills at every point in the year.

**The two findings that SURVIVE — both raised UNPROMPTED and INDEPENDENTLY by both agents, on different seeds.
This is what a step-back is for, and neither is refuted:**
1. **THE NIGHT COAST IS A MAUVE VOID.** Seed 42: *"the sand at night flattens to a low-contrast mauve where detail
   dies."* Seed 7: *"the beach + east coastal strip at night collapses into a single flat mauve-grey mass with no
   beach/sand read."* Two agents, two seeds, same words. ⇒ **cue (q)**, a Water × Polish suspect.
2. **A BUILDING TYPE HAS BECOME WALLPAPER.** Seed 42: *"the red-roofed podium block repeats densely enough in the
   mid-city to become texture noise rather than buildings."* Seed 7: *"the striped high-rise tower is the single
   most repeated element and at this density it has become wallpaper."* ⇒ **cue (r)**, an Urban × Polish suspect —
   and it **converges with the header's own standing note** that Urban's only remaining Deepen/Polish targets are
   **facades** and the harbour apron. The facades are now independently indicted by two blind reads.

**Verdict — the city is SOUND: census clean, seasons alive, sun correct, transit properly depth-sorted, perf arc
flat in rate and accepted. Both agent FAILs were noise; both agent ASIDES were signal.** Note the shape of that,
because it is the lesson: the agents were **wrong about the two things they were confident enough to FAIL on**, and
**right about the two things they mentioned in passing** — a FAIL is a cue to measure, but the *unprompted aside*
in a whole-frame read is where the cumulative drift actually shows up. Read the asides.

**Verdict: HOLISTIC STEP-BACK — CLEAN BILL, no fix lap owed, two cues banked (q, r).**
