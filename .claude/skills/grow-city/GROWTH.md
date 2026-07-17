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
| **Nature** | 4, 26, 29, 102, **156**, **174** | 1, 13, 60, **206**, **279**, **287** | 37, 46, 67, 76, **108**, **120**, **139**, **166**, ~~**233**~~, **238**, ~~**246**~~, **263**, **272**, **301**, **308**, **323**, **333** | ~~46~~, ~~88~~, ~~101~~ | U4 | 53, 96, **194**, ~~**198**~~, **215**, **221**, ~~**251**~~, **294** | **117**, **129**, **148**, **183** |
| **Water & coast** | 6, 10, 12, 16, 20, 33, 106, **169**, **296** | 90, **282** | 17, 25, 51, 65, 72, **113**, **123**, **159**, **196**, **245**, **257**, **289**, **303**, **311**, **322**, **329** | 22, ~~**205**~~ | | U2, 44, 58, 79, **116**, **132**, **150**, **185**, **214**, **223**,  **234**, ~~**255**~~, **266**, **268**, **275** | **97**, **141**, **176** |
| **Urban fabric** | 32, 62, **295** | 7, 23, ~~82~~, **151**, **281** | 38, 54, 68, 92, **165**, **173**, **189**, **199**, **209**, ~~**218**~~, **219**, ~~**254**~~, **267**, **288**, **309**, **316**, ~~**332**~~ | 47, **109**, ~~**160**~~ | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103**, **110**, **118**, **124**, **143**, **180**, **216**, **220**, **224**, **228**, **235**, **239**, **274**, **302** | **133**, **327** |
| **Transport** | 2, 9, 21, 31, 48, **164**, **297** | 77, **283** | 28, 39, 55, 63, **112**, **121**, **128**, **155**, **179**, **193**, **230**, **249**, **258**, **269**, ~~**312**~~ | 5, 15, **138**, **211**, **276** | U4 | U1, U3, 70, 85, 87, 94, **146**, **188**, ~~**203**~~, **241**, **243** | **105**, **171**, **290** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107**, **326** | 36, 59, 66, 80, 91, **149**, **158**, **175**, ~~**195**~~, **213**, **244**, **250**, **259**, **277**, **285**, **292**, **307** | 45, **204**, **319** | | 73, ~~**114**~~, **168**, **231**, ~~**270**~~, **299** | 52, 122, **140**, **184** |
| **Sky & atmosphere** | 27, 43, **291**, **331** | **321** | 19, 35, 50, 57, 95, **135**, **153**, **161**, **181**, **190**, **208**, **225**, **236**, **253**, **261**, **280**, **284**, **298**, **305**, **313**, **328** | | | 61, 81, 89, **115**, **200**, **242**, **248**, **265**, ~~**273**~~ | ~~**134**~~, **144** |
| **People & activity** | 41, 56, **127**, **170**, **186**, **293** | 49, **324** | 34, 64, 93, **104**, **119**, **145**, **178**, **201**, **210**, **240**, **247**, **262**, **271**, **286**, **306**, **314**, **317**, **318** | 78, **111** | | 84, **137**, **163**, **226**, **300** | 71, **154**, **191**, **278** |

- **Interaction/UX** (inventory + the `<meta charset>` repeal archived at 270; both are INVARIANTS in SKILL.md). What
  steers: when adding an entity array, `stamp()` it in its draw + add an `ENTINFO` row (same discipline as the census
  hook) — `stamp()` also draws the focus ring, so any stamped entity is ringable free. **An `ENTINFO` `sub` may be a
  FUNCTION of the entity (105)** — use it when a thing's interest is its *membership* (line/route/depot), computed live.
- ✅ **THE TRIM METHOD** (paid 279, again 280): a block is cuttable when its **LAW is in SKILL.md** and its **ARTIFACT
  FACTS compress to their imperatives**; a *superseded* warning is free to cut (280's `__setWind` retired 275's).
  There is never a block you can simply *delete* — **compress the oldest, and pay for your OWN additions in the same lap.**
