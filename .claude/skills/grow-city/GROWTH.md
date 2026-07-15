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
| **Nature** | 4, 26, 29, 102, **156**, **174** | 1, 13, 60, **206**, **279**, **287** | 37, 46, 67, 76, **108**, **120**, **139**, **166**, ~~**233**~~, **238**, ~~**246**~~, **263**, **272**, **301** | ~~46~~, ~~88~~, ~~101~~ | U4 | 53, 96, **194**, ~~**198**~~, **215**, **221**, ~~**251**~~, **294** | **117**, **129**, **148**, **183** |
| **Water & coast** | 6, 10, 12, 16, 20, 33, 106, **169**, **296** | 90, **282** | 17, 25, 51, 65, 72, **113**, **123**, **159**, **196**, **245**, **257**, **289**, **303** | 22, ~~**205**~~ | | U2, 44, 58, 79, **116**, **132**, **150**, **185**, **214**, **223**,  **234**, ~~**255**~~, **266**, **268**, **275** | **97**, **141**, **176** |
| **Urban fabric** | 32, 62, **295** | 7, 23, ~~82~~, **151**, **281** | 38, 54, 68, 92, **165**, **173**, **189**, **199**, **209**, ~~**218**~~, **219**, ~~**254**~~, **267**, **288** | 47, **109**, ~~**160**~~ | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103**, **110**, **118**, **124**, **143**, **180**, **216**, **220**, **224**, **228**, **235**, **239**, **274**, **302** | **133** |
| **Transport** | 2, 9, 21, 31, 48, **164**, **297** | 77, **283** | 28, 39, 55, 63, **112**, **121**, **128**, **155**, **179**, **193**, **230**, **249**, **258**, **269** | 5, 15, **138**, **211**, **276** | U4 | U1, U3, 70, 85, 87, 94, **146**, **188**, ~~**203**~~, **241**, **243** | **105**, **171**, **290** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107** | 36, 59, 66, 80, 91, **149**, **158**, **175**, ~~**195**~~, **213**, **244**, **250**, **259**, **277**, **285**, **292** | 45, **204** | | 73, ~~**114**~~, **168**, **231**, ~~**270**~~, **299** | 52, 122, **140**, **184** |
| **Sky & atmosphere** | 27, 43, **291** | | 19, 35, 50, 57, 95, **135**, **153**, **161**, **181**, **190**, **208**, **225**, **236**, **253**, **261**, **280**, **284**, **298** | | | 61, 81, 89, **115**, **200**, **242**, **248**, **265**, ~~**273**~~ | ~~**134**~~, **144** |
| **People & activity** | 41, 56, **127**, **170**, **186**, **293** | 49 | 34, 64, 93, **104**, **119**, **145**, **178**, **201**, **210**, **240**, **247**, **262**, **271**, **286** | 78, **111** | | 84, **137**, **163**, **226**, **300** | 71, **154**, **191**, **278** |

- **Interaction/UX** (inventory + the `<meta charset>` repeal archived at 270; both are INVARIANTS in SKILL.md). What
  steers: when adding an entity array, `stamp()` it in its draw + add an `ENTINFO` row (same discipline as the census
  hook) — `stamp()` also draws the focus ring, so any stamped entity is ringable free. **An `ENTINFO` `sub` may be a
  FUNCTION of the entity (105)** — use it when a thing's interest is its *membership* (line/route/depot), computed live.
- ✅ **THE TRIM METHOD** (paid 279, again 280): a block is cuttable when its **LAW is in SKILL.md** and its **ARTIFACT
  FACTS compress to their imperatives**; a *superseded* warning is free to cut (280's `__setWind` retired 275's).
  There is never a block you can simply *delete* — **compress the oldest, and pay for your OWN additions in the same lap.**
