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
| **Water & coast** | 6, 10, 12, 16, 20, 33, 106, **169**, **296** | 90, **282** | 17, 25, 51, 65, 72, **113**, **123**, **159**, **196**, **245**, **257**, **289**, **303**, **311**, **322** | 22, ~~**205**~~ | | U2, 44, 58, 79, **116**, **132**, **150**, **185**, **214**, **223**,  **234**, ~~**255**~~, **266**, **268**, **275** | **97**, **141**, **176** |
| **Urban fabric** | 32, 62, **295** | 7, 23, ~~82~~, **151**, **281** | 38, 54, 68, 92, **165**, **173**, **189**, **199**, **209**, ~~**218**~~, **219**, ~~**254**~~, **267**, **288**, **309**, **316** | 47, **109**, ~~**160**~~ | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103**, **110**, **118**, **124**, **143**, **180**, **216**, **220**, **224**, **228**, **235**, **239**, **274**, **302** | **133** |
| **Transport** | 2, 9, 21, 31, 48, **164**, **297** | 77, **283** | 28, 39, 55, 63, **112**, **121**, **128**, **155**, **179**, **193**, **230**, **249**, **258**, **269**, ~~**312**~~ | 5, 15, **138**, **211**, **276** | U4 | U1, U3, 70, 85, 87, 94, **146**, **188**, ~~**203**~~, **241**, **243** | **105**, **171**, **290** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107** | 36, 59, 66, 80, 91, **149**, **158**, **175**, ~~**195**~~, **213**, **244**, **250**, **259**, **277**, **285**, **292**, **307** | 45, **204**, **319** | | 73, ~~**114**~~, **168**, **231**, ~~**270**~~, **299** | 52, 122, **140**, **184** |
| **Sky & atmosphere** | 27, 43, **291** | **321** | 19, 35, 50, 57, 95, **135**, **153**, **161**, **181**, **190**, **208**, **225**, **236**, **253**, **261**, **280**, **284**, **298**, **305**, **313** | | | 61, 81, 89, **115**, **200**, **242**, **248**, **265**, ~~**273**~~ | ~~**134**~~, **144** |
| **People & activity** | 41, 56, **127**, **170**, **186**, **293** | 49 | 34, 64, 93, **104**, **119**, **145**, **178**, **201**, **210**, **240**, **247**, **262**, **271**, **286**, **306**, **314**, **317**, **318** | 78, **111** | | 84, **137**, **163**, **226**, **300** | 71, **154**, **191**, **278** |

- **Interaction/UX** (inventory + the `<meta charset>` repeal archived at 270; both are INVARIANTS in SKILL.md). What
  steers: when adding an entity array, `stamp()` it in its draw + add an `ENTINFO` row (same discipline as the census
  hook) — `stamp()` also draws the focus ring, so any stamped entity is ringable free. **An `ENTINFO` `sub` may be a
  FUNCTION of the entity (105)** — use it when a thing's interest is its *membership* (line/route/depot), computed live.
- ✅ **THE TRIM METHOD** (paid 279, again 280): a block is cuttable when its **LAW is in SKILL.md** and its **ARTIFACT
  FACTS compress to their imperatives**; a *superseded* warning is free to cut (280's `__setWind` retired 275's).
  There is never a block you can simply *delete* — **compress the oldest, and pay for your OWN additions in the same lap.**
