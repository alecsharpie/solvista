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
| **Water & coast** | 6, 10, 12, 16, 20, 33, 106, **169** | 90 | 17, 25, 51, 65, 72, **113**, **123**, **159**, **196**, **245** | 22, ~~**205**~~ | | U2, 44, 58, 79, **116**, **132**, **150**, **185**, **214**, **223**, **234**, ~~**255**~~ | **97**, **141**, **176** |
| **Urban fabric** | 32, 62 | 7, 23, ~~82~~, **151** | 38, 54, 68, 92, **165**, **173**, **189**, **199**, **209**, ~~**218**~~, **219**, ~~**254**~~ | 47, **109**, ~~**160**~~ | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103**, **110**, **118**, **124**, **143**, **180**, **216**, **220**, **224**, **228**, **235**, **239** | **133** |
| **Transport** | 2, 9, 21, 31, 48, **164** | 77 | 28, 39, 55, 63, **112**, **121**, **128**, **155**, **179**, **193**, **230**, **249** | 5, 15, **138**, **211** | U4 | U1, U3, 70, 85, 87, 94, **146**, **188**, ~~**203**~~, **241**, **243** | **105**, **171** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107** | 36, 59, 66, 80, 91, **149**, **158**, **175**, ~~**195**~~, **213**, **244**, **250** | 45, **204** | | 73, ~~**114**~~, **168**, **231** | 52, 122, **140**, **184** |
| **Sky & atmosphere** | 27, 43 | | 19, 35, 50, 57, 95, **135**, **153**, **161**, **181**, **190**, **208**, **225**, **236**, **253** | | | 61, 81, 89, **115**, **200**, **242**, **248** | ~~**134**~~, **144** |
| **People & activity** | 41, 56, **127**, **170**, **186** | 49 | 34, 64, 93, **104**, **119**, **145**, **178**, **201**, **210**, **240** | 78, **111** | | 84, **137**, **163**, **226** | 71, **154**, **191** |

- **Interaction/UX — the FEATURE INVENTORY was rotated to the archive at 211 (history, not steering).** ⚠ **229 is
  cross-cutting (the TEXT LAYER: `<meta charset>`), and it REPEALED 134's rule** — raw UTF-8 in JS string literals is
  now SAFE (`probes/probe-charset.mjs` asserts it), so **do not hand-escape a `·` or an `é`.** What steers: when adding
  an entity array, `stamp()` it in its draw + add an `ENTINFO` row (same discipline as the census hook); `stamp()` also
  draws the focus ring, so any stamped entity is ringable free. **An `ENTINFO` `sub` may be a FUNCTION of the entity
  (105)** — use it when a thing's interest is its *membership* (which line/route/depot), computed live, never a string.
