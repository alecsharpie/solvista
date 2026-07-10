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
| **Nature** | 4, 26, 29 | 1, 13, 60 | 37, 46, 67, 76 | ~~46~~, ~~88~~ | U4 | 53, 96 | |
| **Water & coast** | 6, 10, 12, 16, 20, 33 | 90 | 17, 25, 51, 65, 72 | 22 | | U2, 44, 58, 79 | **97** |
| **Urban fabric** | 32, 62 | 7, 23, ~~82~~ | 38, 54, 68, 92 | 47 | 8, 14, 24, **U4** | 75, 83, 86 | |
| **Transport** | 2, 9, 21, 31, 48 | 77 | 28, 39, 55, 63 | 5, 15 | U4 | U1, U3, 70, 85, 87, 94 | |
| **Civic & culture** | 3, 11, 18, 30 | 36 | 36, 59, 66, 80, 91 | 45 | | 73 | 52 |
| **Sky & atmosphere** | 27, 43 | | 19, 35, 50, 57, 95 | | | 61, 81, 89 | |
| **People & activity** | 41, 56 | 49 | 34, 64, 93 | 78 | | 84 | 71 |

- **Interaction/UX kind:** tile tooltip (U2, user-directed) + **entity
  tooltips (iter 42)** + **Est./Built years in tooltips (iter 52, Civic-led)**
  + **hover focus ring (iter 71, People-led)** + **census stats that can fall
  (U5: tallest / density / solar share / transit reach / walkable)**
  + **the coast names itself (iter 97, Water-led: pier/stall/ferris wheel,
  esplanade, lifeguard tower, dune `Sand`+`Marram grass`, live `Tide`)**.
  When adding an entity array: `stamp()` it in its draw + add an `ENTINFO` row
  (same discipline as the census hook). `stamp()` now also draws the focus ring,
  so any stamped entity is ringable for free.
- **⚠ A DRAW-TIME structure with no tile type of its own is invisible to the tooltip (iter 97).**
  Nothing in `TILELABEL` looks missing, so nothing looks wrong — the pier reported **"Ocean"** for
  ~75 iterations, and the iter-22 esplanade and the lifeguard tower were mute the same way. The
  invariant "keep the tooltip in sync" is usually read as *new tile type → new label*; it also
  means **anything you paint over a tile must be named before that tile.** `pierAt(x,y)` (L1827,
  what is *drawn*, 1986) vs `onPier(x,y)` (where a ped may *walk*, 1987) are now one predicate with
  two readers. When you add a draw-time overlay, hover it before you ship it.
- **⚠ `solarRoofs` / `greenRoofs` JITTER ±4 UNDER A NULL EDIT (iter 97).** They salt their hash
  with `(year*23)|0` / `(year*31)|0` (L1126/L1136) and `year` is a continuously-advancing float, so
  the salt quantizes differently depending on where tick accumulation lands. Iter 97 saw +4/+1,
  suspected its own change, and ran the control: **`git stash` the edit, re-census pristine HEAD
  against the same baseline → identical +4/+1.** Before believing any small non-core delta, run
  that stash-control. It costs 90s and needs no tokens.
- **⚠ A slow signal sampled briefly looks exactly like a stuck one (iter 97).** `TIDE` has a ~140s
  period (`waveT` advances ~1.0/s, `×0.045`) and spends most of its time near the extremes (arcsine).
  Watching a live page for 17s showed **only** `Low water` and looked like a dead-label bug; the
  feature was fine — seed 42 simply started in the trough, where `sin` is flattest. **Sweep the
  phase (assign `waveT` in `page.evaluate` and read the real function), don't watch the clock.**
  `TIDEV` (sign of `dTIDE/dt`) is derived from the *same hoisted phase* as `TIDE`, so they cannot
  disagree — do that whenever a value and its derivative are both consumed.
- **⚠ Gating a TILE tooltip? Clear entities off the target hex first (iter 97).** `pickEntity()`
  beats the tile, by design. Seed 7's esplanade shot returned **"Jogger / Logging shoreline
  miles."** — a correct tooltip for the wrong subject, and a visual FAIL for a feature that worked.
  Use `&flood=joggers:0` (the debug hook exists for this) and pick the candidate hex with the most
  clearance from any stamped entity. `shot-coasttip.mjs` is the tile-side sibling of
  `hovershot.mjs` (which aims at *entities* via `__ents` and cannot target a hex).
- **⚠ Water & coast is ADDITIVELY SATURATED too (surveyed iter 97).** 6 new elements, the dune CA
  (90), the esplanade (22), five Deepens, four Polishes. Already there: beach, dunes+marram, kelp,
  marsh, rocks, lighthouse, boardwalk pier (deck/stall/ferris wheel), esplanade, lifeguard tower,
  harbor works + freighters, ferries, boats, kayaks, surfers, whales, dolphins, herons, tidepools,
  a live `TIDE`, and offshore wind. Its remaining moves are **Deepen / Polish / Interaction**;
  97 took Interaction.
- **⚠ Nature is ADDITIVELY SATURATED (surveyed iter 95; Polish taken by iter 96).** Before reaching
  for a new plant or a
  new nature CA, know what is already there: forest succession + logging, `REDWOOD` canopy closure,
  **wildfire** (`c.fire` → `T.BURNT` → `EMPTY`), meadow `bloom` as excitable media, `VINEYARD`,
  `ORCHARD`, fairy rings (`c.shroom`), `c.hedge` field rims, **street trees + a boulevard allée**
  (`c.treed`, L1143 — iter 96 nearly re-shipped these), and `EMPTY` already draws a patchwork
  with saplings and flecks (iter 53). `T.BURNT` reads **0** at all nine census points — fires are
  rare and decay in 6 ticks, so the whole fire ecology is *invisible* in any snapshot; deepening it
  buys a thing nobody sees. Nature's next real move is **Deepen or Polish**, not a new element.
- **Trees have three species now: `treeSp()` → broadleaf / conifer / poplar (iter 96, L2135).**
  Hashed from the tree's **sub-hex** position (`round(gx*8),round(gy*8)`), so a clump mixes;
  conifers weighted inland (`0.08+0.30*inland`, `inland=clamp((SHOREX-gx)/30,0,1)`), poplar a flat
  ~6% accent. Realized mix **68 / 25.5 / 6.3%**; conifer share **14.7% coast → 34.3% hills**.
  Species does **not** depend on `year`, so a tree never changes kind as the city ages.
  `ORCHARD`/`VINEYARD` don't call `tree()` (own draws) — their rows stay uniform. `probe-species.mjs`
  is the shape probe. **⚠ `tree()` is the hottest draw call in the renderer (~2,700/frame): iter 96
  cost +7.1% day frame time on its own.** Don't put the next Nature vector inside `tree()` too.
- **⚠ A top-level `const` is NOT on `window` (iter 96).** `SHOREX`/`CTRX`/`HEXR`/`G` are `const`s:
  they live in the global **lexical** env, so inside `page.evaluate` they resolve **by bare name**
  but `window.SHOREX` is `undefined`. Function declarations (`tree`, `treeSp`, `cellAt`) *do* land
  on `window`. Iter 96's probe read `window.SHOREX`, got `undefined`, and computed `NaN` — and
  because **`NaN < x` is `false`, every value silently fell through a bucketing chain into the last
  bucket**, reporting a dead gradient for a feature that was working. A probe that reports a
  suspiciously *uniform* result is more likely broken than the feature. Bare-name it, like
  `probe-dash.mjs` does.
- **⚠ Alpha cannot rescue a colour that matches its background (iter 95).** A rain veil at
  `rgba(120,146,176)` (lum 143) over a sunlit city (lum 150–190) was **invisible**, and two rounds
  of more ink (α .30→.52, 9→12 columns, 1→1.4px) moved it from 0.79× to **0.98× of the animation
  noise floor** — i.e. it perturbed the frame exactly as much as the pedestrians did. Legibility at
  distance is **luminance contrast, not coverage**. It shipped only once given a *dark shaft*
  (lum 114) behind pale drops. Any new translucent atmosphere — haze, spray, smoke, dust, godrays —
  must clear its background in luminance, and **`probe-rainink.mjs` is the way to check**: diff the
  canvas against HEAD inside the feature's bbox *and* inside a control box (this city animates, so
  two loads always differ). Signature matters as much as the mean — a coherent shape at Δ8 is
  obvious; scattered pixels at Δ25 are not. **Measure before you tune a third time.**
- **⚠ The wide gate and the zoom gate can disagree, and both be right (iter 95).** Zoom passed all
  three tunings; wide failed the first two. Iter 94 said *zoom before you fix*; the complement is
  **the wide frame is the product** — the camera renders at `scale ≈ 0.59`, so a 1.2px stroke is
  sub-pixel on screen and a feature that only exists at 3× does not exist. When the gates split,
  don't pick a side: give the feature a cue at **each** scale. And tell wide reviewers **"no
  enhancement"** — an agent that contrast-boosts will confirm any feature you like.
- **Showers: clouds are `rng()`-spawned, never `?flood=` them (iter 95).** ~2 of 7 clouds rain per
  city. `probe-rain.mjs` reports which, and the `&step=` that walks one clear of the rim
  (seed 42 → 600, seed 7 → 600, seed 1234 → 560); `shot-rain.mjs <seed> <step> <out>` clips the
  cloud→ground column. A shower is rim-faded by `pa` on `ROWMIN`/`ROWMAX` (iter 89's grammar) so it
  never rains into the void, and its damp ground patch is centred on the shaft's **foot**
  (`cx-rlean`), not the cloud — see the next bullet.
- **⚠ Placing one entity NEXT TO another? Size the gap in PIXELS (iter 93).** A hex is
  `CW`=32px wide and `ROWY`=16px tall, so an offset expressed in *hex units* separates
  half as far vertically as horizontally: iter 93's dogs orbited their owners at `r`
  hex and drew as one blob whenever the angle pointed up the screen. Compute the offset
  in px, then divide by `CW`/`ROWY`. And pick the **direction from the ground, not the
  geometry** — `kerbDir()` stands a street ped 0.30 hex out on the kerb normal to keep
  it off the centre line, so nudging its dog "toward the hex interior" put the dog in
  the traffic lane. An entity attached to a host should reuse the host's *legality*
  (`pedWalk`/`strollable`/`kerbDir`), not just its hex. **Neither bug moved any census
  metric, and neither was visible in a whole-frame shot** — entity-vs-entity vectors
  need a zoomed gate (`hovershot.mjs ZOOM=6`).
- **Dogs belong to residents (iter 93).** `d.own` indexes `peds`, exclusively (one leash
  per hand). A leashed dog rides its owner's hex, so it inherits `pedWalk`'s street/bridge
  legality free — anything that changes where peds may walk moves the dogs too. Strays
  (`own<0`) keep the park roam. `probe-dogs.mjs` is the shape probe.
- **⚠ "Reach toward each neighbour" is a junction asterisk waiting to happen (iter 94).** The
  road draw dashed from the hex centre toward *every* road neighbour. Correct on a straight run;
  at a dense junction, six axes meeting at 60° draw a star, and **54.6% of all road hexes were
  painting an X** by the time anyone looked. It survived 93 iterations because the density that
  triggers it is density *the loop itself added*. Any per-cell radial draw — dashes, wires,
  hedges, desire paths, power lines — has this failure mode. **Mark a through-line, not spokes.**
  Now: 2 road neighbours = one path (straight run or bend), keep both; 3+ = a junction, mark only
  the busiest through-axis by `c.flow`; ≤1 = draw nothing. X-hexes are **0 by construction**.
  `probe-dash.mjs` is the shape probe.
- **`NBR_OPP=[[0,1],[2,5],[3,4]]` — the three hex axes, parity-free (iter 94, L207).** These are
  the *collinear-opposite* neighbour index pairs into `nbrDirs(y)`: same indices for even and odd
  rows. **The intuitive pairing is wrong.** "Which move walks back to where I came from" gives
  `(0,1) (2,3) (4,5)`, because index 2 is *up-right* on even rows and *up-left* on odd ones —
  those are inverse **steps**, not opposite **neighbours**, and a line drawn through them bends.
  Anything asking "what street runs *through* this hex?" must use `NBR_OPP`.
- **⚠ A wide frame localizes a complaint; it does not diagnose it (iter 94).** Two agents on two
  seeds independently reported the core's roads as grime — *and both blamed the wrong cause*
  ("roads too close in value to the roofs, one grey mass"). Zoomed adjudicators found value
  separation was fine and the defect was dash geometry. Acting on the wide verdict would have
  re-toned asphalt that iter 86 had already toned correctly. **Zoom (`--shots downtown`) before
  you fix anything a whole-frame agent reports.** Corollary for gating lighting: **`t=0.72` is
  *sunset*, not night** — an agent there reported "no night lights" for a city whose windows are
  60–70% lit at `t=0.9`. Shoot `t≈0.9`.
- **⚠ `solarRoofs` is a flaky census metric (±1) (iter 94).** It moved `+1` on one run and `+0`
  on two re-runs of identical bytes: `c.solar` is a `hashCell` salted by `year` (L1126), and
  `year` advances with the tick count. A ±1 on it is evidence of nothing — re-run before
  believing it, and never read it as a growth signal.
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
- **⚠ `COM` is the TOWER precursor (iter 82).** The upgrades pass promotes `COM` on a
  `com>=2` quorum, so **anything that makes shops makes skyscrapers**: +115 COM came
  back as +31% towers and +12.8% pop. Any future rule that mints `COM` must decide
  whether those lots are downtown parcels or terminal shopfronts.
- **⚠ But do NOT make them terminal by vetoing the upgrade (iter 92).** 82's proposed fix
  (exempt shopfronts from the tower upgrade *and* the quorum) was implemented and cost
  **−9.8% pop / −20% towers** — a hard core collapse. **`POPW[TOWER]`=240** vs `COM`=10,
  `MID`=28: pop in this model essentially *is* towers, so any rule that costs towers costs
  pop and nothing buys it back (redirecting a blocked lot to `MID` recovers 12%). Worse,
  the natural sites for a shop street — the founding crossroads, `mainX` — are **exactly
  the value core**, so you veto the very lots that were going to tower. Displacing the
  tower to a neighbour is *also* a trap (towers 247→**237**): a high street's neighbours are
  houses, so the redirect finds no eligible host. **Never zone against `TOWER` near the
  core.** Express a terminal use as a **draw property** instead — see `c.hstr` below.
- **The high street: `c.hstr` + `HSLEN`/`HSPULL` + a retail podium (iter 92).** `genWorld`
  has always laid a founding **main street** (`fdx`, a hex diagonal through the crossroads,
  at init in 1974). Iter 92 reserves its flanking lots (`c.hstr`) via a deterministic scan,
  and the parcels pass builds **shops, never houses** there (`shop||c.hstr`) — 82's
  "reserve the frontage pre-1990" prerequisite, finally met. **The CA is touched in exactly
  one place**; the upgrade pass is byte-identical to HEAD. Towers rise on the parade freely
  and get a **shop podium** in `drawBuilding`'s `TOWER` case (7 of 13 wall lots are podium
  towers by 2005 — without it the street vanishes as downtown densifies). `__find('highst')`
  returns the reserved frontage; tooltip says *High street*. **Its tile histogram delta is
  ≈0** (`COM −6`) — do not look for it there, use `probe-highst.mjs`.
