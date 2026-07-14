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
| **Nature** | 4, 26, 29, 102, **156**, **174** | 1, 13, 60, **206**, **279**, **287** | 37, 46, 67, 76, **108**, **120**, **139**, **166**, ~~**233**~~, **238**, ~~**246**~~, **263**, **272** | ~~46~~, ~~88~~, ~~101~~ | U4 | 53, 96, **194**, ~~**198**~~, **215**, **221**, ~~**251**~~ | **117**, **129**, **148**, **183** |
| **Water & coast** | 6, 10, 12, 16, 20, 33, 106, **169** | 90, **282** | 17, 25, 51, 65, 72, **113**, **123**, **159**, **196**, **245**, **257**, **289** | 22, ~~**205**~~ | | U2, 44, 58, 79, **116**, **132**, **150**, **185**, **214**, **223**,  **234**, ~~**255**~~, **266**, **268**, **275** | **97**, **141**, **176** |
| **Urban fabric** | 32, 62 | 7, 23, ~~82~~, **151**, **281** | 38, 54, 68, 92, **165**, **173**, **189**, **199**, **209**, ~~**218**~~, **219**, ~~**254**~~, **267**, **288** | 47, **109**, ~~**160**~~ | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103**, **110**, **118**, **124**, **143**, **180**, **216**, **220**, **224**, **228**, **235**, **239**, **274** | **133** |
| **Transport** | 2, 9, 21, 31, 48, **164** | 77, **283** | 28, 39, 55, 63, **112**, **121**, **128**, **155**, **179**, **193**, **230**, **249**, **258**, **269** | 5, 15, **138**, **211**, **276** | U4 | U1, U3, 70, 85, 87, 94, **146**, **188**, ~~**203**~~, **241**, **243** | **105**, **171** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107** | 36, 59, 66, 80, 91, **149**, **158**, **175**, ~~**195**~~, **213**, **244**, **250**, **259**, **277**, **285** | 45, **204** | | 73, ~~**114**~~, **168**, **231**, ~~**270**~~ | 52, 122, **140**, **184** |
| **Sky & atmosphere** | 27, 43 | | 19, 35, 50, 57, 95, **135**, **153**, **161**, **181**, **190**, **208**, **225**, **236**, **253**, **261**, **280**, **284** | | | 61, 81, 89, **115**, **200**, **242**, **248**, **265**, ~~**273**~~ | ~~**134**~~, **144** |
| **People & activity** | 41, 56, **127**, **170**, **186** | 49 | 34, 64, 93, **104**, **119**, **145**, **178**, **201**, **210**, **240**, **247**, **262**, **271**, **286** | 78, **111** | | 84, **137**, **163**, **226** | 71, **154**, **191**, **278** |

- **Interaction/UX** (inventory + the `<meta charset>` repeal archived at 270; both are INVARIANTS in SKILL.md). What
  steers: when adding an entity array, `stamp()` it in its draw + add an `ENTINFO` row (same discipline as the census
  hook) — `stamp()` also draws the focus ring, so any stamped entity is ringable free. **An `ENTINFO` `sub` may be a
  FUNCTION of the entity (105)** — use it when a thing's interest is its *membership* (line/route/depot), computed live.
- ✅ **THE TRIM METHOD** (paid 279, again 280): a block is cuttable when its **LAW is in SKILL.md** and its **ARTIFACT
  FACTS compress to their imperatives**; a *superseded* warning is free to cut (280's `__setWind` retired 275's).
  There is never a block you can simply *delete* — **compress the oldest, and pay for your OWN additions in the same lap.**
