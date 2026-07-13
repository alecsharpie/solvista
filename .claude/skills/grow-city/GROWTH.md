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
| **Nature** | 4, 26, 29, 102, **156**, **174** | 1, 13, 60, **206** | 37, 46, 67, 76, **108**, **120**, **139**, **166**, ~~**233**~~ | ~~46~~, ~~88~~, ~~101~~ | U4 | 53, 96, **194**, ~~**198**~~, **215**, **221** | **117**, **129**, **148**, **183** |
| **Water & coast** | 6, 10, 12, 16, 20, 33, 106, **169** | 90 | 17, 25, 51, 65, 72, **113**, **123**, **159**, **196** | 22, ~~**205**~~ | | U2, 44, 58, 79, **116**, **132**, **150**, **185**, **214**, **223**, **234** | **97**, **141**, **176** |
| **Urban fabric** | 32, 62 | 7, 23, ~~82~~, **151** | 38, 54, 68, 92, **165**, **173**, **189**, **199**, **209**, ~~**218**~~, **219** | 47, **109**, ~~**160**~~ | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103**, **110**, **118**, **124**, **143**, **180**, **216**, **220**, **224**, **228** | **133** |
| **Transport** | 2, 9, 21, 31, 48, **164** | 77 | 28, 39, 55, 63, **112**, **121**, **128**, **155**, **179**, **193**, **230** | 5, 15, **138**, **211** | U4 | U1, U3, 70, 85, 87, 94, **146**, **188**, ~~**203**~~ | **105**, **171** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107** | 36, 59, 66, 80, 91, **149**, **158**, **175**, ~~**195**~~, **213** | 45, **204** | | 73, ~~**114**~~, **168**, **231** | 52, 122, **140**, **184** |
| **Sky & atmosphere** | 27, 43 | | 19, 35, 50, 57, 95, **135**, **153**, **161**, **181**, **190**, **208**, **225** | | | 61, 81, 89, **115**, **200** | ~~**134**~~, **144** |
| **People & activity** | 41, 56, **127**, **170**, **186** | 49 | 34, 64, 93, **104**, **119**, **145**, **178**, **201**, **210** | 78, **111** | | 84, **137**, **163**, **226** | 71, **154**, **191** |