- **ROTATION.** Last: Nature **333** (FIRE SMOKE LEANS DOWNWIND — Deepen, closing cue (bj): the wildfire plume + ember
  scars rose DEAD-STRAIGHT while everything else rode WINDA. `smokeLean(rise)=rise*windForce()` leans each puff +x by its
  own RISE (a plume bends over as it climbs), in the same +x the clouds drift; calm=0=HEAD byte-for-byte (245's fixed
  point). Draw-only, census byte-identical; probe `dx==rise` exactly + fixed point 0px; visual — both blind agents ×2
  seeds on a CROSSED map named the gale by the lean alone (264 discriminating pair). ✅ **CUE (bj) CLOSED; the WINDA
  reader category is fully enumerated (280).** ⛔ Cue (bc) — fire glow eaten by later rows — is a separate 266 z-order
  job for a future fire lap.) Prev: ~~Urban **332**~~ (EXPLORED → REVERTED — CHIMNEY WOODSMOKE: probe-proven but ⛔
  **INVISIBLE at city zoom** — a SHORT RES host has no clean sky backdrop; "ink renders" ≠ "viewer sees it", 266.
  ⛔ **DO NOT RE-TRY chimney smoke.**) Prev: Sky **331** (HIGH JET + CONTRAIL — Sky × New element, **4th ever**; SCREEN-SPACE
  jet in the sky slab, contrail white/day → golden → GONE night → faded in rain; Math.random drift-in, census
  byte-identical; `probe-jet`. ⚠ a jet does NOT parallax ⇒ screen space.) Prev: **STEP-BACK #43 @330** (NO DRIFT; 326–329 draw-only/byte-flat; 2 seeds × 5 frames PASS; perf arc vs 285 ≈**+0.027%/lap** over 44 laps, snow-cleared — no perf-fix lap.) Prev: Water **329**
  (WATERFRONT REFLECTION ANSWERS THE SKYLINE — night city-lights smear gates on `shoreGlow(y)` (developed frontage ≤10
  cells inshore, reads `c.th`) so lit downtown coast shimmers, dune/park headlands stay dark; draw-only.) Prev: Sky **328** (THE STRIKE —
  forked bolt grounds down the rain shaft on 291's flash peak, `bolt>0.22` inside `if(pa>0)`, 248) · Urban **327**
  (FACADE TILE PICK — `pickTile`=frontmost built prism, cue (ba) CLOSED, 133→327) · Civic **326** (CIVIC SQUARE
  MATURATION — `c.civ` accumulation+diffusion, corr(civ,age)=1.0). Prev (all shipped, census byte-identical, laws in SKILL.md): **STEP-BACK
  #42 @325** (NO DRIFT; day-length season alive; perm arc BYTE-FLAT vs 320 once snow cleared — clear `c.snow` before
  pricing the arc) · People **324** (DESIRE PATHS, `c.wear` diffusion off `c.buzz`) · Nature **323** (WILDFLOWERS
  ANSWER SPRING) · Water **322** (WHALES MIGRATE, `whaleSeason()`) · Sky **321** (SNOW — Sky's 1st CA, reaction-
  diffusion `c.snow`, coldest ~3 wks, self-melts — ⚠ warp=61 freezes it ON) · Civic **319** · People **318/317** ·
  Urban **316** (⛔ DISTRICTS' `tick()` vote is a STREAM-PRESERVING VESTIGE — do NOT delete). ✅
  **EXCITABLE-MEDIA CATEGORY COMPLETE** (bloom 263 · shroom 272 · party 314). ➡ **NEXT VECTOR: STEP-BACK #43 DONE
  @330 — guardrail reset, NEXT ~335.** Additive space FULLY SPENT (331). ⇒ **next = a measured seam (225) or
  Deepen/Polish/Interaction in a rotated domain (avoid Sky/Water).** ⚠ **332: seams well-tended, remaining gaps are
  DEEP-BUT-INVISIBLE-AT-ZOOM (short/sparse hosts) — PRICE VISIBILITY (266) BEFORE building.**
  ⚠ **TRANSPORT SATURATED** (304/312/**329**: seams re-grepped clean — ENTINFO all live-computed, head/tail/beacon
  lamps present & night-gated; (bi)/(av) cues = barely-visible bad trade ⇒ ⛔ do NOT force, `polish-tile`).
  ✅ **SPENT/CLOSED — full entries in ledger, laws in SKILL.md; the load-bearing fact is per-domain SATURATION:**
  **NATURE** additive spent (301 deer), Polish paid (294); next = grep the tick()/CA seam (287/279). **URBAN**
  tooltip/flag/TABLE SATURATED (295/302), Interaction/UX ran (133/**327**) ⇒ take no Urban vector without a measured
  seam. **PEOPLE** FULLY ROTATED across kinds (Deepen 14-deep · Polish 300 · Interaction 278 · New CA 324) ⇒ measured
  seam only. **CIVIC** additive COMPLETE (292), Connect measured-sound (285 civic mile — do NOT "fix"), stale = **New
  CA rule (36/107)** — but that just RAN (326), so next Civic = seam/Deepen. **SKY** additive NOT fully spent (291
  lightning, sparsest cell — 3rd ever). **TRANSPORT** all seams dry (304); its two named cues are the 0.5px hairline
  `polish-tile` family ⛔, stale = **New CA rule (77)**. Every animate draw now *verifiably* off the 262 cliff (300 the last).
  ➡ **OPEN cues: (ay)** windrow LENGTH (POLISH ⇒ not Water's next). ✅ **CLOSED (detail archived at 333 / in each
  entry; laws in SKILL.md):** (ba) 327 · (az) 314 · (bh) 317 · (bd) 284 · (au) 302 · (ax)+(bg) 294 · (bf) 299 · **(bj) 333**.
  🔑 **225'S GREP-THE-SEAM LAW IS 26 FOR 26 AT *FINDING*** (**300: the last global-`LITAMT` CLIFF — `drawBuilding`'s
  neon evening crowd stood all night, all-at-once, while the busker in front of it kept an hour; found by grepping
  every entity/People draw for a gate on a global-monotone signal, the tell 262/286 warn of.**) (**288: the FLAG-LIFECYCLE grep — `c.solar`/`c.groof`, the two rooftop-tech CAs the HUD counts and the tooltip names, were written on RES/MID/COM and DRAWN nowhere on a TOWER, so downtown's tallest roofs could never carry them — 285's type-hierarchy blindness, found by grepping the WRITER against the DRAW branch.**) (**287: `SOLARF` — fully drawn, promised on the placard,
  banked as an open question at iter 107 — had NEVER ONCE EXISTED; the FROZEN CENSUS COLUMN found it in ten seconds,
  while Nature's banked cue was a fairy-ring contrast nudge.**) (**285: the MARKET kept no hours and no day, because
  `CIVHRS` keys on `c.kind` and a MARKET is a TILE TYPE — the hours ladder could not NAME it. 240 gave the STADIUM
  a fixture and wrote 271's enumerate-the-CATEGORY law down while doing it; the market is its sibling on the SAME
  LINE of `syncFleet` and was never enumerated.**)
  (283 a spontaneous contagion that had converted 94% of its host ⇒ "Boulevard" was the DEFAULT developed street
  (333/city vs 29 Avenues) and 171's label ladder named a distinction that did not exist · 282 a `tick()` pass that
  fires on TICK 1 then converts NOTHING for 812 ticks, its own tooltip writing the silence down as design · 281 a flag whose WRITER skipped a type its VETO still counted · 280 a comment enumerating
  its own category · 278 a comment conceding the defect while justifying a workaround · 277 the census's scalars vs the placard · 267 a rule that had NEVER RUN · 268 a seabed built from the wrong noise · 269 a tram at 1.04x on its named avenue · 271 nine surfers who never went home · 272 an autumn CA that blinked the whole wood as ONE · 274 a new feature that never told the TYPE-KEYED TABLES it existed · 276 the BUS, which could not see the stop network it exists to serve) — **AND 270 IS THE FIRST DEFECT IT COULD NOT *FIX*** (structurally unbuildable on one hex). ⇒ **An empty cue list — or a passing probe — records where you have LOOKED, not what is THERE; and a found defect is not a fixable one: PRICE THE FIX BEFORE YOU PROMISE IT.** ⚠ **Grep `tick()`, the TABLES (`BEDT`/`CIVHRS`/`TILEDESC`/`valueSrc`/`VKIND`) AND THE COMMENTS — never the cue list.**
  🔑 **282/287: A FROZEN CENSUS COLUMN IS A SEAM — READ IT FIRST.** A tile flat across the eras is terrain or a DEAD RULE (check which); **a ZERO row is LOUDER than a flat one** (287 `SOLARF`, flat 0 in all 9 cells for 180 laps). ✅ **SOLARF + MARSH CLOSED** (289: MARSH is terrain — draw answers tide+season; detail in the 282 block).
  🔑 **281: AND NOW GREP THE *FLAG LIFECYCLE*, THE FOURTH SEAM** (law in SKILL.md). ⚠ **For every per-cell flag
  (`corner`/`loft`/`solar`/`groof`/`hstr`/`bridge`/`riv`), grep the passes that UPGRADE its host: does the flag RIDE the
  change or DIE with it? — and do the WRITER, DRAW, TOOLTIP and VETO agree on which types own it?** The tell, in one
  grep: **your flag's WRITER skips a type its VETO still counts.** *A flag that draws nothing and still vetoes is worse
  than no flag.*
  ✅ **STANDING STEP-BACK FACTS (last 3 clean: #41/#42/#43 @320/325/330 — NO DRIFT):** golden keeps the greens'
  identity ~8°/10° vs HEAD's 23°/24° (`probe-goldenhue` PASS ⇒ monochrome cue CLOSED, 265 holds); night ordering
  `*TOWER *MID *COM > BEACH` clears by ~19 (222/251); the faint day-sea hex quilt is CAPPED-not-new (255/257/268);
  perm draw arc ~**+0.015%/lap** (byte-flat FIXES cancel the additive tendency). ⚠ **PRICE THE ARC IN PATH OBJECTS,
  NOT ms** (perfab is load noise), **and CLEAR `c.snow`** (any season-persistent CA field) first — `__warp(61)` freezes
  the world snowy and `__setYear` won't melt it, so every warp probe over-attributes 321's seasonal draw to the perm
  arc (law in SKILL.md). ⚠ Blind A/B NON-ORDINAL + CROSSED (268). ⚠ **TOOL NITS in `shot-stepback` (banked, not fixed):**
  per-frame `GWARM=0` self-report is a stale caption (pixels ARE warm; agents + `probe-goldenhue` agree) — do NOT read
  as "golden unwarmed"; `HUD=STALE` on golden/dusk = `phaseWord`-vs-`clockWord` mismatch, not a stale DOM.
  ⛔ **255: DO NOT PAINT A *PER-HEX* SIGNAL INTO THE WATER'S BODY COLOUR.** A field **sampled per hex and rendered as a
  flat hexagonal FILL terraces onto the LATTICE**: SUBTLE (**d=0.57** ⇒ both blind agents saw **nothing**) or BRIGHT
  (**d=1.15** ⇒ *"a high-contrast hex QUILT... not a sea"*), **no middle**. The glitter escapes ONLY as a **low-alpha
  overlay** (max 0.16). ⚠ **257 NARROWED IT: the MECHANISM is PER-HEX SAMPLING**, so a term with **no `x`/`y`** cannot
  terrace. ⚠ **266 IS THE WAY THROUGH IT: a SHAPE that runs ALONG the tiling — sub-hex WIDTH, multi-hex LENGTH.**
  ⚠ **THE SEA'S OWN GRAIN IS THE NOISE FLOOR**: `seaT[]` is depth-in-eighths **+ two `hashCell` octaves** ⇒ within-sea
  luminance **SD 22.3**, which a blind agent on *pristine HEAD* called a honeycomb over *"90–100% of the open water."*
  ⚠ **Read the `peds` cap first** (111) before designing anything road-borne.
  ⛔ **254: THE BUILDING COLOUR CHANNEL IS SPENT — DO NOT RE-TRY *ANY* "THE BUILDINGS SHOULD SHOW X REGIONALLY" IN
  COLOUR** (age, value, density, flow — anything). **Body archived at 271; law in SKILL.md.** ✅ **THE HOST IS NOW PARTLY
  READ (309): the MID walk-up water tank rides `c.age`** (`TANKAGE=160`≈12yr) — the first pixel on a developed building
  to read age; tanks accrue as districts stand and settle onto the old core (`probe-tankage`). **Still only a
  SHAPE/ORNAMENT/COUNT may show age — NEVER a hue** (254). RES/COM/TOWER carry no age ornament yet; `probe-buildingage`
  remains the host proof.
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
  **288 (law in SKILL.md — 285's type-hierarchy blindness; numbers in the entry):** 🔴 **THE TOWER CAN NOW WEAR ROOFTOP TECH — IT NEVER COULD** (`c.solar`/`c.groof` written on RES/MID/COM, DRAWN nowhere on a TOWER; COM→TOWER saturates by 1996, 14 yrs before solar starts). Both writers now include `T.TOWER`; drawn on the flat deck at `h` **BEFORE the crown** so the penthouse/spire rises through it, mast/helipad above. ⚠ **WHOLLY INERT** — flag draws nothing `rng()`-gated, hashCell time-salted ⇒ census core **BYTE-IDENTICAL**; solarRoofs +258 / greenRoofs +125 (now counted honestly). ⚠ **THE GHOST WAS ONLY ~1%** (the upgrade saturates before adoption starts) — **not** 281's 92%. ⚠ **THE CONTAGION IS REAL — DO NOT "FIX" IT** (`probe-roofspread`: solar 2.22x its own scattered null, green 4.63x; 283's dead boulevard was 1.34x). ⚠ **THE RESIDUAL 0.3% CIVIC/IND GHOST IS DELIBERATELY UNTOUCHED** (scope; those writers still omit them).
  **287 (law in SKILL.md; numbers in the entry — IMPERATIVES ONLY):** 🔴 **THE SOLAR FIELD NOW EXISTS — `SOLARF` was 0 on every seed/era for 180 laps** (drawn + labelled + `valueSrc`, promised on the placard, banked open at 107). ⚠ **THE BUG WAS THE *SPACE*, NOT THE POOL** — an `rc()` lottery expects ~0 conversions in the whole 2012–2035 window; the vineyard/orchard did NOT starve it. **A solar farm is an ARRAY ⇒ the pass scores every far field, prefers one on its own fence line, converts ONE/tick on a TICKN-salted `hashCell` (zero `rng()`).** ⚠ **`SOLARMAX=8` IS THE KNEE; `SOLARP=0.08` IS NOT TUNED** (0.04 reaches the same size — 218). ⚠ **THE SIZE IS WHAT THE COUNTRYSIDE ALLOWS** (seed 42 builds 3). ✅ **THE PANELS COST NOTHING** — `SOLARMAX=0` reproduces the patch BYTE-FOR-BYTE on 10 seeds; the census `pop −2.3%` was **100% the deleted lottery's `rng()` draws.** ⇒ ⛔ **ITER 32'S "−4% POP" IS REPEALED — DO NOT CITE.** ⚠ **`SOLARF` NOT in `RAISEABLE`** ⇒ a 2035-graded sweep is a LEAK (231). ⚠ **VISIBILITY IS THE VINEYARD'S** (226: 779 px/hex).
  **286 (law in SKILL.md; numbers in the entry):** 🔴 **THE KAYAKERS KEPT NO HOUR AND NO CALENDAR** (`drawKayak` had **NO GATE**; `DISTINCT = 1`, 9 of 9 on the river at 4am in midwinter, 6 seeds) **AND THE KITES KEPT THE WRONG KIND** (`LITAMT>0.6` — a GLOBAL MONOTONE gate ⇒ all 3 blink out in ONE frame; `DISTINCT = 2`). **`waterSession()` / `waterOut(e)` — ONE predicate, FOUR readers** (drawSurfer · drawKayak · both tooltips). ⚠ **RENAMED from `surfSession`/`surfOut` ON PURPOSE — a predicate called `surf` is one the next lap greps and MISSES the kayak (199); `probes/probe-surfsession.mjs`'s build-detector was repointed in the same lap, or it would have graded the patch as HEAD and cried a FALSE regression on the surfers.** ⚠ **THE PADDLERS TAKE THE EXISTING PREDICATE — no new constant; the water crowd answers ONE season** (249). ⚠ **THE KITE'S HOUR IS FROM THE LADDER**: a kite must be SEEN by the person on the line ⇒ **KITE = KID (~0.35) < SURF = KAYAK = JOG (0.62) < CURF (1.85)**. ⚠ **ZERO NEW RANDOM DRAWS** (`ph/7` on the uniforms both already carry) ⇒ every control (surfer/jogger/dog/ped) reads **IDENTICAL, not merely close**; census core **+0**, path objects **−36 night (a credit)**, day **byte-identical (md5-proven)**. ⛔ **THE STRAY DOG IS A FALSE POSITIVE — DO NOT "FIX" IT** (205): `drawDog` hides only through the owner, so a stray (`own=-1`, 2–5/city) never goes in — **and it has no home to go to.** ⚠ **RIG LAW: `addInitScript` FIXES THE PRNG *FUNCTION*, NOT ITS STREAM POSITION** — a second `genWorld()` respawns every `Math.random` entity ELSEWHERE, so an aim pass and a shot pass build DIFFERENT cities and the camera aims at a boat that no longer exists (two builds then render an identical empty crop, and an agent's `md5` caught it). **RE-SEED IN-PAGE BEFORE EVERY `genWorld`** (248).
  **285 (law in SKILL.md; numbers in the entry):** 🔴 **THE MARKET NOW KEEPS A DAY AND AN HOUR — IT NEVER HAD** (`DISTINCT STALL COUNTS = 1`, 6 seeds; stalls up **100%** of hours; lights on **80/80** night hours). **`marketHours`/`marketAmt`/`marketWord`(x,y) — ONE predicate, FOUR readers** (stalls · lights · tooltip · `residentWhere`), in `fixtureAt`/`matchClock`'s idiom and beside it. ⚠ **A MARKET IS A TIMETABLE ⇒ CORRECT ON `dayT`, NOT the warped `SUNT`** (284). ⚠ **SALTED PER HEX AS WELL AS PER DAY, ON PURPOSE — do NOT collapse it to one city-wide market day** (the population would blink as one; 263). ⚠ **THE STRING LIGHTS ARE WHAT THE EVENING MARKET IS FOR** (`MKTEVE=0.28`, 0.62→0.92, so `SUNDN` falls mid-market); **a MORNING market (0.10→0.52) is never lit, and that is CORRECT.** ⚠ **WHOLLY INERT** (zero `rng()`/`Math.random`, no terrain, **unreachable from `tick()`**) ⇒ census core BYTE-IDENTICAL; path objects **−0.47% day / −0.18% night** (a credit). ⚠ **AT `marketAmt===1` THE PATCH IS BYTE-IDENTICAL TO HEAD** — an exact fixed point, so a HEAD/patch A/B at the OPEN pin is *supposed* to read 0 px. **ONLY THE SHUT PIN DISCRIMINATES.** ⇒ ✅ **CUE (bf) — THE PACKED-AWAY SQUARE READ A TOUCH BALD — CLOSED BY 299** (permanent stone market cross + folded trestles + crates + chalk bays).
  **284 (law in SKILL.md; numbers in the entry):** 🔴 **`SUNT` HAD TWO READERS LEFT ON THE WALL CLOCK — `phaseWord` AND `fogDepth`'s DAWN TERM.** ⚠ **BOTH WARP THEIR OWN CLOCK (`sunWarp(dayT)`), NOT the cached `SUNT` — `syncStats()` runs BEFORE `render()` and again on `genWorld`, where `SUNT` is STALE or 0.** Read the cache ONLY in a per-hex draw. ⚠ **THE TEST FOR A NEW READER: does it ask about the SUN, or about the HOUR?** The moon, `clockWord`, the school run and the stadium fixture are **TIMETABLES — correct on `dayT`, DO NOT MOVE THEM** (`sunWarp`'s reader list is a **changelog, not a spec** — 280). ⛔ **THE SEA GLITTER IS NOT A DEFECT — DO NOT RE-KEY IT:** `glit`'s `(1-LITAMT)` **already carries the season** ⇒ `AFTERSET=0`, cutoff already moves 0.440→0.550. ⚠ **`gs` (`drawBuilding`'s sun-facing face) IS AUDITED AND PROVABLY INERT** (`GWARM=0` across 0.415–0.5) — **left as-is on purpose, do not "fix".** ⚠ **WHOLLY INERT**: neither fn is reachable from `tick()` ⇒ census core **BYTE-IDENTICAL**, path objects −91d/−1n. ⚠ **`fogDepth`'s seeded `spell` SATURATES `FOGAMT` at 1.0** ⇒ **any fog probe/camera MUST pin `time` so `sin(time*0.028+(seedNum%97)*0.7) = −1`** (⚠ `ph` reaches 67.2 — wind forward by whole periods or `time` goes NEGATIVE).
  **283:** 🔴 **THE BOULEVARD NOW *IS* ONE — IT NEVER WAS** (HEAD: **93.9% of every busy street treed**; `Boulevard` 333/city vs `Avenue` **29**; contagion **1.34x its own null**; only **15% of the canopy on a trunk route**. Full numbers in the 283 entry.) **`blvdSpark(c)` — ONE predicate: the grandest built-up trunk (`c.busy && c.flow>=ARTFLOW*BLVDGRAND`, `BLVDGRAND=2`).** ⚠ **THE SUBSTRATE IS THE BARE TRUNK AND MUST STAY SO** — a frontage gate on top SHATTERS it (biggest run **36 → 8 hexes**; 282's percolation law). **A SPARK is ONE cell so it MAY demand frontage; the SPREAD may not.** ⚠ **`BLVDGRAND=2` IS WORST-SEED GATED** (3 starves seed 99; a Poisson coin left it with **ONE tree** — 233). ⚠ **THE RATE IS HEAD'S OWN 0.002 — only the PREDICATE steers a saturated roll (218); do not tune it.** ⚠ **WHOLLY INERT** (zero `rng()`, writes only `c.treed`) ⇒ census core **BYTE-IDENTICAL**; path objects **−2.0% day**. ⚠ **`c.flow`/`c.busy` ARE LAST TICK'S** — the artifact's own idiom; do not "fix". ⚠ **A NON-TREED ROAD STILL DRAWS A SCATTERED STREET TREE** (`(x*3+y)%4===0`) so de-treeing does NOT bald a street — **and that fallback CONTAMINATES any `c.treed=false` suppression mask on 25% of hexes; suppress only the other 75%.** ⛔ **DO NOT RE-SHOOT AS AN A/B: THE VISUAL GATE CANNOT GRADE A REDISTRIBUTION** (law in SKILL.md) — at fit zoom a tree is ~3px and **HEAD's canopy is equally invisible**. Gate on `probes/probe-blvdnet.mjs` + the tooltip. ✅ **171's `probe-boulevard.mjs` HAD BEEN FAILING ON PRISTINE HEAD** (`describeTile` **preempts on `c.fete`**); **repaired, and given the `SRC=` it never had.** 🔑 **ITS CONTROL WAS THE FINDING: `Avenue` read 33 on HEAD seed 7 against a target of 327.**
  **282:** 🔴 **THE KELP CA NOW RUNS — IT NEVER HAD** (HEAD: bed stamped on TICK 1, `DISTINCT BED SIZES = 1`, turnover **0**, 6 seeds × 813 ticks). **`kelpLight(i)=1−rDeep[i]/KELPLIT`, `KELPLIT=SHELF1+1` — the KELP is the THIRD reader of the shelf band** (with the tooltip and the wind farm). ⚠ **`KELPP=0.62` IS HEAD'S OWN CONSTANT AND IS *PERCOLATION*, NOT DENSITY — DO NOT TUNE IT DOWN** (at 0.30 the substrate breaks into islands, the bed never leaves the sand and HALVES; law in SKILL.md). ⚠ **THE SCOUR MUST BITE IN THE INTERIOR** (`1−0.6*shel`, never `1−shel`) — with shelter fully protecting, a deep cell once surrounded is immortal and the bed fills its whole pool, which is **a third of the ocean** (`probe-kelppool`). ⚠ **THE BED IS NEVER LARGER THAN HEAD'S ON ANY SEED** (worst **34** vs 36; mean 16.0 vs 17.7) — *that* is what keeps the coast from darkening, and it is the ONE number to re-check after any kelp change. ⚠ **WHOLLY INERT**: zero `rng()` (TICKN-salted), and **WATER and KELP are BOTH in `WETSET`** ⇒ `pop`/`dev`/`roads` come back **BYTE-IDENTICAL** to HEAD on 6 seeds; census core **+0**, only KELP↔WATER swap (−15/+15). ⛔ **DO NOT BUILD "THE KELP ANSWERS THE CITY"** (runoff/turbidity): `dist(kelp→DEV/ROAD)` is **4.44–5.73 hexes and BYTE-IDENTICAL at 1985 and 2035 on every seed** — the city never comes ONE hex closer in fifty years. The field is a CONSTANT (`probe-kelphost`). ✅ **MARSH AUDITED 289 — terrain, its draw answers tide+season, NOT a dead rule.**
  **281 (re-compressed 282):** 🔴 **`c.corner` IS A PROPERTY OF A *HOME*, NOT A *HOUSE* — `HOMES`={RES,MID}, ONE
  predicate, FOUR readers** (pass · veto · draw · tooltip). ⚠ **THE STORE RIDES THE BUILDING UP**; a **DEMOLISHED** home
  **clears** its flag — that clear kills the ghost veto, **do not drop it.** ⚠ **THE MID SHOPFRONT READS `midLook`'s
  PUBLISHED BODY** — never the RES body's hard-coded `0.30/0.26`; **`ph` IS LIFTED TO 5.2 ON A CORNER MID** (do not
  "tidy" away). ⚠ **STILL INERT** (census **+0**). ⚠ **The MID pool is 5.0/city vs 413 MID ⇒ CANNOT flood — no rate.**
  ⚠ **`drawBuilding`'s FIRST LINE is `const ML=c.t===T.MID?…`, ABOVE the RES branch** ⇒ a source-matching build detector
  must split on **`else if(c.t===T.MID)`**, or it reports HEAD as patched (it did: an exact TRANSPOSE).
  **280–277 (re-compressed at 283; FULL TEXT in `GROWTH-archive.md`, "rotated out at 283" — IMPERATIVES ONLY):**
  **280:** **`windForce()`/`windDrift()`/`kiteGust()` — the sky's gust as THREE predicates**; `windDrift()`=`0.55+0.9*WINDA`
  (the clouds'/balloons' own, do not fork). **Every `drawKite` lever is a MULTIPLE of `kiteGust()`=1.0 at full gale=HEAD's
  literals** (exact fixed point; `window.kiteGust=()=>1` renders HEAD in-page, do not "simplify"). ✅ **`__setWind(v)`/`__wind()`
  — the hook `WINDA` never had** (no `?wind=`). ⚠ **A KITE runs FOUR frequencies** (a one-period "null step" is NOT null).
  ⚠ **`px()` returns *WORLD* coords** (scoring ink at `px()*dpr` returns a plausible **ZERO** — 273).
  **279 (compressed 287 — full text in the archive):** 🔴 **THE WILDFIRE CA NOW RUNS.** `FIRESPK`/`TIMBSPK` **WALK `HEXI`**
  on a TICKN-salted hash (zero `rng()`, do NOT tidy onto `rc()`); **it WRITES TERRAIN ⇒ expect the cascade.** ⚠ **NOTHING
  BURNS AT 2035** (`year<2030`) ⇒ a `?warp=61` frame can NEVER show one; `shot-firespark.mjs` drives `tick()` to a live
  episode (`tick()` does NOT advance `year` — `__warp` does). ⚠ **`drawFire`/BONFIRE TAKE A RAW LITERAL, NOT `col()`** (280).
  ⇒ **CUE (bb) → `POLISH.md` (g2)**; 🆕 **CUE (bc) — THE FIRE'S GLOW IS EATEN BY LATER ROWS** (266: a mark that must light
  its neighbours trails back over cells ALREADY PAINTED).
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
  **276–259 (re-compressed at 285; FULL TEXT in `GROWTH-archive.md`, "rotated out at 285" — IMPERATIVES ONLY):**
  **276:** **`busNext(v)` — ONE predicate, 3 readers.** ⚠ **THE ROAD GRAPH IS *ONE* CONNECTED COMPONENT (6/6 seeds)** — that
  LICENSES a **rail** where 269 could only have a **preference**. ⚠ **`roadField` IS THE HOUSE ROUTER**; **`c.blast` IS THE
  SCHEDULE** (a headway rule needing no new constant); `busNext` runs **on HEX ENTRY, never per frame**. ⚠ **`Math.random` only
  ⇒ seeded `rng()` untouched, core +0 — but it SHIFTS the shared stream ⇒ aggregate any control** (204).
  **275:** **`wrowHalf(t)`; `WROWN` normalises its MEAN to 1, SUMMED OVER THE POLYGON, NOT THE CURVE.** ⚠ **DO NOT RAISE
  `WROWSEG`.** ⚠ **`WINDA` IS A THIRD CLOCK; `playing=false` DOES NOT STOP IT — pin with `__setWind`** (280). ⚠ **`colA()` PUTS
  THE PALETTE THROUGH THE ILLUMINANT ⇒ a signature match on the `BASE` literal NEVER FIRES.** ⚠ **THERE IS NO `setZoom`** — the
  contract is `zoom=n; scale=fitScale*zoom`.
  **274:** **`windarkAt(c)` TAKES THE CELL, NOT THE TYPE — `bedOf(c)`, ONE predicate, 3 readers**; a **loft gets `BEDT[T.MID]`**
  (from the ladder, not invented — 226). ⚠ **NEVER re-key to a `BEDT[T.IND]` ROW** (it beds the shed's night-shift clerestory,
  173). ⚠ **`winBandR` IS BYTE-FOR-BYTE `bandR` below `LITAMT<0.35`** ⇒ a free dead-regime control (199). ⚠ **`__setTime(t)` ONLY
  ASSIGNS `dayT`; `SUNT`/`LITAMT` are recomputed once a frame INSIDE `render()`** (261) ⇒ derive `SUNT=sunWarp(t);
  daylight(SUNT).lit`.
  **272:** **`shroomDue(c,s2)`; reuses `isWood`.** ⚠ **ONE TICK = 0.075 yr ⇒ THE WHOLE AUTUMN IS ~2.9 TICKS — check BEFORE
  designing any cadence.** ⚠ **`(year|0)` IN A HASH SALT IS CONSTANT ALL SEASON.** ⚠ **BOTH UNIFORMS ARE ALREADY ON `c.v`** ⇒
  zero `rng()`. ⚠ **THE DRAW'S FADE SATURATES ⇒ do not gate the cadence visually.** ⚠ **`render()` MUTATES THE WORLD**
  (`drawBuilding` grows `c.h`) ⇒ **SETTLE THE HEIGHTS before any two-render diff** (`for(const c of cells) if(c.h<c.th)
  c.h=c.th;`) — `__warp` hides it; driving `tick()` does not.
  **269:** **`isAvenue`, 3 readers.** ⚠ **`AVESPAWN`/`AVESTAY` are PREFERENCES, NEVER rails** (20% dead ends ⇒ a confined tram
  **strands**); **at its CEILING.** ⚠ **`c.flow` peaks at the CORE ⇒ the avenue SELECTS FOR ITS OWN BURIAL** — judge on the
  AGGREGATE, **never aim a camera by it** (283 framed the CBD doing exactly this). **268:** **`seaOct`, smoothstep-INTERPOLATED.**
  ⚠ **NEVER "simplify" back to `hashCell(x>>sh,…)`** (a downsampled hash is **blocky white noise**, a different field).
  ⚠ **`seaT` is COLOUR-ONLY + BUILD-TIME.** ⚠ **THE ONE-TONE TERRACE IS STRUCTURAL — do NOT re-open the sea's body colour**
  (255/257). ⚠ **Use `probe-seaquilt`, NOT `probe-seastep`.**
  **267:** **`c.loft`, 3 readers.** ⚠ **`blockValue(x,y)` = mean `c.val` over the SIX NEIGHBOURS — use it for any "has the city
  arrived here?" question, NEVER a lot's OWN `c.val`.** ⚠ **`LOFTVAL=0.5` is the artifact's own neutral; `WORKSMIN=1` is
  LOAD-BEARING; the pass WALKS `HEXI`, no `rng()`.** **266:** ⚠ **A WINDROW TRAILS UPWIND — a Z-ORDER decision, not a look.**
  ⚠ **`probe-seaamp` CANNOT GRADE IT** (area-means the ocean; a row paints 2%). **263:** **`bloomHost` = MEADOW + SHOREPARK; the
  bloom CA draws NO `rng()` ⇒ wholly inert.** ⚠ **`TICKN` IS PART OF THE WORLD — reset in `genWorld`.** ⚠ **DUNE/PARK REJECTED as
  hosts; the refractory jitter is LOAD-BEARING.** **262:** **LADDER OF HOURS: `KID` 0.34 < `SURF`=`JOG` 0.62 < `CURF` 1.85 — take
  a new entity's hour from it** (226). **261:** **`SUNT` IS THE LIGHT CURVE'S CLOCK, NOT `dayT` — one predicate (`sunWarp`), SIX
  readers.** ⚠ **`syncSky` warps its OWN clock on purpose.** ⚠ **`SUNUP`/`SUNDN` ARE THRESHOLDS ON `SUNT`, NOT `dayT`.**
  **259:** ⚠ **`siteDark` is a PREFERENCE — do NOT "tidy" its 90-try scatter; a TIE-BREAK must NEVER share a salt with a reader of
  the cell it picks.** ⚠ **`__warp(a)` then `__warp(b)` IS NOT `__warp(a+b)`** — two hops build a DIFFERENT city.
  **258–236 (bodies archived at 276; IMPERATIVES ONLY):** ⚠ **THE CAB'S ROOF LAMP IS A FOR-HIRE SIGN — do not re-key it to
  darkness.** ⚠ **`livelyKerb` SELECTS FOR ITS OWN BURIAL** ⇒ **aim by argmax-over-TIME/INK, never at the first instance.**
  ⚠ **`GWST` (overhead sky) and `GWSB` (horizon) ARE NOT INTERCHANGEABLE** — the sea's body mirrors `GWST`. ⚠ **`f.sp` KEEPS ITS
  SIGN** (the ferry's THROTTLE goes to zero, never the velocity). ⚠ **NOT cue (o): the PIER has a waterfront, the HARBOUR does
  not.** ⚠ **MARSH/KELP no longer catch cloud shade** (`WETSET`); **`cl.rain` IS GONE ⇒ `cloudWet(cl)`.** **`RAILCAP=130`** ·
  **`seaState()`, floor `SEACALM`** · **`concertSeason()`**. ⚠ **244: TURNING THE AMPHITHEATER'S BOWL WAS BUILT AND REVERTED —
  DO NOT RE-TRY** (the projection cannot carry it). ⚠ **230's `taxi` flag is LOAD-BEARING** (`VCURF` thins the night fleet by CLASS).
  ✅ **CLOSED LADDERS — DO NOT RE-OPEN** (roster archived at 268; laws in SKILL.md): the **WASH** ladder · the **TOWER LOOK** · the
  **SKYLINE** ladder · the **HUD** lap · **137's standing crowd** · the **SEASONAL-VEGETATION** seam. ⚠ **The CLOSED/RETIRED cue
  roster — (w)(z)(t)(u)(ab)(af′)(ag)(ah)(al)(am)(an)(aq)(s)(ap) — was archived at 268**; half-closed: **(ao)'s SHAFT half CLOSED
  248, its BOW half REFRAMED.** ⛔ **ALSO RETIRED:** **(ai)** greenbelt (246 — the ROADS fragment every lobe) · **(aj)** cloud
  spawn (273 — `cl.y` is a DEAD LEVER) · **(y)** mojibake (273) · **(ak)** canopy (238+252 — measured-capped) · **GARDEN's
  staggered beds** (263 — host starved).
  ⚠ **SETTLED AUDITS — LIVE WARNINGS ONLY (bodies archived at 242/283/285).** **225:** `shadS` (every shadow routes through it)
  carries a per-frame sun vector (`SHOFF`·`SHLEN`·`SHAMT`). ⚠ **Noon (t=0.415) is BYTE-IDENTICAL ⇒ a free dead-regime control for
  every shadow lap.** ⚠ **`SHAMT` must never reach 0 at night** — the residual patch keeps every ped, tree and car from FLOATING.
  **226/278:** ⚠ **`census.mjs` DOES NOT FREEZE THE CLOCK** ⇒ tick-sensitive metrics (`solarRoofs`) **wobble ±2**; core unaffected.
  **Re-run the SAME FILE, not HEAD — and for a draw/DOM-only diff, LEAVE THE FRAME LOOP entirely** (278; law in SKILL.md).
  **231: THREE PREDICATES, DON'T MIX THEM.** `openFront`/`frontLoad` count **TALLT MEMBERSHIP** — wrong for anything drawn flat.
  **`groundLoad(x,y)` is the ground-level one**: sums drawn **HEIGHT**, reads **`c.th` never `c.h`**, counts a `RAISEABLE` lot at
  `FUTUREH` — **an empty lot is a building that has not been built yet.** ⚠ **Aim a CAMERA by measured ink, never by any of the
  three (226), nor by a position (271: it framed the pier), nor by a superlative made of DENSITY (269/283: it frames a wall).**
  **213:** `nightDeep()` is **pinned at 1 all day** (a trap for any NON-draw reader); the civic night-light audit is **DONE** —
  three lights are off the curve on purpose (school janitor, hall clock face, parliament lantern), **do not "fix" them.**
  **211/210:** `frontLoad`/`openFront` ship as **PREFERENCES, NEVER GATES (206)**; **`LITAMT` returns to 0.64 by the small hours**
  ⇒ any gate `LITAMT > 0.64` defines a "night" that **ENDS BEFORE DAWN**. **137's "the ped/dog system is NON-REPRODUCIBLE" is
  DISPROVEN** ⇒ **People is probe-able like any domain**. **209:** the **GROUND PLANE is SPENT** (216 spent the FACADES); paid out
  again at **253/261 (the LIGHT)** and **268 (the SEABED)**. **206:** the vacant lot is a **MIRAGE** (`EMPTY` with ≥2 RES nbrs
  falls **85 → 6.5** by 2035) — development eats every gap, **and it eats CA HOSTS too: anything in `RAISEABLE` will be built
  over** (263). ✅ **"THE FIRE CA IS A GHOST" IS REPEALED (279)** — it runs, spreads and leaves BURNT; but it is **YEAR-GATED, so
  NOTHING burns at 2035.**
  **⚠ THE `polish-tile` BACKLOG LIVES IN `.claude/skills/polish-tile/POLISH.md` (moved 275)** — TILE REDESIGNS this loop is
  FORBIDDEN to spend a lap on: (a) the elevated transit (**13x reported**, the ledger's most-reported defect) · (e) the
  observatory · (f) the wildflowers · (g) the capitol · (b)/(c)/(d). ⚠ **`polish-tile` IS BADLY OVERDUE.**
  **Sky is post-saturation (Deepen/Fix ONLY — its additive/CA cells are traps).** **Urban's LOOK is SPENT FIVE WAYS**: additive (118) · Connect measured-hard twice (160/165 — no straight-hex run ≥3, so no arcade host) · roof-furniture · GROUND PLANE (209) · FACADES (216) · COLOUR (254). The **harbour apron** is the last named look-remnant (cue **(o)**: a port vector must **build the waterfront FIRST**). ⚠ **BUT "URBAN IS SPENT" HAS NOW BEEN REFUTED FIVE TIMES, EVERY TIME FROM ITS *RULES*, NEVER ITS LOOK** — silhouette (232/237, closed 235/239) · **267** a conversion that had NEVER FIRED · **274** a feature that never told the **TYPE-KEYED TABLES** it existed (`BEDT`/`CIVHRS`/`TILELABEL`/`TILEDESC`/`valueSrc` — a per-cell **FLAG** is invisible to every one of them) · **281** a flag ORPHANED by its host's upgrade (92% ghosts, still vetoing) · **288** the two rooftop-tech CAs the TOWER draw branch could never reach (285's type-hierarchy blindness). ⇒ **Grep `tick()` and the FLAGS, never `drawBuilding`.** Live Urban cue: **(au)** (the loft's rooftop studio). (**Sky's moon is FIXED (135) and NAMED (144)**, both closed.
  ⚠ **SKY's additive/CA cells are TRAPS** (sky is not cellular; fog on terrain is already `rSea`/`fogAt`). **STILL banked for Sky:
  the SEASON word** — it reads the fast `year` and would strobe ~0.7 Hz (134), so it needs a **slow clock FIRST**; don't add
  `seasonWord(year)` to the HUD nor re-ship 134's REVERTED almanac (⚠ **236's front is ALSO on `year` and is NOT that slow
  clock**). **Cue (k) CLOSED (116/123)**; still steers: **run the tell FORWARDS** (string and rule share ONE constant — 123;
  213's `civOpen()`). **⚠ A tick-rule cannot read the reach maps (151):** `recount()` never runs in the sim loop, so
  `rGreen`/`rShop`/`rServ` are STALE inside `tick()` — recompute locally.
  ⇒ **"Additive inventory spent" is a claim about a domain's ENTITIES, not its SURFACES** (127 put picnics on PARK's 878 hexes),
  **and a Deepen that adds no element is the documented way past additive saturation** (126). **124 closed the LAST banked cue
  that moved a census number; the census is VACUOUS for most vectors — reach for a probe.** Three laws govern step 1: **a cue is
  a POINTER, NOT A SPEC** (re-grep the seam before designing to it); **a banked, measured finding outranks kind-rotation and
  cell-emptiness** (119); **saturation beats kind-rotation** — when a domain's additive cell is spent, the KIND changes, not the
  domain (118).
  **THE FAIL/ASIDE LAW (212; law in SKILL.md, tally archived at 268): FAILs are where an agent is WRONG, ASIDES where it is
  RIGHT.** Paid 13x; ⚠ **237/252/255/268 INVERTED IT** (the headline FAIL was RIGHT, the banked probe had ACQUITTED the defect).
  ⚠ **269/283/285: A FAIL CAN BE *TRUE* AND STILL NOT BE *YOURS*, OR BE ABOUT YOUR *CAMERA*** — grade it by MEASURING, then ask
  **whose** it is (285's FAIL named a real thing and it was the CROP: a ~30px subject in a 1400×900 frame — **clip tightly**,
  204). ⇒ **When agents say "I CANNOT SEE IT" the burden is on your PROBE** (they alone measure *salience*). ⇒ **262: read WHICH
  FILE a FAIL names.** Weight an aside two agents reach independently above any verdict.
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
  **(ay) THE WINDROWS ARE LEGIBLE WHERE *LONG*, INVISIBLE WHERE SHORT** (275; 266's law cashed): traceability is
  **LENGTH**, the one dimension a hexagon cannot quantize — the taper is SEEN only on long rows (seed 42's agent named it
  unprompted; seed 7's could not tell the builds apart on a short-row crop ⇒ *salience*, not absence). ➡ Lever = the
  **row-length distribution** (`L = min(want, run−0.5)` is truncated by open sea upwind ⇒ coastal rows are stubs).
  **Measure the histogram first** (`probes/probe-windrow.mjs`). ⚠ **NOT brightness or width — do not reach for alpha.**
  ⚠ **A *POLISH* cue, and Water's next lap must not be Polish** — bank it, take the seam. · **(aw-HUD) UNVERIFIED — a 269 agent read the controls card as clipping *"TRANSIT REA…"* at 1400x900.** ⚠ **229'S LAW: `probe-hud` swept 6 widths and found 0 clipped labels ⇒ SUSPECT THE HARNESS** ((ar)'s shape a 4th time). Reproduce in a real browser before spending a lap.
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

> **Archive:** the 326 entries before Iteration 324 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

## Iteration 324 — the busy park corners wore down to bare earth (2026-07-17) [People & activity × New CA rule]

**Vector.** Rotation's `NEXT` was **Civic or People × New CA rule** — the two stale ADDITIVE cells, by far the most
recency-neglected (Civic last CA 107, People last CA **49**). People was the balance pick (single most-neglected
cell in the grid) and its ONLY stale kind. But iter 49 (block parties) was **excitable media**, a category the header
marks **COMPLETE** (bloom 263 · shroom 272 · party 314) — so a People CA had to be a *different* mechanism. The natural
fit, and one the engine had never run: a **diffusion/accumulation field**. Desire paths — the busiest public green
wears to bare earth where people gather, the quiet interior stays lush. It reads the `c.buzz` ATTRACT field (iter 104)
the city already derives, so the worn ground lands exactly where a crowd belongs (the shopfront/plaza/civic edge) and
never in the empty middle of a lawn.

**Change (a diffusion CA + a contained ground draw — wholly census-inert).** New field `c.wear` on `WEARLAND =
{PARK, SHOREPARK, GARDEN}`:
- **The CA** (`tick()`, right after the `c.buzz` pass that feeds it, before the snow pass): each WEARLAND hex relaxes
  its wear toward a target `min(1, c.buzz/WEARBUZZ=3)` (a lively kerb, `buzz>=KERBBUZZ=2`, wears; a quiet interior,
  `buzz 0`, does not) plus a **diffusion term** (`WEARDIFF=0.09`, joins the worn ground of busy neighbours into paths
  rather than isolated patches). Slow onset (`WEARLERP=0.04`) ⇒ a well-used commons wears in over the decades and
  greens back when the buzz falls. Non-WEARLAND hexes are zeroed.
- **The draw** (`drawWear`, called first in each of the 3 cases, right after the ground `hexTile` so the trees,
  benches and crowd stand ON it): a scatter of 3 `soil` ellipses placed by `hashCell` within the hex, radius+alpha
  ramping with `c.wear` above `WEARSHOW=0.12` (peak alpha `WEARA=0.5`). **Sub-hex marks, not a hexTile fill ⇒ it
  cannot terrace onto the lattice (257)**; through `colA`'s illuminant so night earth goes dim, not glowing.
- **Zero rng(), zero terrain** — a pure field of `c.buzz` + neighbours (the `hashCell` is in the DRAW only, for mark
  placement — deterministic, perturbs no stream). Reset with the world (`wear:0` in the cell literal). Tooltip: a
  worn public-green hex now reads `Footfall — Well-worn desire paths` / `Trodden to bare earth`.

**Census.** Core **BYTE-IDENTICAL** — `pop`/`developed`/`roads` **+0**, tile histogram empty. `greenRoofs +1 /
towerHt −1` is the 226 tick-timing wobble (the per-tick wear loop costs a hair of compute ⇒ a different tick count
lands in the census's 500ms window); it reproduced identically on a re-run of the SAME file, and the mechanism is
airtight — the pass reads a deterministic field and writes only `c.wear`, which nothing the census measures reads.
VERDICT PASS / 0 page errors.

**Perf.** +3 `hashCell`-placed ellipses on the worn WEARLAND hexes only (~30–130/city), day and night; every other
hex byte-flat. Under the +0.2%/lap arc; the step-back pins its day/golden frames at the dry peak, snow-free — this
adds nothing there.

**Probe** (`probes/probe-wear.mjs`, pure world data — drives `tick()`, reads `cells[].wear`, no pixels, no noise
floor, BUILD-AGNOSTIC via `SRC=` since HEAD's `c.wear` is undefined→0):
- **HEADLINE (236):** HEAD reads **0 worn hexes on all 6 seeds** — the constant baseline nobody designed. PATCH:
  93–132 worn hexes/city.
- **SPATIAL (the whole claim):** **LIVELY (buzz≥2) mean wear 0.65 vs QUIET (buzz<2) 0.09** — the wear concentrates
  at the busy edge, the quiet interior stays near-green ⇒ desire paths, not a wash.
- **BOUNDED (250):** ~32–44% of green shows *any* wear, most of it faint (near threshold, from diffusion); only the
  lively third wears strongly. **LEAK (non-green hexes holding wear) = 0 on every seed** — the pass contains itself.

**Visual** (`shoot.mjs`, seeds 42 & 7 @2035 day, whole-city + downtown clip). Both blind subagents **PASS** and both
**located** it: tan/beige bare-earth mottling worn into the park/garden hexes that border the shops, plazas and civic
core, sitting flat on the hex grid; quiet park interiors + shoreline greenbelt stay lush green (selective, not a
blanket browning); the wear tan is soft and low-contrast (matches the beach/path sand), no z-order tears / floating
tiles / blown-out colour; both whole-city frames read as a balanced, coherent coastal city — "lived-in texture
without dirtying the scene."

**Verdict: SHIPPED.** People's first non-excitable CA in 324 iterations — a diffusion/accumulation desire-path field
that wears the busiest public-green corners to bare earth (reading the existing `c.buzz` activity field) while the
quiet interior stays green, so the parks show where the city actually walks. Wholly census-inert (zero random draws,
no terrain), the two-stale-additive-cell pick landed. People × New CA rule (49 → 324). `probes/probe-wear.mjs`.

## Iteration 325 — the snow is a season the warp cannot melt (2026-07-17) [42nd step-back / holistic]

**Vector.** Header flagged the step-back due at ~325 (#41 clean at 320; 4 vectors since — 321 snow, 322 whales,
323 wildflowers, 324 desire paths — all draw-only / census byte-identical). The step-back outranks one more
feature. No `solvista.html` change.

**Step-back #42.** `probes/shot-stepback.mjs`, 2 seeds (42, 7), 5 frames each — day / golden / night + a CROSSED
dusk-summer/dusk-winter discriminating pair (264, verified in the self-reports: `dusk-summer sun=UP (sets 0.831)`
/ `dusk-winter sun=DOWN (sets 0.701)`).
- **Visual: city healthy — no cumulative drift, no false FAIL.** One agent per seed, blind, cumulative question.
  Both read all five as a coherent, balanced coastal city at every light — dense tower core reading as skyline
  not wallpaper, parks/farms/river/coast legible day and night, no crushed blacks or blown coast, **no z-order
  tears, no floating tiles, no blown/muddy color, no mojibake**. Both named the WINTER dusk by light alone ⇒
  day-length season alive (261/264). Only aside (both seeds): **snow reads faintly at the dusk-winter pin** — at
  year 2035.02 `winterMask≈0.37` (partial melt) and dusk is dark, so the uplands read dark-green rather than
  white. Not a FAIL, not a regression (321 validated snow at full winter); a lighting subtlety of the partial-
  melt-at-night frame. Seed 7 dusk-summer's warm low-sun wash flattens inland tiles toward muddy tan — within
  style, the known golden-warmth read (257), not new.
- **Perf: PERMANENT ARC FLAT, and a real instrument finding.** Priced in PATH OBJECTS (load-immune, 216/198).
  The naive warp-priced arc looked ALARMING — vs #41 (320) day **+5.7%**, night **+4.7%**, and the whole 40-lap
  arc vs 285 (+6.8% day) collapsed into these 4 laps while 285→320 was flat (+1.1%/35 laps). **Bisected to iter
  321 (snow): 320→321 +6305 day objects, 321→325 +94 (flat).** But snow *draws nothing 3/4 of the year* — the CA
  melts `c.snow` to 0 and the draw self-skips (`if(c.snow>SNOWSHOW…)`). The jump is an **instrument artifact**:
  `__warp(61)` lands the world at year 2035.0 (`winterMask=0.09>0`), leaving snow on the ground, and `__setYear`
  does **not re-tick**, so *every warp-based probe/census permanently samples a snowy world* — a summer pin still
  paid it. Clearing `c.snow` before counting: current day **111,602** vs 320's **111,604** (−2, byte-flat), night
  139,821 vs 139,511 (+0.22%); vs 285 (~40 laps): +1229 day = **+0.03%/lap.** ⇒ the permanent arc is FLAT; the
  snow layer is a bounded **seasonal** ~+5.7%d/+4.7%n paid only the coldest ~3 weeks/year (one extra `hexTile` per
  snowy upland hex, ~1260 hexes), the trade accepted at 321.
- **Census gate:** `solvista.html` byte-identical to HEAD (zero edits), VERDICT PASS / 0 page errors.

**Verdict: STEP-BACK — NO DRIFT.** City coherent across 3 lights × 2 seasons on 2 seeds; day-length season reads
by light alone on a crossed map; the permanent (snow-excluded) draw arc is byte-flat over 40 laps. The one finding
is methodological and promoted to SKILL.md: **a warp-based perf/census instrument freezes the world mid-winter
with snow the `__setYear` pin cannot melt, so it over-attributes a seasonal draw to the permanent arc — clear
`c.snow` (any season-persistent CA field) before pricing the arc.** Guardrail reset (next ~330); NEXT vector is
Civic × New CA rule (36/107) or a measured seam.

## Iteration 326 — the civic squares weathered in over the decades (2026-07-17) [Civic & culture × New CA rule]

**Vector.** Rotation's `NEXT` was the LAST stale additive cell: **Civic × New CA rule** — empty since iter 107 (219
laps), the single most recency-neglected coordinate in the grid. Excitable-media is COMPLETE (bloom/shroom/party), so
a civic CA had to be a *different* mechanism. The engine's field-CA templates were diffusion (324 wear) and
reaction-diffusion (321 snow); the third native form — **accumulation/succession** — had never been run for civic.
The seam was sitting in plain sight: **the paved civic squares are drawn identically at every age.** A plaza laid in
1996 and a forecourt opened in 2034 wear the same pale raw concrete, the same fountain, the same bunting — nothing
civic *matures*. (The QUAD/PLAZA draws are rich — forecourts, statues, mown quads — but frozen the instant they're
placed.)

**Change (an accumulation CA field + an age-gated draw — wholly census-inert).** New field `c.civ` on PLAZA:
- **The CA** (`tick()`, right after the 324 WEAR pass): each PLAZA relaxes `c.civ += CIVRATE=0.004` toward 1 (a raw
  new forecourt reads as fresh concrete; a decades-old square as established, dressed stone), plus a **diffusion term**
  (`CIVDIFF=0.02` toward its plaza neighbours' mean) so the clustered civic quarter ages as one and a lone new
  forecourt among old halls catches up a little. A destroyed/rebuilt square is zeroed here, so a fresh plaza always
  starts raw. Reads only type + neighbours' `c.civ`, writes only `c.civ`.
- **The draw** (PLAZA case): (a) the base paving weathers — `col('cream',0.97-0.07*c.civ)`, so an established square is
  a touch warmer worn stone (only ever DARKENS from HEAD's 0.97, so it can never out-brighten the lit fabric, 222);
  (b) past `CIVSHOW=0.30`, a pair of formal potted **bay-tree topiaries** (pale stone tub + clipped dark-green sphere
  + lit crown, all solid ellipse *bodies* per 215, ramping in size with maturity) establish flanking the rosette.
  Additive — the fountain/statue/bunting are untouched. Tooltip: a plaza now reads `newly-laid` / `maturing` /
  `long-established` off the SAME `c.civ` the draw gates on.
- **Zero rng(), zero hashCell, zero terrain** — a pure accumulation of type + neighbours, reset with the world
  (`civ:0` in the cell literal). Nothing the census measures reads `c.civ`.

**Census.** Core **BYTE-IDENTICAL** — `pop`/`developed`/`roads` and every histogram cell **+0**, empty tile histogram.
VERDICT PASS / 0 page errors. (Re-run on the final `CIVRATE=0.004` file: still +0, since the census reads no `c.civ`.)

**Perf.** Two extra solid ellipses per *dressed* plaza only (~3–5 plazas/city, and only those past `CIVSHOW`), day and
night; every other hex byte-flat. Far under the +0.015%/lap perm arc. The base-tone weathering is a colour-only change
(no new path object).

**Probe** (`probes/probe-civmature.mjs`, pure world data — drives `tick()`, reads `cells[].civ`+`.age`, no pixels, no
noise floor, BUILD-AGNOSTIC via `SRC=` since HEAD's `c.civ` is undefined→0):
- **HEADLINE (236):** HEAD reads **0 civ on every plaza, every seed** — a raw square and a fifty-year one drawn
  identically. The defect stated, no threshold invented.
- **CLAIM (the whole point):** **corr(civ, age) = 1.00** on every seed with age spread (0.00 on the two seeds whose
  plazas are all one age — honest, not a failure); OLD (age≥180 ticks) mean civ **0.90** (dressed) vs NEW (<90) **0.05**
  (raw). maxCiv **0.91** — established, not saturated, because plazas are young.
- **CONTAINED (250, LEAK):** every non-plaza hex reads civ 0 on all 6 seeds — the pass contains itself.

**Visual** (`probes/shot-civmature.mjs` — aimed A/B; zero-rng ⇒ HEAD and PATCH build the identical city, so the same
plaza hex is a genuinely blind pair; A/B tokens meaningless + **map CROSSED between seeds**, 268/239). Both blind
subagents **PASS** and both **located the treatment** — seed 42 (kappa=PATCH) and seed 7 (sigma=PATCH), each named the
matured build by its pixels: weathered warmer paving + the flanking pair of potted topiaries, sitting correctly on the
plaza tile (no floating, no spill onto neighbours, no z-order tears, no blown colour). Both whole-city frames read as a
balanced, coherent, beautiful coastal city — dense tower core, legible parks/river/coast, nothing compounded into
clutter or darkness.

**Verdict: SHIPPED.** Civic's first non-excitable CA and the last stale additive cell filled (Civic × New CA rule,
107 → 326): an accumulation/succession field that weathers the paved public squares in over the decades — raw new
concrete when a forecourt is freshly laid, an established dressed square once it has stood for years — so the civic
core shows its age. Wholly census-inert (zero random draws, no terrain). The additive grid is now fully rotated across
every domain × kind. `probes/probe-civmature.mjs`, `probes/shot-civmature.mjs`.

## Iteration 327 — hover a tower's wall and it names the tower, not the road behind it (2026-07-17) [Urban fabric × Interaction/UX]

**Vector.** The additive grid is fully rotated (326), so the guidance was a measured seam or Deepen/Polish, varying
the kind away from New CA (324/326). Domain balance pointed at Urban or Transport (neither touched in 6 laps); Urban's
stalest kind is **Interaction/UX (iter 133)** — and a live, measured open cue sat there: **(ba)**, banked at 278.
(Cue **(az)** — vehicles under-reaching their own bodies — was already CLOSED by iter 314's oriented pick box; the
drawVehicle `_phw/_phh/_pcy` footprint and `pickEntity`'s box test are the fix. So (ba) was the one still open.)
The tile hover (`hoverAt`) converts the cursor to world (wx,wy) and takes the **nearest ground-plane hex CENTRE** —
but a building rises UP the screen from its ground hex, so a cursor on a tower's wall sits far above that centre and
the nearest ground centre is a hex several rows BEHIND. So hovering a tall facade named the tile drawn behind it
(usually a road). This is 224's law (screen-y is DEPTH, not height) / 204's (a still frame hides where a thing is)
arriving on the **pick** instead of the camera. Urban × Interaction/UX (133 → 327).

**Change (interaction-only — no `rng()`, no terrain, no `tick()`, no draw).** New `pickTile(wx,wy)` (before
`hoverAt`), and `hoverAt`'s tile branch now calls it. Draw order is depth order, so the tile a viewer actually sees
at a point is the **FRONTMOST built column whose drawn body covers the cursor**: scan the bounded set of hexes whose
`c.h`-prism body (base centre `ctr(x,y)`, half-width `0.34*CW`, rising `c.h` px — the geometry `drawBuilding` itself
draws, `BODYT={RES,MID,COM,TOWER,IND}`) contains (wx,wy), and take the largest row (drawn last = in front), nearest-x
on a tie. If no building stands in the way, fall back to the **original** ground-plane nearest-centre pick — so open
ground, roads, water and parks are **byte-identical to HEAD**. The row scan is bounded by `HMAX=200` px (taller than
any tower body) ⇒ ~15 rows × 3 cols per hover, read-only, and hover runs ~8/s, never in `render()` — zero draw/perf
cost. The tile focus ring (`ctr(hoverTile)`) now lands on the building's own footprint for free.

**Census.** Core **BYTE-IDENTICAL** — `pop`/`developed`/`roads` and every histogram cell **+0** (no `rng()`, no
terrain, no `tick()`; the pick is read-only). VERDICT PASS / 0 page errors.

**Perf.** No draw change; `pickTile` runs only on hover (~8/s), never per frame. The permanent draw arc is untouched.

**Probe** (`probes/probe-facadepick.mjs`, build-agnostic via `SRC=`; settles heights `c.h=c.th` per 272; frozen
world at 2035). For each visible building it samples points on the FRONT WALL and asks the pick to name the building
itself, excluding occluded points (frontmost-containing-column ≠ this hex) so a buried wall point is skipped not
scored:
- **HEADLINE / the price (236):** the % of a building's own visible facade that names it. **HEAD (ground pick):
  TOWER 3.7–5.6% · COM 46–48% · MID 24% · RES 62% · IND 42–48% · ALL 33–36%** — i.e. ~66% of all built facade
  points, and **~95% of a TOWER's wall**, named the hex behind. **PATCH: 100.0% on every type, every seed.**
- **CONTROL (250, must-not-move):** open-ground hex centres (ROAD/PARK/EMPTY/…) — **ground pick and shipped pick
  agree 100.0%, both name the hex itself**, on HEAD and PATCH. The fallback is byte-identical off buildings.

**End-to-end (`probes/shot-facadepick.mjs`, uses NONE of the pick's geometry model):** drives the REAL
`page.mouse.move` onto a screen point on a downtown tower's wall (lifted up the facade in SCREEN px from the drawn
base), fires the artifact's own mousemove listener, and reads the live `hoverTile` + card text. **HEAD:** seed 42
cursor-on-tower-(28,29) → `hoverTile 28,23` (six rows back) → card **"Avenue"**; seed 7 tower-(31,42) →
`hoverTile 31,35` (seven rows back) → **"Boulevard"**. **PATCH:** the SAME points → `hoverTile 28,29` / `31,42` →
card **"Tower"**. Independent of the probe's model — it drives the actual pick.

**Visual** (the same shots, HEAD vs PATCH, A/B tokens meaningless + **CROSSED between seeds** per 238/239/268). Both
blind subagents **PASS** and both **located the fix on the crossed map**: on the patch the tooltip reads "Tower" (a
downtown high-rise, ~54 floors, helipad, rooftop solar) with the ring at the tower's base; on HEAD it reads
"Avenue"/"Boulevard" with the ring floating high on a road behind/above the cursor. No z-order tears, floating tiles,
misplaced tooltips or blown colour in either frame; both read as a coherent dense downtown (the scene draw is
untouched — only which tile the ring/card targets changed).

**Verdict: SHIPPED.** Cue (ba) closed. Hovering a tall building's facade now names and rings the building the cursor
is on, not the road drawn on the ground behind it — an occlusion-correct tile pick (frontmost built column covering
the cursor, ground-plane fallback where nothing stands in the way), lifting a tower's facade from ~4% self-naming to
100% while open ground is byte-identical. Interaction-only, wholly census-inert, zero perf cost, in Urban fabric's
stalest kind. Urban × Interaction/UX (133 → 327). `probes/probe-facadepick.mjs`, `probes/shot-facadepick.mjs`.

## Iteration 328 — the storm dropped a bolt to the ground, not just a flash in the cloud (2026-07-17) [Sky & atmosphere × Deepen/interconnect]

**Vector.** Sky × Deepen. Grepped the weather seam FIRST (`lightning|thunder|bolt|flash|storm`) — a sheet flash
already existed (iter 291), so this is not a new element. 291's `if(w>LIGHTN0)` glow lights the cloud *from within*
(a radial gradient at the belly) but **nothing ever comes down**: over the artifact's whole life a heavy shower
flickered internally and never threw a strike. Deepen the storm with a forked bolt that grounds on the beat the flash
peaks. Sky was the stalest non-saturated domain (last real lap 321).

**Change.** In the cloud loop, INSIDE the on-plate rain guard `if(pa>0)` (so a bolt can never strike the void — 248),
a new `if(w>LIGHTN0)` block: same storm bar and same `pulse`/`(0.30+0.62*LITAMT)` flash curve as 291, gated higher
(`bolt>0.22`) so only a wet storm at dusk throws a *visible* strike (rarer than the sheet flicker). A 7-segment jagged
polyline from the cloud belly `(cx,top)` down the rain shaft to the exact ground point `(foot,cy)`, plus two short
forks off interior joints. A light SOURCE, so a **raw white core under a blue-white glow** (279), never `col()`; jagged
deterministically in `time`+cloud position (no rng), frozen per flash by `round()` so it does not wriggle. First cut
tapered the jag to 0 at the ground and read as a smooth light-shaft (seed-7 agent FAIL); the jag now stays wide the
whole way down (17px, lightly tapered) and reads as a strike.

**Census.** Draw-only, no terrain, no `rng()` ⇒ tile histogram empty, every core metric **+0**, VERDICT PASS. The
census is vacuous here by design (a momentary draw-only ornament); the claim rests on the probe + screenshots.

**Probe** (`probes/probe-strike.mjs`, build-agnostic; isolation by the 291 `LIGHTN` suppressor, 253). At a frozen
dusk, scans the decades for a WET, on-plate cloud (`cloudWet>LIGHTN0 && inB`) and tests each at its *own* flash peak
(the single wettest instant can be a storm offshore, whose bolt correctly does not draw), taking the moment with the
most grounded bolt ink. Bolt ink = LIGHTN-diff pixels in the tall band below every belly+glow (y≥340), so the sheet
glow is excluded spatially.
- **WET:** seed 42 → **1656px / span 269px**, seed 7 → **4173px / span 296px** — a real descending column reaching
  the ground.
- **DRY control (250, must-be-0):** the driest front, swept for any flash → **0px on both seeds**. Fair weather
  cannot strike (the bolt shares the flash's storm bar) — the load-bearing control. **STRIKE: PASS.**

**Visual** (`probes/shot-strike.mjs`, aims the close-up by the bolt's measured ink centroid, 226 — the max-fla hero
can be off-plate; whole-city dusk frame + close-up, `page.screenshot`, zoom not scale per 269). Two blind subagents,
seeds 42 & 7: **both PASS.** Seed 42 — clear jagged bolt with a visible fork, bright white core + faint blue-white
glow, grounding on the built plate, no z-order tears/floating/blowout, city coherent. Seed 7 — an offshore storm
throws bolts that ground on the sea (on-plate), kinked and reading as lightning; forks less crisp where several
columns overlap at that zoom, but PASS. (First cut FAILed seed 7 as smooth shafts — the `(1-t)` jag taper was the
cause, now fixed.)

**Perf.** A momentary draw: two stroke passes per firing on-plate storm cloud, only within the sub-second flash peak,
and only for wet dusk storms — most frames draw zero bolts. Amortized cost ~0; the step-back (~330) prices the arc.

**Verdict: DEEPENED.** 291's storm flashed from inside the cloud; it now grounds a forked bolt on the beat the flash
peaks, only for a wet storm at dusk, only where the shower is on the plate. Draw-only, wholly census-inert, no new
tooltip surface (an ornament like the sheet flash / rain shaft, not an entity). Sky × Deepen (35 → … → 328).
`probes/probe-strike.mjs`, `probes/shot-strike.mjs`.

## Iteration 329 — the lit waterfront finally shone on the water it fronts (2026-07-17) [Water & coast × Deepen/interconnect]

**Vector.** Rotation: Transport was the most recency-neglected domain (~16 laps since 312), so I grepped its seams
first — and it is genuinely saturated (ENTINFO tooltips all live-computed off the predicate the draw steers by;
headlights/taillights/beacons/bike-lamps all present and night-gated; avenues, catenary, hours all done). No seam.
So I took the header's fallback (`Deepen/interconnect`) on the next-neglected domain with room. The night sea already
carries a **"city's lights smear"** (`drawCell` T.WATER, ~L5780) — warm streaks on the near-shore water — but it fell
**uniformly along the whole coast** (`hashCell(x,y,77)<0.28`, flat alpha `0.11*LITAMT`, `x` within 3 of the shore),
so a stretch fronting a **dark park or dune** reflected exactly as much warm light as one fronting a lit downtown. A
reflection with no source. **Water × Deepen (Urban lights ↔ Water):** make it answer the skyline it fronts.

**Change (draw-only — no `rng()`, no `Math.random()`, no terrain).** (1) `shoreGlow(y)` beside `shoreAtF`: sums the
developed frontage within `GLOWREACH=10` cells inshore of the coast, weighted **taller-brighter** (`0.35+0.65·min(1,
c.th/120)` — more lit glass) and **nearer-stronger** (`1-(k-1)/10`). Reads `DEV` membership and the **stable target
height `c.th`** (never the animated `c.h` — 277); draws nothing. (2) The smear now gates on `g=min(1,shoreGlow(y))`:
skip if `g≤0.03`, else reach `x<shx+2+round(g·2)`, chance `hashCell<0.15+0.35·g`, alpha `(0.05+0.16·g)·LITAMT`,
length `4+g·6+…`. A mid-glow shore (~0.29, the coast median) ≈ HEAD; a bright downtown waterfront reflects brighter,
denser and reaches further; a dark park/dune coast goes dark.

**Census.** Core **byte-identical** — pop/developed/roads **+0**, tile histogram empty, 0 page errors. `greenRoofs +1
/ towerHt +1` is the 226 tick-timing wobble (the extra per-frame walk costs a hair of compute ⇒ a different tick count
lands in the census's 500ms window; harness, not semantics). VERDICT: PASS.

**Probe first — the SPACE, then the interconnect (218/246).** `probes/probe-shoreglow.mjs` (pure world data, 6 seeds):
before designing, confirmed the signal **varies** rather than being ~0 everywhere (which would just delete the smear) —
**~65% of shore rows carry a real source** (glow 0.18 med → 0.6–0.7 p90 → ~1.0 max), **~35% front park/dune** and
correctly go dark. Then `probes/probe-shorereflect.mjs` (isolates the smear by its unique `rgba(255,200,120)` `fillRect`
signature — GWSB shares the colour but is golden-hour `hexTile`/strokes, off at night — and attributes each rect to its
shore row's glow via a wrapped `shoreGlow`; no pixel diff, no noise floor):
- **corr(glow, ink) = 0.70 / 0.61 / 0.77** (seeds 7/42/1234). HEAD's is ~0 by construction (flat alpha, uniform hash).
- **Mean ink by glow bin `[0-.2 .2-.4 .4-.6 .6-.8 .8-1]`** rises monotonically: `[0.6, 2.1, 4.4, 2.7, 8.1]` /
  `[0.6, 2, 2.9, 4, 6.5]` / `[1.1, 1.6, 2.6, 5.3, 6.6]` — the brightest waterfront reflects ~8–13× the dimmest lit row.
- **DAY control = 0 rects** on every seed (the `LITAMT>0.4` gate is off ⇒ daylight byte-identical, a free dead regime, 199).
- **Dark-row leak = 0** on every seed (no reflection is emitted in front of a `g≤0.03` park/dune coast — the fix's point).

**Visual** (`shot-*.mjs` night whole-city + `coast` clip, seeds 42 & 7; one subagent per seed, blind, cumulative
question). Both **PASS**: the near-shore warm reflection **varies** (present where the lit waterfront meets the sea,
dark where the coast fronts dune/undeveloped land), sits correctly at the waterline reaching a short way seaward (not
floating on land/air), no z-order tears / floating tiles / blown-out colour anywhere, and the whole night frame reads
as a balanced coastal city with a **coherent coastline** (not patchy, broken, or compounded too dark). Both noted the
warmth is subtle — consistent with the probe (faint near-shore alpha) and the artifact's established smear idiom; the
"present in front of lit blocks" half is proven quantitatively by the probe where a given seed's framing shows little
lit shore meeting the sea directly.

**Verdict: DEEPENED.** The night waterfront reflection now answers the skyline it fronts — a lit downtown coast
shimmers with a brighter, longer reflection while a park/dune headland leaves the water dark — instead of smearing a
source-less glow uniformly along the whole coast. Draw-only, census byte-identical, day byte-identical, an interconnect
of the Urban lights into the Water. Water & coast × Deepen (17/25/…/311/322 → 329). `probes/probe-shoreglow.mjs`,
`probes/probe-shorereflect.mjs`.

## Iteration 330 — forty-five laps on, the water still reads as water (2026-07-17) [43rd step-back / holistic]

**Vector.** Header flagged the step-back due at ~330 (#42 clean at 325; 4 vectors since — 326 civic-square
weathering, 327 facade tile pick, 328 grounded lightning bolt, 329 waterfront reflection — all draw-only /
census byte-identical). The step-back outranks one more feature. No `solvista.html` change.

**Step-back #43.** `probes/shot-stepback.mjs`, 2 seeds (42, 7), 5 frames each — day / golden / night + a CROSSED
dusk-summer / dusk-winter discriminating pair (264, verified in the self-reports: `dusk-summer sun=UP (sets 0.831)`
/ `dusk-winter sun=DOWN (sets 0.701)`).
- **Visual: city healthy — no cumulative drift, no false FAIL.** One agent per seed, blind, cumulative question.
  Both read all five as a coherent, balanced coastal city at every light — ocean→beach→parks→downtown→outer rings
  layering correctly, dense tower core reading as a skyline (not wallpaper), the river/lagoon bands legible.
  **All three compounding checks passed on BOTH seeds, unprompted:** night is a legibly LIT city (warm window
  grids, amber street/rail chains, lit pier + buoys — not a mauve/black void); golden hour keeps the parks and
  street-trees GREEN (the orange confined to sky/sand/roof highlights, not a monochrome terracotta wash — 265
  holds); the coastline reads teal water + tan beach with a hex-scalloped surf edge (no dark kelp/quilt band —
  282 holds). Both named the WINTER dusk by light alone (sun down, city already blazing) ⇒ day-length season
  alive (261/264). No z-order tears, no floating tiles, no blown/muddy color; towers/piers/turbines all seat
  correctly on their hexes.
- **Perf: PERMANENT ARC FLAT.** Priced in PATH OBJECTS (load-immune, 216/198), snow cleared per 325's law
  (the probe now does it in-page). Mean of 3 seeds: current (329) day **111,655** / night **139,773**.
  - vs #42 (325): day 111,684 / night 139,816 ⇒ **−29 day (−0.03%), −43 night (−0.03%)** over the 4 draw-only
    laps — byte-flat, a tiny credit (327/328/329 all wired new draws to `if(pa>0)`/light gates that add nothing
    at the priced pins).
  - vs iter 285 (~44 laps back): day 110,342 / night 138,106 ⇒ **+1,313 day (+1.19%), +1,667 night (+1.21%)**,
    i.e. **≈+0.027%/lap** — well under the historical +0.2%/lap the arc used to run at (162→202 cost 8.6%/40
    laps), consistent with the standing fact that byte-flat FIXES cancel the additive tendency. No perf-fix lap.
- **Census gate:** `solvista.html` byte-identical to HEAD (zero edits); the drawbudget probe loaded current HEAD
  across 3 seeds × 2 lights with 0 page errors.

**Verdict: STEP-BACK — NO DRIFT.** City coherent across 3 lights × 2 seasons on 2 seeds; day-length season reads
by light alone on a crossed map; night lit, golden greens green, coast reads water+beach; the permanent
(snow-excluded) draw arc is byte-flat over the 4-lap window and ≈+0.027%/lap over ~44 laps. Nothing to fix.
Guardrail reset (next ~335). NEXT vector: Sky × New element (291 lightning was the sparsest additive cell) or a
measured seam (grep `tick()` / the TABLES / the comments — the cue list records where you've LOOKED, not what is
THERE).

## Iteration 331 — a jet crosses the high sky, drawing a contrail (2026-07-17) [Sky & atmosphere × New element]

**Vector.** Sky × New element — the header's named sparsest additive cell (Sky's only prior New elements are 27, 43,
291, so this is the **4th ever**), and the last genuinely-additive slot before additive space is fully spent. I first
grepped the measured seams (comments for `never|no state|placed once|static`, the flag lifecycle for `hstr`/`bridge`/
`riv`, the tables) — all well-tended (`hstr` already rides the tower podium per 249/281; 281/288 closed the flag
defects; the marsh/kelp comments are audited). No fresh seam surfaced quickly, so I took the additive slot. The upper
sky is a genuinely empty band (200): a high jet with a contrail fills it, on-theme for a coastal city, and clean
(Math.random drift-in, draw-only, guaranteed-flat census).

**Change (draw-only — Math.random spawn, no `rng()`, no terrain).** A single `plane` object (like `flock`), spawned in
`genWorld` and advanced/looped in `advanceEntities`. A jet at altitude does not parallax with the ground, so it is a
**SCREEN-SPACE** craft (`p`=progress across the viewport, `y`=screen fraction in the high band, `dir`, `sp`, `sl`=a
gentle slope) — drawn in the sky slab **beside the sun/moon/shooting-star, BEFORE the city**, so the skyline occludes
it exactly as it occludes the sun (a tower rising in front of the far jet is depth, not a tear). The contrail is a
26-segment line fading behind a tiny dark swept speck with a blinking beacon. It is lit by the **sun**: bright white by
day, warm-pink at golden hour (`GWARM`, a 6th reader of it), and **GONE at night** (`day = 1−LITAMT`, no sun to light
it); it **fades out in rain** (`balloonFair`), so it never streaks a stormy sky. Census hook gets `plane:plane?1:0`.
Not stamped/hoverable — a screen-space drift-in like the sun, moon, star and flock (the whale precedent, 286).

**Census.** Draw-only, Math.random spawn ⇒ tile histogram empty, pop/roads/developed **byte-identical (+0)**, 0 page
errors. VERDICT PASS. Vacuous by design; the claim rests on the probe + screenshots.

**Probe** (`probes/probe-jet.mjs`, build-agnostic; isolation by clearing the decision, 230 — place a deterministic
plane, render, then `plane=null`, re-render IN ONE PAGE, diff = the whole jet, floor **exactly 0**). Three conditions,
two must-be-0 controls (`balloonFair` stubbed BY ASSIGNMENT, 284):
- **DAY fair** → 453 / 551 / 503 px (seeds 42/7/1234), meanY **0.14** (high in the sky, above the skyline).
- **NIGHT fair** → **0 px** on every seed (the `1−LITAMT` day factor kills it — a dead regime).
- **DAY rain** → **0 px** on every seed (`balloonFair=0` fades it — fair-weather only). **JET: PASS.**

**Visual** (`probes/shot-jet.mjs`, whole-city day + a close-up **aimed by measured ink** (226/272) + golden + night;
`page.screenshot`, 200). Two blind subagents, seeds 42 & 7, both **PASS**: the contrail reads as a thin white streak
with a tiny aircraft speck at its leading end, in open sky above the skyline; warmer/creamier at golden; **absent at
night** (moon + stars only); no z-order tears / floating tiles / blown-out colour; the whole frame reads as a coherent
coastal city.

**Two camera bugs found and fixed along the way (200/204/226) — the artifact was innocent both times.** (1) The first
build drew the trail in **world space** along constant world-y; the iso projection swept it steeply DOWN over the
rooftops (ink bbox landed on the city) — a jet does not parallax, so it had to be screen-space. (2) The shot's first
`time=100` sat exactly on the pre-existing **shooting star** (`met=(time·0.13)%1 = 0`, which draws at night/golden as a
white diagonal), and a **rainy** loaded moment correctly HID the jet — so two agent rounds FAILed the *camera* (mis-
attributing the meteor and seeing a blank rainy sky) while the artifact was fine. Fixed by forcing `rainFront=()=>0`,
pinning `time` off the meteor, and aiming the close-up by measured ink rather than `pxc` (which is pre-transform and
pointed the crop at empty sky).

**Perf.** A handful of thin strokes for one on-screen jet, only in fair daylight; negligible. Step-back (~335) prices
the arc in path objects.

**Verdict: SHIPPED.** A high jet now crosses the empty upper sky drawing a sunlit contrail — white by day, warm at
golden, gone at night, absent in rain — filling the one sky band that was bare. Draw-only, census byte-identical, the
4th and last sparse additive cell. Sky × New element (27/43/291 → 331). `probes/probe-jet.mjs`, `probes/shot-jet.mjs`.

## Iteration 332 — the hearths no one could see (2026-07-17) [Urban fabric × Deepen/interconnect — EXPLORED → REVERTED]

**Vector.** Additive space is spent (331), so a Deepen off a measured seam. I grepped the documented seams first:
the comment tell (`no state|never|placed once|static`) is clean (paid at 282); the frozen census column is all audited
terrain (SHOREPARK/ROCK/MARSH/LIGHTHOUSE/VOID) or slow one-per-city (REDWOOD/ORCHARD/IND) — no fresh dead rule; the
flag lifecycle and the type-keyed tables (`CIVHRS` covers all 12 civic kinds, `BEDT` handles the loft) are complete;
People already answers weather (the ped umbrella, `rainingAt`, 8878) and season (the water crowd), and the deciduous
canopy is deliberately a **live oak that stays leafy** ("winter means cool light and deep dull greens, never snow",
L349 — so "bare winter trees" is off-model, not a gap). The one genuine gap I found: **grepping the WINDA-reader
category (280 — the wind's reader list is a changelog, not a spec) turned up SMOKE as the un-enumerated member.** The
BURNT ember scars (6606) and the wildfire plume (7254) both wobble on a symmetric `Math.sin(time*2…)` that reads the
CLOCK and not the WIND, so smoke rose dead-straight while the trees, flags, kites, clouds and balloons beside it all
lean. And the brick chimney (7436) was a static prism venting nothing — a home whose hearth answered no weather at all.

**Change (explored — draw-only, no `rng()`, no terrain).** A shared `smokeLean(rise)=rise*1.1*windForce()*sin(time*0.22
+seedNum*0.7)` — one slowly-shifting city-wide gust direction, leaning FARTHER the higher a puff has risen, and
returning 0 at dead calm (`windForce()==0`) so a becalmed plume is HEAD's straight column byte-for-byte (245's fixed
point). New cozy **chimney woodsmoke** on RES, gated on cold season (`hearth=clamp((seasonCool()-0.5)/0.45,0,1)`, so it
pairs with the snow at the trough, 321) with a per-home hash deciding which hearths are lit — more of them as it deepens
(262: a shared cause is fine, stagger who answers). The existing ember + wildfire smoke retrofitted to the same helper.

**Census.** Byte-identical (+0 on `pop`/`roads`/`developed`, empty tile histogram, 0 page errors). Draw-only, as expected.

**Probe** (`probe-chimneysmoke`, deleted with the revert). Hooked `ctx.arc` and picked the smoke out by its unique raw
fillStyle triple (deterministic, no pixel diff, no noise floor). It **PROVED the mechanism is correct**: WINTER draws
224–272 puffs; **SUMMER draws 0** (a dead regime, 199 — the hearth is only lit in the cold); at winter, a GALE leans the
puffs `mean|dx| 2.5–4.7px` while CALM is `0` (the exact fixed point); and higher puffs (bucketed by radius, which
encodes rise) lean **3–7px vs 1.4–2.5px** for low ones — the plume streams as it climbs. Clean on all 3 seeds.

**Visual — FAIL, and it is the whole result.** Two blind agents × 2 seeds, then again after I darkened the smoke
(rgb 126,122,115 @ α0.52 base) and grew it to a 4-puff taller column and re-aimed the close-up by measured ink — and
then my own look at the close-up and the whole city. **The smoke is invisible at the scale a user views the diorama.**
Cause (200/205/266, and 215's "ink renders ≠ a mark reads"): the host is a **SHORT RES house**, scattered through dense
fabric among taller neighbours and greenery, so the ~15px plume rises into a busy midground with **no clean sky
backdrop** and is lost. The close-up's measured-ink aim even landed in a tower cluster (chimneys sit at the RES/downtown
fringe). The only way to make it read would be a plume big/dark enough that **20% of the city's houses smoking reads as
a smoggy, cluttered, darkened city** — exactly the cumulative drift the step-back (330: "no clutter/darkness") works to
prevent. That is the header's "barely-visible bad trade ⇒ ⛔ do not force" and 266's price-visibility-first, arriving
after the build instead of before.

**Verdict: EXPLORED → REVERTED.** `solvista.html` restored byte-identical to HEAD; probe/shot/shots removed. The
exploration bought two things worth the lap: (1) it confirmed the documented seams are genuinely well-tended and the
city is deeply saturated — every large surface answers its signals; (2) it found a real WINDA-category gap (280) whose
common instance (hearth smoke) is a bad trade, and banked **cue (bj)**: the *existing* wildfire plume + ember scars —
prominent when a 2018–30 fire actually burns — do ignore the wind, and the `smokeLean` one-liner (probe-proven) fixes it
cheaply for a future lap that is already working the fire and can verify it in-context. ⛔ Do not re-try chimney smoke.

## Iteration 333 — the fire's smoke finally leans with the wind (2026-07-17) [Nature × Deepen/interconnect]

**Vector.** Cue (bj), banked by 332 for "a lap already working the fire." Additive space is spent (331) and the header
points to a measured seam or a Deepen in a rotated domain avoiding Sky/Water. Nature (last touched 323; the wildfire CA
is Nature's, 279) fits, and the seam is already found and probe-proven: **smoke is the un-enumerated member of the
wind's reader category** (280 — grep the MECHANISM `windForce`, not the reader-list comment, for who does not read it).
Every gusting thing over the coast rides WINDA — the trees sway, the flags flap, the clouds/balloons/kites drift +x —
but the fire smoke rose **dead straight**, wobbling on a bare clock term. Unlike 332's reverted chimney smoke (invisible:
a short RES host with no clean sky backdrop, 266), the wildfire plume is a **prominent** feature when a 2018–30 fire
burns, so visibility is not the risk here.

**Change (draw-only — no `rng()`, no terrain).** A shared helper `smokeLean(rise)=rise*windForce()` and its `+smokeLean(sm)`
added to the puff-x of the two smoke draws (grep-confirmed the only two): the **wildfire plume** (`drawFire`, 4 puffs)
and the **ember scars** of a fresh burn (the smoking BURNT tile, 2 puffs). A plume bends over as it climbs, so the lean
is the puff's own **rise** times the gust strength, in the same **+x** the clouds drift (so the whole sky leans
together). At `windForce()==0` (a dead calm) the lean is 0 and the plume is HEAD's straight column byte-for-byte (an
exact fixed point, 245). The bonfire is a flame tongue with no smoke puffs — out of scope. Cue (bc)'s fire-glow-eaten-by-
later-rows is a separate 266 z-order job, left for a future fire lap.

**Census.** Draw-only ⇒ tile histogram empty, `pop`/`roads`/`developed` **byte-identical (+0)**, 0 page errors. VERDICT
PASS. Vacuous by design; the claim rests on the probe + screenshots.

**Probe** (`probes/probe-smokelean.mjs`, build-agnostic — grades the SHIPPED draw in one build, no source swap, no
cross-build floor: hooks `ctx.arc`, picks the smoke puffs by fillStyle signature (273: match the spaced canonical form;
the glow arc is a CanvasGradient and drops out), places a fire + a fresh ember, renders the SAME frozen frame at GALE and
CALM so the base wobble cancels and `dx = x_gale − x_calm` IS `smokeLean`). All 3 seeds:
- **GALE leans every puff downwind** (`dx>0`): YES.
- **`dx` grows with rise, exactly** — plume `dx` = 6.00 / 8.40 / 10.80 for `rise` 6.00 / 8.40 / 10.80; ember 6.00 / 1.00.
  A plume bends over as it climbs.
- **FIXED POINT (245):** CALM (windForce 0) == `smokeLean` stubbed to 0, **EXACT 0 px** — the calm plume is HEAD's
  straight column, the must-not-move control (250). **SMOKELEAN: PASS.**

**Visual** (`probes/shot-smokelean.mjs` — drives `tick()` to a live spreading episode, freezes, aims by measured ink
(226/230/234), shoots the SAME frozen fire at GALE and CALM as a blind A/B, tokens meaningless + non-ordinal, map
**CROSSED between seeds** (238/239/268); `page.screenshot`, 200; day pin off the light curve, 264). Both seeds found a
2-hex forest fire (~1980). **Two blind subagents, on both seeds, on the crossed map, correctly identified the gale frame
from the smoke lean alone** (s42 gale=`vera` ✓ · s7 gale=`nolan` ✓ — a discriminating pair, 264, resolved on both seeds,
worth more than any "looks good"): the plume "streams to the right, the highest blob shifted farthest downwind," reads as
a coherent wind-blown streak "rooted right at the flame," no tear / floating / detach; the whole-city frame clean — no
z-order tears, no floating tiles, no blown-out colour, a balanced coherent coastal city.

**Perf.** Zero new path objects (same puffs, one extra `windForce()` term per puff on the ≤6 puffs of a rare fire).
Step-back (~335) prices the arc.

**Verdict: SHIPPED.** The wildfire plume and its ember scars now stream downwind, leaning farther the higher each puff
rises, in the same +x the clouds drift — and stand as HEAD's straight column at a dead calm. Cue (bj) CLOSED; the
un-enumerated WINDA member is enumerated (280). Draw-only, census byte-identical, exact fixed point. Nature × Deepen
(279 → 333). `probes/probe-smokelean.mjs`, `probes/shot-smokelean.mjs`.
