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
| **Water & coast** | 6, 10, 12, 16, 20, 33, 106, **169** | 90 | 17, 25, 51, 65, 72, **113**, **123**, **159**, **196**, **245**, **257** | 22, ~~**205**~~ | | U2, 44, 58, 79, **116**, **132**, **150**, **185**, **214**, **223**,  **234**, ~~**255**~~, **266**, **268** | **97**, **141**, **176** |
| **Urban fabric** | 32, 62 | 7, 23, ~~82~~, **151** | 38, 54, 68, 92, **165**, **173**, **189**, **199**, **209**, ~~**218**~~, **219**, ~~**254**~~, **267** | 47, **109**, ~~**160**~~ | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103**, **110**, **118**, **124**, **143**, **180**, **216**, **220**, **224**, **228**, **235**, **239** | **133** |
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
- **ROTATION.** Last vector per domain: Transport **258** · Civic **259** · People **262** · Nature **263** ·
  Sky **265** · Urban **267** · Water **268**. ➡ **NEXT: Transport (258) and Civic (259) are BADLY overdue (10/9
  laps) — take one of them.** ✅ **(s) CLOSED BY 265 · (ap) CLOSED BY 266.** ➡ **Top open cue is (aj)** (the clouds spawn
  with no reference to the land — Sky × Polish, doubly measured, ~2x the visible weather at zero new draw work);
  **(as)** (the windrows read ruler-drawn — Water × Polish) is the freshest.
  🔑 **225'S GREP-THE-SEAM LAW IS NOW 10 FOR 10.** 267 is its loudest payout (Urban, written off hardest with four ⛔s,
  was hiding **a whole RULE THAT HAD NEVER RUN**); **268 is its subtlest** (the sea, whose banked probe had *acquitted*
  it, was hiding a seabed **built from the wrong kind of noise**). ⇒ **An empty cue list — or a passing probe — records
  where you have LOOKED, not what is THERE.** Spend the grep.
  ✅ **268 WAS THE 34th STEP-BACK — NO COMPOUNDING DRIFT ON LAND; 261'S SEASON IS ALIVE** (both blind agents named
  winter **by the light alone**, on a crossed map). **The SEA was the finding** (see 268) — and it was the FAIL/ASIDE law
  **inverted**: the headline FAIL was right and the banked probe had acquitted it. ➡ **NEXT STEP-BACK ~273.**
  ⚠ **A STEP-BACK'S BLIND A/B MUST USE NON-ORDINAL FILE NAMES.** 239 says name the FILE, never a letter — **but
  `one`/`two` are ordinals and carry the same implicit order**: 268's first round had **both agents pick "two" on a
  CROSSED map** (⇒ agreeing with the POSITION, disagreeing about the BUILD). Use meaningless tokens (`kappa`/`sigma`)
  **and cross the POSITION too**, or the pair is not blind.
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
  ⚠ **Read the `peds` cap first** (111) before designing anything road-borne.
  ⛔ **254: THE BUILDING COLOUR CHANNEL IS SPENT — DO NOT RE-TRY *ANY* "THE BUILDINGS SHOULD SHOW X REGIONALLY" IN
  COLOUR** (age, value, density, flow — anything; law in SKILL.md). The `cream`/`terra`/`sandDk` grain scatters
  per-building warmth at **SD ~45**, *larger than any gap the lever can reach*; **99/103/239 bought that grain ON
  PURPOSE to kill wallpaper.** ✅ **THE HOST IS STILL LIVE AND UNREAD** (`c.age`: *the old town IS downtown*) — **but
  only a SHAPE, an ORNAMENT, a COUNT can show it. Never a hue.** (`probes/probe-buildingage.mjs`.)
  ✅ **CLOSED, bodies archived at 264: (aq′) the season has a DAY LENGTH** (⚠ retire `probe-seasonarea` as a seasonal
  score; ⚠ **264: the season is ~0 at MID-DAY by construction — measure/shoot it at the EVENING MARGIN**) · **262: the
  `LITAMT`-as-a-bedtime gate is EXTINCT** (⚠ **do not add another global-light gate to anything that keeps hours**).
  🔴 **HOW TO READ THIS CUE LIST (251/255).** A bad instrument does not misgrade a lap — it **MANUFACTURES A CUE** that
  steers the loop for tens of iterations ((ag) was #1 for **24 iterations**, false on every count). 🔑 **A CUE
  RE-CONFIRMED IS NOT CORROBORATED UNLESS A *DIFFERENT* INSTRUMENT DID IT.** 🔴 **228's law has now recursed NINE times,
  EVERY TIME on an instrument this harness already owned** (237×2 · 238 · 251 · 255 · 260 · 264 the step-back's own
  CAMERA · **268 the ADJACENCY — `probe-seastep` compared two tones one step apart on a QUANTISED SCALE, where the eye
  compares two hexes that TOUCH**) ⇒ *read what an instrument MEASURES, WHERE IT SAMPLES, and **WHICH PAIR IT
  COMPARES**.* ⚠ **263: a cue can be RIGHT about the tell and WRONG about the host** — check the host's **POPULATION**.
  ⛔ **259: `c.lit` CANNOT EXPRESS DARKNESS** — `lit = LITAMT*(0.35+0.65*c.lit)` has a **0.35 floor** ⇒ `c.lit=0` is *35%
  lit* (range **2.9:1**); the observatory at 0.000 moved ambient luminance **−1.9%**, invisible. **Fine as a CHOOSER,
  dead as a LOOK ⇒ do NOT build "X answers the night glow" in COLOUR.** (Law in SKILL.md.)
  ⚠ **ARTIFACT FACTS from 236–261 that are NOT laws and CANNOT be re-derived from SKILL.md** (the law-recaps these
  lines used to carry are in `GROWTH-archive.md`, "rotated out at 256"):
  **268:** **`seaOct(x,y,sh,salt)` — the seabed's octave, smoothstep-INTERPOLATED between hash lattice points.**
  ⚠ **NEVER "SIMPLIFY" IT BACK TO `hashCell(x>>sh, …)`** — a downsampled hash is **blocky white noise**, constant inside
  a block and an independent draw across every block edge, which is what put a **≥2-tone jump on 5.0% of touching sea
  hexes** (max 31 RGB, ~3× the step the eye accepts). It is **NOT** a smoothing of the hash; it is a *different field*.
  ⚠ **`seaT` IS COLOUR-ONLY and BUILD-TIME** (set in `genWorld`, read only by `hexTile`'s fill + the debug export) ⇒ it
  draws **no `rng()`**, changes **no tile**, and **cannot move a path count** — census `pop`/`roads`/`developed` **+0**.
  ⚠ **THE ONE-TONE TERRACE IS STRUCTURAL AND SURVIVES** (p90 = 11.0 in *every* variant, noise-free included): that is
  **255's ⛔** — a per-hex flat fill terraces onto the lattice **by construction**. **268 removed the hard SEAMS, not the
  LATTICE. Do not re-open the sea's body colour to chase the remainder** (255/257); it needs a different rendering unit.
  ⚠ **`probe-seastep` (257) IS STILL CORRECT AND STILL THE WRONG PAIR** — it measures the **DEPTH-adjacent** step (tone
  `k` vs `k+1`), which need not be neighbours in the world. **For anything a viewer sees, use `probe-seaquilt`: the step
  between hexes that TOUCH.**
  ⚠ **TEN harness files still TYPE `golden t=0.68`** (`probe-seastep`, `-cloudshade`, `-daylen`, `-seasonhue`, `-sunseason`, `shot-seamirror`, `shot-gondola`, …) — 264/265 fixed only the camera and `probe-goldenhue`. **MEASURED (268): at the dry peak that pin is worth `GWARM` 0.720 of a possible 0.786 = 92% of golden** ⇒ **mildly under-strength, NOT the 36% disaster of 265** (`GWARM` has a broad plateau ~0.68–0.78). **Low priority — do not escalate; but DERIVE, never type, in anything new.**
  **267:** **`c.loft` — ONE predicate, THREE readers** (the `tick()` conversion, the `T.IND` draw, the tooltip's *Loft
  conversion*). ⚠ **`blockValue(x,y)` = mean `c.val` over the SIX NEIGHBOURS — reach for it for any "has the city
  arrived here?" question, and NEVER use a lot's OWN `c.val`**: `updateValue` mixes 60% nbr / 40% `valueSrc(t)`, so a
  **cheap tile's own cheapness is subtracted from the signal** (`valueSrc(T.IND)=0.18` capped every warehouse at `c.val`
  **0.425** under its own **0.45** gate ⇒ 0 lofts, ever). **`LOFTVAL=0.5` is the artifact's own neutral** — **do not
  "tune" it: 0.45 admits 26 of 27 sheds and the yard vanishes; 0.55 starves 4 seeds in 6.** ⚠ **THE PASS WALKS `HEXI`
  AND DRAWS NO `rng()`** (`hashCell(x,y,seedNum^0x10F7^TICKN)`); it writes only `c.loft`/`c.th` ⇒ **NO TILE TYPE
  CHANGES** (`IND` identical to HEAD). **Do not "tidy" it back onto `rc()`** — a 3–6 cell host cannot be found by a
  lottery over 3,400 cells (**6.7%** converted; `p=0.8` still left 2 seeds in 6 empty). ⚠ **`WORKSMIN=1` IS
  LOAD-BEARING** (a small yard is ALL edge ⇒ unguarded, the port converts to its last shed and the sawtooth warehouse +
  its clerestory (173) vanish). ⚠ **The IND→MARKET fork was DELETED** (never in the placard; it ATE the 3-shed yards).
  ⚠ **IND is STILL MUTE on the calendar**; the loft is **RESIDENTIAL with no `BEDT` entry** ⇒ cue **(at)**.
  **266:** **`WROWK`/`WROWL` — the sea's windrows.** ⚠ **A ROW TRAILS UPWIND (west + slightly north) BECAUSE THAT IS A
  Z-ORDER DECISION, NOT A LOOK** — the tail must lie over hexes *already painted*; point it downwind and every later row
  paints it out. Truncated by a walk over `cellAt`, so it can never touch land. **Day-only** (`LITAMT<0.6`) ⇒ night is
  byte-identical and is a **free perf noise floor** (199). ⚠ **`probe-seaamp` CANNOT GRADE IT** (it area-means the whole
  ocean; a row paints 2%) — use `probe-seastate` + the agents.
  **263:** **`bloomHost` — ONE predicate, FOUR readers** (the excitable-media spread in `tick()`, the rain front that
  seeds it, `bloomAt()`, the tooltip's `Wildflowers` row). Host = **MEADOW + SHOREPARK**. ⚠ **THE BLOOM CA DRAWS NO
  `rng()` AT ALL** — spread *and* spark are `hashCell(x,y,seedNum^SALT^TICKN)`, so it is **wholly inert**. **Do not
  "tidy" it back onto `rng()`** (a terrain-gated roll on a ~100-hex host spends ~2.5 extra draws a tick and reshuffles
  the city). ⚠ **`TICKN` IS PART OF THE WORLD AND IS RESET IN `genWorld`** — **any new tick-salted hash resets with the
  world**, or the same seed renders *different flowers*. ⚠ **THE REFRACTORY IS JITTERED (`-(9+(c.v*10|0))`, mean 13.5 ≈
  HEAD's 14) AND THAT IS LOAD-BEARING** — a *shared* constant refractory **synchronises** the band (41% of ticks had
  **zero** flowers city-wide); `c.v` is a uniform the cell already carries ⇒ **no new draw** (262). **Do not flatten it.**
  ⚠ **DUNE and PARK were MEASURED and REJECTED as hosts** (biggest connected component **6** and **14** vs SHOREPARK's
  **34**) — they can only speckle, never carry a wave. **Do not add them.** (GARDEN's starved host: see cue (p).)
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
  ✅ **CLOSED LADDERS — DO NOT RE-OPEN** (roster rotated to the archive at 268; every law is in SKILL.md): the **WASH**
  ladder · the **TOWER LOOK** · the **SKYLINE** ladder · the **HUD** lap · **137's standing crowd** · the
  **SEASONAL-VEGETATION** seam. ⚠ **230's `taxi` flag is LOAD-BEARING** (`VCURF` thins the night fleet by CLASS).
  ⚠ **(y) came from an agent reading `shoot.mjs` output — REPRODUCE it in the user's configuration first** (229).
  **Interaction/UX** last touched **229**.
  **CUES, RANKED.** ⚠ **The CLOSED/RETIRED roster — (w)(z)(t)(u)(ab)(af′)(ag)(ah)(ai)(al)(am)(an)(aq)(s)(ap) — and its
  live do-not-re-open warnings were rotated to the archive at 268; every law is in SKILL.md.** Half-closed: **(aj)'s
  SHADE half CLOSED 242 — its cloud-SITING half is still OPEN**; **(ao)'s SHAFT half CLOSED 248, its BOW half REFRAMED
  and its prescription REFUTED.** Live:
  **(aj)** the clouds spawn with no reference to the land, so a seed parks its sky over the sea — **the lever is the SPAWN, not the draw**: ~2x the visible weather at **zero new draw work** (Sky × Polish, doubly measured) ·
  ⛔ **(ak) MEASURED-CAPPED and its prescription DEAD** (238 + 252) — **do not re-open the canopy** ·
  **(y)** the scorched inland cluster (Nature × Polish; ⚠ **one 216-era aside — the light was rebuilt at 253/261, so
  RE-DERIVE it from a fresh frame before designing**) · ⛔ **GARDEN's staggered beds are RETIRED (263, host starved).**
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
  that cannot carry the signal* — is in SKILL.md. It paid out at **253/261 (the LIGHT)** and again at **268 (the SEABED
  — a field whose MECHANISM could not carry the structure its own comment named).**
  **206:** the vacant lot is a **MIRAGE** (`EMPTY` with ≥2 RES nbrs falls **85 → 6.5** by 2035); development eats every
  gap — **and it eats CA HOSTS too: anything in `RAISEABLE` will be built over** (263). **⚠ THE FIRE CA IS A GHOST — do
  not build "X answers the fire"**: ignition is year-gated ⇒ at 2035 nothing can ignite, and fire **never spreads**.
  **⚠ THE `polish-tile` BACKLOG — measured cues that are NOT growth laps. Do not spend a domain's lap on one; they need a tile redesign, and each has a gate written. Full bodies archived at 264; the live warnings only.** ⚠ **(a), (e) and (f) ARE ONE FINDING — 215's HAIRLINE LAW** (a sub-pixel ornament *tints* its background instead of marking it; **the lever is a BODY / SIZE / CONTRAST — never more strokes, never placement**).
  (a) **THE WHOLE ELEVATED TRANSIT is sub-pixel at fit zoom** (0.5px rope, 5px cabins). ⚠ **NEVER RE-OPEN THE Z-ORDER — CLEARED BY PROBE TWICE** (203/212); **13 mis-diagnoses**, and *that persistence IS the evidence: the fault is LEGIBILITY*. Suspect named + priced (256): **`drawMonoAt`, 2.1% of the frame.** *Do NOT re-try a body/halo under the rope (measured — backfires) nor a lit top edge (impossible at 0.5px).* **MOST-REPORTED DEFECT BY A WIDE MARGIN; a `polish-tile` lap is BADLY OVERDUE.**
  (e) **THE OBSERVATORY IS TOO SMALL TO READ** (259; ≈ **5.5 CSS px at fit**, on a frame where it is 96.3% visible). ⚠ **SMALL, not BURIED — do NOT re-open the siting.**
  (f) **THE WILDFLOWERS ARE SUB-PIXEL** (263; ≈ **1.1 CSS px at fit**, true of HEAD's meadow bloom too). ⛔ **DO NOT RAISE THE PER-HEX BODY LIFT — that is 255's ⛔** (⇒ a hex quilt). ➡ The only way through is **a SHAPE THAT CROSSES TILE BOUNDARIES** (a drift of petals, a streak), never a brighter fill.
  (b) **`university` is the ONLY of the twelve civics with no `LITAMT`** — pitch dark after sunset; every place to put the light failed (195). (c) **A parked service vehicle needs its CIVIC TILE to have a visible apron on its front edge** (204). (d) **The marsh reeds do not read** — seven sub-pixel strokes round the pool (cue (i), 113).
  **Sky is post-saturation (Deepen/Fix ONLY — its additive/CA cells are traps).** **Urban: additive spent (118), Connect measured-hard TWICE** (160 RES terracing · 165 the `hstr` parade — neither forms a straight-hex-axis run ≥3, so neither is an arcade host); **Roof-furniture CLOSED city-wide**; **GROUND PLANE SPENT (209)**; **216 spent the FACADES**; **colour channel SPENT (254)** — the **harbour apron** is the last named look-remnant (cue **(o)**: a port vector must **build the waterfront FIRST**). ⚠ **"Urban is spent" HAS BEEN REFUTED TWICE** — from the SILHOUETTE side (232/237, CLOSED by 235+239) and, at **267**, from the **RULES** side: its `tick()` seam hid **a conversion that had never once fired.** ⇒ **Urban's LOOK is done; its RULES were not audited. Grep `tick()`, not `drawBuilding`.** Live Urban cues: **(at)** + **(au)** (both on the loft). (**Sky's moon is FIXED (135) and NAMED (144)**, both closed.
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
  **THE FAIL/ASIDE LAW (212; law in SKILL.md, tally archived at 268): in a whole-frame read the FAILs are where an agent
  is WRONG and the ASIDES are where it is RIGHT.** Paid out 13x; ⚠ **237/252/255/268 INVERTED IT — the headline FAIL was
  RIGHT** (268: both step-back agents FAILed the sea as a quilt, on both seeds, and the banked probe had ACQUITTED it).
  ⇒ **Grade a FAIL by MEASURING it; but when agents say "I CANNOT SEE IT", the burden is on your PROBE, not their eyes**
  (they are the only instrument that measures *salience*). ⇒ **262: a FAIL can convict HEAD — read WHICH FILE it names.**
  Weight an aside two agents reach independently above any verdict.
  Perf ARC (arc ref `7e2ac2c` = 177; per-step-back refs + priors archived at 233/236/268).
  ✅ **THE ARC IS STOPPED — FLAT ACROSS SIX STEP-BACKS. THE OLD `+0.2%/iteration` IS NOT BEING PAID; DO NOT QUOTE IT.**
  ARC vs 177 held at day **+18.1..+19.4** · night **+12.4..+14.1** across 242→**268** — **TWENTY-SIX iterations for NO
  arc growth.** Night profile: `winBandR` 32.1% · `prismS` 29.1% · `hexTile` 12.0%; `drawCell` 94%. **268's lap: path
  objects day +0.04% / night −0.03% (noise).** 🔑 **STRUCTURAL: a domain past ADDITIVE saturation STOPS COSTING FRAME
  TIME.** ⇒ **Do NOT open a perf lap.**
  🔑 **THE LAP TIMER OVER-READS; GRADE A LAP WITH `probe-drawbudget` BESIDE `perfab`, NEVER `perfab` ALONE** (216's law;
  bodies archived at 251) — **3x now it reported a stable +2–3% over a lap that measurably added NO draw work (268's
  timer said day +3.4% / night −1.9%, sign-inconsistent, on a build-time colour field that cannot move a path count).**
  ⚠ **A WORLD-CHANGING VECTOR IS NOT FREE just because its diff has no draw call — THE WORLD IS THE DRAW LIST** (222),
  and ✅ **it runs in REVERSE — a vector that REMOVES things gives draw work BACK** (241, −3.2% day). ⚠ **Cue (x) stands**
  (215's `seamVeg`: a stroke-vs-fill sweep at equal path count is the best-supported open perf question). **⚠ THE
  STANDING PERF SUSPECT (207, UNCHANGED to 268): THERE IS NO HOT ORNAMENT — the arc is DIFFUSE**, which is why every
  per-lap gate reads it free. **No caching lap — 198's levers are CLOSED; the only lever is FEWER objects.**
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

> **Archive:** the 261 entries before Iteration 259 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

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
