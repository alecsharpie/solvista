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
| **Nature** | 4, 26, 29, **102** | 1, 13, 60 | 37, 46, 67, 76 | ~~46~~, ~~88~~, ~~101~~ | U4 | 53, 96 | |
| **Water & coast** | 6, 10, 12, 16, 20, 33 | 90 | 17, 25, 51, 65, 72 | 22 | | U2, 44, 58, 79 | **97** |
| **Urban fabric** | 32, 62 | 7, 23, ~~82~~ | 38, 54, 68, 92 | 47 | 8, 14, 24, **U4** | 75, 83, 86, **98**, **99** | |
| **Transport** | 2, 9, 21, 31, 48 | 77 | 28, 39, 55, 63 | 5, 15 | U4 | U1, U3, 70, 85, 87, 94 | |
| **Civic & culture** | 3, 11, 18, 30, **100** | 36 | 36, 59, 66, 80, 91 | 45 | | 73 | 52 |
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
- **ROTATION.** Stalest domains are **Sky & atmosphere** (last vector 95) and **People &
  activity** (93); Sky has an **empty New CA rule cell** and no Connect/Scale, People has no Scale.
  Recent kinds: 98 Polish · 99 Polish · 100 New element · 101 Connect(reverted) · 102 New element —
  so **Deepen is the coldest kind** (last at 95), and **New element has now run twice in three laps
  — do not pick it next.** Note **Nature × Connect was attempted and reverted three times** (46, 88,
  101) and is the row's graveyard: 46 found it geometrically impossible, 88 found it has no host
  draw-only, 101 found the host *and the land* and lost on **shape**. Do not re-open it as a
  *corridor*. **Cue (e½) is now CLOSED — iter 102 shipped the blob 101 prescribed** (the commons),
  so the interior has its lung; **do not plant a second one.** Nature's remaining cold cells are
  Connect (graveyard — leave it) and Scale.
- **⚠ NO `probe-*.mjs` IS TRACKED BY GIT — the ledger cites tools the repo does not carry (iter 101).**
  `.gitignore` ignores `probe-*.mjs` and `shot-*.mjs` so a killed iteration can't dirty the tree. The
  side effect: **every probe this ledger tells you to reuse exists only as an untracked leftover in
  whoever's worktree wrote it.** `git ls-files` shows *zero* tracked probes; `probe-quadtone.mjs` —
  which iter 100 called "the shape probe for any *does this tile read at city zoom?* claim" — **is not
  in the repo at all.** So: describe a probe's *method* in the entry (that survives), and if a probe
  is genuinely meant to outlive its iteration, **`git add -f` it** and say so. Do not write "keep it"
  and assume git kept it.
- **⚠ CONTRAST IS NOT TRACEABILITY — for a LINEAR feature, legibility ≈ contrast × WIDTH (iter 101).**
  Iter 95 says legibility at distance is luminance contrast, not coverage. True, and **it does not
  imply a high-ΔL line can be followed.** Iter 101's greenway spine measured **ΔL 22–35 above ordinary
  `PARK`** — against a `PARK`-vs-`MID` reference of **ΔL 7–11**, a pair everyone calls obviously
  distinguishable — and **nine agent reads still could not trace it**, because at fit zoom a one-hex
  ribbon is ~1 screen pixel: contrast *without a shape*. **Below ~2–3 hexes across, a corridor is
  untraceable at any ΔL.** `probe-gwtone.mjs` answers "does it separate?"; it **cannot** answer "can
  it be followed?" — that one needs width, and an un-zoomed frame. Don't grade a line with a tone probe.
- **⚠ ORNAMENT YOU CANNOT SEE AT DISTANCE STILL AVERAGES INTO THE TILE'S TONE (iter 100).** Iter 95
  established that legibility at distance is luminance contrast, not coverage. The corollary: **coverage
  destroys it.** `QUAD` was given a `turf` base of lum **144** to separate it from `PARK`; the tile
  *measured* **160**, because its own mower stripes (`turf×1.12`, most of the face) and cream path
  averaged the sampled tone **+16 back toward park**, collapsing QUAD-vs-PARK to **ΔL 2.9** on seed 42.
  Damping the ornament (stripes ×1.05) and re-cutting the base restored **ΔL 19–23**. **Measure the tile
  as RENDERED, not as specified** — `probe-quadtone.mjs` samples the real canvas at default fit zoom
  (3×3 disc per tile centre) and reports per-type mean sRGB/luminance, with `PARK vs FOREST` (ΔL 31–36,
  obviously distinguishable) and `PARK vs MEADOW` as built-in scale references. **It is the shape probe
  for any "does this tile read at city zoom?" claim** — and it settled a dispute three rounds of agent
  opinion could not. Two agent verdicts were outright unreliable (one described a tower facade inside a
  quad clip); a number was not.
- **⚠ THE CELL BETWEEN TWO CLUSTERED MAJORS IS THE STREET THEY BOTH FRONT — there is nothing to build
  there (iter 100).** Iter 91's `QNEAR=2` comment ("far enough to leave one between") reads like a hook
  for a shared civic square. Measured across 3 seeds, that gap cell is **ROAD 10/16 · PLAZA 4/16 · bare
  lot 3/16**, and *shared* lot cells adjacent to two institutions number **0, 0, 3** — `siteQuarter`
  requires `roadNear()`, so majors meet on a road **by construction**. Greening/paving it would sever
  the civic mile the iter-45 bunting is strung along. Institutional space goes **behind** an institution
  (`probe-grounds.mjs`), where its neighbours are overwhelmingly `MID`.