- **`COM` now has a shopfront, and it faces the street (iter 83 — 82's blocker is
  cleared).** 82 said `COM` had "no shopfront draw"; it had one, but the awning was a
  `bandR` **ring** and the glass ran full height, so a shop was a `MID` in a colored
  belt. Now: glass at street level over a stallriser, a `slotS` door, a kerb apron,
  and a **projecting striped awning** — all on `frontSide()`'s road-facing face
  (cached as `c.fs`, refreshed on `year`). A retail siting vector is now unblocked
  *visually*, but 82's siting lesson stands unchanged: reserve frontage pre-1990,
  and never re-try RES→COM on arterials.
- **One-sided drawing has a vocabulary now (iter 83).** `bandR`/`bandS` wrap **both**
  visible faces — a ring cannot express frontage. Use `faceOutS()` (a face's outward
  screen normal), `awnS()`, `kerbS()` and the older `slotS()` for anything a building
  does *toward a street*: porches, stoops, loading docks, café spill-out. And note
  the **`0.5 − ax` margin**: a prism at `ax=0.36` leaves ~4.5px of its own hex free on
  every side, so things drawn there project over the pavement and read as depth
  **without** crossing into the next row — the trick that makes an overhang safe in a
  painter's-order renderer.
- **⚠ Nature × Connect is not reachable draw-only (iter 88, EXPLORED→REVERTED).** Shelterbelts
  linking wood to wood along the hex axes: **1 / 0 / 1** belt cells at 2035 across the three
  seeds (vs 14 / 6 / 16 at 1985), and `BELTR` 4→8 doesn't move it. By 2035 the woods are not
  separated by open ground, they are **walled by buildings** — the axis walks die on
  `RES 122 · MID 75 · COM 46 · PARK 30`, and the walks that still land are wood-adjacent-to-wood.
  Including `PARK`/`GARDEN`/`SHOREPARK` as endpoints *and* pass-throughs gives 4 / 1 / 3. Same
  answer. **Don't re-try a wood corridor as a flag + draw.** Two reusable results: mark corridors
  as **paths, not per-cell tests** (per-cell drew a *dotted* line and pushed seed 1234's patch
  count **up**, 39→43; path-marking gives 39→32), and a **patch-count union-find over `__find`
  is the honest test of any Connect claim** — make the next one pass one. `AXSTEP`, the
  parity-free three-axis stepper, is preserved verbatim in 88's entry. Also: `c.hedge` (L1206)
  **already rims the farm fields**, so any new line-of-scrub vector must first say how it differs.
- **⚠ REMOVING an `rng()` draw perturbs FAR more than moving a building (iter 91).** The
  single most valuable measurement of the lap, and it inverts the intuition. Siting the
  library/museum/parliament by a deterministic `hashCell` scan *instead of* the old
  `rcIn()` search looked like the safe, house-style move ("no rng draw, so siting perturbs
  nothing"). It cost **−22% pop and −47% towers by 2035** — a hard core-gate collapse. A
  controlled experiment (burn the draws the old loop would have made, so the *only*
  difference is where the building stands) showed the siting itself was **worth +2 to
  +14% pop**: the loss was 100% the three skipped draws reshuffling 800 ticks of stream.
  **So: a deterministic rule that REPLACES an existing rng search must still spend that
  search's draws.** Run the old loop, keep its result, throw it away. The codebase already
  did this once — the 1996 plaza rule "is kept only so its `rng()` draws keep the stream
  aligned" — but the lesson was filed as a quirk of that rule, not as a law. It is a law.
  The advice "prefer `hashCell` so your rule perturbs nothing it doesn't touch" is only
  true for a rule that is **purely additive**; a *substitution* is a different animal.
  Corollary: **`rng()`-draw *count* is the invariant, not `rng()` avoidance.** Order your
  code so the draw count is provably independent of your new terrain edit (place nothing
  until after the search runs), and the diff is exactly "the building moved".
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
  **(e) downtown has no massed core** *(banked by iter 92's holistic agent; **independently
  corroborated by iter 94's**, which called the landmass "too uniform… little breathing room
  between core and edge, the whole thing reads at one continuous loud level" — two holistic
  passes, two seeds, same complaint. This is now the oldest standing cue and the strongest
  candidate for the next Urban fabric lap.)* Urban fabric × Polish/Scale —
  at whole-city zoom the towers "are strung along the whole top edge rather
  than massing into one skyline; the eye finds *a tall side* more than a distinct core," and
  the interior reads as an "edge-to-edge carpet of roads + rooftops with little green
  breathing room." The `back` term in the tower upgrade biases inland but evidently not
  hard enough. Note the tension with iter 92: the fix is **not** to zone against towers
  anywhere (that is a −9.8% pop trap) — it is to bias *where* they rise, and/or to thin the
  uniform mid-block density. Same agent flagged seed 1234's long straight monorail/cable
  lines as still reading like a "wireframe/UI stroke" — but iters 85/87 closed that with two
  agents each, so treat this as one un-zoomed opinion, **not** a reopening of cue (c).
  **(d) the civic quarter deserves a real square** *(banked by iter 91, Civic × Polish)* — the
  quarter now reads as a knot of pale domes sharing a single forecourt hex. A proper civic
  square (2–3 contiguous `PLAZA` cells fronting several institutions, rather than one lot won
  by the loudest street) would repay the clustering. Do **not** implement it by loosening the
  radius-2 guard globally — that would pave forecourts city-wide; scope it to `MAJORK` cells
  that have ≥2 other `MAJORK` within 4 hexes.
  ~~(a) **the rainbow floats**~~ — **CLOSED by iter 89.** Not by 81's fog fix, though the
  cue predicted it would be: a bow forms in *nearby* drops, so it may legitimately hang in
  **front** of the city, and moving it into the row loop would have buried it. What was
  wrong was that it drew over the **void** past the rim and **ended on a hard chord**.
  Fixed by anchoring it to the ground its shower falls on and dissolving both legs.
  With (a), (b) and (c) all closed the cue list was empty for one iteration; **(d) and (e),
  above, are the open cues** — (d) found by a *vector* rather than by a holistic pass.
  ~~(b) **the asphalt floods the interior**~~ — **CLOSED by iter 86.**
  ~~(c) **the monorail beam reads as UI chrome**~~ — **CLOSED by iter 87.** Six agents on
  4 seeds across iters 79/84/85 called `drawMonoAt`'s beam a "debug overlay floating above
  the rooftops"; 85 corrected the attribution (it was never `drawGondAt`) and 87 fixed it:
  peak tone **255 → 217**, the girder given a shadowed body + underside, the pylons planted
  on `creamDk` footings under a pier head whose top face is `RAILH` itself. Both wide agents
  confirmed it now reads as elevated infrastructure. It is legitimate geometry — **never
  "fix" it by deleting it.** One durable lesson: the monorail deliberately has **no sag**,
  because a rigid box girder does not sag; only the gondola's rope does. *Don't re-open.*
- **⚠ A TICK IS 0.075 YEARS, NOT ONE (iter 90).** `__warp(n)` runs `while(year<target){year+=0.45/6;tick();}`
  — so a `tick()` pass runs **~147 times by 1985, ~413 by 2005, ~813 by 2035**. Any *per-tick rate*
  (accretion, decay, growth) must be scaled to ~800 ticks or it saturates long before the first era
  you can screenshot. Iter 90's first two attempts were ~13× too fast and the dune ridge was fully
  grown *and* grassed at 1985, with zero visible succession; it looked like a placement rule. If your
  new pass is meant to *evolve over the eras*, print its state at all three eras before you tune it.
- **A terrain-altering CA CAN be pop-neutral — preserve every predicate the old tile answered (iter 90).**
  The standing warning that terrain passes always wobble pop a few % is true only if you let the
  swapped tile *drop out* of the predicates the old one satisfied. `BEACH→DUNE` moved 266 cells and
  came back **+0 on all 22 metrics** (pop, developed, roads exact) because DUNE was added to every
  passive test BEACH participated in: **`valueSrc` (0.74 — the big one; the `default: 0.5` would have
  shifted the coastal land-value field inland and cascaded into development), `greenNear`,
  `openCells`, `strollable`, and the aquarium's shoreline adjacency**. Grep the new tile's *predecessor*
  for every mention before you swap it. Two conversions were provably safe to skip: KELP and the
  LIGHTHOUSE both require a **water-adjacent** beach cell, and a dune by construction has no wet
  neighbour — reason it out rather than adding the tile everywhere by reflex.
- **⚠ Drawing a rounded natural mound: apex + ground contact + ONE hard facet boundary (iter 90).**
  Four attempts, all looked at zoomed. **There are ZERO gradients in the file** (`createRadialGradient`
  ×0) — the style is flat facets, so soft shading is not available. What fails: two stacked ellipses
  read as a **pancake on a cast shadow** (a larger, lower, darker ellipse *is* the grammar of a drop
  shadow) — and no amount of resizing them fixes it; a single symmetric ellipse cut by a straight
  ridge reads **flat**; a truncated cone reads as a **drum/volcano**. What works is `T.ROCK`'s idiom:
  a silhouette with a **visible apex** and a **visible ground-contact line**, split by one crisp facet
  edge (dome profile arc + contact arc, shaded, with a lit cap sagging back from the apex). Copy the
  ROCK case, not the MARSH case, for anything that must sit *up* off its tile.
- **⚠ `pop` is NOT bit-reproducible across census runs (iter 85).** Identical source, three
  runs: `+2`, `+2`, `+0`. So a ±2 wobble on a **draw-only** change means nothing — re-run the
  gate on unchanged source before concluding the seeded stream moved. (Iters 78/84's "+0 on
  all 22" controls were real, but the guarantee is statistical, not exact.)
- **Aerial structures: a straight uniform stroke IS the grammar of a UI overlay (iter 85).**
  What separates geometry from chrome is **sag, shading, a footing and a cap** — and sag is
  the cheapest. The gondola now has all four: `gondSag(g,f)` is a parabola over the span
  between bracketing towers (`GONDSAG`=0.95px/cell → 2.81px over 3 cells, a ~4% sag ratio),
  **exactly 0 at each tower** so the rope lands on the sheave head; `buildGondSet` publishes
  `g.pyl` (spans, for `gondSag`) + `g.pylSet` (draw test); the pylon is footing + shaded mast
  + head; `gondPos` returns sag as a **5th element** so cabins ride the curve. **⚠ Draw any
  per-cell curve with `GONDSEG` sub-steps** — a 3-cell span has only *two* interior cells and
  symmetry forces them to equal height, so cell-centre sampling yields a **trapezoid**, not a
  curve (`0 2.53 2.53 0`). `drawMonoAt`'s beam is the same defect, unfixed — see cue (c).
- **Civic forecourts are a *placement* rule, not a tile (iters 36 → 80).** Every
  `PLAZA` in the city is a forecourt; 36's random-sample rule at L909 has never
  fired even once and survives only to keep the `rng()` stream aligned — do not
  "fix" it, and do not count on it to make plazas. Placement scores each neighbour
  `(front side ? 1e6 : 0) + maxAdjacentRoadFlow`, so **front dominates and flow
  only breaks the tie**. `FORECOURT_LOT` = `{EMPTY, RES, COM, MID}`: an institution
  may clear a shop or a mid-rise for its square, never a `TOWER`, never a `PARK`.
  Widening that set from `{EMPTY,RES}` is what took coverage 6/15 → 14/15 civics —
  the downtown halls ringed by shops were the ones going without.
- **Peds walk the streets now — `pedWalk`/`PEDLEASH`/`kerbDir` (iter 78).** Open ground
  is ~100 *disconnected islands* by 2035 (parks/plazas/beaches), so a ped confined to it
  can never leave the one it spawned on. Peds may now also walk **roads** (not bridges —
  raised deck, they'd sink), bounded by `PEDLEASH`=2 hexes from an anchor `p.hx,p.hy`
  that **re-anchors on reaching open ground** — so parks chain through the streets
  between them and the walkable-island count roughly **halves** (99→46, 101→37, 95→53).
  Streets are transit, not destination (shorter `tm` + `PEDSTEP_RD`>`PEDSTEP_OP`), so
  occupancy settles ~19%: 4 residents in 5 are still in the parks. `kerbDir()` puts a
  street ped on the **kerb** facing what it came to see, never the centre line.
  **`strollable()` is unchanged, so dogs are still park-bound** — a natural follow-on.
- **Peds have a gait, and the velocity was already there (iter 84).** `stepPed` lerps
  `ox→tx`, so **the residual `tx-ox` IS this frame's speed** — no new state, no
  `Math.random()` draw, so the pixel-identical control of iter 78 is preserved. `drawPed`
  scissors two legs with amplitude `clamp(sp*0.42,0,1.15)`, hips bobbing over the planted
  foot; at `sp≈0` the legs close and the ped *stands*. Measured across 1560 ped-frames:
  ~11% idle, ~49% full stride. **Any entity that lerps toward a target can be animated
  from its own residual this way** — `stepDog` (`ox→tx`, dogs still legless) is the
  obvious next one, and `stepShuttle` lerps too. Gait phase is `ph:peds.length*1.7`,
  **index-derived on purpose**: a `Math.random()` at spawn would have re-rolled every
  other mover. The old ped also **floated ~0.6px above the ground**; feet now touch it,
  so the figure is ~0.5px taller. That is the fix, not a regression.
- **⚠ Screenshotting a 5px entity: centring on it is NOT enough (iter 84).** Three
  re-shoots. (a) `__ents` returns `{name,sx,sy}` with **no identity**, so "track one ped"
  is positional, and at `zoom=14` a ped outruns any search radius — the clip photographed
  a building. Re-pick the ped *nearest screen centre each frame* instead. (b) Entities are
  drawn **with their row**, so buildings in the rows *below* paint straight over them: a
  perfectly-centred ped can be entirely hidden. Filter to peds whose next two rows downhill
  are flat (`!TALL.has(c.t)` — **`TALL` is NOT a page global**, iter 85 tripped on this;
  rebuild it in the probe as `new Set([T.TOWER,T.MID,T.CIVIC,T.COM])`) and that stand on
  open ground — `hovershot.mjs`'s `PICK=front`
  is the same lesson, generalized. (c) At `ZMAX=14` an 80px clip is **narrower than one hex**;
  use ~200px so the figure has context and survives a one-hex stroll. Budget ~4 shot
  attempts for any few-px entity, and **look at the first frame yourself before spawning
  agents** — two of the four agents in this lap's first round graded a building.
- **⚠ An entity-behaviour change CANNOT have a pixel-identical BEFORE control (iter 78).**
  Entity motion (`stepVehicle`, `stepPed`, …) draws from the **shared unseeded
  `Math.random()`**, never from seeded `rng()`. So changing *how many* `Math.random()`
  draws happen per frame re-rolls every other moving thing — both seed-78 subagents
  correctly saw cars/trams/a helicopter shift between BEFORE and AFTER, and one wrongly
  concluded the "scene RNG order" had been perturbed. It had not: the seeded CA stream
  was untouched and all 22 census metrics + every entity count came back **exactly +0**.
  Only *terrain/draw* changes (76, 77) yield clean controls. Tell the reviewing agent to
  look for **stationary** evidence, and don't read moving vehicles as a determinism bug.
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
- **Lit vs emissive — `colA()` exists now (iter 79).** `col()` applies `TINT`, but it
  returns `rgb(...)` with no alpha, so **every translucent highlight in the file was
  written as a hardcoded `rgba(255,…)` literal and silently ignored the day/night tint.**
  `colA(name,f,a)` is the tinted-rgba twin (uncached — `a` is continuous; measured free).
  The test is **does the thing reflect light or emit it?** Foam, glints, wave sparkle
  *reflect* → must go through `colA`. The moon (L3851+), aquarium bioluminescence (L3231),
  window lights, and the `LITAMT`-gated shore glow *emit* → they correctly keep literals,
  and several are deliberately gated to appear only at night. **Do not "fix" those.**
  Remaining untinted literals that may deserve the same look: the whale spout (L3774) and
  boat wake at L3659 — both sit next to `col('foam',1)` calls, so the file is inconsistent.
- **⚠ A holistic VISUAL: PASS is WEAK evidence (iter 79).** Two subagents each returned
  `VISUAL: PASS` on whole-city night frames in which the surf was rendering as a pure-white
  neon rim around the entire coastline — a real, 79-lap-old defect. An un-primed reviewer
  told "check if anything compounded" has **no BEFORE to compare against** and grades the
  city against its own imagination, so it ratifies whatever it sees. Two working signals:
  (1) **contradictory explanations of the same artifact are a finding** — both agents
  explained away the white cable-car lines, one as "stadium pitch markings", one as "the UI
  selection overlay" (they are `drawGondAt`'s `col('whiteDk')` pylons+cables, L3424, and
  legitimate); (2) **a caveat both seeds volunteer is a finding** — both flagged night sand
  as "muddy brown… acceptable", which is the tint working, but looking at *why* they both
  reached for it surfaced the untinted foam beside it. Look at the frame yourself when two
  agents agree in different words.
- **⚠ A reviewer only sees the change at the scale the change lives at (iter 82).** Two
  wide-frame agents returned `VISUAL: PASS` on a change that the one **downtown-zoom**
  agent correctly failed. A street wall is a *block-scale* feature, so the block-scale
  verdict outranks two city-scale ones. Send the zoom that matches the feature's scale,
  and **when verdicts split, believe the tighter one** — then confirm by eye.
- **⚠ A moved tile histogram can still be a lie (iter 82).** `COM +182` read as 182 new
  shops; a probe showed only ~45/city were actually the feature — the rest was the
  seeded stream reshuffling downstream of a terrain change. The histogram proves the
  vector *touched* its tile, not that it *built* the thing you designed. **When a
  feature has a shape (a run, a ring, a spine), measure the shape.** A 40-line
  connected-components probe in the page (`cells`/`cellAt`/`nbrDirs` are page globals;
  copy `probe-forecourt.mjs`) settled in 90s what 3 screenshots and 3 subagents could
  not. Delete the probe after; the finding goes here.
- **The marine layer is a FIELD on the plate, not blobs on the lens (iter 81).**
  `fogAt(x,y,i)` × `FOGAMT`, emitted per-hex *inside* the row loop, so the next row
  occludes it and it can never hang off the plate. Gated by `rSea` — a fifth
  `reachFill` whose sources are every wet cell, so fog finds rivers and marsh too.
  Colored via `colA('fog',…)` (it scatters → it takes the tint). Two things that
  look like bugs and are not: (1) the per-hex alpha is 0.22, tuned for the ~2.4
  lenses that survive *across a row* — the next row paints over the rest, so the
  field does not accumulate down-screen; (2) the faint hex ripple in fogged water
  is the lens lattice, and **hash-jittering the centers to break it up makes hard-
  edged bubbles instead — tried, reverted, don't re-try.** `FOGAMT>0.02` early-outs,
  so a clear city pays nothing; a foggy frame costs ~+10%.
- **⚠ The three gates share a SAMPLING blind spot (iter 81).** Census, perf and
  every screenshot run the same seeds (7/42/1234, or 42) at the same times
  (`t≈0.3`, `t=0.8`). The fog spell fires only when `sin((seed%97)*0.7)>0.25` —
  which *none* of those seeds satisfy — and the dawn bank needs `t≈0.10`. So a
  feature that had shipped before the ledger existed sat visibly broken for 80
  laps, unrendered by any gate. Kelp survived 13 laps by never being *looked at*;
  this survived 80 by never being *sampled*. When touching anything time- or
  seed-gated, find a seed×t that actually shows it (and say which, in the entry).
- **⚠ Overlays drawn last FLOAT (iter 71):** the instinct to draw a highlight
  "last of all, so it can never tear" is wrong in this renderer. Rows draw
  top→bottom, so an entity in row *y* is legitimately occluded by a tower in
  row *y+1* — an overlay drawn after everything then lands on that tower's roof,
  ringing the wrong object. Draw entity overlays **at the entity's own z** (i.e.
  from `stamp()`), and accept that an occluded entity shows no ring. Also:
  `ctx.lineWidth` is in **world** units under the camera transform, so a 2.2px
  stroke is *thicker than a 1.8px pedestrian* — keep entity-scale strokes ≤1.1.
- **⚠ `dx` is NOT a screen direction (iter 73):** on this offset-row hex grid the
  sign of a neighbour's `dx` does not say which way it lies on screen. An **even**
  row's `dx=0` diagonals sit half a cell **EAST** (`sdx=+16`) and its `dx=-1`
  diagonals WEST; **odd** rows invert it. Code that buckets neighbours by
  `dx>0 / dx<0` (and skips `dx===0`) silently becomes *east on odd rows, west on
  even rows*. Always difference `ctr(x,y)[0]`. `frontSide()` does this; it also
  weights the due-E/W neighbour 2× a diagonal, which is correct.
- **⚠ Facing ≠ visible (iter 73):** orienting a detail toward a street does not
  make it *seen* — a tall tower up to ~3 rows **south** covers a face whichever
  side it is on (11 of 24 reoriented civics got more occluded, 10 less). Occlusion
  is a coin flip orthogonal to siting. If a Polish lap wants a *visible* win, it
  must choose the less-occluded side, not just the correct one.
- **Hover verification:** `shoot.mjs` cannot hover. `hovershot.mjs` (iter 71)
  drives Playwright directly: `__ents` aims the real cursor at a named entity,
  `ZOOM=n` wheels the artifact's own camera in (real magnification, not upscaled
  pixels), `PICK=front` favours front rows (a back-row entity may be occluded
  and legitimately ringless). Emits a no-hover control frame + 3 clip scales.