- **ROTATION.** Last: Nature **301** · Urban **302** · Water **303** ·
  Transport **297** · Sky **298** · Civic **299** · People **300**. ➡ **NEXT: Transport (297, oldest)** — GREP ITS
  `tick()`/`stepVehicle`/FLAG seam FIRST (27-for-27), not the cue list (its two named cues are `polish-tile` jobs ⛔;
  Water's New CA rule cell 90/282 stays sparse; cue **(ay)** windrow LENGTH is POLISH).
  ✅ **303 CLOSED THE *ACTUAL* LAST ANIMATE NO-HOUR HOLDOUT** (9th 262-cliff recursion): `drawHeron` (untouched since
  iter 17) had NO gate — 6 herons stalked the estuary marsh at 4am identically to noon, **hidden inside 301's OWN control
  list** (301 cited the heron as untouched — 286: a must-not-move column is what you did not CHANGE, not what is CORRECT).
  `heronSession()`/`heronOut` roost the flock at dusk off the deer's `DEERDARK` rung (226, zero new draws/constants;
  `probe-heronhour.mjs`: HEAD DISTINCT=1 → PATCH 5). Every animate draw is now *verifiably* off the cliff.
  ✅ **302 CLOSED cue (au)** — the loft roof-studio was `col('sage')` (the green-roof's own entry) on a `T.IND` tile that
  cannot carry `c.groof`; now a glazed white penthouse + gold night lamp, draw-only byte-flat. Urban's tooltip/flag/TABLE
  seams are SATURATED (grepped clean 295) — its remaining stale kind is Interaction/UX (133), but nothing there is broken.
  ✅ **301 BEDDED THE DEER at nightfall** (8th 262-cliff recursion): `drawDeer` had NO gate — 9 deer grazed the meadow
  edge at 4am identically to noon; `deerSession()`/`deerOut`, off the ladder (226). ⚠ Its claim that *every* animate draw
  was then off the cliff was FALSE — 303 found the heron it had cited as an untouched control (286). Nature additive spent.
  ⚠ **300 SPENT People's Polish** (strip-crowd cliff, archived) ⇒ People's ONLY stale kind is **New CA rule (49)** (Deepen CLOSED 14-deep).
  ⚠ **297 SPENT Transport's stale New element cell** (harbour launch); its rules seam grepped genuinely CLEAN (every
  mover keeps an hour + a live tooltip + an honest job; no dead rule; FLAGS agree) ⇒ **Transport's stale kinds are New
  CA rule (77) and Interaction/UX (171/290)**, its cues stay `polish-tile` jobs (⛔). ⚠ **295 SPENT Urban's New element
  cell** (car parks); Urban's stale kind is **Interaction/UX (133)**, flag/TABLE seam grepped CLEAN.
  ✅ **292 CLOSED CIVIC's additive: the event-venue category {market, stadium, amphitheater} is COMPLETE** (crowd pool + `residentWhere` enumerate all three off the shared `concertShow`/`concertLive`; the bowl was the un-enumerated third — 285's type blindness). Civic stale stays New CA rule (36/107) + Connect (measured-sound).
  **291 broke Sky's Deepen streak with a NEW ELEMENT — the sparsest Sky cell (3rd ever). Sky's additive was NOT fully
  spent: the elaborate weather front was a live host with no dramatic payoff, and lightning was the missing one.**
  ✅ **NATURE'S POLISH DEBT IS PAID (294)** — spent both banked paired cues **(ax)** fairy-ring cap contrast +
  **(bg)** the countryside solar blue together, both CLOSED. Nature's stale kinds are now **New element (156/174)**
  and **Connect (all ~~struck~~)**; its next lap should grep the `tick()`/CA seam (287/279 pattern) before the cue list.
  ⚠ **PEOPLE's Deepen cell is 14 deep and CLOSED for rotation** — after 300 spent **Polish**, its ONLY stale kind is
  **New CA rule (49)**. Do not take another People Deepen without a measured seam.
  ✅ **CIVIC'S TWO-LAP DEBT IS PAID (285).** ⚠ **CIVIC's stale cells are STILL New CA rule (36/107) and Connect
  (45/204)** — 277 and 285 both took Deepen. ✅ **BUT CONNECT IS NOW *MEASURED* STALE: 285 probed the civic mile
  (`c.fete`) and the seam is SOUND** (11–30 cells, 1.4–3.7% of road, 2–5 short runs, 2.2–2.8 institutions in
  reach — exactly what its comment promises). **Do not "fix" it.**
  ⛔ **TRANSPORT'S TWO NAMED CUES ARE `polish-tile` JOBS, NOT GROWTH LAPS** — (a) the elevated transit and (av) the
  tram's catenary are the SAME 0.5px hairline family; do not spend a growth lap on either. ⇒ **Grep its `tick()`/
  `stepVehicle` seam and its FLAGS instead** (267 · 274 · 281 · 282 · **283**: FIVE straight laps where the RULES seam
  beat the cue list). Transport's stale cell is now **Interaction/UX (171)**.
  ✅ **CUE (bd) CLOSED BY 284** (and it was TWO readers, not one — see 284's facts).
  ➡ **NEXT cues: (ay)** windrow LENGTH
  (POLISH ⇒ not Water's next), **(az)/(ba)** 278's two (below), **(bh)** over-bright plaza flame-blob (Nature/park
  Polish, 293). ✅ **(au) CLOSED by 302** (loft roof-studio glazed, not green); **(ax)+(bg) CLOSED by 294; (bf) market
  packed-away square CLOSED by 299** (permanent stone cross + folded trestles + crates + chalk bays; draw-only, census
  byte-flat).
  ✅ **PEOPLE: Interaction/UX ran at 278, Polish at 300 — its ONLY stale kind is New CA rule (49); Deepen CLOSED.**
  🔑 **225'S GREP-THE-SEAM LAW IS 26 FOR 26 AT *FINDING*** (**300: the last global-`LITAMT` CLIFF — `drawBuilding`'s
  neon evening crowd stood all night, all-at-once, while the busker in front of it kept an hour; found by grepping
  every entity/People draw for a gate on a global-monotone signal, the tell 262/286 warn of.**) (**288: the FLAG-LIFECYCLE grep — `c.solar`/`c.groof`, the two rooftop-tech CAs the HUD counts and the tooltip names, were written on RES/MID/COM and DRAWN nowhere on a TOWER, so downtown's tallest roofs could never carry them — 285's type-hierarchy blindness, found by grepping the WRITER against the DRAW branch.**) (**287: `SOLARF` — fully drawn, promised on the placard,
  banked as an open question at iter 107 — had NEVER ONCE EXISTED; the FROZEN CENSUS COLUMN found it in ten seconds,
  while Nature's banked cue was a fairy-ring contrast nudge.**) (**285: the MARKET kept no hours and no day, because
  `CIVHRS` keys on `c.kind` and a MARKET is a TILE TYPE — the hours ladder could not NAME it. 240 gave the STADIUM
  a fixture and wrote 271's enumerate-the-CATEGORY law down while doing it; the market is its sibling on the SAME
  LINE of `syncFleet` and was never enumerated.**)
  (**283: a contagion whose SPONTANEOUS term had quietly
  converted 94% of its own host, so a "Boulevard" was the DEFAULT STATE of a developed street — 333/city against 29
  Avenues — and the label ladder iter 171 built on top of it had been naming a distinction that did not exist**)
  (282 a `tick()` pass that fires on TICK 1 and then converts
  NOTHING for 812 more ticks, whose own tooltip had written the silence down as a design fact — *"kelp carries no CA
  state (placed once in `genWorld`, never ticked)"* — FALSE about the mechanism and TRUE about the observable, which is
  exactly why nobody looked) (281 a flag whose WRITER skipped a type its VETO still counted · 280 a comment enumerating
  its own category · 278 a comment conceding the defect while justifying a workaround · 277 the census's scalars vs the placard · 267 a rule that had NEVER RUN · 268 a seabed built from the wrong noise · 269 a tram at 1.04x on its named avenue · 271 nine surfers who never went home · 272 an autumn CA that blinked the whole wood as ONE · 274 a new feature that never told the TYPE-KEYED TABLES it existed · 276 the BUS, which could not see the stop network it exists to serve) — **AND 270 IS THE FIRST DEFECT IT COULD NOT *FIX*** (structurally unbuildable on one hex). ⇒ **An empty cue list — or a passing probe — records where you have LOOKED, not what is THERE; and a found defect is not a fixable one: PRICE THE FIX BEFORE YOU PROMISE IT.** ⚠ **Grep `tick()`, the TABLES (`BEDT`/`CIVHRS`/`TILEDESC`/`valueSrc`/`VKIND`) AND THE COMMENTS — never the cue list.**
  🔑 **282/287: A FROZEN CENSUS COLUMN IS A SEAM — READ IT FIRST.** A tile flat across the eras is terrain or a DEAD RULE (check which); **a ZERO row is LOUDER than a flat one** (287 `SOLARF`, flat 0 in all 9 cells for 180 laps). ✅ **SOLARF + MARSH CLOSED** (289: MARSH is terrain — draw answers tide+season; detail in the 282 block).
  🔑 **281: AND NOW GREP THE *FLAG LIFECYCLE*, THE FOURTH SEAM** (law in SKILL.md). ⚠ **For every per-cell flag
  (`corner`/`loft`/`solar`/`groof`/`hstr`/`bridge`/`riv`), grep the passes that UPGRADE its host: does the flag RIDE the
  change or DIE with it? — and do the WRITER, DRAW, TOOLTIP and VETO agree on which types own it?** The tell, in one
  grep: **your flag's WRITER skips a type its VETO still counts.** *A flag that draws nothing and still vetoes is worse
  than no flag.*
  ⚠ **STEP-BACK OVERDUE (~19 laps; last was the 37th at 283, block archived at 302): DO ONE SOON.** No new drift as of 283; the golden wash (265), the sea's one-tone lattice (255/257/268) and skyline monotony (224, CLOSED) are DELIBERATE — **do not re-open on an aside.** ⚠ **PRICE THE ARC IN PATH OBJECTS, NOT ms** (perfab ±30% load noise can't resolve +0.1%/lap; 216/198). ⚠ Blind A/B names NON-ORDINAL and CROSSED (268).
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

> **Archive:** the 296 entries before Iteration 294 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

## Iteration 294 — the fairy-ring caps and the countryside solar, both a touch too loud in different directions (2026-07-15) [Nature × Polish]

**Vector.** Nature (oldest domain — 287), and its stale kind is **Polish**, two-deep in debt. The header
banked TWO paired cosmetic cues to spend together: **(ax)** the fairy rings want a hair more cap contrast
(272, both agents, both seeds, unprompted on a PASSing frame) and **(bg)** the countryside solar panels'
blue is too saturated (287, s7's agent, unprompted aside — ONE agent, ONE seed, NOT corroborated). Both
are draw-only contrast/colour nudges: no terrain, no `rng()`, no `Math.random`.

**Probe FIRST, as (bg) mandated.** `probe-shroomvis` confirmed (ax) is a *contrast* problem, not a size
one: the rings already render **20.3–21.5 CSS px/ring at fit** (~5x a ped shadow), so a body enlargement
was the wrong lever (255/cue-f family excluded). For (bg) I measured the panel's rendered colour against
the countryside at the census day pin: `col('solar',1.25)` = **[73,102,156], chroma 83, lum 99, hue 219** —
the single COOL surface among a warm/green countryside (chroma 38–88, but every neighbour warm or green),
its chroma at the TOP of the range. The uncorroborated aside held up: a chroma-83 blue at lum 99 among
lum 150–183 fields is a saturated cool spot, not "dark tilted panels". So the direction was measured, not
assumed.

**Change.**
- **(bg)** `solar:[62,82,120]` → `[54,66,96]`: chroma 58→42, luminance down, **hue held (219→222, `dHUE`~3°,
  audited not to a target hue — 234)**. Rendered `col('solar',1.25)` moved **[73,102,156]→[64,82,125]:
  chroma 83→61 (−27%), lum 99→81 (−18%)**, same navy. The palette entry is SHARED by the field panels,
  the rooftop arrays and the launch hull — all three deepen coherently (real PV glass is near-black-blue;
  a "navy hull" stays navy).
- **(ax)** `drawShroom`: the single flat cap arc (`col(cap,1.15)` r=0.8) became a **two-tone dome** in the
  SAME footprint — a shaded rim (`col(cap,0.78)` r=0.8) to define the edge + a bright crown (`col(cap,1.42)`
  r=0.6) to clear the dark litter. More cap contrast, zero size increase.

**Census.** Draw-only → **PASS, 0 page errors**, core byte-flat (no terrain, no rng). Vacuous for this
vector by construction; the gates are the probe + the eyes.

**Probe.** `probe-shroomvis` after: ring footprint **unchanged at 20.3–21.5 px/ring** — proof the cap
change added contrast WITHOUT enlarging (the ink-count probe is near-vacuous for a within-footprint
brightness redistribution, exactly as expected; 259's line-that-consumes was already read). Solar
re-measured: chroma 83→61, hue preserved.

**Visual.** Both cues, both seeds, delegated to two subagents, all **PASS**. (ax): *"a tight cluster of
small pale rounded caps… read as little domed caps (lit crown, darker base) rather than flat dots or a
smudge"*, no bloom, crowns stay within footprint. (bg): *"dark navy tilted PV strips… clearly distinct
from the warm crop-row hexes… reads as angled dark panels catching light rather than the old bright
park-bench blue… still bright enough to see"*; at night *"the darker panels recede correctly into the
countryside without competing with the city lights."* Whole-city day+night frames balanced on both seeds,
nothing compounded.

**Verdict: SHIPPED** — two small honest polish nudges spent together as banked: the fairy-ring caps now
read as domed toadstools instead of flat specks, and the countryside solar reads as dark tilted panels
instead of park-bench blue. Both were measured before a line was written; (bg)'s uncorroborated aside was
confirmed by the panel-vs-countryside chroma read, not taken on faith.

## Iteration 295 — downtown's vacant lots were sheep-country pasture (2026-07-15) [Urban fabric × New element]

**Vector.** Urban fabric (rotation: Urban at 288 was the oldest). The header nudged the
`tick()`/flags/TABLES seam first (225's law, 25/25), so I grepped it — and it came back
**clean**: every per-cell flag (`solar`/`groof`/`corner`/`loft`/`hstr`) has its WRITER,
DRAW, TOOLTIP and VETO/count agreeing (all gate `... && DEV.has(c.t)`, so the burn-ghost
where fire clears `c.loft` but not `c.solar`/`c.groof` is neutralised, not a defect); the
tables (`BEDT` with its deliberate IND exclusion, `CIVHRS`'s 12 kinds, `valueSrc`, `VKIND`)
all name their whole category. 288's flag-lifecycle grep already took the last real defect
there. So the RULES seam is genuinely saturated for Urban — and rather than force the sparse
New CA rule cell in a saturated domain (285–289's discouraged move), I took the **stale New
element cell** (32, 62 — both ancient) with a real, verifiable, guaranteed-flat addition.

**The gap.** An EMPTY block ringed by the city — `dev>=3` developed neighbours, `>=2` of
them commercial/tall — drew as **rural pasture** (the default EMPTY succession: grass, a
tree, wildflower specks, 209). A real downtown fills that gap-tooth vacant lot with parked
cars, not sheep. That mismatch (a green meadow wedged between towers) is a genuine
legibility wrongness the artifact carried its whole life.

**Change.** A **surface car park** on those lots. `carPark(x,y,c)` — ONE predicate, TWO
readers (the draw's base fill + branch, and the tooltip), so paint and name can never drift
(112). Draw: the base hex paved in **`paving` [190,184,170]** (the city's own hardstanding,
which is *lighter* than the pasture it replaces — kelp's darkening law met **by
construction**), white bay-lines slanted along the iso ground, and 2–4 hashCell-placed
parked cars (body in the city palette + a dark cabin), each on a house-style contact shadow.
- **Draw-only, hashCell-gated (`hashCell(x,y,seedNum^0x4C17)<0.5`), no `rng()`, no terrain,
  no new tile type** ⇒ pop and the seeded stream stay flat. It rides no upgrade because the
  instant the lot develops it is no longer EMPTY. `let CARPARK=1` is a probe suppressor (253).
- Tooltip: a `'Parking lot'` case in `describeTile`, off the SAME `carPark()` the draw gates
  on (the corner-shop/loft idiom, 281/267).

**Census.** Draw-only → **PASS, 0 page errors**, core byte-flat (`pop`/`roads`/`developed`
+0, empty tile histogram, solar/green roofs flat). Vacuous by construction; the gate is the
probe + the eyes.

**Probe** (`probes/probe-carpark.mjs`, predicate-suppression in ONE page, build-agnostic).
**HOST:** 13 · 18 · 3 lots at seeds 7/42/1234 (and 15/16 at seeds 99/2024) — a handful per
city, not a flood. **FLOOR:** two `CARPARK=0` renders are **byte-identical (0 px) on every
seed**, so the ink is real. **INK:** ~740/1007/62 px, **~56 px/lot** on the dense seeds
(well above the visible floor — a ped shadow is ~4.4 px, a busker ~76 px total).

**Occlusion (206/258, measured, not a defect).** The `com>=2` siting predicate *requires*
commercial/tall neighbours — which is exactly what occludes a ground-level lot. Measured
across 5 seeds: **open-front lots are rare everywhere (0–7/seed) and ZERO on seed 1234**, so
an open-front *gate* would starve the feature and kill seed 1234 outright (206's dilemma: a
constraint that admits almost none). Relaxing `com>=2`→`dev>=3` changes counts negligibly
(seed 1234 stays 3). ⇒ the honest outcome is 206's: **do not gate on visibility**; a vacant
downtown lot IS hemmed in by towers, and a partial glimpse of pavement/cars between buildings
is realistic, not broken.

**Visual.** Seed 7: agent **located** the paved lots + cars among downtown, whole frame
PASS. Seed 42: the downtown *clip* first drew a "cannot-locate" (agent confused farm crop-rows
and market stalls at that zoom — a framing miss, not a defect: the probe measures 18 lots /
1007 px there); an **aimed close-up** (argmax of measured ink, 226) then read a clean car park
sitting flush on its hex — the aim-don't-redesign-on-a-locate-FAIL discipline. Seed 1234
(sparse, 3 lots, all tower-hemmed): the grey lot reads present-but-partially-occluded, scene
coherent, **no z-order tear, no floating, no blowout**. All three PASS; whole frames balanced.

**Verdict: SHIPPED** — downtown's gap-tooth vacant lots now read as surface car parks
(paved, striped, a few parked cars) instead of sheep-country pasture; lighter than the grass
it replaces, so it darkens nothing, and it names itself on hover.

## Iteration 296 — the harbour had a pier, a ferry, moored boats and a lighthouse, but no channel to bring them in (2026-07-15) [Water & coast × New element]

**Vector.** Water & coast (oldest domain — 289), and this time a **New element** to break the domain's long
Deepen/Polish/CA streak (289 boats-hour · 282 kelp · 275/268/266 polish · 257 deepen — the additive cell hadn't
run since **169**). Grepped the Water seam first (225): the frozen census columns are all accounted for
(SHOREPARK/MARSH/LIGHTHOUSE/ROCK are terrain with live draws; KELP now ticks; the `riv`/`bridge` flags are terrain,
not upgraded), so no dead-rule defect this lap — but a real **absence**: the bay is dotted with a pier, a ferry,
freighters, six day-sailers, three moored boats, kayaks, surfers and a one-per-city lighthouse, and **grep-confirmed
zero navigation marks**. A working harbour marks its approach; Solvista's did not.

**The element.** Channel buoys leading the fairway in to the pier head — **red flat-topped "can" marks to port,
green pointed "cone" marks to starboard** (real IALA shapes: a can is a cylinder with a square topmark, a cone a
triangle with a triangular topmark), anchored on the swell (bob off `waveT`) and **flashing red/green to seaward
after dark** (a slow `sin(time…)` flash, drawn as a raw-literal radial glow per 279's emitter law — a light SOURCE,
not a surface). Spawned in `genWorld` seaward of `pier.x1` (published world data — no argmax needed, 201/249), three
marks a side at `pier.x1+2.5+k*1.7`, flanking the lane at `pier.y±1.7`. **`Math.random`, so the aids never perturb
the seeded stream** (the guaranteed-clean-ship rule), and **each only spawns where `cellAt` is on-plate open WATER**
(`!riv`, `x<=ROWMAX-1`), so a pier hard against the rim simply carries a shorter channel — 6/6 on both test seeds.

**Discipline.** New entity array `buoys` (declared, reset in `genWorld`, drawn via `bucketAdd` for z-order); `stamp()`
+ an `ENTINFO` row (a live function of the mark: *"Red port-hand mark on the harbour approach."* / *"Green
starboard-hand…"*) so it names on hover and rings free; census hook `transport.buoys` in sync.

**Census.** Core **byte-identical** — `pop`/`roads`/`developed` **+0**, tile histogram empty (draw-only, no terrain,
no `rng()`). `buoys 0 → 45` across the 9-cell matrix (~5/city), `transportModes +9` (a new mode in every cell).
`solarRoofs −2 / greenRoofs −1` is the harness's tick-count wobble (226 — a draw-only change slows the frame a hair,
so fewer `tick()`s land in census's 500ms window; core is untouched).

**Visual.** Both seeds **PASS** on aimed pier close-ups (`probes/shot-buoy.mjs` — freezes in-page, aims the camera at
`ctr(pier.x1+2.5, pier.y)`, day + night + an un-zoomed whole-city frame). Blind reads, both seeds: *"an upper line of
RED flat-topped cans with square topmarks and a lower line of GREEN pointed cones with triangular topmarks, each ON
the water with a small wash ring, none on land or in the sky"*; the night frame shows *"a bright red glow on a can
and a green glow on a cone, others dark — consistent with intermittent flashing"*; *"no z-order tears… buoys layer
cleanly over water and behind the pier deck"*; whole city *"balanced and coherent… tiny buoys dotting the harbour
approach without adding clutter or darkness."*

**Verdict: SHIPPED** — the harbour now has a marked channel; the red-can/green-cone marks lead the fairway in to the
pier head and flash after dark.

## Iteration 297 — the ship rode at anchor waiting on a berth, and no one came out to work her (2026-07-15) [Transport × New element]

**Vector.** Transport rotation (oldest, 290). The rules seam is genuinely deep — I grepped `tick()`, `stepVehicle`,
`syncFleet`, every mover's step + tooltip + `ENTINFO` row, and the transport FLAGS (`bridge`/`riv`): every craft
keeps an hour (`vehCurfew`/`VCURF`/`waterSession`), has a live tooltip off the predicate its rule steers by, and
does an honest job (the tram rides the avenue, the ferry calls the pier, the copter hops the helipads, the shuttle
runs the grid). No dead rule, no unhonoured label — and the frozen-census-column law (282/287) found nothing:
Transport is entity-driven, not tile-driven. So the seam that has beaten the cue list for five laps is, for once,
clean. **Transport's stalest ADDITIVE cell is New element (untouched since iter 164)**, and the harbour — which just
gained a pier+ferry (249), moored boats, a lighthouse, channel buoys (296) and an anchored container ship "at anchor
in the roadstead, **waiting on a berth**" — had the one working craft a real roadstead never lacks: **a harbour
launch** to work the ship at anchor. Nothing tended her; the roadstead had no life of its own.

**Change (New element — `launches`).** A small harbour launch runs the short leg between the harbour waterline and
the anchored ship's side, ping-ponging out-and-back with a dwell at each end (the copter's idiom: smoothstep along
the leg, `dir` flips at `t>=1.3`). Endpoints derived LIVE from the ship it works — `launchPts()` returns
`[[shoreAtF(f.y)+1.3, f.y], [seaXFr(f.y,f.fr)-1.2, f.y+0.6]]` (off the waterline · alongside the hull) — so `launchPos`,
the `bucketAdd`, the draw and the tooltip all read ONE predicate and the launch cannot drift from the ship it tends.
`drawLaunch`: a low workboat hull, a white wheelhouse with a coral livery band, a mast, a wake thrown only while
making way (dies at the dwell), and a warm wheelhouse + white masthead at night (raw literals — a light SOURCE, in
the harbour boats' marine vocabulary, cf. the ferry/buoys). `stamp()` + an `ENTINFO` row whose `sub` reads the leg
she is on NOW (105): *Running out / Standing by the ship / Putting back / Made fast*. She exists only while a ship
rides at anchor (`launchAnchor` = `freighters.find(f=>f.anchored)`). **Math.random only, never `rng()`** — the
service cannot perturb the seeded simulation.

**Census.** Core **byte-identical** — `pop`/`roads`/`developed` **+0**, tile histogram empty (draw + Math.random,
no terrain). `launches 0 → 9` (1/city × 9-cell matrix), `transportModes +9` (a new mode in every cell). `solarRoofs
+2` is the RAF tick-count wobble (226), core untouched.

**Probe** (`probes/probe-launch.mjs`, pure world data off the artifact's OWN `launchPts`/`launchPos`, 6 seeds ×
2 eras, no render). Three gates, each falsifiable: (1) **EXIST 1↔1** — one launch per anchored ship, every seed:
PASS. (2) **PATH ALL WATER** — sampling her whole ping-pong (both legs, dwell included), **100.0%** of positions land
on WATER/KELP/MARSH (the artifact's own `WETSET`; a launch floats over a kelp bed just as over open water) with **0**
on the ship's own hex: PASS. (3) **GEOMETRY threads shore→ship** — shore end **+1.30** seaward of the waterline, ship
end **+1.20** inshore of the hull, on every seed: PASS. Controls (250): the anchored freighter's own cell is WATER
(the water test is meaningful, the ship genuinely offshore) on 6/6; the discriminator (one column inshore of the
shore end is non-wet) fires on 3/6, confirming she sits right at the water's edge. *The kelp beds are the reason the
first, too-strict `T.WATER`-only test read 56–93% on two seeds — the launch was over a kelp bed, which is water; the
year-dependence (100% at 2035, 56% at 1990 on seed 99) was the now-live kelp CA (282) retreating between the eras.*

**Visual.** Both seeds **PASS** (`probes/shot-launch.mjs` — freezes in-page, aims at the anchored ship, poses the
launch mid-leg (moving, wake up) and alongside (night, lights lit), day + night + un-zoomed whole-city). The launch
reads as a small reddish workboat with a white wheelhouse, out on the water between shore and the navy container
ship, running out to her; the night frame shows her masthead light beside the ship's deck lights, buoys flashing
along the shore. Whole-city on both seeds: balanced, coherent coastal city — no z-order tears, floating tiles,
blown-out color, or compounded clutter (she is tiny at fit zoom, as a sparse water craft should be).

**Verdict: SHIPPED** — the roadstead has its working craft; the ship "waiting on a berth" is now tended, a launch
running out to her side and putting back to the harbour, named and lit on her own hours. ~6 path objects, one per
city — free by construction.

## Iteration 298 — the moon traverses the night (2026-07-15) [Sky & atmosphere × Deepen]

**ADOPTED, NOT AUTHORED.** Found the `grow-city` worktree dirty at startup: a complete, uncommitted iteration 298
that reached its gates but was killed before step 5 (no ledger entry, no commit; census-baseline/history modified,
its two probes written at the root). Per the skill's "gates decide, not the ledger" path I re-ran the gates myself,
confirmed the diff reads as one coherent change, and adopted it. Entry written from the diff + my own re-verification.

**The gap.** The sun arcs overhead all day (iter 200's screen-space sun), but the MOON hung motionless in one corner:
both readers — the disc/halo/craters draw and the moonglade sea-shimmer — hard-coded ONE screen point
(`iw*0.80, ih*0.15`), so its position was a CONSTANT for the artifact's whole life (DISTINCT MOON POSITIONS = 1, the
defect stated — 236). A sky where one luminary moved and the other was pinned.

**Change (draw-only, no `rng()`, no terrain).** A new `moonPos()`: the disc rises low out of the open RIGHT corner at
dusk, drifts right→left (the sun's own east-to-west sense), stands highest near solar midnight, sinks back left toward
dawn. `mnP` runs 0(dusk)→1(dawn) off `dayT` (the pre-dawn tail past midnight unwrapped onto [1,1.14]); altitude is
`sin(π·mnP)`. x is CLAMPED well right of the `.placard` (which owns the top-left corner, 200) so the moon never sets
behind the DOM card. **ONE predicate, both readers on it** (153's rule, at last true of the POSITION not just the
phase): the two hard-coded `iw*0.80,ih*0.15` sites — the disc and the moonglade's world-projection — now both call
`moonPos()`. Nothing else changed; the moon's phase/`MOONF` gating (dim earthshine disc + lit lune) is untouched.

**Census.** Draw-only → **PASS, 0 page errors**, every metric byte-flat (no terrain, no `rng()`). Vacuous by
construction; the gates are the probe + the eyes.

**Probe** (`probes/probe-moonarc.mjs`, adopted + repathed into `probes/`). **A** (build-agnostic, HEAD fallback →
DISTINCT=1): the moon anchor is **10/10 DISTINCT** across the night on both seeds, x arcs **855→1239** (right→left),
min-x 855 clears the placard edge (340), and altitude rises to a peak at **dayT 0.94** (solar midnight). **B**
(isolation, patch only): floor(same point twice) **0px**; move the anchor and disc+glade shift **4195/4261px**; drag
the moon off-screen and the glade ink **collapses 2017/2069px** — proving BOTH readers honour `moonPos()`, not a
literal. **PASS on both seeds.**

**Visual.** Two agents (one per seed) BOTH returned FAIL — and on measurement **neither names a defect the change
introduced** (the loop's law: a FAIL is a cue to MEASURE, and when agents disagree a number is the verdict):
- Seed 42 "no moonglade": seed 42 is a **near-NEW moon all night** (MOONF 0.014–0.047), which correctly casts almost
  no glade. Seed 7 (**near-FULL**, MOONF 0.74–0.96) shows the glade present and tracking at dusk/midnight — so the
  glade works; probe B already proved it tracks `moonPos`. Absent-on-a-new-moon is correct depiction.
- Seed 7 "no pre-dawn moon": the pre-dawn disc renders **552px of ink, all within 60px of its position** (vs 2205px
  at midnight), correctly z-ordered and NOT occluded (occlusion measured: moon-on vs moon-off). It is present — just a
  smaller/dimmer gibbous disc that the arc has moved over the busy downtown (vs HEAD's fixed corner over empty water),
  so the agent missed it. Seed 42's agent DID find its (fainter) pre-dawn moon. Both agents confirmed the arc reads
  correctly and beautifully dusk→midnight, no z-order tears / doubled moons / blown-out colour, whole frame coherent.

**Watch (banked cue).** The arc's LEFTWARD/pre-dawn end carries the moon over the city core, where a bright moon reads
as a smaller target than it did over open water — correct z-order, but less prominent. A future polish could keep the
moon a touch higher through the left half of the arc (over the skyline, not among it). Not a defect; the moon is drawn
and present throughout.

**Verdict: SHIPPED (adopted)** — the moon now climbs an arc across the night instead of hanging pinned in a corner,
and the moonglade pool slides along the water beneath it. Draw-only, path count flat, free by construction. The two
visual FAILs were investigated and refuted/explained by measurement, not overridden on vibe.

## Iteration 299 — a market cross for the empty square (2026-07-15) [Civic & culture × Polish]

**Vector.** Civic rotation (oldest domain: last real Civic lap was 292; 298 spent Sky, so Civic is least-recently
touched). Civic's additive is CLOSED (292: the event-venue category {market, stadium, amphitheater} is complete) and
its Connect is measured-sound (285's civic mile), so the honest kind is **Polish** — stale for Civic since 231. The
banked cue **(bf)**: the market's packed-away square reads BALD. 285 gave the market a trading day and a closed state,
but the closed state was only three faint pitch scars (`sandDk`) and a two-rect trestle stub on cream paving — a big
pale hexagon with almost nothing on it. A closed *market* square should still read as a market.

**Change (draw-only — no `rng()`, no `Math.random`, no terrain).** In the `T.MARKET` draw case:
- **A permanent stone market cross** — the square's civic marker, the single strongest "this is a market square"
  signal — set in the front-left corner (`gx-0.23,gy+0.23`), clear of the three pitches: stepped plinth → shaft →
  cross-head → finial (`stone`/`stoneDk`). Drawn every state, so a *closed* square carries it; when trading it tucks
  behind the stalls (drawn after) and the trading frame is byte-unchanged.
- **Enriched packed-away state** (`ma<=0`): chalked pitch **bays** (top/bottom edge + end posts, so the empty pitches
  read as marked bays, not smudges), a **folded-trestle stack** (four planks + two leaning A-frame legs, `deck`/
  `deckDk`), and a small **crate pile** (two boxes with darker lids). All in the existing wood/stone vocabulary.

**Census.** Draw-only → **PASS, 0 page errors**, core **byte-identical** (`pop`/`roads`/`developed` +0, tile
histogram empty). Vacuous by construction; the gate is the eyes.

**Visual.** `shot-marketday.mjs` (285's market camera) + a centered close-up (zoom 7.5, aimed at `ctr(market)`) at the
CLOSED pin (a day the square holds no market → bald in daylight) and the OPEN pin, patch vs pristine HEAD, both seeds.
- **Seed 42 market @42,6 (ink-exposed):** the closed-square before/after is decisive — HEAD is a bald pale hexagon
  with three faint scars; the patch reads instantly as a closed market square (stone cross unmistakable, folded
  trestles, crates, chalk bays). No z-order tear, no floating, no blown colour.
- **Trading state:** stalls up and dominant, the cross a subtle background element behind them — no clutter, clean
  (patch's open frame is essentially HEAD's; the cross is occluded by the stalls, which is why the discriminating
  pair's OPEN frames came back byte-identical while only the SHUT frame moved).
- **Whole-city (un-zoomed):** balanced, coherent coastal city; the market detail is correctly invisible at fit zoom
  (a sub-hex ornament), nothing compounded.
- ⚠ *Instrument note:* `shot-marketday`'s tight clip (`x:510,w:380`) can leave the market's stall centre at/over the
  clip edge, so its OPEN/LIT frames may not contain the stalls (its SHUT frame here still carried the change). A
  centred pan (`ctr(x,y)` → viewport centre, generous clip) is the reliable close-up; noted for a future camera fix.

**Verdict: SHIPPED** — the closed market square now reads as a market: a stone cross standing over folded trestles and
chalked pitches, whether the stalls are up or down. Draw-only, path count flat (a handful of fills on a few market
tiles), free by construction. Cue (bf) CLOSED.

## Iteration 300 — the busker packed up as the crowd finally thinned, but the crowd it played to never did (2026-07-15) [People & activity × Polish/FIX]

**Vector.** People rotation (293 oldest), Deepen CLOSED (14 deep) ⇒ **Polish** (its stale cell, last 226). Not the
cue list — grep the seam. Grepping every People/entity draw for a gate on a **global-monotone** signal (the recurring
cliff: 199 windows · 210 residents · 230 traffic · 262 child · 286 kite/kayak) surfaced the last holdout:
`drawBuilding`'s COM branch, *"evening crowd out on the strip, under the neon"*, gated `if(LITAMT>0.35&&v>0.6)`. So
every lit shopfront strip (COM, `c.v>0.6`) filled with the **same crowd at the same instant** at dusk and stood there,
identical, **all night** — while the **busker on that very kerb** (`buskerAt`, `buskOut`) went in on its own per-hex
hour. The busker's own comment names the defect: it *"packs the guitar away as the crowd finally thins"* over a crowd
whose *"evening crowd is its audience"* — **the audience outlasted the performer, for the artifact's whole life.**

**Change.** Add `&& nightAmt()<stripOut(x,y)` to the crowd gate, and a per-hex closing hour beside `buskOut`:
`const STRIP0=0.45, STRIPJ=0.52; const stripOut=(x,y)=>STRIP0+STRIPJ*hashCell(x,y,seedNum^0x5B27)`. The band is
**taken from the ladder** (226), sitting just under BUSK so the busker is on average the last to leave its own audience
(`KID~0.35 < JOG=SURF=KAYAK 0.62 ≈ STRIP 0.45..0.97 ≲ BUSK 0.55..0.97 < CURF 1.85`). hashCell-staggered (per-cell draw
⇒ the stagger is the ground, not a carried phase), no `rng()`/`Math.random`/terrain. The crowd thins one strip at a
time through the small hours — quiet strips empty first, the liveliest stay till nearly dawn — and (like the residents,
`pedHidden`) the strip fills again as the sky comes up.

**Census.** Draw-only, no rng, no terrain ⇒ **core BYTE-IDENTICAL** (`pop`/`developed`/`roads` +0, tile histogram
empty). VERDICT: PASS. The census is vacuous here (the gate is the probe + eyes).

**Probe** (`probes/probe-stripcrowd.mjs`, TEMPORAL, no pixels, build-agnostic via `stripOut` detection). Counts the
strip cells the draw's own gate admits, swept across the lit night, 2 seeds at 2035. **HEAD: crowd CONSTANT at 99/73
across the whole lit night — `DISTINCT COUNTS = 1`** (the cliff, the defect stated, 236). **PATCH: evening peak 99→2
(seed 42, 2% of peak) / 73→0 (seed 7); `DISTINCT = 7`; refills at dawn** (na 0.03 ⇒ full, matching the residents).
Controls all hold: **HOST** (COM strip cells) 99/73 identical HEAD↔patch; **DAY crowd** 0 in both (dead-regime, 199);
**BUSKER** (untouched, `__buskers`) varies in BOTH builds (15→0 / 22→1) — the sweep is live (248). The **evening peak
equals HEAD exactly** ⇒ the change adds nothing at the dusk fixed point (245).

**Visual** (`probes/shot-stripcrowd.mjs`, discriminating pair, evening vs small-hours, whole-city, frozen). Both seeds
**PASS**, both blind agents correctly named the *evening* frame as the busier one (crowd 99/73 vs 16/13) and found no
z-order tears / floating tiles / blown-out colour; each frame reads as a coherent night city.

**Verdict: FIXED** — the seventh recursion of the 262 cliff, on the last People holdout: the neon strip crowd now keeps
an hour like everyone else in the city, and the busker no longer plays to a frozen audience.

## Iteration 301 — the herd grazed the meadow edge at 4am in midwinter, the same nine head as noon (2026-07-15) [Nature × Deepen/FIX]

**Vector.** Nature rotation (294 oldest). Its additive is spent and its Polish debt paid (294) ⇒ **grep the CA/entity
seam**, not the cue list (the header's own instruction). Grepping every animate draw for a global-monotone gate — the
recurring cliff (199 windows · 210 residents · 230 traffic · 262 child · 286 kite/kayak · 300 strip crowd) — turned up
the one holdout the enumerate-the-CATEGORY grep (271/286) had walked past, because it is not a person, a boat or a
kite: **`drawDeer` opened on `const[cx,cy]=px(...)` with NO GATE AT ALL.** Nine mule deer, spawned once per city,
grazing the meadow-and-woods edge, drawn at full detail at 4am in midwinter identically to noon in midsummer, on every
seed for the artifact's whole life — the **last animate thing in Solvista that kept no hour** (every person keeps
`curfewAt`/`kidOut`, every boat/surfer/kayak/kite `waterOut`/`kiteOut`, the busker and its crowd `buskOut`/`stripOut`,
and the beach a season, 247).

**Change.** `deerSession()=clamp(1−nightAmt()/DEERDARK,0,1)` (`DEERDARK=0.6`) and `deerOut=d=>d.ph/7`, and one line at
the top of `drawDeer`: `if(deerSession()<deerOut(d))return;` (before `stamp()`, as drawSurfer/drawKayak/drawPed do — a
bedded deer is not out there to be hovered). The herd melts into the cover one head at a time as the dark comes down,
last bedded about where the joggers are all in, and refills at dawn (like the residents, `pedHidden`). **THE HOUR IS
TAKEN FROM THE LADDER (226)**: `KITE=KID(~0.35) < DEER ≲ JOG=SURF=KAYAK(0.62) ≈ STRIP≈BUSK(0.55..0.97) < CURF(1.85)`.
**DERIVED, NOT DRAWN (262):** `d.ph` is already `Math.random()*7`, so `deerOut` reads it here and no deer draws a value
of its own — the shared `Math.random` stream stays byte-identical, every other entity provably untouched. A `nightAmt()`
gate cannot express a midday siesta (it is 0 all day), and mule deer graze the cool evening anyway — so night-bedding
only, and the whole DAY is byte-identical (a free dead-regime control, 199).

**Census.** Draw-only, no rng, no terrain ⇒ **core BYTE-IDENTICAL** (`pop`/`developed`/`roads` +0, tile histogram
empty; `deer` spawn count 54 unchanged — only the DRAW gates). VERDICT: PASS (vacuous here; the gate is the probe + eyes).

**Probe** (`probes/probe-deerhour.mjs`, TEMPORAL, no pixels for the headline, build-agnostic via `deerSession` detection).
Counts the deer the draw's own gate admits, swept across the lit night, 2 seeds at 2035.62. **HEAD: 6 head CONSTANT
across the whole lit night — `DISTINCT COUNTS = 1`** (the cliff, the defect stated, 236). **PATCH: thins one at a time
6→5→3→1→0 through the evening and deep night, `DISTINCT = 5`, refills at dawn (day control 6).** Controls all hold:
**HOST** (deer spawned) 6 identical HEAD↔patch; **DAY** 6 in both (dead-regime, 199); **positive control SURFERS**
(`waterOut`, untouched) reads `DISTINCT = 6` and **byte-identical between HEAD and patch** (9→8→5→3→2→0) — so the sweep
is live and the surfers are provably unperturbed (248/271). **259 CHECK**: deer render **28/30 px at deep night** (all
forced out, diffed against deer-emptied) ⇒ bedding them is a *visible* change, not a no-op.

**Visual** (`probes/shot-deerhour.mjs`, discriminating pair — DAY (deer out) vs DEEP-NIGHT (bedded) — aimed at the
densest deer cluster by its own `ctr`, zoomed 4.8×, plus a whole-city frame). Both seeds **PASS**, both blind agents
found deer grazing the meadow/woods edge in the day crop (1 clear on s42, 4–5 on s7) and **none** in the same crop at
deep night; both read the whole city as a coherent, balanced coast with no z-order tears, floating tiles or blown-out
colour.

**Verdict: FIXED** — the eighth recursion of the 262 cliff, and the last animate holdout in the city: Solvista's deer
now keep an hour like every person, boat and kite, bedding down in the trees at nightfall instead of grazing a frozen
midnight meadow. Every animate draw in the diorama is now off the global-`nightAmt`/`LITAMT` cliff.

## Iteration 302 — the loft's rooftop studio was a garden it could not have (2026-07-15) [Urban fabric × Polish]

**Vector.** Urban fabric (rotation: Urban at 295 was the oldest domain; last iter was Nature 301). Its
tooltip/flag/TABLE seams are genuinely saturated (grepped clean at 295; land value, rooftop solar/green
roofs, corner shops, lofts, parking lots, boulevards, arterials, festival streets, bus stops all named off
the SAME predicate their draw gates on). Rather than force the stale Interaction/UX cell (133) with nothing
to fix, I took the standing banked Urban cue **(au)** — a real, concrete draw defect in the right domain
(285–301's rule: a real defect beats a forced kind in a saturated one).

**Change.** The converted-warehouse loft (`c.loft`, iter 267) draws a small rooftop studio — the *"studios
above"* its tooltip has always promised. It was one line: `prism(...,col('sage',1),col('sage',0.6),
col('sage',0.85))` — the **EXACT palette entry** the green-roof garden (`c.groof`) uses for its planter box
and shrubs. So the studio was green-dominant vegetation-coloured and read as a **roof garden** — a garden
the loft's `T.IND` tile *cannot even carry* (`c.groof` is set on MID/COM/TOWER only). Repainted it as a
glazed white penthouse studio: a pale box (`col('white')`/`col('whiteDk')`), a broad north-light window
band (`colLit('glass',0.82,lit)` — plain glass-grey by day, warming with the scene's `lit` after dark), and
a warm gold studio lamp (`col('gold',1.5)` under `LITAMT>0.4`) — the last light burning in a live-work
block, and unmistakably not a garden.

**Census.** Draw-only, no rng/Math.random, no terrain → **BYTE-IDENTICAL** (`pop`/`roads`/`developed` +0,
empty tile histogram, `greenRoofs`/`solarRoofs` +0), 0 page errors. Vacuous for a draw-only vector; the
gate is the probe + the eyes.

**Probe** (`probes/probe-loftstudio.mjs`). **(A) COLOUR PROOF** — deterministic, no render, no clock, no
noise floor: the studio colours evaluated through the artifact's own `col()`/`colLit()` (so through the
illuminant, 275), at day and night. HEAD's `col('sage')` studio is **GREEN** (G the max channel) and
pixel-matches the green-roof box — `rgb(124,168,117)` vs `rgb(131,178,124)` at day, both green — which IS
the cue's mechanism, stated. The patch's three layers — walls `rgb(237,245,245)`, glazing `rgb(135,176,190)`,
lamp `rgb(255,241,91)` — are **not green on any layer, day OR night**. `HEAD matched the green roof: true`;
`PATCH no longer green: true`. **(B) HOST CENSUS** — lofts exist at 2035 on all 6 seeds (1–4/city), with
screen coords for the camera.

**Perf.** ~3 extra path objects per loft (a prism → prism+band+conditional band) × ≤4 lofts/city; the gold
lamp draws only while `LITAMT>0.4`. Negligible (<0.05%); draws no rng()/Math.random.

**Visual.** Both seeds **PASS** (blind whole-city + 5.5x day/night close-ups, camera aimed at the
best-exposed loft by measured ink). Seed 42: *"a small pale/white glazed box, not green vegetation… at night
that same box glows with a warm gold/yellow lit window — clearly a lit penthouse studio, not a dark planted
garden… sits squarely on the roof, no floating gap, no z-order tear."* Seed 7: *"a pale WHITE glazed box, a
small penthouse studio sitting flush on the roof cap. No green vegetation reads there… the rooftop box
carries a warm lit window."* Both whole-city frames coherent — no floating tiles, tears, blown-out colour,
or clutter anywhere.

**Verdict: SHIPPED** (closes cue **(au)**) — the loft's roof-studio no longer masquerades as a green roof
it structurally cannot have; it now reads as the glazed live-work studio the tooltip has always named.

## Iteration 303 — the herons stalked a frozen midnight marsh; now they fly to roost at dusk (2026-07-15) [Water & coast × Deepen/FIX]

**Vector.** Water & coast rotation (296 oldest). The header's instruction is to grep the CA/entity seam,
not the cue list — and grepping every animate water draw for a global-monotone gate (the recurring cliff:
199 windows · 210 residents · 230 traffic · 262 child · 286 kite/kayak · 300 strip crowd · 301 deer) turned
up a holdout **301 itself had walked past while declaring it fixed**: `drawHeron` (untouched since iter 17,
*"No frame step"*) opens on `const[cx,cy]=px(...)` with **NO GATE AT ALL**. Six white and grey great herons
stalking the estuary marsh at 4am in midwinter, identically to noon, on every marsh seed for the artifact's
whole life. And 301 declared the deer *"the LAST animate holdout"* and *"EVERY animate draw in the diorama
is now off the global-`nightAmt`/`LITAMT` cliff"* — **while citing the heron BY NAME as a control it had
left untouched** (204/262). It never asked whether the heron *needed* the fix (286: the must-not-move column
is a list of what you did not CHANGE, not of what is CORRECT). It did — the **9th recursion of the 262
cliff, hiding inside the deer lap's own control list**.

**Change.** `heronSession()=clamp(1−nightAmt()/DEERDARK,0,1)` and `heronOut=h=>h.ph/7`, and one line at the
top of `drawHeron`: `if(heronSession()<heronOut(h))return;` (before `stamp()`, as drawDeer/drawSurfer/
drawKayak do — a roosted heron is not out there to be hovered). Great herons roost in the trees at dusk, so
the marsh empties one bird at a time as the dark comes down. **OFF THE SAME CLOCK THE DEER KEEP** (`DEERDARK`
— no new constant, 226): the heron sits at the deer's rung of the ladder. **DERIVED, NOT DRAWN (262):**
`h.ph` is already `Math.random()*7` (iter 17), so `heronOut` reads it here and no bird draws a value of its
own — the shared `Math.random` stream stays byte-identical, every other entity provably untouched. A
`nightAmt()` gate is 0 all day, so the whole DAY is byte-identical (a free dead-regime control, 199).

**Census.** Draw-only, no rng/Math.random, no terrain ⇒ **core BYTE-IDENTICAL** (`pop`/`developed`/`roads`
+0, empty tile histogram; `herons` spawn count 54 unchanged — only the DRAW gates). `greenRoofs` −1 is the
226/278 RAF-tick wobble (reproduces on a same-file re-run; a hair-slower draw lands one fewer late-CA tick),
not semantic. VERDICT: PASS (vacuous here; the gate is the probe + eyes).

**Probe** (`probes/probe-heronhour.mjs`, TEMPORAL, no pixels for the headline, build-agnostic via
`heronSession` detection). Counts the herons the draw's own gate admits, swept across the lit night, 2 marsh
seeds at 2035.62. **HEAD: 6 head CONSTANT across the whole lit night — `DISTINCT COUNTS = 1`** (the cliff,
the defect stated, 236). **PATCH: thins one at a time 6→5→4→3→0 through the evening/deep night, `DISTINCT=5`,
refills at dawn (day control 6).** Controls all hold: **HOST** (herons spawned) 6 identical HEAD↔patch;
**DAY** 6 in both (dead-regime, 199); **positive control SURFERS** (`waterOut`, untouched) reads
`DISTINCT = 5–6` and **byte-identical between HEAD and patch** (9→…→0) — the sweep is live and the surfers
provably unperturbed (248/271). **259 CHECK**: herons render **53–61 px at deep night** (forced out, diffed
against herons-emptied) ⇒ roosting them is a *visible* change, not a no-op.

**Visual** (`probes/shot-heronhour.mjs`, discriminating pair — DAY (herons out) vs DEEP-NIGHT (roosted) —
aimed at the densest heron cluster by its own `ctr`, zoomed 5.2×, plus a whole-city frame). Both seeds
**PASS**. Both blind agents found several white/grey wading birds standing in the marsh shallows in the day
crop and **none** in the same marsh at deep night; both read the whole city as a coherent, balanced coast
with no z-order tears, floating tiles or blown-out colour.

**Verdict: FIXED** — the ninth recursion of the 262 cliff, and the *actual* last animate holdout in the
city: Solvista's herons now fly to roost at nightfall like every person, boat, kite and deer, instead of
stalking a frozen midnight marsh. 301's "every animate draw is off the cliff" is now — verifiably — true.
