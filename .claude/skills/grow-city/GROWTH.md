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
| **Nature** | 4, 26, 29, 102, **156**, **174** | 1, 13, 60, **206**, **279**, **287** | 37, 46, 67, 76, **108**, **120**, **139**, **166**, ~~**233**~~, **238**, ~~**246**~~, **263**, **272**, **301**, **308** | ~~46~~, ~~88~~, ~~101~~ | U4 | 53, 96, **194**, ~~**198**~~, **215**, **221**, ~~**251**~~, **294** | **117**, **129**, **148**, **183** |
| **Water & coast** | 6, 10, 12, 16, 20, 33, 106, **169**, **296** | 90, **282** | 17, 25, 51, 65, 72, **113**, **123**, **159**, **196**, **245**, **257**, **289**, **303**, **311** | 22, ~~**205**~~ | | U2, 44, 58, 79, **116**, **132**, **150**, **185**, **214**, **223**,  **234**, ~~**255**~~, **266**, **268**, **275** | **97**, **141**, **176** |
| **Urban fabric** | 32, 62, **295** | 7, 23, ~~82~~, **151**, **281** | 38, 54, 68, 92, **165**, **173**, **189**, **199**, **209**, ~~**218**~~, **219**, ~~**254**~~, **267**, **288**, **309** | 47, **109**, ~~**160**~~ | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103**, **110**, **118**, **124**, **143**, **180**, **216**, **220**, **224**, **228**, **235**, **239**, **274**, **302** | **133** |
| **Transport** | 2, 9, 21, 31, 48, **164**, **297** | 77, **283** | 28, 39, 55, 63, **112**, **121**, **128**, **155**, **179**, **193**, **230**, **249**, **258**, **269** | 5, 15, **138**, **211**, **276** | U4 | U1, U3, 70, 85, 87, 94, **146**, **188**, ~~**203**~~, **241**, **243** | **105**, **171**, **290** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107** | 36, 59, 66, 80, 91, **149**, **158**, **175**, ~~**195**~~, **213**, **244**, **250**, **259**, **277**, **285**, **292**, **307** | 45, **204** | | 73, ~~**114**~~, **168**, **231**, ~~**270**~~, **299** | 52, 122, **140**, **184** |
| **Sky & atmosphere** | 27, 43, **291** | | 19, 35, 50, 57, 95, **135**, **153**, **161**, **181**, **190**, **208**, **225**, **236**, **253**, **261**, **280**, **284**, **298**, **305** | | | 61, 81, 89, **115**, **200**, **242**, **248**, **265**, ~~**273**~~ | ~~**134**~~, **144** |
| **People & activity** | 41, 56, **127**, **170**, **186**, **293** | 49 | 34, 64, 93, **104**, **119**, **145**, **178**, **201**, **210**, **240**, **247**, **262**, **271**, **286**, **306** | 78, **111** | | 84, **137**, **163**, **226**, **300** | 71, **154**, **191**, **278** |

- **Interaction/UX** (inventory + the `<meta charset>` repeal archived at 270; both are INVARIANTS in SKILL.md). What
  steers: when adding an entity array, `stamp()` it in its draw + add an `ENTINFO` row (same discipline as the census
  hook) — `stamp()` also draws the focus ring, so any stamped entity is ringable free. **An `ENTINFO` `sub` may be a
  FUNCTION of the entity (105)** — use it when a thing's interest is its *membership* (line/route/depot), computed live.
- ✅ **THE TRIM METHOD** (paid 279, again 280): a block is cuttable when its **LAW is in SKILL.md** and its **ARTIFACT
  FACTS compress to their imperatives**; a *superseded* warning is free to cut (280's `__setWind` retired 275's).
  There is never a block you can simply *delete* — **compress the oldest, and pay for your OWN additions in the same lap.**