- **⚠ THE RESOLUTION CEILING: a hex is only ~23 screen px (iter 77).** `scale` at rest
  is **0.73**, and `ctx.lineWidth` is in *world* units, so **device px = world × 0.73**.
  Iter 77 first shipped a "doubled centre line" of two 0.42-wide strokes 0.62 apart →
  **0.31 device px each, 0.45px apart**: physically unresolvable, and *fainter than the
  1.0-wide dash it replaced*. Before drawing any fine detail, multiply by 0.73 and ask if
  it survives. Sub-pixel strokes don't render thin — they render **absent**. The fix that
  works is one crisp ≥1.2-world line, optionally splitting into detail when `scale>1.7`
  (a legit LOD dial: the camera zooms to 14×).
- **⚠ Visual-gate FALSE **PASS** — the mirror of iter 70 (iter 77):** a subagent told
  "look for gold arterial lines" reported seeing them **when the feature was rendering
  sub-pixel**, because the city *already* had gold `busy` dashes that look like the
  feature. A primed agent pattern-matches. Two standing fixes: (1) for any change to a
  **marking, color or line weight**, shoot a **BEFORE control at identical clip coords**
  (`git show HEAD:solvista.html > before.html` — `shoot.mjs` takes it) and make the agent
  say *what differs*; (2) name the confusable pre-existing element in the prompt and
  forbid reporting it. A verdict of "the feature is visible" is worthless without a
  control; "X is in AFTER and absent in BEFORE" is evidence.
- **⚠ `tileshot.mjs` mis-frames FLAT tiles (iter 77):** its clip is lifted `dy`=110px
  **above** the tile centre to catch tall towers, so for a ROAD/PLAZA/BEACH the target
  lands at the bottom edge and a reviewer judges the buildings north of it. For flat
  tiles clip centred (`sy-70`, 220×150) instead. This produced iter 77's second false
  FAIL — two of three gate verdicts that lap were framing artifacts, not the feature.
- **Magnified TILE clips: `tileshot.mjs` (iter 75).** The tile-side twin of
  `hovershot`: `node tileshot.mjs '<url query>' TOWER <outdir>` aims a
  `deviceScaleFactor:4` clip at one instance via `__find`, emitting
  `tile-close/tile-mid.png`. Use it whenever the feature under test is only a few
  pixels wide — it is the standing fix for iter 70's false-negative trap (a
  subagent calling FAIL because a feature was unresolvable at `downtown` scale).
- **⚠ `c.age` is in TICKS, not years — ~13.3 ticks/year (iter 76):** max age is 681 at
  year 2025. Any threshold you write thinking in years is off by 13×. (The sim's own
  rules already know this: `age>16` at the succession pass is ~1.2 *years*, not 16.)
- **⚠ Forest age is a DEAD field; the woods are frozen (iter 76):** `c.age` is ticked
  and reset by fire/logging/succession but **no sim rule reads a FOREST's age**, and
  turnover is ~zero after ~1995 — forest hexes younger than 15 years at 2035 number
  **0/1/0** across seeds 7/42/1234. So "forests grow up / burn scars regrow" would be
  invisible in ~99% of cells. Don't re-explore it. What *does* vary is **canopy
  closure** (wooded-neighbour count fills all of buckets 0–6), which is what 76 shipped.
  Related: **`MEADOW` is down to 1 cell at 2035** — the wildflower-bloom CA and the
  deer's meadow habitat have almost nothing left to run on in a mature city, so
  deepening blooms or deer buys nothing at the late era.
