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
| **Nature** | 4, 26, 29, 102, **156**, **174** | 1, 13, 60, **206** | 37, 46, 67, 76, **108**, **120**, **139**, **166**, ~~**233**~~, **238**, ~~**246**~~, **263**, **272** | ~~46~~, ~~88~~, ~~101~~ | U4 | 53, 96, **194**, ~~**198**~~, **215**, **221**, ~~**251**~~ | **117**, **129**, **148**, **183** |
| **Water & coast** | 6, 10, 12, 16, 20, 33, 106, **169** | 90 | 17, 25, 51, 65, 72, **113**, **123**, **159**, **196**, **245**, **257** | 22, ~~**205**~~ | | U2, 44, 58, 79, **116**, **132**, **150**, **185**, **214**, **223**,  **234**, ~~**255**~~, **266**, **268** | **97**, **141**, **176** |
| **Urban fabric** | 32, 62 | 7, 23, ~~82~~, **151** | 38, 54, 68, 92, **165**, **173**, **189**, **199**, **209**, ~~**218**~~, **219**, ~~**254**~~, **267** | 47, **109**, ~~**160**~~ | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103**, **110**, **118**, **124**, **143**, **180**, **216**, **220**, **224**, **228**, **235**, **239** | **133** |
| **Transport** | 2, 9, 21, 31, 48, **164** | 77 | 28, 39, 55, 63, **112**, **121**, **128**, **155**, **179**, **193**, **230**, **249**, **258**, **269** | 5, 15, **138**, **211** | U4 | U1, U3, 70, 85, 87, 94, **146**, **188**, ~~**203**~~, **241**, **243** | **105**, **171** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107** | 36, 59, 66, 80, 91, **149**, **158**, **175**, ~~**195**~~, **213**, **244**, **250**, **259** | 45, **204** | | 73, ~~**114**~~, **168**, **231**, ~~**270**~~ | 52, 122, **140**, **184** |
| **Sky & atmosphere** | 27, 43 | | 19, 35, 50, 57, 95, **135**, **153**, **161**, **181**, **190**, **208**, **225**, **236**, **253**, **261** | | | 61, 81, 89, **115**, **200**, **242**, **248**, **265**, ~~**273**~~ | ~~**134**~~, **144** |
| **People & activity** | 41, 56, **127**, **170**, **186** | 49 | 34, 64, 93, **104**, **119**, **145**, **178**, **201**, **210**, **240**, **247**, **262**, **271** | 78, **111** | | 84, **137**, **163**, **226** | 71, **154**, **191** |

- **Interaction/UX** (inventory + the `<meta charset>` repeal archived at 270; both are INVARIANTS in SKILL.md). What
  steers: when adding an entity array, `stamp()` it in its draw + add an `ENTINFO` row (same discipline as the census
  hook) — `stamp()` also draws the focus ring, so any stamped entity is ringable free. **An `ENTINFO` `sub` may be a
  FUNCTION of the entity (105)** — use it when a thing's interest is its *membership* (line/route/depot), computed live.