- **Interaction/UX — the FEATURE INVENTORY was rotated to the archive at 211 (history, not steering).** ⚠ **229 is
  cross-cutting (the TEXT LAYER: `<meta charset>` ⇒ every tooltip + the stats panel), so it sits here, not in a
  grid cell.** It **repealed 134's rule** — raw UTF-8 in JS string literals is now SAFE (the file is
  self-describing; `probes/probe-charset.mjs` asserts it), so **do not hand-escape a `·` or an `é`.** What steers:
  when adding an entity array, `stamp()` it in its draw + add an `ENTINFO` row (same discipline as the census hook).
  `stamp()` also draws the focus ring, so any stamped entity is ringable free — and since 133 a hovered TILE is
  ringed too. **An `ENTINFO` `sub` may be a FUNCTION of the entity (105)** — use it when a thing's interest is its
  *membership* (which line / route / depot; **211's `Feeds — Line N of M`**), computed live, never a stored string.
- **ROTATION.** Last vector per domain: People **226** ·
  Transport **230** · Civic **231** · Nature **233** · Water **234** · Sky **225** · Urban **228**.
  🔴 **NEXT: Sky (stalest, 225)**, then People (226) / Urban (228). **232 WAS THE 26th STEP-BACK — the next is 237.**
  ⚠ **233 took (ai) and REVERTED** — NOT closed; do not re-try a bare rim mask, read (ai) below.
  ✅ **234 CLOSED (u) AND COMPLETED THE `col()` WASH LADDER** (214 sand → 220 masonry → 221 greens → 223
  normalisation → 234 timber): **every surface routing through `col()` now keeps its identity after dark.**
  ⚠ **The deck was GREY, not violet** — which is why 214's "hue ~308" audit walked past it for four laps.
  **Audit by `dHUE`, never a target hue (⇒ SKILL.md).** Detail in the wash bullet + (u) below.
  ✅ **232 (26th step-back): CITY CLEAN, ARC UNMOVED — AND THE AGENTS' ASIDE WAS A REAL, MEASURED DEFECT.** Both
  FAILs were refuted (see below); the *asides* paid out for the **eighth lap running**. **NEW cue (ai): THE CITY HAS
  NO FRINGE**, and it is **worse than the agents claimed** — the taper is **NEGATIVE**. ⚠ **The pre-registered TOWER
  SILHOUETTE trigger has FIRED** (see (af)): both agents, both seeds, unprompted, called the towers wallpaper again.
  ⚠ **230's `taxi` flag is LOAD-BEARING** (was decorative ~200 iters; `VCURF` thins the night fleet by CLASS — the
  BUS/SERVICE/TAXI keep no hour). Bodies of 227/230/231 archived at 232.
  ✅ **CLOSED LADDERS (bodies archived at 232 — do not re-open):** the **HUD lap** (229; both its cues were the
  HARNESS, not the city), the **SKYLINE ladder** (217→224, `c.th` SPENT — warnings at (ac)), the **WASH ladder**
  (223, luminance-safe, invariant ASSERTED by `probe-goldenhue.mjs` — warnings at (aa)/(ae)), and **137's
  standing-crowd cue** (226 — **People's cue list is EMPTY**). ⚠ **(y) and (s) were born from agents reading
  `shoot.mjs` output — REPRODUCE either in the user's configuration before designing to it** (229's law).
  **Interaction/UX** (cross-cutting, so it sits here not in the grid) was last touched at **229**; before that 191.
  **CUES, RANKED** ((w)/(z) CLOSED 229, (t) CLOSED 231, **(u) CLOSED 234**): 🔴 **(ai)** THE CITY HAS NO FRINGE —
  **measured; 233 tried and REVERTED, the way through is NAMED** · **(af′)** tower SILHOUETTE, trigger FIRED (Urban
  × Polish) · **(ag)** the night greens stay hot (Nature × Polish) · **(y)** the scorched inland cluster (Nature ×
  Polish) · **(ah)** the amphitheater's cavea has a **FIXED orientation** —
  it now often sits on the water's edge and does not face it (*"facing the bowl toward the river would look far
  more intentional"* — 231's agent, unprompted). 199's tell on a **draw**; Civic × Deepen · **(s)** golden-hour
  contrast collapse (Sky × Polish — CONSTRAINED; strengthened at 227) · **(ab)** (low, arguably correct by design).
  Nature's **GARDEN staggered beds** (Nature × Deepen) is held by cue (p). ⚠ **Sky is stalest and its only cue (s) is
  CONSTRAINED — but 225's law: a stale domain's cue list is where you LOOKED, not where there is nothing. Grep its seam.**
  ⚠ **(y) and (s) were both born from agents reading
  `shoot.mjs` frames** — and 229 proved that camera can manufacture a defect. **Reproduce either in the user's
  configuration (or with a probe) before designing to it.**
  **225 (Sky × Deepen): THE SHADOWS READ THE SUN.** `shadS` — the ONE function every shadow routes through — carries
  a per-frame sun vector (**`SHOFF`** throw · **`SHLEN`** stretch · **`SHAMT`** opacity). ⚠ **Noon (t=0.415) is
  BYTE-IDENTICAL by construction ⇒ every shadow lap has a free dead-regime control there.** ⚠ **`SHAMT` must never
  reach 0 at night** — the residual patch is what keeps every ped, tree and car from FLOATING.
  **STEERING FROM THE LAST LAPS — bodies rotated to the archive at 227; only the WARNINGS live here.**
  ⚠ **226: `census.mjs` DOES NOT FREEZE THE CLOCK** ⇒ tick-sensitive metrics (`solarRoofs`) **wobble ±2**; core
  metrics unaffected. **To test whether an unintended metric move is YOURS, re-run the SAME FILE, not HEAD.**
  ⚠ **231: THREE PREDICATES, DON'T MIX THEM.** `openFront`/`frontLoad` count **TALLT MEMBERSHIP** — fine for the
  MID-HEIGHT bus shelter they were tuned on, **wrong for anything drawn flat** (an h80 tower and an h5 shed score
  alike; RES scores 0). **`groundLoad(x,y)` is the ground-level one** (231): sums drawn **HEIGHT**, two rows, near row
  doubled, reading **`c.th` never `c.h`** (`c.h` is animated in `drawBuilding` ⇒ a `tick()` reader would couple the
  world to the render clock), and counts a **`RAISEABLE`** lot at `FUTUREH` — **an empty lot is not a clear view, it
  is a building that has not been built yet.** ⚠ **Aim a CAMERA by measured ink, never by any of the three (226).**
  ⚠ **213: `nightDeep()` IS PINNED AT 1 ALL DAY** — harmless in a draw, a trap for any NON-draw reader; guard every
  reader. **The civic night-light audit is DONE — do not re-run it**; three lights are OFF the curve on purpose
  (school janitor, hall clock face, parliament lantern) — **do not "fix" them.**
  ⚠ **211/210: `frontLoad` is the sharper `openFront`** (`openFront` misses a TOWER two rows in front). **Both ship
  as PREFERENCES, NEVER GATES (206)** — the hard gate *starved* the rule (`GARDEN 14 -> 5`, worse than the bug it
  fixed). **137's "the ped/dog system is NON-REPRODUCIBLE" is DISPROVEN** (stub + in-page `genWorld` ⇒ byte-identical
  crowds; **People is probe-able like any domain**). **The `LITAMT` night-gate audit is DONE:** `LITAMT` returns to
  **0.64** by the small hours, so any gate `LITAMT > 0.64` defines a "night" that **ENDS BEFORE DAWN** — both
  offenders fixed at 210.
  ⚠ **209: THE GROUND PLANE IS SPENT** (216 spent the FACADES too). **The developed ground is a HUGE surface,
  MEASURED** (`probes/probe-groundvis.mjs`, reusable): **5.2% of the frame, RES yards alone 2.21%**, and NOT buried.
  ⇒ **When a domain looks interconnect-saturated, re-ask it as: what LARGE SURFACES wear a palette name that cannot
  carry the signal?** ⚠ **206: the vacant lot is a MIRAGE** — `EMPTY` with >=2 RES nbrs falls **85 -> 6.5** by 2035,
  **0.0** with a road adjacent; development eats every gap.
  **⚠ THE FIRE CA IS A GHOST — do not build "X answers the fire" (`probe-firehost`).** Ignition is year-gated
  (`year<2006`, forest `year<2030`) so **at 2035 nothing can ignite at all**; before then, **two one-cell episodes
  across 3 seeds × 61 years** and fire **never spreads**. **`T.MARKET` again.** Reviving it is a real CA lap (BURNT
  is the palette's darkest tile), not a freebie.
  **⚠ THE `polish-tile` BACKLOG — measured cues that are NOT growth laps. Do not spend a domain's lap on one; they
  need a tile redesign, and each already has a gate written.** (a) **THE WHOLE ELEVATED TRANSIT is sub-pixel at fit
  zoom** (0.5px rope, 5px cabins, hairline masts/pylons) — **its Z-ORDER IS CORRECT AND IS CLEARED FOUR TIMES** (203
  `probe-gondz`: rope 8.4-23.6% occluded; 212 `probe-monoz`: `drawMonoAt` 10.6-19.8%; 217's agents FAILed it again;
  and **232's BOTH agents called it *"scratches over the image"*, seed 7 adding *"no visible pylon at the seaward
  end"***). **NEVER RE-OPEN THE Z-ORDER — the fault is LEGIBILITY**: a hairline with sub-pixel supports READS on-top
  however correctly it is sorted, and 215's law names the lever — **a hairline ornament needs a BODY**, not more
  strokes. *Do NOT re-try a body/halo under the rope (measured — backfires) or a lit top edge (impossible at 0.5px).*
  (b) **`university` is the ONLY of the twelve civics with no `LITAMT`** — the one `MAJORK` monument
  pitch dark after sunset; every place to put the light failed (195; `probe-unilight.mjs` + `shot-uni.mjs`).
  (c) **A parked service vehicle needs its CIVIC TILE to have a visible apron on its front edge** (204, cue n).
  (d) **The marsh reeds do not read** — seven sub-pixel strokes round the pool; its calendar is already computed and invisible (cue (i), 113).
  **Sky is post-saturation (Deepen/Fix ONLY — its additive/CA cells are traps).** **Urban is measured-saturated: additive spent (118), and Connect measured-hard TWICE** — 160 (RES terracing: no seed forms E-W RES runs of >=3) and 165 (high-street arcade: the `hstr` parade zigzags with row parity, longest straight-hex-axis run = 2, so it is not a clean arcade host); **Urban's next lap is Deepen/Polish only**. **Roof-furniture is CLOSED city-wide** across all 5 developed types (MID/RES water tanks, TOWER gardens, COM plant 165, IND clerestory 173) — no bare roof is left, and the **GROUND PLANE is SPENT too (209)**, and **216 spent the FACADES** — only the **harbour apron** is left. Check the last entry of the stalest domain for a banked
   finding before reading its row. ⚠ **But 232 REFUTED "Urban is spent" from the SILHOUETTE side — see (af′).**
   (**Sky's moon is FIXED (135) and NAMED (144)**, both closed.
  **STILL banked for Sky: the SEASON word** — it reads the fast `year` and would strobe ~0.7 Hz (134), so it needs a
  slow clock FIRST; don't add `seasonWord(year)` to the HUD nor re-ship 134's REVERTED almanac assuming 135/144 unblocked it.)
  **Water's STILL-banked cue (123): the pier/lifeguard are still `rng()`-salted; site them on a depth by
  respending their draws (123's stream-neutral trick) — but that REPEATS 123's mechanism, so vary it.**
  **The asserts-less-than-the-code-knows tell is SPENT for agriculture** (orchard 129 + vineyard 139/148 +
  FARM 183 — each tooltip now names the season its draw already knew, off ONE shared `*Phase()`).
  **GARDEN is the last mute one** — the staggered-bed cue lives at **(p)**, which OWNS it (do not restate it here;
  it is no longer "the next Nature lap" — **(ai)** and **(ag)** now outrank it). ⇒ **"Additive inventory spent" is a
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
  **THE FAIL/ASIDE LAW (from 212, a law in SKILL.md — the header keeps only the tally): in a whole-frame read the
  FAILs are where an agent is WRONG and the ASIDES are where it is RIGHT. It has now paid out EIGHT laps running**
  (213, 214×2, 215, 217, 219, and **232 — its cleanest instance: both FAILs refuted by probes, while the two asides
  both seeds reached INDEPENDENTLY became cue (ai), measured and WORSE than stated, and fired (af′)). MINE THE
  ASIDES** — and weight an aside two agents reach independently, on different seeds, above any verdict either gives.
  Perf ARC (same refs as 202/207/212/217/222/227, directly comparable): **232's lap (228-231) costs DAY ONLY, and it
  has a MECHANISM — the two instruments AGREE, so per 216 it is REAL and PAID.** Timer **day +1.1% · night +0.0%**;
  path objects **day 107,959 -> 109,247 (+1.2%) · night 138,520 -> 138,668 (+0.1%)**. The asymmetry IS the mechanism:
  **228's tower crowns add objects in BOTH regimes, and 230's night curfew REMOVES vehicles at night and cancels
  them** — which is why night alone came back flat. (229 is text-layer, 231 moves one tile.) ARC: vs `7e2ac2c` (177,
  55 iters) **+16.4% / +11.9%**; vs `5f01426` (162, 70 iters) **+17.9% / +13.7%** (abs: day 41.1-42.1ms · night
  47.2-48.3ms) — **+1.0pp on both columns over 228-231**, dead on the documented rate. (Per-step-back priors 202→227
  archived at 233.) Arc rate ~**+0.2-0.3%/iteration**; diffuse, **NOT accelerating**; **ACCEPTED — do NOT open a perf
  lap.** ⚠ **222 FALSIFIED this header's own claim that "219 is world-data only — arc unmoved."** The
  lap's +3.3/+4.2% had NO mechanism (220/221 colour-only, 219 world-data, 218 reverted), so per 216 the INSTRUMENT was
  changed rather than the timer re-run: `probe-drawbudget` reads **day 104,787 -> 108,007 (+3.1%)** and **night
  132,547 -> 138,734 (+4.7%)** — the two instruments AGREE, so the cost is REAL, and it is **219's downtown** (more
  core COM => more towers => more `prismS`/`bandS` by day and more `winBandR` by night, which is exactly why night
  grew more than day). **PAID and ACCEPTED.** ⇒ **LAW: "no new draw CALL" is NOT "no new draw WORK" — THE WORLD IS THE
  DRAW LIST** (⇒ SKILL.md): price a CA/siting vector by COUNTING OBJECTS, not by reading the diff.
  ⚠ **Cue (x) stands** (215's `seamVeg`: 692 path objects / 228 STROKES cost ~4x what the fill model predicts — the
  stroke-vs-fill sweep at equal path count is the harness's best-supported open perf question).
  **⚠ THE STANDING PERF SUSPECT (207, re-measured UNCHANGED at 232; named NOT mandated per 198): THERE IS NO HOT
  ORNAMENT — the arc is DIFFUSE, which is exactly why every per-lap gate reads it as free.** `probe-drawbudget`
  (night): `drawCell` = **94.8%**; hot leaves `winBandR` **32.8%** · `prismS` **27.7%** · `hexTile` **12.2%** ·
  `bandS` **7.6%** ⇒ **~48% of the night frame is STATIC TERRAIN RE-RASTERIZED EVERY FRAME**, with 230 iterations of
  features beneath it (`tree` 4.0%, `shadS` 2.1%, `drawBuilding` 1.6%). **Do NOT open a caching lap on that say-so —
  198's levers are CLOSED (cost is PER PATH OBJECT); the only lever is drawing FEWER objects.**
  **The GAP-CLOSING trick (111/112/113) is SPENT in four domains; the TELL that replaced it (a label asserting what
  the draw ignores) is CASHED 7x** (117 redwoods, 122 `CIVICLABEL`, 129 orchard, 140 plaza/quad, 148 vineyard, 183
  FARM) **and its host keeps moving DOWN: 199 found a CONSTANT, 209 a COMMENT, and 217 a HALF-FINISHED FIX — see
  SKILL.md.** Still MUTE: `[T.IND]` (no calendar) and GARDEN (season-frozen draw — needs a Deepen first). ⚠ 122's
  warning stands: a tooltip vector needs a probe checking the claim against INDEPENDENTLY RECOMPUTED truth, not a
  screenshot that it renders. (The "Sky-feedable list is EMPTY" bullet was **DISPROVEN by 209**, archived.)
  **Kind-picking, compressed (full text rotated to `GROWTH-archive.md` at 204).** **Scale** is the coldest kind and a
  structural lever, not a lap move. **New element** (last 127): a saturated domain cannot take one — but saturation is
  of a domain's ENTITIES, so one can still land on a large untouched **surface** (127 put picnics on PARK's 878 hexes).
  **Connect** (109/111/112/204): its trick is that it adds NO NEW OBJECT — it closes a gap between two that exist.
  **107 was a New CA rule that ADDED NOTHING** — it rewrote a pass that had never fired; *auditing an existing rule
  for reachability* is a New-CA-rule move available in every domain at zero content cost (`probe-market.mjs`; 204's
  `probe-firehost` is the same move and found a ghost).
  ⚠ **Nature × Connect is the row's GRAVEYARD — attempted and REVERTED three times** (46 geometrically impossible ·
  88 no draw-only host · 101 found host *and* land and lost on **shape**). **Do not re-open it as a *corridor*.**
  **Cue (e½) CLOSED — 102 shipped the commons blob 101 prescribed; do not plant a second one.** Nature's cold cells
  are Connect (leave it) and Scale.
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
- **⚠ `peds` CANNOT SERVE THE ROAD NETWORK (iter 111, measured, before writing any code).** A resident is leashed to
  the open cell it is anchored to (`PEDLEASH=2`, tuned to hold street occupancy at ~19%). Only **20–31%** of bus stops
  have a live ped's anchor within a leash (even at radius 5, 56–75%). So "residents walk to / wait at / ride the X"
  vectors are structurally capped at ~a quarter of any road-borne host, and leave the rest *emptier* than whatever
  they replaced. To do it properly move the **spawn pool** (`openCells` in `syncFleet`), not the leash.
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
  **⚠ THE COST MODEL HAS TWO HOLES, BOTH THE SAME SHAPE: 198's TABLE WAS MEASURED ON SOLID FILLS ONLY.** Its findings
  (per-ellipse; area-independent; sprite worse) hold only for solid `fill()`s, and **two other primitives have each
  come in ~4x over the model**: (1) **GRADIENTS** — 200's sun is two radial-gradient fills costing **day +2.3%**; a
  gradient is evaluated **per pixel**, so it may price by **AREA**. (2) **STROKES** — 215's `seamVeg`, 692 path
  objects (0.7% day) costing **~+3% day**, with the colour-cache and style-write levers both measuring **zero**,
  leaving its **228 line strokes** as the suspect. Both **PAID and ACCEPTED**; neither **MEASURED**. Do not shrink a
  gradient or cull a stroke "because 198 said count is what matters" — **it said no such thing about either.**
  **⚠ THE DEAD-REGIME CONTROL (199) and ⚠ NEVER GRADE BY CONSECUTIVE PASSES (117 corrected 99) are both LAWS in
  SKILL.md** (bodies archived at 222): a change **provably inert in one regime** makes that regime its free, same-run
  noise floor; and machine load is autocorrelated, so only an **interleaved A/B/A/B vs pristine HEAD** reads true.
  (**A 2+-round day+night interleave overruns the 120s Bash timeout — do NOT pipe it through `tee`**: node
  block-buffers stdout to a pipe, so a backgrounded run looks EMPTY until it exits (197 lost a run that way). Run it
  foreground with a long timeout. **⚠ `cp` is aliased `-i` here — use `/bin/cp`**, or every swap silently no-ops and
  you measure ONE file 4x, iter 147.)
- **`?year=` is a URL hook (108); keyframes `.02/.30/.62/.87` = winter/spring/dry-peak/autumn. Full text (+ 139/202's
  warning that it DRIFTS ~0.167 yr/s while `shoot.mjs` waits — use `probes/shot-stepback.mjs`) is in SKILL.md.**
- **`?tide=` IS A URL HOOK (iter 113) — the sea is testable, and every prior shot was a lie about it.** `TIDE` runs a
  ~2 min seeded cycle that **no screenshot in this loop's history could pin.** The default is seeded, not neutral —
  **`?seed=42` loads at TIDE 0.02, dead low water.** `?tide=v` shifts the cycle's *phase* (`__setTide`), so the sea
  keeps moving from where you put it. Use `.02 / .35 / .59 / .98` = low / mid-ebb / **neutral** / high. **`0.59` is
  the pin for grading anything ELSE on a marsh**: below the flood-sheen cut (0.60) and at `ebb=0`, so the hex body is
  one flat colour and nothing tidal can move.
- **`c.buzz` — the third derived field, after `c.flow` and `c.val` (iter 104, in `tick()`).** How much is there to
  come out FOR, seen from a hex: `ATTRACT.has(c.t)?2:0` plus a count of `ATTRACT` neighbours
  (`COM`/`MARKET`/`CIVIC`/`STADIUM`/`PLAZA`). Pure terrain derivation, no `rng()`, recomputed each tick. It is
  sparse — **mean 0.54–0.59 over standable hexes, and mostly 0** — so a rule keyed to it changes behaviour *only*
  near attractions and is a no-op elsewhere. Reuse it for "somewhere worth standing"; don't hand-roll a second one.
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
- **Institutions cluster: `MAJORK` / `QUARTER` / `siteQuarter()` (iter 91).** `MAJORK` = the five monumental kinds
  (`hall museum parliament university library`) — the shared vocabulary for "major institution", used by BOTH the
  civic quarter and the 2020+ forecourt rule. `QUARTER` = the three that *seek* it (library, museum, parliament);
  services stay sited by need, and `observatory` is deliberately free to sit at the rim. `siteQuarter()` hugs the
  nearest standing major at `QNEAR..QFAR` = **2-4 hexes** (adjacency would kill the bunting, which needs a ROAD cell
  reachable from two civics), falling back to the scattered search when the core is walled in. Detail archived at 200.
- **Open cues, banked by holistic passes (take one when its domain comes up):**
  **(g) ~SIXTEEN seedless `hashCell` calls — each paints the IDENTICAL pattern in EVERY city.** RE-RUN the audit,
  don't trust a catalogue (L-numbers drift): `grep -noE 'hashCell\([^;]{0,60}' solvista.html | grep -v seedNum`.
  **Only PRESENCE decisions are a breach worth a vector** (a thing being there, or not, in the same place in every
  city): **the night surf light-smear, `hashCell(x,y,77)<0.28`, is the one to fix.** *Ornament jitter* (kelp sway,
  fronds, fruit, fireflies) is cosmetic. Marsh reeds (113) + tower window-lights (110) CLOSED. ⚠ `darkWinR` is **not**
  a breach (it mixes `seedNum^salt` internally — check the callee). When fixing a range, **space the bases**.
  **(w)+(z) CLOSED BY 229; (t) CLOSED BY 231 — bodies in the archive / entry 231; laws in SKILL.md.**
  **(m) SHOWERS ARE HOST-STARVED — do not build "X responds to the rain"** (201, `probes/probe-rainhost.mjs`). Nothing
  on the ground reads `cl.rain`, and a shower is **2-5 hexes TOTAL**, so it rains on **less than one** picnic/cafe hex
  — `T.MARKET` again, **no host.** Widening it is a Sky change to a tuned draw, and **gradients price by AREA**.
  **(o) THE PORT HAS NO WATERFRONT — do not build "the ship docks / cranes work her"** (205,
  `probes/probe-harborhost.mjs`, 6 seeds, unanimous). Warehouses sit **behind** the coast highway, **5-9 hexes from
  the sea**; **no quay tile exists.** Solvista is a **roadstead**, so the anchored freighter is *correct* — her
  "waiting on a berth" comment is the label-tell's **FALSE-POSITIVE mode**. A port vector must **build the waterfront
  FIRST**. **Banked host: the MOLE is real** (`moleSet`, 5-12 cells, all 6 seeds — the only structure in the water).
  **(p) CLOSED by 208/209 (body archived); the WARNING is live. ⚠ DO NOT RAISE THE LAWN AMPLITUDE FURTHER** — `grass`
  and `lawn` share a base colour `[150,181,122]`, so the dry-season divergence *is* the managed green's identity;
  lawns must stay greener/brighter than the hills **all year**, and any push must re-run the blind locate. **⚠ GARDEN
  is STILL MUTE (1.8 -> 5.4)** (raised beds). **Its own richer cue, which (p) OWNS:** staggered per-bed calendars +
  ONE shared `gardenPhase()` — beds at different stages is an allotment's whole visual identity, a shape no other ag
  tile uses (FARM staggers FIELDS; this staggers BEDS); run the tell FORWARDS (123). **Nature × Deepen; host by 206.**
  **(aa)/(ad)/(ae) CLOSED (220 masonry, 221 greens, 223 normalisation); bodies archived. THE `col()` WASH LADDER IS
  COMPLETE** — ONE shared `washRGB(b,f,gr,gg,gb)`, colour-only (**zero path objects**, **byte-identical in daylight**
  ⇒ a free dead-regime control). ⚠ **Do NOT fork a second wash — EXTEND `washRGB`**; **GLASS (TOWER/COM) KEEPS the
  cool tint** and **ROAD staying grey is CORRECT** (214); **the invariant is ASSERTED by `probes/probe-goldenhue.mjs`
  — run it whenever you touch a gain triple.** ⚠ **234 added a THIRD caller — `WARMN` (timber), by NAME like `LEAFN`,
  so no call site can forget to ask.** ⚠ **FARM (`cropRGB`/`colRGB`) is the ONLY warm surface still outside `col()`.**
  ⚠ **Watch: PARK↔ROAD separation is 14, just under the ~15 collapse floor**
  — and **(ag) says the night greens read hot again**, so that is where the next lap bites.
  **(af) CLOSED by 228 (crown). ⚠ (af′) ITS PRE-REGISTERED TRIGGER HAS FIRED (232).** The header said
  *"the next Urban lap if the towers are ever called wallpaper again"* — and at 232 **both agents, both seeds,
  unprompted** did exactly that: *"nearly every tall building is the same horizontally-striped slab… at ~110 towers
  this is the single biggest thing flattening the skyline"* (42) · *"dozens of near-identical slab towers… variety
  was added in plan but not in MASS/HEIGHT/FOOTPRINT"* (7). **The TOWER SILHOUETTE (the body below the roofline) is
  still 5.3 shapes / top 55%.** ⇒ **Urban × Polish, and the instrument is `probes/probe-crown.mjs` — but re-derive it
  from the complaint's nouns first (228's own law): they said SILHOUETTE/MASS/FOOTPRINT, and `probe-crown` measures
  the CROWN, which 228 already fixed.** Do not let a banked probe acquit the thing the agents keep pointing at.
  **(ag) THE NIGHT GREENS STAY HOT (227, seed 7, unprompted).** *"The parks/farms in the middle stay oddly bright
  green, breaking the night mood."* Sits on 222's ladder invariant (**no UNLIT surface may out-brighten the LIT
  ones**) and on 223's live watch item (**PARK↔ROAD separation is 14, just under the ~15 collapse floor**) — likely
  one root cause. ⚠ **DO NOT gate on a pairwise separation — 221 proved separation REWARDS this class of bug**; gate
  on the surface's distance from its OWN daylight self, and re-run `probes/probe-goldenhue.mjs`. **Nature × Polish.**
  **🔴 (ai) THE CITY HAS NO FRINGE — IT IS DENSEST AT ITS RIM (232; MEASURED, `probes/probe-fringe.mjs`).** Both
  step-back agents, blind, on two different seeds, unprompted: *"the far edge terminates in an abrupt flat line of
  buildings with no suburban fade — the city ends rather than trails off"* (42) · *"no hinterland left. Density runs
  edge-to-edge right up to the dune line; no fringe, no thinning, no open country"* (7). **212's aside law again —
  and this time the probe AGREED WITH THEM and found it WORSE.** Developed share of LAND by distance inward from the
  plate rim (6 seeds, sea excluded from the denominator, pure world data): **rim 0-2 = 46.5% vs deep interior = 41.3%
  ⇒ taper −5.3 points, INVERTED.** The rim is the *most* built-up band in the city on **5 of 6 seeds**; WILD land at
  the rim is **13.4%**. So the diorama's outer boundary is a wall of buildings meeting the void.
  ⚠ **233 TOOK THIS AND REVERTED — STILL OPEN, but the obvious fix is MEASURED-DEAD** (`probes/probe-fringehost.mjs`,
  banked, runs on HEAD). **(1) The parcel roll is 100.0% SATURATED on every seed** ⇒ per 218 `p` is a **DEAD lever**;
  the city is exactly *"every lot within 2 hexes of a road"* and only the **PREDICATE** steers it. **(2) ROAD is FLAT
  across rim bands** (29.5% rim vs 33.6% deep) ⇒ the parcel rule is **INNOCENT** (218's host law) — it fills what the
  roads reach, and the roads reach the edge. **(3) THE DEV BUDGET HAS SLACK (1153/1382)** ⇒ **a held-back rim lot is
  NOT re-spent inland**; pop falls ~1:1. ⇒ **THE BOX: strong enough to READ as country ⇒ `developed` (CORE) collapses
  −5.7..−9.3% and the census HARD-FAILS; weak enough to pass (ceiling ≈ −4.5%) ⇒ the noise-drawn belt is SEED-FRAGILE**
  (seed 7 rim 46→19% PASSED — *"the hexagon is not legible in the green"*; seed 42 rim 54→36% FAILED — *"a
  constant-width band tracing the plate's outline"*; **195: it must hold on EVERY seed**). ✅ **THE COST LANDS ENTIRELY
  OUTSIDE: core (≤8) `developed` +0.2%, MID +5.7%, COM +10.6% — downtown is NOT taxed** (10 seeds paired; all 8 agent
  reads agreed). ⇒ **THE WAY THROUGH: HOLD THE RIM AND WIDEN THE CORE IN ONE LAP.** The slack means the city *can*
  absorb the freed development inland if interior cells are made eligible (the predicate's `road within 2` is the
  lever; widening it in the INTERIOR ONLY is pure addition, 219) — then `developed` stays flat, **the census gate
  opens**, and the belt can be as strong as the eye needs. **Priced separately each half fails; the PAIR ships.**
  ⚠ Three SHAPE laws, each paid for by a gate round: a scatter reads as **speckle**; modulating only a ring's
  *strength* reads as an **offset halo** (`rural` is `hexDist`-based ⇒ its boundary IS the plate's hexagon); the warp
  must **exceed the belt depth**, or the city can never touch the rim.
  **(ac) CLOSED by 224 — the SKYLINE LADDER (217/218/219) is COMPLETE** (body archived): mass downtown *and* a taper.
  ⚠ **THE WHOLE `c.th` LADDER IS SPENT** — do not re-open placement (dead lever, 218), the COM fork (219), the height
  noise, or `TCAP` (224). (1) ⚠ **`c.th` HAS TWO WRITERS** (placement + the 2022+ growth rule) — touch one, check the
  other. (2) ⚠ **DO NOT DERIVE A TOWER CONSTANT FROM THE MEASURED MEAN `core`** — 98 did (0.125), 219 invalidated it
  (0.282) unnoticed for 6 laps; normalise by the formula's own max (⇒ SKILL.md).
  **(ab) CALENDAR LOUD PER-TILE, QUIET PER-FRAME (217, Sky — LOW; body archived 233).** ⚠ **NOT "the seasons are dead"**
  (`probe-season` refuted it 3x). Loud tiles are RARE (FARM 92.1/122 hexes) vs PARK 22.4/574. Fix = a bigger seasonal SURFACE; (p) forbids the lawn.
  **(u) CLOSED BY 234 (body archived) — the deck takes `sandCol()`'s warm wash by NAME (`WARMN`); it was GREY, not violet.**
  **(x) A STROKE MAY NOT PRICE LIKE A FILL (215, perf suspect — NAMED, NOT MANDATED; see the PERF bullet's "TWO
  HOLES").** Build a **stroke-vs-fill sweep at equal path-object count**; `CCACHE` key churn and per-mark style
  writes are both ruled OUT (measured **zero**).
  **(y) A SCORCHED-LOOKING HEX CLUSTER INLAND (216, seed 7, unprompted on a PASSing frame).** *"A small dark
  brown/scorched hex cluster in the mid-left inland block that reads oddly against the surrounding green."* ⚠ The
  fire CA is a **GHOST** (cannot ignite at 2035) ⇒ almost certainly **LOGGING/clearcut, not BURNT** — **identify the
  tile before designing** (dead-code law). Nature × Polish.
  **(s) GOLDEN HOUR: CONTRAST COLLAPSE (212+217+227+**232** — CONSTRAINED, read before taking; Sky × Polish).** The
  disc sits high (**y=0.10**) in the *cool* sky while the warm gradient comes from the bottom. ⚠ **Raised at FOUR
  step-backs now, always unprompted, always calling golden the WEAKEST frame** (*"collapses roads, roofs, sand and
  grass into one narrow tan/salmon band"* · *"muddy tan-brown, desaturated rather than warm"* · 232: *"local colour
  destroyed… less like warm light than a dust storm"*). **The complaint is CONTRAST COLLAPSE ACROSS SURFACES, not the
  sun's position** (217 measured chroma RISING — a saturated wash, not mud); `probe-goldenhue.mjs` prints the golden
  separation matrix ⇒ **measure which pairs collapse before designing.** ⚠ **The sun CANNOT be lowered — 200 put it
  high ON PURPOSE** (the `.placard` owns the low-left sky; a low sun goes behind the HUD — the very bug 200 fixed).
  **201's law: the FAIL objects to the MODEL.** Reconcile the gradient's direction with the sun's, or move the
  warmth — **do not move the sun down.** Not a quick win.
- **Reach maps exist — reuse them (U5):** `reachFill(out, r, isSrc)` is a multi-source hex BFS capped at radius `r`,
  walking over land only (`WETSET` blocks water/marsh/kelp), filling `out` with steps-to-nearest-source and 255 for
  "farther than r". `recount()` already runs four per tick (transit / green / shop / service). Any "how far is X from
  Y" question should call it rather than hand-rolling a flood fill. Cost ~1ms per `recount()` — per *tick*, not frame.
- **⚠ Three census stats can FALL, by design (U5):** `walkPct`, `transitPct` and `solarPct` are shares of
  residents/roofs, not counts. Green space and shops saturate >90% on their own, so **services are walkable's binding
  constraint** — a tower lap that adds residents without civics will *drop* `walkPct`, and that is the stat working,
  not a regression. Judge them by whether the city earned the change, not by "up = good". `density` (residents per
  developed hex) rises with intensification and falls with sprawl.
---

<!-- rotated -->

> **Archive:** the 227 entries before Iteration 225 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

## Iteration 225 — the shadows never knew where the sun was (2026-07-13) [Sky & atmosphere × Deepen]

**Vector.** Sky & atmosphere × **Deepen** (rotation: Sky was the stalest domain by far — 17 laps
cold since 208 — and its two live cues were both flagged dead-end/low, so the header told me to
look for a real seam or fall through to People). Also a deliberate **KIND** change: 220/221/223/224
were four straight Polish laps.

**The seam — 199's tell, and its purest instance yet.** `shadS(cx,cy,r,a)` is the ONE function
every shadow in the city routes through: trees, palms, peds, kids, dogs, joggers, the static
crowds, gulls, every vehicle, the boardwalk. It drew **a centred ellipse at a hard-coded alpha**:
```js
ctx.fillStyle='rgba(40,32,20,'+a+')';
ctx.beginPath();ctx.ellipse(cx,cy,r*TW,r*TH,0,0,7);ctx.fill();
```
Meanwhile the artifact **has a sun, and moves it**: `sunX = X0+(X1-X0)*sunP` sweeps from the open
right corner (0.94W) to over downtown on the left (0.30W), with altitude `sin(pi*sunP)`, and it
**sets** (`SUNDN=0.78`). So a function named for a **SHADOW** could not cast one: the same blob at
the same opacity at dawn, at noon, at golden hour and **at midnight**. 199's law says the tell's
host is *a constant whose NAME asserts a behaviour its VALUE cannot have* — here the whole
**function** was that constant.

**Change.** Three edits, one new concept. `render()` derives a per-frame sun-vector off the SAME
`sunP`/altitude the disc is drawn from (so the shadows and the sun can never disagree about where
the light is): **`SHOFF`** (throw, in units of the shadow's own x-radius, signed), **`SHLEN`**
(stretch), **`SHAMT`** (opacity). `shadS` reads them. `e` eases the cast in/out across the horizon
toward the **sunless ambient patch** rather than toward zero — with no sun the city is lamplit from
every side, so what remains is a faint round contact patch: it must NOT vanish, or every ped, tree
and car floats at night.

**Noon is byte-identical by construction** — the sun there is both high AND centred, so
`SHOFF=0/SHLEN=1/SHAMT=1` — which hands the iteration a **free dead-regime control** (199).

**Census.** PASS. Every metric +0, tile histogram empty — the correct, vacuous result for a
draw-only change (it touches no terrain and no `rng()`). The iteration rests on the probe.

**Probe** (`probes/probe-shadowpx.mjs`). The claim in the viewer's units (205): *shadows fall away
from the sun and stretch when it is low* — so they must fall **LEFT** in the morning (sun right) and
**RIGHT** in the evening. **A SIGN FLIP.** Measured in DEVICE PX by wrapping `ctx.ellipse` inside
`shadS` and reading `getTransform()` at draw time (203). On the rows with zero population wobble:

| hour | SHOFF | HEAD rx | patch rx | throw px | throw/width |
| --- | --- | --- | --- | --- | --- |
| morning | −0.647 | 15.62 | 21.86 | **−10.10** | **−0.65** |
| NOON (control) | 0 | 15.69 | 15.69 | **0.00** | **0.00** |
| evening | +0.704 | 15.69 | 22.88 | **+11.05** | **+0.70** |
| night (control) | 0 | 15.17 | 15.17 | **0.00** | **0.00** |

The sign flip is exact, and `throw/width` reproduces the design constants (−0.647/+0.704) to two
decimals at **every zoom** (it is scale-invariant, as a throw in shadow-radii must be). Both
no-cast hours read **0.00 with rx identical to HEAD**. Elongation 1.40x/1.46x = `SHLEN`.

**Visual.** Both seeds PASS, and the **blind locate** (108/224) is the real result: agents were
given `frameA`/`frameB` (same city, same camera, hour stripped from the filename so they could not
reason "morning ⇒ west") and asked only *which way do the shadows fall*. **Both, independently, on
two different seeds: A = LEFT, B = RIGHT, B longer.** Ground truth exactly. Seed 7, unprompted:
*"shadow direction now unifies the whole skyline instead of each tower having its own blob."*

**Perf — FREE, by the deterministic instrument (216/222).** Still exactly ONE ellipse per call: the
throw is an offset, the length a radius, the softening an alpha. Path objects **day 107,933 →
107,858 (−0.07%), night 138,452 → 138,496 (+0.03%)**, and `shadS` itself 2790→2791 / 2934→2932 —
all inside the ±7 entity-population wobble. No timing A/B run: with no mechanism to price, it would
only have reported the weather.

**Verdict: SHIPPED.**

**⚠ A LAW THIS LAP PAID FOR — AN INK-WEIGHTED CENTROID MEASURES REWEIGHTING, NOT DISPLACEMENT.**
The first probe isolated the shadow LAYER correctly (render twice, once with `shadS` suppressed;
the difference IS every shadow, by construction — 161) and then took the **ink-weighted centroid**
of that layer, HEAD vs patch. It returned **the WRONG SIGN at evening on both seeds**, and an ink
ratio of **2.5x** where the geometry predicts 1.2x. Both are one artifact: a shadow on bright sand
contributes far more ink than one on dark asphalt, so when the shadows grow, the ink **reweights
across the city** and the global centroid moves for reasons that have nothing to do with how far
any shadow was thrown. ⇒ **A centroid over a whole frame is a statistic about WHERE THE INK IS, not
about WHERE ANYTHING MOVED.** When the claim is *displacement*, measure displacement **per object**
(or in the draw's own device-space coordinates), never as a global centre of mass — and treat a
**ratio that overshoots the geometry** as the tell that your weights, not your feature, are moving.
Promoted to SKILL.md.

**Banked for a later lap (an aside, per 212).** Seed 42, unprompted: at golden hour the interior
street grid *"darkens noticeably from accumulated tower shadows — atmospheric, not clutter."* Read
as fine today by both agents; if a later lap lengthens shadows further, that is where it bites.

## Iteration 226 — the people waiting for the bus were the last ones floating (2026-07-13) [People & activity × Polish]

**Vector** — People & activity × Polish. People was the stalest domain (last touched 210), and
the header banked 137's cue: *the static standing crowds are the last movers casting no
`shadS()` shadow* — made cheaper by 225, which taught `shadS` the sun's vector, so anything
given a shadow now inherits the whole day for free.

**The cue was HALF STALE — grep the seam, don't build to the pointer (a cue is a POINTER, NOT
A SPEC).** 163 had already closed it for the *moving/evening* crowd; its own comment at L5375
says so in as many words (*"closing 137's static-crowd gap"*), and the fete crowd and the
school-run crowd have had `shadS` all along. An audit of **every human figure in the file**
(via the head-circle idiom, `arc(...,0.5-0.9,0,7)`) found the true gap is narrower and much
sharper than the cue stated: what still floated was not the "static" crowds but the crowds
that **WAIT** —
- the **bus-stop queue** (L5007) — at every stop in the city, and drawn only when `LITAMT<0.55`,
  i.e. **in daylight**, exactly when a shadow should exist;
- the **rail platform queue** (L6203);
- the **stadium concourse crowd** (L4444).
The three **seated** crowds (cafe patrons, picnickers, amphitheater tiers) were deliberately
left alone: the artifact's contact-shadow idiom grounds a figure that STANDS on the ground.

**Change** — one `shadS` call each, in the house style, matching **163's shipped standing-crowd
constants** (`r=0.09, a=0.16`) for the queue; `0.07/0.14` on the platform deck (a bright, shallow
surface: a full-weight smudge there reads as dirt); the gull's `0.05/0.13` for the 1.2px stadium
specks. Drawn *before* the body so the figure reads on top, and *inside* the queue's `globalAlpha`
so the shadow fades as they board — a shadow must never outlive the figure that owns it (195).

**Census** — PASS, and vacuous as expected for a draw-only change: `pop` / `developed` / every
tile **+0**, histogram empty. ⚠ **But `solarRoofs` read `+1`, and chasing it found a real hole in
the harness, not in the edit:** `census.mjs` does `goto` -> `waitForTimeout(500)` -> read and
**never sets `playing=false`**, so the RAF loop runs a *wall-clock-dependent* number of `tick()`s
in that window (163's law (c), living inside the gate itself). The **same patched file** re-run
gives `+0`, then `-2`. A draw-only edit makes each frame a hair slower, so fewer ticks land —
**tick-sensitive metrics carry a +-2 wobble and it is NOT a determinism breach.** Core metrics are
unaffected. ⇒ **To test whether an unintended metric move is yours, re-run the SAME FILE — do not
diff against HEAD** (HEAD-vs-baseline was byte-clean, which made the edit look guilty).

**Probe — `probes/probe-queueshadow.mjs`** (the census cannot see this at all). One build, not
two: the new shadows are suppressed **by stack** (their three call-site line numbers) and the page
renders twice back to back with the clock frozen, so the diff **is** the change by construction
(161) at a noise floor of **exactly 0**, off the *final composited* canvas — which occlusion-checks
it for free (200). Over 2 seeds x 3 hours:
- **floor 0 · stray 0** in every row — the edit disturbs nothing it does not own (it draws no
  `rng()`/`Math.random`, so this is the strong form of the control);
- **106-113 waiting figures** per city — a real population, not three specks;
- the throw **swings with the sun**: morning **-0.18/-0.21 px (west)**, evening **+0.41 px (east)**,
  and **noon is the control that reads 0 by construction** (`SHOFF=0` there — 225's free
  dead-regime pin). The measured morning:evening ratio (**-0.44 / -0.51**) independently recovers
  `SHOFF`'s own ratio (**-0.36/+0.70 = -0.51**), which is a number I did not tune.

⚠ **225's centroid law recurs one level down, and it bit here: a raw left/right INK split is
biased by the SURFACE.** With `SHOFF=0` at noon the split read **63% / 72% west**, not 50/50 —
because a shadow on bright pavement carries more ink than the same shadow on dark asphalt, so the
split measures *reweighting*, not *throw*. Fixed by differencing each figure against **its own
noon**, at which point seed 7's noon control lands on an exact **50/50**.

**Probe 2 — `probes/probe-shadowparity.mjs`, and it is the one that decided the iteration.** The
first visual round FAILed with *"I cannot see it"*, and in the viewer's units (205) the agent was
right: **2.1 px of shadow per figure at fit zoom.** But "small" is only a defect if it is UNLIKE
what the artifact already ships — and the claim was never *"a big shadow"*, it was ***"the waiting
figures are grounded like every other figure in the city."*** So the control is **not a threshold I
choose** (205: a probe whose threshold is in the units of my own design constant grades its own
homework) — it is **the city's own already-shipped shadow**, isolated the same way, in the same
frame. Over 3 seeds, px per figure:

| group | figures | px/figure |
| --- | --- | --- |
| **queue (226, NEW)** | 106-113 | **2.1 / 1.9 / 2.7** |
| ped (the house standard) | 86-87 | **4.5 / 4.5 / 4.4** |

⇒ a waiting figure's shadow renders **about half a ped's**, same order, same idiom — so *"invisible
at fit zoom"* is a true statement about **every shadow in Solvista**, including ones shipped 60 laps
ago and never questioned. It is not an objection to this one. (163's strip crowd reads 0 figures at
`t=0.30` because it is an **evening** draw — correct, not a bug.)

**Perf — FREE, and settled by the deterministic instrument, not the timer (216).** Path objects
**day 107,854 -> 107,957 (+103, +0.096%)**, **night 138,451 -> 138,488 (+37)**. Night barely moves
because the crowds go home — the design. +103 path objects cannot cost a frame anything under the
measured per-path-object model (198), so the timing gate was not run: it would have reported the
weather.

**Visual — PASS on both seeds, blind... after the camera FAILed the gate TWICE and the feature never
did.** Round 1 aimed at the *busiest* stop: downtown, and a wall of towers stood in front of it (I
looked myself — the agent was right). Round 2 used **`openFront`**, which only tests the row at
`dy=+1` and **misses a tower two rows back** (211), so it picked another buried stop. Round 3 used
**`frontLoad(x,y)===0`** — and *still* landed behind a mid-height shop, because **`frontLoad` and
`openFront` only count `TALLT` types**, and a shop is not `TALLT` but is more than tall enough to
hide a person's feet. Round 4 aimed at the figure whose shadow **measurably renders the most ink**
(render with, render without, diff per figure, take the argmax) — and both seeds passed at once:
- seed 42's agent, blind, **picked the patched frame correctly** and described *"a small soft
  dark-brown ellipse hugging the ground right under the standing figures"*;
- seed 7's agent honestly could not split the golden-hour pair, **and saw the shadow plainly in the
  morning frame** — which is the stronger read, not the weaker one;
- **both, independently, on different seeds, reported the morning shadow falls LEFT** (= west,
  matching `SHOFF=-0.36`), and both called it ***"soft grounding, not dirt"***, of the same family as
  the tree shadows beside it. Both whole-city frames clean: no clutter, no z-order tears, no
  darkening. One aside, from a third agent and already banked: the elevated transit still *"reads as
  wireframe"* (the standing `polish-tile` cue (a)).

**Verdict — SHIPPED.** The last crowd in Solvista that stood on nothing now stands on the ground,
and because 225 put the sun into `shadS`, it got the entire day's arc for free: the queue's shadow
leans west at breakfast, sits under their feet at noon, and stretches east while they wait for the
evening bus.

## Iteration 227 — the twenty-fifth step-back finds a clean city and a lying HUD (2026-07-13) [holistic step-back]

**Vector** — Holistic step-back (the 25th; 222 was the 24th). No artifact vector: `solvista.html` is
**byte-identical to HEAD**. The lap under review is **223-226** (wash normalisation · the `TCAP` skyline
cap · `shadS` reads the sun · the waiting crowds get their contact shadow).

**Change** — **FIXED the step-back's own camera.** `probes/shot-stepback.mjs` froze the world
(`playing=false`) and never called `syncStats()` or `syncSky()`. Both are gated on the clock actually
running — `syncStats()` is only ever reached from inside the `if(playing)` branch (L7815), and `syncSky()`
self-throttles for 400 ms — so **every frozen frame kept the HUD and the CSS sky gradient it had at page
load, i.e. daytime.** This is 204's law, and SKILL.md has asserted for 23 iterations that this very file
already obeyed it. It did not.

**How it surfaced (212's law, paid an eighth time)** — Both step-back agents, on **both seeds,
independently**, read `DAYTIME / 0% NEW MOON` off a **night** frame with a crescent moon plainly drawn, and
seed 42 **FAILed the city for it**. The moon was the tell: the *canvas* drew the crescent from the live
`moonPhase()`, while the *DOM* still held the load-time string — one root cause, two symptoms, and the
canvas was right both times.

**Probe** — `probes/probe-hudfreeze.mjs` (new, tracked), three cases at the night pin `dayT=0.92`, seed 42.
Truth is `phaseWord(dayT)` / `moonWord(moonPhase())` recomputed in-page:

| case | HUD says | truth | |
| --- | --- | --- | --- |
| **A** frozen, exactly as `shot-stepback` freezes | `daytime` / 0% new moon | `night` / 5% waxing crescent | **STALE** |
| **B** same frozen frame + `syncStats()` | `night` / 5% waxing crescent | `night` / 5% waxing crescent | AGREE |
| **C** clock actually running (the real user) | `night` / 5% waxing crescent | `night` / 5% waxing crescent | AGREE |

**A stale while B and C agree** ⇒ the artifact is innocent and the camera lies. **The public site was never
wrong.** Fix is one line (`lastSky=0; syncSky(performance.now()); syncStats();` before `render()`), plus:
every frame now **self-reports its HUD** (`HUD=ok` / `HUD=STALE:<word>`) — 202's self-reporting law extended
from the canvas to the DOM, which is exactly the layer 200 warns the probes are blind to. Re-shot: `HUD=ok`
on all 8 frames, and both agents then **PASSed**, confirming the HUD matched its sky in every frame.

**Census** — PASS, 0 page errors, `solvista.html` untouched (`git diff` empty). pop 178,626 · developed 6,064
· roads 5,775 · towers 432.

**Perf — the lap is FREE, and the arc did not move.** Two instruments; where they disagree, 216 says take the
one with a mechanism:
- **Path objects (deterministic, load-immune):** day **108,007 -> 107,959** (-0.04%) · night **138,734 ->
  138,520** (-0.15%). **Flat, slightly down.** Mechanism: 223 is colour-only (zero objects), **224's `TCAP`
  *removed* tower bands**, 225 keeps `shadS`'s primitive count (it re-aims the ellipse; cost is
  area-independent per 198), and 226 adds a few hundred shadow ellipses — the cap and the shadows nearly cancel.
- **Timer (interleaved A/B vs 222 `7bfe1e2`):** day +1.5% · night +0.7% — **no mechanism; the weather.**
- **ARC** (same refs as 202/207/212/217/222, directly comparable): vs `7e2ac2c` (177, 50 iters) **+16.5% /
  +11.5%**; vs `5f01426` (162, 65 iters) **+16.9% / +12.7%**. Against 222's +15.0/+12.2 and +15.9/+13.3 that is
  **unmoved within the day column's noise**, which is what the flat object count predicts. Abs: day 40.9-41.9ms
  · night 47.7-48.2ms. Arc rate still ~+0.3%/iter, diffuse. **ACCEPTED — do not open a perf lap.**

**Visual** — Both seeds **VISUAL: PASS** (after the camera fix). The city still reads as a coherent, balanced
coastal diorama at day, golden hour, night and winter; both agents independently identified the winter frame
from vegetation colour alone. **Mining the asides** (212 — the asides are where an agent is right):
- **(af) TOWER/MID FACADE WALLPAPER — confirmed by BOTH agents on BOTH seeds, unprompted, for the second
  step-back running.** *"a repeating field of identical horizontally-banded slabs with little silhouette
  variety"* (7) · *"the drum-roof block is genuinely over-used and is the element most at risk of compounding
  further"* (42). Now sighted by **six** agents across 222/224/227, and 227's pair indict the **MID drum-roofs**
  as well as the towers, both naming **SILHOUETTE/roof variety** rather than colour. **It is the loop's loudest
  open cue and should be the next Urban lap.**
- **(s) GOLDEN HOUR IS THE WEAKEST FRAME — also both agents, both seeds, unprompted.** *"the orange grade
  collapses roads, roofs, sand and grass into one narrow tan/salmon band"* (42) · *"muddy tan-brown ...
  desaturated/washed rather than warm"* (7). Independent re-derivation of 217's finding: the complaint is
  **contrast collapse across surfaces**, not the sun's position. Cue (s) stands and **strengthens** — but its
  constraint binds: **the sun cannot simply be lowered** (200 put it high on purpose; the placard owns the
  low-left sky).
- **NEW, banked as cue (ag): the night greens stay hot.** Seed 7, unprompted: *"the land base reads flat
  purple-grey and the parks/farms in the middle stay oddly bright green, breaking the night mood."* This sits on
  222's ladder invariant (*no UNLIT surface may out-brighten the LIT ones*) and on 223's live watch item
  (*PARK<->ROAD separation is 14, just under the ~15 collapse floor*). **Do not gate it on a pairwise separation
  — 221 proved separation rewards the bug.** Nature/Water × Polish.
- **Cue (w) is BIGGER than recorded — re-measured at 227.** 214 logged the shipped mojibake as two sites; a
  re-grep for non-ASCII in *rendered* JS string literals finds **at least eight, including the STATS PANEL**
  (`elTall`'s em-dash at L7320, on screen at all times, and `cafes`' acute-e at L7430). Still live on the public
  site, still invisible to every `file://` shot.
- Known non-bugs, re-reported: the sub-pixel elevated transit reading as *"cables terminating in mid-air"*
  (polish-tile backlog (a) — z-order cleared **four** times now; the fault is legibility, and 215's law names the
  lever: **a hairline needs a BODY**).

**Verdict — FIXED.** The city is clean: 226 iterations in, both seeds pass a whole-frame read at three lights
and two calendars, the census is flat, and the arc has stopped advancing. What was broken was the instrument
that watches it — and it had been broken, in a way SKILL.md explicitly denied, since the camera was written. A
step-back that finds nothing wrong with the city and one thing wrong with its own eyes is the step-back working.

## Iteration 228 — the towers all wore the same hat (2026-07-13) [Urban fabric × Polish]

**Vector.** Urban fabric × Polish. Cue **(af)** — the loudest in the ledger: six agents
across 222/224/227, both seeds, every time unprompted, called downtown wallpaper. Every
one of them named the **SILHOUETTE** and the **ROOF**; not one named colour or banding.

**Probe first (the loop's first law), and it RELOCATED the bug.** `probe-facade` was the
banked instrument, and it is the WRONG one: it measures stripe RHYTHM, and it had already
measured TOWER *innocent* (42-47 rhythms, top 6%) while six agents went on pointing at the
towers. Both are true — **a tower can wear a unique stripe rhythm and still be the same
SHAPE as every other tower.** So the cue needed a new instrument, not the banked one (*a cue
is a POINTER, NOT A SPEC*). `probes/probe-crown.mjs` wraps `drawBuilding`+`prism`+`bandR` and
records the massing the frame ACTUALLY draws (build-agnostic: runs unchanged on HEAD and
patch). HEAD, 3 seeds, ~101 towers each:

- **TOWER: 4.0 distinct CROWNS city-wide, top share 40.8%** — and **41% of towers `flat`**.
- MID: **32.3 crowns, top 11.3%** — already richly varied by 216. **227's indictment of the
  MID drum-roofs does not survive measurement** (212's law: grade the FAIL by measuring it).

Iter 110 decoupled a tower's COLOUR from its silhouette (4 forms x 5 bodies). What it never
decoupled is **what sits at the ROOFLINE**, which stayed a property of `style` — and styles 1
and 3 put their setbacks low down and then simply **STOP**. The eye reads a skyline by its
**TOPS**, so downtown had a crown vocabulary of four.

**...and the `flat` bucket was the real find.** The fix took crowns 4 -> 17 and the 41% `flat`
bucket **did not move** — a number that will not move is a tell that the INSTRUMENT is deciding
it. It was: `flatShort` (crownable-but-bare) is **0**, and every `flat` tower is an **h>90
helipad tower** — invisible to a prism/bandR hook because the helideck is raw `ctx.arc`. That is
**~40% of the tower stock (54/134, 44/102, 25/68) — the TALLEST towers, read hardest against the
sky — all wearing ONE identical bare deck.** Stopping there would have been **217's law exactly**
(a fix to one clause, mistaken for a fix to the phenomenon).

**Change.** The crown becomes the **fourth independent seed-salted axis** (`towerLook.crown`), so
any massing can wear any crown: **4 styles x 5 bodies x 5 crowns**. New `towerCrown()`: cornice /
roof garden / mech penthouse / stepped cap / **spire** (a SOLID tapered needle on a plinth — 215's
law: a hairline ornament needs a BODY). The helipad towers keep their deck (`heliPads` is real world
data — the city helicopter lands on those roofs), but it now rides a **plinth** from the same hash
(parapet / stepped cap / bare). Mast suppressed under a spire; helideck ineligible for spire/garden.
Draw-only: `hashCell`, no `rng()`, no terrain.

**Census.** PASS. Core flat (`pop`/`developed`/`roads` +0), **tile histogram empty** — correct for
draw-only. `solarRoofs -2 / greenRoofs -1 / towerHt +1` is the harness, not the edit: **re-running
the SAME FILE** gave `-1 / -1 / +0` (226's law — do NOT diff against HEAD to test this).

**Probe.** `probe-crown.mjs`, 3 seeds:

| | crowns (distinct) | top crown share | crownable-but-bare |
| --- | --- | --- | --- |
| **TOWER** HEAD | 4.0 | 40.8% | 41% |
| **TOWER** patch | **18.3** | **15.3%** | **0** |
| MID (control) | 32.3 -> **32.3** | 11.3% -> **11.3%** | 0 |

MID is **byte-identical** on every number — the control holds. The tower crown is now as varied as
the mid-rise crown 216 built.

**Cost.** Priced by **COUNTING PATH OBJECTS** (222 — never by reading the diff): day **108,888 ->
108,905 (+17, +0.016%)** · night **139,401 -> 139,452 (+51, +0.037%)**. **FREE.** Hold-the-mean (98/216)
did the work: two per-style roof prisms came OUT, five crowns averaging ~1.4 went in.

**Visual.** Blind A/B, both seeds, **order flipped between them**, asking agents to COUNT roof shapes
(a quantity the projection PRESERVES — 224 forbids asking them to judge by height/position). Both
PASS, no z-tears, no floating, no blown colour. **Seed 42 (A=HEAD, B=patch) picked the patch, clearly**
— "2-3 vs 6-7", naming the exact five crowns shipped (stepped setback, tapered needle, cornice lip,
penthouse, green roof) and calling HEAD's deck *"a stamp repeated across the skyline"*, which is the
40%-helideck defect found **independently, by eye**. **Seed 7 (A=patch, B=HEAD) picked HEAD** — and its
read is **refuted by the draw**: it claimed HEAD shows *"spire/needle, penthouse, stepped cap, cornice
rim"* and *"teal/olive helipad discs"*, **none of which HEAD contains** (its 4 crowns are sage garden /
sage cap / bare / deck). It confabulated the patch's vocabulary onto both frames. ⚠ **Both agents picked
"B"**, so the blind A/B carries position bias and is WEAK evidence; the verdict rests on the draw census,
which is not a matter of interpretation.

**Verdict: SHIPPED.** Cue (af) — the loudest cue in the ledger, six agents, three step-backs — is CLOSED.

## Iteration 229 — the bug was in the camera, not the city (2026-07-13) [Interaction/UX × Polish]

**Vector.** Interaction/UX × Polish — the stalest column (last touched 191). The header ordered this lap
explicitly: cues **(w)** (*"a LIVE mojibake bug is SHIPPED ON THE PUBLIC SITE"*, the ledger's **#1 🔴 cue**,
escalated across three step-backs and re-measured at 227 as *"~4x bigger than recorded"*) + **(z)** (the HUD
clips `TRANSIT REA[CH]`), *"one tidy HUD lap, and (w) is the cheapest real user-facing win in the ledger."*

**Both cues were FALSE. The mojibake was being manufactured by our own screenshot server.**

**Probe first (the cue is a POINTER, NOT A SPEC).** Cue (w) makes a checkable claim about the *deployed* site,
and how a document decodes is decided by, in order: (1) the HTTP `Content-Type` charset — **overrides
everything**; (2) a `<meta charset>` in the first 1024 bytes; (3) sniffing / windows-1252 fallback. One command:

```
$ curl -sI https://www.alecsharpie.me/solvista/solvista.html
content-type: text/html; charset=utf-8          <-- GitHub Pages DECLARES it
```

⇒ **The public site has never shown mojibake to anyone.** `probes/probe-charset.mjs` then served the *same
bytes* three ways and read the strings back **as the JS engine decoded them** (the inline `<script>` is decoded
with the document, so a mis-decode corrupts the string *literals*, which is what lands in the DOM):

| case | `document.characterSet` | `TILEDESC[T.COM]` |
| --- | --- | --- |
| A  `file://` (every probe, `hovershot.mjs`) | UTF-8 *(sniffed)* | `cafés` — **clean** |
| B  http `text/html` — **`shoot.mjs`'s server** | **windows-1252** | **`cafÃ©s` — MOJIBAKE** |
| C  http `charset=utf-8` — **GitHub Pages (measured live)** | UTF-8 | `cafés` — **clean** |

**The harness had three load paths and had never reconciled them.** `shoot.mjs` **creates** the bug (no
charset ⇒ 1252 fallback); `hovershot.mjs` + every probe load `file://` and **hide** it (Chromium sniffs UTF-8);
the deployed site is **neither**. So for 95 iterations the loop looked at its own screenshots, saw `cafÃ©s`,
and filed it against the artifact — and **every re-measurement re-confirmed it, because every re-measurement
used the same broken instrument.** 134 saw this in an http shot and wrote a *discipline* ("keep every JS
literal pure-ASCII") where a one-line *structural* fix existed; the discipline was then silently violated **12
times**, and the ledger promoted the violations to its loudest cue.

**Change (1 line).** `<meta charset="utf-8">` at line 1 — so the file **describes its own encoding** and no
longer depends on the server. This is the right fix even though no user was affected, because
`solvista.html`'s entire premise is *a single self-contained file, no build step*: **a "self-contained" file
that only renders correctly when the server happens to declare its charset is not self-contained.** It also
**stops the instrument lying**, which is worth more to this loop than the bug was. Per 223: *prefer a
structural invariant to a checked one — a drift you make impossible beats a drift you agree to look for.*
⇒ **134's pure-ASCII rule is REPEALED in SKILL.md** (raw UTF-8 in literals is now safe; do not hand-escape).

**Cue (z) is REFUTED.** `probes/probe-hud.mjs` (pure DOM — every probe in `probes/` reads the canvas and is
**blind to this layer**, 200): `scrollWidth > clientWidth` per stat, plus each box's overrun past the viewport,
swept 1600 → 1400 → 1024 → 820 → 640 → 390 (the step-back's width down to the `mobile` framing). **0 clipped
labels at every width; the card always fits with >=20px spare** — the `.opt.sm`/`.opt.md` media queries drop
stats as the viewport narrows, exactly as designed. A blind agent on seed 7, unprompted, independently agreed:
*"TRANSIT REACH ends comfortably inside the card's right edge."* I also tested the plausible coupling — that
mojibake *widens* glyphs (`—` 1 char -> `â€"` 3) and could overflow the flex row — and it does not: at
`warp=61` the em-dash placeholder never shows (the city has floors to report).

**Census.** PASS, `pageerrors: 0`. Correctly **vacuous** — a `<meta>` tag touches no terrain, no `rng()`, no
draw call. **Zero path objects; free by the cost model, no perf lap needed.** Control: `document.compatMode`
is `BackCompat` on **both** HEAD and patch — the meta tag did not disturb the document mode (only a DOCTYPE
would). *(Banked, NOT a cue: the file is in **quirks mode**. It has been for 229 iterations and the layout is
tuned inside it — adding a DOCTYPE would reflow the whole HUD. Do not "fix" it as a drive-by.)*

**Visual.** `probes/shot-charset.mjs` — a new camera that pins the **harsh** condition on purpose (http, no
charset = byte-for-byte `shoot.mjs`'s header), because the harness's own cameras disagree about this defect.
Blind A/B (neutral filenames, agents asked to **transcribe, not judge** — so a wrong answer is *visibly*
wrong against ground truth I held):
- Blind transcription agent: read `tooltip-A` as `Street-level shops and cafés.` and `tooltip-B` as
  `Street-level shops and cafÃ©s.`, named B's corruption as *"UTF-8 'é' decoded as Latin-1"*, and returned
  `CLEAN: tooltip-A` — **A was the patch.** Exactly matches the strings the probe read.
- Seed 42 whole-frame before/after: canvas **identical** (only ambient boat drift, correctly attributed), the
  one difference being the tooltip text. `VISUAL: PASS`
- Seed 7: tooltip clean, every stats label *"fully visible, none clipped"*, city coherent. `VISUAL: PASS`

**Verdict: FIXED.** The artifact is now self-describing under **every** serving condition (asserted by
`probe-charset.mjs`, which FAILs unless all three cases decode UTF-8), the ledger's #1 cue is closed as a
false positive, cue (z) is closed as refuted, and a wrong invariant is off the books.

⚠ **THE LAW (promoted to SKILL.md): a defect only your HARNESS can see is a defect IN your harness —
reproduce it in the USER'S configuration before you believe it is the artifact's.** *One `curl -sI` would
have refuted the loop's loudest cue at any point in 95 iterations.* And note what this implicates: **cues (y)
(the "scorched" hex cluster) and (s) (golden-hour "mud") were also born from agents reading `shoot.mjs`
frames** — the same camera that manufactured this one. Reproduce them before designing to them.

## Iteration 230 — the cars never went home (2026-07-13) [Transport × Deepen]

**Vector.** Transport was the stalest domain (last touched at 211) and the ledger had no 🔴 cue
left, so I greped its seam instead of taking a banked one (225's law: the saturation notes record
where you have *looked*, not where there is nothing to find). The tell was sitting in `syncFleet`:
the city's PEOPLE learned to go to bed — the windows at 199 (`BEDT`), the crowd, its dogs and its
runners at 210 (`curfewAt`) — and its TRAFFIC never did. At 3am the streets still carried the same
**38 cars, 16 cyclists, 7 delivery vans and 6 streetcars** they carried at 5pm, because every fleet
count is a pure function of `roads.length` and nothing else. And the `taxi` flag — ~1 in 6 cars,
flagged ever since it got its lemon livery — had never MEANT anything but a colour.

**Change.** The traffic keeps hours too, on the *same* clock the crowd already uses (`nightAmt()`:
0 all day, ~1 in the small hours, and closed off at dawn by `LITAMT` because `nightDeep` alone is
monotone and can never end a night). One shared predicate, `vehHidden(v)`, read by `drawVehicle`
— one predicate, one definition. The hour is per VEHICLE, not per cell (a positional hash makes a
mover blink as it crosses a hex — 210's finding, and a car crosses hexes constantly), and it thins
by CLASS, because a class is what a shift IS: `VCURF = {bike:[0.10,0.45], truck:[0.16,0.50],
tram:[0.45,0.90], car:[0.35,1.00]}` — the vans finish their round first, then the cyclists; the
streetcars fall back to a night service (the jitter runs past 1, so a few keep running all night);
ordinary cars thin, but a street never empties.

Three classes keep NO hour, and each is a decision rather than an omission: the **bus** (a night
service is real, and `stepVehicle` stamps the stop queue whether or not the bus is *drawn*, so
hiding one would empty a queue nobody ever came for — 226's waiting crowd); the **service fleet**
(staying out is what it is FOR — 204); and the **taxi**. The cab is the point: as the ordinary
traffic goes home it stays out, so **the cab's share of the cars still on the street climbs through
the night** — the same city, read at 3am, is a city of taxis. That is an interconnect, not a new
object: nothing is spawned or despawned, and the flag that had been decorative for ~200 iterations
now does the work. Its tooltip reads the same `nightAmt()` its rule does (123's *run the tell
FORWARDS* — the label and the rule share ONE number, so they cannot drift): *"The night shift —
still for hire once the traffic has gone home."* A vehicle that has gone in is not hoverable
either, for free — it returns before `stamp()`, so `consider()` drops it on the `_sf` test.

**Census.** PASS. Every metric **+0**, tile histogram **empty** — the correct and nearly vacuous
result: the hours come from `Math.random` at spawn (exactly as the taxi flag does), never `rng()`,
so the seeded stream is byte-identical. The iteration rests on the probe.

**Probe** (`probes/probe-nightfleet.mjs`, 3 seeds). **A** — the city is built ONCE per seed and only
the HOUR is swept, so the fleet is held fixed and the visible mix is a pure function of the clock:
`bike 16/16 → 0/16 · truck 7/7 → 0/7 · tram 6/6 → 2–3/6 (the night service) · car 28/28 → 4–8 · bus
and taxi unmoved`; on-street **70 → 19–24**. **CAB SHARE of the cars still out: 13.0% → 41.1%**
(mean of 3 seeds) — the claim, in the viewer's units. Control: `nightAmt()` is 0 all day *by
construction*, so **every class reads 100% visible at day on every seed** (199's free dead-regime
control). **B** — they must actually stop RENDERING, not merely test hidden: at 3am **46–51 of 70**
vehicles are in, worth **2,006–2,366 px** of ink off the final composited canvas (occlusion checked
for free); the identical pair at day is **0 hidden, 0 px**.

⚠ **B is isolated WITHIN one page, and it had to be.** The obvious patch-vs-HEAD diff *cannot see
this feature*: two loads of the SAME file drift by thousands of px through `genWorld`, and ~45
hidden vehicles are worth about the same — its DAY control, on provably inert code, read **11,721 px
against a 7,034 px floor**. Two renders inside one page are byte-identical (measured: **0 px**), so
the fix was to isolate by **mutating the DATA** instead of swapping the build: render the night as
shipped, clear every vehicle's hour (`v.out = undefined`), render the same frozen world again — the
difference IS the traffic that went home, at a floor of exactly 0. (⇒ new law in SKILL.md.)

**Visual.** The first pass FAILed — and it was the **camera**, not the city: at fit zoom a vehicle is
a few px, and the agent *correctly refused to count them* rather than inventing a number (201: a wide
frame is not a framing). So I aimed (`probes/shot-nightfleet.mjs`): freeze, put the whole fleet back
on the road and render once to stamp the true DRAWN positions (a vehicle that has gone home leaves
no `_sx` at all — the thing to point the camera at is precisely the thing that leaves no trace),
take the argmax knot of departing traffic, centre on it at 4.2x, then let the hours back in. Shot as
a **blind A/B** of the identical frozen hex at the identical instant — shipped vs full-fleet — with
the letters **swapped between the seeds**. Both agents, independently, picked the **correct** frame
and picked **different letters** (X on 42, Y on 7 — so not positional guessing): *"Every object that
vanishes is exactly the right class: all 4 cyclists, the delivery van, and three ordinary cars —
while the taxi, the bus and the ambulance are pixel-identical in both."* Both read the street as a
living night city (headlights, lit panes, the streetcar glowing along its rail), no tears, no
floaters. **VISUAL: PASS ×2.**

**Perf.** FREE — and for once it gives a little back. Graded on the deterministic instrument (216:
path objects, not the timer), hours-on vs hours-off in one page: **day exactly 0** on all three seeds
(byte-identical, as the code proves) and **3am −1,303 to −1,493 path objects**. This is the first
iteration in the arc that *removes* night draw work instead of adding it.

**Verdict: SHIPPED.**

## Iteration 231 — the bowl was picking the lot they were about to build on (2026-07-13) [Civic & culture × Polish]

**Vector.** Civic & culture × Polish. Civic was the stalest domain (last vector 213) and it held a
banked, measured cue — **(t): "the amphitheater is buried on some seeds"** — with the fix already
characterized (a PREFERENCE, never a gate: it is a one-per-city tile and a hard gate could starve it
to zero). A banked finding outranks kind-rotation (119), so this was the lap.

**The cue understated it.** `probe-amphgrow` / `shot-amphsite`, 6 seeds: the siting rule scanned
`i=0..G*G` in RASTER order and took the **first match** (`break`). That is not a siting — it is a bias
toward **low y, the BACK of the plate**. Out of **147–173 qualifying candidates** the bowl landed in
**row 2 or 3 on ALL SIX SEEDS** (the plate spans ~67 rows). Its own comment claimed it was *"sited by a
deterministic hashCell scan"*, but `hashCell<0.6` only **thins** candidates — raster order **chooses**.
Measured occlusion (`probe-amphvis`: suppress the host's own `drawCell` in ONE page, `occluded% =
1 − inkInPlace/inkOnTop`, floor **exactly 0**): mean **39.4%**, and **seed 7 rendered 4 px of its 260
(98.5% occluded)** behind a wall of five mid-rises. ⚠ **Iter 168 spent a whole Civic lap giving this
bowl a spotlit performer and a lit stage — on a tile that, in one city in six, showed you four pixels.
Polish the VISIBILITY before you polish the DRAW.**

**Two wrong turns, both measured, both instructive.**
1. **`frontLoad` is the wrong instrument** (226's law, paid for again). Scored by it, the bowl moved but
   the ink barely did (**39.4% → 37.4%**): `frontLoad` counts **TALLT MEMBERSHIP, not HEIGHT**, and RES
   is not in TALLT at all — so a bowl at `frontLoad` **0** still read 36% buried behind two h11 houses,
   and one at `frontLoad` **2** read **81%** buried behind an **h80 TOWER at dy=+2**. Hence `groundLoad`:
   sum the drawn **height** in the two rows in front, near row doubled. Both rows are load-bearing — a
   dy=+1-only variant measured **worse than no rule at all** (32.4% vs 24.4%), clearing the near kerb and
   walking into a tower one row back.
2. **And `groundLoad` on TODAY's heights STILL shipped a bug — the sweep had let the variants see the
   future.** The first sweep graded candidates against the **mature 2035** city and crowned it at 8.4%;
   shipped, it measured **27.7%**. The rule fires at **year 2004** and every frame renders **2035**.
   `probe-amphgrow`: scored on the young city, **all six seeds found a front of `groundLoad` ZERO** — so
   the **hash broke the tie**, and a **vacant lot's** frontage won as often as a road's. But a vacant lot
   beside a road and a park is the most developable land in the city: by 2035 two had become `RES:16
   COM:21` and `COM:18 TOWER:89`. **The rule was selecting for its own burial.** Four seeds stayed clear
   only because their fronts were ROAD / WATER / SHOREPARK / ROCK — things that *can never be built on*.

**Change.** `groundLoad(x,y)` (beside `frontLoad`, which keeps its tuned bus-shelter job and now carries
a ⚠ pointing here): sums the height in the two rows ahead, near row doubled, reading **`c.th`** (the
TARGET) — never `c.h`, which `drawBuilding` animates at DRAW time and would couple the world to the
render clock. A **`RAISEABLE`** lot (EMPTY/MEADOW/FARM/BURNT) counts at a nominal **`FUTUREH`**: *an empty
lot in front of you is not a clear view, it is a building that has not been built yet.* The amphitheater
rule now **scores every candidate and takes the least buried**, hash as tie-break (it is the jitter now —
what the old `<0.6` filter was really for). **`FUTUREH`'s magnitude is NOT load-bearing** (30 and 60 pick
identically on every seed); all that matters is buildable = nonzero, permanently-open = zero. It is a
**PREFERENCE, not a gate** (206): if every candidate is buried the best still takes it, so the bowl can
never be lost — **placed 6/6 on every seed measured**.

**Probe** (`probe-amphvis`, 6 seeds, floor 0 on every row — HEAD → shipped):
mean occluded **39.4% → 8.1%** · worst seed **98.5% → 20.9%** · buried (≥60%) **1/6 → 0/6** ·
visible ink **157px → 234px** (92% of the 255px it draws) · population **6/6 → 6/6**.
Seed 7 — the city that showed four pixels — now renders **244 of 251**.

**Census.** PASS. `developed` −9 (−0.15%), `roads` −4, `civicKinds` +0, `CIVIC 83 → 84`. But `TOWER
432 → 402 (−6.9%)`, `towerHt −6.1%`, `pop −3.9%` — same land, building *shorter*, which looks exactly
like a directional skyline tax, and a 7% skyline tax to unbury one tile would be a bad trade. **It is the
chaos, not the change** (`probe-cascade`, paired over **10 seeds**): mean TOWER **+1.4 (UP)**, mean pop
**+1.07% (UP)**, mean developed −0.09%, and only **3/10** seeds lose towers — swings of −24 and +22 sit
side by side. The 3-seed census matrix simply drew two of the worst. ⚠ This **refutes the tempting
inference from 218**: the tower *roll* is saturated, but the tower *predicate* (`com>=2`) reads a COM
layer that is itself `rng()`-sited, so a stream reshuffle **does** move the skyline — chaotically, ±15%
per seed, centred on zero. **No draw primitive is added; the bowl relocates one cell.**

**Visual.** PASS ×2 (blind LOCATE, HEAD vs patch, each build aimed at its OWN bowl). Seed 7 BEFORE:
*"I cannot find the amphitheater. The camera is pointed at it and the towers own the whole view.
Essentially invisible."* AFTER: *"found immediately at ~0.49/0.52 … fully visible."* Seed 42 BEFORE:
*"only the top arc reads … easy to mistake for a plaza."* AFTER: *"mostly visible … a real improvement,
not a total fix"* — which matches the residual 20.9% exactly. Grid seating clean, no z-order tears, no
floating, the land/water edge reads as a bank. Both agents independently noticed the tower re-roll and
called it *"a small, coherent re-roll, not damage."*

**Banked (new cue (ah)).** Seed 42's agent, unprompted: the bowl now often sits on the water's edge, and
its **cavea has a FIXED orientation** — *"facing the bowl toward the river would look far more
intentional."* The tiers are drawn at one hard-coded angle regardless of what the bowl faces. That is
199's tell on a **draw**, and it is the natural Civic × Deepen follow-up. (Also: 5/6 seeds now put the
bowl on a water/shore front, because permanently-open fronts are what the rule rewards. It reads well —
a seaside bowl — but if it ever reads as monotony, that is the cause.)

**Verdict: FIXED.**

## Iteration 232 — the twenty-sixth step-back finds the city has no edge (2026-07-13) [holistic step-back]

**Vector** — the 26th holistic step-back (pre-registered in the header at 231). No
source change to `solvista.html`: a step-back measures, banks, and hands off.

**Census** — PASS, no page errors. (The histogram delta is 231's amphitheater
siting plus chaos wobble against its pre-change baseline; `probe-cascade` already
established at 231 that its scary `TOWER −6.9%` is centred on zero.)

**Perf — lap COSTS DAY ONLY, and it has a MECHANISM.** Timer (interleaved A/B vs
step-back 227, `b953e7d`): **day +1.1% · night +0.0%**. Because a timing delta with
no mechanism is the weather (216), I ran the deterministic instrument too, and the
two **AGREE**: path objects **day 107,959 → 109,247 (+1.2%)**, **night 138,520 →
138,668 (+0.1%)**. So the cost is *real* — and the asymmetry names its own cause:
**228's tower crowns add objects in both regimes, while 230's night curfew removes
vehicles at night and cancels them.** Night flat, day up. Paid and accepted.
ARC (same refs as every prior step-back): vs `7e2ac2c` (177, 55 iters) **+16.4% /
+11.9%**; vs `5f01426` (162, 70 iters) **+17.9% / +13.7%** — **+1.0pp on both
columns across 228-231**, dead on the documented ~+0.2%/iteration. Diffuse, not
accelerating. **Do NOT open a perf lap.**

**Visual — 2 seeds × 4 frames (day / golden / night / winter), `shot-stepback.mjs`,
clock frozen in-page, every frame self-reporting `HUD=ok`.** Both agents FAILed.
**Both FAILs were refuted, and both asides were real** — the fail/aside law's
cleanest instance yet, and its **eighth payout running**.

**The FAILs (both wrong):**
- *"Winter is indistinguishable from day"* — **both seeds. REFUTED by `probe-season`
  for the THIRD time** (217, 227, 232). The calendar is not merely alive, it is
  *louder* than when it was banked: FARM **92.1**, SHOREPARK **52.6**, ORCHARD 41.9,
  VINEYARD 34.9, with the ROAD control at **0.6**. Six agents have now made this
  claim and one probe has refuted it three times.
  **But 232 measured WHY they keep saying it, and the diagnosis is now exact: THE
  LOUD TILES ARE RARE AND THE COMMON TILES ARE QUIET.** FARM moves 92.1 across only
  **122 hexes**; **PARK, at 574 hexes, moves 22.4, and FOREST (232 hexes) 19.1.** The
  frame is dominated by exactly the surfaces that barely answer the calendar. That
  sharpens cue (ab) from "they're wrong" to a specific, actionable target — and it
  confirms the fix is a bigger seasonal **surface**, never more amplitude.
- *"Golden hour crushes the city into muddy sepia"* — seed 7. This is the banked,
  **CONSTRAINED** cue (s), now raised at four step-backs running. Nothing new.

**The ASIDES (both real — and one of them is the find):**
- 🔴 **THE CITY HAS NO FRINGE — and it is worse than they said.** Both agents,
  blind, on different seeds, unprompted: *"the far edge terminates in an abrupt flat
  line of buildings with no suburban fade — the city ends rather than trails off"*
  (42) · *"no hinterland left. Density runs edge-to-edge right up to the dune line;
  no fringe, no thinning, no open country"* (7).
  **Measured it (`probes/probe-fringe.mjs`, new — pure world data, 6 seeds, no
  render/clock/noise floor), and the probe did not refute them: it AGREED and found
  the sign INVERTED.** Developed share of land by distance inward from the plate rim
  (sea excluded from the denominator, or a seaward rim would fake a fringe):

      DEVELOPED % OF LAND    rim 0-2   3-5   6-8  9-12  13-17  18-33
      MEAN (6 seeds)            46.5  39.4  40.6  38.3   34.4   41.3
      WILD % OF LAND            13.4  10.6   9.8   8.1    4.5    8.0

  **Rim 46.5% vs deep interior 41.3% ⇒ taper −5.3 points.** The city is not merely
  missing a fringe — it is **more built-up at its outermost ring than in its middle**,
  on **5 of 6 seeds**, with wild land at the rim only 13.4%. The diorama's boundary is
  a wall of buildings meeting the void. Banked as cue **(ai)**, with the two traps the
  lap that takes it must not walk into: **218** (the rim carries ~20x more land than
  the core, so "develop less at the rim" is a pop cut over the *largest* bands — price
  it with `probe-cascade` first) and **219** (a spatial preference must be pure
  addition; `COM` is the substrate towers stand on, so a naive rim cut compounds).
  ⇒ **Prefer ADDING a hinterland to SUBTRACTING a city.**
- ⚠ **The pre-registered TOWER SILHOUETTE trigger FIRED.** The header had written, in
  advance, *"the next Urban lap if the towers are ever called wallpaper again"* — and
  both agents, both seeds, unprompted, did exactly that (*"the same horizontally-striped
  slab… the single biggest thing flattening the skyline"* · *"variety in plan but not in
  MASS/HEIGHT/FOOTPRINT"*). Banked as **(af′)**. ⚠ And per 228's own law, **re-derive
  the instrument from the complaint's nouns**: they said SILHOUETTE/MASS/FOOTPRINT, and
  `probe-crown` measures the CROWN — the thing 228 already fixed. A banked probe must
  not be allowed to acquit the thing the agents keep pointing at.
- The elevated transit reads as *"scratches over the image"* on both seeds, with seed 7
  adding the floating clause (*"no visible pylon at their seaward end"*). This is
  `polish-tile` BACKLOG (a), unchanged: z-order is CORRECT and cleared four times now —
  **the fault is legibility, and the lever is a BODY (215), not more strokes.** Not a
  growth lap; do not re-open the z-order.

**Verdict** — **FIXED** (the loop's memory, not the artifact): city clean, arc unmoved
and mechanistically explained, both FAILs refuted by measurement, and the step-back's
real yield is a **measured, inverted-sign compositional defect** that ~230 iterations of
additive growth had quietly produced and that no per-lap gate could ever have seen. This
is precisely the drift a step-back exists to catch. **233 should take cue (ai).**

## Iteration 233 — the fringe is boxed between two gates (2026-07-13) [Nature × Deepen]

**Vector.** Nature (stalest, 221) × Deepen, taking cue **(ai)** — the ledger's only
MEASURED cue and its #1: *the city has no fringe, it is DENSEST AT ITS RIM* (232, two
blind agents, two seeds, unprompted; taper **inverted**).

**Probe first, and it moved the whole design (`probes/probe-fringehost.mjs`, banked, 6 seeds).**
The obvious fix — steer development away from the rim — is **impossible**, and the probe
says so in three numbers:
- **The parcel roll is 100.0% SATURATED on every seed.** Not one eligible cell is left
  unbuilt anywhere in any city. Per 218 `p` is a **DEAD lever**: the city is exactly
  "every lot within 2 hexes of a road", and only the **PREDICATE** can steer it.
- **ROAD is FLAT across rim bands** (29.5% of land at the rim, 33.6% deep). So the parcel
  rule is **INNOCENT** — 218's host-layer law: it faithfully fills what the roads reach,
  and *the roads reach the plate's edge*.
- **The dev budget has SLACK** (1153 used / 1382). ⇒ **A held-back rim lot is NOT re-spent
  inland.** There is no free redistribution; pop falls ~1:1 with cells held. This is the
  fact that kills the elegant version of this vector, and it is the first thing to check.

**Change (built, gated, REVERTED).** `greenbelt(x,y)` — a **fixed spatial mask**, not a
roll (a mask cannot saturate) — over the plate's outer rings, read by **three rules, one
definition** (112): parcels may not subdivide a held lot, **logging may not clear its
woods** (>=2 road/DEV nbrs *is* the rim, so without this the fringe is felled as fast as
it grows), urbanization may not sell its fields. Roads untouched, so the lanes still
thread to the edge and the corridor/monorail/gondola passes stay byte-identical.

**Census.** PASS at the shipped tuning (`developed -4.4%`, `pop +8.2%`, `roads -1.0%`, 0 errors).

**THE BOX — why it died.** Three shapes were built and shot, and the two gates close on it
from opposite sides:
- **Strong enough to READ as country ⇒ the census core gate COLLAPSES.** `developed`
  is a **core** metric and this vector's *purpose* is to remove developed cells. Every
  tuning that took the rim below ~20% built measured **`developed` -5.7% to -9.3% = FAIL**.
  Ceiling is ~**-4.5%**, and that ceiling is the whole story.
- **Weak enough to PASS ⇒ it is SEED-FRAGILE.** The belt is drawn from noise, so its
  quality is a lottery. Final build: seed 7 held 220 lots (rim **46 -> 19%** built) and
  PASSED decisively — *"it wanders... the plate's hexagonal outline is NOT legible in the
  green"*. Seed 42 drew 161 lots (rim **54 -> 36%**) and FAILED — *"a near-constant-width
  band tracing the plate's hexagonal outline."* **195's law: a procedural city must hold on
  EVERY seed.** On a bad draw the belt *announces the generator's rule*, which is a worse
  artifact than no fringe at all.

**Visual.** 8 agent reads over 3 shapes, all blind, all correctly identifying the patched
build. Every single read: **downtown INTACT** and **no render bugs**. Verdict split every
round — one PASS, one FAIL, the FAIL always on whichever seed drew the weaker belt.

**Three SHAPE findings, each paid for by a failed gate round (these are the reusable part):**
1. **An even SCATTER reads as SPECKLE, not country.** *"Green appears BETWEEN the buildings
   rather than replacing them"* — salting every block clears none of them.
2. **Modulating only the STRENGTH of an unwarped ring reads as an OFFSET HALO.** Of course
   it does: `rural` is a function of `hexDist` from the plate centre, so **its boundary IS
   the plate's hexagon by construction**, and no density noise hides that. *"It looks like
   a rim rule."*
3. **The warp must be able to ERASE the belt.** Warping the distance field by ±4 rings still
   clamps `rural` to 1 at rim 0, so **the city can never touch the plate's edge** — an agent
   caught exactly this (*"never lets the city touch the rim"*). The warp must exceed the belt
   depth, so the belt *vanishes* in places. That one change is what flipped seed 7 to PASS.

**Where the cost actually lands (this is the good news, and the next lap should keep it).**
Split by distance from the CBD, 10 seeds, paired: the loss is **entirely OUTER**. Core
(<=8): `developed` **+0.2%**, MID **+5.7%**, COM **+10.6%** — *downtown is not taxed at all*,
and every agent read confirms it. Outer (>16): MID -15.5%, TOWER -14.5%, dev -8.4%. **The
pop a fringe costs is far-flung rim pop, which is exactly the fabric that should not exist.**

**Verdict: EXPLORED → REVERTED.** `solvista.html` is byte-identical to HEAD. The city IS
measurably better with the belt — but not on every seed, and it cannot be strengthened
without collapsing a core metric. Reverting a change that half the gate loves is the system
working (82/88/101/114).

**⇒ THE WAY THROUGH, for whoever takes (ai) next — do NOT re-try a bare rim mask.** The
budget **has slack** (1153/1382), so the city can absorb the freed development *inland* if
something makes interior cells eligible for it (the parcel predicate's `road within 2` is
the lever, and widening it in the interior is **pure addition**, 219). **Hold the rim AND
widen the core in the SAME lap** and `developed` stays flat — the census gate opens, the
belt can be made as strong as the eye needs, and the city gets a hinterland *and* a denser
middle. Priced separately, each half fails; the pair is what makes it shippable.

## Iteration 234 — the boardwalk was never violet, it was grey (2026-07-13) [Water & coast × Polish]

**Vector.** Water & coast × Polish — the stalest domain (last touched 223), taking its one
banked, measured cue: **(u) the pier/boardwalk deck is still hue-rotated at night**, the last
warm surface in the city bypassing `col()`'s wash. Cue (u) was raised by a seed-7 agent,
unprompted: *"flat lavender-mauve slabs"* and *"the boardwalk path is warm brown while the pier
deck it connects to is violet — same walkway, two colours."*

**The cue's pointer was right and its NOUN was wrong — and that is the finding.** (u)
prescribed "route the deck's fills through `sandCol()`" *because the deck is violet*. It is
not, and it never was. Measured on the shipped file over 3 seeds, the deck renders **day hue
38 / chroma 73 → night hue 2 / chroma 13**: not violet (309), but a **36° rotation with 82% of
its colour gone** — a dead GREY slab. The arithmetic says why, and it generalises: whether the
night tint `[.42,.42,.58]` rotates a warm surface all the way to violet depends on **that
surface's blue channel**, not on the bug. Sand `[238,220,178]` has blue high enough to overtake
its crushed red (`.58*178 = 103 > .42*238 = 100`), so the channel order **inverts** to B>R>G
and it lands on hue 309. The deck's blue is only 118, so red still wins (`82 > 68`), the order
**holds**, and it just goes colourless. ⇒ **214's banked audit criterion — "any warm surface
landing near hue ~308 with chroma <15 has been rotated" — is a SUFFICIENT test, not a NECESSARY
one.** It fires only on surfaces blue enough to invert, and it walked past the deck for the
entire wash ladder (214→220→221→223). **The load-bearing half was always the chroma.** Promoted
to SKILL.md, with 221's `dHUE` (distance from the surface's OWN daylight hue) as the correct
universal gate — it is meaningful for a base colour of any hue, and "is it near 308" is not.

**Change (colour-only; 3 lines of code, no geometry).** `deck`/`deckDk` now take the warm wash
**by NAME, not by call site** — a `WARMN` set in `col()`, mirroring `LEAFN`, dispatching to
`sandCol()` itself rather than copying its gain triple (so the timber can never drift from the
sand it runs onto). 220 made the warm wash opt-in per call site "because cream/white/**deck**
are shared between masonry, boats, foam and signage" — **and a grep refutes that for `deck`**:
all thirteen of its call sites are warm timber or a warm coat (pier planks + posts, the
esplanade deck, the lifeguard tower's legs, the beach bench, the river bridge's *timber deck*,
a trestle table, a barrel, the monorail platform, a **deer**, a balloon's wicker basket). Not
one draws a hull, a wall, foam or a sign, so **no caller ever needs the cool wash** and the name
is as unambiguous as green is. Fixing it by name fixes the bench, the bridge and the deer along
with the pier, instead of leaving them to be found one at a time.

**Probe** (`probes/probe-deckhue.mjs`, banked — the deck has **no tile type**, so `probe-sandhue`
/ `probe-goldenhue` are structurally blind to it). Isolated by **loud-painting `BASE.deck` and
diffing inside ONE page**: the changed pixels ARE the deck, by construction (161), at a floor of
exactly **0** (230), off the final composited canvas (so occlusion is checked for free), and
**build-agnostic** — the same probe runs unchanged on HEAD and patch with no source swap.

| seed | dHUE (own daylight hue) | chroma day→night | night luma |
| --- | --- | --- | --- |
| 7 | 36.2° → **6.9°** | 13.0 → **31.1** | 74.7 → 75.7 |
| 42 | 36.1° → **6.5°** | 13.2 → **32.2** | 73.0 → 74.2 |
| 1234 | 34.3° → **6.2°** | 13.7 → **32.5** | 74.2 → 75.4 |

**Controls.** (a) **DAY is byte-identical across builds on all 3 seeds** (hue 37.7 / chroma 71.2
/ luma 157.9, to the pixel) — `washRGB` crosses over at `LITAMT` 0.35, so daylight runs the same
code and cannot be leaked into: 199's dead-regime control, free, in the same run. (b) Night luma
**+1.2 only**, so **222's ladder invariant holds** — the deck at 75 stays far below the LIT band
(TOWER 109 · COM 108 · MID 101) and below BEACH (105). That is 223's `n` normalisation paying for
itself: a uniform rescale cannot rotate a colour, so the hue is fixed without buying luminance.

**Census.** PASS — **every metric +0, tile histogram empty.** Correct and expected: a colour-only
change touches no `rng()`, no terrain, no tick, so the census is *vacuous here by construction*
and the probe is the gate (`solarRoofs +1` is 226's documented ±2 clock wobble; core `pop` /
`developed` / `roads` all +0).

**Perf: free, by the deterministic instrument.** Path objects **day 109,233 · night 138,612** vs
HEAD's 109,247 / 138,668 — **−14 / −56, i.e. zero** (0.01–0.04%, inside the probe's own seed-mean
wobble). The change alters only the *string* `col()` returns for two names; the draw list is
untouched. No timing gate needed (216: reach for the deterministic instrument when the cost has no
mechanism), and no perf lap.

**Visual (`probes/shot-deck.mjs`, banked — aimed by MEASURED INK, 226).** The deck is a thin ribbon
sited procedurally, so a fixed clip is a coin-flip (201) and no tile predicate can find it (226) —
but the loud-palette mask already knows exactly where it renders, so the camera takes the **argmax
window of deck ink** and points there. `AIM=` forces the world point so the HEAD build frames the
identical hex. **Two agents, blind, on A/B assignments FLIPPED between seeds** (42: A=patch; 7:
A=head), each asked to LOCATE the timber rather than judge the change (108):

- **Both identified the patch correctly** — 42's agent picked A, 7's picked B. Neither could have
  guessed both. Their independent numbers match the probe: patch `rgb(90,71,50)` hue ~32° / sat 0.29
  vs HEAD `rgb(84,68,68)` hue ~0° / sat 0.11 (probe: `[88,73,57]` 31.4° vs `[82,69,69]` 1.7°).
- **Both checked 222's invariant unprompted** and cleared it: the patched deck is *darker or equal*
  (luma 77 vs 80), peaking ~97 against lit windows at ~200 — *"the wood reads as wood being lit, not
  as an emitter"*; *"the lamp posts still clearly read as the only light sources."*
- Day frames identical (sub-pixel AA shimmer only). Whole-city night frames clean on both seeds — no
  z-order tears, no floating tiles, no blown-out colour, no compounded clutter or darkness.
- Seed 7's agent called HEAD's deck *"a dull mauve/violet-grey"* — which is why (u) said violet. At
  chroma 13 a surface is essentially grey and reads mauve beside warm neighbours, so the original
  agent's adjective was *perceptually* apt and *numerically* wrong. **Believe a cue's pointer;
  re-measure its adjective.**

**Verdict: SHIPPED.** Cue (u) CLOSED, and with it **the `col()` wash ladder is complete for every
surface that goes through `col()`** — the last one still bypassing it was never violet, which is
precisely why it survived four laps of a ladder built to hunt violet. **FARM (`cropRGB`/`colRGB`)
remains the one warm surface outside `col()` entirely** — a different mechanism, not this ladder's.