- **ROTATION.** Last: Water **289** · Transport **283** · Sky **284** · Civic **285** · People **286** · Nature **287** ·
  Urban **288**. ➡ **NEXT: Transport (283)** — grep its `tick()`/`stepVehicle` seam + FLAGS, not its `polish-tile` cues. ⚠ **NATURE'S
  POLISH CELL IS TWO-DEEP IN DEBT AND IS ITS STALE KIND** (287 took CA again — the seam beat the cue list). **Its next
  Nature lap is Polish, with TWO paired cues banked: (ax)** fairy-ring contrast + 🆕 **(bg)** the solar blue. **Together.**
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
  ✅ **(aw) CLOSED 286** (kayakers); ✅ **its day-sailer sibling CLOSED 289** (the boats[] 286's comment named, never gated).
  ➡ **NEXT cues: (au)** loft roof-studio reads as green roof (Urban × Polish, 274's half), **(ax)** fairy-ring contrast
  (Nature's), **(ay)** windrow LENGTH (POLISH ⇒ not Water's next), **(az)/(ba)** 278's two (below).
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
  🔑 **282/287: A FROZEN CENSUS COLUMN IS A SEAM, AND IT IS THE FIRST THING TO READ.** ⚠ **A tile whose count never moves
  across the eras is either terrain or a DEAD RULE — check which; and a ZERO row is LOUDER than a flat one** (287:
  `SOLARF` read a flat 0 in all 9 cells, in every census the loop ever ran, for 180 laps). ✅ **MARSH AUDITED (289):
  terrain, NOT a dead rule** — its DRAW answers TIDE + season; frozen 18/18/18 as it forms once at the river mouth. **SOLARF + MARSH CLOSED.**
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
  **(ax) THE FAIRY RINGS ARE ON THE SMALL SIDE** (272 — **both** agents, independently, both seeds, unprompted, on a
  PASSing frame: *"legible, not speckle… but a hair more cap contrast would help"*). Measured **15.8–20.8 CSS px/ring at
  fit** = ~4x a ped's shadow (4.4, shipped) ⇒ **NOT the hairline family, NOT cue (f)** — a *contrast* nudge, not a body.
  Gate: `probes/probe-shroomvis.mjs`. **Nature × Polish.**
  **(bg) THE SOLAR PANELS' BLUE IS TOO SATURATED FOR THE COUNTRYSIDE** (287, s7's agent, unprompted, on a PASSing frame:
  *"reads a little like park benches rather than dark tilted panels — a darker, less chroma-heavy navy would sit
  better"*). ⚠ **ONE agent, ONE seed — an ASIDE (212), NOT corroborated: measure the panel's chroma against the
  countryside's first** (`col('solar',1.25)`; audit by **`dHUE`**, never a target hue — 234). **Nature × Polish; PAIRS
  with (ax).**
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

> **Archive:** the 282 entries before Iteration 280 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

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

## Iteration 284 — the sun moved and two readers never got the message (2026-07-15) [Sky & atmosphere × Deepen/FIX — cue (bd) CLOSED]

**Vector.** Sky & atmosphere × Deepen/FIX. The ledger's **#1 cue (bd)**, taken ahead of Civic's turn on **law 119** (a
banked, measured finding outranks kind-rotation). Iter 261 gave the season a **day length** — `sunWarp` warps the light
curve's TIME AXIS, so the sun's state became a pure function of **`SUNT`**, not `dayT`. Its own comment boasted *"ONE
PREDICATE, FOUR READERS."* **264's law says: when a lap introduces a remap, grep EVERY reader of the remapped quantity
and ask which axis it is on.** Nobody had. The lap is that grep.

**The audit (the whole point — the cue named ONE reader and there were TWO).**
`grep -n dayT` returns 30 readers. Each one asks a question, and the question decides the axis: *does it ask about the
**SUN** (its rising, its setting, the light it casts) — or about the **WALL CLOCK** (the hour, the moon, a timetable)?*
- **Correct on `dayT`, and MUST NOT MOVE:** the moon (`moonPhase`), the town-hall clock (`clockWord`), the school run,
  the stadium fixture. These are timetables. They stayed.
- **WRONG — a threshold on the light curve applied to the wall clock:**
  1. **`phaseWord(dayT)`** — the HUD's phase pill. **Its band edges ARE the curve's own keyframes** (`0.05 = SUNUP`,
     `0.80 ≈ SUNDN 0.78`), which is the tell: a function whose constants are another function's keyframes is reading
     that function's clock, or it is broken.
  2. **`fogDepth`'s dawn term** (`1−|dayT−0.10|/0.09`) — radiation fog **burns off when the sun comes up**, so "dawn"
     is a fact about the light curve, not the wall clock.
- **AUDITED AND PROVABLY INERT — deliberately left alone:** `drawBuilding`'s golden-hour sun-facing face
  (`gs = dayT<0.5`). Its `GWARM>0.02` gate is **zero across the entire 0.415–0.5 window**, and `|SUNT−dayT| ≤ DAYLEN =
  0.10` cannot flip its sign at either golden hour. It is ugly and it is a no-op. **Banked, not changed.**

**⛔ AND ONE HYPOTHESIS THE PROBE KILLED BEFORE I WROTE IT — the sea's sun glitter.** `glit =
(1-LITAMT)*max(0,1−|dayT−0.47|/0.30)` looks like the same bug, and the comment above it (*"thinning to nothing **by
dusk**"*) is a textbook 199 tell about a dusk that 261 made a moving target. **It is not a defect.** `LITAMT` is derived
from `SUNT`, so the `(1-LITAMT)` factor **already carries the season**: measured, `AFTERSET = 0` in both seasons (the sea
never glitters on a set sun) and the shimmer's own cutoff already moves **0.440 → 0.550**. I was one probe away from
shipping a fix for a defect that did not exist, on the largest surface in the city. **Do not re-key it.**

**Change.** Two one-line re-keys, and both **warp their own clock** rather than reading the cached `SUNT`:
`elPhase.textContent = phaseWord(sunWarp(dayT))` and `const dawn = clamp(1−|sunWarp(dayT)−0.10|/0.09,0,1)`.
**This is load-bearing, not stylistic:** `syncStats()` runs **BEFORE `render()`** in `frame()` (the tick loop calls it at
L9645; `render()` is L9648) and again on `genWorld`/`newCity` **outside `render()` entirely** — where `SUNT` is stale or
still **0**. Reading the cache would have been correct-by-call-order, which 261's own law forbids (*delete the
dependency, do not document it*). Both fns run **once a frame**, so the extra `sin()` is free. No constant was invented:
`0.10` is unchanged and now means what it always said — *the fog peaks just after `SUNUP`, whenever that is.*

**Probe** (`probes/probe-suntclock.mjs`, + `probes/shot-suntclock.mjs`). Pure clock/DOM/object data — **no pixels, so no
noise floor at all.** Build-agnostic (hooks the artifact's own fns; `SRC=` grades any build).

| | HEAD | patched |
| --- | --- | --- |
| **HUD contradicts the sun** (winter) | **21.5% of the day** | **2.0%** |
| **HUD contradicts the sun** (summer) | 8.5% | 1.0% |
| **dawn-fog peak @dayT** (winter / summer) | **0.100 / 0.100** — `DISTINCT = 1` | **0.200 / 0.035** |
| *(true sunrise, for reference)* | *0.150 / 0.000* | *0.150 / 0.000* |
| fog peak STRENGTH | 0.850 | 0.827 / 0.817 |
| sea shimmer (must-not-move) | 29 / 0.440 / 0 / 56 | **identical** |
| **FIXED POINT digest** (3 seeds) | `18e6904c 508e9a43 18636e22` | **identical** |

The fog now peaks **~0.05 after sunrise in every season, at unchanged strength** — it arrives on the right clock, it is
not made louder. HEAD's `DISTINCT = 1` **is** the defect, stated, with no threshold invented (236).

**The exact fixed point (253/261).** At the equinox `seasonCool() = 0.5` ⇒ `dayLen() = 0` ⇒ `sunWarp(t) === t` through
its own guard ⇒ the patch runs **HEAD's byte-identical code**. Every column — HUD word, fog, shimmer, moon, hall clock —
comes back digest-identical on all 3 seeds. ⚠ **Stub the PREDICATE, never the year** (`year = 2035.87` is not
representable in float64): `window.seasonCool = () => 0.5` makes `dayLen()` zero *by arithmetic*.

**Census.** PASS. `pop`/`roads`/`developed` **+0, byte-identical**; tile histogram **empty**. `solarRoofs −2` is 226's
documented ±2 wobble and is **structurally impossible to be mine** — `fogDepth()` is called only from `render()` and
`phaseWord()` only from `syncStats()`, so **neither is reachable from `tick()`** and the diff cannot touch the sim.
**Perf:** path objects **110,549 → 110,458 day (−91)**, **138,380 → 138,379 night (−1)** — inside drawbudget's own ±100
floor (274). Two `sin()`s a frame, zero geometry: **free**.

**Visual.** A **crossed discriminating pair** (264), because a single "is there fog" frame proves nothing: at ONE
wall-clock instant the builds must disagree in **OPPOSITE directions by season** — winter `dayT 0.20` (HEAD clear, patch
foggy: the sun is only just up) and summer `dayT 0.10` (HEAD foggy, patch clear: the sun rose an hour ago). Both blind
agents, on a **crossed** HEAD/patch map, with meaningless non-ordinal tokens (238/239/268), **independently named HEAD as
the season-blind build from the pixels alone** — one calling its phase *"season-blind"*, the other *"off by one"* — and
both read HEAD's dusk pill aloud: **"SUNSET"** over a full-moon night sky, against the patch's **"NIGHT"**. Both emitted
the literal string `VISUAL: FAIL`, and **both FAILs name the incumbent file** (283's law: *a FAIL can be TRUE and still
not be YOURS*). No z-order tears, no floating tiles, no blown colour; all six frames read as a coherent coastal city.
One agent recovered the mechanism unprompted: *"the fog always lands on whichever build labels that frame DAWN"* — which
is the one-predicate/N-readers property, seen in pixels.

**⚠ THE RIG CONVICTED ITSELF TWICE, AND BOTH ARE REUSABLE.** (a) `delete window.seasonCool` **FAILS SILENTLY** — a
top-level `function` declaration is a **non-configurable** global property, so in sloppy mode the stub **survives
forever**, and the first equinox block poisoned every later seed, which then printed its "winter" and its "summer" **at
the equinox** — i.e. the CONTROL, labelled as the treatment. *The tell was unmissable and it is 250's: two seasons with
an **identical day length**, on a curve 261 proved is alive.* **Keep the original and restore by assignment.**
(b) `fogDepth`'s seeded `spell` term **SATURATES `FOGAMT` at 1.0**, so the first camera run read `0.628` vs `1.000` —
both "foggy", cross invisible — and the fog instrument could not express its own signal (259). **Pin `time` so
`sin(time*0.028 + (seedNum%97)*0.7) = −1`** ⇒ `spell = −1.25` ⇒ the dawn term IS the whole fog. ⚠ `ph` reaches **67.2**,
far past the target, so wind forward by whole periods or `time` comes out **negative**.

**Verdict: SHIPPED.** (cue (bd) CLOSED — and it was **two** readers, not the one the cue named. A cue is a POINTER, NOT
A SPEC.)

## Iteration 285 — the last public place in Solvista that never packed up (2026-07-15) [Civic & culture × Deepen/FIX]

**Vector.** Civic & culture × Deepen/FIX. Rotation owed Civic two laps (284 jumped the queue on law 119).
Its cue list was empty, so I greped the seam instead (225) — and found the defect in the one member of the
domain that every "institutions keep hours" ladder had been structurally unable to reach.

**The find.** Iter 240 gave the STADIUM a fixture — `matchClock()`, hashed off `Math.floor(dayT)`, the
artifact's own never-wrapping day counter — wired the crowd, the floodlights, the tooltip and
`residentWhere` to that one predicate, and **wrote 271's law down in the process** (*when a lap establishes
a property, enumerate the CATEGORY*). It did not enumerate. `T.MARKET` is the stadium's sibling on three
lists — `ATTRACT`, `PEDDEST`, and **`syncFleet` L3336, the SAME LINE**: `if(t===T.MARKET||t===T.STADIUM)
{openCells.push(...)}` under the comment *"markets & matches draw a crowd"* — and `residentWhere` reads
`matchClock()` for the ground **three lines below** the market's flat `'Browsing the market stalls.'`
(262: the unfixed sibling is inside the function you just edited).

So the market never closed. Measured (`probes/probe-marketday.mjs`, 6 seeds, 8 days × 16 hours, counting the
OBJECTS the frame issues per hex — deterministic, no noise floor):

| | HEAD | patch |
| --- | --- | --- |
| DISTINCT stall counts | **1** (six prisms, every hour of every day, forever) | **6–10** |
| square-hours with the stalls up | **100%** | **23.6–29.1%** |
| night square-hours lit | **100%** (80 of 80, every seed) | **18–21%** |
| lit-but-closed square-hours | 0 *(trivially — nothing is ever closed)* | **0 by construction** |
| STADIUM (free positive control, 248) | 4–5 | 4–5 ✓ |
| FARM (must-not-move, 250) | 1 | 1 ✓ |

**Why `CIVHRS` could never have caught it.** 213's hours table is keyed on **`c.kind`** — and only `T.CIVIC`
cells *have* a kind. The market and the stadium are civic-culture institutions that are **top-level TILE
TYPES**, so the entire ladder was structurally incapable of reaching them, and the table looked complete.
274's law, one level up the type hierarchy. (Law promoted to `SKILL.md`.)

**Change.** `marketHours(x,y)` / `marketAmt(x,y)` / `marketWord(x,y)` — **ONE predicate, FOUR readers**
(the stalls, the string lights, the tooltip, `residentWhere`), in `fixtureAt`/`matchClock`'s own idiom and
sitting beside it. Salted per **HEX** as well as per day, so squares keep their own trading days and the city
always has some market on and some square bare rather than blinking as one. `MKTP=0.45` of days trade;
`MKTEVE=0.28` of those are **evening** markets (0.62→0.92) — and the string lights, which used to burn every
night over nobody, now burn **only** there, which is what they were always for. The stalls go up and come
down one pitch at a time over `MKTSET`; a shut square draws bare pitches and the trestles stacked to one side.

**Census.** PASS. Core **byte-identical** (`pop`/`roads`/`developed` **+0**), tile histogram empty. **Wholly
inert, structurally**: zero `rng()`, zero `Math.random`, no terrain, and `marketAmt` has exactly three callers
— the draw, the tooltip, `residentWhere` — and **none inside `tick()`** (`grep` = 0). `solarRoofs +1` is 226's
documented harness wobble (the census never freezes the clock), not reachable from this diff.

**Perf.** A **credit**, in path objects (241's law in reverse — count the objects when a lap subtracts):
day **110,716 → 110,199 (−0.47%)**, night **138,411 → 138,156 (−0.18%)**. The square is shut most hours.

**Visual.** PASS on both seeds. `probes/shot-marketday.mjs` — a **discriminating pair** (264) at the `shut`
pin, where the builds must disagree: HEAD draws its three stalls (it has no closed state), the patch draws
bare paving. Frames named by FILE with meaningless tokens, map **CROSSED between seeds** (238/239/268) — and
**both blind agents named the patched build from the pixels alone**, one of them observing unprompted that
HEAD's shut frame is *"identical to its `-open` frame — stalls never pack down"*, which is the defect stated
by an agent who did not know which build it was reading. Both whole-city frames clean.

**Also EXPLORED — Civic × Connect, and the seam is SOUND.** Civic's stalest cell is Connect (204). The
"civic mile" (`c.fete`, iter 178) looked like 283's boulevard: `describeTile` **preempts on `c.fete`**
(L9209), so an over-firing mile would silently outrank the whole road-label ladder 283 had just repaired.
It does not. Measured (`probes/probe-civicmile.mjs`, 6 seeds): fete is **11–30 cells, 1.4–3.7% of road**, in
**2–5 short runs** (biggest 9–14), with **2.2–2.8 institutions in reach** — exactly the *"short stretch
between two institutions"* its comment promises — and it eats only **2–13** labels a city. **Probing before
designing saved the lap**: I would have spent it "fixing" a rule that works. Connect stays stale, and is now
*measured* stale rather than merely unvisited.

**Verdict: DEEPENED** (and FIXED — the market had no clock at all).

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
