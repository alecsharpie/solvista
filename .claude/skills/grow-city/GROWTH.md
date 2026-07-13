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
| **Transport** | 2, 9, 21, 31, 48, **164** | 77 | 28, 39, 55, 63, **112**, **121**, **128**, **155**, **179**, **193**, **230** | 5, 15, **138**, **211** | U4 | U1, U3, 70, 85, 87, 94, **146**, **188**, ~~**203**~~, **241**, **243** | **105**, **171** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107** | 36, 59, 66, 80, 91, **149**, **158**, **175**, ~~**195**~~, **213** | 45, **204** | | 73, ~~**114**~~, **168**, **231** | 52, 122, **140**, **184** |
| **Sky & atmosphere** | 27, 43 | | 19, 35, 50, 57, 95, **135**, **153**, **161**, **181**, **190**, **208**, **225**, **236** | | | 61, 81, 89, **115**, **200**, **242** | ~~**134**~~, **144** |
| **People & activity** | 41, 56, **127**, **170**, **186** | 49 | 34, 64, 93, **104**, **119**, **145**, **178**, **201**, **210**, **240** | 78, **111** | | 84, **137**, **163**, **226** | 71, **154**, **191** |

- **Interaction/UX — the FEATURE INVENTORY was rotated to the archive at 211 (history, not steering).** ⚠ **229 is
  cross-cutting (the TEXT LAYER: `<meta charset>` ⇒ every tooltip + the stats panel), so it sits here, not in a
  grid cell.** It **repealed 134's rule** — raw UTF-8 in JS string literals is now SAFE (the file is
  self-describing; `probes/probe-charset.mjs` asserts it), so **do not hand-escape a `·` or an `é`.** What steers:
  when adding an entity array, `stamp()` it in its draw + add an `ENTINFO` row (same discipline as the census hook).
  `stamp()` also draws the focus ring, so any stamped entity is ringable free — and since 133 a hovered TILE is
  ringed too. **An `ENTINFO` `sub` may be a FUNCTION of the entity (105)** — use it when a thing's interest is its
  *membership* (which line / route / depot; **211's `Feeds — Line N of M`**), computed live, never a stored string.
- **ROTATION.** Last vector per domain: Civic **231** · Water **234** · Nature **238** · Urban **239** ·
  People **240** · Sky **242** · Transport **243**. **242 was the 28th step-back; the 29th is due at ~247.**
  ➡ **NEXT: Civic (stalest, 231)** — or take the 🔴 below. ⚠ **Read the `peds` cap
  first** (111) before designing anything road-borne.
  ✅ **242 (the 28th step-back): THE CLOUD SHADE FELL ON THE OPEN SEA — FIXED.** Both step-back agents, blind, on two
  different seeds, unprompted: *"dark oval blobs on the water with no cloud above them"* / *"cloud shadows without
  their clouds"* (**212's aside law, tenth payout**). The shade was gated `if(inB(cl.x|0,cl.y|0))` under a comment
  promising *"shade only falls where there is ground to catch it"* — but **`inB()` is the PLATE, and the plate runs
  out to sea.** Now gated on `inB` **× a sampled LAND FRACTION** over the shade's own footprint (`WETSET`, the one
  definition of wet — reused, not re-rolled). Sea ink **−83%** (seed 42: **−100%**); land control **byte-identical**
  on the inland-dominant seed; free (path objects ±0.07%). ⚠ **MARSH/KELP no longer catch cloud shade** (they are in
  `WETSET`) — both agents read that as an improvement (the kelp went teal, not olive).
  🔑 **ITS LAW (in SKILL.md): A LATER DRAW CITED AN EARLIER ONE AS AUTHORITY FOR A STANDARD IT NEVER ENFORCED** — the
  rainbow's *"cf. the cloud shade above — no ground, no bow"* cites as precedent a gate that was never doing the job.
  **199/209's tell has a new host: a CROSS-REFERENCE.** When code cites a neighbour as the precedent for an
  invariant, **go read the neighbour.**
  ✅ **241: THE ELEVATED NETWORK HAS A BUDGET** (`RAILCAP=130`; cue (am) CLOSED — see (am) below; law in SKILL.md).
  ✅ **225's grep-the-seam law is 3 for 3** (Sky 236, Nature 238, People 240 — all off domains written off as stale)
  ⇒ **an empty cue list is not saturation; it is evidence nobody has grepped.** **(ai)** outranks kind-rotation (119).
  ⚠ **239: NAME THE FILE, NEVER A LETTER, in a visual A/B** (law in SKILL.md; 238's crossed mapping guards a *bias*,
  not the *bookkeeping*). **240/242 are its payoff — asked per FILE NAME, agents md5'd the paths and audited my own
  camera.**
  🔴 **228'S LAW HAS RECURSED THREE TIMES, EVERY TIME ON A PROBE THIS HARNESS ALREADY OWNED** (237 found two; 238
  found the third INSIDE the probe 237 had just repaired). Law in SKILL.md — *read what a probe MEASURES and WHERE IT
  SAMPLES, not what it is called; apply 228's test PER METRIC.*
  ✅ **240: THE STADIUM HAS A FIXTURE LIST** (`fixtureAt`/`matchClock`/`matchLive`/`matchGate`/`matchWord` — ONE
  predicate, five readers; lap detail archived at 242). 🔑 **A SLOW CLOCK IS OPEN TO EVERY DOMAIN:
  `Math.floor(dayT)` is a REAL DAY COUNTER** (`dayT+=dt*s/110` never wraps) — the artifact's only multi-day clock
  besides `MOONSYN`, and **it cannot strobe** (a day is 110 s).
  ✅ **236: THE SKY HAS A WEATHER FRONT** (`rainFront()`/`cloudWet()`, keyed to **`year`**; body archived at 237).
  ⚠ **`cl.rain` IS GONE** — code written against it reads `undefined`; the ONE predicate is **`cloudWet(cl)` (0..1)**
  and all six readers share it. **`year+k` = same season, different weather.**
  ⚠ **233 took (ai) and REVERTED** — NOT closed; do not re-try a bare rim mask, read (ai).
  ✅ **CLOSED LADDERS — DO NOT RE-OPEN. Bodies archived; every law is in SKILL.md.** The **WASH ladder**
  (214→220→221→223→**234**; **audit by `dHUE`, never a target hue** — warnings at (aa)/(ae)) · the **TOWER LOOK**
  (228 crown + **235** footprint) · the **SKYLINE ladder** (217→224, `c.th` SPENT — warnings at (ac)) · the **HUD
  lap** (229 — both its cues were the HARNESS, not the city) · **137's standing-crowd cue** (226). ⚠ **230's `taxi`
  flag is LOAD-BEARING** (`VCURF` thins the night fleet by CLASS). ⚠ **(y) and (s) were born from agents reading
  `shoot.mjs` output — REPRODUCE either in the user's configuration before designing to it** (229's law).
  ✅ **THE FAIL/ASIDE LAW HAS NOW PAID OUT TEN LAPS RUNNING** (232's detail archived at 237) — **237 is its
  first INVERSION: both agents' HEADLINE FAIL was RIGHT and correctly diagnosed** ⇒ the law is *"grade the FAIL by
  measuring it"*, **not** *"the FAIL is always wrong"*. **242 is its purest payout yet: seed 7's FAIL named the
  elevated rail's z-order — the SEVENTH time that has been raised and the seventh time it is wrong (CLEARED BY PROBE
  TWICE, 203/212) — while the ASIDE both agents reached independently, on different seeds, in passing (*"dark blobs
  on the water with no cloud above them"*), was REAL, and became the lap.** **Interaction/UX** (cross-cutting) last
  touched **229**.
  **CUES, RANKED** ((w)/(z) CLOSED 229, (t) 231, (u) 234, (af′) 235, (al) 239, (am) 241, **(an) 243**; **(aj)'s SHADE half CLOSED
  242 — its cloud-SITING half is still open**; **(ab) RETIRED into (ak) at 238**): 🔴 **(ai)** THE CITY HAS NO FRINGE
  — **measured; 233 tried and REVERTED, the way through is
  NAMED** · **(ao)** the rain shafts / rainbow are not bounded by the ground (Sky × Polish,
  cheap — 242 proved the family is real) · **(ak)** the season — ⚠ **242: both agents, both seeds, independently —
  winter reads as "lusher", NOT as winter**; read the cue, its prescription is dead · **(ag)** the night greens stay
  hot — **reconfirmed 242**, squarely on 222's ladder invariant (Nature × Polish) · **(y)** the scorched inland
  cluster (Nature × Polish) · **(ah)** the amphitheater's cavea has a **FIXED orientation** — it now often sits on the
  water's edge and does not face it (*"facing the bowl toward the river would look far
  more intentional"* — 231's agent, unprompted). 199's tell on a **draw**; Civic × Deepen · **(s)** golden-hour
  contrast collapse (Sky × Polish — CONSTRAINED; strengthened at 227) ·
  Nature's **GARDEN staggered beds**, held by (p). ✅ **225's grep-the-seam law is PROVEN — 236 shipped Sky off it,
  238 shipped Nature off it. Apply it to the next stale domain (People).**
  **225: THE SHADOWS READ THE SUN.** `shadS` (every shadow routes through it) carries a per-frame sun vector
  (**`SHOFF`** throw · **`SHLEN`** stretch · **`SHAMT`** opacity). ⚠ **Noon (t=0.415) is BYTE-IDENTICAL ⇒ a free
  dead-regime control for every shadow lap.** ⚠ **`SHAMT` must never reach 0 at night** — the residual patch is what
  keeps every ped, tree and car from FLOATING. **(Bodies of the older laps were rotated at 227/242; WARNINGS only.)**
  ⚠ **226: `census.mjs` DOES NOT FREEZE THE CLOCK** ⇒ tick-sensitive metrics (`solarRoofs`) **wobble ±2**; core
  metrics unaffected. **To test whether an unintended metric move is YOURS, re-run the SAME FILE, not HEAD.**
  ⚠ **231: THREE PREDICATES, DON'T MIX THEM (body archived at 242).** `openFront`/`frontLoad` count **TALLT
  MEMBERSHIP** — wrong for anything drawn flat. **`groundLoad(x,y)` is the ground-level one**: sums drawn **HEIGHT**,
  reads **`c.th` never `c.h`**, and counts a `RAISEABLE` lot at `FUTUREH` — **an empty lot is not a clear view, it is
  a building that has not been built yet.** ⚠ **Aim a CAMERA by measured ink, never by any of the three (226).**
  ⚠ **Settled audits, bodies archived at 242 — the live warnings only.** **213:** `nightDeep()` is **pinned at 1 all
  day** (a trap for any NON-draw reader); the civic night-light audit is **DONE** — three lights are off the curve on
  purpose (school janitor, hall clock face, parliament lantern), **do not "fix" them**. **211/210:** `frontLoad` is
  the sharper `openFront`; **both ship as PREFERENCES, NEVER GATES (206)**, and `LITAMT` returns to **0.64** by the
  small hours, so any gate `LITAMT > 0.64` defines a "night" that **ENDS BEFORE DAWN**. **137's "the ped/dog system is
  NON-REPRODUCIBLE" is DISPROVEN** ⇒ **People is probe-able like any domain**. **209:** the **GROUND PLANE is SPENT**
  (216 spent the FACADES); its law — *when a domain looks interconnect-saturated, ask what LARGE SURFACES wear a
  palette name that cannot carry the signal* — is in SKILL.md. **206:** the vacant lot is a **MIRAGE** (`EMPTY` with
  ≥2 RES nbrs falls **85 → 6.5** by 2035, **0.0** with a road adjacent); development eats every gap.
  **⚠ THE FIRE CA IS A GHOST — do not build "X answers the fire"** (`probe-firehost`; body archived at 242).
  Ignition is year-gated ⇒ **at 2035 nothing can ignite at all**, and fire **never spreads**. **`T.MARKET` again.**
  **⚠ THE `polish-tile` BACKLOG — measured cues that are NOT growth laps. Do not spend a domain's lap on one; they
  need a tile redesign, and each already has a gate written.** (a) **THE WHOLE ELEVATED TRANSIT is sub-pixel at fit
  zoom** (0.5px rope, 5px cabins, hairline masts/pylons; body archived at 242). ⚠ **NEVER RE-OPEN THE Z-ORDER —
  CLEARED BY PROBE TWICE** (203/212); agents have now mis-diagnosed it as a z-order tear **SEVEN times** (217, 232,
  237×2, **242**). **That persistence IS the evidence: the fault is LEGIBILITY** — a hairline reads on-top however
  well it is sorted, and **a hairline ornament needs a BODY** (215), not more strokes. *Do NOT re-try a body/halo
  under the rope (measured — backfires) or a lit top edge (impossible at 0.5px).* **Still the single most-reported
  defect in the ledger.**
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
  ⚠ **241: an agent attributed a QUANTITY difference to a STYLE one** — on a diff with **no draw code**, it called the
  losing build's beams *"darker and thicker"* (it has **18% more track**). ⇒ **More of a thing reads as a heavier draw;
  check your diff first.** ⚠ **243: a cue can bundle a REAL defect with a MISREAD — see (an).**
  Perf ARC (refs as 202/207/212/217/222/227/237/242, directly comparable; per-step-back priors 202→227 archived at
  233, 232's lap-detail at 236). **At 242: ARC vs `7e2ac2c` (177, 65 iters) day +18.6% / night +12.8%** — against
  237's +17.2%/+13.8%, i.e. **the arc did NOT move over this lap.** Arc rate ~**+0.2%/iteration**; diffuse, **NOT
  accelerating**; **ACCEPTED — do NOT open a perf lap.**
  🔑 **242 IS 216'S LAW PAYING OUT ON A STEP-BACK, AND IT IS WHY THE LAP GATE MUST NOT BE READ ALONE.** The
  interleaved LAP timer vs `8aa998a` (237) read a *stable* **day +2.4% / night +2.2%** — which, over a 5-iteration
  lap in which **241 REMOVED draw work**, has **no mechanism**. The deterministic instrument disagreed: path objects
  went **110,152 → 111,389 day (+1.1%)** and **138,970 → 140,189 night (+0.9%)** — dead on the ~+0.2%/iter arc — and
  the 177-ref arc was flat, corroborating the smaller number. ⇒ **The lap timer over-read by ~2x, and only the
  object count and the ARC could tell.** Grade a lap with `probe-drawbudget` **beside** `perfab`, never `perfab` alone.
  `probe-drawbudget` (night) is **UNCHANGED from 207/232**: `drawCell` **94.1%**, `winBandR` **32.3%**, `prismS`
  **28.2%**, `hexTile` **12.2%**, `bandS` **7.6%** ⇒ still ~48% static terrain, **still no hot ornament.**
  ⚠ **A WORLD-CHANGING VECTOR IS NOT FREE just because its diff has no draw call — THE WORLD IS THE DRAW LIST**
  (222, body archived; the LAW is in SKILL.md). Price a CA/siting vector with `probe-drawbudget`, never by reading the diff.
  ✅ **241 RAN IT IN REVERSE AND IT PAID: a world vector that REMOVES things gives draw work BACK.** Budgeting the
  monorail measured **path objects −3.2% day / −2.9% night (seed 7)**, **0.00% (seed 42 — byte-identical, already under
  budget)**. First give-back against the ~+0.2%/iter arc. ⇒ **Count the objects when a lap SUBTRACTS, not only when it adds.**
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
- **PERF — `perf-baseline.json` is STALE ON PURPOSE** (pinned 105; it has false-FAILed **ten** step-backs and always
  will — it cannot know today's machine load). Grade a lap by an interleaved A/B/A/B vs the previous step-back
  (`probes/perfab.mjs`, `REF=<sha>`) — **but NEVER by `perfab` ALONE: at 242 the lap timer over-read by ~2x and only
  `probe-drawbudget`'s object count and the ARC could tell** (see the ARC block). **The day column is the NOISY one
  on this box**; night is steady and is the SLOW-accumulating column.
  **The COST MODEL is MEASURED (198, `probe-shadcost.mjs`; prose archived at 237): a canvas ornament costs
  PER-ELLIPSE — per path object rasterized, NOT per `fill()`, NOT per unit area; a sprite blit is WORSE.**
  **Batching fills, shrinking radii and sprite-blitting are all CLOSED.** The only lever is drawing FEWER objects
  (a *visual* decision — price it, and be willing to pay: 194's tree shadows cost ~3% and are worth it).
  **⚠ THE COST MODEL HAS TWO HOLES, BOTH THE SAME SHAPE: 198's TABLE WAS MEASURED ON SOLID FILLS ONLY** (body
  archived at 242). Its findings hold only for solid `fill()`s; **GRADIENTS** (may price by AREA — they are evaluated
  per pixel) and **STROKES** (215's `seamVeg`) have each come in **~4x over the model**. Both PAID and ACCEPTED,
  neither MEASURED. **Do not shrink a gradient or cull a stroke "because 198 said count is what matters" — it said no
  such thing about either.** ⚠ **THE DEAD-REGIME CONTROL (199)** and ⚠ **NEVER GRADE BY CONSECUTIVE PASSES (117)** are
  LAWS in SKILL.md.
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
- **Traffic flow exists — `c.flow` + `ARTFLOW` (iter 77; body archived at 241).** `trafficFlow()` drains trips down
  the road network like a drainage tree; `flow>=ARTFLOW` (64) is an **arterial** (~15% of roads). It is a **network**
  measure, unlike the *local* `busy`. **Reuse `c.flow` for anything that should follow the main roads** — don't
  hand-roll a second notion of "important street"; `__find` answers `'arterial'`. ⚠ **But flow is a bad host for
  *land use* (82):** `RES→COM` on arterial frontage came out 85% **singletons** (by the time a street carries flow
  its frontage is already COM/MID/TOWER). Flow suits *point* decisions, not *linear* ones. **Don't re-try it.**
- **Institutions cluster: `MAJORK` / `QUARTER` / `siteQuarter()` (91; detail archived at 200/241).** `MAJORK` = the
  five monumental kinds — the shared vocabulary for "major institution", read by BOTH the civic quarter and the 2020+
  forecourt rule. `QUARTER` = the three that *seek* it; `observatory` is deliberately free to sit at the rim.
  `siteQuarter()` hugs the nearest standing major at **2-4 hexes** (adjacency would kill the bunting).
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
  and `lawn` share a base colour, so the dry-season divergence *is* the managed green's identity; lawns must stay
  greener/brighter than the hills **all year**. **⚠ GARDEN is STILL MUTE (1.8 → 5.4). Its own richer cue, which (p)
  OWNS:** staggered per-bed calendars + ONE shared `gardenPhase()` — beds at different stages is an allotment's whole
  visual identity (FARM staggers FIELDS; this staggers BEDS); run the tell FORWARDS (123). **Nature × Deepen.**
  **(aa)/(ad)/(ae) CLOSED (220 masonry, 221 greens, 223 normalisation); bodies archived. THE `col()` WASH LADDER IS
  COMPLETE** — ONE shared `washRGB(b,f,gr,gg,gb)`, colour-only (**zero path objects**, **byte-identical in daylight**
  ⇒ a free dead-regime control). ⚠ **Do NOT fork a second wash — EXTEND `washRGB`**; **GLASS (TOWER/COM) KEEPS the
  cool tint** and **ROAD staying grey is CORRECT** (214); **the invariant is ASSERTED by `probes/probe-goldenhue.mjs`
  — run it whenever you touch a gain triple.** ⚠ **234 added a THIRD caller — `WARMN` (timber), by NAME like `LEAFN`.**
  ⚠ **FARM (`cropRGB`/`colRGB`) is the ONLY warm surface still outside `col()`.** ⚠ **Watch: PARK↔ROAD separation is
  14, just under the ~15 collapse floor** — and **(ag) says the night greens read hot**, so that is where a lap bites.
  ⚠ **`towerLook` publishes `bax`/`bay` — the ONE definition of "how wide is a tower"; the skybridge and helideck
  BOTH read it** (a point plan would have floated the bridge and overhung the pad). **Any new tower ornament must
  read it — and `midLook` (`fx`/`fy`/`segs`, furniture scaled by `rs`) is its walk-up twin. See (al).**
  **(ag) THE NIGHT GREENS STAY HOT (227; RECONFIRMED 242 — the parks out-brighten the LIT streets and the sand
  *"glows like it's still dusk"*).** Sits on 222's ladder invariant (**no UNLIT surface may out-brighten the LIT
  ones**) and on 223's watch item (**PARK↔ROAD separation 14, just under the ~15 floor**) — likely one root cause.
  ⚠ **DO NOT gate on a pairwise separation — 221 proved separation REWARDS this class of bug**; gate on the surface's
  distance from its OWN daylight self, and re-run `probes/probe-goldenhue.mjs`. **Nature × Polish.**
  **🔴 (ai) THE CITY HAS NO FRINGE — IT IS DENSEST AT ITS RIM (232; MEASURED, `probes/probe-fringe.mjs`; agent quotes
  archived at 242).** Developed share of LAND by distance inward from the plate rim (6 seeds, sea excluded, pure world
  data): **rim 0-2 = 46.5% vs deep interior = 41.3% ⇒ taper −5.3 points, INVERTED.** The rim is the *most* built-up
  band on **5 of 6 seeds**; WILD land at the rim is **13.4%**. The diorama's outer boundary is a wall of buildings
  meeting the void. ⚠ **233 TOOK THIS AND REVERTED — STILL OPEN, and the obvious fix is MEASURED-DEAD**
  (`probes/probe-fringehost.mjs`, banked, runs on HEAD). **(1) The parcel roll is 100.0% SATURATED on every seed** ⇒
  per 218 `p` is a **DEAD lever**; only the **PREDICATE** steers it. **(2) ROAD is FLAT across rim bands** (29.5% vs
  33.6%) ⇒ the parcel rule is **INNOCENT** (218's host law) — it fills what the roads reach, and the roads reach the
  edge. **(3) THE DEV BUDGET HAS SLACK (1153/1382)** ⇒ a held-back rim lot is **NOT re-spent inland**; pop falls ~1:1.
  ⇒ **THE BOX: strong enough to READ as country ⇒ `developed` collapses −5.7..−9.3% and the census HARD-FAILS; weak
  enough to pass (ceiling ≈ −4.5%) ⇒ the noise-drawn belt is SEED-FRAGILE** (195: it must hold on EVERY seed).
  ✅ **The cost lands ENTIRELY OUTSIDE — downtown is NOT taxed.** ⇒ **THE WAY THROUGH: HOLD THE RIM AND WIDEN THE CORE
  IN ONE LAP.** The slack means the city *can* absorb the freed development inland if interior cells are made eligible
  (the predicate's `road within 2` is the lever; widening it in the INTERIOR ONLY is pure addition, 219) — then
  `developed` stays flat, **the census gate opens**, and the belt can be as strong as the eye needs. **Priced
  separately each half fails; the PAIR ships.**
  ⚠ Its three SHAPE laws (scatter ⇒ **speckle**; ring-strength ⇒ **offset halo**, since a `hexDist` field's boundary
  IS the plate's hexagon; the warp must **exceed the belt depth**) are **archived at 242 — read them before designing
  the belt's shape.**
  **(ac) CLOSED by 224 — the SKYLINE LADDER (217/218/219) is COMPLETE** (body archived): mass downtown *and* a taper.
  ⚠ **THE WHOLE `c.th` LADDER IS SPENT** — do not re-open placement (dead lever, 218), the COM fork (219), the height
  noise, or `TCAP` (224). (1) ⚠ **`c.th` HAS TWO WRITERS** (placement + the 2022+ growth rule) — touch one, check the
  other. (2) ⚠ **DO NOT DERIVE A TOWER CONSTANT FROM THE MEASURED MEAN `core`** — 98 did (0.125), 219 invalidated it
  (0.282) unnoticed for 6 laps; normalise by the formula's own max (⇒ SKILL.md).
  **(aj) THE SHOWERS FALL WHERE NOBODY LIVES (236; its SHADE half CLOSED by 242, its SITING half OPEN and now
  DOUBLY MEASURED).** Clouds spawn `x:rng()*G, y:CTRY-20+rng()*40` with **no reference to the land**, so a seed parks
  its sky over the sea — **242's probe counted 4/7, 6/7 and 3/7 clouds sitting off-land on seeds 42/7/1234**, which is
  the same defect from a second instrument. Only **3–4 of 7** soaked clouds ever render a veil (`probe-front` D; the
  draw spends a shower 2 hexes short of the rim). **The lever is the SPAWN, not the draw** — bias `cl.x`/`cl.y` onto
  the live rows (`ROWMIN`/`ROWMAX`, `HEXI`) for ~2x the visible weather at **zero new draw work**. ⚠ Rain over the sea
  is **CORRECT** (201) — this is about *coverage*. **Sky × Polish.**
  **(ak) THE SEASON — REFRAMED by 238; body archived at 240. Read it before ANY seasonal vector.** ⚠ **Its headline
  "68% mute" number is DEAD**, and so is its prescription: the mute area is **DILUTION by the season-dead *CONTENTS*
  of each hex** (a park hex is 45% lawn / 12% canopy / **43% paths, ponds, benches, furniture with no calendar**) —
  **not** dead palettes, and **NOT** the lawn ((p) protects it; it is already the city's most seasonal surface).
  ⇒ **A PALETTE LAP CANNOT REACH THE PER-TILE FLOOR.** Use **`probes/probe-seasonarea.mjs`** (area sample + **what %
  of a hex a palette entry PAINTS**), never `probe-season` (ONE centre pixel, blind to a park's canopy). Canopy
  amplitude is **AT ITS CEILING**. ⚠ **242 adds the reachable move**: both agents said winter reads as *lusher*, not
  as winter — **sky, sea, light and the BEACH CROWD are all season-blind.** Honest moves: a season-aware beach/people,
  give a park hex's season-dead contents a calendar, or **retire the metric**. **Nature.**
  ✅ **(al) CLOSED by 239 — THE BUILDING-LOOK LADDER IS COMPLETE** (228 crown · 235 footprint · 239 the MID-RISE; body
  archived at 241). ⚠ **DO NOT RE-OPEN EITHER BUILDING**; ⚠ **EVERY FORM'S BASE IS ITS WIDEST PART** (the party wall is
  the NEIGHBOUR'S WEST FACE, not a constant).
  ✅ **(am) CLOSED by 241 (body archived at 243; WARNINGS only).** ⚠ **DO NOT re-tune the beam's draw** (measured IN
  BAND on every axis) **and DO NOT bound a loop's RADIUS** (measured: that makes stubs, not loops). ⚠ **polish-tile's
  (a) (sub-pixel rope/masts) is a DIFFERENT, still-open cue.**
  ✅ **(an) CLOSED by 243 — IT WAS THE CABLE CAR, AND THE CUE WAS HALF A MISREAD.** `stepGond`'s value bar **DECAYS
  with the wait, with no floor**, so a line stalling at the coast accepts a **val-0 sea cell** and strings its rope
  into open water. Gated on **`WETSET`** (the ONE wet, 242): it **turns along the coast**, keeping its LENGTH; a
  **BEACH stays rideable** (that is what the tram is FOR). **SEA spans 3 → 0 / 6 seeds**, free (±0.06%). **Monorail
  exonerated** — a CLOSED LOOP crosses water and comes back, never terminates. ⚠ **SEED 42 NEVER REPRODUCED** (SEA 0
  in HEAD); its jetty ends in a **lighthouse**, its pier carries a **ferris wheel** — the referent is the **boardwalk
  + railing** (*"a pair of parallel lines"*), **on sand**. ⇒ **A cue can bundle a REAL defect with a MISREAD, and the
  MISREAD is what escalates it** — grade each seed's half separately. 240's aside stands: *"tiny white chevron glyphs
  on land (x≈0.47,y≈0.47)."* Cheap.
  🔑 **243'S LAW (SKILL.md): A "BEWARE, PROBE P OVER-REPORTS Y" NOTE IS A BUG REPORT, NOT A LAW.** The harness's own
  locator (`probe-darkline`) **failed at the one cue it was built for**: it scored the rain shafts' `CanvasGradient`
  as **8,160px of black ink** and **filtered the 12–14px rope spans out entirely**. SKILL.md had documented **both**
  traps for **40 iterations** — as prose telling the reader to compensate. **Both are now fixed IN THE TOOL**
  (gradients counted apart; `MINLEN=4` censuses chains). **229's law wearing a probe.**
  **(ao) THE WEATHER DRAWS ARE NOT BOUNDED BY THE GROUND (242, seed 7, unprompted) — 242 PROVED THIS FAMILY IS REAL.**
  *"The rain shafts cross the water's edge and keep raining over the empty cream backdrop"* (~0.94,0.38) · *"a flat
  rainbow lying ON the water, its right foot cut off mid-water"* (~0.78,0.31). **Same shape as the cloud shade 242
  just fixed**: a weather draw bounded by the *plate* (or nothing) rather than by the *ground*. ⚠ **The rainbow
  ALREADY has a `ROWMIN`/`ROWMAX` rim test** (`pa`) — so if its foot still lands in the sea, either that test is
  wrong or the complaint is about **water, not the rim**: measure first. ⚠ Rain over the sea is **CORRECT** (201);
  rain over the **VOID** is not. **Sky × Polish. Cheap.**
  **(x) A STROKE MAY NOT PRICE LIKE A FILL (215, perf suspect — NAMED, NOT MANDATED; see the PERF bullet).** Build a
  **stroke-vs-fill sweep at equal path-object count**; `CCACHE` churn and per-mark style writes are ruled OUT (zero).
  **(y) A SCORCHED-LOOKING HEX CLUSTER INLAND (216, seed 7, unprompted on a PASSing frame).** ⚠ The fire CA is a
  **GHOST** (cannot ignite at 2035) ⇒ almost certainly **LOGGING/clearcut, not BURNT** — **identify the tile before
  designing** (dead-code law). Nature × Polish.
  **(s) GOLDEN HOUR: CONTRAST COLLAPSE (212+217+227+232, and a FIFTH at 242 — both agents called golden the WEAKEST
  frame, *"a single textured mat"* / *"muddy brown-olive mush"*. CONSTRAINED; Sky × Polish; body archived at 237).**
  **The complaint is CONTRAST COLLAPSE ACROSS SURFACES, not the sun's position** (217 measured chroma RISING — a
  saturated wash, not mud); use `probe-goldenhue.mjs` to find which pairs collapse **before designing**. ⚠ **The sun
  CANNOT be lowered — 200 put it high ON PURPOSE** (the `.placard` owns the low-left sky). ⚠ **242 adds a lead: both
  agents said the SHADOW SIDES go warm** (*"warm-tinted shadows kill the form"*) — reconcile the gradient's direction
  with the sun's, or move the warmth. **Do not move the sun down.** Not a quick win.
- **Reach maps exist — reuse them (U5):** `reachFill(out, r, isSrc)` is a multi-source hex BFS capped at radius `r`,
  land-only (`WETSET` blocks water/marsh/kelp), filling `out` with steps-to-nearest-source (255 = farther than r).
  `recount()` runs four per tick. Any "how far is X from Y" question should call it, not hand-roll a flood fill.
- **⚠ Three census stats can FALL, by design (U5):** `walkPct`, `transitPct`, `solarPct` are **shares**, not counts.
  **Services are walkable's binding constraint** — a tower lap that adds residents without civics *drops* `walkPct`,
  and that is the stat working. Judge by whether the city earned the change, not "up = good". `density` rises with
  intensification and falls with sprawl.
---

<!-- rotated -->

> **Archive:** the 236 entries before Iteration 234 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

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

## Iteration 241 — three loops, each twice the width of the city it served (2026-07-13) [Transport × Polish]

**Vector.** Transport × Polish, taking cue **(am)** — 240's agent, unprompted on a PASSing frame:
*"Long straight grey beams criss-cross nearly the whole diorama in big X patterns, flattening the
isometric read... the mid-city is closer to visual noise."* The ledger called it "the single
most-reported defect", raised from two sides (polish-tile's (a) calls the same structure *sub-pixel
and illegible*).

**The cue's spec was wrong, and the probe killed it three times.** `probes/probe-railink.mjs`
isolates the elevated transit by suppressing its own draw fns and re-rendering **in one page**
(226/230/234's suppression family — floor **exactly 0** on every row, occlusion counted for free off
the final composited canvas, and build-agnostic so it runs unchanged on HEAD and patch). Against the
**house standard** (226 — the control is not a threshold I chose, it is *an ordinary building*,
isolated with the same rig):

- **"The beam is too bright" — FALSE.** Its ink sits at the **33rd percentile** of the building
  faces it flies over; its brightest decile cuts **dTop +37 / dBot −53**, against a building's
  **+57 / −55**. **In band.** Dimming it would only have served polish-tile's *illegible* cue a
  second helping. ⚠ Note the mean contrast is **−9** and hides all of this — **loudness lives in
  the TAILS**; a mean-only read acquits it.
- **"The gondola is the culprit" — FALSE.** Monorail **33,497 px** vs gondola **1,004** on seed 7. 33x.
- **"It has no visible legs" — FALSE.** **41.5%** of the monorail's ink already *is* pylons.

Every per-pixel property measured **in band**. The only quantity out of band was **EXTENT** — and
that is a property of the **network**, not of any draw.

**Change (the planner, not the draw — the diff contains not one drawing call).** `seedMono`'s
`minLen` was **fresh noise on every line (32..81)**, and the line COUNT (1..3) was rolled by a
**different rule that never read it**. Two independent lotteries, multiplied, with nothing in the
system aware of how much elevated track was already up: measured across 12 seeds, total track ran
**28..291 cells — a 10.4x spread**, on a plate only ~66 cells wide. Seed 7 — *the seed that drew the
complaint* — was the worst of the twelve: three loops of 79/102/110, **each roughly twice the
diameter of the city it served**. Now one city-wide budget (`RAILCAP=130`) is **shared across the
planned lines**: a one-line city still earns a grand circuit, a three-line city gets three compact
ones. `wander` (was a flat `+30` on every line) is now the line's own slice too.

**Census.** PASS. **`pop`/`roads`/`developed` +0 exactly** — byte-flat, because the monorail plans
off its own private PRNG (`seedNum^0xC17A`) and `monoSet` is read by nothing but the planner and the
draw. `monoLines` **11, unchanged — no line was deleted**; `stations 55→46` and `monorail 25→19`
fall in proportion to shorter loops, which is the intent.

**Probe (seed 7, day).** mono ink **33,497 → 20,072 px (−40%)**; beam width **36.4 → 23.8**; longest
single line across 12 seeds **133 → 73**; total max **291 → 175**; spread **10.4x → 6.3x** (and the
residue is all at the LOW end, which nobody complains about). **Seed 42 byte-identical** — it was
already under budget, so the fix touches only the fat tail. Columns crossed moves only **57% → 53%**:
three loops sited in three quarters still *touch* most of the frame even when compact. **Said plainly:
this cut the ink hard and the criss-cross geometry only somewhat.**

**Perf.** Path objects **−3.2% day / −2.9% night (seed 7)**, **0.00% (seed 42)**, −0.6% (1234).
222's law run in reverse: a world vector that *removes* things is a perf **credit**.

**Visual.** Two agents, blind, on a **crossed** A/B mapping (238) and asked **per file path** (239),
both picked the patch. Seed 7: HEAD *"long unbroken diagonals running corner-to-corner… two runs
cross into clear X's"*; patch *"chopped into shorter segments that close into local circuits…
noticeably fewer beam-on-beam crossings."* It put 240's sentence on **HEAD**. Both confirmed the
monorail **survived** — beams, pylons and trains legible, *"a reduction, not a stub"* — and found no
z-order tears, floating tiles or blown-out colour, day or night.

⚠ **One agent confabulated a cause**: it reported HEAD drawing *"the beams darker and thicker, with
denser heavier pylons"* on a diff with **no draw code in it**. Its *perception* was right (HEAD has
18% more track ⇒ 18% more beam and pylons in frame); its *cause* was invented. 212's law, new host.

**Rejected, and worth the warning: bounding the loop's RADIUS.** Homing the moment the railhead is
`R` hexes from its own first pylon *sounds* like the exact lever for "it spans the plate" — it is a
trap, and it is measured: a line then runs straight out and straight back, which is not a loop but a
**stub** (every line collapsed to ~20 cells; mean track 127 → 50, the feature gutted). **A loop's
radius and its length are coupled**; the route home costs ~65% again, which is where the first cut of
this budget leaked (a one-line city homed at 107 cells and still landed at 176). Divide the share by
that overshoot instead.

**Verdict: SHIPPED.** ⚠ **polish-tile's (a) — the sub-pixel rope/masts — is a DIFFERENT and still-open
cue. 241 did not touch the draw.**

## Iteration 242 — the twenty-eighth step-back finds the clouds shading the open sea (2026-07-13) [holistic step-back]

**Vector** — the 28th step-back (overdue; the header flagged it). Whole-city read at 2 seeds × 3 lights × 2
calendars, the perf lap + arc, the draw budget — then FIXED the one defect both agents found.

**The read.** Seed 42 PASS, seed 7 FAIL. Seed 7's headline FAIL was the **elevated rail's z-order** — the *seventh*
time that has been raised and the seventh time it is wrong (CLEARED BY PROBE TWICE, 203/212; it is a LEGIBILITY
defect, polish-tile's cue (a)). But **both agents, blind, on different seeds, unprompted, in passing** reported the
same thing: *"dark elliptical blobs sitting on the open ocean with no cloud above them — they look like holes in the
water"* (42) · *"dark oval blobs on the water with no cloud above them (cloud shadows without their clouds)"* (7).
**212's aside law, tenth payout — and its purest: the FAIL was the wrong diagnosis, the ASIDE was the lap.**

**The defect.** The cloud shade was gated
`if(inB(cl.x|0,cl.y|0)){ /* shade only falls where there is ground to catch it */ }`.
**`inB()` is the PLATE, and the plate runs out to sea** — so every cloud drifting over the ocean painted a dark
ellipse straight onto the water, ~250px below the puffs that cast it. 199/209's tell (a predicate that cannot
deliver what its comment asserts), and it had been there for the artifact's whole life.
🔑 **A NEW HOST FOR THE TELL, AND THE LAW OF THIS LAP: A LATER DRAW CITED AN EARLIER ONE AS AUTHORITY FOR A STANDARD
IT NEVER ENFORCED.** The rainbow (~L7515) builds a careful `ROWMIN`/`ROWMAX` rim test under the comment *"it fades
out as the shower leaves the plate (**cf. the cloud shade above — no ground, no bow**)"* — **citing as precedent a
gate that was never doing the job.** ⇒ **When code cites a neighbour as the precedent for an invariant, go read the
neighbour. A cited standard is not an enforced one.** (Promoted to SKILL.md.)

**Change** — `shadeGround(cl)` samples the shade ellipse's **own footprint** (5×3 cells, sized from `30*cl.s/CW` ×
`12*cl.s/ROWY`) and returns the **land fraction**, via `WETSET` — the artifact's one definition of wet, reused, not
re-rolled. Alpha scales by `min(1, 2·frac)`: **half a footprint of land casts a full shadow**, so a cloud standing
over the coast is not dimmed on its land side; only a cloud well out to sea fades away. The damp rain-patch scales
with it too (rain-wet ground on the open ocean is the same bug). `inB(centre)` is **kept** as a precondition.

⚠ **THE FIRST CUT WAS WRONG AND THE CONTROL CAUGHT IT.** Gating on the footprint *alone* (dropping `inB`) let clouds
whose **centre is off-plate** cast shade for the first time — the ellipse is **not clipped to the rim**, so it would
spill into the void: a *new* floating artifact, the very class the agents flagged. The probe's land control went
**+66% (up)** — impossible for a change that only ever multiplies alpha by a fraction ≤1 — which is what exposed it.
**A control that can only move one way, moving the other way, is the cheapest bug detector in the harness.**

**Probe** (`probes/probe-cloudshade.mjs`) — the claim in the **viewer's units** (205): *dark ink is landing on sea
pixels*. The suppression family (226 draw / 230 decision / 234 colour): render as shipped, re-render with **only the
shade's fill suppressed** (its `rgba(36,30,20,…)` is unique in the file) ⇒ the difference **IS** the shade layer, in
ONE page, **floor exactly 0**, off the composited canvas (occlusion free). The **water mask** comes from 234's
palette suppression (loud-paint the sea's `BASE` entries, flush `CCACHE`, re-render), so it is derived per-build and
the probe runs **unchanged on HEAD and patch** with no cross-build floor. HUD masked (200).

| | shade ink ON SEA | on LAND (control) | floor |
| --- | --- | --- | --- |
| HEAD (241) | **165,320** | 160,620 | 0 |
| patch | **27,334 (−83%)** | 136,866 | 0 |

Seed 42 goes to **exactly 0** sea ink (836 px → 0). Seed 7 (6/7 clouds off-land — cue (aj)) **72,003 → 8,519** ink.
**The control holds where it must:** on seed 1234 (clouds mostly inland) the land shade is **unchanged — 2,519 px,
49,259 → 49,255**. The residual sea ink is coastal spill *continuous with* a land shadow, which reads as a shadow,
not as a hole — and both agents counted it as zero blobs on open water.

**Census** — PASS, 0 page errors. Tile histogram **empty**, every core metric +0 (`greenRoofs +3` is 226's
documented tick-wobble). Correct and expected for a draw-only change, and exactly why the lap rests on the probe.

**Perf** — **free**: path objects day 111,389 → 111,469 (**+0.07%**), night 140,189 → 140,165 (**−0.02%**), inside
the probe's own run-to-run wobble. No new path objects; the change is alpha-only plus ~105 `cellAt` lookups/frame.
🔑 **AND THE STEP-BACK'S OWN PERF GATE IS 216'S LAW AGAIN.** The interleaved LAP timer vs 237 read a *stable* **day
+2.4% / night +2.2%** — which, over a lap in which **241 REMOVED draw work**, has **no mechanism**. The object count
disagreed: **110,152 → 111,389 day (+1.1%)**, **138,970 → 140,189 night (+0.9%)** — dead on the ~+0.2%/iter arc — and
the 177-ref **ARC was flat** (+18.6%/+12.8% vs 237's +17.2%/+13.8%), corroborating the smaller number. **The lap
timer over-read by ~2x.** ⇒ **Grade a lap with `probe-drawbudget` BESIDE `perfab`, never `perfab` alone.**

**Visual** — blind A/B, **per file name** (239), **crossed mapping** between seeds (238), asked to **COUNT** blobs
(108: locate, don't judge — a checkable answer). Both agents picked the patch. Seed 7: `sb7` **3 blobs** at
(0.92,0.55), (0.87,0.44), (0.81,0.71) → `fix7` **0**. Seed 42: `sb42` **1 blob** at (0.945,0.612) → `fix42` **0**.
Neither found any shadow spilling off the plate; neither lost a land shadow. Seed 7's `VISUAL: FAIL` **names pristine
HEAD as the defective build** — the strongest form of a pass this gate can produce.
⚠ **Side-effect, honestly reported: MARSH and KELP no longer catch cloud shade** (both are in `WETSET`). Both agents
read it as an improvement — the kelp went **teal instead of olive-brown** — and it is consistent with the coast's
long history of compounding dark. Noted rather than tuned.

**Banked from the asides** — 🔴 **(an)** the black cables running out over the beach and ending in the sea:
**re-reported by BOTH agents on BOTH seeds**, still **unidentified**, now the most-reported *undiagnosed* defect in
the ledger · **(ao)** the rain shafts and rainbow are not bounded by the ground (the same family this lap just fixed)
· **(ak)** *both* agents, independently: **winter reads as "lusher", not as winter** — the season is a
hue-on-vegetation signal only, and the beach crowd still sunbathes in January · **(ag)** reconfirmed (night parks
out-brighten the lit streets; the sand "glows like it's still dusk") · **(s)** golden-hour contrast collapse, raised
now at a **FIFTH** step-back.

**Verdict** — **FIXED.** The city is otherwise whole: no z-order tears, no blown-out colour, no broken geometry, the
night frame is the one that "has aged best", and the arc is flat. One 240-iteration-old defect, found by an aside,
closed by a probe with an honest zero.

## Iteration 243 — the cable car went for a swim (Transport × Polish, FIXED)

**Vector** — Transport × Polish. Took the ledger's **#1 🔴 cue (an)**: *"a pair of dark lines leaves the shore,
crosses the beach and open water, and ENDS IN THE WATER with no pylon or terminus — the single ugliest artefact in
the set"* (both step-back agents, both seeds, 242). It had stood **UNIDENTIFIED** — the most-reported undiagnosed
defect in the ledger — with an explicit instruction to `grep` the draw before designing.

**The instrument lied first, and that is the lap's real finding.** The harness owns a locator for exactly this
(`probe-darkline`). Run at the defect it was built for, its census came back headed by **8,160px of "black" ink
attributed to `render`** — which is **the rain shafts**, whose `CanvasGradient` `strokeStyle` has no luminance and
was being scored `#000`. Meanwhile the real suspect was **filtered out entirely**: a gondola rope span is ~12–14
device px and the probe's `len >= 30` per-stroke gate cannot see it. **SKILL.md documented BOTH traps, in detail,
and had done for 40 iterations** — as *prose telling the reader to compensate*, while the probe went on doing them.
Fixed in the tool: gradients counted apart and never scored as ink; `MINLEN` an env knob so it censuses chains.

**Change** — `stepGond` extends a line onto a cell only if it clears the value bar `c.val < g.bar - g.wait*0.002`
— and **that bar DECAYS with the wait, with no floor.** So an aerial line that stalls at the coast (nothing left
ashore is worth riding over) eventually drops its bar beneath a **val-0 sea cell** and strings its rope out into
open water, terminating there. The lever is the **predicate, not the rate** (218). One line, reusing **`WETSET`**
— the artifact's one definition of wet, established at 242 — rather than rolling a second one:
`if(WETSET.has(c.t)){g.fam=-g.fam;return;}`. It **turns along the coast instead of stopping**, so the line keeps its
LENGTH and only loses its swim. A **BEACH stays rideable**: an aerial tram over the sand is the good half of this
feature and is what the line is *for*.

**Probe** (`probes/probe-cablehost.mjs`, banked — pure world data, no render, no clock, no noise floor; `SRC=`
grades HEAD). Per line: length · **SEA spans (`WETSET`) kept separate from BEACH spans** · the tile it ends on.
6 seeds:

| | HEAD | patch |
| --- | --- | --- |
| seed 7 | len 17, **SEA 2** (idx 14,15 — the tail), ends BEACH | len 14, **SEA 0**, beach 5, ends BEACH |
| seed 5 | len 19, **SEA 1** (idx 16), ends BEACH | len 19, **SEA 0**, ends IND |
| 42 · 1234 · 99 · 2024 | SEA 0 | **SEA 0**, byte-identical routes |

**SEA spans 3 → 0 across six seeds; only the seeds that swam changed.** The **monorail is exonerated by the same
probe** (the control): it is a **closed loop**, crosses water 0–3 cells and comes back — a viaduct, never a terminus.

**Census** — PASS. Core byte-flat (`pop`/`roads`/`developed` +0), tile histogram **empty** — correct, the gondola
touches no terrain and rolls a private PRNG (`seedNum^0x60D0`). `greenRoofs -3` is **not mine**: re-running the
**SAME FILE** (226's law — never diff HEAD) moved it again to `-2`. **Free by 222's ledger**: path objects
**day 111,450 / night 140,102** vs 242's 111,389 / 140,189 = **+0.05% / −0.06%** — it reroutes spans, it doesn't add them.

**Visual** — blind agent, asked to **LOCATE not judge** (108), given **file names not letters** (239), traced
`head7`'s rope onto **masts standing in the water at ~(0.685,0.68)** and `fix7`'s terminating **on a mast on the
sand** — matching the world probe with no knowledge of it. No z-order tears, no floating tiles.

⚠ **BUT THE CUE WAS ONLY HALF REAL, AND SEED 42 NEVER REPRODUCED.** Seed 42's gondola has **SEA 0 in HEAD** — it runs
nowhere near the sea — yet seed 42 is the seed whose agent wrote the quote above. A second agent, asked to locate it
and told not to be agreeable, ran a **dark-pixel scan of the entire ocean half** and found **nothing**: the two
things over seed 42's water are a **jetty ending in a red-capped lighthouse** and a **pleasure pier carrying a ferris
wheel** — both properly terminated. Its read: the reviewer most likely misread the **beach boardwalk and its white
railing** (*a pair of parallel lines* — the cue's own words) which **stays entirely on sand**. ⇒ The cue bundled
**one real defect (seed 7's rope, now closed) with one misread (seed 42's boardwalk)**, and the misread is what
escalated it to 🔴 and to *"the single ugliest artefact in the set."*

**Verdict** — **FIXED.** 🔑 **Its law (in SKILL.md): A "BEWARE, THIS PROBE OVER-REPORTS Y" NOTE IS A BUG REPORT, NOT
A LAW.** The loop wrote the compensation for two instrument defects into its own prose and left the defects in the
code, so its banked locator failed at the one cue it was built for. **229's law wearing a probe** — a *discipline*
written where a *structural* fix was available. When you catch yourself writing "remember that probe P lies in way
X", stop and spend five minutes inside P.
