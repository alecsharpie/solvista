# Solvista growth ledger

Append-only log of `grow-city` iterations. Newest at the bottom. Each iteration =
one growth vector, verified by `census.mjs` (numeric, no-regression gate) + a
screenshot pass. This file is the loop's memory: rotate vectors, don't repeat.

Census matrix: seeds `[7, 42, 1234]` × eras `[1985, 2005, 2035]`, `t=0.35`.
Metrics are summed over all 9 cells of the matrix.

## State of the city (maintained header — UPDATE EACH ITERATION)

This grid + the notes below are what step 1 (Orient) reads instead of the whole archive. Cells hold iteration numbers
(**struck = explored and reverted**, so the cell is *attempted*, not *filled* — read its entry before re-trying it);
`U1`–`U5` are user-directed passes (U1 generative monorail · U2 feedback polish · U3 determinism audit · U4 hexagon
plate + plural rivers/monorails/cable cars · U5 census stats that can fall). **Interaction/UX is a column** (since 97);
cross-cutting vectors (U2, 42, U5) stay in the bullets below, not in a cell.

| Domain | New element | New CA rule | Deepen | Connect | Scale | Polish | Interaction/UX |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Nature** | 4, 26, 29, 102, **156**, **174** | 1, 13, 60, **206**, **279** | 37, 46, 67, 76, **108**, **120**, **139**, **166**, ~~**233**~~, **238**, ~~**246**~~, **263**, **272** | ~~46~~, ~~88~~, ~~101~~ | U4 | 53, 96, **194**, ~~**198**~~, **215**, **221**, ~~**251**~~ | **117**, **129**, **148**, **183** |
| **Water & coast** | 6, 10, 12, 16, 20, 33, 106, **169** | 90, **282** | 17, 25, 51, 65, 72, **113**, **123**, **159**, **196**, **245**, **257** | 22, ~~**205**~~ | | U2, 44, 58, 79, **116**, **132**, **150**, **185**, **214**, **223**,  **234**, ~~**255**~~, **266**, **268**, **275** | **97**, **141**, **176** |
| **Urban fabric** | 32, 62 | 7, 23, ~~82~~, **151**, **281** | 38, 54, 68, 92, **165**, **173**, **189**, **199**, **209**, ~~**218**~~, **219**, ~~**254**~~, **267** | 47, **109**, ~~**160**~~ | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103**, **110**, **118**, **124**, **143**, **180**, **216**, **220**, **224**, **228**, **235**, **239**, **274** | **133** |
| **Transport** | 2, 9, 21, 31, 48, **164** | 77, **283** | 28, 39, 55, 63, **112**, **121**, **128**, **155**, **179**, **193**, **230**, **249**, **258**, **269** | 5, 15, **138**, **211**, **276** | U4 | U1, U3, 70, 85, 87, 94, **146**, **188**, ~~**203**~~, **241**, **243** | **105**, **171** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107** | 36, 59, 66, 80, 91, **149**, **158**, **175**, ~~**195**~~, **213**, **244**, **250**, **259**, **277** | 45, **204** | | 73, ~~**114**~~, **168**, **231**, ~~**270**~~ | 52, 122, **140**, **184** |
| **Sky & atmosphere** | 27, 43 | | 19, 35, 50, 57, 95, **135**, **153**, **161**, **181**, **190**, **208**, **225**, **236**, **253**, **261**, **280** | | | 61, 81, 89, **115**, **200**, **242**, **248**, **265**, ~~**273**~~ | ~~**134**~~, **144** |
| **People & activity** | 41, 56, **127**, **170**, **186** | 49 | 34, 64, 93, **104**, **119**, **145**, **178**, **201**, **210**, **240**, **247**, **262**, **271** | 78, **111** | | 84, **137**, **163**, **226** | 71, **154**, **191**, **278** |

- **Interaction/UX** (inventory + the `<meta charset>` repeal archived at 270; both are INVARIANTS in SKILL.md). What
  steers: when adding an entity array, `stamp()` it in its draw + add an `ENTINFO` row (same discipline as the census
  hook) — `stamp()` also draws the focus ring, so any stamped entity is ringable free. **An `ENTINFO` `sub` may be a
  FUNCTION of the entity (105)** — use it when a thing's interest is its *membership* (line/route/depot), computed live.
- ✅ **THE TRIM METHOD** (paid 279, again 280): a block is cuttable when its **LAW is in SKILL.md** and its **ARTIFACT
  FACTS compress to their imperatives**; a *superseded* warning is free to cut (280's `__setWind` retired 275's).
  There is never a block you can simply *delete* — **compress the oldest, and pay for your OWN additions in the same lap.**
