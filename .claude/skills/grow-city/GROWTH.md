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
| **Nature** | 4, 26, 29, 102, **156**, **174** | 1, 13, 60, **206**, **279**, **287** | 37, 46, 67, 76, **108**, **120**, **139**, **166**, ~~**233**~~, **238**, ~~**246**~~, **263**, **272**, **301**, **308**, **323**, **333**, ~~**342**~~ | ~~46~~, ~~88~~, ~~101~~ | U4 | 53, 96, **194**, ~~**198**~~, **215**, **221**, ~~**251**~~, **294** | **117**, **129**, **148**, **183** |
| **Water & coast** | 6, 10, 12, 16, 20, 33, 106, **169**, **296** | 90, **282** | 17, 25, 51, 65, 72, **113**, **123**, **159**, **196**, **245**, **257**, **289**, **303**, **311**, **322**, **329**, **334**, **348**, **349** | 22, ~~**205**~~ | | U2, 44, 58, 79, **116**, **132**, **150**, **185**, **214**, **223**,  **234**, ~~**255**~~, **266**, **268**, **275** | **97**, **141**, **176** |
| **Urban fabric** | 32, 62, **295** | 7, 23, ~~82~~, **151**, **281** | 38, 54, 68, 92, **165**, **173**, **189**, **199**, **209**, ~~**218**~~, **219**, ~~**254**~~, **267**, **288**, **309**, **316**, ~~**332**~~, ~~**343**~~ | 47, **109**, ~~**160**~~ | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103**, **110**, **118**, **124**, **143**, **180**, **216**, **220**, **224**, **228**, **235**, **239**, **274**, **302** | **133**, **327** |
| **Transport** | 2, 9, 21, 31, 48, **164**, **297** | 77, **283** | 28, 39, 55, 63, **112**, **121**, **128**, **155**, **179**, **193**, **230**, **249**, **258**, **269**, ~~**312**~~, **341** | 5, 15, **138**, **211**, **276** | U4 | U1, U3, 70, 85, 87, 94, **146**, **188**, ~~**203**~~, **241**, **243** | **105**, **171**, **290** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107**, **326** | 36, 59, 66, 80, 91, **149**, **158**, **175**, ~~**195**~~, **213**, **244**, **250**, **259**, **277**, **285**, **292**, **307**, **338**, **339** | 45, **204**, **319** | | 73, ~~**114**~~, **168**, **231**, ~~**270**~~, **299** | 52, 122, **140**, **184** |
| **Sky & atmosphere** | 27, 43, **291**, **331** | **321** | 19, 35, 50, 57, 95, **135**, **153**, **161**, **181**, **190**, **208**, **225**, **236**, **253**, **261**, **280**, **284**, **298**, **305**, **313**, **328**, **347** | | | 61, 81, 89, **115**, **200**, **242**, **248**, **265**, ~~**273**~~ | ~~**134**~~, **144** |
| **People & activity** | 41, 56, **127**, **170**, **186**, **293** | 49, **324** | 34, 64, 93, **104**, **119**, **145**, **178**, **201**, **210**, **240**, **247**, **262**, **271**, **286**, **306**, **314**, **317**, **318**, **336**, **337** | 78, **111** | | 84, **137**, **163**, **226**, **300** | 71, **154**, **191**, **278** |

- **Interaction/UX** (inventory + the `<meta charset>` repeal archived at 270; both are INVARIANTS in SKILL.md). What
  steers: when adding an entity array, `stamp()` it in its draw + add an `ENTINFO` row (same discipline as the census
  hook) — `stamp()` also draws the focus ring, so any stamped entity is ringable free. **An `ENTINFO` `sub` may be a
  FUNCTION of the entity (105)** — use it when a thing's interest is its *membership* (line/route/depot), computed live.
- ✅ **THE TRIM METHOD** (paid 279, again 280): a block is cuttable when its **LAW is in SKILL.md** and its **ARTIFACT
  FACTS compress to their imperatives**; a *superseded* warning is free to cut (280's `__setWind` retired 275's).
  There is never a block you can simply *delete* — **compress the oldest, and pay for your OWN additions in the same lap.**
