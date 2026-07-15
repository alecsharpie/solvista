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
| **Nature** | 4, 26, 29, 102, **156**, **174** | 1, 13, 60, **206**, **279**, **287** | 37, 46, 67, 76, **108**, **120**, **139**, **166**, ~~**233**~~, **238**, ~~**246**~~, **263**, **272** | ~~46~~, ~~88~~, ~~101~~ | U4 | 53, 96, **194**, ~~**198**~~, **215**, **221**, ~~**251**~~, **294** | **117**, **129**, **148**, **183** |
| **Water & coast** | 6, 10, 12, 16, 20, 33, 106, **169** | 90, **282** | 17, 25, 51, 65, 72, **113**, **123**, **159**, **196**, **245**, **257**, **289** | 22, ~~**205**~~ | | U2, 44, 58, 79, **116**, **132**, **150**, **185**, **214**, **223**,  **234**, ~~**255**~~, **266**, **268**, **275** | **97**, **141**, **176** |
| **Urban fabric** | 32, 62, **295** | 7, 23, ~~82~~, **151**, **281** | 38, 54, 68, 92, **165**, **173**, **189**, **199**, **209**, ~~**218**~~, **219**, ~~**254**~~, **267**, **288** | 47, **109**, ~~**160**~~ | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103**, **110**, **118**, **124**, **143**, **180**, **216**, **220**, **224**, **228**, **235**, **239**, **274** | **133** |
| **Transport** | 2, 9, 21, 31, 48, **164** | 77, **283** | 28, 39, 55, 63, **112**, **121**, **128**, **155**, **179**, **193**, **230**, **249**, **258**, **269** | 5, 15, **138**, **211**, **276** | U4 | U1, U3, 70, 85, 87, 94, **146**, **188**, ~~**203**~~, **241**, **243** | **105**, **171**, **290** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107** | 36, 59, 66, 80, 91, **149**, **158**, **175**, ~~**195**~~, **213**, **244**, **250**, **259**, **277**, **285**, **292** | 45, **204** | | 73, ~~**114**~~, **168**, **231**, ~~**270**~~ | 52, 122, **140**, **184** |
| **Sky & atmosphere** | 27, 43, **291** | | 19, 35, 50, 57, 95, **135**, **153**, **161**, **181**, **190**, **208**, **225**, **236**, **253**, **261**, **280**, **284** | | | 61, 81, 89, **115**, **200**, **242**, **248**, **265**, ~~**273**~~ | ~~**134**~~, **144** |
| **People & activity** | 41, 56, **127**, **170**, **186**, **293** | 49 | 34, 64, 93, **104**, **119**, **145**, **178**, **201**, **210**, **240**, **247**, **262**, **271**, **286** | 78, **111** | | 84, **137**, **163**, **226** | 71, **154**, **191**, **278** |

- **Interaction/UX** (inventory + the `<meta charset>` repeal archived at 270; both are INVARIANTS in SKILL.md). What
  steers: when adding an entity array, `stamp()` it in its draw + add an `ENTINFO` row (same discipline as the census
  hook) — `stamp()` also draws the focus ring, so any stamped entity is ringable free. **An `ENTINFO` `sub` may be a
  FUNCTION of the entity (105)** — use it when a thing's interest is its *membership* (line/route/depot), computed live.
- ✅ **THE TRIM METHOD** (paid 279, again 280): a block is cuttable when its **LAW is in SKILL.md** and its **ARTIFACT
  FACTS compress to their imperatives**; a *superseded* warning is free to cut (280's `__setWind` retired 275's).
  There is never a block you can simply *delete* — **compress the oldest, and pay for your OWN additions in the same lap.**