- **ROTATION.** Last: Water **322** (WHALE MIGRATION — gray whales now answer the calendar (286 pattern), neglected
  Water domain: `drawWhale` had NO season gate ⇒ a MIGRANT drawn as a resident all year. `whaleSeason()` (raised
  trapezoid on `year%1`, ~1 Dec–mid-May, 0 golden summer/autumn); gate `<=w.ph/7` off the whale's OWN phase ⇒ zero new
  random draws, staggered fade, hidden ⇒ not stamped ⇒ not hoverable. Dolphins stay resident. Census BYTE-IDENTICAL
  (whales array untouched). `probe-whalemigration` PATCH win/spr 40→sum/aut 0 (DISTINCT 4) vs HEAD 40 always (DISTINCT
  1), dolphins flat control; 2 blind visual PASS, both named winter by the whales on a crossed map.) · Sky **321**
  (SNOW — Sky's 1st CA in 321 laps: reaction-diffusion `c.snow`, census byte-identical, +1.1% draw deep-winter only.) · Civic **319**
  (CUP-NIGHT FIREWORKS: `matchCelebrate()` 6-shell finale over each stadium
  after a cup-night whistle, `LITAMT>0.6`; draw-only, exact fixed point; `probe-matchfire`) · People **318**
  (WASHING LINE answers rain+season) · People **317** (SEASONAL LEISURE COMPLETE) · Urban **316** (DISTRICTS made
  real — Voronoi `distOf`, 55→98%; ⛔ **the vote in `tick()` is a STREAM-PRESERVING VESTIGE — do NOT delete**) ✅
  **EXCITABLE-MEDIA CATEGORY COMPLETE** (bloom 263 · shroom 272 · party 314). ➡ **STEP-BACK #41 CLEAN AT 320 —
  next ~325.** ➡ **NEXT: the two stale ADDITIVE cells: Civic/People × New CA rule (36/107 · 49) — or grep a
  measured seam (225). SKY × New CA now SEEDED (321); its template (season source + neighbour diffusion, inert
  draw-flag) is reusable for any weather/ground field.**
  ✅ **308 fire-spark rides `fireSeason()`, 305 front greys the sky, 291 Sky lightning — full entries in ledger.** ⚠
  **TRANSPORT SATURATED** (304/312: 4 seams grepped clean; (bi) daytime-lamp & (av) catenary cues = barely-visible bad
  trade ⇒ ⛔ do NOT force, `polish-tile`). Sky NEW ELEMENT additive still sparse (291, 3rd ever).
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
  ➡ **OPEN cues: (ay)** windrow LENGTH (POLISH ⇒ not Water's next) · **(az)/(ba)** 278's two (below).
  ✅ **CLOSED (detail in each entry):** (bh) by 317 (a NON-DEFECT: a fine gold statue, not a blob) · (bd) by 284 (two
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
  ✅ **STEP-BACK #40 RAN AT 315 — NO DRIFT, and NO false FAIL this time** (both seeds coherent, day/golden/night +
  CROSSED dusk-summer/winter pair; both named winter by light ⇒ day-length season alive; only aside was the KNOWN
  faint day-sea hex quilt, "subtle, does not break the read" — 255/257/268, capped, not new). `probe-goldenhue`
  PASS, greens keep identity 8°/10° vs HEAD's 23°/24° ⇒ **golden monochrome cue stays CLOSED, 265 holds**; night
  ordering `*TOWER 130 *MID 124 *COM 118 | BEACH 98` clears by 19 (222/251). Perf ARC FLAT (path objects, load-
  immune — 216/198): LAP vs 310 +0.27%d/−0.03%n; ARC vs 275 ~40 laps +0.59%d/+0.62%n = ~**+0.015%/lap**, cancelled
  by byte-flat FIXES. ⚠ **PRICE THE ARC IN PATH OBJECTS, NOT ms** (perfab is load noise). ⚠ Blind A/B NON-ORDINAL +
  CROSSED (268). ⚠ **TOOL NITS in `shot-stepback` (STILL banked, not fixed — legit future tool laps):** per-frame
  `GWARM=0` self-report is a stale caption read (pixels ARE warm; agents + `probe-goldenhue` agree) — do NOT read it
  as "golden unwarmed"; and `HUD=STALE` on golden/dusk = `phaseWord`-vs-`clockWord` mismatch, not a stale DOM.
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

> **Archive:** the 315 entries before Iteration 313 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

## Iteration 313 — the hot-air balloons rode serenely through the thunderstorm (2026-07-17) [Sky & atmosphere × Deepen/interconnect]

**Vector.** Sky rotation (oldest-shipped domain, 305). Sky's Deepen is mature but its comments were not all
audited, so I grepped the sky seam for a 199-tell rather than the cue list. The balloon spawn's two comments
read *"hot-air balloons drift over on **fair days**"* and *"**fair-weather** balloon festival"* — and the spawn
gates on **`year>=1998` ALONE, with no weather term anywhere.** So the whole fleet floated placidly through
overcast, showers and — since 291 — **lightning**. A hot-air balloon is the quintessential fair-weather craft
(grounded by rain and gusts); this is 199's tell hosted on a draw's HOST comment: the words assert a
fair-weather behaviour the value cannot have. Confirmed on HEAD before designing (`probe-balloonweather`):
balloon ink is **byte-flat across the front's driest and wettest year** (wet/dry ratio **≈1.00** on 3 seeds).

**Change (draw-only — no `rng()`, no `Math.random`, no terrain).** The balloons never despawn — `advanceEntities`
**wraps** them (`b.x>G+8 → -8`), so a spawn gate could never empty the sky (the fleet fills on the first fair
tick past 1998 and then loops through every future storm). So the gate lives at **DRAW**, faded on the shared
weather signal:
- **`balloonFair() = 1 - clamp((rainFront()-BALLOON0)/BALLOONRAMP, 0, 1)`** with `BALLOON0=0.50, BALLOONRAMP=0.20`
  — full below 0.50 (before the sky even leadens at `OVC0=0.58`), grounded by ~0.70 (a clear shower). The Nth
  reader of the one `rainFront()` every cloud/bow/CA already shares (one-predicate law). It FADES, not pops, or a
  passing shower would blink the sky (134); `rainFront` is the slow ~20yr cycle, so no strobe.
- The balloon draw loop wraps each envelope+basket in `ctx.globalAlpha=ballFair` (reset to 1 after), and skips the
  loop entirely when `ballFair<=0.01`. Spawn UNCHANGED ⇒ the seeded stream is untouched.

**Census.** Draw-only, unreachable from `tick()`'s terrain ⇒ core **BYTE-IDENTICAL** (`pop`/`developed`/`roads`
**+0**, tile histogram empty). `greenRoofs -1` = the 226/278 RAF-tick wobble, not this edit. VERDICT: PASS
(vacuous by design — the gate is the probe + eyes).

**Probe** (`probes/probe-balloonweather.mjs`, 3 seeds). Isolates the balloon LAYER by rendering the frozen frame
WITH balloons and WITHOUT (clear the array) and diffing — the changed pixels ARE the balloons, sky cancelled,
floor exactly 0. Measured at the driest and wettest year of each seed's front. Build-agnostic via **253's
suppress-the-predicate** trick (`window.balloonFair = () => 1` renders HEAD's weather-blind behaviour in-page —
no source swap, no cross-build floor). ⚠ `__warp` parks every balloon off the left edge (never drifts them), so
the probe spreads them across the plate first — position is independent of the fade.
- **PATCH: balloon ink dry 830–905 px → wet 0 px** (wet/dry **0.000** on every seed) — the fleet grounds in the rain.
- **HEAD (control): dry ≈ wet** (ratio **0.999–1.004**) — flies through the storm regardless. The defect, stated.

**Visual** (`probes/shot-balloonweather.mjs`, seeds 42 & 7; a discriminating pair per 258, since the success case
is an ABSENCE). Three frames each: **fair** (dry year — balloons out), **storm** (wettest year, same hour — leaden
sky, NO balloons), **storm-head** (the storm with `balloonFair→1` forced — balloons drifting through it, the
defect). Both blind subagents **PASS**: *"balloons present and reading correctly as hot-air balloons"* in fair;
*"leaden grey/overcast … all the balloons are ABSENT"* in storm; *"the balloons are PRESENT again … the old buggy
behavior"* in storm-head. No z-order tears, floating tiles or blown-out colour anywhere; both whole frames read as
balanced, coherent coastal cities (one noting the storm's rain shafts + rainbow render cleanly around the now-empty
sky).

**Verdict: DEEPENED** (a FIX). The balloons now read the weather the rest of the sky already does — they fill a
clear day and fade out as the front gathers, instead of sailing through thunderstorms. It is the inverse of 312's
reverted daytime lamp: that RENDERED but could not be seen (259); this one is a clear, legible, correctness change
(830 px of balloon, present vs cleanly absent) and free by construction (draw-only, census byte-identical). Closes
the "fair days" 199-tell on the balloon comment.

## Iteration 314 — every block party in the city started and ended on the same beat (2026-07-17) [People & activity × Deepen/FIX]

**Vector.** People rotation (306 oldest-shipped). The header steers People's stale kind to New CA rule (49) but
forbids a People Deepen "without a MEASURED seam" — so I grepped the People/CA seam rather than the cue list. The
block-party excitable medium (`tick()`, `c.party`: a home ignites a street party, it spreads to neighbours for a
spell, then rests) shared a **CONSTANT refractory (`-16`) and constant duration (`5`)** — so, exactly like the fairy
rings before 272 and the wildflowers before 263, the whole city ignited and became eligible again in lockstep. This
is the 271 defect (a property established for a category, applied to every sibling but one): its excitable-media
siblings BOTH jitter a timer off a per-cell uniform (bloom's refractory `-(9+c.v*10|0)`, 263; shroom's duration
`shroomLife`, 272), and the block party — a People CA in the same `tick()` — was the holdout with **both** timers
constant, so it synchronised hardest. Confirmed on HEAD before designing (`probe-blockparty`, temporal, 134): the
active-count series is a **metronomic square wave** — `9###21...............89###21...` — 4–5 ticks on, 16 off, in
perfect lockstep (period 21), refractory `DISTINCT = 1` on 6 seeds in 6 (236: the defect stated).

**Change (decoration-state only — no `rng()`, no `Math.random`, no terrain).** One line: the wind-down reset
`c.party=-16` → `c.party=-(12+(c.v*9|0))`, so the rest runs **12..20 ticks** from the cell's own `c.v` (the uniform
`hashCell(x,y,seed)` it already carries — ZERO new random draws, 262). `12+(c.v*9|0)` has mean **16 = HEAD's
constant**, so the cadence mean is held (98). Staggering re-eligibility de-synchronises the waves; nothing else
changed (spread, ignition, spawn, draw all untouched).

