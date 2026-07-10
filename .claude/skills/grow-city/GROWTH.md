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

**Interaction/UX is now a column** (added iter 97). It was a documented *kind* that lived only in
the bullet below, so a domain touched by an Interaction vector still looked untouched to step 1's
rotation scan. Cells hold only vectors the ledger explicitly attributes to a domain; cross-cutting
ones (U2, 42, U5) stay in the bullet.

| Domain | New element | New CA rule | Deepen | Connect | Scale | Polish | Interaction/UX |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Nature** | 4, 26, 29, **102** | 1, 13, 60 | 37, 46, 67, 76, **108**, **120** | ~~46~~, ~~88~~, ~~101~~ | U4 | 53, 96 | **117** |
| **Water & coast** | 6, 10, 12, 16, 20, 33, **106** | 90 | 17, 25, 51, 65, 72, **113**, **123** | 22 | | U2, 44, 58, 79, **116** | **97** |
| **Urban fabric** | 32, 62 | 7, 23, ~~82~~ | 38, 54, 68, 92 | 47, **109** | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99**, **103**, **110**, **118**, **124** | |
| **Transport** | 2, 9, 21, 31, 48 | 77 | 28, 39, 55, 63, **112**, **121** | 5, 15 | U4 | U1, U3, 70, 85, 87, 94 | **105** |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36, **107** | 36, 59, 66, 80, 91 | 45 | | 73, ~~**114**~~ | 52, **122** |
| **Sky & atmosphere** | 27, 43 | | 19, 35, 50, 57, 95 | | | 61, 81, 89, **115** | |
| **People & activity** | 41, 56 | 49 | 34, 64, 93, **104**, **119** | 78, **111** | | 84 | 71 |

- **Interaction/UX kind:** tile tooltip (U2, user-directed) + **entity
  tooltips (iter 42)** + **Est./Built years in tooltips (iter 52, Civic-led)**
  + **hover focus ring (iter 71, People-led)** + **census stats that can fall
  (U5: tallest / density / solar share / transit reach / walkable)**
  + **the coast names itself (iter 97, Water-led: pier/stall/ferris wheel,
  esplanade, lifeguard tower, dune `Sand`+`Marram grass`, live `Tide`)**
  + **the transit lines name themselves (iter 105, Transport-led: hovering a monorail train or
  cable-car cabin names its LINE — "Line 3 of 3 — a 183-span loop with 30 stations" — and traces the
  whole route across the city, pipped at its stops)**
  + **the woods name their own stand (iter 117, Nature-led: `Stand — N hexes` by live flood fill,
  `Canopy Closed/Thickening/Open edge` read from the draw's own `k`, `Undisturbed ~N yr`,
  `Old growth since`, `Deep woods`, `Mushrooms up`, `Burning`, and a live
  `Wildflowers In bloom/Gone over/Not in flower`)**
  + **the institutions name themselves (iter 122, Civic-led: `CIVICDESC` gives all 12 kinds their own
  sentence, drawn from each one's siting rule; `Civic quarter — N institutions` by `siteQuarter`'s own
  `MAJORK`/`QFAR`; `Fronts a paved forecourt` / `Keeps its own grounds behind`, and the squares answer
  back with `Forecourt of — Town hall` / `Grounds of — Museum`; `One of — 4 schools`)**.
  When adding an entity array: `stamp()` it in its draw + add an `ENTINFO` row
  (same discipline as the census hook). `stamp()` now also draws the focus ring,
  so any stamped entity is ringable for free — **but a TILE has no ring, see cue (l)**.
  **An `ENTINFO` `sub` may be a
  FUNCTION of the entity (iter 105)** — use it when a thing's interest is its
  *membership* (which line / route / depot), computed live, not a stored string.