- **ROTATION.** Last vector per domain: Sky **273** · Urban **267** · Water **268** · Transport **269** · Civic **270** ·
  People **271** · Nature **272**. ➡ **NEXT: Urban fabric (267) is oldest.** ➡ **(aj) IS RETIRED (273, refuted below), so
  the cue list HAS NO #1.** **(as)** (windrows read ruler-drawn — Water × Polish) is freshest; **(aw)** (kayakers keep no hour) is cheapest.
  ⚠ **PEOPLE HAS TAKEN *Deepen* FOUR LAPS RUNNING** (240/247/262/271). Its **Polish** (226) and **Interaction/UX** (191,
  80 laps ago) are the stale cells ⇒ **non-Deepen next.**
  🔑 **225'S GREP-THE-SEAM LAW IS 14 FOR 14 AT *FINDING*** (267 hid **a RULE THAT HAD NEVER RUN** · 268 a seabed built
  from the wrong kind of noise · 269 a tram at **1.04x chance** on its named avenue · 271 nine surfers who never went
  home · **272 an entire autumn CA that blinked the whole wood on and off as ONE, for the artifact's entire life**) —
  **AND 270 IS THE FIRST DEFECT IT COULD NOT *FIX*** (structurally unbuildable on one hex). ⇒ **An empty cue
  list — or a passing probe — records where you have LOOKED, not what is THERE. But a found defect is not a fixable
  one: PRICE THE FIX BEFORE YOU PROMISE IT.**
  ⚠ **272: NATURE'S CUE LIST WAS STALE AND ITS SEAM HELD A WHOLE UNMENTIONED CA.** `grep tick()`, never the cue list.
  ✅ **273 = 35th STEP-BACK: BOTH SEEDS PASS, no compounding drift; 261'S SEASON IS ALIVE** (both blind agents named the
  winter dusk from the light alone). **Perf ARC vs 41 laps back: day +3.9% / night +1.8% ≈ +0.1%/lap, HALF the historic
  rate.** Its finding was that **the loop's #1 CUE WAS FALSE.** ➡ **NEXT ~278.** ⚠ **BLIND A/B NAMES: NON-ORDINAL, AND
  CROSS THEM** (268). ⚠ **Both agents again called golden hour *"a near-monochrome peach wash"* — 265 CHOSE THAT
  DELIBERATELY** (*protect the complement; do NOT de-warm the scene — the land is diffuse and SHOULD blaze at dusk*).
  🔑 **`polish-tile` IS BADLY OVERDUE AND NOW HAS THREE CUES**: **(a)** the elevated transit (**13x reported**, the
  ledger's most-reported defect by a wide margin), **(e)** the observatory (259), **(g)** the capitol (270).
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
  ✅ **CLOSED, bodies archived at 264: (aq′) the season has a DAY LENGTH** (⚠ retire `probe-seasonarea` as a seasonal
  score; ⚠ **264: the season is ~0 at MID-DAY by construction — measure/shoot it at the EVENING MARGIN**) · **262: the
  `LITAMT`-as-a-bedtime gate is EXTINCT** (⚠ **do not add another global-light gate to anything that keeps hours**).
  🔴 **HOW TO READ THIS CUE LIST (251/255).** A bad instrument does not misgrade a lap — it **MANUFACTURES A CUE** that
  steers the loop for tens of iterations ((ag) was #1 for **24 iterations**, false on every count). 🔑 **A CUE
  RE-CONFIRMED IS NOT CORROBORATED UNLESS A *DIFFERENT* INSTRUMENT DID IT.** 🔴 **228's law has recursed NINE times, EVERY
  TIME on an instrument this harness already owned** (roster + bodies in SKILL.md) ⇒ *read what an instrument MEASURES,
  WHERE IT SAMPLES, and **WHICH PAIR IT COMPARES**.* ⚠ **263: a cue can be RIGHT about the tell and WRONG about the
  host** — check the host's **POPULATION**.
  ⛔ **259: `c.lit` CANNOT EXPRESS DARKNESS** — `lit=LITAMT*(0.35+0.65*c.lit)`, a **0.35 floor** ⇒ range **2.9:1**. **Fine as a CHOOSER, dead as a LOOK ⇒ do NOT build "X answers the night glow" in COLOUR.** (Body archived at 271.)
  ⚠ **ARTIFACT FACTS from 236–261 that are NOT laws and CANNOT be re-derived from SKILL.md** (the law-recaps these
  lines used to carry are in `GROWTH-archive.md`, "rotated out at 256"):
  **272:** **`shroomDue(c,s2)` — ONE predicate; the pass now reuses `isWood`.** `SHRM0=0.72` (first rains) ·
  `SHRMW=0.18` (how long the flush keeps OPENING) · `SHRMEND=0.99` · `SHRMP=0.06`; a ring surfaces once
  `s2 > SHRM0 + c.v*SHRMW` and lives `shroomLife` = **2–3 ticks (mean 2.5)**.
  ⚠ **ONE TICK = 0.075 yr** ⇒ **the whole autumn is only ~2.9 TICKS** — a seasonal CA has almost NO temporal
  resolution; check that BEFORE designing any cadence. ⚠ **`(year|0)` IN A HASH SALT IS CONSTANT ALL SEASON** ⇒ **ONE
  roll evaluated N times**, not N rolls — that is what fired the whole wood on a single tick. **Never pace anything
  WITHIN a year with it.** ⚠ **BOTH UNIFORMS ARE ALREADY ON THE CELL** (`c.v`, a `hashCell`) ⇒ **zero `rng()` draws,
  core +0, tile histogram EMPTY** — do not "tidy" either into a fresh draw. ⚠ **THE DRAW'S FADE SATURATES**
  (`alpha=min(1,c.shroom/2)` ⇒ ages 3 AND 2 both render 1.0) ⇒ **do not gate the cadence visually**; `probe-fairyring`
  owns it. **271:** **`surfSession()` — ONE predicate, THREE readers** (the `drawSurfer` gate, the `Surfer` ENTINFO row, the
  probe) `= clamp(1 − nightAmt()/SURFDARK,0,1) × beachPhase()`; **each board keeps its own threshold `surfOut(s)=s.ph/7`.**
  ⚠ **`SURFDARK = JOG0+JOGJ` — TAKEN FROM THE LADDER, NOT INVENTED. THE HOURS LADDER IS NOW KID 0.34 < SURF = JOG 0.62 <
  CURF 1.85** — take a new entity's hour from it (226). ⚠ **`surfOut` IS DERIVED, NOT DRAWN**: `s.ph` is already
  `Math.random()*7` ⇒ `ph/7` is **exactly uniform by construction** at **zero** new draws, so the shared stream is
  byte-identical and every kayak/jogger/resident is *provably* untouched — **do not "tidy" it into a fresh
  `Math.random()`.** ⚠ **CENTRED (245): at the dry peak in daylight `surfSession()===1` EXACTLY ⇒ the patch runs HEAD's
  draw byte-for-byte** (**0 px** in-page, 253). Gate returns **before `stamp()`** (as `drawPed` does) ⇒ not hoverable.
  ⚠ **`drawKayak` IS THE LAST PERSON WITH NO HOUR AND NO CALENDAR** (cue **(aw)**; `surfSession()` already fits it).
  **269:** **`isAvenue(x,y)` — ONE predicate, THREE readers** (`servTarget`, `__find('arterial')`, the streetcar's route).
  ⚠ **`AVESPAWN`/`AVESTAY` are PREFERENCES, never rails, and that is LOAD-BEARING**: the avenue is **NOT a rideable
  network** (9–16 components, biggest holds 23%, **20% dead ends**, degree **1.85**) and `roadNbrOpts` **forbids the
  U-turn** ⇒ a tram *confined* to it **strands in a block**. No avenue in reach ⇒ **byte-identical to HEAD**.
  ⚠ **`AVESTAY` IS AT ITS CEILING — DO NOT RAISE IT**: 0.85→0.97 buys **+2.3pp** and costs reach 282→252, one seed
  **pacing a stub** (176 hexes). ⇒ **The limiter is her RETURN time, not her STAY time**; the untried lever is a
  flow-gradient seek when off-trunk, ⚠ **but `c.flow` peaks at the CORE ⇒ naive ascent funnels every tram downtown.**
  ⚠ **Spawn draws `Math.random`, never `rng()`** ⇒ census core **+0**, path objects **flat by construction**.
  ⚠ **THE AVENUE SELECTS FOR ITS OWN BURIAL ON SOME SEEDS** (258): high flow = the CBD ⇒ seed 7's best on-avenue tram
  renders **13px** — but the AGGREGATE is **+23% MORE visible** (5 seeds of 6 up). **Judge it on the aggregate.**
  **268:** **`seaOct(x,y,sh,salt)` — the seabed's octave, smoothstep-INTERPOLATED between hash lattice points.**
  ⚠ **NEVER "SIMPLIFY" IT BACK TO `hashCell(x>>sh, …)`** — a downsampled hash is **blocky white noise** (constant in a
  block, independent across every block edge) ⇒ a **≥2-tone jump on 5.0% of touching sea hexes**. It is a *different
  field*, not a smoothing. ⚠ **`seaT` IS COLOUR-ONLY and BUILD-TIME** ⇒ no `rng()`, no tile change, **no path count**.
  ⚠ **THE ONE-TONE TERRACE IS STRUCTURAL AND SURVIVES** (255's ⛔): **268 removed the hard SEAMS, not the LATTICE — do
  not re-open the sea's body colour** (255/257); it needs a different rendering unit.
  ⚠ **`probe-seastep` (257) IS STILL CORRECT AND STILL THE WRONG PAIR** — it measures the **DEPTH-adjacent** step (tone
  `k` vs `k+1`), which need not be neighbours in the world. **For anything a viewer sees, use `probe-seaquilt`: the step
  between hexes that TOUCH.**
  ⚠ **TEN harness files still TYPE `golden t=0.68`** — measured at **92% of golden**, so LOW PRIORITY (body archived at 272). **DERIVE, never type, in anything new.**
  **267:** **`c.loft` — ONE predicate, THREE readers** (the `tick()` conversion, the `T.IND` draw, the tooltip).
  ⚠ **`blockValue(x,y)` = mean `c.val` over the SIX NEIGHBOURS — reach for it for any "has the city arrived here?"
  question, and NEVER use a lot's OWN `c.val`** (`updateValue` mixes 60% nbr / 40% `valueSrc`, so a **cheap tile's own
  cheapness is subtracted from the signal** — `valueSrc(T.IND)=0.18` capped every warehouse at **0.425** under its own
  **0.45** gate ⇒ 0 lofts, ever). ⚠ **`LOFTVAL=0.5` is the artifact's own neutral — do NOT tune it** (0.45 ⇒ the yard
  vanishes; 0.55 ⇒ 4 seeds in 6 starve). ⚠ **THE PASS WALKS `HEXI` AND DRAWS NO `rng()`** ⇒ **no tile type changes**;
  **do not "tidy" it back onto `rc()`** (a 3–6 cell host cannot be found by a lottery over 3,400 cells).
  ⚠ **`WORKSMIN=1` IS LOAD-BEARING** (a small yard is ALL edge ⇒ the port converts to its last shed). ⚠ **The IND→MARKET
  fork was DELETED.** ⚠ **IND is STILL MUTE on the calendar**; the loft is **RESIDENTIAL with no `BEDT` entry** ⇒ cue **(at)**.
  **266:** **`WROWK`/`WROWL` — the sea's windrows.** ⚠ **A ROW TRAILS UPWIND (west + slightly north) BECAUSE THAT IS A
  Z-ORDER DECISION, NOT A LOOK** — the tail must lie over hexes *already painted*; point it downwind and every later row
  paints it out. Truncated by a walk over `cellAt`, so it can never touch land. **Day-only** (`LITAMT<0.6`) ⇒ night is
  byte-identical and is a **free perf noise floor** (199). ⚠ **`probe-seaamp` CANNOT GRADE IT** (it area-means the whole
  ocean; a row paints 2%) — use `probe-seastate` + the agents.
  **263:** **`bloomHost` — ONE predicate, FOUR readers** (the `tick()` spread, the rain front that seeds it, `bloomAt()`,
  the tooltip). Host = **MEADOW + SHOREPARK**. ⚠ **THE BLOOM CA DRAWS NO `rng()` AT ALL** (spread *and* spark are
  `hashCell(…^TICKN)`) ⇒ **wholly inert — do not "tidy" it back onto `rng()`.** ⚠ **`TICKN` IS PART OF THE WORLD AND IS
  RESET IN `genWorld`** — any new tick-salted hash must reset with the world, or one seed renders *different flowers*.
  ⚠ **THE REFRACTORY IS JITTERED** (`-(9+(c.v*10|0))`, mean 13.5 ≈ HEAD's 14) **AND THAT IS LOAD-BEARING** — a *shared*
  constant **synchronises** the band (41% of ticks had **zero** flowers). ⚠ **DUNE and PARK were MEASURED and REJECTED
  as hosts** (components **6**/**14** vs SHOREPARK's **34**) — they can only speckle. **Do not add them.**
  **262:** `kidOut`/`kidHidden` — ONE predicate, three readers (draw, tooltip `withChild`, probe). **LADDER OF HOURS:
  `KID` (in by `nightAmt` 0.34) < `JOG` (0.62) < `CURF` (1.85) — take a new entity's hour from this ladder, never invent
  one** (226). ⚠ **`kidOut` is DERIVED, NOT DRAWN** — `p.kid` is already a `Math.random` uniform ⇒ `(kid/6)%1` costs
  **no new draw**; a fresh `Math.random()` at spawn shifts the shared stream and walks every dog's owner (204). ⚠ **`Math.min(p.out,…)` is STRUCTURAL.**
  **261:** **`SUNT` IS THE LIGHT CURVE'S CLOCK — NOT `dayT`. ONE predicate (`sunWarp`), FOUR readers**: `daylight()`
  (sky/tint/`LITAMT`), the shadows (`SHOFF`/`SHLEN`/`SHAMT`), the disc (`sunP`), `nightDeep()`. **Anything new asking
  "where in the day are we" reads `SUNT`, never `dayT`** — `dayT` is now only the raw *counter* (the moon, `matchClock`,
  the hall clock read it, and MUST). Set once a frame in `render()`. ⚠ **`syncSky` warps its OWN clock on purpose** (reading
  `render()`'s `SUNT` painted a night sky behind a daylit noon city). ⚠ **`SUNUP`/`SUNDN` ARE THRESHOLDS ON `SUNT`, NOT
  `dayT`** — tested against the wall clock they print `sun=UP` on a winter dusk whose sun has set (264). ✅ **264: `shot-stepback` DERIVES every pin from the curve (no `t` literals).** **259:** `siteDark` — the dome is chosen by
  `c.lit + DARKGL*groundLoad + DARKJIT*hash`, a PREFERENCE, deterministic, **no `rng()` draw** (the caller's 90-try
  scatter still runs and still spends its draws — **do not "tidy" it away**, that is a −22% pop / −47% tower stream
  shift). ⚠ **`seedNum^0x0B5E` IS THE DOME'S SLIT AZIMUTH (158) — an ARGMIN sharing a salt is a SELECTION on it, and
  would pin `sd` to −1 in every city. A tie-break must never share a salt with anything that reads the cell it picks.**
  ⚠ **`__warp(a)` then `__warp(b)` IS NOT `__warp(a+b)`** — it ticks `while(year<target)`, so two hops build a
  DIFFERENT city than one. A *prefix* warp is on the trajectory; a two-hop warp is not.
  **258:** `cabFree`/`CABFARE` — ONE predicate, three readers (step, roof lamp, tooltip); **`dwell` IS the ride.**
  ⚠ **THE ROOF LAMP IS A FOR-HIRE SIGN — do not re-key it to darkness.** ⚠ **`livelyKerb` SELECTS FOR ITS OWN BURIAL**
  (≥2 ATTRACT nbrs ⇒ tall frontage in front) — **aim by argmax-over-TIME/INK, never at the first instance** (SKILL.md;
  269 generalised this: **any superlative aiming predicate made of DENSITY frames a wall**). **257:** ⚠ **`GWST` (OVERHEAD
  sky) and `GWSB` (HORIZON) ARE NOT INTERCHANGEABLE** — the sea's BODY mirrors `GWST`; blending the two lands in the
  **mud** (chroma 19). `SEAMIRROR` is the strength.
  **250:** `concertSeason()` — ONE predicate, four readers. **249:** `ferryApp`/`ferryFr`/`ferryThr`; ⚠ **`f.sp` KEEPS ITS
  SIGN** (the THROTTLE goes to zero, never the velocity). ⚠ **NOT cue (o): the PIER has a waterfront, the HARBOUR does
  not.** **245:** `seaState()`, floor `SEACALM`. **242:** ⚠ **MARSH/KELP no longer catch cloud shade** (`WETSET`).
  **241:** `RAILCAP=130`. **236:** ⚠ **`cl.rain` IS GONE** ⇒ **`cloudWet(cl)`**.
  ⚠ **244: TURNING THE AMPHITHEATER'S BOWL WAS BUILT AND REVERTED — DO NOT RE-TRY** (the projection cannot carry it).
  ⛔ **(ai) RETIRED (246) — UNREACHABLE, DO NOT RE-OPEN** (archived 263): no paired addition exists, **the ROADS fragment every lobe**. ➡ The complaint is real; re-derive it from its nouns.
  ✅ **CLOSED LADDERS — DO NOT RE-OPEN** (roster rotated to the archive at 268; every law is in SKILL.md): the **WASH**
  ladder · the **TOWER LOOK** · the **SKYLINE** ladder · the **HUD** lap · **137's standing crowd** · the
  **SEASONAL-VEGETATION** seam. ⚠ **230's `taxi` flag is LOAD-BEARING** (`VCURF` thins the night fleet by CLASS).
  ⚠ **(y) came from an agent reading `shoot.mjs` output — REPRODUCE it in the user's configuration first** (229). **Interaction/UX** last touched **229**.
  **CUES, RANKED.** ⚠ **The CLOSED/RETIRED roster — (w)(z)(t)(u)(ab)(af′)(ag)(ah)(ai)(al)(am)(an)(aq)(s)(ap) — and its
  live do-not-re-open warnings were rotated to the archive at 268; every law is in SKILL.md.** Half-closed: **(aj)'s
  SHADE half CLOSED 242 — its cloud-SITING half is still OPEN**; **(ao)'s SHAFT half CLOSED 248, its BOW half REFRAMED
  and its prescription REFUTED.** Live:
  ⛔ **(aj) RETIRED (273) — REFUTED ON EVERY COUNT, DO NOT RE-OPEN THE CLOUD SPAWN.** The clouds are **not** parked over the sea: they stand over land **55% of their lives** (**3.86 of 7** cast a shadow at any instant, 6 seeds in 6). **`cl.y` is a DEAD LEVER** — the *best row in the city* is worth **1.10x** a uniform pick, so the promised ~2x is **unreachable, not under-tuned** (`probe-cloudland`). And the shade is neither faint (**1.11x** the amplitude of `shadS`, the shadow under every tree — `probe-cloudink`) nor small (its **30·s** half-width **equals the puff's own**). ➡ **The cue was MANUFACTURED BY THE QUESTION** — the puff draws **250–400 px ABOVE its ground anchor**, so an agent asked *"where are the clouds"* reports a **screen** position that encodes ALTITUDE (224). Law in SKILL.md. ·
  **(aw)** **the KAYAKERS keep no hour and no calendar** (271 — the last person in Solvista who does not). `drawKayak` has no gate at all, exactly as `drawSurfer` had none. **The fix is already written: `surfSession()` is the predicate, and a kayak is a fair-weather boat.** Cheap, but it REPEATS 271's mechanism ⇒ **pair it with something, or wait for People's non-Deepen lap** ·
  ⛔ **(y) RETIRED (273): its own instruction was "re-derive it from a fresh frame"; 273's 5-light × 2-seed step-back did, and NEITHER agent saw it. Body archived.** · ⛔ **(ak) MEASURED-CAPPED, prescription DEAD** (238+252) — **do not re-open the canopy** · ⛔ **GARDEN's staggered beds RETIRED (263, host starved).**
  **225: THE SHADOWS READ THE SUN.** `shadS` (every shadow routes through it) carries a per-frame sun vector
  (**`SHOFF`** throw · **`SHLEN`** stretch · **`SHAMT`** opacity). ⚠ **Noon (t=0.415) is BYTE-IDENTICAL ⇒ a free
  dead-regime control for every shadow lap.** ⚠ **`SHAMT` must never reach 0 at night** — the residual patch is what
  keeps every ped, tree and car from FLOATING. ⚠ **226: `census.mjs` DOES NOT FREEZE THE CLOCK** ⇒ tick-sensitive
  metrics (`solarRoofs`) **wobble ±2**; core metrics unaffected. **To test whether an unintended metric move is YOURS,
  re-run the SAME FILE, not HEAD.**
  ⚠ **231: THREE PREDICATES, DON'T MIX THEM (body archived at 242).** `openFront`/`frontLoad` count **TALLT MEMBERSHIP**
  — wrong for anything drawn flat. **`groundLoad(x,y)` is the ground-level one**: sums drawn **HEIGHT**, reads **`c.th`
  never `c.h`**, counts a `RAISEABLE` lot at `FUTUREH` — **an empty lot is a building that has not been built yet.**
  ⚠ **Aim a CAMERA by measured ink, never by any of the three (226) — nor by a position (271: it framed the pier).**
  ⚠ **Settled audits, bodies archived at 242 — the live warnings only.** **213:** `nightDeep()` is **pinned at 1 all
  day** (a trap for any NON-draw reader); the civic night-light audit is **DONE** — three lights are off the curve on
  purpose (school janitor, hall clock face, parliament lantern), **do not "fix" them**. **211/210:** both `frontLoad`
  and `openFront` ship as **PREFERENCES, NEVER GATES (206)**, and `LITAMT` returns to **0.64** by the small hours ⇒ any
  gate `LITAMT > 0.64` defines a "night" that **ENDS BEFORE DAWN**. **137's "the ped/dog system is NON-REPRODUCIBLE" is
  DISPROVEN** ⇒ **People is probe-able like any domain**. **209:** the **GROUND PLANE is SPENT** (216 spent the FACADES);
  its law is in SKILL.md and paid out again at **253/261 (the LIGHT)** and **268 (the SEABED)**.
  **206:** the vacant lot is a **MIRAGE** (`EMPTY` with ≥2 RES nbrs falls **85 → 6.5** by 2035); development eats every
  gap — **and it eats CA HOSTS too: anything in `RAISEABLE` will be built over** (263). **⚠ THE FIRE CA IS A GHOST — do not
  build "X answers the fire"**: ignition is year-gated ⇒ at 2035 nothing can ignite, and fire **never spreads**.
  **⚠ THE `polish-tile` BACKLOG — measured cues that are NOT growth laps. Do not spend a domain's lap on one; they need a tile redesign, and each has a gate written. Full bodies archived at 264; the live warnings only.** ⚠ **(a), (e) and (f) ARE ONE FINDING — 215's HAIRLINE LAW** (a sub-pixel ornament *tints* its background instead of marking it; **the lever is a BODY / SIZE / CONTRAST — never more strokes, never placement**).
  (a) **THE WHOLE ELEVATED TRANSIT is sub-pixel at fit zoom** (0.5px rope, 5px cabins). ⚠ **NEVER RE-OPEN THE Z-ORDER — CLEARED BY PROBE TWICE** (203/212); **15 mis-diagnoses** (269 makes two more — an agent called the rope *"scratches on the image"*, and another filed it as a z-tear **in the HEAD frame** while naming it *"a grey aerial-tramway cable, a different feature"* one frame earlier), and *that persistence IS the evidence: the fault is LEGIBILITY*. Suspect named + priced (256): **`drawMonoAt`, 2.1% of the frame.** *Do NOT re-try a body/halo under the rope (measured — backfires) nor a lit top edge (impossible at 0.5px).* **MOST-REPORTED DEFECT BY A WIDE MARGIN; a `polish-tile` lap is BADLY OVERDUE.** ⚠ **269 adds cue (av): the TRAM's catenary is the SAME 0.5px bug — the family is bigger than the two aerial lines.**
  (g) **THE CAPITOL CANNOT CARRY ITS OWN LABEL — IT NEEDS A MASSING REDESIGN** (270; full body in the 270 entry; gate
  written: `probe-parlheight.mjs`). `CIVICDESC.parliament` promises *"the tallest civic roof"* and it is **FALSE** (the
  university out-tops it **4 seeds in 6**). ⛔ **DO NOT RE-TRY IT AS A HEIGHT CONSTANT — BOTH ROUTES MEASURED AND DEAD**
  (taller BODY = *"an office slab wearing a dome as a hat"*; height in a DRUM = *"a minaret"* — two agents, two seeds,
  crossed, both rounds; cause is structural, SKILL.md). ➡ The lever is **MASS, not height**: a drum wider than tall.
  (e) **THE OBSERVATORY IS TOO SMALL TO READ** (259; ≈ **5.5 CSS px at fit**, on a frame where it is 96.3% visible). ⚠ **SMALL, not BURIED — do NOT re-open the siting.**
  (f) **THE WILDFLOWERS ARE SUB-PIXEL** (263; ≈ **1.1 CSS px at fit**, true of HEAD's meadow bloom too). ⛔ **DO NOT RAISE THE PER-HEX BODY LIFT — that is 255's ⛔** (⇒ a hex quilt). ➡ The only way through is **a SHAPE THAT CROSSES TILE BOUNDARIES** (a drift of petals, a streak), never a brighter fill.
  (b) **`university` is the ONLY of the twelve civics with no `LITAMT`** — pitch dark after sunset; every place to put the light failed (195). (c) **A parked service vehicle needs its CIVIC TILE to have a visible apron on its front edge** (204). (d) **The marsh reeds do not read** — seven sub-pixel strokes round the pool (cue (i), 113).
  **Sky is post-saturation (Deepen/Fix ONLY — its additive/CA cells are traps).** **Urban: additive spent (118), Connect measured-hard TWICE** (160 RES terracing · 165 the `hstr` parade — neither forms a straight-hex-axis run ≥3, so neither is an arcade host); **Roof-furniture CLOSED city-wide**; **GROUND PLANE SPENT (209)**; **216 spent the FACADES**; **colour channel SPENT (254)** — the **harbour apron** is the last named look-remnant (cue **(o)**: a port vector must **build the waterfront FIRST**). ⚠ **"Urban is spent" HAS BEEN REFUTED TWICE** — from the SILHOUETTE side (232/237, CLOSED by 235+239) and, at **267**, from the **RULES** side: its `tick()` seam hid **a conversion that had never once fired.** ⇒ **Urban's LOOK is done; its RULES were not audited. Grep `tick()`, not `drawBuilding`.** Live Urban cues: **(at)** + **(au)** (both on the loft). (**Sky's moon is FIXED (135) and NAMED (144)**, both closed.
  **STILL banked for Sky: the SEASON word** — it reads the fast `year` and would strobe ~0.7 Hz (134), so it needs a
  **slow clock FIRST**; don't add `seasonWord(year)` to the HUD nor re-ship 134's REVERTED almanac. ⚠ **236's front is
  ALSO on `year` and is NOT that slow clock.**) **Water's banked cue (123): the pier/lifeguard are still `rng()`-salted
  — site them on a depth by respending their draws, but that REPEATS 123's mechanism, so vary it.**
  ⇒ **"Additive inventory spent" is a claim about a domain's ENTITIES, not its SURFACES** (127 put picnics on PARK's 878
  hexes), **and a Deepen that adds no element is the documented way past additive saturation** (126). *(The agriculture
  tell + the measured-closed SEASONAL-VEGETATION seam were stated three times over; bodies archived at 270 — the closed
  ladder above and ⛔ (ak) below carry them.)*
  **124 closed the LAST banked cue that moved a census number; the census is VACUOUS for most vectors — reach for a
  probe.** Three laws govern step 1: **a cue is a POINTER, NOT A SPEC** (re-grep the seam before designing to it); **a
  banked, measured finding outranks kind-rotation and cell-emptiness** (119); **saturation beats kind-rotation** — when
  a domain's additive cell is spent, the KIND changes, not the domain (118).
  **Sky's additive/CA cells are TRAPS** (sky is not cellular; fog on terrain is already `rSea`/`fogAt`). **Cue (k)
  CLOSED (116/123)**; still steers: **run the tell FORWARDS** (string and rule share ONE constant — 123; 213's
  `civOpen()`). **⚠ A tick-rule cannot read the reach maps (151):** `recount()` never runs in the sim loop, so
  `rGreen`/`rShop`/`rServ` are STALE inside `tick()` — recompute locally.
  **THE FAIL/ASIDE LAW (212; law in SKILL.md, tally archived at 268): FAILs are where an agent is WRONG, ASIDES where it
  is RIGHT.** Paid 13x; ⚠ **237/252/255/268 INVERTED IT** (the headline FAIL was RIGHT and the banked probe had ACQUITTED
  the defect). ⚠ **269: A FAIL CAN BE *TRUE* AND STILL NOT BE *YOURS*** — grade it by MEASURING, then ask **whose** it is
  (269's seed-7 FAIL was half a real cost of the lap, half the elevated transit's 15th mis-diagnosis, in the HEAD frame).
  ⇒ **When agents say "I CANNOT SEE IT" the burden is on your PROBE** (they alone measure *salience*). ⇒ **262: read WHICH FILE a FAIL names.** Weight an aside two agents reach independently above any verdict.
  Perf ARC (arc ref `7e2ac2c` = 177; per-step-back refs + priors archived at 233/236/268).
  ✅ **THE ARC IS STOPPED — FLAT ACROSS SIX STEP-BACKS. THE OLD `+0.2%/iteration` IS NOT BEING PAID; DO NOT QUOTE IT.**
  ARC vs 177 held at day **+18.1..+19.4** · night **+12.4..+14.1** across 242→**268** — **26 iterations for NO arc
  growth.** Night profile: `winBandR` 32.1% · `prismS` 29.1% · `hexTile` 12.0%; `drawCell` 94%. 🔑 **STRUCTURAL: a
  domain past ADDITIVE saturation STOPS COSTING FRAME TIME.** ⇒ **Do NOT open a perf lap.**
  🔑 **THE LAP TIMER OVER-READS; GRADE A LAP WITH `probe-drawbudget` BESIDE `perfab`, NEVER `perfab` ALONE** (216's law;
  bodies archived at 251) — **3x now it reported a stable +2–3% over a lap that measurably added NO draw work.**
  ⚠ **A WORLD-CHANGING VECTOR IS NOT FREE just because its diff has no draw call — THE WORLD IS THE DRAW LIST** (222),
  and ✅ **it runs in REVERSE — a vector that REMOVES things gives draw work BACK** (241, −3.2% day). ⚠ **Cue (x) stands.**
  **⚠ THE STANDING PERF SUSPECT (207, UNCHANGED to 268): THERE IS NO HOT ORNAMENT — the arc is DIFFUSE**, which is why
  every per-lap gate reads it free. **No caching lap — 198's levers are CLOSED; the only lever is FEWER objects.**
  **The GAP-CLOSING trick (111/112/113) is SPENT; the TELL that replaced it (a label/name/comment asserting what the
  draw ignores) is CASHED 11x — host history rotated to the archive at 268; the law is in SKILL.md.** ⇒ **THE HOST HAS
  MOVED ALL THE WAY UP TO THE MARKETING COPY (267): read the placard's claims as a CHECKLIST and ask of each whether the
  rule behind it can fire** — and **268 found the rung BELOW the code: a comment naming a STRUCTURE the value's own
  MECHANISM cannot produce** (the seabed's "shoals and channels", built from a downsampled hash ⇒ blocky white noise).
  Still MUTE: `[T.IND]` (no calendar).
  ⛔ **GARDEN is RETIRED — host starved, see (p).**
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
  Clouds spawn `x:rng()*G, y:CTRY-20+rng()*40` with **no reference to the land**, so a seed parks its sky over the sea —
  **242's probe counted 4/7, 6/7 and 3/7 clouds off-land** (seeds 42/7/1234), and only **3–4 of 7** soaked clouds ever
  render a veil (`probe-front` D). **The lever is the SPAWN, not the draw** — bias `cl.x`/`cl.y` onto the live rows
  (`ROWMIN`/`ROWMAX`, `HEXI`) for ~2x the visible weather at **zero new draw work**. ⚠ Rain over the sea is **CORRECT**
  (201) — this is about *coverage*. **Sky × Polish.**
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
  ✅ **(ap) CLOSED BY 266** (windrows; body archived at 267, law in SKILL.md). ⚠ **DO NOT re-open the sea's TILE FILL
  (255's ⛔ stands).**
  **(at) THE LOFT'S WINDOWS NEVER GO TO BED** (267, seed-7 agent's aside): a loft is **housing**, but `BEDT` is keyed by
  **TILE TYPE** and a loft is `T.IND` ⇒ its glass burns at 100% on every face all night while every RES/MID/COM/TOWER
  pane is put to bed by `windarkAt` (199) — *"the brightest mass in the crop… the coral sign band is swallowed by the
  glow."* ⚠ **199's law recursing onto a FLAG, not a TYPE** ⇒ the fix is a **per-cell predicate, NOT a `BEDT[T.IND]`
  entry** (which would also bed the working shed's night-shift clerestory, 173). Urban × Polish; pairs with (au). ·
  **(au) THE LOFT'S "ROOFTOP STUDIO" READS AS A GREEN ROOF** (267, same agent): drawn as a **full-width hex cap**
  (`prism(gx,gy,0.2,0.16,…,'sage')`), not the small box intended, and its banding *"closely resembles the generic
  residential tower banding elsewhere."* ⚠ **Legibility — the lever is the SHAPE.** Urban × Polish. ·
  **(as) THE WINDROWS READ A TOUCH RULER-DRAWN** — both 266 agents, independently, two seeds: *"perfectly straight and
  uniform in thickness… a taper would sell it harder."* A **stroke cannot taper** ⇒ redraw the row as a **filled tapered
  lozenge** (still ONE path object ⇒ still free), S-curved spine, feathering out at the upwind tail. **Water × Polish.**
  **(av) THE TRAM'S CATENARY IS A 0.5px HAIRLINE** (269) — drawn unconditionally and *correctly*, yet **every agent that
  looked reported "no overhead wire visible"** ⇒ **215's law: it TINTS rather than MARKS.** Same bug as the elevated
  transit's 0.5px rope ⇒ **`polish-tile`, cue (a) FAMILY — the lever is a BODY/WIDTH, never more strokes.**
  **(aw) HUD, UNVERIFIED — a 269 agent read the controls card as clipping *"TRANSIT REA…"* at 1400x900.** ⚠ **229'S LAW —
  REPRODUCE IN A REAL BROWSER FIRST**: my camera's own caption div sits bottom-centre and `probe-hud` swept 6 widths and
  found **0 clipped labels**. Suspect the harness; this may be **(ar)'s shape a fourth time.**
  **(ax) THE FAIRY RINGS ARE ON THE SMALL SIDE** (272 — **both** agents, independently, both seeds, unprompted, on a
  PASSing frame: *"legible, not speckle… but a hair more cap contrast would help"*). Measured **15.8–20.8 CSS px/ring at
  fit** = ~4x a ped's shadow (4.4, shipped) ⇒ **NOT the hairline family, NOT cue (f)** — a *contrast* nudge, not a body.
  Gate: `probes/probe-shroomvis.mjs`. **Nature × Polish.**
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

> **Archive:** the 266 entries before Iteration 264 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

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

## Iteration 267 — the warehouse could never gentrify, because its own cheapness was the thing being measured (2026-07-14) [Urban fabric × Deepen]

**Vector.** Urban fabric × Deepen — 12 laps overdue, and the header's own steer said its
colour channel (254), massing (235), facades (216) and ground plane (209) are all
measured-closed, so the lap had to come from **225's grep-the-seam law**. It did.
`grep`ping the upgrade pass turned up `c.loft`: a full draw (brick prism, strips of new
glass, a coral arts-district sign on the parapet, a rooftop studio), **advertised in the
placard** — *"Warehouses become lofts and far fields go solar once the rent says so."* —
and **read by nothing else in the file.** No tooltip branch, no population, no life.

**The defect (measured before a line was written; `probes/probe-loft.mjs`, pure world
data).** **0 lofts. On 6 seeds in 6, at every era, for the artifact's entire life.** And
**0 warehouses even left eligible** — 218's signature: not a tuning problem, *the gate
never opens.* The rule's own comment says *"rising land value turns old warehouses into
lofts"* and it gates on **`c.val > 0.45`** — but `valueSrc(T.IND)` is **0.18**, the lowest
source in the city bar burnt ground, and `updateValue` mixes 60% neighbour / 40% source,
so **an industrial lot's own cheapness is subtracted from the very signal meant to lift
it** — and warehouses cluster with warehouses, which drags it lower still. Highest `c.val`
any warehouse reaches in any city: **0.425**. The gate demands 0.450. It is not reachable.

**Change.** ONE predicate, and every reader on it.
- **`blockValue(x,y)`** — the mean `c.val` over the six neighbours, i.e. *the statistic
  `updateValue` already computes*, minus the lot's self-suppressing term. A warehouse does
  not gentrify because the warehouse got valuable; it gentrifies because **the city arrived
  at its door.** Gate: `blockValue > LOFTVAL`, and **`LOFTVAL = 0.5` is not a number I
  chose** — it is `valueSrc`'s default return and `updateValue`'s own `n?s/n:0.5` fallback,
  *the artifact's own definition of neutral land.* Swept (Part B): **0.45 admits 26 of 27
  warehouses and the yard vanishes; 0.55 starves 4 seeds in 6** (233); **0.50 fires on 6/6,
  worst seed 2, and leaves a gradient** — the sheds on the city side convert, the ones deep
  in the works do not.
- **The pass now WALKS ITS HOST.** Opening the gate alone shipped almost nothing: it still
  converted **6.7%** of what it admitted, and **no probability could fix that** — swept to
  `p=0.8` it still left **2 seeds in 6 with no loft at all**. The cause is 263's law: the
  pass hunted a **3–6 cell** host with `rc()`, *a lottery over the whole 3,400-cell plate*,
  so it saw a given warehouse **less than once in three decades.** **A rule's ignition is a
  distribution over a space, and the space was wrong before the rate was.** It now iterates
  `HEXI` like the corner-shop pass above it, rolling on `hashCell(x,y,seedNum^SALT^TICKN)`
  ⇒ **zero `rng()` draws** (263), and `LOFTP=0.006`/tick ⇒ the yard turns **over decades**
  (0 lofts at 2006 → 1–2 by 2015 → the yard turned by 2035), not in one year.
- **The MARKET fork is GONE.** It was never in the placard's promise, MARKET has a healthy
  pass of its own, and on a three-shed yard **it ate the host** — it took both convertible
  sheds on one seed in six and left no loft. Dropping it makes the pass write **only
  `c.loft` and `c.th`, which no rule reads**: it changes **no tile type at all.**
- **`WORKSMIN=1` — the works never spends its last shed.** Gentrification takes the *edge*
  of the yard and on a big yard `blockValue` says so by itself, but **a small yard is ALL
  EDGE**: unguarded, 2 seeds in 6 converted to the last shed and the city lost the sawtooth
  warehouse and its clerestory (173) **altogether** — 206's law, inverted (the rule eating
  its own host population).
- **The tooltip names it** off the SAME `c.loft` the draw gates on, as the corner shop is
  named off `c.corner`. Verified against **independently recomputed truth** (122, not a
  screenshot): every loft says *Loft conversion*, every working shed still says *Industry*,
  3 seeds, 0 misses.

**Census.** PASS, 0 page errors. Core **flat**: `roads +0` (byte-identical), `developed
−22 (−0.36%)`, `pop +1632 (+0.93%)`. **`IND` does not appear in the tile histogram at
all** — 27 across 6 seeds on HEAD, **27 on the patch**: the proof the pass changes no
terrain. The MID −50 / RES +32 / TOWER +13 shuffle is the **known** cascade from deleting
the dead `rc()` loop's ~11 `rng()` draws/tick from 2006; all <5%, mechanism named.
**Path objects (222 — count, don't infer): day −64 (−0.06%), night +5 (+0.004%). FREE.**

**Probe.** `LOFTS 0 → 14 across 6 seeds, and 6/6 seeds now carry one` (HEAD: 0/6).
Conversion **93%** of eligible. **Every city still keeps working warehouses** (3/1/1/4/1/3).

**Visual.** Both seeds PASS — and **both agents named the converted loft BLIND, on a
crossed mapping** (42→`alpha`, 7→`beta`), each citing the intended cues unprompted
(*"strip glazing + coloured sign band + rooftop box"*) against the warehouse's sawtooth
roof. Before/after taken **inside one page** by clearing `c.loft` (230) — same world, same
instant, floor 0, so the pair is honest despite the stream shift. Whole-plate reads clean
on both seeds; no compounding drift.

**Verdict: FIXED** — a rule that had never once run in the artifact's life now runs, on
every seed, and the placard's promise is true for the first time.

**Header.** 397 → 406 lines (budget 400, **6 over**): ~45 lines of superseded material moved to
the archive (the 264 step-back narrative, the closed (s)/(ap) bodies, the stale *"NOT Urban"*
steer this lap refuted) against ~35 added. Next lap should trim before its vector.

## Iteration 268 — the seabed was a hash, and a hash cannot be a shoal (2026-07-14) [holistic step-back, 34th + Water & coast × Polish]

**Vector.** The 34th step-back (due). 3 lights × 2 calendars × 2 seeds via `probes/shot-stepback.mjs`, two blind
whole-frame agents, the perf arc, and — because both agents FAILed the same surface on both seeds — one FIX.

**The step-back read.** ✅ **261's SEASON IS ALIVE AND LEGIBLE.** On a **crossed** mapping both blind agents named the
winter frame **by the light alone**, one reciting the mechanism unprompted (*"the sun has already set … so its day is
shorter"*). The discriminating-pair camera (264) works and needs no further defence.
❌ **But both agents, independently, on both seeds, FAILed the SEA as a hexagonal quilt** — *"stepped hexagon terraces"*,
*"you count the tiles before you see water"* — **including in the DAY frames.** This is the FAIL/ASIDE law INVERTED for
the 4th time: the headline FAIL was right.

**The banked probe ACQUITTED it (228's law, 9th recursion — and this time on the ADJACENCY, not the units).**
`probe-seastep` (257) asks: what is the RGB step between two **DEPTH-ADJACENT** sea hexes? It answers 10.6 at day,
step/chroma **0.14**, and 257 banked that as *the bar the artifact has always accepted*. Every number is true. **It is
the wrong pair.** Tone `k` vs tone `k+1` need not be **neighbours in the world** — and the step the eye reads is between
two hexes that **TOUCH**.

**The defect (`probes/probe-seaquilt.mjs` — render-free: the artifact's own `rDeep` + `seaFace()`, no pixels, no clock,
no noise floor, nothing to stub).** `seaT` is not depth. It is depth **plus a "two-octave seabed"**:
`n = 0.62*hashCell(x>>1,y>>1,SEASALT) + 0.38*hashCell(x>>2,y>>2,…)`, under a comment promising *"shoals and channels
rather than contour lines"*. **`hashCell` is a spatial HASH — white noise — and downsampling it does not SMOOTH it, it
makes it BLOCKY**: constant inside a 2×2 block, an **independent uniform draw across every block edge**. A shoal has to
be *continuous* to be a shoal. Measured, on the step between hexes that actually touch:

| variant | nbr step | max | step/chroma | **≥2-tone jumps** | tone SD (the shoals) |
| --- | --- | --- | --- | --- | --- |
| HEAD (blocky hash) | 5.4 | **31.2** | 0.07 | **5.0%** | 0.361 |
| DEPTH (noise off = the floor) | 4.6 | 11.0 | 0.06 | **0.0%** | 0.356 |
| **SHIPPED (interpolated)** | 5.2 | **21.5** | 0.07 | **1.4%** | **0.364** |

⚠ **THE MEAN ACQUITS AND THE TAIL CONVICTS (224/241a).** HEAD's *mean* neighbour step (5.4) is barely above the
noise-free floor (4.6), and its step/chroma (**0.07**) is **half** the 0.14 that 257 certified. **The quilt is entirely
in the tail:** HEAD puts a **≥2-tone jump on 5.0% of all touching sea-hex pairs**, up to **31 RGB** (step/chroma 0.41,
~3× the accepted bar) — hard seams scattered at random through open water. `DEPTH` **cannot produce one** (0.0%). That
5% is the honeycomb, and no mean will ever show it to you.

**Change.** `seaOct(x,y,sh,salt)` — the same two octaves, same weights, same amplitude, same mean, **smoothstep-
interpolated between the hash lattice points** instead of held constant across each block. Hard jumps **5.0% → 1.4%**,
max **31.2 → 21.5**, and the **must-not-move column holds: tone SD 0.361 → 0.364** — the seabed is *smoothed, not
flattened*. The probe carries a **SHIPPED** column reading the artifact's real `seaT` (248's Part B), and it lands
**exactly** on the modelled `SMOOTH` row.

**Census.** PASS. `pop`/`roads`/`developed` **+0**, **tile histogram empty** — correct: `seaT` picks a *colour*, changes
no terrain and draws no `rng()`. `solarRoofs +4` is the **harness's own tick wobble** (226): re-running the **same file**
read **+3**.

**Perf.** Path objects **day 111,121 → 111,168 (+0.04%) · night 138,636 → 138,596 (−0.03%)** — sign-inconsistent, i.e.
noise, and structurally so: a colour cannot change how many paths are rasterized. ⚠ The lap **timer** said day +3.4% /
night −1.9% — **over-reading for the 3rd time** (216). **ARC vs 177: day +19.4% · night +14.1% — the same band held
since 242. The arc is STOPPED (26 iterations, no growth). Do not open a perf lap.**

**Visual.** ⚠ **THE FIRST BLIND ROUND WAS MY OWN INSTRUMENT (239, and I re-introduced it).** I named the pair
`one`/`two` — **ordinal labels carry an implicit order** — and **both agents chose "two", on a CROSSED map**, i.e. they
agreed with the *position* and disagreed about the *build*. Re-shot with **non-ordinal** names (`kappa`/`sigma`), with
**position crossed as well**: seed 42's agent named the patch as the weaker quilt and **measured the frames itself** to
prove it (mean cell-boundary step **7.1 → 4.9**, p95 **16.0 → 10.7**, variance undiminished — *"smoothed, not
flattened"*); seed 7's agent, also measuring, **could not distinguish them** (86% of water px identical) and **said so
rather than inventing a difference.** Both whole-city frames PASS. ⇒ **The effect is real, directional and free; its
SALIENCE is seed-dependent.** Nobody preferred HEAD; nobody saw a flattened sea.

**What is NOT fixed, and cannot be by this lever.** The **one-tone** terrace survives untouched (p90 = 11.0 in *every*
variant, `DEPTH` included). That is 255's ⛔ — a per-hex flat fill terraces onto the lattice **by construction** — and it
is why both agents still say *"hex edges are perceptible."* **268 removed the hard SEAMS (the tail); it did not and
cannot remove the LATTICE.** Anything further needs a different rendering unit, not a different field.

**Verdict: FIXED** (step-back + Water & coast × Polish). The sea's comment now describes what its value does.

## Iteration 269 — the streetcar was named for a street it could not see (2026-07-14) [Transport × Deepen]

**Vector.** Transport was the most overdue domain (last touched 258, ten laps back), and 225's
grep-the-seam law is now 11 for 11. Read the placard's transport promises as a checklist (267's
law: the tell's host has moved up to the marketing copy) and ask of each whether the rule behind
it can fire.

**Change.** `TRAMS RIDE THE AVENUES` — the tooltip has said *"Riding the avenues since 1985"*, and
the spawn comment *"streetcars ride the avenues from the mid-80s"*, for the artifact's **whole
life**, over a vehicle that picked a **uniformly random road** — byte-identical to the bike and
truck spawns immediately above and below it — and then random-walked it. `stepVehicle` has **no
`flow` term anywhere**. Meanwhile the city has *published* the avenue since iter 77 (`c.flow >=
ARTFLOW`, the drainage trunk), **draws** it with its own solid doubled centre line and a lit night
corridor, and **routes the police cruiser down it** (`servTarget`). The one vehicle NAMED for the
avenue was the one that could not see it. This is **199's tell at BOTH rungs at once — the tooltip
AND the code comment — with a correct sibling three hundred lines away.**
- ONE predicate, all readers share it (112): `isAvenue(x,y)`, sited with `ARTFLOW`. The cruiser's
  dispatch, `__find('arterial')` and the streetcar's route had each answered this separately.
- A **PREFERENCE, never a rail** (206/219), and **it must be**: the avenue is *not a rideable
  network*. Measured — **9–16 components**, the biggest holding **23%** of arterial cells, **20%
  dead ends**, mean degree **1.85** — while `roadNbrOpts` **forbids the U-turn**, so a tram
  *confined* to the trunk **strands within a block**. She keeps to the avenue while there IS one and
  takes the ordinary rule when it runs out, which is what a streetcar does. Written as pure
  addition: with no avenue in reach the rule is **byte-identical to HEAD's**.
- The tooltip now reads the **same predicate the route steers by**, computed live (249's ferry
  precedent), so label and draw cannot drift apart again.

**Probe** (`probes/probe-avenue.mjs` — temporal (134), drives the artifact's own `advanceEntities`).
Share of a vehicle's life spent standing on an avenue, 6 seeds × 900 sim-seconds:

| | chance line | **TRAM** | police | car | bike | truck |
| --- | --- | --- | --- | --- | --- | --- |
| HEAD | 16.7% | **17.4% = 1.04x** | 29.1% = 1.74x | 1.10x | 1.05x | 1.12x |
| patch | 16.7% | **41.8% = 2.51x** | 28.7% = 1.72x | 1.05x | 1.11x | 1.17x |

**The controls are what make it believable.** The **POLICE is a free positive control** (248) — a
correct sibling in the same array and the same step function that *provably* reads `c.flow`; at
1.74x it proves the probe **can see an avenue-rider**. **CAR/BIKE/TRUCK are the must-not-move
column** (250) and sit **on the chance line in both builds**, which is where uniform walkers belong
— and they also *measure* the chance line rather than assuming it. **HEAD's tram rode the avenue
LESS than an ordinary car did.**

**Two ledgers (206), and the second one INVERTED my worry.** The avenues concentrate toward the
core — and so do the **towers** — so the rule might have been dragging her into the one part of the
city that *buries* a ground-level thing. Isolated by suppressing the tram layer and re-rendering in
**one page** (230; floor exactly 0, occlusion counted off the composited canvas): visible ink per
streetcar **54.5 px HEAD → 67.1 px patch, +23%, up on 5 of 6 seeds.** A trunk is a *wide open
corridor*, so riding it **exposes** her. Reach (distinct road hexes) 314 → 282: she has a route now,
and still gets around.

**The constant is at its ceiling, and the sweep says so.** `AVESTAY` 0.85 → 0.97 bought **+2.3pp of
avenue** (41.8 → 44.1%) and **cost** mean reach 282 → 252, with **seed 2024 collapsing to 176 hexes
(0.40x a car)** — she starts **pacing the trunk fragment she is on**. ⇒ **The limiter is her RETURN
time, not her STAY time, and the stay-lever is EXHAUSTED.** The residual (worst seed 2.27x, where
the avenue network is most fragmented) is **the HOST, not the tuning**.

**Census.** PASS. `pop`/`roads`/`developed`/`arterials` **+0** — the tram spawn draws `Math.random`,
never the seeded `rng()`, so the CA stream is untouched. `trams 54` unmoved. `greenRoofs +1` is the
documented ±2 tick wobble (226). Tile histogram empty, as a behaviour vector must be. Path objects
flat **by construction**: the same six trams are drawn, merely elsewhere.

**Visual.** Whole-city **PASS on both seeds** — no z-order tears, no floating, no blown colour, the
city still reads as a coherent coastal diorama. ⚠ **The blind whole-city LOCATE returned "I CANNOT
RESOLVE THEM" — and that is the CORRECT answer**, not a failure: a tram is **1–3 px at fit zoom**
(215's hairline law), so a whole-city frame is *structurally* the wrong instrument for this claim.
The probe owns it. (An agent that refuses to invent a difference is a working blind gate — 268.)
**Close-up, seed 42: PASS, and a complete positive confirmation** — the agent found her unprompted:
*"brick-red boxy prism with a pale cream belt, a thin dark pantograph pole, and a thin overhead
contact wire… rests on a ROAD hex, not a tall building… the solid doubled amber centre line is
continuous and the tram sits on it. No z-order tear."* That is the claim, confirmed by eye.
**Close-up, seed 7: FAIL — and BOTH halves of it were measured, and NEITHER is this change.**
- *"The streetcar is completely buried."* **TRUE, and it is this lap's honest COST.** On seed 7 the
  trunk runs **through the CBD**, so the best-exposed on-avenue tram renders **13 px of ink at fit**
  (against 80–127 px elsewhere): centring on her world point correctly frames **the tower standing
  in front of her**. This is **258's law exactly — the predicate that makes a behaviour MEANINGFUL is
  the predicate that BURIES it** (as `livelyKerb` does for the cab): an avenue is high-flow ground,
  and high-flow ground is where the towers are. It is a property of the CITY (206), not of the rule
  — and **the aggregate refutes it as a systemic worry: +23% MORE visible, 5 seeds of 6 up.** On
  seed 7 HEAD had **no trams on an avenue at all**, so it had nothing there to bury.
- *"A thin grey line drawn over the foreground towers — a z-tear."* **The ELEVATED TRANSIT**, which
  the seed-7 agent had *itself* named a frame earlier (*"a grey aerial-tramway pylon/cable, a
  different feature"*). Its z-order is **CLEARED BY PROBE TWICE** (203/212) and it is present in the
  **HEAD** frame too. **This is the 15th mis-diagnosis of that draw as a z-order bug**, exactly as
  the ledger's standing ⚠ predicts — *the persistence IS the evidence, and the fault is LEGIBILITY.*

**Verdict: SHIPPED.** The streetcar rides the avenue at **2.51x chance, up from 1.04x**, is **23%
more visible** for it, and her label now reads the predicate her wheels do.

⚠ **THE CAMERA COST TWO GATE ROUNDS AND BOTH FAILURES WERE MINE, NOT THE CITY'S** — see the laws
promoted to SKILL.md. (1) I set **`scale` instead of `zoom`**: `setZoom` does `scale = fitScale*zoom`,
so `scale` is DERIVED — the canvas rendered at 7.2x **under a HUD still reading `1x`**, and an agent
that read the pill correctly called the frame un-zoomed and refused to grade it. (2) I aimed at
**`ctr(v.x,v.y)`**, which is **204's law verbatim** — a vehicle is drawn *interpolated* between its
hex and its next by `v.p`, so four agent reads on two seeds all said *"no vehicle at frame centre;
the candidate is ~100px up-left."* **Measured: aim error 7.2–26.6 world-px = 32–119 screen px at
zoom 7.** They were right both times, and both times the artifact was innocent.

**Cues banked.**
- **(av) THE TRAM'S CATENARY IS A 0.5px HAIRLINE** — drawn unconditionally and correctly (it spans
  the road segment, not the car), and **every agent that looked reported "no overhead wire visible."**
  `lineWidth=0.5` ⇒ 215's law: it *tints* rather than *marks*. Same finding as the elevated transit's
  0.5px rope. **`polish-tile` backlog, cue (a) family — the lever is a BODY/WIDTH, not more strokes.**
- **(aw) HUD: a seed-7 agent read the bottom-right controls card as overlapping the stat strip and
  clipping "TRANSIT REA…" mid-word** at 1400x900. ⚠ **229's law — a defect only the harness can see is
  a defect in the harness: my own caption div sits bottom-centre and `probe-hud` swept 6 widths and
  found 0 clipped labels. REPRODUCE IT IN A REAL BROWSER BEFORE BUILDING TO IT.**
- The elevated transit was reported **for the 14th time** (*"thin grey polylines… like scratches on
  the image"*). The "tower wallpaper" aside is **224's projection law** and stays closed.

## Iteration 270 — the capitol was named for a roof it could not raise (2026-07-14) [Civic & culture × Polish]

**Vector.** Civic & culture × Polish (rotation: Civic was 10 laps overdue; last Civic kind was
Deepen at 259, so the kind varies too). Found by **225's grep-the-seam law (now 12 for 12)** crossed
with **267's**: read the placard/label claims as a *checklist* and ask of each whether the code
behind it can deliver. `CIVICDESC.parliament` promises *"The seat of the region, and **the tallest
civic roof in Solvista**"* — the one civic label making a **comparative, falsifiable claim about the
pixels**.

**The defect (measured, two ways, and the second contradicts the first).**
`c.th = kind==='parliament' ? 34 : CIVTH0 + c.v*14` — and **`20 + 14 = 34` IS the parliament's
constant**: the landmark's height was set to the **supremum of the very distribution it is meant to
tower over**, so it can be *tied* but never *beaten*. `probes/probe-civicstock.mjs` (pure world data):
parliament is #1 on 6/6 seeds **by a mean margin of 0.9 in 34 — 2.6%** (hospital 33.9 · school 33.7 ·
observatory 33.6 · firehouse 32.3). True, and invisible.
Then restated in **the viewer's units** (205) by `probes/probe-parlheight.mjs` — the **drawn
silhouette rise** above the hex centre, in CSS px, off the final composited canvas (occlusion free,
floor **exactly 0 px** on all six seeds) — and **the world-data probe turns out to be WRONG about the
winner**: the **UNIVERSITY out-tops the parliament on 4 seeds in 6** (rank **#2**, worst −3.1 px,
**mean margin −0.5 px** — the capitol is on average *shorter* than its tallest rival). Two causes,
and **fixing either alone ships nothing** (267): (a) the constant is the stock's ceiling; (b) the
capitol's own draw then takes **`hb = max(16, h*0.8)` — a 20% body haircut** — while the university's
campanile (`h+8`, spire to `h+14.6`) takes none. **The claim is false under BOTH readings**: the
parliament's *cornice* (27.2) is not even in the **top four** civic roofs.
⚠ And the tell had already been **quoted as fact by the harness itself**: iter 175's
`probes/probe-parliament.mjs` header calls it *"the grander **'tallest civic roof'**"* — an earlier lap
read the label, believed it, and never checked it.

**What was built, and why it did not earn its place.**
One predicate, three readers (`civicTh()`, replacing three copies of the literal), with the lead
**derived from the stock** (`PARLTH=(CIVTH0+CIVTHV)*PARLLEAD`) rather than typed beside it, so a later
lap that widens the civic range cannot silently re-tie the capitol. A **two-ledger sweep** (206) picked
the constant from the *artifact's own* bars — clear the tallest rival civic on the **WORST** seed (233),
stay under the tower stock — never from a number I chose: ×1.0 fails (2/6), ×1.2 fails (4/6),
**×1.6 clears 6/6 by +6.9 px worst-case**, and the towers are never threatened (they rise **88–172 px**
to the capitol's 40). Cost: census **PASS**, `developed/towerHt/civicKinds +0`, **tile histogram empty**,
path objects **+0.065% day / +0.045% night**. Must-not-move (250): every other civic **identical**.
**Two rounds of blind agents killed it, and they were right both times.**
- **Round 1 (raise `c.th`).** Both agents, on a **crossed** map, identified the patch *by wall length*
  (82 px vs 45) — and both, independently, on two seeds, reached the same aside: *"a striped office slab
  wearing a dome as a hat"* · *"a domed tower rather than a low wide capitol; the columns get quite
  slender."* One FAIL, one PASS-with-the-same-objection.
- **Round 2 (hold the portico at the stock's ceiling; put every unit above it into a DRUM).** The
  portico became **byte-identical to HEAD** (proved: the sweep's `th=34` column reproduces HEAD's rises
  **exactly** — at `dr=0` the drum vanishes, a free **exact fixed point**, 245), the capitol cleared every
  rival **6/6 by +9.9 px worst (+23%)**, and **both agents FAILed again, independently, on the crossed
  map, in the same words**: *"too tall and too narrow, striped like the colonnade… a minaret / clocktower,
  not a legislature."* (Their *diagnosis* was wrong — seed 7's agent said the portico had been "squashed
  to a base pad", and it provably had not; **212's law**: the FAIL is where an agent is *wrong*, the
  converged *perception* is where it is right. The portico only *looked* smaller because the drum towered
  over it.)

**Verdict: EXPLORED → REVERTED** (`solvista.html` byte-identical to HEAD, md5 confirmed). Reverting a
change that passed the census, passed its probe 6/6, cost nothing, and held its controls **identical** —
because it failed the one bar the numbers cannot express — is the system working (82/88/101/114/233/244).

**What I would avoid next time — and it is the law (promoted to SKILL.md).** Every remaining route was
measured and blocked: a taller *body* is the slab; a taller *drum* is the stalk; removing the `*0.8`
haircut alone gets the cornice over the stock but still loses to the campanile's apex (a 7% tie). The
reason is structural and it is **244's law arriving through the GRID instead of the camera**: **a per-hex
draw's WIDTH is capped by the hex, so making it TALLER necessarily makes it more SLENDER — and any shape
whose identity IS being wide and low (a capitol, a bowl, a basilica) cannot be made tall on one hex.**
Height and identity are in direct conflict and the tile decides the winner. ⇒ The parliament needs a
**massing redesign** (a drum wider than tall, a dome scaled to it, no colonnade stripes on the drum), and
**a single-tile massing redesign is `polish-tile`'s job, not a growth lap's** — so it is banked as
`polish-tile` cue **(g)**, with its gate already written (`probe-parlheight.mjs`: rank + margin in CSS px,
worst seed, must-not-move column, exact fixed point).

## Iteration 271 — nine people sat in the dark water off a beach that had packed itself away (2026-07-14) [People & activity × Deepen]

**Vector.** People & activity × Deepen. Rotation put People oldest (8 laps); its cue list was
empty, so — 225's law, now 13 for 13 — I grepped the seam instead of trusting it.

**The finding.** 262's law says: after you fix a per-entity rule, grep the *function* you fixed
for the other things it draws. Run one scope wider — grep every draw that puts a **person** on the
plate and ask which of them keeps state — and `drawSurfer` opens on `const[cx,cy]=pxc(...)`. **No
gate. None.** Nine surfers are spawned once in `genWorld` and were drawn on **every frame of the
artifact's life**, while every other person in the city keeps an hour (`curfewAt` 210 · `kidOut`
262 · `j.out` 210 · `VCURF` 230 · `matchClock` 240) and 247 gave the **sand** a calendar, so the
umbrellas and deckchairs pack away in winter. The water crowd learned **neither**.

**Probe (`probes/probe-surfsession.mjs`), and it was run BEFORE a line of the fix.**
- **A — temporal (134), no pixels, no noise floor.** HEAD: **DISTINCT LINEUP SIZES = 1**, on every
  seed — 9 of 9 still in the break at the darkest hour. *The constant IS the defect* (236), no
  threshold invented. **The POSITIVE CONTROL is the JOGGER** (248): a correct sibling, same
  shoreline, same clock, two functions away — it reads **DISTINCT 3–4 and 0 in the dark**, which is
  what makes the surfers' flatness a real flatness and not a dead rig. Kayaks+boats = the
  must-not-move column (250): **18, unmoved.**
- **A2 — the season.** 9/9 in **every** season while `beachPhase()` runs **0.19 (winter) → 1.0**.
- **B — 259's check, and the reason to run it FIRST.** Is the night lineup even *visible*? If it
  renders 20px of dark ink on a dark sea, the hours half is a nothing and only the season half is
  real. It is **not**: their foam wakes are **bright on a black sea**, so HEAD's night lineup
  renders **120–129 px, ~13 px/surfer — as much as at noon.** Isolated by suppressing `drawSurfer`
  in ONE page (226/230): floor **exactly 0**, occlusion free, build-agnostic.

**Change.** `surfSession()` — **two predicates the artifact already owns, and no third invented**:
the **sun** (`nightAmt()`, the clock the whole city keeps) × the **calendar** (`beachPhase()`,
247's own — so the water and the sand now answer **one** season). Each board keeps its own
threshold so the lineup **thins one at a time** rather than blinking out (the cliff 210 was
written to end). `SURFDARK = JOG0+JOGJ` is **taken from the ladder, not invented** (226): the last
board leaves the water as the last runner leaves the strand. `surfOut(s) = s.ph/7` is **derived,
not drawn** — `ph` is already `Math.random()*7`, so it is exactly uniform on [0,1) and costs
**zero** new random draws ⇒ the shared stream is byte-identical and every kayak, jogger, balloon
and resident is *provably* untouched (204/262). Three readers: the draw, the tooltip (which used
to say *"Waiting on the next set"* over a surfer sitting in the dark in midwinter), the probe.

**Census.** PASS, `pageerrors: 0`. Core **exactly flat** — `pop +0 · roads +0 · developed +0` —
as a draw-only, `rng()`-free change must be. Tile histogram empty (correct). `solarRoofs +1 /
greenRoofs +1`: re-ran the **same file** per 226 and got **−3 / −1**, so it is the harness's own
tick wobble, not the edit (which is unreachable from `tick()`).

**Fixed point (245), and it is arithmetic rather than a claim.** At the dry peak in daylight
`surfSession()` returns **exactly 1**, so `1 < ph/7` is false for every board and the patch runs
HEAD's draw byte-for-byte. Proved by **predicate suppression inside ONE page** (253): force
`surfSession = () => 1` (= HEAD, which has no gate) and re-render — **0 px on all three seeds**,
with a deep-night control at **137/161/146 px** proving the suppression is live. **⇒ the feature
adds no draw work at its reference condition, and strictly removes it elsewhere** (241's credit).

**Visual.** Both seeds **PASS**, blind, on a **crossed** map, and both agents named the treatment
*by counting*: seed 42 (patch=`kappa`) — kappa day 4 / night **0** / winter **0**, sigma 4/4/4;
seed 7 (patch=`sigma`) — sigma day 4 / night **0** / winter **0**, kappa 4/4/4. Both called the
**day pair identical** (36 px; max channel delta 8) — the fixed point, confirmed by eye. Whole-city
frames clean on both seeds.

**Two instrument failures, both mine, both caught by the tool and not by a gate round.**
1. **The night pin was derived — at the wrong year.** 261 gave the season a **day length**
   (`sunWarp`), so `nightAmt()` is **not a pure function of `dayT`**: the same `dayT` is deep night
   in winter and broad daylight in summer. I derived the pin once, while `year` was still whatever
   `__warp` left, then applied it at 2035.62 — and **the "night" frame self-reported
   `nightAmt=0`.** The camera was shooting the control and captioning it the treatment. **202's
   self-report caught it in one line.** 264 says *derive the pin from the curve at shoot time*; the
   sharpening is that a derived pin is a function of **all** the curve's inputs.
2. **"No argmax needed" framed the pier.** I reasoned my way to 249 — a surfer floats on open water
   where *"nothing can occlude it"* — and aimed at the **median board by world-y**. On seed 42 the
   boards nearest that aim sit **behind the pier deck**, so the patch's DAY frame, in which the
   probe measures 140 px of surfer, **showed no surfer at all**, and the agent **correctly refused
   to grade it**. A board's position says where it *is*; it says nothing about whether it can be
   **seen**. Re-aimed by the **argmax of the lineup's own measured ink** (226/230/234) and both
   builds land on the *identical* world point (the day frames being byte-identical), so the blind
   pair frames the same water. *(The `1×` I briefly took for a 269 violation is `btnSpeed` — the
   sim speed. The artifact has no zoom pill.)*

**Verdict: SHIPPED.** The last people in Solvista who never went home now do — **and the kayakers
are the last holdout** (cue (aw); the predicate is already written for them).

## Iteration 272 — the whole wood came up on the same tick, every autumn, for the artifact's entire life (2026-07-14) [Nature × Deepen]

**Vector.** Nature × Deepen. Rotation put Nature oldest (8 laps since 263), and the header
ordered its lap to come from **a fresh grep of its seam, not from its stale cue list**. It
did: `grep`ping `tick()` for Nature's passes surfaced **`c.shroom` — an autumn fairy-ring CA
that the ledger has never once mentioned in 271 iterations.** Fully wired (a `tick()` pass, a
`drawShroom`, a `TILEDESC` row, a `__find` hook) and, unlike 263's bloom, **genuinely alive**.
225's grep-the-seam law is now **14 for 14 at FINDING**.

**The defect (measured, and it needs no threshold).** The rings fire — but **every ring in
the city surfaces and vanishes on the SAME TICK**:

```
HEAD   rings: 0 0 0 0 0 0 0 0 0   4 4 4   0 0 0 … 0   3 3 3   0 … 0   9 9 9   0
```

A **perfect square wave**, every autumn, on every seed: `ticks>0` = **exactly 24 = 8 autumns
x 3 ticks**, and **DISTINCT NONZERO COUNTS PER AUTUMN = 1** — the count never once changes
while the rings are up (236: when the answer is a constant by construction, the constant IS
the defect). At speed 1 a year is 6 s, so the wood **blinks on for 1.35 s and off for 4.65 s,
in unison, forever** — a strobe (134).

**Cause — 262'S LAW, ARRIVING ON A CA.** The gate asked **one GLOBAL question** (`shroomSeason
= s2>0.76 && s2<0.98`) and then rolled `hashCell(x, y+(year|0)*37, …)`. **`(year|0)` is CONSTANT
across a season**, so all ~2.9 in-season ticks evaluate the **identical** hash for a given cell
⇒ it is **ONE roll, taken city-wide at the first in-season tick**. There was no per-cell phase
anywhere in the rule. (The season window is 0.22 yr and a tick is 0.075 yr — the whole autumn
is **2.93 ticks**, so the CA had no temporal resolution to express anything.)

**Change.** `SHRM0`/`SHRMW`/`SHRMEND`/`SHRMP` + **`shroomDue(c,s2)` — ONE predicate, and the
pass now reuses the woods' existing `isWood`** rather than re-implementing it inline. Each ring
keeps its **own hour of the flush** (`s2 > SHRM0 + c.v*SHRMW`) and its **own span**
(`shroomLife`, 2-3 ticks, mean **2.5**). Both uniforms are ones the cell **ALREADY carries**
(`c.v`, a `hashCell`) ⇒ **zero new random draws**, so the CA stays **wholly inert to the seeded
stream** (263's law).

**Census.** PASS. `pop`/`roads`/`developed` **+0**, **tile histogram EMPTY** (the pass changes no
tile type). `solarRoofs +3 / greenRoofs -1` is **226's harness wobble, not mine** — re-running the
**same patched file** read `+3`, then `-1`. Not a HEAD diff.

**Probe** (`probes/probe-fairyring.mjs` — temporal (134), no pixels, no noise floor,
build-agnostic via `SRC=`):

| | HEAD | patch |
| --- | --- | --- |
| **distinct nonzero counts / autumn** | **1.00** (square wave) | **2.77** |
| peak rings | 6–11 | 6–11 (**held**) |
| ring-ticks / yr | 3.0 | 4.1 |
| **spring+summer rings (GUARD)** | 0 | **0** ✅ |
| bloom (positive control, 248) | 46–63 | **identical** ✅ |
| developed (must-not-move) | — | **identical, all 6 seeds** ✅ |

The flush now **breathes** instead of blinking: `0 → 1 3 5 4 2 → 0`.

**Visual.** PASS, both seeds. Both agents **located** the rings, confirmed they are bedded
correctly on forest hexes (not straddling seams, not on road/roof/water), and confirmed the
whole city is clean and coherent. ⚠ **Both, independently, added the same aside: the rings are
"on the small side… a hair more cap contrast would help"** ⇒ cue **(ax)**, below.

**Perf.** No new path objects. Mean ring life **2.5 ticks vs HEAD's 3.0** at the same rings/autumn
⇒ the frame draws **~17% FEWER ring-instances on average**; a ring is 12 path objects and there
are ≤11 per city (~0.1% of a 105k-object frame), in autumn only. **A small credit, not a cost.**

**Verdict: DEEPENED.**

## Iteration 273 — the sky was never over the sea; the projection had hoisted it out of the city (2026-07-14) [holistic step-back, 35th + Sky & atmosphere × Polish → cue REFUTED]

**Vector.** Rotation said Sky (oldest, 7 laps) and the cue list said **(aj)** — *"the clouds spawn with no
reference to the land, so a seed parks its sky over the sea; the lever is the SPAWN, not the draw: ~2x the
visible weather at zero new draw work"* — the ledger's **#1 open cue**, marked *doubly measured*. The 35th
step-back was also due. Both were done in one lap, and the step-back's own agents **re-reported the cue a
third time**, which is what made it worth probing before building.

**Step-back (35th).** `shot-stepback` on seeds 42/7, 3 lights × 2 calendars, every pin derived from the light
curve. **Both seeds PASS.** No z-order tears, no floating elements, no blown-out colour after ~270 laps. Both
blind agents, on a crossed map, **named the winter dusk frame from the light alone** (*"the sun is already
below the horizon at the identical wall clock — earlier sunset"*) ⇒ **261's day-length season is alive.**
Perf, interleaved: **lap (vs 268) day +2.9% / night +0.0%; ARC (vs 232, 41 laps back) day +3.9% / night
+1.8%** — ~**+0.1%/iteration**, half the historical +0.2% rate. No perf-fix lap needed.

**The cue, refuted on every count.** `probe-cloudland` (pure world data; the metric is the artifact's OWN
shade gate, `inB(anchor) ? shadeGround(cl) : 0`, averaged over the cloud's whole x-traverse — `cl.x` drifts
and wraps, `cl.y` never changes, so **`y` is the only permanent lever the spawn has**):
- **The clouds are NOT parked over the sea.** They stand over land **55% of their lives**: **3.86 of 7 cast a
  shadow at a random instant** (4.0 of 7 at spawn), on 6 seeds in 6.
- **`cl.y` IS A DEAD LEVER.** The row profile is flat: the single **best row in the city** is worth **1.10x**
  a uniform pick (0.607 vs 0.550; worst row 0.456). So a hard gate pinning all 7 clouds to the best row buys
  **+10%**, and a soft preference buys less. **The promised ~2x is not under-tuned — it is arithmetically
  unreachable.**
- And the shade is not too faint either. `probe-cloudink` (suppression by fillStyle signature in ONE page,
  floor **exactly 0**) reads it against **the incumbent bar** (226) — `shadS`, the contact shadow under every
  tree, ped and car, which the artifact has shipped and every agent has accepted for 270 iterations:
  **cloud shade amp 5.29 (d 0.15) vs shadS 4.77 (d 0.13) = 1.11x.** Nor is it too small: the shade ellipse is
  **30·s** half-width and the puff's own lobes reach **~30·s** — *the shadow is exactly the size of the cloud
  casting it.*

**So why do the agents keep saying it?** Because **I asked a question the projection destroys.** The puff is
drawn at `py2 = cy − 185 − cy*0.52` — **250–400 px ABOVE its ground anchor**, where `cy` is the ground point
the shade is painted on. Screen-y in this artifact is **depth + altitude**, not ground position (224). So an
agent asked *"where are the clouds?"* answers with a **screen** position that encodes how high the cloud is,
reads the sky band behind it, and truthfully reports *"over the sea."* The cue was **manufactured by the
question**, re-confirmed three times because every re-confirmation asked it the same way.

**Census.** PASS, `pop/roads/developed` **+0 / +0 / +0**, tile histogram empty — the artifact is byte-identical
(no source change).

**Verdict.** **EXPLORED → REVERTED.** Cue (aj) is **RETIRED — do not re-open the cloud spawn.** Nothing shipped;
two instruments banked (`probes/probe-cloudland.mjs`, `probes/probe-cloudink.mjs`) and the law promoted to
SKILL.md. ⚠ **A near-miss worth recording:** `probe-cloudink`'s first run read **0 px for BOTH the treatment
and the incumbent** — and a zero on the incumbent is *impossible*, which convicted the probe in ten seconds
(250). Cause: **Chromium CANONICALISES `fillStyle` on read** (`'rgba(36,30,20,.05)'` comes back as
`'rgba(36, 30, 20, 0.05)'`), so a prefix match silently never fires. **Without the incumbent column I would
have read "the shade renders nothing" and gone off to redesign a draw that is fine.**