**Census.** `c.party` is decoration state, read only by draws (`drawParty`, the terrace party-wall gate) and a
tooltip; `c.v` is pre-existing; no `rng()`/terrain ⇒ core **BYTE-IDENTICAL** (`pop`/`developed`/`roads` **+0**, tile
histogram empty). `greenRoofs -1` = the documented 226/278 RAF-tick wobble (a hair-slower draw lands one fewer late
tick; reproduces on a same-file re-run), not this edit. VERDICT: PASS (vacuous by design — the gate is the probe + eyes).

**Probe** (`probes/probe-blockparty.mjs`, temporal, 3 seeds × 2 eras, build-agnostic via HEAD-file load; NO PIXELS ⇒
no noise floor). Drives the artifact's own `tick()` and reads `cells[].party`.
- **HEAD: refractory `[16..16] DISTINCT=1`**, a perfect square wave, **zero-party ticks a steady 76%** at every era —
  the whole city blinks as one, and at 2035 shows **1 party at a time or none** (max 1).
- **PATCH: refractory `[12..20]`** (mean 16 held), the series scatters (`3444422566541.....3344411...`), and at the
  dense 2005 residential era **zero-party ticks fall 76% → 28/38/57%** (the city now nearly always shows a few
  parties). **Mean-active HELD** (2.43→2.47, 0.97→0.93, 1.23→1.23) — same amount of partying, spread evenly instead
  of pulsing (98). At 2035 the RES stock is thin (many blocks upgraded to MID/TOWER) so it stays sparse on both
  builds — correct: a dense downtown has fewer single-family street parties, the fix cannot and should not invent them.

**Visual** (`probes/shot-blockparty.mjs`, seeds 42 & 7 — warp to the 2006 residential era, step to a tick with a good
cluster, whole-city + a 6× close-up aimed at the densest party; a still cannot show a *cadence* so this only confirms
the draw + coherence, 134). Both blind subagents **PASS**: the close-up shows a street party — trestle table, upright
figures, a string of small warm lantern/bunting squares — sitting correctly on the residential hex ground; no z-order
tears, floating tiles or blown-out colour anywhere; both whole-city frames read as balanced, coherent coastal cities
(parties are small warm speckles scattered through the residential greens at full-city zoom).

**Verdict: DEEPENED** (a FIX). The block-party excitable medium now de-synchronises like its two siblings: instead of
the entire city igniting and resting as one metronome (parties present a steady 24% of ticks, absent 76%, ~1 at a
time at maturity), the neighbourhoods keep a steady scatter of parties (zero-party ticks 76%→28–57% at the dense era),
at the same total party-density (mean held) and zero draw/stream cost. Completes the "enumerate the excitable-media
category" audit (271): bloom (263), fairy rings (272), block parties (314) — every shared-constant-timer CA in `tick()`
now jitters a timer off a per-cell uniform, so none blinks as one.

## Iteration 315 — five clean lights, two seasons, forty laps flat (2026-07-17) [40th step-back / holistic]

**Vector.** The rotation's `NEXT` is Civic or People × New CA rule, but the header's own law flagged the
**step-back due at ~315** (5 vectors since #39 at 310 — the loop's main guardrail for long unattended runs, and
it outranks one more feature). So this lap is the holistic self-check; the feature vector resumes next. No
`solvista.html` change.

**Step-back #40.** `probes/shot-stepback.mjs`, 2 seeds (42, 7), 5 frames each — day / golden / night + a CROSSED
dusk-summer/dusk-winter discriminating pair (264: one wall-clock instant, sun UP in summer and DOWN in winter).
Every frame self-reports its state.
- **Visual: city is healthy — no cumulative drift, and NO false FAIL this time.** One agent per seed, blind,
  cumulative question. Both read all five frames as a coherent, balanced, beautiful coastal city — no z-order
  tears, floating tiles, ornaments-in-mid-air, blown-out colour, no mojibake in any HUD text. No kelp/coast
  darkness, no towers-as-wallpaper wall, no glow-blob compounding. Both correctly named **dusk-winter** as the
  darker/night-lit frame (the discrimination check — they looked, and the day-length season is alive). The only
  aside was the **faint hex quilting on the day/golden sea** — both flagged it "subtle, does not break the read":
  the KNOWN STRUCTURAL one-tone terrace (255/257/268), capped and not a new defect. Both returned VISUAL: PASS.
- **Golden hue PASS** (`probe-goldenhue`, golden pin DERIVED in-page as argmax GWARM t=0.775, 265): golden keeps
  the greens' identity — PARK **8°** / FOREST **10°** off their daylight selves, against HEAD's historical
  **23°/24°** rotated onto ROAD/BEACH. The monochrome-terracotta cue stays **CLOSED** (265 holds).
- **Night ordering invariant PASS** (`probe-goldenhue`, p90 envelope): `*TOWER 130 *MID 124 *COM 118 | BEACH 98
  ROAD 98` — the dimmest lit surface clears the brightest unlit by **19** (222/251). Neighbour separations hold.
- **Perf: no drift, priced in PATH OBJECTS (the load-immune unit — 216/198).** LAP vs #39 (310): day 112,114 vs
  111,816 = **+0.27%**, night 139,567 vs 139,603 = **−0.03%** — free (313/314 draw-only & byte-flat, 312 reverted).
  ARC vs 275 (~40 laps back): day 112,114 vs 111,457 = **+0.59%**, night 139,567 vs 138,706 = **+0.62%** —
  ~**+0.015%/lap**, an order under the +0.2%/lap additive tendency; the byte-flat FIX/credit laps cancel it. No
  compounding. (Per 202, ⚠ `shot-stepback`'s `GWARM=0` per-frame caption is still the stale-read tool nit banked
  at 310 — the golden pixels ARE warm, agents + `probe-goldenhue` agree; the label lies, the frame is correct.)
