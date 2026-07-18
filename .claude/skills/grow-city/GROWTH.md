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
| **Water & coast** | 6, 10, 12, 16, 20, 33, 106, **169**, **296** | 90, **282** | 17, 25, 51, 65, 72, **113**, **123**, **159**, **196**, **245**, **257**, **289**, **303**, **311**, **322**, **329**, **334**, **348**, **349** | 22, ~~**205**~~ | | U2, 44, 58, 79, **116**, **132**, **150**, **185**, **214**, **223**,  **234**, ~~**255**~~, **266**, **268**, **275**, ~~**360**~~ | **97**, **141**, **176** |
| **Urban fabric** | 32, 62, **295** | 7, 23, ~~82~~, **151**, **281** | 38, 54, 68, 92, **165**, **173**, **189**, **199**, **209**, ~~**218**~~, **219**, ~~**254**~~, **267**, **288**, **309**, **316**, ~~**332**~~, ~~**343**~~ | 47, **109**, ~~**160**~~ | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103**, **110**, **118**, **124**, **143**, **180**, **216**, **220**, **224**, **228**, **235**, **239**, **274**, **302** | **133**, **327** |
| **Transport** | 2, 9, 21, 31, 48, **164**, **297** | 77, **283** | 28, 39, 55, 63, **112**, **121**, **128**, **155**, **179**, **193**, **230**, **249**, **258**, **269**, ~~**312**~~, **341** | 5, 15, **138**, **211**, **276** | U4 | U1, U3, 70, 85, 87, 94, **146**, **188**, ~~**203**~~, **241**, **243** | **105**, **171**, **290** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107**, **326** | 36, 59, 66, 80, 91, **149**, **158**, **175**, ~~**195**~~, **213**, **244**, **250**, **259**, **277**, **285**, **292**, **307**, **338**, **339** | 45, **204**, **319** | | 73, ~~**114**~~, **168**, **231**, ~~**270**~~, **299** | 52, 122, **140**, **184** |
| **Sky & atmosphere** | 27, 43, **291**, **331**, ~~**359**~~ | **321** | 19, 35, 50, 57, 95, **135**, **153**, **161**, **181**, **190**, **208**, **225**, **236**, **253**, **261**, **280**, **284**, **298**, **305**, **313**, **328**, **347**, ~~**352**~~ | | | 61, 81, 89, **115**, **200**, **242**, **248**, **265**, ~~**273**~~ | ~~**134**~~, **144** |
| **People & activity** | 41, 56, **127**, **170**, **186**, **293** | 49, **324** | 34, 64, 93, **104**, **119**, **145**, **178**, **201**, **210**, **240**, **247**, **262**, **271**, **286**, **306**, **314**, **317**, **318**, **336**, **337** | 78, **111** | | 84, **137**, **163**, **226**, **300** | 71, **154**, **191**, **278** |

- **Interaction/UX** (inventory + the `<meta charset>` repeal archived at 270; both are INVARIANTS in SKILL.md). What
  steers: when adding an entity array, `stamp()` it in its draw + add an `ENTINFO` row (same discipline as the census
  hook) — `stamp()` also draws the focus ring, so any stamped entity is ringable free. **An `ENTINFO` `sub` may be a
  FUNCTION of the entity (105)** — use it when a thing's interest is its *membership* (line/route/depot), computed live.
- ✅ **THE TRIM METHOD** (paid 279, again 280): a block is cuttable when its **LAW is in SKILL.md** and its **ARTIFACT
  FACTS compress to their imperatives**; a *superseded* warning is free to cut (280's `__setWind` retired 275's).
  There is never a block you can simply *delete* — **compress the oldest, and pay for your OWN additions in the same lap.**
- **ROTATION.** Last: **361 - FLAG-LIFECYCLE SEAM (281) CLOSED: `hstr` clean, all per-cell flags audited / NO SHIP** (Urban × grep).
  Fresh corroboration of the fixpoint via a seam 353–360 skipped: `hstr` (the one un-audited flag) rides COM→TOWER as the
  retail podium and has NO veto ⇒ no 281-tell; the FOURTH grep-the-seam class is now exhausted. Prev:
