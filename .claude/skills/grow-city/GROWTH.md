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
| **Nature** | 4, 26, 29, 102, **156**, **174** | 1, 13, 60, **206** | 37, 46, 67, 76, **108**, **120**, **139**, **166**, ~~**233**~~, **238**, ~~**246**~~, **263** | ~~46~~, ~~88~~, ~~101~~ | U4 | 53, 96, **194**, ~~**198**~~, **215**, **221**, ~~**251**~~ | **117**, **129**, **148**, **183** |
| **Water & coast** | 6, 10, 12, 16, 20, 33, 106, **169** | 90 | 17, 25, 51, 65, 72, **113**, **123**, **159**, **196**, **245**, **257** | 22, ~~**205**~~ | | U2, 44, 58, 79, **116**, **132**, **150**, **185**, **214**, **223**, **234**, ~~**255**~~, **266** | **97**, **141**, **176** |
| **Urban fabric** | 32, 62 | 7, 23, ~~82~~, **151** | 38, 54, 68, 92, **165**, **173**, **189**, **199**, **209**, ~~**218**~~, **219**, ~~**254**~~ | 47, **109**, ~~**160**~~ | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103**, **110**, **118**, **124**, **143**, **180**, **216**, **220**, **224**, **228**, **235**, **239** | **133** |
| **Transport** | 2, 9, 21, 31, 48, **164** | 77 | 28, 39, 55, 63, **112**, **121**, **128**, **155**, **179**, **193**, **230**, **249**, **258** | 5, 15, **138**, **211** | U4 | U1, U3, 70, 85, 87, 94, **146**, **188**, ~~**203**~~, **241**, **243** | **105**, **171** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107** | 36, 59, 66, 80, 91, **149**, **158**, **175**, ~~**195**~~, **213**, **244**, **250**, **259** | 45, **204** | | 73, ~~**114**~~, **168**, **231** | 52, 122, **140**, **184** |
| **Sky & atmosphere** | 27, 43 | | 19, 35, 50, 57, 95, **135**, **153**, **161**, **181**, **190**, **208**, **225**, **236**, **253**, **261** | | | 61, 81, 89, **115**, **200**, **242**, **248**, **265** | ~~**134**~~, **144** |
| **People & activity** | 41, 56, **127**, **170**, **186** | 49 | 34, 64, 93, **104**, **119**, **145**, **178**, **201**, **210**, **240**, **247**, **262** | 78, **111** | | 84, **137**, **163**, **226** | 71, **154**, **191** |

- **Interaction/UX — the FEATURE INVENTORY was rotated to the archive at 211 (history, not steering).** ⚠ **229 is
  cross-cutting (the TEXT LAYER: `<meta charset>`) and REPEALED 134's rule** — raw UTF-8 in JS string literals is now
  SAFE (`probes/probe-charset.mjs` asserts it), so **do not hand-escape a `·` or an `é`.** What steers: when adding an
  entity array, `stamp()` it in its draw + add an `ENTINFO` row (same discipline as the census hook); `stamp()` also
  draws the focus ring, so any stamped entity is ringable free. **An `ENTINFO` `sub` may be a FUNCTION of the entity
  (105)** — use it when a thing's interest is its *membership* (line/route/depot), computed live, never a string.