- **Census gate:** `solvista.html` byte-identical to HEAD (zero edits), VERDICT PASS / 0 page errors — confirmed.

**Verdict: STEP-BACK — NO DRIFT.** No feature shipped. The city is confirmed coherent across 3 lights × 2 seasons
on 2 seeds; the day-length season reads by light alone; forty laps of growth cost ~0.6% of draw work; golden hue
keeps the greens (265 holds). The guardrail is reset (next step-back ~320); **NEXT vector is Civic or People ×
New CA rule** (the two stale additive cells).

## Iteration 316 — the four district colors finally drew a map (2026-07-17) [Urban fabric × Deepen/FIX]

**Vector.** The header's `NEXT` is Civic/People × New CA rule, but the loop's own law outranks rotation: grep the
seam, not the cue list — a found, measured defect beats a shallow additive feature into a saturated city. Grepping
the majority-vote **districts CA** (`c.dist`, DISTCOL gold/teal/coral/sage) turned up a 199-tell: the comment says
"blocks slowly vote themselves a shared identity" and COM shopfronts, awnings, market spots and the tooltip all wear
their **district** color — but `c.dist` is seeded as **per-cell white noise** (`hashCell(x*3+1,y*7+2,seed^13)`), and
a weak vote (ks(50) picks/tick, strict ≥3 majority, ~12 touches/cell over 60 yrs) **cannot coarsen noise into
quarters**. Measured at 2035 (`probes/probe-districts.mjs`): coherence (a dev cell's dist == its dev-neighbour
plurality) only **55–61%** — a hair above the 25% chance floor for 4 colors — biggest same-color run ~1% of the
fabric, COM colors split evenly [46,57,50,38]. **The "District" the shopfronts wore and the tooltip named did not
exist; every street was a random 4-color speckle** — the same shape as 283 (the dead boulevard) and 285 (the market
that kept no day).

**Change (draw-only — no rng(), no terrain, no state).** Districts become a **fixed Voronoi geography** read at draw
time: a new pure `distOf(x,y)` (four centers on a per-seed jittered 2×2 grid over the developed land, one of each
color, nearest wins in `ctr()` screen space so quarters read round; memoised per seed off a **private PRNG**, zero
shared `rng()`). The four readers (MARKET spots · COM sign · COM walk-up sign · tooltip) now read `distOf(x,y)`
instead of `c.dist`. **The seed and the vote pass in `tick()` are left byte-identical** — the vote is retained ONLY
to keep the seeded stream aligned, because its `rng()<0.5` is short-circuit-gated on `best!==c.dist`, so its draw
count is entangled with the old field (a coherent seed drew *fewer* rolls → a chaotic cascade: first cut, seeding
`c.dist` coherently, cratered **pop −5.9% COLLAPSE** while `developed`/`roads` stayed flat — the 231 tell — so it was
reverted and the look was decoupled from the stream instead).

**Census.** Only draw-time reads changed ⇒ `pop`/`developed`/`roads` **+0, byte-identical**, tile histogram empty.
VERDICT: PASS (vacuous by design — the gate is the probe + eyes).

**Probe** (`probes/probe-districts.mjs`, pure world data, 3 seeds × 2035, build-agnostic via `SRC=`/`distOf` fallback):
- **HEAD: coherence 55–61%, shopfront ECHO (a COM has a same-color COM within r3) 66–76%** — near-random speckle.
- **PATCH: coherence 96–98%, ECHO ~98%** — adjacent shopfronts now share their quarter's color. Control (HEAD via
  `SRC=`) moves exactly the wrong-way expected, confirming the metric.

**Visual** (`shots/after_*`, seeds 42 & 7, downtown clip + whole city, 2035). Both blind subagents **PASS**, and both
— independently, on two seeds — **located distinct same-color quarters** (a teal pocket, a coral cluster, a gold
band, sage near the parks), which is the locate-not-judge check: they saw the geography. No z-order tears, floating
tiles or blown-out color; both whole-city frames read as balanced coherent coastal cities.

**Verdict: DEEPENED** (a FIX). The city's four districts, advertised on every shopfront and in the tooltip since long
before the ledger, finally cohere into readable gold/teal/coral/sage quarters (coherence 55%→98%) instead of a
random 4-color speckle — wholly inert (census byte-identical), the look decoupled from the seeded stream so the vote
CA's `rng()` footprint is preserved. Same shape as 283/285: a label ladder that named a distinction the pixels never
drew.

## Iteration 317 — the beach packed away for winter; the park picnicked through it (2026-07-17) [People & activity × Deepen]

**Vector.** The rotation steers to Civic/People × New CA rule, but the loop's law outranks it: grep the seam, not the
cue list. The census columns are clean (287 fixed the last dead row), the CA passes / tables / flags / hours / seasons
are all heavily audited, and the one banked visual cue (bh, an "over-bright plaza flame-blob") reproduced on seed 7 at
2035 golden/day as a **fine small gold statue, not a blown-out blob** — a non-defect (205's label-tell false-positive;
269: an agent right the thing exists, wrong that it is a fault), so (bh) is **CLOSED**. What the grep *did* turn up is
a 271 category hole: **247 gave the BEACH a season** (`beachPhase()` — the furniture and the water crowd pack away over
winter and fill for the dry peak), and its **park-lawn siblings were never enumerated**. The park café patrons, the
park lawn picnic, and the shorepark picnic blanket gated only on `LITAMT` (day/night) and drew **identically in August
and January** — a picnic on the grass through a cold wet winter, every year, forever. Confirmed on HEAD before
designing (`probe-parkseason`, temporal): picnic + patron counts **flat across all four seasons, DISTINCT = 1 on 6
seeds in 6** — the defect stated (236). This is the seasonal-leisure twin of the excitable-media completion (263 bloom
· 272 shroom · 314 party): a property established for one member of a category, applied to the siblings but one.

**Change (draw-only — no `rng()`, no `Math.random`, no terrain).** The three park draws become readers of the beach's
OWN season predicate `beachPhase()` (one predicate, N readers — 271/285), so the park empties for winter exactly as
the sand does:
- **Park café patrons** — the seated-diner cutoff `hashCell > 0.5` → `hashCell > 0.5*beachPhase()`; the parasol stays
  year-round, its diners thin over winter.
- **Park lawn picnic** — the whole rug (blanket + basket + two seated figures) gated on a stable per-lawn
  `hashCell(x,y,seed^0x50C2) < beachPhase()`.