- **Saturation notes:** Water & coast additive moves are well spent (6 new
  elements) — prefer Deepen/Polish there. Weather now has rain + rainbows +
  sea-fog spells (35, 43) + wind/gust cycle (50) + FULL SEASONS (57: winter
  cools, spring freshens, golden-hills summer, autumn ambers; evergreens sit
  it out via the conifer palette split). ⚠ **Sky is now CONFIRMED SATURATED
  (iter 68/69):** probing for a Sky feature turned up clouds + cloud shadows,
  rain, rainbows, sea-fog, wind, seasons, moon, moonglade, stars AND shooting
  stars all already present — don't add to Sky, it's done. **People is
  near-saturated too (iter 69):** peds/dogs/walkers/kids/joggers + block
  parties, evening crowds, picnics, benches, park cafés, fireflies all exist.
  Parks are mature (café kiosks, ponds, fountains, sculptures, fireflies).
  The city is reaching overall maturity — most domains now answer a
  "does this exist?" probe with YES. Lean hard on Deepen/Polish/Interaction,
  reach for genuinely-absent interconnects, and treat "returns have
  flattened → stop" as a live option. Emptiest cell left: Sky ×
  Connect (dubious — what would it even link?); after 49 every flagged gap is
  filled, so lean Deepen/Polish/Interaction from here (saturation, not
  rotation, is now the binding constraint). **But iter 77 is a counter-example worth
  remembering: Transport × New CA rule sat empty for 76 laps and paid out a whole new
  city-scale structure (the arterial spine) with zero terrain risk.** Before declaring a
  domain spent, check whether it's spent in *every kind* — an "additively saturated"
  domain can still be missing its CA rule. Standing leads: `treed` boulevards still
  spread on `busy`, so **allées line the wrong streets** — retargeting them to `c.flow`
  would plant the trees down the trunks (Transport × Deepen); vehicles ignore `c.flow`
  entirely and could prefer arterials. ⚠ Nature × Connect is a DEAD END
  (iter 46): woodland
  patches are never within ≤5 axis-steps of each other across open ground in
  real cities — wood-to-wood green links have no geometry to attach to; don't
  re-explore. Explored & reverted: solar-farm contagion (iter 32);
  tuned-not-reverted: forecourt plazas (iter 36 — 1996 start collapsed pop 5%,
  moved to 2020). **Civic is additively saturated too (iter 73):** every civic
  kind is already richly drawn (flags, beacons, night glows, an amphitheatre
  audience) — probe the draw case before believing any Civic gap. Open Civic
  lead: the 27-of-74 civics that front roads on *both* sides (corner lots) still
  fall back to a hash in `frontSide` — picking the less-occluded side there is
  the natural next Civic × Polish lap (see iter 73's follow-up).
- **Shipping:** `solvista.html` is the deliverable — one self-contained file,
  served from the repo by GitHub Pages. A pushed commit is a shipped city, so
  there is no redeploy step, no separate live copy, and no sync debt to track.
  Keep the file standalone: no external assets, no build step.
- **⚠ `__ents` blind spot (iter 70):** the `vehicles` array (private cars, buses,
  police, ambo, fireeng) has **no `ENTINFO` row** — it's a mixed-kind array, so
  one label would be wrong — which means `__ents()` never returns cars and you
  **cannot aim a clip at a car** with it. `__ents` only sees trams
  ('Streetcar'), trucks ('Delivery truck') and bikes ('Cyclist'). Don't conclude
  "this seed has no cars" from an empty `__ents` result (iter 70 nearly did).
- **⚠ Visual-gate false negatives (iter 70):** a subagent returned `VISUAL: FAIL`
  for a night-lighting change purely because the feature was **too small to
  resolve** at the `downtown` clip scale at dusk — not because it was broken. A
  few-pixel feature needs a **magnified clip** (`__ents` coords + a ~110×80 clip
  at `deviceScaleFactor:4`) before a FAIL means anything. Also: the big grey
  diagonal in many clips is the **monorail/gondola support**, and at low
  resolution it looks exactly like a hard-edged white light beam — tell the
  subagent so, or it will report a phantom tear.
- **⚠ Concurrent sessions:** a polish-tile loop edited `solvista.html` *while*
  iter 35 ran (espRow/espAt/drawEspAt smooth esplanade; promenade metric
  399→153 is its intended re-banding, not a regression). If two loops run at
  once, unexplained metric moves may be the other session, and file-state write
  conflicts are possible. Check for surprise functions/metrics before blaming
  nondeterminism. (Since 2026-07-08 the folder is `/Users/alec/me/solvista`,
  a git repo pushed to github.com/alecsharpie/solvista — commit each shipped
  iteration.)
- **Perf gate** (`polish-tile/perf.mjs`, every ~5 iters): FAILED at iter 39
  (day +22-38%); **FIXED at iter 40** (bandS single-path + setLight cache fix).
  Latest reading (**iter 87**): PASS ×3, min of each scene, day **31.78ms** (baseline
  31.33, **+1.4%**) / night **35.89ms** (baseline 37.22, **−3.6%**) — within 0.2ms of
  iter 85's numbers for the structurally identical pylon change. Two extra prisms on
  ~40 monorail pylons cost nothing measurable, exactly as 85's ~21 gondola towers didn't.
  Earlier reading (**iter 77**): PASS ×3 on a quiet box, day **30.17ms** / night
  **34.11ms** (baselines 31.33 / 37.22 → **−3.7% / −8.4%**, both *under* baseline and
  matching iter 76's 30.28/34.44). A per-tick CA pass over ~800 road cells plus the
  arterial centre lines cost **nothing measurable** — the pass is per *tick*, not per
  frame, and trunk hexes skip the dashes they replace, so the draw is neutral by
  construction. Note the baselines were re-pinned after U4's bigger plate.
  Earlier reading (iter 75): day **24.55ms** / night **27.44ms**
  (old baselines 24 / 26.61 → +2.3% / +3.1%). Iter 75's lit windows cost
  **+1.55ms of NIGHT frame** (25.89 @74 → 27.44) and **+0.05ms of day** (i.e.
  nothing) — the first clean measurement of the header's own "gate new draw work
  on night" heuristic, and it holds. **Night now carries ~2.9ms of headroom
  before +15%; it is the scarcer budget from here, so the next few laps should
  prefer day-visible or draw-free vectors.** (Readings were unusually stable —
  all three runs agreed to ±0.05ms, so the box was quiet.)
  ⚠ **The "creeping day floor" was mostly measurement noise — claim retired at
  iter 74.** The floor FELL across 25.17 @69 → 25.22 @70 → 25.11 @71 → 24.78 @72
  → 24.50 @74 while the code only *gained* draw work (freighters, focus ring,
  `frontSide`). Draw cost can't fall as draw work rises, so the earlier minima
  were load-contaminated. No fix-lap threshold is pending. Corollary: **min-of-3
  is still not enough isolation on this box for a 0.5ms delta to mean anything** —
  don't build a story out of sub-ms moves. Night rose +0.27ms @70 (vehicle
  lights) — cheap, because they're gated on `LITAMT>0.35`. **Gating new draw work
  on night is a good way to buy detail without touching the day floor.**
  ⚠ This machine runs hot (load avg 4+): run the gate 3× and judge by the MINIMUM.
- **Holistic reads:** @69 seed 314 night + seed 42 golden hour, both coherent.
  **@74 seed 903 + seed 1234, each day AND night, both PASS** — land→sea gradient
  reads, downtown dense but streets still separate blocks, rooftop props varied not
  spammy, night is "tasteful sparkle, no glare discs or bloom halos." No tears, no
  floaters, no blown color. The city is in good visual health as of iter 74.
- **⚠ Sea fog is seeded, not drift (iter 74):** soft vertical translucent ovals over
  the water/shore are the **sea-fog banks** (`solvista.html:3618`), spell phase
  `sin(time*0.028+(seedNum%97)*0.7)`. `1234%97=70` sits inside a foggy window;
  `903%97=30` does not — so two seeds legitimately disagree about whether the city
  is foggy. Don't diagnose it as haze/glare drift. Sea-fog watch item from iter 60
  was **FIXED at iter 61** (feathered three-lens banks + beach-band fade), and that
  fix still reads soft at 74.
- **⚠ An exactly-flat census does not prove a change was pure (iter 74):** `__warp`
  is a deterministic fixed tick loop, but `census.mjs:55` reads `__census()` after a
  **500ms wall-clock wait** while the page's RAF loop keeps advancing
  `year += dt*s/110`. The ±1..21 "last-partial-tick jitter" of iters 70/72/73 is
  real and **load-correlated**; a perfectly flat table (as at 74) means the box was
  quiet, not that nothing was perturbed.
  ⚠ Harness lesson (iter 65): NEVER run census + shoot.mjs in one parallel
  command — contended Chromiums time out mid-init and produce blank "1974 /
  0 residents" frames that look like a catastrophic regression. Re-shoot
  solo before believing a blank frame.

---

<!-- rotated -->

> **Archive:** the 90 entries before Iteration 88 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

## Iteration 88 — the woods refuse to be connected (2026-07-10)

**Vector** — Nature × **Connect**. Rotation forced both axes: 83/84/85/86/87 were
*five straight Polish laps* (87 took the fifth deliberately and said "the kind axis
should rotate at 88"), and Nature was the most-lagged domain at 12 iterations cold
(last touched at 76). **Connect was the one empty cell in the Nature row.** The only
strong open cue (the floating rainbow) is Sky × Polish, so taking it would have made
the kind repeat a sixth time.

**Hypothesis.** Forest spreads *only* by adjacency (L896) and along the river (L914),
so the fragments the city leaves behind stay islands forever. A **shelterbelt** — a
file of trees across open ground linking two stands of woods along one of the three
hex axes — would stitch them back together. Draw-only (a `c.belt` flag on `EMPTY`/
`MEADOW`, never a terrain conversion), exactly like the existing `c.hedge`, so the
seeded `rng()` stream is untouched and pop stays flat.

**Grepped first, and it paid.** `c.hedge` (L1206) already exists — *scrub lines rimming
the farm fields*. Nearly shipped a second hedgerow onto a city that has them (iter 34's
beach-towel trap). Belts were kept distinct: they cross **open ground between woods**,
skip any cell the hedgerow owns, and are the only thing drawn along an axis.

**Built.** `AXSTEP` (below), the `c.belt=1+axis` derivation pass beside the hedgerow
pass, a `belt()` draw of three `treeAt()` trees strung along the axis, `tree()` split
into a screen-space `treeAt(cx,cy,s,shade)`, and `__find('belt')`.

**Measured — and the measurement killed it, twice.** `probe-belt.mjs` union-finds the
wood patches with and without the belt cells; a real corridor network *merges* patches.

1. **A per-cell test fragments; it does not connect.** v1 marked each open cell that
   independently had woods on both sides within `BELTR`. At `BELTR=8`, seed 1234:
   47 belt cells and patches **39 → 43**. It went *up*. Because each cell qualifies
   alone, a corridor is only continuous where every cell happens to pass — so it draws
   a **dotted** line, and the dots are new one-cell islands. Rewrote it to mark whole
   **paths** (walk out from each wood; on landing, mark every cell in the run). Patches
   then always fall: `25→19`, `17→14`, `39→32`. **The algorithm was fixed.**
2. **The mature city has nowhere to put a corridor.** Belt cells by era, all three seeds:
   `1985: 14 / 6 / 16` → `2005: 3 / 6 / 7` → **`2035: 1 / 0 / 1`**. `BELTR` 4 vs 6 vs 8
   does not move 2035. `probe-beltblock.mjs` histograms what stops each axis walk:
   at 1985 it is `WATER 100 · (too far) 52 · RES 45`; at 2035 it is **`RES 122 · MID 75 ·
   COM 46 · PARK 30`**. By 2035 the woods are not separated by *open ground* — they are
   **walled by buildings**, and the walks that still land are wood-adjacent-to-wood
   (zero-length gaps, nothing to plant). A draw-only corridor has no canvas.
   Widening the endpoints *and* the pass-through set to include `PARK`/`GARDEN`/
   `SHOREPARK` (a "green network" rather than a wood network) changes 2035 to
   **4 / 1 / 3**. Same answer.

**Visual** — 1 agent on the `tileshot.mjs belt` magnified clip at seed 1234 / 1985, the
feature's *best* era and scale. `VISUAL: FAIL`. Unprompted, it landed on the same defect
the numbers imply: "the belt trees are the SAME size, colour and canopy style as the
ordinary scattered meadow trees, so the only cue that it's a line is their spacing… it
reads as *slightly aligned scatter*… a viewer who wasn't told wouldn't spot it." Grounding
and z-order were clean. Wide 1985/2035 frames were shot but not spent on agents once the
zoom failed — the zoom is the scale the feature lives at (iter 82's rule).

**Census** — run on the reverted tree: `+0` on **all 22 metrics**, empty tile histogram,
0 page errors. VERDICT: PASS. The working tree is byte-identical to HEAD.

**Verdict: EXPLORED → REVERTED.** Tunable (bigger/darker/tighter trees would fix the
"aligned scatter") — but tuning cannot reach the real defect, which is that the feature
is **1 cell at 2035 and 0 on seed 42**. The city as it matures is the state a viewer
looks at, and every gate shoots it. Two ways to force it, both rejected: convert the
corridor to `FOREST` (terrain-altering → pop wobble, and it *still* doesn't land,
because at 2035 the walks are blocked by `RES`/`MID`, not by open ground), or take land
from the city. A −0-visibility feature for either price is the solar-farm trade again.

**Findings — what iteration 89+ should lift from this**
- **⚠ Nature × Connect is NOT reachable draw-only.** This is the load-bearing result.
  "Link the woods" needs land the city has already taken. Do not re-try a wood-to-wood
  corridor as a `c.flag` + draw. The *reachable* Connect hosts in a mature Solvista are
  the greens the city already protects — and note `PARK` blocks 30 wood-walks at 2035,
  so a **PARK↔PARK↔FOREST greenway that treats `PARK` as an endpoint** is the version
  with an actual host, if one plants it as terrain early enough to survive.
- **Corridors must be marked as PATHS, not as cells that each independently qualify.**
  A per-cell test yields a dotted line and *raises* the patch count (39→43). Measured,
  not argued. This generalises to any future network vector (greenways, view corridors,
  bike routes): find the endpoints, walk between them, mark the whole run.
- **`AXSTEP` — parity-free walking along the three hex axes.** Worth re-adding whenever
  something must run along the grain of the plate. Reverted with the rest, so here it is;
  the diagonals are walked in *axial* form, so row parity never appears:
  ```js
  const AXSTEP=[
    (x,y,k)=>[x+k,y],                                              /* E-W row    */
    (x,y,k)=>{const q=x-(y>>1),ny=y+k;return[q+(ny>>1),ny]},       /* SE: q const */
    (x,y,k)=>{const s=x+((y+1)>>1),ny=y+k;return[s-((ny+1)>>1),ny]},/* SW: s const */
  ];
  ```
  Verified against `NBR_E`/`NBR_O` at both row parities: `k=1` is always a true neighbour.
- **`c.hedge` already rims the farm fields** (L1206) and `hedge()` draws it. Any future
  "line of scrub/trees" vector must say how it differs from the hedgerow *before* drawing.
- **A patch-count union-find is the honest test of a "Connect" claim**, and it is ~30 lines
  over `__find`. Any Connect iteration should have to pass one. It is what turned "the
  belts look like they connect things" into "the belts raised the patch count."
- **`probe-*.mjs` at the repo root is gitignored scratch** (as iter 86 noted). `probe-belt.mjs`
  and `probe-beltblock.mjs` are left in the worktree, uncommitted, for whoever takes the
  greenway.

**Iteration 89 still owes the holistic step-back** (84 + 5) — 88 shipped no pixels, so the
cumulative-drift question is exactly as open as 87 left it. The rainbow (cue (a), `L4166`,
Sky × Polish) remains the only strong open cue.

## Iteration 89 — the rainbow lands (2026-07-10) [holistic step-back]

**Vector** — Sky & atmosphere × **Polish (FIXED)**. Both axes agreed for once: Sky was
the most-lagged domain (last touched at 81), and the rainbow was the *only* strong open
cue, banked by three separate holistic passes (79/84/86 — at 86 seed 42's agent raised it
unprompted). 88 had just broken the five-Polish streak with a Connect, so a Polish lap was
clean again. **Iteration 89 also owed the holistic step-back (84 + 5); it is discharged
below**, since the gate frames were read un-zoomed at three seeds.

**Measured the defect before designing the fix** (`probe-rainbow.mjs`, gitignored scratch).
The bow is `arc(bx,by,r0, PI, 2PI)` in the cloud loop. For each raining cloud over a sweep
of 6 seeds × 10 `__step`s, the probe reported both feet's distance to the nearest **live**
cell. Two faults, and only one of them was the one the cue named:

1. **It draws over the void.** Seed 7 step 0 — the exact frame the agents kept reporting —
   puts the bow's feet **52px and 205px** from any live cell: the whole arc hangs past the
   plate's right rim, over empty background. Seed 1234 step 180 reaches **277px**, seed 2
   step 180 **354px**, seed 1234 step 900 **451px**.
2. **It ENDS.** `PI..2PI` stops dead on a horizontal chord at full alpha. Even the bows that
   sit squarely over the city are sliced flat across the bottom — which is iter 85's lesson
   restated: *a stroke that terminates on a hard edge is the grammar of a UI overlay.* No
   agent had named this one; the probe found it by asking where the feet were.

**The cue's prescribed fix was wrong, and the probe is why I noticed.** The header said
"same defect iter 81 fixed for fog, same fix" — i.e. move it inside the row loop for depth.
But a rainbow forms in the drops of *this* shower, a few hundred metres off, so it
legitimately passes **in front of** distant scenery. Drawn behind the rows it would have
been swallowed by the plate and the feature would have quietly died. Fog piles *on* the
world; a bow hangs *in front of* it. **Same symptom, opposite remedy.**

**Change (draw-only, `L4225`).**
- **Anchored to the ground its rain falls on.** `pa` fades the bow out over the last 2 hexes
  before the rim, reusing the cloud shade's own rule from one line above ("shade only falls
  where there is ground to catch it"). Critically the gate tests the **legs, not the cloud**:
  the arc reaches ±`r0`≈108px ≈ 3 cells sideways, so a shower still safely inland can hang a
  leg past the rim. Gating on `cl.x` alone left bows with a foot 190px into the void at
  `pa=1`; gating on `fl`/`fr` (the feet's columns, via `CW`) cut the worst drawn foot from
  **451px → ~20px**. Suppressed 9→16 of 41 sampled bows; seed 7 step 0 is now dark.
- **Both legs dissolve.** The crown stays **one unbroken arc per band** (no seams where it is
  brightest), and only the bottom `asin(0.45)`≈27° of each leg is drawn as 8 alpha-ramped
  segments, smoothstepped to 0. So the bow fades into haze and never terminates — over city,
  sea or void alike.

**Census:** VERDICT **PASS**, 0 page errors. **All 22 metrics exactly +0**, tile histogram
empty, all 25 entity counts unchanged. The draw-only signature (cf. 79, 81).

**Visual:** **3/3 `VISUAL: PASS`**, before/after on identical clips (`before.html` =
`git show HEAD`), one agent per seed. Seed 7: "hangs entirely over the void beyond the slab
edge… terminating on a hard, abrupt cut-off" → gone in AFTER. Seeds 42 and 1234 keep their
bows and report the legs "dissolve into the sea haze instead of ending on a flat line",
**with no banding, seams or beads** — the one risk I could not reason away, since consecutive
alpha-ramped arc segments can bead at the joints. Splitting core-from-legs is what avoided it.
Seed 42's agent, unprompted: it now reads "MORE like an atmospheric rainbow and LESS like a
pasted-on UI/debug graphic."

**Perf — and this time the gate is NOT blind.** 3× sequential; day **31.89ms (+1.8%)**,
night **35.83ms (−3.7%)**, PASS. Worth recording *why* that number is trustworthy where 81's
was not: I checked, rather than assumed, and the perf day scene (seed 42, `t=0.35`,
`LITAMT=0.017`) **draws exactly one rainbow**, so the +1.8% is the real cost of 5 core arcs +
80 leg segments. The night scene draws none (`LITAMT=0.892`), so its −3.7% is pure noise.

**Holistic step-back (84 + 5), discharged.** The three un-zoomed whole-city frames were read
for *cumulative* drift, not for the feature: all three report no z-order tears, no floating
tiles, no blown-out color, and that the city still reads as balanced and beautiful. Nothing
has compounded since 87. Perf is flat against a baseline pinned 2026-07-09. **No new cue was
found** — and with (a) now closed, the cue list is empty for the first time.

**Verdict:** **FIXED.** The bow floated for 88 iterations; it now belongs to its shower.

**Lessons.**
- **A banked cue records a symptom reliably and a diagnosis unreliably.** Three passes
  correctly saw the rainbow floating; the fix they prescribed (81's) would have deleted the
  feature. Re-derive the *cause* when you take a cue off the shelf — the symptom is evidence,
  the proposed fix is a guess made without the code open.
- **Probe the thing you are about to change, even for a "look at it" polish job.** The hard
  chord was invisible to eight iterations of agents *looking at screenshots of it*, because a
  sliced arc looks fine at 0.38 alpha until you ask "where exactly does this stroke stop?"
  Two lines of geometry in a probe found what six agent-readings missed.
- **When a gate is blind, say so; when it isn't, prove it.** 81 warned the perf gate never
  sees the fog. The reflex is to write "gate blind here" again — but one 20-line probe showed
  it *does* see the rainbow. Inherited caveats need re-checking too.
- **An overlay can be fixed by anchoring rather than by reordering.** Reaching for depth
  (`z`) is not the only cure for something that floats; giving it a reason to *stop existing*
  where it has no business being (`pa`) is cheaper and, here, the only one that keeps it.

## Iteration 90 — the back beach grows dunes (2026-07-10)

**Vector** — Water & coast × **New CA rule (SHIPPED)**. Both axes pointed here. Water & coast
was the most-lagged domain (last touched at 79), and its **New CA rule cell was empty after 89
iterations** — the only domain with none. The last five kinds were Polish ×4 + 88's Connect, so
an additive CA also broke a long Polish streak.

**Probed the host before designing** (`probe-dune.mjs`, gitignored) — iter 88's lesson, applied.
Terrain gen makes the beach **three columns wide** (`x>=sh-3`, L460), so a landward band exists.
The radius-1 back beach (no `WETSET` neighbour, no road/dev neighbour) is **83–93 cells in 2–4
long connected runs** — exactly a ridge. Two facts made the vector safe: that band is
**era-invariant** (identical at 1985/2005/2035; the beach never develops), and a radius-**2** band
is far too strict — 21–36 cells shattered into 1–2 cell fragments, no ridge at all.

**Change.** A new tile `T.DUNE` (30) and one `tick()` pass beside the KELP/MARSH rules.
- **Accretion, not placement.** Each tick a dry back-beach cell gains
  `(hashCell(x,y,seed^0x5D17) − DUNEEXP)*DUNEGAIN + min(shelter,3)*DUNESH` sand, where `shelter` is
  its count of DUNE neighbours. Exposed cells (low hash) **deflate to 0 and stay bare**; sheltered
  ones accrete. Sand traps where sand is, so ridges thicken outward from their seeds and the hollows
  between them stay beach. `c.sand` crosses `DUNESEED` → BEACH becomes DUNE; crosses `DUNEMARRAM` →
  marram grass roots. A dune that gets a road/dev neighbour is **walked back to BEACH**.
- **The shelter bonus is capped** (`DUNESHMAX`=3). Uncapped at 0.30/neighbour it *overwhelmed* the
  exposure term (min −0.595), so any cell with 2 dune neighbours grew regardless of exposure — and in
  a 1–2 cell wide band nearly everything has 2. First attempt: **83 of 93 host cells were dune by 1985**.
- **Draw**: a dome — shaded dome-profile + ground-contact arc, with a lit cap sagging back from the
  apex; marram tufts (`sage`/`grassDk`) once `sand>=DUNEMARRAM`. See the header lesson; it took four
  goes and the first three were a pancake, a flat egg and a drum.
- `__find` now returns `sand` per cell (it is the debug hook; that is its job).

**Census:** VERDICT **PASS**, 0 page errors. `BEACH 1650 → 1384 (−266)` / `DUNE 0 → 266 (+266)`,
`tileKinds +9` (one new kind × 9 matrix cells). **All 22 metrics exactly +0** — `pop`, `developed`
and `roads` bit-exact — because DUNE was added to every passive predicate BEACH answered
(`valueSrc`=0.74, `greenNear`, `openCells`, `strollable`, aquarium adjacency). A 266-cell terrain
rewrite that perturbed the seeded stream **not at all**; see the header lesson.

**Succession (`probe-dune2.mjs`), the payoff and the thing that was nearly missed:**

| era | dunes | mean sand | grassed |
| --- | --- | --- | --- |
| 1985 | ~20 | 6.0 | **0** |
| 2005 | ~31 | 13.6 | ~18 |
| 2035 | ~37 | 21.0 | ~28 |

Consistent across all three seeds; beach holds at 141–159 cells, so the sand is not swallowed.

**Visual:** **3/3 `VISUAL: PASS`**, un-zoomed whole-frame at seeds 42/1234 (2035) and 7 (2005).
Both mature frames read the mounds as *raised sand domes with a lit cap and shaded contact*, correctly
landward, never in the water; all three report no z-order tears, no floating tiles, no blown-out colour,
and **no coastal darkening or clutter**. Seed 7 at 2005 calls them "barely perceptible" un-zoomed —
that is the CA working (mid-succession, mean sand 13/30), not a defect.

**Verdict:** **SHIPPED.** The coast gains a landward edge that grows for fifty years.

**Lessons.**
- **A tick is 0.075 years.** The single most expensive mistake of the lap: rates tuned as if `warp=11`
  meant 11 ticks were ~13× too fast, and the ridge was mature and grassed before the first visible era.
  Promoted to the header — it will bite any future `tick()` pass meant to evolve.
- **Positive feedback needs a brake.** "Sand traps where sand is" is the whole physics of a dune, and
  uncapped it fills the band in one era. The cap that lets *exposure veto shelter* is what turns a
  spread into a **ridge with hollows between it**.
- **Verify the load-bearing claim yourself.** The first-round agent called the succession "subtle" — its
  `coast` framing had sliced the beach off the left edge. Re-aiming the clip via `__find('DUNE')` +
  the artifact's own camera zoom (`shot-dune.mjs`, ZOOM=n, both eras on the **same rect**) showed the
  draw was a fried egg. Six agent-readings would not have caught it; iter 89 said the same thing.
- **Preset framings lie about small features.** `--shots coast` is ocean-heavy and misses the sand on
  some seeds; two separate agents flagged it unprompted. Aim clips with `__find`, not with a preset.

## Iteration 91 — the institutions find each other (2026-07-10)

**Vector** — Civic & culture × **Deepen / interconnect (SHIPPED)**. Both axes pointed here.
Civic was the most-lagged domain (last touched at 80), and the last five kinds were
Polish ×3 + Connect + New CA, so a Deepen lap was clean. Civic's Deepen cell was already
the busiest in its row (36, 59, 66, 80) — but every one of those had deepened *one civic
building* (its forecourt, its flag, its facing, its school run). **Nothing had ever asked
where institutions stand relative to each other.**

**Probed the host before designing** (`probe-civic.mjs`, gitignored — iters 88/90's lesson).
The answer was stark: at 2035 a city has 16–18 civics whose **mean nearest-civic distance is
6.6–7.6 hexes**, only **1–2 pairs within 3 hexes**, and a mean distance from the town hall of
**~20 hexes on a plate of radius 33**. Every institution is sited by an independent scan that
ignores every other institution. There was no civic centre — the museum was as likely to open
on a farm at the rim as beside the hall.

**Change.**
- `MAJORK` — the five monumental kinds (`hall museum parliament university library`). The
  2020+ forecourt rule already inlined exactly this five-way test; it now shares the set.
- `QUARTER` — the three that *seek* the quarter (`library` 1982, `museum` 1997, `parliament`
  2034). Services (school, police, firehouse, hospital, aquarium, amphitheater) stay sited by
  need; **`observatory` is deliberately excluded** — it belongs at the dark rim.
- `siteQuarter(kind)` — a deterministic scan over `HEXI` that hugs the **nearest standing
  major** at `QNEAR..QFAR` = **2–4 hexes**: near enough to share a street, far enough to leave
  one between. (Adjacency would have killed the payoff — bunting needs a `ROAD` cell reachable
  from two civics.) Score = hug the nearest, prefer the valuable ground a core sits on, and let
  `hashCell` break the ties that leaves. It widens to 7 hexes once if walled in, then **falls
  back to the old scattered search**, so `civicKinds` can never drop.
- The scattered `rcIn()` search now **runs first and always**, even for a kind the quarter will
  claim, and its result is discarded when the quarter takes it. See below — this is the whole
  iteration.

**The measurement that saved the vector.** The first build was the obvious one: skip the
`rcIn()` loop for quarter kinds, since `siteQuarter` is deterministic and the house style says
a `hashCell` rule "perturbs nothing it doesn't touch". Census came back a **collapse**:
`pop −12.9% (seed 42) / −22.2% (seed 1234)`, `towers −23% / −47%`. Rather than tune the siting
I asked *which half* was to blame, since the two demand opposite fixes. `before.html` was
regenerated from `git show HEAD` (my first copy was taken **after** editing and silently made
the baseline row identical to the test row — caught only because the deltas were exactly 0),
and a `&burn` flag re-consumed the draws the old loop would have made, so the **only** remaining
difference was where the building stood:

| seed | pop, baseline | quarter + skipped draws | quarter + draws burned |
| --- | --- | --- | --- |
| 7 | 35024 | 35418 (+1.1%) | **40112 (+14.5%)** |
| 42 | 35236 | 30688 (**−12.9%**) | **37524 (+6.5%)** |
| 1234 | 32168 | 25042 (**−22.2%**) | **32936 (+2.4%)** |

The siting was never the problem. **The three skipped `rng()` draws were** — they reshuffled
800 ticks of terrain-gated stream. Clustering the institutions is in fact worth *up to +14% pop*,
because three civics squatting on three random prime lots choke three separate `COM` quorums,
and one quarter chokes one. Shipped form orders the code so the draw count is **provably**
independent of the quarter's terrain edit: search, then site, then place only if the quarter
declined. Promoted to the header as a law.

**Census:** VERDICT **PASS**, 0 page errors. `pop 144404 → 152328 (+5.5%)`, `towers 270 → 308`,
`towerHt +3201`, `tallTowers +26`, `helipads +27`, `stations +13`, `cafes +24`. Core structurals
flat: `developed 6198→6203`, `roads 5752→5789`. **`civicKinds +0`** — the walled-in fallback
works; no institution was lost. `CIVIC 86→83` and `schools 23→20` are the same three tiles:
downstream chaos moved the rng-gated "every ~3500 residents earns a school" rule, not a defect.
`PLAZA 14→10` is real and structural — see below.

**Interconnect payoff (the actual point), measured per-city at 2035:**

| seed | majors within 260px of hall | festival bunting (`fete` cells) |
| --- | --- | --- |
| 42 | 2 → **4** | 9 → **16** |
| 1234 | 3 → **4** | 6 → **18** |

Pairs of civics within 3 hexes went 2→5, 2→8, 1→8 across the matrix. Two systems built by
earlier iterations (45's festival streets, 36/80's forecourts) light up with **no new code**.

**The cost, accepted.** `PLAZA 14→10`. The forecourt rule skips a civic with a `PLAZA` within
2 hexes, and quarter members sit 2–4 apart, so the quarter earns **one** shared square rather
than four private ones. Defensible urbanism, and arguably the correct reading — but it is the
one place the vector took something away, so it is **banked as open cue (d)** rather than
quietly pocketed.

**Visual:** **4/4 `VISUAL: PASS`.** The town hall is placed at founding, before any quarter code
runs, so it occupies the **same cell in both builds** — which makes a rect centred on it an
honest A/B (asserted in the shot script, not assumed). Two agents on before/after clips at seeds
42 and 1234, two on un-zoomed whole frames at seeds 42 (2035) and 7 (2005). Both A/B agents
reported the cluster **and, unprompted, the bunting**: "festival bunting visible spanning the
streets between the clustered institutions". Seed 1234's agent volunteered that the monorail
correctly passes *over* buildings and is not a z-tear (iter 87 holding). Whole-frame agents:
"the civic quarter adds a legible focal point", towers "distributed… not walling off into a
monolithic slab", coastline "bright… readable surf edge". No z-order tears, floating tiles or
blown-out colour on any frame. Grouped "but airy", not a white blob.

**Perf — run because the vector *grew* the city, not because it was due.** The step-back is not
owed until 94, but +38 towers / +3201 `towerHt` / +27 helipads is exactly the added draw work the
census cannot see. 3× sequential, judged on the minimum: day **32.5ms (+3.7%)**, night **36.5ms
(−1.9%)**, PASS. Unusually tight spread (32.50/32.55/32.67) — the +3.7% is not noise, it is the
honest cost of drawing a taller downtown, and it is well inside the 15% gate.

**Verdict:** **SHIPPED.** The city acquires a civic centre, and its institutions stop squatting
on the lots downtown wanted.

**Lessons.**
- **Removing an `rng()` draw is a far bigger perturbation than moving a building.** The header
  law. `hashCell` is safe for an *additive* rule; a rule that *substitutes* for an existing
  `rng()` search must still spend that search's draws. The codebase already knew this once —
  the 1996 plaza rule survives purely to keep its draws aligned — but it was filed as a quirk
  of that rule rather than as a law, so I rediscovered it at the cost of a −22% census.
- **When a change fails, first ask which *half* of it failed.** Siting and stream-shift were
  confounded, demanded opposite fixes, and the wrong guess (tune the siting scores) would have
  chased a phantom for hours and probably reverted a good vector. One flag and one control run
  separated them in ten minutes. *A failing census is a question, not a verdict.*
- **Regenerate the baseline from `git`, never from the working tree.** My `before.html` was copied
  after the first edit. It produced a perfectly plausible table in which the baseline and the test
  agreed to the digit — which is *itself* the tell. Deltas of exactly 0.0% across three seeds mean
  you are diffing a file against itself.
- **The best Deepen asks how existing things relate, not how one thing looks.** Four prior Civic
  Deepens each polished a single building's relationship to its own street. Asking where buildings
  stand relative to *each other* cost ~40 lines, added no tile, no entity and no draw call, and
  lit up two systems built 45 iterations apart.

## Iteration 92 — the high street (2026-07-10)

**Vector** — Urban fabric × Deepen. (Rotation: 87–91 hit Transport/Nature/Sky/Water/Civic;
Urban fabric was last touched at 86. Kind: Deepen, last used in this domain at 68.) This is
the vector iter 82 left staked out: it failed to grow retail and named its two prerequisites —
**(a) reserve the frontage pre-1990**, and **(b) give `COM` a shopfront draw first.** Iter 83
shipped (b). This is (a).

**Change (SHIPPED)** — the generator already lays a **founding main street**: `fdx`, a hex
diagonal through the crossroads, drawn at init in 1974. That is frontage nobody had claimed.
A deterministic scan (no `rng()`, in `siteQuarter`'s style) picks the `HSLEN`=12-row stretch
of it whose flanks are most buildable, pulled toward the crossroads by `HSPULL`=0.8, and marks
the flanking lots `c.hstr`. The parcels pass then builds **shops, never houses**, on them.
Plus a **retail podium** under any tower that rises on a reserved lot. `__find('highst')`
answers the reserved frontage; the tooltip says *High street*.

**The measurement that mattered** — the tile histogram is **blind** to this vector: `COM 1256 →
1250 (−6)`. Iter 82 warned that a moved histogram can lie; the converse is also true — a real
feature can move it *not at all*, because the reserved lots were largely becoming `COM` anyway,
just scattered. Only the shape probe sees it. `probe-highst.mjs` (union-find over `__find`,
per iter 88's rule that a Connect claim must pass one), at 2035:

```
                    iter 82 (reverted)        iter 92
  seed 7      51 lots, 43 comps, longest 3    wall 13, spine 5 comps, longest  8
  seed 42     45 lots, 42 comps, longest 2    wall 14, spine 4 comps, longest  8
  seed 1234   37 lots, 31 comps, longest 5    wall 14, spine 3 comps, longest 12
```
And it **thickens with the town** (seed 42 longest: 5 @1985 → 9 @2005 → 11 @2035).

**Census** — `pop 152328 → 150332 (−1.3%)`, `towers −8`, `developed −29`, `roads −83`: all
chaotic wobble off ~14 RES→COM cells/city. `pageerrors: 0`. **VERDICT: PASS.**

**Visual** — 4 subagents. Three at the wall's own scale (one per seed, matched BEFORE/AFTER on
a clip framed to the run's bbox, *not* the fixed `downtown` rect — iter 82's "a reviewer can only
see the change at the scale it lives at"), one un-zoomed holistic. All four `VISUAL: PASS`.
Podiums read as plinths, awnings correctly street-facing, night neon contained.

**Verdict: SHIPPED.**

### Two designs died first, and both are worth more than the ship

**1. The no-tower parade (`!c.hstr` on the COM→TOWER upgrade) — cost −9.8% pop, a hard core
collapse.** The reasoning was clean urbanism: a high street is a *terminal* use, so exempt it
from the tower upgrade (iter 82 had reached for the same `c.strip` idea). It fails because
**the founding crossroads IS the value core** — `mainX` sits where the land value peaks, so the
lots you reserve are exactly the lots that were going to tower. Suppressing 14 prime lots/city
deleted ~70 towers across the matrix, and at `POPW[TOWER]`=**240** (vs `COM`=10, `MID`=28)
*nothing else can compensate*: even redirecting every blocked lot to `MID` recovers only 12% of
the loss. **Corollary: never zone against `TOWER` anywhere near the core.** Pop in this model is
towers; a rule that costs towers costs pop, and no amount of good urbanism buys it back.

**2. Displacing the tower to a neighbour made it *worse* (towers 247 → 237).** The fix looked
obvious — don't delete the tick's tower, promote an adjacent non-`hstr` `COM` instead, chosen by
`hashCell` so it spends no draw. It underperformed because **a high street's neighbours are
houses, not shops**: the redirect usually found no eligible `COM` and dropped the tower anyway,
while the times it *did* fire merely consumed a lot that would have towered on its own. A
displacement rule needs a *supply* of eligible hosts, and this one had none.

**What actually resolved it: `c.hstr` is a DRAW property, not a zoning veto.** A real high street
in a dense downtown does not ban towers — it puts **retail podiums under them**. Stop suppressing
the CA and let the land use rise; carry the frontage in `drawBuilding`'s `TOWER` case instead.
The vector then touches the simulation in exactly **one** place (parcels: `shop||c.hstr`), the
upgrade pass is byte-identical to HEAD, and pop/towers land within wobble. By 2005 **7 of 13**
wall lots on seeds 7/1234 are podium towers — without the podium the street would have quietly
disappeared into blank tower bases as the city densified, which is the failure iter 82 saw and
misattributed to `COM` drawing like `RES`.

### Three transferable findings
- **Rewarding "open ground" rewards ground that never develops.** The first siting scan scored a
  window by counting empty flank cells, and slid the street onto the outskirts: 23 lots reserved,
  only 15 ever built, and seed 7's longest run *fell* 8 → 6. Emptiness at founding correlates with
  emptiness forever. The pull toward the core (`HSPULL`) is not a nicety — it is what makes the
  reservation land on ground that will actually build. Sweeping it: 0.35 → **0.8** → 1.5 → 2.5, the
  min-across-seeds longest run goes 6 → **8** → 8 → 8 (saturates once the window pins to the crossroads).
- **Count the spine, not the shopfronts.** The first probe called a side street crossing the parade
  a *break*, and scored the finished street at "50% singletons". A high street cut by a side street
  is still one street. Scoring components over *(shops ∪ the roads that cut them)* — the **spine** —
  is what let the real signal (3–5 comps, longest 8–12) separate from the noise. Reserve crossing
  corridors too, so the intersections are inside the measured set.
- **Look for the feature already latent in the generator.** No new corridor was drawn, no new tile
  added: `fdx` — the founding main street — has been in `genWorld` the whole time, unclaimed.
  Iter 88 failed to *invent* a corridor across ground the buildings had walled in; this one
  succeeded by *reserving* a corridor the generator had already committed to at t=0. Before
  drawing a line across the plate, check whether the plate already has one.

## Iteration 93 — the dogs get owners (2026-07-10)

**Vector** — People & activity × Deepen/interconnect.

**Provenance.** The interconnect itself (ownership, leash, gait, tail, `pedHidden`
sharing) was **found uncommitted in the worktree**, authored by an iteration killed
between its verdict and its `git commit` — the exact failure mode the skill's *"If you
find the worktree dirty"* section describes. It had no ledger entry, but census passed
and the diff read as one coherent change, and it left a purpose-built `probe-dogs.mjs`
naming itself "iter 93". Per the rule (**the gates decide, not the ledger**) it was kept.
The *placement* fix below is this pass's own work; everything above the fix is described
from the diff, not from its author's intent.

**Change (inherited).** Dogs stop being park furniture and become *somebody's dog*.
`syncFleet` binds ~65% of dogs to a `peds` index (`d.own`), preferring the nearest
resident with `streetAccess()` — a leash-radius reachability test, because dogs and peds
spawn from the same open-ground pool, so the merely-*nearest* ped is almost always a
park-interior one who walks a street 0% of the time. Owners are **exclusive** (one leash
per hand; an unguarded scan gave one resident four dogs and drew a fan of leashes).
A leashed dog then takes its owner's hex outright (`d.x=p.x`) and inherits `pedWalk`'s
streets, leash and bridge veto **for free** — so it can now leave the park (`offPark`
0% → 1-15%) without a single new legality rule. Strays keep the old roam. Draw gains a
sagging leash, scissoring legs off the lerp residual, and a tail that wags faster the
faster the dog moves. Costs **zero** `rng()` draws — every coin is `Math.random` after
the seeded draws, so the stream is untouched.

**Fix (this pass).** The visual gate failed the inherited code: at 5× the dog and its
owner drew as **one unreadable blob** joined by a ~5px leash. Cause: the sniff target was
a free `angle × radius` orbit in **hex units** — but a hex is `CW=32`px wide and only
`ROWY=16`px tall, so a vertical angle separated the pair by ~2.5px, and any angle gave a
leash too short to read. Two rewrites were needed, because the obvious fix bought the blob
back as a worse bug:
- *Attempt 1 — push the dog toward the hex interior.* Guarantees separation, and **parks
  the dog in the traffic lane**: `kerbDir()` stands a street ped 0.30 hex out on the kerb
  normal *precisely* to keep it off the centre line where the cars drive, so "inward" is
  "into traffic". Measured, not assumed: street dogs sat 5.3-8.2px from centre, *inside*
  their owners at 7.5-9.2px, 19 samples in-lane across 3 seeds.
- *Shipped — branch on the terrain.* On a **road**, offset perpendicular to the ped's own
  outward vector: that runs the dog *along the kerb* at its human's exact depth. On **open
  ground** nothing can run it over, so offset along **x**, where the projection is widest
  and the pair always reads as two — and step toward the interior so a human near the tile
  edge doesn't sling the dog over the neighbour and onto the clamp. Offsets are computed in
  **pixels**, then divided back into hex units. The dog's head, tail and collar mirror on
  `d.f` so the leash lands on the neck and never crosses the body.

**Census** — PASS, `pageerrors: 0`. Every metric **exactly flat** (`pop 150332 +0`,
`roads 5706 +0`, `developed 6174 +0`, `life.dogs 90`), which is the point: a draw-only /
`Math.random` vector must not move the seeded stream, and it didn't. Tile histogram
empty by construction — this vector touches no terrain. `probe-dogs.mjs`: heeling exact
**100%**, one leash per hand **yes** (`shared 0`), dogs reach the street **yes**, stamped
**10/10** (tooltip names them *Good dog*).

**Visual** — `VISUAL: PASS` on wide seed 42 + seed 7 (agents asked the *cumulative*
question: do the new dark strokes compound into dirt/noise on grass and sand? — "sparse,
never clustered, always attached to a person"). Zoomed 6×: dog stands clearly beside its
human, head turned back toward the hand, tail curling away, four legs on the ground,
leash sagging. The seed-1234 pair that a subagent caught **stacked** under the
perpendicular-everywhere rule reads cleanly under the shipped rule. Placement measured
across 3 seeds, ~800 samples/rule:

| rule | park leash gap | street dog vs owner, from centre | in-lane |
| --- | --- | --- | --- |
| inherited free orbit | 6.7px *(and ~0 when vertical)* | 8.2-11.9 vs 4.9-9.3px | 9 |
| perpendicular everywhere | 9.6px | 11.2-11.9 vs 7.5-8.1px | 1 |
| **shipped (branch on terrain)** | **13.6px** | **11.2-12.3 vs 8.4-9.6px** | **0-1** |

**Verdict — SHIPPED** (inherited work, re-gated and repaired).

### Three transferable findings
- **A hex-unit offset is not isotropic, and a diorama is drawn in pixels.** The blob was
  not a logic error; it was `r` meaning 32px across and 16px down. Anything that positions
  one entity *relative to another* — leashes, hand-holding, a queue, a conversation —
  must size its gap in **screen pixels** and divide back, or it will read at one angle and
  collapse at another. The old draw code sidestepped this by never separating two entities.
- **The safe direction is a property of the ground, not of the geometry.** "Push toward the
  interior" and "hold the kerb depth" are both correct — on different tiles. Peds already
  encode where it is safe to stand (`kerbDir`, `pedWalk`, `strollable`); an entity that
  attaches to a ped should read those decisions rather than invent a placement rule that is
  right in a park and lethal on a street. **Reuse the host's legality, not just its hex.**
- **A subagent's `VISUAL: FAIL` is evidence, not a verdict — read its *reason*.** One agent
  failed the downtown clip for "dogs are below this clip's resolution": inconclusive, not a
  defect, and it cost nothing to overrule *after* answering the question at 6×. Another
  failed on a genuine stacked pair that three wide-frame PASSes had missed. The zoomed gate
  found both real bugs here; neither was visible at native resolution, and **neither moved a
  single census metric**. A gate that only reads whole frames cannot see a 4px animal.

## Iteration 94 — the streets stop crosshatching (2026-07-10) [holistic step-back]

**Vector** — Transport × Polish. A **FIX**, chosen by the step-back rather than by rotation:
the holistic pass ran *first*, and what it found set the vector.

**How it was found.** Three agents read un-zoomed frames (seed 42 day, seed 7 day, seed 1234
at `t=0.72`). Two of them, on *different seeds*, unprompted, named the **same** element: the
core's roads had "merged into busy speckly static", "cross-hatched intersection marks tile
after tile", "a muddy grey web". That convergence is the whole value of the step-back — no
single vector's gate would ever have looked at roads.

**Both wide agents then mis-diagnosed it, and the zoom overruled them.** They blamed *value*
("roads too close in lightness to roofs, everything mushes into one grey mass"). Two zoomed
downtown adjudicators independently found value separation was **fine** — roads are distinctly
darker than ground and roofs — and located the real cause: the **dash geometry**. A wide frame
is good at *localizing* a complaint and bad at *explaining* it. Had I fixed the reported
problem (re-tone the asphalt, again — that was iter 86) I would have darkened a coast that was
never too light, and left the actual defect untouched.

**The defect.** The `T.ROAD` draw case dashed from the hex centre toward **every** road
neighbour. On a straight run (two opposite neighbours) that reads as a dashed centre line —
which is why it looked right for 93 iterations, while roads were sparse. As downtown densified,
hexes acquired 3–6 road neighbours, and six axes meeting at 60° draw an **asterisk**.
`probe-dash.mjs` measured it: **1856 of 3400 road hexes — 54.6% — were painting an X.**

**Change.** A lane marking marks a lane **through** the hex, never a spoke toward each
neighbour:
- `nn === 2` → draw both spokes. Two neighbours is *one path* — a straight run or a bend — and
  a path cannot cross itself.
- `nn >= 3` → a junction: draw **only the busiest through-axis** (by summed `c.flow`, reusing
  iter 77's traffic tree rather than inventing a second notion of "main street"). Side roads
  stop at the kerb, as they do in life.
- `nn <= 1` → a dead end draws nothing (180 lone ticks pointing nowhere, gone).

At most one line crosses a hex, so **two dashed lines can never meet — X-hexes are 0 by
construction**, not by tuning. The gold arterial trunk loop is untouched.

**The probe changed the design.** My first rule was "busiest through-axis, always" (strict).
The probe's through-axis histogram showed **~10% of road hexes have zero through-axis** — those
are *bends*, and strict would have blanked every corner in the city, trading one defect for a
subtler one. Lenient keeps 169 bends for 4% more ink and is equally X-free. Measured, not assumed:

| rule | dash spokes | share of old ink | bends kept | hexes painting an X |
| --- | --- | --- | --- | --- |
| old (spoke per neighbour) | 8401 | 100% | 169 | **1856 (54.6% of roads)** |
| strict (through-axis only) | 5301 | 63.1% | 0 | 0 |
| **shipped (lenient)** | **5628** | **67.0%** | **169** | **0** |

**A correctness trap, caught before it shipped.** The three hex axes are the *collinear-opposite*
neighbour pairs `(0,1) (2,5) (3,4)` — and they are the **same for both row parities**, now frozen
as `NBR_OPP`. The obvious pairing — "which move walks back to where I came from" — gives
`(0,1) (2,3) (4,5)`, because index 2 means *up-right* on even rows and *up-left* on odd ones.
Those are **inverse steps, not opposite neighbours**; a "through line" drawn across them bends.
Verified numerically (`cross === 0 && dot < 0` on `px()` coords, both parities) before a line of
draw code was written.

**Census** — PASS, `pageerrors: 0`. Every metric **exactly flat** (`pop 150332 +0`,
`roads 5706 +0`, `developed 6174 +0`), as a draw-only change must be. Tile histogram empty by
construction. Note `boulevardTrees 1210 +0` is a real check, not a formality: street trees are
gated on `ewN`/`diagN`, which the rewrite recomputes — flat proves the rewrite preserved them.

**⚠ `solarRoofs` is a flaky census metric (±1).** It read `+1` on the first post-change run and
`+0` on two identical re-runs of the same bytes. `c.solar` is set by a `hashCell` salted with
`year` (L1126), and `year` advances with ticks, so the metric appears to race the tick count.
**It is not a growth signal and a ±1 on it is not evidence of anything.** Don't chase it; do
re-run before believing any single-unit move on it.

**Visual** — `VISUAL: PASS` ×3. Before/after downtown clips at seeds 42 and 7: "the X/asterisk
crosshatch is gone", "through-streets now read as continuous single lines running across the
core", "the grid is MORE legible, not less", gold arterials intact, bends render as one path,
no new defects. One agent ran a pixel diff unprompted: **1.7% of pixels changed, confined to the
lane dashes and arterial marks** — independent proof the change is scoped. Whole-frame pass over
seed 42 day, seed 7 day, seed 1234 **true night**: coherent, no z-tears, no floating tiles, and
the core "reads as a street *hierarchy* instead of uniform speckle."

**Perf** — PASS, and *faster*, which is the point of deleting 33% of the stroke calls. Measured
3× before and 3× after in the same session under the same load; judged on the minimum:
day **32.72 → 32.44 ms**, night **37.00 → 36.55 ms**. Baseline day 31.33 / night 37.22.

**Holistic step-back (the other half of this iteration).** The night "no lights" alarm was a
**false positive worth recording**: an agent read `t=0.72`, which the HUD calls *SUNSET*, and
reported "no emissive night lighting, unlit pier". Night lighting is extensive (`LITAMT`,
`colLit('glass',…)`, unlit-pane punching, neon, floodlit pitches, uplit civics). A true-night
frame (`t=0.9`) came back "60–70% of built area carries lit windows… the pier is NOT unlit…
coherent, no bloom or firefly speckle." **`t=0.72` is dusk, not night — shoot `t≈0.9` to gate
lighting.** Otherwise the city reads as balanced and beautiful at all three frames.

**Verdict — FIXED.** (A compounding regression, found by the step-back, measured by a probe,
removed by construction rather than by tuning.)

### Four transferable findings
- **A wide frame localizes a complaint; it does not diagnose it.** Two agents agreed on the
  symptom *and* on the wrong cause. Zoom before you fix — the cheap zoom clip (`--shots downtown`)
  saved this lap from re-toning asphalt that was already correctly toned.
- **"Reach toward each neighbour" is a junction asterisk waiting to happen.** In a hex grid,
  any per-neighbour radial draw — dashes, wires, hedges, desire paths, power lines — is fine
  while the network is sparse and becomes crosshatch exactly where the network gets *interesting*.
  Mark a **through-line**, not spokes. The bug was invisible for 93 iterations because it was
  seeded by density the loop itself added.
- **`NBR_OPP = [[0,1],[2,5],[3,4]]`, parity-free** — the collinear axes. The intuitive
  "walk-back" pairing `(2,3) (4,5)` is inverse *steps* and will bend any line drawn through it.
  Anything that wants "the street that runs through this hex" should use `NBR_OPP`.
- **Let the probe pick between candidate rules before you write the draw code.** The
  through-axis histogram vetoed my first rule (it would have blanked 169 bends) for the cost of
  one extra column in a table. Two rules, one measurement, no revert.

## Iteration 95 — the showers reach the ground (2026-07-10)

**Vector** — Sky & atmosphere × Deepen/interconnect.

**How it was found.** Nature was the stalest domain (last real vector: iter 76; 88 reverted),
but it is **additively saturated** — forest succession, redwoods, wildfire→`BURNT`, blooms,
vineyards, orchards, fairy rings, hedges and a patchworked `EMPTY` all already exist, and
`BURNT` reads **0** at all nine census points, so its fire ecology is invisible anyway. Rotating
to Sky instead: `cl.rain` was referenced in exactly **two** places — seeding meadow blooms
(L1182) and spawning iter 89's **rainbow** (L4546).

**The defect.** Rain *was* drawn: six 6px ticks at `py2+10..py2+22`. But the cloud sits at
`py2 = cy-185-cy*0.52`, so the shower stopped **~200px of clear air short of the city**. Iter 89's
comment calls its bow "refracted light standing in this shower's own drops" — standing in drops
that never arrived. The rain watered meadows it never touched.

**Change (draw-only).** A shower now falls the whole way to the ground it is watering:
- a **grey belly** on raining clouds (the two lower puffs only) — at whole-city scale this, not
  the drops, is what tells the eye which of seven clouds is the one raining;
- a soft **dark shaft** from belly to ground, two nested trapezoids (skirt + core) under one
  vertical gradient, so the column has no cut edge and fades at both ends;
- **pale drop-streaks** over the shaft — 10 dashed columns, one `setLineDash` and a scrolling
  `lineDashOffset` each, so a whole drop field costs ten stroke calls;
- a **damp ground patch** centred on the shaft's **foot** (`cx-rlean`), not on the cloud.
`rlean` (the downwind lean) is hoisted above the shadow block precisely so the wet ground can
know where the drops actually land. Rim-faded by `pa` on `ROWMIN`/`ROWMAX`, reusing 89's grammar,
so a shower is spent 2 hexes before the plate edge and never rains into the void.

**The measurement that turned the iteration around.** Two tunings shipped a streak-only veil;
the zoom gate passed both and **every wide-frame reviewer called it invisible**, twice. Rather
than tune a third time, `probe-rainink.mjs` diffed the canvas against HEAD inside the veil's
bbox, against an equal box elsewhere as the **animation noise floor** (peds, boats, shimmer move
between two loads). Seed 42, `dsf=1`, tight bbox:

| veil | shower Δlum mean | control (noise) | ratio |
| --- | --- | --- | --- |
| streaks only, α .52, 10×1.4px | 2.27 | 2.33 | **0.98×** |
| + dark shaft, α .09/.11 | 4.29 | 2.14 | 2.01× |
| **shipped** — shaft α .13/.16 | **5.73** | 2.35 | **2.44×** |

The veil at its *heaviest* streak tuning perturbed the frame **exactly as much as the
pedestrians did**. The bug was never density: `rgba(120,146,176)` has lum ≈143 and the sunlit
city it fell on is lum ≈150–190. **Alpha cannot rescue a colour that matches its background.**
Cloud belly, by contrast, always landed: `232,224,206 → 204,200,189`.

**Census** — PASS, `pageerrors: 0`. Every metric **exactly flat** (`pop 150332 +0`,
`roads 5706 +0`, `developed 6174 +0`); tile histogram empty by construction. A draw-only change
that touches no terrain and draws no `rng()` must not move the seeded stream, and it didn't.

**Visual** — `VISUAL: PASS` ×3 on the final build (the two earlier tunings each drew
`VISUAL: FAIL` ×3 on the wide frames, un-enhanced). Wide seeds 42/7/1234 "faint-but-findable…
they read as RAIN… not too dark, buildings keep their colour"; downtown 3× clip — the highest-risk
frame, dark shaft over dense towers — "tower stripes, streets and roof detail stay fully legible…
reads as weather, not a dirty rectangle"; night `t=0.9` restrained, lit windows intact; zoom 3×
resolves into wind-slanted drops with soft ends and the damp patch under the foot. Seed 1234's
reviewer, unprompted: the bow **"now reads as a bow standing in a real shower"** — the coherence
this vector existed to buy. One agent: "if anything it errs slightly toward faint" — the safe
side of the darkening risk, so it ships there.

**Perf** — PASS ×3 sequential, judged on the minimum: day **33.11ms** (baseline 31.33, +5.7%),
night **37.22ms** (+0.0%). Iter 94 left day at 32.44ms, so the shower costs ~0.7ms/frame:
two trapezoid fills and three gradients per raining cloud, ~2 clouds a city.

**Verdict — DEEPENED.**

### Four transferable findings
- **Alpha cannot rescue a colour that matches its background.** The single most useful result of
  the lap, and it inverts the instinct. Two rounds of "more ink" (α .30→.52, 9→12 columns, 1→1.4px)
  moved the measured signal from 0.79× to 0.98× of the noise floor — *nothing*. Legibility at
  distance is **luminance contrast**, not coverage. A shower reads from across a city as a column
  **darker** than what stands behind it; drops resolve only up close. Body first, drops second.
- **`probe-rainink.mjs`: diff the canvas against HEAD, and diff a control box too.** A raw pixel
  delta means nothing without a noise floor — this city animates, so two loads differ by peds and
  boats regardless. Shower-box Δ vs control-box Δ is the honest question. Note the *signature*
  matters as much as the mean: the shower moves every pixel moderately (p99 29) while the noise
  moves a few pixels hugely (p99 46). A coherent shape at Δ8 is obvious; scattered pixels at Δ25
  are not. **Measure before you tune a third time.**
- **The wide gate and the zoom gate can disagree, and both be right.** Zoom passed all three
  tunings; wide failed the first two. Iter 94 taught "zoom before you fix"; the complement is
  **the wide frame is the product** — the camera renders at `scale ≈ 0.59`, so a 1.2px stroke is
  sub-pixel on screen and a feature that only exists at 3× does not exist. When the two gates
  split, don't pick a side: build the feature so it has a cue at *each* scale (dark shaft for the
  wide frame, pale drops for the zoom). And ask wide reviewers for **no enhancement** — an agent
  that contrast-boosts will confirm any feature you like.
- **An entity attached to another must be sited from where the first one LANDS, not where it is.**
  The damp patch first sat at `cx-16*s` while the drops landed at `cx-rlean` (27–63px away): a
  causeless grey smudge on the ground, which a reviewer duly reported as "fog greying out the
  central city". Same family as iter 93's dogs (reuse the host's *legality*) and iter 94's dashes
  (mark the through-line): **derive the dependent thing from the parent's geometry, not its
  origin.** Hoisting `rlean` above both draw sites is what made that possible.

### Shower scratch (gitignored, recreate)
`probe-rain.mjs` — which clouds rain, and the `&step=` that walks one clear of the rim
(seed 42 → `step=600`, seed 7 → `600`, seed 1234 → `560`). Clouds are **`rng()`-spawned, so they
must never be `?flood=`ed** — the shot would lie. `shot-rain.mjs <seed> <step> <out>` clips the
cloud→ground column in CSS screen coords (`world*scale+off`, the transform `__find`/`__ents`
publish). `probe-rainink.mjs <seed> <step>` is the ink/noise-floor measurement above; it reads
luminance straight off the live canvas, so it needs no image decoder.

## Iteration 96 — the woods grow a second species (2026-07-10)

**Vector** — Nature × **Polish (SHIPPED)**. Rotation picked the domain, saturation picked the
kind. Nature is the stalest domain (last ship: **76**; 88 was reverted) *and* the header calls it
**additively saturated** — "Nature's next real move is Deepen or Polish, not a new element." This
is that move: it adds no tile, no entity, no CA pass, and no `hashCell` *placement*. It changes
only how an existing glyph draws.

**The defect (found by grep, not by the ledger).** `tree()` (L2135) was **one glyph** — a trunk
plus two overlapping circles — and it was called from **18 sites**: `FOREST`, `PARK`, `GARDEN`,
`MEADOW`, `SHOREPARK`, `PLAZA`, the boulevard allée, and `EMPTY` succession. Every tree in
Solvista, from the hill woods to the civic forecourt, was the same species at a different scale.
~2,700 crowns per frame, one silhouette. This is the third time the header's warning has bitten:
**`GROWTH.md` is the loop's memory, not the artifact's inventory.** The first idea this lap was
*street trees* — which turned out to already exist (`c.treed`, L1143, a tree-lined boulevard with
an allée down both sides). Grep the seam before designing.

**Change (draw-only).** `treeSp(gx,gy)` → `0` broadleaf / `1` conifer / `2` poplar, and `tree()`
branches on it:
- **conifer** — three stacked triangular tiers over a short trunk, each tier leaning further
  downwind than the one below (`lean = w*(0.3+i*0.35)`), so the spire bends with the same
  `WINDA` gust the round crowns ride;
- **poplar** — one narrow upright plume, a tall ellipse with a lighter inner highlight;
- **broadleaf** — the original two-blob crown, byte-for-byte.
Species is hashed from the tree's **own sub-hex position** (`hashCell(round(gx*8),round(gy*8),
seedNum^0x7A3E)`), not its cell, so the four trees in one forest hex mix rather than parroting
each other. Conifers are weighted **inland**: `p = 0.08 + 0.30*inland`, where
`inland = clamp((SHOREX-gx)/30, 0, 1)`. Poplar is a flat ~6% accent at any distance. The strand
stays broadleaf-and-palm; the hills go coniferous. `ORCHARD` and `VINEYARD` were checked and do
**not** call `tree()` — they have their own draws — so the mixed species cannot break the one
place uniform rows are correct.

**Census** — every metric **+0**, tile histogram **empty**. That is not a null result, it is the
proof: a draw-only change that touches no terrain and consumes no `rng()` draw *must* read exactly
flat, and it did, on the first run. (Contrast iter 91, where a "safe" substitution cost −22% pop.)

**Growth signal** — `probe-species.mjs` (gitignored scratch) wraps the real `window.tree` and
tallies **one rendered frame**, so it counts crowns actually painted, not cells that could host
one. Over the 3-seed × 2-era matrix, **6,976 trees**: broadleaf **68.2%** · conifer **25.5%** ·
poplar **6.3%**. The inland gradient is real and monotonic:

| band | n | conifer | poplar |
| --- | --- | --- | --- |
| coast (0–.4) | 2200 | **14.7%** | 6.5% |
| mid (.4–.75) | 2118 | **25.5%** | 6.3% |
| hills (.75–1) | 2658 | **34.3%** | 6.1% |

Species is **STABLE across eras** (same coords, 1985 vs 2035 → identical): a tree does not change
kind as the city ages, because `year` is not in the hash. The probe asserts this.

**⚠ The probe lied first, and the shape of the lie is reusable.** Its first run put **100% of
trees in the `hills` band** — a dead gradient. The feature was fine; the *probe* was broken.
`SHOREX` is a top-level **`const`**, so it lives in the global **lexical** environment: it
resolves by bare name inside `page.evaluate`, but it is **NOT** a property of `window`.
`window.SHOREX` was `undefined` → `(undefined-gx)/22` → `NaN` → and `NaN < 0.33` is `false`, so
every tree silently fell through to the last band. **`NaN` in a bucketing chain does not throw,
it picks the final bucket.** Note `window.tree` and `window.treeSp` *do* resolve — function
declarations become `window` properties, `const`/`let` do not. That asymmetry is why
`probe-dash.mjs` can call `cellAt`/`T`/`G` by bare name and must.
Fixing the probe also exposed a real (if minor) miss: `/22` clamped the inner **quarter** of the
plate flat (trees run `gx` 1.5→47.5 against `SHOREX`=44). Widened to `/30` so the gradient uses
the whole landmass. **Measure the range before you pick a divisor.**

**Visual** — 3 agents, 3 framings, no enhancement (iter 95's rule). Wide seed 42 + wide seed 7:
both PASS, both saw varied silhouettes, no z-order tears, no blown-out color, and specifically
reported the forests are **not** darker than a sunlit city warrants — the kelp failure mode, asked
for by name. Magnified `tileshot` on a FOREST and a PARK: PASS — all three species identifiable,
conifer tiers read as "a coherent stacked spire, not floating triangles," crowns rooted to trunks,
greens inside the existing palette. It called the wood *"conifer interior, broadleaf edge."* That
is emergent — species is positional, not edge-aware — but it is what a real wood looks like.

**Perf** — `tree()` is the single hottest draw call in the renderer, so the frame-time gate was
run despite this not being a step-back. 3 sequential passes, and the readings are **tight**
(day 33.55 / 33.56 / 33.55ms), so this is signal, not the ±30% load noise iter 40 warned about:
**day 31.33 → 33.55ms (+7.1%)**, **night 37.22 → 37.83ms (+1.6%)**. PASS (budget 15%), but
**+7.1% is the largest single-iteration day cost in recent memory** and it is honest: a conifer
spends 4 `col()` calls and 3 filled paths where a broadleaf spends 3 and 2, on ~2,700 trees/frame.
Banked as a watch item, not a problem — but the next Nature vector should not also be in `tree()`.

**Verdict — SHIPPED.** The most-repeated glyph in the city stopped being one glyph. Draw-only,
census dead flat, three visual PASSes, perf inside budget. Nature's saturation note stands, and is
now better evidenced: the payoff here came from *polishing what the domain already had*, not from
a fifth plant.

## Iteration 97 — the coast learns to talk (2026-07-10)

**Vector** — Water & coast × **Interaction/UX (SHIPPED)**. Both axes pointed here. Water & coast
was the stalest **domain** (last vector: 90), and Interaction/UX was by far the stalest **kind**
— last touched at **71**, twenty-six iterations ago. It is also the kind the header's own
saturation rule prescribes: Water & coast's additive cells are spent (6 new elements, the dune CA
at 90, the esplanade at 22, five Deepens), and "when every domain's obvious additive moves are
spent, steer toward Deepen / Polish / **Interaction**."

**The defect (found by grep, not by the ledger — again).** `drawPierAt()` is called from **two**
draw cases, `T.WATER` (L2434) and `T.BEACH` (L2586), because the deck crosses the waterline. But
`describeTile()` only ever saw the **tile underneath**. So hovering the ferris wheel — the single
most eye-catching object on the coast — reported:

> **Ocean** · *The open sea.* · Value 41%

The pier has been drawn since iter ~6 and the esplanade since **iter 22**; both are draw-time
features derived from terrain, and **neither was ever told to the tooltip**. The lifeguard tower
(`hut`) was mute too. This is the invariant "keep the hover tooltip in sync" failing quietly for
~75 iterations, and it failed precisely *because* these features carry no tile type of their own —
nothing in `TILELABEL` was missing, so nothing looked wrong.

**Change (tooltip-only; no terrain, no `rng()`, no new draw work).**
- **`pierAt(x,y)` factored out** (L1827). The draw condition `year>=1986&&y===pier.y&&...` was
  written out **twice**, and disagreed with `onPier()`'s `year>=1987`. Now: `pierAt` = what is
  *drawn* (and named); `onPier` = `year>=1987&&pierAt(x,y)` = where a ped may legally *walk*. The
  deck exists a year before it opens, which is both true to the code and true to life. Both draw
  sites now call `pierAt`. One predicate, three readers — the iter-94 lesson (mark a through-line,
  not spokes; keep one source of truth) applied to logic rather than geometry.
- **The pier names itself, before the tile under it**: `Pier` / `Snack stall` (`x===pier.x1-1`) /
  `Ferris wheel` (`x===pier.x1`), each with `Opened 1986`, plus a `Not yet open` flag in 1986.
- **`Esplanade`** flag on the beach hex that carries the deck — gated on the *same* `espAt(y)` the
  draw uses, so the tooltip cannot claim a plank that isn't painted.
- **`Lifeguard tower`** flag, gated on `c.t===T.BEACH` to match its draw case.
- **Dune CA state surfaced**: `Sand N%` (`c.sand/DUNECAP`) and a `Marram grass` flag past
  `DUNEMARRAM`. Iter 90's accretion was visible in the *silhouette* and nowhere in words.
- **`Tide`** on every tidal tile — `High water` / `Low water` / `Flooding` / `Ebbing`. `TIDE` was
  already a live global driving the damp margin; `TIDEV` (the *sign* of its derivative) is new, and
  is computed from the **same hoisted phase** as `TIDE` so the two can never disagree. The sea is
  the one part of the diorama that changes while you look at it, and now it says so.
- **`Value` suppressed on open water** (`WATER`/`KELP`/`MARSH`, and on pier hexes). Land value on
  the seabed is noise printed as data.

**Census** — `pop`/`roads`/`developed` **+0**, tile histogram **empty**, `promenade` +0. VERDICT
PASS, 0 page errors. A tooltip-only change must read exactly flat, and it did.

**⚠ `solarRoofs +4` / `greenRoofs +1` moved, and it is NOT this change.** The invariant says an
unintended metric move is a red flag, so I ran the control: `git stash` the edit, re-census
pristine HEAD against the same baseline → **the identical +4 / +1**. Cause: those two passes salt
their hash with `(year*23)|0` (L1126/L1136), and `year` is a *continuously advancing float*, so the
salt quantizes differently depending on exactly where tick accumulation lands. **These two metrics
jitter ±4 run-to-run under a null edit.** Don't chase them; do run the stash-control before
believing any small non-core delta.

**Growth signal** — `probe-coasttip.mjs` walks every hex over the 3-seed × 3-era matrix, calls the
*real* `describeTile(c,x,y)`, and asserts the tooltip against the draw's own predicates:

| | 1985 | 2005 | 2035 |
| --- | --- | --- | --- |
| pier hexes named | 0 (not built) | 17 | 17 |
| dune `Sand` rows | 62 | 94 | 110 |
| of which `Marram grass` | **0** | 55 | 83 |

34 pier hexes named across the matrix (22 `Pier` · 6 `Snack stall` · 6 `Ferris wheel`), 9 lifeguard
towers (1/city), 7,773 tide rows. Four assertions hold at **0** violations: no pier hex still says
Ocean/Beach, no water hex prints `Value`, no dry hex *lost* `Value`, no dry hex gained `Tide`.
The dune table is the nicest result — **marram is 0 in 1985** and climbs, because sand hasn't
reached `DUNEMARRAM` yet. The tooltip is reading live CA state, not a static label.

**The cross-check that cost nothing:** esplanade rows total **189** — and the census's independent
`promenade` metric is **189**. The tooltip predicate and iter 22's draw agree exactly, by
construction. Per the header's rule, **no new census metric was added**: the existing tally already
measured this.

**⚠ All four tide labels are reachable, but a 17-second sample said otherwise.** The first check
watched a live page for 17s and saw only `Low water`, which looks exactly like a dead-label bug.
It isn't: the tide period is ~140s (`waveT` advances ~1.0/s, `×0.045`), and seed 42 happened to
start in the **trough**, where `sin` is flattest. Driving `waveT` across one full period and
reading the *real* tooltip gives `Low water 70 · High water 50 · Flooding 20 · Ebbing 20` — the
arcsine shape you'd predict (slow at the extremes, fast through the middle). **A slow signal
sampled briefly is indistinguishable from a stuck one. Sweep the phase; don't watch the clock.**

**Visual** — tooltip changes can't be shot by `shoot.mjs`, and `hovershot.mjs` aims at *entities*
via `__ents`. So `shot-coasttip.mjs` (scratch) aims the real cursor at a **hex** chosen by the
draw's own predicate, zooms the artifact's camera, and centres the clip on the cursor (the panel
flips left/up near frame edges). 4 agents, no enhancement (iter 95's rule): pier/esplanade seed 42
**PASS**, pier seed 7 **PASS**, dune+ocean **PASS** (`Sand 100%` · `Marram grass` · `Tide Low
water`, and ocean shows `Tide` with **no** `Value`), whole-city seeds 42+7 **PASS** — coast clean,
hills healthy, no z-tears.

**⚠ The one FAIL was the shot, not the product — and it taught the real lesson.** Seed 7's
esplanade tooltip read **`Jogger` / "Logging shoreline miles."** A jogger was standing on the deck,
and `pickEntity()` beats the tile — *correct* behaviour, poetically apt, and it hid the row under
test. Fixed by `&flood=joggers:0` (the debug hook exists for exactly this) plus picking the
candidate hex with the most clearance from any stamped entity. **Any tile-tooltip gate must clear
entities off the target hex first, or it photographs the wrong tooltip.**

**Perf** — not run: no per-frame draw work added (one `Math.cos` per tick); `describeTile` runs on
`mousemove` only. Iter 96's `tree()` +7.1% remains the open watch item.

**Verdict — SHIPPED.** The most-photographed structure on the coast stopped introducing itself as
the ocean, and the coast's live simulation state — tide, sand, marram — became legible without a
single new pixel. Census dead flat, five visual PASSes, one honest FAIL corrected. **The header's
warning holds a fourth time: `GROWTH.md` is the loop's memory, not the artifact's inventory —
grep the seam, not the ledger.**