- **ROTATION.** Last vector per domain: Urban **254** · Transport **258** · Civic **259** · People **262** ·
  Nature **263** · Sky **265** · Water **266**. ➡ **NEXT: Urban (254) is BY FAR the most overdue (12 laps)** — ⚠ but read
  Urban's two ⛔ below first (colour channel + building look are both SPENT; its next lap is neither massing nor facade),
  and 225's grep-the-seam law is **8 for 8** on domains the header had written off. **The one named Urban remnant is the
  harbour apron — and cue (o) says a port vector must BUILD THE WATERFRONT FIRST.** ✅ **(s) CLOSED BY 265 · (ap) CLOSED
  BY 266.** ➡ **Top open cue is now (aj)** (the clouds spawn with no reference to the land — Sky × Polish, doubly
  measured, ~2x the visible weather at zero new draw work).
  ✅ **264 WAS THE 33rd STEP-BACK — NO COMPOUNDING DRIFT IN THE CITY; THE CAMERA WAS THE BUG.** Both agents FAILed both
  seeds on *"winter is indistinguishable from day"* and **were RIGHT ABOUT THE PIXELS**: `shot-stepback` shot the season
  at **`t=0.30`, its NULL HOUR** (`probe-daylen` `d(LUMA)` **0.15** — below 254's 0.4 floor, *on top of its own noon
  control* at 0.09; the evening margin reads **1.58**), because **261 made the season a CLOCK and a day-length season is
  ~0 at mid-day BY CONSTRUCTION.** Pins are DERIVED now, not literal; re-shot, **both seeds PASS and both agents named
  winter BLIND on a crossed mapping, by the light alone.** ➡ **NEXT STEP-BACK ~268.** **Perf arc HEALTHY: +3.7% day /
  +1.5% night over 32 laps (~+0.12%/iter).**
  🔑 **THE ONE REMAINING BANKED DEFECT IS `polish-tile` (a)**, the elevated transit — **13x reported (264 makes it
  #13), the ledger's most-reported defect by a wide margin, and a `polish-tile` lap is BADLY OVERDUE.** ⚠ **259
  ADDED A SECOND `polish-tile` CUE (e) — see the backlog.**
  ⛔ **255: DO NOT PAINT A *PER-HEX* SIGNAL INTO THE WATER'S BODY COLOUR.** A field **sampled per hex and rendered as a
  flat hexagonal FILL terraces onto the LATTICE**: SUBTLE (**d=0.57** ⇒ both blind agents saw **nothing**) or BRIGHT
  (**d=1.15** ⇒ *"a high-contrast hex QUILT... not a sea"*), **no middle**. The glitter escapes ONLY as a **low-alpha
  overlay** (max 0.16). ⚠ **257 NARROWED IT: the MECHANISM is PER-HEX SAMPLING**, so a term with **no `x`/`y`** cannot
  terrace. ⚠ **266 IS THE WAY THROUGH IT: a SHAPE that runs ALONG the tiling — sub-hex WIDTH, multi-hex LENGTH.**
  ⚠ **THE SEA'S OWN GRAIN IS THE NOISE FLOOR**: `seaT[]` is depth-in-eighths **+ two `hashCell` octaves** ⇒ within-sea
  luminance **SD 22.3**, which a blind agent on *pristine HEAD* called a honeycomb over *"90–100% of the open water."*
  ⚠ **NOT Urban.** 225's grep-the-seam law is **8 for 8** (263: Nature's seam handed over an excitable-media CA that had
  NEVER RUN) — it went **6 for 6** at 254 (the seam was rich — `c.age`, 36 writers, published as `Built ~1998`, read by
  NO pixel) and the lap **still REVERTED**, on a *structural* ceiling: see the ⛔ below. Known-closed in Urban: the
  building look (228/235/239), the ground plane (209), the facades (216), **now the COLOUR CHANNEL (254)**; the
  **harbour apron** is the one named remnant, and cue **(o)** says a port vector must **build the waterfront FIRST**.
  ⚠ **Read the `peds` cap first** (111) before designing anything road-borne.
  ⛔ **254: THE BUILDING COLOUR CHANNEL IS SPENT — DO NOT RE-TRY *ANY* "THE BUILDINGS SHOULD SHOW X REGIONALLY" IN
  COLOUR** (age, value, density, flow — anything; law in SKILL.md). The `cream`/`terra`/`sandDk` grain scatters
  per-building warmth at **SD ~45**, *larger than any gap the lever can reach* (**d** plateaus at **0.65**); two blind
  agents: **`NO REGIONAL PATTERN`**. **99/103/239 bought that grain ON PURPOSE to kill wallpaper.** ✅ **THE HOST IS
  STILL LIVE AND UNREAD** (`c.age`, coherent + monotone core→rim: *the old town IS downtown*) — **but only a SHAPE, an
  ORNAMENT, a COUNT can show it. Never a hue.** (`probes/probe-buildingage.mjs`.)
  ✅ **CLOSED, bodies archived at 264: (aq′) the season has a DAY LENGTH** (⚠ retire `probe-seasonarea` as a seasonal
  score; ⚠ **264: the season is ~0 at MID-DAY by construction — measure/shoot it at the EVENING MARGIN**) · **262: the
  `LITAMT`-as-a-bedtime gate is EXTINCT** (⚠ **do not add another global-light gate to anything that keeps hours**).
  🔴 **HOW TO READ THIS CUE LIST (251/255).** A bad instrument does not misgrade a lap — it **MANUFACTURES A CUE** that
  steers the loop for tens of iterations ((ag) was #1 for **24 iterations**, false on every count). 🔑 **A CUE
  RE-CONFIRMED IS NOT CORROBORATED UNLESS A *DIFFERENT* INSTRUMENT DID IT.** 🔴 **228's law has now recursed SEVEN
  times, EVERY TIME on an instrument this harness already owned** (237×2 · 238 · 251 · 255 · 260 · **264, the step-back's
  own CAMERA**) ⇒ *read what an instrument MEASURES and WHERE IT SAMPLES.* ⚠ **263: a cue can also be RIGHT about the
  tell and WRONG about the host** — check the host's **POPULATION** before designing to a cue.
  ⛔ **259: `c.lit` CANNOT EXPRESS DARKNESS** — `lit = LITAMT*(0.35+0.65*c.lit)` has a **0.35 floor** ⇒ `c.lit=0` is
  *35% lit* (rendered range **2.9:1**); siting the observatory at 0.000 moved ambient luminance **−1.9%**, invisible.
  **Fine as a CHOOSER, dead as a LOOK ⇒ do NOT build "X answers the night glow" in COLOUR.** (Law in SKILL.md.)
  ⚠ **ARTIFACT FACTS from 236–261 that are NOT laws and CANNOT be re-derived from SKILL.md** (the law-recaps these
  lines used to carry are in `GROWTH-archive.md`, "rotated out at 256"):
  **266:** **`WROWK`/`WROWL` — the sea's windrows.** ⚠ **A ROW TRAILS UPWIND (west + slightly north) BECAUSE THAT IS A
  Z-ORDER DECISION, NOT A LOOK** — draw order is depth order, so the tail must lie over hexes *already painted*; point it
  downwind and every later row and column paints it out. Its upwind run is truncated by a walk over `cellAt`, so it can
  never touch land. **Day-only** on the caps' `LITAMT<0.6` gate ⇒ the night frame is byte-identical and is a **free perf
  noise floor** (199). ⚠ **`probe-seaamp` CANNOT GRADE IT** — it area-means over the whole ocean and a row paints 2% of
  it (law in SKILL.md); use `probe-seastate` (ink/px) + the agents.
  **263:** **`bloomHost` — ONE predicate, FOUR readers** (the excitable-media spread in `tick()`, the rain front that
  seeds it, `bloomAt()`, the tooltip's `Wildflowers` row). Host = **MEADOW + SHOREPARK**. ⚠ **THE BLOOM CA DRAWS NO
  `rng()` AT ALL** — spread *and* spark are `hashCell(x,y,seedNum^SALT^TICKN)`, so it is **wholly inert** (it writes
  `c.bloom` and nothing else). **Do not "tidy" it back onto `rng()`**: a terrain-gated roll on a ~100-hex host spends
  ~2.5 extra draws a tick and reshuffles the city. ⚠ **`TICKN` IS PART OF THE WORLD AND IS RESET IN `genWorld`** — if a
  tick-salt survives a rebuild, the same seed renders *different flowers*. **Any new tick-salted hash resets with the
  world.** ⚠ **THE REFRACTORY IS JITTERED (`-(9+(c.v*10|0))`, mean 13.5 ≈ HEAD's 14) AND THAT IS LOAD-BEARING** — a
  *shared* constant refractory **synchronises** the band (41% of ticks had **zero** flowers city-wide). `c.v` is a
  uniform the cell already carries ⇒ **no new random draw** (262). **Do not flatten it back.**
  ⚠ **DUNE and PARK were MEASURED and REJECTED as hosts** (biggest connected component **6** and **14** vs SHOREPARK's
  **34**) — they can only speckle, never carry a wave. **Do not add them.** ⚠ **GARDEN IS NOT A LAP: it is 2–5 hexes a
  city** (the census histogram says so; 206's fix under-delivered) — cue (p)'s staggered beds would be invisible (259).
  **262:** `kidOut`/`kidHidden` — ONE predicate, **three** readers (the draw, the tooltip `withChild`, the probe). The
  **LADDER OF HOURS** is `KID` (in by `nightAmt` **0.34**) < `JOG` (0.62) < `CURF` (to 1.85) — **take a new entity's hour
  from this ladder, do not invent one** (226). ⚠ **`kidOut` is DERIVED, NOT DRAWN**: `p.kid` is already a `Math.random`
  uniform (`1+rand*6`), so `(kid/6)%1` is *exactly* uniform at **no new random draw** — the only reason `probe-kidbed`
  can carry the adults as an **exact** must-not-move control. **Do not "tidy" it into a fresh `Math.random()` at spawn**
  (shifts the shared stream, walks every dog's owner — 204). ⚠ **`Math.min(p.out, …)` is STRUCTURAL** — a child can
  never be left out later than its parent. Do not weaken it.
  **261:** **`SUNT` IS THE LIGHT CURVE'S CLOCK — NOT `dayT`. ONE predicate (`sunWarp`), FOUR readers**: `daylight()`
  (sky/tint/`LITAMT`), the shadows (`SHOFF`/`SHLEN`/`SHAMT`), the disc (`sunP`), `nightDeep()`. **Anything new asking
  "where in the day are we" reads `SUNT`, never `dayT`** — `dayT` is now only the raw *counter* (the moon, `matchClock`,
  the hall clock read it, and MUST: they want days, not hours). Set once a frame in `render()` (`windarkAt()` reads it
  ~2.7k times a night). ⚠ **`syncSky` warps its OWN clock on purpose** — reading `render()`'s `SUNT` made the CSS
  backdrop depend on render having run, and painted a night sky behind a daylit noon city. ⚠ **`SUNUP`/`SUNDN` ARE
  THRESHOLDS ON `SUNT`, NOT `dayT`** — tested against the wall clock they print `sun=UP` on a winter dusk whose sun has
  set (264). ✅ **264: `shot-stepback` DERIVES every pin from the curve (no `t` literals) — golden = argmax GWARM; the
  season = a dusk PAIR at one instant, sun UP in summer / DOWN in winter.** **259:** `siteDark` — the dome is chosen by
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
  **250:** `concertSeason()` — ONE predicate, four readers. **249:** `ferryApp`/`ferryFr`/`ferryThr` — ONE predicate,
  four readers; ⚠ **`f.sp` KEEPS ITS SIGN** (the THROTTLE goes to zero, never the velocity). ⚠ **NOT cue (o): the PIER
  has a waterfront, the HARBOUR does not.** **245:** `seaState()`, floor `SEACALM`. **242:** ⚠ **MARSH/KELP no longer
  catch cloud shade** (`WETSET`). **241:** `RAILCAP=130`. **236:** ⚠ **`cl.rain` IS GONE** ⇒ **`cloudWet(cl)`**.
  ⚠ **244: TURNING THE AMPHITHEATER'S BOWL WAS BUILT AND REVERTED — DO NOT RE-TRY** (the projection cannot carry it).
  ⛔ **(ai) RETIRED (246) — UNREACHABLE, DO NOT RE-OPEN** (archived 263): no paired addition exists, **the ROADS fragment every lobe**. ➡ The complaint is real; re-derive it from its nouns.
  ✅ **CLOSED LADDERS — DO NOT RE-OPEN. Bodies archived; every law is in SKILL.md.** The **WASH ladder**
  (214→220→221→223→**234**; **audit by `dHUE`, never a target hue**) · the **TOWER LOOK** (228 crown + **235**
  footprint) · the **SKYLINE ladder** (217→224, `c.th` SPENT) · the **HUD lap** (229 — both cues were the HARNESS) ·
  **137's standing-crowd cue** (226) · the **SEASONAL-VEGETATION seam** (238 + **252** — measured-capped). ⚠ **230's
  `taxi` flag is LOAD-BEARING** (`VCURF` thins the night fleet by CLASS). ⚠ **(y) was born from an agent reading
  `shoot.mjs` output — REPRODUCE it in the user's configuration first** (229). **Interaction/UX** last touched **229**.
  **CUES, RANKED** (CLOSED: (w)/(z) 229 · (t) 231 · (u) 234 · (af′) 235 · (al) 239 · (am) 241 · (an) 243 · **(ah) 244**;
  **(aj)'s SHADE half CLOSED 242 — its cloud-SITING half is still open**; **(ao)'s SHAFT half CLOSED 248 — its BOW half
  is REFRAMED and its prescription REFUTED**; **(ab) RETIRED into (ak) 238**; ⛔ **(ai) RETIRED 246 — UNREACHABLE, do not
  re-open** · ⛔ **(ag) CLOSED 251 — REFUTED on every count, do not re-open** · ✅ **(aq) CLOSED 253**):
  **(aj)** the clouds spawn with no reference to the land, so a seed parks its sky over the sea — **the lever is the SPAWN, not the draw**: ~2x the visible weather at **zero new draw work** (Sky × Polish, doubly measured) ·
  ⛔ **(ak) MEASURED-CAPPED and its prescription DEAD** (238 + 252) — **(aq) supersedes it; do not re-open the canopy** ·
  ✅ **(s) CLOSED BY 265 — 214'S LAW AT THE OTHER END OF THE DAY; THE LADDER HAD ONLY EVER BEEN BUILT FOR THE NIGHT.**
  The golden tint `[.92,.72,.66]` crushes G and B, so every surface whose identity is its GREEN had R overtake G and
  rendered **ORANGE** (grass **NOT GREEN on 3/3 seeds**, dHUE **32°** vs the warm surfaces' **14°**; all land inside a
  **9° hue band**). `LEAFN` now passes `goldenWash()` into the SAME `washRGB`; `sandCol` passes none and is
  byte-identical, so the land still **blazes** at dusk (257). ⚠ **DO NOT DE-WARM THE SCENE — protect the complement.**
  ⚠ **`goldenWash()` reads `TINT`, NEVER `GWARM`** (`CCACHE` is keyed on TINT's flush ⇒ a GWARM dial serves stale
  colour). Instrument **`probe-greenhue`**, NOT `probe-goldenhue` (it samples the PARK HEX, 43% season-dead) ·
  **(y)** the scorched inland cluster (Nature × Polish; ⚠ **one 216-era aside — the light was rebuilt at 253/261, so
  RE-DERIVE it from a fresh frame before designing**) · ⛔ **GARDEN's staggered beds are RETIRED (263, host starved)** ·
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
  gap — **and it eats CA HOSTS too: anything in `RAISEABLE` will be built over** (263). **⚠ THE FIRE CA IS A GHOST — do
  not build "X answers the fire"**: ignition is year-gated ⇒ at 2035 nothing can ignite, and fire **never spreads**.
  **⚠ THE `polish-tile` BACKLOG — measured cues that are NOT growth laps. Do not spend a domain's lap on one; they
  need a tile redesign, and each has a gate written.** ⚠ **(a), (e) and (f) ARE ONE FINDING — 215's HAIRLINE LAW** (a
  sub-pixel ornament *tints* its background instead of marking it; **the lever is a BODY / SIZE / CONTRAST — never more
  strokes, never placement**). **Full bodies archived at 264; the live warnings only:**
  (a) **THE WHOLE ELEVATED TRANSIT is sub-pixel at fit zoom** (0.5px rope, 5px cabins). ⚠ **NEVER RE-OPEN THE Z-ORDER —
  CLEARED BY PROBE TWICE** (203/212); **13 mis-diagnoses**, and *that persistence IS the evidence: the fault is
  LEGIBILITY*. Suspect named + priced (256): **`drawMonoAt`, 2.1% of the frame.** *Do NOT re-try a body/halo under the
  rope (measured — backfires) nor a lit top edge (impossible at 0.5px).* **MOST-REPORTED DEFECT BY A WIDE MARGIN; a
  `polish-tile` lap is BADLY OVERDUE.**
  (e) **THE OBSERVATORY IS TOO SMALL TO READ** (259; dome ≈ **5.5 CSS px at fit**, on a frame where it is 96.3% visible).
  ⚠ **SMALL, not BURIED — do NOT re-open the siting.**
  (f) **THE WILDFLOWERS ARE SUB-PIXEL** (263; specks ≈ **1.1 CSS px at fit**, true of HEAD's meadow bloom too — a fact
  about the *vocabulary*). ⛔ **DO NOT RAISE THE PER-HEX BODY LIFT — that is 255's ⛔** (⇒ a hex quilt). ➡ The only way
  through is **a SHAPE THAT CROSSES TILE BOUNDARIES** (a drift of petals, a streak), never a brighter fill.
  (b) **`university` is the ONLY of the twelve civics with no `LITAMT`** — pitch dark after sunset; every place to put
  the light failed (195). (c) **A parked service vehicle needs its CIVIC TILE to have a visible apron on its front
  edge** (204). (d) **The marsh reeds do not read** — seven sub-pixel strokes round the pool; its calendar is computed
  and invisible (cue (i), 113).
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
  **THE FAIL/ASIDE LAW (212; law in SKILL.md, body archived at 263 — the header keeps the TALLY): in a whole-frame
  read the FAILs are where an agent is WRONG and the ASIDES are where it is RIGHT.** Paid out 213, 214×2, 215, 217, 219,
  232, 236, 242, 245, **263** (both agents' aside ⇒ cue **(f)**). ⚠ **237/252/255 INVERTED IT — the headline FAIL was
  RIGHT.** ⇒ **Grade a FAIL by MEASURING it; but when agents say "I CANNOT SEE IT", the burden is on your PROBE, not
  their eyes** (they are the only instrument that measures *salience*). ⇒ **262: a FAIL can convict HEAD — read WHICH
  FILE it names before you touch anything.** Weight an aside two agents reach independently above any verdict.
  Perf ARC (refs 202/207/212/217/222/227/237/242/247/252/256/**260**, directly comparable; priors archived at 233/236).
  ✅ **THE ARC IS STOPPED — FLAT ACROSS FIVE STEP-BACKS (series archived at 263). THE OLD `+0.2%/iteration` IS NOT
  BEING PAID; DO NOT QUOTE IT.** ARC vs `7e2ac2c` (177) held at day **+18.1..+19.0** · night **+12.4..+13.2** across
  242→260 — **EIGHTEEN iterations for NO measurable arc growth.** Night profile: `winBandR` 32.1% · `prismS` 29.1% ·
  `hexTile` 12.0%; `drawCell` 94%. **263: day +0.17% / night +0.07% path objects** (the bloom's flowers, priced and paid).
  🔑 **STRUCTURAL: a domain past ADDITIVE saturation STOPS COSTING FRAME TIME** (Deepen/Polish/predicate fixes are
  categorically cheaper). ⇒ **Do NOT open a perf lap.**
  🔑 **THE LAP TIMER OVER-READS; GRADE A LAP WITH `probe-drawbudget` BESIDE `perfab`, NEVER `perfab` ALONE** (216's law;
  bodies archived at 251). **Twice the LAP timer reported a stable +2–3% over a lap that MEASURABLY REMOVED draw work**
  — a cost with **no mechanism**. ⚠ **A WORLD-CHANGING VECTOR IS NOT FREE just because its diff has no draw call — THE
  WORLD IS THE DRAW LIST** (222; LAW in SKILL.md). ✅ **And it runs in REVERSE: a vector that REMOVES things gives draw
  work BACK** (241, −3.2% day). **Count objects when a lap SUBTRACTS too.** ⚠ **Cue (x) stands** (215's `seamVeg`: 692
  path objects / 228 STROKES cost ~4x the fill model — a stroke-vs-fill sweep at equal path count is the best-supported
  open perf question). **⚠ THE STANDING PERF SUSPECT (207, UNCHANGED at 232/237/252/**260**; NAMED not mandated per
  198): THERE IS NO HOT ORNAMENT — the arc is DIFFUSE**, which is why every per-lap gate reads it free. **No caching
  lap — 198's levers are CLOSED; the only lever is FEWER objects.**
  **The GAP-CLOSING trick (111/112/113) is SPENT; the TELL that replaced it (a label/name asserting what the draw
  ignores) is CASHED 9x and its host keeps moving DOWN: 199 a CONSTANT · 209 a COMMENT · 217 a HALF-FINISHED FIX · 238 a
  palette entry NO DRAW COULD REACH · 252 TWO CONSTANTS naming an event that never moves · **262 A SIBLING DRAW INSIDE
  THE FUNCTION A PRIOR FIX HAD ALREADY EDITED** · **263 A WHOLE CA THAT HAD NEVER RUN** (a tooltip printed
  `In bloom / Gone over / Not in flower` over a rule whose host the city had eaten and whose spark was aimed at the
  VOID) — see SKILL.md.** Still MUTE: `[T.IND]` (no calendar). ⛔ **GARDEN is RETIRED — host starved, see (p).**
  ⚠ 122: a tooltip vector needs a probe checking the claim against INDEPENDENTLY RECOMPUTED truth, not a screenshot.
  **Kind-picking, compressed (full text in `GROWTH-archive.md`, 204; the menu is in SKILL.md).** **Scale** is the
  coldest kind. **New element**: a saturated domain cannot take one, but saturation is of a domain's ENTITIES, so one can
  still land on a large untouched **SURFACE**. **107 was a New CA rule that ADDED NOTHING** — *auditing an existing rule
  for reachability* is free in every domain. ⚠ **Nature × Connect is the row's GRAVEYARD — REVERTED three times**
  (46 · 88 · 101). **Do not re-open it as a *corridor*.** **Cue (e½) CLOSED (102).** Nature's cold cells are Connect (leave it) and Scale. ⚠ **(ak) is MEASURED-CAPPED — see the ⛔ above; Nature's lap must come from a fresh grep of its seam, not from (ak).**
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
  **The COST MODEL is MEASURED (198, `probe-shadcost.mjs`; prose archived at 237): cost is PER PATH OBJECT rasterized —
  NOT per `fill()`, NOT per unit area; a sprite blit is WORSE. Batching fills, shrinking radii and sprite-blitting are
  all CLOSED; the only lever is drawing FEWER objects** (a *visual* decision — be willing to pay).
  **⚠ TWO HOLES, SAME SHAPE (body archived at 242): 198's table was measured on SOLID FILLS ONLY.** **GRADIENTS** (may
  price by AREA) and **STROKES** (215's `seamVeg`) have each come in **~4x over the model** — PAID and ACCEPTED, neither
  MEASURED. **Do not shrink a gradient or cull a stroke "because 198 said count is what matters".** ⚠ **THE DEAD-REGIME
  CONTROL (199)** and ⚠ **NEVER GRADE BY CONSECUTIVE PASSES (117)** are LAWS in SKILL.md.
  (**A 2+-round interleave overruns the 120s Bash timeout — do NOT pipe it through `tee`** (node block-buffers to a
  pipe; 197 lost a run that way): run it foreground, long timeout. **⚠ `cp` is aliased `-i` — use `/bin/cp`**, iter 147.)
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
  **all year**. ⛔ **(p)'s GARDEN HALF IS RETIRED (263) — DO NOT SPEND A LAP ON IT.** GARDEN is **2–5 hexes a city**
  (census histogram, 2035; 206's siting fix under-delivered), each ~40% occluded, its beds tiny prisms — so staggered
  per-bed calendars would be **a perfect field nobody can see (259)**. The tell is real and the HOST is starved. If
  GARDEN is ever reopened it is a **population** question first, not a calendar one.
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
  **(aj) THE SHOWERS FALL WHERE NOBODY LIVES (236; SHADE half CLOSED by 242, SITING half OPEN, DOUBLY MEASURED).**
  Clouds spawn `x:rng()*G, y:CTRY-20+rng()*40` with **no reference to the land**, so a seed parks its sky over the sea
  — **242's probe counted 4/7, 6/7 and 3/7 clouds off-land on seeds 42/7/1234**, the same defect from a second
  instrument. Only **3–4 of 7** soaked clouds ever render a veil (`probe-front` D; the
  draw spends a shower 2 hexes short of the rim). **The lever is the SPAWN, not the draw** — bias `cl.x`/`cl.y` onto
  the live rows (`ROWMIN`/`ROWMAX`, `HEXI`) for ~2x the visible weather at **zero new draw work**. ⚠ Rain over the sea
  is **CORRECT** (201) — this is about *coverage*. **Sky × Polish.**
  ⛔ **(ak) CLOSED/SUPERSEDED BY (aq) 253** — the plants were never the defect; **the season was missing from the LIGHT**.
  **DO NOT re-open the canopy, the lawn ((p) protects it), or a palette lap "to fix the seasons".** ⚠ **Mediterranean
  coast: GREEN WET WINTER + GOLDEN DRY SUMMER is CORRECT (201)** — no snow, no bare trees.
  ✅ **(al) 239 · (am) 241 · (an) 243 · (ao) 248 · (ar) 256 — ALL CLOSED; bodies archived at 266, WARNINGS only.**
  ⚠ **DO NOT RE-OPEN EITHER BUILDING** (228 crown · 235 footprint · 239 mid-rise); **EVERY FORM'S BASE IS ITS WIDEST
  PART.** ⚠ **DO NOT re-tune the elevated beam's draw** (measured IN BAND) **nor bound a loop's RADIUS** (makes stubs).
  ⚠ **`stepGond`'s value bar decays with NO FLOOR** — gated on `WETSET`; do not un-gate. ⚠ **`probe-darkline` is
  REPAIRED (243).** ⚠ **THE RAINBOW IS NOT A RIM BUG** (it already tests its LEGS; the defect was the COMMENT).
  ⛔ **(ar) WAS THE HARNESS, FOR THE THIRD TIME (229).** 240's aside, still unclaimed: *"tiny white chevron glyphs on
  land (x≈0.47,y≈0.47)."*
  ✅ **(ap) CLOSED BY 266 — THE FOAM COULD NOT BE GIVEN A SIZE, SO IT WAS GIVEN A LENGTH** (windrows; law in SKILL.md).
  Sea's calm→gale response **949–1,042 px → 8,725–11,101 px (9–11x)**; both blind HEAD agents reproduced the cue
  unprompted, both patch agents named the gale **from the water alone at fit zoom**. ⚠ **DO NOT re-open the sea's TILE
  FILL (255's ⛔ stands).**
  **(as) THE WINDROWS READ A TOUCH RULER-DRAWN** — both 266 agents, independently, two seeds: *"perfectly straight and
  uniform in thickness… a taper would sell it harder."* A **stroke cannot taper** ⇒ redraw the row as a **filled tapered
  lozenge** (still ONE path object ⇒ still free), S-curved spine, feathering out at the upwind tail. **Water × Polish.**
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

> **Archive:** the 259 entries before Iteration 257 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

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

## Iteration 262 — the city lost its children all at once, at the first dark frame (2026-07-14) [People & activity × Deepen]

**Vector.** People was the most overdue domain (last: 247). I did not pick a feature — I ran 225's
grep-the-seam law on it, and the seam handed me the defect in one read. It is now **7 for 7**.

**The find.** `drawPed` draws a resident, and beside ~18% of them a child. The parent is hidden by
`pedHidden(p) = nightAmt() > p.out` — the per-resident curfew iter 210 built, whose whole stated
purpose is that a crowd must thin *"one door at a time"* rather than blink out in a single frame.
The child, three lines below, inside the same function, was still on the gate 210 was written to
**condemn**: `if(p.kid && LITAMT < 0.5)`. `LITAMT` is **global** and monotone through dusk, so that
threshold fires for **every child in the city in the same frame**. 199 taught the windows to go to
bed, 210 the residents and the joggers, 230 the traffic — each replacing exactly this gate with a
per-entity hour. The child is the **third recursion and the last one**, and it had survived because
*"the children go home at dark"* is true, and nobody read it beside the line above it.

**Change.** `KID0/KIDJ` + `kidOut(p)` + `kidHidden(p)`. The band is taken from the artifact's **own
ladder of hours**, not invented (226 — set the bar from the incumbent): a child is in before a runner
(`JOG` ceiling 0.62) and long before the crowd (`CURF` to 1.85), so it keeps the **earliest hour in
the city** — every child in by `nightAmt` 0.34. `Math.min(p.out, ...)` makes *"a child is never left
out later than the parent holding its hand"* **structural, not checked** (223): on quiet ground they
go in together, on a lively kerb the child goes first and the parent stays.
**Derived, not drawn.** `p.kid` is already a `Math.random` uniform (`1 + rand*6`), so `(kid/6)%1` is
**exactly** uniform on [0,1) and costs **no new random draw** — both the seeded `rng()` stream *and*
the shared `Math.random` stream stay byte-identical. That is what lets the probe carry the adults as
an **exact** must-not-move control (250) instead of an approximate one.
**ONE predicate, three readers** (112 forwards): the DRAW, the TOOLTIP (`withChild` — *"A little one
in tow."* / *"The little one has gone in."*) and the probe.

**Probe** (`probes/probe-kidbed.mjs` — temporal (134: no frozen gate can see a cadence), reads **no
pixels** so it has **no noise floor at all**, and **build-agnostic**: it detects `kidHidden` and falls
back to HEAD's literal gate, so ONE file grades both builds — no source swap, no cross-build floor).
**HEAD's constant IS the baseline (236), so no threshold had to be invented:**

| | HEAD | patch |
| --- | --- | --- |
| **DISTINCT CHILD BEDTIMES** | **1**, every seed | 14/19 · 11/13 · 17/18 |
| max children lost per pin | **19 · 13 · 18** (all of them) | **2** |
| mean bedtime (`nightAmt`) | **0.009** — the first dark frame there is | 0.143–0.191 |
| left-by-parent | **0** — not one child, ever, in any city | 0 |
| **ADULTS** (must not move) | 81/84/81 distinct, mean .853/.954/.872 | **identical** |
| NOON (dead regime, 199) | 19/19 · 13/13 · 18/18 out | identical |
| child-in-before-parent | — | **0 violations** (structural) |

The adults are also the **free positive control** (248 — a correct sibling mechanism in the same
function): they read **81–84** distinct bedtimes, so the probe can plainly see a spread, and the
children's **1** is a real 1 and not a dead instrument.

**Census.** PASS. `pop`/`roads`/`developed` **+0**, tile histogram empty (draw-only). `solarRoofs +3 /
greenRoofs −1` on the first run was the harness, not me — re-run on the **same file** (226) it read
**+0/+0**.

**Cost.** Path objects **+0.03% day / +0.01% night** — but note *both* of `probe-drawbudget`'s pins are
regimes where the two builds draw the **same** children by construction (day: all; deep night: none),
so they are structurally blind to this feature and those deltas are noise. The real added work lives
only in the evening band and is **bounded by ~19 children × 3 path objects ≈ 57 objects (≤0.05%)**.

**Visual.** Both agents returned **`VISUAL: FAIL` — and both convicted HEAD.** With the build mapping
**crossed between seeds** (238), each independently named the build that drops the child at dusk:
seed 7 (`buildone`=patch) → *"buildtwo drops the child once lighting goes to dusk — a real
regression"*; seed 42 (`buildone`=HEAD) → *"buildone's child is not drawn at dusk... a time-of-day
bug"*. **They could not both have been right by guessing a letter.** Two blind agents, from pixels
alone, rediscovered the defect the probe found in the source and attributed it to the right file both
times. The **day twin** (258 — a required positive companion, since an absent subject and a correctly
absent subject render the same frame) showed the child in **both** builds, proving the camera works;
the un-zoomed city read balanced with no z-order tears, no floating, no clutter — one agent pixel-
diffed the two city frames at **75 px (0.0015%)**.

**Verdict: FIXED.** The children of Solvista no longer vanish in a single frame at the first dark
frame of the evening. They go in one at a time, ahead of the runners and long before the crowd, and
you can hover a resident and be told whether the little one is still with them.

## Iteration 263 — the wildflowers had no spark, and the city had eaten their meadow (2026-07-14) [Nature × Deepen]

**Vector.** Nature × Deepen. Rotation put Nature most overdue (last 251), and the header's live cue
said GARDEN was the last mute Nature tile. It is not the lap: the census histogram says **GARDEN is
2–5 hexes a city** (206's fix under-delivered), so a per-bed calendar there would have been a perfect
field nobody could see (259). Grepped the domain's seam instead — 225's law, now **8 for 8**.

**The seam.** `tick()` (~L2373) carries a real **excitable-media CA**: a bloom lives 7 ticks, falls
into a 14-tick refractory, spreads to quiescent neighbours, and is seeded by the rain front. Its draw
is the richest ornament on any green tile — a body lift, five gold/lavender/coral specks, and
**butterflies**. A tooltip row has printed `In bloom / Gone over / Not in flower` for the artifact's
whole life. And its entire host was one tile: `if(c.t!==T.MEADOW)continue;`

**T.MEADOW is in `RAISEABLE` (L1475) — the set the development pass BUILDS ON.** So the host is eaten
*by construction*: **68.3 → 4.5 hexes (93%)** between 1985 and 2035, two seeds in six reaching zero.
That is **206's law arriving on a CA's host** instead of a siting rule's pool.

**But the host was only half of it, and the POSITIVE CONTROL is what found the other half (250).** The
gate probe carries the MEADOW at 1985 — a correct sibling of the very mechanism under test — as the
column that *must* move. It came back **dead on 5 seeds in 6, with 61–96 meadows standing.** An
excitable medium that dense cannot be that quiet, so the rig or the CA was broken. It was the CA:
the spontaneous spark samples **`(rng()*G)|0` over the BOUNDING SQUARE**, three quarters of which is
`VOID` (the plate is a hexagon — the invariant's own warning), so its chance of landing on a host is
**~0.0017 a tick: one spark per 574 ticks.** *The wildflower CA has essentially never run, in any era,
in the artifact's life.* Without that control I would have shipped a host swap and called the
remaining silence a tuning problem.

**Change.** One predicate, four readers (`bloomHost` — the spread, the rain front, the draw, the
tooltip row). Host = MEADOW **+ SHOREPARK**, the coastal grassland the city *cannot build on*: ~100
hexes, **mean 4.0 same-host neighbours**, so a wave actually propagates (DUNE and PARK are fragmented
— biggest component **6** and **14** — and could only speckle). It already drew *static* wildflower
specks that never opened or went over. `bloomAt()` is the shared draw, so MEADOW's look is unchanged.
- **The CA now draws ZERO `rng()`.** The spread roll is terrain-gated, so a wider host would spend more
  draws every tick and reshuffle the whole downstream city — *a wildflower would move a tower*. It is
  `hashCell(x,y,seedNum^SALT^TICKN)` instead: stochastic per cell and per tick, and **wholly inert** —
  it writes `c.bloom` and nothing else. The rain seeder re-hosts for **free** (236 made its draws
  unconditional on purpose). The grid-wide lottery keeps its draws (259: do not tidy them away).
- **A per-host spark it can actually get** (`<0.004`, hashCell, no draw).
- **The refractory is JITTERED** — and that is what keeps the coast in flower. With one shared `-14`
  the band **synchronised**: it bloomed together, went over together, and **41% of all ticks had not one
  flower anywhere in the city**, so half the seeds opened on bare grass. `c.v` is a uniform every cell
  **already carries**, so the jitter costs **no random draw at all** (262), and `9..18` holds HEAD's
  mean of 14. Desynchronised, the waves overlap and the grass is never bare.
- **`TICKN` is reset in `genWorld`** — the camera caught this (202): the bloom's salt was surviving a
  world rebuild, so the same seed gave *different flowers* depending on how many frames had run. A
  `?seed=7` URL must always be the same city. Fixed; four load paths now agree.

**Probe** (`probes/probe-bloomhost.mjs` = the host, render-free; `probes/probe-bloomwave.mjs` = the
gate — TEMPORAL (134), drives the artifact's OWN `tick()`, reads no pixels, **build-agnostic** so one
file grades HEAD and patch with no source swap). **The headline needed no threshold** (236):

| in the rendered year (2035), 6 seeds | HEAD | patch |
| --- | --- | --- |
| hexes in flower **at load** | **0.0** (0 on every seed) | **21.0** (min **6**, max 32) |
| mean hexes in flower | **0.0** | **20.3** (peak 59.7) |
| seeds where the wave never lights in 150 ticks | **6 / 6** | **0 / 6** |
| MEADOW @1985 — the positive control | dead on **5/6** | blooms on **6/6** |

**Census: PASS** — `pop`, `roads`, `developed`, `towers`, `towerHt` **all +0**, tile histogram **empty**,
0 page errors. The CA is inert by construction. (`developed` over 6 seeds moves `0/0/0/−1/+1/−4` — the
dead CA never spent its spread draws, so moving them to `hashCell` cost the stream almost nothing.)
**Path objects: day +185 (+0.17%) · night +98 (+0.07%)** — the honest price of the flowers, and cheap.

**Visual: PASS, both seeds, both agents BLIND with the build→file map CROSSED between seeds** (238/239)
— and **both named the patch correctly** (`one` on 42, `two` on 7). Flowers sit inside the hexes, no
spill onto sand/sea/road, no z-order tears, "on-palette, a scatter not a carpet"; both whole-plate
frames "balanced… nothing compounded into clutter or darkness."

⚠ **THE ASIDE, REACHED INDEPENDENTLY BY BOTH AGENTS (212 — weight it above either verdict): the bloom
is a CLOSE-UP-ONLY payoff.** *"Neither city plate shows flowering at whole-plate zoom; the specks fall
below ~1px."* True, and **it is 215's hairline law**: the specks are 1.7px world units, ~1.1px at
`fitScale`. It is also true of **HEAD's own meadow bloom, which is the identical draw** — so "invisible
at fit zoom" is a statement about Solvista's wildflowers *as a vocabulary*, not an objection to this lap
(226: the incumbent is the bar). ⛔ **And the obvious fix is FORBIDDEN: raising the per-hex body lift is
exactly 255's ⛔** — a per-hex signal painted into a tile's body fill terraces onto the lattice and reads
as a hex quilt. Per 255 the only way through is **a shape that CROSSES tile boundaries**. Banked as a
`polish-tile` cue (f), not chased here.

**Verdict: FIXED.** Solvista has had an excitable-media wildflower CA — with butterflies — since its
first iteration, and it had never once run in the year anybody looks at. The meadow it was written for
was built over, and its only spark was aimed at the void. The coast is in flower now, and the wave
moves through it.

## Iteration 264 — the season was shot at the one hour it cannot be seen (2026-07-14) [holistic step-back, 33rd]

**Vector.** The 33rd step-back (33 laps; 260 was the 32nd). No new feature under test.

**The gates, in the order they ran.**

**Perf — the ARC is healthy, and the arc is the only reading that means anything here (202).**
`perfab.mjs REF=9cecd2e` (the lap, 261+262+263): **day +1.3% · night +0.6%**.
`perfab.mjs REF=d6b6f90` (**the ARC**, iter 232, 32 laps back): **day +3.7% · night +1.5%** — i.e.
**~+0.12%/iteration**, comfortably under the loop's historic **+0.2%/iter** and far under the +8.6%/40
that 202 measured. 241's network budget (−3.2%) is still paying for itself. **No perf-fix lap is owed.**

**Visual — FOUR FAILS, TWO SEEDS, AND EVERY ONE OF THEM WAS THIS HARNESS.**
The first pass FAILed both seeds. Both agents, independently, converged on the same headline:
*"winter is visually indistinguishable from day"*, *"no snow, no frost, no bare trees — winter is not
legible at all"*. Both also called the golden frame *"barely warmer than day"*, *"no visible long shadows"*.

**Probe — and it convicted the CAMERA, not the city.** `probe-daylen.mjs` (261's banked instrument), read
on the `d(LUMA)` column, because **luminance is the channel the eye actually reads and chroma is the one it
divides out** (260):

| pin | d(LUMA) | what it is |
| --- | --- | --- |
| 0.42 — noon | 0.09 | the probe's own **must-not-move CONTROL** |
| **0.30 — the step-back's winter pin** | **0.15** | **below 254's `d<0.4` "nobody sees it" floor** |
| 0.74 — evening | **1.58** | ~17x, and **4x** the golden-hour incumbent bar |
| 0.10 — morning | 1.55 | the other margin |

**The step-back had been shooting the season at its NULL HOUR — sitting essentially on top of the probe's
own NOON CONTROL (0.15 vs 0.09) and calling it the treatment.** Iter 261 stopped the season being a
*colour* and made it a **CLOCK** (a day length: winter's sun rises late and sets early), and a day-length
season is **~0 at mid-day BY CONSTRUCTION** and lives at the **margins**. The agents were **right about the
pixels**; the city was innocent; the feature is alive and enormous.

**Change — the camera, and it is 202's OWN TRAP, recursed onto 202's OWN TOOL.** `shot-stepback.mjs`'s
header says, in as many words, *"takes the light pins FROM THE LIGHT CURVE'S OWN KEYFRAMES rather than from
a guess"* — and then **hard-codes `t=0.30` / `t=0.68` as LITERALS.** That was honest when written: the light
curve had **no `year` term**, so a fixed `t` really was a fixed phase. **261 gave the curve a `year` term,
the curve moved under the literals, and they silently became guesses again.** Three stale things, not one:
- **(a) the season shot at mid-morning** (`d(LUMA)` 0.15 — above).
- **(b) the golden pin stale**: the sun now sets at **0.831** at the dry peak, so `t=0.68` lands in
  **mid-afternoon** — it self-reported **`GWARM=0.36`** against the curve's peak of **0.786**. *Every golden
  frame this loop has read since 261 has been at UNDER HALF STRENGTH.*
- **(c) the caption's own sun state was WRONG**: `SUNUP`/`SUNDN` are thresholds on the **warped** axis
  (`SUNT`), and the file tested them against the **wall clock** (`dayT`) — so it printed `sun=UP` on a winter
  dusk whose sun had **already set**, denying the one fact the frame exists to show (258).

**Nothing in the file is a literal `t` any more.** Every pin is **DERIVED in-page from the artifact's own
`sunWarp`/`SUNDN`/`GWARM` at the year being shot** — a **structural** fix, not a checked one (223), so the
pins **cannot go stale again** whatever a later lap does to the light. Golden is now the **argmax of GWARM**
(found, not guessed). The seasonal contrast is now a **DISCRIMINATING PAIR** (258): `dusk-summer` and
`dusk-winter` at the **same wall-clock instant**, taken **midway between the two seasons' sunsets**, so the
sun is provably UP in one and DOWN in the other.

**Re-shot, the camera is honest, and it says so in its own caption:**
```
pins  sunset dry=0.831 winter=0.701  ->  dusk t=0.766   golden t=0.775 (GWARM peaks 0.779)
golden       t=0.775  GWARM=0.78  sun=UP   (sets 0.831)      <- was GWARM=0.36
dusk-summer  t=0.766  LITAMT=0.30 sun=UP   (sets 0.831)
dusk-winter  t=0.766  LITAMT=0.95 sun=DOWN (sets 0.701)      <- same instant, night has fallen
```

**Visual, re-run — BOTH SEEDS PASS, and the blind discrimination is the proof.** Asked, blind, *which dusk
frame is winter, by the light alone* — with the A/B mapping **CROSSED between seeds** (238) so "the second
one is winter" fails on one of them — **both agents got it right, on both seeds.** Seed 42 named the
mechanism unprompted: *"sun disc still visible… vs fully night, moon up, stars, windows lit. **Sun already
set = shorter day = winter.**"* Seed 7 (the crossed one) read `duskB` as sun-still-up and `duskA` as night —
also correct. **The season was always visible. The camera was pointed at the one hour it isn't.**

**Census.** PASS, tile histogram empty, `git diff solvista.html` **empty** — the artifact is byte-untouched.
Correctly vacuous: this lap changed a harness camera and nothing else. (`greenRoofs +1` = 226's ±2 tick wobble.)

**Cues — 212's law (the verdict is where an agent is wrong; the ASIDE is where it is right).**
- 🔴 **(s) MUST BE RE-GRADED, AND IT IS NOW THE TOP CUE.** Both agents, both seeds, independently, on the
  **first correctly-pinned golden frames the loop has ever taken**: *"the amber wash flattens the whole plate
  into near-monochrome terracotta"* · *"ground/greens/roads nearly collapse into a single hue"* · *"the river
  band almost disappears"* · *"reads as flattening rather than lighting"*. **(s) has only ever been measured
  through a HALF-STRENGTH pin** (GWARM 0.36 of 0.786), which is why it kept coming back "mild". **It was
  never mild; it was never seen.** Instrument: `probe-goldenhue.mjs` (per-tile hue/chroma/luminance at
  day/golden/night **+ the pairwise separation matrix** — a pair collapsing below ~15 RGB units has lost its
  identity). ⚠ 257's law says LAND is **diffuse** (`albedo × TINT`) and *should* saturate under a warm
  illuminant — so a land collapse at golden is a **real** finding, not the sea bug wearing a new coat.
- **The elevated transit, reported a 13th time** (seed 7: *"long straight dark utility/rail spans… scratchy
  overlay lines rather than infrastructure"*). Still the most-reported defect in the artifact's life.
  `polish-tile` cue (a). **Badly overdue.**
- **"No skyline hierarchy / mid-rise wallpaper" — GRADED, NOT OBEYED.** Both agents said it; the banked
  instruments (`probe-crown` silo **2.0 → 20.7**, `probe-taper`'s `crownGap`) measured it **fixed** at
  228/235/239, and 260 already refuted this FAIL as **224's projection law**. Per 251: *a cue re-confirmed is
  not corroborated unless a DIFFERENT instrument did it.* Standing.

**Verdict: FIXED.** The loop has spent two step-backs grading its own broken camera and filing the result
against the city — 260 called the season invisible and was right for the wrong reason; 264's agents called it
invisible and were right about the pixels of a frame that could not contain it. **A documented trap you keep
walking into is a broken tool, not a law** (202/227/243) — and this one was documented, in the header of the
very file that had the bug. The pins are derived now; they cannot rot again.

## Iteration 265 — the night guarded the warm surfaces from a blue light; nobody guarded the cool ones from an orange one (2026-07-14) [Sky & atmosphere × Polish]

**Vector.** Cue **(s)**, the ledger's top cue, **re-graded from scratch** as 264 ordered. 264 found the
step-back's camera had been shooting golden hour at **GWARM 0.36 of a possible 0.779** and fixed
`shot-stepback`'s pins — but **`probe-goldenhue`, the cue's own NAMED instrument, still pinned golden at a
literal `t=0.68`**. So the loop's measurement of its loudest defect had *also* never been taken at golden.
Fixed first: the pin is now the **argmax of the shipped `GWARM`**, derived in-page by driving the artifact's
own code (249), exactly as `shot-stepback` does. It lands at **t=0.775, GWARM 0.779**.

**The defect, measured properly for the first time.** At the true pin, **every land surface in the city
converges into a 9-degree hue band**: PARK 32° · FOREST 33° · FARM 29° · RES 26° · TOWER 25° · BEACH 25° ·
ROAD/COM/MID 24°. Chroma *rises* everywhere (PARK 55→76), so this is not desaturation — it is **hue
convergence**, and `PARK↔RES` separation falls to **15 RGB units, the probe's own collapse floor**. That is
**214's law at the other end of the day**: a flat per-channel multiply on a saturated surface is a HUE
ROTATION, not a tint. The whole wash ladder (214 sand · 220 masonry · 221 greens · 223 · 234 timber) exists
because the **NIGHT** tint `[.42,.42,.58]` crushes R and swings every **WARM** surface to violet. **The GOLDEN
tint `[.92,.72,.66]` is that bug's exact mirror — it crushes G and B, so on any surface whose identity is its
GREEN, R overtakes G — and in 264 iterations nobody had read it as the same bug.**

**Change.** One dial on the wash the file already has. `goldenWash()` — a pure function of `TINT` — is passed
by the **`LEAFN`** caller (the set the artifact itself calls *"anything that grows"*) into the shared
`washRGB`, which now takes `w = max(nightDial, gold)`. `sandCol`/`WARMN` pass **no dial and are byte-identical
at every hour**: the land is diffuse and it *should* blaze at dusk (257), so this does not fight the warm
light — it only holds a green far enough off the asphalt to still be read as a green, through the **same wash
and the same triple** that already holds the sand off the asphalt after dark. `GOLDW=0.50`.
⚠ **The dial reads `TINT`, never `GWARM`** — `CCACHE` is flushed precisely when `TINT` changes, so a
`TINT`-derived dial *cannot* serve a stale colour, where a `GWARM`-derived one would make the cache depend on
call order (**261's law, obeyed structurally rather than remembered**).

**Probe** (`probes/probe-greenhue.mjs`, new — 234's palette suppression: loud-paint the entry, diff in ONE
page, floor exactly 0, occlusion free, **build-agnostic**). Score is **221's** `dHUE` (distance from the
surface's OWN daylight self, never a pairwise separation), plus the one binary that needs **no threshold**:
**is G still the max channel — is the grass still green?**

| | HEAD | patch |
| --- | --- | --- |
| greens at golden | `[123,119,75]` **hue 55°, dHUE 32°, NOT GREEN 3/3** | `[117,123,77]` **hue 69°, dHUE 18–21°, GREEN 3/3** |
| **warm palette** (control, must not move) | `[184,124,90]`, dHUE 12° | `[184,124,90]`, dHUE 12° — **identical** |
| **day** (dead-regime control, 199) | `[138,163,106]` | `[138,163,106]` — **identical** |
| luminance (223, must not move) | 116 / 114 / 114 | 116 / 114 / 115 |

**Census.** PASS — `pop`/`roads`/`developed` **+0**, tile histogram empty (correct and near-vacuous for a
colour-only lap). `solarRoofs −1 / greenRoofs +1` is 226's documented ±2 tick wobble.
**Perf.** Path objects **day −42 (−0.04%) · night −35 (−0.03%)** — colour-only, **free** by the measured cost
model. Whole-frame day control: **17/26 px** against a golden signal of **125,000 px**.

**Visual.** PASS ×2. Blind, **codenamed by file (239), mapping CROSSED between seeds (238)** — and **both
agents independently chose the PATCH, naming different codenames** (s42 `lime`, s7 `navy`). Both reproduced
the cue unprompted on HEAD (*"the vegetation hue has migrated onto the road/sand/terracotta axis"*; *"collapses
into one near-monochrome terracotta mass"*), and both cleared the one failure mode that mattered — *do the
parks now look UNLIT?* — with the mechanism: *"a tinted-under-warm-light green, not raw daytime green punched
through"*; *"they read as green grass under low warm sun, not a green layer that missed the lighting pass."*
Both confirmed the day pair identical; no z-order tears, no blowout.

**Verdict: SHIPPED.** ⚠ Two instrument findings, both promoted to SKILL.md: **(a) 264's stale-pin law recursed
immediately** — 264 fixed the camera's pins and left the *probe's*, because **a lap that fixes a stale pin must
grep every OTHER reader of that curve** (262's sibling law, arriving on the harness). **(b) A SUPPRESSION MASK'S
THRESHOLD SELECTS OPACITY, AND A LOW ONE MEASURES THE BACKGROUND**: at `d>24` the mask admitted ~6%-opacity
green specks lying on TAN ground, whose shipped colour is mostly the *ground's* — dragging the aggregate **8 RGB
units toward orange** and reporting the grass R-dominant when the grass FILL was not. `probe-goldenhue`'s
PARK-hex sample has the same disease from the other side (238: a park hex is 45% lawn and **43% season-dead**
paths/ponds/furniture, so it reported a **3°** move where the grass itself moved **15°**). **Measure the palette
entry, not the tile — and threshold the mask by opacity.**

## Iteration 266 — the foam could never be given a size, so it was given a length (2026-07-14) [Water & coast × Polish]

**Vector.** Water & coast × Polish — the ledger's **#1 cue (ap)**: *the sea's foam is invisible at
fit zoom*, banked at 255 with its obvious fix already refuted. A banked, measured finding outranks
kind-rotation (119), so it beat Urban's turn.

**The defect, restated in the units that matter.** 245 made the whitecaps answer the wind and they
still could not be SEEN, because a cap is a `3.0 x 1.1` **WORLD**-unit ellipse and `fitScale≈0.65` ⇒
**2 x 0.7 CSS px** at the zoom the city is actually looked at — 215's hairline law exactly. Both
closed fixes are closed for good reasons: a **bigger/brighter** cap is still a speck, and a wash in
the sea's **TILE FILL** was *built* at 255 — free, mean-held, byte-exact at its fixed point, passing
every gate — and **unseeable**, because a field sampled per hex and painted as a flat hexagonal fill
terraces onto the lattice, so it is either invisible (d=0.57) or a quilt (d=1.15), with **no middle**.

**Change.** **Langmuir windrows** (`WROWK`/`WROWL`, drawn last of the sea's overlays). Real foam
organises into long streaks lying **parallel to the wind**; a streak is **sub-hex in WIDTH** (1.8–2.7
world units ⇒ ~1.4–1.8 CSS px: never an edge, nothing to terrace) and **multi-hex in LENGTH** (up to
~4 cells ⇒ ~90 CSS px), which is the one dimension a hexagon cannot quantize. Density, length, alpha
and width all ride `seaState()`, so the sea now *stiffens* as it blows. Each row trails **UPWIND** —
west and slightly north of its anchor hex — and that is **not a look, it is a Z-ORDER decision**:
draw order is depth order, so the tail lies over water already painted, where no later row or column
can paint it out. The upwind run is truncated at the first cell that is not open sea, so a streak can
never touch land. Day-only on the caps' own `LITAMT` gate (the night hands off to moonglade/biolum
untouched — and daylight-inert code is a free noise floor, 199).

**Census.** PASS. Core **flat** (`pop`/`developed`/`roads` +0), tile histogram **empty** — correct for
a draw-only lap. `solarRoofs -2 / greenRoofs -1` is 226's documented tick wobble.

**Probe** (`probes/probe-seastate.mjs`, build-agnostic, floor **exactly 0**, `land` = positive control):
the sea's calm→gale response, in moved sea pixels at full gust —

| build | seed 42 | seed 7 | seed 1234 | land (positive control) |
| --- | --- | --- | --- | --- |
| HEAD | 949 | 1,042 | 1,012 | 4,457–5,036 (LIVE) |
| patch | **9,329** | **8,725** | **11,101** | 4,566–5,057 (LIVE, unmoved) |

**9–11x**, and the sign of the old complaint is **inverted**: the header's *"the wind moves the land
6x harder than the sea"* is now sea/land **1.9–2.4x**. Per-moved-pixel amplitude ≈ **20** max-channel
against a within-sea grain SD of **22** ⇒ the mark sits at **d≈0.9 where it is drawn** — and it is
drawn as a coherent 60px line, not a speck.

⚠ **AND THE BANKED PROBE FOR THIS CUE WOULD HAVE TOLD ME TO REVERT IT.** `probe-seaamp` (255's rig,
the instrument the cue *names*) graded the same frames at **mean d 0.38 vs HEAD's 0.34** — i.e. *no
change* — because it averages the shift over **all 456,863 sea px** while a windrow paints **~2%** of
them. It is the right instrument for a **WASH** and the wrong one for a **MARK**. Law promoted to
SKILL.md; 228's law recursing an **eighth** time, on the probe the cue handed me.

**Visual** (4 blind agents, 2 seeds × 2 builds, files named — never letters (239); each agent saw ONE
build and was asked *which file is the windy one, looking ONLY at the open water*):
- **BOTH HEAD agents, unprompted, independently reproduced cue (ap) at fit zoom** — *"I honestly
  cannot tell them apart on the water alone"* (42) · *"they look identical to me… Whatever the sea
  does with wind, it does not survive downscaling. That is a real gap, not a hedge"* (7). **A cue
  re-confirmed by a DIFFERENT instrument is corroborated** (the header's own standard).
- **BOTH patch agents named the gale from the water alone, at fit zoom** — *"the sea alone gives it
  away"* (42) · *"faint pale striping over the bay that city-calm.png lacks"* (7) — and both read the
  form as **foam, not scratches, not an exposed grid**. Whole-frame: no z-order tears, no floating
  tiles, no blown-out colour, no clutter, on either seed. **4/4 VISUAL: PASS.**

**Perf.** Path objects **day 111,090 → 111,193 (+0.09%)**. The draw is **provably inert at night**
(`LITAMT<0.6`; 199's free dead-regime control), and the night column reads **+0.11%** — so the day
cost sits *inside its own noise floor*. Free.

**Verdict: SHIPPED.** ✅ **(ap) IS CLOSED.**

⚠ **BANKED ASIDE — both patch agents, independently, on two seeds** (212: weight an aside two agents
reach independently above any verdict): *"the longest streaks are perfectly straight and uniform in
thickness, so a few read a touch ruler-drawn rather than organic — a little length jitter or a taper
would sell it harder."* The spine is a single `quadraticCurveTo` and a **stroke cannot taper**. ➡ The
fix is to draw the row as a **filled tapered lozenge** (still ONE path object, so still free) with an
S-curved spine, feathering to nothing at the upwind tail. New cue **(as)**.