- **ROTATION.** Last: Civic **307** · Nature **308** · Urban **309** · **310 = step-back #39** · Water **311**
  (WINDA rides the season — winter seas rough, summer glassy; centred ⇒ year-mean held + equinox fixed point).
  ➡ **NEXT: Transport (297, oldest real lap)** — 304 grepped its 4 seams DRY (only New CA rule **77** stale, a
  forced transit CA ⛔ shallow); judge saturation. Cue **(bi)** cable-cabin hours = measured, NOT a defect. **Step-back ~315.**
  ✅ **308 DEEPENED Nature — the "dry-season lightning" (199-tell in its own comment) now IS dry-season.** Forest fire
  spark rides `fireSeason()=1+1.8*(0.5-seasonCool())` — the **7th reader of seasonCool()** (grass/canopy/dayLen's dryness
  curve); **0.10x wet trough → 1.90x dry peak**, CENTRED on mean 0.5 ⇒ year-mean **exactly 1**, annual burn total HELD.
  ⚠ **Timber spark left alone** (URBAN fire ≠ dry season). ⚠ **INVISIBLE at 2035** (`year<2030`; 134) ⇒ gate is
  `probes/probe-fireseason.mjs` (TEMPORAL): HEAD dry/wet **1.00** flat, patch real `tick()` dry≥wet ∞/∞/7. Zero `rng()`
  (only burnt terrain perturbs, HEAD's cost); census core held (pop +2.9%, dev +0.3%).
  ✅ **305 SHIPPED Sky × Deepen — the front greys the SKY ITSELF** (`overcast()`=rainFront's 4th reader, gated above the
  patchy band ⇒ dry sky BYTE-IDENTICAL, `overcastSky` shared by `syncSky`+`render`; `probe-overcast.mjs`). **Sky additive NOT spent (291 lightning).**
  ⚠ **304 EXAMINED TRANSPORT — GENUINELY DRY** (all FOUR seams grepped clean: rules/flags/label-ladder/`ENTINFO`;
  detail folded into the SPENT/CLOSED block below). 🟡 **OPEN CUE (bi):** the **gondola cabins run 24h** while the monorail deliberately thins its night platform crowd
  (`-(LITAMT>0.6)`, L8286) — so cable-transit is the one mover class with zero night behaviour. A scenic aerial tram
  closes at night IRL; a rapid-transit monorail runs. **Deferred, NOT a defect (204/205 false-positive risk):** a
  mechanical mover at night is arguable, the cabins are ~3px at fit zoom, and the 262-cliff is 9-deep. Decide with a
  probe before gating; do not force it.
  ✅ **SPENT/CLOSED — full entries in ledger, laws in SKILL.md; the load-bearing fact is per-domain SATURATION:**
  **NATURE** additive spent (301 deer), Polish debt paid (294 ax+bg); next = grep the tick()/CA seam (287/279 pattern).
  **URBAN** tooltip/flag/TABLE SATURATED (295/302), stale = **Interaction/UX (133)**. **PEOPLE** Deepen CLOSED 14-deep
  + Polish spent (300) + Interaction ran (278) ⇒ only **New CA rule (49)** stale — do not take a People Deepen without a
  measured seam. **CIVIC** additive COMPLETE (292 event-venue category {market,stadium,amphitheater}), Connect
  measured-sound (285 civic mile — 11–30 cells, sound, do NOT "fix"), stale = **New CA rule (36/107)**. **SKY** additive
  NOT fully spent (291 shipped lightning, the sparsest cell — 3rd ever). **TRANSPORT** all seams dry (304); its two named
  cues (a elevated transit · av catenary) are the same 0.5px hairline `polish-tile` family ⛔, stale = **New CA rule
  (77)**. Recent cliff closures: 303 herons (the one 301 cited as a control), 302 loft, 301 deer, 300 strip crowd —
  every animate draw now *verifiably* off the 262 cliff (`225`'s grep-the-seam law is 26-for-26 at *finding*).
  ➡ **OPEN cues: (ay)** windrow LENGTH (POLISH ⇒ not Water's next) · **(az)/(ba)** 278's two (below) · **(bh)**
  over-bright plaza flame-blob (Nature/park Polish, 293). ✅ **CLOSED (detail in each entry):** (bd) by 284 (two
  readers) · (au) by 302 · (ax)+(bg) by 294 · (bf) market packed-away square by 299.
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
  ✅ **STEP-BACK #39 RAN AT 310 — NO DRIFT** (both seeds coherent, day/golden/night + CROSSED dusk-summer/winter
  pair; both named winter by light ⇒ day-length season alive; `probe-goldenhue` PASS, greens keep identity 8°/10°
  vs HEAD's 23°/24° ⇒ **golden monochrome cue stays CLOSED, 265 holds**; perf ARC FLAT: path objects vs 270 ~40
  laps +0.95%d/+0.74%n = ~+0.02%/lap, cancelled by byte-flat FIXES). ⚠ **PRICE THE ARC IN PATH OBJECTS, NOT ms**
  (216/198 — perfab read −2%/lap, load noise). ⚠ Blind A/B NON-ORDINAL + CROSSED (268). ⚠ **A "muddy golden"
  agent FAIL was REFUTED by probe, not banked (212+265): golden pin (argmax GWARM, t=0.775) sits 0.009 from
  dusk-summer ⇒ same near-sunset instant, dim by low sun — by design.** ⚠ **TOOL NITS in `shot-stepback` (banked,
  not fixed):** per-frame `GWARM=0` self-report is a stale caption read (contradicts its own pins + `probe-goldenhue`;
  pixels ARE warm) — nearly steered this lap into a false "golden unwarmed"; and `HUD=STALE` on golden/dusk =
  `phaseWord`-vs-`clockWord` mismatch, not a stale DOM. Both are legit future tool laps (fix the tool, not a caveat).
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

> **Archive:** the 304 entries before Iteration 302 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

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

## Iteration 304 — the rotated domain was dry, so the loop checked itself (2026-07-15) [38th step-back / holistic]

**Vector.** Transport rotation (297 oldest). The header's law is to grep the seam, not the cue list — so I
grepped ALL FOUR Transport seams this lap: (1) the RULES (`stepVehicle`/`syncFleet`/`stepGond`/`stepMono`/
`stepCabins`/`stepShuttle`) — every mover keeps a per-entity hour (`vehCurfew`/`VCURF`/`waterSession`), has a
live tooltip off the predicate its rule steers by, and does an honest job; (2) the FLAG seam (`bridge`/`riv`)
— writer (`genWorld`/street-growth), draw (`drawCell` L6453), tooltip (`describeTile` 'Bridge'/'River') and
veto (`stopOK`/`pedRoad`/river-flood) all agree on which types own it (281-clean); (3) the label ladder
(`describeTile` — bridge, boulevard, arterial, avenue, fete, loft, corner shop, parking lot all named off
their flag); (4) the `ENTINFO` hover rows — every mover (ferry, launch, tram, bus, monorail train, cable car,
shuttle, copter…) has a LIVE `sub` computed off its own state. **297's "clean" claim holds up — this is a very
mature, well-audited domain.** Transport's additive/deepen/interaction are SATURATED; only **New CA rule (77)**
is stale, and a forced transit CA on an entity-driven domain would be shallow filler (⛔). With the rotated
domain confirmed dry AND the step-back **~21 laps overdue** (should be every ~5; last was #37 folded into 283),
the honest highest-value move was the overdue holistic self-check — the loop's main guardrail for long
unattended runs.

**The one arguable finding, DEFERRED not shipped (new cue (bi)).** The gondola cabins run 24h, while the
monorail deliberately thins its night platform crowd (`cap -= (LITAMT>0.6)`, L8286) — so cable transit is the
one mover class with zero night behaviour. A scenic aerial tram closes at night IRL; a rapid-transit monorail
runs. It fits the 262-cliff shape (a mover with no hour, 297 listed every mover EXCEPT the two cable modes).
**But I did not gate it (204/205 false-positive law):** a *mechanical* mover at night is arguable (not the
clear wrong of a heron stalking a marsh), the cabins are ~3px at fit zoom (the night agents read the frame as
coherent and never flagged them), and the 262 cliff is already 9-deep — a 10th marginal recursion is the
"one more shallow feature" the counterweight warns against. Banked as cue (bi): decide with a probe first.

**Step-back #38 (no `solvista.html` change).** `probes/shot-stepback.mjs`, 2 seeds (42, 7), 5 frames each —
day / golden / night + a CROSSED dusk-summer/dusk-winter discriminating pair (264: one wall-clock instant,
sun UP in summer and DOWN in winter). Every frame self-reports its state.
- **Visual: both seeds PASS.** One agent per seed, blind, cumulative question. Both read all five frames as a
  coherent, balanced coastal city — no z-order tears, floating tiles, ornaments-in-mid-air, blown-out colour.
  Both correctly named **dusk-winter** as the darker/night-lit frame (the discrimination check — they looked).
  The only asides were the *deliberate* dense downtown core (with park/river/street gaps giving the eye rest —
  "not runaway clutter") and the intentional golden/dusk warm wash — both on the header's do-not-re-open list.
- **Perf ARC is FLAT (path objects, the load-immune unit — 216/198; perfab ms can't resolve +0.2%/lap).**
  HEAD (303): day 111,785 / night 138,952. vs **283** (~20 laps): **+1.14% day / +0.37% night**. vs **264**
  (~40 laps): **+0.55% / +0.21%**. The loop's ~+0.2%/lap additive tendency was cancelled by ~40 laps of
  byte-flat FIXES + draw credits (285/286/287/288/293/294/295/302/303 all inert-or-credit). No compounding.
- **Census gate:** `solvista.html` byte-identical to HEAD (zero edits this lap), so VERDICT PASS / 0 page
  errors is trivially guaranteed — confirmed anyway.

**Tool nit (banked, not fixed).** `shot-stepback` flags `HUD=STALE` on the golden/dusk frames. It is a false
alarm: a vocabulary mismatch between the script's coarse `phaseWord` ('golden hour'/'sunset'/'night') and the
artifact's own `clockWord` HUD pill — dusk-winter's HUD "night" at LITAMT=0.95 / sun-down is *more* correct
than the script's "sunset", not a stale DOM (204). Aligning the two words is a legitimate future tool lap.

**Verdict: STEP-BACK — NO DRIFT.** No feature shipped (the rotated domain is genuinely saturated and the one
candidate was a false-positive risk not worth forcing). The city is confirmed coherent across 3 lights × 2
seasons on 2 seeds, and 40 laps of growth cost essentially nothing in draw work. The overdue guardrail is
reset; NEXT domain is Sky (298, oldest). Recording the dry seam + cue (bi) is the value: it stops the next
lap re-grepping Transport, and hands a future lap a measured decision to make.

## Iteration 305 — the front greyed the clouds and the ground and lit the sky, but never touched the sky ITSELF (2026-07-15) [Sky & atmosphere × Deepen/interconnect]

**Vector.** Sky (rotation target, 298 oldest). The header's law is grep the seam, not the cue list — so I
grepped the atmosphere seam (`syncSky`/`daylight`/the weather front) rather than reach for another 262 cliff
(the header warns that recursion is 9-deep and a 10th is "one more shallow feature"). The seam handed back a
209-shaped gap: **the weather front (236) is the artifact's richest sky system** — it greys the cloud bellies
(`cloudWet`), wets the ground (`rainingAt`), raises umbrellas, feeds the meadow-bloom CA and, since 291, lights
the lightning — **and the SKY BACKDROP behind all of it was deaf to it.** `syncSky` and render's sky both derive
purely from `daylight(sunWarp(dayT))` (time-of-day + season); a heavy shower band with greyed clouds, rain,
umbrellas and lightning sat under the same clear blue/gold sky as a fair day. The biggest surface in the scene
wore no weather (209: a large surface wearing a field that carries no signal). 291's own title even said it:
*"the storm that greyed the clouds and wet the ground but never once lit the sky."* It lit it; it never leadened
it.

**Change.** `overcast()` = `clamp((rainFront()-OVC0)/OVCRAMP,0,1)*OVCMAX` — the front's OWN strength, the sky's
**fourth reader of rainFront** after the clouds, the ground and the CA (no new signal; one-predicate law). Gated
ABOVE the scattered-shower band (`OVC0=0.58`) so a dry spell or a light patchy front is `overcast()===0`. When a
real band is overhead, `overcastSky(skyTop,skyBot,oc)` pulls both stops toward a shared leaden grey (the mean of
their two luminances, dimmed by `OVCDIM=0.84`): the top→bottom gradient FLATTENS (an overcast sky is uniform,
not a bright zenith over a warm horizon) and the sky desaturates. ONE transform, called in BOTH `syncSky` (the
CSS backdrop, 200) and `render()` (right after `daylight`, BEFORE GWARM/GWSB/GWST read `skyBot`) — so the
backdrop and the canvas sky/sea/cloud colours can never disagree, and a storm mutes the sea's golden sheen
(GWARM) too. The same `OVCNOW` dims the sun disc (`sunF *= 1-OVCNOW`): the sun hides behind the band.
Constants: `OVC0=0.58`, `OVCRAMP=0.34`, `OVCMAX=0.82` (a floor of gradient always survives — the sky never goes
dead-flat, cf SHAMT), `OVCDIM=0.84`.

**Census.** Draw-only — no rng()/Math.random, no terrain, unreachable from `tick()` ⇒ **core BYTE-IDENTICAL**
(`pop`/`roads`/`developed` +0, empty tile histogram), 0 page errors. VERDICT: PASS (vacuous here; the gate is
the probe + eyes).

**Probe** (`probes/probe-overcast.mjs`). Measures the shipped transform through the artifact's OWN functions
(no pixels, no noise floor, build-agnostic): the HEAD-equivalent sky is `daylight()` with the overcast step NOT
applied, computed in the SAME page, so the diff IS the feature at an exact floor of 0. Three claims, all PASS on
2 seeds × {noon, golden}: **(1) WET** (a real band, `overcast()`=0.82): chroma drops **90–149** across the two
stops, the top→bottom gradient flattens **~48→9** (leaden/flat), and on seed-7 golden the sea's golden gate
**GWARM 0.44→0** (the storm eats the sheen). **(2) DRY / patchy** (`overcast()`===0): the shipped sky is
**BYTE-IDENTICAL** to the HEAD-equivalent — an exact structural fixed point, so a fair or lightly-showered sky is
unchanged. **(3) wiring**: the CSS `--sky-bot` the backdrop actually paints equals the shipped `skyBot` (`wire:true`).

**Perf.** Scalar-only: `overcast()` is one `rainFront()` (a couple of `sin`) per frame, `overcastSky` mutates 6
numbers twice a frame, the sun dim is one multiply. NO new draw primitives — it recolours existing draws (the
sky is CSS), and the sun dim can only REDUCE ink. Path objects unchanged; negligible.

**Visual** (`probes/shot-overcast.mjs`, page.screenshot per 200; storm-golden / clear-golden control /
storm-noon, named by file, each self-reporting year/overcast/front). Both seeds **PASS**. Both blind agents,
by the SKY ALONE, correctly named the storm frame vs the clear frame and matched the filenames (the
discrimination check — they looked): the overcast reads as *"a believable flat, grey, desaturated front… the sun
convincingly dimmed/hidden,"* the clear-golden control as *"a coherent, normal golden-hour dusk sky,"* and the
storm-noon as *"a proper leaden overcast noon with the sun a faint smear behind the front."* No z-order tears,
floating tiles or blown-out colour; each whole frame reads as one balanced, coherent coastal city (the seed-7
agent noting the rain shafts sit correctly as weather over the sea).

**Verdict: DEEPENED** — the weather front now reaches the one surface it never touched. A heavy band hauls a
leaden overcast across the sky and mutes the golden sheen and the sun behind it; a dry or patchy sky is
byte-identical to HEAD. The sky is the front's fourth reader, and the storm is finally a storm all the way up.

## Iteration 306 — the school run only ever happened in the morning (2026-07-15) [People & activity × Deepen/FIX]

**Recovered work.** The worktree was found dirty at startup: `solvista.html` carried one coherent, uncommitted
change plus an ad-hoc `probe-schoolrun.mjs`, killed after step 4 but before step 5 (no ledger entry, no commit —
the last thing an iteration does). Per the dirty-tree rule, the GATES decide, not the ledger: I re-ran the census
(PASS), ran the probe on both builds, and shot the visual gate myself. All three pass, and the diff is a single
coherent draw-only change that ADDS behaviour (not a subtract-only corrupted control file, 197). Described from the
diff; I verified rather than authored it.

**Vector.** People × Deepen/FIX. The school is the one civic institution that draws a time-of-day crowd — a cluster
of kids and grown-ups at its gate — and it was gated on ONE wall-clock window: `if(dayT>0.15&&dayT<0.30)`, the
morning drop-off. A real school day has TWO peaks (drop-off + home-time pickup), so the gate stood empty every
afternoon while the classrooms emptied behind it — a half-schedule. 199's tell on a DRAW GATE: the predicate says
*"the school run"* but its value can only ever be the morning of it.

**Change.** One line: the gate now fires in either window —
`if((dayT>0.15&&dayT<0.30)||(dayT>0.51&&dayT<0.61))`. The pickup sits in early-afternoon daylight (measured `LITAMT`
0.11 at dayT 0.56 — the darkness signal is low, i.e. full day, matching the morning drop-off's 0.06), short of dusk,
so the crowd is lit exactly as the morning one is. `dayT` is the slow ~110s wall clock, so both windows hold (134).
Draws no `rng()`, no `Math.random`, no terrain — the guaranteed-clean-ship class.

**Census.** Core **byte-identical** — `pop`/`roads`/`developed` **+0**, tile histogram empty (draw-only). The
`solarRoofs +2 / greenRoofs +1` is the harness's tick-count wobble (226), not this edit.

**Probe** (`probes/probe-schoolrun.mjs` — TEMPORAL/134, reads NO PIXELS, build-agnostic via `SRC=`). Counts the
figure bodies the frame issues near each school's own gate centre (`w=1.4`, `h∈{1.8,2.9}`, within 16px of the gate,
excluding the fete crowd that shares the signature). HEAD reads **1 busy window** (morning 54/48/40, afternoon **0**)
across seeds 7/42/1234 — `DISTINCT BUSY WINDOWS = 1`, the defect stated with no threshold (236). The patch reads
**2** (afternoon 54/48/40, *identical* morning counts). Controls: midday/night/dusk **empty on both builds** (199's
dead-regime), morning **busy** (the positive control, 248) and **byte-identical across builds** (the change is purely
the afternoon window, 250).

**Visual.** Both seeds **PASS** (aimed afternoon school close-ups + morning control + un-zoomed whole-city, blind
subagent reads). *"A row of ~5 little upright figures standing on the pavement directly at the schoolhouse's gate…
sit correctly on the ground, not floating and not sunk into wall/roof… the afternoon crowd is present and comparable
to the morning one."* No z-order tears, floating tiles or blown-out colour; the whole afternoon plate reads as a
balanced, coherent coastal city on both seeds.

**Verdict: FIXED** — the school run now happens twice, morning and afternoon, where a real one does; the gate is no
longer empty every home-time. The half-schedule (199's tell on a draw gate) is closed.

## Iteration 307 — the local pitch had two players who never left, and no game ever kicked off (2026-07-15) [Civic & culture × Deepen/FIX]

**Vector.** Civic rotation (oldest domain). Civic's additive is complete (292) and its recent defects were found in
the **enumerate-the-category / type-hierarchy** seam (240 stadium fixture, 285 market day), so grep the venue
category rather than the cue list. The event-venue category is {STADIUM, MARKET, amphitheater} — each keeps a
schedule — but there is a **fourth** venue that never got one: **`T.FIELD`, the neighbourhood sports pitch**. Its
draw was `if(LITAMT<0.4){ two players }` — a GLOBAL MONOTONE gate (262/286 cliff), so the SAME two players stood on
EVERY pitch in the city at every daylit hour of every day, forever, and a game was never on or off. `probe-pitchgame`:
HEAD reads **DISTINCT daytime states/field = 1, game-days 10/10, DESYNC maxCorr = 1.00** (every pitch identical) — the
defect stated (236). It is the last member of the category iter 285's law told us to enumerate.

**Change (draw-only — no `rng()`, no `Math.random`, no terrain).**
- **`pitchGame(x,y)`** — a lighter calendar than the stadium fixture, in `fixtureAt`/`matchClock`'s idiom and beside
  it: a pickup game runs on ~half of afternoons (`PITCHP=0.5`, kickoff `0.52`, `PITCHDUR=0.22`, ending `0.74 < SUNDN`
  so it is always daylit — no floodlights on a chalked local ground). **Salted per HEX and per DAY**
  (`hashCell(x*7+day, y, seed^SALT)`), so two pitches rarely fill on the same afternoon and the crowd never blinks on
  as one (263). Most days the pitch is an empty ring.
- **The FIELD draw** now, when `pitchGame>0 && LITAMT<0.5`, scatters `round(8*g)` small players in the two team
  colours (`coral`/`teal`) across the pitch (within `±0.45·HW / ±0.4·VR`, stable per-player via `hashCell` + a time
  wobble), each with the stadium speck's contact shadow (`shadS(…,0.05,0.13)`), plus a chased white ball. On off-days
  it draws nothing — the empty chalked ground, which is correct and realistic.
- **Tooltip** `pitchWord(x,y)` (a `['Now', …]` data row beside the stadium's `Fixture`) and **`residentWhere`**
  (`'In a game on the pitch.'` vs `'Cutting across the field.'`) both read the SAME `pitchGame` the draw does
  (123, forwards).

**Census.** Draw-only → **PASS, 0 page errors**, core **byte-identical** (`pop`/`roads`/`developed` +0, tile
histogram empty). `greenRoofs −1` is the 226 tick-wobble (a draw/tooltip-only change cannot move it semantically —
278). Vacuous by construction; the gate is the probe + the eyes.

**Probe** (`probes/probe-pitchgame.mjs`, TEMPORAL, build-agnostic, no pixels/no noise floor). Patch vs HEAD, 3 seeds:
- **DISTINCT daytime states/field 1.0 → 3.0** (the game turns on, ramps, and off — HEAD's was a constant);
- **game-days/10 10.0 → 4.0–5.8** (matches `PITCHP=0.5` — the pitch is mostly empty, as a real one is);
- **DESYNC maxCorr 1.00 → 0.45–0.82** (< 1 on every seed — pitches fill on different afternoons, off the 262 cliff).

**Visual.** `probes/shot-pitchgame.mjs` (freezes in-page, pins dayT to a game-day and an empty-day afternoon on the
**least-occluded** field — 206/231, scored by front-row height — clips tightly on its post-`clampPan` screen
position, 285). Seed 42 (agent): the pitch shows a scatter of coral/teal players + a ball sitting correctly ON the
chalked hex; the empty frame is the same pitch with the players gone (clean control); whole-city coherent. Seed 7
(direct read): same — game frame shows players on the ball-diamond pitch, empty frame is the bare chalked ground;
city reads balanced. No z-order tears, floating tiles or blown-out colour. ⚠ *Camera note:* the first seed-7 aim
picked a field buried in the downtown core (206) and framed towers — fixed by scoring fields on open frontage before
aiming (226/258's spirit); banked in the shot script.

**Verdict: FIXED** — the neighbourhood pitch is the last venue in the category to get a schedule (240/285/292): a
pickup game now fills it on some afternoons and it is an empty chalked ground the rest of the time, off a per-hex
per-day clock, instead of two frozen players who stood there every daylit hour forever. Draw-only, path count roughly
neutral (more players during a game, none otherwise); free by construction.

## Iteration 308 — the "dry-season lightning" fired just as readily in the wet winter (2026-07-15) [Nature × Deepen]

**Vector.** Nature rotation (oldest domain). Nature's additive is spent (301) and its Polish debt is paid (294), so per
the header I grepped the `tick()`/CA seam and the frozen-census/comment tells rather than the cue list. Nature is
extraordinarily mature — every CA runs (kelp 282, wildfire 279, bloom 263, solar 287), every belt keeps a calendar
(farm 108, orchard 57, vineyard, the woodland spring/autumn ephemerals), FOREST is a live logging↔regrowth equilibrium
(225 flat but dynamic, not a dead rule). But one comment lies. The forest fire spark's own comment reads
*"dry-season lightning takes a patch of forest"* — and its rate was a **flat constant** `FIRESPK`, with no season term
anywhere. A forest hex was exactly as likely to catch in the wet-winter thaw (s≈0.12) as at the golden dry peak
(s≈0.62), which is backwards for a wildfire. 199's tell, hosted on a CA spark: a comment asserting a *seasonality* the
value cannot have. Confirmed on HEAD before designing (`probe-fireseason`): ignition dry/wet ratio **≈1.0** on 3 seeds
(0.83–1.67), the expected rate a **flat 3.00/season** — season-blind by construction.

**Change.** The spark now rides the season the rest of the coast already reads. `fireSeason() =
1 + FIREDRY*(0.5 - seasonCool())` — `seasonCool()` is the artifact's dryness curve (0 at the dry peak, 1 at the wet
trough), already read by the grass, the deciduous canopy and the day length; the fire is its **7th reader** (one
predicate, N readers). The FOREST spark's threshold becomes `hashCell(...) < FIRESPK*fireSeason()`. The lever is
**CENTRED on seasonCool's own mean (0.5)** (245/98): `seasonCool()` is a pure cosine (`0.5-0.5cos(2π(s-0.62))`) with
year-mean exactly 0.5, so `fireSeason()` averages **exactly 1** over the year and the annual ignition total is HELD —
the dry season burns more only because the wet season burns exactly that much less. `FIREDRY=1.8` ⇒ **1.9× at the dry
peak, 0.1× at the wet trough** (never negative), so a wildfire is a summer thing. Reads no `rng()`/`Math.random`, so
the spark itself stays inert to the seeded stream — only the terrain a fire BURNS perturbs it, which is HEAD's own,
unavoidable cost (279). **The timber-block spark is left untouched:** it is an URBAN fire (old buildings smouldering
until the 1991 firehouse), and its comment is about the engine era, not the dry season.

**Census.** Fire writes terrain, so the ignition-timing change cascades chaotically through the `rng()` stream (the
invariant expects this). Core HELD and net-positive: `pop` +2.9%, `developed` +0.3%, `roads` +0.4%; tile histogram a
mild reshuffle (FOREST −10, BURNT 4→2, TOWER +27, RES +56 — all within noise). **VERDICT: PASS, 0 page errors.** The
centred lever is why nothing collapsed.

**Probe** (`probes/probe-fireseason.mjs` — TEMPORAL/134, build-agnostic via `SRC=`, no pixels/no noise floor). Part A
reads the EXPECTED ignition rate from the artifact's own `hashCell·FIRESPK·fireSeason` over its own frozen forest set;
Part B drives the artifact's own `tick()` (never a re-implementation) at the dry peak vs the wet trough. Pinned ~2015
(post-2000 ⇒ no logging, stable forest host; pre-2030 ⇒ spark live; timber spark off ⇒ all ignitions are the forest
spark). **HEAD:** `fireSeason` 1.00 flat (build-agnostic fallback), Part A rate a flat 3.00/season (dry/wet **1.00**),
Part B real dry/wet a noisy ~1 (0.40–1.33 — season-blind). **Patch:** `fireSeason` **0.10 (wet) → 1.90 (dry)**,
year-mean **0.991≈1** (held, exactly 1 analytically), Part B real ignitions dry≥wet on all 3 seeds (**∞ / ∞ / 7.00**).
The defect is stated with no threshold (236): HEAD's constant curve IS the bug.

**Visual.** Fire is invisible at 2035 (`year<2030`) and a still cannot show a cadence (134), so the visual pass is the
holistic regression check that the mildly-cascaded 2035 city still reads. Whole-city shots at seeds 42 and 7, blind
subagents, both **PASS**: coherent balanced coastal city, land/sea/roads/forest all correct on the hex grid, no z-order
tears, no floating/sunk tiles, no blown-out colour.

**Verdict: DEEPENED** — the forest fire is now the 7th reader of the coast's dry-season curve: wildfires concentrate in
the golden summer and all but vanish in the wet winter, where before they fired year-round. The annual burn total is
held by construction, and the comment that promised "dry-season lightning" for the artifact's whole life is finally
telling the truth.

## Iteration 309 — the walk-up water tank was a mark of an old building, on a building of any age (2026-07-15) [Urban fabric × Deepen]

**Vector.** Urban rotation (oldest domain, 302). Urban's tooltip/flag/TABLE seams are audited saturated (295/302/281),
so per the header I grepped the draw for the 199/comment tell rather than the cue list. The MID walk-up draw carries a
lovely little ornament — a timber water tank on the roof — under the comment *"the older walk-ups keep a timber water
tank on the roof."* Its gate is `!c.solar&&!c.groof&&hashCell(x,y,seed^0x7A7E)<0.3`: a **static per-cell hash, with no
age term anywhere.** So the tank stood on a 3-year-old walk-up exactly as readily as a 40-year-old one — 199's tell, a
comment asserting an age-dependence the value cannot have. And this matters more than one comment: `c.age` is 254's
**live-but-unread host** — ticked at 36 sites, dating the current structure, published in the tooltip (*"Built ~1998"*)
— and **no pixel on a developed building had ever read it.** 254 reverted an age→patina *hue* and banked the finding:
*the building colour channel is spent, but a SHAPE / ORNAMENT / COUNT can still show that the old town is downtown.*
The tank is exactly that ornament, already drawn, just gated on the wrong thing.

**Confirmed on HEAD before designing** (`probe-tankage`, build-agnostic via `typeof TANKAGE`): corr(tank, age) **≈ 0**
on every seed/era (−0.28…+0.18 noise on a static hash), and the tanked walk-ups' mean hexDist ≈ the whole low-MID
mean (no gradient). Meanwhile the host itself is strong: **corr(age, distCBD) ≈ −0.35 at 2035** across seeds — older
walk-ups genuinely cluster toward the core (downtown builds early, then its towers just grow taller without an age
reset, while the rim churns EMPTY→RES→MID and keeps resetting). The old town *is* downtown, and nothing showed it.

**Change (draw-only — no `rng()`, no `Math.random`, no terrain).** The tank gate gains **`c.age > TANKAGE`**
(`TANKAGE=160` ≈ 12 yr at `age*0.075`). The hash still picks *which* walk-ups are tank-bearing (deterministic, spread
out); the age term decides *when* the tank appears. A freshly-converted RES→MID shows a bare roof until it has stood
~12 yr, so tanks accrue over decades and settle onto the genuinely old buildings — which lean central. `c.age` rises
monotonically for a stable MID (no MID→higher upgrade resets it), so the tank appears once and never flickers off.
The comment is now true. **First pixel on a developed building to read `c.age`.**

**Census.** Draw-only → **PASS, 0 page errors**, core **byte-identical** (`pop`/`roads`/`developed` +0, tile
histogram empty). Vacuous by construction; the gate is the probe + the eyes.

**Probe** (`probes/probe-tankage.mjs`, pure world data, build-agnostic, no pixels/no noise floor; 6 seeds × 3 eras):
- **HEAD** — corr(tank, age) ≈ **0** (age-blind); tanks present on 5–8 fresh walk-ups even in the **1995 boomtown**
  (buildings ~3–8 yr old); tanked mean-dist ≈ low-MID mean-dist (no gradient).
- **PATCH** — **0 tanks in 1995** (correct: no walk-up has stood 12 yr yet), accruing to 8–15/city by 2035; at
  mid-development (2015, where the walk-up stock spans young↔old) corr(tank, age) jumps to **+0.26…+0.47**, and the
  tanked mean-dist falls **below** the low-MID mean on 5/6 seeds (tanks pull toward the core). By 2035 nearly every
  walk-up is >12 yr so the gate stops discriminating and corr washes back to ~0 — correct: a mature city's walk-ups
  are all old, so all the tank-type ones carry a tank. The behavioural win is the **accrual over time**, which HEAD
  could never show (a 1995 tank on a 3-year-old building was the defect stated).

**Visual.** The tank *draw code* is untouched (only its gate), and the probe confirms 8–15 tanks still render at 2035,
so the visual pass is the holistic regression/coherence check. Whole-city shots, seeds 42 & 7, blind subagents, both
**PASS**: balanced coherent coastal city, all tiles seated on the hex grid, no z-order tears / floating / sunk tiles,
no blown-out colour, density peaks naturally in the core and eases outward — still beautiful as a whole.

**Verdict: DEEPENED** — the rooftop water tank now rides building age, so it is genuinely a mark of an old walk-up:
tanks are absent from the young boomtown, accrue as districts stand, and settle onto the old core. `c.age` — dated,
tracked, tooltip-published and pixel-invisible for the artifact's whole life — finally reads onto a developed
building, exactly the shape/ornament 254 banked. Free by construction (draw-only, path count a touch lower).

## Iteration 310 — forty laps of growth, and the frame got faster (2026-07-17) [39th step-back / holistic]

**Vector.** The rotation's next domain is Water (303, oldest), but the header's own law said the **step-back was
due at 310** (5 vectors since #38 at 304 — the loop's main guardrail for long unattended runs, and it outranks
one more feature). So this lap is the holistic self-check; **Water resumes next.** No `solvista.html` change.

**Step-back #39.** `probes/shot-stepback.mjs`, 2 seeds (42, 7), 5 frames each — day / golden / night + a CROSSED
dusk-summer/dusk-winter discriminating pair (264: one wall-clock instant, sun UP in summer and DOWN in winter).
Every frame self-reports its state.
- **Visual: city is healthy — no cumulative drift.** One agent per seed, blind, cumulative question. Both read
  all five frames as a coherent, balanced coastal city — no z-order tears, floating tiles, ornaments-in-mid-air,
  blown-out colour. Both correctly named **dusk-winter** as the darker/night-lit frame (the discrimination check
  — they looked, and the day-length season is alive). Both flagged the dense downtown tower core as *edging*
  toward repetitive but "not yet clutter" — the deliberate core the header's do-not-re-open list already covers.
- **The one FAIL was refuted by a probe, not shipped as a cue.** The seed-42 agent FAILed on "golden hour is a
  muddy dim-brown wash, nearly identical to dusk-summer, not luminous warm low-sun light" — and the seed-7 agent
  independently called golden "warm but muddy." Weighing a shared aside above a verdict (212), I probed rather
  than believed. `probe-goldenhue` (golden pin DERIVED in-page as argmax GWARM, 265) settles it **objectively:
  golden keeps the greens' identity** — PARK **8°** / FOREST **10°** off their daylight selves, against HEAD's
  historical **23°/24°** rotated onto ROAD/BEACH. The monochrome-terracotta cue stays **CLOSED** (265 holds).
  The "golden ≈ dusk-summer" reading is *by design*: the golden pin (argmax GWARM, t=0.775) sits **0.009** from
  dusk-summer (t=0.766) — adjacent near-sunset instants — and golden is dim because the sun is low
  (LITAMT=0.34), which is correct golden-hour behaviour, greens intact. **Not drift; not a defect.**
- **Night ordering invariant PASS** (`probe-goldenhue`): `*TOWER 130 *MID 124 *COM 118 | BEACH 98` — the dimmest
  lit surface clears the brightest unlit by 19 (222/251, on the p90 envelope). Neighbour separations hold.
- **Perf: no drift.** LAP vs #38 (304): day **+2.3%** / night **−0.1%** (ms, within a 6-lap noise floor). ARC vs
  270 (~40 laps back), in **path objects** (the load-immune unit — 216/198): day 112,117 vs 111,065 = **+0.95%**,
  night 139,660 vs 138,640 = **+0.74%** — ~**+0.02%/lap**, an order under the +0.2%/lap additive tendency; the
  byte-flat FIX/credit laps (283/285/286/287/288/…) cancelled it. (perfab ms read **−2.1%d/−1.7%n** — load
  favoured "now"; path objects are the verdict.) No compounding.
- **Census gate:** `solvista.html` byte-identical to HEAD (zero edits), VERDICT PASS / 0 page errors — confirmed.

**Tool nit (banked, not fixed).** `shot-stepback`'s per-frame self-report prints **`GWARM=0` on every frame,
including golden** — which contradicts its own pins line (`GWARM peaks 0.779`) AND `probe-goldenhue` (which finds
a clear warm shift at the same pin). It is a stale/mis-timed **caption read**, not a render bug: the golden PNG's
pixels ARE warm (agents + probe agree), so the `GWARM=0` label lies while the frame is correct — exactly the
false-defect trap a self-report exists to *prevent*. It nearly steered this lap into "golden is unwarmed."
Reading GWARM correctly in the frame's readState (it is set inside `render()`; the read must be downstream and
not reset) is a legitimate future tool lap — same shape as the still-standing `HUD=STALE` phaseWord/clockWord nit.

**Verdict: STEP-BACK — NO DRIFT.** No feature shipped. The city is confirmed coherent across 3 lights × 2 seasons
on 2 seeds; the day-length season reads by light alone; 40 laps of growth cost ~1% of draw work; golden hue
keeps the greens (265 holds). The guardrail is reset (next step-back ~315); **NEXT vector is Water (303, oldest).**

## Iteration 311 — the sea broke as hard in August as in a January storm (2026-07-17) [Water & coast × Deepen/interconnect]

**Vector.** Water rotation (303 oldest). The header's law is to grep the seam, not the cue list — and
grepping `WINDA`, the ONE gust signal the whole coast reads (the whitecaps and windrows through
`seaState()`, the breaking surf, plus the trees/palms/flags/clouds/kites), against the calendar turned up a
holdout: `WINDA` is a **pure function of `time`** (`advanceEntities`, L10321) with **no seasonal term at
all**, so the sea broke exactly as hard in settled August as in a January storm. Winter is the stormy season
on this coast, and nothing said so. This is 261's law arriving on the WIND (the season is a clock; a
scene-wide signal was deaf to it), found by the "grep a global for a clock every relative already reads"
move — the sea already answers the tide (113/196/257), the light (181/257) and, since 245/275, the
instantaneous wind; the one clock it never read was the calendar.

**Change.** One centred multiply on the gust: `WINDA = clamp((HEAD gust)*windSeason(), 0, 1)`, with
`windSeason() = 1 + WINDSEAS*(2*seasonCool()-1)` (`WINDSEAS=0.35`). This is `dayLen()`'s own idiom
(`2*seasonCool()-1`: +1 at the wet trough, -1 at the dry peak, **MEAN 0**), so the year-mean wind is HEAD's
and the equinox is a byte-identical fixed point. Winter runs `1.35x`, summer `0.65x`; the summer sea drops
to a glassy `seaState≈SEACALM` while the winter gust saturates at full gale. **NOTHING NEW IS DRAWN** — the
whitecap/windrow/surf machinery, all centred on `seaState()==0.5`, just answers one more clock. The whole
scene gusts seasonally together (247's "the whole scene gusts together" comment, now with a calendar): winter
trees sway harder, winter clouds drift faster, but the sea is the visible payoff and the reason it is a Water
lap.

**Census.** Draw-only, no `rng()`/`Math.random()`/terrain, `WINDA` unreachable from `tick()` ⇒ **core
BYTE-IDENTICAL** (pop/developed/roads +0, empty tile histogram). `greenRoofs +1` is the 226/278 RAF-tick
wobble (a hair-slower draw lands one fewer late-CA tick; reproduces on a same-file re-run), not semantic.
VERDICT: PASS (vacuous — the gate is the probe + eyes).

**Probe** (`probes/probe-windseason.mjs`, render-free, no noise floor, build-agnostic via a `windSeason`
stub). Sweeps `WINDA`/`seaState()` over a full gust cycle at four calendar points, HEAD (`windSeason=()=>1`)
vs patch, 2 seeds. **HEAD: `seaState` CONSTANT across all four seasons — `DISTINCT = 1`** (the cliff, the
defect stated, 236). **PATCH: `DISTINCT = 3`, WINTER/SUMMER seaState 1.49–1.51x** (winter rougher). **YEAR-MEAN
held** (245): patch 0.504/0.491 vs HEAD 0.499/0.485, **delta +0.005 (~1%)** — a small, honest asymmetry from
the winter WINDA clamp at 1.0 (summer floors at windForce 0, winter saturates), well within held-mean
tolerance for a draw-only redistribution. **EQUINOX FIXED POINT** (253): the `windSeason=()=>1` HEAD column
equals the patch's two equinox rows exactly; a year-pinned equinox reads `6e-10` (the expected float residual
of pinning a season by a non-representable `year%1`, 261 — the *proof* is the stubbed column, not the pin).
**CONTROL** TIDE (no seasonal term): identical across all seasons, `DISTINCT = 1`.

**Visual** (`probes/shot-windseason.mjs`, a DISCRIMINATING PAIR — winter vs summer at ONE gust instant, same
tide, same light — aimed by measured sea ink, MASKED to the sea per shot-seastate's law, gust phase pinned at
the base cycle's peak; token→season map CROSSED between seeds, non-ordinal tokens). Both seeds **PASS**. Both
blind agents, on crossed maps, **named the winter (rough) frame by the sea alone** — seed 42 kappa, seed 7
sigma — reporting more/brighter whitecap flecks and foam streaks on the winter open water and a glassier,
greener summer sea, sitting correctly on the hex water with no z-order tears, floating sprites, mis-colour or
blowout, and both whole-city frames balanced and coherent.

**Verdict: DEEPENED** — the coast's sea now answers the calendar as it already answers the tide, the light and
the instantaneous wind: winter seas run rough and the summer sea goes glassy, at zero new draw work, on the
one scene-wide signal that had never read a clock.
