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
| **Nature** | 4, 26, 29, 102, **156**, **174** | 1, 13, 60, **206** | 37, 46, 67, 76, **108**, **120**, **139**, **166**, ~~**233**~~, **238** | ~~46~~, ~~88~~, ~~101~~ | U4 | 53, 96, **194**, ~~**198**~~, **215**, **221** | **117**, **129**, **148**, **183** |
| **Water & coast** | 6, 10, 12, 16, 20, 33, 106, **169** | 90 | 17, 25, 51, 65, 72, **113**, **123**, **159**, **196** | 22, ~~**205**~~ | | U2, 44, 58, 79, **116**, **132**, **150**, **185**, **214**, **223**, **234** | **97**, **141**, **176** |
| **Urban fabric** | 32, 62 | 7, 23, ~~82~~, **151** | 38, 54, 68, 92, **165**, **173**, **189**, **199**, **209**, ~~**218**~~, **219** | 47, **109**, ~~**160**~~ | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103**, **110**, **118**, **124**, **143**, **180**, **216**, **220**, **224**, **228**, **235**, **239** | **133** |
| **Transport** | 2, 9, 21, 31, 48, **164** | 77 | 28, 39, 55, 63, **112**, **121**, **128**, **155**, **179**, **193**, **230** | 5, 15, **138**, **211** | U4 | U1, U3, 70, 85, 87, 94, **146**, **188**, ~~**203**~~ | **105**, **171** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107** | 36, 59, 66, 80, 91, **149**, **158**, **175**, ~~**195**~~, **213** | 45, **204** | | 73, ~~**114**~~, **168**, **231** | 52, 122, **140**, **184** |
| **Sky & atmosphere** | 27, 43 | | 19, 35, 50, 57, 95, **135**, **153**, **161**, **181**, **190**, **208**, **225**, **236** | | | 61, 81, 89, **115**, **200** | ~~**134**~~, **144** |
| **People & activity** | 41, 56, **127**, **170**, **186** | 49 | 34, 64, 93, **104**, **119**, **145**, **178**, **201**, **210**, **240** | 78, **111** | | 84, **137**, **163**, **226** | 71, **154**, **191** |