- **Shorepark picnic blanket** — same gate inside the SAME v-band (not moving the band, so the else-if chain is intact
  and a winter cell draws bare shore-grass rather than handing its range to the next arm — 247's own trap).
`beachPhase()===1` exactly at the dry peak, so all three are **byte-identical to HEAD there** (245's fixed point). The
pitch game (FIELD) is deliberately left alone — a pickup match is played year-round, not a summer-only activity.

**Census.** Draw-only, gated on a global season read, unreachable from `tick()` ⇒ `pop`/`developed`/`roads` **+0,
byte-identical**, tile histogram empty, every metric flat (no RAF wobble this run). VERDICT: PASS (vacuous by design —
the gate is the probe + eyes).

**Probe** (`probes/probe-parkseason.mjs`, temporal/seasonal, 3 seeds × 4 seasons, build-agnostic via `SRC=`; counts
the draws the frame ISSUES by geometric signature — 285). Fixed day hour (0.52, midday game-on), sweep the calendar:
- **HEAD: picnics + patrons FLAT, DISTINCT = 1 on every seed** (seed 7 always 16+9 blankets / 173 patrons; 42 always
  24+12 / 228; 1234 always 31+10 / 172) — the park did not know the season.
- **PATCH: they answer `beachPhase()`** — seed 7 wet-trough `2+0`/9 → dry-peak `16+9`/173, seed 42 `1+1`/31 →
  `24+12`/228, seed 1234 `2+1`/16 → `31+10`/172; spring and autumn sit symmetrically between (bp 0.55).
- **Controls FLAT on both builds** (250): café **parasols** DISTINCT=1 (159/239/188) and pitch **players** DISTINCT=1
  (8/40/24) — the furniture and the year-round sport do not move.
- **FIXED POINT (245):** the patch's dry-peak counts **exactly equal HEAD's** at every season (25/173, 36/228,
  41/172) — byte-identical at `beachPhase()===1`, proven HEAD-vs-patch rather than via an in-page stub (284: a
  `function` stub survives and poisons later seeds — the first cut of the probe walked into exactly that).

**Visual** (`probes/shot-parkseason.mjs`, seeds 42 & 7 — a summer↔winter close-up pair of the same park at midday
(LITAMT 0.00 in both, so only the season differs), plus a whole-city frame; map CROSSED by seed, non-ordinal tokens —
238/268). Both blind subagents **PASS** and — the locate-not-judge check (108) — **both correctly named the summer
frame by the picnic/café life alone, on the crossed map** (seed 7: summer=bravo ✓; seed 42: summer=alpha ✓), each
noting the café parasol/furniture is present in both (the control). No z-order tears, floating tiles or blown-out
colour anywhere; both whole-city frames read as balanced, coherent, beautiful coastal cities.

**Verdict: DEEPENED.** The park's outdoor leisure now keeps the calendar the beach has kept since 247: café terraces
and picnic rugs fill for the golden dry peak and pack away over the wet winter (bare lawns in January, the parasol
standing empty), at zero draw/stream cost and byte-identical at the dry peak. Completes the seasonal-leisure category
(beach 247 → park 317), the twin of the excitable-media completion (bloom 263 · shroom 272 · party 314). Cue (bh)
closed as a non-defect. `beachPhase()` gains three readers.

## Iteration 318 — the washing hung out in the rain, and through midwinter (2026-07-17) [People & activity × Deepen/interconnect]

**Vector.** Rotation steered to Civic/People × New CA rule, but the loop's law outranks it: grep the seam, not the cue
list — and the New-CA idea I brought (washing lines in the older quarters) turned out to **already exist**, unlogged,
in `drawBuilding`'s RES case (iter 34's law: grep before you design). The grep then handed back the real seam. The
washing line's OWN comment claims *"out on dry days, in by dark"*, and it kept the `dark` half (`LITAMT<0.45`) and the
`party` half (`!(c.party>0)`) — but there was **no `dry` gate at all**: it flapped through a downpour and hung out
through a freezing January, on 6 seeds, forever. That is the 199/113 tell (a comment asserting a behaviour the draw
ignores), and it is a **271/286 category hole**: the very comment on `rainingAt` (5051) records that the STREET CROWD
was just taught to read the shower and *"the beach furniture packs away for the winter"* — the washing was that
rain-and-season-aware category's **un-enumerated sibling**, two functions up, quietly deaf to both.

**Change (draw-only — no `rng()`, no `Math.random`, no terrain).** One gate, two clauses added:
`hashCell<0.22` → `hashCell<0.22*beachPhase() && rainingAt(x,y)<0.05`.
- **Rain** — `rainingAt(x,y)<0.05` reads the SAME shower footprint the street crowd, the wet ground, the veil and the
  meadow-bloom CA read (the one-definition law): the washing comes in as a cloud passes over, exactly as the umbrellas
  go up. Closes the *"dry days"* tell.
- **Season** — `0.22*beachPhase()` thins the population toward the wet trough. **Scaled so `beachPhase()===1` at the
  dry peak reproduces HEAD's `0.22` byte-for-byte** (245's fixed point) — only the winter loses lines, and the summer
  city is untouched.
The flap already read `WINDA` (`0.35+0.65*WINDA`), so with rain + season the line now answers the whole weather system.

**Census.** Draw-only, gated on `rainingAt`/`beachPhase` (global reads), unreachable from `tick()` ⇒ `pop`/`developed`/
`roads` **+0, byte-identical**, tile histogram empty. VERDICT: PASS (vacuous by design — the gate is the probe + eyes).

**Probe** (`probes/probe-washline.mjs`, build-agnostic: it counts the gate population from the artifact's OWN
`beachPhase`/`rainingAt`/`hashCell` over the real cells — the gate has no other side effect, so its truth-count IS the
washing drawn — and computes both HEAD's gate `<0.22` and the patch's gate itself, depending on nothing the patch line
touched). 3 seeds, at 2035, daytime (`LITAMT≈0.01`):
- **A — dry-PEAK / clear sky: PATCH == HEAD on every seed** (10/10, 5/5, 5/5). The fixed point holds byte-for-byte (245).
- **B — dry-PEAK / rain over the plate: PATCH ≪ HEAD** (10→2, 5→1, 5→0), `wetHits` 35/27/30 confirming the rig wets the
  homes (a saturation test: a plate-covering forced cloud, `wf≪0`; a centroid cloud missed the RES fringe — by 2035 the
  core is MID/TOWER, so the washing homes survive on the low-rise edge). Washing comes IN.