- **ROTATION.** Last vector per domain:
  Sky **115** · Urban **124** · People **119** · Nature **120** · Transport **121** · Civic **122** · Water **123**.
  **Stalest is now Sky (115)** — read its trap note below before taking it (sky is not cellular; its empty
  `New CA rule` cell is a trap, and additive sky is saturated) — then **People (119)** or **Nature (120)**.
  (**125 was the holistic step-back and took NO city domain vector** — a recipe/doc fix only — so this
  standings picture is unchanged: the next lap still owes Sky, then People/Nature.)
  **124 cashed Urban's banked ghost-`c.solar` cue and it is now CLOSED:** `c.solar`/`c.groof` persist after a
  building is cleared for a paved square, so the census counted panels on `PLAZA`/`QUAD`/`PARK`/`GARDEN`/`STADIUM`
  (probe-solghost: 27 ghost solar + 4 ghost green across 8 seeds) and the adoption CA counted them as neighbours.
  The draw + tooltip already gated on `DEV.has(c.t)`; 124 routed the census (×2) and both adoption neighbour-counts
  through the same predicate — `solarRoofs` −20, terrain-neutral (pop/roads/developed +0). **This was the last
  banked cue that moved a census number**; from here the census is vacuous again for most vectors — reach for a probe.
  **123 cashed the cue banked for Water, exactly as 122 cashed Civic's, 121 cue (h), and 119 cue from 111:
  four laps running where *the header told the iteration what to do*.** That is the loop working. **But 123 also
  found the banked cue's own description of the code was WRONG** (it said `hashCell`; the turbines were `rng()`),
  and the implementation the cue prescribed would have reshuffled the seeded stream. **A cue is a pointer, not a
  spec — re-grep the seam before designing to it.**
  And **Transport's next lap has cue (n)** (121, measured, pre-existing): both cable cars sit within **one span of
  the anchor tower at page load**, on every line and every seed, because the growth rescale telescopes `p→0` — so
  no cabin is ever seen riding *over* the city without `&step=`. Re-spread the cabins once `L` reaches `g.target`;
  do **not** touch the rescale, which is correct for a growing line.
  **120 broke rotation deliberately and
  logged why**: it was the mandated holistic step-back, the step-back found a real defect, and the skill's own
  rule ("if something compounded badly, spend the next iteration FIXING it") outranks rotation. A step-back
  that finds a defect and then ships an unrelated vector has wasted the step-back. **Every domain except Urban and
  Sky now has an Interaction/UX vector**; Urban's remaining Interaction/UX territory is cue **(l)**, since
  **118 closed cue (j)**.
  **119 took People × Deepen, its FULLEST cell, and was right to** — because 111 had already *measured*
  and banked the vector there (move the ped spawn pool). **A banked, measured finding outranks both
  kind-rotation and cell-emptiness**; the grid says what is *untried*, not what is *most wanted*. Check
  the last entry of the stalest domain for a banked finding before reading its row.
  **⚠ 118 declined the header's own "coldest kind" steer, and was right to.** The header said *New element*;
  118 first grepped the Urban draw and found its additive moves **spent** (cranes, helipads, masts, skybridges,
  lofts, solar/green roofs, terraces, neon, podia — full inventory in 118's last finding). Saturation beats
  kind-rotation: when a domain's additive cell is exhausted, the kind changes, not the domain. Read the
  inventory before proposing an Urban **New element**.
  **Sky's twenty-lap staleness is spent** — 115 took it *without* adding anything, which is the
  documented way past its additive saturation (surveyed iter 103; its empty `New CA rule` cell remains a
  **trap, not an invitation** — sky is not cellular, and fog on terrain is already `rSea`/`fogAt`).
  **Cue (k) is now FULLY CLOSED**: 116 gave the sea a bottom (the *field* half) and **123 stood the wind farm
  on it** (the *siting* half) — 3/18 turbines were on the shelf, now 42/42 across 14 seeds, and the farm's line
  bends around headlands because the depth is held and the row is not. **What 123 leaves banked for Water** is
  the rest of the salted coast: the **pier** row and the **lifeguard tower** are still `rng()`-picked with
  rejection loops, and a boardwalk should run out to a *depth*. 123's second finding makes that free — **respend
  an object's existing `rng()` draws rather than re-drawing them**, and the stream cannot move.
  Civic's banked **cue (d)** was attempted at
  114 and **reverted**: its goal is proven (a 3-hex square reads at fit zoom) but its prescribed
  host does not exist — see the rewritten cue below before re-opening it.
  **123 ran the tell FORWARDS**, which is a new move: rather than making the draw honor a string, it made the
  string and the rule **share one constant** (`SHELF0`/`SHELF1` — the tooltip *names* the `Coastal shelf`, the
  wind farm *stands* on it), so the two cannot drift apart in the first place. Prefer this to re-syncing them
  later. Related, and the deeper prize: **a derived field earns its keep when a RULE reads it, not when the draw
  shows it.** `rDeep` was drawn by 116 and read by nothing until 123 sited on it. Still unread by any rule:
  **`rGreen`, `rShop`, `rServ`** feed only the walkable stat — *nothing sites itself against them.*
  **Iteration 130 is the next holistic step-back** (105, 110, 115, 120, **125**, …). Per 115 it is shot
  **at night as well as by day** (115's night frame failed on a defect ~114 daytime reads had missed) and
  per 120 **at a season too** (`&year=`; a January read can never see a seasonal bug). **125 added the third
  rule: PIN THE DAY FRAME OFF JANUARY.** `?warp=61` lands on ~2035.0 = winter, so a default "day" frame and a
  `year=2035.02` winter frame *are the same instant* — 125's seed-42 agent duly read "winter barely differs
  from summer," comparing winter to winter. Shoot the day/night baselines at `year=2035.62` (dry peak) and keep
  `2035.02` as the seasonal-contrast frame. (Now promoted into SKILL.md's step-back section.) **125 itself
  found NO compounding city defect**: both seeds PASS day/night/season, night core reads at both (115's
  lighting holds — agents located it at (.48,.47)/(.50,.62), the latter off-centre), sea reads (116/123 hold),
  no tears/floaters/blowout in 6 frames; seasons measured alive (`probe-season`: FARM winter→dry-peak 88,
  ROAD control ~0). The step-back's product was the recipe fix above, not a city change.
  Iter 111 was People × Connect and used
  109's trick (close a gap between two existing objects); iter 112 **cashed the same trick in
  Transport** (trains ↔ their own stations) and iter 113 cashed it a third time in **Water** (the
  marsh ↔ the tide its own tooltip printed). **That shape has now paid in four domains — assume it is
  spent, and look for the gap-closing seam only where a tooltip/label already ASSERTS a relationship
  the draw ignores.** (That is the reliable tell: 111 a shelter, 112 a platform, 113 a live `Tide`.)
  **117 cashed the tell a fifth time and it is now the loop's most reliable move**: `TILEDESC` claimed
  *"Old-growth redwoods"* and *"Wild grass and wildflowers"* while `describeTile` printed only `Value`,
  though the CA had tracked `c.age`/`c.fire`/`c.bloom`/`c.shroom` since 1974. **Where else does a string
  assert what the code already knows?** **122 cashed it a sixth time** (`CIVICLABEL`'s one sub for twelve
  institutions) and found the tell is **self-renewing**: cashing it *created* a new one, since
  `TILEDESC[T.PLAZA]` still says only *"A paved civic square"* for a square that now knows its institution.
  Un-cashed: `TILEDESC[T.KELP]` *"swaying in the shallows"*, `[T.IND]` *"warehouses and light industry"*,
  `[T.VINEYARD]` *"terraced"*, and the plaza/quad **titles** (still the generic tile label — they could
  read *"Town hall forecourt"* outright).
  **122 also warns what the tell CANNOT do alone:** its first build derived ownership from *adjacency*, named
  the wrong institution on 2 of 3 seeds, and **passed the census and would have passed both visual agents** —
  the prose is only wrong if you know the geometry. **A tooltip vector needs a probe that checks the claim
  against independently recomputed truth, not just a screenshot that it renders.**
  Note iter 108 was Nature × Deepen but its
  *content* was a Sky interconnect (the farm calendar reads `applySeason`'s `year`) — **Sky can be
  fed by deepening another domain toward it**, which is the way out of its saturation that does not
  require a sky feature. **113 did this again** (the marsh reeds now read `year`), leaving 109's
  Sky-feedable list at `VINEYARD` and `MEADOW` seed-heads. **120 was a third instance** (the park lawns
  now read `year`) — and note it found `MEADOW` is only **6 tiles city-wide**, so a meadow vector buys
  almost no pixels. Sky-feedable list is now effectively `VINEYARD` seed-heads alone.
  Recent kinds: 111 Connect · 112 Deepen · 113 Deepen · 114 Polish (reverted) ·
  115 Polish · 116 Polish · 117 Interaction/UX · 118 Polish · 119 Deepen · 120 Deepen · 121 Deepen ·
  122 Interaction/UX — **122 broke Deepen's four-lap run, as the header demanded.**
  **Polish has paid 5 of the last 12; do not open with one**, and Interaction/UX has now paid twice in
  six. The coldest kinds are **Scale** (a
  structural lever, not a lap move) and **New element** (last: 106) — but note 118's finding that a
  *saturated* domain cannot take a New element; pick the domain first (Water, 116) and read its
  row before choosing. **Connect** (last 111) is live and cheap: its trick is to add no new object.
  **Connect paid three times** (109, 111, 112 — 112 logged as
  Deepen, see its entry): its trick was that
  it added no new object — it *closed a gap between two that already existed* (see 109's first finding).
  Note **107 was a New CA rule that
  ADDED NOTHING**: it rewrote a pass that had never fired. *Auditing an existing rule for
  reachability* is a New-CA-rule move available in every domain and it costs no new content — see
  `probe-market.mjs` and the dead-rule law below. (Iter 106 passed on Connect/CA/Scale *for Water*
  and recorded why in its entry: Connect there means a corridor and iter 101's law kills those; a
  Water CA rule would repeat iter 90's dune accretion; Scale is a structural lever, not a lap move.
  That reasoning is Water-specific — the kinds stay cold for **other** domains.)
  Note **Nature × Connect was attempted and reverted three times** (46, 88,
  101) and is the row's graveyard: 46 found it geometrically impossible, 88 found it has no host
  draw-only, 101 found the host *and the land* and lost on **shape**. Do not re-open it as a
  *corridor*. **Cue (e½) is now CLOSED — iter 102 shipped the blob 101 prescribed** (the commons),
  so the interior has its lung; **do not plant a second one.** Nature's remaining cold cells are
  Connect (graveyard — leave it) and Scale.
- **⚠ `peds` CANNOT SERVE THE ROAD NETWORK (iter 111, measured, before writing any code).** A resident
  is leashed to the open cell it is anchored to (`PEDLEASH=2`, and `stepPed`'s comment says that
  constant was tuned to hold street occupancy at ~19%). Only **20–31%** of bus stops have a live ped's
  anchor within a leash — even at radius 5 it is 56–75%. So "residents walk to / wait at / ride the X"
  vectors are structurally capped at ~a quarter of any road-borne host, and would leave the rest
  *emptier* than whatever decoration they replaced. To do it properly you must move the **spawn pool**
  (`openCells` in `syncFleet`), not the leash. Don't rediscover this.
- **PERF BASELINE RE-PINNED 2026-07-10 (iter 105's step-back): day 33.16ms · night 37.33ms.** Still
  valid at iter **111** (pristine-HEAD control that session read day **33.78ms**; the change added
  +0.22ms). Also valid at iter **110**: a pristine-HEAD control read day **33.49ms** / night **37.72ms** (min-of-3),
  and iter 109's read day **33.33ms** / night **37.89ms**. Not re-pinned. The
  stale-baseline warning 104 raised is **resolved** — the old pin (2026-07-09, day 31.33ms) predated
  iters 100–104 and reported ~+6% before your change existed. Do not re-chase it. Still valid at iter
  **117** (pristine-HEAD control, interleaved: day **35.11ms** / night **39.45ms**; the patched file read
  day **34.33** / night **39.22**). Not re-pinned.
  **⚠ 125's step-back gate cried FALSE FAIL (night +16%), and the interleaved control caught it** — exactly
  the "a failing gate nobody trusts is worse than none" scenario. The iter-115 file's *own bytes* read
  **41.3ms night** today vs its recorded 37.3 = **~+10% pure machine load**. Interleaved HEAD-125 vs the
  iter-115 file (min of 3 rounds, A/B/A/B): night **43.06 vs 41.28 (+4.3%)**, day **36.44 vs 38.06 (~flat,
  HEAD faster)** — sample ranges *overlap* (HEAD-night min 43.06 < 115-night max 43.44). So the real
  accumulated cost of iters 116→124 is **~+4% night, day flat** — minor and within noise. **NOT re-pinned**
  (today's load is elevated; re-pinning to 43ms would bake in the load and blind the gate to a real future
  regression). **Night is the one to watch** (118 added per-window lit-pane draws). Grade any future
  step-back FAIL by interleaving against an old commit's file, never by the stored baseline alone.
  **⚠ 117 CORRECTED 99's DIAGNOSTIC.** The old rule read *"a **stable** pass-over-pass offset means code,
  a **rising** one means load."* **The stable half is FALSE**: machine load is autocorrelated over
  minutes, so three passes inside one loaded window are three samples of *one* draw. Iter 117's gate read
  **+25.5 / +26.0 / +26.5%** — perfectly stable — on a diff with **zero draw calls**, and the identical
  bytes read **+3.5%** twenty minutes later. **Never grade frame time by consecutive passes at all.** The
  only sound reading is **interleaved A/B/A/B against pristine HEAD** (swap `solvista.html` between every
  pass, min per variant) — and brace the shell interpolation, because `/tmp/$v117.html` silently measures
  one variant six times. 99's *remedy* (control against pristine HEAD, not the baseline file) stands, and
  "code" may still be earlier iterations' code. Re-pin at a step-back whenever the offset survives an
  interleaved control; `polish-tile` owns the file, so say so in the entry rather than re-pinning silently.
- **`?year=` IS NOW A URL HOOK (iter 108) — the seasons are finally testable.** `window.__setYear`
  had existed since the season pass but was **never wired to the query string**, so no screenshot in
  this loop's history could pin a *calendar* position: `?warp=61` from `year=1974` always lands on
  ~2035.0, i.e. **every shot ever taken of this city was in January.** Now
  `?seed=42&warp=61&year=2035.62` pins high summer. Applied *after* `warp` (warp advances `year`).
  Use `.02 / .30 / .62 / .87` for winter / spring / the golden dry peak / autumn — those are
  `applySeason`'s own keyframes. An unreachable test hook is the same defect class as iter 107's
  unreachable rule: **grep the URL block before assuming a hook you can see is a hook you can use.**
- **`?tide=` IS NOW A URL HOOK (iter 113) — the sea is testable, and every prior shot was a lie about it.**
  Same story as `?year=` one dimension over: `TIDE` runs a ~2 min seeded cycle and **no screenshot in this
  loop's history could pin it.** The default is seeded, not neutral — **`?seed=42` loads at TIDE 0.02, dead
  low water.** `?tide=v` shifts the cycle's *phase* (`__setTide`), so the sea keeps moving from where you put
  it rather than freezing. Use `.02 / .35 / .59 / .98` = low / mid-ebb / **neutral** / high. **`0.59` is the
  pin you want when grading anything ELSE on a marsh**: it sits below the flood-sheen cut (0.60) and at
  `ebb=0`, so the hex body is one flat color and nothing tidal can move.
- **`c.buzz` — the third derived field, after `c.flow` and `c.val` (iter 104, in `tick()`).** How much
  is there to come out FOR, seen from a hex: `ATTRACT.has(c.t)?2:0` plus a count of `ATTRACT`
  neighbours (`COM`/`MARKET`/`CIVIC`/`STADIUM`/`PLAZA`). Pure terrain derivation, no `rng()`,
  recomputed each tick. It is sparse — **mean 0.54–0.59 over standable hexes, and mostly 0** — so a
  rule keyed to it changes behaviour *only* near attractions and is a no-op across the rest of the
  city. Reuse it for anything meaning "somewhere worth standing"; don't hand-roll a second one.
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
- **Traffic flow exists — `c.flow` + `ARTFLOW` (iter 77).** `trafficFlow()` runs each
  tick: trips are generated by developed hexes and drain along the road network to the
  value core, accumulating like a river's drainage tree. `c.flow` is that accumulated
  load; `flow>=ARTFLOW` (64) is an **arterial** (~15% of roads, ~97/city). Unlike `busy`
  (a *local* ≥3-developed-neighbours test that calls a third of the city an avenue),
  flow is a **network** measure — ~200 high-flow roads are not `busy` and vice versa.
  **Bridges come out as the trunks unprompted** (seed 42's global max, 635, is a bridge
  deck), and the spine is connected: 153 of 155 arterial hexes touch another. `__find`
  now answers `'arterial'`. Reuse `c.flow` for anything that should follow the main
  roads — don't hand-roll a second notion of "important street". **Iter 80 is the
  first reuse:** civic forecourts pick the lot fronting the loudest street.
  **⚠ But flow is a bad host for *land use* (iter 82).** `RES→COM` on arterial
  frontage produced 85% **singletons** — by the time a street carries flow its
  frontage is already `COM`/`MID`/`TOWER`, so the houses left to convert are
  scattered. Flow suits *point* decisions (which lot fronts the loudest street) far
  better than *linear* ones (grow a high street). Don't re-try RES→COM on arterials.
- **Institutions now cluster: `MAJORK` / `QUARTER` / `siteQuarter()` (iter 91).** `MAJORK` =
  the five monumental kinds (`hall museum parliament university library`) — it is the shared
  vocabulary for "major institution", used by **both** the civic quarter and the 2020+
  forecourt rule (which previously inlined the same five-way test). `QUARTER` = the three
  that *seek* the quarter (`library museum parliament`, at 1982/1997/2034); services (school,
  police, firehouse, hospital, aquarium, amphitheater, observatory) stay sited by need, and
  `observatory` is deliberately left free to sit at the rim. `siteQuarter()` hugs the nearest
  standing major at `QNEAR..QFAR` = **2–4 hexes** — near enough to share a street, far enough
  to leave one between (adjacency would kill the bunting, which needs a ROAD cell reachable
  from two civics). It falls back to the scattered search when the core is walled in, so
  `civicKinds` never drops. **Two existing systems light up for free:** festival bunting
  (iter 45) roughly **doubles-to-triples** (fete 9→16, 6→18 per city), and downtown builds
  **taller** because three clustered civics choke one COM quorum instead of three.
- **A forecourt is now SHARED, by construction (iter 91).** The 2020+ rule skips a civic with a
  `PLAZA` within 2 hexes, and quarter members sit 2–4 apart — so the quarter gets **one** square,
  not four (`PLAZA 14→10` across the matrix). That is defensible urbanism and was accepted, but
  it is the one place the vector *cost* something. See open cue (d).
- **Open cues, banked by holistic passes (take one when its domain comes up):**
  **(l) a hovered TILE gets no focus ring, only entities do** *(Interaction/UX — banked iter 117)*.
  The ring at L367 is drawn from `stamp()` and keys off `hoverEnt`, which `pickEntity` leaves `null`
  whenever the cursor is over bare ground: iter 71 gave the ring to *stamped entities* only. So every
  tile tooltip in the artifact's history — U2's, 97's coast, 117's woods — names a hex the frame never
  points at, and on a dense grid at fit zoom you cannot tell which hex it means. Two agents noticed
  independently once asked. A hex-outline ring (reuse `hexTile`'s path at `1.02`, stroke, no fill) is
  the obvious shape and it is **draw-per-frame**, so it needs the perf gate — but it is one stroke.
  Beware the false positive: 117's first visual gate *asked* for a tile ring and got a `VISUAL: FAIL`
  for its absence, which is a prompt bug, not evidence the ring is owed. Take this only as its own vector.
  **(k) the open water is the least-resolved third of the frame** *(Water & coast — banked iter 115; the
  STRONGEST cue here, and Water is the stalest domain)*. **Both** day agents at 115's step-back named the sea
  unprompted and independently: *"a large flat teal wedge — no wave detail, reefs, wake trails, or depth
  gradient… it carries a disproportionate share of canvas for how little it resolves"* / *"the entire right
  third is flat teal… compared to the hyper-dense land it reads as dead space."* Two independent agents
  converging with no prompt is the strongest cue signal in this ledger. **Both also called the offshore
  turbines and boats "randomly salted rather than sited"** — so the answer is almost certainly *depth,
  texture or tone in the water field itself*, **not another floating object**. Note iter 106 passed on Water
  × Connect/CA/Scale for reasons recorded in its entry; this is Water × **Polish**, which is untouched by
  that reasoning.
  **(e½) the interior is an edge-to-edge carpet — now DENSITY-ONLY** *(cue (e)'s skyline half was
  **CLOSED by iter 98**; its **palette** half was **CLOSED by iter 99**)* Urban fabric — iter 94's
  holistic agent called the landmass "too uniform… little breathing room between core and edge,"
  and the interior an "edge-to-edge carpet of roads + rooftops with little green breathing room."
  **98 fixed the skyline; 99 fixed the colour; 100 put the first *earned* green in the interior
  (7–10 `QUAD` hexes behind the institutions) — but it did NOT add a lung.** Iter 100's step-back
  agent, reading the whole frame: the interior *"does breathe… but green is fragmented into small
  patches rather than any real district-scale lung,"* and its top recommendation was to
  **consolidate green into one or two district-scale parks/greenways** instead of more scatter.
  That, plus mid-block density, is exactly what remains. Note iter 100 spent −1.03% pop for 23
  cells, so a district-scale park is affordable but not free.
  **Iter 101 attacked this and REVERTED — read its findings before re-trying.** It settled three
  things and cost nothing: (i) **`PARK` is permanent** — nothing in `tick()` consumes one, so green
  planted in `genWorld` survives to 2035, and the "plant it early" host iter 88 hoped for is real;
  (ii) green costs about **0.045% pop per cell** and partly repays it, because `PARK` is the top
  `valueSrc` (0.92) and lifts the frontage it faces (`cafes` +141, `COM` +51); (iii) **the lung must
  be a BLOB, not a ribbon** — a 1–2 hex corridor is untraceable at frame scale whatever its contrast
  (see the law at the top). So: ~50 contiguous cells, **≥3 hexes across**, sited by
  `hexDist(x,y,CBDX,CBDY)`, not by `c.val`. The greenway's flag/tooltip/half-segment path draw and
  its contiguity probe were all correct — only the shape was wrong.
  Heed iter 92 (never zone against `TOWER` near the core: −9.8% pop) **and** iter 98
  (the upgrade probability *saturates*, so leaning on `p` is a weak lever that costs towers at 240
  pop each). A `MID`/`RES` thinning rule, or interior parks, is likelier than anything touching
  towers. **This is the first (e½) move that must change tiles, so it cannot be stream-neutral —
  budget for a few % of chaotic wobble and judge it on the tile histogram.**
  The same agent flagged seed 1234's long straight monorail/cable
  lines as still reading like a "wireframe/UI stroke" — but iters 85/87 closed that with two
  agents each, so treat this as one un-zoomed opinion, **not** a reopening of cue (c).
  **(g) THIRTEEN lines / SIXTEEN seedless `hashCell` calls remain** — **iter 103's audit grep undercounted,
  and iter 113 corrected it.** The old pattern
  (`grep -nE 'hashCell\([^)]*,[[:space:]]*(0x)?[0-9]+\)' … | grep -v seedNum`) matches only a **bare integer**
  salt, so every `k+90` / `j+40` / `r*3+cc+50` form was invisible to it — including **two of the marsh's own
  three offenders.** Use the superset:
  `grep -noE 'hashCell\([^;]{0,60}' solvista.html | grep -v seedNum` (then discard the L182 definition and
  genWorld's L510/511/523, which pass the real `seed`). Each survivor is a function of `(x,y[,j])` alone, so
  it paints the identical pattern in every city. Two stakes, and **only the first is an invariant breach
  worth a vector**:
  - **Presence decisions** (something is there, or isn't, in the same place in every city):
    **L2747** `hashCell(x,y,77)<0.28` — which surf cells catch the city's light-smear at night.
  - **Ornament jitter** (a detail's lean/length/brightness, not its existence): kelp sway **L2799**,
    palm fronds **L2832 ×2 / L2834 ×2**, orchard fruit **L3248/3249**, **park fireflies L3423 ×2**
    (identical firefly positions in every city), **L3610/3613**, **L5113/5117**.
    The marsh reed tufts were **CLOSED by iter 113** (and its lean salt `hashCell(x,j,7)` took no `y`, so
    every marsh hex in a column leaned identically). The tower window-lights
    (`hashCell(x,z|0,3|5|9|13)` — every city's towers lit identically at night, the *most visible*
    of the class) were **CLOSED by iter 110**, folded into its TOWER Polish; they now mix `seedNum`.
  Note `darkWinR` is **not** a breach: it takes a literal `salt` argument but mixes `seedNum^salt`
  internally — check the callee before indicting a call site. And when you fix a range, **space the bases**:
  `0x9EE1+j` / `0x9EE2+j` / `0x9EE3` collide at `j=2` (iter 113).
  **(i) the marsh reeds do not read, and that is a `polish-tile` job** *(banked by iter 113, Water)* —
  the reed calendar shipped in 113 is wired and measurable, but the reeds are **seven sub-pixel strokes
  huddled around the pool**, so the hex reads as "green hex with a pool" and the calendar is invisible at
  fit zoom. (Verified by marking them magenta — see 113's findings; the striking pale figure on a marsh
  hex is a **heron**, not a reed.) Spreading/lengthening them is a tile redesign, out of scope for a
  growth lap, and it would pay off immediately because the seasonal color is already computed.
  **(d) the civic quarter deserves a real square — STILL OPEN, BUT ITS PRESCRIPTION IS DEAD**
  *(banked by iter 91; attempted and **reverted** by iter 114, Civic × Polish — read 114 before re-trying)*.
  The goal is confirmed and **measured**: every `PLAZA` patch in every seed is exactly **one hex**
  (`[1,1,1]/[1,1]/[1,1,1]`), so the quarter is a knot of pale domes each hugging its own private
  forecourt — and a throwaway build proved a **3-hex square is beautiful and legible at fit zoom**
  (both agents, 2 seeds), where iter 101's 1-hex ribbon was not. **Minimum viable size is 3**; a
  2-hex square sits on the edge of 101's contrast×width law.
  What is dead is 91's *implementation*: "annex an adjoining `FORECOURT_LOT`". **There is no such
  lot.** A forecourt is sited to front the loudest street, so it is a **road junction** — of the 6
  quarter-member heads' 36 neighbour slots, **ROAD 16 (44%)**, pavable lot **2 (5.6%)**, of which
  **one** fronts a street. Iter 100's `QUAD` grounds pass eats the back lot besides. The rule fired
  **zero** times in three cities. Do not "fix" this by loosening the gate — with the gate at 1.0 it
  fires **once, in one city, on one institution.**
  So: **the square must take the ROAD**, which is also the honest reading of iter 100 (the cell
  between two majors *is* the street they both front — pedestrianise it). Two things a taker must
  carry: (i) a **demote-on-merge** step — a per-head size cap does **not** stop two squares joining,
  and iter 114's throwaway produced a 5-hex patch with **two centrepieces**; (ii) the **hazard list**
  in 114's findings — cars are provably safe, but trams/monorail draw along roads, and `c.stop`,
  `c.bridge`, `c.flow`/`ARTFLOW`, `frontSide()`, boulevard trees and `c.hstr` all read `ROAD` and are
  unaudited. `roads` is a **core** census metric. Budget a lap for the audit; don't do it on the side.
- **Reach maps exist — reuse them (U5):** `reachFill(out, r, isSrc)` is a
  multi-source hex BFS capped at radius `r`, walking over land only (`WETSET` blocks
  water/marsh/kelp), filling `out` with steps-to-nearest-source and 255 for "farther
  than r". `recount()` already runs four per tick (transit / green / shop / service).
  Any "how far is X from Y" question should call it rather than hand-rolling a flood
  fill. Cost is ~1ms per `recount()`, which is per *tick*, not per frame.
- **⚠ Three census stats can FALL, by design (U5):** `walkPct`, `transitPct` and
  `solarPct` are shares of residents/roofs, not counts. Green space and shops
  saturate >90% on their own, so **services are walkable's binding constraint** — a
  tower lap that adds residents without civics will *drop* `walkPct`, and that is
  the stat working, not a regression. Judge them by whether the city earned the
  change, not by "up = good". `density` (residents per developed hex) rises with
  intensification and falls with sprawl.
---

<!-- rotated -->

> **Archive:** the 118 entries before Iteration 116 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

## Iteration 116 — the sea gets a bottom (2026-07-10)

**Vector.** Water & coast × Polish. The stalest domain (106/113), cashing **banked cue (k)** — the
strongest signal in this ledger, two independent day agents at 115's step-back naming the open sea
unprompted: *"a large flat teal wedge — no wave detail, reefs, wake trails, or depth gradient"* and
*"the entire right third is flat teal… it reads as dead space."* Both also called the scattered
offshore objects *"randomly salted rather than sited"*, so the cue prescribed **depth/texture in the
water field, not another floating object.** That prescription was taken literally: this vector adds
**no new object, no tile type, no entity, no CA pass.**

**Change.** The sea was drawn `hexTile(gx,gy,1.02,col('water',1))` — one constant, every hex, since
the artifact began.
- **`rDeep` — a new derived field, and `rSea`'s exact mirror.** `rSea` floods *from* wet cells *into*
  land (the fog's gate); `seaFill()` floods **from land into water**. So a hex's value is its true
  distance offshore: it bends around headlands, keeps the harbor and the bay shallow, and never lets
  the river run deep — **all three for free, from one BFS, with no special-casing.** Filled beside
  `reachFill(rSea,…)` at tick cadence. Uncapped, deliberately: a cell left at 0 would read as *shoal*,
  not as far-offshore (the capped first draft did exactly that).
- `seaT` caches the drawn tone (eighths) alongside the depth, so the two-octave `hashCell` seabed is
  computed **once per tick, not once per hex per frame**.
- `colMix(n1,n2,t,f)` — a tinted blend of two palette colors, sharing `col()`'s cache. New, reusable.
- Tooltip: open water now prints **`Depth: Shoals / Coastal shelf / Open water / Deep water`**, beside
  the live `Tide` iter 97 gave it. The draw shows the field; the hover names it.

**The tuning failure, which is the transferable part.** The first build blended `water→waterDk` and
darkened the sea's mean luminance **153.4 → 139.8 (−8.9%)**. Every gate would have shipped it: census
flat, and three visual agents would have called a darker sea *"moody"*. **That is the kelp failure mode
exactly** — a third of the canvas, drifted dark, one iteration at a time. Two causes, both worth knowing:
- **A clamped depth ramp is not a centered one.** `DEEPR=9` against a measured **mean depth of 6.6**
  (range 1..19) pinned most of the sea at *fully deep*. Measure the field's distribution **before**
  choosing the constant that normalizes it; `DEEPR=10` puts mean tone on 0.50.
- **Hold the mean by CONSTRUCTION, not by tuning** (iter 98's law, applied to a surface). Rather than
  blend `water→waterDk` and hand-tune a brightness ramp back up, place the two endpoints
  **symmetrically about `water`**: `waterSh/waterDp = water ± 0.8·(water−waterDk)`. Their midpoint *is*
  `water`, so at mean tone 0.5 the mean is unchanged **algebraically** — only the variance can grow.
  Result: mean **153.4 → 152.4 (−0.62%)**, spread **6.8 → 19.1 (×2.8)**. `waterDp` is kept a shade
  lighter than `waterDk` so the kelp beds stay the darkest thing inshore.

**Census.** PASS. `pop 154918→154915 (−3)`, `roads +0`, `developed +0`, tile histogram **empty**, every
entity count identical. Exactly as predicted before running it: `grep -n rDeep` returns one writer and
only draw-side readers, so by iter 115's single-reader law the vector **could not** perturb the seeded
stream. The `−3` pop / `+1` greenRoof are iter 108's documented load-dependent salt jitter, not this change.

**Probe.** `probe-seatone.mjs` (**`git add -f`'d**, per iter 101). Samples the real canvas at every
open-sea hex centre (3×3 disc) and joins the **live** `rDeep` via a new `window.__deep` hook — it grades
the tone against the field that picks it rather than reimplementing `seaTone()` (iter 110's law).
Pristine control is `git show HEAD:solvista.html`, **never `git stash`** (iter 108).

| seed | n | mean lum | spread (sd) | corr(lum, depth) |
| --- | --- | --- | --- | --- |
| 7 | 644 | 153.5 → 151.8 | 8.22 → 19.81 | **−0.874** |
| 42 | 655 | 153.3 → 153.1 | 5.72 → 18.71 | **−0.903** |
| 1234 | 662 | 153.2 → 152.3 | 6.14 → 18.71 | **−0.897** |

**Visual.** 3/3 PASS across 6 frames — seed 42 + seed 7 (wide + `coast` clip), **seed 42 at night**, and
seed 1234 at **high tide** in spring. Agents independently and unprompted confirmed the two things the
BFS was supposed to buy and that no probe can see: the gradient *"bends correctly around the
pier/headland and the harbor"* and *"stays shallow up the river."* No banding, no contour lines, no
blocky patches, no hex seams. Night: *"deep desaturated navy, not a dead black void… stays distinctly
bluer than the night sky, so the horizon separation holds."*

**Perf.** PASS, and **perf-neutral**. Min-of-3, patched: day **34.61ms** / night **39.11ms**. But the
absolute numbers rose between batches, so per the ledger's law a rising offset was controlled against
**pristine HEAD under the same load, measured immediately after**: day **33.89ms** / night **38.55ms**.
The +0.72ms residual is *smaller than pristine's own 1.05ms drift within its own batch* — noise, not code.
Baseline **not** re-pinned. Caching `seaT` at tick cadence is what keeps this flat: the per-frame draw is
still exactly one `hexTile` fill, now from a 9-entry color cache.

**Verdict — SHIPPED.** Cue (k) is **CLOSED**: the sea has a bottom. Note what it did *not* cost —
no tile type, no entity, no `rng()` draw, `pop` provably flat before a gate was run.

**Findings for later laps.**
- **⚠ HOLD A SURFACE'S MEAN BY GEOMETRY, NOT BY A BRIGHTNESS RAMP (new; iter 98's law, generalized).**
  To add contrast to a large surface without drifting its tone, do **not** blend `base→dark` and correct
  with a per-step brightness factor — that is a two-parameter fit you will tune against a probe until it
  passes. Place the endpoints **symmetrically about the original color** (`base ± A·(base−dark)`) and the
  mean holds *algebraically*, for any amplitude `A`, with `f=1` at every step. One free knob (`A`), zero
  fitting, and the cache stays tiny. This applies to any future re-tone of the sky, the forest, or the roofs.
- **⚠ NORMALIZE A FIELD BY ITS MEASURED DISTRIBUTION, NOT BY ITS NAME (new).** `DEEPR` looks like "how
  deep the deep is" and invites a guessed constant. It is really *the divisor that decides where the mean
  lands*, and a wrong guess saturated 60% of the sea against the clamp — a **−8.9%** mean shift, invisible
  to census and flattering to agents. **Histogram the field first** (`/tmp/dhist.mjs` shape: `__deep()` →
  bin by `d`), then solve for the constant. Any future `(v−a)/K` tone map has this trap.
- **`rSea` HAD A MIRROR NOBODY HAD WRITTEN (new).** The BFS that measures "how far inland am I" run
  backwards measures "how far offshore am I", and *the second one respects every piece of coastal geometry
  the first one does* — headlands, harbors, the bay, the river — because it is the same flood. Before
  hand-rolling a distance heuristic (`x − shoreAt(y)` was the obvious wrong answer: it ignores headlands
  and would have run the **river** to full depth), check whether an existing `reachFill` inverts.
  `reachFill()` itself could **not** be reused — it hardcodes `WETSET.has → skip` as its wall.
- **`window.__deep` IS A PERMANENT HOOK** — every wet hex with `{x,y,d,tone,riv,sx,sy}`. Use it for any
  "does this tone/entity/rule follow depth?" claim, and as the histogram source for the law above.
- **THE OFFSHORE OBJECTS ARE STILL "RANDOMLY SALTED" — cue (k) closed only the *field* half** *(Water &
  coast)*. Both 115 agents said it; this lap answered the tone and left the siting. **Now there is a field
  to site them against**: turbines belong on the `Coastal shelf` (`rDeep` 3–5, where they are actually
  founded), not scattered into `Deep water`. `turbSet` is laid in `genWorld` from `hashCell` — gate it on
  `rDeep` and the wind farm sites itself. Cheap, draw-adjacent, and it makes the new field *mean* something.

## Iteration 117 — the woods keep books nobody could read

**Vector.** Nature × **Interaction/UX**. Nature was the stalest domain (last touched 108) and its
Interaction/UX cell was **empty**; Interaction/UX was a cold kind (last 105) while the header warned
Polish had paid 4 of the last 7 and Deepen 3 of the last 9. The tell the header prescribes for a
gap-closing vector — *"look for the seam only where a tooltip/label already ASSERTS a relationship the
draw ignores"* — is met exactly here: `TILEDESC[REDWOOD]` says **"Old-growth redwoods"** and
`TILEDESC[MEADOW]` says **"Wild grass and wildflowers"**, and the CA has always tracked `c.age`,
`c.fire`, `c.bloom` and `c.shroom` per cell while `describeTile` printed **`Value` and nothing else**.

**Change.** Hovering a woodland or meadow hex now reports the state the diorama was already
simulating. In the 105 lineage (a thing's interest is its *membership*, computed live):
- **`Stand — N hexes`** on FOREST/REDWOOD: the contiguous wood it belongs to, flood-filled on hover.
- **`Canopy — Closed / Thickening / Open edge`** on FOREST, read from the **same `k`** the draw uses to
  decide scrub-at-the-edge and the 3rd/4th tree.
- **`Undisturbed — ~N yr`** on FOREST; **`Old growth since <year>`** on REDWOOD.
- **`Deep woods — sheltered enough for old growth`** when the succession precondition holds.
- **`Mushrooms up`** (`c.shroom>0`), **`Burning`** (`c.fire>0`), and on MEADOW
  **`Wildflowers — In bloom / Gone over / Not in flower`** (`c.bloom`, live like `Tide`).
- `T.BURNT` gained the `TILEDESC` it never had, plus `Burnt — ~N yr ago`.

Three inline predicates were extracted so one definition has all readers (iter 112's `stopQueue`
shape): `isWood`, `canopyK(x,y)` (draw + tooltip), `deepWoods(x,y)` (`tick()`'s old-growth pass +
tooltip). **No draw code was added.** `git diff` contains *zero* lines with a `ctx.`/`fillRect`/
`hexTile`/`col(` call.

**Census.** `VERDICT: PASS`, exit 0, pageerrors 0. `pop 154915 → 154911 (−4, −0.003%)`, `roads +0`,
`developed +0`, **tile histogram empty**. Exactly right: no terrain write, no `rng()` draw, no new
`hashCell`. The ±4 is iter 108's load-jitter (`(year*23)|0` salts), not the feature — a first census
run on the same code read `pop +0 / greenRoofs −1`, the second `pop −4 / towerHt −1`.

**Probes.** `probe-woods.mjs` (**`git add -f`'d**) hovers real tiles via `__find`'s screen coords,
scrapes `#tip`, and checks every claim against ground truth — including an **independent Node-side
flood fill** of the stands, so the tooltip's `Stand` number is graded by different code than produces
it. **415 wood hexes across seeds 7/42/99/1234/3: 0 disagreements.** Canopy tiers spread on every seed
(seed 42: Closed 24 / Thickening 28 / Open edge 17). `shot-woods.mjs` (**`git add -f`'d**) is the tile
analogue of `hovershot.mjs`, which can only aim at entities.

**Visual.** 2 seeds × (redwood + forest + meadow hover, zoom 4) + un-zoomed whole city.
Seed 1234 `VISUAL: PASS`. Seed 42 first returned `VISUAL: FAIL` on **two claims, both wrong** — see
findings. Re-shot with a corrected prompt: `VISUAL: PASS`. Both agents independently called the
whole-city frame balanced and the woodland stands coherent.

**Perf.** Interleaved A/B against pristine HEAD, min-of-3: patched **day 34.33ms / night 39.22ms**,
pristine **day 35.11ms / night 39.45ms**. The patched file is marginally *faster* (sharing one
`isWood` arrow removes a per-hex closure allocation in `countAround`). Baseline **not re-pinned**.

**Verdict — SHIPPED.** The oldest CA in the artifact finally says what it has been computing since
1974. Zero pixels, zero tiles, zero pop.

### Findings

- **⚠ A STABLE PASS-OVER-PASS OFFSET DOES *NOT* MEAN CODE — it means the load was stable too (iter 117
  corrects iter 99's law).** 99 taught: *"a **stable** pass-over-pass offset means code, a **rising** one
  means load."* The perf gate here read **+25.5% / +26.0% / +26.5%** day across three passes — textbook
  "stable ⇒ code" — and it was **pure load**. Minutes later the **identical bytes** read day
  **34.2/35.0/35.3ms** instead of **41.6/41.8/41.9ms**. Load on a shared machine is *autocorrelated over
  minutes*, so three passes inside one loaded window are three samples of one draw, not three draws.
  **Three consecutive passes are not an independent control at any spread.** The only sound reading is
  **interleaved A/B/A/B against pristine HEAD** — swap the file between every pass, take the min per
  variant. 99's own remedy (control against pristine HEAD) was right; its *diagnostic* was wrong and
  would have sent this iteration hunting a nonexistent +26% regression in a diff containing no draw calls.
- **⚠ `for v in patched pristine; do cp /tmp/$v117.html …` SILENTLY MEASURES ONE VARIANT SIX TIMES.**
  `$v117` parses as the variable `v117`, not `${v}117` — every `cp` failed, `solvista.html` was never
  swapped, and the A/B printed six plausible, subtly-different numbers for the *same file*. It looked
  like a clean result. Brace your interpolations, and **make the swap fail loudly** (`|| exit 1`);
  a perf harness that silently compares a thing to itself is worse than no harness. (The accident is
  what exposed the load finding above, but only because the numbers disagreed with the earlier window.)
- **⚠ A LEADING QUESTION IN THE VISUAL PROMPT MANUFACTURES A `VISUAL: FAIL`.** I asked the agents
  *"does the tile under the cursor visibly show a focus/hover ring?"* — a feature that **has never
  existed for tiles**. The ring at L367 keys off `hoverEnt`, which `pickEntity` sets to `null` on a bare
  tile; iter 71 gave the ring to *stamped entities* only. Seed 42's agent dutifully failed the gate on
  its absence. **The gate can only answer questions about what is in the frame; a prompt that presumes a
  feature will get that feature reported as missing, or hallucinated as present.** Re-prompted without
  the presumption, the same PNGs passed.
- **⚠ AND THE SAME AGENT'S "STRAY FLOATING SPRITES" WERE 4×-MAGNIFIED WILDFLOWERS — measured, per iter
  106.** Seed 42 reported *"small floating orange+purple squares … a minor z-order/floating-tile
  artifact"*; seed 1234, on the same change, reported *"no z-order tears, no floating tiles."* Two agents
  in direct contradiction ⇒ settle it with a number (iter 108). `probe-fleck.mjs` counted pixels matching
  `col('gold',1.1)` = **rgb(255,174,59)** and `col('lav',1.05)` = **rgb(189,153,191)** on a frozen,
  un-hovered canvas: **pristine HEAD gold 11 px / lav 11 px, patched gold 11 / lav 10** — and **272
  `EMPTY` lots** request a fleck (`default:` draw case, `c.age>12 && c.v<0.2`). They are the succession
  wildflowers that have always been there, resolved into squares by the camera. **At zoom ≥4 every 1–2 px
  ornament in this artifact becomes a square, and an agent will call squares an artifact.** Say so in the
  prompt, or shoot the hover at zoom ≤2.
- **A PIXEL DIFF CANNOT VALIDATE A REFACTOR HERE — but a NUMERIC one can, and it is strictly better.**
  PNG bytes of pristine vs patched differ; so do **pristine vs pristine** (entities move during the
  1.2 s load, iter 111's ~14%-of-canvas law), so byte-equality is not a test. Instead, prove the
  *extracted predicate* equals the *inline expression it replaced*, in-page, over the whole grid:
  `canopyK(x,y) === countAround(x,y,1,n=>n.t===T.FOREST||n.t===T.REDWOOD)` and the same for `deepWoods`.
  **0 mismatches over 3367 in-bounds cells × 2 seeds.** That, plus a `git diff` containing no `ctx.` line,
  proves the frame is unchanged *by construction* — no screenshot required. **Reach for this whenever a
  lap extracts a predicate; it is cheaper, decisive, and immune to entity motion.**
- **`deepWoods` on FOREST is an EARLY row, not a dead one — a third case for iter 108's triage.** 108
  divided ~0-reading rules into *dead* (`MARKET`, unreachable), *late* (`GARDEN`, gated `year>=2008`) and
  *transient* (`BURNT`, `age>6`). This is the mirror of *late*: measured on seed 42, forest hexes passing
  `deepWoods` go **11 (1985) → 6 (2005) → 0 (2035)** — not because the rule starves, but because the deep
  hexes **mature away into `REDWOOD`**. A snapshot at the census's newest era reads 0 and looks dead. The
  page loads at `year=1974` and runs forward, so the row is alive exactly where a *user* is. **Before
  deleting a row that reads 0 at 2035, check whether its host is being consumed by a downstream rule.**
- **`c.age` MEANS "since last turnover", AND `genWorld` STARTS EVERY CELL AT `age:0`.** The first draft
  labelled the forest row `Regrown ~61 yr ago`, which is a **lie about the woods that never turned over**:
  61 yr is simply the age of the world (1974→2035), and an original `genWorld` forest hex has never
  regrown. Relabelled `Undisturbed ~N yr`, which is true whether the hex is primeval, logged-and-regrown,
  or newly matured — all three reset `age`. Any future vector printing `c.age` on a *natural* tile has
  this trap; `describeTile`'s own `est` comment ("age dates the CURRENT structure") only ever contemplated
  buildings.
- **VERIFY A CONDITIONAL ROW BY *INJECTING* ITS STATE — the CA's own luck is not a test.** `Mushrooms up`,
  `Burning`, `In bloom` and `Gone over` never fired under `__warp`: blooms are seeded by **rain clouds**,
  and clouds are advanced in `frame()`, not `tick()`, so **no amount of warping ever rains**; mushrooms
  live 3 ticks inside a `year%1 ∈ (0.76,0.98)` window. `?year=` + hand-driven `tick()`s still produced
  0 of each. What iter 117 ships is the **state→row mapping**, not the CA — so set `c.bloom=7` /
  `c.shroom=3` / `c.fire=3` on a known on-screen hex, `render()`, hover, and assert the row appears
  (4/4 ok). **A row you cannot make fire is a row you have not tested**, and reaching for a rarer seed or
  a longer warp is the slow way to not test it.
- **NEXT.** Cue **(k)'s siting half** is still the cheapest good vector on the board (gate `turbSet` on
  `rDeep` 3–5 so the wind farm sites itself on the coastal shelf) — but Water was 116 and Nature is now
  117, so it wants **Urban (110)**, **People (111)** or **Transport (112)** first by rotation. New cue
  **(l)** below. **Iteration 120 remains the holistic step-back**, and must be shot at night as well as day.

## Iteration 118 — the windows stop being stripes (2026-07-10)

**Vector.** Urban fabric × **Polish**, cashing **banked cue (j)**. Urban was the stalest domain (110)
and the header's steer was *"the coldest kind is New element"* — I did not take it, and the reason is
the more useful half of this entry. Before designing anything I grepped the Urban draw for what is
already there: **tower cranes (two of them), rooftop helipads, aviation masts, glass skybridges, brick
loft conversions, solar roofs, green roofs, roof gardens, stepped terraces, neon sign bands, chimney
smoke, retail podia, 4 forms × 5 bodies = 20 tower looks.** Urban's additive moves are *spent*, which
is exactly the saturation condition SKILL.md says to answer by changing the **kind**, not the domain.
Against that, cue (j) is a defect **two independent holistic agents named unprompted** (iters 94, 115).
A banked, twice-observed visual defect in the stalest domain outranks kind-rotation, and 120 is the
next holistic step-back — which 115 ruled must be shot **at night**. Fix it before it is graded.

**Change.** One function replaces a pair, at all **8** facade-band sites (RES · MID · COM · TOWER×4 styles).
- The old band was `bandR(…colLit('glass'…))` — a continuous glowing ribbon across the whole face —
  followed by `darkWinR`, which punched **one** notch, into only 64% of faces. The ribbon was the
  dominant mark; that *is* the stripe noise, and it had been the shape of every lit facade since the
  artifact began.
- `winBandR` draws **only the lit panes**, in one path, and lets the prism's **own wall** stand between
  them. That is what a mullion is. A pane nobody is home in is simply *not drawn*. `n` = `round(X/hb)`
  clamped 2..4 keeps panes roughly square at any band height, from a RES window strip to a ziggurat setback.
- `colWin(f,litMix,a,k)` — new, cached exactly like `colLit`. Lifts the surviving panes so the band's
  **mean tone is held by construction** (iter 116), never tuned back afterwards.
- `darkWinR` deleted. Night-only: below `LITAMT<0.35` the day frame draws the band it always drew.

**Census.** PASS. `pop 154918→154915 (−3)`, **every other metric exactly +0**, tile histogram **empty**,
every entity count identical. Predicted before running: the vector touches no `rng()`, no terrain, no
`hashCell` a rule reads — it cannot perturb the seeded stream. The `−3` is iter 108's documented
load-dependent `(year*23)` salt jitter.

**Probe.** `probe-winband.mjs` (**`git add -f`'d**). Frozen instant (`playing=false`), pristine side is
`git show HEAD:solvista.html`, never `git stash` (iter 108). Samples each `__twr()` tower's facade box.

| seed | mean lum (tone held?) | \|dI/dx\| (windows, not stripes?) | \|dI/dy\| |
| --- | --- | --- | --- |
| 7 | 88.0 → 89.9 (**+2.1%**) | 11.57 → 15.93 (**+37.8%**) | +2.2% |
| 42 | 90.0 → 91.6 (**+1.8%**) | 11.71 → 16.97 (**+45.0%**) | +2.8% |
| 1234 | 86.0 → 88.2 (**+2.6%**) | 10.91 → 15.45 (**+41.6%**) | +4.8% |

Day control: **0.0% on every column, all three seeds** — the `LITAMT` short-circuit, falsified rather
than asserted.

**Perf.** PASS. Interleaved A/B/A/B vs pristine HEAD ×3 (iter 117's law), min per variant: day
**identical** (34.89 vs 34.89), night **39.22 → 41.22ms = +5.1%**. Against the 37.33ms pin that is
+10.4%, inside the 15% tolerance; pristine itself read 39.22 under the same load, so the offset is
earlier iterations' code and the load of the hour, not this vector. Baseline **not** re-pinned
(`polish-tile` owns it).

**Visual.** 2/2 PASS, seeds 42 and 7, wide + `downtown` clip, **at night** (`t=0.88`). Both agents,
independently: the panes read as *"a grid of windows"* / *"vertical stacks of separated yellow
rectangles… the old continuous-ribbon stripe noise is gone"*; no seams between adjacent panes, no
clipped-white windows, no z-order tears; downtown *"about right — bright enough to be the focal point
without blowing out."* Seed 7's agent added, unprompted: *"the discrete panes actually **reduce** the
former glare/clutter."*

**Verdict — SHIPPED.** Cue **(j) is CLOSED**. It cost no tile type, no entity, no `rng()` draw, and
the day frame is byte-identical.

**Findings for later laps.**
- **⚠ HOLD THE MEAN OF WHAT WAS ON SCREEN, NOT OF THE IDEALIZATION YOU REPLACED (new; extends iter 116).**
  The first build solved `(1-a)v + a·dk == lm` — hold the mean of the *solid ribbon* — and came out
  **+5.1 / +4.5 / +5.6% BRIGHTER** on the three seeds. Cause: the band it replaced was never the solid
  ribbon; it already had a notch punched in it, so it was ~10% dark. Compensating to the idealization
  over-brightens by exactly that notch. Carry the pristine dark share `k` into the solve —
  `(1-a)v + a·dk == (1-k)·lm + k·dk` — and `k=a` leaves the colour untouched while `k=0` recovers the
  naive lift. **Before compensating for what you remove, measure what was already missing.**
- **⚠ ON CANVAS THE COST IS THE RASTER, NOT THE `fill()` CALL — and BATCHING MADE IT WORSE (new).**
  Measured, on the night frame, against pristine: build every quad and never fill → **+0.8%**. Fill one
  token quad per building → **+0.0%**. Fill ~5 extra anti-aliased *sheared* quads per band → **+14%**.
  Then the obvious optimisation — queue every dark quad and flush **one** path per building — went to
  **+14.9%**, i.e. *worse*, because a many-subpath path rasterizes across its whole bounding box. Fill
  calls are free; **filled area and anti-aliased edges are not.** Do not reach for path batching to fix
  a canvas perf problem. Reach for **drawing less**: the fix that landed at +5.1% was to stop painting a
  ribbon and punching it, and instead paint only the lit panes, letting the wall that was *already
  drawn* be the mullion. This is iter 109's connector law in another costume — **a mullion you have to
  draw is a mullion you got wrong.**
- **⚠ GIVE EVERY PERF COMPARISON AN IN-RUN INVARIANT COLUMN (new; sharpens iter 117).** This change is
  night-only and *provably* leaves the day frame byte-identical, so `perf.mjs`'s **`day` column is a
  free load detector**: any pass where `day` moves is a loaded pass whose `night` cannot be read. It
  caught a reading of day **41.22ms** / night **48.78ms** — both garbage — that in isolation looked like
  a catastrophic regression and would have killed a good vector. 117 said *never grade frame time by
  consecutive passes*; the constructive form is **arrange for one column that must not move**, and throw
  out any pass where it does. Most vectors can find one (a scene, a seed, an era the change cannot reach).
- **`probe-winband.mjs` IS THE INSTRUMENT FOR "did this surface change STRUCTURE without changing TONE?"**
  Mean luminance answers tone; **mean |dI/dx| vs |dI/dy| answers structure** — a ribbon has almost no
  horizontal gradient, panes have a lot. *"Reads as windows, not stripes"* is thereby a number. No visual
  agent can settle that claim (iter 108) and the census is blind to it. Adapt it for any future re-tone
  or re-texture of a large repeated surface (roofs, hulls, the sky).
- **URBAN FABRIC'S ADDITIVE INVENTORY, so nobody re-proposes it** *(the iter-34 beach-towel lesson)*.
  Already drawn: tower cranes on rising civics **and** rising towers, rooftop helipads (+copters), aviation
  masts, glass skybridges between adjacent towers, brick loft conversions with arts-district sign bands,
  solar roofs, green roofs, roof gardens, stacked terraces, ziggurat gold trim, neon sign bands, sawtooth
  warehouses with working stacks, chimney smoke, retail podia under towers. **`GROWTH.md` is the loop's
  memory, not the artifact's inventory** — grep the draw case before designing an Urban element.

## Iteration 119 — the residents move downtown (2026-07-10)

**Vector.** People & activity × **Deepen**. People was the stalest domain (111) and the header steered
away from Polish (5 of the last 9). Iter 111 had already *measured* and banked the vector: residents
structurally cannot serve the road network, *"to do it properly you must move the **spawn pool**
(`openCells` in `syncFleet`), not the leash."* Nobody had measured what moving it buys, or costs.
It adds no new object, no tile, no `rng()` draw — the Connect trick applied to a system, not a pair.

**What the probe found before a line was written** (`probe-anchor.mjs`, `git add -f`'d):
- `openCells` is **54% coastline by area** (BEACH+DUNE+SHOREPARK), so a uniform draw houses the
  population at the seaside. Seed 7 anchors **81 of 130 residents on sand and exactly 4 downtown**
  (3 MARKET, 1 QUAD) — across **6075 developed cells and 5786 roads**. The city Solvista builds is
  not the city its people live in.
- The crowd is also a **fossil**: `syncFleet` is called from `tick()` (L1758), so peds spawn
  progressively as the city grows and **never re-site**. A resident anchored to the 1985 beach is
  still on it in 2035.
- The probe reproduces 111's headline number exactly (stopCov **25.0 / 31.3 / 20.0%** vs its
  "20–31%"), which is what licenses trusting its other columns.

**Change.** Two edits, one idea: *an anchor is the cell a resident lives on.*
- `syncFleet` builds `kerbCells` beside `openCells` — ROAD, not a bridge, `buzz>=KERBBUZZ(2)`. That is
  buzz's sparse tail (~110 hexes against ~510 of open ground): a kerb fronting shops or institutions.
  Residents draw from `openCells.concat(kerbCells)`; **dogs keep the open-ground pool**, since an owned
  dog heels to its human and reaches the kerb through them while a stray keeps `stepDog`'s park roam.
- `stepPed`'s re-anchor test `strollable` → `homeGround` = `strollable || livelyKerb`.

**Census.** PASS. `pop 154918→154915 (−3)`, **every other metric exactly +0**, tile histogram **empty**,
`dogs 90` identical. Predicted before running: peds draw the same *number* of `rng()` values from a
longer array, so no seeded draw downstream (dogs, boats, birds, shuttles) moves. The `−3` is iter 108's
documented load-dependent `(year*23)` salt jitter.

**Probe.** Pristine side is `git show HEAD:solvista.html`, never `git stash` (iter 108).

| seed | coast% | kerb% | stopCov | anchorBuzz | street% *open-ground residents* |
| --- | --- | --- | --- | --- | --- |
| 7 | 62.3 → **51.5** | 0 → **17.7** | 29.2 → **50.0** | 0.292 → **0.685** | 20.0 → 19.6 |
| 42 | 66.9 → **47.7** | 0 → **14.6** | 31.3 → **53.1** | 0.292 → **0.577** | 19.1 → 24.2 |
| 1234 | 69.2 → **56.2** | 0 → **16.9** | 20.0 → **36.7** | 0.231 → **0.562** | 21.4 → 19.4 |

Kerb residents stand on their own street 76.0 / 77.8 / 82.6% of the time. **111's structural cap on
bus-stop coverage is broken: it roughly doubles.**

**Perf.** PASS. Interleaved A/B/A/B vs pristine HEAD (iter 117's law), min per variant: day
**33.78 → 34.01ms (+0.7%)**, night **39.89 → 40.00ms (+0.3%)**. Zero draw calls added — entity counts
are identical — so the only cost is one predicate in `stepPed`. Pristine itself read night +6.9% against
the 37.33ms pin under this load, so that offset is earlier code, not this vector. Not re-pinned
(`polish-tile` owns the file).

**Visual.** 2/2 PASS, seeds 42 and 7, `wide` + `downtown` clip, `&step=300` so the crowd is at its
*settled* distribution rather than its spawn state. Both agents independently: pedestrians stand at the
kerb **edges** of road hexes, "not centered in the traffic lane or sunk into buildings"; no z-order
tears, no blown-out colour; and — asked specifically — **the beach is still well populated**, consistent
with a ~15% reduction rather than an emptying.

**Verdict — SHIPPED (DEEPENED).**

**Findings for later laps.**
- **⚠ A SPAWN POOL AND ITS RE-ENTRY TEST ARE TWO READERS OF ONE PREDICATE (new; extends iter 112's law).**
  The pool said *"open ground **or** a lively kerb"*; `stepPed`'s re-anchor still said *"open ground"*.
  That asymmetry is a **one-way ratchet** — open ground captures a kerb resident and never gives one
  back — and it silently ate the entire feature: kerb residents decayed **10.0% → 3.8%** (seed 7),
  10.0 → 4.6 (42), 6.2 → 2.3 (1234), **monotone**, over 20 sim-minutes. Symmetric (`homeGround`), the
  flow runs both ways and mean-reverts: over **80** sim-minutes it wanders 11–26% with no collapse and
  no runaway. 112 said *grep for a predicate's other readers*; the sharper form is **a pool is a
  predicate, and whatever lets an agent RE-ENTER the pool is its second reader.** Look for this wherever
  a thing has a home it can leave and return to.
- **⚠ NEITHER THE CENSUS NOR A SCREENSHOT CAN SEE A RATCHET — BOTH ARE TAKEN AT LOAD (new).** The
  ratcheted build passed the census with every metric `+0` and would have passed the visual gate
  outright: at `t=0` the kerbs are full. It only fails after minutes of *watching*, which nothing in
  this harness does. When a vector changes a **distribution that evolves**, the gate is a time series,
  not a snapshot — step the sim and check the quantity is **stationary**. `probe-anchor.mjs` +
  `__step(600)` in a loop is the instrument; it costs one page load.
- **⚠ AN AGGREGATE THAT MIXES TWO POPULATIONS CANNOT CONVICT ANYTHING (new; sharpens iter 104).** The
  headline `street%` jumped 16.8 → 30.7%, straight into the range `stepPed`'s comment says it rejected
  ("0.15 flooded them to ~28%") — and it is **fine**. Split by anchor class: open-ground residents are
  *unchanged* (20.0/19.1/21.4 → 19.6/24.2/19.4%, inside the documented 3.0–5.3 pt control spread) and
  the whole rise is a **new subpopulation standing where it lives**. The rejected 0.15 tuning drained
  parks *into* the streets; this adds residents *to* the streets. Same aggregate, opposite meaning. Per
  iter 118, this split is also the **in-run invariant column**: open-ground street% must not move.
- **`syncFleet` IS CALLED FROM `tick()`, SO THE CROWD IS A FOSSIL OF THE CITY'S PAST (new).** Peds top
  up to `wantPeds` as `pop` grows and **never re-site**, so the anchor histogram records where open
  ground *was* when each resident spawned, not where it is now. Two consequences: any "where do people
  live" vector is really about the **growth history**, not the 2035 map; and a counterfactual that
  resamples the 2035 pool (this probe's first draft did) is an idealization the progressive spawn never
  reaches — **A/B two live builds instead.** Also note `?warp=61` alone leaves only ~92 of 130 residents
  spawned; the rest arrive over ~2.5s of real frames. **Any shot of peds taken at load is missing 30% of
  the crowd** — `shoot.mjs`'s settle time has been hiding this.
- **People's additive inventory, so nobody re-proposes it** *(the iter-34 beach-towel lesson)*: peds with
  gait + colour + kids in tow + night thinning, dogs with exclusive owners and leashes and strays,
  joggers, block parties, evening crowds, stadium/market crowd terms, pier crowds, hover focus ring.
  The domain's live cells are **Deepen** (this one) and **Scale**; `Connect` paid at 78 and 111.

## Iteration 120 — the parks rejoin the year (2026-07-11)

**Vector.** Nature × **Deepen** (content is a Sky interconnect — the 108/113 pattern), taken as the
**holistic step-back** the header mandated. Rotation said Transport (112); the step-back found a real
defect first, and *"if something compounded badly, spend the next iteration FIXING it"* outranks
rotation. A step-back that finds a defect and then ships an unrelated vector has wasted the step-back.

**The step-back itself.** 5 un-zoomed whole-city frames — seeds 42 and 7, **day and night** (115's law),
plus a **seasonal** frame (`&year=2035.62`, the golden dry peak) — read by 3 parallel agents, all told to
hunt cumulative drift, not to look for a feature. `&step=300` so the crowd was settled (119's law).
**All three returned VISUAL: FAIL.** Two of the three were wrong, and finding that out was the work:

- **Season agent:** *"season only tints farm tiles; meadow, forest, parks and grass stay green — the
  golden frame reads as blighted brown patches in a green city."* Its **diagnosis was false** (the code
  plainly tints `grass`/`meadow`/`canopy`) but its **perception was true**. Resolved by probe, not argument.
- **Seed-7 agent:** *"rain shafts render as a floating grey smudge off the west edge, a z-order tear."*
  **False positive — I looked at that one PNG myself.** It is a rain cloud sitting over the western hills
  with its shaft landing on terrain. Nothing floats, nothing tears. **Not banked as a cue.**
- **Seed-42 agent:** night periphery (east beach/parkland) goes dead-dark while the core blazes; seed-7
  agent independently flagged the same shape (dim NW quadrant). Two independent sightings ⇒ **banked as
  cue (m)**, below. Note the *post-fix* night agent called night "legible and beautiful", so (m) is a
  soft cue about core-vs-periphery *balance*, not a black hole. Verify before spending a lap on it.

**What the probe found** (`probe-season.mjs`, new; clock frozen per 109's same-frame law, `ROAD` as the
null control). Mean rendered-pixel distance from winter, at tile centres, seeds 7/42/1234:

| | MEADOW | FOREST | **PARK** | **SHOREPARK** | FARM | QUAD | ROAD *(control)* |
| --- | --- | --- | --- | --- | --- | --- | --- |
| n | 6 | 231 | **584** | **294** | 120 | 24 | 1200 |
| dry-peak, before | 26.6 | 19.7 | **0.0** | **0.0** | 88.4 | **0.0** | 0.5 |
| dry-peak, after | 26.6 | 19.7 | **9.9** | **17.9** | 88.4 | **5.2** | 0.5 |

The season did **not** stop at the farms — it stopped at the **irrigated** greens, and those are the
overwhelming majority of the city's green area: **878 park/shorepark hexes against 231 forest and 6
meadow.** So the dry season painted 120 brown farms onto 878 permanently-emerald hexes. `PARK`,
`SHOREPARK`, `QUAD`, `GARDEN`, `FIELD` all read **exactly 0.0 in all four seasons**.

**Change.** Palette only. `applySeason` now tints `BASE.lawn` and `BASE.turf` on a **muted** share of the
same `dry`/`winter` curve it already drove `grass`/`meadow` with (`LAWN0`/`TURF0` pinned beside the other
`*0` originals). Every one of the ~14 `col('lawn',k)` / `col('turf',k)` draw sites picks it up through
`CCACHE`, which `applySeason` already invalidates — **zero new draw calls, no `rng()`, no terrain.**
Ordering is now `FARM 88 > MEADOW 27 > FOREST 20 > SHOREPARK 18 > PARK 10 > QUAD 5`: parks remain the
lushest thing on the plate. *Irrigated buys amplitude, not immunity.*

**Census.** PASS. Tile histogram **empty**, every metric **+0**, entity counts identical — predicted
before running, since a palette change touches no seeded draw.

**Perf.** PASS, free. Min-of-3, interleaved: day **33.94 → 33.94ms**, night **39.94 → 39.83ms**. Two extra
`mixA` calls per frame. (Pristine HEAD read night +7.0% against the 37.33ms pin under this session's load —
that offset is earlier code, matching 119's identical observation. Not re-pinned; `polish-tile` owns it.)

**Visual.** 2/2 PASS on the fix, seeds 42 and 7, A/B before-vs-after at the golden peak plus a winter
frame plus a night frame. Both agents independently: the farms *"are no longer orphaned"* / *"no isolated
brown blight patches"*, parks *"muted toward olive but did NOT go brown/dead"* and stay clearly the
greenest tiles, winter and golden read as two seasons of one city, night undamaged.

**Verdict — SHIPPED (FIXED).**

**Findings for later laps.**
- **⚠ A VISUAL AGENT'S PERCEPTION AND ITS DIAGNOSIS ARE TWO DIFFERENT CLAIMS, AND ONLY ONE IS ITS JOB
  (new; the central lesson of this lap).** All three agents failed the frame; the two that named a *cause*
  named the wrong one, and one invented a defect (the "floating rain shaft") that does not exist. An agent
  looking at a PNG can tell you **that** a frame is ugly and **where**; it cannot tell you **why**, because
  the cause lives in code it never read. Treat the *where* as evidence and the *why* as a hypothesis to
  probe. Had 120 trusted the season agent's diagnosis it would have "fixed" `canopy` — which was never
  broken — and left all 878 frozen hexes in place. **Never ship an agent's causal claim; probe it.**
- **⚠ AND NEVER BANK ONE EITHER.** The rain-shaft FAIL would have entered this header as a cue and sent
  some future lap hunting a z-order tear in correct code. One image read killed it. The skill says the
  budget "exists to be spent when it matters" — **a cue you are about to write into the ledger is exactly
  when it matters**, because a false cue outlives the iteration that invented it.
- **⚠ EVERY WHOLE-CITY SHOT THIS LOOP HAS EVER TAKEN WAS IN JANUARY (new, and it explains 108).** `?warp=61`
  from `year=1974` always lands on ~2035.0, so without `&year=` the season term is ~0 and *a seasonal defect
  is invisible to the gate by construction*. This is the second time that has bitten (108: the farms had no
  seasons at all, unnoticed for 107 laps). Both were found only by pinning `&year=`. **A step-back now shoots
  a seasonal frame** (header updated). Ask what else the default URL silently pins: `tide` is the obvious next
  one — `&tide=` exists, and no gate has ever moved it.
- **⚠ "INTENTIONAL" IN A COMMENT IS NOT THE SAME AS "MEASURED" (new).** `BASE.lawn`'s comment reads
  *"irrigated green: parks stay lush when the hills go gold"* — a real design intent, and it is why I nearly
  dismissed the agent. But the code did not implement *lush*; it implemented **frozen**, in all four seasons,
  including autumn and winter where the intent says nothing. A comment stating a *goal* is not evidence the
  goal was hit. `grep`ping the comment made the defect look like a decision. The probe made it a number.
- **THE CITY'S GREEN MASS IS PARK, NOT NATURE (new; sizes for any future vegetation vector).** `PARK` 584
  + `SHOREPARK` 294 = 878 hexes, vs `FOREST` 231, `REDWOOD` 34, `VINEYARD` 26, `ORCHARD` 18, `MEADOW` **6**,
  `GARDEN` **6**, `FIELD` **8**. Any Nature vector aimed at meadow/garden/field is aimed at ~20 tiles and
  **cannot move a whole-city frame** (cf. 111's law: the whole-city gate cannot convict anything drawn at
  3 px). If you want the city to *look* different, the lever is `PARK`.
- **cue (m) — NIGHT'S PERIPHERY (new, soft, two independent sightings).** Downtown blazes; the outer ring
  (east beach + parkland on 42, NW farms + low residential on 7) falls to near-unlit olive at `t=0.8`, losing
  detail the day frame shows. The named candidates: the **pier/ferris wheel/boardwalk read as unlit**, and
  there is no low-density streetlight or ambient moonlight on sand/parkland. A third agent, post-fix, called
  the same night frame beautiful — so **measure the luminance histogram core-vs-ring before committing a
  lap to it**; do not take the FAIL at face value (see the first finding above).

## Iteration 121 — the cable cars agree on a speed (2026-07-11)

**Vector.** Transport × **Deepen** (a fix). Transport was the stalest domain (112), and the header's own
law — *"a banked, measured finding outranks both kind-rotation and cell-emptiness"* — pointed at the last
entry of that domain, where iter 112 had measured but not fixed **cue (h)**: the gondola still carried the
normalized-parameter bug the monorail was cured of. Deepen has now paid four laps running; a banked,
measured defect outranks kind-rotation, but the **next lap must vary the kind** (see header).

**What the probe found before a line was written** (`probe-gond.mjs`, new, `git add -f`'d; freeze `playing`,
drive `__step()`, sample `cb.p`). Cue (h) was **understated**. At `warp=61` the lines are longer than 112
sampled, so the spread is worse than the 0.14–0.36 it banked:

| seed | line | spans | cruise spans/s | round trip | stand% |
| --- | --- | --- | --- | --- | --- |
| 7 | 1 | 16 | **0.64** | 50.0s | 0.0 |
| 42 | 1 | 17 | **0.68** | 50.0s | 0.0 |
| 42 | 2 | 8 | **0.32** | 50.0s | 0.0 |
| 1234 | 1 | 6 | **0.24** | 50.0s | 0.0 |
| 1234 | 2 | 9 | **0.36** | 50.0s | 0.0 |

**Cruise spread 2.83×**, and seed 42 flies one cabin past an identical one at **0.68 vs 0.32 spans/s** in the
same frame. The `roundTrip` column is the bug stated as a tautology: **every line, of every length, turns
round in exactly 50.0s**, because `cb.p+=dt*s*0.02` is a *lap* rate. `p∈[0,1)` is a **round trip** of a
ping-pong line, so one p-unit is `2*(L-1)` spans — the factor 2 the monorail's fix did not need.

**Change.** `stepCabins(g,dt)`, in the monorail's own grammar, plus `g.rateP`/`g.brakeP` precomputed in
`buildGondSet` (the analogue of `buildMonoSet`):
- rate is **spans/sec** (`GONDSPD=0.40`), capped so a one-span line can't blink (`GONDCAP`, ≥20s round trip);
- a cabin **eases into its terminal and back out** over `GONDBRAKE=1.6` spans with `sqrt(d/B)` — constant
  deceleration. 112's law: the intuitive linear ramp diverges and pins the mover on its floor;
- it then **dwells** `GONDDWELL=4.0` sim-seconds at the sheave, and the tooltip says so
  (*"Standing at the terminal."*, per the sync invariant — the trains already said it);
- `stepGond`'s growth rescale now clears `cb.dw`, so a line that lengthens under a dwelling cabin cannot
  strand it standing mid-line.

Constants were typed **before** anything was measured (107's law) and are reported as they were typed.

**Probe, after.** `cruise 0.400 .. 0.400 spans/s — spread 1.00×`. Round trip now scales with the line
(52.2s at 6 spans → 109.1s at 17). `standing anywhere but a terminal: 0.0 sim-seconds`. `mean/cruise` is
**0.68–0.85**, which is the check that the sqrt ramp did *not* degenerate: the cabin genuinely reaches
cruise instead of crawling on its 0.1 floor. Dwell is 7.4–15.5% of a round trip, exactly `8s / roundTrip`.

**Census.** PASS. Tile histogram **empty**, every metric **+0** except `pop −3` / `greenRoofs +1` — iter 108's
documented load-dependent `(year*23)|0` salt jitter. `gondLines 15`, `gondola 16` cabins, identical. Predicted
before running: the vector touches no `rng()`, no terrain, and adds no draw call.

**Static gate on the one thing a screenshot CAN see** (`probe-gondshot.mjs`, new): a motion change is invisible
to a still frame, but *where a stopped cabin stops* is not. Stepping until a cabin dwells, then reading its
screen position against its tower's: `atTerminal:"start"`, `isPylon:true`, `sag:0.000`, and **dx = 0.00 px**
from the mast column, both seeds. It stops **on** the sheave head — where `gondSag` is zero by construction —
not one span past it.

**Perf.** PASS, free. Interleaved A/B/A/B vs pristine HEAD (117's law), min per variant: day
**34.94 → 34.95ms (+0.03%)**, night **41.22 → 41.00ms (−0.5%)**. Zero draw calls; ≤6 cabins × one `sqrt`.

**Visual.** 2/2 PASS, seeds 42 and 7, whole frame + two crops on the dwelling cabin. Both agents independently:
the cabin hangs on the cable **at a mast head**, "not floating in mid-span, not sunk below the rope, and not
detached"; no z-order tears, no blown-out colour; the whole frame still reads as a balanced coastal city.
Their *perception* is the evidence; the exactness claim rests on the probe's 0.00 px, not on their eyes (120's law).

**Verdict — SHIPPED (DEEPENED / FIXED). Cue (h) is CLOSED.**

**Findings for later laps.**
- **⚠ PORTING 112's FIX REQUIRES COUNTING THE LEGS (new).** 112's law is *"ask what `p=1` MEANS on that
  instance."* On the monorail `p=1` is one lap of a closed loop, so `rate = SPD/L`. On the gondola `p=1` is a
  **round trip** of an open line — two legs — so `rate = SPD/(2*(L-1))`, and the brake zone converts with the
  same factor 2. Get it wrong and you ship a *uniform* speed that is uniformly half of what you intended, which
  every gate here would have passed. The remaining `p`-parametrised movers are worth the same question.
- **⚠ cue (n) — THE CABLE CARS ARE PARKED AT THE ANCHOR IN EVERY SHOT EVER TAKEN (new, measured, PRE-EXISTING —
  this lap did not cause it and did not fix it).** Position along the line at page load, in spans from the start
  terminal, `warp=61`: seed 7 `[0.72, 0.34]` of 16 spans · seed 42 `[0.77, 0.29]` of 17 and `[0.52, 0.54]` of 8 ·
  seed 1234 `[0.45, 0.61]` of 6 and `[0.53, 0.53]` of 9. **Both cabins, every line, every seed, sit within one
  span of the start tower** — and pristine and patched agree, so it is the *growth rescale*, not the stepper.
  `stepGond`'s `cb.p = cb.p<0.5 ? cb.p*k : 1-(1-cb.p)*k` with `k=(L-1)/L`, applied once per span, telescopes to
  `p₀·(L₀-1)/(L-1) → 0`: it pins each cabin to the cell it occupied when the line was **one span long**, which is
  the anchor. Its comment — *"keep the cabins where they are while the line lengthens under them"* — describes
  the implementation **accurately**; nobody read off the consequence. (Sharper than 120's "a comment states a
  goal, not a measurement": here the comment is *true* and the behaviour is still wrong.) Consequence: no cabin is
  ever seen riding **over** the city without `&step=`, so the feature's whole point is invisible at load. This is
  the third instance of *the default URL silently pins a state* (`year` iter 108, `tide` iter 113, now cabin
  phase). Cheap fix for the next Transport lap: re-spread the cabins once `L` reaches `g.target`. **Do not
  "fix" the rescale itself** — it is correct for a growing line.
- **A DWELL IS A PURE TIME DELAY, SO IT CANNOT BUNCH TWO MOVERS (new; the worry that made me check).** Both cabins
  on a line share `rateP`/`brakeP`, the step depends only on `p`, and the pause has fixed length at a fixed point.
  So each cabin's period is *identical* and their offset in **time** is exactly conserved — they can never merge,
  whatever the ledger's "ratchet" instinct (119) suggests. Measured: separation wanders 0.9–4.9 spans over 300s
  with no trend, and is in fact *wider* than pristine's, because the dwell desynchronises them.
- **⚠ THE INTERLEAVED PERF GATE JUST EARNED ITS KEEP, ON PRISTINE CODE (new; hard evidence for 117's law).**
  Round 1 of this lap's gate read **day 47.39ms on unmodified HEAD** — the harness printed
  `33.16ms -> 47.39ms (42.9%) <== REGRESSION`. Round 2 of the *same bytes* read 34.94ms. A single-pass gate would
  have convicted code that did not exist yet, and a "stable offset ⇒ code" reading (99's rule, corrected by 117)
  would have agreed. **Only the A/B/A/B swap, min per variant, can tell a machine from a diff.**
- **`minSep ≈ 0.00 spans`: the two cabins pass THROUGH each other, in both builds (new, pre-existing, cosmetic).**
  They ride one drawn curve, so once per half-trip they occupy the same point. A real jig-back tram counterbalances
  its pair on a loop and they pass side-by-side at midspan; here they are also not quite antipodal (`p` 0.15/0.62,
  0.47 apart, not 0.50). Both are one-line changes and belong with cue (n), not before it — the crossing is a few
  pixels and no visual agent has ever remarked on it.

## Iteration 122 — the institutions name themselves (2026-07-11)

**Vector.** Civic & culture × **Interaction/UX**. Rotation named the domain: Civic was the stalest
(114, and that lap *reverted*). The header named the content — its un-cashed-tell list ends with
*"`CIVICLABEL` (every civic says only 'A public institution.' — 12 kinds, one sub)"* — and the tell
itself is the loop's most reliable move (117's law: **look where a string already ASSERTS what the code
knows**). Kind was forced: Deepen had paid four laps running (119–121) and its licence was spent, the
header says *"do not open with a Polish"*, and Civic's Interaction/UX cell had one entry (52).

**Change.** Hovering an institution, or the squares it earned, now reports what its own siting rule knew.
- **`CIVICDESC`** — twelve sentences, one per kind, each written from that kind's *rule*: the hall
  predates the streets, the school comes *"with every few thousand residents"* (`pop>3500*(schools+1)`),
  the university *"with every fourteen thousand"*, the aquarium sits *"where the streets run out at the
  sea"*, the observatory on *"the dark rim"*, the amphitheater *"beside the parks"*.
- **`Civic quarter — N institutions`** on a major, counted with `siteQuarter`'s own `MAJORK`/`QFAR`.
- **`Fronts a paved forecourt`** / **`Keeps its own grounds behind`**, and, on the squares themselves,
  **`Forecourt of — Town hall`** / **`Grounds of — Museum`** — cashing `TILEDESC[T.QUAD]`, which has
  always said *"Mown grounds behind an institution"* without ever naming which.
- **`One of — 4 schools`** on the two kinds the city builds by demand.
- **Fixed a lie the probe found on the way**: a paved square claimed **`Rooftop solar`**.

**Census.** `VERDICT: PASS`, exit 0, pageerrors 0. `pop 154915 → 154911 (−4, −0.003%)`, `roads +0`,
`developed +0`, **tile histogram empty**, `civicKinds +0`. Exactly right: no terrain write, no `rng()`
draw. `git diff` has **zero** `ctx.`/`fillRect`/`hexTile`/`col(` lines — so per iter 109 the perf gate
was not owed. The ±4 is iter 108's load jitter (`(year*23)|0` salt), not the feature.

**Probe.** `probe-civic.mjs` (**`git add -f`'d**) hovers every civic/plaza/quad via `__find`'s screen
coords, scrapes `#tip`, and checks each claim against cube distance recomputed in Node — a third
implementation sharing no code with `countAround()` or `hexDist()`. **84 claims across 3 seeds: PASS.**
`shot-civic.mjs` is `shot-woods.mjs` retargeted (hovershot aims at *entities*; civics are tiles).

**Visual.** Two agents, two seeds, un-zoomed frames + five hover clips each: **VISUAL: PASS** both.
*"All rows legible, right-aligned values line up, no clipping"*; *"no z-order tears… palette stays muted
and harmonious"*; the whole city still *"reads as a balanced, beautiful coastal city."*

**Verdict — SHIPPED.**

### Findings

- **⚠ ADJACENCY CANNOT ANSWER "WHOSE IS THIS?" — AND THE PROBE CAUGHT IT, NOT THE GATES (new; the
  sharpest instance of iter 112's law yet).** The first build read ownership as *"a PLAZA/QUAD touching
  me"*. But a quad laid behind the **town hall** also touches the **library** two hexes over, so it named
  whichever neighbour came first in `nbrs6` order — wrong on **seeds 42 and 1234**, right on 7 — and both
  institutions claimed the same lawn. Census was flat, the tooltip was fluent, and *both visual agents
  would have passed it*: the text is only wrong if you know the geometry. **The placing rule is the only
  code that ever knew the answer, so it now says so**: `n.own=idx(x,y)` stamped at conversion in both the
  forecourt and grounds rules; `squareOwner()` reads it; `ownsSquare()` reads the same fact from the
  institution's side, so the two can never disagree. **When a relation is many-to-one, record it at the
  point where it is one-to-one — do not re-derive it from geometry later.**
- **⚠ `hasQuad()` AND "DO I OWN A QUAD?" ARE DIFFERENT QUESTIONS, AND MUST KEEP DIFFERENT NAMES.** The
  grounds rule's guard (`countAround(x,y,1,…QUAD)>0`) means *"is a quad already touching me"* — that is
  what stops two clustered majors both getting one, and it is correct. The tooltip's question is *"is one
  MINE"*. I nearly shared one helper between them, which is 112's law read backwards: **one predicate per
  question, not one predicate per phrase.** They are now `hasQuad()` (tick) and `ownsSquare()` (tooltip).
- **⚠ A PAVED SQUARE WAS CLAIMING `Rooftop solar` — AND `solarRoofs` STILL COUNTS IT (new, measured).**
  The solar pass sets `c.solar` only on `RES/MID/COM`; the forecourt and grounds rules then pave that very
  cell into `PLAZA`/`QUAD` **without clearing the flag**. Only `drawBuilding` paints panels and it runs
  exactly when `DEV.has(c.t)`, so the square showed an array nobody drew. Seed 7's plaza printed it. The
  `High street` row on the very next line **had always guarded** (`c.hstr&&DEV.has(c.t)`); the two roof
  rows never did. Fixed on the tooltip side only. **Two live consequences remain, deliberately unfixed
  here** (never retune a metric mid-lap, and never after reading its census):
  (a) the census `solarRoofs`/`greenRoofs` tally is `if(c.solar)` over *all* tiles, so it **over-counts**
  these roofless squares — a few per city;
  (b) the diffusion itself reads `countAround(x,y,1,n=>n.solar)`, so a ghost-solar plaza **still nudges
  its neighbours to adopt.** The clean fix is `c.solar=c.groof=false` at both conversion sites, which
  moves a tracked metric and perturbs an adoption CA — **a lap of its own, in Urban.**
- **⚠ "NOT DRAWN" AND "NOT READABLE" ARE NOT THE SAME OBSERVATION — iter 111's law, one level up, and it
  bit the probe.** Pass 2 checked *"the institution claims grounds ⇔ some square names it"*. Squares that
  could not be **hovered** — offscreen, or with a **pedestrian standing on them** (`QUAD` is in `PEDDEST`,
  so a ped wins `pickEntity` over the tile) — silently registered as *"names nobody"*, and the probe
  produced a **false FAIL** against a hall whose quad was on-screen, correctly owned, and simply occupied.
  A probe must track what it **failed to read** (`unread`) and decline to assert, exactly as a visual gate
  must not read an occluded entity as an absent one.
- **`CIVICLABEL`'s tell is now cashed; the list left is `TILEDESC[T.KELP]` ("swaying in the shallows"),
  `[T.IND]` ("warehouses and light industry"), `[T.VINEYARD]` ("terraced").** Note the tell is *self-
  renewing*: cashing it here **created** a new one — `TILEDESC[T.PLAZA]` still says only *"A paved civic
  square"* for a square that now knows its institution, and the plaza/quad `title` is still the generic
  tile label. A future lap could title them *"Town hall forecourt"* outright.

## Iteration 123 — the wind farm founds itself (2026-07-11)

**Vector.** Water & coast × Deepen. The header named this lap: Water was second-stalest (116), Sky is a
documented **trap**, and Water held *"the board's cheapest live cue"* — **the siting half of cue (k)**,
banked by 116 and left open by 117 and 122. 116 gave the sea a depth field and said outright that the
offshore objects were *"still randomly salted… now there is a field to site them against."* This lap
cashes it. No new tile, no new entity, no new CA pass, no new census metric.

**The header was wrong about the code, and that changed the design.** 116's finding says *"`turbSet` is
laid in `genWorld` from `hashCell` — gate it on `rDeep`."* It is **not**: turbines are laid from **nine
`rng()` draws** (row, x-offset, blade phase, ×3). A rejection-sampling gate — the obvious implementation
of "gate it on `rDeep`" — consumes a *variable* number of draws and would have reshuffled the entire
downstream seeded stream, wobbling every metric in the city for three turbines nobody can see at fit
zoom. **Grep the seam before trusting the ledger's description of it** (the skill says this about the
*artifact*; it is equally true of the ledger's claims about the *code*).

**Change.** `shoreAt(y)+5+(rng()*4|0)` is an **offset, not a depth**. It ignores every piece of coastal
geometry `rDeep` knows.
- **The farm is founded, not scattered.** Take the nine `rng()` draws **up front, in their original
  order**, then spend them on: an anchor row (`R[0]`, the old formula), a **founding depth** on the shelf
  (`R[1]`), a row spacing of 3–4 (`R[3]`), a direction up or down the coast (`R[4]`), and the three blade
  phases (`R[2]`,`R[5]`,`R[8]` — *the same draws as before*, so even the blade angles are unchanged).
  Each tower then takes the cell **in its own row nearest the founding depth**, ties going seaward.
- **The contour does the work.** Because depth is held and the row is not, the line **bends around
  headlands, stays out of the harbor, and never wades into the shoals** — for free, from the same BFS
  that bought 116 its seabed. Rows are held `sp` apart, so three towers read as **one farm** instead of
  three salted objects (they could share a row before: seeds 99 and 555 put two in adjacent rows at the
  same column).
- **`SHELF0=3, SHELF1=5` is now one shared constant.** The tooltip *names* the band (`Coastal shelf`) and
  the farm *stands* on it. The tooltip's `d<=2 / d<=5` literals now read `d<SHELF0 / d<=SHELF1` — same
  behavior, but the word and the siting can no longer drift apart. (This is 117/122's tell, run
  **forwards**: don't let a string assert something the code doesn't share.)
- `seaFill()` is called once in `genWorld`, before siting — the survey precedes the foundation. It is
  `hashCell`-only, so it costs no `rng()`, and it also fixes the first frame, which used to draw flat
  water until the first tick.

**Probe.** `probe-turbine.mjs` (**`git add -f`'d**, per iter 101). Joins each turbine to the **live**
`rDeep` via 116's `__deep` hook and grades the siting against the band the tooltip prints — it does not
reimplement `seaTone`/the depth test (iter 110's law).

| | on `Coastal shelf` (rDeep 3–5) | row separation | undrawable |
| --- | --- | --- | --- |
| HEAD | **3 / 18** (15 stood in `Open water`, rDeep 6–9) | **1 … 19** | 0 |
| patched | **42 / 42** (14 seeds) | **3 … 4** | 0 |

Within a seed the depth holds while `x` slides (seed 7: `x=50,51,52` at `rDeep 4,3,3`) — that *is* the
contour, visible in the numbers.

**Census.** PASS. `pop 154911→154915 (+4)`, `roads/developed/bridges/towers +0`, **tile histogram
empty**, **every entity count identical**. Predicted before running: the draw count and order are
preserved by construction, so the stream cannot move. The `+4` pop / `−3 solarRoofs` / `+1 greenRoof` is
iter 108's load-dependent salt jitter at exactly the magnitude 116 logged for a provably-flat change.

**The one real coupling, measured rather than assumed.** `turbSet` is read by exactly one non-draw site:
the mole's `ok()`. Moving turbines inshore puts them in the breakwater's corridor, and *"a blocked step
ends the arm"* — a truncated mole below 5 cells vanishes entirely. Probed across 8 seeds against pristine
`HEAD`: mole length **identical on 7**, and **6→8 on seed 99**, where a turbine had been *blocking* the
arm. Nothing lost. (`moleSet` also gates kelp, so this could have moved a tile — it did not, on any
census seed.)

**Visual.** 2/2 PASS, seeds 42 + 7, `wide` + `coast`. Both agents independently and unprompted reported
the two things the contour was supposed to buy: *"they read as ONE grouped wind farm… parallel to the
shelf contour, evenly spaced"* and *"bases planted in water hexes on the darker shelf band — not
floating, not on the beach, clear of the pier and Ferris-wheel jetty."* No z-order tears, no blown-out
color, whole frame still balanced. One agent noted the line sits *close* to shore at seeds whose founding
depth rolled 3 — true, and correct: `rDeep 3` is the shelf's own inshore edge, one hex outside the kelp.

**Perf.** Not run (123 is not a step-back). Justified rather than skipped: the change adds **zero
per-frame work** — one extra `seaFill()` BFS per *world generation*, and the turbine draw is untouched.

**Verdict — SHIPPED.** Cue (k) is now **fully closed**: 116 gave the sea a bottom, 123 stands the wind
farm on it.

**Findings for later laps.**
- **⚠ THE LEDGER DESCRIBES INTENT; ONLY THE SOURCE DESCRIBES THE CODE (new).** A banked cue is a *pointer*,
  not a spec. 116's finding named the wrong randomness source (`hashCell` for `rng()`), and the
  implementation it prescribed ("gate it on `rDeep`" ⇒ reject-and-resample) would have perturbed the
  seeded stream it was proud of leaving flat. **Re-grep the seam a banked cue names before designing to
  it** — the cue is right about *what should be true*, not necessarily about *what is*.
- **⚠ TO RE-SITE AN `rng()`-PLACED OBJECT WITHOUT MOVING THE STREAM, RESPEND THE DRAWS — DON'T RE-DRAW
  THEM (new, and generally useful).** Hoist the *exact* draw count in the *exact* order into an array up
  front, then reinterpret what each value **means**. `R[1]` went from "x-offset in a 4-wide window" to
  "which founding depth on the shelf" — a different domain, the same draw. The stream is bit-identical by
  construction, so `pop` is flat *before a gate is run*, and any rejection/search you need must be
  **deterministic** (walk the rows) rather than sampled. This unlocks re-siting **any** `rng()`-placed
  object — the pier, the lifeguard tower, the moored craft — against a field, at zero stream cost.
- **A FIELD EARNS ITS KEEP WHEN A RULE READS IT, NOT WHEN THE DRAW SHOWS IT (new).** `rDeep` was drawn by
  116 and *read* by nothing. Siting one object on it made the coastline's geometry — headlands, harbor,
  river — do work it had never done. **Ask of every derived field: what places itself against this?**
  Still unread by any rule: `rGreen`, `rShop`, `rServ` feed only the walkable stat; nothing *sites* to them.
- **THE OFFSHORE OBJECTS THAT REMAIN SALTED** *(Water & coast)*. This lap did the turbines. The **pier**
  row is `rng()`-picked with a rejection loop (`pyR()`, 30 tries — variable draws, already baked in), the
  **lifeguard tower** likewise, and the **moored craft** sit off the pier. The pier is the interesting
  one: a boardwalk should run out to a *depth*, and it now can (previous finding's trick makes it free).
- **`turbSet`'s ONLY NON-DRAW READER IS THE MOLE'S `ok()`; THE MOLE GATES KELP.** A three-hop coupling
  (turbine → mole path → `moleSet` → kelp CA) that no census metric names. If you move any offshore
  object, probe `moleSet.size` against pristine `HEAD` before believing the tile histogram.

## Iteration 124 — the panels come off the plazas (2026-07-11)

**Vector** Urban fabric × Polish (FIXED) — cash the banked ghost-`c.solar` cue (122's third finding).
Also: the mandated **header trim** (see below), done first.

**Change** `c.solar` / `c.groof` are set by the rooftop-adoption diffusion CA only on `RES`/`MID`/`COM`
(L1564/1574), but the flag **persists when that building is later cleared for a paved square** — a civic
forecourt (`FORECOURT_LOT`={EMPTY,RES,COM,MID}) or the iter-100 `QUAD` grounds pass eats a solar-bearing
lot and leaves the panel flag behind on the `PLAZA`/`QUAD`. The draw (`drawBuilding`, dispatched only when
`DEV.has(c.t)`, L3859) and the tooltip (`c.solar&&DEV.has(c.t)`, L5924) already gated on tile type, so the
ghosts never *rendered* — but two census readers (`solar` stat L2064, `solarRoofs` L6162) and both adoption
neighbour-counts (`countAround(...,n=>n.solar)` L1565, green L1575) counted them. Classic *one predicate,
several readers, some wrong* (the SKILL law): the tooltip was right, the census + CA were not. Routed all
four wrong readers through the same `DEV.has(c.t)` predicate the tooltip uses — no new predicate, no
conversion-site hunting, no flag-clearing (which would have meant editing every place a building is overwritten).

**Census** PASS. Core flat: **pop −3** (documented year-salt jitter, my change touches no terrain),
**roads/developed +0**. `solarRoofs` **1471→1451 (−20)** — the ghosts, gone from the 9-cell matrix.
`greenRoofs` **397→405 (+8)** — knock-on: solar/green are mutually exclusive (L1574), so slightly fewer
solar adoptions free cells for green. Tile histogram **empty**, as expected for a count/draw-only fix.

**Probe** `probes/probe-solghost.mjs` (tracked) — counts, in-page at 2035 over 8 seeds, solar/green flags
split by `DEV.has(c.t)`. **27 ghost solar + 4 ghost green**, sitting on exactly `PLAZA / QUAD / PARK /
GARDEN / STADIUM` — every one a square or grounds carved from a former building. Control: **real** building
roofs (~423–549/seed) are unchanged and still counted. This is the mechanism, independently recomputed.

**Visual** PASS — one whole-city + one downtown shot (seed 42, 2035); agent confirmed every solar array
sits on a real roof, none floating on plaza/park/road, no tears/floaters/blowout, city reads coherent.
(The fix is invisible by construction — ghosts never drew — so this was a regression check, not a feature check.)

**Header trim (done first, per SKILL step 5).** The maintained header had reached **1234 lines (~27k
tokens)**, 3× its 400-line budget — re-read on every iteration. Moved **848 lines** of superseded /
closed / promoted-to-`SKILL.md` law-bullets (closed cues a/b/c, the 70–110 methodology bullets now living
as laws in `SKILL.md`, old perf-gate history, fixed watch-items) **verbatim** into `GROWTH-archive.md`
under a dated "Retired header bullets" section — never deleted. Kept: the rotation grid, saturation notes,
the OPEN cues, live-reference constants (CBD, `c.buzz`, `c.flow`, plate/plural U4, reach maps, the perf
baseline, the `?year=`/`?tide=` hooks). Header now **386/400**; all 10 ledger entries + 114 archive entries intact.

**Verdict** FIXED — undid a compounding count/CA bug that had over-reported rooftop solar since forecourts
and quad-grounds began carving squares from solar-bearing lots, and trimmed the header back under budget.

## Iteration 125 — the step-back finds a clean city, and a January in its own eye (2026-07-11) [holistic step-back]

**Vector.** The mandated holistic step-back (105/110/115/120/**125**). Not a domain × kind lap: its job is
to read the WHOLE city for *cumulative* drift the census and per-feature visual gates are blind to, run the
perf gate, and — new since 115/120 — do it at **night and a season**, not just a daylit January. No city
domain vector was taken (see the verdict), so rotation is unchanged.

**What was read.** Un-zoomed whole-city frames at **2 seeds × 3 lights/calendars** (42 and 7; day, night,
and a season each), one subagent per seed reading its own three frames and asked the *cumulative* question
("has anything compounded into clutter or darkness?"), never "is the new feature there."

**Result: the city is healthy.** Both agents **VISUAL: PASS**.
- **Night lighting (115) holds across both seeds.** Asked to *locate* the luminous core by light alone
  (108's locate-don't-judge law), both hit near the true CBD — seed 42 at (.48,.47), seed 7 at (.50,.62),
  the latter a discriminating **off-centre** hit. Neither read a flat glitter mat; the rim fades to dark.
- **The sea reads** (116's bottom + 123's founded wind farm): "reads as ONE grouped wind farm parallel to
  the shelf," night sea "deep desaturated blue, not a dead void."
- **No z-order tears, floating tiles, hard seams, or blown-out colour in any of the 6 frames.** Day frames
  balanced, core→edge density gradient intact, open water alive not empty.

**Perf — the gate cried a FALSE FAIL, and the interleaved control caught it.** `perf.mjs` reported night
**+16%** (43.3 vs baseline 37.3) and FAILed, stable across two runs. But the stored baseline is a day old
under a different load: the **iter-115 file's own bytes read 41.3ms night today** (~+10% pure load).
Interleaved HEAD-125 vs the iter-115 file (A/B/A/B, min of 3): night **43.06 vs 41.28 (+4.3%)**, day
**36.44 vs 38.06 (~flat, HEAD faster)** — sample ranges *overlap*. So the real cost of iters 116→124 is
**~+4% night, day flat** — minor. **Not re-pinned** (re-pinning to today's inflated 43ms would blind the
gate to a real future regression); night is the one to watch (118 added per-window lit-pane draws). Header
perf note updated.

**Season — measured alive; the one "defect" an agent named was an artifact of MY shot.** Seed 42's agent
independently reported "winter barely differs from summer." Per 108's law (agents invert "which is more X"),
this was measured, not believed: `probes/probe-season.mjs` (per-tile rendered-pixel distance from winter,
`ROAD` as the zero control) reads **FARM winter→dry-peak 88, winter→autumn 93**, with FOREST/VINEYARD/
ORCHARD/MEADOW/SHOREPARK all moving and PARK/REDWOOD near-zero *by design* (irrigated / evergreen, per 120).
ROAD control **~0–2.2**. The seasons are working. The agent was fooled because I shot the "day" baseline at
the **default** year — which is **~2035.0 ≈ winter (January is the default)** — so it compared the winter
frame to a frame that was *also* winter. Exactly the January-blindness the header has warned about since
108/120, walked into again.

**Change (the step-back's product — a recipe fix, not a city change).** Promoted the lesson into
**SKILL.md**'s step-back section and refreshed the header's step-back pointer: **pin the day/night baseline
frames off January** (`year=2035.62`, dry peak) and keep `2035.02` as the seasonal-contrast frame, so the
two baseline frames sit at different calendar points and seasonal drift can surface on the primary reads.
No `solvista.html` edit; census unchanged and vacuous by construction (tree verified clean after the perf
interleave restored HEAD).

**Verdict — FIXED.** No compounding city defect found (a clean bill of health is the rarer, and the honest,
step-back outcome). The compounding problem that *was* found is in the loop's own guardrail — a step-back
that shoots its "day" frame in January cannot see a seasonal bug and mis-reads winter — and it is now fixed
in the recipe so it stops recurring (108 → 120 → 125). The city grows by keeping its instruments honest.

### Findings

- **⚠ A DEFAULT-CALENDAR "DAY" FRAME IS A WINTER FRAME (new; the third recurrence of the January blind spot).**
  `?warp=61` from `year=1974` lands on ~2035.0, and `applySeason`'s winter keyframe is 0.02 — so an un-pinned
  day shot and a `year=2035.02` "winter" shot are the *same instant*. An agent handed both will report the
  season "doesn't read," comparing winter to winter, and a real seasonal regression on the primary frame is
  invisible. Pin the day/night baselines to a non-winter `year=`; the seasonal frame is the contrast, not the
  day frame. (108 wired `?year=`, 120 shot a season, 125 fixed the *day* frame — the same blind spot, closed
  one layer deeper each time.)
- **⚠ GRADE A STEP-BACK PERF FAIL BY INTERLEAVING AGAINST AN OLD COMMIT'S FILE, NEVER BY THE STORED BASELINE
  (sharpens 117's law).** The baseline is pinned on a specific day's load; a step-back runs days later on a
  different load, so `current vs baseline` conflates code drift with today's load. The clean reading is
  `current-file vs old-commit-file`, interleaved under *the same* load — here it collapsed a +16% FAIL to a
  +4% real delta with overlapping ranges. `git show <old>:solvista.html > /tmp/x.html` and swap it in.
- **A CLEAN STEP-BACK IS A COMPLETE ITERATION — DON'T FORCE A FILLER VECTOR ONTO IT (reinforces 120).** 120's
  law says a step-back that finds a defect then ships an *unrelated* vector wastes the step-back. The corollary:
  when it finds *no* city defect, the honest output is the health record + whatever the read itself surfaced
  (here, the recipe fix) — not a Sky feature invented to have shipped something. "One more shallow feature is
  not automatically worth it" (the skill). The next lap still owes the stalest domain (Sky, then People/Nature).
