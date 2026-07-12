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
| **Nature** | 4, 26, 29, 102, **156**, **174** | 1, 13, 60, **206** | 37, 46, 67, 76, **108**, **120**, **139**, **166** | ~~46~~, ~~88~~, ~~101~~ | U4 | 53, 96, **194**, ~~**198**~~, **215**, **221** | **117**, **129**, **148**, **183** |
| **Water & coast** | 6, 10, 12, 16, 20, 33, 106, **169** | 90 | 17, 25, 51, 65, 72, **113**, **123**, **159**, **196** | 22, ~~**205**~~ | | U2, 44, 58, 79, **116**, **132**, **150**, **185**, **214**, **223** | **97**, **141**, **176** |
| **Urban fabric** | 32, 62 | 7, 23, ~~82~~, **151** | 38, 54, 68, 92, **165**, **173**, **189**, **199**, **209**, ~~**218**~~, **219** | 47, **109**, ~~**160**~~ | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103**, **110**, **118**, **124**, **143**, **180**, **216**, **220**, **224** | **133** |
| **Transport** | 2, 9, 21, 31, 48, **164** | 77 | 28, 39, 55, 63, **112**, **121**, **128**, **155**, **179**, **193** | 5, 15, **138**, **211** | U4 | U1, U3, 70, 85, 87, 94, **146**, **188**, ~~**203**~~ | **105**, **171** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107** | 36, 59, 66, 80, 91, **149**, **158**, **175**, ~~**195**~~, **213** | 45, **204** | | 73, ~~**114**~~, **168** | 52, 122, **140**, **184** |
| **Sky & atmosphere** | 27, 43 | | 19, 35, 50, 57, 95, **135**, **153**, **161**, **181**, **190**, **208**, **225** | | | 61, 81, 89, **115**, **200** | ~~**134**~~, **144** |
| **People & activity** | 41, 56, **127**, **170**, **186** | 49 | 34, 64, 93, **104**, **119**, **145**, **178**, **201**, **210** | 78, **111** | | 84, **137**, **163**, **226** | 71, **154**, **191** |