- **ROTATION.** Last: **350 — STEP-BACK #47 / NO DRIFT** (whole-city 3 lights × 2 seasons × 2 seeds both blind-PASS;
  census core byte-flat; perf +0.020%/lap day, +0.019%/lap night vs 285 over ~64 laps, FLAT vs #46. ⚠ Watch UNCHANGED:
  inland tower core dense but NOT wallpaper — do NOT add raw downtown density. Full text in the 350 entry.) Prev:
  **349 — THE CHANNEL MARKS MIRROR THEIR FLASH / SHIPPED (DEEPENED)** (Water × Deepen; buoy red/green flash now reflects
  on the water — 3rd confirmation of 347, ✅ **CLOSES the water-reflection CATEGORY (271/280)**; full text in the 349
  entry, laws in SKILL.md. Banked `probes/probe-buoyreflect.mjs`.) Prev: **348 — A FIRE LIGHTS THE GROUND IT SITS ON /
  SHIPPED (DEEPENED)** (Water × Deepen; bonfire self-glow → warm firelight pool on sand, `FIREPOOL`/`FIREGLOW`, 2nd
  confirmation. Full text in the 348 entry.) Prev: **347 — THE STRIKE LIGHTS THE GROUND IT HITS / SHIPPED** (Sky ×
  Deepen; 328's grounded bolt → bluish-white ground pool, `GFLASH`, 1st proof a half-built emitter is a live Deepen.
  Full text in the 347 entry.) Prev: **346 — frozen-column finder banked as `probe-frozencol.mjs` / NO SHIP** (KELP
  28→33→31 re-proves 282; byte-identical.) Prev: **STEP-BACK #46 @345** (NO DRIFT; perf +0.017–0.021%/lap vs 285 over
  60 laps.) Prev: **344 — saturation-bound; mode STEP-BACKS + `polish-tile` / NO SHIP.**
  Prev: ~~**Urban 343**~~ (SNOW ON ROOFS — `SNOWLAND` type-set blind to buildings (274), REAL gap; a `colA`-white cap on
  pale roofs in dim warm-haze winter = NO figure/ground, both agents INVERTED. ⛔ INVISIBLE-AT-ZOOM, `polish-tile` only.) Prev:
  ~~**Nature 342**~~ (CAT'S-PAWS — grass deaf to `windForce`; a low-α ellipse scatter HAZES not MARKS (203/215),
  BOTH agents INVERTED; ⛔ INVISIBLE-AT-ZOOM, tapered-streak `polish-tile` only.) Prev: **Transport 341** (WET STREETS
  MIRROR THEIR LAMPS — rain's LAST un-enumerated reader is the ROAD; `rainingAt`>0 warm smear down night lamp pools,
  dry≡HEAD, land analog of 329; draw-only). Prev: **STEP-BACK #45 @340** (NO DRIFT; perf +0.022%/lap vs 285; GWARM=0 at
  pinned dry-peak = CORRECT, overcast greys skyBot, do NOT re-chase — watch now carried by #46/346). Prev
  (Deepen/shipped, byte-flat, laws in SKILL.md,
  full text in ledger/archive): Civic **338/339** (festival cloth on `windForce`) · People **336/337** (RAIN-AWARE
  CROWDS on `dryAt`; category CLOSED, hold-out BEACH ⛔) · Water **334** (SAIL BELLIES; WINDA-over-water DONE ⛔) ·
  Nature **333** (FIRE SMOKE LEANS; (bj) CLOSED, 🆕 (bc) fire-glow z-order future) · ~~Urban **332**~~ (CHIMNEY WOODSMOKE
  ⛔ INVISIBLE, DO NOT RE-TRY) · Sky **331** (HIGH JET; a jet does NOT parallax) · Water **329** (WATERFRONT REFLECTION
  on `shoreGlow`) · Sky **328** (THE STRIKE, forked bolt on 291 flash) · Urban **327** (FACADE TILE PICK, frontmost
  prism) · Civic **326** (CIVIC SQUARE `c.civ`) · **STEP-BACKS #42–#44 @325/330/335** (NO DRIFT) · **324–319** (desire
  paths · wildflowers · whales · SNOW `c.snow` ⚠ warp=61 freezes it ON · civic) · People **318/317** · Urban **316**
  (⛔ DISTRICTS' `tick()` vote is a STREAM-PRESERVING VESTIGE — do NOT delete). ✅
  **EXCITABLE-MEDIA CATEGORY COMPLETE** (bloom 263 · shroom 272 · party 314). ➡ **NEXT VECTOR: STEP-BACK #47 @350
  landed NO DRIFT (guardrail reset) — so ~355 = STEP-BACK #48. The half-built-emitter vein (grep a draw that
  lands/emits/casts and STOPS) is now 3-for-3 (347/348/349) and CLOSED — do NOT ship a 4th light-pool. Honest mode =
  `polish-tile` (342/343's shaped-ridge/tapered-streak deaf-surface redesigns), or a NEW growth lap that finds a
  DIFFERENT kind of half-built completion (a mover that arrives+idles, a spawn that never completes) or a NEW
  mechanism/domain-signal-reader — PRICE VISIBILITY / figure-ground FIRST (266/342/343).** Additive space SPENT (331).
  ⇒ ⚠ **remaining gaps are DEEP-BUT-INVISIBLE-AT-ZOOM — PRICE VISIBILITY (266/342/343) BEFORE building; a passing
  census+probe means NOTHING for a subtle overlay, only the blind agents do. A HIGH-CONTRAST interconnect (341's warm-
  on-dark reflection) ships; a LOW-CONTRAST one (snow-on-snow, pale-on-pale, haze) INVERTS. Check figure/ground FIRST.**
  ⚠ **TRANSPORT ENTITY/ADDITIVE SEAMS SATURATED** (304/312/329; hairline cues (bi)/(av) = bad trade ⇒ ⛔ `polish-tile`)
  — but **341 found a CROSS-DOMAIN interconnect the saturation note missed: the rain MECHANISM had no ROAD reader** (280).
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
  ✅ **CLOSED — bodies archived, laws in SKILL.md: (al)239 (am)241 (an)243 (ao)248 (ap)266 (ar)256 (as)275 (at)274.**
  ⚠ **Live warnings only:** DO NOT RE-OPEN EITHER BUILDING (228 crown · 235 footprint · 239 mid-rise — **every form's
  base is its widest part**); nor re-tune the elevated beam (IN BAND); nor bound a loop's RADIUS (stubs); nor un-gate
  `stepGond`'s floorless value bar (`WETSET`); nor re-open the windrow's WIDTH/TONE or the sea's TILE FILL (255's ⛔;
  ink held by `WROWN`). `probe-darkline` REPAIRED (243); the rainbow is NOT a rim bug (tests its LEGS — the defect was
  the COMMENT). ⛔ **(ar) WAS THE HARNESS (229), 3rd time** — 240's unclaimed aside: *"tiny white chevron glyphs on land."* · **(au) THE LOFT'S "ROOFTOP STUDIO" READS AS A GREEN ROOF** (267): a full-width `'sage'` hex cap, not the small box intended ⇒ the lever is the SHAPE (Urban × Polish). ·
  **(ay) THE WINDROWS ARE LEGIBLE WHERE *LONG*, INVISIBLE WHERE SHORT** (275; 266): traceability is **LENGTH** (a hexagon
  can't quantize it) ⇒ POLISH lever = the **row-length distribution** (`L=min(want, run−0.5)` truncated by open sea upwind
  ⇒ coastal rows are stubs); histogram first (`probes/probe-windrow.mjs`), ⚠ **NOT alpha/width.** · **(aw-HUD) UNVERIFIED
  — a 269 agent read the controls card clipping *"TRANSIT REA…"* at 1400×900, but `probe-hud` swept 6 widths, 0 clipped ⇒
  SUSPECT THE HARNESS (229, (ar)'s shape a 4th time); reproduce in a real browser first.** · **(x) A STROKE MAY NOT PRICE
  LIKE A FILL (215, perf suspect, NAMED not MANDATED):** stroke-vs-fill sweep at equal path-object count (`CCACHE` churn
  ruled OUT). · **(y) A SCORCHED HEX CLUSTER INLAND (216, seed 7):** the fire CA is a GHOST (can't ignite at 2035) ⇒
  likely LOGGING/clearcut not BURNT — identify the tile first (Nature × Polish). ⚠ **The sun CANNOT be lowered (200)** —
  do not raise `seasonCool` at the peak (breaks 253's fixed point).
- **Reach maps exist — reuse them (U5):** `reachFill(out, r, isSrc)` is a multi-source hex BFS capped at radius `r`,
  land-only (`WETSET` blocks water/marsh/kelp), filling `out` with steps-to-nearest-source (255 = farther than r).
  `recount()` runs four per tick. Any "how far is X from Y" question should call it, not hand-roll a flood fill.
- **⚠ Three census stats can FALL, by design (U5):** `walkPct`, `transitPct`, `solarPct` are **shares**, not counts.
  **Services are walkable's binding constraint** — a tower lap that adds residents without civics *drops* `walkPct`,
  and that is the stat working. Judge by whether the city earned the change, not "up = good". `density` rises with
  intensification and falls with sprawl.
---

<!-- rotated -->

> **Archive:** the 343 entries before Iteration 341 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

## Iteration 341 — the wet streets mirror their lamps (2026-07-17) [Transport × Deepen/interconnect]

**Vector.** Step-back #45 (@340) pointed here: a measured seam (225) or a Deepen in a rotated domain,
avoid Sky/Water (and People/Civic just ran, 336–339). I ran the header's seam-finders — the frozen census
tile histogram (every flat/zero row is audited terrain/landmark), the type-keyed tables, the per-cell flag
lifecycles (`corner`/`loft`/`solar`/`groof`/`hstr`/`bridge`/`riv` — all ride or are consumed correctly, 288
being the last), the season/crop calendars (farms/orchards/vineyards fully deepened), and the animate mono-gate
cliffs (300 was the last). All closed — the artifact is deeply saturated. The one genuinely-open seam: **the
rain MECHANISM (rainingAt) had no reader on the ROADS.** The arterial spine + ordinary streets draw warm lamp
pools at night (`drawCell` ROAD, `LITAMT>0.25`, ~L6918) but gleamed **identically wet or dry** — the wet-street
reflection (why a rainy city night reads luminous; the land analog of 329's waterfront-reflects-the-skyline) was
missing. Found by grepping the MECHANISM `rainingAt` (280 — not the header's "rain readers enumerated" noun list,
which 336/337 already walked into): its readers were all crowds/umbrellas/washing — never a road surface.

**Change (draw-only — no `rng()`, no terrain, unreachable from `tick()`).** In the night-lamp block, `const
wetg=rainingAt(x,y)`; when `wetg>0` each lamp head draws one extra warm radial-gradient smear, vertically
stretched toward the viewer (`translate(cx,cy+1.5); scale(0.55,2.6)`), alpha `WETGLEAM*LITAMT*wetg` — the arterial
gleam at `WETGLEAM=0.42`, the ordinary street at ×0.7. A reflection is a LONG mark, so it survives the downscale
to fit zoom where a flat wash would not (266). At `rainingAt===0` (the dry majority of hexes/time) the `if(wetg>0)`
block is skipped, so a dry frame draws HEAD's exact bytes — an **exact fixed point** (245/253): DRY ≡ HEAD, no HEAD
file needed. Same lamps otherwise ⇒ zero new path objects when dry.

**Census.** Draw-only ⇒ tile histogram empty, `pop`/`developed`/`roads` **byte-identical (+0)**, 0 page errors.
VERDICT PASS (only the usual ±1 tick-timing wobble on `solarRoofs` — 226, not mine).

**Probe** (`probes/probe-wetgleam.mjs`, build-agnostic — hooks the artifact's own `createRadialGradient`/`fill`
and counts, by colour signature, the OBJECTS the frame ISSUES; no pixel diff, NO NOISE FLOOR AT ALL). Night pin
(dayT 0.92, LITAMT 1.00), 3 seeds, gleam counted as the warm-gradient fills, lamp head as the solid `255,226,152`/
`255,198,108` fills:
- **gleam DRY 0 → WET 354/398/382** — the fixed point (0 dry = block skipped = HEAD path) and it fires (one smear
  per lit lamp when wet), all 3 seeds.
- **lamp-head control (250 + positive) IDENTICAL dry vs wet (354/398/382) and > 0** — the heads don't read rain, so
  the stub moved ONLY the gleam, and their nonzero count proves the frame is a real lit night city (a dead frame
  would give gleam 0 too). WETGLEAM: PASS.
- ⚠ RIG NOTE: `ctx.fillStyle` reads back Chromium-canonicalised (spaced) — the head match had to strip whitespace
  (273); the gleam gradients are tagged at `addColorStop` time (on my own un-canonicalised string) so they were fine.

**Visual** (`probes/shot-wetgleam.mjs` — same frozen night city, shot DRY (`rainingAt→0`, ≡HEAD) and WET
(`rainingAt→1`, streets gleam) as a blind A/B zoomed 5× and **aimed by measured ink** (226/272: the only thing
differing DRY↔WET is the gleam, so the argmax of the DRY-vs-WET diff IS where it renders, HUD boxes zeroed — 200),
plus whole-city DRY + WET(flood) frames for the holistic read; tokens meaningless + non-ordinal, map **CROSSED
between seeds** (238/239/268); md5 confirmed the pairs differ). **Both blind subagents, on both seeds, on the
crossed map, correctly named the WET frame from the reflections alone** (s42 wet=`teasel` ✓ · s7 wet=`sorrel` ✓ —
a discriminating pair, 264, resolved blind on both): the wet frame's lamps stretch into warm vertical smears
running down the tarmac; the dry frame has only compact round halos. Both confirmed the smears sit **on the
roads** (not floating/on water/on roofs), **no blown-out warm blobs**, and both whole-city frames read as a
**balanced, coherent lit coastal city** — coastline/pier/moon/street grid intact, no z-order tears or floating
tiles; the WET flood frame stays coherent with the street network gleaming warmly. (One aside: "fairly subtle at
this zoom" — correct; it is a reflection, and it reads at the moderate zoom a coast is looked at, 159/266.)

**Perf.** Zero new path objects when dry (fixed point); WET adds one gradient smear per lit lamp (only where it is
actually raining, sparse in play). The night lamp block gains one `rainingAt(x,y)` call per lit road cell — but
the busker draw just below already calls it per road cell, so this roughly doubles an existing per-cell call, not
a path-object cost. Step-back (~345) prices the arc.

**Verdict: SHIPPED.** The night streets now mirror their lamps down the wet tarmac when a shower crosses — the
last un-enumerated reader of the rain mechanism, and the land analog of the waterfront reflection (329). Rain (Sky)
× night lamps × the road network, an interconnect across three domains. Exact fixed point when dry (DRY ≡ HEAD),
census byte-identical. Transport × Deepen. `probes/probe-wetgleam.mjs`, `probes/shot-wetgleam.mjs`.

## Iteration 342 — cat's-paws on the grass, and why they can't be seen (2026-07-17) [Nature × Deepen → EXPLORED → REVERTED]

**Vector.** Step-back #45 (@340) pointed ~342 at a measured seam (225) or a Deepen in a rotated domain (avoid
Sky/Water; Transport/People/Civic just ran ⇒ Nature/Urban rested). I ran the seam-finders first: the frozen census
tile histogram (SHOREPARK 294/294/294 and the other flat rows are audited terrain/landmarks; no dead-rule zero row —
287's `SOLARF` is now 0/0/19), the "carries no CA state" grep (only the *fixed* kelp, 282), and the tooltip table
(every tile has a LABEL+DESC; ROAD/CIVIC's missing DESC is their custom branch, not a gap). Two natural Nature/rain
Deepens were **already built** and I refuted them by reading before writing a line (the iter-34 discipline): autumn
foliage (`applySeason` ambers the deciduous canopy + `autumnFall` litter) and wet-ground darkening (the under-cloud
damp-patch blob, ~L9781, is the rainFront comment's "wet the ground"). The one genuinely-open seam, found by the 280
grep (the MECHANISM `windForce`, not a reader noun-list): **the open GRASS is the last large surface deaf to the wind
every other thing rides** — trees sway, palms/flags flap, kites fly, sails belly, smoke leans, the sea streaks into
windrows, the bunting streams (280) — while the meadow/shorepark/park grass sat as a flat fill in any weather.

**Change (built, then reverted — draw-only, no `rng()`/terrain, unreachable from `tick()`).** `grassGust(x,y,gx,gy)`
called from MEADOW/SHOREPARK/PARK/FIELD after each body fill: a **cat's-paw** — the sea's windrow on land (266). A pale
`colA('meadow',1.42,a)` ellipse, sub-hex in WIDTH (never an edge, cannot terrace — 255) and ~1.5–2 hexes LONG along the
wind, tilted off the E-W axis (or a field of streaks traces the grid), its tail trailing UPWIND over grass already
painted (draw order is depth order), gated per-hex by `hashCell` with share ∝ `windForce()`, α pulsing on a slow clock
(gusts gather and pass; too slow to strobe, 134). Day-biased (`LITAMT>0.72` → nothing, hands off to the night like the
windrow). At `windForce()==0` (dead calm, `WINDA≤0.25`) it draws NOTHING ⇒ a still frame is byte-identical to HEAD (245).

**Census.** Draw-only ⇒ tile histogram empty, `pop`/`developed`/`roads` **byte-identical (+0)**, 0 page errors, VERDICT
PASS (only the known `solarRoofs −2` tick-timing wobble, 226, not mine).

**Probe** (`probe-catspaw.mjs`, build-agnostic — hooks `ctx.ellipse` and counts the cat's-paw by its UNIQUE GEOMETRIC
signature `ellipse(0,0, len, 1.4, …)` (285: `radiusY===1.4`, a value no other ellipse forges); NO NOISE FLOOR AT ALL;
`window.grassGust=()=>{}` renders HEAD in-page, 253). 4 seeds, frozen clock: **GALE 57–66/city fires (LITAMT 0.01 =
genuinely day, 202) · CALM 0 (dead calm ≡ HEAD, exact fixed point, 245) · NIGHT 0 (day-biased, LITAMT 1.00) · HEAD
(suppressed) 0 (the ry=1.4 signature is grassGust-only — control 250 holds).** RESPONSE/DAY-BIAS/CONTROL all PASS.

**Visual — THE GATE THAT KILLED IT** (`shot-catspaw.mjs`, blind CALM/GALE A/B aimed by the cat's-paw's OWN ink (226/272),
tokens meaningless + CROSSED between seeds (238/239/268), md5-confirmed the pairs differ). **BOTH blind subagents, on
BOTH seeds, INVERTED the call** — each named the CALM (provably 0 cat's-paws) frame as the windy one, at moderate
confidence, describing "faint pale streaks" that were the meadow's own tree-shadow/texture. I looked myself (239: a
visual inversion is a cue to check the instrument, then look): the gale frame's meadow does differ — but the low-α
(~0.10) ellipse scatter **HAZES rather than MARKS** (203/215): it reads as a diffuse pale WASH over the grass that even
mildly FADES its lush green, NOT as discrete wind streaks — so the richer *un-washed* calm frame looked "more textured"
and both agents mapped that to "streaks."

**Why it can't be rescued (and why it's `polish-tile`, not a growth lap).** To read as a streak rather than a haze it
needs (a) higher contrast AND (b) a proper tapered/discrete shape (the sea windrow's cubic + `wrowHalf`, not a flat
ellipse). But a pale mark on GREEN grass bright enough to be a discrete streak reads as a **scratch/artifact** (159's
neon-tube, 214's per-edge, 215's smudge) — foam-white on teal works precisely because it is high-contrast and windrows
are a familiar sea texture; grass-wind has no foam and is subtle in reality. This is the header's own
**DEEP-BUT-INVISIBLE-AT-ZOOM** warning made manifest, and 270's rung: a defect FOUND is not a defect cleanly BUILDABLE
here — a legible tapered-streak form is a focused shape redesign, not a growth increment.

**Verdict: EXPLORED → REVERTED.** `solvista.html` byte-identical to HEAD (grassGust removed); probe + shot removed
(they reference the reverted `grassGust`). The grass-wind gap is REAL and correctly identified (280), the mechanism
fires with an exact fixed point (census + probe PASS), and it is **invisible-at-zoom as an overlay wash** — the visual
gate (two blind agents, both inverted) is the only instrument that could see this, and a passing census+probe meant
nothing for a subtle draw. ⛔ **Do not re-try grass-wind as an α-scatter overlay; if ever, it is a tapered-streak
`polish-tile` job.** Nature × Deepen. (No files added — the finding lives here, the loop's memory.)

## Iteration 343 — snow on the roofs, and why it drowns in the haze (2026-07-17) [Urban fabric × Deepen → EXPLORED → REVERTED]

**Vector.** Step-back #45 (@340) pointed ~343 at a measured seam (225) or a Deepen in a rested domain (avoid
Nature/Transport/Sky/Water; Urban needs a MEASURED seam). I ran the seam-finders: the frozen census tile histogram
(every flat/zero row is audited terrain/landmark — SHOREPARK 294/294/294, MARSH 45/45/45, no dead-rule zero), the
CIVHRS/CIVICDESC/TILEDESC tables (fully deepened — every civic kind keeps hours, every tile has a label+desc), and
`residentWhere` (pier/market/park/garden/plaza/beach/stadium/amphitheater/field/road all covered). The one genuinely-
open, MEASURED seam: **`SNOWLAND` is a TYPE SET that excludes every building type** (`EMPTY,MEADOW,FOREST,REDWOOD,
PARK,ROAD,ROCK,FARM,VINEYARD,ORCHARD,GARDEN,FIELD`), and the CA at ~L3193 forces `c.snow=0` on all non-members — so
the ONE surface a real snowfall settles on first, the flat cold roof, stayed bare in every winter of the artifact's
life (274: a type-keyed set is blind to members it never lists — here, ALL the buildings). The Urban analog of 341
(roads answering rain) — a surface deaf to a signal. Chosen over grass-wind (342) because a roof cap is HIGH-CONTRAST
and discrete, not a haze — or so I reasoned.

**Change (built, then reverted — draw-only, no `rng()`/terrain, unreachable from `tick()`).** `roofSnow(x,y)` reads
the EXISTING `c.snow` field over the building's own SNOWLAND ground neighbours (mean), returns 0 when no snow is lying
(`snowGlobal` gate); `snowCap(gx,gy,ax,ay,z,s)` draws the roof's own top-face hexagon (the first fill of prismS) at
roof height `z`, in the SAME alpha ramp + `colA` illuminant as the ground dusting (7154). One `const rsn=roofSnow(x,y)`
at the top of `drawBuilding` + one `snowCap(...)` after the RES/MID/COM roof prisms (TOWER skipped — crown-geometry
zoo, and towers' developed neighbours give ~0 snow anyway). Reads the field, writes nothing; `snowGlobal===0`
(~9/10 of the year) ⇒ every roofSnow returns 0, no cap drawn ⇒ a snowless frame is HEAD's exact bytes (exact fixed
point, 245/253). Respects "the coast stays clear" (321) by construction: a house ringed by bare sand catches nothing.

**Census.** Draw-only ⇒ tile histogram empty, `pop`/`developed`/`roads` **byte-identical (+0)**, 0 page errors,
VERDICT PASS (only the known ±1 `solarRoofs`/`greenRoofs`/`towerHt` tick-timing wobble, 226, not mine).

**Probe** (`probe-roofsnow.mjs`, build-agnostic — drives `tick()` to lay snow, reads the artifact's OWN `roofSnow`
over every building + hooks `snowCap` to confirm the draw fires; NO NOISE FLOOR AT ALL). 6 seeds: **WINTER 92–96%
of roofs capped · SUMMER 0 · HEAD (roofSnow undefined) 0 · draws win 772–927 / sum 0.** RESPONSE / FIXED-POINT /
BUILD-AGNOSTIC all PASS. ⚠ **But 92–96% is a near-BLANKET, not the gradient I designed:** the season probe showed the
snow field saturates to **cover=100%** the instant `winterMask()>0` (SNOWLERP=0.5 relaxes fast), and max daylight
during ANY snow moment is only **~0.28–0.38** (winter's day is SHORT, 261 — the coldest weeks are also the darkest).
So there is no bright, partial-snow shoulder to shoot: a snowy frame is ALWAYS dim and ALWAYS fully blanketed.

**Visual — THE GATE THAT KILLED IT** (`shot-roofsnow.mjs`, same-world blind A/B: caps ON vs `snowCap` no-op'd in ONE
page — 253/230, so the ONLY difference is the roof caps, an exact same-world A/B; tokens meaningless + CROSSED between
seeds, 238/239/268; brightest-winter-hour daylight). **BOTH blind subagents, on BOTH seeds, INVERTED the call** —
each named the BARE/HEAD frame as the snowy-roofed one, describing the CAPPED frame as "saturated terracotta" (it is
objectively BRIGHTER — mean luma 142.3 vs 140.7 / 140.4 vs 138.9, so the caps DO add white; the labelling was verified
correct). Both PASSED z-order + holistic on the closeup ("caps sit ON the roof tops, fixtures on top, no tears,
coherent winter town"). I looked myself (239/342): the whole-city winter frame reads as a **warm dusty HAZE over the
town, not a snow scene** (the ground snow at LITAMT~0.38 warm sunset is a uniform pale desaturating wash — iter 321's
own shipped look), and the roof caps are ABSORBED into that haze; the closeup reads as a normal warm sunset town, with
the pale caps INDISTINGUISHABLE from the artifact's already-pale roof palette (RES `cream`/`sage`/`coral`, COM
`whiteDk`, MID cream). Snow-white-on-already-pale-roofs, surrounded by snow-white ground, in dim warm winter light,
has no figure/ground — so it cannot read as *snow on the roofs*, only as a fractionally-paler city.

**Why it can't be rescued here (and why it's `polish-tile`, not a growth lap).** A brighter/whiter cap through a RAW
literal (not `colA`) would glow inconsistently over the dim-blue GROUND snow (195's coin / 214) and still not solve the
snow-on-snow low contrast. A legible form needs a distinct SHAPE — a crisp white roof-ridge line with a cast shadow, a
snow-load silhouette — which is a focused roof redesign, i.e. `polish-tile`, not a growth increment (342/270's rung: a
defect FOUND is not a defect cleanly BUILDABLE here). The fundamental wall: **winter snow reads as a warm HAZE, and a
cap on a pale roof adds no distinct read** — the header's own DEEP-BUT-INVISIBLE-AT-ZOOM warning, twice running.

**Verdict: EXPLORED → REVERTED.** `solvista.html` byte-identical to HEAD (helpers + `rsn` var + 3 caps removed);
probe + shot removed (they reference the reverted `roofSnow`/`snowCap`). The roof-snow gap is REAL and correctly
identified (274: SNOWLAND is blind to every building type), the mechanism fires with an exact fixed point + coherent
z-order (census + probe + closeup PASS), and it is **invisible-at-zoom as a low-contrast cap in a warm-haze winter** —
both blind agents INVERTED, the only instrument that could see this. ⛔ **Do not re-try roof-snow as a `colA`-white
cap; a legible form is a shaped-ridge `polish-tile` job. Winter is DIM + WARM-HAZE + already-pale-roofs = no snow
figure/ground.** Urban × Deepen. (No files added — the finding lives here, the loop's memory.)

## Iteration 344 — returns flattened: the growth phase has hit its wall (2026-07-18) [Survey → NO SHIP → EXPLORED → REVERTED]

**Vector.** Step-back #45 (@340) pointed ~344 at a measured seam (225), a Deepen/Polish/Interaction in a rested
domain (Civic/People, measured-seam-only), OR — explicitly — *declare returns flattened and STOP (a valid outcome)*.
Two consecutive reverts (342 grass-wind, 343 roof-snow) had just hit the same wall: a REAL deaf-surface interconnect
that is INVISIBLE-AT-ZOOM as an overlay. So the honest first job this lap was not to build — it was to **price the
remaining seam space against visibility** before spending an iteration, per the header's own DEEP-BUT-INVISIBLE-AT-ZOOM
warning and the recipe's "'one more shallow feature' is not automatically worth it."

**Survey — done BY NAME, first-hand, before writing a line (the iter-34 / 342 discipline).** The two recent SHIPS
(329 waterfront reflection, 341 wet-street gleam) are the class that works: HIGH-CONTRAST light-on-dark night
*reflections*. So I greped the artifact for every such interconnect and confirmed each already exists:
- **Sea reflections:** sun glitter (`(1-LITAMT)`-gated, day; ~L5706), the night **moonglade** (tracks the traversing
  moon, 298; ~L5298), the **waterfront reflection** (329), and the on-river current glints. Biolum surf too.
- **Road/vehicle/marine night light:** wet-street lamp gleam (341), vehicle **headlights** (the beam pools on the road,
  ~L8886; L9069 names cars/trams as already-lit), **ferry** cabin/masthead/port-starboard nav lights + water wash
  (~L9069), **freighter** lights, the **lighthouse** sweeping beam (~L6676).
- **Civic night light on hours:** `CIVHRS`→`civOpen` dims every institution's windows by its own hours (~L8044);
  `marketAmt` (285) and `matchClock` (240) gate the market/stadium; all in sync.
- **Interaction/UX:** the `ENTINFO` tooltip layer is exhaustive — every entity named, most with **live functional
  `sub`s** (ferry/launch/boat/surfer/kayak/balloon/shuttle/mono/gondola/tram/dog + the `VKIND`/`SERVDUTY` service
  vehicles), all reading the SAME predicate their draw steers by (105/249/269/278). No un-nameable entity remains.

**Census (the authoritative frozen-column seam-finder, 282/287).** Ran clean: **0 page errors**, VERDICT PASS. The
tile histogram across all three eras is healthy and MOVING (EMPTY 1354→58, MID 2→401, TOWER 0→116, PARK 76→198, …);
every FLAT/ZERO row is audited terrain or a landmark (VOID/ROCK/LIGHTHOUSE static; MARSH 14/14/14 & SHOREPARK 101/101/
101 terrain — MARSH's draw answers tide+season, 289; KELP 8/7/7, the 282-explored fixed bed). **No dead rule, no zero
row, nothing frozen-but-alive.** The entity counts show a thriving city (762 peds, 360 cars, 81 kayaks/surfers/boats,
whales/dolphins/herons/deer/balloons/copters…).

**Finding.** The additive AND the high-contrast-interconnect growth space is **EXHAUSTED**. Every seam the recipe's
finders point at (the frozen census column, the type-keyed tables, the per-cell flag lifecycles, the `tick()`/CA
passes, the animate mono-gate cliffs, the tooltip layer, the light-on-dark reflection family) is closed. The only
gaps left are the two 342/343 just proved: DEEP, correctly-identified deaf-surface interconnects (grass-wind,
roof-snow) that are **invisible-at-zoom as α-overlays** and need a shaped/tapered redesign — i.e. `polish-tile` jobs,
not growth increments (270's rung: a defect FOUND is not a defect cleanly BUILDABLE as a growth lap).

**Verdict: EXPLORED → REVERTED (a SURVEY — nothing was built).** `solvista.html` is **byte-identical to HEAD** — I
wrote no code, so there was nothing to revert; the "revert" is that the seam space was surveyed and **no vector earned
a ship**. This is a first-class outcome (recipe step 1: "declare returns flattened and STOP is valid"), and it is
recorded so 345+ does not re-run the same hunt. The loop's honest mode from here is **STEP-BACKS** (drift-watch;
~345 = #46, do it next) **+ `polish-tile`** (the shaped-ridge / tapered-streak redesigns 342/343 identified). A
genuinely new growth lap needs a NEW mechanism or domain-signal — and per 266/342/343, **price its visibility /
figure-ground BEFORE building**, because a passing census+probe means nothing for a subtle overlay: only the blind
agents can see it, and low-contrast overlays INVERT. (No files added — the finding lives here, the loop's memory.)

## Iteration 345 — forty-nine laps on, still no drift (2026-07-18) [46th step-back / holistic]

**Vector.** The header pointed here explicitly ("~345 = STEP-BACK #46, do it next"). Since #45 @340, one lap has
landed (341 wet-street gleam, draw-only); 342/343/344 all reverted/no-ship (saturation survey). A step-back is the
guardrail that lets the loop run unattended: the census catches *metric* collapse but is blind to *cumulative visual*
drift and to *permanent perf* drift, so both are measured here, not vibed. No source touched — `solvista.html`
byte-identical (a survey, not a build).

**Census + error gate.** Clean HEAD (29efb9c, through 341 + the stats commit), tree clean. `census.mjs` VERDICT PASS,
0 page errors; core `pop`/`developed`/`roads` byte-unmoved, only the usual chaotic ±1 wobble (`greenRoofs -1`,
`towerHt -1` — 226 tick-timing, not a lap). Entity counts full and healthy (peds 762, cars 360, surfers 81, etc.).

**Perf (permanent arc, PATH OBJECTS — load-immune, 198/216; `probe-drawbudget.mjs`, snow cleared per 325, mean of 3
seeds, day / night):**
- iter 285 (b523698): 110395 / 138088 · iter 339 (8c34523): 111762 / 139698 · **HEAD 341 (29efb9c): 111504 / 139806.**
- **Long arc vs 285 (~60 laps): day +1.00% (+0.017%/lap), night +1.24% (+0.021%/lap)** — well under +0.2%/lap.
- **Recent arc vs 339 (1 shipped lap, 341): day −0.23%, night +0.08%** — flat. 341's gleam is dry-gated (0 path
  objects when dry), so it adds nothing at the probe's pins. **No perf-fix lap needed.**

**Visual (whole-frame, 3 lights × 2 calendars × 2 seeds, `shot-stepback.mjs`, clock frozen in-page).** One blind
subagent per seed, cumulative question. Both seeds independently **PASS**:
- **City coherent & balanced** across all frames — dense inland towers → mid-rise ring → farm/park/river belt →
  beach/pier/wheel/turbines/sea — reads as one California coastal city; no wallpaper band, no muddy district, nothing
  blown-out. Seed 42 explicitly: tower field "dense but retains roof-color and height variation, not a repeating carpet."
- **No z-order tears, floating tiles, or detached glows** — piers/wheel/turbines on their hexes, rail/pylons/bridges
  connect end-to-end, night buoy lights have plausible sources.
- **Night coast coherent lit-city-and-water** — warm window grids, street/rail lamps, red/green buoys, moon + reflection
  on deep-blue water, lit pier — not a flat void (kelp/coast-darkening class stays closed, 282).
- **Seasonal discriminating pair resolves blind on BOTH seeds** (264): dusk-summer sun UP (warm, lit, teal sea),
  dusk-winter — SAME instant — sun DOWN (dark, crescent moon + stars, lamp-lit, dimmer sea). Unmistakably two seasons.
- **Watch item (STILL soft, unchanged from #45):** inland tower core is dense — do NOT add raw downtown density (217/
  224/228 crown-not-picket family). Not worsening: this lap both agents called it varied, not wallpaper.

**Instrument nits (banked, not chased — per #45).** Frames self-report `GWARM=0` and `HUD=STALE` at golden/dusk; these
are the known fixed-pin caption artifacts (`shot-stepback` derives the golden pin on a clear page but shoots the warped
overcast world; `phaseWord`-vs-`clockWord` mismatch). Pixels ARE warm and agents PASS — do NOT re-chase (340 measured
this out fully; GWARM machinery is alive, 0.6–0.78 clear-sky, muted by overcast at the pinned years).

**Verdict: STEP-BACK #46 — NO DRIFT.** City healthy and beautiful across 3 lights × 2 seasons on 2 seeds; day-length
season alive; night ordering / golden-greens / sea-quilt facts hold (unre-measured — no lap since #44 touched their
surfaces). Permanent draw arc negligible (+0.02%/lap, flat recent window). Guardrail reset — next ~346 is a
`polish-tile` redesign (342/343's shaped-ridge / tapered-streak) or STEP-BACK #47. Nothing to fix. (No files added —
the finding lives here, the loop's memory.)

## Iteration 346 — the frozen-column seam-finder, made a standing tool (2026-07-18) [survey]

**Vector.** Cross-cutting / Interaction-with-the-harness. #46 (@345) just cleared the drift-watch, so #47 is too soon,
and 342/343/344 already established the growth phase has hit its wall. Rather than re-run 344's survey verbatim, I
worked the header's OWN #1 seam law from a fresh angle and left a durable artifact behind. No source touched —
`solvista.html` **byte-identical to HEAD** (a survey, not a build).

**What I actually did — three of the recipe's finders, run BY NAME, one of them now a probe:**
1. **Frozen census column (282/287's "READ IT FIRST").** The recipe calls this the #1 seam-finder, but there was no
   *tool* for it — `census.mjs` only prints types that CHANGED vs a baseline, and only SUMMED, so a dead-flat-in-every-
   era row is invisible to it. I wrote **`probes/probe-frozencol.mjs`** (pure world data via `__census().tiles`,
   per-era × summed-over-seeds, flags FLAT and ZERO rows) and banked it. Result on seeds 7/42/1234: every FLAT row is
   audited terrain — SHOREPARK 294/294/294 (coastal band), ROCK 80/80/80, MARSH 45/45/45 (289: terrain, draw answers
   tide+season), LIGHTHOUSE 3/3/3, VOID (off-plate). **No dead rule, no ZERO row.** KELP reads **28→33→31 — it MOVES**,
   which is 282's fix visible in the census (HEAD before 282 was a stamped-once flat bed). Everything that should grow
   grows (MID 10→1234, TOWER 0→329, PARK 230→569, SOLARF 0→19, MARKET 0→16, DUNE 62→110).
2. **Tooltip-table sync (invariant).** Diffed the `T` enum (32 members) against `TILELABEL`/`TILEDESC` and the civic
   kinds against `CIVICLABEL`/`CIVICDESC`: **complete**, every drawn tile/civic named and described (ROAD/CIVIC handled
   specially in `describeTile`). No un-named type.
3. **Per-cell flag lifecycle (281's "fourth seam").** Grepped every flag's writer/veto/draw/tooltip:
   `hstr`/`loft`/`corner`/`bridge`/`riv`/`treed`/`fete`/`civ`/`wear`/`snow`/`solar`/`groof`. All correct — each has an
   intentional, commented ride/die rule (e.g. `hstr` deliberately rides COM→TOWER as a retail podium under the tower,
   line ~7958; `loft` cleared on fire→BURNT; `corner` cleared when `!HOMES.has(c.t)`). **No writer skips a type its
   veto still counts.**

**Census + error gate.** VERDICT PASS, 0 page errors; core `pop`/`developed`/`roads` byte-unmoved (baseline == current,
+0/+1 chaotic wobble only). `probe-frozencol` self-verifies (its KELP column re-proves 282 lives).

**Finding.** Confirms 344/345 from a *different* instrument (255's "a cue re-confirmed is only corroborated if a
DIFFERENT instrument did it"): the additive and high-contrast-interconnect space is EXHAUSTED and every seam the
finders point at is closed. The one durable output is the banked probe — the header's #1 method is now one command for
every future lap, instead of the ad-hoc build 342/344 each re-derived.

**Verdict: EXPLORED → REVERTED (a SURVEY — nothing built in the city).** `solvista.html` byte-identical; the "revert"
is that no vector earned a ship. Durable artifact: `probes/probe-frozencol.mjs` (harness tooling, not a city change).
Honest mode from here is unchanged — **STEP-BACKS** (next ~350 = #47) **+ `polish-tile`** (342/343's shaped-ridge /
tapered-streak deaf-surface redesigns). A new growth lap still needs a NEW mechanism or domain-signal, visibility
priced FIRST (266/342/343).

## Iteration 347 — the strike lights the ground it hits (2026-07-18) [Sky & atmosphere × Deepen/interconnect → SHIPPED]

**Vector.** 344/345/346 declared the growth phase saturation-bound and named the honest mode as step-backs +
`polish-tile`. But #46 (@345) was two laps ago (too soon for #47), and re-running a fourth consecutive survey adds
nothing. The one live path the header leaves open is *a genuinely NEW mechanism or domain-signal, visibility priced
first* — and 341 had just shown the saturation note can be wrong (the rain mechanism had an un-wired ROAD reader). So
this lap grepped, first-hand, for a **HIGH-CONTRAST interconnect the reflection-family survey missed**, and found one
in the sky's most dramatic event: **328's lightning bolt grounds at `[foot,cy]` but the terrain it hits stays dark.**
A strike that lands and illuminates nothing is a half-built feature — completing it is a coherent Deepen, not a new
deaf-surface overlay, and it is inherently HIGH-CONTRAST (bright bluish-white on dark storm-dusk ground: the 329/341
class that ships).

**Change (draw-only, ~17 lines).** Inside the strike's `if(bolt>0.22)` block (~L9929), before the bolt strokes, a soft
radial **pool of light on the ground** at the bolt's landing point `[foot,cy]`, SQUASHED to the ground plane
(`scale(1,0.42)`) so it reads as illumination lying ON the terrain rather than a floating orb (291). Rides the SAME
`bolt` intensity (`gi=min(0.5,bolt*0.6)`), drawn UNDER the strokes so the crisp bolt core sits over its own glow; a
light SOURCE, so a raw literal never `col()` (279); a gradient to alpha 0, never a flat arc (195); deterministic in
`time`+cloud (no rng); inside the on-plate guard, so it can never light the void (248). Added a `GFLASH` suppressor
(next to `LIGHTN`) so a probe can isolate JUST the pool from the bolt in one page, floor 0 (253).

**Census + error gate.** VERDICT PASS, 0 page errors. Draw-only, no terrain, no `rng()` ⇒ core byte-flat (the
histogram is the pre-existing city; the diff is 17 lines of `ctx`). Perf: the pool draws only when `bolt>0.22`
(a rare wet-storm-at-dusk flash peak), so it contributes ~0 path objects at the perf gate's fair-weather pins — free.

**Probe (`probes/probe-groundflash.mjs`).** Pins the same on-plate wet-storm flash peak `probe-strike` uses; DUAL
isolation in one page (floor 0): `GFLASH=1 vs 0` → the POOL alone (the new ink), `LIGHTN=1 vs 0` → the whole flash+bolt
(the INCUMBENT bar, 226 — no threshold invented). Result: **POOL peak amplitude 80 (s42) / 78 (s7) — bright**, located
tightly at the strike foot on the terrain (centre y~607/513, box below BAND 340), **17% / 20% of the incumbent bolt's
ink**, and **ZERO in dry weather** on both seeds (a strike-only effect correctly absent in fair weather, sharing the
strike's storm bar).

**Visual (`probes/shot-groundflash.mjs`).** Blind A/B in ONE build — pool ON (`GFLASH=1`) vs pool OFF (`GFLASH=0` =
exactly what HEAD draws) — so no build swap, no cross-build floor. Meaningless tokens, map CROSSED between seeds
(238/239/268; md5-distinct pairs confirmed). BOTH blind agents, one per seed, **correctly named the pool variant on the
crossed map** (s42 kappa=ON→"kappa"; s7 sigma=ON→"sigma") and returned **VISUAL: PASS**: the pool "hugs the terrain
hexes around the bolt's foot, spreading outward as cast light, soft and bluish-white, no floating orb or z-order tear,
not blown out"; both frames still read as a coherent stormy-dusk coastal city. A genuine blind identification, not a
positional guess.

**Verdict: SHIPPED (DEEPENED).** Completes 328's strike — the bolt now lights what it hits. **This refutes 344/346's
"high-contrast interconnect space is EXHAUSTED": the miss was a HALF-BUILT feature's own logic (a light SOURCE, not a
standing reflection), which the reflection-family enumeration structurally could not see.** The reusable finding is in
the header's NEXT VECTOR: grep shipped features for a draw that *lands / emits / casts and then stops*. No new SKILL.md
law (every law used — 279/195/291/248/253/226/238 — is already promoted). Banked `probes/probe-groundflash.mjs` +
`probes/shot-groundflash.mjs`.

## Iteration 348 — a fire lights the ground it sits on (2026-07-18) [Water & coast × Deepen/interconnect → SHIPPED]

**Vector.** 347 completed the lightning strike's half-built logic (a bolt that grounds but lights nothing it hits) and
banked the reusable finding as the header's NEXT VECTOR: *grep shipped features for a draw that lands / emits / casts
and then stops.* Ran that grep across the emitters (`createRadialGradient`, `glow`, fire). The **beach bonfire**
(~L6096) is the exact same half-built shape 328's bolt was: it draws an 8px self-glow *at the flame* (`arc(cx,cy-2,8)`)
but the dark night sand around it stays dark — a fire that illuminates nothing it stands on. Completing it rotates the
domain (Sky→Water/coast), is nightly-visible (far more than 347's rare storm), and is inherently HIGH-CONTRAST (warm
firelight on dark night sand: the 329/341/347 warm-on-dark class that ships, figure-ground priced first per 266).

**Change (draw-only, ~14 lines).** Before the flame/halo, a warm firelight **pool cast ON the sand**: a radial gradient
SQUASHED to the ground plane (`translate(cx,cy+0.5); scale(1,0.4)`, r=12) so it reads as light lying on the sand rather
than a floating orb (291/347); drawn FIRST so the crisp flame and logs sit over their own glow; a raw emissive literal,
never `col()` — a fire is a light SOURCE, not a reflector (279/257); a gradient to alpha 0, never a flat arc (195);
flickers on `time` (broad slow, distinct from the flame's), grows with the night on `LITAMT`, deterministic (no rng).
Kept tight within the cell, so a nearer row occludes it together with the fire (drawFire's own z-order rule, ~L7260).
Added `FIREPOOL` (the new pool) and `FIREGLOW` (the incumbent flame-halo) suppressors so a probe can isolate each in
one page, floor 0 (253/347's dual isolation).

**Census + error gate.** VERDICT PASS, 0 page errors. Draw-only, no terrain, no `rng()` ⇒ core byte-flat, histogram
empty. Perf: the pool draws only inside the existing bonfire gate (`v∈(0.42,0.47)` beach cells at `LITAMT>0.5`), a
handful of cells at night ⇒ ~0 path objects at the fair-weather perf pins — free.

**Probe (`probes/probe-firepool.mjs`).** DUAL isolation in one page (floor 0, build-agnostic): `FIREPOOL=1 vs 0` → the
POOL alone (the new ink); `FIREGLOW=1 vs 0` → the flame's own halo (the INCUMBENT bar, 226 — no threshold invented).
Result: **POOL 476px (s42) / 299px (s7), peak 31/33, 62% / 67% of the incumbent halo's ink** — a substantial,
grounded warm pool at the fires' feet; and **0px / 0 ink by DAY** (LITAMT=0.02, the bonfire gate false ⇒ the free
dead-regime control, 199) on both seeds.

**Visual (`probes/shot-firepool.mjs`).** Blind A/B in ONE build — `FIREPOOL=1` vs `FIREPOOL=0` (=HEAD) — so no build
swap, no cross-build floor. Meaningless non-ordinal tokens, pool/no-pool map CROSSED between seeds (238/239/268;
md5-distinct pairs confirmed). BOTH blind agents, one per seed, **correctly named the pool variant on the crossed map**
(s42 orin=ON→"orin"; s7 vael=ON→"vael") and returned **VISUAL: PASS**: the pool is "a horizontally-elongated amber
ellipse on the sand… flat and squashed, hugging the ground plane at the fire's base, not a floating orb", warm amber
(R>G>B), not blown out (max R ~212, 0 near-white px); the whole-city frames differ ONLY along the coastline where
bonfires sit — no z-order tears, floating tiles, blown-out colour or clutter anywhere; both still read as a coherent
night coastal city. A genuine blind identification, not a positional guess.

**Verdict: SHIPPED (DEEPENED).** Completes the bonfire the way 347 completed the strike — the fire now lights the sand
it stands on. Second confirmation of 347's reusable finding: a shipped emitter that casts onto itself and stops is a
live, high-contrast Deepen the saturation surveys miss. No new SKILL.md law (every law used — 279/257/195/291/248/253/
226/199/238/239/268 — is already promoted). Banked `probes/probe-firepool.mjs` + `probes/shot-firepool.mjs`.

## Iteration 349 — the channel marks mirror their flash (2026-07-18) [Water & coast × Deepen/interconnect → SHIPPED]

**Vector.** 347/348 shipped the reusable finding — *grep shipped features for a draw that lands/emits/casts and then
stops* — and banked it as the header's NEXT VECTOR. Ran that grep across the water light sources. The **channel buoy**
(`drawBuoy`, ~L9045) flashes a red/green lamp to seaward at night (`LITAMT>0.28 && sin(time*1.4+ph*2)>0.25`, a 5px
radial glow at the topmark) — but the dark harbour water directly below it stayed dark. It is the LAST un-enumerated
water light source with no reflection (271/280 enumerate-the-category): the ferry & launch nav-lights cast "a soft wash
on the black water below" (179), the moon reflects, and 329 reflects the whole lit waterfront — only the channel marks
flashed over a dead-flat sea. Rotates the *kind* off 347/348's warm diffuse ground-pool → a COLOURED SPECULAR water
reflection (the 179/329 family). Visibility priced first (266): coloured-on-near-black is the high-contrast class that
ships (329/341/347/348).

**Change (draw-only — no `rng()`, no terrain, unreachable from `tick()`; ~14 lines).** Inside the existing flash gate,
before the lamp glow: a coloured reflection cast ON the water below the mark. A radial gradient (r=4.6) SQUASHED and
STRETCHED toward the viewer (`translate(cx,y0+6.8); scale(0.52,1.8)`) → a LONG vertical smear that survives the
downscale to fit zoom (266/341), not a flat wash that would terrace/vanish. RAW literal red/green — reflected light is
not albedo, never through `col()`/TINT (257/329, the same reason the lit windows take a raw literal). Gradient to alpha
0, never a flat arc (195). Peak α `0.58*LITAMT*sh` where `sh=0.74+0.26*sin(waveT*1.3+ph)` breathes with the swell (329),
floored high so it never blinks out. Drawn on the water below the body, so it flashes ON with the light and vanishes
with it — the reflection IS the flash's mirror. DUAL suppressors `FLASHREFL` (the new reflection) / `FLASHGLOW` (the
incumbent lamp flash) so a probe isolates each in one page, floor 0 (253/347/348's dual isolation).

**Census + error gate.** VERDICT PASS, 0 page errors. Draw-only ⇒ tile histogram empty, `pop`/`developed`/`roads`
**byte-identical (+0)** (only the known `greenRoofs/towerHt −1` tick-timing wobble, 226, not mine). Buoys **45** across
the 9-cell matrix (5/city) — the host exists at scale. Perf: the reflection draws only inside the existing flash gate
(a handful of buoys, intermittently, at night) ⇒ ~0 path objects at the fair-weather perf pins — free.

**Probe (`probes/probe-buoyreflect.mjs`).** DUAL isolation in one page (floor 0, build-agnostic): `FLASHREFL=1 vs 0` →
the REFLECTION alone (the new ink); `FLASHGLOW=1 vs 0` → the lamp's own flash (the INCUMBENT bar, 226 — no threshold
invented). Result at the night flash peak: **REFL 49–51px, peak 50–62, 17% of the incumbent flash's ink** (the same
band as 347's shipped ground-flash, 17–20%), located tightly below each flashing buoy on the water (centre y~482/501,
box below the lamp); and **0px / 0 ink by DAY** (LITAMT 0.02, the flash gate false ⇒ the free dead-regime control, 199)
on both seeds. ⚠ FIRST CUT WAS TOO FAINT (3%, 17px, peak 23) — the header's exact 266 warning that a subtle overlay
won't read; strengthened α 0.38→0.58, size, and a shimmer floor before the visual gate. BUOYREFLECT: PASS.

**Visual (`probes/shot-buoyreflect.mjs`).** Blind A/B in ONE build — reflection ON (`FLASHREFL=1`) vs OFF (`=0` = exactly
HEAD) — no build swap, no cross-build floor. Aimed by argmax of the reflection's OWN ink at the brightest flashing buoy
(226/272). Meaningless non-ordinal tokens, on/off map CROSSED between seeds (238/239/268; md5-distinct pairs confirmed).
BOTH blind agents, one per seed, **correctly named the reflection variant on the crossed map** (s42 orin=ON→"orin";
s7 vael=ON→"vael") and returned **VISUAL: PASS**: below each red/green buoy a "soft red/green vertical smear streaking
DOWN onto the dark water… tapering as it descends… sits ON the water directly below the mark, attached at the
waterline, not detached"; lamp cores saturated but not blown to near-white; no z-order tears, floating tiles or
detached glows; both whole-city frames read as a balanced, coherent night coastal city. A genuine blind identification,
not a positional guess.

**Verdict: SHIPPED (DEEPENED).** Completes the channel buoy the way 347 completed the strike and 348 the bonfire — the
mark now mirrors its own flash on the water it floats on. Third confirmation of 347's reusable finding, and it closes
the water-reflection CATEGORY (271/280): every night light on the harbour water now reflects. No new SKILL.md law
(every law used — 279/257/195/266/329/248/253/226/199/238/239/268 — is already promoted). Banked
`probes/probe-buoyreflect.mjs` + `probes/shot-buoyreflect.mjs`.

## Iteration 350 — sixty-four laps on, still no drift (2026-07-18) [47th step-back / holistic]

**Vector.** The header pointed here explicitly ("~350 = STEP-BACK #47, DO IT NEXT"). Since #46 @345, four laps have
landed: 346 (frozen-column survey, no-ship) and the three half-built-emitter completions 347/348/349 (grounded strike /
bonfire / buoy light-pools, all draw-only Deepen). A step-back is the guardrail that lets the loop run unattended — the
census catches *metric* collapse but is blind to *cumulative visual* drift and to *permanent perf* drift, so both are
measured here, not vibed. No source touched — `solvista.html` byte-identical to HEAD (5e06907, iter 349); this is a
survey, not a build.

**Census + error gate.** Clean HEAD, tree clean. `census.mjs` VERDICT PASS, 0 page errors; core `pop`/`developed`/
`roads` byte-unmoved (195508 / 6056 / 5727), only the usual chaotic ±1 wobble (`solarRoofs +1`, `greenRoofs -1`,
`towerHt -1` — 226 tick-timing, not a lap). Entity counts full and healthy (peds 762, cars 360, surfers 81, kayaks 81,
buoys 45, boats 81, etc.).

**Perf (permanent arc, PATH OBJECTS — load-immune, 198/216; `probe-drawbudget.mjs`, mean of 3 seeds, day / night):**
- iter 285 (b523698): 110335 / 138169 · iter 345 (dfec964, #46): 111672 / 140004 · **HEAD 349 (5e06907): 111732 / 139810.**
- **Long arc vs 285 (~64 laps): day +1.27% (+0.020%/lap), night +1.19% (+0.019%/lap)** — well under +0.2%/lap, and
  bang on #46's +0.017–0.021%/lap.
- **Recent arc vs 345 (4 laps, 3 shipped): day +0.05%, night −0.14%** — flat. 347/348/349's light-pools are all
  condition-gated (dry/flash/fire) and gradient-only, so they add ~nothing at the probe's pins. **No perf-fix lap needed.**

**Visual (whole-frame, 3 lights × 2 calendars × 2 seeds, `shot-stepback.mjs`, clock frozen in-page).** One blind
subagent per seed, cumulative question. Both seeds independently **PASS**:
- **City coherent & balanced** across all frames — dense inland towers → mid-rise ring → farm/park/river belt →
  beach/pier/wheel/turbines/sea, reading as one California coastal city; no wallpaper band, no muddy district, nothing
  blown-out. Both agents called the tower field varied (roof-color + height variation), not a carpet.
- **No z-order tears, floating tiles, or detached glows** — piers/wheel/turbines/buoys/boats on their hexes;
  night window-lights, street/junction/pier lamps and buoy lights all track an actual source (no orphaned glow).
- **Night coast coherent lit-city-and-water** — warm window grids, amber lamps, red/green buoys, moon + reflection on
  deep water; beach/coast strip stays dark (seed 7's small orange campfire dots on sand are 348's bonfire light-pools,
  correct) — not a flat void, and no unlit surface glowing (kelp/coast-darkening class stays closed, 282).
- **Seasonal discriminating pair resolves blind on BOTH seeds** (264): dusk-summer sun UP (warm, brighter, teal sea),
  dusk-winter — SAME instant — sun DOWN (dim, crescent moon + stars, lamp-lit). Unmistakably two seasons.
- **Watch item (STILL soft, unchanged from #45/#46):** inland tower core is dense — do NOT add raw downtown density
  (217/224/228 crown-not-picket family). Not worsening: both agents called it varied this lap too.

**Instrument nits (banked, not chased — per #45/#46).** Frames self-report `GWARM=0` and `HUD=STALE` at golden/dusk —
the known fixed-pin caption artifacts (`shot-stepback` derives the golden pin on a clear page but shoots the warped
overcast world; `phaseWord`-vs-`clockWord` mismatch). Pixels ARE warm and both agents PASS; do NOT re-chase (340
measured this out fully).

**Verdict: EXPLORED → REVERTED (a SURVEY — nothing built in the city).** `solvista.html` byte-identical. STEP-BACK #47:
**NO DRIFT.** City healthy and beautiful across 3 lights × 2 seasons on 2 seeds; day-length season alive; night ordering
/ golden-greens / sea-quilt facts hold (unre-measured — no lap since #44 touched their surfaces). Permanent draw arc
negligible (+0.02%/lap, flat recent window). Guardrail reset — the additive + high-contrast-interconnect space stays
SPENT (346), so honest mode from here is **`polish-tile`** (342/343's shaped-ridge / tapered-streak deaf-surface
redesigns) **or STEP-BACK #48** (~355). A new growth lap still needs a NEW mechanism/domain-signal, **visibility priced
FIRST** (266/342/343). Nothing to fix.