- **Interaction/UX — the FEATURE INVENTORY was rotated to the archive at 211 (history, not steering).** ⚠ **229 is
  cross-cutting (the TEXT LAYER: `<meta charset>` ⇒ every tooltip + the stats panel), so it sits here, not in a
  grid cell.** It **repealed 134's rule** — raw UTF-8 in JS string literals is now SAFE (the file is
  self-describing; `probes/probe-charset.mjs` asserts it), so **do not hand-escape a `·` or an `é`.** What steers:
  when adding an entity array, `stamp()` it in its draw + add an `ENTINFO` row (same discipline as the census hook).
  `stamp()` also draws the focus ring, so any stamped entity is ringable free — and since 133 a hovered TILE is
  ringed too. **An `ENTINFO` `sub` may be a FUNCTION of the entity (105)** — use it when a thing's interest is its
  *membership* (which line / route / depot; **211's `Feeds — Line N of M`**), computed live, never a stored string.
- **ROTATION.** Last vector per domain: Transport **230** · Civic **231** ·
  Water **234** · Sky **236** · Nature **238** · Urban **239** · People **240**. **237 was the 27th step-back; the
  28th is DUE NOW (~242).**
  ➡ **NEXT: Transport** (stalest, 230; cue **(am)** is fresh) — or take the 🔴 below. ⚠ **Read the `peds` cap
  first** (111) before designing anything road-borne.
  ✅ **225's grep-the-seam law is 3 for 3 — it has now shipped Sky (236), Nature (238) and PEOPLE (240) off domains
  the header had written off.** ⇒ **An empty cue list is not evidence of saturation; it is evidence nobody has
  grepped.** The standing 🔴 is **(ai) THE CITY HAS NO FRINGE** — measured, 233 tried and reverted, but **the way
  through is NAMED** (hold the rim and widen the core in ONE lap, so `developed` stays flat and the gate opens). It
  outranks kind-rotation (119) whenever a Nature/Urban lap comes up.
  ⚠ **239: NAME THE FILE, NEVER A LETTER, in a visual A/B** (law in SKILL.md; 238's crossed mapping guards a *bias*,
  not the *bookkeeping*). **240 is its payoff — both agents, asked per FILE NAME, md5'd the paths and caught a bug in
  MY CAMERA (a duplicated frame passed off as the whole-city read). Ask per file, and an agent can audit your tool.**
  🔴 **228'S LAW HAS NOW RECURSED THREE TIMES, EVERY TIME ON A PROBE THIS HARNESS ALREADY OWNED** (237 found two;
  **238 found the third INSIDE the probe 237 had just repaired**). The general form is a LAW in SKILL.md — *read
  what a probe MEASURES and WHERE IT SAMPLES, not what it is called, and apply 228's test PER METRIC.*
  ✅ **240: THE STADIUM HAS A FIXTURE LIST** (`fixtureAt`/`matchClock`/`matchLive`/`matchGate`/`matchWord` — ONE
  predicate, five readers). Its two gates were **INVERTED**: the "match-day crowd" stood on the concourse
  `if(LITAMT<0.75)` — every afternoon, forever, for a match that never kicked off — while the floodlights came up
  `if(LITAMT>0.3)`, blazing over the **empty** bowl that same gate had just emptied. ~50% of nights now have a game;
  the ground is **dark otherwise** (masts keep a 0.12 security glim). 🔑 **A NEW SLOW CLOCK IS OPEN TO EVERY DOMAIN: `Math.floor(dayT)` is a REAL DAY COUNTER** (`dayT+=dt*s/110` never wraps) — the artifact's only multi-day clock besides `MOONSYN`, and **it cannot strobe** (a day is 110 s).
  ✅ **236: THE SKY HAS A WEATHER FRONT** (`rainFront()`/`cloudWet()`, keyed to **`year`**; body archived at 237).
  ⚠ **`cl.rain` IS GONE** — code written against it reads `undefined`; the ONE predicate is **`cloudWet(cl)` (0..1)**
  and all six readers share it. **`year+k` = same season, different weather.**
  ⚠ **233 took (ai) and REVERTED** — NOT closed; do not re-try a bare rim mask, read (ai).
  ✅ **CLOSED LADDERS — DO NOT RE-OPEN. Bodies archived; every law is in SKILL.md.** The **WASH ladder**
  (214→220→221→223→**234**: every surface routing through `col()` now keeps its identity after dark; **audit by
  `dHUE`, never a target hue**; invariant ASSERTED by `probe-goldenhue.mjs` — warnings at (aa)/(ae)) · the **TOWER
  LOOK** (228 crown + **235** footprint; its law: *a banked probe can carry the RIGHT instrument under the WRONG
  NAME* — `probe-crown`'s `silo()` had been convicting the towers all along) · the **SKYLINE ladder** (217→224,
  `c.th` SPENT — warnings at (ac)) · the **HUD lap** (229 — both its cues were the HARNESS, not the city) · **137's
  standing-crowd cue** (226 ⇒ **People's cue list is EMPTY**). ⚠ **230's `taxi` flag is LOAD-BEARING** (`VCURF` thins
  the night fleet by CLASS — BUS/SERVICE/TAXI keep no hour). ⚠ **(y) and (s) were born from agents reading
  `shoot.mjs` output — REPRODUCE either in the user's configuration before designing to it** (229's law).
  ✅ **THE FAIL/ASIDE LAW HAS NOW PAID OUT NINE LAPS RUNNING** (232's detail archived at 237) — **but 237 is its
  first INVERSION: both agents' HEADLINE FAIL was RIGHT and correctly diagnosed.** ⇒ the law is *"grade the FAIL by
  measuring it"*, **not** *"the FAIL is always wrong"*. **Interaction/UX** (cross-cutting) last touched **229**.
  **CUES, RANKED** ((w)/(z) CLOSED 229, (t) 231, (u) 234, (af′) 235, **(al) CLOSED 239 — the building-look ladder
  is COMPLETE**; **(ab) RETIRED into (ak) at 238**): 🔴 **(ai)** THE CITY HAS NO FRINGE — **now the ONLY 🔴;
  measured; 233 tried and REVERTED, the way through is
  NAMED** · **(ak)** the season — **238 shipped the trees and REFRAMED it; its headline number is DEAD, read the cue
  before citing it** · **(ag)** the night greens stay hot (Nature × Polish) · **(y)** the scorched inland cluster
  (Nature × Polish) · **(ah)** the amphitheater's cavea has a **FIXED orientation** — it now often sits on the
  water's edge and does not face it (*"facing the bowl toward the river would look far
  more intentional"* — 231's agent, unprompted). 199's tell on a **draw**; Civic × Deepen · **(s)** golden-hour
  contrast collapse (Sky × Polish — CONSTRAINED; strengthened at 227) ·
  Nature's **GARDEN staggered beds**, held by (p). ✅ **225's grep-the-seam law is PROVEN — 236 shipped Sky off it,
  238 shipped Nature off it. Apply it to the next stale domain (People).**
  **225: THE SHADOWS READ THE SUN.** `shadS` (every shadow routes through it) carries a per-frame sun vector
  (**`SHOFF`** throw · **`SHLEN`** stretch · **`SHAMT`** opacity). ⚠ **Noon (t=0.415) is BYTE-IDENTICAL ⇒ a free
  dead-regime control for every shadow lap.** ⚠ **`SHAMT` must never reach 0 at night** — the residual patch is what
  keeps every ped, tree and car from FLOATING.
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
  (`year<2006`, forest `year<2030`) ⇒ **at 2035 nothing can ignite at all**; before then, **two one-cell episodes
  across 3 seeds × 61 years**, and fire **never spreads**. **`T.MARKET` again.** Reviving it is a real CA lap, not a
  freebie.
  **⚠ THE `polish-tile` BACKLOG — measured cues that are NOT growth laps. Do not spend a domain's lap on one; they
  need a tile redesign, and each already has a gate written.** (a) **THE WHOLE ELEVATED TRANSIT is sub-pixel at fit
  zoom** (0.5px rope, 5px cabins, hairline masts/pylons). ⚠ **NEVER RE-OPEN THE Z-ORDER — CORRECT and CLEARED by
  probe TWICE** (203/212: properly depth-sorted); agents have now mis-diagnosed it as a z-order tear **SIX times**
  (217, 232, 237×2 — *"scratches on the glass"*). **That very persistence is the evidence: the fault is
  LEGIBILITY** — a hairline READS on-top however well it is sorted, and 215 names the lever: **a hairline ornament
  needs a BODY**, not more strokes. *Do NOT re-try a body/halo under the rope (measured — backfires) or a lit top
  edge (impossible at 0.5px).* **This is now the single most-reported defect in the ledger.**
  (b) **`university` is the ONLY of the twelve civics with no `LITAMT`** — the one `MAJORK` monument
  pitch dark after sunset; every place to put the light failed (195; `probe-unilight.mjs` + `shot-uni.mjs`).
  (c) **A parked service vehicle needs its CIVIC TILE to have a visible apron on its front edge** (204, cue n). (d) **The marsh reeds do not read** — seven sub-pixel strokes round the pool; its calendar is already computed and invisible (cue (i), 113).
  **Sky is post-saturation (Deepen/Fix ONLY — its additive/CA cells are traps).** **Urban: additive spent (118), Connect measured-hard TWICE** — 160 (RES terracing: no seed forms E-W RES runs of >=3) and 165 (the `hstr` parade zigzags with row parity, longest straight-hex-axis run = 2 — not a clean arcade host); **Urban's next lap is Deepen/Polish only**. **Roof-furniture is CLOSED city-wide** (MID/RES tanks, TOWER gardens, COM plant 165, IND clerestory 173); the **GROUND PLANE is SPENT (209)** and **216 spent the FACADES** — only the **harbour apron** is left. ⚠ **"Urban is spent" was REFUTED from the SILHOUETTE side (232 → (af′), 237 → (al)) and that seam is now CLOSED TOO** (235 tower + **239** mid-rise). **The building look is DONE; Urban's next lap is neither massing nor facade.** (**Sky's moon is FIXED (135) and NAMED (144)**, both closed.
  **STILL banked for Sky: the SEASON word** — it reads the fast `year` and would strobe ~0.7 Hz (134), so it needs a
  slow clock FIRST; don't add `seasonWord(year)` to the HUD nor re-ship 134's REVERTED almanac. ⚠ **236's front is
  ALSO on `year` and is NOT that slow clock** — it cycles ~2 min on purpose, so a "weather word" would strobe too.)
  **Water's STILL-banked cue (123): the pier/lifeguard are still `rng()`-salted; site them on a depth by
  respending their draws (123's stream-neutral trick) — but that REPEATS 123's mechanism, so vary it.**
  **The asserts-less-than-the-code-knows tell is SPENT for agriculture** (orchard 129 + vineyard 139/148 + FARM 183,
  off ONE shared `*Phase()`; **238 spent the last of it — the CANOPY**). **GARDEN is the last mute one** — cue **(p)**
  OWNS it; **(al)/(ai)** outrank it. ⇒ **"Additive inventory spent" is a claim about a domain's ENTITIES, not its
  SURFACES** (127 put picnics on PARK's 878 hexes), **and a Deepen that adds no element is the documented way past
  additive saturation** (126). ⚠ **238 REFUTED this line's old claim that "the season cannot reach PARK"** — it
  reaches PARK's *lawn* at full strength (52.7, the city's most seasonal surface); PARK is diluted by the 55% of a
  park hex that is canopy + season-dead furniture. **Read (ak) before designing any seasonal vector.**
  **124 closed the LAST banked cue that moved a census number; the census is VACUOUS for most vectors now — reach
  for a probe.** Three laws govern step 1: **a cue is a POINTER, NOT A SPEC** (re-grep the seam before designing to
  it); **a banked, measured finding outranks kind-rotation and cell-emptiness** (119); **saturation beats
  kind-rotation** — when a domain's additive cell is spent, the KIND changes, not the domain (118).
  **Sky's additive/CA cells are TRAPS** (sky is not cellular; fog on terrain is already `rSea`/`fogAt`).
  **Cue (k) CLOSED (116/123).** Still steers: **run the tell FORWARDS** (make the string and the rule share ONE
  constant so they cannot drift — 123; 213's `civOpen()`). **⚠ A tick-rule cannot read the reach maps (151):**
  `recount()` never runs in the sim loop, so `rGreen`/`rShop`/`rServ` are STALE inside `tick()` — recompute locally.
  **THE FAIL/ASIDE LAW (212; a law in SKILL.md — the header keeps only the tally): in a whole-frame read the FAILs
  are where an agent is WRONG and the ASIDES are where it is RIGHT.** Paid out 213, 214×2, 215, 217, 219, 232, 236.
  ⚠ **237 INVERTED IT** — both agents' headline FAIL was right *and* correctly diagnosed. ⇒ **grade the FAIL by
  MEASURING it; do not assume it is wrong.** Still weight an aside two agents reach independently above any verdict.
  Perf ARC (refs as 202/207/212/217/222/227/237, directly comparable; per-step-back priors 202→227 archived at 233,
  232's lap-detail at 236). **At 237: LAP vs `d6b6f90` (232, 5 iters) day +1.4% / night −4.6% (free).
  ARC vs `7e2ac2c` (177, 60 iters) +17.2% / +13.8%; vs `5f01426` (162, 75 iters) +15.4% / +14.3%** (abs: day
  46.7-49.2ms · night 50.3-54.6ms — the box was loaded, read the DELTAS not the absolutes). At 232 the same refs
  read +16.4%/+11.9% and +17.9%/+13.7% ⇒ **five more iterations moved the arc ~+0.8pp day and the 162-ref arc not at
  all.** Arc rate ~**+0.2%/iteration**; diffuse, **NOT accelerating**; **ACCEPTED — do NOT open a perf lap.**
  `probe-drawbudget` (night) is **UNCHANGED from 207/232**: `drawCell` **94.1%**, `winBandR` **32.3%**, `prismS`
  **28.2%**, `hexTile` **12.2%**, `bandS` **7.6%** ⇒ still ~48% static terrain, **still no hot ornament.**
  ⚠ **A WORLD-CHANGING VECTOR IS NOT FREE just because its diff has no draw call — THE WORLD IS THE DRAW LIST**
  (222, body archived; the LAW is in SKILL.md). Price a CA/siting vector with `probe-drawbudget`, never by reading the diff.
  ⚠ **Cue (x) stands** (215's `seamVeg`: 692 path objects / 228 STROKES cost ~4x the fill model — a stroke-vs-fill sweep at equal path count is the best-supported open perf question).
  **⚠ THE STANDING PERF SUSPECT (207, UNCHANGED at 232/237; NAMED not mandated per 198): THERE IS NO HOT ORNAMENT —
  the arc is DIFFUSE**, which is why every per-lap gate reads it free. **No caching lap — 198's levers are CLOSED;
  the only lever is FEWER objects.**
  **The GAP-CLOSING trick (111/112/113) is SPENT in four domains; the TELL that replaced it (a label asserting what
  the draw ignores) is CASHED 8x** (117, 122, 129, 140, 148, 183, **238**) **and its host keeps moving DOWN: 199 a
  CONSTANT, 209 a COMMENT, 217 a HALF-FINISHED FIX, 238 a palette entry NO DRAW COULD REACH — see SKILL.md.** Still MUTE: `[T.IND]` (no calendar) and GARDEN
  (season-frozen draw — needs a Deepen first; and see **(ak)**, which now owns the season question). ⚠ 122: a
  tooltip vector needs a probe checking the claim against INDEPENDENTLY RECOMPUTED truth, not a screenshot.
  **Kind-picking, compressed (full text rotated to `GROWTH-archive.md` at 204).** **Scale** is the coldest kind and a
  structural lever, not a lap move. **New element** (last 127): a saturated domain cannot take one — but saturation is
  of a domain's ENTITIES, so one can still land on a large untouched **surface** (127 put picnics on PARK's 878 hexes).
  **Connect** (109/111/112/204): its trick is that it adds NO NEW OBJECT — it closes a gap between two that exist.
  **107 was a New CA rule that ADDED NOTHING** — *auditing an existing rule for reachability* is a New-CA-rule move
  available in every domain at zero content cost (`probe-market.mjs`; 204's `probe-firehost` found a ghost).
  ⚠ **Nature × Connect is the row's GRAVEYARD — attempted and REVERTED three times** (46 geometrically impossible ·
  88 no draw-only host · 101 found host *and* land and lost on **shape**). **Do not re-open it as a *corridor*.**
  **Cue (e½) CLOSED (102).** Nature's cold cells are Connect (leave it) and Scale. **(ak) is Nature's next lap.**
- **⚠ SCREEN SPACE IS SPOKEN FOR (200 — rotated to the archive at 237; the law is in SKILL.md).** Probes read
  `getImageData()` and are **blind to the HUD**; `.placard` owns the top-left, `.census`/`.controls` the bottom
  corners. For a VISIBILITY claim about a screen-space draw (`ctx.setTransform(dpr,…)`: sun, moon, stars) diff
  **`page.screenshot()`**. The open sky is a shallow **band** (~0.12 of the viewport across the middle) — measure
  it before siting anything in it, and **do not lower the sun** (that is cue (s)'s trap).
- **⚠ `peds` CANNOT SERVE THE ROAD NETWORK (111, measured — read before any People vector).** A resident is leashed
  to the open cell it is anchored to (`PEDLEASH=2`, tuned to hold street occupancy at ~19%), so only **20–31%** of bus
  stops have a live ped's anchor within a leash. "Residents walk to / wait at / ride the X" vectors are structurally
  capped at ~a quarter of any road-borne host. To do it properly move the **spawn pool** (`openCells` in
  `syncFleet`), not the leash.
- **PERF — the interleave is the ONLY honest grade, and `perf-baseline.json` is STALE ON PURPOSE** (day 33.16ms ·
  night 37.33ms, pinned 105; it has false-FAILed **nine** step-backs and always will — it cannot know today's
  machine load). Grade a lap **only** by interleaved A/B/A/B against the previous step-back, min per variant
  (`probes/perfab.mjs`, `REF=<sha>`). **The day column is the NOISY one on this box** — check the round spread;
  night is steady and is the SLOW-accumulating column (night-only draws pile up there).
  **The COST MODEL is MEASURED (198, `probe-shadcost.mjs`; prose archived at 237): a canvas ornament costs
  PER-ELLIPSE — per path object rasterized, NOT per `fill()`, NOT per unit area; a sprite blit is WORSE.**
  **Batching fills, shrinking radii and sprite-blitting are all CLOSED.** The only lever is drawing FEWER objects
  (a *visual* decision — price it, and be willing to pay: 194's tree shadows cost ~3% and are worth it).
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
  **(w)/(z) CLOSED 229 · (t) CLOSED 231 · (u) CLOSED 234 · (af)/(af′) CLOSED 228/235 — bodies archived, laws in SKILL.md.**
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
  ⚠ **`towerLook` publishes `bax`/`bay` — the ONE definition of "how wide is a tower"; the skybridge and helideck
  BOTH read it** (a point plan would have floated the bridge and overhung the pad). **Any new tower ornament must
  read it — and `midLook` (`fx`/`fy`/`segs`, furniture scaled by `rs`) is its walk-up twin. See (al).**
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
  **(aj) THE SHOWERS FALL WHERE NOBODY LIVES (236, seed 7, unprompted — and MEASURED).** *"Both showers fall on the
  OPEN OCEAN, not the city."* Half that FAIL was refuted; this half is real, and it is **pre-existing cloud siting,
  not 236's front** — clouds spawn `x:rng()*G, y:CTRY-20+rng()*40` with **no reference to the land**, so a seed can
  park its sky over the sea (seed 7 renders **sky 21,497 px vs ground 10,220**; seed 42 **8,547 vs 34,953** — a **4x
  swing from the same code**). ⚠ **AND ONLY 3–4 OF 7 SOAKED CLOUDS EVER RENDER A VEIL** (`probe-front` D): the draw
  spends a shower **2 hexes short of the rim**. **The lever is the SPAWN, not the draw** — bias `cl.x`/`cl.y` onto the
  live rows (`ROWMIN`/`ROWMAX`, `HEXI`) for ~2x the visible weather at **zero new draw work**. ⚠ Rain over the sea is
  **CORRECT** (201) — this is about *coverage*. **Sky × Polish.**
  **(ak) THE SEASON — REFRAMED by 238; body archived at 240. Read it before ANY seasonal vector.** ⚠ **Its headline
  "68% mute" number is DEAD**, and so is the cue's own prescription: the mute area is **DILUTION by the season-dead
  *CONTENTS* of each hex** (a park hex is 45% lawn / 12% canopy / **43% paths, ponds, benches, café furniture with no
  calendar**) — **not** dead palettes, and **NOT** the lawn, which (p) protects and which is already the city's most
  seasonal surface (52.7). ⇒ **A PALETTE LAP CANNOT REACH THE PER-TILE FLOOR.** Use **`probes/probe-seasonarea.mjs`**
  (area sample + **what % of a hex a palette entry PAINTS**), never `probe-season` (ONE centre pixel, blind to a
  park's canopy). Canopy amplitude is **AT ITS CEILING**. Honest moves left: give a park hex's season-dead contents a
  calendar, or **retire the metric**. **Nature.**
  ✅ **(al) CLOSED by 239 — THE BUILDING-LOOK LADDER IS COMPLETE** (228 tower crown · 235 tower footprint · **239 the
  MID-RISE, the building actually causing it**; body archived at 240). ⚠ **DO NOT RE-OPEN EITHER BUILDING** — both
  measured varied, a fifth axis keyed to HEIGHT rebuilds 110's defect, and the **~+2% draw ops are PAID**. ⚠ **EVERY
  FORM'S BASE IS ITS WIDEST PART** (an upper floor steps back from a party wall, never through it; **the party wall
  is the NEIGHBOUR'S WEST FACE**, not a constant).
  **(am) THE ELEVATED RAIL IS TOO LOUD AT FIT — the SAME cue as polish-tile's (a), from the OTHER SIDE (240, seed 7,
  unprompted on a PASSing frame).** *"Long straight grey beams criss-cross nearly the whole diorama in big X patterns,
  flattening the isometric read... the mid-city is closer to visual noise."* ⚠ **DO NOT re-open the z-order** (cleared
  by probe 3x: 203/212, and 240's agent called it *"correct for depth"* unprompted). **(a) calls the same structure
  sub-pixel and ILLEGIBLE — both reads are probably TRUE, and THAT is the finding: a hairline invisible up close and a
  hard grey X across the plate at fit.** Transport × Polish.
  **(an) TWO SMALL ASIDES (240, seed 42).** *"Pure-black transmission cables run out over the beach and sea, hard 1px
  lines against the sand"* · *"tiny white chevron glyphs on land (x≈0.47,y≈0.47), like stray marks."* **IDENTIFY BOTH DRAWS FIRST** (dead-code law) — the chevrons may be a mis-sited entity. Cheap.
  **(x) A STROKE MAY NOT PRICE LIKE A FILL (215, perf suspect — NAMED, NOT MANDATED; see the PERF bullet's "TWO
  HOLES").** Build a **stroke-vs-fill sweep at equal path-object count**; `CCACHE` key churn and per-mark style
  writes are both ruled OUT (measured **zero**).
  **(y) A SCORCHED-LOOKING HEX CLUSTER INLAND (216, seed 7, unprompted on a PASSing frame).** *"A small dark
  brown/scorched hex cluster in the mid-left inland block that reads oddly against the surrounding green."* ⚠ The
  fire CA is a **GHOST** (cannot ignite at 2035) ⇒ almost certainly **LOGGING/clearcut, not BURNT** — **identify the
  tile before designing** (dead-code law). Nature × Polish.
  **(s) GOLDEN HOUR: CONTRAST COLLAPSE (212+217+227+232 — CONSTRAINED; Sky × Polish; body archived at 237).** Raised
  at FOUR step-backs, always unprompted, always calling golden the WEAKEST frame. **The complaint is CONTRAST
  COLLAPSE ACROSS SURFACES, not the sun's position** (217 measured chroma RISING — a saturated wash, not mud); use
  `probe-goldenhue.mjs` to find which pairs collapse **before designing**. ⚠ **The sun CANNOT be lowered — 200 put
  it high ON PURPOSE** (the `.placard` owns the low-left sky). Reconcile the gradient's direction with the sun's, or
  move the warmth — **do not move the sun down.** Not a quick win.
- **Reach maps exist — reuse them (U5):** `reachFill(out, r, isSrc)` is a multi-source hex BFS capped at radius `r`,
  land-only (`WETSET` blocks water/marsh/kelp), filling `out` with steps-to-nearest-source (255 = farther than r).
  `recount()` runs four per tick. Any "how far is X from Y" question should call it, not hand-roll a flood fill.
- **⚠ Three census stats can FALL, by design (U5):** `walkPct`, `transitPct`, `solarPct` are **shares**, not counts.
  **Services are walkable's binding constraint** — a tower lap that adds residents without civics *drops* `walkPct`,
  and that is the stat working. Judge by whether the city earned the change, not "up = good". `density` rises with
  intensification and falls with sprawl.
---

<!-- rotated -->

> **Archive:** the 233 entries before Iteration 231 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

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

## Iteration 235 — every tower in the city was the same width (2026-07-13) [Urban fabric × Polish]

**Vector.** Urban fabric × Polish — cue **(af′)**, whose pre-registered trigger fired at 232. Urban's
own rotation was due (last 228) and this is the ledger's loudest standing cue: **six agents across
three step-backs**, on both seeds, always unprompted, have called downtown wallpaper.

**The instrument had to be re-derived, and 228's own law said so.** The cue arrives holding a probe
(`probe-crown`), and the trap was to run it, watch it pass, and acquit the towers for a fourth time.
228 fixed the **CROWN**; the 232 agents said **SILHOUETTE / MASS / FOOTPRINT** — *"variety was added
in plan but not in MASS/HEIGHT/FOOTPRINT"*. Re-reading `probe-crown` rather than trusting its
headline showed it already carries the right instrument (`silo()`: the **absolute half-width sampled
at 12 normalised heights** — the outline the eye traces), and that instrument was **convicting**, not
acquitting: **TOWER 5.3 distinct silhouettes, top share 54.1%**, against a healthy crown (19.0 / 15.8%).

**The defect was one number.** All four massings are drawn at the same half-extents — `0.32/0.28`,
`0.33/0.29`, `0.31/0.27`, `0.34/0.30`: **an aspect of 1.14 and a ~10% width spread for every tower in
the city.** So the styles differ only in what happens near the *top*, and the body below the roofline
— which is most of a tower — was one shape ~110 times per frame. This is **110's defect surviving on
the axis 110 did not decouple**: it split colour from silhouette and gave downtown 4 forms × 5 bodies,
and 228 added 5 crowns, but nothing ever varied the **plan**.

**Change.** A fifth independent seed-salted axis in `towerLook` — the **footprint** (`hashCell(…^0x1F5B)`
→ point `0.64×0.86` / block `1.00×1.00` / slab `1.32×1.00`, at cuts `.30/.36/.34`). It multiplies every
half-extent of all four massings, so the axes compose: **4 massings × 3 plans × 5 bodies × 5 crowns.**
Independent of `style` **and of height** — a footprint keyed to `v` would rebuild 110's *exact* defect
(corr(style,th) 0.73) on a new axis. **Mean `fx` is held at 1.000 by construction** (98's hold-the-mean),
so built mass, density and object count are all unchanged.
Three pieces of geometry assumed the old fixed width and were fixed with it:
- **The helideck** is a fixed 3.3px arc, and a roof's *shallow* axis binds it (`ay*21.3` vertical vs
  `ay*32` horizontal). The ziggurat was **already flush** at 3.41px, so a point plan would have hung the
  pad over its own roof edge. Sized off `fy`, it keeps exactly the fit the artifact already shipped. It
  **cannot** be gated off instead: `heliPads` is real world data (`c.th>90`) and the helicopter lands there.
- **The skybridge** spanned a fixed *fraction of the hex spacing* (0.28→0.72), which worked only because
  every tower was ~10.2px wide against an 8.96px inset. On a 6.6px point tower it would have started
  **2.4px clear of the building and hung in mid-air.** Both ends now inset 85% of each tower's **own**
  half-width — reproducing the shipped geometry for a block plan.
- To do that without a **second** answer to "how wide is a tower", `towerLook` now publishes the body's
  base half-extents (`bax`/`bay`) and both the draw and the bridge read them. *One predicate, one definition.*
- The contact shadow follows the plan too — a needle dropping a slab's shadow reads as standing beside
  its own footing.

**Census.** PASS, 0 page errors, and **every metric exactly +0** — `pop`, `towers`, `towerHt`,
`tallTowers`, `helipads`, tile histogram empty. Correct and expected: the footprint feeds no
`rng()`-gated predicate, so the change is stream-neutral and terrain-flat. Vacuous as a growth signal;
the iteration rests on the probe.

**Probe** (`probes/probe-crown.mjs`, 3 seeds, build-agnostic, **MID as control**):

| | HEAD | patch |
| --- | --- | --- |
| TOWER distinct silhouettes | 5.3 | **13.0** |
| TOWER top silhouette share (*the wallpaper number*) | **54.1%** | **22.0%** |
| TOWER distinct crowns | 19.0 | 33.7 |
| MID silhouettes / top (**control**) | 2.0 / 67.7% | **2.0 / 67.7%** — unmoved |
| `crownable-but-bare` (228's accounted residual) | 0 | **0** |

Crowns rose for free: a crown caps `tax/tay`, so the same crown on a slab and on a needle is a
different (width,height) pair. Tower counts identical (110/96/68).

**Perf.** Priced by **counting objects**, not by reading the diff (222) and not by the timer (216):
`probe-drawbudget` reads **day 109,213 → 109,200 (−0.01%)** and **night 138,573 → 138,492 (−0.06%)**.
Flat — a footprint is a change of **EXTENTS, not of objects**, so it is free by 198's per-path-object
cost model. `winBandR` does not subdivide by width. No timing gate was run and none is needed.

**Visual.** Blind A/B (`shot-crown.mjs`, day+night, whole-city + CBD close-up), one agent per seed,
**labels flipped between seeds** so agreement could not come from position. **Both picked the patch**,
and both described HEAD in the 232 agents' own vocabulary — *"a forest of near-identical slabs… one
extruded texture"* / *"repeated stamping… an even pincushion"* — against *"a genuine mix: broad plates,
fat blocks, and slender needles… towers read as individual buildings"*. Both explicitly cleared the two
failure modes the geometry fixes were aimed at: **no helipad overhangs a roof edge; no skybridge floats.**
No z-order tears, no blown-out colour, city still coherent. **VISUAL: PASS ×2.**

**Verdict: SHIPPED.** **Cue (af′) CLOSED, and the tower is now varied on all four of its axes**
(massing × plan × body × crown). The lesson is 228's own law paying out a second time: **the cue handed
me a probe, and the probe's headline number was about the wrong noun.** Reading what `silo()` actually
measured — instead of what `probe-crown` is *called* — turned a would-be fourth acquittal into a
one-command conviction. ⇒ **A banked probe can carry the right instrument under the wrong name.**

## Iteration 236 — the shower that had been raining since 1974 (2026-07-13) [Sky & atmosphere × Deepen]

**Vector.** Sky was the stalest domain (last touched 225) and its only banked cue, (s), is
CONSTRAINED. So I took **225's own law** — *a stale domain's cue list records where you have
already LOOKED, not where there is nothing to find; grep its seam* — and grepped the seam
instead of re-reading the cue list. The seam answered immediately.

**The defect.** `cl.rain` was rolled **once**, in `genWorld` (`rain:rng()<0.3`), and never
written again. So a cloud that spawned raining rained from the founding of the city, drifted
+x, **wrapped the plate at `x>G+6`, and rained again** — for the entire life of the diorama.
The `tick()` pass it feeds even says *"rain showers **passing** overhead"*. Meanwhile `WINDA`
one line away is a live gust cycle and `TIDE` a live ~2-min cycle: **Solvista had wind that
gusted and a sea that turned, and rain that was a permanent property of a cloud.** This is
**199's tell** (a name asserting a behaviour its value cannot have), hosted on a boolean.

**Change.** The roll becomes a per-cloud **threshold** — `cl.wf`, *how much of a front it takes
before this cloud lets go* — and the sky gets a **front** (`rainFront()`, two incommensurate
periods, ~20 yr-units ≈ 2 min at speed 1, seeded phase). A shower is now **continuous**
(`cloudWet()`, 0..1), so it gathers and clears instead of switching: the belly greys up first,
then the veil, the damp ground and the bow follow, all weighted by the same `w`.
- **ONE predicate, and every reader shares it** (the loop's own law): the veil, the wet patch,
  the rainbow, the grey belly and the meadow-bloom CA all read `cloudWet()`. It had been **six
  independent readers of one frozen boolean**.
- ⚠ **Keyed to `year`, NOT to `time`.** `tick()` reads this, and a CA that read the **wall
  clock** would make `genWorld`+`__warp` irreproducible and **blind every probe in the harness**.
  `year` advances 0.075/tick under `__warp`, so the front is deterministic there, freezes with
  `playing=false`, and **pins with `__setYear`** exactly as the seasons do. Season is `year%1`
  and the front is a ~20 yr cycle, so **`year+k` is the same season with different weather** —
  which is what let the camera hold the season fixed and vary only the sky.
- One `rng()` draw either way in `genWorld` ⇒ **stream-neutral at spawn**; and the bloom pass now
  spends its draws for **every** cloud, wet or dry, so **the weather can never reshuffle the
  seeded stream** (it decides where flowers come up, and nothing about the skyline).
- **98's hold-the-mean:** the front's base sits *below* the midpoint on purpose, so the MEAN
  number of showers stays at HEAD's (~2 of 7). This lap buys the **arc**, not a wetter city —
  and it keeps the draw-cost question shut by construction.

**Census.** PASS, 0 page errors. Core held and rose: `pop 171652→175353 (+2.2%)`, `developed
+0.3%`, `roads +0.3%`. The tile histogram moved broadly (`COM +83 / MID −72 / TOWER +21`) — the
expected **one-time chaotic reshuffle**, since the bloom pass's `rng()` draw count changed by
construction; it is a wash, not a tax, and nothing collapsed.

**Probe (`probes/probe-front.mjs`) — TEMPORAL, per 134: every gate this loop owns is FROZEN, and
this claim is about CADENCE. And the defect is its OWN CONTROL** — when the vector is *"make X
vary"*, HEAD's answer is a constant **by construction**, so no threshold had to be invented:

| | HEAD | patch |
| --- | --- | --- |
| seed 42 | **2 raining clouds, forever — DISTINCT STATES = 1** | 0–7, mean 2.8, **8 distinct states** |
| seed 7 | **1 raining cloud, forever — DISTINCT STATES = 1** | 0–5, mean 1.3, **5 distinct states** |

- **STROBE (134):** fastest turn-on **0.17–0.21 w/sec ⇒ a shower fades in over ~5–6 s** (a strobe
  is >1 w/sec). It gathers; it does not pop.
- **The front is deterministic** under `__setYear` and has real dry spells (seed 7: `rain 0 0 0 0`
  across ~40 s).
- **Isolated by SUPPRESSION in ONE page** (226/230/234 — set every `cl.wf=9` and re-render): the
  weather's ink runs **0 px (dry — an honest floor, byte-identical) → 31,717–51,747 px (front)**.

**Visual — the FAILs were WRONG and the AGENTS WERE RIGHT ANYWAY (212, both halves in one lap).**
Both agents, blind, **RANKED the three frames correctly** (dry → gathering → front) on both seeds,
which is the locate question and it passed. Seed 42 PASSed. Seed 7 FAILed on *"the raining cloud
bellies are not darkened"* — **refuted by measurement** (21,497 *visible* sky px at mean Δ33.9),
and then by a **fresh blind agent that pixel-sampled the bellies**: it found **6 of 6 isolable
clouds grey-bellied in the front frame and 0 in the dry frame** (`~(200,215,223)` vs
`~(229,240,240)`), named the rainy frame correctly, and called the belly legible at whole-city
zoom without hunting for drops. Ground truth: **7 soaked vs 0.** ⇒ `VISUAL: PASS`.

**⚠ BUT THE AGENTS' COUNT WAS RIGHT AND MY CAMERA'S CAPTION WAS WRONG — and that is the lap's law
(⇒ SKILL.md).** The camera printed **`RAINING=7/7`**, read straight off the *rule*; both agents
counted **2**. The draw spends a shower **2 hexes short of the rim**, so a cloud the front has
soaked renders **nothing** while it drifts over the void — only **3–4 of 7 ever put a veil on the
plate**. A self-reporting frame (202) that reports in the **rule's** units rather than the
**viewer's** (205) is **worse than no caption**: it looks authoritative, and it had me one step
from "the agents cannot count." The probe now prints **`soaked 7/7 -> RENDERED 4/7`**, and *the gap
is the finding*. **200 paid out again too:** 6,652 px of the weather's ink sits **behind the
placard** — masked out before any of the numbers above were believed.

**Perf.** Priced by **counting objects**, not by reading the diff (222 — this vector changes the
world). Day **109,207 → 110,162 (+0.9%)**, night **138,434 → 138,985 (+0.4%)**. Mechanically
explained and small: the mean rain is **held by construction** (98), and the grey belly is a
**colour** change costing **zero path objects**; the residual is the chaotic world reshuffle.
Not a perf lap.

**Verdict: SHIPPED.** The sky has weather. It gathers, it rains, it clears, and it is different
in every city — and `probes/shot-front.mjs` can pin any of it, at a fixed season, for the next lap.

## Iteration 237 — the twenty-seventh step-back finds two probes acquitting the city (2026-07-13) [holistic step-back]

**Vector.** The 27th holistic step-back (232 was the 26th). No feature. Read the whole
city at 3 lights × 2 calendars on 2 seeds, price the lap *and the arc*, and ask the
cumulative question: has anything compounded?

**Census.** PASS on unmodified HEAD (`schools -1`, `CIVIC -1`, `MID -1`, `RES +2` — the
±2 unfrozen-clock wobble 226 documented; this is the *same file* the baseline was pinned
from, so it is the harness, not the city).

**Perf.** LAP vs 232 (`d6b6f90`, 5 iters): day **+1.4%** · night **−4.6%** ⇒ free.
ARC vs 177 (`7e2ac2c`, 60 iters): **+17.2% / +13.8%**; vs 162 (`5f01426`, 75 iters):
**+15.4% / +14.3%**. At 232 those same refs read +16.4%/+11.9% and +17.9%/+13.7%, so five
iterations moved the arc ~+0.8pp on one ref and **not at all** on the other. Rate holds at
~**+0.2%/iteration**, diffuse, not accelerating — **ACCEPTED**. `probe-drawbudget` is
**unchanged from 207 and 232** (`drawCell` 94.1% · `winBandR` 32.3% · `prismS` 28.2% ·
`hexTile` 12.2%): still ~48% static terrain re-rasterized, **still no hot ornament.** The
last four laps added no draw-cost the instrument can see.

**Visual — both agents FAILed, on two seeds, and the FAIL/ASIDE law did NOT hold this
time: their HEADLINE was right and their DIAGNOSIS was right too.** Both located the night
core correctly by light alone ((0.47,0.55) and (0.50,0.60) — the CBD is findable, 217/224's
skyline ladder is holding). Both then made the *same* headline FAIL, independently: **the
winter frame does not read as winter.** *"Trees still full green, beach still has swimmers
and umbrellas, palms unchanged, sky identical — a crop-rotation frame, not a winter."*

**Measured — and this is the step-back's finding: 228'S LAW RECURSED TWICE, AND BOTH TIMES
THE ACQUITTING PROBE WAS ONE THIS HARNESS ALREADY OWNED.**

1. **(ak) The season is mute on 68% of the vegetation.** `probe-season` has been reporting
   a healthy calendar for laps, and the header had canonized its headline (*"FARM
   winter→dry-peak ≈ 88 is the tell that the calendar is working"*). It means **per TILE
   TYPE** — one row per type, so a 7-hex MEADOW weighs the same as a 563-hex PARK — and the
   calendar is loud on precisely the city's *smallest* surfaces. Re-weighted by footprint
   (the viewer's unit; the probe now prints it): **PARK 21.1 across 42.0% of the vegetated
   plate · FOREST 19.0 across 17.6% · REDWOOD 7.1 · GARDEN 6.9**, while **FARM 103.3**
   carries the season on **8.1%** of the area. ⇒ **912 / 1341 vegetated hexes (68.0%) sit
   below the legibility floor.** The agents were not failing to see the season; they were
   describing the measurement exactly.
2. **(al) The mid-rise is the real wallpaper — 235 fixed the wrong building.** 228 (crown)
   and 235 (footprint) closed the TOWER LOOK off six agents saying *"the towers are
   wallpaper"*. One lap later both agents said it **again**. Re-reading them, they never
   meant the towers: *"the **red-roof cube** tiles the entire southwest quadrant — roof
   colour varies, roof **form** does not."* `probe-crown` **had the number the whole time,
   printed as its CONTROL row**, so nobody read it as a finding: **MID = 2.0 silhouettes,
   top shape 68.8%, over 419.7 buildings per seed — 4.5× the tower count** — against
   TOWER's post-235 **12.3 / top 21.0%**. The city's most numerous building has two shapes.

**Refuted (again).** Both agents called the elevated transit lines a **z-order tear**
(*"scratches on the glass… drawn in front of towers they should be occluded by"*). This is
the **fifth and sixth** such report, and it is measured wrong: 203 and 212 both found the
rope and the monorail properly depth-sorted (8.4–23.6% and 10.6–19.8% occluded). **Do not
re-open the z-order.** The fault they are feeling is `polish-tile` cue (a): a **hairline
reads on top however well it is sorted**, and 215 names the lever — *a hairline ornament
needs a BODY.* That six independent agents keep mis-diagnosing it as z-order is itself the
strongest evidence yet that the legibility cue is real.

**Instrument fixed (227's precedent — a step-back repairs its own lying camera).**
`probes/probe-season.mjs` now prints each tile's **share of the vegetated plate**, an
**AREA-WEIGHTED** row, and the **mute-area** total. Its legibility floor (25/441) is *not* a
tuned constant: the data has a clean gap — everything an agent has ever named as turning
(VINEYARD 36, SHOREPARK 53, FARM 103) sits above it, everything they read as unchanged
(QUAD 24 … REDWOOD 7) below — so any value in 25..35 classifies identically (231's rule; and
it brackets an observation rather than a bar the artifact was built to clear, per 205).

**Other asides, banked not acted on.** Palms read as an identical stamp in a near-regular
lattice (seed 7, unprompted). 236's rain shafts *"cast nothing"* — consistent with 236's own
`RENDERED 4/7` finding, watch it. Seed 42: the right third of the plate is near-black land,
*"the city turns its back on its own water"* — that is (ai), the missing fringe, from a new
direction.

**Verdict: FIXED** (the instrument, not the city — the city's two defects are now *measured*
and handed to 238 and 239 with gates already written). The city is structurally sound: perf
accepted, downtown legible, no tears, no collapse. But it has been carrying a season that
only its farms can feel, and a mid-rise field that is two shapes wearing many colours — and
in both cases the harness owned a probe that was quietly saying so.

## Iteration 238 — the trees were the one green thing that never felt the summer (2026-07-13) [Nature × Deepen]

**Vector.** Cue **(ak)**, the step-back's #1 🔴: *the season is mute on 68% of the
vegetation*. Both 237 agents, blind, on two seeds, made the same headline FAIL — and both
used the same noun: ***"Trees* still full green… a crop-rotation frame, not a winter."*

**Change — two defects, stacked, both in the seam the cue pointed at.**
1. **The deciduous canopy had no `dry` term.** `applySeason` drives every other green off the
   drought curve — `grass`, `grassDk`, `meadow`, `lawn`, `turf` — and drove `canopy`/`canopyLt`
   off *autumn, spring and winter only*. At the dry peak (`s=0.62`) those three curves are all
   **exactly 0**, so `BASE.canopy` was returned to `CAN0` **unchanged**: every broadleaf in the
   city was *mathematically inert* on the loudest keyframe of this coast's calendar. It now dusts
   to a drought olive (`[176,152,84]` at `dry`), mixed FIRST so autumn's amber still lands on top
   of an already-dried canopy.
2. **The evergreen palette was read by everything except the evergreens.** `conifer`/`coniferLt`
   carried the comment *"evergreens sit out the seasons"* and were read by **exactly one draw —
   the REDWOOD** — while the thing actually *named* a conifer (`tree()`'s spire, `sp===1`) and the
   **palm** both drew from the **deciduous** `canopy`. Renamed **`evergreen`/`evergreenLt`** and
   pointed the spire and the palm at it. A palm no longer drought-stresses; a pine no longer ambers
   in autumn; and the mixed wood now reads **two-tone**.
   ⚠ I found this only after a `col('conifer'` grep came back clean and the page then threw:
   the redwood's call is `col(t===0?'coniferLt':'conifer',…)` — **a ternary hides a palette name
   from an anchored grep.** Grep `col([^)]*'name'`, never `col('name'`.

**Census.** PASS. Every metric flat, tile histogram empty (`pop -1`, `solarRoofs -2` = 226's
unfrozen-clock wobble). Colour-only: **zero path objects, zero geometry** ⇒ free by 198's cost
model. Byte-identical in **winter** (`dry=0`) — 199's free dead-regime control, which is also why
`probe-goldenhue`'s default-calendar assertions are untouched.

**Probe — and the probe is the finding.** `probes/probe-seasonarea.mjs` (new, banked).
- Canopy rendered swing winter→dry: **~8 → ~28** (3.5×), consistent across FOREST/PARK/ORCHARD.
- Area-weighted all-veg **26.8 → 28.4**. **FOREST 16.1 → 19.5 · PARK 20.2 → 22.2 — both still
  below the 25 floor. MUTE AREA UNCHANGED: 66.6% → 66.6%. (ak) IS NOT CLOSED.** Logged as measured,
  not as claimed.

**Visual.** Blind A/B, **crossed** between seeds (42: A=patch · 7: B=patch, so "the second one" is
wrong on one). **Both agents picked the patched build correctly**, and both — *unprompted, never
told the distinction existed* — reported the conifer spires and the palms staying green while only
the broadleaf rounds turn: *"two populations behave differently… a nice two-tone stipple instead of
a flat wash."* Both: drought-stressed, **not** autumnal ("no orange, no rust, no bare trunks"). Both
whole-city frames clean — no tears, no clutter. **VISUAL: PASS ×2.** One caveat banked: *"near the
far end of the safe range in the sunniest hexes"* — the amplitude is at its ceiling, and the reason
is structural: the dry olive sits only ~24 RGB from the **autumn** amber, and they must stay distinct.

**Verdict: DEEPENED.** The trees answer the calendar; the evergreens are finally real.

**⇒ THE HANDOFF, AND IT IS WORTH MORE THAN THE SHIP: (ak)'S OWN GATE WAS THE WRONG INSTRUMENT —
228'S LAW RECURSING A *THIRD* TIME, INSIDE THE PROBE 237 REPAIRED.** `probe-season` samples **ONE
PIXEL, at the hex centre**. PARK draws its trees at grid *offsets* and its pond/fountain *at* the
centre ⇒ **it is structurally blind to a park's canopy.** On the *same* change it reported **PARK
20.8 → 20.9 (unmoved)** and **FOREST 18.9 → 27.1 ("crossed the floor")** — both artifacts of where
one pixel happened to land. 237 fixed that probe's weighting **BETWEEN** tile types and left the
sample **WITHIN** a hex at one pixel: **two different unit errors, only the first closed.**
⇒ **And the area probe REFRAMES (ak) entirely. Every vegetated GROUND is already seasonal** — lawn
swings **52.7**, grassDk **31.8**, grass **34.4** — and **SHOREPARK, which is 88.7% lawn, reads 44.4
and is NOT mute.** The greens turn fine. **PARK reads 20.2 because a park hex is only 45% lawn**;
the rest is canopy (12%) plus **paths, ponds, benches, playgrounds and café furniture that have no
calendar at all**. FOREST is 17% canopy over a `grassDk` floor darkened by canopy-closure shade.
⇒ **(ak)'s "68% mute" is dominated by DILUTION — season-dead furniture, hardscape, shadow and
understory INSIDE each hex — not by dead palettes, and NOT by the lawn (which (p) rightly forbids
touching, and which is already the most seasonal surface in the city).** A palette lap cannot reach
the per-tile floor. The next lap on (ak) must either give the season-dead *contents* of a park hex a
calendar, or accept the floor as unreachable and retire the metric.

## Iteration 239 — every walk-up in the city was the same cube (2026-07-13) [Urban fabric × Polish]

**Vector.** Urban fabric × Polish — the ledger's #1 🔴 cue **(al)**, the only red with an
unspent lever. 228 (crowns) and 235 (footprints) closed the TOWER LOOK off six agents'
*"the towers are wallpaper"*; at 237, one lap later, **both step-back agents said it again**,
on two seeds — and they were not talking about the towers: *"the **red-roof cube** tiles the
entire southwest quadrant — roof colour varies, roof **form** does not"* · *"the mid-left band
is a uniform grey-roof mush."*

**Change.** `midLook(x,y,v)` — the mid-rise gets the two axes 235 gave the tower, and for the
same reason. **TWO is not a figure of speech:** the walk-up's body was ONE prism of constant
half-width from pavement to roof, so `silo()` (the half-width at 12 heights — the outline the
eye traces) read the SAME value at every height, and the city held exactly **two** of them:
0.34 detached, 0.50 terraced. 99 gave it colour and 216 gave it a stripe rhythm; **a striped
cube is still a cube.**
- **PLAN** (free): 3 widths, `fx` mean 1.040.
- **PROFILE** (the half `silo()` can see): box · **shop plinth with the flats set back above**
  · **set-back attic storey**. **Every form's base is its widest part** — not a style choice
  but what keeps the terrace sound: an upper floor may step back from a party wall, **never
  through it**, so no two walk-ups can overlap however their plans differ.
- The **party wall is now the NEIGHBOUR'S WEST FACE**, wherever its plan puts it (was a
  hard-coded `gx+0.66`). At `fx≡1` it reduces to the old `jx=0.16 / ab=0.50` exactly.
- Bands, rails, roof cap and all roof furniture ride their own storey's width (`rs`), so
  nothing overhangs a narrowed attic. Means held (98): plan 1.040 × form 0.965 = **1.004**.

**Probe** (`probe-crown`, the instrument cue (al) names, roles swapped: **MID treatment, TOWER
control**). MID **silhouettes 2.0 → 20.7**, top shape **68.8% → 13.7%**; crowns 32.3 → 136.7.
**TOWER control byte-unmoved** (12.3 / 21.0%). **Population held: 419.7 → 419.7** (206 — a
massing rule must not starve its own stock). MID now out-varies the tower it was measured
against.

**Census.** PASS. Core flat (`pop`/`developed`/`roads` +0); tile histogram **empty** — correct
and expected for a draw-only vector (`solarRoofs +3` is 226's ±2 tick wobble). hashCell only,
no `rng()`, no terrain ⇒ stream and pop flat.

**Perf — PAID AND NAMED.** A step is inherently **+1 prism (3 fills)**, taken by ~58% of
walk-ups. Deterministic instrument (216/222 — frozen world, identical city both builds, 3
seeds): **+248 prisms/frame ⇒ day +1.85% / night +1.78% draw ops** (+2.3% path objects). **The
mechanism is fully accounted for — there is no unexplained cost.** ⚠ **The TIMER was unusable
today and I am not citing it:** two interleaved A/B rounds read day +4.9% then +2.9%, night
+2.9% then **+11.6%**, while **HEAD's own night absolute moved 49.2 → 52.2ms on byte-identical
code**. A change adding +1.78% night objects **cannot** cost 11.6% of the frame. 216's law
exactly — *when the timer has no mechanism behind it, count objects.* ~2% to give the city's
most numerous building (420/seed, **4.5x the towers**) a real massing is the trade 194 made for
tree shadows and the ledger called good.

**Visual.** PASS on both seeds (`shot-facade`, which aims at the densest MID cluster, so HEAD
and patch frame the same hex). Seed 7, asked **by file name**: HEAD **~1 distinct silhouette
("plain cube")**, patch **~4** — it named the plinth and the set-back unprompted — with no
interpenetration at the party walls, no roof furniture overhanging an edge, no z-tears, whole
city still coherent.

⚠ **THE GATE ALMOST FAILED A CORRECT CHANGE, AND THE CAUSE WAS THE LABELS.** Seed 42's agent
was given the pair as **"FRAME A" / "FRAME B"** and **transposed them** — it reported HEAD as
having 3–4 shapes and the patch as "essentially one shape", i.e. the exact inversion of the
probe. Its *substance* was right the whole time (it described *"a wider skirt/base course under
a set-back upper volume"* — a form that exists **only in the patch**) and only its letters were
crossed. Checked the instrument first (197: working file **is** the patch, md5-verified; the
two PNGs differ), then looked myself, then re-asked seed 7 **by file name with no letters at
all** — which came back correct and unambiguous. **Promoted to a law in SKILL.md.**

**Verdict: SHIPPED.** Cue **(al) CLOSED** — the ledger's most-reported defect (six agents,
three step-backs) is measured shut on the building that was actually causing it.

## Iteration 240 — the floodlights burned every night for a match that never kicked off (2026-07-13) [People & activity × Deepen]

**Vector.** People & activity × Deepen. People was the stalest domain (last touched 226) and
its cue list was **empty** — the exact case 225's grep-the-seam law is for. Grepped the seam
instead of trusting the saturation note, and the stadium's own comments confessed in two lines.

**The seam.** `drawCell`'s `T.STADIUM` case had **two gates, and they were inverted**:
- `if(LITAMT<0.75){ /* match-day crowd on the concourse */ }` — so the **same nine specks**
  (positions from `hashCell`, a constant) stood on the concourse **every afternoon of every
  year**, for a match that never kicked off.
- `if(LITAMT>0.3){ /* floodlit pitch: light cones + green glow */ }` — so the bowl was
  **floodlit every single night**, cones, halo and all, over stands *that same crowd gate had
  just emptied*.

The lights burned for nobody, and the crowd stood in broad daylight with the lights off. This
is **199's tell twice, back to back** (a name asserting a behaviour its value cannot have),
and it had survived the artifact's entire life. `syncFleet` was in on it too: the ped spawn
pool weights STADIUM ×3 under the comment *"markets & matches draw a crowd"*.

**Change.** Gave the city a **fixture list**, and made it ONE predicate every reader shares
(123/199/112). The clock was already there and nobody had noticed: **`dayT+=dt*s/110` never
wraps**, so `Math.floor(dayT)` is a **real day counter** — read, until now, by nothing but the
moon (`MOONSYN`). A fixture is hashed off that day index:
- `fixtureAt(day)` → kickoff in `dayT`-fraction, or −1. ~50% of days; ~1 in 3 is an afternoon
  kickoff, the rest evening (so dusk falls *during play* and the floodlights have a job).
- `matchClock()` / `matchLive()` / `matchGate()` → where we are in it. The concourse fills as
  the crowd arrives, **empties into the stands at kickoff** (a ground during play is loud and
  its concourse is bare), and floods back out at full time.
- Readers: the concourse crowd, a new **stands crowd** on the terracing, the floodlights +
  cones + pitch glow, `matchWord()` in the tooltip, and `residentWhere` (a resident on a
  stadium hex is now *"In the crowd at the match."*).
- The masts keep a **0.12 security glim** on a dark night, so the bowl doesn't drop out of the
  night skyline — but **nothing lights the pitch except a match**.

No `rng()`, no `Math.random`, no terrain: the seeded stream is byte-identical. The spawn pool
was deliberately **left alone** (`homeCells` is indexed by `rng()` — changing its length would
reshuffle every downstream seeded draw).

**Census.** PASS. `pop −1 · roads +0 · developed +0`, tile histogram **empty** — correct and
expected for a draw-only vector, and therefore **vacuous**. The gate is the probe.

**Probe** (`probes/probe-match.mjs`, 3 seeds; `probes/shot-match.mjs` is its camera).
Isolated by **suppressing the DECISION inside one page** (230: `fixtureAt = () => -1`, re-render
the same frozen world), so the diff *is* the match, at a floor of **exactly 0**, off the final
composited canvas — occlusion checked for free, and **build-agnostic** (234), no source swap.
```
                                     seed 42   seed 7   seed 1234
  floor (same frame twice)              0 px     0 px      0 px   <- honest zero (195f/203)
  EVENING match (crowd + floodlights)  161 px   156 px    148 px
  AFTERNOON match (the CROWD alone)     17 px    20 px     24 px  <- decomposes the above
  control: dark night, suppressed        0 px     0 px      0 px
  control: daylight,   suppressed        0 px     0 px      0 px
```
**HEAD is its own perfect control (236's corollary — the defect is a CONSTANT by
construction).** Pitch luminance at `tod 0.80`, over 12 consecutive nights:
- **HEAD: `DISTINCT VALUES = 1` on every seed** (97.3 / 101.3 / 104.2, identical all 12 nights)
  — the pitch is lit exactly the same every night, forever.
- **Patch:** lit *only* on fixture nights (42: 90.0 dark → 99.4 lit · 7: 94.3 → 102.1 ·
  1234: 96.3 → 106.2), and HEAD's constant sits **at the lit value** — proving HEAD was
  floodlighting an empty bowl every night of the city's life.

**Cadence (134 — a claim about MOTION needs a temporal probe).** Play lasts **18 s** and the
gates **8 s** on the 110 s `dayT` clock. Nothing here can strobe. Fixture rate over 200 days:
**50% / 50% / 49%**.

**Visual.** Both seeds PASS, and the close-up A/B was called **"obvious at a glance"** on both:
*"a bright, saturated green oval that glows against the dusk-purple city... crowd clearly
visible as a speckled cream/red ring filling the stands... all four masts have bright white
lamp heads"* vs the dark night's *"flat, muted olive/grey-green oval, no glow... stands are a
plain unspeckled band... masts are bare grey poles."* Whole-city night frames PASS on both.
✅ **The blind LOCATE landed on ground truth (108).** Told only *"somewhere there is a stadium
with a floodlit pitch — find it"*, the agent put it at **x≈0.295, y≈0.50** (seed 42) and
**x≈0.40, y≈0.40** (seed 7). True: **(0.295, 0.50)** and **(0.398, 0.41)**. It found the ground
*by its light alone*.

⚠ **THE GATE'S ONLY FAIL WAS MY CAMERA, AND BOTH AGENTS CAUGHT IT BY md5.** The first round
FAILed on both seeds: `city-night.png` was **byte-identical** to `match-night.png`. Cause —
`scale`/`offX` are page globals that **survive a `page.evaluate`**, so "leave the camera alone"
left it parked on the stadium and the "whole-city" frame was the zoomed clip. Fixed at source
(restore the artifact's own published `fitScale`/`fitX`/`fitY`) — **227's law: a documented trap
you keep walking into is a broken tool, not a law.** Asking **per FILE NAME** (239) is what made
it catchable: the agents md5'd the paths I named.

**Verdict: SHIPPED.**