- **360 - CUE (ay) WINDROW LENGTH CLOSED BY CONSTRUCTION / structural NO SHIP** (Water & coast × Polish). Last OPEN cue
  RESOLVED: a legible near-shore windrow is z-order-forbidden — 266's tail must trail the NW draw-quadrant but the sea is
  the EAST half-plane (`SHOREX=CTRX+11`), so westward fetch is shore-bounded ⇒ coastal stubs are geometry not tuning;
  residual = fit-invisible cull = `polish-tile`. **⇒ OPEN cue list EMPTY; PAUSE — frozen source `b9dbdb8e`.** Full entry below.
  Prev: **359** additive NEW-ELEMENT angle closes too — night festival fireworks pre-exist (iter 319, L4736/9716) ⇒ ten
  angles dry (grep-only NO SHIP). **358** WINDA readers fully enumerated (no surface deaf to wind); atmospheric
  perspective absent but dead-by-construction = HAZE. **357** snow-cap conifer crowns REVERTED (a real miss — crowns
  ignore `c.snow` — but ~0.05% of frame at FIT; ⛔ winter per-object caps can't clear figure/ground at fit; *a FOUND seam
  is not a SHIPPABLE one — PRICE VISIBILITY AT FIT*). **356/355** generative surveys, all candidates PRE-EXISTING
  (emitter/behavioral/specular night axes saturated). **354/353** comment-tell + type-keyed-TABLE seams clean/sound (no
  282/280/285/288 tell). Full text of each in ledger/archive.
  Prev: **352** whole-scene lightning FLASH = HAZE / REVERTED (⛔ whole-scene flat overlay dead; 260 on a flash, law in
  SKILL.md). **351** half-built/keeps-no-hour vein dry (🆕 loose `birds` fade α0.15 not roost = polish-tile). Prev:
  **350 — STEP-BACK #47 / NO DRIFT** (3 lights × 2 seasons × 2 seeds blind-PASS; core byte-flat; perf +0.020%/lap day vs
  285 over ~64 laps. ⚠ Watch: inland tower core dense but NOT wallpaper — do NOT add raw downtown density.) Prev:
  **349** channel marks mirror their flash / SHIPPED (✅ CLOSES water-reflection CATEGORY 271/280) · **348/347** fire &
  strike light their own ground (emitter-vein #2 & #1; `FIREPOOL`/`GFLASH`) · ~~**343/342**~~ snow-on-roofs · cat's-paws
  ⛔ INVISIBLE-AT-ZOOM, polish-tile only · **341** wet streets mirror their lamps (rain's road reader). Prev (Deepen/shipped, byte-flat, laws in SKILL.md,
  full text in ledger/archive): **338/339** festival cloth on `windForce` · **336/337** RAIN-AWARE CROWDS on `dryAt`
  (category CLOSED, hold-out BEACH ⛔) · **334** SAIL BELLIES (WINDA-over-water DONE ⛔) · **333** fire smoke leans ((bj)
  CLOSED, 🆕 (bc) fire-glow z-order future) · ~~**332**~~ CHIMNEY WOODSMOKE ⛔ INVISIBLE, DO NOT RE-TRY · **331** high jet
  (does NOT parallax) · **329** waterfront reflection on `shoreGlow` · **328** the strike · **327** facade tile pick ·
  **326** civic square · **STEP-BACKS #42–#44 @325/330/335** (NO DRIFT) · **324–319** (desire
  paths · wildflowers · whales · SNOW `c.snow` ⚠ warp=61 freezes it ON · civic) · People **318/317** · Urban **316**
  (⛔ DISTRICTS' `tick()` vote is a STREAM-PRESERVING VESTIGE — do NOT delete). ✅
  **EXCITABLE-MEDIA CATEGORY COMPLETE** (bloom 263 · shroom 272 · party 314). ➡ **NEXT VECTOR: the growth vein is DRY
  from ELEVEN angles and SOURCE IS BYTE-FROZEN since 349 — additive, interconnect, large-surface AND the last polish cue
  ((ay), CLOSED BY CONSTRUCTION at 360) are all closed/bounded; the OPEN cue list is EMPTY. STEP-BACK #48 must WAIT until
  an actual ship drifts the bytes (re-shooting #47's identical frames buys nothing). Honest mode is `polish-tile`**
  (342/343 shaped-ridge / tapered-streak deaf-surface redesigns; the (ay) windrow stub-cull is a fit-invisible polish)
  **or genuinely NEW: a mechanism/domain-signal-reader that is HIGH-CONTRAST and figure/ground LOCAL** (emitter CLOSED
  3-for-3 347/348/349; arrive+idle/spawn-completion DRY 351; whole-scene-flash REVERTED as haze 352; winter per-object
  cap a firm NO 357; WINDA + atmospheric-perspective closed 358 — do NOT re-try any "whole-scene X" flat overlay, winter
  cap, or subtle whole-plate wash) — PRICE VISIBILITY / figure-ground FIRST (266/342/343/352). Additive space SPENT (331).**
  **⇒ RECOMMEND PAUSING the loop until source drifts (a `polish-tile` ship) or a user vector / Scale swing arrives.**
  ⇒ ⚠ **A passing census+probe means NOTHING for a subtle overlay — only the blind agents do. A HIGH-CONTRAST LOCAL
  interconnect ships (341); a LOW-CONTRAST or WHOLE-FRAME one (snow/pale/haze/352's flash) HAZES. Figure/ground FIRST (266/342/343/352).**
  ⚠ **TRANSPORT ENTITY/ADDITIVE SEAMS SATURATED** (304/312/329; hairline cues = ⛔ `polish-tile`; but 341 found a CROSS-DOMAIN seam the note missed — the rain had no ROAD reader, 280).
  ✅ **SPENT/CLOSED — full entries in ledger, laws in SKILL.md; the load-bearing fact is per-domain SATURATION:**
  **NATURE** additive spent (301 deer), Polish paid (294); next = grep the tick()/CA seam (287/279). **URBAN**
  tooltip/flag/TABLE SATURATED (295/302), Interaction/UX ran (133/**327**) ⇒ take no Urban vector without a measured
  seam. **PEOPLE** FULLY ROTATED across kinds (Deepen 14-deep · Polish 300 · Interaction 278 · New CA 324) ⇒ measured
  seam only. **CIVIC** additive COMPLETE (292), Connect measured-sound (285 civic mile — do NOT "fix"), stale = **New
  CA rule (36/107)** — but that just RAN (326), so next Civic = seam/Deepen. **SKY** additive now SPENT (352 reverted the
  last lightning interconnect, whole-scene flash = haze; system COMPLETE as local). **TRANSPORT** all seams dry (304); its two named cues are the 0.5px hairline
  `polish-tile` family ⛔, stale = **New CA rule (77)**. Every animate draw now *verifiably* off the 262 cliff (300 the last).
  ➡ **OPEN cues: NONE** — (ay) windrow LENGTH **CLOSED BY CONSTRUCTION at 360** (a legible near-shore row is
  z-order-forbidden: 266's tail must trail the NW draw-quadrant, but the sea is the EAST half-plane, so westward fetch
  is shore-bounded ⇒ coastal stubs are geometry, not tuning; residual = fit-invisible stub cull = `polish-tile`).
  ✅ **CLOSED (laws in SKILL.md):** (ay) 360 · (ba) 327 · (az) 314 · (bh) 317 · (bd) 284 · (au) 302 · (ax)+(bg) 294 · (bf) 299 · **(bj) 333**.
  🔑 **225'S GREP-THE-SEAM LAW IS 26 FOR 26 AT *FINDING*** (terse; full text in each numbered entry, laws in SKILL.md):
  300 the last global-`LITAMT` cliff (neon crowd stood all night) · 288 a FLAG the type-keyed TABLE couldn't reach on a
  TOWER · 287 `SOLARF` fully drawn yet NEVER ONCE existed (frozen census column caught it) · 285 the MARKET kept no hours
  (`CIVHRS` keys `c.kind`; a MARKET is a TILE TYPE) · 283 a contagion that ate 94% of its host ("Boulevard" the default
  street) · 282 a `tick()` pass firing on tick 1 then dead 812 ticks · 281 a flag whose WRITER skipped a type its VETO
  counted · 280 a comment enumerating its own category · 278 a comment conceding the defect while justifying a workaround
  · 277 census scalars vs placard · 267 a rule that NEVER RAN · 268 a seabed from the wrong noise · 269 a tram at 1.04x
  on its named avenue · 271 nine surfers who never went home · 272 an autumn CA that blinked the wood as ONE · 274 a
  feature that never told the TYPE-KEYED TABLES it existed · 276 the BUS blind to its own stop network — **AND 270 IS THE
  FIRST DEFECT IT COULD NOT *FIX*** (structurally unbuildable on one hex). ⇒ **An empty cue list — or a passing probe —
  records where you have LOOKED, not what is THERE; a found defect is not a fixable one: PRICE THE FIX BEFORE YOU PROMISE
  IT.** ⚠ **Grep `tick()`, the TABLES (`BEDT`/`CIVHRS`/`TILEDESC`/`valueSrc`/`VKIND`) AND THE COMMENTS — never the cue list.**
  🔑 **282/287: A FROZEN CENSUS COLUMN IS A SEAM — READ IT FIRST.** A tile flat across the eras is terrain or a DEAD RULE (check which); **a ZERO row is LOUDER than a flat one** (287 `SOLARF`, flat 0 in all 9 cells for 180 laps). ✅ **SOLARF + MARSH CLOSED** (289: MARSH is terrain — draw answers tide+season; detail in the 282 block).
  🔑 **281: AND NOW GREP THE *FLAG LIFECYCLE*, THE FOURTH SEAM** (law in SKILL.md). ⚠ **For every per-cell flag
  (`corner`/`loft`/`solar`/`groof`/`hstr`/`bridge`/`riv`), grep the passes that UPGRADE its host: does the flag RIDE the
  change or DIE with it? — and do the WRITER, DRAW, TOOLTIP and VETO agree on which types own it?** The tell, in one
  grep: **your flag's WRITER skips a type its VETO still counts.** *A flag that draws nothing and still vetoes is worse
  than no flag.* ✅ **ALL FLAGS AUDITED (361): `corner` 281 · `loft` 274 · `solar`/`groof` 288 (ride COM→TOWER) · `hstr` CLEAN (retail-podium draw rides the tower, NO veto) · `bridge`/`riv`/`fete`/`snow` terrain/field. Seam CLOSED.**
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

> **Archive:** the 354 entries before Iteration 352 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

## Iteration 352 — the whole-scene lightning flash reads as HAZE, not a flash (2026-07-18) [Sky × Deepen → EXPLORED → REVERTED]

**Vector.** #47 @350 / #351 both said honest mode is `polish-tile` or step-back UNLESS a lap finds a NEW
high-contrast domain-signal-reader (visibility priced first). Grepped the seams and confirmed the obvious interconnects
are ALL shipped (shopfront glow on pavement L7744 · wet-street lamp mirror 341 · waterfront/buoy/fire/strike reflections
329/349/348/347 · moonglade L9685 · sun glitter L5706). One genuinely un-built high-contrast thing survived: the
lightning system is **entirely local** — 291 lights the cloud from within, 328 drops the bolt, 347 pools light where it
grounds, but the darkened city AROUND a dusk storm stays exactly as dark as before, when a real flash floods the whole
landscape. Built it: a per-frame `FLASHAMT` (max flash across the storm's out-of-step cells, accumulated in the cloud
loop) drives one screen-space bluish-white wash over the whole viewport at the end of `render()`, alpha
`min(0.15, FLASHAMT*0.19)`. `SHEETLIFT` suppressor; reads the existing flash pulse, draw-only.

**Census.** PASS, every metric flat (draw-only, no rng/terrain/Math.random). `solarRoofs` wobble only.

**Probe (`probe-sheetlift`, temporal, LIGHTN=1 in both halves so only the wash moves, ONE page).** Clean PASS on
paper: at the strongest wet-dusk flash peak (FLASHAMT 0.837, both seeds) the lift covers **100% of the opaque scene**
at **mean d 24.7/255 (~10%), peak 36**; and it is **exactly 0px** both in dry weather AND between the flash beats
(FLASHAMT≈0 → byte-identical, the fixed point). ⚠ First cut read mean d **120 / peak 255** — the `getImageData` diff
was dominated by the transparent VOID (RGB jumps 0→236 where the wash paints it, a lift the viewer never sees behind
the CSS gradient — 200); masking to opaque scene pixels (base α==255) gave the honest 24.7.

**Visual — the gate that killed it.** 2 blind agents (crossed on/off map, 2 seeds) both PASSed the effect as
"coherent, not blown out" but **both INVERTED the filenames** — each named the *darker un-flashed* frame as the "lift"
and called the *actual flash* frame "muted / more uniformly muted," the un-flashed one "colors pop, more saturated."
Pixel measurement (239: believe the number over the read) confirmed MY map, not theirs (flash frame +19 whole-frame
mean lum). But the inversion IS the finding: **a treatment that makes blind agents prefer the control has reduced
contrast.** Looked myself: the flash-ON frame veils the whole city in a **grey-lavender HAZE** — a scrim/fog over the
plate, not a bright flash. The bolt is dramatic; the whole-scene wash only *detracts*.

**Verdict: EXPLORED → REVERTED.** `solvista.html` byte-identical to HEAD (630b04b); probe + camera deleted (they read
a `SHEETLIFT` global that no longer exists). **The finding is 260, arriving on a FLASH: a whole-frame luminance lift is
the one "event" the eye cannot read as an event.** A flat full-viewport alpha wash can only DESATURATE toward its own
colour — it cannot make a scene "pop" — and a global illuminant shift is exactly what colour constancy divides out,
read as ATMOSPHERE/haze, never as a discrete event. No alpha rescues it (higher → more washout, lower → invisible);
additive blend only trades haze for blow-out (the other warned failure). This is the low-contrast whole-frame trap
342/343 were reverted for, one rung up. ⇒ **A "whole-scene event" (a flash, a dawn break, floodlight-the-city) built
as a FLAT OVERLAY is dead on arrival, and a passing luminance/coverage probe proves NOTHING about it — only the blind
agents/eyes can judge a desaturating wash (266).** A believable whole-scene flash would have to be brightest at the
SKY/source and fall off toward the ground (a directional gradient, not a flat veil), which is a `polish-tile`-scale
redesign, not a growth lap. The lightning system stays local, and it is complete as it stands.

## Iteration 353 — the type-keyed TABLE seam is sound (2026-07-18) [Survey → NO SHIP → EXPLORED → REVERTED]

**Vector.** Three of the last four laps (344 declared the growth wall · 350 #47 confirmed it from the visual/perf side ·
351 surveyed every *behavioral* seam dry · 352 reverted the last high-contrast interconnect). Re-running 351's behavioral
survey would be redundant, so this lap tested a **different** seam class that neither 351 nor 352 covered and that the
loop's biggest recent finds came from: the **type-keyed TABLES** (285's law — a table keyed on `c.kind`/`c.t` is
structurally blind to a member that lives at a different level of the type hierarchy; 288's TOWER-can't-wear-tech is the
same shape). No source touched; `solvista.html` byte-identical to HEAD (630b04b).

**Survey — every table checked came back SOUND** (audited all 32 `T.*` tile types against each table's key set):
- **TILELABEL** covers 31/32 — only `VOID` missing, correct (the void is not a tile you hover).
- **TILEDESC** covers 29/32 — missing `ROAD`, `CIVIC`, `VOID`, and all three are **handled bespoke in `describeTile`**,
  not by the table: `T.CIVIC` → `CIVICLABEL`/`CIVICDESC[c.kind]` (per-kind, the correct level); `T.ROAD` → a rich branch
  naming fete/bridge/boulevard/arterial/busy/quiet off its own flags; `VOID` unreachable. No gap.
- **POPW** covers only the 7 pop-bearing types (RES/MID/COM/TOWER/CIVIC/IND/MARKET) — intentional; a park has no
  residents, and a loft's pop is keyed per-cell not per-row (274).
- **BEDT** covers only the 4 windowed building types — intentional, and the loft's night curfew was already moved to the
  per-cell `bedOf(c)` (274), so `T.IND` correctly stays OUT of the table (a `BEDT[T.IND]` row would bed the working
  shed's night-shift clerestory, 173).

Every missing member is a deliberate omission with a correct alternative path — none is the 285/288-class silent
type-hierarchy blindness. This is a fourth independent confirmation of the growth wall (344 declared · 350 visual/perf ·
351 behavioral · **353 structural/table**).

**Census + error gate.** Clean HEAD, tree clean. `census.mjs` VERDICT PASS, 0 page errors; core `pop`/`developed`/
`roads` byte-unmoved (195508 / 6056 / 5727), only `solarRoofs +1` / `greenRoofs +1` / `towerHt +1` (226 tick-timing).
Entity populations full and healthy (peds 762, cars 360, surfers 81, kayaks 81, buoys 45, plane 9, copters 6, etc.).

**Verdict: EXPLORED → REVERTED (a SURVEY — nothing built).** `solvista.html` byte-identical. The type-keyed TABLE seam
is **SOUND** — the growth wall now stands confirmed from the behavioral (351), interconnect (352) *and* structural (353)
angles. Honest mode stays **`polish-tile`** (the shaped-gradient deaf-surface redesigns: birds-roost close-up, 342/343's
snow-ridge/cat's-paws, 352's flash-as-sky→ground-gradient) or **STEP-BACK #48** (~355). A genuine growth lap still needs
a NEW mechanism/domain-signal-reader that is HIGH-CONTRAST and figure/ground LOCAL, and none has survived a probe since
341. Nothing to fix.

## Iteration 354 — the comment-tell seam is clean, and the source has been byte-frozen for five laps (2026-07-18) [Survey → NO SHIP → EXPLORED → REVERTED]

**Vector.** Five of the last five laps found nothing to ship: 344 declared the growth wall, 350 (#47) confirmed it
visual/perf, 351 surveyed the behavioral seams (movers/cards/flags/frozen-columns) dry, 352 built and reverted the
last high-contrast whole-scene interconnect (the lightning flash → haze), 353 audited the type-keyed TABLES sound.
Re-running any of those would be redundant, so this lap tested a **different** seam class none of them covered and
that the loop's biggest historic finds came from: the **comment-tell family** — 199 (a name/comment asserting a
behavior its value can't have) · 282 (a comment asserting an *absence* the code contradicts) · 278 (a "computed
live" whose only caller is an event) · 280 (a comment enumerating its category as a changelog, so a sibling is
missing). No source touched; `solvista.html` byte-identical to HEAD (630b04b / 5e06907).

**Survey — the comment-tell seam came back CLEAN.** Grepped every `/* */` comment carrying `never|always|once|static|
constant|frozen|fixed|no .*state|does not|carries no`. Every hit is a **healthy justification of correct behavior**,
not a defect-tell — the *inverse* of the 282 shape (an assertion of an absence that turns out true because the rule
is dead):
- **"X is right *because* it never Y":** `Math.random so [dolphins] never perturb the [stream]` (L1352) · `outside the
  plate: never drawn, never grows` (L992) · `the band can never spill past the waterline` (L6025) · `three salt RANGES,
  spaced so 0x..+j can never collide` (L6733) · `never atop track already down` (L3271). All are correctness proofs.
- **Tooltip-reads-the-SAME-predicate-the-draw-does** (the FIXED 113/199 shape, not the tell): `so it can never call a
  wrong hour` (L4670/4758) · `the MARKET… never got one (iter 285)` now DOES (L4802/4846) · `so the two can never [drift]`
  (L2094). These are the label-tell already *closed*.
- **Deliberate un-readers, correctly commented:** `a palm does not feel the drought` / `the palm's band is UNSEASONED
  — a palm does not migrate` (L5091/6177) — the 247 palm-vs-umbrella fix, working as designed.
- **The one genuine open item is already banked and out of scope:** `the foam gets a SHAPE, because it could never get
  a SIZE` (L5277) = open cue **(ay)** windrow LENGTH — a `polish-tile` job, not a growth lap.
No absence-asserting-a-LIVE-rule (282), no changelog-as-taxonomy with a missing sibling (280), no frozen "computed
live" (278). This confirms 344's growth wall from a **fifth** independent angle.

**⚠ The load-bearing new fact: SOURCE IS BYTE-FROZEN SINCE ITER 349.** `md5(solvista.html)` = `b9dbdb8e8ad377d8df940e2d804a572b`
for HEAD **≡ iter 349 (5e06907) ≡ iter 350 (#47, d6b7805)** — 350/351/352/353/354 shipped no bytes. Consequences:
- Path objects unchanged by construction (measured `probe-drawbudget` night total ~139,837 = iter 349's 139,810). The
  permanent perf arc is *identical* to what #47 measured; there is nothing new on the perf axis to price.
- **A STEP-BACK #48 now would re-shoot #47's byte-identical frames and re-spawn blind agents to re-confirm a
  byte-identical PASS** — the redundant-lap / grade-your-own-instrument trap. **A step-back's whole job is to catch
  DRIFT since the last one, and there has been ZERO source drift.** So #48 is deferred until an actual ship moves the
  bytes; re-running it on frozen source buys nothing. (The header's "#48 @~355" is superseded by this.)

**Census + error gate.** Clean HEAD, tree clean. `census.mjs` VERDICT PASS, 0 page errors; core `pop`/`developed`/
`roads` byte-flat (195508 / 6056 / 5727); entity populations full and healthy (peds 762, cars 360, surfers 81,
kayaks 81, buoys 45, plane 9, copters 6, etc.). No histogram move (no source change).

**Verdict: EXPLORED → REVERTED (a SURVEY — nothing built).** `solvista.html` byte-identical. The comment-tell seam is
**CLEAN** — the growth vein is now dry from FIVE angles (declared 344 · visual/perf 350 · behavioral 351 · table 353 ·
comment-tell 354). Honest mode is **`polish-tile`** (open cue (ay) windrow LENGTH; 342/343-class deaf-surface
redesigns) **or wait for source to drift before the next step-back**. A genuine growth lap still needs a NEW
mechanism/domain-signal-reader that is HIGH-CONTRAST and figure/ground LOCAL — none has survived a probe since 341.
Nothing to fix.

## Iteration 355 — the fresh high-contrast-local candidate is already shipped (2026-07-18) [Survey → NO SHIP → EXPLORED → REVERTED]

**Vector.** The last five laps confirmed the growth wall by *passive* seam-greps (351 behavioral · 353 tables · 354
comment-tells). Re-running those is redundant (354's law). So this lap ran the **generative complement**: instead of
grepping for a defect, I *generated* the strongest fresh candidates for the one thing the header still leaves open — a
**NEW high-contrast, figure/ground-LOCAL mechanism/domain-signal-reader** (the 341/280 cross-domain-signal shape, the
last thing that shipped) — and probed whether each already exists. This is the 34-beach-towels discipline run first,
on purpose: "confirm your idea doesn't already exist" *before* designing. No source touched; `solvista.html`
byte-identical to HEAD (md5 `b9dbdb8e`, = the iter-349 freeze).

**Survey — three fresh candidates, three pre-existing.** Each is exactly the profile the header demands (bright local
cue on dark ground, per-entity, reading an existing signal `LITAMT`), and the artifact already ships all three:
- **Vehicle headlights** — cars/buses/trucks read night (`LITAMT>0.35`, L8904): a beam pool on the road ahead of the
  nose, two warm headlamp points, two red taillight points. Bikes carry a bar lamp (L8817). *Done.*
- **Taxi for-hire roof lamp** — amber when vacant, dark with a fare, `LITAMT>0.3 && cabFree(v)` (L8902). *Done.*
- **Aircraft night nav lights** — the copter's tail beacon *blinks* at night (`LITAMT>0.25 && sin(time*5+ph)>0.2`,
  L10098). *Done.*
Every mover in the city already reads night with a bright local cue (add: ferry/bridge lights 179/193, lighthouse
beam, emergency beacons, street lamps, fire/strike/buoy emitters 347/348/349). The "high-contrast local night-reader"
axis is **saturated by construction** — a freshly-invented candidate lands on an existing draw, which is the strongest
confirmation the additive space is spent (stronger than a passive grep, because it is adversarial: I *tried* to find a
gap and could not).

**Census + error gate.** Tree clean; `md5(solvista.html) = b9dbdb8e8ad377d8df940e2d804a572b`, byte-identical to the
iter-349 freeze that 354 censused **VERDICT PASS, 0 errors, core `pop`/`developed`/`roads` byte-flat**. Re-running the
9-cell matrix on provably-identical bytes buys nothing (it would re-confirm 354's own reading — the grade-your-own-
instrument trap). No histogram move (no source change).

**Verdict: EXPLORED → REVERTED (a SURVEY — nothing built).** The growth vein is dry from a **sixth** angle, and this
one is generative rather than passive: the best fresh high-contrast-local candidates are already implemented. Honest
mode remains **`polish-tile`** (open cue (ay) windrow LENGTH; 342/343-class deaf-surface redesigns) — a *different
skill*. A genuine grow-city lap still needs a NEW mechanism that is neither additive-night-reader (saturated here),
whole-scene overlay (haze — 352), nor in a closed category (emitter/reflection/wind-over-water); none has survived a
probe since 341. **Recommendation: switch to `polish-tile`, or wait for source to drift before step-back #48.**
Nothing to fix.

## Iteration 356 — the behavioral and specular candidate classes are already shipped too (2026-07-18) [Survey → NO SHIP → EXPLORED → REVERTED]

**Vector.** 350–355 confirmed the additive wall six ways, and 355 ran the *generative* complement — but only over
**light-emitter** candidates (headlights, taxi lamp, copter beacon), the one profile the header names. This lap ran
the generative survey over the two candidate classes 355 did **not** touch, on purpose, to check the wall is not just
saturated in one profile: a **behavioral cross-domain interconnect** (nature × transport) and a **specular reflector**
(water × sky). No source touched; `md5(solvista.html) = b9dbdb8e…`, byte-identical to the iter-349 freeze.

**Survey — two fresh classes, both pre-existing.**
- **Behavioral: gulls work the boat wake / roost at dark.** The obvious un-done-looking behavior — birds clustering on
  a moving vessel — is at `drawBoat` L9124 (`if(LITAMT<0.55)`: three gulls orbit the wake behind the hull, wingbeat on
  `time`, and vanish at night). Nature×transport behavioral interconnect, LOCAL and high-contrast (white gulls on dark
  water). *Done.* (Herons roost too, L9227; shorebirds gather the damp margin by day, L6059.)
- **Specular: the moonglade.** A bright glitter path on the night sea reading the moon's live position + phase — the
  night twin of the day sun-glitter (L5706). Already shipped and traversing (iter 298 disc traverse, iter 153 one-
  predicate reader; L9685 `moonglade: the sea twinkles in a POOL THAT TRACKS THE moon`). Water×sky specular reflector,
  LOCAL. *Done.* (Reflection was already a CLOSED category per the header — 257/329/349 — this just re-confirms it from
  the *lunar* instance.)

**Census + error gate.** Tree clean; `md5 = b9dbdb8e8ad377d8df940e2d804a572b`, provably the same bytes 354 censused
VERDICT PASS / 0 errors / core byte-flat. Re-running the 9-cell matrix on identical bytes buys nothing (354's law).
No histogram move (no source change). Step-back #48 stays **deferred** — it would re-shoot #47's exact frames.

**Verdict: EXPLORED → REVERTED (a SURVEY — nothing built).** The wall now holds from a **seventh** angle (behavioral)
and an **eighth** (specular/lunar), which are the two classes 355's light-only generative survey left open — so the
generative confirmation is now complete across *all three* fresh-candidate profiles (emitter · reflector · behavior),
and every one lands on an existing draw. The additive/interconnect grow-city vein is a stable fixpoint. **Honest mode
is `polish-tile`** (open cue (ay) windrow LENGTH; birds fade α0.15 not roost) **or await a user-directed vector.**
Nothing to fix; nothing to ship.

## Iteration 357 — snow-capped evergreen crowns: correct, pretty in close-up, ~0.05% of the frame at fit (2026-07-18) [Nature x Deepen -> EXPLORED -> REVERTED]

**Vector.** 350-356 declared the additive/interconnect wall from eight angles, but every one was a generative/profile
survey - and 225's grep-the-seam law (26/26 at FINDING) is explicitly a DIFFERENT instrument from a generative survey.
So I ran a direct grep of the signal-readers instead of an 8th cold survey, and it found a genuine one the surveys
missed: the evergreen tree crowns explicitly IGNORE `c.snow`. The ground-snow draw's own comment (L7170) says the
dusting is laid "under the tree crowns above" - i.e. the crowns are painted over the snow and never read it, so the
ONLY evergreens winter ever touched were their contact shadows. A snow-laden conifer/redwood spire is the strongest
winter figure/ground there is (white on dark evergreen) and physically correct (evergreens hold snow, deciduous are
bare) - a legitimate Nature x Deepen distinct from 342's ROOF snow (roofs present edge-on/thin).

**Change (built, then reverted).** `tree()`'s conifer + the REDWOOD draw got a white wedge sharing each tier's apex,
reaching further down the spire as `c.snow` deepens, through `colA` (night snow dims blue like the ground), on the
ground-snow ramp/melt schedule (`SNOWSHOW`/`SNOWFULL`); deciduous crowns take none. Fed by a module-scope `curSnow`
set once per cell in `drawCell` (no 15-call-site param) + a `SNOWCAPON` suppressor (cf. `GFLASH`).

**Census.** Draw-only, zero `rng()`, reads only the existing `c.snow` field => core byte-flat (`developed`/`pop`/
`roads` +0; the +1 solar/tower wobbles are 226 tick-count noise). PASS.

**Probe (`probe-snowcap`, floor 0 by SNOWCAPON on/off in one page, deep winter year%1=0.12, snow ticked up).** The cap
RENDERS strongly in close-up: ~2700 CSS px / seed across 79 wood-hexes ~= 34 CSS px per wood-hex, meanDlum ~16, maxD
~187 (seed 42; seed 7 similar) - an order of magnitude above 226's unseen queue shadow (~2 px/figure). NOT the
sub-pixel-hairline family.

**Visual (2 blind agents, crossed A/B, + summer control).** Both PASSED and both, independently, confirmed the
close-up is CORRECT: snow sits ON the spires, clean z-order, no floating blobs, and summer is correctly BARE. But
both ALSO, independently, called it negligible at whole-city FIT zoom ("adds nothing perceptible at city zoom" / "you
must diff or zoom to see any change"). Measured: the ON/OFF whole-city delta is only ~500-700 bright px in a 1.26M-px
frame ~= 0.05% of the frame.

**Verdict: EXPLORED -> REVERTED.** A real, clean, seasonally-correct feature that reads beautifully up close and is
~0.05% of the frame at the zoom the diorama is actually judged - the exact 342/343/352 invisible-at-fit-zoom winter-
ornament pattern, confirmed here with a number and by both blind agents (the only "seen" instrument, 266). The
scatter of ~34px caps on ~79 tiny crowns does not cohere into a whole-city read the way the accepted ground-snow AREA
wash does. This is `polish-tile` (per-tile beauty), not grow-city (whole-city growth). Source restored to `b9dbdb8e`.
**Finding for the loop: the grep-the-seam law still FINDS (crowns unread, a genuine miss of 7 surveys) - but a found
seam is not a shippable one; the winter-ornament class is a firm NO for grow-city because it cannot clear figure/
ground at fit. Do NOT re-try snow on trees/roofs/any per-object winter cap here - the ceiling is ~0.05% of the frame.**

## Iteration 358 — the two remaining fit-visible seams are enumerated or dead-by-construction (2026-07-18) [Nature/Sky × Deepen (grep) → NO SHIP → EXPLORED → REVERTED]

**Vector.** 357 revived the one non-redundant passive instrument (225's grep-the-seam, a *direct* grep of the
signal-readers, distinct from a generative survey), and it still FOUND a real miss — but a winter per-object cap that
cannot clear figure/ground at fit (~0.05% of frame). So this lap ran the same instrument once more, but aimed
*specifically at the axis 357 named as the only one left open*: a seam whose fix would touch a **large / fit-visible
surface** and be **high-contrast local**, not another tiny per-object ornament. Two candidates, both settled by grep
alone. No source touched; `md5(solvista.html) = b9dbdb8e…`, byte-identical to the iter-349 freeze.

**Seam 1 — WINDA readers (enumerated, no gap).** `grep WINDA` returns a fully-enumerated reader set: the tree canopy
(L5025), palm crown (L5086), flags (L7545), clouds/drift (`windDrift`), the whole sea machinery centred on
`seaState()` — whitecaps, windrows, breaking surf (L5275/5277) — smoke lean (333), sail bellies (334), festival cloth
(338/339), balloons, the kite (`kiteGust`), and the rain shaft's lean (L9815). The gust cycle's own comments (L5261,
L10980) name its readers and 280 already closed the last two (balloon, kite). **No large surface is deaf to the wind.**

**Seam 2 — atmospheric perspective (absent, but dead by construction).** `grep -E "haze|atmospher|distance|desatur"`
confirms there is **no depth-desaturation**: far (top, small-`y`) rows are not shifted toward the sky/haze colour or
lowered in contrast relative to near rows. That is a genuine absence — the one large-surface, whole-plate signal read
the city does not implement. But it is **structurally in the 342/343/352 dead zone**: atmospheric perspective is by
definition *low-contrast and whole-frame*, and this projection is near-top-down with weak screen depth (~30 shallow
rows), so the effect would be subtle → read as HAZE → blind agents would call it negligible at fit (352's exact law:
"a whole-scene effect as a flat/near-flat wash is dead; a believable one needs a real SKY→ground GRADIENT = polish-
tile"). A found seam, not a shippable one — 357's finding, re-confirmed on the last fit-visible candidate.

**Census.** Not re-run: source is provably identical to the bytes 354 censused VERDICT PASS / 0 errors / core
byte-flat. Re-running the 9-cell matrix on identical bytes buys nothing (354's law). No histogram move.

**Verdict: EXPLORED → REVERTED (grep-only, nothing built).** The grow-city additive/interconnect vein is now a
**nine-times-measured fixpoint**, and 358 closes the *fit-visible* question the last three laps kept circling: the two
remaining candidates on large surfaces are (1) already fully read (WINDA) or (2) real-but-dead-by-construction
(atmospheric perspective, a haze). **Finding for the loop: there is no un-read large-surface signal left whose fix is
high-contrast-local — every large surface is either saturated or can only carry a subtle whole-frame wash, which is
polish-tile, not grow-city.** Honest mode is **`polish-tile`** (open cue (ay) windrow LENGTH; 342/343 deaf-surface
shaped redesigns) **or a user-directed vector / a Scale swing** (the one structural lever left, deferred per 350's
"do NOT add raw downtown density" watch). Recommend pausing the autonomous loop until source drifts or a user vector
arrives. Source restored/unchanged at `b9dbdb8e`.

## Iteration 359 — the additive NEW-ELEMENT angle closes too: an independent high-contrast-local candidate pre-exists (2026-07-18) [Sky/People × New element (grep) → NO SHIP → EXPLORED → REVERTED]

**Vector.** 355–358 declared the vein dry, but every one of those laps swept *interconnect / signal-reader* seams or
*large surfaces*. The one axis none of them named directly is a genuinely NEW, small-but-HIGH-CONTRAST, figure/ground-
LOCAL **additive element** — the class the header keeps warning against ("Additive space SPENT (331)") but that no
recent lap actually re-tested with a fresh, independently-generated candidate. So rather than a 5th survey I generated
one from scratch and probed it: **night festival fireworks** — bright sparks on a dark sky is the strongest
figure/ground in the whole diorama, it is local (not a whole-frame wash, so it escapes the 342/343/352 haze dead
zone), and it would sit on the existing festival machinery. This is the best-case adversary to the "additive SPENT"
claim. No source touched; `md5(solvista.html) = b9dbdb8e…`, byte-identical to the iter-349 freeze.

**Result — it pre-exists.** `grep -niE "firework|pyro|festival|bonfire"` finds it fully built: **iter 319, "a big
evening fixture ends in a fireworks display over the ground"** (L4736), *"the city has fired fireworks over the pier
every decade festival since 1980"* (L9716), gated to evening (*"you do not light fireworks at 3pm"*, L4745) on the
same `dayT` fixture clock. The single strongest high-contrast-local additive idea I could invent is already in the
artifact — which is the 355/356 "every fresh candidate PRE-EXISTING" pattern, now confirmed on the *additive-element*
axis specifically, not just the interconnect/large-surface ones.

**Census.** Not re-run: source is provably identical (`b9dbdb8e`) to the bytes 354 censused VERDICT PASS / core
byte-flat. Re-running the 9-cell matrix on identical bytes buys nothing (354's law). No histogram move.

**Verdict: EXPLORED → REVERTED (grep-only, nothing built).** The additive/interconnect vein is now measured dry from
**ten** angles, and 359 closes the last one the surveys had left implicit: NEW ELEMENTS as well as interconnect seams
and large surfaces. Even the best adversarial candidate (fireworks — high-contrast, local, on existing hosts)
pre-exists. **Finding for the loop: there is no shippable grow-city vector left at the current byte-freeze — additive,
interconnect, AND large-surface are all closed.** Honest mode is **`polish-tile`** (open cue (ay) windrow LENGTH;
342/343 deaf-surface shaped redesigns) **or a user-directed vector / a Scale swing** (deferred per 350). **Strong
recommendation: PAUSE the autonomous loop — it cannot grow the frozen source further, and every lap now spends ~40
min re-confirming a ten-times-measured fixpoint.** Source unchanged at `b9dbdb8e`.

## Iteration 360 — cue (ay) is CLOSED BY CONSTRUCTION: a legible near-shore windrow is z-order-forbidden (2026-07-18) [Water & coast × Polish (structural) → NO SHIP → EXPLORED → REVERTED]

**Vector.** 355–359 declared the additive/interconnect/large-surface vein dry from ten angles and every lap recommended
pausing — but all ten *deferred* the one remaining OPEN cue, **(ay) windrow LENGTH**, to `polish-tile` without ever
demonstrating *why* it cannot ship here. (ay) is the strongest-looking grow-city candidate left: it lives on a LARGE
surface (the open sea, ~456k px), and 266's own law says LENGTH is the one dimension a hexagon cannot quantize, so a
longer streak is SEEN at fit — the exact property 357's per-object winter caps lacked. So rather than an 11th survey I
took (ay) seriously and designed the fix. It is **structurally unbuildable**, and proving that CLOSES the cue. No source
touched; `md5 = b9dbdb8e…`, the iter-349 freeze.

**The structural finding (from source, not pixels).** A windrow's legible length is `L=min(want, run−0.5)`, where `run`
is the open-sea fetch walked **WEST** (`cellAt(x−run−1, …)`, L5766). West is not a free choice: 266's z-order rule
(L5293) requires the tail to lie over water *already painted*, and the main loop draws `for y(N→S): for x(W→E)` (L9647),
so the only already-painted region at any hex is the **NW quadrant**; the tail therefore MUST trail NW (`tx=fx−L*CW`,
`ty=fy−rise`, L5780). But Solvista's sea is the **eastern half-plane** (`SHOREX=CTRX+11`, land `x<SHOREX`, water
`x≥shoreAt`), so westward fetch runs **toward the shore** — short near the coast, long only far offshore. ⇒ **A near-shore
hex has short western fetch BY CONSTRUCTION, so a legible row in the band the eye actually looks at is geometrically
impossible.** Both escapes fail: trailing EAST puts the tail over not-yet-drawn cells (painted out — breaks the z-order
266 was built on); reorienting rows ALONG-shore (N–S) abandons "parallel to the wind," the feature's entire physical
meaning (Langmuir rows lie parallel to wind, not to shore — it would read as a tide line, not a gust).

**The only real lever is a no-op at fit.** What remains is to cull the invisible near-shore stubs and concentrate anchors
in the deep east sea where `run` is long. But the stubs are already sub-legible (culled at `L<1.2`, faint at 1.2–2), so
removing them changes nothing a viewer sees, and the deep-sea rows that CAN be long already exist. The move trades
invisible near-shore clutter for offshore concentration — a per-surface beauty judgment (`polish-tile`), not whole-city
growth, with ~nil fit payoff. This is **357's law arriving through GEOMETRY rather than amplitude**: a FOUND seam is not
a SHIPPABLE one — (ay)'s ceiling is bounded not by tuning but by the z-order/geography interaction 266 deliberately chose.

**Census.** Not re-run: source provably identical (`b9dbdb8e`) to the bytes 354 censused VERDICT PASS / 0 errors / core
byte-flat. Re-running the 9-cell matrix on identical bytes buys nothing (354's law). No histogram move.

**Verdict: EXPLORED → REVERTED (structural, nothing built).** Cue **(ay) is CLOSED** — the last OPEN cue, *resolved*
rather than deferred: legible near-shore windrows are forbidden by the same NW-quadrant z-order constraint 266 chose, so
the residual is a fit-invisible stub cull = `polish-tile`, not grow-city. **The OPEN cue list is now EMPTY**, and
additive + interconnect + large-surface + the last polish cue are all closed/bounded. The grow-city vein is a fixpoint
from an **eleventh** angle. **Strong recommendation stands: PAUSE the autonomous loop** until source drifts (a
`polish-tile` ship) or a user-directed vector / Scale swing arrives; re-invoking it only re-confirms a measured fixpoint
at ~40 min/lap. Source unchanged at `b9dbdb8e`.

## Iteration 361 — flag-lifecycle seam (281) is CLEAN: `hstr` rides the tower, all per-cell flags audited (2026-07-18) [Urban fabric × grep → NO SHIP → EXPLORED]

**Vector.** 355–360 declared the vein dry from eleven angles and recommend pausing. Rather than a twelfth *identical*
survey (which buys nothing — 360's law), I ran ONE fresh, concrete seam-grep the recent laps had not: **281's
flag-lifecycle audit**, applied per-flag instead of as a general reminder. The header lists nine per-cell flags
(`corner`/`loft`/`solar`/`groof`/`hstr`/`bridge`/`riv`/`fete`/`snow`) and 281's tell is one grep — *does the WRITER skip
a type the VETO still counts?* Four are documented-fixed (`corner` 281, `loft` 274 via `bedOf`, `solar`+`groof` 288 —
each RIDES the COM→TOWER upgrade). `bridge`/`riv` are terrain flags on ROAD/WATER, `fete` a per-tick ROAD flag, `snow` a
diffused field — none have an upgrade-consumes-host problem. That left exactly ONE flag never audited: **`hstr`** (high
street).

**Finding (from source, not pixels).** `hstr` is CLEAN. Writer at L1131 sets it on `EMPTY/MEADOW/corr` founding-street
flanks; the develop pass (L2245) forces those to `COM`; the draw at L7979 is the **retail-podium plinth** explicitly
built to survive the tower (comment: *"the parade runs UNDER the towers… keeps its shopfront when the tower rises over
it… without this, 7 of 13 lots by 2005 would be blank tower base"*), so the flag RIDES COM→TOWER by design. Tooltip
(L10577) and find-hook (L11007) both gate `c.hstr&&DEV.has(c.t)`. Critically, `hstr` has **NO veto** — no
`countAround(…,n=>n.hstr)` anywhere — so the 281-tell (writer skips a type the veto counts) *cannot* apply. Not dead
code either: exists at scale (7/13 lots by 2005). No 281/274/288 defect.

**Census.** Not re-run: source provably identical (`b9dbdb8e`) to the bytes 354 censused PASS. No source touched.

**Verdict: NO SHIP → EXPLORED (grep-only).** The **FOURTH grep-the-seam class (flag lifecycle) is now exhausted** — every
per-cell flag is either documented-fixed or structurally exempt, and `hstr` closes the last gap. This is a *fresh*
corroboration of the fixpoint from a seam 355–360 did not touch, so it is not redundant churn — but it reaches the same
place: **the grow-city vein is a fixpoint, OPEN cue list EMPTY, source byte-frozen since 349. PAUSE stands.** Honest
growth now requires `polish-tile` (a source-drifting ship), a user-directed vector, or a Scale swing. Source unchanged at
`b9dbdb8e`.