- **C — wet-trough / clear sky: PATCH ≈ 0.10·HEAD** (10→1, 5→1, 5→0), the `BEACHMIN=0.10` thinning (ratio noisy on
  populations of 5–10, but clearly toward the trough).
- **ELIGIBLE** (west-RES-neighbour, both built, not party) is the shared must-not-move denominator (250), identical for
  both gates so the difference isolates rain+season.

**Visual.** Dry-summer whole-city (seed 42) + residential close-up (seed 7); the change only REMOVES draws under
rain/winter and is byte-identical on a dry-summer day, so regression risk is nil. Both agents PASS; seed 7 sees the
washing (*"tiny strings of colored dots between low-rise houses"*) — the common case is intact.

**Verdict: DEEPENED.** The washing line now keeps the weather and the calendar the rest of the city keeps: it comes in
as the shower arrives (closing its own *"dry days"* comment tell) and thins over the wet winter, at zero draw/stream
cost and byte-identical at the dry peak. Enrolls the washing as the rain-aware category's missed sibling (271/286) —
the domestic twin of the street crowd (rain) and the seasonal-leisure completion (247/317). `rainingAt`/`beachPhase`
each gain a reader.

## Iteration 319 — the ground let off fireworks after the big evening match (2026-07-17) [Civic & culture × Connect]

**Vector.** Rotation's `NEXT` was Civic/People × New CA rule, and People had shipped 3 of the last 5 laps — so
**Civic** was the balance pick (most recency-neglected; last Civic was 307). I grepped the Civic/People draws for a
defect (residentWhere, pitchGame, plaza, QUAD, CIVHRS, the amphitheater/stadium — all healthy and hours-aware) and
found none: the city is exhaustively deepened. What it lacked was a *connection*. The city has fired **fireworks over
the pier every decade festival** since 1980 (a render pass, ~L9363), and it runs a full **evening-match calendar**
(`matchClock`/`fixtureAt`, 240 — floodlights, an arriving crowd, gates) — but its most frequent public spectacle,
the floodlit night match, was never marked in the sky. **Civic × Connect** (the stale cell, 45/204): tie the two
existing systems together. Not every match: a **cup night**, so it stays rare and special.

**Change (draw-only — no `rng()`, no `Math.random`, no terrain).** (1) `matchCelebrate()` beside `matchGate`: for a
cup night — `hashCell(day,2,seedNum^SALT) < CELEBP=0.34`, hashed off the SAME `Math.floor(dayT)` day index the
fixture itself is (240) — returns a 0..1 intensity in the short window (`CELEBWIN=0.06` day-cycles ≈ 6.5s) after the
final whistle, else 0. (2) A render block after the decade fireworks: while `matchCelebrate()>0 && LITAMT>0.6`, a
six-shell finale bursts over each `T.STADIUM` (reusing the decade firework grammar — a climbing ember, then a white
flash core + radiating sparks in the tile's own `col()` palette), fading out on `cel`. The `LITAMT>0.6` gate keeps
it to EVENING fixtures: an afternoon whistle (0.48) falls in daylight and draws nothing, which is correct — you do
not light fireworks at 3pm. The stadium scan runs only while a celebration is live (gated first by the cheap clock),
a few seconds every few evenings.

**Census.** `matchCelebrate` reads `dayT`/`hashCell`/`fixtureAt`; the draw reads `cells`/`time` — no `rng()`, no
`Math.random`, no terrain writes ⇒ core **BYTE-IDENTICAL** (`pop`/`developed`/`roads` **+0**, tile histogram empty,
0 page errors). VERDICT: PASS (vacuous by design — the gate is the probe + eyes).

**Probe** (`probes/probe-matchfire.mjs`, build-agnostic; NO PIXELS in A, floor-0 isolation in B).
- **A (temporal, 134/236):** fixtures on **51%** of days (design MATCHP=0.5); cup nights **31–33% of fixtures**
  (design CELEBP=0.34); the display window is `cel>0` for **5.9% of the day = 6.5s** after the whistle, peak 0.94 —
  >1s, so it **cannot strobe**. HEAD has no `matchCelebrate` → a constant 0, the absence stating itself (236).
- **B (INK, 253 suppress-the-PREDICATE, one page):** floor (same frame twice) **0 px**; the fireworks isolate at
  **267 / 415 / 285 px** at a big evening whistle. Forcing `matchCelebrate=()=>0` **IS HEAD's behaviour**, so that
  suppressed frame is the exact **FIXED POINT** — the patch reduces to HEAD on any non-cup night. Three controls all
  **0 px**: an ordinary fixture night, a no-fixture night, and a **big AFTERNOON night** (whistle in daylight,
  LITAMT 0 — the gate shows nothing).
- **C (viewer's units, 205/236):** nights fireworks actually SEEN in 60 = 8 / 3 / 8 (big-night evening fixtures,
  whistle after dark) — matching A's mark string exactly.

**Visual** (`probes/shot-matchfire.mjs`, seeds 42 & 7 — a blind-ish A/B on the SAME stadium hex: `fireworks` cup
night vs `no-fire` control, plus the mandatory whole-city night frame; every frame self-reports `matchCelebrate` and
LITAMT). Both subagents **PASS**: the burst reads clearly in the zoomed frame (a ring of coloured sparks + white
flash core in the sky above the stadium), is visible-but-tasteful in the whole-city frame, the `no-fire` control is
clean (no sparks anywhere), and no z-order tears / floating tiles / blown-out colour in any frame — all three read as
a balanced, coherent night city. (An early 4-shell version measured 76–181 px and was too faint for a celebration
nobody could see, 259 — bumped to 6 shells + a flash core, re-verified at 267–415 px.)

**Verdict: SHIPPED.** The stadium's evening cup nights end in a fireworks display over the ground — connecting the
match calendar (240) to the decade-festival firework grammar (over the pier since 1980), the first thing to mark the
city's most frequent public spectacle. Rare (≈1 in 3 fixtures, evening only), deterministic off the day index (fixed
per city), an exact fixed point on any ordinary night, zero draw/stream cost off the celebration. Civic × Connect
(45/204 → 319), the stale cell.

## Iteration 320 — five clean lights, two seasons, forty-five laps flat (2026-07-17) [41st step-back / holistic]

**Vector.** The header flagged the step-back due at ~320 (#40 clean at 315, 4 vectors since: 316 districts,
317 park season, 318 washing, 319 fireworks — all draw-only). The step-back is the loop's main guardrail for
long unattended runs, and it outranks one more feature; the vector resumes next (Civic/People × New CA rule).
No `solvista.html` change.