- **⚠ `c.dist` IS CONFETTI, NOT NEIGHBOURHOODS — do not build anything on it (iter 99).** The district
  majority-vote CA (L1201) looks like it partitions the city into 4 quarters; measured over the ~1100
  `DEV` cells it runs on, `sameNbr` is **45.6–50.2%** against a **25%** chance floor, with **535–580
  patches** and a largest patch of **12–21 cells**. It coarsens far slower than development re-injects
  fresh random `dist` into new cells. `DISTCOL[c.dist]` is therefore ~random per building — harmless
  on COM's tiny shopfront signs, but **tinting any large surface by district paints noise.** Fixing
  the CA is a real (stream-perturbing) vector; until then, treat `c.dist` as decoration.
- **⚠ COLOUR KEYED TO THE SAME FIELD AS HEIGHT IS NOT VARIATION (iter 99).** MID drew
  `bodyN=v>0.72?'terra':'cream'` while `th=22+c.v*14` — so colour was a restatement of height
  (`corr` **0.76–0.79**), ~73% of the city's commonest building wore one cream, and its parapet was
  `creamDk` **100%** of the time. Mixing in an independent seed-salted hash (`tone=mv*0.72+v*0.28`)
  dropped `corr` to **0.19–0.31** and cost nothing: **`col()` memoizes on `name|f`, so extra colours
  buy cache entries, not draw calls.** Palette variety is the cheapest beauty in the renderer.
  **`RES` still has this exact defect — see open cue (f).**
- **Stash-control the PERF gate, not just the census (iter 99).** Iter 97 established the census
  stash-control. The same trick settles frame time, which is otherwise unreadable on a loaded shared
  machine: iter 99's change read **+0.28ms day** and three passes drifted *monotonically upward*
  (34.00→34.44→34.50) — load, not code. Re-running the **pre-edit** file under the **same** load gave
  day **33.83–34.83ms**, i.e. the post-edit number sits *inside the pre-edit band*. A rising
  pass-over-pass trend within one gate run is the tell. Costs 3 minutes and no tokens.
- **The gitignored backup name is `before.html`** (`.gitignore`, alongside `probe-*.mjs` /
  `shot-*.mjs`). Iter 99 used `_before.html` for a before/after shot and got lucky deleting it — any
  other name is untracked scratch that makes `run-loop.sh` refuse to start on a "dirty" tree.
- **⚠ THE UPGRADE PASS SATURATES — its probability is a weak, expensive lever (iter 98).** `tick()`
  runs ~813 times to 2035 and each runs `ks(240)`=350 `rc()` picks over 4489 cells, so **every cell
  is sampled ~60 times**. A test like `rng()<p` with p≈0.14 fires with probability `1-0.86^60 ≈ 1.0`:
  nearly any lasting `COM` with a quorum *will* tower, whatever `p` says. Consequence: tuning `p` to
  shape the city barely shapes it (steepening it toward the core moved mean tower spread 0.9 hexes
  and core share 1 point) while **costing 21% of the city's towers at 240 pop each**. Before you
  reach for a probability in `tick()`, ask whether ~60 samples have already saturated it. **Shape a
  saturating rule with a quantity that is set ONCE (height, kind, a flag), not with its rate.**
- **⚠ `pop` weights a tower by `h/th`, and `h` grows at DRAW time (iter 98, L3215/L1593).** So
  **raising `c.th` silently costs population and `towerHt`** — the tower gets taller but reaches a
  smaller fraction of its target in the frames the census samples. Iter 98's first height field
  averaged 0.62× where the old one averaged 0.78× and cost **half the city's `tallTowers` (118→56)
  and helipads (76→38)** while looking like a "massing" win. If you re-key a height field, **solve
  its coefficients to hold the old mean** (measure the mean of the old field over the cells that
  actually become towers — `/tmp`-style one-off `page.evaluate`), then redistribute. Holding the
  mean is what turns a shrink into a massing.
- **The CBD is published: `CBDX`/`CBDY` + `CORER`=16 (iter 98, L215).** `genWorld` has always laid a
  founding crossroads (`mainX`,`fy`) and grown the old town around it; it stayed local for 97
  iterations, so **no rule knew where downtown was**. Note `c.val` is *not* a centrality field — it
  diffuses `valueSrc`, whose peaks sit on **parks and water** (0.92/0.74), not on the core. Anything
  that means "near downtown" should use `hexDist(x,y,CBDX,CBDY)`, not `c.val` and not `CTRX/CTRY`
  (the plate's centre, which is not the city's).
- **⚠ A linear ramp is a HALF-PLANE, not a place (iter 98).** The tower rule's `back` =
  `(CTRX+CTRY+10-(x+y))/(G-2)` read high across an entire diagonal *band*, so it could never mass
  anything — hence "the eye finds *a tall side* more than a distinct core". Worse, the founding
  crossroads sits **coastward**, where `x+y` is large and `back` is *small*: it scored the core
  **0.677 against its own 0.782 mean**, so downtown was a literal **dip** in the skyline. Measured
  on HEAD: core towers averaged **0.87×** the height of rim towers and the tallest tower stood
  **33 hexes** from the crossroads on all three seeds. **If a field is supposed to have a centre,
  it must be radial; check its value AT the centre before trusting the comment above it.**
- **⚠ A massing statistic anchored on its own argmax is self-referential (iter 98).** `probe-core.mjs`
  first measured tall-vs-short around the *densest radius-4 disc*, and reported seed 42 as a FAIL
  (ratio 0.90) for a change that worked — because that seed's densest knot of towers is 29 hexes
  from downtown, so the tall core towers counted as "far". Re-anchored on `CBDX/CBDY` the same
  frames read 1.75. **Anchor a "did it concentrate" metric on the thing it was supposed to
  concentrate *around*, never on where it actually ended up.** `probe-core.mjs` now reports both
  (`tallD`, `discD`) and is the shape probe for any future skyline/massing claim.