- **ROTATION.** Last vector per domain: Civic **277** · People **278** · Nature **279** · Sky **280** ·
  Urban **281** · Water **282** · Transport **283**. ➡ **NEXT: Civic (277) is oldest**, then People (278).
  ⚠ **CIVIC's stale cells are New CA rule (36/107) and Connect (45/204)** — 277 took Deepen.
  ⛔ **TRANSPORT'S TWO NAMED CUES ARE `polish-tile` JOBS, NOT GROWTH LAPS** — (a) the elevated transit and (av) the
  tram's catenary are the SAME 0.5px hairline family; do not spend a growth lap on either. ⇒ **Grep its `tick()`/
  `stepVehicle` seam and its FLAGS instead** (267 · 274 · 281 · 282 · **283**: FIVE straight laps where the RULES seam
  beat the cue list). Transport's stale cell is now **Interaction/UX (171)**.
  ➡ 🆕 **CUE (bd) IS THE NEW #1 — `phaseWord` READS THE *UNWARPED* CLOCK** (Sky × FIX; found by the 283 step-back).
  261 gave the season a **day length** (`sunWarp`) ⇒ the sun's state is a function of **`SUNT`**, not `dayT` — but
  `phaseWord(dayT)` was never re-keyed, so **the HUD prints `SUNSET` on a winter dusk whose sun has ALREADY SET**
  (`t=0.766`, sunset **0.701**, `LITAMT=0.95` — a frame that renders as full night). **264's law: a FIFTH reader of the
  remapped quantity.** One-word re-key. ⚠ **Grep EVERY reader of `dayT` in the same lap.**
  ➡ Then: **(aw)** (kayakers keep no hour) is the cheapest, **(au)** (the loft's rooftop
  studio reads as a green roof — Urban × Polish) is 274's leftover half, **(ax)** (fairy-ring contrast) is Nature's,
  **(ay)** (windrow LENGTH distribution) is Water's, and **(az)/(ba)** are 278's two new ones (below).
  ✅ **PEOPLE's four-Deepen run is BROKEN (278 took Interaction/UX, its stalest cell at 191).** Its **Polish** (226) is
  now the stale one. **Interaction/UX is no longer the stale COLUMN** — it ran at 278 after 49 laps dormant.
  🔑 **225'S GREP-THE-SEAM LAW IS 22 FOR 22 AT *FINDING*** (**283: a contagion whose SPONTANEOUS term had quietly
  converted 94% of its own host, so a "Boulevard" was the DEFAULT STATE of a developed street — 333/city against 29
  Avenues — and the label ladder iter 171 built on top of it had been naming a distinction that did not exist**)
  (282 a `tick()` pass that fires on TICK 1 and then converts
  NOTHING for 812 more ticks, whose own tooltip had written the silence down as a design fact — *"kelp carries no CA
  state (placed once in `genWorld`, never ticked)"* — FALSE about the mechanism and TRUE about the observable, which is
  exactly why nobody looked) (281 a flag whose WRITER skipped a type its VETO still counted · 280 a comment enumerating
  its own category · 278 a comment conceding the defect while justifying a workaround · 277 the census's scalars vs the placard · 267 a rule that had NEVER RUN · 268 a seabed built from the wrong noise · 269 a tram at 1.04x on its named avenue · 271 nine surfers who never went home · 272 an autumn CA that blinked the whole wood as ONE · 274 a new feature that never told the TYPE-KEYED TABLES it existed · 276 the BUS, which could not see the stop network it exists to serve) — **AND 270 IS THE FIRST DEFECT IT COULD NOT *FIX*** (structurally unbuildable on one hex). ⇒ **An empty cue list — or a passing probe — records where you have LOOKED, not what is THERE; and a found defect is not a fixable one: PRICE THE FIX BEFORE YOU PROMISE IT.** ⚠ **Grep `tick()`, the TABLES (`BEDT`/`CIVHRS`/`TILEDESC`/`valueSrc`/`VKIND`) AND THE COMMENTS — never the cue list.**
  🔑 **282: AND A FROZEN CENSUS COLUMN IS A SEAM.** The tile histogram is the cheapest seam-grep there is: **MARSH and KELP read the SAME COUNT at 1985, 2005 and 2035 on every seed** while the DUNE beside them in the same `tick()` climbs 20→35. ⚠ **A tile whose count never moves across the eras is either terrain or a DEAD RULE — check which.** (MARSH is still frozen: **unaudited**, its pass right beside the kelp's.)
  🔑 **281: AND NOW GREP THE *FLAG LIFECYCLE*, THE FOURTH SEAM** (law in SKILL.md). ⚠ **For every per-cell flag
  (`corner`/`loft`/`solar`/`groof`/`hstr`/`bridge`/`riv`), grep the passes that UPGRADE its host: does the flag RIDE the
  change or DIE with it? — and do the WRITER, DRAW, TOOLTIP and VETO agree on which types own it?** The tell, in one
  grep: **your flag's WRITER skips a type its VETO still counts.** *A flag that draws nothing and still vetoes is worse
  than no flag.*
  ✅ **283 = 37th STEP-BACK: s42 PASS, s7 FAIL on two ALREADY-BANKED deliberate decisions ONLY** (the golden wash, 265;
  skyline monotony, the CLOSED 224 ladder) ⇒ **no new compounding drift; 261'S SEASON IS ALIVE** (both agents named
  winter by the LIGHT ALONE, one reciting the mechanism unprompted). **Perf ARC in PATH OBJECTS vs 177 (106 laps):
  day 102,267 → 110,627 = +8.2%; night 137,258 → 138,404 = +0.8%** — *below* 278's +9.2%/+0.6% ⇒ **the arc is stopped
  and went DOWN this lap** (283 subtracted). ⚠ **PRICE THE ARC IN PATH OBJECTS, NOT MILLISECONDS** — `perfab` was
  unusable at 278 (the *same* file read **44.61ms** then **55.33ms**, a 24% swing on identical code). A ±30% load noise
  floor **cannot resolve a +0.1%/lap drift over any window**; path objects can, exactly, and are load-immune (216/198).
  ➡ **NEXT ~288.** ⚠ **BLIND A/B NAMES: NON-ORDINAL, AND CROSS THEM** (268). ⚠ **Both agents AGAIN called golden hour a
  near-monochrome peach/terracotta wash and the sea's dusk banding a faint lattice — BOTH ARE ALREADY-BANKED DELIBERATE
  DECISIONS, NOT NEW DRIFT** (265 chose the warm complement on purpose; 255/257/268 left the one-tone lattice as
  STRUCTURAL). Seed 7 also raised skyline monotony = the **CLOSED** skyline ladder (224). **Do not re-open any of the three on an aside.**
  ⛔ **255: DO NOT PAINT A *PER-HEX* SIGNAL INTO THE WATER'S BODY COLOUR.** A field **sampled per hex and rendered as a
  flat hexagonal FILL terraces onto the LATTICE**: SUBTLE (**d=0.57** ⇒ both blind agents saw **nothing**) or BRIGHT
  (**d=1.15** ⇒ *"a high-contrast hex QUILT... not a sea"*), **no middle**. The glitter escapes ONLY as a **low-alpha
  overlay** (max 0.16). ⚠ **257 NARROWED IT: the MECHANISM is PER-HEX SAMPLING**, so a term with **no `x`/`y`** cannot
  terrace. ⚠ **266 IS THE WAY THROUGH IT: a SHAPE that runs ALONG the tiling — sub-hex WIDTH, multi-hex LENGTH.**
  ⚠ **THE SEA'S OWN GRAIN IS THE NOISE FLOOR**: `seaT[]` is depth-in-eighths **+ two `hashCell` octaves** ⇒ within-sea
  luminance **SD 22.3**, which a blind agent on *pristine HEAD* called a honeycomb over *"90–100% of the open water."*
  ⚠ **Read the `peds` cap first** (111) before designing anything road-borne.
  ⛔ **254: THE BUILDING COLOUR CHANNEL IS SPENT — DO NOT RE-TRY *ANY* "THE BUILDINGS SHOULD SHOW X REGIONALLY" IN
  COLOUR** (age, value, density, flow — anything). **Body archived at 271; law in SKILL.md.** ✅ **THE HOST IS STILL LIVE
  AND UNREAD** (`c.age`: *the old town IS downtown*) — **but only a SHAPE, an ORNAMENT, a COUNT can show it. Never a
  hue.** (`probes/probe-buildingage.mjs`.)
  ✅ **(aq′) + 262 CLOSED — bodies archived at 277; laws in SKILL.md.** ⚠ **Retire `probe-seasonarea` as a seasonal score;
  the season is ~0 at MID-DAY BY CONSTRUCTION (264) ⇒ shoot it at the EVENING MARGIN.** ⚠ **Never add another
  global-light gate to anything that keeps hours (262).**
  🔴 **HOW TO READ THIS CUE LIST (251/255).** A bad instrument does not misgrade a lap — it **MANUFACTURES A CUE** that
  steers the loop for tens of iterations ((ag) was #1 for **24 iterations**, false on every count). 🔑 **A CUE
  RE-CONFIRMED IS NOT CORROBORATED UNLESS A *DIFFERENT* INSTRUMENT DID IT.** 🔴 **228's law has recursed NINE times, EVERY
  TIME on an instrument this harness already owned** (roster + bodies in SKILL.md) ⇒ *read what an instrument MEASURES,
  WHERE IT SAMPLES, and **WHICH PAIR IT COMPARES**.* ⚠ **263: a cue can be RIGHT about the tell and WRONG about the
  host** — check the host's **POPULATION**.
  ⛔ **259: `c.lit` CANNOT EXPRESS DARKNESS** — `lit=LITAMT*(0.35+0.65*c.lit)`, a **0.35 floor** ⇒ range **2.9:1**. **Fine as a CHOOSER, dead as a LOOK ⇒ do NOT build "X answers the night glow" in COLOUR.** (Body archived at 271.)
  ⚠ **ARTIFACT FACTS from 236–276 that are NOT laws and CANNOT be re-derived from SKILL.md** (the law-recaps these
  lines used to carry are in `GROWTH-archive.md`, "rotated out at 256"):
  **283:** 🔴 **THE BOULEVARD NOW *IS* ONE — IT NEVER WAS** (HEAD: **93.9% of every busy street treed**; `Boulevard` 333/city vs `Avenue` **29**; contagion **1.34x its own null**; only **15% of the canopy on a trunk route**. Full numbers in the 283 entry.) **`blvdSpark(c)` — ONE predicate: the grandest built-up trunk (`c.busy && c.flow>=ARTFLOW*BLVDGRAND`, `BLVDGRAND=2`).** ⚠ **THE SUBSTRATE IS THE BARE TRUNK AND MUST STAY SO** — a frontage gate on top SHATTERS it (biggest run **36 → 8 hexes**; 282's percolation law). **A SPARK is ONE cell so it MAY demand frontage; the SPREAD may not.** ⚠ **`BLVDGRAND=2` IS WORST-SEED GATED** (3 starves seed 99; a Poisson coin left it with **ONE tree** — 233). ⚠ **THE RATE IS HEAD'S OWN 0.002 — only the PREDICATE steers a saturated roll (218); do not tune it.** ⚠ **WHOLLY INERT** (zero `rng()`, writes only `c.treed`) ⇒ census core **BYTE-IDENTICAL**; path objects **−2.0% day**. ⚠ **`c.flow`/`c.busy` ARE LAST TICK'S** — the artifact's own idiom; do not "fix". ⚠ **A NON-TREED ROAD STILL DRAWS A SCATTERED STREET TREE** (`(x*3+y)%4===0`) so de-treeing does NOT bald a street — **and that fallback CONTAMINATES any `c.treed=false` suppression mask on 25% of hexes; suppress only the other 75%.** ⛔ **DO NOT RE-SHOOT AS AN A/B: THE VISUAL GATE CANNOT GRADE A REDISTRIBUTION** (law in SKILL.md) — at fit zoom a tree is ~3px and **HEAD's canopy is equally invisible**. Gate on `probes/probe-blvdnet.mjs` + the tooltip. ✅ **171's `probe-boulevard.mjs` HAD BEEN FAILING ON PRISTINE HEAD** (`describeTile` **preempts on `c.fete`**); **repaired, and given the `SRC=` it never had.** 🔑 **ITS CONTROL WAS THE FINDING: `Avenue` read 33 on HEAD seed 7 against a target of 327.**
  **282:** 🔴 **THE KELP CA NOW RUNS — IT NEVER HAD** (HEAD: bed stamped on TICK 1, `DISTINCT BED SIZES = 1`, turnover **0**, 6 seeds × 813 ticks). **`kelpLight(i)=1−rDeep[i]/KELPLIT`, `KELPLIT=SHELF1+1` — the KELP is the THIRD reader of the shelf band** (with the tooltip and the wind farm). ⚠ **`KELPP=0.62` IS HEAD'S OWN CONSTANT AND IS *PERCOLATION*, NOT DENSITY — DO NOT TUNE IT DOWN** (at 0.30 the substrate breaks into islands, the bed never leaves the sand and HALVES; law in SKILL.md). ⚠ **THE SCOUR MUST BITE IN THE INTERIOR** (`1−0.6*shel`, never `1−shel`) — with shelter fully protecting, a deep cell once surrounded is immortal and the bed fills its whole pool, which is **a third of the ocean** (`probe-kelppool`). ⚠ **THE BED IS NEVER LARGER THAN HEAD'S ON ANY SEED** (worst **34** vs 36; mean 16.0 vs 17.7) — *that* is what keeps the coast from darkening, and it is the ONE number to re-check after any kelp change. ⚠ **WHOLLY INERT**: zero `rng()` (TICKN-salted), and **WATER and KELP are BOTH in `WETSET`** ⇒ `pop`/`dev`/`roads` come back **BYTE-IDENTICAL** to HEAD on 6 seeds; census core **+0**, only KELP↔WATER swap (−15/+15). ⛔ **DO NOT BUILD "THE KELP ANSWERS THE CITY"** (runoff/turbidity): `dist(kelp→DEV/ROAD)` is **4.44–5.73 hexes and BYTE-IDENTICAL at 1985 and 2035 on every seed** — the city never comes ONE hex closer in fifty years. The field is a CONSTANT (`probe-kelphost`). ➡ 🆕 **MARSH IS THE SAME SHAPE AND IS UNAUDITED** (frozen 18/18/18, its pass adjacent).
  **281 (re-compressed 282):** 🔴 **`c.corner` IS A PROPERTY OF A *HOME*, NOT A *HOUSE* — `HOMES`={RES,MID}, ONE
  predicate, FOUR readers** (pass · veto · draw · tooltip). ⚠ **THE STORE RIDES THE BUILDING UP**; a **DEMOLISHED** home
  **clears** its flag — that clear kills the ghost veto, **do not drop it.** ⚠ **THE MID SHOPFRONT READS `midLook`'s
  PUBLISHED BODY** — never the RES body's hard-coded `0.30/0.26`; **`ph` IS LIFTED TO 5.2 ON A CORNER MID** (do not
  "tidy" away). ⚠ **STILL INERT** (census **+0**). ⚠ **The MID pool is 5.0/city vs 413 MID ⇒ CANNOT flood — no rate.**
  ⚠ **`drawBuilding`'s FIRST LINE is `const ML=c.t===T.MID?…`, ABOVE the RES branch** ⇒ a source-matching build detector
  must split on **`else if(c.t===T.MID)`**, or it reports HEAD as patched (it did: an exact TRANSPOSE).
  **280–277 (re-compressed at 283; FULL TEXT in `GROWTH-archive.md`, "rotated out at 283" — IMPERATIVES ONLY):**
  **280:** **`windForce()` · `windDrift()` · `kiteGust()` — the sky's gust, as THREE predicates.** ⚠ **`windDrift()` IS
  THE CLOUDS' OWN EXPRESSION** (`0.55+0.9*WINDA`); balloons share it — **do not fork a second.** ⚠ **EVERY LEVER IN
  `drawKite` IS A MULTIPLE OF `kiteGust()`, WHICH IS 1.0 AT FULL GALE = HEAD'S LITERALS** ⇒ an EXACT fixed point, and
  `window.kiteGust=()=>1` renders HEAD **in-page** (253). **Do not "simplify" that centring away.** ✅ **`__setWind(v)` /
  `__wind()` — THE HOOK `WINDA` NEVER HAD** (a FROZEN page holds a pin by construction). ⚠ **No `?wind=`.** ⚠ **A KITE IS
  NOT SINGLE-FREQUENCY** — `drawKite` runs **FOUR** ⇒ a "null step" of one period is **NOT null**. ⚠ **`px()` RETURNS
  *WORLD* COORDS** (device = `(px*scale+off)*dpr`; scoring ink at `px()*dpr` returns a clean, plausible **ZERO** — 273).
  **279:** 🔴 **THE WILDFIRE CA NOW RUNS — IT NEVER HAD.** `FIRESPK`/`TIMBSPK` are per-cell rolls **WALKED over `HEXI`**
  on `hashCell(x,y,seedNum^SALT^TICKN)` ⇒ **zero `rng()` — do NOT "tidy" them back onto `rc()`.** ⚠ **`FIREHOUSE` is the
  1991 engine as a FACTOR on the timber spark.** ⚠ **THE FIRE WRITES TERRAIN ⇒ it CANNOT be inert like the bloom** (expect
  the cascade). ⚠ **NOTHING BURNS AT 2035** (`year<2030`/`<2006`) ⇒ **a `?warp=61` frame can NEVER show a fire**;
  `probes/shot-firespark.mjs` drives `tick()` to a live episode. ⚠ **`tick()` DOES NOT ADVANCE `year` — `__warp` does.**
  ⚠ **`drawFire` AND THE BEACH BONFIRE TAKE A RAW LITERAL, NOT `col()`** (280's emitter law). ⇒ **CUE (bb) → `POLISH.md`
  (g2).** ⇒ 🆕 **CUE (bc) — THE FIRE'S GLOW IS EATEN BY LATER ROWS IN DENSE FABRIC** (266's z-order law): **a mark that
  must light its neighbours must trail back over cells ALREADY PAINTED.**
  **278:** **`hoverAt(mx,my)` — ONE hover, TWO callers** (the `mousemove` listener, and `frame()` via `hoverRefresh()` on
  a **120ms** throttle). ⚠ **THE CURSOR IS REMEMBERED IN *SCREEN* PX** (`hoverMX/hoverMY`). ⚠ **THE DOM IS WRITTEN ONLY
  WHEN THE SENTENCE CHANGES** (`hoverHTML`). ⚠ **`__hover` MUST DROP `hoverMX`.** ⚠ **NO CURSOR ⇒ `hoverRefresh()` IS ONE
  NULL CHECK** = a free dead-regime control (199). ⚠ **THE ARTIFACT DRAWS *TWO* FOCUS RINGS** — `stamp()`'s entity
  ellipse and `render()`'s post-pass tile hex outline; anything reporting "the ring" must name both. ⚠ **`pickEntity`
  TESTS `d<r*r` IN *WORLD* UNITS** (a resident's `r=5` ⇒ **3.2 CSS px** at fit) — **FINE, measured**; do not widen.
  ⇒ 🆕 **CUE (az) — VEHICLES UNDER-REACH THEIR OWN BODIES** (**23–29% of a car's own drawn pixels name NOTHING**).
  ⇒ 🆕 **CUE (ba) — THE TILE HOVER PICKS BY GROUND-PLANE CENTRE**, so pointing at a TOWER'S FACADE names the **ROAD HEX
  BEHIND IT**. **Pre-existing HEAD behaviour** ⇒ an **occlusion** problem (206/226); price it first.
  **277:** 🔴 **`recount()`'s pop NO LONGER READS `c.h`** — `c.h` grows ONLY inside `render()` and **`__warp` NEVER
  RENDERS**, so under every warp **every TOWER stood at `h=0` and housed NOBODY**. ⚠ **`c.h` IS A DRAW VARIABLE — NEVER
  LET A WORLD QUANTITY READ IT AGAIN.** ✅ **WARP == LIVE == INSTANT is an EXACT fixed point** (`probe-warppop`).
  ⚠ **272's settle-the-heights rule STILL STANDS for PIXEL diffs.** ⚠ **The school/university/stadium rules were
  INNOCENT — the siting lottery hits 98–100%** (`probes/probe-school.mjs`; **run it BEFORE blaming a roll**).
  **276–272 (re-compressed at 283; bodies archived at 279/283 — IMPERATIVES ONLY):**
  **276:** **`busNext(v)` — ONE predicate, THREE readers.** ⚠ **THE ROAD GRAPH IS *ONE* CONNECTED COMPONENT on 6 seeds
  in 6** — that is what LICENSES a **rail** where 269 could only have a **preference**. ⚠ **`roadField` IS THE HOUSE
  ROUTER** — do not hand-roll a second. ⚠ **`c.blast` IS THE SCHEDULE** ⇒ a headway rule needing **no new constant**.
  ⚠ **`busNext` is called on HEX ENTRY, never per frame.** ⚠ **`Math.random` only ⇒ seeded `rng()` untouched, core +0**
  — but it DOES shift the shared stream ⇒ **aggregate any control** (204).
  **275:** **`wrowHalf(t)`; `WROWN` normalises its MEAN to 1, SUMMED OVER THE POLYGON, NOT THE CURVE.** ⚠ **DO NOT RAISE
  `WROWSEG`.** ⚠ **`WINDA` IS A THIRD CLOCK AND `playing=false` DOES NOT STOP IT — pin it with `__setWind`** (280).
  ⚠ **`colA()` PUTS THE PALETTE THROUGH THE ILLUMINANT** ⇒ **a signature match on the `BASE` literal NEVER FIRES.**
  ⚠ **THERE IS NO `setZoom`** — the contract is `zoom=n; scale=fitScale*zoom`.
  **274:** **`windarkAt(c)` TAKES THE CELL, NOT THE TYPE — `bedOf(c)` is the ONE predicate, THREE readers**; a **loft
  gets `BEDT[T.MID]`**, from the ladder, not invented (226). ⚠ **NEVER re-key it to a `BEDT[T.IND]` ROW** — that beds the
  working shed's **night-shift clerestory** (173). ⚠ **`winBandR` IS BYTE-FOR-BYTE `bandR` below `LITAMT<0.35`** ⇒ a free
  dead-regime control (199). ⚠ **`__setTime(t)` ONLY ASSIGNS `dayT`; `SUNT`/`LITAMT` are recomputed once a frame INSIDE
  `render()`** (261) ⇒ reading `LITAMT` right after `__setTime` reads the **PREVIOUS frame's light**. Derive:
  `SUNT = sunWarp(t); daylight(SUNT).lit`.
  **272:** **`shroomDue(c,s2)` — ONE predicate; the pass reuses `isWood`.** ⚠ **ONE TICK = 0.075 yr ⇒ the whole autumn is
  only ~2.9 TICKS** — **check that BEFORE designing any cadence.** ⚠ **`(year|0)` IN A HASH SALT IS CONSTANT ALL SEASON.**
  ⚠ **BOTH UNIFORMS ARE ALREADY ON THE CELL** (`c.v`) ⇒ zero `rng()`. ⚠ **THE DRAW'S FADE SATURATES** ⇒ **do not gate the
  cadence visually.** ⚠ **`render()` MUTATES THE WORLD** (`drawBuilding` grows `c.h`) ⇒ **SETTLE THE HEIGHTS before any
  two-render diff** (`for(const c of cells) if(c.h<c.th) c.h=c.th;`) — `__warp` hides it; driving `tick()` does not.
  **269–259 (re-compressed at 283; bodies archived at 279 — IMPERATIVES ONLY):**
  **269:** **`isAvenue`, 3 readers.** ⚠ **`AVESPAWN`/`AVESTAY` are PREFERENCES, NEVER rails** (20% dead ends ⇒ a
  confined tram **strands**); **at its CEILING.** ⚠ **`c.flow` peaks at the CORE ⇒ the avenue SELECTS FOR ITS OWN
  BURIAL** — judge on the AGGREGATE, and **never aim a camera by it** (283 framed the CBD doing exactly this).
  **268:** **`seaOct`, smoothstep-INTERPOLATED.** ⚠ **NEVER "simplify" back to `hashCell(x>>sh,…)`** — a downsampled
  hash is **blocky white noise**, a *different field*. ⚠ **`seaT` is COLOUR-ONLY + BUILD-TIME.** ⚠ **THE ONE-TONE
  TERRACE IS STRUCTURAL — do NOT re-open the sea's body colour** (255/257). ⚠ **Use `probe-seaquilt`, NOT `probe-seastep`.**
  **267:** **`c.loft`, 3 readers.** ⚠ **`blockValue(x,y)` = mean `c.val` over the SIX NEIGHBOURS — use it for any "has
  the city arrived here?" question, NEVER a lot's OWN `c.val`.** ⚠ **`LOFTVAL=0.5` is the artifact's own neutral;
  `WORKSMIN=1` is LOAD-BEARING; the pass WALKS `HEXI`, no `rng()`.** **266:** ⚠ **A WINDROW TRAILS UPWIND — a Z-ORDER
  decision, not a look.** ⚠ **`probe-seaamp` CANNOT GRADE IT** (area-means the ocean; a row paints 2%).
  **263:** **`bloomHost` = MEADOW + SHOREPARK; the bloom CA draws NO `rng()` ⇒ wholly inert.** ⚠ **`TICKN` IS PART OF THE
  WORLD — reset in `genWorld`.** ⚠ **DUNE/PARK REJECTED as hosts; the refractory jitter is LOAD-BEARING.**
  **262:** **LADDER OF HOURS: `KID` 0.34 < `SURF`=`JOG` 0.62 < `CURF` 1.85 — take a new entity's hour from it** (226).
  **261:** **`SUNT` IS THE LIGHT CURVE'S CLOCK, NOT `dayT` — one predicate (`sunWarp`), FOUR readers** (⚠ **`phaseWord`
  is a FIFTH and was MISSED — cue (bd)**). ⚠ **`syncSky` warps its OWN clock on purpose.** ⚠ **`SUNUP`/`SUNDN` ARE
  THRESHOLDS ON `SUNT`, NOT `dayT`.** **259:** ⚠ **`siteDark` is a PREFERENCE — do NOT "tidy" its 90-try scatter; a
  TIE-BREAK must NEVER share a salt with a reader of the cell it picks.** ⚠ **`__warp(a)` then `__warp(b)` IS NOT
  `__warp(a+b)`** — two hops build a DIFFERENT city; a *prefix* warp is on the trajectory, a two-hop warp is not.
  **258–236 (bodies archived at 276; IMPERATIVES ONLY):** ⚠ **THE CAB'S ROOF LAMP IS A FOR-HIRE SIGN — do not re-key it
  to darkness.** ⚠ **`livelyKerb` SELECTS FOR ITS OWN BURIAL** ⇒ **aim by argmax-over-TIME/INK, never at the first
  instance.** ⚠ **`GWST` (overhead sky) and `GWSB` (horizon) ARE NOT INTERCHANGEABLE** — the sea's body mirrors `GWST`.
  ⚠ **`f.sp` KEEPS ITS SIGN** (the ferry's THROTTLE goes to zero, never the velocity). ⚠ **NOT cue (o): the PIER has a
  waterfront, the HARBOUR does not.** ⚠ **MARSH/KELP no longer catch cloud shade** (`WETSET`). ⚠ **`cl.rain` IS GONE ⇒
  `cloudWet(cl)`.** **`RAILCAP=130`** · **`seaState()`, floor `SEACALM`** · **`concertSeason()`**. ⚠ **244: TURNING THE
  AMPHITHEATER'S BOWL WAS BUILT AND REVERTED — DO NOT RE-TRY** (the projection cannot carry it). ⚠ **230's `taxi` flag
  is LOAD-BEARING** (`VCURF` thins the night fleet by CLASS).
  ✅ **CLOSED LADDERS — DO NOT RE-OPEN** (roster archived at 268; laws in SKILL.md): the **WASH** ladder · the **TOWER
  LOOK** · the **SKYLINE** ladder · the **HUD** lap · **137's standing crowd** · the **SEASONAL-VEGETATION** seam.
  ⚠ **The CLOSED/RETIRED cue roster — (w)(z)(t)(u)(ab)(af′)(ag)(ah)(al)(am)(an)(aq)(s)(ap) — and its live
  do-not-re-open warnings were archived at 268.** Half-closed: **(ao)'s SHAFT half CLOSED 248, its BOW half REFRAMED.**
  ⛔ **ALSO RETIRED, DO NOT RE-OPEN:** **(ai)** the greenbelt (246 — unreachable; **the ROADS fragment every lobe**) ·
  **(aj)** the cloud spawn (273 — refuted; **`cl.y` is a DEAD LEVER**, best row = 1.10x uniform) · **(y)** the mojibake
  (273) · **(ak)** the canopy (238+252 — measured-capped) · **GARDEN's staggered beds** (263 — host starved).
  ⚠ **THE LETTERS (y) AND (aw) EACH NAME TWO DIFFERENT CUES — read the parenthetical, not the letter.** Live: **(aw)**
  **the KAYAKERS keep no hour and no calendar** (271 — the last person in Solvista who does not). `drawKayak` has no gate
  at all, exactly as `drawSurfer` had none. **`surfSession()` is the predicate; a kayak is a fair-weather boat.** Cheap,
  but it REPEATS 271's mechanism ⇒ **pair it with something, or wait for People's non-Deepen lap.**
  ⚠ **SETTLED AUDITS — LIVE WARNINGS ONLY (bodies archived at 242/283).** **225:** `shadS` (every shadow routes through
  it) carries a per-frame sun vector (`SHOFF` throw · `SHLEN` stretch · `SHAMT` opacity). ⚠ **Noon (t=0.415) is
  BYTE-IDENTICAL ⇒ a free dead-regime control for every shadow lap.** ⚠ **`SHAMT` must never reach 0 at night** — the
  residual patch is what keeps every ped, tree and car from FLOATING. **226:** ⚠ **`census.mjs` DOES NOT FREEZE THE
  CLOCK** ⇒ tick-sensitive metrics (`solarRoofs`) **wobble ±2**; core unaffected. **To test whether an unintended metric
  move is YOURS, re-run the SAME FILE, not HEAD.** **231: THREE PREDICATES, DON'T MIX THEM.** `openFront`/`frontLoad`
  count **TALLT MEMBERSHIP** — wrong for anything drawn flat. **`groundLoad(x,y)` is the ground-level one**: sums drawn
  **HEIGHT**, reads **`c.th` never `c.h`**, counts a `RAISEABLE` lot at `FUTUREH` — **an empty lot is a building that
  has not been built yet.** ⚠ **Aim a CAMERA by measured ink, never by any of the three (226), nor by a position (271:
  it framed the pier), nor by a superlative made of DENSITY (269/283: it frames a wall).** **213:** `nightDeep()` is
  **pinned at 1 all day** (a trap for any NON-draw reader); the civic night-light audit is **DONE** — three lights are
  off the curve on purpose (school janitor, hall clock face, parliament lantern), **do not "fix" them**. **211/210:**
  both `frontLoad` and `openFront` ship as **PREFERENCES, NEVER GATES (206)**, and `LITAMT` returns to **0.64** by the
  small hours ⇒ any gate `LITAMT > 0.64` defines a "night" that **ENDS BEFORE DAWN**. **137's "the ped/dog system is
  NON-REPRODUCIBLE" is DISPROVEN** ⇒ **People is probe-able like any domain**. **209:** the **GROUND PLANE is SPENT**
  (216 spent the FACADES); paid out again at **253/261 (the LIGHT)** and **268 (the SEABED)**.
  **206:** the vacant lot is a **MIRAGE** (`EMPTY` with ≥2 RES nbrs falls **85 → 6.5** by 2035); development eats every
  gap — **and it eats CA HOSTS too: anything in `RAISEABLE` will be built over** (263). ✅ **"THE FIRE CA IS A GHOST" IS
  REPEALED (279) — it now runs, spreads and leaves BURNT; but it is still YEAR-GATED, so NOTHING burns at 2035.**
  **⚠ THE `polish-tile` BACKLOG LIVES IN `.claude/skills/polish-tile/POLISH.md` (moved 275)** — TILE REDESIGNS this
  loop is FORBIDDEN to spend a lap on: (a) the elevated transit (**13x reported**, the ledger's most-reported defect) ·
  (e) the observatory · (f) the wildflowers · (g) the capitol · (b)/(c)/(d). ⚠ **`polish-tile` IS BADLY OVERDUE.**
  **Sky is post-saturation (Deepen/Fix ONLY — its additive/CA cells are traps).** **Urban's LOOK is SPENT FIVE WAYS**: additive (118) · Connect measured-hard twice (160/165 — no straight-hex run ≥3, so no arcade host) · roof-furniture · GROUND PLANE (209) · FACADES (216) · COLOUR (254). The **harbour apron** is the last named look-remnant (cue **(o)**: a port vector must **build the waterfront FIRST**). ⚠ **BUT "URBAN IS SPENT" HAS NOW BEEN REFUTED FOUR TIMES, EVERY TIME FROM ITS *RULES*, NEVER ITS LOOK** — silhouette (232/237, closed 235/239) · **267** a conversion that had NEVER FIRED · **274** a feature that never told the **TYPE-KEYED TABLES** it existed (`BEDT`/`CIVHRS`/`TILELABEL`/`TILEDESC`/`valueSrc` — a per-cell **FLAG** is invisible to every one of them) · **281** a flag ORPHANED by its host's upgrade (92% ghosts, still vetoing). ⇒ **Grep `tick()` and the FLAGS, never `drawBuilding`.** Live Urban cue: **(au)** (the loft's rooftop studio). (**Sky's moon is FIXED (135) and NAMED (144)**, both closed.
  ⚠ **SKY's additive/CA cells are TRAPS** (sky is not cellular; fog on terrain is already `rSea`/`fogAt`). **STILL
  banked for Sky: the SEASON word** — it reads the fast `year` and would strobe ~0.7 Hz (134), so it needs a **slow
  clock FIRST**; don't add `seasonWord(year)` to the HUD nor re-ship 134's REVERTED almanac (⚠ **236's front is ALSO on
  `year` and is NOT that slow clock**). **Cue (k) CLOSED (116/123)**; still steers: **run the tell FORWARDS** (string and
  rule share ONE constant — 123; 213's `civOpen()`). **⚠ A tick-rule cannot read the reach maps (151):** `recount()`
  never runs in the sim loop, so `rGreen`/`rShop`/`rServ` are STALE inside `tick()` — recompute locally.
  ⇒ **"Additive inventory spent" is a claim about a domain's ENTITIES, not its SURFACES** (127 put picnics on PARK's 878
  hexes), **and a Deepen that adds no element is the documented way past additive saturation** (126). **124 closed the
  LAST banked cue that moved a census number; the census is VACUOUS for most vectors — reach for a probe.** Three laws
  govern step 1: **a cue is a POINTER, NOT A SPEC** (re-grep the seam before designing to it); **a banked, measured
  finding outranks kind-rotation and cell-emptiness** (119); **saturation beats kind-rotation** — when a domain's
  additive cell is spent, the KIND changes, not the domain (118).
  **THE FAIL/ASIDE LAW (212; law in SKILL.md, tally archived at 268): FAILs are where an agent is WRONG, ASIDES where it
  is RIGHT.** Paid 13x; ⚠ **237/252/255/268 INVERTED IT** (the headline FAIL was RIGHT, the banked probe had ACQUITTED
  the defect). ⚠ **269/283: A FAIL CAN BE *TRUE* AND STILL NOT BE *YOURS*** — grade it by MEASURING, then ask **whose**
  it is (283's two FAILs were both TRUE of HEAD as well). ⇒ **When agents say "I CANNOT SEE IT" the burden is on your
  PROBE** (they alone measure *salience*). ⇒ **262: read WHICH FILE a FAIL names.** Weight an aside two agents reach
  independently above any verdict.
  **PERF ARC** (ref `7e2ac2c` = 177; per-step-back refs + priors archived at 233/236/268/274/283). ✅ **THE ARC IS
  STOPPED — FLAT ACROSS SEVEN STEP-BACKS, and 283 took it DOWN. THE OLD `+0.2%/iteration` IS NOT BEING PAID; DO NOT
  QUOTE IT.** Latest vs 177: **day +8.2% · night +0.8%** (283). Night profile `winBandR` 32.1% · `prismS` 29.1% ·
  `hexTile` 12.0%; `drawCell` **94%**. 🔑 **STRUCTURAL: a domain past ADDITIVE saturation STOPS COSTING FRAME TIME** ⇒
  **Do NOT open a perf lap.** ⚠ **THE STANDING SUSPECT (207): NO HOT ORNAMENT — the arc is DIFFUSE.** **No caching lap
  (198's levers CLOSED); the only lever is FEWER OBJECTS.** 🔑 **THE LAP TIMER OVER-READS — GRADE WITH
  `probe-drawbudget`, NEVER `perfab` ALONE** (216; **3x** it reported a stable +2–3% over a lap that added NO draw work).
  ⚠ **`probe-drawbudget` HAS ITS OWN ~±100 OBJECT NOISE FLOOR** (274) ⇒ read a small delta against a dead-regime control.
  ⚠ **A WORLD-CHANGING VECTOR IS NOT FREE just because its diff has no draw call — THE WORLD IS THE DRAW LIST** (222);
  ✅ it runs in **REVERSE** too (241 −3.2% day; **283 −2.0% day**, by planting fewer trees). ⚠ **Cue (x) stands.**
  **The GAP-CLOSING trick (111/112/113) is SPENT; the TELL that replaced it (a label/name/comment asserting what the
  draw ignores) is CASHED 11x — host history rotated to the archive at 268; the law is in SKILL.md.** ⇒ **THE HOST HAS
  MOVED ALL THE WAY UP TO THE MARKETING COPY (267): read the placard's claims as a CHECKLIST and ask of each whether the
  rule behind it can fire** — and **268 found the rung BELOW the code: a comment naming a STRUCTURE the value's own
  MECHANISM cannot produce** (the seabed's "shoals and channels", built from a downsampled hash ⇒ blocky white noise).
  Still MUTE: `[T.IND]` (no calendar).
  ⛔ **GARDEN is RETIRED — host starved, see (p).**
  ⚠ 122: a tooltip vector needs a probe checking the claim against INDEPENDENTLY RECOMPUTED truth, not a screenshot.
  **Kind-picking, compressed (full text archived 204/274; menu in SKILL.md).** **Scale** is the coldest kind. **New element**: saturation is of a domain's ENTITIES, so one can still land on a large untouched **SURFACE**. **107 was a New CA rule that ADDED NOTHING** — *auditing an existing rule for reachability* is free in every domain. ⚠ **Nature × Connect is the GRAVEYARD — REVERTED 3x** (46 · 88 · 101); **do not re-open it as a *corridor***. Nature's cold cells are Connect (leave it) and Scale; ⚠ **(ak) is MEASURED-CAPPED — Nature's lap must come from a fresh grep of its seam.**
- **⚠ SCREEN SPACE IS SPOKEN FOR (200 — archived 237; law in SKILL.md).** Probes read `getImageData()` and are **blind
  to the HUD**; `.placard` owns the top-left, `.census`/`.controls` the bottom corners. For a VISIBILITY claim about a
  screen-space draw (`ctx.setTransform(dpr,…)`: sun, moon, stars) diff **`page.screenshot()`**. The open sky is a
  shallow **band** (~0.12 of the viewport) — **do not lower the sun** (cue (s)'s trap).
- **⚠ `peds` CANNOT SERVE THE ROAD NETWORK (111, measured — read before any People vector).** A resident is leashed to
  its anchor (`PEDLEASH=2`, tuned to hold street occupancy at ~19%), so only **20–31%** of bus stops have a live ped's
  anchor within a leash: *"residents walk to / wait at / ride the X"* is structurally capped at ~a quarter of any
  road-borne host. To do it properly move the **spawn pool** (`openCells` in `syncFleet`), not the leash.
- **PERF — `perf-baseline.json` is STALE ON PURPOSE** (pinned 105; it has false-FAILed **ten** step-backs and always
  will — it cannot know today's machine load). Grade a lap by an interleaved A/B/A/B vs the previous step-back
  (`probes/perfab.mjs`, `REF=<sha>`) — **but NEVER by `perfab` ALONE: at 242 the lap timer over-read by ~2x and only
  `probe-drawbudget`'s object count and the ARC could tell** (see the ARC block). **The day column is the NOISY one
  on this box**; night is steady and is the SLOW-accumulating column.
  **COST MODEL + its TWO HOLES: bodies rotated to the archive at 272; the model and its laws are in SKILL.md.** Live:
  **cost is PER PATH OBJECT — the only lever is drawing FEWER objects**; **GRADIENTS and STROKES each come in ~4x over
  the model** (PAID, ACCEPTED, unmeasured) ⇒ **do not shrink a gradient or cull a stroke "because 198 said count is what
  matters"**. (**Never pipe a 2+-round interleave through `tee`** — node block-buffers; run it foreground, long timeout.
  **⚠ `cp` is aliased `-i` — use `/bin/cp`**, iter 147.)
- **`?year=` is a URL hook (108); keyframes `.02/.30/.62/.87` = winter/spring/dry-peak/autumn. Full text (+ 139/202's
  warning that it DRIFTS ~0.167 yr/s while `shoot.mjs` waits — use `probes/shot-stepback.mjs`) is in SKILL.md.**
- **`?tide=` IS A URL HOOK (iter 113) — the sea is testable.** `TIDE` runs a ~2 min seeded cycle. **The default is
  seeded, not neutral — `?seed=42` loads at TIDE 0.02, dead low water.** `?tide=v` shifts the *phase* (`__setTide`).
  Use `.02/.35/.59/.98` = low / mid-ebb / **neutral** / high. **`0.59` is the pin for grading anything ELSE on a marsh**
  (below the flood-sheen cut of 0.60, and `ebb=0` ⇒ the hex body is one flat colour and nothing tidal can move).
- **`c.buzz` — the third derived field, after `c.flow` and `c.val` (iter 104, in `tick()`).** "How much is there to come
  out FOR", seen from a hex: `ATTRACT.has(c.t)?2:0` + a count of `ATTRACT` neighbours. Pure terrain derivation, no
  `rng()`. **Sparse — mean 0.54–0.59 over standable hexes, mostly 0** ⇒ a rule keyed to it is a no-op away from
  attractions. Reuse it for "somewhere worth standing"; don't hand-roll a second. **⚠ `c.buzz` is NOT `PEDDEST`** — an
  attraction field must EXCLUDE the ground you stand on (`PEDDEST`'s argmax is a lawn interior, not a shopfront kerb).
- **The CBD is published: `CBDX`/`CBDY` + `CORER`=16 (iter 98).** ⚠ **`c.val` is NOT a centrality field** — it diffuses
  `valueSrc`, whose peaks sit on **parks and water** (0.92/0.74), not the core. Anything meaning "near downtown" uses
  `hexDist(x,y,CBDX,CBDY)` — never `c.val`, never `CTRX/CTRY` (the plate's centre, which is not the city's).
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
  hand-roll a second; `__find` answers `'arterial'`. ⚠ **But flow is a bad host for *land use* (82):** `RES→COM` on
  arterial frontage came out 85% **singletons** (by the time a street carries flow its frontage is already
  COM/MID/TOWER). Flow suits *point* decisions, not *linear* ones. **Don't re-try it.**
- **Institutions cluster: `MAJORK` / `QUARTER` / `siteQuarter()` (91; detail archived at 200/241).** `MAJORK` = the five
  monumental kinds — the shared vocabulary for "major institution", read by BOTH the civic quarter and the 2020+
  forecourt rule. `QUARTER` = the three that *seek* it; `observatory` is deliberately free to sit at the rim.
  `siteQuarter()` hugs the nearest standing major at **2-4 hexes**.
- **Open cues, banked by holistic passes (take one when its domain comes up):**
  **(g) ~SIXTEEN seedless `hashCell` calls paint the IDENTICAL pattern in EVERY city** (body archived at 281).
  ⚠ **RE-RUN the audit, never a catalogue** (L-numbers drift): `grep -noE 'hashCell\([^;]{0,60}' solvista.html | grep -v
  seedNum`. **Only PRESENCE decisions are a breach worth a vector**; the **night surf light-smear** (`hashCell(x,y,77)
  <0.28`) is the one to fix. ⚠ **`darkWinR` is NOT a breach — check the callee.** When fixing a range, **space the bases**.
  **(w)/(z) CLOSED 229 · (t) CLOSED 231 · (u) CLOSED 234 · (af)/(af′) CLOSED 228/235 — bodies archived, laws in SKILL.md.**
  **(m) SHOWERS ARE HOST-STARVED — do not build "X responds to the rain"** (201, `probe-rainhost`): nothing on the ground reads it, and a shower is **2-5 hexes TOTAL** ⇒ **less than one** picnic/cafe hex. **No host** (`T.MARKET` again).
  **(o) THE PORT HAS NO WATERFRONT — do not build "the ship docks / cranes work her"** (205,
  `probes/probe-harborhost.mjs`, 6 seeds). Warehouses sit **behind** the coast highway, **5-9 hexes from the sea**; **no
  quay tile exists.** Solvista is a **roadstead**, so the anchored freighter is *correct* (the label-tell's
  **FALSE-POSITIVE mode**). **A port vector must build the waterfront FIRST.** **Banked host: the MOLE is real**
  (`moleSet`, 5-12 cells, all 6 seeds — the only structure in the water).
  **(p) CLOSED by 208/209; the WARNING is live. ⚠ DO NOT RAISE THE LAWN AMPLITUDE FURTHER** — `grass` and `lawn` share
  a base colour, so the dry-season divergence *is* the managed green's identity; lawns stay greener than the hills
  **all year**. ⛔ **(p)'s GARDEN HALF IS RETIRED (263), body archived at 275** — host starved (2–5 hexes/city); if it
  is ever reopened it is a **POPULATION** question first, not a calendar one.
  **(aa)/(ad)/(ae) CLOSED (220/221/223). THE `col()` WASH LADDER NOW SPANS BOTH ENDS OF THE DAY (265)** — ONE shared
  `washRGB`, now `w = max(nightDial, gold)`; colour-only (**zero path objects**, **byte-identical in daylight**). ⚠ **Do
  NOT fork a second wash — EXTEND `washRGB`**; **GLASS KEEPS the cool tint**, **ROAD staying grey is CORRECT** (214).
  ⚠ **A new surface whose identity is a HUE must ask WHICH illuminant is its enemy** (blue night ⇒ warm surfaces;
  orange dusk ⇒ cool ones) and audit by **`dHUE`**, never a fixed target hue. ⚠ **`WARMN` (timber, 234) is a caller.**
  ⚠ **FARM (`cropRGB`/`colRGB`) is the ONLY warm surface still outside `col()`.** ⛔ **The old "watch: PARK↔ROAD
  separation is 14" item is RETIRED (251)** — it was a POINT-SAMPLE artifact, and 221 forbids scoring on a separation.
  ⚠ **`towerLook` publishes `bax`/`bay` — the ONE definition of "how wide is a tower"; the skybridge and helideck
  BOTH read it** (a point plan would have floated the bridge and overhung the pad). **Any new tower ornament must
  read it — and `midLook` (`fx`/`fy`/`segs`, furniture scaled by `rs`) is its walk-up twin. See (al).**
  ⛔ **(ag) CLOSED 251 · (ac) CLOSED 224 — bodies archived at 266.** **DO NOT RE-OPEN THE NIGHT SAND / NIGHT GREENS**
  (dimming the sand is a MEASURED dead end) nor **THE `c.th` LADDER** (placement is a dead lever (218), the COM fork
  (219), the height noise and `TCAP` (224) are all spent; **an agent FAILing the skyline from a whole-city frame is
  224's PROJECTION law, not a defect**). ⚠ **`c.th` HAS TWO WRITERS** — touch one, check the other; **never derive a
  tower constant from the measured mean `core`** (98 did; 219 invalidated it, unnoticed for 6 laps).
  ⛔ **(ak) CLOSED/SUPERSEDED BY (aq) 253** — the plants were never the defect; **the season was missing from the LIGHT**.
  **DO NOT re-open the canopy, the lawn ((p) protects it), or a palette lap "to fix the seasons".** ⚠ **Mediterranean
  coast: GREEN WET WINTER + GOLDEN DRY SUMMER is CORRECT (201)** — no snow, no bare trees.
  ✅ **(al) 239 · (am) 241 · (an) 243 · (ao) 248 · (ar) 256 — ALL CLOSED; bodies archived at 266, WARNINGS only.**
  ⚠ **DO NOT RE-OPEN EITHER BUILDING** (228 crown · 235 footprint · 239 mid-rise); **EVERY FORM'S BASE IS ITS WIDEST
  PART.** ⚠ **DO NOT re-tune the elevated beam's draw** (measured IN BAND) **nor bound a loop's RADIUS** (makes stubs).
  ⚠ **`stepGond`'s value bar decays with NO FLOOR** — gated on `WETSET`; do not un-gate. ⚠ **`probe-darkline` is
  REPAIRED (243).** ⚠ **THE RAINBOW IS NOT A RIM BUG** (it already tests its LEGS; the defect was the COMMENT).
  ⛔ **(ar) WAS THE HARNESS (229), 3rd time.** 240's aside, unclaimed: *"tiny white chevron glyphs on land (~0.47,0.47)."*
  ✅ **(ap) CLOSED BY 266** (windrows; body archived at 267, law in SKILL.md). ⚠ **DO NOT re-open the sea's TILE FILL
  (255's ⛔ stands).**
  ✅ **(at) CLOSED 274 · (as) CLOSED 275 — closed markers archived at 281; the LIVE warnings only.** ⚠ **DO NOT re-open
  the windrow's WIDTH or TONE** — 255's ⛔ stands on the sea's tile fill, and the row's ink is **held by construction**
  (`WROWN`). ·
  **(au) THE LOFT'S "ROOFTOP STUDIO" READS AS A GREEN ROOF** (267): drawn as a **full-width hex cap** (`prism(gx,gy,0.2,0.16,…,'sage')`), not the small box intended, its banding *"closely resembles the generic residential tower banding elsewhere."* ⚠ **Legibility — the lever is the SHAPE.** Urban × Polish. ·
  **(ay) THE ROWS ARE LEGIBLE WHERE THEY ARE *LONG*, AND VANISH WHERE THEY ARE SHORT** (275; 266's own law cashed): a
  row's traceability is its **LENGTH**, the one dimension a hexagon cannot quantize — so the taper, measured on **every**
  row (widths 1.00 → 3.00, all 3 seeds), is **SEEN** only on the long ones. Seed 42's blind agent named the treatment
  unprompted; **seed 7's could not tell the builds apart** on a crop whose rows are short (frames differ by **41,383
  px** ⇒ *salience*, not absence). ➡ The lever is the **row-length distribution**: `L = min(want, run−0.5)` is truncated
  by how far **open sea runs upwind**, so coastal rows are stubs. **Measure the length histogram before designing**
  (`probes/probe-windrow.mjs` records every row's geometry). ⚠ **NOT a brightness or width problem — do not reach for
  alpha.** ⚠ **BUT IT IS A *POLISH* CUE AND WATER'S NEXT LAP MUST NOT BE POLISH (see ROTATION)** — bank it, take the seam.
  **(aw-HUD) UNVERIFIED — a 269 agent read the controls card as clipping *"TRANSIT REA…"* at 1400x900.** ⚠ **229'S LAW: `probe-hud` swept 6 widths and found 0 clipped labels ⇒ SUSPECT THE HARNESS** ((ar)'s shape a 4th time). Reproduce in a real browser before spending a lap.
  **(ax) THE FAIRY RINGS ARE ON THE SMALL SIDE** (272 — **both** agents, independently, both seeds, unprompted, on a
  PASSing frame: *"legible, not speckle… but a hair more cap contrast would help"*). Measured **15.8–20.8 CSS px/ring at
  fit** = ~4x a ped's shadow (4.4, shipped) ⇒ **NOT the hairline family, NOT cue (f)** — a *contrast* nudge, not a body.
  Gate: `probes/probe-shroomvis.mjs`. **Nature × Polish.**
  **(x) A STROKE MAY NOT PRICE LIKE A FILL (215, perf suspect — NAMED, NOT MANDATED).** Build a **stroke-vs-fill sweep at equal path-object count**; `CCACHE` churn is ruled OUT.
  **(y) A SCORCHED-LOOKING HEX CLUSTER INLAND (216, seed 7, unprompted on a PASSing frame).** ⚠ The fire CA is a
  **GHOST** (cannot ignite at 2035) ⇒ almost certainly **LOGGING/clearcut, not BURNT** — **identify the tile first**. Nature × Polish.
  ⚠ **The sun CANNOT be lowered (200)**; do not raise `seasonCool` at the peak (it breaks 253's fixed point).
- **Reach maps exist — reuse them (U5):** `reachFill(out, r, isSrc)` is a multi-source hex BFS capped at radius `r`,
  land-only (`WETSET` blocks water/marsh/kelp), filling `out` with steps-to-nearest-source (255 = farther than r).
  `recount()` runs four per tick. Any "how far is X from Y" question should call it, not hand-roll a flood fill.
- **⚠ Three census stats can FALL, by design (U5):** `walkPct`, `transitPct`, `solarPct` are **shares**, not counts.
  **Services are walkable's binding constraint** — a tower lap that adds residents without civics *drops* `walkPct`,
  and that is the stat working. Judge by whether the city earned the change, not "up = good". `density` rises with
  intensification and falls with sprawl.
---

<!-- rotated -->

> **Archive:** the 276 entries before Iteration 274 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

## Iteration 274 — Urban fabric × Polish — the loft learns to go to bed (cue (at) CLOSED)

**Vector.** Urban fabric × Polish. Rotation put Urban next (oldest, 267) and its Polish cell was 34 laps
cold (239), so the kind does not repeat 267's Deepen. Cue **(at)**, banked by 267's seed-7 agent: *"the
loft's windows never go to bed."*

**Change.** `BEDT` is a table of **TILE TYPES**, so it could never see the loft conversion — a loft is
**HOUSING wearing an industrial tile** (`T.IND` + `c.loft`), and `BEDT[T.IND]` is undefined. That is **199's
law recursing onto a per-cell FLAG rather than a type.** But the seam was worse than the cue said: the loft
never even *called* `windarkAt`. Its glass was a **solid ribbon** (`bandR`), so it had **no panes that could
go out at all**. Two lines, one predicate:
- `windarkAt(c)` now takes the **CELL**, not the type, and `bedOf(c)` hands a loft the **MID-RISE's hours** —
  taken from the existing ladder, not invented (226), because that is what a loft *is*: a dense inner-city
  home. **All three readers share the one predicate** (the draw, `winBandR`, the tooltip).
- the loft's glass is drawn by **`winBandR`**, so it has panes to put out.
The working shed beside it keeps its night shift (173) — **which is exactly why this is a per-cell predicate
and NOT a `BEDT[T.IND]` entry**, which would have bedded the shed's clerestory too.

**Probe** (`probes/probe-loftbed.mjs`, `shot-loftbed.mjs`). **It counts OBJECTS, not pixels (247/250), and
that is the finding.** The first cut measured each building's mean rendered **LUMINANCE** and was **useless**:
the working **SHED**, which has no panes and no bedtime whatever, "fell" ~11 units dusk→small-hours, because a
whole-building mean is dominated by the **AMBIENT LIGHT CURVE**, not the glass (**254** — the signal lives in a
few panes and an area-mean averages it away). Hooking `winQuad` instead counts the **LIT PANES the frame
actually issues**: deterministic, **no noise floor at all**, no ambient term, build-agnostic.
- **Headline needs no threshold (236).** HEAD's loft: **0 lit panes, every hour, every night, all 6 seeds** —
  `DISTINCT LIT-PANE COUNTS = 1`, a constant by construction. **That IS the defect, stated.**
- **Patch: 175 → 69 panes across the night (−61%), DISTINCT 4–5.**
- **HOME (MID) = free POSITIVE CONTROL *and* THE BAR (248/226):** a correct sibling home drawn by the same
  `winBandR`, which provably keeps an hour — **140 → 56 (−60%)**, and **IDENTICAL on both builds**. So the rig
  is alive, and *"is −61% enough?"* is answered by the artifact (**the loft now empties exactly like a home
  does**) rather than by a number I picked.
- **SHED = must-not-move (250): IDENTICAL across builds** (0 panes, 6 bands, every hour).
- **DAY = free dead-regime control (199): BYTE-IDENTICAL across builds.** `winBandR` falls back to the *same*
  solid band below `LITAMT<0.35`, so daylight is unchanged **by construction**.

**Census.** PASS. Core **`pop`/`roads`/`developed` +0**; tile histogram **EMPTY**; `solarRoofs +1` is the
documented ±2 clock wobble (226). Draw-only, zero `rng()` draws ⇒ vacuous by design, as expected — **the probe
is the gate.**

**Perf.** Path objects **night 138,593 → 138,561 (−32, −0.02%)**. And **199's dead-regime control refereed it
for free**: daylight is byte-identical *by construction* (proved exactly by the pane probe), yet
`probe-drawbudget` still read **−98** on the day column ⇒ **its own noise floor is ~±100** and the night
reading sits inside it. **Free.**

**Visual.** Blind HEAD-vs-patch pair — honest here (unlike 267's camera) because the lap draws **zero `rng()`**
and changes no terrain, so **both builds generate the identical city with the loft on the identical hex**
(confirmed: same hex, same ink, 371/381 px). Names by FILE, **meaningless tokens, map CROSSED between seeds**
(238/239/268). **Both agents named the patch correctly, on opposite tokens** (seed 7 → `kappa`, seed 42 →
`sigma`) — so it is not positional. Both **measured the frames themselves**: seed 7's patch reads **2,216 →
1,490 bright px (−33%)** against the control's **+0.5% (static ribbon)** — the mechanism corroborated by a
*different instrument*. Both called the day twins **indistinguishable** (max 3/255 and 7/255, nothing at the
loft) and both whole-city frames coherent, no compounding drift. **VISUAL: PASS ×2.**

⚠ **THE CAMERA LIED FIRST, AND ITS OWN SELF-REPORT CAUGHT IT (202/261).** `__setTime(t)` **only assigns
`dayT`** — `SUNT` and `LITAMT` are recomputed **once a frame, inside `render()`** — so a pin search that reads
`LITAMT` straight after `__setTime` reads the **PREVIOUS frame's light**. All four pins silently collapsed onto
**one instant** (`dayT=0.000` on every frame). Nothing crashed; the frames were perfectly valid frames of the
wrong moment. **The self-report printed it in one line instead of costing an agent round.** Drive the curve
directly (`SUNT = sunWarp(t); daylight(SUNT)`).

**Verdict: SHIPPED.** Cue **(at) CLOSED**. (au) — the loft's rooftop studio reads as a green roof — stands.

## Iteration 275 — Water & coast × Polish — a stroke has exactly one width (cue (as) CLOSED)

**Vector.** Water & coast × Polish. Rotation put Water up (oldest, 268) and its cue **(as)** was
banked and ready: both 266 agents, independently, on two seeds, read the windrows as *"perfectly
straight and uniform in thickness… a taper would sell it harder."* Grepped the seam first, per
*a cue is a POINTER, not a SPEC* — and the cue was exactly right, for a reason the cue itself did
not state: **266 drew the row as a `ctx.stroke()`, and a stroke has exactly ONE `lineWidth`.** That
is not a tuning miss. **No constant in the file could ever have answered them.**

**Change.** The row becomes a **filled tapered lozenge** on an **S-curved cubic spine** (the two
controls sit on *opposite* sides of the chord; HEAD's "curve" was a **0.42 px** bow — a ruler).
Half-width runs through a new `wrowHalf(t) = sin(π·t^WROWT)`, whose belly sits ~28% down from the
head, so the nose is blunt and the tail feathers to nothing. **`WROWN` normalises the profile's mean
to 1**, so the fill carries the stroke's ink and the change is a **SHAPE**, not a brightness (245).
⚠ **Normalise against the POLYGON YOU DRAW, not the curve it approximates** — a chord cuts inside a
concave profile, and integrating the continuous `sin()` shipped the rows **4.5% under HEAD**.
Draw-only, `hashCell` for the S's handedness, **zero `rng()`** ⇒ core **+0**, tile histogram empty.

**Probe** (`probes/probe-windrow.mjs`, `probes/shot-windrow.mjs`). Reads **no pixels** for the
geometry — it hooks the artifact's own path ops and reads back the shape the frame *issues*.
Deterministic, **no noise floor**, build-agnostic (one file grades both builds).

| | HEAD | patch |
| --- | --- | --- |
| **distinct half-widths per row** | **1.00** | **3.00** |
| head / belly / tail (CSS px) | 0.80 / 0.80 / 0.80 | 1.22 / **1.31** / **0.39** |
| spine deviation from its own chord | 0.42 px | **1.31 px** |
| ink px/row (**must hold**) | 73.5 / 63.8 / 70.7 | 76.2 / 65.9 / 73.7 (+3.7%, all AA edge — per-pixel amp **4.2 in both**) |
| rows · caps · glints (**must not move**) | 46/43/58 · 264/263/276 | **identical** |
| night (dead regime) · floor | 0 · 0 px | 0 · 0 px |

**Census.** PASS. `pop`/`roads`/`developed` **+0**, tile histogram **empty** — correct for draw-only.
**Perf.** Path objects **day +490 (+0.44%)**, night **+8** (byte-identical dead regime). The day
*timer* read **+2.0 / +1.7 / +2.8 / +0.4%** across four interleaved rounds — **no stable signal**, so
216's law governs: grade by the deterministic instrument. (N=12 → N=6 halved the objects and the
timer barely moved, which is the proof the cost is not the vertex count. A fill is the *cheap*
primitive class; strokes and gradients are the 4x outliers.)

**Visual.** Blind crossed A/B, meaningless tokens. **Seed 42's agent named the treatment by the
pixels alone**: HEAD *"a constant-width bar, both ends cut off square… drawn with a ruler"*; the
patch *"swells in the middle and tapers, feathering out to nothing… reads as real wind-driven foam."*
It magnified the crop itself to check. **Seed 7's agent could not tell them apart** and said so
rather than inventing a difference — the frames *do* differ (41,383 px, as much as seed 42's 46,551),
and I looked myself: seed 7's crop draws genuinely **short** rows, where the taper has no length to
show in. Both PASS; neither found any z-order tear, floating tile, blown-out colour or compounding
clutter anywhere in either whole-city frame.

**Verdict: SHIPPED.** Cue **(as) CLOSED**.

**⚠ THE FINDING WORTH MORE THAN THE LAP — `WINDA` IS A THIRD CLOCK AND NO FREEZE LIST NAMES IT**
(promoted to SKILL.md). 272 says a freeze list is a **claim that the DRAW is a pure function of the
world**; 275 is the **INPUT** side. The list (`genWorld`+`__warp`, `STARS`, `flock`, the movers,
`time`, `waveT`, the PRNG stub, the height settle) was assembled **by accretion — one item per lap
that got burned** — and nobody ever enumerated the globals the frame loop writes. **`WINDA` is one,
and `playing=false` does not stop it.** `seaState()` is a *pure function of it*, and the whitecaps and
every term of the windrow rule are pure functions of `seaState()`. Unpinned, **two loads of the SAME
FILE read ss = 0.8002 and 0.8024** — which moved a whitecap and drifted a must-not-move control by
**exactly ±1 draw**. ⇒ **A ±1 wobble in a control required to be EXACT is not noise to excuse; it is
an unpinned clock, and it is the only warning you get.**
⚠ **AND: TO ISOLATE BY COLOUR SIGNATURE, ASK THE ARTIFACT WHAT THE COLOUR *IS RIGHT NOW*.** The
palette entry never reaches the canvas unchanged — `colA()` puts it through the **illuminant**, so
foam's base `[255,251,240]` is issued as **`rgba(242, 250, 249, …)`**. Matching the `BASE` literal
**silently never fires**, and the probe confidently reported **0 windrows in a frame that draws 48**.
The tell: your suppression rig returns a clean, plausible **zero**.

## Iteration 276 — Transport × Connect — the bus could not see the network it exists to serve (2026-07-14)

**Vector.** Transport × **Connect** (last touched **211**; Transport's last lap was 269 = Deepen, and
its Deepen cell is by far its fullest). Its cue list was **EMPTY** — which 225's law says records
where you have LOOKED, not what is THERE — so this lap came from a fresh grep of `stepVehicle` /
`syncFleet` and of Transport's **type-keyed TABLES** (274).

**The defect, and it is two things that are one thing.** Solvista has published a bus-stop network
since long before the ledger: `stopOK` sites a shelter on built-up street, `stopQueue` builds a queue
under its canopy that *"empties when one comes"*, and the tooltip prints *"3 waiting"*.
1. **The bus could not see it.** It was spawned on a uniformly random road and then **random-walked**
   — `stepVehicle`'s straightest-72%-else-any rule, **byte-identical to an ordinary car** — and only
   called at a shelter it happened to blunder into. It is **249's ferry and 269's streetcar**, on the
   one vehicle whose entire job *is* the network.
2. **`VKIND` had no `bus` row.** The table is **TYPE-KEYED**, so line 9149 fell through to
   `['Car', "Somebody's errand."]`: the city's only public transport, drawn in its own gold livery
   expressly *"so a taxi reads apart from a bus at a glance"*, has been **named a CAR** in the hover
   card for the artifact's entire life. **274's law, arriving on Transport's table.**

**Probe (`probes/probe-busroute.mjs`) — and it REFUTED my hypothesis before I wrote a line, then
handed me a better one.** I went in expecting unreachable stops. **Part A says no:** the road graph is
**ONE connected component on 6 seeds in 6**, every stop inside it. What it found instead is that the
random walk *works, badly, and by luck* — and **Part A is also what LICENSED the fix**. 269 could not
give the streetcar a rail because the avenue is **not a rideable network** (9–16 components, 20% dead
ends) and a tram confined to it **strands in a block**. The **ROAD** graph is not that. *The same
measurement that forbade a rail for the tram permits one for the bus.*

| shelters NEVER called at, 900s of sim | HEAD | patch |
| --- | --- | --- |
| all 6 seeds | **45/244 (18%)** | **4/244 (2%)** |
| worst seed (99, 3 buses) | **15/39 (38%)** | 2/39 (5%) |
| best seed (42, 11 buses) | 2/41 (5%) | 2/41 (5%) |
| total calls / seed | 68–278 | **119–365 (+~50% on every seed)** |

⚠ **HEAD's answer needed NO THRESHOLD (236):** `stopQueue` reads
`since = c.blast===undefined ? 1e4 : …`, so a shelter no bus has **ever** reached is pinned at its own
`stopCap` — **DISTINCT QUEUE STATES = 1, forever.** The city was drawing a permanently-full shelter and
telling you people were waiting there.
⚠ **THE TAXI IS THE FREE POSITIVE CONTROL (248)** — a correct sibling mover in the same array and the
same function that provably stops (258) — so the bus's zero was a **real** zero and not a dead rig.
⚠ **THE CAR IS THE MUST-NOT-MOVE COLUMN, AND IT IS AN AGGREGATE, NEVER AN INDIVIDUAL (204/250):** a
patched bus draws a different number of values from the **shared `Math.random`** stream and walks every
car downstream. Aggregate: 23–29 cars, still covering the **whole** road graph (807/807 hexes) on both
builds.

**Change.** Nothing invented; the house already owned every piece.
- **The router** is **`roadField`** — servSend's own BFS, the field the cruiser, ambulance and engine
  have driven since **204**. The bus is its **fourth reader**.
- **The schedule** is **`c.blast`** — the sim-time the last bus called, stamped by `stepVehicle` itself
  and already read by the DRAW and the TOOLTIP. `busNext` sorts on it: **the bus goes to the shelter
  that has waited longest**, and one nobody has *ever* called at (`blast === undefined`) is the stalest
  there is. ⇒ **Coverage follows BY CONSTRUCTION, not from a probability anyone had to tune (218).
  No new constant enters the file, and no new state is stored on a cell.**
- Targets are **claimed**, so five buses do not all run to one shelter; and it stays **opportunistic** —
  the dwell clause still fires at any stop crossed en route, exactly as it always did.
- **ONE predicate, THREE readers** (112): the STEP (the field it descends), the TOOLTIP (`VKIND.bus`
  names the bus off the same `v.stopTo`; the *shelter* now says `Next bus — On its way here` off the
  same flag), and the probe.

**Census.** PASS — **every metric +0, tile histogram EMPTY.** `Math.random` only (as the tram's route
and the bus's own dwell already are), so the seeded `rng()` stream is untouched. ⚠ **And with no shelter
yet standing `busNext` returns null and the bus drives HEAD's byte-identical rule ⇒ the young city is a
free dead-regime control (199).**

**Visual.** Both seeds **PASS**. Both agents, independently, read the tooltip verbatim: **`City bus` /
*"Pulled in at the shelter — the queue is getting on."*** — the `Car` fallback is gone. Seed 42's agent
described the gold bus at the kerb with its shelter canopy **unprompted**. Whole-plate frames clean on
both: no z-order tears, no floating tiles, no compounding into clutter or darkness.

⚠ **THE CAMERA'S FIRST CUT DREW A FALSE FAIL, AND IT WAS THE INSTRUMENT (202/258).** `shot-busroute`
searched over time for the best-exposed standing bus — and then **kept stepping the sim**, so it
photographed a **later** instant in which the bus had driven on. An agent correctly reported an empty
street and a *tile* tooltip. **A camera must not advance the world past the state it just scored.**
It now **breaks the loop at the instant it measures**. Two more, both banked laws paid again:
`_sx`/`_sy` are **WORLD** coords, not CSS px (scoring ink at `_sx*dpr` sampled the top-left corner —
inside the placard I had just zeroed, so the rig returned a clean plausible **0px**, 250's tell); and
**`clampPan()` does not leave your target at the target** (272c) — it now reads the bus's position back
**after** the clamp and hovers there (0px off centre, both seeds).

**Aim.** By **measured ink**, never by the stop's position — `stopOK` requires ≥2 DEV neighbours, so a
shelter sits **by construction** on ground with tall frontage drawn in the row in front (**258**: the
siting rule is positively correlated with occlusion). The bar is the **INCUMBENT, not a number I chose**
(226): a standing bus must clear 70% of the mean **moving** bus's ink in the same frame. It reads
**187px vs 85 (seed 42)** and **59px vs 57 (seed 7)** — both clear.

**Verdict: SHIPPED.** 18% → 2% of shelters never called at; worst seed 38% → 5%; ~50% more calls on
every seed; and the city's only public transport finally knows its own name.

## Iteration 277 — the warped city and the lived city were different cities (2026-07-14) [Civic & culture × Deepen/FIX]

**Vector.** Civic & culture (oldest domain — 270, and that lap was a revert). Per 225's grep-the-seam
law I ignored the cue list and read the seam: `CIVICDESC` as a checklist (267), then the `tick()` rules
behind it. The census answered before any probe did — **`schools` reads 1 at pop 16–21k on 3 seeds in 3,
and 4 at pop 31–46k**, against a placard that promises *"another with every few thousand residents"* and
a rule that says `pop > 3500*(schools+1)`. Owed 8–13. Built 4.

**The diagnosis, and it inverted twice.**
1. *Not the siting.* `probe-school` decomposed the rule's own clauses on live plate data: the pool
   (`EMPTY|RES` + `roadNear` + not-within-4-of-a-school) holds **164–463 lots**, and the 60-try lottery's
   hit chance is **98–100%**. The placement is innocent — it lands whenever it fires (218's law run
   backwards: measure the roll's conversion *before* you tune anything).
2. *Not the rule either.* Driving `tick()` directly, the school count tracked demand **exactly**. The
   population it was reading was the wrong one.

**The defect.** `recount()` scaled a TOWER's residents by **`c.h/c.th`** — and **`c.h` is grown ONLY inside
`drawBuilding()`, i.e. inside `render()`** (272's finding). **`__warp` never renders** (it is a tight
`while(year<target){tick()}` loop). So under every warp — **the census, every probe in `probes/`, every
`?warp=` screenshot, every agent read this loop has ever taken** — **every tower in the city stood at
`h=0` and housed NOBODY, for all 813 ticks.** The city built its institutions against a third of its own
population. A city that is merely *played* interleaves `render()` with `tick()`, so its towers grow and it
builds all of them.

⇒ **The warped city and the lived city were different cities, and the loop has only ever looked at the
warped one.** Measured (`probe-warppop`, 3 regimes, same tick loop, pure world data):

| seed | regime | pop | owed | **SCHOOLS** | uni | dev | roads |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 7 | WARP (= census + every probe) | 45848 | 13 | **4** | 1 | 1062 | 800 |
| 7 | LIVE (= what a visitor sees) | 43434 | 12 | **12** | 3 | 1063 | 803 |
| 42 | WARP | 39514 | 11 | **4** | 1 | 1073 | 835 |
| 42 | LIVE | 38774 | 11 | **11** | 2 | 1092 | 833 |
| 1234 | WARP | 30988 | 8 | **4** | 1 | 1005 | 873 |
| 1234 | LIVE | 34006 | 9 | **9** | 2 | 992 | 874 |

**HEAD's warp reads `SCHOOLS = 4` on every seed — a CONSTANT, which is the defect stated with no threshold
invented** (236). `UNI` and `STAD` are pop-gated siblings in the same `tick()` and move the same way
(free positive controls, 248); `ROADS`/`dev` read no pop and are the must-not-move column (250) — flat.

**Change.** One line. `recount()`'s pop term becomes **`POPW[c.t] || 0`**. The file **already states this
invariant and broke it in exactly one place**: line 1520 reads *"Reads `c.th` (the TARGET height), never
`c.h` — `c.h` is animated inside `drawBuilding` at DRAW"*, and `recount()` was the **only** place in the
sim layer still reading `c.h`. `tick()` reads it nowhere. **Every other home in Solvista already
contributes its full `POPW` at any height — the tower's ramp was the anomaly, not the rule** — so the
constant is taken from the artifact's own ladder and none is invented (226/267).

**Probe — an EXACT fixed point, not a close one.** With `c.h` no longer feeding any world quantity, the
renderer cannot reach the simulation at all, so **WARP == LIVE == INSTANT byte-for-byte**: pop 42162 /
42162 / 42162 (seed 7), and every column — schools, uni, stad, towers, dev, walk%, roads — **identical on
all three seeds**. And the headline: **schools == owed on every seed (12/12, 10/10, 9/9)**.

**Census.** PASS, 0 page errors. Core flat: **pop 176510 → 175254 (−0.7%)**, **roads +8**, **developed +4**
(the per-seed signs disagree — −5.3 / −1.9 / +9.7% — which is the cascade, 231, not a direction). The
treatment moved hard: **schools 19 → 48 (+29)**, **CIVIC 82 → 112**, **QUAD 21 → 41** and **PLAZA 8 → 13**
(the grounds and forecourts that attach to the new institutions — a downstream consequence, correct), paid
for out of **RES −38 / TOWER −10 / MID −8**. `walkPct` rises (seed 7 **39 → 56**) because **services are
walkability's binding constraint** — `recount()`'s own comment says so, and the city can now walk to a school.

**Perf.** Priced by COUNTING OBJECTS, because a world-changing diff is never free just because it has no
draw call (222): path objects **day 111483 → 111785 (+0.27%)**, **night 138689 → 137971 (−0.52%)**, against
a ±100 floor. The city traded ~10 towers — the most expensive night draw (`winBandR` is 32% of the night
frame) — for schools and quads, so **the night column gives back** (241's law in reverse).

**Visual.** Both seeds PASS, whole-frame, un-zoomed. No z-order tears, floating tiles or blown-out colour
anywhere; both agents independently checked the plate rim, the beach seam, the river crossings and the
dense core. Seed 42: *"they read as neighbourhood anchors rather than a repeated motif — they break up the
residential fabric instead of adding to it."* Seed 7: *"the columned/domed institution cluster reads as a
genuine civic quarter… density feels like a real city, not a pile-up."*

**Verdict: FIXED.** The city builds the schools its own placard has promised for 277 iterations — and,
more than that, **the instrument the loop measures with now builds the city the artifact actually grows.**

## Iteration 278 — six laps made the label live and nobody re-read the card (2026-07-15) [People & activity × Interaction/UX + holistic step-back, 36th]

**Vector.** People & activity × **Interaction/UX** — the stalest cell in the grid (191, ~87 laps
ago; the whole column last touched at 229). People had taken **Deepen four laps running**
(240/247/262/271), so the header's own rotation note forbade a fifth.

**The seam, and it was hosted on a comment that documented the defect as a feature.** Six
separate laps — 249's ferry, 262's child, 269's tram, 271's surfer, 276's bus, and the cab —
each rewrote an `ENTINFO` `sub` from a frozen sentence into a **live function of its entity**,
every one of them for the same stated reason: *"computed live, never stored, so the label and
the draw cannot drift apart."* That work is real and it is correct. **And the card that
delivers it is built exactly once, inside the `mousemove` listener, and never again** — so all
of that liveness is snapshotted at the instant the cursor last twitched, over a diorama whose
entire subject is things that move. `stamp()`'s own comment said so out loud and treated it as
settled: *"tracked per frame, so it follows a walker **the tooltip has stopped updating**."*
The focus ring was a **workaround for a stale card, written down as a feature.**

**Probe first, and it REFUTED the hypothesis I opened with.** I expected the pick *reach* to be
the defect (`pickEntity` tests `d < r*r` in WORLD units, so a resident's `r=5` disc is only
**3.2 CSS px** at fit zoom). `probes/probe-hoverreach.mjs` says no: **100% of a resident's own
drawn pixels name a Resident** — a ped is small enough to sit inside its own disc. Reach is
fine. (It did find vehicles under-reaching: 23–29% of a car's body names nothing. Banked as a
cue, not this lap's vector.)

**Census.** PASS, core flat. Tile histogram moved (`ROAD −11 / EMPTY +11 / RES +4 / MID −3`) on
a change that touches no terrain and no `rng()` — and it **reproduced exactly on a re-run**, which
226's rule ("re-run the SAME FILE") reads as *guilty*. It is not: `probe-cascade` over **10 seeds**
comes back **+0.0% on every column, every seed — the two builds build the same world.** See the
law below.

**Probe (`probes/probe-hoverstale.mjs`).** TEMPORAL (134): every other gate here is frozen, so
*"the card goes stale"* has no instrument. It drives the artifact's own `advanceEntities` +
`render()`, holds a cursor still for 20s, and grades **what the card SAYS** (`tipEl.innerHTML`,
driven through the real `mousemove` listener) against what is under the cursor now. BUILD-AGNOSTIC
(230): HEAD has no `hoverRefresh`, so one file grades both builds with no source swap.

| 20s dwell | card CORRECT | GHOST | STALE | t=0 fixed pt | median s until it left its own pick disc |
| --- | --- | --- | --- | --- | --- |
| Resident — HEAD | **31–38%** | 62–69% | 0% | 10/10 | 2.0–5.0s |
| Resident — patch | **100.0%** | 0% | 0% | 10/10 | (same) |
| Vehicle — HEAD | **0.8–1.5%** | 98.5–99.3% | 0–0.3% | 10/10 | **0.5s** |
| Vehicle — patch | **100.0%** | 0% | 0% | 10/10 | (same) |
| TILE [control] | 95.8–99.6% → **100%** | | | 6/6 | (never left) |

**TILE is 248's free positive control** — a correct sibling readout on the same code path that
*cannot* move, so a flat resident column is a real flatness and not a dead rig. **t=0 is the
fixed point (245/253)** and it is exact in BOTH builds: at the instant of the mousemove the two
cards are identical by construction.

**Change.** The `mousemove` body is factored into **`hoverAt(mx,my)`**; the cursor is remembered
in screen px (`hoverMX/hoverMY`); **`hoverRefresh()`** re-reads the hover from it, and `frame()`
calls it on a **120ms throttle** — the `syncSky` idiom, and it only ever serves the cursor
standing *still*, because a moving mouse already fires `mousemove` at full rate. The DOM is
written **only when the sentence actually changed**. `__hover` drops the remembered cursor, or the
refresh would overwrite the pinned tile on the next frame. ⇒ **the ring, the card and the pointer
are one thing again**, and every one of those six live `sub` functions is finally *called*.

**Perf: FREE, and proven by the deterministic instrument, not the timer.** `perfab` was
unusable today (the *same* patched file read **44.61ms** and then **55.33ms** — a 24% swing on
identical code; one pass even reported a physically impossible **−62.7% night**). 216's law:
when a timing delta has no mechanism, **count path objects.** Night **138,098 → 138,098 (exactly
identical)**; day **111,650 → 111,660 (+0.009%)**. And the mechanism is airtight: with no cursor
on the canvas `hoverRefresh()` is a single null check per 120ms, so there is no draw work to add.

**Visual.** A still cannot prove a verb (134/258) — but the defect leaves a **static, spatial**
trace, and `probes/shot-hoverstale.mjs` shoots it: hover a car, hold the cursor still 6s, and in
HEAD the focus ring sails **653px** and **1108px** away while the card still says *"City bus"* /
*"Car"*. A blind agent, on a **crossed** map, both seeds, confirmed it unprompted: in the HEAD
frames the card names a vehicle that **is not under the pointer**; in the patch frames the card
names the road that **is** (Arterial / Boulevard), ringed. **It also caught a real bug in my
camera** (see the law), and a second agent, after the fix, **measured** the corrected captions
straight (claimed 32/42px, measured 30/42px) and re-confirmed the ghost independently.

**Step-back (36th).** Both seeds **VISUAL: PASS**, no compounding drift. Both agents named
**winter by the light alone** (261's day-length season is alive and legible). Their asides
re-confirm two *already-banked, deliberate* items and neither is new: golden hour's peach wash
(**265 chose that on purpose** — protect the complement, do not de-warm the scene) and the sea's
residual one-tone lattice (**255/257/268: structural** — 268 removed the seams, not the lattice).
Seed 7 also raised skyline monotony, which is the **CLOSED** skyline ladder (224). **Perf ARC,
priced in path objects vs 177 (101 laps): day 102,267 → 111,660 = +9.2%; night 137,258 → 138,098
= +0.6%** ⇒ ~**+0.09%/lap day, night flat.** The arc is still stopped.

**Verdict: SHIPPED.** The city had spent six iterations teaching its labels to tell the truth, and
had never once re-read them aloud.

## Iteration 279 — the city had a fire brigade, a burnt-ground tile and a placard promising flames, and had never once burned (2026-07-15) [Nature × New CA rule/FIX]

**Vector.** Nature × **New CA rule (FIX)** — the domain was stalest (last at 272) and its Deepen cell
had run twice running, so the kind had to change; its New CA rule cell had not been touched since **206**.
Header trim first, per 278's standing 🛑 (below).

**The seam (225's grep-the-seam law, 19 for 19).** Not the cue list — the **`tick()` seam**, and the
**census tile histogram**, which reads **`BURNT: 0`** in every seed and era of the artifact's life. Four
separate places promise Solvista burns: the placard (*"Fires jump block to block until the 1991
firehouse; the engine still patrols"*), `CIVICDESC.firehouse` (*"ready for the fires on the hill"*),
`VKIND.fireeng` (*"Lights on, heading to the smoke"*), and `TILEDESC[T.BURNT]` (*"Scorched ground after
a wildfire. The scrub takes it back."*). Behind them sits a **complete, textbook excitable medium** —
`c.fire=4` counting down, neighbour spread at `fire===2`, a `T.BURNT` tile with char, stumps and drifting
smoke, a regrowth rule, a `Burning` tooltip row, `drawFire` with flames and a plume, and a fire **engine**
with its own `atfire` duty and a `fireDoor()` BFS to route it.

**It had never run.** Measured on 6 seeds × the full 61-year run (`probes/probe-firespark.mjs`, pure world
data, driving the artifact's own `tick()`): **3 sparks and 0 JUMPS.** Three seeds in six never burn at all;
every one of the three fires was a **single hex** that went out in three ticks. **The placard's own verb had
happened exactly zero times.**

**Cause — 267's law, exactly.** The spread and the refractory were always correct. The **spark** is a
**uniform lottery over the plate**: `rc()` draws ONE ticket a tick out of **3,367 live cells**, and the
forest it hunts is **55–98 of them (1.6–2.9%)**. The hill fire is expected **0.18 times per CITY**. *A tiny
host cannot be found by a uniform sample of a large space, and the RATE is irrelevant until the SPACE is
right.* An excitable medium is spark + spread + refractory (263), and this one had no spark.

**Change.** **Walk the host**, exactly as 263's wildflower CA does — a per-cell roll on
`hashCell(x,y,seedNum^SALT^TICKN)` over `HEXI`, so the ignition **spends no `rng()` draw** and cannot
reshuffle the seeded stream (only the terrain a fire *burns* can, which is the honest cost of a rule that
writes terrain). **HEAD's two lotteries are KEPT, draws and all.** New: `FIRESPK`, `TIMBSPK`, and
**`FIREHOUSE`** — the 1991 engine expressed as a *factor on the timber spark* rather than a second year
literal, off the same idea the spread clause already stops jumping on.

**Census.** **PASS.** `BURNT 0 → 4` — **the first burnt ground in the artifact's life** — `FOREST 696 → 666`
(fire eats forest), `MEADOW +25` (the scrub taking it back). Core within gate; `towers 420 → 497` is the
chaotic cascade of a terrain-changing rule (231), and `developed` is **flat across 6 seeds** (mean −0.5%).

**Probe.** `probe-firespark`: **3 sparks / 0 jumps → 102 sparks / 35 JUMPS**, biggest episode **11 hexes**.
✅ **The BLOOM CA is the free positive control** (248) — a correct sibling excitable medium in the same
`tick()` — **alive on every seed in both builds, and unmoved** (101–102 lit ticks), so the zero was the rule
and not the rig. ✅ **EXACT FIXED POINT** (245/253): with both spark rates at **0** the walk cannot ignite,
so the patch runs HEAD's fire code byte-for-byte — and it **reproduces HEAD to the number on every seed and
every column**. Rates swept on both of 206's ledgers; gated on the **worst seed** (233).

**...and then the fire, having never burned, had never been LOOKED at.** A dead rule hides its own draw bugs.
`drawFire` painted its flame with `col('gold')` — i.e. **BASE × TINT, through the illuminant** — which is the
right model for every diffuse surface in the city and a **category error on the one thing in it that makes
its own light** (257's law, arriving on an **emitter** instead of on a mirror; the lit windows already take a
raw literal for exactly this reason). Measured: the flame's rendered luminance **FELL 225 (noon) → 141 (dusk)
→ 106 (night)** and its hue rotated **gold → muddy brown** (`255,235,89 → 144,98,49`) — **the city's fires
were dimmest at midnight** (214's hue-rotation law). Fixed: a **raw emissive literal**, out of the
illuminant's reach, plus a **radial gradient falling to alpha 0** (195: a flat additive arc is a coin, not a
glow), drawn at ground level so it occludes with its own cell and cannot orphan. Now: **peak 241 at EVERY
hour — 95% of the frame max — flat by construction**, and its footprint *grows* into the dark (426 → 797 px).

⇒ **AND 271'S LAW CAUGHT THE SIBLING: the BEACH BONFIRE had BOTH bugs.** After fixing a per-entity rule,
grep the **CATEGORY** — and the category here is *things that are on fire*. The bonfire (shipped, accepted,
unquestioned for 279 iterations) was a flat symmetric triangle painted through `col('gold',1.5)` under a
**flat additive `arc()`** — and a blind agent, unprompted, reported *"hard-edged amber **coins** along the
coast."* Same fix, same reasons. Re-read blind: *"no visible circular boundary, no hard-edged coin… they hold
their saturation against the blue-violet night illuminant."*

**Visual.** Whole-plate integrity **PASSES unanimously** — every agent, every round, both seeds, both
lights: no z-order tears, no floating tiles, no blown-out colour, city coherent and balanced. Emitter
confirmed by agents *and* by measurement (*"the flame core is pixel-identical in both frames while its
surroundings drop hard"*). Bonfire fix **PASS**.

⚠ **BUT THE FLAME'S SILHOUETTE FAILS, AND I AM BANKING IT RATHER THAN RESHAPING IT A FOURTH TIME (270).**
HEAD's flame was two flat symmetric triangles; **four blind agents on two seeds** independently called it *"a
tent"*, *"a traffic cone"*, *"a glowing teepee"* — one admitting it first parsed the pair as **campsite tents
in a forest**. I reshaped it twice (curved → asymmetric bezier tongue with a lick). Agents agree the **triangle
is gone** (*"it is not a symmetric tent/cone — the previous problem is fixed"*) and now call it a **candle /
teardrop**: no bulge-and-neck, no visible detached lick, no temperature gradient. **270's scope boundary is
explicit — a claim about a draw's shape is a `polish-tile` job, and a growth lap's contribution is to FIND it
and GATE it, not to redesign it. Bank the finding with its gate already written and stop.** Both cameras and
both probes are banked.

**Verdict: FIXED.** A city that has always had a fire brigade, a burnt-ground tile, a smoke plume and a
placard promising flames, and that had never, on any seed, in sixty-one years, caught fire.

## Iteration 280 — the flag beside it had gone limp in the calm for 230 iterations (2026-07-15) [Sky & atmosphere × Deepen]

**Vector.** Sky × Deepen (rotation: Sky was the oldest domain at 273; Sky is post-saturation ⇒ Deepen/Polish only).

**The seam, found by grep, not by the cue list** (225's law, 19 for 19). `WINDA`'s own comment names its
readers: *"the gust cycle the trees, the palms, the flags and the clouds all already ride"* — and 245 added the
sea. **Two things in the sky were not in that list and had never read it:**
- **`drawKite`** — gated only on `LITAMT`. A kite flew at exactly the same height, the same downwind offset,
  the same line tension and the same tail-flap in a **dead calm** as in a **full gale**. `windFlag` sits
  **twenty lines below it** and has gone *"limp in the calm, snapping straight in a gust"* since **iter 50**.
  (262's law, exactly: the unfixed sibling is next to the fix.)
- **`balloons`** — `b.x += b.sp*dt*s`. The **clouds they drift among** read `(0.55+0.9*WINDA)`. A free balloon
  that does not drift at wind speed is not a free balloon.

**Change.** Three predicates, every existing reader left **byte-identical**:
- `windForce()` = `clamp((WINDA-0.25)/0.75,0,1)` — seaState's own normalisation, lifted out, not reinvented.
- `windDrift()` = `0.55+0.9*WINDA` — **ONE definition, two readers**: the clouds (byte-identical: it is literally
  their existing expression) and now the balloons.
- `kiteGust()` = `KITECALM+(1-KITECALM)*windForce()`, `KITECALM=0.45`. **Every lever in `drawKite` is written as a
  multiple of it, so `kiteGust()==1` (full gale) reproduces HEAD's literals byte-for-byte** (245's centred lever) —
  which is to say **HEAD drew every kite as though it were always blowing a full gale.** Lift, downwind offset, line
  belly and tail streaming all ride it. The diamond keeps its size: a kite does not shrink, it comes **DOWN** (270).
- `window.__setWind` / `__wind()` — **the hook `WINDA` never had.** 275's law ordered every sea/tree/flag probe to
  pin `WINDA`, and the artifact made that **impossible**: it is recomputed from `time` inside `advanceEntities`,
  which only runs while `playing`, so a frozen page held whatever gust it loaded on. (229/243: a documented trap you
  keep walking into is a broken tool — fix the tool.)
- The balloon's `ENTINFO` `sub` is now a **live function** of the air it is riding (cashing 278's `hoverRefresh`).

**Census.** Tile histogram **EMPTY**; `pop`/`developed`/`roads` **+0**; entity counts unchanged. `solarRoofs +3` is
226's documented tick-count wobble. ⚠ **I skipped step 2 and the first census run was against a STALE baseline** —
it showed `TOWER +77 / BURNT 0→4`, which is **279's fire cascade, quoted verbatim in 279's own entry**. Re-pinned
from pristine HEAD, the histogram is empty, as a draw-only change must be.

**Probe** (`probes/probe-windkite.mjs`, `probes/shot-windkite.mjs`). Isolation is **253's predicate suppression in
ONE page** — `window.kiteGust = () => 1` renders HEAD's kite exactly ⇒ **no HEAD file, no cross-build floor,
build-agnostic**, floor **exactly 0 px**.
- **HEAD's kite: `0 px` between a dead calm and a full gale, on 3 seeds in 3.** No threshold invented — the defect
  states itself (236).
- Patch: **195–231 px moved**, the kite flying **+14..+17 px higher** in the gale.
- **FIXED POINT: `0 px`** — the shipped kite at full gale is byte-identical to HEAD (245).
- **MUST-NOT-MOVE: 0 px outside the kite's own layer.**
- **POSITIVE CONTROL (248): the FLAG** — the correct sibling twenty lines below — moved on **both** builds.
- **Balloon/cloud drift ratio: SD `0.0000`** (patch) against **HEAD's SD 0.32–0.34, range 1.08x..2.19x**. The
  balloon now rides exactly the air the clouds ride. Measured `E[WINDA] = 0.421`.

**Perf.** Path objects **day +0.06%, night +0.07%** — the kite change adds **zero** path objects (same fills and
strokes, different coordinates); the residue is the balloons/clouds sitting at slightly different x. **FREE** (198/216).

**Visual.** Discriminating pair (264): same world, same frozen instant, same hex, **only the wind differs**, tokens
meaningless and the map **CROSSED between seeds** (238/268). **Both blind agents named the gale correctly, and named
OPPOSITE tokens** (s42→sigma, s7→kappa) — so they were reading the kite, not the ordering. Both described the calm
kite as *"sagging in still air"* and *"attached, not detached"*; both PASSed the un-zoomed city. One noted, unprompted,
the sea's wind-driven chop in the windy frame — the same `WINDA`, confirming the pin from a second draw.

**Verdict: SHIPPED.**

## Iteration 281 — the city kept opening corner shops and then quietly bricking them up (2026-07-15) [Urban fabric × New CA rule/FIX]

**Vector.** Urban fabric × New CA rule (its coldest cell — last at **151**, 130 laps ago), taken on
the header's own standing steer: *"Urban's LOOK is done; its RULES were not audited. Grep `tick()`,
not `drawBuilding`."* Grepped the `tick()` seam; the corner-shop pass (iter 151) was carrying a
**199-tell in its own comment**.

**The defect.** `c.corner` is a store on a house's ground floor. Its comment promises two things —
*"the pass RE-VALIDATES … so the 'no shop within 2' claim holds at every tick"* and *"one store per
gap falls out for free"* — and both are made by a pass whose **first line is
`if(c.t!==T.RES)continue;`**. Its **DRAW** sits inside `drawBuilding`'s `if(c.t===T.RES)` branch and
its **TOOLTIP** gates on `T.RES`; but its **VETO** (`countAround(x,y,2,n=>n.corner)`) and its
**re-validation** never check the type. So the moment a corner house upgraded to a `MID`, the flag
became a **GHOST** — drawn by nothing, named by nothing, never absorbed — **and still vetoing every
replacement store within 2 hexes, forever.**

And the rule **selected for its own destruction** (231, arriving on a *type change* instead of an
occlusion): a corner shop requires `countAround(x,y,1,DEV)>=3` — *a built-up block* — which is
**verbatim the RES→MID upgrade's own precondition** (`dev>=3`). It opened its stores on exactly the
houses most likely to be redeveloped.

**Probed before designing** (`probes/probe-corner.mjs` — pure world data, no render, no clock, no
noise floor, build-agnostic). HEAD, 2035, 6 seeds: **9 live corner shops against 98 ghosts.**

| per city | 1995 | 2010 | 2035 |
| --- | --- | --- | --- |
| shops the city **SHOWS** you | 3.5 | 3.2 | **1.5** ⬇ |
| **GHOSTS** | 1.3 | 5.7 | **16.3** ⬆ |
| never absorbed (the broken promise) | 0.2 | 1.5 | 4.8 |

⇒ **92% of every corner shop the city ever opened was INVISIBLE, and the count FELL as the city grew.**
A mature Solvista showed you **one**. 89 of the 98 ghosts were `MID`; the rest were PARK/PLAZA/QUAD,
where the house was genuinely demolished.

**Change — one line, and the category was already in the file.** This is **206's law, whose SECOND
HALF nobody had written down**: 206 fixed the GARDEN's *inputs* (count `HOMES`={RES,MID} as
neighbours, not houses) and the corner shop, in the same `tick()`, had the identical defect in its
**OUTPUT**. `c.corner` is a property of a **HOME**, not of a **HOUSE**:
`if(!HOMES.has(c.t)){if(c.corner)c.corner=false;continue;}` — so the store **rides the building up**
(retail at street level, flats above) and a **demolished** home loses its store with its house, which
is what finally kills the ghost veto. Three readers now share the one predicate (pass · draw ·
tooltip), per 112.
The **idiom was already shipped**: `c.hstr` is *"a DRAW property, not a zoning veto"*, cashed by
`drawBuilding`'s TOWER shop podium — and **`midLook`'s `form===1` was already called *"shop plinth,
flats set back above it"***. The walk-up had been drawing the empty plinth for a shop it was never
given. The MID shopfront is sized to the walk-up's **own published body** (`ab`/`dy`/`gx+jx`, the
base segment, width factor always 1.00), never the RES body's hard-coded `0.30/0.26` — the same
discipline the skybridge and helideck owe `towerLook`. First sill lifted to 5.2 where `c.corner`, so
the flats start **above** the fascia (≤1 band displaced, on ~5 buildings a city).
**Pool priced BEFORE building** (206's second ledger): only **5.0 MID/city** clear the retail-gap
test against **413 MID/city** ⇒ re-keying **cannot flood**.

**Census.** **PASS — every metric +0, tile histogram EMPTY**, including the tick-sensitive
`solarRoofs` (226's ±2 wobble did not even fire). No terrain written, no `rng()` drawn, and `POPW` is
keyed on tile type so the flag weighs nothing. `MARKET/COM/RES/MID` byte-identical to HEAD in the probe.

**Probe (same file grades both builds, no source swap).**

| per city @2035 | HEAD | PATCH |
| --- | --- | --- |
| corner shops **SHOWN** | **1.5** (3.5→3.2→1.5, *decaying*) | **14.0** (5.2→8.0→14.0, *growing*) |
| ghosts | **16.3** | **0** |
| never absorbed | 4.8 | **0** |
| flags stranded on a demolished lot | 9 (total) | **0** |

**Perf.** Path objects **day 112,255 → 112,880 (+0.56%)**, **night 140,119 → 140,666 (+0.39%)** — and
it has a *mechanism* (216): ~37 new shopfronts across the 3 seeds at ~17 objects each. HEAD was only
cheap because **92% of its corner shops were invisible ghosts**; this is the cost of finally drawing
the feature the rule has been placing since iter 151. A good trade at 1 → 14 shops (cf. 194's tree
shadows at ~3%).

**Visual.** **PASS on both seeds, map CROSSED, reported per-FILE.** Both agents independently located
the shop **on the walk-up**, flat on its street-facing facet — *"no float, no sink, no wrong-facet
landing"* — and both confirmed the window bands stop **above** the fascia. Seed 7's agent **measured
the sill lift itself** (*"kappa's lowest window band sat ~4px lower, i.e. sigma raised the flats'
bands to clear the sign"*), which is exactly the `ph→5.2` gate. Whole-city, both lights: *"no clutter,
no green rash"*; seed 42's diff of the two city frames was **~2.3k px of 1.26M**.
⚠ **The gate was answer-KEYED, not blind** — the caption must state the shop count (258: an absent
subject and a correctly-negative one render the same frame), and the count *is* the build. So this was
a **LOCATE** (108), with the caption as the answer key and the agents reporting per file (239); the
*existence* claim rests on the probe, which has no noise floor.

⚠ **THE INSTRUMENT CONVICTED ITSELF, VIA A TRANSPOSE.** The probe's build-detector asked *"does
`drawBuilding`'s MID branch mention `c.corner`?"* by splitting the source on `c.t===T.MID` — but
`drawBuilding`'s **first line** is `const ML=c.t===T.MID?midLook(...):null`, **above the RES branch**,
so the tail contained the RES shopfront and it reported **HEAD as patched**. It came back **98 shown /
9 ghosts — the exact TRANSPOSE of the truth measured ten minutes earlier**, which is the only reason
it was caught. ⇒ **Match the BRANCH (`else if(c.t===T.MID)`), never the first occurrence of its TEST**,
and carry a number you already know. (Law promoted to SKILL.md.)

**Verdict: FIXED.** (Also 268's law on my own probe: its first cut hard-coded HEAD's definition of
"live" and duly filed the *feature* under the *defect*, calling a patched MID's shop a ghost. **Read
what your instrument COMPARES — even when you wrote it twenty minutes ago.**)

## Iteration 282 — the bed was a ribbon welded to the sand, and its own tooltip explained why nobody should look (2026-07-15) [Water & coast × New CA rule/FIX]

**Vector.** Water & coast × **New CA rule** — the header's own instruction: Water was the
oldest domain (275), its **Polish cell had taken four laps running** (255/266/268/275), and its
**New CA rule cell was 191 laps stale (90)** ⇒ *grep Water's `tick()` seam, not its cue list*.
225's grep-the-seam law is now **21 for 21 at finding**.

**The seam.** `tick()` has three water passes (marsh · kelp · dune). The census told the story
before I read a line of them: **MARSH and KELP are FROZEN CONSTANTS** — 18/18/18, 14/14/14,
13/13/13 and 17/17/17, 10/10/10, 8/8/8 across 1985/2005/2035 on every seed — while the **DUNE
beside them in the same `tick()` climbs 20 → 35**.

**What was wrong.** The kelp pass sits in `tick()` (L2423) and runs **813 times a run**. It
converts its entire bed on **tick 1** and then **converts nothing for the remaining 812 ticks**:
`DISTINCT BED SIZES = 1`, turnover **0**, on **6 seeds in 6** (218's conversion rate: **100.0%,
with ZERO still-eligible cells** — the roll is saturated and `p` steers nothing). And its own
tooltip comment had **written the silence down as a design fact**: *"Kelp carries no CA state
(placed once in `genWorld`, never ticked)"* — **false about the mechanism, and TRUE about the
observable**, which is exactly why nobody ever looked.
  The cause is one predicate: eligibility was **`countAround(BEACH) > 0`** — *"is a beach beside
me?"*, a **ONE-HEX PROXY FOR DEPTH**. It does not *approximate* depth, it **PINS** it: measured,
every kelp hex in every city stood at `rDeep` **EXACTLY 1.000**, at every era, forever. A ribbon
welded to the sand — on a seabed (268's `rDeep`, smoothstepped shoals and channels) it **never
read**, in an ocean whose shelf band the artifact **names** (`SHELF0..SHELF1`), whose tooltip
**reports** it, and whose **wind farm STANDS on it** under a comment reading *"one constant, so
the word and the siting cannot drift apart."* The kelp was the one marine thing that never
became a reader.

**Change.** The kelp is the **third reader of that band**. A holdfast roots where the **LIGHT**
still reaches the bottom (`kelpLight = 1 − rDeep/KELPLIT`, `KELPLIT = SHELF1+1` — *no new
constant*), **strikes** against the sand, **recruits outward** along the bottom from a neighbour
that has already taken, and the swell **SCOURS** its deep, exposed margin. So the bed is never
*placed*: it grows over the decades and its outer edge sits where recruitment and scour balance
— **a DEPTH the seabed decides, not a count anybody tuned**. `TICKN`-salted `hashCell` ⇒ **zero
`rng()` draws**; and WATER and KELP are both in `WETSET`, so nothing that asks *"is this wet?"*
— the dune's own gate included — can tell the difference. Tooltip now names the bed's **Depth**
off the same field the open water beside it uses, and `TILEDESC` no longer says *"off the beach"*.

**Census.** `pop / roads / developed / towers / towerHt / bridges` **+0, byte-flat**; 0 page
errors. Tile histogram moved **exactly** the intended tile and **nothing else**, conserved:
**KELP 105 → 90 (−15) · WATER 6789 → 6804 (+15)**. (`solarRoofs +3` = 226's RAF tick-count
wobble; had the stream been perturbed, `pop` and `towers` would have moved. They did not.)

**Probe** (`probes/probe-kelplife.mjs` — pure world data, drives the artifact's own `tick()`,
**no pixels, no noise floor**, build-agnostic via `SRC=`):

| | HEAD | patch |
| --- | --- | --- |
| distinct bed sizes (800 ticks) | **1, 1, 1, 1, 1, 1** | **14, 18, 12, 14, 28, 38** |
| turnover (cells changing state) | 0 | 6–23 |
| mean depth | **1.000** flat | 1.19–1.38 |
| on the Coastal shelf | 0% | 0–7% |
| bed size / **WORST seed** | 17.7 / **36** | 16.0 / **34** |
| **pop / dev / roads** | — | **BYTE-IDENTICAL, all 6 seeds** |
| **DUNE positive control** | 22–37 sizes | **identical, still alive** |

The must-not-move column is the load-bearing one: the rule draws no `rng()` and swaps only
inside `WETSET`, so it grows the **byte-for-byte same city** — inertness *proved*, not asserted.
And the bed is **never larger than HEAD's on ANY seed** (34 ≤ 36) ⇒ **the coast CANNOT darken**,
which is the whole point, because kelp is this loop's most notorious regression.

**Visual.** PASS ×2, blind, **crossed** map, meaningless tokens (238/239/268). The seed-7 agent
named the treatment **unprompted**, in the probe's own terms: HEAD = *"a thin, mostly single-hex
RIBBON tracing the sand's edge… always touching sand, never pushing out to sea. A fringe/outline,
**not a habitat**"*; patch = *"a BED with real area and depth… stands off the beach with open
water between it and the sand. It has an **interior and an outer edge**; it reads as something
**growing** in the shallows."* Both agents, both seeds, on the **un-zoomed plate**: *"neither
coast is lined with dark weed… the sand/sea edge stays clean, bright, and unlined in both."*

**⛔ REFUTED BEFORE IT WAS BUILT — do not re-try "the kelp answers the CITY".** The obvious
Deepen (runoff/turbidity kills the bed as the coast develops) is **arithmetically dead**:
`dist(kelp → DEV/ROAD)` is **4.44–5.73 hexes and BYTE-IDENTICAL at 1985 and 2035 on every
seed** — the city never comes **one hex** closer to the kelp in fifty years. The field is a
CONSTANT (267's law, paid before a line was written). `probes/probe-kelphost.mjs`.

**Verdict: SHIPPED / FIXED.** Probes banked: `probe-kelplife` (the gate) · `probe-kelpsweep`
(the two-ledger sweep) · `probe-kelppool` (how dark could the coast go) · `probe-kelphost`
(the refutation) · `shot-kelp` (the camera).

## Iteration 283 — every built-up street in the city was a "grand avenue", and the grandest avenue had no trees (2026-07-15) [Transport × New CA rule/FIX + holistic step-back, 37th]

**Vector.** Transport × New CA rule (its stalest cell, 77). Followed the header's own steer —
*grep Transport's `tick()` seam and its FLAGS, never its cue list* — to `c.treed`, the boulevard canopy.

**The defect (measured, no threshold invented).** The canopy pass (L2539) calls itself *"a contagion along
the busy street network... spreads block to block"*, and iter **171** built it a tooltip that names the tile a
**Boulevard** and prints `Length: N blocks`. Both were false, and the arithmetic says why: the spark was
`p=0.002/tick` on **`c.busy`**, and over the ~470 ticks since 2000 that converts `1-(1-0.002)^467 ≈ 61%` of
every busy street **with no neighbour at all**. Measured over 6 seeds at 2035:
- **93.9% of every busy street in the city was tree-lined** (one seed read 100.3% — `c.busy` is recomputed
  each tick while `c.treed` is permanent). A "Boulevard" was the **DEFAULT STATE of a developed road**:
  **333.5/city against 28.8 Avenues.**
- The contagion beat its own null (same count, scattered at random) by **1.34x** — i.e. **the spontaneous term
  did the work and the neighbour term was decorative.** It was not a contagion.
- **Only 15.3% of the canopy stood on a trunk route at all**, and only 39.6% of the trunk was treed. The rule's
  host (`c.busy`) is **anti-correlated with grandeur** — arterials run out to the rim where they are not
  "busy", so they never qualified. On seed 42 the city's **grandest trunk (flow 319, 5x `ARTFLOW`) carried
  ZERO trees**; the camera printed `run=0 blocks` on it.

**Change.** The substrate becomes the **trunk** (`c.flow>=ARTFLOW`, the drainage network published since iter
77), and the ignition becomes **structural**. Two halves, and fixing either alone ships nothing:
- **The SPARK is a set, not a lottery.** `blvdSpark(c)` = the grandest built-up trunk cells
  (`c.busy && c.flow >= ARTFLOW*BLVDGRAND`, `BLVDGRAND=2`) — 3–28 per city, **nonempty on every seed**.
  A rare Poisson coin left **seed 99 with ONE tree** (233); `BLVDGRAND=3` starves that same seed (extent 9).
- **The RATE is HEAD's own `0.002`, unchanged** — per 218, only the **PREDICATE** can steer a saturated roll,
  so the rate now sets only *when* a planting takes, never *whether*.

**Census.** PASS. **Core BYTE-IDENTICAL**: `pop` `roads` `developed` `towers` `towerHt` `arterials` `avenues`
all **+0**; **tile histogram EMPTY**. Only `boulevardTrees` **1156 → 215**. (`solarRoofs −2` then **−3** on a
*re-run of the same file* ⇒ 226's tick-count wobble, not mine. The pass draws **zero `rng()`** and writes only
`c.treed`, which nothing in `tick()` reads but itself ⇒ **wholly inert**.)

**Probe** (`probes/probe-blvdnet.mjs`, `probe-trunkfront.mjs`, `probe-trunkgrand.mjs` — pure world data, no
render, no clock, no noise floor). HEAD → patch, 6 seeds:
- fill of the busy network **93.9% → 21.3%** · canopy **on the trunk 15.3% → 80.5%**
- mean run **4.61 → 21.04 blocks**; longest allee **19.0 → 34.2**; vs its own null **1.34x → 18.3x**
- **singletons 0.0% on every seed** — every boulevard cell is part of a run
- **worst seed does not starve**: 31 cells forming ONE 31-block allee (233)
- the label ladder is **restored**: `Boulevard 333.5 → 76.0 | Arterial 75.5 → 69.2 | Avenue 28.8 → 294.0`

**171's own probe convicts HEAD, and it had been FAILing on HEAD unnoticed.** `probes/probe-boulevard.mjs`
(171's tooltip gate) **FAILed on pristine HEAD** — every failing cell, on both builds, is a `c.fete` **festival
street**, which `describeTile`'s title chain deliberately preempts; the probe skipped `bridge` and not `fete`.
Repaired in the tool, not documented as a trap (243), and it now **PASSes on both builds**. Its numbers are the
finding: **its "busy-plain control" — the Avenue — had 33 members on HEAD seed 7 against a target of 327.**
*The probe built to prove "the boulevards name themselves" shipped with a nearly-empty control, and nobody read
the ratio.* It is now 314. ⚠ It also had **no `SRC=`**, so `SRC=head node probe-boulevard.mjs` silently measured
the **worktree** and handed back the patch's numbers under HEAD's name — fixed.

**Perf.** A **credit**, mechanised: path objects **day 112,923 → 110,627 (−2.0%)**, **night 140,654 → 138,404
(−1.6%)**. 241's law in reverse — count the objects when a lap SUBTRACTS.

**Visual — the gate is STRUCTURALLY INCAPABLE of grading this vector, and that is the lap's law.** Two blind
agents (crossed map, meaningless tokens) FAILed, both having **measured the frames themselves**: the builds
differ by **0.24–0.68% of pixels**, green share is **unchanged** (24.03% vs 24.13% — *no denuding*, which was
the real risk), and **neither could trace a tree-lined avenue in EITHER build.** They were right, and the
artifact is innocent: at fit zoom a tree is ~3px, so **HEAD's canopy is equally invisible** (226 — measure the
incumbent). I looked myself and confirmed it. And an ink probe **refutes the occlusion reading**: in the
close-up crop **24 of 24** in-view allee hexes render, unoccluded, 360k ink units. ⚠ **My close-up ALSO framed
the CBD** — 269's law, which the header had warned of verbatim (*`c.flow` peaks at the core ⇒ the avenue
selects for its own burial*).

**Step-back (37th), 2 seeds x 3 lights x 2 calendars.** s42 **PASS**, s7 FAIL on two already-banked deliberate
decisions (golden-hour warm wash — 265; skyline monotony — the CLOSED 224 ladder). **Both agents named winter
by the LIGHT ALONE**, one reciting the mechanism unprompted ⇒ **261's season is alive.** Perf **ARC** vs 177:
day **+8.2%**, night **+0.8%** — *below* 278's +9.2%/+0.6%, so **the arc is still stopped and went DOWN this
lap.** 🆕 One genuinely new cue below.

**Verdict: FIXED.** (A rule that had saturated its own host, a contagion that was not one, and a label ladder
its own probe's control had already disproved.)