**Step-back #41.** `probes/shot-stepback.mjs`, 2 seeds (42, 7), 5 frames each — day / golden / night + a CROSSED
dusk-summer/dusk-winter discriminating pair (264: one wall-clock instant, sun UP in summer and DOWN in winter,
verified in the self-reports: `dusk-summer sun=UP (sets 0.831)` / `dusk-winter sun=DOWN (sets 0.701)`). ⚠ The
`shots/` scratch held STALE `frame-alpha/beta` PNGs from an OLDER session (mtime 15:18 vs this run's 07:54) that
`shot-stepback.mjs` does not itself write — the first agent round discriminated on those; I wiped `shots/sb*`, re-
shot fresh, and built the crossed blind pair (`pair-alpha/beta`) from THIS run's frames before re-running the gate
(197/239: md5/mtime the instrument before you trust its output).
- **Visual: city is healthy — no cumulative drift, no false FAIL.** One agent per seed, blind, cumulative
  question, on the FRESH frames. Both read all five as a coherent, balanced, beautiful coastal city at every
  light — dense tower core reading as skyline not wallpaper, parks/farms/river breaking up the grey, warm sand
  coast (pier, ferris wheel, offshore wind, boats) legible day and night, no crushed blacks or blown-out coast,
  no z-order tears, floating tiles, or mid-air ornaments, no mojibake in any HUD text. Both correctly named the
  WINTER frame by light alone on the CROSSED map (seed 42 pair-alpha=winter ✓; seed 7 pair-beta=winter ✓ — each
  citing sun-already-set / moon-out / windows-lit vs summer's sun-still-up warm wash) ⇒ the day-length season is
  alive (261/264). No new asides.
- **Golden hue PASS** (`probe-goldenhue`, golden pin DERIVED in-page as argmax GWARM, 265): golden keeps the
  greens' identity — PARK **8°** / FOREST **10°** off their daylight selves, against HEAD's historical **23°/24°**
  rotated onto ROAD/BEACH. BEACH↔ROAD 92→86 at golden (well above the ~15 collapse floor). Monochrome-terracotta
  cue stays **CLOSED** (265 holds). Night hue guard PASS (BEACH 8°, RES 10°, PARK 1°, FOREST 3° off daylight).
- **Night ordering invariant PASS** (p90 envelope, 222/251): `*TOWER 130 *MID 124 *COM 118 | PARK 99 BEACH 98
  ROAD 98` — the dimmest LIT surface clears the brightest UNLIT by **19**. Neighbour separations hold.
- **Perf: no drift, priced in PATH OBJECTS (load-immune — 216/198).** HEAD 320: day 111,283, night 139,620.
  LAP vs #40 (315: day 112,114 / night 139,567): **−0.74% day / +0.04% night** — flat-to-down (316–319 all draw-
  only / byte-flat fixed points). ARC vs iter 275 (~45 laps back: day 111,640 / night 138,815): **−0.32% day /
  +0.58% night** ≈ **+0.013%/lap**, an order under the +0.2%/lap additive tendency, cancelled by the byte-flat
  FIX/credit laps. No compounding.
- **Census gate:** `solvista.html` byte-identical to HEAD (zero edits), VERDICT PASS / 0 page errors.

**Verdict: STEP-BACK — NO DRIFT.** No feature shipped. The city is confirmed coherent across 3 lights × 2 seasons
on 2 seeds; the day-length season reads by light alone on a crossed map; forty-five laps of growth cost ~0.6% of
draw work; golden hue keeps the greens (265 holds); the night lit-city ordering clears by 19. The guardrail is
reset (next step-back ~325); **NEXT vector is Civic or People × New CA rule** (the two stale additive cells).

## Iteration 321 — it snowed on the hills, and the streets went white for a week (2026-07-17) [Sky & atmosphere × New CA rule]

**Vector.** The header's `NEXT` is Civic/People × New CA rule, and grepping the seams turned up nothing (26-for-26
is at *finding*, and the recent laps have closed the last cliffs/tables/flags — corner/loft/solar/groof done,
hstr/bridge/riv/hedge all lifecycle-clean, every CIVICDESC promise has a fulfilling comment). So this lap takes
the counterweight's *one bigger swing* into **the single emptiest cell in the whole grid: Sky × New CA rule —
never done once in 320 iterations.** Sky has clouds, fog, overcast, lightning, day-length seasons — every one a
FIELD or an ENTITY; it has never had a genuine `tick()` CA. **Snow.**

**Change (a reaction-diffusion CA + a contained draw — wholly census-inert).** A new field `c.snow`:
- **The CA** (`tick()`, before `recount()`): `winterMask()` (the 8th reader of `seasonCool()`, nonzero only where
  `seasonCool()>SNOW0=0.85`, i.e. the coldest ~3 weeks) drives a per-tick source; each snow-land hex **relaxes
  toward a per-type target** (`SNOWLERP=0.5`: PARK/hill 1.0, woods 0.9, ROAD 0.5) plus a **diffusion term**
  (`SNOWDIFF=0.10`, drifts to level and thins at every boundary with the sea/void/buildings). Fast enough to settle
  inside the warp's coarse 0.075 yr/tick step; melts clean before the golden peak. `SNOWLAND` = the inland open
  ground only (EMPTY/MEADOW/FOREST/REDWOOD/PARK/ROAD/ROCK/FARM/VINEYARD/ORCHARD/GARDEN/FIELD) — **the coast
  (BEACH/DUNE/SHOREPARK, palms and all) is left bare, sea-warmed**, and buildings shed it. The whole pass
  **self-skips** (`snowGlobal`) for the ~3/4 of the year that is snowless.
- **The draw** (one site, end of `drawCell`): a white `hexTile` overlay laid LAST (over road markings & low
  ornaments, **under** the tree crowns above and every moving thing — z-correct). Alpha ramps over a thin fringe
  then **holds flat above SNOWFULL=0.5** (near-uniform ⇒ *cannot terrace onto the lattice*, 257), through `colA`'s
  illuminant so night snow goes dim/blue, not glowing.
- **Zero rng(), zero hashCell, no terrain** — a pure field of season + neighbours, reset with `genWorld`
  (`snow:0` in cell-init, `snowGlobal=0`). So it perturbs NOTHING the census measures.

**Census.** Core **byte-identical** — pop/roads/developed **+0**. `solarRoofs +2/+3`, `towerHt −1/+0` is the 226
tick-timing wobble (the winter snow pass costs a hair of per-tick compute ⇒ a different tick count lands); **proven
harness, not semantics, by re-running the SAME file** (solarRoofs read +2 then +3, towerHt −1 then +0, core flat
both times). VERDICT PASS / 0 page errors.