- **ROTATION.** Last vector per domain: People **247** · Transport **249** ·
  Civic **250** · Nature **251** · Sky **253** · Urban **254** · Water **255**. ✅ **256 WAS THE 31st STEP-BACK — both
  seeds PASS, no compounding drift, and THE PERF ARC HAS STOPPED (see the ARC block: flat across FOUR step-backs).**
  ➡ **NEXT: Civic or Transport × Deepen** (both stale, and Transport owns the ledger's most-reported defect).
  ⚠ **NOT Urban, NOT Water × Polish** (255 spent the sea's fill channel; 254 spent the building colour channel).
  🔑 **256'S TWO LIVE DEFECTS ARE BOTH ALREADY BANKED, BOTH NOW MEASURED, AND NEITHER IS A REGRESSION** — they are
  the two things the loop has never spent a lap on: **(s)** golden hour (now **7x** reported, and it finally has a
  CAUSE — see (s)) and **polish-tile (a)** the elevated transit (now **10x** reported — see it).
  ⛔ **255: THE SEA'S TILE-FILL CHANNEL IS SPENT — DO NOT PAINT A SIGNAL INTO THE WATER'S BODY COLOUR.** A smooth field
  **sampled per hex and rendered as a flat hexagonal FILL terraces onto the LATTICE**: measured, the wash may be SUBTLE
  (**d=0.57** vs the sea's own grain ⇒ *both* blind agents saw **nothing**) or BRIGHT (**d=1.15** ⇒ *"a high-contrast hex
  QUILT... camouflage, not a sea"*), **and there is no middle** (214's law, from per-EDGE strokes to per-HEX fills). The
  glitter escapes ONLY by being a **low-alpha overlay** (max 0.16) — i.e. by never leaving the subtle regime.
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
  ✅ **(aq) CLOSED BY 253 — THE SUN NOW KEEPS A CALENDAR.** `seasonCool()` is read in ONE place, `daylight()`, reaching
  the **TINT**, the **CSS SKY** and **`GWARM`**. ⛔ **The sun's ARC must stay untouched** (`SUNUP`/`SUNDN` ARE the light
  curve's keyframes). ⚠ **RETIRE `probe-seasonarea` as a seasonal score** (its "66.4%→0.0%" moved with not one plant
  changed — the metric was SUPERSEDED, not satisfied).
  🔴 **HOW TO READ THIS CUE LIST (251/255; narrative + every law rotated to the archive at 256).** A bad probe does
  not merely misgrade a lap — it **MANUFACTURES A CUE** that steers the loop for tens of iterations and gets
  "reconfirmed" by the same broken instrument ((ag) was #1 for **24 iterations**, reconfirmed twice, **false on every
  count**). 🔑 **A CUE RE-CONFIRMED IS NOT CORROBORATED UNLESS A *DIFFERENT* INSTRUMENT DID IT.** ✅ 252/256 are the
  template: agents + a probe + a grep — **three instruments, one answer.** 🔴 **228's law has now recursed 5x, EVERY
  TIME on a probe this harness already owned** (237×2 · 238 · 251 · 255) ⇒ *read what a probe MEASURES and WHERE IT
  SAMPLES, not what it is CALLED, and apply 228's test **PER METRIC**.* (256 nearly made it 6: `probe-hud` would have
  closed (ar) for the wrong reason — it measures TEXT CLIPPING and is blind to DOM boxes colliding.)
  ⚠ **ARTIFACT FACTS from 236–251 that are NOT laws and CANNOT be re-derived from SKILL.md** (the law-recaps these
  lines used to carry are in `GROWTH-archive.md`, "rotated out at 256"): **250:** `concertSeason()` — ONE predicate,
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
  ⚠ **253's LEFTOVER, and the one thing (aq) did NOT buy: DAY LENGTH.** The sun still rises and sets at the same hour
  all year (`SUNUP`/`SUNDN`) — 253 left them alone deliberately: they ARE `KEYS`' own dawn/dusk keyframes, so moving
  them **desynchronises the disc from the sky**. ⇒ **A day-length vector is NOT a two-constant edit; it must move the
  whole `KEYS` curve seasonally.** A real Sky × Deepen swing, and still unspent. ·
  **(aj)** the clouds spawn with no reference to the land, so a seed parks its sky over the sea — **the lever is the SPAWN, not the draw**: ~2x the visible weather at **zero new draw work** (Sky × Polish, doubly measured) ·
  ⛔ **(ak) MEASURED-CAPPED and its prescription DEAD** (238 + 252) — **(aq) supersedes it; do not re-open the canopy** ·
  **(s)** golden-hour contrast collapse (Sky × Polish — CONSTRAINED; ⚠ **both agents re-raised it at 252** —
  *"land, beach, farms, parks and rooftops all collapse to the same terracotta"* — so it is **LIVE**, and it may be the
  **same line of code as (aq)**) · **(y)** the scorched inland cluster (Nature × Polish) · Nature's **GARDEN staggered
  beds**, held by (p) · **(ap)** the sea's foam is invisible at fit zoom (Water × Polish).
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
  have now mis-diagnosed it **TEN times** (217, 232, 237×2, 242, 252×2, **256×2**). **That persistence IS the evidence:
  the fault is LEGIBILITY** — **a hairline ornament needs a BODY** (215), not more strokes. *Do NOT re-try a body/halo
  under the rope (measured — backfires) nor a lit top edge (impossible at 0.5px).*
  ✅ **256 FINALLY NAMED THE SUSPECT WITH A NUMBER, AND REFUTED BOTH AGENT CAUSES.** `probe-darkline` (`MINLEN=4`, so
  it can see CHAINS): the ink is **`drawMonoAt`** — seed 7 night **2,747px, n=350, bbox x 0.11–0.64 y 0.14–0.78**,
  which matches that agent's *own* reported box (*"stray vector guides, x≈0.25–0.66, y≈0.14–0.78"*) almost exactly.
  ⚠ **The agents' CAUSES were both wrong: `drawKite` appears NOWHERE in the census on either seed at any light** (the
  tether is 41px and cannot be the *"400px line crossing the pier"*), and there are no power lines. **A confabulated
  cause laid on top of a correct perception — 212 in its purest form.** 🔑 And `probe-drawbudget` prices `drawMonoAt`
  at **2.1% of the frame**: ***the loudest complaint in the artifact is also one of the cheapest things in it.***
  **MOST-REPORTED DEFECT IN THE LEDGER BY A WIDE MARGIN; a `polish-tile` lap is BADLY OVERDUE here.** (b) **`university` is the ONLY of the
  twelve civics with no `LITAMT`** — pitch dark after sunset; every place to put the light failed (195). (c) **A parked
  service vehicle needs its CIVIC TILE to have a visible apron on its front edge** (204). (d) **The marsh reeds do not
  read** — seven sub-pixel strokes round the pool; its calendar is computed and invisible (cue (i), 113).
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
  Perf ARC (refs 202/207/212/217/222/227/237/242/247/252/**256**, directly comparable; priors archived at 233/236).
  ✅ **AT 256 THE ARC HAS STOPPED, AND THE HEADER'S OLD `+0.2%/iteration` IS NO LONGER BEING PAID — DO NOT QUOTE IT.**
  ARC vs `7e2ac2c` (177): day **242 +18.6 → 247 +19.0 → 252 +18.2 → 256 +18.1** · night **+12.8 → +12.7 → +12.4 →
  +13.2**. **FOURTEEN iterations since 242 for NO measurable arc growth.** **LAP (256 vs 252): day −0.1% / night
  +0.2% — free**, and `probe-drawbudget` is **byte-identical to 252** (`winBandR` 31.9% · `prismS` 29.1% · `hexTile`
  12.1% · `bandS` 7.5%; `drawCell` 95%) ⇒ **zero draw objects added, which is the MECHANISM behind the free timer**
  (216: never `perfab` alone). 🔑 **THIS IS STRUCTURAL, NOT LUCK: a domain past ADDITIVE saturation STOPS COSTING
  FRAME TIME.** The late-game kinds (Deepen · Polish · predicate fixes · probe repairs · honest reverts) are
  *categorically* cheaper than the additive laps that built the arc. ⇒ **ACCEPTED WITH EVIDENCE, not resignation —
  do NOT open a perf lap, and do not let a "the arc is creeping" premise into a future vector.**
  🔑 **THE LAP TIMER OVER-READS; GRADE A LAP WITH `probe-drawbudget` BESIDE `perfab`, NEVER `perfab` ALONE** (216's law;
  bodies archived at 251). **Twice the interleaved LAP timer reported a stable +2–3% over a lap that MEASURABLY REMOVED
  draw work** — a cost with **no mechanism**. Night profile **UNCHANGED from 207/232/252**: `drawCell` **94%**, then
  `winBandR`/`prismS`/`hexTile`/`bandS` ⇒ ~48% static terrain, **no hot ornament.** ⚠ **A WORLD-CHANGING VECTOR IS NOT
  FREE just because its diff has no draw call — THE WORLD IS THE DRAW LIST** (222; LAW in SKILL.md). ✅ **And it runs in
  REVERSE: a vector that REMOVES things gives draw work BACK** (241, −3.2% day). **Count objects when a lap SUBTRACTS too.**
  ⚠ **Cue (x) stands** (215's `seamVeg`: 692 path objects / 228 STROKES cost ~4x the fill model — a stroke-vs-fill
  sweep at equal path count is the best-supported open perf question). **⚠ THE STANDING PERF SUSPECT (207, UNCHANGED
  at 232/237/**252**; NAMED not mandated per 198): THERE IS NO HOT ORNAMENT — the arc is DIFFUSE**, which is why every
  per-lap gate reads it free. **No caching lap — 198's levers are CLOSED; the only lever is FEWER objects.**
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
  ⛔ **(ag) CLOSED 251 — REFUTED ON EVERY COUNT. DO NOT RE-OPEN THE NIGHT SAND OR THE NIGHT GREENS** (greens innocent,
  wash ladder innocent, the `BEACH>=MID` breach was the probe's own centre-pixel MEAN; `probe-goldenhue` REPAIRED —
  area + p90 envelope, HEAD PASSES by 21. Dimming the night sand is a MEASURED dead end: costs `BEACH↔ROAD` 24→18).
  **(ac) CLOSED by 224 — the SKYLINE LADDER (217/218/219) is COMPLETE** (body archived): mass downtown *and* a taper.
  ⚠ **THE WHOLE `c.th` LADDER IS SPENT** — do not re-open placement (dead lever, 218), the COM fork (219), the height
  noise, or `TCAP` (224). (1) ⚠ **`c.th` HAS TWO WRITERS** (placement + the 2022+ growth rule) — touch one, check the
  other. (2) ⚠ **DO NOT DERIVE A TOWER CONSTANT FROM THE MEASURED MEAN `core`** — 98 did (0.125), 219 invalidated it
  (0.282) unnoticed for 6 laps; normalise by the formula's own max (⇒ SKILL.md).
  **(aj) THE SHOWERS FALL WHERE NOBODY LIVES (236; its SHADE half CLOSED by 242, its SITING half OPEN and now
  DOUBLY MEASURED).** Clouds spawn `x:rng()*G, y:CTRY-20+rng()*40` with **no reference to the land**, so a seed parks
  its sky over the sea — **242's probe counted 4/7, 6/7 and 3/7 clouds sitting off-land on seeds 42/7/1234**, which is
  the same defect from a second instrument. Only **3–4 of 7** soaked clouds ever render a veil (`probe-front` D; the
  draw spends a shower 2 hexes short of the rim). **The lever is the SPAWN, not the draw** — bias `cl.x`/`cl.y` onto
  the live rows (`ROWMIN`/`ROWMAX`, `HEXI`) for ~2x the visible weather at **zero new draw work**. ⚠ Rain over the sea
  is **CORRECT** (201) — this is about *coverage*. **Sky × Polish.**
  ⛔ **(ak) SEASONAL-VEGETATION SEAM — CLOSED/SUPERSEDED BY (aq) AT 253.** The plants were never the defect (PARK at its
  coverage ceiling, FOREST 83% conifer); **the season was missing from the LIGHT**. ⚠ **DO NOT re-open the canopy, the
  lawn ((p) protects it), or a palette lap "to fix the seasons".** ⚠ **Mediterranean coast: GREEN WET WINTER + GOLDEN
  DRY SUMMER is CORRECT (201)** — no snow, no bare trees.
  ✅ **(al) CLOSED by 239 — THE BUILDING-LOOK LADDER IS COMPLETE** (228 crown · 235 footprint · 239 the MID-RISE; body
  archived at 241). ⚠ **DO NOT RE-OPEN EITHER BUILDING**; ⚠ **EVERY FORM'S BASE IS ITS WIDEST PART** (the party wall is
  the NEIGHBOUR'S WEST FACE, not a constant).
  ✅ **(am) CLOSED 241 · (an) CLOSED 243 (bodies archived; WARNINGS only).** ⚠ **DO NOT re-tune the elevated beam's
  draw** (measured IN BAND on every axis) **nor bound a loop's RADIUS** (that makes stubs). ⚠ **`stepGond`'s value bar
  decays with NO FLOOR** — gated on `WETSET`; do not un-gate. ⚠ **A cue can bundle a REAL defect with a MISREAD.**
  ⚠ **polish-tile's (a) (sub-pixel rope/masts) is a DIFFERENT, OPEN cue.**
  🔑 **243'S LAW (SKILL.md): A "BEWARE, PROBE P OVER-REPORTS Y" NOTE IS A BUG REPORT, NOT A LAW.** `probe-darkline` is
  **REPAIRED** (gradients apart; `MINLEN=4` censuses chains) — trust it again. 240's aside stands and is cheap: *"tiny
  white chevron glyphs on land (x≈0.47,y≈0.47)."*
  **(ao) ✅ SHAFT HALF CLOSED (248). BOW HALF REFRAMED — ITS PRESCRIPTION IS REFUTED.** ⚠ **THE BOW IS NOT A RIM BUG —
  MEASURED, 6 seeds: 0.00 hex of overhang; it already tests its LEGS**, so *"a flat rainbow lying ON the water"* **cannot**
  be fixed by a rim test. What IS true: its comment says *"no ground, no bow"* while testing `ROWMIN`/`ROWMAX` — **the
  PLATE, which runs out to sea** — so a bow **can** stand over open water. ⚠ **Per 201 that is CORRECT; the defect is
  the COMMENT.** The residue is a **composition** read — **do not build a rim test.** ⚠ Rain over the **VOID** is the bug.
  ⛔ **(ar) REFUTED AND CLOSED (256) — IT WAS THE HARNESS, FOR THE THIRD TIME (229). DO NOT RE-OPEN.** Measured in the
  complaint's own nouns (`getBoundingClientRect`, `.census` vs `.controls` — ⚠ **`probe-hud` would have acquitted it
  for the WRONG REASON: it measures TEXT CLIPPING and is blind to two DOM boxes colliding**, 228 lying in wait):
  **0px overlap at 1400×900** (both edges land on exactly 1080; `transit reach` ends 21px clear), separated by
  **60/200/283px** at 1280/1600/1100, and **0 clipped labels at 6 widths**. The step-back's own camera is the ONE
  width where the panels sit *flush* — and flush-in-a-PNG reads as colliding. **The agents were reading my shot.**
  **(ap) THE SEA'S FOAM IS INVISIBLE AT FIT ZOOM — ✅ CONFIRMED AND MEASURED at 255, ⛔ but its OBVIOUS FIX IS REFUTED.**
  A cap is a `3.0x1.1` **WORLD**-unit ellipse and `fitScale≈0.65` ⇒ **~2 x 0.7 CSS px** at fit (215's hairline exactly).
  HEAD's whole wind response = **0.6% of the ocean**. ⛔ **DO NOT give it a BODY in the sea's TILE FILL — 255 built
  exactly that, it was FREE (0 path objects), MEAN-HELD (0px fixed point) and passed EVERY gate, and it is UNSEEABLE**
  (see the ⛔ in ROTATION). ➡ **Sub-hex, wind-aligned streaks that CROSS tile boundaries, ADDING foam.** **Water × Polish.**
  **(x) A STROKE MAY NOT PRICE LIKE A FILL (215, perf suspect — NAMED, NOT MANDATED).** Build a **stroke-vs-fill sweep at equal path-object count**; `CCACHE` churn is ruled OUT.
  **(y) A SCORCHED-LOOKING HEX CLUSTER INLAND (216, seed 7, unprompted on a PASSing frame).** ⚠ The fire CA is a
  **GHOST** (cannot ignite at 2035) ⇒ almost certainly **LOGGING/clearcut, not BURNT** — **identify the tile first**. Nature × Polish.
  **(s) GOLDEN HOUR: CONTRAST COLLAPSE (212+217+227+232, and a FIFTH at 242 — both agents called golden the WEAKEST
  frame, *"a single textured mat"* / *"muddy brown-olive mush"*. CONSTRAINED; Sky × Polish; body archived at 237).**
  **The complaint is CONTRAST COLLAPSE ACROSS SURFACES, not the sun's position** (217 measured chroma RISING — a
  saturated wash, not mud); use `probe-goldenhue.mjs` to find which pairs collapse **before designing**. ⚠ **The sun
  CANNOT be lowered — 200 put it high ON PURPOSE** (the `.placard` owns the low-left sky). ⚠ **242 adds a lead: both
  agents said the SHADOW SIDES go warm** (*"warm-tinted shadows kill the form"*) — reconcile the gradient's direction
  with the sun's, or move the warmth. **Do not move the sun down.** Not a quick win.
  ⚠ **253 PARTIALLY DRAINED IT, AND ONLY OFF-PEAK:** `GWARM` at the golden pin now runs **0.52 winter → 0.72 dry
  peak**, so the terracotta wash is *seasonally* weaker — but at the **dry peak it is byte-identical to HEAD**, and
  the dry peak is where every agent has complained. ⇒ **(s) IS STILL LIVE AT ITS WORST PIN.** Do not close it, and
  do not "fix" it by raising `seasonCool` at the peak — that would break 253's fixed point.
  ✅ **256 GAVE (s) ITS 6th AND 7th REPORT — AND, FOR THE FIRST TIME, A CAUSE. THE SEA DID NOT GET THE MEMO.** Both
  agents, blind, on both seeds, unprompted: *"sky and sand are peach; the ocean stays essentially its daytime cool
  teal, with no warm sun path or reflected sky — at sunset the water looks **unlit and pasted from another frame**.
  This is the single most fixable thing in the set"* · *"land and sea end up in **two unrelated colour worlds**."*
  ⇒ **The warm wash reaches the LAND and NOT THE WATER**, so golden hour simultaneously *mutes the land's
  separations* and *leaves the sea unlit* — and the frame splits in two. **That is not the contrast-collapse
  symptom; it is its mechanism.** ⚠ **This is 209's law waiting to be cashed a second time** (*what LARGE SURFACE
  wears a field that cannot carry the signal?* — and the **sea is the largest surface in the city**). ⚠ Constraints
  that still bind: **do NOT lower the sun** (200), **do NOT break 253's fixed point** by raising `seasonCool` at the
  peak, and ⛔ **do NOT paint it into the sea's TILE FILL** (255 — that channel is spent and it terraces onto the
  lattice). **Measure with `probe-goldenhue` FIRST** — *which pairs actually collapse* — before designing a line.
- **Reach maps exist — reuse them (U5):** `reachFill(out, r, isSrc)` is a multi-source hex BFS capped at radius `r`,
  land-only (`WETSET` blocks water/marsh/kelp), filling `out` with steps-to-nearest-source (255 = farther than r).
  `recount()` runs four per tick. Any "how far is X from Y" question should call it, not hand-roll a flood fill.
- **⚠ Three census stats can FALL, by design (U5):** `walkPct`, `transitPct`, `solarPct` are **shares**, not counts.
  **Services are walkable's binding constraint** — a tower lap that adds residents without civics *drops* `walkPct`,
  and that is the stat working. Judge by whether the city earned the change, not "up = good". `density` rises with
  intensification and falls with sprawl.
---

<!-- rotated -->

> **Archive:** the 249 entries before Iteration 247 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

## Iteration 247 — the twenty-ninth step-back finds a beach packed for a winter nobody was having (2026-07-14) [holistic step-back + People & activity × Deepen]

**Vector** — the 29th step-back (due at ~247). Whole-city read at 2 seeds × 4 frames
(`shot-stepback.mjs`), the perf lap + arc, and the fix the read turned up.

**The read.** Both agents FAILed, independently, on two seeds, with the *same headline*:
**winter is indistinguishable from summer.** That is cue (ak), reconfirmed — and it is now
four agents across two step-backs (242, 247) saying it. Graded by measuring it (237's law),
the FAIL split cleanly into a **misread** and a **real defect** (243: a cue can bundle both):
- ✗ *"the season runs BACKWARDS — winter is greener; there is no snow, no bare trees."*
  **201's objection-to-the-MODEL.** `TILEDESC[T.BEACH]` says **'Golden sand along the
  Pacific'** and `applySeason`'s own keyframe names `.62` **the golden dry peak**: Solvista
  is a *Mediterranean* coast, so a wet green winter and a golden dry summer is **correct**,
  and snow on a palm coast would be the bug. Rejected — but note **both agents reached it**,
  which says the model is not being *communicated*.
- ✓ *"the beach is still a summer beach — umbrellas, sunbathers, a packed swimming beach in
  winter."* **Real, and exactly 242's banked reachable move for (ak).**

**The seam** (grepped, not assumed). The beach furniture's own comment says *"Beachgoers
follow the sun"*, and the draw reads **three** clocks — `stats.pop`, `LITAMT` (the daily
sun), and `TIDE` (`wetReach`, so a towel is never laid on wet sand). It is deaf to the
**fourth**: the calendar. And the city holds exactly **three** seasonal predicates —
`orchardPhase`, `vinePhase`, `farmPhase` — **all agricultural**. The season reached the
farms and stopped, which is precisely what both agents said independently.

**Change** — `beachPhase()` (0..1, "how much of a beach day is it"), the fourth seasonal
predicate, in the house idiom of the other three: **ONE** predicate, read by BOTH the draw
and the tooltip (117/123 — run the tell forwards, so they cannot drift). A new `describeTile`
row: **Sands — Packed / Busy / Quiet / Empty for the winter.**
Per **245's law** the season rides the **ELIGIBILITY** gate (`v < UMB*beachPhase()` — the
clause that decides *how many* hexes ever lay a towel), **not** the alpha beneath it:
dimming the alpha would leave the *same* crowd fainter, which reads as haze, not as an empty
beach. Centred so `beachPhase()===1` **exactly** at the dry peak ⇒ the draw is HEAD's, bit
for bit, there.

**⚠ THE BUG THIS LAP SHIPPED AND THEN CAUGHT — and it is the entry's real value.** The
first cut simply shrank the umbrella threshold. But the umbrella arm and the **PALM** arm are
**adjacent arms of ONE `else if` chain on the SAME `v`** (`else if(v<0.42) palm(...)`), so
shrinking one arm does not EMPTY those hexes — **it hands them to the next arm.** Winter grew
**a full palm tree in every deckchair slot the crowd vacated**: permanent vegetation popping
in and out with the calendar. **My probe passed it happily** — it measured *that* 2,076 px of
sand changed and never asked *what they changed to* (**214's law**: a NECESSARY but not
SUFFICIENT quantity will pass a change the eye rejects; *"the sand changed"* is necessary for
*"the beach emptied"* and is not sufficient). **Two visual agents caught it, both seeds, one
reading the source to diagnose it.** Fixed by pinning the palm to its own **unseasoned** band
`[UMB, 0.42)`, so the vacated strip `[UMB*beachPhase(), UMB)` draws **bare sand**.

**Census** — PASS, 0 page errors. `roads`/`developed` **exactly +0**; `pop +1` of 172,722
(0.0006%) is 226's documented ±2 tick wobble — the change is draw-only (no terrain, no
`rng()`) and *cannot* causally touch pop.

**Probes** (all three now in `probes/`):
- **`probe-beachpalm.mjs` — THE GATE, and the one the first probe could not be.** Hooks
  `palm()` and COUNTS THE CALLS per season: deterministic, no pixels, no noise floor.
  **PALMS flat at 128 / 109 / 111 across all four seasons on BOTH builds, identical to HEAD**
  ⇒ the migration is gone. **TOWELS swing 3 → 11 → 38 → 15** (seed 42; 11→16→43→23 on 7),
  against **HEAD's 38, 38, 38, 38 — a constant, forever**, which is 236's corollary: when the
  vector is *"make X vary"*, HEAD's answer is a constant **by construction** and no threshold
  had to be invented to call it broken. Fixed point: HEAD **38 towels / 128 palms** ==
  patch **38 / 128** at the dry peak, all 3 seeds.
- **`probe-beachfixed.mjs` — 245's fixed point, as a pixel COUNT and not a HASH.** My first
  cut asserted it with a **hash** and it "failed" on 2 of 3 seeds — **245's own banked warning,
  walked straight into** (*a whole-frame hash is not a diff: one antialiased pixel shouts as
  loudly as a broken feature*). Counted properly, with the floor measured in-run (213):
  **fixed point 0 px (perceptual) on every seed**, inside a byte-floor of 28–45 px, while the
  **winter control diverges 1,591–1,903 px**. Byte-identity at the peak is proved by
  **arithmetic** (`beachPhase() === 1` is exactly true; `x*1.0` is IEEE identity), not by pixels.
- **`probe-beachseason.mjs`** — 196's state-response rig. ⚠ Its first run **failed its own
  negative control** (ROAD moved 47,908 px). That was **196's contaminant**: a box mask around
  a host samples its NEIGHBOURS, and roads border every green hex in the city. **Swept**, not
  shrunk-until-it-passed: as R tightens 13→8→5 the contaminant **walks out** (14.2% → 8.8% →
  **1.3%**) while the beach **holds** (13.1% → 9.3% → **8.4%**). HEAD's beach at the tight
  mask reads **0.7% — deaf**; ROAD is **identical across builds** (1012 = 1012 px).

**Visual** — re-gated after the palm fix. **PASS on both seeds.** Both agents, counting at
pixel level: **palms identical in all four files** (seed 7: the same 10 trunk centroids, ±1px);
**parasols cull 12 → 1** (seed 42) and **4 → 1** (seed 7); the vacated spots are **bare sand**
— *"no leftover pole, no orphaned towel, no ghost ellipse"*, verified against the base sand
RGB; and **summer is pixel-identical to HEAD** (seed 7: *"0 differing pixels"*) — the fixed
point, confirmed by eye. Whole-city winter frame: coherent, no z-order tears, no floating
objects. (The lone surviving parasol both agents flagged is `BEACHMIN`'s floor working as
designed — a hardy handful, not a missing gate.)

**Perf (the step-back's own gate).** Lap vs 242 (`703b2b9`): day **+2.5%** / night **+0.4%**.
**But the deterministic instrument disagrees, and 242's law says read it beside the timer:**
path objects went **111,389 → 111,005 day (−0.3%)** and **140,189 → 139,629 night (−0.4%)** —
the lap **REMOVED** draw work (243 a fix, 244 worst-case byte-identical, **245 held its mean by
construction**, 246 a revert). So the day timer's +2.5% is **the weather**, exactly as 242
predicted. **ARC vs `7e2ac2c` (177, 70 iters): day +19.0% / night +12.7%**, against 242's
+18.6% / +12.8% — **the arc did not move over this lap.** `probe-drawbudget` unchanged:
`drawCell` **95.0%**, `winBandR` **31.9%**, `prismS` **29.1%**, `hexTile` **12.1%** ⇒ still
~48% static terrain, **still no hot ornament.** **ACCEPTED — no perf lap.** (This vector is
itself a small perf CREDIT: identical at the peak, strictly fewer objects every other week.)

**Verdict — DEEPENED.** (And **225's grep-the-seam law is now 5 for 5**: Sky 236, Nature 238,
People 240, Water 245, **People 247** — every one off a seam a domain's cue list had gone quiet on.)

## Iteration 248 — the shower cited a neighbour it never read (2026-07-14) [Sky × Polish]

**Vector.** Sky × Polish — cue **(ao)**, the ledger's #1 🔴 (*"the rain shafts cross the water's
edge and keep raining over the empty cream backdrop"*). Rotation pointed at **Urban** (stalest at
239); per **225** I grepped its seam first, found the massing/facade/ground/roof cells as closed as
the header claims, and took the header's own authorised fall-through.

**The seam.** The veil and the bow sit **twenty lines apart** and both fade out near the plate's rim.
The **bow** tests its **LEGS**: *"test the LEGS, not the cloud: the bow reaches ±r0 sideways, so a
shower still safely inland can hang a leg past the rim"* — and computes `fl`/`fr` from its own extent.
The **shaft** tests **`cl.x`, the cloud's CENTRE** — under a comment claiming it is spent *"2 hexes
short of the rim **(as the bow is)**"*. It is **242's law exactly, and the citation runs the other
way**: 242 found a draw citing a *broken* neighbour; here the shaft cites a **correct** one and still
does not do what it says. A false invariant with a *witness* that actually holds.

**Change.** One gate. `pa` now measures its inset from the **veil's own drawn edges** — the quad is
~`26*s` wide at the belly and `36*s` at the foot, and its foot trails **upwind** by `rlean`, which is
why the LEFT rim spills worst:
```js
const vl=Math.min(cx-26*cl.s,cx-rlean-36*cl.s)/CW-0.25;   /* pxc: X=(gx+0.25)*CW */
const vr=Math.max(cx+26*cl.s,cx-rlean+36*cl.s)/CW-0.25;
const inset=(gy2>=0&&gy2<G)?Math.min(vl-ROWMIN[gy2],ROWMAX[gy2]-vr):-1;
```
The quad is the **outer envelope** (the drops fall inside it at ±20.7*s / ±28.8*s), so bounding it
bounds the whole veil. The fade *grammar* is untouched — only its reference point is corrected.

**Probe** (`probes/probe-rainrim.mjs`, pure world data — no render, no clock, no noise floor).
⇒ **THE BOW IS THE POSITIVE CONTROL, AND IT COST NOTHING**: same rim, same file, one draw that tests
its extent and one that tests its anchor. It read **0.00 hexes on all 6 seeds** — validating the
instrument and convicting the shaft in the same run.

| | shaft (gate = cloud **centre**) | bow (gate = its own **legs**) |
| --- | --- | --- |
| max overhang **at full alpha** | **1.40 – 2.14 hex past the rim** | **0.00, every seed** |
| foot off-plate at full alpha | **49 – 57.5%** | — |

**Part B grades the SHIPPED DRAW, not my arithmetic** — it tags the shaft's own gradient
(`96,116,142`, unique to it) and reads back the quad the artifact actually fills. Build-agnostic, so
it runs unchanged on HEAD and patch with **no source swap and no cross-build floor** (230):

| build | veil quads filled | quads with a foot **past the rim** | worst overhang |
| --- | --- | --- | --- |
| HEAD | 1550 / 1550 / 1558 | **73 · 71 · 73  (4.6 – 4.7%)** | **2.90 – 3.40 hex** |
| patch | 1442 / 1458 / 1456 | **0 · 0 · 0  (0.0%)** | **0.00 hex** |

**The two ledgers (206).** Off-plate rain ink → **exactly 0.0, by construction**: `pa>0` now *requires*
the whole veil inside the rim, so no alpha can ever be spent past it — **a drift made impossible beats
one you agree to look for** (223). Cost to the population: **93.6% of on-plate rain ink retained**
(6356.8 → 5951.4 over 6 seeds; the shower simply spends itself ~2 hexes earlier as it leaves the
plate). **It cannot cost draw work**: `pa>0` is now strictly *harder* to satisfy, so the change can
only ever fill **fewer** quads (measured: 1550 → 1442).

**Census.** PASS. Every metric +0, tile histogram **empty** — the correct, vacuous result for a
draw-only change (`greenRoofs -1` is the documented ±2 tick wobble, 226).

**Visual** (`probes/shot-rainrim.mjs`; ⚠ the void backdrop is the **body's CSS gradient**, so a
`getImageData` probe is structurally blind to it — **200 makes `page.screenshot()` mandatory here**).
Three framings × two builds, named **by file** (239). Both agents **PASS**, and both, blind and
independently, *located the defect in HEAD*: seed 42 — *"the base straddles the plate's western rim,
~21% over empty background — **this is the one that looks wrong at a glance**"*; seed 7 — *"the shaft
hugs the west corner and its left flank hangs over the empty background"*. Whole-city frames: coherent,
no z-order tears, no clutter. Control (inland shower, identical in both builds): **max per-pixel
difference 5–7 / 765** — noise, by eye and by number.
⚠ **Honest caveat:** on **seed 7** the inland frame contains no rain in *either* build (the camera did
not frame that shower), so the **live** positive control (196 — a dead pin and a deaf draw give the
same zero) rests on **seed 42**, where both builds rain and are identical.
⚠ **The fix SUBTRACTS at the rim**: both agents noted the rim shower is *gone* in the patch, not moved.
That is the fix working — the shower is spent before its veil can reach the void — and the 93.6%
retention is what prices it.

**Cue (ao) — the SHAFT half is CLOSED; the BOW half is REFRAMED, not closed.** The bow is **correctly
rim-bounded** (0.00 overhang, 6 seeds), so *"a flat rainbow lying ON the water, its right foot cut off
mid-water"* is **not a rim bug** and the cue's own prescription is dead. But the bow's comment says
*"no ground, no bow"* while testing `ROWMIN`/`ROWMAX` — **the PLATE, which runs out to sea** — so a bow
*can* stand entirely over open water. Per **201**, rain (and a bow) over the sea is **CORRECT**; the
defect is the **comment**, not the draw. What is left of the cue is a *composition* read, not a bound.

**Verdict — FIXED.**

## Iteration 249 — the ferry promised "every stop" and stopped nowhere (2026-07-14) [Transport × Deepen]

**Vector.** Transport × **Deepen** — the stalest live domain (243), whose cue list was **empty**. Per
240's law (*an empty cue list records where you have ALREADY LOOKED; it is not evidence there is
nothing to find*) I spent one `grep` on its seam instead of skipping it, and the seam held the
artifact's richest tell, uncashed for the file's entire life.

**The tell.** `ENTINFO`'s ferry row has read **`'Working the shoreline, every stop.'`** since the ferry
was written. **There are no stops.** `stepFerry` was ONE LINE — `f.y+=f.sp*dt*s`, bounce at the bay's
ends — and `f.fr` (her seaward lane) is **never written again after spawn**. This is the
label-asserts-what-the-draw-ignores tell (cashed 8x: 117, 122, 129, 140, 148, 183, 238…), now on a
**verb in a tooltip** over a boat with no capacity to do it.

**The host is real, and that is the whole question** (the dead-code law: `T.MARKET`, and cue (o)'s
portless harbour, both died here). `probes/probe-ferrycall.mjs` Part A — pure world data, 6 seeds, no
render, no clock, no noise floor: **the pier head stands 2.5–4.1 cells OUT IN THE WATER on every seed**
(`x0=shoreAt-2`, `x1=x0+4..6`), with dinghies already moored beyond it. It is the one structure this
city puts to sea, and **she crosses its row on every single pass** (the bay bounces at `SEAY0+2`/
`SEAY1-2`; `pier.y` is always strictly inside). She passed it, every pass, forever, and never turned in.
⚠ **This is NOT cue (o).** (o) says the *harbour* has no waterfront and the anchored freighter is
therefore correct. The **pier** is the opposite: a deck standing in open water, with a public boardwalk
on it since 1987. The host existed all along.

**Change.** She calls at the pier. **ONE predicate, four readers** (112's law): `ferryApp(f)` (0 = out in
her lane, 1 = alongside, smoothstepped) drives the **step** (how far in, and the throttle), the **draw**
(where the hull sits, and how much wake she throws), and the **tooltip**. The berth's *existence* is
**`pierAt` itself** — not a second copy of the constant `1986` — so the call and the deck it calls at
**cannot drift apart** (123, running the tell FORWARDS). `dwell` is the artifact's own word: the **bus**
has pulled into its stops for 200 iterations (`stepVehicle`: `v.dwell=16`), and the ferry was the one
transit mode that called nowhere. `f.sp` keeps its **sign** throughout — the *throttle*, never the
velocity, goes to zero — so `drawFerry`'s heading (`dir`) and the bay-end bounce are untouched.

**Probe** (`probes/probe-ferrycall.mjs`; Part B/C are **temporal** — 134: every other gate in this
harness is frozen, so a claim about *cadence* has no instrument, and *"it never stops"* is pure cadence).

| | distinct speeds | dwells | gap, hull → pier head |
| --- | --- | --- | --- |
| **HEAD** | **1** on every seed | 0 | 0.04–7.51 cells, **never closes** |
| **patch, 2035** (deck stands) | 116–133 | **9.0 s** | **0.88–0.90 cells** (10.9–15.4 px of water) |
| **patch, 1985** (no deck yet) | **1** | **0** | never closes |

🔑 **HEAD's `distinct speeds = 1` is 236's free perfect control**: when the vector is *"make X vary"*,
HEAD's answer is a **constant BY CONSTRUCTION**, so no threshold had to be invented to call it broken.
🔑 **The 1985 row is 199's dead-regime control, and it is EXACT, not statistical**: before 1986 `pierAt`
is false ⇒ `ferryApp()` returns 0 ⇒ `ferryFr` collapses to `f.fr` and `ferryThr` to 1, so **the patch
runs HEAD's byte-identical code**. It must read 1 / 0 / never-closes, and it does. The census's 1985 era
is therefore a genuine untouched control cell, for free.
⚠ **The gap is stated in the VIEWER'S units (205), not the design constant's** — it is the water the eye
sees between her hull and the deck, the same quantity Part A measured on HEAD. A threshold I could pass
by editing the threshold would be grading my own homework.

**Census.** PASS. Core flat, **tile histogram empty** — the correct, vacuous result for a vector that
touches no terrain and no `rng()` (`greenRoofs -1` is the documented ±2 tick wobble, 226). `ferries 18`,
unchanged: this adds **no object**, it closes a gap between two that already existed (the Connect trick,
109/111/112/204, arriving inside a Deepen).

**Perf — free, and by construction.** The wake fill is **unconditional in both builds**; I scaled its
radius and alpha, and added no draw call. Path objects: **day 110,773 / night 139,606** against 247's
banked 111,005 / 139,629 (−0.2% / −0.02%) — flat. Per **222**, this vector cannot change the draw list:
it moves two entities, it does not change *which tiles exist*.

**Visual** (`probes/shot-ferrycall.mjs`; no argmax needed — unlike a buried ground ornament (226), the
host is **published world data** (`pier.x1,pier.y`) on open water, where nothing can occlude her, so
`ctr()` IS the located host, 201). The pair is made comparable by pinning her **row**, not by running the
clock: `ferryFr` is a pure function of `f.y`, so freezing at `f.y = pier.y` puts the patched ferry exactly
at her berth and the HEAD ferry exactly abeam it, out in her lane — same world, same instant, same camera.
Files **named, never lettered** (239); agents asked to **LOCATE, not judge** (108), against ground truth I
already held. Both seeds **PASS**, and both agents independently landed on it: seed 7 — *"alongside…
~0.2–0.3 boat-widths"* in the patch files vs *"~5–6 boat-widths of open sea"* in the head files; seed 42
went further and edge-detected it — *"pier deck's rightmost edge ≈ x=779–784, ferry hull's leftmost edge
≈ x=780–784"*, and the safety property in its own words: **"hull always starts 1+ px after the pier's last
pixel, never before — no overlap or clipping through the pier deck."** She lies alongside, touching but
never through. Whole-city frames: coherent, no z-order tears, no clutter; the two builds are
indistinguishable at fit zoom, which is honest — she is a small entity, and the change is a *cadence*, not
a mass.

**The wake is the tell running forwards.** A wake is thrown by WAY, so it dies back as she comes
alongside — but it never goes to **nothing**: the residual wash is what keeps her sitting **IN** the water
rather than floating on it (the same law as `SHAMT` never reaching 0 at night, 225). Same path object at
any throttle.

**Tooltip** (the string that started the lap), computed live off the rule's own predicate, never stored:
`far → "Working the shoreline — the pier is her only call."` · `approach → "Coming alongside the pier
head."` · `alongside → "Alongside the pier head — sailing in 9s."` · `1985 → "Working the shoreline. No
pier yet to call at."`

**Verdict — DEEPENED.**

## Iteration 250 — the concert played every night of the year (2026-07-14) [Civic & culture × Deepen]

**Vector.** Civic & culture × Deepen. Civic was the stalest live domain (244) and its cue list
was **empty** — so, per 240's law, I grepped its seam instead of skipping it. That law is now
**5 for 5** (Sky 236 · Nature 238 · People 240 · Transport 249 · Civic 250): *an empty cue list
records where you have already looked; it is not evidence there is nothing to find.*

**The defect.** `CIVICDESC.amphitheater` has read *"An open-air bowl beside the parks. **Concerts
through the summer**."* since the bowl was built. Its showtime draw was gated
`if(LITAMT>0.3 && so>0.02)` — **the sun and the opening hours, and nothing else.** There was no
`year` term anywhere in the amphitheater block. So the spotlit performer swayed under the beam on
**365 nights of the year**, in midwinter as readily as in August, and the night audience sat out on
the stone to watch her. The label-tell (a label asserting a relationship the draw ignores), cashed
for the 9th time — and its host has moved again: from a tooltip (117/183) to a constant (199), a
comment (209), a half-finished fix (217), a palette entry (238), and now **a promise about the
CALENDAR made by a draw that had never heard of one.**

**Change.** `concertSeason()` (beside `beachPhase`, the seasonal-predicate family) — **ONE
predicate, four readers**: the beam/wash/singer/footlights, the *night audience*, and a new
`Season` tooltip row off `concertWord()`. Two design points that are the whole lap:
- **A TRIANGLE, not `beachPhase`'s cosine.** A beach in January is still a beach (hence `BEACHMIN`);
  a concert in January is simply **not on**. Outside ±`CONCERTW` (0.26 yr of the dry peak) the value
  is exactly 0 and the stage is dark stone — `springBloom`'s bounded shape, not the sand's floor.
- **The night audience had to move WITH the show.** Gating only the stage would have re-shipped the
  exact bug 213 fixed — a full house sitting in the dark watching a struck stage. `show = so *
  concertSeason()` is read by both gates, so they *cannot* drift (240's two-gates law).
- **Centred on the dry peak** ⇒ `concertSeason()===1` at s=0.62, so the draw is **byte-identical to
  HEAD** at that pin (245's fixed point) and strictly darker every other week.

**Census.** PASS. Core flat (`pop`/`developed`/`roads` +0), tile histogram **empty**, `solarRoofs -1`
= the known ±2 tick-wobble (226). Correct and **vacuous**, as expected for a draw-only lap — the
probe is the gate.

**Probe** (`probes/probe-concert.mjs`, `probes/shot-concert.mjs`). 247's law governs this lap:
**a removal vector needs a probe that names what SURVIVES, not one that measures what MOVED** — a
pixel diff cannot tell "the stage went dark" from "something else got drawn there" (247 read 2,076px
of beach emptying and it was palm trees moving in). So it **counts objects**, deterministic, no
pixels, no noise floor:

| | HEAD | patch winter/spring | patch dry peak |
| --- | --- | --- | --- |
| `concertSeason()` | **1.00, every season** | 0.00 | 1.00 |
| singer / footlights / specks | 1 / 3 / 8 | **−1 / −3 / −8** | **0 / 0 / 0** |
| **TIER ARCS (control)** | — | **0** | **0** |

- **DISTINCT SHOW STATES = 1 on HEAD, on every seed, forever.** The constant *is* the defect, stated
  as a number, with **no threshold invented** (236).
- The **tier arcs never move**: the stone survives, so what the winter bowl loses is exactly the show.
- **Autumn is a shoulder, not a full house** — `cs=0.04`: the objects are still issued but at 4%
  alpha. The probe prints `cs` beside the counts precisely because an object count sees *presence*,
  not the fade, and would have let me overclaim (205: state the claim in the viewer's units).
- **Two free EXACT controls (249's law), both cashed:** HEAD's constant is the baseline; and the bowl
  has a **BIRTHDAY** (`year>=2004`), so 1985 has no amphitheater and the patch runs HEAD's
  byte-identical code. **Fixed point HOLDS** — patch === HEAD at the dry peak on all 3 seeds.
- The showtime hour was **taken off the light curve, not guessed** (202): `CIVHRS.amphitheater===0`
  ⇒ `so = 1-nightDeep()`, so the show runs at **dusk** (`dayT=0.70`), and would have been *invisible*
  at the intuitive "night" pin of 0.92.

**Visual.** Two agents, two seeds, asked **per file name** (239) and asked to **LOCATE** (108) —
*"in which of these four files is the stage lit?"*, an answer I already held. Both got it **exactly
right** (only `patch-winter-close` dark; head lit in both calendars), and both independently
answered the survival question: *"reads as closed for the season / unlit, not broken, not
half-erased, no hole in the ground."* Whole-city dusk frames clean on both seeds — no z-order tears,
no floating tiles, no blown-out colour. **VISUAL: PASS ×2.**

**Verdict. DEEPENED.**

**A law for SKILL.md — a removal vector's probe must name what SURVIVES, and its POSITIVE CONTROL
will convict the INSTRUMENT before it convicts the city.** 196 says a `BASE = 0` is worthless
without a positive control. This lap paid for the sharpest form of that: my first probe run came
back **all zeros — including the TIER ARCS**, which are stone and draw every frame. A zero there is
*impossible*, so the instrument was dead, and it took ten seconds to see it. (The wrappers closed
over the counter object while the probe swapped in a *fresh* one each frame, so every increment
landed on an object nobody read.) **Without the tier control I would have read "singer 0, specks 0
in every season on both builds" as a broken feature and started redesigning a draw that was fine.**
⇒ **On any vector whose purpose is to take something away, put a MUST-NOT-MOVE object count beside
the must-go one — it is the control that names what survives (247) AND the tripwire that catches a
dead instrument (196), and it is the same column.** The tell: your probe's headline is a count going
*down*, and nothing in the run is required to stay *up*.

## Iteration 251 — the invariant had never once sampled a lit window (2026-07-14) [Nature × Polish → the harness]

**Vector.** Nature × Polish, taken on the ledger's ranked **#1 🔴 cue (ag)** — *"the night greens
stay hot: the parks out-brighten the LIT streets and the sand glows like it's still dusk"* — banked
at 227, **reconfirmed at 242**, and carried at the top of the cue list for 24 iterations. Rotation
pointed at Urban, whose seam 248 recorded as dry; **119's law** (a banked, measured finding outranks
kind-rotation) sent me here instead.

**Probe first — and it refuted the cue twice before I wrote a line.**
`probe-goldenhue` on HEAD: **PARK 81, BELOW the ROAD (82)** and 14 under the dimmest lit surface. The
greens are not hot. Then the mechanism: I rebuilt the file with **`washRGB` switched off entirely**
(`w=0` — the pre-214 city on the plain cool tint) and the night ordering came back **IDENTICAL**
(BEACH 96, MID 95, same breach). So **223's luminance neutralisation is sound and steals nothing**,
and the cue's named surface *and* its named mechanism are both innocent. What survived was one real
line: **BEACH 96 >= MID 95**, the unlit sand level with the dimmest lit building type — intrinsic to
sand's albedo (base `[238,220,178]`, day luminance **221**; the next brightest thing in the palette
is 173), not to any gain triple.

**Change (built, measured, REVERTED).** An **albedo knee** on the night wash — a real night compresses
its highlights instead of scaling them — opted into by the seven open-ground draws (beach, dune, the
sand the wind throws into the lawn), *not* by name, because `sand`/`sandDk` are **shared with the
building walls** (`towerLook`/RES/MID bodies) and keying it by name would dim the masonry hardest of
all (cream's night luminance is **103**, above the sand's own) and drag MID's mean *down*. Subtractive,
not multiplicative: subtracting a constant from all three channels leaves `max-min` and `mid-min`
untouched, so **hue and chroma both survive exactly** while luminance falls. It worked: **BEACH 96 -> 91**,
ordering invariant **FAIL -> PASS** (clears by 4), hue guard unmoved (6deg), daylight byte-identical,
zero path objects.

**...and the guard I added caught it.** `probe-goldenhue` never carried **`BEACH <-> ROAD`** — **214's own
headline pair** (*"the sand and the asphalt literally become the same colour"*), the exact collapse the
whole wash ladder exists to prevent. Added, it reads **HEAD 24 -> patch 18** (multiplicative: **14**, under
the ~15 floor). **Every unit the sand falls walks it toward the asphalt**, because the window between
ROAD (82) and MID (95) is only **13 units wide**. The two inherited gates squeeze from both sides and
the sand cannot sit between them with margin on both.

**Visual — and it is what turned the lap.** Two agents, two seeds, blind, **crossed A/B** (238), naming
files not letters (239). Both PASSed; both correctly identified the patch as the dimmer build (the
checkable locate). But **both, unprompted, on both seeds, said the shoreline does not glow — in EITHER
build.** Seed 7 measured it: the shore is **"a quiet dark ribbon"** at ~87-92 against a **frame max of
237-244** from the tower windows and the moon. HEAD's beach was never glowing.

**The root cause: the invariant had never once sampled a lit window.** `probe-goldenhue` sampled
`getImageData(sx, sy, 1, 1)` — **ONE pixel, at the hex centre** — for its whole life (**238's defect,
recursing a fourth time, inside the probe the header already warns about**). For flat sand that is
fine. For a **building** the centre pixel lands on its **ROOF**, so the night luminance of every LIT
type was measured **without ever sampling a lit pane**, and the invariant was comparing *the beach's
sand to a building's roof*. Worse, it scored the **MEAN** — and a building reads as lit because of its
**windows**, not because its hex average is high, so averaging discards exactly the information that
makes it lit. A flat pale surface therefore "out-brightens" a lit high-variance one on the mean while
looking obviously dimmer to any eye.

**Fixed the instrument (the artifact needed nothing).** Area sample (the hex's own box, per 238) +
score the invariant on the **p90 ENVELOPE** — what the lit panes actually put on the facade (**224:
the eye reads the EXTREME, not the mean**) — with the mean kept as a diagnostic. On **pristine,
unmodified HEAD**:
```
p90: *TOWER 131  *MID 123  *COM 119 |  BEACH 98  ROAD 98  PARK 97  FOREST 85  FARM 82  WATER 72
     -> the lit city clears the brightest unlit surface by 21.        VERDICT: PASS
mean: BEACH 91  *TOWER 84  *COM 84  *MID 81 ...  -> the artifact of the old score, entire.
```
The area sample also exposes how badly the centre pixel distorted the **hue guards**: PARK's alarming
**26deg off its daylight self** — part of what (ag) rested on — is **1deg** when you sample the park
instead of one pixel of its pond.

**Census.** PASS, and vacuous by construction (colour-only). Final tree: `solvista.html` is
**byte-identical to HEAD** (`git diff` empty — a proof, not a sample).

**Verdict — FIXED (the harness), the artifact change EXPLORED -> REVERTED.** The city was never broken.
A probe that could not see a lit window generated a FAIL, the FAIL became the loop's #1 cue, the cue
was re-confirmed twice **by the same broken instrument**, and its prescription — dim the sand — would
have damaged 214's guard by 25% to buy a number no viewer can see. **Cue (ag) is CLOSED, refuted on
every count.**

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
