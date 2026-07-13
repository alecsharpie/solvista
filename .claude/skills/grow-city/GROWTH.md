# Solvista growth ledger

Append-only log of `grow-city` iterations. Newest at the bottom. Each iteration =
one growth vector, verified by `census.mjs` (numeric, no-regression gate) + a
screenshot pass. This file is the loop's memory: rotate vectors, don't repeat.

Census matrix: seeds `[7, 42, 1234]` × eras `[1985, 2005, 2035]`, `t=0.35`.
Metrics are summed over all 9 cells of the matrix.

## State of the city (maintained header — UPDATE EACH ITERATION)

This grid + the notes below are what step 1 (Orient) reads instead of the whole
archive. Cells hold iteration numbers (**struck = explored and reverted**, so the
cell is *attempted*, not *filled* — read its entry before re-trying it); `U1`–`U5` are user-directed passes
(U1 generative monorail · U2 feedback polish: smooth water motion / hover
tooltip / kelp re-gate · U3 determinism audit · U4 hexagon plate + plural
rivers/monorails/cable cars · U5 census stats that can fall).

**Interaction/UX is a column** (since 97). Cells hold only vectors the ledger explicitly attributes to a domain;
cross-cutting ones (U2, 42, U5) stay in the bullet below.

| Domain | New element | New CA rule | Deepen | Connect | Scale | Polish | Interaction/UX |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Nature** | 4, 26, 29, 102, **156**, **174** | 1, 13, 60, **206** | 37, 46, 67, 76, **108**, **120**, **139**, **166**, ~~**233**~~, **238**, ~~**246**~~ | ~~46~~, ~~88~~, ~~101~~ | U4 | 53, 96, **194**, ~~**198**~~, **215**, **221**, ~~**251**~~ | **117**, **129**, **148**, **183** |
| **Water & coast** | 6, 10, 12, 16, 20, 33, 106, **169** | 90 | 17, 25, 51, 65, 72, **113**, **123**, **159**, **196**, **245** | 22, ~~**205**~~ | | U2, 44, 58, 79, **116**, **132**, **150**, **185**, **214**, **223**, **234** | **97**, **141**, **176** |
| **Urban fabric** | 32, 62 | 7, 23, ~~82~~, **151** | 38, 54, 68, 92, **165**, **173**, **189**, **199**, **209**, ~~**218**~~, **219** | 47, **109**, ~~**160**~~ | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103**, **110**, **118**, **124**, **143**, **180**, **216**, **220**, **224**, **228**, **235**, **239** | **133** |
| **Transport** | 2, 9, 21, 31, 48, **164** | 77 | 28, 39, 55, 63, **112**, **121**, **128**, **155**, **179**, **193**, **230**, **249** | 5, 15, **138**, **211** | U4 | U1, U3, 70, 85, 87, 94, **146**, **188**, ~~**203**~~, **241**, **243** | **105**, **171** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107** | 36, 59, 66, 80, 91, **149**, **158**, **175**, ~~**195**~~, **213**, **244**, **250** | 45, **204** | | 73, ~~**114**~~, **168**, **231** | 52, 122, **140**, **184** |
| **Sky & atmosphere** | 27, 43 | | 19, 35, 50, 57, 95, **135**, **153**, **161**, **181**, **190**, **208**, **225**, **236** | | | 61, 81, 89, **115**, **200**, **242**, **248** | ~~**134**~~, **144** |
| **People & activity** | 41, 56, **127**, **170**, **186** | 49 | 34, 64, 93, **104**, **119**, **145**, **178**, **201**, **210**, **240** | 78, **111** | | 84, **137**, **163**, **226** | 71, **154**, **191** |

- **Interaction/UX — the FEATURE INVENTORY was rotated to the archive at 211 (history, not steering).** ⚠ **229 is
  cross-cutting (the TEXT LAYER: `<meta charset>` ⇒ every tooltip + the stats panel), so it sits here, not in a grid
  cell.** It **repealed 134's rule** — raw UTF-8 in JS string literals is now SAFE (`probes/probe-charset.mjs` asserts
  it), so **do not hand-escape a `·` or an `é`.** What steers: when adding an entity array, `stamp()` it in its draw +
  add an `ENTINFO` row (same discipline as the census hook). `stamp()` also draws the focus ring, so any stamped entity
  is ringable free — and since 133 a hovered TILE is ringed too. **An `ENTINFO` `sub` may be a FUNCTION of the entity
  (105)** — use it when a thing's interest is its *membership* (which line/route/depot), computed live, never a string.