**Probe** (`probes/probe-snow.mjs`, pure world data — drives `tick()`, reads `cells[].snow`, no pixels, no noise
floor, BUILD-AGNOSTIC via `SRC=` since HEAD's `c.snow` is undefined→0):
- **WINTER mean 0.66, cover 100%** vs **SUMMER 0.002** (melts before the dry peak) — the seasonal gate is real;
  HEAD's snow is a constant 0 (236's free baseline).
- **PARK 0.96 vs ROAD 0.51** — deeper on the parks/woods than the streets ⇒ a genuine spatial diffusion field,
  **not a flat wash**.
- **LEAK (coast + every building) = 0 on all 6 seeds** — the must-not-move column (250): snow lies only where it
  should. `quilt p95 step 0.42` is entirely at PARK↔ROAD *type* boundaries (a plowed street beside a white park);
  WITHIN a region the diffusion smooths it, and the draw clamps alpha flat above 0.5 so those field steps don't
  even reach the pixels.

**Perf** (222, direct count — the drawbudget A/B was interrupted by a timeout, so the honest number is the direct
one): the pass calls no `rng()`, so the city is provably identical ⇒ the only draw delta is the snow overlay:
**+~1257 path objects (~+1.1% of the day budget) in DEEP-WINTER frames only, exactly 0 every other season**
(summer byte-flat, tick pass self-skips). The step-back pins day/golden at the dry peak (s=0.62) → snowless → the
arc measurement is unaffected; only the dusk-winter discriminating frame carries the cost.

**Visual** (`probes/shot-snow.mjs`, clock frozen in-page + a few `tick()`s AT the pinned year to settle the field —
`?year=` alone drifts, 139/202; winter-day / summer-day control / winter-dusk, 2 seeds). Both blind subagents
**PASS** and both **located** it: white dusting on the inland parks/hills/streets, **coast and rooftops bare**,
the summer control **discriminably snowless** ("easy to tell apart"), **no hex-grid quilt** ("a coherent blanket…
soft even lightening"), night snow correctly **dim/blue not glowing**, no z-order tears / floating snow / blown-out
white, whole frame still a balanced beautiful coastal city.

**Verdict: SHIPPED.** Sky's first CA rule in 321 iterations — a reaction-diffusion snow field that whitens the
inland uplands and streets through the coldest weeks and melts off by summer, leaving the sea-warmed coast bare.
Wholly census-inert; +1.1% draw only in deep winter, zero otherwise. `probes/probe-snow.mjs` + `probes/shot-snow.mjs`.

## Iteration 322 — the whales came in for the winter and left the summer bay empty (2026-07-17) [Water & coast × Deepen/interconnect]

**Vector.** Rotation: the last 8 laps ran Sky×2, People×3, Transport, Urban, Civic — **Water & coast and Nature had
not had a lap in 8+**, and the last KIND was New CA rule (321), so vary it away from that. I grepped the Nature/Water
seams for a defect and found them exhaustively alive (lighthouse beam sweeps, MARSH answers tide+season (289),
orchard/vineyard carry full blossom/fruit/veraison, KELP now a CA (282)) — but the **gray whales are a MIGRANT drawn
as a resident**. Two are Math.random-spawned in `genWorld` and `drawWhale` had **no season gate at all**, so they
cruised the bay all year while the tooltip called them "Gray whale — a slow cruise up the bay." A gray whale runs the
California coast south through winter and north through spring, then feeds far to the north from June and is gone.
**Water × Deepen/interconnect** — make the whales answer the calendar the rest of the city already keeps (the
286/271/249 "entity answers an existing signal" pattern), while the resident dolphins rightly stay year-round.

**Change (draw-only — no `rng()`, no `Math.random`, no terrain).** New `whaleSeason()` (near `autumnFall`): a raised-
trapezoid window on `s=year%1`, `1` across Dec–mid-May (centred on mid-winter `WHALEPK=0.16`, `WHALEWIN=0.28`,
`WHALERAMP=0.08`) ramping to `0` through the golden summer and autumn. `drawWhale`'s first line now
`if(whaleSeason()<=w.ph/7)return;` — a **per-whale threshold off the phase the whale ALREADY carries** (`w.ph/7`, a
uniform on [0,1)), so the last of them fade out one at a time at the season's edge rather than popping together, and
it draws **zero new random values** (286). A hidden whale returns before `stamp()`, so it is **not hoverable** either
(consistent with the surfer/kayak session). Tooltip updated to name the migration (ENTINFO sync).

**Census.** No `rng()`, no `Math.random` change, no terrain, whales array length unchanged (still 2) ⇒ core
**BYTE-IDENTICAL** (`pop`/`developed`/`roads` +0, tile histogram empty), `life.whales` still 18 across the matrix.
VERDICT PASS / 0 page errors (vacuous by design — the gate is the probe + eyes).

**Probe** (`probes/probe-whalemigration.mjs`, build-agnostic via `SRC=`, flooded whales:40/dolphins:40):
- **A (temporal, no pixels):** eligible whales by season via the SHIPPED predicate — **winter/spring 40 → l.spring
  13–25 → summer/autumn 0 → e.winter 25–32**, `DISTINCT=4`. **HEAD reads 40 every season, `DISTINCT=1`** — the
  defect stated (236). **DOLPHINS flat 40 in every season (must-not-move control, 250) — held.**
- **B (real draw path, 205):** whales STAMPED across 24 surface-arc phases, per season — matches A
  (winter/spring 40, summer/autumn **0**), dolphins **40 every season** through the same path.

**Visual** (`probes/shot-whalemigration.mjs`, frozen in-page, whales flooded, aimed by measured whale ink; winter=
present / summer=absent at the IDENTICAL crop + a whole-city frame; frames named by FILE, token map CROSSED between
seeds per 238/258/268; each self-reports year/whaleSeason/whales-drawn). Both blind subagents **PASS** and both
**named the winter frame by the whales alone on the crossed map**: whales visible (dark backs + foam wakes + spouts)
in winter, the SAME open water **empty** in summer, only the whales differing; seed 42's agent correctly rejected a
fixed shoreline mark as a non-whale; both whole-city frames balanced and coherent, no z-order tears / floating tiles
/ blown-out colour.

**Verdict: SHIPPED.** The gray whales now migrate — present in the bay through the cool half of the year, gone to the
northern feeding grounds through the golden summer and autumn, so the offing tells the season while the resident
dolphins roll through year-round. Wholly census-inert (zero new random draws, whales array untouched), the 286
pattern in the neglected Water domain. Water × Deepen/interconnect (→ 322). `probes/probe-whalemigration.mjs` +
`probes/shot-whalemigration.mjs`.