- **Interaction/UX — the FEATURE INVENTORY was rotated to the archive at 211 (history, not steering).** What steers:
  when adding an entity array, `stamp()` it in its draw + add an `ENTINFO` row (same discipline as the census hook).
  `stamp()` also draws the focus ring, so any stamped entity is ringable free — and since 133 a hovered TILE is
  ringed too. **An `ENTINFO` `sub` may be a FUNCTION of the entity (105)** — use it when a thing's interest is its
  *membership* (which line / route / depot; **211's `Feeds — Line N of M`**), computed live, never a stored string.
- **ROTATION.** Last vector per domain: People **226** ·
  Transport **211** · Civic **213** · Nature **221** · Water **223** · Urban **224** · Sky **225**.
  ✅ **227 WAS THE 25TH STEP-BACK — city CLEAN, arc UNMOVED, and it FIXED ITS OWN CAMERA** (the frozen frames had
  been showing a **load-time HUD**: `DAYTIME / 0% NEW MOON` over a night sky, on every step-back ever shot; frames
  now self-report `HUD=ok`). **232 is the 26th.**
  🔴 **TAKE CUE (af) — TOWER/MID FACADE WALLPAPER — NEXT (Urban × Polish).** Six agents across 222/224/227, both
  seeds, unprompted; it is the one thing all four of 227's reads agreed on, and its instrument already exists
  (`probe-facade.mjs`). Stalest columns after that: **Interaction/UX** (cues (z)+(w), a HUD lap), then Transport
  (211) / Civic (213).
  ✅ **THE SKYLINE LADDER (217→218→219→224) and THE WASH LADDER (223) ARE BOTH COMPLETE** — cues **(ac)** and **(ae)**
  CLOSED; the `c.th` ladder is **SPENT** (warnings at (ac)); the wash is **luminance-safe**, its invariant **ASSERTED
  by `probe-goldenhue.mjs`**. Laws in SKILL.md. ⚠ But NEW cue **(ag)**: 227's agent says the night greens read hot
  again — which would sit on the wash ladder's own invariant.
  ✅ **137's STANDING-CROWD CUE IS CLOSED (226).** Every STANDING figure now casts `shadS` and inherits 225's sun
  vector; the SEATED ones (cafe, picnic, amphitheater) are deliberately not. **People's cue list is EMPTY.**
  **CUES, RANKED:** 🔴 **(af)** tower/MID facade wallpaper (Urban × Polish — six agents; **TAKE IT NEXT**) ·
  **(w)+(z)** the shipped mojibake + the clipped HUD label (Interaction/UX × Polish — the stalest column; one tidy
  HUD lap, and (w) is a LIVE bug on the public site) · **(u)** the violet pier deck (Water × Polish — the LAST warm
  surface still rotated; the deck bypasses `col()`) · **(ag)** the night greens stay hot (**NEW at 227**) · **(y)**
  the scorched inland cluster (Nature × Polish) · **(s)** golden-hour contrast collapse (Sky × Polish — CONSTRAINED;
  strengthened at 227) · **(ab)** (low, arguably correct by design). Nature's **GARDEN staggered beds** (Nature ×
  Deepen) is held by cue (p).
  **225 (Sky × Deepen): THE SHADOWS READ THE SUN.** `shadS` — the ONE function every shadow routes through — carries
  a per-frame sun vector (**`SHOFF`** throw · **`SHLEN`** stretch · **`SHAMT`** opacity). ⚠ **Noon (t=0.415) is
  BYTE-IDENTICAL by construction ⇒ every shadow lap has a free dead-regime control there.** ⚠ **`SHAMT` must never
  reach 0 at night** — the residual patch is what keeps every ped, tree and car from FLOATING.
  **STEERING FROM THE LAST LAPS — bodies rotated to the archive at 227; only the WARNINGS live here.**
  ⚠ **226: `census.mjs` DOES NOT FREEZE THE CLOCK** ⇒ tick-sensitive metrics (`solarRoofs`) **wobble ±2**; core
  metrics unaffected. **To test whether an unintended metric move is YOURS, re-run the SAME FILE, not HEAD.**
  ⚠ **226: `openFront`/`frontLoad` ONLY COUNT `TALLT`** — a mid-height SHOP still buries a ground-level figure's
  feet. **For a ground-level ornament, aim AND site by MEASURED ink, not by a tile predicate.**
  ⚠ **213: `nightDeep()` IS PINNED AT 1 ALL DAY** — harmless in a draw, a trap for any NON-draw reader; guard every
  reader. **The civic night-light audit is DONE — do not re-run it**; three lights are OFF the curve on purpose
  (school janitor, hall clock face, parliament lantern) — **do not "fix" them.** ⚠ **Cue (t): THE AMPHITHEATER IS
  BURIED ON SOME SEEDS** (pre-existing siting; a hard gate would starve a one-per-city tile ⇒ fix is a PREFERENCE).
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
   finding before reading its row. (**137's People × Polish cue is CLOSED by 226** — every standing figure is now
   grounded; People has no banked cue left.) (**Sky's moon is FIXED (135) and NAMED (144)**, both closed.
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
  Perf ARC (same refs as 202/207/212/217/222, directly comparable): the lap (223-226) is **FREE** — path objects
  **day 108,007 -> 107,959 (-0.04%) · night 138,734 -> 138,520 (-0.15%)**, the timer's +1.5/+0.7% having **NO
  mechanism** (216: 223 colour-only, **224's `TCAP` REMOVED tower bands**, 225 keeps `shadS`'s count, 226 adds a few
  hundred ellipses — cap and shadows cancel). vs `7e2ac2c` (177, 50 iters) **+16.5% / +11.5%**; vs `5f01426` (162,
  65 iters) **+16.9% / +12.7%** (abs: day 40.9-41.9ms · night 47.7-48.2ms) — **UNMOVED** from 222's +15.0/+12.2 &
  +15.9/+13.3, as the flat object count predicts. Priors: 202 +7.5/+4.1 & +8.6/+5.7; 207 +7.2/+5.1 & +9.5/+6.0; 212
  +8.7/+4.8 & +10.5/+7.3; 217 +11.9/+7.6 & +14.0/+8.3; 222 +15.0/+12.2 & +15.9/+13.3. Arc rate ~**+0.3%/iteration**;
  diffuse, **NOT accelerating**; **ACCEPTED — do NOT open a perf lap.** ⚠ **222 FALSIFIED this header's own claim that "219 is world-data only — arc unmoved."** The
  lap's +3.3/+4.2% had NO mechanism (220/221 colour-only, 219 world-data, 218 reverted), so per 216 the INSTRUMENT was
  changed rather than the timer re-run: `probe-drawbudget` reads **day 104,787 -> 108,007 (+3.1%)** and **night
  132,547 -> 138,734 (+4.7%)** — the two instruments AGREE, so the cost is REAL, and it is **219's downtown** (more
  core COM => more towers => more `prismS`/`bandS` by day and more `winBandR` by night, which is exactly why night
  grew more than day). **PAID and ACCEPTED.** ⇒ **LAW: "no new draw CALL" is NOT "no new draw WORK" — THE WORLD IS THE
  DRAW LIST** (⇒ SKILL.md): price a CA/siting vector by COUNTING OBJECTS, not by reading the diff.
  ⚠ **Cue (x) stands** (215's `seamVeg`: 692 path objects / 228 STROKES cost ~4x what the fill model predicts — the
  stroke-vs-fill sweep at equal path count is the harness's best-supported open perf question).
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
  **⚠ THE COST MODEL HAS TWO HOLES, BOTH THE SAME SHAPE: 198's TABLE WAS MEASURED ON SOLID FILLS ONLY.** Its findings
  (per-ellipse; area-independent; sprite worse) hold only for solid `fill()`s, and **two other primitives have each
  come in ~4x over the model**: (1) **GRADIENTS** — 200's sun is two radial-gradient fills costing **day +2.3%**; a
  gradient is evaluated **per pixel**, so it may price by **AREA**. (2) **STROKES** — 215's `seamVeg`, 692 path
  objects (0.7% day) costing **~+3% day**, with the colour-cache and style-write levers both measuring **zero**,
  leaving its **228 line strokes** as the suspect. Both **PAID and ACCEPTED**; neither **MEASURED**. Do not shrink a
  gradient or cull a stroke "because 198 said count is what matters" — **it said no such thing about either.**
  **⚠ THE DEAD-REGIME CONTROL (199) and ⚠ NEVER GRADE BY CONSECUTIVE PASSES (117 corrected 99) are both LAWS in
  SKILL.md** — bodies archived at 222. One line each: a change **provably inert in one regime** makes THAT regime its
  free, same-run noise floor (199's day column read −0.0/+0.1/+1.0% on identical code); and machine load is
  autocorrelated over minutes, so only an **interleaved A/B/A/B against pristine HEAD** (min per variant,
  `perfab.mjs`) reads true — 117's gate read a *stable* +25.5/+26.0/+26.5% on a diff with **zero draw calls**.
  (**A 2+-round day+night interleave overruns the 120s Bash timeout — do NOT pipe it through `tee`**: node
  block-buffers stdout to a pipe, so a backgrounded run looks EMPTY until it exits (197 lost a run that way). Run it
  foreground with a long timeout. **⚠ `cp` is aliased `-i` here — use `/bin/cp`**, or every swap silently no-ops and
  you measure ONE file 4x, iter 147.)
- **`?year=` is a URL hook (108); keyframes `.02/.30/.62/.87` = winter/spring/dry-peak/autumn. Full text (+ 139/202's
  warning that it DRIFTS ~0.167 yr/s while `shoot.mjs` waits — use `probes/shot-stepback.mjs`) is in SKILL.md.**
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
  **(g) ~SIXTEEN seedless `hashCell` calls — each paints the IDENTICAL pattern in EVERY city.** RE-RUN the audit,
  don't trust a catalogue (L-numbers drift): `grep -noE 'hashCell\([^;]{0,60}' solvista.html | grep -v seedNum`.
  **Only PRESENCE decisions are a breach worth a vector** (a thing being there, or not, in the same place in every
  city): **the night surf light-smear, `hashCell(x,y,77)<0.28`, is the one to fix.** *Ornament jitter* (kelp sway,
  fronds, fruit, fireflies) is cosmetic. Marsh reeds (113) + tower window-lights (110) CLOSED. ⚠ `darkWinR` is **not**
  a breach (it mixes `seedNum^salt` internally — check the callee). When fixing a range, **space the bases**.
  **(w) 🔴 A LIVE MOJIBAKE BUG IS SHIPPED ON THE PUBLIC SITE — and 227 re-measured it ~4x BIGGER than recorded.**
  Raw non-ASCII **inside RENDERED JS string literals**, in a file with **no `<meta charset>`**: over **http (=
  GitHub Pages, the deployed artifact)** Chromium falls back to windows-1252 and the user reads mojibake. A
  `file://` load sniffs UTF-8 and **HIDES it — which is why every local shot has looked clean for 122 iterations.**
  214 named only `:7446`/`:7451` (the monorail/cable-car tooltips); **the real list is >=8 sites and includes the
  STATS PANEL** — `elTall`'s em-dash (**L7320**, on screen at all times) and the acute-e in `cafes` (L7430), plus
  7432/7443/7451/7460. Re-grep, do NOT trust this list either:
  `grep -nP "^(?!\s*[/*]).*'[^']*[\x{0080}-\x{FFFF}][^']*'" solvista.html`. Fix = the `\uXXXX` escape (iter 134's
  own law, violated in the one place nobody re-grepped). **Verify over http, NOT file://.** The **cheapest real
  user-facing win in the ledger** — Interaction/UX × Polish, and it **pairs with cue (z)** for one tidy HUD lap.
  **(m) SHOWERS ARE HOST-STARVED — do not build "X responds to the rain"** (201, `probes/probe-rainhost.mjs`).
  Nothing on the ground reads `cl.rain`, and a shower's footprint is **2-5 hexes TOTAL**, so at any moment it rains
  on **less than one** picnic/cafe hex — `T.MARKET` again (dead-code law), **no host.** Widening it is a Sky change
  to a tuned draw, and **gradients price by AREA** (see the PERF hole).
  **(o) THE PORT HAS NO WATERFRONT — do not build "the ship docks / cranes work her"** (205,
  `probes/probe-harborhost.mjs`, 6 seeds, unanimous; body in 205's entry). Warehouses sit **behind** the coast
  highway, **5-9 hexes from the sea**; **no quay tile exists.** Solvista is a **roadstead**, so the anchored
  freighter is *correct* — her "waiting on a berth" comment is the label-tell's **FALSE-POSITIVE mode**. A port
  vector must **build the waterfront FIRST**. **Banked host: the MOLE is real** (`moleSet`, 5-12 cells, all 6 seeds
  — the only built structure standing in the water).
  **(p) CLOSED by 208/209 (body archived); the WARNING is live. ⚠ DO NOT RAISE THE LAWN AMPLITUDE FURTHER.** `grass`
  and `lawn` share a **base colour** `[150,181,122]`, so the dry-season divergence *is* the managed green's whole
  identity: lawns must stay **greener/brighter than the hills at every point in the year**; any push must re-run the
  blind locate. **⚠ GARDEN is STILL MUTE (1.8 -> 5.4)** — its ground is mostly raised beds, so the lawn lift barely
  reaches it. **Its own richer cue stands:** staggered per-bed calendars + one shared `gardenPhase()` (**Nature ×
  Deepen; host fixed by 206**).
  **(aa)/(ad) CLOSED (220 masonry, 221 greens); bodies archived. THE `col()` WASH LADDER IS COMPLETE** — ONE shared
  `washRGB(b,f,gr,gg,gb)` whose gain triple lifts hardest on the channel carrying the surface's IDENTITY (R warm, G
  green); **colour-only (zero path objects)**, **byte-identical in daylight** ⇒ a free dead-regime control. ⚠ **GLASS
  (TOWER/COM) KEEPS the cool tint** and **ROAD staying grey is CORRECT** (214). ⚠ **Do NOT fork a second wash —
  EXTEND `washRGB`.** ⚠ **Still rotated, both bypassing `col()`:** the **pier deck** (cue (u)) and **FARM**
  (`cropRGB`/`colRGB` — a real lap, not a freebie).
  **(ae) CLOSED by 223** (root cause: `washRGB` gain triples chosen for their RATIOS, never normalised for their
  MAGNITUDE; body archived, law ⇒ SKILL.md). ⚠ **The invariant is ASSERTED by `probes/probe-goldenhue.mjs` — run it
  whenever you touch a gain triple.** ⚠ **Watch: PARK vs ROAD separation is 14, just under the ~15 collapse floor**
  — and **227's cue (ag) says the night greens read hot again**, so that is where the next lap will bite.
  **(af) TOWER + MID FACADES ARE WALLPAPER — 🔴 THE LOUDEST CUE IN THE LEDGER; TAKE IT NEXT (Urban × Polish).**
  **Six agents across 222/224/227, both seeds, every time unprompted:** *"a repeating teal cylinder motif"* ·
  *"the same tall pale slab with horizontal band-glazing repeats"* · **227:** *"a repeating field of identical
  horizontally-banded slabs with little silhouette variety"* (7) · *"the drum-roof block is genuinely over-used and
  is the element most at risk of compounding further"* (42). 227's pair indict the **MID drum-roofs** as well as the
  towers, and both name **SILHOUETTE / roof variety**, not colour. **216 spent the MID facades and used TOWER as its
  CONTROL** — this is 216's lever one tile over, and its instrument exists: **`probes/probe-facade.mjs`** (distinct
  stripe rhythms, the top rhythm's share of the stock, the corduroy number). **(ac) is CLOSED so nothing queues
  ahead of it.** ⚠ Price it by **COUNTING OBJECTS** (222), not by reading the diff; **hold the MEAN** of anything you
  jitter (216) so the path count — hence the cost — stays flat.
  **(ag) THE NIGHT GREENS STAY HOT (227, seed 7, unprompted; NEW).** *"At night the land base reads flat purple-grey
  and the parks/farms in the middle stay oddly bright green, breaking the night mood."* Sits squarely on 222's
  ladder invariant (**no UNLIT surface may out-brighten the LIT ones**) and on 223's live watch item (**PARK<->ROAD
  separation is 14, just under the ~15 collapse floor**) — the two may be one root cause. ⚠ **DO NOT gate it on a
  pairwise separation — 221 proved separation REWARDS this class of bug**; gate on the surface's distance from its
  OWN daylight self, and re-run `probes/probe-goldenhue.mjs` (it ASSERTS the ladder invariant). Nature/Water × Polish.
  **(ac) CLOSED by 224 — the 217/218/219 SKYLINE LADDER is COMPLETE** (body archived): mass downtown *and* a taper.
  ⚠ **THE WHOLE `c.th` LADDER IS SPENT: do not re-open placement (dead lever, 218), the COM fork (219), the height
  noise, or `TCAP` (224).** (1) ⚠ **`c.th` HAS TWO WRITERS** — placement *and* the 2022+ growth rule; touch one,
  check the other. (2) ⚠ **DO NOT DERIVE A TOWER CONSTANT FROM THE MEASURED MEAN `core`** — 98 did (0.125), **219
  invalidated it** (0.282) unnoticed for 6 laps; normalise by the formula's own max (⇒ SKILL.md).
  **(ab) THE CALENDAR IS LOUD PER-TILE AND QUIET PER-FRAME (217, Sky × Deepen — LOW; said by FOUR agents).**
  *"Winter is indistinguishable from day"* — but `probe-season` refutes the premise (FARM **87.0**, ROAD control 0.6:
  the calendar is ALIVE). Theirs is a **frame-share** claim (the biggest-amplitude tiles are the fewest: FARM 130,
  VINEYARD 26) — 214's shape, and **arguably correct by design** (a dry-Mediterranean city has no snow). ⚠ Fix = a
  bigger seasonal **SURFACE**, not a louder amplitude; cue (p) **forbids** raising the lawn amplitude.
  **(u) THE PIER / BOARDWALK DECK IS STILL VIOLET — (aa)'s bug one tile over (214, Water × Polish; the LAST warm
  surface rotated).** Seed 7, unprompted: *"flat lavender-mauve slabs"* and *"the boardwalk path is warm brown while
  the pier deck it connects to is violet — same walkway, two colours."* Fixing the sand made it **worse**. One-line
  lever: route the deck's fills through **`sandCol()`** (it bypasses `col()`). ⚠ **GATE ON THE DECK'S DISTANCE FROM
  ITS OWN DAYLIGHT HUE, NOT a pairwise separation** — 221 proved separation *rewards* the bug.
  **(x) A STROKE MAY NOT PRICE LIKE A FILL (215, perf suspect — NAMED, NOT MANDATED; see the PERF bullet's "TWO
  HOLES").** Build a **stroke-vs-fill sweep at equal path-object count**; `CCACHE` key churn and per-mark style
  writes are both ruled OUT (measured **zero**).
  **(y) A SCORCHED-LOOKING HEX CLUSTER INLAND (216, seed 7, unprompted on a PASSing frame).** *"A small dark
  brown/scorched hex cluster in the mid-left inland block that reads oddly against the surrounding green."* ⚠ The
  fire CA is a **GHOST** (cannot ignite at 2035) ⇒ almost certainly **LOGGING/clearcut, not BURNT** — **identify the
  tile before designing** (dead-code law). Nature × Polish.
  **(z) THE HUD CLIPS ITS OWN LABEL (216 + 224, seed 7).** The stats bar clips `TRANSIT REA[CH]` at its right edge.
  **Only an agent could find it — every probe in `probes/` is blind to the DOM** (200). Interaction/UX × Polish, and
  it **pairs with cue (w)** (the live shipped mojibake) for one tidy HUD lap.
  **(s) GOLDEN HOUR: HIGH SUN, HORIZON-WARM SKY, AND CONTRAST COLLAPSE (212 + 217 + 227 — CONSTRAINED, read before
  taking; Sky × Polish).** The disc sits high (**y=0.10**) in the *cool* part of the sky while the warm gradient
  comes from the bottom. ⚠ **STRENGTHENED at 227 — both seeds, unprompted, both calling golden the WEAKEST frame:**
  *"the orange grade collapses roads, roofs, sand and grass into one narrow tan/salmon band"* (42) · *"muddy
  tan-brown, desaturated rather than warm"* (7). **The complaint is CONTRAST COLLAPSE ACROSS SURFACES, not the sun's
  position** (217 measured chroma RISING — a saturated wash, not mud); `probe-goldenhue.mjs` prints the golden
  separation matrix, so **measure which pairs collapse before designing.** ⚠ **The sun CANNOT simply be lowered —
  200 put it high ON PURPOSE** (the `.placard` owns the low-left sky; a low sun goes behind the HUD — the exact bug
  200 was fixing). **201's law — the FAIL objects to the MODEL.** Reconcile the sky gradient's direction with the
  sun's, or move the warmth — **do not move the sun down.** Not a quick win.
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

> **Archive:** the 220 entries before Iteration 218 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

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

## Iteration 221 — the parks were the same colour as the sea (2026-07-13) [Nature × Polish]

**Vector.** Nature × Polish, closing cue **(ad)** — the last rung of 214's hue-rotation ladder, and
220's direct sequel. 214 fixed the **sand**, 220 the **masonry**; the surface the whole city STANDS
on was still rotated, and two blind step-back agents named it on two seeds, unprompted, on a PASSing
frame: *"hazy-violet mid-block interiors"* (7) and *"a violet/blue-grey ground plane"* (42).

**The bug is 214's, and on green it is worse than on warm.** The night tint `[.42,.42,.58]` crushes R
by `.42` and **lifts B by `.58`**, so on any green — where G is max and R is the *second* channel — B
overtakes R and the channel order goes **G>R>B -> G>B>R**. Worked by hand on the palette, **every green
inverts**: `grass`/`lawn` [150,181,122] -> [63,76,71], `canopy`, `grassDk`, `meadow`, `turf`, `sage`,
`canopyLt`, `sprout`. (`crop` alone survives, by 1 RGB unit — and it goes through `cropRGB`/`colRGB`,
not `col()`, so FARM is a separate lap.) Measured on HEAD, `probes/probe-goldenhue.mjs`, 3 seeds:
**PARK night hue 194deg (CYAN) at chroma 6**, against a daylight 81deg/47. **FOREST chroma 7** — grey.

**Change (one dispatch point, colour only).** The greens take their wash from the **PALETTE, not the
call site**: `LEAFN` + a dispatch in `col()`. 220 made the *warm* wash opt-in per call site, and
rightly — `cream`/`white`/`deck` are shared between masonry, boats, foam and signage, so only the
caller knows if it is drawing a wall. **Green carries no such ambiguity: in this city a green surface
is always something growing, and there is none that should read cyan.** So all 54 green call sites are
fixed at once and **no future one can reintroduce the rotation by forgetting to ask.** The wash math is
now a single shared `washRGB(b,f,gr,gg,gb)`; `sandCol` becomes the warm gain triple on it and is
**byte-identical** (same arithmetic).

**The gain is `sandCol`'s OWN vector, permuted — not a tuned constant.** That wash gives the strongest
gain to the channel carrying the surface's IDENTITY: for sand that is **R** (its max). A green's
identity channel is **G**, crushed by exactly the same `.42`, so the symmetric restoration is the same
triple read in the green's channel order: **`[1.08, 1.15, 1.06]`**. All 11 `LEAFN` entries keep G>R>B
under it (tightest: `turf` [101,137,97] -> 109.1 vs 102.8). A **FLAT (1,1,1)** wash was built and
measured FIRST — it is hue-*exact* and it **under-restores**: PARK chroma only 10, a dark grey with a
hint of green. The shipped gain lands the greens at the chroma where every other surface the night has
been taught to keep already sits (RES **34**, BEACH **37**).

**Census.** PASS, **vacuous by construction** — no `rng()`, no terrain, tile histogram empty, core
metrics flat. (`solarRoofs` +1 / `towerHt` -1 = load-timing tick noise, 163(c); `col()` is pure render
and cannot reach `tick()`.)

**Probe (`probes/probe-goldenhue.mjs`, patch vs HEAD, 3 seeds) — and the cue's OWN GATE WAS WRONG.**
The header prescribed *"pair PARK<->ROAD (night 15, day 50)"*. That gate is **anti-correlated with
correctness and would have failed a correct fix**:

| night | HEAD | patch | day (control) |
| --- | --- | --- | --- |
| **PARK hue** | **194deg (cyan)** — 113deg off daylight | **101deg (green)** — 20deg off | 81deg |
| **PARK chroma** | **6** (grey) | **15** | 47 |
| **FOREST chroma** | **7** (grey) | **25** | 52 |
| PARK vs ROAD (sep) | 15 | 16 | 50 |
| PARK vs RES (sep) | **29** | **25** | 36 |

**PARK<->RES separation FELL, and that is the fix working.** HEAD's park was *cyan*, and a cyan is
maximally distant in RGB from a warm tan house — **the bug was inflating the very number the cue told
me to maximize.** The claim was never *"the park differs from its neighbours"*; it was *"the park is
not green"*. Gated in the units of the complaint (214), the surface's distance from **its own daylight
hue** goes **113deg -> 20deg**, and all separations stay >=16, above the ~15 collapse threshold. ⇒ **Law
promoted to SKILL.md.**

**Controls, in the same run.** **DAY and GOLDEN are both byte-identical** (PARK day 81/47/172 and
golden 44/55/141 in *both* builds) — golden hour reads `LITAMT=0.28`, below the wash's 0.35 cut, so
**two** dead regimes referee the live one for free (199). BEACH night (33deg/37/105) and WATER night
(210deg/58/67) **exactly unchanged**: 214's fix and the sea undisturbed. Probe noise floor ~1 RGB unit
(`time`/`waveT` unpinned, 195(f)); the PARK/FOREST moves are 10-90x it.

**Perf — free BY CONSTRUCTION.** Not one path object added, removed or resized; only the *string*
handed to `fillStyle` changed. 198's cost model is per path object, so per 216's law that deterministic
mechanism outranks a timing number with no mechanism behind it. (One `Set.has` per cache MISS; `col()`
caches under its existing key.)

**Visual.** `probes/shot-stepback.mjs`, seeds 42 + 7, frozen in-page, frames self-reporting. Both agents
**PASS**, both told only that *"some surfaces"* changed after dark — never which, never in which
direction (108) — and **both, blind, named the ground truth**: *"moss-to-olive green"* with forest
*"pine/bottle green"* (42), and seed 7 **sampled the pixels itself** — `rgb(83,99,67)`, hue ~82-90deg,
*"green channel clearly dominant over blue"* — which is the inversion mechanism confirmed from the
outside. Both confirmed the three-way night separation still reads (**warm low-rise / cool glass tower
/ green ground**) and that day + winter are untouched.

**Aside, banked as a watch item (ONE seed only — 212's law wants TWO).** Seed 42: *"the green is a
touch hot for night... park hexes pop as bright cut-outs."* Its *diagnosis* is measurably false (night
chroma 15 is **32%** of daylight's 47, not "close to daytime saturation") and **seed 7 contradicts it**
(*"dark olive"*), so it is not actionable now — but PARK night luminance did rise 82 -> 88. **If a
future step-back sees it on two seeds, dial the G gain 1.15 -> 1.10.**

**Verdict: SHIPPED.**

## Iteration 222 — the twenty-fourth step-back finds the sand outshining the towers (2026-07-13) [holistic step-back]

**Vector:** holistic step-back (24th; the last was 217). No source change — this is a read, a
measurement, and a hand-off. Census PASS, city healthy (every core metric +0, tile histogram empty).

**Frames:** `probes/shot-stepback.mjs`, seeds 42 and 7 — day (t=0.30) / golden (0.68) / night (0.92)
at `year=2035.62`, plus a winter (2035.02) contrast frame. Every frame self-reported its own state;
no mis-pinned camera this time.

**The agents:** both FAILed. Per 212's fail/aside law, the FAILs are where they were wrong and the
asides are where they were right — and **that law has now paid out for the eighth lap running.**

**FAIL 1 (both seeds): "winter is indistinguishable from day."** This is cue **(ab)**, now said by
SIX agents. `probe-season` refutes the premise (FARM 87.0 seasonal shift, ROAD control 0.6 — the
calendar is ALIVE); theirs is a frame-SHARE claim, and a dry-Mediterranean city having no snow is
arguably correct by design. Unchanged, still LOW.

**FAIL 2 (seed 7): "tower wallpaper / no skyline hierarchy."** The hierarchy half is cue **(ac)**,
already 🔴 and measured. The *wallpaper* half is new — see (af).

**THE ASIDE, AND IT IS THE FINDING — both seeds, independent, unprompted:** *"the sand reads
full-daylight tan, the shoreline glows like it's lit at noon"* (42) · *"the beach sand reads LIT
rather than moonlit — it is the least night-graded surface in the frame"* (7) · *"unlit vegetation
should be the darkest thing on land, but here it out-brightens the roads"* (42).

**Measured, and CAUSAL** (`probes/probe-goldenhue.mjs`, HEAD vs pre-ladder `78f53c2` via its `SRC`
hook — the same instrument on both builds):

```
 night lum      pre-ladder(213)   HEAD(221)    delta
  BEACH               96            105         +9     <- washed (214)
  FOREST              58             66         +8     <- washed (221)
  PARK                81             88         +7     <- washed (221)
  RES                 79             85         +6     <- washed (220)
  ROAD/TOWER/COM/MID/FARM/WATER                <= +2   <- NOT washed
```

Every surface the night-wash ladder touched gained **+6..+9** night luminance; every surface it did
not touch moved **<= +2**. The ladder is unambiguously the cause, and the night brightness ORDERING
has inverted:

- **before:** TOWER 108 > COM 107 > MID 99 > **BEACH 96** — the three LIT building types on top. Correct.
- **now:** TOWER 109 > COM 108 > **BEACH 105** > MID 101 — **the unlit sand has crossed INTO the lit
  city's band**, and PARK (88) now out-brightens ROAD (81), exactly as the agents said.

**Why no gate could see it — and it is a LAW (⇒ SKILL.md).** 214, 220 and 221 each fixed a real hue
rotation and each passed a *correct* gate — and 221's own law **mandated** the shape of that gate:
*for an identity/hue claim, gate on the surface's distance from ITS OWN DAYLIGHT SELF, not from other
surfaces.* That law is right, and it is **exactly why the drift was invisible**: a per-surface
identity gate is blind, by construction, to a **cross-surface ORDERING**. Three laps each moved their
own surface +6..+9 and none of them was ever asked about anybody else. ⇒ **A ladder of per-surface
fixes needs a GLOBAL invariant that no single lap can check.** Here it is, in the viewer's units:
**no UNLIT surface may out-brighten the LIT ones.**

⚠ **The hue fixes were RIGHT — do not revert them** (BEACH hue 316->33 out of violet; PARK 200->101
out of cyan; chroma restored 12->37 / 8->15). The lever is the **luminance** the gain triple adds as
a side-effect, not the hue it corrects.

**PERF — and it FALSIFIES a claim this header was making.** Lap (218-221) vs 217 `466a8b3`:
**day +3.3% / night +4.2%.** Arc vs `7e2ac2c` (177): **+15.0% / +12.2%** (was +11.9/+7.6 at 217).
Arc vs `5f01426` (162): **+15.9% / +13.3%** (was +14.0/+8.3). Abs: day 40.6-41.7ms, night 47.3-48.2ms.

That is ~+3pp day / +4.6pp night from four iterations that **should have added no draw work at all**
(220/221 colour-only; 219 world-data; 218 reverted) — a cost with no mechanism, which by 216's law
means *change instrument, don't re-run the timer.* `probe-drawbudget` (deterministic, load-immune):

```
  path objects     217(466a8b3)   HEAD(221)    delta
    day              104,787       108,007     +3.1%
    night            132,547       138,734     +4.7%
```

**The two instruments AGREE to within 0.5pp, so the cost is REAL, not machine load — and it is
EXPLAINED: it is 219's downtown.** Concentrating COM in the core built more towers, and a tower is
`prismS`/`bandS` bands by day and `winBandR` lit panes by night — which is precisely why **night grew
more than day**. This is a paid, legitimate cost (a denser city costs more to draw), and it is
**ACCEPTED — do NOT open a perf lap.**

⚠ But the header asserted **"219 is world-data only (no new draw call) — arc unmoved"**, and that is
now **measured false**. ⇒ **LAW (⇒ SKILL.md): "no new draw CALL" is not "no new draw WORK" — the
WORLD IS THE DRAW LIST.** A rule that changes which tiles *exist* changes how many path objects get
rasterized every frame, forever, even though the diff adds not one drawing primitive. The loop has
been pricing CA/siting vectors as free by reading the *diff*; they must be priced by counting
**objects**, which is one command.

**A FALSE cue, killed before it cost a lap.** Seed 42: *"the moon is bright while the stat bar reads
0% NEW MOON — contradictory."* Investigated: `moonPhase()` is ONE predicate with two readers (draw
L6622, HUD L7219 — 135/144 wired it correctly), the lit lune is properly skipped at new moon
(`MOONF>0.015`), and what the agent saw is the deliberate, documented **earthshine limb** (*"the whole
disc, dim, so the unlit part still reads as moon"*). Physically correct and intended — 201's
objection-to-the-model shape. **Do not chase it.**

**Cue (ac) RECONFIRMED, and by a LOCATE answer rather than a judgement** (108's law working as
designed): asked to *point at the single tallest tower*, both agents, on both seeds, pointed at the
**rim** — (0.51, 0.09) and (0.44, 0.10), y≈0.1 being the top edge of the plate. That is the noise
swamping the centrality signal, exactly as (ac) states. Still the top Urban cue.

**Census:** PASS. Every core metric +0, tile histogram empty (no source change). Entities nominal.

**Verdict: FIXED** — nothing shipped to the artifact, but the step-back did its job: it caught a
three-lap compounding drift that every per-lap gate was structurally blind to, refuted a perf
suspicion with a second instrument, killed a false cue, and promoted two laws. **The next iteration
is (ae): put the night ground back under the lit city.**

## Iteration 223 — the sand goes back to bed (2026-07-13) [Water & coast × Polish]

**Vector.** Water & coast × Polish. Cue **(ae)**, banked 🔴 by the 222 step-back: *the night ground
out-glows the lit city.* Taken ahead of the stale domains under 119's law (a banked, MEASURED
finding outranks kind-rotation).

**The bug was one unnormalised number, and the function's own comment named the contract it broke.**
`washRGB` is the shared hue-preserving night wash behind all three rungs of the ladder (214 sand,
220 masonry, 221 greens). Its comment promises a **"LUMINANCE-MATCHED, HUE-PRESERVING"** tint, and
`L` — the night tint's own luminance — is precisely what delivers that: a surface washed with a flat
`L` lands within ~1 unit of where the plain cool tint would have put it, which is *why* the wash can
correct a hue without brightening anything. Then each caller multiplies `L` by a **gain triple**. A
triple is chosen for its channel **RATIOS** (it leans the restoration onto whichever channel carries
the surface's identity) — and **nobody ever normalised its MAGNITUDE**. Both shipped triples average
well above 1: sand `1.15/1.08/1.06` → a luma-weighted mean of **1.099**; green `1.08/1.15/1.06` →
**1.119**. So every rung of the ladder handed its own surface **~10% night luminance** as a side
effect of fixing its hue — and every rung's gate, *correctly per 221's law*, only ever asked about
its own surface's hue. This is **199's tell one rung down**: not a constant whose name asserts a
behaviour its value cannot have, but a **comment asserting an invariant that a later per-caller knob
silently voided**.

**Change.** One line in `washRGB` — divide the triple by its own luma-weighted mean
(`n = 1/(gr*0.30 + gg*0.59 + gb*0.11)`), then rewrite the comment to state the invariant it restores.
A uniform rescale of all three channels **cannot rotate a colour**, so every hue 214/220/221 bought is
preserved *exactly* and only the stolen luminance is handed back. One mechanism, one definition — no
caller changed, no second wash forked (the header forbids it), and all three rungs fixed at once,
which is what the cue predicted ("same root cause, ONE fix").

**Probe (the gate — and it now lives in the tool).** Per **222's law** the invariant *spans the set*,
so no per-surface gate can see it; I taught `probes/probe-goldenhue.mjs` to **assert** it, so it is
one command forever rather than a thing each lap must remember. Night luminance, 3 seeds:

| | TOWER | COM | MID | BEACH | PARK | ROAD | FARM | WATER | FOREST |
|---|---|---|---|---|---|---|---|---|---|
| pre-ladder | 108 | 107 | **99** | **96** | 81 | 81 | — | — | 58 |
| HEAD (broken) | 109 | 108 | **101** | **105** | 88 | 80 | 73 | 67 | 66 |
| **patch** | 108 | 107 | **97** | **96** | 82 | 79 | 72 | 67 | 60 |

`VERDICT: PASS — the lit city is the bright thing after dark.` The unlit sand is back **under** the
lit mid-rises (BEACH 96 < MID 97) and PARK (82) no longer out-glows the ROAD (79); the ordering is
the pre-ladder one. **Guard held exactly as the arithmetic predicts** — BEACH 7° off its own daylight
hue, RES 9°, FOREST 9°, PARK 23°: 214/220/221's hue work is untouched.

**Census.** PASS, `pageerrors: 0`, **every metric +0** (pop 178626, roads 5775, developed 6064, tile
histogram empty). Correct and near-vacuous: a colour-only change touches no terrain and no `rng()`.

**Perf — free, on the deterministic instrument, not the timer.** 222 was burned by *reading a diff*
and calling a vector free, so I counted objects instead (216's law): **day 108,011 → 108,026 (+0.01%)
· night 138,716 → 138,770 (+0.04%)** — identical to within render jitter. Colour-only: zero path
objects, zero geometry, and daylight runs **byte-identical code** (`w=0 ⇒ t===TINT`), so the day
column is a free dead-regime control (199).

**Visual.** Both seeds PASS. Asked to **LOCATE, not judge** (108), two agents on two seeds
independently answered in the direction the fix predicts. Brightest surfaces: *"the lit window grids
on the towers… the beach is clearly below the lit windows"* (42) · *"the shoreline strip is a muted
dark taupe, clearly darker than any lit tower face"* (7); **both said the shoreline reads MOONLIT,
not lit** — the exact inverse of 222's two asides (*"the shoreline glows like it's lit at noon"*).

**The one number that fell, and why it is not the score.** `PARK vs ROAD` separation slipped 16 → 14,
just under the ~15 collapse floor. **221's law says separation is a GUARD, never the SCORE** — and the
eye settled it: *both* agents, unprompted, located the parks by colour alone and said so in the same
words — *"distinctly olive/green against the violet-grey asphalt… parks and roads have NOT
collapsed."* The two surfaces part in **HUE** (104° vs 15°), not luminance, and a pairwise RGB
distance cannot express that. Banked, not ignored: if a later lap lowers the greens again, this is
where it will bite.

**Verdict: FIXED.** Cue **(ae)** CLOSED, and 221's "the greens are hot" watch item CLOSED with it
(one root cause, as the cue said). **The `col()` wash ladder is now complete AND luminance-safe.**

**Law promoted to SKILL.md.** *A knob chosen for its RATIOS must be normalised for its MAGNITUDE —
and prefer a STRUCTURAL invariant to a CHECKED one.* 222 correctly said: name the dimension your fix
perturbs and bound it every lap. The deeper fix is to make the drift **impossible** rather than
**detected**: the ladder could not have walked luminance off a cliff if the triple had been normalised
at the source, because a uniform rescale has no freedom to move it.

## Iteration 224 — the downtown was the only thing that kept rising (2026-07-13) [Urban fabric × Polish]

**Vector.** Urban fabric × Polish — cue **(ac)**, the 🔴 cue: *"a spine, not a crown; no
tallest-in-the-middle gradient"* (219, said by two blind agents on two seeds, reconfirmed at 222).
Rotation owed **Sky** (stalest, 208), and I read its only live cue **(s)** first as the header
instructs: confirmed exactly as documented — the sun sits at `y≈0.075..0.19` **on purpose** (200: the
`.placard` owns the low sky) while the warmth comes from `dl.skyBot` at the bottom. Reconciling those
is a sky-gradient redesign, not a lap. Sky had nothing; fell through to (ac) as pre-authorised.

**What the probe found — the cue's DIAGNOSIS was right and its PRESCRIPTION was backwards.**
The header prescribed: *"NARROW `c.v`'s spread; do NOT steepen `core`."* Measured first (`probe-taper`):

- The **mean** taper was already **strong** — `corr(th,core)` **0.58-0.67**, mean height falling
  124→105→94→91→82→69 by ring, top-10 tallest at mean distance **5.8** vs 17 for all towers.
- The **ENVELOPE** was broken — and **a skyline's silhouette IS its envelope, not its mean.** Seed
  1234's ring 5-8 max (**177**) *out-topped the core's* (163); seed 42's ring 9-12 hit 177 vs 178.
- **Narrowing the noise ALONE makes the crown WORSE** (`probe-crownsweep`): `crownGap` (= max th
  within d≤6 minus max th beyond d>8) falls **20.9 → 11.5**, and seed 42 goes **NEGATIVE (−14)** —
  the tallest building in the city ends up at ring 9-12. It *raises* `corr` to 0.861, because `corr`
  is a **mean** statistic. **The prescribed metric was anti-correlated with the thing the viewer
  sees** (221's law, next host).

**The real defect: ONE QUANTITY, TWO RULES, and 98 keyed only one of them to `core`** (217's law).
`c.th` is written at **placement** *and* by a **2022+ growth rule** — `c.th += 9+c.v*12` while
`c.th < 160`, a **flat universal ceiling with no `core` anywhere**, whose own comment reads
*"the downtown keeps rising"* (199's tell: a comment asserting a behaviour the code cannot have — it
lifted the **whole city, uniformly**, so the rim slowly climbed to the very ceiling downtown already
sat at). `probe-towergrow`: mean growth is small (~4) and **flat across rings**, but its **tail is fat
and centrality-blind** — `maxGrow` **42–60**, one seed-42 tower at ring 9-12 grew **+79**. The mean was
never the problem. **The TAIL sets the envelope.**

**Change.** Two clauses, both stream-neutral (`rng()<0.02` stays LEFT of the cap test):
1. Placement noise **narrowed** `(54+82v)` → `(74+42v)` — span 2.52x → 1.57x, with `a+b/2` held at 95
   so `E[height]` is unchanged **by construction**.
2. New `TCAP(x,y)` — the growth ceiling **tapers on the same centrality shape placement uses**,
   normalised by that shape's own **max (1.36)** so the core keeps its existing 160 and only the rim
   is cut (to **82.4**). **Normalised by the formula's max, NOT by the measured mean core, deliberately:**
   98's hold-the-mean constant was solved against a mean core of **0.125** and it now measures **0.282**
   — **219 moved COM (the tower substrate) downtown and silently invalidated it.** A cap keyed to a
   world statistic would rot exactly the same way (223's law: prefer a structural invariant to a
   checked one). I rejected a higher-scoring variant (crownGap 50.2) for needing a `/0.886` constant
   derived from that very statistic.

**Census.** PASS, 0 page errors. pop 178623 → **178626 (+3)** · towers **+0** · developed **+0** ·
**tallTowers 244 → 252 (+8)** and **helipads 188 → 192 (+4)** — the cue's "must not fall" gate passed
*upward* (narrowing the noise lifts more mid-core towers past 80 in the pre-2022 eras). towerHt −0.2%.
Per-seed pop **byte-identical** (40786 / 48342 / 32460) — stream-neutrality confirmed.

**Probe (world data — no render, no clock, no noise floor).** `crownGap` **20.9 → 42.6** (2.0x; all
three seeds strongly positive) · `corr(th,core)` **0.616 → 0.811** · top-10 tallest mean distance
**5.8 → 4.1** · ring envelopes near-**monotone** on all three seeds (seed 7: `175 155 158 143 103 116`
→ `168 139 126 116 95 102` — every outer ring down 20%, the core holding at 168).

**Draw budget (222's law — a world-changing vector is priced by COUNTING OBJECTS, not by reading the
diff).** day **108,069 → 107,937 (−0.12%)** · night **138,666 → 138,450 (−0.16%)**. **FREE, and
marginally cheaper** — shorter rim towers issue fewer `prismS` bands by day and fewer `winBandR` lit
panes by night, which is why night falls slightly more: 222's mechanism running in reverse.

**Visual.** 3 agents, 2 seeds, day+night. **Whole-frame health PASS on all** (no z-order tears, no
floaters, no blown-out colour, still a coherent coastal city). On the crown the first two **disagreed**
— and the disagreement was **the instrument, not the feature**:
- Seed 42, blind: located HEAD's tallest tower at **(0.51, 0.11)** and the patch's at **(0.47, 0.46)**
  — the patch's pick lands within **0.05 of the true CBD (0.493, 0.512)**, HEAD's is 0.40 of a frame
  away. The cue's own gate, passed.
- Seed 7, blind: put the tallest at **(0.44, 0.12) in BOTH** frames, against a CBD at y=**0.625**.
  `probe-apex` settled it: the highest apex on screen at **(0.442, 0.117)** is a **height-91 tower at
  row 2, ring 39** — a far-back RIM tower. **`corr(screen apex, true height) = 0.262 / −0.289`;
  `corr(screen apex, ROW/depth) = 0.995 on both seeds.`** Screen-y **is depth, not height**.
- Re-asked seed 7 **projection-safely** (judge height by the *length of the vertical wall*, never by
  position in frame): fresh blind agent counts **5–8 massive outskirt slabs in HEAD, "essentially
  none" in the patch**, and picks the patch's central crown. Matches the world data exactly.

**Verdict: SHIPPED.** The skyline now has a crown: mass downtown (219) *and* a tapering silhouette.

**Two laws promoted to SKILL.md.** (1) *In this oblique projection screen-y conflates height with
depth — "point at the tallest tower" is NOT a valid locate question.* Phrase a locate in a quantity
the projection preserves. This sharpens 108's locate-don't-judge: the law says ask an agent to LOCATE,
and this says **check that the thing you asked it to locate is VISIBLE IN THE PROJECTION AT ALL.**
(2) *When you fix a QUANTITY, grep for every rule that WRITES it* — 217's law's sibling. 217 says a
rule decides both whether and how-much; this says one field can be written by **two rules in different
branches**, and a fix to one is routinely mistaken for a fix to the phenomenon. `c.th` had two writers
for 126 iterations and only one knew where downtown was.

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