- **ROTATION.** Last vector per domain: Urban **239** · Water **245** · People **247** · Sky **248** ·
  Transport **249** · Civic **250** · Nature **251**. **247 was the 29th step-back; the 30th is DUE NOW (~252).**
  ➡ **NEXT: the STEP-BACK (30th), then Urban fabric — but Urban's seam is DRY (248 grepped `drawBuilding`/
  `updateValue`/`POPW`/`midLook`/`towerLook`; only the harbour apron remains).** The best-supported open cue is now
  **(aj)** the cloud SPAWN (Sky × Polish, ~2x the visible weather at zero new draw work, doubly measured).
  ⚠ **Read the `peds` cap first** (111) before designing anything road-borne.
  🔴 **251 KILLED THE #1 CUE AND THE INSTRUMENT THAT MADE IT. Re-read the cue list with suspicion:** (ag) was ranked
  top for **24 iterations**, was **reconfirmed twice**, and was **false on every count** — because every re-measurement
  used the same broken probe. **A cue re-confirmed by the instrument that created it is not corroborated.**
  ✅ **251: THE INVARIANT HAD NEVER ONCE SAMPLED A LIT WINDOW — FIXED (the harness); artifact BYTE-IDENTICAL to HEAD.**
  Took the ranked **#1 🔴 cue (ag)** and **refuted it on every count**. (1) **Greens innocent**: PARK **81**, *below* the
  ROAD. (2) **Wash ladder innocent**: with `washRGB` **switched off** (`w=0`, the pre-214 city) the night ordering is
  **IDENTICAL** ⇒ 223 steals nothing. (3) The residual `BEACH 96 >= MID 95` was **THE PROBE**: it read **ONE PIXEL AT
  THE HEX CENTRE**, which on a building is its **ROOF** — so an invariant about **LIT** surfaces had **never sampled a
  lit window** — and it scored the **MEAN**, which folds a lit building's dark wall back in. Re-scored on the **p90
  ENVELOPE** over the hex's **AREA**: **pristine HEAD PASSES by 21**. ⚠ The point sample distorted the **hue guards**
  too (PARK's *"26° off its daylight self"* is **1°** in area units). ⚠ **I built the prescribed fix first (an albedo
  knee on the night sand) and the guard I had to ADD to the probe convicted it**: `BEACH↔ROAD` **24 → 18** — walking the
  sand back toward **214's asphalt** to buy a number **no viewer can see** (two blind agents, crossed A/B, both seeds:
  the shore is *"a quiet dark ribbon"* at ~90 against a **frame max of 237–244**). **The cure was the disease.**
  🔑 **ITS LAW (SKILL.md): A GATE BREACHED BY A HAIR, WHOSE PRESCRIBED FIX COSTS A HEALTHY GUARD, IS A GATE TO SUSPECT
  — and "is it LIT?" is an EXTREME, never a MEAN** (224, on the brightness axis).
  ✅ **250: THE CONCERT PLAYED EVERY NIGHT OF THE YEAR — DEEPENED.** Civic's cue list was **EMPTY**, so I grepped its
  seam. `CIVICDESC.amphitheater` promised *"Concerts through the **summer**"* over a showtime gate that was **`LITAMT`
  and nothing else**; **DISTINCT SHOW STATES = 1, forever**. Now `concertSeason()` — **ONE predicate, four readers**
  (beam, footlights, **night audience**, tooltip). ⚠ **A TRIANGLE, not beachPhase's cosine — a beach in January is still
  a beach; a concert in January is NOT ON.** ⚠ **The AUDIENCE had to move with the show** or it re-ships 213's bug (a
  full house watching a struck stage). 🔑 **249's two free EXACT controls cashed again** (HEAD's constant; the bowl's
  **BIRTHDAY**, `year>=2004` ⇒ 1985 is HEAD's bytes). 🔑 **ITS LAW (SKILL.md): A REMOVAL VECTOR'S PROBE MUST NAME WHAT
  *SURVIVES* — AND THAT CONTROL CONVICTS A DEAD INSTRUMENT BEFORE IT CONVICTS THE CITY** (my tier-arc control read 0 —
  impossible; the probe was broken).
  ✅ **249: THE FERRY PROMISED "EVERY STOP" AND STOPPED NOWHERE — DEEPENED.** Transport's cue list was **EMPTY**, so I
  grepped its seam instead of skipping it — **240's law is now 4 for 4** (Sky 236 · Nature 238 · People 240 · Transport
  249). `stepFerry` was **ONE line**, `f.fr` **never written again after spawn**: **DISTINCT SPEEDS = 1 on every seed**,
  forever, under a tooltip promising *"every stop"*. She crosses the pier's row **every pass** — the head stands **2.5–4.1
  cells OUT IN THE WATER on all 6 seeds** — and never turned in. ⚠ **NOT cue (o): the PIER has a waterfront, the HARBOUR
  does not.** Now `ferryApp`/`ferryFr`/`ferryThr`, **ONE predicate, four readers**, the berth's *existence* being
  **`pierAt` itself** (123). ⚠ **`f.sp` KEEPS ITS SIGN — the THROTTLE goes to zero, never the velocity** (`drawFerry`
  reads it for her heading). ⚠ **`dwell` is the house's own word for a call** (`stepVehicle`: the bus) — **grep for the
  mechanism the artifact already ships before inventing one.** 🔑 **ITS LAW (SKILL.md): TWO FREE, EXACT CONTROLS** —
  HEAD's **constant IS the baseline** (236), and a host with a **BIRTHDAY** (no deck before 1986) hands you a **dead
  regime running HEAD's byte-identical code** for nothing (199, arriving through the *world* not the light).
  ✅ **248: THE SHOWER CITED A NEIGHBOUR IT NEVER READ — FIXED** (cue **(ao)**'s shaft half; body archived at 249).
  🔑 **ITS LAW (SKILL.md): AN ANCHOR IS NOT AN EXTENT** — 211's offset law on the **culling** axis: any cull/fade/bound
  evaluated at a draw's *anchor* under-bounds every pixel it puts beyond it. 🔑 **COROLLARY — A CORRECT SIBLING DRAW IS
  A FREE POSITIVE CONTROL** (the bow, same rim, read **0.00 hex on 6 seeds**). ⚠ **242's cited-standard law with the
  citation running the OTHER WAY** — 242 cited a **broken** neighbour; 248 cites a **correct** one and still does not do
  what it says.
  ✅ **247 (29th step-back): `beachPhase()`, the 4th seasonal predicate** (body archived 248). 🔑 **ITS LAW (SKILL.md):
  A THRESHOLD IN AN `if/else if` CHAIN IS A *BOUNDARY BETWEEN TWO FEATURES* — narrowing one arm WIDENS its neighbour**
  (winter grew a palm in every vacated deckchair slot). ⚠ **Grep a chain's other arms first.** ⚠ **A REMOVAL VECTOR
  NEEDS A PROBE THAT NAMES WHAT SURVIVES** (214; **250** sharpened it — that control also catches a DEAD INSTRUMENT).
  ⛔ **(ai) RETIRED (246) — UNREACHABLE, DO NOT RE-OPEN. Body archived 247; LAW in SKILL.md** (*a budget with slack is
  not absorption capacity — the slack IS the exhaustion; count the eligible cells*). ⚠ **DO NOT re-try a belt, a mask,
  or a core-widening**: no paired addition exists (2→3 ADMITS 25, **2→4 admits the SAME 25** ⇒ **zero** interior open
  cells) and **the ROADS fragment every lobe**. ➡ **The COMPLAINT is still real** (*"a wall of buildings meeting the
  void"*, 232) — **re-derive it from its own nouns (228/235); stop spending laps on the density statistic.**
  ✅ **245: `seaState()`, ONE predicate, floor `SEACALM`** (bodies archived 247/248; **both laws in SKILL.md**): **a
  CENTRED lever buys a BYTE-IDENTICAL FIXED POINT** (247/248/**249**/**250** cashed it again) · ⚠ **AIM BY MEASURED INK
  OF THE *HOST*, NOT THE FRAME** · ⚠ **a fixed *ELIGIBILITY* gate caps the dynamic range of any threshold beneath it.**
  ⚠ **244: TURNING THE AMPHITHEATER'S BOWL WAS BUILT AND REVERTED — DO NOT RE-TRY IT** (the projection cannot carry it);
  fixed from the other side, the **SITE comes to the bowl** (`RAY6`/`viewScore`/`amphSight`). ⚠ *Penalise the wall* is a
  **DEAD LEVER**. ⚠ **A sweep built with the artifact's own rule grades in the PATCHED world — `K=0` is NOT HEAD.**
  ⚠ **WARNINGS FROM 236–242 — bodies archived (244/242/250); every LAW is in SKILL.md; ranked list leads with (ag).**
  **242:** ⚠ **MARSH/KELP no longer catch cloud shade** (`WETSET`) — *when code CITES A NEIGHBOUR as precedent, GO READ
  THE NEIGHBOUR.* **241:** `RAILCAP=130`, (am) CLOSED ⇒ *an empty cue list is not saturation, it is evidence nobody has
  grepped* (**now 5 for 5** — 236/238/240/249/**250**). **240:** 🔑 **a SLOW CLOCK is open to every domain —
  `Math.floor(dayT)` is a REAL DAY COUNTER** (`dayT+=dt*s/110` never wraps), **it cannot strobe.** **239:** *name the
  FILE, never a letter, in a visual A/B* (240/242/247/**250** are its payoff). **236:** ⚠ **`cl.rain` IS GONE** — ONE
  predicate **`cloudWet(cl)` (0..1)**, six readers; **`year+k` = same season, different weather.**
  🔴 **228'S LAW HAS NOW RECURSED 4x, EVERY TIME ON A PROBE THIS HARNESS ALREADY OWNED** (237 found two; 238 found the
  third INSIDE the probe 237 had just repaired; **251 found the fourth — `probe-goldenhue`'s ONE-CENTRE-PIXEL sample,
  which on a building lands on its ROOF, so an invariant about LIT surfaces had never sampled a lit window**) — *read
  what a probe MEASURES and WHERE IT SAMPLES, not what it is called; apply 228's test PER METRIC.* ⚠ **AND 251 ADDS THE
  COST: a bad probe does not just misgrade a lap — it MANUFACTURES A CUE, and the cue then steers the loop for 24
  iterations and gets "reconfirmed" by the same broken instrument.** ⇒ **When a cue has been re-measured and re-
  confirmed, that is NOT corroboration unless a DIFFERENT instrument did it.**
  ✅ **CLOSED LADDERS — DO NOT RE-OPEN. Bodies archived; every law is in SKILL.md.** The **WASH ladder**
  (214→220→221→223→**234**; **audit by `dHUE`, never a target hue** — warnings at (aa)/(ae)) · the **TOWER LOOK**
  (228 crown + **235** footprint) · the **SKYLINE ladder** (217→224, `c.th` SPENT — warnings at (ac)) · the **HUD
  lap** (229 — both its cues were the HARNESS, not the city) · **137's standing-crowd cue** (226). ⚠ **230's `taxi`
  flag is LOAD-BEARING** (`VCURF` thins the night fleet by CLASS). ⚠ **(y) and (s) were born from agents reading
  `shoot.mjs` output — REPRODUCE either in the user's configuration before designing to it** (229's law).
  **Interaction/UX** (cross-cutting) last touched **229**.
  **CUES, RANKED** (CLOSED: (w)/(z) 229 · (t) 231 · (u) 234 · (af′) 235 · (al) 239 · (am) 241 · (an) 243 · **(ah) 244**;
  **(aj)'s SHADE half CLOSED 242 — its cloud-SITING half is still open**; **(ao)'s SHAFT half CLOSED 248 — its BOW half
  is REFRAMED and its prescription REFUTED**; **(ab) RETIRED into (ak) 238**; ⛔ **(ai) RETIRED 246 — UNREACHABLE, do not
  re-open** · ⛔ **(ag) CLOSED 251 — REFUTED on every count, do not re-open**): 🔴 **(aj)** the clouds
  spawn with no reference to the land, so a seed parks its sky over the sea — **the lever is the SPAWN, not the draw**:
  ~2x the visible weather at **zero new draw work** (Sky × Polish, cheap, doubly measured) · **(ak)** the season — ⚠ **242: both agents, both seeds, independently —
  winter reads as "lusher", NOT as winter**; read the cue, its prescription is dead · **(y)** the scorched inland
  cluster (Nature × Polish) · **(s)** golden-hour
  contrast collapse (Sky × Polish — CONSTRAINED; strengthened at 227) ·
  Nature's **GARDEN staggered beds**, held by (p) · **(ap)** the sea's foam is invisible at fit zoom (Water × Polish).
  **225: THE SHADOWS READ THE SUN.** `shadS` (every shadow routes through it) carries a per-frame sun vector
  (**`SHOFF`** throw · **`SHLEN`** stretch · **`SHAMT`** opacity). ⚠ **Noon (t=0.415) is BYTE-IDENTICAL ⇒ a free
  dead-regime control for every shadow lap.** ⚠ **`SHAMT` must never reach 0 at night** — the residual patch is what
  keeps every ped, tree and car from FLOATING. **(Bodies of the older laps were rotated at 227/242; WARNINGS only.)**
  ⚠ **226: `census.mjs` DOES NOT FREEZE THE CLOCK** ⇒ tick-sensitive metrics (`solarRoofs`) **wobble ±2**; core
  metrics unaffected. **To test whether an unintended metric move is YOURS, re-run the SAME FILE, not HEAD.**
  ⚠ **231: THREE PREDICATES, DON'T MIX THEM (body archived at 242).** `openFront`/`frontLoad` count **TALLT
  MEMBERSHIP** — wrong for anything drawn flat. **`groundLoad(x,y)` is the ground-level one**: sums drawn **HEIGHT**,
  reads **`c.th` never `c.h`**, and counts a `RAISEABLE` lot at `FUTUREH` — **an empty lot is not a clear view, it is
  a building that has not been built yet.** ⚠ **Aim a CAMERA by measured ink, never by any of the three (226).**
  ⚠ **Settled audits, bodies archived at 242 — the live warnings only.** **213:** `nightDeep()` is **pinned at 1 all
  day** (a trap for any NON-draw reader); the civic night-light audit is **DONE** — three lights are off the curve on
  purpose (school janitor, hall clock face, parliament lantern), **do not "fix" them**. **211/210:** `frontLoad` is
  the sharper `openFront`; **both ship as PREFERENCES, NEVER GATES (206)**, and `LITAMT` returns to **0.64** by the
  small hours, so any gate `LITAMT > 0.64` defines a "night" that **ENDS BEFORE DAWN**. **137's "the ped/dog system is
  NON-REPRODUCIBLE" is DISPROVEN** ⇒ **People is probe-able like any domain**. **209:** the **GROUND PLANE is SPENT**
  (216 spent the FACADES); its law — *when a domain looks interconnect-saturated, ask what LARGE SURFACES wear a
  palette name that cannot carry the signal* — is in SKILL.md. **206:** the vacant lot is a **MIRAGE** (`EMPTY` with
  ≥2 RES nbrs falls **85 → 6.5** by 2035, **0.0** with a road adjacent); development eats every gap.
  **⚠ THE FIRE CA IS A GHOST — do not build "X answers the fire"** (`probe-firehost`; body archived at 242).
  Ignition is year-gated ⇒ **at 2035 nothing can ignite at all**, and fire **never spreads**. **`T.MARKET` again.**
  **⚠ THE `polish-tile` BACKLOG — measured cues that are NOT growth laps. Do not spend a domain's lap on one; they
  need a tile redesign, and each has a gate written.** (a) **THE WHOLE ELEVATED TRANSIT is sub-pixel at fit zoom**
  (0.5px rope, 5px cabins, hairline masts; body archived 242). ⚠ **NEVER RE-OPEN THE Z-ORDER — CLEARED BY PROBE TWICE**
  (203/212); agents have mis-diagnosed it **SEVEN times** (217, 232, 237×2, 242). **That persistence IS the evidence:
  the fault is LEGIBILITY** — **a hairline ornament needs a BODY** (215), not more strokes. *Do NOT re-try a body/halo
  under the rope (measured — backfires) nor a lit top edge (impossible at 0.5px).* **Most-reported defect in the ledger.**
  (b) **`university` is the ONLY of the twelve civics with no `LITAMT`** — the one `MAJORK` monument
  pitch dark after sunset; every place to put the light failed (195; `probe-unilight.mjs` + `shot-uni.mjs`).
  (c) **A parked service vehicle needs its CIVIC TILE to have a visible apron on its front edge** (204, cue n). (d) **The marsh reeds do not read** — seven sub-pixel strokes round the pool; its calendar is already computed and invisible (cue (i), 113).
  **Sky is post-saturation (Deepen/Fix ONLY — its additive/CA cells are traps).** **Urban: additive spent (118), Connect measured-hard TWICE** — 160 (RES terracing: no seed forms E-W RES runs of >=3) and 165 (the `hstr` parade zigzags with row parity, longest straight-hex-axis run = 2 — not a clean arcade host); **Urban's next lap is Deepen/Polish only**. **Roof-furniture is CLOSED city-wide** (MID/RES tanks, TOWER gardens, COM plant 165, IND clerestory 173); the **GROUND PLANE is SPENT (209)** and **216 spent the FACADES** — only the **harbour apron** is left. ⚠ **"Urban is spent" was REFUTED from the SILHOUETTE side (232 → (af′), 237 → (al)) and that seam is now CLOSED TOO** (235 tower + **239** mid-rise). **The building look is DONE; Urban's next lap is neither massing nor facade.** (**Sky's moon is FIXED (135) and NAMED (144)**, both closed.
  **STILL banked for Sky: the SEASON word** — it reads the fast `year` and would strobe ~0.7 Hz (134), so it needs a
  slow clock FIRST; don't add `seasonWord(year)` to the HUD nor re-ship 134's REVERTED almanac. ⚠ **236's front is
  ALSO on `year` and is NOT that slow clock** — it cycles ~2 min on purpose, so a "weather word" would strobe too.)
  **Water's STILL-banked cue (123): the pier/lifeguard are still `rng()`-salted; site them on a depth by
  respending their draws (123's stream-neutral trick) — but that REPEATS 123's mechanism, so vary it.**
  **The asserts-less-than-the-code-knows tell is SPENT for agriculture** (orchard 129 + vineyard 139/148 + FARM 183,
  off ONE shared `*Phase()`; **238 spent the last of it — the CANOPY**). **GARDEN is the last mute one** — cue **(p)**
  OWNS it (⚠ **(al) is CLOSED and (ai) RETIRED — nothing outranks it now**). ⇒ **"Additive inventory spent" is a claim about a domain's ENTITIES, not its
  SURFACES** (127 put picnics on PARK's 878 hexes), **and a Deepen that adds no element is the documented way past
  additive saturation** (126). ⚠ **238 REFUTED this line's old claim that "the season cannot reach PARK"** — it
  reaches PARK's *lawn* at full strength (52.7, the city's most seasonal surface); PARK is diluted by the 55% of a
  park hex that is canopy + season-dead furniture. **Read (ak) before designing any seasonal vector.**
  **124 closed the LAST banked cue that moved a census number; the census is VACUOUS for most vectors now — reach
  for a probe.** Three laws govern step 1: **a cue is a POINTER, NOT A SPEC** (re-grep the seam before designing to
  it); **a banked, measured finding outranks kind-rotation and cell-emptiness** (119); **saturation beats
  kind-rotation** — when a domain's additive cell is spent, the KIND changes, not the domain (118).
  **Sky's additive/CA cells are TRAPS** (sky is not cellular; fog on terrain is already `rSea`/`fogAt`).
  **Cue (k) CLOSED (116/123).** Still steers: **run the tell FORWARDS** (make the string and the rule share ONE
  constant so they cannot drift — 123; 213's `civOpen()`). **⚠ A tick-rule cannot read the reach maps (151):**
  `recount()` never runs in the sim loop, so `rGreen`/`rShop`/`rServ` are STALE inside `tick()` — recompute locally.
  **THE FAIL/ASIDE LAW (212; a law in SKILL.md — the header keeps only the tally): in a whole-frame read the FAILs
  are where an agent is WRONG and the ASIDES are where it is RIGHT.** Paid out 213, 214×2, 215, 217, 219, 232, 236,
  **242** (seed 7's FAIL named the elevated rail's z-order — the **SEVENTH** raising and the seventh time WRONG,
  CLEARED BY PROBE TWICE, 203/212 — while the ASIDE both agents reached independently became the lap), **245** (⇒ cue
  **(ap)**; and its FAIL was real but was **MY CAMERA**, not the city — see (ap)).
  ⚠ **237 INVERTED IT** — both agents' headline FAIL was right *and* correctly diagnosed. ⇒ **grade the FAIL by
  MEASURING it; do not assume it is wrong.** Still weight an aside two agents reach independently above any verdict.
  ⚠ **241: an agent attributed a QUANTITY difference to a STYLE one** — on a diff with **no draw code**, it called the
  losing build's beams *"darker and thicker"* (it has **18% more track**). ⇒ **More of a thing reads as a heavier draw;
  check your diff first.** ⚠ **243: a cue can bundle a REAL defect with a MISREAD — see (an).**
  Perf ARC (refs as 202/207/212/217/222/227/237/242/247, directly comparable; per-step-back priors 202→227 archived at
  233, 232's lap-detail at 236). **At 247: ARC vs `7e2ac2c` (177, 70 iters) day +19.0% / night +12.7%** — against
  242's +18.6%/+12.8%, i.e. **the arc did NOT move over this lap either.** Arc rate ~**+0.2%/iteration**; diffuse, **NOT
  accelerating**; **ACCEPTED — do NOT open a perf lap.**
  🔑 **THE LAP TIMER OVER-READS; GRADE A LAP WITH `probe-drawbudget` BESIDE `perfab`, NEVER `perfab` ALONE** (216's law
  on a step-back; 242's and 247's bodies archived at 251). **Twice now the interleaved LAP timer has reported a stable
  +2–3% over a lap that MEASURABLY REMOVED draw work** — a cost with **no mechanism**. Only the deterministic object
  count and the ARC could tell. `probe-drawbudget` (night) is **UNCHANGED from 207/232**: `drawCell` **94.1%**,
  `winBandR` **32.3%**, `prismS` **28.2%**, `hexTile` **12.2%**, `bandS` **7.6%** ⇒ ~48% static terrain, **no hot ornament.**
  ⚠ **A WORLD-CHANGING VECTOR IS NOT FREE just because its diff has no draw call — THE WORLD IS THE DRAW LIST**
  (222, body archived; the LAW is in SKILL.md). Price a CA/siting vector with `probe-drawbudget`, never by reading the diff.
  ✅ **241 RAN IT IN REVERSE AND IT PAID: a world vector that REMOVES things gives draw work BACK.** Budgeting the
  monorail measured **path objects −3.2% day / −2.9% night (seed 7)**, **0.00% (seed 42 — byte-identical, already under
  budget)**. First give-back against the ~+0.2%/iter arc. ⇒ **Count the objects when a lap SUBTRACTS, not only when it adds.**
  ⚠ **Cue (x) stands** (215's `seamVeg`: 692 path objects / 228 STROKES cost ~4x the fill model — a stroke-vs-fill sweep at equal path count is the best-supported open perf question).
  **⚠ THE STANDING PERF SUSPECT (207, UNCHANGED at 232/237; NAMED not mandated per 198): THERE IS NO HOT ORNAMENT —
  the arc is DIFFUSE**, which is why every per-lap gate reads it free. **No caching lap — 198's levers are CLOSED;
  the only lever is FEWER objects.**
  **The GAP-CLOSING trick (111/112/113) is SPENT in four domains; the TELL that replaced it (a label asserting what
  the draw ignores) is CASHED 8x** (117, 122, 129, 140, 148, 183, **238**) **and its host keeps moving DOWN: 199 a
  CONSTANT, 209 a COMMENT, 217 a HALF-FINISHED FIX, 238 a palette entry NO DRAW COULD REACH — see SKILL.md.** Still MUTE: `[T.IND]` (no calendar) and GARDEN
  (season-frozen draw — needs a Deepen first; and see **(ak)**, which now owns the season question). ⚠ 122: a
  tooltip vector needs a probe checking the claim against INDEPENDENTLY RECOMPUTED truth, not a screenshot.
  **Kind-picking, compressed (full text rotated to `GROWTH-archive.md` at 204).** **Scale** is the coldest kind and a
  structural lever, not a lap move. **New element** (last 127): a saturated domain cannot take one — but saturation is
  of a domain's ENTITIES, so one can still land on a large untouched **surface** (127 put picnics on PARK's 878 hexes).
  **Connect** (109/111/112/204): its trick is that it adds NO NEW OBJECT — it closes a gap between two that exist.
  **107 was a New CA rule that ADDED NOTHING** — *auditing an existing rule for reachability* is a New-CA-rule move
  available in every domain at zero content cost (`probe-market.mjs`; 204's `probe-firehost` found a ghost).
  ⚠ **Nature × Connect is the row's GRAVEYARD — attempted and REVERTED three times** (46 geometrically impossible ·
  88 no draw-only host · 101 found host *and* land and lost on **shape**). **Do not re-open it as a *corridor*.**
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
  **(m) SHOWERS ARE HOST-STARVED — do not build "X responds to the rain"** (201, `probes/probe-rainhost.mjs`). Nothing
  on the ground reads `cl.rain`, and a shower is **2-5 hexes TOTAL**, so it rains on **less than one** picnic/cafe hex
  — `T.MARKET` again, **no host.** Widening it is a Sky change to a tuned draw, and **gradients price by AREA**.
  **(o) THE PORT HAS NO WATERFRONT — do not build "the ship docks / cranes work her"** (205,
  `probes/probe-harborhost.mjs`, 6 seeds, unanimous). Warehouses sit **behind** the coast highway, **5-9 hexes from
  the sea**; **no quay tile exists.** Solvista is a **roadstead**, so the anchored freighter is *correct* — her
  "waiting on a berth" comment is the label-tell's **FALSE-POSITIVE mode**. A port vector must **build the waterfront
  FIRST**. **Banked host: the MOLE is real** (`moleSet`, 5-12 cells, all 6 seeds — the only structure in the water).
  **(p) CLOSED by 208/209 (body archived); the WARNING is live. ⚠ DO NOT RAISE THE LAWN AMPLITUDE FURTHER** — `grass`
  and `lawn` share a base colour, so the dry-season divergence *is* the managed green's identity; lawns must stay
  greener/brighter than the hills **all year**. **⚠ GARDEN is STILL MUTE (1.8 → 5.4). Its own richer cue, which (p)
  OWNS:** staggered per-bed calendars + ONE shared `gardenPhase()` — beds at different stages is an allotment's whole
  visual identity (FARM staggers FIELDS; this staggers BEDS); run the tell FORWARDS (123). **Nature × Deepen.**
  **(aa)/(ad)/(ae) CLOSED (220 masonry, 221 greens, 223 normalisation); bodies archived. THE `col()` WASH LADDER IS
  COMPLETE** — ONE shared `washRGB(b,f,gr,gg,gb)`, colour-only (**zero path objects**, **byte-identical in daylight**
  ⇒ a free dead-regime control). ⚠ **Do NOT fork a second wash — EXTEND `washRGB`**; **GLASS (TOWER/COM) KEEPS the
  cool tint** and **ROAD staying grey is CORRECT** (214); **the invariant is ASSERTED by `probes/probe-goldenhue.mjs`
  — run it whenever you touch a gain triple.** ⚠ **234 added a THIRD caller — `WARMN` (timber), by NAME like `LEAFN`.**
  ⚠ **FARM (`cropRGB`/`colRGB`) is the ONLY warm surface still outside `col()`.** ⛔ **The old "watch: PARK↔ROAD
  separation is 14" item is RETIRED (251)** — it was a POINT-SAMPLE artifact, and 221 forbids scoring on a separation.
  ⚠ **`towerLook` publishes `bax`/`bay` — the ONE definition of "how wide is a tower"; the skybridge and helideck
  BOTH read it** (a point plan would have floated the bridge and overhung the pad). **Any new tower ornament must
  read it — and `midLook` (`fx`/`fy`/`segs`, furniture scaled by `rs`) is its walk-up twin. See (al).**
  ⛔ **(ag) CLOSED 251 — REFUTED ON EVERY COUNT. DO NOT RE-OPEN, AND DO NOT "FIX" THE NIGHT SAND OR THE NIGHT GREENS.**
  The greens are innocent (PARK **81**, *below* the ROAD; and its *"26° off its daylight self"* was a POINT-SAMPLE
  artifact — it is **1°** in area units). The wash ladder is innocent (`w=0` ⇒ identical ordering). The `BEACH >= MID`
  breach was **the probe's own centre-pixel + MEAN score**, which had never sampled a lit window. ⚠ **`probe-goldenhue`
  is REPAIRED** (area sample + **p90 envelope**; **HEAD PASSES by 21**) — trust it again. ⚠ **DIMMING THE NIGHT SAND IS
  A MEASURED DEAD END**: it costs `BEACH↔ROAD` **24 → 18** (214's asphalt) for a change **no agent can see**.
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
  **(ak) THE SEASON — REFRAMED by 238; body archived at 240. Read it before ANY seasonal vector.** ⚠ **Its headline
  "68% mute" number is DEAD**, and so is its prescription: the mute area is **DILUTION by the season-dead *CONTENTS*
  of each hex** (a park hex is 45% lawn / 12% canopy / **43% paths, ponds, benches, furniture with no calendar**) —
  **not** dead palettes, and **NOT** the lawn ((p) protects it; it is already the city's most seasonal surface).
  ⇒ **A PALETTE LAP CANNOT REACH THE PER-TILE FLOOR.** Use **`probes/probe-seasonarea.mjs`** (area sample + **what %
  of a hex a palette entry PAINTS**), never `probe-season` (ONE centre pixel, blind to a park's canopy). Canopy
  amplitude is **AT ITS CEILING**. ⚠ **242 adds the reachable move**: both agents said winter reads as *lusher*, not
  as winter — **sky, sea, light and the BEACH CROWD are all season-blind.** ✅ **247 TOOK THE BEACH CROWD** (`beachPhase()`,
  the fourth seasonal predicate) and ✅ **250 TOOK THE CONCERT** (`concertSeason()`, the fifth — and the FIRST on a
  *cultural* surface rather than a plant, which is one of this cue's own named honest moves: give the season-dead
  CONTENTS a calendar). ⚠ **BUT (ak) IS STILL OPEN, AND 247 SHARPENED IT: the "winter runs backwards" half is a
  MISREAD — Solvista is a *Mediterranean/Pacific* coast, so a green wet winter and a golden dry summer is CORRECT (201).
  DO NOT ship snow, bare trees, or a cooler winter light "to fix" it.** The real residue is that **the model is not
  COMMUNICATED**: four agents have now read a correct seasonal model as broken. Remaining honest moves: give a park hex's
  **season-dead contents** (43% paths/ponds/benches) a calendar, make the **sea/sky/light** answer `year`, or **retire the
  metric**. **Nature / Sky.**
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
  **(ap) THE SEA'S FOAM IS INVISIBLE AT FIT ZOOM (245 — both agents, both seeds, INDEPENDENTLY, in passing ⇒ 212).**
  ⚠ **A property of THE WHITECAP FAMILY (185's caps were equally sub-pixel at fit), NOT of 245's wind response** — so
  it is a cue, not a bug. ⚠ **DO NOT "fix" it with contrast or more strokes**: 159 judges a coast ornament at MODERATE
  zoom, not fit; 215 says a speckle ornament needs a **BODY**. First ask if the sea *should* read at fit. **Water × Polish.**
  **(x) A STROKE MAY NOT PRICE LIKE A FILL (215, perf suspect — NAMED, NOT MANDATED; see the PERF bullet).** Build a
  **stroke-vs-fill sweep at equal path-object count**; `CCACHE` churn and per-mark style writes are ruled OUT (zero).
  **(y) A SCORCHED-LOOKING HEX CLUSTER INLAND (216, seed 7, unprompted on a PASSing frame).** ⚠ The fire CA is a
  **GHOST** (cannot ignite at 2035) ⇒ almost certainly **LOGGING/clearcut, not BURNT** — **identify the tile before
  designing** (dead-code law). Nature × Polish.
  **(s) GOLDEN HOUR: CONTRAST COLLAPSE (212+217+227+232, and a FIFTH at 242 — both agents called golden the WEAKEST
  frame, *"a single textured mat"* / *"muddy brown-olive mush"*. CONSTRAINED; Sky × Polish; body archived at 237).**
  **The complaint is CONTRAST COLLAPSE ACROSS SURFACES, not the sun's position** (217 measured chroma RISING — a
  saturated wash, not mud); use `probe-goldenhue.mjs` to find which pairs collapse **before designing**. ⚠ **The sun
  CANNOT be lowered — 200 put it high ON PURPOSE** (the `.placard` owns the low-left sky). ⚠ **242 adds a lead: both
  agents said the SHADOW SIDES go warm** (*"warm-tinted shadows kill the form"*) — reconcile the gradient's direction
  with the sun's, or move the warmth. **Do not move the sun down.** Not a quick win.
- **Reach maps exist — reuse them (U5):** `reachFill(out, r, isSrc)` is a multi-source hex BFS capped at radius `r`,
  land-only (`WETSET` blocks water/marsh/kelp), filling `out` with steps-to-nearest-source (255 = farther than r).
  `recount()` runs four per tick. Any "how far is X from Y" question should call it, not hand-roll a flood fill.
- **⚠ Three census stats can FALL, by design (U5):** `walkPct`, `transitPct`, `solarPct` are **shares**, not counts.
  **Services are walkable's binding constraint** — a tower lap that adds residents without civics *drops* `walkPct`,
  and that is the stat working. Judge by whether the city earned the change, not "up = good". `density` rises with
  intensification and falls with sprawl.
---

<!-- rotated -->

> **Archive:** the 244 entries before Iteration 242 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

## Iteration 242 — the twenty-eighth step-back finds the clouds shading the open sea (2026-07-13) [holistic step-back]

**Vector** — the 28th step-back (overdue; the header flagged it). Whole-city read at 2 seeds × 3 lights × 2
calendars, the perf lap + arc, the draw budget — then FIXED the one defect both agents found.

**The read.** Seed 42 PASS, seed 7 FAIL. Seed 7's headline FAIL was the **elevated rail's z-order** — the *seventh*
time that has been raised and the seventh time it is wrong (CLEARED BY PROBE TWICE, 203/212; it is a LEGIBILITY
defect, polish-tile's cue (a)). But **both agents, blind, on different seeds, unprompted, in passing** reported the
same thing: *"dark elliptical blobs sitting on the open ocean with no cloud above them — they look like holes in the
water"* (42) · *"dark oval blobs on the water with no cloud above them (cloud shadows without their clouds)"* (7).
**212's aside law, tenth payout — and its purest: the FAIL was the wrong diagnosis, the ASIDE was the lap.**

**The defect.** The cloud shade was gated
`if(inB(cl.x|0,cl.y|0)){ /* shade only falls where there is ground to catch it */ }`.
**`inB()` is the PLATE, and the plate runs out to sea** — so every cloud drifting over the ocean painted a dark
ellipse straight onto the water, ~250px below the puffs that cast it. 199/209's tell (a predicate that cannot
deliver what its comment asserts), and it had been there for the artifact's whole life.
🔑 **A NEW HOST FOR THE TELL, AND THE LAW OF THIS LAP: A LATER DRAW CITED AN EARLIER ONE AS AUTHORITY FOR A STANDARD
IT NEVER ENFORCED.** The rainbow (~L7515) builds a careful `ROWMIN`/`ROWMAX` rim test under the comment *"it fades
out as the shower leaves the plate (**cf. the cloud shade above — no ground, no bow**)"* — **citing as precedent a
gate that was never doing the job.** ⇒ **When code cites a neighbour as the precedent for an invariant, go read the
neighbour. A cited standard is not an enforced one.** (Promoted to SKILL.md.)

**Change** — `shadeGround(cl)` samples the shade ellipse's **own footprint** (5×3 cells, sized from `30*cl.s/CW` ×
`12*cl.s/ROWY`) and returns the **land fraction**, via `WETSET` — the artifact's one definition of wet, reused, not
re-rolled. Alpha scales by `min(1, 2·frac)`: **half a footprint of land casts a full shadow**, so a cloud standing
over the coast is not dimmed on its land side; only a cloud well out to sea fades away. The damp rain-patch scales
with it too (rain-wet ground on the open ocean is the same bug). `inB(centre)` is **kept** as a precondition.

⚠ **THE FIRST CUT WAS WRONG AND THE CONTROL CAUGHT IT.** Gating on the footprint *alone* (dropping `inB`) let clouds
whose **centre is off-plate** cast shade for the first time — the ellipse is **not clipped to the rim**, so it would
spill into the void: a *new* floating artifact, the very class the agents flagged. The probe's land control went
**+66% (up)** — impossible for a change that only ever multiplies alpha by a fraction ≤1 — which is what exposed it.
**A control that can only move one way, moving the other way, is the cheapest bug detector in the harness.**

**Probe** (`probes/probe-cloudshade.mjs`) — the claim in the **viewer's units** (205): *dark ink is landing on sea
pixels*. The suppression family (226 draw / 230 decision / 234 colour): render as shipped, re-render with **only the
shade's fill suppressed** (its `rgba(36,30,20,…)` is unique in the file) ⇒ the difference **IS** the shade layer, in
ONE page, **floor exactly 0**, off the composited canvas (occlusion free). The **water mask** comes from 234's
palette suppression (loud-paint the sea's `BASE` entries, flush `CCACHE`, re-render), so it is derived per-build and
the probe runs **unchanged on HEAD and patch** with no cross-build floor. HUD masked (200).

| | shade ink ON SEA | on LAND (control) | floor |
| --- | --- | --- | --- |
| HEAD (241) | **165,320** | 160,620 | 0 |
| patch | **27,334 (−83%)** | 136,866 | 0 |

Seed 42 goes to **exactly 0** sea ink (836 px → 0). Seed 7 (6/7 clouds off-land — cue (aj)) **72,003 → 8,519** ink.
**The control holds where it must:** on seed 1234 (clouds mostly inland) the land shade is **unchanged — 2,519 px,
49,259 → 49,255**. The residual sea ink is coastal spill *continuous with* a land shadow, which reads as a shadow,
not as a hole — and both agents counted it as zero blobs on open water.

**Census** — PASS, 0 page errors. Tile histogram **empty**, every core metric +0 (`greenRoofs +3` is 226's
documented tick-wobble). Correct and expected for a draw-only change, and exactly why the lap rests on the probe.

**Perf** — **free**: path objects day 111,389 → 111,469 (**+0.07%**), night 140,189 → 140,165 (**−0.02%**), inside
the probe's own run-to-run wobble. No new path objects; the change is alpha-only plus ~105 `cellAt` lookups/frame.
🔑 **AND THE STEP-BACK'S OWN PERF GATE IS 216'S LAW AGAIN.** The interleaved LAP timer vs 237 read a *stable* **day
+2.4% / night +2.2%** — which, over a lap in which **241 REMOVED draw work**, has **no mechanism**. The object count
disagreed: **110,152 → 111,389 day (+1.1%)**, **138,970 → 140,189 night (+0.9%)** — dead on the ~+0.2%/iter arc — and
the 177-ref **ARC was flat** (+18.6%/+12.8% vs 237's +17.2%/+13.8%), corroborating the smaller number. **The lap
timer over-read by ~2x.** ⇒ **Grade a lap with `probe-drawbudget` BESIDE `perfab`, never `perfab` alone.**

**Visual** — blind A/B, **per file name** (239), **crossed mapping** between seeds (238), asked to **COUNT** blobs
(108: locate, don't judge — a checkable answer). Both agents picked the patch. Seed 7: `sb7` **3 blobs** at
(0.92,0.55), (0.87,0.44), (0.81,0.71) → `fix7` **0**. Seed 42: `sb42` **1 blob** at (0.945,0.612) → `fix42` **0**.
Neither found any shadow spilling off the plate; neither lost a land shadow. Seed 7's `VISUAL: FAIL` **names pristine
HEAD as the defective build** — the strongest form of a pass this gate can produce.
⚠ **Side-effect, honestly reported: MARSH and KELP no longer catch cloud shade** (both are in `WETSET`). Both agents
read it as an improvement — the kelp went **teal instead of olive-brown** — and it is consistent with the coast's
long history of compounding dark. Noted rather than tuned.

**Banked from the asides** — 🔴 **(an)** the black cables running out over the beach and ending in the sea:
**re-reported by BOTH agents on BOTH seeds**, still **unidentified**, now the most-reported *undiagnosed* defect in
the ledger · **(ao)** the rain shafts and rainbow are not bounded by the ground (the same family this lap just fixed)
· **(ak)** *both* agents, independently: **winter reads as "lusher", not as winter** — the season is a
hue-on-vegetation signal only, and the beach crowd still sunbathes in January · **(ag)** reconfirmed (night parks
out-brighten the lit streets; the sand "glows like it's still dusk") · **(s)** golden-hour contrast collapse, raised
now at a **FIFTH** step-back.

**Verdict** — **FIXED.** The city is otherwise whole: no z-order tears, no blown-out colour, no broken geometry, the
night frame is the one that "has aged best", and the arc is flat. One 240-iteration-old defect, found by an aside,
closed by a probe with an honest zero.

## Iteration 243 — the cable car went for a swim (Transport × Polish, FIXED)

**Vector** — Transport × Polish. Took the ledger's **#1 🔴 cue (an)**: *"a pair of dark lines leaves the shore,
crosses the beach and open water, and ENDS IN THE WATER with no pylon or terminus — the single ugliest artefact in
the set"* (both step-back agents, both seeds, 242). It had stood **UNIDENTIFIED** — the most-reported undiagnosed
defect in the ledger — with an explicit instruction to `grep` the draw before designing.

**The instrument lied first, and that is the lap's real finding.** The harness owns a locator for exactly this
(`probe-darkline`). Run at the defect it was built for, its census came back headed by **8,160px of "black" ink
attributed to `render`** — which is **the rain shafts**, whose `CanvasGradient` `strokeStyle` has no luminance and
was being scored `#000`. Meanwhile the real suspect was **filtered out entirely**: a gondola rope span is ~12–14
device px and the probe's `len >= 30` per-stroke gate cannot see it. **SKILL.md documented BOTH traps, in detail,
and had done for 40 iterations** — as *prose telling the reader to compensate*, while the probe went on doing them.
Fixed in the tool: gradients counted apart and never scored as ink; `MINLEN` an env knob so it censuses chains.

**Change** — `stepGond` extends a line onto a cell only if it clears the value bar `c.val < g.bar - g.wait*0.002`
— and **that bar DECAYS with the wait, with no floor.** So an aerial line that stalls at the coast (nothing left
ashore is worth riding over) eventually drops its bar beneath a **val-0 sea cell** and strings its rope out into
open water, terminating there. The lever is the **predicate, not the rate** (218). One line, reusing **`WETSET`**
— the artifact's one definition of wet, established at 242 — rather than rolling a second one:
`if(WETSET.has(c.t)){g.fam=-g.fam;return;}`. It **turns along the coast instead of stopping**, so the line keeps its
LENGTH and only loses its swim. A **BEACH stays rideable**: an aerial tram over the sand is the good half of this
feature and is what the line is *for*.

**Probe** (`probes/probe-cablehost.mjs`, banked — pure world data, no render, no clock, no noise floor; `SRC=`
grades HEAD). Per line: length · **SEA spans (`WETSET`) kept separate from BEACH spans** · the tile it ends on.
6 seeds:

| | HEAD | patch |
| --- | --- | --- |
| seed 7 | len 17, **SEA 2** (idx 14,15 — the tail), ends BEACH | len 14, **SEA 0**, beach 5, ends BEACH |
| seed 5 | len 19, **SEA 1** (idx 16), ends BEACH | len 19, **SEA 0**, ends IND |
| 42 · 1234 · 99 · 2024 | SEA 0 | **SEA 0**, byte-identical routes |

**SEA spans 3 → 0 across six seeds; only the seeds that swam changed.** The **monorail is exonerated by the same
probe** (the control): it is a **closed loop**, crosses water 0–3 cells and comes back — a viaduct, never a terminus.

**Census** — PASS. Core byte-flat (`pop`/`roads`/`developed` +0), tile histogram **empty** — correct, the gondola
touches no terrain and rolls a private PRNG (`seedNum^0x60D0`). `greenRoofs -3` is **not mine**: re-running the
**SAME FILE** (226's law — never diff HEAD) moved it again to `-2`. **Free by 222's ledger**: path objects
**day 111,450 / night 140,102** vs 242's 111,389 / 140,189 = **+0.05% / −0.06%** — it reroutes spans, it doesn't add them.

**Visual** — blind agent, asked to **LOCATE not judge** (108), given **file names not letters** (239), traced
`head7`'s rope onto **masts standing in the water at ~(0.685,0.68)** and `fix7`'s terminating **on a mast on the
sand** — matching the world probe with no knowledge of it. No z-order tears, no floating tiles.

⚠ **BUT THE CUE WAS ONLY HALF REAL, AND SEED 42 NEVER REPRODUCED.** Seed 42's gondola has **SEA 0 in HEAD** — it runs
nowhere near the sea — yet seed 42 is the seed whose agent wrote the quote above. A second agent, asked to locate it
and told not to be agreeable, ran a **dark-pixel scan of the entire ocean half** and found **nothing**: the two
things over seed 42's water are a **jetty ending in a red-capped lighthouse** and a **pleasure pier carrying a ferris
wheel** — both properly terminated. Its read: the reviewer most likely misread the **beach boardwalk and its white
railing** (*a pair of parallel lines* — the cue's own words) which **stays entirely on sand**. ⇒ The cue bundled
**one real defect (seed 7's rope, now closed) with one misread (seed 42's boardwalk)**, and the misread is what
escalated it to 🔴 and to *"the single ugliest artefact in the set."*

**Verdict** — **FIXED.** 🔑 **Its law (in SKILL.md): A "BEWARE, THIS PROBE OVER-REPORTS Y" NOTE IS A BUG REPORT, NOT
A LAW.** The loop wrote the compensation for two instrument defects into its own prose and left the defects in the
code, so its banked locator failed at the one cue it was built for. **229's law wearing a probe** — a *discipline*
written where a *structural* fix was available. When you catch yourself writing "remember that probe P lies in way
X", stop and spend five minutes inside P.

## Iteration 244 — the house had its back to the view (2026-07-13) [Civic & culture × Deepen]

**Vector** Civic & culture × Deepen — the stalest domain (last touched 231), taking its
own banked cue **(ah)**: *"the amphitheater's cavea has a FIXED orientation — it now often
sits on the water's edge and does not face it."*

**The defect, measured (`probes/probe-amphsight.mjs`, pure world data, 10 seeds).** The
cavea was drawn `ctx.ellipse(..., rotation 0, arc -0.15..PI+0.15)` with its stage house at
a hard-coded `gy-0.24`: seating always the lower half, skene always up-screen. So the
audience faced **north in every city ever generated, and nothing in the world had ever
chosen that.** And the mechanism is **240's law**: the SITING rule scores `groundLoad` —
the rows at `dy=+1/+2` — so it deliberately takes a lot whose **south** is open and the flat
bowl is not buried (231's fix, and right). The draw then sat the house facing the leftover.
**Two gates on one feature, pointing opposite ways.** Measured: the house looked into a wall
of h74 / h69 / h47; **2 seeds in 10 faced nothing but ROOFTOPS**, mean sightline 0.79.

**EXPLORED → REVERTED: turning the bowl.** The cue named the fix, so I built it — `c.face`
set once at siting, the whole assembly (seating arc, apron, crowd, skene, beam, wash,
footlights) swung to one bearing, restricted to the four rays the projection can show. The
code was **exact**: a forced-north control rendered **byte-identical to HEAD**. It still
failed, and it could never have worked. **A circle on the ground projects to a WIDE, SHALLOW
ellipse, and the cavea reads as a bowl precisely because its seating is the NEAR half of it**
— the tiers stack into a rake. Swung 90°, the seating becomes the ellipse's left/right half,
a **tall narrow sliver**, and five arcs 2px apart with 2px strokes **fuse into a blob**. Two
agents, blind, on two seeds, independently: *"a spilled cream blob"* · *"a painter's palette
lying on the grass"*. I looked myself and they were right. **Reverted to byte-identical.**

**SHIPPED: the site comes to the bowl.** Two gates can be made to agree from **either** side.
The draw could not move; the siting could. `viewScore`/`amphSight` walk the two straight hex
rays that bracket the fixed up-screen sightline (`RAY6` — a real straight ray, not a repeated
`nbrDirs` step, which zigzags with row parity) and score what the house will actually look
at; the siting rule subtracts it from `groundLoad`. A **PREFERENCE, never a gate** (206) —
the best of a bad lot still takes it, so the one-per-city bowl can never be lost.

**The sweep refuted the obvious rule.** The bowl faced a *wall*, so the natural fix is
*penalise the wall*. Held apart as its own variant it is a **DEAD LEVER**: at 20× the shipped
weight it never moved a **single** bowl off a rooftop view, while the subtraction was the only
thing that ever **cost** burial. What worked is **pure addition** — *give it something to look
at* (219's law, and here the subtractive form was not merely worse but **inert**). `AMPHVIEW=6`
is the top of a free plateau (4–6); at 7+ the bowl starts paying visibility for almost no view.
Only PERMANENT green scores: MEADOW/FARM are `RAISEABLE`, and scoring them would site the bowl
facing the ground the upgrade pass is about to build on (231).

**Census** PASS. Core flat: `developed -3`, `roads +2`. But `pop -1.5%`, `TOWER -14 (-3.3%)`,
`MID +28` — the classic 231 signature (same land, building shorter). **`probes/probe-cascade.mjs`,
10 seeds, paired: mean TOWER delta -0.4, mean pop -0.08%, 2/10 down and 2/10 UP (+8, +10),
6/10 unchanged ⇒ CHAOTIC RESHUFFLE, not mine.** The 3-seed matrix drew a bad hand.

**Probe (END-TO-END, both builds grow their own city, 10 seeds)** — `faces ROOFTOPS 2/10 → 0/10`
(the defect, closed) · mean sightline **0.79 → 1.14 (+44%)** · parkland 6→8, water 2→2 ·
**burial worst-case UNCHANGED (14)**, mean 2.4→2.8 · **placed 10/10 → 10/10** · and **6/10 seeds
keep the SAME LOT** — the rule only moves the bowl when it is actually staring at a wall.

**Visual** Both agents PASS, and both *located* the change rather than judging it. Seed 8 HEAD:
*"a solid wall of buildings... looking straight into tower flanks and rooftops — no park, no
water, no open horizon"* → patch: *"broad green parkland: two teal ponds, trees, a splash-pad."*
Seed 2600 HEAD, reproducing the original cue unprompted: *"the audience is looking straight into
the flank of a downtown block. **The ocean in this frame is down-screen, i.e. behind the
audience's backs.**"* → patch: *"a green axis to a fountain plaza and a civic dome — buildings
frame the vista rather than wall it off."* No z-order tears, floating tiles or blown-out colour
in either whole-city frame.

**Perf** Free, and **counted, not inferred** (222: the world is the draw list). Path objects
**day 110,931 / night 139,583** against 242's 111,389 / 140,189 — flat-to-slightly-down.

**Verdict** DEEPENED (the bowl now reads its surroundings), with one EXPLORED → REVERTED
inside it (turning the cavea). Cue **(ah) CLOSED**. Law promoted to SKILL.md.

## Iteration 245 — the whole scene gusts together, except the sea (2026-07-13) [Water & coast × Deepen]

**Vector** Water & coast × Deepen — the stalest domain (last touched 234), reached the way
225's grep-the-seam law says to reach a domain whose cue list looks dead: **grep the seam
before you believe the saturation note.** Water's banked cues were one stale `rng()`-salt
item; its seam held this.

**The defect — 199's tell, hosted on a CROSS-REFERENCE (242's law), twice.** `WINDA` is a
seeded gust cycle (0.25 → 1.0). Its own definition says *"trees, palms and clouds all read
from this one signal **so the whole scene gusts together**"* (~L8381); 236's weather-front
comment opens *"**The wind gusts (WINDA) and the sea turns (TIDE)**…"*. Both name the sea as
a live system in the same breath as the wind. **The water draw contains no `WINDA` at all** —
and the whitecaps, added by 185, are commented **"wind-driven whitecaps"** and read no wind
whatever. The sea broke exactly as hard in a dead calm as in a full gale, for the artifact's
whole life, under a comment that said otherwise.

**Probed BEFORE designing** (`probes/probe-seastate.mjs` — a 196 state-response probe: ONE
build, frozen clock, same `genWorld`, rendered at two pins of the signal, so every moved
pixel IS a wind-response; sea isolated by 234's palette suppression, floor **0 px**):

| | seed 42 | seed 7 | seed 1234 |
| --- | --- | --- | --- |
| sea surface | 83,823 px | 91,250 px | 87,083 px |
| **sea moves, calm→gale** | **42 px** | **29 px** | **21 px** |
| land moves (POSITIVE control) | 5,343 px | 4,686 px | 4,736 px |

The land — trees, palms, flags — swings ~5,000 px on the identical pin, so **the pin is live
and the water is deaf** (0.03% of its own surface). The defect is its own perfect control (236).

⚠ **196's contaminant, caught in the act.** The first run read seed 7's sea at **3,398 px** —
because the **rain shafts lean on `WINDA` and are alpha-blended OVER the water**, so their
pixels are part-water and fall inside a water-palette mask. A neighbour answering the same
signal, masquerading as the host answering it. Clearing the sky took it to **29 px**.

**Change — `seaState()`, ONE predicate, every sea draw shares it** (the one-predicate law).
`SEACALM=0.34` floor (a glassy sea reads as the flat teal that 185's caps were *added to fix*
— cf. `SHAMT`, which may never reach 0 at night). Readers: the whitecaps break **sooner**
(`CAPK`, crest threshold 0.60 → 0.19) **and over more of the sea** (`HBK`, eligibility 0.76 →
19%..39% of deep hexes), and each cap is bigger; the open-sea sparkle rides a steeper swell.

⚠ **ONE lever was not enough, and the first cut proved it.** With only the crest threshold
moving, the calm→gale swing was **1.5x** and both the pixels and my own eye read it as
*"slightly more speckle"*. The old fixed `hb>0.76` gate meant only **24% of the open water
could EVER break, in any weather** — the ceiling was in the *eligibility*, not the threshold.
Priced analytically (pure maths off the shipped WINDA formula, no render): `HBK=0.30` triples
the swing to **3.0x** for **+0.8%** mean cap count. Shipped.

**Census** PASS. `pop`/`roads`/`developed` **+0** — draw-only, no terrain, no `rng()`. Tile
histogram empty, exactly as a draw-only lap must be; **the probe is the gate here, not the census.**

**Perf — FREE, and by construction rather than by promise** (223). Both levers are *centred on
`seaState()`'s mean*, so at that one wind the patch is **BYTE-IDENTICAL to HEAD — 0 px on all 3
seeds** (`probes/probe-seamean.mjs`, with a full-gust control at 736–805 px proving the builds
do diverge elsewhere). Mean cap count over the real gust cycle: **8.00% → 8.07%**. The deep sea
is **341 cells**, so caps are ~55 of the frame's ~110,152 day path objects (**0.05%**) ⇒ the lap
costs **+0.4 path objects**. The sparkle's `ph>0.2` gate is untouched ⇒ its count is exactly flat.
**The foam is REDISTRIBUTED across the cycle, not added.**

**Visual** PASS, both seeds, **blind, with the A/B mapping CROSSED between seeds** (238/239 —
files NAMED, never lettered). Both agents were asked to *locate* which frame was blowing, and
**both got it right**: seed 42 *"sea-2 is the rougher — ~20+ foam caps against ~8–9"* (a 2.4x
count, against my predicted 3.0x); seed 7 *"sea-1 — ~24% more bright pixels, harder-edged
caps"*. Whole-frame reads clean on both: no z-order tears, no floating tiles, no blown-out
colour, city still coherent.

⚠ **THE ASIDE BOTH AGENTS REACHED INDEPENDENTLY (212's law): it is NOT legible at fit zoom.**
*"Nobody would call it at this scale"* · *"at most a faint speckle"*. True — and it is a property
of **the whitecap family as a whole** (185's caps were equally sub-pixel at fit), not of this
change; 159 says explicitly to judge a coast ornament at moderate zoom, not fit. Banked as cue
**(ap)**, NOT a blocker. The lever, if ever taken, is 215's: **a hairline/speckle ornament needs
a BODY** — not more contrast.

⚠ **TWO INSTRUMENT BUGS, BOTH MINE, BOTH CAUGHT BY AN AGENT OR A CONTROL.** (1) The camera's
aim-by-ink searched the **whole frame** for the biggest calm→gale difference — and the land
moves ~8x more than the sea, so the argmax landed on the **palm band**, i.e. squarely on the
probe's own POSITIVE CONTROL. It framed a park, and the first agent correctly FAILed *the
camera*. **Aim by measured ink OF THE HOST, not of the frame** (226). (2) `probe-seamean` is the
one CROSS-BUILD diff here, and its HEAD-vs-HEAD floor blew out to **5,416 px** — the **movers**
(230): each page ran a wall-clock-dependent number of RAF frames before its freeze, so its cars
and boats sit elsewhere. Emptying the mover arrays took the floor to **0**.

**Verdict** DEEPENED. The sea now answers the wind: **21–42 px → 725–861 px** of wind-response,
monotonic across the sweep, floor 0, land control unmoved — at zero net draw cost.

## Iteration 246 — the slack was the exhaustion (2026-07-14) [Nature × Deepen]

**Vector.** Nature was the stalest domain (238) *and* the ledger's #1 🔴 cue — **(ai), the city
has no fringe** — is a Nature × Deepen vector (233 is struck in that cell). Both pointers agreed,
so I took (ai). The header has carried a **named way through** since 233: *hold the rim AND widen
the core in ONE lap, so `developed` stays flat, the census gate opens, and the belt can be as
strong as the eye needs.* This lap did not build it. **It measured it first — and it does not exist.**

**Probe before you design, and it killed the design (`probes/probe-fringeabsorb.mjs`, 6 seeds,
pure world data).** 233's pair has two halves; the second one is a claim, and nobody had checked it.

| | |
| --- | --- |
| a candidate belt **HOLDS** | **157–223** developed cells (depth 5→8) |
| widening the parcel rule's road radius 2→3 **ADMITS** | **25** cells |
| …the same widening at radius **2→4** admits | **25** cells |

**The pair is 7–9x short, and the second row is the one that closes it.** `r=4` admits *exactly
what `r=3` admits* ⇒ there are **zero** interior open cells at road-distance 4. The interior's
unbuilt land is not *out of reach* of the predicate — it is **gone**. This is 206's *the vacant
lot is a MIRAGE* arriving on the absorption question: development has eaten every interior gap,
so there is nothing inland for the freed rim development to land on, at any radius. **No paired
addition exists.** Every fringe removes core fabric, 1:1, exactly as 233 measured.

🔑 **THE LAW (promoted to SKILL.md) — A BUDGET WITH SLACK IS NOT ABSORPTION CAPACITY; THE SLACK
*IS* THE PREDICATE'S EXHAUSTION.** 233 reasoned — and the header has repeated for 14 iterations —
*"the budget **has slack** (1153/1382), so the city **can** absorb the freed development inland."*
The slack is real (measured again here: **1082–1187 used against a 1382 cap, on every seed**).
The inference is **backwards**. A rule whose roll is ~100% saturated (218) stops **only** when it
runs out of eligible cells — so unspent budget is not headroom the city could use, it is the
**receipt for land it could not find**. Slack and exhaustion are *the same fact read from opposite
ends*, and 233 cited the symptom of *no absorption* as the evidence *for* absorption. ⇒ **When a
saturated rule leaves a budget unspent, that is a measurement of MISSING SUPPLY, not of SPARE
CAPACITY. Never treat a cap's headroom as a place to put something — go count the eligible cells.**

**And the shape does not rescue it either (`probes/probe-fringeshape.mjs`).** Before conceding I
built the best remaining candidate: **top-K of a smooth field**, which designs out all three of
233's shape failures at once (a smooth field's top-K is its *peaks* ⇒ contiguous **lobes**, never
speckle; the boundary is the **noise**, not `hexDist`, so it cannot trace the plate's hexagon; and
**K is a constant**, so the *amount* held is identical on every seed while the *shape* still
wanders — killing the lottery that actually killed 233, whose noise decided the amount too).

It is a **weak lever anyway.** Largest contiguous undeveloped run in the outer plate:

| | HEAD | K=90 | K=120 | K=150 | K=180 |
| --- | --- | --- | --- | --- | --- |
| mean (6 seeds) | **118** | 122 | 124 | 127 | **133** |
| cost (developed cells held) | 0 | 40 | 54 | 68 | **81** |

**81 developed cells (≈ −7% at 2035) buys +15 cells of countryside — and on seed 1234 it buys
NOTHING (107 → 107).** The cause is structural and it is the third independent finger pointing at
the same host: **the ROADS fragment every lobe.** A belt cannot touch them (233 left them alone on
purpose — the lanes must still thread to the edge), so held land arrives in slivers either side of
an asphalt line and never merges into country.

**⇒ (ai) IS TERMINAL AS SPECIFIED, and this is 218's host law being ignored for three laps.**
`probe-fringehost`'s own header — written by 233 — names limiter **(3)**: *"the rim is dense because
ROADS run to the rim, and **the fix belongs in the road/corridor pass**."* 233 then built a mask
over the **parcel** rule, and the header's way through targets the **parcel** rule, and this lap's
lobes are a mask over the **parcel** rule. All three faithfully steer the innocent rule (218: it
fills what the roads reach) while the host goes untouched. But the road pass is **more** metric-
negative, not less: cutting rim roads costs `roads` *and* starves the parcels that need them, so
`developed` falls further. **There is no mechanism that produces a fringe without removing core
fabric, and nothing inland can absorb it.** The cue is unreachable while `developed`/`roads` are
hard core-collapse gates — which they should be (233's own law: a core gate guards against
*accident*, so it cannot pass a deliberate *reduction*).

**Census.** PASS, 0 page errors. `solvista.html` is **byte-identical to HEAD** — nothing was built,
so nothing had to be reverted. **No visual gate: there is no change to look at.**

**Verdict: EXPLORED → REVERTED.** Two probes banked, one law promoted, and the ledger's #1 cue
**RETIRED as specified** rather than left to steer a fourth lap into the same box. The cue's
*complaint* is still real and still unaddressed — but it must be re-derived from its own nouns
(228/235), and the honest next step is to stop spending laps on the density statistic.

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