- **A pure DRAW/height change can be provably stream-neutral (iter 98).** Keying only `c.th` to the
  new field — and leaving the `rng()<p` siting test byte-identical — left `pop`, `roads`,
  `developed`, `towers` at **exactly +0** and moved **zero** tiles in the histogram, while
  `towerHt` +4.7%, `tallTowers` +12.7%, `helipads` +23.7%. Compare iter 91's law: `rng()` draw
  *count* is the invariant. `c.th` feeds no `rng()`-gated predicate (the 2022 growth rule's
  `rng()<0.02 && c.th<160` short-circuits with the draw **first**), so it perturbs nothing. **When
  a vector can be expressed as a property of a thing rather than a decision about which things
  exist, express it that way — the census then proves the change instead of tolerating it.**
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
  **(f) `RES` says its height twice, and its roofs ignore the seed** *(measured by iter 99,
  Urban × Polish, two one-line fixes at L3249–3251)* — `bodyN=v<0.5?'terra':'cream'` against
  `th=9+c.v*7` gives `corr(cream, height)` = **0.868**, the exact defect 99 removed from `MID`;
  and the roof hash is `hashCell(x,y,7)` — a **literal salt**, so **every seed paints the identical
  RES roof pattern**, a quiet breach of the "procedural, new city every load" invariant. Fix by
  salting with `seedNum^…` and mixing an independent draw into the body tone. Draw-only ⇒
  provably stream-neutral. (RES body is *not* clumped — measured `sameNbr` **52.1%**, maxPatch
  **5.3** — so do **not** "fix" patchiness that isn't there.)
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

> **Archive:** the 95 entries before Iteration 93 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

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

## Iteration 98 — downtown stops being a dip (2026-07-10)

**Vector** — Urban fabric × Polish. Took **cue (e)**, the oldest standing cue, banked by iter 92's
holistic agent and independently corroborated by iter 94's: *"the towers are strung along the whole
top edge rather than massing into one skyline; the eye finds a tall side more than a distinct core."*
Two holistic passes, two seeds, same complaint — and no vector had ever answered it.

**Diagnosis (the whole iteration is here).** Wrote `probe-core.mjs` first, because "did it mass?" is
a measurement, not a vibe — the way iter 88 demanded a union-find patch count of any Connect claim.
On HEAD, at 2035, across seeds 7/42/1234: mean pairwise tower distance **24.8 hexes** on a radius-33
plate, only **18%** of towers within 8 hexes of the densest disc, and **the tallest tower standing
33 hexes from the founding crossroads on all three seeds.** Then the number that explained
everything: core towers averaged **0.87×** the height of rim towers (seed 7: **0.72×**). Downtown
was not merely un-massed, it was a **dip**.

Cause: both the siting probability *and* the height multiplier were keyed to
`back = (CTRX+CTRY+10-(x+y))/(G-2)` — a linear ramp down the x+y diagonal. **A ramp is a half-plane,
not a place**: it reads high across an entire band, so it has no peak for a skyline to sit on. And
because the founding crossroads sits *coastward* (large `x`), `back` scored the core **0.677 against
its own 0.782 mean** — the rule labelled "towers cluster inland" was actively making downtown short.

**Change** — Published the founding crossroads as `CBDX`/`CBDY` (+ `CORER`=16) from `genWorld`;
after 97 iterations no rule knew where downtown was, and `c.val` is no substitute (it diffuses
`valueSrc`, which peaks on **parks and water**, not the core). Then keyed **tower height, and only
height,** to `core = clamp(1-hexDist(x,y,CBDX,CBDY)/CORER,0,1)`:
`c.th=(54+c.v*82)*(0.70+0.66*core)`. Siting is byte-identical to HEAD.

Two failed attempts got there, and both are worth more than the ship:
- **Steepening the probability toward the core is a weak, expensive lever.** `tick()` runs ~813×,
  each with `ks(240)`=350 picks over 4489 cells → **every cell is sampled ~60 times**, so
  `rng()<0.14` fires with probability ≈1.0 and the test **saturates**: nearly any lasting `COM`
  with a quorum towers regardless. `0.05+0.40*core` bought **5 points** of core share and cost
  **21% of the city's towers** at 240 pop apiece. Reverted.
- **Raising `th` silently costs pop.** `pop` weights a tower by `h/th` and `h` only creeps up at
  *draw* time (L3215), so a taller target is a smaller realized fraction. A first height field
  averaging 0.62× (vs the ramp's 0.78×) passed the census yet cost **half** the city's
  `tallTowers` (118→56) and helipads (76→38). That is shrinking a city, not massing it. Fixed by
  measuring `mean(back)=0.363` and `mean(core)=0.125` over cells that actually tower, and solving
  `0.70+0.66*core` to **hold the mean at 0.783** while peaking 1.36 downtown vs 0.70 at the rim.

The probe lied once too: anchored on its own densest disc it called seed 42 a FAIL (ratio 0.90) for
a change that worked, because that seed's densest knot sits 29 hexes from downtown. Re-anchored on
`CBDX/CBDY`, the same frames read **1.75**. A concentration metric must be anchored on what the
change concentrates *around*, never on where things ended up.

**Census** — `VERDICT: PASS`, and better than pass: **provably stream-neutral.** `pop 150332 → 150332
(+0)`, `roads +0`, `developed +0`, `towers 300 → 300 (+0)`, and the tile histogram printed **not one
changed type**. `c.th` feeds no `rng()`-gated predicate (the 2022 growth rule's `rng()<0.02&&c.th<160`
draws first, then tests), so nothing downstream moved. What did move is exactly the vector:
`towerHt 22643 → 23701 (+4.7%)`, `tallTowers 118 → 133 (+12.7%)`, `helipads 76 → 94 (+23.7%)`.
Probe, CBD-anchored: `tallD 33.0 → 4.0` hexes, height ratio `0.87 → 1.56`, `hNear 70.3 → 113.4`
against `hFar 80.4 → 72.5`.

**Visual** — Before/after, wide + `--shots downtown`, seeds 42 and 7, two agents, told explicitly not
to enhance. Both **VISUAL: PASS**, and both volunteered the intended reading without being fed it:
seed 42 *"the tallest glass towers concentrate over the founding crossroads, tapering outward,
whereas before they were a fairly even row of equal-height spikes strung across the whole top edge…
outlying towers visibly shorter, giving the edges breathing room"*; seed 7 *"the two tallest spikes
stand isolated along the top edge; in the after the height mass migrates into one coherent
cluster… downtown gains a genuine focal skyline."* No z-order tears despite taller towers — both
checked tops and occlusion against the row in front. No blown colour, no darkening.

**Verdict — SHIPPED.** Cue (e)'s **skyline half is closed**; its *carpet* half (uniform mid-block
density, no interior green) survives as **cue (e½)** and is explicitly *not* addressed — 98 changed
zero tiles by design. Durable results, all promoted to the header: the upgrade pass **saturates**
(shape it with a set-once quantity, never with its rate); `pop` weights towers by `h/th` growing at
draw time (**hold a height field's mean**); a linear ramp has no centre — **check a field's value at
the centre before trusting the comment above it**; and the best version of a vector is often the one
expressed as a *property of a thing* rather than a *decision about which things exist*, because then
the census proves it instead of merely tolerating it.

## Iteration 99 — the walk-ups stop wearing one shade (2026-07-10) [holistic step-back]

**Vector** — Urban fabric × **Polish (SHIPPED)**, plus the 5-iteration holistic step-back. Took the
surviving half of **cue (e½)**. Rotation would have said *Civic & culture* (stalest domain, last
vector **91**), and this is the **fifth** Urban×Polish and the **fourth Polish in six**. Overridden
deliberately: the step-back's own agents, on both seeds, independently and unprompted named the
mid-rise mass as the #1 thing to fix, and the skill says a holistic finding outranks the rotation
table. **Rotation debt is real and now explicit — iter 100 should be Civic & culture, non-Polish.**

**Step-back gates (run first, on pristine HEAD).** Perf, 3 sequential passes, tight readings:
**day 31.33 → 33.72ms (+7.6%)**, **night 37.22 → 38.05ms (+2.2%)**. PASS. That day cost is iter 96's
conifers, still standing and still inside budget. Holistic whole-city, 2 seeds, 2 agents, no
enhancement: both **PASS**. Both volunteered that iter 98's core landed (*"the tallest glass towers
concentrate over the founding crossroads"*; *"a distinct downtown core… not stringing along an
edge"*). Both then named the same defect: *"a uniform carpet… same building palette and density…
reads as noise rather than distinct neighborhoods"* (42) and *"the tan flat-topped buildings compound
into a beige monotone"* (7).

**Two hypotheses, both killed by the probe before a line shipped.** This is the iteration's real
output; `probe-fabric.mjs` cost ~4 minutes and saved two bad ships.
- **"RES body colour is a binary threshold on a smooth field, so it makes big beige patches."**
  *False.* `sameNbrFrac` **52.1%** over RES–RES edges (0.5 = fine mix, 1.0 = carpet), meanPatch
  **1.3**, maxPatch **5.3**. The houses already mix finely; RES is only ~305 of 4489 cells anyway.
- **"Tint the fabric by `c.dist` — a district CA already exists (L1201), and COM shopfronts already
  wear `DISTCOL[c.dist]`."** *This would have painted confetti.* Measured over the ~1100 DEV cells
  the CA actually runs on: `distSameNbr` **45.6–50.2%** against a **25%** chance floor, **535–580
  patches**, largest patch **12–21 cells**. Districts are noise with a faint bias, not regions —
  the majority vote (`votes[best]>=3 && rng()<0.5`, `ks(50)`) coarsens far slower than development
  re-injects fresh random `dist` into new cells.

**The actual defect, once the tile histogram was read instead of guessed.** At 2035 the built mass is
`ROAD ~830 · MID ~460 · RES ~305 · COM ~220 · TOWER ~74`. **MID is the dominant building tile** — the
agents said "mid-rise" and I had been reading the RES branch. And MID (L3290) was:
`bodyN = v>0.72 ? 'terra':'cream'`, with `c.th = 22+c.v*14`, and a roof parapet of `creamDk` for
**100% of them**. So ~73% of the city's commonest building wore one cream, the parapet never varied,
and **colour was a restatement of height**: measured `corr(terra, height)` = **0.76–0.79**.

**Change (draw-only, 4 lines).** A walk-up's colour is now its own seed-salted hash, not a second
reading of the value field: `mv=hashCell(x,y,seedNum^0x3D1B)`, `tone=mv*0.72+v*0.28` →
`terra / cream / sandDk` (ochre), and the parapet varies over the same three darks, with a guard so
a `sandDk` cap never sits on a `sandDk` block. `v` keeps a 28% pull, so tall blocks still *lean*
terracotta — a trend, no longer an identity.

| | HEAD | after |
| --- | --- | --- |
| MID body | cream 73% · terra 27% | cream 43% · sandDk 31% · terra 25% |
| MID parapet | `creamDk` ×100% | 3 tones |
| `corr(terra, height)` | **0.76 – 0.79** | **0.19 – 0.31** |
| MID–MID `sameNbr` | — | 35–37% (chance floor 33% ⇒ grain, not clumps) |

**Census** — `VERDICT: PASS`, and **provably stream-neutral** exactly as iter 98's law predicts for a
property-of-a-thing change: `pop 150332 (+0)`, `roads +0`, `developed +0`, `towers +0`, `towerHt +0`,
and the **tile histogram printed nothing at all**. `solarRoofs +4 / greenRoofs +1` appeared — the
signature iter 97 documented. Ran the stash-control anyway (90s, no tokens): **pristine HEAD against
the same baseline gives the identical +4/+1.** Not mine.

**Visual** — 2 agents, 2 seeds, before/after × (wide + `--shots downtown`), told not to enhance. Both
**VISUAL: PASS**. Seed 7's agent, fed the original complaint verbatim, returned *"the AFTER frame is
measurably less beige… the 'beige monotone' complaint is answered."* Seed 42: *"varied grain, not
confetti; no checkerboard… deepens richness without going garish."* Both checked parapets seat flush
(no float, no z-fight) and found no tears anywhere in frame.

**Perf — and a new control.** After: day min **34.00ms**, night **38.61ms**. That read as +0.28ms of
day vs the pre-edit gate, and three passes drifted *monotonically upward* (34.00→34.44→34.50) — the
signature of accumulating machine load, not code. So I **stash-controlled the perf gate the way iter
97 stash-controlled the census**: re-ran the *pre-edit* file under the *current* load → day
**33.83–34.83ms**, night **38.78ms**. The post-edit numbers sit **inside the pre-edit noise band**,
and night is nominally *faster*. **Perf-neutral, confirmed.** It has to be: `col()` memoizes on
`name|f`, so extra colours cost cache entries, not draw calls.

**Verdict — SHIPPED.** The city's most common building stopped being one colour, and stopped saying
its own height twice. Draw-only, census dead flat, two visual PASSes, perf neutral by control.

**Cue bookkeeping.** **(e½) is narrowed, not closed.** Its *palette* half is answered; its
**density/green half survives** — iter 94's "edge-to-edge carpet of roads + rooftops with little green
breathing room" is about *uniform block density and no interior green*, and 99 changed zero tiles by
design. **New cue (f), measured and standing:** `RES` has the identical defect MID just lost —
`corr(cream, height)` = **0.868**, and its roof hash is `hashCell(x,y,7)`, a **literal salt**, so
**every seed paints the same RES roof pattern** (a quiet breach of "procedural, new city every
load"). Both are one-line fixes in the RES branch (L3249–3251) for whoever takes Urban next.

## Iteration 100 — the institutions get their grounds (2026-07-10) [holistic step-back]

**Vector** — Civic & culture × **New element (SHIPPED)**, plus the 5-iteration holistic step-back.
Both axes were forced and both were right: iter 99 left an explicit instruction (*"iter 100 should be
Civic & culture, and NOT Polish"*), Civic's **New element** cell had been cold since **iter 30** — 70
iterations — while its Deepen cell was the row's busiest (36/59/66/80/91), and no **New element** had
shipped anywhere for five iterations. It also takes a bite out of standing cue **(e½)**: institutions
are what earns interior green in a real city.

**Change.** A new tile `T.QUAD` (31) — *mown institutional grounds*. `GROUNDS` = the five `MAJORK`
monuments **+ hospital + school** (the two services whose real plan is a building set back in its own
green; a firehouse has an apron, the amphitheater already sits in parkland, the observatory wants the
dark rim). At **2022+**, each such institution takes the lot **behind** it: the forecourt rule (2020)
scores on `c.flow` and takes the *loud* side, so the quad inverts it and takes the quiet one — the
back lot fronting no street. Runs after the forecourt, so `PLAZA` is already claimed and sits outside
`FORECOURT_LOT`; the two squares can never contend for a lot. `hashCell`-gated, no `rng()`.
Registered in all seven seams a ground tile touches: `valueSrc` (0.92, as park), `reachFill(rGreen)`,
`openCells`, `strollable`, `PEDDEST` (peds now stroll the quad), the draw case, and
`TILELABEL`/`TILEDESC` — hovering one says **"Quad / Mown grounds behind an institution."**

**The probe killed half the design before a line shipped.** The obvious feature was a *shared* quad on
the cell between two clustered majors — iter 91 spaced the quarter at `QNEAR=2` explicitly to "leave
one between," which reads like a hook left for exactly this. `probe-grounds.mjs` measured what is
actually on that cell across three seeds: **ROAD 10/16 · PLAZA 4/16 · a bare lot 3/16 (one seed).**
`siteQuarter` requires `roadNear()`, so **two institutions meet on the street they both front, by
construction** — greening it would have severed the civic mile iter 45's bunting is strung along.
Shared gap cells: **0, 0, 3.** The back-lot design was the supported one: **8/10, 11/12, 11/12**
institutions have a convertible neighbour, and those neighbours are overwhelmingly **MID** — the exact
"edge-to-edge carpet" tile cue (e½) complains about.

**⚠ THE FINDING: ORNAMENT YOU CANNOT SEE AT DISTANCE STILL AVERAGES INTO THE TILE'S TONE, AND CAN
CANCEL THE BASE COLOUR YOU ADDED TO CARRY IT.** The visual gate **failed three times on seed 7**, always
with one sentence: *"grid-correct and well-placed, but reads as a generic grass hex."* Rounds 1–2 I
treated it as an ornament problem (clip to the true hexagon — an ellipse clip had cut the mower passes
into a lens and let the path slab out over the neighbours; replace two floating dark blobs with a
shrub row). Those were real bugs and fixed real ugliness **up close**, and changed nothing at city
zoom. The cause was that `QUAD` was drawn in **PARK's own `lawn`**. So I gave it a `turf` of its own —
and it *still* failed. `probe-quadtone.mjs` (samples the real canvas at default fit zoom, 3×3 disc at
each tile centre) said why:

| | before | after | reference |
| --- | --- | --- | --- |
| QUAD vs PARK `ΔL` | **6.9 / 2.9 / 9.3** | **20.7 / 19.3 / 22.5** | PARK vs FOREST (obvious): 31–36 |
| QUAD vs PARK `ΔRGB` | 12.2 / 15.2 / 25.0 | 30.8 / 31.3 / 37.9 | PARK vs FOREST: 60–66 |
| QUAD sampled lum | **160** (base fill was 144) | 144–146 | PARK 163–168 · MID 157 · FOREST 131 |

`turf` had luminance 144, but the tile **measured 160** — the mower stripes (`turf×1.12`, covering
most of the face) and the cream path were lifting the sampled tone **+16 back toward park**. Iter 95's
law is that coverage cannot *create* legibility at distance; the corollary, unowned until now, is that
**coverage can destroy it.** Fix: stripes `1.12→1.05`, path `cream .95→.90` and thinner, rim hedge
darker/thicker (`canopy .82→.70`, lw `2.6→3.2`), `turf` re-cut deeper *and cooler* ([101,137,97]) so
it separates from PARK by luminance **and** hue, and from FOREST by hue. QUAD now sits as a third
green between forest and park, and **slightly darker than the MID carpet (145 vs 157)** — green
relief, not a dark hole. **Measure the tile as rendered, not as specified.**

**Census** — `VERDICT: PASS`. `QUAD 0 → 23` (the rule is 2022+, so only the 2035 era of the matrix has
them: ~7–10 per city, matching the probe). `pop 150332 → 148777 (−1.03%)`, `developed −29`,
`roads −2`, `TOWER −4`, `MID −17 · RES −10`. A terrain rule, so it perturbs the stream by design and
this is the low end of the few-percent the invariants predict — a far better trade than the reverted
solar farm (−4% for a barely-visible feature). `schools 23→21` is the pop-gated school rule
(`pop>3500*(schools+1)`) crossing its threshold on a 1% pop dip, not a bug. The three later
draw-only rounds moved the histogram **not one cell** — an implicit control that the turf/hedge/palette
work was purely draw-side.

**Visual** — 4 rounds, 2 seeds, no enhancement. Final: both **PASS**. Seed 7 — the reviewer that
failed it three times — returned *"YES — this is the real change… they no longer blend into ordinary
parks,"* found 3–4 quads unaided, and confirmed not-too-dark. Two agent verdicts proved unreliable in
the middle rounds (one described a tower facade in a quad clip), which is why the **pixel probe, not a
fourth opinion, is what settled it.**

**Perf (step-back gate)** — 3 sequential passes, day **34.17 / 34.61 / 34.94ms**, night **38.83 /
39.55 / 39.78ms**; PASS (min day +9.1%, night +4.3% vs baseline). The monotonic pass-over-pass rise is
iter 99's documented load signature, and iter 99's published HEAD-under-load band (day 33.83–34.83ms)
contains my minimum — so the quad's ~8 extra tiles of draw cost nothing measurable, as expected
(`col()` memoizes, so `turf` buys a cache entry).

**Holistic whole-city (2 seeds, un-zoomed).** Both PASS, no bugs, no compounding. Coastline explicitly
healthy — *"one of the strongest parts of the frame,"* kelp restrained. Night warm and legible.
Skyline: iter 98's core is *"readable… but a loose band rather than a tight core."*
**Cue (e½) survives, narrowed again:** the interior *"does breathe… but green is fragmented into small
patches rather than any real district-scale lung."* Both the agent's top recommendation and mine:
**consolidate green into one or two district-scale parks/greenways** rather than more scatter. Iter 100
added *earned* green (7–10 hexes); it did not add a lung.

**Verdict — SHIPPED.** The institutions have grounds, the tooltip names them, peds stroll them, and the
mid-rise carpet gave up ~23 cells to green that a city actually earns. Three visual failures on one
seed were worth more than the ship: they produced `probe-quadtone.mjs` and the law above.

## Iteration 101 — the greenway that could not be traced (2026-07-10)

**Vector** — Nature × **Connect**. Rotation forced the kind: 96/97/98/99/100 ran
Polish · Interaction · Polish · Polish · New element, so **Connect and Deepen were both
cold** and a sixth Polish-ish lap was off the table. The vector itself was *prescribed*,
twice over: iter 88 died proving "Nature × Connect is not reachable draw-only" and left an
explicit design for its successor — *"the reachable Connect hosts are the greens the city
already protects; a PARK↔PARK↔FOREST greenway is the version with an actual host, **if one
plants it as terrain early enough to survive**"* — and iter 100's step-back agent independently
asked to **"consolidate green into one or two district-scale parks/greenways."** Same feature,
found from two directions. Cue (e½).

**Change (reverted).** A `GWK`/`GWFAM` line on the diagonal family the main street did *not*
take, surveyed in `genWorld` after the high street: walk the axis, convert `EMPTY`/`MEADOW`
to `PARK` with a `c.gw` flag, skipping `corr` so crossing streets stay whole; ~40% of spine
cells bulge one hex sideways. Plus `gwTrail()` (a cream footpath), a `Greenway` tooltip, and
`__find('greenway'|'gwspine')`. **Zero `rng()` draws** — offset, side and bulges all from
`hashCell` — so `genWorld`'s seeded stream stayed byte-identical; only the terrain perturbed
downstream ticks.

**Census** — PASS, and the trade was *good*: `pop` −3346 (**−2.25%**) and `developed` −43
for ~52 green cells per seed, i.e. roughly **half the pop-per-cell cost of iter 100's QUAD**,
because `PARK` is the top `valueSrc` (0.92) and the ribbon lifts `val` along its whole
frontage — `cafes` **+141**, `COM` **+51**, `tallTowers` **+6**. `PARK` **+344** (not +470:
the late park pass fires less, because the greenway already satisfies its "no PARK within 3"
test — the ribbon *replaces* confetti, exactly what cue (e½) asked for).

**Visual — the gate, and the reason for the revert.** `VISUAL: FAIL` **7 of 9** agent reads.
Final version: seed 42 PASS (traced it on one axis, no tears), **seed 7 FAIL — could not
trace it.** Seed 7 is also the seed with the weakest measured contrast, so that FAIL is
*corroborated by the number*, not contradicted by it. A change must hold across seeds.

**Verdict: EXPLORED → REVERTED.** `solvista.html` is byte-identical to HEAD; census on the
reverted tree is **+0 on all 22 metrics**, empty tile histogram, 0 page errors. Reverted
because it cost 2.25% of the population and 27% of the stations for a feature you must zoom
one step in to see — the solar-farm trade — and because a 1–2 hex ribbon **is not the
district-scale lung cue (e½) asked for.** Cue (e½) stays **open**.

### Findings — what iteration 102+ should lift from this

- **⚠ CONTRAST IS NOT TRACEABILITY. For a LINEAR feature, legibility ≈ contrast × WIDTH.**
  This is the load-bearing result, and it *refines* iter 95 ("legibility at distance is
  luminance contrast, not coverage"). A tone probe (sample a 3×3 disc at each tile centre off the
  live canvas via `getImageData`, at **default fit zoom**, and compare mean sRGB luminance against a
  `PARK`-vs-`MID` scale reference) measured the spine at **ΔL 22–35 above ordinary PARK**,
  against a `PARK`-vs-`MID` reference of only **ΔL 7–11** — the ribbon out-contrasted a pair
  everybody calls obviously distinguishable, **and agents still could not follow it.** A
  one-hex-wide line at fit zoom is ~1 screen pixel: that is contrast *without a shape*.
  Below ~2–3 hexes across, a corridor cannot be traced no matter its ΔL. **Do not answer
  "can it be followed?" with a tone probe** — tone answers "does it separate", which is a
  different question. Iter 95's rule and this one are both true and neither implies the other.
- **PARK IS PERMANENT — the host iter 88 wanted exists, and is confirmed.** No pass in
  `tick()` ever consumes a `PARK`: development takes only `EMPTY`/`MEADOW`/`FARM` (L907/928/936),
  and roads pave only `c.corr` (L899/1192). Measured `survive == gw` on 3 seeds × 1985/2035.
  **So terrain planted in `genWorld` survives to 2035.** Any future green vector should plant
  early and stop worrying about the city eating it.
- **Green is not just affordable, it partly pays for itself.** `valueSrc` scores `PARK` **0.92**,
  the highest in the game (L813), so park frontage raises neighbours' `val`, which raises
  development probability (L909's `greenNear`) and height. −2.25% pop for 52 cells/seed, vs
  iter 100's −1.03% for 23. Budget green at **~0.045% pop per cell**, not more.
- **Survey a line's offset; never coin-flip it.** A `hashCell` coin flip aimed seed 7's ribbon
  out to sea — 17 cells planted, its walk blocked by `WATER:18` and `BEACH:6`. Scoring both
  sides by plantable cells (the same deterministic scan `hsBest` uses for the high street) took
  seed 7 to **58 cells** and fixed the seed spread. **Reusable for any future axis feature.**
- **Union-find must BRIDGE one cell, or it condemns a correct corridor.** A greenway crossed by
  streets is still one greenway. Strict adjacency called the ribbon **13/14/16 patches**;
  bridging a single non-green cell called it **4/6/4**, with `fullSpan` **56–59 hexes**. Iter 88's
  "mark paths, not cells" rule stands, but its *measurement* needs this amendment.
- **Drawing a continuous line across tiles under top→bottom row order: stroke HALF a segment
  from each tile to the shared hex edge.** The lower half is overpainted by the next row's tile,
  then redrawn by that tile's own upward half. Produced **zero z-order tears** across 9 reads.
  Worth re-deriving for any future path/greenway/route. (`px(x+0.5,y+0.5) === ctr(x,y)` exactly,
  so either is safe for integer cells.)
- **⚠ `stations` falls whenever you de-densify a band, and it is not a break.** `monoStationCells()`
  only counts a stop with `countAround(x,y,1,DEV)>=3`, and `PARK ∉ DEV` — so green beside a line
  drops its stops below quorum. `stations` **−17 (−27%)** while `monoLines` stayed **11**. Check
  `monoLines` before believing you severed transit.
- **⚠ Agent verdicts were unreliable AGAIN, and the tell is corroboration.** Nine wide-frame reads
  produced "a debug-chrome lattice", "an L-shaped kink", and "the trail rides over rooftops" —
  **all three factually false**: `px()≡ctr()` for integer cells, and stepping the SW family moves
  the centre exactly **−0.5·CW per row**, a straight screen line. But seed 7's FAIL *was* true, and
  the tell was that a number agreed with it. **Trust a verdict a measurement corroborates; verify
  one it contradicts.** (Iter 100 said the same and it keeps paying.)
- **⚠ Aim clips at DEFAULT fit zoom.** `shot-gw.mjs` wheel-zoomed first, then read `scale`/`offX`
  via `__find` — but the camera is still easing, so the clip landed on towers and I nearly
  believed the trail was not drawn at all. Shoot at fit zoom, or wait for the camera to settle.

### The prescription for a real lung (cue (e½) is still open)

Not a ribbon — **a blob.** Same ~50 cells, contiguous, **≥3 hexes across** so it has a shape at
frame scale; that is the one thing this iteration proves a 1–2 hex corridor can never have.
Expect it to cost *more* pop per cell than the ribbon did (the ribbon's long frontage was what
bought the `val` uplift back), so budget nearer iter 100's rate. Site it with
`hexDist(x,y,CBDX,CBDY)` (iter 98), **not** `c.val` — whose peaks already sit on parks and water.
The `c.gw` flag, the `Greenway` tooltip, the `gwTrail()` half-segment draw, and the contiguity probe
(union-find with a one-cell bridge, plus a blocker histogram of what stops the walk) were all
*correct* and are worth re-deriving; only the **shape** was wrong.

## Iteration 102 — the commons: the interior gets its lung (2026-07-10)

**Provenance — I did not author this change.** It was found **uncommitted in the worktree** at
startup, left by an iteration killed between its verdict and its `git commit`. Per the skill's
dirty-worktree rule, the **gates decide, not the ledger**: I re-ran the census (PASS), re-shot both
seeds, and re-ran the visual gate before adopting it. Everything below the Provenance line is
described **from the diff and from gates I ran myself**, not from the original author's intent.

**Vector** — Nature × **New element** (district-scale). This is the direct execution of the
prescription iter 101 wrote for its successor: *"Not a ribbon — **a blob.** Same ~50 cells,
contiguous, ≥3 hexes across… Site it with `hexDist(x,y,CBDX,CBDY)` (iter 98), **not** `c.val`."*
Cue (e½), open since iter 88 and asked for independently by iter 100's step-back agent
("consolidate green into one or two district-scale parks"), is **now closed**.

**Change.** In `genWorld`, after the high street: a deterministic survey scores every legal centre
in the band `6 ≤ hexDist(x,y,CBDX,CBDY) ≤ 13` by how much of its r=3 core is plantable, docking −3
per sea/void cell; the best centre gets an `r=4` disc of `PARK`. The outer ring only is nibbled by
`hashCell(x,y,seedNum^0x10A5) >= 0.55`, so the commons has a coastline rather than the silhouette of
a hexagon — but the **r=3 core (7 hexes across) is always solid**, which is the one property 101
proved a corridor can never have. `corr` and `hstr` cells are stepped over, so a street may cross
the commons and the high street keeps its shop wall. **Draws zero `rng()`** — it perturbs the seeded
stream only through the terrain it changes.

**Census — PASS.** `PARK` **943 → 1205 (+262)**, i.e. ~29 cells per seed-era. Core: `pop`
**+1432 (+0.96%)**, `developed` **−60 (−0.98%)**, `roads` **+94 (+1.65%)** — all inside chaotic
wobble, nothing near the −5% floor. Land came overwhelmingly from open ground, not from buildings:
`EMPTY` −219, `FOREST` −17, `MEADOW` +9.

**Visual — PASS, 2/2.** Seed 42 and seed 7, un-zoomed wide frames, one agent each. Both found **one
large contiguous green mass in the interior**, correctly hex-aligned, no z-order tears, no floating
tiles, no blown-out colour, and both read the whole frame as still balanced. Seed 7 — *the seed whose
FAIL killed iter 101* — was checked specifically for the ocean mis-siting that sank the ribbon, and
the commons lands **fully on land, clear of beach and river.** The deterministic survey did its job.

**Verdict: SHIPPED.**

### Findings

- **⚠ A BLOB DOES NOT COST POP — IT PAID FOR ITSELF, AND ITER 101'S PREDICTION WAS WRONG.**
  101 predicted the blob would cost *more* pop per cell than the ribbon (which cost −2.25%), reasoning
  that the ribbon's long frontage was what bought its `val` uplift back. **Measured: `pop` went UP
  +0.96%** while `developed` fell 1%. Compactness did not forfeit the uplift — it **traded extent for
  density**: `MID` −99 but `TOWER` **+18**, `tallTowers` **+8**, `RES` +30. Because `PARK` is the top
  `valueSrc` (0.92), a solid green mass lifts `val` on everything ringing it, and the ring builds
  *taller* instead of wider. **Do not budget green as a pop cost** (101's "~0.045% pop per cell" is
  superseded for compact shapes); a contiguous park is close to pop-neutral-or-positive.
- **The r=3 solid core is the load-bearing constant, not the r=4 radius.** 101's result — below ~2–3
  hexes across a shape is untraceable at fit zoom — means the *guaranteed* width is what earns the
  read. The ragged `hashCell` outer ring is pure ornament and can be tuned freely; the core cannot.
  Both agents found the mass unprompted, so 7-hexes-across clears the legibility bar with margin.
- **Survey, never coin-flip — confirmed a second time.** 101 learned this the hard way when a
  `hashCell` coin flip aimed seed 7's ribbon out to sea. The same deterministic best-of-scan (the one
  `hsBest` uses) put the commons on land on seed 7 **first try**. Any future placed feature should
  score candidate centres and take the max; it costs one loop and removes a whole class of seed bug.
- **`PARK` permanence held in practice, not just in theory.** 101 proved by inspection that no `tick()`
  pass consumes a `PARK`. This iteration is the end-to-end confirmation: green planted in `genWorld` at
  1974 is still standing in the 2035 census column.
- **⚠ Don't plant a second lung.** The cue asked for *one* district-scale park precisely because the
  complaint (iters 94 and 100) was scattered confetti. A second blob re-scatters. Nature's additive
  moves in this direction are now **spent** — next Nature lap should be Deepen or Polish.
