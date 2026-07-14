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
| **Nature** | 4, 26, 29, 102, **156**, **174** | 1, 13, 60, **206** | 37, 46, 67, 76, **108**, **120**, **139**, **166**, ~~**233**~~, **238**, ~~**246**~~ | ~~46~~, ~~88~~, ~~101~~ | U4 | 53, 96, **194**, ~~**198**~~, **215**, **221**, ~~**251**~~ | **117**, **129**, **148**, **183** |
| **Water & coast** | 6, 10, 12, 16, 20, 33, 106, **169** | 90 | 17, 25, 51, 65, 72, **113**, **123**, **159**, **196**, **245**, **257** | 22, ~~**205**~~ | | U2, 44, 58, 79, **116**, **132**, **150**, **185**, **214**, **223**, **234**, ~~**255**~~ | **97**, **141**, **176** |
| **Urban fabric** | 32, 62 | 7, 23, ~~82~~, **151** | 38, 54, 68, 92, **165**, **173**, **189**, **199**, **209**, ~~**218**~~, **219**, ~~**254**~~ | 47, **109**, ~~**160**~~ | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103**, **110**, **118**, **124**, **143**, **180**, **216**, **220**, **224**, **228**, **235**, **239** | **133** |
| **Transport** | 2, 9, 21, 31, 48, **164** | 77 | 28, 39, 55, 63, **112**, **121**, **128**, **155**, **179**, **193**, **230**, **249**, **258** | 5, 15, **138**, **211** | U4 | U1, U3, 70, 85, 87, 94, **146**, **188**, ~~**203**~~, **241**, **243** | **105**, **171** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107** | 36, 59, 66, 80, 91, **149**, **158**, **175**, ~~**195**~~, **213**, **244**, **250**, **259** | 45, **204** | | 73, ~~**114**~~, **168**, **231** | 52, 122, **140**, **184** |
| **Sky & atmosphere** | 27, 43 | | 19, 35, 50, 57, 95, **135**, **153**, **161**, **181**, **190**, **208**, **225**, **236**, **253**, **261** | | | 61, 81, 89, **115**, **200**, **242**, **248** | ~~**134**~~, **144** |
| **People & activity** | 41, 56, **127**, **170**, **186** | 49 | 34, 64, 93, **104**, **119**, **145**, **178**, **201**, **210**, **240** | 78, **111** | | 84, **137**, **163**, **226** | 71, **154**, **191** |

- **Interaction/UX — the FEATURE INVENTORY was rotated to the archive at 211 (history, not steering).** ⚠ **229 is
  cross-cutting (the TEXT LAYER: `<meta charset>`), and it REPEALED 134's rule** — raw UTF-8 in JS string literals is
  now SAFE (`probes/probe-charset.mjs` asserts it), so **do not hand-escape a `·` or an `é`.** What steers: when adding
  an entity array, `stamp()` it in its draw + add an `ENTINFO` row (same discipline as the census hook); `stamp()` also
  draws the focus ring, so any stamped entity is ringable free. **An `ENTINFO` `sub` may be a FUNCTION of the entity
  (105)** — use it when a thing's interest is its *membership* (which line/route/depot), computed live, never a string.