- **ROTATION.** Last: Transport **290** · Sky **291** · Civic **292** · People **293** · Nature **294** ·
  Water **289** · Urban **295**. ➡ **NEXT: Water (289, oldest).** ⚠ **295 SPENT Urban's stale New element cell** (surface car parks on downtown gap-tooth lots — draw-only on EMPTY). Urban's stale kind is now **Interaction/UX (133, ancient)**; its flag/TABLE seam was grepped CLEAN this lap (solar/groof/corner/loft/hstr all agree WRITER/DRAW/TOOLTIP/VETO; BEDT/CIVHRS/valueSrc/VKIND all cover their category). Do NOT default to the banked (au) Polish cue (Polish is 18 laps deep).
  ✅ **292 CLOSED CIVIC's additive: the event-venue category {market, stadium, amphitheater} is COMPLETE** (crowd pool + `residentWhere` enumerate all three off the shared `concertShow`/`concertLive`; the bowl was the un-enumerated third — 285's type blindness). Civic stale stays New CA rule (36/107) + Connect (measured-sound).
  **291 broke Sky's Deepen streak with a NEW ELEMENT — the sparsest Sky cell (3rd ever). Sky's additive was NOT fully
  spent: the elaborate weather front was a live host with no dramatic payoff, and lightning was the missing one.**
  ✅ **NATURE'S POLISH DEBT IS PAID (294)** — spent both banked paired cues **(ax)** fairy-ring cap contrast +
  **(bg)** the countryside solar blue together, both CLOSED. Nature's stale kinds are now **New element (156/174)**
  and **Connect (all ~~struck~~)**; its next lap should grep the `tick()`/CA seam (287/279 pattern) before the cue list.
  ⚠ **PEOPLE's Deepen cell is now 14 deep and is CLOSED for rotation purposes** — its stale cells are
  **Polish (226)** and **New CA rule (49)**. Do not take another People Deepen without a measured seam.
  ✅ **CIVIC'S TWO-LAP DEBT IS PAID (285).** ⚠ **CIVIC's stale cells are STILL New CA rule (36/107) and Connect
  (45/204)** — 277 and 285 both took Deepen. ✅ **BUT CONNECT IS NOW *MEASURED* STALE: 285 probed the civic mile
  (`c.fete`) and the seam is SOUND** (11–30 cells, 1.4–3.7% of road, 2–5 short runs, 2.2–2.8 institutions in
  reach — exactly what its comment promises). **Do not "fix" it.**
  ⛔ **TRANSPORT'S TWO NAMED CUES ARE `polish-tile` JOBS, NOT GROWTH LAPS** — (a) the elevated transit and (av) the
  tram's catenary are the SAME 0.5px hairline family; do not spend a growth lap on either. ⇒ **Grep its `tick()`/
  `stepVehicle` seam and its FLAGS instead** (267 · 274 · 281 · 282 · **283**: FIVE straight laps where the RULES seam
  beat the cue list). Transport's stale cell is now **Interaction/UX (171)**.
  ✅ **CUE (bd) CLOSED BY 284** (and it was TWO readers, not one — see 284's facts).
  ➡ **NEXT cues: (au)** loft roof-studio reads as green roof (Urban × Polish, 274's half), **(ay)** windrow LENGTH
  (POLISH ⇒ not Water's next), **(az)/(ba)** 278's two (below), **(bf)** market packed-away square reads bald (Civic ×
  Polish), **(bh)** over-bright plaza flame-blob (Nature/park Polish, 293). ✅ **(ax)+(bg) CLOSED by 294.**
  ✅ **PEOPLE's four-Deepen run is BROKEN (278 took Interaction/UX, its stalest cell at 191).** Its **Polish** (226) is
  now the stale one. **Interaction/UX is no longer the stale COLUMN** — it ran at 278 after 49 laps dormant.
  🔑 **225'S GREP-THE-SEAM LAW IS 25 FOR 25 AT *FINDING*** (**288: the FLAG-LIFECYCLE grep — `c.solar`/`c.groof`, the two rooftop-tech CAs the HUD counts and the tooltip names, were written on RES/MID/COM and DRAWN nowhere on a TOWER, so downtown's tallest roofs could never carry them — 285's type-hierarchy blindness, found by grepping the WRITER against the DRAW branch.**) (**287: `SOLARF` — fully drawn, promised on the placard,
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
  **288 (law in SKILL.md — 285's type-hierarchy blindness; numbers in the entry):** 🔴 **THE TOWER CAN NOW WEAR ROOFTOP TECH — IT NEVER COULD** (`c.solar`/`c.groof` written on RES/MID/COM, DRAWN nowhere on a TOWER; COM→TOWER saturates by 1996, 14 yrs before solar starts). Both writers now include `T.TOWER`; drawn on the flat deck at `h` **BEFORE the crown** so the penthouse/spire rises through it, mast/helipad above. ⚠ **WHOLLY INERT** — flag draws nothing `rng()`-gated, hashCell time-salted ⇒ census core **BYTE-IDENTICAL**; solarRoofs +258 / greenRoofs +125 (now counted honestly). ⚠ **THE GHOST WAS ONLY ~1%** (the upgrade saturates before adoption starts) — **not** 281's 92%. ⚠ **THE CONTAGION IS REAL — DO NOT "FIX" IT** (`probe-roofspread`: solar 2.22x its own scattered null, green 4.63x; 283's dead boulevard was 1.34x). ⚠ **THE RESIDUAL 0.3% CIVIC/IND GHOST IS DELIBERATELY UNTOUCHED** (scope; those writers still omit them).
  **287 (law in SKILL.md; numbers in the entry — IMPERATIVES ONLY):** 🔴 **THE SOLAR FIELD NOW EXISTS — `SOLARF` was 0 on every seed/era for 180 laps** (drawn + labelled + `valueSrc`, promised on the placard, banked open at 107). ⚠ **THE BUG WAS THE *SPACE*, NOT THE POOL** — an `rc()` lottery expects ~0 conversions in the whole 2012–2035 window; the vineyard/orchard did NOT starve it. **A solar farm is an ARRAY ⇒ the pass scores every far field, prefers one on its own fence line, converts ONE/tick on a TICKN-salted `hashCell` (zero `rng()`).** ⚠ **`SOLARMAX=8` IS THE KNEE; `SOLARP=0.08` IS NOT TUNED** (0.04 reaches the same size — 218). ⚠ **THE SIZE IS WHAT THE COUNTRYSIDE ALLOWS** (seed 42 builds 3). ✅ **THE PANELS COST NOTHING** — `SOLARMAX=0` reproduces the patch BYTE-FOR-BYTE on 10 seeds; the census `pop −2.3%` was **100% the deleted lottery's `rng()` draws.** ⇒ ⛔ **ITER 32'S "−4% POP" IS REPEALED — DO NOT CITE.** ⚠ **`SOLARF` NOT in `RAISEABLE`** ⇒ a 2035-graded sweep is a LEAK (231). ⚠ **VISIBILITY IS THE VINEYARD'S** (226: 779 px/hex).
  **286 (law in SKILL.md; numbers in the entry):** 🔴 **THE KAYAKERS KEPT NO HOUR AND NO CALENDAR** (`drawKayak` had **NO GATE**; `DISTINCT = 1`, 9 of 9 on the river at 4am in midwinter, 6 seeds) **AND THE KITES KEPT THE WRONG KIND** (`LITAMT>0.6` — a GLOBAL MONOTONE gate ⇒ all 3 blink out in ONE frame; `DISTINCT = 2`). **`waterSession()` / `waterOut(e)` — ONE predicate, FOUR readers** (drawSurfer · drawKayak · both tooltips). ⚠ **RENAMED from `surfSession`/`surfOut` ON PURPOSE — a predicate called `surf` is one the next lap greps and MISSES the kayak (199); `probes/probe-surfsession.mjs`'s build-detector was repointed in the same lap, or it would have graded the patch as HEAD and cried a FALSE regression on the surfers.** ⚠ **THE PADDLERS TAKE THE EXISTING PREDICATE — no new constant; the water crowd answers ONE season** (249). ⚠ **THE KITE'S HOUR IS FROM THE LADDER**: a kite must be SEEN by the person on the line ⇒ **KITE = KID (~0.35) < SURF = KAYAK = JOG (0.62) < CURF (1.85)**. ⚠ **ZERO NEW RANDOM DRAWS** (`ph/7` on the uniforms both already carry) ⇒ every control (surfer/jogger/dog/ped) reads **IDENTICAL, not merely close**; census core **+0**, path objects **−36 night (a credit)**, day **byte-identical (md5-proven)**. ⛔ **THE STRAY DOG IS A FALSE POSITIVE — DO NOT "FIX" IT** (205): `drawDog` hides only through the owner, so a stray (`own=-1`, 2–5/city) never goes in — **and it has no home to go to.** ⚠ **RIG LAW: `addInitScript` FIXES THE PRNG *FUNCTION*, NOT ITS STREAM POSITION** — a second `genWorld()` respawns every `Math.random` entity ELSEWHERE, so an aim pass and a shot pass build DIFFERENT cities and the camera aims at a boat that no longer exists (two builds then render an identical empty crop, and an agent's `md5` caught it). **RE-SEED IN-PAGE BEFORE EVERY `genWorld`** (248).
  **285 (law in SKILL.md; numbers in the entry):** 🔴 **THE MARKET NOW KEEPS A DAY AND AN HOUR — IT NEVER HAD** (`DISTINCT STALL COUNTS = 1`, 6 seeds; stalls up **100%** of hours; lights on **80/80** night hours). **`marketHours`/`marketAmt`/`marketWord`(x,y) — ONE predicate, FOUR readers** (stalls · lights · tooltip · `residentWhere`), in `fixtureAt`/`matchClock`'s idiom and beside it. ⚠ **A MARKET IS A TIMETABLE ⇒ CORRECT ON `dayT`, NOT the warped `SUNT`** (284). ⚠ **SALTED PER HEX AS WELL AS PER DAY, ON PURPOSE — do NOT collapse it to one city-wide market day** (the population would blink as one; 263). ⚠ **THE STRING LIGHTS ARE WHAT THE EVENING MARKET IS FOR** (`MKTEVE=0.28`, 0.62→0.92, so `SUNDN` falls mid-market); **a MORNING market (0.10→0.52) is never lit, and that is CORRECT.** ⚠ **WHOLLY INERT** (zero `rng()`/`Math.random`, no terrain, **unreachable from `tick()`**) ⇒ census core BYTE-IDENTICAL; path objects **−0.47% day / −0.18% night** (a credit). ⚠ **AT `marketAmt===1` THE PATCH IS BYTE-IDENTICAL TO HEAD** — an exact fixed point, so a HEAD/patch A/B at the OPEN pin is *supposed* to read 0 px. **ONLY THE SHUT PIN DISCRIMINATES.** ⇒ 🆕 **CUE (bf) — THE PACKED-AWAY SQUARE READS A TOUCH BALD** (Civic × Polish; both blind agents, both seeds, unprompted). Cheap, cosmetic; the bones are there.
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
  **280:** **`windForce()` · `windDrift()` · `kiteGust()` — the sky's gust, as THREE predicates.** ⚠ **`windDrift()` IS
  THE CLOUDS' OWN EXPRESSION** (`0.55+0.9*WINDA`); balloons share it — **do not fork a second.** ⚠ **EVERY LEVER IN
  `drawKite` IS A MULTIPLE OF `kiteGust()`, WHICH IS 1.0 AT FULL GALE = HEAD'S LITERALS** ⇒ an EXACT fixed point, and
  `window.kiteGust=()=>1` renders HEAD **in-page** (253). **Do not "simplify" that centring away.** ✅ **`__setWind(v)` /
  `__wind()` — THE HOOK `WINDA` NEVER HAD** (a FROZEN page holds a pin by construction). ⚠ **No `?wind=`.** ⚠ **A KITE IS
  NOT SINGLE-FREQUENCY** — `drawKite` runs **FOUR** ⇒ a "null step" of one period is **NOT null**. ⚠ **`px()` RETURNS
  *WORLD* COORDS** (device = `(px*scale+off)*dpr`; scoring ink at `px()*dpr` returns a clean, plausible **ZERO** — 273).
  **279 (compressed 287 — full text in the archive):** 🔴 **THE WILDFIRE CA NOW RUNS.** `FIRESPK`/`TIMBSPK` **WALK `HEXI`**
  on a TICKN-salted hash ⇒ **zero `rng()`; do NOT "tidy" back onto `rc()`.** ⚠ **IT WRITES TERRAIN ⇒ expect the cascade.**
  ⚠ **NOTHING BURNS AT 2035** (`year<2030`/`<2006`) ⇒ **a `?warp=61` frame can NEVER show one**; `shot-firespark.mjs`
  drives `tick()` to a live episode. ⚠ **`tick()` DOES NOT ADVANCE `year` — `__warp` does** (`+0.45/6` BEFORE the tick).
  ⚠ **`drawFire`/BONFIRE TAKE A RAW LITERAL, NOT `col()`** (280's emitter law). ⇒ **CUE (bb) → `POLISH.md` (g2)**; 🆕 **CUE
  (bc) — THE FIRE'S GLOW IS EATEN BY LATER ROWS** (266): **a mark that must light its neighbours trails back over cells
  ALREADY PAINTED.**
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
  ✅ **(ax) FAIRY-RING CAP CONTRAST — CLOSED by 294.** Two-tone dome (shaded rim + bright crown, same footprint) in
  `drawShroom`; footprint held at 20–21 CSS px, both agents PASS on both seeds.
  ✅ **(bg) COUNTRYSIDE SOLAR BLUE — CLOSED by 294.** The uncorroborated aside was measured before touching it:
  `col('solar',1.25)` was chroma 83 / lum 99, the only cool surface among a warm/green countryside ⇒ real.
  `solar[62,82,120]→[54,66,96]` (chroma 58→42, hue held 219→222); shared coherently by field/rooftop/hull.
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

> **Archive:** the 288 entries before Iteration 286 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

## Iteration 286 — People × Deepen — the last two draws that never went home (2026-07-15)

**Vector.** People × **Deepen** (rotation: People at 278 was the oldest domain). Not from the cue
list — from a **grep of People's seam**, per 225. The banked cue **(aw)** (kayakers keep no hour)
was live but the header said *"cheap, but it REPEATS 271's mechanism ⇒ **pair it**"*. The grep found
the pair, and it found it in the place 280's law says to look: **a comment enumerating its own
category.**

**The tell.** `curfewAt`'s comment ladder (L3924) lists who keeps an hour — *"the residents
(curfewAt), the children (kidOut), the runners (j.out), the traffic (VCURF), the match crowd
(matchClock)"*. **That list is a CHANGELOG OF WHO HAS BEEN FIXED, not a taxonomy of who should
READ it** (280). Two members of the category were never in it — and one of them is **named in the
fix's own comment as a CONTROL**: 271 wrote *"the shared Math.random stream stays byte-identical,
so every **kayak**, jogger, balloon and resident is provably untouched."* **271 cited the kayak as
proof its fix touched nothing, and never asked whether the kayak NEEDED touching.**

**Measured (`probes/probe-hours.mjs`, 6 seeds × 96 pins/day × 2 seasons, no pixels ⇒ no noise floor):**

| draw | HEAD distinct | patch | ceiling | |
| --- | --- | --- | --- | --- |
| **KAYAK** | **1** (9 of 9 out at 4am in midwinter, forever) | **7–9** | 10 | `drawKayak` had **no gate at all**, exactly as `drawSurfer` had none |
| **KITE** | **2** (0 or all 3 — a binary cliff) | **3–4** | 4 | had an hour, but a **GLOBAL MONOTONE** one (`LITAMT>0.6`) ⇒ all three vanish in the SAME FRAME |
| SURFER *(control)* | 7,8,7,6,7,7 | **identical** | | 271's fix, provably alive (0 at deep night) |
| JOGGER *(control)* | 8,7,4,6,8,7 | **identical** | | |
| DOG / PED *(controls)* | 6,7,6,5,5,6 / 39,38,36,33,35,39 | **identical** | | |

**259's check ran BEFORE the design and is what licensed the lap:** a kayak at 4am in midwinter
renders **12–13.7 px — as much ink as at noon**, so the hours half is a change a viewer can
actually see, not an invisible one.

**Change.** `surfSession` → **`waterSession()`**, `surfOut` → **`waterOut(e)`** — **ONE predicate,
FOUR readers** (the two draws + the two tooltips). Renamed *because* `surfSession` gating a kayaker
is the next lap's 199-tell: a predicate called `surf` is one you grep and miss the kayak.
- The paddlers take the **existing** predicate — the same sun × the same calendar — so **no new
  constant enters the file** and the water crowd answers ONE season (249: grep for the mechanism
  the artifact already ships).
- The kite gets its own hour **from the ladder, not invented** (226): a kite must be *seen* by the
  person on the line, so the last one is down as the children go in. Ladder now reads
  **KITE = KID (~0.35) < SURF = KAYAK = JOG (0.62) < CURF (1.85)**.
- **DERIVED, NOT DRAWN** (262): `k.ph`/`s.ph` are already uniforms on [0,7), so `ph/7` is exactly
  uniform on [0,1) and costs **zero new random draws** ⇒ both streams byte-identical, which is why
  every control column above is **IDENTICAL rather than merely close.**
- Kayak `ENTINFO` `sub` frozen string → **live function** (278).

**Census.** PASS. **Every metric +0, tile histogram EMPTY** — wholly inert (zero `rng()`, no
terrain, unreachable from `tick()`). The census is *vacuous* here by construction; the probe is the gate.

**Perf.** Path objects day 110,310 → 110,351 (+41), night 138,104 → **138,068 (−36, a credit)** —
both inside `probe-drawbudget`'s ±100 floor. **Free**, as a draw-*removing* change should be.

**Visual.** Blind, crossed A/B (`probes/shot-waterhours.mjs`), both seeds. **Both agents named the
correct file from the pixels alone** (s42 → `sigma`, s7 → `kappa`; both = HEAD). Day pairs
**BYTE-IDENTICAL by md5** (`62f4381`==`62f4381`, `0355847`==`0355847`) — the required positive twin
(258) *and* the exact daylight fixed point, proven not asserted. s42's agent, told the intent,
confirmed **no orphan wake tick / paddle stroke with no hull** and said of HEAD unprompted:
*"they read as leftover daytime sprites forgotten in the night pass."* Whole-city frames clean.

**⚠ THE RIG LIED FIRST, AND AN AGENT CAUGHT IT (239).** The first shoot came back with s7's night
pair **byte-identical** while the self-report said `9/9` vs `0/9`. The agent ran `md5` itself and
refused to grade it — **correctly.** Cause: **`addInitScript` fixes the PRNG *function*, but its
STREAM POSITION keeps advancing**, so the shot pass's `genWorld` drew *different* `Math.random`
values than the aim pass's and **respawned the kayaks somewhere else** — I aimed at a boat that no
longer existed, and two builds render an empty crop identically. **Re-seed the stream in-page before
EVERY `genWorld`** (248). The camera now **self-reports `aim-miss`** and throws if it aims at nothing.

**Explored and REJECTED — the STRAY DOG.** `drawDog` hides a dog only *through its owner*
(`if(p&&pedHidden(p))return;`), so a stray (`own=-1`, **2–5/city**) is never hidden — and the
comment *concedes* it (*"a leashed dog goes home when its human does"*). It has the exact shape of
the tell. **It is a FALSE POSITIVE (205): a stray has no home to go to**, and a dog roaming a park
at night is the correct depiction, not a bug. Logged so the next lap does not re-find it.

**Verdict: DEEPENED** (and FIXED — the kayakers had no clock at all, and the kites had the wrong kind).

## Iteration 287 — the placard promised panels, and the rule that would have built them was hunting a handful of fields with nine darts a year (2026-07-15) [Nature × New CA rule/FIX]

**Vector.** Nature (oldest domain — 279). The banked cue was **(ax)** (fairy-ring contrast, Nature ×
Polish), but 225's grep-the-seam law says look at the seam first, and **282's law says the cheapest
seam-grep there is is a FROZEN CENSUS COLUMN**. One glance at the tile histogram:

```
SOLARF   0  0  0 |  0  0  0 |  0  0  0      <- every seed, every era, the artifact's whole life
```

`T.SOLARF` has a `tick()` rule, a **complete draw case** (three tilted panel rows, a sun glint on the
glass, an inverter hut, a red beacon at night), a `TILELABEL` (*"Solar field"*), a `TILEDESC`, and a
`valueSrc` entry. It has **never once rendered a pixel.** And the placard has promised it the whole
time — *"Warehouses become lofts **and far fields go solar** once the rent says so."*

⚠ **267 QUOTED THAT EXACT SENTENCE IN ITS OWN PROBE HEADER, FIXED THE CLAUSE BEFORE THE "AND", AND LEFT
THE CLAUSE AFTER IT.** 107/108 had already banked SOLARF as *"the last genuinely open dead-rule
question"* — and then nobody went back for **180 iterations**. (286's law, arriving through a *sentence*:
the clause you cite as CONTEXT is a TO-DO ITEM, not a thing you have checked.)

**The diagnosis, and it inverted the suspect I opened with.**
- *Not the pool.* 107's law says a rule can be dead because a sibling's precondition is strictly weaker
  on the same host — and the VINEYARD (1990+) and ORCHARD (1985+) sit **4 and 12 lines below**, take the
  same `T.FARM`, on a **strictly weaker** dev clause (no DEV within **1**, vs solar's within **2**),
  start 22 and 27 years earlier, and **WALK every cell while solar runs a lottery.** Textbook. **It is
  not what killed it:** the far-farm pool is alive at 2012 on every seed (**3–51 cells**).
- *The SPACE* (263). The rule was `rc()` × `ks(6)` = **9 picks/tick over ~3,400 live cells**, then
  `rng()<0.02`. Priced in its own constants, over the **entire 2012→2035 window** it expects
  **0.00–0.34 conversions** — **0.34 even on the seed carrying 51 far fields.** Not unlucky.
  **Arithmetically incapable.** A tiny host cannot be found by a uniform sample of a large space, and
  **the rate is irrelevant until the space is right** (218-rate: **0.0%** against a live pool).

**And fixing the space alone ships a BAD ARTIFACT, which is the half that decided the design.** Walk the
host with a per-parcel hash gate and the rule fires — and lays down **SPECKLE**: biggest connected run
**1 hex on 4 seeds in 6**, mean run 1.0. **A dusting of lone panels is not a solar farm**, and that is
iter 32's *"barely-visible feature"* arriving through a different mechanism. **A solar farm is an ARRAY,
so the rule needs a NEIGHBOUR** (263), a **guaranteed spark** (233 — a per-cell spark hash starves seed
42, which owns only three far fields), and a **BOUND** (282 — an unbounded spread fills its pool; seed
99's is 51 hexes).

**Change.** One walked pass, in the idiom of the two rules beside it on the same host. Each tick it
scores every far field, **prefers one on the fence line of the existing array**, and converts **one**, on
a **TICKN-salted `hashCell` ⇒ ZERO `rng()` draws**, until the array reaches `SOLARMAX`. One grower breaks
ground; the panels creep field by field.
- `SOLARMAX=8` is **the knee of the sweep**: 12 does not build a *bigger* array (mean run 5.3 → 5.5), it
  starts a **second** one, and costs more farmland.
- `SOLARP=0.08` **only sets how fast it builds out** — 0.04 and 0.08 reach the *same* size by 2035
  (218: the roll cannot steer a rule whose placement is a predicate). **It is not a tuned constant.**
- ⚠ **The size is what the countryside allows, not what the cap says**: seed 42 has three far fields and
  builds **three**. The bounding variable keeps the last word (282).

**Probe** (`probes/probe-solarfield.mjs` — pure world data, no render, no clock, no noise floor).
VINEYARD/ORCHARD are **free positive controls** (248: correct sibling conversion rules on the same host
in the same `tick()`); FARM is the **must-not-move** column (250).

| | HEAD | shipped |
| --- | --- | --- |
| SOLARF, 6 seeds × 3 eras | **0 / 18 cells — `DISTINCT = 1`, forever** | 3–8 per city, **every seed** |
| biggest connected run | — | **2–8, mean 5.3** (hash-walk alone: **1**) |
| worst seed | 0 | **3** |
| FARM (the host) | 44.7 | 39.3 |

⚠ **AND THE HONEST SWEEP IS THE ONLY ONE THAT WORKS — 231, arriving inside my own rig.** My first sweep
graded candidates on the **2035** plate and reported **0 on three seeds in six at every gate**. It was a
**leak**: the rule *runs from 2012*, and by 2035 development has eaten the far-farm pool (**s99 51 → 21,
s7 12 → 0**), so it was grading the variants on land the rule **never got to see**. Driven from 2012, the
same candidates work. **SOLARF is not in `RAISEABLE`, so a field placed in 2012 SURVIVES** while the farms
around it are built over — which is *why* the honest sweep yields arrays the 2035-plate sweep could not
see at all.

**Census.** VERDICT **PASS**. **`SOLARF 0 → 19`** (all of it at 2035 ⇒ ~6.3/city, matching the sweep);
`FARM 409 → 393` (the designed host cost). Core: `developed +4`, `roads −2`, **`pop −2.3%`**.

🔑 **AND THE POP MOVE IS 100% THE STREAM AND 0% THE PANELS — PROVEN, NOT ARGUED.** The diff deletes the
`rc()` lottery's **~7,200 `rng()` draws** over a run, so a reshuffle is guaranteed (231: ±15%/seed,
centred on zero — 3 of 10 seeds *gain* towers; mean −3.1 ± 3.3 SE). But there was also a **plausible
directional** mechanism I refused to argue away: `valueSrc(SOLARF)=0.3` vs `valueSrc(FARM)=0.56`, so the
panels could be depressing land value. **107's no-op control settles it in one command:** ship the
identical patch with `SOLARMAX=0` — same deleted draws, **zero panels placed** — and it reproduces the
full patch **BYTE-FOR-BYTE on all 10 seeds**, every TOWER, towerHt, pop and developed figure identical.

⇒ **THE SOLAR FIELDS COST THE CITY NOTHING: not one tower, not one resident, not one developed cell.**
And the mechanism is *exact*, not statistical: the only `rng()`-drawing rule that reads `T.FARM` (*"farm
clusters swell at their own edges"*) is gated **`year<1998`** and has been dead for **14 years** by the
time solar opens; and a **far** field — no DEV within 2 — is **by construction** land the development
pass never rolls for. ✅ **THIS RETROACTIVELY ACQUITS THE FEATURE OF ITER 32'S −4% POP CHARGE** — the trade
that got the solar farm reverted 255 iterations ago and kept it shelved as *"not obviously desirable"*
ever since. **32's version spread solar across land the city wanted; this one takes only fields the city
provably cannot reach.**

**Visibility, against an incumbent bar I did not invent** (226): isolated by suppressing the panels in ONE
page (230; floor exactly 0, occlusion free), the array renders **779 px/hex on seed 42 — identical to the
VINEYARD's 779 px/hex**, the sibling far-field conversion the artifact already ships and nobody has ever
called invisible. (Seed 7: 530 vs 700.)

**Visual.** Both seeds **PASS**, and **both blind agents named the shipped frame on a CROSSED map**
(s42 `kappa`, s7 `sigma`). Both, unprompted: the panels read as *"a deliberate array, 2–3 parallel banks
plus the inverter hut — not specks"*, sit correctly on the hex faces with no float/z-tear, and — the frame
that mattered — the un-zoomed plate shows the countryside **not darkened and not blotchy**, day or night.
At night the panels go correctly dark and unlit, with no orphan glow.

⚠ **BUT ROUND 1 FAILED ON BOTH SEEDS, AND THE AGENTS WERE RIGHT AND MY CAMERA WAS WRONG** (269's shape).
Both refused to grade: *"I cannot tell them apart — I am not going to invent a difference."* **`md5`
agreed: the blind pair was BYTE-IDENTICAL** (239). Cause, and it is a **new rung on 204** — see the law
promoted to SKILL.md: I restored the suppressed cells **inside** the `page.evaluate`, and `frame()` calls
`render()` on **every RAF regardless of `playing`**, so the frame loop repainted the canvas from the
restored world before `p.screenshot()` landed. The sting: **the SAME suppression measured 779 px/hex
correctly**, because a `getImageData` diff happens *inside* one evaluate. **The rig is sound for a canvas
readback and silently dead for a DOM screenshot — the two differ by exactly one RAF.** The camera now
self-reports `panels-ON-PLATE` (202), so the tool catches this instead of an agent.

**Perf.** Path objects **day 110,171 → 110,104 (−0.06%)** · **night 137,992 → 137,484 (−0.37%)** — free,
and a small **credit** (222 in reverse: the world is the draw list, and six solar hexes cost less than the
six farm hexes they replaced).

⇒ 🆕 **CUE (bg) — THE PANEL BLUE IS TOO SATURATED FOR THE COUNTRYSIDE** (seed 7's agent, unprompted, on a
PASSing frame: *"brighter and more saturated than anything else in the countryside… reads a little like
park benches rather than dark tilted panels — a darker, less chroma-heavy navy would sit better"*).
Cosmetic; the bones are there. **Nature × Polish**, and it pairs with **(ax)**.

**Verdict: SHIPPED** (and FIXED — a fully-drawn tile, promised on the placard and banked as an open
question at iteration 107, had never once existed).

## Iteration 288 — the tech the skyline could never wear (2026-07-15) [Urban fabric × Deepen/FIX]

**Vector.** Urban fabric (oldest domain — 281). The rotation instruction was explicit: *grep `tick()`
and the FLAGS, never `drawBuilding`* (four straight Urban laps — 267/274/281 — were RULE/FLAG defects,
not look defects). 281's flag-lifecycle law names the un-audited per-cell flags by hand. Grepped every
one (`solar`/`groof`/`hstr`/`corner`/`bridge`/`riv`/`treed`/`fete`) against the passes that WRITE it and
the branches that DRAW it.

**The tell, and it is 285's exactly.** `c.solar` is written on RES/MID/COM (L2571); `c.groof` on MID/COM
(L2581). Every READER gates on `DEV.has(c.t)`, and `DEV` **contains `T.TOWER`**: the HUD count
(`stats.solar`), the tooltip (*"Rooftop solar"*), the census (`solarRoofs`), and the CA's own adoption
seed (`adopt = n.solar && DEV.has(n.t)`). But the **TOWER draw branch drew neither**, and **COM→TOWER is
a saturating upgrade** (1996+, so it fires 14 years before solar even starts). So the city's tallest,
most-visible roofs — the ones a viewer scans a skyline FOR — were **structurally incapable of ever
carrying the rooftop tech the whole rest of the machine counts, names and seeds contagion from.** 285's
law: a type-keyed rule confers a property on the DEVELOPED-ROOF category, and its tallest member lived at
a level of the type hierarchy the writer's list never reached. The tower-crown comment even reasons about
*"a roof garden [that] would pave it"* — for a garden the branch could not draw.

**Two hypotheses refuted first, both cheaply (probe before you design).**
- *The GHOST (281).* If the flag rode the COM→TOWER upgrade and then drew nothing, downtown would be full
  of ghost panels the HUD claimed but nobody could see (as 281's corner shop was 92% ghosts). It is
  **not**: `probe-roofghost` reads only **1.0% solar / 1.2% green** orphaned (25 of 2512 panels, 6 seeds).
  Cause: the upgrade **saturates by 1996**, so a COM has almost always finished becoming a tower before it
  ever gets a chance to adopt in 2010. The ghost is real but negligible.
- *The dead contagion (283's shape).* The rule's comment promises *"a roof is far likelier to convert the
  more of its neighbors already have"* — 283's exact language, and 283 found the boulevard's contagion was
  a scatter (1.34x its own null, spark did 94%). Here it is **real**: `probe-roofspread` measures solar
  clustering at **2.22x** its own scattered null and green roofs at **4.63x** (biggest connected run
  18–24 solar hexes vs ~11 scattered). These are genuine arrays. **The rules are sound; only their REACH
  was short.**

**The fix.** Add `T.TOWER` to both writers' eligibility lists, and draw the tech in the tower branch: a
flat roof-deck prism (dark-blue `solar` array / sage `groof` garden) at height `h`, drawn before the crown
so whatever penthouse/parapet/spire follows rises through its centre; mast and helipad still ride above it.
Two things land at once — towers now ADOPT via contagion from their COM neighbours, and any flag carried
over from a tower's COM days (the former ghosts) finally RENDERS.

**Census.** Core **byte-identical** (`pop`/`developed`/`roads` **+0** — the flag draws nothing `rng()`-gated,
the hashCell is time-salted, no terrain moves). Growth signal exactly as intended: **`solarRoofs` +258**
(1332→1590), **`greenRoofs` +125** (348→473) — tower roofs now counted honestly. Tile histogram empty
(flag-only, inert).

**Probe.** `probe-roofghost` on the patch: tower ghosts **→ 0** (residual 0.3% is CIVIC/IND, a pre-existing
tiny edge deliberately not touched — scope discipline); solar shown 2512→**3081**, and **102 live roofs now
correctly seed contagion from a VISIBLE tower** instead of an invisible one.

**Visual.** Both seeds **PASS**, blind agents: *"numerous dark-blue solar arrays and a scattering of
sage-green roof patches… many towers, not just a few"* · *"rest flat and level on the deck tops… coexist
cleanly with masts, helipads, domes and penthouses… no floating, no z-order tearing"* · the whole frame
still *"balanced and beautiful… no blown-out color, no clutter, no darkened region."* (This is a variety
gain on the tower tops, which is what 228 wanted — aligned with the CLOSED tower-look ladder, not in
tension with it: no height, no silhouette, no massing changed.)

**Verdict: SHIPPED** (and FIXED — for the artifact's whole life the two rooftop-tech CAs the HUD counts
could not reach a single tower, the densest and most-visible roofscape in the city).

## Iteration 289 — the day-sailers the whole bay had learned to leave, except these six (2026-07-15) [Water & coast × Deepen/FIX]

**Vector.** Water & coast (oldest domain — 282), and the rotation was explicit twice over: cue (ay) is
Water's but is a POLISH cue, and its own banked note says *"Water's next lap must not be Polish — bank it,
take the seam."* So I grepped the Water seam, not the cue list (225's law). The banked MARSH lead
(*"frozen 18/18/18, unaudited, its pass beside the kelp's"*) resolved to **no defect**: MARSH is
correctly-placed terrain whose *draw* already answers the TIDE (pools brim/drain, body dries to mud, spring
sheet) and the season — polished long ago. Auditing it out was the right first move; it just isn't a lap.

**The real tell — 271/280, and the comment names it.** 286 gave the water CROWD an hour
(`waterSession()/waterOut()`: surfers, kayaks, kites) and wrote into its own comment *"the same sun and the
same calendar take the last board and the last BOAT off the water together."* **"Boat" there meant the
KAYAK.** The actual sailing `boats[]` array — six recreational day-sailers (terra hull, white triangular
sail) scattered across the open bay by `genWorld` — has **no gate at all** in `drawBoat`, so at 3am in
midwinter six boats tack about an empty, black bay, on every seed, for the artifact's whole life. This is
280 exactly: *a comment enumerates who was FIXED, not who should READ* — and 286's own SKILL law
(*"grep the OTHER MEMBERS OF EVERY SET YOUR HOST BELONGS TO"*) points straight at the un-enumerated sibling.

**The fix.** One gate at the top of `drawBoat`, before `stamp()` (as `drawSurfer`/`drawKayak` do — a boat
that has come in is not out there to be hovered): `if(!b.moored && waterSession()<waterOut(b))return;`. The
**moored** boats stay tied off the pier. `b.ph` is already `rng()*7`, so `waterOut(b)=b.ph/7` is exactly
uniform on [0,1) and **draws no value** — the water crowd thins one craft at a time, ONE predicate now with
**SIX readers**. The tooltip becomes the fifth: a live function of the entity — moored → *"Moored off the
pier head"*; sailing in at dusk → *"Making for the harbour before dark"*; deep winter → *"A brisk winter
sail on an empty bay"*; else *"Out for a day on the bay"* (was a static *"Out for a day"* — a label-tell
over a boat that comes in).

**Census.** Core **byte-identical** (`pop`/`developed`/`roads` **+0**; tile histogram empty; every metric
flat). Draw+tooltip only, no `rng()`, no terrain, `waterOut` draws no value — inert by construction.

**Probe** (`probes/probe-boatsession.mjs`, build-HONEST, not predicate-replicating — `waterSession` exists
on both builds since 286, so it measures the ACTUAL rendered draw by suppressing `drawBoat`'s movers in one
page and diffing). Moving-boat ink, 3 seeds: **HEAD** deepNight `139/135/150px` ≈ noon `142/140/153px` ≈
winterNoon `142/143/154px` — a **constant, the defect stated** (236: the boats sail the black bay all year).
**PATCH** deepNight **0px**, dusk still full `137/151px` (they come in gradually), winterNoon drops to
`52/13/0px`. **Positive control (248):** the KAYAK is gated on both builds (286), so `kayakDark 0px` on both
proves the session clock fires and the rig can see a departure. **Must-not-move (250):** `mooredDark
63/58/73px` held identically on both builds. **259 check:** forced-out boats render **22–25 px/boat** at
deep night (a white sail on black water), so removing them is a change a viewer can see — the hours half is real.

**Visual.** Both seeds **PASS**, blind day frames: *"several small white-triangular-sail sailboats clearly
out on the open water … each sits correctly ON the water, no floating, no on-land placement"* · *"no z-order
tears, floating tiles, or blown-out color anywhere"* · the whole city *"balanced and beautiful … calm ocean
dotted with tiny sails, nothing compounded into clutter or darkness."*

**Verdict: SHIPPED** (and FIXED — 286's category enumeration missed its own named sibling; the recreational
water craft now answer ONE season, and the last board, kayak, kite and sail come off the water together).

## Iteration 290 — Transport × Interaction/UX (+ Deepen): the flying shuttle nobody could name, droning over the farms

**Vector.** Transport rotation. The rules seam (bus/tram/cab/ferry/freighter/monorail/gondola/copter) is genuinely
saturated — every one has a live tooltip off the same predicate its rule steers by, and both aerial transit cars
light their glass at night. The one gap left, found by grepping the entity arrays against `ENTINFO`: the **air
shuttle**. Drawn since 2012 (3 of them, 6 by 2030) as a teal capsule floating at `z=34` with a blinking light —
and **never stamped, never in `ENTINFO`**: the one transport entity the city could not identify (Transport's
stale Interaction/UX cell, 171). Its `stepShuttle` also retargeted to a **UNIFORMLY RANDOM inland point**, so a
"city air shuttle" spent half its runs droning over the empty meadow and farmland north of the built-up strip.

**Change.** (a) **Deepen** — `stepShuttle` now aims at a **developed cell** (`DEV`), sampling the same 24-try
loop but keeping the first `DEV` hit; falls back to any inland point only in a young city with little built yet.
(b) **Interaction/UX** — `stamp(s,cx,cy-z-1.8)` in `drawShuttle` (ring rides on the capsule at cruising height),
and an `ENTINFO` row `'Autonomous air shuttle'` whose `sub` is a live function (105): *"On autopilot over the
city grid."* / *"On the leg between two districts."*, off the SAME `DEV` test the run now steers by. `Math.random`
only, never `rng()` — the runs cannot perturb the seeded simulation.

**Census.** Core **byte-identical** (`pop`/`developed`/`roads` **+0**; tile histogram empty; `solarRoofs +2 /
greenRoofs +1` is the RAF tick-timing wobble, 226). Draw + `Math.random` + tooltip only — inert by construction.

**Probe** (`probes/probe-shuttle.mjs`, pure world data off the artifact's own `stepShuttle`, same seeded stream
both builds). *What share of a shuttle's TARGETS land on DEVELOPED ground?* Control = the developed share of the
inland box (the uniform null, byte-identical HEAD/patch). 2035, 6 seeds: **HEAD 43.9%** sitting exactly on its
own **uniform baseline 43.1%** — a uniform random walker, the defect stated (236); **PATCH 100.0%** on every
seed, 0 off-plate. 2012 fallback (young city, baseline ~34%): PATCH **100.0%**, no strand, no crash.
**Naming** verified deterministically (frozen render, `pickEntity` at each capsule's stamped position): all 6
shuttles → `'Autonomous air shuttle'` on both seeds (hovershot can't — it doesn't freeze the clock, so a fast
high mover drifts off the cursor between the `__ents` read and the hover, landing on the tile below).

**Visual.** Both seeds **PASS** (blind whole-city): *"balanced, coherent coastal city … no z-order tears,
floating tiles, blown-out color, or stray artifacts anywhere"*; the shuttles are tiny at fit zoom (as expected —
the change is distributional, and a still can't show a target moved) and *"sit within/over the built area and
sky, nothing torn, clipped, or stranded over open countryside."*

**Verdict: DEEPENED** (and the Interaction/UX gap closed) — the city's autonomous shuttles now run over the
grid they serve, and can finally be named. One transport entity remained un-carded since 2012; it is carded now.

## Iteration 291 — the storm that greyed the clouds and wet the ground but never once lit the sky (2026-07-15) [Sky & atmosphere × New element]

**Vector.** Sky (rotation target, 284 oldest), and the KIND deliberately varied off the domain's over-worked
Deepen cell to its SPARSEST — **New element** (only 27 and 43 before this, the 3rd ever). The header warned Sky
was post-saturation; the seam said otherwise. The weather front (236) is one of the artifact's most elaborate
systems — a two-clock front that greys cloud bellies, wets the ground on a trailing tail, hangs a rainbow, and
falls as a dashed veil — and a heavy shower had **no dramatic payoff whatever**: the sky never lit. Lightning
was the one missing sky element, and it interconnects with a host already built.

**Change.** `drawCloud`'s loop, before the belly puffs: a cloud clearing the rainbow's own bar (`cloudWet(cl) >
LIGHTN0=0.6`) flickers from within — a bluish-white RADIAL GRADIENT to alpha 0 (195: never a flat arc), an
ELLIPSE matched to the cloud's own crown (rx 28·s, ry 11·s) centred on the belly, drawn UNDER the puffs so the
cloud lights up over it. The flash is `pow(sin(time·1.15 + cl.y·4.3 + cl.x·1.1), 30)` — deterministic in `time`
(no rng → genWorld+__warp reproducible, a probe can pin it), keyed to THIS cloud's own position so the storm's
cells fire out of step (262: a global-monotone gate like LITAMT would strobe the whole sky as one). Scaled by
`(0.30 + 0.62·LITAMT)` — washed out at noon, dramatic at dusk, the way a real flash is. `LIGHTN` is a probe
suppressor (253). Two constants: `LIGHTN0=0.6`, `let LIGHTN=1`.

**Census.** Draw-only, no rng, no terrain → **BYTE-IDENTICAL core**, empty tile histogram (expected: the census
is vacuous for a draw-only vector — the gate here is the probe + the eyes). VERDICT: PASS.

**Probe** (`probes/probe-lightning.mjs`, isolation by the `LIGHTN` suppressor in ONE page, floor exactly 0,
build-agnostic). Frozen dusk, wettest front swept from clouds' own `cloudWet`. **(1)** a WET front (a cloud
clears the bar) at the flash phase → **902 / 627 px of ink** (s42 / s7), the cloud lights up. **(2)** the control
that is the whole point — a DRY front (no cloud clears the bar) → **0 px / 0 ink at any time**, on both seeds:
the flash CANNOT fire on a fair sky. That is the gate, and it holds exactly.

**Visual.** Both seeds **PASS** (blind whole-city + close-up, dusk). First cut FAILed on both seeds with one
checkable geometric cause — the glow (R 44·s) was LARGER than the cloud (~30·s), spilling into empty sky and
reading as *"a floating orb"* / *"a glow resting on the beach"*; confining it to a crown-matched ellipse fixed
both. Re-shot: s7 clean — *"the middle cloud clearly lights up from within, contained inside the puff body …
never clipping to pure white … no z-order tears"*; s42 PASS with a minor aside (that hero cloud happens to sit
low over the coast). The city stays *"a balanced, coherent dusk coastal city."*

**Verdict: SHIPPED** — a heavy shower now flashes. The front greyed the clouds and wet the ground for 55
iterations and never lit the sky; it does now, and only a real shower does. Sky's additive cell was not spent.

## Iteration 292 — the third house nobody was drawn to, and the resident who stood in it with nothing to say (2026-07-15) [Civic & culture × Deepen/FIX]

**Vector.** Civic & culture (rotation: Civic at 285 was the oldest domain). Its cue list was empty and
its stale cells (New CA rule 36/107, Connect 45/204) are either forced-into-a-saturated-domain or
measured-sound (285: don't touch the civic mile). So I grepped the seam (225) — and the seam handed
back the same defect shape the last several laps found: **285's type-hierarchy blindness, on the
event-venue category.**

**The find.** The city has exactly **three event venues**, and each got its cadence in a separate lap:
the STADIUM its match fixtures (240, `matchClock`), the MARKET its trading days (285, `marketAmt`), the
AMPHITHEATER its concert seasons (250, `concertSeason`). But the two places residents are *drawn to* — the
crowd-draw pool in `syncFleet` (L3370: `if(t===T.MARKET||t===T.STADIUM){openCells.push 3x}` *"markets &
matches draw a crowd"*) and `residentWhere` — both key on **top-level TILE TYPES**. The amphitheater is a
`T.CIVIC` with a `kind`, so — exactly like `CIVHRS` before it (285) — **neither line could NAME it.**
Result, measured (`probes/probe-concertcrowd.mjs`, 3 seeds, HEAD vs patch):
- **No resident ever lived by the bowl.** No civic tile is in the residency pool at all, so a resident
  standing on the amphitheater during a full-house summer-night concert was told **"Out for a stroll."**
  on HEAD — at every state, every seed. The one bowl that fills a house every August night drew nobody.
- 280's law exactly (and 285's, and 286's, and 289's): *a crowd list is a changelog of who was fixed, not
  a taxonomy of who should read it.* The category {market, stadium, amphitheater} was two-thirds enumerated.

**Change.** ONE predicate, three readers.
- `concertShow()` = `civOpen('amphitheater')*concertSeason()` — lifted out of the bowl's own inline
  `so*concertSeason()` (L7586), so the draw, the crowd and the tooltip read the SAME number the beam
  lights by and a house can never fill for a struck stage (123/285). `concertLive()` =
  `LITAMT>0.3 && concertShow()>0.02`, mirroring the draw's own showtime gate exactly.
- The crowd pool enumerates the whole category: `t===T.MARKET||t===T.STADIUM||(t===T.CIVIC&&c.kind==='amphitheater')`.
- `residentWhere` gets the third event-venue case, symmetric with the stadium's:
  `concertLive() ? 'In the crowd at the concert.' : concertSeason()>0 ? 'Down at the amphitheater.' :
  'By the quiet amphitheater.'`

**Probe** (`probes/probe-concertcrowd.mjs`, build-HONEST — it asks the page whether `concertLive` exists,
so ONE file grades both builds). PATCH names the concert crowd at **live** (`concertLive=true`, dusk in
season), **day-in-season** (*"Down at the amphitheater."*) and **winter** (*"By the quiet amphitheater."*);
HEAD reads **"Out for a stroll."** in all four states on all three seeds — the defect stated (236).
**STADIUM control (250):** its match strings are IDENTICAL HEAD↔patch (untouched). **Residency:** peds now
anchor ON the amphitheater **0–1/130**, exactly the order the stadium reads (**0–2/130**); HEAD **0 on
every seed** (civic was never in the pool).

**Census.** PASS, **byte-identical core** (`pop`/`roads`/`developed` **+0**; tile histogram empty; every
metric flat, solar/green roofs **+0** too — fully inert). Peds draw the same NUMBER of `rng()` values from a
longer `homeCells` pool (the explicit invariant at L3386), so the seeded stream — and every downstream CA —
is untouched; `residentWhere`/`concertShow`/`concertLive` are unreachable from `tick()`.

**Perf.** Trivial: `concertShow()` adds one `civOpen` call per amphitheater draw (1 per city); the crowd
pool loop grabs the cell it already indexes. Draw work unchanged (the bowl's `show` is the same number).

**Visual.** Both seeds **PASS** (blind whole-city, dusk). The only visual delta is ~1 extra tiny ped near
the bowl; both agents confirmed a *"coherent, balanced dusk coastal city … no z-order tears, floating tiles,
blown-out color, or stray/clustered artifacts anywhere,"* nothing compounded into clutter or darkness.

**Note on rotation.** This is a Deepen/FIX, not the stale New CA rule cell — the seam handed a real defect
(the third un-enumerated event venue) and a real defect in the right domain beats a forced new CA in a
saturated one (285–289 all did this). Civic's New CA rule and Connect cells stay stale; Civic's additive is
now genuinely spent, and the event-venue category {market, stadium, amphitheater} is **CLOSED**.

**Verdict: DEEPENED** (and FIXED — the amphitheater was the third event venue, and the only one with no
resident drawn to it and no word for its concert crowd; the trilogy 240/250/285 built is now complete).

## Iteration 293 — the busy shopfront kerbs had a crowd, a café, bunting and lamplight, but nobody ever played to them (2026-07-15) [People & activity × New element]

**Vector.** People & activity (rotation: People at 286 was the oldest domain). Its Deepen cell is
CLOSED (14 deep) and the header forbids another People Deepen "without a measured seam"; its stale
kinds are Polish (226) and New CA rule (49). I grepped the seam (`stepPed`/`syncFleet`/`drawPed` + the
arrays) — the People entity system is extraordinarily mature (every person, dog, kite, surfer, kayaker
and boat now keeps its own staggered hour, curfews/kids/water-crowd all closed 262/271/286), so rather
than force the stale New CA rule cell (a cell-CA for *people* is awkward), I took the genuinely-sparse
**New element** kind. The lively shopfront kerb (`livelyKerb`, buzz≥2, ~110 hexes — verified at scale)
already carries a milling festival crowd (178, on `c.fete`), spill-out café patrons (park), festival
bunting and evening street-lamps — but no **busker**. A street musician is distinct, recognizable
street life that was simply missing.

**Change.** A lone performer on a lively kerb, gated `buskerAt(x,y)` = `livelyKerb && hashCell<BUSKP(0.12)
&& nightAmt()<buskOut(x,y)` (~1 in 8 lively kerbs → ~15/22 per city). Draw: a standing figure (coral/
teal/sage/lav body + head), a gold guitar ellipse held across the body with a `trunk` neck stroke, and
an open case (dark velvet interior + two coins) at the feet; house-style contact shadow, a gentle sway.
- **KEEPS ITS OWN STAGGERED HOUR (avoids the 262/286 cliff from the start).** `buskOut(x,y)=BUSK0(0.55)+
  BUSKJ(0.42)*hashCell` is a PER-HEX threshold, so the buskers pack up one at a time, never all in one
  frame. The band is TAKEN FROM THE LADDER (226): `nightAmt()` PEAKS at ~0.98 (dawn's light then ends the
  night), so the band tops out at 0.97 — every busker is in before the small hours run out (unlike CURF
  1.85, which `nightAmt` never reaches, so the latest strollers stay out till dawn by design). It sits
  `KITE=KID(.35) < JOG=SURF=KAYAK(.62) ≈ BUSK(.55..97) < CURF(1.85)`.
- **STANDS AT THE KERB, HUGGING A SHOPFRONT — not adrift in the traffic lane.** `livelyKerb` guarantees
  ≥2 ATTRACT neighbours (`buzz`), so the draw offsets 0.42 of the way toward the nearest ATTRACT cell
  (the same sidewalk-side idiom the festival bunting uses). This was iter 293's ONE fix: the first cut
  offset by bare parity and a seed-42 busker landed on a road hex with no visible frontage, reading as
  mid-road (a correct, checkable agent FAIL). Anchoring to the frontage fixed it on both seeds.
- `buskerAt()` is ONE predicate, TWO readers (the draw + the `__buskers()` hook), so count and pixels
  cannot drift (112). `let BUSK=1` is a probe suppressor (253).

**Census.** Draw-only, no rng/Math.random, no terrain → **BYTE-IDENTICAL core** (`pop`/`roads`/`developed`
+0; empty tile histogram; solar/green roofs +0), 0 page errors. The census is vacuous for a draw-only
vector; the gate is the probe + the eyes.

**Probe** (`probes/probe-busker.mjs`, isolation by the `BUSK` suppressor in ONE page, floor exactly 0,
build-agnostic). **(A) VISIBILITY** @ noon: busker ink **76px/2375 (s42) · 104px/3332 (s7)**, floor **0**.
**(B) STAGGER** (the whole point — the anti-262 gate, `__buskers()` swept render-free across the day):
all out by day (15/22), thinning ONE AT A TIME through the late evening (**distinct nonzero counts = 10/11
across the day; a global cliff would be 1**), deep-night min **0** (all packed up before dawn), out again
by day. The whole day is byte-identical (nightAmt=0 in daylight) — a free dead-regime control (199).

**Perf.** ~8 path objects per busker × ~15–22 = ~120–180 objects, only while out (day + staggered
evening); negligible (<0.15%). Draws no rng()/Math.random.

**Visual.** Both seeds **PASS**. Seed 7 passed the first pass; seed 42 FAILed the first pass on one
busker reading as mid-road (→ the ATTRACT-anchor fix, above). After the fix, seed 42 PASSed; seed 7's
re-read FAILed on a "blown-out yellow flame-blob floating mid-plaza" — but a `BUSK=0` suppression re-shoot
showed that blob is PRESENT with the busker suppressed, i.e. a **pre-existing park/plaza ornament the agent
misattributed** to the feature (269: agent right the blob exists, wrong that it is mine). A tie-breaking
diff-locate read (busker-crop vs nobusk-crop, the diff IS the busker per 161) then resolved seed 7's
busker cleanly: *"an orange-shirted figure on the pale sidewalk in front of the shop, a tan guitar bar
across its body, a small open case at its feet… at the kerb, not stranded, floating or in a lane."*
3 of 4 reads passed with the guitar+case legible; the one FAIL's headline cause was refuted by
measurement, not overruled by vibe.

**Cue banked: (bh)** an over-bright yellow flame-shaped blob sits mid-plaza near a fountain on seed 7 —
a PRE-EXISTING park ornament (present at `BUSK=0`), not this lap's; a Nature/park Polish candidate.

**Verdict: SHIPPED** — the busy shopfront kerbs had a crowd, a café, bunting and evening lamplight and
never a note of music; now a street musician plays to them, packing up on its own hour as the crowd thins.

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
