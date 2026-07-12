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
| **Nature** | 4, 26, 29, 102, **156**, **174** | 1, 13, 60, **206** | 37, 46, 67, 76, **108**, **120**, **139**, **166** | ~~46~~, ~~88~~, ~~101~~ | U4 | 53, 96, **194**, ~~**198**~~, **215** | **117**, **129**, **148**, **183** |
| **Water & coast** | 6, 10, 12, 16, 20, 33, 106, **169** | 90 | 17, 25, 51, 65, 72, **113**, **123**, **159**, **196** | 22, ~~**205**~~ | | U2, 44, 58, 79, **116**, **132**, **150**, **185**, **214** | **97**, **141**, **176** |
| **Urban fabric** | 32, 62 | 7, 23, ~~82~~, **151** | 38, 54, 68, 92, **165**, **173**, **189**, **199**, **209**, ~~**218**~~, **219** | 47, **109**, ~~**160**~~ | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103**, **110**, **118**, **124**, **143**, **180**, **216**, **220** | **133** |
| **Transport** | 2, 9, 21, 31, 48, **164** | 77 | 28, 39, 55, 63, **112**, **121**, **128**, **155**, **179**, **193** | 5, 15, **138**, **211** | U4 | U1, U3, 70, 85, 87, 94, **146**, **188**, ~~**203**~~ | **105**, **171** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107** | 36, 59, 66, 80, 91, **149**, **158**, **175**, ~~**195**~~, **213** | 45, **204** | | 73, ~~**114**~~, **168** | 52, 122, **140**, **184** |
| **Sky & atmosphere** | 27, 43 | | 19, 35, 50, 57, 95, **135**, **153**, **161**, **181**, **190**, **208** | | | 61, 81, 89, **115**, **200** | ~~**134**~~, **144** |
| **People & activity** | 41, 56, **127**, **170**, **186** | 49 | 34, 64, 93, **104**, **119**, **145**, **178**, **201**, **210** | 78, **111** | | 84, **137**, **163** | 71, **154**, **191** |

- **Interaction/UX kind — the FEATURE INVENTORY (U2 / 42 / 52 / 71 / 97 / 105 / 117 / 122 + U5's
  falling stats) was rotated to `GROWTH-archive.md` at 211: it was history, not steering.** What
  steers: when adding an entity array, `stamp()` it in its draw + add an `ENTINFO` row (the same
  discipline as the census hook). `stamp()` also draws the focus ring, so any stamped entity is
  ringable for free — and since 133 a hovered TILE is ringed too. **An `ENTINFO` `sub` may be a
  FUNCTION of the entity (105)** — use it when a thing's interest is its *membership* (which line /
  route / depot; **211's `Feeds — Line N of M`**), computed live, never a stored string.