- **ROTATION.** Last vector per domain: People **247** · Nature **251** · Urban **254** ·
  Water **257** · Transport **258** · Civic **259** · Sky **261**. ➡ **NEXT: People (247) is the most overdue**, then
  Nature (251). ✅ **260 WAS THE 32nd STEP-BACK — NO NEW COMPOUNDING DRIFT.** Both
  agents FAILed both seeds; **all three FAILs were GRADED, not obeyed, and two were REFUTED by measurement** — see
  **(ac)** (the skyline is intact; the FAIL is 224's projection law) and **(s)** (the golden residue is mild and its
  loudest claim is false). The third is the finding: **(aq′)**. ➡ **NEXT STEP-BACK ~264.**
  🔑 **THE ONE REMAINING BANKED DEFECT IS `polish-tile` (a)**, the elevated transit — **12x reported (260 makes it
  #11/#12), the ledger's most-reported defect by a wide margin, and a `polish-tile` lap is BADLY OVERDUE.** ⚠ **259
  ADDED A SECOND `polish-tile` CUE (e) — see the backlog.**
  ⛔ **255: DO NOT PAINT A *PER-HEX* SIGNAL INTO THE WATER'S BODY COLOUR.** A field **sampled per hex and rendered as a
  flat hexagonal FILL terraces onto the LATTICE**: the wash may be SUBTLE (**d=0.57** ⇒ both blind agents saw
  **nothing**) or BRIGHT (**d=1.15** ⇒ *"a high-contrast hex QUILT... not a sea"*), **and there is no middle**. The
  glitter escapes ONLY by being a **low-alpha overlay** (max 0.16).
  ⚠ **257 NARROWED THIS, AND THE NARROWING IS ITSELF A LAW (SKILL.md): 255's ⛔ was written as "no signal in the sea's
  fill" and would have KILLED the fix. Its MECHANISM is per-hex sampling** — so a term with **no `x`/`y`** moves every
  hex identically, **adds no spatial step, and cannot terrace.** 257's uniform sky-mirror *halved* the existing one.
  ⇒ **When a banked ⛔ forbids your vector, re-read the MECHANISM it came from, not the sentence it was written as.**
  ✅ **(ap) IS CONFIRMED AND ITS HOST IS STILL LIVE** — HEAD's *entire* calm→gale response is **971–1,055 px of a
  ~165,000 px ocean (0.6%)**, against a **LAND** control of 4,507–5,231: *the wind moves the land 6x harder than the sea.*
  ➡ **The way through is a SHAPE, not a colour: SUB-HEX, wind-aligned streaks that CROSS tile boundaries, ADDING foam
  rather than subtracting saturation** (254's *"a SHAPE, an ORNAMENT, a COUNT — never a hue"*, arriving at the sea).
  ⚠ **AND CHECK THE HOST'S GRAIN FIRST**: `seaT[]` is depth-in-eighths **+ two `hashCell` octaves** ⇒ within-sea
  luminance **SD 22.3**, which a blind agent on *pristine HEAD* called a honeycomb over *"90–100% of the open water."*
  ⚠ **NOT Urban.** 225's grep-the-seam law went
  **6 for 6** at 254 (the seam was rich — `c.age`, 36 writers, published as `Built ~1998`, read by NO pixel) and the
  lap **still REVERTED**, on a ceiling that is *structural*: see the ⛔ below. Known-closed in Urban: the building
  look (228/235/239), the ground plane (209), the facades (216), **now the COLOUR CHANNEL (254)**; the **harbour
  apron** is the one named remnant, and cue **(o)** says a port vector must **build the waterfront FIRST**.
  ⚠ **Read the `peds` cap first** (111) before designing anything road-borne.
  ⛔ **254: THE BUILDING COLOUR CHANNEL IS SPENT — DO NOT RE-TRY *ANY* "THE BUILDINGS SHOULD SHOW X REGIONALLY" IN
  COLOUR** (age, value, density, flow — anything). The `cream`/`terra`/`sandDk` grain scatters per-building warmth at
  **SD ~45**, *larger than any gap the lever can reach* ⇒ **d = 0.87/0.40/0.73**, **plateauing at 0.65** under tuning;
  two blind agents: **`NO REGIONAL PATTERN`**, on a change that passed every gate. **99/103/239 bought that grain ON
  PURPOSE to kill wallpaper — variance and regional legibility are in DIRECT CONFLICT, and the loop chose variance.**
  ✅ **THE HOST IS STILL LIVE AND UNREAD** — `c.age` is coherent (0.40) and monotone core→rim, *the old town IS
  downtown* — **but only a SHAPE, an ORNAMENT, a COUNT can show it. Never a hue.** (`probes/probe-buildingage.mjs`.)
  ✅ **(aq′) CLOSED AT 261 — THE SEASON NOW HAS A DAY LENGTH, AND IT IS THE FIRST THING ANYONE SEES.** 260 proved the
  season real (warm-cool d 0.52, *louder* than golden hour's 0.43) and invisible (luminance d **0.09** vs 0.69): a global
  chroma cast is what colour constancy divides out. 261 gave it the non-chromatic channel — **WHEN THE SUN IS UP**.
  `sunWarp` is ONE sine on the light curve's **TIME axis** (fixed at solar noon + solar midnight); **the ALTITUDE is
  never touched**, so ⛔ 200's arc still holds *structurally*: `sunP` is a pure function of `SUNT` and `SUNT` has dayT's
  range, so **the disc cannot reach a screen position HEAD did not already reach**, and it hits its identical peak at
  solar noon in every season. Measured (`probes/probe-daylen.mjs`): sunset **0.780 CONSTANT → 0.701 winter / 0.831 dry
  peak**; season's luminance **d 0.09 → 1.59 at the evening**, i.e. **2.3x the golden-hour bar**, while **NOON is the
  must-not-move control and does not move (d 0.09)**. Three blind agents, two seeds, crossed map: all ranked the frames
  correctly and named the two HEAD frames as the indistinguishable pair. ⚠ **RETIRE `probe-seasonarea` as a seasonal
  score.** ⚠ `probe-seaamp` is LUMINANCE-only and was blind to 253 (228's 6th recursion) — but it is the RIGHT
  instrument for 261, which *is* a luminance feature. **Read what a probe measures (235).**
  🔴 **HOW TO READ THIS CUE LIST (251/255; narrative rotated at 256).** A bad probe does not merely misgrade a lap — it
  **MANUFACTURES A CUE** that steers the loop for tens of iterations and gets "reconfirmed" by the same broken
  instrument ((ag) was #1 for **24 iterations**, reconfirmed twice, **false on every count**). 🔑 **A CUE RE-CONFIRMED
  IS NOT CORROBORATED UNLESS A *DIFFERENT* INSTRUMENT DID IT.** ✅ 252/256 are the template: agents + a probe + a grep —
  **three instruments, one answer.** 🔴 **228's law has now recursed SIX times, EVERY TIME on a probe this harness
  already owned** (237×2 · 238 · 251 · 255 · **260**, where `probe-seaamp`'s LUMINANCE nearly graded a feature that is
  normalised to hold luminance FLAT) ⇒ *read what a probe MEASURES and WHERE IT SAMPLES, not what it is CALLED; apply
  228's test **PER METRIC**; and check your probe is not built on the one axis your design deliberately did not move.*
  ⛔ **259: `c.lit` CANNOT EXPRESS DARKNESS — `lit = LITAMT*(0.35 + 0.65*c.lit)` HAS A 0.35 FLOOR.** So `c.lit=0` is
  not *dark*, it is **35% lit**: the rendered range is **2.9:1** and is swamped by everything in the hex that never
  reads `c.lit`. Siting the observatory at `c.lit` **0.000** moved the ambient luminance around it by **−1.9%** —
  **invisible**, and a blind agent said so and was right. ⇒ **Do NOT build "X answers the night glow" in COLOUR.**
  The field is fine as a *chooser* (it is real, monotone and rot-proof); it is dead as a *look*. **LAW in SKILL.md.**
  ⚠ **ARTIFACT FACTS from 236–261 that are NOT laws and CANNOT be re-derived from SKILL.md** (the law-recaps these
  lines used to carry are in `GROWTH-archive.md`, "rotated out at 256"):
  **261:** **`SUNT` IS THE LIGHT CURVE'S CLOCK — NOT `dayT`. ONE predicate (`sunWarp`), FOUR readers**: `daylight()`
  (sky/tint/`LITAMT`), the shadow vector (`SHOFF`/`SHLEN`/`SHAMT`), the sun disc (`sunP`) and `nightDeep()`. **Anything
  new that asks "where in the day are we" must read `SUNT`, never `dayT`** — `dayT` is now only the raw *counter* (the
  moon, `matchClock`, the hall clock still read it, and MUST: they want days, not hours). `SUNT` is set once a frame in
  `render()` because `windarkAt()` reads it ~2.7k times a night frame. ⚠ **`syncSky` warps its OWN clock on purpose** —
  reading `render()`'s `SUNT` made the CSS backdrop depend on render having already run, and 261's own camera duly
  painted a night sky behind a daylit noon city. ⚠ **THE GOLDEN HOUR IS NOW SEASONAL TOO** — at the dry peak the sun
  sets at 0.831, so the old **`t=0.68` golden pin lands in mid-afternoon in summer**; `shot-stepback`'s pins are still
  right at the *default* year but a golden frame at `year=2035.62` is no longer golden. **259:** `siteDark` — the dome is chosen by
  `c.lit + DARKGL*groundLoad + DARKJIT*hash`, a PREFERENCE, deterministic, **no `rng()` draw** (the caller's 90-try
  scatter still runs and still spends its draws — **do not "tidy" it away**, that is a −22% pop / −47% tower stream
  shift). ⚠ **`seedNum^0x0B5E` IS THE DOME'S SLIT AZIMUTH (158) — an ARGMIN sharing a salt is a SELECTION on it, and
  would pin `sd` to −1 in every city. A tie-break must never share a salt with anything that reads the cell it picks.**
  ⚠ **`__warp(a)` then `__warp(b)` IS NOT `__warp(a+b)`** — it ticks `while(year<target)`, so two hops build a
  DIFFERENT city than one. A *prefix* warp is on the trajectory; a two-hop warp is not. **258:** `cabFree`/`CABFARE` — ONE predicate,
  **three** readers (the step, the roof lamp, the tooltip); **`dwell` IS the ride**, so a cab cannot be hired twice.
  ⚠ **THE ROOF LAMP IS NOW A FOR-HIRE SIGN — do not re-key it to darkness.** ⚠ **`livelyKerb` SELECTS FOR ITS OWN
  BURIAL** (≥2 ATTRACT nbrs ⇒ tall frontage in the row in front) — **aim any camera at it by argmax-over-TIME, never
  at the first instance** (SKILL.md). **257:** ⚠ **`GWST` (the OVERHEAD sky) and
  `GWSB` (the HORIZON) ARE NOT INTERCHANGEABLE** — the sea's BODY mirrors `GWST`; `GWSB` is the colour of the sun
  PATH drawn across it, and blending the two lands in the **mud** (chroma 19). `SEAMIRROR` is the strength.
  **250:** `concertSeason()` — ONE predicate,
  four readers. **249:** `ferryApp`/`ferryFr`/`ferryThr` — ONE predicate, four readers; ⚠ **`f.sp` KEEPS ITS SIGN**
  (the THROTTLE goes to zero, never the velocity). ⚠ **NOT cue (o): the PIER has a waterfront, the HARBOUR does not.**
  **245:** `seaState()`, floor `SEACALM`. **242:** ⚠ **MARSH/KELP no longer catch cloud shade** (`WETSET`).
  **241:** `RAILCAP=130`. **236:** ⚠ **`cl.rain` IS GONE** — ONE predicate **`cloudWet(cl)`**.
  ⚠ **244: TURNING THE AMPHITHEATER'S BOWL WAS BUILT AND REVERTED — DO NOT RE-TRY** (the projection cannot carry it).
  ⛔ **(ai) RETIRED (246) — UNREACHABLE, DO NOT RE-OPEN. LAW in SKILL.md** (*a budget with slack is not absorption
  capacity — the slack IS the exhaustion; count the eligible cells*). ⚠ **DO NOT re-try a belt, a mask, or a
  core-widening**: no paired addition exists (2→3 ADMITS 25, **2→4 admits the SAME 25**) and **the ROADS fragment every
  lobe**. ➡ **The COMPLAINT is still real** (232) — **re-derive it from its own nouns (228/235); stop spending laps on
  the density statistic.**
  ✅ **CLOSED LADDERS — DO NOT RE-OPEN. Bodies archived; every law is in SKILL.md.** The **WASH ladder**
  (214→220→221→223→**234**; **audit by `dHUE`, never a target hue**) · the **TOWER LOOK** (228 crown + **235**
  footprint) · the **SKYLINE ladder** (217→224, `c.th` SPENT) · the **HUD lap** (229 — both cues were the HARNESS) ·
  **137's standing-crowd cue** (226) · the **SEASONAL-VEGETATION seam** (238 + **252** — measured-capped). ⚠ **230's
  `taxi` flag is LOAD-BEARING** (`VCURF` thins the night fleet by CLASS). ⚠ **(y) was born from an agent reading
  `shoot.mjs` output — REPRODUCE it in the user's configuration before designing to it** (229's law; **(s) no longer
  needs this — 256 re-confirmed it on FROZEN in-page frames**). **Interaction/UX** (cross-cutting) last touched **229**.
  **CUES, RANKED** (CLOSED: (w)/(z) 229 · (t) 231 · (u) 234 · (af′) 235 · (al) 239 · (am) 241 · (an) 243 · **(ah) 244**;
  **(aj)'s SHADE half CLOSED 242 — its cloud-SITING half is still open**; **(ao)'s SHAFT half CLOSED 248 — its BOW half
  is REFRAMED and its prescription REFUTED**; **(ab) RETIRED into (ak) 238**; ⛔ **(ai) RETIRED 246 — UNREACHABLE, do not
  re-open** · ⛔ **(ag) CLOSED 251 — REFUTED on every count, do not re-open** · ✅ **(aq) CLOSED 253**):
  **(aj)** the clouds spawn with no reference to the land, so a seed parks its sky over the sea — **the lever is the SPAWN, not the draw**: ~2x the visible weather at **zero new draw work** (Sky × Polish, doubly measured) ·
  ⛔ **(ak) MEASURED-CAPPED and its prescription DEAD** (238 + 252) — **(aq) supersedes it; do not re-open the canopy** ·
  **(s)** golden-hour land residue — **mild, re-measured at 260; see (s) below before spending a lap on it** ·
  **(y)** the scorched inland cluster (Nature × Polish) · Nature's **GARDEN staggered beds**, held by (p) ·
  **(ap)** the sea's foam is invisible at fit zoom (Water × Polish).
  **225: THE SHADOWS READ THE SUN.** `shadS` (every shadow routes through it) carries a per-frame sun vector
  (**`SHOFF`** throw · **`SHLEN`** stretch · **`SHAMT`** opacity). ⚠ **Noon (t=0.415) is BYTE-IDENTICAL ⇒ a free
  dead-regime control for every shadow lap.** ⚠ **`SHAMT` must never reach 0 at night** — the residual patch is what
  keeps every ped, tree and car from FLOATING. ⚠ **226: `census.mjs` DOES NOT FREEZE THE CLOCK** ⇒ tick-sensitive
  metrics (`solarRoofs`) **wobble ±2**; core metrics unaffected. **To test whether an unintended metric move is YOURS,
  re-run the SAME FILE, not HEAD.**
  ⚠ **231: THREE PREDICATES, DON'T MIX THEM (body archived at 242).** `openFront`/`frontLoad` count **TALLT
  MEMBERSHIP** — wrong for anything drawn flat. **`groundLoad(x,y)` is the ground-level one**: sums drawn **HEIGHT**,
  reads **`c.th` never `c.h`**, and counts a `RAISEABLE` lot at `FUTUREH` — **an empty lot is not a clear view, it is
  a building that has not been built yet.** ⚠ **Aim a CAMERA by measured ink, never by any of the three (226).**
  ⚠ **Settled audits, bodies archived at 242 — the live warnings only.** **213:** `nightDeep()` is **pinned at 1 all
  day** (a trap for any NON-draw reader); the civic night-light audit is **DONE** — three lights are off the curve on
  purpose (school janitor, hall clock face, parliament lantern), **do not "fix" them**. **211/210:** both `frontLoad`
  and `openFront` ship as **PREFERENCES, NEVER GATES (206)**, and `LITAMT` returns to **0.64** by the small hours, so
  any gate `LITAMT > 0.64` defines a "night" that **ENDS BEFORE DAWN**. **137's "the ped/dog system is
  NON-REPRODUCIBLE" is DISPROVEN** ⇒ **People is probe-able like any domain**. **209:** the **GROUND PLANE is SPENT**
  (216 spent the FACADES); its law — *when a domain looks interconnect-saturated, ask what LARGE SURFACES wear a field
  that cannot carry the signal* — is in SKILL.md, **and (aq) is its next payout: the LIGHT is such a surface.**
  **206:** the vacant lot is a **MIRAGE** (`EMPTY` with ≥2 RES nbrs falls **85 → 6.5** by 2035); development eats every
  gap. **⚠ THE FIRE CA IS A GHOST — do not build "X answers the fire"** (`probe-firehost`): ignition is year-gated ⇒
  **at 2035 nothing can ignite at all**, and fire **never spreads**. **`T.MARKET` again.**
  **⚠ THE `polish-tile` BACKLOG — measured cues that are NOT growth laps. Do not spend a domain's lap on one; they
  need a tile redesign, and each has a gate written.** (a) **THE WHOLE ELEVATED TRANSIT is sub-pixel at fit zoom**
  (0.5px rope, 5px cabins, hairline masts). ⚠ **NEVER RE-OPEN THE Z-ORDER — CLEARED BY PROBE TWICE** (203/212); agents
  have mis-diagnosed it **TWELVE times** (217, 232, 237×2, 242, 252×2, 256×2, **260×2** — *"overhead wires crisscrossing
  the plate like scratches"*). **That persistence IS the evidence: the fault is LEGIBILITY** — **a hairline ornament
  needs a BODY** (215), not more strokes. *Do NOT re-try a body/halo under the rope (measured — backfires) nor a lit top
  edge (impossible at 0.5px).* ✅ **256 NAMED THE SUSPECT WITH A NUMBER AND REFUTED EVERY AGENT CAUSE** (kites, power
  lines: `drawKite` appears NOWHERE in the census and there are no power lines — **a confabulated cause on a correct
  perception, 212 in its purest form**). `probe-darkline` (`MINLEN=4`, so it sees CHAINS): the ink is **`drawMonoAt`** —
  seed 7 night **2,747px, n=350, bbox x 0.11–0.64 y 0.14–0.78**, matching that agent's own reported box almost exactly.
  🔑 `probe-drawbudget` prices it at **2.1% of the frame**: ***the loudest complaint in the artifact is also one of the
  cheapest things in it.*** **MOST-REPORTED DEFECT BY A WIDE MARGIN; a `polish-tile` lap is BADLY OVERDUE.** (b) **`university` is the ONLY of the
  twelve civics with no `LITAMT`** — pitch dark after sunset; every place to put the light failed (195). (c) **A parked
  service vehicle needs its CIVIC TILE to have a visible apron on its front edge** (204). (d) **The marsh reeds do not
  read** — seven sub-pixel strokes round the pool; its calendar is computed and invisible (cue (i), 113).
  (e) **THE OBSERVATORY IS TOO SMALL TO READ AS A LANDMARK (259, NEW).** Now that 259 has unburied it (occlusion
  **54.5% → 5.9%**, 0/6 buried), the residue is the DRAW: **both** blind agents, on both seeds, called it a small teal
  cap — one said *"you would never spot it unless told"* on a frame where it is measurably **96.3% visible**. ⚠ **That
  is `SMALL`, not `BURIED` — do not re-open the siting** (it is measured, and one agent conflated the two). The dome is
  `R2=8.4` world units ≈ **5.5 CSS px at fit**. It is a one-per-city landmark that the city can now show you and that
  is still not worth looking at. **The lever is the dome's SIZE/CONTRAST, not its place.**
  **Sky is post-saturation (Deepen/Fix ONLY — its additive/CA cells are traps).** **Urban: additive spent (118), Connect measured-hard TWICE** — 160 (RES terracing: no seed forms E-W RES runs of >=3) and 165 (the `hstr` parade zigzags with row parity, longest straight-hex-axis run = 2 — not a clean arcade host); **Urban's next lap is Deepen/Polish only**. **Roof-furniture is CLOSED city-wide** (MID/RES tanks, TOWER gardens, COM plant 165, IND clerestory 173); the **GROUND PLANE is SPENT (209)** and **216 spent the FACADES** — only the **harbour apron** is left. ⚠ **"Urban is spent" was REFUTED from the SILHOUETTE side (232 → (af′), 237 → (al)) and that seam is now CLOSED TOO** (235 tower + **239** mid-rise). **The building look is DONE; Urban's next lap is neither massing nor facade.** (**Sky's moon is FIXED (135) and NAMED (144)**, both closed.
  **STILL banked for Sky: the SEASON word** — it reads the fast `year` and would strobe ~0.7 Hz (134), so it needs a
  **slow clock FIRST**; don't add `seasonWord(year)` to the HUD nor re-ship 134's REVERTED almanac. ⚠ **236's front is
  ALSO on `year` and is NOT that slow clock.**) **Water's banked cue (123): the pier/lifeguard are still `rng()`-salted
  — site them on a depth by respending their draws, but that REPEATS 123's mechanism, so vary it.**
  **The asserts-less-than-the-code-knows tell is SPENT for agriculture** (orchard 129 + vineyard 139/148 + FARM 183;
  **238 spent the CANOPY**). **GARDEN is the last mute one** — cue **(p)** OWNS it. ⇒ **"Additive inventory spent" is a
  claim about a domain's ENTITIES, not its SURFACES** (127 put picnics on PARK's 878 hexes), **and a Deepen that adds no
  element is the documented way past additive saturation** (126). ⚠ **THE SEASONAL-VEGETATION SEAM IS MEASURED-CLOSED
  (238 + 252)** — PARK is at its ceiling, FOREST is 83% conifer, and the 66.4% mute area is **largely CORRECT.**
  ⇒ **Do not open a canopy/vegetation seasonal vector; (aq) — THE LIGHT — supersedes it.**
  **124 closed the LAST banked cue that moved a census number; the census is VACUOUS for most vectors — reach for a
  probe.** Three laws govern step 1: **a cue is a POINTER, NOT A SPEC** (re-grep the seam before designing to it); **a
  banked, measured finding outranks kind-rotation and cell-emptiness** (119); **saturation beats kind-rotation** — when
  a domain's additive cell is spent, the KIND changes, not the domain (118).
  **Sky's additive/CA cells are TRAPS** (sky is not cellular; fog on terrain is already `rSea`/`fogAt`). **Cue (k)
  CLOSED (116/123)**; still steers: **run the tell FORWARDS** (string and rule share ONE constant — 123; 213's
  `civOpen()`). **⚠ A tick-rule cannot read the reach maps (151):** `recount()` never runs in the sim loop, so
  `rGreen`/`rShop`/`rServ` are STALE inside `tick()` — recompute locally.
  **THE FAIL/ASIDE LAW (212; a law in SKILL.md — the header keeps only the tally): in a whole-frame read the FAILs
  are where an agent is WRONG and the ASIDES are where it is RIGHT.** Paid out 213, 214×2, 215, 217, 219, 232, 236,
  **242**, **245** (⇒ cue **(ap)**; its FAIL was real but was **MY CAMERA**, not the city).
  ⚠ **237/252 INVERTED IT and 255 CONFIRMED THE INVERSION — the headline FAIL was RIGHT, both times.** At 252 the FAIL
  was right but its implied cause was dead; at **255 two blind agents FAILed a feature that had passed EVERY numeric
  gate, and a magnitude probe proved them right.** ⇒ **Grade a FAIL by MEASURING it — but when agents say "I cannot see
  it", the burden is on your PROBE, not on their eyes** (they are the only instrument that measures *salience*). Still
  weight an aside two agents reach independently above any verdict. ⚠ **241: an agent attributed a QUANTITY difference to a STYLE one** — it
  called a build's beams *"darker and thicker"* (it has **18% more track**). ⇒ **More of a thing reads as a heavier
  draw; check your diff first.** ⚠ **243: a cue can bundle a REAL defect with a MISREAD — see (an).**
  Perf ARC (refs 202/207/212/217/222/227/237/242/247/252/256/**260**, directly comparable; priors archived at 233/236).
  ✅ **AT 260 THE ARC IS STILL STOPPED — FLAT ACROSS FIVE STEP-BACKS. THE OLD `+0.2%/iteration` IS NOT BEING PAID; DO
  NOT QUOTE IT.** ARC vs `7e2ac2c` (177): day **242 +18.6 → 247 +19.0 → 252 +18.2 → 256 +18.1 → 260 +18.8** · night
  **+12.8 → +12.7 → +12.4 → +13.2 → +13.0**. **EIGHTEEN iterations since 242 for NO measurable arc growth.** **LAP
  (260 vs 256 = iters 257+258+259): day +1.3% / night −0.3% — free**, and `probe-drawbudget` gives the MECHANISM
  (216: never `perfab` alone): path objects **110,783 → 111,018 day (+0.21%)**, **139,579 → 139,890 night (+0.22%)**;
  night profile unchanged (`winBandR` 32.1% · `prismS` 29.1% · `hexTile` 12.0% · `bandS` 7.5%; `drawCell` 94%).
  🔑 **THIS IS STRUCTURAL, NOT LUCK: a domain past ADDITIVE saturation STOPS COSTING
  FRAME TIME.** The late-game kinds (Deepen · Polish · predicate fixes · probe repairs · honest reverts) are
  *categorically* cheaper than the additive laps that built the arc. ⇒ **ACCEPTED WITH EVIDENCE, not resignation —
  do NOT open a perf lap, and do not let a "the arc is creeping" premise into a future vector.**
  🔑 **THE LAP TIMER OVER-READS; GRADE A LAP WITH `probe-drawbudget` BESIDE `perfab`, NEVER `perfab` ALONE** (216's law;
  bodies archived at 251). **Twice the LAP timer reported a stable +2–3% over a lap that MEASURABLY REMOVED draw work**
  — a cost with **no mechanism**. ⚠ **A WORLD-CHANGING VECTOR IS NOT FREE just because its diff has no draw call — THE
  WORLD IS THE DRAW LIST** (222; LAW in SKILL.md). ✅ **And it runs in REVERSE: a vector that REMOVES things gives draw
  work BACK** (241, −3.2% day). **Count objects when a lap SUBTRACTS too.** ⚠ **Cue (x) stands** (215's `seamVeg`: 692
  path objects / 228 STROKES cost ~4x the fill model — a stroke-vs-fill sweep at equal path count is the best-supported
  open perf question). **⚠ THE STANDING PERF SUSPECT (207, UNCHANGED at 232/237/252/**260**; NAMED not mandated per
  198): THERE IS NO HOT ORNAMENT — the arc is DIFFUSE**, which is why every per-lap gate reads it free. **No caching
  lap — 198's levers are CLOSED; the only lever is FEWER objects.**
  **The GAP-CLOSING trick (111/112/113) is SPENT in four domains; the TELL that replaced it (a label asserting what
  the draw ignores) is CASHED 9x** (117, 122, 129, 140, 148, 183, 238, **252**) **and its host keeps moving DOWN: 199 a
  CONSTANT, 209 a COMMENT, 217 a HALF-FINISHED FIX, 238 a palette entry NO DRAW COULD REACH, and 252 TWO CONSTANTS
  (`SUNUP`/`SUNDN`) NAMING AN EVENT THAT NEVER MOVES — see SKILL.md.** Still MUTE: `[T.IND]` (no calendar) and GARDEN.
  ⚠ 122: a tooltip vector needs a probe checking the claim against INDEPENDENTLY RECOMPUTED truth, not a screenshot.
  **Kind-picking, compressed (full text in `GROWTH-archive.md`, 204).** **Scale** is the coldest kind — a structural
  lever, not a lap move. **New element** (last 127): a saturated domain cannot take one, but saturation is of a domain's
  ENTITIES, so one can still land on a large untouched **surface**. **Connect** (109/111/112/204): its trick is that it
  adds NO NEW OBJECT — it closes a gap between two that exist. **107 was a New CA rule that ADDED NOTHING** — *auditing
  an existing rule for reachability* is available in every domain at zero content cost (`probe-firehost` found a ghost).
  ⚠ **Nature × Connect is the row's GRAVEYARD — REVERTED three times** (46 · 88 · 101). **Do not re-open it as a
  *corridor*.**
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
  **(m) SHOWERS ARE HOST-STARVED — do not build "X responds to the rain"** (201, `probe-rainhost`): nothing on the
  ground reads it, and a shower is **2-5 hexes TOTAL** ⇒ **less than one** picnic/cafe hex. **No host** (`T.MARKET` again).
  **(o) THE PORT HAS NO WATERFRONT — do not build "the ship docks / cranes work her"** (205,
  `probes/probe-harborhost.mjs`, 6 seeds). Warehouses sit **behind** the coast highway, **5-9 hexes from the sea**;
  **no quay tile exists.** Solvista is a **roadstead**, so the anchored freighter is *correct* — her "waiting on a
  berth" comment is the label-tell's **FALSE-POSITIVE mode**. A port vector must **build the waterfront FIRST**.
  **Banked host: the MOLE is real** (`moleSet`, 5-12 cells, all 6 seeds — the only structure in the water).
  **(p) CLOSED by 208/209; the WARNING is live. ⚠ DO NOT RAISE THE LAWN AMPLITUDE FURTHER** — `grass` and `lawn` share
  a base colour, so the dry-season divergence *is* the managed green's identity; lawns stay greener than the hills
  **all year**. **⚠ GARDEN is STILL MUTE (1.8 → 5.4). Its richer cue, which (p) OWNS:** staggered per-bed calendars +
  ONE shared `gardenPhase()` (FARM staggers FIELDS; this staggers BEDS); run the tell FORWARDS (123). **Nature × Deepen.**
  **(aa)/(ad)/(ae) CLOSED (220/221/223). THE `col()` WASH LADDER IS COMPLETE** — ONE shared `washRGB(b,f,gr,gg,gb)`,
  colour-only (**zero path objects**, **byte-identical in daylight** ⇒ a free dead-regime control). ⚠ **Do NOT fork a
  second wash — EXTEND `washRGB`**; **GLASS KEEPS the cool tint**, **ROAD staying grey is CORRECT** (214); asserted by
  `probes/probe-goldenhue.mjs`. ⚠ **234 added a THIRD caller — `WARMN` (timber), by NAME like `LEAFN`.**
  ⚠ **FARM (`cropRGB`/`colRGB`) is the ONLY warm surface still outside `col()`.** ⛔ **The old "watch: PARK↔ROAD
  separation is 14" item is RETIRED (251)** — it was a POINT-SAMPLE artifact, and 221 forbids scoring on a separation.
  ⚠ **`towerLook` publishes `bax`/`bay` — the ONE definition of "how wide is a tower"; the skybridge and helideck
  BOTH read it** (a point plan would have floated the bridge and overhung the pad). **Any new tower ornament must
  read it — and `midLook` (`fx`/`fy`/`segs`, furniture scaled by `rs`) is its walk-up twin. See (al).**
  ⛔ **(ag) CLOSED 251 — REFUTED ON EVERY COUNT. DO NOT RE-OPEN THE NIGHT SAND OR THE NIGHT GREENS** (greens + wash
  ladder innocent; the `BEACH>=MID` breach was the probe's own centre-pixel MEAN. Dimming the sand is a MEASURED dead
  end: costs `BEACH↔ROAD` 24→18. `probe-goldenhue` REPAIRED — area + p90 envelope; HEAD PASSES by 21).
  **(ac) CLOSED by 224, ✅ RE-CONFIRMED BY WORLD DATA AT 260** (tallest tower **ring 1**, `corr(th,core)` **0.82**,
  monotone envelope). ⛔ **THE `c.th` LADDER IS SPENT** — do not re-open placement (dead lever, 218), the COM fork (219),
  the height noise, or `TCAP` (224); **an agent FAILing the skyline from a whole-city frame is 224's PROJECTION law, not
  a defect.** ⚠ **`c.th` HAS TWO WRITERS** (placement + the 2022+ growth rule) — touch one, check the other; and **DO
  NOT DERIVE A TOWER CONSTANT FROM THE MEASURED MEAN `core`** (98 did; 219 invalidated it, unnoticed for 6 laps).
  **(aj) THE SHOWERS FALL WHERE NOBODY LIVES (236; SHADE half CLOSED by 242, SITING half OPEN, DOUBLY MEASURED).**
  Clouds spawn `x:rng()*G, y:CTRY-20+rng()*40` with **no reference to the land**, so a seed parks its sky over the sea
  — **242's probe counted 4/7, 6/7 and 3/7 clouds off-land on seeds 42/7/1234**, the same defect from a second
  instrument. Only **3–4 of 7** soaked clouds ever render a veil (`probe-front` D; the
  draw spends a shower 2 hexes short of the rim). **The lever is the SPAWN, not the draw** — bias `cl.x`/`cl.y` onto
  the live rows (`ROWMIN`/`ROWMAX`, `HEXI`) for ~2x the visible weather at **zero new draw work**. ⚠ Rain over the sea
  is **CORRECT** (201) — this is about *coverage*. **Sky × Polish.**
  ⛔ **(ak) SEASONAL-VEGETATION SEAM — CLOSED/SUPERSEDED BY (aq) AT 253.** The plants were never the defect (PARK at its
  coverage ceiling, FOREST 83% conifer); **the season was missing from the LIGHT**. ⚠ **DO NOT re-open the canopy, the
  lawn ((p) protects it), or a palette lap "to fix the seasons".** ⚠ **Mediterranean coast: GREEN WET WINTER + GOLDEN
  DRY SUMMER is CORRECT (201)** — no snow, no bare trees.
  ✅ **(al) 239 · (am) 241 · (an) 243 · (ao) 248 · (ar) 256 — ALL CLOSED; bodies archived at 241/259, WARNINGS only.**
  ⚠ **DO NOT RE-OPEN EITHER BUILDING** (look ladder complete: 228 crown · 235 footprint · 239 mid-rise); **EVERY FORM'S
  BASE IS ITS WIDEST PART.** ⚠ **DO NOT re-tune the elevated beam's draw** (measured IN BAND on every axis) **nor bound
  a loop's RADIUS** (that makes stubs). ⚠ **`stepGond`'s value bar decays with NO FLOOR** — gated on `WETSET`; do not
  un-gate. ⚠ **`probe-darkline` is REPAIRED (243) — trust it again.** ⚠ **THE RAINBOW IS NOT A RIM BUG** (6 seeds, 0.00
  hex overhang; it already tests its LEGS — a bow over open water is CORRECT (201); the defect was the COMMENT).
  ⛔ **(ar) WAS THE HARNESS, FOR THE THIRD TIME (229)** — 0px panel overlap, 0 clipped labels; **the agents were reading
  my shot.** 240's aside, still unclaimed: *"tiny white chevron glyphs on land (x≈0.47,y≈0.47)."*
  **(ap) THE SEA'S FOAM IS INVISIBLE AT FIT ZOOM — ✅ CONFIRMED AND MEASURED at 255, ⛔ but its OBVIOUS FIX IS REFUTED.**
  A cap is a `3.0x1.1` **WORLD**-unit ellipse and `fitScale≈0.65` ⇒ **~2 x 0.7 CSS px** at fit (215's hairline exactly).
  HEAD's whole wind response = **0.6% of the ocean**. ⛔ **DO NOT give it a BODY in the sea's TILE FILL — 255 built
  exactly that, it was FREE (0 path objects), MEAN-HELD (0px fixed point) and passed EVERY gate, and it is UNSEEABLE**
  (see the ⛔ in ROTATION). ⚠ **257's narrowing does NOT reopen this**: the wind is a **PER-HEX** field, which is exactly
  what terraces — 257 was safe only because it is **uniform**. ➡ **Sub-hex, wind-aligned streaks that CROSS tile
  boundaries, ADDING foam.** **Water × Polish.**
  **(x) A STROKE MAY NOT PRICE LIKE A FILL (215, perf suspect — NAMED, NOT MANDATED).** Build a **stroke-vs-fill sweep at equal path-object count**; `CCACHE` churn is ruled OUT.
  **(y) A SCORCHED-LOOKING HEX CLUSTER INLAND (216, seed 7, unprompted on a PASSing frame).** ⚠ The fire CA is a
  **GHOST** (cannot ignite at 2035) ⇒ almost certainly **LOGGING/clearcut, not BURNT** — **identify the tile first**. Nature × Polish.
  ✅ **(s) CLOSED AT ITS WORST PIN BY 257 — IT WAS THE SEA, NOT THE SUN**; **260 RE-MEASURED THE LAND RESIDUE AND IT IS
  MILD** (~20% narrowing, PARK↔ROAD 29→24; ⛔ the agents' loudest claim is **FALSE** — **BEACH↔ROAD = 72 at golden, the
  WIDEST pair in the table**, and nothing crosses the 15 floor). ⚠ **The sun CANNOT be lowered (200)**; do not raise
  `seasonCool` at the peak (it breaks 253's fixed point). Untested residue: 242's *"the SHADOW SIDES go warm."*
- **Reach maps exist — reuse them (U5):** `reachFill(out, r, isSrc)` is a multi-source hex BFS capped at radius `r`,
  land-only (`WETSET` blocks water/marsh/kelp), filling `out` with steps-to-nearest-source (255 = farther than r).
  `recount()` runs four per tick. Any "how far is X from Y" question should call it, not hand-roll a flood fill.
- **⚠ Three census stats can FALL, by design (U5):** `walkPct`, `transitPct`, `solarPct` are **shares**, not counts.
  **Services are walkable's binding constraint** — a tower lap that adds residents without civics *drops* `walkPct`,
  and that is the stat working. Judge by whether the city earned the change, not "up = good". `density` rises with
  intensification and falls with sprawl.
---

<!-- rotated -->

> **Archive:** the 254 entries before Iteration 252 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

## Iteration 252 — the sun keeps no calendar (2026-07-14) [holistic step-back, 30th]

**Vector** — the 30th whole-city step-back. No artifact change: `solvista.html` is
**byte-identical to HEAD**. The lap's output is a measurement, a refuted cue, and a new
#1 cue with its traps pre-named.

**Gates**
- **Census: PASS.** Tile histogram empty, as it must be for an untouched file.
- **Perf LAP (vs 247, `481602e`): day +1.3% / night +0.1% — free.**
- **Perf ARC (vs 177, `7e2ac2c`, 75 iters): day +18.2% / night +12.4%**, against 247's
  +19.0/+12.7 and 242's +18.6/+12.8. **The arc has not moved across three step-backs**
  (fractionally down, within noise). `probe-drawbudget` unchanged — `winBandR` 31.9%,
  `prismS` 29.1%, `hexTile` 12.1%, `bandS` 7.5%; ~48% static terrain, **no hot ornament**.
  Consistent with 249–251 being predicate/harness laps (251 shipped byte-identical).
  **ACCEPTED — no perf lap.**
- **Visual: FAIL on both seeds** — and the FAIL was **right**, which inverts the usual
  reading (212). Both agents, independently, on both seeds: winter is indistinguishable
  from summer, and the golden grade flattens the plate to one terracotta value.

**What the agents actually said (their nouns, per 228/235)**
> *"No snow, no bare trees, **no cooler light**, same sky, **same sun**, same ocean."* (s42)
> *"No desaturation, **no low sun**, no bare canopy across the forests."* (s7)
> Both could find **only** "two farm patches turning brown."

**The measurement** (`probes/probe-seasonarea.mjs` — 238's AREA form; `probe-season`'s
one-centre-pixel sample is the broken one):

    MUTE AREA at the dry peak (<25/441):  893 / 1345 = 66.4% of vegetated hexes
    PARK      562 hexes (41.8%)   22.9   <-- MUTE, the biggest vegetated surface
    FOREST    236 hexes (17.5%)   19.8   <-- MUTE
    FARM      112 hexes            46.6
    SHOREPARK 294 hexes            44.4
    ROAD      control               3.5   <-- honest zero

So **two-thirds of the city's greenery does not keep a calendar**, and the agents were
describing this table exactly.

**⚠ …and the obvious fix is DEAD, which is the half that matters (238's coverage law).**
Before designing anything I asked what fraction of each hex a palette change can even
*paint*: PARK is **46.5% lawn / 10.1% canopy / 43% season-dead furniture**, and its lawn
is *already* fully seasonal — SHOREPARK is 88.7% lawn and moves 44.4, and PARK's 22.9 is
precisely that number diluted. FOREST's hex is only **17.3% deciduous canopy**; the rest
is **conifer, which is correctly evergreen**. 238 had already measured that a canopy fix
moves PARK by ~2 and *"no design could have done better."* ⇒ **The 66.4% is largely
CORRECT. (ak)'s prescription stays dead, and I did not spend the lap on it** — this is
251's law obeyed rather than re-learned: a loud, twice-confirmed cue whose prescribed fix
damages nothing and buys nothing.

**🔑 THE FINDING — the defect is the LIGHT, and the ledger had never grepped it.**
`applySeason` touches **only** the terrain palette (`grass`/`grassDk`/`meadow`/`canopy`/
`canopyLt`/`lawn`/`turf`). The sun's position is `sunP=(dayT-SUNUP)/(SUNDN-SUNUP)` — **a
pure function of the hour, with no `year` term anywhere** — and `SUNUP=0.05`/`SUNDN=0.78`
are **hard-coded constants**. **The sun rises at the same hour, sets at the same hour, and
climbs to the same altitude on every day of the year**; the sky and sea carry no seasonal
term at all. This is **199's tell hosted on two constants** (names asserting *when the sun
comes up*, whose values cannot vary) and **209's law** (the large surface wearing a field
that cannot carry the signal — here, the **illumination**, i.e. every pixel in the frame).

Both agents named SUN and LIGHT. The loop kept spending laps on vegetation **because that
is where its instrument pointed** — `probe-seasonarea` can only see tiles.

**Verdict** — **FIXED (the ledger's aim)**; artifact **byte-identical to HEAD**. Cue
**(aq)** banked as #1 with all five traps pre-named (⛔ *do not lower the sun* — that is
cue (s)'s and 200's placard trap; the lever is **colour/warmth**, not altitude; centre it
on the dry peak per 245 for a byte-identical fixed point). Per 198, the step-back **names
the suspect, not the fix.** Also: the elevated transit took its **8th** agent
misdiagnosis (z-order, cleared by probe twice) — that backlog item is now overdue a
`polish-tile` lap.

## Iteration 253 — the sun learns the calendar (2026-07-14) [Sky & atmosphere × Deepen]

**Vector** — cue **(aq)**, the ledger's #1 and best-supported cue (252: raised independently
by both agents on both seeds *in their own nouns*, and confirmed by grep — two different
instruments, which is exactly what 251 says a cue needs).

**Change** — `daylight()` was indexed by the HOUR and carried no `year` term, so the sky, the
tint every surface's colour passes through, and the low sky's warmth were **identical in
January and July**. The ground had four seasons; the light falling on it had none.

ONE new predicate, `seasonCool()` — **`beachPhase()`'s cosine, inverted and sharing its phase**
(249's law: grep for the mechanism the artifact already ships before inventing one). 0 at the
dry peak (s=0.62), 1 at the wet trough (s=0.12). Read in exactly one place, `daylight()`, which
has exactly two callers — so it reaches everything:
- **the TINT** every surface passes through ⇒ the asphalt, the sand, the roofs and the sea read
  the season too, not only the things that grow. Chosen for its RATIOS, **normalised for its
  MAGNITUDE** (223) ⇒ winter comes out COOLER and never DIMMER.
- **the SKY** (`syncSky`'s CSS gradient) ⇒ a cooler, paler wet-season sky.
- **`GWARM`** is derived from `skyBot`'s R−B, so the sea's golden sheen, the cloud bellies, the
  glass rake and **the sun's own colour** inherit the calendar **at zero new draw work** — five
  existing readers, no new code. That is the Deepen.

⛔ **The sun's ARC is untouched** — `SUNUP`/`SUNDN` stay put (they are the light curve's own
dawn/dusk keyframes; the disc must go on touching down exactly as the sky goes dark) and 200
put the sun high on purpose. **The lever is COLOUR, never ALTITUDE**, exactly as 252 pre-named.

**Census: PASS.** Core flat (`pop`/`developed`/`roads` +0), tile histogram empty — as it must be
for a colour-only change. (`solarRoofs` +1 / `greenRoofs` −2: 226's documented ±2 tick wobble.)

**Probe** — `probes/probe-sunseason.mjs`, and it has **two free EXACT controls**:

    A. THE LEVERS, bit-for-bit (pure JS: no render, no clock, NO NOISE FLOOR AT ALL)
       controls that moved: 0    treatment cells that differ: 6 / 6
    B. THE FEATURE'S INK, shipped vs seasonCool()=0, IN ONE PAGE (floor EXACTLY 0)
       dry-peak  day/golden/night ....  0 / 0 / 0 px      <-- THE FIXED POINT (245)
       night     all four seasons ....  0 px              <-- THE DEAD REGIME (199)
       winter    day ................. 1,431,822 px       <-- treatment
    C. DIRECTION (the viewer's unit — a colour word needs a COLOUR metric, 214)
       warmth = mean(R)-mean(B), winter minus dry-peak:
       HEAD (the GROUND's calendar alone) .. -3.7    patch .. -27.8 day / -18.4 golden
    D. GWARM at the golden pin:  dry-peak 0.72 (= HEAD) -> autumn 0.61 -> spring 0.56
       -> winter 0.52.  Winter SOFTENS the golden hour; it does not cancel it.

And the **banked** instrument, `probe-seasonarea`, in its own units: **ROAD — its own control,
the "honest zero" — moved 3.5 → 20.1.** Asphalt has no seasonal palette entry, so *its entire
shift is the light*. `probe-goldenhue` PASSES; every separation is unchanged (BEACH↔ROAD 92→91)
and the night ordering invariant still clears by 21 — night is byte-identical, so it cannot move.

⚠ **HONEST READING, because the headline flatters me.** `probe-seasonarea`'s mute area went
**66.4% → 0.0%** — and **not one plant changed**. The vegetation palette is byte-identical; what
moved is the light that falls on it. **The metric was SUPERSEDED, not satisfied**, and quoting it
as "I fixed the mute vegetation" would be exactly the self-congratulation 251 punishes. 252 had
already measured that the 66.4% is *largely correct* (PARK is at its coverage ceiling; FOREST is
83% conifer). The honest headline is **ROAD 3.5 → 20.1**.

**Perf: free.** `probe-drawbudget` (deterministic, load-immune — 216): path objects **day −5
(−0.005%) · night +15 (+0.011%)**. Colour-only ⇒ zero path objects, and the fixed point *proves*
it at one pin rather than asserting it.

**Visual: PASS, both seeds, both agents, blind — and both LOCATED it correctly** (108). Asked
which build's *light* keeps a calendar, both named the patch and both correctly called HEAD's sky
season-invariant, which is checkable against the tint self-reports I already held. s42: *"cool,
high-key, a scrubbed rain-washed blue… it reads as physically motivated rather than a hue-shift
filter, because the sun disc, the shadows and the warm roof tones stay consistent; only the air
changes."* s7: *"the clear cold morning after a front passes."* No tears, no floaters, no muddy
or blown-out colour.

**Verdict — SHIPPED.** Cue **(aq) CLOSED**, and with it the seasonal ladder that 238/247/250 had
been walking: the season now reaches the *illumination*, which is the one surface every pixel
wears. 209's law paid out where the header said it would.

**Three laws promoted to SKILL.md** (bodies there):
1. **SUPPRESS THE PREDICATE** — the fourth member of the suppression family (226 the draw · 230
   the decision · 234 the colour). Any feature written as `HEAD + K·signal` is isolated by
   forcing its *predicate function* to 0 on `window` and re-rendering **in one page**: floor
   exactly 0, build-agnostic, no HEAD file, no cross-build floor. My first cut *was* a
   patch-vs-HEAD diff and its HEAD-vs-HEAD floor was **20,000–34,000 px** — you cannot claim
   "exactly 0" from under that.
2. **A CENTRED LEVER'S FIXED POINT CAN BE DESTROYED BY FLOAT ERROR IN ITS NORMALISER.**
   `1/(gr*.30+gg*.59+gb*.11)` is *not* exactly 1.0 at `gr=gg=gb=1` — 0.30+0.59+0.11 is not 1.0 in
   float64 — so it would have drifted `tint`'s last bit at the very pin the proof rests on. Write
   the normaliser in terms of the **signal** (`1/(1−0.0308c)`), not of the gains. Structural (223),
   not lucky.
3. **WHEN YOU RESTORE A SIGNAL THAT WAS MISSING GLOBALLY, THE OLD PROBE'S *CONTROL* BECOMES YOUR
   HEADLINE** — and if your fix lifts *every* row of a metric past its floor, ask whether you
   fixed the subject or moved the instrument's baseline.

## Iteration 254 — the city has always known its own age, and cannot show it (2026-07-14) [Urban fabric × Deepen]

**Vector.** Urban × Deepen — the header's rotation call, with 225's grep-the-seam law attached
(*"Urban is spent" has been REFUTED twice; an empty cue list records where you have already
looked*). The seam paid immediately, and it was the richest tell in the file.

**The tell.** `c.age` is written at **36 sites**, incremented every tick (0.075yr), and reset by
every siting/upgrade — so it dates the **current structure**. `describeTile` has published exactly
that, as **`Built ~1998`**, on every developed tile for the artifact's whole life. **No pixel has
ever read it.** A house from 1974 and one from 2034 wear the same stucco. Label-asserts-what-the-
draw-ignores, cashed a 10th time, hosted this time on a field with 36 writers and a tooltip for its
only reader.

**The host measured PERFECT** (`probes/probe-buildingage.mjs`, pure world data, 6 seeds): the stock
spans the **full 61 years**, **81.5% is ≥15yr old**, and age is **spatially COHERENT (0.40** —
neighbours agree, so it forms quarters, not speckle**)** and falls **monotonically** from the
founding crossroads outward — inner rings **38–47yr**, the rim **23–27**. `genWorld` lays a founding
crossroads and grows the old town around it, so **THE OLD TOWN IS DOWNTOWN** — the city has had a
history all along and has never once shown it.

**Change (REVERTED).** `patina(c)` — one predicate off `c.age` — gave RES + MID masonry (67% of the
stock; MID is the commonest building by 4x) a **luma-normalised ochre lean**: old masonry bakes warm,
new render stays cool. The lever was **HUE, not the palette NAME** — riding `tone` would only
re-partition the three body shades between arms of an if/else chain (247) and would spend the
per-building grain 99/103/239 bought. So it rode **on top**: grain × gradient. Luma-normalised (223)
⇒ brightness could not move; centred on the stock's mean (245) ⇒ a byte-identical fixed point. Glass
kept its cool tint (214). Colour-only: zero path objects.

**Census.** PASS. **Every metric +0, tile histogram empty** — no `rng()`, no terrain, world provably
identical (pop/towers identical across builds).

**Probe.** `probes/probe-patina.mjs`. It **passed on every gate I could name, and every one of them
was the wrong question:** luminance held to **0.6/255** in every ring on every seed · 222's night
ordering **byte-identical to HEAD** (`*TOWER 131 *MID 123 *COM 119 | BEACH 98`, clearing by **21**) ·
`dHUE` guard unmoved (RES 10°→9°) · path objects **−0.03%** (110,901→110,863 day) · isolation floor
**exactly 0 px** (253's predicate suppression) · and the headline, **core-rim warmth gap 6.3 → 29.9**,
with HEAD's gap *changing sign across seeds* — the signature of a signal that does not exist.

**Visual — TWO BLIND AGENTS, TWO SEEDS, CROSSED MAPPING (238), INDEPENDENTLY: `NO REGIONAL PATTERN`.**
Both **measured the frame themselves** before answering (251's tell). Seed 7's agent diagnosed it
unprompted and exactly: *"the signal is there in the data and invisible in the picture — the tint
needs several times more range."* Seed 7 is my **best** seed (d=0.87).

**They were right, and my probe was not wrong — we measured different things.** The ring MEAN averages
the grain away. **A viewer never sees a ring mean; they see BUILDINGS** — and the `cream`/`terra`/
`sandDk` lottery already scatters per-building warmth at **SD ~45** (R−B), *larger than the biggest
core-rim gap the lever can ever reach* (32 on the worst seed, at full saturation).
**Cohen's d = 0.87 / 0.40 / 0.73** — and on the seed the agent read, **0.40**. 233's lottery law again:
the quality straddles the bar and a 2-seed gate hands you one of each.

**And the ceiling is STRUCTURAL, not a tuning failure.** The obvious rescue is real — my `PATSPAN=26`
was too wide (ring-mean ages span only ~17 years, so the *regional* means used just 0.65 of the ±1
range) — **and it is not enough.** Swept, worst-seed `d` = **0.40 → 0.58 → 0.65 → 0.65 → 0.64**: it
**plateaus below 0.8**. Once the per-object signal saturates at ±1 the regional gap is capped by the
*extreme colours* while the grain's SD is fixed, so `d_max ≈ (colour range)/(grain SD)`. Only two
things can move it: **louder extremes** (here: implausible blue stucco — a Mediterranean city does not
have blue houses) or **a quieter grain** — and the grain was bought **on purpose**, by three laps, to
kill wallpaper.

**Verdict: EXPLORED → REVERTED.** `solvista.html` is **byte-identical to HEAD** (md5-verified). The
change was free, correct, invariant-safe and invisible — and invisible was the entire point. This is
214's necessary-but-not-sufficient corollary arriving on the **spatial** axis, and it is the system
working: the census, the invariants and the perf model can all pass a change the eye rejects.

**What I'd avoid next time / what this closes.** ⛔ **THE BUILDING COLOUR CHANNEL IS SPENT.** Do not
re-try *any* "the buildings should show X regionally" vector in colour — age, value, density, flow,
anything. Price it against the grain (SD 45) **first**; the two goals are in direct conflict and the
loop already chose variance. **The host is still live and still unread** — if a later lap wants the
city's history visible, it must use a channel the grain does NOT scatter (a *shape*, an *ornament*, a
*count*), not a hue. Both probes are banked; `probe-buildingage.mjs` carries the warning in its own
verdict so the next reader cannot repeat this.

**Law promoted to SKILL.md:** *A REGIONAL SIGNAL CANNOT BE PAINTED ON A CHANNEL A PER-OBJECT GRAIN
ALREADY SCATTERS — the grain is your noise floor, and an earlier lap may have deliberately MAXIMISED
it. State a regional claim as the gap in units of the WITHIN-region SCATTER (`d`), never as a
difference of MEANS.*

**Aside, banked (212 — both agents, both seeds, independently, unprompted):** the HUD's bottom stat
strip **clips** — `TRANSIT REA…` — where the PAUSE/1×/NEW CITY panel overlaps it, in all four frames
and in **both** builds (pre-existing, not mine). ⚠ **229's law first: `probe-hud.mjs` REFUTED a
near-identical cue (z) at 6 widths.** Reproduce it in the user's configuration before designing to it.

## Iteration 255 — the sea can be seen or it can be smooth, and it cannot be both (2026-07-14) [Water & coast × Polish]

**Vector.** Water × Polish — the header's rotation call (Water was the stalest domain, last touched
at 245) taking cue **(ap)**, *"the sea's foam is invisible at fit zoom"*, an aside two agents reached
independently at 245 (⇒ 212).

**The cue is TRUE, and the banked probe stated it in the viewer's units.** A whitecap is a `3.0x1.1`
**WORLD**-unit ellipse and `fitScale≈0.65`, so at the zoom a user actually looks at the city each cap
is **~2 x 0.7 CSS px** with a sub-pixel streak — 215's law exactly, a hairline that *tints* its
background instead of *marking* it. Measured (`probe-seastate`, repaired — see below): HEAD's **entire**
calm→gale response repaints **971–1,055 px of a 156,562–175,361 px ocean — 0.6%** — while the trees and
flags on **LAND** (the positive control) move **4,507–5,231**. *The wind moved the land six times harder
than it moved the sea, on a feature whose whole subject is the sea.*

**Change (REVERTED).** `seaFaceR(d,w)` — the caps' low-frequency **BODY**, in the currency the sun
glitter twenty lines below already uses and names in its own comment (*"LIFT THE WHOLE HEX TONE ... not
sub-pixel speckle"*). The sea's own base tile, **drawn anyway**, was pulled along ONE signed axis toward
`foam`: positive (it blows) whitens and desaturates; negative (a lull) extrapolates *away* from foam,
which darkens and **saturates** — glass. One axis, both ends, straight out of the palette. Centred on
`seaState()`'s mean (245), because `seaFace`'s own comment forbids drifting the sea's **MEAN** tone (98).

**Every gate the loop owns PASSED.** Census PASS, 0 page errors, histogram empty (no `rng()`, no
terrain). **Path objects −32 day** against a **+97 night** reading on code that is provably inert at
night ⇒ its own free noise floor (199) — the wash modulates a fill that was already being drawn, so it
is **free**. **Fixed point: 0 px / 0 px / 2 px** patch-vs-HEAD at `seaState()==0.5`, floor **0**, with a
**29,271–33,153 px full-gust control** proving the builds do diverge (`probe-seamean`). Land control
**byte-flat** (5231→5231, 4507→4507, 4591→4590). Sea response **971 → 33,763 px: 29–35x**, 0.6% → **18–22%
of the ocean**. On paper, a clean ship.

**And it is INVISIBLE.** Two blind agents, two seeds, on the cleanest A/B the harness can shoot (HEAD's
gale vs the patch's gale — same seed, same frozen world, same wind, **only the build differs**):
*"effectively indistinguishable"*, *"I will not claim it shows an effect I cannot see."* They were right
and **the count was flattering me**: `probe-seastate` scores a pixel as *moved* at `d > 6`, i.e. **2.7% of
range — below sight.** Re-stated as an **AMPLITUDE** (`probes/probe-seaamp.mjs`): the wash shifts the sea
**12.7/255 mean**, against a sea that **already carries a within-sea luminance SD of 22.3** ⇒ **Cohen's
d = 0.57 / 0.68 (p90).**

**This is 254'S LAW, ONE LAP LATER, ON A DIFFERENT SURFACE** — *a regional signal cannot be painted on a
channel a per-object GRAIN already scatters*, and its tell fits to the letter: **my feature is a smooth
low-frequency field, and the sea already carries high-frequency per-hex noise in the same channel**
(`seaT[]`: depth quantized to eighths **+ two `hashCell` octaves**, L1294). A blind agent reading
**pristine HEAD** independently reported that grain as a visible honeycomb over *"roughly 90–100% of the
open water"*. I checked the **caps'** size (215) and never once checked the **sea body's variance**.

**But the ceiling is NOT 254's, and that is the new law.** 254 plateaus under tuning; this lever does
**not** — at `ROUGHK` 0.30→0.75 the signal clears the grain outright (**d = 1.15 / 1.90**). It fails for a
*different* reason, and the third agent named it: ***"discrete hexagonal cells flipping between normal and
pale... a high-contrast hex QUILT... camouflage / a tiled mosaic, not a sea."*** I had reasoned *a SMOOTH
band ⇒ no hex edges*. **False.** The field is smooth, but it is **sampled per hex and rendered as a flat
hexagonal FILL** — so a smooth field **TERRACES ONTO THE LATTICE**. The glitter escapes only by being a
**low-alpha overlay** (max 0.16), i.e. by living permanently in the subtle regime. ⇒ **214's law, generalised
from per-EDGE strokes to per-HEX FILLS: the wash may be SUBTLE (d=0.57 — invisible to both agents) or
BRIGHT (d=1.15 — a visible hexagon), and there is no middle.** The sea's **tile-fill channel is spent.**

**HARNESS — two dead instruments found and REPAIRED (243: fix the tool, don't write a caveat).**
(1) **`probe-seastate`'s sea mask never contained the sea.** It loud-painted `['water','waterDk','foam',
'glint']` — but `water`/`waterDk` paint the **river, marsh, pools and wakes**, and the open sea's BODY is
`seaFace` → `colMix('waterSh','waterDp')`, **and neither was in the list**. So "the sea" was really *the
sea's ORNAMENTS*, and `land` — its **complement** — silently contained the entire ocean. It read HEAD
correctly **by accident** (in HEAD the body never moves with wind); the first change that moves the BODY
put most of its pixels in `land` and **doubled the positive control** (4,857 → 10,341), which is what
caught it. **228's law, recursing a 5th time, on the probe the cue itself handed me.**
(2) **Its fixed-point frame HASH was pure noise** — it never cleared the movers (230) and *a whole-frame
hash is not a diff* (**245's own law, which 245's own probe then broke**). The same pristine HEAD file
hashed **3129893759 / 2450885004 / 3158439912** on three consecutive runs. Removed; it now points at
`probe-seamean`, which counts pixels and carries a floor.

**Verdict. EXPLORED → REVERTED** (artifact byte-identical to HEAD, md5-verified; census re-run PASS).
Free, mean-held, gate-passing and **unseeable** is not a ship — 254's precedent, one lap old, is exactly
this. Kept: both probe repairs + `probe-seaamp.mjs` (states a claim in units of the grain it must be seen
against). **The way through is named and it is NOT a fill:** the effect must be **SUB-HEX** — wind-aligned
streaks that **CROSS tile boundaries**, *adding foam* rather than *subtracting saturation*, so the lattice
is never the rendering unit. That is a shape, not a colour (254's *"a SHAPE, an ORNAMENT, a COUNT — never
a hue"*, arriving at the sea).

## Iteration 256 — the thirty-first step-back: the arc stops, and the scratches get a name (2026-07-14) [holistic step-back, 31st]

**Vector.** The 31st holistic step-back — overdue by the header's own rotation call (252 was the 30th;
253 shipped, 254 and 255 both reverted, so the arc was **unpriced** across three laps). No source change.

**Census.** PASS, every metric +0, tile histogram empty — the correct and expected result for a lap that
edits nothing. It proves only that the page does not throw.

**Perf — the LAP is free and the ARC HAS STOPPED.**
- **LAP** (vs 252, `2af0f73`): **day −0.1% / night +0.2%**. Free.
- **ARC** (vs 177, `7e2ac2c`, the same ref the last three step-backs used, so it is directly comparable):
  **day +18.1% / night +13.2%.**
- `probe-drawbudget` night profile is **byte-identical to 252**: `winBandR` 31.9% · `prismS` 29.1% ·
  `hexTile` 12.1% · `bandS` 7.5%, `drawCell` 95%. The lap added **zero** draw objects — which is what
  *causes* the free timer, so the two instruments agree on a mechanism (216).

**⇒ THE ARC IS FLAT ACROSS FOUR CONSECUTIVE STEP-BACKS, AND THE HEADER'S `+0.2%/iteration` IS NO LONGER
BEING PAID.** day: 242 **+18.6** → 247 **+19.0** → 252 **+18.2** → 256 **+18.1**. night: **+12.8 → +12.7
→ +12.4 → +13.2**. Fourteen iterations have landed since 242 for **no measurable arc growth**. That is
not luck and it is not noise — it is **structural**, and it is the step-back's real finding: the loop's
late-game vectors (Deepen, Polish, predicate fixes, probe repairs, and two honest reverts) are
*categorically* cheaper than the additive laps that built the arc. **A domain that is past additive
saturation stops costing frame time.** ⇒ The standing perf suspect ("the arc is diffuse; there is no hot
ornament") is **unchanged and now ACCEPTED with evidence, not resignation** — do not open a perf lap.

**Visual — both seeds PASS.** Whole-city, 3 lights × 2 calendars, frozen in-page (`shot-stepback`); every
frame self-reported `HUD=ok` and its own light phase, so the camera is not lying (202/204/227).

**Two asides, reached INDEPENDENTLY by both agents on different seeds ⇒ 212 says weight these above either
verdict — and one of them is NEW:**

**(1) GOLDEN HOUR IS THE WEAKEST FRAME — the SIXTH and SEVENTH independent report.** Both agents named it
unprompted as the weakest of the four, in the same nouns cue **(s)** has been collecting since 212:
*"flattens the city into a single brown-orange mass"* · *"roads, roofs and terrain all within a few percent
of each other in value"* · the park and forest *"stop reading as green space and become brown scrub."*
⇒ **NEW, SPECIFIC, AND THE BEST LEAD (s) HAS EVER HAD — THE SEA DID NOT GET THE MEMO.** Seed 7, unprompted:
*"Sky and sand are peach; the ocean stays essentially its daytime cool teal, with no warm sun path or
reflected sky. At sunset the water looks unlit and pasted from another frame. This is the single most
fixable thing in the set."* Seed 42 saw the same split from the other side (*"the ocean keeps most of its
teal, so land and sea end up in two unrelated colour worlds"*). **That is not the contrast-collapse
complaint — it is its CAUSE, named: the warm wash reaches the LAND and not the WATER,** so golden hour
both mutes the land's separations *and* leaves the sea unlit, and the frame splits in two.
⚠ **This is 209's law waiting to be cashed again** (*what LARGE SURFACE wears a field that cannot carry
the signal?*) — and the sea is the largest surface in the city. ⚠ But **253's fixed point is load-bearing
and must not be broken**, and 200's *do not lower the sun* still holds. **Sky × Deepen or Water × Polish;
measure with `probe-goldenhue` FIRST — which pairs actually collapse — before designing.**

**(2) THE DARK SCRATCHES — the perception is REAL, both stated causes are REFUTED, and the probe names the
suspect.** Both agents, blind, on different seeds, described long thin near-black lines *"reading as
scratches on the image"* with *"no visible support"*. Seed 42 attributed them to **kite strings**; seed 7 to
**power/transmission lines** and *"stray vector guides floating above the rooftops."*
- **`probe-darkline` (`MINLEN=4`, repaired at 243 so it can see CHAINS) says: `drawMonoAt`.** Seed 7 night:
  **2,747px, n=350, bbox x 0.11–0.64 y 0.14–0.78** — which matches that agent's own reported box
  (*"x≈0.25–0.66, y≈0.14–0.78"*) almost exactly. Seed 42: 880 + 587px.
- **`drawKite` does not appear ANYWHERE in the census, on either seed, at any light.** The kite tether is
  41px and cannot be the *"400px line crossing the pier"* the agent described. ⇒ **The kite cause is a
  confabulation laid on top of a correct perception** — 212's law in its purest recorded form, and the
  **ninth and tenth** time agents have correctly *seen* the elevated transit and wrongly *explained* it.
- ⇒ This is `polish-tile`'s cue **(a)**, and the step-back **NAMES THE SUSPECT, NOT THE FIX** (198). It is
  now the **most-reported defect in the ledger by a wide margin**, and `probe-drawbudget` prices
  `drawMonoAt` at **2.1% of the frame** — *the loudest complaint in the artifact is also one of the
  cheapest things in it.* ⚠ **NEVER re-open the z-order (cleared by probe TWICE, 203/212); the fault is
  LEGIBILITY, and a hairline needs a BODY (215), not more strokes or more contrast.**

**(3) ✅ CUE (ar) IS REFUTED AND CLOSED — THE HARNESS, FOR THE THIRD TIME (229's law).** (ar) claimed the
PAUSE/1×/NEW CITY panel *overlaps* the last HUD stat (`TRANSIT REA…`), raised at 254 by both agents
independently. ⚠ **`probe-hud` would have ACQUITTED it for the wrong reason** — it measures *text clipping*
(`scrollWidth > clientWidth`) and is structurally blind to two DOM boxes colliding, which is 228's law
lying in wait. Measured in the complaint's own nouns (`getBoundingClientRect` on `.census` vs `.controls`):
at **1400×900 the boxes are EXACTLY FLUSH — census right edge 1080, controls left edge 1080, x-overlap
0px** — and `transit reach` ends at 1059, **21px clear**. At 1280/1600/1100 they are separated by
**60/200/283px**, and `probe-hud` finds **0 clipped labels at 6 widths**. ⇒ **There is no overlap and no
clip.** The step-back's own 1400×900 camera is the one width where the two panels land *touching*, and
flush-in-a-PNG reads as colliding. **The agents were reading my shot, not the artifact.**

**Verdict: PASS.** No compounding drift. The city still reads as a balanced coastal city at every light;
no z-order tears, no blown-out colour, no darkness. **The seasonal ladder has LANDED and both agents read
it unaided** — grass dry-gold → wet-green, farms cropped → ploughed bare, the beach crowd packing away
(253 + 247 + 238, confirmed from the outside for the first time). The two live defects are both *already
banked*, both now *measured*, and neither is a regression — they are the two things the loop has never
spent a lap on.

**Verdict: PASS (holistic step-back — no source change).**

## Iteration 257 — the sea was the one surface the sunset never reached (2026-07-14) [Water & coast × Deepen]

**Vector.** Water & coast × Deepen — the sea reads the sky (a Sky×Water interconnect; the *draw*
that changed is the water's, so it is filed under Water). **Deliberately off-rotation**: the header
steered to Civic/Transport, but 119's law says a banked, measured finding outranks kind-rotation, and
cue **(s)** is the loudest in the ledger — **7 agent reports across 5 step-backs** — and 256 had just
handed it a *mechanism*. Water's last lap was 255 (× Polish); this is × Deepen, so the kind still varies.

**Probe before design (and it killed two candidate fixes before a line was written).**
`probe-goldenhue` states the defect in one row. At golden hour **every land surface GAINS chroma**
(PARK 55→77, ROAD 37→61, TOWER 25→60, BEACH 66→92 — the warm tint saturating a warm albedo) and
**WATER is the only surface in the city that LOSES it: 66 → 31.** The sea's base is a saturated teal —
G and B high, R low — which is *exactly* the channels the golden tint `[.95,.76,.68]` crushes, so the
multiply does not warm the water, it **cancels** it. That is **214's law arriving at DUSK instead of at
night**, on **the largest surface in the city** (209). It was never a brightness bug and never a missing
sun path — 181 drew one. Then the arithmetic refuted the two obvious fixes:
- **mirror the warm horizon (`GWSB`)** → `[121,130,111]`, **chroma 19, a murky olive**. Teal and orange
  are complementary, so the blend passes through **grey**. 181's own comment already said so.
- **just restore the teal** → hands back a *bright daytime sea*, which is the complaint stated louder.

**Change.** `seaFace()` — **the sea is a MIRROR, not a diffuse surface.** Land is a diffuse reflector
(colour = albedo × illuminant, so `TINT` is right for it); **water's colour is the SKY'S**, not albedo ×
sunlight. So the water body now lerps toward **`GWST`, the new OVERHEAD-sky global** (the twin of 181's
`GWSB`, which stays the colour of the sun *path* drawn across it), by `r = GWARM * SEAMIRROR`, and the
reflection is **not** passed through `TINT` — reflected light is not albedo, the same reason the lit
windows take a raw literal. **Uniform across the ocean**: `r` has no `x` and no `y` in it.

**Not a 255 violation — and re-reading 255's *mechanism* rather than its *sentence* is the point.**
255's ⛔ reads *"do not paint a signal into the water's body colour"*, which forbids this lap literally.
But 255's quilt comes from a field **sampled per hex**, whose quantisation steps land on hex boundaries.
A term with no x/y moves every hex by the *same* amount and introduces **not one new spatial step**.

**Census.** PASS. Core flat, **tile histogram empty** (correct — draw-only, no `rng()`, no terrain);
`solarRoofs −1 / greenRoofs +2` is 226's documented ±2 tick wobble.

**Probes.**
- `probe-goldenhue`: **WATER golden hue 157° → 203°** (46° out of grey-teal into an evening blue),
  **chroma 31 → 35**, **luminance 121 → 122 (held** — 98). Night ordering invariant still **PASS,
  clearing by 21**; night hue guards unmoved; the 9 land rows unmoved (±1 on the *coastal* three is
  196's box-bleed — `seaFace` cannot paint a land hex).
- **`probe-seastep` (new, render-free — no clock, no pixels, no noise floor): THE UNLOOKED-FOR RESULT.**
  Both agents, blind, unprompted, at 1:1 crops, on both seeds, reported **pristine HEAD's golden sea as
  "a clear hexagonal quilt… exposing the grid"** — 255's failure mode, sitting in HEAD, unnamed for the
  artifact's whole life. Measured, and it is **not** what it looks like: `seaTone` quantises depth to
  **eighths**, so the lattice step is **10.6 RGB units at DAY** — *bigger* than golden's 8.7 — and nobody
  has ever called the day sea a quilt. **The step did not grow; the CHROMA collapsed.** In `step/chroma`:
  day **0.14** · **golden HEAD 0.20 (the artifact's worst)** · night **0.08** · **golden patched 0.08 (its
  best, tying night)**. The fix halves the terrace (8.7 → 4.1) *as a side-effect of restoring the hue*.
- **Fixed point (245), and it is structural, not statistical.** `GWARM ≤ 0.02` early-returns
  `colMix('waterSh','waterDp',d,1)` — textually HEAD's entire body — and GWARM is **0** at both the day and
  night pins (self-reported by every frame). So **day and night render HEAD's bytes exactly**, confirmed:
  `probe-seastep`'s day/night rows are identical across builds, and `probe-goldenhue`'s day/night WATER
  columns are byte-identical. Two of three columns are a **free dead-regime control** (199).

**Perf.** Colour-only, on a fill that was already drawn ⇒ **zero new path objects**, counted not assumed
(222): `probe-drawbudget` HEAD **110,811 day / 139,616 night** → patch **110,801 / 139,605** (−10/−11 =
entity wobble). **FREE.** (`probe-drawbudget` gained a `SRC=` hook this lap so a lap can price itself
against HEAD without a `/bin/cp` swap — 197's stale-backup hazard.)

**Visual.** 2 agents × 2 seeds, **blind, files named never lettered** (239). **BOTH PASS**, both naming the
patch file. Seed 42: HEAD is *"a bright saturated tropical teal — pure daytime water… the sea reads unlit
and pasted in from another frame"*; patch is *"a soft dusty slate-blue… picking up the sunset sky. Land and
sea read as one coherent golden-hour scene."* Seed 7: HEAD *"essentially the SAME teal as the daytime
frame… two unrelated pictures"*; patch *"clearly lit by the same low warm sun."* Both confirmed the quilt is
gone and the day/night seas are healthy; no z-order tears, no blown-out colour.

**Verdict.** **DEEPENED.** Cue **(s)** — the ledger's loudest, 7 reports across 5 step-backs — is
**CLOSED at its worst pin**, and it closed by fixing the *sea*, not the *sun*, which is why five laps of
looking at the light never found it. A latent HEAD quilt closed with it, free.

## Iteration 258 — the cab had a livery, a curfew and a tooltip, and no job (2026-07-14) [Transport × Deepen]

**Vector.** Transport × Deepen — the rotation's own call (Transport stale since 249; 257 went
off-rotation and the header said the debt was due). It is **249's ferry, on wheels**, and the
seam was found by grepping the Transport seam exactly as 225's law prescribes.

**The tell, stated by the artifact itself.** ~1 in 6 cars has worn a lemon livery and a checker
band since **164** gave it its paint; **230** gave the flag a meaning after *dark* (the cab keeps
no curfew, so its share of the traffic climbs through the small hours) and wrote, in the source,
*"the flag has never MEANT anything. Now it does."* **In the DAY it still meant nothing.**
`stepVehicle` random-walked a cab exactly like an ordinary car, and its tooltip said
**"For hire — flag it down"** over a car that had never once stopped for anybody. Its roof sign
even carried an **amber lamp** — gated on nothing but `LITAMT>0.3`, i.e. on *darkness*, when the
one thing a roof light has ever meant is **FOR HIRE**.

**Probe before design, and it went 3 for 3 (`probes/probe-taxifare.mjs`).**
- **PART A — the host is REAL** (the dead-code check first: `T.MARKET`, the plazas, the fire CA).
  Pure world data, no render, no clock. `livelyKerb` — *"the ONE definition of a lively kerb"*,
  already read by **two** readers (`syncFleet`'s home pool, `homeGround`'s re-anchor) — gives
  **125–147 kerbs per city** at 2035 (14–18% of all road cells), and **67–71% of every road cell
  is within 3 steps of one over the road graph the cab actually drives** (87–96% within 6). A
  random-walking cab is never far from a fare. ⚠ **No birthday, though**: 1985 already has 43–60
  kerbs, so 249's free dead-regime control was **not** available and I did not claim one.
- **PART B — the defect, with no threshold invented** (236: HEAD's constant IS the baseline).
  Temporal (134 — every other gate here is frozen, so *"it never stops"* has no instrument),
  driving the artifact's **own** `advanceEntities`, never a re-implementation (249):
  **TAXI STOPS = 0, on every seed, forever.** ⚠ And the **BUS**, in the same array and the same
  function, reads **72/152/80** — a **free positive control** (248: a correct sibling draw
  validates the rig), so the taxi's zero is a **real zero, not a dead instrument** (196/250).

**Change — nothing invented; the house already owned both halves.** `dwell` is `stepVehicle`'s
**own** word for a call (the bus has pulled into its stops for 200 iterations, ten lines up), and
`livelyKerb` is the host. So a cab crossing a lively kerb rolls for a fare, stands while it gets
in, and is then **hired for the ride** — `dwell` **IS** the ride, so the cooldown and the fare are
the same fact and a cab cannot be hired twice. **ONE predicate (`cabFree`), three readers**: the
**step** (a hired cab drives straight past the next kerb), the **draw** (the roof lamp becomes a
FOR-HIRE sign), and the **tooltip** — 112's law running *forwards*.
⚠ **NOT a `peds` vector, deliberately (111):** a resident is leashed to its anchor, so
*"somebody hails a cab"* is structurally capped at ~a quarter of any road-borne host. **The fare
is implied by the BUZZ FIELD, not by a drawn figure**, so the cap simply does not apply.

**Census. PASS — every metric +0, tile histogram empty.** Not even the documented ±2 tick wobble.
`Math.random` only (as the taxi flag and the bus dwell already are), no `rng()`, no terrain ⇒ the
seeded stream is byte-identical, **proven rather than asserted**.

**Probes.**
- **Taxi stops 0 → 58 / 48 / 28.** **HIRED% = 41.1 / 40.3 / 31.3** — at a glance, about a third of
  the cabs show a dark roof lamp. Stated in the **viewer's** units (205), not in the units of
  `CABFARE`, so it needed no tuning.
- **CAR control: 0 on EVERY row of BOTH builds** (250 — the must-not-move count beside the
  must-move one). The fix did not leak out of its class.
- **⚠ 204 BIT, AND THE FIX WAS AN EXACT CONTROL.** The first run had seed 42's *taxi count* move
  **6 → 3** and the bus drift — impossible, since the flag is set in `syncFleet` at spawn. It was
  the **shared stubbed `Math.random`**: my rolls draw from it, so every consumer downstream walks a
  different walk. Two fixes, both banked laws: **re-seed IN-PAGE** (248 — `addInitScript` fixes the
  PRNG *function*, but the stream **position** at load is wall-clock dependent), and a **CABS-OFF
  control** (230 — suppress the *decision*, not the build: with no car flagged a cab, `v.taxi&&…`
  short-circuits and the roll is **never drawn**, so the patch runs HEAD's stream **exactly**).
  ⇒ **CABS-OFF reproduces HEAD byte-identically — bus `77/165/76`, every population — on both
  builds.** An **exact** control, not a statistical one. The shipped bus column still drifts a
  little (77→76, 165→167, 76→86); that is the stream, and CABS-OFF is what proves it.

**⚠ THE CAMERA WAS THE HARD PART, AND THE FIRST VISUAL PASS WAS A FALSE POSITIVE I NEARLY BANKED.**
The first agent returned **PASS** while telling me, in the same breath, *"the centred vehicle isn't
a taxi at all — a plain red car."* It had reported the hired frame as **DARK** — which is the
**correct expected answer** — about a frame **with no cab in it**. I looked myself: the frame's
centre was a **TOWER**.
- The cab was at exactly the right world point and **buried behind it**: measured, **14 px of
  visible ink against 154–167 for the vacant cabs**. Not a camera bug — a property of the **HOST**.
  `livelyKerb` means *a road with ≥2 ATTRACT neighbours*, i.e. precisely the ground with **tall
  frontage drawn in the row IN FRONT**. Draw order is depth order, so **the predicate that makes a
  stop MEANINGFUL is the predicate that BURIES it** (206, sharpened).
- ⚠ **And I HAD obeyed 226 (aim by measured ink) — it still framed a wall, because there was
  exactly ONE hired cab and an argmax over n=1 is a lottery ticket, not an argmax.** Fixed by
  taking the **argmax over TIME**, with a **self-calibrating** bar (205): a cab is well-exposed iff
  its ink clears **70% of the mean VACANT cab in the same frame** — i.e. *as visible as an ordinary
  car in an ordinary place*, which is the incumbent, not a number I chose.
- **PART C — measure the POPULATION, not the instance (206), and the n=1 story inverts.** Mean
  visible ink per cab, by state: **VACANT 37/32/34 · HIRED+MOVING 29/31/30 · STANDING 22/27/26.**
  ⇒ **A hired cab is as visible as any other car**, so the roof lamp reads wherever a cab drives;
  only the *stop* sits in dense ground, and it still keeps ~75% of an ordinary car's ink. The 14px
  cab was an unlucky single draw.
- ⚠ **A STILL FRAME CANNOT SHOW THAT A CAR IS STOPPED** (134, arriving on the *visual gate*). The
  day close-up was **deleted**, not tuned: the stop is a claim about **motion**, and its gate is
  Part B. The gate was re-aimed at the **state the behaviour leaves behind** — the lamp.

**Visual — 2 agents × 2 seeds, blind, files named never lettered (239). BOTH PASS, and both hit
ground truth on every LOCATE call** (108 — a wrong answer would be *visibly* wrong):
`cab-hired-night` **DARK** · `cab-vacant-night` **LIT** · HEAD's cab **LIT** (HEAD never darkens a
lamp). Both discounted the street-lamp bloom and the headlights as distractors, unprompted. Seed 7:
*"a distinctly bright amber/gold dot sits directly on top of the roof box… **unambiguous versus the
hired frame**."* Whole-city day+night clean on both seeds: no z-order tears, no floating tiles, no
blown-out colour.
⚠ Seed 7 re-raised the `TRANSIT REA…` HUD clip — that is cue **(ar)**, **REFUTED AND CLOSED at 256**
(0px overlap measured; the 1400×900 camera is the one width where the panels sit *flush*, and
flush-in-a-PNG reads as colliding). **Fourth agent, same harness artifact. Not acted on.**

**Tooltip.** Both branches resolve off the **same predicate the rule steers by** (`cabFree`), so the
label cannot drift from the pixels — which is exactly what it had been doing:
`VACANT → "For hire — flag it down."` · `HIRED → "Hired — a fare aboard, crossing town."`

**Perf. FREE, counted not inferred (222).** No new draw primitive — the change only *gates* an arc
that already existed (a hired cab draws one *fewer*). `probe-drawbudget` (`SRC=`, no `/bin/cp`):
day **110,854 → 110,785**, night **139,598 → 139,671** (±0.05%, entity wobble in both directions).

**Verdict. DEEPENED.** The taxi flag has been in the artifact for 94 iterations, wearing paint
(164) and then a night shift (230), and it has never once done the job its own tooltip advertised.
Now the cab works the kerbs where there is something to come out for, goes dark with a fare aboard,
and says so.

## Iteration 259 — the observatory was dropped on downtown, under the brightest sky it had (2026-07-14) [Civic & culture × Deepen]

**Vector.** Civic & culture × Deepen. Civic was the oldest domain (stale since 250, 8 laps).
Its cue list was empty, so I grepped the seam instead of trusting it (225) — and the seam held
a four-witness tell.

**The tell.** `CIVICDESC.observatory` has promised *"A dome out on the **dark rim** of the city,
open to the night"* for the artifact's whole life. `siteQuarter`'s comment says the observatory
*"wants the dark rim"*. `CIVICDESC`'s own preamble says *"the observatory the dark rim"*.
`CIVHRS.observatory=1` because *"its whole night is just beginning"*. **Four readers, one story
— and the dome went through the same uniform random scatter as the police station** (`rcIn(2,
SHOREX-1,2,G-2)` + `roadNear`), with no darkness term anywhere in it. 199's tell, on its richest
host yet: not one label but a label, two comments and an hours-constant, all asserting a siting
the rule cannot perform.

**Probe first (`probes/probe-darksky.mjs` — pure world data, no render, no clock, no noise floor).**
The quantity is not a proxy: `genWorld` builds `c.lit` from `hexDist`-to-CBD (the `LITR`=34 glow +
the `CORESIG` core bump) and it is `drawBuilding`'s ONLY window-light term, so it *is* how bright
the night frame renders a lot — and it is fixed at `genWorld`, so unlike the amphitheater's frontage
(231) the predicate cannot rot as the city grows. HEAD, paired over 10 seeds at 2035:
**mean `obs.lit` 0.389** against a random-lot expectation of **0.310** — *statistically
indistinguishable from a random lot, if anything slightly brighter*. Range **0.026 → 1.000**. On
seed 1234 the dome stood at **`c.lit` 1.000, the field's MAXIMUM, TWO hexes from the founding
crossroads** — the city put its observatory on the CBD. The **AQUARIUM is the positive control**
(248): a real siting rule, scored the same way on its own predicate, reads dist-to-water **1 on all
six seeds** against a random inland lot's 7–9 — so the rig can see a preference, and the
observatory's flatness is real flatness.

**Change.** `siteDark(kind)`, beside `siteQuarter` and in its idiom (248: grep for the neighbour
that already solves your problem) — a deterministic scan, **no `rng()` draw**, so the caller's
90-try scatter still runs and still spends its draws and the stream is untouched; only the lot
changes. A **PREFERENCE, never a gate** (206): the best of the pool always takes it, so the
one-per-city dome can never be lost (placed 6/6, 10/10). The tooltip now names the sky off the
**same `c.lit`** the rule minimises and the draw brightens by — one field, three readers (123,
forwards).

**⚠ Two bugs caught before shipping, both by a gate rather than by luck:**
1. **A salt collision that would have killed iter 158.** My tie-break first used `seedNum^0x0B5E`
   — which is the salt the dome's own draw flips its **slit azimuth** on. *An argmin over a shared
   salt is a **selection** on it*: the winner is always the lowest hash, so `sd` would have come back
   **−1 in every city** and the per-city azimuth would have silently died. Caught by adding an
   azimuth column to the probe; now `0xDA25`, and the column reads `[1,1,−1,−1,1,−1]`.
2. **My own probe was measuring a city nobody renders.** Part A warped in two hops
   (`__warp(43.5)` then `__warp(17.5)`); `__warp` ticks `while(year<target)`, so two hops land a
   **different tick count** than one, and it built a different city than the census, the camera and
   Part B (which all use a single `__warp(61)`). A *prefix* warp is on the trajectory; a two-hop
   warp is not.

**The headline claim FAILED in the viewer's units, and the probe that found that is the lap.**
`probes/probe-domedark.mjs` asked the question a viewer actually asks — *how much lit city
SURROUNDS the dome* (mean rendered luminance of the live hexes within 5, sampled over each hex's
AREA per 238, off a frame with the dome itself suppressed). Answer: **HEAD 76.2 → patch 74.6,
−1.9%. Invisible.** Only seed 1234 moves (−19.4%); on two seeds the patch is *brighter*. **A blind
agent said exactly this** (*"ringed by lit towers… neither is stranded out in the dark"*) and it
was right. The cause is in the draw: **`lit = LITAMT*(0.35 + 0.65*c.lit)` has a 0.35 FLOOR**, so
`c.lit=0` is not *dark*, it is *35% lit* — the rendered dynamic range is 2.9:1 and it is swamped by
everything else in the hex that never reads `c.lit` at all. **I scored a perfect 0.000 on a
quantity the viewer cannot see** (205 + 254). ⇒ **LAW promoted to SKILL.md.**

**But the same probe found the defect that carries the lap: THE DOME WAS BURIED.** Draw order is
depth order, and nothing had ever scored the observatory's sightline. Measured
(`occluded% = 1 − inkInPlace/inkOnTop`, probe-amphvis's rig retargeted; one page, floor exactly 0,
read off the final composited canvas):

| | HEAD | siteDark, darkness only | **shipped (+ sightline)** |
| --- | --- | --- | --- |
| mean occluded | **54.5%** | 25.4% | **5.9%** |
| >half buried | **3 / 6** | 1 / 6 | **0 / 6** |
| worst seed | **97.8%** (seed 1234: **8 px**) | 80.8% (seed 42) | **12.2%** |

A darkness-only rule halved burial *by luck* (the rim is thinner than the core) and **buried seed 42
WORSE than HEAD did — 80.8% vs 28.0%** — because nothing scored the sightline. So: **two gates on one
feature, made to point the same way (244)**, using the predicate the artifact already ships —
`groundLoad` (231: it sums the DRAWN HEIGHT of the two rows in front and counts a `RAISEABLE` lot at
`FUTUREH`, because an empty lot is not a clear view, it is a building that has not been built yet).
`DARKGL=0.005` **swept end-to-end, not guessed** (0.002 leaves seed 99 at 29.9%; 0.012 is
indistinguishable from 0.005). The sightline term costs a little darkness — capture 0.997 → **0.844**,
`obs.lit` **0.050** — still far below the random-lot 0.310, and **no seed in `CORER`** (d = 20–33).

**Census.** PASS, 0 page errors. `pop` +1.25%, `roads` +1, `developed` −0.1%, `civicKinds` flat.
`schools −3` looked alarming and was **the chaos, not me** (231): paired over 10 seeds at 2035,
**schools 4 → 4 on every seed, mean delta 0.00, down on 0/10**, `CIVIC` identical. The −3 was a
mid-growth timing wobble in the 2005 era from the reshuffled stream. Path objects (222 — a
world-changing vector is not free just because its diff has no draw call): day **+0.12%**, night
**+0.26%** — flat.

**Visual.** Two agents, blind, crossed A/B mapping (238), asked to LOCATE with an answer key I held
(108). **Both convicted HEAD.** Seed 7: HEAD *"almost buried… at 1x you would never find it"*; the
patch *"reads instantly as an observatory… nothing tall in front"* — and it said outright that the
patch **"is the correct behaviour"**. Seed 1234: HEAD *"I cannot find it. Frame centre is a solid
wall of lit towers… 100% buried"* — which is the probe's 97.8% / 8 px, confirmed blind by an eye.
Its patch read (*"only the cap, 25–30%"*) contradicted the measured 3.7%, so I **looked at that one
PNG myself**: the dome sits in the open on a green hex beside a pond, nothing in front of it. The
agent conflated **small** with **buried** — which is a real, separate cue, banked below.

**Verdict. DEEPENED.** The observatory's label has promised the dark rim for the artifact's whole
life; the rule dropped it anywhere, and three seeds in six the city buried the landmark it had just
built — one of them down to eight pixels. It now stands where its label always said, and where you
can see it.

## Iteration 260 — the season was there all along, painted on the one channel nobody can see (2026-07-14) [holistic step-back, 32nd]

**Vector.** The 32nd whole-city step-back (due at 256+4; every domain has now had a lap). No artifact
code was written: `solvista.html` is **byte-identical to HEAD**. The lap is 257 (sea sky-mirror) +
258 (taxi fares) + 259 (observatory siting).

**Visual.** `shot-stepback.mjs`, 2 seeds x 3 lights x 2 calendars; every frame self-reported clean
(`sun=UP` at day/golden, `down` at night, `HUD=ok`, day/night pinned off winter at `year=2035.62`).
**Both agents FAILed, on both seeds** — and all three of their FAILs had to be graded, not obeyed:

- **"No downtown — uniform tower sprawl, no taper."** ⇒ **REFUTED.** `probe-taper` (pure world data):
  the tallest tower stands at **ring 1** (seed 42, th 173) and **ring 5** (1234); `corr(th,core)` =
  **0.82 / 0.80**; top-10 tallest mean distance **5.7 / 3.8** against **21.2 / 23.5** for developed
  land; the envelope tapers monotonically (173 -> 139 -> 135 -> 102 -> 88). This is **224's projection
  law** paying out exactly as it predicts — `corr(screen apex, true height)` is **0.26** while
  `corr(screen apex, depth)` is **0.995**, so *an eye cannot judge a skyline from a whole-city frame*.
  An unanswerable question, confidently answered wrong. **Do not re-open `c.th`.**
- **"Golden hour collapses beach/road/farm into one terracotta mass."** ⇒ **the KNOWN (s) residue, and
  its loudest claim is false.** `probe-goldenhue` reproduces the banked number exactly (PARK<->ROAD
  **29 -> 24**, a ~20% narrowing) and **BEACH<->ROAD measures 72 at golden — the WIDEST pair in the
  table.** Nothing crosses the 15 collapse floor that was not already under it by day (RES<->ROAD is
  11 at day, 10 at golden). 222's night ordering invariant still **PASSes by 21**. Not new drift.
- **"Winter is indistinguishable from summer."** ⇒ **CONFIRMED — and it is the finding.**

**The finding (LAW in SKILL.md).** 253 gave the sunlight a calendar and proved it: real, centred,
byte-identical at its fixed point. It is also **invisible**, and the two facts are not in tension.
My first instinct was the banked magnitude rig `probe-seaamp` — domain-agnostic, takes two PNGs,
exactly the right shape — which graded the season at **mean 6.4, median 2.0, d=0.27** and would have
had me file *"real but sub-threshold, tune it up."* **`probe-seaamp` measures LUMINANCE, and 253's
tint is NORMALISED TO HOLD LUMINANCE FLAT** (*"winter comes out COOLER and never DIMMER"*, L461). I
had aimed a greyscale instrument at a design's own null space — **228's law recursing a SIXTH time,
on a probe this harness already owned.** The complaint's noun was *"cooler"*: a colour word (214).

Re-measured in the units the feature is written in (`probes/probe-seasonhue.mjs`, new; identical-pin
floor **exactly 0.00** on all 3 seeds), with **golden hour carried as an incumbent bar I did not
invent** (226) — a light change every agent calls obvious:

| light change | warm-cool (R-B) | **luminance** | seen? |
| --- | --- | --- | --- |
| golden hour **[BAR]** | +24.9 (d **0.43**) | **-24.7 (d 0.69)** | instantly, by everyone |
| winter (253's season) | **-30.2 (d 0.52)** | **-3.4 (d 0.09)** | **by nobody** |

**The season moves the colour axis 1.2x HARDER than the golden hour does, and is invisible; the golden
hour moves LUMINANCE 8x harder, and is unmissable.** (Seeds 42/7/1234: 121% / 120% / 125%.) The chroma
amplitude was never the problem. **A global multiplicative cast on every surface at once is precisely
the transform human vision divides out** — it is what colour constancy is *for* — so a viewer reading
one frame at a time re-normalises it away and sees a normal daylit city. **The season carries no
luminance, no contrast and no shadow signature: every channel the eye actually reads is flat across
the calendar.** And the cause is a law of our own: **223's normaliser** (`n=1/(1-0.0308c)`), which is
*correct* on a ladder of per-surface washes where luminance drift is a bug (222), is on a **whole-scene
illuminant** the thing that zeroed the only channel it could have been seen on.

**SUSPECT, NOT FIX (198).** The season needs a **non-chromatic** channel. I name no lever — but note
the convergence: the header's own banked leftover from 253 (*"day length: the sun still rises and sets
at the same hour all year; it must move the whole `KEYS` curve seasonally — a real Sky x Deepen swing,
still unspent"*) is the one candidate that would move `lit`, brightness **and** shadow length at once.
The next Sky lap should re-derive its own instrument from that (228), not inherit mine.

**Census.** PASS. Artifact byte-unchanged, so every metric +0 and the tile histogram is empty — the
correct and vacuous result for a step-back; it proves only that no page threw.

**Perf.** LAP (vs 256, `3720e79`): day **+1.3%**, night **-0.3%**. And never `perfab` alone (216) —
`probe-drawbudget` gives the mechanism: path objects **110,783 -> 111,018 day (+0.21%)** and
**139,579 -> 139,890 night (+0.22%)** across three iterations. Night profile unchanged (`winBandR`
32.1% · `prismS` 29.1% · `hexTile` 12.0% · `bandS` 7.5%). **ARC** (vs 177, `7e2ac2c`): day **+18.8%**,
night **+13.0%** — inside both banded series (day 18.1-19.0, night 12.4-13.2 since 242). **The arc has
now been flat across FIVE consecutive step-backs / 18 iterations.** Still structural, not luck: a
domain past additive saturation stops costing frame time. **Do not open a perf lap.**

**Elevated transit.** Both agents raised it again, unprompted (*"dark overhead wire/transit lines
crisscross the entire plate like scratches"*, *"the overhead-wire lattice is the single noisiest
element"*). That is **reports #11 and #12** — the most-reported defect in the ledger by a wide margin,
already named with a number (256: `drawMonoAt`, 2,747px, 2.1% of the frame). Both agents again
confabulated a cause (power lines; a stray arc with no source). **The fault is LEGIBILITY, and it is a
`polish-tile` lap that is now badly overdue.**

**Verdict. FIXED (the harness).** No new compounding drift: the skyline is measurably intact, the
golden-hour residue is the one already on the books, and the perf arc is still stopped. The city is
healthy. What the step-back found was in the *instrument* and in a *law* — the loop had shipped a
season, measured it with a probe built on the one axis the season deliberately does not move, and
believed itself. Two blind agents were right for eleven iterations and no gate could hear them.

## Iteration 261 — the season was invisible because it had no clock (2026-07-14) [Sky & atmosphere × Deepen]

**Vector.** Sky & atmosphere × Deepen — the ledger's **#1 cue (aq′)**, banked by the 32nd step-back, whose
lone named candidate was **day length**. (Law 119: a banked, measured finding outranks kind-rotation.)

**The defect, restated.** 253 gave the sunlight a calendar and 260 proved that calendar **real and invisible**:
winter moves the warm-cool axis **d 0.52** — *harder than the golden hour's 0.43, the light change every agent
calls obvious* — and moves **luminance d 0.09**, where the golden hour moves **0.69**. A season painted as a
**global multiplicative chroma cast is precisely the transform colour constancy divides out**, so four blind
agents on two seeds reported *"no cooler light."* Both they and 253 were right. The season needed a channel the
eye cannot normalise away, and the one the sky owns is **when the sun is up**.

**Change.** `sunWarp(t)` — **one sine on the light curve's TIME axis**, never on its altitude:
`u = t + dayLen()·sin(2π(t − NOONT))`, pinned at two fixed points (solar noon `NOONT`=(SUNUP+SUNDN)/2, and solar
midnight, where `sin` is 0). Winter *advances* the curve through the evening and *retards* it through the morning;
summer the reverse. `SUNUP`/`SUNDN` keep their values — they are still the curve's own dawn/dusk keyframes.
**ONE predicate, FOUR readers** (`SUNT`, set once a frame): `daylight()` (sky, tint, `LITAMT`), the shadow vector
(`SHOFF`/`SHLEN`/`SHAMT`), the sun disc (`sunP`), and `nightDeep()` (the city's bedtime — read raw, a summer city
was 42% into its night at the moment the sun set). `DAYLEN=0.10` is bounded by **monotonicity, not taste**: the warp
folds at 1/2π = 0.159.

**Two structural guarantees, not checked ones (223).** (1) **The sun's arc is untouchable.** `sunP` is a pure
function of `SUNT`, and `SUNT` has `dayT`'s range ⇒ **the disc cannot reach a screen position HEAD did not already
reach** (so ⛔ 200's placard law holds by construction, not by care), and `sunWarp(NOONT)===NOONT` because `sin(0)`
is 0 ⇒ **it hits its identical peak at solar noon in every season.** Only the *timing* moves. (2) **The fixed point**
(245): `dayLen()` is centred on the season's mean, so at the mean it is **exactly 0** and `sunWarp` returns `t` to the
last bit — the patch runs HEAD's byte-identical code path.

**Census.** PASS, 0 page errors. `pop`/`roads`/`developed` **+0**; whole matrix flat; tile histogram empty — correct,
and *vacuous*, which is why the probe is the gate.

**Probe** (`probes/probe-daylen.mjs`, `probes/shot-daylen.mjs`).
- **A — the defect as a number** (pure world data, no render, drives *the artifact's own* `sunWarp`): HEAD's sunset is
  **0.780 in every season — DISTINCT DAY LENGTHS = 1**, a baseline nobody had to design (236). Patch: sunset
  **0.701 (winter) / 0.780 (equinox) / 0.831 (dry peak)**; day length **0.572 → 0.730 → 0.831**.
- **B — is it VISIBLE?** The season's **luminance d, swept across the whole day** (not at the one hour my feature is
  loudest — 205), against **golden hour as the incumbent bar I did not invent** (226). HEAD is luminance-dead at
  *every* hour (**d 0.06–0.15**). Patch: **evening d 1.59 / dawn 1.55** — i.e. **2.3× the golden-hour bar (0.69)** —
  while **NOON, the free must-not-move control, does not move (0.09 → 0.09)**. Identical-pin floor **exactly 0 px**.
- **C — the fixed point**, by 253's predicate suppression *inside one page* (floor exactly 0, build-agnostic): at the
  season's mean, live-vs-suppressed = **0 px**; in winter, **3,800,369 px**. ⚠ **The pin cannot be a YEAR** —
  `year=2035.87` is not representable in float64, so `dayLen()` lands on −1.8e−10, the guard never fires, and the
  artifact's own colour quantizers (`seaFace`'s round-to-32nds) flip a bucket worth ~332 px. **Pin the SIGNAL, not the
  year** (`seasonCool = () => 0.5` ⇒ `dayLen()` is 0 by arithmetic).
- ⚠ **C2 (cross-build patch-vs-HEAD) was built, run, and CUT — 230's law, re-confirmed.** The HEAD-vs-HEAD floor came
  back at **98,000–706,000 px**, and at noon the "signal" (478,871) sat **below its own floor** (706,045). *Do not
  re-add the build swap.*

**Perf.** FREE, and by the deterministic instrument (216/222, never `perfab` alone): path objects
**day 111,002 → 111,039 (+0.03%)**, **night 140,017 → 138,471 (−1.1%)**. It is a coordinate remap of a lookup the
frame was doing anyway — no new draw call, and the world is unchanged (census flat), so 222's "the world is the draw
list" does not bite.

**Visual.** Three blind agents, two seeds, **crossed A/B map, named by FILE never by a letter** (238/239), asked to
**rank and pair** rather than judge (108). All three were right: they ranked patch-summer as **DAYLIGHT**,
patch-winter as **NIGHT**, and — unprompted — **named the two HEAD frames as the indistinguishable pair**, which is
exactly the ground truth (HEAD's light curve carries no `year` term). Seed 7's agent added, correctly: *"frame1 is
full night while frame4 is full daylight at the same late-afternoon clock — a large seasonal swing, worth confirming
it is intended."* It is the feature.

**One real bug found, and it was MINE — in the camera, then fixed at SOURCE.** Seed 42's first read FAILed: *"a night
sky, stars and a full moon, behind a fully daylit midday city."* `syncSky` read `SUNT`, which is only set **inside**
`render()`, and the camera called `syncSky` *before* `render()` — so it painted the CSS backdrop from the **previous
frame's** clock. The app happens to call `render(); syncSky()` in that order and was never wrong. But **a correctness
that rests on call order is a latent bug, not a design** (223): `syncSky` now warps its own clock
(`daylight(sunWarp(dayT))`), one `sin()` per 400 ms, and the coupling is gone. Re-shot, both noon frames PASS and a
blind agent calls patch and HEAD at noon *"essentially the same image"* — the control the probe predicted.

**Verdict: SHIPPED.** The ledger's #1 cue, closed. The season is now the first thing you see: at the same clock, the
winter city is dark and lamplit while the summer city is still in full afternoon sun.