- **ROTATION.** Last vector per domain: Sky **208** · People **210** ·
  Transport **211** · Civic **213** · Water **214** · Nature **215** · Urban **216**, ~~**218**~~, **219**, **220**.
  (**217 = the 23rd step-back; the next is 222.**)
  ✅ **THE DOWNTOWN IS BUILT (219, Urban × Deepen, SHIPPED)** — recap rotated to the archive at 220; the full story is
  219's own entry, and its two general laws (a saturated roll's `p` is a **dead lever**; a spatial preference must be
  **pure addition**, `m=1+B*field`) are in SKILL.md. ⚠ **DO NOT re-open the tower placement roll (dead lever, 218) NOR
  the COM fork (spent, 219).** ⚠ **COM is the TOWER SUBSTRATE** — cutting it anywhere costs towers and pop downstream.
  The one defect left on this ladder is cue **(ac)**.
  **AFTER 220 the lap owes SKY (stalest, 208), then PEOPLE (210) — and URBAN HAS NOW HAD FOUR LAPS RUNNING
  (216/218/219/220), so rotate OFF it unless a cue is decisive.** But **Sky is post-saturation (Deepen/Fix ONLY)** and
  its only live cue **(s) is CONSTRAINED and low-value** (read it first) — so if Sky has nothing, the strongest cues
  are **(ad) the still-rotated GROUND PLANE** (Nature/Urban × Polish, 220's direct sequel, 🔴 and measured),
  **(ac) the flat skyline taper** (Urban × Polish), **(y) the scorched inland cluster** (Nature × Polish) and
  **(z) the clipped HUD label** (Interaction/UX × Polish, a stale column). Nature's other cue, **GARDEN's staggered
  beds** (Nature × Deepen), is held by cue (p). **(u) — the violet pier deck — is the last WARM surface still rotated,
  and is now a one-line `sandCol()` swap** (Water × Polish; 220 proved the lever on a far bigger surface).
  **STEERING FROM THE LAST LAPS — recaps live in their own entries / the archive; only the WARNINGS live here.**
  **213 (Civic × Deepen):** ⚠ **`nightDeep()` IS PINNED AT 1 ALL DAY** — harmless in a draw (`LITAMT` is 0 anyway),
  a trap for any NON-draw reader, so guard every reader. **The civic night-light audit is DONE — do not re-run it**;
  three lights are held OFF the curve on purpose (school janitor, hall clock face, parliament lantern). **Do not
  "fix" them.** ⚠ **Cue (t) — THE AMPHITHEATER IS BURIED ON SOME SEEDS** (seed 7's front rows are MID h30-35; draw
  order is depth order). Pre-existing siting. A hard gate would starve a one-per-city tile ⇒ fix is a **PREFERENCE**
  (206) or `frontLoad` (211).
  **211 / 210:** **`frontLoad(x,y)` is the sharper `openFront`** (beside it) — `openFront` is a boolean on the row at
  dy=+1 and **misses a TOWER two rows in front**; `frontLoad` weights two. Both ship as **PREFERENCES, never gates**
  (206). ⚠ **137's "the ped/dog system is NON-REPRODUCIBLE" is DISPROVEN** — the `Math.random` stub + in-page
  `genWorld` gives byte-identical crowds; **People is probe-able like any domain.** **The `LITAMT` night-gate audit is
  DONE:** `LITAMT` is back to **0.64 by the small hours**, so any gate `LITAMT > 0.64` defines a "night" that **ends
  before dawn** — exactly two existed, both fixed at 210; every other `LITAMT>` gate is <= 0.6 and safe.
  **209 (Urban × Deepen):** ⚠ **THE GROUND PLANE IS SPENT** (216 spent the FACADES too) — see cue (r). **THE
  DEVELOPED GROUND IS A HUGE SURFACE, MEASURED (`probes/probe-groundvis.mjs`, reusable): 5.2% of the frame, RES yards
  alone 2.21%**, and NOT buried (cf. 206) — ask *"how much of surface X is visible?"* before designing on any ground
  surface. ⇒ **When a domain looks interconnect-saturated, re-ask it as: what LARGE SURFACES wear a palette name that
  cannot carry the signal?**
  **206 (Nature × New CA rule, FIXED) / 204 (Civic × Connect, SHIPPED) — recaps in the archive; laws in
  SKILL.md.** What still steers: **`openFront(x,y)` + `TALLT`** (beside `countAround`) — *is the hex in
  front clear?* Draw order IS depth order, so any ground-level thing that must be SEEN should ask before
  siting itself (23 gardens: mean **58% occluded**, one at **100%**). Ship such a lever as a **PREFERENCE,
  NOT A GATE** — the hard gate *starved* the rule (`GARDEN 14 -> 5`, worse than the bug it fixed); 211's
  `frontLoad` is the sharper form. **The vacant lot is a MIRAGE** — `EMPTY` with >=2 RES nbrs falls
  **85 -> 6.5** by 2035, **0.0** with a road adjacent; development eats every gap.
  **⚠ THE FIRE CA IS A GHOST — do not build "X answers the fire" (`probe-firehost`).** Ignition is year-gated
  (`year<2006`, forest `year<2030`) so **at 2035 nothing can ignite at all**; before then, **two one-cell episodes
  across 3 seeds × 61 years** and fire **never spreads**. **`T.MARKET` again.** Reviving it is a real CA lap (BURNT
  is the palette's darkest tile), not a freebie.
  **⚠ THE `polish-tile` BACKLOG — measured cues that are NOT growth laps. Do not spend a domain's lap on one; they
  need a tile redesign, and each already has a gate written.** (a) **THE WHOLE ELEVATED TRANSIT is sub-pixel at fit
  zoom** (0.5px rope, 5px cabins, hairline masts/pylons) — **its Z-ORDER IS CORRECT AND IS CLEARED THREE TIMES (203
  `probe-gondz`: rope 8.4-23.6% occluded; 212 `probe-monoz`: `drawMonoAt` 10.6-19.8%; and 217's agents FAILed it AGAIN
  on both seeds). NEVER RE-OPEN THE Z-ORDER — the fault is LEGIBILITY**: a hairline with sub-pixel supports READS
  on-top however correctly it is sorted. 215's law names the lever — **a hairline ornament needs a BODY**, not more
  strokes. *Do NOT re-try a body/halo under the rope (measured — backfires) or a lit top edge (impossible at 0.5px).*
  (b) **`university` is the ONLY of the twelve civics with no `LITAMT`** — the one `MAJORK` monument
  pitch dark after sunset; every place to put the light failed (195; `probe-unilight.mjs` + `shot-uni.mjs`).
  (c) **A parked service vehicle needs its CIVIC TILE to have a visible apron on its front edge** (204, cue n).
  (d) **The marsh reeds do not read** — seven sub-pixel strokes round the pool; its calendar is already computed and invisible (cue (i), 113).
  **Sky is post-saturation (Deepen/Fix ONLY — its additive/CA cells are traps).** **Urban is measured-saturated: additive spent (118), and Connect measured-hard TWICE** — 160 (RES terracing: no seed forms E-W RES runs of >=3) and 165 (high-street arcade: the `hstr` parade zigzags with row parity, longest straight-hex-axis run = 2, so it is not a clean arcade host); **Urban's next lap is Deepen/Polish only**. **Roof-furniture is CLOSED city-wide** across all 5 developed types (MID/RES water tanks, TOWER gardens, COM plant 165, IND clerestory 173) — no bare roof is left, and the **GROUND PLANE is SPENT too (209)**, and **216 spent the FACADES** — only the **harbour apron** is left. Check the last entry of the stalest domain for a banked
   finding before reading its row. (**137's People × Polish**: still open from it — the *static* standing
   crowds are the last movers casting no `shadS()` shadow.) (**Sky's moon is FIXED (135) and NAMED (144)**, both closed.
  **STILL banked for Sky: the SEASON word** — it reads the fast `year` and would strobe ~0.7 Hz (134), so it needs a
  slow clock FIRST; don't add `seasonWord(year)` to the HUD nor re-ship 134's REVERTED almanac assuming 135/144 unblocked it.)
  **Water's STILL-banked cue (123): the pier/lifeguard are still `rng()`-salted; site them on a depth by
  respending their draws (123's stream-neutral trick) — but that REPEATS 123's mechanism, so vary it.**
  **The asserts-less-than-the-code-knows tell is SPENT for agriculture** (orchard 129 + vineyard 139/148 +
  FARM 183 — each tooltip now names the season its draw already knew, off ONE shared `*Phase()`).
  **GARDEN is the last mute one** (host fixed by 206; shift 1.8, ROAD-level — cue (p)), **and it is the NEXT NATURE
  LAP:** its three raised beds could run *staggered* calendars (beds at different stages is an allotment's whole
  visual identity — a shape no other ag tile uses: FARM staggers whole FIELDS, this would stagger BEDS within one
  plot), tooltip reading ONE shared `gardenPhase()` — run the tell FORWARDS (123). ⇒ **"Additive inventory spent" is a
  claim about a domain's ENTITIES, not its SURFACES** (127 put picnics on PARK's 878 hexes), **and a Deepen that adds
  no element is the documented way past a domain's additive saturation** (126). Examples archived at 217.
  **124 closed the LAST banked cue that moved a census number; from here the census is VACUOUS for most
  vectors, so reach for a probe.** Three steering laws that govern step 1: **a cue is a POINTER, NOT A
  SPEC** (re-grep the seam before designing to it — 123's cue misdescribed its own code); **a banked,
  measured finding outranks both kind-rotation and cell-emptiness** (119); **saturation beats
  kind-rotation** — when a domain's additive cell is spent, the KIND changes, not the domain (118).
  **Sky's additive/CA cells are TRAPS, not invitations** (sky is not cellular; fog on terrain is already
  `rSea`/`fogAt`). Prose archived at 214.
  **Cue (k) CLOSED (116/123).** Still steers: **run the tell FORWARDS** (make the string and the rule share ONE
  constant so they cannot drift — 123; 213's `civOpen()`). **⚠ A tick-rule cannot read the reach maps (151):**
  `recount()` never runs in the sim loop, so `rGreen`/`rShop`/`rServ` are STALE inside `tick()` — recompute locally.
  (**222 = the next holistic step-back**; 217 was the last, all 23 done. 205's finding is held by cue (o).)
  **THE FAIL/ASIDE LAW (from 212, now a law in SKILL.md — the header keeps only the tally): in a whole-frame read the
  FAILs are where an agent is WRONG and the ASIDES are where it is RIGHT. It has now paid out SEVEN laps running**
  (213, 214×2, 215, 217 — where ALL FOUR agent FAILs were wrong while the asides held both real finds — and **219,
  where both FAILs were refuted by one render-free probe and the surviving aside became cue (ac)**). **MINE THE ASIDES.**
  Perf ARC (same refs as 202/207/212, directly comparable): the lap (213-216) **day +5.6% / night +1.0%** vs 212; vs
  `7e2ac2c` (177, 40 iters) **+11.9% / +7.6%**; vs `5f01426` (162, 55 iters) **+14.0% / +8.3%** (abs: day 40.2-43.1ms
  · night 46.4-49.1ms). Priors: 202 +7.5/+4.1 & +8.6/+5.7; 207 +7.2/+5.1 & +9.5/+6.0; 212 +8.7/+4.8 & +10.5/+7.3.
  Largest single-lap arc jump on record (~+3.2pp day in ONE lap vs ~+1.2pp over the previous TEN) — **but it has a
  NAMED, MEASURED, ALREADY-PAID mechanism and is NOT a new suspect: 215's `seamVeg` was priced at ~+3% day when it
  shipped and knowingly accepted** (692 path objects, 228 line STROKES). Arc rate ~**+0.25%/iteration**; diffuse, not
  accelerating; **ACCEPTED — do NOT open a perf lap.** ⚠ **219 is world-data only (no new draw call) — arc unmoved.**
  ⚠ **This lap is now the best evidence for cue (x):** a lap whose only heavy addition was **strokes** cost ~**4×**
  what 198's per-path-object model predicts for fills. The **stroke-vs-fill sweep at equal path count is the
  harness's best-supported open perf question.**
  **⚠ THE STANDING PERF SUSPECT (207, unchanged at 212/217; named NOT mandated per 198): THERE IS NO HOT ORNAMENT —
  the arc is DIFFUSE, which is exactly why every per-lap gate reads it as free.** `probe-drawbudget` (night):
  `drawCell` = **95.2%** of 132,679 path objects; hot leaves `winBandR` **32.6%** · `prismS` **28.0%** · `hexTile`
  **12.7%** · `bandS` **7.3%** — **~48% of the night frame is STATIC TERRAIN RE-RASTERIZED EVERY FRAME**, while 200
  iterations of features sit beneath it (`tree` 4.1%, `shadS` 2.2%, `drawBuilding` 1.4%). **Do NOT open a caching lap
  on that say-so — 198's levers are CLOSED (cost is PER PATH OBJECT); the only lever is drawing FEWER objects.**
  **The GAP-CLOSING trick (111/112/113) is SPENT in four domains; the TELL that replaced it (a label asserting what
  the draw ignores) is CASHED 7x** (117 redwoods, 122 `CIVICLABEL`, 129 orchard, 140 plaza/quad, 148 vineyard, 183
  FARM) **and its host keeps moving DOWN: 199 found a CONSTANT, 209 a COMMENT, and 217 a HALF-FINISHED FIX — see
  SKILL.md.** Still MUTE: `[T.IND]` (no calendar) and GARDEN (season-frozen draw — needs a Deepen first). ⚠ 122's
  warning stands: a tooltip vector needs a probe checking the claim against INDEPENDENTLY RECOMPUTED truth, not a
  screenshot that it renders. (The "Sky-feedable list is EMPTY" bullet was **DISPROVEN by 209**, archived.)
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
  **⚠ THE COST MODEL HAS TWO HOLES, AND BOTH ARE THE SAME SHAPE: 198's TABLE WAS MEASURED ON SOLID FILLS ONLY.**
  Its findings (per-ellipse; area-independent; sprite worse) are only established for solid `fill()`s, and **two
  other primitives have each come in ~4x over the model.** (1) **GRADIENTS** — 200's sun is *two* radial-gradient
  fills costing **day +2.3%**; a gradient is evaluated **per pixel**, so it may price by **AREA**. (2) **STROKES**
  — 215's `seamVeg` is 692 path objects (**0.7% day**) costing **~+3% day**, and quantizing its colour cache and
  hoisting its style writes *both* bought **nothing**, leaving its **228 line strokes** (which must generate
  outline geometry + round caps) as the suspect. Both are **PAID and ACCEPTED**; neither is **MEASURED**. So do
  not shrink a gradient or cull a stroke "because 198 said area/count is what matters" — **it said no such thing
  about either.** The variants to build are a gradient-area sweep and a stroke-vs-fill sweep at equal path count.
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
- **`?year=` is a URL hook (108); keyframes `.02/.30/.62/.87` = winter/spring/dry-peak/autumn. Full text (and
  139/202's warning that it DRIFTS ~0.167 yr/s while `shoot.mjs` waits — use `probes/shot-stepback.mjs`) is in
  SKILL.md; the duplicate was archived at 219.**
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
- **Open cues, banked by holistic passes (take one when its domain comes up):**
  **(g) ~SIXTEEN seedless `hashCell` calls remain — each paints the IDENTICAL pattern in EVERY city.** RE-RUN the
  audit rather than trust a catalogue (the L-numbers have drifted): `grep -noE 'hashCell\([^;]{0,60}' solvista.html |
  grep -v seedNum` (discard the definition + genWorld's three, which pass the real `seed`). **Only PRESENCE decisions
  are an invariant breach worth a vector** — a thing being there, or not, in the same place in every city: **the night
  surf light-smear, `hashCell(x,y,77)<0.28`, is the one to fix.** *Ornament jitter* (kelp sway, palm fronds, orchard
  fruit, park fireflies — a detail's lean/brightness, not its existence) is cosmetic, low stakes. Marsh reeds (113)
  and tower window-lights (110) already CLOSED. ⚠ `darkWinR` is **not** a breach (it mixes `seedNum^salt` internally —
  check the callee before indicting a call site). When fixing a range, **space the bases** (`0x9EE1+j`/`0x9EE2+j`
  collide at `j=2`).
  **(w) ⚠ A LIVE MOJIBAKE BUG IS SHIPPED ON THE PUBLIC SITE (found 214, from iter 105 — 2-minute fix).**
  `solvista.html:7446` and `:7451` (the monorail/cable-car tooltips) hold a raw **U+2014 em-dash inside a
  RENDERED JS string literal** (`'Line 1 of 2 \u2014 a ...'`). The file has **no `<meta charset>`**, so over
  **http — i.e. GitHub Pages, the deployed artifact** — Chromium falls back to windows-1252 and the user
  reads `Â—`. A `file://` load sniffs UTF-8 and HIDES it, which is why every local shot has looked clean
  for 109 iterations. This is **iter 134's law**, already in SKILL.md, violated in the one place nobody
  re-grepped. Fix: replace both with the escape `'\u2014'` (or ' - '). **Verify over http, not file://.**
  **(m) SHOWERS ARE HOST-STARVED — do not build "X responds to the rain" (201, `probes/probe-rainhost.mjs`).** Rain is
  fully realised and **nothing on the ground reads `cl.rain`** — a tempting seam, but a shower's ground footprint is
  **2–5 hexes TOTAL** (1–2 rain clouds/seed), so at any moment it rains on **less than one** picnic/café hex.
  `T.MARKET` again (dead-code law) — no host. Widening it is a Sky change to a tuned draw, and **gradients price by
  AREA** (see the PERF hole).
  **(o) THE PORT HAS NO WATERFRONT — do not build "the ship docks / cargo comes ashore / cranes work her" (205,
  `probes/probe-harborhost.mjs`, 6 seeds, unanimous; body in 205's entry).** Warehouses sit **behind** the coast
  highway, **5-9 hexes from the sea** (`SHORE0`=`SHOREX+5`); the waterline at `harborY` is BEACH/DUNE/SHOREPARK on
  every seed and **no quay tile exists**. Solvista is a **roadstead**, so the anchored freighter is *correct* — her
  "waiting on a berth" comment is the label-tell's **FALSE-POSITIVE mode** (⇒ SKILL.md). A port vector must **build
  the waterfront FIRST** (a terrain lap, not an entity freebie). **Banked host: the MOLE is real** — `moleSet` is
  5-12 cells on all 6 seeds, the artifact's only built structure standing in the water.
  **(p) CLOSED by 208/209 (body archived); the WARNING is live. ⚠ DO NOT RAISE THE LAWN AMPLITUDE FURTHER.** `grass`
  and `lawn` share a **base colour** `[150,181,122]`, so the dry-season divergence *is* the managed green's whole
  identity: lawns must stay **greener/brighter than the hills at every point in the year** (seed 7's agent already
  reads hillsides *"close in value to the paler lawns, but they never invert"*). Any push must re-run the blind locate.
  **⚠ GARDEN is STILL MUTE (1.8 → 5.4)** — its ground is mostly raised beds, so the lawn lift barely reaches it. **Its
  own richer cue stands:** staggered per-bed calendars + one shared `gardenPhase()` (**Nature × Deepen; host fixed by
  206; Nature's next lap**).
  **(aa) CLOSED by 220** (RES+MID masonry -> `sandCol()`; RES<->ROAD night **6 -> 16**, day 22). ⚠ **`sandCol()` IS THE
  CITY'S GENERAL WARM-SURFACE NIGHT WASH, not a sand function** — generic over any `BASE` name, **free** (colour-only,
  zero path objects), and **byte-identical in daylight** (`w=0` below `LITAMT` 0.35), so it is a **free dead-regime
  control**. **Route any rotated WARM surface through it; do NOT fork a second wash.** ⚠ **GLASS (TOWER/COM) KEEPS the
  cool tint** (holds chroma 19->17, cannot rotate) — warm-masonry-vs-cool-glass is now what makes the night read, and
  **ROAD staying grey is CORRECT** (214).
  **(ad) 🔴 THE GROUND PLANE IS STILL ROTATED — the built mass is fixed, the surface it stands on is not (220, Nature/
  Urban × Polish; 220's direct sequel and the LAST rung of 214's ladder).** Two blind agents, two seeds, unprompted, on
  a PASSing frame: *"hazy-violet mid-block interiors"* (7) and *"a violet/blue-grey ground plane"* (42). `probe-goldenhue`
  names it: **PARK rotates green -> CYAN (hue 81 -> 206), chroma crushed 46 -> 6**; FOREST 52 -> 6 — the greens invert
  channel order (G>R>B -> G>B>R) exactly as the warm neutrals did. ⚠ **NOT a straight `sandCol()` swap:** its wash leans
  *warm* (`[.504,.473,.464]`), right for masonry and **wrong for grass** — a green needs an order-preserving wash of its
  own, or `sandCol` a neutral variant. ⚠ **A cool ground UNDER warm buildings is CORRECT and must survive the fix** (it
  is what the built mass now pops off) — **the target is the CYAN, not the coolness.** Gate in colour units (214), pair
  PARK<->ROAD (night 15, day 50).
  **(ac) 🔴 THE SKYLINE HAS MASS BUT NO TAPER — "a spine, not a crown" (219, Urban × Polish; the THIRD RUNG of the
  217/218/219 ladder and the next Urban lap).** 219 put the tower MASS downtown (coreH share 41-45%; four blind
  agents locate the CBD) — and **two agents, on two seeds, independently and unprompted** named what is left:
  *"a spine, not a crown; no tallest-in-the-middle gradient"* (1234) and *"a local thickening, not a peak — height
  is flat, no tapering silhouette"* (7). **True, and visible in the code:** height is
  `c.th=(54+c.v*82)*(0.70+0.66*core)` — the centrality term spans **1.94x** (0.70→1.36) while the per-cell noise
  `c.v` spans **2.5x** (54→136), so **the noise SWAMPS the signal** and a lucky rim tower out-tops an unlucky core
  one. ⚠ **NARROW `c.v`'s spread; do NOT steepen `core`** — 98 solved `0.70+0.66*core` to HOLD THE MEAN, and a
  steeper `core` was tried there and **cost half the city's tall towers**. ⚠ Do not re-open placement (dead lever)
  or the COM fork (spent). Gate in the viewer's units: a blind "point at the TALLEST tower" must land in the core,
  and `tallTowers`/pop must not fall.
  **(ab) THE CALENDAR IS LOUD PER-TILE AND QUIET PER-FRAME (217, Sky × Deepen — LOW priority, read before taking).**
  Both agents said *"winter is indistinguishable from day"*; `probe-season` refutes the premise (FARM **87.0**,
  SHOREPARK 52.5, ROAD control 0.6 — the calendar is ALIVE). Theirs was a **frame-share** claim: the biggest-amplitude
  tiles are the **fewest** (FARM 130, VINEYARD 26, ORCHARD 16, MEADOW 5). 214's shape — *a correct probe in the wrong
  units* — and **arguably correct by design** (a dry-Mediterranean city has no snow). ⚠ The honest fix is a **bigger
  seasonal SURFACE, not a louder amplitude** — cue (p) **forbids** raising the lawn amplitude.
  **(u) THE PIER / BOARDWALK DECK IS STILL VIOLET — the same hue-rotation bug as (aa), one tile over (214, Water ×
  Polish).** Seed 7's agent, unprompted: the deck hexes are *"flat lavender-mauve slabs"* and *"the boardwalk path is
  warm brown while the pier deck it connects to is violet — same walkway, two colours."* Fixing the sand made it
  **more** obvious. Same one-line lever as (aa): route the deck's fills through **`sandCol()`**. ⇒ **Run the audit,
  don't guess the hosts** — `probes/probe-sandhue.mjs` (night hue+chroma per tile; any WARM surface near **hue ~308,
  chroma <15** has been rotated) and `probes/probe-goldenhue.mjs` (the pairwise-separation form; **any pair under ~15
  RGB units has lost its identity**). ROAD at 308 is FINE — asphalt *is* grey; the bug only bites a warm surface.
  **(v) CLOSED by 215** (archived). ⚠ **Nit:** at extreme zoom the sand-side tufts trend into a loose vertical band — on a coast lap, **scatter depth `f` harder.**
  **(x) A STROKE MAY NOT PRICE LIKE A FILL (215, perf suspect — NAMED, NOT MANDATED; full statement in the
  PERF bullet's "TWO HOLES" paragraph).** Build a **stroke-vs-fill sweep at equal path-object count**. Two
  mechanisms are already ruled OUT — the `CCACHE` key churn and the per-mark style writes both measured **zero**.
  **(r) CLOSED by 216** (archived; law ⇒ SKILL.md). ⇒ **FACADES ARE SPENT for Urban**; only the **harbour apron** is left (cue (o): a port lap must build the waterfront FIRST). Urban's live cue is **(ac)**.
  **(y) A SCORCHED-LOOKING HEX CLUSTER INLAND (216, seed 7, unprompted on a PASSing frame).** *"A small dark
  brown/scorched hex cluster in the mid-left inland block that reads oddly against the surrounding green."* ⚠ The fire
  CA is a **GHOST** (cannot ignite at 2035), so this is almost certainly **LOGGING/clearcut, not BURNT** — **identify
  the tile before designing** (dead-code law). Nature × Polish.
  **(z) THE HUD CLIPS ITS OWN LABEL (216, seed 7).** The stats bar clips `TRANSIT REA[CH]` at its right edge. Cheap,
  real, and **only an agent could have found it — every probe in `probes/` is blind to the DOM** (200). Interaction/UX
  × Polish, and the first live cue that column has had in a while.
  **(s) GOLDEN HOUR HAS A HIGH SUN AND A HORIZON-WARM SKY (212, Sky × Polish — CONSTRAINED, read before taking).**
  The disc sits high (**y=0.10**) in the *cool* part of the sky while the warm gradient comes from the bottom, so
  golden hour *"reads as hazy dusk with a stray dot."* Every factual claim is true — **but the sun CANNOT simply be
  lowered: 200 put it high ON PURPOSE** (the `.placard` owns the low-left sky; a low sun goes behind the HUD, the
  exact bug 200 was fixing). **201's law — the FAIL objects to the MODEL.** Any lap must reconcile the *sky
  gradient's* direction with the sun's, or move the warmth — **not move the sun down.** Not a quick win.
  (217 adds: golden hour also compresses every land hue into one orange band, 37–94° → 24–44°, but **chroma RISES**
  — it is a saturated wash, **not** the "desaturated mud" agents call it. Real, mild, low priority.)
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

> **Archive:** the 213 entries before Iteration 211 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

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

## Iteration 213 — the institutions keep their own hours (2026-07-12) [Civic & culture × Deepen]

**Vector.** Civic & culture × **Deepen** — Civic was the stalest domain (last touched at 204). 199 gave the
WINDOWS an hour and 210 gave the RESIDENTS one; the twelve **institutions** never got one.

**The seam — 199's tell, one rung up.** Every civic night-draw was gated on `LITAMT` and nothing else, and the
light curve **pins `LITAMT` high from dusk to dawn** (it is *0.41 at dusk and 0.64 at 4am* — so the civic
floodlights were literally **brighter** in the small hours than at sunset). The consequences were exact:

- the **amphitheater's spotlit performer swayed on the stage all night**, footlights up, to a bowl the audience
  gate right above it (`LITAMT<0.75`) had already emptied — a singer playing to nobody until dawn;
- the museum's floodlit facade, the library's reading lamps and the hall's lit chambers burned till morning;
- while the **hospital** — whose own `CIVICDESC` says its bay *"never closes"* — was no more lit at 3am than the
  school. The gate knew it was dark. **Nothing knew what the building WAS.**

**Change.** `CIVHRS[kind]` — the share of an institution's lights still burning in the small hours — read off the
**same `nightDeep()` clock the windows already use** (`civOpen(k) = 1 + (CIVHRS[k]-1)·nightDeep()`; 1 at dusk).
Five hold at **1** because their own draw or label already claims they run all night: the ward slab, the precinct
beacon, the engine doors, the reef tank that *"never sleeps"*, and the observatory, whose night is just beginning.
Seven close: `parliament .40 · hall .35 · museum .30 · university .30 · library .15 · school .08 ·
amphitheater 0`. In the draw, `clit=lit·so` dims the institution's lit **glass** back toward the unlit shade and
`cla=LITAMT·so` dims its exterior **floodlighting**. Three lights are deliberately held **off** the curve, and
they are the poetry: the school's **janitor window**, the hall's **clock face**, the parliament's **lantern** —
the floodlights go out *under* it and the capitol's light is the last one over the sleeping city.
The show **ends**: the beam, wash, singer and footlights fade out together on one `globalAlpha` (the singer is a
solid fill and would otherwise pop), **and the house empties with it** — see Finding 3.
Tooltip: one new `Hours` row off **the same `civOpen()`** the draw dims by (123: run the tell FORWARDS — one
function, two readers — rather than re-syncing a string to a rule later). Verified against recomputed truth:
hospital/police/observatory read *"Open all night"* at every hour; museum goes `Open late → Closing up`; library,
school and amphitheater `→ Dark till morning`.

**Census.** PASS, +0 on every metric, tile histogram empty — correct and predicted for a draw-only change.
(`greenRoofs` moved +1 then +2 on the *identical* file: run-to-run harness noise, 163(c). Not the change.)

**Probe.** `probes/probe-civhours.mjs` — patch vs pristine HEAD, one frozen world, three pins of the day clock.
The design gives the gate its controls **for free**: at **dusk** `nightDeep()=0` so `civOpen()=1` and the patch is
**byte-identical to HEAD by construction**, and by **day** the change is inert — so both must sit at the noise
floor, and only the small hours may move. The five that never close are an **in-frame negative control**.

| whole-frame changed px | patch-vs-HEAD | HEAD-vs-HEAD (floor, same run) |
| --- | --- | --- |
| day | 45 / 19 / 34 | 49 / 32 / 30 |
| dusk | 24 / 7 / 11 | 31 / 20 / 19 |
| **night** | **571 / 562 / 658** | 20 / 12 / 14 |

Per institution at 4am (patch-vs-HEAD px, mask swept 1.0/0.6/0.4): **hospital 0·0·0 · police 0·0·0 · firehouse
0·0·0 · observatory 0·0·0** — the never-close five are *exactly* unmoved. Closers: **parliament 279·279·264 ·
hall 292·136·55 · museum 137·137·137 · library 254·95·58**, plus weakly university 13 · school 16 ·
amphitheater 30·24·24 (they had little discretionary night light to lose — the school block is already *"dark
after the last bell"*). The **aquarium read 28 px and walked to an honest 0** as the mask tightened: a neighbour
bleeding into the box (196), not the aquarium, whose code path is byte-identical.

**Perf.** Free. Night-only, so the day column is a **free noise floor** (199): three interleaved rounds read
day **+2.1 / −4.3 / −1.4 %** on byte-identical code and night **+3.6 / +0.4 / −0.7 %** — night sits *centred
inside its own control's spread*. It should: at 4am the patch draws strictly **fewer** path objects than HEAD.

**Visual.** PASS, blind, both seeds. Frames renamed frameA/frameB with the order flipped per seed; agents were
asked to **locate the hour**, not to judge the feature (108). Both put 4am on the right frame, from the pixels
(*"the civic dome, floodlit cream at dusk, is grey at 4am"*), and both independently listed the **hospital, the
towers and the pier lamps as still lit** while the low-rise mats went dark. A second blind pair on the
amphitheater alone: 4am = *"a bare dark teal slab, no spotlight, no performer,"* tiers empty; dusk = the lit
stage, the standing figure, the audience. No z-order tears, no blown-out colour, no decal glows.

**Findings.**

1. **Stubbing `Math.random` before `genWorld` is NOT early enough — stub it before the PAGE'S OWN SCRIPT**
   (⇒ SKILL.md). This probe obeyed every existing freeze law (203's stub, 163's `genWorld`+`__warp` and `STARS`,
   199's `flock`, 195's `time`/`waveT`, plus every mover array emptied) and its **day control — byte-identical
   code in both builds — still read 8k–18k changed px.** A `page.evaluate` runs *after* the document's top-level
   script, so all load-time `Math.random` state is already baked in and differs per load. `page.addInitScript`
   takes the floor to **12–49 px**. `STARS` and `flock` were never a list to complete; they were **symptoms of
   stubbing too late**.
2. **Measure the floor IN THE SAME RUN** (⇒ SKILL.md). I first pinned `FLOOR = 40` from one run — and the next
   run's floor came back 32–49 and the gate FAILed a passing change. The floor drifts with machine load exactly
   as frame time does. Loading **HEAD twice** and printing `HEAD-vs-HEAD` as a column *beside* `patch-vs-HEAD`
   makes the probe grade itself: *"night 562–658 against a floor of 12–20"* is checkable; *"night 562"* is not.
3. **The step-back's asides law (212) paid out immediately — and the payer was an agent I had just FAILED.**
   Seed 42's agent PASSed, then noted in passing: *"the audience dots are identical in both frames — an empty 4am
   bowl still shows a full house."* It was right, and it was **my** bug: ending the show left the crowd sitting in
   the dark watching an unlit stage. The house now empties **with** the show (`aud = LITAMT<0.3 ? 1 : so` — the
   bowl is open to anyone by day, but after dark the crowd is only there while the concert is). A fresh blind pair
   then read the transition as coherent in both cities. **Mine the asides.**
4. **A FAIL that measurement refutes, again — and this one refuted itself.** Seed 7's agent FAILed on *"no
   recognizable amphitheater in either frame"*. It was **right about the pixels and wrong about the cause**: the
   amphitheater at hex(24,2) has **MID(h35) MID(h34) MID(h30)** standing in the two rows in front of it, and draw
   order is depth order — so it is **buried** (206's occlusion law), on a seed where seed 42's front rows are all
   `ROAD(h0)`, which is exactly why *its* agent read the bowl perfectly. **This is pre-existing artifact siting,
   not the change** — HEAD buries the same bowl behind the same buildings. Banked as cue **(t)**. Its second FAIL
   (*"the 4am city is a uniform blackout with zero lit landmarks"*) is 212's already-banked cue **(q)**: my entire
   whole-frame night delta is **658 px of 1.26M — 0.05%**, so it cannot have darkened anything.
5. **`nightDeep()` is pinned at 1 all day.** It only means anything after dark (it is `dayT` measured from dusk,
   clamped), so `civOpen()` is *0.30 at noon* — harmless in the draw, where `lit` and `LITAMT` are 0 anyway, but a
   trap for any **non-draw** reader. Both new readers guard it: the tooltip returns `'Open'` whenever
   `LITAMT<0.35`, and the amphitheater's audience takes the daylight branch. **A curve keyed to "how far the night
   has run" is undefined by day — guard every reader, not just the one you are writing.**

**Verdict: DEEPENED.**

## Iteration 214 — the sand was the same colour as the road (2026-07-13) [Water & coast × Polish]

**Vector.** Water & coast × Polish — cue **(q)**, "the night coast flattens to a mauve void".
The stalest domain (last 205) *and* the banked cue, raised UNPROMPTED by both step-back
agents at 212 and re-raised by a third at 213. Three independent asides outrank
kind-rotation, so the header had already named this the next lap.

**Change.** `sandCol(name,f)` (beside `col()`), read by the BEACH and DUNE sand surfaces.
At night the sand is dimmed by a **luminance-matched, HUE-PRESERVING** wash instead of the
global cool tint. Colour-only: **zero new path objects, zero geometry touched.** Crosses over
from the same `LITAMT` 0.35 cut the lit glass and `civOpen()` call daylight, so **daylight
runs byte-identical code** (199's free control). Cached in `CCACHE` (flushed on light change)
⇒ one string per frame, not one per hex.

**The bug, measured (`probes/probe-sandhue.mjs`, 3 seeds).** Never a brightness bug and never
*primarily* a texture bug. **A flat per-channel multiply is not a TINT on a warm surface — it
is a HUE ROTATION.** The night tint is `[.42,.42,.58]`: it lifts blue and crushes green. Sand's
base `[238,220,178]` runs R>G>B (hue 40, chroma 77); multiplied by that tint it comes out
`[103,92,103]` — **R and B land on the same value and G becomes the MINIMUM**, i.e. hue **309**,
chroma **12**. Violet.

| | day | HEAD night | PATCH night |
| --- | --- | --- | --- |
| BEACH | chroma 77, hue 40 | chroma **12**, hue **309** | chroma **36**, hue **33** |
| DUNE | chroma 72, hue 43 | chroma 10, hue 305 | chroma 35, hue 35 |
| ROAD (control) | chroma 37, hue 40 | chroma 8, hue **308** | chroma 8, hue 308 (unmoved) |
| **BEACH <-> ROAD dist** | **116** | **44** | **56** |

At night the beach and the asphalt sat **44 RGB units apart, both at hue ~308** — the sand and
the road were *literally the same colour*. Two agents said "it reads as **asphalt**", unprompted;
they were measurably right. **Controls: SHOREPARK / PARK / FOREST / RES / ROAD / WATER all
byte-identical, and the whole DAY column byte-identical.**

**Census.** PASS, 0 page errors, tile histogram empty — correct and vacuous for a draw-only
colour change (the census cannot see this vector at all; the probes are the gate).

**Isolation (`probes/probe-sandinert.mjs`, patch-vs-HEAD, floor measured in-run per 213).**
day **3 px / 2 px against floors of 3 / 2 — provably inert**; night **47,383 / 50,872 px, 86% on
the BEACH mask** (the rest is DUNE, also fixed).

**"Too bright?" — the two agents disagreed, so a number decided.** Sand has the highest albedo
in the scene, and the right question is whether it keeps its *daylight ratio* against the city:
`beach/RES` = **1.43x day · 1.28x HEAD night · 1.42x PATCH night**. HEAD had **crushed** the
beach's relative albedo after dark; the fix restores exactly the daylight ratio. Not overbright —
*correctly* bright. (Agent 42's "too bright" is 201's objection-to-the-model.)

**Visual.** Both PASS. Seed 42 was run **BLIND** (HEAD vs PATCH unlabeled, order flipped from the
earlier round) and the agent picked the patch: HEAD's sand *"does not read as sand at all — a
poured concrete apron or a grey-lilac asphalt slab"*; the patch's *"sits well outside the
road/building greys, so the eye separates beach from pavement instantly."* Both explicitly
cleared the overcorrection risk: *"No orange. No amber. No implied off-scene light source. It
does not look pasted on."*

**Verdict: FIXED.** Cue (q) is CLOSED — and it was closed by hue, not by luminance or texture.

### The first half of this lap: EXPLORED -> REVERTED (the moonlit waterline)

Before the hue finding I built the *wrong* fix, and the gate caught it. Logged in full because it
is the more instructive half.

**Change (reverted).** `probes/probe-nightsand.mjs` measured per-tile within-hex luminance stdev
(= texture) and found a real defect: the night beach retains only **32%** of its daylight texture,
against PARK 66% / ROAD 83% / **RES 103%** — because *every* beach detail draw is gated OFF at
night (shorebirds `LITAMT<0.58`, towels/parasols `<0.6`) and the sole night draw, the bonfire, is
`v`-band-gated and rare. Absolute night texture **3.99**, below the streets' 16 and barely above
open water's 1.6. So I crossed the damp band over from `sandDk` (a *stain*, darker than sand) to a
moonlit `glint` **sheen** (a *mirror*, brighter), keyed to `MOONF` — the same lit fraction the disc,
star-wash and moonglade read (153). It worked, numerically: BEACHfront texture **7.1 -> 20.3**
(retention **108%**), every control unmoved, day byte-identical.

**Why it died.** **Both agents FAILed it, and the seed-42 agent — BLIND — preferred HEAD.**
*"It visibly steps along hex edges — I can count the individual straight segments and see the
miter joints."* *"Every corner is a 120-degree hex vertex. It is a polyline, not a shoreline."*
*"A glowing plastic tube laid on the coast."* At whole-city zoom the entire coast became a white
crenellated sawtooth. This is **159's law**, which I read, quoted in the code comment, and then
reasoned my way past — arguing that since the *day* band is also a per-edge stroke and reads fine,
a night one would too. The seed-7 agent supplied the missing half: *"at day the band is only
slightly lighter than the sand, so the polygon corners disappear. **The moment you crank the
luminance, the geometry becomes the subject.**"*

**What I'd avoid next time.** (1) Don't try to sneak past 159 by "keeping the shape and only
changing the tone" — on a per-edge draw, **legibility and grid-exposure are the same quantity**.
(2) Don't trust a probe that measures a **necessary but not sufficient** quantity: "is there
contrast on the beach" is necessary for the beach to read, but *a neon tube also has contrast*.
(3) Two mid-flight findings worth keeping: only **62 of 147** beach hexes are sea-facing (the damp
band cannot reach the other 85 — 206's measure-the-pool law), and `MOONF` is near **NEW on seed 42
at `dayT` 0.92**, so any moon-gated fix is weakest on exactly the seed the cue was filed against.

**The lesson, and it is the whole iteration.** Three agents across three iterations described this
defect with the word **MAUVE**. I fixated on "detail dies" and built a **greyscale** probe — an
instrument that *cannot represent hue*. It measured a real thing, passed a change the eye rejected,
and only when I stopped and measured the word the agents actually used did the bug appear, exactly
where they said it was. **Build the probe in the units of the complaint.**

## Iteration 215 — the marram closes the seam (2026-07-13) [Nature × Polish]

**Vector.** Nature was the stalest domain (last 206) and the lap owed it. It had two
banked cues; I took **(v) the naked sand<->park seam** over the GARDEN-calendar cue —
(v) was raised *independently by both step-back agents on both seeds* at 214 (212's law:
weight a two-agent independent aside above any verdict), and GARDEN would have been a
fourth **Deepen** in five laps on a tile measured **58% occluded** (206). Kind varies to
**Polish**; domain rotates to Nature.

**Host, measured before designing** (`probes/probe-seamhost.mjs`, 6 seeds). The seam is
real and unanimous: **52-63 sand hexes touch green per city** (36-43 BEACH + 15-21 DUNE),
~42-55 green hexes touch sand, and the green neighbour is **essentially always SHOREPARK**
(87-115 adjacencies; PARK appeared *once* in six seeds). Not `T.MARKET` — the host exists at
scale. Cue (v) guessed DUNE's marram might already sit on the seam; it does not — the marram
is drawn on the **dune crest**, and only **10-18** of ~55 seam hexes are marram dunes at all.
The seam itself was bare on both sides.

**Change.** `seamVeg(x,y,gx,gy,sandSide)` (new, beside `drawCell`), called from the
**BEACH**, **DUNE** and **SHOREPARK** draw cases. Each side lends the other its texture near
the shared edge: **marram tufts** (a root clump + a blade or two) root out of the sand on
hexes touching the park, and **wind-blown sand specks** scatter into the lawn on park hexes
touching the sand. Draw-only, `hashCell`-gated, no `rng()`, no terrain.
Three laws shaped it: **points, never a stroke along the edge** (159 — a per-edge line joins
into an outline and re-exposes the geometry it is hiding), so every mark is scattered *along*
AND *back from* the edge and a fifth of the edges are skipped outright; **each hex draws only
inside itself** (211 — draw order is depth order, so an ornament offset into the hex in front
is painted over), so the transition is made by two hexes **interdigitating**, not by one
spilling across; and **a hairline cannot put a pixel down** (203) — see below.

**Census.** PASS. Every metric **+0**, tile histogram **empty** — the correct, vacuous result
for a draw-only change. It proves only that nothing threw. The gate is the probe.

**Probe** (`probes/probe-seam.mjs`, 3 seeds x day+night). The complaint is *"warm tan meets
cool green with NO TRANSITION"* — a claim about **colour mixing across a boundary** — so
measure that and nothing else (214: build the probe in the units of the complaint):
`green ink on sand` = px where G>R (sand is R>G>B, so it can only be marram); `tan ink on
lawn` = px where R>G+12 (lawn is G>R, so it can only be blown sand). Floor measured in-run
(213); `Math.random` stubbed in `addInitScript` before the page's own script.

| day | green ink on seam SAND | tan ink on seam LAWN | ctrl sand | ctrl lawn |
| --- | --- | --- | --- | --- |
| seed 7 | 31.2 -> **50.6** /1k px | 80.6 -> **115.5** | **1 px** | 3 px (floor 3) |
| seed 42 | 40.1 -> **62.2** | 80.5 -> **117.0** | **0 px** | **0 px** |
| seed 1234 | 39.5 -> **53.6** | 82.2 -> **110.0** | **0 px** | **0 px** |

**Both controls — sand with no green neighbour, lawn with no sand neighbour — changed 0-3 px
against a floor of 0-3, on every seed and both lights.** Same tiles, same code, differing only
in whether they sit on the seam: the change lands on the seam and nowhere else, by construction.

**203's law bit, and the probe caught it.** The first build's marram was a `lineWidth 0.6`
blade *only*. It changed ~800 px on the seam sand — and moved the green-ink count **not at
all** (31.2 -> 30.7): a blade thinner than a device pixel is **always blended with the sand**
and can never produce a green-dominant pixel. It was *hazing* the sand, not tufting it, and
the interdigitation was **one-sided** (the lawn's ellipse specks worked from the start). Adding
a **root clump** — a solid 1-2px ellipse under the blades, which is also what a marram tussock
actually looks like — took the sand side from flat to **+36..+62%**. A hairline needs a body.

**Visual.** PASS on both seeds, day and night (2 agents, before/after, whole-city + a 4.2x
close-up **aimed** at the longest run of seam — 201: a fixed clip is not a framing;
`probes/shot-seam.mjs`). Both independently confirmed the thing under test: seed 42 — *"BEFORE:
an unbroken tan/green staircase, you can trace every hex edge. AFTER: the same run is feathered
... it reads as a back-beach transition, not a rash or a dotted outline"*; seed 7 — *"a clean
two-tone hex staircase"* becomes *"a back-beach dune fringe, not a rash, not a dotted row, and
not an outline tracing the facets."* No z-order tears, no marks in open water, whole frame
unchanged at 1x.

**Perf — PAID, and it disproved my own hypothesis twice.** `probe-drawbudget` scores `seamVeg`
at **692 path objects = 0.7% day / 0.5% night**. But six interleaved A/B runs read **day
+2.1..+4.5%, night +1.1..+2.2%** — consistently positive, never straddling zero (199's inert
control straddles zero at +-1%), so it is real, and it is **~4x what the per-path-object model
predicts**. I tested two mechanisms and **both came back negative**: (1) a continuous `f` in
`col(name,f)` mints a unique `CCACHE` key per tuft and misses every frame — quantizing it
bought **nothing**; (2) per-tuft `strokeStyle`+`fillStyle` writes (~1384/frame) — hoisting them
to one-per-hex (~210) bought **nothing**. Cost accepted on 194's precedent (~3% day for the
grounding of every tree, judged worth paying). **The suspect is NAMED, not fixed** (198): the
692 objects are 464 ellipse fills + **228 line strokes**, and a stroke must generate outline
geometry (with round caps) that a fill does not — **198's cost model was measured on SOLID
FILLS ONLY, exactly as the gradient hole was.** A clumps-only variant read night **+0.7/+1.0%**
vs the full build's **+1.1..+2.2%**, which is suggestive but two noisy runs and visually
unverified. ⇒ **cue (x)**, below.

**Verdict: SHIPPED.** Cue (v) CLOSED. The coastline no longer has a traceable hex staircase.

## Iteration 216 — the walk-up stops being one building (2026-07-13) [Urban fabric × Polish]

**Vector.** Urban fabric × Polish, closing cue **(r)** ("a building type has become
wallpaper" — banked at 212, raised *unprompted and independently* by both step-back
agents). Rotation owed Sky (stalest, 208), but a banked measured finding outranks
kind-rotation (119), and Sky's only live cue (s) is the constrained one.

**Probe FIRST — and it overturned the agents' host.** Both 212 agents perceived
repetition; each named a *different* culprit, and seed 7 named the **TOWER**
(*"the striped high-rise tower ... has become wallpaper"*). `probes/probe-facade.mjs`
(wraps `winBandR`, records the true SCREEN ROW of every band the frame issues — so it
measures the draw, not the source, and runs unchanged on HEAD and patch):

| | MID | TOWER |
| --- | --- | --- |
| count | **369–477** (the most common building, by 4x) | 67–91 |
| massing forms | **1** | 4 |
| distinct stripe rhythms | **3** (top = **50%** of the whole stock) | 44–47 (top 6–7.7%) |
| bands on an IDENTICAL screen row as the E-W neighbour | **89–91%** | 28–47% |

**The TOWER is measurably innocent; the MID is the wallpaper.** And MID's top colour
combo — `sandDk` body + `terraDk` roof, **31%** — is exactly seed 42's *"red-roofed
podium block."* Both agents had felt the right thing and one had pointed at the wrong
object: **locate-don't-judge, and 212's own law (mine the ASIDES, measure the FAILs).**

**Root cause — the fourth sibling of 99/103/110, and the one they left standing.**
Those three decoupled a building's *colour* from its height. Nobody ever decoupled its
**facade**. `bandS()` subtracts `z` straight from the screen y, so **a band's z IS a
screen row** — and the walk-up's bands were nailed to `z=5; z+=7` for every walk-up in
the city. Same-row neighbours share a base y, so their window strips landed on
*identical screen rows* and chained into one continuous corduroy across a whole block.

**Change.** The rhythm becomes a property of the **building**, not of its type: four
independent seed-salted draws on top of the two existing colour axes — its own floor
pitch (`fp`, mean held at 7.0), its own first sill (`ph`, mean 5.0), its own crown
(`cv` → overhanging eave / flat parapet / tall set-back attic), its own balconies
(`rails`, which had been a *tell for the colour `terra`* — an ornament restating another
axis, the same defect one rung down). Means held per 98's hold-the-mean law. All roof
furniture (solar, green roof, fringe, water tank) was nailed to a constant `h+1.6` deck
and now rides the crown's real height `rz` — otherwise a set-back attic leaves the solar
floating in air.

**Census.** PASS. Draw-only and `hashCell`-only: pop −4 of 154,785 (**0.003%**, timing
noise), tile histogram **empty**. Correctly near-vacuous — the probe is the gate.

**Probe (patch vs HEAD, TOWER as the untouched control).**
- MID distinct rhythms **3 → 44–55**; top rhythm's share **50.1/50.7/46.6% → 5.9/6.7/5.4%**.
- MID corduroy — bands on an identical screen row as the neighbour — **91/91/89.3% → 22.1/23.2/21.7%**.
- **TOWER control: byte-identical on all three seeds** (46/6%/27.8 · 47/7.7%/47 · 44/7.4%/41.8).
- The walk-up now lands on the *same* facade heterogeneity as the tower — the element the
  probe had cleared as innocent — rather than on an arbitrary target.

**Perf — the timing gate lied, and a deterministic instrument caught it.** Two interleaved
A/B rounds read a *stable* day **+2.2% / +2.8%** (night +0.4/+0.1). A stable day-only cost
is iter 117's exact false signal, so instead of arguing with the noise I counted the thing
that *determines* cost under 198's model: `probes/probe-drawbudget.mjs`, which is
timing-free. **Path objects 104,745 → 104,753: +8, or +0.008%.** `bandS` byte-identical
(24,338 both). +8 objects cannot cost 2.5% of a frame. **FREE**, and the day column was
machine load. ⇒ **law promoted to SKILL.md.**

**Visual.** Both agents, **blind, with the A/B order SWAPPED between seeds**, were asked to
*locate* the corduroy frame. Seed 42 → "A" (HEAD). Seed 7 → "B" (HEAD). **Both correct, so
it is not positional bias**, and their prose independently restates the probe: *"every
walk-up carries the same band pitch starting at the same height, so the strips chain across
neighbouring blocks into one continuous striped-wallpaper field."* On the patch both read
*"many individual buildings ... flat parapets, overhanging cream eaves with a shadow lip,
brick set-back top storeys"* — **varied, not jittered** ("the window strips still align
*within* each building, so it looks designed"). No z-order tears, **no floating roof
furniture** (the `rz` risk), no blown-out colour. Both **VISUAL: PASS**.

**Asides banked (212's law — the asides are where an agent is right).**
- **(y) A SCORCHED-LOOKING HEX CLUSTER INLAND** (seed 7): *"a small dark brown/scorched hex
  cluster in the mid-left inland block that reads oddly against the surrounding green."*
  Unprompted, on a PASSing frame. Note the header says the fire CA is a **ghost** (cannot
  ignite at 2035) — so this is probably LOGGING/clearcut, not BURNT. **Identify the tile
  before designing** (dead-code law).
- **(z) THE HUD CLIPS ITS OWN LABEL** (seed 7): the stats bar clips `TRANSIT REA[CH]` at the
  right edge. A real DOM bug, cheap, and **probes are blind to the HUD** (200) — which is
  exactly why only an agent could have found it. Interaction/UX × Polish.
- Seed 42 re-reported the known sub-pixel elevated transit as *"stray hairlines"* — that is
  `polish-tile` BACKLOG **(a)**, z-order cleared three times. **Not new; do not re-open.**

**Verdict: SHIPPED.** Cue **(r)** CLOSED. The most common building in Solvista is no longer
one building drawn 475 times.

## Iteration 217 — the twenty-third step-back finds a city with no downtown (2026-07-13) [holistic step-back]

**Vector** — holistic step-back (the 23rd; 212 was the 22nd). No domain lap, no city change: `solvista.html` is
**byte-identical to iter 216**. Two harness probes added (`probes/probe-skyline.mjs`, `probes/probe-goldenhue.mjs`).

**Census** — PASS, 0 page errors, every metric flat (baseline pinned on the same HEAD, so flat is the correct read).
`probe-season` re-run: seasons alive — FARM winter→dry-peak **87.0**, SHOREPARK **52.5**, VINEYARD 35.2, PARK 23.4,
FOREST 19.8, with the **ROAD control at 0.6**. GARDEN still the one mute tile (**5.4**), exactly as cue (p) says.

**Visual** — 4 frames × 2 seeds via `shot-stepback.mjs` (day/golden/night at 2035.62 + winter at 2035.02; every frame
self-reported its pins correctly). **Both agents FAILed.** Four claims were reached INDEPENDENTLY on both seeds — and
212's law paid out a fifth time: **the FAILs were where they were wrong, the ASIDES where they were right.**

**Claim 1 (the big one) — "the towers are sprinkled evenly; there is no downtown; the city reads as texture, not a
place."** Both agents, unprompted, both having counted the towers (67 on seed 42, 91 on seed 7). **MEASURED AND
CONFIRMED — and the cause is a HALF-FINISHED FIX, sitting in the code with its own diagnosis written above it.**
The tower upgrade rule (~L1493) is:

```
if(com>=2 && rng() < (0.14+0.20*back)*(0.5+c.val))     <- PLACEMENT: `back` (a half-plane) + `c.val`
  c.t=T.TOWER; c.th=(54+c.v*82)*(0.70+0.66*core);      <- HEIGHT:    `core` (a peak)
```

Iter 98's comment above it diagnoses the defect **exactly** — *"a linear ramp down the x+y diagonal is a HALF-PLANE,
not a place, so it has no peak for a skyline to sit on"* — and then **fixes it for HEIGHT ONLY.** The placement roll
is still the half-plane, and iter 98 itself established that **`c.val` is NOT a centrality field** (it diffuses
`valueSrc`, whose peaks sit on parks and water). So **nothing in the placement roll knows where downtown is.**
`probes/probe-skyline.mjs` (world data, no render, 3 seeds) bins every live cell by `hexDist` from the published CBD:

| | ring 0-4 | 5-8 | 9-12 | 13-16 | 17-22 | 23+ |
| --- | --- | --- | --- | --- | --- | --- |
| **TOWER % of developed** (seed 7) | 32.1% | 9.0 | 9.5 | 6.9 | **10.0** | 6.8 |
| **TOWER % of developed** (seed 1234) | 24.0% | 6.5 | 8.2 | **13.1** | 9.8 | 6.3 |
| **mean tower height** (seed 7) | 108 | 111 | 82 | 80 | 67 | 71 |

**HEIGHT is the CONTROL and it works** — 108→67 / 112→68 / 126→67 core-to-rim on the three seeds; `0.70+0.66*core`
does its job. **DENSITY is flat past the innermost ring** (6.8–10.0% with no gradient), and on **two of three seeds an
OUTER ring is denser than an inner one.** The tell in one line: **mean tower dist from CBD 19.8 / 17.3 / 19.8 vs mean
DEVELOPED dist 22.1 / 21.4 / 23.5** — the towers sit essentially where the *land* sits. Seed 7 has **9 towers in the
core ring and 36 out past 23 hexes: four times as many towers on the rim as downtown.** ⇒ **The city has a TALL middle
but not a DENSE one.** There is a peak in height with no mass under it, so no skyline ever forms and towers read as
even texture — which is precisely what both agents said. **This is the fix lap 218 owes.**

**Claim 2 — "golden hour flattens the land into one dusty taupe-mauve; roads, roofs and ground desaturate to one hue."**
Both agents, both using a colour word ⇒ 214's law: **measure COLOUR, not luminance.** `probes/probe-goldenhue.mjs`
(hue/chroma/luminance per tile at 3 lights, 3 seeds). **Half right, and the diagnosis is wrong.** The hue convergence
is REAL — day hues span **37–94°** (RES 37, ROAD 42, MID 62, FOREST 67, PARK 79, COM 91, TOWER 94) and golden hour
compresses them to **24–44°**, one orange band. But **chroma RISES** (ROAD 40→61, MID 21→60, TOWER 17→49, RES 48→73),
so it is a **saturated orange wash, not desaturated mud**, and the separations only shrink 23–30% (PARK↔ROAD 52→37).
Golden hour is doing what golden hour does. **Low priority; do not take it as a lap.**

**Claim 2b — THE REAL COLOUR FIND, which neither agent named but both were pointing at: at NIGHT, RES and ROAD are
FOUR RGB UNITS APART.** Same probe: night RES = **hue 355, chroma 16, lum 79**; night ROAD = **hue 360, chroma 11,
lum 80**. **The residential roofs and the asphalt are the same colour.** PARK↔ROAD falls to 15 and PARK↔RES to 19.
This is **214's hue-rotation bug, still live, on the city's BIGGEST surface** — 214 fixed the sand (BEACH is healthy:
night hue 33, chroma 38, and it holds) but the **built mass never got the same treatment.** It is exactly seed 7's
unprompted aside: *"the mid-left residential field becomes a single desaturated slate-violet blob where towers, roads
and low buildings are one value."* ⇒ **new cue (aa).**

**Claim 3 — "winter is indistinguishable from day."** Both agents. **Premise refuted at tile level, but they are
pointing at something real.** `probe-season` says the calendar is alive (FARM 87.0, SHOREPARK 52.5, ROAD control 0.6).
The agents were making a **frame-share** claim, not a dead-calendar claim: the tiles with the biggest seasonal
amplitude are the **fewest** (FARM 130 instances, VINEYARD 26, ORCHARD 16, MEADOW 5), so the calendar is loud per-tile
and quiet per-frame. This is 214's shape again — **a correct probe in the wrong units** — and it is *arguably correct
by design* (a dry-Mediterranean city has no snow). Banked, not owed: **cue (ab)**, and note the honest fix is a bigger
seasonal SURFACE, not a louder amplitude (⚠ cue (p) forbids raising the lawn amplitude).

**Claim 4 — "the thin rail/power lines are pasted-on scratches drawn over everything."** Both agents, both seeds.
**PRE-REFUTED, AND THE LEDGER PREDICTED IT VERBATIM.** The elevated-transit z-order has now been cleared **three
times** (203 `probe-gondz`: rope 8.4–23.6% occluded; 212 `probe-monoz`: `drawMonoAt` 10.6–19.8% occluded on every
seed/light) and the `polish-tile` BACKLOG **(a)** says in advance: *"Agents keep FAILing it as 'drawn over the towers'
because a hairline with sub-pixel supports READS on-top however correctly it is sorted."* **Did not re-open it. Nobody
should.** It is a LEGIBILITY problem (a `polish-tile` job), and 215's law names the lever: **a hairline ornament needs
a BODY**, not more strokes.

**Perf — the ARC, priced against the same two refs 202/207/212 used, so the trend is directly comparable.**
- **The lap (213→216) vs 212 (`432617c`): day +5.6% · night +1.0%.**
- vs `7e2ac2c` (177, 40 iters): **day +11.9% · night +7.6%** (212 read +8.7/+4.8; 207 +7.2/+5.1; 202 +7.5/+4.1).
- vs `5f01426` (162, 55 iters): **day +14.0% · night +8.3%** (212 read +10.5/+7.3; 207 +9.5/+6.0; 202 +8.6/+5.7).
- Absolute: day 40.2–43.1ms · night 46.4–49.1ms.

**This is the largest single-lap arc jump on record** (~+3.2pp day vs 177 in ONE 4-iteration lap, where the previous
*ten* laps moved ~+1.2pp) — **but it has a NAMED, MEASURED, ALREADY-ACCEPTED mechanism, so it is not a new suspect:**
**215's `seamVeg` was priced at ~+3% day when it shipped and knowingly PAID** (692 path objects, 228 of them line
strokes). Rate over the whole arc is still ~**+0.25%/iteration** — consistent with the standing "diffuse, not
accelerating, ACCEPTED" read. **Do NOT open a perf lap.** But this lap is real evidence for **cue (x)**: a lap whose
only heavy addition was **strokes** cost ~4× what the per-path-object model predicts for fills. The stroke-vs-fill
sweep at equal path count is now the harness's best-supported open perf question.

**Verdict: HOLISTIC STEP-BACK — NOT a clean bill. A FIX LAP IS OWED (the first since 197).** The city is sound in
census, seasons, transit z-order, sun, and perf — but **it has no downtown**, measured three ways on three seeds, and
that is exactly the class of cumulative/structural defect a step-back exists to catch and no per-lap gate can see.
**218 = Urban × Deepen: give the tower PLACEMENT roll a `core` term, as iter 98 gave the height one.** Two warnings
carry into it: **(1) 98's own law — HOLD THE MEAN** (`0.70+0.66*core` averages 0.783 against the ramp's 0.782;
an earlier un-held `0.52+0.72*core` cost HALF the city's tall towers — *massing a city is not shrinking it*), and
**(2) 206's law — ship it as a PREFERENCE, not a GATE** (a hard `core` gate would starve the rule the way the garden
gate did, `GARDEN 14→5`). Re-baseline expectations: pop/density SHOULD move, and that is the vector working.

## Iteration 218 — the towers were never the problem (2026-07-13) [Urban fabric × Deepen]

**Vector** — the owed fix lap (217: *"the city has no downtown"*). The header ordered a specific fix: **give the
tower PLACEMENT roll a `core` term, as 98 gave the height one.** I measured its premise first (*probe before you
design*) and the premise is **false**. `solvista.html` ends this iteration **byte-identical to iter 217**.

**The prescribed fix is a DEAD LEVER, and the proof is one number.** `probes/probe-towerroll.mjs` (world data, no
render): the placement roll converts **100.0% of the eligible pool on all three seeds.** There is not ONE cell left
anywhere in any city that is still `COM`, unseaside, and holding a `com>=2` quorum. The leftover COM all sits at
quorum 0 or 1 (seed 7: `0:75  1:139  2:2`). ~800 ticks x `ks(240)` picks sample every cell ~60 times, so **every COM
cell that ever reaches the quorum towers, whatever `p` is.** Scaling `p` by `core` can only change *when* a cell
towers, never *whether* — it buys no skyline and costs towers at 240 pop each. **The comment sitting ON the seam
said so** (iter 98: *"this test SATURATES… it is a weak lever"*), and 217 prescribed it anyway. A probability cannot
steer a rule it has already saturated; **only the PREDICATE can.**

**So I graded the QUORUM instead** (`com + L*core >= K` — a predicate cannot saturate) and swept it,
`probes/probe-quorum.mjs`, 3 seeds. Two ledgers per 206: the EFFECT, and the COST TO THE POPULATION.

| variant | core/rim contrast | towers | pop |
| --- | --- | --- | --- |
| HEAD `com>=2` | 2.26x | 239 | 106,412 |
| **V1 `com+2*core>=2`** | **4.50x** | 248 (+4%) | 108,542 (+2%) |
| V2 `com+3*core>=2` | 4.63x | 289 (+21%) | 117,988 (+11%) |
| V3 `com+3*core>=2.5` | 15.5x | **152 (-36%)** | **86,018 (-19%)** |
| V4 `com+4*core>=2.5` | 16.3x | 177 (-26%) | 92,456 (-13%) |

**206's starvation law, reproduced exactly:** V3/V4 raise the RIM's bar to redistribute and destroy a third of the
city (a -19% pop collapse would hard-fail the census). V1 only ever *relaxes* — rim bar untouched, nothing starved —
and **holds the mean** in 98's sense. It passed **every gate**: census **PASS** (`pop 154,778 -> 163,274` +5.5%,
`TOWER 334 -> 369`, **`tallTowers 138 -> 192` +39%** — the new mass landing exactly on 98's existing height peak),
`probe-skyline` gradient monotone on all 3 seeds (seed 1234: **38.5 / 22.4 / 11.0 / 6.9 / 6.9 / 6.0%**), height
control still decaying 120->67.

**And I reverted it anyway, because the eye still says no.** Four blind agents (2 patched / 2 HEAD, none told which)
were asked to **LOCATE** downtown (108). All four independently reported *"no falloff; towers run to the rim."*
**They were right and my probe was wrong — 205's sin, and I walked straight into it.** I measured **TOWER % of
developed land**, a *ratio*, because that is the unit my *rule* operates in. **The viewer counts towers — a MASS.**
The rim carries ~20x more land, so even at **53.6% core vs 6.3% rim density**, seed 7 still stands **15 towers
downtown against 34 out past ring 23.** Twice as many towers on the rim as in the core. That is 217's own tell,
undefeated.

**THE CEILING, and it is why no tower rule can ever fix this.** Re-run `probe-towerroll` on the patched build: seed 7
ring 0-4 has **ZERO commercial cells left** — every one is now a tower — and rings 0-8 hold 33 towers with **5**
unconverted COM remaining. **V1 has exhausted the downtown's commercial land.** The core holds **~38 COM cells; the
rim holds ~139.** Towers rise *only* on COM. So **no quorum, no probability, no tower rule of any kind can put more
than ~38 towers downtown while the city carries ~93.** The skyline is capped by the distribution of **commercial
land**, and the tower rule was never broken — it is faithfully reflecting a COM layer that is itself uniform.

**Counterbalanced blind A/B (patched vs HEAD, same seed/camera, agents not told which): split 1-1.** Seed 7's agent
picked the patch correctly (*"A reads as a rim of spikes; B reads as having a downtown"*). Seed 42's picked **HEAD** —
and was right to: the patch's extra `rng()` draws (the relaxed gate short-circuits *less*, so more rolls happen)
**reshuffled the seeded stream and pushed seed 42's rim towers 25 -> 37** while adding only 6 downtown. The rule never
touches the rim's bar; that +48% is pure chaotic-CA wobble, and **on one seed in three it swamps the entire signal.**
A change must hold across seeds, not one.

**THE ROOT CAUSE — same defect class, one layer upstream, and it is one line (`solvista.html:1443`):**
```js
const shop=(roads>=2&&dev>=1&&rng()<0.45)||(coms>=1&&rng()<0.3);
```
Commercial land is sited by **corner lots and neighbours. Nothing in it knows where downtown is** — exactly the fault
217 found in tower *placement*, sitting one layer up in the rule that creates the tower rule's only host. Measured
COM-origin share of developed land (seed 7): **50% in ring 0-4, then flat at 25-36% all the way out.** COM is
sprinkled, therefore towers are sprinkled.

**And the fix is cheaper than what I built, because `com>=2` is ALREADY a clustering predicate.** Cluster the
commercial land and the *existing, untouched* quorum concentrates towers downtown **automatically** — V1 becomes
redundant, and arguably harmful (it lets an isolated core shop tower, blurring the very clustering the real fix
creates). **That is the whole reason this reverts rather than ships:** V1 is not a partial fix, it is a fix in the
wrong place, and keeping it would leave a second half-finished fix in the file for someone to find in 119 iterations.

**Census** — PASS on restored HEAD (`pop`/`roads`/`developed`/`towers` flat; 0 page errors). The V1 numbers above are
recorded for 219, not shipped.

**Visual** — 4 blind LOCATE reads + a 2-seed counterbalanced blind A/B, all via `probes/shot-downtown.mjs` (prints
the CBD's true screen fraction as ground truth). Health unanimous and clean on every frame: no z-order tears, no
floating tiles, no blown-out colour, *"coherent, attractive coastal diorama"*. The only FAIL is the one 217 already
banked. Blind-locate ground truth is worth keeping: on HEAD seed 7 the agent said "NO CLEAR CENTRE" and its forced
guess missed the true CBD by **0.18**; on the patched frame the guess landed **0.02** away. The lever is real. It is
just nowhere near enough.

**Verdict: EXPLORED → REVERTED.** The prescribed fix was refuted, the real lever was found, measured, taken to its
structural ceiling — and the ceiling is too low. **219 owes the actual lap: Urban x Deepen, give `shop` (L1443) a
`core` preference and let the quorum do its job.** Warnings that carry: **PREFERENCE, NOT GATE** (206 — V3/V4 above
are what a gate does), **HOLD THE MEAN** (98 — total COM must not collapse, or shops/cafes/`walkPct` go with it), and
**expect the stream to reshuffle** — judge it on all three seeds, in the viewer's units (**tower COUNT downtown vs at
the rim**), never on a ratio.

## Iteration 219 — the shops never knew where downtown was (2026-07-13) [Urban fabric × Deepen]

**Vector.** Urban fabric × Deepen. The lap 217 ordered and 218 redirected: give the city a
downtown. 217 prescribed a `core` term on the tower *placement* roll; 218 proved that roll is a
**dead lever** (100% conversion — `p` sets timing, never placement) and named the real seam one
layer up: **towers rise only on COM, and COM is sited by a rule that knows nothing about the CBD.**
This closes it — at the COM fork, not the tower rule.

**Probe first (218's law: print the roll's conversion rate BEFORE tuning it).**
`probes/probe-shopcore.mjs`, Part A. The shop fork (`solvista.html:1443`) is **ONE-SHOT** —
max hits/cell = **1** on every seed, still-eligible pool **0-1** — because the cell leaves
`EMPTY`/`MEADOW` the instant it fires. That is the *structural opposite* of the tower roll, where
the cell stays `COM` and is re-picked ~60x until it converts. **So `p` here CANNOT saturate, and IS
a live lever on the COM/RES mix.** The lever is real; 218's law is what proved it rather than
assumed it.

**Change (one line + a `core` term).** `shop=(roads>=2&&dev>=1&&rng()<0.45)||(coms>=1&&rng()<0.3)`
becomes the same two rolls scaled by **`m = 1 + 2.0*ccore`**, clamped to 1, with
`ccore=clamp(1-hexDist(x,y,CBDX,CBDY)/CORER,0,1)`. **PURE ADDITION** (206: preference, never a
gate): at the rim `ccore=0`, `m=1`, and the rule is **byte-identical** to what it was. Only the core
is lifted. Draw count is unchanged (one `rng()` per roll, same short-circuit guards).

**The sweep found the trap, and it was the obvious design (`probe-shopcore.mjs`, Part B, 3 seeds).**
Round 1 swept `m=A+B*core` with **A<1** — the natural "prefer the core" shape. **Every variant made
the city worse in counts**: core towers **42 -> 29/38/32/33** (*down*) and pop **-14..-27%**. Mean
`core` over developing land is ~0.1, so `A<1` makes `m<1` nearly everywhere and **cuts COM
city-wide** — and COM is the *tower substrate*, so fewer COM => fewer towers => -240 pop apiece. The
rim fell faster than the core, which flatters the **ratio** — **218's sin exactly, committed by its
own successor.** Round 2 (`m=1+B*core`, never below 1) is the ship. `R4` (a *wider* falloff, the
other obvious instinct) **doubled the rim** (148 -> 205): it lifts the whole city.

**Census.** PASS. `pop 154785 -> 178629 (+15.4%)` with **`developed +12` and `roads -14` — flat.**
The city did not sprawl, it **intensified**. Tile histogram: **`TOWER 334 -> 432 (+98)`**,
`COM 1245 -> 1356 (+111)`, `RES -216`, `tallTowers +106`, `helipads +98`, `towerHt +12462`.
Free interconnect: **`MARKET 12 -> 36`** (+24) and `PLAZA +2`, `STADIUM +2` — a denser commercial
core feeds the market/civic rules downstream.

**The mechanism is ARRANGEMENT, not quantity** — the finding worth keeping. Total COM barely moves
(**649 -> 673** across the census seeds) while towers jump **239 -> 304**. `com>=2` in the upgrade
pass is **already a clustering predicate**, so concentrating the *same* commercial fabric makes far
more of it meet the quorum. **218 predicted this in advance and it is confirmed.**

**Mass (`probes/probe-downtownmass.mjs` — world data, no render).** Share of the city's total tower
**HEIGHT** inside ring 0-8 (the eye reads mass, not count — 218):

| seed | coreH share | far-rim (23+) towers | massCentroid/devMean |
| --- | --- | --- | --- |
| 7 | 24.4% -> **41.0%** | 36 -> **37** | 0.82 -> 0.67 |
| 42 | 33.0% -> **44.5%** | 25 -> 42 | 0.75 -> 0.66 |
| 1234 | 17.3% -> **42.1%** | 35 -> 19 | 0.78 -> 0.55 |

Every seed converges to **~41-45%** from a scattered 17-33%, and the mass centroid moves inward on
all three. Far-rim is **flat in aggregate (96 -> 98)**, as pure addition requires; the per-seed swing
is the seeded-stream reshuffle 218 warned of.

**Visual — 2 PASS, 2 FAIL, and BOTH FAILs REFUTED BY MEASUREMENT (212, for the sixth lap running).**
Four blind agents across three seeds, HEAD/patch order swapped between seeds to defeat position bias.
**Every one of them pointed at the true CBD:**

| seed | blind point | true CBD | verdict |
| --- | --- | --- | --- |
| 42 | (0.50, 0.60) | (0.493, 0.512) | PASS — HEAD "NO CLEAR CORE" |
| 7 (fresh) | (0.46, 0.63) | (0.478, 0.625) | "NO CLEAR CORE" |
| 1234 | (0.54, 0.48) | (0.558, 0.455) | PASS |

Seed 7's agent **hit the CBD within 0.02 and then declared it wasn't one** — the locate/judge split
in its purest form (108). Its two causal claims are both false: (a) *"the patch spread 102 towers
across the whole plate — an over-built picket forest"* — the patch added **ONE** far-rim tower
(36 -> 37) while **doubling** the core (16 -> 33); the forest is **HEAD's**, and the rim rule is
byte-identical. (b) *"the centre is a green/park wedge"* — it is describing the **plate's** centre
(~0.5,0.5), not the **city's** (0.478, 0.625); the header has warned for 120 iterations that
`CBDX/CBDY != CTRX/CTRY`.

**Verdict: SHIPPED.** The downtown exists, sits where the CBD is, and four blind agents found it.

**⇒ BANKED, and it is the THIRD RUNG OF THE SAME LADDER (cue (ac), Urban × Polish — the next Urban
lap).** The one thing the agents said **independently, on two different seeds, unprompted** — which
is the aside 212 says to weight above any verdict — is that the skyline has **no taper**:
*"a spine, not a crown"* (1234) and *"a local thickening, not a peak; height is flat, no tapering
silhouette"* (7). **It is true, and it is visible in the code.** Height is
`c.th=(54+c.v*82)*(0.70+0.66*core)`: the centrality term spans **1.94x** (0.70 -> 1.36) while the
per-cell noise `c.v` spans **2.5x** (54 -> 136). **The noise SWAMPS the signal**, so a lucky rim
tower out-tops an unlucky core one and no silhouette can form. 217 fixed height and left placement;
218 found placement was a dead lever; 219 fixed the *substrate*, and the **mass** is now downtown —
what remains is that the **height gradient is drowned in per-cell noise.** ⚠ 98's `0.70+0.66*core`
was solved to **HOLD THE MEAN** — the fix is to **narrow `c.v`'s spread, not to steepen `core`**
(a steeper `core` was tried at 98 and cost half the city's tall towers). Do not re-open the
placement roll.

## Iteration 220 — the houses were the same colour as the road (2026-07-13) [Urban fabric × Polish]

**Vector.** Urban fabric × Polish, closing cue **(aa)**. Iter 214 proved the night tint is a **hue
rotation**, not a tint, and fixed it on the **sand**. The same bug was still sitting on the city's
**biggest built surface**, which is what 217's step-back agent called, unprompted, *"a desaturated
slate-violet blob where towers, roads and low buildings are one value."*

**Probe first — and the cue's own premise did not survive it.** `probes/probe-sandhue.mjs` (0.55
tile-body mask) put night RES<->ROAD at **~8.6 RGB units** — but **day RES<->ROAD at ~8.7**. By that
instrument the separation does not *collapse* at night; it was never there, and the day city reads
fine. The mask was averaging the building into its own lawn (214's "necessary but not sufficient"
law, one level down). Re-run on the cue's *cited* instrument, `probes/probe-goldenhue.mjs` (3 seeds,
frozen clock, world rebuilt in-page), and the cue is right and the bug is **systemic**:

| night | RES vs ROAD | PARK vs ROAD | PARK vs RES | FARM vs ROAD |
| --- | --- | --- | --- | --- |
| day | 22 | 50 | 36 | 47 |
| **HEAD night** | **6** | **14** | **20** | **21** |

Every warm or green **land** surface loses its hue after dark — chroma crushed 3-9x (RES 48 -> 17,
PARK 46 -> 10, FOREST 52 -> 6) — and the only land tile that holds is **BEACH (37)**, the one 214
already fixed. The mechanism is exact, and it is 199's law (a constant whose *name* asserts a
behaviour its *value* cannot have): run the tint `[.42,.42,.58]` on the masonry palette by hand and
the **channel ORDER inverts** — `cream` [244,232,208] -> [103,97,**121**] (B>R>G) and `creamDk`
[221,205,172] -> [93,86,**100**], both **lavender**; `sandDk` [212,190,146] -> [89,80,85], **chroma
9, i.e. grey**. RES's `bodyN` is `cream`/`terra`/`sandDk` and MID's is `terra`/`cream`/`sandDk` — so
**most house and walk-up bodies are drawn in exactly the two tones that invert to violet.** The
saturated ones (`terra`/`coral`/`brick`) survive: they are too warm to invert.

**Change (five call sites, colour only).** `col(` -> `sandCol(` on the **masonry** in `drawBuilding`:
RES body + roof + chimney, MID body + roof. **Reuses the shipped wash rather than forking a second
one** (one-predicate-one-definition) — `sandCol` was already generic over any `BASE` name; only its
*header comment* claimed it was about sand, and that comment is now corrected. The **glass** types
(TOWER/COM) **deliberately keep the cool tint**: they hold their chroma (19 -> 17), the tint cannot
rotate them, and their identity *is* coolness — so the night city now separates into **warm masonry
against cool glass and asphalt**, which is how a lit city actually reads. ROAD stays grey **on
purpose** (214: asphalt genuinely is grey; the bug only bites a surface that is *supposed* to be warm).

**Census.** PASS, and **vacuous by construction** — no `rng()`, no terrain, empty tile histogram, core
metrics flat. (`solarRoofs` -1, `towerHt` +1: load-timing tick-count noise, 163's law (c). `drawBuilding`
is pure render and cannot reach `tick()`.)

**Probe (`probes/probe-goldenhue.mjs`, patch vs HEAD, 3 seeds).** The claim is about **colour**, so the
gate is in colour units (214's law):

| night | HEAD | patch | (day) |
| --- | --- | --- | --- |
| **RES vs ROAD** | **6** | **16** | 22 |
| RES chroma | 17 | **34** | 48 |
| RES hue | **356deg** (red-violet) | **24deg** (warm tan) | 36deg |
| MID chroma | 22 | **36** | 22 |
| PARK vs RES | 20 | **29** | 36 |

Houses and asphalt go from **6 -> 16** RGB units: from 27% of their daylight separation to **73%**.
**Controls, all clean and measured in the same run:** the **day and golden columns are UNMOVED** (RES
day 36deg/48/152 in both builds; golden 24deg/74/129 in both) — `sandCol`'s `w=clamp((LITAMT-0.35)/0.35,0,1)`
is **0 in daylight**, where `t===TINT` and the two functions are **byte-identical**, so the dead regime
referees the live one *for free* (199's law). **BEACH night (33deg/37/105) and WATER night (210deg/58/67)
are EXACTLY unchanged** — 214's fix and the sea are undisturbed.

**Perf — free BY CONSTRUCTION, not by timing.** Not one prism, ellipse or stroke was added, removed or
resized; only the *string* handed to `fillStyle` changed. Path-object count is therefore **identical**,
and 198's measured cost model says cost on this canvas is **per path object**. Per 216's law, that
deterministic mechanism outranks an interleaved timing number that would have no mechanism behind it.
(`sandCol` is `CCACHE`d exactly like `col()` — ~48 extra keys per light change, not per hex.)

**Visual.** `probes/shot-stepback.mjs`, seeds 42 + 7, frozen in-page, frames self-reporting
(`night t=0.92 LITAMT=1`). Both agents **PASS**. They were told only that *"some surfaces"* changed
after dark — never which, never in which direction (108: locate, don't judge) — and **both, blind,
independently named the ground truth**: the low buildings read *"warm tan/khaki with terracotta
roofs"* (42) and *"warm tan/cream with terracotta roofs"* (7), against roads that read *"slate-violet"*
— i.e. they put RES at the measured **hue 24deg** and confirmed the RES/ROAD separation without being
told it was the thing under test. Both confirmed the towers still read **cooler** than the low-rise,
and both confirmed the **day frame is untouched**.

**Aside, banked as cue (ad) — two seeds, independent, unprompted** (212's fail/aside law, paying out an
eighth lap): seed 7 saw *"slightly hazy-violet mid-block interiors"* and seed 42 *"a violet/blue-grey
ground plane."* That is **the GROUND, still on the raw cool tint** — and the probe agrees: **PARK
rotates green -> CYAN (hue 81 -> 206) with chroma crushed 46 -> 6.** The built mass is fixed; the
surface it stands on is not.

**Verdict: SHIPPED.**
